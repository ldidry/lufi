var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj3, key, value) => key in obj3 ? __defProp(obj3, key, { enumerable: true, configurable: true, writable: true, value }) : obj3[key] = value;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
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
var __publicField = (obj3, key, value) => __defNormalProp(obj3, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj3, member, msg) => member.has(obj3) || __typeError("Cannot " + msg);
var __privateGet = (obj3, member, getter) => (__accessCheck(obj3, member, "read from private field"), getter ? getter.call(obj3) : member.get(obj3));
var __privateAdd = (obj3, member, value) => member.has(obj3) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj3) : member.set(obj3, value);
var __privateSet = (obj3, member, value, setter) => (__accessCheck(obj3, member, "write to private field"), setter ? setter.call(obj3, value) : member.set(obj3, value), value);
var __privateMethod = (obj3, member, method) => (__accessCheck(obj3, member, "access private method"), method);
var __privateWrapper = (obj3, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj3, member, value, setter);
  },
  get _() {
    return __privateGet(obj3, member, getter);
  }
});

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
    function EventEmitter5() {
      EventEmitter5.init.call(this);
    }
    module.exports = EventEmitter5;
    module.exports.once = once;
    EventEmitter5.EventEmitter = EventEmitter5;
    EventEmitter5.prototype._events = void 0;
    EventEmitter5.prototype._eventsCount = 0;
    EventEmitter5.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter5, "defaultMaxListeners", {
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
    EventEmitter5.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter5.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter5.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter5.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter5.prototype.emit = function emit(type) {
      var args = [];
      for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
      var doError = type === "error";
      var events3 = this._events;
      if (events3 !== void 0)
        doError = doError && events3.error === void 0;
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
      var handler = events3[type];
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
      var events3;
      var existing;
      checkListener(listener);
      events3 = target._events;
      if (events3 === void 0) {
        events3 = target._events = /* @__PURE__ */ Object.create(null);
        target._eventsCount = 0;
      } else {
        if (events3.newListener !== void 0) {
          target.emit(
            "newListener",
            type,
            listener.listener ? listener.listener : listener
          );
          events3 = target._events;
        }
        existing = events3[type];
      }
      if (existing === void 0) {
        existing = events3[type] = listener;
        ++target._eventsCount;
      } else {
        if (typeof existing === "function") {
          existing = events3[type] = prepend ? [listener, existing] : [existing, listener];
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
    EventEmitter5.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter5.prototype.on = EventEmitter5.prototype.addListener;
    EventEmitter5.prototype.prependListener = function prependListener(type, listener) {
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
    EventEmitter5.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter5.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter5.prototype.removeListener = function removeListener(type, listener) {
      var list, events3, position, i, originalListener;
      checkListener(listener);
      events3 = this._events;
      if (events3 === void 0)
        return this;
      list = events3[type];
      if (list === void 0)
        return this;
      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = /* @__PURE__ */ Object.create(null);
        else {
          delete events3[type];
          if (events3.removeListener)
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
          events3[type] = list[0];
        if (events3.removeListener !== void 0)
          this.emit("removeListener", type, originalListener || listener);
      }
      return this;
    };
    EventEmitter5.prototype.off = EventEmitter5.prototype.removeListener;
    EventEmitter5.prototype.removeAllListeners = function removeAllListeners(type) {
      var listeners, events3, i;
      events3 = this._events;
      if (events3 === void 0)
        return this;
      if (events3.removeListener === void 0) {
        if (arguments.length === 0) {
          this._events = /* @__PURE__ */ Object.create(null);
          this._eventsCount = 0;
        } else if (events3[type] !== void 0) {
          if (--this._eventsCount === 0)
            this._events = /* @__PURE__ */ Object.create(null);
          else
            delete events3[type];
        }
        return this;
      }
      if (arguments.length === 0) {
        var keys = Object.keys(events3);
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
      listeners = events3[type];
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
      var events3 = target._events;
      if (events3 === void 0)
        return [];
      var evlistener = events3[type];
      if (evlistener === void 0)
        return [];
      if (typeof evlistener === "function")
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
      return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
    }
    EventEmitter5.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter5.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter5.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter5.prototype.listenerCount = listenerCount;
    function listenerCount(type) {
      var events3 = this._events;
      if (events3 !== void 0) {
        var evlistener = events3[type];
        if (typeof evlistener === "function") {
          return 1;
        } else if (evlistener !== void 0) {
          return evlistener.length;
        }
      }
      return 0;
    }
    EventEmitter5.prototype.eventNames = function eventNames() {
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

// node_modules/.deno/sjcl@1.0.8/node_modules/sjcl/sjcl.js
var require_sjcl = __commonJS({
  "node_modules/.deno/sjcl@1.0.8/node_modules/sjcl/sjcl.js"(exports, module) {
    "use strict";
    var sjcl2 = { cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: { corrupt: function(a) {
      this.toString = function() {
        return "CORRUPT: " + this.message;
      };
      this.message = a;
    }, invalid: function(a) {
      this.toString = function() {
        return "INVALID: " + this.message;
      };
      this.message = a;
    }, bug: function(a) {
      this.toString = function() {
        return "BUG: " + this.message;
      };
      this.message = a;
    }, notReady: function(a) {
      this.toString = function() {
        return "NOT READY: " + this.message;
      };
      this.message = a;
    } } };
    sjcl2.cipher.aes = function(a) {
      this.s[0][0][0] || this.O();
      var b, c, d, e, f = this.s[0][4], g = this.s[1];
      b = a.length;
      var h = 1;
      if (4 !== b && 6 !== b && 8 !== b) throw new sjcl2.exception.invalid("invalid aes key size");
      this.b = [d = a.slice(0), e = []];
      for (a = b; a < 4 * b + 28; a++) {
        c = d[a - 1];
        if (0 === a % b || 8 === b && 4 === a % b) c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255], 0 === a % b && (c = c << 8 ^ c >>> 24 ^ h << 24, h = h << 1 ^ 283 * (h >> 7));
        d[a] = d[a - b] ^ c;
      }
      for (b = 0; a; b++, a--) c = d[b & 3 ? a : a - 4], e[b] = 4 >= a || 4 > b ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c & 255]];
    };
    sjcl2.cipher.aes.prototype = { encrypt: function(a) {
      return t(this, a, 0);
    }, decrypt: function(a) {
      return t(this, a, 1);
    }, s: [[[], [], [], [], []], [[], [], [], [], []]], O: function() {
      var a = this.s[0], b = this.s[1], c = a[4], d = b[4], e, f, g, h = [], k = [], l, n, m, p;
      for (e = 0; 256 > e; e++) k[(h[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
      for (f = g = 0; !c[f]; f ^= l || 1, g = k[g] || 1) for (m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, m = m >> 8 ^ m & 255 ^ 99, c[f] = m, d[m] = f, n = h[e = h[l = h[f]]], p = 16843009 * n ^ 65537 * e ^ 257 * l ^ 16843008 * f, n = 257 * h[m] ^ 16843008 * m, e = 0; 4 > e; e++) a[e][f] = n = n << 24 ^ n >>> 8, b[e][m] = p = p << 24 ^ p >>> 8;
      for (e = 0; 5 > e; e++) a[e] = a[e].slice(0), b[e] = b[e].slice(0);
    } };
    function t(a, b, c) {
      if (4 !== b.length) throw new sjcl2.exception.invalid("invalid aes block size");
      var d = a.b[c], e = b[0] ^ d[0], f = b[c ? 3 : 1] ^ d[1], g = b[2] ^ d[2];
      b = b[c ? 1 : 3] ^ d[3];
      var h, k, l, n = d.length / 4 - 2, m, p = 4, r = [0, 0, 0, 0];
      h = a.s[c];
      a = h[0];
      var q = h[1], v = h[2], w = h[3], x = h[4];
      for (m = 0; m < n; m++) h = a[e >>> 24] ^ q[f >> 16 & 255] ^ v[g >> 8 & 255] ^ w[b & 255] ^ d[p], k = a[f >>> 24] ^ q[g >> 16 & 255] ^ v[b >> 8 & 255] ^ w[e & 255] ^ d[p + 1], l = a[g >>> 24] ^ q[b >> 16 & 255] ^ v[e >> 8 & 255] ^ w[f & 255] ^ d[p + 2], b = a[b >>> 24] ^ q[e >> 16 & 255] ^ v[f >> 8 & 255] ^ w[g & 255] ^ d[p + 3], p += 4, e = h, f = k, g = l;
      for (m = 0; 4 > m; m++) r[c ? 3 & -m : m] = x[e >>> 24] << 24 ^ x[f >> 16 & 255] << 16 ^ x[g >> 8 & 255] << 8 ^ x[b & 255] ^ d[p++], h = e, e = f, f = g, g = b, b = h;
      return r;
    }
    sjcl2.bitArray = { bitSlice: function(a, b, c) {
      a = sjcl2.bitArray.$(a.slice(b / 32), 32 - (b & 31)).slice(1);
      return void 0 === c ? a : sjcl2.bitArray.clamp(a, c - b);
    }, extract: function(a, b, c) {
      var d = Math.floor(-b - c & 31);
      return ((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1;
    }, concat: function(a, b) {
      if (0 === a.length || 0 === b.length) return a.concat(b);
      var c = a[a.length - 1], d = sjcl2.bitArray.getPartial(c);
      return 32 === d ? a.concat(b) : sjcl2.bitArray.$(b, d, c | 0, a.slice(0, a.length - 1));
    }, bitLength: function(a) {
      var b = a.length;
      return 0 === b ? 0 : 32 * (b - 1) + sjcl2.bitArray.getPartial(a[b - 1]);
    }, clamp: function(a, b) {
      if (32 * a.length < b) return a;
      a = a.slice(0, Math.ceil(b / 32));
      var c = a.length;
      b = b & 31;
      0 < c && b && (a[c - 1] = sjcl2.bitArray.partial(b, a[c - 1] & 2147483648 >> b - 1, 1));
      return a;
    }, partial: function(a, b, c) {
      return 32 === a ? b : (c ? b | 0 : b << 32 - a) + 1099511627776 * a;
    }, getPartial: function(a) {
      return Math.round(a / 1099511627776) || 32;
    }, equal: function(a, b) {
      if (sjcl2.bitArray.bitLength(a) !== sjcl2.bitArray.bitLength(b)) return false;
      var c = 0, d;
      for (d = 0; d < a.length; d++) c |= a[d] ^ b[d];
      return 0 === c;
    }, $: function(a, b, c, d) {
      var e;
      e = 0;
      for (void 0 === d && (d = []); 32 <= b; b -= 32) d.push(c), c = 0;
      if (0 === b) return d.concat(a);
      for (e = 0; e < a.length; e++) d.push(c | a[e] >>> b), c = a[e] << 32 - b;
      e = a.length ? a[a.length - 1] : 0;
      a = sjcl2.bitArray.getPartial(e);
      d.push(sjcl2.bitArray.partial(b + a & 31, 32 < b + a ? c : d.pop(), 1));
      return d;
    }, i: function(a, b) {
      return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]];
    }, byteswapM: function(a) {
      var b, c;
      for (b = 0; b < a.length; ++b) c = a[b], a[b] = c >>> 24 | c >>> 8 & 65280 | (c & 65280) << 8 | c << 24;
      return a;
    } };
    sjcl2.codec.utf8String = { fromBits: function(a) {
      var b = "", c = sjcl2.bitArray.bitLength(a), d, e;
      for (d = 0; d < c / 8; d++) 0 === (d & 3) && (e = a[d / 4]), b += String.fromCharCode(e >>> 8 >>> 8 >>> 8), e <<= 8;
      return decodeURIComponent(escape(b));
    }, toBits: function(a) {
      a = unescape(encodeURIComponent(a));
      var b = [], c, d = 0;
      for (c = 0; c < a.length; c++) d = d << 8 | a.charCodeAt(c), 3 === (c & 3) && (b.push(d), d = 0);
      c & 3 && b.push(sjcl2.bitArray.partial(8 * (c & 3), d));
      return b;
    } };
    sjcl2.codec.hex = { fromBits: function(a) {
      var b = "", c;
      for (c = 0; c < a.length; c++) b += ((a[c] | 0) + 263882790666240).toString(16).substr(4);
      return b.substr(0, sjcl2.bitArray.bitLength(a) / 4);
    }, toBits: function(a) {
      var b, c = [], d;
      a = a.replace(/\s|0x/g, "");
      d = a.length;
      a = a + "00000000";
      for (b = 0; b < a.length; b += 8) c.push(parseInt(a.substr(b, 8), 16) ^ 0);
      return sjcl2.bitArray.clamp(c, 4 * d);
    } };
    sjcl2.codec.base32 = { B: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", X: "0123456789ABCDEFGHIJKLMNOPQRSTUV", BITS: 32, BASE: 5, REMAINING: 27, fromBits: function(a, b, c) {
      var d = sjcl2.codec.base32.BASE, e = sjcl2.codec.base32.REMAINING, f = "", g = 0, h = sjcl2.codec.base32.B, k = 0, l = sjcl2.bitArray.bitLength(a);
      c && (h = sjcl2.codec.base32.X);
      for (c = 0; f.length * d < l; ) f += h.charAt((k ^ a[c] >>> g) >>> e), g < d ? (k = a[c] << d - g, g += e, c++) : (k <<= d, g -= d);
      for (; f.length & 7 && !b; ) f += "=";
      return f;
    }, toBits: function(a, b) {
      a = a.replace(/\s|=/g, "").toUpperCase();
      var c = sjcl2.codec.base32.BITS, d = sjcl2.codec.base32.BASE, e = sjcl2.codec.base32.REMAINING, f = [], g, h = 0, k = sjcl2.codec.base32.B, l = 0, n, m = "base32";
      b && (k = sjcl2.codec.base32.X, m = "base32hex");
      for (g = 0; g < a.length; g++) {
        n = k.indexOf(a.charAt(g));
        if (0 > n) {
          if (!b) try {
            return sjcl2.codec.base32hex.toBits(a);
          } catch (p) {
          }
          throw new sjcl2.exception.invalid("this isn't " + m + "!");
        }
        h > e ? (h -= e, f.push(l ^ n >>> h), l = n << c - h) : (h += d, l ^= n << c - h);
      }
      h & 56 && f.push(sjcl2.bitArray.partial(h & 56, l, 1));
      return f;
    } };
    sjcl2.codec.base32hex = { fromBits: function(a, b) {
      return sjcl2.codec.base32.fromBits(a, b, 1);
    }, toBits: function(a) {
      return sjcl2.codec.base32.toBits(a, 1);
    } };
    sjcl2.codec.base64 = { B: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function(a, b, c) {
      var d = "", e = 0, f = sjcl2.codec.base64.B, g = 0, h = sjcl2.bitArray.bitLength(a);
      c && (f = f.substr(0, 62) + "-_");
      for (c = 0; 6 * d.length < h; ) d += f.charAt((g ^ a[c] >>> e) >>> 26), 6 > e ? (g = a[c] << 6 - e, e += 26, c++) : (g <<= 6, e -= 6);
      for (; d.length & 3 && !b; ) d += "=";
      return d;
    }, toBits: function(a, b) {
      a = a.replace(/\s|=/g, "");
      var c = [], d, e = 0, f = sjcl2.codec.base64.B, g = 0, h;
      b && (f = f.substr(0, 62) + "-_");
      for (d = 0; d < a.length; d++) {
        h = f.indexOf(a.charAt(d));
        if (0 > h) throw new sjcl2.exception.invalid("this isn't base64!");
        26 < e ? (e -= 26, c.push(g ^ h >>> e), g = h << 32 - e) : (e += 6, g ^= h << 32 - e);
      }
      e & 56 && c.push(sjcl2.bitArray.partial(e & 56, g, 1));
      return c;
    } };
    sjcl2.codec.base64url = { fromBits: function(a) {
      return sjcl2.codec.base64.fromBits(a, 1, 1);
    }, toBits: function(a) {
      return sjcl2.codec.base64.toBits(a, 1);
    } };
    sjcl2.hash.sha256 = function(a) {
      this.b[0] || this.O();
      a ? (this.F = a.F.slice(0), this.A = a.A.slice(0), this.l = a.l) : this.reset();
    };
    sjcl2.hash.sha256.hash = function(a) {
      return new sjcl2.hash.sha256().update(a).finalize();
    };
    sjcl2.hash.sha256.prototype = { blockSize: 512, reset: function() {
      this.F = this.Y.slice(0);
      this.A = [];
      this.l = 0;
      return this;
    }, update: function(a) {
      "string" === typeof a && (a = sjcl2.codec.utf8String.toBits(a));
      var b, c = this.A = sjcl2.bitArray.concat(this.A, a);
      b = this.l;
      a = this.l = b + sjcl2.bitArray.bitLength(a);
      if (9007199254740991 < a) throw new sjcl2.exception.invalid("Cannot hash more than 2^53 - 1 bits");
      if ("undefined" !== typeof Uint32Array) {
        var d = new Uint32Array(c), e = 0;
        for (b = 512 + b - (512 + b & 511); b <= a; b += 512) u(this, d.subarray(
          16 * e,
          16 * (e + 1)
        )), e += 1;
        c.splice(0, 16 * e);
      } else for (b = 512 + b - (512 + b & 511); b <= a; b += 512) u(this, c.splice(0, 16));
      return this;
    }, finalize: function() {
      var a, b = this.A, c = this.F, b = sjcl2.bitArray.concat(b, [sjcl2.bitArray.partial(1, 1)]);
      for (a = b.length + 2; a & 15; a++) b.push(0);
      b.push(Math.floor(this.l / 4294967296));
      for (b.push(this.l | 0); b.length; ) u(this, b.splice(0, 16));
      this.reset();
      return c;
    }, Y: [], b: [], O: function() {
      function a(a2) {
        return 4294967296 * (a2 - Math.floor(a2)) | 0;
      }
      for (var b = 0, c = 2, d, e; 64 > b; c++) {
        e = true;
        for (d = 2; d * d <= c; d++) if (0 === c % d) {
          e = false;
          break;
        }
        e && (8 > b && (this.Y[b] = a(Math.pow(c, 0.5))), this.b[b] = a(Math.pow(c, 1 / 3)), b++);
      }
    } };
    function u(a, b) {
      var c, d, e, f = a.F, g = a.b, h = f[0], k = f[1], l = f[2], n = f[3], m = f[4], p = f[5], r = f[6], q = f[7];
      for (c = 0; 64 > c; c++) 16 > c ? d = b[c] : (d = b[c + 1 & 15], e = b[c + 14 & 15], d = b[c & 15] = (d >>> 7 ^ d >>> 18 ^ d >>> 3 ^ d << 25 ^ d << 14) + (e >>> 17 ^ e >>> 19 ^ e >>> 10 ^ e << 15 ^ e << 13) + b[c & 15] + b[c + 9 & 15] | 0), d = d + q + (m >>> 6 ^ m >>> 11 ^ m >>> 25 ^ m << 26 ^ m << 21 ^ m << 7) + (r ^ m & (p ^ r)) + g[c], q = r, r = p, p = m, m = n + d | 0, n = l, l = k, k = h, h = d + (k & l ^ n & (k ^ l)) + (k >>> 2 ^ k >>> 13 ^ k >>> 22 ^ k << 30 ^ k << 19 ^ k << 10) | 0;
      f[0] = f[0] + h | 0;
      f[1] = f[1] + k | 0;
      f[2] = f[2] + l | 0;
      f[3] = f[3] + n | 0;
      f[4] = f[4] + m | 0;
      f[5] = f[5] + p | 0;
      f[6] = f[6] + r | 0;
      f[7] = f[7] + q | 0;
    }
    sjcl2.mode.ccm = { name: "ccm", G: [], listenProgress: function(a) {
      sjcl2.mode.ccm.G.push(a);
    }, unListenProgress: function(a) {
      a = sjcl2.mode.ccm.G.indexOf(a);
      -1 < a && sjcl2.mode.ccm.G.splice(a, 1);
    }, fa: function(a) {
      var b = sjcl2.mode.ccm.G.slice(), c;
      for (c = 0; c < b.length; c += 1) b[c](a);
    }, encrypt: function(a, b, c, d, e) {
      var f, g = b.slice(0), h = sjcl2.bitArray, k = h.bitLength(c) / 8, l = h.bitLength(g) / 8;
      e = e || 64;
      d = d || [];
      if (7 > k) throw new sjcl2.exception.invalid("ccm: iv must be at least 7 bytes");
      for (f = 2; 4 > f && l >>> 8 * f; f++) ;
      f < 15 - k && (f = 15 - k);
      c = h.clamp(
        c,
        8 * (15 - f)
      );
      b = sjcl2.mode.ccm.V(a, b, c, d, e, f);
      g = sjcl2.mode.ccm.C(a, g, c, b, e, f);
      return h.concat(g.data, g.tag);
    }, decrypt: function(a, b, c, d, e) {
      e = e || 64;
      d = d || [];
      var f = sjcl2.bitArray, g = f.bitLength(c) / 8, h = f.bitLength(b), k = f.clamp(b, h - e), l = f.bitSlice(b, h - e), h = (h - e) / 8;
      if (7 > g) throw new sjcl2.exception.invalid("ccm: iv must be at least 7 bytes");
      for (b = 2; 4 > b && h >>> 8 * b; b++) ;
      b < 15 - g && (b = 15 - g);
      c = f.clamp(c, 8 * (15 - b));
      k = sjcl2.mode.ccm.C(a, k, c, l, e, b);
      a = sjcl2.mode.ccm.V(a, k.data, c, d, e, b);
      if (!f.equal(k.tag, a)) throw new sjcl2.exception.corrupt("ccm: tag doesn't match");
      return k.data;
    }, na: function(a, b, c, d, e, f) {
      var g = [], h = sjcl2.bitArray, k = h.i;
      d = [h.partial(8, (b.length ? 64 : 0) | d - 2 << 2 | f - 1)];
      d = h.concat(d, c);
      d[3] |= e;
      d = a.encrypt(d);
      if (b.length) for (c = h.bitLength(b) / 8, 65279 >= c ? g = [h.partial(16, c)] : 4294967295 >= c && (g = h.concat([h.partial(16, 65534)], [c])), g = h.concat(g, b), b = 0; b < g.length; b += 4) d = a.encrypt(k(d, g.slice(b, b + 4).concat([0, 0, 0])));
      return d;
    }, V: function(a, b, c, d, e, f) {
      var g = sjcl2.bitArray, h = g.i;
      e /= 8;
      if (e % 2 || 4 > e || 16 < e) throw new sjcl2.exception.invalid("ccm: invalid tag length");
      if (4294967295 < d.length || 4294967295 < b.length) throw new sjcl2.exception.bug("ccm: can't deal with 4GiB or more data");
      c = sjcl2.mode.ccm.na(a, d, c, e, g.bitLength(b) / 8, f);
      for (d = 0; d < b.length; d += 4) c = a.encrypt(h(c, b.slice(d, d + 4).concat([0, 0, 0])));
      return g.clamp(c, 8 * e);
    }, C: function(a, b, c, d, e, f) {
      var g, h = sjcl2.bitArray;
      g = h.i;
      var k = b.length, l = h.bitLength(b), n = k / 50, m = n;
      c = h.concat([h.partial(8, f - 1)], c).concat([0, 0, 0]).slice(0, 4);
      d = h.bitSlice(g(d, a.encrypt(c)), 0, e);
      if (!k) return { tag: d, data: [] };
      for (g = 0; g < k; g += 4) g > n && (sjcl2.mode.ccm.fa(g / k), n += m), c[3]++, e = a.encrypt(c), b[g] ^= e[0], b[g + 1] ^= e[1], b[g + 2] ^= e[2], b[g + 3] ^= e[3];
      return { tag: d, data: h.clamp(b, l) };
    } };
    sjcl2.mode.ocb2 = { name: "ocb2", encrypt: function(a, b, c, d, e, f) {
      if (128 !== sjcl2.bitArray.bitLength(c)) throw new sjcl2.exception.invalid("ocb iv must be 128 bits");
      var g, h = sjcl2.mode.ocb2.S, k = sjcl2.bitArray, l = k.i, n = [0, 0, 0, 0];
      c = h(a.encrypt(c));
      var m, p = [];
      d = d || [];
      e = e || 64;
      for (g = 0; g + 4 < b.length; g += 4) m = b.slice(g, g + 4), n = l(n, m), p = p.concat(l(c, a.encrypt(l(c, m)))), c = h(c);
      m = b.slice(g);
      b = k.bitLength(m);
      g = a.encrypt(l(c, [0, 0, 0, b]));
      m = k.clamp(l(m.concat([0, 0, 0]), g), b);
      n = l(n, l(m.concat([0, 0, 0]), g));
      n = a.encrypt(l(n, l(c, h(c))));
      d.length && (n = l(n, f ? d : sjcl2.mode.ocb2.pmac(a, d)));
      return p.concat(k.concat(m, k.clamp(n, e)));
    }, decrypt: function(a, b, c, d, e, f) {
      if (128 !== sjcl2.bitArray.bitLength(c)) throw new sjcl2.exception.invalid("ocb iv must be 128 bits");
      e = e || 64;
      var g = sjcl2.mode.ocb2.S, h = sjcl2.bitArray, k = h.i, l = [0, 0, 0, 0], n = g(a.encrypt(c)), m, p, r = sjcl2.bitArray.bitLength(b) - e, q = [];
      d = d || [];
      for (c = 0; c + 4 < r / 32; c += 4) m = k(n, a.decrypt(k(n, b.slice(c, c + 4)))), l = k(l, m), q = q.concat(m), n = g(n);
      p = r - 32 * c;
      m = a.encrypt(k(n, [0, 0, 0, p]));
      m = k(m, h.clamp(b.slice(c), p).concat([
        0,
        0,
        0
      ]));
      l = k(l, m);
      l = a.encrypt(k(l, k(n, g(n))));
      d.length && (l = k(l, f ? d : sjcl2.mode.ocb2.pmac(a, d)));
      if (!h.equal(h.clamp(l, e), h.bitSlice(b, r))) throw new sjcl2.exception.corrupt("ocb: tag doesn't match");
      return q.concat(h.clamp(m, p));
    }, pmac: function(a, b) {
      var c, d = sjcl2.mode.ocb2.S, e = sjcl2.bitArray, f = e.i, g = [0, 0, 0, 0], h = a.encrypt([0, 0, 0, 0]), h = f(h, d(d(h)));
      for (c = 0; c + 4 < b.length; c += 4) h = d(h), g = f(g, a.encrypt(f(h, b.slice(c, c + 4))));
      c = b.slice(c);
      128 > e.bitLength(c) && (h = f(h, d(h)), c = e.concat(c, [-2147483648, 0, 0, 0]));
      g = f(g, c);
      return a.encrypt(f(d(f(h, d(h))), g));
    }, S: function(a) {
      return [a[0] << 1 ^ a[1] >>> 31, a[1] << 1 ^ a[2] >>> 31, a[2] << 1 ^ a[3] >>> 31, a[3] << 1 ^ 135 * (a[0] >>> 31)];
    } };
    sjcl2.mode.gcm = { name: "gcm", encrypt: function(a, b, c, d, e) {
      var f = b.slice(0);
      b = sjcl2.bitArray;
      d = d || [];
      a = sjcl2.mode.gcm.C(true, a, f, d, c, e || 128);
      return b.concat(a.data, a.tag);
    }, decrypt: function(a, b, c, d, e) {
      var f = b.slice(0), g = sjcl2.bitArray, h = g.bitLength(f);
      e = e || 128;
      d = d || [];
      e <= h ? (b = g.bitSlice(f, h - e), f = g.bitSlice(f, 0, h - e)) : (b = f, f = []);
      a = sjcl2.mode.gcm.C(false, a, f, d, c, e);
      if (!g.equal(a.tag, b)) throw new sjcl2.exception.corrupt("gcm: tag doesn't match");
      return a.data;
    }, ka: function(a, b) {
      var c, d, e, f, g, h = sjcl2.bitArray.i;
      e = [
        0,
        0,
        0,
        0
      ];
      f = b.slice(0);
      for (c = 0; 128 > c; c++) {
        (d = 0 !== (a[Math.floor(c / 32)] & 1 << 31 - c % 32)) && (e = h(e, f));
        g = 0 !== (f[3] & 1);
        for (d = 3; 0 < d; d--) f[d] = f[d] >>> 1 | (f[d - 1] & 1) << 31;
        f[0] >>>= 1;
        g && (f[0] ^= -520093696);
      }
      return e;
    }, j: function(a, b, c) {
      var d, e = c.length;
      b = b.slice(0);
      for (d = 0; d < e; d += 4) b[0] ^= 4294967295 & c[d], b[1] ^= 4294967295 & c[d + 1], b[2] ^= 4294967295 & c[d + 2], b[3] ^= 4294967295 & c[d + 3], b = sjcl2.mode.gcm.ka(b, a);
      return b;
    }, C: function(a, b, c, d, e, f) {
      var g, h, k, l, n, m, p, r, q = sjcl2.bitArray;
      m = c.length;
      p = q.bitLength(c);
      r = q.bitLength(d);
      h = q.bitLength(e);
      g = b.encrypt([0, 0, 0, 0]);
      96 === h ? (e = e.slice(0), e = q.concat(e, [1])) : (e = sjcl2.mode.gcm.j(g, [0, 0, 0, 0], e), e = sjcl2.mode.gcm.j(g, e, [0, 0, Math.floor(h / 4294967296), h & 4294967295]));
      h = sjcl2.mode.gcm.j(g, [0, 0, 0, 0], d);
      n = e.slice(0);
      d = h.slice(0);
      a || (d = sjcl2.mode.gcm.j(g, h, c));
      for (l = 0; l < m; l += 4) n[3]++, k = b.encrypt(n), c[l] ^= k[0], c[l + 1] ^= k[1], c[l + 2] ^= k[2], c[l + 3] ^= k[3];
      c = q.clamp(c, p);
      a && (d = sjcl2.mode.gcm.j(g, h, c));
      a = [Math.floor(r / 4294967296), r & 4294967295, Math.floor(p / 4294967296), p & 4294967295];
      d = sjcl2.mode.gcm.j(g, d, a);
      k = b.encrypt(e);
      d[0] ^= k[0];
      d[1] ^= k[1];
      d[2] ^= k[2];
      d[3] ^= k[3];
      return { tag: q.bitSlice(d, 0, f), data: c };
    } };
    sjcl2.misc.hmac = function(a, b) {
      this.W = b = b || sjcl2.hash.sha256;
      var c = [[], []], d, e = b.prototype.blockSize / 32;
      this.w = [new b(), new b()];
      a.length > e && (a = b.hash(a));
      for (d = 0; d < e; d++) c[0][d] = a[d] ^ 909522486, c[1][d] = a[d] ^ 1549556828;
      this.w[0].update(c[0]);
      this.w[1].update(c[1]);
      this.R = new b(this.w[0]);
    };
    sjcl2.misc.hmac.prototype.encrypt = sjcl2.misc.hmac.prototype.mac = function(a) {
      if (this.aa) throw new sjcl2.exception.invalid("encrypt on already updated hmac called!");
      this.update(a);
      return this.digest(a);
    };
    sjcl2.misc.hmac.prototype.reset = function() {
      this.R = new this.W(this.w[0]);
      this.aa = false;
    };
    sjcl2.misc.hmac.prototype.update = function(a) {
      this.aa = true;
      this.R.update(a);
    };
    sjcl2.misc.hmac.prototype.digest = function() {
      var a = this.R.finalize(), a = new this.W(this.w[1]).update(a).finalize();
      this.reset();
      return a;
    };
    sjcl2.misc.pbkdf2 = function(a, b, c, d, e) {
      c = c || 1e4;
      if (0 > d || 0 > c) throw new sjcl2.exception.invalid("invalid params to pbkdf2");
      "string" === typeof a && (a = sjcl2.codec.utf8String.toBits(a));
      "string" === typeof b && (b = sjcl2.codec.utf8String.toBits(b));
      e = e || sjcl2.misc.hmac;
      a = new e(a);
      var f, g, h, k, l = [], n = sjcl2.bitArray;
      for (k = 1; 32 * l.length < (d || 1); k++) {
        e = f = a.encrypt(n.concat(b, [k]));
        for (g = 1; g < c; g++) for (f = a.encrypt(f), h = 0; h < f.length; h++) e[h] ^= f[h];
        l = l.concat(e);
      }
      d && (l = n.clamp(l, d));
      return l;
    };
    sjcl2.prng = function(a) {
      this.c = [new sjcl2.hash.sha256()];
      this.m = [0];
      this.P = 0;
      this.H = {};
      this.N = 0;
      this.U = {};
      this.Z = this.f = this.o = this.ha = 0;
      this.b = [0, 0, 0, 0, 0, 0, 0, 0];
      this.h = [0, 0, 0, 0];
      this.L = void 0;
      this.M = a;
      this.D = false;
      this.K = { progress: {}, seeded: {} };
      this.u = this.ga = 0;
      this.I = 1;
      this.J = 2;
      this.ca = 65536;
      this.T = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024];
      this.da = 3e4;
      this.ba = 80;
    };
    sjcl2.prng.prototype = {
      randomWords: function(a, b) {
        var c = [], d;
        d = this.isReady(b);
        var e;
        if (d === this.u) throw new sjcl2.exception.notReady("generator isn't seeded");
        if (d & this.J) {
          d = !(d & this.I);
          e = [];
          var f = 0, g;
          this.Z = e[0] = (/* @__PURE__ */ new Date()).valueOf() + this.da;
          for (g = 0; 16 > g; g++) e.push(4294967296 * Math.random() | 0);
          for (g = 0; g < this.c.length && (e = e.concat(this.c[g].finalize()), f += this.m[g], this.m[g] = 0, d || !(this.P & 1 << g)); g++) ;
          this.P >= 1 << this.c.length && (this.c.push(new sjcl2.hash.sha256()), this.m.push(0));
          this.f -= f;
          f > this.o && (this.o = f);
          this.P++;
          this.b = sjcl2.hash.sha256.hash(this.b.concat(e));
          this.L = new sjcl2.cipher.aes(this.b);
          for (d = 0; 4 > d && (this.h[d] = this.h[d] + 1 | 0, !this.h[d]); d++) ;
        }
        for (d = 0; d < a; d += 4) 0 === (d + 1) % this.ca && y(this), e = z(this), c.push(e[0], e[1], e[2], e[3]);
        y(this);
        return c.slice(0, a);
      },
      setDefaultParanoia: function(a, b) {
        if (0 === a && "Setting paranoia=0 will ruin your security; use it only for testing" !== b) throw new sjcl2.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");
        this.M = a;
      },
      addEntropy: function(a, b, c) {
        c = c || "user";
        var d, e, f = (/* @__PURE__ */ new Date()).valueOf(), g = this.H[c], h = this.isReady(), k = 0;
        d = this.U[c];
        void 0 === d && (d = this.U[c] = this.ha++);
        void 0 === g && (g = this.H[c] = 0);
        this.H[c] = (this.H[c] + 1) % this.c.length;
        switch (typeof a) {
          case "number":
            void 0 === b && (b = 1);
            this.c[g].update([d, this.N++, 1, b, f, 1, a | 0]);
            break;
          case "object":
            c = Object.prototype.toString.call(a);
            if ("[object Uint32Array]" === c) {
              e = [];
              for (c = 0; c < a.length; c++) e.push(a[c]);
              a = e;
            } else for ("[object Array]" !== c && (k = 1), c = 0; c < a.length && !k; c++) "number" !== typeof a[c] && (k = 1);
            if (!k) {
              if (void 0 === b) for (c = b = 0; c < a.length; c++) for (e = a[c]; 0 < e; ) b++, e = e >>> 1;
              this.c[g].update([d, this.N++, 2, b, f, a.length].concat(a));
            }
            break;
          case "string":
            void 0 === b && (b = a.length);
            this.c[g].update([d, this.N++, 3, b, f, a.length]);
            this.c[g].update(a);
            break;
          default:
            k = 1;
        }
        if (k) throw new sjcl2.exception.bug("random: addEntropy only supports number, array of numbers or string");
        this.m[g] += b;
        this.f += b;
        h === this.u && (this.isReady() !== this.u && A("seeded", Math.max(this.o, this.f)), A("progress", this.getProgress()));
      },
      isReady: function(a) {
        a = this.T[void 0 !== a ? a : this.M];
        return this.o && this.o >= a ? this.m[0] > this.ba && (/* @__PURE__ */ new Date()).valueOf() > this.Z ? this.J | this.I : this.I : this.f >= a ? this.J | this.u : this.u;
      },
      getProgress: function(a) {
        a = this.T[a ? a : this.M];
        return this.o >= a ? 1 : this.f > a ? 1 : this.f / a;
      },
      startCollectors: function() {
        if (!this.D) {
          this.a = { loadTimeCollector: B(this, this.ma), mouseCollector: B(this, this.oa), keyboardCollector: B(this, this.la), accelerometerCollector: B(this, this.ea), touchCollector: B(this, this.qa) };
          if (window.addEventListener) window.addEventListener(
            "load",
            this.a.loadTimeCollector,
            false
          ), window.addEventListener("mousemove", this.a.mouseCollector, false), window.addEventListener("keypress", this.a.keyboardCollector, false), window.addEventListener("devicemotion", this.a.accelerometerCollector, false), window.addEventListener("touchmove", this.a.touchCollector, false);
          else if (document.attachEvent) document.attachEvent("onload", this.a.loadTimeCollector), document.attachEvent("onmousemove", this.a.mouseCollector), document.attachEvent("keypress", this.a.keyboardCollector);
          else throw new sjcl2.exception.bug("can't attach event");
          this.D = true;
        }
      },
      stopCollectors: function() {
        this.D && (window.removeEventListener ? (window.removeEventListener("load", this.a.loadTimeCollector, false), window.removeEventListener("mousemove", this.a.mouseCollector, false), window.removeEventListener("keypress", this.a.keyboardCollector, false), window.removeEventListener("devicemotion", this.a.accelerometerCollector, false), window.removeEventListener("touchmove", this.a.touchCollector, false)) : document.detachEvent && (document.detachEvent("onload", this.a.loadTimeCollector), document.detachEvent(
          "onmousemove",
          this.a.mouseCollector
        ), document.detachEvent("keypress", this.a.keyboardCollector)), this.D = false);
      },
      addEventListener: function(a, b) {
        this.K[a][this.ga++] = b;
      },
      removeEventListener: function(a, b) {
        var c, d, e = this.K[a], f = [];
        for (d in e) e.hasOwnProperty(d) && e[d] === b && f.push(d);
        for (c = 0; c < f.length; c++) d = f[c], delete e[d];
      },
      la: function() {
        C(this, 1);
      },
      oa: function(a) {
        var b, c;
        try {
          b = a.x || a.clientX || a.offsetX || 0, c = a.y || a.clientY || a.offsetY || 0;
        } catch (d) {
          c = b = 0;
        }
        0 != b && 0 != c && this.addEntropy([b, c], 2, "mouse");
        C(this, 0);
      },
      qa: function(a) {
        a = a.touches[0] || a.changedTouches[0];
        this.addEntropy([a.pageX || a.clientX, a.pageY || a.clientY], 1, "touch");
        C(this, 0);
      },
      ma: function() {
        C(this, 2);
      },
      ea: function(a) {
        a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z;
        if (window.orientation) {
          var b = window.orientation;
          "number" === typeof b && this.addEntropy(b, 1, "accelerometer");
        }
        a && this.addEntropy(a, 2, "accelerometer");
        C(this, 0);
      }
    };
    function A(a, b) {
      var c, d = sjcl2.random.K[a], e = [];
      for (c in d) d.hasOwnProperty(c) && e.push(d[c]);
      for (c = 0; c < e.length; c++) e[c](b);
    }
    function C(a, b) {
      "undefined" !== typeof window && window.performance && "function" === typeof window.performance.now ? a.addEntropy(window.performance.now(), b, "loadtime") : a.addEntropy((/* @__PURE__ */ new Date()).valueOf(), b, "loadtime");
    }
    function y(a) {
      a.b = z(a).concat(z(a));
      a.L = new sjcl2.cipher.aes(a.b);
    }
    function z(a) {
      for (var b = 0; 4 > b && (a.h[b] = a.h[b] + 1 | 0, !a.h[b]); b++) ;
      return a.L.encrypt(a.h);
    }
    function B(a, b) {
      return function() {
        b.apply(a, arguments);
      };
    }
    sjcl2.random = new sjcl2.prng(6);
    a: try {
      if (G = "undefined" !== typeof module && module.exports) {
        try {
          H = __require("crypto");
        } catch (a) {
          H = null;
        }
        G = E = H;
      }
      if (G && E.randomBytes) D = E.randomBytes(128), D = new Uint32Array(new Uint8Array(D).buffer), sjcl2.random.addEntropy(D, 1024, "crypto['randomBytes']");
      else if ("undefined" !== typeof window && "undefined" !== typeof Uint32Array) {
        F = new Uint32Array(32);
        if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(F);
        else if (window.msCrypto && window.msCrypto.getRandomValues) window.msCrypto.getRandomValues(F);
        else break a;
        sjcl2.random.addEntropy(F, 1024, "crypto['getRandomValues']");
      }
    } catch (a) {
      "undefined" !== typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(a));
    }
    var D;
    var E;
    var F;
    var G;
    var H;
    sjcl2.json = { defaults: { v: 1, iter: 1e4, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes" }, ja: function(a, b, c, d) {
      c = c || {};
      d = d || {};
      var e = sjcl2.json, f = e.g({ iv: sjcl2.random.randomWords(4, 0) }, e.defaults), g;
      e.g(f, c);
      c = f.adata;
      "string" === typeof f.salt && (f.salt = sjcl2.codec.base64.toBits(f.salt));
      "string" === typeof f.iv && (f.iv = sjcl2.codec.base64.toBits(f.iv));
      if (!sjcl2.mode[f.mode] || !sjcl2.cipher[f.cipher] || "string" === typeof a && 100 >= f.iter || 64 !== f.ts && 96 !== f.ts && 128 !== f.ts || 128 !== f.ks && 192 !== f.ks && 256 !== f.ks || 2 > f.iv.length || 4 < f.iv.length) throw new sjcl2.exception.invalid("json encrypt: invalid parameters");
      "string" === typeof a ? (g = sjcl2.misc.cachedPbkdf2(a, f), a = g.key.slice(0, f.ks / 32), f.salt = g.salt) : sjcl2.ecc && a instanceof sjcl2.ecc.elGamal.publicKey && (g = a.kem(), f.kemtag = g.tag, a = g.key.slice(0, f.ks / 32));
      "string" === typeof b && (b = sjcl2.codec.utf8String.toBits(b));
      "string" === typeof c && (f.adata = c = sjcl2.codec.utf8String.toBits(c));
      g = new sjcl2.cipher[f.cipher](a);
      e.g(d, f);
      d.key = a;
      f.ct = "ccm" === f.mode && sjcl2.arrayBuffer && sjcl2.arrayBuffer.ccm && b instanceof ArrayBuffer ? sjcl2.arrayBuffer.ccm.encrypt(g, b, f.iv, c, f.ts) : sjcl2.mode[f.mode].encrypt(g, b, f.iv, c, f.ts);
      return f;
    }, encrypt: function(a, b, c, d) {
      var e = sjcl2.json, f = e.ja.apply(e, arguments);
      return e.encode(f);
    }, ia: function(a, b, c, d) {
      c = c || {};
      d = d || {};
      var e = sjcl2.json;
      b = e.g(e.g(e.g({}, e.defaults), b), c, true);
      var f, g;
      f = b.adata;
      "string" === typeof b.salt && (b.salt = sjcl2.codec.base64.toBits(b.salt));
      "string" === typeof b.iv && (b.iv = sjcl2.codec.base64.toBits(b.iv));
      if (!sjcl2.mode[b.mode] || !sjcl2.cipher[b.cipher] || "string" === typeof a && 100 >= b.iter || 64 !== b.ts && 96 !== b.ts && 128 !== b.ts || 128 !== b.ks && 192 !== b.ks && 256 !== b.ks || !b.iv || 2 > b.iv.length || 4 < b.iv.length) throw new sjcl2.exception.invalid("json decrypt: invalid parameters");
      "string" === typeof a ? (g = sjcl2.misc.cachedPbkdf2(a, b), a = g.key.slice(0, b.ks / 32), b.salt = g.salt) : sjcl2.ecc && a instanceof sjcl2.ecc.elGamal.secretKey && (a = a.unkem(sjcl2.codec.base64.toBits(b.kemtag)).slice(0, b.ks / 32));
      "string" === typeof f && (f = sjcl2.codec.utf8String.toBits(f));
      g = new sjcl2.cipher[b.cipher](a);
      f = "ccm" === b.mode && sjcl2.arrayBuffer && sjcl2.arrayBuffer.ccm && b.ct instanceof ArrayBuffer ? sjcl2.arrayBuffer.ccm.decrypt(g, b.ct, b.iv, b.tag, f, b.ts) : sjcl2.mode[b.mode].decrypt(g, b.ct, b.iv, f, b.ts);
      e.g(d, b);
      d.key = a;
      return 1 === c.raw ? f : sjcl2.codec.utf8String.fromBits(f);
    }, decrypt: function(a, b, c, d) {
      var e = sjcl2.json;
      return e.ia(a, e.decode(b), c, d);
    }, encode: function(a) {
      var b, c = "{", d = "";
      for (b in a) if (a.hasOwnProperty(b)) {
        if (!b.match(/^[a-z0-9]+$/i)) throw new sjcl2.exception.invalid("json encode: invalid property name");
        c += d + '"' + b + '":';
        d = ",";
        switch (typeof a[b]) {
          case "number":
          case "boolean":
            c += a[b];
            break;
          case "string":
            c += '"' + escape(a[b]) + '"';
            break;
          case "object":
            c += '"' + sjcl2.codec.base64.fromBits(a[b], 0) + '"';
            break;
          default:
            throw new sjcl2.exception.bug("json encode: unsupported type");
        }
      }
      return c + "}";
    }, decode: function(a) {
      a = a.replace(/\s/g, "");
      if (!a.match(/^\{.*\}$/)) throw new sjcl2.exception.invalid("json decode: this isn't json!");
      a = a.replace(/^\{|\}$/g, "").split(/,/);
      var b = {}, c, d;
      for (c = 0; c < a.length; c++) {
        if (!(d = a[c].match(/^\s*(?:(["']?)([a-z][a-z0-9]*)\1)\s*:\s*(?:(-?\d+)|"([a-z0-9+\/%*_.@=\-]*)"|(true|false))$/i))) throw new sjcl2.exception.invalid("json decode: this isn't json!");
        null != d[3] ? b[d[2]] = parseInt(d[3], 10) : null != d[4] ? b[d[2]] = d[2].match(/^(ct|adata|salt|iv)$/) ? sjcl2.codec.base64.toBits(d[4]) : unescape(d[4]) : null != d[5] && (b[d[2]] = "true" === d[5]);
      }
      return b;
    }, g: function(a, b, c) {
      void 0 === a && (a = {});
      if (void 0 === b) return a;
      for (var d in b) if (b.hasOwnProperty(d)) {
        if (c && void 0 !== a[d] && a[d] !== b[d]) throw new sjcl2.exception.invalid("required parameter overridden");
        a[d] = b[d];
      }
      return a;
    }, sa: function(a, b) {
      var c = {}, d;
      for (d in a) a.hasOwnProperty(d) && a[d] !== b[d] && (c[d] = a[d]);
      return c;
    }, ra: function(a, b) {
      var c = {}, d;
      for (d = 0; d < b.length; d++) void 0 !== a[b[d]] && (c[b[d]] = a[b[d]]);
      return c;
    } };
    sjcl2.encrypt = sjcl2.json.encrypt;
    sjcl2.decrypt = sjcl2.json.decrypt;
    sjcl2.misc.pa = {};
    sjcl2.misc.cachedPbkdf2 = function(a, b) {
      var c = sjcl2.misc.pa, d;
      b = b || {};
      d = b.iter || 1e3;
      c = c[a] = c[a] || {};
      d = c[d] = c[d] || { firstSalt: b.salt && b.salt.length ? b.salt.slice(0) : sjcl2.random.randomWords(2, 0) };
      c = void 0 === b.salt ? d.firstSalt : b.salt;
      d[c] = d[c] || sjcl2.misc.pbkdf2(a, c, b.iter);
      return { key: d[c].slice(0), salt: c.slice(0) };
    };
    "undefined" !== typeof module && module.exports && (module.exports = sjcl2);
    "function" === typeof define && define([], function() {
      return sjcl2;
    });
  }
});

// node_modules/.deno/eventemitter3@5.0.1/node_modules/eventemitter3/index.js
var require_eventemitter3 = __commonJS({
  "node_modules/.deno/eventemitter3@5.0.1/node_modules/eventemitter3/index.js"(exports, module) {
    "use strict";
    var has = Object.prototype.hasOwnProperty;
    var prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter5() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter5.prototype.eventNames = function eventNames() {
      var names = [], events3, name;
      if (this._eventsCount === 0) return names;
      for (name in events3 = this._events) {
        if (has.call(events3, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events3));
      }
      return names;
    };
    EventEmitter5.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter5.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter5.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter5.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter5.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter5.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events3 = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events3.push(listeners[i]);
          }
        }
        if (events3.length) this._events[evt] = events3.length === 1 ? events3[0] : events3;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter5.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter5.prototype.off = EventEmitter5.prototype.removeListener;
    EventEmitter5.prototype.addListener = EventEmitter5.prototype.on;
    EventEmitter5.prefixed = prefix;
    EventEmitter5.EventEmitter = EventEmitter5;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter5;
    }
  }
});

// node_modules/.deno/neverthrow@8.0.0/node_modules/neverthrow/dist/index.es.js
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
    step((generator = generator.apply(thisArg, [])).next());
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
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n]) i[n] = function(v) {
      return new Promise(function(a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
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
      return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v;
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
};
var okAsync = (value) => new ResultAsync(Promise.resolve(new Ok(value)));
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
(function(Result3) {
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
  Result3.fromThrowable = fromThrowable2;
  function combine(resultList) {
    return combineResultList(resultList);
  }
  Result3.combine = combine;
  function combineWithAllErrors(resultList) {
    return combineResultListWithAllErrors(resultList);
  }
  Result3.combineWithAllErrors = combineWithAllErrors;
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
  const error = new Error(stringified);
  return error;
};
var isDenoRuntime = () => typeof Deno !== "undefined";
var workerUrl = (relativePath) => isDenoRuntime() ? new URL(`./worker/${relativePath}.ts`, new URL(".", import.meta.url).href) : new URL(
  import.meta.resolve(
    `./${relativePath === "main" ? `worker/${relativePath}` : relativePath}.js`
  )
);

// src/error/websocket/websocket-error.ts
var WebSocketError = class extends BaseError {
};

// src/error/websocket/websocket-connection-error.ts
var WebSocketConnectionError = class extends WebSocketError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "An error occured while trying to connect to WebSocket");
  }
};

// src/worker/main.ts
var import_events = __toESM(require_events());
var events = new import_events.default();
var worker;
var isInitialized = false;
self.onmessage = (event) => {
  addWorker(event);
  if (!isInitialized) {
    isInitialized = true;
    events.once("OPERATION_FAILED" /* OPERATION_FAILED */, () => {
      if (worker) {
        worker.terminate();
      }
    });
  }
};
var updateFile = (lufiFile, args) => {
  Object.assign(lufiFile, args);
  if (typeof WorkerGlobalScope !== "undefined") {
    self.postMessage({
      event: "FILE_UPDATED" /* FILE_UPDATED */,
      lufiFile
    });
  }
  return lufiFile;
};
var sendFileError = (lufiFile, error) => {
  updateFile(lufiFile, { uploadStatus: 2 /* FAILED */ });
  self.postMessage({ event: "OPERATION_FAILED" /* OPERATION_FAILED */, error });
};
var addWorker = (event, callback) => {
  const { action } = event.data;
  if (action === 5 /* PAUSE */ || action === 8 /* RESUME */) {
    worker.postMessage(event.data);
  } else {
    switch (action) {
      case 2 /* CANCEL */:
        {
          worker = new Worker(workerUrl("cancel"), { type: "module" });
          worker.postMessage(event.data);
        }
        break;
      case 3 /* DOWNLOAD */:
        {
          worker = new Worker(workerUrl("download"), { type: "module" });
          worker.postMessage(event.data);
        }
        break;
      case 4 /* INFOS */:
        {
          worker = new Worker(workerUrl("infos"), { type: "module" });
          worker.postMessage(event.data);
        }
        break;
      case 7 /* REMOVE */:
        {
          worker = worker || new Worker(workerUrl("remove"), { type: "module" });
          worker.postMessage(event.data);
        }
        break;
      case 9 /* UPLOAD */:
        {
          worker = worker || new Worker(workerUrl("upload"), { type: "module" });
          worker.postMessage(event.data);
        }
        break;
      default: {
        console.error("Action not found");
      }
    }
    worker.onmessage = (e) => {
      if (callback) callback(e);
      self.postMessage(e.data);
    };
    worker.onerror = (error) => {
      console.error(`Error: ${error.message}`);
    };
  }
};
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

// node_modules/.deno/arraybuffer-encoding@1.1.0/node_modules/arraybuffer-encoding/dist/esm/base64/encoding.js
var Encoding = class {
  /**
   *
   * @param charset Charset to use for base64 encoding. This must be 64-characters long.
   * @param noPadding If true, encoded strings won't include padding.
   */
  constructor(charset, noPadding) {
    if (!charset || charset.length != 64) {
      throw Error("Charset must contain 64 characters");
    }
    this._charset = charset;
    this._noPadding = !!noPadding;
    this._valid = new RegExp("^[" + this._charset.replace("-", "\\-") + "]+={0,2}$");
  }
  /**
   * Encode an ArrayBuffer to base64 in a string.
   * @param ab Data to encode to base64
   * @returns Base64-encoded string
   */
  Encode(ab) {
    const len = ab.byteLength;
    if (!len) {
      return "";
    }
    const view = new Uint8Array(ab);
    let res = "";
    for (let i = 0; i < len; i += 3) {
      res += this._charset[view[i] >> 2] + this._charset[(view[i] & 3) << 4 | view[i + 1] >> 4] + this._charset[(view[i + 1] & 15) << 2 | view[i + 2] >> 6] + this._charset[view[i + 2] & 63];
    }
    if (len % 3 == 2) {
      res = res.substring(0, res.length - 1);
      if (!this._noPadding) {
        res += "=";
      }
    } else if (len % 3 == 1) {
      res = res.substring(0, res.length - 2);
      if (!this._noPadding) {
        res += "==";
      }
    }
    return res;
  }
  /**
   * Decode a string from base64. Padding is always optional.
   * @param str Base64-encoded string
   * @returns Data decoded from the base64 string
   */
  Decode(str) {
    str = (str || "").replace(/[\s]/g, "");
    if (!str) {
      return new ArrayBuffer(0);
    }
    if (!this._valid.test(str)) {
      throw Error("Invalid base64 input sequence");
    }
    let viewLen = Math.floor(str.length * 0.75);
    if (str[str.length - 2] == "=") {
      viewLen -= 2;
    } else if (str[str.length - 1] == "=") {
      viewLen--;
    }
    const view = new Uint8Array(viewLen);
    let enc1, enc2, enc3, enc4, i = 0, j = 0;
    while (i < str.length * 0.75) {
      enc1 = this._charset.indexOf(str.charAt(j++));
      enc2 = this._charset.indexOf(str.charAt(j++));
      enc3 = this._charset.indexOf(str.charAt(j++));
      enc4 = this._charset.indexOf(str.charAt(j++));
      view[i++] = enc1 << 2 | enc2 >> 4;
      view[i++] = (enc2 & 15) << 4 | enc3 >> 2;
      view[i++] = (enc3 & 3) << 6 | enc4;
    }
    return view.buffer;
  }
};

// node_modules/.deno/arraybuffer-encoding@1.1.0/node_modules/arraybuffer-encoding/dist/esm/base64/standard.js
var obj = new Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
function Decode(str) {
  return obj.Decode(str);
}

// node_modules/.deno/arraybuffer-encoding@1.1.0/node_modules/arraybuffer-encoding/dist/esm/base64/url.js
var obj2 = new Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", true);
function Decode2(str) {
  return obj2.Decode(str);
}

// src/api/crypto/sjcl.ts
var import_sjcl = __toESM(require_sjcl());

// src/error/crypto/crypto-error.ts
var CryptoError = class extends BaseError {
};

// src/error/crypto/decryption-error.ts
var DecryptionError = class extends CryptoError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "Unable to decrypt the provided data");
  }
};

// src/api/crypto/sjcl.ts
var decrypt = (key, encryptedData) => {
  try {
    const data = typeof encryptedData === "string" ? encryptedData : encryptedData.data;
    return okAsync(Decode(import_sjcl.default.decrypt(key, data)));
  } catch (error) {
    return errAsync(
      new DecryptionError(void 0, { cause: ensureError(error) })
    );
  }
};

// src/api/crypto/web.ts
var decrypt2 = (key, encrypted) => {
  return importKey(key).andThen(
    (importedKey) => ResultAsync.fromPromise(
      crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: encrypted.iv
        },
        importedKey,
        Decode(encrypted.data)
      ),
      (error) => new DecryptionError(void 0, { cause: ensureError(error) })
    )
  );
};
var importKey = (key) => {
  return ResultAsync.fromPromise(
    crypto.subtle.importKey(
      "raw",
      Decode2(key),
      { name: "AES-GCM" },
      false,
      [
        "encrypt",
        "decrypt"
      ]
    ),
    (error) => new CryptoError("Unable to import cryptography key", {
      cause: ensureError(error)
    })
  );
};

