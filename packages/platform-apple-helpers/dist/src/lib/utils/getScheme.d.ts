import type { Info } from '../types/index.js';
export declare function getScheme(schemes: Info['schemes'], preselectedScheme: string | undefined, projectName: string): Promise<string>;
