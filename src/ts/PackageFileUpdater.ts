import minimist from "minimist";
import fs, { promises as fsPromises, stat } from "fs";
import { SemVer } from '@sibz/semver';

export const ERR_FILE_NOT_FOUND = "File not found";
export const ERR_PATH_NOT_SET = "Path not set, either set in constructor or pass to load(path)";
export const ERR_FILE_NOT_VALID = "File is not a valid package.json";
export const ERR_FILE_NOT_JSON = "File is not valid json";
export class PackageFileUpdater {

    jsonObj: any;
    semVer: SemVer;
    private path: string | null;

    constructor(path: string | null = null) {
        this.semVer = new SemVer();
        this.path = null;
        this.setPath(path);
    }

    private setPath(path: string | null) {
        if (path && !fileExist(path)) {
            throw new Error(ERR_FILE_NOT_FOUND);
        }
        this.path = path;
    }

    async load(path: string | null = null) {
        if (!this.path && !path) {
            throw new Error(ERR_PATH_NOT_SET);
        }
        if (path) {
            this.setPath(path);
        }
        let fileData = (await fsPromises.readFile(this.path as string)).toString();
        try {
            this.jsonObj = JSON.parse(fileData);
        } catch {
            throw new Error(ERR_FILE_NOT_JSON);
        }
        if (!this.jsonObj.version) {
            throw new Error(ERR_FILE_NOT_VALID);
        }
        this.semVer = new SemVer(this.jsonObj.version);
    }

    save() {

    }
}

function fileExist(path: string): boolean {
    return fs.existsSync(path);
}
