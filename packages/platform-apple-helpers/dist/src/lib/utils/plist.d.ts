type PListBuddyOptions = {
    xml?: boolean;
};
export declare function readKeyFromPlist(plistPath: string, key: string, options?: PListBuddyOptions): Promise<string>;
export declare function readBufferFromPlist(plistPath: string, key: string): Promise<Buffer>;
export {};
