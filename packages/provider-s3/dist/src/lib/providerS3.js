import * as clientS3 from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { fromTemporaryCredentials } from '@aws-sdk/credential-providers';
import { Upload } from '@aws-sdk/lib-storage';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
function toWebStream(stream) {
    return new ReadableStream({
        start(controller) {
            stream.on('data', (chunk) => controller.enqueue(chunk));
            stream.on('end', () => controller.close());
            stream.on('error', (err) => controller.error(err));
        },
    });
}
export class S3BuildCache {
    name = 'S3';
    directory = 'rock-artifacts';
    s3;
    bucket;
    config;
    linkExpirationTime;
    constructor(config) {
        this.config = config;
        const s3Config = {
            endpoint: config.endpoint,
            region: config.region,
        };
        if (config.accessKeyId && config.secretAccessKey) {
            s3Config.credentials = {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            };
        }
        else if (config.roleArn) {
            // Use STS to assume a role
            s3Config.credentials = fromTemporaryCredentials({
                params: {
                    RoleArn: config.roleArn,
                    RoleSessionName: config.roleSessionName ?? 's3-build-cache-session',
                    ExternalId: config.externalId,
                },
                // Optional: use named profile as source credentials
                masterCredentials: config.profile
                    ? fromIni({ profile: config.profile })
                    : undefined,
            });
        }
        else if (config.profile) {
            // Use shared config file (e.g. ~/.aws/credentials) with a profile
            s3Config.credentials = fromIni({ profile: config.profile });
        }
        else if (config.publicAccess) {
            // Workaround to access the S3 bucket without authentication (https://carriagereturn.nl/aws/iam/s3/anonymous/2024/07/31/anonymous-access.html)
            s3Config.signer = {
                sign: async (request) => request,
            };
            s3Config.credentials = {
                accessKeyId: '',
                secretAccessKey: '',
            };
        }
        this.s3 = new clientS3.S3Client(s3Config);
        const awsBucket = config.bucket ?? '';
        const bucketTokens = awsBucket.split('/');
        this.bucket = bucketTokens.shift();
        this.directory = config.directory ?? this.directory;
        this.name = config.name ?? this.name;
        this.linkExpirationTime = config.linkExpirationTime ?? 3600 * 24;
    }
    async uploadFileWithProgress(key, buffer, contentType, onProgress) {
        const upload = new Upload({
            client: this.s3,
            params: {
                Bucket: this.bucket,
                Key: key,
                Body: buffer,
                ContentType: contentType || 'application/octet-stream',
                ...(this.config.acl && { ACL: this.config.acl }),
                Metadata: {
                    createdAt: new Date().toISOString(),
                },
            },
        });
        upload.on('httpUploadProgress', (progress) => {
            if (progress.loaded !== undefined && progress.total !== undefined) {
                onProgress(progress.loaded, progress.total);
            }
        });
        return upload.done();
    }
    async list({ artifactName, }) {
        const artifacts = await this.s3.send(new clientS3.ListObjectsV2Command({
            Bucket: this.bucket,
            Prefix: artifactName
                ? `${this.directory}/${artifactName}.zip`
                : `${this.directory}/`,
        }));
        const results = [];
        for (const artifact of artifacts.Contents ?? []) {
            if (!artifact.Key)
                continue;
            const name = artifactName ?? artifact.Key.split('/').pop() ?? '';
            const presignedUrl = await getSignedUrl(this.s3, new clientS3.GetObjectCommand({
                Bucket: this.bucket,
                Key: artifact.Key,
            }), { expiresIn: this.linkExpirationTime });
            results.push({ name, url: presignedUrl });
        }
        return results;
    }
    async download({ artifactName, }) {
        try {
            const res = await this.s3.send(new clientS3.GetObjectCommand({
                Bucket: this.bucket,
                Key: `${this.directory}/${artifactName}.zip`,
            }));
            return new Response(toWebStream(res.Body), {
                headers: {
                    'content-length': String(res.ContentLength),
                },
            });
        }
        catch (error) {
            if (this.config.publicAccess) {
                const err = error;
                err.message = `${err.message}\n\nNote: Public access mode is enabled. Build not found or not accessible to the public`;
            }
            throw error;
        }
    }
    async delete({ artifactName, skipLatest, }) {
        if (skipLatest) {
            // Artifacts on S3 are unique by name, so skipping latest means we don't delete anything
            // @todo revisit with bucket versioning
            return [];
        }
        await this.s3.send(new clientS3.DeleteObjectCommand({
            Bucket: this.bucket,
            Key: `${this.directory}/${artifactName}.zip`,
        }));
        return [
            {
                name: artifactName,
                url: `${this.bucket}/${this.directory}/${artifactName}.zip`,
            },
        ];
    }
    async upload({ artifactName, uploadArtifactName, }) {
        const key = uploadArtifactName
            ? `${this.directory}/${uploadArtifactName}`
            : `${this.directory}/${artifactName}.zip`;
        const presignedUrl = await getSignedUrl(this.s3, new clientS3.GetObjectCommand({ Bucket: this.bucket, Key: key }), { expiresIn: this.linkExpirationTime });
        return {
            name: artifactName,
            url: presignedUrl,
            getResponse: (buffer, contentType) => {
                const bufferToUpload = typeof buffer === 'function'
                    ? buffer(presignedUrl.split('?')[0])
                    : buffer;
                const readable = new ReadableStream({
                    start: (controller) => {
                        let lastEmittedBytes = 0;
                        try {
                            this.uploadFileWithProgress(key, bufferToUpload, contentType, (loaded, total) => {
                                const newBytes = loaded - lastEmittedBytes;
                                if (newBytes > 0) {
                                    const chunk = bufferToUpload.subarray(lastEmittedBytes, loaded);
                                    controller.enqueue(chunk);
                                    lastEmittedBytes = loaded;
                                    if (loaded >= total) {
                                        controller.close();
                                    }
                                }
                            });
                        }
                        catch (error) {
                            controller.error(error);
                        }
                    },
                });
                return new Response(readable, {
                    headers: {
                        'content-length': String(bufferToUpload.length),
                        'content-type': contentType || 'application/octet-stream',
                    },
                });
            },
        };
    }
}
export const providerS3 = (options) => () => new S3BuildCache(options);
//# sourceMappingURL=providerS3.js.map