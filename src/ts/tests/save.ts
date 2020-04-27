import test from 'ava';
import fs, { promises as fsPromises, stat } from "fs";
import { TEST_TEMP_FILE, TEST_FILE } from "./helpers"
import { SemVer } from '@sibz/semver';
import { PackageFileUpdater, ERR_PATH_NOT_SET, ERR_NOT_LOADED } from '../PackageFileUpdater';

test.serial('Should update file with updated semver', async t=> {
    let fileData = {
        version: new SemVer("1.2.3-alpha.4+meta").toString()
    }
    let expected = new SemVer("2.3.4-beta.5+meta2");

    await fsPromises.writeFile(TEST_TEMP_FILE, JSON.stringify(fileData));
    let pfu = new PackageFileUpdater(TEST_TEMP_FILE);
    await pfu.load();
    pfu.semVer = expected;
    await pfu.save();
    let jsonObj = JSON.parse((await fsPromises.readFile(TEST_TEMP_FILE)).toString());
    t.is(jsonObj.version, expected.toString());
});

test('When not loaded, should throw', async t=> {
    let pfu = new PackageFileUpdater(TEST_FILE);
    let err = await t.throwsAsync(async ()=> await pfu.save());
    t.is(err.message, ERR_NOT_LOADED);
});

test.after.always(()=> {
    if (fs.existsSync(TEST_TEMP_FILE)) {
        fs.unlinkSync(TEST_TEMP_FILE);
    }
});
