import test from 'ava';
import { PackageFileUpdater } from "../PackageFileUpdater";
import { SemVer } from '@sibz/semver';

test('Should initialise SemVer', t=> {
    t.deepEqual(new PackageFileUpdater().SemVer, new SemVer());
});