// src/api/crypto.ts
var decrypt3 = (key, value) => {
  return value.algo === void 0 || value.algo === 0 /* Sjcl */ ? decrypt(key, value) : decrypt2(key, value);
};

// src/api/websocket.ts
var sockets = {};
var MAX_ERRORS = 5;
var onCancelMessage = (data) => {
  events.emit("UPLOAD_CANCELLED" /* UPLOAD_CANCELLED */, data.success);
  return okAsync(void 0);
};
var onDownloadMessage = (response, lufiFile) => {
  const result = response.split("XXMOJOXX");
  const metadataString = result.shift();
  if (metadataString !== void 0) {
    const metadata = JSON.parse(metadataString);
    if (isServerDownloadChunkSuccessMetadata(metadata)) {
      const dataString = result.shift();
      if (dataString) {
        const encryptedData = JSON.parse(dataString);
        if (encryptedData.iv) {
          encryptedData.iv = new Uint8Array(Object.values(encryptedData.iv));
        }
        return decrypt3(lufiFile.keys.client, encryptedData).andThen(
          (decryptedPart) => {
            const chunk = typeof decryptedPart === "string" ? new TextEncoder().encode(decryptedPart).buffer : decryptedPart;
            if (metadata.part === 0) {
              updateFile(lufiFile, {
                chunksReady: lufiFile.chunksReady + 1,
                delAtFirstView: metadata.del_at_first_view,
                delay: metadata.delay,
                name: metadata.name,
                size: metadata.size,
                totalChunks: metadata.total,
                type: metadata.type,
                zipped: metadata.zipped
              });
              events.emit("DOWNLOAD_STARTED" /* DOWNLOAD_STARTED */);
            } else {
              updateFile(lufiFile, { chunksReady: lufiFile.chunksReady + 1 });
            }
            events.emit("CHUNK_DOWNLOADED" /* CHUNK_DOWNLOADED */, chunk, metadata.part);
            if (++metadata.part === metadata.total) {
              return endDownload(lufiFile).andThen(() => {
                events.emit("DOWNLOAD_COMPLETE" /* DOWNLOAD_COMPLETE */);
                events.emit("SOCKET_OPERATION_TERMINATED" /* SOCKET_OPERATION_TERMINATED */);
                return okAsync(void 0);
              });
            }
            return okAsync(void 0);
          }
        );
      } else {
        const error = new WebSocketError(
          "Can't retrieve metadata from data received by the server"
        );
        events.emit("OPERATION_FAILED" /* OPERATION_FAILED */, error);
        return errAsync(error);
      }
    } else {
      const error = new WebSocketError(metadata.msg);
      events.emit("OPERATION_FAILED" /* OPERATION_FAILED */, error);
      return errAsync(error);
    }
  } else {
    const error = new WebSocketError(
      "Can't retrieve metadata from data received by the server"
    );
    events.emit("OPERATION_FAILED" /* OPERATION_FAILED */, error);
    return errAsync(error);
  }
};
var onUploadMessage = (response, lufiFile) => {
  if (response.success) {
    if (response.j === 0) {
      updateFile(lufiFile, {
        keys: { client: lufiFile.keys.client, server: response.short },
        actionToken: response.token,
        queueIndex: response.i
      });
      events.emit("UPLOAD_STARTED" /* UPLOAD_STARTED */);
    }
    updateFile(lufiFile, {
      chunksReady: lufiFile.chunksReady + 1,
      createdAt: response.created_at
    });
    events.emit("CHUNK_UPLOADED" /* CHUNK_UPLOADED */);
    if (lufiFile.chunksReady === lufiFile.totalChunks) {
      updateFile(lufiFile, { uploadStatus: 1 /* COMPLETE */ });
      events.emit("UPLOAD_COMPLETE" /* UPLOAD_COMPLETE */);
      events.emit("SOCKET_OPERATION_TERMINATED" /* SOCKET_OPERATION_TERMINATED */);
    }
    return okAsync(void 0);
  } else {
    const error = new WebSocketError(response.msg);
    events.emit("OPERATION_FAILED" /* OPERATION_FAILED */, error);
    return errAsync(error);
  }
};
var onMessage = (e, lufiFile) => {
  const data = tryParseJson(e.data);
  let callback;
  if (data) {
    if (!data.action && data.msg) {
      const error = new WebSocketError(data.msg);
      events.emit("OPERATION_FAILED" /* OPERATION_FAILED */, error);
      return errAsync(error);
    } else {
      if ("delay" in data) {
        callback = onUploadMessage(data, lufiFile);
      } else {
        callback = onCancelMessage(data);
      }
    }
  } else {
    callback = onDownloadMessage(e.data, lufiFile);
  }
  return callback;
};
var isConnecting = (socketKey) => sockets !== void 0 && sockets[socketKey] !== void 0 && sockets[socketKey].readyState === WebSocket.CONNECTING;
var isSpawned = (socketKey) => sockets !== void 0 && sockets[socketKey] !== void 0 && sockets[socketKey].readyState === WebSocket.OPEN;
var endDownload = (lufiFile) => {
  let message;
  if (lufiFile.password) {
    message = { ended: true, file_pwd: lufiFile.password };
  } else {
    message = { ended: true };
  }
  return sendMessage(
    downloadSocketUrl(lufiFile),
    lufiFile,
    JSON.stringify(message)
  );
};
var uploadChunk = (lufiFile, metadata, encryptedData) => sendMessage(
  uploadSocketUrl(lufiFile),
  lufiFile,
  `${JSON.stringify(metadata)}XXMOJOXX${JSON.stringify(encryptedData)}`
);
var sendMessage = (socketUrl, lufiFile, message) => {
  if (!isSpawned(socketUrl)) {
    return spawn(socketUrl).andThen(
      () => sendMessage(socketUrl, lufiFile, message)
    );
  } else {
    sockets[socketUrl].onmessage = (e) => onMessage(e, lufiFile);
    sockets[socketUrl].send(message);
    return okAsync(void 0);
  }
};
var spawn = (socketKey, errorCount = 0) => {
  if (!isSpawned(socketKey) && !isConnecting(socketKey)) {
    sockets[socketKey] = new WebSocket(socketKey);
    events.once("SOCKET_OPERATION_TERMINATED" /* SOCKET_OPERATION_TERMINATED */, () => {
      sockets[socketKey].close();
    });
    events.once("OPERATION_FAILED" /* OPERATION_FAILED */, () => {
      events.emit("SOCKET_OPERATION_TERMINATED" /* SOCKET_OPERATION_TERMINATED */);
    });
    sockets[socketKey].onopen = () => {
      events.emit("SOCKET_OPENED" /* SOCKET_OPENED */);
    };
    sockets[socketKey].onclose = () => {
    };
    sockets[socketKey].onerror = () => {
      if (++errorCount <= MAX_ERRORS) {
        console.error(
          `An error happened while trying to connect to WebSocket ${socketKey}. Trying again. ${errorCount} / ${MAX_ERRORS}`
        );
        return spawn(socketKey, errorCount);
      } else {
        events.emit("SOCKET_ONERROR" /* SOCKET_ONERROR */);
        return errAsync(
          new WebSocketConnectionError(
            `Unable to connect to WebSocket ${socketKey}.`
          )
        );
      }
    };
  }
  return waitForConnection(socketKey).andThen(() => okAsync(socketKey)).orElse((error) => errAsync(error));
};
var waitForConnection = (socketKey) => ResultAsync.fromPromise(
  new Promise((resolve, reject) => {
    if (!isSpawned(socketKey)) {
      events.once("SOCKET_OPENED" /* SOCKET_OPENED */, () => {
        resolve(void 0);
      });
      events.on("SOCKET_ONERROR" /* SOCKET_ONERROR */, () => {
        reject(new WebSocketConnectionError());
      });
    } else {
      resolve(void 0);
    }
  }),
  (error) => {
    return ensureError(error);
  }
);
var buildSocketUrl = (instanceUrl, pathname) => {
  const url = new URL(instanceUrl);
  url.protocol = url.protocol === "http:" ? "ws:" : "wss:";
  url.pathname += pathname;
  return new URL(url.origin + url.pathname);
};
var downloadSocketUrl = (lufiFile) => {
  return buildSocketUrl(
    new URL(lufiFile.serverUrl),
    "download" /* DOWNLOAD */ + `/${lufiFile.keys.server}`
  ).toString();
};
var uploadSocketUrl = (lufiFile) => {
  return buildSocketUrl(new URL(lufiFile.serverUrl), "upload" /* UPLOAD */).toString();
};
var tryParseJson = (data) => {
  try {
    const parsedObject = JSON.parse(data);
    if (parsedObject && typeof parsedObject === "object") {
      return parsedObject;
    }
  } catch (_e) {
  }
  return false;
};
var isServerDownloadChunkSuccessMetadata = (message) => {
  return typeof message === "object" && message !== null && !("msg" in message);
};

