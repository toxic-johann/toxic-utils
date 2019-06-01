import { isArray, isNil, isObject, isPlainObject, isString } from "lodash-es";
/**
 * the handler to generate an deep traversal handler
 * @param {Function} fn the function you wanna run when you reach in the deep property
 * @param {Function} setter the function we used to set the value, can be used as Vue.set
 * @return {Function}    the handler
 */
// tslint:disable-next-line: max-line-length
export function genTraversalHandler(fn: (...args: any[]) => any, setter: (...args: any[]) => any = (target: { [propName: string]: any}, key: string, value: any) => { target[key] = value; }): (...args: any[]) => any {
  // use recursive to move what in source to the target
  // if you do not provide a target, we will create a new target
  function recursiveFn(source: any, target: any, key: string) {
    if (isArray(source) || isPlainObject(source)) {
      target = !isObject(target)
        ? (isPlainObject(source) ? {} : [])
        : target;
      for (const name in source) {
        if (!source.hasOwnProperty(name)) { continue; }
        setter(target, name, recursiveFn(source[name], target[name], name));
      }
      return target;
    }
    return fn(source, target, key);
  }
  return recursiveFn;
}
const myDeepAssign = genTraversalHandler((val: any) => val);
/**
 * deeply clone an object
 * @param  {Array|Object} source if you pass in other type, it will throw an error
 * @return {clone-target}        the new Object
 */
export function deepClone<T>(source: T): T {
  if (!isObject(source)) {
    throw new TypeError("deepClone only accept non primitive type");
  }
  return myDeepAssign(source);
}
/**
 * merge multiple objects
 * @param  {...Object} args [description]
 * @return {merge-object}         [description]
 */
export function deepAssign<T>(...args: T[]): T & T {
  if (args.length < 2) {
    throw new Error("deepAssign accept two and more argument");
  }
  for (let i = args.length - 1; i > -1; i--) {
    if (!isObject(args[i])) {
      throw new TypeError("deepAssign only accept non primitive type");
    }
  }
  const target = args.shift();
  args.forEach((source) => myDeepAssign(source, target));
  return target;
}

/**
 * camelize any string, e.g hello world -> helloWorld
 * @param  {string} str only accept string!
 * @return {string}     camelize string
 */
export function camelize(str: string, isBig?: boolean): string {
  return str.replace(/(^|[^a-zA-Z]+)([a-zA-Z])/g, (match, spilt, initials, index) => {
    return (!isBig && index === 0)
      ? initials.toLowerCase()
      : initials.toUpperCase();
  });
}
/**
 * hypenate any string e.g hello world -> hello-world
 * @param  {string} str only accept string
 * @return {string}
 */
export function hypenate(str: string): string {
  return camelize(str).replace(/([A-Z])/g, (match) => "-" + match.toLowerCase());
}

/**
 * bind the function with some context. we have some fallback strategy here
 * @param {function} fn the function which we need to bind the context on
 * @param {any} context the context object
 */
export function bind(fn: (...args: any[]) => any, context: any): (...args: any[]) => any {
  if (fn.bind) {
    return fn.bind(context);
  } else if (fn.apply) {
    return function __autobind__(...args: any[]) {
      return fn.apply(context, args);
    };
  }
  return function __autobind__(...args: any[]) {
    return fn.call(context, ...args);
  };

}

/**
 * generate an uuid
 */
export function uuid(): string {
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
/**
 * generate an random number which length is 4
 */
export function S4(): string {
  /* eslint-disable no-bitwise */
  // tslint:disable-next-line: no-bitwise
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  /* eslint-enable no-bitwise */
}

/**
 * generate an random number with specific length
 */
export function rand(length: number): string {
  let str = "";
  while (str.length < length) {
    str += S4();
  }
  return str.slice(0, length);
}

/**
 * get an deep property
 */
export function getDeepProperty(obj: any, keys: string | string[], {
  throwError = false,
  backup,
}: {
  throwError?: boolean,
  backup?: any,
} = {}) {
  if (isString(keys)) {
    keys = keys.split(".");
  }
  if (!isArray(keys)) {
    throw new TypeError("keys of getDeepProperty must be string or Array<string>");
  }
  const read = [];
  let target = obj;
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    if (isNil(target)) {
      if (throwError) {
        throw new Error(`obj${read.length > 0 ? ("." + read.join(".")) : " itself"} is ${target}`);
      } else {
        return backup;
      }
    }
    target = target[key];
    read.push(key);
  }
  return target;
}
