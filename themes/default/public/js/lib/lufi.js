var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
    function EventEmitter3() {
      EventEmitter3.init.call(this);
    }
    module.exports = EventEmitter3;
    module.exports.once = once;
    EventEmitter3.EventEmitter = EventEmitter3;
    EventEmitter3.prototype._events = void 0;
    EventEmitter3.prototype._eventsCount = 0;
    EventEmitter3.prototype._maxListeners = void 0;
    var defaultMaxListeners = 10;
    function checkListener(listener) {
      if (typeof listener !== "function") {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
      }
    }
    Object.defineProperty(EventEmitter3, "defaultMaxListeners", {
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
    EventEmitter3.init = function() {
      if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
        this._events = /* @__PURE__ */ Object.create(null);
        this._eventsCount = 0;
      }
      this._maxListeners = this._maxListeners || void 0;
    };
    EventEmitter3.prototype.setMaxListeners = function setMaxListeners(n) {
      if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
      }
      this._maxListeners = n;
      return this;
    };
    function _getMaxListeners(that) {
      if (that._maxListeners === void 0)
        return EventEmitter3.defaultMaxListeners;
      return that._maxListeners;
    }
    EventEmitter3.prototype.getMaxListeners = function getMaxListeners() {
      return _getMaxListeners(this);
    };
    EventEmitter3.prototype.emit = function emit(type) {
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
    EventEmitter3.prototype.addListener = function addListener(type, listener) {
      return _addListener(this, type, listener, false);
    };
    EventEmitter3.prototype.on = EventEmitter3.prototype.addListener;
    EventEmitter3.prototype.prependListener = function prependListener(type, listener) {
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
    EventEmitter3.prototype.once = function once2(type, listener) {
      checkListener(listener);
      this.on(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter3.prototype.prependOnceListener = function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };
    EventEmitter3.prototype.removeListener = function removeListener(type, listener) {
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
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners(type) {
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
    EventEmitter3.prototype.listeners = function listeners(type) {
      return _listeners(this, type, true);
    };
    EventEmitter3.prototype.rawListeners = function rawListeners(type) {
      return _listeners(this, type, false);
    };
    EventEmitter3.listenerCount = function(emitter, type) {
      if (typeof emitter.listenerCount === "function") {
        return emitter.listenerCount(type);
      } else {
        return listenerCount.call(emitter, type);
      }
    };
    EventEmitter3.prototype.listenerCount = listenerCount;
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
    EventEmitter3.prototype.eventNames = function eventNames() {
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

// src/api/lufi.ts
var lufi_exports = {};
__export(lufi_exports, {
  addFilesToArchive: () => addFilesToArchive,
  cancel: () => cancel,
  compress: () => compress,
  decompress: () => decompress,
  download: () => download,
  events: () => events,
  getFileIndexInQueue: () => getFileIndexInQueue,
  infos: () => infos,
  pause: () => pause,
  remove: () => remove,
  resume: () => resume,
  upload: () => upload
});
var import_events2 = __toESM(require_events());

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
          q.push([n, v, a, b]) > 1 || resume2(n, v);
        });
      };
      if (f) i[n] = f(i[n]);
    }
  }
  function resume2(n, v) {
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
    resume2("next", value);
  }
  function reject(value) {
    resume2("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume2(q[0][0], q[0][1]);
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
    const self = this;
    yield self;
    return self;
  }
};
var fromThrowable = Result.fromThrowable;

// src/entities/lufi-file.ts
var LufiFile = class _LufiFile {
  constructor(serverUrl, properties) {
    __publicField(this, "actionToken", "");
    __publicField(this, "chunksReady", 0);
    __publicField(this, "createdAt", 0);
    __publicField(this, "delay", 0);
    __publicField(this, "delAtFirstView", false);
    __publicField(this, "keys", { client: "", server: "" });
    __publicField(this, "name", "");
    __publicField(this, "password", "");
    __publicField(this, "queueIndex", 0);
    __publicField(this, "serverUrl");
    __publicField(this, "size", 0);
    __publicField(this, "uploadStatus", 3 /* INITIALIZED */);
    __publicField(this, "totalChunks", 0);
    __publicField(this, "type", "");
    __publicField(this, "zipped", false);
    this.serverUrl = serverUrl;
    Object.assign(this, properties);
  }
  downloadUrl() {
    const serverUrl = new URL(this.serverUrl);
    return new URL(
      `${serverUrl.origin + serverUrl.pathname}r/${this.keys.server}#${this.keys.client}`
    );
  }
  removeUrl() {
    const serverUrl = new URL(this.serverUrl);
    return new URL(
      `${serverUrl.origin + serverUrl.pathname}d/${this.keys.server}/${this.actionToken}`
    );
  }
  static fromDownloadUrl(downloadUrl, password = "") {
    const pathinfos = downloadUrl.pathname.split("r/");
    const keys = {
      client: downloadUrl.hash.slice(1).split("&")[0],
      server: pathinfos[1]
    };
    return new _LufiFile(downloadUrl.origin + pathinfos[0], {
      keys,
      password
    });
  }
  static fromRemoveUrl(removeUrl, password = "") {
    const pathInfos = removeUrl.pathname.split("d/");
    const splittedPath = pathInfos[1].split("/");
    const keys = { client: "", server: splittedPath[0] };
    return new _LufiFile(removeUrl.origin + pathInfos[0], {
      keys,
      password,
      actionToken: splittedPath[1]
    });
  }
};

// src/entities/lufi-job.ts
var import_events = __toESM(require_events());

// src/enum/job-status.ts
var JobStatus = /* @__PURE__ */ ((JobStatus2) => {
  JobStatus2[JobStatus2["COMPLETE"] = 0] = "COMPLETE";
  JobStatus2[JobStatus2["FAILED"] = 1] = "FAILED";
  JobStatus2[JobStatus2["ONGOING"] = 2] = "ONGOING";
  JobStatus2[JobStatus2["PAUSED"] = 3] = "PAUSED";
  return JobStatus2;
})(JobStatus || {});

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

// src/error/connection-error.ts
var ConnectionError = class extends BaseError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "Unable to connect. Is the computer able to access the url?");
  }
};

// src/error/server-error.ts
var ServerError = class extends BaseError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "The server returned an error");
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
var fetchServerConfig = (instanceUrl) => {
  const originMatches = instanceUrl.href.match(
    /(.*?)\/?(?:\/[dr]{1}\/|login\/?|files\/?)/
  );
  const urlOrigin = originMatches && originMatches[1] ? originMatches[1] : instanceUrl.origin;
  return ResultAsync.fromPromise(
    fetch(urlOrigin + "/about/config"),
    (error) => new ConnectionError(void 0, {
      cause: ensureError(error)
    })
  ).andThen((response) => {
    if (response.ok) {
      return ResultAsync.fromPromise(
        response.json(),
        (error) => ensureError(error)
      );
    } else {
      return errAsync(
        new ServerError(void 0, { context: response.statusText })
      );
    }
  });
};
var isDenoRuntime = () => typeof Deno !== "undefined";
var isSecureContext = () => {
  return isDenoRuntime() || globalThis.isSecureContext || globalThis.location.protocol === "https:";
};
var workerUrl = (relativePath) => {
  return isDenoRuntime() ? new URL(`./worker/${relativePath}.ts`, new URL(".", import.meta.url).href) : new URL(
    import.meta.resolve(
      `./${relativePath !== "encrypt" ? `worker/${relativePath}` : relativePath}.js`
    )
  );
};

// src/entities/lufi-job.ts
var LufiJob = class {
  constructor(lufiFile, workerType) {
    __publicField(this, "events", new import_events.default());
    __publicField(this, "lufiFile");
    __publicField(this, "status", 2 /* ONGOING */);
    __publicField(this, "archiveFile");
    __publicField(this, "archiveFiles", []);
    __publicField(this, "downloadedFile");
    __publicField(this, "worker");
    __publicField(this, "isTerminated", false);
    /**
     * Tells the worker the job is complete
     */
    __publicField(this, "complete", () => {
      this.status = 0 /* COMPLETE */;
      this.events.emit("JOB_TERMINATED" /* JOB_TERMINATED */);
    });
    __publicField(this, "hasFailed", () => this.status === 1 /* FAILED */);
    __publicField(this, "onError", (callback) => {
      this.worker.onerror = (event) => {
        callback(event);
      };
      return this;
    });
    __publicField(this, "onMessage", (callback) => {
      this.worker.onmessage = (e) => {
        if (callback) {
          callback(e);
        }
        const event = e.data.event;
        if (event) {
          if (event === "FILE_UPDATED" /* FILE_UPDATED */) {
            Object.assign(this.lufiFile, e.data.lufiFile);
          } else {
            this.dispatchEvent(event, e.data.error);
          }
        }
      };
      return this;
    });
    __publicField(this, "onMessageError", (callback) => {
      this.worker.onmessageerror = (event) => {
        callback(event);
      };
      return this;
    });
    __publicField(this, "onProgress", (callback) => {
      this.events.on("CHUNK_UPLOADED" /* CHUNK_UPLOADED */, () => {
        callback();
      });
      this.events.on("CHUNK_DOWNLOADED" /* CHUNK_DOWNLOADED */, () => {
        callback();
      });
      return this;
    });
    __publicField(this, "requestMessage", (msg, transferable = []) => {
      this.worker.postMessage(msg, transferable);
      return this;
    });
    __publicField(this, "terminate", () => {
      this.worker.terminate();
      return this;
    });
    __publicField(this, "waitForCompletion", () => {
      if (this.isTerminated) {
        if (this.status === 0 /* COMPLETE */) {
          return okAsync(this);
        } else {
          return errAsync(ensureError("Job has failed"));
        }
      } else {
        return ResultAsync.fromPromise(
          new Promise((resolve, reject) => {
            this.events.once("OPERATION_FAILED" /* OPERATION_FAILED */, (error) => {
              reject(error);
            });
            this.events.once("JOB_TERMINATED" /* JOB_TERMINATED */, () => {
              if (this.status === 0 /* COMPLETE */) {
                resolve(this);
              }
            });
          }),
          (error) => ensureError(error)
        );
      }
    });
    __publicField(this, "waitForStart", () => ResultAsync.fromPromise(
      new Promise((resolve, reject) => {
        this.events.once("OPERATION_FAILED" /* OPERATION_FAILED */, (error) => {
          reject(error);
        });
        this.events.once("UPLOAD_STARTED" /* UPLOAD_STARTED */, () => {
          resolve(this);
        });
        this.events.once("DOWNLOAD_STARTED" /* DOWNLOAD_STARTED */, () => {
          resolve(this);
        });
      }),
      (error) => ensureError(error)
    ));
    __publicField(this, "dispatchEvent", (event, error) => {
      this.events.emit(event, error);
    });
    switch (workerType) {
      case 0 /* CANCEL */:
        {
          this.worker = new Worker(workerUrl("cancel"), { type: "module" });
        }
        break;
      case 1 /* COMPRESS */:
        {
          this.worker = new Worker(workerUrl("compress"), { type: "module" });
        }
        break;
      case 2 /* DECOMPRESS */:
        {
          this.worker = new Worker(workerUrl("decompress"), { type: "module" });
        }
        break;
      case 3 /* DOWNLOAD */:
        {
          this.worker = new Worker(workerUrl("download"), { type: "module" });
        }
        break;
      case 4 /* INFOS */:
        {
          this.worker = new Worker(workerUrl("infos"), { type: "module" });
        }
        break;
      case 5 /* REMOVE */:
        {
          this.worker = new Worker(workerUrl("remove"), { type: "module" });
        }
        break;
      case 6 /* UPLOAD */:
        {
          this.worker = new Worker(workerUrl("upload"), { type: "module" });
        }
        break;
    }
    this.lufiFile = lufiFile;
    this.events.once("JOB_TERMINATED" /* JOB_TERMINATED */, () => {
      this.isTerminated = true;
      this.terminate();
    });
    this.events.once("OPERATION_FAILED" /* OPERATION_FAILED */, (error) => {
      this.status = 1 /* FAILED */;
      this.lufiFile.uploadStatus = 2 /* FAILED */;
      this.events.emit("JOB_TERMINATED" /* JOB_TERMINATED */, error);
    });
    this.onError((event) => console.error(event.error));
  }
};

// src/enum/crypto-algorithm.ts
var CryptoAlgorithm = /* @__PURE__ */ ((CryptoAlgorithm2) => {
  CryptoAlgorithm2[CryptoAlgorithm2["Sjcl"] = 0] = "Sjcl";
  CryptoAlgorithm2[CryptoAlgorithm2["WebCrypto"] = 1] = "WebCrypto";
  return CryptoAlgorithm2;
})(CryptoAlgorithm || {});

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

// node_modules/.deno/arraybuffer-encoding@1.1.0/node_modules/arraybuffer-encoding/dist/esm/base64/url.js
var obj2 = new Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", true);
function Encode(ab) {
  return obj2.Encode(ab);
}

// src/api/crypto/sjcl.ts
var import_lufi_sjcl = __toESM(require_sjcl());

// src/error/crypto/crypto-error.ts
var CryptoError = class extends BaseError {
};

// src/error/crypto/hashing-error.ts
var HashingError = class extends CryptoError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "Unable to hash the provided string");
  }
};

// src/api/crypto/sjcl.ts
var generateKey = () => {
  try {
    return okAsync(import_lufi_sjcl.default.codec.base64.fromBits(import_lufi_sjcl.default.random.randomWords(8, 10)));
  } catch (error) {
    return errAsync(
      new CryptoError("Unable to generate key", {
        cause: ensureError(error)
      })
    );
  }
};
var hashPassword = (password) => {
  try {
    return okAsync(import_lufi_sjcl.default.codec.hex.fromBits(import_lufi_sjcl.default.hash.sha512.hash(password)));
  } catch (error) {
    return errAsync(new HashingError(void 0, { cause: ensureError(error) }));
  }
};

// src/api/crypto/web.ts
var generateKey2 = () => {
  return ResultAsync.fromPromise(
    new Promise(
      (resolve, reject) => crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256
        },
        true,
        ["encrypt", "decrypt"]
      ).then(
        (generatedKey) => crypto.subtle.exportKey("raw", generatedKey).then((key) => resolve(Encode(key))).catch((error) => {
          reject(
            new CryptoError("Unable to base64 encode the url", {
              cause: ensureError(error)
            })
          );
        })
      ).catch((error) => reject(error))
    ),
    (error) => new CryptoError("Unable to generate key", { cause: ensureError(error) })
  );
};
var hashPassword2 = (password) => {
  const promise = async () => {
    return Array.from(
      new Uint8Array(
        await crypto.subtle.digest(
          "SHA-512",
          new TextEncoder().encode(password)
        )
      )
    ).map((b) => b.toString(16).padStart(2, "0")).join("");
  };
  return ResultAsync.fromPromise(
    promise(),
    (error) => new HashingError(void 0, { cause: ensureError(error) })
  );
};

// src/api/crypto.ts
var generateKey3 = (algo = 1 /* WebCrypto */) => algo === 0 /* Sjcl */ ? generateKey() : generateKey2();
var hashPassword3 = (password, algo) => algo === 0 /* Sjcl */ ? hashPassword(password) : hashPassword2(password);

// src/error/download/download-error.ts
var DownloadError = class extends BaseError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "An error occured while downloading the data");
  }
};

// src/error/infos-error.ts
var InfosError = class extends BaseError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "An error occured while trying to retrieve server informations");
  }
};

// src/error/job/job-error.ts
var JobError = class extends BaseError {
};

// src/error/job/job-pause-error.ts
var JobPauseError = class extends JobError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "An error occured while trying to pause the job");
  }
};

// src/error/job/job-resume-error.ts
var JobResumeError = class extends JobError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "An error occured while trying to resume the job");
  }
};

// src/error/upload/upload-error.ts
var UploadError = class extends BaseError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "An error occured while uploading the data");
  }
};