// src/api/lufi.ts
var import_events3 = __toESM(require_events());

// src/entities/lufi-job.ts
var import_events2 = __toESM(require_events());

// src/api/lufi.ts
var files = {};
var events2 = new import_events3.default();
var getFilesQueued = () => Object.values(files).filter(
  (file) => file.uploadStatus === 4 /* QUEUED */
);
var getFileIndexInQueue = (clientKey) => Object.keys(getFilesQueued()).indexOf(clientKey);

// node_modules/.deno/eventemitter3@5.0.1/node_modules/eventemitter3/index.mjs
var import_index = __toESM(require_eventemitter3(), 1);

// node_modules/.deno/p-timeout@6.1.3/node_modules/p-timeout/index.js
var TimeoutError = class extends Error {
  constructor(message) {
    super(message);
    this.name = "TimeoutError";
  }
};
var AbortError = class extends Error {
  constructor(message) {
    super();
    this.name = "AbortError";
    this.message = message;
  }
};
var getDOMException = (errorMessage) => globalThis.DOMException === void 0 ? new AbortError(errorMessage) : new DOMException(errorMessage);
var getAbortedReason = (signal) => {
  const reason = signal.reason === void 0 ? getDOMException("This operation was aborted.") : signal.reason;
  return reason instanceof Error ? reason : getDOMException(reason);
};
function pTimeout(promise, options) {
  const {
    milliseconds,
    fallback,
    message,
    customTimers = { setTimeout, clearTimeout }
  } = options;
  let timer;
  const wrappedPromise = new Promise((resolve, reject) => {
    if (typeof milliseconds !== "number" || Math.sign(milliseconds) !== 1) {
      throw new TypeError(`Expected \`milliseconds\` to be a positive number, got \`${milliseconds}\``);
    }
    if (options.signal) {
      const { signal } = options;
      if (signal.aborted) {
        reject(getAbortedReason(signal));
      }
      const abortHandler = () => {
        reject(getAbortedReason(signal));
      };
      signal.addEventListener("abort", abortHandler, { once: true });
      promise.finally(() => {
        signal.removeEventListener("abort", abortHandler);
      });
    }
    if (milliseconds === Number.POSITIVE_INFINITY) {
      promise.then(resolve, reject);
      return;
    }
    const timeoutError = new TimeoutError();
    timer = customTimers.setTimeout.call(void 0, () => {
      if (fallback) {
        try {
          resolve(fallback());
        } catch (error) {
          reject(error);
        }
        return;
      }
      if (typeof promise.cancel === "function") {
        promise.cancel();
      }
      if (message === false) {
        resolve();
      } else if (message instanceof Error) {
        reject(message);
      } else {
        timeoutError.message = message != null ? message : `Promise timed out after ${milliseconds} milliseconds`;
        reject(timeoutError);
      }
    }, milliseconds);
    (async () => {
      try {
        resolve(await promise);
      } catch (error) {
        reject(error);
      }
    })();
  });
  const cancelablePromise = wrappedPromise.finally(() => {
    cancelablePromise.clear();
  });
  cancelablePromise.clear = () => {
    customTimers.clearTimeout.call(void 0, timer);
    timer = void 0;
  };
  return cancelablePromise;
}

