type User = {
    id: string;
    name: string;
};
export declare function checkUsers(device: string): Promise<User[]>;
export declare function promptForUser(deviceId: string): Promise<User | null>;
export {};