// src/api/lufi.ts
var CHUNK_LENGTH = 15e5;
var files = {};
var events = new import_events2.default();
var cancel = (uploadJob) => {
  uploadJob.terminate();
  const job = new LufiJob(uploadJob.lufiFile, 0 /* CANCEL */);
  return ResultAsync.fromPromise(
    new Promise((resolve, reject) => {
      job.onMessage((event) => {
        if (event.data.event === "UPLOAD_CANCELLED" /* UPLOAD_CANCELLED */) {
          files[job.lufiFile.keys.client].uploadStatus = 0 /* CANCELED */;
          resolve(job);
        }
        if (event.data.event === "OPERATION_FAILED" /* OPERATION_FAILED */) {
          reject(
            new JobError(
              "An error occured while trying to cancel an upload",
              { cause: event.data.error }
            )
          );
        }
      }).requestMessage({
        args: {
          lufiFile: job.lufiFile
        }
      });
    }),
    (error) => ensureError(error)
  );
};
var addFilesToArchive = (files2, archiveEntries = {}) => {
  const asyncLoop = async (files3) => {
    var _a;
    for (const file of files3) {
      const nameWithExtension = ((_a = file.name.split("/")) == null ? void 0 : _a.pop()) || file.name;
      const nameWithoutExtension = nameWithExtension.split(".").shift();
      const extension = nameWithExtension.split(".").length > 1 ? `.${nameWithExtension.split(".").pop()}` : "";
      let name = nameWithExtension;
      if (archiveEntries[name] !== void 0) {
        let i = 1;
        do {
          name = `${nameWithoutExtension}(${i})${extension}`;
          i++;
        } while (archiveEntries[name] !== void 0);
      }
      events.emit("ARCHIVE_ADDED_FILE" /* ARCHIVE_ADDED_FILE */, { name, size: file.size });
      archiveEntries[name] = await file.bytes();
    }
  };
  return ResultAsync.fromPromise(
    asyncLoop(files2),
    (error) => ensureError(error)
  ).andThen(() => okAsync(archiveEntries));
};
var compress = (archiveEntries, archiveName) => {
  const lufiFile = new LufiFile("");
  const job = new LufiJob(lufiFile, 1 /* COMPRESS */);
  return okAsync(
    job.onMessage((event) => {
      if (event.data.event === "ARCHIVE_CREATED" /* ARCHIVE_CREATED */) {
        job.archiveFile = new File([event.data.buffer], archiveName, {
          type: "application/zip"
        });
        job.complete();
      }
    }).requestMessage({
      args: {
        lufiFile,
        archive: { entries: archiveEntries }
      }
    })
  );
};
var decompress = (zipFile) => {
  const lufiFile = new LufiFile("");
  const job = new LufiJob(lufiFile, 2 /* DECOMPRESS */);
  return okAsync(
    job.onMessage((event) => {
      if (event.data.event === "ARCHIVE_DECOMPRESSED" /* ARCHIVE_DECOMPRESSED */) {
        job.complete();
      }
      if (event.data.event === "ARCHIVE_RETRIEVED_FILE" /* ARCHIVE_RETRIEVED_FILE */) {
        job.archiveFiles.push(
          new File([event.data.file.buffer], event.data.file.path)
        );
      }
    }).requestMessage({
      args: {
        lufiFile,
        archive: { file: zipFile }
      }
    })
  );
};
var handlePasswordHashing = (downloadUrl, password) => {
  if (password) {
    return fetchServerConfig(downloadUrl).andThen((config) => {
      if (config.version.tag > "0.07.0") {
        const algo = isSecureContext() ? 1 /* WebCrypto */ : 0 /* Sjcl */;
        return hashPassword3(password, algo).andThen(
          (hashedPassword) => okAsync(LufiFile.fromDownloadUrl(downloadUrl, hashedPassword))
        );
      } else {
        return okAsync(LufiFile.fromDownloadUrl(downloadUrl, password));
      }
    });
  } else {
    return okAsync(LufiFile.fromDownloadUrl(downloadUrl));
  }
};
var download = (downloadUrl, password) => handlePasswordHashing(downloadUrl, password).andThen(
  (lufiFile) => {
    const job = new LufiJob(lufiFile, 3 /* DOWNLOAD */);
    return ResultAsync.fromPromise(
      new Promise((resolve, reject) => {
        const chunks = [];
        return job.onMessage((event) => {
          handleSocketResults(resolve, reject, job, event);
          if (event.data.event === "CHUNK_DOWNLOADED" /* CHUNK_DOWNLOADED */) {
            chunks.push(event.data.chunk.buffer);
            if (chunks.length >= 50) {
              job.downloadedFile = new File(
                job.downloadedFile ? [job.downloadedFile.slice()].concat(chunks) : chunks,
                lufiFile.name,
                {
                  type: lufiFile.type
                }
              );
              chunks.length = 0;
            }
          }
          if (event.data.event === "DOWNLOAD_COMPLETE" /* DOWNLOAD_COMPLETE */) {
            job.downloadedFile = new File(
              job.downloadedFile ? [job.downloadedFile.slice()].concat(chunks) : chunks,
              lufiFile.name,
              {
                type: lufiFile.type
              }
            );
            chunks.length = 0;
            job.complete();
          }
        }).requestMessage({
          args: {
            lufiFile
          }
        });
      }),
      (error) => new DownloadError(void 0, { cause: ensureError(error) })
    );
  }
);
var infos = (downloadUrl, password) => handlePasswordHashing(downloadUrl, password).andThen(
  (lufiFile) => okAsync(new LufiJob(lufiFile, 4 /* INFOS */))
).andThen(
  (job) => ResultAsync.fromPromise(
    new Promise((resolve, reject) => {
      job.onMessage((event) => {
        if (event.data.event === "INFOS_RETRIEVED" /* INFOS_RETRIEVED */) {
          job.complete();
          resolve(job);
        }
        if (event.data.event === "OPERATION_FAILED" /* OPERATION_FAILED */) {
          reject(
            new JobError(
              "An error occured while trying to retrieve informations of the file",
              { cause: event.data.error }
            )
          );
        }
      }).requestMessage({
        args: { lufiFile: job.lufiFile }
      });
    }),
    (error) => new InfosError(void 0, { cause: ensureError(error) })
  )
);
var pause = (job) => {
  try {
    job.status = 3 /* PAUSED */;
    return okAsync(
      job.requestMessage({
        action: 0 /* PAUSE */,
        args: { lufiFile: job.lufiFile }
      })
    );
  } catch (error) {
    return errAsync(
      new JobPauseError(void 0, { cause: ensureError(error) })
    );
  }
};
var remove = (removeUrl, password) => {
  const lufiFile = LufiFile.fromRemoveUrl(removeUrl, password);
  const job = new LufiJob(lufiFile, 5 /* REMOVE */);
  return ResultAsync.fromPromise(
    new Promise((resolve, reject) => {
      job.onMessage((event) => {
        if (event.data.event === "FILE_REMOVED" /* FILE_REMOVED */) {
          job.complete();
          resolve(job);
        }
        if (event.data.event === "OPERATION_FAILED" /* OPERATION_FAILED */) {
          reject(
            new JobError("An error occured while trying to remove a file", {
              cause: event.data.error
            })
          );
        }
      }).requestMessage({ args: { lufiFile } });
    }),
    (error) => ensureError(error)
  );
};
var resume = (job) => {
  try {
    job.status = 2 /* ONGOING */;
    return okAsync(
      job.requestMessage({
        action: 2 /* RESUME */,
        args: { lufiFile: job.lufiFile }
      })
    );
  } catch (error) {
    return errAsync(
      new JobResumeError(void 0, { cause: ensureError(error) })
    );
  }
};
var sliceAndUpload = (job, file, algo, chunkLength = CHUNK_LENGTH) => {
  events.emit("SLICE_STARTED" /* SLICE_STARTED */, files[job.lufiFile.keys.client]);
  const totalChunks = Math.ceil(file.size / chunkLength) || 1;
  const concurrency = navigator.hardwareConcurrency || 1;
  files[job.lufiFile.keys.client].totalChunks = totalChunks;
  const sequentialLoop = async () => {
    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkLength;
      const end = Math.min(start + chunkLength, file.size);
      const buffer = await file.slice(start, end, file.type).arrayBuffer();
      job.requestMessage(
        {
          args: {
            chunk: {
              buffer,
              index: i
            },
            lufiFile: files[job.lufiFile.keys.client],
            algo
          }
        },
        [buffer]
      );
      if (i === 0) {
        const waitUntilUploadStarted = () => new Promise((resolve) => {
          job.events.once("UPLOAD_STARTED" /* UPLOAD_STARTED */, () => {
            resolve(void 0);
          });
        });
        await waitUntilUploadStarted();
      } else if (i % concurrency === 0) {
        const waitForQueueAvailability = () => new Promise((resolve) => {
          job.events.once("CHUNK_UPLOADED" /* CHUNK_UPLOADED */, () => {
            resolve(void 0);
          });
        });
        await waitForQueueAvailability();
      }
    }
  };
  sequentialLoop();
  return okAsync(void 0);
};
var startUpload = (serverUrl, file, delay, delAtFirstView, zipped, password, algo) => generateKey3(
  algo
).andThen(
  (clientKey) => {
    if (password) {
      return hashPassword3(password, algo).andThen(
        (hashedPassword) => okAsync({ password: hashedPassword, clientKey })
      );
    } else {
      return okAsync({ password, clientKey });
    }
  }
).andThen(({ password: password2, clientKey }) => {
  files[clientKey] = new LufiFile(serverUrl.toString(), {
    delay,
    delAtFirstView,
    zipped,
    password: password2,
    name: file.name.split("/").pop(),
    // Remove path from filename
    size: file.size,
    type: file.type,
    keys: { client: clientKey, server: "" }
  });
  const job = new LufiJob(files[clientKey], 6 /* UPLOAD */);
  files[clientKey].uploadStatus = 4 /* QUEUED */;
  return sliceAndUpload(job, file, algo).andThen(
    () => ResultAsync.fromPromise(
      new Promise((resolve, reject) => {
        job.onMessage((event) => {
          handleSocketResults(resolve, reject, job, event);
          switch (event.data.event) {
            case "UPLOAD_COMPLETE" /* UPLOAD_COMPLETE */:
              {
                job.complete();
                job.lufiFile.uploadStatus = 1 /* COMPLETE */;
              }
              break;
          }
        });
      }),
      (error) => ensureError(error)
    )
  );
});
var upload = (serverUrl, filesToUpload, delay = 0, delAtFirstView = false, zipped = false, zipName = "documents.zip", password = "", algo = 1 /* WebCrypto */) => {
  const operations = [];
  if (!zipped) {
    filesToUpload.forEach((file) => {
      operations.push(startUpload(
        serverUrl,
        file,
        delay,
        delAtFirstView,
        zipped,
        password,
        algo
      ));
    });
  } else {
    if (filesToUpload.length === 1 && filesToUpload[0].type === "application/zip") {
      operations.push(
        startUpload(
          serverUrl,
          filesToUpload[0],
          delay,
          delAtFirstView,
          zipped,
          password,
          algo
        )
      );
    } else {
      operations.push(
        addFilesToArchive(filesToUpload).andThen(
          (archiveEntries) => compress(
            archiveEntries,
            zipName
          ).andThen((job) => job.waitForCompletion()).andThen((job) => {
            if (job.archiveFile) {
              return startUpload(
                serverUrl,
                job.archiveFile,
                delay,
                delAtFirstView,
                true,
                password,
                algo
              );
            } else {
              return errAsync(new JobError("archiveFile must be defined"));
            }
          })
        )
      );
    }
  }
  return ResultAsync.combine(operations).orElse(
    (error) => errAsync(new UploadError(void 0, { cause: error }))
  );
};
var handleSocketResults = (resolve, reject, job, event) => {
  if (event.data.event === "SOCKET_OPENED" /* SOCKET_OPENED */) {
    resolve(job);
  }
  if (event.data.event === "OPERATION_FAILED" /* OPERATION_FAILED */) {
    reject(
      new JobError("The job returned an error", { cause: event.data.error })
    );
  }
};
var getFilesQueued = () => Object.values(files).filter(
  (file) => file.uploadStatus === 4 /* QUEUED */
);
var getFileIndexInQueue = (clientKey) => Object.keys(getFilesQueued()).indexOf(clientKey);
export {
  CryptoAlgorithm,
  JobStatus,
  ResultAsync,
  err,
  errAsync,
  isSecureContext,
  lufi_exports as lufi,
  ok,
  okAsync
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi9ub2RlX21vZHVsZXMvLmRlbm8vbHVmaS1zamNsQDEuMC44L25vZGVfbW9kdWxlcy9sdWZpLXNqY2wvc2pjbC5qcyIsICIuLi9zcmMvYXBpL2x1ZmkudHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5kZW5vL25ldmVydGhyb3dAOC4xLjEvbm9kZV9tb2R1bGVzL25ldmVydGhyb3cvZGlzdC9pbmRleC5lcy5qcyIsICIuLi9zcmMvZW50aXRpZXMvbHVmaS1maWxlLnRzIiwgIi4uL3NyYy9lbnRpdGllcy9sdWZpLWpvYi50cyIsICIuLi9zcmMvZW51bS9qb2Itc3RhdHVzLnRzIiwgIi4uL3NyYy9lcnJvci9iYXNlLWVycm9yLnRzIiwgIi4uL3NyYy9lcnJvci9jb25uZWN0aW9uLWVycm9yLnRzIiwgIi4uL3NyYy9lcnJvci9zZXJ2ZXItZXJyb3IudHMiLCAiLi4vc3JjL3V0aWxzLnRzIiwgIi4uL3NyYy9lbnVtL2NyeXB0by1hbGdvcml0aG0udHMiLCAiLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2FycmF5YnVmZmVyLWVuY29kaW5nQDEuMS4wL25vZGVfbW9kdWxlcy9hcnJheWJ1ZmZlci1lbmNvZGluZy9zcmMvYmFzZTY0L2VuY29kaW5nLnRzIiwgIi4uL25vZGVfbW9kdWxlcy8uZGVuby9hcnJheWJ1ZmZlci1lbmNvZGluZ0AxLjEuMC9ub2RlX21vZHVsZXMvYXJyYXlidWZmZXItZW5jb2Rpbmcvc3JjL2Jhc2U2NC9zdGFuZGFyZC50cyIsICIuLi9ub2RlX21vZHVsZXMvLmRlbm8vYXJyYXlidWZmZXItZW5jb2RpbmdAMS4xLjAvbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLWVuY29kaW5nL3NyYy9iYXNlNjQvdXJsLnRzIiwgIi4uL3NyYy9hcGkvY3J5cHRvL3NqY2wudHMiLCAiLi4vc3JjL2Vycm9yL2NyeXB0by9jcnlwdG8tZXJyb3IudHMiLCAiLi4vc3JjL2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzIiwgIi4uL3NyYy9hcGkvY3J5cHRvL3dlYi50cyIsICIuLi9zcmMvYXBpL2NyeXB0by50cyIsICIuLi9zcmMvZXJyb3IvZG93bmxvYWQvZG93bmxvYWQtZXJyb3IudHMiLCAiLi4vc3JjL2Vycm9yL2luZm9zLWVycm9yLnRzIiwgIi4uL3NyYy9lcnJvci9qb2Ivam9iLWVycm9yLnRzIiwgIi4uL3NyYy9lcnJvci9qb2Ivam9iLXBhdXNlLWVycm9yLnRzIiwgIi4uL3NyYy9lcnJvci9qb2Ivam9iLXJlc3VtZS1lcnJvci50cyIsICIuLi9zcmMvZXJyb3IvdXBsb2FkL3VwbG9hZC1lcnJvci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsICJcInVzZSBzdHJpY3RcIjt2YXIgc2pjbD17Y2lwaGVyOnt9LGhhc2g6e30sa2V5ZXhjaGFuZ2U6e30sbW9kZTp7fSxtaXNjOnt9LGNvZGVjOnt9LGV4Y2VwdGlvbjp7Y29ycnVwdDpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJDT1JSVVBUOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfSxpbnZhbGlkOmZ1bmN0aW9uKGEpe3RoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIklOVkFMSUQ6IFwiK3RoaXMubWVzc2FnZX07dGhpcy5tZXNzYWdlPWF9LGJ1ZzpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJCVUc6IFwiK3RoaXMubWVzc2FnZX07dGhpcy5tZXNzYWdlPWF9LG5vdFJlYWR5OmZ1bmN0aW9uKGEpe3RoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIk5PVCBSRUFEWTogXCIrdGhpcy5tZXNzYWdlfTt0aGlzLm1lc3NhZ2U9YX19fTtcbnNqY2wuY2lwaGVyLmFlcz1mdW5jdGlvbihhKXt0aGlzLndbMF1bMF1bMF18fHRoaXMuQygpO3ZhciBiLGMsZCxlLGY9dGhpcy53WzBdWzRdLGc9dGhpcy53WzFdO2I9YS5sZW5ndGg7dmFyIGg9MTtpZig0IT09YiYmNiE9PWImJjghPT1iKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiaW52YWxpZCBhZXMga2V5IHNpemVcIik7dGhpcy5iPVtkPWEuc2xpY2UoMCksZT1bXV07Zm9yKGE9YjthPDQqYisyODthKyspe2M9ZFthLTFdO2lmKDA9PT1hJWJ8fDg9PT1iJiY0PT09YSViKWM9ZltjPj4+MjRdPDwyNF5mW2M+PjE2JjI1NV08PDE2XmZbYz4+OCYyNTVdPDw4XmZbYyYyNTVdLDA9PT1hJWImJihjPWM8PDheYz4+PjI0Xmg8PDI0LGg9aDw8MV4yODMqKGg+PjcpKTtkW2FdPWRbYS1iXV5jfWZvcihiPTA7YTtiKyssYS0tKWM9ZFtiJjM/YTphLTRdLGVbYl09ND49YXx8ND5iP2M6Z1swXVtmW2M+Pj4yNF1dXmdbMV1bZltjPj4xNiYyNTVdXV5nWzJdW2ZbYz4+OCYyNTVdXV5nWzNdW2ZbYyZcbjI1NV1dfTtcbnNqY2wuY2lwaGVyLmFlcy5wcm90b3R5cGU9e2VuY3J5cHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIGFhKHRoaXMsYSwwKX0sZGVjcnlwdDpmdW5jdGlvbihhKXtyZXR1cm4gYWEodGhpcyxhLDEpfSx3OltbW10sW10sW10sW10sW11dLFtbXSxbXSxbXSxbXSxbXV1dLEM6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLndbMF0sYj10aGlzLndbMV0sYz1hWzRdLGQ9Yls0XSxlLGYsZyxoPVtdLGs9W10sbixsLG0scDtmb3IoZT0wOzB4MTAwPmU7ZSsrKWtbKGhbZV09ZTw8MV4yODMqKGU+PjcpKV5lXT1lO2ZvcihmPWc9MDshY1tmXTtmXj1ufHwxLGc9a1tnXXx8MSlmb3IobT1nXmc8PDFeZzw8Ml5nPDwzXmc8PDQsbT1tPj44Xm0mMjU1Xjk5LGNbZl09bSxkW21dPWYsbD1oW2U9aFtuPWhbZl1dXSxwPTB4MTAxMDEwMSpsXjB4MTAwMDEqZV4weDEwMSpuXjB4MTAxMDEwMCpmLGw9MHgxMDEqaFttXV4weDEwMTAxMDAqbSxlPTA7ND5lO2UrKylhW2VdW2ZdPWw9bDw8MjRebD4+PjgsYltlXVttXT1wPXA8PDI0XnA+Pj44O2ZvcihlPVxuMDs1PmU7ZSsrKWFbZV09YVtlXS5zbGljZSgwKSxiW2VdPWJbZV0uc2xpY2UoMCl9fTtcbmZ1bmN0aW9uIGFhKGEsYixjKXtpZig0IT09Yi5sZW5ndGgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJpbnZhbGlkIGFlcyBibG9jayBzaXplXCIpO3ZhciBkPWEuYltjXSxlPWJbMF1eZFswXSxmPWJbYz8zOjFdXmRbMV0sZz1iWzJdXmRbMl07Yj1iW2M/MTozXV5kWzNdO3ZhciBoLGssbixsPWQubGVuZ3RoLzQtMixtLHA9NCx6PVswLDAsMCwwXTtoPWEud1tjXTthPWhbMF07dmFyIEE9aFsxXSxDPWhbMl0sQj1oWzNdLEQ9aFs0XTtmb3IobT0wO208bDttKyspaD1hW2U+Pj4yNF1eQVtmPj4xNiYyNTVdXkNbZz4+OCYyNTVdXkJbYiYyNTVdXmRbcF0saz1hW2Y+Pj4yNF1eQVtnPj4xNiYyNTVdXkNbYj4+OCYyNTVdXkJbZSYyNTVdXmRbcCsxXSxuPWFbZz4+PjI0XV5BW2I+PjE2JjI1NV1eQ1tlPj44JjI1NV1eQltmJjI1NV1eZFtwKzJdLGI9YVtiPj4+MjRdXkFbZT4+MTYmMjU1XV5DW2Y+PjgmMjU1XV5CW2cmMjU1XV5kW3ArM10scCs9NCxlPWgsZj1rLGc9bjtmb3IobT1cbjA7ND5tO20rKyl6W2M/MyYtbTptXT1EW2U+Pj4yNF08PDI0XkRbZj4+MTYmMjU1XTw8MTZeRFtnPj44JjI1NV08PDheRFtiJjI1NV1eZFtwKytdLGg9ZSxlPWYsZj1nLGc9YixiPWg7cmV0dXJuIHp9XG5zamNsLmJpdEFycmF5PXtiaXRTbGljZTpmdW5jdGlvbihhLGIsYyl7YT1zamNsLmJpdEFycmF5LlkoYS5zbGljZShiLzMyKSwzMi0oYiYzMSkpLnNsaWNlKDEpO3JldHVybiB2b2lkIDA9PT1jP2E6c2pjbC5iaXRBcnJheS5jbGFtcChhLGMtYil9LGV4dHJhY3Q6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPU1hdGguZmxvb3IoLWItYyYzMSk7cmV0dXJuKChiK2MtMV5iKSYtMzI/YVtiLzMyfDBdPDwzMi1kXmFbYi8zMisxfDBdPj4+ZDphW2IvMzJ8MF0+Pj5kKSYoMTw8YyktMX0sY29uY2F0OmZ1bmN0aW9uKGEsYil7aWYoMD09PWEubGVuZ3RofHwwPT09Yi5sZW5ndGgpcmV0dXJuIGEuY29uY2F0KGIpO3ZhciBjPWFbYS5sZW5ndGgtMV0sZD1zamNsLmJpdEFycmF5LmdldFBhcnRpYWwoYyk7cmV0dXJuIDMyPT09ZD9hLmNvbmNhdChiKTpzamNsLmJpdEFycmF5LlkoYixkLGN8MCxhLnNsaWNlKDAsYS5sZW5ndGgtMSkpfSxiaXRMZW5ndGg6ZnVuY3Rpb24oYSl7dmFyIGI9YS5sZW5ndGg7cmV0dXJuIDA9PT1cbmI/MDozMiooYi0xKStzamNsLmJpdEFycmF5LmdldFBhcnRpYWwoYVtiLTFdKX0sY2xhbXA6ZnVuY3Rpb24oYSxiKXtpZigzMiphLmxlbmd0aDxiKXJldHVybiBhO2E9YS5zbGljZSgwLE1hdGguY2VpbChiLzMyKSk7dmFyIGM9YS5sZW5ndGg7Yj1iJjMxOzA8YyYmYiYmKGFbYy0xXT1zamNsLmJpdEFycmF5LnBhcnRpYWwoYixhW2MtMV0mMjE0NzQ4MzY0OD4+Yi0xLDEpKTtyZXR1cm4gYX0scGFydGlhbDpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIDMyPT09YT9iOihjP2J8MDpiPDwzMi1hKSsweDEwMDAwMDAwMDAwKmF9LGdldFBhcnRpYWw6ZnVuY3Rpb24oYSl7cmV0dXJuIE1hdGgucm91bmQoYS8weDEwMDAwMDAwMDAwKXx8MzJ9LGVxdWFsOmZ1bmN0aW9uKGEsYil7aWYoc2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSkhPT1zamNsLmJpdEFycmF5LmJpdExlbmd0aChiKSlyZXR1cm4hMTt2YXIgYz0wLGQ7Zm9yKGQ9MDtkPGEubGVuZ3RoO2QrKyljfD1hW2RdXmJbZF07cmV0dXJuIDA9PT1cbmN9LFk6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU7ZT0wO2Zvcih2b2lkIDA9PT1kJiYoZD1bXSk7MzI8PWI7Yi09MzIpZC5wdXNoKGMpLGM9MDtpZigwPT09YilyZXR1cm4gZC5jb25jYXQoYSk7Zm9yKGU9MDtlPGEubGVuZ3RoO2UrKylkLnB1c2goY3xhW2VdPj4+YiksYz1hW2VdPDwzMi1iO2U9YS5sZW5ndGg/YVthLmxlbmd0aC0xXTowO2E9c2pjbC5iaXRBcnJheS5nZXRQYXJ0aWFsKGUpO2QucHVzaChzamNsLmJpdEFycmF5LnBhcnRpYWwoYithJjMxLDMyPGIrYT9jOmQucG9wKCksMSkpO3JldHVybiBkfSxQOmZ1bmN0aW9uKGEsYil7cmV0dXJuW2FbMF1eYlswXSxhWzFdXmJbMV0sYVsyXV5iWzJdLGFbM11eYlszXV19LGJ5dGVzd2FwTTpmdW5jdGlvbihhKXt2YXIgYixjO2ZvcihiPTA7YjxhLmxlbmd0aDsrK2IpYz1hW2JdLGFbYl09Yz4+PjI0fGM+Pj44JjB4ZmYwMHwoYyYweGZmMDApPDw4fGM8PDI0O3JldHVybiBhfX07XG5zamNsLmNvZGVjLnV0ZjhTdHJpbmc9e2Zyb21CaXRzOmZ1bmN0aW9uKGEpe3ZhciBiPVwiXCIsYz1zamNsLmJpdEFycmF5LmJpdExlbmd0aChhKSxkLGU7Zm9yKGQ9MDtkPGMvODtkKyspMD09PShkJjMpJiYoZT1hW2QvNF0pLGIrPVN0cmluZy5mcm9tQ2hhckNvZGUoZT4+Pjg+Pj44Pj4+OCksZTw8PTg7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoYikpfSx0b0JpdHM6ZnVuY3Rpb24oYSl7YT11bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYSkpO3ZhciBiPVtdLGMsZD0wO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspZD1kPDw4fGEuY2hhckNvZGVBdChjKSwzPT09KGMmMykmJihiLnB1c2goZCksZD0wKTtjJjMmJmIucHVzaChzamNsLmJpdEFycmF5LnBhcnRpYWwoOCooYyYzKSxkKSk7cmV0dXJuIGJ9fTtcbnNqY2wuY29kZWMuaGV4PXtmcm9tQml0czpmdW5jdGlvbihhKXt2YXIgYj1cIlwiLGM7Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKyliKz0oKGFbY118MCkrMHhmMDAwMDAwMDAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoNCk7cmV0dXJuIGIuc3Vic3RyKDAsc2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSkvNCl9LHRvQml0czpmdW5jdGlvbihhKXt2YXIgYixjPVtdLGQ7YT1hLnJlcGxhY2UoL1xcc3wweC9nLFwiXCIpO2Q9YS5sZW5ndGg7YT1hK1wiMDAwMDAwMDBcIjtmb3IoYj0wO2I8YS5sZW5ndGg7Yis9OCljLnB1c2gocGFyc2VJbnQoYS5zdWJzdHIoYiw4KSwxNileMCk7cmV0dXJuIHNqY2wuYml0QXJyYXkuY2xhbXAoYyw0KmQpfX07XG5zamNsLmNvZGVjLmJhc2U2ND17UzpcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIixmcm9tQml0czpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9XCJcIixlPTAsZj1zamNsLmNvZGVjLmJhc2U2NC5TLGc9MCxoPXNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpO2MmJihmPWYuc3Vic3RyKDAsNjIpK1wiLV9cIik7Zm9yKGM9MDs2KmQubGVuZ3RoPGg7KWQrPWYuY2hhckF0KChnXmFbY10+Pj5lKT4+PjI2KSw2PmU/KGc9YVtjXTw8Ni1lLGUrPTI2LGMrKyk6KGc8PD02LGUtPTYpO2Zvcig7ZC5sZW5ndGgmMyYmIWI7KWQrPVwiPVwiO3JldHVybiBkfSx0b0JpdHM6ZnVuY3Rpb24oYSxiKXthPWEucmVwbGFjZSgvXFxzfD0vZyxcIlwiKTt2YXIgYz1bXSxkLGU9MCxmPXNqY2wuY29kZWMuYmFzZTY0LlMsZz0wLGg7YiYmKGY9Zi5zdWJzdHIoMCw2MikrXCItX1wiKTtmb3IoZD0wO2Q8YS5sZW5ndGg7ZCsrKXtoPWYuaW5kZXhPZihhLmNoYXJBdChkKSk7XG5pZigwPmgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJ0aGlzIGlzbid0IGJhc2U2NCFcIik7MjY8ZT8oZS09MjYsYy5wdXNoKGdeaD4+PmUpLGc9aDw8MzItZSk6KGUrPTYsZ149aDw8MzItZSl9ZSY1NiYmYy5wdXNoKHNqY2wuYml0QXJyYXkucGFydGlhbChlJjU2LGcsMSkpO3JldHVybiBjfX07c2pjbC5jb2RlYy5iYXNlNjR1cmw9e2Zyb21CaXRzOmZ1bmN0aW9uKGEpe3JldHVybiBzamNsLmNvZGVjLmJhc2U2NC5mcm9tQml0cyhhLDEsMSl9LHRvQml0czpmdW5jdGlvbihhKXtyZXR1cm4gc2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGEsMSl9fTtzamNsLmhhc2guc2hhMjU2PWZ1bmN0aW9uKGEpe3RoaXMuYlswXXx8dGhpcy5DKCk7YT8odGhpcy5nPWEuZy5zbGljZSgwKSx0aGlzLmY9YS5mLnNsaWNlKDApLHRoaXMuYz1hLmMpOnRoaXMucmVzZXQoKX07c2pjbC5oYXNoLnNoYTI1Ni5oYXNoPWZ1bmN0aW9uKGEpe3JldHVybihuZXcgc2pjbC5oYXNoLnNoYTI1NikudXBkYXRlKGEpLmZpbmFsaXplKCl9O1xuc2pjbC5oYXNoLnNoYTI1Ni5wcm90b3R5cGU9e2Jsb2NrU2l6ZTo1MTIscmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLmc9dGhpcy5vLnNsaWNlKDApO3RoaXMuZj1bXTt0aGlzLmM9MDtyZXR1cm4gdGhpc30sdXBkYXRlOmZ1bmN0aW9uKGEpe1wic3RyaW5nXCI9PT10eXBlb2YgYSYmKGE9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhhKSk7dmFyIGIsYz10aGlzLmY9c2pjbC5iaXRBcnJheS5jb25jYXQodGhpcy5mLGEpO2I9dGhpcy5jO2E9dGhpcy5jPWIrc2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSk7aWYoMHgxZmZmZmZmZmZmZmZmZjxhKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiQ2Fubm90IGhhc2ggbW9yZSB0aGFuIDJeNTMgLSAxIGJpdHNcIik7aWYoXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBVaW50MzJBcnJheSl7dmFyIGQ9bmV3IFVpbnQzMkFycmF5KGMpLGU9MDtmb3IoYj01MTIrYi0oNTEyK2ImMHgxZmYpO2I8PWE7Yis9NTEyKXRoaXMubChkLnN1YmFycmF5KDE2KmUsXG4xNiooZSsxKSkpLGUrPTE7Yy5zcGxpY2UoMCwxNiplKX1lbHNlIGZvcihiPTUxMitiLSg1MTIrYiYweDFmZik7Yjw9YTtiKz01MTIpdGhpcy5sKGMuc3BsaWNlKDAsMTYpKTtyZXR1cm4gdGhpc30sZmluYWxpemU6ZnVuY3Rpb24oKXt2YXIgYSxiPXRoaXMuZixjPXRoaXMuZyxiPXNqY2wuYml0QXJyYXkuY29uY2F0KGIsW3NqY2wuYml0QXJyYXkucGFydGlhbCgxLDEpXSk7Zm9yKGE9Yi5sZW5ndGgrMjthJjE1O2ErKyliLnB1c2goMCk7Yi5wdXNoKE1hdGguZmxvb3IodGhpcy5jLzB4MTAwMDAwMDAwKSk7Zm9yKGIucHVzaCh0aGlzLmN8MCk7Yi5sZW5ndGg7KXRoaXMubChiLnNwbGljZSgwLDE2KSk7dGhpcy5yZXNldCgpO3JldHVybiBjfSxvOltdLGI6W10sQzpmdW5jdGlvbigpe2Z1bmN0aW9uIGEoYSl7cmV0dXJuIDB4MTAwMDAwMDAwKihhLU1hdGguZmxvb3IoYSkpfDB9Zm9yKHZhciBiPTAsYz0yLGQsZTs2ND5iO2MrKyl7ZT0hMDtmb3IoZD0yO2QqZDw9YztkKyspaWYoMD09PWMlZCl7ZT1cbiExO2JyZWFrfWUmJig4PmImJih0aGlzLm9bYl09YShNYXRoLnBvdyhjLC41KSkpLHRoaXMuYltiXT1hKE1hdGgucG93KGMsMS8zKSksYisrKX19LGw6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGU9dGhpcy5nLGY9dGhpcy5iLGc9ZVswXSxoPWVbMV0saz1lWzJdLG49ZVszXSxsPWVbNF0sbT1lWzVdLHA9ZVs2XSx6PWVbN107Zm9yKGI9MDs2ND5iO2IrKykxNj5iP2M9YVtiXTooYz1hW2IrMSYxNV0sZD1hW2IrMTQmMTVdLGM9YVtiJjE1XT0oYz4+PjdeYz4+PjE4XmM+Pj4zXmM8PDI1XmM8PDE0KSsoZD4+PjE3XmQ+Pj4xOV5kPj4+MTBeZDw8MTVeZDw8MTMpK2FbYiYxNV0rYVtiKzkmMTVdfDApLGM9Yyt6KyhsPj4+Nl5sPj4+MTFebD4+PjI1Xmw8PDI2Xmw8PDIxXmw8PDcpKyhwXmwmKG1ecCkpK2ZbYl0sej1wLHA9bSxtPWwsbD1uK2N8MCxuPWssaz1oLGg9ZyxnPWMrKGgma15uJihoXmspKSsoaD4+PjJeaD4+PjEzXmg+Pj4yMl5oPDwzMF5oPDwxOV5oPDwxMCl8MDtlWzBdPWVbMF0rZ3xcbjA7ZVsxXT1lWzFdK2h8MDtlWzJdPWVbMl0ra3wwO2VbM109ZVszXStufDA7ZVs0XT1lWzRdK2x8MDtlWzVdPWVbNV0rbXwwO2VbNl09ZVs2XStwfDA7ZVs3XT1lWzddK3p8MH19O3NqY2wuaGFzaC5zaGE1MTI9ZnVuY3Rpb24oYSl7dGhpcy5iWzBdfHx0aGlzLkMoKTthPyh0aGlzLmc9YS5nLnNsaWNlKDApLHRoaXMuZj1hLmYuc2xpY2UoMCksdGhpcy5jPWEuYyk6dGhpcy5yZXNldCgpfTtzamNsLmhhc2guc2hhNTEyLmhhc2g9ZnVuY3Rpb24oYSl7cmV0dXJuKG5ldyBzamNsLmhhc2guc2hhNTEyKS51cGRhdGUoYSkuZmluYWxpemUoKX07XG5zamNsLmhhc2guc2hhNTEyLnByb3RvdHlwZT17YmxvY2tTaXplOjEwMjQscmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLmc9dGhpcy5vLnNsaWNlKDApO3RoaXMuZj1bXTt0aGlzLmM9MDtyZXR1cm4gdGhpc30sdXBkYXRlOmZ1bmN0aW9uKGEpe1wic3RyaW5nXCI9PT10eXBlb2YgYSYmKGE9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhhKSk7dmFyIGIsYz10aGlzLmY9c2pjbC5iaXRBcnJheS5jb25jYXQodGhpcy5mLGEpO2I9dGhpcy5jO2E9dGhpcy5jPWIrc2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSk7aWYoMHgxZmZmZmZmZmZmZmZmZjxhKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiQ2Fubm90IGhhc2ggbW9yZSB0aGFuIDJeNTMgLSAxIGJpdHNcIik7aWYoXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBVaW50MzJBcnJheSl7dmFyIGQ9bmV3IFVpbnQzMkFycmF5KGMpLGU9MDtmb3IoYj0xMDI0K2ItKDEwMjQrYiYxMDIzKTtiPD1hO2IrPTEwMjQpdGhpcy5sKGQuc3ViYXJyYXkoMzIqXG5lLDMyKihlKzEpKSksZSs9MTtjLnNwbGljZSgwLDMyKmUpfWVsc2UgZm9yKGI9MTAyNCtiLSgxMDI0K2ImMTAyMyk7Yjw9YTtiKz0xMDI0KXRoaXMubChjLnNwbGljZSgwLDMyKSk7cmV0dXJuIHRoaXN9LGZpbmFsaXplOmZ1bmN0aW9uKCl7dmFyIGEsYj10aGlzLmYsYz10aGlzLmcsYj1zamNsLmJpdEFycmF5LmNvbmNhdChiLFtzamNsLmJpdEFycmF5LnBhcnRpYWwoMSwxKV0pO2ZvcihhPWIubGVuZ3RoKzQ7YSYzMTthKyspYi5wdXNoKDApO2IucHVzaCgwKTtiLnB1c2goMCk7Yi5wdXNoKE1hdGguZmxvb3IodGhpcy5jLzB4MTAwMDAwMDAwKSk7Zm9yKGIucHVzaCh0aGlzLmN8MCk7Yi5sZW5ndGg7KXRoaXMubChiLnNwbGljZSgwLDMyKSk7dGhpcy5yZXNldCgpO3JldHVybiBjfSxvOltdLGlhOlsxMjM3MjIzMiwxMzI4MTA4Myw5NzYyODU5LDE5MTQ2MDksMTUxMDY3NjksNDA5MDkxMSw0MzA4MzMxLDgyNjYxMDVdLGI6W10sa2E6WzI2NjYwMTgsMTU2ODkxNjUsNTA2MTQyMyw5MDM0Njg0LFxuNDc2NDk4NCwzODA5NTMsMTY1ODc3OSw3MTc2NDcyLDE5NzE4Niw3MzY4NjM4LDE0OTg3OTE2LDE2NzU3OTg2LDgwOTYxMTEsMTQ4MDM2OSwxMzA0NjMyNSw2ODkxMTU2LDE1ODEzMzMwLDUxODcwNDMsOTIyOTc0OSwxMTMxMjIyOSwyODE4Njc3LDEwOTM3NDc1LDQzMjQzMDgsMTEzNTU0MSw2NzQxOTMxLDExODA5Mjk2LDE2NDU4MDQ3LDE1NjY2OTE2LDExMDQ2ODUwLDY5ODE0OSwyMjk5OTksOTQ1Nzc2LDEzNzc0ODQ0LDI1NDE4NjIsMTI4NTYwNDUsOTgxMDkxMSwxMTQ5NDM2Niw3ODQ0NTIwLDE1NTc2ODA2LDg1MzMzMDcsMTU3OTUwNDQsNDMzNzY2NSwxNjI5MTcyOSw1NTUzNzEyLDE1Njg0MTIwLDY2NjI0MTYsNzQxMzgwMiwxMjMwODkyMCwxMzgxNjAwOCw0MzAzNjk5LDkzNjY0MjUsMTAxNzY2ODAsMTMxOTU4NzUsNDI5NTM3MSw2NTQ2MjkxLDExNzEyNjc1LDE1NzA4OTI0LDE1MTk0NTYsMTU3NzI1MzAsNjU2ODQyOCw2NDk1Nzg0LDg1NjgyOTcsMTMwMDcxMjUsNzQ5MjM5NSwyNTE1MzU2LFxuMTI2MzI1ODMsMTQ3NDAyNTQsNzI2MjU4NCwxNTM1OTMwLDEzMTQ2Mjc4LDE2MzIxOTY2LDE4NTMyMTEsMjk0Mjc2LDEzMDUxMDI3LDEzMjIxNTY0LDEwNTE5ODAsNDA4MDMxMCw2NjUxNDM0LDE0MDg4OTQwLDQ2NzU2MDddLEM6ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEpe3JldHVybiAweDEwMDAwMDAwMCooYS1NYXRoLmZsb29yKGEpKXwwfWZ1bmN0aW9uIGIoYSl7cmV0dXJuIDB4MTAwMDAwMDAwMDAqKGEtTWF0aC5mbG9vcihhKSkmMjU1fWZvcih2YXIgYz0wLGQ9MixlLGY7ODA+YztkKyspe2Y9ITA7Zm9yKGU9MjtlKmU8PWQ7ZSsrKWlmKDA9PT1kJWUpe2Y9ITE7YnJlYWt9ZiYmKDg+YyYmKHRoaXMub1syKmNdPWEoTWF0aC5wb3coZCwuNSkpLHRoaXMub1syKmMrMV09YihNYXRoLnBvdyhkLC41KSk8PDI0fHRoaXMuaWFbY10pLHRoaXMuYlsyKmNdPWEoTWF0aC5wb3coZCwxLzMpKSx0aGlzLmJbMipjKzFdPWIoTWF0aC5wb3coZCwxLzMpKTw8MjR8dGhpcy5rYVtjXSxjKyspfX0sbDpmdW5jdGlvbihhKXt2YXIgYixcbmMsZD10aGlzLmcsZT10aGlzLmIsZj1kWzBdLGc9ZFsxXSxoPWRbMl0saz1kWzNdLG49ZFs0XSxsPWRbNV0sbT1kWzZdLHA9ZFs3XSx6PWRbOF0sQT1kWzldLEM9ZFsxMF0sQj1kWzExXSxEPWRbMTJdLFA9ZFsxM10sZWE9ZFsxNF0sUT1kWzE1XSx0O2lmKFwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe3Q9QXJyYXkoMTYwKTtmb3IodmFyIHI9MDszMj5yO3IrKyl0W3JdPWFbcl19ZWxzZSB0PWE7dmFyIHI9Zix1PWcsRz1oLEU9ayxIPW4sRj1sLFY9bSxJPXAsdz16LHY9QSxSPUMsSj1CLFM9RCxLPVAsVz1lYSxMPVE7Zm9yKGE9MDs4MD5hO2ErKyl7aWYoMTY+YSliPXRbMiphXSxjPXRbMiphKzFdO2Vsc2V7Yz10WzIqKGEtMTUpXTt2YXIgcT10WzIqKGEtMTUpKzFdO2I9KHE8PDMxfGM+Pj4xKV4ocTw8MjR8Yz4+PjgpXmM+Pj43O3ZhciB4PShjPDwzMXxxPj4+MSleKGM8PDI0fHE+Pj44KV4oYzw8MjV8cT4+PjcpO2M9dFsyKihhLTIpXTt2YXIgeT10WzIqKGEtMikrMV0sXG5xPSh5PDwxM3xjPj4+MTkpXihjPDwzfHk+Pj4yOSleYz4+PjYseT0oYzw8MTN8eT4+PjE5KV4oeTw8M3xjPj4+MjkpXihjPDwyNnx5Pj4+NiksWD10WzIqKGEtNyldLFk9dFsyKihhLTE2KV0sTT10WzIqKGEtMTYpKzFdO2M9eCt0WzIqKGEtNykrMV07Yj1iK1grKGM+Pj4wPHg+Pj4wPzE6MCk7Yys9eTtiKz1xKyhjPj4+MDx5Pj4+MD8xOjApO2MrPU07Yis9WSsoYz4+PjA8TT4+PjA/MTowKX10WzIqYV09Ynw9MDt0WzIqYSsxXT1jfD0wO3ZhciBYPXcmUl5+dyZTLGZhPXYmSl5+diZLLHk9ciZHXnImSF5HJkgsamE9dSZFXnUmRl5FJkYsWT0odTw8NHxyPj4+MjgpXihyPDwzMHx1Pj4+MileKHI8PDI1fHU+Pj43KSxNPShyPDw0fHU+Pj4yOCleKHU8PDMwfHI+Pj4yKV4odTw8MjV8cj4+PjcpLGthPWVbMiphXSxnYT1lWzIqYSsxXSxxPUwrKCh3PDwxOHx2Pj4+MTQpXih3PDwxNHx2Pj4+MTgpXih2PDwyM3x3Pj4+OSkpLHg9VysoKHY8PDE4fHc+Pj4xNCleKHY8PDE0fHc+Pj4xOCleKHc8PFxuMjN8dj4+PjkpKSsocT4+PjA8TD4+PjA/MTowKSxxPXErZmEseD14KyhYKyhxPj4+MDxmYT4+PjA/MTowKSkscT1xK2dhLHg9eCsoa2ErKHE+Pj4wPGdhPj4+MD8xOjApKSxxPXErY3wwLHg9eCsoYisocT4+PjA8Yz4+PjA/MTowKSk7Yz1NK2phO2I9WSt5KyhjPj4+MDxNPj4+MD8xOjApO1c9UztMPUs7Uz1SO0s9SjtSPXc7Sj12O3Y9SStxfDA7dz1WK3grKHY+Pj4wPEk+Pj4wPzE6MCl8MDtWPUg7ST1GO0g9RztGPUU7Rz1yO0U9dTt1PXErY3wwO3I9eCtiKyh1Pj4+MDxxPj4+MD8xOjApfDB9Zz1kWzFdPWcrdXwwO2RbMF09ZityKyhnPj4+MDx1Pj4+MD8xOjApfDA7az1kWzNdPWsrRXwwO2RbMl09aCtHKyhrPj4+MDxFPj4+MD8xOjApfDA7bD1kWzVdPWwrRnwwO2RbNF09bitIKyhsPj4+MDxGPj4+MD8xOjApfDA7cD1kWzddPXArSXwwO2RbNl09bStWKyhwPj4+MDxJPj4+MD8xOjApfDA7QT1kWzldPUErdnwwO2RbOF09eit3KyhBPj4+MDx2Pj4+MD8xOjApfDA7Qj1kWzExXT1CK0p8XG4wO2RbMTBdPUMrUisoQj4+PjA8Sj4+PjA/MTowKXwwO1A9ZFsxM109UCtLfDA7ZFsxMl09RCtTKyhQPj4+MDxLPj4+MD8xOjApfDA7UT1kWzE1XT1RK0x8MDtkWzE0XT1lYStXKyhRPj4+MDxMPj4+MD8xOjApfDB9fTtcbnNqY2wubW9kZS5jY209e25hbWU6XCJjY21cIixGOltdLGxpc3RlblByb2dyZXNzOmZ1bmN0aW9uKGEpe3NqY2wubW9kZS5jY20uRi5wdXNoKGEpfSx1bkxpc3RlblByb2dyZXNzOmZ1bmN0aW9uKGEpe2E9c2pjbC5tb2RlLmNjbS5GLmluZGV4T2YoYSk7LTE8YSYmc2pjbC5tb2RlLmNjbS5GLnNwbGljZShhLDEpfSxkYTpmdW5jdGlvbihhKXt2YXIgYj1zamNsLm1vZGUuY2NtLkYuc2xpY2UoKSxjO2ZvcihjPTA7YzxiLmxlbmd0aDtjKz0xKWJbY10oYSl9LGVuY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZixnPWIuc2xpY2UoMCksaD1zamNsLmJpdEFycmF5LGs9aC5iaXRMZW5ndGgoYykvOCxuPWguYml0TGVuZ3RoKGcpLzg7ZT1lfHw2NDtkPWR8fFtdO2lmKDc+ayl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImNjbTogaXYgbXVzdCBiZSBhdCBsZWFzdCA3IGJ5dGVzXCIpO2ZvcihmPTI7ND5mJiZuPj4+OCpmO2YrKyk7ZjwxNS1rJiYoZj0xNS1rKTtjPWguY2xhbXAoYyxcbjgqKDE1LWYpKTtiPXNqY2wubW9kZS5jY20uVShhLGIsYyxkLGUsZik7Zz1zamNsLm1vZGUuY2NtLlYoYSxnLGMsYixlLGYpO3JldHVybiBoLmNvbmNhdChnLmRhdGEsZy50YWcpfSxkZWNyeXB0OmZ1bmN0aW9uKGEsYixjLGQsZSl7ZT1lfHw2NDtkPWR8fFtdO3ZhciBmPXNqY2wuYml0QXJyYXksZz1mLmJpdExlbmd0aChjKS84LGg9Zi5iaXRMZW5ndGgoYiksaz1mLmNsYW1wKGIsaC1lKSxuPWYuYml0U2xpY2UoYixoLWUpLGg9KGgtZSkvODtpZig3PmcpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJjY206IGl2IG11c3QgYmUgYXQgbGVhc3QgNyBieXRlc1wiKTtmb3IoYj0yOzQ+YiYmaD4+PjgqYjtiKyspO2I8MTUtZyYmKGI9MTUtZyk7Yz1mLmNsYW1wKGMsOCooMTUtYikpO2s9c2pjbC5tb2RlLmNjbS5WKGEsayxjLG4sZSxiKTthPXNqY2wubW9kZS5jY20uVShhLGsuZGF0YSxjLGQsZSxiKTtpZighZi5lcXVhbChrLnRhZyxhKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uY29ycnVwdChcImNjbTogdGFnIGRvZXNuJ3QgbWF0Y2hcIik7XG5yZXR1cm4gay5kYXRhfSxtYTpmdW5jdGlvbihhLGIsYyxkLGUsZil7dmFyIGc9W10saD1zamNsLmJpdEFycmF5LGs9aC5QO2Q9W2gucGFydGlhbCg4LChiLmxlbmd0aD82NDowKXxkLTI8PDJ8Zi0xKV07ZD1oLmNvbmNhdChkLGMpO2RbM118PWU7ZD1hLmVuY3J5cHQoZCk7aWYoYi5sZW5ndGgpZm9yKGM9aC5iaXRMZW5ndGgoYikvOCw2NTI3OT49Yz9nPVtoLnBhcnRpYWwoMTYsYyldOjB4ZmZmZmZmZmY+PWMmJihnPWguY29uY2F0KFtoLnBhcnRpYWwoMTYsNjU1MzQpXSxbY10pKSxnPWguY29uY2F0KGcsYiksYj0wO2I8Zy5sZW5ndGg7Yis9NClkPWEuZW5jcnlwdChrKGQsZy5zbGljZShiLGIrNCkuY29uY2F0KFswLDAsMF0pKSk7cmV0dXJuIGR9LFU6ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe3ZhciBnPXNqY2wuYml0QXJyYXksaD1nLlA7ZS89ODtpZihlJTJ8fDQ+ZXx8MTY8ZSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImNjbTogaW52YWxpZCB0YWcgbGVuZ3RoXCIpO1xuaWYoMHhmZmZmZmZmZjxkLmxlbmd0aHx8MHhmZmZmZmZmZjxiLmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwiY2NtOiBjYW4ndCBkZWFsIHdpdGggNEdpQiBvciBtb3JlIGRhdGFcIik7Yz1zamNsLm1vZGUuY2NtLm1hKGEsZCxjLGUsZy5iaXRMZW5ndGgoYikvOCxmKTtmb3IoZD0wO2Q8Yi5sZW5ndGg7ZCs9NCljPWEuZW5jcnlwdChoKGMsYi5zbGljZShkLGQrNCkuY29uY2F0KFswLDAsMF0pKSk7cmV0dXJuIGcuY2xhbXAoYyw4KmUpfSxWOmZ1bmN0aW9uKGEsYixjLGQsZSxmKXt2YXIgZyxoPXNqY2wuYml0QXJyYXk7Zz1oLlA7dmFyIGs9Yi5sZW5ndGgsbj1oLmJpdExlbmd0aChiKSxsPWsvNTAsbT1sO2M9aC5jb25jYXQoW2gucGFydGlhbCg4LGYtMSldLGMpLmNvbmNhdChbMCwwLDBdKS5zbGljZSgwLDQpO2Q9aC5iaXRTbGljZShnKGQsYS5lbmNyeXB0KGMpKSwwLGUpO2lmKCFrKXJldHVybnt0YWc6ZCxkYXRhOltdfTtmb3IoZz0wO2c8aztnKz00KWc+bCYmKHNqY2wubW9kZS5jY20uZGEoZy9cbmspLGwrPW0pLGNbM10rKyxlPWEuZW5jcnlwdChjKSxiW2ddXj1lWzBdLGJbZysxXV49ZVsxXSxiW2crMl1ePWVbMl0sYltnKzNdXj1lWzNdO3JldHVybnt0YWc6ZCxkYXRhOmguY2xhbXAoYixuKX19fTtzamNsLm1pc2MuaG1hYz1mdW5jdGlvbihhLGIpe3RoaXMuVz1iPWJ8fHNqY2wuaGFzaC5zaGEyNTY7dmFyIGM9W1tdLFtdXSxkLGU9Yi5wcm90b3R5cGUuYmxvY2tTaXplLzMyO3RoaXMuQj1bbmV3IGIsbmV3IGJdO2EubGVuZ3RoPmUmJihhPWIuaGFzaChhKSk7Zm9yKGQ9MDtkPGU7ZCsrKWNbMF1bZF09YVtkXV45MDk1MjI0ODYsY1sxXVtkXT1hW2RdXjE1NDk1NTY4Mjg7dGhpcy5CWzBdLnVwZGF0ZShjWzBdKTt0aGlzLkJbMV0udXBkYXRlKGNbMV0pO3RoaXMuTz1uZXcgYih0aGlzLkJbMF0pfTtcbnNqY2wubWlzYy5obWFjLnByb3RvdHlwZS5lbmNyeXB0PXNqY2wubWlzYy5obWFjLnByb3RvdHlwZS5tYWM9ZnVuY3Rpb24oYSl7aWYodGhpcy5aKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiZW5jcnlwdCBvbiBhbHJlYWR5IHVwZGF0ZWQgaG1hYyBjYWxsZWQhXCIpO3RoaXMudXBkYXRlKGEpO3JldHVybiB0aGlzLmRpZ2VzdChhKX07c2pjbC5taXNjLmhtYWMucHJvdG90eXBlLnJlc2V0PWZ1bmN0aW9uKCl7dGhpcy5PPW5ldyB0aGlzLlcodGhpcy5CWzBdKTt0aGlzLlo9ITF9O3NqY2wubWlzYy5obWFjLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24oYSl7dGhpcy5aPSEwO3RoaXMuTy51cGRhdGUoYSl9O3NqY2wubWlzYy5obWFjLnByb3RvdHlwZS5kaWdlc3Q9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLk8uZmluYWxpemUoKSxhPShuZXcgdGhpcy5XKHRoaXMuQlsxXSkpLnVwZGF0ZShhKS5maW5hbGl6ZSgpO3RoaXMucmVzZXQoKTtyZXR1cm4gYX07XG5zamNsLm1pc2MucGJrZGYyPWZ1bmN0aW9uKGEsYixjLGQsZSl7Yz1jfHwxRTQ7aWYoMD5kfHwwPmMpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJpbnZhbGlkIHBhcmFtcyB0byBwYmtkZjJcIik7XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYoYT1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGEpKTtcInN0cmluZ1wiPT09dHlwZW9mIGImJihiPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYikpO2U9ZXx8c2pjbC5taXNjLmhtYWM7YT1uZXcgZShhKTt2YXIgZixnLGgsayxuPVtdLGw9c2pjbC5iaXRBcnJheTtmb3Ioaz0xOzMyKm4ubGVuZ3RoPChkfHwxKTtrKyspe2U9Zj1hLmVuY3J5cHQobC5jb25jYXQoYixba10pKTtmb3IoZz0xO2c8YztnKyspZm9yKGY9YS5lbmNyeXB0KGYpLGg9MDtoPGYubGVuZ3RoO2grKyllW2hdXj1mW2hdO249bi5jb25jYXQoZSl9ZCYmKG49bC5jbGFtcChuLGQpKTtyZXR1cm4gbn07XG5zamNsLnBybmc9ZnVuY3Rpb24oYSl7dGhpcy5oPVtuZXcgc2pjbC5oYXNoLnNoYTI1Nl07dGhpcy5zPVswXTt0aGlzLk49MDt0aGlzLkc9e307dGhpcy5NPTA7dGhpcy5UPXt9O3RoaXMuWD10aGlzLmk9dGhpcy51PXRoaXMuZmE9MDt0aGlzLmI9WzAsMCwwLDAsMCwwLDAsMF07dGhpcy5tPVswLDAsMCwwXTt0aGlzLks9dm9pZCAwO3RoaXMuTD1hO3RoaXMuRD0hMTt0aGlzLko9e3Byb2dyZXNzOnt9LHNlZWRlZDp7fX07dGhpcy5BPXRoaXMuZWE9MDt0aGlzLkg9MTt0aGlzLkk9Mjt0aGlzLmFhPTB4MTAwMDA7dGhpcy5SPVswLDQ4LDY0LDk2LDEyOCwxOTIsMHgxMDAsMzg0LDUxMiw3NjgsMTAyNF07dGhpcy5iYT0zRTQ7dGhpcy4kPTgwfTtcbnNqY2wucHJuZy5wcm90b3R5cGU9e3JhbmRvbVdvcmRzOmZ1bmN0aW9uKGEsYil7dmFyIGM9W10sZDtkPXRoaXMuaXNSZWFkeShiKTt2YXIgZTtpZihkPT09dGhpcy5BKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5ub3RSZWFkeShcImdlbmVyYXRvciBpc24ndCBzZWVkZWRcIik7aWYoZCZ0aGlzLkkpe2Q9IShkJnRoaXMuSCk7ZT1bXTt2YXIgZj0wLGc7dGhpcy5YPWVbMF09KG5ldyBEYXRlKS52YWx1ZU9mKCkrdGhpcy5iYTtmb3IoZz0wOzE2Pmc7ZysrKWUucHVzaCgweDEwMDAwMDAwMCpNYXRoLnJhbmRvbSgpfDApO2ZvcihnPTA7Zzx0aGlzLmgubGVuZ3RoJiYoZT1lLmNvbmNhdCh0aGlzLmhbZ10uZmluYWxpemUoKSksZis9dGhpcy5zW2ddLHRoaXMuc1tnXT0wLGR8fCEodGhpcy5OJjE8PGcpKTtnKyspO3RoaXMuTj49MTw8dGhpcy5oLmxlbmd0aCYmKHRoaXMuaC5wdXNoKG5ldyBzamNsLmhhc2guc2hhMjU2KSx0aGlzLnMucHVzaCgwKSk7dGhpcy5pLT1mO2Y+dGhpcy51JiYodGhpcy51PVxuZik7dGhpcy5OKys7dGhpcy5iPXNqY2wuaGFzaC5zaGEyNTYuaGFzaCh0aGlzLmIuY29uY2F0KGUpKTt0aGlzLks9bmV3IHNqY2wuY2lwaGVyLmFlcyh0aGlzLmIpO2ZvcihkPTA7ND5kJiYodGhpcy5tW2RdPXRoaXMubVtkXSsxfDAsIXRoaXMubVtkXSk7ZCsrKTt9Zm9yKGQ9MDtkPGE7ZCs9NCkwPT09KGQrMSkldGhpcy5hYSYmYmEodGhpcyksZT1OKHRoaXMpLGMucHVzaChlWzBdLGVbMV0sZVsyXSxlWzNdKTtiYSh0aGlzKTtyZXR1cm4gYy5zbGljZSgwLGEpfSxzZXREZWZhdWx0UGFyYW5vaWE6ZnVuY3Rpb24oYSxiKXtpZigwPT09YSYmXCJTZXR0aW5nIHBhcmFub2lhPTAgd2lsbCBydWluIHlvdXIgc2VjdXJpdHk7IHVzZSBpdCBvbmx5IGZvciB0ZXN0aW5nXCIhPT1iKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiU2V0dGluZyBwYXJhbm9pYT0wIHdpbGwgcnVpbiB5b3VyIHNlY3VyaXR5OyB1c2UgaXQgb25seSBmb3IgdGVzdGluZ1wiKTt0aGlzLkw9YX0sYWRkRW50cm9weTpmdW5jdGlvbihhLFxuYixjKXtjPWN8fFwidXNlclwiO3ZhciBkLGUsZj0obmV3IERhdGUpLnZhbHVlT2YoKSxnPXRoaXMuR1tjXSxoPXRoaXMuaXNSZWFkeSgpLGs9MDtkPXRoaXMuVFtjXTt2b2lkIDA9PT1kJiYoZD10aGlzLlRbY109dGhpcy5mYSsrKTt2b2lkIDA9PT1nJiYoZz10aGlzLkdbY109MCk7dGhpcy5HW2NdPSh0aGlzLkdbY10rMSkldGhpcy5oLmxlbmd0aDtzd2l0Y2godHlwZW9mIGEpe2Nhc2UgXCJudW1iZXJcIjp2b2lkIDA9PT1iJiYoYj0xKTt0aGlzLmhbZ10udXBkYXRlKFtkLHRoaXMuTSsrLDEsYixmLDEsYXwwXSk7YnJlYWs7Y2FzZSBcIm9iamVjdFwiOmM9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpO2lmKFwiW29iamVjdCBVaW50MzJBcnJheV1cIj09PWMpe2U9W107Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKyllLnB1c2goYVtjXSk7YT1lfWVsc2UgZm9yKFwiW29iamVjdCBBcnJheV1cIiE9PWMmJihrPTEpLGM9MDtjPGEubGVuZ3RoJiYhaztjKyspXCJudW1iZXJcIiE9PXR5cGVvZiBhW2NdJiZcbihrPTEpO2lmKCFrKXtpZih2b2lkIDA9PT1iKWZvcihjPWI9MDtjPGEubGVuZ3RoO2MrKylmb3IoZT1hW2NdOzA8ZTspYisrLGU9ZT4+PjE7dGhpcy5oW2ddLnVwZGF0ZShbZCx0aGlzLk0rKywyLGIsZixhLmxlbmd0aF0uY29uY2F0KGEpKX1icmVhaztjYXNlIFwic3RyaW5nXCI6dm9pZCAwPT09YiYmKGI9YS5sZW5ndGgpO3RoaXMuaFtnXS51cGRhdGUoW2QsdGhpcy5NKyssMyxiLGYsYS5sZW5ndGhdKTt0aGlzLmhbZ10udXBkYXRlKGEpO2JyZWFrO2RlZmF1bHQ6az0xfWlmKGspdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmJ1ZyhcInJhbmRvbTogYWRkRW50cm9weSBvbmx5IHN1cHBvcnRzIG51bWJlciwgYXJyYXkgb2YgbnVtYmVycyBvciBzdHJpbmdcIik7dGhpcy5zW2ddKz1iO3RoaXMuaSs9YjtoPT09dGhpcy5BJiYodGhpcy5pc1JlYWR5KCkhPT10aGlzLkEmJmNhKFwic2VlZGVkXCIsTWF0aC5tYXgodGhpcy51LHRoaXMuaSkpLGNhKFwicHJvZ3Jlc3NcIix0aGlzLmdldFByb2dyZXNzKCkpKX0sXG5pc1JlYWR5OmZ1bmN0aW9uKGEpe2E9dGhpcy5SW3ZvaWQgMCE9PWE/YTp0aGlzLkxdO3JldHVybiB0aGlzLnUmJnRoaXMudT49YT90aGlzLnNbMF0+dGhpcy4kJiYobmV3IERhdGUpLnZhbHVlT2YoKT50aGlzLlg/dGhpcy5JfHRoaXMuSDp0aGlzLkg6dGhpcy5pPj1hP3RoaXMuSXx0aGlzLkE6dGhpcy5BfSxnZXRQcm9ncmVzczpmdW5jdGlvbihhKXthPXRoaXMuUlthP2E6dGhpcy5MXTtyZXR1cm4gdGhpcy51Pj1hPzE6dGhpcy5pPmE/MTp0aGlzLmkvYX0sc3RhcnRDb2xsZWN0b3JzOmZ1bmN0aW9uKCl7aWYoIXRoaXMuRCl7dGhpcy5hPXtsb2FkVGltZUNvbGxlY3RvcjpPKHRoaXMsdGhpcy5sYSksbW91c2VDb2xsZWN0b3I6Tyh0aGlzLHRoaXMubmEpLGtleWJvYXJkQ29sbGVjdG9yOk8odGhpcyx0aGlzLmphKSxhY2NlbGVyb21ldGVyQ29sbGVjdG9yOk8odGhpcyx0aGlzLmNhKSx0b3VjaENvbGxlY3RvcjpPKHRoaXMsdGhpcy5wYSl9O2lmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLFxudGhpcy5hLmxvYWRUaW1lQ29sbGVjdG9yLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMuYS5tb3VzZUNvbGxlY3RvciwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLHRoaXMuYS5rZXlib2FyZENvbGxlY3RvciwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2Vtb3Rpb25cIix0aGlzLmEuYWNjZWxlcm9tZXRlckNvbGxlY3RvciwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIix0aGlzLmEudG91Y2hDb2xsZWN0b3IsITEpO2Vsc2UgaWYoZG9jdW1lbnQuYXR0YWNoRXZlbnQpZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIix0aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IpLGRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25tb3VzZW1vdmVcIix0aGlzLmEubW91c2VDb2xsZWN0b3IpLGRvY3VtZW50LmF0dGFjaEV2ZW50KFwia2V5cHJlc3NcIix0aGlzLmEua2V5Ym9hcmRDb2xsZWN0b3IpO2Vsc2UgdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmJ1ZyhcImNhbid0IGF0dGFjaCBldmVudFwiKTtcbnRoaXMuRD0hMH19LHN0b3BDb2xsZWN0b3JzOmZ1bmN0aW9uKCl7dGhpcy5EJiYod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXI/KHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLHRoaXMuYS5sb2FkVGltZUNvbGxlY3RvciwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLmEubW91c2VDb2xsZWN0b3IsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIix0aGlzLmEua2V5Ym9hcmRDb2xsZWN0b3IsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZGV2aWNlbW90aW9uXCIsdGhpcy5hLmFjY2VsZXJvbWV0ZXJDb2xsZWN0b3IsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsdGhpcy5hLnRvdWNoQ29sbGVjdG9yLCExKSk6ZG9jdW1lbnQuZGV0YWNoRXZlbnQmJihkb2N1bWVudC5kZXRhY2hFdmVudChcIm9ubG9hZFwiLHRoaXMuYS5sb2FkVGltZUNvbGxlY3RvciksZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJvbm1vdXNlbW92ZVwiLFxudGhpcy5hLm1vdXNlQ29sbGVjdG9yKSxkb2N1bWVudC5kZXRhY2hFdmVudChcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yKSksdGhpcy5EPSExKX0sYWRkRXZlbnRMaXN0ZW5lcjpmdW5jdGlvbihhLGIpe3RoaXMuSlthXVt0aGlzLmVhKytdPWJ9LHJlbW92ZUV2ZW50TGlzdGVuZXI6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGU9dGhpcy5KW2FdLGY9W107Zm9yKGQgaW4gZSllLmhhc093blByb3BlcnR5KGQpJiZlW2RdPT09YiYmZi5wdXNoKGQpO2ZvcihjPTA7YzxmLmxlbmd0aDtjKyspZD1mW2NdLGRlbGV0ZSBlW2RdfSxqYTpmdW5jdGlvbigpe1QodGhpcywxKX0sbmE6ZnVuY3Rpb24oYSl7dmFyIGIsYzt0cnl7Yj1hLnh8fGEuY2xpZW50WHx8YS5vZmZzZXRYfHwwLGM9YS55fHxhLmNsaWVudFl8fGEub2Zmc2V0WXx8MH1jYXRjaChkKXtjPWI9MH0wIT1iJiYwIT1jJiZ0aGlzLmFkZEVudHJvcHkoW2IsY10sMixcIm1vdXNlXCIpO1QodGhpcywwKX0scGE6ZnVuY3Rpb24oYSl7YT1cbmEudG91Y2hlc1swXXx8YS5jaGFuZ2VkVG91Y2hlc1swXTt0aGlzLmFkZEVudHJvcHkoW2EucGFnZVh8fGEuY2xpZW50WCxhLnBhZ2VZfHxhLmNsaWVudFldLDEsXCJ0b3VjaFwiKTtUKHRoaXMsMCl9LGxhOmZ1bmN0aW9uKCl7VCh0aGlzLDIpfSxjYTpmdW5jdGlvbihhKXthPWEuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS54fHxhLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueXx8YS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lno7aWYod2luZG93Lm9yaWVudGF0aW9uKXt2YXIgYj13aW5kb3cub3JpZW50YXRpb247XCJudW1iZXJcIj09PXR5cGVvZiBiJiZ0aGlzLmFkZEVudHJvcHkoYiwxLFwiYWNjZWxlcm9tZXRlclwiKX1hJiZ0aGlzLmFkZEVudHJvcHkoYSwyLFwiYWNjZWxlcm9tZXRlclwiKTtUKHRoaXMsMCl9fTtcbmZ1bmN0aW9uIGNhKGEsYil7dmFyIGMsZD1zamNsLnJhbmRvbS5KW2FdLGU9W107Zm9yKGMgaW4gZClkLmhhc093blByb3BlcnR5KGMpJiZlLnB1c2goZFtjXSk7Zm9yKGM9MDtjPGUubGVuZ3RoO2MrKyllW2NdKGIpfWZ1bmN0aW9uIFQoYSxiKXtcInVuZGVmaW5lZFwiIT09dHlwZW9mIHdpbmRvdyYmd2luZG93LnBlcmZvcm1hbmNlJiZcImZ1bmN0aW9uXCI9PT10eXBlb2Ygd2luZG93LnBlcmZvcm1hbmNlLm5vdz9hLmFkZEVudHJvcHkod2luZG93LnBlcmZvcm1hbmNlLm5vdygpLGIsXCJsb2FkdGltZVwiKTphLmFkZEVudHJvcHkoKG5ldyBEYXRlKS52YWx1ZU9mKCksYixcImxvYWR0aW1lXCIpfWZ1bmN0aW9uIGJhKGEpe2EuYj1OKGEpLmNvbmNhdChOKGEpKTthLks9bmV3IHNqY2wuY2lwaGVyLmFlcyhhLmIpfWZ1bmN0aW9uIE4oYSl7Zm9yKHZhciBiPTA7ND5iJiYoYS5tW2JdPWEubVtiXSsxfDAsIWEubVtiXSk7YisrKTtyZXR1cm4gYS5LLmVuY3J5cHQoYS5tKX1cbmZ1bmN0aW9uIE8oYSxiKXtyZXR1cm4gZnVuY3Rpb24oKXtiLmFwcGx5KGEsYXJndW1lbnRzKX19c2pjbC5yYW5kb209bmV3IHNqY2wucHJuZyg2KTtcbmE6dHJ5e3ZhciBVLGRhLFosaGE7aWYoaGE9XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzKXt2YXIgaWE7dHJ5e2lhPXJlcXVpcmUoXCJjcnlwdG9cIil9Y2F0Y2goYSl7aWE9bnVsbH1oYT1kYT1pYX1pZihoYSYmZGEucmFuZG9tQnl0ZXMpVT1kYS5yYW5kb21CeXRlcygxMjgpLFU9bmV3IFVpbnQzMkFycmF5KChuZXcgVWludDhBcnJheShVKSkuYnVmZmVyKSxzamNsLnJhbmRvbS5hZGRFbnRyb3B5KFUsMTAyNCxcImNyeXB0b1sncmFuZG9tQnl0ZXMnXVwiKTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPT10eXBlb2Ygd2luZG93JiZcInVuZGVmaW5lZFwiIT09dHlwZW9mIFVpbnQzMkFycmF5KXtaPW5ldyBVaW50MzJBcnJheSgzMik7aWYod2luZG93LmNyeXB0byYmd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMpd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoWik7ZWxzZSBpZih3aW5kb3cubXNDcnlwdG8mJndpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMpd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyhaKTtcbmVsc2UgYnJlYWsgYTtzamNsLnJhbmRvbS5hZGRFbnRyb3B5KFosMTAyNCxcImNyeXB0b1snZ2V0UmFuZG9tVmFsdWVzJ11cIil9fWNhdGNoKGEpe1widW5kZWZpbmVkXCIhPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuY29uc29sZSYmKGNvbnNvbGUubG9nKFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbGxlY3RpbmcgZW50cm9weSBmcm9tIHRoZSBicm93c2VyOlwiKSxjb25zb2xlLmxvZyhhKSl9XG5zamNsLmpzb249e2RlZmF1bHRzOnt2OjEsaXRlcjoxRTQsa3M6MTI4LHRzOjY0LG1vZGU6XCJjY21cIixhZGF0YTpcIlwiLGNpcGhlcjpcImFlc1wifSxoYTpmdW5jdGlvbihhLGIsYyxkKXtjPWN8fHt9O2Q9ZHx8e307dmFyIGU9c2pjbC5qc29uLGY9ZS5qKHtpdjpzamNsLnJhbmRvbS5yYW5kb21Xb3Jkcyg0LDApfSxlLmRlZmF1bHRzKSxnO2UuaihmLGMpO2M9Zi5hZGF0YTtcInN0cmluZ1wiPT09dHlwZW9mIGYuc2FsdCYmKGYuc2FsdD1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoZi5zYWx0KSk7XCJzdHJpbmdcIj09PXR5cGVvZiBmLml2JiYoZi5pdj1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoZi5pdikpO2lmKCFzamNsLm1vZGVbZi5tb2RlXXx8IXNqY2wuY2lwaGVyW2YuY2lwaGVyXXx8XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYxMDA+PWYuaXRlcnx8NjQhPT1mLnRzJiY5NiE9PWYudHMmJjEyOCE9PWYudHN8fDEyOCE9PWYua3MmJjE5MiE9PWYua3MmJjB4MTAwIT09Zi5rc3x8Mj5mLml2Lmxlbmd0aHx8XG40PGYuaXYubGVuZ3RoKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBlbmNyeXB0OiBpbnZhbGlkIHBhcmFtZXRlcnNcIik7XCJzdHJpbmdcIj09PXR5cGVvZiBhPyhnPXNqY2wubWlzYy5jYWNoZWRQYmtkZjIoYSxmKSxhPWcua2V5LnNsaWNlKDAsZi5rcy8zMiksZi5zYWx0PWcuc2FsdCk6c2pjbC5lY2MmJmEgaW5zdGFuY2VvZiBzamNsLmVjYy5lbEdhbWFsLnB1YmxpY0tleSYmKGc9YS5rZW0oKSxmLmtlbXRhZz1nLnRhZyxhPWcua2V5LnNsaWNlKDAsZi5rcy8zMikpO1wic3RyaW5nXCI9PT10eXBlb2YgYiYmKGI9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhiKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBjJiYoZi5hZGF0YT1jPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYykpO2c9bmV3IHNqY2wuY2lwaGVyW2YuY2lwaGVyXShhKTtlLmooZCxmKTtkLmtleT1hO2YuY3Q9XCJjY21cIj09PWYubW9kZSYmc2pjbC5hcnJheUJ1ZmZlciYmc2pjbC5hcnJheUJ1ZmZlci5jY20mJlxuYiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyP3NqY2wuYXJyYXlCdWZmZXIuY2NtLmVuY3J5cHQoZyxiLGYuaXYsYyxmLnRzKTpzamNsLm1vZGVbZi5tb2RlXS5lbmNyeXB0KGcsYixmLml2LGMsZi50cyk7cmV0dXJuIGZ9LGVuY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9c2pjbC5qc29uLGY9ZS5oYS5hcHBseShlLGFyZ3VtZW50cyk7cmV0dXJuIGUuZW5jb2RlKGYpfSxnYTpmdW5jdGlvbihhLGIsYyxkKXtjPWN8fHt9O2Q9ZHx8e307dmFyIGU9c2pjbC5qc29uO2I9ZS5qKGUuaihlLmooe30sZS5kZWZhdWx0cyksYiksYywhMCk7dmFyIGYsZztmPWIuYWRhdGE7XCJzdHJpbmdcIj09PXR5cGVvZiBiLnNhbHQmJihiLnNhbHQ9c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGIuc2FsdCkpO1wic3RyaW5nXCI9PT10eXBlb2YgYi5pdiYmKGIuaXY9c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGIuaXYpKTtpZighc2pjbC5tb2RlW2IubW9kZV18fCFzamNsLmNpcGhlcltiLmNpcGhlcl18fFwic3RyaW5nXCI9PT1cbnR5cGVvZiBhJiYxMDA+PWIuaXRlcnx8NjQhPT1iLnRzJiY5NiE9PWIudHMmJjEyOCE9PWIudHN8fDEyOCE9PWIua3MmJjE5MiE9PWIua3MmJjB4MTAwIT09Yi5rc3x8IWIuaXZ8fDI+Yi5pdi5sZW5ndGh8fDQ8Yi5pdi5sZW5ndGgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGRlY3J5cHQ6IGludmFsaWQgcGFyYW1ldGVyc1wiKTtcInN0cmluZ1wiPT09dHlwZW9mIGE/KGc9c2pjbC5taXNjLmNhY2hlZFBia2RmMihhLGIpLGE9Zy5rZXkuc2xpY2UoMCxiLmtzLzMyKSxiLnNhbHQ9Zy5zYWx0KTpzamNsLmVjYyYmYSBpbnN0YW5jZW9mIHNqY2wuZWNjLmVsR2FtYWwuc2VjcmV0S2V5JiYoYT1hLnVua2VtKHNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhiLmtlbXRhZykpLnNsaWNlKDAsYi5rcy8zMikpO1wic3RyaW5nXCI9PT10eXBlb2YgZiYmKGY9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhmKSk7Zz1uZXcgc2pjbC5jaXBoZXJbYi5jaXBoZXJdKGEpO2Y9XCJjY21cIj09PVxuYi5tb2RlJiZzamNsLmFycmF5QnVmZmVyJiZzamNsLmFycmF5QnVmZmVyLmNjbSYmYi5jdCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyP3NqY2wuYXJyYXlCdWZmZXIuY2NtLmRlY3J5cHQoZyxiLmN0LGIuaXYsYi50YWcsZixiLnRzKTpzamNsLm1vZGVbYi5tb2RlXS5kZWNyeXB0KGcsYi5jdCxiLml2LGYsYi50cyk7ZS5qKGQsYik7ZC5rZXk9YTtyZXR1cm4gMT09PWMucmF3P2Y6c2pjbC5jb2RlYy51dGY4U3RyaW5nLmZyb21CaXRzKGYpfSxkZWNyeXB0OmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPXNqY2wuanNvbjtyZXR1cm4gZS5nYShhLGUuZGVjb2RlKGIpLGMsZCl9LGVuY29kZTpmdW5jdGlvbihhKXt2YXIgYixjPVwie1wiLGQ9XCJcIjtmb3IoYiBpbiBhKWlmKGEuaGFzT3duUHJvcGVydHkoYikpe2lmKCFiLm1hdGNoKC9eW2EtejAtOV0rJC9pKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZW5jb2RlOiBpbnZhbGlkIHByb3BlcnR5IG5hbWVcIik7Yys9ZCsnXCInK1xuYisnXCI6JztkPVwiLFwiO3N3aXRjaCh0eXBlb2YgYVtiXSl7Y2FzZSBcIm51bWJlclwiOmNhc2UgXCJib29sZWFuXCI6Yys9YVtiXTticmVhaztjYXNlIFwic3RyaW5nXCI6Yys9J1wiJytlc2NhcGUoYVtiXSkrJ1wiJzticmVhaztjYXNlIFwib2JqZWN0XCI6Yys9J1wiJytzamNsLmNvZGVjLmJhc2U2NC5mcm9tQml0cyhhW2JdLDApKydcIic7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwianNvbiBlbmNvZGU6IHVuc3VwcG9ydGVkIHR5cGVcIik7fX1yZXR1cm4gYytcIn1cIn0sZGVjb2RlOmZ1bmN0aW9uKGEpe2E9YS5yZXBsYWNlKC9cXHMvZyxcIlwiKTtpZighYS5tYXRjaCgvXlxcey4qXFx9JC8pKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBkZWNvZGU6IHRoaXMgaXNuJ3QganNvbiFcIik7YT1hLnJlcGxhY2UoL15cXHt8XFx9JC9nLFwiXCIpLnNwbGl0KC8sLyk7dmFyIGI9e30sYyxkO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspe2lmKCEoZD1hW2NdLm1hdGNoKC9eXFxzKig/OihbXCInXT8pKFthLXpdW2EtejAtOV0qKVxcMSlcXHMqOlxccyooPzooLT9cXGQrKXxcIihbYS16MC05K1xcLyUqXy5APVxcLV0qKVwifCh0cnVlfGZhbHNlKSkkL2kpKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZGVjb2RlOiB0aGlzIGlzbid0IGpzb24hXCIpO1xubnVsbCE9ZFszXT9iW2RbMl1dPXBhcnNlSW50KGRbM10sMTApOm51bGwhPWRbNF0/YltkWzJdXT1kWzJdLm1hdGNoKC9eKGN0fGFkYXRhfHNhbHR8aXYpJC8pP3NqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhkWzRdKTp1bmVzY2FwZShkWzRdKTpudWxsIT1kWzVdJiYoYltkWzJdXT1cInRydWVcIj09PWRbNV0pfXJldHVybiBifSxqOmZ1bmN0aW9uKGEsYixjKXt2b2lkIDA9PT1hJiYoYT17fSk7aWYodm9pZCAwPT09YilyZXR1cm4gYTtmb3IodmFyIGQgaW4gYilpZihiLmhhc093blByb3BlcnR5KGQpKXtpZihjJiZ2b2lkIDAhPT1hW2RdJiZhW2RdIT09YltkXSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcInJlcXVpcmVkIHBhcmFtZXRlciBvdmVycmlkZGVuXCIpO2FbZF09YltkXX1yZXR1cm4gYX0scmE6ZnVuY3Rpb24oYSxiKXt2YXIgYz17fSxkO2ZvcihkIGluIGEpYS5oYXNPd25Qcm9wZXJ0eShkKSYmYVtkXSE9PWJbZF0mJihjW2RdPWFbZF0pO3JldHVybiBjfSxxYTpmdW5jdGlvbihhLFxuYil7dmFyIGM9e30sZDtmb3IoZD0wO2Q8Yi5sZW5ndGg7ZCsrKXZvaWQgMCE9PWFbYltkXV0mJihjW2JbZF1dPWFbYltkXV0pO3JldHVybiBjfX07c2pjbC5lbmNyeXB0PXNqY2wuanNvbi5lbmNyeXB0O3NqY2wuZGVjcnlwdD1zamNsLmpzb24uZGVjcnlwdDtzamNsLm1pc2Mub2E9e307c2pjbC5taXNjLmNhY2hlZFBia2RmMj1mdW5jdGlvbihhLGIpe3ZhciBjPXNqY2wubWlzYy5vYSxkO2I9Ynx8e307ZD1iLml0ZXJ8fDFFMztjPWNbYV09Y1thXXx8e307ZD1jW2RdPWNbZF18fHtmaXJzdFNhbHQ6Yi5zYWx0JiZiLnNhbHQubGVuZ3RoP2Iuc2FsdC5zbGljZSgwKTpzamNsLnJhbmRvbS5yYW5kb21Xb3JkcygyLDApfTtjPXZvaWQgMD09PWIuc2FsdD9kLmZpcnN0U2FsdDpiLnNhbHQ7ZFtjXT1kW2NdfHxzamNsLm1pc2MucGJrZGYyKGEsYyxiLml0ZXIpO3JldHVybntrZXk6ZFtjXS5zbGljZSgwKSxzYWx0OmMuc2xpY2UoMCl9fTtcblwidW5kZWZpbmVkXCIhPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cyYmKG1vZHVsZS5leHBvcnRzPXNqY2wpO1wiZnVuY3Rpb25cIj09PXR5cGVvZiBkZWZpbmUmJmRlZmluZShbXSxmdW5jdGlvbigpe3JldHVybiBzamNsfSk7XG4iLCAiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQgeyBlcnJBc3luYywgb2tBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHsgTHVmaUZpbGUgfSBmcm9tIFwifi9lbnRpdGllcy9sdWZpLWZpbGUudHNcIjtcbmltcG9ydCB7IEx1ZmlKb2IgfSBmcm9tIFwifi9lbnRpdGllcy9sdWZpLWpvYi50c1wiO1xuaW1wb3J0IHsgSm9iU3RhdHVzIH0gZnJvbSBcIn4vZW51bS9qb2Itc3RhdHVzLnRzXCI7XG5pbXBvcnQgeyBFVkVOVCB9IGZyb20gXCJ+L2VudW0vZXZlbnQudHNcIjtcbmltcG9ydCB7IFVQTE9BRF9TVEFUVVMgfSBmcm9tIFwifi9lbnVtL2ZpbGUtc3RhdHVzLnRzXCI7XG5pbXBvcnQgeyBXT1JLRVJfQUNUSU9OIH0gZnJvbSBcIn4vZW51bS93b3JrZXItYWN0aW9uLnRzXCI7XG5pbXBvcnQgeyBlbnN1cmVFcnJvciwgZmV0Y2hTZXJ2ZXJDb25maWcsIGlzU2VjdXJlQ29udGV4dCB9IGZyb20gXCJ+L3V0aWxzLnRzXCI7XG5pbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSBcIn4vYXBpL2NyeXB0by50c1wiO1xuaW1wb3J0IHsgRmlsZVNsaWNpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2ZpbGUvZmlsZS1zbGljaW5nLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IENyeXB0b0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2NyeXB0by1lcnJvci50c1wiO1xuaW1wb3J0IHsgRG93bmxvYWRFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Rvd25sb2FkL2Rvd25sb2FkLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBJbmZvc0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvaW5mb3MtZXJyb3IudHNcIjtcbmltcG9ydCB7IEpvYlBhdXNlRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3Ivam9iL2pvYi1wYXVzZS1lcnJvci50c1wiO1xuaW1wb3J0IHsgSm9iUmVzdW1lRXJyb3IgfSBmcm9tIFwifi9lcnJvci9qb2Ivam9iLXJlc3VtZS1lcnJvci50c1wiO1xuaW1wb3J0IHsgSm9iRXJyb3IgfSBmcm9tIFwifi9lcnJvci9qb2Ivam9iLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBVcGxvYWRFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3VwbG9hZC91cGxvYWQtZXJyb3IudHNcIjtcbmltcG9ydCB7IGhhc2hQYXNzd29yZCB9IGZyb20gXCJ+L2FwaS9jcnlwdG8udHNcIjtcbmltcG9ydCB7IFdPUktFUl9UWVBFIH0gZnJvbSBcIn4vZW51bS93b3JrZXItdHlwZS50c1wiO1xuaW1wb3J0IHsgdHlwZSBBc3luY1ppcHBhYmxlIH0gZnJvbSBcImZmbGF0ZVwiO1xuXG5jb25zdCBDSFVOS19MRU5HVEggPSAxXzUwMF8wMDA7IC8vIDEuNSBNQlxuXG5jb25zdCBmaWxlczogeyBbY2xpZW50S2V5OiBzdHJpbmddOiBMdWZpRmlsZSB9ID0ge307XG5leHBvcnQgY29uc3QgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4vKipcbiAqIENhbmNlbCBhbiB1cGxvYWRcbiAqXG4gKiBAcGFyYW0gdXBsb2FkSm9iXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgY2FuY2VsID0gKHVwbG9hZEpvYjogTHVmaUpvYik6IFJlc3VsdEFzeW5jPEx1ZmlKb2IsIEVycm9yPiA9PiB7XG4gIHVwbG9hZEpvYi50ZXJtaW5hdGUoKTtcblxuICBjb25zdCBqb2IgPSBuZXcgTHVmaUpvYih1cGxvYWRKb2IubHVmaUZpbGUsIFdPUktFUl9UWVBFLkNBTkNFTCk7XG5cbiAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGpvYlxuICAgICAgICAub25NZXNzYWdlKChldmVudCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSBFVkVOVC5VUExPQURfQ0FOQ0VMTEVEKSB7XG4gICAgICAgICAgICBmaWxlc1tqb2IubHVmaUZpbGUua2V5cy5jbGllbnRdLnVwbG9hZFN0YXR1cyA9XG4gICAgICAgICAgICAgIFVQTE9BRF9TVEFUVVMuQ0FOQ0VMRUQ7XG5cbiAgICAgICAgICAgIHJlc29sdmUoam9iKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCkge1xuICAgICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgICBuZXcgSm9iRXJyb3IoXG4gICAgICAgICAgICAgICAgXCJBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBjYW5jZWwgYW4gdXBsb2FkXCIsXG4gICAgICAgICAgICAgICAgeyBjYXVzZTogZXZlbnQuZGF0YS5lcnJvciB9LFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5yZXF1ZXN0TWVzc2FnZSh7XG4gICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgbHVmaUZpbGU6IGpvYi5sdWZpRmlsZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9KSxcbiAgICAoZXJyb3IpID0+IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgbGlzdCBvZiBmaWxlcyB0byBiZSBwYXNzZWQgdG8gY29tcHJlc3MoKVxuICpcbiAqIEBwYXJhbSBmaWxlc1xuICogQHBhcmFtIGFyY2hpdmVFbnRyaWVzXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgYWRkRmlsZXNUb0FyY2hpdmUgPSAoXG4gIGZpbGVzOiBGaWxlW10sXG4gIGFyY2hpdmVFbnRyaWVzOiBBc3luY1ppcHBhYmxlID0ge30sXG4pOiBSZXN1bHRBc3luYzxBc3luY1ppcHBhYmxlLCBFcnJvcj4gPT4ge1xuICBjb25zdCBhc3luY0xvb3AgPSBhc3luYyAoXG4gICAgZmlsZXM6IEZpbGVbXSxcbiAgKSA9PiB7XG4gICAgZm9yIChjb25zdCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICBjb25zdCBuYW1lV2l0aEV4dGVuc2lvbiA9IGZpbGUubmFtZS5zcGxpdChcIi9cIik/LnBvcCgpIHx8IGZpbGUubmFtZTtcblxuICAgICAgY29uc3QgbmFtZVdpdGhvdXRFeHRlbnNpb24gPSBuYW1lV2l0aEV4dGVuc2lvbi5zcGxpdChcIi5cIikuc2hpZnQoKTtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IG5hbWVXaXRoRXh0ZW5zaW9uLnNwbGl0KFwiLlwiKS5sZW5ndGggPiAxXG4gICAgICAgID8gYC4ke25hbWVXaXRoRXh0ZW5zaW9uLnNwbGl0KFwiLlwiKS5wb3AoKX1gXG4gICAgICAgIDogXCJcIjtcblxuICAgICAgbGV0IG5hbWUgPSBuYW1lV2l0aEV4dGVuc2lvbjtcblxuICAgICAgaWYgKGFyY2hpdmVFbnRyaWVzW25hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGV0IGkgPSAxO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgbmFtZSA9IGAke25hbWVXaXRob3V0RXh0ZW5zaW9ufSgke2l9KSR7ZXh0ZW5zaW9ufWA7XG5cbiAgICAgICAgICBpKys7XG4gICAgICAgIH0gd2hpbGUgKGFyY2hpdmVFbnRyaWVzW25hbWVdICE9PSB1bmRlZmluZWQpO1xuICAgICAgfVxuXG4gICAgICBldmVudHMuZW1pdChFVkVOVC5BUkNISVZFX0FEREVEX0ZJTEUsIHsgbmFtZSwgc2l6ZTogZmlsZS5zaXplIH0pO1xuXG4gICAgICBhcmNoaXZlRW50cmllc1tuYW1lXSA9IGF3YWl0IGZpbGUuYnl0ZXMoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIGFzeW5jTG9vcChmaWxlcyksXG4gICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICkuYW5kVGhlbigoKSA9PiBva0FzeW5jKGFyY2hpdmVFbnRyaWVzKSk7XG59O1xuXG4vKipcbiAqIENvbXByZXNzIGZpbGVzIGludG8gYSB6aXBcbiAqXG4gKiBAcGFyYW0gYXJjaGl2ZUVudHJpZXNcbiAqIEBwYXJhbSBhcmNoaXZlTmFtZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGNvbXByZXNzID0gKFxuICBhcmNoaXZlRW50cmllczogQXN5bmNaaXBwYWJsZSxcbiAgYXJjaGl2ZU5hbWU6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPEx1ZmlKb2IsIEVycm9yPiA9PiB7XG4gIGNvbnN0IGx1ZmlGaWxlID0gbmV3IEx1ZmlGaWxlKFwiXCIpOyAvLyBEdW1teSBMdWZpIEZpbGUgdG8gYXZvaWQgdG8gY2hlY2sgZm9yIEx1ZmlGaWxlIGV4aXN0YW5jZSBpbiBvdGhlciBqb2JzXG4gIGNvbnN0IGpvYiA9IG5ldyBMdWZpSm9iKGx1ZmlGaWxlLCBXT1JLRVJfVFlQRS5DT01QUkVTUyk7XG5cbiAgcmV0dXJuIG9rQXN5bmMoXG4gICAgam9iXG4gICAgICAub25NZXNzYWdlKChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gRVZFTlQuQVJDSElWRV9DUkVBVEVEKSB7XG4gICAgICAgICAgam9iLmFyY2hpdmVGaWxlID0gbmV3IEZpbGUoW2V2ZW50LmRhdGEuYnVmZmVyXSwgYXJjaGl2ZU5hbWUsIHtcbiAgICAgICAgICAgIHR5cGU6IFwiYXBwbGljYXRpb24vemlwXCIsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBqb2IuY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgICAgfSkucmVxdWVzdE1lc3NhZ2Uoe1xuICAgICAgICBhcmdzOiB7XG4gICAgICAgICAgbHVmaUZpbGUsXG4gICAgICAgICAgYXJjaGl2ZTogeyBlbnRyaWVzOiBhcmNoaXZlRW50cmllcyB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICk7XG59O1xuXG4vKipcbiAqIERlY29tcHJlc3MgYSB6aXAgZmlsZVxuICpcbiAqIEBwYXJhbSB6aXBGaWxlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZGVjb21wcmVzcyA9IChcbiAgemlwRmlsZTogRmlsZSxcbik6IFJlc3VsdEFzeW5jPEx1ZmlKb2IsIEVycm9yPiA9PiB7XG4gIGNvbnN0IGx1ZmlGaWxlID0gbmV3IEx1ZmlGaWxlKFwiXCIpOyAvLyBEdW1teSBMdWZpIEZpbGUgdG8gYXZvaWQgdG8gY2hlY2sgZm9yIEx1ZmlGaWxlIGV4aXN0YW5jZSBpbiBvdGhlciBqb2JzXG4gIGNvbnN0IGpvYiA9IG5ldyBMdWZpSm9iKGx1ZmlGaWxlLCBXT1JLRVJfVFlQRS5ERUNPTVBSRVNTKTtcblxuICByZXR1cm4gb2tBc3luYyhcbiAgICBqb2JcbiAgICAgIC5vbk1lc3NhZ2UoKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSBFVkVOVC5BUkNISVZFX0RFQ09NUFJFU1NFRCkge1xuICAgICAgICAgIGpvYi5jb21wbGV0ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09IEVWRU5ULkFSQ0hJVkVfUkVUUklFVkVEX0ZJTEUpIHtcbiAgICAgICAgICBqb2IuYXJjaGl2ZUZpbGVzLnB1c2goXG4gICAgICAgICAgICBuZXcgRmlsZShbZXZlbnQuZGF0YS5maWxlLmJ1ZmZlcl0sIGV2ZW50LmRhdGEuZmlsZS5wYXRoKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLnJlcXVlc3RNZXNzYWdlKHtcbiAgICAgICAgYXJnczoge1xuICAgICAgICAgIGx1ZmlGaWxlLFxuICAgICAgICAgIGFyY2hpdmU6IHsgZmlsZTogemlwRmlsZSB9LFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBsb2dpY3Mgb2YgcGFzc3dvcmQgaGFzaGluZ1xuICpcbiAqIEBwYXJhbSBkb3dubG9hZFVybFxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBoYW5kbGVQYXNzd29yZEhhc2hpbmcgPSAoXG4gIGRvd25sb2FkVXJsOiBVUkwsXG4gIHBhc3N3b3JkPzogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8THVmaUZpbGUsIEVycm9yPiA9PiB7XG4gIGlmIChwYXNzd29yZCkge1xuICAgIHJldHVybiBmZXRjaFNlcnZlckNvbmZpZyhkb3dubG9hZFVybCkuYW5kVGhlbigoY29uZmlnKSA9PiB7XG4gICAgICAvLyBQYXNzd29yZCBoYXNoaW5nIG9uIGNsaWVudCBzaWRlIGlzIG9ubHkgc3VwcG9ydGVkIGJ5IHJlY2VudCB2ZXJzaW9ucyBvZiBMdWZpIFNlcnZlclxuICAgICAgaWYgKFxuICAgICAgICBjb25maWcudmVyc2lvbi50YWcgPiBcIjAuMDcuMFwiXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgYWxnbyA9IGlzU2VjdXJlQ29udGV4dCgpXG4gICAgICAgICAgPyBDcnlwdG9BbGdvcml0aG0uV2ViQ3J5cHRvXG4gICAgICAgICAgOiBDcnlwdG9BbGdvcml0aG0uU2pjbDtcblxuICAgICAgICByZXR1cm4gaGFzaFBhc3N3b3JkKHBhc3N3b3JkLCBhbGdvKS5hbmRUaGVuKChoYXNoZWRQYXNzd29yZCkgPT5cbiAgICAgICAgICBva0FzeW5jKEx1ZmlGaWxlLmZyb21Eb3dubG9hZFVybChkb3dubG9hZFVybCwgaGFzaGVkUGFzc3dvcmQpKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9rQXN5bmMoTHVmaUZpbGUuZnJvbURvd25sb2FkVXJsKGRvd25sb2FkVXJsLCBwYXNzd29yZCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBva0FzeW5jKEx1ZmlGaWxlLmZyb21Eb3dubG9hZFVybChkb3dubG9hZFVybCkpO1xuICB9XG59O1xuXG4vKipcbiAqIERvd25sb2FkIGEgZmlsZSBmcm9tIHRoZSBzZXJ2ZXJcbiAqXG4gKiBAcGFyYW0gZG93bmxvYWRVcmxcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRvd25sb2FkID0gKFxuICBkb3dubG9hZFVybDogVVJMLFxuICBwYXNzd29yZD86IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPEx1ZmlKb2IsIEVycm9yPiA9PlxuICBoYW5kbGVQYXNzd29yZEhhc2hpbmcoZG93bmxvYWRVcmwsIHBhc3N3b3JkKS5hbmRUaGVuKFxuICAgIChsdWZpRmlsZTogTHVmaUZpbGUpID0+IHtcbiAgICAgIGNvbnN0IGpvYiA9IG5ldyBMdWZpSm9iKGx1ZmlGaWxlLCBXT1JLRVJfVFlQRS5ET1dOTE9BRCk7XG5cbiAgICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNodW5rczogQmxvYltdID0gW107XG5cbiAgICAgICAgICByZXR1cm4gam9iXG4gICAgICAgICAgICAub25NZXNzYWdlKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICBoYW5kbGVTb2NrZXRSZXN1bHRzKHJlc29sdmUsIHJlamVjdCwgam9iLCBldmVudCk7XG5cbiAgICAgICAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09IEVWRU5ULkNIVU5LX0RPV05MT0FERUQpIHtcbiAgICAgICAgICAgICAgICBjaHVua3MucHVzaChldmVudC5kYXRhLmNodW5rLmJ1ZmZlcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoY2h1bmtzLmxlbmd0aCA+PSA1MCkge1xuICAgICAgICAgICAgICAgICAgam9iLmRvd25sb2FkZWRGaWxlID0gbmV3IEZpbGUoXG4gICAgICAgICAgICAgICAgICAgIGpvYi5kb3dubG9hZGVkRmlsZVxuICAgICAgICAgICAgICAgICAgICAgID8gW2pvYi5kb3dubG9hZGVkRmlsZS5zbGljZSgpXS5jb25jYXQoY2h1bmtzKVxuICAgICAgICAgICAgICAgICAgICAgIDogY2h1bmtzLFxuICAgICAgICAgICAgICAgICAgICBsdWZpRmlsZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogbHVmaUZpbGUudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgIGNodW5rcy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSBFVkVOVC5ET1dOTE9BRF9DT01QTEVURSkge1xuICAgICAgICAgICAgICAgIGpvYi5kb3dubG9hZGVkRmlsZSA9IG5ldyBGaWxlKFxuICAgICAgICAgICAgICAgICAgam9iLmRvd25sb2FkZWRGaWxlXG4gICAgICAgICAgICAgICAgICAgID8gW2pvYi5kb3dubG9hZGVkRmlsZS5zbGljZSgpXS5jb25jYXQoY2h1bmtzKVxuICAgICAgICAgICAgICAgICAgICA6IGNodW5rcyxcbiAgICAgICAgICAgICAgICAgIGx1ZmlGaWxlLm5hbWUsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGx1ZmlGaWxlLnR5cGUsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICBjaHVua3MubGVuZ3RoID0gMDtcblxuICAgICAgICAgICAgICAgIGpvYi5jb21wbGV0ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnJlcXVlc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgICAgIGx1ZmlGaWxlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pIGFzIFByb21pc2U8THVmaUpvYj4sXG4gICAgICAgIChlcnJvcikgPT4gbmV3IERvd25sb2FkRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICAgICApO1xuICAgIH0sXG4gICk7XG5cbi8qKlxuICogUmV0cmlldmUgaW5mb3JtYXRpb25zIGFib3V0IGEgZmlsZVxuICpcbiAqIEBwYXJhbSBkb3dubG9hZFVybFxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaW5mb3MgPSAoXG4gIGRvd25sb2FkVXJsOiBVUkwsXG4gIHBhc3N3b3JkPzogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8THVmaUpvYiwgSW5mb3NFcnJvciB8IENyeXB0b0Vycm9yPiA9PlxuICBoYW5kbGVQYXNzd29yZEhhc2hpbmcoZG93bmxvYWRVcmwsIHBhc3N3b3JkKS5hbmRUaGVuKChsdWZpRmlsZSkgPT5cbiAgICBva0FzeW5jKG5ldyBMdWZpSm9iKGx1ZmlGaWxlLCBXT1JLRVJfVFlQRS5JTkZPUykpXG4gIClcbiAgICAuYW5kVGhlbigoam9iOiBMdWZpSm9iKSA9PlxuICAgICAgUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICBqb2JcbiAgICAgICAgICAgIC5vbk1lc3NhZ2UoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSBFVkVOVC5JTkZPU19SRVRSSUVWRUQpIHtcbiAgICAgICAgICAgICAgICBqb2IuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGpvYik7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCkge1xuICAgICAgICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgICAgICAgIG5ldyBKb2JFcnJvcihcbiAgICAgICAgICAgICAgICAgICAgXCJBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byByZXRyaWV2ZSBpbmZvcm1hdGlvbnMgb2YgdGhlIGZpbGVcIixcbiAgICAgICAgICAgICAgICAgICAgeyBjYXVzZTogZXZlbnQuZGF0YS5lcnJvciB9LFxuICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnJlcXVlc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgYXJnczogeyBsdWZpRmlsZTogam9iLmx1ZmlGaWxlIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSkgYXMgUHJvbWlzZTxMdWZpSm9iPixcbiAgICAgICAgKGVycm9yKSA9PiBuZXcgSW5mb3NFcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICAgIClcbiAgICApO1xuXG4vKipcbiAqIFBhdXNlIGFuIHVwbG9hZC9kb3dubG9hZCBqb2JcbiAqIEBwYXJhbSBqb2JcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBwYXVzZSA9IChqb2I6IEx1ZmlKb2IpOiBSZXN1bHRBc3luYzxMdWZpSm9iLCBFcnJvcj4gPT4ge1xuICB0cnkge1xuICAgIGpvYi5zdGF0dXMgPSBKb2JTdGF0dXMuUEFVU0VEO1xuICAgIHJldHVybiBva0FzeW5jKFxuICAgICAgam9iLnJlcXVlc3RNZXNzYWdlKHtcbiAgICAgICAgYWN0aW9uOiBXT1JLRVJfQUNUSU9OLlBBVVNFLFxuICAgICAgICBhcmdzOiB7IGx1ZmlGaWxlOiBqb2IubHVmaUZpbGUgfSxcbiAgICAgIH0pLFxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IEpvYlBhdXNlRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmUgYSBmaWxlIHVwbG9hZGVkIG9uIHRoZSBzZXJ2ZXJcbiAqIEBwYXJhbSByZW1vdmVVcmxcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IChcbiAgcmVtb3ZlVXJsOiBVUkwsXG4gIHBhc3N3b3JkPzogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8THVmaUpvYiwgRXJyb3I+ID0+IHtcbiAgY29uc3QgbHVmaUZpbGUgPSBMdWZpRmlsZS5mcm9tUmVtb3ZlVXJsKHJlbW92ZVVybCwgcGFzc3dvcmQpO1xuICBjb25zdCBqb2IgPSBuZXcgTHVmaUpvYihsdWZpRmlsZSwgV09SS0VSX1RZUEUuUkVNT1ZFKTtcblxuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgam9iXG4gICAgICAgIC5vbk1lc3NhZ2UoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09IEVWRU5ULkZJTEVfUkVNT1ZFRCkge1xuICAgICAgICAgICAgam9iLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICByZXNvbHZlKGpvYik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGV2ZW50LmRhdGEuZXZlbnQgPT09IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQpIHtcbiAgICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgICAgbmV3IEpvYkVycm9yKFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gcmVtb3ZlIGEgZmlsZVwiLCB7XG4gICAgICAgICAgICAgICAgY2F1c2U6IGV2ZW50LmRhdGEuZXJyb3IsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5yZXF1ZXN0TWVzc2FnZSh7IGFyZ3M6IHsgbHVmaUZpbGUgfSB9KTtcbiAgICB9KSxcbiAgICAoZXJyb3IpID0+IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgKTtcbn07XG5cbi8qKlxuICogUmVzdW1lIGFuIHVwbG9hZC9kb3dubG9hZCBqb2JcbiAqIEBwYXJhbSBqb2JcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCByZXN1bWUgPSAoam9iOiBMdWZpSm9iKTogUmVzdWx0QXN5bmM8THVmaUpvYiwgRXJyb3I+ID0+IHtcbiAgdHJ5IHtcbiAgICBqb2Iuc3RhdHVzID0gSm9iU3RhdHVzLk9OR09JTkc7XG4gICAgcmV0dXJuIG9rQXN5bmMoXG4gICAgICBqb2IucmVxdWVzdE1lc3NhZ2Uoe1xuICAgICAgICBhY3Rpb246IFdPUktFUl9BQ1RJT04uUkVTVU1FLFxuICAgICAgICBhcmdzOiB7IGx1ZmlGaWxlOiBqb2IubHVmaUZpbGUgfSxcbiAgICAgIH0pLFxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IEpvYlJlc3VtZUVycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogU2xpY2UgYSBmaWxlIGluIG11bHRpcGxlIGNodW5rc1xuICpcbiAqIEBwYXJhbSBjaHVua0xlbmd0aFxuICogQHJldHVybnNcbiAqL1xuY29uc3Qgc2xpY2VBbmRVcGxvYWQgPSAoXG4gIGpvYjogTHVmaUpvYixcbiAgZmlsZTogRmlsZSxcbiAgYWxnbzogQ3J5cHRvQWxnb3JpdGhtLFxuICBjaHVua0xlbmd0aDogbnVtYmVyID0gQ0hVTktfTEVOR1RILFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgRmlsZVNsaWNpbmdFcnJvcj4gPT4ge1xuICBldmVudHMuZW1pdChFVkVOVC5TTElDRV9TVEFSVEVELCBmaWxlc1tqb2IubHVmaUZpbGUua2V5cy5jbGllbnRdKTtcbiAgY29uc3QgdG90YWxDaHVua3MgPSBNYXRoLmNlaWwoZmlsZS5zaXplIC8gY2h1bmtMZW5ndGgpIHx8IDE7XG4gIGNvbnN0IGNvbmN1cnJlbmN5ID0gbmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgfHwgMTtcblxuICBmaWxlc1tqb2IubHVmaUZpbGUua2V5cy5jbGllbnRdLnRvdGFsQ2h1bmtzID0gdG90YWxDaHVua3M7XG5cbiAgY29uc3Qgc2VxdWVudGlhbExvb3AgPSBhc3luYyAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3RhbENodW5rczsgaSsrKSB7XG4gICAgICBjb25zdCBzdGFydCA9IGkgKiBjaHVua0xlbmd0aDtcbiAgICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKHN0YXJ0ICsgY2h1bmtMZW5ndGgsIGZpbGUuc2l6ZSk7XG4gICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBmaWxlLnNsaWNlKHN0YXJ0LCBlbmQsIGZpbGUudHlwZSkuYXJyYXlCdWZmZXIoKTtcblxuICAgICAgam9iLnJlcXVlc3RNZXNzYWdlKFxuICAgICAgICB7XG4gICAgICAgICAgYXJnczoge1xuICAgICAgICAgICAgY2h1bms6IHtcbiAgICAgICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsdWZpRmlsZTogZmlsZXNbam9iLmx1ZmlGaWxlLmtleXMuY2xpZW50XSxcbiAgICAgICAgICAgIGFsZ28sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgW2J1ZmZlcl0sXG4gICAgICApO1xuXG4gICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICBjb25zdCB3YWl0VW50aWxVcGxvYWRTdGFydGVkID0gKCkgPT5cbiAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgICAgam9iLmV2ZW50cy5vbmNlKEVWRU5ULlVQTE9BRF9TVEFSVEVELCAoKSA9PiB7XG4gICAgICAgICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGF3YWl0IHdhaXRVbnRpbFVwbG9hZFN0YXJ0ZWQoKTtcbiAgICAgIH0gZWxzZSBpZiAoaSAlIGNvbmN1cnJlbmN5ID09PSAwKSB7XG4gICAgICAgIGNvbnN0IHdhaXRGb3JRdWV1ZUF2YWlsYWJpbGl0eSA9ICgpID0+XG4gICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgICAgICAgIGpvYi5ldmVudHMub25jZShFVkVOVC5DSFVOS19VUExPQURFRCwgKCkgPT4ge1xuICAgICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB3YWl0Rm9yUXVldWVBdmFpbGFiaWxpdHkoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgc2VxdWVudGlhbExvb3AoKTtcblxuICByZXR1cm4gb2tBc3luYyh1bmRlZmluZWQpO1xufTtcblxuLyoqXG4gKiBTdGFydCB0aGUgdXBsb2FkIG9uIHRoZSBzZXJ2ZXJcbiAqIEBwYXJhbSBzZXJ2ZXJVcmxcbiAqIEBwYXJhbSBmaWxlXG4gKiBAcGFyYW0gZGVsYXlcbiAqIEBwYXJhbSBkZWxBdEZpcnN0Vmlld1xuICogQHBhcmFtIHppcHBlZFxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcGFyYW0gYWxnb1xuICogQHJldHVybnNcbiAqL1xuY29uc3Qgc3RhcnRVcGxvYWQgPSAoXG4gIHNlcnZlclVybDogVVJMLFxuICBmaWxlOiBGaWxlLFxuICBkZWxheTogbnVtYmVyLFxuICBkZWxBdEZpcnN0VmlldzogYm9vbGVhbixcbiAgemlwcGVkOiBib29sZWFuLFxuICBwYXNzd29yZDogc3RyaW5nLFxuICBhbGdvOiBDcnlwdG9BbGdvcml0aG0sXG4pID0+XG4gIGNyeXB0by5nZW5lcmF0ZUtleShcbiAgICBhbGdvLFxuICApLmFuZFRoZW4oXG4gICAgKGNsaWVudEtleTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAocGFzc3dvcmQpIHtcbiAgICAgICAgcmV0dXJuIGhhc2hQYXNzd29yZChwYXNzd29yZCwgYWxnbykuYW5kVGhlbigoaGFzaGVkUGFzc3dvcmQpID0+XG4gICAgICAgICAgb2tBc3luYyh7IHBhc3N3b3JkOiBoYXNoZWRQYXNzd29yZCwgY2xpZW50S2V5IH0pXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2tBc3luYyh7IHBhc3N3b3JkLCBjbGllbnRLZXkgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgKS5hbmRUaGVuKCh7IHBhc3N3b3JkLCBjbGllbnRLZXkgfSkgPT4ge1xuICAgIGZpbGVzW2NsaWVudEtleV0gPSBuZXcgTHVmaUZpbGUoc2VydmVyVXJsLnRvU3RyaW5nKCksIHtcbiAgICAgIGRlbGF5LFxuICAgICAgZGVsQXRGaXJzdFZpZXcsXG4gICAgICB6aXBwZWQsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIG5hbWU6IGZpbGUubmFtZS5zcGxpdChcIi9cIikucG9wKCksIC8vIFJlbW92ZSBwYXRoIGZyb20gZmlsZW5hbWVcbiAgICAgIHNpemU6IGZpbGUuc2l6ZSxcbiAgICAgIHR5cGU6IGZpbGUudHlwZSxcbiAgICAgIGtleXM6IHsgY2xpZW50OiBjbGllbnRLZXksIHNlcnZlcjogXCJcIiB9LFxuICAgIH0pO1xuXG4gICAgY29uc3Qgam9iID0gbmV3IEx1ZmlKb2IoZmlsZXNbY2xpZW50S2V5XSwgV09SS0VSX1RZUEUuVVBMT0FEKTtcblxuICAgIGZpbGVzW2NsaWVudEtleV0udXBsb2FkU3RhdHVzID0gVVBMT0FEX1NUQVRVUy5RVUVVRUQ7XG5cbiAgICByZXR1cm4gc2xpY2VBbmRVcGxvYWQoam9iLCBmaWxlLCBhbGdvKS5hbmRUaGVuKCgpID0+XG4gICAgICBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIGpvYi5vbk1lc3NhZ2UoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICBoYW5kbGVTb2NrZXRSZXN1bHRzKHJlc29sdmUsIHJlamVjdCwgam9iLCBldmVudCk7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQuZGF0YS5ldmVudCkge1xuICAgICAgICAgICAgICBjYXNlIEVWRU5ULlVQTE9BRF9DT01QTEVURTpcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBqb2IuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgIGpvYi5sdWZpRmlsZS51cGxvYWRTdGF0dXMgPSBVUExPQURfU1RBVFVTLkNPTVBMRVRFO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkgYXMgUHJvbWlzZTxMdWZpSm9iPixcbiAgICAgICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICApXG4gICAgKTtcbiAgfSk7XG5cbi8qKlxuICogVXBsb2FkIGEgZmlsZSB0byB0aGUgc2VydmVyXG4gKlxuICogQHBhcmFtIHNlcnZlclVybFxuICogQHBhcmFtIGZpbGVzVG9VcGxvYWRcbiAqIEBwYXJhbSBkZWxheVxuICogQHBhcmFtIGRlbEF0Rmlyc3RWaWV3XG4gKiBAcGFyYW0gemlwcGVkXG4gKiBAcGFyYW0gemlwTmFtZVxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcGFyYW0gYWxnb1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHVwbG9hZCA9IChcbiAgc2VydmVyVXJsOiBVUkwsXG4gIGZpbGVzVG9VcGxvYWQ6IEZpbGVbXSxcbiAgZGVsYXk6IG51bWJlciA9IDAsXG4gIGRlbEF0Rmlyc3RWaWV3OiBib29sZWFuID0gZmFsc2UsXG4gIHppcHBlZDogYm9vbGVhbiA9IGZhbHNlLFxuICB6aXBOYW1lOiBzdHJpbmcgPSBcImRvY3VtZW50cy56aXBcIixcbiAgcGFzc3dvcmQ6IHN0cmluZyA9IFwiXCIsXG4gIGFsZ286IENyeXB0b0FsZ29yaXRobSA9IENyeXB0b0FsZ29yaXRobS5XZWJDcnlwdG8sXG4pOiBSZXN1bHRBc3luYzxMdWZpSm9iW10sIEVycm9yPiA9PiB7XG4gIGNvbnN0IG9wZXJhdGlvbnM6IFJlc3VsdEFzeW5jPEx1ZmlKb2IsIEVycm9yPltdID0gW107XG5cbiAgaWYgKCF6aXBwZWQpIHtcbiAgICBmaWxlc1RvVXBsb2FkLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICAgIG9wZXJhdGlvbnMucHVzaChzdGFydFVwbG9hZChcbiAgICAgICAgc2VydmVyVXJsLFxuICAgICAgICBmaWxlLFxuICAgICAgICBkZWxheSxcbiAgICAgICAgZGVsQXRGaXJzdFZpZXcsXG4gICAgICAgIHppcHBlZCxcbiAgICAgICAgcGFzc3dvcmQsXG4gICAgICAgIGFsZ28sXG4gICAgICApKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBJZiB3ZSBqdXN0IHdhbnQgdG8gdXBsb2FkIGEgc2luZ2xlIHppcCBmaWxlIChwcm9iYWJseSBjcmVhdGVkIGJ5IG1hbnVhbGx5IHVzaW5nIGNvbXByZXNzKCkpXG4gICAgaWYgKFxuICAgICAgZmlsZXNUb1VwbG9hZC5sZW5ndGggPT09IDEgJiYgZmlsZXNUb1VwbG9hZFswXS50eXBlID09PSBcImFwcGxpY2F0aW9uL3ppcFwiXG4gICAgKSB7XG4gICAgICBvcGVyYXRpb25zLnB1c2goXG4gICAgICAgIHN0YXJ0VXBsb2FkKFxuICAgICAgICAgIHNlcnZlclVybCxcbiAgICAgICAgICBmaWxlc1RvVXBsb2FkWzBdLFxuICAgICAgICAgIGRlbGF5LFxuICAgICAgICAgIGRlbEF0Rmlyc3RWaWV3LFxuICAgICAgICAgIHppcHBlZCxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgICBhbGdvLFxuICAgICAgICApLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3BlcmF0aW9ucy5wdXNoKFxuICAgICAgICBhZGRGaWxlc1RvQXJjaGl2ZShmaWxlc1RvVXBsb2FkKVxuICAgICAgICAgIC5hbmRUaGVuKChhcmNoaXZlRW50cmllcykgPT5cbiAgICAgICAgICAgIGNvbXByZXNzKFxuICAgICAgICAgICAgICBhcmNoaXZlRW50cmllcyxcbiAgICAgICAgICAgICAgemlwTmFtZSxcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmFuZFRoZW4oKGpvYikgPT4gam9iLndhaXRGb3JDb21wbGV0aW9uKCkpXG4gICAgICAgICAgICAgIC5hbmRUaGVuKChqb2IpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoam9iLmFyY2hpdmVGaWxlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRVcGxvYWQoXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlclVybCxcbiAgICAgICAgICAgICAgICAgICAgam9iLmFyY2hpdmVGaWxlLFxuICAgICAgICAgICAgICAgICAgICBkZWxheSxcbiAgICAgICAgICAgICAgICAgICAgZGVsQXRGaXJzdFZpZXcsXG4gICAgICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkLFxuICAgICAgICAgICAgICAgICAgICBhbGdvLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGVyckFzeW5jKG5ldyBKb2JFcnJvcihcImFyY2hpdmVGaWxlIG11c3QgYmUgZGVmaW5lZFwiKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBSZXN1bHRBc3luYy5jb21iaW5lKG9wZXJhdGlvbnMpLm9yRWxzZSgoZXJyb3IpID0+XG4gICAgZXJyQXN5bmMobmV3IFVwbG9hZEVycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZXJyb3IgfSkpXG4gICk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBzb2NrZXQgb3BlbmluZyBvcGVyYXRpb24gaW4gYSBwcm9taXNlXG4gKlxuICogQHBhcmFtIHJlc29sdmVcbiAqIEBwYXJhbSByZWplY3RcbiAqIEBwYXJhbSBqb2JcbiAqIEBwYXJhbSBldmVudFxuICovXG5jb25zdCBoYW5kbGVTb2NrZXRSZXN1bHRzID0gKFxuICByZXNvbHZlOiB7XG4gICAgKHZhbHVlOiBMdWZpSm9iIHwgUHJvbWlzZUxpa2U8THVmaUpvYj4pOiB2b2lkO1xuICAgIChhcmcwOiBMdWZpSm9iKTogdm9pZDtcbiAgfSxcbiAgcmVqZWN0OiB7IChyZWFzb24/OiB1bmtub3duKTogdm9pZDsgKGFyZzA6IHVua25vd24pOiB2b2lkIH0sXG4gIGpvYjogTHVmaUpvYixcbiAgZXZlbnQ6IE1lc3NhZ2VFdmVudCxcbikgPT4ge1xuICBpZiAoZXZlbnQuZGF0YS5ldmVudCA9PT0gRVZFTlQuU09DS0VUX09QRU5FRCkge1xuICAgIHJlc29sdmUoam9iKTtcbiAgfVxuXG4gIGlmIChldmVudC5kYXRhLmV2ZW50ID09PSBFVkVOVC5PUEVSQVRJT05fRkFJTEVEKSB7XG4gICAgcmVqZWN0KFxuICAgICAgbmV3IEpvYkVycm9yKFwiVGhlIGpvYiByZXR1cm5lZCBhbiBlcnJvclwiLCB7IGNhdXNlOiBldmVudC5kYXRhLmVycm9yIH0pLFxuICAgICk7XG4gIH1cbn07XG5cbmNvbnN0IGdldEZpbGVzUXVldWVkID0gKCk6IEx1ZmlGaWxlW10gPT5cbiAgT2JqZWN0LnZhbHVlcyhmaWxlcykuZmlsdGVyKChmaWxlKSA9PlxuICAgIGZpbGUudXBsb2FkU3RhdHVzID09PSBVUExPQURfU1RBVFVTLlFVRVVFRFxuICApO1xuXG5leHBvcnQgY29uc3QgZ2V0RmlsZUluZGV4SW5RdWV1ZSA9IChjbGllbnRLZXk6IHN0cmluZyk6IG51bWJlciA9PlxuICBPYmplY3Qua2V5cyhnZXRGaWxlc1F1ZXVlZCgpKS5pbmRleE9mKGNsaWVudEtleSk7XG4iLCAiY29uc3QgZGVmYXVsdEVycm9yQ29uZmlnID0ge1xyXG4gICAgd2l0aFN0YWNrVHJhY2U6IGZhbHNlLFxyXG59O1xyXG4vLyBDdXN0b20gZXJyb3Igb2JqZWN0XHJcbi8vIENvbnRleHQgLyBkaXNjdXNzaW9uOiBodHRwczovL2dpdGh1Yi5jb20vc3VwZXJtYWNyby9uZXZlcnRocm93L3B1bGwvMjE1XHJcbmNvbnN0IGNyZWF0ZU5ldmVyVGhyb3dFcnJvciA9IChtZXNzYWdlLCByZXN1bHQsIGNvbmZpZyA9IGRlZmF1bHRFcnJvckNvbmZpZykgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHJlc3VsdC5pc09rKClcclxuICAgICAgICA/IHsgdHlwZTogJ09rJywgdmFsdWU6IHJlc3VsdC52YWx1ZSB9XHJcbiAgICAgICAgOiB7IHR5cGU6ICdFcnInLCB2YWx1ZTogcmVzdWx0LmVycm9yIH07XHJcbiAgICBjb25zdCBtYXliZVN0YWNrID0gY29uZmlnLndpdGhTdGFja1RyYWNlID8gbmV3IEVycm9yKCkuc3RhY2sgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBzdGFjazogbWF5YmVTdGFjayxcclxuICAgIH07XHJcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG5cclxuZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG50eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcblxuY2xhc3MgUmVzdWx0QXN5bmMge1xyXG4gICAgY29uc3RydWN0b3IocmVzKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHJlcztcclxuICAgIH1cclxuICAgIHN0YXRpYyBmcm9tU2FmZVByb21pc2UocHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb21pc2UgPSBwcm9taXNlLnRoZW4oKHZhbHVlKSA9PiBuZXcgT2sodmFsdWUpKTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG5ld1Byb21pc2UpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb21Qcm9taXNlKHByb21pc2UsIGVycm9yRm4pIHtcclxuICAgICAgICBjb25zdCBuZXdQcm9taXNlID0gcHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IG5ldyBPayh2YWx1ZSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gbmV3IEVycihlcnJvckZuKGUpKSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuZXdQcm9taXNlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBzdGF0aWMgZnJvbVRocm93YWJsZShmbiwgZXJyb3JGbikge1xyXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKCgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZm4oLi4uYXJncykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoZXJyb3JGbiA/IGVycm9yRm4oZXJyb3IpIDogZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSkoKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21iaW5lKGFzeW5jUmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0QXN5bmNMaXN0KGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29tYmluZVdpdGhBbGxFcnJvcnMoYXN5bmNSZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzKGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZihyZXMudmFsdWUpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgYW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3UmVzID0geWllbGQgZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3UmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKG5ld1Jlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRlZSBkb2VzIG5vdCBjYXJlIGFib3V0IHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgbWFwRXJyKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNPaygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoeWllbGQgZihyZXMuZXJyb3IpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWUgaW5zdGFuY2VvZiBSZXN1bHRBc3luYyA/IG5ld1ZhbHVlLl9wcm9taXNlIDogbmV3VmFsdWU7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIG9yRWxzZShmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBtYXRjaChvaywgX2Vycikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gcmVzLm1hdGNoKG9rLCBfZXJyKSk7XHJcbiAgICB9XHJcbiAgICB1bndyYXBPcih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiByZXMudW53cmFwT3IodCkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCB3aWxsIGJlIHJlbW92ZWQgaW4gOS4wLjAuXHJcbiAgICAgKlxyXG4gICAgICogWW91IGNhbiB1c2UgYHNhZmVUcnlgIHdpdGhvdXQgdGhpcyBtZXRob2QuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYGBgdHlwZXNjcmlwdFxyXG4gICAgICogc2FmZVRyeShhc3luYyBmdW5jdGlvbiogKCkge1xyXG4gICAgICogICBjb25zdCBva1ZhbHVlID0geWllbGQqIHlvdXJSZXN1bHRcclxuICAgICAqIH0pXHJcbiAgICAgKiBgYGBcclxuICAgICAqIEVtdWxhdGVzIFJ1c3QncyBgP2Agb3BlcmF0b3IgaW4gYHNhZmVUcnlgJ3MgYm9keS4gU2VlIGFsc28gYHNhZmVUcnlgLlxyXG4gICAgICovXHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24qIHNhZmVVbndyYXBfMSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9fYXdhaXQoeWllbGQgX19hd2FpdCh5aWVsZCogX19hc3luY0RlbGVnYXRvcihfX2FzeW5jVmFsdWVzKHlpZWxkIF9fYXdhaXQodGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHJlcy5zYWZlVW53cmFwKCkpKSkpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlcyBSZXN1bHRBc3luYyBpbXBsZW1lbnQgUHJvbWlzZUxpa2U8UmVzdWx0PlxyXG4gICAgdGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpIHtcclxuICAgICAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBfYSgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgX19hd2FpdCh0aGlzLl9wcm9taXNlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICAgICAgICAgIHlpZWxkIHlpZWxkIF9fYXdhaXQoZXJyQXN5bmMocmVzdWx0LmVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCBfX2F3YWl0KHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuY29uc3Qgb2tBc3luYyA9ICh2YWx1ZSkgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgT2sodmFsdWUpKSk7XHJcbmNvbnN0IGVyckFzeW5jID0gKGVycikgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgRXJyKGVycikpKTtcclxuY29uc3QgZnJvbVByb21pc2UgPSBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZTtcclxuY29uc3QgZnJvbVNhZmVQcm9taXNlID0gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlO1xyXG5jb25zdCBmcm9tQXN5bmNUaHJvd2FibGUgPSBSZXN1bHRBc3luYy5mcm9tVGhyb3dhYmxlO1xuXG4vKipcclxuICogU2hvcnQgY2lyY3VpdHMgb24gdGhlIEZJUlNUIEVyciB2YWx1ZSB0aGF0IHdlIGZpbmRcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRMaXN0ID0gKHJlc3VsdExpc3QpID0+IHtcclxuICAgIGxldCBhY2MgPSBvayhbXSk7XHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgIGFjYyA9IGVycihyZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFjYy5tYXAoKGxpc3QpID0+IGxpc3QucHVzaChyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG59O1xyXG4vKiBUaGlzIGlzIHRoZSB0eXBlc2FmZSB2ZXJzaW9uIG9mIFByb21pc2UuYWxsXHJcbiAqXHJcbiAqIFRha2VzIGEgbGlzdCBvZiBSZXN1bHRBc3luYzxULCBFPiBhbmQgc3VjY2VzcyBpZiBhbGwgaW5uZXIgcmVzdWx0cyBhcmUgT2sgdmFsdWVzXHJcbiAqIG9yIGZhaWxzIGlmIG9uZSAob3IgbW9yZSkgb2YgdGhlIGlubmVyIHJlc3VsdHMgYXJlIEVyciB2YWx1ZXNcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3QgPSAoYXN5bmNSZXN1bHRMaXN0KSA9PiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoUHJvbWlzZS5hbGwoYXN5bmNSZXN1bHRMaXN0KSkuYW5kVGhlbihjb21iaW5lUmVzdWx0TGlzdCk7XHJcbi8qKlxyXG4gKiBHaXZlIGEgbGlzdCBvZiBhbGwgdGhlIGVycm9ycyB3ZSBmaW5kXHJcbiAqL1xyXG5jb25zdCBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMgPSAocmVzdWx0TGlzdCkgPT4ge1xyXG4gICAgbGV0IGFjYyA9IG9rKFtdKTtcclxuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdExpc3QpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgYWNjLmVycm9yLnB1c2gocmVzdWx0LmVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzT2soKSkge1xyXG4gICAgICAgICAgICBhY2MgPSBlcnIoW3Jlc3VsdC5lcnJvcl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXN1bHQuaXNPaygpICYmIGFjYy5pc09rKCkpIHtcclxuICAgICAgICAgICAgYWNjLnZhbHVlLnB1c2gocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZG8gbm90aGluZyB3aGVuIHJlc3VsdC5pc09rKCkgJiYgYWNjLmlzRXJyKClcclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbn07XHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzID0gKGFzeW5jUmVzdWx0TGlzdCkgPT4gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlKFByb21pc2UuYWxsKGFzeW5jUmVzdWx0TGlzdCkpLmFuZFRoZW4oY29tYmluZVJlc3VsdExpc3RXaXRoQWxsRXJyb3JzKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcclxudmFyIFJlc3VsdDtcclxuKGZ1bmN0aW9uIChSZXN1bHQpIHtcclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgYSBmdW5jdGlvbiB3aXRoIGEgdHJ5IGNhdGNoLCBjcmVhdGluZyBhIG5ldyBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lXHJcbiAgICAgKiBhcmd1bWVudHMgYnV0IHJldHVybmluZyBgT2tgIGlmIHN1Y2Nlc3NmdWwsIGBFcnJgIGlmIHRoZSBmdW5jdGlvbiB0aHJvd3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24gdG8gd3JhcCB3aXRoIG9rIG9uIHN1Y2Nlc3Mgb3IgZXJyIG9uIGZhaWx1cmVcclxuICAgICAqIEBwYXJhbSBlcnJvckZuIHdoZW4gYW4gZXJyb3IgaXMgdGhyb3duLCB0aGlzIHdpbGwgd3JhcCB0aGUgZXJyb3IgcmVzdWx0IGlmIHByb3ZpZGVkXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBmdW5jdGlvbiBmcm9tVGhyb3dhYmxlKGZuLCBlcnJvckZuKSB7XHJcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbiguLi5hcmdzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvayhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyKGVycm9yRm4gPyBlcnJvckZuKGUpIDogZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmZyb21UaHJvd2FibGUgPSBmcm9tVGhyb3dhYmxlO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZShyZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRMaXN0KHJlc3VsdExpc3QpO1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmNvbWJpbmUgPSBjb21iaW5lO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZVdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuY29tYmluZVdpdGhBbGxFcnJvcnMgPSBjb21iaW5lV2l0aEFsbEVycm9ycztcclxufSkoUmVzdWx0IHx8IChSZXN1bHQgPSB7fSkpO1xyXG5jb25zdCBvayA9ICh2YWx1ZSkgPT4gbmV3IE9rKHZhbHVlKTtcclxuZnVuY3Rpb24gZXJyKGVycikge1xyXG4gICAgcmV0dXJuIG5ldyBFcnIoZXJyKTtcclxufVxyXG5mdW5jdGlvbiBzYWZlVHJ5KGJvZHkpIHtcclxuICAgIGNvbnN0IG4gPSBib2R5KCkubmV4dCgpO1xyXG4gICAgaWYgKG4gaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuLnRoZW4oKHIpID0+IHIudmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuLnZhbHVlO1xyXG59XHJcbmNsYXNzIE9rIHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaXNPaygpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlzRXJyKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc09rKCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBvayhmKHRoaXMudmFsdWUpKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcEVycihfZikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaGVuKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKS5tYXAoKF92YWx1ZSkgPT4gdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGYodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRlZSBkb2Vzbid0IGNhcmUgYWJvdXQgdGhlIGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBvckVsc2UoX2YpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhc3luY0FuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFzeW5jQW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSkubWFwKCgpID0+IHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgYXN5bmNNYXAoZikge1xyXG4gICAgICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoZih0aGlzLnZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICB1bndyYXBPcihfdikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWF0Y2gob2ssIF9lcnIpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS15aWVsZCAqL1xyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKF8pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXBFcnIoY29uZmlnKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yKCdDYWxsZWQgYF91bnNhZmVVbndyYXBFcnJgIG9uIGFuIE9rJywgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcywgcmVxdWlyZS15aWVsZFxyXG4gICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEVyciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgIH1cclxuICAgIGlzT2soKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNFcnIoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzT2soKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBtYXBFcnIoZikge1xyXG4gICAgICAgIHJldHVybiBlcnIoZih0aGlzLmVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUaHJvdWdoKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgb3JFbHNlKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jQW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFzeW5jQW5kVGhyb3VnaChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jTWFwKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgdW53cmFwT3Iodikge1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG4gICAgbWF0Y2goX29rLCBlcnIpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2FmZVVud3JhcCgpIHtcclxuICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuZXJyb3I7XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB5aWVsZCBlcnIoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgdGhpcyBnZW5lcmF0b3Igb3V0IG9mIGBzYWZlVHJ5YCcpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKGNvbmZpZykge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZU5ldmVyVGhyb3dFcnJvcignQ2FsbGVkIGBfdW5zYWZlVW53cmFwYCBvbiBhbiBFcnInLCB0aGlzLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcEVycihfKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3I7XHJcbiAgICB9XHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgeWllbGQgc2VsZjtcclxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxufVxyXG5jb25zdCBmcm9tVGhyb3dhYmxlID0gUmVzdWx0LmZyb21UaHJvd2FibGU7XHJcbi8vI2VuZHJlZ2lvblxuXG5leHBvcnQgeyBFcnIsIE9rLCBSZXN1bHQsIFJlc3VsdEFzeW5jLCBlcnIsIGVyckFzeW5jLCBmcm9tQXN5bmNUaHJvd2FibGUsIGZyb21Qcm9taXNlLCBmcm9tU2FmZVByb21pc2UsIGZyb21UaHJvd2FibGUsIG9rLCBva0FzeW5jLCBzYWZlVHJ5IH07XG4iLCAiaW1wb3J0IHsgVVBMT0FEX1NUQVRVUyB9IGZyb20gXCJ+L2VudW0vZmlsZS1zdGF0dXMudHNcIjtcblxuZXhwb3J0IGNsYXNzIEx1ZmlGaWxlIHtcbiAgcHVibGljIGFjdGlvblRva2VuOiBzdHJpbmcgPSBcIlwiO1xuICBwdWJsaWMgY2h1bmtzUmVhZHk6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBjcmVhdGVkQXQ6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBkZWxheTogbnVtYmVyID0gMDtcbiAgcHVibGljIGRlbEF0Rmlyc3RWaWV3OiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBrZXlzOiB7IGNsaWVudDogc3RyaW5nOyBzZXJ2ZXI6IHN0cmluZyB9ID0geyBjbGllbnQ6IFwiXCIsIHNlcnZlcjogXCJcIiB9O1xuICBwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJcIjtcbiAgcHVibGljIHBhc3N3b3JkID0gXCJcIjtcbiAgcHVibGljIHF1ZXVlSW5kZXg6IG51bWJlciA9IDA7XG4gIHB1YmxpYyBzZXJ2ZXJVcmw6IHN0cmluZztcbiAgcHVibGljIHNpemU6IG51bWJlciA9IDA7XG4gIHB1YmxpYyB1cGxvYWRTdGF0dXM6IFVQTE9BRF9TVEFUVVMgPSBVUExPQURfU1RBVFVTLklOSVRJQUxJWkVEO1xuICBwdWJsaWMgdG90YWxDaHVua3M6IG51bWJlciA9IDA7XG4gIHB1YmxpYyB0eXBlOiBzdHJpbmcgPSBcIlwiO1xuICBwdWJsaWMgemlwcGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Ioc2VydmVyVXJsOiBzdHJpbmcsIHByb3BlcnRpZXM/OiBQYXJ0aWFsPEx1ZmlGaWxlPikge1xuICAgIHRoaXMuc2VydmVyVXJsID0gc2VydmVyVXJsO1xuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIHB1YmxpYyBkb3dubG9hZFVybCgpOiBVUkwge1xuICAgIGNvbnN0IHNlcnZlclVybCA9IG5ldyBVUkwodGhpcy5zZXJ2ZXJVcmwpO1xuXG4gICAgcmV0dXJuIG5ldyBVUkwoXG4gICAgICBgJHtcbiAgICAgICAgc2VydmVyVXJsLm9yaWdpbiArIHNlcnZlclVybC5wYXRobmFtZVxuICAgICAgfXIvJHt0aGlzLmtleXMuc2VydmVyfSMke3RoaXMua2V5cy5jbGllbnR9YCxcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHJlbW92ZVVybCgpOiBVUkwge1xuICAgIGNvbnN0IHNlcnZlclVybCA9IG5ldyBVUkwodGhpcy5zZXJ2ZXJVcmwpO1xuXG4gICAgcmV0dXJuIG5ldyBVUkwoXG4gICAgICBgJHtcbiAgICAgICAgc2VydmVyVXJsLm9yaWdpbiArIHNlcnZlclVybC5wYXRobmFtZVxuICAgICAgfWQvJHt0aGlzLmtleXMuc2VydmVyfS8ke3RoaXMuYWN0aW9uVG9rZW59YCxcbiAgICApO1xuICB9XG5cbiAgc3RhdGljIGZyb21Eb3dubG9hZFVybChkb3dubG9hZFVybDogVVJMLCBwYXNzd29yZCA9IFwiXCIpOiBMdWZpRmlsZSB7XG4gICAgY29uc3QgcGF0aGluZm9zID0gZG93bmxvYWRVcmwucGF0aG5hbWUuc3BsaXQoXCJyL1wiKTtcblxuICAgIGNvbnN0IGtleXMgPSB7XG4gICAgICBjbGllbnQ6IGRvd25sb2FkVXJsLmhhc2guc2xpY2UoMSkuc3BsaXQoXCImXCIpWzBdLFxuICAgICAgc2VydmVyOiBwYXRoaW5mb3NbMV0sXG4gICAgfTsgLy8gc3BsaXQoXCImXCIpIGlzIGhlcmUgdG8gcmVtb3ZlIHBhcmFtZXRlcnMgbGlrZSAmdXRtX3NvdXJjZSBmcm9tIFVSTCwgc29tZXRpbWVzIGFkZGVkIGF1dG9tYXRpY2FsbHkgYnkgdGhpcmQgcGFydGllcy5cblxuICAgIHJldHVybiBuZXcgTHVmaUZpbGUoZG93bmxvYWRVcmwub3JpZ2luICsgcGF0aGluZm9zWzBdLCB7XG4gICAgICBrZXlzLFxuICAgICAgcGFzc3dvcmQsXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZnJvbVJlbW92ZVVybChyZW1vdmVVcmw6IFVSTCwgcGFzc3dvcmQgPSBcIlwiKTogTHVmaUZpbGUge1xuICAgIGNvbnN0IHBhdGhJbmZvcyA9IHJlbW92ZVVybC5wYXRobmFtZS5zcGxpdChcImQvXCIpO1xuICAgIGNvbnN0IHNwbGl0dGVkUGF0aCA9IHBhdGhJbmZvc1sxXS5zcGxpdChcIi9cIik7XG5cbiAgICBjb25zdCBrZXlzID0geyBjbGllbnQ6IFwiXCIsIHNlcnZlcjogc3BsaXR0ZWRQYXRoWzBdIH07XG5cbiAgICByZXR1cm4gbmV3IEx1ZmlGaWxlKHJlbW92ZVVybC5vcmlnaW4gKyBwYXRoSW5mb3NbMF0sIHtcbiAgICAgIGtleXMsXG4gICAgICBwYXNzd29yZCxcbiAgICAgIGFjdGlvblRva2VuOiBzcGxpdHRlZFBhdGhbMV0sXG4gICAgfSk7XG4gIH1cbn1cbiIsICJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7IGVyckFzeW5jLCBva0FzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgdHlwZSB7IEx1ZmlGaWxlIH0gZnJvbSBcIn4vZW50aXRpZXMvbHVmaS1maWxlLnRzXCI7XG5pbXBvcnQgeyBFVkVOVCB9IGZyb20gXCJ+L2VudW0vZXZlbnQudHNcIjtcbmltcG9ydCB7IEpvYlN0YXR1cyB9IGZyb20gXCJ+L2VudW0vam9iLXN0YXR1cy50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJSZXF1ZXN0TWVzc2FnZSB9IGZyb20gXCJ+L3R5cGUvd29ya2VyLXJlcXVlc3QtbWVzc2FnZS50c1wiO1xuaW1wb3J0IHsgZW5zdXJlRXJyb3IsIHdvcmtlclVybCB9IGZyb20gXCJ+L3V0aWxzLnRzXCI7XG5pbXBvcnQgeyBVUExPQURfU1RBVFVTIH0gZnJvbSBcIn4vZW51bS9maWxlLXN0YXR1cy50c1wiO1xuaW1wb3J0IHsgV09SS0VSX1RZUEUgfSBmcm9tIFwifi9lbnVtL3dvcmtlci10eXBlLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBMdWZpSm9iIHtcbiAgcHVibGljIGV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgcHVibGljIGx1ZmlGaWxlOiBMdWZpRmlsZTtcbiAgcHVibGljIHN0YXR1cyA9IEpvYlN0YXR1cy5PTkdPSU5HO1xuICBwdWJsaWMgYXJjaGl2ZUZpbGU6IEZpbGUgfCB1bmRlZmluZWQ7XG4gIHB1YmxpYyBhcmNoaXZlRmlsZXM6IEZpbGVbXSA9IFtdO1xuICBwdWJsaWMgZG93bmxvYWRlZEZpbGU6IEZpbGUgfCB1bmRlZmluZWQ7XG4gIHB1YmxpYyB3b3JrZXI6IFdvcmtlcjtcblxuICBwcml2YXRlIGlzVGVybWluYXRlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGx1ZmlGaWxlOiBMdWZpRmlsZSwgd29ya2VyVHlwZTogV09SS0VSX1RZUEUpIHtcbiAgICBzd2l0Y2ggKHdvcmtlclR5cGUpIHtcbiAgICAgIGNhc2UgV09SS0VSX1RZUEUuQ0FOQ0VMOlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy53b3JrZXIgPSBuZXcgV29ya2VyKHdvcmtlclVybChcImNhbmNlbFwiKSwgeyB0eXBlOiBcIm1vZHVsZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdPUktFUl9UWVBFLkNPTVBSRVNTOlxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy53b3JrZXIgPSBuZXcgV29ya2VyKHdvcmtlclVybChcImNvbXByZXNzXCIpLCB7IHR5cGU6IFwibW9kdWxlXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV09SS0VSX1RZUEUuREVDT01QUkVTUzpcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMud29ya2VyID0gbmV3IFdvcmtlcih3b3JrZXJVcmwoXCJkZWNvbXByZXNzXCIpLCB7IHR5cGU6IFwibW9kdWxlXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgV09SS0VSX1RZUEUuRE9XTkxPQUQ6XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLndvcmtlciA9IG5ldyBXb3JrZXIod29ya2VyVXJsKFwiZG93bmxvYWRcIiksIHsgdHlwZTogXCJtb2R1bGVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXT1JLRVJfVFlQRS5JTkZPUzpcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMud29ya2VyID0gbmV3IFdvcmtlcih3b3JrZXJVcmwoXCJpbmZvc1wiKSwgeyB0eXBlOiBcIm1vZHVsZVwiIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFdPUktFUl9UWVBFLlJFTU9WRTpcbiAgICAgICAge1xuICAgICAgICAgIHRoaXMud29ya2VyID0gbmV3IFdvcmtlcih3b3JrZXJVcmwoXCJyZW1vdmVcIiksIHsgdHlwZTogXCJtb2R1bGVcIiB9KTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBXT1JLRVJfVFlQRS5VUExPQUQ6XG4gICAgICAgIHtcbiAgICAgICAgICB0aGlzLndvcmtlciA9IG5ldyBXb3JrZXIod29ya2VyVXJsKFwidXBsb2FkXCIpLCB7IHR5cGU6IFwibW9kdWxlXCIgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5sdWZpRmlsZSA9IGx1ZmlGaWxlO1xuICAgIHRoaXMuZXZlbnRzLm9uY2UoRVZFTlQuSk9CX1RFUk1JTkFURUQsICgpID0+IHtcbiAgICAgIHRoaXMuaXNUZXJtaW5hdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudGVybWluYXRlKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmV2ZW50cy5vbmNlKEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgIHRoaXMuc3RhdHVzID0gSm9iU3RhdHVzLkZBSUxFRDtcbiAgICAgIHRoaXMubHVmaUZpbGUudXBsb2FkU3RhdHVzID0gVVBMT0FEX1NUQVRVUy5GQUlMRUQ7XG5cbiAgICAgIHRoaXMuZXZlbnRzLmVtaXQoRVZFTlQuSk9CX1RFUk1JTkFURUQsIGVycm9yKTtcbiAgICB9KTtcblxuICAgIHRoaXMub25FcnJvcigoZXZlbnQpID0+IGNvbnNvbGUuZXJyb3IoZXZlbnQuZXJyb3IpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZWxscyB0aGUgd29ya2VyIHRoZSBqb2IgaXMgY29tcGxldGVcbiAgICovXG4gIHB1YmxpYyBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICB0aGlzLnN0YXR1cyA9IEpvYlN0YXR1cy5DT01QTEVURTtcbiAgICB0aGlzLmV2ZW50cy5lbWl0KEVWRU5ULkpPQl9URVJNSU5BVEVEKTtcbiAgfTtcblxuICBwdWJsaWMgaGFzRmFpbGVkID0gKCkgPT4gdGhpcy5zdGF0dXMgPT09IEpvYlN0YXR1cy5GQUlMRUQ7XG5cbiAgcHVibGljIG9uRXJyb3IgPSAoY2FsbGJhY2s6IChhcmc6IEVycm9yRXZlbnQpID0+IHZvaWQpID0+IHtcbiAgICB0aGlzLndvcmtlci5vbmVycm9yID0gKGV2ZW50KSA9PiB7XG4gICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHB1YmxpYyBvbk1lc3NhZ2UgPSAoY2FsbGJhY2s/OiAoYXJnOiBNZXNzYWdlRXZlbnQpID0+IHZvaWQpID0+IHtcbiAgICB0aGlzLndvcmtlci5vbm1lc3NhZ2UgPSAoZSkgPT4ge1xuICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBldmVudCA9IGUuZGF0YS5ldmVudDtcblxuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudCA9PT0gRVZFTlQuRklMRV9VUERBVEVEKSB7XG4gICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmx1ZmlGaWxlLCBlLmRhdGEubHVmaUZpbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCwgZS5kYXRhLmVycm9yKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBwdWJsaWMgb25NZXNzYWdlRXJyb3IgPSAoY2FsbGJhY2s6IChhcmc6IE1lc3NhZ2VFdmVudCkgPT4gdm9pZCkgPT4ge1xuICAgIHRoaXMud29ya2VyLm9ubWVzc2FnZWVycm9yID0gKGV2ZW50KSA9PiB7XG4gICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHB1YmxpYyBvblByb2dyZXNzID0gKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSA9PiB7XG4gICAgdGhpcy5ldmVudHMub24oRVZFTlQuQ0hVTktfVVBMT0FERUQsICgpID0+IHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5ldmVudHMub24oRVZFTlQuQ0hVTktfRE9XTkxPQURFRCwgKCkgPT4ge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHB1YmxpYyByZXF1ZXN0TWVzc2FnZSA9IChcbiAgICBtc2c6IFdvcmtlclJlcXVlc3RNZXNzYWdlLFxuICAgIHRyYW5zZmVyYWJsZTogVHJhbnNmZXJhYmxlW10gPSBbXSxcbiAgKSA9PiB7XG4gICAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2UobXNnLCB0cmFuc2ZlcmFibGUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgcHVibGljIHRlcm1pbmF0ZSA9ICgpID0+IHtcbiAgICB0aGlzLndvcmtlci50ZXJtaW5hdGUoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHB1YmxpYyB3YWl0Rm9yQ29tcGxldGlvbiA9ICgpOiBSZXN1bHRBc3luYzxMdWZpSm9iLCBFcnJvcj4gPT4ge1xuICAgIGlmICh0aGlzLmlzVGVybWluYXRlZCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID09PSBKb2JTdGF0dXMuQ09NUExFVEUpIHtcbiAgICAgICAgcmV0dXJuIG9rQXN5bmModGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZXJyQXN5bmMoZW5zdXJlRXJyb3IoXCJKb2IgaGFzIGZhaWxlZFwiKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIHRoaXMuZXZlbnRzLm9uY2UoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuZXZlbnRzLm9uY2UoRVZFTlQuSk9CX1RFUk1JTkFURUQsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PT0gSm9iU3RhdHVzLkNPTVBMRVRFKSB7XG4gICAgICAgICAgICAgIHJlc29sdmUodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pLFxuICAgICAgICAoZXJyb3IpID0+IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyB3YWl0Rm9yU3RhcnQgPSAoKTogUmVzdWx0QXN5bmM8THVmaUpvYiwgRXJyb3I+ID0+XG4gICAgUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm9uY2UoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZXZlbnRzLm9uY2UoRVZFTlQuVVBMT0FEX1NUQVJURUQsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmV2ZW50cy5vbmNlKEVWRU5ULkRPV05MT0FEX1NUQVJURUQsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0pLFxuICAgICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgKTtcblxuICBwcml2YXRlIGRpc3BhdGNoRXZlbnQgPSAoZXZlbnQ6IEVWRU5ULCBlcnJvcjogdW5kZWZpbmVkIHwgRXJyb3IpID0+IHtcbiAgICB0aGlzLmV2ZW50cy5lbWl0KGV2ZW50LCBlcnJvcik7XG4gIH07XG59XG4iLCAiZXhwb3J0IGVudW0gSm9iU3RhdHVzIHtcbiAgQ09NUExFVEUsXG4gIEZBSUxFRCxcbiAgT05HT0lORyxcbiAgUEFVU0VELFxufVxuIiwgInR5cGUgSnNvbmFibGUgPVxuICB8IHN0cmluZ1xuICB8IG51bWJlclxuICB8IGJvb2xlYW5cbiAgfCBudWxsXG4gIHwgdW5kZWZpbmVkXG4gIHwgcmVhZG9ubHkgSnNvbmFibGVbXVxuICB8IHsgcmVhZG9ubHkgW2tleTogc3RyaW5nXTogSnNvbmFibGUgfVxuICB8IHsgdG9KU09OKCk6IEpzb25hYmxlIH07XG5cbmV4cG9ydCBjbGFzcyBCYXNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHB1YmxpYyByZWFkb25seSBjb250ZXh0PzogSnNvbmFibGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICBvcHRpb25zOiB7IGNhdXNlPzogRXJyb3I7IGNvbnRleHQ/OiBKc29uYWJsZSB9ID0ge30sXG4gICkge1xuICAgIGNvbnN0IHsgY2F1c2UsIGNvbnRleHQgfSA9IG9wdGlvbnM7XG5cbiAgICBzdXBlcihtZXNzYWdlLCB7IGNhdXNlIH0pO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwifi9lcnJvci9iYXNlLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBDb25uZWN0aW9uRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlOiBzdHJpbmcgPVxuICAgIFwiVW5hYmxlIHRvIGNvbm5lY3QuIElzIHRoZSBjb21wdXRlciBhYmxlIHRvIGFjY2VzcyB0aGUgdXJsP1wiO1xufVxuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIFNlcnZlckVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHtcbiAgb3ZlcnJpZGUgbWVzc2FnZSA9IFwiVGhlIHNlcnZlciByZXR1cm5lZCBhbiBlcnJvclwiO1xufVxuIiwgImltcG9ydCB7IGVyckFzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgeyBDb25uZWN0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jb25uZWN0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBTZXJ2ZXJFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3NlcnZlci1lcnJvci50c1wiO1xuaW1wb3J0IHR5cGUgeyBTZXJ2ZXJDb25maWcgfSBmcm9tIFwifi9pbnRlcmZhY2Uvc2VydmVyLWNvbmZpZy50c1wiO1xuXG4vKipcbiAqIEVuc3VyZSBhbiBlcnJvciBtZXNzYWdlIGlzIHRyYW5zZm9ybWVkIGluIGFuIEVycm9yIG9iamVjdFxuICpcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGVuc3VyZUVycm9yID0gKHZhbHVlOiB1bmtub3duKTogRXJyb3IgPT4ge1xuICBpZiAodmFsdWUgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbHVlO1xuXG4gIGxldCBzdHJpbmdpZmllZCA9IFwiW1VuYWJsZSB0byBzdHJpbmdpZnkgdGhlIHRocm93biB2YWx1ZV1cIjtcbiAgdHJ5IHtcbiAgICBzdHJpbmdpZmllZCA9IEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgfSBjYXRjaCAoX2Vycm9yKSB7XG4gICAgLyogZW1wdHkgKi9cbiAgfVxuXG4gIHJldHVybiBuZXcgRXJyb3Ioc3RyaW5naWZpZWQpO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSBMdWZpJ3MgY29uZmlnIGZyb20gaXRzIEFQSVxuICpcbiAqIEBwYXJhbSBpbnN0YW5jZVVybFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGZldGNoU2VydmVyQ29uZmlnID0gKFxuICBpbnN0YW5jZVVybDogVVJMLFxuKTogUmVzdWx0QXN5bmM8U2VydmVyQ29uZmlnLCBFcnJvcj4gPT4ge1xuICBjb25zdCBvcmlnaW5NYXRjaGVzID0gaW5zdGFuY2VVcmwuaHJlZi5tYXRjaChcbiAgICAvKC4qPylcXC8/KD86XFwvW2RyXXsxfVxcL3xsb2dpblxcLz98ZmlsZXNcXC8/KS8sXG4gICk7XG5cbiAgY29uc3QgdXJsT3JpZ2luID0gb3JpZ2luTWF0Y2hlcyAmJiBvcmlnaW5NYXRjaGVzWzFdXG4gICAgPyBvcmlnaW5NYXRjaGVzWzFdXG4gICAgOiBpbnN0YW5jZVVybC5vcmlnaW47XG5cbiAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIGZldGNoKHVybE9yaWdpbiArIFwiL2Fib3V0L2NvbmZpZ1wiKSxcbiAgICAoZXJyb3IpID0+XG4gICAgICBuZXcgQ29ubmVjdGlvbkVycm9yKHVuZGVmaW5lZCwge1xuICAgICAgICBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgfSksXG4gICkuYW5kVGhlbigocmVzcG9uc2UpID0+IHtcbiAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgICAgcmVzcG9uc2UuanNvbigpLFxuICAgICAgICAoZXJyb3IpID0+IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlcnJBc3luYyhcbiAgICAgICAgbmV3IFNlcnZlckVycm9yKHVuZGVmaW5lZCwgeyBjb250ZXh0OiByZXNwb25zZS5zdGF0dXNUZXh0IH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzRGVub1J1bnRpbWUgPSAoKTogYm9vbGVhbiA9PiB0eXBlb2YgRGVubyAhPT0gXCJ1bmRlZmluZWRcIjtcblxuZXhwb3J0IGNvbnN0IGlzU2VjdXJlQ29udGV4dCA9ICgpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGlzRGVub1J1bnRpbWUoKSB8fCBnbG9iYWxUaGlzLmlzU2VjdXJlQ29udGV4dCB8fFxuICAgIGdsb2JhbFRoaXMubG9jYXRpb24ucHJvdG9jb2wgPT09IFwiaHR0cHM6XCI7XG59O1xuXG5leHBvcnQgY29uc3Qgd29ya2VyVXJsID0gKHJlbGF0aXZlUGF0aDogc3RyaW5nKTogVVJMID0+IHtcbiAgcmV0dXJuIGlzRGVub1J1bnRpbWUoKVxuICAgID8gbmV3IFVSTChgLi93b3JrZXIvJHtyZWxhdGl2ZVBhdGh9LnRzYCwgbmV3IFVSTChcIi5cIiwgaW1wb3J0Lm1ldGEudXJsKS5ocmVmKVxuICAgIDogbmV3IFVSTChcbiAgICAgIGltcG9ydC5tZXRhLnJlc29sdmUoXG4gICAgICAgIGAuLyR7XG4gICAgICAgICAgcmVsYXRpdmVQYXRoICE9PSBcImVuY3J5cHRcIiA/IGB3b3JrZXIvJHtyZWxhdGl2ZVBhdGh9YCA6IHJlbGF0aXZlUGF0aFxuICAgICAgICB9LmpzYCxcbiAgICAgICksXG4gICAgKTtcbn07XG4iLCAiZXhwb3J0IGVudW0gQ3J5cHRvQWxnb3JpdGhtIHtcbiAgU2pjbCxcbiAgV2ViQ3J5cHRvLFxufVxuIiwgbnVsbCwgbnVsbCwgbnVsbCwgImltcG9ydCB7XG4gIERlY29kZSBhcyBiNjRkZWNvZGUsXG4gIEVuY29kZSBhcyBiNjRlbmNvZGUsXG59IGZyb20gXCJhcnJheWJ1ZmZlci1lbmNvZGluZy9iYXNlNjRcIjtcbmltcG9ydCB7IGVyckFzeW5jLCBva0FzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgc2pjbCBmcm9tIFwibHVmaS1zamNsXCI7XG5pbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IENyeXB0b0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2NyeXB0by1lcnJvci50c1wiO1xuaW1wb3J0IHsgRGVjcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2RlY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCB7IGVuc3VyZUVycm9yIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB7IEhhc2hpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzXCI7XG5cbi8qKlxuICogRGVjcnlwdCBhbiBFbmNyeXB0ZWREYXRhIG9yIGEgc3RyaW5nIHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvbi5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gZW5jcnlwdGVkRGF0YVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICBlbmNyeXB0ZWREYXRhOiBFbmNyeXB0ZWREYXRhIHwgc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8QXJyYXlCdWZmZXIsIERlY3J5cHRpb25FcnJvcj4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSB0eXBlb2YgZW5jcnlwdGVkRGF0YSA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBlbmNyeXB0ZWREYXRhXG4gICAgICA6IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShlbmNyeXB0ZWREYXRhLmRhdGEgYXMgQXJyYXlCdWZmZXIpO1xuXG4gICAgcmV0dXJuIG9rQXN5bmMoYjY0ZGVjb2RlKHNqY2wuZGVjcnlwdChrZXksIGRhdGEpKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IERlY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEVuY3J5cHQgYW4gQXJyYXlCdWZmZXIgaW50byBhbiBFbmNyeXB0ZWREYXRhIHVzaW5nIHRoZSBwcm92aWRlZCBrZXlcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuKTogUmVzdWx0QXN5bmM8RW5jcnlwdGVkRGF0YSwgRW5jcnlwdGlvbkVycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZW5jcnlwdGVkID0gc2pjbC5lbmNyeXB0KGtleSwgYjY0ZW5jb2RlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gb2tBc3luYyh7XG4gICAgICBhbGdvOiBDcnlwdG9BbGdvcml0aG0uU2pjbCxcbiAgICAgIGRhdGE6IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShlbmNyeXB0ZWQpLmJ1ZmZlcixcbiAgICAgIGl2OiBKU09OLnBhcnNlKGVuY3J5cHRlZCBhcyB1bmtub3duIGFzIHN0cmluZykuaXYsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IEVuY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZyB1c2luZyBTamNsIEFQSVxuICpcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleSA9ICgpOiBSZXN1bHRBc3luYzxzdHJpbmcsIENyeXB0b0Vycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG9rQXN5bmMoc2pjbC5jb2RlYy5iYXNlNjQuZnJvbUJpdHMoc2pjbC5yYW5kb20ucmFuZG9tV29yZHMoOCwgMTApKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGdlbmVyYXRlIGtleVwiLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEhhc2ggYSBwYXNzd29yZCB1c2luZyBTamNsIEFQSVxuICpcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgSGFzaGluZ0Vycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG9rQXN5bmMoc2pjbC5jb2RlYy5oZXguZnJvbUJpdHMoc2pjbC5oYXNoLnNoYTUxMi5oYXNoKHBhc3N3b3JkKSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJBc3luYyhuZXcgSGFzaGluZ0Vycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXRlY3QgaWYgdGhlIGtleSBoYXMgYmVlbiBnZW5lcmF0ZWQgYnkgU2pjbC4gU2luY2Ugd2UncmUgbm90IGdlbmVyYXRpbmcgYW4gZXF1YWwgc3ltYm9sIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZyB3aXRoIHRoZSBXZWJDcnlwdG8gQVBJIChieSB1c2luZyBiYXNlNjR1cmwpLCBpdCdzIGVhc3kgdG8gZGV0ZWN0XG4gKlxuICogQHBhcmFtIGtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2pjbEtleSA9IChrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4ga2V5W2tleS5sZW5ndGggLSAxXSA9PT0gXCI9XCI7XG59O1xuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIENyeXB0b0Vycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBIYXNoaW5nRXJyb3IgZXh0ZW5kcyBDcnlwdG9FcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2U6IHN0cmluZyA9IFwiVW5hYmxlIHRvIGhhc2ggdGhlIHByb3ZpZGVkIHN0cmluZ1wiO1xufVxuIiwgImltcG9ydCB7XG4gIERlY29kZSBhcyBiNjR1cmxkZWNvZGUsXG4gIEVuY29kZSBhcyBiNjR1cmxlbmNvZGUsXG59IGZyb20gXCJhcnJheWJ1ZmZlci1lbmNvZGluZy9iYXNlNjQvdXJsXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCB7IENyeXB0b0FsZ29yaXRobSB9IGZyb20gXCJ+L2VudW0vY3J5cHRvLWFsZ29yaXRobS50c1wiO1xuaW1wb3J0IHsgRGVjcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2RlY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IG9rQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IGVuc3VyZUVycm9yIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBDcnlwdG9FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9jcnlwdG8tZXJyb3IudHNcIjtcbmltcG9ydCB7IEhhc2hpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzXCI7XG5cbi8qKlxuICogRGVjcnlwdCBhbiBlbmNyeXB0ZWREYXRhIHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvblxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBlbmNyeXB0ZWRcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkZWNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgZW5jcnlwdGVkOiBFbmNyeXB0ZWREYXRhLFxuKTogUmVzdWx0QXN5bmM8QXJyYXlCdWZmZXIsIERlY3J5cHRpb25FcnJvcj4gPT4ge1xuICByZXR1cm4gaW1wb3J0S2V5KGtleSkuYW5kVGhlbigoaW1wb3J0ZWRLZXkpID0+XG4gICAgUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICBjcnlwdG8uc3VidGxlLmRlY3J5cHQoXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIkFFUy1HQ01cIixcbiAgICAgICAgICBpdjogZW5jcnlwdGVkLml2IGFzIFVpbnQ4QXJyYXksXG4gICAgICAgIH0sXG4gICAgICAgIGltcG9ydGVkS2V5LFxuICAgICAgICBlbmNyeXB0ZWQuZGF0YSBhcyBBcnJheUJ1ZmZlcixcbiAgICAgICksXG4gICAgICAoZXJyb3IpID0+IG5ldyBEZWNyeXB0aW9uRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICAgKVxuICApO1xufTtcblxuLyoqXG4gKiBFbmNyeXB0IGFuIEFycmF5QnVmZmVyIGludG8gYW4gRW5jcnlwdGVkRGF0YSB1c2luZyB0aGUgcHJvdmlkZWQga2V5XG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuKTogUmVzdWx0QXN5bmM8RW5jcnlwdGVkRGF0YSwgRW5jcnlwdGlvbkVycm9yPiA9PiB7XG4gIHJldHVybiBpbXBvcnRLZXkoa2V5KS5hbmRUaGVuKChpbXBvcnRlZEtleSkgPT4ge1xuICAgIGNvbnN0IGl2ID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxMikpO1xuICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgIGNyeXB0by5zdWJ0bGUuZW5jcnlwdChcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiQUVTLUdDTVwiLFxuICAgICAgICAgIGl2LFxuICAgICAgICB9LFxuICAgICAgICBpbXBvcnRlZEtleSxcbiAgICAgICAgdmFsdWUsXG4gICAgICApLFxuICAgICAgKGVycm9yKSA9PlxuICAgICAgICBuZXcgRW5jcnlwdGlvbkVycm9yKHVuZGVmaW5lZCwge1xuICAgICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICAgIH0pLFxuICAgICkuYW5kVGhlbigoZW5jcnlwdGVkKSA9PiB7XG4gICAgICByZXR1cm4gb2tBc3luYyh7XG4gICAgICAgIGFsZ286IENyeXB0b0FsZ29yaXRobS5XZWJDcnlwdG8sXG4gICAgICAgIGRhdGE6IGVuY3J5cHRlZCxcbiAgICAgICAgaXYsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHN0cmluZyBpbnRvIGEgQ3J5cHRvS2V5LCB1c2FibGUgaW4gV2ViIENyeXB0byBBUElcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaW1wb3J0S2V5ID0gKGtleTogc3RyaW5nKTogUmVzdWx0QXN5bmM8Q3J5cHRvS2V5LCBDcnlwdG9FcnJvcj4gPT4ge1xuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgICBcInJhd1wiLFxuICAgICAgYjY0dXJsZGVjb2RlKGtleSksXG4gICAgICB7IG5hbWU6IFwiQUVTLUdDTVwiIH0sXG4gICAgICBmYWxzZSxcbiAgICAgIFtcbiAgICAgICAgXCJlbmNyeXB0XCIsXG4gICAgICAgIFwiZGVjcnlwdFwiLFxuICAgICAgXSxcbiAgICApLFxuICAgIChlcnJvcikgPT5cbiAgICAgIG5ldyBDcnlwdG9FcnJvcihcIlVuYWJsZSB0byBpbXBvcnQgY3J5cHRvZ3JhcGh5IGtleVwiLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nIHVzaW5nIFdlYiBDcnlwdG8gQVBJLlxuICpcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleSA9ICgpOiBSZXN1bHRBc3luYzxzdHJpbmcsIENyeXB0b0Vycm9yPiA9PiB7XG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgY3J5cHRvLnN1YnRsZVxuICAgICAgICAuZ2VuZXJhdGVLZXkoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJBRVMtR0NNXCIsXG4gICAgICAgICAgICBsZW5ndGg6IDI1NixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgW1wiZW5jcnlwdFwiLCBcImRlY3J5cHRcIl0sXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKGdlbmVyYXRlZEtleSkgPT5cbiAgICAgICAgICBjcnlwdG8uc3VidGxlXG4gICAgICAgICAgICAuZXhwb3J0S2V5KFwicmF3XCIsIGdlbmVyYXRlZEtleSlcbiAgICAgICAgICAgIC50aGVuKChrZXkpID0+IHJlc29sdmUoYjY0dXJsZW5jb2RlKGtleSkpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGJhc2U2NCBlbmNvZGUgdGhlIHVybFwiLCB7XG4gICAgICAgICAgICAgICAgICBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKVxuICAgICksXG4gICAgKGVycm9yKSA9PlxuICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGdlbmVyYXRlIGtleVwiLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICk7XG59O1xuXG4vKipcbiAqIEhhc2ggYSBwYXNzd29yZCB1c2luZyBXZWJDcnlwdG8gQVBJXG4gKlxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaGFzaFBhc3N3b3JkID0gKFxuICBwYXNzd29yZDogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBIYXNoaW5nRXJyb3I+ID0+IHtcbiAgY29uc3QgcHJvbWlzZSA9IGFzeW5jICgpID0+IHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcbiAgICAgIG5ldyBVaW50OEFycmF5KFxuICAgICAgICBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChcbiAgICAgICAgICBcIlNIQS01MTJcIixcbiAgICAgICAgICBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocGFzc3dvcmQpLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLm1hcCgoYikgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpKS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBwcm9taXNlKCksXG4gICAgKGVycm9yKSA9PiBuZXcgSGFzaGluZ0Vycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICApO1xufTtcbiIsICJpbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB0eXBlIHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IERlY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9kZWNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCAqIGFzIHNqY2wgZnJvbSBcIn4vYXBpL2NyeXB0by9zamNsLnRzXCI7XG5pbXBvcnQgKiBhcyB3ZWIgZnJvbSBcIn4vYXBpL2NyeXB0by93ZWIudHNcIjtcbmltcG9ydCB0eXBlIHsgSGFzaGluZ0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2hhc2hpbmctZXJyb3IudHNcIjtcblxuLyoqXG4gKiBEZWNyeXB0IGFuIEVuY3J5cHRlZERhdGEgb2JqZWN0IHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvblxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICB2YWx1ZTogRW5jcnlwdGVkRGF0YSxcbik6IFJlc3VsdEFzeW5jPEFycmF5QnVmZmVyLCBEZWNyeXB0aW9uRXJyb3I+ID0+XG4gIHZhbHVlLmFsZ28gPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5hbGdvID09PSBDcnlwdG9BbGdvcml0aG0uU2pjbFxuICAgID8gc2pjbC5kZWNyeXB0KGtleSwgdmFsdWUpXG4gICAgOiB3ZWIuZGVjcnlwdChrZXksIHZhbHVlKTtcblxuLyoqXG4gKiBFbmNyeXB0IGFuIEFycmF5QnVmZmVyIHVzaW5nIHRoZSBwcm92aWRlZCBrZXkgYW5kIGFsZ29yaXRobVxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIGFsZ29cbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuICBhbGdvOiBDcnlwdG9BbGdvcml0aG0sXG4pOiBSZXN1bHRBc3luYzxFbmNyeXB0ZWREYXRhLCBFbmNyeXB0aW9uRXJyb3I+ID0+XG4gIChhbGdvID09PSBDcnlwdG9BbGdvcml0aG0uU2pjbClcbiAgICA/IHNqY2wuZW5jcnlwdChrZXksIHZhbHVlKVxuICAgIDogd2ViLmVuY3J5cHQoa2V5LCB2YWx1ZSk7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBuZXcga2V5IGZvciBlbmNyeXB0aW9uL2RlY3J5cHRpb25cbiAqXG4gKiBAcGFyYW0gYWxnb1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlS2V5ID0gKFxuICBhbGdvID0gQ3J5cHRvQWxnb3JpdGhtLldlYkNyeXB0byxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgQ3J5cHRvRXJyb3I+ID0+XG4gIGFsZ28gPT09IENyeXB0b0FsZ29yaXRobS5TamNsID8gc2pjbC5nZW5lcmF0ZUtleSgpIDogd2ViLmdlbmVyYXRlS2V5KCk7XG5cbi8qKlxuICogSGFzaCBhIHBhc3N3b3JkIHVzaW5nIHRoZSBwcm92aWRlZCBhbGdvcml0aG1cbiAqXG4gKiBAcGFyYW0gcGFzc3dvcmRcbiAqIEBwYXJhbSBhbGdvXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaGFzaFBhc3N3b3JkID0gKFxuICBwYXNzd29yZDogc3RyaW5nLFxuICBhbGdvOiBDcnlwdG9BbGdvcml0aG0sXG4pOiBSZXN1bHRBc3luYzxzdHJpbmcsIEhhc2hpbmdFcnJvcj4gPT5cbiAgYWxnbyA9PT0gQ3J5cHRvQWxnb3JpdGhtLlNqY2xcbiAgICA/IHNqY2wuaGFzaFBhc3N3b3JkKHBhc3N3b3JkKVxuICAgIDogd2ViLmhhc2hQYXNzd29yZChwYXNzd29yZCk7XG4iLCAiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcIn4vZXJyb3IvYmFzZS1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgRG93bmxvYWRFcnJvciBleHRlbmRzIEJhc2VFcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2U6IHN0cmluZyA9IFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSBkb3dubG9hZGluZyB0aGUgZGF0YVwiO1xufVxuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIEluZm9zRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlOiBzdHJpbmcgPVxuICAgIFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gcmV0cmlldmUgc2VydmVyIGluZm9ybWF0aW9uc1wiO1xufVxuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIEpvYkVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgSm9iRXJyb3IgfSBmcm9tIFwifi9lcnJvci9qb2Ivam9iLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBKb2JQYXVzZUVycm9yIGV4dGVuZHMgSm9iRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlOiBzdHJpbmcgPSBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIHBhdXNlIHRoZSBqb2JcIjtcbn1cbiIsICJpbXBvcnQgeyBKb2JFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2pvYi9qb2ItZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIEpvYlJlc3VtZUVycm9yIGV4dGVuZHMgSm9iRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlOiBzdHJpbmcgPSBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIHJlc3VtZSB0aGUgam9iXCI7XG59XG4iLCAiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcIn4vZXJyb3IvYmFzZS1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgVXBsb2FkRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlOiBzdHJpbmcgPSBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdXBsb2FkaW5nIHRoZSBkYXRhXCI7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUF1QkEsUUFBSSxJQUFJLE9BQU8sWUFBWSxXQUFXLFVBQVU7QUFDaEQsUUFBSSxlQUFlLEtBQUssT0FBTyxFQUFFLFVBQVUsYUFDdkMsRUFBRSxRQUNGLFNBQVNBLGNBQWEsUUFBUSxVQUFVLE1BQU07QUFDOUMsYUFBTyxTQUFTLFVBQVUsTUFBTSxLQUFLLFFBQVEsVUFBVSxJQUFJO0FBQUEsSUFDN0Q7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V0FBSyxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRyxLQUFJO0FBQUMsWUFBRSxFQUFFLElBQUUsQ0FBQztBQUFFLFlBQUcsTUFBSSxJQUFFLEtBQUcsTUFBSSxLQUFHLE1BQUksSUFBRSxFQUFFLEtBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEdBQUcsS0FBRyxLQUFHLEVBQUUsS0FBRyxJQUFFLEdBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLEdBQUUsTUFBSSxJQUFFLE1BQUksSUFBRSxLQUFHLElBQUUsTUFBSSxLQUFHLEtBQUcsSUFBRyxJQUFFLEtBQUcsSUFBRSxPQUFLLEtBQUc7QUFBSSxVQUFFLENBQUMsSUFBRSxFQUFFLElBQUUsQ0FBQyxJQUFFO0FBQUEsTUFBQztBQUFDLFdBQUksSUFBRSxHQUFFLEdBQUUsS0FBSSxJQUFJLEtBQUUsRUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxLQUFHLEtBQUcsSUFBRSxJQUFFLElBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFJLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFDM2YsR0FBRyxDQUFDO0FBQUEsSUFBQztBQUNMLElBQUFBLE1BQUssT0FBTyxJQUFJLFlBQVUsRUFBQyxTQUFRLFNBQVMsR0FBRTtBQUFDLGFBQU8sR0FBRyxNQUFLLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRTtBQUFDLGFBQU8sR0FBRyxNQUFLLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxHQUFFLFdBQVU7QUFBQyxVQUFJLElBQUUsS0FBSyxFQUFFLENBQUMsR0FBRSxJQUFFLEtBQUssRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsTUFBTSxHQUFFLElBQUksSUFBRyxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsT0FBSyxLQUFHLE1BQUksQ0FBQyxJQUFFO0FBQUUsV0FBSSxJQUFFLElBQUUsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEtBQUcsS0FBRyxHQUFFLElBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHLElBQUUsS0FBRyxJQUFFLEtBQUcsSUFBRSxLQUFHLEdBQUUsSUFBRSxLQUFHLElBQUUsSUFBRSxNQUFJLElBQUcsRUFBRSxDQUFDLElBQUUsR0FBRSxFQUFFLENBQUMsSUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsSUFBRSxXQUFVLElBQUUsUUFBUSxJQUFFLE1BQU0sSUFBRSxXQUFVLEdBQUUsSUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFFLFdBQVUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksR0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLEtBQUcsTUFBSTtBQUFFLFdBQUksSUFDbGdCLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDO0FBQUEsSUFBQyxFQUFDO0FBQ2hELGFBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUcsTUFBSSxFQUFFLE9BQU8sT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx3QkFBd0I7QUFBRSxVQUFJLElBQUUsRUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsU0FBTyxJQUFFLEdBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFFLEVBQUUsRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLENBQUM7QUFBRSxVQUFJLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksS0FBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBSSxFQUFFLElBQUUsRUFBRSxLQUFHLEtBQUcsR0FBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFJLEVBQUUsSUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLElBQUUsRUFBRSxLQUFHLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFO0FBQUUsV0FBSSxJQUNyZixHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEdBQUcsS0FBRyxLQUFHLEVBQUUsS0FBRyxJQUFFLEdBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUU7QUFBRSxhQUFPO0FBQUEsSUFBQztBQUNoSCxJQUFBQSxNQUFLLFdBQVMsRUFBQyxVQUFTLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFFQSxNQUFLLFNBQVMsRUFBRSxFQUFFLE1BQU0sSUFBRSxFQUFFLEdBQUUsTUFBSSxJQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7QUFBRSxhQUFPLFdBQVMsSUFBRSxJQUFFQSxNQUFLLFNBQVMsTUFBTSxHQUFFLElBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsS0FBSyxNQUFNLENBQUMsSUFBRSxJQUFFLEVBQUU7QUFBRSxlQUFRLElBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxFQUFFLElBQUUsS0FBRyxDQUFDLEtBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxLQUFHLElBQUUsQ0FBQyxNQUFJLElBQUUsRUFBRSxJQUFFLEtBQUcsQ0FBQyxNQUFJLE1BQUksS0FBRyxLQUFHO0FBQUEsSUFBQyxHQUFFLFFBQU8sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHLE1BQUksRUFBRSxVQUFRLE1BQUksRUFBRSxPQUFPLFFBQU8sRUFBRSxPQUFPLENBQUM7QUFBRSxVQUFJLElBQUUsRUFBRSxFQUFFLFNBQU8sQ0FBQyxHQUFFLElBQUVBLE1BQUssU0FBUyxXQUFXLENBQUM7QUFBRSxhQUFPLE9BQUssSUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFFQSxNQUFLLFNBQVMsRUFBRSxHQUFFLEdBQUUsSUFBRSxHQUFFLEVBQUUsTUFBTSxHQUFFLEVBQUUsU0FBTyxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsV0FBVSxTQUFTLEdBQUU7QUFBQyxVQUFJLElBQUUsRUFBRTtBQUFPLGFBQU8sTUFDMWYsSUFBRSxJQUFFLE1BQUksSUFBRSxLQUFHQSxNQUFLLFNBQVMsV0FBVyxFQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQyxHQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHLEtBQUcsRUFBRSxTQUFPLEVBQUUsUUFBTztBQUFFLFVBQUUsRUFBRSxNQUFNLEdBQUUsS0FBSyxLQUFLLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxJQUFFLEVBQUU7QUFBTyxVQUFFLElBQUU7QUFBRyxVQUFFLEtBQUcsTUFBSSxFQUFFLElBQUUsQ0FBQyxJQUFFQSxNQUFLLFNBQVMsUUFBUSxHQUFFLEVBQUUsSUFBRSxDQUFDLElBQUUsY0FBWSxJQUFFLEdBQUUsQ0FBQztBQUFHLGFBQU87QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsYUFBTyxPQUFLLElBQUUsS0FBRyxJQUFFLElBQUUsSUFBRSxLQUFHLEtBQUcsS0FBRyxnQkFBYztBQUFBLElBQUMsR0FBRSxZQUFXLFNBQVMsR0FBRTtBQUFDLGFBQU8sS0FBSyxNQUFNLElBQUUsYUFBYSxLQUFHO0FBQUEsSUFBRSxHQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHQSxNQUFLLFNBQVMsVUFBVSxDQUFDLE1BQUlBLE1BQUssU0FBUyxVQUFVLENBQUMsRUFBRSxRQUFNO0FBQUcsVUFBSSxJQUFFLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLE1BQUcsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsYUFBTyxNQUNsZjtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUk7QUFBRSxVQUFFO0FBQUUsV0FBSSxXQUFTLE1BQUksSUFBRSxDQUFDLElBQUcsTUFBSSxHQUFFLEtBQUcsR0FBRyxHQUFFLEtBQUssQ0FBQyxHQUFFLElBQUU7QUFBRSxVQUFHLE1BQUksRUFBRSxRQUFPLEVBQUUsT0FBTyxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxHQUFFLEtBQUssSUFBRSxFQUFFLENBQUMsTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsS0FBRyxLQUFHO0FBQUUsVUFBRSxFQUFFLFNBQU8sRUFBRSxFQUFFLFNBQU8sQ0FBQyxJQUFFO0FBQUUsVUFBRUEsTUFBSyxTQUFTLFdBQVcsQ0FBQztBQUFFLFFBQUUsS0FBS0EsTUFBSyxTQUFTLFFBQVEsSUFBRSxJQUFFLElBQUcsS0FBRyxJQUFFLElBQUUsSUFBRSxFQUFFLElBQUksR0FBRSxDQUFDLENBQUM7QUFBRSxhQUFPO0FBQUEsSUFBQyxHQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUU7QUFBQyxhQUFNLENBQUMsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsV0FBVSxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxFQUFFLEVBQUUsS0FBRSxFQUFFLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxNQUFJLEtBQUcsTUFBSSxJQUFFLFNBQVEsSUFBRSxVQUFTLElBQUUsS0FBRztBQUFHLGFBQU87QUFBQSxJQUFDLEVBQUM7QUFDcGQsSUFBQUEsTUFBSyxNQUFNLGFBQVcsRUFBQyxVQUFTLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRSxJQUFHLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUMsR0FBRSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsSUFBSSxRQUFLLElBQUUsT0FBSyxJQUFFLEVBQUUsSUFBRSxDQUFDLElBQUcsS0FBRyxPQUFPLGFBQWEsTUFBSSxNQUFJLE1BQUksQ0FBQyxHQUFFLE1BQUk7QUFBRSxhQUFPLG1CQUFtQixPQUFPLENBQUMsQ0FBQztBQUFBLElBQUMsR0FBRSxRQUFPLFNBQVMsR0FBRTtBQUFDLFVBQUUsU0FBUyxtQkFBbUIsQ0FBQyxDQUFDO0FBQUUsVUFBSSxJQUFFLENBQUMsR0FBRSxHQUFFLElBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLEtBQUUsS0FBRyxJQUFFLEVBQUUsV0FBVyxDQUFDLEdBQUUsT0FBSyxJQUFFLE9BQUssRUFBRSxLQUFLLENBQUMsR0FBRSxJQUFFO0FBQUcsVUFBRSxLQUFHLEVBQUUsS0FBS0EsTUFBSyxTQUFTLFFBQVEsS0FBRyxJQUFFLElBQUcsQ0FBQyxDQUFDO0FBQUUsYUFBTztBQUFBLElBQUMsRUFBQztBQUNwWixJQUFBQSxNQUFLLE1BQU0sTUFBSSxFQUFDLFVBQVMsU0FBUyxHQUFFO0FBQUMsVUFBSSxJQUFFLElBQUc7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLFFBQUssRUFBRSxDQUFDLElBQUUsS0FBRyxpQkFBZ0IsU0FBUyxFQUFFLEVBQUUsT0FBTyxDQUFDO0FBQUUsYUFBTyxFQUFFLE9BQU8sR0FBRUEsTUFBSyxTQUFTLFVBQVUsQ0FBQyxJQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQUUsSUFBRSxDQUFDLEdBQUU7QUFBRSxVQUFFLEVBQUUsUUFBUSxVQUFTLEVBQUU7QUFBRSxVQUFFLEVBQUU7QUFBTyxVQUFFLElBQUU7QUFBVyxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEVBQUUsR0FBRSxLQUFLLFNBQVMsRUFBRSxPQUFPLEdBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBRSxDQUFDO0FBQUUsYUFBT0EsTUFBSyxTQUFTLE1BQU0sR0FBRSxJQUFFLENBQUM7QUFBQSxJQUFDLEVBQUM7QUFDOVYsSUFBQUEsTUFBSyxNQUFNLFNBQU8sRUFBQyxHQUFFLG9FQUFtRSxVQUFTLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRUEsTUFBSyxNQUFNLE9BQU8sR0FBRSxJQUFFLEdBQUUsSUFBRUEsTUFBSyxTQUFTLFVBQVUsQ0FBQztBQUFFLFlBQUksSUFBRSxFQUFFLE9BQU8sR0FBRSxFQUFFLElBQUU7QUFBTSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsU0FBTyxJQUFHLE1BQUcsRUFBRSxRQUFRLElBQUUsRUFBRSxDQUFDLE1BQUksT0FBSyxFQUFFLEdBQUUsSUFBRSxLQUFHLElBQUUsRUFBRSxDQUFDLEtBQUcsSUFBRSxHQUFFLEtBQUcsSUFBRyxRQUFNLE1BQUksR0FBRSxLQUFHO0FBQUcsYUFBSyxFQUFFLFNBQU8sS0FBRyxDQUFDLElBQUcsTUFBRztBQUFJLGFBQU87QUFBQSxJQUFDLEdBQUUsUUFBTyxTQUFTLEdBQUUsR0FBRTtBQUFDLFVBQUUsRUFBRSxRQUFRLFNBQVEsRUFBRTtBQUFFLFVBQUksSUFBRSxDQUFDLEdBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRUEsTUFBSyxNQUFNLE9BQU8sR0FBRSxJQUFFLEdBQUU7QUFBRSxZQUFJLElBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxJQUFFO0FBQU0sV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSTtBQUFDLFlBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdGYsWUFBRyxJQUFFLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFB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QyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEdBQUUsV0FBVTtBQUFDLGVBQVMsRUFBRUMsSUFBRTtBQUFDLGVBQU8sY0FBYUEsS0FBRSxLQUFLLE1BQU1BLEVBQUMsS0FBRztBQUFBLE1BQUM7QUFBQyxlQUFRLElBQUUsR0FBRSxJQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUcsR0FBRSxLQUFJO0FBQUMsWUFBRTtBQUFHLGFBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxHQUFFLElBQUksS0FBRyxNQUFJLElBQUUsR0FBRTtBQUFDLGNBQ3pmO0FBQUc7QUFBQSxRQUFLO0FBQUMsY0FBSSxJQUFFLE1BQUksS0FBSyxFQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLEdBQUUsQ0FBQyxJQUFHLEtBQUssRUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxJQUFFLENBQUMsQ0FBQyxHQUFFO0FBQUEsTUFBSTtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLFVBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLEtBQUcsR0FBRSxJQUFJLE1BQUcsSUFBRSxJQUFFLEVBQUUsQ0FBQyxLQUFHLElBQUUsRUFBRSxJQUFFLElBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEtBQUcsRUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEVBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksSUFBRSxLQUFHLEtBQUcsS0FBRyxPQUFLLE1BQUksS0FBRyxNQUFJLEtBQUcsTUFBSSxLQUFHLEtBQUcsS0FBRyxLQUFHLE1BQUksRUFBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLElBQUUsSUFBRSxFQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEtBQUcsTUFBSSxJQUFFLEtBQUcsSUFBRSxNQUFJLEVBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFHLElBQUUsSUFBRSxLQUFHLElBQUUsT0FBSyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEtBQUcsTUFBSTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQ3BmO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFBLElBQUMsRUFBQztBQUFFLElBQUFELE1BQUssS0FBSyxTQUFPLFNBQVMsR0FBRTtBQUFDLFdBQUssRUFBRSxDQUFDLEtBQUcsS0FBSyxFQUFFO0FBQUUsV0FBRyxLQUFLLElBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEtBQUssSUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsS0FBSyxJQUFFLEVBQUUsS0FBRyxLQUFLLE1BQU07QUFBQSxJQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLE9BQU8sT0FBSyxTQUFTLEdBQUU7QUFBQyxhQUFPLElBQUlBLE1BQUssS0FBSyxTQUFRLE9BQU8sQ0FBQyxFQUFFLFNBQVM7QUFBQSxJQUFDO0FBQy9TLElBQUFBLE1BQUssS0FBSyxPQUFPLFlBQVUsRUFBQyxXQUFVLE1BQUssT0FBTSxXQUFVO0FBQUMsV0FBSyxJQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxtQkFBVyxPQUFPLE1BQUksSUFBRUEsTUFBSyxNQUFNLFdBQVcsT0FBTyxDQUFDO0FBQUcsVUFBSSxHQUFFLElBQUUsS0FBSyxJQUFFQSxNQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUUsQ0FBQztBQUFFLFVBQUUsS0FBSztBQUFFLFVBQUUsS0FBSyxJQUFFLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUM7QUFBRSxVQUFHLG1CQUFpQixFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEscUNBQXFDO0FBQUUsVUFBRyxnQkFBYyxPQUFPLGFBQVk7QUFBQyxZQUFJLElBQUUsSUFBSSxZQUFZLENBQUMsR0FBRSxJQUFFO0FBQUUsYUFBSSxJQUFFLE9BQUssS0FBRyxPQUFLLElBQUUsT0FBTSxLQUFHLEdBQUUsS0FBRyxLQUFLLE1BQUssRUFBRSxFQUFFLFNBQVMsS0FDdGYsR0FBRSxNQUFJLElBQUUsRUFBRSxDQUFDLEdBQUUsS0FBRztBQUFFLFVBQUUsT0FBTyxHQUFFLEtBQUcsQ0FBQztBQUFBLE1BQUMsTUFBTSxNQUFJLElBQUUsT0FBSyxLQUFHLE9BQUssSUFBRSxPQUFNLEtBQUcsR0FBRSxLQUFHLEtBQUssTUFBSyxFQUFFLEVBQUUsT0FBTyxHQUFFLEVBQUUsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsVUFBUyxXQUFVO0FBQUMsVUFBSSxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUVBLE1BQUssU0FBUyxPQUFPLEdBQUUsQ0FBQ0EsTUFBSyxTQUFTLFFBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUFFLFdBQUksSUFBRSxFQUFFLFNBQU8sR0FBRSxJQUFFLElBQUcsSUFBSSxHQUFFLEtBQUssQ0FBQztBQUFFLFFBQUUsS0FBSyxDQUFDO0FBQUUsUUFBRSxLQUFLLENBQUM7QUFBRSxRQUFFLEtBQUssS0FBSyxNQUFNLEtBQUssSUFBRSxVQUFXLENBQUM7QUFBRSxXQUFJLEVBQUUsS0FBSyxLQUFLLElBQUUsQ0FBQyxHQUFFLEVBQUUsU0FBUSxNQUFLLEVBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSyxNQUFNO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsVUFBUyxVQUFTLFNBQVEsU0FBUSxVQUFTLFNBQVEsU0FBUSxPQUFPLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRztBQUFBLE1BQUM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUNsZjtBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFPO0FBQUEsTUFBTztBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQ3BmO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxJQUFPLEdBQUUsR0FBRSxXQUFVO0FBQUMsZUFBUyxFQUFFQyxJQUFFO0FBQUMsZUFBTyxjQUFhQSxLQUFFLEtBQUssTUFBTUEsRUFBQyxLQUFHO0FBQUEsTUFBQztBQUFDLGVBQVMsRUFBRUEsSUFBRTtBQUFDLGVBQU8saUJBQWVBLEtBQUUsS0FBSyxNQUFNQSxFQUFDLEtBQUc7QUFBQSxNQUFHO0FBQUMsZUFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEdBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUU7QUFBRyxhQUFJLElBQUUsR0FBRSxJQUFFLEtBQUcsR0FBRSxJQUFJLEtBQUcsTUFBSSxJQUFFLEdBQUU7QUFBQyxjQUFFO0FBQUc7QUFBQSxRQUFLO0FBQUMsY0FBSSxJQUFFLE1BQUksS0FBSyxFQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsR0FBRSxDQUFDLEdBQUUsS0FBSyxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxHQUFFLENBQUMsS0FBRyxLQUFHLEtBQUssR0FBRyxDQUFDLElBQUcsS0FBSyxFQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRSxLQUFLLEVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLElBQUUsQ0FBQyxDQUFDLEtBQUcsS0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFFO0FBQUEsTUFBSTtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLFVBQUksR0FDdmdCLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLEtBQUcsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRTtBQUFFLFVBQUcsZ0JBQWMsT0FBTyxhQUFZO0FBQUMsWUFBRSxNQUFNLEdBQUc7QUFBRSxpQkFBUSxJQUFFLEdBQUUsS0FBRyxHQUFFLElBQUksR0FBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUEsTUFBQyxNQUFNLEtBQUU7QUFBRSxVQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUcsS0FBRyxFQUFFLEtBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsSUFBRSxJQUFFLENBQUM7QUFBQSxhQUFNO0FBQUMsY0FBRSxFQUFFLEtBQUcsSUFBRSxHQUFHO0FBQUUsY0FBSSxJQUFFLEVBQUUsS0FBRyxJQUFFLE1BQUksQ0FBQztBQUFFLGVBQUcsS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxLQUFHLE1BQUk7QUFBRSxjQUFJLEtBQUcsS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxNQUFJLEtBQUcsS0FBRyxNQUFJO0FBQUcsY0FBRSxFQUFFLEtBQUcsSUFBRSxFQUFFO0FBQUUsY0FBSSxJQUFFLEVBQUUsS0FBRyxJQUFFLEtBQUcsQ0FBQyxHQUNuZixLQUFHLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxJQUFFLE1BQUksTUFBSSxNQUFJLEdBQUUsS0FBRyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsSUFBRSxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksSUFBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsR0FBRSxJQUFFLEVBQUUsS0FBRyxJQUFFLE1BQUksQ0FBQztBQUFFLGNBQUUsSUFBRSxFQUFFLEtBQUcsSUFBRSxLQUFHLENBQUM7QUFBRSxjQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBRyxlQUFHO0FBQUUsZUFBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFHLGVBQUc7QUFBRSxlQUFHLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFO0FBQUEsUUFBRTtBQUFDLFVBQUUsSUFBRSxDQUFDLElBQUUsS0FBRztBQUFFLFVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxLQUFHO0FBQUUsWUFBSSxJQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxLQUFHLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxHQUFFLEtBQUcsSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksSUFBRyxLQUFHLEtBQUcsSUFBRSxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxJQUFHLEtBQUcsRUFBRSxJQUFFLENBQUMsR0FBRSxLQUFHLEVBQUUsSUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLE1BQUksS0FBRyxLQUFHLE1BQUksT0FBSyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLEtBQUksSUFBRSxNQUFJLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksT0FBSyxLQUNwZixLQUFHLE1BQUksT0FBSyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsSUFBRyxJQUFFLEtBQUcsS0FBRyxNQUFJLElBQUUsT0FBSyxJQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRyxJQUFFLEtBQUcsTUFBSSxNQUFJLElBQUUsT0FBSyxJQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFJLFlBQUUsSUFBRTtBQUFHLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFHLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUUsSUFBRSxJQUFFO0FBQUUsWUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFLElBQUUsSUFBRTtBQUFFLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUEsTUFBQztBQUFDLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFDbmY7QUFBRSxRQUFFLEVBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsRUFBRSxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxFQUFFLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxFQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUEsSUFBQyxFQUFDO0FBQ3pILElBQUFELE1BQUssS0FBSyxNQUFJLEVBQUMsTUFBSyxPQUFNLEdBQUUsQ0FBQyxHQUFFLGdCQUFlLFNBQVMsR0FBRTtBQUFDLE1BQUFBLE1BQUssS0FBSyxJQUFJLEVBQUUsS0FBSyxDQUFDO0FBQUEsSUFBQyxHQUFFLGtCQUFpQixTQUFTLEdBQUU7QUFBQyxVQUFFQSxNQUFLLEtBQUssSUFBSSxFQUFFLFFBQVEsQ0FBQztBQUFFLFdBQUcsS0FBR0EsTUFBSyxLQUFLLElBQUksRUFBRSxPQUFPLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxJQUFHLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxHQUFFLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxJQUFFQSxNQUFLLFVBQVMsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFO0FBQUUsVUFBRSxLQUFHO0FBQUcsVUFBRSxLQUFHLENBQUM7QUFBRSxVQUFHLElBQUUsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLGtDQUFrQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsR0FBRSxJQUFJO0FBQUMsVUFBRSxLQUFHLE1BQUksSUFBRSxLQUFHO0FBQUcsVUFBRSxFQUFFO0FBQUEsUUFBTTtBQUFBLFFBQ3RmLEtBQUcsS0FBRztBQUFBLE1BQUU7QUFBRSxVQUFFQSxNQUFLLEtBQUssSUFBSSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsVUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLGFBQU8sRUFBRSxPQUFPLEVBQUUsTUFBSyxFQUFFLEdBQUc7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUUsS0FBRztBQUFHLFVBQUUsS0FBRyxDQUFDO0FBQUUsVUFBSSxJQUFFQSxNQUFLLFVBQVMsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFNLEdBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLFNBQVMsR0FBRSxJQUFFLENBQUMsR0FBRSxLQUFHLElBQUUsS0FBRztBQUFFLFVBQUcsSUFBRSxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsa0NBQWtDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxHQUFFLElBQUk7QUFBQyxVQUFFLEtBQUcsTUFBSSxJQUFFLEtBQUc7QUFBRyxVQUFFLEVBQUUsTUFBTSxHQUFFLEtBQUcsS0FBRyxFQUFFO0FBQUUsVUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLFVBQUVBLE1BQUssS0FBSyxJQUFJLEVBQUUsR0FBRSxFQUFFLE1BQUssR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLFVBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFJLENBQUMsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHdCQUF3QjtBQUN4aEIsYUFBTyxFQUFFO0FBQUEsSUFBSSxHQUFFLElBQUcsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUksSUFBRSxDQUFDLEdBQUUsSUFBRUEsTUFBSyxVQUFTLElBQUUsRUFBRTtBQUFFLFVBQUUsQ0FBQyxFQUFFLFFBQVEsSUFBRyxFQUFFLFNBQU8sS0FBRyxLQUFHLElBQUUsS0FBRyxJQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUUsVUFBRSxFQUFFLE9BQU8sR0FBRSxDQUFDO0FBQUUsUUFBRSxDQUFDLEtBQUc7QUFBRSxVQUFFLEVBQUUsUUFBUSxDQUFDO0FBQUUsVUFBRyxFQUFFLE9BQU8sTUFBSSxJQUFFLEVBQUUsVUFBVSxDQUFDLElBQUUsR0FBRSxTQUFPLElBQUUsSUFBRSxDQUFDLEVBQUUsUUFBUSxJQUFHLENBQUMsQ0FBQyxJQUFFLGNBQVksTUFBSSxJQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsUUFBUSxJQUFHLEtBQUssQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLElBQUcsSUFBRSxFQUFFLE9BQU8sR0FBRSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsRUFBRSxLQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUUsRUFBRSxNQUFNLEdBQUUsSUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUVBLE1BQUssVUFBUyxJQUFFLEVBQUU7QUFBRSxXQUFHO0FBQUUsVUFBRyxJQUFFLEtBQUcsSUFBRSxLQUFHLEtBQUcsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHlCQUF5QjtBQUNuZixVQUFHLGFBQVcsRUFBRSxVQUFRLGFBQVcsRUFBRSxPQUFPLE9BQU0sSUFBSUEsTUFBSyxVQUFVLElBQUksd0NBQXdDO0FBQUUsVUFBRUEsTUFBSyxLQUFLLElBQUksR0FBRyxHQUFFLEdBQUUsR0FBRSxHQUFFLEVBQUUsVUFBVSxDQUFDLElBQUUsR0FBRSxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBRyxFQUFFLEtBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRSxFQUFFLE1BQU0sR0FBRSxJQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRSxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFBRSxhQUFPLEVBQUUsTUFBTSxHQUFFLElBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLEdBQUUsSUFBRUEsTUFBSztBQUFTLFVBQUUsRUFBRTtBQUFFLFVBQUksSUFBRSxFQUFFLFFBQU8sSUFBRSxFQUFFLFVBQVUsQ0FBQyxHQUFFLElBQUUsSUFBRSxJQUFHLElBQUU7QUFBRSxVQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsUUFBUSxHQUFFLElBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFFLENBQUM7QUFBRSxVQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFFLEdBQUUsQ0FBQztBQUFFLFVBQUcsQ0FBQyxFQUFFLFFBQU0sRUFBQyxLQUFJLEdBQUUsTUFBSyxDQUFDLEVBQUM7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBRyxFQUFFLEtBQUUsTUFBSUEsTUFBSyxLQUFLLElBQUksR0FBRyxJQUNyZ0IsQ0FBQyxHQUFFLEtBQUcsSUFBRyxFQUFFLENBQUMsS0FBSSxJQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLEdBQUUsRUFBRSxJQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsR0FBRSxFQUFFLElBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDO0FBQUUsYUFBTSxFQUFDLEtBQUksR0FBRSxNQUFLLEVBQUUsTUFBTSxHQUFFLENBQUMsRUFBQztBQUFBLElBQUMsRUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxPQUFLLFNBQVMsR0FBRSxHQUFFO0FBQUMsV0FBSyxJQUFFLElBQUUsS0FBR0EsTUFBSyxLQUFLO0FBQU8sVUFBSSxJQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsWUFBVTtBQUFHLFdBQUssSUFBRSxDQUFDLElBQUksS0FBRSxJQUFJLEdBQUM7QUFBRSxRQUFFLFNBQU8sTUFBSSxJQUFFLEVBQUUsS0FBSyxDQUFDO0FBQUcsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLFdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFO0FBQVcsV0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxJQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQztBQUMzWSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFVBQVFBLE1BQUssS0FBSyxLQUFLLFVBQVUsTUFBSSxTQUFTLEdBQUU7QUFBQyxVQUFHLEtBQUssRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHlDQUF5QztBQUFFLFdBQUssT0FBTyxDQUFDO0FBQUUsYUFBTyxLQUFLLE9BQU8sQ0FBQztBQUFBLElBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFFBQU0sV0FBVTtBQUFDLFdBQUssSUFBRSxJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxJQUFFO0FBQUEsSUFBRTtBQUFFLElBQUFBLE1BQUssS0FBSyxLQUFLLFVBQVUsU0FBTyxTQUFTLEdBQUU7QUFBQyxXQUFLLElBQUU7QUFBRyxXQUFLLEVBQUUsT0FBTyxDQUFDO0FBQUEsSUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxLQUFLLFVBQVUsU0FBTyxXQUFVO0FBQUMsVUFBSSxJQUFFLEtBQUssRUFBRSxTQUFTLEdBQUUsSUFBRyxJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUcsT0FBTyxDQUFDLEVBQUUsU0FBUztBQUFFLFdBQUssTUFBTTtBQUFFLGFBQU87QUFBQSxJQUFDO0FBQ3ZlLElBQUFBLE1BQUssS0FBSyxTQUFPLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBRSxLQUFHO0FBQUksVUFBRyxJQUFFLEtBQUcsSUFBRSxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsMEJBQTBCO0FBQUUsbUJBQVcsT0FBTyxNQUFJLElBQUVBLE1BQUssTUFBTSxXQUFXLE9BQU8sQ0FBQztBQUFHLG1CQUFXLE9BQU8sTUFBSSxJQUFFQSxNQUFLLE1BQU0sV0FBVyxPQUFPLENBQUM7QUFBRyxVQUFFLEtBQUdBLE1BQUssS0FBSztBQUFLLFVBQUUsSUFBSSxFQUFFLENBQUM7QUFBRSxVQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRUEsTUFBSztBQUFTLFdBQUksSUFBRSxHQUFFLEtBQUcsRUFBRSxVQUFRLEtBQUcsSUFBRyxLQUFJO0FBQUMsWUFBRSxJQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUUsYUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksTUFBSSxJQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksR0FBRSxDQUFDLEtBQUcsRUFBRSxDQUFDO0FBQUUsWUFBRSxFQUFFLE9BQU8sQ0FBQztBQUFBLE1BQUM7QUFBQyxZQUFJLElBQUUsRUFBRSxNQUFNLEdBQUUsQ0FBQztBQUFHLGFBQU87QUFBQSxJQUFDO0FBQ25kLElBQUFBLE1BQUssT0FBSyxTQUFTLEdBQUU7QUFBQyxXQUFLLElBQUUsQ0FBQyxJQUFJQSxNQUFLLEtBQUssUUFBTTtBQUFFLFdBQUssSUFBRSxDQUFDLENBQUM7QUFBRSxXQUFLLElBQUU7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRSxDQUFDO0FBQUUsV0FBSyxJQUFFLEtBQUssSUFBRSxLQUFLLElBQUUsS0FBSyxLQUFHO0FBQUUsV0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsV0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFPLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRTtBQUFHLFdBQUssSUFBRSxFQUFDLFVBQVMsQ0FBQyxHQUFFLFFBQU8sQ0FBQyxFQUFDO0FBQUUsV0FBSyxJQUFFLEtBQUssS0FBRztBQUFFLFdBQUssSUFBRTtBQUFFLFdBQUssSUFB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QUFDNUMsWUFBUSxHQUFHO0FBQUEsRUFDYjtBQUVBLE1BQUksTUFBTSxLQUFLLHFEQUFrQztBQUMvQztBQUFBLE1BQ0UsSUFBSSxTQUFTLDZCQUE2QixFQUFFLE9BQU8sTUFBTSxLQUFLLE1BQU0sQ0FBQztBQUFBLElBQ3ZFO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxpQkFBaUIsTUFDckIsT0FBTyxPQUFPLEtBQUssRUFBRTtBQUFBLEVBQU8sQ0FBQyxTQUMzQixLQUFLO0FBQ1A7QUFFSyxJQUFNLHNCQUFzQixDQUFDLGNBQ2xDLE9BQU8sS0FBSyxlQUFlLENBQUMsRUFBRSxRQUFRLFNBQVM7IiwKICAibmFtZXMiOiBbIlJlZmxlY3RBcHBseSIsICJSZWZsZWN0T3duS2V5cyIsICJOdW1iZXJJc05hTiIsICJFdmVudEVtaXR0ZXIiLCAiZXZlbnRzIiwgImVyciIsICJvbmNlIiwgInNqY2wiLCAiYSIsICJpbXBvcnRfZXZlbnRzIiwgInJlc3VtZSIsICJ2IiwgIm9rIiwgImVyciIsICJSZXN1bHQiLCAiZnJvbVRocm93YWJsZSIsICJvayIsICJlcnIiLCAiSm9iU3RhdHVzIiwgIkV2ZW50RW1pdHRlciIsICJDcnlwdG9BbGdvcml0aG0iLCAib2JqIiwgInNqY2wiLCAiZ2VuZXJhdGVLZXkiLCAiaGFzaFBhc3N3b3JkIiwgImdlbmVyYXRlS2V5IiwgImhhc2hQYXNzd29yZCIsICJFdmVudEVtaXR0ZXIiLCAiZmlsZXMiLCAiaGFzaFBhc3N3b3JkIiwgImdlbmVyYXRlS2V5IiwgInBhc3N3b3JkIl0KfQo=
