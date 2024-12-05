var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// node_modules/.deno/events@3.3.0/node_modules/events/events.js
var require_events = __commonJS({
  "node_modules/.deno/events@3.3.0/node_modules/events/events.js"(exports, module) {
    "use strict";
    var R = typeof Reflect === "object" ? Reflect : null;
    var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target, receiver, args) {
      return Function.prototype.apply.call(target, receiver, args);
    };
    var ReflectOwnKeys;
    if (R && typeof R.ownKeys === "function") {
      ReflectOwnKeys = R.ownKeys;
    } else if (Object.getOwnPropertySymbols) {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
      };
    } else {
      ReflectOwnKeys = function ReflectOwnKeys2(target) {
        return Object.getOwnPropertyNames(target);
      };
    }
    function ProcessEmitWarning(warning) {
      if (console && console.warn) console.warn(warning);
    }
    var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
      return value !== value;
    };
    function EventEmitter2() {
      EventEmitter2.init.call(this);
    }
    module.exports = EventEmitter2;
    module.exports.once = once;
    EventEmitter2.EventEmitter = EventEmitter2;
    EventEmitter2.prototype._events = void 0;
    EventEmitter2.prototype._eventsCount = 0;
    EventEmitter2.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter2, "defaultMaxListeners", {
      enumerable: true,
      get: function() {
        return defaultMaxListeners;
      },
      set: function(arg) {
        if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
          throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
        }
        defaultMaxListeners = arg;
      }
    });
    EventEmitter2.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter2.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter2.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter2.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter2.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events2 = this._events;
      if (events2 !== void 0)
        doError = doError && events2.error === void 0;
      else if (!doError)
        return false;
      if (doError) {
        var er;
        if (args.length > 0)
          er = args[0];
        if (er instanceof Error) {
          throw er;
        }
        var err2 = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err2.context = er;
        throw err2;
      }
      var handler = events2[type];
      if (handler === void 0)
        return false;
      if (typeof handler === "function") {
        ReflectApply(handler, this, args);
      } else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
          ReflectApply(listeners[i], this, args);
      }
      return true;
    };
    function _addListener(target, type, listener, prepend) {
      var m;
      var events2;
      var existing;
      checkListener(listener);
      events2 = target._events;
      if (events2 === void 0) {
        events2 = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events2.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events2 = target._events;
        }
        existing = events2[type];
      }
      if (existing === void 0) {
        existing = events2[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
        } else if (prepend) {
          existing.unshift(listener);
        } else {
          existing.push(listener);
        }
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
          existing.warned = true;
          var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
          w.name = "MaxListenersExceededWarning";
          w.emitter = target;
          w.type = type;
          w.count = existing.length;
          ProcessEmitWarning(w);
        }
      }
      return target;
    }
    EventEmitter2.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter2.prototype.on = EventEmitter2.prototype.addListener;
    EventEmitter2.prototype.prependListener = function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };
    function onceWrapper() {
      if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
          return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
      }
    }
    function _onceWrap(target, type, listener) {
      var state = { fired: false, wrapFn: void 0, target, type, listener };
      var wrapped = onceWrapper.bind(state);
      wrapped.listener = listener;
      state.wrapFn = wrapped;
      return wrapped;
    }
    EventEmitter2.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter2.prototype.removeListener = function removeListener(type, listener) {
      var list, events2, position, i, originalListener;
      checkListener(listener);
      events2 = this._events;
      if (events2 === void 0)
        return this;
      list = events2[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events2[type];
          if (events2.removeListener)
            this.emit("removeListener", type, list.listener || listener);
        }
      } else if (typeof list !== "function") {
        position = -1;
        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }
        if (position < 0)
          return this;
        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }
        if (list.length === 1)
          events2[type] = list[0];
        if (events2.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events2, i;
      events2 = this._events;
      if (events2 === void 0)
        return this;
      if (events2.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events2[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events2[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events2);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === "removeListener") continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners("removeListener");
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
        return this;
      }
      listeners = events2[type];
      if (typeof listeners === "function") {
        this.removeListener(type, listeners);
      } else if (listeners !== void 0) {
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }
      return this;
    };
    function _listeners(target, type, unwrap) {
      var events2 = target._events;
      if (events2 === void 0)
        return [];
      var evlistener = events2[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter2.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter2.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter2.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter2.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events2 = this._events;
      if (events2 !== void 0) {
        var evlistener = events2[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
    };
    function arrayClone(arr, n) {
      var copy = new Array(n);
      for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
      return copy;
    }
    function spliceOne(list, index) {
      for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
      list.pop();
    }
    function unwrapListeners(arr) {
      var ret = new Array(arr.length);
      for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
      }
      return ret;
    }
    function once(emitter, name) {
      return new Promise(function(resolve, reject) {
        function errorListener(err2) {
          emitter.removeListener(name, resolver);
          reject(err2);
        }
        function resolver() {
          if (typeof emitter.removeListener === "function") {
            emitter.removeListener("error", errorListener);
          }
          resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== "error") {
          addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
      });
    }
    function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
      if (typeof emitter.on === "function") {
        eventTargetAgnosticAddListener(emitter, "error", handler, flags);
      }
    }
    function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
      if (typeof emitter.on === "function") {
        if (flags.once) {
          emitter.once(name, listener);
        } else {
          emitter.on(name, listener);
        }
      } else if (typeof emitter.addEventListener === "function") {
        emitter.addEventListener(name, function wrapListener(arg) {
          if (flags.once) {
            emitter.removeEventListener(name, wrapListener);
          }
          listener(arg);
        });
      } else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
      }
    }
  }
});

