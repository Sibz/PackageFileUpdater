import minimist from "minimist";
import { promises as fs, stat } from "fs";
import { SemVer } from '@sibz/semver';

export class PackageFileUpdater {
      SemVer: SemVer;

      constructor() {
          this.SemVer = new SemVer();
      }

      load() {

      }

      save() {

      }
}