// node_modules/.deno/p-queue@8.0.1/node_modules/p-queue/dist/lower-bound.js
function lowerBound(array, value, comparator) {
  let first = 0;
  let count = array.length;
  while (count > 0) {
    const step = Math.trunc(count / 2);
    let it = first + step;
    if (comparator(array[it], value) <= 0) {
      first = ++it;
      count -= step + 1;
    } else {
      count = step;
    }
  }
  return first;
}

// node_modules/.deno/p-queue@8.0.1/node_modules/p-queue/dist/priority-queue.js
var _queue;
var PriorityQueue = class {
  constructor() {
    __privateAdd(this, _queue, []);
  }
  enqueue(run, options) {
    options = {
      priority: 0,
      ...options
    };
    const element = {
      priority: options.priority,
      run
    };
    if (this.size && __privateGet(this, _queue)[this.size - 1].priority >= options.priority) {
      __privateGet(this, _queue).push(element);
      return;
    }
    const index = lowerBound(__privateGet(this, _queue), element, (a, b) => b.priority - a.priority);
    __privateGet(this, _queue).splice(index, 0, element);
  }
  dequeue() {
    const item = __privateGet(this, _queue).shift();
    return item == null ? void 0 : item.run;
  }
  filter(options) {
    return __privateGet(this, _queue).filter((element) => element.priority === options.priority).map((element) => element.run);
  }
  get size() {
    return __privateGet(this, _queue).length;
  }
};
_queue = new WeakMap();

