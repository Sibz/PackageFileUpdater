import test from 'ava';
import { PackageFileUpdater, ERR_FILE_NOT_FOUND } from "../PackageFileUpdater";
import { SemVer } from '@sibz/semver';
import { TEST_FILE } from './helpers';

test('Should initialise SemVer', t=> {
    t.deepEqual(new PackageFileUpdater().semVer, new SemVer());
});

test('When arg is invalid path, should throw', t=> {
    let err = t.throws(()=>new PackageFileUpdater("Invalid File"));
    t.is(err.message, ERR_FILE_NOT_FOUND)
});

test('When arg is valid path, should not throw', t=> {
    t.notThrows(()=>new PackageFileUpdater(TEST_FILE));
});