import minimist from "minimist";
import fs, { promises as fsPromises, stat } from "fs";
import { SemVer } from '@sibz/semver';

export const ERR_FILE_NOT_FOUND = "File not found";
export const ERR_PATH_NOT_SET = "Path not set, either set in constructor or pass to load(path)";
export const ERR_FILE_NOT_VALID = "File is not a valid package.json";
export const ERR_FILE_NOT_JSON = "File is not valid json";
export const ERR_NOT_LOADED = "Can not save until a file is loaded";
export class PackageFileUpdater {

    jsonObj: any;
    semVer: SemVer;
    private path: string | null;
    private loaded: boolean = false;

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
        this.loaded = true;
    }

    async save() {        
        if (!this.loaded) {
            throw new Error(ERR_NOT_LOADED);
        }
        this.jsonObj.version = this.semVer.toString();
        await fsPromises.writeFile(this.path as string, JSON.stringify(this.jsonObj,null,2));
    }
}

function fileExist(path: string): boolean {
    return fs.existsSync(path);
}