// node_modules/.deno/p-queue@8.0.1/node_modules/p-queue/dist/index.js
var _carryoverConcurrencyCount, _isIntervalIgnored, _intervalCount, _intervalCap, _interval, _intervalEnd, _intervalId, _timeoutId, _queue2, _queueClass, _pending, _concurrency, _isPaused, _throwOnTimeout, _PQueue_instances, doesIntervalAllowAnother_get, doesConcurrentAllowAnother_get, next_fn, onResumeInterval_fn, isIntervalPaused_get, tryToStartAnother_fn, initializeIntervalIfNeeded_fn, onInterval_fn, processQueue_fn, throwOnAbort_fn, onEvent_fn;
var PQueue = class extends import_index.default {
  // TODO: The `throwOnTimeout` option should affect the return types of `add()` and `addAll()`
  constructor(options) {
    var _a, _b, _c, _d;
    super();
    __privateAdd(this, _PQueue_instances);
    __privateAdd(this, _carryoverConcurrencyCount);
    __privateAdd(this, _isIntervalIgnored);
    __privateAdd(this, _intervalCount, 0);
    __privateAdd(this, _intervalCap);
    __privateAdd(this, _interval);
    __privateAdd(this, _intervalEnd, 0);
    __privateAdd(this, _intervalId);
    __privateAdd(this, _timeoutId);
    __privateAdd(this, _queue2);
    __privateAdd(this, _queueClass);
    __privateAdd(this, _pending, 0);
    // The `!` is needed because of https://github.com/microsoft/TypeScript/issues/32194
    __privateAdd(this, _concurrency);
    __privateAdd(this, _isPaused);
    __privateAdd(this, _throwOnTimeout);
    /**
        Per-operation timeout in milliseconds. Operations fulfill once `timeout` elapses if they haven't already.
    
        Applies to each future operation.
        */
    __publicField(this, "timeout");
    options = {
      carryoverConcurrencyCount: false,
      intervalCap: Number.POSITIVE_INFINITY,
      interval: 0,
      concurrency: Number.POSITIVE_INFINITY,
      autoStart: true,
      queueClass: PriorityQueue,
      ...options
    };
    if (!(typeof options.intervalCap === "number" && options.intervalCap >= 1)) {
      throw new TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${(_b = (_a = options.intervalCap) == null ? void 0 : _a.toString()) != null ? _b : ""}\` (${typeof options.intervalCap})`);
    }
    if (options.interval === void 0 || !(Number.isFinite(options.interval) && options.interval >= 0)) {
      throw new TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${(_d = (_c = options.interval) == null ? void 0 : _c.toString()) != null ? _d : ""}\` (${typeof options.interval})`);
    }
    __privateSet(this, _carryoverConcurrencyCount, options.carryoverConcurrencyCount);
    __privateSet(this, _isIntervalIgnored, options.intervalCap === Number.POSITIVE_INFINITY || options.interval === 0);
    __privateSet(this, _intervalCap, options.intervalCap);
    __privateSet(this, _interval, options.interval);
    __privateSet(this, _queue2, new options.queueClass());
    __privateSet(this, _queueClass, options.queueClass);
    this.concurrency = options.concurrency;
    this.timeout = options.timeout;
    __privateSet(this, _throwOnTimeout, options.throwOnTimeout === true);
    __privateSet(this, _isPaused, options.autoStart === false);
  }
  get concurrency() {
    return __privateGet(this, _concurrency);
  }
  set concurrency(newConcurrency) {
    if (!(typeof newConcurrency === "number" && newConcurrency >= 1)) {
      throw new TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${newConcurrency}\` (${typeof newConcurrency})`);
    }
    __privateSet(this, _concurrency, newConcurrency);
    __privateMethod(this, _PQueue_instances, processQueue_fn).call(this);
  }
  async add(function_, options = {}) {
    options = {
      timeout: this.timeout,
      throwOnTimeout: __privateGet(this, _throwOnTimeout),
      ...options
    };
    return new Promise((resolve, reject) => {
      __privateGet(this, _queue2).enqueue(async () => {
        var _a;
        __privateWrapper(this, _pending)._++;
        __privateWrapper(this, _intervalCount)._++;
        try {
          (_a = options.signal) == null ? void 0 : _a.throwIfAborted();
          let operation = function_({ signal: options.signal });
          if (options.timeout) {
            operation = pTimeout(Promise.resolve(operation), { milliseconds: options.timeout });
          }
          if (options.signal) {
            operation = Promise.race([operation, __privateMethod(this, _PQueue_instances, throwOnAbort_fn).call(this, options.signal)]);
          }
          const result = await operation;
          resolve(result);
          this.emit("completed", result);
        } catch (error) {
          if (error instanceof TimeoutError && !options.throwOnTimeout) {
            resolve();
            return;
          }
          reject(error);
          this.emit("error", error);
        } finally {
          __privateMethod(this, _PQueue_instances, next_fn).call(this);
        }
      }, options);
      this.emit("add");
      __privateMethod(this, _PQueue_instances, tryToStartAnother_fn).call(this);
    });
  }
  async addAll(functions, options) {
    return Promise.all(functions.map(async (function_) => this.add(function_, options)));
  }
  /**
  Start (or resume) executing enqueued tasks within concurrency limit. No need to call this if queue is not paused (via `options.autoStart = false` or by `.pause()` method.)
  */
  start() {
    if (!__privateGet(this, _isPaused)) {
      return this;
    }
    __privateSet(this, _isPaused, false);
    __privateMethod(this, _PQueue_instances, processQueue_fn).call(this);
    return this;
  }
  /**
  Put queue execution on hold.
  */
  pause() {
    __privateSet(this, _isPaused, true);
  }
  /**
  Clear the queue.
  */
  clear() {
    __privateSet(this, _queue2, new (__privateGet(this, _queueClass))());
  }
  /**
      Can be called multiple times. Useful if you for example add additional items at a later time.
  
      @returns A promise that settles when the queue becomes empty.
      */
  async onEmpty() {
    if (__privateGet(this, _queue2).size === 0) {
      return;
    }
    await __privateMethod(this, _PQueue_instances, onEvent_fn).call(this, "empty");
  }
  /**
      @returns A promise that settles when the queue size is less than the given limit: `queue.size < limit`.
  
      If you want to avoid having the queue grow beyond a certain size you can `await queue.onSizeLessThan()` before adding a new item.
  
      Note that this only limits the number of items waiting to start. There could still be up to `concurrency` jobs already running that this call does not include in its calculation.
      */
  async onSizeLessThan(limit) {
    if (__privateGet(this, _queue2).size < limit) {
      return;
    }
    await __privateMethod(this, _PQueue_instances, onEvent_fn).call(this, "next", () => __privateGet(this, _queue2).size < limit);
  }
  /**
      The difference with `.onEmpty` is that `.onIdle` guarantees that all work from the queue has finished. `.onEmpty` merely signals that the queue is empty, but it could mean that some promises haven't completed yet.
  
      @returns A promise that settles when the queue becomes empty, and all promises have completed; `queue.size === 0 && queue.pending === 0`.
      */
  async onIdle() {
    if (__privateGet(this, _pending) === 0 && __privateGet(this, _queue2).size === 0) {
      return;
    }
    await __privateMethod(this, _PQueue_instances, onEvent_fn).call(this, "idle");
  }
  /**
  Size of the queue, the number of queued items waiting to run.
  */
  get size() {
    return __privateGet(this, _queue2).size;
  }
  /**
      Size of the queue, filtered by the given options.
  
      For example, this can be used to find the number of items remaining in the queue with a specific priority level.
      */
  sizeBy(options) {
    return __privateGet(this, _queue2).filter(options).length;
  }
  /**
  Number of running items (no longer in the queue).
  */
  get pending() {
    return __privateGet(this, _pending);
  }
  /**
  Whether the queue is currently paused.
  */
  get isPaused() {
    return __privateGet(this, _isPaused);
  }
};
_carryoverConcurrencyCount = new WeakMap();
_isIntervalIgnored = new WeakMap();
_intervalCount = new WeakMap();
_intervalCap = new WeakMap();
_interval = new WeakMap();
_intervalEnd = new WeakMap();
_intervalId = new WeakMap();
_timeoutId = new WeakMap();
_queue2 = new WeakMap();
_queueClass = new WeakMap();
_pending = new WeakMap();
_concurrency = new WeakMap();
_isPaused = new WeakMap();
_throwOnTimeout = new WeakMap();
_PQueue_instances = new WeakSet();
doesIntervalAllowAnother_get = function() {
  return __privateGet(this, _isIntervalIgnored) || __privateGet(this, _intervalCount) < __privateGet(this, _intervalCap);
};
doesConcurrentAllowAnother_get = function() {
  return __privateGet(this, _pending) < __privateGet(this, _concurrency);
};
next_fn = function() {
  __privateWrapper(this, _pending)._--;
  __privateMethod(this, _PQueue_instances, tryToStartAnother_fn).call(this);
  this.emit("next");
};
onResumeInterval_fn = function() {
  __privateMethod(this, _PQueue_instances, onInterval_fn).call(this);
  __privateMethod(this, _PQueue_instances, initializeIntervalIfNeeded_fn).call(this);
  __privateSet(this, _timeoutId, void 0);
};
isIntervalPaused_get = function() {
  const now = Date.now();
  if (__privateGet(this, _intervalId) === void 0) {
    const delay = __privateGet(this, _intervalEnd) - now;
    if (delay < 0) {
      __privateSet(this, _intervalCount, __privateGet(this, _carryoverConcurrencyCount) ? __privateGet(this, _pending) : 0);
    } else {
      if (__privateGet(this, _timeoutId) === void 0) {
        __privateSet(this, _timeoutId, setTimeout(() => {
          __privateMethod(this, _PQueue_instances, onResumeInterval_fn).call(this);
        }, delay));
      }
      return true;
    }
  }
  return false;
};
tryToStartAnother_fn = function() {
  if (__privateGet(this, _queue2).size === 0) {
    if (__privateGet(this, _intervalId)) {
      clearInterval(__privateGet(this, _intervalId));
    }
    __privateSet(this, _intervalId, void 0);
    this.emit("empty");
    if (__privateGet(this, _pending) === 0) {
      this.emit("idle");
    }
    return false;
  }
  if (!__privateGet(this, _isPaused)) {
    const canInitializeInterval = !__privateGet(this, _PQueue_instances, isIntervalPaused_get);
    if (__privateGet(this, _PQueue_instances, doesIntervalAllowAnother_get) && __privateGet(this, _PQueue_instances, doesConcurrentAllowAnother_get)) {
      const job = __privateGet(this, _queue2).dequeue();
      if (!job) {
        return false;
      }
      this.emit("active");
      job();
      if (canInitializeInterval) {
        __privateMethod(this, _PQueue_instances, initializeIntervalIfNeeded_fn).call(this);
      }
      return true;
    }
  }
  return false;
};
initializeIntervalIfNeeded_fn = function() {
  if (__privateGet(this, _isIntervalIgnored) || __privateGet(this, _intervalId) !== void 0) {
    return;
  }
  __privateSet(this, _intervalId, setInterval(() => {
    __privateMethod(this, _PQueue_instances, onInterval_fn).call(this);
  }, __privateGet(this, _interval)));
  __privateSet(this, _intervalEnd, Date.now() + __privateGet(this, _interval));
};
onInterval_fn = function() {
  if (__privateGet(this, _intervalCount) === 0 && __privateGet(this, _pending) === 0 && __privateGet(this, _intervalId)) {
    clearInterval(__privateGet(this, _intervalId));
    __privateSet(this, _intervalId, void 0);
  }
  __privateSet(this, _intervalCount, __privateGet(this, _carryoverConcurrencyCount) ? __privateGet(this, _pending) : 0);
  __privateMethod(this, _PQueue_instances, processQueue_fn).call(this);
};
/**
Executes all queued functions until it reaches the limit.
*/
processQueue_fn = function() {
  while (__privateMethod(this, _PQueue_instances, tryToStartAnother_fn).call(this)) {
  }
};
throwOnAbort_fn = async function(signal) {
  return new Promise((_resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(signal.reason);
    }, { once: true });
  });
};
onEvent_fn = async function(event, filter) {
  return new Promise((resolve) => {
    const listener = () => {
      if (filter && !filter()) {
        return;
      }
      this.off(event, listener);
      resolve();
    };
    this.on(event, listener);
  });
};

