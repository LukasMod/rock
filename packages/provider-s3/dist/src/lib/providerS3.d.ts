import * as clientS3 from '@aws-sdk/client-s3';
import type { RemoteArtifact, RemoteBuildCache } from '@rock-js/tools';
type ProviderConfig = {
    /**
     * Optional endpoint, necessary for self-hosted S3 servers or Cloudflare R2 integration.
     */
    endpoint?: string;
    /**
     * The bucket name to use for the S3 server.
     */
    bucket: string;
    /**
     * The region of the S3 server.
     */
    region: string;
    /**
     * The access key ID for the S3 server. Not required when using IAM roles or other auth methods.
     */
    accessKeyId?: string;
    /**
     * The secret access key for the S3 server. Not required when using IAM roles or other auth methods.
     */
    secretAccessKey?: string;
    /**
     * The directory to store artifacts in the S3 server.
     */
    directory?: string;
    /**
     * The display name of the provider
     */
    name?: string;
    /**
     * The time in seconds for the presigned URL to expire. By default, it is 24 hours.
     */
    linkExpirationTime?: number;
    /**
     * AWS profile name to use for authentication. Useful for local development.
     */
    profile?: string;
    /**
     * Role ARN to assume for authentication. Useful for cross-account access.
     */
    roleArn?: string;
    /**
     * Session name when assuming a role.
     */
    roleSessionName?: string;
    /**
     * External ID when assuming a role (for additional security).
     */
    externalId?: string;
};
export declare class S3BuildCache implements RemoteBuildCache {
    name: string;
    directory: string;
    s3: clientS3.S3Client;
    bucket: string;
    config: ProviderConfig;
    linkExpirationTime: number;
    constructor(config: ProviderConfig);
    private uploadFileWithProgress;
    list({ artifactName, }: {
        artifactName?: string;
    }): Promise<RemoteArtifact[]>;
    download({ artifactName, }: {
        artifactName: string;
    }): Promise<Response>;
    delete({ artifactName, skipLatest, }: {
        artifactName: string;
        skipLatest?: boolean;
    }): Promise<RemoteArtifact[]>;
    upload({ artifactName, uploadArtifactName, }: {
        artifactName: string;
        uploadArtifactName?: string;
    }): Promise<RemoteArtifact & {
        getResponse: (buffer: Buffer | ((baseUrl: string) => Buffer), contentType?: string) => Response;
    }>;
}
export declare const providerS3: (options: ProviderConfig) => () => RemoteBuildCache;
export {};