// node_modules/.deno/neverthrow@8.1.1/node_modules/neverthrow/dist/index.es.js
var defaultErrorConfig = {
  withStackTrace: false
};
var createNeverThrowError = (message, result, config = defaultErrorConfig) => {
  const data = result.isOk() ? { type: "Ok", value: result.value } : { type: "Err", value: result.error };
  const maybeStack = config.withStackTrace ? new Error().stack : void 0;
  return {
    data,
    message,
    stack: maybeStack
  };
};
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function() {
      if (o && i >= o.length) o = void 0;
      return { value: o && o[i++], done: !o };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function awaitReturn(f) {
    return function(v) {
      return Promise.resolve(v).then(f, reject);
    };
  }
  function verb(n, f) {
    if (g[n]) {
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function(e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function() {
    return this;
  }, i;
  function verb(n, f) {
    i[n] = o[n] ? function(v) {
      return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && function(v) {
      return new Promise(function(resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function(v2) {
      resolve({ value: v2, done: d });
    }, reject);
  }
}
var ResultAsync = class _ResultAsync {
  constructor(res) {
    this._promise = res;
  }
  static fromSafePromise(promise) {
    const newPromise = promise.then((value) => new Ok(value));
    return new _ResultAsync(newPromise);
  }
  static fromPromise(promise, errorFn) {
    const newPromise = promise.then((value) => new Ok(value)).catch((e) => new Err(errorFn(e)));
    return new _ResultAsync(newPromise);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fromThrowable(fn, errorFn) {
    return (...args) => {
      return new _ResultAsync((() => __awaiter(this, void 0, void 0, function* () {
        try {
          return new Ok(yield fn(...args));
        } catch (error) {
          return new Err(errorFn ? errorFn(error) : error);
        }
      }))());
    };
  }
  static combine(asyncResultList) {
    return combineResultAsyncList(asyncResultList);
  }
  static combineWithAllErrors(asyncResultList) {
    return combineResultAsyncListWithAllErrors(asyncResultList);
  }
  map(f) {
    return new _ResultAsync(this._promise.then((res) => __awaiter(this, void 0, void 0, function* () {
      if (res.isErr()) {
        return new Err(res.error);
      }
      return new Ok(yield f(res.value));
    })));
  }
  andThrough(f) {
    return new _ResultAsync(this._promise.then((res) => __awaiter(this, void 0, void 0, function* () {
      if (res.isErr()) {
        return new Err(res.error);
      }
      const newRes = yield f(res.value);
      if (newRes.isErr()) {
        return new Err(newRes.error);
      }
      return new Ok(res.value);
    })));
  }
  andTee(f) {
    return new _ResultAsync(this._promise.then((res) => __awaiter(this, void 0, void 0, function* () {
      if (res.isErr()) {
        return new Err(res.error);
      }
      try {
        yield f(res.value);
      } catch (e) {
      }
      return new Ok(res.value);
    })));
  }
  mapErr(f) {
    return new _ResultAsync(this._promise.then((res) => __awaiter(this, void 0, void 0, function* () {
      if (res.isOk()) {
        return new Ok(res.value);
      }
      return new Err(yield f(res.error));
    })));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  andThen(f) {
    return new _ResultAsync(this._promise.then((res) => {
      if (res.isErr()) {
        return new Err(res.error);
      }
      const newValue = f(res.value);
      return newValue instanceof _ResultAsync ? newValue._promise : newValue;
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  orElse(f) {
    return new _ResultAsync(this._promise.then((res) => __awaiter(this, void 0, void 0, function* () {
      if (res.isErr()) {
        return f(res.error);
      }
      return new Ok(res.value);
    })));
  }
  match(ok2, _err) {
    return this._promise.then((res) => res.match(ok2, _err));
  }
  unwrapOr(t) {
    return this._promise.then((res) => res.unwrapOr(t));
  }
  /**
   * @deprecated will be removed in 9.0.0.
   *
   * You can use `safeTry` without this method.
   * @example
   * ```typescript
   * safeTry(async function* () {
   *   const okValue = yield* yourResult
   * })
   * ```
   * Emulates Rust's `?` operator in `safeTry`'s body. See also `safeTry`.
   */
  safeUnwrap() {
    return __asyncGenerator(this, arguments, function* safeUnwrap_1() {
      return yield __await(yield __await(yield* __asyncDelegator(__asyncValues(yield __await(this._promise.then((res) => res.safeUnwrap()))))));
    });
  }
  // Makes ResultAsync implement PromiseLike<Result>
  then(successCallback, failureCallback) {
    return this._promise.then(successCallback, failureCallback);
  }
  [Symbol.asyncIterator]() {
    return __asyncGenerator(this, arguments, function* _a() {
      const result = yield __await(this._promise);
      if (result.isErr()) {
        yield yield __await(errAsync(result.error));
      }
      return yield __await(result.value);
    });
  }
};
var errAsync = (err2) => new ResultAsync(Promise.resolve(new Err(err2)));
var fromPromise = ResultAsync.fromPromise;
var fromSafePromise = ResultAsync.fromSafePromise;
var fromAsyncThrowable = ResultAsync.fromThrowable;
var combineResultList = (resultList) => {
  let acc = ok([]);
  for (const result of resultList) {
    if (result.isErr()) {
      acc = err(result.error);
      break;
    } else {
      acc.map((list) => list.push(result.value));
    }
  }
  return acc;
};
var combineResultAsyncList = (asyncResultList) => ResultAsync.fromSafePromise(Promise.all(asyncResultList)).andThen(combineResultList);
var combineResultListWithAllErrors = (resultList) => {
  let acc = ok([]);
  for (const result of resultList) {
    if (result.isErr() && acc.isErr()) {
      acc.error.push(result.error);
    } else if (result.isErr() && acc.isOk()) {
      acc = err([result.error]);
    } else if (result.isOk() && acc.isOk()) {
      acc.value.push(result.value);
    }
  }
  return acc;
};
var combineResultAsyncListWithAllErrors = (asyncResultList) => ResultAsync.fromSafePromise(Promise.all(asyncResultList)).andThen(combineResultListWithAllErrors);
var Result;
(function(Result2) {
  function fromThrowable2(fn, errorFn) {
    return (...args) => {
      try {
        const result = fn(...args);
        return ok(result);
      } catch (e) {
        return err(errorFn ? errorFn(e) : e);
      }
    };
  }
  Result2.fromThrowable = fromThrowable2;
  function combine(resultList) {
    return combineResultList(resultList);
  }
  Result2.combine = combine;
  function combineWithAllErrors(resultList) {
    return combineResultListWithAllErrors(resultList);
  }
  Result2.combineWithAllErrors = combineWithAllErrors;
})(Result || (Result = {}));
var ok = (value) => new Ok(value);
function err(err2) {
  return new Err(err2);
}
var Ok = class {
  constructor(value) {
    this.value = value;
  }
  isOk() {
    return true;
  }
  isErr() {
    return !this.isOk();
  }
  map(f) {
    return ok(f(this.value));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mapErr(_f) {
    return ok(this.value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  andThen(f) {
    return f(this.value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  andThrough(f) {
    return f(this.value).map((_value) => this.value);
  }
  andTee(f) {
    try {
      f(this.value);
    } catch (e) {
    }
    return ok(this.value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  orElse(_f) {
    return ok(this.value);
  }
  asyncAndThen(f) {
    return f(this.value);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  asyncAndThrough(f) {
    return f(this.value).map(() => this.value);
  }
  asyncMap(f) {
    return ResultAsync.fromSafePromise(f(this.value));
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  unwrapOr(_v) {
    return this.value;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  match(ok2, _err) {
    return ok2(this.value);
  }
  safeUnwrap() {
    const value = this.value;
    return function* () {
      return value;
    }();
  }
  _unsafeUnwrap(_) {
    return this.value;
  }
  _unsafeUnwrapErr(config) {
    throw createNeverThrowError("Called `_unsafeUnwrapErr` on an Ok", this, config);
  }
  // eslint-disable-next-line @typescript-eslint/no-this-alias, require-yield
  *[Symbol.iterator]() {
    return this.value;
  }
};
var Err = class {
  constructor(error) {
    this.error = error;
  }
  isOk() {
    return false;
  }
  isErr() {
    return !this.isOk();
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map(_f) {
    return err(this.error);
  }
  mapErr(f) {
    return err(f(this.error));
  }
  andThrough(_f) {
    return err(this.error);
  }
  andTee(_f) {
    return err(this.error);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  andThen(_f) {
    return err(this.error);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  orElse(f) {
    return f(this.error);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  asyncAndThen(_f) {
    return errAsync(this.error);
  }
  asyncAndThrough(_f) {
    return errAsync(this.error);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  asyncMap(_f) {
    return errAsync(this.error);
  }
  unwrapOr(v) {
    return v;
  }
  match(_ok, err2) {
    return err2(this.error);
  }
  safeUnwrap() {
    const error = this.error;
    return function* () {
      yield err(error);
      throw new Error("Do not use this generator out of `safeTry`");
    }();
  }
  _unsafeUnwrap(config) {
    throw createNeverThrowError("Called `_unsafeUnwrap` on an Err", this, config);
  }
  _unsafeUnwrapErr(_) {
    return this.error;
  }
  *[Symbol.iterator]() {
    const self2 = this;
    yield self2;
    return self2;
  }
};
var fromThrowable = Result.fromThrowable;

// src/error/base-error.ts
var BaseError = class extends Error {
  constructor(message, options = {}) {
    const { cause, context } = options;
    super(message, { cause });
    __publicField(this, "context");
    this.name = this.constructor.name;
    this.context = context;
  }
};

// src/utils.ts
var ensureError = (value) => {
  if (value instanceof Error) return value;
  let stringified = "[Unable to stringify the thrown value]";
  try {
    stringified = JSON.stringify(value);
  } catch (_error) {
  }
  return new Error(stringified);
};

// src/worker/shared.ts
var import_events = __toESM(require_events());
var events = new import_events.default();
var init = () => {
  events.once("SOCKET_OPENED" /* SOCKET_OPENED */, () => {
    self.postMessage({
      event: "SOCKET_OPENED" /* SOCKET_OPENED */
    });
  });
  events.once("OPERATION_FAILED" /* OPERATION_FAILED */, (error) => {
    self.postMessage({ event: "OPERATION_FAILED" /* OPERATION_FAILED */, error });
  });
};

// src/error/worker/worker-error.ts
var WorkerError = class extends BaseError {
};

// src/error/worker/worker-remove-failed-error.ts
var WorkerRemoveFailedError = class extends WorkerError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "Failed to remove the file");
  }
};

// src/worker/remove.ts
var isInitiated = false;
self.onmessage = (event) => {
  if (!isInitiated) {
    init();
    isInitiated = true;
  }
  removeFile(event.data).map(() => {
    self.postMessage({ event: "FILE_REMOVED" /* FILE_REMOVED */ });
  }).mapErr((error) => {
    self.postMessage({
      event: "OPERATION_FAILED" /* OPERATION_FAILED */,
      error
    });
  });
};
var removeFile = (workerMessage) => ResultAsync.fromPromise(
  new Promise((resolve, reject) => {
    const lufiFile = workerMessage.args.lufiFile;
    fetch(
      `${new URL(lufiFile.serverUrl).href}d/${lufiFile.keys.server}/${lufiFile.actionToken}`
    ).then((response) => response.ok ? resolve(void 0) : reject(
      new WorkerRemoveFailedError(void 0, {
        cause: ensureError(response.statusText)
      })
    ));
  }),
  (error) => ensureError(error)
);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vbmV2ZXJ0aHJvd0A4LjEuMS9ub2RlX21vZHVsZXMvbmV2ZXJ0aHJvdy9kaXN0L2luZGV4LmVzLmpzIiwgIi4uLy4uL3NyYy9lcnJvci9iYXNlLWVycm9yLnRzIiwgIi4uLy4uL3NyYy91dGlscy50cyIsICIuLi8uLi9zcmMvd29ya2VyL3NoYXJlZC50cyIsICIuLi8uLi9zcmMvZXJyb3Ivd29ya2VyL3dvcmtlci1lcnJvci50cyIsICIuLi8uLi9zcmMvZXJyb3Ivd29ya2VyL3dvcmtlci1yZW1vdmUtZmFpbGVkLWVycm9yLnRzIiwgIi4uLy4uL3NyYy93b3JrZXIvcmVtb3ZlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwgImNvbnN0IGRlZmF1bHRFcnJvckNvbmZpZyA9IHtcclxuICAgIHdpdGhTdGFja1RyYWNlOiBmYWxzZSxcclxufTtcclxuLy8gQ3VzdG9tIGVycm9yIG9iamVjdFxyXG4vLyBDb250ZXh0IC8gZGlzY3Vzc2lvbjogaHR0cHM6Ly9naXRodWIuY29tL3N1cGVybWFjcm8vbmV2ZXJ0aHJvdy9wdWxsLzIxNVxyXG5jb25zdCBjcmVhdGVOZXZlclRocm93RXJyb3IgPSAobWVzc2FnZSwgcmVzdWx0LCBjb25maWcgPSBkZWZhdWx0RXJyb3JDb25maWcpID0+IHtcclxuICAgIGNvbnN0IGRhdGEgPSByZXN1bHQuaXNPaygpXHJcbiAgICAgICAgPyB7IHR5cGU6ICdPaycsIHZhbHVlOiByZXN1bHQudmFsdWUgfVxyXG4gICAgICAgIDogeyB0eXBlOiAnRXJyJywgdmFsdWU6IHJlc3VsdC5lcnJvciB9O1xyXG4gICAgY29uc3QgbWF5YmVTdGFjayA9IGNvbmZpZy53aXRoU3RhY2tUcmFjZSA/IG5ldyBFcnJvcigpLnN0YWNrIDogdW5kZWZpbmVkO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBkYXRhLFxyXG4gICAgICAgIG1lc3NhZ2UsXHJcbiAgICAgICAgc3RhY2s6IG1heWJlU3RhY2ssXHJcbiAgICB9O1xyXG59O1xuXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UsIFN1cHByZXNzZWRFcnJvciwgU3ltYm9sLCBJdGVyYXRvciAqL1xyXG5cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXRlcih0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcclxuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxyXG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxyXG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XHJcbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IE9iamVjdC5jcmVhdGUoKHR5cGVvZiBBc3luY0l0ZXJhdG9yID09PSBcImZ1bmN0aW9uXCIgPyBBc3luY0l0ZXJhdG9yIDogT2JqZWN0KS5wcm90b3R5cGUpLCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIsIGF3YWl0UmV0dXJuKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gYXdhaXRSZXR1cm4oZikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGYsIHJlamVjdCk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpZiAoZ1tuXSkgeyBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyBpZiAoZikgaVtuXSA9IGYoaVtuXSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gcmVzdW1lKG4sIHYpIHsgdHJ5IHsgc3RlcChnW25dKHYpKTsgfSBjYXRjaCAoZSkgeyBzZXR0bGUocVswXVszXSwgZSk7IH0gfVxyXG4gICAgZnVuY3Rpb24gc3RlcChyKSB7IHIudmFsdWUgaW5zdGFuY2VvZiBfX2F3YWl0ID8gUHJvbWlzZS5yZXNvbHZlKHIudmFsdWUudikudGhlbihmdWxmaWxsLCByZWplY3QpIDogc2V0dGxlKHFbMF1bMl0sIHIpOyB9XHJcbiAgICBmdW5jdGlvbiBmdWxmaWxsKHZhbHVlKSB7IHJlc3VtZShcIm5leHRcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiByZWplY3QodmFsdWUpIHsgcmVzdW1lKFwidGhyb3dcIiwgdmFsdWUpOyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUoZiwgdikgeyBpZiAoZih2KSwgcS5zaGlmdCgpLCBxLmxlbmd0aCkgcmVzdW1lKHFbMF1bMF0sIHFbMF1bMV0pOyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogZmFsc2UgfSA6IGYgPyBmKHYpIDogdjsgfSA6IGY7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxudHlwZW9mIFN1cHByZXNzZWRFcnJvciA9PT0gXCJmdW5jdGlvblwiID8gU3VwcHJlc3NlZEVycm9yIDogZnVuY3Rpb24gKGVycm9yLCBzdXBwcmVzc2VkLCBtZXNzYWdlKSB7XHJcbiAgICB2YXIgZSA9IG5ldyBFcnJvcihtZXNzYWdlKTtcclxuICAgIHJldHVybiBlLm5hbWUgPSBcIlN1cHByZXNzZWRFcnJvclwiLCBlLmVycm9yID0gZXJyb3IsIGUuc3VwcHJlc3NlZCA9IHN1cHByZXNzZWQsIGU7XHJcbn07XG5cbmNsYXNzIFJlc3VsdEFzeW5jIHtcclxuICAgIGNvbnN0cnVjdG9yKHJlcykge1xyXG4gICAgICAgIHRoaXMuX3Byb21pc2UgPSByZXM7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZnJvbVNhZmVQcm9taXNlKHByb21pc2UpIHtcclxuICAgICAgICBjb25zdCBuZXdQcm9taXNlID0gcHJvbWlzZS50aGVuKCh2YWx1ZSkgPT4gbmV3IE9rKHZhbHVlKSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuZXdQcm9taXNlKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBmcm9tUHJvbWlzZShwcm9taXNlLCBlcnJvckZuKSB7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvbWlzZSA9IHByb21pc2VcclxuICAgICAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiBuZXcgT2sodmFsdWUpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGUpID0+IG5ldyBFcnIoZXJyb3JGbihlKSkpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmMobmV3UHJvbWlzZSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgc3RhdGljIGZyb21UaHJvd2FibGUoZm4sIGVycm9yRm4pIHtcclxuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYygoKCkgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9rKHlpZWxkIGZuKC4uLmFyZ3MpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKGVycm9yRm4gPyBlcnJvckZuKGVycm9yKSA6IGVycm9yKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpKCkpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29tYmluZShhc3luY1Jlc3VsdExpc3QpIHtcclxuICAgICAgICByZXR1cm4gY29tYmluZVJlc3VsdEFzeW5jTGlzdChhc3luY1Jlc3VsdExpc3QpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGNvbWJpbmVXaXRoQWxsRXJyb3JzKGFzeW5jUmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0QXN5bmNMaXN0V2l0aEFsbEVycm9ycyhhc3luY1Jlc3VsdExpc3QpO1xyXG4gICAgfVxyXG4gICAgbWFwKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIocmVzLmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9rKHlpZWxkIGYocmVzLnZhbHVlKSk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuICAgIGFuZFRocm91Z2goZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1JlcyA9IHlpZWxkIGYocmVzLnZhbHVlKTtcclxuICAgICAgICAgICAgaWYgKG5ld1Jlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihuZXdSZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgYW5kVGVlKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIocmVzLmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgeWllbGQgZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBUZWUgZG9lcyBub3QgY2FyZSBhYm91dCB0aGUgZXJyb3JcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuICAgIG1hcEVycihmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzT2soKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHlpZWxkIGYocmVzLmVycm9yKSk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaGVuKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIocmVzLmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBuZXdWYWx1ZSA9IGYocmVzLnZhbHVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbHVlIGluc3RhbmNlb2YgUmVzdWx0QXN5bmMgPyBuZXdWYWx1ZS5fcHJvbWlzZSA6IG5ld1ZhbHVlO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBvckVsc2UoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgbWF0Y2gob2ssIF9lcnIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHJlcy5tYXRjaChvaywgX2VycikpO1xyXG4gICAgfVxyXG4gICAgdW53cmFwT3IodCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gcmVzLnVud3JhcE9yKHQpKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgd2lsbCBiZSByZW1vdmVkIGluIDkuMC4wLlxyXG4gICAgICpcclxuICAgICAqIFlvdSBjYW4gdXNlIGBzYWZlVHJ5YCB3aXRob3V0IHRoaXMgbWV0aG9kLlxyXG4gICAgICogQGV4YW1wbGVcclxuICAgICAqIGBgYHR5cGVzY3JpcHRcclxuICAgICAqIHNhZmVUcnkoYXN5bmMgZnVuY3Rpb24qICgpIHtcclxuICAgICAqICAgY29uc3Qgb2tWYWx1ZSA9IHlpZWxkKiB5b3VyUmVzdWx0XHJcbiAgICAgKiB9KVxyXG4gICAgICogYGBgXHJcbiAgICAgKiBFbXVsYXRlcyBSdXN0J3MgYD9gIG9wZXJhdG9yIGluIGBzYWZlVHJ5YCdzIGJvZHkuIFNlZSBhbHNvIGBzYWZlVHJ5YC5cclxuICAgICAqL1xyXG4gICAgc2FmZVVud3JhcCgpIHtcclxuICAgICAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBzYWZlVW53cmFwXzEoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCBfX2F3YWl0KHlpZWxkIF9fYXdhaXQoeWllbGQqIF9fYXN5bmNEZWxlZ2F0b3IoX19hc3luY1ZhbHVlcyh5aWVsZCBfX2F3YWl0KHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiByZXMuc2FmZVVud3JhcCgpKSkpKSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gTWFrZXMgUmVzdWx0QXN5bmMgaW1wbGVtZW50IFByb21pc2VMaWtlPFJlc3VsdD5cclxuICAgIHRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIFtTeW1ib2wuYXN5bmNJdGVyYXRvcl0oKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXN5bmNHZW5lcmF0b3IodGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiogX2EoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIF9fYXdhaXQodGhpcy5fcHJvbWlzZSk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgICAgICAgICB5aWVsZCB5aWVsZCBfX2F3YWl0KGVyckFzeW5jKHJlc3VsdC5lcnJvcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLS0gVGhpcyBpcyBzdHJ1Y3R1cmFsbHkgZXF1aXZhbGVudCBhbmQgc2FmZVxyXG4gICAgICAgICAgICByZXR1cm4geWllbGQgX19hd2FpdChyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IG9rQXN5bmMgPSAodmFsdWUpID0+IG5ldyBSZXN1bHRBc3luYyhQcm9taXNlLnJlc29sdmUobmV3IE9rKHZhbHVlKSkpO1xyXG5jb25zdCBlcnJBc3luYyA9IChlcnIpID0+IG5ldyBSZXN1bHRBc3luYyhQcm9taXNlLnJlc29sdmUobmV3IEVycihlcnIpKSk7XHJcbmNvbnN0IGZyb21Qcm9taXNlID0gUmVzdWx0QXN5bmMuZnJvbVByb21pc2U7XHJcbmNvbnN0IGZyb21TYWZlUHJvbWlzZSA9IFJlc3VsdEFzeW5jLmZyb21TYWZlUHJvbWlzZTtcclxuY29uc3QgZnJvbUFzeW5jVGhyb3dhYmxlID0gUmVzdWx0QXN5bmMuZnJvbVRocm93YWJsZTtcblxuLyoqXHJcbiAqIFNob3J0IGNpcmN1aXRzIG9uIHRoZSBGSVJTVCBFcnIgdmFsdWUgdGhhdCB3ZSBmaW5kXHJcbiAqL1xyXG5jb25zdCBjb21iaW5lUmVzdWx0TGlzdCA9IChyZXN1bHRMaXN0KSA9PiB7XHJcbiAgICBsZXQgYWNjID0gb2soW10pO1xyXG4gICAgZm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0TGlzdCkge1xyXG4gICAgICAgIGlmIChyZXN1bHQuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICBhY2MgPSBlcnIocmVzdWx0LmVycm9yKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhY2MubWFwKChsaXN0KSA9PiBsaXN0LnB1c2gocmVzdWx0LnZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjYztcclxufTtcclxuLyogVGhpcyBpcyB0aGUgdHlwZXNhZmUgdmVyc2lvbiBvZiBQcm9taXNlLmFsbFxyXG4gKlxyXG4gKiBUYWtlcyBhIGxpc3Qgb2YgUmVzdWx0QXN5bmM8VCwgRT4gYW5kIHN1Y2Nlc3MgaWYgYWxsIGlubmVyIHJlc3VsdHMgYXJlIE9rIHZhbHVlc1xyXG4gKiBvciBmYWlscyBpZiBvbmUgKG9yIG1vcmUpIG9mIHRoZSBpbm5lciByZXN1bHRzIGFyZSBFcnIgdmFsdWVzXHJcbiAqL1xyXG5jb25zdCBjb21iaW5lUmVzdWx0QXN5bmNMaXN0ID0gKGFzeW5jUmVzdWx0TGlzdCkgPT4gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlKFByb21pc2UuYWxsKGFzeW5jUmVzdWx0TGlzdCkpLmFuZFRoZW4oY29tYmluZVJlc3VsdExpc3QpO1xyXG4vKipcclxuICogR2l2ZSBhIGxpc3Qgb2YgYWxsIHRoZSBlcnJvcnMgd2UgZmluZFxyXG4gKi9cclxuY29uc3QgY29tYmluZVJlc3VsdExpc3RXaXRoQWxsRXJyb3JzID0gKHJlc3VsdExpc3QpID0+IHtcclxuICAgIGxldCBhY2MgPSBvayhbXSk7XHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpICYmIGFjYy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgIGFjYy5lcnJvci5wdXNoKHJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdC5pc0VycigpICYmIGFjYy5pc09rKCkpIHtcclxuICAgICAgICAgICAgYWNjID0gZXJyKFtyZXN1bHQuZXJyb3JdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0LmlzT2soKSAmJiBhY2MuaXNPaygpKSB7XHJcbiAgICAgICAgICAgIGFjYy52YWx1ZS5wdXNoKHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGRvIG5vdGhpbmcgd2hlbiByZXN1bHQuaXNPaygpICYmIGFjYy5pc0VycigpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG59O1xyXG5jb25zdCBjb21iaW5lUmVzdWx0QXN5bmNMaXN0V2l0aEFsbEVycm9ycyA9IChhc3luY1Jlc3VsdExpc3QpID0+IFJlc3VsdEFzeW5jLmZyb21TYWZlUHJvbWlzZShQcm9taXNlLmFsbChhc3luY1Jlc3VsdExpc3QpKS5hbmRUaGVuKGNvbWJpbmVSZXN1bHRMaXN0V2l0aEFsbEVycm9ycyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXHJcbnZhciBSZXN1bHQ7XHJcbihmdW5jdGlvbiAoUmVzdWx0KSB7XHJcbiAgICAvKipcclxuICAgICAqIFdyYXBzIGEgZnVuY3Rpb24gd2l0aCBhIHRyeSBjYXRjaCwgY3JlYXRpbmcgYSBuZXcgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZVxyXG4gICAgICogYXJndW1lbnRzIGJ1dCByZXR1cm5pbmcgYE9rYCBpZiBzdWNjZXNzZnVsLCBgRXJyYCBpZiB0aGUgZnVuY3Rpb24gdGhyb3dzXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGZuIGZ1bmN0aW9uIHRvIHdyYXAgd2l0aCBvayBvbiBzdWNjZXNzIG9yIGVyciBvbiBmYWlsdXJlXHJcbiAgICAgKiBAcGFyYW0gZXJyb3JGbiB3aGVuIGFuIGVycm9yIGlzIHRocm93biwgdGhpcyB3aWxsIHdyYXAgdGhlIGVycm9yIHJlc3VsdCBpZiBwcm92aWRlZFxyXG4gICAgICovXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgZnVuY3Rpb24gZnJvbVRocm93YWJsZShmbiwgZXJyb3JGbikge1xyXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZm4oLi4uYXJncyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2socmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycihlcnJvckZuID8gZXJyb3JGbihlKSA6IGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIFJlc3VsdC5mcm9tVGhyb3dhYmxlID0gZnJvbVRocm93YWJsZTtcclxuICAgIGZ1bmN0aW9uIGNvbWJpbmUocmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0TGlzdChyZXN1bHRMaXN0KTtcclxuICAgIH1cclxuICAgIFJlc3VsdC5jb21iaW5lID0gY29tYmluZTtcclxuICAgIGZ1bmN0aW9uIGNvbWJpbmVXaXRoQWxsRXJyb3JzKHJlc3VsdExpc3QpIHtcclxuICAgICAgICByZXR1cm4gY29tYmluZVJlc3VsdExpc3RXaXRoQWxsRXJyb3JzKHJlc3VsdExpc3QpO1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmNvbWJpbmVXaXRoQWxsRXJyb3JzID0gY29tYmluZVdpdGhBbGxFcnJvcnM7XHJcbn0pKFJlc3VsdCB8fCAoUmVzdWx0ID0ge30pKTtcclxuY29uc3Qgb2sgPSAodmFsdWUpID0+IG5ldyBPayh2YWx1ZSk7XHJcbmZ1bmN0aW9uIGVycihlcnIpIHtcclxuICAgIHJldHVybiBuZXcgRXJyKGVycik7XHJcbn1cclxuZnVuY3Rpb24gc2FmZVRyeShib2R5KSB7XHJcbiAgICBjb25zdCBuID0gYm9keSgpLm5leHQoKTtcclxuICAgIGlmIChuIGluc3RhbmNlb2YgUHJvbWlzZSkge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmMobi50aGVuKChyKSA9PiByLnZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbi52YWx1ZTtcclxufVxyXG5jbGFzcyBPayB7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGlzT2soKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBpc0VycigpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuaXNPaygpO1xyXG4gICAgfVxyXG4gICAgbWFwKGYpIHtcclxuICAgICAgICByZXR1cm4gb2soZih0aGlzLnZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICBtYXBFcnIoX2YpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhlbihmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSkubWFwKChfdmFsdWUpID0+IHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgYW5kVGVlKGYpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBmKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAvLyBUZWUgZG9lc24ndCBjYXJlIGFib3V0IHRoZSBlcnJvclxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgb3JFbHNlKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgYXN5bmNBbmRUaGVuKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhc3luY0FuZFRocm91Z2goZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpLm1hcCgoKSA9PiB0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGFzeW5jTWFwKGYpIHtcclxuICAgICAgICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlKGYodGhpcy52YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgdW53cmFwT3IoX3YpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hdGNoKG9rLCBfZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgc2FmZVVud3JhcCgpIHtcclxuICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlcXVpcmUteWllbGQgKi9cclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcChfKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwRXJyKGNvbmZpZykge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZU5ldmVyVGhyb3dFcnJvcignQ2FsbGVkIGBfdW5zYWZlVW53cmFwRXJyYCBvbiBhbiBPaycsIHRoaXMsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXMsIHJlcXVpcmUteWllbGRcclxuICAgICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBFcnIge1xyXG4gICAgY29uc3RydWN0b3IoZXJyb3IpIHtcclxuICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XHJcbiAgICB9XHJcbiAgICBpc09rKCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGlzRXJyKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc09rKCk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICBtYXAoX2YpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgbWFwRXJyKGYpIHtcclxuICAgICAgICByZXR1cm4gZXJyKGYodGhpcy5lcnJvcikpO1xyXG4gICAgfVxyXG4gICAgYW5kVGhyb3VnaChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoX2YpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRoZW4oX2YpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIG9yRWxzZShmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICBhc3luY0FuZFRoZW4oX2YpIHtcclxuICAgICAgICByZXR1cm4gZXJyQXN5bmModGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBhc3luY0FuZFRocm91Z2goX2YpIHtcclxuICAgICAgICByZXR1cm4gZXJyQXN5bmModGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICBhc3luY01hcChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIHVud3JhcE9yKHYpIHtcclxuICAgICAgICByZXR1cm4gdjtcclxuICAgIH1cclxuICAgIG1hdGNoKF9vaywgZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIHNhZmVVbndyYXAoKSB7XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSB0aGlzLmVycm9yO1xyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgeWllbGQgZXJyKGVycm9yKTtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEbyBub3QgdXNlIHRoaXMgZ2VuZXJhdG9yIG91dCBvZiBgc2FmZVRyeWAnKTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcChjb25maWcpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVOZXZlclRocm93RXJyb3IoJ0NhbGxlZCBgX3Vuc2FmZVVud3JhcGAgb24gYW4gRXJyJywgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXBFcnIoXykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9yO1xyXG4gICAgfVxyXG4gICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhc1xyXG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLS0gVGhpcyBpcyBzdHJ1Y3R1cmFsbHkgZXF1aXZhbGVudCBhbmQgc2FmZVxyXG4gICAgICAgIHlpZWxkIHNlbGY7XHJcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICB9XHJcbn1cclxuY29uc3QgZnJvbVRocm93YWJsZSA9IFJlc3VsdC5mcm9tVGhyb3dhYmxlO1xyXG4vLyNlbmRyZWdpb25cblxuZXhwb3J0IHsgRXJyLCBPaywgUmVzdWx0LCBSZXN1bHRBc3luYywgZXJyLCBlcnJBc3luYywgZnJvbUFzeW5jVGhyb3dhYmxlLCBmcm9tUHJvbWlzZSwgZnJvbVNhZmVQcm9taXNlLCBmcm9tVGhyb3dhYmxlLCBvaywgb2tBc3luYywgc2FmZVRyeSB9O1xuIiwgInR5cGUgSnNvbmFibGUgPVxuICB8IHN0cmluZ1xuICB8IG51bWJlclxuICB8IGJvb2xlYW5cbiAgfCBudWxsXG4gIHwgdW5kZWZpbmVkXG4gIHwgcmVhZG9ubHkgSnNvbmFibGVbXVxuICB8IHsgcmVhZG9ubHkgW2tleTogc3RyaW5nXTogSnNvbmFibGUgfVxuICB8IHsgdG9KU09OKCk6IEpzb25hYmxlIH07XG5cbmV4cG9ydCBjbGFzcyBCYXNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHB1YmxpYyByZWFkb25seSBjb250ZXh0PzogSnNvbmFibGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICBvcHRpb25zOiB7IGNhdXNlPzogRXJyb3I7IGNvbnRleHQ/OiBKc29uYWJsZSB9ID0ge30sXG4gICkge1xuICAgIGNvbnN0IHsgY2F1c2UsIGNvbnRleHQgfSA9IG9wdGlvbnM7XG5cbiAgICBzdXBlcihtZXNzYWdlLCB7IGNhdXNlIH0pO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBlcnJBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY29ubmVjdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwifi9lcnJvci9zZXJ2ZXItZXJyb3IudHNcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyQ29uZmlnIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3NlcnZlci1jb25maWcudHNcIjtcblxuLyoqXG4gKiBFbnN1cmUgYW4gZXJyb3IgbWVzc2FnZSBpcyB0cmFuc2Zvcm1lZCBpbiBhbiBFcnJvciBvYmplY3RcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbnN1cmVFcnJvciA9ICh2YWx1ZTogdW5rbm93bik6IEVycm9yID0+IHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWx1ZTtcblxuICBsZXQgc3RyaW5naWZpZWQgPSBcIltVbmFibGUgdG8gc3RyaW5naWZ5IHRoZSB0aHJvd24gdmFsdWVdXCI7XG4gIHRyeSB7XG4gICAgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgIC8qIGVtcHR5ICovXG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKHN0cmluZ2lmaWVkKTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgTHVmaSdzIGNvbmZpZyBmcm9tIGl0cyBBUElcbiAqXG4gKiBAcGFyYW0gaW5zdGFuY2VVcmxcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFNlcnZlckNvbmZpZyA9IChcbiAgaW5zdGFuY2VVcmw6IFVSTCxcbik6IFJlc3VsdEFzeW5jPFNlcnZlckNvbmZpZywgRXJyb3I+ID0+IHtcbiAgY29uc3Qgb3JpZ2luTWF0Y2hlcyA9IGluc3RhbmNlVXJsLmhyZWYubWF0Y2goXG4gICAgLyguKj8pXFwvPyg/OlxcL1tkcl17MX1cXC98bG9naW5cXC8/fGZpbGVzXFwvPykvLFxuICApO1xuXG4gIGNvbnN0IHVybE9yaWdpbiA9IG9yaWdpbk1hdGNoZXMgJiYgb3JpZ2luTWF0Y2hlc1sxXVxuICAgID8gb3JpZ2luTWF0Y2hlc1sxXVxuICAgIDogaW5zdGFuY2VVcmwub3JpZ2luO1xuXG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBmZXRjaCh1cmxPcmlnaW4gKyBcIi9hYm91dC9jb25maWdcIiksXG4gICAgKGVycm9yKSA9PlxuICAgICAgbmV3IENvbm5lY3Rpb25FcnJvcih1bmRlZmluZWQsIHtcbiAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgIH0pLFxuICApLmFuZFRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICAgIHJlc3BvbnNlLmpzb24oKSxcbiAgICAgICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICAgIG5ldyBTZXJ2ZXJFcnJvcih1bmRlZmluZWQsIHsgY29udGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0Rlbm9SdW50aW1lID0gKCk6IGJvb2xlYW4gPT4gdHlwZW9mIERlbm8gIT09IFwidW5kZWZpbmVkXCI7XG5cbmV4cG9ydCBjb25zdCBpc1NlY3VyZUNvbnRleHQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBpc0Rlbm9SdW50aW1lKCkgfHwgZ2xvYmFsVGhpcy5pc1NlY3VyZUNvbnRleHQgfHxcbiAgICBnbG9iYWxUaGlzLmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xufTtcblxuZXhwb3J0IGNvbnN0IHdvcmtlclVybCA9IChyZWxhdGl2ZVBhdGg6IHN0cmluZyk6IFVSTCA9PiB7XG4gIHJldHVybiBpc0Rlbm9SdW50aW1lKClcbiAgICA/IG5ldyBVUkwoYC4vd29ya2VyLyR7cmVsYXRpdmVQYXRofS50c2AsIG5ldyBVUkwoXCIuXCIsIGltcG9ydC5tZXRhLnVybCkuaHJlZilcbiAgICA6IG5ldyBVUkwoXG4gICAgICBpbXBvcnQubWV0YS5yZXNvbHZlKFxuICAgICAgICBgLi8ke1xuICAgICAgICAgIHJlbGF0aXZlUGF0aCAhPT0gXCJlbmNyeXB0XCIgPyBgd29ya2VyLyR7cmVsYXRpdmVQYXRofWAgOiByZWxhdGl2ZVBhdGhcbiAgICAgICAgfS5qc2AsXG4gICAgICApLFxuICAgICk7XG59O1xuIiwgImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgV09SS0VSX0FDVElPTiB9IGZyb20gXCJ+L2VudW0vd29ya2VyLWFjdGlvbi50c1wiO1xuaW1wb3J0IHR5cGUgeyBMdWZpRmlsZSB9IGZyb20gXCJ+L2VudGl0aWVzL2x1ZmktZmlsZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJBY3Rpb25NZXNzYWdlIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1hY3Rpb24tbWVzc2FnZS50c1wiO1xuaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgeyBVUExPQURfU1RBVFVTIH0gZnJvbSBcIn4vZW51bS9maWxlLXN0YXR1cy50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJFdmVudCB9IGZyb20gXCJ+L2ludGVyZmFjZS93b3JrZXItZXZlbnQudHNcIjtcblxuZGVjbGFyZSBsZXQgc2VsZjogV29ya2VyO1xuXG5leHBvcnQgY29uc3QgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4vKipcbiAqIFVwZGF0ZSBmaWxlIGluIHdvcmtlcnMgYW5kIHByb3ZpZGUgbW9kaWZpY2F0aW9ucyB0byB0aGUgbWFpbiB0aHJlYWRcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEBwYXJhbSBhcmdzXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgdXBkYXRlRmlsZSA9IChsdWZpRmlsZTogTHVmaUZpbGUsIGFyZ3M6IFBhcnRpYWw8THVmaUZpbGU+KSA9PiB7XG4gIE9iamVjdC5hc3NpZ24obHVmaUZpbGUsIGFyZ3MpO1xuXG4gIGlmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgIGV2ZW50OiBFVkVOVC5GSUxFX1VQREFURUQsXG4gICAgICBsdWZpRmlsZSxcbiAgICB9IGFzIFdvcmtlckV2ZW50KTtcbiAgfVxuXG4gIHJldHVybiBsdWZpRmlsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZW5kRmlsZUVycm9yID0gKGx1ZmlGaWxlOiBMdWZpRmlsZSwgZXJyb3I6IEVycm9yKSA9PiB7XG4gIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHsgdXBsb2FkU3RhdHVzOiBVUExPQURfU1RBVFVTLkZBSUxFRCB9KTtcblxuICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yIH0gYXMgV29ya2VyRXZlbnQpO1xufTtcblxuLyoqXG4gKiBJbml0IGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGVhY2ggY2hpbGQgd29ya2VyJ3Mgb25tZXNzYWdlIGV2ZW50LlxuICovXG5leHBvcnQgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgZXZlbnRzLm9uY2UoRVZFTlQuU09DS0VUX09QRU5FRCwgKCkgPT4ge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgZXZlbnQ6IEVWRU5ULlNPQ0tFVF9PUEVORUQsXG4gICAgfSk7XG4gIH0pO1xuXG4gIGV2ZW50cy5vbmNlKEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1dvcmtlckFjdGlvbk1lc3NhZ2UgPSAoXG4gIC8vIGRlbm8tbGludC1pZ25vcmUgbm8tZXhwbGljaXQtYW55XG4gIG1lc3NhZ2U6IGFueSxcbik6IG1lc3NhZ2UgaXMgV29ya2VyQWN0aW9uTWVzc2FnZSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG1lc3NhZ2UgPT09IFwib2JqZWN0XCIgJiZcbiAgICBtZXNzYWdlICE9PSBudWxsICYmXG4gICAgXCJhY3Rpb25cIiBpbiBtZXNzYWdlICYmXG4gICAgT2JqZWN0LnZhbHVlcyhXT1JLRVJfQUNUSU9OKS5pbmNsdWRlcyhtZXNzYWdlLmFjdGlvbilcbiAgKTtcbn07XG4iLCAiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcIn4vZXJyb3IvYmFzZS1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige31cbiIsICJpbXBvcnQgeyBXb3JrZXJFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3dvcmtlci93b3JrZXItZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIFdvcmtlclJlbW92ZUZhaWxlZEVycm9yIGV4dGVuZHMgV29ya2VyRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlID0gXCJGYWlsZWQgdG8gcmVtb3ZlIHRoZSBmaWxlXCI7XG59XG4iLCAiaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckFjdGlvbk1lc3NhZ2UgfSBmcm9tIFwifi9pbnRlcmZhY2Uvd29ya2VyLWFjdGlvbi1tZXNzYWdlLnRzXCI7XG5pbXBvcnQgeyBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckV2ZW50IH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1ldmVudC50c1wiO1xuaW1wb3J0IHsgZW5zdXJlRXJyb3IgfSBmcm9tIFwifi91dGlscy50c1wiO1xuaW1wb3J0IHsgaW5pdCB9IGZyb20gXCJ+L3dvcmtlci9zaGFyZWQudHNcIjtcbmltcG9ydCB7IFdvcmtlclJlbW92ZUZhaWxlZEVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd29ya2VyL3dvcmtlci1yZW1vdmUtZmFpbGVkLWVycm9yLnRzXCI7XG5cbmRlY2xhcmUgY29uc3Qgc2VsZjogV29ya2VyO1xuXG5sZXQgaXNJbml0aWF0ZWQgPSBmYWxzZTtcblxuc2VsZi5vbm1lc3NhZ2UgPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICBpZiAoIWlzSW5pdGlhdGVkKSB7XG4gICAgaW5pdCgpO1xuICAgIGlzSW5pdGlhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIHJlbW92ZUZpbGUoZXZlbnQuZGF0YSlcbiAgICAubWFwKCgpID0+IHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudDogRVZFTlQuRklMRV9SRU1PVkVEIH0pO1xuICAgIH0pXG4gICAgLm1hcEVycigoZXJyb3IpID0+IHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBldmVudDogRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCxcbiAgICAgICAgZXJyb3IsXG4gICAgICB9IGFzIFdvcmtlckV2ZW50KTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHJlbW92ZUZpbGUgPSAoXG4gIHdvcmtlck1lc3NhZ2U6IFdvcmtlckFjdGlvbk1lc3NhZ2UsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBFcnJvcj4gPT5cbiAgUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgbHVmaUZpbGUgPSB3b3JrZXJNZXNzYWdlLmFyZ3MubHVmaUZpbGU7XG5cbiAgICAgIGZldGNoKFxuICAgICAgICBgJHtcbiAgICAgICAgICBuZXcgVVJMKGx1ZmlGaWxlLnNlcnZlclVybCkuaHJlZlxuICAgICAgICB9ZC8ke2x1ZmlGaWxlLmtleXMuc2VydmVyfS8ke2x1ZmlGaWxlLmFjdGlvblRva2VufWAsXG4gICAgICApLnRoZW4oKFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICkgPT4gKHJlc3BvbnNlLm9rID8gcmVzb2x2ZSh1bmRlZmluZWQpIDogcmVqZWN0KFxuICAgICAgICBuZXcgV29ya2VyUmVtb3ZlRmFpbGVkRXJyb3IodW5kZWZpbmVkLCB7XG4gICAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpLFxuICAgICAgICB9KSxcbiAgICAgICkpKTtcbiAgICB9KSxcbiAgICAoZXJyb3IpID0+IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBdUJBLFFBQUksSUFBSSxPQUFPLFlBQVksV0FBVyxVQUFVO0FBQ2hELFFBQUksZUFBZSxLQUFLLE9BQU8sRUFBRSxVQUFVLGFBQ3ZDLEVBQUUsUUFDRixTQUFTQSxjQUFhLFFBQVEsVUFBVSxNQUFNO0FBQzlDLGFBQU8sU0FBUyxVQUFVLE1BQU0sS0FBSyxRQUFRLFVBQVUsSUFBSTtBQUFBLElBQzdEO0FBRUYsUUFBSTtBQUNKLFFBQUksS0FBSyxPQUFPLEVBQUUsWUFBWSxZQUFZO0FBQ3hDLHVCQUFpQixFQUFFO0FBQUEsSUFDckIsV0FBVyxPQUFPLHVCQUF1QjtBQUN2Qyx1QkFBaUIsU0FBU0MsZ0JBQWUsUUFBUTtBQUMvQyxlQUFPLE9BQU8sb0JBQW9CLE1BQU0sRUFDckMsT0FBTyxPQUFPLHNCQUFzQixNQUFNLENBQUM7QUFBQSxNQUNoRDtBQUFBLElBQ0YsT0FBTztBQUNMLHVCQUFpQixTQUFTQSxnQkFBZSxRQUFRO0FBQy9DLGVBQU8sT0FBTyxvQkFBb0IsTUFBTTtBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUVBLGFBQVMsbUJBQW1CLFNBQVM7QUFDbkMsVUFBSSxXQUFXLFFBQVEsS0FBTSxTQUFRLEtBQUssT0FBTztBQUFBLElBQ25EO0FBRUEsUUFBSSxjQUFjLE9BQU8sU0FBUyxTQUFTQyxhQUFZLE9BQU87QUFDNUQsYUFBTyxVQUFVO0FBQUEsSUFDbkI7QUFFQSxhQUFTQyxnQkFBZTtBQUN0QixNQUFBQSxjQUFhLEtBQUssS0FBSyxJQUFJO0FBQUEsSUFDN0I7QUFDQSxXQUFPLFVBQVVBO0FBQ2pCLFdB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QUNNQSxJQUFJLGNBQWM7QUFFbEIsS0FBSyxZQUFZLENBQUMsVUFBd0I7QUFDeEMsTUFBSSxDQUFDLGFBQWE7QUFDaEIsU0FBSztBQUNMLGtCQUFjO0FBQUEsRUFDaEI7QUFFQSxhQUFXLE1BQU0sSUFBSSxFQUNsQixJQUFJLE1BQU07QUFDVCxTQUFLLFlBQVksRUFBRSx5Q0FBMEIsQ0FBQztBQUFBLEVBQ2hELENBQUMsRUFDQSxPQUFPLENBQUMsVUFBVTtBQUNqQixTQUFLLFlBQVk7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBZ0I7QUFBQSxFQUNsQixDQUFDO0FBQ0w7QUFFQSxJQUFNLGFBQWEsQ0FDakIsa0JBRUEsWUFBWTtBQUFBLEVBQ1YsSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQy9CLFVBQU0sV0FBVyxjQUFjLEtBQUs7QUFFcEM7QUFBQSxNQUNFLEdBQ0UsSUFBSSxJQUFJLFNBQVMsU0FBUyxFQUFFLElBQzlCLEtBQUssU0FBUyxLQUFLLE1BQU0sSUFBSSxTQUFTLFdBQVc7QUFBQSxJQUNuRCxFQUFFLEtBQUssQ0FDTCxhQUNJLFNBQVMsS0FBSyxRQUFRLE1BQVMsSUFBSTtBQUFBLE1BQ3ZDLElBQUksd0JBQXdCLFFBQVc7QUFBQSxRQUNyQyxPQUFPLFlBQVksU0FBUyxVQUFVO0FBQUEsTUFDeEMsQ0FBQztBQUFBLElBQ0gsQ0FBRTtBQUFBLEVBQ0osQ0FBQztBQUFBLEVBQ0QsQ0FBQyxVQUFVLFlBQVksS0FBSztBQUM5QjsiLAogICJuYW1lcyI6IFsiUmVmbGVjdEFwcGx5IiwgIlJlZmxlY3RPd25LZXlzIiwgIk51bWJlcklzTmFOIiwgIkV2ZW50RW1pdHRlciIsICJldmVudHMiLCAiZXJyIiwgIm9uY2UiLCAidiIsICJvayIsICJlcnIiLCAiUmVzdWx0IiwgImZyb21UaHJvd2FibGUiLCAib2siLCAiZXJyIiwgInNlbGYiLCAiRXZlbnRFbWl0dGVyIl0KfQo=
