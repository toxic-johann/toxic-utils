
/**
 * toxic-utils v0.4.3
 * (c) 2017-2019 toxic-johann
 * Released under MIT
 * Built ad Mon Jun 03 2019 23:40:55 GMT+0800 (China Standard Time)
 */

import { isObject, isString, isArray, isNil, isPlainObject } from 'lodash-es';

function genTraversalHandler(fn, setter) {
  if (setter === void 0) {
    setter = function setter(target, key, value) {
      target[key] = value;
    };
  }

  function recursiveFn(source, target, key) {
    if (isArray(source) || isPlainObject(source)) {
      target = !isObject(target) ? isPlainObject(source) ? {} : [] : target;

      for (var name_1 in source) {
        if (!source.hasOwnProperty(name_1)) {
          continue;
        }

        setter(target, name_1, recursiveFn(source[name_1], target[name_1], name_1));
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
function deepClone(source) {
  if (!isObject(source)) {
    throw new TypeError("deepClone only accept non primitive type");
  }

  return myDeepAssign(source);
}
function deepAssign() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  if (args.length < 2) {
    throw new Error("deepAssign accept two and more argument");
  }

  for (var i = args.length - 1; i > -1; i--) {
    if (!isObject(args[i])) {
      throw new TypeError("deepAssign only accept non primitive type");
    }
  }

  var target = args.shift();
  args.forEach(function (source) {
    return myDeepAssign(source, target);
  });
  return target;
}
function camelize(str, isBig) {
  return str.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, function (match, spilt, initials, index) {
    return !isBig && index === 0 ? initials.toLowerCase() : initials.toUpperCase();
  });
}
function hypenate(str) {
  return camelize(str).replace(/([A-Z])/g, function (match) {
    return "-" + match.toLowerCase();
  });
}
function bind(fn, context) {
  if (fn.bind) {
    return fn.bind(context);
  } else if (fn.apply) {
    return function __autobind__() {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return fn.apply(context, args);
    };
  }

  return function __autobind__() {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return fn.call.apply(fn, [context].concat(args));
  };
}
function uuid() {
  return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
}
function S4() {
  return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
}
function rand(length) {
  var str = "";

  while (str.length < length) {
    str += S4();
  }

  return str.slice(0, length);
}
function getDeepProperty(obj, keys, _a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.throwError,
      throwError = _c === void 0 ? false : _c,
      backup = _b.backup;

  if (isString(keys)) {
    keys = keys.split(".");
  }

  if (!isArray(keys)) {
    throw new TypeError("keys of getDeepProperty must be string or Array<string>");
  }

  var read = [];
  var target = obj;

  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];

    if (isNil(target)) {
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

export { S4, bind, camelize, deepAssign, deepClone, genTraversalHandler, getDeepProperty, hypenate, rand, uuid };
