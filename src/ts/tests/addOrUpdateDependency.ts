import test from 'ava';

import { PackageFileUpdater, ERR_NOT_LOADED } from "../PackageFileUpdater";
import { TEST_FILE, TEST_FILE_WITH_DEP } from './helpers';
import { SemVer } from '@sibz/semver';


test('When not loaded, should throw', async t => {
    let pfu = new PackageFileUpdater(TEST_FILE);
    let err =  t.throws(() =>
         pfu.addOrUpdateDependency("test", new SemVer()));
    t.is(err.message, ERR_NOT_LOADED);
});

test('When dependency obj doesn\'t already exist, Should add it', async t => {
    let pfu = new PackageFileUpdater(TEST_FILE);
    await pfu.load();
    pfu.addOrUpdateDependency("test", new SemVer());
    t.truthy(pfu.jsonObj.dependencies);
});

test('When dependency doesn\'t already exist, Should add it', async t => {
    let pfu = new PackageFileUpdater(TEST_FILE);
    await pfu.load();
    pfu.addOrUpdateDependency("test", new SemVer());
    t.is(pfu.jsonObj.dependencies.test, new SemVer().toString());
});

test('When dependency already exist, Should set it', async t => {
    let pfu = new PackageFileUpdater(TEST_FILE_WITH_DEP);
    await pfu.load();
    pfu.addOrUpdateDependency("test", new SemVer(1,2,3));
    t.is(pfu.jsonObj.dependencies.test, new SemVer(1,2,3).toString());
});
