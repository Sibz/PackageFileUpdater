import { SemVer } from '@sibz/semver';
export declare const ERR_FILE_NOT_FOUND = "File not found";
export declare const ERR_PATH_NOT_SET = "Path not set, either set in constructor or pass to load(path)";
export declare const ERR_FILE_NOT_VALID = "File is not a valid package.json";
export declare const ERR_FILE_NOT_JSON = "File is not valid json";
export declare const ERR_NOT_LOADED = "Operation not permitted when file is not loaded";
export declare class PackageFileUpdater {
    jsonObj: any;
    semVer: SemVer;
    private path;
    private loaded;
    constructor(path?: string | null);
    private setPath;
    load(path?: string | null): Promise<void>;
    save(): Promise<void>;
    addOrUpdateDependency(name: string, ver: SemVer | string): void;
}
