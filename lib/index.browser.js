
/**
 * toxic-utils v0.3.0-alpha.1
 * (c) 2017 toxic-johann
 * Released under MIT
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.toxicUtils = {})));
}(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	var _freeGlobal = freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = _freeGlobal || freeSelf || Function('return this')();

	var _root = root;

	/** Built-in value references. */
	var Symbol = _root.Symbol;

	var _Symbol = Symbol;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	var _getRawTag = getRawTag;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$1.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString$1.call(value);
	}

	var _objectToString = objectToString;

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag$1 && symToStringTag$1 in Object(value))
	    ? _getRawTag(value)
	    : _objectToString(value);
	}

	var _baseGetTag = baseGetTag;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	var isArray_1 = isArray;

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
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike;

	/** `Object#toString` result references. */
	var stringTag = '[object String]';

	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray_1(value) && isObjectLike_1(value) && _baseGetTag(value) == stringTag);
	}

	var isString_1 = isString;

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	var _overArg = overArg;

	/** Built-in value references. */
	var getPrototype = _overArg(Object.getPrototypeOf, Object);

	var _getPrototype = getPrototype;

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto$2 = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike_1(value) || _baseGetTag(value) != objectTag) {
	    return false;
	  }
	  var proto = _getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty$1.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
	    funcToString.call(Ctor) == objectCtorString;
	}

	var isPlainObject_1 = isPlainObject;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject;

	/**
	 * Checks if `value` is `null` or `undefined`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
	 * @example
	 *
	 * _.isNil(null);
	 * // => true
	 *
	 * _.isNil(void 0);
	 * // => true
	 *
	 * _.isNil(NaN);
	 * // => false
	 */
	function isNil(value) {
	  return value == null;
	}

	var isNil_1 = isNil;

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
	        if (isArray_1(source) || isPlainObject_1(source)) {
	            target = !isObject_1(target) ? isPlainObject_1(source) ? {} : [] : target;
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
	    if (!isObject_1(source)) {
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
	        if (!isObject_1(args[i])) {
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
	    if (isString_1(keys)) {
	        keys = keys.split(".");
	    }
	    if (!isArray_1(keys)) {
	        throw new TypeError("keys of getDeepProperty must be string or Array<string>");
	    }
	    var read = [];
	    var target = obj;
	    for (var i = 0, len = keys.length; i < len; i++) {
	        var key = keys[i];
	        if (isNil_1(target)) {
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

	exports.genTraversalHandler = genTraversalHandler;
	exports.deepClone = deepClone;
	exports.deepAssign = deepAssign;
	exports.camelize = camelize;
	exports.hypenate = hypenate;
	exports.bind = bind;
	exports.uuid = uuid;
	exports.S4 = S4;
	exports.rand = rand;
	exports.getDeepProperty = getDeepProperty;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
