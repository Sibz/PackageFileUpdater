import test from 'ava';
import { PackageFileUpdater, ERR_FILE_NOT_FOUND, ERR_PATH_NOT_SET, ERR_FILE_NOT_VALID, ERR_FILE_NOT_JSON } from "../PackageFileUpdater";
import { SemVer } from '@sibz/semver';
import { TEST_FILE, TEST_BAD_FILE, TEST_TXT_FILE } from './helpers';

test('When path is null, should throw', async t => {
    let err = await t.throwsAsync(async () => await new PackageFileUpdater().load());
    t.is(err.message, ERR_PATH_NOT_SET);
});

test('When path is set, should set jsonObj', async t => {
    let pfu = new PackageFileUpdater(TEST_FILE);
    await pfu.load();
    t.truthy(pfu.jsonObj);
});

test('When loading and file does not have required fields, should throw error',
    async t => {
        let err = await t.throwsAsync(
            async () => new PackageFileUpdater(TEST_BAD_FILE).load());

        t.is(err.message, ERR_FILE_NOT_VALID);
    });

test('When loading and file is not JSON, should throw error',
    async t => {
        let err = await t.throwsAsync(
            async () => new PackageFileUpdater(TEST_TXT_FILE).load());
        t.is(err.message, ERR_FILE_NOT_JSON);
    });

test('When path is set, should have jsonObj with version', async t => {
    let pfu = new PackageFileUpdater(TEST_FILE);
    await pfu.load();
    t.truthy(pfu.jsonObj.version);
});

test('When loaded, should import semVer', async t => {
    let expected = new SemVer(1,2,3, "beta", "meta", 4);
    let pfu = new PackageFileUpdater(TEST_FILE);
    await pfu.load();
    t.deepEqual(pfu.semVer, expected);
});