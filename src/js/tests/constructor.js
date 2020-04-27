"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var PackageFileUpdater_1 = require("../PackageFileUpdater");
var semver_1 = require("@sibz/semver");
var helpers_1 = require("./helpers");
ava_1.default('Should initialise SemVer', function (t) {
    t.deepEqual(new PackageFileUpdater_1.PackageFileUpdater().semVer, new semver_1.SemVer());
});
ava_1.default('When arg is invalid path, should throw', function (t) {
    var err = t.throws(function () { return new PackageFileUpdater_1.PackageFileUpdater("Invalid File"); });
    t.is(err.message, PackageFileUpdater_1.ERR_FILE_NOT_FOUND);
});
ava_1.default('When arg is valid path, should not throw', function (t) {
    t.notThrows(function () { return new PackageFileUpdater_1.PackageFileUpdater(helpers_1.TEST_FILE); });
});
