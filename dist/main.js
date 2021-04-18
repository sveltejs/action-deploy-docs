'use strict';

var require$$0 = require('os');
var fs$1 = require('fs');
var path$1 = require('path');
var require$$1 = require('events');
var childProcess = require('child_process');
var util_1 = require('util');
var assert_1 = require('assert');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
	if (e && e.__esModule) return e;
	var n = Object.create(null);
	if (e) {
		Object.keys(e).forEach(function (k) {
			if (k !== 'default') {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () {
						return e[k];
					}
				});
			}
		});
	}
	n['default'] = e;
	return Object.freeze(n);
}

var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs$1);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path$1);
var path__namespace = /*#__PURE__*/_interopNamespace(path$1);
var require$$1__default = /*#__PURE__*/_interopDefaultLegacy(require$$1);
var childProcess__default = /*#__PURE__*/_interopDefaultLegacy(childProcess);
var util_1__default = /*#__PURE__*/_interopDefaultLegacy(util_1);
var assert_1__default = /*#__PURE__*/_interopDefaultLegacy(assert_1);

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
var toCommandValue_1 = toCommandValue;


var utils = /*#__PURE__*/Object.defineProperty({
	toCommandValue: toCommandValue_1
}, '__esModule', {value: true});

var __importStar$3 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};

const os$2 = __importStar$3(require$$0__default['default']);

/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand$1(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os$2.EOL);
}
var issueCommand_1$1 = issueCommand$1;
function issue(name, message = '') {
    issueCommand$1(name, {}, message);
}
var issue_1 = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}


var command = /*#__PURE__*/Object.defineProperty({
	issueCommand: issueCommand_1$1,
	issue: issue_1
}, '__esModule', {value: true});

// For internal use, subject to change.
var __importStar$2 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar$2(fs__default['default']);
const os$1 = __importStar$2(require$$0__default['default']);

function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils.toCommandValue(message)}${os$1.EOL}`, {
        encoding: 'utf8'
    });
}
var issueCommand_1 = issueCommand;


var fileCommand = /*#__PURE__*/Object.defineProperty({
	issueCommand: issueCommand_1
}, '__esModule', {value: true});

var core$3 = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });



const os = __importStar(require$$0__default['default']);
const path = __importStar(path__default['default']);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        fileCommand.issueCommand('ENV', commandValue);
    }
    else {
        command.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        fileCommand.issueCommand('PATH', inputPath);
    }
    else {
        command.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map
});

var core$4 = /*@__PURE__*/getDefaultExportFromCjs(core$3);

var ioUtil$1 = createCommonjsModule(function (module, exports) {
var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });



_a = fs__default['default'].promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
exports.IS_WINDOWS = process.platform === 'win32';
function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.stat(fsPath);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            throw err;
        }
        return true;
    });
}
exports.exists = exists;
function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
exports.isDirectory = isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */
function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports.IS_WINDOWS) {
        return (p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
        ); // e.g. C: or C:\hello
    }
    return p.startsWith('/');
}
exports.isRooted = isRooted;
/**
 * Recursively create a directory at `fsPath`.
 *
 * This implementation is optimistic, meaning it attempts to create the full
 * path first, and backs up the path stack from there.
 *
 * @param fsPath The path to create
 * @param maxDepth The maximum recursion depth
 * @param depth The current recursion depth
 */
function mkdirP(fsPath, maxDepth = 1000, depth = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1__default['default'].ok(fsPath, 'a path argument must be provided');
        fsPath = path__default['default'].resolve(fsPath);
        if (depth >= maxDepth)
            return exports.mkdir(fsPath);
        try {
            yield exports.mkdir(fsPath);
            return;
        }
        catch (err) {
            switch (err.code) {
                case 'ENOENT': {
                    yield mkdirP(path__default['default'].dirname(fsPath), maxDepth, depth + 1);
                    yield exports.mkdir(fsPath);
                    return;
                }
                default: {
                    let stats;
                    try {
                        stats = yield exports.stat(fsPath);
                    }
                    catch (err2) {
                        throw err;
                    }
                    if (!stats.isDirectory())
                        throw err;
                }
            }
        }
    });
}
exports.mkdirP = mkdirP;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */
function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
        let stats = undefined;
        try {
            // test file exists
            stats = yield exports.stat(filePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
        }
        if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = path__default['default'].extname(filePath).toUpperCase();
                if (extensions.some(validExt => validExt.toUpperCase() === upperExt)) {
                    return filePath;
                }
            }
            else {
                if (isUnixExecutable(stats)) {
                    return filePath;
                }
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield exports.stat(filePath);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    // eslint-disable-next-line no-console
                    console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
                }
            }
            if (stats && stats.isFile()) {
                if (exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = path__default['default'].dirname(filePath);
                        const upperName = path__default['default'].basename(filePath).toUpperCase();
                        for (const actualName of yield exports.readdir(directory)) {
                            if (upperName === actualName.toUpperCase()) {
                                filePath = path__default['default'].join(directory, actualName);
                                break;
                            }
                        }
                    }
                    catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                }
                else {
                    if (isUnixExecutable(stats)) {
                        return filePath;
                    }
                }
            }
        }
        return '';
    });
}
exports.tryGetExecutablePath = tryGetExecutablePath;
function normalizeSeparators(p) {
    p = p || '';
    if (exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, '\\');
        // remove redundant slashes
        return p.replace(/\\\\+/g, '\\');
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, '/');
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function isUnixExecutable(stats) {
    return ((stats.mode & 1) > 0 ||
        ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
        ((stats.mode & 64) > 0 && stats.uid === process.getuid()));
}
//# sourceMappingURL=io-util.js.map
});

var __awaiter$2 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const exec$1 = util_1__default['default'].promisify(childProcess__default['default'].exec);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
function cp(source, dest, options = {}) {
    return __awaiter$2(this, void 0, void 0, function* () {
        const { force, recursive } = readCopyOptions(options);
        const destStat = (yield ioUtil$1.exists(dest)) ? yield ioUtil$1.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) {
            return;
        }
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory()
            ? path__default['default'].join(dest, path__default['default'].basename(source))
            : dest;
        if (!(yield ioUtil$1.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil$1.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) {
                throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            }
            else {
                yield cpDirRecursive(source, newDest, 0, force);
            }
        }
        else {
            if (path__default['default'].relative(source, newDest) === '') {
                // a file cannot be copied to itself
                throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
        }
    });
}
var cp_1 = cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */
function mv(source, dest, options = {}) {
    return __awaiter$2(this, void 0, void 0, function* () {
        if (yield ioUtil$1.exists(dest)) {
            let destExists = true;
            if (yield ioUtil$1.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = path__default['default'].join(dest, path__default['default'].basename(source));
                destExists = yield ioUtil$1.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) {
                    yield rmRF(dest);
                }
                else {
                    throw new Error('Destination already exists');
                }
            }
        }
        yield mkdirP(path__default['default'].dirname(dest));
        yield ioUtil$1.rename(source, dest);
    });
}
var mv_1 = mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
function rmRF(inputPath) {
    return __awaiter$2(this, void 0, void 0, function* () {
        if (ioUtil$1.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            try {
                if (yield ioUtil$1.isDirectory(inputPath, true)) {
                    yield exec$1(`rd /s /q "${inputPath}"`);
                }
                else {
                    yield exec$1(`del /f /a "${inputPath}"`);
                }
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield ioUtil$1.unlink(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
        }
        else {
            let isDir = false;
            try {
                isDir = yield ioUtil$1.isDirectory(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
                return;
            }
            if (isDir) {
                yield exec$1(`rm -rf "${inputPath}"`);
            }
            else {
                yield ioUtil$1.unlink(inputPath);
            }
        }
    });
}
var rmRF_1 = rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
function mkdirP(fsPath) {
    return __awaiter$2(this, void 0, void 0, function* () {
        yield ioUtil$1.mkdirP(fsPath);
    });
}
var mkdirP_1 = mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
function which(tool, check) {
    return __awaiter$2(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // recursive when check=true
        if (check) {
            const result = yield which(tool, false);
            if (!result) {
                if (ioUtil$1.IS_WINDOWS) {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                }
                else {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
                }
            }
        }
        try {
            // build the list of extensions to try
            const extensions = [];
            if (ioUtil$1.IS_WINDOWS && process.env.PATHEXT) {
                for (const extension of process.env.PATHEXT.split(path__default['default'].delimiter)) {
                    if (extension) {
                        extensions.push(extension);
                    }
                }
            }
            // if it's rooted, return it if exists. otherwise return empty.
            if (ioUtil$1.isRooted(tool)) {
                const filePath = yield ioUtil$1.tryGetExecutablePath(tool, extensions);
                if (filePath) {
                    return filePath;
                }
                return '';
            }
            // if any path separators, return empty
            if (tool.includes('/') || (ioUtil$1.IS_WINDOWS && tool.includes('\\'))) {
                return '';
            }
            // build the list of directories
            //
            // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
            // it feels like we should not do this. Checking the current directory seems like more of a use
            // case of a shell, and the which() function exposed by the toolkit should strive for consistency
            // across platforms.
            const directories = [];
            if (process.env.PATH) {
                for (const p of process.env.PATH.split(path__default['default'].delimiter)) {
                    if (p) {
                        directories.push(p);
                    }
                }
            }
            // return the first match
            for (const directory of directories) {
                const filePath = yield ioUtil$1.tryGetExecutablePath(directory + path__default['default'].sep + tool, extensions);
                if (filePath) {
                    return filePath;
                }
            }
            return '';
        }
        catch (err) {
            throw new Error(`which failed with message ${err.message}`);
        }
    });
}
var which_1 = which;
function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    return { force, recursive };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter$2(this, void 0, void 0, function* () {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255)
            return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil$1.readdir(sourceDir);
        for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil$1.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
                // Recurse
                yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            }
            else {
                yield copyFile(srcFile, destFile, force);
            }
        }
        // Change the mode for the newly created directory
        yield ioUtil$1.chmod(destDir, (yield ioUtil$1.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function copyFile(srcFile, destFile, force) {
    return __awaiter$2(this, void 0, void 0, function* () {
        if ((yield ioUtil$1.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield ioUtil$1.lstat(destFile);
                yield ioUtil$1.unlink(destFile);
            }
            catch (e) {
                // Try to override file permission
                if (e.code === 'EPERM') {
                    yield ioUtil$1.chmod(destFile, '0666');
                    yield ioUtil$1.unlink(destFile);
                }
                // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil$1.readlink(srcFile);
            yield ioUtil$1.symlink(symlinkFull, destFile, ioUtil$1.IS_WINDOWS ? 'junction' : null);
        }
        else if (!(yield ioUtil$1.exists(destFile)) || force) {
            yield ioUtil$1.copyFile(srcFile, destFile);
        }
    });
}


var io$1 = /*#__PURE__*/Object.defineProperty({
	cp: cp_1,
	mv: mv_1,
	rmRF: rmRF_1,
	mkdirP: mkdirP_1,
	which: which_1
}, '__esModule', {value: true});

var __awaiter$1 = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};

const os = __importStar$1(require$$0__default['default']);
const events = __importStar$1(require$$1__default['default']);
const child = __importStar$1(childProcess__default['default']);
const path = __importStar$1(path__default['default']);
const io = __importStar$1(io$1);
const ioUtil = __importStar$1(ioUtil$1);
/* eslint-disable @typescript-eslint/unbound-method */
const IS_WINDOWS = process.platform === 'win32';
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */
class ToolRunner extends events.EventEmitter {
    constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
        }
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
        if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows (regular)
            else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args) {
                    cmd += ` ${this._windowsQuoteCmdArg(a)}`;
                }
            }
        }
        else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
                cmd += ` ${a}`;
            }
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + os.EOL.length);
                n = s.indexOf(os.EOL);
            }
            strBuffer = s;
        }
        catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
        }
    }
    _getSpawnFileName() {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                return process.env['COMSPEC'] || 'cmd.exe';
            }
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args) {
                    argline += ' ';
                    argline += options.windowsVerbatimArguments
                        ? a
                        : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [argline];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return (this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT'));
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
        }
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) {
            return '""';
        }
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
            if (cmdSpecialChars.some(x => x === char)) {
                needsQuotes = true;
                break;
            }
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) {
            return arg;
        }
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\'; // double the slash
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) {
            // Need double quotation for empty argument
            return '""';
        }
        if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
        }
        if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
        }
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\';
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '\\';
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
        }
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
        return __awaiter$1(this, void 0, void 0, function* () {
            // root the tool path if it is unrooted and contains relative pathing
            if (!ioUtil.isRooted(this.toolPath) &&
                (this.toolPath.includes('/') ||
                    (IS_WINDOWS && this.toolPath.includes('\\')))) {
                // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
                this.toolPath = path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            }
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield io.which(this.toolPath, true);
            return new Promise((resolve, reject) => {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                    this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                    optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                    this._debug(message);
                });
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                const stdbuffer = '';
                if (cp.stdout) {
                    cp.stdout.on('data', (data) => {
                        if (this.options.listeners && this.options.listeners.stdout) {
                            this.options.listeners.stdout(data);
                        }
                        if (!optionsNonNull.silent && optionsNonNull.outStream) {
                            optionsNonNull.outStream.write(data);
                        }
                        this._processLineBuffer(data, stdbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.stdline) {
                                this.options.listeners.stdline(line);
                            }
                        });
                    });
                }
                const errbuffer = '';
                if (cp.stderr) {
                    cp.stderr.on('data', (data) => {
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) {
                            this.options.listeners.stderr(data);
                        }
                        if (!optionsNonNull.silent &&
                            optionsNonNull.errStream &&
                            optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr
                                ? optionsNonNull.errStream
                                : optionsNonNull.outStream;
                            s.write(data);
                        }
                        this._processLineBuffer(data, errbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.errline) {
                                this.options.listeners.errline(line);
                            }
                        });
                    });
                }
                cp.on('error', (err) => {
                    state.processError = err.message;
                    state.processExited = true;
                    state.processClosed = true;
                    state.CheckComplete();
                });
                cp.on('exit', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                cp.on('close', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    state.processClosed = true;
                    this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                    if (stdbuffer.length > 0) {
                        this.emit('stdline', stdbuffer);
                    }
                    if (errbuffer.length > 0) {
                        this.emit('errline', errbuffer);
                    }
                    cp.removeAllListeners();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(exitCode);
                    }
                });
                if (this.options.input) {
                    if (!cp.stdin) {
                        throw new Error('child process missing stdin');
                    }
                    cp.stdin.end(this.options.input);
                }
            });
        });
    }
}
var ToolRunner_1 = ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */
function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = '';
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') {
            arg += '\\';
        }
        arg += c;
        escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) {
                inQuotes = !inQuotes;
            }
            else {
                append(c);
            }
            continue;
        }
        if (c === '\\' && escaped) {
            append(c);
            continue;
        }
        if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = '';
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) {
        args.push(arg.trim());
    }
    return args;
}
var argStringToArray_1 = argStringToArray;
class ExecState extends events.EventEmitter {
    constructor(options, toolPath) {
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = '';
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
            throw new Error('toolPath must not be empty');
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
            this.delay = options.delay;
        }
    }
    CheckComplete() {
        if (this.done) {
            return;
        }
        if (this.processClosed) {
            this._setResult();
        }
        else if (this.processExited) {
            this.timeout = setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
    }
    _debug(message) {
        this.emit('debug', message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) {
                error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            }
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
                error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            }
            else if (this.processStderr && this.options.failOnStdErr) {
                error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
            }
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit('done', error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) {
            return;
        }
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay /
                1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}


var toolrunner = /*#__PURE__*/Object.defineProperty({
	ToolRunner: ToolRunner_1,
	argStringToArray: argStringToArray_1
}, '__esModule', {value: true});

var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};

const tr$1 = __importStar(toolrunner);
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */
function exec(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr$1.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr$1.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
var exec_2 = exec;


var exec_1 = /*#__PURE__*/Object.defineProperty({
	exec: exec_2
}, '__esModule', {value: true});

async function rc_read_file(file_path) {
	let file_or_dir = {
		name: file_path.split("/").pop(),
		is_dir: false,
		content: "",
	};
	try {
		file_or_dir.content = await (await fs$1.promises.readFile(file_path)).toString();
	} catch (e) {
		file_or_dir.is_dir = true;
		file_or_dir.content = await Promise.all(
			(await fs$1.promises.readdir(file_path))
				.filter((name) => !name.endsWith("DS_Store"))
				.map((name) => rc_read_file(path__namespace.join(file_path, name)))
		);
	}

	return file_or_dir;
}

const doc_types = ["docs", "faq", "migrating", "blog", "tutorial", "examples"];

function strip_meta(name, content) {
	return {
		name: name,
		content: Array.isArray(content)
			? content.map((v) => strip_meta(v.name, v.content))
			: content,
	};
}

function is_empty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			return false;
		}
	}

	return JSON.stringify(obj) === JSON.stringify({});
}

function find_folder(
	files,
	paths,
	index = 0
) {
	if (!Array.isArray(files.content)) return false;

	const segment = files.content.find((v) => v.name === paths[index]);

	if (!segment) return false;
	if (paths[index + 1] === undefined) return segment;

	return find_folder(segment, paths, index + 1);
}

function transform_files(
	file,
	pkg_path,
	docs_path,
	project
) {
	let is_docs = false;

	const base_docs = {};
	const pkgs = [];

	const docs_folder = find_folder(file, docs_path.split("/"), 0);
	const pkg_folder = find_folder(file, pkg_path.split("/"), 0);

	if (docs_folder && Array.isArray(docs_folder.content)) {
		is_docs = true;
		docs_folder.content.forEach((docs) => {
			if (!doc_types.includes(docs.name) || !Array.isArray(docs.content))
				return;

			base_docs[docs.name ] = docs.content.map((entry) =>
				strip_meta(entry.name, entry.content)
			);
		});
	}

	if (pkg_folder && Array.isArray(pkg_folder.content)) {
		pkg_folder.content.forEach((docs) => {
			if (!Array.isArray(docs.content)) return;
			const readme = docs.content.find(({ name }) => name === "README.md");
			const pkg = docs.content.find(({ name }) => name === "package.json");

			if (!readme || !pkg) return;

			pkgs.push([
				JSON.parse(pkg.content ).name.replace("@sveltejs/", ""),
				{
					docs: [strip_meta("README.md", readme.content)],
				},
			]);
		});
	}

	if (!is_docs && Array.isArray(file.content)) {
		const readme = file.content.find(({ name }) => name === "README.md");

		if (readme)
			pkgs.push([
				project,
				{
					docs: [strip_meta("README.md", readme.content)],
				},
			]);
	}

	if (!is_empty(base_docs)) pkgs.push([project, base_docs]);

	return pkgs;
}

async function get_docs(
	project,
	pkg_path,
	docs_path,
	working_directory = process.cwd()
) {
	return transform_files(
		await rc_read_file(working_directory),
		pkg_path,
		docs_path,
		project
	);
}

function transform_cloudflare(
	docs,
	{ project, type, keyby, version = "latest" }
) {
	const keys = [
		{
			key: `${project}@${version}:${type}:content`,
			value: JSON.stringify(docs.full),
		},
	];

	for (let i = 0; i < docs.full.length; i++) {
		// const { content, ...rest } = docs[i];

		const item_key = docs.full[i][keyby];

		keys.push({
			key: `${project}@${version}:${type}:${item_key}`,
			value: JSON.stringify(docs.full[i]),
		});
	}

	keys.push({
		key: `${project}@${version}:${type}:list`,
		value: JSON.stringify(docs.list),
	});

	return keys;
}

var escapeStringRegexp$1 = string => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Escape characters with special meaning either inside or outside character sets.
	// Use a simple backslash escape when it’s always valid, and a \unnnn escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
	return string
		.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
		.replace(/-/g, '\\x2d');
};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0';

/** Used to compose unicode capture groups. */
var rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']';

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root$1 = freeGlobal || freeSelf || Function('return this')();

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root$1.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString$2(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString$2(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

var lodash_deburr = deburr;

const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;

var escapeStringRegexp = string => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	return string.replace(matchOperatorsRegex, '\\$&');
};

var replacements = [
	// German umlauts
	['ß', 'ss'],
	['ä', 'ae'],
	['Ä', 'Ae'],
	['ö', 'oe'],
	['Ö', 'Oe'],
	['ü', 'ue'],
	['Ü', 'Ue'],

	// Latin
	['À', 'A'],
	['Á', 'A'],
	['Â', 'A'],
	['Ã', 'A'],
	['Ä', 'Ae'],
	['Å', 'A'],
	['Æ', 'AE'],
	['Ç', 'C'],
	['È', 'E'],
	['É', 'E'],
	['Ê', 'E'],
	['Ë', 'E'],
	['Ì', 'I'],
	['Í', 'I'],
	['Î', 'I'],
	['Ï', 'I'],
	['Ð', 'D'],
	['Ñ', 'N'],
	['Ò', 'O'],
	['Ó', 'O'],
	['Ô', 'O'],
	['Õ', 'O'],
	['Ö', 'Oe'],
	['Ő', 'O'],
	['Ø', 'O'],
	['Ù', 'U'],
	['Ú', 'U'],
	['Û', 'U'],
	['Ü', 'Ue'],
	['Ű', 'U'],
	['Ý', 'Y'],
	['Þ', 'TH'],
	['ß', 'ss'],
	['à', 'a'],
	['á', 'a'],
	['â', 'a'],
	['ã', 'a'],
	['ä', 'ae'],
	['å', 'a'],
	['æ', 'ae'],
	['ç', 'c'],
	['è', 'e'],
	['é', 'e'],
	['ê', 'e'],
	['ë', 'e'],
	['ì', 'i'],
	['í', 'i'],
	['î', 'i'],
	['ï', 'i'],
	['ð', 'd'],
	['ñ', 'n'],
	['ò', 'o'],
	['ó', 'o'],
	['ô', 'o'],
	['õ', 'o'],
	['ö', 'oe'],
	['ő', 'o'],
	['ø', 'o'],
	['ù', 'u'],
	['ú', 'u'],
	['û', 'u'],
	['ü', 'ue'],
	['ű', 'u'],
	['ý', 'y'],
	['þ', 'th'],
	['ÿ', 'y'],
	['ẞ', 'SS'],

	// Vietnamese
	['à', 'a'],
	['À', 'A'],
	['á', 'a'],
	['Á', 'A'],
	['â', 'a'],
	['Â', 'A'],
	['ã', 'a'],
	['Ã', 'A'],
	['è', 'e'],
	['È', 'E'],
	['é', 'e'],
	['É', 'E'],
	['ê', 'e'],
	['Ê', 'E'],
	['ì', 'i'],
	['Ì', 'I'],
	['í', 'i'],
	['Í', 'I'],
	['ò', 'o'],
	['Ò', 'O'],
	['ó', 'o'],
	['Ó', 'O'],
	['ô', 'o'],
	['Ô', 'O'],
	['õ', 'o'],
	['Õ', 'O'],
	['ù', 'u'],
	['Ù', 'U'],
	['ú', 'u'],
	['Ú', 'U'],
	['ý', 'y'],
	['Ý', 'Y'],
	['ă', 'a'],
	['Ă', 'A'],
	['Đ', 'D'],
	['đ', 'd'],
	['ĩ', 'i'],
	['Ĩ', 'I'],
	['ũ', 'u'],
	['Ũ', 'U'],
	['ơ', 'o'],
	['Ơ', 'O'],
	['ư', 'u'],
	['Ư', 'U'],
	['ạ', 'a'],
	['Ạ', 'A'],
	['ả', 'a'],
	['Ả', 'A'],
	['ấ', 'a'],
	['Ấ', 'A'],
	['ầ', 'a'],
	['Ầ', 'A'],
	['ẩ', 'a'],
	['Ẩ', 'A'],
	['ẫ', 'a'],
	['Ẫ', 'A'],
	['ậ', 'a'],
	['Ậ', 'A'],
	['ắ', 'a'],
	['Ắ', 'A'],
	['ằ', 'a'],
	['Ằ', 'A'],
	['ẳ', 'a'],
	['Ẳ', 'A'],
	['ẵ', 'a'],
	['Ẵ', 'A'],
	['ặ', 'a'],
	['Ặ', 'A'],
	['ẹ', 'e'],
	['Ẹ', 'E'],
	['ẻ', 'e'],
	['Ẻ', 'E'],
	['ẽ', 'e'],
	['Ẽ', 'E'],
	['ế', 'e'],
	['Ế', 'E'],
	['ề', 'e'],
	['Ề', 'E'],
	['ể', 'e'],
	['Ể', 'E'],
	['ễ', 'e'],
	['Ễ', 'E'],
	['ệ', 'e'],
	['Ệ', 'E'],
	['ỉ', 'i'],
	['Ỉ', 'I'],
	['ị', 'i'],
	['Ị', 'I'],
	['ọ', 'o'],
	['Ọ', 'O'],
	['ỏ', 'o'],
	['Ỏ', 'O'],
	['ố', 'o'],
	['Ố', 'O'],
	['ồ', 'o'],
	['Ồ', 'O'],
	['ổ', 'o'],
	['Ổ', 'O'],
	['ỗ', 'o'],
	['Ỗ', 'O'],
	['ộ', 'o'],
	['Ộ', 'O'],
	['ớ', 'o'],
	['Ớ', 'O'],
	['ờ', 'o'],
	['Ờ', 'O'],
	['ở', 'o'],
	['Ở', 'O'],
	['ỡ', 'o'],
	['Ỡ', 'O'],
	['ợ', 'o'],
	['Ợ', 'O'],
	['ụ', 'u'],
	['Ụ', 'U'],
	['ủ', 'u'],
	['Ủ', 'U'],
	['ứ', 'u'],
	['Ứ', 'U'],
	['ừ', 'u'],
	['Ừ', 'U'],
	['ử', 'u'],
	['Ử', 'U'],
	['ữ', 'u'],
	['Ữ', 'U'],
	['ự', 'u'],
	['Ự', 'U'],
	['ỳ', 'y'],
	['Ỳ', 'Y'],
	['ỵ', 'y'],
	['Ỵ', 'Y'],
	['ỷ', 'y'],
	['Ỷ', 'Y'],
	['ỹ', 'y'],
	['Ỹ', 'Y'],

	// Arabic
	['ء', 'e'],
	['آ', 'a'],
	['أ', 'a'],
	['ؤ', 'w'],
	['إ', 'i'],
	['ئ', 'y'],
	['ا', 'a'],
	['ب', 'b'],
	['ة', 't'],
	['ت', 't'],
	['ث', 'th'],
	['ج', 'j'],
	['ح', 'h'],
	['خ', 'kh'],
	['د', 'd'],
	['ذ', 'dh'],
	['ر', 'r'],
	['ز', 'z'],
	['س', 's'],
	['ش', 'sh'],
	['ص', 's'],
	['ض', 'd'],
	['ط', 't'],
	['ظ', 'z'],
	['ع', 'e'],
	['غ', 'gh'],
	['ـ', '_'],
	['ف', 'f'],
	['ق', 'q'],
	['ك', 'k'],
	['ل', 'l'],
	['م', 'm'],
	['ن', 'n'],
	['ه', 'h'],
	['و', 'w'],
	['ى', 'a'],
	['ي', 'y'],
	['َ‎', 'a'],
	['ُ', 'u'],
	['ِ‎', 'i'],
	['٠', '0'],
	['١', '1'],
	['٢', '2'],
	['٣', '3'],
	['٤', '4'],
	['٥', '5'],
	['٦', '6'],
	['٧', '7'],
	['٨', '8'],
	['٩', '9'],

	// Persian / Farsi
	['چ', 'ch'],
	['ک', 'k'],
	['گ', 'g'],
	['پ', 'p'],
	['ژ', 'zh'],
	['ی', 'y'],
	['۰', '0'],
	['۱', '1'],
	['۲', '2'],
	['۳', '3'],
	['۴', '4'],
	['۵', '5'],
	['۶', '6'],
	['۷', '7'],
	['۸', '8'],
	['۹', '9'],

	// Pashto
	['ټ', 'p'],
	['ځ', 'z'],
	['څ', 'c'],
	['ډ', 'd'],
	['ﺫ', 'd'],
	['ﺭ', 'r'],
	['ړ', 'r'],
	['ﺯ', 'z'],
	['ږ', 'g'],
	['ښ', 'x'],
	['ګ', 'g'],
	['ڼ', 'n'],
	['ۀ', 'e'],
	['ې', 'e'],
	['ۍ', 'ai'],

	// Urdu
	['ٹ', 't'],
	['ڈ', 'd'],
	['ڑ', 'r'],
	['ں', 'n'],
	['ہ', 'h'],
	['ھ', 'h'],
	['ے', 'e'],

	// Russian
	['А', 'A'],
	['а', 'a'],
	['Б', 'B'],
	['б', 'b'],
	['В', 'V'],
	['в', 'v'],
	['Г', 'G'],
	['г', 'g'],
	['Д', 'D'],
	['д', 'd'],
	['Е', 'E'],
	['е', 'e'],
	['Ж', 'Zh'],
	['ж', 'zh'],
	['З', 'Z'],
	['з', 'z'],
	['И', 'I'],
	['и', 'i'],
	['Й', 'J'],
	['й', 'j'],
	['К', 'K'],
	['к', 'k'],
	['Л', 'L'],
	['л', 'l'],
	['М', 'M'],
	['м', 'm'],
	['Н', 'N'],
	['н', 'n'],
	['О', 'O'],
	['о', 'o'],
	['П', 'P'],
	['п', 'p'],
	['Р', 'R'],
	['р', 'r'],
	['С', 'S'],
	['с', 's'],
	['Т', 'T'],
	['т', 't'],
	['У', 'U'],
	['у', 'u'],
	['Ф', 'F'],
	['ф', 'f'],
	['Х', 'H'],
	['х', 'h'],
	['Ц', 'Cz'],
	['ц', 'cz'],
	['Ч', 'Ch'],
	['ч', 'ch'],
	['Ш', 'Sh'],
	['ш', 'sh'],
	['Щ', 'Shh'],
	['щ', 'shh'],
	['Ъ', ''],
	['ъ', ''],
	['Ы', 'Y'],
	['ы', 'y'],
	['Ь', ''],
	['ь', ''],
	['Э', 'E'],
	['э', 'e'],
	['Ю', 'Yu'],
	['ю', 'yu'],
	['Я', 'Ya'],
	['я', 'ya'],
	['Ё', 'Yo'],
	['ё', 'yo'],

	// Romanian
	['ă', 'a'],
	['Ă', 'A'],
	['ș', 's'],
	['Ș', 'S'],
	['ț', 't'],
	['Ț', 'T'],
	['ţ', 't'],
	['Ţ', 'T'],

	// Turkish
	['ş', 's'],
	['Ş', 'S'],
	['ç', 'c'],
	['Ç', 'C'],
	['ğ', 'g'],
	['Ğ', 'G'],
	['ı', 'i'],
	['İ', 'I'],

	// Armenian
	['ա', 'a'],
	['բ', 'b'],
	['գ', 'g'],
	['դ', 'd'],
	['ե', 'ye'],
	['զ', 'z'],
	['է', 'e'],
	['ը', 'u'],
	['թ', 't'],
	['ժ', 'zh'],
	['ի', 'i'],
	['լ', 'l'],
	['խ', 'kh'],
	['ծ', 'ts'],
	['կ', 'k'],
	['հ', 'h'],
	['ձ', 'dz'],
	['ղ', 'r'],
	['ճ', 'j'],
	['մ', 'm'],
	['յ', 'j'],
	['ն', 'n'],
	['շ', 'sh'],
	['ո', 'vo'],
	['չ', 'ch'],
	['պ', 'p'],
	['ջ', 'j'],
	['ռ', 'r'],
	['ս', 's'],
	['վ', 'v'],
	['տ', 't'],
	['ր', 're'],
	['ց', 'ts'],
	['ու', 'u'],
	['ւ', 'v'],
	['փ', 'p'],
	['ք', 'q'],
	['օ', 'o'],
	['ֆ', 'f'],
	['և', 'yev'],

	// Georgian
	['ა', 'a'],
	['ბ', 'b'],
	['გ', 'g'],
	['დ', 'd'],
	['ე', 'e'],
	['ვ', 'v'],
	['ზ', 'z'],
	['თ', 't'],
	['ი', 'i'],
	['კ', 'k'],
	['ლ', 'l'],
	['მ', 'm'],
	['ნ', 'n'],
	['ო', 'o'],
	['პ', 'p'],
	['ჟ', 'zh'],
	['რ', 'r'],
	['ს', 's'],
	['ტ', 't'],
	['უ', 'u'],
	['ფ', 'ph'],
	['ქ', 'q'],
	['ღ', 'gh'],
	['ყ', 'k'],
	['შ', 'sh'],
	['ჩ', 'ch'],
	['ც', 'ts'],
	['ძ', 'dz'],
	['წ', 'ts'],
	['ჭ', 'tch'],
	['ხ', 'kh'],
	['ჯ', 'j'],
	['ჰ', 'h'],

	// Czech
	['č', 'c'],
	['ď', 'd'],
	['ě', 'e'],
	['ň', 'n'],
	['ř', 'r'],
	['š', 's'],
	['ť', 't'],
	['ů', 'u'],
	['ž', 'z'],
	['Č', 'C'],
	['Ď', 'D'],
	['Ě', 'E'],
	['Ň', 'N'],
	['Ř', 'R'],
	['Š', 'S'],
	['Ť', 'T'],
	['Ů', 'U'],
	['Ž', 'Z'],

	// Dhivehi
	['ހ', 'h'],
	['ށ', 'sh'],
	['ނ', 'n'],
	['ރ', 'r'],
	['ބ', 'b'],
	['ޅ', 'lh'],
	['ކ', 'k'],
	['އ', 'a'],
	['ވ', 'v'],
	['މ', 'm'],
	['ފ', 'f'],
	['ދ', 'dh'],
	['ތ', 'th'],
	['ލ', 'l'],
	['ގ', 'g'],
	['ޏ', 'gn'],
	['ސ', 's'],
	['ޑ', 'd'],
	['ޒ', 'z'],
	['ޓ', 't'],
	['ޔ', 'y'],
	['ޕ', 'p'],
	['ޖ', 'j'],
	['ޗ', 'ch'],
	['ޘ', 'tt'],
	['ޙ', 'hh'],
	['ޚ', 'kh'],
	['ޛ', 'th'],
	['ޜ', 'z'],
	['ޝ', 'sh'],
	['ޞ', 's'],
	['ޟ', 'd'],
	['ޠ', 't'],
	['ޡ', 'z'],
	['ޢ', 'a'],
	['ޣ', 'gh'],
	['ޤ', 'q'],
	['ޥ', 'w'],
	['ަ', 'a'],
	['ާ', 'aa'],
	['ި', 'i'],
	['ީ', 'ee'],
	['ު', 'u'],
	['ޫ', 'oo'],
	['ެ', 'e'],
	['ޭ', 'ey'],
	['ޮ', 'o'],
	['ޯ', 'oa'],
	['ް', ''],

	// Greek
	['α', 'a'],
	['β', 'v'],
	['γ', 'g'],
	['δ', 'd'],
	['ε', 'e'],
	['ζ', 'z'],
	['η', 'i'],
	['θ', 'th'],
	['ι', 'i'],
	['κ', 'k'],
	['λ', 'l'],
	['μ', 'm'],
	['ν', 'n'],
	['ξ', 'ks'],
	['ο', 'o'],
	['π', 'p'],
	['ρ', 'r'],
	['σ', 's'],
	['τ', 't'],
	['υ', 'y'],
	['φ', 'f'],
	['χ', 'x'],
	['ψ', 'ps'],
	['ω', 'o'],
	['ά', 'a'],
	['έ', 'e'],
	['ί', 'i'],
	['ό', 'o'],
	['ύ', 'y'],
	['ή', 'i'],
	['ώ', 'o'],
	['ς', 's'],
	['ϊ', 'i'],
	['ΰ', 'y'],
	['ϋ', 'y'],
	['ΐ', 'i'],
	['Α', 'A'],
	['Β', 'B'],
	['Γ', 'G'],
	['Δ', 'D'],
	['Ε', 'E'],
	['Ζ', 'Z'],
	['Η', 'I'],
	['Θ', 'TH'],
	['Ι', 'I'],
	['Κ', 'K'],
	['Λ', 'L'],
	['Μ', 'M'],
	['Ν', 'N'],
	['Ξ', 'KS'],
	['Ο', 'O'],
	['Π', 'P'],
	['Ρ', 'R'],
	['Σ', 'S'],
	['Τ', 'T'],
	['Υ', 'Y'],
	['Φ', 'F'],
	['Χ', 'X'],
	['Ψ', 'PS'],
	['Ω', 'O'],
	['Ά', 'A'],
	['Έ', 'E'],
	['Ί', 'I'],
	['Ό', 'O'],
	['Ύ', 'Y'],
	['Ή', 'I'],
	['Ώ', 'O'],
	['Ϊ', 'I'],
	['Ϋ', 'Y'],

	// Disabled as it conflicts with German and Latin.
	// Hungarian
	// ['ä', 'a'],
	// ['Ä', 'A'],
	// ['ö', 'o'],
	// ['Ö', 'O'],
	// ['ü', 'u'],
	// ['Ü', 'U'],
	// ['ű', 'u'],
	// ['Ű', 'U'],

	// Latvian
	['ā', 'a'],
	['ē', 'e'],
	['ģ', 'g'],
	['ī', 'i'],
	['ķ', 'k'],
	['ļ', 'l'],
	['ņ', 'n'],
	['ū', 'u'],
	['Ā', 'A'],
	['Ē', 'E'],
	['Ģ', 'G'],
	['Ī', 'I'],
	['Ķ', 'K'],
	['Ļ', 'L'],
	['Ņ', 'N'],
	['Ū', 'U'],
	['č', 'c'],
	['š', 's'],
	['ž', 'z'],
	['Č', 'C'],
	['Š', 'S'],
	['Ž', 'Z'],

	// Lithuanian
	['ą', 'a'],
	['č', 'c'],
	['ę', 'e'],
	['ė', 'e'],
	['į', 'i'],
	['š', 's'],
	['ų', 'u'],
	['ū', 'u'],
	['ž', 'z'],
	['Ą', 'A'],
	['Č', 'C'],
	['Ę', 'E'],
	['Ė', 'E'],
	['Į', 'I'],
	['Š', 'S'],
	['Ų', 'U'],
	['Ū', 'U'],

	// Macedonian
	['Ќ', 'Kj'],
	['ќ', 'kj'],
	['Љ', 'Lj'],
	['љ', 'lj'],
	['Њ', 'Nj'],
	['њ', 'nj'],
	['Тс', 'Ts'],
	['тс', 'ts'],

	// Polish
	['ą', 'a'],
	['ć', 'c'],
	['ę', 'e'],
	['ł', 'l'],
	['ń', 'n'],
	['ś', 's'],
	['ź', 'z'],
	['ż', 'z'],
	['Ą', 'A'],
	['Ć', 'C'],
	['Ę', 'E'],
	['Ł', 'L'],
	['Ń', 'N'],
	['Ś', 'S'],
	['Ź', 'Z'],
	['Ż', 'Z'],

	// Disabled as it conflicts with Vietnamese.
	// Serbian
	// ['љ', 'lj'],
	// ['њ', 'nj'],
	// ['Љ', 'Lj'],
	// ['Њ', 'Nj'],
	// ['đ', 'dj'],
	// ['Đ', 'Dj'],
	// ['ђ', 'dj'],
	// ['ј', 'j'],
	// ['ћ', 'c'],
	// ['џ', 'dz'],
	// ['Ђ', 'Dj'],
	// ['Ј', 'j'],
	// ['Ћ', 'C'],
	// ['Џ', 'Dz'],

	// Disabled as it conflicts with German and Latin.
	// Slovak
	// ['ä', 'a'],
	// ['Ä', 'A'],
	// ['ľ', 'l'],
	// ['ĺ', 'l'],
	// ['ŕ', 'r'],
	// ['Ľ', 'L'],
	// ['Ĺ', 'L'],
	// ['Ŕ', 'R'],

	// Disabled as it conflicts with German and Latin.
	// Swedish
	// ['å', 'o'],
	// ['Å', 'o'],
	// ['ä', 'a'],
	// ['Ä', 'A'],
	// ['ë', 'e'],
	// ['Ë', 'E'],
	// ['ö', 'o'],
	// ['Ö', 'O'],

	// Ukrainian
	['Є', 'Ye'],
	['І', 'I'],
	['Ї', 'Yi'],
	['Ґ', 'G'],
	['є', 'ye'],
	['і', 'i'],
	['ї', 'yi'],
	['ґ', 'g']

	// Danish
	// ['Æ', 'Ae'],
	// ['Ø', 'Oe'],
	// ['Å', 'Aa'],
	// ['æ', 'ae'],
	// ['ø', 'oe'],
	// ['å', 'aa']
];

const doCustomReplacements = (string, replacements) => {
	for (const [key, value] of replacements) {
		// TODO: Use `String#replaceAll()` when targeting Node.js 16.
		string = string.replace(new RegExp(escapeStringRegexp(key), 'g'), value);
	}

	return string;
};

var transliterate = (string, options) => {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a string, got \`${typeof string}\``);
	}

	options = {
		customReplacements: [],
		...options
	};

	const customReplacements = new Map([
		...replacements,
		...options.customReplacements
	]);

	string = string.normalize();
	string = doCustomReplacements(string, customReplacements);
	string = lodash_deburr(string);

	return string;
};

var overridableReplacements = [
	['&', ' and '],
	['🦄', ' unicorn '],
	['♥', ' love ']
];

const decamelize = string => {
	return string
		// Separate capitalized words.
		.replace(/([A-Z]{2,})(\d+)/g, '$1 $2')
		.replace(/([a-z\d]+)([A-Z]{2,})/g, '$1 $2')

		.replace(/([a-z\d])([A-Z])/g, '$1 $2')
		.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1 $2');
};

const removeMootSeparators = (string, separator) => {
	const escapedSeparator = escapeStringRegexp$1(separator);

	return string
		.replace(new RegExp(`${escapedSeparator}{2,}`, 'g'), separator)
		.replace(new RegExp(`^${escapedSeparator}|${escapedSeparator}$`, 'g'), '');
};

const slugify = (string, options) => {
	if (typeof string !== 'string') {
		throw new TypeError(`Expected a string, got \`${typeof string}\``);
	}

	options = {
		separator: '-',
		lowercase: true,
		decamelize: true,
		customReplacements: [],
		preserveLeadingUnderscore: false,
		...options
	};

	const shouldPrependUnderscore = options.preserveLeadingUnderscore && string.startsWith('_');

	const customReplacements = new Map([
		...overridableReplacements,
		...options.customReplacements
	]);

	string = transliterate(string, {customReplacements});

	if (options.decamelize) {
		string = decamelize(string);
	}

	let patternSlug = /[^a-zA-Z\d]+/g;

	if (options.lowercase) {
		string = string.toLowerCase();
		patternSlug = /[^a-z\d]+/g;
	}

	string = string.replace(patternSlug, options.separator);
	string = string.replace(/\\/g, '');
	if (options.separator) {
		string = removeMootSeparators(string, options.separator);
	}

	if (shouldPrependUnderscore) {
		string = `_${string}`;
	}

	return string;
};

const counter = () => {
	const occurrences = new Map();

	const countable = (string, options) => {
		string = slugify(string, options);

		if (!string) {
			return '';
		}

		const stringLower = string.toLowerCase();
		const numberless = occurrences.get(stringLower.replace(/(?:-\d+?)+?$/, '')) || 0;
		const counter = occurrences.get(stringLower);
		occurrences.set(stringLower, typeof counter === 'number' ? counter + 1 : 1);
		const newCounter = occurrences.get(stringLower) || 2;
		if (newCounter >= 2 || numberless > 2) {
			string = `${string}-${newCounter}`;
		}

		return string;
	};

	countable.reset = () => {
		occurrences.clear();
	};

	return countable;
};

var slugify_1 = slugify;
var counter_1 = counter;
slugify_1.counter = counter_1;

const SLUG_PRESERVE_UNICODE$2 = false;
const SLUG_SEPARATOR$2 = "-";















function url_safe_processor(
	url,
	opts
) {
	const { separator = SLUG_SEPARATOR$2 } = opts || {};

	return slugify_1(url, {
		customReplacements: [
			// runs before any other transformations
			["$", "DOLLAR"], // `$destroy` & co
			["-", "DASH"], // conflicts with `separator`
		],
		separator,
		decamelize: false,
		lowercase: true,
	})
		.replace(/DOLLAR/gi, "$")
		.replace(/DASH/gi, "-");
}

const alpha_num_regex = /[a-zA-Z0-9]/;
const unicode_regex = /\p{Letter}/u;

const is_non_alpha_num_unicode = (string) =>
	!alpha_num_regex.test(string) && unicode_regex.test(string);

function unicode_safe_processor(
	url,
	opts
) {
	const { separator = SLUG_SEPARATOR$2 } = opts || {};

	return url
		.split("")
		.reduce(
			(accum, char, index, array) => {
				const type = is_non_alpha_num_unicode(char) ? "pass" : "process";

				if (index === 0) {
					accum.current = { type, string: char };
				} else if (type === accum.current.type) {
					accum.current.string += char;
				} else {
					accum.chunks.push(accum.current);
					accum.current = { type, string: char };
				}

				if (index === array.length - 1) {
					accum.chunks.push(accum.current);
				}
				return accum;
			},
			{ chunks: [], current: { type: "process", string: "" } }
		)
		.chunks.reduce((accum, chunk) => {
			const processed =
				chunk.type === "process"
					? url_safe_processor(chunk.string)
					: chunk.string;

			processed.length > 0 && accum.push(processed);

			return accum;
		}, [])
		.join(separator)
		.toLowerCase();
}

function make_session_slug_processor({
	preserve_unicode = SLUG_PRESERVE_UNICODE$2,
	separator = SLUG_SEPARATOR$2,
}) {
	const processor = preserve_unicode
		? unicode_safe_processor
		: url_safe_processor;

	return function (url, seen_slugs) {
		const slug = processor(url, { separator });
		let count;
		if ((count = seen_slugs.get(slug))) {
			seen_slugs.set(slug, count + 1);
			return `${slug}${separator}${count}`;
		} else {
			seen_slugs.set(slug, 1);
			return slug;
		}
	};
}

var bail_1 = bail;

function bail(err) {
  if (err) {
    throw err
  }
}

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var isBuffer = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
};

var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

var extend$2 = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};

var isPlainObj = value => {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	const prototype = Object.getPrototypeOf(value);
	return prototype === null || prototype === Object.prototype;
};

var slice$2 = [].slice;

var wrap_1$1 = wrap$1;

// Wrap `fn`.
// Can be sync or async; return a promise, receive a completion handler, return
// new values and errors.
function wrap$1(fn, callback) {
  var invoked;

  return wrapped

  function wrapped() {
    var params = slice$2.call(arguments, 0);
    var callback = fn.length > params.length;
    var result;

    if (callback) {
      params.push(done);
    }

    try {
      result = fn.apply(null, params);
    } catch (error) {
      // Well, this is quite the pickle.
      // `fn` received a callback and invoked it (thus continuing the pipeline),
      // but later also threw an error.
      // We’re not about to restart the pipeline again, so the only thing left
      // to do is to throw the thing instead.
      if (callback && invoked) {
        throw error
      }

      return done(error)
    }

    if (!callback) {
      if (result && typeof result.then === 'function') {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }

  // Invoke `next`, only once.
  function done() {
    if (!invoked) {
      invoked = true;

      callback.apply(null, arguments);
    }
  }

  // Invoke `done` with one value.
  // Tracks if an error is passed, too.
  function then(value) {
    done(null, value);
  }
}

var trough_1 = trough;

trough.wrap = wrap_1$1;

var slice$1 = [].slice;

// Create new middleware.
function trough() {
  var fns = [];
  var middleware = {};

  middleware.run = run;
  middleware.use = use;

  return middleware

  // Run `fns`.  Last argument must be a completion handler.
  function run() {
    var index = -1;
    var input = slice$1.call(arguments, 0, -1);
    var done = arguments[arguments.length - 1];

    if (typeof done !== 'function') {
      throw new Error('Expected function as last argument, not ' + done)
    }

    next.apply(null, [null].concat(input));

    // Run the next `fn`, if any.
    function next(err) {
      var fn = fns[++index];
      var params = slice$1.call(arguments, 0);
      var values = params.slice(1);
      var length = input.length;
      var pos = -1;

      if (err) {
        done(err);
        return
      }

      // Copy non-nully input into values.
      while (++pos < length) {
        if (values[pos] === null || values[pos] === undefined) {
          values[pos] = input[pos];
        }
      }

      input = values;

      // Next or done.
      if (fn) {
        wrap_1$1(fn, next).apply(null, input);
      } else {
        done.apply(null, [null].concat(input));
      }
    }
  }

  // Add `fn` to the list.
  function use(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Expected `fn` to be a function, not ' + fn)
    }

    fns.push(fn);

    return middleware
  }
}

var own$a = {}.hasOwnProperty;

var unistUtilStringifyPosition = stringify$3;

function stringify$3(value) {
  // Nothing.
  if (!value || typeof value !== 'object') {
    return ''
  }

  // Node.
  if (own$a.call(value, 'position') || own$a.call(value, 'type')) {
    return position$1(value.position)
  }

  // Position.
  if (own$a.call(value, 'start') || own$a.call(value, 'end')) {
    return position$1(value)
  }

  // Point.
  if (own$a.call(value, 'line') || own$a.call(value, 'column')) {
    return point(value)
  }

  // ?
  return ''
}

function point(point) {
  if (!point || typeof point !== 'object') {
    point = {};
  }

  return index(point.line) + ':' + index(point.column)
}

function position$1(pos) {
  if (!pos || typeof pos !== 'object') {
    pos = {};
  }

  return point(pos.start) + '-' + point(pos.end)
}

function index(value) {
  return value && typeof value === 'number' ? value : 1
}

var vfileMessage = VMessage;

// Inherit from `Error#`.
function VMessagePrototype() {}
VMessagePrototype.prototype = Error.prototype;
VMessage.prototype = new VMessagePrototype();

// Message properties.
var proto$2 = VMessage.prototype;

proto$2.file = '';
proto$2.name = '';
proto$2.reason = '';
proto$2.message = '';
proto$2.stack = '';
proto$2.fatal = null;
proto$2.column = null;
proto$2.line = null;

// Construct a new VMessage.
//
// Note: We cannot invoke `Error` on the created context, as that adds readonly
// `line` and `column` attributes on Safari 9, thus throwing and failing the
// data.
function VMessage(reason, position, origin) {
  var parts;
  var range;
  var location;

  if (typeof position === 'string') {
    origin = position;
    position = null;
  }

  parts = parseOrigin(origin);
  range = unistUtilStringifyPosition(position) || '1:1';

  location = {
    start: {line: null, column: null},
    end: {line: null, column: null}
  };

  // Node.
  if (position && position.position) {
    position = position.position;
  }

  if (position) {
    // Position.
    if (position.start) {
      location = position;
      position = position.start;
    } else {
      // Point.
      location.start = position;
    }
  }

  if (reason.stack) {
    this.stack = reason.stack;
    reason = reason.message;
  }

  this.message = reason;
  this.name = range;
  this.reason = reason;
  this.line = position ? position.line : null;
  this.column = position ? position.column : null;
  this.location = location;
  this.source = parts[0];
  this.ruleId = parts[1];
}

function parseOrigin(origin) {
  var result = [null, null];
  var index;

  if (typeof origin === 'string') {
    index = origin.indexOf(':');

    if (index === -1) {
      result[1] = origin;
    } else {
      result[0] = origin.slice(0, index);
      result[1] = origin.slice(index + 1);
    }
  }

  return result
}

var minpath = path__default['default'];

var minproc = process;

var core$2 = VFile;

var own$9 = {}.hasOwnProperty;

// Order of setting (least specific to most), we need this because otherwise
// `{stem: 'a', path: '~/b.js'}` would throw, as a path is needed before a
// stem can be set.
var order$1 = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];

VFile.prototype.toString = toString$1;

// Access full path (`~/index.min.js`).
Object.defineProperty(VFile.prototype, 'path', {get: getPath, set: setPath});

// Access parent path (`~`).
Object.defineProperty(VFile.prototype, 'dirname', {
  get: getDirname,
  set: setDirname
});

// Access basename (`index.min.js`).
Object.defineProperty(VFile.prototype, 'basename', {
  get: getBasename,
  set: setBasename
});

// Access extname (`.js`).
Object.defineProperty(VFile.prototype, 'extname', {
  get: getExtname,
  set: setExtname
});

// Access stem (`index.min`).
Object.defineProperty(VFile.prototype, 'stem', {get: getStem, set: setStem});

// Construct a new file.
function VFile(options) {
  var prop;
  var index;

  if (!options) {
    options = {};
  } else if (typeof options === 'string' || isBuffer(options)) {
    options = {contents: options};
  } else if ('message' in options && 'messages' in options) {
    return options
  }

  if (!(this instanceof VFile)) {
    return new VFile(options)
  }

  this.data = {};
  this.messages = [];
  this.history = [];
  this.cwd = minproc.cwd();

  // Set path related properties in the correct order.
  index = -1;

  while (++index < order$1.length) {
    prop = order$1[index];

    if (own$9.call(options, prop)) {
      this[prop] = options[prop];
    }
  }

  // Set non-path related properties.
  for (prop in options) {
    if (order$1.indexOf(prop) < 0) {
      this[prop] = options[prop];
    }
  }
}

function getPath() {
  return this.history[this.history.length - 1]
}

function setPath(path) {
  assertNonEmpty(path, 'path');

  if (this.path !== path) {
    this.history.push(path);
  }
}

function getDirname() {
  return typeof this.path === 'string' ? minpath.dirname(this.path) : undefined
}

function setDirname(dirname) {
  assertPath(this.path, 'dirname');
  this.path = minpath.join(dirname || '', this.basename);
}

function getBasename() {
  return typeof this.path === 'string' ? minpath.basename(this.path) : undefined
}

function setBasename(basename) {
  assertNonEmpty(basename, 'basename');
  assertPart(basename, 'basename');
  this.path = minpath.join(this.dirname || '', basename);
}

function getExtname() {
  return typeof this.path === 'string' ? minpath.extname(this.path) : undefined
}

function setExtname(extname) {
  assertPart(extname, 'extname');
  assertPath(this.path, 'extname');

  if (extname) {
    if (extname.charCodeAt(0) !== 46 /* `.` */) {
      throw new Error('`extname` must start with `.`')
    }

    if (extname.indexOf('.', 1) > -1) {
      throw new Error('`extname` cannot contain multiple dots')
    }
  }

  this.path = minpath.join(this.dirname, this.stem + (extname || ''));
}

function getStem() {
  return typeof this.path === 'string'
    ? minpath.basename(this.path, this.extname)
    : undefined
}

function setStem(stem) {
  assertNonEmpty(stem, 'stem');
  assertPart(stem, 'stem');
  this.path = minpath.join(this.dirname || '', stem + (this.extname || ''));
}

// Get the value of the file.
function toString$1(encoding) {
  return (this.contents || '').toString(encoding)
}

// Assert that `part` is not a path (i.e., does not contain `p.sep`).
function assertPart(part, name) {
  if (part && part.indexOf(minpath.sep) > -1) {
    throw new Error(
      '`' + name + '` cannot be a path: did not expect `' + minpath.sep + '`'
    )
  }
}

// Assert that `part` is not empty.
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error('`' + name + '` cannot be empty')
  }
}

// Assert `path` exists.
function assertPath(path, name) {
  if (!path) {
    throw new Error('Setting `' + name + '` requires `path` to be set too')
  }
}

var lib$3 = core$2;

core$2.prototype.message = message;
core$2.prototype.info = info$1;
core$2.prototype.fail = fail;

// Create a message with `reason` at `position`.
// When an error is passed in as `reason`, copies the stack.
function message(reason, position, origin) {
  var message = new vfileMessage(reason, position, origin);

  if (this.path) {
    message.name = this.path + ':' + message.name;
    message.file = this.path;
  }

  message.fatal = false;

  this.messages.push(message);

  return message
}

// Fail: creates a vmessage, associates it with the file, and throws it.
function fail() {
  var message = this.message.apply(this, arguments);

  message.fatal = true;

  throw message
}

// Info: creates a vmessage, associates it with the file, and marks the fatality
// as null.
function info$1() {
  var message = this.message.apply(this, arguments);

  message.fatal = null;

  return message
}

var vfile = lib$3;

// Expose a frozen processor.
var unified_1 = unified().freeze();

var slice = [].slice;
var own$8 = {}.hasOwnProperty;

// Process pipeline.
var pipeline = trough_1()
  .use(pipelineParse)
  .use(pipelineRun)
  .use(pipelineStringify);

function pipelineParse(p, ctx) {
  ctx.tree = p.parse(ctx.file);
}

function pipelineRun(p, ctx, next) {
  p.run(ctx.tree, ctx.file, done);

  function done(error, tree, file) {
    if (error) {
      next(error);
    } else {
      ctx.tree = tree;
      ctx.file = file;
      next();
    }
  }
}

function pipelineStringify(p, ctx) {
  var result = p.stringify(ctx.tree, ctx.file);

  if (result === undefined || result === null) ; else if (typeof result === 'string' || isBuffer(result)) {
    ctx.file.contents = result;
  } else {
    ctx.file.result = result;
  }
}

// Function to create the first processor.
function unified() {
  var attachers = [];
  var transformers = trough_1();
  var namespace = {};
  var freezeIndex = -1;
  var frozen;

  // Data management.
  processor.data = data;

  // Lock.
  processor.freeze = freeze;

  // Plugins.
  processor.attachers = attachers;
  processor.use = use;

  // API.
  processor.parse = parse;
  processor.stringify = stringify;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync;

  // Expose.
  return processor

  // Create a new processor based on the processor in the current scope.
  function processor() {
    var destination = unified();
    var index = -1;

    while (++index < attachers.length) {
      destination.use.apply(null, attachers[index]);
    }

    destination.data(extend$2(true, {}, namespace));

    return destination
  }

  // Freeze: used to signal a processor that has finished configuration.
  //
  // For example, take unified itself: it’s frozen.
  // Plugins should not be added to it.
  // Rather, it should be extended, by invoking it, before modifying it.
  //
  // In essence, always invoke this when exporting a processor.
  function freeze() {
    var values;
    var transformer;

    if (frozen) {
      return processor
    }

    while (++freezeIndex < attachers.length) {
      values = attachers[freezeIndex];

      if (values[1] === false) {
        continue
      }

      if (values[1] === true) {
        values[1] = undefined;
      }

      transformer = values[0].apply(processor, values.slice(1));

      if (typeof transformer === 'function') {
        transformers.use(transformer);
      }
    }

    frozen = true;
    freezeIndex = Infinity;

    return processor
  }

  // Data management.
  // Getter / setter for processor-specific informtion.
  function data(key, value) {
    if (typeof key === 'string') {
      // Set `key`.
      if (arguments.length === 2) {
        assertUnfrozen('data', frozen);
        namespace[key] = value;
        return processor
      }

      // Get `key`.
      return (own$8.call(namespace, key) && namespace[key]) || null
    }

    // Set space.
    if (key) {
      assertUnfrozen('data', frozen);
      namespace = key;
      return processor
    }

    // Get space.
    return namespace
  }

  // Plugin management.
  //
  // Pass it:
  // *   an attacher and options,
  // *   a preset,
  // *   a list of presets, attachers, and arguments (list of attachers and
  //     options).
  function use(value) {
    var settings;

    assertUnfrozen('use', frozen);

    if (value === null || value === undefined) ; else if (typeof value === 'function') {
      addPlugin.apply(null, arguments);
    } else if (typeof value === 'object') {
      if ('length' in value) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new Error('Expected usable value, not `' + value + '`')
    }

    if (settings) {
      namespace.settings = extend$2(namespace.settings || {}, settings);
    }

    return processor

    function addPreset(result) {
      addList(result.plugins);

      if (result.settings) {
        settings = extend$2(settings || {}, result.settings);
      }
    }

    function add(value) {
      if (typeof value === 'function') {
        addPlugin(value);
      } else if (typeof value === 'object') {
        if ('length' in value) {
          addPlugin.apply(null, value);
        } else {
          addPreset(value);
        }
      } else {
        throw new Error('Expected usable value, not `' + value + '`')
      }
    }

    function addList(plugins) {
      var index = -1;

      if (plugins === null || plugins === undefined) ; else if (typeof plugins === 'object' && 'length' in plugins) {
        while (++index < plugins.length) {
          add(plugins[index]);
        }
      } else {
        throw new Error('Expected a list of plugins, not `' + plugins + '`')
      }
    }

    function addPlugin(plugin, value) {
      var entry = find(plugin);

      if (entry) {
        if (isPlainObj(entry[1]) && isPlainObj(value)) {
          value = extend$2(true, entry[1], value);
        }

        entry[1] = value;
      } else {
        attachers.push(slice.call(arguments));
      }
    }
  }

  function find(plugin) {
    var index = -1;

    while (++index < attachers.length) {
      if (attachers[index][0] === plugin) {
        return attachers[index]
      }
    }
  }

  // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor.
  function parse(doc) {
    var file = vfile(doc);
    var Parser;

    freeze();
    Parser = processor.Parser;
    assertParser('parse', Parser);

    if (newable(Parser, 'parse')) {
      return new Parser(String(file), file).parse()
    }

    return Parser(String(file), file) // eslint-disable-line new-cap
  }

  // Run transforms on a unist node representation of a file (in string or
  // vfile representation), async.
  function run(node, file, cb) {
    assertNode(node);
    freeze();

    if (!cb && typeof file === 'function') {
      cb = file;
      file = null;
    }

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb);

    function executor(resolve, reject) {
      transformers.run(node, vfile(file), done);

      function done(error, tree, file) {
        tree = tree || node;
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(tree);
        } else {
          cb(null, tree, file);
        }
      }
    }
  }

  // Run transforms on a unist node representation of a file (in string or
  // vfile representation), sync.
  function runSync(node, file) {
    var result;
    var complete;

    run(node, file, done);

    assertDone('runSync', 'run', complete);

    return result

    function done(error, tree) {
      complete = true;
      result = tree;
      bail_1(error);
    }
  }

  // Stringify a unist node representation of a file (in string or vfile
  // representation) into a string using the `Compiler` on the processor.
  function stringify(node, doc) {
    var file = vfile(doc);
    var Compiler;

    freeze();
    Compiler = processor.Compiler;
    assertCompiler('stringify', Compiler);
    assertNode(node);

    if (newable(Compiler, 'compile')) {
      return new Compiler(node, file).compile()
    }

    return Compiler(node, file) // eslint-disable-line new-cap
  }

  // Parse a file (in string or vfile representation) into a unist node using
  // the `Parser` on the processor, then run transforms on that node, and
  // compile the resulting node using the `Compiler` on the processor, and
  // store that result on the vfile.
  function process(doc, cb) {
    freeze();
    assertParser('process', processor.Parser);
    assertCompiler('process', processor.Compiler);

    if (!cb) {
      return new Promise(executor)
    }

    executor(null, cb);

    function executor(resolve, reject) {
      var file = vfile(doc);

      pipeline.run(processor, {file: file}, done);

      function done(error) {
        if (error) {
          reject(error);
        } else if (resolve) {
          resolve(file);
        } else {
          cb(null, file);
        }
      }
    }
  }

  // Process the given document (in string or vfile representation), sync.
  function processSync(doc) {
    var file;
    var complete;

    freeze();
    assertParser('processSync', processor.Parser);
    assertCompiler('processSync', processor.Compiler);
    file = vfile(doc);

    process(file, done);

    assertDone('processSync', 'process', complete);

    return file

    function done(error) {
      complete = true;
      bail_1(error);
    }
  }
}

// Check if `value` is a constructor.
function newable(value, name) {
  return (
    typeof value === 'function' &&
    value.prototype &&
    // A function with keys in its prototype is probably a constructor.
    // Classes’ prototype methods are not enumerable, so we check if some value
    // exists in the prototype.
    (keys(value.prototype) || name in value.prototype)
  )
}

// Check if `value` is an object with keys.
function keys(value) {
  var key;
  for (key in value) {
    return true
  }

  return false
}

// Assert a parser is available.
function assertParser(name, Parser) {
  if (typeof Parser !== 'function') {
    throw new Error('Cannot `' + name + '` without `Parser`')
  }
}

// Assert a compiler is available.
function assertCompiler(name, Compiler) {
  if (typeof Compiler !== 'function') {
    throw new Error('Cannot `' + name + '` without `Compiler`')
  }
}

// Assert the processor is not frozen.
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(
      'Cannot invoke `' +
        name +
        '` on a frozen processor.\nCreate a new processor first, by invoking it: use `processor()` instead of `processor`.'
    )
  }
}

// Assert `node` is a unist node.
function assertNode(node) {
  if (!node || typeof node.type !== 'string') {
    throw new Error('Expected node, got `' + node + '`')
  }
}

// Assert that `complete` is `true`.
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error(
      '`' + name + '` finished async. Use `' + asyncName + '` instead'
    )
  }
}

var mdastUtilToString = toString;

// Get the text content of a node.
// Prefer the node’s plain-text fields, otherwise serialize its children,
// and if the given value is an array, serialize the nodes in it.
function toString(node) {
  return (
    (node &&
      (node.value ||
        node.alt ||
        node.title ||
        ('children' in node && all$2(node.children)) ||
        ('length' in node && all$2(node)))) ||
    ''
  )
}

function all$2(values) {
  var result = [];
  var index = -1;

  while (++index < values.length) {
    result[index] = toString(values[index]);
  }

  return result.join('')
}

var assign = Object.assign;

var assign_1 = assign;

var own$7 = {}.hasOwnProperty;

var hasOwnProperty$2 = own$7;

function normalizeIdentifier(value) {
  return (
    value // Collapse Markdown whitespace.
      .replace(/[\t\n\r ]+/g, ' ') // Trim.
      .replace(/^ | $/g, '') // Some characters are considered “uppercase”, but if their lowercase
      // counterpart is uppercased will result in a different uppercase
      // character.
      // Hence, to get that form, we perform both lower- and uppercase.
      // Upper case makes sure keys will not interact with default prototypal
      // methods: no object method is uppercase.
      .toLowerCase()
      .toUpperCase()
  )
}

var normalizeIdentifier_1 = normalizeIdentifier;

var fromCharCode$1 = String.fromCharCode;

var fromCharCode_1 = fromCharCode$1;

function safeFromInt(value, base) {
  var code = parseInt(value, base);

  if (
    // C0 except for HT, LF, FF, CR, space
    code < 9 ||
    code === 11 ||
    (code > 13 && code < 32) || // Control character (DEL) of the basic block and C1 controls.
    (code > 126 && code < 160) || // Lone high surrogates and low surrogates.
    (code > 55295 && code < 57344) || // Noncharacters.
    (code > 64975 && code < 65008) ||
    (code & 65535) === 65535 ||
    (code & 65535) === 65534 || // Out of range
    code > 1114111
  ) {
    return '\uFFFD'
  }

  return fromCharCode_1(code)
}

var safeFromInt_1 = safeFromInt;

function markdownLineEnding(code) {
  return code < -2
}

var markdownLineEnding_1 = markdownLineEnding;

function markdownSpace(code) {
  return code === -2 || code === -1 || code === 32
}

var markdownSpace_1 = markdownSpace;

function spaceFactory(effects, ok, type, max) {
  var limit = max ? max - 1 : Infinity;
  var size = 0;
  return start

  function start(code) {
    if (markdownSpace_1(code)) {
      effects.enter(type);
      return prefix(code)
    }

    return ok(code)
  }

  function prefix(code) {
    if (markdownSpace_1(code) && size++ < limit) {
      effects.consume(code);
      return prefix
    }

    effects.exit(type);
    return ok(code)
  }
}

var factorySpace = spaceFactory;

var tokenize$2 = initializeContent;

function initializeContent(effects) {
  var contentStart = effects.attempt(
    this.parser.constructs.contentInitial,
    afterContentStartConstruct,
    paragraphInitial
  );
  var previous;
  return contentStart

  function afterContentStartConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return
    }

    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace(effects, contentStart, 'linePrefix')
  }

  function paragraphInitial(code) {
    effects.enter('paragraph');
    return lineStart(code)
  }

  function lineStart(code) {
    var token = effects.enter('chunkText', {
      contentType: 'text',
      previous: previous
    });

    if (previous) {
      previous.next = token;
    }

    previous = token;
    return data(code)
  }

  function data(code) {
    if (code === null) {
      effects.exit('chunkText');
      effects.exit('paragraph');
      effects.consume(code);
      return
    }

    if (markdownLineEnding_1(code)) {
      effects.consume(code);
      effects.exit('chunkText');
      return lineStart
    } // Data.

    effects.consume(code);
    return data
  }
}

var tokenize_1$2 = tokenize$2;

var content$1 = /*#__PURE__*/Object.defineProperty({
	tokenize: tokenize_1$2
}, '__esModule', {value: true});

var partialBlankLine = {
  tokenize: tokenizePartialBlankLine,
  partial: true
};

function tokenizePartialBlankLine(effects, ok, nok) {
  return factorySpace(effects, afterWhitespace, 'linePrefix')

  function afterWhitespace(code) {
    return code === null || markdownLineEnding_1(code) ? ok(code) : nok(code)
  }
}

var partialBlankLine_1 = partialBlankLine;

var tokenize$1 = initializeDocument;
var containerConstruct = {
  tokenize: tokenizeContainer
};
var lazyFlowConstruct = {
  tokenize: tokenizeLazyFlow
};

function initializeDocument(effects) {
  var self = this;
  var stack = [];
  var continued = 0;
  var inspectConstruct = {
    tokenize: tokenizeInspect,
    partial: true
  };
  var inspectResult;
  var childFlow;
  var childToken;
  return start

  function start(code) {
    if (continued < stack.length) {
      self.containerState = stack[continued][1];
      return effects.attempt(
        stack[continued][0].continuation,
        documentContinue,
        documentContinued
      )(code)
    }

    return documentContinued(code)
  }

  function documentContinue(code) {
    continued++;
    return start(code)
  }

  function documentContinued(code) {
    // If we’re in a concrete construct (such as when expecting another line of
    // HTML, or we resulted in lazy content), we can immediately start flow.
    if (inspectResult && inspectResult.flowContinue) {
      return flowStart(code)
    }

    self.interrupt =
      childFlow &&
      childFlow.currentConstruct &&
      childFlow.currentConstruct.interruptible;
    self.containerState = {};
    return effects.attempt(
      containerConstruct,
      containerContinue,
      flowStart
    )(code)
  }

  function containerContinue(code) {
    stack.push([self.currentConstruct, self.containerState]);
    self.containerState = undefined;
    return documentContinued(code)
  }

  function flowStart(code) {
    if (code === null) {
      exitContainers(0, true);
      effects.consume(code);
      return
    }

    childFlow = childFlow || self.parser.flow(self.now());
    effects.enter('chunkFlow', {
      contentType: 'flow',
      previous: childToken,
      _tokenizer: childFlow
    });
    return flowContinue(code)
  }

  function flowContinue(code) {
    if (code === null) {
      continueFlow(effects.exit('chunkFlow'));
      return flowStart(code)
    }

    if (markdownLineEnding_1(code)) {
      effects.consume(code);
      continueFlow(effects.exit('chunkFlow'));
      return effects.check(inspectConstruct, documentAfterPeek)
    }

    effects.consume(code);
    return flowContinue
  }

  function documentAfterPeek(code) {
    exitContainers(
      inspectResult.continued,
      inspectResult && inspectResult.flowEnd
    );
    continued = 0;
    return start(code)
  }

  function continueFlow(token) {
    if (childToken) childToken.next = token;
    childToken = token;
    childFlow.lazy = inspectResult && inspectResult.lazy;
    childFlow.defineSkip(token.start);
    childFlow.write(self.sliceStream(token));
  }

  function exitContainers(size, end) {
    var index = stack.length; // Close the flow.

    if (childFlow && end) {
      childFlow.write([null]);
      childToken = childFlow = undefined;
    } // Exit open containers.

    while (index-- > size) {
      self.containerState = stack[index][1];
      stack[index][0].exit.call(self, effects);
    }

    stack.length = size;
  }

  function tokenizeInspect(effects, ok) {
    var subcontinued = 0;
    inspectResult = {};
    return inspectStart

    function inspectStart(code) {
      if (subcontinued < stack.length) {
        self.containerState = stack[subcontinued][1];
        return effects.attempt(
          stack[subcontinued][0].continuation,
          inspectContinue,
          inspectLess
        )(code)
      } // If we’re continued but in a concrete flow, we can’t have more
      // containers.

      if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
        inspectResult.flowContinue = true;
        return inspectDone(code)
      }

      self.interrupt =
        childFlow.currentConstruct && childFlow.currentConstruct.interruptible;
      self.containerState = {};
      return effects.attempt(
        containerConstruct,
        inspectFlowEnd,
        inspectDone
      )(code)
    }

    function inspectContinue(code) {
      subcontinued++;
      return self.containerState._closeFlow
        ? inspectFlowEnd(code)
        : inspectStart(code)
    }

    function inspectLess(code) {
      if (childFlow.currentConstruct && childFlow.currentConstruct.lazy) {
        // Maybe another container?
        self.containerState = {};
        return effects.attempt(
          containerConstruct,
          inspectFlowEnd, // Maybe flow, or a blank line?
          effects.attempt(
            lazyFlowConstruct,
            inspectFlowEnd,
            effects.check(partialBlankLine_1, inspectFlowEnd, inspectLazy)
          )
        )(code)
      } // Otherwise we’re interrupting.

      return inspectFlowEnd(code)
    }

    function inspectLazy(code) {
      // Act as if all containers are continued.
      subcontinued = stack.length;
      inspectResult.lazy = true;
      inspectResult.flowContinue = true;
      return inspectDone(code)
    } // We’re done with flow if we have more containers, or an interruption.

    function inspectFlowEnd(code) {
      inspectResult.flowEnd = true;
      return inspectDone(code)
    }

    function inspectDone(code) {
      inspectResult.continued = subcontinued;
      self.interrupt = self.containerState = undefined;
      return ok(code)
    }
  }
}

function tokenizeContainer(effects, ok, nok) {
  return factorySpace(
    effects,
    effects.attempt(this.parser.constructs.document, ok, nok),
    'linePrefix',
    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4
  )
}

function tokenizeLazyFlow(effects, ok, nok) {
  return factorySpace(
    effects,
    effects.lazy(this.parser.constructs.flow, ok, nok),
    'linePrefix',
    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4
  )
}

var tokenize_1$1 = tokenize$1;

var document$2 = /*#__PURE__*/Object.defineProperty({
	tokenize: tokenize_1$1
}, '__esModule', {value: true});

// Counts tabs based on their expanded size, and CR+LF as one character.

function sizeChunks(chunks) {
  var index = -1;
  var size = 0;

  while (++index < chunks.length) {
    size += typeof chunks[index] === 'string' ? chunks[index].length : 1;
  }

  return size
}

var sizeChunks_1 = sizeChunks;

function prefixSize(events, type) {
  var tail = events[events.length - 1];
  if (!tail || tail[1].type !== type) return 0
  return sizeChunks_1(tail[2].sliceStream(tail[1]))
}

var prefixSize_1 = prefixSize;

var splice = [].splice;

var splice_1 = splice;

// causes a stack overflow in V8 when trying to insert 100k items for instance.

function chunkedSplice(list, start, remove, items) {
  var end = list.length;
  var chunkStart = 0;
  var parameters; // Make start between zero and `end` (included).

  if (start < 0) {
    start = -start > end ? 0 : end + start;
  } else {
    start = start > end ? end : start;
  }

  remove = remove > 0 ? remove : 0; // No need to chunk the items if there’s only a couple (10k) items.

  if (items.length < 10000) {
    parameters = Array.from(items);
    parameters.unshift(start, remove);
    splice_1.apply(list, parameters);
  } else {
    // Delete `remove` items starting from `start`
    if (remove) splice_1.apply(list, [start, remove]); // Insert the items in chunks to not cause stack overflows.

    while (chunkStart < items.length) {
      parameters = items.slice(chunkStart, chunkStart + 10000);
      parameters.unshift(start, 0);
      splice_1.apply(list, parameters);
      chunkStart += 10000;
      start += 10000;
    }
  }
}

var chunkedSplice_1 = chunkedSplice;

function shallow(object) {
  return assign_1({}, object)
}

var shallow_1 = shallow;

function subtokenize(events) {
  var jumps = {};
  var index = -1;
  var event;
  var lineIndex;
  var otherIndex;
  var otherEvent;
  var parameters;
  var subevents;
  var more;

  while (++index < events.length) {
    while (index in jumps) {
      index = jumps[index];
    }

    event = events[index]; // Add a hook for the GFM tasklist extension, which needs to know if text
    // is in the first content of a list item.

    if (
      index &&
      event[1].type === 'chunkFlow' &&
      events[index - 1][1].type === 'listItemPrefix'
    ) {
      subevents = event[1]._tokenizer.events;
      otherIndex = 0;

      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === 'lineEndingBlank'
      ) {
        otherIndex += 2;
      }

      if (
        otherIndex < subevents.length &&
        subevents[otherIndex][1].type === 'content'
      ) {
        while (++otherIndex < subevents.length) {
          if (subevents[otherIndex][1].type === 'content') {
            break
          }

          if (subevents[otherIndex][1].type === 'chunkText') {
            subevents[otherIndex][1].isInFirstContentOfListItem = true;
            otherIndex++;
          }
        }
      }
    } // Enter.

    if (event[0] === 'enter') {
      if (event[1].contentType) {
        assign_1(jumps, subcontent(events, index));
        index = jumps[index];
        more = true;
      }
    } // Exit.
    else if (event[1]._container || event[1]._movePreviousLineEndings) {
      otherIndex = index;
      lineIndex = undefined;

      while (otherIndex--) {
        otherEvent = events[otherIndex];

        if (
          otherEvent[1].type === 'lineEnding' ||
          otherEvent[1].type === 'lineEndingBlank'
        ) {
          if (otherEvent[0] === 'enter') {
            if (lineIndex) {
              events[lineIndex][1].type = 'lineEndingBlank';
            }

            otherEvent[1].type = 'lineEnding';
            lineIndex = otherIndex;
          }
        } else {
          break
        }
      }

      if (lineIndex) {
        // Fix position.
        event[1].end = shallow_1(events[lineIndex][1].start); // Switch container exit w/ line endings.

        parameters = events.slice(lineIndex, index);
        parameters.unshift(event);
        chunkedSplice_1(events, lineIndex, index - lineIndex + 1, parameters);
      }
    }
  }

  return !more
}

function subcontent(events, eventIndex) {
  var token = events[eventIndex][1];
  var context = events[eventIndex][2];
  var startPosition = eventIndex - 1;
  var startPositions = [];
  var tokenizer =
    token._tokenizer || context.parser[token.contentType](token.start);
  var childEvents = tokenizer.events;
  var jumps = [];
  var gaps = {};
  var stream;
  var previous;
  var index;
  var entered;
  var end;
  var adjust; // Loop forward through the linked tokens to pass them in order to the
  // subtokenizer.

  while (token) {
    // Find the position of the event for this token.
    while (events[++startPosition][1] !== token) {
      // Empty.
    }

    startPositions.push(startPosition);

    if (!token._tokenizer) {
      stream = context.sliceStream(token);

      if (!token.next) {
        stream.push(null);
      }

      if (previous) {
        tokenizer.defineSkip(token.start);
      }

      if (token.isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = true;
      }

      tokenizer.write(stream);

      if (token.isInFirstContentOfListItem) {
        tokenizer._gfmTasklistFirstContentOfListItem = undefined;
      }
    } // Unravel the next token.

    previous = token;
    token = token.next;
  } // Now, loop back through all events (and linked tokens), to figure out which
  // parts belong where.

  token = previous;
  index = childEvents.length;

  while (index--) {
    // Make sure we’ve at least seen something (final eol is part of the last
    // token).
    if (childEvents[index][0] === 'enter') {
      entered = true;
    } else if (
      // Find a void token that includes a break.
      entered &&
      childEvents[index][1].type === childEvents[index - 1][1].type &&
      childEvents[index][1].start.line !== childEvents[index][1].end.line
    ) {
      add(childEvents.slice(index + 1, end));
      // Help GC.
      token._tokenizer = token.next = undefined;
      token = token.previous;
      end = index + 1;
    }
  }

  // Help GC.
  tokenizer.events = token._tokenizer = token.next = undefined; // Do head:

  add(childEvents.slice(0, end));
  index = -1;
  adjust = 0;

  while (++index < jumps.length) {
    gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
    adjust += jumps[index][1] - jumps[index][0] - 1;
  }

  return gaps

  function add(slice) {
    var start = startPositions.pop();
    jumps.unshift([start, start + slice.length - 1]);
    chunkedSplice_1(events, start, 2, slice);
  }
}

var subtokenize_1 = subtokenize;

// No name because it must not be turned off.
var content = {
  tokenize: tokenizeContent,
  resolve: resolveContent,
  interruptible: true,
  lazy: true
};
var continuationConstruct = {
  tokenize: tokenizeContinuation,
  partial: true
}; // Content is transparent: it’s parsed right now. That way, definitions are also
// parsed right now: before text in paragraphs (specifically, media) are parsed.

function resolveContent(events) {
  subtokenize_1(events);
  return events
}

function tokenizeContent(effects, ok) {
  var previous;
  return start

  function start(code) {
    effects.enter('content');
    previous = effects.enter('chunkContent', {
      contentType: 'content'
    });
    return data(code)
  }

  function data(code) {
    if (code === null) {
      return contentEnd(code)
    }

    if (markdownLineEnding_1(code)) {
      return effects.check(
        continuationConstruct,
        contentContinue,
        contentEnd
      )(code)
    } // Data.

    effects.consume(code);
    return data
  }

  function contentEnd(code) {
    effects.exit('chunkContent');
    effects.exit('content');
    return ok(code)
  }

  function contentContinue(code) {
    effects.consume(code);
    effects.exit('chunkContent');
    previous = previous.next = effects.enter('chunkContent', {
      contentType: 'content',
      previous: previous
    });
    return data
  }
}

function tokenizeContinuation(effects, ok, nok) {
  var self = this;
  return startLookahead

  function startLookahead(code) {
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace(effects, prefixed, 'linePrefix')
  }

  function prefixed(code) {
    if (code === null || markdownLineEnding_1(code)) {
      return nok(code)
    }

    if (
      self.parser.constructs.disable.null.indexOf('codeIndented') > -1 ||
      prefixSize_1(self.events, 'linePrefix') < 4
    ) {
      return effects.interrupt(self.parser.constructs.flow, nok, ok)(code)
    }

    return ok(code)
  }
}

var content_1 = content;

var tokenize = initializeFlow;

function initializeFlow(effects) {
  var self = this;
  var initial = effects.attempt(
    // Try to parse a blank line.
    partialBlankLine_1,
    atBlankEnding, // Try to parse initial flow (essentially, only code).
    effects.attempt(
      this.parser.constructs.flowInitial,
      afterConstruct,
      factorySpace(
        effects,
        effects.attempt(
          this.parser.constructs.flow,
          afterConstruct,
          effects.attempt(content_1, afterConstruct)
        ),
        'linePrefix'
      )
    )
  );
  return initial

  function atBlankEnding(code) {
    if (code === null) {
      effects.consume(code);
      return
    }

    effects.enter('lineEndingBlank');
    effects.consume(code);
    effects.exit('lineEndingBlank');
    self.currentConstruct = undefined;
    return initial
  }

  function afterConstruct(code) {
    if (code === null) {
      effects.consume(code);
      return
    }

    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    self.currentConstruct = undefined;
    return initial
  }
}

var tokenize_1 = tokenize;

var flow$1 = /*#__PURE__*/Object.defineProperty({
	tokenize: tokenize_1
}, '__esModule', {value: true});

var text$4 = initializeFactory('text');
var string$1 = initializeFactory('string');
var resolver = {
  resolveAll: createResolver()
};

function initializeFactory(field) {
  return {
    tokenize: initializeText,
    resolveAll: createResolver(
      field === 'text' ? resolveAllLineSuffixes : undefined
    )
  }

  function initializeText(effects) {
    var self = this;
    var constructs = this.parser.constructs[field];
    var text = effects.attempt(constructs, start, notText);
    return start

    function start(code) {
      return atBreak(code) ? text(code) : notText(code)
    }

    function notText(code) {
      if (code === null) {
        effects.consume(code);
        return
      }

      effects.enter('data');
      effects.consume(code);
      return data
    }

    function data(code) {
      if (atBreak(code)) {
        effects.exit('data');
        return text(code)
      } // Data.

      effects.consume(code);
      return data
    }

    function atBreak(code) {
      var list = constructs[code];
      var index = -1;

      if (code === null) {
        return true
      }

      if (list) {
        while (++index < list.length) {
          if (
            !list[index].previous ||
            list[index].previous.call(self, self.previous)
          ) {
            return true
          }
        }
      }
    }
  }
}

function createResolver(extraResolver) {
  return resolveAllText

  function resolveAllText(events, context) {
    var index = -1;
    var enter; // A rather boring computation (to merge adjacent `data` events) which
    // improves mm performance by 29%.

    while (++index <= events.length) {
      if (enter === undefined) {
        if (events[index] && events[index][1].type === 'data') {
          enter = index;
          index++;
        }
      } else if (!events[index] || events[index][1].type !== 'data') {
        // Don’t do anything if there is one data token.
        if (index !== enter + 2) {
          events[enter][1].end = events[index - 1][1].end;
          events.splice(enter + 2, index - enter - 2);
          index = enter + 2;
        }

        enter = undefined;
      }
    }

    return extraResolver ? extraResolver(events, context) : events
  }
} // A rather ugly set of instructions which again looks at chunks in the input
// stream.
// The reason to do this here is that it is *much* faster to parse in reverse.
// And that we can’t hook into `null` to split the line suffix before an EOF.
// To do: figure out if we can make this into a clean utility, or even in core.
// As it will be useful for GFMs literal autolink extension (and maybe even
// tables?)

function resolveAllLineSuffixes(events, context) {
  var eventIndex = -1;
  var chunks;
  var data;
  var chunk;
  var index;
  var bufferIndex;
  var size;
  var tabs;
  var token;

  while (++eventIndex <= events.length) {
    if (
      (eventIndex === events.length ||
        events[eventIndex][1].type === 'lineEnding') &&
      events[eventIndex - 1][1].type === 'data'
    ) {
      data = events[eventIndex - 1][1];
      chunks = context.sliceStream(data);
      index = chunks.length;
      bufferIndex = -1;
      size = 0;
      tabs = undefined;

      while (index--) {
        chunk = chunks[index];

        if (typeof chunk === 'string') {
          bufferIndex = chunk.length;

          while (chunk.charCodeAt(bufferIndex - 1) === 32) {
            size++;
            bufferIndex--;
          }

          if (bufferIndex) break
          bufferIndex = -1;
        } // Number
        else if (chunk === -2) {
          tabs = true;
          size++;
        } else if (chunk === -1);
        else {
          // Replacement character, exit.
          index++;
          break
        }
      }

      if (size) {
        token = {
          type:
            eventIndex === events.length || tabs || size < 2
              ? 'lineSuffix'
              : 'hardBreakTrailing',
          start: {
            line: data.end.line,
            column: data.end.column - size,
            offset: data.end.offset - size,
            _index: data.start._index + index,
            _bufferIndex: index
              ? bufferIndex
              : data.start._bufferIndex + bufferIndex
          },
          end: shallow_1(data.end)
        };
        data.end = shallow_1(token.start);

        if (data.start.offset === data.end.offset) {
          assign_1(data, token);
        } else {
          events.splice(
            eventIndex,
            0,
            ['enter', token, context],
            ['exit', token, context]
          );
          eventIndex += 2;
        }
      }

      eventIndex++;
    }
  }

  return events
}

var resolver_1 = resolver;
var string_1$1 = string$1;
var text_2 = text$4;

var text_1$2 = /*#__PURE__*/Object.defineProperty({
	resolver: resolver_1,
	string: string_1$1,
	text: text_2
}, '__esModule', {value: true});

function miniflat(value) {
  return value === null || value === undefined
    ? []
    : 'length' in value
    ? value
    : [value]
}

var miniflat_1 = miniflat;

function combineExtensions(extensions) {
  var all = {};
  var index = -1;

  while (++index < extensions.length) {
    extension$1(all, extensions[index]);
  }

  return all
}

function extension$1(all, extension) {
  var hook;
  var left;
  var right;
  var code;

  for (hook in extension) {
    left = hasOwnProperty$2.call(all, hook) ? all[hook] : (all[hook] = {});
    right = extension[hook];

    for (code in right) {
      left[code] = constructs$1(
        miniflat_1(right[code]),
        hasOwnProperty$2.call(left, code) ? left[code] : []
      );
    }
  }
}

function constructs$1(list, existing) {
  var index = -1;
  var before = [];

  while (++index < list.length) {
(list[index].add === 'after' ? existing : before).push(list[index]);
  }

  chunkedSplice_1(existing, 0, 0, before);
  return existing
}

var combineExtensions_1 = combineExtensions;

function chunkedPush(list, items) {
  if (list.length) {
    chunkedSplice_1(list, list.length, 0, items);
    return list
  }

  return items
}

var chunkedPush_1 = chunkedPush;

function resolveAll(constructs, events, context) {
  var called = [];
  var index = -1;
  var resolve;

  while (++index < constructs.length) {
    resolve = constructs[index].resolveAll;

    if (resolve && called.indexOf(resolve) < 0) {
      events = resolve(events, context);
      called.push(resolve);
    }
  }

  return events
}

var resolveAll_1 = resolveAll;

function serializeChunks(chunks) {
  var index = -1;
  var result = [];
  var chunk;
  var value;
  var atTab;

  while (++index < chunks.length) {
    chunk = chunks[index];

    if (typeof chunk === 'string') {
      value = chunk;
    } else if (chunk === -5) {
      value = '\r';
    } else if (chunk === -4) {
      value = '\n';
    } else if (chunk === -3) {
      value = '\r' + '\n';
    } else if (chunk === -2) {
      value = '\t';
    } else if (chunk === -1) {
      if (atTab) continue
      value = ' ';
    } else {
      // Currently only replacement character.
      value = fromCharCode_1(chunk);
    }

    atTab = chunk === -2;
    result.push(value);
  }

  return result.join('')
}

var serializeChunks_1 = serializeChunks;

function sliceChunks(chunks, token) {
  var startIndex = token.start._index;
  var startBufferIndex = token.start._bufferIndex;
  var endIndex = token.end._index;
  var endBufferIndex = token.end._bufferIndex;
  var view;

  if (startIndex === endIndex) {
    view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
  } else {
    view = chunks.slice(startIndex, endIndex);

    if (startBufferIndex > -1) {
      view[0] = view[0].slice(startBufferIndex);
    }

    if (endBufferIndex > 0) {
      view.push(chunks[endIndex].slice(0, endBufferIndex));
    }
  }

  return view
}

var sliceChunks_1 = sliceChunks;

// Create a tokenizer.
// Tokenizers deal with one type of data (e.g., containers, flow, text).
// The parser is the object dealing with it all.
// `initialize` works like other constructs, except that only its `tokenize`
// function is used, in which case it doesn’t receive an `ok` or `nok`.
// `from` can be given to set the point before the first character, although
// when further lines are indented, they must be set with `defineSkip`.
function createTokenizer(parser, initialize, from) {
  var point = from
    ? shallow_1(from)
    : {
        line: 1,
        column: 1,
        offset: 0
      };
  var columnStart = {};
  var resolveAllConstructs = [];
  var chunks = [];
  var stack = [];

  var effects = {
    consume: consume,
    enter: enter,
    exit: exit,
    attempt: constructFactory(onsuccessfulconstruct),
    check: constructFactory(onsuccessfulcheck),
    interrupt: constructFactory(onsuccessfulcheck, {
      interrupt: true
    }),
    lazy: constructFactory(onsuccessfulcheck, {
      lazy: true
    })
  }; // State and tools for resolving and serializing.

  var context = {
    previous: null,
    events: [],
    parser: parser,
    sliceStream: sliceStream,
    sliceSerialize: sliceSerialize,
    now: now,
    defineSkip: skip,
    write: write
  }; // The state function.

  var state = initialize.tokenize.call(context, effects); // Track which character we expect to be consumed, to catch bugs.

  if (initialize.resolveAll) {
    resolveAllConstructs.push(initialize);
  } // Store where we are in the input stream.

  point._index = 0;
  point._bufferIndex = -1;
  return context

  function write(slice) {
    chunks = chunkedPush_1(chunks, slice);
    main(); // Exit if we’re not done, resolve might change stuff.

    if (chunks[chunks.length - 1] !== null) {
      return []
    }

    addResult(initialize, 0); // Otherwise, resolve, and exit.

    context.events = resolveAll_1(resolveAllConstructs, context.events, context);
    return context.events
  } //
  // Tools.
  //

  function sliceSerialize(token) {
    return serializeChunks_1(sliceStream(token))
  }

  function sliceStream(token) {
    return sliceChunks_1(chunks, token)
  }

  function now() {
    return shallow_1(point)
  }

  function skip(value) {
    columnStart[value.line] = value.column;
    accountForPotentialSkip();
  } //
  // State management.
  //
  // Main loop (note that `_index` and `_bufferIndex` in `point` are modified by
  // `consume`).
  // Here is where we walk through the chunks, which either include strings of
  // several characters, or numerical character codes.
  // The reason to do this in a loop instead of a call is so the stack can
  // drain.

  function main() {
    var chunkIndex;
    var chunk;

    while (point._index < chunks.length) {
      chunk = chunks[point._index]; // If we’re in a buffer chunk, loop through it.

      if (typeof chunk === 'string') {
        chunkIndex = point._index;

        if (point._bufferIndex < 0) {
          point._bufferIndex = 0;
        }

        while (
          point._index === chunkIndex &&
          point._bufferIndex < chunk.length
        ) {
          go(chunk.charCodeAt(point._bufferIndex));
        }
      } else {
        go(chunk);
      }
    }
  } // Deal with one code.

  function go(code) {
    state = state(code);
  } // Move a character forward.

  function consume(code) {
    if (markdownLineEnding_1(code)) {
      point.line++;
      point.column = 1;
      point.offset += code === -3 ? 2 : 1;
      accountForPotentialSkip();
    } else if (code !== -1) {
      point.column++;
      point.offset++;
    } // Not in a string chunk.

    if (point._bufferIndex < 0) {
      point._index++;
    } else {
      point._bufferIndex++; // At end of string chunk.

      if (point._bufferIndex === chunks[point._index].length) {
        point._bufferIndex = -1;
        point._index++;
      }
    } // Expose the previous character.

    context.previous = code; // Mark as consumed.
  } // Start a token.

  function enter(type, fields) {
    var token = fields || {};
    token.type = type;
    token.start = now();
    context.events.push(['enter', token, context]);
    stack.push(token);
    return token
  } // Stop a token.

  function exit(type) {
    var token = stack.pop();
    token.end = now();
    context.events.push(['exit', token, context]);
    return token
  } // Use results.

  function onsuccessfulconstruct(construct, info) {
    addResult(construct, info.from);
  } // Discard results.

  function onsuccessfulcheck(construct, info) {
    info.restore();
  } // Factory to attempt/check/interrupt.

  function constructFactory(onreturn, fields) {
    return hook // Handle either an object mapping codes to constructs, a list of
    // constructs, or a single construct.

    function hook(constructs, returnState, bogusState) {
      var listOfConstructs;
      var constructIndex;
      var currentConstruct;
      var info;
      return constructs.tokenize || 'length' in constructs
        ? handleListOfConstructs(miniflat_1(constructs))
        : handleMapOfConstructs

      function handleMapOfConstructs(code) {
        if (code in constructs || null in constructs) {
          return handleListOfConstructs(
            constructs.null
              ? /* c8 ignore next */
                miniflat_1(constructs[code]).concat(miniflat_1(constructs.null))
              : constructs[code]
          )(code)
        }

        return bogusState(code)
      }

      function handleListOfConstructs(list) {
        listOfConstructs = list;
        constructIndex = 0;
        return handleConstruct(list[constructIndex])
      }

      function handleConstruct(construct) {
        return start

        function start(code) {
          // To do: not nede to store if there is no bogus state, probably?
          // Currently doesn’t work because `inspect` in document does a check
          // w/o a bogus, which doesn’t make sense. But it does seem to help perf
          // by not storing.
          info = store();
          currentConstruct = construct;

          if (!construct.partial) {
            context.currentConstruct = construct;
          }

          if (
            construct.name &&
            context.parser.constructs.disable.null.indexOf(construct.name) > -1
          ) {
            return nok()
          }

          return construct.tokenize.call(
            fields ? assign_1({}, context, fields) : context,
            effects,
            ok,
            nok
          )(code)
        }
      }

      function ok(code) {
        onreturn(currentConstruct, info);
        return returnState
      }

      function nok(code) {
        info.restore();

        if (++constructIndex < listOfConstructs.length) {
          return handleConstruct(listOfConstructs[constructIndex])
        }

        return bogusState
      }
    }
  }

  function addResult(construct, from) {
    if (construct.resolveAll && resolveAllConstructs.indexOf(construct) < 0) {
      resolveAllConstructs.push(construct);
    }

    if (construct.resolve) {
      chunkedSplice_1(
        context.events,
        from,
        context.events.length - from,
        construct.resolve(context.events.slice(from), context)
      );
    }

    if (construct.resolveTo) {
      context.events = construct.resolveTo(context.events, context);
    }
  }

  function store() {
    var startPoint = now();
    var startPrevious = context.previous;
    var startCurrentConstruct = context.currentConstruct;
    var startEventsIndex = context.events.length;
    var startStack = Array.from(stack);
    return {
      restore: restore,
      from: startEventsIndex
    }

    function restore() {
      point = startPoint;
      context.previous = startPrevious;
      context.currentConstruct = startCurrentConstruct;
      context.events.length = startEventsIndex;
      stack = startStack;
      accountForPotentialSkip();
    }
  }

  function accountForPotentialSkip() {
    if (point.line in columnStart && point.column < 2) {
      point.column = columnStart[point.line];
      point.offset += columnStart[point.line] - 1;
    }
  }
}

var createTokenizer_1 = createTokenizer;

function markdownLineEndingOrSpace(code) {
  return code < 0 || code === 32
}

var markdownLineEndingOrSpace_1 = markdownLineEndingOrSpace;

// This module is generated by `script/`.
//
// CommonMark handles attention (emphasis, strong) markers based on what comes
// before or after them.
// One such difference is if those characters are Unicode punctuation.
// This script is generated from the Unicode data.
var unicodePunctuation$1 = /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;

var unicodePunctuationRegex = unicodePunctuation$1;

function regexCheck(regex) {
  return check

  function check(code) {
    return regex.test(fromCharCode_1(code))
  }
}

var regexCheck_1 = regexCheck;

// In fact adds to the bundle size.

var unicodePunctuation = regexCheck_1(unicodePunctuationRegex);

var unicodePunctuation_1 = unicodePunctuation;

var unicodeWhitespace = regexCheck_1(/\s/);

var unicodeWhitespace_1 = unicodeWhitespace;

// Classify whether a character is unicode whitespace, unicode punctuation, or
// anything else.
// Used for attention (emphasis, strong), whose sequences can open or close
// based on the class of surrounding characters.
function classifyCharacter(code) {
  if (
    code === null ||
    markdownLineEndingOrSpace_1(code) ||
    unicodeWhitespace_1(code)
  ) {
    return 1
  }

  if (unicodePunctuation_1(code)) {
    return 2
  }
}

var classifyCharacter_1 = classifyCharacter;

// chunks (replacement characters, tabs, or line endings).

function movePoint(point, offset) {
  point.column += offset;
  point.offset += offset;
  point._bufferIndex += offset;
  return point
}

var movePoint_1 = movePoint;

var attention = {
  name: 'attention',
  tokenize: tokenizeAttention,
  resolveAll: resolveAllAttention
};

function resolveAllAttention(events, context) {
  var index = -1;
  var open;
  var group;
  var text;
  var openingSequence;
  var closingSequence;
  var use;
  var nextEvents;
  var offset; // Walk through all events.
  //
  // Note: performance of this is fine on an mb of normal markdown, but it’s
  // a bottleneck for malicious stuff.

  while (++index < events.length) {
    // Find a token that can close.
    if (
      events[index][0] === 'enter' &&
      events[index][1].type === 'attentionSequence' &&
      events[index][1]._close
    ) {
      open = index; // Now walk back to find an opener.

      while (open--) {
        // Find a token that can open the closer.
        if (
          events[open][0] === 'exit' &&
          events[open][1].type === 'attentionSequence' &&
          events[open][1]._open && // If the markers are the same:
          context.sliceSerialize(events[open][1]).charCodeAt(0) ===
            context.sliceSerialize(events[index][1]).charCodeAt(0)
        ) {
          // If the opening can close or the closing can open,
          // and the close size *is not* a multiple of three,
          // but the sum of the opening and closing size *is* multiple of three,
          // then don’t match.
          if (
            (events[open][1]._close || events[index][1]._open) &&
            (events[index][1].end.offset - events[index][1].start.offset) % 3 &&
            !(
              (events[open][1].end.offset -
                events[open][1].start.offset +
                events[index][1].end.offset -
                events[index][1].start.offset) %
              3
            )
          ) {
            continue
          } // Number of markers to use from the sequence.

          use =
            events[open][1].end.offset - events[open][1].start.offset > 1 &&
            events[index][1].end.offset - events[index][1].start.offset > 1
              ? 2
              : 1;
          openingSequence = {
            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
            start: movePoint_1(shallow_1(events[open][1].end), -use),
            end: shallow_1(events[open][1].end)
          };
          closingSequence = {
            type: use > 1 ? 'strongSequence' : 'emphasisSequence',
            start: shallow_1(events[index][1].start),
            end: movePoint_1(shallow_1(events[index][1].start), use)
          };
          text = {
            type: use > 1 ? 'strongText' : 'emphasisText',
            start: shallow_1(events[open][1].end),
            end: shallow_1(events[index][1].start)
          };
          group = {
            type: use > 1 ? 'strong' : 'emphasis',
            start: shallow_1(openingSequence.start),
            end: shallow_1(closingSequence.end)
          };
          events[open][1].end = shallow_1(openingSequence.start);
          events[index][1].start = shallow_1(closingSequence.end);
          nextEvents = []; // If there are more markers in the opening, add them before.

          if (events[open][1].end.offset - events[open][1].start.offset) {
            nextEvents = chunkedPush_1(nextEvents, [
              ['enter', events[open][1], context],
              ['exit', events[open][1], context]
            ]);
          } // Opening.

          nextEvents = chunkedPush_1(nextEvents, [
            ['enter', group, context],
            ['enter', openingSequence, context],
            ['exit', openingSequence, context],
            ['enter', text, context]
          ]); // Between.

          nextEvents = chunkedPush_1(
            nextEvents,
            resolveAll_1(
              context.parser.constructs.insideSpan.null,
              events.slice(open + 1, index),
              context
            )
          ); // Closing.

          nextEvents = chunkedPush_1(nextEvents, [
            ['exit', text, context],
            ['enter', closingSequence, context],
            ['exit', closingSequence, context],
            ['exit', group, context]
          ]); // If there are more markers in the closing, add them after.

          if (events[index][1].end.offset - events[index][1].start.offset) {
            offset = 2;
            nextEvents = chunkedPush_1(nextEvents, [
              ['enter', events[index][1], context],
              ['exit', events[index][1], context]
            ]);
          } else {
            offset = 0;
          }

          chunkedSplice_1(events, open - 1, index - open + 3, nextEvents);
          index = open + nextEvents.length - offset - 2;
          break
        }
      }
    }
  } // Remove remaining sequences.

  index = -1;

  while (++index < events.length) {
    if (events[index][1].type === 'attentionSequence') {
      events[index][1].type = 'data';
    }
  }

  return events
}

function tokenizeAttention(effects, ok) {
  var before = classifyCharacter_1(this.previous);
  var marker;
  return start

  function start(code) {
    effects.enter('attentionSequence');
    marker = code;
    return sequence(code)
  }

  function sequence(code) {
    var token;
    var after;
    var open;
    var close;

    if (code === marker) {
      effects.consume(code);
      return sequence
    }

    token = effects.exit('attentionSequence');
    after = classifyCharacter_1(code);
    open = !after || (after === 2 && before);
    close = !before || (before === 2 && after);
    token._open = marker === 42 ? open : open && (before || !close);
    token._close = marker === 42 ? close : close && (after || !open);
    return ok(code)
  }
}

var attention_1 = attention;

var asciiAlpha = regexCheck_1(/[A-Za-z]/);

var asciiAlpha_1 = asciiAlpha;

var asciiAlphanumeric = regexCheck_1(/[\dA-Za-z]/);

var asciiAlphanumeric_1 = asciiAlphanumeric;

var asciiAtext = regexCheck_1(/[#-'*+\--9=?A-Z^-~]/);

var asciiAtext_1 = asciiAtext;

// Note: EOF is seen as ASCII control here, because `null < 32 == true`.
function asciiControl(code) {
  return (
    // Special whitespace codes (which have negative values), C0 and Control
    // character DEL
    code < 32 || code === 127
  )
}

var asciiControl_1 = asciiControl;

var autolink = {
  name: 'autolink',
  tokenize: tokenizeAutolink
};

function tokenizeAutolink(effects, ok, nok) {
  var size = 1;
  return start

  function start(code) {
    effects.enter('autolink');
    effects.enter('autolinkMarker');
    effects.consume(code);
    effects.exit('autolinkMarker');
    effects.enter('autolinkProtocol');
    return open
  }

  function open(code) {
    if (asciiAlpha_1(code)) {
      effects.consume(code);
      return schemeOrEmailAtext
    }

    return asciiAtext_1(code) ? emailAtext(code) : nok(code)
  }

  function schemeOrEmailAtext(code) {
    return code === 43 || code === 45 || code === 46 || asciiAlphanumeric_1(code)
      ? schemeInsideOrEmailAtext(code)
      : emailAtext(code)
  }

  function schemeInsideOrEmailAtext(code) {
    if (code === 58) {
      effects.consume(code);
      return urlInside
    }

    if (
      (code === 43 || code === 45 || code === 46 || asciiAlphanumeric_1(code)) &&
      size++ < 32
    ) {
      effects.consume(code);
      return schemeInsideOrEmailAtext
    }

    return emailAtext(code)
  }

  function urlInside(code) {
    if (code === 62) {
      effects.exit('autolinkProtocol');
      return end(code)
    }

    if (code === 32 || code === 60 || asciiControl_1(code)) {
      return nok(code)
    }

    effects.consume(code);
    return urlInside
  }

  function emailAtext(code) {
    if (code === 64) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot
    }

    if (asciiAtext_1(code)) {
      effects.consume(code);
      return emailAtext
    }

    return nok(code)
  }

  function emailAtSignOrDot(code) {
    return asciiAlphanumeric_1(code) ? emailLabel(code) : nok(code)
  }

  function emailLabel(code) {
    if (code === 46) {
      effects.consume(code);
      size = 0;
      return emailAtSignOrDot
    }

    if (code === 62) {
      // Exit, then change the type.
      effects.exit('autolinkProtocol').type = 'autolinkEmail';
      return end(code)
    }

    return emailValue(code)
  }

  function emailValue(code) {
    if ((code === 45 || asciiAlphanumeric_1(code)) && size++ < 63) {
      effects.consume(code);
      return code === 45 ? emailValue : emailLabel
    }

    return nok(code)
  }

  function end(code) {
    effects.enter('autolinkMarker');
    effects.consume(code);
    effects.exit('autolinkMarker');
    effects.exit('autolink');
    return ok
  }
}

var autolink_1 = autolink;

var blockQuote = {
  name: 'blockQuote',
  tokenize: tokenizeBlockQuoteStart,
  continuation: {
    tokenize: tokenizeBlockQuoteContinuation
  },
  exit: exit
};

function tokenizeBlockQuoteStart(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    if (code === 62) {
      if (!self.containerState.open) {
        effects.enter('blockQuote', {
          _container: true
        });
        self.containerState.open = true;
      }

      effects.enter('blockQuotePrefix');
      effects.enter('blockQuoteMarker');
      effects.consume(code);
      effects.exit('blockQuoteMarker');
      return after
    }

    return nok(code)
  }

  function after(code) {
    if (markdownSpace_1(code)) {
      effects.enter('blockQuotePrefixWhitespace');
      effects.consume(code);
      effects.exit('blockQuotePrefixWhitespace');
      effects.exit('blockQuotePrefix');
      return ok
    }

    effects.exit('blockQuotePrefix');
    return ok(code)
  }
}

function tokenizeBlockQuoteContinuation(effects, ok, nok) {
  return factorySpace(
    effects,
    effects.attempt(blockQuote, ok, nok),
    'linePrefix',
    this.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4
  )
}

function exit(effects) {
  effects.exit('blockQuote');
}

var blockQuote_1 = blockQuote;

var asciiPunctuation = regexCheck_1(/[!-/:-@[-`{-~]/);

var asciiPunctuation_1 = asciiPunctuation;

var characterEscape = {
  name: 'characterEscape',
  tokenize: tokenizeCharacterEscape
};

function tokenizeCharacterEscape(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('characterEscape');
    effects.enter('escapeMarker');
    effects.consume(code);
    effects.exit('escapeMarker');
    return open
  }

  function open(code) {
    if (asciiPunctuation_1(code)) {
      effects.enter('characterEscapeValue');
      effects.consume(code);
      effects.exit('characterEscapeValue');
      effects.exit('characterEscape');
      return ok
    }

    return nok(code)
  }
}

var characterEscape_1 = characterEscape;

var AEli = "Æ";
var AElig$2 = "Æ";
var AM = "&";
var AMP$1 = "&";
var Aacut = "Á";
var Aacute$2 = "Á";
var Abreve = "Ă";
var Acir = "Â";
var Acirc$2 = "Â";
var Acy = "А";
var Afr = "𝔄";
var Agrav = "À";
var Agrave$2 = "À";
var Alpha$1 = "Α";
var Amacr = "Ā";
var And = "⩓";
var Aogon = "Ą";
var Aopf = "𝔸";
var ApplyFunction = "⁡";
var Arin = "Å";
var Aring$2 = "Å";
var Ascr = "𝒜";
var Assign = "≔";
var Atild = "Ã";
var Atilde$2 = "Ã";
var Aum = "Ä";
var Auml$2 = "Ä";
var Backslash = "∖";
var Barv = "⫧";
var Barwed = "⌆";
var Bcy = "Б";
var Because = "∵";
var Bernoullis = "ℬ";
var Beta$1 = "Β";
var Bfr = "𝔅";
var Bopf = "𝔹";
var Breve = "˘";
var Bscr = "ℬ";
var Bumpeq = "≎";
var CHcy = "Ч";
var COP = "©";
var COPY$1 = "©";
var Cacute = "Ć";
var Cap = "⋒";
var CapitalDifferentialD = "ⅅ";
var Cayleys = "ℭ";
var Ccaron = "Č";
var Ccedi = "Ç";
var Ccedil$2 = "Ç";
var Ccirc = "Ĉ";
var Cconint = "∰";
var Cdot = "Ċ";
var Cedilla = "¸";
var CenterDot = "·";
var Cfr = "ℭ";
var Chi$1 = "Χ";
var CircleDot = "⊙";
var CircleMinus = "⊖";
var CirclePlus = "⊕";
var CircleTimes = "⊗";
var ClockwiseContourIntegral = "∲";
var CloseCurlyDoubleQuote = "”";
var CloseCurlyQuote = "’";
var Colon = "∷";
var Colone = "⩴";
var Congruent = "≡";
var Conint = "∯";
var ContourIntegral = "∮";
var Copf = "ℂ";
var Coproduct = "∐";
var CounterClockwiseContourIntegral = "∳";
var Cross = "⨯";
var Cscr = "𝒞";
var Cup = "⋓";
var CupCap = "≍";
var DD = "ⅅ";
var DDotrahd = "⤑";
var DJcy = "Ђ";
var DScy = "Ѕ";
var DZcy = "Џ";
var Dagger$1 = "‡";
var Darr = "↡";
var Dashv = "⫤";
var Dcaron = "Ď";
var Dcy = "Д";
var Del = "∇";
var Delta$1 = "Δ";
var Dfr = "𝔇";
var DiacriticalAcute = "´";
var DiacriticalDot = "˙";
var DiacriticalDoubleAcute = "˝";
var DiacriticalGrave = "`";
var DiacriticalTilde = "˜";
var Diamond = "⋄";
var DifferentialD = "ⅆ";
var Dopf = "𝔻";
var Dot = "¨";
var DotDot = "⃜";
var DotEqual = "≐";
var DoubleContourIntegral = "∯";
var DoubleDot = "¨";
var DoubleDownArrow = "⇓";
var DoubleLeftArrow = "⇐";
var DoubleLeftRightArrow = "⇔";
var DoubleLeftTee = "⫤";
var DoubleLongLeftArrow = "⟸";
var DoubleLongLeftRightArrow = "⟺";
var DoubleLongRightArrow = "⟹";
var DoubleRightArrow = "⇒";
var DoubleRightTee = "⊨";
var DoubleUpArrow = "⇑";
var DoubleUpDownArrow = "⇕";
var DoubleVerticalBar = "∥";
var DownArrow = "↓";
var DownArrowBar = "⤓";
var DownArrowUpArrow = "⇵";
var DownBreve = "̑";
var DownLeftRightVector = "⥐";
var DownLeftTeeVector = "⥞";
var DownLeftVector = "↽";
var DownLeftVectorBar = "⥖";
var DownRightTeeVector = "⥟";
var DownRightVector = "⇁";
var DownRightVectorBar = "⥗";
var DownTee = "⊤";
var DownTeeArrow = "↧";
var Downarrow = "⇓";
var Dscr = "𝒟";
var Dstrok = "Đ";
var ENG = "Ŋ";
var ET = "Ð";
var ETH$2 = "Ð";
var Eacut = "É";
var Eacute$2 = "É";
var Ecaron = "Ě";
var Ecir = "Ê";
var Ecirc$2 = "Ê";
var Ecy = "Э";
var Edot = "Ė";
var Efr = "𝔈";
var Egrav = "È";
var Egrave$2 = "È";
var Element$1 = "∈";
var Emacr = "Ē";
var EmptySmallSquare = "◻";
var EmptyVerySmallSquare = "▫";
var Eogon = "Ę";
var Eopf = "𝔼";
var Epsilon$1 = "Ε";
var Equal = "⩵";
var EqualTilde = "≂";
var Equilibrium = "⇌";
var Escr = "ℰ";
var Esim = "⩳";
var Eta$1 = "Η";
var Eum = "Ë";
var Euml$2 = "Ë";
var Exists = "∃";
var ExponentialE = "ⅇ";
var Fcy = "Ф";
var Ffr = "𝔉";
var FilledSmallSquare = "◼";
var FilledVerySmallSquare = "▪";
var Fopf = "𝔽";
var ForAll = "∀";
var Fouriertrf = "ℱ";
var Fscr = "ℱ";
var GJcy = "Ѓ";
var G = ">";
var GT$1 = ">";
var Gamma$1 = "Γ";
var Gammad = "Ϝ";
var Gbreve = "Ğ";
var Gcedil = "Ģ";
var Gcirc = "Ĝ";
var Gcy = "Г";
var Gdot = "Ġ";
var Gfr = "𝔊";
var Gg = "⋙";
var Gopf = "𝔾";
var GreaterEqual = "≥";
var GreaterEqualLess = "⋛";
var GreaterFullEqual = "≧";
var GreaterGreater = "⪢";
var GreaterLess = "≷";
var GreaterSlantEqual = "⩾";
var GreaterTilde = "≳";
var Gscr = "𝒢";
var Gt = "≫";
var HARDcy = "Ъ";
var Hacek = "ˇ";
var Hat = "^";
var Hcirc = "Ĥ";
var Hfr = "ℌ";
var HilbertSpace = "ℋ";
var Hopf = "ℍ";
var HorizontalLine = "─";
var Hscr = "ℋ";
var Hstrok = "Ħ";
var HumpDownHump = "≎";
var HumpEqual = "≏";
var IEcy = "Е";
var IJlig = "Ĳ";
var IOcy = "Ё";
var Iacut = "Í";
var Iacute$2 = "Í";
var Icir = "Î";
var Icirc$2 = "Î";
var Icy = "И";
var Idot = "İ";
var Ifr = "ℑ";
var Igrav = "Ì";
var Igrave$2 = "Ì";
var Im = "ℑ";
var Imacr = "Ī";
var ImaginaryI = "ⅈ";
var Implies = "⇒";
var Int = "∬";
var Integral = "∫";
var Intersection = "⋂";
var InvisibleComma = "⁣";
var InvisibleTimes = "⁢";
var Iogon = "Į";
var Iopf = "𝕀";
var Iota$1 = "Ι";
var Iscr = "ℐ";
var Itilde = "Ĩ";
var Iukcy = "І";
var Ium = "Ï";
var Iuml$2 = "Ï";
var Jcirc = "Ĵ";
var Jcy = "Й";
var Jfr = "𝔍";
var Jopf = "𝕁";
var Jscr = "𝒥";
var Jsercy = "Ј";
var Jukcy = "Є";
var KHcy = "Х";
var KJcy = "Ќ";
var Kappa$1 = "Κ";
var Kcedil = "Ķ";
var Kcy = "К";
var Kfr = "𝔎";
var Kopf = "𝕂";
var Kscr = "𝒦";
var LJcy = "Љ";
var L = "<";
var LT$1 = "<";
var Lacute = "Ĺ";
var Lambda$1 = "Λ";
var Lang = "⟪";
var Laplacetrf = "ℒ";
var Larr = "↞";
var Lcaron = "Ľ";
var Lcedil = "Ļ";
var Lcy = "Л";
var LeftAngleBracket = "⟨";
var LeftArrow = "←";
var LeftArrowBar = "⇤";
var LeftArrowRightArrow = "⇆";
var LeftCeiling = "⌈";
var LeftDoubleBracket = "⟦";
var LeftDownTeeVector = "⥡";
var LeftDownVector = "⇃";
var LeftDownVectorBar = "⥙";
var LeftFloor = "⌊";
var LeftRightArrow = "↔";
var LeftRightVector = "⥎";
var LeftTee = "⊣";
var LeftTeeArrow = "↤";
var LeftTeeVector = "⥚";
var LeftTriangle = "⊲";
var LeftTriangleBar = "⧏";
var LeftTriangleEqual = "⊴";
var LeftUpDownVector = "⥑";
var LeftUpTeeVector = "⥠";
var LeftUpVector = "↿";
var LeftUpVectorBar = "⥘";
var LeftVector = "↼";
var LeftVectorBar = "⥒";
var Leftarrow = "⇐";
var Leftrightarrow = "⇔";
var LessEqualGreater = "⋚";
var LessFullEqual = "≦";
var LessGreater = "≶";
var LessLess = "⪡";
var LessSlantEqual = "⩽";
var LessTilde = "≲";
var Lfr = "𝔏";
var Ll = "⋘";
var Lleftarrow = "⇚";
var Lmidot = "Ŀ";
var LongLeftArrow = "⟵";
var LongLeftRightArrow = "⟷";
var LongRightArrow = "⟶";
var Longleftarrow = "⟸";
var Longleftrightarrow = "⟺";
var Longrightarrow = "⟹";
var Lopf = "𝕃";
var LowerLeftArrow = "↙";
var LowerRightArrow = "↘";
var Lscr = "ℒ";
var Lsh = "↰";
var Lstrok = "Ł";
var Lt = "≪";
var Mcy = "М";
var MediumSpace = " ";
var Mellintrf = "ℳ";
var Mfr = "𝔐";
var MinusPlus = "∓";
var Mopf = "𝕄";
var Mscr = "ℳ";
var Mu$1 = "Μ";
var NJcy = "Њ";
var Nacute = "Ń";
var Ncaron = "Ň";
var Ncedil = "Ņ";
var Ncy = "Н";
var NegativeMediumSpace = "​";
var NegativeThickSpace = "​";
var NegativeThinSpace = "​";
var NegativeVeryThinSpace = "​";
var NestedGreaterGreater = "≫";
var NestedLessLess = "≪";
var NewLine = "\n";
var Nfr = "𝔑";
var NoBreak = "⁠";
var NonBreakingSpace = " ";
var Nopf = "ℕ";
var Not = "⫬";
var NotCongruent = "≢";
var NotCupCap = "≭";
var NotDoubleVerticalBar = "∦";
var NotElement = "∉";
var NotEqual = "≠";
var NotEqualTilde = "≂̸";
var NotExists = "∄";
var NotGreater = "≯";
var NotGreaterEqual = "≱";
var NotGreaterFullEqual = "≧̸";
var NotGreaterGreater = "≫̸";
var NotGreaterLess = "≹";
var NotGreaterSlantEqual = "⩾̸";
var NotGreaterTilde = "≵";
var NotHumpDownHump = "≎̸";
var NotHumpEqual = "≏̸";
var NotLeftTriangle = "⋪";
var NotLeftTriangleBar = "⧏̸";
var NotLeftTriangleEqual = "⋬";
var NotLess = "≮";
var NotLessEqual = "≰";
var NotLessGreater = "≸";
var NotLessLess = "≪̸";
var NotLessSlantEqual = "⩽̸";
var NotLessTilde = "≴";
var NotNestedGreaterGreater = "⪢̸";
var NotNestedLessLess = "⪡̸";
var NotPrecedes = "⊀";
var NotPrecedesEqual = "⪯̸";
var NotPrecedesSlantEqual = "⋠";
var NotReverseElement = "∌";
var NotRightTriangle = "⋫";
var NotRightTriangleBar = "⧐̸";
var NotRightTriangleEqual = "⋭";
var NotSquareSubset = "⊏̸";
var NotSquareSubsetEqual = "⋢";
var NotSquareSuperset = "⊐̸";
var NotSquareSupersetEqual = "⋣";
var NotSubset = "⊂⃒";
var NotSubsetEqual = "⊈";
var NotSucceeds = "⊁";
var NotSucceedsEqual = "⪰̸";
var NotSucceedsSlantEqual = "⋡";
var NotSucceedsTilde = "≿̸";
var NotSuperset = "⊃⃒";
var NotSupersetEqual = "⊉";
var NotTilde = "≁";
var NotTildeEqual = "≄";
var NotTildeFullEqual = "≇";
var NotTildeTilde = "≉";
var NotVerticalBar = "∤";
var Nscr = "𝒩";
var Ntild = "Ñ";
var Ntilde$2 = "Ñ";
var Nu$1 = "Ν";
var OElig$1 = "Œ";
var Oacut = "Ó";
var Oacute$2 = "Ó";
var Ocir = "Ô";
var Ocirc$2 = "Ô";
var Ocy = "О";
var Odblac = "Ő";
var Ofr = "𝔒";
var Ograv = "Ò";
var Ograve$2 = "Ò";
var Omacr = "Ō";
var Omega$1 = "Ω";
var Omicron$1 = "Ο";
var Oopf = "𝕆";
var OpenCurlyDoubleQuote = "“";
var OpenCurlyQuote = "‘";
var Or = "⩔";
var Oscr = "𝒪";
var Oslas = "Ø";
var Oslash$2 = "Ø";
var Otild = "Õ";
var Otilde$2 = "Õ";
var Otimes = "⨷";
var Oum = "Ö";
var Ouml$2 = "Ö";
var OverBar = "‾";
var OverBrace = "⏞";
var OverBracket = "⎴";
var OverParenthesis = "⏜";
var PartialD = "∂";
var Pcy = "П";
var Pfr = "𝔓";
var Phi$1 = "Φ";
var Pi$1 = "Π";
var PlusMinus = "±";
var Poincareplane = "ℌ";
var Popf = "ℙ";
var Pr = "⪻";
var Precedes = "≺";
var PrecedesEqual = "⪯";
var PrecedesSlantEqual = "≼";
var PrecedesTilde = "≾";
var Prime$1 = "″";
var Product = "∏";
var Proportion = "∷";
var Proportional = "∝";
var Pscr = "𝒫";
var Psi$1 = "Ψ";
var QUO = "\"";
var QUOT$1 = "\"";
var Qfr = "𝔔";
var Qopf = "ℚ";
var Qscr = "𝒬";
var RBarr = "⤐";
var RE = "®";
var REG$1 = "®";
var Racute = "Ŕ";
var Rang = "⟫";
var Rarr = "↠";
var Rarrtl = "⤖";
var Rcaron = "Ř";
var Rcedil = "Ŗ";
var Rcy = "Р";
var Re = "ℜ";
var ReverseElement = "∋";
var ReverseEquilibrium = "⇋";
var ReverseUpEquilibrium = "⥯";
var Rfr = "ℜ";
var Rho$1 = "Ρ";
var RightAngleBracket = "⟩";
var RightArrow = "→";
var RightArrowBar = "⇥";
var RightArrowLeftArrow = "⇄";
var RightCeiling = "⌉";
var RightDoubleBracket = "⟧";
var RightDownTeeVector = "⥝";
var RightDownVector = "⇂";
var RightDownVectorBar = "⥕";
var RightFloor = "⌋";
var RightTee = "⊢";
var RightTeeArrow = "↦";
var RightTeeVector = "⥛";
var RightTriangle = "⊳";
var RightTriangleBar = "⧐";
var RightTriangleEqual = "⊵";
var RightUpDownVector = "⥏";
var RightUpTeeVector = "⥜";
var RightUpVector = "↾";
var RightUpVectorBar = "⥔";
var RightVector = "⇀";
var RightVectorBar = "⥓";
var Rightarrow = "⇒";
var Ropf = "ℝ";
var RoundImplies = "⥰";
var Rrightarrow = "⇛";
var Rscr = "ℛ";
var Rsh = "↱";
var RuleDelayed = "⧴";
var SHCHcy = "Щ";
var SHcy = "Ш";
var SOFTcy = "Ь";
var Sacute = "Ś";
var Sc = "⪼";
var Scaron$1 = "Š";
var Scedil = "Ş";
var Scirc = "Ŝ";
var Scy = "С";
var Sfr = "𝔖";
var ShortDownArrow = "↓";
var ShortLeftArrow = "←";
var ShortRightArrow = "→";
var ShortUpArrow = "↑";
var Sigma$1 = "Σ";
var SmallCircle = "∘";
var Sopf = "𝕊";
var Sqrt = "√";
var Square = "□";
var SquareIntersection = "⊓";
var SquareSubset = "⊏";
var SquareSubsetEqual = "⊑";
var SquareSuperset = "⊐";
var SquareSupersetEqual = "⊒";
var SquareUnion = "⊔";
var Sscr = "𝒮";
var Star = "⋆";
var Sub = "⋐";
var Subset = "⋐";
var SubsetEqual = "⊆";
var Succeeds = "≻";
var SucceedsEqual = "⪰";
var SucceedsSlantEqual = "≽";
var SucceedsTilde = "≿";
var SuchThat = "∋";
var Sum = "∑";
var Sup = "⋑";
var Superset = "⊃";
var SupersetEqual = "⊇";
var Supset = "⋑";
var THOR = "Þ";
var THORN$2 = "Þ";
var TRADE = "™";
var TSHcy = "Ћ";
var TScy = "Ц";
var Tab = "\t";
var Tau$1 = "Τ";
var Tcaron = "Ť";
var Tcedil = "Ţ";
var Tcy = "Т";
var Tfr = "𝔗";
var Therefore = "∴";
var Theta$1 = "Θ";
var ThickSpace = "  ";
var ThinSpace = " ";
var Tilde = "∼";
var TildeEqual = "≃";
var TildeFullEqual = "≅";
var TildeTilde = "≈";
var Topf = "𝕋";
var TripleDot = "⃛";
var Tscr = "𝒯";
var Tstrok = "Ŧ";
var Uacut = "Ú";
var Uacute$2 = "Ú";
var Uarr = "↟";
var Uarrocir = "⥉";
var Ubrcy = "Ў";
var Ubreve = "Ŭ";
var Ucir = "Û";
var Ucirc$2 = "Û";
var Ucy = "У";
var Udblac = "Ű";
var Ufr = "𝔘";
var Ugrav = "Ù";
var Ugrave$2 = "Ù";
var Umacr = "Ū";
var UnderBar = "_";
var UnderBrace = "⏟";
var UnderBracket = "⎵";
var UnderParenthesis = "⏝";
var Union = "⋃";
var UnionPlus = "⊎";
var Uogon = "Ų";
var Uopf = "𝕌";
var UpArrow = "↑";
var UpArrowBar = "⤒";
var UpArrowDownArrow = "⇅";
var UpDownArrow = "↕";
var UpEquilibrium = "⥮";
var UpTee = "⊥";
var UpTeeArrow = "↥";
var Uparrow = "⇑";
var Updownarrow = "⇕";
var UpperLeftArrow = "↖";
var UpperRightArrow = "↗";
var Upsi = "ϒ";
var Upsilon$1 = "Υ";
var Uring = "Ů";
var Uscr = "𝒰";
var Utilde = "Ũ";
var Uum = "Ü";
var Uuml$2 = "Ü";
var VDash = "⊫";
var Vbar = "⫫";
var Vcy = "В";
var Vdash = "⊩";
var Vdashl = "⫦";
var Vee = "⋁";
var Verbar = "‖";
var Vert = "‖";
var VerticalBar = "∣";
var VerticalLine = "|";
var VerticalSeparator = "❘";
var VerticalTilde = "≀";
var VeryThinSpace = " ";
var Vfr = "𝔙";
var Vopf = "𝕍";
var Vscr = "𝒱";
var Vvdash = "⊪";
var Wcirc = "Ŵ";
var Wedge = "⋀";
var Wfr = "𝔚";
var Wopf = "𝕎";
var Wscr = "𝒲";
var Xfr = "𝔛";
var Xi$1 = "Ξ";
var Xopf = "𝕏";
var Xscr = "𝒳";
var YAcy = "Я";
var YIcy = "Ї";
var YUcy = "Ю";
var Yacut = "Ý";
var Yacute$2 = "Ý";
var Ycirc = "Ŷ";
var Ycy = "Ы";
var Yfr = "𝔜";
var Yopf = "𝕐";
var Yscr = "𝒴";
var Yuml$1 = "Ÿ";
var ZHcy = "Ж";
var Zacute = "Ź";
var Zcaron = "Ž";
var Zcy = "З";
var Zdot = "Ż";
var ZeroWidthSpace = "​";
var Zeta$1 = "Ζ";
var Zfr = "ℨ";
var Zopf = "ℤ";
var Zscr = "𝒵";
var aacut = "á";
var aacute$2 = "á";
var abreve = "ă";
var ac = "∾";
var acE = "∾̳";
var acd = "∿";
var acir = "â";
var acirc$2 = "â";
var acut = "´";
var acute$2 = "´";
var acy = "а";
var aeli = "æ";
var aelig$2 = "æ";
var af = "⁡";
var afr = "𝔞";
var agrav = "à";
var agrave$2 = "à";
var alefsym$1 = "ℵ";
var aleph = "ℵ";
var alpha$1 = "α";
var amacr = "ā";
var amalg = "⨿";
var am = "&";
var amp$2 = "&";
var and$1 = "∧";
var andand = "⩕";
var andd = "⩜";
var andslope = "⩘";
var andv = "⩚";
var ang$1 = "∠";
var ange = "⦤";
var angle = "∠";
var angmsd = "∡";
var angmsdaa = "⦨";
var angmsdab = "⦩";
var angmsdac = "⦪";
var angmsdad = "⦫";
var angmsdae = "⦬";
var angmsdaf = "⦭";
var angmsdag = "⦮";
var angmsdah = "⦯";
var angrt = "∟";
var angrtvb = "⊾";
var angrtvbd = "⦝";
var angsph = "∢";
var angst = "Å";
var angzarr = "⍼";
var aogon = "ą";
var aopf = "𝕒";
var ap = "≈";
var apE = "⩰";
var apacir = "⩯";
var ape = "≊";
var apid = "≋";
var apos = "'";
var approx = "≈";
var approxeq = "≊";
var arin = "å";
var aring$2 = "å";
var ascr = "𝒶";
var ast = "*";
var asymp$1 = "≈";
var asympeq = "≍";
var atild = "ã";
var atilde$2 = "ã";
var aum = "ä";
var auml$2 = "ä";
var awconint = "∳";
var awint = "⨑";
var bNot = "⫭";
var backcong = "≌";
var backepsilon = "϶";
var backprime = "‵";
var backsim = "∽";
var backsimeq = "⋍";
var barvee = "⊽";
var barwed = "⌅";
var barwedge = "⌅";
var bbrk = "⎵";
var bbrktbrk = "⎶";
var bcong = "≌";
var bcy = "б";
var bdquo$1 = "„";
var becaus = "∵";
var because = "∵";
var bemptyv = "⦰";
var bepsi = "϶";
var bernou = "ℬ";
var beta$1 = "β";
var beth = "ℶ";
var between = "≬";
var bfr = "𝔟";
var bigcap = "⋂";
var bigcirc = "◯";
var bigcup = "⋃";
var bigodot = "⨀";
var bigoplus = "⨁";
var bigotimes = "⨂";
var bigsqcup = "⨆";
var bigstar = "★";
var bigtriangledown = "▽";
var bigtriangleup = "△";
var biguplus = "⨄";
var bigvee = "⋁";
var bigwedge = "⋀";
var bkarow = "⤍";
var blacklozenge = "⧫";
var blacksquare = "▪";
var blacktriangle = "▴";
var blacktriangledown = "▾";
var blacktriangleleft = "◂";
var blacktriangleright = "▸";
var blank = "␣";
var blk12 = "▒";
var blk14 = "░";
var blk34 = "▓";
var block = "█";
var bne = "=⃥";
var bnequiv = "≡⃥";
var bnot = "⌐";
var bopf = "𝕓";
var bot = "⊥";
var bottom = "⊥";
var bowtie = "⋈";
var boxDL = "╗";
var boxDR = "╔";
var boxDl = "╖";
var boxDr = "╓";
var boxH = "═";
var boxHD = "╦";
var boxHU = "╩";
var boxHd = "╤";
var boxHu = "╧";
var boxUL = "╝";
var boxUR = "╚";
var boxUl = "╜";
var boxUr = "╙";
var boxV = "║";
var boxVH = "╬";
var boxVL = "╣";
var boxVR = "╠";
var boxVh = "╫";
var boxVl = "╢";
var boxVr = "╟";
var boxbox = "⧉";
var boxdL = "╕";
var boxdR = "╒";
var boxdl = "┐";
var boxdr = "┌";
var boxh = "─";
var boxhD = "╥";
var boxhU = "╨";
var boxhd = "┬";
var boxhu = "┴";
var boxminus = "⊟";
var boxplus = "⊞";
var boxtimes = "⊠";
var boxuL = "╛";
var boxuR = "╘";
var boxul = "┘";
var boxur = "└";
var boxv = "│";
var boxvH = "╪";
var boxvL = "╡";
var boxvR = "╞";
var boxvh = "┼";
var boxvl = "┤";
var boxvr = "├";
var bprime = "‵";
var breve = "˘";
var brvba = "¦";
var brvbar$2 = "¦";
var bscr = "𝒷";
var bsemi = "⁏";
var bsim = "∽";
var bsime = "⋍";
var bsol = "\\";
var bsolb = "⧅";
var bsolhsub = "⟈";
var bull$1 = "•";
var bullet = "•";
var bump = "≎";
var bumpE = "⪮";
var bumpe = "≏";
var bumpeq = "≏";
var cacute = "ć";
var cap$2 = "∩";
var capand = "⩄";
var capbrcup = "⩉";
var capcap = "⩋";
var capcup = "⩇";
var capdot = "⩀";
var caps = "∩︀";
var caret = "⁁";
var caron = "ˇ";
var ccaps = "⩍";
var ccaron = "č";
var ccedi = "ç";
var ccedil$2 = "ç";
var ccirc = "ĉ";
var ccups = "⩌";
var ccupssm = "⩐";
var cdot = "ċ";
var cedi = "¸";
var cedil$2 = "¸";
var cemptyv = "⦲";
var cen = "¢";
var cent$2 = "¢";
var centerdot = "·";
var cfr = "𝔠";
var chcy = "ч";
var check = "✓";
var checkmark = "✓";
var chi$1 = "χ";
var cir = "○";
var cirE = "⧃";
var circ$1 = "ˆ";
var circeq = "≗";
var circlearrowleft = "↺";
var circlearrowright = "↻";
var circledR = "®";
var circledS = "Ⓢ";
var circledast = "⊛";
var circledcirc = "⊚";
var circleddash = "⊝";
var cire = "≗";
var cirfnint = "⨐";
var cirmid = "⫯";
var cirscir = "⧂";
var clubs$1 = "♣";
var clubsuit = "♣";
var colon = ":";
var colone = "≔";
var coloneq = "≔";
var comma$1 = ",";
var commat = "@";
var comp = "∁";
var compfn = "∘";
var complement = "∁";
var complexes = "ℂ";
var cong$1 = "≅";
var congdot = "⩭";
var conint = "∮";
var copf = "𝕔";
var coprod = "∐";
var cop = "©";
var copy$2 = "©";
var copysr = "℗";
var crarr$1 = "↵";
var cross = "✗";
var cscr = "𝒸";
var csub = "⫏";
var csube = "⫑";
var csup = "⫐";
var csupe = "⫒";
var ctdot = "⋯";
var cudarrl = "⤸";
var cudarrr = "⤵";
var cuepr = "⋞";
var cuesc = "⋟";
var cularr = "↶";
var cularrp = "⤽";
var cup$1 = "∪";
var cupbrcap = "⩈";
var cupcap = "⩆";
var cupcup = "⩊";
var cupdot = "⊍";
var cupor = "⩅";
var cups = "∪︀";
var curarr = "↷";
var curarrm = "⤼";
var curlyeqprec = "⋞";
var curlyeqsucc = "⋟";
var curlyvee = "⋎";
var curlywedge = "⋏";
var curre = "¤";
var curren$2 = "¤";
var curvearrowleft = "↶";
var curvearrowright = "↷";
var cuvee = "⋎";
var cuwed = "⋏";
var cwconint = "∲";
var cwint = "∱";
var cylcty = "⌭";
var dArr$1 = "⇓";
var dHar = "⥥";
var dagger$1 = "†";
var daleth = "ℸ";
var darr$1 = "↓";
var dash$1 = "‐";
var dashv = "⊣";
var dbkarow = "⤏";
var dblac = "˝";
var dcaron = "ď";
var dcy = "д";
var dd$1 = "ⅆ";
var ddagger = "‡";
var ddarr = "⇊";
var ddotseq = "⩷";
var de = "°";
var deg$2 = "°";
var delta$1 = "δ";
var demptyv = "⦱";
var dfisht = "⥿";
var dfr = "𝔡";
var dharl = "⇃";
var dharr = "⇂";
var diam = "⋄";
var diamond = "⋄";
var diamondsuit = "♦";
var diams$1 = "♦";
var die = "¨";
var digamma = "ϝ";
var disin = "⋲";
var div = "÷";
var divid = "÷";
var divide$2 = "÷";
var divideontimes = "⋇";
var divonx = "⋇";
var djcy = "ђ";
var dlcorn = "⌞";
var dlcrop = "⌍";
var dollar = "$";
var dopf = "𝕕";
var dot = "˙";
var doteq = "≐";
var doteqdot = "≑";
var dotminus = "∸";
var dotplus = "∔";
var dotsquare = "⊡";
var doublebarwedge = "⌆";
var downarrow = "↓";
var downdownarrows = "⇊";
var downharpoonleft = "⇃";
var downharpoonright = "⇂";
var drbkarow = "⤐";
var drcorn = "⌟";
var drcrop = "⌌";
var dscr = "𝒹";
var dscy = "ѕ";
var dsol = "⧶";
var dstrok = "đ";
var dtdot = "⋱";
var dtri = "▿";
var dtrif = "▾";
var duarr = "⇵";
var duhar = "⥯";
var dwangle = "⦦";
var dzcy = "џ";
var dzigrarr = "⟿";
var eDDot = "⩷";
var eDot = "≑";
var eacut = "é";
var eacute$2 = "é";
var easter = "⩮";
var ecaron = "ě";
var ecir = "ê";
var ecirc$2 = "ê";
var ecolon = "≕";
var ecy = "э";
var edot = "ė";
var ee = "ⅇ";
var efDot = "≒";
var efr = "𝔢";
var eg = "⪚";
var egrav = "è";
var egrave$2 = "è";
var egs = "⪖";
var egsdot = "⪘";
var el = "⪙";
var elinters = "⏧";
var ell = "ℓ";
var els = "⪕";
var elsdot = "⪗";
var emacr = "ē";
var empty$3 = "∅";
var emptyset = "∅";
var emptyv = "∅";
var emsp13 = " ";
var emsp14 = " ";
var emsp$1 = " ";
var eng = "ŋ";
var ensp$1 = " ";
var eogon = "ę";
var eopf = "𝕖";
var epar = "⋕";
var eparsl = "⧣";
var eplus = "⩱";
var epsi = "ε";
var epsilon$1 = "ε";
var epsiv = "ϵ";
var eqcirc = "≖";
var eqcolon = "≕";
var eqsim = "≂";
var eqslantgtr = "⪖";
var eqslantless = "⪕";
var equals = "=";
var equest = "≟";
var equiv$1 = "≡";
var equivDD = "⩸";
var eqvparsl = "⧥";
var erDot = "≓";
var erarr = "⥱";
var escr = "ℯ";
var esdot = "≐";
var esim = "≂";
var eta$1 = "η";
var et = "ð";
var eth$2 = "ð";
var eum = "ë";
var euml$2 = "ë";
var euro$1 = "€";
var excl = "!";
var exist$1 = "∃";
var expectation = "ℰ";
var exponentiale = "ⅇ";
var fallingdotseq = "≒";
var fcy = "ф";
var female = "♀";
var ffilig = "ﬃ";
var fflig = "ﬀ";
var ffllig = "ﬄ";
var ffr = "𝔣";
var filig = "ﬁ";
var fjlig = "fj";
var flat = "♭";
var fllig = "ﬂ";
var fltns = "▱";
var fnof$1 = "ƒ";
var fopf = "𝕗";
var forall$1 = "∀";
var fork = "⋔";
var forkv = "⫙";
var fpartint = "⨍";
var frac1 = "¼";
var frac12$2 = "½";
var frac13 = "⅓";
var frac14$2 = "¼";
var frac15 = "⅕";
var frac16 = "⅙";
var frac18 = "⅛";
var frac23 = "⅔";
var frac25 = "⅖";
var frac3 = "¾";
var frac34$2 = "¾";
var frac35 = "⅗";
var frac38 = "⅜";
var frac45 = "⅘";
var frac56 = "⅚";
var frac58 = "⅝";
var frac78 = "⅞";
var frasl$1 = "⁄";
var frown = "⌢";
var fscr = "𝒻";
var gE = "≧";
var gEl = "⪌";
var gacute = "ǵ";
var gamma$1 = "γ";
var gammad = "ϝ";
var gap = "⪆";
var gbreve = "ğ";
var gcirc = "ĝ";
var gcy = "г";
var gdot = "ġ";
var ge$1 = "≥";
var gel = "⋛";
var geq = "≥";
var geqq = "≧";
var geqslant = "⩾";
var ges = "⩾";
var gescc = "⪩";
var gesdot = "⪀";
var gesdoto = "⪂";
var gesdotol = "⪄";
var gesl = "⋛︀";
var gesles = "⪔";
var gfr = "𝔤";
var gg = "≫";
var ggg = "⋙";
var gimel = "ℷ";
var gjcy = "ѓ";
var gl = "≷";
var glE = "⪒";
var gla = "⪥";
var glj = "⪤";
var gnE = "≩";
var gnap = "⪊";
var gnapprox = "⪊";
var gne = "⪈";
var gneq = "⪈";
var gneqq = "≩";
var gnsim = "⋧";
var gopf = "𝕘";
var grave = "`";
var gscr = "ℊ";
var gsim = "≳";
var gsime = "⪎";
var gsiml = "⪐";
var g = ">";
var gt$2 = ">";
var gtcc = "⪧";
var gtcir = "⩺";
var gtdot = "⋗";
var gtlPar = "⦕";
var gtquest = "⩼";
var gtrapprox = "⪆";
var gtrarr = "⥸";
var gtrdot = "⋗";
var gtreqless = "⋛";
var gtreqqless = "⪌";
var gtrless = "≷";
var gtrsim = "≳";
var gvertneqq = "≩︀";
var gvnE = "≩︀";
var hArr$1 = "⇔";
var hairsp = " ";
var half = "½";
var hamilt = "ℋ";
var hardcy = "ъ";
var harr$1 = "↔";
var harrcir = "⥈";
var harrw = "↭";
var hbar = "ℏ";
var hcirc = "ĥ";
var hearts$1 = "♥";
var heartsuit = "♥";
var hellip$1 = "…";
var hercon = "⊹";
var hfr = "𝔥";
var hksearow = "⤥";
var hkswarow = "⤦";
var hoarr = "⇿";
var homtht = "∻";
var hookleftarrow = "↩";
var hookrightarrow = "↪";
var hopf = "𝕙";
var horbar = "―";
var hscr = "𝒽";
var hslash = "ℏ";
var hstrok = "ħ";
var hybull = "⁃";
var hyphen = "‐";
var iacut = "í";
var iacute$2 = "í";
var ic = "⁣";
var icir = "î";
var icirc$2 = "î";
var icy = "и";
var iecy = "е";
var iexc = "¡";
var iexcl$2 = "¡";
var iff = "⇔";
var ifr = "𝔦";
var igrav = "ì";
var igrave$2 = "ì";
var ii = "ⅈ";
var iiiint = "⨌";
var iiint = "∭";
var iinfin = "⧜";
var iiota = "℩";
var ijlig = "ĳ";
var imacr = "ī";
var image$2 = "ℑ";
var imagline = "ℐ";
var imagpart = "ℑ";
var imath = "ı";
var imof = "⊷";
var imped = "Ƶ";
var incare = "℅";
var infin$1 = "∞";
var infintie = "⧝";
var inodot = "ı";
var int$2 = "∫";
var intcal = "⊺";
var integers = "ℤ";
var intercal = "⊺";
var intlarhk = "⨗";
var intprod = "⨼";
var iocy = "ё";
var iogon = "į";
var iopf = "𝕚";
var iota$1 = "ι";
var iprod = "⨼";
var iques = "¿";
var iquest$2 = "¿";
var iscr = "𝒾";
var isin$1 = "∈";
var isinE = "⋹";
var isindot = "⋵";
var isins = "⋴";
var isinsv = "⋳";
var isinv = "∈";
var it = "⁢";
var itilde = "ĩ";
var iukcy = "і";
var ium = "ï";
var iuml$2 = "ï";
var jcirc = "ĵ";
var jcy = "й";
var jfr = "𝔧";
var jmath = "ȷ";
var jopf = "𝕛";
var jscr = "𝒿";
var jsercy = "ј";
var jukcy = "є";
var kappa$1 = "κ";
var kappav = "ϰ";
var kcedil = "ķ";
var kcy = "к";
var kfr = "𝔨";
var kgreen = "ĸ";
var khcy = "х";
var kjcy = "ќ";
var kopf = "𝕜";
var kscr = "𝓀";
var lAarr = "⇚";
var lArr$1 = "⇐";
var lAtail = "⤛";
var lBarr = "⤎";
var lE = "≦";
var lEg = "⪋";
var lHar = "⥢";
var lacute = "ĺ";
var laemptyv = "⦴";
var lagran = "ℒ";
var lambda$1 = "λ";
var lang$1 = "⟨";
var langd = "⦑";
var langle = "⟨";
var lap = "⪅";
var laqu = "«";
var laquo$2 = "«";
var larr$1 = "←";
var larrb = "⇤";
var larrbfs = "⤟";
var larrfs = "⤝";
var larrhk = "↩";
var larrlp = "↫";
var larrpl = "⤹";
var larrsim = "⥳";
var larrtl = "↢";
var lat = "⪫";
var latail = "⤙";
var late = "⪭";
var lates = "⪭︀";
var lbarr = "⤌";
var lbbrk = "❲";
var lbrace = "{";
var lbrack = "[";
var lbrke = "⦋";
var lbrksld = "⦏";
var lbrkslu = "⦍";
var lcaron = "ľ";
var lcedil = "ļ";
var lceil$1 = "⌈";
var lcub = "{";
var lcy = "л";
var ldca = "⤶";
var ldquo$1 = "“";
var ldquor = "„";
var ldrdhar = "⥧";
var ldrushar = "⥋";
var ldsh = "↲";
var le$1 = "≤";
var leftarrow = "←";
var leftarrowtail = "↢";
var leftharpoondown = "↽";
var leftharpoonup = "↼";
var leftleftarrows = "⇇";
var leftrightarrow = "↔";
var leftrightarrows = "⇆";
var leftrightharpoons = "⇋";
var leftrightsquigarrow = "↭";
var leftthreetimes = "⋋";
var leg = "⋚";
var leq = "≤";
var leqq = "≦";
var leqslant = "⩽";
var les = "⩽";
var lescc = "⪨";
var lesdot = "⩿";
var lesdoto = "⪁";
var lesdotor = "⪃";
var lesg = "⋚︀";
var lesges = "⪓";
var lessapprox = "⪅";
var lessdot = "⋖";
var lesseqgtr = "⋚";
var lesseqqgtr = "⪋";
var lessgtr = "≶";
var lesssim = "≲";
var lfisht = "⥼";
var lfloor$1 = "⌊";
var lfr = "𝔩";
var lg = "≶";
var lgE = "⪑";
var lhard = "↽";
var lharu = "↼";
var lharul = "⥪";
var lhblk = "▄";
var ljcy = "љ";
var ll = "≪";
var llarr = "⇇";
var llcorner = "⌞";
var llhard = "⥫";
var lltri = "◺";
var lmidot = "ŀ";
var lmoust = "⎰";
var lmoustache = "⎰";
var lnE = "≨";
var lnap = "⪉";
var lnapprox = "⪉";
var lne = "⪇";
var lneq = "⪇";
var lneqq = "≨";
var lnsim = "⋦";
var loang = "⟬";
var loarr = "⇽";
var lobrk = "⟦";
var longleftarrow = "⟵";
var longleftrightarrow = "⟷";
var longmapsto = "⟼";
var longrightarrow = "⟶";
var looparrowleft = "↫";
var looparrowright = "↬";
var lopar = "⦅";
var lopf = "𝕝";
var loplus = "⨭";
var lotimes = "⨴";
var lowast$1 = "∗";
var lowbar = "_";
var loz$1 = "◊";
var lozenge = "◊";
var lozf = "⧫";
var lpar = "(";
var lparlt = "⦓";
var lrarr = "⇆";
var lrcorner = "⌟";
var lrhar = "⇋";
var lrhard = "⥭";
var lrm$1 = "‎";
var lrtri = "⊿";
var lsaquo$1 = "‹";
var lscr = "𝓁";
var lsh = "↰";
var lsim = "≲";
var lsime = "⪍";
var lsimg = "⪏";
var lsqb = "[";
var lsquo$1 = "‘";
var lsquor = "‚";
var lstrok = "ł";
var l = "<";
var lt$2 = "<";
var ltcc = "⪦";
var ltcir = "⩹";
var ltdot = "⋖";
var lthree = "⋋";
var ltimes = "⋉";
var ltlarr = "⥶";
var ltquest = "⩻";
var ltrPar = "⦖";
var ltri = "◃";
var ltrie = "⊴";
var ltrif = "◂";
var lurdshar = "⥊";
var luruhar = "⥦";
var lvertneqq = "≨︀";
var lvnE = "≨︀";
var mDDot = "∺";
var mac = "¯";
var macr$2 = "¯";
var male = "♂";
var malt = "✠";
var maltese = "✠";
var map$1 = "↦";
var mapsto = "↦";
var mapstodown = "↧";
var mapstoleft = "↤";
var mapstoup = "↥";
var marker = "▮";
var mcomma = "⨩";
var mcy = "м";
var mdash$1 = "—";
var measuredangle = "∡";
var mfr = "𝔪";
var mho = "℧";
var micr = "µ";
var micro$2 = "µ";
var mid = "∣";
var midast = "*";
var midcir = "⫰";
var middo = "·";
var middot$2 = "·";
var minus$1 = "−";
var minusb = "⊟";
var minusd = "∸";
var minusdu = "⨪";
var mlcp = "⫛";
var mldr = "…";
var mnplus = "∓";
var models = "⊧";
var mopf = "𝕞";
var mp = "∓";
var mscr = "𝓂";
var mstpos = "∾";
var mu$1 = "μ";
var multimap = "⊸";
var mumap = "⊸";
var nGg = "⋙̸";
var nGt = "≫⃒";
var nGtv = "≫̸";
var nLeftarrow = "⇍";
var nLeftrightarrow = "⇎";
var nLl = "⋘̸";
var nLt = "≪⃒";
var nLtv = "≪̸";
var nRightarrow = "⇏";
var nVDash = "⊯";
var nVdash = "⊮";
var nabla$1 = "∇";
var nacute = "ń";
var nang = "∠⃒";
var nap = "≉";
var napE = "⩰̸";
var napid = "≋̸";
var napos = "ŉ";
var napprox = "≉";
var natur = "♮";
var natural = "♮";
var naturals = "ℕ";
var nbs = " ";
var nbsp$2 = " ";
var nbump = "≎̸";
var nbumpe = "≏̸";
var ncap = "⩃";
var ncaron = "ň";
var ncedil = "ņ";
var ncong = "≇";
var ncongdot = "⩭̸";
var ncup = "⩂";
var ncy = "н";
var ndash$1 = "–";
var ne$1 = "≠";
var neArr = "⇗";
var nearhk = "⤤";
var nearr = "↗";
var nearrow = "↗";
var nedot = "≐̸";
var nequiv = "≢";
var nesear = "⤨";
var nesim = "≂̸";
var nexist = "∄";
var nexists = "∄";
var nfr = "𝔫";
var ngE = "≧̸";
var nge = "≱";
var ngeq = "≱";
var ngeqq = "≧̸";
var ngeqslant = "⩾̸";
var nges = "⩾̸";
var ngsim = "≵";
var ngt = "≯";
var ngtr = "≯";
var nhArr = "⇎";
var nharr = "↮";
var nhpar = "⫲";
var ni$1 = "∋";
var nis = "⋼";
var nisd = "⋺";
var niv = "∋";
var njcy = "њ";
var nlArr = "⇍";
var nlE = "≦̸";
var nlarr = "↚";
var nldr = "‥";
var nle = "≰";
var nleftarrow = "↚";
var nleftrightarrow = "↮";
var nleq = "≰";
var nleqq = "≦̸";
var nleqslant = "⩽̸";
var nles = "⩽̸";
var nless = "≮";
var nlsim = "≴";
var nlt = "≮";
var nltri = "⋪";
var nltrie = "⋬";
var nmid = "∤";
var nopf = "𝕟";
var no = "¬";
var not$2 = "¬";
var notin$1 = "∉";
var notinE = "⋹̸";
var notindot = "⋵̸";
var notinva = "∉";
var notinvb = "⋷";
var notinvc = "⋶";
var notni = "∌";
var notniva = "∌";
var notnivb = "⋾";
var notnivc = "⋽";
var npar = "∦";
var nparallel = "∦";
var nparsl = "⫽⃥";
var npart = "∂̸";
var npolint = "⨔";
var npr = "⊀";
var nprcue = "⋠";
var npre = "⪯̸";
var nprec = "⊀";
var npreceq = "⪯̸";
var nrArr = "⇏";
var nrarr = "↛";
var nrarrc = "⤳̸";
var nrarrw = "↝̸";
var nrightarrow = "↛";
var nrtri = "⋫";
var nrtrie = "⋭";
var nsc = "⊁";
var nsccue = "⋡";
var nsce = "⪰̸";
var nscr = "𝓃";
var nshortmid = "∤";
var nshortparallel = "∦";
var nsim = "≁";
var nsime = "≄";
var nsimeq = "≄";
var nsmid = "∤";
var nspar = "∦";
var nsqsube = "⋢";
var nsqsupe = "⋣";
var nsub$1 = "⊄";
var nsubE = "⫅̸";
var nsube = "⊈";
var nsubset = "⊂⃒";
var nsubseteq = "⊈";
var nsubseteqq = "⫅̸";
var nsucc = "⊁";
var nsucceq = "⪰̸";
var nsup = "⊅";
var nsupE = "⫆̸";
var nsupe = "⊉";
var nsupset = "⊃⃒";
var nsupseteq = "⊉";
var nsupseteqq = "⫆̸";
var ntgl = "≹";
var ntild = "ñ";
var ntilde$2 = "ñ";
var ntlg = "≸";
var ntriangleleft = "⋪";
var ntrianglelefteq = "⋬";
var ntriangleright = "⋫";
var ntrianglerighteq = "⋭";
var nu$1 = "ν";
var num = "#";
var numero = "№";
var numsp = " ";
var nvDash = "⊭";
var nvHarr = "⤄";
var nvap = "≍⃒";
var nvdash = "⊬";
var nvge = "≥⃒";
var nvgt = ">⃒";
var nvinfin = "⧞";
var nvlArr = "⤂";
var nvle = "≤⃒";
var nvlt = "<⃒";
var nvltrie = "⊴⃒";
var nvrArr = "⤃";
var nvrtrie = "⊵⃒";
var nvsim = "∼⃒";
var nwArr = "⇖";
var nwarhk = "⤣";
var nwarr = "↖";
var nwarrow = "↖";
var nwnear = "⤧";
var oS = "Ⓢ";
var oacut = "ó";
var oacute$2 = "ó";
var oast = "⊛";
var ocir = "ô";
var ocirc$2 = "ô";
var ocy = "о";
var odash = "⊝";
var odblac = "ő";
var odiv = "⨸";
var odot = "⊙";
var odsold = "⦼";
var oelig$1 = "œ";
var ofcir = "⦿";
var ofr = "𝔬";
var ogon = "˛";
var ograv = "ò";
var ograve$2 = "ò";
var ogt = "⧁";
var ohbar = "⦵";
var ohm = "Ω";
var oint = "∮";
var olarr = "↺";
var olcir = "⦾";
var olcross = "⦻";
var oline$1 = "‾";
var olt = "⧀";
var omacr = "ō";
var omega$1 = "ω";
var omicron$1 = "ο";
var omid = "⦶";
var ominus = "⊖";
var oopf = "𝕠";
var opar = "⦷";
var operp = "⦹";
var oplus$1 = "⊕";
var or$1 = "∨";
var orarr = "↻";
var ord = "º";
var order = "ℴ";
var orderof = "ℴ";
var ordf$2 = "ª";
var ordm$2 = "º";
var origof = "⊶";
var oror = "⩖";
var orslope = "⩗";
var orv = "⩛";
var oscr = "ℴ";
var oslas = "ø";
var oslash$2 = "ø";
var osol = "⊘";
var otild = "õ";
var otilde$2 = "õ";
var otimes$1 = "⊗";
var otimesas = "⨶";
var oum = "ö";
var ouml$2 = "ö";
var ovbar = "⌽";
var par = "¶";
var para$2 = "¶";
var parallel = "∥";
var parsim = "⫳";
var parsl = "⫽";
var part$1 = "∂";
var pcy = "п";
var percnt = "%";
var period = ".";
var permil$1 = "‰";
var perp$1 = "⊥";
var pertenk = "‱";
var pfr = "𝔭";
var phi$1 = "φ";
var phiv = "ϕ";
var phmmat = "ℳ";
var phone = "☎";
var pi$1 = "π";
var pitchfork = "⋔";
var piv$1 = "ϖ";
var planck = "ℏ";
var planckh = "ℎ";
var plankv = "ℏ";
var plus = "+";
var plusacir = "⨣";
var plusb = "⊞";
var pluscir = "⨢";
var plusdo = "∔";
var plusdu = "⨥";
var pluse = "⩲";
var plusm = "±";
var plusmn$2 = "±";
var plussim = "⨦";
var plustwo = "⨧";
var pm = "±";
var pointint = "⨕";
var popf = "𝕡";
var poun = "£";
var pound$2 = "£";
var pr = "≺";
var prE = "⪳";
var prap = "⪷";
var prcue = "≼";
var pre = "⪯";
var prec = "≺";
var precapprox = "⪷";
var preccurlyeq = "≼";
var preceq = "⪯";
var precnapprox = "⪹";
var precneqq = "⪵";
var precnsim = "⋨";
var precsim = "≾";
var prime$1 = "′";
var primes = "ℙ";
var prnE = "⪵";
var prnap = "⪹";
var prnsim = "⋨";
var prod$1 = "∏";
var profalar = "⌮";
var profline = "⌒";
var profsurf = "⌓";
var prop$1 = "∝";
var propto = "∝";
var prsim = "≾";
var prurel = "⊰";
var pscr = "𝓅";
var psi$1 = "ψ";
var puncsp = " ";
var qfr = "𝔮";
var qint = "⨌";
var qopf = "𝕢";
var qprime = "⁗";
var qscr = "𝓆";
var quaternions = "ℍ";
var quatint = "⨖";
var quest = "?";
var questeq = "≟";
var quo = "\"";
var quot$2 = "\"";
var rAarr = "⇛";
var rArr$1 = "⇒";
var rAtail = "⤜";
var rBarr = "⤏";
var rHar = "⥤";
var race = "∽̱";
var racute = "ŕ";
var radic$1 = "√";
var raemptyv = "⦳";
var rang$1 = "⟩";
var rangd = "⦒";
var range = "⦥";
var rangle = "⟩";
var raqu = "»";
var raquo$2 = "»";
var rarr$1 = "→";
var rarrap = "⥵";
var rarrb = "⇥";
var rarrbfs = "⤠";
var rarrc = "⤳";
var rarrfs = "⤞";
var rarrhk = "↪";
var rarrlp = "↬";
var rarrpl = "⥅";
var rarrsim = "⥴";
var rarrtl = "↣";
var rarrw = "↝";
var ratail = "⤚";
var ratio = "∶";
var rationals = "ℚ";
var rbarr = "⤍";
var rbbrk = "❳";
var rbrace = "}";
var rbrack = "]";
var rbrke = "⦌";
var rbrksld = "⦎";
var rbrkslu = "⦐";
var rcaron = "ř";
var rcedil = "ŗ";
var rceil$1 = "⌉";
var rcub = "}";
var rcy = "р";
var rdca = "⤷";
var rdldhar = "⥩";
var rdquo$1 = "”";
var rdquor = "”";
var rdsh = "↳";
var real$1 = "ℜ";
var realine = "ℛ";
var realpart = "ℜ";
var reals = "ℝ";
var rect = "▭";
var re$1 = "®";
var reg$2 = "®";
var rfisht = "⥽";
var rfloor$1 = "⌋";
var rfr = "𝔯";
var rhard = "⇁";
var rharu = "⇀";
var rharul = "⥬";
var rho$1 = "ρ";
var rhov = "ϱ";
var rightarrow = "→";
var rightarrowtail = "↣";
var rightharpoondown = "⇁";
var rightharpoonup = "⇀";
var rightleftarrows = "⇄";
var rightleftharpoons = "⇌";
var rightrightarrows = "⇉";
var rightsquigarrow = "↝";
var rightthreetimes = "⋌";
var ring = "˚";
var risingdotseq = "≓";
var rlarr = "⇄";
var rlhar = "⇌";
var rlm$1 = "‏";
var rmoust = "⎱";
var rmoustache = "⎱";
var rnmid = "⫮";
var roang = "⟭";
var roarr = "⇾";
var robrk = "⟧";
var ropar = "⦆";
var ropf = "𝕣";
var roplus = "⨮";
var rotimes = "⨵";
var rpar = ")";
var rpargt = "⦔";
var rppolint = "⨒";
var rrarr = "⇉";
var rsaquo$1 = "›";
var rscr = "𝓇";
var rsh = "↱";
var rsqb = "]";
var rsquo$1 = "’";
var rsquor = "’";
var rthree = "⋌";
var rtimes = "⋊";
var rtri = "▹";
var rtrie = "⊵";
var rtrif = "▸";
var rtriltri = "⧎";
var ruluhar = "⥨";
var rx = "℞";
var sacute = "ś";
var sbquo$1 = "‚";
var sc = "≻";
var scE = "⪴";
var scap = "⪸";
var scaron$1 = "š";
var sccue = "≽";
var sce = "⪰";
var scedil = "ş";
var scirc = "ŝ";
var scnE = "⪶";
var scnap = "⪺";
var scnsim = "⋩";
var scpolint = "⨓";
var scsim = "≿";
var scy = "с";
var sdot$1 = "⋅";
var sdotb = "⊡";
var sdote = "⩦";
var seArr = "⇘";
var searhk = "⤥";
var searr = "↘";
var searrow = "↘";
var sec = "§";
var sect$2 = "§";
var semi = ";";
var seswar = "⤩";
var setminus = "∖";
var setmn = "∖";
var sext = "✶";
var sfr = "𝔰";
var sfrown = "⌢";
var sharp = "♯";
var shchcy = "щ";
var shcy = "ш";
var shortmid = "∣";
var shortparallel = "∥";
var sh = "­";
var shy$2 = "­";
var sigma$1 = "σ";
var sigmaf$1 = "ς";
var sigmav = "ς";
var sim$1 = "∼";
var simdot = "⩪";
var sime = "≃";
var simeq = "≃";
var simg = "⪞";
var simgE = "⪠";
var siml = "⪝";
var simlE = "⪟";
var simne = "≆";
var simplus = "⨤";
var simrarr = "⥲";
var slarr = "←";
var smallsetminus = "∖";
var smashp = "⨳";
var smeparsl = "⧤";
var smid = "∣";
var smile = "⌣";
var smt = "⪪";
var smte = "⪬";
var smtes = "⪬︀";
var softcy = "ь";
var sol = "/";
var solb = "⧄";
var solbar = "⌿";
var sopf = "𝕤";
var spades$1 = "♠";
var spadesuit = "♠";
var spar = "∥";
var sqcap = "⊓";
var sqcaps = "⊓︀";
var sqcup = "⊔";
var sqcups = "⊔︀";
var sqsub = "⊏";
var sqsube = "⊑";
var sqsubset = "⊏";
var sqsubseteq = "⊑";
var sqsup = "⊐";
var sqsupe = "⊒";
var sqsupset = "⊐";
var sqsupseteq = "⊒";
var squ = "□";
var square = "□";
var squarf = "▪";
var squf = "▪";
var srarr = "→";
var sscr = "𝓈";
var ssetmn = "∖";
var ssmile = "⌣";
var sstarf = "⋆";
var star = "☆";
var starf = "★";
var straightepsilon = "ϵ";
var straightphi = "ϕ";
var strns = "¯";
var sub$1 = "⊂";
var subE = "⫅";
var subdot = "⪽";
var sube$1 = "⊆";
var subedot = "⫃";
var submult = "⫁";
var subnE = "⫋";
var subne = "⊊";
var subplus = "⪿";
var subrarr = "⥹";
var subset = "⊂";
var subseteq = "⊆";
var subseteqq = "⫅";
var subsetneq = "⊊";
var subsetneqq = "⫋";
var subsim = "⫇";
var subsub = "⫕";
var subsup = "⫓";
var succ = "≻";
var succapprox = "⪸";
var succcurlyeq = "≽";
var succeq = "⪰";
var succnapprox = "⪺";
var succneqq = "⪶";
var succnsim = "⋩";
var succsim = "≿";
var sum$1 = "∑";
var sung = "♪";
var sup$1 = "⊃";
var sup1$2 = "¹";
var sup2$2 = "²";
var sup3$2 = "³";
var supE = "⫆";
var supdot = "⪾";
var supdsub = "⫘";
var supe$1 = "⊇";
var supedot = "⫄";
var suphsol = "⟉";
var suphsub = "⫗";
var suplarr = "⥻";
var supmult = "⫂";
var supnE = "⫌";
var supne = "⊋";
var supplus = "⫀";
var supset = "⊃";
var supseteq = "⊇";
var supseteqq = "⫆";
var supsetneq = "⊋";
var supsetneqq = "⫌";
var supsim = "⫈";
var supsub = "⫔";
var supsup = "⫖";
var swArr = "⇙";
var swarhk = "⤦";
var swarr = "↙";
var swarrow = "↙";
var swnwar = "⤪";
var szli = "ß";
var szlig$2 = "ß";
var target = "⌖";
var tau$1 = "τ";
var tbrk = "⎴";
var tcaron = "ť";
var tcedil = "ţ";
var tcy = "т";
var tdot = "⃛";
var telrec = "⌕";
var tfr = "𝔱";
var there4$1 = "∴";
var therefore = "∴";
var theta$1 = "θ";
var thetasym$1 = "ϑ";
var thetav = "ϑ";
var thickapprox = "≈";
var thicksim = "∼";
var thinsp$1 = " ";
var thkap = "≈";
var thksim = "∼";
var thor = "þ";
var thorn$2 = "þ";
var tilde$1 = "˜";
var time = "×";
var times$2 = "×";
var timesb = "⊠";
var timesbar = "⨱";
var timesd = "⨰";
var tint = "∭";
var toea = "⤨";
var top = "⊤";
var topbot = "⌶";
var topcir = "⫱";
var topf = "𝕥";
var topfork = "⫚";
var tosa = "⤩";
var tprime = "‴";
var trade$1 = "™";
var triangle = "▵";
var triangledown = "▿";
var triangleleft = "◃";
var trianglelefteq = "⊴";
var triangleq = "≜";
var triangleright = "▹";
var trianglerighteq = "⊵";
var tridot = "◬";
var trie = "≜";
var triminus = "⨺";
var triplus = "⨹";
var trisb = "⧍";
var tritime = "⨻";
var trpezium = "⏢";
var tscr = "𝓉";
var tscy = "ц";
var tshcy = "ћ";
var tstrok = "ŧ";
var twixt = "≬";
var twoheadleftarrow = "↞";
var twoheadrightarrow = "↠";
var uArr$1 = "⇑";
var uHar = "⥣";
var uacut = "ú";
var uacute$2 = "ú";
var uarr$1 = "↑";
var ubrcy = "ў";
var ubreve = "ŭ";
var ucir = "û";
var ucirc$2 = "û";
var ucy = "у";
var udarr = "⇅";
var udblac = "ű";
var udhar = "⥮";
var ufisht = "⥾";
var ufr = "𝔲";
var ugrav = "ù";
var ugrave$2 = "ù";
var uharl = "↿";
var uharr = "↾";
var uhblk = "▀";
var ulcorn = "⌜";
var ulcorner = "⌜";
var ulcrop = "⌏";
var ultri = "◸";
var umacr = "ū";
var um = "¨";
var uml$2 = "¨";
var uogon = "ų";
var uopf = "𝕦";
var uparrow = "↑";
var updownarrow = "↕";
var upharpoonleft = "↿";
var upharpoonright = "↾";
var uplus = "⊎";
var upsi = "υ";
var upsih$1 = "ϒ";
var upsilon$1 = "υ";
var upuparrows = "⇈";
var urcorn = "⌝";
var urcorner = "⌝";
var urcrop = "⌎";
var uring = "ů";
var urtri = "◹";
var uscr = "𝓊";
var utdot = "⋰";
var utilde = "ũ";
var utri = "▵";
var utrif = "▴";
var uuarr = "⇈";
var uum = "ü";
var uuml$2 = "ü";
var uwangle = "⦧";
var vArr = "⇕";
var vBar = "⫨";
var vBarv = "⫩";
var vDash = "⊨";
var vangrt = "⦜";
var varepsilon = "ϵ";
var varkappa = "ϰ";
var varnothing = "∅";
var varphi = "ϕ";
var varpi = "ϖ";
var varpropto = "∝";
var varr = "↕";
var varrho = "ϱ";
var varsigma = "ς";
var varsubsetneq = "⊊︀";
var varsubsetneqq = "⫋︀";
var varsupsetneq = "⊋︀";
var varsupsetneqq = "⫌︀";
var vartheta = "ϑ";
var vartriangleleft = "⊲";
var vartriangleright = "⊳";
var vcy = "в";
var vdash = "⊢";
var vee = "∨";
var veebar = "⊻";
var veeeq = "≚";
var vellip = "⋮";
var verbar = "|";
var vert = "|";
var vfr = "𝔳";
var vltri = "⊲";
var vnsub = "⊂⃒";
var vnsup = "⊃⃒";
var vopf = "𝕧";
var vprop = "∝";
var vrtri = "⊳";
var vscr = "𝓋";
var vsubnE = "⫋︀";
var vsubne = "⊊︀";
var vsupnE = "⫌︀";
var vsupne = "⊋︀";
var vzigzag = "⦚";
var wcirc = "ŵ";
var wedbar = "⩟";
var wedge = "∧";
var wedgeq = "≙";
var weierp$1 = "℘";
var wfr = "𝔴";
var wopf = "𝕨";
var wp = "℘";
var wr = "≀";
var wreath = "≀";
var wscr = "𝓌";
var xcap = "⋂";
var xcirc = "◯";
var xcup = "⋃";
var xdtri = "▽";
var xfr = "𝔵";
var xhArr = "⟺";
var xharr = "⟷";
var xi$1 = "ξ";
var xlArr = "⟸";
var xlarr = "⟵";
var xmap = "⟼";
var xnis = "⋻";
var xodot = "⨀";
var xopf = "𝕩";
var xoplus = "⨁";
var xotime = "⨂";
var xrArr = "⟹";
var xrarr = "⟶";
var xscr = "𝓍";
var xsqcup = "⨆";
var xuplus = "⨄";
var xutri = "△";
var xvee = "⋁";
var xwedge = "⋀";
var yacut = "ý";
var yacute$2 = "ý";
var yacy = "я";
var ycirc = "ŷ";
var ycy = "ы";
var ye = "¥";
var yen$2 = "¥";
var yfr = "𝔶";
var yicy = "ї";
var yopf = "𝕪";
var yscr = "𝓎";
var yucy = "ю";
var yum = "ÿ";
var yuml$2 = "ÿ";
var zacute = "ź";
var zcaron = "ž";
var zcy = "з";
var zdot = "ż";
var zeetrf = "ℨ";
var zeta$1 = "ζ";
var zfr = "𝔷";
var zhcy = "ж";
var zigrarr = "⇝";
var zopf = "𝕫";
var zscr = "𝓏";
var zwj$1 = "‍";
var zwnj$1 = "‌";
var characterEntities = {
	AEli: AEli,
	AElig: AElig$2,
	AM: AM,
	AMP: AMP$1,
	Aacut: Aacut,
	Aacute: Aacute$2,
	Abreve: Abreve,
	Acir: Acir,
	Acirc: Acirc$2,
	Acy: Acy,
	Afr: Afr,
	Agrav: Agrav,
	Agrave: Agrave$2,
	Alpha: Alpha$1,
	Amacr: Amacr,
	And: And,
	Aogon: Aogon,
	Aopf: Aopf,
	ApplyFunction: ApplyFunction,
	Arin: Arin,
	Aring: Aring$2,
	Ascr: Ascr,
	Assign: Assign,
	Atild: Atild,
	Atilde: Atilde$2,
	Aum: Aum,
	Auml: Auml$2,
	Backslash: Backslash,
	Barv: Barv,
	Barwed: Barwed,
	Bcy: Bcy,
	Because: Because,
	Bernoullis: Bernoullis,
	Beta: Beta$1,
	Bfr: Bfr,
	Bopf: Bopf,
	Breve: Breve,
	Bscr: Bscr,
	Bumpeq: Bumpeq,
	CHcy: CHcy,
	COP: COP,
	COPY: COPY$1,
	Cacute: Cacute,
	Cap: Cap,
	CapitalDifferentialD: CapitalDifferentialD,
	Cayleys: Cayleys,
	Ccaron: Ccaron,
	Ccedi: Ccedi,
	Ccedil: Ccedil$2,
	Ccirc: Ccirc,
	Cconint: Cconint,
	Cdot: Cdot,
	Cedilla: Cedilla,
	CenterDot: CenterDot,
	Cfr: Cfr,
	Chi: Chi$1,
	CircleDot: CircleDot,
	CircleMinus: CircleMinus,
	CirclePlus: CirclePlus,
	CircleTimes: CircleTimes,
	ClockwiseContourIntegral: ClockwiseContourIntegral,
	CloseCurlyDoubleQuote: CloseCurlyDoubleQuote,
	CloseCurlyQuote: CloseCurlyQuote,
	Colon: Colon,
	Colone: Colone,
	Congruent: Congruent,
	Conint: Conint,
	ContourIntegral: ContourIntegral,
	Copf: Copf,
	Coproduct: Coproduct,
	CounterClockwiseContourIntegral: CounterClockwiseContourIntegral,
	Cross: Cross,
	Cscr: Cscr,
	Cup: Cup,
	CupCap: CupCap,
	DD: DD,
	DDotrahd: DDotrahd,
	DJcy: DJcy,
	DScy: DScy,
	DZcy: DZcy,
	Dagger: Dagger$1,
	Darr: Darr,
	Dashv: Dashv,
	Dcaron: Dcaron,
	Dcy: Dcy,
	Del: Del,
	Delta: Delta$1,
	Dfr: Dfr,
	DiacriticalAcute: DiacriticalAcute,
	DiacriticalDot: DiacriticalDot,
	DiacriticalDoubleAcute: DiacriticalDoubleAcute,
	DiacriticalGrave: DiacriticalGrave,
	DiacriticalTilde: DiacriticalTilde,
	Diamond: Diamond,
	DifferentialD: DifferentialD,
	Dopf: Dopf,
	Dot: Dot,
	DotDot: DotDot,
	DotEqual: DotEqual,
	DoubleContourIntegral: DoubleContourIntegral,
	DoubleDot: DoubleDot,
	DoubleDownArrow: DoubleDownArrow,
	DoubleLeftArrow: DoubleLeftArrow,
	DoubleLeftRightArrow: DoubleLeftRightArrow,
	DoubleLeftTee: DoubleLeftTee,
	DoubleLongLeftArrow: DoubleLongLeftArrow,
	DoubleLongLeftRightArrow: DoubleLongLeftRightArrow,
	DoubleLongRightArrow: DoubleLongRightArrow,
	DoubleRightArrow: DoubleRightArrow,
	DoubleRightTee: DoubleRightTee,
	DoubleUpArrow: DoubleUpArrow,
	DoubleUpDownArrow: DoubleUpDownArrow,
	DoubleVerticalBar: DoubleVerticalBar,
	DownArrow: DownArrow,
	DownArrowBar: DownArrowBar,
	DownArrowUpArrow: DownArrowUpArrow,
	DownBreve: DownBreve,
	DownLeftRightVector: DownLeftRightVector,
	DownLeftTeeVector: DownLeftTeeVector,
	DownLeftVector: DownLeftVector,
	DownLeftVectorBar: DownLeftVectorBar,
	DownRightTeeVector: DownRightTeeVector,
	DownRightVector: DownRightVector,
	DownRightVectorBar: DownRightVectorBar,
	DownTee: DownTee,
	DownTeeArrow: DownTeeArrow,
	Downarrow: Downarrow,
	Dscr: Dscr,
	Dstrok: Dstrok,
	ENG: ENG,
	ET: ET,
	ETH: ETH$2,
	Eacut: Eacut,
	Eacute: Eacute$2,
	Ecaron: Ecaron,
	Ecir: Ecir,
	Ecirc: Ecirc$2,
	Ecy: Ecy,
	Edot: Edot,
	Efr: Efr,
	Egrav: Egrav,
	Egrave: Egrave$2,
	Element: Element$1,
	Emacr: Emacr,
	EmptySmallSquare: EmptySmallSquare,
	EmptyVerySmallSquare: EmptyVerySmallSquare,
	Eogon: Eogon,
	Eopf: Eopf,
	Epsilon: Epsilon$1,
	Equal: Equal,
	EqualTilde: EqualTilde,
	Equilibrium: Equilibrium,
	Escr: Escr,
	Esim: Esim,
	Eta: Eta$1,
	Eum: Eum,
	Euml: Euml$2,
	Exists: Exists,
	ExponentialE: ExponentialE,
	Fcy: Fcy,
	Ffr: Ffr,
	FilledSmallSquare: FilledSmallSquare,
	FilledVerySmallSquare: FilledVerySmallSquare,
	Fopf: Fopf,
	ForAll: ForAll,
	Fouriertrf: Fouriertrf,
	Fscr: Fscr,
	GJcy: GJcy,
	G: G,
	GT: GT$1,
	Gamma: Gamma$1,
	Gammad: Gammad,
	Gbreve: Gbreve,
	Gcedil: Gcedil,
	Gcirc: Gcirc,
	Gcy: Gcy,
	Gdot: Gdot,
	Gfr: Gfr,
	Gg: Gg,
	Gopf: Gopf,
	GreaterEqual: GreaterEqual,
	GreaterEqualLess: GreaterEqualLess,
	GreaterFullEqual: GreaterFullEqual,
	GreaterGreater: GreaterGreater,
	GreaterLess: GreaterLess,
	GreaterSlantEqual: GreaterSlantEqual,
	GreaterTilde: GreaterTilde,
	Gscr: Gscr,
	Gt: Gt,
	HARDcy: HARDcy,
	Hacek: Hacek,
	Hat: Hat,
	Hcirc: Hcirc,
	Hfr: Hfr,
	HilbertSpace: HilbertSpace,
	Hopf: Hopf,
	HorizontalLine: HorizontalLine,
	Hscr: Hscr,
	Hstrok: Hstrok,
	HumpDownHump: HumpDownHump,
	HumpEqual: HumpEqual,
	IEcy: IEcy,
	IJlig: IJlig,
	IOcy: IOcy,
	Iacut: Iacut,
	Iacute: Iacute$2,
	Icir: Icir,
	Icirc: Icirc$2,
	Icy: Icy,
	Idot: Idot,
	Ifr: Ifr,
	Igrav: Igrav,
	Igrave: Igrave$2,
	Im: Im,
	Imacr: Imacr,
	ImaginaryI: ImaginaryI,
	Implies: Implies,
	Int: Int,
	Integral: Integral,
	Intersection: Intersection,
	InvisibleComma: InvisibleComma,
	InvisibleTimes: InvisibleTimes,
	Iogon: Iogon,
	Iopf: Iopf,
	Iota: Iota$1,
	Iscr: Iscr,
	Itilde: Itilde,
	Iukcy: Iukcy,
	Ium: Ium,
	Iuml: Iuml$2,
	Jcirc: Jcirc,
	Jcy: Jcy,
	Jfr: Jfr,
	Jopf: Jopf,
	Jscr: Jscr,
	Jsercy: Jsercy,
	Jukcy: Jukcy,
	KHcy: KHcy,
	KJcy: KJcy,
	Kappa: Kappa$1,
	Kcedil: Kcedil,
	Kcy: Kcy,
	Kfr: Kfr,
	Kopf: Kopf,
	Kscr: Kscr,
	LJcy: LJcy,
	L: L,
	LT: LT$1,
	Lacute: Lacute,
	Lambda: Lambda$1,
	Lang: Lang,
	Laplacetrf: Laplacetrf,
	Larr: Larr,
	Lcaron: Lcaron,
	Lcedil: Lcedil,
	Lcy: Lcy,
	LeftAngleBracket: LeftAngleBracket,
	LeftArrow: LeftArrow,
	LeftArrowBar: LeftArrowBar,
	LeftArrowRightArrow: LeftArrowRightArrow,
	LeftCeiling: LeftCeiling,
	LeftDoubleBracket: LeftDoubleBracket,
	LeftDownTeeVector: LeftDownTeeVector,
	LeftDownVector: LeftDownVector,
	LeftDownVectorBar: LeftDownVectorBar,
	LeftFloor: LeftFloor,
	LeftRightArrow: LeftRightArrow,
	LeftRightVector: LeftRightVector,
	LeftTee: LeftTee,
	LeftTeeArrow: LeftTeeArrow,
	LeftTeeVector: LeftTeeVector,
	LeftTriangle: LeftTriangle,
	LeftTriangleBar: LeftTriangleBar,
	LeftTriangleEqual: LeftTriangleEqual,
	LeftUpDownVector: LeftUpDownVector,
	LeftUpTeeVector: LeftUpTeeVector,
	LeftUpVector: LeftUpVector,
	LeftUpVectorBar: LeftUpVectorBar,
	LeftVector: LeftVector,
	LeftVectorBar: LeftVectorBar,
	Leftarrow: Leftarrow,
	Leftrightarrow: Leftrightarrow,
	LessEqualGreater: LessEqualGreater,
	LessFullEqual: LessFullEqual,
	LessGreater: LessGreater,
	LessLess: LessLess,
	LessSlantEqual: LessSlantEqual,
	LessTilde: LessTilde,
	Lfr: Lfr,
	Ll: Ll,
	Lleftarrow: Lleftarrow,
	Lmidot: Lmidot,
	LongLeftArrow: LongLeftArrow,
	LongLeftRightArrow: LongLeftRightArrow,
	LongRightArrow: LongRightArrow,
	Longleftarrow: Longleftarrow,
	Longleftrightarrow: Longleftrightarrow,
	Longrightarrow: Longrightarrow,
	Lopf: Lopf,
	LowerLeftArrow: LowerLeftArrow,
	LowerRightArrow: LowerRightArrow,
	Lscr: Lscr,
	Lsh: Lsh,
	Lstrok: Lstrok,
	Lt: Lt,
	"Map": "⤅",
	Mcy: Mcy,
	MediumSpace: MediumSpace,
	Mellintrf: Mellintrf,
	Mfr: Mfr,
	MinusPlus: MinusPlus,
	Mopf: Mopf,
	Mscr: Mscr,
	Mu: Mu$1,
	NJcy: NJcy,
	Nacute: Nacute,
	Ncaron: Ncaron,
	Ncedil: Ncedil,
	Ncy: Ncy,
	NegativeMediumSpace: NegativeMediumSpace,
	NegativeThickSpace: NegativeThickSpace,
	NegativeThinSpace: NegativeThinSpace,
	NegativeVeryThinSpace: NegativeVeryThinSpace,
	NestedGreaterGreater: NestedGreaterGreater,
	NestedLessLess: NestedLessLess,
	NewLine: NewLine,
	Nfr: Nfr,
	NoBreak: NoBreak,
	NonBreakingSpace: NonBreakingSpace,
	Nopf: Nopf,
	Not: Not,
	NotCongruent: NotCongruent,
	NotCupCap: NotCupCap,
	NotDoubleVerticalBar: NotDoubleVerticalBar,
	NotElement: NotElement,
	NotEqual: NotEqual,
	NotEqualTilde: NotEqualTilde,
	NotExists: NotExists,
	NotGreater: NotGreater,
	NotGreaterEqual: NotGreaterEqual,
	NotGreaterFullEqual: NotGreaterFullEqual,
	NotGreaterGreater: NotGreaterGreater,
	NotGreaterLess: NotGreaterLess,
	NotGreaterSlantEqual: NotGreaterSlantEqual,
	NotGreaterTilde: NotGreaterTilde,
	NotHumpDownHump: NotHumpDownHump,
	NotHumpEqual: NotHumpEqual,
	NotLeftTriangle: NotLeftTriangle,
	NotLeftTriangleBar: NotLeftTriangleBar,
	NotLeftTriangleEqual: NotLeftTriangleEqual,
	NotLess: NotLess,
	NotLessEqual: NotLessEqual,
	NotLessGreater: NotLessGreater,
	NotLessLess: NotLessLess,
	NotLessSlantEqual: NotLessSlantEqual,
	NotLessTilde: NotLessTilde,
	NotNestedGreaterGreater: NotNestedGreaterGreater,
	NotNestedLessLess: NotNestedLessLess,
	NotPrecedes: NotPrecedes,
	NotPrecedesEqual: NotPrecedesEqual,
	NotPrecedesSlantEqual: NotPrecedesSlantEqual,
	NotReverseElement: NotReverseElement,
	NotRightTriangle: NotRightTriangle,
	NotRightTriangleBar: NotRightTriangleBar,
	NotRightTriangleEqual: NotRightTriangleEqual,
	NotSquareSubset: NotSquareSubset,
	NotSquareSubsetEqual: NotSquareSubsetEqual,
	NotSquareSuperset: NotSquareSuperset,
	NotSquareSupersetEqual: NotSquareSupersetEqual,
	NotSubset: NotSubset,
	NotSubsetEqual: NotSubsetEqual,
	NotSucceeds: NotSucceeds,
	NotSucceedsEqual: NotSucceedsEqual,
	NotSucceedsSlantEqual: NotSucceedsSlantEqual,
	NotSucceedsTilde: NotSucceedsTilde,
	NotSuperset: NotSuperset,
	NotSupersetEqual: NotSupersetEqual,
	NotTilde: NotTilde,
	NotTildeEqual: NotTildeEqual,
	NotTildeFullEqual: NotTildeFullEqual,
	NotTildeTilde: NotTildeTilde,
	NotVerticalBar: NotVerticalBar,
	Nscr: Nscr,
	Ntild: Ntild,
	Ntilde: Ntilde$2,
	Nu: Nu$1,
	OElig: OElig$1,
	Oacut: Oacut,
	Oacute: Oacute$2,
	Ocir: Ocir,
	Ocirc: Ocirc$2,
	Ocy: Ocy,
	Odblac: Odblac,
	Ofr: Ofr,
	Ograv: Ograv,
	Ograve: Ograve$2,
	Omacr: Omacr,
	Omega: Omega$1,
	Omicron: Omicron$1,
	Oopf: Oopf,
	OpenCurlyDoubleQuote: OpenCurlyDoubleQuote,
	OpenCurlyQuote: OpenCurlyQuote,
	Or: Or,
	Oscr: Oscr,
	Oslas: Oslas,
	Oslash: Oslash$2,
	Otild: Otild,
	Otilde: Otilde$2,
	Otimes: Otimes,
	Oum: Oum,
	Ouml: Ouml$2,
	OverBar: OverBar,
	OverBrace: OverBrace,
	OverBracket: OverBracket,
	OverParenthesis: OverParenthesis,
	PartialD: PartialD,
	Pcy: Pcy,
	Pfr: Pfr,
	Phi: Phi$1,
	Pi: Pi$1,
	PlusMinus: PlusMinus,
	Poincareplane: Poincareplane,
	Popf: Popf,
	Pr: Pr,
	Precedes: Precedes,
	PrecedesEqual: PrecedesEqual,
	PrecedesSlantEqual: PrecedesSlantEqual,
	PrecedesTilde: PrecedesTilde,
	Prime: Prime$1,
	Product: Product,
	Proportion: Proportion,
	Proportional: Proportional,
	Pscr: Pscr,
	Psi: Psi$1,
	QUO: QUO,
	QUOT: QUOT$1,
	Qfr: Qfr,
	Qopf: Qopf,
	Qscr: Qscr,
	RBarr: RBarr,
	RE: RE,
	REG: REG$1,
	Racute: Racute,
	Rang: Rang,
	Rarr: Rarr,
	Rarrtl: Rarrtl,
	Rcaron: Rcaron,
	Rcedil: Rcedil,
	Rcy: Rcy,
	Re: Re,
	ReverseElement: ReverseElement,
	ReverseEquilibrium: ReverseEquilibrium,
	ReverseUpEquilibrium: ReverseUpEquilibrium,
	Rfr: Rfr,
	Rho: Rho$1,
	RightAngleBracket: RightAngleBracket,
	RightArrow: RightArrow,
	RightArrowBar: RightArrowBar,
	RightArrowLeftArrow: RightArrowLeftArrow,
	RightCeiling: RightCeiling,
	RightDoubleBracket: RightDoubleBracket,
	RightDownTeeVector: RightDownTeeVector,
	RightDownVector: RightDownVector,
	RightDownVectorBar: RightDownVectorBar,
	RightFloor: RightFloor,
	RightTee: RightTee,
	RightTeeArrow: RightTeeArrow,
	RightTeeVector: RightTeeVector,
	RightTriangle: RightTriangle,
	RightTriangleBar: RightTriangleBar,
	RightTriangleEqual: RightTriangleEqual,
	RightUpDownVector: RightUpDownVector,
	RightUpTeeVector: RightUpTeeVector,
	RightUpVector: RightUpVector,
	RightUpVectorBar: RightUpVectorBar,
	RightVector: RightVector,
	RightVectorBar: RightVectorBar,
	Rightarrow: Rightarrow,
	Ropf: Ropf,
	RoundImplies: RoundImplies,
	Rrightarrow: Rrightarrow,
	Rscr: Rscr,
	Rsh: Rsh,
	RuleDelayed: RuleDelayed,
	SHCHcy: SHCHcy,
	SHcy: SHcy,
	SOFTcy: SOFTcy,
	Sacute: Sacute,
	Sc: Sc,
	Scaron: Scaron$1,
	Scedil: Scedil,
	Scirc: Scirc,
	Scy: Scy,
	Sfr: Sfr,
	ShortDownArrow: ShortDownArrow,
	ShortLeftArrow: ShortLeftArrow,
	ShortRightArrow: ShortRightArrow,
	ShortUpArrow: ShortUpArrow,
	Sigma: Sigma$1,
	SmallCircle: SmallCircle,
	Sopf: Sopf,
	Sqrt: Sqrt,
	Square: Square,
	SquareIntersection: SquareIntersection,
	SquareSubset: SquareSubset,
	SquareSubsetEqual: SquareSubsetEqual,
	SquareSuperset: SquareSuperset,
	SquareSupersetEqual: SquareSupersetEqual,
	SquareUnion: SquareUnion,
	Sscr: Sscr,
	Star: Star,
	Sub: Sub,
	Subset: Subset,
	SubsetEqual: SubsetEqual,
	Succeeds: Succeeds,
	SucceedsEqual: SucceedsEqual,
	SucceedsSlantEqual: SucceedsSlantEqual,
	SucceedsTilde: SucceedsTilde,
	SuchThat: SuchThat,
	Sum: Sum,
	Sup: Sup,
	Superset: Superset,
	SupersetEqual: SupersetEqual,
	Supset: Supset,
	THOR: THOR,
	THORN: THORN$2,
	TRADE: TRADE,
	TSHcy: TSHcy,
	TScy: TScy,
	Tab: Tab,
	Tau: Tau$1,
	Tcaron: Tcaron,
	Tcedil: Tcedil,
	Tcy: Tcy,
	Tfr: Tfr,
	Therefore: Therefore,
	Theta: Theta$1,
	ThickSpace: ThickSpace,
	ThinSpace: ThinSpace,
	Tilde: Tilde,
	TildeEqual: TildeEqual,
	TildeFullEqual: TildeFullEqual,
	TildeTilde: TildeTilde,
	Topf: Topf,
	TripleDot: TripleDot,
	Tscr: Tscr,
	Tstrok: Tstrok,
	Uacut: Uacut,
	Uacute: Uacute$2,
	Uarr: Uarr,
	Uarrocir: Uarrocir,
	Ubrcy: Ubrcy,
	Ubreve: Ubreve,
	Ucir: Ucir,
	Ucirc: Ucirc$2,
	Ucy: Ucy,
	Udblac: Udblac,
	Ufr: Ufr,
	Ugrav: Ugrav,
	Ugrave: Ugrave$2,
	Umacr: Umacr,
	UnderBar: UnderBar,
	UnderBrace: UnderBrace,
	UnderBracket: UnderBracket,
	UnderParenthesis: UnderParenthesis,
	Union: Union,
	UnionPlus: UnionPlus,
	Uogon: Uogon,
	Uopf: Uopf,
	UpArrow: UpArrow,
	UpArrowBar: UpArrowBar,
	UpArrowDownArrow: UpArrowDownArrow,
	UpDownArrow: UpDownArrow,
	UpEquilibrium: UpEquilibrium,
	UpTee: UpTee,
	UpTeeArrow: UpTeeArrow,
	Uparrow: Uparrow,
	Updownarrow: Updownarrow,
	UpperLeftArrow: UpperLeftArrow,
	UpperRightArrow: UpperRightArrow,
	Upsi: Upsi,
	Upsilon: Upsilon$1,
	Uring: Uring,
	Uscr: Uscr,
	Utilde: Utilde,
	Uum: Uum,
	Uuml: Uuml$2,
	VDash: VDash,
	Vbar: Vbar,
	Vcy: Vcy,
	Vdash: Vdash,
	Vdashl: Vdashl,
	Vee: Vee,
	Verbar: Verbar,
	Vert: Vert,
	VerticalBar: VerticalBar,
	VerticalLine: VerticalLine,
	VerticalSeparator: VerticalSeparator,
	VerticalTilde: VerticalTilde,
	VeryThinSpace: VeryThinSpace,
	Vfr: Vfr,
	Vopf: Vopf,
	Vscr: Vscr,
	Vvdash: Vvdash,
	Wcirc: Wcirc,
	Wedge: Wedge,
	Wfr: Wfr,
	Wopf: Wopf,
	Wscr: Wscr,
	Xfr: Xfr,
	Xi: Xi$1,
	Xopf: Xopf,
	Xscr: Xscr,
	YAcy: YAcy,
	YIcy: YIcy,
	YUcy: YUcy,
	Yacut: Yacut,
	Yacute: Yacute$2,
	Ycirc: Ycirc,
	Ycy: Ycy,
	Yfr: Yfr,
	Yopf: Yopf,
	Yscr: Yscr,
	Yuml: Yuml$1,
	ZHcy: ZHcy,
	Zacute: Zacute,
	Zcaron: Zcaron,
	Zcy: Zcy,
	Zdot: Zdot,
	ZeroWidthSpace: ZeroWidthSpace,
	Zeta: Zeta$1,
	Zfr: Zfr,
	Zopf: Zopf,
	Zscr: Zscr,
	aacut: aacut,
	aacute: aacute$2,
	abreve: abreve,
	ac: ac,
	acE: acE,
	acd: acd,
	acir: acir,
	acirc: acirc$2,
	acut: acut,
	acute: acute$2,
	acy: acy,
	aeli: aeli,
	aelig: aelig$2,
	af: af,
	afr: afr,
	agrav: agrav,
	agrave: agrave$2,
	alefsym: alefsym$1,
	aleph: aleph,
	alpha: alpha$1,
	amacr: amacr,
	amalg: amalg,
	am: am,
	amp: amp$2,
	and: and$1,
	andand: andand,
	andd: andd,
	andslope: andslope,
	andv: andv,
	ang: ang$1,
	ange: ange,
	angle: angle,
	angmsd: angmsd,
	angmsdaa: angmsdaa,
	angmsdab: angmsdab,
	angmsdac: angmsdac,
	angmsdad: angmsdad,
	angmsdae: angmsdae,
	angmsdaf: angmsdaf,
	angmsdag: angmsdag,
	angmsdah: angmsdah,
	angrt: angrt,
	angrtvb: angrtvb,
	angrtvbd: angrtvbd,
	angsph: angsph,
	angst: angst,
	angzarr: angzarr,
	aogon: aogon,
	aopf: aopf,
	ap: ap,
	apE: apE,
	apacir: apacir,
	ape: ape,
	apid: apid,
	apos: apos,
	approx: approx,
	approxeq: approxeq,
	arin: arin,
	aring: aring$2,
	ascr: ascr,
	ast: ast,
	asymp: asymp$1,
	asympeq: asympeq,
	atild: atild,
	atilde: atilde$2,
	aum: aum,
	auml: auml$2,
	awconint: awconint,
	awint: awint,
	bNot: bNot,
	backcong: backcong,
	backepsilon: backepsilon,
	backprime: backprime,
	backsim: backsim,
	backsimeq: backsimeq,
	barvee: barvee,
	barwed: barwed,
	barwedge: barwedge,
	bbrk: bbrk,
	bbrktbrk: bbrktbrk,
	bcong: bcong,
	bcy: bcy,
	bdquo: bdquo$1,
	becaus: becaus,
	because: because,
	bemptyv: bemptyv,
	bepsi: bepsi,
	bernou: bernou,
	beta: beta$1,
	beth: beth,
	between: between,
	bfr: bfr,
	bigcap: bigcap,
	bigcirc: bigcirc,
	bigcup: bigcup,
	bigodot: bigodot,
	bigoplus: bigoplus,
	bigotimes: bigotimes,
	bigsqcup: bigsqcup,
	bigstar: bigstar,
	bigtriangledown: bigtriangledown,
	bigtriangleup: bigtriangleup,
	biguplus: biguplus,
	bigvee: bigvee,
	bigwedge: bigwedge,
	bkarow: bkarow,
	blacklozenge: blacklozenge,
	blacksquare: blacksquare,
	blacktriangle: blacktriangle,
	blacktriangledown: blacktriangledown,
	blacktriangleleft: blacktriangleleft,
	blacktriangleright: blacktriangleright,
	blank: blank,
	blk12: blk12,
	blk14: blk14,
	blk34: blk34,
	block: block,
	bne: bne,
	bnequiv: bnequiv,
	bnot: bnot,
	bopf: bopf,
	bot: bot,
	bottom: bottom,
	bowtie: bowtie,
	boxDL: boxDL,
	boxDR: boxDR,
	boxDl: boxDl,
	boxDr: boxDr,
	boxH: boxH,
	boxHD: boxHD,
	boxHU: boxHU,
	boxHd: boxHd,
	boxHu: boxHu,
	boxUL: boxUL,
	boxUR: boxUR,
	boxUl: boxUl,
	boxUr: boxUr,
	boxV: boxV,
	boxVH: boxVH,
	boxVL: boxVL,
	boxVR: boxVR,
	boxVh: boxVh,
	boxVl: boxVl,
	boxVr: boxVr,
	boxbox: boxbox,
	boxdL: boxdL,
	boxdR: boxdR,
	boxdl: boxdl,
	boxdr: boxdr,
	boxh: boxh,
	boxhD: boxhD,
	boxhU: boxhU,
	boxhd: boxhd,
	boxhu: boxhu,
	boxminus: boxminus,
	boxplus: boxplus,
	boxtimes: boxtimes,
	boxuL: boxuL,
	boxuR: boxuR,
	boxul: boxul,
	boxur: boxur,
	boxv: boxv,
	boxvH: boxvH,
	boxvL: boxvL,
	boxvR: boxvR,
	boxvh: boxvh,
	boxvl: boxvl,
	boxvr: boxvr,
	bprime: bprime,
	breve: breve,
	brvba: brvba,
	brvbar: brvbar$2,
	bscr: bscr,
	bsemi: bsemi,
	bsim: bsim,
	bsime: bsime,
	bsol: bsol,
	bsolb: bsolb,
	bsolhsub: bsolhsub,
	bull: bull$1,
	bullet: bullet,
	bump: bump,
	bumpE: bumpE,
	bumpe: bumpe,
	bumpeq: bumpeq,
	cacute: cacute,
	cap: cap$2,
	capand: capand,
	capbrcup: capbrcup,
	capcap: capcap,
	capcup: capcup,
	capdot: capdot,
	caps: caps,
	caret: caret,
	caron: caron,
	ccaps: ccaps,
	ccaron: ccaron,
	ccedi: ccedi,
	ccedil: ccedil$2,
	ccirc: ccirc,
	ccups: ccups,
	ccupssm: ccupssm,
	cdot: cdot,
	cedi: cedi,
	cedil: cedil$2,
	cemptyv: cemptyv,
	cen: cen,
	cent: cent$2,
	centerdot: centerdot,
	cfr: cfr,
	chcy: chcy,
	check: check,
	checkmark: checkmark,
	chi: chi$1,
	cir: cir,
	cirE: cirE,
	circ: circ$1,
	circeq: circeq,
	circlearrowleft: circlearrowleft,
	circlearrowright: circlearrowright,
	circledR: circledR,
	circledS: circledS,
	circledast: circledast,
	circledcirc: circledcirc,
	circleddash: circleddash,
	cire: cire,
	cirfnint: cirfnint,
	cirmid: cirmid,
	cirscir: cirscir,
	clubs: clubs$1,
	clubsuit: clubsuit,
	colon: colon,
	colone: colone,
	coloneq: coloneq,
	comma: comma$1,
	commat: commat,
	comp: comp,
	compfn: compfn,
	complement: complement,
	complexes: complexes,
	cong: cong$1,
	congdot: congdot,
	conint: conint,
	copf: copf,
	coprod: coprod,
	cop: cop,
	copy: copy$2,
	copysr: copysr,
	crarr: crarr$1,
	cross: cross,
	cscr: cscr,
	csub: csub,
	csube: csube,
	csup: csup,
	csupe: csupe,
	ctdot: ctdot,
	cudarrl: cudarrl,
	cudarrr: cudarrr,
	cuepr: cuepr,
	cuesc: cuesc,
	cularr: cularr,
	cularrp: cularrp,
	cup: cup$1,
	cupbrcap: cupbrcap,
	cupcap: cupcap,
	cupcup: cupcup,
	cupdot: cupdot,
	cupor: cupor,
	cups: cups,
	curarr: curarr,
	curarrm: curarrm,
	curlyeqprec: curlyeqprec,
	curlyeqsucc: curlyeqsucc,
	curlyvee: curlyvee,
	curlywedge: curlywedge,
	curre: curre,
	curren: curren$2,
	curvearrowleft: curvearrowleft,
	curvearrowright: curvearrowright,
	cuvee: cuvee,
	cuwed: cuwed,
	cwconint: cwconint,
	cwint: cwint,
	cylcty: cylcty,
	dArr: dArr$1,
	dHar: dHar,
	dagger: dagger$1,
	daleth: daleth,
	darr: darr$1,
	dash: dash$1,
	dashv: dashv,
	dbkarow: dbkarow,
	dblac: dblac,
	dcaron: dcaron,
	dcy: dcy,
	dd: dd$1,
	ddagger: ddagger,
	ddarr: ddarr,
	ddotseq: ddotseq,
	de: de,
	deg: deg$2,
	delta: delta$1,
	demptyv: demptyv,
	dfisht: dfisht,
	dfr: dfr,
	dharl: dharl,
	dharr: dharr,
	diam: diam,
	diamond: diamond,
	diamondsuit: diamondsuit,
	diams: diams$1,
	die: die,
	digamma: digamma,
	disin: disin,
	div: div,
	divid: divid,
	divide: divide$2,
	divideontimes: divideontimes,
	divonx: divonx,
	djcy: djcy,
	dlcorn: dlcorn,
	dlcrop: dlcrop,
	dollar: dollar,
	dopf: dopf,
	dot: dot,
	doteq: doteq,
	doteqdot: doteqdot,
	dotminus: dotminus,
	dotplus: dotplus,
	dotsquare: dotsquare,
	doublebarwedge: doublebarwedge,
	downarrow: downarrow,
	downdownarrows: downdownarrows,
	downharpoonleft: downharpoonleft,
	downharpoonright: downharpoonright,
	drbkarow: drbkarow,
	drcorn: drcorn,
	drcrop: drcrop,
	dscr: dscr,
	dscy: dscy,
	dsol: dsol,
	dstrok: dstrok,
	dtdot: dtdot,
	dtri: dtri,
	dtrif: dtrif,
	duarr: duarr,
	duhar: duhar,
	dwangle: dwangle,
	dzcy: dzcy,
	dzigrarr: dzigrarr,
	eDDot: eDDot,
	eDot: eDot,
	eacut: eacut,
	eacute: eacute$2,
	easter: easter,
	ecaron: ecaron,
	ecir: ecir,
	ecirc: ecirc$2,
	ecolon: ecolon,
	ecy: ecy,
	edot: edot,
	ee: ee,
	efDot: efDot,
	efr: efr,
	eg: eg,
	egrav: egrav,
	egrave: egrave$2,
	egs: egs,
	egsdot: egsdot,
	el: el,
	elinters: elinters,
	ell: ell,
	els: els,
	elsdot: elsdot,
	emacr: emacr,
	empty: empty$3,
	emptyset: emptyset,
	emptyv: emptyv,
	emsp13: emsp13,
	emsp14: emsp14,
	emsp: emsp$1,
	eng: eng,
	ensp: ensp$1,
	eogon: eogon,
	eopf: eopf,
	epar: epar,
	eparsl: eparsl,
	eplus: eplus,
	epsi: epsi,
	epsilon: epsilon$1,
	epsiv: epsiv,
	eqcirc: eqcirc,
	eqcolon: eqcolon,
	eqsim: eqsim,
	eqslantgtr: eqslantgtr,
	eqslantless: eqslantless,
	equals: equals,
	equest: equest,
	equiv: equiv$1,
	equivDD: equivDD,
	eqvparsl: eqvparsl,
	erDot: erDot,
	erarr: erarr,
	escr: escr,
	esdot: esdot,
	esim: esim,
	eta: eta$1,
	et: et,
	eth: eth$2,
	eum: eum,
	euml: euml$2,
	euro: euro$1,
	excl: excl,
	exist: exist$1,
	expectation: expectation,
	exponentiale: exponentiale,
	fallingdotseq: fallingdotseq,
	fcy: fcy,
	female: female,
	ffilig: ffilig,
	fflig: fflig,
	ffllig: ffllig,
	ffr: ffr,
	filig: filig,
	fjlig: fjlig,
	flat: flat,
	fllig: fllig,
	fltns: fltns,
	fnof: fnof$1,
	fopf: fopf,
	forall: forall$1,
	fork: fork,
	forkv: forkv,
	fpartint: fpartint,
	frac1: frac1,
	frac12: frac12$2,
	frac13: frac13,
	frac14: frac14$2,
	frac15: frac15,
	frac16: frac16,
	frac18: frac18,
	frac23: frac23,
	frac25: frac25,
	frac3: frac3,
	frac34: frac34$2,
	frac35: frac35,
	frac38: frac38,
	frac45: frac45,
	frac56: frac56,
	frac58: frac58,
	frac78: frac78,
	frasl: frasl$1,
	frown: frown,
	fscr: fscr,
	gE: gE,
	gEl: gEl,
	gacute: gacute,
	gamma: gamma$1,
	gammad: gammad,
	gap: gap,
	gbreve: gbreve,
	gcirc: gcirc,
	gcy: gcy,
	gdot: gdot,
	ge: ge$1,
	gel: gel,
	geq: geq,
	geqq: geqq,
	geqslant: geqslant,
	ges: ges,
	gescc: gescc,
	gesdot: gesdot,
	gesdoto: gesdoto,
	gesdotol: gesdotol,
	gesl: gesl,
	gesles: gesles,
	gfr: gfr,
	gg: gg,
	ggg: ggg,
	gimel: gimel,
	gjcy: gjcy,
	gl: gl,
	glE: glE,
	gla: gla,
	glj: glj,
	gnE: gnE,
	gnap: gnap,
	gnapprox: gnapprox,
	gne: gne,
	gneq: gneq,
	gneqq: gneqq,
	gnsim: gnsim,
	gopf: gopf,
	grave: grave,
	gscr: gscr,
	gsim: gsim,
	gsime: gsime,
	gsiml: gsiml,
	g: g,
	gt: gt$2,
	gtcc: gtcc,
	gtcir: gtcir,
	gtdot: gtdot,
	gtlPar: gtlPar,
	gtquest: gtquest,
	gtrapprox: gtrapprox,
	gtrarr: gtrarr,
	gtrdot: gtrdot,
	gtreqless: gtreqless,
	gtreqqless: gtreqqless,
	gtrless: gtrless,
	gtrsim: gtrsim,
	gvertneqq: gvertneqq,
	gvnE: gvnE,
	hArr: hArr$1,
	hairsp: hairsp,
	half: half,
	hamilt: hamilt,
	hardcy: hardcy,
	harr: harr$1,
	harrcir: harrcir,
	harrw: harrw,
	hbar: hbar,
	hcirc: hcirc,
	hearts: hearts$1,
	heartsuit: heartsuit,
	hellip: hellip$1,
	hercon: hercon,
	hfr: hfr,
	hksearow: hksearow,
	hkswarow: hkswarow,
	hoarr: hoarr,
	homtht: homtht,
	hookleftarrow: hookleftarrow,
	hookrightarrow: hookrightarrow,
	hopf: hopf,
	horbar: horbar,
	hscr: hscr,
	hslash: hslash,
	hstrok: hstrok,
	hybull: hybull,
	hyphen: hyphen,
	iacut: iacut,
	iacute: iacute$2,
	ic: ic,
	icir: icir,
	icirc: icirc$2,
	icy: icy,
	iecy: iecy,
	iexc: iexc,
	iexcl: iexcl$2,
	iff: iff,
	ifr: ifr,
	igrav: igrav,
	igrave: igrave$2,
	ii: ii,
	iiiint: iiiint,
	iiint: iiint,
	iinfin: iinfin,
	iiota: iiota,
	ijlig: ijlig,
	imacr: imacr,
	image: image$2,
	imagline: imagline,
	imagpart: imagpart,
	imath: imath,
	imof: imof,
	imped: imped,
	"in": "∈",
	incare: incare,
	infin: infin$1,
	infintie: infintie,
	inodot: inodot,
	int: int$2,
	intcal: intcal,
	integers: integers,
	intercal: intercal,
	intlarhk: intlarhk,
	intprod: intprod,
	iocy: iocy,
	iogon: iogon,
	iopf: iopf,
	iota: iota$1,
	iprod: iprod,
	iques: iques,
	iquest: iquest$2,
	iscr: iscr,
	isin: isin$1,
	isinE: isinE,
	isindot: isindot,
	isins: isins,
	isinsv: isinsv,
	isinv: isinv,
	it: it,
	itilde: itilde,
	iukcy: iukcy,
	ium: ium,
	iuml: iuml$2,
	jcirc: jcirc,
	jcy: jcy,
	jfr: jfr,
	jmath: jmath,
	jopf: jopf,
	jscr: jscr,
	jsercy: jsercy,
	jukcy: jukcy,
	kappa: kappa$1,
	kappav: kappav,
	kcedil: kcedil,
	kcy: kcy,
	kfr: kfr,
	kgreen: kgreen,
	khcy: khcy,
	kjcy: kjcy,
	kopf: kopf,
	kscr: kscr,
	lAarr: lAarr,
	lArr: lArr$1,
	lAtail: lAtail,
	lBarr: lBarr,
	lE: lE,
	lEg: lEg,
	lHar: lHar,
	lacute: lacute,
	laemptyv: laemptyv,
	lagran: lagran,
	lambda: lambda$1,
	lang: lang$1,
	langd: langd,
	langle: langle,
	lap: lap,
	laqu: laqu,
	laquo: laquo$2,
	larr: larr$1,
	larrb: larrb,
	larrbfs: larrbfs,
	larrfs: larrfs,
	larrhk: larrhk,
	larrlp: larrlp,
	larrpl: larrpl,
	larrsim: larrsim,
	larrtl: larrtl,
	lat: lat,
	latail: latail,
	late: late,
	lates: lates,
	lbarr: lbarr,
	lbbrk: lbbrk,
	lbrace: lbrace,
	lbrack: lbrack,
	lbrke: lbrke,
	lbrksld: lbrksld,
	lbrkslu: lbrkslu,
	lcaron: lcaron,
	lcedil: lcedil,
	lceil: lceil$1,
	lcub: lcub,
	lcy: lcy,
	ldca: ldca,
	ldquo: ldquo$1,
	ldquor: ldquor,
	ldrdhar: ldrdhar,
	ldrushar: ldrushar,
	ldsh: ldsh,
	le: le$1,
	leftarrow: leftarrow,
	leftarrowtail: leftarrowtail,
	leftharpoondown: leftharpoondown,
	leftharpoonup: leftharpoonup,
	leftleftarrows: leftleftarrows,
	leftrightarrow: leftrightarrow,
	leftrightarrows: leftrightarrows,
	leftrightharpoons: leftrightharpoons,
	leftrightsquigarrow: leftrightsquigarrow,
	leftthreetimes: leftthreetimes,
	leg: leg,
	leq: leq,
	leqq: leqq,
	leqslant: leqslant,
	les: les,
	lescc: lescc,
	lesdot: lesdot,
	lesdoto: lesdoto,
	lesdotor: lesdotor,
	lesg: lesg,
	lesges: lesges,
	lessapprox: lessapprox,
	lessdot: lessdot,
	lesseqgtr: lesseqgtr,
	lesseqqgtr: lesseqqgtr,
	lessgtr: lessgtr,
	lesssim: lesssim,
	lfisht: lfisht,
	lfloor: lfloor$1,
	lfr: lfr,
	lg: lg,
	lgE: lgE,
	lhard: lhard,
	lharu: lharu,
	lharul: lharul,
	lhblk: lhblk,
	ljcy: ljcy,
	ll: ll,
	llarr: llarr,
	llcorner: llcorner,
	llhard: llhard,
	lltri: lltri,
	lmidot: lmidot,
	lmoust: lmoust,
	lmoustache: lmoustache,
	lnE: lnE,
	lnap: lnap,
	lnapprox: lnapprox,
	lne: lne,
	lneq: lneq,
	lneqq: lneqq,
	lnsim: lnsim,
	loang: loang,
	loarr: loarr,
	lobrk: lobrk,
	longleftarrow: longleftarrow,
	longleftrightarrow: longleftrightarrow,
	longmapsto: longmapsto,
	longrightarrow: longrightarrow,
	looparrowleft: looparrowleft,
	looparrowright: looparrowright,
	lopar: lopar,
	lopf: lopf,
	loplus: loplus,
	lotimes: lotimes,
	lowast: lowast$1,
	lowbar: lowbar,
	loz: loz$1,
	lozenge: lozenge,
	lozf: lozf,
	lpar: lpar,
	lparlt: lparlt,
	lrarr: lrarr,
	lrcorner: lrcorner,
	lrhar: lrhar,
	lrhard: lrhard,
	lrm: lrm$1,
	lrtri: lrtri,
	lsaquo: lsaquo$1,
	lscr: lscr,
	lsh: lsh,
	lsim: lsim,
	lsime: lsime,
	lsimg: lsimg,
	lsqb: lsqb,
	lsquo: lsquo$1,
	lsquor: lsquor,
	lstrok: lstrok,
	l: l,
	lt: lt$2,
	ltcc: ltcc,
	ltcir: ltcir,
	ltdot: ltdot,
	lthree: lthree,
	ltimes: ltimes,
	ltlarr: ltlarr,
	ltquest: ltquest,
	ltrPar: ltrPar,
	ltri: ltri,
	ltrie: ltrie,
	ltrif: ltrif,
	lurdshar: lurdshar,
	luruhar: luruhar,
	lvertneqq: lvertneqq,
	lvnE: lvnE,
	mDDot: mDDot,
	mac: mac,
	macr: macr$2,
	male: male,
	malt: malt,
	maltese: maltese,
	map: map$1,
	mapsto: mapsto,
	mapstodown: mapstodown,
	mapstoleft: mapstoleft,
	mapstoup: mapstoup,
	marker: marker,
	mcomma: mcomma,
	mcy: mcy,
	mdash: mdash$1,
	measuredangle: measuredangle,
	mfr: mfr,
	mho: mho,
	micr: micr,
	micro: micro$2,
	mid: mid,
	midast: midast,
	midcir: midcir,
	middo: middo,
	middot: middot$2,
	minus: minus$1,
	minusb: minusb,
	minusd: minusd,
	minusdu: minusdu,
	mlcp: mlcp,
	mldr: mldr,
	mnplus: mnplus,
	models: models,
	mopf: mopf,
	mp: mp,
	mscr: mscr,
	mstpos: mstpos,
	mu: mu$1,
	multimap: multimap,
	mumap: mumap,
	nGg: nGg,
	nGt: nGt,
	nGtv: nGtv,
	nLeftarrow: nLeftarrow,
	nLeftrightarrow: nLeftrightarrow,
	nLl: nLl,
	nLt: nLt,
	nLtv: nLtv,
	nRightarrow: nRightarrow,
	nVDash: nVDash,
	nVdash: nVdash,
	nabla: nabla$1,
	nacute: nacute,
	nang: nang,
	nap: nap,
	napE: napE,
	napid: napid,
	napos: napos,
	napprox: napprox,
	natur: natur,
	natural: natural,
	naturals: naturals,
	nbs: nbs,
	nbsp: nbsp$2,
	nbump: nbump,
	nbumpe: nbumpe,
	ncap: ncap,
	ncaron: ncaron,
	ncedil: ncedil,
	ncong: ncong,
	ncongdot: ncongdot,
	ncup: ncup,
	ncy: ncy,
	ndash: ndash$1,
	ne: ne$1,
	neArr: neArr,
	nearhk: nearhk,
	nearr: nearr,
	nearrow: nearrow,
	nedot: nedot,
	nequiv: nequiv,
	nesear: nesear,
	nesim: nesim,
	nexist: nexist,
	nexists: nexists,
	nfr: nfr,
	ngE: ngE,
	nge: nge,
	ngeq: ngeq,
	ngeqq: ngeqq,
	ngeqslant: ngeqslant,
	nges: nges,
	ngsim: ngsim,
	ngt: ngt,
	ngtr: ngtr,
	nhArr: nhArr,
	nharr: nharr,
	nhpar: nhpar,
	ni: ni$1,
	nis: nis,
	nisd: nisd,
	niv: niv,
	njcy: njcy,
	nlArr: nlArr,
	nlE: nlE,
	nlarr: nlarr,
	nldr: nldr,
	nle: nle,
	nleftarrow: nleftarrow,
	nleftrightarrow: nleftrightarrow,
	nleq: nleq,
	nleqq: nleqq,
	nleqslant: nleqslant,
	nles: nles,
	nless: nless,
	nlsim: nlsim,
	nlt: nlt,
	nltri: nltri,
	nltrie: nltrie,
	nmid: nmid,
	nopf: nopf,
	no: no,
	not: not$2,
	notin: notin$1,
	notinE: notinE,
	notindot: notindot,
	notinva: notinva,
	notinvb: notinvb,
	notinvc: notinvc,
	notni: notni,
	notniva: notniva,
	notnivb: notnivb,
	notnivc: notnivc,
	npar: npar,
	nparallel: nparallel,
	nparsl: nparsl,
	npart: npart,
	npolint: npolint,
	npr: npr,
	nprcue: nprcue,
	npre: npre,
	nprec: nprec,
	npreceq: npreceq,
	nrArr: nrArr,
	nrarr: nrarr,
	nrarrc: nrarrc,
	nrarrw: nrarrw,
	nrightarrow: nrightarrow,
	nrtri: nrtri,
	nrtrie: nrtrie,
	nsc: nsc,
	nsccue: nsccue,
	nsce: nsce,
	nscr: nscr,
	nshortmid: nshortmid,
	nshortparallel: nshortparallel,
	nsim: nsim,
	nsime: nsime,
	nsimeq: nsimeq,
	nsmid: nsmid,
	nspar: nspar,
	nsqsube: nsqsube,
	nsqsupe: nsqsupe,
	nsub: nsub$1,
	nsubE: nsubE,
	nsube: nsube,
	nsubset: nsubset,
	nsubseteq: nsubseteq,
	nsubseteqq: nsubseteqq,
	nsucc: nsucc,
	nsucceq: nsucceq,
	nsup: nsup,
	nsupE: nsupE,
	nsupe: nsupe,
	nsupset: nsupset,
	nsupseteq: nsupseteq,
	nsupseteqq: nsupseteqq,
	ntgl: ntgl,
	ntild: ntild,
	ntilde: ntilde$2,
	ntlg: ntlg,
	ntriangleleft: ntriangleleft,
	ntrianglelefteq: ntrianglelefteq,
	ntriangleright: ntriangleright,
	ntrianglerighteq: ntrianglerighteq,
	nu: nu$1,
	num: num,
	numero: numero,
	numsp: numsp,
	nvDash: nvDash,
	nvHarr: nvHarr,
	nvap: nvap,
	nvdash: nvdash,
	nvge: nvge,
	nvgt: nvgt,
	nvinfin: nvinfin,
	nvlArr: nvlArr,
	nvle: nvle,
	nvlt: nvlt,
	nvltrie: nvltrie,
	nvrArr: nvrArr,
	nvrtrie: nvrtrie,
	nvsim: nvsim,
	nwArr: nwArr,
	nwarhk: nwarhk,
	nwarr: nwarr,
	nwarrow: nwarrow,
	nwnear: nwnear,
	oS: oS,
	oacut: oacut,
	oacute: oacute$2,
	oast: oast,
	ocir: ocir,
	ocirc: ocirc$2,
	ocy: ocy,
	odash: odash,
	odblac: odblac,
	odiv: odiv,
	odot: odot,
	odsold: odsold,
	oelig: oelig$1,
	ofcir: ofcir,
	ofr: ofr,
	ogon: ogon,
	ograv: ograv,
	ograve: ograve$2,
	ogt: ogt,
	ohbar: ohbar,
	ohm: ohm,
	oint: oint,
	olarr: olarr,
	olcir: olcir,
	olcross: olcross,
	oline: oline$1,
	olt: olt,
	omacr: omacr,
	omega: omega$1,
	omicron: omicron$1,
	omid: omid,
	ominus: ominus,
	oopf: oopf,
	opar: opar,
	operp: operp,
	oplus: oplus$1,
	or: or$1,
	orarr: orarr,
	ord: ord,
	order: order,
	orderof: orderof,
	ordf: ordf$2,
	ordm: ordm$2,
	origof: origof,
	oror: oror,
	orslope: orslope,
	orv: orv,
	oscr: oscr,
	oslas: oslas,
	oslash: oslash$2,
	osol: osol,
	otild: otild,
	otilde: otilde$2,
	otimes: otimes$1,
	otimesas: otimesas,
	oum: oum,
	ouml: ouml$2,
	ovbar: ovbar,
	par: par,
	para: para$2,
	parallel: parallel,
	parsim: parsim,
	parsl: parsl,
	part: part$1,
	pcy: pcy,
	percnt: percnt,
	period: period,
	permil: permil$1,
	perp: perp$1,
	pertenk: pertenk,
	pfr: pfr,
	phi: phi$1,
	phiv: phiv,
	phmmat: phmmat,
	phone: phone,
	pi: pi$1,
	pitchfork: pitchfork,
	piv: piv$1,
	planck: planck,
	planckh: planckh,
	plankv: plankv,
	plus: plus,
	plusacir: plusacir,
	plusb: plusb,
	pluscir: pluscir,
	plusdo: plusdo,
	plusdu: plusdu,
	pluse: pluse,
	plusm: plusm,
	plusmn: plusmn$2,
	plussim: plussim,
	plustwo: plustwo,
	pm: pm,
	pointint: pointint,
	popf: popf,
	poun: poun,
	pound: pound$2,
	pr: pr,
	prE: prE,
	prap: prap,
	prcue: prcue,
	pre: pre,
	prec: prec,
	precapprox: precapprox,
	preccurlyeq: preccurlyeq,
	preceq: preceq,
	precnapprox: precnapprox,
	precneqq: precneqq,
	precnsim: precnsim,
	precsim: precsim,
	prime: prime$1,
	primes: primes,
	prnE: prnE,
	prnap: prnap,
	prnsim: prnsim,
	prod: prod$1,
	profalar: profalar,
	profline: profline,
	profsurf: profsurf,
	prop: prop$1,
	propto: propto,
	prsim: prsim,
	prurel: prurel,
	pscr: pscr,
	psi: psi$1,
	puncsp: puncsp,
	qfr: qfr,
	qint: qint,
	qopf: qopf,
	qprime: qprime,
	qscr: qscr,
	quaternions: quaternions,
	quatint: quatint,
	quest: quest,
	questeq: questeq,
	quo: quo,
	quot: quot$2,
	rAarr: rAarr,
	rArr: rArr$1,
	rAtail: rAtail,
	rBarr: rBarr,
	rHar: rHar,
	race: race,
	racute: racute,
	radic: radic$1,
	raemptyv: raemptyv,
	rang: rang$1,
	rangd: rangd,
	range: range,
	rangle: rangle,
	raqu: raqu,
	raquo: raquo$2,
	rarr: rarr$1,
	rarrap: rarrap,
	rarrb: rarrb,
	rarrbfs: rarrbfs,
	rarrc: rarrc,
	rarrfs: rarrfs,
	rarrhk: rarrhk,
	rarrlp: rarrlp,
	rarrpl: rarrpl,
	rarrsim: rarrsim,
	rarrtl: rarrtl,
	rarrw: rarrw,
	ratail: ratail,
	ratio: ratio,
	rationals: rationals,
	rbarr: rbarr,
	rbbrk: rbbrk,
	rbrace: rbrace,
	rbrack: rbrack,
	rbrke: rbrke,
	rbrksld: rbrksld,
	rbrkslu: rbrkslu,
	rcaron: rcaron,
	rcedil: rcedil,
	rceil: rceil$1,
	rcub: rcub,
	rcy: rcy,
	rdca: rdca,
	rdldhar: rdldhar,
	rdquo: rdquo$1,
	rdquor: rdquor,
	rdsh: rdsh,
	real: real$1,
	realine: realine,
	realpart: realpart,
	reals: reals,
	rect: rect,
	re: re$1,
	reg: reg$2,
	rfisht: rfisht,
	rfloor: rfloor$1,
	rfr: rfr,
	rhard: rhard,
	rharu: rharu,
	rharul: rharul,
	rho: rho$1,
	rhov: rhov,
	rightarrow: rightarrow,
	rightarrowtail: rightarrowtail,
	rightharpoondown: rightharpoondown,
	rightharpoonup: rightharpoonup,
	rightleftarrows: rightleftarrows,
	rightleftharpoons: rightleftharpoons,
	rightrightarrows: rightrightarrows,
	rightsquigarrow: rightsquigarrow,
	rightthreetimes: rightthreetimes,
	ring: ring,
	risingdotseq: risingdotseq,
	rlarr: rlarr,
	rlhar: rlhar,
	rlm: rlm$1,
	rmoust: rmoust,
	rmoustache: rmoustache,
	rnmid: rnmid,
	roang: roang,
	roarr: roarr,
	robrk: robrk,
	ropar: ropar,
	ropf: ropf,
	roplus: roplus,
	rotimes: rotimes,
	rpar: rpar,
	rpargt: rpargt,
	rppolint: rppolint,
	rrarr: rrarr,
	rsaquo: rsaquo$1,
	rscr: rscr,
	rsh: rsh,
	rsqb: rsqb,
	rsquo: rsquo$1,
	rsquor: rsquor,
	rthree: rthree,
	rtimes: rtimes,
	rtri: rtri,
	rtrie: rtrie,
	rtrif: rtrif,
	rtriltri: rtriltri,
	ruluhar: ruluhar,
	rx: rx,
	sacute: sacute,
	sbquo: sbquo$1,
	sc: sc,
	scE: scE,
	scap: scap,
	scaron: scaron$1,
	sccue: sccue,
	sce: sce,
	scedil: scedil,
	scirc: scirc,
	scnE: scnE,
	scnap: scnap,
	scnsim: scnsim,
	scpolint: scpolint,
	scsim: scsim,
	scy: scy,
	sdot: sdot$1,
	sdotb: sdotb,
	sdote: sdote,
	seArr: seArr,
	searhk: searhk,
	searr: searr,
	searrow: searrow,
	sec: sec,
	sect: sect$2,
	semi: semi,
	seswar: seswar,
	setminus: setminus,
	setmn: setmn,
	sext: sext,
	sfr: sfr,
	sfrown: sfrown,
	sharp: sharp,
	shchcy: shchcy,
	shcy: shcy,
	shortmid: shortmid,
	shortparallel: shortparallel,
	sh: sh,
	shy: shy$2,
	sigma: sigma$1,
	sigmaf: sigmaf$1,
	sigmav: sigmav,
	sim: sim$1,
	simdot: simdot,
	sime: sime,
	simeq: simeq,
	simg: simg,
	simgE: simgE,
	siml: siml,
	simlE: simlE,
	simne: simne,
	simplus: simplus,
	simrarr: simrarr,
	slarr: slarr,
	smallsetminus: smallsetminus,
	smashp: smashp,
	smeparsl: smeparsl,
	smid: smid,
	smile: smile,
	smt: smt,
	smte: smte,
	smtes: smtes,
	softcy: softcy,
	sol: sol,
	solb: solb,
	solbar: solbar,
	sopf: sopf,
	spades: spades$1,
	spadesuit: spadesuit,
	spar: spar,
	sqcap: sqcap,
	sqcaps: sqcaps,
	sqcup: sqcup,
	sqcups: sqcups,
	sqsub: sqsub,
	sqsube: sqsube,
	sqsubset: sqsubset,
	sqsubseteq: sqsubseteq,
	sqsup: sqsup,
	sqsupe: sqsupe,
	sqsupset: sqsupset,
	sqsupseteq: sqsupseteq,
	squ: squ,
	square: square,
	squarf: squarf,
	squf: squf,
	srarr: srarr,
	sscr: sscr,
	ssetmn: ssetmn,
	ssmile: ssmile,
	sstarf: sstarf,
	star: star,
	starf: starf,
	straightepsilon: straightepsilon,
	straightphi: straightphi,
	strns: strns,
	sub: sub$1,
	subE: subE,
	subdot: subdot,
	sube: sube$1,
	subedot: subedot,
	submult: submult,
	subnE: subnE,
	subne: subne,
	subplus: subplus,
	subrarr: subrarr,
	subset: subset,
	subseteq: subseteq,
	subseteqq: subseteqq,
	subsetneq: subsetneq,
	subsetneqq: subsetneqq,
	subsim: subsim,
	subsub: subsub,
	subsup: subsup,
	succ: succ,
	succapprox: succapprox,
	succcurlyeq: succcurlyeq,
	succeq: succeq,
	succnapprox: succnapprox,
	succneqq: succneqq,
	succnsim: succnsim,
	succsim: succsim,
	sum: sum$1,
	sung: sung,
	sup: sup$1,
	sup1: sup1$2,
	sup2: sup2$2,
	sup3: sup3$2,
	supE: supE,
	supdot: supdot,
	supdsub: supdsub,
	supe: supe$1,
	supedot: supedot,
	suphsol: suphsol,
	suphsub: suphsub,
	suplarr: suplarr,
	supmult: supmult,
	supnE: supnE,
	supne: supne,
	supplus: supplus,
	supset: supset,
	supseteq: supseteq,
	supseteqq: supseteqq,
	supsetneq: supsetneq,
	supsetneqq: supsetneqq,
	supsim: supsim,
	supsub: supsub,
	supsup: supsup,
	swArr: swArr,
	swarhk: swarhk,
	swarr: swarr,
	swarrow: swarrow,
	swnwar: swnwar,
	szli: szli,
	szlig: szlig$2,
	target: target,
	tau: tau$1,
	tbrk: tbrk,
	tcaron: tcaron,
	tcedil: tcedil,
	tcy: tcy,
	tdot: tdot,
	telrec: telrec,
	tfr: tfr,
	there4: there4$1,
	therefore: therefore,
	theta: theta$1,
	thetasym: thetasym$1,
	thetav: thetav,
	thickapprox: thickapprox,
	thicksim: thicksim,
	thinsp: thinsp$1,
	thkap: thkap,
	thksim: thksim,
	thor: thor,
	thorn: thorn$2,
	tilde: tilde$1,
	time: time,
	times: times$2,
	timesb: timesb,
	timesbar: timesbar,
	timesd: timesd,
	tint: tint,
	toea: toea,
	top: top,
	topbot: topbot,
	topcir: topcir,
	topf: topf,
	topfork: topfork,
	tosa: tosa,
	tprime: tprime,
	trade: trade$1,
	triangle: triangle,
	triangledown: triangledown,
	triangleleft: triangleleft,
	trianglelefteq: trianglelefteq,
	triangleq: triangleq,
	triangleright: triangleright,
	trianglerighteq: trianglerighteq,
	tridot: tridot,
	trie: trie,
	triminus: triminus,
	triplus: triplus,
	trisb: trisb,
	tritime: tritime,
	trpezium: trpezium,
	tscr: tscr,
	tscy: tscy,
	tshcy: tshcy,
	tstrok: tstrok,
	twixt: twixt,
	twoheadleftarrow: twoheadleftarrow,
	twoheadrightarrow: twoheadrightarrow,
	uArr: uArr$1,
	uHar: uHar,
	uacut: uacut,
	uacute: uacute$2,
	uarr: uarr$1,
	ubrcy: ubrcy,
	ubreve: ubreve,
	ucir: ucir,
	ucirc: ucirc$2,
	ucy: ucy,
	udarr: udarr,
	udblac: udblac,
	udhar: udhar,
	ufisht: ufisht,
	ufr: ufr,
	ugrav: ugrav,
	ugrave: ugrave$2,
	uharl: uharl,
	uharr: uharr,
	uhblk: uhblk,
	ulcorn: ulcorn,
	ulcorner: ulcorner,
	ulcrop: ulcrop,
	ultri: ultri,
	umacr: umacr,
	um: um,
	uml: uml$2,
	uogon: uogon,
	uopf: uopf,
	uparrow: uparrow,
	updownarrow: updownarrow,
	upharpoonleft: upharpoonleft,
	upharpoonright: upharpoonright,
	uplus: uplus,
	upsi: upsi,
	upsih: upsih$1,
	upsilon: upsilon$1,
	upuparrows: upuparrows,
	urcorn: urcorn,
	urcorner: urcorner,
	urcrop: urcrop,
	uring: uring,
	urtri: urtri,
	uscr: uscr,
	utdot: utdot,
	utilde: utilde,
	utri: utri,
	utrif: utrif,
	uuarr: uuarr,
	uum: uum,
	uuml: uuml$2,
	uwangle: uwangle,
	vArr: vArr,
	vBar: vBar,
	vBarv: vBarv,
	vDash: vDash,
	vangrt: vangrt,
	varepsilon: varepsilon,
	varkappa: varkappa,
	varnothing: varnothing,
	varphi: varphi,
	varpi: varpi,
	varpropto: varpropto,
	varr: varr,
	varrho: varrho,
	varsigma: varsigma,
	varsubsetneq: varsubsetneq,
	varsubsetneqq: varsubsetneqq,
	varsupsetneq: varsupsetneq,
	varsupsetneqq: varsupsetneqq,
	vartheta: vartheta,
	vartriangleleft: vartriangleleft,
	vartriangleright: vartriangleright,
	vcy: vcy,
	vdash: vdash,
	vee: vee,
	veebar: veebar,
	veeeq: veeeq,
	vellip: vellip,
	verbar: verbar,
	vert: vert,
	vfr: vfr,
	vltri: vltri,
	vnsub: vnsub,
	vnsup: vnsup,
	vopf: vopf,
	vprop: vprop,
	vrtri: vrtri,
	vscr: vscr,
	vsubnE: vsubnE,
	vsubne: vsubne,
	vsupnE: vsupnE,
	vsupne: vsupne,
	vzigzag: vzigzag,
	wcirc: wcirc,
	wedbar: wedbar,
	wedge: wedge,
	wedgeq: wedgeq,
	weierp: weierp$1,
	wfr: wfr,
	wopf: wopf,
	wp: wp,
	wr: wr,
	wreath: wreath,
	wscr: wscr,
	xcap: xcap,
	xcirc: xcirc,
	xcup: xcup,
	xdtri: xdtri,
	xfr: xfr,
	xhArr: xhArr,
	xharr: xharr,
	xi: xi$1,
	xlArr: xlArr,
	xlarr: xlarr,
	xmap: xmap,
	xnis: xnis,
	xodot: xodot,
	xopf: xopf,
	xoplus: xoplus,
	xotime: xotime,
	xrArr: xrArr,
	xrarr: xrarr,
	xscr: xscr,
	xsqcup: xsqcup,
	xuplus: xuplus,
	xutri: xutri,
	xvee: xvee,
	xwedge: xwedge,
	yacut: yacut,
	yacute: yacute$2,
	yacy: yacy,
	ycirc: ycirc,
	ycy: ycy,
	ye: ye,
	yen: yen$2,
	yfr: yfr,
	yicy: yicy,
	yopf: yopf,
	yscr: yscr,
	yucy: yucy,
	yum: yum,
	yuml: yuml$2,
	zacute: zacute,
	zcaron: zcaron,
	zcy: zcy,
	zdot: zdot,
	zeetrf: zeetrf,
	zeta: zeta$1,
	zfr: zfr,
	zhcy: zhcy,
	zigrarr: zigrarr,
	zopf: zopf,
	zscr: zscr,
	zwj: zwj$1,
	zwnj: zwnj$1
};

var decodeEntity_1 = decodeEntity;

var own$6 = {}.hasOwnProperty;

function decodeEntity(characters) {
  return own$6.call(characterEntities, characters)
    ? characterEntities[characters]
    : false
}

var asciiDigit = regexCheck_1(/\d/);

var asciiDigit_1 = asciiDigit;

var asciiHexDigit = regexCheck_1(/[\dA-Fa-f]/);

var asciiHexDigit_1 = asciiHexDigit;

function _interopDefaultLegacy$1(e) {
  return e && typeof e === 'object' && 'default' in e ? e : {default: e}
}

var decodeEntity__default = /*#__PURE__*/ _interopDefaultLegacy$1(decodeEntity_1);

var characterReference = {
  name: 'characterReference',
  tokenize: tokenizeCharacterReference
};

function tokenizeCharacterReference(effects, ok, nok) {
  var self = this;
  var size = 0;
  var max;
  var test;
  return start

  function start(code) {
    effects.enter('characterReference');
    effects.enter('characterReferenceMarker');
    effects.consume(code);
    effects.exit('characterReferenceMarker');
    return open
  }

  function open(code) {
    if (code === 35) {
      effects.enter('characterReferenceMarkerNumeric');
      effects.consume(code);
      effects.exit('characterReferenceMarkerNumeric');
      return numeric
    }

    effects.enter('characterReferenceValue');
    max = 31;
    test = asciiAlphanumeric_1;
    return value(code)
  }

  function numeric(code) {
    if (code === 88 || code === 120) {
      effects.enter('characterReferenceMarkerHexadecimal');
      effects.consume(code);
      effects.exit('characterReferenceMarkerHexadecimal');
      effects.enter('characterReferenceValue');
      max = 6;
      test = asciiHexDigit_1;
      return value
    }

    effects.enter('characterReferenceValue');
    max = 7;
    test = asciiDigit_1;
    return value(code)
  }

  function value(code) {
    var token;

    if (code === 59 && size) {
      token = effects.exit('characterReferenceValue');

      if (
        test === asciiAlphanumeric_1 &&
        !decodeEntity__default['default'](self.sliceSerialize(token))
      ) {
        return nok(code)
      }

      effects.enter('characterReferenceMarker');
      effects.consume(code);
      effects.exit('characterReferenceMarker');
      effects.exit('characterReference');
      return ok
    }

    if (test(code) && size++ < max) {
      effects.consume(code);
      return value
    }

    return nok(code)
  }
}

var characterReference_1 = characterReference;

var codeFenced = {
  name: 'codeFenced',
  tokenize: tokenizeCodeFenced,
  concrete: true
};

function tokenizeCodeFenced(effects, ok, nok) {
  var self = this;
  var closingFenceConstruct = {
    tokenize: tokenizeClosingFence,
    partial: true
  };
  var initialPrefix = prefixSize_1(this.events, 'linePrefix');
  var sizeOpen = 0;
  var marker;
  return start

  function start(code) {
    effects.enter('codeFenced');
    effects.enter('codeFencedFence');
    effects.enter('codeFencedFenceSequence');
    marker = code;
    return sequenceOpen(code)
  }

  function sequenceOpen(code) {
    if (code === marker) {
      effects.consume(code);
      sizeOpen++;
      return sequenceOpen
    }

    effects.exit('codeFencedFenceSequence');
    return sizeOpen < 3
      ? nok(code)
      : factorySpace(effects, infoOpen, 'whitespace')(code)
  }

  function infoOpen(code) {
    if (code === null || markdownLineEnding_1(code)) {
      return openAfter(code)
    }

    effects.enter('codeFencedFenceInfo');
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return info(code)
  }

  function info(code) {
    if (code === null || markdownLineEndingOrSpace_1(code)) {
      effects.exit('chunkString');
      effects.exit('codeFencedFenceInfo');
      return factorySpace(effects, infoAfter, 'whitespace')(code)
    }

    if (code === 96 && code === marker) return nok(code)
    effects.consume(code);
    return info
  }

  function infoAfter(code) {
    if (code === null || markdownLineEnding_1(code)) {
      return openAfter(code)
    }

    effects.enter('codeFencedFenceMeta');
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return meta(code)
  }

  function meta(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('chunkString');
      effects.exit('codeFencedFenceMeta');
      return openAfter(code)
    }

    if (code === 96 && code === marker) return nok(code)
    effects.consume(code);
    return meta
  }

  function openAfter(code) {
    effects.exit('codeFencedFence');
    return self.interrupt ? ok(code) : content(code)
  }

  function content(code) {
    if (code === null) {
      return after(code)
    }

    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return effects.attempt(
        closingFenceConstruct,
        after,
        initialPrefix
          ? factorySpace(effects, content, 'linePrefix', initialPrefix + 1)
          : content
      )
    }

    effects.enter('codeFlowValue');
    return contentContinue(code)
  }

  function contentContinue(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('codeFlowValue');
      return content(code)
    }

    effects.consume(code);
    return contentContinue
  }

  function after(code) {
    effects.exit('codeFenced');
    return ok(code)
  }

  function tokenizeClosingFence(effects, ok, nok) {
    var size = 0;
    return factorySpace(
      effects,
      closingSequenceStart,
      'linePrefix',
      this.parser.constructs.disable.null.indexOf('codeIndented') > -1
        ? undefined
        : 4
    )

    function closingSequenceStart(code) {
      effects.enter('codeFencedFence');
      effects.enter('codeFencedFenceSequence');
      return closingSequence(code)
    }

    function closingSequence(code) {
      if (code === marker) {
        effects.consume(code);
        size++;
        return closingSequence
      }

      if (size < sizeOpen) return nok(code)
      effects.exit('codeFencedFenceSequence');
      return factorySpace(effects, closingSequenceEnd, 'whitespace')(code)
    }

    function closingSequenceEnd(code) {
      if (code === null || markdownLineEnding_1(code)) {
        effects.exit('codeFencedFence');
        return ok(code)
      }

      return nok(code)
    }
  }
}

var codeFenced_1 = codeFenced;

var codeIndented = {
  name: 'codeIndented',
  tokenize: tokenizeCodeIndented,
  resolve: resolveCodeIndented
};
var indentedContentConstruct = {
  tokenize: tokenizeIndentedContent,
  partial: true
};

function resolveCodeIndented(events, context) {
  var code = {
    type: 'codeIndented',
    start: events[0][1].start,
    end: events[events.length - 1][1].end
  };
  chunkedSplice_1(events, 0, 0, [['enter', code, context]]);
  chunkedSplice_1(events, events.length, 0, [['exit', code, context]]);
  return events
}

function tokenizeCodeIndented(effects, ok, nok) {
  return effects.attempt(indentedContentConstruct, afterPrefix, nok)

  function afterPrefix(code) {
    if (code === null) {
      return ok(code)
    }

    if (markdownLineEnding_1(code)) {
      return effects.attempt(indentedContentConstruct, afterPrefix, ok)(code)
    }

    effects.enter('codeFlowValue');
    return content(code)
  }

  function content(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('codeFlowValue');
      return afterPrefix(code)
    }

    effects.consume(code);
    return content
  }
}

function tokenizeIndentedContent(effects, ok, nok) {
  var self = this;
  return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1)

  function afterPrefix(code) {
    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return factorySpace(effects, afterPrefix, 'linePrefix', 4 + 1)
    }

    return prefixSize_1(self.events, 'linePrefix') < 4 ? nok(code) : ok(code)
  }
}

var codeIndented_1 = codeIndented;

var codeText = {
  name: 'codeText',
  tokenize: tokenizeCodeText,
  resolve: resolveCodeText,
  previous: previous
};

function resolveCodeText(events) {
  var tailExitIndex = events.length - 4;
  var headEnterIndex = 3;
  var index;
  var enter; // If we start and end with an EOL or a space.

  if (
    (events[headEnterIndex][1].type === 'lineEnding' ||
      events[headEnterIndex][1].type === 'space') &&
    (events[tailExitIndex][1].type === 'lineEnding' ||
      events[tailExitIndex][1].type === 'space')
  ) {
    index = headEnterIndex; // And we have data.

    while (++index < tailExitIndex) {
      if (events[index][1].type === 'codeTextData') {
        // Then we have padding.
        events[tailExitIndex][1].type = events[headEnterIndex][1].type =
          'codeTextPadding';
        headEnterIndex += 2;
        tailExitIndex -= 2;
        break
      }
    }
  } // Merge adjacent spaces and data.

  index = headEnterIndex - 1;
  tailExitIndex++;

  while (++index <= tailExitIndex) {
    if (enter === undefined) {
      if (index !== tailExitIndex && events[index][1].type !== 'lineEnding') {
        enter = index;
      }
    } else if (
      index === tailExitIndex ||
      events[index][1].type === 'lineEnding'
    ) {
      events[enter][1].type = 'codeTextData';

      if (index !== enter + 2) {
        events[enter][1].end = events[index - 1][1].end;
        events.splice(enter + 2, index - enter - 2);
        tailExitIndex -= index - enter - 2;
        index = enter + 2;
      }

      enter = undefined;
    }
  }

  return events
}

function previous(code) {
  // If there is a previous code, there will always be a tail.
  return (
    code !== 96 ||
    this.events[this.events.length - 1][1].type === 'characterEscape'
  )
}

function tokenizeCodeText(effects, ok, nok) {
  var sizeOpen = 0;
  var size;
  var token;
  return start

  function start(code) {
    effects.enter('codeText');
    effects.enter('codeTextSequence');
    return openingSequence(code)
  }

  function openingSequence(code) {
    if (code === 96) {
      effects.consume(code);
      sizeOpen++;
      return openingSequence
    }

    effects.exit('codeTextSequence');
    return gap(code)
  }

  function gap(code) {
    // EOF.
    if (code === null) {
      return nok(code)
    } // Closing fence?
    // Could also be data.

    if (code === 96) {
      token = effects.enter('codeTextSequence');
      size = 0;
      return closingSequence(code)
    } // Tabs don’t work, and virtual spaces don’t make sense.

    if (code === 32) {
      effects.enter('space');
      effects.consume(code);
      effects.exit('space');
      return gap
    }

    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return gap
    } // Data.

    effects.enter('codeTextData');
    return data(code)
  } // In code.

  function data(code) {
    if (
      code === null ||
      code === 32 ||
      code === 96 ||
      markdownLineEnding_1(code)
    ) {
      effects.exit('codeTextData');
      return gap(code)
    }

    effects.consume(code);
    return data
  } // Closing fence.

  function closingSequence(code) {
    // More.
    if (code === 96) {
      effects.consume(code);
      size++;
      return closingSequence
    } // Done!

    if (size === sizeOpen) {
      effects.exit('codeTextSequence');
      effects.exit('codeText');
      return ok(code)
    } // More or less accents: mark as data.

    token.type = 'codeTextData';
    return data(code)
  }
}

var codeText_1 = codeText;

// eslint-disable-next-line max-params
function destinationFactory(
  effects,
  ok,
  nok,
  type,
  literalType,
  literalMarkerType,
  rawType,
  stringType,
  max
) {
  var limit = max || Infinity;
  var balance = 0;
  return start

  function start(code) {
    if (code === 60) {
      effects.enter(type);
      effects.enter(literalType);
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      return destinationEnclosedBefore
    }

    if (asciiControl_1(code) || code === 41) {
      return nok(code)
    }

    effects.enter(type);
    effects.enter(rawType);
    effects.enter(stringType);
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return destinationRaw(code)
  }

  function destinationEnclosedBefore(code) {
    if (code === 62) {
      effects.enter(literalMarkerType);
      effects.consume(code);
      effects.exit(literalMarkerType);
      effects.exit(literalType);
      effects.exit(type);
      return ok
    }

    effects.enter(stringType);
    effects.enter('chunkString', {
      contentType: 'string'
    });
    return destinationEnclosed(code)
  }

  function destinationEnclosed(code) {
    if (code === 62) {
      effects.exit('chunkString');
      effects.exit(stringType);
      return destinationEnclosedBefore(code)
    }

    if (code === null || code === 60 || markdownLineEnding_1(code)) {
      return nok(code)
    }

    effects.consume(code);
    return code === 92 ? destinationEnclosedEscape : destinationEnclosed
  }

  function destinationEnclosedEscape(code) {
    if (code === 60 || code === 62 || code === 92) {
      effects.consume(code);
      return destinationEnclosed
    }

    return destinationEnclosed(code)
  }

  function destinationRaw(code) {
    if (code === 40) {
      if (++balance > limit) return nok(code)
      effects.consume(code);
      return destinationRaw
    }

    if (code === 41) {
      if (!balance--) {
        effects.exit('chunkString');
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok(code)
      }

      effects.consume(code);
      return destinationRaw
    }

    if (code === null || markdownLineEndingOrSpace_1(code)) {
      if (balance) return nok(code)
      effects.exit('chunkString');
      effects.exit(stringType);
      effects.exit(rawType);
      effects.exit(type);
      return ok(code)
    }

    if (asciiControl_1(code)) return nok(code)
    effects.consume(code);
    return code === 92 ? destinationRawEscape : destinationRaw
  }

  function destinationRawEscape(code) {
    if (code === 40 || code === 41 || code === 92) {
      effects.consume(code);
      return destinationRaw
    }

    return destinationRaw(code)
  }
}

var factoryDestination = destinationFactory;

// eslint-disable-next-line max-params
function labelFactory(effects, ok, nok, type, markerType, stringType) {
  var self = this;
  var size = 0;
  var data;
  return start

  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    effects.enter(stringType);
    return atBreak
  }

  function atBreak(code) {
    if (
      code === null ||
      code === 91 ||
      (code === 93 && !data) ||
      /* c8 ignore next */
      (code === 94 &&
        /* c8 ignore next */
        !size &&
        /* c8 ignore next */
        '_hiddenFootnoteSupport' in self.parser.constructs) ||
      size > 999
    ) {
      return nok(code)
    }

    if (code === 93) {
      effects.exit(stringType);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok
    }

    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return atBreak
    }

    effects.enter('chunkString', {
      contentType: 'string'
    });
    return label(code)
  }

  function label(code) {
    if (
      code === null ||
      code === 91 ||
      code === 93 ||
      markdownLineEnding_1(code) ||
      size++ > 999
    ) {
      effects.exit('chunkString');
      return atBreak(code)
    }

    effects.consume(code);
    data = data || !markdownSpace_1(code);
    return code === 92 ? labelEscape : label
  }

  function labelEscape(code) {
    if (code === 91 || code === 92 || code === 93) {
      effects.consume(code);
      size++;
      return label
    }

    return label(code)
  }
}

var factoryLabel = labelFactory;

function whitespaceFactory(effects, ok) {
  var seen;
  return start

  function start(code) {
    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      seen = true;
      return start
    }

    if (markdownSpace_1(code)) {
      return factorySpace(
        effects,
        start,
        seen ? 'linePrefix' : 'lineSuffix'
      )(code)
    }

    return ok(code)
  }
}

var factoryWhitespace = whitespaceFactory;

function titleFactory(effects, ok, nok, type, markerType, stringType) {
  var marker;
  return start

  function start(code) {
    effects.enter(type);
    effects.enter(markerType);
    effects.consume(code);
    effects.exit(markerType);
    marker = code === 40 ? 41 : code;
    return atFirstTitleBreak
  }

  function atFirstTitleBreak(code) {
    if (code === marker) {
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.exit(type);
      return ok
    }

    effects.enter(stringType);
    return atTitleBreak(code)
  }

  function atTitleBreak(code) {
    if (code === marker) {
      effects.exit(stringType);
      return atFirstTitleBreak(marker)
    }

    if (code === null) {
      return nok(code)
    } // Note: blank lines can’t exist in content.

    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return factorySpace(effects, atTitleBreak, 'linePrefix')
    }

    effects.enter('chunkString', {
      contentType: 'string'
    });
    return title(code)
  }

  function title(code) {
    if (code === marker || code === null || markdownLineEnding_1(code)) {
      effects.exit('chunkString');
      return atTitleBreak(code)
    }

    effects.consume(code);
    return code === 92 ? titleEscape : title
  }

  function titleEscape(code) {
    if (code === marker || code === 92) {
      effects.consume(code);
      return title
    }

    return title(code)
  }
}

var factoryTitle = titleFactory;

var definition = {
  name: 'definition',
  tokenize: tokenizeDefinition
};
var titleConstruct = {
  tokenize: tokenizeTitle,
  partial: true
};

function tokenizeDefinition(effects, ok, nok) {
  var self = this;
  var identifier;
  return start

  function start(code) {
    effects.enter('definition');
    return factoryLabel.call(
      self,
      effects,
      labelAfter,
      nok,
      'definitionLabel',
      'definitionLabelMarker',
      'definitionLabelString'
    )(code)
  }

  function labelAfter(code) {
    identifier = normalizeIdentifier_1(
      self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
    );

    if (code === 58) {
      effects.enter('definitionMarker');
      effects.consume(code);
      effects.exit('definitionMarker'); // Note: blank lines can’t exist in content.

      return factoryWhitespace(
        effects,
        factoryDestination(
          effects,
          effects.attempt(
            titleConstruct,
            factorySpace(effects, after, 'whitespace'),
            factorySpace(effects, after, 'whitespace')
          ),
          nok,
          'definitionDestination',
          'definitionDestinationLiteral',
          'definitionDestinationLiteralMarker',
          'definitionDestinationRaw',
          'definitionDestinationString'
        )
      )
    }

    return nok(code)
  }

  function after(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('definition');

      if (self.parser.defined.indexOf(identifier) < 0) {
        self.parser.defined.push(identifier);
      }

      return ok(code)
    }

    return nok(code)
  }
}

function tokenizeTitle(effects, ok, nok) {
  return start

  function start(code) {
    return markdownLineEndingOrSpace_1(code)
      ? factoryWhitespace(effects, before)(code)
      : nok(code)
  }

  function before(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(
        effects,
        factorySpace(effects, after, 'whitespace'),
        nok,
        'definitionTitle',
        'definitionTitleMarker',
        'definitionTitleString'
      )(code)
    }

    return nok(code)
  }

  function after(code) {
    return code === null || markdownLineEnding_1(code) ? ok(code) : nok(code)
  }
}

var definition_1 = definition;

var hardBreakEscape = {
  name: 'hardBreakEscape',
  tokenize: tokenizeHardBreakEscape
};

function tokenizeHardBreakEscape(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('hardBreakEscape');
    effects.enter('escapeMarker');
    effects.consume(code);
    return open
  }

  function open(code) {
    if (markdownLineEnding_1(code)) {
      effects.exit('escapeMarker');
      effects.exit('hardBreakEscape');
      return ok(code)
    }

    return nok(code)
  }
}

var hardBreakEscape_1 = hardBreakEscape;

var headingAtx = {
  name: 'headingAtx',
  tokenize: tokenizeHeadingAtx,
  resolve: resolveHeadingAtx
};

function resolveHeadingAtx(events, context) {
  var contentEnd = events.length - 2;
  var contentStart = 3;
  var content;
  var text; // Prefix whitespace, part of the opening.

  if (events[contentStart][1].type === 'whitespace') {
    contentStart += 2;
  } // Suffix whitespace, part of the closing.

  if (
    contentEnd - 2 > contentStart &&
    events[contentEnd][1].type === 'whitespace'
  ) {
    contentEnd -= 2;
  }

  if (
    events[contentEnd][1].type === 'atxHeadingSequence' &&
    (contentStart === contentEnd - 1 ||
      (contentEnd - 4 > contentStart &&
        events[contentEnd - 2][1].type === 'whitespace'))
  ) {
    contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
  }

  if (contentEnd > contentStart) {
    content = {
      type: 'atxHeadingText',
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end
    };
    text = {
      type: 'chunkText',
      start: events[contentStart][1].start,
      end: events[contentEnd][1].end,
      contentType: 'text'
    };
    chunkedSplice_1(events, contentStart, contentEnd - contentStart + 1, [
      ['enter', content, context],
      ['enter', text, context],
      ['exit', text, context],
      ['exit', content, context]
    ]);
  }

  return events
}

function tokenizeHeadingAtx(effects, ok, nok) {
  var self = this;
  var size = 0;
  return start

  function start(code) {
    effects.enter('atxHeading');
    effects.enter('atxHeadingSequence');
    return fenceOpenInside(code)
  }

  function fenceOpenInside(code) {
    if (code === 35 && size++ < 6) {
      effects.consume(code);
      return fenceOpenInside
    }

    if (code === null || markdownLineEndingOrSpace_1(code)) {
      effects.exit('atxHeadingSequence');
      return self.interrupt ? ok(code) : headingBreak(code)
    }

    return nok(code)
  }

  function headingBreak(code) {
    if (code === 35) {
      effects.enter('atxHeadingSequence');
      return sequence(code)
    }

    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('atxHeading');
      return ok(code)
    }

    if (markdownSpace_1(code)) {
      return factorySpace(effects, headingBreak, 'whitespace')(code)
    }

    effects.enter('atxHeadingText');
    return data(code)
  }

  function sequence(code) {
    if (code === 35) {
      effects.consume(code);
      return sequence
    }

    effects.exit('atxHeadingSequence');
    return headingBreak(code)
  }

  function data(code) {
    if (code === null || code === 35 || markdownLineEndingOrSpace_1(code)) {
      effects.exit('atxHeadingText');
      return headingBreak(code)
    }

    effects.consume(code);
    return data
  }
}

var headingAtx_1 = headingAtx;

// This module is copied from <https://spec.commonmark.org/0.29/#html-blocks>.
var basics = [
  'address',
  'article',
  'aside',
  'base',
  'basefont',
  'blockquote',
  'body',
  'caption',
  'center',
  'col',
  'colgroup',
  'dd',
  'details',
  'dialog',
  'dir',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'frame',
  'frameset',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hr',
  'html',
  'iframe',
  'legend',
  'li',
  'link',
  'main',
  'menu',
  'menuitem',
  'nav',
  'noframes',
  'ol',
  'optgroup',
  'option',
  'p',
  'param',
  'section',
  'source',
  'summary',
  'table',
  'tbody',
  'td',
  'tfoot',
  'th',
  'thead',
  'title',
  'tr',
  'track',
  'ul'
];

var htmlBlockNames = basics;

// This module is copied from <https://spec.commonmark.org/0.29/#html-blocks>.
var raws = ['pre', 'script', 'style', 'textarea'];

var htmlRawNames = raws;

var htmlFlow = {
  name: 'htmlFlow',
  tokenize: tokenizeHtmlFlow,
  resolveTo: resolveToHtmlFlow,
  concrete: true
};
var nextBlankConstruct = {
  tokenize: tokenizeNextBlank,
  partial: true
};

function resolveToHtmlFlow(events) {
  var index = events.length;

  while (index--) {
    if (events[index][0] === 'enter' && events[index][1].type === 'htmlFlow') {
      break
    }
  }

  if (index > 1 && events[index - 2][1].type === 'linePrefix') {
    // Add the prefix start to the HTML token.
    events[index][1].start = events[index - 2][1].start; // Add the prefix start to the HTML line token.

    events[index + 1][1].start = events[index - 2][1].start; // Remove the line prefix.

    events.splice(index - 2, 2);
  }

  return events
}

function tokenizeHtmlFlow(effects, ok, nok) {
  var self = this;
  var kind;
  var startTag;
  var buffer;
  var index;
  var marker;
  return start

  function start(code) {
    effects.enter('htmlFlow');
    effects.enter('htmlFlowData');
    effects.consume(code);
    return open
  }

  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationStart
    }

    if (code === 47) {
      effects.consume(code);
      return tagCloseStart
    }

    if (code === 63) {
      effects.consume(code);
      kind = 3; // While we’re in an instruction instead of a declaration, we’re on a `?`
      // right now, so we do need to search for `>`, similar to declarations.

      return self.interrupt ? ok : continuationDeclarationInside
    }

    if (asciiAlpha_1(code)) {
      effects.consume(code);
      buffer = fromCharCode_1(code);
      startTag = true;
      return tagName
    }

    return nok(code)
  }

  function declarationStart(code) {
    if (code === 45) {
      effects.consume(code);
      kind = 2;
      return commentOpenInside
    }

    if (code === 91) {
      effects.consume(code);
      kind = 5;
      buffer = 'CDATA[';
      index = 0;
      return cdataOpenInside
    }

    if (asciiAlpha_1(code)) {
      effects.consume(code);
      kind = 4;
      return self.interrupt ? ok : continuationDeclarationInside
    }

    return nok(code)
  }

  function commentOpenInside(code) {
    if (code === 45) {
      effects.consume(code);
      return self.interrupt ? ok : continuationDeclarationInside
    }

    return nok(code)
  }

  function cdataOpenInside(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code);
      return index === buffer.length
        ? self.interrupt
          ? ok
          : continuation
        : cdataOpenInside
    }

    return nok(code)
  }

  function tagCloseStart(code) {
    if (asciiAlpha_1(code)) {
      effects.consume(code);
      buffer = fromCharCode_1(code);
      return tagName
    }

    return nok(code)
  }

  function tagName(code) {
    if (
      code === null ||
      code === 47 ||
      code === 62 ||
      markdownLineEndingOrSpace_1(code)
    ) {
      if (
        code !== 47 &&
        startTag &&
        htmlRawNames.indexOf(buffer.toLowerCase()) > -1
      ) {
        kind = 1;
        return self.interrupt ? ok(code) : continuation(code)
      }

      if (htmlBlockNames.indexOf(buffer.toLowerCase()) > -1) {
        kind = 6;

        if (code === 47) {
          effects.consume(code);
          return basicSelfClosing
        }

        return self.interrupt ? ok(code) : continuation(code)
      }

      kind = 7; // Do not support complete HTML when interrupting.

      return self.interrupt
        ? nok(code)
        : startTag
        ? completeAttributeNameBefore(code)
        : completeClosingTagAfter(code)
    }

    if (code === 45 || asciiAlphanumeric_1(code)) {
      effects.consume(code);
      buffer += fromCharCode_1(code);
      return tagName
    }

    return nok(code)
  }

  function basicSelfClosing(code) {
    if (code === 62) {
      effects.consume(code);
      return self.interrupt ? ok : continuation
    }

    return nok(code)
  }

  function completeClosingTagAfter(code) {
    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeClosingTagAfter
    }

    return completeEnd(code)
  }

  function completeAttributeNameBefore(code) {
    if (code === 47) {
      effects.consume(code);
      return completeEnd
    }

    if (code === 58 || code === 95 || asciiAlpha_1(code)) {
      effects.consume(code);
      return completeAttributeName
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeAttributeNameBefore
    }

    return completeEnd(code)
  }

  function completeAttributeName(code) {
    if (
      code === 45 ||
      code === 46 ||
      code === 58 ||
      code === 95 ||
      asciiAlphanumeric_1(code)
    ) {
      effects.consume(code);
      return completeAttributeName
    }

    return completeAttributeNameAfter(code)
  }

  function completeAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return completeAttributeValueBefore
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeAttributeNameAfter
    }

    return completeAttributeNameBefore(code)
  }

  function completeAttributeValueBefore(code) {
    if (
      code === null ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96
    ) {
      return nok(code)
    }

    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return completeAttributeValueQuoted
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeAttributeValueBefore
    }

    marker = undefined;
    return completeAttributeValueUnquoted(code)
  }

  function completeAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      return completeAttributeValueQuotedAfter
    }

    if (code === null || markdownLineEnding_1(code)) {
      return nok(code)
    }

    effects.consume(code);
    return completeAttributeValueQuoted
  }

  function completeAttributeValueUnquoted(code) {
    if (
      code === null ||
      code === 34 ||
      code === 39 ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96 ||
      markdownLineEndingOrSpace_1(code)
    ) {
      return completeAttributeNameAfter(code)
    }

    effects.consume(code);
    return completeAttributeValueUnquoted
  }

  function completeAttributeValueQuotedAfter(code) {
    if (code === 47 || code === 62 || markdownSpace_1(code)) {
      return completeAttributeNameBefore(code)
    }

    return nok(code)
  }

  function completeEnd(code) {
    if (code === 62) {
      effects.consume(code);
      return completeAfter
    }

    return nok(code)
  }

  function completeAfter(code) {
    if (markdownSpace_1(code)) {
      effects.consume(code);
      return completeAfter
    }

    return code === null || markdownLineEnding_1(code)
      ? continuation(code)
      : nok(code)
  }

  function continuation(code) {
    if (code === 45 && kind === 2) {
      effects.consume(code);
      return continuationCommentInside
    }

    if (code === 60 && kind === 1) {
      effects.consume(code);
      return continuationRawTagOpen
    }

    if (code === 62 && kind === 4) {
      effects.consume(code);
      return continuationClose
    }

    if (code === 63 && kind === 3) {
      effects.consume(code);
      return continuationDeclarationInside
    }

    if (code === 93 && kind === 5) {
      effects.consume(code);
      return continuationCharacterDataInside
    }

    if (markdownLineEnding_1(code) && (kind === 6 || kind === 7)) {
      return effects.check(
        nextBlankConstruct,
        continuationClose,
        continuationAtLineEnding
      )(code)
    }

    if (code === null || markdownLineEnding_1(code)) {
      return continuationAtLineEnding(code)
    }

    effects.consume(code);
    return continuation
  }

  function continuationAtLineEnding(code) {
    effects.exit('htmlFlowData');
    return htmlContinueStart(code)
  }

  function htmlContinueStart(code) {
    if (code === null) {
      return done(code)
    }

    if (markdownLineEnding_1(code)) {
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return htmlContinueStart
    }

    effects.enter('htmlFlowData');
    return continuation(code)
  }

  function continuationCommentInside(code) {
    if (code === 45) {
      effects.consume(code);
      return continuationDeclarationInside
    }

    return continuation(code)
  }

  function continuationRawTagOpen(code) {
    if (code === 47) {
      effects.consume(code);
      buffer = '';
      return continuationRawEndTag
    }

    return continuation(code)
  }

  function continuationRawEndTag(code) {
    if (code === 62 && htmlRawNames.indexOf(buffer.toLowerCase()) > -1) {
      effects.consume(code);
      return continuationClose
    }

    if (asciiAlpha_1(code) && buffer.length < 8) {
      effects.consume(code);
      buffer += fromCharCode_1(code);
      return continuationRawEndTag
    }

    return continuation(code)
  }

  function continuationCharacterDataInside(code) {
    if (code === 93) {
      effects.consume(code);
      return continuationDeclarationInside
    }

    return continuation(code)
  }

  function continuationDeclarationInside(code) {
    if (code === 62) {
      effects.consume(code);
      return continuationClose
    }

    return continuation(code)
  }

  function continuationClose(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('htmlFlowData');
      return done(code)
    }

    effects.consume(code);
    return continuationClose
  }

  function done(code) {
    effects.exit('htmlFlow');
    return ok(code)
  }
}

function tokenizeNextBlank(effects, ok, nok) {
  return start

  function start(code) {
    effects.exit('htmlFlowData');
    effects.enter('lineEndingBlank');
    effects.consume(code);
    effects.exit('lineEndingBlank');
    return effects.attempt(partialBlankLine_1, ok, nok)
  }
}

var htmlFlow_1 = htmlFlow;

var htmlText = {
  name: 'htmlText',
  tokenize: tokenizeHtmlText
};

function tokenizeHtmlText(effects, ok, nok) {
  var self = this;
  var marker;
  var buffer;
  var index;
  var returnState;
  return start

  function start(code) {
    effects.enter('htmlText');
    effects.enter('htmlTextData');
    effects.consume(code);
    return open
  }

  function open(code) {
    if (code === 33) {
      effects.consume(code);
      return declarationOpen
    }

    if (code === 47) {
      effects.consume(code);
      return tagCloseStart
    }

    if (code === 63) {
      effects.consume(code);
      return instruction
    }

    if (asciiAlpha_1(code)) {
      effects.consume(code);
      return tagOpen
    }

    return nok(code)
  }

  function declarationOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentOpen
    }

    if (code === 91) {
      effects.consume(code);
      buffer = 'CDATA[';
      index = 0;
      return cdataOpen
    }

    if (asciiAlpha_1(code)) {
      effects.consume(code);
      return declaration
    }

    return nok(code)
  }

  function commentOpen(code) {
    if (code === 45) {
      effects.consume(code);
      return commentStart
    }

    return nok(code)
  }

  function commentStart(code) {
    if (code === null || code === 62) {
      return nok(code)
    }

    if (code === 45) {
      effects.consume(code);
      return commentStartDash
    }

    return comment(code)
  }

  function commentStartDash(code) {
    if (code === null || code === 62) {
      return nok(code)
    }

    return comment(code)
  }

  function comment(code) {
    if (code === null) {
      return nok(code)
    }

    if (code === 45) {
      effects.consume(code);
      return commentClose
    }

    if (markdownLineEnding_1(code)) {
      returnState = comment;
      return atLineEnding(code)
    }

    effects.consume(code);
    return comment
  }

  function commentClose(code) {
    if (code === 45) {
      effects.consume(code);
      return end
    }

    return comment(code)
  }

  function cdataOpen(code) {
    if (code === buffer.charCodeAt(index++)) {
      effects.consume(code);
      return index === buffer.length ? cdata : cdataOpen
    }

    return nok(code)
  }

  function cdata(code) {
    if (code === null) {
      return nok(code)
    }

    if (code === 93) {
      effects.consume(code);
      return cdataClose
    }

    if (markdownLineEnding_1(code)) {
      returnState = cdata;
      return atLineEnding(code)
    }

    effects.consume(code);
    return cdata
  }

  function cdataClose(code) {
    if (code === 93) {
      effects.consume(code);
      return cdataEnd
    }

    return cdata(code)
  }

  function cdataEnd(code) {
    if (code === 62) {
      return end(code)
    }

    if (code === 93) {
      effects.consume(code);
      return cdataEnd
    }

    return cdata(code)
  }

  function declaration(code) {
    if (code === null || code === 62) {
      return end(code)
    }

    if (markdownLineEnding_1(code)) {
      returnState = declaration;
      return atLineEnding(code)
    }

    effects.consume(code);
    return declaration
  }

  function instruction(code) {
    if (code === null) {
      return nok(code)
    }

    if (code === 63) {
      effects.consume(code);
      return instructionClose
    }

    if (markdownLineEnding_1(code)) {
      returnState = instruction;
      return atLineEnding(code)
    }

    effects.consume(code);
    return instruction
  }

  function instructionClose(code) {
    return code === 62 ? end(code) : instruction(code)
  }

  function tagCloseStart(code) {
    if (asciiAlpha_1(code)) {
      effects.consume(code);
      return tagClose
    }

    return nok(code)
  }

  function tagClose(code) {
    if (code === 45 || asciiAlphanumeric_1(code)) {
      effects.consume(code);
      return tagClose
    }

    return tagCloseBetween(code)
  }

  function tagCloseBetween(code) {
    if (markdownLineEnding_1(code)) {
      returnState = tagCloseBetween;
      return atLineEnding(code)
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return tagCloseBetween
    }

    return end(code)
  }

  function tagOpen(code) {
    if (code === 45 || asciiAlphanumeric_1(code)) {
      effects.consume(code);
      return tagOpen
    }

    if (code === 47 || code === 62 || markdownLineEndingOrSpace_1(code)) {
      return tagOpenBetween(code)
    }

    return nok(code)
  }

  function tagOpenBetween(code) {
    if (code === 47) {
      effects.consume(code);
      return end
    }

    if (code === 58 || code === 95 || asciiAlpha_1(code)) {
      effects.consume(code);
      return tagOpenAttributeName
    }

    if (markdownLineEnding_1(code)) {
      returnState = tagOpenBetween;
      return atLineEnding(code)
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return tagOpenBetween
    }

    return end(code)
  }

  function tagOpenAttributeName(code) {
    if (
      code === 45 ||
      code === 46 ||
      code === 58 ||
      code === 95 ||
      asciiAlphanumeric_1(code)
    ) {
      effects.consume(code);
      return tagOpenAttributeName
    }

    return tagOpenAttributeNameAfter(code)
  }

  function tagOpenAttributeNameAfter(code) {
    if (code === 61) {
      effects.consume(code);
      return tagOpenAttributeValueBefore
    }

    if (markdownLineEnding_1(code)) {
      returnState = tagOpenAttributeNameAfter;
      return atLineEnding(code)
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return tagOpenAttributeNameAfter
    }

    return tagOpenBetween(code)
  }

  function tagOpenAttributeValueBefore(code) {
    if (
      code === null ||
      code === 60 ||
      code === 61 ||
      code === 62 ||
      code === 96
    ) {
      return nok(code)
    }

    if (code === 34 || code === 39) {
      effects.consume(code);
      marker = code;
      return tagOpenAttributeValueQuoted
    }

    if (markdownLineEnding_1(code)) {
      returnState = tagOpenAttributeValueBefore;
      return atLineEnding(code)
    }

    if (markdownSpace_1(code)) {
      effects.consume(code);
      return tagOpenAttributeValueBefore
    }

    effects.consume(code);
    marker = undefined;
    return tagOpenAttributeValueUnquoted
  }

  function tagOpenAttributeValueQuoted(code) {
    if (code === marker) {
      effects.consume(code);
      return tagOpenAttributeValueQuotedAfter
    }

    if (code === null) {
      return nok(code)
    }

    if (markdownLineEnding_1(code)) {
      returnState = tagOpenAttributeValueQuoted;
      return atLineEnding(code)
    }

    effects.consume(code);
    return tagOpenAttributeValueQuoted
  }

  function tagOpenAttributeValueQuotedAfter(code) {
    if (code === 62 || code === 47 || markdownLineEndingOrSpace_1(code)) {
      return tagOpenBetween(code)
    }

    return nok(code)
  }

  function tagOpenAttributeValueUnquoted(code) {
    if (
      code === null ||
      code === 34 ||
      code === 39 ||
      code === 60 ||
      code === 61 ||
      code === 96
    ) {
      return nok(code)
    }

    if (code === 62 || markdownLineEndingOrSpace_1(code)) {
      return tagOpenBetween(code)
    }

    effects.consume(code);
    return tagOpenAttributeValueUnquoted
  } // We can’t have blank lines in content, so no need to worry about empty
  // tokens.

  function atLineEnding(code) {
    effects.exit('htmlTextData');
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace(
      effects,
      afterPrefix,
      'linePrefix',
      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
        ? undefined
        : 4
    )
  }

  function afterPrefix(code) {
    effects.enter('htmlTextData');
    return returnState(code)
  }

  function end(code) {
    if (code === 62) {
      effects.consume(code);
      effects.exit('htmlTextData');
      effects.exit('htmlText');
      return ok
    }

    return nok(code)
  }
}

var htmlText_1 = htmlText;

var labelEnd = {
  name: 'labelEnd',
  tokenize: tokenizeLabelEnd,
  resolveTo: resolveToLabelEnd,
  resolveAll: resolveAllLabelEnd
};
var resourceConstruct = {
  tokenize: tokenizeResource
};
var fullReferenceConstruct = {
  tokenize: tokenizeFullReference
};
var collapsedReferenceConstruct = {
  tokenize: tokenizeCollapsedReference
};

function resolveAllLabelEnd(events) {
  var index = -1;
  var token;

  while (++index < events.length) {
    token = events[index][1];

    if (
      !token._used &&
      (token.type === 'labelImage' ||
        token.type === 'labelLink' ||
        token.type === 'labelEnd')
    ) {
      // Remove the marker.
      events.splice(index + 1, token.type === 'labelImage' ? 4 : 2);
      token.type = 'data';
      index++;
    }
  }

  return events
}

function resolveToLabelEnd(events, context) {
  var index = events.length;
  var offset = 0;
  var group;
  var label;
  var text;
  var token;
  var open;
  var close;
  var media; // Find an opening.

  while (index--) {
    token = events[index][1];

    if (open) {
      // If we see another link, or inactive link label, we’ve been here before.
      if (
        token.type === 'link' ||
        (token.type === 'labelLink' && token._inactive)
      ) {
        break
      } // Mark other link openings as inactive, as we can’t have links in
      // links.

      if (events[index][0] === 'enter' && token.type === 'labelLink') {
        token._inactive = true;
      }
    } else if (close) {
      if (
        events[index][0] === 'enter' &&
        (token.type === 'labelImage' || token.type === 'labelLink') &&
        !token._balanced
      ) {
        open = index;

        if (token.type !== 'labelLink') {
          offset = 2;
          break
        }
      }
    } else if (token.type === 'labelEnd') {
      close = index;
    }
  }

  group = {
    type: events[open][1].type === 'labelLink' ? 'link' : 'image',
    start: shallow_1(events[open][1].start),
    end: shallow_1(events[events.length - 1][1].end)
  };
  label = {
    type: 'label',
    start: shallow_1(events[open][1].start),
    end: shallow_1(events[close][1].end)
  };
  text = {
    type: 'labelText',
    start: shallow_1(events[open + offset + 2][1].end),
    end: shallow_1(events[close - 2][1].start)
  };
  media = [
    ['enter', group, context],
    ['enter', label, context]
  ]; // Opening marker.

  media = chunkedPush_1(media, events.slice(open + 1, open + offset + 3)); // Text open.

  media = chunkedPush_1(media, [['enter', text, context]]); // Between.

  media = chunkedPush_1(
    media,
    resolveAll_1(
      context.parser.constructs.insideSpan.null,
      events.slice(open + offset + 4, close - 3),
      context
    )
  ); // Text close, marker close, label close.

  media = chunkedPush_1(media, [
    ['exit', text, context],
    events[close - 2],
    events[close - 1],
    ['exit', label, context]
  ]); // Reference, resource, or so.

  media = chunkedPush_1(media, events.slice(close + 1)); // Media close.

  media = chunkedPush_1(media, [['exit', group, context]]);
  chunkedSplice_1(events, open, events.length, media);
  return events
}

function tokenizeLabelEnd(effects, ok, nok) {
  var self = this;
  var index = self.events.length;
  var labelStart;
  var defined; // Find an opening.

  while (index--) {
    if (
      (self.events[index][1].type === 'labelImage' ||
        self.events[index][1].type === 'labelLink') &&
      !self.events[index][1]._balanced
    ) {
      labelStart = self.events[index][1];
      break
    }
  }

  return start

  function start(code) {
    if (!labelStart) {
      return nok(code)
    } // It’s a balanced bracket, but contains a link.

    if (labelStart._inactive) return balanced(code)
    defined =
      self.parser.defined.indexOf(
        normalizeIdentifier_1(
          self.sliceSerialize({
            start: labelStart.end,
            end: self.now()
          })
        )
      ) > -1;
    effects.enter('labelEnd');
    effects.enter('labelMarker');
    effects.consume(code);
    effects.exit('labelMarker');
    effects.exit('labelEnd');
    return afterLabelEnd
  }

  function afterLabelEnd(code) {
    // Resource: `[asd](fgh)`.
    if (code === 40) {
      return effects.attempt(
        resourceConstruct,
        ok,
        defined ? ok : balanced
      )(code)
    } // Collapsed (`[asd][]`) or full (`[asd][fgh]`) reference?

    if (code === 91) {
      return effects.attempt(
        fullReferenceConstruct,
        ok,
        defined
          ? effects.attempt(collapsedReferenceConstruct, ok, balanced)
          : balanced
      )(code)
    } // Shortcut reference: `[asd]`?

    return defined ? ok(code) : balanced(code)
  }

  function balanced(code) {
    labelStart._balanced = true;
    return nok(code)
  }
}

function tokenizeResource(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('resource');
    effects.enter('resourceMarker');
    effects.consume(code);
    effects.exit('resourceMarker');
    return factoryWhitespace(effects, open)
  }

  function open(code) {
    if (code === 41) {
      return end(code)
    }

    return factoryDestination(
      effects,
      destinationAfter,
      nok,
      'resourceDestination',
      'resourceDestinationLiteral',
      'resourceDestinationLiteralMarker',
      'resourceDestinationRaw',
      'resourceDestinationString',
      3
    )(code)
  }

  function destinationAfter(code) {
    return markdownLineEndingOrSpace_1(code)
      ? factoryWhitespace(effects, between)(code)
      : end(code)
  }

  function between(code) {
    if (code === 34 || code === 39 || code === 40) {
      return factoryTitle(
        effects,
        factoryWhitespace(effects, end),
        nok,
        'resourceTitle',
        'resourceTitleMarker',
        'resourceTitleString'
      )(code)
    }

    return end(code)
  }

  function end(code) {
    if (code === 41) {
      effects.enter('resourceMarker');
      effects.consume(code);
      effects.exit('resourceMarker');
      effects.exit('resource');
      return ok
    }

    return nok(code)
  }
}

function tokenizeFullReference(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    return factoryLabel.call(
      self,
      effects,
      afterLabel,
      nok,
      'reference',
      'referenceMarker',
      'referenceString'
    )(code)
  }

  function afterLabel(code) {
    return self.parser.defined.indexOf(
      normalizeIdentifier_1(
        self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1)
      )
    ) < 0
      ? nok(code)
      : ok(code)
  }
}

function tokenizeCollapsedReference(effects, ok, nok) {
  return start

  function start(code) {
    effects.enter('reference');
    effects.enter('referenceMarker');
    effects.consume(code);
    effects.exit('referenceMarker');
    return open
  }

  function open(code) {
    if (code === 93) {
      effects.enter('referenceMarker');
      effects.consume(code);
      effects.exit('referenceMarker');
      effects.exit('reference');
      return ok
    }

    return nok(code)
  }
}

var labelEnd_1 = labelEnd;

var labelStartImage = {
  name: 'labelStartImage',
  tokenize: tokenizeLabelStartImage,
  resolveAll: labelEnd_1.resolveAll
};

function tokenizeLabelStartImage(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    effects.enter('labelImage');
    effects.enter('labelImageMarker');
    effects.consume(code);
    effects.exit('labelImageMarker');
    return open
  }

  function open(code) {
    if (code === 91) {
      effects.enter('labelMarker');
      effects.consume(code);
      effects.exit('labelMarker');
      effects.exit('labelImage');
      return after
    }

    return nok(code)
  }

  function after(code) {
    /* c8 ignore next */
    return code === 94 &&
      /* c8 ignore next */
      '_hiddenFootnoteSupport' in self.parser.constructs
      ? /* c8 ignore next */
        nok(code)
      : ok(code)
  }
}

var labelStartImage_1 = labelStartImage;

var labelStartLink = {
  name: 'labelStartLink',
  tokenize: tokenizeLabelStartLink,
  resolveAll: labelEnd_1.resolveAll
};

function tokenizeLabelStartLink(effects, ok, nok) {
  var self = this;
  return start

  function start(code) {
    effects.enter('labelLink');
    effects.enter('labelMarker');
    effects.consume(code);
    effects.exit('labelMarker');
    effects.exit('labelLink');
    return after
  }

  function after(code) {
    /* c8 ignore next */
    return code === 94 &&
      /* c8 ignore next */
      '_hiddenFootnoteSupport' in self.parser.constructs
      ? /* c8 ignore next */
        nok(code)
      : ok(code)
  }
}

var labelStartLink_1 = labelStartLink;

var lineEnding = {
  name: 'lineEnding',
  tokenize: tokenizeLineEnding
};

function tokenizeLineEnding(effects, ok) {
  return start

  function start(code) {
    effects.enter('lineEnding');
    effects.consume(code);
    effects.exit('lineEnding');
    return factorySpace(effects, ok, 'linePrefix')
  }
}

var lineEnding_1 = lineEnding;

var thematicBreak$1 = {
  name: 'thematicBreak',
  tokenize: tokenizeThematicBreak
};

function tokenizeThematicBreak(effects, ok, nok) {
  var size = 0;
  var marker;
  return start

  function start(code) {
    effects.enter('thematicBreak');
    marker = code;
    return atBreak(code)
  }

  function atBreak(code) {
    if (code === marker) {
      effects.enter('thematicBreakSequence');
      return sequence(code)
    }

    if (markdownSpace_1(code)) {
      return factorySpace(effects, atBreak, 'whitespace')(code)
    }

    if (size < 3 || (code !== null && !markdownLineEnding_1(code))) {
      return nok(code)
    }

    effects.exit('thematicBreak');
    return ok(code)
  }

  function sequence(code) {
    if (code === marker) {
      effects.consume(code);
      size++;
      return sequence
    }

    effects.exit('thematicBreakSequence');
    return atBreak(code)
  }
}

var thematicBreak_1$1 = thematicBreak$1;

var list$1 = {
  name: 'list',
  tokenize: tokenizeListStart,
  continuation: {
    tokenize: tokenizeListContinuation
  },
  exit: tokenizeListEnd
};
var listItemPrefixWhitespaceConstruct = {
  tokenize: tokenizeListItemPrefixWhitespace,
  partial: true
};
var indentConstruct = {
  tokenize: tokenizeIndent,
  partial: true
};

function tokenizeListStart(effects, ok, nok) {
  var self = this;
  var initialSize = prefixSize_1(self.events, 'linePrefix');
  var size = 0;
  return start

  function start(code) {
    var kind =
      self.containerState.type ||
      (code === 42 || code === 43 || code === 45
        ? 'listUnordered'
        : 'listOrdered');

    if (
      kind === 'listUnordered'
        ? !self.containerState.marker || code === self.containerState.marker
        : asciiDigit_1(code)
    ) {
      if (!self.containerState.type) {
        self.containerState.type = kind;
        effects.enter(kind, {
          _container: true
        });
      }

      if (kind === 'listUnordered') {
        effects.enter('listItemPrefix');
        return code === 42 || code === 45
          ? effects.check(thematicBreak_1$1, nok, atMarker)(code)
          : atMarker(code)
      }

      if (!self.interrupt || code === 49) {
        effects.enter('listItemPrefix');
        effects.enter('listItemValue');
        return inside(code)
      }
    }

    return nok(code)
  }

  function inside(code) {
    if (asciiDigit_1(code) && ++size < 10) {
      effects.consume(code);
      return inside
    }

    if (
      (!self.interrupt || size < 2) &&
      (self.containerState.marker
        ? code === self.containerState.marker
        : code === 41 || code === 46)
    ) {
      effects.exit('listItemValue');
      return atMarker(code)
    }

    return nok(code)
  }

  function atMarker(code) {
    effects.enter('listItemMarker');
    effects.consume(code);
    effects.exit('listItemMarker');
    self.containerState.marker = self.containerState.marker || code;
    return effects.check(
      partialBlankLine_1, // Can’t be empty when interrupting.
      self.interrupt ? nok : onBlank,
      effects.attempt(
        listItemPrefixWhitespaceConstruct,
        endOfPrefix,
        otherPrefix
      )
    )
  }

  function onBlank(code) {
    self.containerState.initialBlankLine = true;
    initialSize++;
    return endOfPrefix(code)
  }

  function otherPrefix(code) {
    if (markdownSpace_1(code)) {
      effects.enter('listItemPrefixWhitespace');
      effects.consume(code);
      effects.exit('listItemPrefixWhitespace');
      return endOfPrefix
    }

    return nok(code)
  }

  function endOfPrefix(code) {
    self.containerState.size =
      initialSize + sizeChunks_1(self.sliceStream(effects.exit('listItemPrefix')));
    return ok(code)
  }
}

function tokenizeListContinuation(effects, ok, nok) {
  var self = this;
  self.containerState._closeFlow = undefined;
  return effects.check(partialBlankLine_1, onBlank, notBlank)

  function onBlank(code) {
    self.containerState.furtherBlankLines =
      self.containerState.furtherBlankLines ||
      self.containerState.initialBlankLine; // We have a blank line.
    // Still, try to consume at most the items size.

    return factorySpace(
      effects,
      ok,
      'listItemIndent',
      self.containerState.size + 1
    )(code)
  }

  function notBlank(code) {
    if (self.containerState.furtherBlankLines || !markdownSpace_1(code)) {
      self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
      return notInCurrentItem(code)
    }

    self.containerState.furtherBlankLines = self.containerState.initialBlankLine = undefined;
    return effects.attempt(indentConstruct, ok, notInCurrentItem)(code)
  }

  function notInCurrentItem(code) {
    // While we do continue, we signal that the flow should be closed.
    self.containerState._closeFlow = true; // As we’re closing flow, we’re no longer interrupting.

    self.interrupt = undefined;
    return factorySpace(
      effects,
      effects.attempt(list$1, ok, nok),
      'linePrefix',
      self.parser.constructs.disable.null.indexOf('codeIndented') > -1
        ? undefined
        : 4
    )(code)
  }
}

function tokenizeIndent(effects, ok, nok) {
  var self = this;
  return factorySpace(
    effects,
    afterPrefix,
    'listItemIndent',
    self.containerState.size + 1
  )

  function afterPrefix(code) {
    return prefixSize_1(self.events, 'listItemIndent') ===
      self.containerState.size
      ? ok(code)
      : nok(code)
  }
}

function tokenizeListEnd(effects) {
  effects.exit(this.containerState.type);
}

function tokenizeListItemPrefixWhitespace(effects, ok, nok) {
  var self = this;
  return factorySpace(
    effects,
    afterPrefix,
    'listItemPrefixWhitespace',
    self.parser.constructs.disable.null.indexOf('codeIndented') > -1
      ? undefined
      : 4 + 1
  )

  function afterPrefix(code) {
    return markdownSpace_1(code) ||
      !prefixSize_1(self.events, 'listItemPrefixWhitespace')
      ? nok(code)
      : ok(code)
  }
}

var list_1$1 = list$1;

var setextUnderline = {
  name: 'setextUnderline',
  tokenize: tokenizeSetextUnderline,
  resolveTo: resolveToSetextUnderline
};

function resolveToSetextUnderline(events, context) {
  var index = events.length;
  var content;
  var text;
  var definition;
  var heading; // Find the opening of the content.
  // It’ll always exist: we don’t tokenize if it isn’t there.

  while (index--) {
    if (events[index][0] === 'enter') {
      if (events[index][1].type === 'content') {
        content = index;
        break
      }

      if (events[index][1].type === 'paragraph') {
        text = index;
      }
    } // Exit
    else {
      if (events[index][1].type === 'content') {
        // Remove the content end (if needed we’ll add it later)
        events.splice(index, 1);
      }

      if (!definition && events[index][1].type === 'definition') {
        definition = index;
      }
    }
  }

  heading = {
    type: 'setextHeading',
    start: shallow_1(events[text][1].start),
    end: shallow_1(events[events.length - 1][1].end)
  }; // Change the paragraph to setext heading text.

  events[text][1].type = 'setextHeadingText'; // If we have definitions in the content, we’ll keep on having content,
  // but we need move it.

  if (definition) {
    events.splice(text, 0, ['enter', heading, context]);
    events.splice(definition + 1, 0, ['exit', events[content][1], context]);
    events[content][1].end = shallow_1(events[definition][1].end);
  } else {
    events[content][1] = heading;
  } // Add the heading exit at the end.

  events.push(['exit', heading, context]);
  return events
}

function tokenizeSetextUnderline(effects, ok, nok) {
  var self = this;
  var index = self.events.length;
  var marker;
  var paragraph; // Find an opening.

  while (index--) {
    // Skip enter/exit of line ending, line prefix, and content.
    // We can now either have a definition or a paragraph.
    if (
      self.events[index][1].type !== 'lineEnding' &&
      self.events[index][1].type !== 'linePrefix' &&
      self.events[index][1].type !== 'content'
    ) {
      paragraph = self.events[index][1].type === 'paragraph';
      break
    }
  }

  return start

  function start(code) {
    if (!self.lazy && (self.interrupt || paragraph)) {
      effects.enter('setextHeadingLine');
      effects.enter('setextHeadingLineSequence');
      marker = code;
      return closingSequence(code)
    }

    return nok(code)
  }

  function closingSequence(code) {
    if (code === marker) {
      effects.consume(code);
      return closingSequence
    }

    effects.exit('setextHeadingLineSequence');
    return factorySpace(effects, closingSequenceEnd, 'lineSuffix')(code)
  }

  function closingSequenceEnd(code) {
    if (code === null || markdownLineEnding_1(code)) {
      effects.exit('setextHeadingLine');
      return ok(code)
    }

    return nok(code)
  }
}

var setextUnderline_1 = setextUnderline;

var document$1 = {
  42: list_1$1,
  // Asterisk
  43: list_1$1,
  // Plus sign
  45: list_1$1,
  // Dash
  48: list_1$1,
  // 0
  49: list_1$1,
  // 1
  50: list_1$1,
  // 2
  51: list_1$1,
  // 3
  52: list_1$1,
  // 4
  53: list_1$1,
  // 5
  54: list_1$1,
  // 6
  55: list_1$1,
  // 7
  56: list_1$1,
  // 8
  57: list_1$1,
  // 9
  62: blockQuote_1 // Greater than
};
var contentInitial = {
  91: definition_1 // Left square bracket
};
var flowInitial = {
  '-2': codeIndented_1,
  // Horizontal tab
  '-1': codeIndented_1,
  // Virtual space
  32: codeIndented_1 // Space
};
var flow = {
  35: headingAtx_1,
  // Number sign
  42: thematicBreak_1$1,
  // Asterisk
  45: [setextUnderline_1, thematicBreak_1$1],
  // Dash
  60: htmlFlow_1,
  // Less than
  61: setextUnderline_1,
  // Equals to
  95: thematicBreak_1$1,
  // Underscore
  96: codeFenced_1,
  // Grave accent
  126: codeFenced_1 // Tilde
};
var string = {
  38: characterReference_1,
  // Ampersand
  92: characterEscape_1 // Backslash
};
var text$3 = {
  '-5': lineEnding_1,
  // Carriage return
  '-4': lineEnding_1,
  // Line feed
  '-3': lineEnding_1,
  // Carriage return + line feed
  33: labelStartImage_1,
  // Exclamation mark
  38: characterReference_1,
  // Ampersand
  42: attention_1,
  // Asterisk
  60: [autolink_1, htmlText_1],
  // Less than
  91: labelStartLink_1,
  // Left square bracket
  92: [hardBreakEscape_1, characterEscape_1],
  // Backslash
  93: labelEnd_1,
  // Right square bracket
  95: attention_1,
  // Underscore
  96: codeText_1 // Grave accent
};
var insideSpan = {
  null: [attention_1, text_1$2.resolver]
};
var disable = {
  null: []
};

var contentInitial_1 = contentInitial;
var disable_1 = disable;
var document_1 = document$1;
var flow_1 = flow;
var flowInitial_1 = flowInitial;
var insideSpan_1 = insideSpan;
var string_1 = string;
var text_1$1 = text$3;

var constructs = /*#__PURE__*/Object.defineProperty({
	contentInitial: contentInitial_1,
	disable: disable_1,
	document: document_1,
	flow: flow_1,
	flowInitial: flowInitial_1,
	insideSpan: insideSpan_1,
	string: string_1,
	text: text_1$1
}, '__esModule', {value: true});

function parse$4(options) {
  var settings = options || {};
  var parser = {
    defined: [],
    constructs: combineExtensions_1(
      [constructs].concat(miniflat_1(settings.extensions))
    ),
    content: create(content$1),
    document: create(document$2),
    flow: create(flow$1),
    string: create(text_1$2.string),
    text: create(text_1$2.text)
  };
  return parser

  function create(initializer) {
    return creator

    function creator(from) {
      return createTokenizer_1(parser, initializer, from)
    }
  }
}

var parse_1$2 = parse$4;

var search = /[\0\t\n\r]/g;

function preprocess() {
  var start = true;
  var column = 1;
  var buffer = '';
  var atCarriageReturn;
  return preprocessor

  function preprocessor(value, encoding, end) {
    var chunks = [];
    var match;
    var next;
    var startPosition;
    var endPosition;
    var code;
    value = buffer + value.toString(encoding);
    startPosition = 0;
    buffer = '';

    if (start) {
      if (value.charCodeAt(0) === 65279) {
        startPosition++;
      }

      start = undefined;
    }

    while (startPosition < value.length) {
      search.lastIndex = startPosition;
      match = search.exec(value);
      endPosition = match ? match.index : value.length;
      code = value.charCodeAt(endPosition);

      if (!match) {
        buffer = value.slice(startPosition);
        break
      }

      if (code === 10 && startPosition === endPosition && atCarriageReturn) {
        chunks.push(-3);
        atCarriageReturn = undefined;
      } else {
        if (atCarriageReturn) {
          chunks.push(-5);
          atCarriageReturn = undefined;
        }

        if (startPosition < endPosition) {
          chunks.push(value.slice(startPosition, endPosition));
          column += endPosition - startPosition;
        }

        if (code === 0) {
          chunks.push(65533);
          column++;
        } else if (code === 9) {
          next = Math.ceil(column / 4) * 4;
          chunks.push(-2);

          while (column++ < next) chunks.push(-1);
        } else if (code === 10) {
          chunks.push(-4);
          column = 1;
        } // Must be carriage return.
        else {
          atCarriageReturn = true;
          column = 1;
        }
      }

      startPosition = endPosition + 1;
    }

    if (end) {
      if (atCarriageReturn) chunks.push(-5);
      if (buffer) chunks.push(buffer);
      chunks.push(null);
    }

    return chunks
  }
}

var preprocess_1 = preprocess;

function postprocess(events) {
  while (!subtokenize_1(events)) {
    // Empty
  }

  return events
}

var postprocess_1 = postprocess;

var dist = fromMarkdown$1;

// These three are compiled away in the `dist/`












function fromMarkdown$1(value, encoding, options) {
  if (typeof encoding !== 'string') {
    options = encoding;
    encoding = undefined;
  }

  return compiler(options)(
    postprocess_1(
      parse_1$2(options).document().write(preprocess_1()(value, encoding, true))
    )
  )
}

// Note this compiler only understand complete buffering, not streaming.
function compiler(options) {
  var settings = options || {};
  var config = configure(
    {
      transforms: [],
      canContainEols: [
        'emphasis',
        'fragment',
        'heading',
        'paragraph',
        'strong'
      ],

      enter: {
        autolink: opener(link),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading),
        blockQuote: opener(blockQuote),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis),
        hardBreakEscape: opener(hardBreak),
        hardBreakTrailing: opener(hardBreak),
        htmlFlow: opener(html, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html, buffer),
        htmlTextData: onenterdata,
        image: opener(image),
        label: buffer,
        link: opener(link),
        listItem: opener(listItem),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list, onenterlistordered),
        listUnordered: opener(list),
        paragraph: opener(paragraph),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading),
        strong: opener(strong),
        thematicBreak: opener(thematicBreak)
      },

      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    },

    settings.mdastExtensions || []
  );

  var data = {};

  return compile

  function compile(events) {
    var tree = {type: 'root', children: []};
    var stack = [tree];
    var tokenStack = [];
    var listStack = [];
    var index = -1;
    var handler;
    var listStart;

    var context = {
      stack: stack,
      tokenStack: tokenStack,
      config: config,
      enter: enter,
      exit: exit,
      buffer: buffer,
      resume: resume,
      setData: setData,
      getData: getData
    };

    while (++index < events.length) {
      // We preprocess lists to add `listItem` tokens, and to infer whether
      // items the list itself are spread out.
      if (
        events[index][1].type === 'listOrdered' ||
        events[index][1].type === 'listUnordered'
      ) {
        if (events[index][0] === 'enter') {
          listStack.push(index);
        } else {
          listStart = listStack.pop(index);
          index = prepareList(events, listStart, index);
        }
      }
    }

    index = -1;

    while (++index < events.length) {
      handler = config[events[index][0]];

      if (hasOwnProperty$2.call(handler, events[index][1].type)) {
        handler[events[index][1].type].call(
          assign_1({sliceSerialize: events[index][2].sliceSerialize}, context),
          events[index][1]
        );
      }
    }

    if (tokenStack.length) {
      throw new Error(
        'Cannot close document, a token (`' +
          tokenStack[tokenStack.length - 1].type +
          '`, ' +
          unistUtilStringifyPosition({
            start: tokenStack[tokenStack.length - 1].start,
            end: tokenStack[tokenStack.length - 1].end
          }) +
          ') is still open'
      )
    }

    // Figure out `root` position.
    tree.position = {
      start: point(
        events.length ? events[0][1].start : {line: 1, column: 1, offset: 0}
      ),

      end: point(
        events.length
          ? events[events.length - 2][1].end
          : {line: 1, column: 1, offset: 0}
      )
    };

    index = -1;
    while (++index < config.transforms.length) {
      tree = config.transforms[index](tree) || tree;
    }

    return tree
  }

  function prepareList(events, start, length) {
    var index = start - 1;
    var containerBalance = -1;
    var listSpread = false;
    var listItem;
    var tailIndex;
    var lineIndex;
    var tailEvent;
    var event;
    var firstBlankLineIndex;
    var atMarker;

    while (++index <= length) {
      event = events[index];

      if (
        event[1].type === 'listUnordered' ||
        event[1].type === 'listOrdered' ||
        event[1].type === 'blockQuote'
      ) {
        if (event[0] === 'enter') {
          containerBalance++;
        } else {
          containerBalance--;
        }

        atMarker = undefined;
      } else if (event[1].type === 'lineEndingBlank') {
        if (event[0] === 'enter') {
          if (
            listItem &&
            !atMarker &&
            !containerBalance &&
            !firstBlankLineIndex
          ) {
            firstBlankLineIndex = index;
          }

          atMarker = undefined;
        }
      } else if (
        event[1].type === 'linePrefix' ||
        event[1].type === 'listItemValue' ||
        event[1].type === 'listItemMarker' ||
        event[1].type === 'listItemPrefix' ||
        event[1].type === 'listItemPrefixWhitespace'
      ) ; else {
        atMarker = undefined;
      }

      if (
        (!containerBalance &&
          event[0] === 'enter' &&
          event[1].type === 'listItemPrefix') ||
        (containerBalance === -1 &&
          event[0] === 'exit' &&
          (event[1].type === 'listUnordered' ||
            event[1].type === 'listOrdered'))
      ) {
        if (listItem) {
          tailIndex = index;
          lineIndex = undefined;

          while (tailIndex--) {
            tailEvent = events[tailIndex];

            if (
              tailEvent[1].type === 'lineEnding' ||
              tailEvent[1].type === 'lineEndingBlank'
            ) {
              if (tailEvent[0] === 'exit') continue

              if (lineIndex) {
                events[lineIndex][1].type = 'lineEndingBlank';
                listSpread = true;
              }

              tailEvent[1].type = 'lineEnding';
              lineIndex = tailIndex;
            } else if (
              tailEvent[1].type === 'linePrefix' ||
              tailEvent[1].type === 'blockQuotePrefix' ||
              tailEvent[1].type === 'blockQuotePrefixWhitespace' ||
              tailEvent[1].type === 'blockQuoteMarker' ||
              tailEvent[1].type === 'listItemIndent'
            ) ; else {
              break
            }
          }

          if (
            firstBlankLineIndex &&
            (!lineIndex || firstBlankLineIndex < lineIndex)
          ) {
            listItem._spread = true;
          }

          // Fix position.
          listItem.end = point(
            lineIndex ? events[lineIndex][1].start : event[1].end
          );

          events.splice(lineIndex || index, 0, ['exit', listItem, event[2]]);
          index++;
          length++;
        }

        // Create a new list item.
        if (event[1].type === 'listItemPrefix') {
          listItem = {
            type: 'listItem',
            _spread: false,
            start: point(event[1].start)
          };

          events.splice(index, 0, ['enter', listItem, event[2]]);
          index++;
          length++;
          firstBlankLineIndex = undefined;
          atMarker = true;
        }
      }
    }

    events[start][1]._spread = listSpread;
    return length
  }

  function setData(key, value) {
    data[key] = value;
  }

  function getData(key) {
    return data[key]
  }

  function point(d) {
    return {line: d.line, column: d.column, offset: d.offset}
  }

  function opener(create, and) {
    return open

    function open(token) {
      enter.call(this, create(token), token);
      if (and) and.call(this, token);
    }
  }

  function buffer() {
    this.stack.push({type: 'fragment', children: []});
  }

  function enter(node, token) {
    this.stack[this.stack.length - 1].children.push(node);
    this.stack.push(node);
    this.tokenStack.push(token);
    node.position = {start: point(token.start)};
    return node
  }

  function closer(and) {
    return close

    function close(token) {
      if (and) and.call(this, token);
      exit.call(this, token);
    }
  }

  function exit(token) {
    var node = this.stack.pop();
    var open = this.tokenStack.pop();

    if (!open) {
      throw new Error(
        'Cannot close `' +
          token.type +
          '` (' +
          unistUtilStringifyPosition({start: token.start, end: token.end}) +
          '): it’s not open'
      )
    } else if (open.type !== token.type) {
      throw new Error(
        'Cannot close `' +
          token.type +
          '` (' +
          unistUtilStringifyPosition({start: token.start, end: token.end}) +
          '): a different token (`' +
          open.type +
          '`, ' +
          unistUtilStringifyPosition({start: open.start, end: open.end}) +
          ') is open'
      )
    }

    node.position.end = point(token.end);
    return node
  }

  function resume() {
    return mdastUtilToString(this.stack.pop())
  }

  //
  // Handlers.
  //

  function onenterlistordered() {
    setData('expectingFirstListItemValue', true);
  }

  function onenterlistitemvalue(token) {
    if (getData('expectingFirstListItemValue')) {
      this.stack[this.stack.length - 2].start = parseInt(
        this.sliceSerialize(token),
        10
      );

      setData('expectingFirstListItemValue');
    }
  }

  function onexitcodefencedfenceinfo() {
    var data = this.resume();
    this.stack[this.stack.length - 1].lang = data;
  }

  function onexitcodefencedfencemeta() {
    var data = this.resume();
    this.stack[this.stack.length - 1].meta = data;
  }

  function onexitcodefencedfence() {
    // Exit if this is the closing fence.
    if (getData('flowCodeInside')) return
    this.buffer();
    setData('flowCodeInside', true);
  }

  function onexitcodefenced() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data.replace(
      /^(\r?\n|\r)|(\r?\n|\r)$/g,
      ''
    );

    setData('flowCodeInside');
  }

  function onexitcodeindented() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitdefinitionlabelstring(token) {
    // Discard label, use the source content instead.
    var label = this.resume();
    this.stack[this.stack.length - 1].label = label;
    this.stack[this.stack.length - 1].identifier = normalizeIdentifier_1(
      this.sliceSerialize(token)
    ).toLowerCase();
  }

  function onexitdefinitiontitlestring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].title = data;
  }

  function onexitdefinitiondestinationstring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].url = data;
  }

  function onexitatxheadingsequence(token) {
    if (!this.stack[this.stack.length - 1].depth) {
      this.stack[this.stack.length - 1].depth = this.sliceSerialize(
        token
      ).length;
    }
  }

  function onexitsetextheadingtext() {
    setData('setextHeadingSlurpLineEnding', true);
  }

  function onexitsetextheadinglinesequence(token) {
    this.stack[this.stack.length - 1].depth =
      this.sliceSerialize(token).charCodeAt(0) === 61 ? 1 : 2;
  }

  function onexitsetextheading() {
    setData('setextHeadingSlurpLineEnding');
  }

  function onenterdata(token) {
    var siblings = this.stack[this.stack.length - 1].children;
    var tail = siblings[siblings.length - 1];

    if (!tail || tail.type !== 'text') {
      // Add a new text node.
      tail = text();
      tail.position = {start: point(token.start)};
      this.stack[this.stack.length - 1].children.push(tail);
    }

    this.stack.push(tail);
  }

  function onexitdata(token) {
    var tail = this.stack.pop();
    tail.value += this.sliceSerialize(token);
    tail.position.end = point(token.end);
  }

  function onexitlineending(token) {
    var context = this.stack[this.stack.length - 1];

    // If we’re at a hard break, include the line ending in there.
    if (getData('atHardBreak')) {
      context.children[context.children.length - 1].position.end = point(
        token.end
      );

      setData('atHardBreak');
      return
    }

    if (
      !getData('setextHeadingSlurpLineEnding') &&
      config.canContainEols.indexOf(context.type) > -1
    ) {
      onenterdata.call(this, token);
      onexitdata.call(this, token);
    }
  }

  function onexithardbreak() {
    setData('atHardBreak', true);
  }

  function onexithtmlflow() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexithtmltext() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitcodetext() {
    var data = this.resume();
    this.stack[this.stack.length - 1].value = data;
  }

  function onexitlink() {
    var context = this.stack[this.stack.length - 1];

    // To do: clean.
    if (getData('inReference')) {
      context.type += 'Reference';
      context.referenceType = getData('referenceType') || 'shortcut';
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
      delete context.referenceType;
    }

    setData('referenceType');
  }

  function onexitimage() {
    var context = this.stack[this.stack.length - 1];

    // To do: clean.
    if (getData('inReference')) {
      context.type += 'Reference';
      context.referenceType = getData('referenceType') || 'shortcut';
      delete context.url;
      delete context.title;
    } else {
      delete context.identifier;
      delete context.label;
      delete context.referenceType;
    }

    setData('referenceType');
  }

  function onexitlabeltext(token) {
    this.stack[this.stack.length - 2].identifier = normalizeIdentifier_1(
      this.sliceSerialize(token)
    ).toLowerCase();
  }

  function onexitlabel() {
    var fragment = this.stack[this.stack.length - 1];
    var value = this.resume();

    this.stack[this.stack.length - 1].label = value;

    // Assume a reference.
    setData('inReference', true);

    if (this.stack[this.stack.length - 1].type === 'link') {
      this.stack[this.stack.length - 1].children = fragment.children;
    } else {
      this.stack[this.stack.length - 1].alt = value;
    }
  }

  function onexitresourcedestinationstring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].url = data;
  }

  function onexitresourcetitlestring() {
    var data = this.resume();
    this.stack[this.stack.length - 1].title = data;
  }

  function onexitresource() {
    setData('inReference');
  }

  function onenterreference() {
    setData('referenceType', 'collapsed');
  }

  function onexitreferencestring(token) {
    var label = this.resume();
    this.stack[this.stack.length - 1].label = label;
    this.stack[this.stack.length - 1].identifier = normalizeIdentifier_1(
      this.sliceSerialize(token)
    ).toLowerCase();
    setData('referenceType', 'full');
  }

  function onexitcharacterreferencemarker(token) {
    setData('characterReferenceType', token.type);
  }

  function onexitcharacterreferencevalue(token) {
    var data = this.sliceSerialize(token);
    var type = getData('characterReferenceType');
    var value;
    var tail;

    if (type) {
      value = safeFromInt_1(
        data,
        type === 'characterReferenceMarkerNumeric' ? 10 : 16
      );

      setData('characterReferenceType');
    } else {
      value = decodeEntity_1(data);
    }

    tail = this.stack.pop();
    tail.value += value;
    tail.position.end = point(token.end);
  }

  function onexitautolinkprotocol(token) {
    onexitdata.call(this, token);
    this.stack[this.stack.length - 1].url = this.sliceSerialize(token);
  }

  function onexitautolinkemail(token) {
    onexitdata.call(this, token);
    this.stack[this.stack.length - 1].url =
      'mailto:' + this.sliceSerialize(token);
  }

  //
  // Creaters.
  //

  function blockQuote() {
    return {type: 'blockquote', children: []}
  }

  function codeFlow() {
    return {type: 'code', lang: null, meta: null, value: ''}
  }

  function codeText() {
    return {type: 'inlineCode', value: ''}
  }

  function definition() {
    return {
      type: 'definition',
      identifier: '',
      label: null,
      title: null,
      url: ''
    }
  }

  function emphasis() {
    return {type: 'emphasis', children: []}
  }

  function heading() {
    return {type: 'heading', depth: undefined, children: []}
  }

  function hardBreak() {
    return {type: 'break'}
  }

  function html() {
    return {type: 'html', value: ''}
  }

  function image() {
    return {type: 'image', title: null, url: '', alt: null}
  }

  function link() {
    return {type: 'link', title: null, url: '', children: []}
  }

  function list(token) {
    return {
      type: 'list',
      ordered: token.type === 'listOrdered',
      start: null,
      spread: token._spread,
      children: []
    }
  }

  function listItem(token) {
    return {
      type: 'listItem',
      spread: token._spread,
      checked: null,
      children: []
    }
  }

  function paragraph() {
    return {type: 'paragraph', children: []}
  }

  function strong() {
    return {type: 'strong', children: []}
  }

  function text() {
    return {type: 'text', value: ''}
  }

  function thematicBreak() {
    return {type: 'thematicBreak'}
  }
}

function configure(config, extensions) {
  var index = -1;

  while (++index < extensions.length) {
    extension(config, extensions[index]);
  }

  return config
}

function extension(config, extension) {
  var key;
  var left;

  for (key in extension) {
    left = hasOwnProperty$2.call(config, key) ? config[key] : (config[key] = {});

    if (key === 'canContainEols' || key === 'transforms') {
      config[key] = [].concat(left, extension[key]);
    } else {
      Object.assign(left, extension[key]);
    }
  }
}

var mdastUtilFromMarkdown = dist;

var remarkParse = parse$3;



function parse$3(options) {
  var self = this;

  this.Parser = parse;

  function parse(doc) {
    return mdastUtilFromMarkdown(
      doc,
      Object.assign({}, self.data('settings'), options, {
        // Note: these options are not in the readme.
        // The goal is for them to be set by plugins on `data` instead of being
        // passed by users.
        extensions: self.data('micromarkExtensions') || [],
        mdastExtensions: self.data('fromMarkdownExtensions') || []
      })
    )
  }
}

var format$1 = createCommonjsModule(function (module) {
(function() {

  //// Export the API
  var namespace;

  // CommonJS / Node module
  {
    namespace = module.exports = format;
  }

  namespace.format = format;
  namespace.vsprintf = vsprintf;

  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    namespace.printf = printf;
  }

  function printf(/* ... */) {
    console.log(format.apply(null, arguments));
  }

  function vsprintf(fmt, replacements) {
    return format.apply(null, [fmt].concat(replacements));
  }

  function format(fmt) {
    var argIndex = 1 // skip initial format argument
      , args = [].slice.call(arguments)
      , i = 0
      , n = fmt.length
      , result = ''
      , c
      , escaped = false
      , arg
      , tmp
      , leadingZero = false
      , precision
      , nextArg = function() { return args[argIndex++]; }
      , slurpNumber = function() {
          var digits = '';
          while (/\d/.test(fmt[i])) {
            digits += fmt[i++];
            c = fmt[i];
          }
          return digits.length > 0 ? parseInt(digits) : null;
        }
      ;
    for (; i < n; ++i) {
      c = fmt[i];
      if (escaped) {
        escaped = false;
        if (c == '.') {
          leadingZero = false;
          c = fmt[++i];
        }
        else if (c == '0' && fmt[i + 1] == '.') {
          leadingZero = true;
          i += 2;
          c = fmt[i];
        }
        else {
          leadingZero = true;
        }
        precision = slurpNumber();
        switch (c) {
        case 'b': // number in binary
          result += parseInt(nextArg(), 10).toString(2);
          break;
        case 'c': // character
          arg = nextArg();
          if (typeof arg === 'string' || arg instanceof String)
            result += arg;
          else
            result += String.fromCharCode(parseInt(arg, 10));
          break;
        case 'd': // number in decimal
          result += parseInt(nextArg(), 10);
          break;
        case 'f': // floating point number
          tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
          result += leadingZero ? tmp : tmp.replace(/^0/, '');
          break;
        case 'j': // JSON
          result += JSON.stringify(nextArg());
          break;
        case 'o': // number in octal
          result += '0' + parseInt(nextArg(), 10).toString(8);
          break;
        case 's': // string
          result += nextArg();
          break;
        case 'x': // lowercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16);
          break;
        case 'X': // uppercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
          break;
        default:
          result += c;
          break;
        }
      } else if (c === '%') {
        escaped = true;
      } else {
        result += c;
      }
    }
    return result;
  }

}());
});

var fault = create$2(Error);

var fault_1 = fault;

fault.eval = create$2(EvalError);
fault.range = create$2(RangeError);
fault.reference = create$2(ReferenceError);
fault.syntax = create$2(SyntaxError);
fault.type = create$2(TypeError);
fault.uri = create$2(URIError);

fault.create = create$2;

// Create a new `EConstructor`, with the formatted `format` as a first argument.
function create$2(EConstructor) {
  FormattedError.displayName = EConstructor.displayName || EConstructor.name;

  return FormattedError

  function FormattedError(format) {
    if (format) {
      format = format$1.apply(null, arguments);
    }

    return new EConstructor(format)
  }
}

var matters_1 = matters;



var own$5 = {}.hasOwnProperty;

var markers = {yaml: '-', toml: '+'};

function matters(options) {
  var settings = options || 'yaml';
  var results = [];
  var index = -1;
  var length;

  // One preset or matter.
  if (typeof settings === 'string' || !('length' in settings)) {
    settings = [settings];
  }

  length = settings.length;

  while (++index < length) {
    results[index] = matter(settings[index]);
  }

  return results
}

function matter(option) {
  var result = option;

  if (typeof result === 'string') {
    if (!own$5.call(markers, result)) {
      throw fault_1('Missing matter definition for `%s`', result)
    }

    result = {type: result, marker: markers[result]};
  } else if (typeof result !== 'object') {
    throw fault_1('Expected matter to be an object, not `%j`', result)
  }

  if (!own$5.call(result, 'type')) {
    throw fault_1('Missing `type` in matter `%j`', result)
  }

  if (!own$5.call(result, 'fence') && !own$5.call(result, 'marker')) {
    throw fault_1('Missing `marker` or `fence` in matter `%j`', result)
  }

  return result
}

var syntax = create$1;



function create$1(options) {
  var settings = matters_1(options);
  var length = settings.length;
  var index = -1;
  var flow = {};
  var matter;
  var code;

  while (++index < length) {
    matter = settings[index];
    code = fence$1(matter, 'open').charCodeAt(0);
    if (code in flow) {
      flow[code].push(parse$2(matter));
    } else {
      flow[code] = [parse$2(matter)];
    }
  }

  return {flow: flow}
}

function parse$2(matter) {
  var name = matter.type;
  var anywhere = matter.anywhere;
  var valueType = name + 'Value';
  var fenceType = name + 'Fence';
  var sequenceType = fenceType + 'Sequence';
  var fenceConstruct = {tokenize: tokenizeFence, partial: true};
  var buffer;

  return {tokenize: tokenizeFrontmatter, concrete: true}

  function tokenizeFrontmatter(effects, ok, nok) {
    var self = this;

    return start

    function start(code) {
      var position = self.now();

      if (position.column !== 1 || (!anywhere && position.line !== 1)) {
        return nok(code)
      }

      effects.enter(name);
      buffer = fence$1(matter, 'open');
      return effects.attempt(fenceConstruct, afterOpeningFence, nok)(code)
    }

    function afterOpeningFence(code) {
      buffer = fence$1(matter, 'close');
      return lineEnd(code)
    }

    function lineStart(code) {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        return lineEnd(code)
      }

      effects.enter(valueType);
      return lineData(code)
    }

    function lineData(code) {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        effects.exit(valueType);
        return lineEnd(code)
      }

      effects.consume(code);
      return lineData
    }

    function lineEnd(code) {
      // Require a closing fence.
      if (code === null) {
        return nok(code)
      }

      // Can only be an eol.
      effects.enter('lineEnding');
      effects.consume(code);
      effects.exit('lineEnding');
      return effects.attempt(fenceConstruct, after, lineStart)
    }

    function after(code) {
      effects.exit(name);
      return ok(code)
    }
  }

  function tokenizeFence(effects, ok, nok) {
    var bufferIndex = 0;

    return start

    function start(code) {
      if (code === buffer.charCodeAt(bufferIndex)) {
        effects.enter(fenceType);
        effects.enter(sequenceType);
        return insideSequence(code)
      }

      return nok(code)
    }

    function insideSequence(code) {
      if (bufferIndex === buffer.length) {
        effects.exit(sequenceType);

        if (code === -2 || code === -1 || code === 32) {
          effects.enter('whitespace');
          return insideWhitespace(code)
        }

        return fenceEnd(code)
      }

      if (code === buffer.charCodeAt(bufferIndex)) {
        effects.consume(code);
        bufferIndex++;
        return insideSequence
      }

      return nok(code)
    }

    function insideWhitespace(code) {
      if (code === -2 || code === -1 || code === 32) {
        effects.consume(code);
        return insideWhitespace
      }

      effects.exit('whitespace');
      return fenceEnd(code)
    }

    function fenceEnd(code) {
      if (code === -5 || code === -4 || code === -3 || code === null) {
        effects.exit(fenceType);
        return ok(code)
      }

      return nok(code)
    }
  }
}

function fence$1(matter, prop) {
  var marker;

  if (matter.marker) {
    marker = pick$1(matter.marker, prop);
    return marker + marker + marker
  }

  return pick$1(matter.fence, prop)
}

function pick$1(schema, prop) {
  return typeof schema === 'string' ? schema : schema[prop]
}

var micromarkExtensionFrontmatter = syntax;

var fromMarkdown = createFromMarkdown;



function createFromMarkdown(options) {
  var settings = matters_1(options);
  var length = settings.length;
  var index = -1;
  var enter = {};
  var exit = {};
  var matter;

  while (++index < length) {
    matter = settings[index];
    enter[matter.type] = opener(matter);
    exit[matter.type] = close;
    exit[matter.type + 'Value'] = value;
  }

  return {enter: enter, exit: exit}
}

function opener(matter) {
  return open
  function open(token) {
    this.enter({type: matter.type, value: ''}, token);
    this.buffer();
  }
}

function close(token) {
  var data = this.resume();
  // Remove the initial and final eol.
  this.exit(token).value = data.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '');
}

function value(token) {
  this.config.enter.data.call(this, token);
  this.config.exit.data.call(this, token);
}

var toMarkdown = createToMarkdown;



function createToMarkdown(options) {
  var unsafe = [];
  var handlers = {};
  var settings = matters_1(options);
  var length = settings.length;
  var index = -1;
  var matter;

  while (++index < length) {
    matter = settings[index];
    handlers[matter.type] = handler(matter);
    unsafe.push({atBreak: true, character: fence(matter, 'open').charAt(0)});
  }

  return {unsafe: unsafe, handlers: handlers}
}

function handler(matter) {
  var open = fence(matter, 'open');
  var close = fence(matter, 'close');

  return handle

  function handle(node) {
    return open + (node.value ? '\n' + node.value : '') + '\n' + close
  }
}

function fence(matter, prop) {
  var marker;

  if (matter.marker) {
    marker = pick(matter.marker, prop);
    return marker + marker + marker
  }

  return pick(matter.fence, prop)
}

function pick(schema, prop) {
  return typeof schema === 'string' ? schema : schema[prop]
}

var remarkFrontmatter = frontmatter;

function frontmatter(options) {
  var data = this.data();
  add('micromarkExtensions', micromarkExtensionFrontmatter(options));
  add('fromMarkdownExtensions', fromMarkdown(options));
  add('toMarkdownExtensions', toMarkdown(options));
  function add(field, value) {
    /* istanbul ignore if - other extensions. */
    if (data[field]) data[field].push(value);
    else data[field] = [value];
  }
}

var unistBuilder = u;

function u(type, props, value) {
  var node;

  if (
    (value === null || value === undefined) &&
    (typeof props !== 'object' || Array.isArray(props))
  ) {
    value = props;
    props = {};
  }

  node = Object.assign({type: String(type)}, props);

  if (Array.isArray(value)) {
    node.children = value;
  } else if (value !== null && value !== undefined) {
    node.value = String(value);
  }

  return node
}

var convert_1$1 = convert$1;

function convert$1(test) {
  if (test == null) {
    return ok
  }

  if (typeof test === 'string') {
    return typeFactory(test)
  }

  if (typeof test === 'object') {
    return 'length' in test ? anyFactory(test) : allFactory(test)
  }

  if (typeof test === 'function') {
    return test
  }

  throw new Error('Expected function, string, or object as test')
}

// Utility assert each property in `test` is represented in `node`, and each
// values are strictly equal.
function allFactory(test) {
  return all

  function all(node) {
    var key;

    for (key in test) {
      if (node[key] !== test[key]) return false
    }

    return true
  }
}

function anyFactory(tests) {
  var checks = [];
  var index = -1;

  while (++index < tests.length) {
    checks[index] = convert$1(tests[index]);
  }

  return any

  function any() {
    var index = -1;

    while (++index < checks.length) {
      if (checks[index].apply(this, arguments)) {
        return true
      }
    }

    return false
  }
}

// Utility to convert a string into a function which checks a given node’s type
// for said string.
function typeFactory(test) {
  return type

  function type(node) {
    return Boolean(node && node.type === test)
  }
}

// Utility to return true.
function ok() {
  return true
}

var color_1 = color;
function color(d) {
  return '\u001B[33m' + d + '\u001B[39m'
}

var unistUtilVisitParents = visitParents;




var CONTINUE$1 = true;
var SKIP$1 = 'skip';
var EXIT$1 = false;

visitParents.CONTINUE = CONTINUE$1;
visitParents.SKIP = SKIP$1;
visitParents.EXIT = EXIT$1;

function visitParents(tree, test, visitor, reverse) {
  var step;
  var is;

  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor;
    visitor = test;
    test = null;
  }

  is = convert_1$1(test);
  step = reverse ? -1 : 1;

  factory(tree, null, [])();

  function factory(node, index, parents) {
    var value = typeof node === 'object' && node !== null ? node : {};
    var name;

    if (typeof value.type === 'string') {
      name =
        typeof value.tagName === 'string'
          ? value.tagName
          : typeof value.name === 'string'
          ? value.name
          : undefined;

      visit.displayName =
        'node (' + color_1(value.type + (name ? '<' + name + '>' : '')) + ')';
    }

    return visit

    function visit() {
      var grandparents = parents.concat(node);
      var result = [];
      var subresult;
      var offset;

      if (!test || is(node, index, parents[parents.length - 1] || null)) {
        result = toResult(visitor(node, parents));

        if (result[0] === EXIT$1) {
          return result
        }
      }

      if (node.children && result[0] !== SKIP$1) {
        offset = (reverse ? node.children.length : -1) + step;

        while (offset > -1 && offset < node.children.length) {
          subresult = factory(node.children[offset], offset, grandparents)();

          if (subresult[0] === EXIT$1) {
            return subresult
          }

          offset =
            typeof subresult[1] === 'number' ? subresult[1] : offset + step;
        }
      }

      return result
    }
  }
}

function toResult(value) {
  if (value !== null && typeof value === 'object' && 'length' in value) {
    return value
  }

  if (typeof value === 'number') {
    return [CONTINUE$1, value]
  }

  return [value]
}

var unistUtilVisit = visit;



var CONTINUE = unistUtilVisitParents.CONTINUE;
var SKIP = unistUtilVisitParents.SKIP;
var EXIT = unistUtilVisitParents.EXIT;

visit.CONTINUE = CONTINUE;
visit.SKIP = SKIP;
visit.EXIT = EXIT;

function visit(tree, test, visitor, reverse) {
  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor;
    visitor = test;
    test = null;
  }

  unistUtilVisitParents(tree, test, overload, reverse);

  function overload(node, parents) {
    var parent = parents[parents.length - 1];
    var index = parent ? parent.children.indexOf(node) : null;
    return visitor(node, index, parent)
  }
}

var start = factory$1('start');
var end = factory$1('end');

var unistUtilPosition = position;

position.start = start;
position.end = end;

function position(node) {
  return {start: start(node), end: end(node)}
}

function factory$1(type) {
  point.displayName = type;

  return point

  function point(node) {
    var point = (node && node.position && node.position[type]) || {};

    return {
      line: point.line || null,
      column: point.column || null,
      offset: isNaN(point.offset) ? null : point.offset
    }
  }
}

var unistUtilGenerated = generated;

function generated(node) {
  return (
    !node ||
    !node.position ||
    !node.position.start ||
    !node.position.start.line ||
    !node.position.start.column ||
    !node.position.end ||
    !node.position.end.line ||
    !node.position.end.column
  )
}

var mdastUtilDefinitions = getDefinitionFactory;

var own$4 = {}.hasOwnProperty;

// Get a definition in `node` by `identifier`.
function getDefinitionFactory(node, options) {
  return getterFactory(gather(node))
}

// Gather all definitions in `node`
function gather(node) {
  var cache = {};

  if (!node || !node.type) {
    throw new Error('mdast-util-definitions expected node')
  }

  unistUtilVisit(node, 'definition', ondefinition);

  return cache

  function ondefinition(definition) {
    var id = normalise(definition.identifier);
    if (!own$4.call(cache, id)) {
      cache[id] = definition;
    }
  }
}

// Factory to get a node from the given definition-cache.
function getterFactory(cache) {
  return getter

  // Get a node from the bound definition-cache.
  function getter(identifier) {
    var id = identifier && normalise(identifier);
    return id && own$4.call(cache, id) ? cache[id] : null
  }
}

function normalise(identifier) {
  return identifier.toUpperCase()
}

var all_1$1 = all$1;



function all$1(h, parent) {
  var nodes = parent.children || [];
  var length = nodes.length;
  var values = [];
  var index = -1;
  var result;
  var head;

  while (++index < length) {
    result = one_1(h, nodes[index], parent);

    if (result) {
      if (index && nodes[index - 1].type === 'break') {
        if (result.value) {
          result.value = result.value.replace(/^\s+/, '');
        }

        head = result.children && result.children[0];

        if (head && head.value) {
          head.value = head.value.replace(/^\s+/, '');
        }
      }

      values = values.concat(result);
    }
  }

  return values
}

var one_1 = one$1;




var own$3 = {}.hasOwnProperty;

// Transform an unknown node.
function unknown(h, node) {
  if (text$2(node)) {
    return h.augment(node, unistBuilder('text', node.value))
  }

  return h(node, 'div', all_1$1(h, node))
}

// Visit a node.
function one$1(h, node, parent) {
  var type = node && node.type;
  var fn;

  // Fail on non-nodes.
  if (!type) {
    throw new Error('Expected node, got `' + node + '`')
  }

  if (own$3.call(h.handlers, type)) {
    fn = h.handlers[type];
  } else if (h.passThrough && h.passThrough.indexOf(type) > -1) {
    fn = returnNode;
  } else {
    fn = h.unknownHandler;
  }

  return (typeof fn === 'function' ? fn : unknown)(h, node, parent)
}

// Check if the node should be renderered as a text node.
function text$2(node) {
  var data = node.data || {};

  if (
    own$3.call(data, 'hName') ||
    own$3.call(data, 'hProperties') ||
    own$3.call(data, 'hChildren')
  ) {
    return false
  }

  return 'value' in node
}

function returnNode(h, node) {
  var clone;

  if (node.children) {
    clone = Object.assign({}, node);
    clone.children = all_1$1(h, node);
    return clone
  }

  return node
}

var thematicBreak_1 = thematicBreak;

function thematicBreak(h, node) {
  return h(node, 'hr')
}

var wrap_1 = wrap;



// Wrap `nodes` with line feeds between each entry.
// Optionally adds line feeds at the start and end.
function wrap(nodes, loose) {
  var result = [];
  var index = -1;
  var length = nodes.length;

  if (loose) {
    result.push(unistBuilder('text', '\n'));
  }

  while (++index < length) {
    if (index) {
      result.push(unistBuilder('text', '\n'));
    }

    result.push(nodes[index]);
  }

  if (loose && nodes.length > 0) {
    result.push(unistBuilder('text', '\n'));
  }

  return result
}

var list_1 = list;




function list(h, node) {
  var props = {};
  var name = node.ordered ? 'ol' : 'ul';
  var items;
  var index = -1;
  var length;

  if (typeof node.start === 'number' && node.start !== 1) {
    props.start = node.start;
  }

  items = all_1$1(h, node);
  length = items.length;

  // Like GitHub, add a class for custom styling.
  while (++index < length) {
    if (
      items[index].properties.className &&
      items[index].properties.className.indexOf('task-list-item') !== -1
    ) {
      props.className = ['contains-task-list'];
      break
    }
  }

  return h(node, name, props, wrap_1(items, true))
}

var footer = generateFootnotes;





function generateFootnotes(h) {
  var footnoteById = h.footnoteById;
  var footnoteOrder = h.footnoteOrder;
  var length = footnoteOrder.length;
  var index = -1;
  var listItems = [];
  var def;
  var backReference;
  var content;
  var tail;

  while (++index < length) {
    def = footnoteById[footnoteOrder[index].toUpperCase()];

    if (!def) {
      continue
    }

    content = def.children.concat();
    tail = content[content.length - 1];
    backReference = {
      type: 'link',
      url: '#fnref-' + def.identifier,
      data: {hProperties: {className: ['footnote-backref']}},
      children: [{type: 'text', value: '↩'}]
    };

    if (!tail || tail.type !== 'paragraph') {
      tail = {type: 'paragraph', children: []};
      content.push(tail);
    }

    tail.children.push(backReference);

    listItems.push({
      type: 'listItem',
      data: {hProperties: {id: 'fn-' + def.identifier}},
      children: content,
      position: def.position
    });
  }

  if (listItems.length === 0) {
    return null
  }

  return h(
    null,
    'div',
    {className: ['footnotes']},
    wrap_1(
      [
        thematicBreak_1(h),
        list_1(h, {type: 'list', ordered: true, children: listItems})
      ],
      true
    )
  )
}

var blockquote_1 = blockquote;




function blockquote(h, node) {
  return h(node, 'blockquote', wrap_1(all_1$1(h, node), true))
}

var _break = hardBreak;



function hardBreak(h, node) {
  return [h(node, 'br'), unistBuilder('text', '\n')]
}

var code_1 = code;



function code(h, node) {
  var value = node.value ? node.value + '\n' : '';
  // To do: next major, use `node.lang` w/o regex, the splitting’s been going
  // on for years in remark now.
  var lang = node.lang && node.lang.match(/^[^ \t]+(?=[ \t]|$)/);
  var props = {};
  var code;

  if (lang) {
    props.className = ['language-' + lang];
  }

  code = h(node, 'code', props, [unistBuilder('text', value)]);

  if (node.meta) {
    code.data = {meta: node.meta};
  }

  return h(node.position, 'pre', [code])
}

var _delete = strikethrough;



function strikethrough(h, node) {
  return h(node, 'del', all_1$1(h, node))
}

var emphasis_1 = emphasis;



function emphasis(h, node) {
  return h(node, 'em', all_1$1(h, node))
}

var footnoteReference_1 = footnoteReference;



function footnoteReference(h, node) {
  var footnoteOrder = h.footnoteOrder;
  var identifier = String(node.identifier);

  if (footnoteOrder.indexOf(identifier) === -1) {
    footnoteOrder.push(identifier);
  }

  return h(node.position, 'sup', {id: 'fnref-' + identifier}, [
    h(node, 'a', {href: '#fn-' + identifier, className: ['footnote-ref']}, [
      unistBuilder('text', node.label || identifier)
    ])
  ])
}

var footnote_1 = footnote;



function footnote(h, node) {
  var footnoteById = h.footnoteById;
  var footnoteOrder = h.footnoteOrder;
  var identifier = 1;

  while (identifier in footnoteById) {
    identifier++;
  }

  identifier = String(identifier);

  // No need to check if `identifier` exists in `footnoteOrder`, it’s guaranteed
  // to not exist because we just generated it.
  footnoteOrder.push(identifier);

  footnoteById[identifier] = {
    type: 'footnoteDefinition',
    identifier: identifier,
    children: [{type: 'paragraph', children: node.children}],
    position: node.position
  };

  return footnoteReference_1(h, {
    type: 'footnoteReference',
    identifier: identifier,
    position: node.position
  })
}

var heading_1 = heading;



function heading(h, node) {
  return h(node, 'h' + node.depth, all_1$1(h, node))
}

var html_1$1 = html$3;



// Return either a `raw` node in dangerous mode, otherwise nothing.
function html$3(h, node) {
  return h.dangerous ? h.augment(node, unistBuilder('raw', node.value)) : null
}

var encodeCache = {};


// Create a lookup array where anything but characters in `chars` string
// and alphanumeric chars is percent-encoded.
//
function getEncodeCache(exclude) {
  var i, ch, cache = encodeCache[exclude];
  if (cache) { return cache; }

  cache = encodeCache[exclude] = [];

  for (i = 0; i < 128; i++) {
    ch = String.fromCharCode(i);

    if (/^[0-9a-z]$/i.test(ch)) {
      // always allow unencoded alphanumeric characters
      cache.push(ch);
    } else {
      cache.push('%' + ('0' + i.toString(16).toUpperCase()).slice(-2));
    }
  }

  for (i = 0; i < exclude.length; i++) {
    cache[exclude.charCodeAt(i)] = exclude[i];
  }

  return cache;
}


// Encode unsafe characters with percent-encoding, skipping already
// encoded sequences.
//
//  - string       - string to encode
//  - exclude      - list of characters to ignore (in addition to a-zA-Z0-9)
//  - keepEscaped  - don't encode '%' in a correct escape sequence (default: true)
//
function encode$2(string, exclude, keepEscaped) {
  var i, l, code, nextCode, cache,
      result = '';

  if (typeof exclude !== 'string') {
    // encode(string, keepEscaped)
    keepEscaped  = exclude;
    exclude = encode$2.defaultChars;
  }

  if (typeof keepEscaped === 'undefined') {
    keepEscaped = true;
  }

  cache = getEncodeCache(exclude);

  for (i = 0, l = string.length; i < l; i++) {
    code = string.charCodeAt(i);

    if (keepEscaped && code === 0x25 /* % */ && i + 2 < l) {
      if (/^[0-9a-f]{2}$/i.test(string.slice(i + 1, i + 3))) {
        result += string.slice(i, i + 3);
        i += 2;
        continue;
      }
    }

    if (code < 128) {
      result += cache[code];
      continue;
    }

    if (code >= 0xD800 && code <= 0xDFFF) {
      if (code >= 0xD800 && code <= 0xDBFF && i + 1 < l) {
        nextCode = string.charCodeAt(i + 1);
        if (nextCode >= 0xDC00 && nextCode <= 0xDFFF) {
          result += encodeURIComponent(string[i] + string[i + 1]);
          i++;
          continue;
        }
      }
      result += '%EF%BF%BD';
      continue;
    }

    result += encodeURIComponent(string[i]);
  }

  return result;
}

encode$2.defaultChars   = ";/?:@&=+$,-_.!~*'()#";
encode$2.componentChars = "-_.!~*'()";


var encode_1$1 = encode$2;

var revert_1 = revert;




// Return the content of a reference without definition as Markdown.
function revert(h, node) {
  var subtype = node.referenceType;
  var suffix = ']';
  var contents;
  var head;
  var tail;

  if (subtype === 'collapsed') {
    suffix += '[]';
  } else if (subtype === 'full') {
    suffix += '[' + (node.label || node.identifier) + ']';
  }

  if (node.type === 'imageReference') {
    return unistBuilder('text', '![' + node.alt + suffix)
  }

  contents = all_1$1(h, node);
  head = contents[0];

  if (head && head.type === 'text') {
    head.value = '[' + head.value;
  } else {
    contents.unshift(unistBuilder('text', '['));
  }

  tail = contents[contents.length - 1];

  if (tail && tail.type === 'text') {
    tail.value += suffix;
  } else {
    contents.push(unistBuilder('text', suffix));
  }

  return contents
}

var imageReference_1 = imageReference;




function imageReference(h, node) {
  var def = h.definition(node.identifier);
  var props;

  if (!def) {
    return revert_1(h, node)
  }

  props = {src: encode_1$1(def.url || ''), alt: node.alt};

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title;
  }

  return h(node, 'img', props)
}

var image_1 = image$1;

function image$1(h, node) {
  var props = {src: encode_1$1(node.url), alt: node.alt};

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title;
  }

  return h(node, 'img', props)
}

var inlineCode_1 = inlineCode;



function inlineCode(h, node) {
  var value = node.value.replace(/\r?\n|\r/g, ' ');
  return h(node, 'code', [unistBuilder('text', value)])
}

var linkReference_1 = linkReference;





function linkReference(h, node) {
  var def = h.definition(node.identifier);
  var props;

  if (!def) {
    return revert_1(h, node)
  }

  props = {href: encode_1$1(def.url || '')};

  if (def.title !== null && def.title !== undefined) {
    props.title = def.title;
  }

  return h(node, 'a', props, all_1$1(h, node))
}

var link_1 = link;

function link(h, node) {
  var props = {href: encode_1$1(node.url)};

  if (node.title !== null && node.title !== undefined) {
    props.title = node.title;
  }

  return h(node, 'a', props, all_1$1(h, node))
}

var listItem_1 = listItem;




function listItem(h, node, parent) {
  var result = all_1$1(h, node);
  var head = result[0];
  var loose = parent ? listLoose(parent) : listItemLoose(node);
  var props = {};
  var wrapped = [];
  var length;
  var index;
  var child;

  if (typeof node.checked === 'boolean') {
    if (!head || head.tagName !== 'p') {
      head = h(null, 'p', []);
      result.unshift(head);
    }

    if (head.children.length > 0) {
      head.children.unshift(unistBuilder('text', ' '));
    }

    head.children.unshift(
      h(null, 'input', {
        type: 'checkbox',
        checked: node.checked,
        disabled: true
      })
    );

    // According to github-markdown-css, this class hides bullet.
    // See: <https://github.com/sindresorhus/github-markdown-css>.
    props.className = ['task-list-item'];
  }

  length = result.length;
  index = -1;

  while (++index < length) {
    child = result[index];

    // Add eols before nodes, except if this is a loose, first paragraph.
    if (loose || index !== 0 || child.tagName !== 'p') {
      wrapped.push(unistBuilder('text', '\n'));
    }

    if (child.tagName === 'p' && !loose) {
      wrapped = wrapped.concat(child.children);
    } else {
      wrapped.push(child);
    }
  }

  // Add a final eol.
  if (length && (loose || child.tagName !== 'p')) {
    wrapped.push(unistBuilder('text', '\n'));
  }

  return h(node, 'li', props, wrapped)
}

function listLoose(node) {
  var loose = node.spread;
  var children = node.children;
  var length = children.length;
  var index = -1;

  while (!loose && ++index < length) {
    loose = listItemLoose(children[index]);
  }

  return loose
}

function listItemLoose(node) {
  var spread = node.spread;

  return spread === undefined || spread === null
    ? node.children.length > 1
    : spread
}

var paragraph_1 = paragraph;



function paragraph(h, node) {
  return h(node, 'p', all_1$1(h, node))
}

var root_1 = root;





function root(h, node) {
  return h.augment(node, unistBuilder('root', wrap_1(all_1$1(h, node))))
}

var strong_1 = strong;



function strong(h, node) {
  return h(node, 'strong', all_1$1(h, node))
}

var table_1 = table;





function table(h, node) {
  var rows = node.children;
  var index = rows.length;
  var align = node.align || [];
  var alignLength = align.length;
  var result = [];
  var pos;
  var row;
  var out;
  var name;
  var cell;

  while (index--) {
    row = rows[index].children;
    name = index === 0 ? 'th' : 'td';
    pos = alignLength || row.length;
    out = [];

    while (pos--) {
      cell = row[pos];
      out[pos] = h(cell, name, {align: align[pos]}, cell ? all_1$1(h, cell) : []);
    }

    result[index] = h(rows[index], 'tr', wrap_1(out, true));
  }

  return h(
    node,
    'table',
    wrap_1(
      [h(result[0].position, 'thead', wrap_1([result[0]], true))].concat(
        result[1]
          ? h(
              {
                start: unistUtilPosition.start(result[1]),
                end: unistUtilPosition.end(result[result.length - 1])
              },
              'tbody',
              wrap_1(result.slice(1), true)
            )
          : []
      ),
      true
    )
  )
}

var text_1 = text$1;



function text$1(h, node) {
  return h.augment(
    node,
    unistBuilder('text', String(node.value).replace(/[ \t]*(\r?\n|\r)[ \t]*/g, '$1'))
  )
}

var handlers$1 = {
  blockquote: blockquote_1,
  break: _break,
  code: code_1,
  delete: _delete,
  emphasis: emphasis_1,
  footnoteReference: footnoteReference_1,
  footnote: footnote_1,
  heading: heading_1,
  html: html_1$1,
  imageReference: imageReference_1,
  image: image_1,
  inlineCode: inlineCode_1,
  linkReference: linkReference_1,
  link: link_1,
  listItem: listItem_1,
  list: list_1,
  paragraph: paragraph_1,
  root: root_1,
  strong: strong_1,
  table: table_1,
  text: text_1,
  thematicBreak: thematicBreak_1,
  toml: ignore,
  yaml: ignore,
  definition: ignore,
  footnoteDefinition: ignore
};

// Return nothing for nodes that are ignored.
function ignore() {
  return null
}

var lib$2 = toHast;










var own$2 = {}.hasOwnProperty;

var deprecationWarningIssued$1 = false;

// Factory to transform.
function factory(tree, options) {
  var settings = options || {};

  // Issue a warning if the deprecated tag 'allowDangerousHTML' is used
  if (settings.allowDangerousHTML !== undefined && !deprecationWarningIssued$1) {
    deprecationWarningIssued$1 = true;
    console.warn(
      'mdast-util-to-hast: deprecation: `allowDangerousHTML` is nonstandard, use `allowDangerousHtml` instead'
    );
  }

  var dangerous = settings.allowDangerousHtml || settings.allowDangerousHTML;
  var footnoteById = {};

  h.dangerous = dangerous;
  h.definition = mdastUtilDefinitions(tree);
  h.footnoteById = footnoteById;
  h.footnoteOrder = [];
  h.augment = augment;
  h.handlers = Object.assign({}, handlers$1, settings.handlers);
  h.unknownHandler = settings.unknownHandler;
  h.passThrough = settings.passThrough;

  unistUtilVisit(tree, 'footnoteDefinition', onfootnotedefinition);

  return h

  // Finalise the created `right`, a hast node, from `left`, an mdast node.
  function augment(left, right) {
    var data;
    var ctx;

    // Handle `data.hName`, `data.hProperties, `data.hChildren`.
    if (left && left.data) {
      data = left.data;

      if (data.hName) {
        if (right.type !== 'element') {
          right = {
            type: 'element',
            tagName: '',
            properties: {},
            children: []
          };
        }

        right.tagName = data.hName;
      }

      if (right.type === 'element' && data.hProperties) {
        right.properties = Object.assign({}, right.properties, data.hProperties);
      }

      if (right.children && data.hChildren) {
        right.children = data.hChildren;
      }
    }

    ctx = left && left.position ? left : {position: left};

    if (!unistUtilGenerated(ctx)) {
      right.position = {
        start: unistUtilPosition.start(ctx),
        end: unistUtilPosition.end(ctx)
      };
    }

    return right
  }

  // Create an element for `node`.
  function h(node, tagName, props, children) {
    if (
      (children === undefined || children === null) &&
      typeof props === 'object' &&
      'length' in props
    ) {
      children = props;
      props = {};
    }

    return augment(node, {
      type: 'element',
      tagName: tagName,
      properties: props || {},
      children: children || []
    })
  }

  function onfootnotedefinition(definition) {
    var id = String(definition.identifier).toUpperCase();

    // Mimick CM behavior of link definitions.
    // See: <https://github.com/syntax-tree/mdast-util-definitions/blob/8290999/index.js#L26>.
    if (!own$2.call(footnoteById, id)) {
      footnoteById[id] = definition;
    }
  }
}

// Transform `tree`, which is an mdast node, to a hast node.
function toHast(tree, options) {
  var h = factory(tree, options);
  var node = one_1(h, tree);
  var foot = footer(h);

  if (foot) {
    node.children = node.children.concat(unistBuilder('text', '\n'), foot);
  }

  return node
}

var mdastUtilToHast = lib$2;

var remarkRehype = remark2rehype;

// Attacher.
// If a destination is given, runs the destination with the new hast tree
// (bridge mode).
// Without destination, returns the tree: further plugins run on that tree
// (mutate mode).
function remark2rehype(destination, options) {
  if (destination && !destination.process) {
    options = destination;
    destination = null;
  }

  return destination ? bridge(destination, options) : mutate(options)
}

// Bridge mode.
// Runs the destination with the new hast tree.
function bridge(destination, options) {
  return transformer

  function transformer(node, file, next) {
    destination.run(mdastUtilToHast(node, options), file, done);

    function done(err) {
      next(err);
    }
  }
}

// Mutate-mode.
// Further transformers run on the hast tree.
function mutate(options) {
  return transformer

  function transformer(node) {
    return mdastUtilToHast(node, options)
  }
}

var immutable = extend$1;

var hasOwnProperty$1 = Object.prototype.hasOwnProperty;

function extend$1() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty$1.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target
}

var schema$1 = Schema$2;

var proto$1 = Schema$2.prototype;

proto$1.space = null;
proto$1.normal = {};
proto$1.property = {};

function Schema$2(property, normal, space) {
  this.property = property;
  this.normal = normal;

  if (space) {
    this.space = space;
  }
}

var merge_1 = merge$1;

function merge$1(definitions) {
  var length = definitions.length;
  var property = [];
  var normal = [];
  var index = -1;
  var info;
  var space;

  while (++index < length) {
    info = definitions[index];
    property.push(info.property);
    normal.push(info.normal);
    space = info.space;
  }

  return new schema$1(
    immutable.apply(null, property),
    immutable.apply(null, normal),
    space
  )
}

var normalize_1 = normalize;

function normalize(value) {
  return value.toLowerCase()
}

var info = Info;

var proto = Info.prototype;

proto.space = null;
proto.attribute = null;
proto.property = null;
proto.boolean = false;
proto.booleanish = false;
proto.overloadedBoolean = false;
proto.number = false;
proto.commaSeparated = false;
proto.spaceSeparated = false;
proto.commaOrSpaceSeparated = false;
proto.mustUseProperty = false;
proto.defined = false;

function Info(property, attribute) {
  this.property = property;
  this.attribute = attribute;
}

var powers = 0;

var boolean$2 = increment();
var booleanish$2 = increment();
var overloadedBoolean$1 = increment();
var number$3 = increment();
var spaceSeparated$3 = increment();
var commaSeparated$2 = increment();
var commaOrSpaceSeparated$1 = increment();

function increment() {
  return Math.pow(2, ++powers)
}

var types$1 = {
	boolean: boolean$2,
	booleanish: booleanish$2,
	overloadedBoolean: overloadedBoolean$1,
	number: number$3,
	spaceSeparated: spaceSeparated$3,
	commaSeparated: commaSeparated$2,
	commaOrSpaceSeparated: commaOrSpaceSeparated$1
};

var definedInfo = DefinedInfo;

DefinedInfo.prototype = new info();
DefinedInfo.prototype.defined = true;

var checks = [
  'boolean',
  'booleanish',
  'overloadedBoolean',
  'number',
  'commaSeparated',
  'spaceSeparated',
  'commaOrSpaceSeparated'
];
var checksLength = checks.length;

function DefinedInfo(property, attribute, mask, space) {
  var index = -1;
  var check;

  mark(this, 'space', space);

  info.call(this, property, attribute);

  while (++index < checksLength) {
    check = checks[index];
    mark(this, check, (mask & types$1[check]) === types$1[check]);
  }
}

function mark(values, key, value) {
  if (value) {
    values[key] = value;
  }
}

var create_1 = create;

function create(definition) {
  var space = definition.space;
  var mustUseProperty = definition.mustUseProperty || [];
  var attributes = definition.attributes || {};
  var props = definition.properties;
  var transform = definition.transform;
  var property = {};
  var normal = {};
  var prop;
  var info;

  for (prop in props) {
    info = new definedInfo(
      prop,
      transform(attributes, prop),
      props[prop],
      space
    );

    if (mustUseProperty.indexOf(prop) !== -1) {
      info.mustUseProperty = true;
    }

    property[prop] = info;

    normal[normalize_1(prop)] = prop;
    normal[normalize_1(info.attribute)] = prop;
  }

  return new schema$1(property, normal, space)
}

var xlink = create_1({
  space: 'xlink',
  transform: xlinkTransform,
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
});

function xlinkTransform(_, prop) {
  return 'xlink:' + prop.slice(5).toLowerCase()
}

var xml = create_1({
  space: 'xml',
  transform: xmlTransform,
  properties: {
    xmlLang: null,
    xmlBase: null,
    xmlSpace: null
  }
});

function xmlTransform(_, prop) {
  return 'xml:' + prop.slice(3).toLowerCase()
}

var caseSensitiveTransform_1 = caseSensitiveTransform;

function caseSensitiveTransform(attributes, attribute) {
  return attribute in attributes ? attributes[attribute] : attribute
}

var caseInsensitiveTransform_1 = caseInsensitiveTransform;

function caseInsensitiveTransform(attributes, property) {
  return caseSensitiveTransform_1(attributes, property.toLowerCase())
}

var xmlns = create_1({
  space: 'xmlns',
  attributes: {
    xmlnsxlink: 'xmlns:xlink'
  },
  transform: caseInsensitiveTransform_1,
  properties: {
    xmlns: null,
    xmlnsXLink: null
  }
});

var booleanish$1 = types$1.booleanish;
var number$2 = types$1.number;
var spaceSeparated$2 = types$1.spaceSeparated;

var aria = create_1({
  transform: ariaTransform,
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: booleanish$1,
    ariaAutoComplete: null,
    ariaBusy: booleanish$1,
    ariaChecked: booleanish$1,
    ariaColCount: number$2,
    ariaColIndex: number$2,
    ariaColSpan: number$2,
    ariaControls: spaceSeparated$2,
    ariaCurrent: null,
    ariaDescribedBy: spaceSeparated$2,
    ariaDetails: null,
    ariaDisabled: booleanish$1,
    ariaDropEffect: spaceSeparated$2,
    ariaErrorMessage: null,
    ariaExpanded: booleanish$1,
    ariaFlowTo: spaceSeparated$2,
    ariaGrabbed: booleanish$1,
    ariaHasPopup: null,
    ariaHidden: booleanish$1,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: spaceSeparated$2,
    ariaLevel: number$2,
    ariaLive: null,
    ariaModal: booleanish$1,
    ariaMultiLine: booleanish$1,
    ariaMultiSelectable: booleanish$1,
    ariaOrientation: null,
    ariaOwns: spaceSeparated$2,
    ariaPlaceholder: null,
    ariaPosInSet: number$2,
    ariaPressed: booleanish$1,
    ariaReadOnly: booleanish$1,
    ariaRelevant: null,
    ariaRequired: booleanish$1,
    ariaRoleDescription: spaceSeparated$2,
    ariaRowCount: number$2,
    ariaRowIndex: number$2,
    ariaRowSpan: number$2,
    ariaSelected: booleanish$1,
    ariaSetSize: number$2,
    ariaSort: null,
    ariaValueMax: number$2,
    ariaValueMin: number$2,
    ariaValueNow: number$2,
    ariaValueText: null,
    role: null
  }
});

function ariaTransform(_, prop) {
  return prop === 'role' ? prop : 'aria-' + prop.slice(4).toLowerCase()
}

var boolean$1 = types$1.boolean;
var overloadedBoolean = types$1.overloadedBoolean;
var booleanish = types$1.booleanish;
var number$1 = types$1.number;
var spaceSeparated$1 = types$1.spaceSeparated;
var commaSeparated$1 = types$1.commaSeparated;

var html$2 = create_1({
  space: 'html',
  attributes: {
    acceptcharset: 'accept-charset',
    classname: 'class',
    htmlfor: 'for',
    httpequiv: 'http-equiv'
  },
  transform: caseInsensitiveTransform_1,
  mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
  properties: {
    // Standard Properties.
    abbr: null,
    accept: commaSeparated$1,
    acceptCharset: spaceSeparated$1,
    accessKey: spaceSeparated$1,
    action: null,
    allow: null,
    allowFullScreen: boolean$1,
    allowPaymentRequest: boolean$1,
    allowUserMedia: boolean$1,
    alt: null,
    as: null,
    async: boolean$1,
    autoCapitalize: null,
    autoComplete: spaceSeparated$1,
    autoFocus: boolean$1,
    autoPlay: boolean$1,
    capture: boolean$1,
    charSet: null,
    checked: boolean$1,
    cite: null,
    className: spaceSeparated$1,
    cols: number$1,
    colSpan: null,
    content: null,
    contentEditable: booleanish,
    controls: boolean$1,
    controlsList: spaceSeparated$1,
    coords: number$1 | commaSeparated$1,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: boolean$1,
    defer: boolean$1,
    dir: null,
    dirName: null,
    disabled: boolean$1,
    download: overloadedBoolean,
    draggable: booleanish,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: boolean$1,
    formTarget: null,
    headers: spaceSeparated$1,
    height: number$1,
    hidden: boolean$1,
    high: number$1,
    href: null,
    hrefLang: null,
    htmlFor: spaceSeparated$1,
    httpEquiv: spaceSeparated$1,
    id: null,
    imageSizes: null,
    imageSrcSet: commaSeparated$1,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: boolean$1,
    itemId: null,
    itemProp: spaceSeparated$1,
    itemRef: spaceSeparated$1,
    itemScope: boolean$1,
    itemType: spaceSeparated$1,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: boolean$1,
    low: number$1,
    manifest: null,
    max: null,
    maxLength: number$1,
    media: null,
    method: null,
    min: null,
    minLength: number$1,
    multiple: boolean$1,
    muted: boolean$1,
    name: null,
    nonce: null,
    noModule: boolean$1,
    noValidate: boolean$1,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextMenu: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: boolean$1,
    optimum: number$1,
    pattern: null,
    ping: spaceSeparated$1,
    placeholder: null,
    playsInline: boolean$1,
    poster: null,
    preload: null,
    readOnly: boolean$1,
    referrerPolicy: null,
    rel: spaceSeparated$1,
    required: boolean$1,
    reversed: boolean$1,
    rows: number$1,
    rowSpan: number$1,
    sandbox: spaceSeparated$1,
    scope: null,
    scoped: boolean$1,
    seamless: boolean$1,
    selected: boolean$1,
    shape: null,
    size: number$1,
    sizes: null,
    slot: null,
    span: number$1,
    spellCheck: booleanish,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: commaSeparated$1,
    start: number$1,
    step: null,
    style: null,
    tabIndex: number$1,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: boolean$1,
    useMap: null,
    value: booleanish,
    width: number$1,
    wrap: null,

    // Legacy.
    // See: https://html.spec.whatwg.org/#other-elements,-attributes-and-apis
    align: null, // Several. Use CSS `text-align` instead,
    aLink: null, // `<body>`. Use CSS `a:active {color}` instead
    archive: spaceSeparated$1, // `<object>`. List of URIs to archives
    axis: null, // `<td>` and `<th>`. Use `scope` on `<th>`
    background: null, // `<body>`. Use CSS `background-image` instead
    bgColor: null, // `<body>` and table elements. Use CSS `background-color` instead
    border: number$1, // `<table>`. Use CSS `border-width` instead,
    borderColor: null, // `<table>`. Use CSS `border-color` instead,
    bottomMargin: number$1, // `<body>`
    cellPadding: null, // `<table>`
    cellSpacing: null, // `<table>`
    char: null, // Several table elements. When `align=char`, sets the character to align on
    charOff: null, // Several table elements. When `char`, offsets the alignment
    classId: null, // `<object>`
    clear: null, // `<br>`. Use CSS `clear` instead
    code: null, // `<object>`
    codeBase: null, // `<object>`
    codeType: null, // `<object>`
    color: null, // `<font>` and `<hr>`. Use CSS instead
    compact: boolean$1, // Lists. Use CSS to reduce space between items instead
    declare: boolean$1, // `<object>`
    event: null, // `<script>`
    face: null, // `<font>`. Use CSS instead
    frame: null, // `<table>`
    frameBorder: null, // `<iframe>`. Use CSS `border` instead
    hSpace: number$1, // `<img>` and `<object>`
    leftMargin: number$1, // `<body>`
    link: null, // `<body>`. Use CSS `a:link {color: *}` instead
    longDesc: null, // `<frame>`, `<iframe>`, and `<img>`. Use an `<a>`
    lowSrc: null, // `<img>`. Use a `<picture>`
    marginHeight: number$1, // `<body>`
    marginWidth: number$1, // `<body>`
    noResize: boolean$1, // `<frame>`
    noHref: boolean$1, // `<area>`. Use no href instead of an explicit `nohref`
    noShade: boolean$1, // `<hr>`. Use background-color and height instead of borders
    noWrap: boolean$1, // `<td>` and `<th>`
    object: null, // `<applet>`
    profile: null, // `<head>`
    prompt: null, // `<isindex>`
    rev: null, // `<link>`
    rightMargin: number$1, // `<body>`
    rules: null, // `<table>`
    scheme: null, // `<meta>`
    scrolling: booleanish, // `<frame>`. Use overflow in the child context
    standby: null, // `<object>`
    summary: null, // `<table>`
    text: null, // `<body>`. Use CSS `color` instead
    topMargin: number$1, // `<body>`
    valueType: null, // `<param>`
    version: null, // `<html>`. Use a doctype.
    vAlign: null, // Several. Use CSS `vertical-align` instead
    vLink: null, // `<body>`. Use CSS `a:visited {color}` instead
    vSpace: number$1, // `<img>` and `<object>`

    // Non-standard Properties.
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: boolean$1,
    disableRemotePlayback: boolean$1,
    prefix: null,
    property: null,
    results: number$1,
    security: null,
    unselectable: null
  }
});

var html_1 = merge_1([xml, xlink, xmlns, aria, html$2]);

var boolean = types$1.boolean;
var number = types$1.number;
var spaceSeparated = types$1.spaceSeparated;
var commaSeparated = types$1.commaSeparated;
var commaOrSpaceSeparated = types$1.commaOrSpaceSeparated;

var svg = create_1({
  space: 'svg',
  attributes: {
    accentHeight: 'accent-height',
    alignmentBaseline: 'alignment-baseline',
    arabicForm: 'arabic-form',
    baselineShift: 'baseline-shift',
    capHeight: 'cap-height',
    className: 'class',
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    crossOrigin: 'crossorigin',
    dataType: 'datatype',
    dominantBaseline: 'dominant-baseline',
    enableBackground: 'enable-background',
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    hrefLang: 'hreflang',
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    horizOriginY: 'horiz-origin-y',
    imageRendering: 'image-rendering',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    navDown: 'nav-down',
    navDownLeft: 'nav-down-left',
    navDownRight: 'nav-down-right',
    navLeft: 'nav-left',
    navNext: 'nav-next',
    navPrev: 'nav-prev',
    navRight: 'nav-right',
    navUp: 'nav-up',
    navUpLeft: 'nav-up-left',
    navUpRight: 'nav-up-right',
    onAbort: 'onabort',
    onActivate: 'onactivate',
    onAfterPrint: 'onafterprint',
    onBeforePrint: 'onbeforeprint',
    onBegin: 'onbegin',
    onCancel: 'oncancel',
    onCanPlay: 'oncanplay',
    onCanPlayThrough: 'oncanplaythrough',
    onChange: 'onchange',
    onClick: 'onclick',
    onClose: 'onclose',
    onCopy: 'oncopy',
    onCueChange: 'oncuechange',
    onCut: 'oncut',
    onDblClick: 'ondblclick',
    onDrag: 'ondrag',
    onDragEnd: 'ondragend',
    onDragEnter: 'ondragenter',
    onDragExit: 'ondragexit',
    onDragLeave: 'ondragleave',
    onDragOver: 'ondragover',
    onDragStart: 'ondragstart',
    onDrop: 'ondrop',
    onDurationChange: 'ondurationchange',
    onEmptied: 'onemptied',
    onEnd: 'onend',
    onEnded: 'onended',
    onError: 'onerror',
    onFocus: 'onfocus',
    onFocusIn: 'onfocusin',
    onFocusOut: 'onfocusout',
    onHashChange: 'onhashchange',
    onInput: 'oninput',
    onInvalid: 'oninvalid',
    onKeyDown: 'onkeydown',
    onKeyPress: 'onkeypress',
    onKeyUp: 'onkeyup',
    onLoad: 'onload',
    onLoadedData: 'onloadeddata',
    onLoadedMetadata: 'onloadedmetadata',
    onLoadStart: 'onloadstart',
    onMessage: 'onmessage',
    onMouseDown: 'onmousedown',
    onMouseEnter: 'onmouseenter',
    onMouseLeave: 'onmouseleave',
    onMouseMove: 'onmousemove',
    onMouseOut: 'onmouseout',
    onMouseOver: 'onmouseover',
    onMouseUp: 'onmouseup',
    onMouseWheel: 'onmousewheel',
    onOffline: 'onoffline',
    onOnline: 'ononline',
    onPageHide: 'onpagehide',
    onPageShow: 'onpageshow',
    onPaste: 'onpaste',
    onPause: 'onpause',
    onPlay: 'onplay',
    onPlaying: 'onplaying',
    onPopState: 'onpopstate',
    onProgress: 'onprogress',
    onRateChange: 'onratechange',
    onRepeat: 'onrepeat',
    onReset: 'onreset',
    onResize: 'onresize',
    onScroll: 'onscroll',
    onSeeked: 'onseeked',
    onSeeking: 'onseeking',
    onSelect: 'onselect',
    onShow: 'onshow',
    onStalled: 'onstalled',
    onStorage: 'onstorage',
    onSubmit: 'onsubmit',
    onSuspend: 'onsuspend',
    onTimeUpdate: 'ontimeupdate',
    onToggle: 'ontoggle',
    onUnload: 'onunload',
    onVolumeChange: 'onvolumechange',
    onWaiting: 'onwaiting',
    onZoom: 'onzoom',
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pointerEvents: 'pointer-events',
    referrerPolicy: 'referrerpolicy',
    renderingIntent: 'rendering-intent',
    shapeRendering: 'shape-rendering',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    strokeDashArray: 'stroke-dasharray',
    strokeDashOffset: 'stroke-dashoffset',
    strokeLineCap: 'stroke-linecap',
    strokeLineJoin: 'stroke-linejoin',
    strokeMiterLimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    tabIndex: 'tabindex',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    typeOf: 'typeof',
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    vectorEffect: 'vector-effect',
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    xHeight: 'x-height',
    // These were camelcased in Tiny. Now lowercased in SVG 2
    playbackOrder: 'playbackorder',
    timelineBegin: 'timelinebegin'
  },
  transform: caseSensitiveTransform_1,
  properties: {
    about: commaOrSpaceSeparated,
    accentHeight: number,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: number,
    amplitude: number,
    arabicForm: null,
    ascent: number,
    attributeName: null,
    attributeType: null,
    azimuth: number,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: number,
    by: null,
    calcMode: null,
    capHeight: number,
    className: spaceSeparated,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: number,
    diffuseConstant: number,
    direction: null,
    display: null,
    dur: null,
    divisor: number,
    dominantBaseline: null,
    download: boolean,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: number,
    enableBackground: null,
    end: null,
    event: null,
    exponent: number,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: number,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: commaSeparated,
    g2: commaSeparated,
    glyphName: commaSeparated,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: number,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: number,
    horizOriginX: number,
    horizOriginY: number,
    id: null,
    ideographic: number,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: number,
    k: number,
    k1: number,
    k2: number,
    k3: number,
    k4: number,
    kernelMatrix: commaOrSpaceSeparated,
    kernelUnitLength: null,
    keyPoints: null, // SEMI_COLON_SEPARATED
    keySplines: null, // SEMI_COLON_SEPARATED
    keyTimes: null, // SEMI_COLON_SEPARATED
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: number,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: number,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: number,
    overlineThickness: number,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: number,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: spaceSeparated,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: number,
    pointsAtY: number,
    pointsAtZ: number,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: commaOrSpaceSeparated,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: commaOrSpaceSeparated,
    rev: commaOrSpaceSeparated,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: commaOrSpaceSeparated,
    requiredFeatures: commaOrSpaceSeparated,
    requiredFonts: commaOrSpaceSeparated,
    requiredFormats: commaOrSpaceSeparated,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: number,
    specularExponent: number,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: number,
    strikethroughThickness: number,
    string: null,
    stroke: null,
    strokeDashArray: commaOrSpaceSeparated,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: number,
    strokeOpacity: number,
    strokeWidth: null,
    style: null,
    surfaceScale: number,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: commaOrSpaceSeparated,
    tabIndex: number,
    tableValues: null,
    target: null,
    targetX: number,
    targetY: number,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: commaOrSpaceSeparated,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: number,
    underlineThickness: number,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: number,
    values: null,
    vAlphabetic: number,
    vMathematical: number,
    vectorEffect: null,
    vHanging: number,
    vIdeographic: number,
    version: null,
    vertAdvY: number,
    vertOriginX: number,
    vertOriginY: number,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: number,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
});

var svg_1 = merge_1([xml, xlink, xmlns, aria, svg]);

var voids = [
	"area",
	"base",
	"basefont",
	"bgsound",
	"br",
	"col",
	"command",
	"embed",
	"frame",
	"hr",
	"image",
	"img",
	"input",
	"isindex",
	"keygen",
	"link",
	"menuitem",
	"meta",
	"nextid",
	"param",
	"source",
	"track",
	"wbr"
];

var convert_1 = convert;

function convert(test) {
  if (typeof test === 'string') {
    return tagNameFactory(test)
  }

  if (test === null || test === undefined) {
    return element$1
  }

  if (typeof test === 'object') {
    return any(test)
  }

  if (typeof test === 'function') {
    return callFactory(test)
  }

  throw new Error('Expected function, string, or array as test')
}

function convertAll(tests) {
  var length = tests.length;
  var index = -1;
  var results = [];

  while (++index < length) {
    results[index] = convert(tests[index]);
  }

  return results
}

function any(tests) {
  var checks = convertAll(tests);
  var length = checks.length;

  return matches

  function matches() {
    var index = -1;

    while (++index < length) {
      if (checks[index].apply(this, arguments)) {
        return true
      }
    }

    return false
  }
}

// Utility to convert a string a tag name check.
function tagNameFactory(test) {
  return tagName

  function tagName(node) {
    return element$1(node) && node.tagName === test
  }
}

// Utility to convert a function check.
function callFactory(test) {
  return call

  function call(node) {
    return element$1(node) && Boolean(test.apply(this, arguments))
  }
}

// Utility to return true if this is an element.
function element$1(node) {
  return (
    node &&
    typeof node === 'object' &&
    node.type === 'element' &&
    typeof node.tagName === 'string'
  )
}

var hastUtilIsElement = isElement;

isElement.convert = convert_1;

// Check if if `node` is an `element` and whether it passes the given test.
function isElement(node, test, index, parent, context) {
  var hasParent = parent !== null && parent !== undefined;
  var hasIndex = index !== null && index !== undefined;
  var check = convert_1(test);

  if (
    hasIndex &&
    (typeof index !== 'number' || index < 0 || index === Infinity)
  ) {
    throw new Error('Expected positive finite index for child node')
  }

  if (hasParent && (!parent.type || !parent.children)) {
    throw new Error('Expected parent node')
  }

  if (!node || !node.type || typeof node.type !== 'string') {
    return false
  }

  if (hasParent !== hasIndex) {
    throw new Error('Expected both parent and index')
  }

  return check.call(context, node, index, parent)
}

var hastUtilWhitespace = interElementWhiteSpace;

// HTML white-space expression.
// See <https://html.spec.whatwg.org/#space-character>.
var re = /[ \t\n\f\r]/g;

function interElementWhiteSpace(node) {
  var value;

  if (node && typeof node === 'object' && node.type === 'text') {
    value = node.value || '';
  } else if (typeof node === 'string') {
    value = node;
  } else {
    return false
  }

  return value.replace(re, '') === ''
}

var before = siblings(-1);
var after = siblings(1);

// Factory to check siblings in a direction.
function siblings(increment) {
  return sibling

  // Find applicable siblings in a direction.
  function sibling(parent, index, includeWhiteSpace) {
    var siblings = parent && parent.children;
    var offset = index + increment;
    var next = siblings && siblings[offset];

    if (!includeWhiteSpace) {
      while (next && hastUtilWhitespace(next)) {
        offset += increment;
        next = siblings[offset];
      }
    }

    return next
  }
}

var siblings_1 = {
	before: before,
	after: after
};

var whiteSpaceStart_1 = whiteSpaceStart;

var isText = convert_1$1('text');

// Check if `node` starts with white-space.
function whiteSpaceStart(node) {
  return isText(node) && hastUtilWhitespace(node.value.charAt(0))
}

var comment$1 = convert_1$1('comment');

var omission_1 = omission$1;

var own$1 = {}.hasOwnProperty;

// Factory to check if a given node can have a tag omitted.
function omission$1(handlers) {
  return omit

  // Check if a given node can have a tag omitted.
  function omit(node, index, parent) {
    return (
      own$1.call(handlers, node.tagName) &&
      handlers[node.tagName](node, index, parent)
    )
  }
}

var closing$1 = omission_1({
  html: html$1,
  head: headOrColgroupOrCaption,
  body: body$1,
  p: p,
  li: li,
  dt: dt,
  dd: dd,
  rt: rubyElement,
  rp: rubyElement,
  optgroup: optgroup,
  option: option,
  menuitem: menuitem,
  colgroup: headOrColgroupOrCaption,
  caption: headOrColgroupOrCaption,
  thead: thead,
  tbody: tbody$1,
  tfoot: tfoot,
  tr: tr,
  td: cells,
  th: cells
});

// Macro for `</head>`, `</colgroup>`, and `</caption>`.
function headOrColgroupOrCaption(node, index, parent) {
  var next = siblings_1.after(parent, index, true);
  return !next || (!comment$1(next) && !whiteSpaceStart_1(next))
}

// Whether to omit `</html>`.
function html$1(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || !comment$1(next)
}

// Whether to omit `</body>`.
function body$1(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || !comment$1(next)
}

// Whether to omit `</p>`.
function p(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return next
    ? hastUtilIsElement(next, [
        'address',
        'article',
        'aside',
        'blockquote',
        'details',
        'div',
        'dl',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'header',
        'hgroup',
        'hr',
        'main',
        'menu',
        'nav',
        'ol',
        'p',
        'pre',
        'section',
        'table',
        'ul'
      ])
    : !parent ||
        // Confusing parent.
        !hastUtilIsElement(parent, [
          'a',
          'audio',
          'del',
          'ins',
          'map',
          'noscript',
          'video'
        ])
}

// Whether to omit `</li>`.
function li(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || hastUtilIsElement(next, 'li')
}

// Whether to omit `</dt>`.
function dt(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return next && hastUtilIsElement(next, ['dt', 'dd'])
}

// Whether to omit `</dd>`.
function dd(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || hastUtilIsElement(next, ['dt', 'dd'])
}

// Whether to omit `</rt>` or `</rp>`.
function rubyElement(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || hastUtilIsElement(next, ['rp', 'rt'])
}

// Whether to omit `</optgroup>`.
function optgroup(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || hastUtilIsElement(next, 'optgroup')
}

// Whether to omit `</option>`.
function option(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || hastUtilIsElement(next, ['option', 'optgroup'])
}

// Whether to omit `</menuitem>`.
function menuitem(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || hastUtilIsElement(next, ['menuitem', 'hr', 'menu'])
}

// Whether to omit `</thead>`.
function thead(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return next && hastUtilIsElement(next, ['tbody', 'tfoot'])
}

// Whether to omit `</tbody>`.
function tbody$1(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || hastUtilIsElement(next, ['tbody', 'tfoot'])
}

// Whether to omit `</tfoot>`.
function tfoot(node, index, parent) {
  return !siblings_1.after(parent, index)
}

// Whether to omit `</tr>`.
function tr(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || hastUtilIsElement(next, 'tr')
}

// Whether to omit `</td>` or `</th>`.
function cells(node, index, parent) {
  var next = siblings_1.after(parent, index);
  return !next || hastUtilIsElement(next, ['td', 'th'])
}

var opening$1 = omission_1({
  html: html,
  head: head,
  body: body,
  colgroup: colgroup,
  tbody: tbody
});

// Whether to omit `<html>`.
function html(node) {
  var head = siblings_1.after(node, -1);
  return !head || !comment$1(head)
}

// Whether to omit `<head>`.
function head(node) {
  var children = node.children;
  var seen = [];
  var index = -1;

  while (++index < children.length) {
    if (hastUtilIsElement(children[index], ['title', 'base'])) {
      if (seen.indexOf(children[index].tagName) > -1) return false
      seen.push(children[index].tagName);
    }
  }

  return children.length
}

// Whether to omit `<body>`.
function body(node) {
  var head = siblings_1.after(node, -1, true);

  return (
    !head ||
    (!comment$1(head) &&
      !whiteSpaceStart_1(head) &&
      !hastUtilIsElement(head, ['meta', 'link', 'script', 'style', 'template']))
  )
}

// Whether to omit `<colgroup>`.
// The spec describes some logic for the opening tag, but it’s easier to
// implement in the closing tag, to the same effect, so we handle it there
// instead.
function colgroup(node, index, parent) {
  var previous = siblings_1.before(parent, index);
  var head = siblings_1.after(node, -1, true);

  // Previous colgroup was already omitted.
  if (
    hastUtilIsElement(previous, 'colgroup') &&
    closing$1(previous, parent.children.indexOf(previous), parent)
  ) {
    return false
  }

  return head && hastUtilIsElement(head, 'col')
}

// Whether to omit `<tbody>`.
function tbody(node, index, parent) {
  var previous = siblings_1.before(parent, index);
  var head = siblings_1.after(node, -1);

  // Previous table section was already omitted.
  if (
    hastUtilIsElement(previous, ['thead', 'tbody']) &&
    closing$1(previous, parent.children.indexOf(previous), parent)
  ) {
    return false
  }

  return head && hastUtilIsElement(head, 'tr')
}

var opening = opening$1;
var closing = closing$1;

var omission = {
	opening: opening,
	closing: closing
};

var core$1 = encode$1;

// Encode special characters in `value`.
function encode$1(value, options) {
  value = value.replace(
    options.subset ? charactersToExpression(options.subset) : /["&'<>`]/g,
    basic
  );

  if (options.subset || options.escapeOnly) {
    return value
  }

  return (
    value
      // Surrogate pairs.
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, surrogate)
      // BMP control characters (C0 except for LF, CR, SP; DEL; and some more
      // non-ASCII ones).
      .replace(
        // eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
        /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
        basic
      )
  )

  function surrogate(pair, index, all) {
    return options.format(
      (pair.charCodeAt(0) - 0xd800) * 0x400 +
        pair.charCodeAt(1) -
        0xdc00 +
        0x10000,
      all.charCodeAt(index + 2),
      options
    )
  }

  function basic(character, index, all) {
    return options.format(
      character.charCodeAt(0),
      all.charCodeAt(index + 1),
      options
    )
  }
}

function charactersToExpression(subset) {
  var groups = [];
  var index = -1;

  while (++index < subset.length) {
    groups.push(subset[index].replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'));
  }

  return new RegExp('(?:' + groups.join('|') + ')', 'g')
}

var fromCharCode = String.fromCharCode;

var toHexadecimal = toHexReference;



// Transform `code` into a hexadecimal character reference.
function toHexReference(code, next, omit) {
  var value = '&#x' + code.toString(16).toUpperCase();
  return omit && next && !/[\dA-Fa-f]/.test(fromCharCode(next))
    ? value
    : value + ';'
}

var toDecimal = toDecimalReference;



// Transform `code` into a decimal character reference.
function toDecimalReference(code, next, omit) {
  var value = '&#' + String(code);
  return omit && next && !/\d/.test(fromCharCode(next)) ? value : value + ';'
}

var AElig$1 = "Æ";
var AMP = "&";
var Aacute$1 = "Á";
var Acirc$1 = "Â";
var Agrave$1 = "À";
var Aring$1 = "Å";
var Atilde$1 = "Ã";
var Auml$1 = "Ä";
var COPY = "©";
var Ccedil$1 = "Ç";
var ETH$1 = "Ð";
var Eacute$1 = "É";
var Ecirc$1 = "Ê";
var Egrave$1 = "È";
var Euml$1 = "Ë";
var GT = ">";
var Iacute$1 = "Í";
var Icirc$1 = "Î";
var Igrave$1 = "Ì";
var Iuml$1 = "Ï";
var LT = "<";
var Ntilde$1 = "Ñ";
var Oacute$1 = "Ó";
var Ocirc$1 = "Ô";
var Ograve$1 = "Ò";
var Oslash$1 = "Ø";
var Otilde$1 = "Õ";
var Ouml$1 = "Ö";
var QUOT = "\"";
var REG = "®";
var THORN$1 = "Þ";
var Uacute$1 = "Ú";
var Ucirc$1 = "Û";
var Ugrave$1 = "Ù";
var Uuml$1 = "Ü";
var Yacute$1 = "Ý";
var aacute$1 = "á";
var acirc$1 = "â";
var acute$1 = "´";
var aelig$1 = "æ";
var agrave$1 = "à";
var amp$1 = "&";
var aring$1 = "å";
var atilde$1 = "ã";
var auml$1 = "ä";
var brvbar$1 = "¦";
var ccedil$1 = "ç";
var cedil$1 = "¸";
var cent$1 = "¢";
var copy$1 = "©";
var curren$1 = "¤";
var deg$1 = "°";
var divide$1 = "÷";
var eacute$1 = "é";
var ecirc$1 = "ê";
var egrave$1 = "è";
var eth$1 = "ð";
var euml$1 = "ë";
var frac12$1 = "½";
var frac14$1 = "¼";
var frac34$1 = "¾";
var gt$1 = ">";
var iacute$1 = "í";
var icirc$1 = "î";
var iexcl$1 = "¡";
var igrave$1 = "ì";
var iquest$1 = "¿";
var iuml$1 = "ï";
var laquo$1 = "«";
var lt$1 = "<";
var macr$1 = "¯";
var micro$1 = "µ";
var middot$1 = "·";
var nbsp$1 = " ";
var not$1 = "¬";
var ntilde$1 = "ñ";
var oacute$1 = "ó";
var ocirc$1 = "ô";
var ograve$1 = "ò";
var ordf$1 = "ª";
var ordm$1 = "º";
var oslash$1 = "ø";
var otilde$1 = "õ";
var ouml$1 = "ö";
var para$1 = "¶";
var plusmn$1 = "±";
var pound$1 = "£";
var quot$1 = "\"";
var raquo$1 = "»";
var reg$1 = "®";
var sect$1 = "§";
var shy$1 = "­";
var sup1$1 = "¹";
var sup2$1 = "²";
var sup3$1 = "³";
var szlig$1 = "ß";
var thorn$1 = "þ";
var times$1 = "×";
var uacute$1 = "ú";
var ucirc$1 = "û";
var ugrave$1 = "ù";
var uml$1 = "¨";
var uuml$1 = "ü";
var yacute$1 = "ý";
var yen$1 = "¥";
var yuml$1 = "ÿ";
var legacy = {
	AElig: AElig$1,
	AMP: AMP,
	Aacute: Aacute$1,
	Acirc: Acirc$1,
	Agrave: Agrave$1,
	Aring: Aring$1,
	Atilde: Atilde$1,
	Auml: Auml$1,
	COPY: COPY,
	Ccedil: Ccedil$1,
	ETH: ETH$1,
	Eacute: Eacute$1,
	Ecirc: Ecirc$1,
	Egrave: Egrave$1,
	Euml: Euml$1,
	GT: GT,
	Iacute: Iacute$1,
	Icirc: Icirc$1,
	Igrave: Igrave$1,
	Iuml: Iuml$1,
	LT: LT,
	Ntilde: Ntilde$1,
	Oacute: Oacute$1,
	Ocirc: Ocirc$1,
	Ograve: Ograve$1,
	Oslash: Oslash$1,
	Otilde: Otilde$1,
	Ouml: Ouml$1,
	QUOT: QUOT,
	REG: REG,
	THORN: THORN$1,
	Uacute: Uacute$1,
	Ucirc: Ucirc$1,
	Ugrave: Ugrave$1,
	Uuml: Uuml$1,
	Yacute: Yacute$1,
	aacute: aacute$1,
	acirc: acirc$1,
	acute: acute$1,
	aelig: aelig$1,
	agrave: agrave$1,
	amp: amp$1,
	aring: aring$1,
	atilde: atilde$1,
	auml: auml$1,
	brvbar: brvbar$1,
	ccedil: ccedil$1,
	cedil: cedil$1,
	cent: cent$1,
	copy: copy$1,
	curren: curren$1,
	deg: deg$1,
	divide: divide$1,
	eacute: eacute$1,
	ecirc: ecirc$1,
	egrave: egrave$1,
	eth: eth$1,
	euml: euml$1,
	frac12: frac12$1,
	frac14: frac14$1,
	frac34: frac34$1,
	gt: gt$1,
	iacute: iacute$1,
	icirc: icirc$1,
	iexcl: iexcl$1,
	igrave: igrave$1,
	iquest: iquest$1,
	iuml: iuml$1,
	laquo: laquo$1,
	lt: lt$1,
	macr: macr$1,
	micro: micro$1,
	middot: middot$1,
	nbsp: nbsp$1,
	not: not$1,
	ntilde: ntilde$1,
	oacute: oacute$1,
	ocirc: ocirc$1,
	ograve: ograve$1,
	ordf: ordf$1,
	ordm: ordm$1,
	oslash: oslash$1,
	otilde: otilde$1,
	ouml: ouml$1,
	para: para$1,
	plusmn: plusmn$1,
	pound: pound$1,
	quot: quot$1,
	raquo: raquo$1,
	reg: reg$1,
	sect: sect$1,
	shy: shy$1,
	sup1: sup1$1,
	sup2: sup2$1,
	sup3: sup3$1,
	szlig: szlig$1,
	thorn: thorn$1,
	times: times$1,
	uacute: uacute$1,
	ucirc: ucirc$1,
	ugrave: ugrave$1,
	uml: uml$1,
	uuml: uuml$1,
	yacute: yacute$1,
	yen: yen$1,
	yuml: yuml$1
};

var nbsp = " ";
var iexcl = "¡";
var cent = "¢";
var pound = "£";
var curren = "¤";
var yen = "¥";
var brvbar = "¦";
var sect = "§";
var uml = "¨";
var copy = "©";
var ordf = "ª";
var laquo = "«";
var not = "¬";
var shy = "­";
var reg = "®";
var macr = "¯";
var deg = "°";
var plusmn = "±";
var sup2 = "²";
var sup3 = "³";
var acute = "´";
var micro = "µ";
var para = "¶";
var middot = "·";
var cedil = "¸";
var sup1 = "¹";
var ordm = "º";
var raquo = "»";
var frac14 = "¼";
var frac12 = "½";
var frac34 = "¾";
var iquest = "¿";
var Agrave = "À";
var Aacute = "Á";
var Acirc = "Â";
var Atilde = "Ã";
var Auml = "Ä";
var Aring = "Å";
var AElig = "Æ";
var Ccedil = "Ç";
var Egrave = "È";
var Eacute = "É";
var Ecirc = "Ê";
var Euml = "Ë";
var Igrave = "Ì";
var Iacute = "Í";
var Icirc = "Î";
var Iuml = "Ï";
var ETH = "Ð";
var Ntilde = "Ñ";
var Ograve = "Ò";
var Oacute = "Ó";
var Ocirc = "Ô";
var Otilde = "Õ";
var Ouml = "Ö";
var times = "×";
var Oslash = "Ø";
var Ugrave = "Ù";
var Uacute = "Ú";
var Ucirc = "Û";
var Uuml = "Ü";
var Yacute = "Ý";
var THORN = "Þ";
var szlig = "ß";
var agrave = "à";
var aacute = "á";
var acirc = "â";
var atilde = "ã";
var auml = "ä";
var aring = "å";
var aelig = "æ";
var ccedil = "ç";
var egrave = "è";
var eacute = "é";
var ecirc = "ê";
var euml = "ë";
var igrave = "ì";
var iacute = "í";
var icirc = "î";
var iuml = "ï";
var eth = "ð";
var ntilde = "ñ";
var ograve = "ò";
var oacute = "ó";
var ocirc = "ô";
var otilde = "õ";
var ouml = "ö";
var divide = "÷";
var oslash = "ø";
var ugrave = "ù";
var uacute = "ú";
var ucirc = "û";
var uuml = "ü";
var yacute = "ý";
var thorn = "þ";
var yuml = "ÿ";
var fnof = "ƒ";
var Alpha = "Α";
var Beta = "Β";
var Gamma = "Γ";
var Delta = "Δ";
var Epsilon = "Ε";
var Zeta = "Ζ";
var Eta = "Η";
var Theta = "Θ";
var Iota = "Ι";
var Kappa = "Κ";
var Lambda = "Λ";
var Mu = "Μ";
var Nu = "Ν";
var Xi = "Ξ";
var Omicron = "Ο";
var Pi = "Π";
var Rho = "Ρ";
var Sigma = "Σ";
var Tau = "Τ";
var Upsilon = "Υ";
var Phi = "Φ";
var Chi = "Χ";
var Psi = "Ψ";
var Omega = "Ω";
var alpha = "α";
var beta = "β";
var gamma = "γ";
var delta = "δ";
var epsilon = "ε";
var zeta = "ζ";
var eta = "η";
var theta = "θ";
var iota = "ι";
var kappa = "κ";
var lambda = "λ";
var mu = "μ";
var nu = "ν";
var xi = "ξ";
var omicron = "ο";
var pi = "π";
var rho = "ρ";
var sigmaf = "ς";
var sigma = "σ";
var tau = "τ";
var upsilon = "υ";
var phi = "φ";
var chi = "χ";
var psi = "ψ";
var omega = "ω";
var thetasym = "ϑ";
var upsih = "ϒ";
var piv = "ϖ";
var bull = "•";
var hellip = "…";
var prime = "′";
var Prime = "″";
var oline = "‾";
var frasl = "⁄";
var weierp = "℘";
var image = "ℑ";
var real = "ℜ";
var trade = "™";
var alefsym = "ℵ";
var larr = "←";
var uarr = "↑";
var rarr = "→";
var darr = "↓";
var harr = "↔";
var crarr = "↵";
var lArr = "⇐";
var uArr = "⇑";
var rArr = "⇒";
var dArr = "⇓";
var hArr = "⇔";
var forall = "∀";
var part = "∂";
var exist = "∃";
var empty$2 = "∅";
var nabla = "∇";
var isin = "∈";
var notin = "∉";
var ni = "∋";
var prod = "∏";
var sum = "∑";
var minus = "−";
var lowast = "∗";
var radic = "√";
var prop = "∝";
var infin = "∞";
var ang = "∠";
var and = "∧";
var or = "∨";
var cap$1 = "∩";
var cup = "∪";
var int$1 = "∫";
var there4 = "∴";
var sim = "∼";
var cong = "≅";
var asymp = "≈";
var ne = "≠";
var equiv = "≡";
var le = "≤";
var ge = "≥";
var sub = "⊂";
var sup = "⊃";
var nsub = "⊄";
var sube = "⊆";
var supe = "⊇";
var oplus = "⊕";
var otimes = "⊗";
var perp = "⊥";
var sdot = "⋅";
var lceil = "⌈";
var rceil = "⌉";
var lfloor = "⌊";
var rfloor = "⌋";
var lang = "〈";
var rang = "〉";
var loz = "◊";
var spades = "♠";
var clubs = "♣";
var hearts = "♥";
var diams = "♦";
var quot = "\"";
var amp = "&";
var lt = "<";
var gt = ">";
var OElig = "Œ";
var oelig = "œ";
var Scaron = "Š";
var scaron = "š";
var Yuml = "Ÿ";
var circ = "ˆ";
var tilde = "˜";
var ensp = " ";
var emsp = " ";
var thinsp = " ";
var zwnj = "‌";
var zwj = "‍";
var lrm = "‎";
var rlm = "‏";
var ndash = "–";
var mdash = "—";
var lsquo = "‘";
var rsquo = "’";
var sbquo = "‚";
var ldquo = "“";
var rdquo = "”";
var bdquo = "„";
var dagger = "†";
var Dagger = "‡";
var permil = "‰";
var lsaquo = "‹";
var rsaquo = "›";
var euro = "€";
var entities = {
	nbsp: nbsp,
	iexcl: iexcl,
	cent: cent,
	pound: pound,
	curren: curren,
	yen: yen,
	brvbar: brvbar,
	sect: sect,
	uml: uml,
	copy: copy,
	ordf: ordf,
	laquo: laquo,
	not: not,
	shy: shy,
	reg: reg,
	macr: macr,
	deg: deg,
	plusmn: plusmn,
	sup2: sup2,
	sup3: sup3,
	acute: acute,
	micro: micro,
	para: para,
	middot: middot,
	cedil: cedil,
	sup1: sup1,
	ordm: ordm,
	raquo: raquo,
	frac14: frac14,
	frac12: frac12,
	frac34: frac34,
	iquest: iquest,
	Agrave: Agrave,
	Aacute: Aacute,
	Acirc: Acirc,
	Atilde: Atilde,
	Auml: Auml,
	Aring: Aring,
	AElig: AElig,
	Ccedil: Ccedil,
	Egrave: Egrave,
	Eacute: Eacute,
	Ecirc: Ecirc,
	Euml: Euml,
	Igrave: Igrave,
	Iacute: Iacute,
	Icirc: Icirc,
	Iuml: Iuml,
	ETH: ETH,
	Ntilde: Ntilde,
	Ograve: Ograve,
	Oacute: Oacute,
	Ocirc: Ocirc,
	Otilde: Otilde,
	Ouml: Ouml,
	times: times,
	Oslash: Oslash,
	Ugrave: Ugrave,
	Uacute: Uacute,
	Ucirc: Ucirc,
	Uuml: Uuml,
	Yacute: Yacute,
	THORN: THORN,
	szlig: szlig,
	agrave: agrave,
	aacute: aacute,
	acirc: acirc,
	atilde: atilde,
	auml: auml,
	aring: aring,
	aelig: aelig,
	ccedil: ccedil,
	egrave: egrave,
	eacute: eacute,
	ecirc: ecirc,
	euml: euml,
	igrave: igrave,
	iacute: iacute,
	icirc: icirc,
	iuml: iuml,
	eth: eth,
	ntilde: ntilde,
	ograve: ograve,
	oacute: oacute,
	ocirc: ocirc,
	otilde: otilde,
	ouml: ouml,
	divide: divide,
	oslash: oslash,
	ugrave: ugrave,
	uacute: uacute,
	ucirc: ucirc,
	uuml: uuml,
	yacute: yacute,
	thorn: thorn,
	yuml: yuml,
	fnof: fnof,
	Alpha: Alpha,
	Beta: Beta,
	Gamma: Gamma,
	Delta: Delta,
	Epsilon: Epsilon,
	Zeta: Zeta,
	Eta: Eta,
	Theta: Theta,
	Iota: Iota,
	Kappa: Kappa,
	Lambda: Lambda,
	Mu: Mu,
	Nu: Nu,
	Xi: Xi,
	Omicron: Omicron,
	Pi: Pi,
	Rho: Rho,
	Sigma: Sigma,
	Tau: Tau,
	Upsilon: Upsilon,
	Phi: Phi,
	Chi: Chi,
	Psi: Psi,
	Omega: Omega,
	alpha: alpha,
	beta: beta,
	gamma: gamma,
	delta: delta,
	epsilon: epsilon,
	zeta: zeta,
	eta: eta,
	theta: theta,
	iota: iota,
	kappa: kappa,
	lambda: lambda,
	mu: mu,
	nu: nu,
	xi: xi,
	omicron: omicron,
	pi: pi,
	rho: rho,
	sigmaf: sigmaf,
	sigma: sigma,
	tau: tau,
	upsilon: upsilon,
	phi: phi,
	chi: chi,
	psi: psi,
	omega: omega,
	thetasym: thetasym,
	upsih: upsih,
	piv: piv,
	bull: bull,
	hellip: hellip,
	prime: prime,
	Prime: Prime,
	oline: oline,
	frasl: frasl,
	weierp: weierp,
	image: image,
	real: real,
	trade: trade,
	alefsym: alefsym,
	larr: larr,
	uarr: uarr,
	rarr: rarr,
	darr: darr,
	harr: harr,
	crarr: crarr,
	lArr: lArr,
	uArr: uArr,
	rArr: rArr,
	dArr: dArr,
	hArr: hArr,
	forall: forall,
	part: part,
	exist: exist,
	empty: empty$2,
	nabla: nabla,
	isin: isin,
	notin: notin,
	ni: ni,
	prod: prod,
	sum: sum,
	minus: minus,
	lowast: lowast,
	radic: radic,
	prop: prop,
	infin: infin,
	ang: ang,
	and: and,
	or: or,
	cap: cap$1,
	cup: cup,
	int: int$1,
	there4: there4,
	sim: sim,
	cong: cong,
	asymp: asymp,
	ne: ne,
	equiv: equiv,
	le: le,
	ge: ge,
	sub: sub,
	sup: sup,
	nsub: nsub,
	sube: sube,
	supe: supe,
	oplus: oplus,
	otimes: otimes,
	perp: perp,
	sdot: sdot,
	lceil: lceil,
	rceil: rceil,
	lfloor: lfloor,
	rfloor: rfloor,
	lang: lang,
	rang: rang,
	loz: loz,
	spades: spades,
	clubs: clubs,
	hearts: hearts,
	diams: diams,
	quot: quot,
	amp: amp,
	lt: lt,
	gt: gt,
	OElig: OElig,
	oelig: oelig,
	Scaron: Scaron,
	scaron: scaron,
	Yuml: Yuml,
	circ: circ,
	tilde: tilde,
	ensp: ensp,
	emsp: emsp,
	thinsp: thinsp,
	zwnj: zwnj,
	zwj: zwj,
	lrm: lrm,
	rlm: rlm,
	ndash: ndash,
	mdash: mdash,
	lsquo: lsquo,
	rsquo: rsquo,
	sbquo: sbquo,
	ldquo: ldquo,
	rdquo: rdquo,
	bdquo: bdquo,
	dagger: dagger,
	Dagger: Dagger,
	permil: permil,
	lsaquo: lsaquo,
	rsaquo: rsaquo,
	euro: euro
};

var characters = {};
var name;

var characters_1 = characters;

for (name in entities) {
  characters[entities[name]] = name;
}

var hasOwnProperty = {}.hasOwnProperty;

var dangerous = [
	"cent",
	"copy",
	"divide",
	"gt",
	"lt",
	"not",
	"para",
	"times"
];

var toNamed_1 = toNamed;







// Transform `code` into a named character reference.
function toNamed(code, next, omit, attribute) {
  var character = fromCharCode(code);
  var name;
  var value;

  if (hasOwnProperty.call(characters_1, character)) {
    name = characters_1[character];
    value = '&' + name;

    if (
      omit &&
      hasOwnProperty.call(legacy, name) &&
      dangerous.indexOf(name) === -1 &&
      (!attribute ||
        (next && next !== 61 /* `=` */ && /[^\da-z]/i.test(fromCharCode(next))))
    ) {
      return value
    }

    return value + ';'
  }

  return ''
}

var formatSmart = formatPretty;





// Encode `character` according to `options`.
function formatPretty(code, next, options) {
  var named;
  var numeric;
  var decimal;

  if (options.useNamedReferences || options.useShortestReferences) {
    named = toNamed_1(
      code,
      next,
      options.omitOptionalSemicolons,
      options.attribute
    );
  }

  if (options.useShortestReferences || !named) {
    numeric = toHexadecimal(code, next, options.omitOptionalSemicolons);

    // Use the shortest numeric reference when requested.
    // A simple algorithm would use decimal for all code points under 100, as
    // those are shorter than hexadecimal:
    //
    // * `&#99;` vs `&#x63;` (decimal shorter)
    // * `&#100;` vs `&#x64;` (equal)
    //
    // However, because we take `next` into consideration when `omit` is used,
    // And it would be possible that decimals are shorter on bigger values as
    // well if `next` is hexadecimal but not decimal, we instead compare both.
    if (options.useShortestReferences) {
      decimal = toDecimal(code, next, options.omitOptionalSemicolons);

      if (decimal.length < numeric.length) {
        numeric = decimal;
      }
    }
  }

  return named &&
    (!options.useShortestReferences || named.length < numeric.length)
    ? named
    : numeric
}

var encode_1 = encode;

// Encode special characters in `value`.
function encode(value, options) {
  // Note: Switch to `Object.assign` next major.
  return core$1(value, immutable(options, {format: formatSmart}))
}

var _escape = escape;

// Shortcut to escape special characters in HTML.
function escape(value) {
  return core$1(value, {
    escapeOnly: true,
    useNamedReferences: true,
    format: formatSmart
  })
}

var lib$1 = encode_1;
encode_1.escape = _escape;

var stringifyEntities = lib$1;

var comment = serializeComment;

function serializeComment(ctx, node) {
  // See: <https://html.spec.whatwg.org/multipage/syntax.html#comments>
  return ctx.bogusComments
    ? '<?' + stringifyEntities(node.value, immutable(ctx.entities, {subset: ['>']})) + '>'
    : '<!--' + node.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, encode) + '-->'

  function encode($0) {
    return stringifyEntities($0, immutable(ctx.entities, {subset: ['<', '>']}))
  }
}

var ccount_1 = ccount;

function ccount(source, character) {
  var value = String(source);
  var count = 0;
  var index;

  if (typeof character !== 'string') {
    throw new Error('Expected character')
  }

  index = value.indexOf(character);

  while (index !== -1) {
    count++;
    index = value.indexOf(character, index + character.length);
  }

  return count
}

var doctype = serializeDoctype;

function serializeDoctype(ctx, node) {
  var sep = ctx.tightDoctype ? '' : ' ';
  var parts = ['<!' + (ctx.upperDoctype ? 'DOCTYPE' : 'doctype')];

  if (node.name) {
    parts.push(sep, node.name);

    if (node.public != null) {
      parts.push(' public', sep, quote(ctx, node.public));
    } else if (node.system != null) {
      parts.push(' system');
    }

    if (node.system != null) {
      parts.push(sep, quote(ctx, node.system));
    }
  }

  return parts.join('') + '>'
}

function quote(ctx, value) {
  var string = String(value);
  var quote =
    ccount_1(string, ctx.quote) > ccount_1(string, ctx.alternative)
      ? ctx.alternative
      : ctx.quote;

  return (
    quote +
    stringifyEntities(string, immutable(ctx.entities, {subset: ['<', '&', quote]})) +
    quote
  )
}

var data = 'data';

var find_1 = find;

var valid = /^data[-\w.:]+$/i;
var dash = /-[a-z]/g;
var cap = /[A-Z]/g;

function find(schema, value) {
  var normal = normalize_1(value);
  var prop = value;
  var Type = info;

  if (normal in schema.normal) {
    return schema.property[schema.normal[normal]]
  }

  if (normal.length > 4 && normal.slice(0, 4) === data && valid.test(value)) {
    // Attribute or property.
    if (value.charAt(4) === '-') {
      prop = datasetToProperty(value);
    } else {
      value = datasetToAttribute(value);
    }

    Type = definedInfo;
  }

  return new Type(prop, value)
}

function datasetToProperty(attribute) {
  var value = attribute.slice(5).replace(dash, camelcase);
  return data + value.charAt(0).toUpperCase() + value.slice(1)
}

function datasetToAttribute(property) {
  var value = property.slice(4);

  if (dash.test(value)) {
    return property
  }

  value = value.replace(cap, kebab);

  if (value.charAt(0) !== '-') {
    value = '-' + value;
  }

  return data + value
}

function kebab($0) {
  return '-' + $0.toLowerCase()
}

function camelcase($0) {
  return $0.charAt(1).toUpperCase()
}

var parse_1$1 = parse$1;
var stringify_1$1 = stringify$2;

var empty$1 = '';
var space$1 = ' ';
var whiteSpace = /[ \t\n\r\f]+/g;

function parse$1(value) {
  var input = String(value || empty$1).trim();
  return input === empty$1 ? [] : input.split(whiteSpace)
}

function stringify$2(values) {
  return values.join(space$1).trim()
}

var spaceSeparatedTokens = {
	parse: parse_1$1,
	stringify: stringify_1$1
};

var parse_1 = parse;
var stringify_1 = stringify$1;

var comma = ',';
var space = ' ';
var empty = '';

// Parse comma-separated tokens to an array.
function parse(value) {
  var values = [];
  var input = String(value || empty);
  var index = input.indexOf(comma);
  var lastIndex = 0;
  var end = false;
  var val;

  while (!end) {
    if (index === -1) {
      index = input.length;
      end = true;
    }

    val = input.slice(lastIndex, index).trim();

    if (val || !end) {
      values.push(val);
    }

    lastIndex = index + 1;
    index = input.indexOf(comma, lastIndex);
  }

  return values
}

// Compile an array to comma-separated tokens.
// `options.padLeft` (default: `true`) pads a space left of each token, and
// `options.padRight` (default: `false`) pads a space to the right of each token.
function stringify$1(values, options) {
  var settings = options || {};
  var left = settings.padLeft === false ? empty : space;
  var right = settings.padRight ? space : empty;

  // Ensure the last empty entry is seen.
  if (values[values.length - 1] === empty) {
    values = values.concat(empty);
  }

  return values.join(right + comma + left).trim()
}

var commaSeparatedTokens = {
	parse: parse_1,
	stringify: stringify_1
};

var all_1 = all;

// Serialize all children of `parent`.
function all(ctx, parent) {
  var results = [];
  var children = (parent && parent.children) || [];
  var index = -1;

  while (++index < children.length) {
    results[index] = one(ctx, children[index], index, parent);
  }

  return results.join('')
}

// Maps of subsets.
// Each value is a matrix of tuples.
// The first value causes parse errors, the second is valid.
// Of both values, the first value is unsafe, and the second is safe.
var constants = {
  // See: <https://html.spec.whatwg.org/#attribute-name-state>.
  name: [
    ['\t\n\f\r &/=>'.split(''), '\t\n\f\r "&\'/=>`'.split('')],
    ['\0\t\n\f\r "&\'/<=>'.split(''), '\0\t\n\f\r "&\'/<=>`'.split('')]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(unquoted)-state>.
  unquoted: [
    ['\t\n\f\r &>'.split(''), '\0\t\n\f\r "&\'<=>`'.split('')],
    ['\0\t\n\f\r "&\'<=>`'.split(''), '\0\t\n\f\r "&\'<=>`'.split('')]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state>.
  single: [
    ["&'".split(''), '"&\'`'.split('')],
    ["\0&'".split(''), '\0"&\'`'.split('')]
  ],
  // See: <https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state>.
  double: [
    ['"&'.split(''), '"&\'`'.split('')],
    ['\0"&'.split(''), '\0"&\'`'.split('')]
  ]
};

var element = serializeElement;

function serializeElement(ctx, node, index, parent) {
  var schema = ctx.schema;
  var omit = schema.space === 'svg' ? false : ctx.omit;
  var parts = [];
  var selfClosing =
    schema.space === 'svg'
      ? ctx.closeEmpty
      : ctx.voids.indexOf(node.tagName.toLowerCase()) > -1;
  var attrs = serializeAttributes(ctx, node.properties);
  var content;
  var last;

  if (schema.space === 'html' && node.tagName === 'svg') {
    ctx.schema = svg_1;
  }

  content = all_1(
    ctx,
    schema.space === 'html' && node.tagName === 'template' ? node.content : node
  );

  ctx.schema = schema;

  // If the node is categorised as void, but it has children, remove the
  // categorisation.
  // This enables for example `menuitem`s, which are void in W3C HTML but not
  // void in WHATWG HTML, to be stringified properly.
  if (content) selfClosing = false;

  if (attrs || !omit || !omit.opening(node, index, parent)) {
    parts.push('<', node.tagName, attrs ? ' ' + attrs : '');

    if (selfClosing && (schema.space === 'svg' || ctx.close)) {
      last = attrs.charAt(attrs.length - 1);
      if (
        !ctx.tightClose ||
        last === '/' ||
        (schema.space === 'svg' && last && last !== '"' && last !== "'")
      ) {
        parts.push(' ');
      }

      parts.push('/');
    }

    parts.push('>');
  }

  parts.push(content);

  if (!selfClosing && (!omit || !omit.closing(node, index, parent))) {
    parts.push('</' + node.tagName + '>');
  }

  return parts.join('')
}

function serializeAttributes(ctx, props) {
  var values = [];
  var index = -1;
  var key;
  var value;
  var last;

  for (key in props) {
    if (props[key] != null) {
      value = serializeAttribute(ctx, key, props[key]);
      if (value) values.push(value);
    }
  }

  while (++index < values.length) {
    last = ctx.tight ? values[index].charAt(values[index].length - 1) : null;

    // In tight mode, don’t add a space after quoted attributes.
    if (index !== values.length - 1 && last !== '"' && last !== "'") {
      values[index] += ' ';
    }
  }

  return values.join('')
}

function serializeAttribute(ctx, key, value) {
  var info = find_1(ctx.schema, key);
  var quote = ctx.quote;
  var result;
  var name;

  if (info.overloadedBoolean && (value === info.attribute || value === '')) {
    value = true;
  } else if (
    info.boolean ||
    (info.overloadedBoolean && typeof value !== 'string')
  ) {
    value = Boolean(value);
  }

  if (
    value == null ||
    value === false ||
    (typeof value === 'number' && value !== value)
  ) {
    return ''
  }

  name = stringifyEntities(
    info.attribute,
    immutable(ctx.entities, {
      // Always encode without parse errors in non-HTML.
      subset:
        constants.name[ctx.schema.space === 'html' ? ctx.valid : 1][ctx.safe]
    })
  );

  // No value.
  // There is currently only one boolean property in SVG: `[download]` on
  // `<a>`.
  // This property does not seem to work in browsers (FF, Sa, Ch), so I can’t
  // test if dropping the value works.
  // But I assume that it should:
  //
  // ```html
  // <!doctype html>
  // <svg viewBox="0 0 100 100">
  //   <a href=https://example.com download>
  //     <circle cx=50 cy=40 r=35 />
  //   </a>
  // </svg>
  // ```
  //
  // See: <https://github.com/wooorm/property-information/blob/main/lib/svg.js>
  if (value === true) return name

  value =
    typeof value === 'object' && 'length' in value
      ? // `spaces` doesn’t accept a second argument, but it’s given here just to
        // keep the code cleaner.
        (info.commaSeparated ? commaSeparatedTokens.stringify : spaceSeparatedTokens.stringify)(value, {
          padLeft: !ctx.tightLists
        })
      : String(value);

  if (ctx.collapseEmpty && !value) return name

  // Check unquoted value.
  if (ctx.unquoted) {
    result = stringifyEntities(
      value,
      immutable(ctx.entities, {
        subset: constants.unquoted[ctx.valid][ctx.safe],
        attribute: true
      })
    );
  }

  // If we don’t want unquoted, or if `value` contains character references when
  // unquoted…
  if (result !== value) {
    // If the alternative is less common than `quote`, switch.
    if (ctx.smart && ccount_1(value, quote) > ccount_1(value, ctx.alternative)) {
      quote = ctx.alternative;
    }

    result =
      quote +
      stringifyEntities(
        value,
        immutable(ctx.entities, {
          // Always encode without parse errors in non-HTML.
          subset: (quote === "'" ? constants.single : constants.double)[
            ctx.schema.space === 'html' ? ctx.valid : 1
          ][ctx.safe],
          attribute: true
        })
      ) +
      quote;
  }

  // Don’t add a `=` for unquoted empties.
  return name + (result ? '=' + result : result)
}

var text = serializeText;

function serializeText(ctx, node, index, parent) {
  // Check if content of `node` should be escaped.
  return parent && (parent.tagName === 'script' || parent.tagName === 'style')
    ? node.value
    : stringifyEntities(node.value, immutable(ctx.entities, {subset: ['<', '&']}))
}

var raw = serializeRaw;

function serializeRaw(ctx, node) {
  return ctx.dangerous ? node.value : text(ctx, node)
}

var one = serialize;

var handlers = {
  comment: comment,
  doctype: doctype,
  element: element,
  raw: raw,
  root: all_1,
  text: text
};

var own = {}.hasOwnProperty;

function serialize(ctx, node, index, parent) {
  if (!node || !node.type) {
    throw new Error('Expected node, not `' + node + '`')
  }

  if (!own.call(handlers, node.type)) {
    throw new Error('Cannot compile unknown node `' + node.type + '`')
  }

  return handlers[node.type](ctx, node, index, parent)
}

var lib = toHtml;

var deprecationWarningIssued;

function toHtml(node, options) {
  var settings = options || {};
  var quote = settings.quote || '"';
  var alternative = quote === '"' ? "'" : '"';

  if (quote !== '"' && quote !== "'") {
    throw new Error('Invalid quote `' + quote + '`, expected `\'` or `"`')
  }

  if ('allowDangerousHTML' in settings && !deprecationWarningIssued) {
    deprecationWarningIssued = true;
    console.warn(
      'Deprecation warning: `allowDangerousHTML` is a nonstandard option, use `allowDangerousHtml` instead'
    );
  }

  return one(
    {
      valid: settings.allowParseErrors ? 0 : 1,
      safe: settings.allowDangerousCharacters ? 0 : 1,
      schema: settings.space === 'svg' ? svg_1 : html_1,
      omit: settings.omitOptionalTags && omission,
      quote: quote,
      alternative: alternative,
      smart: settings.quoteSmart,
      unquoted: settings.preferUnquoted,
      tight: settings.tightAttributes,
      upperDoctype: settings.upperDoctype,
      tightDoctype: settings.tightDoctype,
      bogusComments: settings.bogusComments,
      tightLists: settings.tightCommaSeparatedLists,
      tightClose: settings.tightSelfClosing,
      collapseEmpty: settings.collapseEmptyAttributes,
      dangerous: settings.allowDangerousHtml || settings.allowDangerousHTML,
      voids: settings.voids || voids.concat(),
      entities: settings.entities || {},
      close: settings.closeSelfClosing,
      closeEmpty: settings.closeEmptyElements
    },
    node && typeof node === 'object' && 'length' in node
      ? {type: 'root', children: node}
      : node
  )
}

var hastUtilToHtml = lib;

var rehypeStringify = stringify;

function stringify(config) {
  var settings = Object.assign({}, config, this.data('settings'));

  this.Compiler = compiler;

  function compiler(tree) {
    return hastUtilToHtml(tree, settings)
  }
}

const SLUG_PRESERVE_UNICODE$1 = false;
const SLUG_SEPARATOR$1 = "-";

const make_slug$3 = make_session_slug_processor({
	preserve_unicode: SLUG_PRESERVE_UNICODE$1,
	separator: SLUG_SEPARATOR$1,
});

// TODO: This should use the `base_level` setting
/**
 * The documentation only allows heading level from 3 to 5 inclusive. This plugin
 * 				validates that rule is always followed.
 */
function validate_headings() {
	return function transformer(tree, { data }) {
		if (data.docs_type !== "docs") return;
		unistUtilVisit(tree, "heading", (node) => {
			if (node.depth < 3 || node.depth > 5)
				throw new Error(
					`Only level 3, 4, and 5 headings are allowed. Got level ${node.depth} heading.`
				);
		});
	};
}








/**
 * Linkify headings, generate correct slugs, and collect section data.
 *
 * **linkify**: We must be able to link to headings. In order to this we need
 * 							to insert anchors with appropriate slugs. We also need to insert
 * 							link icons to allow people to copy paste links We do this by
 * 							inserting an `a` and `span` tag into every heading.
 *
 * **slugs**: slugs for heading anchors are generated based on previous headings.
 * 						This helps to prevent collisions and gives more descriptuve urls.
 * 						For example a `h3` of 'hello' will have a slug of `hello` the next
 * 						`h4` of 'world' will have a slug of `hello-world`
 *
 * **section data**: Sections of the docs are dictated by the document structure
 * 									 `h3` -> `h4` -> `h5`, etc. This plugin keeps track of the
 * 									 headings and creates a nested section structure that reflects
 * 									 the hierarchy of those sections. This structure allows us to
 * 									 create navigation structures with proper semantics, without
 * 									 transforming the sections data structure.
 *
 */

function linkify_headings() {
	return function (tree, { data }) {
		if (data.docs_type !== "docs" && data.docs_type !== "blog") return;

		unistUtilVisit(tree, "heading", (node) => {
			const prev_section = data.section_stack[data.section_stack.length - 1];

			// slugs are tracked independently of sections and are prefixed appropriately
			if (node.depth <= data.prev_level && data.slugs.length !== 0)
				for (let i = 0; i < data.prev_level - node.depth + 1; i++)
					data.slugs.pop();

			// innerText for MDAST nodes
			const title_text = mdastUtilToString(node);

			let slug;

			if (data.docs_type === "blog" || data.file_type === "readme") {
				slug = make_slug$3(
					node.depth === data.base_level
						? title_text
						: [data.slugs[data.slugs.length - 1], title_text].join(" "),
					data.seen_slugs
				);
			} else {
				slug = make_slug$3(
					node.depth === data.base_level
						? [data.section_title, title_text].join(" ")
						: [data.slugs[data.slugs.length - 1], title_text].join(" "),
					data.seen_slugs
				);
			}

			data.slugs.push(slug);

			// We keep a 'section_stack' to keep track of the section structure
			if (node.depth > data.prev_level) {
				// TODO: check that prev_section[prev_section.length - 1] exists
				// skipping heading levels can cause problems here
				// maybe check current level against prev_level to validate?
				data.section_stack.push(
					prev_section[prev_section.length - 1].sections || []
				);
			} else if (node.depth < data.prev_level) {
				data.section_stack.pop();
			}

			data.section_stack[data.section_stack.length - 1].push({
				slug,
				title: title_text,
				sections: [],
			});
			data.prev_level = node.depth;

			// Create the additional markup required
			const children = (mdastUtilToHast(node) ).children;

			if (!node.data) node.data = {};
			if (!node.data.hProperties) node.data.hProperties = {};
			if (!node.data.hChildren) node.data.hChildren = [];

			const span_node = {
				type: "element",
				tagName: "span",
				properties: { id: [slug], className: ["offset-anchor"] },
			};

			const a_node = {
				type: "element",
				tagName: "a",
				properties: {
					href: `${data.dir}#${slug}`,
					className: ["anchor"],
					"aria-hidden": true,
				},
			};

			if (node.depth > data.base_level + 1)
				//@ts-ignore
				span_node.properties["data-scrollignore"] = true;

			node.data.hChildren = [span_node, a_node];

			children.forEach((v) => node.data.hChildren.push(v));
		});
	};
}

const types = [
	"paragraph",
	"heading",
	"thematicBreak",
	"blockquote",
	"list",
	"listItem",
	"html",
	"code",
	"definition",
	"text",
	"emphasis",
	"strong",
	"inlineCode",
	"break",
	"link",
	"image",
	"linkReference",
	"imageReference",
];

/**
 * *Only applies to `README.md` files*.
 *
 * Svelte docs require documents to *not* contain a main title as this is provided by
 * 				other means. However, *readme* files should be easily readable exactly as
 * 				they are (in github or in an IDE). This plugin strips the leading `h1` from
 * 				`README.md` files facilitating this difference in formatting.
 */
function strip_h1() {
	return function transformer(tree, vFile) {
		//@ts-ignore
		if (vFile.data.file_type === "readme") {
			// we only wnat to strip headings if they are the first markdown node
			// Othere thing can appear first so we need to perform a type check
			const first_md_node = tree.children.findIndex((node) =>
				types.includes(node.type)
			);
			if (
				tree.children[first_md_node].type === "heading" &&
				tree.children[first_md_node].depth === 1
			) {
				tree.children.splice(first_md_node, first_md_node + 1);
			}
		}
	};
}

/**
 * *Only applies to `README.md` files*.
 *
 * Svelte docs require headings to start at level 3 as level 1 and 2 headings are
 * 				already used for other purposes. However, *readme* files should be
 * 				easily readable exactly as they are (in github or in an IDE). This
 * 				plugin increments headings in `README.md` files facilitating this
 * 				difference in formatting.
 */

function increment_headings() {
	return function transformer(tree, vFile) {
		//@ts-ignore
		if (vFile.data.file_type === "readme") {
			unistUtilVisit(tree, "heading", (node) => {
				const new_depth = node.depth + 1;
				if (new_depth > 5) {
					throw new Error(
						`Headings above level 5 are not allowed. Readme headings are automatically incremented by 1.`
					);
				}
				node.depth = new_depth ;
			});
		}
	};
}

/**
 * All links must have `rel="noopener noreferrer"` and external attributes
 * 				must open in a new window.
 */
function set_link_attributes() {
	return function transformer(tree) {
		unistUtilVisit(tree, "link", (node) => {
			let target_attr = "";
			let title_attr = "";

			if (node.url.startsWith("http")) {
				target_attr = ' target="_blank"';
			}

			if (node.title !== null) {
				title_attr = ` title="${node.title}"`;
			}

			((node ) ).type = "html";
			((node ) ).value = `<a href="${node.url}"${target_attr}${title_attr} rel="noopener noreferrer">${node.children[0].value}</a>`;
		});
	};
}

var prism = createCommonjsModule(function (module) {
/* **********************************************
     Begin prism-core.js
********************************************** */

/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self){

// Private helper vars
var lang = /\blang(?:uage)?-([\w-]+)\b/i;
var uniqueId = 0;


var _ = {
	/**
	 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
	 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
	 * additional languages or plugins yourself.
	 *
	 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
	 *
	 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
	 * empty Prism object into the global scope before loading the Prism script like this:
	 *
	 * ```js
	 * window.Prism = window.Prism || {};
	 * Prism.manual = true;
	 * // add a new <script> to load Prism's script
	 * ```
	 *
	 * @default false
	 * @type {boolean}
	 * @memberof Prism
	 * @public
	 */
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

	/**
	 * A namespace for utility methods.
	 *
	 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
	 * change or disappear at any time.
	 *
	 * @namespace
	 * @memberof Prism
	 */
	util: {
		encode: function encode(tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, encode(tokens.content), tokens.alias);
			} else if (Array.isArray(tokens)) {
				return tokens.map(encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		/**
		 * Returns the name of the type of the given value.
		 *
		 * @param {any} o
		 * @returns {string}
		 * @example
		 * type(null)      === 'Null'
		 * type(undefined) === 'Undefined'
		 * type(123)       === 'Number'
		 * type('foo')     === 'String'
		 * type(true)      === 'Boolean'
		 * type([1, 2])    === 'Array'
		 * type({})        === 'Object'
		 * type(String)    === 'Function'
		 * type(/abc+/)    === 'RegExp'
		 */
		type: function (o) {
			return Object.prototype.toString.call(o).slice(8, -1);
		},

		/**
		 * Returns a unique number for the given object. Later calls will still return the same number.
		 *
		 * @param {Object} obj
		 * @returns {number}
		 */
		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		/**
		 * Creates a deep clone of the given object.
		 *
		 * The main intended use of this function is to clone language definitions.
		 *
		 * @param {T} o
		 * @param {Record<number, any>} [visited]
		 * @returns {T}
		 * @template T
		 */
		clone: function deepClone(o, visited) {
			visited = visited || {};

			var clone, id;
			switch (_.util.type(o)) {
				case 'Object':
					id = _.util.objId(o);
					if (visited[id]) {
						return visited[id];
					}
					clone = /** @type {Record<string, any>} */ ({});
					visited[id] = clone;

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = deepClone(o[key], visited);
						}
					}

					return /** @type {any} */ (clone);

				case 'Array':
					id = _.util.objId(o);
					if (visited[id]) {
						return visited[id];
					}
					clone = [];
					visited[id] = clone;

					(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
						clone[i] = deepClone(v, visited);
					});

					return /** @type {any} */ (clone);

				default:
					return o;
			}
		},

		/**
		 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
		 *
		 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
		 *
		 * @param {Element} element
		 * @returns {string}
		 */
		getLanguage: function (element) {
			while (element && !lang.test(element.className)) {
				element = element.parentElement;
			}
			if (element) {
				return (element.className.match(lang) || [, 'none'])[1].toLowerCase();
			}
			return 'none';
		},

		/**
		 * Returns the script element that is currently executing.
		 *
		 * This does __not__ work for line script element.
		 *
		 * @returns {HTMLScriptElement | null}
		 */
		currentScript: function () {
			if (typeof document === 'undefined') {
				return null;
			}
			if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
				return /** @type {any} */ (document.currentScript);
			}

			// IE11 workaround
			// we'll get the src of the current script by parsing IE11's error stack trace
			// this will not work for inline scripts

			try {
				throw new Error();
			} catch (err) {
				// Get file src url from stack. Specifically works with the format of stack traces in IE.
				// A stack will look like this:
				//
				// Error
				//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
				//    at Global code (http://localhost/components/prism-core.js:606:1)

				var src = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
				if (src) {
					var scripts = document.getElementsByTagName('script');
					for (var i in scripts) {
						if (scripts[i].src == src) {
							return scripts[i];
						}
					}
				}
				return null;
			}
		},

		/**
		 * Returns whether a given class is active for `element`.
		 *
		 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
		 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
		 * given class is just the given class with a `no-` prefix.
		 *
		 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
		 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
		 * ancestors have the given class or the negated version of it, then the default activation will be returned.
		 *
		 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
		 * version of it, the class is considered active.
		 *
		 * @param {Element} element
		 * @param {string} className
		 * @param {boolean} [defaultActivation=false]
		 * @returns {boolean}
		 */
		isActive: function (element, className, defaultActivation) {
			var no = 'no-' + className;

			while (element) {
				var classList = element.classList;
				if (classList.contains(className)) {
					return true;
				}
				if (classList.contains(no)) {
					return false;
				}
				element = element.parentElement;
			}
			return !!defaultActivation;
		}
	},

	/**
	 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
	 *
	 * @namespace
	 * @memberof Prism
	 * @public
	 */
	languages: {
		/**
		 * Creates a deep copy of the language with the given id and appends the given tokens.
		 *
		 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
		 * will be overwritten at its original position.
		 *
		 * ## Best practices
		 *
		 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
		 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
		 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
		 *
		 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
		 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
		 *
		 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
		 * @param {Grammar} redef The new tokens to append.
		 * @returns {Grammar} The new language created.
		 * @public
		 * @example
		 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
		 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
		 *     // at its original position
		 *     'comment': { ... },
		 *     // CSS doesn't have a 'color' token, so this token will be appended
		 *     'color': /\b(?:red|green|blue)\b/
		 * });
		 */
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Inserts tokens _before_ another token in a language definition or any other grammar.
		 *
		 * ## Usage
		 *
		 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
		 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
		 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
		 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
		 * this:
		 *
		 * ```js
		 * Prism.languages.markup.style = {
		 *     // token
		 * };
		 * ```
		 *
		 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
		 * before existing tokens. For the CSS example above, you would use it like this:
		 *
		 * ```js
		 * Prism.languages.insertBefore('markup', 'cdata', {
		 *     'style': {
		 *         // token
		 *     }
		 * });
		 * ```
		 *
		 * ## Special cases
		 *
		 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
		 * will be ignored.
		 *
		 * This behavior can be used to insert tokens after `before`:
		 *
		 * ```js
		 * Prism.languages.insertBefore('markup', 'comment', {
		 *     'comment': Prism.languages.markup.comment,
		 *     // tokens after 'comment'
		 * });
		 * ```
		 *
		 * ## Limitations
		 *
		 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
		 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
		 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
		 * deleting properties which is necessary to insert at arbitrary positions.
		 *
		 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
		 * Instead, it will create a new object and replace all references to the target object with the new one. This
		 * can be done without temporarily deleting properties, so the iteration order is well-defined.
		 *
		 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
		 * you hold the target object in a variable, then the value of the variable will not change.
		 *
		 * ```js
		 * var oldMarkup = Prism.languages.markup;
		 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
		 *
		 * assert(oldMarkup !== Prism.languages.markup);
		 * assert(newMarkup === Prism.languages.markup);
		 * ```
		 *
		 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
		 * object to be modified.
		 * @param {string} before The key to insert before.
		 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
		 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
		 * object to be modified.
		 *
		 * Defaults to `Prism.languages`.
		 * @returns {Grammar} The new grammar object.
		 * @public
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || /** @type {any} */ (_.languages);
			var grammar = root[inside];
			/** @type {Grammar} */
			var ret = {};

			for (var token in grammar) {
				if (grammar.hasOwnProperty(token)) {

					if (token == before) {
						for (var newToken in insert) {
							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					// Do not insert token which also occur in insert. See #1525
					if (!insert.hasOwnProperty(token)) {
						ret[token] = grammar[token];
					}
				}
			}

			var old = root[inside];
			root[inside] = ret;

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === old && key != inside) {
					this[key] = ret;
				}
			});

			return ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function DFS(o, callback, type, visited) {
			visited = visited || {};

			var objId = _.util.objId;

			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					var property = o[i],
					    propertyType = _.util.type(property);

					if (propertyType === 'Object' && !visited[objId(property)]) {
						visited[objId(property)] = true;
						DFS(property, callback, null, visited);
					}
					else if (propertyType === 'Array' && !visited[objId(property)]) {
						visited[objId(property)] = true;
						DFS(property, callback, i, visited);
					}
				}
			}
		}
	},

	plugins: {},

	/**
	 * This is the most high-level function in Prism’s API.
	 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
	 * each one of them.
	 *
	 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
	 *
	 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
	 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
	 * @memberof Prism
	 * @public
	 */
	highlightAll: function(async, callback) {
		_.highlightAllUnder(document, async, callback);
	},

	/**
	 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
	 * {@link Prism.highlightElement} on each one of them.
	 *
	 * The following hooks will be run:
	 * 1. `before-highlightall`
	 * 2. `before-all-elements-highlight`
	 * 3. All hooks of {@link Prism.highlightElement} for each element.
	 *
	 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
	 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
	 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
	 * @memberof Prism
	 * @public
	 */
	highlightAllUnder: function(container, async, callback) {
		var env = {
			callback: callback,
			container: container,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run('before-highlightall', env);

		env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

		_.hooks.run('before-all-elements-highlight', env);

		for (var i = 0, element; element = env.elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	/**
	 * Highlights the code inside a single element.
	 *
	 * The following hooks will be run:
	 * 1. `before-sanity-check`
	 * 2. `before-highlight`
	 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
	 * 4. `before-insert`
	 * 5. `after-highlight`
	 * 6. `complete`
	 *
	 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
	 * the element's language.
	 *
	 * @param {Element} element The element containing the code.
	 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
	 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
	 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
	 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
	 *
	 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
	 * asynchronous highlighting to work. You can build your own bundle on the
	 * [Download page](https://prismjs.com/download.html).
	 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
	 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
	 * @memberof Prism
	 * @public
	 */
	highlightElement: function(element, async, callback) {
		// Find language
		var language = _.util.getLanguage(element);
		var grammar = _.languages[language];

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		// Set language on the parent, for styling
		var parent = element.parentElement;
		if (parent && parent.nodeName.toLowerCase() === 'pre') {
			parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		function insertHighlightedCode(highlightedCode) {
			env.highlightedCode = highlightedCode;

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
			callback && callback.call(env.element);
		}

		_.hooks.run('before-sanity-check', env);

		if (!env.code) {
			_.hooks.run('complete', env);
			callback && callback.call(env.element);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (!env.grammar) {
			insertHighlightedCode(_.util.encode(env.code));
			return;
		}

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				insertHighlightedCode(evt.data);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
		}
	},

	/**
	 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
	 * and the language definitions to use, and returns a string with the HTML produced.
	 *
	 * The following hooks will be run:
	 * 1. `before-tokenize`
	 * 2. `after-tokenize`
	 * 3. `wrap`: On each {@link Token}.
	 *
	 * @param {string} text A string with the code to be highlighted.
	 * @param {Grammar} grammar An object containing the tokens to use.
	 *
	 * Usually a language definition like `Prism.languages.markup`.
	 * @param {string} language The name of the language definition passed to `grammar`.
	 * @returns {string} The highlighted HTML.
	 * @memberof Prism
	 * @public
	 * @example
	 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
	 */
	highlight: function (text, grammar, language) {
		var env = {
			code: text,
			grammar: grammar,
			language: language
		};
		_.hooks.run('before-tokenize', env);
		env.tokens = _.tokenize(env.code, env.grammar);
		_.hooks.run('after-tokenize', env);
		return Token.stringify(_.util.encode(env.tokens), env.language);
	},

	/**
	 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
	 * and the language definitions to use, and returns an array with the tokenized code.
	 *
	 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
	 *
	 * This method could be useful in other contexts as well, as a very crude parser.
	 *
	 * @param {string} text A string with the code to be highlighted.
	 * @param {Grammar} grammar An object containing the tokens to use.
	 *
	 * Usually a language definition like `Prism.languages.markup`.
	 * @returns {TokenStream} An array of strings and tokens, a token stream.
	 * @memberof Prism
	 * @public
	 * @example
	 * let code = `var foo = 0;`;
	 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
	 * tokens.forEach(token => {
	 *     if (token instanceof Prism.Token && token.type === 'number') {
	 *         console.log(`Found numeric literal: ${token.content}`);
	 *     }
	 * });
	 */
	tokenize: function(text, grammar) {
		var rest = grammar.rest;
		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		var tokenList = new LinkedList();
		addAfter(tokenList, tokenList.head, text);

		matchGrammar(text, tokenList, grammar, tokenList.head, 0);

		return toArray(tokenList);
	},

	/**
	 * @namespace
	 * @memberof Prism
	 * @public
	 */
	hooks: {
		all: {},

		/**
		 * Adds the given callback to the list of callbacks for the given hook.
		 *
		 * The callback will be invoked when the hook it is registered for is run.
		 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
		 *
		 * One callback function can be registered to multiple hooks and the same hook multiple times.
		 *
		 * @param {string} name The name of the hook.
		 * @param {HookCallback} callback The callback function which is given environment variables.
		 * @public
		 */
		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		/**
		 * Runs a hook invoking all registered callbacks with the given environment variables.
		 *
		 * Callbacks will be invoked synchronously and in the order in which they were registered.
		 *
		 * @param {string} name The name of the hook.
		 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
		 * @public
		 */
		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	},

	Token: Token
};
_self.Prism = _;


// Typescript note:
// The following can be used to import the Token type in JSDoc:
//
//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

/**
 * Creates a new token.
 *
 * @param {string} type See {@link Token#type type}
 * @param {string | TokenStream} content See {@link Token#content content}
 * @param {string|string[]} [alias] The alias(es) of the token.
 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
 * @class
 * @global
 * @public
 */
function Token(type, content, alias, matchedStr) {
	/**
	 * The type of the token.
	 *
	 * This is usually the key of a pattern in a {@link Grammar}.
	 *
	 * @type {string}
	 * @see GrammarToken
	 * @public
	 */
	this.type = type;
	/**
	 * The strings or tokens contained by this token.
	 *
	 * This will be a token stream if the pattern matched also defined an `inside` grammar.
	 *
	 * @type {string | TokenStream}
	 * @public
	 */
	this.content = content;
	/**
	 * The alias(es) of the token.
	 *
	 * @type {string|string[]}
	 * @see GrammarToken
	 * @public
	 */
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || '').length | 0;
}

/**
 * A token stream is an array of strings and {@link Token Token} objects.
 *
 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
 * them.
 *
 * 1. No adjacent strings.
 * 2. No empty strings.
 *
 *    The only exception here is the token stream that only contains the empty string and nothing else.
 *
 * @typedef {Array<string | Token>} TokenStream
 * @global
 * @public
 */

/**
 * Converts the given token or token stream to an HTML representation.
 *
 * The following hooks will be run:
 * 1. `wrap`: On each {@link Token}.
 *
 * @param {string | Token | TokenStream} o The token or token stream to be converted.
 * @param {string} language The name of current language.
 * @returns {string} The HTML representation of the token or token stream.
 * @memberof Token
 * @static
 */
Token.stringify = function stringify(o, language) {
	if (typeof o == 'string') {
		return o;
	}
	if (Array.isArray(o)) {
		var s = '';
		o.forEach(function (e) {
			s += stringify(e, language);
		});
		return s;
	}

	var env = {
		type: o.type,
		content: stringify(o.content, language),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language
	};

	var aliases = o.alias;
	if (aliases) {
		if (Array.isArray(aliases)) {
			Array.prototype.push.apply(env.classes, aliases);
		} else {
			env.classes.push(aliases);
		}
	}

	_.hooks.run('wrap', env);

	var attributes = '';
	for (var name in env.attributes) {
		attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
};

/**
 * @param {RegExp} pattern
 * @param {number} pos
 * @param {string} text
 * @param {boolean} lookbehind
 * @returns {RegExpExecArray | null}
 */
function matchPattern(pattern, pos, text, lookbehind) {
	pattern.lastIndex = pos;
	var match = pattern.exec(text);
	if (match && lookbehind && match[1]) {
		// change the match to remove the text matched by the Prism lookbehind group
		var lookbehindLength = match[1].length;
		match.index += lookbehindLength;
		match[0] = match[0].slice(lookbehindLength);
	}
	return match;
}

/**
 * @param {string} text
 * @param {LinkedList<string | Token>} tokenList
 * @param {any} grammar
 * @param {LinkedListNode<string | Token>} startNode
 * @param {number} startPos
 * @param {RematchOptions} [rematch]
 * @returns {void}
 * @private
 *
 * @typedef RematchOptions
 * @property {string} cause
 * @property {number} reach
 */
function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
	for (var token in grammar) {
		if (!grammar.hasOwnProperty(token) || !grammar[token]) {
			continue;
		}

		var patterns = grammar[token];
		patterns = Array.isArray(patterns) ? patterns : [patterns];

		for (var j = 0; j < patterns.length; ++j) {
			if (rematch && rematch.cause == token + ',' + j) {
				return;
			}

			var patternObj = patterns[j],
				inside = patternObj.inside,
				lookbehind = !!patternObj.lookbehind,
				greedy = !!patternObj.greedy,
				alias = patternObj.alias;

			if (greedy && !patternObj.pattern.global) {
				// Without the global flag, lastIndex won't work
				var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
				patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
			}

			/** @type {RegExp} */
			var pattern = patternObj.pattern || patternObj;

			for ( // iterate the token list and keep track of the current token/string position
				var currentNode = startNode.next, pos = startPos;
				currentNode !== tokenList.tail;
				pos += currentNode.value.length, currentNode = currentNode.next
			) {

				if (rematch && pos >= rematch.reach) {
					break;
				}

				var str = currentNode.value;

				if (tokenList.length > text.length) {
					// Something went terribly wrong, ABORT, ABORT!
					return;
				}

				if (str instanceof Token) {
					continue;
				}

				var removeCount = 1; // this is the to parameter of removeBetween
				var match;

				if (greedy) {
					match = matchPattern(pattern, pos, text, lookbehind);
					if (!match) {
						break;
					}

					var from = match.index;
					var to = match.index + match[0].length;
					var p = pos;

					// find the node that contains the match
					p += currentNode.value.length;
					while (from >= p) {
						currentNode = currentNode.next;
						p += currentNode.value.length;
					}
					// adjust pos (and p)
					p -= currentNode.value.length;
					pos = p;

					// the current node is a Token, then the match starts inside another Token, which is invalid
					if (currentNode.value instanceof Token) {
						continue;
					}

					// find the last node which is affected by this match
					for (
						var k = currentNode;
						k !== tokenList.tail && (p < to || typeof k.value === 'string');
						k = k.next
					) {
						removeCount++;
						p += k.value.length;
					}
					removeCount--;

					// replace with the new match
					str = text.slice(pos, p);
					match.index -= pos;
				} else {
					match = matchPattern(pattern, 0, str, lookbehind);
					if (!match) {
						continue;
					}
				}

				var from = match.index,
					matchStr = match[0],
					before = str.slice(0, from),
					after = str.slice(from + matchStr.length);

				var reach = pos + str.length;
				if (rematch && reach > rematch.reach) {
					rematch.reach = reach;
				}

				var removeFrom = currentNode.prev;

				if (before) {
					removeFrom = addAfter(tokenList, removeFrom, before);
					pos += before.length;
				}

				removeRange(tokenList, removeFrom, removeCount);

				var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
				currentNode = addAfter(tokenList, removeFrom, wrapped);

				if (after) {
					addAfter(tokenList, currentNode, after);
				}

				if (removeCount > 1) {
					// at least one Token object was removed, so we have to do some rematching
					// this can only happen if the current pattern is greedy
					matchGrammar(text, tokenList, grammar, currentNode.prev, pos, {
						cause: token + ',' + j,
						reach: reach
					});
				}
			}
		}
	}
}

/**
 * @typedef LinkedListNode
 * @property {T} value
 * @property {LinkedListNode<T> | null} prev The previous node.
 * @property {LinkedListNode<T> | null} next The next node.
 * @template T
 * @private
 */

/**
 * @template T
 * @private
 */
function LinkedList() {
	/** @type {LinkedListNode<T>} */
	var head = { value: null, prev: null, next: null };
	/** @type {LinkedListNode<T>} */
	var tail = { value: null, prev: head, next: null };
	head.next = tail;

	/** @type {LinkedListNode<T>} */
	this.head = head;
	/** @type {LinkedListNode<T>} */
	this.tail = tail;
	this.length = 0;
}

/**
 * Adds a new node with the given value to the list.
 * @param {LinkedList<T>} list
 * @param {LinkedListNode<T>} node
 * @param {T} value
 * @returns {LinkedListNode<T>} The added node.
 * @template T
 */
function addAfter(list, node, value) {
	// assumes that node != list.tail && values.length >= 0
	var next = node.next;

	var newNode = { value: value, prev: node, next: next };
	node.next = newNode;
	next.prev = newNode;
	list.length++;

	return newNode;
}
/**
 * Removes `count` nodes after the given node. The given node will not be removed.
 * @param {LinkedList<T>} list
 * @param {LinkedListNode<T>} node
 * @param {number} count
 * @template T
 */
function removeRange(list, node, count) {
	var next = node.next;
	for (var i = 0; i < count && next !== list.tail; i++) {
		next = next.next;
	}
	node.next = next;
	next.prev = node;
	list.length -= i;
}
/**
 * @param {LinkedList<T>} list
 * @returns {T[]}
 * @template T
 */
function toArray(list) {
	var array = [];
	var node = list.head.next;
	while (node !== list.tail) {
		array.push(node.value);
		node = node.next;
	}
	return array;
}


if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _;
	}

	if (!_.disableWorkerMessageHandler) {
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _;
}

// Get current script and highlight
var script = _.util.currentScript();

if (script) {
	_.filename = script.src;

	if (script.hasAttribute('data-manual')) {
		_.manual = true;
	}
}

function highlightAutomaticallyCallback() {
	if (!_.manual) {
		_.highlightAll();
	}
}

if (!_.manual) {
	// If the document state is "loading", then we'll use DOMContentLoaded.
	// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
	// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
	// might take longer one animation frame to execute which can create a race condition where only some plugins have
	// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
	// See https://github.com/PrismJS/prism/issues/2102
	var readyState = document.readyState;
	if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
		document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
	} else {
		if (window.requestAnimationFrame) {
			window.requestAnimationFrame(highlightAutomaticallyCallback);
		} else {
			window.setTimeout(highlightAutomaticallyCallback, 16);
		}
	}
}

return _;

})(_self);

if (module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof commonjsGlobal !== 'undefined') {
	commonjsGlobal.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
*/

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
*/

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						/"|'/
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;


/* **********************************************
     Begin prism-css.js
********************************************** */

(function (Prism) {

	var string = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': RegExp('[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
		'string': {
			pattern: string,
			greedy: true
		},
		'property': /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
		'important': /!important\b/i,
		'function': /[-a-z0-9]+(?=\()/i,
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');

		Prism.languages.insertBefore('inside', 'attr-value', {
			'style-attr': {
				pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
				lookbehind: true,
				inside: {
					'attr-value': {
						pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
						inside: {
							'style': {
								pattern: /(["'])[\s\S]+(?=["']$)/,
								lookbehind: true,
								alias: 'language-css',
								inside: Prism.languages.css
							},
							'punctuation': [
								{
									pattern: /^=/,
									alias: 'attr-equals'
								},
								/"|'/
							]
						}
					},
					'attr-name': /^style/i
				}
			}
		}, markup.tag);
	}

}(Prism));


/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(?:true|false)\b/,
	'function': /\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|})\s*)(?:catch|finally)\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-flags': /[a-z]+$/,
			'regex-delimiter': /^\/|\/$/
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\${|}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document) {
		return;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var Prism = window.Prism;

	var LOADING_MESSAGE = 'Loading…';
	var FAILURE_MESSAGE = function (status, message) {
		return '✖ Error ' + status + ' while fetching file: ' + message;
	};
	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

	var EXTENSIONS = {
		'js': 'javascript',
		'py': 'python',
		'rb': 'ruby',
		'ps1': 'powershell',
		'psm1': 'powershell',
		'sh': 'bash',
		'bat': 'batch',
		'h': 'c',
		'tex': 'latex'
	};

	var STATUS_ATTR = 'data-src-status';
	var STATUS_LOADING = 'loading';
	var STATUS_LOADED = 'loaded';
	var STATUS_FAILED = 'failed';

	var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
		+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

	var lang = /\blang(?:uage)?-([\w-]+)\b/i;

	/**
	 * Sets the Prism `language-xxxx` or `lang-xxxx` class to the given language.
	 *
	 * @param {HTMLElement} element
	 * @param {string} language
	 * @returns {void}
	 */
	function setLanguageClass(element, language) {
		var className = element.className;
		className = className.replace(lang, ' ') + ' language-' + language;
		element.className = className.replace(/\s+/g, ' ').trim();
	}


	Prism.hooks.add('before-highlightall', function (env) {
		env.selector += ', ' + SELECTOR;
	});

	Prism.hooks.add('before-sanity-check', function (env) {
		var pre = /** @type {HTMLPreElement} */ (env.element);
		if (pre.matches(SELECTOR)) {
			env.code = ''; // fast-path the whole thing and go to complete

			pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

			// add code element with loading message
			var code = pre.appendChild(document.createElement('CODE'));
			code.textContent = LOADING_MESSAGE;

			var src = pre.getAttribute('data-src');

			var language = env.language;
			if (language === 'none') {
				// the language might be 'none' because there is no language set;
				// in this case, we want to use the extension as the language
				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
				language = EXTENSIONS[extension] || extension;
			}

			// set language classes
			setLanguageClass(code, language);
			setLanguageClass(pre, language);

			// preload the language
			var autoloader = Prism.plugins.autoloader;
			if (autoloader) {
				autoloader.loadLanguages(language);
			}

			// load file
			var xhr = new XMLHttpRequest();
			xhr.open('GET', src, true);
			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {
					if (xhr.status < 400 && xhr.responseText) {
						// mark as loaded
						pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

						// highlight code
						code.textContent = xhr.responseText;
						Prism.highlightElement(code);

					} else {
						// mark as failed
						pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

						if (xhr.status >= 400) {
							code.textContent = FAILURE_MESSAGE(xhr.status, xhr.statusText);
						} else {
							code.textContent = FAILURE_EMPTY_MESSAGE;
						}
					}
				}
			};
			xhr.send(null);
		}
	});

	Prism.plugins.fileHighlight = {
		/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */
		highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR);

			for (var i = 0, element; element = elements[i++];) {
				Prism.highlightElement(element);
			}
		}
	};

	var logged = false;
	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
	Prism.fileHighlight = function () {
		if (!logged) {
			console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
			logged = true;
		}
		Prism.plugins.fileHighlight.highlight.apply(this, arguments);
	};

})();
});

(function(Prism) {
	// $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
	// + LC_ALL, RANDOM, REPLY, SECONDS.
	// + make sure PS1..4 are here as they are not always set,
	// - some useless things.
	var envVars = '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b';

	var commandAfterHeredoc = {
		pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
		lookbehind: true,
		alias: 'punctuation', // this looks reasonably well in all themes
		inside: null // see below
	};

	var insideString = {
		'bash': commandAfterHeredoc,
		'environment': {
			pattern: RegExp("\\$" + envVars),
			alias: 'constant'
		},
		'variable': [
			// [0]: Arithmetic Environment
			{
				pattern: /\$?\(\([\s\S]+?\)\)/,
				greedy: true,
				inside: {
					// If there is a $ sign at the beginning highlight $(( and )) as variable
					'variable': [
						{
							pattern: /(^\$\(\([\s\S]+)\)\)/,
							lookbehind: true
						},
						/^\$\(\(/
					],
					'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
					// Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
					'operator': /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
					// If there is no $ sign at the beginning highlight (( and )) as punctuation
					'punctuation': /\(\(?|\)\)?|,|;/
				}
			},
			// [1]: Command Substitution
			{
				pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
				greedy: true,
				inside: {
					'variable': /^\$\(|^`|\)$|`$/
				}
			},
			// [2]: Brace expansion
			{
				pattern: /\$\{[^}]+\}/,
				greedy: true,
				inside: {
					'operator': /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
					'punctuation': /[\[\]]/,
					'environment': {
						pattern: RegExp("(\\{)" + envVars),
						lookbehind: true,
						alias: 'constant'
					}
				}
			},
			/\$(?:\w+|[#?*!@$])/
		],
		// Escape sequences from echo and printf's manuals, and escaped quotes.
		'entity': /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
	};

	Prism.languages.bash = {
		'shebang': {
			pattern: /^#!\s*\/.*/,
			alias: 'important'
		},
		'comment': {
			pattern: /(^|[^"{\\$])#.*/,
			lookbehind: true
		},
		'function-name': [
			// a) function foo {
			// b) foo() {
			// c) function foo() {
			// but not “foo {”
			{
				// a) and c)
				pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
				lookbehind: true,
				alias: 'function'
			},
			{
				// b)
				pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
				alias: 'function'
			}
		],
		// Highlight variable names as variables in for and select beginnings.
		'for-or-select': {
			pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
			alias: 'variable',
			lookbehind: true
		},
		// Highlight variable names as variables in the left-hand part
		// of assignments (“=” and “+=”).
		'assign-left': {
			pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
			inside: {
				'environment': {
					pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + envVars),
					lookbehind: true,
					alias: 'constant'
				}
			},
			alias: 'variable',
			lookbehind: true
		},
		'string': [
			// Support for Here-documents https://en.wikipedia.org/wiki/Here_document
			{
				pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s[\s\S]*?(?:\r?\n|\r)\2/,
				lookbehind: true,
				greedy: true,
				inside: insideString
			},
			// Here-document with quotes around the tag
			// → No expansion (so no “inside”).
			{
				pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
				lookbehind: true,
				greedy: true,
				inside: {
					'bash': commandAfterHeredoc
				}
			},
			// “Normal” string
			{
				pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|(?!\2)[^\\`$])*\2/,
				lookbehind: true,
				greedy: true,
				inside: insideString
			}
		],
		'environment': {
			pattern: RegExp("\\$?" + envVars),
			alias: 'constant'
		},
		'variable': insideString.variable,
		'function': {
			pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
			lookbehind: true
		},
		'keyword': {
			pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
			lookbehind: true
		},
		// https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
		'builtin': {
			pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
			lookbehind: true,
			// Alias added to make those easier to distinguish from strings.
			alias: 'class-name'
		},
		'boolean': {
			pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
			lookbehind: true
		},
		'file-descriptor': {
			pattern: /\B&\d\b/,
			alias: 'important'
		},
		'operator': {
			// Lots of redirections here, but not just that.
			pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
			inside: {
				'file-descriptor': {
					pattern: /^\d/,
					alias: 'important'
				}
			}
		},
		'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
		'number': {
			pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
			lookbehind: true
		}
	};

	commandAfterHeredoc.inside = Prism.languages.bash;

	/* Patterns in command substitution. */
	var toBeCopied = [
		'comment',
		'function-name',
		'for-or-select',
		'assign-left',
		'string',
		'environment',
		'function',
		'keyword',
		'builtin',
		'boolean',
		'file-descriptor',
		'operator',
		'punctuation',
		'number'
	];
	var inside = insideString.variable[1].inside;
	for(var i = 0; i < toBeCopied.length; i++) {
		inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]];
	}

	Prism.languages.shell = Prism.languages.bash;
})(Prism);

(function (Prism) {

	Prism.languages.diff = {
		'coord': [
			// Match all kinds of coord lines (prefixed by "+++", "---" or "***").
			/^(?:\*{3}|-{3}|\+{3}).*$/m,
			// Match "@@ ... @@" coord lines in unified diff.
			/^@@.*@@$/m,
			// Match coord lines in normal diff (starts with a number).
			/^\d.*$/m
		]

		// deleted, inserted, unchanged, diff
	};

	/**
	 * A map from the name of a block to its line prefix.
	 *
	 * @type {Object<string, string>}
	 */
	var PREFIXES = {
		'deleted-sign': '-',
		'deleted-arrow': '<',
		'inserted-sign': '+',
		'inserted-arrow': '>',
		'unchanged': ' ',
		'diff': '!',
	};

	// add a token for each prefix
	Object.keys(PREFIXES).forEach(function (name) {
		var prefix = PREFIXES[name];

		var alias = [];
		if (!/^\w+$/.test(name)) { // "deleted-sign" -> "deleted"
			alias.push(/\w+/.exec(name)[0]);
		}
		if (name === "diff") {
			alias.push("bold");
		}

		Prism.languages.diff[name] = {
			pattern: RegExp('^(?:[' + prefix + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'),
			alias: alias,
			inside: {
				'line': {
					pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
					lookbehind: true
				},
				'prefix': {
					pattern: /[\s\S]/,
					alias: /\w+/.exec(name)[0]
				}
			}
		};

	});

	// make prefixes available to Diff plugin
	Object.defineProperty(Prism.languages.diff, 'PREFIXES', {
		value: PREFIXES
	});

}(Prism));

const blocks = '(if|else if|await|then|catch|each|html|debug)';

Prism.languages.svelte = Prism.languages.extend('markup', {
	each: {
		pattern: new RegExp(
			'{[#/]each' +
				'(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}'
		),
		inside: {
			'language-javascript': [
				{
					pattern: /(as[\s\S]*)\([\s\S]*\)(?=\s*\})/,
					lookbehind: true,
					inside: Prism.languages['javascript'],
				},
				{
					pattern: /(as[\s]*)[\s\S]*(?=\s*)/,
					lookbehind: true,
					inside: Prism.languages['javascript'],
				},
				{
					pattern: /(#each[\s]*)[\s\S]*(?=as)/,
					lookbehind: true,
					inside: Prism.languages['javascript'],
				},
			],
			keyword: /[#/]each|as/,
			punctuation: /{|}/,
		},
	},
	block: {
		pattern: new RegExp(
			'{[#:/@]/s' +
				blocks +
				'(?:(?:\\{(?:(?:\\{(?:[^{}])*\\})|(?:[^{}]))*\\})|(?:[^{}]))*}'
		),
		inside: {
			punctuation: /^{|}$/,
			keyword: [new RegExp('[#:/@]' + blocks + '( )*'), /as/, /then/],
			'language-javascript': {
				pattern: /[\s\S]*/,
				inside: Prism.languages['javascript'],
			},
		},
	},
	tag: {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?:"[^"]*"|'[^']*'|{[\s\S]+?}(?=[\s/>])))|(?=[\s/>])))+)?\s*\/?>/i,
		greedy: true,
		inside: {
			tag: {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					punctuation: /^<\/?/,
					namespace: /^[^\s>\/:]+:/,
				},
			},
			'language-javascript': {
				pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
				inside: Prism.languages['javascript'],
			},
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
				inside: {
					punctuation: [
						/^=/,
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true,
						},
					],
					'language-javascript': {
						pattern: /{[\s\S]+}/,
						inside: Prism.languages['javascript'],
					},
				},
			},
			punctuation: /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					namespace: /^[^\s>\/:]+:/,
				},
			},
		},
	},
	'language-javascript': {
		pattern: /\{(?:(?:\{(?:(?:\{(?:[^{}])*\})|(?:[^{}]))*\})|(?:[^{}]))*\}/,
		lookbehind: true,
		inside: Prism.languages['javascript'],
	},
});

Prism.languages.svelte['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.svelte['entity'];

Prism.hooks.add('wrap', env => {
	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.svelte.tag, 'addInlined', {
	value: function addInlined(tagName, lang) {
		const includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang],
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		const inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside,
			},
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang],
		};

		const def = {};
		def[tagName] = {
			pattern: RegExp(
				/(<__[\s\S]*?>)(?:<!\[CDATA\[[\s\S]*?\]\]>\s*|[\s\S])*?(?=<\/__>)/.source.replace(
					/__/g,
					tagName
				),
				'i'
			),
			lookbehind: true,
			greedy: true,
			inside,
		};

		Prism.languages.insertBefore('svelte', 'cdata', def);
	},
});

Prism.languages.svelte.tag.addInlined('style', 'css');
Prism.languages.svelte.tag.addInlined('script', 'javascript');

var LanguageMap; (function (LanguageMap) {
	const bash = "bash"; LanguageMap["bash"] = bash;
	const html = "markup"; LanguageMap["html"] = html;
	const sv = "svelte"; LanguageMap["sv"] = sv;
	const js = "javascript"; LanguageMap["js"] = js;
	const css = "css"; LanguageMap["css"] = css;
	const diff = "diff"; LanguageMap["diff"] = diff;
	LanguageMap[""] = "";
})(LanguageMap || (LanguageMap = {}));

/**
 * Custom highlighting for code blocks using PrismJS.
 */
function highlight(source, lang) {
	const plang = lang === "" ? "" : LanguageMap[lang];
	const highlighted = plang
		? prism.highlight(source, prism.languages[plang], lang)
		: source.replace(
				/[&<>]/g,
				(c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])
		  );

	return `<div class="code-block"><pre class='language-${plang}'><code>${highlighted}</code></pre></div>`;
}

/**
 * Custom highlighting for code blocks using PrismJS.
 */
function highight_code_block() {
	return function transformer(tree) {
		unistUtilVisit(tree, "code", (node) => {
			node.value = highlight(node.value, node.lang );
			//@ts-ignore
			node.data = {};
			// data.code_block is set so we can differentiate between code blocks and other raw nodes
			// this is utilised in a rehype plugin later in the pipeline (split-view)
			// retaining this metadata requires a custom handler for raw nodes when converting MDAST -> HAST
			node.data.code_block = true;
			((node ) ).type = "html";
		});
	};
}

/*! js-yaml 4.0.0 https://github.com/nodeca/js-yaml @license MIT */
function isNothing(subject) {
  return (typeof subject === 'undefined') || (subject === null);
}


function isObject(subject) {
  return (typeof subject === 'object') && (subject !== null);
}


function toArray(sequence) {
  if (Array.isArray(sequence)) return sequence;
  else if (isNothing(sequence)) return [];

  return [ sequence ];
}


function extend(target, source) {
  var index, length, key, sourceKeys;

  if (source) {
    sourceKeys = Object.keys(source);

    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
      key = sourceKeys[index];
      target[key] = source[key];
    }
  }

  return target;
}


function repeat(string, count) {
  var result = '', cycle;

  for (cycle = 0; cycle < count; cycle += 1) {
    result += string;
  }

  return result;
}


function isNegativeZero(number) {
  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
}


var isNothing_1      = isNothing;
var isObject_1       = isObject;
var toArray_1        = toArray;
var repeat_1         = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1         = extend;

var common = {
	isNothing: isNothing_1,
	isObject: isObject_1,
	toArray: toArray_1,
	repeat: repeat_1,
	isNegativeZero: isNegativeZero_1,
	extend: extend_1
};

// YAML error class. http://stackoverflow.com/questions/8458984


function formatError(exception, compact) {
  var where = '', message = exception.reason || '(unknown reason)';

  if (!exception.mark) return message;

  if (exception.mark.name) {
    where += 'in "' + exception.mark.name + '" ';
  }

  where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';

  if (!compact && exception.mark.snippet) {
    where += '\n\n' + exception.mark.snippet;
  }

  return message + ' ' + where;
}


function YAMLException(reason, mark) {
  // Super constructor
  Error.call(this);

  this.name = 'YAMLException';
  this.reason = reason;
  this.mark = mark;
  this.message = formatError(this, false);

  // Include stack trace in error object
  if (Error.captureStackTrace) {
    // Chrome and NodeJS
    Error.captureStackTrace(this, this.constructor);
  } else {
    // FF, IE 10+ and Safari 6+. Fallback for others
    this.stack = (new Error()).stack || '';
  }
}


// Inherit from Error
YAMLException.prototype = Object.create(Error.prototype);
YAMLException.prototype.constructor = YAMLException;


YAMLException.prototype.toString = function toString(compact) {
  return this.name + ': ' + formatError(this, compact);
};


var exception = YAMLException;

// get snippet for a single line, respecting maxLength
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
  var head = '';
  var tail = '';
  var maxHalfLength = Math.floor(maxLineLength / 2) - 1;

  if (position - lineStart > maxHalfLength) {
    head = ' ... ';
    lineStart = position - maxHalfLength + head.length;
  }

  if (lineEnd - position > maxHalfLength) {
    tail = ' ...';
    lineEnd = position + maxHalfLength - tail.length;
  }

  return {
    str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, '→') + tail,
    pos: position - lineStart + head.length // relative position
  };
}


function padStart(string, max) {
  return common.repeat(' ', max - string.length) + string;
}


function makeSnippet(mark, options) {
  options = Object.create(options || null);

  if (!mark.buffer) return null;

  if (!options.maxLength) options.maxLength = 79;
  if (typeof options.indent      !== 'number') options.indent      = 1;
  if (typeof options.linesBefore !== 'number') options.linesBefore = 3;
  if (typeof options.linesAfter  !== 'number') options.linesAfter  = 2;

  var re = /\r?\n|\r|\0/g;
  var lineStarts = [ 0 ];
  var lineEnds = [];
  var match;
  var foundLineNo = -1;

  while ((match = re.exec(mark.buffer))) {
    lineEnds.push(match.index);
    lineStarts.push(match.index + match[0].length);

    if (mark.position <= match.index && foundLineNo < 0) {
      foundLineNo = lineStarts.length - 2;
    }
  }

  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;

  var result = '', i, line;
  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);

  for (i = 1; i <= options.linesBefore; i++) {
    if (foundLineNo - i < 0) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo - i],
      lineEnds[foundLineNo - i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
      maxLineLength
    );
    result = common.repeat(' ', options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) +
      ' | ' + line.str + '\n' + result;
  }

  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
  result += common.repeat(' ', options.indent) + padStart((mark.line + 1).toString(), lineNoLength) +
    ' | ' + line.str + '\n';
  result += common.repeat('-', options.indent + lineNoLength + 3 + line.pos) + '^' + '\n';

  for (i = 1; i <= options.linesAfter; i++) {
    if (foundLineNo + i >= lineEnds.length) break;
    line = getLine(
      mark.buffer,
      lineStarts[foundLineNo + i],
      lineEnds[foundLineNo + i],
      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
      maxLineLength
    );
    result += common.repeat(' ', options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) +
      ' | ' + line.str + '\n';
  }

  return result.replace(/\n$/, '');
}


var snippet = makeSnippet;

var TYPE_CONSTRUCTOR_OPTIONS = [
  'kind',
  'multi',
  'resolve',
  'construct',
  'instanceOf',
  'predicate',
  'represent',
  'representName',
  'defaultStyle',
  'styleAliases'
];

var YAML_NODE_KINDS = [
  'scalar',
  'sequence',
  'mapping'
];

function compileStyleAliases(map) {
  var result = {};

  if (map !== null) {
    Object.keys(map).forEach(function (style) {
      map[style].forEach(function (alias) {
        result[String(alias)] = style;
      });
    });
  }

  return result;
}

function Type(tag, options) {
  options = options || {};

  Object.keys(options).forEach(function (name) {
    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
      throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
    }
  });

  // TODO: Add tag format check.
  this.tag           = tag;
  this.kind          = options['kind']          || null;
  this.resolve       = options['resolve']       || function () { return true; };
  this.construct     = options['construct']     || function (data) { return data; };
  this.instanceOf    = options['instanceOf']    || null;
  this.predicate     = options['predicate']     || null;
  this.represent     = options['represent']     || null;
  this.representName = options['representName'] || null;
  this.defaultStyle  = options['defaultStyle']  || null;
  this.multi         = options['multi']         || false;
  this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);

  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
    throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
  }
}

var type = Type;

/*eslint-disable max-len*/





function compileList(schema, name, result) {
  var exclude = [];

  schema[name].forEach(function (currentType) {
    result.forEach(function (previousType, previousIndex) {
      if (previousType.tag === currentType.tag &&
          previousType.kind === currentType.kind &&
          previousType.multi === currentType.multi) {

        exclude.push(previousIndex);
      }
    });

    result.push(currentType);
  });

  return result.filter(function (type, index) {
    return exclude.indexOf(index) === -1;
  });
}


function compileMap(/* lists... */) {
  var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
          scalar: [],
          sequence: [],
          mapping: [],
          fallback: []
        }
      }, index, length;

  function collectType(type) {
    if (type.multi) {
      result.multi[type.kind].push(type);
      result.multi['fallback'].push(type);
    } else {
      result[type.kind][type.tag] = result['fallback'][type.tag] = type;
    }
  }

  for (index = 0, length = arguments.length; index < length; index += 1) {
    arguments[index].forEach(collectType);
  }
  return result;
}


function Schema(definition) {
  return this.extend(definition);
}


Schema.prototype.extend = function extend(definition) {
  var implicit = [];
  var explicit = [];

  if (definition instanceof type) {
    // Schema.extend(type)
    explicit.push(definition);

  } else if (Array.isArray(definition)) {
    // Schema.extend([ type1, type2, ... ])
    explicit = explicit.concat(definition);

  } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
    // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
    if (definition.implicit) implicit = implicit.concat(definition.implicit);
    if (definition.explicit) explicit = explicit.concat(definition.explicit);

  } else {
    throw new exception('Schema.extend argument should be a Type, [ Type ], ' +
      'or a schema definition ({ implicit: [...], explicit: [...] })');
  }

  implicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }

    if (type$1.loadKind && type$1.loadKind !== 'scalar') {
      throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
    }

    if (type$1.multi) {
      throw new exception('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
    }
  });

  explicit.forEach(function (type$1) {
    if (!(type$1 instanceof type)) {
      throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
    }
  });

  var result = Object.create(Schema.prototype);

  result.implicit = (this.implicit || []).concat(implicit);
  result.explicit = (this.explicit || []).concat(explicit);

  result.compiledImplicit = compileList(result, 'implicit', []);
  result.compiledExplicit = compileList(result, 'explicit', []);
  result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);

  return result;
};


var schema = Schema;

var str = new type('tag:yaml.org,2002:str', {
  kind: 'scalar',
  construct: function (data) { return data !== null ? data : ''; }
});

var seq = new type('tag:yaml.org,2002:seq', {
  kind: 'sequence',
  construct: function (data) { return data !== null ? data : []; }
});

var map = new type('tag:yaml.org,2002:map', {
  kind: 'mapping',
  construct: function (data) { return data !== null ? data : {}; }
});

var failsafe = new schema({
  explicit: [
    str,
    seq,
    map
  ]
});

function resolveYamlNull(data) {
  if (data === null) return true;

  var max = data.length;

  return (max === 1 && data === '~') ||
         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
}

function constructYamlNull() {
  return null;
}

function isNull(object) {
  return object === null;
}

var _null = new type('tag:yaml.org,2002:null', {
  kind: 'scalar',
  resolve: resolveYamlNull,
  construct: constructYamlNull,
  predicate: isNull,
  represent: {
    canonical: function () { return '~';    },
    lowercase: function () { return 'null'; },
    uppercase: function () { return 'NULL'; },
    camelcase: function () { return 'Null'; },
    empty:     function () { return '';     }
  },
  defaultStyle: 'lowercase'
});

function resolveYamlBoolean(data) {
  if (data === null) return false;

  var max = data.length;

  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
}

function constructYamlBoolean(data) {
  return data === 'true' ||
         data === 'True' ||
         data === 'TRUE';
}

function isBoolean(object) {
  return Object.prototype.toString.call(object) === '[object Boolean]';
}

var bool = new type('tag:yaml.org,2002:bool', {
  kind: 'scalar',
  resolve: resolveYamlBoolean,
  construct: constructYamlBoolean,
  predicate: isBoolean,
  represent: {
    lowercase: function (object) { return object ? 'true' : 'false'; },
    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
    camelcase: function (object) { return object ? 'True' : 'False'; }
  },
  defaultStyle: 'lowercase'
});

function isHexCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
}

function isOctCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
}

function isDecCode(c) {
  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
}

function resolveYamlInteger(data) {
  if (data === null) return false;

  var max = data.length,
      index = 0,
      hasDigits = false,
      ch;

  if (!max) return false;

  ch = data[index];

  // sign
  if (ch === '-' || ch === '+') {
    ch = data[++index];
  }

  if (ch === '0') {
    // 0
    if (index + 1 === max) return true;
    ch = data[++index];

    // base 2, base 8, base 16

    if (ch === 'b') {
      // base 2
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (ch !== '0' && ch !== '1') return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'x') {
      // base 16
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isHexCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }


    if (ch === 'o') {
      // base 8
      index++;

      for (; index < max; index++) {
        ch = data[index];
        if (ch === '_') continue;
        if (!isOctCode(data.charCodeAt(index))) return false;
        hasDigits = true;
      }
      return hasDigits && ch !== '_';
    }
  }

  // base 10 (except 0)

  // value should not start with `_`;
  if (ch === '_') return false;

  for (; index < max; index++) {
    ch = data[index];
    if (ch === '_') continue;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }

  // Should have digits and should not end with `_`
  if (!hasDigits || ch === '_') return false;

  return true;
}

function constructYamlInteger(data) {
  var value = data, sign = 1, ch;

  if (value.indexOf('_') !== -1) {
    value = value.replace(/_/g, '');
  }

  ch = value[0];

  if (ch === '-' || ch === '+') {
    if (ch === '-') sign = -1;
    value = value.slice(1);
    ch = value[0];
  }

  if (value === '0') return 0;

  if (ch === '0') {
    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
    if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
    if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
  }

  return sign * parseInt(value, 10);
}

function isInteger(object) {
  return (Object.prototype.toString.call(object)) === '[object Number]' &&
         (object % 1 === 0 && !common.isNegativeZero(object));
}

var int = new type('tag:yaml.org,2002:int', {
  kind: 'scalar',
  resolve: resolveYamlInteger,
  construct: constructYamlInteger,
  predicate: isInteger,
  represent: {
    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
    octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
    decimal:     function (obj) { return obj.toString(10); },
    /* eslint-disable max-len */
    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
  },
  defaultStyle: 'decimal',
  styleAliases: {
    binary:      [ 2,  'bin' ],
    octal:       [ 8,  'oct' ],
    decimal:     [ 10, 'dec' ],
    hexadecimal: [ 16, 'hex' ]
  }
});

var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');

function resolveYamlFloat(data) {
  if (data === null) return false;

  if (!YAML_FLOAT_PATTERN.test(data) ||
      // Quick hack to not allow integers end with `_`
      // Probably should update regexp & check speed
      data[data.length - 1] === '_') {
    return false;
  }

  return true;
}

function constructYamlFloat(data) {
  var value, sign;

  value  = data.replace(/_/g, '').toLowerCase();
  sign   = value[0] === '-' ? -1 : 1;

  if ('+-'.indexOf(value[0]) >= 0) {
    value = value.slice(1);
  }

  if (value === '.inf') {
    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

  } else if (value === '.nan') {
    return NaN;
  }
  return sign * parseFloat(value, 10);
}


var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;

function representYamlFloat(object, style) {
  var res;

  if (isNaN(object)) {
    switch (style) {
      case 'lowercase': return '.nan';
      case 'uppercase': return '.NAN';
      case 'camelcase': return '.NaN';
    }
  } else if (Number.POSITIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '.inf';
      case 'uppercase': return '.INF';
      case 'camelcase': return '.Inf';
    }
  } else if (Number.NEGATIVE_INFINITY === object) {
    switch (style) {
      case 'lowercase': return '-.inf';
      case 'uppercase': return '-.INF';
      case 'camelcase': return '-.Inf';
    }
  } else if (common.isNegativeZero(object)) {
    return '-0.0';
  }

  res = object.toString(10);

  // JS stringifier can build scientific format without dots: 5e-100,
  // while YAML requres dot: 5.e-100. Fix it with simple hack

  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
}

function isFloat(object) {
  return (Object.prototype.toString.call(object) === '[object Number]') &&
         (object % 1 !== 0 || common.isNegativeZero(object));
}

var float = new type('tag:yaml.org,2002:float', {
  kind: 'scalar',
  resolve: resolveYamlFloat,
  construct: constructYamlFloat,
  predicate: isFloat,
  represent: representYamlFloat,
  defaultStyle: 'lowercase'
});

var json = failsafe.extend({
  implicit: [
    _null,
    bool,
    int,
    float
  ]
});

var core = json;

var YAML_DATE_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9])'                    + // [2] month
  '-([0-9][0-9])$');                   // [3] day

var YAML_TIMESTAMP_REGEXP = new RegExp(
  '^([0-9][0-9][0-9][0-9])'          + // [1] year
  '-([0-9][0-9]?)'                   + // [2] month
  '-([0-9][0-9]?)'                   + // [3] day
  '(?:[Tt]|[ \\t]+)'                 + // ...
  '([0-9][0-9]?)'                    + // [4] hour
  ':([0-9][0-9])'                    + // [5] minute
  ':([0-9][0-9])'                    + // [6] second
  '(?:\\.([0-9]*))?'                 + // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

function resolveYamlTimestamp(data) {
  if (data === null) return false;
  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
  return false;
}

function constructYamlTimestamp(data) {
  var match, year, month, day, hour, minute, second, fraction = 0,
      delta = null, tz_hour, tz_minute, date;

  match = YAML_DATE_REGEXP.exec(data);
  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

  if (match === null) throw new Error('Date resolve error');

  // match: [1] year [2] month [3] day

  year = +(match[1]);
  month = +(match[2]) - 1; // JS month starts with 0
  day = +(match[3]);

  if (!match[4]) { // no hour
    return new Date(Date.UTC(year, month, day));
  }

  // match: [4] hour [5] minute [6] second [7] fraction

  hour = +(match[4]);
  minute = +(match[5]);
  second = +(match[6]);

  if (match[7]) {
    fraction = match[7].slice(0, 3);
    while (fraction.length < 3) { // milli-seconds
      fraction += '0';
    }
    fraction = +fraction;
  }

  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

  if (match[9]) {
    tz_hour = +(match[10]);
    tz_minute = +(match[11] || 0);
    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
    if (match[9] === '-') delta = -delta;
  }

  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));

  if (delta) date.setTime(date.getTime() - delta);

  return date;
}

function representYamlTimestamp(object /*, style*/) {
  return object.toISOString();
}

var timestamp = new type('tag:yaml.org,2002:timestamp', {
  kind: 'scalar',
  resolve: resolveYamlTimestamp,
  construct: constructYamlTimestamp,
  instanceOf: Date,
  represent: representYamlTimestamp
});

function resolveYamlMerge(data) {
  return data === '<<' || data === null;
}

var merge = new type('tag:yaml.org,2002:merge', {
  kind: 'scalar',
  resolve: resolveYamlMerge
});

/*eslint-disable no-bitwise*/





// [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


function resolveYamlBinary(data) {
  if (data === null) return false;

  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

  // Convert one by one.
  for (idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));

    // Skip CR/LF
    if (code > 64) continue;

    // Fail on illegal characters
    if (code < 0) return false;

    bitlen += 6;
  }

  // If there are any bits left, source was corrupted
  return (bitlen % 8) === 0;
}

function constructYamlBinary(data) {
  var idx, tailbits,
      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

  // Collect by 6*4 bits (3 bytes)

  for (idx = 0; idx < max; idx++) {
    if ((idx % 4 === 0) && idx) {
      result.push((bits >> 16) & 0xFF);
      result.push((bits >> 8) & 0xFF);
      result.push(bits & 0xFF);
    }

    bits = (bits << 6) | map.indexOf(input.charAt(idx));
  }

  // Dump tail

  tailbits = (max % 4) * 6;

  if (tailbits === 0) {
    result.push((bits >> 16) & 0xFF);
    result.push((bits >> 8) & 0xFF);
    result.push(bits & 0xFF);
  } else if (tailbits === 18) {
    result.push((bits >> 10) & 0xFF);
    result.push((bits >> 2) & 0xFF);
  } else if (tailbits === 12) {
    result.push((bits >> 4) & 0xFF);
  }

  return new Uint8Array(result);
}

function representYamlBinary(object /*, style*/) {
  var result = '', bits = 0, idx, tail,
      max = object.length,
      map = BASE64_MAP;

  // Convert every three bytes to 4 ASCII characters.

  for (idx = 0; idx < max; idx++) {
    if ((idx % 3 === 0) && idx) {
      result += map[(bits >> 18) & 0x3F];
      result += map[(bits >> 12) & 0x3F];
      result += map[(bits >> 6) & 0x3F];
      result += map[bits & 0x3F];
    }

    bits = (bits << 8) + object[idx];
  }

  // Dump tail

  tail = max % 3;

  if (tail === 0) {
    result += map[(bits >> 18) & 0x3F];
    result += map[(bits >> 12) & 0x3F];
    result += map[(bits >> 6) & 0x3F];
    result += map[bits & 0x3F];
  } else if (tail === 2) {
    result += map[(bits >> 10) & 0x3F];
    result += map[(bits >> 4) & 0x3F];
    result += map[(bits << 2) & 0x3F];
    result += map[64];
  } else if (tail === 1) {
    result += map[(bits >> 2) & 0x3F];
    result += map[(bits << 4) & 0x3F];
    result += map[64];
    result += map[64];
  }

  return result;
}

function isBinary(obj) {
  return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
}

var binary = new type('tag:yaml.org,2002:binary', {
  kind: 'scalar',
  resolve: resolveYamlBinary,
  construct: constructYamlBinary,
  predicate: isBinary,
  represent: representYamlBinary
});

var _hasOwnProperty = Object.prototype.hasOwnProperty;
var _toString       = Object.prototype.toString;

function resolveYamlOmap(data) {
  if (data === null) return true;

  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
      object = data;

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];
    pairHasKey = false;

    if (_toString.call(pair) !== '[object Object]') return false;

    for (pairKey in pair) {
      if (_hasOwnProperty.call(pair, pairKey)) {
        if (!pairHasKey) pairHasKey = true;
        else return false;
      }
    }

    if (!pairHasKey) return false;

    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
    else return false;
  }

  return true;
}

function constructYamlOmap(data) {
  return data !== null ? data : [];
}

var omap = new type('tag:yaml.org,2002:omap', {
  kind: 'sequence',
  resolve: resolveYamlOmap,
  construct: constructYamlOmap
});

var _toString$1 = Object.prototype.toString;

function resolveYamlPairs(data) {
  if (data === null) return true;

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    if (_toString$1.call(pair) !== '[object Object]') return false;

    keys = Object.keys(pair);

    if (keys.length !== 1) return false;

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return true;
}

function constructYamlPairs(data) {
  if (data === null) return [];

  var index, length, pair, keys, result,
      object = data;

  result = new Array(object.length);

  for (index = 0, length = object.length; index < length; index += 1) {
    pair = object[index];

    keys = Object.keys(pair);

    result[index] = [ keys[0], pair[keys[0]] ];
  }

  return result;
}

var pairs = new type('tag:yaml.org,2002:pairs', {
  kind: 'sequence',
  resolve: resolveYamlPairs,
  construct: constructYamlPairs
});

var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;

function resolveYamlSet(data) {
  if (data === null) return true;

  var key, object = data;

  for (key in object) {
    if (_hasOwnProperty$1.call(object, key)) {
      if (object[key] !== null) return false;
    }
  }

  return true;
}

function constructYamlSet(data) {
  return data !== null ? data : {};
}

var set = new type('tag:yaml.org,2002:set', {
  kind: 'mapping',
  resolve: resolveYamlSet,
  construct: constructYamlSet
});

var _default = core.extend({
  implicit: [
    timestamp,
    merge
  ],
  explicit: [
    binary,
    omap,
    pairs,
    set
  ]
});

/*eslint-disable max-len,no-use-before-define*/







var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;


var CONTEXT_FLOW_IN   = 1;
var CONTEXT_FLOW_OUT  = 2;
var CONTEXT_BLOCK_IN  = 3;
var CONTEXT_BLOCK_OUT = 4;


var CHOMPING_CLIP  = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP  = 3;


var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


function _class(obj) { return Object.prototype.toString.call(obj); }

function is_EOL(c) {
  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
}

function is_WHITE_SPACE(c) {
  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
}

function is_WS_OR_EOL(c) {
  return (c === 0x09/* Tab */) ||
         (c === 0x20/* Space */) ||
         (c === 0x0A/* LF */) ||
         (c === 0x0D/* CR */);
}

function is_FLOW_INDICATOR(c) {
  return c === 0x2C/* , */ ||
         c === 0x5B/* [ */ ||
         c === 0x5D/* ] */ ||
         c === 0x7B/* { */ ||
         c === 0x7D/* } */;
}

function fromHexCode(c) {
  var lc;

  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  /*eslint-disable no-bitwise*/
  lc = c | 0x20;

  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
    return lc - 0x61 + 10;
  }

  return -1;
}

function escapedHexLen(c) {
  if (c === 0x78/* x */) { return 2; }
  if (c === 0x75/* u */) { return 4; }
  if (c === 0x55/* U */) { return 8; }
  return 0;
}

function fromDecimalCode(c) {
  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
    return c - 0x30;
  }

  return -1;
}

function simpleEscapeSequence(c) {
  /* eslint-disable indent */
  return (c === 0x30/* 0 */) ? '\x00' :
        (c === 0x61/* a */) ? '\x07' :
        (c === 0x62/* b */) ? '\x08' :
        (c === 0x74/* t */) ? '\x09' :
        (c === 0x09/* Tab */) ? '\x09' :
        (c === 0x6E/* n */) ? '\x0A' :
        (c === 0x76/* v */) ? '\x0B' :
        (c === 0x66/* f */) ? '\x0C' :
        (c === 0x72/* r */) ? '\x0D' :
        (c === 0x65/* e */) ? '\x1B' :
        (c === 0x20/* Space */) ? ' ' :
        (c === 0x22/* " */) ? '\x22' :
        (c === 0x2F/* / */) ? '/' :
        (c === 0x5C/* \ */) ? '\x5C' :
        (c === 0x4E/* N */) ? '\x85' :
        (c === 0x5F/* _ */) ? '\xA0' :
        (c === 0x4C/* L */) ? '\u2028' :
        (c === 0x50/* P */) ? '\u2029' : '';
}

function charFromCodepoint(c) {
  if (c <= 0xFFFF) {
    return String.fromCharCode(c);
  }
  // Encode UTF-16 surrogate pair
  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
  return String.fromCharCode(
    ((c - 0x010000) >> 10) + 0xD800,
    ((c - 0x010000) & 0x03FF) + 0xDC00
  );
}

var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for (var i = 0; i < 256; i++) {
  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
  simpleEscapeMap[i] = simpleEscapeSequence(i);
}


function State(input, options) {
  this.input = input;

  this.filename  = options['filename']  || null;
  this.schema    = options['schema']    || _default;
  this.onWarning = options['onWarning'] || null;
  // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
  // if such documents have no explicit %YAML directive
  this.legacy    = options['legacy']    || false;

  this.json      = options['json']      || false;
  this.listener  = options['listener']  || null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.typeMap       = this.schema.compiledTypeMap;

  this.length     = input.length;
  this.position   = 0;
  this.line       = 0;
  this.lineStart  = 0;
  this.lineIndent = 0;

  // position of first leading tab in the current line,
  // used to make sure there are no tabs in the indentation
  this.firstTabInLine = -1;

  this.documents = [];

  /*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/

}


function generateError(state, message) {
  var mark = {
    name:     state.filename,
    buffer:   state.input.slice(0, -1), // omit trailing \0
    position: state.position,
    line:     state.line,
    column:   state.position - state.lineStart
  };

  mark.snippet = snippet(mark);

  return new exception(message, mark);
}

function throwError(state, message) {
  throw generateError(state, message);
}

function throwWarning(state, message) {
  if (state.onWarning) {
    state.onWarning.call(null, generateError(state, message));
  }
}


var directiveHandlers = {

  YAML: function handleYamlDirective(state, name, args) {

    var match, major, minor;

    if (state.version !== null) {
      throwError(state, 'duplication of %YAML directive');
    }

    if (args.length !== 1) {
      throwError(state, 'YAML directive accepts exactly one argument');
    }

    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);

    if (match === null) {
      throwError(state, 'ill-formed argument of the YAML directive');
    }

    major = parseInt(match[1], 10);
    minor = parseInt(match[2], 10);

    if (major !== 1) {
      throwError(state, 'unacceptable YAML version of the document');
    }

    state.version = args[0];
    state.checkLineBreaks = (minor < 2);

    if (minor !== 1 && minor !== 2) {
      throwWarning(state, 'unsupported YAML version of the document');
    }
  },

  TAG: function handleTagDirective(state, name, args) {

    var handle, prefix;

    if (args.length !== 2) {
      throwError(state, 'TAG directive accepts exactly two arguments');
    }

    handle = args[0];
    prefix = args[1];

    if (!PATTERN_TAG_HANDLE.test(handle)) {
      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
    }

    if (_hasOwnProperty$2.call(state.tagMap, handle)) {
      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
    }

    if (!PATTERN_TAG_URI.test(prefix)) {
      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
    }

    try {
      prefix = decodeURIComponent(prefix);
    } catch (err) {
      throwError(state, 'tag prefix is malformed: ' + prefix);
    }

    state.tagMap[handle] = prefix;
  }
};


function captureSegment(state, start, end, checkJson) {
  var _position, _length, _character, _result;

  if (start < end) {
    _result = state.input.slice(start, end);

    if (checkJson) {
      for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
        _character = _result.charCodeAt(_position);
        if (!(_character === 0x09 ||
              (0x20 <= _character && _character <= 0x10FFFF))) {
          throwError(state, 'expected valid JSON character');
        }
      }
    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
      throwError(state, 'the stream contains non-printable characters');
    }

    state.result += _result;
  }
}

function mergeMappings(state, destination, source, overridableKeys) {
  var sourceKeys, key, index, quantity;

  if (!common.isObject(source)) {
    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
  }

  sourceKeys = Object.keys(source);

  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
    key = sourceKeys[index];

    if (!_hasOwnProperty$2.call(destination, key)) {
      destination[key] = source[key];
      overridableKeys[key] = true;
    }
  }
}

function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode,
  startLine, startLineStart, startPos) {

  var index, quantity;

  // The output is a plain object here, so keys can only be strings.
  // We need to convert keyNode to a string, but doing so can hang the process
  // (deeply nested arrays that explode exponentially using aliases).
  if (Array.isArray(keyNode)) {
    keyNode = Array.prototype.slice.call(keyNode);

    for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
      if (Array.isArray(keyNode[index])) {
        throwError(state, 'nested arrays are not supported inside keys');
      }

      if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
        keyNode[index] = '[object Object]';
      }
    }
  }

  // Avoid code execution in load() via toString property
  // (still use its own toString for arrays, timestamps,
  // and whatever user schema extensions happen to have @@toStringTag)
  if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
    keyNode = '[object Object]';
  }


  keyNode = String(keyNode);

  if (_result === null) {
    _result = {};
  }

  if (keyTag === 'tag:yaml.org,2002:merge') {
    if (Array.isArray(valueNode)) {
      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
        mergeMappings(state, _result, valueNode[index], overridableKeys);
      }
    } else {
      mergeMappings(state, _result, valueNode, overridableKeys);
    }
  } else {
    if (!state.json &&
        !_hasOwnProperty$2.call(overridableKeys, keyNode) &&
        _hasOwnProperty$2.call(_result, keyNode)) {
      state.line = startLine || state.line;
      state.lineStart = startLineStart || state.lineStart;
      state.position = startPos || state.position;
      throwError(state, 'duplicated mapping key');
    }

    // used for this specific key only because Object.defineProperty is slow
    if (keyNode === '__proto__') {
      Object.defineProperty(_result, keyNode, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: valueNode
      });
    } else {
      _result[keyNode] = valueNode;
    }
    delete overridableKeys[keyNode];
  }

  return _result;
}

function readLineBreak(state) {
  var ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x0A/* LF */) {
    state.position++;
  } else if (ch === 0x0D/* CR */) {
    state.position++;
    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
      state.position++;
    }
  } else {
    throwError(state, 'a line break is expected');
  }

  state.line += 1;
  state.lineStart = state.position;
  state.firstTabInLine = -1;
}

function skipSeparationSpace(state, allowComments, checkIndent) {
  var lineBreaks = 0,
      ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    while (is_WHITE_SPACE(ch)) {
      if (ch === 0x09/* Tab */ && state.firstTabInLine === -1) {
        state.firstTabInLine = state.position;
      }
      ch = state.input.charCodeAt(++state.position);
    }

    if (allowComments && ch === 0x23/* # */) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
    }

    if (is_EOL(ch)) {
      readLineBreak(state);

      ch = state.input.charCodeAt(state.position);
      lineBreaks++;
      state.lineIndent = 0;

      while (ch === 0x20/* Space */) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
    } else {
      break;
    }
  }

  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
    throwWarning(state, 'deficient indentation');
  }

  return lineBreaks;
}

function testDocumentSeparator(state) {
  var _position = state.position,
      ch;

  ch = state.input.charCodeAt(_position);

  // Condition state.position === state.lineStart is tested
  // in parent on each call, for efficiency. No needs to test here again.
  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
      ch === state.input.charCodeAt(_position + 1) &&
      ch === state.input.charCodeAt(_position + 2)) {

    _position += 3;

    ch = state.input.charCodeAt(_position);

    if (ch === 0 || is_WS_OR_EOL(ch)) {
      return true;
    }
  }

  return false;
}

function writeFoldedLines(state, count) {
  if (count === 1) {
    state.result += ' ';
  } else if (count > 1) {
    state.result += common.repeat('\n', count - 1);
  }
}


function readPlainScalar(state, nodeIndent, withinFlowCollection) {
  var preceding,
      following,
      captureStart,
      captureEnd,
      hasPendingContent,
      _line,
      _lineStart,
      _lineIndent,
      _kind = state.kind,
      _result = state.result,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (is_WS_OR_EOL(ch)      ||
      is_FLOW_INDICATOR(ch) ||
      ch === 0x23/* # */    ||
      ch === 0x26/* & */    ||
      ch === 0x2A/* * */    ||
      ch === 0x21/* ! */    ||
      ch === 0x7C/* | */    ||
      ch === 0x3E/* > */    ||
      ch === 0x27/* ' */    ||
      ch === 0x22/* " */    ||
      ch === 0x25/* % */    ||
      ch === 0x40/* @ */    ||
      ch === 0x60/* ` */) {
    return false;
  }

  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
    following = state.input.charCodeAt(state.position + 1);

    if (is_WS_OR_EOL(following) ||
        withinFlowCollection && is_FLOW_INDICATOR(following)) {
      return false;
    }
  }

  state.kind = 'scalar';
  state.result = '';
  captureStart = captureEnd = state.position;
  hasPendingContent = false;

  while (ch !== 0) {
    if (ch === 0x3A/* : */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following) ||
          withinFlowCollection && is_FLOW_INDICATOR(following)) {
        break;
      }

    } else if (ch === 0x23/* # */) {
      preceding = state.input.charCodeAt(state.position - 1);

      if (is_WS_OR_EOL(preceding)) {
        break;
      }

    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
      break;

    } else if (is_EOL(ch)) {
      _line = state.line;
      _lineStart = state.lineStart;
      _lineIndent = state.lineIndent;
      skipSeparationSpace(state, false, -1);

      if (state.lineIndent >= nodeIndent) {
        hasPendingContent = true;
        ch = state.input.charCodeAt(state.position);
        continue;
      } else {
        state.position = captureEnd;
        state.line = _line;
        state.lineStart = _lineStart;
        state.lineIndent = _lineIndent;
        break;
      }
    }

    if (hasPendingContent) {
      captureSegment(state, captureStart, captureEnd, false);
      writeFoldedLines(state, state.line - _line);
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
    }

    if (!is_WHITE_SPACE(ch)) {
      captureEnd = state.position + 1;
    }

    ch = state.input.charCodeAt(++state.position);
  }

  captureSegment(state, captureStart, captureEnd, false);

  if (state.result) {
    return true;
  }

  state.kind = _kind;
  state.result = _result;
  return false;
}

function readSingleQuotedScalar(state, nodeIndent) {
  var ch,
      captureStart, captureEnd;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x27/* ' */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x27/* ' */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (ch === 0x27/* ' */) {
        captureStart = state.position;
        state.position++;
        captureEnd = state.position;
      } else {
        return true;
      }

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a single quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a single quoted scalar');
}

function readDoubleQuotedScalar(state, nodeIndent) {
  var captureStart,
      captureEnd,
      hexLength,
      hexResult,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x22/* " */) {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';
  state.position++;
  captureStart = captureEnd = state.position;

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    if (ch === 0x22/* " */) {
      captureSegment(state, captureStart, state.position, true);
      state.position++;
      return true;

    } else if (ch === 0x5C/* \ */) {
      captureSegment(state, captureStart, state.position, true);
      ch = state.input.charCodeAt(++state.position);

      if (is_EOL(ch)) {
        skipSeparationSpace(state, false, nodeIndent);

        // TODO: rework to inline fn with no type cast?
      } else if (ch < 256 && simpleEscapeCheck[ch]) {
        state.result += simpleEscapeMap[ch];
        state.position++;

      } else if ((tmp = escapedHexLen(ch)) > 0) {
        hexLength = tmp;
        hexResult = 0;

        for (; hexLength > 0; hexLength--) {
          ch = state.input.charCodeAt(++state.position);

          if ((tmp = fromHexCode(ch)) >= 0) {
            hexResult = (hexResult << 4) + tmp;

          } else {
            throwError(state, 'expected hexadecimal character');
          }
        }

        state.result += charFromCodepoint(hexResult);

        state.position++;

      } else {
        throwError(state, 'unknown escape sequence');
      }

      captureStart = captureEnd = state.position;

    } else if (is_EOL(ch)) {
      captureSegment(state, captureStart, captureEnd, true);
      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
      captureStart = captureEnd = state.position;

    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
      throwError(state, 'unexpected end of the document within a double quoted scalar');

    } else {
      state.position++;
      captureEnd = state.position;
    }
  }

  throwError(state, 'unexpected end of the stream within a double quoted scalar');
}

function readFlowCollection(state, nodeIndent) {
  var readNext = true,
      _line,
      _lineStart,
      _pos,
      _tag     = state.tag,
      _result,
      _anchor  = state.anchor,
      following,
      terminator,
      isPair,
      isExplicitPair,
      isMapping,
      overridableKeys = Object.create(null),
      keyNode,
      keyTag,
      valueNode,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x5B/* [ */) {
    terminator = 0x5D;/* ] */
    isMapping = false;
    _result = [];
  } else if (ch === 0x7B/* { */) {
    terminator = 0x7D;/* } */
    isMapping = true;
    _result = {};
  } else {
    return false;
  }

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(++state.position);

  while (ch !== 0) {
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === terminator) {
      state.position++;
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = isMapping ? 'mapping' : 'sequence';
      state.result = _result;
      return true;
    } else if (!readNext) {
      throwError(state, 'missed comma between flow collection entries');
    } else if (ch === 0x2C/* , */) {
      // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
      throwError(state, "expected the node content, but found ','");
    }

    keyTag = keyNode = valueNode = null;
    isPair = isExplicitPair = false;

    if (ch === 0x3F/* ? */) {
      following = state.input.charCodeAt(state.position + 1);

      if (is_WS_OR_EOL(following)) {
        isPair = isExplicitPair = true;
        state.position++;
        skipSeparationSpace(state, true, nodeIndent);
      }
    }

    _line = state.line; // Save the current line.
    _lineStart = state.lineStart;
    _pos = state.position;
    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
    keyTag = state.tag;
    keyNode = state.result;
    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
      isPair = true;
      ch = state.input.charCodeAt(++state.position);
      skipSeparationSpace(state, true, nodeIndent);
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      valueNode = state.result;
    }

    if (isMapping) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
    } else if (isPair) {
      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
    } else {
      _result.push(keyNode);
    }

    skipSeparationSpace(state, true, nodeIndent);

    ch = state.input.charCodeAt(state.position);

    if (ch === 0x2C/* , */) {
      readNext = true;
      ch = state.input.charCodeAt(++state.position);
    } else {
      readNext = false;
    }
  }

  throwError(state, 'unexpected end of the stream within a flow collection');
}

function readBlockScalar(state, nodeIndent) {
  var captureStart,
      folding,
      chomping       = CHOMPING_CLIP,
      didReadContent = false,
      detectedIndent = false,
      textIndent     = nodeIndent,
      emptyLines     = 0,
      atMoreIndented = false,
      tmp,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch === 0x7C/* | */) {
    folding = false;
  } else if (ch === 0x3E/* > */) {
    folding = true;
  } else {
    return false;
  }

  state.kind = 'scalar';
  state.result = '';

  while (ch !== 0) {
    ch = state.input.charCodeAt(++state.position);

    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
      if (CHOMPING_CLIP === chomping) {
        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
      } else {
        throwError(state, 'repeat of a chomping mode identifier');
      }

    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
      if (tmp === 0) {
        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
      } else if (!detectedIndent) {
        textIndent = nodeIndent + tmp - 1;
        detectedIndent = true;
      } else {
        throwError(state, 'repeat of an indentation width identifier');
      }

    } else {
      break;
    }
  }

  if (is_WHITE_SPACE(ch)) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (is_WHITE_SPACE(ch));

    if (ch === 0x23/* # */) {
      do { ch = state.input.charCodeAt(++state.position); }
      while (!is_EOL(ch) && (ch !== 0));
    }
  }

  while (ch !== 0) {
    readLineBreak(state);
    state.lineIndent = 0;

    ch = state.input.charCodeAt(state.position);

    while ((!detectedIndent || state.lineIndent < textIndent) &&
           (ch === 0x20/* Space */)) {
      state.lineIndent++;
      ch = state.input.charCodeAt(++state.position);
    }

    if (!detectedIndent && state.lineIndent > textIndent) {
      textIndent = state.lineIndent;
    }

    if (is_EOL(ch)) {
      emptyLines++;
      continue;
    }

    // End of the scalar.
    if (state.lineIndent < textIndent) {

      // Perform the chomping.
      if (chomping === CHOMPING_KEEP) {
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      } else if (chomping === CHOMPING_CLIP) {
        if (didReadContent) { // i.e. only if the scalar is not empty.
          state.result += '\n';
        }
      }

      // Break this `while` cycle and go to the funciton's epilogue.
      break;
    }

    // Folded style: use fancy rules to handle line breaks.
    if (folding) {

      // Lines starting with white space characters (more-indented lines) are not folded.
      if (is_WHITE_SPACE(ch)) {
        atMoreIndented = true;
        // except for the first content line (cf. Example 8.1)
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

      // End of more-indented block.
      } else if (atMoreIndented) {
        atMoreIndented = false;
        state.result += common.repeat('\n', emptyLines + 1);

      // Just one line break - perceive as the same line.
      } else if (emptyLines === 0) {
        if (didReadContent) { // i.e. only if we have already read some scalar content.
          state.result += ' ';
        }

      // Several line breaks - perceive as different lines.
      } else {
        state.result += common.repeat('\n', emptyLines);
      }

    // Literal style: just add exact number of line breaks between content lines.
    } else {
      // Keep all line breaks except the header line break.
      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
    }

    didReadContent = true;
    detectedIndent = true;
    emptyLines = 0;
    captureStart = state.position;

    while (!is_EOL(ch) && (ch !== 0)) {
      ch = state.input.charCodeAt(++state.position);
    }

    captureSegment(state, captureStart, state.position, false);
  }

  return true;
}

function readBlockSequence(state, nodeIndent) {
  var _line,
      _tag      = state.tag,
      _anchor   = state.anchor,
      _result   = [],
      following,
      detected  = false,
      ch;

  // there is a leading tab before this token, so it can't be a block sequence/mapping;
  // it can still be flow sequence/mapping or a scalar
  if (state.firstTabInLine !== -1) return false;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    if (state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, 'tab characters must not be used in indentation');
    }

    if (ch !== 0x2D/* - */) {
      break;
    }

    following = state.input.charCodeAt(state.position + 1);

    if (!is_WS_OR_EOL(following)) {
      break;
    }

    detected = true;
    state.position++;

    if (skipSeparationSpace(state, true, -1)) {
      if (state.lineIndent <= nodeIndent) {
        _result.push(null);
        ch = state.input.charCodeAt(state.position);
        continue;
      }
    }

    _line = state.line;
    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
    _result.push(state.result);
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a sequence entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'sequence';
    state.result = _result;
    return true;
  }
  return false;
}

function readBlockMapping(state, nodeIndent, flowIndent) {
  var following,
      allowCompact,
      _line,
      _keyLine,
      _keyLineStart,
      _keyPos,
      _tag          = state.tag,
      _anchor       = state.anchor,
      _result       = {},
      overridableKeys = Object.create(null),
      keyTag        = null,
      keyNode       = null,
      valueNode     = null,
      atExplicitKey = false,
      detected      = false,
      ch;

  // there is a leading tab before this token, so it can't be a block sequence/mapping;
  // it can still be flow sequence/mapping or a scalar
  if (state.firstTabInLine !== -1) return false;

  if (state.anchor !== null) {
    state.anchorMap[state.anchor] = _result;
  }

  ch = state.input.charCodeAt(state.position);

  while (ch !== 0) {
    if (!atExplicitKey && state.firstTabInLine !== -1) {
      state.position = state.firstTabInLine;
      throwError(state, 'tab characters must not be used in indentation');
    }

    following = state.input.charCodeAt(state.position + 1);
    _line = state.line; // Save the current line.

    //
    // Explicit notation case. There are two separate blocks:
    // first for the key (denoted by "?") and second for the value (denoted by ":")
    //
    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

      if (ch === 0x3F/* ? */) {
        if (atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }

        detected = true;
        atExplicitKey = true;
        allowCompact = true;

      } else if (atExplicitKey) {
        // i.e. 0x3A/* : */ === character after the explicit key.
        atExplicitKey = false;
        allowCompact = true;

      } else {
        throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
      }

      state.position += 1;
      ch = following;

    //
    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
    //
    } else {
      _keyLine = state.line;
      _keyLineStart = state.lineStart;
      _keyPos = state.position;

      if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
        // Neither implicit nor explicit notation.
        // Reading is done. Go to the epilogue.
        break;
      }

      if (state.line === _line) {
        ch = state.input.charCodeAt(state.position);

        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }

        if (ch === 0x3A/* : */) {
          ch = state.input.charCodeAt(++state.position);

          if (!is_WS_OR_EOL(ch)) {
            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
          }

          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }

          detected = true;
          atExplicitKey = false;
          allowCompact = false;
          keyTag = state.tag;
          keyNode = state.result;

        } else if (detected) {
          throwError(state, 'can not read an implicit mapping pair; a colon is missed');

        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }

      } else if (detected) {
        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');

      } else {
        state.tag = _tag;
        state.anchor = _anchor;
        return true; // Keep the result of `composeNode`.
      }
    }

    //
    // Common reading code for both explicit and implicit notations.
    //
    if (state.line === _line || state.lineIndent > nodeIndent) {
      if (atExplicitKey) {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
      }

      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
        if (atExplicitKey) {
          keyNode = state.result;
        } else {
          valueNode = state.result;
        }
      }

      if (!atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
        keyTag = keyNode = valueNode = null;
      }

      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
    }

    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
      throwError(state, 'bad indentation of a mapping entry');
    } else if (state.lineIndent < nodeIndent) {
      break;
    }
  }

  //
  // Epilogue.
  //

  // Special case: last mapping's node contains only the key in explicit notation.
  if (atExplicitKey) {
    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
  }

  // Expose the resulting mapping.
  if (detected) {
    state.tag = _tag;
    state.anchor = _anchor;
    state.kind = 'mapping';
    state.result = _result;
  }

  return detected;
}

function readTagProperty(state) {
  var _position,
      isVerbatim = false,
      isNamed    = false,
      tagHandle,
      tagName,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x21/* ! */) return false;

  if (state.tag !== null) {
    throwError(state, 'duplication of a tag property');
  }

  ch = state.input.charCodeAt(++state.position);

  if (ch === 0x3C/* < */) {
    isVerbatim = true;
    ch = state.input.charCodeAt(++state.position);

  } else if (ch === 0x21/* ! */) {
    isNamed = true;
    tagHandle = '!!';
    ch = state.input.charCodeAt(++state.position);

  } else {
    tagHandle = '!';
  }

  _position = state.position;

  if (isVerbatim) {
    do { ch = state.input.charCodeAt(++state.position); }
    while (ch !== 0 && ch !== 0x3E/* > */);

    if (state.position < state.length) {
      tagName = state.input.slice(_position, state.position);
      ch = state.input.charCodeAt(++state.position);
    } else {
      throwError(state, 'unexpected end of the stream within a verbatim tag');
    }
  } else {
    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

      if (ch === 0x21/* ! */) {
        if (!isNamed) {
          tagHandle = state.input.slice(_position - 1, state.position + 1);

          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
            throwError(state, 'named tag handle cannot contain such characters');
          }

          isNamed = true;
          _position = state.position + 1;
        } else {
          throwError(state, 'tag suffix cannot contain exclamation marks');
        }
      }

      ch = state.input.charCodeAt(++state.position);
    }

    tagName = state.input.slice(_position, state.position);

    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
      throwError(state, 'tag suffix cannot contain flow indicator characters');
    }
  }

  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
    throwError(state, 'tag name cannot contain such characters: ' + tagName);
  }

  try {
    tagName = decodeURIComponent(tagName);
  } catch (err) {
    throwError(state, 'tag name is malformed: ' + tagName);
  }

  if (isVerbatim) {
    state.tag = tagName;

  } else if (_hasOwnProperty$2.call(state.tagMap, tagHandle)) {
    state.tag = state.tagMap[tagHandle] + tagName;

  } else if (tagHandle === '!') {
    state.tag = '!' + tagName;

  } else if (tagHandle === '!!') {
    state.tag = 'tag:yaml.org,2002:' + tagName;

  } else {
    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
  }

  return true;
}

function readAnchorProperty(state) {
  var _position,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x26/* & */) return false;

  if (state.anchor !== null) {
    throwError(state, 'duplication of an anchor property');
  }

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an anchor node must contain at least one character');
  }

  state.anchor = state.input.slice(_position, state.position);
  return true;
}

function readAlias(state) {
  var _position, alias,
      ch;

  ch = state.input.charCodeAt(state.position);

  if (ch !== 0x2A/* * */) return false;

  ch = state.input.charCodeAt(++state.position);
  _position = state.position;

  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
    ch = state.input.charCodeAt(++state.position);
  }

  if (state.position === _position) {
    throwError(state, 'name of an alias node must contain at least one character');
  }

  alias = state.input.slice(_position, state.position);

  if (!_hasOwnProperty$2.call(state.anchorMap, alias)) {
    throwError(state, 'unidentified alias "' + alias + '"');
  }

  state.result = state.anchorMap[alias];
  skipSeparationSpace(state, true, -1);
  return true;
}

function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
  var allowBlockStyles,
      allowBlockScalars,
      allowBlockCollections,
      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
      atNewLine  = false,
      hasContent = false,
      typeIndex,
      typeQuantity,
      typeList,
      type,
      flowIndent,
      blockIndent;

  if (state.listener !== null) {
    state.listener('open', state);
  }

  state.tag    = null;
  state.anchor = null;
  state.kind   = null;
  state.result = null;

  allowBlockStyles = allowBlockScalars = allowBlockCollections =
    CONTEXT_BLOCK_OUT === nodeContext ||
    CONTEXT_BLOCK_IN  === nodeContext;

  if (allowToSeek) {
    if (skipSeparationSpace(state, true, -1)) {
      atNewLine = true;

      if (state.lineIndent > parentIndent) {
        indentStatus = 1;
      } else if (state.lineIndent === parentIndent) {
        indentStatus = 0;
      } else if (state.lineIndent < parentIndent) {
        indentStatus = -1;
      }
    }
  }

  if (indentStatus === 1) {
    while (readTagProperty(state) || readAnchorProperty(state)) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        allowBlockCollections = allowBlockStyles;

        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      } else {
        allowBlockCollections = false;
      }
    }
  }

  if (allowBlockCollections) {
    allowBlockCollections = atNewLine || allowCompact;
  }

  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
      flowIndent = parentIndent;
    } else {
      flowIndent = parentIndent + 1;
    }

    blockIndent = state.position - state.lineStart;

    if (indentStatus === 1) {
      if (allowBlockCollections &&
          (readBlockSequence(state, blockIndent) ||
           readBlockMapping(state, blockIndent, flowIndent)) ||
          readFlowCollection(state, flowIndent)) {
        hasContent = true;
      } else {
        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
            readSingleQuotedScalar(state, flowIndent) ||
            readDoubleQuotedScalar(state, flowIndent)) {
          hasContent = true;

        } else if (readAlias(state)) {
          hasContent = true;

          if (state.tag !== null || state.anchor !== null) {
            throwError(state, 'alias node should not have any properties');
          }

        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
          hasContent = true;

          if (state.tag === null) {
            state.tag = '?';
          }
        }

        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    } else if (indentStatus === 0) {
      // Special case: block sequences are allowed to have same indentation level as the parent.
      // http://www.yaml.org/spec/1.2/spec.html#id2799784
      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
    }
  }

  if (state.tag === null) {
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = state.result;
    }

  } else if (state.tag === '?') {
    // Implicit resolving is not allowed for non-scalar types, and '?'
    // non-specific tag is only automatically assigned to plain scalars.
    //
    // We only need to check kind conformity in case user explicitly assigns '?'
    // tag, for example like this: "!<?> [0]"
    //
    if (state.result !== null && state.kind !== 'scalar') {
      throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
    }

    for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
      type = state.implicitTypes[typeIndex];

      if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
        state.result = type.construct(state.result);
        state.tag = type.tag;
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
        break;
      }
    }
  } else if (state.tag !== '!') {
    if (_hasOwnProperty$2.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
      type = state.typeMap[state.kind || 'fallback'][state.tag];
    } else {
      // looking for multi type
      type = null;
      typeList = state.typeMap.multi[state.kind || 'fallback'];

      for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
        if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
          type = typeList[typeIndex];
          break;
        }
      }
    }

    if (!type) {
      throwError(state, 'unknown tag !<' + state.tag + '>');
    }

    if (state.result !== null && type.kind !== state.kind) {
      throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
    }

    if (!type.resolve(state.result, state.tag)) { // `state.result` updated in resolver if matched
      throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
    } else {
      state.result = type.construct(state.result, state.tag);
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    }
  }

  if (state.listener !== null) {
    state.listener('close', state);
  }
  return state.tag !== null ||  state.anchor !== null || hasContent;
}

function readDocument(state) {
  var documentStart = state.position,
      _position,
      directiveName,
      directiveArgs,
      hasDirectives = false,
      ch;

  state.version = null;
  state.checkLineBreaks = state.legacy;
  state.tagMap = Object.create(null);
  state.anchorMap = Object.create(null);

  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
    skipSeparationSpace(state, true, -1);

    ch = state.input.charCodeAt(state.position);

    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
      break;
    }

    hasDirectives = true;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;

    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }

    directiveName = state.input.slice(_position, state.position);
    directiveArgs = [];

    if (directiveName.length < 1) {
      throwError(state, 'directive name must not be less than one character in length');
    }

    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      if (ch === 0x23/* # */) {
        do { ch = state.input.charCodeAt(++state.position); }
        while (ch !== 0 && !is_EOL(ch));
        break;
      }

      if (is_EOL(ch)) break;

      _position = state.position;

      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }

      directiveArgs.push(state.input.slice(_position, state.position));
    }

    if (ch !== 0) readLineBreak(state);

    if (_hasOwnProperty$2.call(directiveHandlers, directiveName)) {
      directiveHandlers[directiveName](state, directiveName, directiveArgs);
    } else {
      throwWarning(state, 'unknown document directive "' + directiveName + '"');
    }
  }

  skipSeparationSpace(state, true, -1);

  if (state.lineIndent === 0 &&
      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
    state.position += 3;
    skipSeparationSpace(state, true, -1);

  } else if (hasDirectives) {
    throwError(state, 'directives end mark is expected');
  }

  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
  skipSeparationSpace(state, true, -1);

  if (state.checkLineBreaks &&
      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
  }

  state.documents.push(state.result);

  if (state.position === state.lineStart && testDocumentSeparator(state)) {

    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    }
    return;
  }

  if (state.position < (state.length - 1)) {
    throwError(state, 'end of the stream or a document separator is expected');
  } else {
    return;
  }
}


function loadDocuments(input, options) {
  input = String(input);
  options = options || {};

  if (input.length !== 0) {

    // Add tailing `\n` if not exists
    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
      input += '\n';
    }

    // Strip BOM
    if (input.charCodeAt(0) === 0xFEFF) {
      input = input.slice(1);
    }
  }

  var state = new State(input, options);

  var nullpos = input.indexOf('\0');

  if (nullpos !== -1) {
    state.position = nullpos;
    throwError(state, 'null byte is not allowed in input');
  }

  // Use 0 as string terminator. That significantly simplifies bounds check.
  state.input += '\0';

  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
    state.lineIndent += 1;
    state.position += 1;
  }

  while (state.position < (state.length - 1)) {
    readDocument(state);
  }

  return state.documents;
}


function loadAll(input, iterator, options) {
  if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
    options = iterator;
    iterator = null;
  }

  var documents = loadDocuments(input, options);

  if (typeof iterator !== 'function') {
    return documents;
  }

  for (var index = 0, length = documents.length; index < length; index += 1) {
    iterator(documents[index]);
  }
}


function load(input, options) {
  var documents = loadDocuments(input, options);

  if (documents.length === 0) {
    /*eslint-disable no-undefined*/
    return undefined;
  } else if (documents.length === 1) {
    return documents[0];
  }
  throw new exception('expected a single document in the stream, but found more');
}


var loadAll_1 = loadAll;
var load_1    = load;

var loader = {
	loadAll: loadAll_1,
	load: load_1
};

/*eslint-disable no-use-before-define*/





var _toString$2       = Object.prototype.toString;
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;

var CHAR_BOM                  = 0xFEFF;
var CHAR_TAB                  = 0x09; /* Tab */
var CHAR_LINE_FEED            = 0x0A; /* LF */
var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
var CHAR_SPACE                = 0x20; /* Space */
var CHAR_EXCLAMATION          = 0x21; /* ! */
var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
var CHAR_SHARP                = 0x23; /* # */
var CHAR_PERCENT              = 0x25; /* % */
var CHAR_AMPERSAND            = 0x26; /* & */
var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
var CHAR_ASTERISK             = 0x2A; /* * */
var CHAR_COMMA                = 0x2C; /* , */
var CHAR_MINUS                = 0x2D; /* - */
var CHAR_COLON                = 0x3A; /* : */
var CHAR_EQUALS               = 0x3D; /* = */
var CHAR_GREATER_THAN         = 0x3E; /* > */
var CHAR_QUESTION             = 0x3F; /* ? */
var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
var CHAR_VERTICAL_LINE        = 0x7C; /* | */
var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

var ESCAPE_SEQUENCES = {};

ESCAPE_SEQUENCES[0x00]   = '\\0';
ESCAPE_SEQUENCES[0x07]   = '\\a';
ESCAPE_SEQUENCES[0x08]   = '\\b';
ESCAPE_SEQUENCES[0x09]   = '\\t';
ESCAPE_SEQUENCES[0x0A]   = '\\n';
ESCAPE_SEQUENCES[0x0B]   = '\\v';
ESCAPE_SEQUENCES[0x0C]   = '\\f';
ESCAPE_SEQUENCES[0x0D]   = '\\r';
ESCAPE_SEQUENCES[0x1B]   = '\\e';
ESCAPE_SEQUENCES[0x22]   = '\\"';
ESCAPE_SEQUENCES[0x5C]   = '\\\\';
ESCAPE_SEQUENCES[0x85]   = '\\N';
ESCAPE_SEQUENCES[0xA0]   = '\\_';
ESCAPE_SEQUENCES[0x2028] = '\\L';
ESCAPE_SEQUENCES[0x2029] = '\\P';

var DEPRECATED_BOOLEANS_SYNTAX = [
  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
];

var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;

function compileStyleMap(schema, map) {
  var result, keys, index, length, tag, style, type;

  if (map === null) return {};

  result = {};
  keys = Object.keys(map);

  for (index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map[tag]);

    if (tag.slice(0, 2) === '!!') {
      tag = 'tag:yaml.org,2002:' + tag.slice(2);
    }
    type = schema.compiledTypeMap['fallback'][tag];

    if (type && _hasOwnProperty$3.call(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }

    result[tag] = style;
  }

  return result;
}

function encodeHex(character) {
  var string, handle, length;

  string = character.toString(16).toUpperCase();

  if (character <= 0xFF) {
    handle = 'x';
    length = 2;
  } else if (character <= 0xFFFF) {
    handle = 'u';
    length = 4;
  } else if (character <= 0xFFFFFFFF) {
    handle = 'U';
    length = 8;
  } else {
    throw new exception('code point within a string may not be greater than 0xFFFFFFFF');
  }

  return '\\' + handle + common.repeat('0', length - string.length) + string;
}


var QUOTING_TYPE_SINGLE = 1,
    QUOTING_TYPE_DOUBLE = 2;

function State$1(options) {
  this.schema        = options['schema'] || _default;
  this.indent        = Math.max(1, (options['indent'] || 2));
  this.noArrayIndent = options['noArrayIndent'] || false;
  this.skipInvalid   = options['skipInvalid'] || false;
  this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
  this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
  this.sortKeys      = options['sortKeys'] || false;
  this.lineWidth     = options['lineWidth'] || 80;
  this.noRefs        = options['noRefs'] || false;
  this.noCompatMode  = options['noCompatMode'] || false;
  this.condenseFlow  = options['condenseFlow'] || false;
  this.quotingType   = options['quotingType'] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
  this.forceQuotes   = options['forceQuotes'] || false;
  this.replacer      = typeof options['replacer'] === 'function' ? options['replacer'] : null;

  this.implicitTypes = this.schema.compiledImplicit;
  this.explicitTypes = this.schema.compiledExplicit;

  this.tag = null;
  this.result = '';

  this.duplicates = [];
  this.usedDuplicates = null;
}

// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
  var ind = common.repeat(' ', spaces),
      position = 0,
      next = -1,
      result = '',
      line,
      length = string.length;

  while (position < length) {
    next = string.indexOf('\n', position);
    if (next === -1) {
      line = string.slice(position);
      position = length;
    } else {
      line = string.slice(position, next + 1);
      position = next + 1;
    }

    if (line.length && line !== '\n') result += ind;

    result += line;
  }

  return result;
}

function generateNextLine(state, level) {
  return '\n' + common.repeat(' ', state.indent * level);
}

function testImplicitResolving(state, str) {
  var index, length, type;

  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
    type = state.implicitTypes[index];

    if (type.resolve(str)) {
      return true;
    }
  }

  return false;
}

// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
  return c === CHAR_SPACE || c === CHAR_TAB;
}

// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
  return  (0x00020 <= c && c <= 0x00007E)
      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== CHAR_BOM)
      ||  (0x10000 <= c && c <= 0x10FFFF);
}

// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// Including s-white (for some reason, examples doesn't match specs in this aspect)
// ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
function isNsCharOrWhitespace(c) {
  return isPrintable(c)
    && c !== CHAR_BOM
    // - b-char
    && c !== CHAR_CARRIAGE_RETURN
    && c !== CHAR_LINE_FEED;
}

// [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
//                             c = flow-in   ⇒ ns-plain-safe-in
//                             c = block-key ⇒ ns-plain-safe-out
//                             c = flow-key  ⇒ ns-plain-safe-in
// [128] ns-plain-safe-out ::= ns-char
// [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
// [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
//                            | ( /* An ns-char preceding */ “#” )
//                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
function isPlainSafe(c, prev, inblock) {
  var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
  var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
  return (
    // ns-plain-safe
    inblock ? // c = flow-in
      cIsNsCharOrWhitespace
      : cIsNsCharOrWhitespace
        // - c-flow-indicator
        && c !== CHAR_COMMA
        && c !== CHAR_LEFT_SQUARE_BRACKET
        && c !== CHAR_RIGHT_SQUARE_BRACKET
        && c !== CHAR_LEFT_CURLY_BRACKET
        && c !== CHAR_RIGHT_CURLY_BRACKET
  )
    // ns-plain-char
    && c !== CHAR_SHARP // false on '#'
    && !(prev === CHAR_COLON && !cIsNsChar) // false on ': '
    || (isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP) // change to true on '[^ ]#'
    || (prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
}

// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
  // Uses a subset of ns-char - c-indicator
  // where ns-char = nb-char - s-white.
  // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
  return isPrintable(c) && c !== CHAR_BOM
    && !isWhitespace(c) // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    && c !== CHAR_MINUS
    && c !== CHAR_QUESTION
    && c !== CHAR_COLON
    && c !== CHAR_COMMA
    && c !== CHAR_LEFT_SQUARE_BRACKET
    && c !== CHAR_RIGHT_SQUARE_BRACKET
    && c !== CHAR_LEFT_CURLY_BRACKET
    && c !== CHAR_RIGHT_CURLY_BRACKET
    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    && c !== CHAR_SHARP
    && c !== CHAR_AMPERSAND
    && c !== CHAR_ASTERISK
    && c !== CHAR_EXCLAMATION
    && c !== CHAR_VERTICAL_LINE
    && c !== CHAR_EQUALS
    && c !== CHAR_GREATER_THAN
    && c !== CHAR_SINGLE_QUOTE
    && c !== CHAR_DOUBLE_QUOTE
    // | “%” | “@” | “`”)
    && c !== CHAR_PERCENT
    && c !== CHAR_COMMERCIAL_AT
    && c !== CHAR_GRAVE_ACCENT;
}

// Simplified test for values allowed as the last character in plain style.
function isPlainSafeLast(c) {
  // just not whitespace or colon, it will be checked to be plain character later
  return !isWhitespace(c) && c !== CHAR_COLON;
}

// Same as 'string'.codePointAt(pos), but works in older browsers.
function codePointAt(string, pos) {
  var first = string.charCodeAt(pos), second;
  if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
    second = string.charCodeAt(pos + 1);
    if (second >= 0xDC00 && second <= 0xDFFF) {
      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
    }
  }
  return first;
}

// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
  var leadingSpaceRe = /^\n* /;
  return leadingSpaceRe.test(string);
}

var STYLE_PLAIN   = 1,
    STYLE_SINGLE  = 2,
    STYLE_LITERAL = 3,
    STYLE_FOLDED  = 4,
    STYLE_DOUBLE  = 5;

// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth,
  testAmbiguousType, quotingType, forceQuotes, inblock) {

  var i;
  var char = 0;
  var prevChar = null;
  var hasLineBreak = false;
  var hasFoldableLine = false; // only checked if shouldTrackWidth
  var shouldTrackWidth = lineWidth !== -1;
  var previousLineBreak = -1; // count the first line correctly
  var plain = isPlainSafeFirst(codePointAt(string, 0))
          && isPlainSafeLast(codePointAt(string, string.length - 1));

  if (singleLineOnly || forceQuotes) {
    // Case: no block styles.
    // Check for disallowed characters to rule out plain and single.
    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
  } else {
    // Case: block styles permitted.
    for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      if (char === CHAR_LINE_FEED) {
        hasLineBreak = true;
        // Check if any line can be folded.
        if (shouldTrackWidth) {
          hasFoldableLine = hasFoldableLine ||
            // Foldable line = too long, and not more-indented.
            (i - previousLineBreak - 1 > lineWidth &&
             string[previousLineBreak + 1] !== ' ');
          previousLineBreak = i;
        }
      } else if (!isPrintable(char)) {
        return STYLE_DOUBLE;
      }
      plain = plain && isPlainSafe(char, prevChar, inblock);
      prevChar = char;
    }
    // in case the end is missing a \n
    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
      (i - previousLineBreak - 1 > lineWidth &&
       string[previousLineBreak + 1] !== ' '));
  }
  // Although every style can represent \n without escaping, prefer block styles
  // for multiline, since they're more readable and they don't add empty lines.
  // Also prefer folding a super-long line.
  if (!hasLineBreak && !hasFoldableLine) {
    // Strings interpretable as another type have to be quoted;
    // e.g. the string 'true' vs. the boolean true.
    if (plain && !forceQuotes && !testAmbiguousType(string)) {
      return STYLE_PLAIN;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  // Edge case: block indentation indicator can only have one digit.
  if (indentPerLevel > 9 && needIndentIndicator(string)) {
    return STYLE_DOUBLE;
  }
  // At this point we know block styles are valid.
  // Prefer literal style unless we want to fold.
  if (!forceQuotes) {
    return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
  }
  return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}

// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey, inblock) {
  state.dump = (function () {
    if (string.length === 0) {
      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
    }
    if (!state.noCompatMode) {
      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? ('"' + string + '"') : ("'" + string + "'");
      }
    }

    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
    // As indentation gets deeper, let the width decrease monotonically
    // to the lower bound min(state.lineWidth, 40).
    // Note that this implies
    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
    // This behaves better than a constant minimum width which disallows narrower options,
    // or an indent threshold which causes the width to suddenly increase.
    var lineWidth = state.lineWidth === -1
      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

    // Without knowing if keys are implicit/explicit, assume implicit for safety.
    var singleLineOnly = iskey
      // No block styles in flow mode.
      || (state.flowLevel > -1 && level >= state.flowLevel);
    function testAmbiguity(string) {
      return testImplicitResolving(state, string);
    }

    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth,
      testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {

      case STYLE_PLAIN:
        return string;
      case STYLE_SINGLE:
        return "'" + string.replace(/'/g, "''") + "'";
      case STYLE_LITERAL:
        return '|' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(string, indent));
      case STYLE_FOLDED:
        return '>' + blockHeader(string, state.indent)
          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
      case STYLE_DOUBLE:
        return '"' + escapeString(string) + '"';
      default:
        throw new exception('impossible error: invalid scalar style');
    }
  }());
}

// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

  // note the special case: the string '\n' counts as a "trailing" empty line.
  var clip =          string[string.length - 1] === '\n';
  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
  var chomp = keep ? '+' : (clip ? '' : '-');

  return indentIndicator + chomp + '\n';
}

// (See the note for writeScalar.)
function dropEndingNewline(string) {
  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
}

// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
  // unless they're before or after a more-indented line, or at the very
  // beginning or end, in which case $k$ maps to $k$.
  // Therefore, parse each chunk as newline(s) followed by a content line.
  var lineRe = /(\n+)([^\n]*)/g;

  // first line (possibly an empty line)
  var result = (function () {
    var nextLF = string.indexOf('\n');
    nextLF = nextLF !== -1 ? nextLF : string.length;
    lineRe.lastIndex = nextLF;
    return foldLine(string.slice(0, nextLF), width);
  }());
  // If we haven't reached the first content line yet, don't add an extra \n.
  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
  var moreIndented;

  // rest of the lines
  var match;
  while ((match = lineRe.exec(string))) {
    var prefix = match[1], line = match[2];
    moreIndented = (line[0] === ' ');
    result += prefix
      + (!prevMoreIndented && !moreIndented && line !== ''
        ? '\n' : '')
      + foldLine(line, width);
    prevMoreIndented = moreIndented;
  }

  return result;
}

// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
  if (line === '' || line[0] === ' ') return line;

  // Since a more-indented line adds a \n, breaks can't be followed by a space.
  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
  var match;
  // start is an inclusive index. end, curr, and next are exclusive.
  var start = 0, end, curr = 0, next = 0;
  var result = '';

  // Invariants: 0 <= start <= length-1.
  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
  // Inside the loop:
  //   A match implies length >= 2, so curr and next are <= length-2.
  while ((match = breakRe.exec(line))) {
    next = match.index;
    // maintain invariant: curr - start <= width
    if (next - start > width) {
      end = (curr > start) ? curr : next; // derive end <= length-2
      result += '\n' + line.slice(start, end);
      // skip the space that was output as \n
      start = end + 1;                    // derive start <= length-1
    }
    curr = next;
  }

  // By the invariants, start <= length-1, so there is something left over.
  // It is either the whole string or a part starting from non-whitespace.
  result += '\n';
  // Insert a break if the remainder is too long and there is a break available.
  if (line.length - start > width && curr > start) {
    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
  } else {
    result += line.slice(start);
  }

  return result.slice(1); // drop extra \n joiner
}

// Escapes a double-quoted string.
function escapeString(string) {
  var result = '';
  var char = 0;
  var escapeSeq;

  for (var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
    char = codePointAt(string, i);
    escapeSeq = ESCAPE_SEQUENCES[char];

    if (!escapeSeq && isPrintable(char)) {
      result += string[i];
      if (char >= 0x10000) result += string[i + 1];
    } else {
      result += escapeSeq || encodeHex(char);
    }
  }

  return result;
}

function writeFlowSequence(state, level, object) {
  var _result = '',
      _tag    = state.tag,
      index,
      length,
      value;

  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];

    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }

    // Write only valid elements, put null instead of invalid elements.
    if (writeNode(state, level, value, false, false) ||
        (typeof value === 'undefined' &&
         writeNode(state, level, null, false, false))) {

      if (_result !== '') _result += ',' + (!state.condenseFlow ? ' ' : '');
      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = '[' + _result + ']';
}

function writeBlockSequence(state, level, object, compact) {
  var _result = '',
      _tag    = state.tag,
      index,
      length,
      value;

  for (index = 0, length = object.length; index < length; index += 1) {
    value = object[index];

    if (state.replacer) {
      value = state.replacer.call(object, String(index), value);
    }

    // Write only valid elements, put null instead of invalid elements.
    if (writeNode(state, level + 1, value, true, true, false, true) ||
        (typeof value === 'undefined' &&
         writeNode(state, level + 1, null, true, true, false, true))) {

      if (!compact || _result !== '') {
        _result += generateNextLine(state, level);
      }

      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        _result += '-';
      } else {
        _result += '- ';
      }

      _result += state.dump;
    }
  }

  state.tag = _tag;
  state.dump = _result || '[]'; // Empty sequence if no valid values.
}

function writeFlowMapping(state, level, object) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      pairBuffer;

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {

    pairBuffer = '';
    if (_result !== '') pairBuffer += ', ';

    if (state.condenseFlow) pairBuffer += '"';

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }

    if (!writeNode(state, level, objectKey, false, false)) {
      continue; // Skip this pair because of invalid key;
    }

    if (state.dump.length > 1024) pairBuffer += '? ';

    pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');

    if (!writeNode(state, level, objectValue, false, false)) {
      continue; // Skip this pair because of invalid value.
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = '{' + _result + '}';
}

function writeBlockMapping(state, level, object, compact) {
  var _result       = '',
      _tag          = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      explicitPair,
      pairBuffer;

  // Allow sorting keys so that the output file is deterministic
  if (state.sortKeys === true) {
    // Default sorting
    objectKeyList.sort();
  } else if (typeof state.sortKeys === 'function') {
    // Custom sort function
    objectKeyList.sort(state.sortKeys);
  } else if (state.sortKeys) {
    // Something is wrong
    throw new exception('sortKeys must be a boolean or a function');
  }

  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
    pairBuffer = '';

    if (!compact || _result !== '') {
      pairBuffer += generateNextLine(state, level);
    }

    objectKey = objectKeyList[index];
    objectValue = object[objectKey];

    if (state.replacer) {
      objectValue = state.replacer.call(object, objectKey, objectValue);
    }

    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
      continue; // Skip this pair because of invalid key.
    }

    explicitPair = (state.tag !== null && state.tag !== '?') ||
                   (state.dump && state.dump.length > 1024);

    if (explicitPair) {
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += '?';
      } else {
        pairBuffer += '? ';
      }
    }

    pairBuffer += state.dump;

    if (explicitPair) {
      pairBuffer += generateNextLine(state, level);
    }

    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
      continue; // Skip this pair because of invalid value.
    }

    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
      pairBuffer += ':';
    } else {
      pairBuffer += ': ';
    }

    pairBuffer += state.dump;

    // Both key and value are valid.
    _result += pairBuffer;
  }

  state.tag = _tag;
  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
}

function detectType(state, object, explicit) {
  var _result, typeList, index, length, type, style;

  typeList = explicit ? state.explicitTypes : state.implicitTypes;

  for (index = 0, length = typeList.length; index < length; index += 1) {
    type = typeList[index];

    if ((type.instanceOf  || type.predicate) &&
        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
        (!type.predicate  || type.predicate(object))) {

      if (explicit) {
        if (type.multi && type.representName) {
          state.tag = type.representName(object);
        } else {
          state.tag = type.tag;
        }
      } else {
        state.tag = '?';
      }

      if (type.represent) {
        style = state.styleMap[type.tag] || type.defaultStyle;

        if (_toString$2.call(type.represent) === '[object Function]') {
          _result = type.represent(object, style);
        } else if (_hasOwnProperty$3.call(type.represent, style)) {
          _result = type.represent[style](object, style);
        } else {
          throw new exception('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
        }

        state.dump = _result;
      }

      return true;
    }
  }

  return false;
}

// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
  state.tag = null;
  state.dump = object;

  if (!detectType(state, object, false)) {
    detectType(state, object, true);
  }

  var type = _toString$2.call(state.dump);
  var inblock = block;
  var tagStr;

  if (block) {
    block = (state.flowLevel < 0 || state.flowLevel > level);
  }

  var objectOrArray = type === '[object Object]' || type === '[object Array]',
      duplicateIndex,
      duplicate;

  if (objectOrArray) {
    duplicateIndex = state.duplicates.indexOf(object);
    duplicate = duplicateIndex !== -1;
  }

  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
    compact = false;
  }

  if (duplicate && state.usedDuplicates[duplicateIndex]) {
    state.dump = '*ref_' + duplicateIndex;
  } else {
    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
      state.usedDuplicates[duplicateIndex] = true;
    }
    if (type === '[object Object]') {
      if (block && (Object.keys(state.dump).length !== 0)) {
        writeBlockMapping(state, level, state.dump, compact);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowMapping(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object Array]') {
      if (block && (state.dump.length !== 0)) {
        if (state.noArrayIndent && !isblockseq && level > 0) {
          writeBlockSequence(state, level - 1, state.dump, compact);
        } else {
          writeBlockSequence(state, level, state.dump, compact);
        }
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + state.dump;
        }
      } else {
        writeFlowSequence(state, level, state.dump);
        if (duplicate) {
          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
        }
      }
    } else if (type === '[object String]') {
      if (state.tag !== '?') {
        writeScalar(state, state.dump, level, iskey, inblock);
      }
    } else if (type === '[object Undefined]') {
      return false;
    } else {
      if (state.skipInvalid) return false;
      throw new exception('unacceptable kind of an object to dump ' + type);
    }

    if (state.tag !== null && state.tag !== '?') {
      // Need to encode all characters except those allowed by the spec:
      //
      // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
      // [36] ns-hex-digit    ::=  ns-dec-digit
      //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
      // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
      // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
      // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
      //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
      //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
      //
      // Also need to encode '!' because it has special meaning (end of tag prefix).
      //
      tagStr = encodeURI(
        state.tag[0] === '!' ? state.tag.slice(1) : state.tag
      ).replace(/!/g, '%21');

      if (state.tag[0] === '!') {
        tagStr = '!' + tagStr;
      } else if (tagStr.slice(0, 18) === 'tag:yaml.org,2002:') {
        tagStr = '!!' + tagStr.slice(18);
      } else {
        tagStr = '!<' + tagStr + '>';
      }

      state.dump = tagStr + ' ' + state.dump;
    }
  }

  return true;
}

function getDuplicateReferences(object, state) {
  var objects = [],
      duplicatesIndexes = [],
      index,
      length;

  inspectNode(object, objects, duplicatesIndexes);

  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
    state.duplicates.push(objects[duplicatesIndexes[index]]);
  }
  state.usedDuplicates = new Array(length);
}

function inspectNode(object, objects, duplicatesIndexes) {
  var objectKeyList,
      index,
      length;

  if (object !== null && typeof object === 'object') {
    index = objects.indexOf(object);
    if (index !== -1) {
      if (duplicatesIndexes.indexOf(index) === -1) {
        duplicatesIndexes.push(index);
      }
    } else {
      objects.push(object);

      if (Array.isArray(object)) {
        for (index = 0, length = object.length; index < length; index += 1) {
          inspectNode(object[index], objects, duplicatesIndexes);
        }
      } else {
        objectKeyList = Object.keys(object);

        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
        }
      }
    }
  }
}

function dump(input, options) {
  options = options || {};

  var state = new State$1(options);

  if (!state.noRefs) getDuplicateReferences(input, state);

  var value = input;

  if (state.replacer) {
    value = state.replacer.call({ '': value }, '', value);
  }

  if (writeNode(state, 0, value, true, true)) return state.dump + '\n';

  return '';
}

var dump_1 = dump;

var dumper = {
	dump: dump_1
};

function renamed(from, to) {
  return function () {
    throw new Error('Function yaml.' + from + ' is removed in js-yaml 4. ' +
      'Use yaml.' + to + ' instead, which is now safe by default.');
  };
}


var Type$1                = type;
var Schema$1              = schema;
var FAILSAFE_SCHEMA     = failsafe;
var JSON_SCHEMA         = json;
var CORE_SCHEMA         = core;
var DEFAULT_SCHEMA      = _default;
var load$1                = loader.load;
var loadAll$1             = loader.loadAll;
var dump$1                = dumper.dump;
var YAMLException$1       = exception;

// Removed functions from JS-YAML 3.0.x
var safeLoad            = renamed('safeLoad', 'load');
var safeLoadAll         = renamed('safeLoadAll', 'loadAll');
var safeDump            = renamed('safeDump', 'dump');

var jsYaml = {
	Type: Type$1,
	Schema: Schema$1,
	FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
	JSON_SCHEMA: JSON_SCHEMA,
	CORE_SCHEMA: CORE_SCHEMA,
	DEFAULT_SCHEMA: DEFAULT_SCHEMA,
	load: load$1,
	loadAll: loadAll$1,
	dump: dump$1,
	YAMLException: YAMLException$1,
	safeLoad: safeLoad,
	safeLoadAll: safeLoadAll,
	safeDump: safeDump
};

const make_slug$2 = make_session_slug_processor({
	preserve_unicode: false,
	separator: "-",
});

/**
 * Parse the frontmatter contained with markdown files. This frontmatter is available on the
 * 				`data.frontmatter` property of the returned `vFile`.
 */
function parse_frontmatter() {
	return function transformer(tree, vFile) {
		unistUtilVisit(tree, "yaml", (node) => {
			try {
				const data = jsYaml.load(node.value) ;
				if (data) {
					// @ts-ignore
					vFile.data.frontmatter = data;

					if (!vFile.data.section_slug) {
						vFile.data.section_slug = make_slug$2(
							//@ts-ignore

							vFile.data.frontmatter.title,
							vFile.data.seen_slugs
						);
					}

					if (!vFile.data.section_title) {
						//@ts-ignore
						vFile.data.section_title =
							vFile.data.docs_type === "faq"
								? //@ts-ignore
								  vFile.data.frontmatter.question
								: //@ts-ignore
								  vFile.data.frontmatter.title;
					}
				}
			} catch (e) {
				vFile.messages.push(new vfileMessage("YAML failed to parse", e));
			}
		});
	};
}

/**
 * The svelte docs have a special two-column display for code examples. This
 * 				allows arbitrary content to appear alongside a highlighted code example.
 *
 * This formatting starts at `***` (a `hr`) and ends with the next fenced code block. All
 * 				of this content is wrappeed in `<div class="side-by-side" />`. then there
 * 				are two nested divs `<div class="copy" />` which contains the arbirtary
 * 				content *up to* the code block and `<div class="code" />` which contains
 * 				the code block itself.
 */
function split_view() {
	return function (tree, vFile) {
		if (vFile.data.docs_type !== "docs") return;

		unistUtilVisit(tree, "element", (node, i, parent) => {
			if (node.tagName === "hr") {
				const left = {
					type: "element",
					tagName: "div",
					properties: { className: "copy" },
					children: [],
				};

				const right = {
					type: "element",
					tagName: "div",
					properties: { className: "code" },
					children: [],
				};

				// starting from the current node, we iterate the children of the parent
				// when we find the next code block (which is a `raw` node at this point)
				// we stop, as we have all of the content
				for (let index = i + 1; index < parent.children.length; index++) {
					const _node = parent.children[index];

					if (!_node) break;

					// data.code_block is set as meta data when highlight code blocks in another transform
					if (_node.data && _node.data.code_block) {
						const parts = parent.children.splice(i + 1, index - i);

						left.children = parts;
						right.children.push(parts.pop());
						break;
					}
				}

				node.tagName = "div";
				node.properties = { className: "side-by-side" };
				node.children = [left, right];
			}
		});
	};
}

const SLUG_PRESERVE_UNICODE = false;
const SLUG_SEPARATOR = "-";

const make_slug$1 = make_session_slug_processor({
	preserve_unicode: SLUG_PRESERVE_UNICODE,
	separator: SLUG_SEPARATOR,
});













// MDAST == Markdown AST
// HAST == HTML AST

const { process: process$1 } = unified_1()
	// parse to MDAST
	.use(remarkParse)
	.use(remarkFrontmatter)
	//  MDAST transforms
	.use(parse_frontmatter)
	.use(strip_h1)
	.use(increment_headings)
	.use(validate_headings)
	.use(linkify_headings)
	.use(set_link_attributes)
	.use(highight_code_block)
	// MDAST -> HAST
	.use(remarkRehype, {
		allowDangerousHtml: true,
		// custom handler for raw nodes so we don't lose metadata
		handlers: {
			html: function html(h, node) {
				return h.dangerous
					? h.augment(
							node,
							unistBuilder("raw", { data: node.data || {} }, node.value )
					  )
					: null;
			},
		},
	})
	// HAST transforms
	.use(split_view)
	// HAST -> string
	.use(rehypeStringify, { allowDangerousCharacters: true, allowDangerousHtml: true });

async function format({
	file,
	markdown,
	project,
	docs_type,
	dir,
	seen_slugs = new Map(),
	level,
	title,
	slug,
}) {
	const file_type = file.toLowerCase().endsWith("readme.md")
		? "readme"
		: "other";

	const is_readme = file_type === "readme";

	const sections = [];
	const section_title = title || (is_readme && project) || false;

	const section_slug =
		(is_readme && make_slug$1(project.replace("@sveltejs/", ""), seen_slugs)) ||
		(slug && make_slug$1(slug, seen_slugs)) ||
		(title && make_slug$1(title, seen_slugs)) ||
		false;

	const vfile$1 = vfile({
		contents: markdown,
		data: {
			seen_slugs,
			sections,
			section_stack: [sections],
			section_title,
			section_slug,
			dir: is_readme ? `${dir}/${section_slug}` : dir,
			file_type,
			docs_type,
			base_level: level,
			prev_level: level,
			slugs: [],
		},
	});

	const docs = (await process$1(vfile$1)) ;

	return docs;
}

// TODO: there are about 10 of these, dedupe?
const make_slug = make_session_slug_processor({
	preserve_unicode: false,
	separator: "-",
});

async function transform_blog(
	blogs,
	project,
	dir
) {
	const dates = [];
	const final_blog = (
		await Promise.all(
			blogs.map((doc, i) => {
				const match = /^(\d+-\d+-\d+)-(.+)\.md$/.exec(blogs[i].name);
				if (!match)
					throw new Error(`Invalid filename for blog: '${blogs[i].name}'`);

				const [, pubdate, slug] = match;
				const date = new Date(`${pubdate} EDT`);
				dates.push({
					pretty: date.toDateString(),
					numeric: pubdate,
				});

				return format({
					file: doc.name,
					markdown: doc.content,
					project,
					docs_type: "blog",
					dir: `${dir}/${slug}`,
					level: 2,
					slug,
				});
			})
		)
	)
		.map((doc, i) => {
			return {
				title: doc.data.section_title,
				slug: doc.data.section_slug,
				file: blogs[i].name,
				content: doc.contents.toString(),
				date: dates[i],
			};
		})
		.sort((a, b) => (a.date.numeric < b.date.numeric ? 1 : -1));

	return {
		list: final_blog.map((d) => {
			const { content, ...rest } = d;
			return rest;
		}),
		full: final_blog,
	};
}

async function transform_docs(
	docs,
	project,
	dir
) {
	const seen_slugs = new Map();
	const final_docs = (
		await Promise.all(
			docs.map((doc) => {
				return format({
					file: doc.name,
					markdown: doc.content,
					project,
					docs_type: "docs",
					dir,
					seen_slugs,
					level: 3,
				});
			})
		)
	).map((doc, i) => ({
		title: doc.data.section_title,
		slug: doc.data.section_slug,
		file: docs[i].name,
		sections: doc.data.sections,
		content: doc.contents.toString(),
	}));

	return {
		list: final_docs.map((d) => {
			const { content, ...rest } = d;
			return rest;
		}),
		full: final_docs,
	};
}

function get_files({ name, content }) {
	return {
		name,
		type: name.split(".").pop(),
		content,
	};
}

function extract_meta(files) {
	const index = files.findIndex(({ name }) => name.endsWith("meta.json"));

	if (index < 0) throw new Error("Examples must have a meta.json file.");

	const meta = JSON.parse(files.slice(index, index + 1)[0].content );

	return [files.filter((_, i) => i !== index), meta];
}

function process_example(
	content,
	seen_slugs
) {
	let full = [];
	let list = content.map(({ content }) => {
		if (typeof content === "string")
			throw new Error("Example contents cannot contain further directories.");

		const [files, meta] = extract_meta(content);
		const slug = make_slug(meta.title, seen_slugs);

		const _example = {
			name: meta.title,
			slug,
			thumbnail: `examples/thumbnails/${slug}.jpg`,
		};

		full.push({ ..._example, files: files.map(get_files) });

		return _example;
	});

	return [full, list];
}

async function transform_examples(
	examples
	// TODO: signatures should be consistent -- do we need these params?
	// project: string,
	// dir: string
) {
	const seen_slugs = new Map();

	const full = [];
	const list = examples.map(({ content }) => {
		if (typeof content === "string")
			throw new Error("Example contents cannot contain further directories.");

		const [files, meta] = extract_meta(content);
		const [example_full, example_list] = process_example(files, seen_slugs);

		example_full.forEach((v) => full.push(v));

		return {
			name: meta.title,
			examples: example_list,
		};
	});
	return { list, full };
}

async function process_tutorial(
	content,
	seen_slugs,
	project
) {
	let full = [];
	let list = await Promise.all(
		content.map(async ({ content }) => {
			// TODO: this is backwards, fix
			if (typeof content === "string")
				throw new Error("Example contents cannot contain further directories.");

			let initial;
			let completed;
			let text;

			content.forEach(({ name, content }) => {
				if (name === "app-a" && Array.isArray(content)) initial = content;
				if (name === "app-b" && Array.isArray(content)) completed = content;
				if (name === "text.md" && typeof content === "string") text = content;
			});

			const vfile = await format({
				file: vfileMessage.name,
				markdown: text,
				docs_type: "tutorials",
				project,
				dir: "tutorial",
				level: 3,
			});

			const _example = {
				name: vfile.data.section_title,
				slug: vfile.data.section_slug,
			};

			full.push({
				..._example,
				initial: initial.map(get_files),
				complete: completed ? completed.map(get_files) : [],
				content: vfile.contents ,
			});

			return _example;
		})
	);

	return [full, list];
}

async function transform_tutorial(
	examples,
	project
	// dir: string
) {
	const seen_slugs = new Map();

	const full = [];
	const list = await Promise.all(
		examples.map(async ({ content }) => {
			const [files, meta] = extract_meta(content);
			const [example_full, example_list] = await process_tutorial(
				files,
				seen_slugs,
				project
			);

			example_full.forEach((v) => full.push(v));

			return {
				name: meta.title,
				tutorials: example_list,
			};
		})
	);
	return { list, full };
}

async function transform_faq(
	blogs,
	project,
	dir
) {
	const final_faq = (
		await Promise.all(
			blogs.map((doc) => {
				const match = /^(\d+)-(.+)\.md$/.exec(doc.name);
				if (!match) throw new Error(`Invalid filename for faq: '${doc.name}'`);

				const [, , slug] = match;

				return format({
					file: doc.name,
					markdown: doc.content,
					project,
					docs_type: "faq",
					dir,
					level: 3,
					slug,
				});
			})
		)
	).map((doc, i) => {
		return {
			title: doc.data.section_title,
			slug: doc.data.section_slug,
			file: blogs[i].name,
			content: doc.contents.toString(),
		};
	});

	return {
		list: final_faq.map((d) => {
			const { content, ...rest } = d;
			return rest;
		}),
		full: final_faq,
	};
}

const transform_map = {
	docs: transform_docs,
	migrating: transform_docs,
	faq: transform_faq,
	blog: transform_blog,
	examples: transform_examples,
	tutorial: transform_tutorial,
};
















const dir_map = {
	docs: "docs",
	migrating: "migrating",
	faq: "faq",
	blog: "blog",
	examples: "examples",
	tutorial: "tutorial",
};

async function transform(files, project) {
	const docs = [];

	for (const key in files) {
		const dir =
			key === "docs" && project !== "kit" && project !== "svelte"
				? `docs/${project}`
				: //@ts-ignore
				  dir_map[key];

		docs.push({
			content: await transform_map[key ](
				//@ts-ignore
				files[key],
				project,
				dir
			),
			project,
			type: key,
		});
	}

	return docs;
}

// docs: Array<Record<string, unknown>>, { project, type, keyby, version }

async function get_repo(
	target_repo,
	target_branch,
	docs_path,
	pkg_path
) {
	const tmp_dir_name = `__tmp_repo_path`;

	// we want to clone the necessary branch and only that branch
	// but we don't want files because we want to sparsely checkout the branch later
	// we also don't want any history, we only care about files
	// this is basically magic
	await exec_1.exec("git", [
		"clone",
		`https://github.com/sveltejs/${target_repo}.git`,
		"--no-checkout",
		"--branch",
		target_branch,
		"--single-branch",
		tmp_dir_name,
		"--depth",
		"1",
		"--verbose",
	]);

	process.chdir(tmp_dir_name);

	await exec_1.exec("git", ["sparse-checkout", "init"]);

	// we only care about the documentation folder and any package readmes + package.jsons
	fs__default['default'].writeFileSync(
		path__default['default'].join(process.cwd(), ".git/info/sparse-checkout"),
		`/${docs_path}/\n/${pkg_path}/*/README.md\n/${pkg_path}/*/package.json\n/README.md\n/package.json`
	);

	await exec_1.exec("git", ["sparse-checkout", "reapply"]);
	await exec_1.exec("git", ["switch", target_branch]);
}

async function run() {
	const target_repo = core$4.getInput("repo");
	const target_branch = core$4.getInput("branch");
	core$4.getInput("token");
	const docs_path = core$4.getInput("docs_path");
	const pkg_path = core$4.getInput("pkg_path");

	if (target_branch !== "main" && target_branch !== "master") {
		core$4.setFailed("Branch deploys are not yet supported.");
	}

	try {
		await get_repo(target_repo, target_branch, docs_path, pkg_path);
	} catch (e) {
		core$4.warning(e.message);
		core$4.setFailed(
			`Failed to clone repository: https://github.com/sveltejs/${target_repo}.git#${target_branch}`
		);
	}

	let docs;

	try {
		docs = await get_docs(target_repo, pkg_path, docs_path);
	} catch (e) {
		core$4.warning(e.message);
		core$4.setFailed("Failed to read documentation files.");
		throw new Error("no docs");
	}

	const transformed_docs = await Promise.all(
		docs.map(([project, docs]) =>
			// @ts-ignore
			transform(docs, project)
		)
	);

	const ready_for_cf = transformed_docs
		.map((d) =>
			d.map(({ content, project, type }) =>
				//@ts-ignore
				transform_cloudflare(content, { project, type, keyby: "slug" })
			)
		)
		.flat(Infinity);

	console.log(JSON.stringify(ready_for_cf, null, 2));

	// try {
	// 	const x = await put(`${API_ROOT}${KV_WRITE}`, {
	// 		body: ready_for_cf,
	// 		headers: {
	// 			Authorization: `Bearer ${CF_TOKEN}`,
	// 		},
	// 	});
	// 	console.log("put: ", x);
	// } catch (e) {
	// 	console.log("it didn't work", e.message);
	// 	throw e;
	// }
}

run();
