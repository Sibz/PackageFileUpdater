"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ava_1 = __importDefault(require("ava"));
var fs_1 = __importStar(require("fs"));
var helpers_1 = require("./helpers");
var semver_1 = require("@sibz/semver");
var PackageFileUpdater_1 = require("../PackageFileUpdater");
ava_1.default.serial('Should update file with updated semver', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var fileData, expected, pfu, jsonObj, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                fileData = {
                    version: new semver_1.SemVer("1.2.3-alpha.4+meta").toString()
                };
                expected = new semver_1.SemVer("2.3.4-beta.5+meta2");
                return [4 /*yield*/, fs_1.promises.writeFile(helpers_1.TEST_TEMP_FILE, JSON.stringify(fileData))];
            case 1:
                _c.sent();
                pfu = new PackageFileUpdater_1.PackageFileUpdater(helpers_1.TEST_TEMP_FILE);
                return [4 /*yield*/, pfu.load()];
            case 2:
                _c.sent();
                pfu.semVer = expected;
                return [4 /*yield*/, pfu.save()];
            case 3:
                _c.sent();
                _b = (_a = JSON).parse;
                return [4 /*yield*/, fs_1.promises.readFile(helpers_1.TEST_TEMP_FILE)];
            case 4:
                jsonObj = _b.apply(_a, [(_c.sent()).toString()]);
                t.is(jsonObj.version, expected.toString());
                return [2 /*return*/];
        }
    });
}); });
ava_1.default('When not loaded, should throw', function (t) { return __awaiter(void 0, void 0, void 0, function () {
    var pfu, err;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pfu = new PackageFileUpdater_1.PackageFileUpdater(helpers_1.TEST_FILE);
                return [4 /*yield*/, t.throwsAsync(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, pfu.save()];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); })];
            case 1:
                err = _a.sent();
                t.is(err.message, PackageFileUpdater_1.ERR_NOT_LOADED);
                return [2 /*return*/];
        }
    });
}); });
ava_1.default.after.always(function () {
    if (fs_1.default.existsSync(helpers_1.TEST_TEMP_FILE)) {
        fs_1.default.unlinkSync(helpers_1.TEST_TEMP_FILE);
    }
});
