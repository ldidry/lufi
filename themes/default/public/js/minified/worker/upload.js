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

// node_modules/.deno/lufi-sjcl@1.0.8/node_modules/lufi-sjcl/sjcl.js
var require_sjcl = __commonJS({
  "node_modules/.deno/lufi-sjcl@1.0.8/node_modules/lufi-sjcl/sjcl.js"(exports, module) {
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
      this.w[0][0][0] || this.C();
      var b, c, d, e, f = this.w[0][4], g = this.w[1];
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
      return aa(this, a, 0);
    }, decrypt: function(a) {
      return aa(this, a, 1);
    }, w: [[[], [], [], [], []], [[], [], [], [], []]], C: function() {
      var a = this.w[0], b = this.w[1], c = a[4], d = b[4], e, f, g, h = [], k = [], n, l, m, p;
      for (e = 0; 256 > e; e++) k[(h[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
      for (f = g = 0; !c[f]; f ^= n || 1, g = k[g] || 1) for (m = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, m = m >> 8 ^ m & 255 ^ 99, c[f] = m, d[m] = f, l = h[e = h[n = h[f]]], p = 16843009 * l ^ 65537 * e ^ 257 * n ^ 16843008 * f, l = 257 * h[m] ^ 16843008 * m, e = 0; 4 > e; e++) a[e][f] = l = l << 24 ^ l >>> 8, b[e][m] = p = p << 24 ^ p >>> 8;
      for (e = 0; 5 > e; e++) a[e] = a[e].slice(0), b[e] = b[e].slice(0);
    } };
    function aa(a, b, c) {
      if (4 !== b.length) throw new sjcl2.exception.invalid("invalid aes block size");
      var d = a.b[c], e = b[0] ^ d[0], f = b[c ? 3 : 1] ^ d[1], g = b[2] ^ d[2];
      b = b[c ? 1 : 3] ^ d[3];
      var h, k, n, l = d.length / 4 - 2, m, p = 4, z = [0, 0, 0, 0];
      h = a.w[c];
      a = h[0];
      var A = h[1], C = h[2], B = h[3], D = h[4];
      for (m = 0; m < l; m++) h = a[e >>> 24] ^ A[f >> 16 & 255] ^ C[g >> 8 & 255] ^ B[b & 255] ^ d[p], k = a[f >>> 24] ^ A[g >> 16 & 255] ^ C[b >> 8 & 255] ^ B[e & 255] ^ d[p + 1], n = a[g >>> 24] ^ A[b >> 16 & 255] ^ C[e >> 8 & 255] ^ B[f & 255] ^ d[p + 2], b = a[b >>> 24] ^ A[e >> 16 & 255] ^ C[f >> 8 & 255] ^ B[g & 255] ^ d[p + 3], p += 4, e = h, f = k, g = n;
      for (m = 0; 4 > m; m++) z[c ? 3 & -m : m] = D[e >>> 24] << 24 ^ D[f >> 16 & 255] << 16 ^ D[g >> 8 & 255] << 8 ^ D[b & 255] ^ d[p++], h = e, e = f, f = g, g = b, b = h;
      return z;
    }
    sjcl2.bitArray = { bitSlice: function(a, b, c) {
      a = sjcl2.bitArray.Y(a.slice(b / 32), 32 - (b & 31)).slice(1);
      return void 0 === c ? a : sjcl2.bitArray.clamp(a, c - b);
    }, extract: function(a, b, c) {
      var d = Math.floor(-b - c & 31);
      return ((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1;
    }, concat: function(a, b) {
      if (0 === a.length || 0 === b.length) return a.concat(b);
      var c = a[a.length - 1], d = sjcl2.bitArray.getPartial(c);
      return 32 === d ? a.concat(b) : sjcl2.bitArray.Y(b, d, c | 0, a.slice(0, a.length - 1));
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
    }, Y: function(a, b, c, d) {
      var e;
      e = 0;
      for (void 0 === d && (d = []); 32 <= b; b -= 32) d.push(c), c = 0;
      if (0 === b) return d.concat(a);
      for (e = 0; e < a.length; e++) d.push(c | a[e] >>> b), c = a[e] << 32 - b;
      e = a.length ? a[a.length - 1] : 0;
      a = sjcl2.bitArray.getPartial(e);
      d.push(sjcl2.bitArray.partial(b + a & 31, 32 < b + a ? c : d.pop(), 1));
      return d;
    }, P: function(a, b) {
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
    sjcl2.codec.base64 = { S: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function(a, b, c) {
      var d = "", e = 0, f = sjcl2.codec.base64.S, g = 0, h = sjcl2.bitArray.bitLength(a);
      c && (f = f.substr(0, 62) + "-_");
      for (c = 0; 6 * d.length < h; ) d += f.charAt((g ^ a[c] >>> e) >>> 26), 6 > e ? (g = a[c] << 6 - e, e += 26, c++) : (g <<= 6, e -= 6);
      for (; d.length & 3 && !b; ) d += "=";
      return d;
    }, toBits: function(a, b) {
      a = a.replace(/\s|=/g, "");
      var c = [], d, e = 0, f = sjcl2.codec.base64.S, g = 0, h;
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
      this.b[0] || this.C();
      a ? (this.g = a.g.slice(0), this.f = a.f.slice(0), this.c = a.c) : this.reset();
    };
    sjcl2.hash.sha256.hash = function(a) {
      return new sjcl2.hash.sha256().update(a).finalize();
    };
    sjcl2.hash.sha256.prototype = { blockSize: 512, reset: function() {
      this.g = this.o.slice(0);
      this.f = [];
      this.c = 0;
      return this;
    }, update: function(a) {
      "string" === typeof a && (a = sjcl2.codec.utf8String.toBits(a));
      var b, c = this.f = sjcl2.bitArray.concat(this.f, a);
      b = this.c;
      a = this.c = b + sjcl2.bitArray.bitLength(a);
      if (9007199254740991 < a) throw new sjcl2.exception.invalid("Cannot hash more than 2^53 - 1 bits");
      if ("undefined" !== typeof Uint32Array) {
        var d = new Uint32Array(c), e = 0;
        for (b = 512 + b - (512 + b & 511); b <= a; b += 512) this.l(d.subarray(
          16 * e,
          16 * (e + 1)
        )), e += 1;
        c.splice(0, 16 * e);
      } else for (b = 512 + b - (512 + b & 511); b <= a; b += 512) this.l(c.splice(0, 16));
      return this;
    }, finalize: function() {
      var a, b = this.f, c = this.g, b = sjcl2.bitArray.concat(b, [sjcl2.bitArray.partial(1, 1)]);
      for (a = b.length + 2; a & 15; a++) b.push(0);
      b.push(Math.floor(this.c / 4294967296));
      for (b.push(this.c | 0); b.length; ) this.l(b.splice(0, 16));
      this.reset();
      return c;
    }, o: [], b: [], C: function() {
      function a(a2) {
        return 4294967296 * (a2 - Math.floor(a2)) | 0;
      }
      for (var b = 0, c = 2, d, e; 64 > b; c++) {
        e = true;
        for (d = 2; d * d <= c; d++) if (0 === c % d) {
          e = false;
          break;
        }
        e && (8 > b && (this.o[b] = a(Math.pow(c, 0.5))), this.b[b] = a(Math.pow(c, 1 / 3)), b++);
      }
    }, l: function(a) {
      var b, c, d, e = this.g, f = this.b, g = e[0], h = e[1], k = e[2], n = e[3], l = e[4], m = e[5], p = e[6], z = e[7];
      for (b = 0; 64 > b; b++) 16 > b ? c = a[b] : (c = a[b + 1 & 15], d = a[b + 14 & 15], c = a[b & 15] = (c >>> 7 ^ c >>> 18 ^ c >>> 3 ^ c << 25 ^ c << 14) + (d >>> 17 ^ d >>> 19 ^ d >>> 10 ^ d << 15 ^ d << 13) + a[b & 15] + a[b + 9 & 15] | 0), c = c + z + (l >>> 6 ^ l >>> 11 ^ l >>> 25 ^ l << 26 ^ l << 21 ^ l << 7) + (p ^ l & (m ^ p)) + f[b], z = p, p = m, m = l, l = n + c | 0, n = k, k = h, h = g, g = c + (h & k ^ n & (h ^ k)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
      e[0] = e[0] + g | 0;
      e[1] = e[1] + h | 0;
      e[2] = e[2] + k | 0;
      e[3] = e[3] + n | 0;
      e[4] = e[4] + l | 0;
      e[5] = e[5] + m | 0;
      e[6] = e[6] + p | 0;
      e[7] = e[7] + z | 0;
    } };
    sjcl2.hash.sha512 = function(a) {
      this.b[0] || this.C();
      a ? (this.g = a.g.slice(0), this.f = a.f.slice(0), this.c = a.c) : this.reset();
    };
    sjcl2.hash.sha512.hash = function(a) {
      return new sjcl2.hash.sha512().update(a).finalize();
    };
    sjcl2.hash.sha512.prototype = { blockSize: 1024, reset: function() {
      this.g = this.o.slice(0);
      this.f = [];
      this.c = 0;
      return this;
    }, update: function(a) {
      "string" === typeof a && (a = sjcl2.codec.utf8String.toBits(a));
      var b, c = this.f = sjcl2.bitArray.concat(this.f, a);
      b = this.c;
      a = this.c = b + sjcl2.bitArray.bitLength(a);
      if (9007199254740991 < a) throw new sjcl2.exception.invalid("Cannot hash more than 2^53 - 1 bits");
      if ("undefined" !== typeof Uint32Array) {
        var d = new Uint32Array(c), e = 0;
        for (b = 1024 + b - (1024 + b & 1023); b <= a; b += 1024) this.l(d.subarray(32 * e, 32 * (e + 1))), e += 1;
        c.splice(0, 32 * e);
      } else for (b = 1024 + b - (1024 + b & 1023); b <= a; b += 1024) this.l(c.splice(0, 32));
      return this;
    }, finalize: function() {
      var a, b = this.f, c = this.g, b = sjcl2.bitArray.concat(b, [sjcl2.bitArray.partial(1, 1)]);
      for (a = b.length + 4; a & 31; a++) b.push(0);
      b.push(0);
      b.push(0);
      b.push(Math.floor(this.c / 4294967296));
      for (b.push(this.c | 0); b.length; ) this.l(b.splice(0, 32));
      this.reset();
      return c;
    }, o: [], ia: [12372232, 13281083, 9762859, 1914609, 15106769, 4090911, 4308331, 8266105], b: [], ka: [
      2666018,
      15689165,
      5061423,
      9034684,
      4764984,
      380953,
      1658779,
      7176472,
      197186,
      7368638,
      14987916,
      16757986,
      8096111,
      1480369,
      13046325,
      6891156,
      15813330,
      5187043,
      9229749,
      11312229,
      2818677,
      10937475,
      4324308,
      1135541,
      6741931,
      11809296,
      16458047,
      15666916,
      11046850,
      698149,
      229999,
      945776,
      13774844,
      2541862,
      12856045,
      9810911,
      11494366,
      7844520,
      15576806,
      8533307,
      15795044,
      4337665,
      16291729,
      5553712,
      15684120,
      6662416,
      7413802,
      12308920,
      13816008,
      4303699,
      9366425,
      10176680,
      13195875,
      4295371,
      6546291,
      11712675,
      15708924,
      1519456,
      15772530,
      6568428,
      6495784,
      8568297,
      13007125,
      7492395,
      2515356,
      12632583,
      14740254,
      7262584,
      1535930,
      13146278,
      16321966,
      1853211,
      294276,
      13051027,
      13221564,
      1051980,
      4080310,
      6651434,
      14088940,
      4675607
    ], C: function() {
      function a(a2) {
        return 4294967296 * (a2 - Math.floor(a2)) | 0;
      }
      function b(a2) {
        return 1099511627776 * (a2 - Math.floor(a2)) & 255;
      }
      for (var c = 0, d = 2, e, f; 80 > c; d++) {
        f = true;
        for (e = 2; e * e <= d; e++) if (0 === d % e) {
          f = false;
          break;
        }
        f && (8 > c && (this.o[2 * c] = a(Math.pow(d, 0.5)), this.o[2 * c + 1] = b(Math.pow(d, 0.5)) << 24 | this.ia[c]), this.b[2 * c] = a(Math.pow(d, 1 / 3)), this.b[2 * c + 1] = b(Math.pow(d, 1 / 3)) << 24 | this.ka[c], c++);
      }
    }, l: function(a) {
      var b, c, d = this.g, e = this.b, f = d[0], g = d[1], h = d[2], k = d[3], n = d[4], l = d[5], m = d[6], p = d[7], z = d[8], A = d[9], C = d[10], B = d[11], D = d[12], P = d[13], ea = d[14], Q = d[15], t;
      if ("undefined" !== typeof Uint32Array) {
        t = Array(160);
        for (var r = 0; 32 > r; r++) t[r] = a[r];
      } else t = a;
      var r = f, u = g, G = h, E = k, H = n, F = l, V = m, I = p, w = z, v = A, R = C, J = B, S = D, K = P, W = ea, L = Q;
      for (a = 0; 80 > a; a++) {
        if (16 > a) b = t[2 * a], c = t[2 * a + 1];
        else {
          c = t[2 * (a - 15)];
          var q = t[2 * (a - 15) + 1];
          b = (q << 31 | c >>> 1) ^ (q << 24 | c >>> 8) ^ c >>> 7;
          var x = (c << 31 | q >>> 1) ^ (c << 24 | q >>> 8) ^ (c << 25 | q >>> 7);
          c = t[2 * (a - 2)];
          var y = t[2 * (a - 2) + 1], q = (y << 13 | c >>> 19) ^ (c << 3 | y >>> 29) ^ c >>> 6, y = (c << 13 | y >>> 19) ^ (y << 3 | c >>> 29) ^ (c << 26 | y >>> 6), X = t[2 * (a - 7)], Y = t[2 * (a - 16)], M = t[2 * (a - 16) + 1];
          c = x + t[2 * (a - 7) + 1];
          b = b + X + (c >>> 0 < x >>> 0 ? 1 : 0);
          c += y;
          b += q + (c >>> 0 < y >>> 0 ? 1 : 0);
          c += M;
          b += Y + (c >>> 0 < M >>> 0 ? 1 : 0);
        }
        t[2 * a] = b |= 0;
        t[2 * a + 1] = c |= 0;
        var X = w & R ^ ~w & S, fa = v & J ^ ~v & K, y = r & G ^ r & H ^ G & H, ja = u & E ^ u & F ^ E & F, Y = (u << 4 | r >>> 28) ^ (r << 30 | u >>> 2) ^ (r << 25 | u >>> 7), M = (r << 4 | u >>> 28) ^ (u << 30 | r >>> 2) ^ (u << 25 | r >>> 7), ka = e[2 * a], ga = e[2 * a + 1], q = L + ((w << 18 | v >>> 14) ^ (w << 14 | v >>> 18) ^ (v << 23 | w >>> 9)), x = W + ((v << 18 | w >>> 14) ^ (v << 14 | w >>> 18) ^ (w << 23 | v >>> 9)) + (q >>> 0 < L >>> 0 ? 1 : 0), q = q + fa, x = x + (X + (q >>> 0 < fa >>> 0 ? 1 : 0)), q = q + ga, x = x + (ka + (q >>> 0 < ga >>> 0 ? 1 : 0)), q = q + c | 0, x = x + (b + (q >>> 0 < c >>> 0 ? 1 : 0));
        c = M + ja;
        b = Y + y + (c >>> 0 < M >>> 0 ? 1 : 0);
        W = S;
        L = K;
        S = R;
        K = J;
        R = w;
        J = v;
        v = I + q | 0;
        w = V + x + (v >>> 0 < I >>> 0 ? 1 : 0) | 0;
        V = H;
        I = F;
        H = G;
        F = E;
        G = r;
        E = u;
        u = q + c | 0;
        r = x + b + (u >>> 0 < q >>> 0 ? 1 : 0) | 0;
      }
      g = d[1] = g + u | 0;
      d[0] = f + r + (g >>> 0 < u >>> 0 ? 1 : 0) | 0;
      k = d[3] = k + E | 0;
      d[2] = h + G + (k >>> 0 < E >>> 0 ? 1 : 0) | 0;
      l = d[5] = l + F | 0;
      d[4] = n + H + (l >>> 0 < F >>> 0 ? 1 : 0) | 0;
      p = d[7] = p + I | 0;
      d[6] = m + V + (p >>> 0 < I >>> 0 ? 1 : 0) | 0;
      A = d[9] = A + v | 0;
      d[8] = z + w + (A >>> 0 < v >>> 0 ? 1 : 0) | 0;
      B = d[11] = B + J | 0;
      d[10] = C + R + (B >>> 0 < J >>> 0 ? 1 : 0) | 0;
      P = d[13] = P + K | 0;
      d[12] = D + S + (P >>> 0 < K >>> 0 ? 1 : 0) | 0;
      Q = d[15] = Q + L | 0;
      d[14] = ea + W + (Q >>> 0 < L >>> 0 ? 1 : 0) | 0;
    } };
    sjcl2.mode.ccm = { name: "ccm", F: [], listenProgress: function(a) {
      sjcl2.mode.ccm.F.push(a);
    }, unListenProgress: function(a) {
      a = sjcl2.mode.ccm.F.indexOf(a);
      -1 < a && sjcl2.mode.ccm.F.splice(a, 1);
    }, da: function(a) {
      var b = sjcl2.mode.ccm.F.slice(), c;
      for (c = 0; c < b.length; c += 1) b[c](a);
    }, encrypt: function(a, b, c, d, e) {
      var f, g = b.slice(0), h = sjcl2.bitArray, k = h.bitLength(c) / 8, n = h.bitLength(g) / 8;
      e = e || 64;
      d = d || [];
      if (7 > k) throw new sjcl2.exception.invalid("ccm: iv must be at least 7 bytes");
      for (f = 2; 4 > f && n >>> 8 * f; f++) ;
      f < 15 - k && (f = 15 - k);
      c = h.clamp(
        c,
        8 * (15 - f)
      );
      b = sjcl2.mode.ccm.U(a, b, c, d, e, f);
      g = sjcl2.mode.ccm.V(a, g, c, b, e, f);
      return h.concat(g.data, g.tag);
    }, decrypt: function(a, b, c, d, e) {
      e = e || 64;
      d = d || [];
      var f = sjcl2.bitArray, g = f.bitLength(c) / 8, h = f.bitLength(b), k = f.clamp(b, h - e), n = f.bitSlice(b, h - e), h = (h - e) / 8;
      if (7 > g) throw new sjcl2.exception.invalid("ccm: iv must be at least 7 bytes");
      for (b = 2; 4 > b && h >>> 8 * b; b++) ;
      b < 15 - g && (b = 15 - g);
      c = f.clamp(c, 8 * (15 - b));
      k = sjcl2.mode.ccm.V(a, k, c, n, e, b);
      a = sjcl2.mode.ccm.U(a, k.data, c, d, e, b);
      if (!f.equal(k.tag, a)) throw new sjcl2.exception.corrupt("ccm: tag doesn't match");
      return k.data;
    }, ma: function(a, b, c, d, e, f) {
      var g = [], h = sjcl2.bitArray, k = h.P;
      d = [h.partial(8, (b.length ? 64 : 0) | d - 2 << 2 | f - 1)];
      d = h.concat(d, c);
      d[3] |= e;
      d = a.encrypt(d);
      if (b.length) for (c = h.bitLength(b) / 8, 65279 >= c ? g = [h.partial(16, c)] : 4294967295 >= c && (g = h.concat([h.partial(16, 65534)], [c])), g = h.concat(g, b), b = 0; b < g.length; b += 4) d = a.encrypt(k(d, g.slice(b, b + 4).concat([0, 0, 0])));
      return d;
    }, U: function(a, b, c, d, e, f) {
      var g = sjcl2.bitArray, h = g.P;
      e /= 8;
      if (e % 2 || 4 > e || 16 < e) throw new sjcl2.exception.invalid("ccm: invalid tag length");
      if (4294967295 < d.length || 4294967295 < b.length) throw new sjcl2.exception.bug("ccm: can't deal with 4GiB or more data");
      c = sjcl2.mode.ccm.ma(a, d, c, e, g.bitLength(b) / 8, f);
      for (d = 0; d < b.length; d += 4) c = a.encrypt(h(c, b.slice(d, d + 4).concat([0, 0, 0])));
      return g.clamp(c, 8 * e);
    }, V: function(a, b, c, d, e, f) {
      var g, h = sjcl2.bitArray;
      g = h.P;
      var k = b.length, n = h.bitLength(b), l = k / 50, m = l;
      c = h.concat([h.partial(8, f - 1)], c).concat([0, 0, 0]).slice(0, 4);
      d = h.bitSlice(g(d, a.encrypt(c)), 0, e);
      if (!k) return { tag: d, data: [] };
      for (g = 0; g < k; g += 4) g > l && (sjcl2.mode.ccm.da(g / k), l += m), c[3]++, e = a.encrypt(c), b[g] ^= e[0], b[g + 1] ^= e[1], b[g + 2] ^= e[2], b[g + 3] ^= e[3];
      return { tag: d, data: h.clamp(b, n) };
    } };
    sjcl2.misc.hmac = function(a, b) {
      this.W = b = b || sjcl2.hash.sha256;
      var c = [[], []], d, e = b.prototype.blockSize / 32;
      this.B = [new b(), new b()];
      a.length > e && (a = b.hash(a));
      for (d = 0; d < e; d++) c[0][d] = a[d] ^ 909522486, c[1][d] = a[d] ^ 1549556828;
      this.B[0].update(c[0]);
      this.B[1].update(c[1]);
      this.O = new b(this.B[0]);
    };
    sjcl2.misc.hmac.prototype.encrypt = sjcl2.misc.hmac.prototype.mac = function(a) {
      if (this.Z) throw new sjcl2.exception.invalid("encrypt on already updated hmac called!");
      this.update(a);
      return this.digest(a);
    };
    sjcl2.misc.hmac.prototype.reset = function() {
      this.O = new this.W(this.B[0]);
      this.Z = false;
    };
    sjcl2.misc.hmac.prototype.update = function(a) {
      this.Z = true;
      this.O.update(a);
    };
    sjcl2.misc.hmac.prototype.digest = function() {
      var a = this.O.finalize(), a = new this.W(this.B[1]).update(a).finalize();
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
      var f, g, h, k, n = [], l = sjcl2.bitArray;
      for (k = 1; 32 * n.length < (d || 1); k++) {
        e = f = a.encrypt(l.concat(b, [k]));
        for (g = 1; g < c; g++) for (f = a.encrypt(f), h = 0; h < f.length; h++) e[h] ^= f[h];
        n = n.concat(e);
      }
      d && (n = l.clamp(n, d));
      return n;
    };
    sjcl2.prng = function(a) {
      this.h = [new sjcl2.hash.sha256()];
      this.s = [0];
      this.N = 0;
      this.G = {};
      this.M = 0;
      this.T = {};
      this.X = this.i = this.u = this.fa = 0;
      this.b = [0, 0, 0, 0, 0, 0, 0, 0];
      this.m = [0, 0, 0, 0];
      this.K = void 0;
      this.L = a;
      this.D = false;
      this.J = { progress: {}, seeded: {} };
      this.A = this.ea = 0;
      this.H = 1;
      this.I = 2;
      this.aa = 65536;
      this.R = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024];
      this.ba = 3e4;
      this.$ = 80;
    };
    sjcl2.prng.prototype = {
      randomWords: function(a, b) {
        var c = [], d;
        d = this.isReady(b);
        var e;
        if (d === this.A) throw new sjcl2.exception.notReady("generator isn't seeded");
        if (d & this.I) {
          d = !(d & this.H);
          e = [];
          var f = 0, g;
          this.X = e[0] = (/* @__PURE__ */ new Date()).valueOf() + this.ba;
          for (g = 0; 16 > g; g++) e.push(4294967296 * Math.random() | 0);
          for (g = 0; g < this.h.length && (e = e.concat(this.h[g].finalize()), f += this.s[g], this.s[g] = 0, d || !(this.N & 1 << g)); g++) ;
          this.N >= 1 << this.h.length && (this.h.push(new sjcl2.hash.sha256()), this.s.push(0));
          this.i -= f;
          f > this.u && (this.u = f);
          this.N++;
          this.b = sjcl2.hash.sha256.hash(this.b.concat(e));
          this.K = new sjcl2.cipher.aes(this.b);
          for (d = 0; 4 > d && (this.m[d] = this.m[d] + 1 | 0, !this.m[d]); d++) ;
        }
        for (d = 0; d < a; d += 4) 0 === (d + 1) % this.aa && ba(this), e = N(this), c.push(e[0], e[1], e[2], e[3]);
        ba(this);
        return c.slice(0, a);
      },
      setDefaultParanoia: function(a, b) {
        if (0 === a && "Setting paranoia=0 will ruin your security; use it only for testing" !== b) throw new sjcl2.exception.invalid("Setting paranoia=0 will ruin your security; use it only for testing");
        this.L = a;
      },
      addEntropy: function(a, b, c) {
        c = c || "user";
        var d, e, f = (/* @__PURE__ */ new Date()).valueOf(), g = this.G[c], h = this.isReady(), k = 0;
        d = this.T[c];
        void 0 === d && (d = this.T[c] = this.fa++);
        void 0 === g && (g = this.G[c] = 0);
        this.G[c] = (this.G[c] + 1) % this.h.length;
        switch (typeof a) {
          case "number":
            void 0 === b && (b = 1);
            this.h[g].update([d, this.M++, 1, b, f, 1, a | 0]);
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
              this.h[g].update([d, this.M++, 2, b, f, a.length].concat(a));
            }
            break;
          case "string":
            void 0 === b && (b = a.length);
            this.h[g].update([d, this.M++, 3, b, f, a.length]);
            this.h[g].update(a);
            break;
          default:
            k = 1;
        }
        if (k) throw new sjcl2.exception.bug("random: addEntropy only supports number, array of numbers or string");
        this.s[g] += b;
        this.i += b;
        h === this.A && (this.isReady() !== this.A && ca("seeded", Math.max(this.u, this.i)), ca("progress", this.getProgress()));
      },
      isReady: function(a) {
        a = this.R[void 0 !== a ? a : this.L];
        return this.u && this.u >= a ? this.s[0] > this.$ && (/* @__PURE__ */ new Date()).valueOf() > this.X ? this.I | this.H : this.H : this.i >= a ? this.I | this.A : this.A;
      },
      getProgress: function(a) {
        a = this.R[a ? a : this.L];
        return this.u >= a ? 1 : this.i > a ? 1 : this.i / a;
      },
      startCollectors: function() {
        if (!this.D) {
          this.a = { loadTimeCollector: O(this, this.la), mouseCollector: O(this, this.na), keyboardCollector: O(this, this.ja), accelerometerCollector: O(this, this.ca), touchCollector: O(this, this.pa) };
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
        this.J[a][this.ea++] = b;
      },
      removeEventListener: function(a, b) {
        var c, d, e = this.J[a], f = [];
        for (d in e) e.hasOwnProperty(d) && e[d] === b && f.push(d);
        for (c = 0; c < f.length; c++) d = f[c], delete e[d];
      },
      ja: function() {
        T(this, 1);
      },
      na: function(a) {
        var b, c;
        try {
          b = a.x || a.clientX || a.offsetX || 0, c = a.y || a.clientY || a.offsetY || 0;
        } catch (d) {
          c = b = 0;
        }
        0 != b && 0 != c && this.addEntropy([b, c], 2, "mouse");
        T(this, 0);
      },
      pa: function(a) {
        a = a.touches[0] || a.changedTouches[0];
        this.addEntropy([a.pageX || a.clientX, a.pageY || a.clientY], 1, "touch");
        T(this, 0);
      },
      la: function() {
        T(this, 2);
      },
      ca: function(a) {
        a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z;
        if (window.orientation) {
          var b = window.orientation;
          "number" === typeof b && this.addEntropy(b, 1, "accelerometer");
        }
        a && this.addEntropy(a, 2, "accelerometer");
        T(this, 0);
      }
    };
    function ca(a, b) {
      var c, d = sjcl2.random.J[a], e = [];
      for (c in d) d.hasOwnProperty(c) && e.push(d[c]);
      for (c = 0; c < e.length; c++) e[c](b);
    }
    function T(a, b) {
      "undefined" !== typeof window && window.performance && "function" === typeof window.performance.now ? a.addEntropy(window.performance.now(), b, "loadtime") : a.addEntropy((/* @__PURE__ */ new Date()).valueOf(), b, "loadtime");
    }
    function ba(a) {
      a.b = N(a).concat(N(a));
      a.K = new sjcl2.cipher.aes(a.b);
    }
    function N(a) {
      for (var b = 0; 4 > b && (a.m[b] = a.m[b] + 1 | 0, !a.m[b]); b++) ;
      return a.K.encrypt(a.m);
    }
    function O(a, b) {
      return function() {
        b.apply(a, arguments);
      };
    }
    sjcl2.random = new sjcl2.prng(6);
    a: try {
      if (ha = "undefined" !== typeof module && module.exports) {
        try {
          ia = __require("crypto");
        } catch (a) {
          ia = null;
        }
        ha = da = ia;
      }
      if (ha && da.randomBytes) U = da.randomBytes(128), U = new Uint32Array(new Uint8Array(U).buffer), sjcl2.random.addEntropy(U, 1024, "crypto['randomBytes']");
      else if ("undefined" !== typeof window && "undefined" !== typeof Uint32Array) {
        Z = new Uint32Array(32);
        if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(Z);
        else if (window.msCrypto && window.msCrypto.getRandomValues) window.msCrypto.getRandomValues(Z);
        else break a;
        sjcl2.random.addEntropy(Z, 1024, "crypto['getRandomValues']");
      }
    } catch (a) {
      "undefined" !== typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(a));
    }
    var U;
    var da;
    var Z;
    var ha;
    var ia;
    sjcl2.json = { defaults: { v: 1, iter: 1e4, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes" }, ha: function(a, b, c, d) {
      c = c || {};
      d = d || {};
      var e = sjcl2.json, f = e.j({ iv: sjcl2.random.randomWords(4, 0) }, e.defaults), g;
      e.j(f, c);
      c = f.adata;
      "string" === typeof f.salt && (f.salt = sjcl2.codec.base64.toBits(f.salt));
      "string" === typeof f.iv && (f.iv = sjcl2.codec.base64.toBits(f.iv));
      if (!sjcl2.mode[f.mode] || !sjcl2.cipher[f.cipher] || "string" === typeof a && 100 >= f.iter || 64 !== f.ts && 96 !== f.ts && 128 !== f.ts || 128 !== f.ks && 192 !== f.ks && 256 !== f.ks || 2 > f.iv.length || 4 < f.iv.length) throw new sjcl2.exception.invalid("json encrypt: invalid parameters");
      "string" === typeof a ? (g = sjcl2.misc.cachedPbkdf2(a, f), a = g.key.slice(0, f.ks / 32), f.salt = g.salt) : sjcl2.ecc && a instanceof sjcl2.ecc.elGamal.publicKey && (g = a.kem(), f.kemtag = g.tag, a = g.key.slice(0, f.ks / 32));
      "string" === typeof b && (b = sjcl2.codec.utf8String.toBits(b));
      "string" === typeof c && (f.adata = c = sjcl2.codec.utf8String.toBits(c));
      g = new sjcl2.cipher[f.cipher](a);
      e.j(d, f);
      d.key = a;
      f.ct = "ccm" === f.mode && sjcl2.arrayBuffer && sjcl2.arrayBuffer.ccm && b instanceof ArrayBuffer ? sjcl2.arrayBuffer.ccm.encrypt(g, b, f.iv, c, f.ts) : sjcl2.mode[f.mode].encrypt(g, b, f.iv, c, f.ts);
      return f;
    }, encrypt: function(a, b, c, d) {
      var e = sjcl2.json, f = e.ha.apply(e, arguments);
      return e.encode(f);
    }, ga: function(a, b, c, d) {
      c = c || {};
      d = d || {};
      var e = sjcl2.json;
      b = e.j(e.j(e.j({}, e.defaults), b), c, true);
      var f, g;
      f = b.adata;
      "string" === typeof b.salt && (b.salt = sjcl2.codec.base64.toBits(b.salt));
      "string" === typeof b.iv && (b.iv = sjcl2.codec.base64.toBits(b.iv));
      if (!sjcl2.mode[b.mode] || !sjcl2.cipher[b.cipher] || "string" === typeof a && 100 >= b.iter || 64 !== b.ts && 96 !== b.ts && 128 !== b.ts || 128 !== b.ks && 192 !== b.ks && 256 !== b.ks || !b.iv || 2 > b.iv.length || 4 < b.iv.length) throw new sjcl2.exception.invalid("json decrypt: invalid parameters");
      "string" === typeof a ? (g = sjcl2.misc.cachedPbkdf2(a, b), a = g.key.slice(0, b.ks / 32), b.salt = g.salt) : sjcl2.ecc && a instanceof sjcl2.ecc.elGamal.secretKey && (a = a.unkem(sjcl2.codec.base64.toBits(b.kemtag)).slice(0, b.ks / 32));
      "string" === typeof f && (f = sjcl2.codec.utf8String.toBits(f));
      g = new sjcl2.cipher[b.cipher](a);
      f = "ccm" === b.mode && sjcl2.arrayBuffer && sjcl2.arrayBuffer.ccm && b.ct instanceof ArrayBuffer ? sjcl2.arrayBuffer.ccm.decrypt(g, b.ct, b.iv, b.tag, f, b.ts) : sjcl2.mode[b.mode].decrypt(g, b.ct, b.iv, f, b.ts);
      e.j(d, b);
      d.key = a;
      return 1 === c.raw ? f : sjcl2.codec.utf8String.fromBits(f);
    }, decrypt: function(a, b, c, d) {
      var e = sjcl2.json;
      return e.ga(a, e.decode(b), c, d);
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
    }, j: function(a, b, c) {
      void 0 === a && (a = {});
      if (void 0 === b) return a;
      for (var d in b) if (b.hasOwnProperty(d)) {
        if (c && void 0 !== a[d] && a[d] !== b[d]) throw new sjcl2.exception.invalid("required parameter overridden");
        a[d] = b[d];
      }
      return a;
    }, ra: function(a, b) {
      var c = {}, d;
      for (d in a) a.hasOwnProperty(d) && a[d] !== b[d] && (c[d] = a[d]);
      return c;
    }, qa: function(a, b) {
      var c = {}, d;
      for (d = 0; d < b.length; d++) void 0 !== a[b[d]] && (c[b[d]] = a[b[d]]);
      return c;
    } };
    sjcl2.encrypt = sjcl2.json.encrypt;
    sjcl2.decrypt = sjcl2.json.decrypt;
    sjcl2.misc.oa = {};
    sjcl2.misc.cachedPbkdf2 = function(a, b) {
      var c = sjcl2.misc.oa, d;
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
var isDenoRuntime = () => typeof Deno !== "undefined";
var workerUrl = (relativePath) => {
  return isDenoRuntime() ? new URL(`./worker/${relativePath}.ts`, new URL(".", import.meta.url).href) : new URL(
    import.meta.resolve(
      `./${relativePath !== "encrypt" ? `worker/${relativePath}` : relativePath}.js`
    )
  );
};

// src/worker/shared.ts
var import_events = __toESM(require_events());
var events = new import_events.default();
var updateFile = (lufiFile2, args) => {
  Object.assign(lufiFile2, args);
  if (typeof WorkerGlobalScope !== "undefined") {
    self.postMessage({
      event: "FILE_UPDATED" /* FILE_UPDATED */,
      lufiFile: lufiFile2
    });
  }
  return lufiFile2;
};
var sendFileError = (lufiFile2, error) => {
  updateFile(lufiFile2, { uploadStatus: 2 /* FAILED */ });
  self.postMessage({ event: "OPERATION_FAILED" /* OPERATION_FAILED */, error });
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
function Encode(ab) {
  return obj.Encode(ab);
}
function Decode(str) {
  return obj.Decode(str);
}

// node_modules/.deno/arraybuffer-encoding@1.1.0/node_modules/arraybuffer-encoding/dist/esm/base64/url.js
var obj2 = new Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", true);
function Decode2(str) {
  return obj2.Decode(str);
}

// src/api/crypto/sjcl.ts
var import_lufi_sjcl = __toESM(require_sjcl());

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

// src/error/crypto/encryption-error.ts
var EncryptionError = class extends CryptoError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "Unable to encrypt the provided data");
  }
};

// src/api/crypto/sjcl.ts
var decrypt = (key, encryptedData) => {
  try {
    const data = typeof encryptedData === "string" ? encryptedData : new TextDecoder().decode(encryptedData.data);
    return okAsync(Decode(import_lufi_sjcl.default.decrypt(key, data)));
  } catch (error) {
    return errAsync(
      new DecryptionError(void 0, { cause: ensureError(error) })
    );
  }
};
var encrypt = (key, value) => {
  try {
    const encrypted = import_lufi_sjcl.default.encrypt(key, Encode(value));
    return okAsync({
      algo: 0 /* Sjcl */,
      data: new TextEncoder().encode(encrypted).buffer,
      iv: JSON.parse(encrypted).iv
    });
  } catch (error) {
    return errAsync(
      new EncryptionError(void 0, { cause: ensureError(error) })
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
        encrypted.data
      ),
      (error) => new DecryptionError(void 0, { cause: ensureError(error) })
    )
  );
};
var encrypt2 = (key, value) => {
  return importKey(key).andThen((importedKey) => {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    return ResultAsync.fromPromise(
      crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv
        },
        importedKey,
        value
      ),
      (error) => new EncryptionError(void 0, {
        cause: ensureError(error)
      })
    ).andThen((encrypted) => {
      return okAsync({
        algo: 1 /* WebCrypto */,
        data: encrypted,
        iv
      });
    });
  });
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
var decrypt3 = (key, value) => value.algo === void 0 || value.algo === 0 /* Sjcl */ ? decrypt(key, value) : decrypt2(key, value);
var encrypt3 = (key, value, algo) => algo === 0 /* Sjcl */ ? encrypt(key, value) : encrypt2(key, value);

// src/api/websocket.ts
var sockets = {};
var MAX_ERRORS = 5;
var onCancelMessage = (data) => {
  events.emit("UPLOAD_CANCELLED" /* UPLOAD_CANCELLED */, data.success);
  return okAsync(void 0);
};
var onDownloadMessage = (response, lufiFile2) => {
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
          encryptedData.data = Decode(encryptedData.data);
        }
        return decrypt3(lufiFile2.keys.client, encryptedData).andThen(
          (decryptedPart) => {
            const buffer = typeof decryptedPart === "string" ? new TextEncoder().encode(decryptedPart).buffer : decryptedPart;
            if (metadata.part === 0) {
              updateFile(lufiFile2, {
                chunksReady: lufiFile2.chunksReady + 1,
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
              updateFile(lufiFile2, { chunksReady: lufiFile2.chunksReady + 1 });
            }
            events.emit("CHUNK_DOWNLOADED" /* CHUNK_DOWNLOADED */, buffer, metadata.part);
            if (lufiFile2.chunksReady === metadata.total) {
              return endDownload(lufiFile2).andThen(() => {
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
          "Cannot retrieve metadata from data received by the server"
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
      "Cannot retrieve metadata from data received by the server"
    );
    events.emit("OPERATION_FAILED" /* OPERATION_FAILED */, error);
    return errAsync(error);
  }
};
var onUploadMessage = (response, lufiFile2) => {
  if (response.success) {
    if (response.j === 0) {
      updateFile(lufiFile2, {
        keys: { client: lufiFile2.keys.client, server: response.short },
        actionToken: response.token,
        queueIndex: response.i
      });
      events.emit("UPLOAD_STARTED" /* UPLOAD_STARTED */);
    }
    updateFile(lufiFile2, {
      chunksReady: lufiFile2.chunksReady + 1,
      createdAt: response.created_at
    });
    events.emit("CHUNK_UPLOADED" /* CHUNK_UPLOADED */);
    if (lufiFile2.chunksReady === lufiFile2.totalChunks) {
      updateFile(lufiFile2, { uploadStatus: 1 /* COMPLETE */ });
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
var onMessage = (e, lufiFile2) => {
  const data = tryParseJson(e.data);
  let callback;
  if (data) {
    if (!data.action && data.msg) {
      const error = new WebSocketError(data.msg);
      events.emit("OPERATION_FAILED" /* OPERATION_FAILED */, error);
      return errAsync(error);
    } else {
      if ("delay" in data) {
        callback = onUploadMessage(data, lufiFile2);
      } else {
        callback = onCancelMessage(data);
      }
    }
  } else {
    callback = onDownloadMessage(e.data, lufiFile2);
  }
  return callback;
};
var isConnecting = (socketKey) => sockets !== void 0 && sockets[socketKey] !== void 0 && sockets[socketKey].readyState === WebSocket.CONNECTING;
var isSpawned = (socketKey) => sockets !== void 0 && sockets[socketKey] !== void 0 && sockets[socketKey].readyState === WebSocket.OPEN;
var endDownload = (lufiFile2) => {
  let message;
  if (lufiFile2.password) {
    message = { ended: true, file_pwd: lufiFile2.password };
  } else {
    message = { ended: true };
  }
  return sendMessage(
    downloadSocketUrl(lufiFile2),
    lufiFile2,
    JSON.stringify(message)
  );
};
var uploadChunk = (lufiFile2, metadata, encryptedData) => {
  encryptedData.data = Encode(encryptedData.data);
  return sendMessage(
    uploadSocketUrl(lufiFile2),
    lufiFile2,
    `${JSON.stringify(metadata)}XXMOJOXX${JSON.stringify(encryptedData)}`
  );
};
var sendMessage = (socketUrl, lufiFile2, message) => {
  if (!isSpawned(socketUrl)) {
    return spawn(socketUrl).andThen(() => {
      sockets[socketUrl].onmessage = (e) => onMessage(e, lufiFile2);
      return sendMessage(socketUrl, lufiFile2, message);
    });
  } else {
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
    sockets[socketKey].onerror = (event) => {
      if (++errorCount <= MAX_ERRORS) {
        console.error(
          `An error happened while trying to connect to WebSocket "${socketKey}". Trying again. ${errorCount} / ${MAX_ERRORS}`,
          event.error
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
  if (!["ws:", "wss:"].includes(url.protocol)) {
    url.protocol = url.protocol === "http:" ? "ws:" : "wss:";
  }
  url.pathname += pathname;
  return new URL(url.origin + url.pathname);
};
var downloadSocketUrl = (lufiFile2) => {
  return buildSocketUrl(
    new URL(lufiFile2.serverUrl),
    "download" /* DOWNLOAD */ + `/${lufiFile2.keys.server}`
  ).toString();
};
var uploadSocketUrl = (lufiFile2) => {
  return buildSocketUrl(new URL(lufiFile2.serverUrl), "upload" /* UPLOAD */).toString();
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
var isServerDownloadChunkSuccessMetadata = (message) => typeof message === "object" && message !== null && !("msg" in message);

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

// src/error/worker/worker-error.ts
var WorkerError = class extends BaseError {
};

// src/error/worker/worker-undefined-parameter-error.ts
var WorkerUndefinedParameterError = class extends WorkerError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "Parameter must be defined");
  }
};

// src/worker/upload.ts
var isInitialized = false;
var QUEUE_CONCURRENCY_LIMIT = navigator.hardwareConcurrency || 1;
var queue = new PQueue({
  concurrency: QUEUE_CONCURRENCY_LIMIT,
  autoStart: false
});
var itemsInQueue = 0;
var isPaused = false;
var lufiFile;
var encryptJob = new Worker(workerUrl("encrypt"), { type: "module" });
self.onmessage = (event) => {
  if (!isInitialized) {
    init();
    isInitialized = true;
    lufiFile = event.data.args.lufiFile;
    events.once("UPLOAD_STARTED" /* UPLOAD_STARTED */, () => {
      self.postMessage({ event: "UPLOAD_STARTED" /* UPLOAD_STARTED */ });
    });
    events.on("CHUNK_UPLOADED" /* CHUNK_UPLOADED */, () => {
      self.postMessage({ event: "CHUNK_UPLOADED" /* CHUNK_UPLOADED */ });
      itemsInQueue--;
      if (queue.isPaused && !isPaused && itemsInQueue < QUEUE_CONCURRENCY_LIMIT) {
        resumeQueue();
      }
    });
    events.once("UPLOAD_COMPLETE" /* UPLOAD_COMPLETE */, () => {
      self.postMessage({
        event: "UPLOAD_COMPLETE" /* UPLOAD_COMPLETE */
      });
    });
    events.on("FILE_UPDATED" /* FILE_UPDATED */, updateFile);
  }
  if (event.data.args.chunk) {
    event.data.args.lufiFile = lufiFile;
    return startUpload(
      event.data,
      getFileIndexInQueue(lufiFile.keys.client)
    ).mapErr((error) => {
      sendFileError(lufiFile, error);
    });
  } else {
    if (event.data.action === 0 /* PAUSE */) {
      isPaused = true;
      pauseQueue();
    } else if (event.data.action === 2 /* RESUME */) {
      isPaused = false;
      resumeQueue();
    } else {
      sendFileError(lufiFile, new WorkerUndefinedParameterError());
    }
  }
};
var startUpload = (workerMessage, serverQueueIndex) => {
  const { lufiFile: lufiFile2, algo } = workerMessage.args;
  if (workerMessage.args.chunk !== void 0 && algo !== void 0) {
    if (workerMessage.args.chunk.index === 0) {
      encrypt3(lufiFile2.keys.client, workerMessage.args.chunk.buffer, algo).map(
        (encryptedData) => {
          uploadChunk(
            lufiFile2,
            {
              total: lufiFile2.totalChunks,
              part: 0,
              size: lufiFile2.size,
              name: lufiFile2.name,
              type: lufiFile2.type,
              delay: lufiFile2.delay,
              del_at_first_view: lufiFile2.delAtFirstView,
              zipped: lufiFile2.zipped,
              id: null,
              i: serverQueueIndex,
              file_pwd: lufiFile2.password
            },
            encryptedData
          );
          itemsInQueue++;
        }
      );
    } else {
      queue.add(() => {
        if (workerMessage.args.chunk) {
          const waitForEncryption = () => {
            itemsInQueue++;
            return new Promise((resolve) => {
              encryptJob.onmessage = (event) => {
                resolve(uploadChunk(
                  lufiFile2,
                  {
                    total: lufiFile2.totalChunks,
                    part: event.data.chunkIndex,
                    size: lufiFile2.size,
                    name: lufiFile2.name,
                    type: lufiFile2.type,
                    delay: lufiFile2.delay,
                    del_at_first_view: lufiFile2.delAtFirstView,
                    zipped: lufiFile2.zipped,
                    id: lufiFile2.keys.server,
                    i: serverQueueIndex,
                    file_pwd: lufiFile2.password
                  },
                  event.data.encryptedData
                ));
              };
            });
          };
          encryptJob.postMessage(workerMessage, [
            workerMessage.args.chunk.buffer
          ]);
          if (!queue.isPaused && (isPaused || itemsInQueue === QUEUE_CONCURRENCY_LIMIT)) {
            pauseQueue();
          }
          waitForEncryption();
        }
      });
    }
  } else {
    return errAsync(
      new WorkerUndefinedParameterError()
    );
  }
  return okAsync(void 0);
};
var pauseQueue = () => {
  queue.pause();
  self.postMessage({ event: "JOB_PAUSED" /* JOB_PAUSED */ });
};
var resumeQueue = () => {
  queue.start();
  self.postMessage({ event: "JOB_RESUMED" /* JOB_RESUMED */ });
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vbHVmaS1zamNsQDEuMC44L25vZGVfbW9kdWxlcy9sdWZpLXNqY2wvc2pjbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vZXZlbnRlbWl0dGVyM0A1LjAuMS9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vbmV2ZXJ0aHJvd0A4LjEuMS9ub2RlX21vZHVsZXMvbmV2ZXJ0aHJvdy9kaXN0L2luZGV4LmVzLmpzIiwgIi4uLy4uL3NyYy9lcnJvci9iYXNlLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWNvbm5lY3Rpb24tZXJyb3IudHMiLCAiLi4vLi4vc3JjL3V0aWxzLnRzIiwgIi4uLy4uL3NyYy93b3JrZXIvc2hhcmVkLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9hcnJheWJ1ZmZlci1lbmNvZGluZ0AxLjEuMC9ub2RlX21vZHVsZXMvYXJyYXlidWZmZXItZW5jb2Rpbmcvc3JjL2Jhc2U2NC9lbmNvZGluZy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vYXJyYXlidWZmZXItZW5jb2RpbmdAMS4xLjAvbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLWVuY29kaW5nL3NyYy9iYXNlNjQvc3RhbmRhcmQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2FycmF5YnVmZmVyLWVuY29kaW5nQDEuMS4wL25vZGVfbW9kdWxlcy9hcnJheWJ1ZmZlci1lbmNvZGluZy9zcmMvYmFzZTY0L3VybC50cyIsICIuLi8uLi9zcmMvYXBpL2NyeXB0by9zamNsLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vZGVjcnlwdGlvbi1lcnJvci50cyIsICIuLi8uLi9zcmMvZXJyb3IvY3J5cHRvL2VuY3J5cHRpb24tZXJyb3IudHMiLCAiLi4vLi4vc3JjL2FwaS9jcnlwdG8vd2ViLnRzIiwgIi4uLy4uL3NyYy9hcGkvY3J5cHRvLnRzIiwgIi4uLy4uL3NyYy9hcGkvd2Vic29ja2V0LnRzIiwgIi4uLy4uL3NyYy9hcGkvbHVmaS50cyIsICIuLi8uLi9zcmMvZW50aXRpZXMvbHVmaS1qb2IudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50ZW1pdHRlcjNANS4wLjEvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXgubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9wLXRpbWVvdXRANi4xLjMvbm9kZV9tb2R1bGVzL3AtdGltZW91dC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vcC1xdWV1ZUA4LjAuMS9ub2RlX21vZHVsZXMvcC1xdWV1ZS9kaXN0L2xvd2VyLWJvdW5kLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9wLXF1ZXVlQDguMC4xL25vZGVfbW9kdWxlcy9wLXF1ZXVlL2Rpc3QvcHJpb3JpdHktcXVldWUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL3AtcXVldWVAOC4wLjEvbm9kZV9tb2R1bGVzL3AtcXVldWUvZGlzdC9pbmRleC5qcyIsICIuLi8uLi9zcmMvZXJyb3Ivd29ya2VyL3dvcmtlci1lcnJvci50cyIsICIuLi8uLi9zcmMvZXJyb3Ivd29ya2VyL3dvcmtlci11bmRlZmluZWQtcGFyYW1ldGVyLWVycm9yLnRzIiwgIi4uLy4uL3NyYy93b3JrZXIvdXBsb2FkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwgIlwidXNlIHN0cmljdFwiO3ZhciBzamNsPXtjaXBoZXI6e30saGFzaDp7fSxrZXlleGNoYW5nZTp7fSxtb2RlOnt9LG1pc2M6e30sY29kZWM6e30sZXhjZXB0aW9uOntjb3JydXB0OmZ1bmN0aW9uKGEpe3RoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIkNPUlJVUFQ6IFwiK3RoaXMubWVzc2FnZX07dGhpcy5tZXNzYWdlPWF9LGludmFsaWQ6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiSU5WQUxJRDogXCIrdGhpcy5tZXNzYWdlfTt0aGlzLm1lc3NhZ2U9YX0sYnVnOmZ1bmN0aW9uKGEpe3RoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIkJVRzogXCIrdGhpcy5tZXNzYWdlfTt0aGlzLm1lc3NhZ2U9YX0sbm90UmVhZHk6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiTk9UIFJFQURZOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfX19O1xuc2pjbC5jaXBoZXIuYWVzPWZ1bmN0aW9uKGEpe3RoaXMud1swXVswXVswXXx8dGhpcy5DKCk7dmFyIGIsYyxkLGUsZj10aGlzLndbMF1bNF0sZz10aGlzLndbMV07Yj1hLmxlbmd0aDt2YXIgaD0xO2lmKDQhPT1iJiY2IT09YiYmOCE9PWIpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJpbnZhbGlkIGFlcyBrZXkgc2l6ZVwiKTt0aGlzLmI9W2Q9YS5zbGljZSgwKSxlPVtdXTtmb3IoYT1iO2E8NCpiKzI4O2ErKyl7Yz1kW2EtMV07aWYoMD09PWElYnx8OD09PWImJjQ9PT1hJWIpYz1mW2M+Pj4yNF08PDI0XmZbYz4+MTYmMjU1XTw8MTZeZltjPj44JjI1NV08PDheZltjJjI1NV0sMD09PWElYiYmKGM9Yzw8OF5jPj4+MjReaDw8MjQsaD1oPDwxXjI4MyooaD4+NykpO2RbYV09ZFthLWJdXmN9Zm9yKGI9MDthO2IrKyxhLS0pYz1kW2ImMz9hOmEtNF0sZVtiXT00Pj1hfHw0PmI/YzpnWzBdW2ZbYz4+PjI0XV1eZ1sxXVtmW2M+PjE2JjI1NV1dXmdbMl1bZltjPj44JjI1NV1dXmdbM11bZltjJlxuMjU1XV19O1xuc2pjbC5jaXBoZXIuYWVzLnByb3RvdHlwZT17ZW5jcnlwdDpmdW5jdGlvbihhKXtyZXR1cm4gYWEodGhpcyxhLDApfSxkZWNyeXB0OmZ1bmN0aW9uKGEpe3JldHVybiBhYSh0aGlzLGEsMSl9LHc6W1tbXSxbXSxbXSxbXSxbXV0sW1tdLFtdLFtdLFtdLFtdXV0sQzpmdW5jdGlvbigpe3ZhciBhPXRoaXMud1swXSxiPXRoaXMud1sxXSxjPWFbNF0sZD1iWzRdLGUsZixnLGg9W10saz1bXSxuLGwsbSxwO2ZvcihlPTA7MHgxMDA+ZTtlKyspa1soaFtlXT1lPDwxXjI4MyooZT4+NykpXmVdPWU7Zm9yKGY9Zz0wOyFjW2ZdO2ZePW58fDEsZz1rW2ddfHwxKWZvcihtPWdeZzw8MV5nPDwyXmc8PDNeZzw8NCxtPW0+PjhebSYyNTVeOTksY1tmXT1tLGRbbV09ZixsPWhbZT1oW249aFtmXV1dLHA9MHgxMDEwMTAxKmxeMHgxMDAwMSplXjB4MTAxKm5eMHgxMDEwMTAwKmYsbD0weDEwMSpoW21dXjB4MTAxMDEwMCptLGU9MDs0PmU7ZSsrKWFbZV1bZl09bD1sPDwyNF5sPj4+OCxiW2VdW21dPXA9cDw8MjRecD4+Pjg7Zm9yKGU9XG4wOzU+ZTtlKyspYVtlXT1hW2VdLnNsaWNlKDApLGJbZV09YltlXS5zbGljZSgwKX19O1xuZnVuY3Rpb24gYWEoYSxiLGMpe2lmKDQhPT1iLmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImludmFsaWQgYWVzIGJsb2NrIHNpemVcIik7dmFyIGQ9YS5iW2NdLGU9YlswXV5kWzBdLGY9YltjPzM6MV1eZFsxXSxnPWJbMl1eZFsyXTtiPWJbYz8xOjNdXmRbM107dmFyIGgsayxuLGw9ZC5sZW5ndGgvNC0yLG0scD00LHo9WzAsMCwwLDBdO2g9YS53W2NdO2E9aFswXTt2YXIgQT1oWzFdLEM9aFsyXSxCPWhbM10sRD1oWzRdO2ZvcihtPTA7bTxsO20rKyloPWFbZT4+PjI0XV5BW2Y+PjE2JjI1NV1eQ1tnPj44JjI1NV1eQltiJjI1NV1eZFtwXSxrPWFbZj4+PjI0XV5BW2c+PjE2JjI1NV1eQ1tiPj44JjI1NV1eQltlJjI1NV1eZFtwKzFdLG49YVtnPj4+MjRdXkFbYj4+MTYmMjU1XV5DW2U+PjgmMjU1XV5CW2YmMjU1XV5kW3ArMl0sYj1hW2I+Pj4yNF1eQVtlPj4xNiYyNTVdXkNbZj4+OCYyNTVdXkJbZyYyNTVdXmRbcCszXSxwKz00LGU9aCxmPWssZz1uO2ZvcihtPVxuMDs0Pm07bSsrKXpbYz8zJi1tOm1dPURbZT4+PjI0XTw8MjReRFtmPj4xNiYyNTVdPDwxNl5EW2c+PjgmMjU1XTw8OF5EW2ImMjU1XV5kW3ArK10saD1lLGU9ZixmPWcsZz1iLGI9aDtyZXR1cm4gen1cbnNqY2wuYml0QXJyYXk9e2JpdFNsaWNlOmZ1bmN0aW9uKGEsYixjKXthPXNqY2wuYml0QXJyYXkuWShhLnNsaWNlKGIvMzIpLDMyLShiJjMxKSkuc2xpY2UoMSk7cmV0dXJuIHZvaWQgMD09PWM/YTpzamNsLmJpdEFycmF5LmNsYW1wKGEsYy1iKX0sZXh0cmFjdDpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9TWF0aC5mbG9vcigtYi1jJjMxKTtyZXR1cm4oKGIrYy0xXmIpJi0zMj9hW2IvMzJ8MF08PDMyLWReYVtiLzMyKzF8MF0+Pj5kOmFbYi8zMnwwXT4+PmQpJigxPDxjKS0xfSxjb25jYXQ6ZnVuY3Rpb24oYSxiKXtpZigwPT09YS5sZW5ndGh8fDA9PT1iLmxlbmd0aClyZXR1cm4gYS5jb25jYXQoYik7dmFyIGM9YVthLmxlbmd0aC0xXSxkPXNqY2wuYml0QXJyYXkuZ2V0UGFydGlhbChjKTtyZXR1cm4gMzI9PT1kP2EuY29uY2F0KGIpOnNqY2wuYml0QXJyYXkuWShiLGQsY3wwLGEuc2xpY2UoMCxhLmxlbmd0aC0xKSl9LGJpdExlbmd0aDpmdW5jdGlvbihhKXt2YXIgYj1hLmxlbmd0aDtyZXR1cm4gMD09PVxuYj8wOjMyKihiLTEpK3NqY2wuYml0QXJyYXkuZ2V0UGFydGlhbChhW2ItMV0pfSxjbGFtcDpmdW5jdGlvbihhLGIpe2lmKDMyKmEubGVuZ3RoPGIpcmV0dXJuIGE7YT1hLnNsaWNlKDAsTWF0aC5jZWlsKGIvMzIpKTt2YXIgYz1hLmxlbmd0aDtiPWImMzE7MDxjJiZiJiYoYVtjLTFdPXNqY2wuYml0QXJyYXkucGFydGlhbChiLGFbYy0xXSYyMTQ3NDgzNjQ4Pj5iLTEsMSkpO3JldHVybiBhfSxwYXJ0aWFsOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gMzI9PT1hP2I6KGM/YnwwOmI8PDMyLWEpKzB4MTAwMDAwMDAwMDAqYX0sZ2V0UGFydGlhbDpmdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5yb3VuZChhLzB4MTAwMDAwMDAwMDApfHwzMn0sZXF1YWw6ZnVuY3Rpb24oYSxiKXtpZihzamNsLmJpdEFycmF5LmJpdExlbmd0aChhKSE9PXNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGIpKXJldHVybiExO3ZhciBjPTAsZDtmb3IoZD0wO2Q8YS5sZW5ndGg7ZCsrKWN8PWFbZF1eYltkXTtyZXR1cm4gMD09PVxuY30sWTpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZTtlPTA7Zm9yKHZvaWQgMD09PWQmJihkPVtdKTszMjw9YjtiLT0zMilkLnB1c2goYyksYz0wO2lmKDA9PT1iKXJldHVybiBkLmNvbmNhdChhKTtmb3IoZT0wO2U8YS5sZW5ndGg7ZSsrKWQucHVzaChjfGFbZV0+Pj5iKSxjPWFbZV08PDMyLWI7ZT1hLmxlbmd0aD9hW2EubGVuZ3RoLTFdOjA7YT1zamNsLmJpdEFycmF5LmdldFBhcnRpYWwoZSk7ZC5wdXNoKHNqY2wuYml0QXJyYXkucGFydGlhbChiK2EmMzEsMzI8YithP2M6ZC5wb3AoKSwxKSk7cmV0dXJuIGR9LFA6ZnVuY3Rpb24oYSxiKXtyZXR1cm5bYVswXV5iWzBdLGFbMV1eYlsxXSxhWzJdXmJbMl0sYVszXV5iWzNdXX0sYnl0ZXN3YXBNOmZ1bmN0aW9uKGEpe3ZhciBiLGM7Zm9yKGI9MDtiPGEubGVuZ3RoOysrYiljPWFbYl0sYVtiXT1jPj4+MjR8Yz4+PjgmMHhmZjAwfChjJjB4ZmYwMCk8PDh8Yzw8MjQ7cmV0dXJuIGF9fTtcbnNqY2wuY29kZWMudXRmOFN0cmluZz17ZnJvbUJpdHM6ZnVuY3Rpb24oYSl7dmFyIGI9XCJcIixjPXNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpLGQsZTtmb3IoZD0wO2Q8Yy84O2QrKykwPT09KGQmMykmJihlPWFbZC80XSksYis9U3RyaW5nLmZyb21DaGFyQ29kZShlPj4+OD4+Pjg+Pj44KSxlPDw9ODtyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShiKSl9LHRvQml0czpmdW5jdGlvbihhKXthPXVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhKSk7dmFyIGI9W10sYyxkPTA7Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKylkPWQ8PDh8YS5jaGFyQ29kZUF0KGMpLDM9PT0oYyYzKSYmKGIucHVzaChkKSxkPTApO2MmMyYmYi5wdXNoKHNqY2wuYml0QXJyYXkucGFydGlhbCg4KihjJjMpLGQpKTtyZXR1cm4gYn19O1xuc2pjbC5jb2RlYy5oZXg9e2Zyb21CaXRzOmZ1bmN0aW9uKGEpe3ZhciBiPVwiXCIsYztmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWIrPSgoYVtjXXwwKSsweGYwMDAwMDAwMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cig0KTtyZXR1cm4gYi5zdWJzdHIoMCxzamNsLmJpdEFycmF5LmJpdExlbmd0aChhKS80KX0sdG9CaXRzOmZ1bmN0aW9uKGEpe3ZhciBiLGM9W10sZDthPWEucmVwbGFjZSgvXFxzfDB4L2csXCJcIik7ZD1hLmxlbmd0aDthPWErXCIwMDAwMDAwMFwiO2ZvcihiPTA7YjxhLmxlbmd0aDtiKz04KWMucHVzaChwYXJzZUludChhLnN1YnN0cihiLDgpLDE2KV4wKTtyZXR1cm4gc2pjbC5iaXRBcnJheS5jbGFtcChjLDQqZCl9fTtcbnNqY2wuY29kZWMuYmFzZTY0PXtTOlwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLGZyb21CaXRzOmZ1bmN0aW9uKGEsYixjKXt2YXIgZD1cIlwiLGU9MCxmPXNqY2wuY29kZWMuYmFzZTY0LlMsZz0wLGg9c2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSk7YyYmKGY9Zi5zdWJzdHIoMCw2MikrXCItX1wiKTtmb3IoYz0wOzYqZC5sZW5ndGg8aDspZCs9Zi5jaGFyQXQoKGdeYVtjXT4+PmUpPj4+MjYpLDY+ZT8oZz1hW2NdPDw2LWUsZSs9MjYsYysrKTooZzw8PTYsZS09Nik7Zm9yKDtkLmxlbmd0aCYzJiYhYjspZCs9XCI9XCI7cmV0dXJuIGR9LHRvQml0czpmdW5jdGlvbihhLGIpe2E9YS5yZXBsYWNlKC9cXHN8PS9nLFwiXCIpO3ZhciBjPVtdLGQsZT0wLGY9c2pjbC5jb2RlYy5iYXNlNjQuUyxnPTAsaDtiJiYoZj1mLnN1YnN0cigwLDYyKStcIi1fXCIpO2ZvcihkPTA7ZDxhLmxlbmd0aDtkKyspe2g9Zi5pbmRleE9mKGEuY2hhckF0KGQpKTtcbmlmKDA+aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcInRoaXMgaXNuJ3QgYmFzZTY0IVwiKTsyNjxlPyhlLT0yNixjLnB1c2goZ15oPj4+ZSksZz1oPDwzMi1lKTooZSs9NixnXj1oPDwzMi1lKX1lJjU2JiZjLnB1c2goc2pjbC5iaXRBcnJheS5wYXJ0aWFsKGUmNTYsZywxKSk7cmV0dXJuIGN9fTtzamNsLmNvZGVjLmJhc2U2NHVybD17ZnJvbUJpdHM6ZnVuY3Rpb24oYSl7cmV0dXJuIHNqY2wuY29kZWMuYmFzZTY0LmZyb21CaXRzKGEsMSwxKX0sdG9CaXRzOmZ1bmN0aW9uKGEpe3JldHVybiBzamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYSwxKX19O3NqY2wuaGFzaC5zaGEyNTY9ZnVuY3Rpb24oYSl7dGhpcy5iWzBdfHx0aGlzLkMoKTthPyh0aGlzLmc9YS5nLnNsaWNlKDApLHRoaXMuZj1hLmYuc2xpY2UoMCksdGhpcy5jPWEuYyk6dGhpcy5yZXNldCgpfTtzamNsLmhhc2guc2hhMjU2Lmhhc2g9ZnVuY3Rpb24oYSl7cmV0dXJuKG5ldyBzamNsLmhhc2guc2hhMjU2KS51cGRhdGUoYSkuZmluYWxpemUoKX07XG5zamNsLmhhc2guc2hhMjU2LnByb3RvdHlwZT17YmxvY2tTaXplOjUxMixyZXNldDpmdW5jdGlvbigpe3RoaXMuZz10aGlzLm8uc2xpY2UoMCk7dGhpcy5mPVtdO3RoaXMuYz0wO3JldHVybiB0aGlzfSx1cGRhdGU6ZnVuY3Rpb24oYSl7XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYoYT1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGEpKTt2YXIgYixjPXRoaXMuZj1zamNsLmJpdEFycmF5LmNvbmNhdCh0aGlzLmYsYSk7Yj10aGlzLmM7YT10aGlzLmM9YitzamNsLmJpdEFycmF5LmJpdExlbmd0aChhKTtpZigweDFmZmZmZmZmZmZmZmZmPGEpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJDYW5ub3QgaGFzaCBtb3JlIHRoYW4gMl41MyAtIDEgYml0c1wiKTtpZihcInVuZGVmaW5lZFwiIT09dHlwZW9mIFVpbnQzMkFycmF5KXt2YXIgZD1uZXcgVWludDMyQXJyYXkoYyksZT0wO2ZvcihiPTUxMitiLSg1MTIrYiYweDFmZik7Yjw9YTtiKz01MTIpdGhpcy5sKGQuc3ViYXJyYXkoMTYqZSxcbjE2KihlKzEpKSksZSs9MTtjLnNwbGljZSgwLDE2KmUpfWVsc2UgZm9yKGI9NTEyK2ItKDUxMitiJjB4MWZmKTtiPD1hO2IrPTUxMil0aGlzLmwoYy5zcGxpY2UoMCwxNikpO3JldHVybiB0aGlzfSxmaW5hbGl6ZTpmdW5jdGlvbigpe3ZhciBhLGI9dGhpcy5mLGM9dGhpcy5nLGI9c2pjbC5iaXRBcnJheS5jb25jYXQoYixbc2pjbC5iaXRBcnJheS5wYXJ0aWFsKDEsMSldKTtmb3IoYT1iLmxlbmd0aCsyO2EmMTU7YSsrKWIucHVzaCgwKTtiLnB1c2goTWF0aC5mbG9vcih0aGlzLmMvMHgxMDAwMDAwMDApKTtmb3IoYi5wdXNoKHRoaXMuY3wwKTtiLmxlbmd0aDspdGhpcy5sKGIuc3BsaWNlKDAsMTYpKTt0aGlzLnJlc2V0KCk7cmV0dXJuIGN9LG86W10sYjpbXSxDOmZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhKXtyZXR1cm4gMHgxMDAwMDAwMDAqKGEtTWF0aC5mbG9vcihhKSl8MH1mb3IodmFyIGI9MCxjPTIsZCxlOzY0PmI7YysrKXtlPSEwO2ZvcihkPTI7ZCpkPD1jO2QrKylpZigwPT09YyVkKXtlPVxuITE7YnJlYWt9ZSYmKDg+YiYmKHRoaXMub1tiXT1hKE1hdGgucG93KGMsLjUpKSksdGhpcy5iW2JdPWEoTWF0aC5wb3coYywxLzMpKSxiKyspfX0sbDpmdW5jdGlvbihhKXt2YXIgYixjLGQsZT10aGlzLmcsZj10aGlzLmIsZz1lWzBdLGg9ZVsxXSxrPWVbMl0sbj1lWzNdLGw9ZVs0XSxtPWVbNV0scD1lWzZdLHo9ZVs3XTtmb3IoYj0wOzY0PmI7YisrKTE2PmI/Yz1hW2JdOihjPWFbYisxJjE1XSxkPWFbYisxNCYxNV0sYz1hW2ImMTVdPShjPj4+N15jPj4+MTheYz4+PjNeYzw8MjVeYzw8MTQpKyhkPj4+MTdeZD4+PjE5XmQ+Pj4xMF5kPDwxNV5kPDwxMykrYVtiJjE1XSthW2IrOSYxNV18MCksYz1jK3orKGw+Pj42Xmw+Pj4xMV5sPj4+MjVebDw8MjZebDw8MjFebDw8NykrKHBebCYobV5wKSkrZltiXSx6PXAscD1tLG09bCxsPW4rY3wwLG49ayxrPWgsaD1nLGc9YysoaCZrXm4mKGheaykpKyhoPj4+Ml5oPj4+MTNeaD4+PjIyXmg8PDMwXmg8PDE5Xmg8PDEwKXwwO2VbMF09ZVswXStnfFxuMDtlWzFdPWVbMV0raHwwO2VbMl09ZVsyXStrfDA7ZVszXT1lWzNdK258MDtlWzRdPWVbNF0rbHwwO2VbNV09ZVs1XSttfDA7ZVs2XT1lWzZdK3B8MDtlWzddPWVbN10renwwfX07c2pjbC5oYXNoLnNoYTUxMj1mdW5jdGlvbihhKXt0aGlzLmJbMF18fHRoaXMuQygpO2E/KHRoaXMuZz1hLmcuc2xpY2UoMCksdGhpcy5mPWEuZi5zbGljZSgwKSx0aGlzLmM9YS5jKTp0aGlzLnJlc2V0KCl9O3NqY2wuaGFzaC5zaGE1MTIuaGFzaD1mdW5jdGlvbihhKXtyZXR1cm4obmV3IHNqY2wuaGFzaC5zaGE1MTIpLnVwZGF0ZShhKS5maW5hbGl6ZSgpfTtcbnNqY2wuaGFzaC5zaGE1MTIucHJvdG90eXBlPXtibG9ja1NpemU6MTAyNCxyZXNldDpmdW5jdGlvbigpe3RoaXMuZz10aGlzLm8uc2xpY2UoMCk7dGhpcy5mPVtdO3RoaXMuYz0wO3JldHVybiB0aGlzfSx1cGRhdGU6ZnVuY3Rpb24oYSl7XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYoYT1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGEpKTt2YXIgYixjPXRoaXMuZj1zamNsLmJpdEFycmF5LmNvbmNhdCh0aGlzLmYsYSk7Yj10aGlzLmM7YT10aGlzLmM9YitzamNsLmJpdEFycmF5LmJpdExlbmd0aChhKTtpZigweDFmZmZmZmZmZmZmZmZmPGEpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJDYW5ub3QgaGFzaCBtb3JlIHRoYW4gMl41MyAtIDEgYml0c1wiKTtpZihcInVuZGVmaW5lZFwiIT09dHlwZW9mIFVpbnQzMkFycmF5KXt2YXIgZD1uZXcgVWludDMyQXJyYXkoYyksZT0wO2ZvcihiPTEwMjQrYi0oMTAyNCtiJjEwMjMpO2I8PWE7Yis9MTAyNCl0aGlzLmwoZC5zdWJhcnJheSgzMipcbmUsMzIqKGUrMSkpKSxlKz0xO2Muc3BsaWNlKDAsMzIqZSl9ZWxzZSBmb3IoYj0xMDI0K2ItKDEwMjQrYiYxMDIzKTtiPD1hO2IrPTEwMjQpdGhpcy5sKGMuc3BsaWNlKDAsMzIpKTtyZXR1cm4gdGhpc30sZmluYWxpemU6ZnVuY3Rpb24oKXt2YXIgYSxiPXRoaXMuZixjPXRoaXMuZyxiPXNqY2wuYml0QXJyYXkuY29uY2F0KGIsW3NqY2wuYml0QXJyYXkucGFydGlhbCgxLDEpXSk7Zm9yKGE9Yi5sZW5ndGgrNDthJjMxO2ErKyliLnB1c2goMCk7Yi5wdXNoKDApO2IucHVzaCgwKTtiLnB1c2goTWF0aC5mbG9vcih0aGlzLmMvMHgxMDAwMDAwMDApKTtmb3IoYi5wdXNoKHRoaXMuY3wwKTtiLmxlbmd0aDspdGhpcy5sKGIuc3BsaWNlKDAsMzIpKTt0aGlzLnJlc2V0KCk7cmV0dXJuIGN9LG86W10saWE6WzEyMzcyMjMyLDEzMjgxMDgzLDk3NjI4NTksMTkxNDYwOSwxNTEwNjc2OSw0MDkwOTExLDQzMDgzMzEsODI2NjEwNV0sYjpbXSxrYTpbMjY2NjAxOCwxNTY4OTE2NSw1MDYxNDIzLDkwMzQ2ODQsXG40NzY0OTg0LDM4MDk1MywxNjU4Nzc5LDcxNzY0NzIsMTk3MTg2LDczNjg2MzgsMTQ5ODc5MTYsMTY3NTc5ODYsODA5NjExMSwxNDgwMzY5LDEzMDQ2MzI1LDY4OTExNTYsMTU4MTMzMzAsNTE4NzA0Myw5MjI5NzQ5LDExMzEyMjI5LDI4MTg2NzcsMTA5Mzc0NzUsNDMyNDMwOCwxMTM1NTQxLDY3NDE5MzEsMTE4MDkyOTYsMTY0NTgwNDcsMTU2NjY5MTYsMTEwNDY4NTAsNjk4MTQ5LDIyOTk5OSw5NDU3NzYsMTM3NzQ4NDQsMjU0MTg2MiwxMjg1NjA0NSw5ODEwOTExLDExNDk0MzY2LDc4NDQ1MjAsMTU1NzY4MDYsODUzMzMwNywxNTc5NTA0NCw0MzM3NjY1LDE2MjkxNzI5LDU1NTM3MTIsMTU2ODQxMjAsNjY2MjQxNiw3NDEzODAyLDEyMzA4OTIwLDEzODE2MDA4LDQzMDM2OTksOTM2NjQyNSwxMDE3NjY4MCwxMzE5NTg3NSw0Mjk1MzcxLDY1NDYyOTEsMTE3MTI2NzUsMTU3MDg5MjQsMTUxOTQ1NiwxNTc3MjUzMCw2NTY4NDI4LDY0OTU3ODQsODU2ODI5NywxMzAwNzEyNSw3NDkyMzk1LDI1MTUzNTYsXG4xMjYzMjU4MywxNDc0MDI1NCw3MjYyNTg0LDE1MzU5MzAsMTMxNDYyNzgsMTYzMjE5NjYsMTg1MzIxMSwyOTQyNzYsMTMwNTEwMjcsMTMyMjE1NjQsMTA1MTk4MCw0MDgwMzEwLDY2NTE0MzQsMTQwODg5NDAsNDY3NTYwN10sQzpmdW5jdGlvbigpe2Z1bmN0aW9uIGEoYSl7cmV0dXJuIDB4MTAwMDAwMDAwKihhLU1hdGguZmxvb3IoYSkpfDB9ZnVuY3Rpb24gYihhKXtyZXR1cm4gMHgxMDAwMDAwMDAwMCooYS1NYXRoLmZsb29yKGEpKSYyNTV9Zm9yKHZhciBjPTAsZD0yLGUsZjs4MD5jO2QrKyl7Zj0hMDtmb3IoZT0yO2UqZTw9ZDtlKyspaWYoMD09PWQlZSl7Zj0hMTticmVha31mJiYoOD5jJiYodGhpcy5vWzIqY109YShNYXRoLnBvdyhkLC41KSksdGhpcy5vWzIqYysxXT1iKE1hdGgucG93KGQsLjUpKTw8MjR8dGhpcy5pYVtjXSksdGhpcy5iWzIqY109YShNYXRoLnBvdyhkLDEvMykpLHRoaXMuYlsyKmMrMV09YihNYXRoLnBvdyhkLDEvMykpPDwyNHx0aGlzLmthW2NdLGMrKyl9fSxsOmZ1bmN0aW9uKGEpe3ZhciBiLFxuYyxkPXRoaXMuZyxlPXRoaXMuYixmPWRbMF0sZz1kWzFdLGg9ZFsyXSxrPWRbM10sbj1kWzRdLGw9ZFs1XSxtPWRbNl0scD1kWzddLHo9ZFs4XSxBPWRbOV0sQz1kWzEwXSxCPWRbMTFdLEQ9ZFsxMl0sUD1kWzEzXSxlYT1kWzE0XSxRPWRbMTVdLHQ7aWYoXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBVaW50MzJBcnJheSl7dD1BcnJheSgxNjApO2Zvcih2YXIgcj0wOzMyPnI7cisrKXRbcl09YVtyXX1lbHNlIHQ9YTt2YXIgcj1mLHU9ZyxHPWgsRT1rLEg9bixGPWwsVj1tLEk9cCx3PXosdj1BLFI9QyxKPUIsUz1ELEs9UCxXPWVhLEw9UTtmb3IoYT0wOzgwPmE7YSsrKXtpZigxNj5hKWI9dFsyKmFdLGM9dFsyKmErMV07ZWxzZXtjPXRbMiooYS0xNSldO3ZhciBxPXRbMiooYS0xNSkrMV07Yj0ocTw8MzF8Yz4+PjEpXihxPDwyNHxjPj4+OCleYz4+Pjc7dmFyIHg9KGM8PDMxfHE+Pj4xKV4oYzw8MjR8cT4+PjgpXihjPDwyNXxxPj4+Nyk7Yz10WzIqKGEtMildO3ZhciB5PXRbMiooYS0yKSsxXSxcbnE9KHk8PDEzfGM+Pj4xOSleKGM8PDN8eT4+PjI5KV5jPj4+Nix5PShjPDwxM3x5Pj4+MTkpXih5PDwzfGM+Pj4yOSleKGM8PDI2fHk+Pj42KSxYPXRbMiooYS03KV0sWT10WzIqKGEtMTYpXSxNPXRbMiooYS0xNikrMV07Yz14K3RbMiooYS03KSsxXTtiPWIrWCsoYz4+PjA8eD4+PjA/MTowKTtjKz15O2IrPXErKGM+Pj4wPHk+Pj4wPzE6MCk7Yys9TTtiKz1ZKyhjPj4+MDxNPj4+MD8xOjApfXRbMiphXT1ifD0wO3RbMiphKzFdPWN8PTA7dmFyIFg9dyZSXn53JlMsZmE9diZKXn52JksseT1yJkdeciZIXkcmSCxqYT11JkVedSZGXkUmRixZPSh1PDw0fHI+Pj4yOCleKHI8PDMwfHU+Pj4yKV4ocjw8MjV8dT4+PjcpLE09KHI8PDR8dT4+PjI4KV4odTw8MzB8cj4+PjIpXih1PDwyNXxyPj4+Nyksa2E9ZVsyKmFdLGdhPWVbMiphKzFdLHE9TCsoKHc8PDE4fHY+Pj4xNCleKHc8PDE0fHY+Pj4xOCleKHY8PDIzfHc+Pj45KSkseD1XKygodjw8MTh8dz4+PjE0KV4odjw8MTR8dz4+PjE4KV4odzw8XG4yM3x2Pj4+OSkpKyhxPj4+MDxMPj4+MD8xOjApLHE9cStmYSx4PXgrKFgrKHE+Pj4wPGZhPj4+MD8xOjApKSxxPXErZ2EseD14KyhrYSsocT4+PjA8Z2E+Pj4wPzE6MCkpLHE9cStjfDAseD14KyhiKyhxPj4+MDxjPj4+MD8xOjApKTtjPU0ramE7Yj1ZK3krKGM+Pj4wPE0+Pj4wPzE6MCk7Vz1TO0w9SztTPVI7Sz1KO1I9dztKPXY7dj1JK3F8MDt3PVYreCsodj4+PjA8ST4+PjA/MTowKXwwO1Y9SDtJPUY7SD1HO0Y9RTtHPXI7RT11O3U9cStjfDA7cj14K2IrKHU+Pj4wPHE+Pj4wPzE6MCl8MH1nPWRbMV09Zyt1fDA7ZFswXT1mK3IrKGc+Pj4wPHU+Pj4wPzE6MCl8MDtrPWRbM109aytFfDA7ZFsyXT1oK0crKGs+Pj4wPEU+Pj4wPzE6MCl8MDtsPWRbNV09bCtGfDA7ZFs0XT1uK0grKGw+Pj4wPEY+Pj4wPzE6MCl8MDtwPWRbN109cCtJfDA7ZFs2XT1tK1YrKHA+Pj4wPEk+Pj4wPzE6MCl8MDtBPWRbOV09QSt2fDA7ZFs4XT16K3crKEE+Pj4wPHY+Pj4wPzE6MCl8MDtCPWRbMTFdPUIrSnxcbjA7ZFsxMF09QytSKyhCPj4+MDxKPj4+MD8xOjApfDA7UD1kWzEzXT1QK0t8MDtkWzEyXT1EK1MrKFA+Pj4wPEs+Pj4wPzE6MCl8MDtRPWRbMTVdPVErTHwwO2RbMTRdPWVhK1crKFE+Pj4wPEw+Pj4wPzE6MCl8MH19O1xuc2pjbC5tb2RlLmNjbT17bmFtZTpcImNjbVwiLEY6W10sbGlzdGVuUHJvZ3Jlc3M6ZnVuY3Rpb24oYSl7c2pjbC5tb2RlLmNjbS5GLnB1c2goYSl9LHVuTGlzdGVuUHJvZ3Jlc3M6ZnVuY3Rpb24oYSl7YT1zamNsLm1vZGUuY2NtLkYuaW5kZXhPZihhKTstMTxhJiZzamNsLm1vZGUuY2NtLkYuc3BsaWNlKGEsMSl9LGRhOmZ1bmN0aW9uKGEpe3ZhciBiPXNqY2wubW9kZS5jY20uRi5zbGljZSgpLGM7Zm9yKGM9MDtjPGIubGVuZ3RoO2MrPTEpYltjXShhKX0sZW5jcnlwdDpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmLGc9Yi5zbGljZSgwKSxoPXNqY2wuYml0QXJyYXksaz1oLmJpdExlbmd0aChjKS84LG49aC5iaXRMZW5ndGgoZykvODtlPWV8fDY0O2Q9ZHx8W107aWYoNz5rKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiY2NtOiBpdiBtdXN0IGJlIGF0IGxlYXN0IDcgYnl0ZXNcIik7Zm9yKGY9Mjs0PmYmJm4+Pj44KmY7ZisrKTtmPDE1LWsmJihmPTE1LWspO2M9aC5jbGFtcChjLFxuOCooMTUtZikpO2I9c2pjbC5tb2RlLmNjbS5VKGEsYixjLGQsZSxmKTtnPXNqY2wubW9kZS5jY20uVihhLGcsYyxiLGUsZik7cmV0dXJuIGguY29uY2F0KGcuZGF0YSxnLnRhZyl9LGRlY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCxlKXtlPWV8fDY0O2Q9ZHx8W107dmFyIGY9c2pjbC5iaXRBcnJheSxnPWYuYml0TGVuZ3RoKGMpLzgsaD1mLmJpdExlbmd0aChiKSxrPWYuY2xhbXAoYixoLWUpLG49Zi5iaXRTbGljZShiLGgtZSksaD0oaC1lKS84O2lmKDc+Zyl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImNjbTogaXYgbXVzdCBiZSBhdCBsZWFzdCA3IGJ5dGVzXCIpO2ZvcihiPTI7ND5iJiZoPj4+OCpiO2IrKyk7YjwxNS1nJiYoYj0xNS1nKTtjPWYuY2xhbXAoYyw4KigxNS1iKSk7az1zamNsLm1vZGUuY2NtLlYoYSxrLGMsbixlLGIpO2E9c2pjbC5tb2RlLmNjbS5VKGEsay5kYXRhLGMsZCxlLGIpO2lmKCFmLmVxdWFsKGsudGFnLGEpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5jb3JydXB0KFwiY2NtOiB0YWcgZG9lc24ndCBtYXRjaFwiKTtcbnJldHVybiBrLmRhdGF9LG1hOmZ1bmN0aW9uKGEsYixjLGQsZSxmKXt2YXIgZz1bXSxoPXNqY2wuYml0QXJyYXksaz1oLlA7ZD1baC5wYXJ0aWFsKDgsKGIubGVuZ3RoPzY0OjApfGQtMjw8MnxmLTEpXTtkPWguY29uY2F0KGQsYyk7ZFszXXw9ZTtkPWEuZW5jcnlwdChkKTtpZihiLmxlbmd0aClmb3IoYz1oLmJpdExlbmd0aChiKS84LDY1Mjc5Pj1jP2c9W2gucGFydGlhbCgxNixjKV06MHhmZmZmZmZmZj49YyYmKGc9aC5jb25jYXQoW2gucGFydGlhbCgxNiw2NTUzNCldLFtjXSkpLGc9aC5jb25jYXQoZyxiKSxiPTA7YjxnLmxlbmd0aDtiKz00KWQ9YS5lbmNyeXB0KGsoZCxnLnNsaWNlKGIsYis0KS5jb25jYXQoWzAsMCwwXSkpKTtyZXR1cm4gZH0sVTpmdW5jdGlvbihhLGIsYyxkLGUsZil7dmFyIGc9c2pjbC5iaXRBcnJheSxoPWcuUDtlLz04O2lmKGUlMnx8ND5lfHwxNjxlKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiY2NtOiBpbnZhbGlkIHRhZyBsZW5ndGhcIik7XG5pZigweGZmZmZmZmZmPGQubGVuZ3RofHwweGZmZmZmZmZmPGIubGVuZ3RoKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJjY206IGNhbid0IGRlYWwgd2l0aCA0R2lCIG9yIG1vcmUgZGF0YVwiKTtjPXNqY2wubW9kZS5jY20ubWEoYSxkLGMsZSxnLmJpdExlbmd0aChiKS84LGYpO2ZvcihkPTA7ZDxiLmxlbmd0aDtkKz00KWM9YS5lbmNyeXB0KGgoYyxiLnNsaWNlKGQsZCs0KS5jb25jYXQoWzAsMCwwXSkpKTtyZXR1cm4gZy5jbGFtcChjLDgqZSl9LFY6ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe3ZhciBnLGg9c2pjbC5iaXRBcnJheTtnPWguUDt2YXIgaz1iLmxlbmd0aCxuPWguYml0TGVuZ3RoKGIpLGw9ay81MCxtPWw7Yz1oLmNvbmNhdChbaC5wYXJ0aWFsKDgsZi0xKV0sYykuY29uY2F0KFswLDAsMF0pLnNsaWNlKDAsNCk7ZD1oLmJpdFNsaWNlKGcoZCxhLmVuY3J5cHQoYykpLDAsZSk7aWYoIWspcmV0dXJue3RhZzpkLGRhdGE6W119O2ZvcihnPTA7ZzxrO2crPTQpZz5sJiYoc2pjbC5tb2RlLmNjbS5kYShnL1xuayksbCs9bSksY1szXSsrLGU9YS5lbmNyeXB0KGMpLGJbZ11ePWVbMF0sYltnKzFdXj1lWzFdLGJbZysyXV49ZVsyXSxiW2crM11ePWVbM107cmV0dXJue3RhZzpkLGRhdGE6aC5jbGFtcChiLG4pfX19O3NqY2wubWlzYy5obWFjPWZ1bmN0aW9uKGEsYil7dGhpcy5XPWI9Ynx8c2pjbC5oYXNoLnNoYTI1Njt2YXIgYz1bW10sW11dLGQsZT1iLnByb3RvdHlwZS5ibG9ja1NpemUvMzI7dGhpcy5CPVtuZXcgYixuZXcgYl07YS5sZW5ndGg+ZSYmKGE9Yi5oYXNoKGEpKTtmb3IoZD0wO2Q8ZTtkKyspY1swXVtkXT1hW2RdXjkwOTUyMjQ4NixjWzFdW2RdPWFbZF1eMTU0OTU1NjgyODt0aGlzLkJbMF0udXBkYXRlKGNbMF0pO3RoaXMuQlsxXS51cGRhdGUoY1sxXSk7dGhpcy5PPW5ldyBiKHRoaXMuQlswXSl9O1xuc2pjbC5taXNjLmhtYWMucHJvdG90eXBlLmVuY3J5cHQ9c2pjbC5taXNjLmhtYWMucHJvdG90eXBlLm1hYz1mdW5jdGlvbihhKXtpZih0aGlzLlopdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJlbmNyeXB0IG9uIGFscmVhZHkgdXBkYXRlZCBobWFjIGNhbGxlZCFcIik7dGhpcy51cGRhdGUoYSk7cmV0dXJuIHRoaXMuZGlnZXN0KGEpfTtzamNsLm1pc2MuaG1hYy5wcm90b3R5cGUucmVzZXQ9ZnVuY3Rpb24oKXt0aGlzLk89bmV3IHRoaXMuVyh0aGlzLkJbMF0pO3RoaXMuWj0hMX07c2pjbC5taXNjLmhtYWMucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbihhKXt0aGlzLlo9ITA7dGhpcy5PLnVwZGF0ZShhKX07c2pjbC5taXNjLmhtYWMucHJvdG90eXBlLmRpZ2VzdD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuTy5maW5hbGl6ZSgpLGE9KG5ldyB0aGlzLlcodGhpcy5CWzFdKSkudXBkYXRlKGEpLmZpbmFsaXplKCk7dGhpcy5yZXNldCgpO3JldHVybiBhfTtcbnNqY2wubWlzYy5wYmtkZjI9ZnVuY3Rpb24oYSxiLGMsZCxlKXtjPWN8fDFFNDtpZigwPmR8fDA+Yyl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImludmFsaWQgcGFyYW1zIHRvIHBia2RmMlwiKTtcInN0cmluZ1wiPT09dHlwZW9mIGEmJihhPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYSkpO1wic3RyaW5nXCI9PT10eXBlb2YgYiYmKGI9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhiKSk7ZT1lfHxzamNsLm1pc2MuaG1hYzthPW5ldyBlKGEpO3ZhciBmLGcsaCxrLG49W10sbD1zamNsLmJpdEFycmF5O2ZvcihrPTE7MzIqbi5sZW5ndGg8KGR8fDEpO2srKyl7ZT1mPWEuZW5jcnlwdChsLmNvbmNhdChiLFtrXSkpO2ZvcihnPTE7ZzxjO2crKylmb3IoZj1hLmVuY3J5cHQoZiksaD0wO2g8Zi5sZW5ndGg7aCsrKWVbaF1ePWZbaF07bj1uLmNvbmNhdChlKX1kJiYobj1sLmNsYW1wKG4sZCkpO3JldHVybiBufTtcbnNqY2wucHJuZz1mdW5jdGlvbihhKXt0aGlzLmg9W25ldyBzamNsLmhhc2guc2hhMjU2XTt0aGlzLnM9WzBdO3RoaXMuTj0wO3RoaXMuRz17fTt0aGlzLk09MDt0aGlzLlQ9e307dGhpcy5YPXRoaXMuaT10aGlzLnU9dGhpcy5mYT0wO3RoaXMuYj1bMCwwLDAsMCwwLDAsMCwwXTt0aGlzLm09WzAsMCwwLDBdO3RoaXMuSz12b2lkIDA7dGhpcy5MPWE7dGhpcy5EPSExO3RoaXMuSj17cHJvZ3Jlc3M6e30sc2VlZGVkOnt9fTt0aGlzLkE9dGhpcy5lYT0wO3RoaXMuSD0xO3RoaXMuST0yO3RoaXMuYWE9MHgxMDAwMDt0aGlzLlI9WzAsNDgsNjQsOTYsMTI4LDE5MiwweDEwMCwzODQsNTEyLDc2OCwxMDI0XTt0aGlzLmJhPTNFNDt0aGlzLiQ9ODB9O1xuc2pjbC5wcm5nLnByb3RvdHlwZT17cmFuZG9tV29yZHM6ZnVuY3Rpb24oYSxiKXt2YXIgYz1bXSxkO2Q9dGhpcy5pc1JlYWR5KGIpO3ZhciBlO2lmKGQ9PT10aGlzLkEpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLm5vdFJlYWR5KFwiZ2VuZXJhdG9yIGlzbid0IHNlZWRlZFwiKTtpZihkJnRoaXMuSSl7ZD0hKGQmdGhpcy5IKTtlPVtdO3ZhciBmPTAsZzt0aGlzLlg9ZVswXT0obmV3IERhdGUpLnZhbHVlT2YoKSt0aGlzLmJhO2ZvcihnPTA7MTY+ZztnKyspZS5wdXNoKDB4MTAwMDAwMDAwKk1hdGgucmFuZG9tKCl8MCk7Zm9yKGc9MDtnPHRoaXMuaC5sZW5ndGgmJihlPWUuY29uY2F0KHRoaXMuaFtnXS5maW5hbGl6ZSgpKSxmKz10aGlzLnNbZ10sdGhpcy5zW2ddPTAsZHx8ISh0aGlzLk4mMTw8ZykpO2crKyk7dGhpcy5OPj0xPDx0aGlzLmgubGVuZ3RoJiYodGhpcy5oLnB1c2gobmV3IHNqY2wuaGFzaC5zaGEyNTYpLHRoaXMucy5wdXNoKDApKTt0aGlzLmktPWY7Zj50aGlzLnUmJih0aGlzLnU9XG5mKTt0aGlzLk4rKzt0aGlzLmI9c2pjbC5oYXNoLnNoYTI1Ni5oYXNoKHRoaXMuYi5jb25jYXQoZSkpO3RoaXMuSz1uZXcgc2pjbC5jaXBoZXIuYWVzKHRoaXMuYik7Zm9yKGQ9MDs0PmQmJih0aGlzLm1bZF09dGhpcy5tW2RdKzF8MCwhdGhpcy5tW2RdKTtkKyspO31mb3IoZD0wO2Q8YTtkKz00KTA9PT0oZCsxKSV0aGlzLmFhJiZiYSh0aGlzKSxlPU4odGhpcyksYy5wdXNoKGVbMF0sZVsxXSxlWzJdLGVbM10pO2JhKHRoaXMpO3JldHVybiBjLnNsaWNlKDAsYSl9LHNldERlZmF1bHRQYXJhbm9pYTpmdW5jdGlvbihhLGIpe2lmKDA9PT1hJiZcIlNldHRpbmcgcGFyYW5vaWE9MCB3aWxsIHJ1aW4geW91ciBzZWN1cml0eTsgdXNlIGl0IG9ubHkgZm9yIHRlc3RpbmdcIiE9PWIpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJTZXR0aW5nIHBhcmFub2lhPTAgd2lsbCBydWluIHlvdXIgc2VjdXJpdHk7IHVzZSBpdCBvbmx5IGZvciB0ZXN0aW5nXCIpO3RoaXMuTD1hfSxhZGRFbnRyb3B5OmZ1bmN0aW9uKGEsXG5iLGMpe2M9Y3x8XCJ1c2VyXCI7dmFyIGQsZSxmPShuZXcgRGF0ZSkudmFsdWVPZigpLGc9dGhpcy5HW2NdLGg9dGhpcy5pc1JlYWR5KCksaz0wO2Q9dGhpcy5UW2NdO3ZvaWQgMD09PWQmJihkPXRoaXMuVFtjXT10aGlzLmZhKyspO3ZvaWQgMD09PWcmJihnPXRoaXMuR1tjXT0wKTt0aGlzLkdbY109KHRoaXMuR1tjXSsxKSV0aGlzLmgubGVuZ3RoO3N3aXRjaCh0eXBlb2YgYSl7Y2FzZSBcIm51bWJlclwiOnZvaWQgMD09PWImJihiPTEpO3RoaXMuaFtnXS51cGRhdGUoW2QsdGhpcy5NKyssMSxiLGYsMSxhfDBdKTticmVhaztjYXNlIFwib2JqZWN0XCI6Yz1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSk7aWYoXCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiPT09Yyl7ZT1bXTtmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWUucHVzaChhW2NdKTthPWV9ZWxzZSBmb3IoXCJbb2JqZWN0IEFycmF5XVwiIT09YyYmKGs9MSksYz0wO2M8YS5sZW5ndGgmJiFrO2MrKylcIm51bWJlclwiIT09dHlwZW9mIGFbY10mJlxuKGs9MSk7aWYoIWspe2lmKHZvaWQgMD09PWIpZm9yKGM9Yj0wO2M8YS5sZW5ndGg7YysrKWZvcihlPWFbY107MDxlOyliKyssZT1lPj4+MTt0aGlzLmhbZ10udXBkYXRlKFtkLHRoaXMuTSsrLDIsYixmLGEubGVuZ3RoXS5jb25jYXQoYSkpfWJyZWFrO2Nhc2UgXCJzdHJpbmdcIjp2b2lkIDA9PT1iJiYoYj1hLmxlbmd0aCk7dGhpcy5oW2ddLnVwZGF0ZShbZCx0aGlzLk0rKywzLGIsZixhLmxlbmd0aF0pO3RoaXMuaFtnXS51cGRhdGUoYSk7YnJlYWs7ZGVmYXVsdDprPTF9aWYoayl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwicmFuZG9tOiBhZGRFbnRyb3B5IG9ubHkgc3VwcG9ydHMgbnVtYmVyLCBhcnJheSBvZiBudW1iZXJzIG9yIHN0cmluZ1wiKTt0aGlzLnNbZ10rPWI7dGhpcy5pKz1iO2g9PT10aGlzLkEmJih0aGlzLmlzUmVhZHkoKSE9PXRoaXMuQSYmY2EoXCJzZWVkZWRcIixNYXRoLm1heCh0aGlzLnUsdGhpcy5pKSksY2EoXCJwcm9ncmVzc1wiLHRoaXMuZ2V0UHJvZ3Jlc3MoKSkpfSxcbmlzUmVhZHk6ZnVuY3Rpb24oYSl7YT10aGlzLlJbdm9pZCAwIT09YT9hOnRoaXMuTF07cmV0dXJuIHRoaXMudSYmdGhpcy51Pj1hP3RoaXMuc1swXT50aGlzLiQmJihuZXcgRGF0ZSkudmFsdWVPZigpPnRoaXMuWD90aGlzLkl8dGhpcy5IOnRoaXMuSDp0aGlzLmk+PWE/dGhpcy5JfHRoaXMuQTp0aGlzLkF9LGdldFByb2dyZXNzOmZ1bmN0aW9uKGEpe2E9dGhpcy5SW2E/YTp0aGlzLkxdO3JldHVybiB0aGlzLnU+PWE/MTp0aGlzLmk+YT8xOnRoaXMuaS9hfSxzdGFydENvbGxlY3RvcnM6ZnVuY3Rpb24oKXtpZighdGhpcy5EKXt0aGlzLmE9e2xvYWRUaW1lQ29sbGVjdG9yOk8odGhpcyx0aGlzLmxhKSxtb3VzZUNvbGxlY3RvcjpPKHRoaXMsdGhpcy5uYSksa2V5Ym9hcmRDb2xsZWN0b3I6Tyh0aGlzLHRoaXMuamEpLGFjY2VsZXJvbWV0ZXJDb2xsZWN0b3I6Tyh0aGlzLHRoaXMuY2EpLHRvdWNoQ29sbGVjdG9yOk8odGhpcyx0aGlzLnBhKX07aWYod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsXG50aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcy5hLm1vdXNlQ29sbGVjdG9yLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZW1vdGlvblwiLHRoaXMuYS5hY2NlbGVyb21ldGVyQ29sbGVjdG9yLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHRoaXMuYS50b3VjaENvbGxlY3RvciwhMSk7ZWxzZSBpZihkb2N1bWVudC5hdHRhY2hFdmVudClkb2N1bWVudC5hdHRhY2hFdmVudChcIm9ubG9hZFwiLHRoaXMuYS5sb2FkVGltZUNvbGxlY3RvciksZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJvbm1vdXNlbW92ZVwiLHRoaXMuYS5tb3VzZUNvbGxlY3RvciksZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJrZXlwcmVzc1wiLHRoaXMuYS5rZXlib2FyZENvbGxlY3Rvcik7ZWxzZSB0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwiY2FuJ3QgYXR0YWNoIGV2ZW50XCIpO1xudGhpcy5EPSEwfX0sc3RvcENvbGxlY3RvcnM6ZnVuY3Rpb24oKXt0aGlzLkQmJih3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcj8od2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsdGhpcy5hLmxvYWRUaW1lQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMuYS5tb3VzZUNvbGxlY3RvciwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLHRoaXMuYS5rZXlib2FyZENvbGxlY3RvciwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJkZXZpY2Vtb3Rpb25cIix0aGlzLmEuYWNjZWxlcm9tZXRlckNvbGxlY3RvciwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIix0aGlzLmEudG91Y2hDb2xsZWN0b3IsITEpKTpkb2N1bWVudC5kZXRhY2hFdmVudCYmKGRvY3VtZW50LmRldGFjaEV2ZW50KFwib25sb2FkXCIsdGhpcy5hLmxvYWRUaW1lQ29sbGVjdG9yKSxkb2N1bWVudC5kZXRhY2hFdmVudChcIm9ubW91c2Vtb3ZlXCIsXG50aGlzLmEubW91c2VDb2xsZWN0b3IpLGRvY3VtZW50LmRldGFjaEV2ZW50KFwia2V5cHJlc3NcIix0aGlzLmEua2V5Ym9hcmRDb2xsZWN0b3IpKSx0aGlzLkQ9ITEpfSxhZGRFdmVudExpc3RlbmVyOmZ1bmN0aW9uKGEsYil7dGhpcy5KW2FdW3RoaXMuZWErK109Yn0scmVtb3ZlRXZlbnRMaXN0ZW5lcjpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZT10aGlzLkpbYV0sZj1bXTtmb3IoZCBpbiBlKWUuaGFzT3duUHJvcGVydHkoZCkmJmVbZF09PT1iJiZmLnB1c2goZCk7Zm9yKGM9MDtjPGYubGVuZ3RoO2MrKylkPWZbY10sZGVsZXRlIGVbZF19LGphOmZ1bmN0aW9uKCl7VCh0aGlzLDEpfSxuYTpmdW5jdGlvbihhKXt2YXIgYixjO3RyeXtiPWEueHx8YS5jbGllbnRYfHxhLm9mZnNldFh8fDAsYz1hLnl8fGEuY2xpZW50WXx8YS5vZmZzZXRZfHwwfWNhdGNoKGQpe2M9Yj0wfTAhPWImJjAhPWMmJnRoaXMuYWRkRW50cm9weShbYixjXSwyLFwibW91c2VcIik7VCh0aGlzLDApfSxwYTpmdW5jdGlvbihhKXthPVxuYS50b3VjaGVzWzBdfHxhLmNoYW5nZWRUb3VjaGVzWzBdO3RoaXMuYWRkRW50cm9weShbYS5wYWdlWHx8YS5jbGllbnRYLGEucGFnZVl8fGEuY2xpZW50WV0sMSxcInRvdWNoXCIpO1QodGhpcywwKX0sbGE6ZnVuY3Rpb24oKXtUKHRoaXMsMil9LGNhOmZ1bmN0aW9uKGEpe2E9YS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnh8fGEuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55fHxhLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkuejtpZih3aW5kb3cub3JpZW50YXRpb24pe3ZhciBiPXdpbmRvdy5vcmllbnRhdGlvbjtcIm51bWJlclwiPT09dHlwZW9mIGImJnRoaXMuYWRkRW50cm9weShiLDEsXCJhY2NlbGVyb21ldGVyXCIpfWEmJnRoaXMuYWRkRW50cm9weShhLDIsXCJhY2NlbGVyb21ldGVyXCIpO1QodGhpcywwKX19O1xuZnVuY3Rpb24gY2EoYSxiKXt2YXIgYyxkPXNqY2wucmFuZG9tLkpbYV0sZT1bXTtmb3IoYyBpbiBkKWQuaGFzT3duUHJvcGVydHkoYykmJmUucHVzaChkW2NdKTtmb3IoYz0wO2M8ZS5sZW5ndGg7YysrKWVbY10oYil9ZnVuY3Rpb24gVChhLGIpe1widW5kZWZpbmVkXCIhPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cucGVyZm9ybWFuY2UmJlwiZnVuY3Rpb25cIj09PXR5cGVvZiB3aW5kb3cucGVyZm9ybWFuY2Uubm93P2EuYWRkRW50cm9weSh3aW5kb3cucGVyZm9ybWFuY2Uubm93KCksYixcImxvYWR0aW1lXCIpOmEuYWRkRW50cm9weSgobmV3IERhdGUpLnZhbHVlT2YoKSxiLFwibG9hZHRpbWVcIil9ZnVuY3Rpb24gYmEoYSl7YS5iPU4oYSkuY29uY2F0KE4oYSkpO2EuSz1uZXcgc2pjbC5jaXBoZXIuYWVzKGEuYil9ZnVuY3Rpb24gTihhKXtmb3IodmFyIGI9MDs0PmImJihhLm1bYl09YS5tW2JdKzF8MCwhYS5tW2JdKTtiKyspO3JldHVybiBhLksuZW5jcnlwdChhLm0pfVxuZnVuY3Rpb24gTyhhLGIpe3JldHVybiBmdW5jdGlvbigpe2IuYXBwbHkoYSxhcmd1bWVudHMpfX1zamNsLnJhbmRvbT1uZXcgc2pjbC5wcm5nKDYpO1xuYTp0cnl7dmFyIFUsZGEsWixoYTtpZihoYT1cInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMpe3ZhciBpYTt0cnl7aWE9cmVxdWlyZShcImNyeXB0b1wiKX1jYXRjaChhKXtpYT1udWxsfWhhPWRhPWlhfWlmKGhhJiZkYS5yYW5kb21CeXRlcylVPWRhLnJhbmRvbUJ5dGVzKDEyOCksVT1uZXcgVWludDMyQXJyYXkoKG5ldyBVaW50OEFycmF5KFUpKS5idWZmZXIpLHNqY2wucmFuZG9tLmFkZEVudHJvcHkoVSwxMDI0LFwiY3J5cHRvWydyYW5kb21CeXRlcyddXCIpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiB3aW5kb3cmJlwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe1o9bmV3IFVpbnQzMkFycmF5KDMyKTtpZih3aW5kb3cuY3J5cHRvJiZ3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyl3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhaKTtlbHNlIGlmKHdpbmRvdy5tc0NyeXB0byYmd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyl3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKFopO1xuZWxzZSBicmVhayBhO3NqY2wucmFuZG9tLmFkZEVudHJvcHkoWiwxMDI0LFwiY3J5cHRvWydnZXRSYW5kb21WYWx1ZXMnXVwiKX19Y2F0Y2goYSl7XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiB3aW5kb3cmJndpbmRvdy5jb25zb2xlJiYoY29uc29sZS5sb2coXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29sbGVjdGluZyBlbnRyb3B5IGZyb20gdGhlIGJyb3dzZXI6XCIpLGNvbnNvbGUubG9nKGEpKX1cbnNqY2wuanNvbj17ZGVmYXVsdHM6e3Y6MSxpdGVyOjFFNCxrczoxMjgsdHM6NjQsbW9kZTpcImNjbVwiLGFkYXRhOlwiXCIsY2lwaGVyOlwiYWVzXCJ9LGhhOmZ1bmN0aW9uKGEsYixjLGQpe2M9Y3x8e307ZD1kfHx7fTt2YXIgZT1zamNsLmpzb24sZj1lLmooe2l2OnNqY2wucmFuZG9tLnJhbmRvbVdvcmRzKDQsMCl9LGUuZGVmYXVsdHMpLGc7ZS5qKGYsYyk7Yz1mLmFkYXRhO1wic3RyaW5nXCI9PT10eXBlb2YgZi5zYWx0JiYoZi5zYWx0PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhmLnNhbHQpKTtcInN0cmluZ1wiPT09dHlwZW9mIGYuaXYmJihmLml2PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhmLml2KSk7aWYoIXNqY2wubW9kZVtmLm1vZGVdfHwhc2pjbC5jaXBoZXJbZi5jaXBoZXJdfHxcInN0cmluZ1wiPT09dHlwZW9mIGEmJjEwMD49Zi5pdGVyfHw2NCE9PWYudHMmJjk2IT09Zi50cyYmMTI4IT09Zi50c3x8MTI4IT09Zi5rcyYmMTkyIT09Zi5rcyYmMHgxMDAhPT1mLmtzfHwyPmYuaXYubGVuZ3RofHxcbjQ8Zi5pdi5sZW5ndGgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGVuY3J5cHQ6IGludmFsaWQgcGFyYW1ldGVyc1wiKTtcInN0cmluZ1wiPT09dHlwZW9mIGE/KGc9c2pjbC5taXNjLmNhY2hlZFBia2RmMihhLGYpLGE9Zy5rZXkuc2xpY2UoMCxmLmtzLzMyKSxmLnNhbHQ9Zy5zYWx0KTpzamNsLmVjYyYmYSBpbnN0YW5jZW9mIHNqY2wuZWNjLmVsR2FtYWwucHVibGljS2V5JiYoZz1hLmtlbSgpLGYua2VtdGFnPWcudGFnLGE9Zy5rZXkuc2xpY2UoMCxmLmtzLzMyKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBiJiYoYj1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGIpKTtcInN0cmluZ1wiPT09dHlwZW9mIGMmJihmLmFkYXRhPWM9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhjKSk7Zz1uZXcgc2pjbC5jaXBoZXJbZi5jaXBoZXJdKGEpO2UuaihkLGYpO2Qua2V5PWE7Zi5jdD1cImNjbVwiPT09Zi5tb2RlJiZzamNsLmFycmF5QnVmZmVyJiZzamNsLmFycmF5QnVmZmVyLmNjbSYmXG5iIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/c2pjbC5hcnJheUJ1ZmZlci5jY20uZW5jcnlwdChnLGIsZi5pdixjLGYudHMpOnNqY2wubW9kZVtmLm1vZGVdLmVuY3J5cHQoZyxiLGYuaXYsYyxmLnRzKTtyZXR1cm4gZn0sZW5jcnlwdDpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1zamNsLmpzb24sZj1lLmhhLmFwcGx5KGUsYXJndW1lbnRzKTtyZXR1cm4gZS5lbmNvZGUoZil9LGdhOmZ1bmN0aW9uKGEsYixjLGQpe2M9Y3x8e307ZD1kfHx7fTt2YXIgZT1zamNsLmpzb247Yj1lLmooZS5qKGUuaih7fSxlLmRlZmF1bHRzKSxiKSxjLCEwKTt2YXIgZixnO2Y9Yi5hZGF0YTtcInN0cmluZ1wiPT09dHlwZW9mIGIuc2FsdCYmKGIuc2FsdD1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYi5zYWx0KSk7XCJzdHJpbmdcIj09PXR5cGVvZiBiLml2JiYoYi5pdj1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYi5pdikpO2lmKCFzamNsLm1vZGVbYi5tb2RlXXx8IXNqY2wuY2lwaGVyW2IuY2lwaGVyXXx8XCJzdHJpbmdcIj09PVxudHlwZW9mIGEmJjEwMD49Yi5pdGVyfHw2NCE9PWIudHMmJjk2IT09Yi50cyYmMTI4IT09Yi50c3x8MTI4IT09Yi5rcyYmMTkyIT09Yi5rcyYmMHgxMDAhPT1iLmtzfHwhYi5pdnx8Mj5iLml2Lmxlbmd0aHx8NDxiLml2Lmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZGVjcnlwdDogaW52YWxpZCBwYXJhbWV0ZXJzXCIpO1wic3RyaW5nXCI9PT10eXBlb2YgYT8oZz1zamNsLm1pc2MuY2FjaGVkUGJrZGYyKGEsYiksYT1nLmtleS5zbGljZSgwLGIua3MvMzIpLGIuc2FsdD1nLnNhbHQpOnNqY2wuZWNjJiZhIGluc3RhbmNlb2Ygc2pjbC5lY2MuZWxHYW1hbC5zZWNyZXRLZXkmJihhPWEudW5rZW0oc2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGIua2VtdGFnKSkuc2xpY2UoMCxiLmtzLzMyKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBmJiYoZj1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGYpKTtnPW5ldyBzamNsLmNpcGhlcltiLmNpcGhlcl0oYSk7Zj1cImNjbVwiPT09XG5iLm1vZGUmJnNqY2wuYXJyYXlCdWZmZXImJnNqY2wuYXJyYXlCdWZmZXIuY2NtJiZiLmN0IGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/c2pjbC5hcnJheUJ1ZmZlci5jY20uZGVjcnlwdChnLGIuY3QsYi5pdixiLnRhZyxmLGIudHMpOnNqY2wubW9kZVtiLm1vZGVdLmRlY3J5cHQoZyxiLmN0LGIuaXYsZixiLnRzKTtlLmooZCxiKTtkLmtleT1hO3JldHVybiAxPT09Yy5yYXc/ZjpzamNsLmNvZGVjLnV0ZjhTdHJpbmcuZnJvbUJpdHMoZil9LGRlY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9c2pjbC5qc29uO3JldHVybiBlLmdhKGEsZS5kZWNvZGUoYiksYyxkKX0sZW5jb2RlOmZ1bmN0aW9uKGEpe3ZhciBiLGM9XCJ7XCIsZD1cIlwiO2ZvcihiIGluIGEpaWYoYS5oYXNPd25Qcm9wZXJ0eShiKSl7aWYoIWIubWF0Y2goL15bYS16MC05XSskL2kpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBlbmNvZGU6IGludmFsaWQgcHJvcGVydHkgbmFtZVwiKTtjKz1kKydcIicrXG5iKydcIjonO2Q9XCIsXCI7c3dpdGNoKHR5cGVvZiBhW2JdKXtjYXNlIFwibnVtYmVyXCI6Y2FzZSBcImJvb2xlYW5cIjpjKz1hW2JdO2JyZWFrO2Nhc2UgXCJzdHJpbmdcIjpjKz0nXCInK2VzY2FwZShhW2JdKSsnXCInO2JyZWFrO2Nhc2UgXCJvYmplY3RcIjpjKz0nXCInK3NqY2wuY29kZWMuYmFzZTY0LmZyb21CaXRzKGFbYl0sMCkrJ1wiJzticmVhaztkZWZhdWx0OnRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJqc29uIGVuY29kZTogdW5zdXBwb3J0ZWQgdHlwZVwiKTt9fXJldHVybiBjK1wifVwifSxkZWNvZGU6ZnVuY3Rpb24oYSl7YT1hLnJlcGxhY2UoL1xccy9nLFwiXCIpO2lmKCFhLm1hdGNoKC9eXFx7LipcXH0kLykpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGRlY29kZTogdGhpcyBpc24ndCBqc29uIVwiKTthPWEucmVwbGFjZSgvXlxce3xcXH0kL2csXCJcIikuc3BsaXQoLywvKTt2YXIgYj17fSxjLGQ7Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKyl7aWYoIShkPWFbY10ubWF0Y2goL15cXHMqKD86KFtcIiddPykoW2Etel1bYS16MC05XSopXFwxKVxccyo6XFxzKig/OigtP1xcZCspfFwiKFthLXowLTkrXFwvJSpfLkA9XFwtXSopXCJ8KHRydWV8ZmFsc2UpKSQvaSkpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBkZWNvZGU6IHRoaXMgaXNuJ3QganNvbiFcIik7XG5udWxsIT1kWzNdP2JbZFsyXV09cGFyc2VJbnQoZFszXSwxMCk6bnVsbCE9ZFs0XT9iW2RbMl1dPWRbMl0ubWF0Y2goL14oY3R8YWRhdGF8c2FsdHxpdikkLyk/c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGRbNF0pOnVuZXNjYXBlKGRbNF0pOm51bGwhPWRbNV0mJihiW2RbMl1dPVwidHJ1ZVwiPT09ZFs1XSl9cmV0dXJuIGJ9LGo6ZnVuY3Rpb24oYSxiLGMpe3ZvaWQgMD09PWEmJihhPXt9KTtpZih2b2lkIDA9PT1iKXJldHVybiBhO2Zvcih2YXIgZCBpbiBiKWlmKGIuaGFzT3duUHJvcGVydHkoZCkpe2lmKGMmJnZvaWQgMCE9PWFbZF0mJmFbZF0hPT1iW2RdKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwicmVxdWlyZWQgcGFyYW1ldGVyIG92ZXJyaWRkZW5cIik7YVtkXT1iW2RdfXJldHVybiBhfSxyYTpmdW5jdGlvbihhLGIpe3ZhciBjPXt9LGQ7Zm9yKGQgaW4gYSlhLmhhc093blByb3BlcnR5KGQpJiZhW2RdIT09YltkXSYmKGNbZF09YVtkXSk7cmV0dXJuIGN9LHFhOmZ1bmN0aW9uKGEsXG5iKXt2YXIgYz17fSxkO2ZvcihkPTA7ZDxiLmxlbmd0aDtkKyspdm9pZCAwIT09YVtiW2RdXSYmKGNbYltkXV09YVtiW2RdXSk7cmV0dXJuIGN9fTtzamNsLmVuY3J5cHQ9c2pjbC5qc29uLmVuY3J5cHQ7c2pjbC5kZWNyeXB0PXNqY2wuanNvbi5kZWNyeXB0O3NqY2wubWlzYy5vYT17fTtzamNsLm1pc2MuY2FjaGVkUGJrZGYyPWZ1bmN0aW9uKGEsYil7dmFyIGM9c2pjbC5taXNjLm9hLGQ7Yj1ifHx7fTtkPWIuaXRlcnx8MUUzO2M9Y1thXT1jW2FdfHx7fTtkPWNbZF09Y1tkXXx8e2ZpcnN0U2FsdDpiLnNhbHQmJmIuc2FsdC5sZW5ndGg/Yi5zYWx0LnNsaWNlKDApOnNqY2wucmFuZG9tLnJhbmRvbVdvcmRzKDIsMCl9O2M9dm9pZCAwPT09Yi5zYWx0P2QuZmlyc3RTYWx0OmIuc2FsdDtkW2NdPWRbY118fHNqY2wubWlzYy5wYmtkZjIoYSxjLGIuaXRlcik7cmV0dXJue2tleTpkW2NdLnNsaWNlKDApLHNhbHQ6Yy5zbGljZSgwKX19O1xuXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9c2pjbCk7XCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lKFtdLGZ1bmN0aW9uKCl7cmV0dXJuIHNqY2x9KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgcHJlZml4ID0gJ34nO1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIHN0b3JhZ2UgZm9yIG91ciBgRUVgIG9iamVjdHMuXG4gKiBBbiBgRXZlbnRzYCBpbnN0YW5jZSBpcyBhIHBsYWluIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBldmVudCBuYW1lcy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEV2ZW50cygpIHt9XG5cbi8vXG4vLyBXZSB0cnkgdG8gbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuIEluIHNvbWUgZW5naW5lcyBjcmVhdGluZyBhblxuLy8gaW5zdGFuY2UgaW4gdGhpcyB3YXkgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBgT2JqZWN0LmNyZWF0ZShudWxsKWAgZGlyZWN0bHkuXG4vLyBJZiBgT2JqZWN0LmNyZWF0ZShudWxsKWAgaXMgbm90IHN1cHBvcnRlZCB3ZSBwcmVmaXggdGhlIGV2ZW50IG5hbWVzIHdpdGggYVxuLy8gY2hhcmFjdGVyIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90XG4vLyBvdmVycmlkZGVuIG9yIHVzZWQgYXMgYW4gYXR0YWNrIHZlY3Rvci5cbi8vXG5pZiAoT2JqZWN0LmNyZWF0ZSkge1xuICBFdmVudHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvL1xuICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGBfX3Byb3RvX19gIHByb3BlcnR5IGlzIHN0aWxsIGluaGVyaXRlZCBpblxuICAvLyBzb21lIG9sZCBicm93c2VycyBsaWtlIEFuZHJvaWQgNCwgaVBob25lIDUuMSwgT3BlcmEgMTEgYW5kIFNhZmFyaSA1LlxuICAvL1xuICBpZiAoIW5ldyBFdmVudHMoKS5fX3Byb3RvX18pIHByZWZpeCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCBlbWl0dGVyLCBvbmNlKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdKSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyLCBlbWl0dGVyLl9ldmVudHNDb3VudCsrO1xuICBlbHNlIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0uZm4pIGVtaXR0ZXIuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gW2VtaXR0ZXIuX2V2ZW50c1tldnRdLCBsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbi8qKlxuICogQ2xlYXIgZXZlbnQgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2dCBUaGUgRXZlbnQgbmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNsZWFyRXZlbnQoZW1pdHRlciwgZXZ0KSB7XG4gIGlmICgtLWVtaXR0ZXIuX2V2ZW50c0NvdW50ID09PSAwKSBlbWl0dGVyLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIGVsc2UgZGVsZXRlIGVtaXR0ZXIuX2V2ZW50c1tldnRdO1xufVxuXG4vKipcbiAqIE1pbmltYWwgYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgdmFyIG5hbWVzID0gW11cbiAgICAsIGV2ZW50c1xuICAgICwgbmFtZTtcblxuICBpZiAodGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHJldHVybiBuYW1lcztcblxuICBmb3IgKG5hbWUgaW4gKGV2ZW50cyA9IHRoaXMuX2V2ZW50cykpIHtcbiAgICBpZiAoaGFzLmNhbGwoZXZlbnRzLCBuYW1lKSkgbmFtZXMucHVzaChwcmVmaXggPyBuYW1lLnNsaWNlKDEpIDogbmFtZSk7XG4gIH1cblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHJldHVybiBuYW1lcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhldmVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBuYW1lcztcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuIFtdO1xuICBpZiAoaGFuZGxlcnMuZm4pIHJldHVybiBbaGFuZGxlcnMuZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gaGFuZGxlcnNbaV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBsaXN0ZW5pbmcgdG8gYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gbGlzdGVuZXJDb3VudChldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiAwO1xuICBpZiAobGlzdGVuZXJzLmZuKSByZXR1cm4gMTtcbiAgcmV0dXJuIGxpc3RlbmVycy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgY2FzZSA0OiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyLCBhMyk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogQWRkIGEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGxpc3RlbmVycyBvZiBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBtYXRjaCB0aGlzIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBoYXZlIHRoaXMgY29udGV4dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIHRoaXM7XG4gIGlmICghZm4pIHtcbiAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChcbiAgICAgIGxpc3RlbmVycy5mbiA9PT0gZm4gJiZcbiAgICAgICghb25jZSB8fCBsaXN0ZW5lcnMub25jZSkgJiZcbiAgICAgICghY29udGV4dCB8fCBsaXN0ZW5lcnMuY29udGV4dCA9PT0gY29udGV4dClcbiAgICApIHtcbiAgICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGV2ZW50cyA9IFtdLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fFxuICAgICAgICAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpIHx8XG4gICAgICAgIChjb250ZXh0ICYmIGxpc3RlbmVyc1tpXS5jb250ZXh0ICE9PSBjb250ZXh0KVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gICAgLy9cbiAgICBpZiAoZXZlbnRzLmxlbmd0aCkgdGhpcy5fZXZlbnRzW2V2dF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICAgIGVsc2UgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0O1xuXG4gIGlmIChldmVudCkge1xuICAgIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG4gICAgaWYgKHRoaXMuX2V2ZW50c1tldnRdKSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBBbGxvdyBgRXZlbnRFbWl0dGVyYCB0byBiZSBpbXBvcnRlZCBhcyBtb2R1bGUgbmFtZXNwYWNlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG4iLCAiY29uc3QgZGVmYXVsdEVycm9yQ29uZmlnID0ge1xyXG4gICAgd2l0aFN0YWNrVHJhY2U6IGZhbHNlLFxyXG59O1xyXG4vLyBDdXN0b20gZXJyb3Igb2JqZWN0XHJcbi8vIENvbnRleHQgLyBkaXNjdXNzaW9uOiBodHRwczovL2dpdGh1Yi5jb20vc3VwZXJtYWNyby9uZXZlcnRocm93L3B1bGwvMjE1XHJcbmNvbnN0IGNyZWF0ZU5ldmVyVGhyb3dFcnJvciA9IChtZXNzYWdlLCByZXN1bHQsIGNvbmZpZyA9IGRlZmF1bHRFcnJvckNvbmZpZykgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHJlc3VsdC5pc09rKClcclxuICAgICAgICA/IHsgdHlwZTogJ09rJywgdmFsdWU6IHJlc3VsdC52YWx1ZSB9XHJcbiAgICAgICAgOiB7IHR5cGU6ICdFcnInLCB2YWx1ZTogcmVzdWx0LmVycm9yIH07XHJcbiAgICBjb25zdCBtYXliZVN0YWNrID0gY29uZmlnLndpdGhTdGFja1RyYWNlID8gbmV3IEVycm9yKCkuc3RhY2sgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBzdGFjazogbWF5YmVTdGFjayxcclxuICAgIH07XHJcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG5cclxuZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG50eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcblxuY2xhc3MgUmVzdWx0QXN5bmMge1xyXG4gICAgY29uc3RydWN0b3IocmVzKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHJlcztcclxuICAgIH1cclxuICAgIHN0YXRpYyBmcm9tU2FmZVByb21pc2UocHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb21pc2UgPSBwcm9taXNlLnRoZW4oKHZhbHVlKSA9PiBuZXcgT2sodmFsdWUpKTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG5ld1Byb21pc2UpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb21Qcm9taXNlKHByb21pc2UsIGVycm9yRm4pIHtcclxuICAgICAgICBjb25zdCBuZXdQcm9taXNlID0gcHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IG5ldyBPayh2YWx1ZSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gbmV3IEVycihlcnJvckZuKGUpKSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuZXdQcm9taXNlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBzdGF0aWMgZnJvbVRocm93YWJsZShmbiwgZXJyb3JGbikge1xyXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKCgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZm4oLi4uYXJncykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoZXJyb3JGbiA/IGVycm9yRm4oZXJyb3IpIDogZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSkoKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21iaW5lKGFzeW5jUmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0QXN5bmNMaXN0KGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29tYmluZVdpdGhBbGxFcnJvcnMoYXN5bmNSZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzKGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZihyZXMudmFsdWUpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgYW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3UmVzID0geWllbGQgZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3UmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKG5ld1Jlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRlZSBkb2VzIG5vdCBjYXJlIGFib3V0IHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgbWFwRXJyKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNPaygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoeWllbGQgZihyZXMuZXJyb3IpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWUgaW5zdGFuY2VvZiBSZXN1bHRBc3luYyA/IG5ld1ZhbHVlLl9wcm9taXNlIDogbmV3VmFsdWU7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIG9yRWxzZShmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBtYXRjaChvaywgX2Vycikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gcmVzLm1hdGNoKG9rLCBfZXJyKSk7XHJcbiAgICB9XHJcbiAgICB1bndyYXBPcih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiByZXMudW53cmFwT3IodCkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCB3aWxsIGJlIHJlbW92ZWQgaW4gOS4wLjAuXHJcbiAgICAgKlxyXG4gICAgICogWW91IGNhbiB1c2UgYHNhZmVUcnlgIHdpdGhvdXQgdGhpcyBtZXRob2QuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYGBgdHlwZXNjcmlwdFxyXG4gICAgICogc2FmZVRyeShhc3luYyBmdW5jdGlvbiogKCkge1xyXG4gICAgICogICBjb25zdCBva1ZhbHVlID0geWllbGQqIHlvdXJSZXN1bHRcclxuICAgICAqIH0pXHJcbiAgICAgKiBgYGBcclxuICAgICAqIEVtdWxhdGVzIFJ1c3QncyBgP2Agb3BlcmF0b3IgaW4gYHNhZmVUcnlgJ3MgYm9keS4gU2VlIGFsc28gYHNhZmVUcnlgLlxyXG4gICAgICovXHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24qIHNhZmVVbndyYXBfMSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9fYXdhaXQoeWllbGQgX19hd2FpdCh5aWVsZCogX19hc3luY0RlbGVnYXRvcihfX2FzeW5jVmFsdWVzKHlpZWxkIF9fYXdhaXQodGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHJlcy5zYWZlVW53cmFwKCkpKSkpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlcyBSZXN1bHRBc3luYyBpbXBsZW1lbnQgUHJvbWlzZUxpa2U8UmVzdWx0PlxyXG4gICAgdGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpIHtcclxuICAgICAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBfYSgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgX19hd2FpdCh0aGlzLl9wcm9taXNlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICAgICAgICAgIHlpZWxkIHlpZWxkIF9fYXdhaXQoZXJyQXN5bmMocmVzdWx0LmVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCBfX2F3YWl0KHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuY29uc3Qgb2tBc3luYyA9ICh2YWx1ZSkgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgT2sodmFsdWUpKSk7XHJcbmNvbnN0IGVyckFzeW5jID0gKGVycikgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgRXJyKGVycikpKTtcclxuY29uc3QgZnJvbVByb21pc2UgPSBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZTtcclxuY29uc3QgZnJvbVNhZmVQcm9taXNlID0gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlO1xyXG5jb25zdCBmcm9tQXN5bmNUaHJvd2FibGUgPSBSZXN1bHRBc3luYy5mcm9tVGhyb3dhYmxlO1xuXG4vKipcclxuICogU2hvcnQgY2lyY3VpdHMgb24gdGhlIEZJUlNUIEVyciB2YWx1ZSB0aGF0IHdlIGZpbmRcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRMaXN0ID0gKHJlc3VsdExpc3QpID0+IHtcclxuICAgIGxldCBhY2MgPSBvayhbXSk7XHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgIGFjYyA9IGVycihyZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFjYy5tYXAoKGxpc3QpID0+IGxpc3QucHVzaChyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG59O1xyXG4vKiBUaGlzIGlzIHRoZSB0eXBlc2FmZSB2ZXJzaW9uIG9mIFByb21pc2UuYWxsXHJcbiAqXHJcbiAqIFRha2VzIGEgbGlzdCBvZiBSZXN1bHRBc3luYzxULCBFPiBhbmQgc3VjY2VzcyBpZiBhbGwgaW5uZXIgcmVzdWx0cyBhcmUgT2sgdmFsdWVzXHJcbiAqIG9yIGZhaWxzIGlmIG9uZSAob3IgbW9yZSkgb2YgdGhlIGlubmVyIHJlc3VsdHMgYXJlIEVyciB2YWx1ZXNcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3QgPSAoYXN5bmNSZXN1bHRMaXN0KSA9PiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoUHJvbWlzZS5hbGwoYXN5bmNSZXN1bHRMaXN0KSkuYW5kVGhlbihjb21iaW5lUmVzdWx0TGlzdCk7XHJcbi8qKlxyXG4gKiBHaXZlIGEgbGlzdCBvZiBhbGwgdGhlIGVycm9ycyB3ZSBmaW5kXHJcbiAqL1xyXG5jb25zdCBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMgPSAocmVzdWx0TGlzdCkgPT4ge1xyXG4gICAgbGV0IGFjYyA9IG9rKFtdKTtcclxuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdExpc3QpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgYWNjLmVycm9yLnB1c2gocmVzdWx0LmVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzT2soKSkge1xyXG4gICAgICAgICAgICBhY2MgPSBlcnIoW3Jlc3VsdC5lcnJvcl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXN1bHQuaXNPaygpICYmIGFjYy5pc09rKCkpIHtcclxuICAgICAgICAgICAgYWNjLnZhbHVlLnB1c2gocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZG8gbm90aGluZyB3aGVuIHJlc3VsdC5pc09rKCkgJiYgYWNjLmlzRXJyKClcclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbn07XHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzID0gKGFzeW5jUmVzdWx0TGlzdCkgPT4gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlKFByb21pc2UuYWxsKGFzeW5jUmVzdWx0TGlzdCkpLmFuZFRoZW4oY29tYmluZVJlc3VsdExpc3RXaXRoQWxsRXJyb3JzKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcclxudmFyIFJlc3VsdDtcclxuKGZ1bmN0aW9uIChSZXN1bHQpIHtcclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgYSBmdW5jdGlvbiB3aXRoIGEgdHJ5IGNhdGNoLCBjcmVhdGluZyBhIG5ldyBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lXHJcbiAgICAgKiBhcmd1bWVudHMgYnV0IHJldHVybmluZyBgT2tgIGlmIHN1Y2Nlc3NmdWwsIGBFcnJgIGlmIHRoZSBmdW5jdGlvbiB0aHJvd3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24gdG8gd3JhcCB3aXRoIG9rIG9uIHN1Y2Nlc3Mgb3IgZXJyIG9uIGZhaWx1cmVcclxuICAgICAqIEBwYXJhbSBlcnJvckZuIHdoZW4gYW4gZXJyb3IgaXMgdGhyb3duLCB0aGlzIHdpbGwgd3JhcCB0aGUgZXJyb3IgcmVzdWx0IGlmIHByb3ZpZGVkXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBmdW5jdGlvbiBmcm9tVGhyb3dhYmxlKGZuLCBlcnJvckZuKSB7XHJcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbiguLi5hcmdzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvayhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyKGVycm9yRm4gPyBlcnJvckZuKGUpIDogZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmZyb21UaHJvd2FibGUgPSBmcm9tVGhyb3dhYmxlO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZShyZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRMaXN0KHJlc3VsdExpc3QpO1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmNvbWJpbmUgPSBjb21iaW5lO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZVdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuY29tYmluZVdpdGhBbGxFcnJvcnMgPSBjb21iaW5lV2l0aEFsbEVycm9ycztcclxufSkoUmVzdWx0IHx8IChSZXN1bHQgPSB7fSkpO1xyXG5jb25zdCBvayA9ICh2YWx1ZSkgPT4gbmV3IE9rKHZhbHVlKTtcclxuZnVuY3Rpb24gZXJyKGVycikge1xyXG4gICAgcmV0dXJuIG5ldyBFcnIoZXJyKTtcclxufVxyXG5mdW5jdGlvbiBzYWZlVHJ5KGJvZHkpIHtcclxuICAgIGNvbnN0IG4gPSBib2R5KCkubmV4dCgpO1xyXG4gICAgaWYgKG4gaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuLnRoZW4oKHIpID0+IHIudmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuLnZhbHVlO1xyXG59XHJcbmNsYXNzIE9rIHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaXNPaygpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlzRXJyKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc09rKCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBvayhmKHRoaXMudmFsdWUpKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcEVycihfZikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaGVuKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKS5tYXAoKF92YWx1ZSkgPT4gdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGYodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRlZSBkb2Vzbid0IGNhcmUgYWJvdXQgdGhlIGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBvckVsc2UoX2YpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhc3luY0FuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFzeW5jQW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSkubWFwKCgpID0+IHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgYXN5bmNNYXAoZikge1xyXG4gICAgICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoZih0aGlzLnZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICB1bndyYXBPcihfdikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWF0Y2gob2ssIF9lcnIpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS15aWVsZCAqL1xyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKF8pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXBFcnIoY29uZmlnKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yKCdDYWxsZWQgYF91bnNhZmVVbndyYXBFcnJgIG9uIGFuIE9rJywgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcywgcmVxdWlyZS15aWVsZFxyXG4gICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEVyciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgIH1cclxuICAgIGlzT2soKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNFcnIoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzT2soKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBtYXBFcnIoZikge1xyXG4gICAgICAgIHJldHVybiBlcnIoZih0aGlzLmVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUaHJvdWdoKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgb3JFbHNlKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jQW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFzeW5jQW5kVGhyb3VnaChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jTWFwKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgdW53cmFwT3Iodikge1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG4gICAgbWF0Y2goX29rLCBlcnIpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2FmZVVud3JhcCgpIHtcclxuICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuZXJyb3I7XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB5aWVsZCBlcnIoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgdGhpcyBnZW5lcmF0b3Igb3V0IG9mIGBzYWZlVHJ5YCcpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKGNvbmZpZykge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZU5ldmVyVGhyb3dFcnJvcignQ2FsbGVkIGBfdW5zYWZlVW53cmFwYCBvbiBhbiBFcnInLCB0aGlzLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcEVycihfKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3I7XHJcbiAgICB9XHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgeWllbGQgc2VsZjtcclxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxufVxyXG5jb25zdCBmcm9tVGhyb3dhYmxlID0gUmVzdWx0LmZyb21UaHJvd2FibGU7XHJcbi8vI2VuZHJlZ2lvblxuXG5leHBvcnQgeyBFcnIsIE9rLCBSZXN1bHQsIFJlc3VsdEFzeW5jLCBlcnIsIGVyckFzeW5jLCBmcm9tQXN5bmNUaHJvd2FibGUsIGZyb21Qcm9taXNlLCBmcm9tU2FmZVByb21pc2UsIGZyb21UaHJvd2FibGUsIG9rLCBva0FzeW5jLCBzYWZlVHJ5IH07XG4iLCAidHlwZSBKc29uYWJsZSA9XG4gIHwgc3RyaW5nXG4gIHwgbnVtYmVyXG4gIHwgYm9vbGVhblxuICB8IG51bGxcbiAgfCB1bmRlZmluZWRcbiAgfCByZWFkb25seSBKc29uYWJsZVtdXG4gIHwgeyByZWFkb25seSBba2V5OiBzdHJpbmddOiBKc29uYWJsZSB9XG4gIHwgeyB0b0pTT04oKTogSnNvbmFibGUgfTtcblxuZXhwb3J0IGNsYXNzIEJhc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbnRleHQ/OiBKc29uYWJsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIG9wdGlvbnM6IHsgY2F1c2U/OiBFcnJvcjsgY29udGV4dD86IEpzb25hYmxlIH0gPSB7fSxcbiAgKSB7XG4gICAgY29uc3QgeyBjYXVzZSwgY29udGV4dCB9ID0gb3B0aW9ucztcblxuICAgIHN1cGVyKG1lc3NhZ2UsIHsgY2F1c2UgfSk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgfVxufVxuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIFdlYlNvY2tldEVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgV2ViU29ja2V0RXJyb3IgfSBmcm9tIFwifi9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXRDb25uZWN0aW9uRXJyb3IgZXh0ZW5kcyBXZWJTb2NrZXRFcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2UgPSBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNvbm5lY3QgdG8gV2ViU29ja2V0XCI7XG59XG4iLCAiaW1wb3J0IHsgZXJyQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IENvbm5lY3Rpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Nvbm5lY3Rpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IFNlcnZlckVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivc2VydmVyLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlckNvbmZpZyB9IGZyb20gXCJ+L2ludGVyZmFjZS9zZXJ2ZXItY29uZmlnLnRzXCI7XG5cbi8qKlxuICogRW5zdXJlIGFuIGVycm9yIG1lc3NhZ2UgaXMgdHJhbnNmb3JtZWQgaW4gYW4gRXJyb3Igb2JqZWN0XG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5zdXJlRXJyb3IgPSAodmFsdWU6IHVua25vd24pOiBFcnJvciA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsdWU7XG5cbiAgbGV0IHN0cmluZ2lmaWVkID0gXCJbVW5hYmxlIHRvIHN0cmluZ2lmeSB0aGUgdGhyb3duIHZhbHVlXVwiO1xuICB0cnkge1xuICAgIHN0cmluZ2lmaWVkID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAvKiBlbXB0eSAqL1xuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihzdHJpbmdpZmllZCk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIEx1ZmkncyBjb25maWcgZnJvbSBpdHMgQVBJXG4gKlxuICogQHBhcmFtIGluc3RhbmNlVXJsXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTZXJ2ZXJDb25maWcgPSAoXG4gIGluc3RhbmNlVXJsOiBVUkwsXG4pOiBSZXN1bHRBc3luYzxTZXJ2ZXJDb25maWcsIEVycm9yPiA9PiB7XG4gIGNvbnN0IG9yaWdpbk1hdGNoZXMgPSBpbnN0YW5jZVVybC5ocmVmLm1hdGNoKFxuICAgIC8oLio/KVxcLz8oPzpcXC9bZHJdezF9XFwvfGxvZ2luXFwvP3xmaWxlc1xcLz8pLyxcbiAgKTtcblxuICBjb25zdCB1cmxPcmlnaW4gPSBvcmlnaW5NYXRjaGVzICYmIG9yaWdpbk1hdGNoZXNbMV1cbiAgICA/IG9yaWdpbk1hdGNoZXNbMV1cbiAgICA6IGluc3RhbmNlVXJsLm9yaWdpbjtcblxuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgZmV0Y2godXJsT3JpZ2luICsgXCIvYWJvdXQvY29uZmlnXCIpLFxuICAgIChlcnJvcikgPT5cbiAgICAgIG5ldyBDb25uZWN0aW9uRXJyb3IodW5kZWZpbmVkLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgKS5hbmRUaGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgICAgICByZXNwb25zZS5qc29uKCksXG4gICAgICAgIChlcnJvcikgPT4gZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgICBuZXcgU2VydmVyRXJyb3IodW5kZWZpbmVkLCB7IGNvbnRleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQgfSksXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNEZW5vUnVudGltZSA9ICgpOiBib29sZWFuID0+IHR5cGVvZiBEZW5vICE9PSBcInVuZGVmaW5lZFwiO1xuXG5leHBvcnQgY29uc3QgaXNTZWN1cmVDb250ZXh0ID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gaXNEZW5vUnVudGltZSgpIHx8IGdsb2JhbFRoaXMuaXNTZWN1cmVDb250ZXh0IHx8XG4gICAgZ2xvYmFsVGhpcy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcbn07XG5cbmV4cG9ydCBjb25zdCB3b3JrZXJVcmwgPSAocmVsYXRpdmVQYXRoOiBzdHJpbmcpOiBVUkwgPT4ge1xuICByZXR1cm4gaXNEZW5vUnVudGltZSgpXG4gICAgPyBuZXcgVVJMKGAuL3dvcmtlci8ke3JlbGF0aXZlUGF0aH0udHNgLCBuZXcgVVJMKFwiLlwiLCBpbXBvcnQubWV0YS51cmwpLmhyZWYpXG4gICAgOiBuZXcgVVJMKFxuICAgICAgaW1wb3J0Lm1ldGEucmVzb2x2ZShcbiAgICAgICAgYC4vJHtcbiAgICAgICAgICByZWxhdGl2ZVBhdGggIT09IFwiZW5jcnlwdFwiID8gYHdvcmtlci8ke3JlbGF0aXZlUGF0aH1gIDogcmVsYXRpdmVQYXRoXG4gICAgICAgIH0uanNgLFxuICAgICAgKSxcbiAgICApO1xufTtcbiIsICJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7IFdPUktFUl9BQ1RJT04gfSBmcm9tIFwifi9lbnVtL3dvcmtlci1hY3Rpb24udHNcIjtcbmltcG9ydCB0eXBlIHsgTHVmaUZpbGUgfSBmcm9tIFwifi9lbnRpdGllcy9sdWZpLWZpbGUudHNcIjtcbmltcG9ydCB0eXBlIHsgV29ya2VyQWN0aW9uTWVzc2FnZSB9IGZyb20gXCJ+L2ludGVyZmFjZS93b3JrZXItYWN0aW9uLW1lc3NhZ2UudHNcIjtcbmltcG9ydCB7IEVWRU5UIH0gZnJvbSBcIn4vZW51bS9ldmVudC50c1wiO1xuaW1wb3J0IHsgVVBMT0FEX1NUQVRVUyB9IGZyb20gXCJ+L2VudW0vZmlsZS1zdGF0dXMudHNcIjtcbmltcG9ydCB0eXBlIHsgV29ya2VyRXZlbnQgfSBmcm9tIFwifi9pbnRlcmZhY2Uvd29ya2VyLWV2ZW50LnRzXCI7XG5cbmRlY2xhcmUgbGV0IHNlbGY6IFdvcmtlcjtcblxuZXhwb3J0IGNvbnN0IGV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuLyoqXG4gKiBVcGRhdGUgZmlsZSBpbiB3b3JrZXJzIGFuZCBwcm92aWRlIG1vZGlmaWNhdGlvbnMgdG8gdGhlIG1haW4gdGhyZWFkXG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcGFyYW0gYXJnc1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUZpbGUgPSAobHVmaUZpbGU6IEx1ZmlGaWxlLCBhcmdzOiBQYXJ0aWFsPEx1ZmlGaWxlPikgPT4ge1xuICBPYmplY3QuYXNzaWduKGx1ZmlGaWxlLCBhcmdzKTtcblxuICBpZiAodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICBldmVudDogRVZFTlQuRklMRV9VUERBVEVELFxuICAgICAgbHVmaUZpbGUsXG4gICAgfSBhcyBXb3JrZXJFdmVudCk7XG4gIH1cblxuICByZXR1cm4gbHVmaUZpbGU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VuZEZpbGVFcnJvciA9IChsdWZpRmlsZTogTHVmaUZpbGUsIGVycm9yOiBFcnJvcikgPT4ge1xuICB1cGRhdGVGaWxlKGx1ZmlGaWxlLCB7IHVwbG9hZFN0YXR1czogVVBMT0FEX1NUQVRVUy5GQUlMRUQgfSk7XG5cbiAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvciB9IGFzIFdvcmtlckV2ZW50KTtcbn07XG5cbi8qKlxuICogSW5pdCBmdW5jdGlvbiB0byBiZSBjYWxsZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBlYWNoIGNoaWxkIHdvcmtlcidzIG9ubWVzc2FnZSBldmVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIGV2ZW50cy5vbmNlKEVWRU5ULlNPQ0tFVF9PUEVORUQsICgpID0+IHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgIGV2ZW50OiBFVkVOVC5TT0NLRVRfT1BFTkVELFxuICAgIH0pO1xuICB9KTtcblxuICBldmVudHMub25jZShFVkVOVC5PUEVSQVRJT05fRkFJTEVELCAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvciB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNXb3JrZXJBY3Rpb25NZXNzYWdlID0gKFxuICAvLyBkZW5vLWxpbnQtaWdub3JlIG5vLWV4cGxpY2l0LWFueVxuICBtZXNzYWdlOiBhbnksXG4pOiBtZXNzYWdlIGlzIFdvcmtlckFjdGlvbk1lc3NhZ2UgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBtZXNzYWdlID09PSBcIm9iamVjdFwiICYmXG4gICAgbWVzc2FnZSAhPT0gbnVsbCAmJlxuICAgIFwiYWN0aW9uXCIgaW4gbWVzc2FnZSAmJlxuICAgIE9iamVjdC52YWx1ZXMoV09SS0VSX0FDVElPTikuaW5jbHVkZXMobWVzc2FnZS5hY3Rpb24pXG4gICk7XG59O1xuIiwgbnVsbCwgbnVsbCwgbnVsbCwgImltcG9ydCB7XG4gIERlY29kZSBhcyBiNjRkZWNvZGUsXG4gIEVuY29kZSBhcyBiNjRlbmNvZGUsXG59IGZyb20gXCJhcnJheWJ1ZmZlci1lbmNvZGluZy9iYXNlNjRcIjtcbmltcG9ydCB7IGVyckFzeW5jLCBva0FzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgc2pjbCBmcm9tIFwibHVmaS1zamNsXCI7XG5pbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IENyeXB0b0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2NyeXB0by1lcnJvci50c1wiO1xuaW1wb3J0IHsgRGVjcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2RlY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCB7IGVuc3VyZUVycm9yIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB7IEhhc2hpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzXCI7XG5cbi8qKlxuICogRGVjcnlwdCBhbiBFbmNyeXB0ZWREYXRhIG9yIGEgc3RyaW5nIHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvbi5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gZW5jcnlwdGVkRGF0YVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICBlbmNyeXB0ZWREYXRhOiBFbmNyeXB0ZWREYXRhIHwgc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8QXJyYXlCdWZmZXIsIERlY3J5cHRpb25FcnJvcj4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSB0eXBlb2YgZW5jcnlwdGVkRGF0YSA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBlbmNyeXB0ZWREYXRhXG4gICAgICA6IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShlbmNyeXB0ZWREYXRhLmRhdGEgYXMgQXJyYXlCdWZmZXIpO1xuXG4gICAgcmV0dXJuIG9rQXN5bmMoYjY0ZGVjb2RlKHNqY2wuZGVjcnlwdChrZXksIGRhdGEpKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IERlY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEVuY3J5cHQgYW4gQXJyYXlCdWZmZXIgaW50byBhbiBFbmNyeXB0ZWREYXRhIHVzaW5nIHRoZSBwcm92aWRlZCBrZXlcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuKTogUmVzdWx0QXN5bmM8RW5jcnlwdGVkRGF0YSwgRW5jcnlwdGlvbkVycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZW5jcnlwdGVkID0gc2pjbC5lbmNyeXB0KGtleSwgYjY0ZW5jb2RlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gb2tBc3luYyh7XG4gICAgICBhbGdvOiBDcnlwdG9BbGdvcml0aG0uU2pjbCxcbiAgICAgIGRhdGE6IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShlbmNyeXB0ZWQpLmJ1ZmZlcixcbiAgICAgIGl2OiBKU09OLnBhcnNlKGVuY3J5cHRlZCBhcyB1bmtub3duIGFzIHN0cmluZykuaXYsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IEVuY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZyB1c2luZyBTamNsIEFQSVxuICpcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleSA9ICgpOiBSZXN1bHRBc3luYzxzdHJpbmcsIENyeXB0b0Vycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG9rQXN5bmMoc2pjbC5jb2RlYy5iYXNlNjQuZnJvbUJpdHMoc2pjbC5yYW5kb20ucmFuZG9tV29yZHMoOCwgMTApKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGdlbmVyYXRlIGtleVwiLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEhhc2ggYSBwYXNzd29yZCB1c2luZyBTamNsIEFQSVxuICpcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgSGFzaGluZ0Vycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG9rQXN5bmMoc2pjbC5jb2RlYy5oZXguZnJvbUJpdHMoc2pjbC5oYXNoLnNoYTUxMi5oYXNoKHBhc3N3b3JkKSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJBc3luYyhuZXcgSGFzaGluZ0Vycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXRlY3QgaWYgdGhlIGtleSBoYXMgYmVlbiBnZW5lcmF0ZWQgYnkgU2pjbC4gU2luY2Ugd2UncmUgbm90IGdlbmVyYXRpbmcgYW4gZXF1YWwgc3ltYm9sIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZyB3aXRoIHRoZSBXZWJDcnlwdG8gQVBJIChieSB1c2luZyBiYXNlNjR1cmwpLCBpdCdzIGVhc3kgdG8gZGV0ZWN0XG4gKlxuICogQHBhcmFtIGtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2pjbEtleSA9IChrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4ga2V5W2tleS5sZW5ndGggLSAxXSA9PT0gXCI9XCI7XG59O1xuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIENyeXB0b0Vycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBEZWNyeXB0aW9uRXJyb3IgZXh0ZW5kcyBDcnlwdG9FcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2U6IHN0cmluZyA9IFwiVW5hYmxlIHRvIGRlY3J5cHQgdGhlIHByb3ZpZGVkIGRhdGFcIjtcbn1cbiIsICJpbXBvcnQgeyBDcnlwdG9FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9jcnlwdG8tZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIEVuY3J5cHRpb25FcnJvciBleHRlbmRzIENyeXB0b0Vycm9yIHtcbiAgb3ZlcnJpZGUgbWVzc2FnZTogc3RyaW5nID0gXCJVbmFibGUgdG8gZW5jcnlwdCB0aGUgcHJvdmlkZWQgZGF0YVwiO1xufVxuIiwgImltcG9ydCB7XG4gIERlY29kZSBhcyBiNjR1cmxkZWNvZGUsXG4gIEVuY29kZSBhcyBiNjR1cmxlbmNvZGUsXG59IGZyb20gXCJhcnJheWJ1ZmZlci1lbmNvZGluZy9iYXNlNjQvdXJsXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCB7IENyeXB0b0FsZ29yaXRobSB9IGZyb20gXCJ+L2VudW0vY3J5cHRvLWFsZ29yaXRobS50c1wiO1xuaW1wb3J0IHsgRGVjcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2RlY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IG9rQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IGVuc3VyZUVycm9yIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBDcnlwdG9FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9jcnlwdG8tZXJyb3IudHNcIjtcbmltcG9ydCB7IEhhc2hpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzXCI7XG5cbi8qKlxuICogRGVjcnlwdCBhbiBlbmNyeXB0ZWREYXRhIHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvblxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBlbmNyeXB0ZWRcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkZWNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgZW5jcnlwdGVkOiBFbmNyeXB0ZWREYXRhLFxuKTogUmVzdWx0QXN5bmM8QXJyYXlCdWZmZXIsIERlY3J5cHRpb25FcnJvcj4gPT4ge1xuICByZXR1cm4gaW1wb3J0S2V5KGtleSkuYW5kVGhlbigoaW1wb3J0ZWRLZXkpID0+XG4gICAgUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICBjcnlwdG8uc3VidGxlLmRlY3J5cHQoXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIkFFUy1HQ01cIixcbiAgICAgICAgICBpdjogZW5jcnlwdGVkLml2IGFzIFVpbnQ4QXJyYXksXG4gICAgICAgIH0sXG4gICAgICAgIGltcG9ydGVkS2V5LFxuICAgICAgICBlbmNyeXB0ZWQuZGF0YSBhcyBBcnJheUJ1ZmZlcixcbiAgICAgICksXG4gICAgICAoZXJyb3IpID0+IG5ldyBEZWNyeXB0aW9uRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICAgKVxuICApO1xufTtcblxuLyoqXG4gKiBFbmNyeXB0IGFuIEFycmF5QnVmZmVyIGludG8gYW4gRW5jcnlwdGVkRGF0YSB1c2luZyB0aGUgcHJvdmlkZWQga2V5XG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuKTogUmVzdWx0QXN5bmM8RW5jcnlwdGVkRGF0YSwgRW5jcnlwdGlvbkVycm9yPiA9PiB7XG4gIHJldHVybiBpbXBvcnRLZXkoa2V5KS5hbmRUaGVuKChpbXBvcnRlZEtleSkgPT4ge1xuICAgIGNvbnN0IGl2ID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxMikpO1xuICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgIGNyeXB0by5zdWJ0bGUuZW5jcnlwdChcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiQUVTLUdDTVwiLFxuICAgICAgICAgIGl2LFxuICAgICAgICB9LFxuICAgICAgICBpbXBvcnRlZEtleSxcbiAgICAgICAgdmFsdWUsXG4gICAgICApLFxuICAgICAgKGVycm9yKSA9PlxuICAgICAgICBuZXcgRW5jcnlwdGlvbkVycm9yKHVuZGVmaW5lZCwge1xuICAgICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICAgIH0pLFxuICAgICkuYW5kVGhlbigoZW5jcnlwdGVkKSA9PiB7XG4gICAgICByZXR1cm4gb2tBc3luYyh7XG4gICAgICAgIGFsZ286IENyeXB0b0FsZ29yaXRobS5XZWJDcnlwdG8sXG4gICAgICAgIGRhdGE6IGVuY3J5cHRlZCxcbiAgICAgICAgaXYsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHN0cmluZyBpbnRvIGEgQ3J5cHRvS2V5LCB1c2FibGUgaW4gV2ViIENyeXB0byBBUElcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaW1wb3J0S2V5ID0gKGtleTogc3RyaW5nKTogUmVzdWx0QXN5bmM8Q3J5cHRvS2V5LCBDcnlwdG9FcnJvcj4gPT4ge1xuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgICBcInJhd1wiLFxuICAgICAgYjY0dXJsZGVjb2RlKGtleSksXG4gICAgICB7IG5hbWU6IFwiQUVTLUdDTVwiIH0sXG4gICAgICBmYWxzZSxcbiAgICAgIFtcbiAgICAgICAgXCJlbmNyeXB0XCIsXG4gICAgICAgIFwiZGVjcnlwdFwiLFxuICAgICAgXSxcbiAgICApLFxuICAgIChlcnJvcikgPT5cbiAgICAgIG5ldyBDcnlwdG9FcnJvcihcIlVuYWJsZSB0byBpbXBvcnQgY3J5cHRvZ3JhcGh5IGtleVwiLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nIHVzaW5nIFdlYiBDcnlwdG8gQVBJLlxuICpcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleSA9ICgpOiBSZXN1bHRBc3luYzxzdHJpbmcsIENyeXB0b0Vycm9yPiA9PiB7XG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgY3J5cHRvLnN1YnRsZVxuICAgICAgICAuZ2VuZXJhdGVLZXkoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJBRVMtR0NNXCIsXG4gICAgICAgICAgICBsZW5ndGg6IDI1NixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgW1wiZW5jcnlwdFwiLCBcImRlY3J5cHRcIl0sXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKGdlbmVyYXRlZEtleSkgPT5cbiAgICAgICAgICBjcnlwdG8uc3VidGxlXG4gICAgICAgICAgICAuZXhwb3J0S2V5KFwicmF3XCIsIGdlbmVyYXRlZEtleSlcbiAgICAgICAgICAgIC50aGVuKChrZXkpID0+IHJlc29sdmUoYjY0dXJsZW5jb2RlKGtleSkpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGJhc2U2NCBlbmNvZGUgdGhlIHVybFwiLCB7XG4gICAgICAgICAgICAgICAgICBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKVxuICAgICksXG4gICAgKGVycm9yKSA9PlxuICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGdlbmVyYXRlIGtleVwiLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICk7XG59O1xuXG4vKipcbiAqIEhhc2ggYSBwYXNzd29yZCB1c2luZyBXZWJDcnlwdG8gQVBJXG4gKlxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaGFzaFBhc3N3b3JkID0gKFxuICBwYXNzd29yZDogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBIYXNoaW5nRXJyb3I+ID0+IHtcbiAgY29uc3QgcHJvbWlzZSA9IGFzeW5jICgpID0+IHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcbiAgICAgIG5ldyBVaW50OEFycmF5KFxuICAgICAgICBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChcbiAgICAgICAgICBcIlNIQS01MTJcIixcbiAgICAgICAgICBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocGFzc3dvcmQpLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLm1hcCgoYikgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpKS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBwcm9taXNlKCksXG4gICAgKGVycm9yKSA9PiBuZXcgSGFzaGluZ0Vycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICApO1xufTtcbiIsICJpbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB0eXBlIHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IERlY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9kZWNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCAqIGFzIHNqY2wgZnJvbSBcIn4vYXBpL2NyeXB0by9zamNsLnRzXCI7XG5pbXBvcnQgKiBhcyB3ZWIgZnJvbSBcIn4vYXBpL2NyeXB0by93ZWIudHNcIjtcbmltcG9ydCB0eXBlIHsgSGFzaGluZ0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2hhc2hpbmctZXJyb3IudHNcIjtcblxuLyoqXG4gKiBEZWNyeXB0IGFuIEVuY3J5cHRlZERhdGEgb2JqZWN0IHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvblxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICB2YWx1ZTogRW5jcnlwdGVkRGF0YSxcbik6IFJlc3VsdEFzeW5jPEFycmF5QnVmZmVyLCBEZWNyeXB0aW9uRXJyb3I+ID0+XG4gIHZhbHVlLmFsZ28gPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5hbGdvID09PSBDcnlwdG9BbGdvcml0aG0uU2pjbFxuICAgID8gc2pjbC5kZWNyeXB0KGtleSwgdmFsdWUpXG4gICAgOiB3ZWIuZGVjcnlwdChrZXksIHZhbHVlKTtcblxuLyoqXG4gKiBFbmNyeXB0IGFuIEFycmF5QnVmZmVyIHVzaW5nIHRoZSBwcm92aWRlZCBrZXkgYW5kIGFsZ29yaXRobVxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIGFsZ29cbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuICBhbGdvOiBDcnlwdG9BbGdvcml0aG0sXG4pOiBSZXN1bHRBc3luYzxFbmNyeXB0ZWREYXRhLCBFbmNyeXB0aW9uRXJyb3I+ID0+XG4gIChhbGdvID09PSBDcnlwdG9BbGdvcml0aG0uU2pjbClcbiAgICA/IHNqY2wuZW5jcnlwdChrZXksIHZhbHVlKVxuICAgIDogd2ViLmVuY3J5cHQoa2V5LCB2YWx1ZSk7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBuZXcga2V5IGZvciBlbmNyeXB0aW9uL2RlY3J5cHRpb25cbiAqXG4gKiBAcGFyYW0gYWxnb1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlS2V5ID0gKFxuICBhbGdvID0gQ3J5cHRvQWxnb3JpdGhtLldlYkNyeXB0byxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgQ3J5cHRvRXJyb3I+ID0+XG4gIGFsZ28gPT09IENyeXB0b0FsZ29yaXRobS5TamNsID8gc2pjbC5nZW5lcmF0ZUtleSgpIDogd2ViLmdlbmVyYXRlS2V5KCk7XG5cbi8qKlxuICogSGFzaCBhIHBhc3N3b3JkIHVzaW5nIHRoZSBwcm92aWRlZCBhbGdvcml0aG1cbiAqXG4gKiBAcGFyYW0gcGFzc3dvcmRcbiAqIEBwYXJhbSBhbGdvXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaGFzaFBhc3N3b3JkID0gKFxuICBwYXNzd29yZDogc3RyaW5nLFxuICBhbGdvOiBDcnlwdG9BbGdvcml0aG0sXG4pOiBSZXN1bHRBc3luYzxzdHJpbmcsIEhhc2hpbmdFcnJvcj4gPT5cbiAgYWxnbyA9PT0gQ3J5cHRvQWxnb3JpdGhtLlNqY2xcbiAgICA/IHNqY2wuaGFzaFBhc3N3b3JkKHBhc3N3b3JkKVxuICAgIDogd2ViLmhhc2hQYXNzd29yZChwYXNzd29yZCk7XG4iLCAiaW1wb3J0IHsgZXJyQXN5bmMsIG9rQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IEx1ZmlGaWxlIH0gZnJvbSBcIn4vZW50aXRpZXMvbHVmaS1maWxlLnRzXCI7XG5pbXBvcnQgeyBFVkVOVCB9IGZyb20gXCJ+L2VudW0vZXZlbnQudHNcIjtcbmltcG9ydCB7IFVQTE9BRF9TVEFUVVMgfSBmcm9tIFwifi9lbnVtL2ZpbGUtc3RhdHVzLnRzXCI7XG5pbXBvcnQgeyBTb2NrZXRQYXRoIH0gZnJvbSBcIn4vZW51bS9zb2NrZXQtcGF0aC50c1wiO1xuaW1wb3J0IHsgVXBsb2FkRXJyb3IgfSBmcm9tIFwifi9lcnJvci91cGxvYWQvdXBsb2FkLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBXZWJTb2NrZXRDb25uZWN0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWNvbm5lY3Rpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IFdlYlNvY2tldEVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd2Vic29ja2V0L3dlYnNvY2tldC1lcnJvci50c1wiO1xuaW1wb3J0IHR5cGUgeyBDbGllbnRVcGxvYWRDaHVua01ldGFkYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL2NsaWVudC11cGxvYWQtY2h1bmstbWV0YWRhdGEudHNcIjtcbmltcG9ydCB0eXBlIHsgRW5jcnlwdGVkRGF0YSB9IGZyb20gXCJ+L2ludGVyZmFjZS9lbmNyeXB0ZWQtZGF0YS50c1wiO1xuaW1wb3J0IHR5cGUgeyBTZXJ2ZXJDYW5jZWxNZXRhZGF0YSB9IGZyb20gXCJ+L2ludGVyZmFjZS9zZXJ2ZXItY2FuY2VsLW1ldGFkYXRhLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlckRvd25sb2FkQ2h1bmtTdWNjZXNzTWV0YWRhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2Uvc2VydmVyLWRvd25sb2FkLWNodW5rLXN1Y2Nlc3MtbWV0YWRhdGEudHNcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyVXBsb2FkQ2h1bmtNZXRhZGF0YSB9IGZyb20gXCJ+L2ludGVyZmFjZS9zZXJ2ZXItdXBsb2FkLWNodW5rLW1ldGFkYXRhLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlckRvd25sb2FkQ2h1bmtNZXRhZGF0YSB9IGZyb20gXCJ+L3R5cGUvc2VydmVyLWRvd25sb2FkLWNodW5rLW1ldGFkYXRhLnRzXCI7XG5pbXBvcnQgeyBlbnN1cmVFcnJvciB9IGZyb20gXCJ+L3V0aWxzLnRzXCI7XG5pbXBvcnQgeyBldmVudHMsIHVwZGF0ZUZpbGUgfSBmcm9tIFwifi93b3JrZXIvc2hhcmVkLnRzXCI7XG5pbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSBcIn4vYXBpL2NyeXB0by50c1wiO1xuaW1wb3J0IHtcbiAgRGVjb2RlIGFzIGI2NGRlY29kZSxcbiAgRW5jb2RlIGFzIGI2NGVuY29kZSxcbn0gZnJvbSBcImFycmF5YnVmZmVyLWVuY29kaW5nL2Jhc2U2NFwiO1xuXG5leHBvcnQgY29uc3Qgc29ja2V0czoge1xuICBba2V5OiBzdHJpbmddOiBXZWJTb2NrZXQ7XG59ID0ge307XG5cbmNvbnN0IE1BWF9FUlJPUlMgPSA1O1xuXG4vKipcbiAqIEhhbmRsZSBXZWJTb2NrZXQgcmVzcG9uc2UgZm9yIGNhbmNlbCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIGRhdGFcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IG9uQ2FuY2VsTWVzc2FnZSA9IChcbiAgZGF0YTogU2VydmVyQ2FuY2VsTWV0YWRhdGEsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBFcnJvcj4gPT4ge1xuICBldmVudHMuZW1pdChFVkVOVC5VUExPQURfQ0FOQ0VMTEVELCBkYXRhLnN1Y2Nlc3MpO1xuXG4gIHJldHVybiBva0FzeW5jKHVuZGVmaW5lZCk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBXZWJTb2NrZXQgcmVzcG9uc2UgZm9yIGRvd25sb2FkIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gcmVzcG9uc2VcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHJldHVybnNcbiAqL1xuY29uc3Qgb25Eb3dubG9hZE1lc3NhZ2UgPSAoXG4gIHJlc3BvbnNlOiBzdHJpbmcsXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFdlYlNvY2tldEVycm9yPiA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLnNwbGl0KFwiWFhNT0pPWFhcIik7XG4gIGNvbnN0IG1ldGFkYXRhU3RyaW5nID0gcmVzdWx0LnNoaWZ0KCk7XG5cbiAgaWYgKG1ldGFkYXRhU3RyaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBtZXRhZGF0YSA9IEpTT04ucGFyc2UobWV0YWRhdGFTdHJpbmcpIGFzIFNlcnZlckRvd25sb2FkQ2h1bmtNZXRhZGF0YTtcblxuICAgIGlmIChpc1NlcnZlckRvd25sb2FkQ2h1bmtTdWNjZXNzTWV0YWRhdGEobWV0YWRhdGEpKSB7XG4gICAgICBjb25zdCBkYXRhU3RyaW5nID0gcmVzdWx0LnNoaWZ0KCk7XG5cbiAgICAgIGlmIChkYXRhU3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGVuY3J5cHRlZERhdGE6IEVuY3J5cHRlZERhdGEgPSBKU09OLnBhcnNlKGRhdGFTdHJpbmcpO1xuXG4gICAgICAgIC8vIElmIGZpbGUgd2FzIHVwbG9hZGVkIHVzaW5nIEx1ZmkgQVBJXG4gICAgICAgIGlmIChlbmNyeXB0ZWREYXRhLml2KSB7XG4gICAgICAgICAgZW5jcnlwdGVkRGF0YS5pdiA9IG5ldyBVaW50OEFycmF5KE9iamVjdC52YWx1ZXMoZW5jcnlwdGVkRGF0YS5pdikpO1xuICAgICAgICAgIGVuY3J5cHRlZERhdGEuZGF0YSA9IGI2NGRlY29kZShlbmNyeXB0ZWREYXRhLmRhdGEgYXMgc3RyaW5nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjcnlwdG8uZGVjcnlwdChsdWZpRmlsZS5rZXlzLmNsaWVudCwgZW5jcnlwdGVkRGF0YSkuYW5kVGhlbihcbiAgICAgICAgICAoZGVjcnlwdGVkUGFydCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYnVmZmVyID0gdHlwZW9mIGRlY3J5cHRlZFBhcnQgPT09IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgPyAobmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGRlY3J5cHRlZFBhcnQpLmJ1ZmZlciBhcyBBcnJheUJ1ZmZlcilcbiAgICAgICAgICAgICAgOiBkZWNyeXB0ZWRQYXJ0O1xuXG4gICAgICAgICAgICAvLyBJZiBmaXJzdCBjaHVua1xuICAgICAgICAgICAgaWYgKG1ldGFkYXRhLnBhcnQgPT09IDApIHtcbiAgICAgICAgICAgICAgdXBkYXRlRmlsZShsdWZpRmlsZSwge1xuICAgICAgICAgICAgICAgIGNodW5rc1JlYWR5OiBsdWZpRmlsZS5jaHVua3NSZWFkeSArIDEsXG4gICAgICAgICAgICAgICAgZGVsQXRGaXJzdFZpZXc6IG1ldGFkYXRhLmRlbF9hdF9maXJzdF92aWV3LFxuICAgICAgICAgICAgICAgIGRlbGF5OiBtZXRhZGF0YS5kZWxheSxcbiAgICAgICAgICAgICAgICBuYW1lOiBtZXRhZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIHNpemU6IG1ldGFkYXRhLnNpemUsXG4gICAgICAgICAgICAgICAgdG90YWxDaHVua3M6IG1ldGFkYXRhLnRvdGFsLFxuICAgICAgICAgICAgICAgIHR5cGU6IG1ldGFkYXRhLnR5cGUsXG4gICAgICAgICAgICAgICAgemlwcGVkOiBtZXRhZGF0YS56aXBwZWQsXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULkRPV05MT0FEX1NUQVJURUQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdXBkYXRlRmlsZShsdWZpRmlsZSwgeyBjaHVua3NSZWFkeTogbHVmaUZpbGUuY2h1bmtzUmVhZHkgKyAxIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudHMuZW1pdChFVkVOVC5DSFVOS19ET1dOTE9BREVELCBidWZmZXIsIG1ldGFkYXRhLnBhcnQpO1xuXG4gICAgICAgICAgICBpZiAobHVmaUZpbGUuY2h1bmtzUmVhZHkgPT09IG1ldGFkYXRhLnRvdGFsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbmREb3dubG9hZChsdWZpRmlsZSkuYW5kVGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuRE9XTkxPQURfQ09NUExFVEUpO1xuICAgICAgICAgICAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULlNPQ0tFVF9PUEVSQVRJT05fVEVSTUlOQVRFRCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gb2tBc3luYyh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgV2ViU29ja2V0RXJyb3IoXG4gICAgICAgICAgXCJDYW5ub3QgcmV0cmlldmUgbWV0YWRhdGEgZnJvbSBkYXRhIHJlY2VpdmVkIGJ5IHRoZSBzZXJ2ZXJcIixcbiAgICAgICAgKTtcblxuICAgICAgICBldmVudHMuZW1pdChFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvcik7XG4gICAgICAgIHJldHVybiBlcnJBc3luYyhlcnJvcik7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IFdlYlNvY2tldEVycm9yKG1ldGFkYXRhLm1zZyk7XG5cbiAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yKTtcbiAgICAgIHJldHVybiBlcnJBc3luYyhlcnJvcik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGVycm9yID0gbmV3IFdlYlNvY2tldEVycm9yKFxuICAgICAgXCJDYW5ub3QgcmV0cmlldmUgbWV0YWRhdGEgZnJvbSBkYXRhIHJlY2VpdmVkIGJ5IHRoZSBzZXJ2ZXJcIixcbiAgICApO1xuXG4gICAgZXZlbnRzLmVtaXQoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IpO1xuICAgIHJldHVybiBlcnJBc3luYyhlcnJvcik7XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlIFdlYlNvY2tldCByZXNwb25zZSBmb3IgdXBsb2FkIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gcmVzcG9uc2VcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHJldHVybnNcbiAqL1xuY29uc3Qgb25VcGxvYWRNZXNzYWdlID0gKFxuICByZXNwb25zZTogU2VydmVyVXBsb2FkQ2h1bmtNZXRhZGF0YSxcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgVXBsb2FkRXJyb3I+ID0+IHtcbiAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAvLyBJZiBmaXJzdCBjaHVua1xuICAgIGlmIChyZXNwb25zZS5qID09PSAwKSB7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYFVwbG9hZCBvZiAke2x1ZmlGaWxlLmtleXMuY2xpZW50fSBzdGFydGVkYCk7XG5cbiAgICAgIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHtcbiAgICAgICAga2V5czogeyBjbGllbnQ6IGx1ZmlGaWxlLmtleXMuY2xpZW50LCBzZXJ2ZXI6IHJlc3BvbnNlLnNob3J0IH0sXG4gICAgICAgIGFjdGlvblRva2VuOiByZXNwb25zZS50b2tlbixcbiAgICAgICAgcXVldWVJbmRleDogcmVzcG9uc2UuaSxcbiAgICAgIH0pO1xuXG4gICAgICBldmVudHMuZW1pdChFVkVOVC5VUExPQURfU1RBUlRFRCk7XG4gICAgfVxuXG4gICAgdXBkYXRlRmlsZShsdWZpRmlsZSwge1xuICAgICAgY2h1bmtzUmVhZHk6IGx1ZmlGaWxlLmNodW5rc1JlYWR5ICsgMSxcbiAgICAgIGNyZWF0ZWRBdDogcmVzcG9uc2UuY3JlYXRlZF9hdCxcbiAgICB9KTtcblxuICAgIGV2ZW50cy5lbWl0KEVWRU5ULkNIVU5LX1VQTE9BREVEKTtcblxuICAgIGlmIChsdWZpRmlsZS5jaHVua3NSZWFkeSA9PT0gbHVmaUZpbGUudG90YWxDaHVua3MpIHtcbiAgICAgIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHsgdXBsb2FkU3RhdHVzOiBVUExPQURfU1RBVFVTLkNPTVBMRVRFIH0pO1xuXG4gICAgICBldmVudHMuZW1pdChFVkVOVC5VUExPQURfQ09NUExFVEUpO1xuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuU09DS0VUX09QRVJBVElPTl9URVJNSU5BVEVEKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb2tBc3luYyh1bmRlZmluZWQpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGVycm9yID0gbmV3IFdlYlNvY2tldEVycm9yKHJlc3BvbnNlLm1zZyk7XG4gICAgZXZlbnRzLmVtaXQoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IpO1xuXG4gICAgcmV0dXJuIGVyckFzeW5jKGVycm9yKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDYWxsZWQgb24gc29ja2V0cyBcIm9ubWVzc2FnZVwiIGV2ZW50XG4gKlxuICogQHBhcmFtIGVcbiAqIEBwYXJhbSBzb2NrZXRVcmxcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IG9uTWVzc2FnZSA9IChcbiAgZTogTWVzc2FnZUV2ZW50LFxuICBsdWZpRmlsZTogTHVmaUZpbGUsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBVcGxvYWRFcnJvcj4gPT4ge1xuICBjb25zdCBkYXRhID0gdHJ5UGFyc2VKc29uKGUuZGF0YSk7XG5cbiAgbGV0IGNhbGxiYWNrO1xuXG4gIGlmIChkYXRhKSB7XG4gICAgaWYgKCFkYXRhLmFjdGlvbiAmJiBkYXRhLm1zZykge1xuICAgICAgLy8gSWYgZXJyb3JcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IFdlYlNvY2tldEVycm9yKGRhdGEubXNnKTtcbiAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yKTtcblxuICAgICAgcmV0dXJuIGVyckFzeW5jKGVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFwiZGVsYXlcIiBpbiBkYXRhKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb25VcGxvYWRNZXNzYWdlKGRhdGEsIGx1ZmlGaWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrID0gb25DYW5jZWxNZXNzYWdlKGRhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjayA9IG9uRG93bmxvYWRNZXNzYWdlKGUuZGF0YSwgbHVmaUZpbGUpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGxiYWNrO1xufTtcblxuLyoqXG4gKiBJcyBzb2NrZXQgY29ubmVjdGluZz9cbiAqXG4gKiBAcGFyYW0gc29ja2V0S2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaXNDb25uZWN0aW5nID0gKHNvY2tldEtleTogc3RyaW5nKTogYm9vbGVhbiA9PlxuICBzb2NrZXRzICE9PSB1bmRlZmluZWQgJiZcbiAgc29ja2V0c1tzb2NrZXRLZXldICE9PSB1bmRlZmluZWQgJiZcbiAgc29ja2V0c1tzb2NrZXRLZXldLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5DT05ORUNUSU5HO1xuXG4vKipcbiAqIElzIHNvY2tldCBzcGF3bmVkP1xuICpcbiAqIEBwYXJhbSBzb2NrZXRLZXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NwYXduZWQgPSAoc29ja2V0S2V5OiBzdHJpbmcpOiBib29sZWFuID0+XG4gIHNvY2tldHMgIT09IHVuZGVmaW5lZCAmJlxuICBzb2NrZXRzW3NvY2tldEtleV0gIT09IHVuZGVmaW5lZCAmJlxuICBzb2NrZXRzW3NvY2tldEtleV0ucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0Lk9QRU47XG5cbi8qKlxuICogQXNrIFdlYlNvY2tldCB0byBjYW5jZWwgYW4gdXBsb2FkXG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgY2FuY2VsVXBsb2FkID0gKFxuICBsdWZpRmlsZTogTHVmaUZpbGUsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICByZXR1cm4gc2VuZE1lc3NhZ2UoXG4gICAgdXBsb2FkU29ja2V0VXJsKGx1ZmlGaWxlKSxcbiAgICBsdWZpRmlsZSxcbiAgICBgJHtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgaWQ6IGx1ZmlGaWxlLmtleXMuc2VydmVyLFxuICAgICAgICBtb2RfdG9rZW46IGx1ZmlGaWxlLmFjdGlvblRva2VuLFxuICAgICAgICBjYW5jZWw6IHRydWUsXG4gICAgICAgIGk6IGx1ZmlGaWxlLnF1ZXVlSW5kZXgsXG4gICAgICB9KVxuICAgIH1YWE1PSk9YWHVzZWxlc3NgLFxuICApO1xufTtcblxuLyoqXG4gKiBEb3dubG9hZCBhIHBhcnQgb2YgdGhlIGZpbGUgdGhyb3VnaCB0aGUgV2ViU29ja2V0XG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcGFyYW0gY2h1bmtOdW1iZXJcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkb3dubG9hZENodW5rID0gKFxuICBsdWZpRmlsZTogTHVmaUZpbGUsXG4gIGNodW5rTnVtYmVyOiBudW1iZXIsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICBsZXQgbWVzc2FnZTtcblxuICBpZiAobHVmaUZpbGUucGFzc3dvcmQpIHtcbiAgICBtZXNzYWdlID0geyBwYXJ0OiBjaHVua051bWJlciwgZmlsZV9wd2Q6IGx1ZmlGaWxlLnBhc3N3b3JkIH07XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZSA9IHsgcGFydDogY2h1bmtOdW1iZXIgfTtcbiAgfVxuXG4gIHJldHVybiBzZW5kTWVzc2FnZShcbiAgICBkb3dubG9hZFNvY2tldFVybChsdWZpRmlsZSksXG4gICAgbHVmaUZpbGUsXG4gICAgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXG4gICk7XG59O1xuXG4vKipcbiAqIFRlbGwgdGhlIFdlYlNvY2tldCB0aGUgZG93bmxvYWQgZW5kZWRcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmREb3dubG9hZCA9IChcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgbGV0IG1lc3NhZ2U6IHsgZW5kZWQ6IHRydWU7IGZpbGVfcHdkPzogc3RyaW5nIH07XG5cbiAgaWYgKGx1ZmlGaWxlLnBhc3N3b3JkKSB7XG4gICAgbWVzc2FnZSA9IHsgZW5kZWQ6IHRydWUsIGZpbGVfcHdkOiBsdWZpRmlsZS5wYXNzd29yZCB9O1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2UgPSB7IGVuZGVkOiB0cnVlIH07XG4gIH1cblxuICByZXR1cm4gc2VuZE1lc3NhZ2UoXG4gICAgZG93bmxvYWRTb2NrZXRVcmwobHVmaUZpbGUpLFxuICAgIGx1ZmlGaWxlLFxuICAgIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICApO1xufTtcblxuLyoqXG4gKiBVcGxvYWQgYSBjaHVuayBvZiB0aGUgZmlsZSB0aHJvdWdoIHRoZSBXZWJTb2NrZXRcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEBwYXJhbSBtZXRhZGF0YVxuICogQHBhcmFtIGVuY3J5cHRlZERhdGFcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCB1cGxvYWRDaHVuayA9IChcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuICBtZXRhZGF0YTogQ2xpZW50VXBsb2FkQ2h1bmtNZXRhZGF0YSxcbiAgZW5jcnlwdGVkRGF0YTogRW5jcnlwdGVkRGF0YSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFdlYlNvY2tldEVycm9yPiA9PiB7XG4gIGVuY3J5cHRlZERhdGEuZGF0YSA9IGI2NGVuY29kZShlbmNyeXB0ZWREYXRhLmRhdGEgYXMgQXJyYXlCdWZmZXIpO1xuXG4gIHJldHVybiBzZW5kTWVzc2FnZShcbiAgICB1cGxvYWRTb2NrZXRVcmwobHVmaUZpbGUpLFxuICAgIGx1ZmlGaWxlLFxuICAgIGAke0pTT04uc3RyaW5naWZ5KG1ldGFkYXRhKX1YWE1PSk9YWCR7SlNPTi5zdHJpbmdpZnkoZW5jcnlwdGVkRGF0YSl9YCxcbiAgKTtcbn07XG5cbi8qKlxuICogU2VuZCBhIG1lc3NhZ2UgdG8gdGhlIFdlYlNvY2tldFxuICpcbiAqIEBwYXJhbSBzb2NrZXRVcmxcbiAqIEBwYXJhbSBtZXNzYWdlXG4gKiBAcGFyYW0gaGFzUHJpb3JpdHlcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IHNlbmRNZXNzYWdlID0gKFxuICBzb2NrZXRVcmw6IHN0cmluZyxcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuICBtZXNzYWdlOiBzdHJpbmcsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICBpZiAoIWlzU3Bhd25lZChzb2NrZXRVcmwpKSB7XG4gICAgcmV0dXJuIHNwYXduKHNvY2tldFVybCkuYW5kVGhlbigoKSA9PiB7XG4gICAgICBzb2NrZXRzW3NvY2tldFVybF0ub25tZXNzYWdlID0gKGUpID0+IG9uTWVzc2FnZShlLCBsdWZpRmlsZSk7XG4gICAgICByZXR1cm4gc2VuZE1lc3NhZ2Uoc29ja2V0VXJsLCBsdWZpRmlsZSwgbWVzc2FnZSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgc29ja2V0c1tzb2NrZXRVcmxdLnNlbmQobWVzc2FnZSk7XG5cbiAgICByZXR1cm4gb2tBc3luYyh1bmRlZmluZWQpO1xuICB9XG59O1xuXG4vKipcbiAqIFNwYXduIGEgbmV3IFdlYlNvY2tldCBvciByZXVzZSBhbiBleGlzdGluZyBvbmUuXG4gKlxuICogQHBhcmFtIHNvY2tldEtleVxuICogQHBhcmFtIGVycm9yQ291bnRcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBzcGF3biA9IChcbiAgc29ja2V0S2V5OiBzdHJpbmcsXG4gIGVycm9yQ291bnQgPSAwLFxuKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICBpZiAoIWlzU3Bhd25lZChzb2NrZXRLZXkpICYmICFpc0Nvbm5lY3Rpbmcoc29ja2V0S2V5KSkge1xuICAgIC8vIGNvbnNvbGUuaW5mbyhgU3Bhd25pbmcgV2ViU29ja2V0ICR7c29ja2V0VXJsfWApO1xuICAgIHNvY2tldHNbc29ja2V0S2V5XSA9IG5ldyBXZWJTb2NrZXQoc29ja2V0S2V5KTtcblxuICAgIGV2ZW50cy5vbmNlKEVWRU5ULlNPQ0tFVF9PUEVSQVRJT05fVEVSTUlOQVRFRCwgKCkgPT4ge1xuICAgICAgc29ja2V0c1tzb2NrZXRLZXldLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBldmVudHMub25jZShFVkVOVC5PUEVSQVRJT05fRkFJTEVELCAoKSA9PiB7XG4gICAgICBldmVudHMuZW1pdChFVkVOVC5TT0NLRVRfT1BFUkFUSU9OX1RFUk1JTkFURUQpO1xuICAgIH0pO1xuXG4gICAgc29ja2V0c1tzb2NrZXRLZXldLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyhgV2Vic29ja2V0ICR7c29ja2V0S2V5fSBoYXMgYmVlbiBvcGVuYCk7XG4gICAgICBldmVudHMuZW1pdChFVkVOVC5TT0NLRVRfT1BFTkVEKTtcbiAgICB9O1xuXG4gICAgc29ja2V0c1tzb2NrZXRLZXldLm9uY2xvc2UgPSAoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYFdlYnNvY2tldCAke3NvY2tldEtleX0gaGFzIGJlZW4gY2xvc2VkYCk7XG4gICAgfTtcblxuICAgIHNvY2tldHNbc29ja2V0S2V5XS5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgaWYgKCsrZXJyb3JDb3VudCA8PSBNQVhfRVJST1JTKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgYEFuIGVycm9yIGhhcHBlbmVkIHdoaWxlIHRyeWluZyB0byBjb25uZWN0IHRvIFdlYlNvY2tldCBcIiR7c29ja2V0S2V5fVwiLiBUcnlpbmcgYWdhaW4uICR7ZXJyb3JDb3VudH0gLyAke01BWF9FUlJPUlN9YCxcbiAgICAgICAgICAoZXZlbnQgYXMgRXJyb3JFdmVudCkuZXJyb3IsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHNwYXduKHNvY2tldEtleSwgZXJyb3JDb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudHMuZW1pdChFVkVOVC5TT0NLRVRfT05FUlJPUik7XG4gICAgICAgIHJldHVybiBlcnJBc3luYyhcbiAgICAgICAgICBuZXcgV2ViU29ja2V0Q29ubmVjdGlvbkVycm9yKFxuICAgICAgICAgICAgYFVuYWJsZSB0byBjb25uZWN0IHRvIFdlYlNvY2tldCAke3NvY2tldEtleX0uYCxcbiAgICAgICAgICApLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICByZXR1cm4gd2FpdEZvckNvbm5lY3Rpb24oc29ja2V0S2V5KVxuICAgIC5hbmRUaGVuKCgpID0+IG9rQXN5bmMoc29ja2V0S2V5KSlcbiAgICAub3JFbHNlKChlcnJvcikgPT4gZXJyQXN5bmMoZXJyb3IpKTtcbn07XG5cbi8qKlxuICogV2FpdCBmb3IgV2ViU29ja2V0IHRvIG9wZW4uIFJldHVybnMgYW4gZXJyb3IgaWYgdG9vIG1hbnkgY29ubmVjdGlvbiBhdHRlbXB0cyBhcmUgbWFkZS5cbiAqXG4gKiBAcGFyYW0gc29ja2V0S2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3Qgd2FpdEZvckNvbm5lY3Rpb24gPSAoXG4gIHNvY2tldEtleTogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+XG4gIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghaXNTcGF3bmVkKHNvY2tldEtleSkpIHtcbiAgICAgICAgZXZlbnRzLm9uY2UoRVZFTlQuU09DS0VUX09QRU5FRCwgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnRzLm9uKEVWRU5ULlNPQ0tFVF9PTkVSUk9SLCAoKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBXZWJTb2NrZXRDb25uZWN0aW9uRXJyb3IoKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgfVxuICAgIH0pLFxuICAgIChlcnJvcikgPT4ge1xuICAgICAgcmV0dXJuIGVuc3VyZUVycm9yKGVycm9yKTtcbiAgICB9LFxuICApO1xuXG4vKipcbiAqIENsb3NlIHRoZSBXZWJTb2NrZXRcbiAqIEBwYXJhbSBzb2NrZXRLZXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBjbG9zZSA9IChzb2NrZXRLZXk6IHN0cmluZyk6IFJlc3VsdEFzeW5jPHN0cmluZywgV2ViU29ja2V0RXJyb3I+ID0+XG4gIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmIChpc1NwYXduZWQoc29ja2V0S2V5KSkge1xuICAgICAgICBjb25zdCB0aW1lb3V0SUQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZWplY3QobmV3IFdlYlNvY2tldEVycm9yKFwiVW5hYmxlIHRvIGNsb3NlIHRoZSBXZWJTb2NrZXRcIikpO1xuICAgICAgICB9LCAxMDAwKTtcblxuICAgICAgICBzb2NrZXRzW3NvY2tldEtleV0ub25jbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dElEKTtcbiAgICAgICAgICByZXNvbHZlKHNvY2tldEtleSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgc29ja2V0c1tzb2NrZXRLZXldLmNsb3NlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHNvY2tldEtleSk7XG4gICAgICB9XG4gICAgfSksXG4gICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICk7XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhbiBpbnN0YW5jZSBVUkwgaW4gYSBXZWJTb2NrZXQgVVJMXG4gKlxuICogQHBhcmFtIGluc3RhbmNlVXJsXG4gKiBAcGFyYW0gcGF0aG5hbWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBidWlsZFNvY2tldFVybCA9IChpbnN0YW5jZVVybDogVVJMLCBwYXRobmFtZTogc3RyaW5nKTogVVJMID0+IHtcbiAgY29uc3QgdXJsID0gbmV3IFVSTChpbnN0YW5jZVVybCk7XG5cbiAgaWYgKCFbXCJ3czpcIiwgXCJ3c3M6XCJdLmluY2x1ZGVzKHVybC5wcm90b2NvbCkpIHtcbiAgICB1cmwucHJvdG9jb2wgPSB1cmwucHJvdG9jb2wgPT09IFwiaHR0cDpcIiA/IFwid3M6XCIgOiBcIndzczpcIjtcbiAgfVxuICB1cmwucGF0aG5hbWUgKz0gcGF0aG5hbWU7XG5cbiAgcmV0dXJuIG5ldyBVUkwodXJsLm9yaWdpbiArIHVybC5wYXRobmFtZSk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHRoZSBkb3dubG9hZCBVUkwgZm9yIHRoZSBzb2NrZXQuIFJldHVybnMgYSBzdHJpbmcgc2luY2UgaXQncyBtb3N0bHkgdXNlZCBhcyBzb2NrZXRzIGtleVxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRvd25sb2FkU29ja2V0VXJsID0gKGx1ZmlGaWxlOiBMdWZpRmlsZSk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBidWlsZFNvY2tldFVybChcbiAgICBuZXcgVVJMKGx1ZmlGaWxlLnNlcnZlclVybCksXG4gICAgU29ja2V0UGF0aC5ET1dOTE9BRCArIGAvJHtsdWZpRmlsZS5rZXlzLnNlcnZlcn1gLFxuICApLnRvU3RyaW5nKCk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIHRoZSB1cGxvYWQgVVJMIGZvciB0aGUgc29ja2V0LiBSZXR1cm5zIGEgc3RyaW5nIHNpbmNlIGl0J3MgbW9zdGx5IHVzZWQgYXMgc29ja2V0cyBrZXlcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCB1cGxvYWRTb2NrZXRVcmwgPSAobHVmaUZpbGU6IEx1ZmlGaWxlKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGJ1aWxkU29ja2V0VXJsKG5ldyBVUkwobHVmaUZpbGUuc2VydmVyVXJsKSwgU29ja2V0UGF0aC5VUExPQUQpXG4gICAgLnRvU3RyaW5nKCk7XG59O1xuXG4vKipcbiAqIFRyeSB0byBwYXJzZSBhIHN0cmluZyBpbnRvIGEgSlNPTi4gUmV0dXJucyBmYWxzZSBpZiBub3QgcG9zc2libGUuXG4gKlxuICogQHBhcmFtIGRhdGFcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IHRyeVBhcnNlSnNvbiA9IChkYXRhOiBzdHJpbmcpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJzZWRPYmplY3QgPSBKU09OLnBhcnNlKGRhdGEpO1xuXG4gICAgaWYgKHBhcnNlZE9iamVjdCAmJiB0eXBlb2YgcGFyc2VkT2JqZWN0ID09PSBcIm9iamVjdFwiKSB7XG4gICAgICByZXR1cm4gcGFyc2VkT2JqZWN0O1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gIH0gY2F0Y2ggKF9lKSB7XG4gICAgLyogZW1wdHkgKi9cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSB0eXBlIG9mIHRoZSBtZXNzYWdlIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlciBpcyBTZXJ2ZXJEb3dubG9hZENodW5rTWV0YWRhdGFcbiAqXG4gKiBAcGFyYW0gbWVzc2FnZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2VydmVyRG93bmxvYWRDaHVua1N1Y2Nlc3NNZXRhZGF0YSA9IChcbiAgbWVzc2FnZTogU2VydmVyRG93bmxvYWRDaHVua01ldGFkYXRhLFxuKTogbWVzc2FnZSBpcyBTZXJ2ZXJEb3dubG9hZENodW5rU3VjY2Vzc01ldGFkYXRhID0+XG4gIHR5cGVvZiBtZXNzYWdlID09PSBcIm9iamVjdFwiICYmIG1lc3NhZ2UgIT09IG51bGwgJiYgIShcIm1zZ1wiIGluIG1lc3NhZ2UpO1xuIiwgImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgZXJyQXN5bmMsIG9rQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IEx1ZmlGaWxlIH0gZnJvbSBcIn4vZW50aXRpZXMvbHVmaS1maWxlLnRzXCI7XG5pbXBvcnQgeyBMdWZpSm9iIH0gZnJvbSBcIn4vZW50aXRpZXMvbHVmaS1qb2IudHNcIjtcbmltcG9ydCB7IEpvYlN0YXR1cyB9IGZyb20gXCJ+L2VudW0vam9iLXN0YXR1cy50c1wiO1xuaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgeyBVUExPQURfU1RBVFVTIH0gZnJvbSBcIn4vZW51bS9maWxlLXN0YXR1cy50c1wiO1xuaW1wb3J0IHsgV09SS0VSX0FDVElPTiB9IGZyb20gXCJ+L2VudW0vd29ya2VyLWFjdGlvbi50c1wiO1xuaW1wb3J0IHsgZW5zdXJlRXJyb3IsIGZldGNoU2VydmVyQ29uZmlnLCBpc1NlY3VyZUNvbnRleHQgfSBmcm9tIFwifi91dGlscy50c1wiO1xuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gXCJ+L2FwaS9jcnlwdG8udHNcIjtcbmltcG9ydCB7IEZpbGVTbGljaW5nRXJyb3IgfSBmcm9tIFwifi9lcnJvci9maWxlL2ZpbGUtc2xpY2luZy1lcnJvci50c1wiO1xuaW1wb3J0IHsgQ3J5cHRvQWxnb3JpdGhtIH0gZnJvbSBcIn4vZW51bS9jcnlwdG8tYWxnb3JpdGhtLnRzXCI7XG5pbXBvcnQgeyBDcnlwdG9FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9jcnlwdG8tZXJyb3IudHNcIjtcbmltcG9ydCB7IERvd25sb2FkRXJyb3IgfSBmcm9tIFwifi9lcnJvci9kb3dubG9hZC9kb3dubG9hZC1lcnJvci50c1wiO1xuaW1wb3J0IHsgSW5mb3NFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2luZm9zLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBKb2JQYXVzZUVycm9yIH0gZnJvbSBcIi4uL2Vycm9yL2pvYi9qb2ItcGF1c2UtZXJyb3IudHNcIjtcbmltcG9ydCB7IEpvYlJlc3VtZUVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivam9iL2pvYi1yZXN1bWUtZXJyb3IudHNcIjtcbmltcG9ydCB7IEpvYkVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivam9iL2pvYi1lcnJvci50c1wiO1xuaW1wb3J0IHsgVXBsb2FkRXJyb3IgfSBmcm9tIFwifi9lcnJvci91cGxvYWQvdXBsb2FkLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBoYXNoUGFzc3dvcmQgfSBmcm9tIFwifi9hcGkvY3J5cHRvLnRzXCI7XG5pbXBvcnQgeyBXT1JLRVJfVFlQRSB9IGZyb20gXCJ+L2VudW0vd29ya2VyLXR5cGUudHNcIjtcbmltcG9ydCB7IHR5cGUgQXN5bmNaaXBwYWJsZSB9IGZyb20gXCJmZmxhdGVcIjtcblxuY29uc3QgQ0hVTktfTEVOR1RIID0gMV81MDBfMDAwOyAvLyAxLjUgTUJcblxuY29uc3QgZmlsZXM6IHsgW2NsaWVudEtleTogc3RyaW5nXTogTHVmaUZpbGUgfSA9IHt9O1xuZXhwb3J0IGNvbnN0IGV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuLyoqXG4gKiBDYW5jZWwgYW4gdXBsb2FkXG4gKlxuICogQHBhcmFtIHVwbG9hZEpvYlxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGNhbmNlbCA9ICh1cGxvYWRKb2I6IEx1ZmlKb2IpOiBSZXN1bHRBc3luYzxMdWZpSm9iLCBFcnJvcj4gPT4ge1xuICB1cGxvYWRKb2IudGVybWluYXRlKCk7XG5cbiAgY29uc3Qgam9iID0gbmV3IEx1ZmlKb2IodXBsb2FkSm9iLmx1ZmlGaWxlLCBXT1JLRVJfVFlQRS5DQU5DRUwpO1xuXG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBqb2JcbiAgICAgICAgLm9uTWVzc2FnZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gRVZFTlQuVVBMT0FEX0NBTkNFTExFRCkge1xuICAgICAgICAgICAgZmlsZXNbam9iLmx1ZmlGaWxlLmtleXMuY2xpZW50XS51cGxvYWRTdGF0dXMgPVxuICAgICAgICAgICAgICBVUExPQURfU1RBVFVTLkNBTkNFTEVEO1xuXG4gICAgICAgICAgICByZXNvbHZlKGpvYik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQpIHtcbiAgICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgICAgbmV3IEpvYkVycm9yKFxuICAgICAgICAgICAgICAgIFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY2FuY2VsIGFuIHVwbG9hZFwiLFxuICAgICAgICAgICAgICAgIHsgY2F1c2U6IGV2ZW50LmRhdGEuZXJyb3IgfSxcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucmVxdWVzdE1lc3NhZ2Uoe1xuICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIGx1ZmlGaWxlOiBqb2IubHVmaUZpbGUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfSksXG4gICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIGxpc3Qgb2YgZmlsZXMgdG8gYmUgcGFzc2VkIHRvIGNvbXByZXNzKClcbiAqXG4gKiBAcGFyYW0gZmlsZXNcbiAqIEBwYXJhbSBhcmNoaXZlRW50cmllc1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZEZpbGVzVG9BcmNoaXZlID0gKFxuICBmaWxlczogRmlsZVtdLFxuICBhcmNoaXZlRW50cmllczogQXN5bmNaaXBwYWJsZSA9IHt9LFxuKTogUmVzdWx0QXN5bmM8QXN5bmNaaXBwYWJsZSwgRXJyb3I+ID0+IHtcbiAgY29uc3QgYXN5bmNMb29wID0gYXN5bmMgKFxuICAgIGZpbGVzOiBGaWxlW10sXG4gICkgPT4ge1xuICAgIGZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xuICAgICAgY29uc3QgbmFtZVdpdGhFeHRlbnNpb24gPSBmaWxlLm5hbWUuc3BsaXQoXCIvXCIpPy5wb3AoKSB8fCBmaWxlLm5hbWU7XG5cbiAgICAgIGNvbnN0IG5hbWVXaXRob3V0RXh0ZW5zaW9uID0gbmFtZVdpdGhFeHRlbnNpb24uc3BsaXQoXCIuXCIpLnNoaWZ0KCk7XG4gICAgICBjb25zdCBleHRlbnNpb24gPSBuYW1lV2l0aEV4dGVuc2lvbi5zcGxpdChcIi5cIikubGVuZ3RoID4gMVxuICAgICAgICA/IGAuJHtuYW1lV2l0aEV4dGVuc2lvbi5zcGxpdChcIi5cIikucG9wKCl9YFxuICAgICAgICA6IFwiXCI7XG5cbiAgICAgIGxldCBuYW1lID0gbmFtZVdpdGhFeHRlbnNpb247XG5cbiAgICAgIGlmIChhcmNoaXZlRW50cmllc1tuYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxldCBpID0gMTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG5hbWUgPSBgJHtuYW1lV2l0aG91dEV4dGVuc2lvbn0oJHtpfSkke2V4dGVuc2lvbn1gO1xuXG4gICAgICAgICAgaSsrO1xuICAgICAgICB9IHdoaWxlIChhcmNoaXZlRW50cmllc1tuYW1lXSAhPT0gdW5kZWZpbmVkKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuQVJDSElWRV9BRERFRF9GSUxFLCB7IG5hbWUsIHNpemU6IGZpbGUuc2l6ZSB9KTtcblxuICAgICAgYXJjaGl2ZUVudHJpZXNbbmFtZV0gPSBhd2FpdCBmaWxlLmJ5dGVzKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBhc3luY0xvb3AoZmlsZXMpLFxuICAgIChlcnJvcikgPT4gZW5zdXJlRXJyb3IoZXJyb3IpLFxuICApLmFuZFRoZW4oKCkgPT4gb2tBc3luYyhhcmNoaXZlRW50cmllcykpO1xufTtcblxuLyoqXG4gKiBDb21wcmVzcyBmaWxlcyBpbnRvIGEgemlwXG4gKlxuICogQHBhcmFtIGFyY2hpdmVFbnRyaWVzXG4gKiBAcGFyYW0gYXJjaGl2ZU5hbWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBjb21wcmVzcyA9IChcbiAgYXJjaGl2ZUVudHJpZXM6IEFzeW5jWmlwcGFibGUsXG4gIGFyY2hpdmVOYW1lOiBzdHJpbmcsXG4pOiBSZXN1bHRBc3luYzxMdWZpSm9iLCBFcnJvcj4gPT4ge1xuICBjb25zdCBsdWZpRmlsZSA9IG5ldyBMdWZpRmlsZShcIlwiKTsgLy8gRHVtbXkgTHVmaSBGaWxlIHRvIGF2b2lkIHRvIGNoZWNrIGZvciBMdWZpRmlsZSBleGlzdGFuY2UgaW4gb3RoZXIgam9ic1xuICBjb25zdCBqb2IgPSBuZXcgTHVmaUpvYihsdWZpRmlsZSwgV09SS0VSX1RZUEUuQ09NUFJFU1MpO1xuXG4gIHJldHVybiBva0FzeW5jKFxuICAgIGpvYlxuICAgICAgLm9uTWVzc2FnZSgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09IEVWRU5ULkFSQ0hJVkVfQ1JFQVRFRCkge1xuICAgICAgICAgIGpvYi5hcmNoaXZlRmlsZSA9IG5ldyBGaWxlKFtldmVudC5kYXRhLmJ1ZmZlcl0sIGFyY2hpdmVOYW1lLCB7XG4gICAgICAgICAgICB0eXBlOiBcImFwcGxpY2F0aW9uL3ppcFwiLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgam9iLmNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pLnJlcXVlc3RNZXNzYWdlKHtcbiAgICAgICAgYXJnczoge1xuICAgICAgICAgIGx1ZmlGaWxlLFxuICAgICAgICAgIGFyY2hpdmU6IHsgZW50cmllczogYXJjaGl2ZUVudHJpZXMgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICApO1xufTtcblxuLyoqXG4gKiBEZWNvbXByZXNzIGEgemlwIGZpbGVcbiAqXG4gKiBAcGFyYW0gemlwRmlsZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY29tcHJlc3MgPSAoXG4gIHppcEZpbGU6IEZpbGUsXG4pOiBSZXN1bHRBc3luYzxMdWZpSm9iLCBFcnJvcj4gPT4ge1xuICBjb25zdCBsdWZpRmlsZSA9IG5ldyBMdWZpRmlsZShcIlwiKTsgLy8gRHVtbXkgTHVmaSBGaWxlIHRvIGF2b2lkIHRvIGNoZWNrIGZvciBMdWZpRmlsZSBleGlzdGFuY2UgaW4gb3RoZXIgam9ic1xuICBjb25zdCBqb2IgPSBuZXcgTHVmaUpvYihsdWZpRmlsZSwgV09SS0VSX1RZUEUuREVDT01QUkVTUyk7XG5cbiAgcmV0dXJuIG9rQXN5bmMoXG4gICAgam9iXG4gICAgICAub25NZXNzYWdlKChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gRVZFTlQuQVJDSElWRV9ERUNPTVBSRVNTRUQpIHtcbiAgICAgICAgICBqb2IuY29tcGxldGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSBFVkVOVC5BUkNISVZFX1JFVFJJRVZFRF9GSUxFKSB7XG4gICAgICAgICAgam9iLmFyY2hpdmVGaWxlcy5wdXNoKFxuICAgICAgICAgICAgbmV3IEZpbGUoW2V2ZW50LmRhdGEuZmlsZS5idWZmZXJdLCBldmVudC5kYXRhLmZpbGUucGF0aCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5yZXF1ZXN0TWVzc2FnZSh7XG4gICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICBsdWZpRmlsZSxcbiAgICAgICAgICBhcmNoaXZlOiB7IGZpbGU6IHppcEZpbGUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICApO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgbG9naWNzIG9mIHBhc3N3b3JkIGhhc2hpbmdcbiAqXG4gKiBAcGFyYW0gZG93bmxvYWRVcmxcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuY29uc3QgaGFuZGxlUGFzc3dvcmRIYXNoaW5nID0gKFxuICBkb3dubG9hZFVybDogVVJMLFxuICBwYXNzd29yZD86IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPEx1ZmlGaWxlLCBFcnJvcj4gPT4ge1xuICBpZiAocGFzc3dvcmQpIHtcbiAgICByZXR1cm4gZmV0Y2hTZXJ2ZXJDb25maWcoZG93bmxvYWRVcmwpLmFuZFRoZW4oKGNvbmZpZykgPT4ge1xuICAgICAgLy8gUGFzc3dvcmQgaGFzaGluZyBvbiBjbGllbnQgc2lkZSBpcyBvbmx5IHN1cHBvcnRlZCBieSByZWNlbnQgdmVyc2lvbnMgb2YgTHVmaSBTZXJ2ZXJcbiAgICAgIGlmIChcbiAgICAgICAgY29uZmlnLnZlcnNpb24udGFnID4gXCIwLjA3LjBcIlxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGFsZ28gPSBpc1NlY3VyZUNvbnRleHQoKVxuICAgICAgICAgID8gQ3J5cHRvQWxnb3JpdGhtLldlYkNyeXB0b1xuICAgICAgICAgIDogQ3J5cHRvQWxnb3JpdGhtLlNqY2w7XG5cbiAgICAgICAgcmV0dXJuIGhhc2hQYXNzd29yZChwYXNzd29yZCwgYWxnbykuYW5kVGhlbigoaGFzaGVkUGFzc3dvcmQpID0+XG4gICAgICAgICAgb2tBc3luYyhMdWZpRmlsZS5mcm9tRG93bmxvYWRVcmwoZG93bmxvYWRVcmwsIGhhc2hlZFBhc3N3b3JkKSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBva0FzeW5jKEx1ZmlGaWxlLmZyb21Eb3dubG9hZFVybChkb3dubG9hZFVybCwgcGFzc3dvcmQpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2tBc3luYyhMdWZpRmlsZS5mcm9tRG93bmxvYWRVcmwoZG93bmxvYWRVcmwpKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEb3dubG9hZCBhIGZpbGUgZnJvbSB0aGUgc2VydmVyXG4gKlxuICogQHBhcmFtIGRvd25sb2FkVXJsXG4gKiBAcGFyYW0gcGFzc3dvcmRcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkb3dubG9hZCA9IChcbiAgZG93bmxvYWRVcmw6IFVSTCxcbiAgcGFzc3dvcmQ/OiBzdHJpbmcsXG4pOiBSZXN1bHRBc3luYzxMdWZpSm9iLCBFcnJvcj4gPT5cbiAgaGFuZGxlUGFzc3dvcmRIYXNoaW5nKGRvd25sb2FkVXJsLCBwYXNzd29yZCkuYW5kVGhlbihcbiAgICAobHVmaUZpbGU6IEx1ZmlGaWxlKSA9PiB7XG4gICAgICBjb25zdCBqb2IgPSBuZXcgTHVmaUpvYihsdWZpRmlsZSwgV09SS0VSX1RZUEUuRE9XTkxPQUQpO1xuXG4gICAgICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBjb25zdCBjaHVua3M6IEJsb2JbXSA9IFtdO1xuXG4gICAgICAgICAgcmV0dXJuIGpvYlxuICAgICAgICAgICAgLm9uTWVzc2FnZSgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgaGFuZGxlU29ja2V0UmVzdWx0cyhyZXNvbHZlLCByZWplY3QsIGpvYiwgZXZlbnQpO1xuXG4gICAgICAgICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSBFVkVOVC5DSFVOS19ET1dOTE9BREVEKSB7XG4gICAgICAgICAgICAgICAgY2h1bmtzLnB1c2goZXZlbnQuZGF0YS5jaHVuay5idWZmZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGNodW5rcy5sZW5ndGggPj0gNTApIHtcbiAgICAgICAgICAgICAgICAgIGpvYi5kb3dubG9hZGVkRmlsZSA9IG5ldyBGaWxlKFxuICAgICAgICAgICAgICAgICAgICBqb2IuZG93bmxvYWRlZEZpbGVcbiAgICAgICAgICAgICAgICAgICAgICA/IFtqb2IuZG93bmxvYWRlZEZpbGUuc2xpY2UoKV0uY29uY2F0KGNodW5rcylcbiAgICAgICAgICAgICAgICAgICAgICA6IGNodW5rcyxcbiAgICAgICAgICAgICAgICAgICAgbHVmaUZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGx1ZmlGaWxlLnR5cGUsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgICBjaHVua3MubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gRVZFTlQuRE9XTkxPQURfQ09NUExFVEUpIHtcbiAgICAgICAgICAgICAgICBqb2IuZG93bmxvYWRlZEZpbGUgPSBuZXcgRmlsZShcbiAgICAgICAgICAgICAgICAgIGpvYi5kb3dubG9hZGVkRmlsZVxuICAgICAgICAgICAgICAgICAgICA/IFtqb2IuZG93bmxvYWRlZEZpbGUuc2xpY2UoKV0uY29uY2F0KGNodW5rcylcbiAgICAgICAgICAgICAgICAgICAgOiBjaHVua3MsXG4gICAgICAgICAgICAgICAgICBsdWZpRmlsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBsdWZpRmlsZS50eXBlLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgY2h1bmtzLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgICAgICAgICBqb2IuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZXF1ZXN0TWVzc2FnZSh7XG4gICAgICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgICAgICBsdWZpRmlsZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSBhcyBQcm9taXNlPEx1ZmlKb2I+LFxuICAgICAgICAoZXJyb3IpID0+IG5ldyBEb3dubG9hZEVycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICAgICAgKTtcbiAgICB9LFxuICApO1xuXG4vKipcbiAqIFJldHJpZXZlIGluZm9ybWF0aW9ucyBhYm91dCBhIGZpbGVcbiAqXG4gKiBAcGFyYW0gZG93bmxvYWRVcmxcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGluZm9zID0gKFxuICBkb3dubG9hZFVybDogVVJMLFxuICBwYXNzd29yZD86IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPEx1ZmlKb2IsIEluZm9zRXJyb3IgfCBDcnlwdG9FcnJvcj4gPT5cbiAgaGFuZGxlUGFzc3dvcmRIYXNoaW5nKGRvd25sb2FkVXJsLCBwYXNzd29yZCkuYW5kVGhlbigobHVmaUZpbGUpID0+XG4gICAgb2tBc3luYyhuZXcgTHVmaUpvYihsdWZpRmlsZSwgV09SS0VSX1RZUEUuSU5GT1MpKVxuICApXG4gICAgLmFuZFRoZW4oKGpvYjogTHVmaUpvYikgPT5cbiAgICAgIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgam9iXG4gICAgICAgICAgICAub25NZXNzYWdlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gRVZFTlQuSU5GT1NfUkVUUklFVkVEKSB7XG4gICAgICAgICAgICAgICAgam9iLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShqb2IpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgICAgICBuZXcgSm9iRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgIFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gcmV0cmlldmUgaW5mb3JtYXRpb25zIG9mIHRoZSBmaWxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHsgY2F1c2U6IGV2ZW50LmRhdGEuZXJyb3IgfSxcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5yZXF1ZXN0TWVzc2FnZSh7XG4gICAgICAgICAgICAgIGFyZ3M6IHsgbHVmaUZpbGU6IGpvYi5sdWZpRmlsZSB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pIGFzIFByb21pc2U8THVmaUpvYj4sXG4gICAgICAgIChlcnJvcikgPT4gbmV3IEluZm9zRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICAgICApXG4gICAgKTtcblxuLyoqXG4gKiBQYXVzZSBhbiB1cGxvYWQvZG93bmxvYWQgam9iXG4gKiBAcGFyYW0gam9iXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgcGF1c2UgPSAoam9iOiBMdWZpSm9iKTogUmVzdWx0QXN5bmM8THVmaUpvYiwgRXJyb3I+ID0+IHtcbiAgdHJ5IHtcbiAgICBqb2Iuc3RhdHVzID0gSm9iU3RhdHVzLlBBVVNFRDtcbiAgICByZXR1cm4gb2tBc3luYyhcbiAgICAgIGpvYi5yZXF1ZXN0TWVzc2FnZSh7XG4gICAgICAgIGFjdGlvbjogV09SS0VSX0FDVElPTi5QQVVTRSxcbiAgICAgICAgYXJnczogeyBsdWZpRmlsZTogam9iLmx1ZmlGaWxlIH0sXG4gICAgICB9KSxcbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJBc3luYyhcbiAgICAgIG5ldyBKb2JQYXVzZUVycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgZmlsZSB1cGxvYWRlZCBvbiB0aGUgc2VydmVyXG4gKiBAcGFyYW0gcmVtb3ZlVXJsXG4gKiBAcGFyYW0gcGFzc3dvcmRcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmUgPSAoXG4gIHJlbW92ZVVybDogVVJMLFxuICBwYXNzd29yZD86IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPEx1ZmlKb2IsIEVycm9yPiA9PiB7XG4gIGNvbnN0IGx1ZmlGaWxlID0gTHVmaUZpbGUuZnJvbVJlbW92ZVVybChyZW1vdmVVcmwsIHBhc3N3b3JkKTtcbiAgY29uc3Qgam9iID0gbmV3IEx1ZmlKb2IobHVmaUZpbGUsIFdPUktFUl9UWVBFLlJFTU9WRSk7XG5cbiAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGpvYlxuICAgICAgICAub25NZXNzYWdlKChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSBFVkVOVC5GSUxFX1JFTU9WRUQpIHtcbiAgICAgICAgICAgIGpvYi5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgcmVzb2x2ZShqb2IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSBFVkVOVC5PUEVSQVRJT05fRkFJTEVEKSB7XG4gICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgIG5ldyBKb2JFcnJvcihcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIHJlbW92ZSBhIGZpbGVcIiwge1xuICAgICAgICAgICAgICAgIGNhdXNlOiBldmVudC5kYXRhLmVycm9yLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAucmVxdWVzdE1lc3NhZ2UoeyBhcmdzOiB7IGx1ZmlGaWxlIH0gfSk7XG4gICAgfSksXG4gICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICk7XG59O1xuXG4vKipcbiAqIFJlc3VtZSBhbiB1cGxvYWQvZG93bmxvYWQgam9iXG4gKiBAcGFyYW0gam9iXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgcmVzdW1lID0gKGpvYjogTHVmaUpvYik6IFJlc3VsdEFzeW5jPEx1ZmlKb2IsIEVycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgam9iLnN0YXR1cyA9IEpvYlN0YXR1cy5PTkdPSU5HO1xuICAgIHJldHVybiBva0FzeW5jKFxuICAgICAgam9iLnJlcXVlc3RNZXNzYWdlKHtcbiAgICAgICAgYWN0aW9uOiBXT1JLRVJfQUNUSU9OLlJFU1VNRSxcbiAgICAgICAgYXJnczogeyBsdWZpRmlsZTogam9iLmx1ZmlGaWxlIH0sXG4gICAgICB9KSxcbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJBc3luYyhcbiAgICAgIG5ldyBKb2JSZXN1bWVFcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIFNsaWNlIGEgZmlsZSBpbiBtdWx0aXBsZSBjaHVua3NcbiAqXG4gKiBAcGFyYW0gY2h1bmtMZW5ndGhcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IHNsaWNlQW5kVXBsb2FkID0gKFxuICBqb2I6IEx1ZmlKb2IsXG4gIGZpbGU6IEZpbGUsXG4gIGFsZ286IENyeXB0b0FsZ29yaXRobSxcbiAgY2h1bmtMZW5ndGg6IG51bWJlciA9IENIVU5LX0xFTkdUSCxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIEZpbGVTbGljaW5nRXJyb3I+ID0+IHtcbiAgZXZlbnRzLmVtaXQoRVZFTlQuU0xJQ0VfU1RBUlRFRCwgZmlsZXNbam9iLmx1ZmlGaWxlLmtleXMuY2xpZW50XSk7XG4gIGNvbnN0IHRvdGFsQ2h1bmtzID0gTWF0aC5jZWlsKGZpbGUuc2l6ZSAvIGNodW5rTGVuZ3RoKSB8fCAxO1xuICBjb25zdCBjb25jdXJyZW5jeSA9IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5IHx8IDE7XG5cbiAgZmlsZXNbam9iLmx1ZmlGaWxlLmtleXMuY2xpZW50XS50b3RhbENodW5rcyA9IHRvdGFsQ2h1bmtzO1xuXG4gIGNvbnN0IHNlcXVlbnRpYWxMb29wID0gYXN5bmMgKCkgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxDaHVua3M7IGkrKykge1xuICAgICAgY29uc3Qgc3RhcnQgPSBpICogY2h1bmtMZW5ndGg7XG4gICAgICBjb25zdCBlbmQgPSBNYXRoLm1pbihzdGFydCArIGNodW5rTGVuZ3RoLCBmaWxlLnNpemUpO1xuICAgICAgY29uc3QgYnVmZmVyID0gYXdhaXQgZmlsZS5zbGljZShzdGFydCwgZW5kLCBmaWxlLnR5cGUpLmFycmF5QnVmZmVyKCk7XG5cbiAgICAgIGpvYi5yZXF1ZXN0TWVzc2FnZShcbiAgICAgICAge1xuICAgICAgICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIGNodW5rOiB7XG4gICAgICAgICAgICAgIGJ1ZmZlcixcbiAgICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbHVmaUZpbGU6IGZpbGVzW2pvYi5sdWZpRmlsZS5rZXlzLmNsaWVudF0sXG4gICAgICAgICAgICBhbGdvLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIFtidWZmZXJdLFxuICAgICAgKTtcblxuICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgY29uc3Qgd2FpdFVudGlsVXBsb2FkU3RhcnRlZCA9ICgpID0+XG4gICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGpvYi5ldmVudHMub25jZShFVkVOVC5VUExPQURfU1RBUlRFRCwgKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB3YWl0VW50aWxVcGxvYWRTdGFydGVkKCk7XG4gICAgICB9IGVsc2UgaWYgKGkgJSBjb25jdXJyZW5jeSA9PT0gMCkge1xuICAgICAgICBjb25zdCB3YWl0Rm9yUXVldWVBdmFpbGFiaWxpdHkgPSAoKSA9PlxuICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICBqb2IuZXZlbnRzLm9uY2UoRVZFTlQuQ0hVTktfVVBMT0FERUQsICgpID0+IHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgd2FpdEZvclF1ZXVlQXZhaWxhYmlsaXR5KCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHNlcXVlbnRpYWxMb29wKCk7XG5cbiAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbn07XG5cbi8qKlxuICogU3RhcnQgdGhlIHVwbG9hZCBvbiB0aGUgc2VydmVyXG4gKiBAcGFyYW0gc2VydmVyVXJsXG4gKiBAcGFyYW0gZmlsZVxuICogQHBhcmFtIGRlbGF5XG4gKiBAcGFyYW0gZGVsQXRGaXJzdFZpZXdcbiAqIEBwYXJhbSB6aXBwZWRcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHBhcmFtIGFsZ29cbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IHN0YXJ0VXBsb2FkID0gKFxuICBzZXJ2ZXJVcmw6IFVSTCxcbiAgZmlsZTogRmlsZSxcbiAgZGVsYXk6IG51bWJlcixcbiAgZGVsQXRGaXJzdFZpZXc6IGJvb2xlYW4sXG4gIHppcHBlZDogYm9vbGVhbixcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgYWxnbzogQ3J5cHRvQWxnb3JpdGhtLFxuKSA9PlxuICBjcnlwdG8uZ2VuZXJhdGVLZXkoXG4gICAgYWxnbyxcbiAgKS5hbmRUaGVuKFxuICAgIChjbGllbnRLZXk6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHBhc3N3b3JkKSB7XG4gICAgICAgIHJldHVybiBoYXNoUGFzc3dvcmQocGFzc3dvcmQsIGFsZ28pLmFuZFRoZW4oKGhhc2hlZFBhc3N3b3JkKSA9PlxuICAgICAgICAgIG9rQXN5bmMoeyBwYXNzd29yZDogaGFzaGVkUGFzc3dvcmQsIGNsaWVudEtleSB9KVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9rQXN5bmMoeyBwYXNzd29yZCwgY2xpZW50S2V5IH0pO1xuICAgICAgfVxuICAgIH0sXG4gICkuYW5kVGhlbigoeyBwYXNzd29yZCwgY2xpZW50S2V5IH0pID0+IHtcbiAgICBmaWxlc1tjbGllbnRLZXldID0gbmV3IEx1ZmlGaWxlKHNlcnZlclVybC50b1N0cmluZygpLCB7XG4gICAgICBkZWxheSxcbiAgICAgIGRlbEF0Rmlyc3RWaWV3LFxuICAgICAgemlwcGVkLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICBuYW1lOiBmaWxlLm5hbWUuc3BsaXQoXCIvXCIpLnBvcCgpLCAvLyBSZW1vdmUgcGF0aCBmcm9tIGZpbGVuYW1lXG4gICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICB0eXBlOiBmaWxlLnR5cGUsXG4gICAgICBrZXlzOiB7IGNsaWVudDogY2xpZW50S2V5LCBzZXJ2ZXI6IFwiXCIgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGpvYiA9IG5ldyBMdWZpSm9iKGZpbGVzW2NsaWVudEtleV0sIFdPUktFUl9UWVBFLlVQTE9BRCk7XG5cbiAgICBmaWxlc1tjbGllbnRLZXldLnVwbG9hZFN0YXR1cyA9IFVQTE9BRF9TVEFUVVMuUVVFVUVEO1xuXG4gICAgcmV0dXJuIHNsaWNlQW5kVXBsb2FkKGpvYiwgZmlsZSwgYWxnbykuYW5kVGhlbigoKSA9PlxuICAgICAgUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBqb2Iub25NZXNzYWdlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlU29ja2V0UmVzdWx0cyhyZXNvbHZlLCByZWplY3QsIGpvYiwgZXZlbnQpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmRhdGEuZXZlbnQpIHtcbiAgICAgICAgICAgICAgY2FzZSBFVkVOVC5VUExPQURfQ09NUExFVEU6XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgam9iLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICBqb2IubHVmaUZpbGUudXBsb2FkU3RhdHVzID0gVVBMT0FEX1NUQVRVUy5DT01QTEVURTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pIGFzIFByb21pc2U8THVmaUpvYj4sXG4gICAgICAgIChlcnJvcikgPT4gZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgKVxuICAgICk7XG4gIH0pO1xuXG4vKipcbiAqIFVwbG9hZCBhIGZpbGUgdG8gdGhlIHNlcnZlclxuICpcbiAqIEBwYXJhbSBzZXJ2ZXJVcmxcbiAqIEBwYXJhbSBmaWxlc1RvVXBsb2FkXG4gKiBAcGFyYW0gZGVsYXlcbiAqIEBwYXJhbSBkZWxBdEZpcnN0Vmlld1xuICogQHBhcmFtIHppcHBlZFxuICogQHBhcmFtIHppcE5hbWVcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHBhcmFtIGFsZ29cbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCB1cGxvYWQgPSAoXG4gIHNlcnZlclVybDogVVJMLFxuICBmaWxlc1RvVXBsb2FkOiBGaWxlW10sXG4gIGRlbGF5OiBudW1iZXIgPSAwLFxuICBkZWxBdEZpcnN0VmlldzogYm9vbGVhbiA9IGZhbHNlLFxuICB6aXBwZWQ6IGJvb2xlYW4gPSBmYWxzZSxcbiAgemlwTmFtZTogc3RyaW5nID0gXCJkb2N1bWVudHMuemlwXCIsXG4gIHBhc3N3b3JkOiBzdHJpbmcgPSBcIlwiLFxuICBhbGdvOiBDcnlwdG9BbGdvcml0aG0gPSBDcnlwdG9BbGdvcml0aG0uV2ViQ3J5cHRvLFxuKTogUmVzdWx0QXN5bmM8THVmaUpvYltdLCBFcnJvcj4gPT4ge1xuICBjb25zdCBvcGVyYXRpb25zOiBSZXN1bHRBc3luYzxMdWZpSm9iLCBFcnJvcj5bXSA9IFtdO1xuXG4gIGlmICghemlwcGVkKSB7XG4gICAgZmlsZXNUb1VwbG9hZC5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICBvcGVyYXRpb25zLnB1c2goc3RhcnRVcGxvYWQoXG4gICAgICAgIHNlcnZlclVybCxcbiAgICAgICAgZmlsZSxcbiAgICAgICAgZGVsYXksXG4gICAgICAgIGRlbEF0Rmlyc3RWaWV3LFxuICAgICAgICB6aXBwZWQsXG4gICAgICAgIHBhc3N3b3JkLFxuICAgICAgICBhbGdvLFxuICAgICAgKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgd2UganVzdCB3YW50IHRvIHVwbG9hZCBhIHNpbmdsZSB6aXAgZmlsZSAocHJvYmFibHkgY3JlYXRlZCBieSBtYW51YWxseSB1c2luZyBjb21wcmVzcygpKVxuICAgIGlmIChcbiAgICAgIGZpbGVzVG9VcGxvYWQubGVuZ3RoID09PSAxICYmIGZpbGVzVG9VcGxvYWRbMF0udHlwZSA9PT0gXCJhcHBsaWNhdGlvbi96aXBcIlxuICAgICkge1xuICAgICAgb3BlcmF0aW9ucy5wdXNoKFxuICAgICAgICBzdGFydFVwbG9hZChcbiAgICAgICAgICBzZXJ2ZXJVcmwsXG4gICAgICAgICAgZmlsZXNUb1VwbG9hZFswXSxcbiAgICAgICAgICBkZWxheSxcbiAgICAgICAgICBkZWxBdEZpcnN0VmlldyxcbiAgICAgICAgICB6aXBwZWQsXG4gICAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgICAgYWxnbyxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wZXJhdGlvbnMucHVzaChcbiAgICAgICAgYWRkRmlsZXNUb0FyY2hpdmUoZmlsZXNUb1VwbG9hZClcbiAgICAgICAgICAuYW5kVGhlbigoYXJjaGl2ZUVudHJpZXMpID0+XG4gICAgICAgICAgICBjb21wcmVzcyhcbiAgICAgICAgICAgICAgYXJjaGl2ZUVudHJpZXMsXG4gICAgICAgICAgICAgIHppcE5hbWUsXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5hbmRUaGVuKChqb2IpID0+IGpvYi53YWl0Rm9yQ29tcGxldGlvbigpKVxuICAgICAgICAgICAgICAuYW5kVGhlbigoam9iKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGpvYi5hcmNoaXZlRmlsZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0VXBsb2FkKFxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJVcmwsXG4gICAgICAgICAgICAgICAgICAgIGpvYi5hcmNoaXZlRmlsZSxcbiAgICAgICAgICAgICAgICAgICAgZGVsYXksXG4gICAgICAgICAgICAgICAgICAgIGRlbEF0Rmlyc3RWaWV3LFxuICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgICAgYWxnbyxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBlcnJBc3luYyhuZXcgSm9iRXJyb3IoXCJhcmNoaXZlRmlsZSBtdXN0IGJlIGRlZmluZWRcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICApLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gUmVzdWx0QXN5bmMuY29tYmluZShvcGVyYXRpb25zKS5vckVsc2UoKGVycm9yKSA9PlxuICAgIGVyckFzeW5jKG5ldyBVcGxvYWRFcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVycm9yIH0pKVxuICApO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgc29ja2V0IG9wZW5pbmcgb3BlcmF0aW9uIGluIGEgcHJvbWlzZVxuICpcbiAqIEBwYXJhbSByZXNvbHZlXG4gKiBAcGFyYW0gcmVqZWN0XG4gKiBAcGFyYW0gam9iXG4gKiBAcGFyYW0gZXZlbnRcbiAqL1xuY29uc3QgaGFuZGxlU29ja2V0UmVzdWx0cyA9IChcbiAgcmVzb2x2ZToge1xuICAgICh2YWx1ZTogTHVmaUpvYiB8IFByb21pc2VMaWtlPEx1ZmlKb2I+KTogdm9pZDtcbiAgICAoYXJnMDogTHVmaUpvYik6IHZvaWQ7XG4gIH0sXG4gIHJlamVjdDogeyAocmVhc29uPzogdW5rbm93bik6IHZvaWQ7IChhcmcwOiB1bmtub3duKTogdm9pZCB9LFxuICBqb2I6IEx1ZmlKb2IsXG4gIGV2ZW50OiBNZXNzYWdlRXZlbnQsXG4pID0+IHtcbiAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09IEVWRU5ULlNPQ0tFVF9PUEVORUQpIHtcbiAgICByZXNvbHZlKGpvYik7XG4gIH1cblxuICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCkge1xuICAgIHJlamVjdChcbiAgICAgIG5ldyBKb2JFcnJvcihcIlRoZSBqb2IgcmV0dXJuZWQgYW4gZXJyb3JcIiwgeyBjYXVzZTogZXZlbnQuZGF0YS5lcnJvciB9KSxcbiAgICApO1xuICB9XG59O1xuXG5jb25zdCBnZXRGaWxlc1F1ZXVlZCA9ICgpOiBMdWZpRmlsZVtdID0+XG4gIE9iamVjdC52YWx1ZXMoZmlsZXMpLmZpbHRlcigoZmlsZSkgPT5cbiAgICBmaWxlLnVwbG9hZFN0YXR1cyA9PT0gVVBMT0FEX1NUQVRVUy5RVUVVRURcbiAgKTtcblxuZXhwb3J0IGNvbnN0IGdldEZpbGVJbmRleEluUXVldWUgPSAoY2xpZW50S2V5OiBzdHJpbmcpOiBudW1iZXIgPT5cbiAgT2JqZWN0LmtleXMoZ2V0RmlsZXNRdWV1ZWQoKSkuaW5kZXhPZihjbGllbnRLZXkpO1xuIiwgImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgZXJyQXN5bmMsIG9rQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB0eXBlIHsgTHVmaUZpbGUgfSBmcm9tIFwifi9lbnRpdGllcy9sdWZpLWZpbGUudHNcIjtcbmltcG9ydCB7IEVWRU5UIH0gZnJvbSBcIn4vZW51bS9ldmVudC50c1wiO1xuaW1wb3J0IHsgSm9iU3RhdHVzIH0gZnJvbSBcIn4vZW51bS9qb2Itc3RhdHVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlclJlcXVlc3RNZXNzYWdlIH0gZnJvbSBcIn4vdHlwZS93b3JrZXItcmVxdWVzdC1tZXNzYWdlLnRzXCI7XG5pbXBvcnQgeyBlbnN1cmVFcnJvciwgd29ya2VyVXJsIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB7IFVQTE9BRF9TVEFUVVMgfSBmcm9tIFwifi9lbnVtL2ZpbGUtc3RhdHVzLnRzXCI7XG5pbXBvcnQgeyBXT1JLRVJfVFlQRSB9IGZyb20gXCJ+L2VudW0vd29ya2VyLXR5cGUudHNcIjtcblxuZXhwb3J0IGNsYXNzIEx1ZmlKb2Ige1xuICBwdWJsaWMgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgbHVmaUZpbGU6IEx1ZmlGaWxlO1xuICBwdWJsaWMgc3RhdHVzID0gSm9iU3RhdHVzLk9OR09JTkc7XG4gIHB1YmxpYyBhcmNoaXZlRmlsZTogRmlsZSB8IHVuZGVmaW5lZDtcbiAgcHVibGljIGFyY2hpdmVGaWxlczogRmlsZVtdID0gW107XG4gIHB1YmxpYyBkb3dubG9hZGVkRmlsZTogRmlsZSB8IHVuZGVmaW5lZDtcbiAgcHVibGljIHdvcmtlcjogV29ya2VyO1xuXG4gIHByaXZhdGUgaXNUZXJtaW5hdGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IobHVmaUZpbGU6IEx1ZmlGaWxlLCB3b3JrZXJUeXBlOiBXT1JLRVJfVFlQRSkge1xuICAgIHN3aXRjaCAod29ya2VyVHlwZSkge1xuICAgICAgY2FzZSBXT1JLRVJfVFlQRS5DQU5DRUw6XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLndvcmtlciA9IG5ldyBXb3JrZXIod29ya2VyVXJsKFwiY2FuY2VsXCIpLCB7IHR5cGU6IFwibW9kdWxlXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV09SS0VSX1RZUEUuQ09NUFJFU1M6XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLndvcmtlciA9IG5ldyBXb3JrZXIod29ya2VyVXJsKFwiY29tcHJlc3NcIiksIHsgdHlwZTogXCJtb2R1bGVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXT1JLRVJfVFlQRS5ERUNPTVBSRVNTOlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy53b3JrZXIgPSBuZXcgV29ya2VyKHdvcmtlclVybChcImRlY29tcHJlc3NcIiksIHsgdHlwZTogXCJtb2R1bGVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXT1JLRVJfVFlQRS5ET1dOTE9BRDpcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMud29ya2VyID0gbmV3IFdvcmtlcih3b3JrZXJVcmwoXCJkb3dubG9hZFwiKSwgeyB0eXBlOiBcIm1vZHVsZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdPUktFUl9UWVBFLklORk9TOlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy53b3JrZXIgPSBuZXcgV29ya2VyKHdvcmtlclVybChcImluZm9zXCIpLCB7IHR5cGU6IFwibW9kdWxlXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV09SS0VSX1RZUEUuUkVNT1ZFOlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy53b3JrZXIgPSBuZXcgV29ya2VyKHdvcmtlclVybChcInJlbW92ZVwiKSwgeyB0eXBlOiBcIm1vZHVsZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdPUktFUl9UWVBFLlVQTE9BRDpcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMud29ya2VyID0gbmV3IFdvcmtlcih3b3JrZXJVcmwoXCJ1cGxvYWRcIiksIHsgdHlwZTogXCJtb2R1bGVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmx1ZmlGaWxlID0gbHVmaUZpbGU7XG4gICAgdGhpcy5ldmVudHMub25jZShFVkVOVC5KT0JfVEVSTUlOQVRFRCwgKCkgPT4ge1xuICAgICAgdGhpcy5pc1Rlcm1pbmF0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy50ZXJtaW5hdGUoKTtcbiAgICB9KTtcblxuICAgIHRoaXMuZXZlbnRzLm9uY2UoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgdGhpcy5zdGF0dXMgPSBKb2JTdGF0dXMuRkFJTEVEO1xuICAgICAgdGhpcy5sdWZpRmlsZS51cGxvYWRTdGF0dXMgPSBVUExPQURfU1RBVFVTLkZBSUxFRDtcblxuICAgICAgdGhpcy5ldmVudHMuZW1pdChFVkVOVC5KT0JfVEVSTUlOQVRFRCwgZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5vbkVycm9yKChldmVudCkgPT4gY29uc29sZS5lcnJvcihldmVudC5lcnJvcikpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRlbGxzIHRoZSB3b3JrZXIgdGhlIGpvYiBpcyBjb21wbGV0ZVxuICAgKi9cbiAgcHVibGljIGNvbXBsZXRlID0gKCkgPT4ge1xuICAgIHRoaXMuc3RhdHVzID0gSm9iU3RhdHVzLkNPTVBMRVRFO1xuICAgIHRoaXMuZXZlbnRzLmVtaXQoRVZFTlQuSk9CX1RFUk1JTkFURUQpO1xuICB9O1xuXG4gIHB1YmxpYyBoYXNGYWlsZWQgPSAoKSA9PiB0aGlzLnN0YXR1cyA9PT0gSm9iU3RhdHVzLkZBSUxFRDtcblxuICBwdWJsaWMgb25FcnJvciA9IChjYWxsYmFjazogKGFyZzogRXJyb3JFdmVudCkgPT4gdm9pZCkgPT4ge1xuICAgIHRoaXMud29ya2VyLm9uZXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcHVibGljIG9uTWVzc2FnZSA9IChjYWxsYmFjaz86IChhcmc6IE1lc3NhZ2VFdmVudCkgPT4gdm9pZCkgPT4ge1xuICAgIHRoaXMud29ya2VyLm9ubWVzc2FnZSA9IChlKSA9PiB7XG4gICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV2ZW50ID0gZS5kYXRhLmV2ZW50O1xuXG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSBFVkVOVC5GSUxFX1VQREFURUQpIHtcbiAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMubHVmaUZpbGUsIGUuZGF0YS5sdWZpRmlsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50LCBlLmRhdGEuZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHB1YmxpYyBvbk1lc3NhZ2VFcnJvciA9IChjYWxsYmFjazogKGFyZzogTWVzc2FnZUV2ZW50KSA9PiB2b2lkKSA9PiB7XG4gICAgdGhpcy53b3JrZXIub25tZXNzYWdlZXJyb3IgPSAoZXZlbnQpID0+IHtcbiAgICAgIGNhbGxiYWNrKGV2ZW50KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcHVibGljIG9uUHJvZ3Jlc3MgPSAoY2FsbGJhY2s6ICgpID0+IHZvaWQpID0+IHtcbiAgICB0aGlzLmV2ZW50cy5vbihFVkVOVC5DSFVOS19VUExPQURFRCwgKCkgPT4ge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcbiAgICB0aGlzLmV2ZW50cy5vbihFVkVOVC5DSFVOS19ET1dOTE9BREVELCAoKSA9PiB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcHVibGljIHJlcXVlc3RNZXNzYWdlID0gKFxuICAgIG1zZzogV29ya2VyUmVxdWVzdE1lc3NhZ2UsXG4gICAgdHJhbnNmZXJhYmxlOiBUcmFuc2ZlcmFibGVbXSA9IFtdLFxuICApID0+IHtcbiAgICB0aGlzLndvcmtlci5wb3N0TWVzc2FnZShtc2csIHRyYW5zZmVyYWJsZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBwdWJsaWMgdGVybWluYXRlID0gKCkgPT4ge1xuICAgIHRoaXMud29ya2VyLnRlcm1pbmF0ZSgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcHVibGljIHdhaXRGb3JDb21wbGV0aW9uID0gKCk6IFJlc3VsdEFzeW5jPEx1ZmlKb2IsIEVycm9yPiA9PiB7XG4gICAgaWYgKHRoaXMuaXNUZXJtaW5hdGVkKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPT09IEpvYlN0YXR1cy5DT01QTEVURSkge1xuICAgICAgICByZXR1cm4gb2tBc3luYyh0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBlcnJBc3luYyhlbnN1cmVFcnJvcihcIkpvYiBoYXMgZmFpbGVkXCIpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgdGhpcy5ldmVudHMub25jZShFVkVOVC5PUEVSQVRJT05fRkFJTEVELCAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdGhpcy5ldmVudHMub25jZShFVkVOVC5KT0JfVEVSTUlOQVRFRCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSBKb2JTdGF0dXMuQ09NUExFVEUpIHtcbiAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIChlcnJvcikgPT4gZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgKTtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIHdhaXRGb3JTdGFydCA9ICgpOiBSZXN1bHRBc3luYzxMdWZpSm9iLCBFcnJvcj4gPT5cbiAgICBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdGhpcy5ldmVudHMub25jZShFVkVOVC5PUEVSQVRJT05fRkFJTEVELCAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5ldmVudHMub25jZShFVkVOVC5VUExPQURfU1RBUlRFRCwgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uY2UoRVZFTlQuRE9XTkxPQURfU1RBUlRFRCwgKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgICAoZXJyb3IpID0+IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICApO1xuXG4gIHByaXZhdGUgZGlzcGF0Y2hFdmVudCA9IChldmVudDogRVZFTlQsIGVycm9yOiB1bmRlZmluZWQgfCBFcnJvcikgPT4ge1xuICAgIHRoaXMuZXZlbnRzLmVtaXQoZXZlbnQsIGVycm9yKTtcbiAgfTtcbn1cbiIsICJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4vaW5kZXguanMnXG5cbmV4cG9ydCB7IEV2ZW50RW1pdHRlciB9XG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXJcbiIsICJleHBvcnQgY2xhc3MgVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG5cdFx0c3VwZXIobWVzc2FnZSk7XG5cdFx0dGhpcy5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XG5cdH1cbn1cblxuLyoqXG5BbiBlcnJvciB0byBiZSB0aHJvd24gd2hlbiB0aGUgcmVxdWVzdCBpcyBhYm9ydGVkIGJ5IEFib3J0Q29udHJvbGxlci5cbkRPTUV4Y2VwdGlvbiBpcyB0aHJvd24gaW5zdGVhZCBvZiB0aGlzIEVycm9yIHdoZW4gRE9NRXhjZXB0aW9uIGlzIGF2YWlsYWJsZS5cbiovXG5leHBvcnQgY2xhc3MgQWJvcnRFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IobWVzc2FnZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0Fib3J0RXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH1cbn1cblxuLyoqXG5UT0RPOiBSZW1vdmUgQWJvcnRFcnJvciBhbmQganVzdCB0aHJvdyBET01FeGNlcHRpb24gd2hlbiB0YXJnZXRpbmcgTm9kZSAxOC5cbiovXG5jb25zdCBnZXRET01FeGNlcHRpb24gPSBlcnJvck1lc3NhZ2UgPT4gZ2xvYmFsVGhpcy5ET01FeGNlcHRpb24gPT09IHVuZGVmaW5lZFxuXHQ/IG5ldyBBYm9ydEVycm9yKGVycm9yTWVzc2FnZSlcblx0OiBuZXcgRE9NRXhjZXB0aW9uKGVycm9yTWVzc2FnZSk7XG5cbi8qKlxuVE9ETzogUmVtb3ZlIGJlbG93IGZ1bmN0aW9uIGFuZCBqdXN0ICdyZWplY3Qoc2lnbmFsLnJlYXNvbiknIHdoZW4gdGFyZ2V0aW5nIE5vZGUgMTguXG4qL1xuY29uc3QgZ2V0QWJvcnRlZFJlYXNvbiA9IHNpZ25hbCA9PiB7XG5cdGNvbnN0IHJlYXNvbiA9IHNpZ25hbC5yZWFzb24gPT09IHVuZGVmaW5lZFxuXHRcdD8gZ2V0RE9NRXhjZXB0aW9uKCdUaGlzIG9wZXJhdGlvbiB3YXMgYWJvcnRlZC4nKVxuXHRcdDogc2lnbmFsLnJlYXNvbjtcblxuXHRyZXR1cm4gcmVhc29uIGluc3RhbmNlb2YgRXJyb3IgPyByZWFzb24gOiBnZXRET01FeGNlcHRpb24ocmVhc29uKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBUaW1lb3V0KHByb21pc2UsIG9wdGlvbnMpIHtcblx0Y29uc3Qge1xuXHRcdG1pbGxpc2Vjb25kcyxcblx0XHRmYWxsYmFjayxcblx0XHRtZXNzYWdlLFxuXHRcdGN1c3RvbVRpbWVycyA9IHtzZXRUaW1lb3V0LCBjbGVhclRpbWVvdXR9LFxuXHR9ID0gb3B0aW9ucztcblxuXHRsZXQgdGltZXI7XG5cblx0Y29uc3Qgd3JhcHBlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBtaWxsaXNlY29uZHMgIT09ICdudW1iZXInIHx8IE1hdGguc2lnbihtaWxsaXNlY29uZHMpICE9PSAxKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBtaWxsaXNlY29uZHNcXGAgdG8gYmUgYSBwb3NpdGl2ZSBudW1iZXIsIGdvdCBcXGAke21pbGxpc2Vjb25kc31cXGBgKTtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5zaWduYWwpIHtcblx0XHRcdGNvbnN0IHtzaWduYWx9ID0gb3B0aW9ucztcblx0XHRcdGlmIChzaWduYWwuYWJvcnRlZCkge1xuXHRcdFx0XHRyZWplY3QoZ2V0QWJvcnRlZFJlYXNvbihzaWduYWwpKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgYWJvcnRIYW5kbGVyID0gKCkgPT4ge1xuXHRcdFx0XHRyZWplY3QoZ2V0QWJvcnRlZFJlYXNvbihzaWduYWwpKTtcblx0XHRcdH07XG5cblx0XHRcdHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0SGFuZGxlciwge29uY2U6IHRydWV9KTtcblxuXHRcdFx0cHJvbWlzZS5maW5hbGx5KCgpID0+IHtcblx0XHRcdFx0c2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRIYW5kbGVyKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChtaWxsaXNlY29uZHMgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuXHRcdFx0cHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gV2UgY3JlYXRlIHRoZSBlcnJvciBvdXRzaWRlIG9mIGBzZXRUaW1lb3V0YCB0byBwcmVzZXJ2ZSB0aGUgc3RhY2sgdHJhY2UuXG5cdFx0Y29uc3QgdGltZW91dEVycm9yID0gbmV3IFRpbWVvdXRFcnJvcigpO1xuXG5cdFx0dGltZXIgPSBjdXN0b21UaW1lcnMuc2V0VGltZW91dC5jYWxsKHVuZGVmaW5lZCwgKCkgPT4ge1xuXHRcdFx0aWYgKGZhbGxiYWNrKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShmYWxsYmFjaygpKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIHByb21pc2UuY2FuY2VsID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHByb21pc2UuY2FuY2VsKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtZXNzYWdlID09PSBmYWxzZSkge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aW1lb3V0RXJyb3IubWVzc2FnZSA9IG1lc3NhZ2UgPz8gYFByb21pc2UgdGltZWQgb3V0IGFmdGVyICR7bWlsbGlzZWNvbmRzfSBtaWxsaXNlY29uZHNgO1xuXHRcdFx0XHRyZWplY3QodGltZW91dEVycm9yKTtcblx0XHRcdH1cblx0XHR9LCBtaWxsaXNlY29uZHMpO1xuXG5cdFx0KGFzeW5jICgpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc29sdmUoYXdhaXQgcHJvbWlzZSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH0pKCk7XG5cdH0pO1xuXG5cdGNvbnN0IGNhbmNlbGFibGVQcm9taXNlID0gd3JhcHBlZFByb21pc2UuZmluYWxseSgoKSA9PiB7XG5cdFx0Y2FuY2VsYWJsZVByb21pc2UuY2xlYXIoKTtcblx0fSk7XG5cblx0Y2FuY2VsYWJsZVByb21pc2UuY2xlYXIgPSAoKSA9PiB7XG5cdFx0Y3VzdG9tVGltZXJzLmNsZWFyVGltZW91dC5jYWxsKHVuZGVmaW5lZCwgdGltZXIpO1xuXHRcdHRpbWVyID0gdW5kZWZpbmVkO1xuXHR9O1xuXG5cdHJldHVybiBjYW5jZWxhYmxlUHJvbWlzZTtcbn1cbiIsICIvLyBQb3J0IG9mIGxvd2VyX2JvdW5kIGZyb20gaHR0cHM6Ly9lbi5jcHByZWZlcmVuY2UuY29tL3cvY3BwL2FsZ29yaXRobS9sb3dlcl9ib3VuZFxuLy8gVXNlZCB0byBjb21wdXRlIGluc2VydGlvbiBpbmRleCB0byBrZWVwIHF1ZXVlIHNvcnRlZCBhZnRlciBpbnNlcnRpb25cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvd2VyQm91bmQoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gICAgbGV0IGZpcnN0ID0gMDtcbiAgICBsZXQgY291bnQgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGNvdW50ID4gMCkge1xuICAgICAgICBjb25zdCBzdGVwID0gTWF0aC50cnVuYyhjb3VudCAvIDIpO1xuICAgICAgICBsZXQgaXQgPSBmaXJzdCArIHN0ZXA7XG4gICAgICAgIGlmIChjb21wYXJhdG9yKGFycmF5W2l0XSwgdmFsdWUpIDw9IDApIHtcbiAgICAgICAgICAgIGZpcnN0ID0gKytpdDtcbiAgICAgICAgICAgIGNvdW50IC09IHN0ZXAgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY291bnQgPSBzdGVwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaXJzdDtcbn1cbiIsICJpbXBvcnQgbG93ZXJCb3VuZCBmcm9tICcuL2xvd2VyLWJvdW5kLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByaW9yaXR5UXVldWUge1xuICAgICNxdWV1ZSA9IFtdO1xuICAgIGVucXVldWUocnVuLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBwcmlvcml0eTogMCxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7XG4gICAgICAgICAgICBwcmlvcml0eTogb3B0aW9ucy5wcmlvcml0eSxcbiAgICAgICAgICAgIHJ1bixcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSAmJiB0aGlzLiNxdWV1ZVt0aGlzLnNpemUgLSAxXS5wcmlvcml0eSA+PSBvcHRpb25zLnByaW9yaXR5KSB7XG4gICAgICAgICAgICB0aGlzLiNxdWV1ZS5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbG93ZXJCb3VuZCh0aGlzLiNxdWV1ZSwgZWxlbWVudCwgKGEsIGIpID0+IGIucHJpb3JpdHkgLSBhLnByaW9yaXR5KTtcbiAgICAgICAgdGhpcy4jcXVldWUuc3BsaWNlKGluZGV4LCAwLCBlbGVtZW50KTtcbiAgICB9XG4gICAgZGVxdWV1ZSgpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuI3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiBpdGVtPy5ydW47XG4gICAgfVxuICAgIGZpbHRlcihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNxdWV1ZS5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQucHJpb3JpdHkgPT09IG9wdGlvbnMucHJpb3JpdHkpLm1hcCgoZWxlbWVudCkgPT4gZWxlbWVudC5ydW4pO1xuICAgIH1cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3F1ZXVlLmxlbmd0aDtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRlbWl0dGVyMyc7XG5pbXBvcnQgcFRpbWVvdXQsIHsgVGltZW91dEVycm9yIH0gZnJvbSAncC10aW1lb3V0JztcbmltcG9ydCBQcmlvcml0eVF1ZXVlIGZyb20gJy4vcHJpb3JpdHktcXVldWUuanMnO1xuLyoqXG5Qcm9taXNlIHF1ZXVlIHdpdGggY29uY3VycmVuY3kgY29udHJvbC5cbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQUXVldWUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgICNjYXJyeW92ZXJDb25jdXJyZW5jeUNvdW50O1xuICAgICNpc0ludGVydmFsSWdub3JlZDtcbiAgICAjaW50ZXJ2YWxDb3VudCA9IDA7XG4gICAgI2ludGVydmFsQ2FwO1xuICAgICNpbnRlcnZhbDtcbiAgICAjaW50ZXJ2YWxFbmQgPSAwO1xuICAgICNpbnRlcnZhbElkO1xuICAgICN0aW1lb3V0SWQ7XG4gICAgI3F1ZXVlO1xuICAgICNxdWV1ZUNsYXNzO1xuICAgICNwZW5kaW5nID0gMDtcbiAgICAvLyBUaGUgYCFgIGlzIG5lZWRlZCBiZWNhdXNlIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMzIxOTRcbiAgICAjY29uY3VycmVuY3k7XG4gICAgI2lzUGF1c2VkO1xuICAgICN0aHJvd09uVGltZW91dDtcbiAgICAvKipcbiAgICBQZXItb3BlcmF0aW9uIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzLiBPcGVyYXRpb25zIGZ1bGZpbGwgb25jZSBgdGltZW91dGAgZWxhcHNlcyBpZiB0aGV5IGhhdmVuJ3QgYWxyZWFkeS5cblxuICAgIEFwcGxpZXMgdG8gZWFjaCBmdXR1cmUgb3BlcmF0aW9uLlxuICAgICovXG4gICAgdGltZW91dDtcbiAgICAvLyBUT0RPOiBUaGUgYHRocm93T25UaW1lb3V0YCBvcHRpb24gc2hvdWxkIGFmZmVjdCB0aGUgcmV0dXJuIHR5cGVzIG9mIGBhZGQoKWAgYW5kIGBhZGRBbGwoKWBcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY29uc2lzdGVudC10eXBlLWFzc2VydGlvbnNcbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNhcnJ5b3ZlckNvbmN1cnJlbmN5Q291bnQ6IGZhbHNlLFxuICAgICAgICAgICAgaW50ZXJ2YWxDYXA6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgICAgIGludGVydmFsOiAwLFxuICAgICAgICAgICAgY29uY3VycmVuY3k6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICAgICAgICAgIHF1ZXVlQ2xhc3M6IFByaW9yaXR5UXVldWUsXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoISh0eXBlb2Ygb3B0aW9ucy5pbnRlcnZhbENhcCA9PT0gJ251bWJlcicgJiYgb3B0aW9ucy5pbnRlcnZhbENhcCA+PSAxKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXFxgaW50ZXJ2YWxDYXBcXGAgdG8gYmUgYSBudW1iZXIgZnJvbSAxIGFuZCB1cCwgZ290IFxcYCR7b3B0aW9ucy5pbnRlcnZhbENhcD8udG9TdHJpbmcoKSA/PyAnJ31cXGAgKCR7dHlwZW9mIG9wdGlvbnMuaW50ZXJ2YWxDYXB9KWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmludGVydmFsID09PSB1bmRlZmluZWQgfHwgIShOdW1iZXIuaXNGaW5pdGUob3B0aW9ucy5pbnRlcnZhbCkgJiYgb3B0aW9ucy5pbnRlcnZhbCA+PSAwKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXFxgaW50ZXJ2YWxcXGAgdG8gYmUgYSBmaW5pdGUgbnVtYmVyID49IDAsIGdvdCBcXGAke29wdGlvbnMuaW50ZXJ2YWw/LnRvU3RyaW5nKCkgPz8gJyd9XFxgICgke3R5cGVvZiBvcHRpb25zLmludGVydmFsfSlgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNjYXJyeW92ZXJDb25jdXJyZW5jeUNvdW50ID0gb3B0aW9ucy5jYXJyeW92ZXJDb25jdXJyZW5jeUNvdW50O1xuICAgICAgICB0aGlzLiNpc0ludGVydmFsSWdub3JlZCA9IG9wdGlvbnMuaW50ZXJ2YWxDYXAgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSB8fCBvcHRpb25zLmludGVydmFsID09PSAwO1xuICAgICAgICB0aGlzLiNpbnRlcnZhbENhcCA9IG9wdGlvbnMuaW50ZXJ2YWxDYXA7XG4gICAgICAgIHRoaXMuI2ludGVydmFsID0gb3B0aW9ucy5pbnRlcnZhbDtcbiAgICAgICAgdGhpcy4jcXVldWUgPSBuZXcgb3B0aW9ucy5xdWV1ZUNsYXNzKCk7XG4gICAgICAgIHRoaXMuI3F1ZXVlQ2xhc3MgPSBvcHRpb25zLnF1ZXVlQ2xhc3M7XG4gICAgICAgIHRoaXMuY29uY3VycmVuY3kgPSBvcHRpb25zLmNvbmN1cnJlbmN5O1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgICAgIHRoaXMuI3Rocm93T25UaW1lb3V0ID0gb3B0aW9ucy50aHJvd09uVGltZW91dCA9PT0gdHJ1ZTtcbiAgICAgICAgdGhpcy4jaXNQYXVzZWQgPSBvcHRpb25zLmF1dG9TdGFydCA9PT0gZmFsc2U7XG4gICAgfVxuICAgIGdldCAjZG9lc0ludGVydmFsQWxsb3dBbm90aGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jaXNJbnRlcnZhbElnbm9yZWQgfHwgdGhpcy4jaW50ZXJ2YWxDb3VudCA8IHRoaXMuI2ludGVydmFsQ2FwO1xuICAgIH1cbiAgICBnZXQgI2RvZXNDb25jdXJyZW50QWxsb3dBbm90aGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jcGVuZGluZyA8IHRoaXMuI2NvbmN1cnJlbmN5O1xuICAgIH1cbiAgICAjbmV4dCgpIHtcbiAgICAgICAgdGhpcy4jcGVuZGluZy0tO1xuICAgICAgICB0aGlzLiN0cnlUb1N0YXJ0QW5vdGhlcigpO1xuICAgICAgICB0aGlzLmVtaXQoJ25leHQnKTtcbiAgICB9XG4gICAgI29uUmVzdW1lSW50ZXJ2YWwoKSB7XG4gICAgICAgIHRoaXMuI29uSW50ZXJ2YWwoKTtcbiAgICAgICAgdGhpcy4jaW5pdGlhbGl6ZUludGVydmFsSWZOZWVkZWQoKTtcbiAgICAgICAgdGhpcy4jdGltZW91dElkID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXQgI2lzSW50ZXJ2YWxQYXVzZWQoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICh0aGlzLiNpbnRlcnZhbElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy4jaW50ZXJ2YWxFbmQgLSBub3c7XG4gICAgICAgICAgICBpZiAoZGVsYXkgPCAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQWN0IGFzIHRoZSBpbnRlcnZhbCB3YXMgZG9uZVxuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gcmVzdW1lIGl0IGhlcmUgYmVjYXVzZSBpdCB3aWxsIGJlIHJlc3VtZWQgb24gbGluZSAxNjBcbiAgICAgICAgICAgICAgICB0aGlzLiNpbnRlcnZhbENvdW50ID0gKHRoaXMuI2NhcnJ5b3ZlckNvbmN1cnJlbmN5Q291bnQpID8gdGhpcy4jcGVuZGluZyA6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBY3QgYXMgdGhlIGludGVydmFsIGlzIHBlbmRpbmdcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4jdGltZW91dElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4jdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiNvblJlc3VtZUludGVydmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAjdHJ5VG9TdGFydEFub3RoZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLiNxdWV1ZS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAvLyBXZSBjYW4gY2xlYXIgdGhlIGludGVydmFsIChcInBhdXNlXCIpXG4gICAgICAgICAgICAvLyBCZWNhdXNlIHdlIGNhbiByZWRvIGl0IGxhdGVyIChcInJlc3VtZVwiKVxuICAgICAgICAgICAgaWYgKHRoaXMuI2ludGVydmFsSWQpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuI2ludGVydmFsSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4jaW50ZXJ2YWxJZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZW1wdHknKTtcbiAgICAgICAgICAgIGlmICh0aGlzLiNwZW5kaW5nID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpZGxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLiNpc1BhdXNlZCkge1xuICAgICAgICAgICAgY29uc3QgY2FuSW5pdGlhbGl6ZUludGVydmFsID0gIXRoaXMuI2lzSW50ZXJ2YWxQYXVzZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy4jZG9lc0ludGVydmFsQWxsb3dBbm90aGVyICYmIHRoaXMuI2RvZXNDb25jdXJyZW50QWxsb3dBbm90aGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgam9iID0gdGhpcy4jcXVldWUuZGVxdWV1ZSgpO1xuICAgICAgICAgICAgICAgIGlmICgham9iKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBqb2IoKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FuSW5pdGlhbGl6ZUludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuI2luaXRpYWxpemVJbnRlcnZhbElmTmVlZGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgI2luaXRpYWxpemVJbnRlcnZhbElmTmVlZGVkKCkge1xuICAgICAgICBpZiAodGhpcy4jaXNJbnRlcnZhbElnbm9yZWQgfHwgdGhpcy4jaW50ZXJ2YWxJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4jaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuI29uSW50ZXJ2YWwoKTtcbiAgICAgICAgfSwgdGhpcy4jaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLiNpbnRlcnZhbEVuZCA9IERhdGUubm93KCkgKyB0aGlzLiNpbnRlcnZhbDtcbiAgICB9XG4gICAgI29uSW50ZXJ2YWwoKSB7XG4gICAgICAgIGlmICh0aGlzLiNpbnRlcnZhbENvdW50ID09PSAwICYmIHRoaXMuI3BlbmRpbmcgPT09IDAgJiYgdGhpcy4jaW50ZXJ2YWxJZCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLiNpbnRlcnZhbElkKTtcbiAgICAgICAgICAgIHRoaXMuI2ludGVydmFsSWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4jaW50ZXJ2YWxDb3VudCA9IHRoaXMuI2NhcnJ5b3ZlckNvbmN1cnJlbmN5Q291bnQgPyB0aGlzLiNwZW5kaW5nIDogMDtcbiAgICAgICAgdGhpcy4jcHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgIEV4ZWN1dGVzIGFsbCBxdWV1ZWQgZnVuY3Rpb25zIHVudGlsIGl0IHJlYWNoZXMgdGhlIGxpbWl0LlxuICAgICovXG4gICAgI3Byb2Nlc3NRdWV1ZSgpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgICAgIHdoaWxlICh0aGlzLiN0cnlUb1N0YXJ0QW5vdGhlcigpKSB7IH1cbiAgICB9XG4gICAgZ2V0IGNvbmN1cnJlbmN5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jY29uY3VycmVuY3k7XG4gICAgfVxuICAgIHNldCBjb25jdXJyZW5jeShuZXdDb25jdXJyZW5jeSkge1xuICAgICAgICBpZiAoISh0eXBlb2YgbmV3Q29uY3VycmVuY3kgPT09ICdudW1iZXInICYmIG5ld0NvbmN1cnJlbmN5ID49IDEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBjb25jdXJyZW5jeVxcYCB0byBiZSBhIG51bWJlciBmcm9tIDEgYW5kIHVwLCBnb3QgXFxgJHtuZXdDb25jdXJyZW5jeX1cXGAgKCR7dHlwZW9mIG5ld0NvbmN1cnJlbmN5fSlgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNjb25jdXJyZW5jeSA9IG5ld0NvbmN1cnJlbmN5O1xuICAgICAgICB0aGlzLiNwcm9jZXNzUXVldWUoKTtcbiAgICB9XG4gICAgYXN5bmMgI3Rocm93T25BYm9ydChzaWduYWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChfcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHNpZ25hbC5yZWFzb24pO1xuICAgICAgICAgICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgYWRkKGZ1bmN0aW9uXywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgICAgICB0aHJvd09uVGltZW91dDogdGhpcy4jdGhyb3dPblRpbWVvdXQsXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4jcXVldWUuZW5xdWV1ZShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4jcGVuZGluZysrO1xuICAgICAgICAgICAgICAgIHRoaXMuI2ludGVydmFsQ291bnQrKztcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnNpZ25hbD8udGhyb3dJZkFib3J0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvbiA9IGZ1bmN0aW9uXyh7IHNpZ25hbDogb3B0aW9ucy5zaWduYWwgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IHBUaW1lb3V0KFByb21pc2UucmVzb2x2ZShvcGVyYXRpb24pLCB7IG1pbGxpc2Vjb25kczogb3B0aW9ucy50aW1lb3V0IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNpZ25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uID0gUHJvbWlzZS5yYWNlKFtvcGVyYXRpb24sIHRoaXMuI3Rocm93T25BYm9ydChvcHRpb25zLnNpZ25hbCldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBvcGVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdjb21wbGV0ZWQnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgVGltZW91dEVycm9yICYmICFvcHRpb25zLnRocm93T25UaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuI25leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYWRkJyk7XG4gICAgICAgICAgICB0aGlzLiN0cnlUb1N0YXJ0QW5vdGhlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgYWRkQWxsKGZ1bmN0aW9ucywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZnVuY3Rpb25zLm1hcChhc3luYyAoZnVuY3Rpb25fKSA9PiB0aGlzLmFkZChmdW5jdGlvbl8sIG9wdGlvbnMpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgIFN0YXJ0IChvciByZXN1bWUpIGV4ZWN1dGluZyBlbnF1ZXVlZCB0YXNrcyB3aXRoaW4gY29uY3VycmVuY3kgbGltaXQuIE5vIG5lZWQgdG8gY2FsbCB0aGlzIGlmIHF1ZXVlIGlzIG5vdCBwYXVzZWQgKHZpYSBgb3B0aW9ucy5hdXRvU3RhcnQgPSBmYWxzZWAgb3IgYnkgYC5wYXVzZSgpYCBtZXRob2QuKVxuICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy4jaXNQYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuI2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuI3Byb2Nlc3NRdWV1ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgUHV0IHF1ZXVlIGV4ZWN1dGlvbiBvbiBob2xkLlxuICAgICovXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIHRoaXMuI2lzUGF1c2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgQ2xlYXIgdGhlIHF1ZXVlLlxuICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuI3F1ZXVlID0gbmV3IHRoaXMuI3F1ZXVlQ2xhc3MoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgQ2FuIGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcy4gVXNlZnVsIGlmIHlvdSBmb3IgZXhhbXBsZSBhZGQgYWRkaXRpb25hbCBpdGVtcyBhdCBhIGxhdGVyIHRpbWUuXG5cbiAgICBAcmV0dXJucyBBIHByb21pc2UgdGhhdCBzZXR0bGVzIHdoZW4gdGhlIHF1ZXVlIGJlY29tZXMgZW1wdHkuXG4gICAgKi9cbiAgICBhc3luYyBvbkVtcHR5KCkge1xuICAgICAgICAvLyBJbnN0YW50bHkgcmVzb2x2ZSBpZiB0aGUgcXVldWUgaXMgZW1wdHlcbiAgICAgICAgaWYgKHRoaXMuI3F1ZXVlLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLiNvbkV2ZW50KCdlbXB0eScpO1xuICAgIH1cbiAgICAvKipcbiAgICBAcmV0dXJucyBBIHByb21pc2UgdGhhdCBzZXR0bGVzIHdoZW4gdGhlIHF1ZXVlIHNpemUgaXMgbGVzcyB0aGFuIHRoZSBnaXZlbiBsaW1pdDogYHF1ZXVlLnNpemUgPCBsaW1pdGAuXG5cbiAgICBJZiB5b3Ugd2FudCB0byBhdm9pZCBoYXZpbmcgdGhlIHF1ZXVlIGdyb3cgYmV5b25kIGEgY2VydGFpbiBzaXplIHlvdSBjYW4gYGF3YWl0IHF1ZXVlLm9uU2l6ZUxlc3NUaGFuKClgIGJlZm9yZSBhZGRpbmcgYSBuZXcgaXRlbS5cblxuICAgIE5vdGUgdGhhdCB0aGlzIG9ubHkgbGltaXRzIHRoZSBudW1iZXIgb2YgaXRlbXMgd2FpdGluZyB0byBzdGFydC4gVGhlcmUgY291bGQgc3RpbGwgYmUgdXAgdG8gYGNvbmN1cnJlbmN5YCBqb2JzIGFscmVhZHkgcnVubmluZyB0aGF0IHRoaXMgY2FsbCBkb2VzIG5vdCBpbmNsdWRlIGluIGl0cyBjYWxjdWxhdGlvbi5cbiAgICAqL1xuICAgIGFzeW5jIG9uU2l6ZUxlc3NUaGFuKGxpbWl0KSB7XG4gICAgICAgIC8vIEluc3RhbnRseSByZXNvbHZlIGlmIHRoZSBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgICAgaWYgKHRoaXMuI3F1ZXVlLnNpemUgPCBsaW1pdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuI29uRXZlbnQoJ25leHQnLCAoKSA9PiB0aGlzLiNxdWV1ZS5zaXplIDwgbGltaXQpO1xuICAgIH1cbiAgICAvKipcbiAgICBUaGUgZGlmZmVyZW5jZSB3aXRoIGAub25FbXB0eWAgaXMgdGhhdCBgLm9uSWRsZWAgZ3VhcmFudGVlcyB0aGF0IGFsbCB3b3JrIGZyb20gdGhlIHF1ZXVlIGhhcyBmaW5pc2hlZC4gYC5vbkVtcHR5YCBtZXJlbHkgc2lnbmFscyB0aGF0IHRoZSBxdWV1ZSBpcyBlbXB0eSwgYnV0IGl0IGNvdWxkIG1lYW4gdGhhdCBzb21lIHByb21pc2VzIGhhdmVuJ3QgY29tcGxldGVkIHlldC5cblxuICAgIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHNldHRsZXMgd2hlbiB0aGUgcXVldWUgYmVjb21lcyBlbXB0eSwgYW5kIGFsbCBwcm9taXNlcyBoYXZlIGNvbXBsZXRlZDsgYHF1ZXVlLnNpemUgPT09IDAgJiYgcXVldWUucGVuZGluZyA9PT0gMGAuXG4gICAgKi9cbiAgICBhc3luYyBvbklkbGUoKSB7XG4gICAgICAgIC8vIEluc3RhbnRseSByZXNvbHZlIGlmIG5vbmUgcGVuZGluZyBhbmQgaWYgbm90aGluZyBlbHNlIGlzIHF1ZXVlZFxuICAgICAgICBpZiAodGhpcy4jcGVuZGluZyA9PT0gMCAmJiB0aGlzLiNxdWV1ZS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy4jb25FdmVudCgnaWRsZScpO1xuICAgIH1cbiAgICBhc3luYyAjb25FdmVudChldmVudCwgZmlsdGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgJiYgIWZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5vbihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgU2l6ZSBvZiB0aGUgcXVldWUsIHRoZSBudW1iZXIgb2YgcXVldWVkIGl0ZW1zIHdhaXRpbmcgdG8gcnVuLlxuICAgICovXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNxdWV1ZS5zaXplO1xuICAgIH1cbiAgICAvKipcbiAgICBTaXplIG9mIHRoZSBxdWV1ZSwgZmlsdGVyZWQgYnkgdGhlIGdpdmVuIG9wdGlvbnMuXG5cbiAgICBGb3IgZXhhbXBsZSwgdGhpcyBjYW4gYmUgdXNlZCB0byBmaW5kIHRoZSBudW1iZXIgb2YgaXRlbXMgcmVtYWluaW5nIGluIHRoZSBxdWV1ZSB3aXRoIGEgc3BlY2lmaWMgcHJpb3JpdHkgbGV2ZWwuXG4gICAgKi9cbiAgICBzaXplQnkob3B0aW9ucykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9uby1hcnJheS1jYWxsYmFjay1yZWZlcmVuY2VcbiAgICAgICAgcmV0dXJuIHRoaXMuI3F1ZXVlLmZpbHRlcihvcHRpb25zKS5sZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgIE51bWJlciBvZiBydW5uaW5nIGl0ZW1zIChubyBsb25nZXIgaW4gdGhlIHF1ZXVlKS5cbiAgICAqL1xuICAgIGdldCBwZW5kaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jcGVuZGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgV2hldGhlciB0aGUgcXVldWUgaXMgY3VycmVudGx5IHBhdXNlZC5cbiAgICAqL1xuICAgIGdldCBpc1BhdXNlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2lzUGF1c2VkO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwifi9lcnJvci9iYXNlLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJFcnJvciBleHRlbmRzIEJhc2VFcnJvciB7fVxuIiwgImltcG9ydCB7IFdvcmtlckVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd29ya2VyL3dvcmtlci1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyVW5kZWZpbmVkUGFyYW1ldGVyRXJyb3IgZXh0ZW5kcyBXb3JrZXJFcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2UgPSBcIlBhcmFtZXRlciBtdXN0IGJlIGRlZmluZWRcIjtcbn1cbiIsICJpbXBvcnQgeyBlcnJBc3luYywgb2tBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgeyB1cGxvYWRDaHVuayB9IGZyb20gXCJ+L2FwaS93ZWJzb2NrZXQudHNcIjtcbmltcG9ydCB7IGdldEZpbGVJbmRleEluUXVldWUgfSBmcm9tIFwifi9hcGkvbHVmaS50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJBY3Rpb25NZXNzYWdlIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1hY3Rpb24tbWVzc2FnZS50c1wiO1xuaW1wb3J0IHsgZXZlbnRzLCBpbml0LCBzZW5kRmlsZUVycm9yLCB1cGRhdGVGaWxlIH0gZnJvbSBcIn4vd29ya2VyL3NoYXJlZC50c1wiO1xuaW1wb3J0IFBRdWV1ZSBmcm9tIFwicC1xdWV1ZVwiO1xuaW1wb3J0IHsgV09SS0VSX0FDVElPTiB9IGZyb20gXCJ+L2VudW0vd29ya2VyLWFjdGlvbi50c1wiO1xuaW1wb3J0IHsgZW5jcnlwdCB9IGZyb20gXCJ+L2FwaS9jcnlwdG8udHNcIjtcbmltcG9ydCB7IFdvcmtlclVuZGVmaW5lZFBhcmFtZXRlckVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd29ya2VyL3dvcmtlci11bmRlZmluZWQtcGFyYW1ldGVyLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEx1ZmlGaWxlIH0gZnJvbSBcIn4vZW50aXRpZXMvbHVmaS1maWxlLnRzXCI7XG5pbXBvcnQgeyB3b3JrZXJVcmwgfSBmcm9tIFwifi91dGlscy50c1wiO1xuXG5kZWNsYXJlIGNvbnN0IHNlbGY6IFdvcmtlcjtcblxubGV0IGlzSW5pdGlhbGl6ZWQgPSBmYWxzZTtcbmNvbnN0IFFVRVVFX0NPTkNVUlJFTkNZX0xJTUlUID0gbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgfHwgMTtcbmNvbnN0IHF1ZXVlID0gbmV3IFBRdWV1ZSh7XG4gIGNvbmN1cnJlbmN5OiBRVUVVRV9DT05DVVJSRU5DWV9MSU1JVCxcbiAgYXV0b1N0YXJ0OiBmYWxzZSxcbn0pO1xubGV0IGl0ZW1zSW5RdWV1ZSA9IDA7XG5sZXQgaXNQYXVzZWQgPSBmYWxzZTtcbmxldCBsdWZpRmlsZTogTHVmaUZpbGU7XG5jb25zdCBlbmNyeXB0Sm9iID0gbmV3IFdvcmtlcih3b3JrZXJVcmwoXCJlbmNyeXB0XCIpLCB7IHR5cGU6IFwibW9kdWxlXCIgfSk7XG5cbnNlbGYub25tZXNzYWdlID0gKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgaWYgKCFpc0luaXRpYWxpemVkKSB7XG4gICAgaW5pdCgpO1xuICAgIGlzSW5pdGlhbGl6ZWQgPSB0cnVlO1xuXG4gICAgbHVmaUZpbGUgPSBldmVudC5kYXRhLmFyZ3MubHVmaUZpbGU7XG5cbiAgICBldmVudHMub25jZShFVkVOVC5VUExPQURfU1RBUlRFRCwgKCkgPT4ge1xuICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5VUExPQURfU1RBUlRFRCB9KTtcbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihFVkVOVC5DSFVOS19VUExPQURFRCwgKCkgPT4ge1xuICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5DSFVOS19VUExPQURFRCB9KTtcblxuICAgICAgaXRlbXNJblF1ZXVlLS07XG5cbiAgICAgIGlmIChcbiAgICAgICAgcXVldWUuaXNQYXVzZWQgJiYgIWlzUGF1c2VkICYmIGl0ZW1zSW5RdWV1ZSA8IFFVRVVFX0NPTkNVUlJFTkNZX0xJTUlUXG4gICAgICApIHtcbiAgICAgICAgcmVzdW1lUXVldWUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbmNlKEVWRU5ULlVQTE9BRF9DT01QTEVURSwgKCkgPT4ge1xuICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICAgIGV2ZW50OiBFVkVOVC5VUExPQURfQ09NUExFVEUsXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbihFVkVOVC5GSUxFX1VQREFURUQsIHVwZGF0ZUZpbGUpO1xuICB9XG5cbiAgaWYgKGV2ZW50LmRhdGEuYXJncy5jaHVuaykge1xuICAgIGV2ZW50LmRhdGEuYXJncy5sdWZpRmlsZSA9IGx1ZmlGaWxlO1xuICAgIHJldHVybiBzdGFydFVwbG9hZChcbiAgICAgIGV2ZW50LmRhdGEsXG4gICAgICBnZXRGaWxlSW5kZXhJblF1ZXVlKGx1ZmlGaWxlLmtleXMuY2xpZW50KSxcbiAgICApLm1hcEVycigoZXJyb3IpID0+IHtcbiAgICAgIHNlbmRGaWxlRXJyb3IobHVmaUZpbGUsIGVycm9yKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZXZlbnQuZGF0YS5hY3Rpb24gPT09IFdPUktFUl9BQ1RJT04uUEFVU0UpIHtcbiAgICAgIGlzUGF1c2VkID0gdHJ1ZTtcbiAgICAgIHBhdXNlUXVldWUoKTtcbiAgICB9IGVsc2UgaWYgKGV2ZW50LmRhdGEuYWN0aW9uID09PSBXT1JLRVJfQUNUSU9OLlJFU1VNRSkge1xuICAgICAgaXNQYXVzZWQgPSBmYWxzZTtcbiAgICAgIHJlc3VtZVF1ZXVlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbmRGaWxlRXJyb3IobHVmaUZpbGUsIG5ldyBXb3JrZXJVbmRlZmluZWRQYXJhbWV0ZXJFcnJvcigpKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHN0YXJ0VXBsb2FkID0gKFxuICB3b3JrZXJNZXNzYWdlOiBXb3JrZXJBY3Rpb25NZXNzYWdlLFxuICBzZXJ2ZXJRdWV1ZUluZGV4OiBudW1iZXIsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBFcnJvcj4gPT4ge1xuICBjb25zdCB7IGx1ZmlGaWxlLCBhbGdvIH0gPSB3b3JrZXJNZXNzYWdlLmFyZ3M7XG5cbiAgaWYgKFxuICAgIHdvcmtlck1lc3NhZ2UuYXJncy5jaHVuayAhPT0gdW5kZWZpbmVkICYmXG4gICAgYWxnbyAhPT0gdW5kZWZpbmVkXG4gICkge1xuICAgIC8vIFVwbG9hZCBmaXJzdCBjaHVuayBiZWZvcmUgdG8gZ2V0IHNlcnZlcktleSBpbiBvcmRlciB0byBiZSBhYmxlIHRvIHVwbG9hZCBvdGhlciBjaHVua3NcbiAgICBpZiAod29ya2VyTWVzc2FnZS5hcmdzLmNodW5rLmluZGV4ID09PSAwKSB7XG4gICAgICBlbmNyeXB0KGx1ZmlGaWxlLmtleXMuY2xpZW50LCB3b3JrZXJNZXNzYWdlLmFyZ3MuY2h1bmsuYnVmZmVyLCBhbGdvKS5tYXAoXG4gICAgICAgIChlbmNyeXB0ZWREYXRhKSA9PiB7XG4gICAgICAgICAgdXBsb2FkQ2h1bmsoXG4gICAgICAgICAgICBsdWZpRmlsZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdG90YWw6IGx1ZmlGaWxlLnRvdGFsQ2h1bmtzLFxuICAgICAgICAgICAgICBwYXJ0OiAwLFxuICAgICAgICAgICAgICBzaXplOiBsdWZpRmlsZS5zaXplLFxuICAgICAgICAgICAgICBuYW1lOiBsdWZpRmlsZS5uYW1lLFxuICAgICAgICAgICAgICB0eXBlOiBsdWZpRmlsZS50eXBlLFxuICAgICAgICAgICAgICBkZWxheTogbHVmaUZpbGUuZGVsYXksXG4gICAgICAgICAgICAgIGRlbF9hdF9maXJzdF92aWV3OiBsdWZpRmlsZS5kZWxBdEZpcnN0VmlldyxcbiAgICAgICAgICAgICAgemlwcGVkOiBsdWZpRmlsZS56aXBwZWQsXG4gICAgICAgICAgICAgIGlkOiBudWxsLFxuICAgICAgICAgICAgICBpOiBzZXJ2ZXJRdWV1ZUluZGV4LFxuICAgICAgICAgICAgICBmaWxlX3B3ZDogbHVmaUZpbGUucGFzc3dvcmQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW5jcnlwdGVkRGF0YSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaXRlbXNJblF1ZXVlKys7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBxdWV1ZS5hZGQoKCkgPT4ge1xuICAgICAgICBpZiAod29ya2VyTWVzc2FnZS5hcmdzLmNodW5rKSB7XG4gICAgICAgICAgY29uc3Qgd2FpdEZvckVuY3J5cHRpb24gPSAoKSA9PiB7XG4gICAgICAgICAgICBpdGVtc0luUXVldWUrKztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgICAgICAgIGVuY3J5cHRKb2Iub25tZXNzYWdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh1cGxvYWRDaHVuayhcbiAgICAgICAgICAgICAgICAgIGx1ZmlGaWxlLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbDogbHVmaUZpbGUudG90YWxDaHVua3MsXG4gICAgICAgICAgICAgICAgICAgIHBhcnQ6IGV2ZW50LmRhdGEuY2h1bmtJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogbHVmaUZpbGUuc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbHVmaUZpbGUubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogbHVmaUZpbGUudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgZGVsYXk6IGx1ZmlGaWxlLmRlbGF5LFxuICAgICAgICAgICAgICAgICAgICBkZWxfYXRfZmlyc3RfdmlldzogbHVmaUZpbGUuZGVsQXRGaXJzdFZpZXcsXG4gICAgICAgICAgICAgICAgICAgIHppcHBlZDogbHVmaUZpbGUuemlwcGVkLFxuICAgICAgICAgICAgICAgICAgICBpZDogbHVmaUZpbGUua2V5cy5zZXJ2ZXIsXG4gICAgICAgICAgICAgICAgICAgIGk6IHNlcnZlclF1ZXVlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVfcHdkOiBsdWZpRmlsZS5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBldmVudC5kYXRhLmVuY3J5cHRlZERhdGEsXG4gICAgICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZW5jcnlwdEpvYi5wb3N0TWVzc2FnZSh3b3JrZXJNZXNzYWdlLCBbXG4gICAgICAgICAgICB3b3JrZXJNZXNzYWdlLmFyZ3MuY2h1bmsuYnVmZmVyLFxuICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIXF1ZXVlLmlzUGF1c2VkICYmIChpc1BhdXNlZCB8fFxuICAgICAgICAgICAgICBpdGVtc0luUXVldWUgPT09IFFVRVVFX0NPTkNVUlJFTkNZX0xJTUlUKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcGF1c2VRdWV1ZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdhaXRGb3JFbmNyeXB0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICBuZXcgV29ya2VyVW5kZWZpbmVkUGFyYW1ldGVyRXJyb3IoKSxcbiAgICApO1xuICB9XG4gIHJldHVybiBva0FzeW5jKHVuZGVmaW5lZCk7XG59O1xuXG5jb25zdCBwYXVzZVF1ZXVlID0gKCkgPT4ge1xuICBxdWV1ZS5wYXVzZSgpO1xuICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULkpPQl9QQVVTRUQgfSk7XG59O1xuXG5jb25zdCByZXN1bWVRdWV1ZSA9ICgpID0+IHtcbiAgcXVldWUuc3RhcnQoKTtcbiAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5KT0JfUkVTVU1FRCB9KTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUF1QkEsUUFBSSxJQUFJLE9BQU8sWUFBWSxXQUFXLFVBQVU7QUFDaEQsUUFBSSxlQUFlLEtBQUssT0FBTyxFQUFFLFVBQVUsYUFDdkMsRUFBRSxRQUNGLFNBQVNBLGNBQWEsUUFBUSxVQUFVLE1BQU07QUFDOUMsYUFBTyxTQUFTLFVBQVUsTUFBTSxLQUFLLFFBQVEsVUFBVSxJQUFJO0FBQUEsSUFDN0Q7QUFFRixRQUFJO0FBQ0osUUFBSSxLQUFLLE9BQU8sRUFBRSxZQUFZLFlBQVk7QUFDeEMsdUJBQWlCLEVBQUU7QUFBQSxJQUNyQixXQUFXLE9BQU8sdUJBQXVCO0FBQ3ZDLHVCQUFp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O0FBQUE7QUFBYSxRQUFJRSxRQUFLLEVBQUMsUUFBTyxDQUFDLEdBQUUsTUFBSyxDQUFDLEdBQUUsYUFBWSxDQUFDLEdBQUUsTUFBSyxDQUFDLEdBQUUsTUFBSyxDQUFDLEdBQUUsT0FBTSxDQUFDLEdBQUUsV0FBVSxFQUFDLFNBQVEsU0FBUyxHQUFFO0FBQUMsV0FBSyxXQUFTLFdBQVU7QUFBQyxlQUFNLGNBQVksS0FBSztBQUFBLE1BQU87QUFBRSxXQUFLLFVBQVE7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUU7QUFBQyxXQUFLLFdBQVMsV0FBVTtBQUFDLGVBQU0sY0FBWSxLQUFLO0FBQUEsTUFBTztBQUFFLFdBQUssVUFBUTtBQUFBLElBQUMsR0FBRSxLQUFJLFNBQVMsR0FBRTtBQUFDLFdBQUssV0FBUyxXQUFVO0FBQUMsZUFBTSxVQUFRLEtBQUs7QUFBQSxNQUFPO0FBQUUsV0FBSyxVQUFRO0FBQUEsSUFBQyxHQUFFLFVBQVMsU0FBUyxHQUFFO0FBQUMsV0FBSyxXQUFTLFdBQVU7QUFBQyxlQUFNLGdCQUFjLEtBQUs7QUFBQSxNQUFPO0FBQUUsV0FBSyxVQUFRO0FBQUEsSUFBQyxFQUFDLEVBQUM7QUFDM2MsSUFBQUEsTUFBSyxPQUFPLE1BQUksU0FBUyxHQUFFO0FBQUMsV0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFHLEtBQUssRUFBRTtBQUFFLFVBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUUsS0FBSyxFQUFFLENBQUM7QUFBRSxVQUFFLEVBQUU7QUFBTyxVQUFJLElBQUU7QUFBRSxVQUFHLE1BQUksS0FBRyxNQUFJLEtBQUcsTUFBSSxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsc0JBQXNCO0FBQUUsV0FBSyxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRyxLQUFJO0FBQUMsWUFBRSxFQUFFLElBQUUsQ0FBQztBQUFFLFlBQUcsTUFBSSxJQUFFLEtBQUcsTUFBSSxLQUFHLE1BQUksSUFBRSxFQUFFLEtBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEdBQUcsS0FBRyxLQUFHLEVBQUUsS0FBRyxJQUFFLEdBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLEdBQUUsTUFBSSxJQUFFLE1BQUksSUFBRSxLQUFHLElBQUUsTUFBSSxLQUFHLEtBQUcsSUFBRyxJQUFFLEtBQUcsSUFBRSxPQUFLLEtBQUc7QUFBSSxVQUFFLENBQUMsSUFBRSxFQUFFLElBQUUsQ0FBQyxJQUFFO0FBQUEsTUFBQztBQUFDLFdBQUksSUFBRSxHQUFFLEdBQUUsS0FBSSxJQUFJLEtBQUUsRUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxLQUFHLEtBQUcsSUFBRSxJQUFFLElBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFJLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFDM2YsR0FBRyxDQUFDO0FBQUEsSUFBQztBQUNMLElBQUFBLE1BQUssT0FBTyxJQUFJLFlBQVUsRUFBQyxTQUFRLFNBQVMsR0FBRTtBQUFDLGFBQU8sR0FBRyxNQUFLLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRTtBQUFDLGFBQU8sR0FBRyxNQUFLLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxHQUFFLFdBQVU7QUFBQyxVQUFJLElBQUUsS0FBSyxFQUFFLENBQUMsR0FBRSxJQUFFLEtBQUssRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsTUFBTSxHQUFFLElBQUksSUFBRyxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsT0FBSyxLQUFHLE1BQUksQ0FBQyxJQUFFO0FBQUUsV0FBSSxJQUFFLElBQUUsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEtBQUcsS0FBRyxHQUFFLElBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHLElBQUUsS0FBRyxJQUFFLEtBQUcsSUFBRSxLQUFHLEdBQUUsSUFBRSxLQUFHLElBQUUsSUFBRSxNQUFJLElBQUcsRUFBRSxDQUFDLElBQUUsR0FBRSxFQUFFLENBQUMsSUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsSUFBRSxXQUFVLElBQUUsUUFBUSxJQUFFLE1BQU0sSUFBRSxXQUFVLEdBQUUsSUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFFLFdBQVUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksR0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLEtBQUcsTUFBSTtBQUFFLFdBQUksSUFDbGdCLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDO0FBQUEsSUFBQyxFQUFDO0FBQ2hELGFBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUcsTUFBSSxFQUFFLE9BQU8sT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx3QkFBd0I7QUFBRSxVQUFJLElBQUUsRUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsU0FBTyxJQUFFLEdBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFFLEVBQUUsRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLENBQUM7QUFBRSxVQUFJLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksS0FBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBSSxFQUFFLElBQUUsRUFBRSxLQUFHLEtBQUcsR0FBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFJLEVBQUUsSUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLElBQUUsRUFBRSxLQUFHLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFO0FBQUUsV0FBSSxJQUNyZixHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEdBQUcsS0FBRyxLQUFHLEVBQUUsS0FBRyxJQUFFLEdBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUU7QUFBRSxhQUFPO0FBQUEsSUFBQztBQUNoSCxJQUFBQSxNQUFLLFdBQVMsRUFBQyxVQUFTLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFFQSxNQUFLLFNBQVMsRUFBRSxFQUFFLE1BQU0sSUFBRSxFQUFFLEdBQUUsTUFBSSxJQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7QUFBRSxhQUFPLFdBQVMsSUFBRSxJQUFFQSxNQUFLLFNBQVMsTUFBTSxHQUFFLElBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsS0FBSyxNQUFNLENBQUMsSUFBRSxJQUFFLEVBQUU7QUFBRSxlQUFRLElBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxFQUFFLElBQUUsS0FBRyxDQUFDLEtBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxLQUFHLElBQUUsQ0FBQyxNQUFJLElBQUUsRUFBRSxJQUFFLEtBQUcsQ0FBQyxNQUFJLE1BQUksS0FBRyxLQUFHO0FBQUEsSUFBQyxHQUFFLFFBQU8sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHLE1BQUksRUFBRSxVQUFRLE1BQUksRUFBRSxPQUFPLFFBQU8sRUFBRSxPQUFPLENBQUM7QUFBRSxVQUFJLElBQUUsRUFBRSxFQUFFLFNBQU8sQ0FBQyxHQUFFLElBQUVBLE1BQUssU0FBUyxXQUFXLENBQUM7QUFBRSxhQUFPLE9BQUssSUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFFQSxNQUFLLFNBQVMsRUFBRSxHQUFFLEdBQUUsSUFBRSxHQUFFLEVBQUUsTUFBTSxHQUFFLEVBQUUsU0FBTyxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsV0FBVSxTQUFTLEdBQUU7QUFBQyxVQUFJLElBQUUsRUFBRTtBQUFPLGFBQU8sTUFDMWYsSUFBRSxJQUFFLE1BQUksSUFBRSxLQUFHQSxNQUFLLFNBQVMsV0FBVyxFQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQyxHQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHLEtBQUcsRUFBRSxTQUFPLEVBQUUsUUFBTztBQUFFLFVBQUUsRUFBRSxNQUFNLEdBQUUsS0FBSyxLQUFLLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxJQUFFLEVBQUU7QUFBTyxVQUFFLElBQUU7QUFBRyxVQUFFLEtBQUcsTUFBSSxFQUFFLElBQUUsQ0FBQyxJQUFFQSxNQUFLLFNBQVMsUUFBUSxHQUFFLEVBQUUsSUFBRSxDQUFDLElBQUUsY0FBWSxJQUFFLEdBQUUsQ0FBQztBQUFHLGFBQU87QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsYUFBTyxPQUFLLElBQUUsS0FBRyxJQUFFLElBQUUsSUFBRSxLQUFHLEtBQUcsS0FBRyxnQkFBYztBQUFBLElBQUMsR0FBRSxZQUFXLFNBQVMsR0FBRTtBQUFDLGFBQU8sS0FBSyxNQUFNLElBQUUsYUFBYSxLQUFHO0FBQUEsSUFBRSxHQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHQSxNQUFLLFNBQVMsVUFBVSxDQUFDLE1BQUlBLE1BQUssU0FBUyxVQUFVLENBQUMsRUFBRSxRQUFNO0FBQUcsVUFBSSxJQUFFLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLE1BQUcsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsYUFBTyxNQUNsZjtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUk7QUFBRSxVQUFFO0FBQUUsV0FBSSxXQUFTLE1BQUksSUFBRSxDQUFDLElBQUcsTUFBSSxHQUFFLEtBQUcsR0FBRyxHQUFFLEtBQUssQ0FBQyxHQUFFLElBQUU7QUFBRSxVQUFHLE1BQUksRUFBRSxRQUFPLEVBQUUsT0FBTyxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxHQUFFLEtBQUssSUFBRSxFQUFFLENBQUMsTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsS0FBRyxLQUFHO0FBQUUsVUFBRSxFQUFFLFNBQU8sRUFBRSxFQUFFLFNBQU8sQ0FBQyxJQUFFO0FBQUUsVUFBRUEsTUFBSyxTQUFTLFdBQVcsQ0FBQztBQUFFLFFBQUUsS0FBS0EsTUFBSyxTQUFTLFFBQVEsSUFBRSxJQUFFLElBQUcsS0FBRyxJQUFFLElBQUUsSUFBRSxFQUFFLElBQUksR0FBRSxDQUFDLENBQUM7QUFBRSxhQUFPO0FBQUEsSUFBQyxHQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUU7QUFBQyxhQUFNLENBQUMsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsV0FBVSxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxFQUFFLEVBQUUsS0FBRSxFQUFFLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxNQUFJLEtBQUcsTUFBSSxJQUFFLFNBQVEsSUFBRSxVQUFTLElBQUUsS0FBRztBQUFHLGFBQU87QUFBQSxJQUFDLEVBQUM7QUFDcGQsSUFBQUEsTUFBSyxNQUFNLGFBQVcsRUFBQyxVQUFTLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRSxJQUFHLElBQUVBLE1BQUss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RyxLQUFHO0FBQUEsTUFBRTtBQUFDLFVBQUUsTUFBSSxFQUFFLEtBQUtBLE1BQUssU0FBUyxRQUFRLElBQUUsSUFBRyxHQUFFLENBQUMsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFDLEVBQUM7QUFBRSxJQUFBQSxNQUFLLE1BQU0sWUFBVSxFQUFDLFVBQVMsU0FBUyxHQUFFO0FBQUMsYUFBT0EsTUFBSyxNQUFNLE9BQU8sU0FBUyxHQUFFLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxRQUFPLFNBQVMsR0FBRTtBQUFDLGFBQU9BLE1BQUssTUFBTSxPQUFPLE9BQU8sR0FBRSxDQUFDO0FBQUEsSUFBQyxFQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLFNBQU8sU0FBUyxHQUFFO0FBQUMsV0FBSyxFQUFFLENBQUMsS0FBRyxLQUFLLEVBQUU7QUFBRSxXQUFHLEtBQUssSUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsS0FBSyxJQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxLQUFLLElBQUUsRUFBRSxLQUFHLEtBQUssTUFBTTtBQUFBLElBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssT0FBTyxPQUFLLFNBQVMsR0FBRTtBQUFDLGFBQU8sSUFBSUEsTUFBSyxLQUFLLFNBQVEsT0FBTyxDQUFDLEVBQUUsU0FBUztBQUFBLElBQUM7QUFDeGdCLElBQUFBLE1BQUssS0FBSyxPQUFPLFlBQVUsRUFBQyxXQUFVLEtBQUksT0FBTSxXQUFVO0FBQUMsV0FBSyxJQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxtQkFBVyxPQUFPLE1BQUksSUFBRUEsTUFBSyxNQUFNLFdBQVcsT0FBTyxDQUFDO0FBQUcsVUFBSSxHQUFFLElBQUUsS0FBSyxJQUFFQSxNQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUUsQ0FBQztBQUFFLFVBQUUsS0FBSztBQUFFLFVBQUUsS0FBSyxJQUFFLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUM7QUFBRSxVQUFHLG1CQUFpQixFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEscUNBQXFDO0FBQUUsVUFBRyxnQkFBYyxPQUFPLGFBQVk7QUFBQyxZQUFJLElBQUUsSUFBSSxZQUFZLENBQUMsR0FBRSxJQUFFO0FBQUUsYUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLElBQUUsTUFBTyxLQUFHLEdBQUUsS0FBRyxJQUFJLE1BQUssRUFBRSxFQUFFO0FBQUEsVUFBUyxLQUFHO0FBQUEsVUFDdGYsTUFBSSxJQUFFO0FBQUEsUUFBRSxDQUFDLEdBQUUsS0FBRztBQUFFLFVBQUUsT0FBTyxHQUFFLEtBQUcsQ0FBQztBQUFBLE1BQUMsTUFBTSxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksSUFBRSxNQUFPLEtBQUcsR0FBRSxLQUFHLElBQUksTUFBSyxFQUFFLEVBQUUsT0FBTyxHQUFFLEVBQUUsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsVUFBUyxXQUFVO0FBQUMsVUFBSSxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUVBLE1BQUssU0FBUyxPQUFPLEdBQUUsQ0FBQ0EsTUFBSyxTQUFTLFFBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUFFLFdBQUksSUFBRSxFQUFFLFNBQU8sR0FBRSxJQUFFLElBQUcsSUFBSSxHQUFFLEtBQUssQ0FBQztBQUFFLFFBQUUsS0FBSyxLQUFLLE1BQU0sS0FBSyxJQUFFLFVBQVcsQ0FBQztBQUFFLFdBQUksRUFBRSxLQUFLLEtBQUssSUFBRSxDQUFDLEdBQUUsRUFBRSxTQUFRLE1BQUssRUFBRSxFQUFFLE9BQU8sR0FBRSxFQUFFLENBQUM7QUFBRSxXQUFLLE1BQU07QUFBRSxhQUFPO0FBQUEsSUFBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEdBQUUsV0FBVTtBQUFDLGVBQVMsRUFBRUMsSUFBRTtBQUFDLGVBQU8sY0FBYUEsS0FBRSxLQUFLLE1BQU1BLEVBQUMsS0FBRztBQUFBLE1BQUM7QUFBQyxlQUFRLElBQUUsR0FBRSxJQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUcsR0FBRSxLQUFJO0FBQUMsWUFBRTtBQUFHLGFBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxHQUFFLElBQUksS0FBRyxNQUFJLElBQUUsR0FBRTtBQUFDLGNBQ3pmO0FBQUc7QUFBQSxRQUFLO0FBQUMsY0FBSSxJQUFFLE1BQUksS0FBSyxFQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLEdBQUUsQ0FBQyxJQUFHLEtBQUssRUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxJQUFFLENBQUMsQ0FBQyxHQUFFO0FBQUEsTUFBSTtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLFVBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLEtBQUcsR0FBRSxJQUFJLE1BQUcsSUFBRSxJQUFFLEVBQUUsQ0FBQyxLQUFHLElBQUUsRUFBRSxJQUFFLElBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEtBQUcsRUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEVBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksSUFBRSxLQUFHLEtBQUcsS0FBRyxPQUFLLE1BQUksS0FBRyxNQUFJLEtBQUcsTUFBSSxLQUFHLEtBQUcsS0FBRyxLQUFHLE1BQUksRUFBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLElBQUUsSUFBRSxFQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEtBQUcsTUFBSSxJQUFFLEtBQUcsSUFBRSxNQUFJLEVBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFHLElBQUUsSUFBRSxLQUFHLElBQUUsT0FBSyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEtBQUcsTUFBSTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQ3BmO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFBLElBQUMsRUFBQztBQUFFLElBQUFELE1BQUssS0FBSyxTQUFPLFNBQVMsR0FBRTtBQUFDLFdBQUssRUFBRSxDQUFDLEtBQUcsS0FBSyxFQUFFO0FBQUUsV0FBRyxLQUFLLElBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEtBQUssSUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsS0FBSyxJQUFFLEVBQUUsS0FBRyxLQUFLLE1BQU07QUFBQSxJQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLE9BQU8sT0FBSyxTQUFTLEdBQUU7QUFBQyxhQUFPLElBQUlBLE1BQUssS0FBSyxTQUFRLE9BQU8sQ0FBQyxFQUFFLFNBQVM7QUFBQSxJQUFDO0FBQy9TLElBQUFBLE1BQUssS0FBSyxPQUFPLFlBQVUsRUFBQyxXQUFVLE1BQUssT0FBTSxXQUFVO0FBQUMsV0FBSyxJQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxtQkFBVyxPQUFPLE1BQUksSUFBRUEsTUFBSyxNQUFNLFdBQVcsT0FBTyxDQUFDO0FBQUcsVUFBSSxHQUFFLElBQUUsS0FBSyxJQUFFQSxNQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUUsQ0FBQztBQUFFLFVBQUUsS0FBSztBQUFFLFVBQUUsS0FBSyxJQUFFLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUM7QUFBRSxVQUFHLG1CQUFpQixFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEscUNBQXFDO0FBQUUsVUFBRyxnQkFBYyxPQUFPLGFBQVk7QUFBQyxZQUFJLElBQUUsSUFBSSxZQUFZLENBQUMsR0FBRSxJQUFFO0FBQUUsYUFBSSxJQUFFLE9BQUssS0FBRyxPQUFLLElBQUUsT0FBTSxLQUFHLEdBQUUsS0FBRyxLQUFLLE1BQUssRUFBRSxFQUFFLFNBQVMsS0FDdGYsR0FBRSxNQUFJLElBQUUsRUFBRSxDQUFDLEdBQUUsS0FBRztBQUFFLFVBQUUsT0FBTyxHQUFFLEtBQUcsQ0FBQztBQUFBLE1BQUMsTUFBTSxNQUFJLElBQUUsT0FBSyxLQUFHLE9BQUssSUFBRSxPQUFNLEtBQUcsR0FBRSxLQUFHLEtBQUssTUFBSyxFQUFFLEVBQUUsT0FBTyxHQUFFLEVBQUUsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsVUFBUyxXQUFVO0FBQUMsVUFBSSxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUVBLE1BQUssU0FBUyxPQUFPLEdBQUUsQ0FBQ0EsTUFBSyxTQUFTLFFBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUFFLFdBQUksSUFBRSxFQUFFLFNBQU8sR0FBRSxJQUFFLElBQUcsSUFBSSxHQUFFLEtBQUssQ0FBQztBQUFFLFFBQUUsS0FBSyxDQUFDO0FBQUUsUUFBRSxLQUFLLENBQUM7QUFBRSxRQUFFLEtBQUssS0FBSyxNQUFNLEtBQUssSUFBRSxVQUFXLENBQUM7QUFBRSxXQUFJLEVBQUUsS0FBSyxLQUFLLElBQUUsQ0FBQyxHQUFFLEVBQUUsU0FBUSxNQUFLLEVBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSyxNQUFNO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsVUFBUyxVQUFTLFNBQVEsU0FBUSxVQUFTLFNBQVEsU0FBUSxPQUFPLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRztBQUFBLE1BQUM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUNsZjtBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFPO0FBQUEsTUFBTztBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQ3BmO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxJQUFPLEdBQUUsR0FBRSxXQUFVO0FBQUMsZUFBUyxFQUFFQyxJQUFFO0FBQUMsZUFBTyxjQUFhQSxLQUFFLEtBQUssTUFBTUEsRUFBQyxLQUFHO0FBQUEsTUFBQztBQUFDLGVBQVMsRUFBRUEsSUFBRTtBQUFDLGVBQU8saUJBQWVBLEtBQUUsS0FBSyxNQUFNQSxFQUFDLEtBQUc7QUFBQSxNQUFHO0FBQUMsZUFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEdBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUU7QUFBRyxhQUFJLElBQUUsR0FBRSxJQUFFLEtBQUcsR0FBRSxJQUFJLEtBQUcsTUFBSSxJQUFFLEdBQUU7QUFBQyxjQUFFO0FBQUc7QUFBQSxRQUFLO0FBQUMsY0FBSSxJQUFFLE1BQUksS0FBSyxFQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsR0FBRSxDQUFDLEdBQUUsS0FBSyxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxHQUFFLENBQUMsS0FBRyxLQUFHLEtBQUssR0FBRyxDQUFDLElBQUcsS0FBSyxFQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRSxLQUFLLEVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLElBQUUsQ0FBQyxDQUFDLEtBQUcsS0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFFO0FBQUEsTUFBSTtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLFVBQUksR0FDdmdCLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLEtBQUcsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRTtBQUFFLFVBQUcsZ0JBQWMsT0FBTyxhQUFZO0FBQUMsWUFBRSxNQUFNLEdBQUc7QUFBRSxpQkFBUSxJQUFFLEdBQUUsS0FBRyxHQUFFLElBQUksR0FBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUEsTUFBQyxNQUFNLEtBQUU7QUFBRSxVQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUcsS0FBRyxFQUFFLEtBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsSUFBRSxJQUFFLENBQUM7QUFBQSxhQUFNO0FBQUMsY0FBRSxFQUFFLEtBQUcsSUFBRSxHQUFHO0FBQUUsY0FBSSxJQUFFLEVBQUUsS0FBRyxJQUFFLE1BQUksQ0FBQztBQUFFLGVBQUcsS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxLQUFHLE1BQUk7QUFBRSxjQUFJLEtBQUcsS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxNQUFJLEtBQUcsS0FBRyxNQUFJO0FBQUcsY0FBRSxFQUFFLEtBQUcsSUFBRSxFQUFFO0FBQUUsY0FBSSxJQUFFLEVBQUUsS0FBRyxJQUFFLEtBQUcsQ0FBQyxHQUNuZixLQUFHLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxJQUFFLE1BQUksTUFBSSxNQUFJLEdBQUUsS0FBRyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsSUFBRSxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksSUFBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsR0FBRSxJQUFFLEVBQUUsS0FBRyxJQUFFLE1BQUksQ0FBQztBQUFFLGNBQUUsSUFBRSxFQUFFLEtBQUcsSUFBRSxLQUFHLENBQUM7QUFBRSxjQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBRyxlQUFHO0FBQUUsZUFBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFHLGVBQUc7QUFBRSxlQUFHLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFO0FBQUEsUUFBRTtBQUFDLFVBQUUsSUFBRSxDQUFDLElBQUUsS0FBRztBQUFFLFVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxLQUFHO0FBQUUsWUFBSSxJQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxLQUFHLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxHQUFFLEtBQUcsSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksSUFBRyxLQUFHLEtBQUcsSUFBRSxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxJQUFHLEtBQUcsRUFBRSxJQUFFLENBQUMsR0FBRSxLQUFHLEVBQUUsSUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLE1BQUksS0FBRyxLQUFHLE1BQUksT0FBSyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLEtBQUksSUFBRSxNQUFJLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksT0FBSyxLQUNwZixLQUFHLE1BQUksT0FBSyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsSUFBRyxJQUFFLEtBQUcsS0FBRyxNQUFJLElBQUUsT0FBSyxJQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRyxJQUFFLEtBQUcsTUFBSSxNQUFJLElBQUUsT0FBSyxJQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFJLFlBQUUsSUFBRTtBQUFHLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFHLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUUsSUFBRSxJQUFFO0FBQUUsWUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFLElBQUUsSUFBRTtBQUFFLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUEsTUFBQztBQUFDLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFDbmY7QUFBRSxRQUFFLEVBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsRUFBRSxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxFQUFFLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxFQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUEsSUFBQyxFQUFDO0FBQ3pILElBQUFELE1BQUssS0FBSyxNQUFJLEVBQUMsTUFBSyxPQUFNLEdBQUUsQ0FBQyxHQUFFLGdCQUFlLFNBQVMsR0FBRTtBQUFDLE1BQUFBLE1BQUssS0FBSyxJQUFJLEVBQUUsS0FBSyxDQUFDO0FBQUEsSUFBQyxHQUFFLGtCQUFpQixTQUFTLEdBQUU7QUFBQyxVQUFFQSxNQUFLLEtBQUssSUFBSSxFQUFFLFFBQVEsQ0FBQztBQUFFLFdBQUcsS0FBR0EsTUFBSyxLQUFLLElBQUksRUFBRSxPQUFPLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxJQUFHLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxHQUFFLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxJQUFFQSxNQUFLLFVBQVMsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFO0FBQUUsVUFBRSxLQUFHO0FBQUcsVUFBRSxLQUFHLENBQUM7QUFBRSxVQUFHLElBQUUsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLGtDQUFrQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsR0FBRSxJQUFJO0FBQUMsVUFBRSxLQUFHLE1BQUksSUFBRSxLQUFHO0FBQUcsVUFBRSxFQUFFO0FBQUEsUUFBTTtBQUFBLFFBQ3RmLEtBQUcsS0FBRztBQUFBLE1BQUU7QUFBRSxVQUFFQSxNQUFLLEtBQUssSUFBSSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsVUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLGFBQU8sRUFBRSxPQUFPLEVBQUUsTUFBSyxFQUFFLEdBQUc7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUUsS0FBRztBQUFHLFVBQUUsS0FBRyxDQUFDO0FBQUUsVUFBSSxJQUFFQSxNQUFLLFVBQVMsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFNLEdBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLFNBQVMsR0FBRSxJQUFFLENBQUMsR0FBRSxLQUFHLElBQUUsS0FBRztBQUFFLFVBQUcsSUFBRSxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsa0NB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QyxHQUFFLEdBQUUsQ0FBQztBQUFFLFVBQUcsQ0FBQyxFQUFFLFFBQU0sRUFBQyxLQUFJLEdBQUUsTUFBSyxDQUFDLEVBQUM7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBRyxFQUFFLEtBQUUsTUFBSUEsTUFBSyxLQUFLLElBQUksR0FBRyxJQUNyZ0IsQ0FBQyxHQUFFLEtBQUcsSUFBRyxFQUFFLENBQUMsS0FBSSxJQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLEdBQUUsRUFBRSxJQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsR0FBRSxFQUFFLElBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDO0FBQUUsYUFBTSxFQUFDLEtBQUksR0FBRSxNQUFLLEVBQUUsTUFBTSxHQUFFLENBQUMsRUFBQztBQUFBLElBQUMsRUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxPQUFLLFNBQVMsR0FBRSxHQUFFO0FBQUMsV0FBSyxJQUFFLElBQUUsS0FBR0EsTUFBSyxLQUFLO0FBQU8sVUFBSSxJQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsWUFBVTtBQUFHLFdBQUssSUFBRSxDQUFDLElBQUksS0FBRSxJQUFJLEdBQUM7QUFBRSxRQUFFLFNBQU8sTUFBSSxJQUFFLEVBQUUsS0FBSyxDQUFDO0FBQUcsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLFdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFO0FBQVcsV0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxJQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQztBQUMzWSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFVBQVFBLE1BQUssS0FBSyxLQUFLLFVBQVUsTUFBSSxTQUFTLEdBQUU7QUFBQyxVQUFHLEtBQUssRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHlDQUF5QztBQUFFLFdBQUssT0FBTyxDQUFDO0FBQUUsYUFBTyxLQUFLLE9BQU8sQ0FBQztBQUFBLElBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFFBQU0sV0FBVTtBQUFDLFdBQUssSUFBRSxJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxJQUFFO0FBQUEsSUFBRTtBQUFFLElBQUFBLE1BQUssS0FBSyxLQUFLLFVBQVUsU0FBTyxTQUFTLEdBQUU7QUFBQyxXQUFLLElBQUU7QUFBRyxXQUFLLEVBQUUsT0FBTyxDQUFDO0FBQUEsSUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxLQUFLLFVBQVUsU0FBTyxXQUFVO0FBQUMsVUFBSSxJQUFFLEtBQUssRUFBRSxTQUFTLEdBQUUsSUFBRyxJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUcsT0FBTyxDQUFDLEVBQUUsU0FBUztBQUFFLFdBQUssTUFBTTtBQUFFLGFBQU87QUFBQSxJQUFDO0FBQ3ZlLElBQUFBLE1BQUssS0FBSyxTQUFPLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBRSxLQUFHO0FBQUksVUFBRyxJQUFFLEtBQUcsSUFBRSxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsMEJBQTBCO0FBQUUsbUJBQVcsT0FBTyxNQUFJLElBQUVBLE1BQUssTUFBTSxXQUFXLE9BQU8sQ0FBQztBQUFHLG1CQUFXLE9BQU8sTUFBSSxJQUFFQSxNQUFLLE1BQU0sV0FBVyxPQUFPLENBQUM7QUFBRyxVQUFFLEtBQUdBLE1BQUssS0FBSztBQUFLLFVBQUUsSUFBSSxFQUFFLENBQUM7QUFBRSxVQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRUEsTUFBSztBQUFTLFdBQUksSUFBRSxHQUFFLEtBQUcsRUFBRSxVQUFRLEtBQUcsSUFBRyxLQUFJO0FBQUMsWUFBRSxJQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUUsYUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksTUFBSSxJQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksR0FBRSxDQUFDLEtBQUcsRUFBRSxDQUFDO0FBQUUsWUFBRSxFQUFFLE9BQU8sQ0FBQztBQUFBLE1BQUM7QUFBQyxZQUFJLElBQUUsRUFBRSxNQUFNLEdBQUUsQ0FBQztBQUFHLGFBQU87QUFBQSxJQUFDO0FBQ25kLElBQUFBLE1BQUssT0FBSyxTQUFTLEdBQUU7QUFBQyxXQUFLLElBQUUsQ0FBQyxJQUFJQSxNQUFLLEtBQUssUUFBTTtBQUFFLFdBQUssSUFBRSxDQUFDLENBQUM7QUFBRSxXQUFLLElBQUU7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRSxDQUFDO0FBQUUsV0FBSyxJQUFFLEtBQUssSUFBRSxLQUFLLElBQUUsS0FBSyxLQUFHO0FBQUUsV0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsV0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFPLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRTtBQUFHLFdBQUssSUFBRSxFQUFDLFVBQVMsQ0FBQyxHQUFFLFFBQU8sQ0FBQyxFQUFDO0FBQUUsV0FBSyxJQUFFLEtBQUssS0FBRztBQUFFLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRTtBQUFFLFdBQUssS0FBRztBQUFRLFdBQUssSUFBRSxDQUFDLEdBQUUsSUFBRyxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQU0sS0FBSSxLQUFJLEtBQUksSUFBSTtBQUFFLFdBQUss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RUFBRSxFQUFFLElBQUVBLE1BQUssS0FBSyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsR0FBRSxFQUFFLElBQUcsR0FBRSxFQUFFLEVBQUU7QUFBRSxhQUFPO0FBQUEsSUFBQyxHQUFFLFNBQVEsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFQSxNQUFLLE1BQUssSUFBRSxFQUFFLEdBQUcsTUFBTSxHQUFFLFNBQVM7QUFBRSxhQUFPLEVBQUUsT0FBTyxDQUFDO0FBQUEsSUFBQyxHQUFFLElBQUcsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBRSxLQUFHLENBQUM7QUFBRSxVQUFFLEtBQUcsQ0FBQztBQUFFLFVBQUksSUFBRUEsTUFBSztBQUFLLFVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsUUFBUSxHQUFFLENBQUMsR0FBRSxHQUFFLElBQUU7QUFBRSxVQUFJLEdBQUU7QUFBRSxVQUFFLEVBQUU7QUFBTSxtQkFBVyxPQUFPLEVBQUUsU0FBTyxFQUFFLE9BQUtBLE1BQUssTUFBTSxPQUFPLE9BQU8sRUFBRSxJQUFJO0FBQUcsbUJBQVcsT0FBTyxFQUFFLE9BQUssRUFBRSxLQUFHQSxNQUFLLE1BQU0sT0FBTyxPQUFPLEVBQUUsRUFBRTtBQUFHLFVBQUcsQ0FBQ0EsTUFBSyxLQUFLLEVBQUUsSUFBSSxLQUFHLENBQUNBLE1BQUssT0FBTyxFQUFFLE1BQU0sS0FBRyxhQUNsZixPQUFPLEtBQUcsT0FBSyxFQUFFLFFBQU0sT0FBSyxFQUFFLE1BQUksT0FBSyxFQUFFLE1BQUksUUFBTSxFQUFFLE1BQUksUUFBTSxFQUFFLE1BQUksUUFBTSxFQUFFLE1BQUksUUFBUSxFQUFFLE1BQUksQ0FBQyxFQUFFLE1BQUksSUFBRSxFQUFFLEdBQUcsVUFBUSxJQUFFLEVBQUUsR0FBRyxPQUFPLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsa0NBQWtDO0FBQUUsbUJBQVcsT0FBTyxLQUFHLElBQUVBLE1BQUssS0FBSyxhQUFhLEdBQUUs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UUFBTSxFQUFFLENBQUMsTUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUUsV0FBUyxFQUFFLENBQUM7QUFBQSxNQUFFO0FBQUMsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxpQkFBUyxNQUFJLElBQUUsQ0FBQztBQUFHLFVBQUcsV0FBUyxFQUFFLFFBQU87QUFBRSxlQUFRLEtBQUssRUFBRSxLQUFHLEVBQUUsZUFBZSxDQUFDLEdBQUU7QUFBQyxZQUFHLEtBQUcsV0FBUyxFQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsTUFBSSxFQUFFLENBQUMsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLCtCQUErQjtBQUFFLFVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFBLE1BQUM7QUFBQyxhQUFPO0FBQUEsSUFBQyxHQUFFLElBQUcsU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsQ0FBQyxHQUFFO0FBQUUsV0FBSSxLQUFLLEVBQUUsR0FBRSxlQUFlLENBQUMsS0FBRyxFQUFFLENBQUMsTUFBSSxFQUFFLENBQUMsTUFBSSxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUM7QUFBRyxhQUFPO0FBQUEsSUFBQyxHQUFFLElBQUcsU0FBUyxHQUM1ZixHQUFFO0FBQUMsVUFBSSxJQUFFLENBQUMsR0FBRTtBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksWUFBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFBRyxhQUFPO0FBQUEsSUFBQyxFQUFDO0FBQUUsSUFBQUEsTUFBSyxVQUFRQSxNQUFLLEtBQUs7QUFBUSxJQUFBQSxNQUFLLFVBQVFBLE1BQUssS0FBSztBQUFRLElBQUFBLE1BQUssS0FBSyxLQUFHLENBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssZUFBYSxTQUFTLEdBQUUsR0FBRTtBQUFDLFVBQUksSUFBRUEsTUFBSyxLQUFLLElBQUc7QUFB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LFVBQVM7QUFBQSxvQkFDNUIsUUFBUUEsVUFBUztBQUFBLG9CQUNqQixJQUFJQSxVQUFTLEtBQUs7QUFBQSxvQkFDbEIsR0FBRztBQUFBLG9CQUNILFVBQVVBLFVBQVM7QUFBQSxrQkFDckI7QUFBQSxrQkFDQSxNQUFNLEtBQUs7QUFBQSxnQkFDYixDQUFDO0FBQUEsY0FDSDtBQUFBLFlBQ0YsQ0FBQztBQUFBLFVBQ0g7QUFFQSxxQkFBVyxZQUFZLGVBQWU7QUFBQSxZQUNwQyxjQUFjLEtBQUssTUFBTTtBQUFBLFVBQzNCLENBQUM7QUFFRCxjQUNFLENBQUMsTUFBTSxhQUFhLFlBQ2xCLGlCQUFpQiwwQkFDbkI7QUFDQSx1QkFBVztBQUFBLFVBQ2I7QUFFQSw0QkFBa0I7QUFBQSxRQUNwQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGLE9BQU87QUFDTCxXQUFPO0FBQUEsTUFDTCxJQUFJLDhCQUE4QjtBQUFBLElBQ3BDO0FBQUEsRUFDRjtBQUNBLFNBQU8sUUFBUSxNQUFTO0FBQzFCO0FBRUEsSUFBTSxhQUFhLE1BQU07QUFDdkIsUUFBTSxNQUFNO0FBQ1osT0FBSyxZQUFZLEVBQUUscUNBQXdCLENBQUM7QUFDOUM7QUFFQSxJQUFNLGNBQWMsTUFBTTtBQUN4QixRQUFNLE1BQU07QUFDWixPQUFLLFlBQVksRUFBRSx1Q0FBeUIsQ0FBQztBQUMvQzsiLAogICJuYW1lcyI6IFsiUmVmbGVjdEFwcGx5IiwgIlJlZmxlY3RPd25LZXlzIiwgIk51bWJlcklzTmFOIiwgIkV2ZW50RW1pdHRlciIsICJldmVudHMiLCAiZXJyIiwgIm9uY2UiLCAic2pjbCIsICJhIiwgIkV2ZW50RW1pdHRlciIsICJldmVudHMiLCAidiIsICJvayIsICJlcnIiLCAiUmVzdWx0IiwgImZyb21UaHJvd2FibGUiLCAib2siLCAiZXJyIiwgInNlbGYiLCAiRXZlbnRFbWl0dGVyIiwgImx1ZmlGaWxlIiwgIm9iaiIsICJEZWNvZGUiLCAib2JqIiwgInNqY2wiLCAiZGVjcnlwdCIsICJlbmNyeXB0IiwgIkRlY29kZSIsICJkZWNyeXB0IiwgImVuY3J5cHQiLCAibHVmaUZpbGUiLCAiZGVjcnlwdCIsICJsdWZpRmlsZSIsICJsdWZpRmlsZSIsICJpbXBvcnRfZXZlbnRzIiwgImltcG9ydF9ldmVudHMiLCAiZXZlbnRzIiwgIkV2ZW50RW1pdHRlciIsICJfcXVldWUiLCAiRXZlbnRFbWl0dGVyIiwgImx1ZmlGaWxlIiwgImVuY3J5cHQiXQp9Cg==