// src/worker/upload.ts
var isInitialized2 = false;
var QUEUE_CONCURRENCY_LIMIT = navigator.hardwareConcurrency || 4;
var queue = new PQueue({
  concurrency: QUEUE_CONCURRENCY_LIMIT,
  autoStart: false
});
var itemsInQueue = 0;
var chunks = [];
var isPaused = false;
self.onmessage = (event) => {
  const data = event.data;
  const { chunk, lufiFile } = data.args;
  if (!isInitialized2) {
    init();
    isInitialized2 = true;
  }
  if (chunk) {
    chunks[chunk.index] = chunk;
    if (chunks.length === lufiFile.totalChunks) {
      events.once("UPLOAD_COMPLETE" /* UPLOAD_COMPLETE */, () => {
        self.postMessage({
          event: "UPLOAD_COMPLETE" /* UPLOAD_COMPLETE */
        });
      });
      events.on("FILE_UPDATED" /* FILE_UPDATED */, updateFile);
      events.on("CHUNK_UPLOADED" /* CHUNK_UPLOADED */, () => {
        self.postMessage({ event: "CHUNK_UPLOADED" /* CHUNK_UPLOADED */ });
        itemsInQueue--;
        if (!isPaused && itemsInQueue < QUEUE_CONCURRENCY_LIMIT) {
          queue.start();
        }
      });
      return upload(event.data);
    }
  } else {
    if (data.action === 5 /* PAUSE */) {
      isPaused = true;
      queue.pause();
      self.postMessage({ event: "JOB_PAUSED" /* JOB_PAUSED */ });
    }
    if (data.action === 8 /* RESUME */) {
      isPaused = false;
      queue.start();
      self.postMessage({ event: "JOB_RESUMED" /* JOB_RESUMED */ });
    }
  }
};
var upload = (workerMessage) => startUpload(
  workerMessage,
  getFileIndexInQueue(workerMessage.args.lufiFile.keys.client)
);
var startUpload = (workerMessage, queueIndex) => {
  const { lufiFile } = workerMessage.args;
  const job = new Worker(workerUrl("encrypt"), { type: "module" });
  events.on("UPLOAD_STARTED" /* UPLOAD_STARTED */, () => {
    job.onmessage = async (event) => {
      if (event.data.encryptedData) {
        const { encryptedData } = event.data;
        await queue.add(async () => {
          await uploadChunk(
            lufiFile,
            {
              total: lufiFile.totalChunks,
              part: event.data.chunkIndex,
              size: lufiFile.size,
              name: lufiFile.name.split("/").pop(),
              type: lufiFile.type,
              delay: lufiFile.delay,
              del_at_first_view: lufiFile.delAtFirstView,
              zipped: lufiFile.zipped,
              id: lufiFile.keys.server,
              i: queueIndex,
              file_pwd: lufiFile.password
            },
            encryptedData
          );
          itemsInQueue++;
          if (isPaused || itemsInQueue === QUEUE_CONCURRENCY_LIMIT) {
            queue.pause();
          }
        });
      }
      queue.start();
      if (event.data.error) {
        sendFileError(lufiFile, event.data.error);
        job.terminate();
      }
    };
    for (let i = 1; i < lufiFile.totalChunks; i++) {
      workerMessage.args.chunk = chunks[i];
      job.postMessage(workerMessage);
    }
  });
  job.onmessage = (event) => {
    if (event.data.encryptedData) {
      const { encryptedData } = event.data;
      uploadChunk(
        lufiFile,
        {
          total: lufiFile.totalChunks,
          part: event.data.chunkIndex,
          size: lufiFile.size,
          name: lufiFile.name.split("/").pop(),
          type: lufiFile.type,
          delay: lufiFile.delay,
          del_at_first_view: lufiFile.delAtFirstView,
          zipped: lufiFile.zipped,
          id: null,
          i: queueIndex,
          file_pwd: lufiFile.password
        },
        encryptedData
      ).mapErr((error) => {
        sendFileError(lufiFile, error);
      });
    }
    if (event.data.error) {
      sendFileError(lufiFile, event.data.error);
    }
  };
  workerMessage.args.chunk = chunks[0];
  job.postMessage(workerMessage);
  return okAsync(void 0);
};
