export type RockErrorOptions = {
    cause?: unknown;
};
export declare class RockError extends Error {
    constructor(message: string, { cause }?: RockErrorOptions);
}
