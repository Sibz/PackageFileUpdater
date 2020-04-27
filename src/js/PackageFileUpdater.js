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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importStar(require("fs"));
var semver_1 = require("@sibz/semver");
exports.ERR_FILE_NOT_FOUND = "File not found";
exports.ERR_PATH_NOT_SET = "Path not set, either set in constructor or pass to load(path)";
exports.ERR_FILE_NOT_VALID = "File is not a valid package.json";
exports.ERR_FILE_NOT_JSON = "File is not valid json";
exports.ERR_NOT_LOADED = "Operation not permitted when file is not loaded";
var PackageFileUpdater = /** @class */ (function () {
    function PackageFileUpdater(path) {
        if (path === void 0) { path = null; }
        this.loaded = false;
        this.semVer = new semver_1.SemVer();
        this.path = null;
        this.setPath(path);
    }
    PackageFileUpdater.prototype.setPath = function (path) {
        if (path && !fileExist(path)) {
            throw new Error(exports.ERR_FILE_NOT_FOUND);
        }
        this.path = path;
    };
    PackageFileUpdater.prototype.load = function (path) {
        if (path === void 0) { path = null; }
        return __awaiter(this, void 0, void 0, function () {
            var fileData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.path && !path) {
                            throw new Error(exports.ERR_PATH_NOT_SET);
                        }
                        if (path) {
                            this.setPath(path);
                        }
                        return [4 /*yield*/, fs_1.promises.readFile(this.path)];
                    case 1:
                        fileData = (_a.sent()).toString();
                        try {
                            this.jsonObj = JSON.parse(fileData);
                        }
                        catch (_b) {
                            throw new Error(exports.ERR_FILE_NOT_JSON);
                        }
                        if (!this.jsonObj.version) {
                            throw new Error(exports.ERR_FILE_NOT_VALID);
                        }
                        this.semVer = new semver_1.SemVer(this.jsonObj.version);
                        this.loaded = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    PackageFileUpdater.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.loaded) {
                            throw new Error(exports.ERR_NOT_LOADED);
                        }
                        this.jsonObj.version = this.semVer.toString();
                        return [4 /*yield*/, fs_1.promises.writeFile(this.path, JSON.stringify(this.jsonObj, null, 2))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PackageFileUpdater.prototype.addOrUpdateDependency = function (name, ver) {
        if (!this.loaded) {
            throw new Error(exports.ERR_NOT_LOADED);
        }
        if (!this.jsonObj.dependencies) {
            this.jsonObj.dependencies = {};
        }
        if (!Object.getOwnPropertyNames(this.jsonObj.dependencies).includes(name)) {
            Object.defineProperty(this.jsonObj.dependencies, name, { value: ver.toString() });
        }
        else {
            this.jsonObj.dependencies[name] = ver.toString();
        }
    };
    return PackageFileUpdater;
}());
exports.PackageFileUpdater = PackageFileUpdater;
function fileExist(path) {
    return fs_1.default.existsSync(path);
}
