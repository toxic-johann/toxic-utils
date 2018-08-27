
/**
 * toxic-utils v0.3.0
 * (c) 2017 toxic-johann
 * Released under MIT
 */

import _isString from 'lodash/isString';
import _isPlainObject from 'lodash/isPlainObject';
import _isObject from 'lodash/isObject';
import _isNil from 'lodash/isNil';
import _isArray from 'lodash/isArray';

/**
 * the handler to generate an deep traversal handler
 * @param {Function} fn the function you wanna run when you reach in the deep property
 * @param {Function} setter the function we used to set the value, can be used as Vue.set
 * @return {Function}    the handler
 */
// tslint:disable-next-line: max-line-length
function genTraversalHandler(fn, setter) {
    if (setter === void 0) {
        setter = function setter(target, key, value) {
            target[key] = value;
        };
    }
    // use recursive to move what in source to the target
    // if you do not provide a target, we will create a new target
    function recursiveFn(source, target, key) {
        if (_isArray(source) || _isPlainObject(source)) {
            target = !_isObject(target) ? _isPlainObject(source) ? {} : [] : target;
            for (var name in source) {
                if (!source.hasOwnProperty(name)) {
                    continue;
                }
                setter(target, name, recursiveFn(source[name], target[name], name));
            }
            return target;
        }
        return fn(source, target, key);
    }
    return recursiveFn;
}
var myDeepAssign = genTraversalHandler(function (val) {
    return val;
});
/**
 * deeply clone an object
 * @param  {Array|Object} source if you pass in other type, it will throw an error
 * @return {clone-target}        the new Object
 */
function deepClone(source) {
    if (!_isObject(source)) {
        throw new TypeError("deepClone only accept non primitive type");
    }
    return myDeepAssign(source);
}
/**
 * merge multiple objects
 * @param  {...Object} args [description]
 * @return {merge-object}         [description]
 */
function deepAssign() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    if (args.length < 2) {
        throw new Error("deepAssign accept two and more argument");
    }
    for (var i = args.length - 1; i > -1; i--) {
        if (!_isObject(args[i])) {
            throw new TypeError("deepAssign only accept non primitive type");
        }
    }
    var target = args.shift();
    args.forEach(function (source) {
        return myDeepAssign(source, target);
    });
    return target;
}
/**
 * camelize any string, e.g hello world -> helloWorld
 * @param  {string} str only accept string!
 * @return {string}     camelize string
 */
function camelize(str, isBig) {
    return str.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, function (match, spilt, initials, index) {
        return !isBig && index === 0 ? initials.toLowerCase() : initials.toUpperCase();
    });
}
/**
 * hypenate any string e.g hello world -> hello-world
 * @param  {string} str only accept string
 * @return {string}
 */
function hypenate(str) {
    return camelize(str).replace(/([A-Z])/g, function (match) {
        return "-" + match.toLowerCase();
    });
}
/**
 * bind the function with some context. we have some fallback strategy here
 * @param {function} fn the function which we need to bind the context on
 * @param {any} context the context object
 */
function bind(fn, context) {
    if (fn.bind) {
        return fn.bind(context);
    } else if (fn.apply) {
        return function __autobind__() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            return fn.apply(context, args);
        };
    }
    return function __autobind__() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        return fn.call.apply(fn, [context].concat(args));
    };
}
/**
 * generate an uuid
 */
function uuid() {
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}
/**
 * generate an random number which length is 4
 */
function S4() {
    /* eslint-disable no-bitwise */
    // tslint:disable-next-line: no-bitwise
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    /* eslint-enable no-bitwise */
}
/**
 * generate an random number with specific length
 */
function rand(length) {
    var str = "";
    while (str.length < length) {
        str += S4();
    }
    return str.slice(0, length);
}
/**
 * get an deep property
 */
function getDeepProperty(obj, keys, _a) {
    var _b = _a === void 0 ? {} : _a,
        _c = _b.throwError,
        throwError = _c === void 0 ? false : _c,
        backup = _b.backup;
    if (_isString(keys)) {
        keys = keys.split(".");
    }
    if (!_isArray(keys)) {
        throw new TypeError("keys of getDeepProperty must be string or Array<string>");
    }
    var read = [];
    var target = obj;
    for (var i = 0, len = keys.length; i < len; i++) {
        var key = keys[i];
        if (_isNil(target)) {
            if (throwError) {
                throw new Error("obj" + (read.length > 0 ? "." + read.join(".") : " itself") + " is " + target);
            } else {
                return backup;
            }
        }
        target = target[key];
        read.push(key);
    }
    return target;
}

export { genTraversalHandler, deepClone, deepAssign, camelize, hypenate, bind, uuid, S4, rand, getDeepProperty };
