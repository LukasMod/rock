import { getCacheRootPath } from './project.js';
type CacheKey = string;
export declare function getCacheFile(): string;
declare function removeProjectCache(): void;
declare function get(key: CacheKey): string | undefined;
declare function set(key: CacheKey, value: string): void;
declare function remove(key: CacheKey): void;
declare const _default: {
    get: typeof get;
    set: typeof set;
    remove: typeof remove;
    removeProjectCache: typeof removeProjectCache;
    getCacheRootPath: typeof getCacheRootPath;
};
export default _default;
