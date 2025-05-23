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

// src/worker/shared.ts
var import_events = __toESM(require_events());
var events = new import_events.default();
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
          encryptedData.data = Decode(encryptedData.data);
        }
        return decrypt3(lufiFile.keys.client, encryptedData).andThen(
          (decryptedPart) => {
            const buffer = typeof decryptedPart === "string" ? new TextEncoder().encode(decryptedPart).buffer : decryptedPart;
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
            events.emit("CHUNK_DOWNLOADED" /* CHUNK_DOWNLOADED */, buffer, metadata.part);
            if (lufiFile.chunksReady === metadata.total) {
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
var cancelUpload = (lufiFile) => {
  return sendMessage(
    uploadSocketUrl(lufiFile),
    lufiFile,
    `${JSON.stringify({
      id: lufiFile.keys.server,
      mod_token: lufiFile.actionToken,
      cancel: true,
      i: lufiFile.queueIndex
    })}XXMOJOXXuseless`
  );
};
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
var sendMessage = (socketUrl, lufiFile, message) => {
  if (!isSpawned(socketUrl)) {
    return spawn(socketUrl).andThen(() => {
      sockets[socketUrl].onmessage = (e) => onMessage(e, lufiFile);
      return sendMessage(socketUrl, lufiFile, message);
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
var isServerDownloadChunkSuccessMetadata = (message) => typeof message === "object" && message !== null && !("msg" in message);

// src/worker/cancel.ts
var isInitiated = false;
self.onmessage = (event) => {
  if (!isInitiated) {
    init();
    isInitiated = true;
  }
  events.on("UPLOAD_CANCELLED" /* UPLOAD_CANCELLED */, (success) => {
    self.postMessage({ event: "UPLOAD_CANCELLED" /* UPLOAD_CANCELLED */, success });
  });
  cancelUpload2(event.data).mapErr((error) => {
    self.postMessage({
      event: "OPERATION_FAILED" /* OPERATION_FAILED */,
      error
    });
  });
};
var cancelUpload2 = (workerMessage) => cancelUpload(workerMessage.args.lufiFile);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vbHVmaS1zamNsQDEuMC44L25vZGVfbW9kdWxlcy9sdWZpLXNqY2wvc2pjbC5qcyIsICIuLi8uLi9zcmMvd29ya2VyL3NoYXJlZC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vbmV2ZXJ0aHJvd0A4LjEuMS9ub2RlX21vZHVsZXMvbmV2ZXJ0aHJvdy9kaXN0L2luZGV4LmVzLmpzIiwgIi4uLy4uL3NyYy9lcnJvci9iYXNlLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWNvbm5lY3Rpb24tZXJyb3IudHMiLCAiLi4vLi4vc3JjL3V0aWxzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9hcnJheWJ1ZmZlci1lbmNvZGluZ0AxLjEuMC9ub2RlX21vZHVsZXMvYXJyYXlidWZmZXItZW5jb2Rpbmcvc3JjL2Jhc2U2NC9lbmNvZGluZy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vYXJyYXlidWZmZXItZW5jb2RpbmdAMS4xLjAvbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLWVuY29kaW5nL3NyYy9iYXNlNjQvc3RhbmRhcmQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2FycmF5YnVmZmVyLWVuY29kaW5nQDEuMS4wL25vZGVfbW9kdWxlcy9hcnJheWJ1ZmZlci1lbmNvZGluZy9zcmMvYmFzZTY0L3VybC50cyIsICIuLi8uLi9zcmMvYXBpL2NyeXB0by9zamNsLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vZGVjcnlwdGlvbi1lcnJvci50cyIsICIuLi8uLi9zcmMvYXBpL2NyeXB0by93ZWIudHMiLCAiLi4vLi4vc3JjL2FwaS9jcnlwdG8udHMiLCAiLi4vLi4vc3JjL2FwaS93ZWJzb2NrZXQudHMiLCAiLi4vLi4vc3JjL3dvcmtlci9jYW5jZWwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7dmFyIHNqY2w9e2NpcGhlcjp7fSxoYXNoOnt9LGtleWV4Y2hhbmdlOnt9LG1vZGU6e30sbWlzYzp7fSxjb2RlYzp7fSxleGNlcHRpb246e2NvcnJ1cHQ6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiQ09SUlVQVDogXCIrdGhpcy5tZXNzYWdlfTt0aGlzLm1lc3NhZ2U9YX0saW52YWxpZDpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJJTlZBTElEOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfSxidWc6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiQlVHOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfSxub3RSZWFkeTpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJOT1QgUkVBRFk6IFwiK3RoaXMubWVzc2FnZX07dGhpcy5tZXNzYWdlPWF9fX07XG5zamNsLmNpcGhlci5hZXM9ZnVuY3Rpb24oYSl7dGhpcy53WzBdWzBdWzBdfHx0aGlzLkMoKTt2YXIgYixjLGQsZSxmPXRoaXMud1swXVs0XSxnPXRoaXMud1sxXTtiPWEubGVuZ3RoO3ZhciBoPTE7aWYoNCE9PWImJjYhPT1iJiY4IT09Yil0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImludmFsaWQgYWVzIGtleSBzaXplXCIpO3RoaXMuYj1bZD1hLnNsaWNlKDApLGU9W11dO2ZvcihhPWI7YTw0KmIrMjg7YSsrKXtjPWRbYS0xXTtpZigwPT09YSVifHw4PT09YiYmND09PWElYiljPWZbYz4+PjI0XTw8MjReZltjPj4xNiYyNTVdPDwxNl5mW2M+PjgmMjU1XTw8OF5mW2MmMjU1XSwwPT09YSViJiYoYz1jPDw4XmM+Pj4yNF5oPDwyNCxoPWg8PDFeMjgzKihoPj43KSk7ZFthXT1kW2EtYl1eY31mb3IoYj0wO2E7YisrLGEtLSljPWRbYiYzP2E6YS00XSxlW2JdPTQ+PWF8fDQ+Yj9jOmdbMF1bZltjPj4+MjRdXV5nWzFdW2ZbYz4+MTYmMjU1XV1eZ1syXVtmW2M+PjgmMjU1XV1eZ1szXVtmW2MmXG4yNTVdXX07XG5zamNsLmNpcGhlci5hZXMucHJvdG90eXBlPXtlbmNyeXB0OmZ1bmN0aW9uKGEpe3JldHVybiBhYSh0aGlzLGEsMCl9LGRlY3J5cHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIGFhKHRoaXMsYSwxKX0sdzpbW1tdLFtdLFtdLFtdLFtdXSxbW10sW10sW10sW10sW11dXSxDOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy53WzBdLGI9dGhpcy53WzFdLGM9YVs0XSxkPWJbNF0sZSxmLGcsaD1bXSxrPVtdLG4sbCxtLHA7Zm9yKGU9MDsweDEwMD5lO2UrKylrWyhoW2VdPWU8PDFeMjgzKihlPj43KSleZV09ZTtmb3IoZj1nPTA7IWNbZl07Zl49bnx8MSxnPWtbZ118fDEpZm9yKG09Z15nPDwxXmc8PDJeZzw8M15nPDw0LG09bT4+OF5tJjI1NV45OSxjW2ZdPW0sZFttXT1mLGw9aFtlPWhbbj1oW2ZdXV0scD0weDEwMTAxMDEqbF4weDEwMDAxKmVeMHgxMDEqbl4weDEwMTAxMDAqZixsPTB4MTAxKmhbbV1eMHgxMDEwMTAwKm0sZT0wOzQ+ZTtlKyspYVtlXVtmXT1sPWw8PDI0Xmw+Pj44LGJbZV1bbV09cD1wPDwyNF5wPj4+ODtmb3IoZT1cbjA7NT5lO2UrKylhW2VdPWFbZV0uc2xpY2UoMCksYltlXT1iW2VdLnNsaWNlKDApfX07XG5mdW5jdGlvbiBhYShhLGIsYyl7aWYoNCE9PWIubGVuZ3RoKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiaW52YWxpZCBhZXMgYmxvY2sgc2l6ZVwiKTt2YXIgZD1hLmJbY10sZT1iWzBdXmRbMF0sZj1iW2M/MzoxXV5kWzFdLGc9YlsyXV5kWzJdO2I9YltjPzE6M11eZFszXTt2YXIgaCxrLG4sbD1kLmxlbmd0aC80LTIsbSxwPTQsej1bMCwwLDAsMF07aD1hLndbY107YT1oWzBdO3ZhciBBPWhbMV0sQz1oWzJdLEI9aFszXSxEPWhbNF07Zm9yKG09MDttPGw7bSsrKWg9YVtlPj4+MjRdXkFbZj4+MTYmMjU1XV5DW2c+PjgmMjU1XV5CW2ImMjU1XV5kW3BdLGs9YVtmPj4+MjRdXkFbZz4+MTYmMjU1XV5DW2I+PjgmMjU1XV5CW2UmMjU1XV5kW3ArMV0sbj1hW2c+Pj4yNF1eQVtiPj4xNiYyNTVdXkNbZT4+OCYyNTVdXkJbZiYyNTVdXmRbcCsyXSxiPWFbYj4+PjI0XV5BW2U+PjE2JjI1NV1eQ1tmPj44JjI1NV1eQltnJjI1NV1eZFtwKzNdLHArPTQsZT1oLGY9ayxnPW47Zm9yKG09XG4wOzQ+bTttKyspeltjPzMmLW06bV09RFtlPj4+MjRdPDwyNF5EW2Y+PjE2JjI1NV08PDE2XkRbZz4+OCYyNTVdPDw4XkRbYiYyNTVdXmRbcCsrXSxoPWUsZT1mLGY9ZyxnPWIsYj1oO3JldHVybiB6fVxuc2pjbC5iaXRBcnJheT17Yml0U2xpY2U6ZnVuY3Rpb24oYSxiLGMpe2E9c2pjbC5iaXRBcnJheS5ZKGEuc2xpY2UoYi8zMiksMzItKGImMzEpKS5zbGljZSgxKTtyZXR1cm4gdm9pZCAwPT09Yz9hOnNqY2wuYml0QXJyYXkuY2xhbXAoYSxjLWIpfSxleHRyYWN0OmZ1bmN0aW9uKGEsYixjKXt2YXIgZD1NYXRoLmZsb29yKC1iLWMmMzEpO3JldHVybigoYitjLTFeYikmLTMyP2FbYi8zMnwwXTw8MzItZF5hW2IvMzIrMXwwXT4+PmQ6YVtiLzMyfDBdPj4+ZCkmKDE8PGMpLTF9LGNvbmNhdDpmdW5jdGlvbihhLGIpe2lmKDA9PT1hLmxlbmd0aHx8MD09PWIubGVuZ3RoKXJldHVybiBhLmNvbmNhdChiKTt2YXIgYz1hW2EubGVuZ3RoLTFdLGQ9c2pjbC5iaXRBcnJheS5nZXRQYXJ0aWFsKGMpO3JldHVybiAzMj09PWQ/YS5jb25jYXQoYik6c2pjbC5iaXRBcnJheS5ZKGIsZCxjfDAsYS5zbGljZSgwLGEubGVuZ3RoLTEpKX0sYml0TGVuZ3RoOmZ1bmN0aW9uKGEpe3ZhciBiPWEubGVuZ3RoO3JldHVybiAwPT09XG5iPzA6MzIqKGItMSkrc2pjbC5iaXRBcnJheS5nZXRQYXJ0aWFsKGFbYi0xXSl9LGNsYW1wOmZ1bmN0aW9uKGEsYil7aWYoMzIqYS5sZW5ndGg8YilyZXR1cm4gYTthPWEuc2xpY2UoMCxNYXRoLmNlaWwoYi8zMikpO3ZhciBjPWEubGVuZ3RoO2I9YiYzMTswPGMmJmImJihhW2MtMV09c2pjbC5iaXRBcnJheS5wYXJ0aWFsKGIsYVtjLTFdJjIxNDc0ODM2NDg+PmItMSwxKSk7cmV0dXJuIGF9LHBhcnRpYWw6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiAzMj09PWE/YjooYz9ifDA6Yjw8MzItYSkrMHgxMDAwMDAwMDAwMCphfSxnZXRQYXJ0aWFsOmZ1bmN0aW9uKGEpe3JldHVybiBNYXRoLnJvdW5kKGEvMHgxMDAwMDAwMDAwMCl8fDMyfSxlcXVhbDpmdW5jdGlvbihhLGIpe2lmKHNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpIT09c2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYikpcmV0dXJuITE7dmFyIGM9MCxkO2ZvcihkPTA7ZDxhLmxlbmd0aDtkKyspY3w9YVtkXV5iW2RdO3JldHVybiAwPT09XG5jfSxZOmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlO2U9MDtmb3Iodm9pZCAwPT09ZCYmKGQ9W10pOzMyPD1iO2ItPTMyKWQucHVzaChjKSxjPTA7aWYoMD09PWIpcmV0dXJuIGQuY29uY2F0KGEpO2ZvcihlPTA7ZTxhLmxlbmd0aDtlKyspZC5wdXNoKGN8YVtlXT4+PmIpLGM9YVtlXTw8MzItYjtlPWEubGVuZ3RoP2FbYS5sZW5ndGgtMV06MDthPXNqY2wuYml0QXJyYXkuZ2V0UGFydGlhbChlKTtkLnB1c2goc2pjbC5iaXRBcnJheS5wYXJ0aWFsKGIrYSYzMSwzMjxiK2E/YzpkLnBvcCgpLDEpKTtyZXR1cm4gZH0sUDpmdW5jdGlvbihhLGIpe3JldHVyblthWzBdXmJbMF0sYVsxXV5iWzFdLGFbMl1eYlsyXSxhWzNdXmJbM11dfSxieXRlc3dhcE06ZnVuY3Rpb24oYSl7dmFyIGIsYztmb3IoYj0wO2I8YS5sZW5ndGg7KytiKWM9YVtiXSxhW2JdPWM+Pj4yNHxjPj4+OCYweGZmMDB8KGMmMHhmZjAwKTw8OHxjPDwyNDtyZXR1cm4gYX19O1xuc2pjbC5jb2RlYy51dGY4U3RyaW5nPXtmcm9tQml0czpmdW5jdGlvbihhKXt2YXIgYj1cIlwiLGM9c2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSksZCxlO2ZvcihkPTA7ZDxjLzg7ZCsrKTA9PT0oZCYzKSYmKGU9YVtkLzRdKSxiKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGU+Pj44Pj4+OD4+PjgpLGU8PD04O3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGIpKX0sdG9CaXRzOmZ1bmN0aW9uKGEpe2E9dW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGEpKTt2YXIgYj1bXSxjLGQ9MDtmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWQ9ZDw8OHxhLmNoYXJDb2RlQXQoYyksMz09PShjJjMpJiYoYi5wdXNoKGQpLGQ9MCk7YyYzJiZiLnB1c2goc2pjbC5iaXRBcnJheS5wYXJ0aWFsKDgqKGMmMyksZCkpO3JldHVybiBifX07XG5zamNsLmNvZGVjLmhleD17ZnJvbUJpdHM6ZnVuY3Rpb24oYSl7dmFyIGI9XCJcIixjO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspYis9KChhW2NdfDApKzB4ZjAwMDAwMDAwMDAwKS50b1N0cmluZygxNikuc3Vic3RyKDQpO3JldHVybiBiLnN1YnN0cigwLHNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpLzQpfSx0b0JpdHM6ZnVuY3Rpb24oYSl7dmFyIGIsYz1bXSxkO2E9YS5yZXBsYWNlKC9cXHN8MHgvZyxcIlwiKTtkPWEubGVuZ3RoO2E9YStcIjAwMDAwMDAwXCI7Zm9yKGI9MDtiPGEubGVuZ3RoO2IrPTgpYy5wdXNoKHBhcnNlSW50KGEuc3Vic3RyKGIsOCksMTYpXjApO3JldHVybiBzamNsLmJpdEFycmF5LmNsYW1wKGMsNCpkKX19O1xuc2pjbC5jb2RlYy5iYXNlNjQ9e1M6XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIsZnJvbUJpdHM6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPVwiXCIsZT0wLGY9c2pjbC5jb2RlYy5iYXNlNjQuUyxnPTAsaD1zamNsLmJpdEFycmF5LmJpdExlbmd0aChhKTtjJiYoZj1mLnN1YnN0cigwLDYyKStcIi1fXCIpO2ZvcihjPTA7NipkLmxlbmd0aDxoOylkKz1mLmNoYXJBdCgoZ15hW2NdPj4+ZSk+Pj4yNiksNj5lPyhnPWFbY108PDYtZSxlKz0yNixjKyspOihnPDw9NixlLT02KTtmb3IoO2QubGVuZ3RoJjMmJiFiOylkKz1cIj1cIjtyZXR1cm4gZH0sdG9CaXRzOmZ1bmN0aW9uKGEsYil7YT1hLnJlcGxhY2UoL1xcc3w9L2csXCJcIik7dmFyIGM9W10sZCxlPTAsZj1zamNsLmNvZGVjLmJhc2U2NC5TLGc9MCxoO2ImJihmPWYuc3Vic3RyKDAsNjIpK1wiLV9cIik7Zm9yKGQ9MDtkPGEubGVuZ3RoO2QrKyl7aD1mLmluZGV4T2YoYS5jaGFyQXQoZCkpO1xuaWYoMD5oKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwidGhpcyBpc24ndCBiYXNlNjQhXCIpOzI2PGU/KGUtPTI2LGMucHVzaChnXmg+Pj5lKSxnPWg8PDMyLWUpOihlKz02LGdePWg8PDMyLWUpfWUmNTYmJmMucHVzaChzamNsLmJpdEFycmF5LnBhcnRpYWwoZSY1NixnLDEpKTtyZXR1cm4gY319O3NqY2wuY29kZWMuYmFzZTY0dXJsPXtmcm9tQml0czpmdW5jdGlvbihhKXtyZXR1cm4gc2pjbC5jb2RlYy5iYXNlNjQuZnJvbUJpdHMoYSwxLDEpfSx0b0JpdHM6ZnVuY3Rpb24oYSl7cmV0dXJuIHNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhhLDEpfX07c2pjbC5oYXNoLnNoYTI1Nj1mdW5jdGlvbihhKXt0aGlzLmJbMF18fHRoaXMuQygpO2E/KHRoaXMuZz1hLmcuc2xpY2UoMCksdGhpcy5mPWEuZi5zbGljZSgwKSx0aGlzLmM9YS5jKTp0aGlzLnJlc2V0KCl9O3NqY2wuaGFzaC5zaGEyNTYuaGFzaD1mdW5jdGlvbihhKXtyZXR1cm4obmV3IHNqY2wuaGFzaC5zaGEyNTYpLnVwZGF0ZShhKS5maW5hbGl6ZSgpfTtcbnNqY2wuaGFzaC5zaGEyNTYucHJvdG90eXBlPXtibG9ja1NpemU6NTEyLHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5nPXRoaXMuby5zbGljZSgwKTt0aGlzLmY9W107dGhpcy5jPTA7cmV0dXJuIHRoaXN9LHVwZGF0ZTpmdW5jdGlvbihhKXtcInN0cmluZ1wiPT09dHlwZW9mIGEmJihhPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYSkpO3ZhciBiLGM9dGhpcy5mPXNqY2wuYml0QXJyYXkuY29uY2F0KHRoaXMuZixhKTtiPXRoaXMuYzthPXRoaXMuYz1iK3NqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpO2lmKDB4MWZmZmZmZmZmZmZmZmY8YSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcIkNhbm5vdCBoYXNoIG1vcmUgdGhhbiAyXjUzIC0gMSBiaXRzXCIpO2lmKFwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe3ZhciBkPW5ldyBVaW50MzJBcnJheShjKSxlPTA7Zm9yKGI9NTEyK2ItKDUxMitiJjB4MWZmKTtiPD1hO2IrPTUxMil0aGlzLmwoZC5zdWJhcnJheSgxNiplLFxuMTYqKGUrMSkpKSxlKz0xO2Muc3BsaWNlKDAsMTYqZSl9ZWxzZSBmb3IoYj01MTIrYi0oNTEyK2ImMHgxZmYpO2I8PWE7Yis9NTEyKXRoaXMubChjLnNwbGljZSgwLDE2KSk7cmV0dXJuIHRoaXN9LGZpbmFsaXplOmZ1bmN0aW9uKCl7dmFyIGEsYj10aGlzLmYsYz10aGlzLmcsYj1zamNsLmJpdEFycmF5LmNvbmNhdChiLFtzamNsLmJpdEFycmF5LnBhcnRpYWwoMSwxKV0pO2ZvcihhPWIubGVuZ3RoKzI7YSYxNTthKyspYi5wdXNoKDApO2IucHVzaChNYXRoLmZsb29yKHRoaXMuYy8weDEwMDAwMDAwMCkpO2ZvcihiLnB1c2godGhpcy5jfDApO2IubGVuZ3RoOyl0aGlzLmwoYi5zcGxpY2UoMCwxNikpO3RoaXMucmVzZXQoKTtyZXR1cm4gY30sbzpbXSxiOltdLEM6ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEpe3JldHVybiAweDEwMDAwMDAwMCooYS1NYXRoLmZsb29yKGEpKXwwfWZvcih2YXIgYj0wLGM9MixkLGU7NjQ+YjtjKyspe2U9ITA7Zm9yKGQ9MjtkKmQ8PWM7ZCsrKWlmKDA9PT1jJWQpe2U9XG4hMTticmVha31lJiYoOD5iJiYodGhpcy5vW2JdPWEoTWF0aC5wb3coYywuNSkpKSx0aGlzLmJbYl09YShNYXRoLnBvdyhjLDEvMykpLGIrKyl9fSxsOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlPXRoaXMuZyxmPXRoaXMuYixnPWVbMF0saD1lWzFdLGs9ZVsyXSxuPWVbM10sbD1lWzRdLG09ZVs1XSxwPWVbNl0sej1lWzddO2ZvcihiPTA7NjQ+YjtiKyspMTY+Yj9jPWFbYl06KGM9YVtiKzEmMTVdLGQ9YVtiKzE0JjE1XSxjPWFbYiYxNV09KGM+Pj43XmM+Pj4xOF5jPj4+M15jPDwyNV5jPDwxNCkrKGQ+Pj4xN15kPj4+MTleZD4+PjEwXmQ8PDE1XmQ8PDEzKSthW2ImMTVdK2FbYis5JjE1XXwwKSxjPWMreisobD4+PjZebD4+PjExXmw+Pj4yNV5sPDwyNl5sPDwyMV5sPDw3KSsocF5sJihtXnApKStmW2JdLHo9cCxwPW0sbT1sLGw9bitjfDAsbj1rLGs9aCxoPWcsZz1jKyhoJmtebiYoaF5rKSkrKGg+Pj4yXmg+Pj4xM15oPj4+MjJeaDw8MzBeaDw8MTleaDw8MTApfDA7ZVswXT1lWzBdK2d8XG4wO2VbMV09ZVsxXStofDA7ZVsyXT1lWzJdK2t8MDtlWzNdPWVbM10rbnwwO2VbNF09ZVs0XStsfDA7ZVs1XT1lWzVdK218MDtlWzZdPWVbNl0rcHwwO2VbN109ZVs3XSt6fDB9fTtzamNsLmhhc2guc2hhNTEyPWZ1bmN0aW9uKGEpe3RoaXMuYlswXXx8dGhpcy5DKCk7YT8odGhpcy5nPWEuZy5zbGljZSgwKSx0aGlzLmY9YS5mLnNsaWNlKDApLHRoaXMuYz1hLmMpOnRoaXMucmVzZXQoKX07c2pjbC5oYXNoLnNoYTUxMi5oYXNoPWZ1bmN0aW9uKGEpe3JldHVybihuZXcgc2pjbC5oYXNoLnNoYTUxMikudXBkYXRlKGEpLmZpbmFsaXplKCl9O1xuc2pjbC5oYXNoLnNoYTUxMi5wcm90b3R5cGU9e2Jsb2NrU2l6ZToxMDI0LHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5nPXRoaXMuby5zbGljZSgwKTt0aGlzLmY9W107dGhpcy5jPTA7cmV0dXJuIHRoaXN9LHVwZGF0ZTpmdW5jdGlvbihhKXtcInN0cmluZ1wiPT09dHlwZW9mIGEmJihhPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYSkpO3ZhciBiLGM9dGhpcy5mPXNqY2wuYml0QXJyYXkuY29uY2F0KHRoaXMuZixhKTtiPXRoaXMuYzthPXRoaXMuYz1iK3NqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpO2lmKDB4MWZmZmZmZmZmZmZmZmY8YSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcIkNhbm5vdCBoYXNoIG1vcmUgdGhhbiAyXjUzIC0gMSBiaXRzXCIpO2lmKFwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe3ZhciBkPW5ldyBVaW50MzJBcnJheShjKSxlPTA7Zm9yKGI9MTAyNCtiLSgxMDI0K2ImMTAyMyk7Yjw9YTtiKz0xMDI0KXRoaXMubChkLnN1YmFycmF5KDMyKlxuZSwzMiooZSsxKSkpLGUrPTE7Yy5zcGxpY2UoMCwzMiplKX1lbHNlIGZvcihiPTEwMjQrYi0oMTAyNCtiJjEwMjMpO2I8PWE7Yis9MTAyNCl0aGlzLmwoYy5zcGxpY2UoMCwzMikpO3JldHVybiB0aGlzfSxmaW5hbGl6ZTpmdW5jdGlvbigpe3ZhciBhLGI9dGhpcy5mLGM9dGhpcy5nLGI9c2pjbC5iaXRBcnJheS5jb25jYXQoYixbc2pjbC5iaXRBcnJheS5wYXJ0aWFsKDEsMSldKTtmb3IoYT1iLmxlbmd0aCs0O2EmMzE7YSsrKWIucHVzaCgwKTtiLnB1c2goMCk7Yi5wdXNoKDApO2IucHVzaChNYXRoLmZsb29yKHRoaXMuYy8weDEwMDAwMDAwMCkpO2ZvcihiLnB1c2godGhpcy5jfDApO2IubGVuZ3RoOyl0aGlzLmwoYi5zcGxpY2UoMCwzMikpO3RoaXMucmVzZXQoKTtyZXR1cm4gY30sbzpbXSxpYTpbMTIzNzIyMzIsMTMyODEwODMsOTc2Mjg1OSwxOTE0NjA5LDE1MTA2NzY5LDQwOTA5MTEsNDMwODMzMSw4MjY2MTA1XSxiOltdLGthOlsyNjY2MDE4LDE1Njg5MTY1LDUwNjE0MjMsOTAzNDY4NCxcbjQ3NjQ5ODQsMzgwOTUzLDE2NTg3NzksNzE3NjQ3MiwxOTcxODYsNzM2ODYzOCwxNDk4NzkxNiwxNjc1Nzk4Niw4MDk2MTExLDE0ODAzNjksMTMwNDYzMjUsNjg5MTE1NiwxNTgxMzMzMCw1MTg3MDQzLDkyMjk3NDksMTEzMTIyMjksMjgxODY3NywxMDkzNzQ3NSw0MzI0MzA4LDExMzU1NDEsNjc0MTkzMSwxMTgwOTI5NiwxNjQ1ODA0NywxNTY2NjkxNiwxMTA0Njg1MCw2OTgxNDksMjI5OTk5LDk0NTc3NiwxMzc3NDg0NCwyNTQxODYyLDEyODU2MDQ1LDk4MTA5MTEsMTE0OTQzNjYsNzg0NDUyMCwxNTU3NjgwNiw4NTMzMzA3LDE1Nzk1MDQ0LDQzMzc2NjUsMTYyOTE3MjksNTU1MzcxMiwxNTY4NDEyMCw2NjYyNDE2LDc0MTM4MDIsMTIzMDg5MjAsMTM4MTYwMDgsNDMwMzY5OSw5MzY2NDI1LDEwMTc2NjgwLDEzMTk1ODc1LDQyOTUzNzEsNjU0NjI5MSwxMTcxMjY3NSwxNTcwODkyNCwxNTE5NDU2LDE1NzcyNTMwLDY1Njg0MjgsNjQ5NTc4NCw4NTY4Mjk3LDEzMDA3MTI1LDc0OTIzOTUsMjUxNTM1NixcbjEyNjMyNTgzLDE0NzQwMjU0LDcyNjI1ODQsMTUzNTkzMCwxMzE0NjI3OCwxNjMyMTk2NiwxODUzMjExLDI5NDI3NiwxMzA1MTAyNywxMzIyMTU2NCwxMDUxOTgwLDQwODAzMTAsNjY1MTQzNCwxNDA4ODk0MCw0Njc1NjA3XSxDOmZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhKXtyZXR1cm4gMHgxMDAwMDAwMDAqKGEtTWF0aC5mbG9vcihhKSl8MH1mdW5jdGlvbiBiKGEpe3JldHVybiAweDEwMDAwMDAwMDAwKihhLU1hdGguZmxvb3IoYSkpJjI1NX1mb3IodmFyIGM9MCxkPTIsZSxmOzgwPmM7ZCsrKXtmPSEwO2ZvcihlPTI7ZSplPD1kO2UrKylpZigwPT09ZCVlKXtmPSExO2JyZWFrfWYmJig4PmMmJih0aGlzLm9bMipjXT1hKE1hdGgucG93KGQsLjUpKSx0aGlzLm9bMipjKzFdPWIoTWF0aC5wb3coZCwuNSkpPDwyNHx0aGlzLmlhW2NdKSx0aGlzLmJbMipjXT1hKE1hdGgucG93KGQsMS8zKSksdGhpcy5iWzIqYysxXT1iKE1hdGgucG93KGQsMS8zKSk8PDI0fHRoaXMua2FbY10sYysrKX19LGw6ZnVuY3Rpb24oYSl7dmFyIGIsXG5jLGQ9dGhpcy5nLGU9dGhpcy5iLGY9ZFswXSxnPWRbMV0saD1kWzJdLGs9ZFszXSxuPWRbNF0sbD1kWzVdLG09ZFs2XSxwPWRbN10sej1kWzhdLEE9ZFs5XSxDPWRbMTBdLEI9ZFsxMV0sRD1kWzEyXSxQPWRbMTNdLGVhPWRbMTRdLFE9ZFsxNV0sdDtpZihcInVuZGVmaW5lZFwiIT09dHlwZW9mIFVpbnQzMkFycmF5KXt0PUFycmF5KDE2MCk7Zm9yKHZhciByPTA7MzI+cjtyKyspdFtyXT1hW3JdfWVsc2UgdD1hO3ZhciByPWYsdT1nLEc9aCxFPWssSD1uLEY9bCxWPW0sST1wLHc9eix2PUEsUj1DLEo9QixTPUQsSz1QLFc9ZWEsTD1RO2ZvcihhPTA7ODA+YTthKyspe2lmKDE2PmEpYj10WzIqYV0sYz10WzIqYSsxXTtlbHNle2M9dFsyKihhLTE1KV07dmFyIHE9dFsyKihhLTE1KSsxXTtiPShxPDwzMXxjPj4+MSleKHE8PDI0fGM+Pj44KV5jPj4+Nzt2YXIgeD0oYzw8MzF8cT4+PjEpXihjPDwyNHxxPj4+OCleKGM8PDI1fHE+Pj43KTtjPXRbMiooYS0yKV07dmFyIHk9dFsyKihhLTIpKzFdLFxucT0oeTw8MTN8Yz4+PjE5KV4oYzw8M3x5Pj4+MjkpXmM+Pj42LHk9KGM8PDEzfHk+Pj4xOSleKHk8PDN8Yz4+PjI5KV4oYzw8MjZ8eT4+PjYpLFg9dFsyKihhLTcpXSxZPXRbMiooYS0xNildLE09dFsyKihhLTE2KSsxXTtjPXgrdFsyKihhLTcpKzFdO2I9YitYKyhjPj4+MDx4Pj4+MD8xOjApO2MrPXk7Yis9cSsoYz4+PjA8eT4+PjA/MTowKTtjKz1NO2IrPVkrKGM+Pj4wPE0+Pj4wPzE6MCl9dFsyKmFdPWJ8PTA7dFsyKmErMV09Y3w9MDt2YXIgWD13JlJefncmUyxmYT12JkpefnYmSyx5PXImR15yJkheRyZILGphPXUmRV51JkZeRSZGLFk9KHU8PDR8cj4+PjI4KV4ocjw8MzB8dT4+PjIpXihyPDwyNXx1Pj4+NyksTT0ocjw8NHx1Pj4+MjgpXih1PDwzMHxyPj4+MileKHU8PDI1fHI+Pj43KSxrYT1lWzIqYV0sZ2E9ZVsyKmErMV0scT1MKygodzw8MTh8dj4+PjE0KV4odzw8MTR8dj4+PjE4KV4odjw8MjN8dz4+PjkpKSx4PVcrKCh2PDwxOHx3Pj4+MTQpXih2PDwxNHx3Pj4+MTgpXih3PDxcbjIzfHY+Pj45KSkrKHE+Pj4wPEw+Pj4wPzE6MCkscT1xK2ZhLHg9eCsoWCsocT4+PjA8ZmE+Pj4wPzE6MCkpLHE9cStnYSx4PXgrKGthKyhxPj4+MDxnYT4+PjA/MTowKSkscT1xK2N8MCx4PXgrKGIrKHE+Pj4wPGM+Pj4wPzE6MCkpO2M9TStqYTtiPVkreSsoYz4+PjA8TT4+PjA/MTowKTtXPVM7TD1LO1M9UjtLPUo7Uj13O0o9djt2PUkrcXwwO3c9Vit4Kyh2Pj4+MDxJPj4+MD8xOjApfDA7Vj1IO0k9RjtIPUc7Rj1FO0c9cjtFPXU7dT1xK2N8MDtyPXgrYisodT4+PjA8cT4+PjA/MTowKXwwfWc9ZFsxXT1nK3V8MDtkWzBdPWYrcisoZz4+PjA8dT4+PjA/MTowKXwwO2s9ZFszXT1rK0V8MDtkWzJdPWgrRysoaz4+PjA8RT4+PjA/MTowKXwwO2w9ZFs1XT1sK0Z8MDtkWzRdPW4rSCsobD4+PjA8Rj4+PjA/MTowKXwwO3A9ZFs3XT1wK0l8MDtkWzZdPW0rVisocD4+PjA8ST4+PjA/MTowKXwwO0E9ZFs5XT1BK3Z8MDtkWzhdPXordysoQT4+PjA8dj4+PjA/MTowKXwwO0I9ZFsxMV09QitKfFxuMDtkWzEwXT1DK1IrKEI+Pj4wPEo+Pj4wPzE6MCl8MDtQPWRbMTNdPVArS3wwO2RbMTJdPUQrUysoUD4+PjA8Sz4+PjA/MTowKXwwO1E9ZFsxNV09UStMfDA7ZFsxNF09ZWErVysoUT4+PjA8TD4+PjA/MTowKXwwfX07XG5zamNsLm1vZGUuY2NtPXtuYW1lOlwiY2NtXCIsRjpbXSxsaXN0ZW5Qcm9ncmVzczpmdW5jdGlvbihhKXtzamNsLm1vZGUuY2NtLkYucHVzaChhKX0sdW5MaXN0ZW5Qcm9ncmVzczpmdW5jdGlvbihhKXthPXNqY2wubW9kZS5jY20uRi5pbmRleE9mKGEpOy0xPGEmJnNqY2wubW9kZS5jY20uRi5zcGxpY2UoYSwxKX0sZGE6ZnVuY3Rpb24oYSl7dmFyIGI9c2pjbC5tb2RlLmNjbS5GLnNsaWNlKCksYztmb3IoYz0wO2M8Yi5sZW5ndGg7Yys9MSliW2NdKGEpfSxlbmNyeXB0OmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGYsZz1iLnNsaWNlKDApLGg9c2pjbC5iaXRBcnJheSxrPWguYml0TGVuZ3RoKGMpLzgsbj1oLmJpdExlbmd0aChnKS84O2U9ZXx8NjQ7ZD1kfHxbXTtpZig3PmspdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJjY206IGl2IG11c3QgYmUgYXQgbGVhc3QgNyBieXRlc1wiKTtmb3IoZj0yOzQ+ZiYmbj4+PjgqZjtmKyspO2Y8MTUtayYmKGY9MTUtayk7Yz1oLmNsYW1wKGMsXG44KigxNS1mKSk7Yj1zamNsLm1vZGUuY2NtLlUoYSxiLGMsZCxlLGYpO2c9c2pjbC5tb2RlLmNjbS5WKGEsZyxjLGIsZSxmKTtyZXR1cm4gaC5jb25jYXQoZy5kYXRhLGcudGFnKX0sZGVjcnlwdDpmdW5jdGlvbihhLGIsYyxkLGUpe2U9ZXx8NjQ7ZD1kfHxbXTt2YXIgZj1zamNsLmJpdEFycmF5LGc9Zi5iaXRMZW5ndGgoYykvOCxoPWYuYml0TGVuZ3RoKGIpLGs9Zi5jbGFtcChiLGgtZSksbj1mLmJpdFNsaWNlKGIsaC1lKSxoPShoLWUpLzg7aWYoNz5nKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiY2NtOiBpdiBtdXN0IGJlIGF0IGxlYXN0IDcgYnl0ZXNcIik7Zm9yKGI9Mjs0PmImJmg+Pj44KmI7YisrKTtiPDE1LWcmJihiPTE1LWcpO2M9Zi5jbGFtcChjLDgqKDE1LWIpKTtrPXNqY2wubW9kZS5jY20uVihhLGssYyxuLGUsYik7YT1zamNsLm1vZGUuY2NtLlUoYSxrLmRhdGEsYyxkLGUsYik7aWYoIWYuZXF1YWwoay50YWcsYSkpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmNvcnJ1cHQoXCJjY206IHRhZyBkb2Vzbid0IG1hdGNoXCIpO1xucmV0dXJuIGsuZGF0YX0sbWE6ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe3ZhciBnPVtdLGg9c2pjbC5iaXRBcnJheSxrPWguUDtkPVtoLnBhcnRpYWwoOCwoYi5sZW5ndGg/NjQ6MCl8ZC0yPDwyfGYtMSldO2Q9aC5jb25jYXQoZCxjKTtkWzNdfD1lO2Q9YS5lbmNyeXB0KGQpO2lmKGIubGVuZ3RoKWZvcihjPWguYml0TGVuZ3RoKGIpLzgsNjUyNzk+PWM/Zz1baC5wYXJ0aWFsKDE2LGMpXToweGZmZmZmZmZmPj1jJiYoZz1oLmNvbmNhdChbaC5wYXJ0aWFsKDE2LDY1NTM0KV0sW2NdKSksZz1oLmNvbmNhdChnLGIpLGI9MDtiPGcubGVuZ3RoO2IrPTQpZD1hLmVuY3J5cHQoayhkLGcuc2xpY2UoYixiKzQpLmNvbmNhdChbMCwwLDBdKSkpO3JldHVybiBkfSxVOmZ1bmN0aW9uKGEsYixjLGQsZSxmKXt2YXIgZz1zamNsLmJpdEFycmF5LGg9Zy5QO2UvPTg7aWYoZSUyfHw0PmV8fDE2PGUpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJjY206IGludmFsaWQgdGFnIGxlbmd0aFwiKTtcbmlmKDB4ZmZmZmZmZmY8ZC5sZW5ndGh8fDB4ZmZmZmZmZmY8Yi5sZW5ndGgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmJ1ZyhcImNjbTogY2FuJ3QgZGVhbCB3aXRoIDRHaUIgb3IgbW9yZSBkYXRhXCIpO2M9c2pjbC5tb2RlLmNjbS5tYShhLGQsYyxlLGcuYml0TGVuZ3RoKGIpLzgsZik7Zm9yKGQ9MDtkPGIubGVuZ3RoO2QrPTQpYz1hLmVuY3J5cHQoaChjLGIuc2xpY2UoZCxkKzQpLmNvbmNhdChbMCwwLDBdKSkpO3JldHVybiBnLmNsYW1wKGMsOCplKX0sVjpmdW5jdGlvbihhLGIsYyxkLGUsZil7dmFyIGcsaD1zamNsLmJpdEFycmF5O2c9aC5QO3ZhciBrPWIubGVuZ3RoLG49aC5iaXRMZW5ndGgoYiksbD1rLzUwLG09bDtjPWguY29uY2F0KFtoLnBhcnRpYWwoOCxmLTEpXSxjKS5jb25jYXQoWzAsMCwwXSkuc2xpY2UoMCw0KTtkPWguYml0U2xpY2UoZyhkLGEuZW5jcnlwdChjKSksMCxlKTtpZighaylyZXR1cm57dGFnOmQsZGF0YTpbXX07Zm9yKGc9MDtnPGs7Zys9NClnPmwmJihzamNsLm1vZGUuY2NtLmRhKGcvXG5rKSxsKz1tKSxjWzNdKyssZT1hLmVuY3J5cHQoYyksYltnXV49ZVswXSxiW2crMV1ePWVbMV0sYltnKzJdXj1lWzJdLGJbZyszXV49ZVszXTtyZXR1cm57dGFnOmQsZGF0YTpoLmNsYW1wKGIsbil9fX07c2pjbC5taXNjLmhtYWM9ZnVuY3Rpb24oYSxiKXt0aGlzLlc9Yj1ifHxzamNsLmhhc2guc2hhMjU2O3ZhciBjPVtbXSxbXV0sZCxlPWIucHJvdG90eXBlLmJsb2NrU2l6ZS8zMjt0aGlzLkI9W25ldyBiLG5ldyBiXTthLmxlbmd0aD5lJiYoYT1iLmhhc2goYSkpO2ZvcihkPTA7ZDxlO2QrKyljWzBdW2RdPWFbZF1eOTA5NTIyNDg2LGNbMV1bZF09YVtkXV4xNTQ5NTU2ODI4O3RoaXMuQlswXS51cGRhdGUoY1swXSk7dGhpcy5CWzFdLnVwZGF0ZShjWzFdKTt0aGlzLk89bmV3IGIodGhpcy5CWzBdKX07XG5zamNsLm1pc2MuaG1hYy5wcm90b3R5cGUuZW5jcnlwdD1zamNsLm1pc2MuaG1hYy5wcm90b3R5cGUubWFjPWZ1bmN0aW9uKGEpe2lmKHRoaXMuWil0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImVuY3J5cHQgb24gYWxyZWFkeSB1cGRhdGVkIGhtYWMgY2FsbGVkIVwiKTt0aGlzLnVwZGF0ZShhKTtyZXR1cm4gdGhpcy5kaWdlc3QoYSl9O3NqY2wubWlzYy5obWFjLnByb3RvdHlwZS5yZXNldD1mdW5jdGlvbigpe3RoaXMuTz1uZXcgdGhpcy5XKHRoaXMuQlswXSk7dGhpcy5aPSExfTtzamNsLm1pc2MuaG1hYy5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKGEpe3RoaXMuWj0hMDt0aGlzLk8udXBkYXRlKGEpfTtzamNsLm1pc2MuaG1hYy5wcm90b3R5cGUuZGlnZXN0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5PLmZpbmFsaXplKCksYT0obmV3IHRoaXMuVyh0aGlzLkJbMV0pKS51cGRhdGUoYSkuZmluYWxpemUoKTt0aGlzLnJlc2V0KCk7cmV0dXJuIGF9O1xuc2pjbC5taXNjLnBia2RmMj1mdW5jdGlvbihhLGIsYyxkLGUpe2M9Y3x8MUU0O2lmKDA+ZHx8MD5jKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiaW52YWxpZCBwYXJhbXMgdG8gcGJrZGYyXCIpO1wic3RyaW5nXCI9PT10eXBlb2YgYSYmKGE9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhhKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBiJiYoYj1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGIpKTtlPWV8fHNqY2wubWlzYy5obWFjO2E9bmV3IGUoYSk7dmFyIGYsZyxoLGssbj1bXSxsPXNqY2wuYml0QXJyYXk7Zm9yKGs9MTszMipuLmxlbmd0aDwoZHx8MSk7aysrKXtlPWY9YS5lbmNyeXB0KGwuY29uY2F0KGIsW2tdKSk7Zm9yKGc9MTtnPGM7ZysrKWZvcihmPWEuZW5jcnlwdChmKSxoPTA7aDxmLmxlbmd0aDtoKyspZVtoXV49ZltoXTtuPW4uY29uY2F0KGUpfWQmJihuPWwuY2xhbXAobixkKSk7cmV0dXJuIG59O1xuc2pjbC5wcm5nPWZ1bmN0aW9uKGEpe3RoaXMuaD1bbmV3IHNqY2wuaGFzaC5zaGEyNTZdO3RoaXMucz1bMF07dGhpcy5OPTA7dGhpcy5HPXt9O3RoaXMuTT0wO3RoaXMuVD17fTt0aGlzLlg9dGhpcy5pPXRoaXMudT10aGlzLmZhPTA7dGhpcy5iPVswLDAsMCwwLDAsMCwwLDBdO3RoaXMubT1bMCwwLDAsMF07dGhpcy5LPXZvaWQgMDt0aGlzLkw9YTt0aGlzLkQ9ITE7dGhpcy5KPXtwcm9ncmVzczp7fSxzZWVkZWQ6e319O3RoaXMuQT10aGlzLmVhPTA7dGhpcy5IPTE7dGhpcy5JPTI7dGhpcy5hYT0weDEwMDAwO3RoaXMuUj1bMCw0OCw2NCw5NiwxMjgsMTkyLDB4MTAwLDM4NCw1MTIsNzY4LDEwMjRdO3RoaXMuYmE9M0U0O3RoaXMuJD04MH07XG5zamNsLnBybmcucHJvdG90eXBlPXtyYW5kb21Xb3JkczpmdW5jdGlvbihhLGIpe3ZhciBjPVtdLGQ7ZD10aGlzLmlzUmVhZHkoYik7dmFyIGU7aWYoZD09PXRoaXMuQSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24ubm90UmVhZHkoXCJnZW5lcmF0b3IgaXNuJ3Qgc2VlZGVkXCIpO2lmKGQmdGhpcy5JKXtkPSEoZCZ0aGlzLkgpO2U9W107dmFyIGY9MCxnO3RoaXMuWD1lWzBdPShuZXcgRGF0ZSkudmFsdWVPZigpK3RoaXMuYmE7Zm9yKGc9MDsxNj5nO2crKyllLnB1c2goMHgxMDAwMDAwMDAqTWF0aC5yYW5kb20oKXwwKTtmb3IoZz0wO2c8dGhpcy5oLmxlbmd0aCYmKGU9ZS5jb25jYXQodGhpcy5oW2ddLmZpbmFsaXplKCkpLGYrPXRoaXMuc1tnXSx0aGlzLnNbZ109MCxkfHwhKHRoaXMuTiYxPDxnKSk7ZysrKTt0aGlzLk4+PTE8PHRoaXMuaC5sZW5ndGgmJih0aGlzLmgucHVzaChuZXcgc2pjbC5oYXNoLnNoYTI1NiksdGhpcy5zLnB1c2goMCkpO3RoaXMuaS09ZjtmPnRoaXMudSYmKHRoaXMudT1cbmYpO3RoaXMuTisrO3RoaXMuYj1zamNsLmhhc2guc2hhMjU2Lmhhc2godGhpcy5iLmNvbmNhdChlKSk7dGhpcy5LPW5ldyBzamNsLmNpcGhlci5hZXModGhpcy5iKTtmb3IoZD0wOzQ+ZCYmKHRoaXMubVtkXT10aGlzLm1bZF0rMXwwLCF0aGlzLm1bZF0pO2QrKyk7fWZvcihkPTA7ZDxhO2QrPTQpMD09PShkKzEpJXRoaXMuYWEmJmJhKHRoaXMpLGU9Tih0aGlzKSxjLnB1c2goZVswXSxlWzFdLGVbMl0sZVszXSk7YmEodGhpcyk7cmV0dXJuIGMuc2xpY2UoMCxhKX0sc2V0RGVmYXVsdFBhcmFub2lhOmZ1bmN0aW9uKGEsYil7aWYoMD09PWEmJlwiU2V0dGluZyBwYXJhbm9pYT0wIHdpbGwgcnVpbiB5b3VyIHNlY3VyaXR5OyB1c2UgaXQgb25seSBmb3IgdGVzdGluZ1wiIT09Yil0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcIlNldHRpbmcgcGFyYW5vaWE9MCB3aWxsIHJ1aW4geW91ciBzZWN1cml0eTsgdXNlIGl0IG9ubHkgZm9yIHRlc3RpbmdcIik7dGhpcy5MPWF9LGFkZEVudHJvcHk6ZnVuY3Rpb24oYSxcbmIsYyl7Yz1jfHxcInVzZXJcIjt2YXIgZCxlLGY9KG5ldyBEYXRlKS52YWx1ZU9mKCksZz10aGlzLkdbY10saD10aGlzLmlzUmVhZHkoKSxrPTA7ZD10aGlzLlRbY107dm9pZCAwPT09ZCYmKGQ9dGhpcy5UW2NdPXRoaXMuZmErKyk7dm9pZCAwPT09ZyYmKGc9dGhpcy5HW2NdPTApO3RoaXMuR1tjXT0odGhpcy5HW2NdKzEpJXRoaXMuaC5sZW5ndGg7c3dpdGNoKHR5cGVvZiBhKXtjYXNlIFwibnVtYmVyXCI6dm9pZCAwPT09YiYmKGI9MSk7dGhpcy5oW2ddLnVwZGF0ZShbZCx0aGlzLk0rKywxLGIsZiwxLGF8MF0pO2JyZWFrO2Nhc2UgXCJvYmplY3RcIjpjPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKTtpZihcIltvYmplY3QgVWludDMyQXJyYXldXCI9PT1jKXtlPVtdO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspZS5wdXNoKGFbY10pO2E9ZX1lbHNlIGZvcihcIltvYmplY3QgQXJyYXldXCIhPT1jJiYoaz0xKSxjPTA7YzxhLmxlbmd0aCYmIWs7YysrKVwibnVtYmVyXCIhPT10eXBlb2YgYVtjXSYmXG4oaz0xKTtpZighayl7aWYodm9pZCAwPT09Yilmb3IoYz1iPTA7YzxhLmxlbmd0aDtjKyspZm9yKGU9YVtjXTswPGU7KWIrKyxlPWU+Pj4xO3RoaXMuaFtnXS51cGRhdGUoW2QsdGhpcy5NKyssMixiLGYsYS5sZW5ndGhdLmNvbmNhdChhKSl9YnJlYWs7Y2FzZSBcInN0cmluZ1wiOnZvaWQgMD09PWImJihiPWEubGVuZ3RoKTt0aGlzLmhbZ10udXBkYXRlKFtkLHRoaXMuTSsrLDMsYixmLGEubGVuZ3RoXSk7dGhpcy5oW2ddLnVwZGF0ZShhKTticmVhaztkZWZhdWx0Oms9MX1pZihrKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJyYW5kb206IGFkZEVudHJvcHkgb25seSBzdXBwb3J0cyBudW1iZXIsIGFycmF5IG9mIG51bWJlcnMgb3Igc3RyaW5nXCIpO3RoaXMuc1tnXSs9Yjt0aGlzLmkrPWI7aD09PXRoaXMuQSYmKHRoaXMuaXNSZWFkeSgpIT09dGhpcy5BJiZjYShcInNlZWRlZFwiLE1hdGgubWF4KHRoaXMudSx0aGlzLmkpKSxjYShcInByb2dyZXNzXCIsdGhpcy5nZXRQcm9ncmVzcygpKSl9LFxuaXNSZWFkeTpmdW5jdGlvbihhKXthPXRoaXMuUlt2b2lkIDAhPT1hP2E6dGhpcy5MXTtyZXR1cm4gdGhpcy51JiZ0aGlzLnU+PWE/dGhpcy5zWzBdPnRoaXMuJCYmKG5ldyBEYXRlKS52YWx1ZU9mKCk+dGhpcy5YP3RoaXMuSXx0aGlzLkg6dGhpcy5IOnRoaXMuaT49YT90aGlzLkl8dGhpcy5BOnRoaXMuQX0sZ2V0UHJvZ3Jlc3M6ZnVuY3Rpb24oYSl7YT10aGlzLlJbYT9hOnRoaXMuTF07cmV0dXJuIHRoaXMudT49YT8xOnRoaXMuaT5hPzE6dGhpcy5pL2F9LHN0YXJ0Q29sbGVjdG9yczpmdW5jdGlvbigpe2lmKCF0aGlzLkQpe3RoaXMuYT17bG9hZFRpbWVDb2xsZWN0b3I6Tyh0aGlzLHRoaXMubGEpLG1vdXNlQ29sbGVjdG9yOk8odGhpcyx0aGlzLm5hKSxrZXlib2FyZENvbGxlY3RvcjpPKHRoaXMsdGhpcy5qYSksYWNjZWxlcm9tZXRlckNvbGxlY3RvcjpPKHRoaXMsdGhpcy5jYSksdG91Y2hDb2xsZWN0b3I6Tyh0aGlzLHRoaXMucGEpfTtpZih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixcbnRoaXMuYS5sb2FkVGltZUNvbGxlY3RvciwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLmEubW91c2VDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIix0aGlzLmEua2V5Ym9hcmRDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlbW90aW9uXCIsdGhpcy5hLmFjY2VsZXJvbWV0ZXJDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsdGhpcy5hLnRvdWNoQ29sbGVjdG9yLCExKTtlbHNlIGlmKGRvY3VtZW50LmF0dGFjaEV2ZW50KWRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25sb2FkXCIsdGhpcy5hLmxvYWRUaW1lQ29sbGVjdG9yKSxkb2N1bWVudC5hdHRhY2hFdmVudChcIm9ubW91c2Vtb3ZlXCIsdGhpcy5hLm1vdXNlQ29sbGVjdG9yKSxkb2N1bWVudC5hdHRhY2hFdmVudChcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yKTtlbHNlIHRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJjYW4ndCBhdHRhY2ggZXZlbnRcIik7XG50aGlzLkQ9ITB9fSxzdG9wQ29sbGVjdG9yczpmdW5jdGlvbigpe3RoaXMuRCYmKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyPyh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIix0aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcy5hLm1vdXNlQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImRldmljZW1vdGlvblwiLHRoaXMuYS5hY2NlbGVyb21ldGVyQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHRoaXMuYS50b3VjaENvbGxlY3RvciwhMSkpOmRvY3VtZW50LmRldGFjaEV2ZW50JiYoZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJvbmxvYWRcIix0aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IpLGRvY3VtZW50LmRldGFjaEV2ZW50KFwib25tb3VzZW1vdmVcIixcbnRoaXMuYS5tb3VzZUNvbGxlY3RvciksZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJrZXlwcmVzc1wiLHRoaXMuYS5rZXlib2FyZENvbGxlY3RvcikpLHRoaXMuRD0hMSl9LGFkZEV2ZW50TGlzdGVuZXI6ZnVuY3Rpb24oYSxiKXt0aGlzLkpbYV1bdGhpcy5lYSsrXT1ifSxyZW1vdmVFdmVudExpc3RlbmVyOmZ1bmN0aW9uKGEsYil7dmFyIGMsZCxlPXRoaXMuSlthXSxmPVtdO2ZvcihkIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShkKSYmZVtkXT09PWImJmYucHVzaChkKTtmb3IoYz0wO2M8Zi5sZW5ndGg7YysrKWQ9ZltjXSxkZWxldGUgZVtkXX0samE6ZnVuY3Rpb24oKXtUKHRoaXMsMSl9LG5hOmZ1bmN0aW9uKGEpe3ZhciBiLGM7dHJ5e2I9YS54fHxhLmNsaWVudFh8fGEub2Zmc2V0WHx8MCxjPWEueXx8YS5jbGllbnRZfHxhLm9mZnNldFl8fDB9Y2F0Y2goZCl7Yz1iPTB9MCE9YiYmMCE9YyYmdGhpcy5hZGRFbnRyb3B5KFtiLGNdLDIsXCJtb3VzZVwiKTtUKHRoaXMsMCl9LHBhOmZ1bmN0aW9uKGEpe2E9XG5hLnRvdWNoZXNbMF18fGEuY2hhbmdlZFRvdWNoZXNbMF07dGhpcy5hZGRFbnRyb3B5KFthLnBhZ2VYfHxhLmNsaWVudFgsYS5wYWdlWXx8YS5jbGllbnRZXSwxLFwidG91Y2hcIik7VCh0aGlzLDApfSxsYTpmdW5jdGlvbigpe1QodGhpcywyKX0sY2E6ZnVuY3Rpb24oYSl7YT1hLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueHx8YS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnl8fGEuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56O2lmKHdpbmRvdy5vcmllbnRhdGlvbil7dmFyIGI9d2luZG93Lm9yaWVudGF0aW9uO1wibnVtYmVyXCI9PT10eXBlb2YgYiYmdGhpcy5hZGRFbnRyb3B5KGIsMSxcImFjY2VsZXJvbWV0ZXJcIil9YSYmdGhpcy5hZGRFbnRyb3B5KGEsMixcImFjY2VsZXJvbWV0ZXJcIik7VCh0aGlzLDApfX07XG5mdW5jdGlvbiBjYShhLGIpe3ZhciBjLGQ9c2pjbC5yYW5kb20uSlthXSxlPVtdO2ZvcihjIGluIGQpZC5oYXNPd25Qcm9wZXJ0eShjKSYmZS5wdXNoKGRbY10pO2ZvcihjPTA7YzxlLmxlbmd0aDtjKyspZVtjXShiKX1mdW5jdGlvbiBUKGEsYil7XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiB3aW5kb3cmJndpbmRvdy5wZXJmb3JtYW5jZSYmXCJmdW5jdGlvblwiPT09dHlwZW9mIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3c/YS5hZGRFbnRyb3B5KHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSxiLFwibG9hZHRpbWVcIik6YS5hZGRFbnRyb3B5KChuZXcgRGF0ZSkudmFsdWVPZigpLGIsXCJsb2FkdGltZVwiKX1mdW5jdGlvbiBiYShhKXthLmI9TihhKS5jb25jYXQoTihhKSk7YS5LPW5ldyBzamNsLmNpcGhlci5hZXMoYS5iKX1mdW5jdGlvbiBOKGEpe2Zvcih2YXIgYj0wOzQ+YiYmKGEubVtiXT1hLm1bYl0rMXwwLCFhLm1bYl0pO2IrKyk7cmV0dXJuIGEuSy5lbmNyeXB0KGEubSl9XG5mdW5jdGlvbiBPKGEsYil7cmV0dXJuIGZ1bmN0aW9uKCl7Yi5hcHBseShhLGFyZ3VtZW50cyl9fXNqY2wucmFuZG9tPW5ldyBzamNsLnBybmcoNik7XG5hOnRyeXt2YXIgVSxkYSxaLGhhO2lmKGhhPVwidW5kZWZpbmVkXCIhPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cyl7dmFyIGlhO3RyeXtpYT1yZXF1aXJlKFwiY3J5cHRvXCIpfWNhdGNoKGEpe2lhPW51bGx9aGE9ZGE9aWF9aWYoaGEmJmRhLnJhbmRvbUJ5dGVzKVU9ZGEucmFuZG9tQnl0ZXMoMTI4KSxVPW5ldyBVaW50MzJBcnJheSgobmV3IFVpbnQ4QXJyYXkoVSkpLmJ1ZmZlciksc2pjbC5yYW5kb20uYWRkRW50cm9weShVLDEwMjQsXCJjcnlwdG9bJ3JhbmRvbUJ5dGVzJ11cIik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT09dHlwZW9mIHdpbmRvdyYmXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBVaW50MzJBcnJheSl7Wj1uZXcgVWludDMyQXJyYXkoMzIpO2lmKHdpbmRvdy5jcnlwdG8mJndpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKXdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKFopO2Vsc2UgaWYod2luZG93Lm1zQ3J5cHRvJiZ3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKXdpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMoWik7XG5lbHNlIGJyZWFrIGE7c2pjbC5yYW5kb20uYWRkRW50cm9weShaLDEwMjQsXCJjcnlwdG9bJ2dldFJhbmRvbVZhbHVlcyddXCIpfX1jYXRjaChhKXtcInVuZGVmaW5lZFwiIT09dHlwZW9mIHdpbmRvdyYmd2luZG93LmNvbnNvbGUmJihjb25zb2xlLmxvZyhcIlRoZXJlIHdhcyBhbiBlcnJvciBjb2xsZWN0aW5nIGVudHJvcHkgZnJvbSB0aGUgYnJvd3NlcjpcIiksY29uc29sZS5sb2coYSkpfVxuc2pjbC5qc29uPXtkZWZhdWx0czp7djoxLGl0ZXI6MUU0LGtzOjEyOCx0czo2NCxtb2RlOlwiY2NtXCIsYWRhdGE6XCJcIixjaXBoZXI6XCJhZXNcIn0saGE6ZnVuY3Rpb24oYSxiLGMsZCl7Yz1jfHx7fTtkPWR8fHt9O3ZhciBlPXNqY2wuanNvbixmPWUuaih7aXY6c2pjbC5yYW5kb20ucmFuZG9tV29yZHMoNCwwKX0sZS5kZWZhdWx0cyksZztlLmooZixjKTtjPWYuYWRhdGE7XCJzdHJpbmdcIj09PXR5cGVvZiBmLnNhbHQmJihmLnNhbHQ9c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGYuc2FsdCkpO1wic3RyaW5nXCI9PT10eXBlb2YgZi5pdiYmKGYuaXY9c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGYuaXYpKTtpZighc2pjbC5tb2RlW2YubW9kZV18fCFzamNsLmNpcGhlcltmLmNpcGhlcl18fFwic3RyaW5nXCI9PT10eXBlb2YgYSYmMTAwPj1mLml0ZXJ8fDY0IT09Zi50cyYmOTYhPT1mLnRzJiYxMjghPT1mLnRzfHwxMjghPT1mLmtzJiYxOTIhPT1mLmtzJiYweDEwMCE9PWYua3N8fDI+Zi5pdi5sZW5ndGh8fFxuNDxmLml2Lmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZW5jcnlwdDogaW52YWxpZCBwYXJhbWV0ZXJzXCIpO1wic3RyaW5nXCI9PT10eXBlb2YgYT8oZz1zamNsLm1pc2MuY2FjaGVkUGJrZGYyKGEsZiksYT1nLmtleS5zbGljZSgwLGYua3MvMzIpLGYuc2FsdD1nLnNhbHQpOnNqY2wuZWNjJiZhIGluc3RhbmNlb2Ygc2pjbC5lY2MuZWxHYW1hbC5wdWJsaWNLZXkmJihnPWEua2VtKCksZi5rZW10YWc9Zy50YWcsYT1nLmtleS5zbGljZSgwLGYua3MvMzIpKTtcInN0cmluZ1wiPT09dHlwZW9mIGImJihiPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYikpO1wic3RyaW5nXCI9PT10eXBlb2YgYyYmKGYuYWRhdGE9Yz1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGMpKTtnPW5ldyBzamNsLmNpcGhlcltmLmNpcGhlcl0oYSk7ZS5qKGQsZik7ZC5rZXk9YTtmLmN0PVwiY2NtXCI9PT1mLm1vZGUmJnNqY2wuYXJyYXlCdWZmZXImJnNqY2wuYXJyYXlCdWZmZXIuY2NtJiZcbmIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcj9zamNsLmFycmF5QnVmZmVyLmNjbS5lbmNyeXB0KGcsYixmLml2LGMsZi50cyk6c2pjbC5tb2RlW2YubW9kZV0uZW5jcnlwdChnLGIsZi5pdixjLGYudHMpO3JldHVybiBmfSxlbmNyeXB0OmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPXNqY2wuanNvbixmPWUuaGEuYXBwbHkoZSxhcmd1bWVudHMpO3JldHVybiBlLmVuY29kZShmKX0sZ2E6ZnVuY3Rpb24oYSxiLGMsZCl7Yz1jfHx7fTtkPWR8fHt9O3ZhciBlPXNqY2wuanNvbjtiPWUuaihlLmooZS5qKHt9LGUuZGVmYXVsdHMpLGIpLGMsITApO3ZhciBmLGc7Zj1iLmFkYXRhO1wic3RyaW5nXCI9PT10eXBlb2YgYi5zYWx0JiYoYi5zYWx0PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhiLnNhbHQpKTtcInN0cmluZ1wiPT09dHlwZW9mIGIuaXYmJihiLml2PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhiLml2KSk7aWYoIXNqY2wubW9kZVtiLm1vZGVdfHwhc2pjbC5jaXBoZXJbYi5jaXBoZXJdfHxcInN0cmluZ1wiPT09XG50eXBlb2YgYSYmMTAwPj1iLml0ZXJ8fDY0IT09Yi50cyYmOTYhPT1iLnRzJiYxMjghPT1iLnRzfHwxMjghPT1iLmtzJiYxOTIhPT1iLmtzJiYweDEwMCE9PWIua3N8fCFiLml2fHwyPmIuaXYubGVuZ3RofHw0PGIuaXYubGVuZ3RoKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBkZWNyeXB0OiBpbnZhbGlkIHBhcmFtZXRlcnNcIik7XCJzdHJpbmdcIj09PXR5cGVvZiBhPyhnPXNqY2wubWlzYy5jYWNoZWRQYmtkZjIoYSxiKSxhPWcua2V5LnNsaWNlKDAsYi5rcy8zMiksYi5zYWx0PWcuc2FsdCk6c2pjbC5lY2MmJmEgaW5zdGFuY2VvZiBzamNsLmVjYy5lbEdhbWFsLnNlY3JldEtleSYmKGE9YS51bmtlbShzamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYi5rZW10YWcpKS5zbGljZSgwLGIua3MvMzIpKTtcInN0cmluZ1wiPT09dHlwZW9mIGYmJihmPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoZikpO2c9bmV3IHNqY2wuY2lwaGVyW2IuY2lwaGVyXShhKTtmPVwiY2NtXCI9PT1cbmIubW9kZSYmc2pjbC5hcnJheUJ1ZmZlciYmc2pjbC5hcnJheUJ1ZmZlci5jY20mJmIuY3QgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcj9zamNsLmFycmF5QnVmZmVyLmNjbS5kZWNyeXB0KGcsYi5jdCxiLml2LGIudGFnLGYsYi50cyk6c2pjbC5tb2RlW2IubW9kZV0uZGVjcnlwdChnLGIuY3QsYi5pdixmLGIudHMpO2UuaihkLGIpO2Qua2V5PWE7cmV0dXJuIDE9PT1jLnJhdz9mOnNqY2wuY29kZWMudXRmOFN0cmluZy5mcm9tQml0cyhmKX0sZGVjcnlwdDpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1zamNsLmpzb247cmV0dXJuIGUuZ2EoYSxlLmRlY29kZShiKSxjLGQpfSxlbmNvZGU6ZnVuY3Rpb24oYSl7dmFyIGIsYz1cIntcIixkPVwiXCI7Zm9yKGIgaW4gYSlpZihhLmhhc093blByb3BlcnR5KGIpKXtpZighYi5tYXRjaCgvXlthLXowLTldKyQvaSkpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGVuY29kZTogaW52YWxpZCBwcm9wZXJ0eSBuYW1lXCIpO2MrPWQrJ1wiJytcbmIrJ1wiOic7ZD1cIixcIjtzd2l0Y2godHlwZW9mIGFbYl0pe2Nhc2UgXCJudW1iZXJcIjpjYXNlIFwiYm9vbGVhblwiOmMrPWFbYl07YnJlYWs7Y2FzZSBcInN0cmluZ1wiOmMrPSdcIicrZXNjYXBlKGFbYl0pKydcIic7YnJlYWs7Y2FzZSBcIm9iamVjdFwiOmMrPSdcIicrc2pjbC5jb2RlYy5iYXNlNjQuZnJvbUJpdHMoYVtiXSwwKSsnXCInO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmJ1ZyhcImpzb24gZW5jb2RlOiB1bnN1cHBvcnRlZCB0eXBlXCIpO319cmV0dXJuIGMrXCJ9XCJ9LGRlY29kZTpmdW5jdGlvbihhKXthPWEucmVwbGFjZSgvXFxzL2csXCJcIik7aWYoIWEubWF0Y2goL15cXHsuKlxcfSQvKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZGVjb2RlOiB0aGlzIGlzbid0IGpzb24hXCIpO2E9YS5yZXBsYWNlKC9eXFx7fFxcfSQvZyxcIlwiKS5zcGxpdCgvLC8pO3ZhciBiPXt9LGMsZDtmb3IoYz0wO2M8YS5sZW5ndGg7YysrKXtpZighKGQ9YVtjXS5tYXRjaCgvXlxccyooPzooW1wiJ10/KShbYS16XVthLXowLTldKilcXDEpXFxzKjpcXHMqKD86KC0/XFxkKyl8XCIoW2EtejAtOStcXC8lKl8uQD1cXC1dKilcInwodHJ1ZXxmYWxzZSkpJC9pKSkpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGRlY29kZTogdGhpcyBpc24ndCBqc29uIVwiKTtcbm51bGwhPWRbM10/YltkWzJdXT1wYXJzZUludChkWzNdLDEwKTpudWxsIT1kWzRdP2JbZFsyXV09ZFsyXS5tYXRjaCgvXihjdHxhZGF0YXxzYWx0fGl2KSQvKT9zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoZFs0XSk6dW5lc2NhcGUoZFs0XSk6bnVsbCE9ZFs1XSYmKGJbZFsyXV09XCJ0cnVlXCI9PT1kWzVdKX1yZXR1cm4gYn0sajpmdW5jdGlvbihhLGIsYyl7dm9pZCAwPT09YSYmKGE9e30pO2lmKHZvaWQgMD09PWIpcmV0dXJuIGE7Zm9yKHZhciBkIGluIGIpaWYoYi5oYXNPd25Qcm9wZXJ0eShkKSl7aWYoYyYmdm9pZCAwIT09YVtkXSYmYVtkXSE9PWJbZF0pdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJyZXF1aXJlZCBwYXJhbWV0ZXIgb3ZlcnJpZGRlblwiKTthW2RdPWJbZF19cmV0dXJuIGF9LHJhOmZ1bmN0aW9uKGEsYil7dmFyIGM9e30sZDtmb3IoZCBpbiBhKWEuaGFzT3duUHJvcGVydHkoZCkmJmFbZF0hPT1iW2RdJiYoY1tkXT1hW2RdKTtyZXR1cm4gY30scWE6ZnVuY3Rpb24oYSxcbmIpe3ZhciBjPXt9LGQ7Zm9yKGQ9MDtkPGIubGVuZ3RoO2QrKyl2b2lkIDAhPT1hW2JbZF1dJiYoY1tiW2RdXT1hW2JbZF1dKTtyZXR1cm4gY319O3NqY2wuZW5jcnlwdD1zamNsLmpzb24uZW5jcnlwdDtzamNsLmRlY3J5cHQ9c2pjbC5qc29uLmRlY3J5cHQ7c2pjbC5taXNjLm9hPXt9O3NqY2wubWlzYy5jYWNoZWRQYmtkZjI9ZnVuY3Rpb24oYSxiKXt2YXIgYz1zamNsLm1pc2Mub2EsZDtiPWJ8fHt9O2Q9Yi5pdGVyfHwxRTM7Yz1jW2FdPWNbYV18fHt9O2Q9Y1tkXT1jW2RdfHx7Zmlyc3RTYWx0OmIuc2FsdCYmYi5zYWx0Lmxlbmd0aD9iLnNhbHQuc2xpY2UoMCk6c2pjbC5yYW5kb20ucmFuZG9tV29yZHMoMiwwKX07Yz12b2lkIDA9PT1iLnNhbHQ/ZC5maXJzdFNhbHQ6Yi5zYWx0O2RbY109ZFtjXXx8c2pjbC5taXNjLnBia2RmMihhLGMsYi5pdGVyKTtyZXR1cm57a2V5OmRbY10uc2xpY2UoMCksc2FsdDpjLnNsaWNlKDApfX07XG5cInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1zamNsKTtcImZ1bmN0aW9uXCI9PT10eXBlb2YgZGVmaW5lJiZkZWZpbmUoW10sZnVuY3Rpb24oKXtyZXR1cm4gc2pjbH0pO1xuIiwgImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgV09SS0VSX0FDVElPTiB9IGZyb20gXCJ+L2VudW0vd29ya2VyLWFjdGlvbi50c1wiO1xuaW1wb3J0IHR5cGUgeyBMdWZpRmlsZSB9IGZyb20gXCJ+L2VudGl0aWVzL2x1ZmktZmlsZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJBY3Rpb25NZXNzYWdlIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1hY3Rpb24tbWVzc2FnZS50c1wiO1xuaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgeyBVUExPQURfU1RBVFVTIH0gZnJvbSBcIn4vZW51bS9maWxlLXN0YXR1cy50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJFdmVudCB9IGZyb20gXCJ+L2ludGVyZmFjZS93b3JrZXItZXZlbnQudHNcIjtcblxuZGVjbGFyZSBsZXQgc2VsZjogV29ya2VyO1xuXG5leHBvcnQgY29uc3QgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4vKipcbiAqIFVwZGF0ZSBmaWxlIGluIHdvcmtlcnMgYW5kIHByb3ZpZGUgbW9kaWZpY2F0aW9ucyB0byB0aGUgbWFpbiB0aHJlYWRcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEBwYXJhbSBhcmdzXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgdXBkYXRlRmlsZSA9IChsdWZpRmlsZTogTHVmaUZpbGUsIGFyZ3M6IFBhcnRpYWw8THVmaUZpbGU+KSA9PiB7XG4gIE9iamVjdC5hc3NpZ24obHVmaUZpbGUsIGFyZ3MpO1xuXG4gIGlmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgIGV2ZW50OiBFVkVOVC5GSUxFX1VQREFURUQsXG4gICAgICBsdWZpRmlsZSxcbiAgICB9IGFzIFdvcmtlckV2ZW50KTtcbiAgfVxuXG4gIHJldHVybiBsdWZpRmlsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZW5kRmlsZUVycm9yID0gKGx1ZmlGaWxlOiBMdWZpRmlsZSwgZXJyb3I6IEVycm9yKSA9PiB7XG4gIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHsgdXBsb2FkU3RhdHVzOiBVUExPQURfU1RBVFVTLkZBSUxFRCB9KTtcblxuICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yIH0gYXMgV29ya2VyRXZlbnQpO1xufTtcblxuLyoqXG4gKiBJbml0IGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGVhY2ggY2hpbGQgd29ya2VyJ3Mgb25tZXNzYWdlIGV2ZW50LlxuICovXG5leHBvcnQgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgZXZlbnRzLm9uY2UoRVZFTlQuU09DS0VUX09QRU5FRCwgKCkgPT4ge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgZXZlbnQ6IEVWRU5ULlNPQ0tFVF9PUEVORUQsXG4gICAgfSk7XG4gIH0pO1xuXG4gIGV2ZW50cy5vbmNlKEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1dvcmtlckFjdGlvbk1lc3NhZ2UgPSAoXG4gIC8vIGRlbm8tbGludC1pZ25vcmUgbm8tZXhwbGljaXQtYW55XG4gIG1lc3NhZ2U6IGFueSxcbik6IG1lc3NhZ2UgaXMgV29ya2VyQWN0aW9uTWVzc2FnZSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG1lc3NhZ2UgPT09IFwib2JqZWN0XCIgJiZcbiAgICBtZXNzYWdlICE9PSBudWxsICYmXG4gICAgXCJhY3Rpb25cIiBpbiBtZXNzYWdlICYmXG4gICAgT2JqZWN0LnZhbHVlcyhXT1JLRVJfQUNUSU9OKS5pbmNsdWRlcyhtZXNzYWdlLmFjdGlvbilcbiAgKTtcbn07XG4iLCAiY29uc3QgZGVmYXVsdEVycm9yQ29uZmlnID0ge1xyXG4gICAgd2l0aFN0YWNrVHJhY2U6IGZhbHNlLFxyXG59O1xyXG4vLyBDdXN0b20gZXJyb3Igb2JqZWN0XHJcbi8vIENvbnRleHQgLyBkaXNjdXNzaW9uOiBodHRwczovL2dpdGh1Yi5jb20vc3VwZXJtYWNyby9uZXZlcnRocm93L3B1bGwvMjE1XHJcbmNvbnN0IGNyZWF0ZU5ldmVyVGhyb3dFcnJvciA9IChtZXNzYWdlLCByZXN1bHQsIGNvbmZpZyA9IGRlZmF1bHRFcnJvckNvbmZpZykgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHJlc3VsdC5pc09rKClcclxuICAgICAgICA/IHsgdHlwZTogJ09rJywgdmFsdWU6IHJlc3VsdC52YWx1ZSB9XHJcbiAgICAgICAgOiB7IHR5cGU6ICdFcnInLCB2YWx1ZTogcmVzdWx0LmVycm9yIH07XHJcbiAgICBjb25zdCBtYXliZVN0YWNrID0gY29uZmlnLndpdGhTdGFja1RyYWNlID8gbmV3IEVycm9yKCkuc3RhY2sgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBzdGFjazogbWF5YmVTdGFjayxcclxuICAgIH07XHJcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG5cclxuZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG50eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcblxuY2xhc3MgUmVzdWx0QXN5bmMge1xyXG4gICAgY29uc3RydWN0b3IocmVzKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHJlcztcclxuICAgIH1cclxuICAgIHN0YXRpYyBmcm9tU2FmZVByb21pc2UocHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb21pc2UgPSBwcm9taXNlLnRoZW4oKHZhbHVlKSA9PiBuZXcgT2sodmFsdWUpKTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG5ld1Byb21pc2UpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb21Qcm9taXNlKHByb21pc2UsIGVycm9yRm4pIHtcclxuICAgICAgICBjb25zdCBuZXdQcm9taXNlID0gcHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IG5ldyBPayh2YWx1ZSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gbmV3IEVycihlcnJvckZuKGUpKSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuZXdQcm9taXNlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBzdGF0aWMgZnJvbVRocm93YWJsZShmbiwgZXJyb3JGbikge1xyXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKCgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZm4oLi4uYXJncykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoZXJyb3JGbiA/IGVycm9yRm4oZXJyb3IpIDogZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSkoKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21iaW5lKGFzeW5jUmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0QXN5bmNMaXN0KGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29tYmluZVdpdGhBbGxFcnJvcnMoYXN5bmNSZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzKGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZihyZXMudmFsdWUpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgYW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3UmVzID0geWllbGQgZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3UmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKG5ld1Jlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRlZSBkb2VzIG5vdCBjYXJlIGFib3V0IHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgbWFwRXJyKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNPaygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoeWllbGQgZihyZXMuZXJyb3IpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWUgaW5zdGFuY2VvZiBSZXN1bHRBc3luYyA/IG5ld1ZhbHVlLl9wcm9taXNlIDogbmV3VmFsdWU7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIG9yRWxzZShmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBtYXRjaChvaywgX2Vycikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gcmVzLm1hdGNoKG9rLCBfZXJyKSk7XHJcbiAgICB9XHJcbiAgICB1bndyYXBPcih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiByZXMudW53cmFwT3IodCkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCB3aWxsIGJlIHJlbW92ZWQgaW4gOS4wLjAuXHJcbiAgICAgKlxyXG4gICAgICogWW91IGNhbiB1c2UgYHNhZmVUcnlgIHdpdGhvdXQgdGhpcyBtZXRob2QuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYGBgdHlwZXNjcmlwdFxyXG4gICAgICogc2FmZVRyeShhc3luYyBmdW5jdGlvbiogKCkge1xyXG4gICAgICogICBjb25zdCBva1ZhbHVlID0geWllbGQqIHlvdXJSZXN1bHRcclxuICAgICAqIH0pXHJcbiAgICAgKiBgYGBcclxuICAgICAqIEVtdWxhdGVzIFJ1c3QncyBgP2Agb3BlcmF0b3IgaW4gYHNhZmVUcnlgJ3MgYm9keS4gU2VlIGFsc28gYHNhZmVUcnlgLlxyXG4gICAgICovXHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24qIHNhZmVVbndyYXBfMSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9fYXdhaXQoeWllbGQgX19hd2FpdCh5aWVsZCogX19hc3luY0RlbGVnYXRvcihfX2FzeW5jVmFsdWVzKHlpZWxkIF9fYXdhaXQodGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHJlcy5zYWZlVW53cmFwKCkpKSkpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlcyBSZXN1bHRBc3luYyBpbXBsZW1lbnQgUHJvbWlzZUxpa2U8UmVzdWx0PlxyXG4gICAgdGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpIHtcclxuICAgICAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBfYSgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgX19hd2FpdCh0aGlzLl9wcm9taXNlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICAgICAgICAgIHlpZWxkIHlpZWxkIF9fYXdhaXQoZXJyQXN5bmMocmVzdWx0LmVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCBfX2F3YWl0KHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuY29uc3Qgb2tBc3luYyA9ICh2YWx1ZSkgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgT2sodmFsdWUpKSk7XHJcbmNvbnN0IGVyckFzeW5jID0gKGVycikgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgRXJyKGVycikpKTtcclxuY29uc3QgZnJvbVByb21pc2UgPSBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZTtcclxuY29uc3QgZnJvbVNhZmVQcm9taXNlID0gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlO1xyXG5jb25zdCBmcm9tQXN5bmNUaHJvd2FibGUgPSBSZXN1bHRBc3luYy5mcm9tVGhyb3dhYmxlO1xuXG4vKipcclxuICogU2hvcnQgY2lyY3VpdHMgb24gdGhlIEZJUlNUIEVyciB2YWx1ZSB0aGF0IHdlIGZpbmRcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRMaXN0ID0gKHJlc3VsdExpc3QpID0+IHtcclxuICAgIGxldCBhY2MgPSBvayhbXSk7XHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgIGFjYyA9IGVycihyZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFjYy5tYXAoKGxpc3QpID0+IGxpc3QucHVzaChyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG59O1xyXG4vKiBUaGlzIGlzIHRoZSB0eXBlc2FmZSB2ZXJzaW9uIG9mIFByb21pc2UuYWxsXHJcbiAqXHJcbiAqIFRha2VzIGEgbGlzdCBvZiBSZXN1bHRBc3luYzxULCBFPiBhbmQgc3VjY2VzcyBpZiBhbGwgaW5uZXIgcmVzdWx0cyBhcmUgT2sgdmFsdWVzXHJcbiAqIG9yIGZhaWxzIGlmIG9uZSAob3IgbW9yZSkgb2YgdGhlIGlubmVyIHJlc3VsdHMgYXJlIEVyciB2YWx1ZXNcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3QgPSAoYXN5bmNSZXN1bHRMaXN0KSA9PiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoUHJvbWlzZS5hbGwoYXN5bmNSZXN1bHRMaXN0KSkuYW5kVGhlbihjb21iaW5lUmVzdWx0TGlzdCk7XHJcbi8qKlxyXG4gKiBHaXZlIGEgbGlzdCBvZiBhbGwgdGhlIGVycm9ycyB3ZSBmaW5kXHJcbiAqL1xyXG5jb25zdCBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMgPSAocmVzdWx0TGlzdCkgPT4ge1xyXG4gICAgbGV0IGFjYyA9IG9rKFtdKTtcclxuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdExpc3QpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgYWNjLmVycm9yLnB1c2gocmVzdWx0LmVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzT2soKSkge1xyXG4gICAgICAgICAgICBhY2MgPSBlcnIoW3Jlc3VsdC5lcnJvcl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXN1bHQuaXNPaygpICYmIGFjYy5pc09rKCkpIHtcclxuICAgICAgICAgICAgYWNjLnZhbHVlLnB1c2gocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZG8gbm90aGluZyB3aGVuIHJlc3VsdC5pc09rKCkgJiYgYWNjLmlzRXJyKClcclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbn07XHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzID0gKGFzeW5jUmVzdWx0TGlzdCkgPT4gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlKFByb21pc2UuYWxsKGFzeW5jUmVzdWx0TGlzdCkpLmFuZFRoZW4oY29tYmluZVJlc3VsdExpc3RXaXRoQWxsRXJyb3JzKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcclxudmFyIFJlc3VsdDtcclxuKGZ1bmN0aW9uIChSZXN1bHQpIHtcclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgYSBmdW5jdGlvbiB3aXRoIGEgdHJ5IGNhdGNoLCBjcmVhdGluZyBhIG5ldyBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lXHJcbiAgICAgKiBhcmd1bWVudHMgYnV0IHJldHVybmluZyBgT2tgIGlmIHN1Y2Nlc3NmdWwsIGBFcnJgIGlmIHRoZSBmdW5jdGlvbiB0aHJvd3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24gdG8gd3JhcCB3aXRoIG9rIG9uIHN1Y2Nlc3Mgb3IgZXJyIG9uIGZhaWx1cmVcclxuICAgICAqIEBwYXJhbSBlcnJvckZuIHdoZW4gYW4gZXJyb3IgaXMgdGhyb3duLCB0aGlzIHdpbGwgd3JhcCB0aGUgZXJyb3IgcmVzdWx0IGlmIHByb3ZpZGVkXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBmdW5jdGlvbiBmcm9tVGhyb3dhYmxlKGZuLCBlcnJvckZuKSB7XHJcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbiguLi5hcmdzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvayhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyKGVycm9yRm4gPyBlcnJvckZuKGUpIDogZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmZyb21UaHJvd2FibGUgPSBmcm9tVGhyb3dhYmxlO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZShyZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRMaXN0KHJlc3VsdExpc3QpO1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmNvbWJpbmUgPSBjb21iaW5lO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZVdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuY29tYmluZVdpdGhBbGxFcnJvcnMgPSBjb21iaW5lV2l0aEFsbEVycm9ycztcclxufSkoUmVzdWx0IHx8IChSZXN1bHQgPSB7fSkpO1xyXG5jb25zdCBvayA9ICh2YWx1ZSkgPT4gbmV3IE9rKHZhbHVlKTtcclxuZnVuY3Rpb24gZXJyKGVycikge1xyXG4gICAgcmV0dXJuIG5ldyBFcnIoZXJyKTtcclxufVxyXG5mdW5jdGlvbiBzYWZlVHJ5KGJvZHkpIHtcclxuICAgIGNvbnN0IG4gPSBib2R5KCkubmV4dCgpO1xyXG4gICAgaWYgKG4gaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuLnRoZW4oKHIpID0+IHIudmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuLnZhbHVlO1xyXG59XHJcbmNsYXNzIE9rIHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaXNPaygpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlzRXJyKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc09rKCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBvayhmKHRoaXMudmFsdWUpKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcEVycihfZikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaGVuKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKS5tYXAoKF92YWx1ZSkgPT4gdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGYodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRlZSBkb2Vzbid0IGNhcmUgYWJvdXQgdGhlIGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBvckVsc2UoX2YpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhc3luY0FuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFzeW5jQW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSkubWFwKCgpID0+IHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgYXN5bmNNYXAoZikge1xyXG4gICAgICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoZih0aGlzLnZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICB1bndyYXBPcihfdikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWF0Y2gob2ssIF9lcnIpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS15aWVsZCAqL1xyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKF8pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXBFcnIoY29uZmlnKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yKCdDYWxsZWQgYF91bnNhZmVVbndyYXBFcnJgIG9uIGFuIE9rJywgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcywgcmVxdWlyZS15aWVsZFxyXG4gICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEVyciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgIH1cclxuICAgIGlzT2soKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNFcnIoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzT2soKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBtYXBFcnIoZikge1xyXG4gICAgICAgIHJldHVybiBlcnIoZih0aGlzLmVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUaHJvdWdoKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgb3JFbHNlKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jQW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFzeW5jQW5kVGhyb3VnaChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jTWFwKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgdW53cmFwT3Iodikge1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG4gICAgbWF0Y2goX29rLCBlcnIpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2FmZVVud3JhcCgpIHtcclxuICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuZXJyb3I7XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB5aWVsZCBlcnIoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgdGhpcyBnZW5lcmF0b3Igb3V0IG9mIGBzYWZlVHJ5YCcpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKGNvbmZpZykge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZU5ldmVyVGhyb3dFcnJvcignQ2FsbGVkIGBfdW5zYWZlVW53cmFwYCBvbiBhbiBFcnInLCB0aGlzLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcEVycihfKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3I7XHJcbiAgICB9XHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgeWllbGQgc2VsZjtcclxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxufVxyXG5jb25zdCBmcm9tVGhyb3dhYmxlID0gUmVzdWx0LmZyb21UaHJvd2FibGU7XHJcbi8vI2VuZHJlZ2lvblxuXG5leHBvcnQgeyBFcnIsIE9rLCBSZXN1bHQsIFJlc3VsdEFzeW5jLCBlcnIsIGVyckFzeW5jLCBmcm9tQXN5bmNUaHJvd2FibGUsIGZyb21Qcm9taXNlLCBmcm9tU2FmZVByb21pc2UsIGZyb21UaHJvd2FibGUsIG9rLCBva0FzeW5jLCBzYWZlVHJ5IH07XG4iLCAidHlwZSBKc29uYWJsZSA9XG4gIHwgc3RyaW5nXG4gIHwgbnVtYmVyXG4gIHwgYm9vbGVhblxuICB8IG51bGxcbiAgfCB1bmRlZmluZWRcbiAgfCByZWFkb25seSBKc29uYWJsZVtdXG4gIHwgeyByZWFkb25seSBba2V5OiBzdHJpbmddOiBKc29uYWJsZSB9XG4gIHwgeyB0b0pTT04oKTogSnNvbmFibGUgfTtcblxuZXhwb3J0IGNsYXNzIEJhc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbnRleHQ/OiBKc29uYWJsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIG9wdGlvbnM6IHsgY2F1c2U/OiBFcnJvcjsgY29udGV4dD86IEpzb25hYmxlIH0gPSB7fSxcbiAgKSB7XG4gICAgY29uc3QgeyBjYXVzZSwgY29udGV4dCB9ID0gb3B0aW9ucztcblxuICAgIHN1cGVyKG1lc3NhZ2UsIHsgY2F1c2UgfSk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgfVxufVxuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIFdlYlNvY2tldEVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgV2ViU29ja2V0RXJyb3IgfSBmcm9tIFwifi9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXRDb25uZWN0aW9uRXJyb3IgZXh0ZW5kcyBXZWJTb2NrZXRFcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2UgPSBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNvbm5lY3QgdG8gV2ViU29ja2V0XCI7XG59XG4iLCAiaW1wb3J0IHsgZXJyQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IENvbm5lY3Rpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Nvbm5lY3Rpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IFNlcnZlckVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivc2VydmVyLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlckNvbmZpZyB9IGZyb20gXCJ+L2ludGVyZmFjZS9zZXJ2ZXItY29uZmlnLnRzXCI7XG5cbi8qKlxuICogRW5zdXJlIGFuIGVycm9yIG1lc3NhZ2UgaXMgdHJhbnNmb3JtZWQgaW4gYW4gRXJyb3Igb2JqZWN0XG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5zdXJlRXJyb3IgPSAodmFsdWU6IHVua25vd24pOiBFcnJvciA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsdWU7XG5cbiAgbGV0IHN0cmluZ2lmaWVkID0gXCJbVW5hYmxlIHRvIHN0cmluZ2lmeSB0aGUgdGhyb3duIHZhbHVlXVwiO1xuICB0cnkge1xuICAgIHN0cmluZ2lmaWVkID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAvKiBlbXB0eSAqL1xuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihzdHJpbmdpZmllZCk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIEx1ZmkncyBjb25maWcgZnJvbSBpdHMgQVBJXG4gKlxuICogQHBhcmFtIGluc3RhbmNlVXJsXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTZXJ2ZXJDb25maWcgPSAoXG4gIGluc3RhbmNlVXJsOiBVUkwsXG4pOiBSZXN1bHRBc3luYzxTZXJ2ZXJDb25maWcsIEVycm9yPiA9PiB7XG4gIGNvbnN0IG9yaWdpbk1hdGNoZXMgPSBpbnN0YW5jZVVybC5ocmVmLm1hdGNoKFxuICAgIC8oLio/KVxcLz8oPzpcXC9bZHJdezF9XFwvfGxvZ2luXFwvP3xmaWxlc1xcLz8pLyxcbiAgKTtcblxuICBjb25zdCB1cmxPcmlnaW4gPSBvcmlnaW5NYXRjaGVzICYmIG9yaWdpbk1hdGNoZXNbMV1cbiAgICA/IG9yaWdpbk1hdGNoZXNbMV1cbiAgICA6IGluc3RhbmNlVXJsLm9yaWdpbjtcblxuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgZmV0Y2godXJsT3JpZ2luICsgXCIvYWJvdXQvY29uZmlnXCIpLFxuICAgIChlcnJvcikgPT5cbiAgICAgIG5ldyBDb25uZWN0aW9uRXJyb3IodW5kZWZpbmVkLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgKS5hbmRUaGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgICAgICByZXNwb25zZS5qc29uKCksXG4gICAgICAgIChlcnJvcikgPT4gZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgICBuZXcgU2VydmVyRXJyb3IodW5kZWZpbmVkLCB7IGNvbnRleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQgfSksXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNEZW5vUnVudGltZSA9ICgpOiBib29sZWFuID0+IHR5cGVvZiBEZW5vICE9PSBcInVuZGVmaW5lZFwiO1xuXG5leHBvcnQgY29uc3QgaXNTZWN1cmVDb250ZXh0ID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gaXNEZW5vUnVudGltZSgpIHx8IGdsb2JhbFRoaXMuaXNTZWN1cmVDb250ZXh0IHx8XG4gICAgZ2xvYmFsVGhpcy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcbn07XG5cbmV4cG9ydCBjb25zdCB3b3JrZXJVcmwgPSAocmVsYXRpdmVQYXRoOiBzdHJpbmcpOiBVUkwgPT4ge1xuICByZXR1cm4gaXNEZW5vUnVudGltZSgpXG4gICAgPyBuZXcgVVJMKGAuL3dvcmtlci8ke3JlbGF0aXZlUGF0aH0udHNgLCBuZXcgVVJMKFwiLlwiLCBpbXBvcnQubWV0YS51cmwpLmhyZWYpXG4gICAgOiBuZXcgVVJMKFxuICAgICAgaW1wb3J0Lm1ldGEucmVzb2x2ZShcbiAgICAgICAgYC4vJHtcbiAgICAgICAgICByZWxhdGl2ZVBhdGggIT09IFwiZW5jcnlwdFwiID8gYHdvcmtlci8ke3JlbGF0aXZlUGF0aH1gIDogcmVsYXRpdmVQYXRoXG4gICAgICAgIH0uanNgLFxuICAgICAgKSxcbiAgICApO1xufTtcbiIsIG51bGwsIG51bGwsIG51bGwsICJpbXBvcnQge1xuICBEZWNvZGUgYXMgYjY0ZGVjb2RlLFxuICBFbmNvZGUgYXMgYjY0ZW5jb2RlLFxufSBmcm9tIFwiYXJyYXlidWZmZXItZW5jb2RpbmcvYmFzZTY0XCI7XG5pbXBvcnQgeyBlcnJBc3luYywgb2tBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHNqY2wgZnJvbSBcImx1Zmktc2pjbFwiO1xuaW1wb3J0IHsgQ3J5cHRvQWxnb3JpdGhtIH0gZnJvbSBcIn4vZW51bS9jcnlwdG8tYWxnb3JpdGhtLnRzXCI7XG5pbXBvcnQgeyBDcnlwdG9FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9jcnlwdG8tZXJyb3IudHNcIjtcbmltcG9ydCB7IERlY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9kZWNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBFbmNyeXB0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vZW5jcnlwdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgdHlwZSBFbmNyeXB0ZWREYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL2VuY3J5cHRlZC1kYXRhLnRzXCI7XG5pbXBvcnQgeyBlbnN1cmVFcnJvciB9IGZyb20gXCJ+L3V0aWxzLnRzXCI7XG5pbXBvcnQgeyBIYXNoaW5nRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vaGFzaGluZy1lcnJvci50c1wiO1xuXG4vKipcbiAqIERlY3J5cHQgYW4gRW5jcnlwdGVkRGF0YSBvciBhIHN0cmluZyB1c2luZyB0aGUga2V5IHVzZWQgZm9yIGVuY3J5cHRpb24uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGVuY3J5cHRlZERhdGFcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkZWNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgZW5jcnlwdGVkRGF0YTogRW5jcnlwdGVkRGF0YSB8IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPEFycmF5QnVmZmVyLCBEZWNyeXB0aW9uRXJyb3I+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gdHlwZW9mIGVuY3J5cHRlZERhdGEgPT09IFwic3RyaW5nXCJcbiAgICAgID8gZW5jcnlwdGVkRGF0YVxuICAgICAgOiBuZXcgVGV4dERlY29kZXIoKS5kZWNvZGUoZW5jcnlwdGVkRGF0YS5kYXRhIGFzIEFycmF5QnVmZmVyKTtcblxuICAgIHJldHVybiBva0FzeW5jKGI2NGRlY29kZShzamNsLmRlY3J5cHQoa2V5LCBkYXRhKSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJBc3luYyhcbiAgICAgIG5ldyBEZWNyeXB0aW9uRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBFbmNyeXB0IGFuIEFycmF5QnVmZmVyIGludG8gYW4gRW5jcnlwdGVkRGF0YSB1c2luZyB0aGUgcHJvdmlkZWQga2V5XG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5jcnlwdCA9IChcbiAga2V5OiBzdHJpbmcsXG4gIHZhbHVlOiBBcnJheUJ1ZmZlcixcbik6IFJlc3VsdEFzeW5jPEVuY3J5cHRlZERhdGEsIEVuY3J5cHRpb25FcnJvcj4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGVuY3J5cHRlZCA9IHNqY2wuZW5jcnlwdChrZXksIGI2NGVuY29kZSh2YWx1ZSkpO1xuXG4gICAgcmV0dXJuIG9rQXN5bmMoe1xuICAgICAgYWxnbzogQ3J5cHRvQWxnb3JpdGhtLlNqY2wsXG4gICAgICBkYXRhOiBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoZW5jcnlwdGVkKS5idWZmZXIsXG4gICAgICBpdjogSlNPTi5wYXJzZShlbmNyeXB0ZWQgYXMgdW5rbm93biBhcyBzdHJpbmcpLml2LFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJBc3luYyhcbiAgICAgIG5ldyBFbmNyeXB0aW9uRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmcgdXNpbmcgU2pjbCBBUElcbiAqXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVLZXkgPSAoKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBDcnlwdG9FcnJvcj4gPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBva0FzeW5jKHNqY2wuY29kZWMuYmFzZTY0LmZyb21CaXRzKHNqY2wucmFuZG9tLnJhbmRvbVdvcmRzKDgsIDEwKSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJBc3luYyhcbiAgICAgIG5ldyBDcnlwdG9FcnJvcihcIlVuYWJsZSB0byBnZW5lcmF0ZSBrZXlcIiwge1xuICAgICAgICBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgfSksXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBIYXNoIGEgcGFzc3dvcmQgdXNpbmcgU2pjbCBBUElcbiAqXG4gKiBAcGFyYW0gcGFzc3dvcmRcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSAoXG4gIHBhc3N3b3JkOiBzdHJpbmcsXG4pOiBSZXN1bHRBc3luYzxzdHJpbmcsIEhhc2hpbmdFcnJvcj4gPT4ge1xuICB0cnkge1xuICAgIHJldHVybiBva0FzeW5jKHNqY2wuY29kZWMuaGV4LmZyb21CaXRzKHNqY2wuaGFzaC5zaGE1MTIuaGFzaChwYXNzd29yZCkpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyQXN5bmMobmV3IEhhc2hpbmdFcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSk7XG4gIH1cbn07XG5cbi8qKlxuICogRGV0ZWN0IGlmIHRoZSBrZXkgaGFzIGJlZW4gZ2VuZXJhdGVkIGJ5IFNqY2wuIFNpbmNlIHdlJ3JlIG5vdCBnZW5lcmF0aW5nIGFuIGVxdWFsIHN5bWJvbCBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcgd2l0aCB0aGUgV2ViQ3J5cHRvIEFQSSAoYnkgdXNpbmcgYmFzZTY0dXJsKSwgaXQncyBlYXN5IHRvIGRldGVjdFxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NqY2xLZXkgPSAoa2V5OiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgcmV0dXJuIGtleVtrZXkubGVuZ3RoIC0gMV0gPT09IFwiPVwiO1xufTtcbiIsICJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwifi9lcnJvci9iYXNlLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBDcnlwdG9FcnJvciBleHRlbmRzIEJhc2VFcnJvciB7fVxuIiwgImltcG9ydCB7IENyeXB0b0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2NyeXB0by1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgRGVjcnlwdGlvbkVycm9yIGV4dGVuZHMgQ3J5cHRvRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlOiBzdHJpbmcgPSBcIlVuYWJsZSB0byBkZWNyeXB0IHRoZSBwcm92aWRlZCBkYXRhXCI7XG59XG4iLCAiaW1wb3J0IHtcbiAgRGVjb2RlIGFzIGI2NHVybGRlY29kZSxcbiAgRW5jb2RlIGFzIGI2NHVybGVuY29kZSxcbn0gZnJvbSBcImFycmF5YnVmZmVyLWVuY29kaW5nL2Jhc2U2NC91cmxcIjtcbmltcG9ydCB7IHR5cGUgRW5jcnlwdGVkRGF0YSB9IGZyb20gXCJ+L2ludGVyZmFjZS9lbmNyeXB0ZWQtZGF0YS50c1wiO1xuaW1wb3J0IHsgQ3J5cHRvQWxnb3JpdGhtIH0gZnJvbSBcIn4vZW51bS9jcnlwdG8tYWxnb3JpdGhtLnRzXCI7XG5pbXBvcnQgeyBEZWNyeXB0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vZGVjcnlwdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgb2tBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHsgZW5zdXJlRXJyb3IgfSBmcm9tIFwifi91dGlscy50c1wiO1xuaW1wb3J0IHsgRW5jcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2VuY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IENyeXB0b0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2NyeXB0by1lcnJvci50c1wiO1xuaW1wb3J0IHsgSGFzaGluZ0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2hhc2hpbmctZXJyb3IudHNcIjtcblxuLyoqXG4gKiBEZWNyeXB0IGFuIGVuY3J5cHRlZERhdGEgdXNpbmcgdGhlIGtleSB1c2VkIGZvciBlbmNyeXB0aW9uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIGVuY3J5cHRlZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICBlbmNyeXB0ZWQ6IEVuY3J5cHRlZERhdGEsXG4pOiBSZXN1bHRBc3luYzxBcnJheUJ1ZmZlciwgRGVjcnlwdGlvbkVycm9yPiA9PiB7XG4gIHJldHVybiBpbXBvcnRLZXkoa2V5KS5hbmRUaGVuKChpbXBvcnRlZEtleSkgPT5cbiAgICBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgIGNyeXB0by5zdWJ0bGUuZGVjcnlwdChcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiQUVTLUdDTVwiLFxuICAgICAgICAgIGl2OiBlbmNyeXB0ZWQuaXYgYXMgVWludDhBcnJheSxcbiAgICAgICAgfSxcbiAgICAgICAgaW1wb3J0ZWRLZXksXG4gICAgICAgIGVuY3J5cHRlZC5kYXRhIGFzIEFycmF5QnVmZmVyLFxuICAgICAgKSxcbiAgICAgIChlcnJvcikgPT4gbmV3IERlY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApXG4gICk7XG59O1xuXG4vKipcbiAqIEVuY3J5cHQgYW4gQXJyYXlCdWZmZXIgaW50byBhbiBFbmNyeXB0ZWREYXRhIHVzaW5nIHRoZSBwcm92aWRlZCBrZXlcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGVuY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICB2YWx1ZTogQXJyYXlCdWZmZXIsXG4pOiBSZXN1bHRBc3luYzxFbmNyeXB0ZWREYXRhLCBFbmNyeXB0aW9uRXJyb3I+ID0+IHtcbiAgcmV0dXJuIGltcG9ydEtleShrZXkpLmFuZFRoZW4oKGltcG9ydGVkS2V5KSA9PiB7XG4gICAgY29uc3QgaXYgPSBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKG5ldyBVaW50OEFycmF5KDEyKSk7XG4gICAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgICAgY3J5cHRvLnN1YnRsZS5lbmNyeXB0KFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJBRVMtR0NNXCIsXG4gICAgICAgICAgaXYsXG4gICAgICAgIH0sXG4gICAgICAgIGltcG9ydGVkS2V5LFxuICAgICAgICB2YWx1ZSxcbiAgICAgICksXG4gICAgICAoZXJyb3IpID0+XG4gICAgICAgIG5ldyBFbmNyeXB0aW9uRXJyb3IodW5kZWZpbmVkLCB7XG4gICAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgICAgfSksXG4gICAgKS5hbmRUaGVuKChlbmNyeXB0ZWQpID0+IHtcbiAgICAgIHJldHVybiBva0FzeW5jKHtcbiAgICAgICAgYWxnbzogQ3J5cHRvQWxnb3JpdGhtLldlYkNyeXB0byxcbiAgICAgICAgZGF0YTogZW5jcnlwdGVkLFxuICAgICAgICBpdixcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtIGEgc3RyaW5nIGludG8gYSBDcnlwdG9LZXksIHVzYWJsZSBpbiBXZWIgQ3J5cHRvIEFQSVxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBpbXBvcnRLZXkgPSAoa2V5OiBzdHJpbmcpOiBSZXN1bHRBc3luYzxDcnlwdG9LZXksIENyeXB0b0Vycm9yPiA9PiB7XG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBjcnlwdG8uc3VidGxlLmltcG9ydEtleShcbiAgICAgIFwicmF3XCIsXG4gICAgICBiNjR1cmxkZWNvZGUoa2V5KSxcbiAgICAgIHsgbmFtZTogXCJBRVMtR0NNXCIgfSxcbiAgICAgIGZhbHNlLFxuICAgICAgW1xuICAgICAgICBcImVuY3J5cHRcIixcbiAgICAgICAgXCJkZWNyeXB0XCIsXG4gICAgICBdLFxuICAgICksXG4gICAgKGVycm9yKSA9PlxuICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGltcG9ydCBjcnlwdG9ncmFwaHkga2V5XCIsIHtcbiAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgIH0pLFxuICApO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHJhbmRvbSBzdHJpbmcgdXNpbmcgV2ViIENyeXB0byBBUEkuXG4gKlxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlS2V5ID0gKCk6IFJlc3VsdEFzeW5jPHN0cmluZywgQ3J5cHRvRXJyb3I+ID0+IHtcbiAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICBjcnlwdG8uc3VidGxlXG4gICAgICAgIC5nZW5lcmF0ZUtleShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBcIkFFUy1HQ01cIixcbiAgICAgICAgICAgIGxlbmd0aDogMjU2LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICBbXCJlbmNyeXB0XCIsIFwiZGVjcnlwdFwiXSxcbiAgICAgICAgKVxuICAgICAgICAudGhlbigoZ2VuZXJhdGVkS2V5KSA9PlxuICAgICAgICAgIGNyeXB0by5zdWJ0bGVcbiAgICAgICAgICAgIC5leHBvcnRLZXkoXCJyYXdcIiwgZ2VuZXJhdGVkS2V5KVxuICAgICAgICAgICAgLnRoZW4oKGtleSkgPT4gcmVzb2x2ZShiNjR1cmxlbmNvZGUoa2V5KSkpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgICAgICBuZXcgQ3J5cHRvRXJyb3IoXCJVbmFibGUgdG8gYmFzZTY0IGVuY29kZSB0aGUgdXJsXCIsIHtcbiAgICAgICAgICAgICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdChlcnJvcikpXG4gICAgKSxcbiAgICAoZXJyb3IpID0+XG4gICAgICBuZXcgQ3J5cHRvRXJyb3IoXCJVbmFibGUgdG8gZ2VuZXJhdGUga2V5XCIsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgKTtcbn07XG5cbi8qKlxuICogSGFzaCBhIHBhc3N3b3JkIHVzaW5nIFdlYkNyeXB0byBBUElcbiAqXG4gKiBAcGFyYW0gcGFzc3dvcmRcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSAoXG4gIHBhc3N3b3JkOiBzdHJpbmcsXG4pOiBSZXN1bHRBc3luYzxzdHJpbmcsIEhhc2hpbmdFcnJvcj4gPT4ge1xuICBjb25zdCBwcm9taXNlID0gYXN5bmMgKCkgPT4ge1xuICAgIHJldHVybiBBcnJheS5mcm9tKFxuICAgICAgbmV3IFVpbnQ4QXJyYXkoXG4gICAgICAgIGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KFxuICAgICAgICAgIFwiU0hBLTUxMlwiLFxuICAgICAgICAgIG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShwYXNzd29yZCksXG4gICAgICAgICksXG4gICAgICApLFxuICAgICkubWFwKChiKSA9PiBiLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCBcIjBcIikpLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIHByb21pc2UoKSxcbiAgICAoZXJyb3IpID0+IG5ldyBIYXNoaW5nRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICk7XG59O1xuIiwgImltcG9ydCB7IENyeXB0b0FsZ29yaXRobSB9IGZyb20gXCJ+L2VudW0vY3J5cHRvLWFsZ29yaXRobS50c1wiO1xuaW1wb3J0IHsgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHR5cGUgeyBDcnlwdG9FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9jcnlwdG8tZXJyb3IudHNcIjtcbmltcG9ydCB0eXBlIHsgRGVjcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2RlY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB0eXBlIHsgRW5jcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2VuY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IHR5cGUgRW5jcnlwdGVkRGF0YSB9IGZyb20gXCJ+L2ludGVyZmFjZS9lbmNyeXB0ZWQtZGF0YS50c1wiO1xuaW1wb3J0ICogYXMgc2pjbCBmcm9tIFwifi9hcGkvY3J5cHRvL3NqY2wudHNcIjtcbmltcG9ydCAqIGFzIHdlYiBmcm9tIFwifi9hcGkvY3J5cHRvL3dlYi50c1wiO1xuaW1wb3J0IHR5cGUgeyBIYXNoaW5nRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vaGFzaGluZy1lcnJvci50c1wiO1xuXG4vKipcbiAqIERlY3J5cHQgYW4gRW5jcnlwdGVkRGF0YSBvYmplY3QgdXNpbmcgdGhlIGtleSB1c2VkIGZvciBlbmNyeXB0aW9uXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZGVjcnlwdCA9IChcbiAga2V5OiBzdHJpbmcsXG4gIHZhbHVlOiBFbmNyeXB0ZWREYXRhLFxuKTogUmVzdWx0QXN5bmM8QXJyYXlCdWZmZXIsIERlY3J5cHRpb25FcnJvcj4gPT5cbiAgdmFsdWUuYWxnbyA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlLmFsZ28gPT09IENyeXB0b0FsZ29yaXRobS5TamNsXG4gICAgPyBzamNsLmRlY3J5cHQoa2V5LCB2YWx1ZSlcbiAgICA6IHdlYi5kZWNyeXB0KGtleSwgdmFsdWUpO1xuXG4vKipcbiAqIEVuY3J5cHQgYW4gQXJyYXlCdWZmZXIgdXNpbmcgdGhlIHByb3ZpZGVkIGtleSBhbmQgYWxnb3JpdGhtXG4gKlxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gYWxnb1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGVuY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICB2YWx1ZTogQXJyYXlCdWZmZXIsXG4gIGFsZ286IENyeXB0b0FsZ29yaXRobSxcbik6IFJlc3VsdEFzeW5jPEVuY3J5cHRlZERhdGEsIEVuY3J5cHRpb25FcnJvcj4gPT5cbiAgKGFsZ28gPT09IENyeXB0b0FsZ29yaXRobS5TamNsKVxuICAgID8gc2pjbC5lbmNyeXB0KGtleSwgdmFsdWUpXG4gICAgOiB3ZWIuZW5jcnlwdChrZXksIHZhbHVlKTtcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIG5ldyBrZXkgZm9yIGVuY3J5cHRpb24vZGVjcnlwdGlvblxuICpcbiAqIEBwYXJhbSBhbGdvXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVLZXkgPSAoXG4gIGFsZ28gPSBDcnlwdG9BbGdvcml0aG0uV2ViQ3J5cHRvLFxuKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBDcnlwdG9FcnJvcj4gPT5cbiAgYWxnbyA9PT0gQ3J5cHRvQWxnb3JpdGhtLlNqY2wgPyBzamNsLmdlbmVyYXRlS2V5KCkgOiB3ZWIuZ2VuZXJhdGVLZXkoKTtcblxuLyoqXG4gKiBIYXNoIGEgcGFzc3dvcmQgdXNpbmcgdGhlIHByb3ZpZGVkIGFsZ29yaXRobVxuICpcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHBhcmFtIGFsZ29cbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBoYXNoUGFzc3dvcmQgPSAoXG4gIHBhc3N3b3JkOiBzdHJpbmcsXG4gIGFsZ286IENyeXB0b0FsZ29yaXRobSxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgSGFzaGluZ0Vycm9yPiA9PlxuICBhbGdvID09PSBDcnlwdG9BbGdvcml0aG0uU2pjbFxuICAgID8gc2pjbC5oYXNoUGFzc3dvcmQocGFzc3dvcmQpXG4gICAgOiB3ZWIuaGFzaFBhc3N3b3JkKHBhc3N3b3JkKTtcbiIsICJpbXBvcnQgeyBlcnJBc3luYywgb2tBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHsgTHVmaUZpbGUgfSBmcm9tIFwifi9lbnRpdGllcy9sdWZpLWZpbGUudHNcIjtcbmltcG9ydCB7IEVWRU5UIH0gZnJvbSBcIn4vZW51bS9ldmVudC50c1wiO1xuaW1wb3J0IHsgVVBMT0FEX1NUQVRVUyB9IGZyb20gXCJ+L2VudW0vZmlsZS1zdGF0dXMudHNcIjtcbmltcG9ydCB7IFNvY2tldFBhdGggfSBmcm9tIFwifi9lbnVtL3NvY2tldC1wYXRoLnRzXCI7XG5pbXBvcnQgeyBVcGxvYWRFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3VwbG9hZC91cGxvYWQtZXJyb3IudHNcIjtcbmltcG9ydCB7IFdlYlNvY2tldENvbm5lY3Rpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL3dlYnNvY2tldC93ZWJzb2NrZXQtY29ubmVjdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgV2ViU29ja2V0RXJyb3IgfSBmcm9tIFwifi9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IENsaWVudFVwbG9hZENodW5rTWV0YWRhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvY2xpZW50LXVwbG9hZC1jaHVuay1tZXRhZGF0YS50c1wiO1xuaW1wb3J0IHR5cGUgeyBFbmNyeXB0ZWREYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL2VuY3J5cHRlZC1kYXRhLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlckNhbmNlbE1ldGFkYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3NlcnZlci1jYW5jZWwtbWV0YWRhdGEudHNcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyRG93bmxvYWRDaHVua1N1Y2Nlc3NNZXRhZGF0YSB9IGZyb20gXCJ+L2ludGVyZmFjZS9zZXJ2ZXItZG93bmxvYWQtY2h1bmstc3VjY2Vzcy1tZXRhZGF0YS50c1wiO1xuaW1wb3J0IHR5cGUgeyBTZXJ2ZXJVcGxvYWRDaHVua01ldGFkYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3NlcnZlci11cGxvYWQtY2h1bmstbWV0YWRhdGEudHNcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyRG93bmxvYWRDaHVua01ldGFkYXRhIH0gZnJvbSBcIn4vdHlwZS9zZXJ2ZXItZG93bmxvYWQtY2h1bmstbWV0YWRhdGEudHNcIjtcbmltcG9ydCB7IGVuc3VyZUVycm9yIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB7IGV2ZW50cywgdXBkYXRlRmlsZSB9IGZyb20gXCJ+L3dvcmtlci9zaGFyZWQudHNcIjtcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tIFwifi9hcGkvY3J5cHRvLnRzXCI7XG5pbXBvcnQge1xuICBEZWNvZGUgYXMgYjY0ZGVjb2RlLFxuICBFbmNvZGUgYXMgYjY0ZW5jb2RlLFxufSBmcm9tIFwiYXJyYXlidWZmZXItZW5jb2RpbmcvYmFzZTY0XCI7XG5cbmV4cG9ydCBjb25zdCBzb2NrZXRzOiB7XG4gIFtrZXk6IHN0cmluZ106IFdlYlNvY2tldDtcbn0gPSB7fTtcblxuY29uc3QgTUFYX0VSUk9SUyA9IDU7XG5cbi8qKlxuICogSGFuZGxlIFdlYlNvY2tldCByZXNwb25zZSBmb3IgY2FuY2VsIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0gZGF0YVxuICogQHJldHVybnNcbiAqL1xuY29uc3Qgb25DYW5jZWxNZXNzYWdlID0gKFxuICBkYXRhOiBTZXJ2ZXJDYW5jZWxNZXRhZGF0YSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIEVycm9yPiA9PiB7XG4gIGV2ZW50cy5lbWl0KEVWRU5ULlVQTE9BRF9DQU5DRUxMRUQsIGRhdGEuc3VjY2Vzcyk7XG5cbiAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbn07XG5cbi8qKlxuICogSGFuZGxlIFdlYlNvY2tldCByZXNwb25zZSBmb3IgZG93bmxvYWQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSByZXNwb25zZVxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBvbkRvd25sb2FkTWVzc2FnZSA9IChcbiAgcmVzcG9uc2U6IHN0cmluZyxcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gcmVzcG9uc2Uuc3BsaXQoXCJYWE1PSk9YWFwiKTtcbiAgY29uc3QgbWV0YWRhdGFTdHJpbmcgPSByZXN1bHQuc2hpZnQoKTtcblxuICBpZiAobWV0YWRhdGFTdHJpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IG1ldGFkYXRhID0gSlNPTi5wYXJzZShtZXRhZGF0YVN0cmluZykgYXMgU2VydmVyRG93bmxvYWRDaHVua01ldGFkYXRhO1xuXG4gICAgaWYgKGlzU2VydmVyRG93bmxvYWRDaHVua1N1Y2Nlc3NNZXRhZGF0YShtZXRhZGF0YSkpIHtcbiAgICAgIGNvbnN0IGRhdGFTdHJpbmcgPSByZXN1bHQuc2hpZnQoKTtcblxuICAgICAgaWYgKGRhdGFTdHJpbmcpIHtcbiAgICAgICAgY29uc3QgZW5jcnlwdGVkRGF0YTogRW5jcnlwdGVkRGF0YSA9IEpTT04ucGFyc2UoZGF0YVN0cmluZyk7XG5cbiAgICAgICAgLy8gSWYgZmlsZSB3YXMgdXBsb2FkZWQgdXNpbmcgTHVmaSBBUElcbiAgICAgICAgaWYgKGVuY3J5cHRlZERhdGEuaXYpIHtcbiAgICAgICAgICBlbmNyeXB0ZWREYXRhLml2ID0gbmV3IFVpbnQ4QXJyYXkoT2JqZWN0LnZhbHVlcyhlbmNyeXB0ZWREYXRhLml2KSk7XG4gICAgICAgICAgZW5jcnlwdGVkRGF0YS5kYXRhID0gYjY0ZGVjb2RlKGVuY3J5cHRlZERhdGEuZGF0YSBhcyBzdHJpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNyeXB0by5kZWNyeXB0KGx1ZmlGaWxlLmtleXMuY2xpZW50LCBlbmNyeXB0ZWREYXRhKS5hbmRUaGVuKFxuICAgICAgICAgIChkZWNyeXB0ZWRQYXJ0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBidWZmZXIgPSB0eXBlb2YgZGVjcnlwdGVkUGFydCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgICA/IChuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoZGVjcnlwdGVkUGFydCkuYnVmZmVyIGFzIEFycmF5QnVmZmVyKVxuICAgICAgICAgICAgICA6IGRlY3J5cHRlZFBhcnQ7XG5cbiAgICAgICAgICAgIC8vIElmIGZpcnN0IGNodW5rXG4gICAgICAgICAgICBpZiAobWV0YWRhdGEucGFydCA9PT0gMCkge1xuICAgICAgICAgICAgICB1cGRhdGVGaWxlKGx1ZmlGaWxlLCB7XG4gICAgICAgICAgICAgICAgY2h1bmtzUmVhZHk6IGx1ZmlGaWxlLmNodW5rc1JlYWR5ICsgMSxcbiAgICAgICAgICAgICAgICBkZWxBdEZpcnN0VmlldzogbWV0YWRhdGEuZGVsX2F0X2ZpcnN0X3ZpZXcsXG4gICAgICAgICAgICAgICAgZGVsYXk6IG1ldGFkYXRhLmRlbGF5LFxuICAgICAgICAgICAgICAgIG5hbWU6IG1ldGFkYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgc2l6ZTogbWV0YWRhdGEuc2l6ZSxcbiAgICAgICAgICAgICAgICB0b3RhbENodW5rczogbWV0YWRhdGEudG90YWwsXG4gICAgICAgICAgICAgICAgdHlwZTogbWV0YWRhdGEudHlwZSxcbiAgICAgICAgICAgICAgICB6aXBwZWQ6IG1ldGFkYXRhLnppcHBlZCxcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuRE9XTkxPQURfU1RBUlRFRCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1cGRhdGVGaWxlKGx1ZmlGaWxlLCB7IGNodW5rc1JlYWR5OiBsdWZpRmlsZS5jaHVua3NSZWFkeSArIDEgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULkNIVU5LX0RPV05MT0FERUQsIGJ1ZmZlciwgbWV0YWRhdGEucGFydCk7XG5cbiAgICAgICAgICAgIGlmIChsdWZpRmlsZS5jaHVua3NSZWFkeSA9PT0gbWV0YWRhdGEudG90YWwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVuZERvd25sb2FkKGx1ZmlGaWxlKS5hbmRUaGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBldmVudHMuZW1pdChFVkVOVC5ET1dOTE9BRF9DT01QTEVURSk7XG4gICAgICAgICAgICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuU09DS0VUX09QRVJBVElPTl9URVJNSU5BVEVEKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBva0FzeW5jKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb2tBc3luYyh1bmRlZmluZWQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBXZWJTb2NrZXRFcnJvcihcbiAgICAgICAgICBcIkNhbm5vdCByZXRyaWV2ZSBtZXRhZGF0YSBmcm9tIGRhdGEgcmVjZWl2ZWQgYnkgdGhlIHNlcnZlclwiLFxuICAgICAgICApO1xuXG4gICAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKGVycm9yKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgV2ViU29ja2V0RXJyb3IobWV0YWRhdGEubXNnKTtcblxuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IpO1xuICAgICAgcmV0dXJuIGVyckFzeW5jKGVycm9yKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgV2ViU29ja2V0RXJyb3IoXG4gICAgICBcIkNhbm5vdCByZXRyaWV2ZSBtZXRhZGF0YSBmcm9tIGRhdGEgcmVjZWl2ZWQgYnkgdGhlIHNlcnZlclwiLFxuICAgICk7XG5cbiAgICBldmVudHMuZW1pdChFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvcik7XG4gICAgcmV0dXJuIGVyckFzeW5jKGVycm9yKTtcbiAgfVxufTtcblxuLyoqXG4gKiBIYW5kbGUgV2ViU29ja2V0IHJlc3BvbnNlIGZvciB1cGxvYWQgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSByZXNwb25zZVxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBvblVwbG9hZE1lc3NhZ2UgPSAoXG4gIHJlc3BvbnNlOiBTZXJ2ZXJVcGxvYWRDaHVua01ldGFkYXRhLFxuICBsdWZpRmlsZTogTHVmaUZpbGUsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBVcGxvYWRFcnJvcj4gPT4ge1xuICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgIC8vIElmIGZpcnN0IGNodW5rXG4gICAgaWYgKHJlc3BvbnNlLmogPT09IDApIHtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyhgVXBsb2FkIG9mICR7bHVmaUZpbGUua2V5cy5jbGllbnR9IHN0YXJ0ZWRgKTtcblxuICAgICAgdXBkYXRlRmlsZShsdWZpRmlsZSwge1xuICAgICAgICBrZXlzOiB7IGNsaWVudDogbHVmaUZpbGUua2V5cy5jbGllbnQsIHNlcnZlcjogcmVzcG9uc2Uuc2hvcnQgfSxcbiAgICAgICAgYWN0aW9uVG9rZW46IHJlc3BvbnNlLnRva2VuLFxuICAgICAgICBxdWV1ZUluZGV4OiByZXNwb25zZS5pLFxuICAgICAgfSk7XG5cbiAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULlVQTE9BRF9TVEFSVEVEKTtcbiAgICB9XG5cbiAgICB1cGRhdGVGaWxlKGx1ZmlGaWxlLCB7XG4gICAgICBjaHVua3NSZWFkeTogbHVmaUZpbGUuY2h1bmtzUmVhZHkgKyAxLFxuICAgICAgY3JlYXRlZEF0OiByZXNwb25zZS5jcmVhdGVkX2F0LFxuICAgIH0pO1xuXG4gICAgZXZlbnRzLmVtaXQoRVZFTlQuQ0hVTktfVVBMT0FERUQpO1xuXG4gICAgaWYgKGx1ZmlGaWxlLmNodW5rc1JlYWR5ID09PSBsdWZpRmlsZS50b3RhbENodW5rcykge1xuICAgICAgdXBkYXRlRmlsZShsdWZpRmlsZSwgeyB1cGxvYWRTdGF0dXM6IFVQTE9BRF9TVEFUVVMuQ09NUExFVEUgfSk7XG5cbiAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULlVQTE9BRF9DT01QTEVURSk7XG4gICAgICBldmVudHMuZW1pdChFVkVOVC5TT0NLRVRfT1BFUkFUSU9OX1RFUk1JTkFURUQpO1xuICAgIH1cblxuICAgIHJldHVybiBva0FzeW5jKHVuZGVmaW5lZCk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgV2ViU29ja2V0RXJyb3IocmVzcG9uc2UubXNnKTtcbiAgICBldmVudHMuZW1pdChFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvcik7XG5cbiAgICByZXR1cm4gZXJyQXN5bmMoZXJyb3IpO1xuICB9XG59O1xuXG4vKipcbiAqIENhbGxlZCBvbiBzb2NrZXRzIFwib25tZXNzYWdlXCIgZXZlbnRcbiAqXG4gKiBAcGFyYW0gZVxuICogQHBhcmFtIHNvY2tldFVybFxuICogQHJldHVybnNcbiAqL1xuY29uc3Qgb25NZXNzYWdlID0gKFxuICBlOiBNZXNzYWdlRXZlbnQsXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFVwbG9hZEVycm9yPiA9PiB7XG4gIGNvbnN0IGRhdGEgPSB0cnlQYXJzZUpzb24oZS5kYXRhKTtcblxuICBsZXQgY2FsbGJhY2s7XG5cbiAgaWYgKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEuYWN0aW9uICYmIGRhdGEubXNnKSB7XG4gICAgICAvLyBJZiBlcnJvclxuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgV2ViU29ja2V0RXJyb3IoZGF0YS5tc2cpO1xuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IpO1xuXG4gICAgICByZXR1cm4gZXJyQXN5bmMoZXJyb3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXCJkZWxheVwiIGluIGRhdGEpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvblVwbG9hZE1lc3NhZ2UoZGF0YSwgbHVmaUZpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvbkNhbmNlbE1lc3NhZ2UoZGF0YSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNhbGxiYWNrID0gb25Eb3dubG9hZE1lc3NhZ2UoZS5kYXRhLCBsdWZpRmlsZSk7XG4gIH1cblxuICByZXR1cm4gY2FsbGJhY2s7XG59O1xuXG4vKipcbiAqIElzIHNvY2tldCBjb25uZWN0aW5nP1xuICpcbiAqIEBwYXJhbSBzb2NrZXRLZXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBpc0Nvbm5lY3RpbmcgPSAoc29ja2V0S2V5OiBzdHJpbmcpOiBib29sZWFuID0+XG4gIHNvY2tldHMgIT09IHVuZGVmaW5lZCAmJlxuICBzb2NrZXRzW3NvY2tldEtleV0gIT09IHVuZGVmaW5lZCAmJlxuICBzb2NrZXRzW3NvY2tldEtleV0ucmVhZHlTdGF0ZSA9PT0gV2ViU29ja2V0LkNPTk5FQ1RJTkc7XG5cbi8qKlxuICogSXMgc29ja2V0IHNwYXduZWQ/XG4gKlxuICogQHBhcmFtIHNvY2tldEtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU3Bhd25lZCA9IChzb2NrZXRLZXk6IHN0cmluZyk6IGJvb2xlYW4gPT5cbiAgc29ja2V0cyAhPT0gdW5kZWZpbmVkICYmXG4gIHNvY2tldHNbc29ja2V0S2V5XSAhPT0gdW5kZWZpbmVkICYmXG4gIHNvY2tldHNbc29ja2V0S2V5XS5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuT1BFTjtcblxuLyoqXG4gKiBBc2sgV2ViU29ja2V0IHRvIGNhbmNlbCBhbiB1cGxvYWRcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBjYW5jZWxVcGxvYWQgPSAoXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFdlYlNvY2tldEVycm9yPiA9PiB7XG4gIHJldHVybiBzZW5kTWVzc2FnZShcbiAgICB1cGxvYWRTb2NrZXRVcmwobHVmaUZpbGUpLFxuICAgIGx1ZmlGaWxlLFxuICAgIGAke1xuICAgICAgSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBpZDogbHVmaUZpbGUua2V5cy5zZXJ2ZXIsXG4gICAgICAgIG1vZF90b2tlbjogbHVmaUZpbGUuYWN0aW9uVG9rZW4sXG4gICAgICAgIGNhbmNlbDogdHJ1ZSxcbiAgICAgICAgaTogbHVmaUZpbGUucXVldWVJbmRleCxcbiAgICAgIH0pXG4gICAgfVhYTU9KT1hYdXNlbGVzc2AsXG4gICk7XG59O1xuXG4vKipcbiAqIERvd25sb2FkIGEgcGFydCBvZiB0aGUgZmlsZSB0aHJvdWdoIHRoZSBXZWJTb2NrZXRcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEBwYXJhbSBjaHVua051bWJlclxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRvd25sb2FkQ2h1bmsgPSAoXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbiAgY2h1bmtOdW1iZXI6IG51bWJlcixcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFdlYlNvY2tldEVycm9yPiA9PiB7XG4gIGxldCBtZXNzYWdlO1xuXG4gIGlmIChsdWZpRmlsZS5wYXNzd29yZCkge1xuICAgIG1lc3NhZ2UgPSB7IHBhcnQ6IGNodW5rTnVtYmVyLCBmaWxlX3B3ZDogbHVmaUZpbGUucGFzc3dvcmQgfTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlID0geyBwYXJ0OiBjaHVua051bWJlciB9O1xuICB9XG5cbiAgcmV0dXJuIHNlbmRNZXNzYWdlKFxuICAgIGRvd25sb2FkU29ja2V0VXJsKGx1ZmlGaWxlKSxcbiAgICBsdWZpRmlsZSxcbiAgICBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgKTtcbn07XG5cbi8qKlxuICogVGVsbCB0aGUgV2ViU29ja2V0IHRoZSBkb3dubG9hZCBlbmRlZFxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGVuZERvd25sb2FkID0gKFxuICBsdWZpRmlsZTogTHVmaUZpbGUsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICBsZXQgbWVzc2FnZTogeyBlbmRlZDogdHJ1ZTsgZmlsZV9wd2Q/OiBzdHJpbmcgfTtcblxuICBpZiAobHVmaUZpbGUucGFzc3dvcmQpIHtcbiAgICBtZXNzYWdlID0geyBlbmRlZDogdHJ1ZSwgZmlsZV9wd2Q6IGx1ZmlGaWxlLnBhc3N3b3JkIH07XG4gIH0gZWxzZSB7XG4gICAgbWVzc2FnZSA9IHsgZW5kZWQ6IHRydWUgfTtcbiAgfVxuXG4gIHJldHVybiBzZW5kTWVzc2FnZShcbiAgICBkb3dubG9hZFNvY2tldFVybChsdWZpRmlsZSksXG4gICAgbHVmaUZpbGUsXG4gICAgSlNPTi5zdHJpbmdpZnkobWVzc2FnZSksXG4gICk7XG59O1xuXG4vKipcbiAqIFVwbG9hZCBhIGNodW5rIG9mIHRoZSBmaWxlIHRocm91Z2ggdGhlIFdlYlNvY2tldFxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHBhcmFtIG1ldGFkYXRhXG4gKiBAcGFyYW0gZW5jcnlwdGVkRGF0YVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHVwbG9hZENodW5rID0gKFxuICBsdWZpRmlsZTogTHVmaUZpbGUsXG4gIG1ldGFkYXRhOiBDbGllbnRVcGxvYWRDaHVua01ldGFkYXRhLFxuICBlbmNyeXB0ZWREYXRhOiBFbmNyeXB0ZWREYXRhLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgZW5jcnlwdGVkRGF0YS5kYXRhID0gYjY0ZW5jb2RlKGVuY3J5cHRlZERhdGEuZGF0YSBhcyBBcnJheUJ1ZmZlcik7XG5cbiAgcmV0dXJuIHNlbmRNZXNzYWdlKFxuICAgIHVwbG9hZFNvY2tldFVybChsdWZpRmlsZSksXG4gICAgbHVmaUZpbGUsXG4gICAgYCR7SlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpfVhYTU9KT1hYJHtKU09OLnN0cmluZ2lmeShlbmNyeXB0ZWREYXRhKX1gLFxuICApO1xufTtcblxuLyoqXG4gKiBTZW5kIGEgbWVzc2FnZSB0byB0aGUgV2ViU29ja2V0XG4gKlxuICogQHBhcmFtIHNvY2tldFVybFxuICogQHBhcmFtIG1lc3NhZ2VcbiAqIEBwYXJhbSBoYXNQcmlvcml0eVxuICogQHJldHVybnNcbiAqL1xuY29uc3Qgc2VuZE1lc3NhZ2UgPSAoXG4gIHNvY2tldFVybDogc3RyaW5nLFxuICBsdWZpRmlsZTogTHVmaUZpbGUsXG4gIG1lc3NhZ2U6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFdlYlNvY2tldEVycm9yPiA9PiB7XG4gIGlmICghaXNTcGF3bmVkKHNvY2tldFVybCkpIHtcbiAgICByZXR1cm4gc3Bhd24oc29ja2V0VXJsKS5hbmRUaGVuKCgpID0+IHtcbiAgICAgIHNvY2tldHNbc29ja2V0VXJsXS5vbm1lc3NhZ2UgPSAoZSkgPT4gb25NZXNzYWdlKGUsIGx1ZmlGaWxlKTtcbiAgICAgIHJldHVybiBzZW5kTWVzc2FnZShzb2NrZXRVcmwsIGx1ZmlGaWxlLCBtZXNzYWdlKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBzb2NrZXRzW3NvY2tldFVybF0uc2VuZChtZXNzYWdlKTtcblxuICAgIHJldHVybiBva0FzeW5jKHVuZGVmaW5lZCk7XG4gIH1cbn07XG5cbi8qKlxuICogU3Bhd24gYSBuZXcgV2ViU29ja2V0IG9yIHJldXNlIGFuIGV4aXN0aW5nIG9uZS5cbiAqXG4gKiBAcGFyYW0gc29ja2V0S2V5XG4gKiBAcGFyYW0gZXJyb3JDb3VudFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHNwYXduID0gKFxuICBzb2NrZXRLZXk6IHN0cmluZyxcbiAgZXJyb3JDb3VudCA9IDAsXG4pOiBSZXN1bHRBc3luYzxzdHJpbmcsIFdlYlNvY2tldEVycm9yPiA9PiB7XG4gIGlmICghaXNTcGF3bmVkKHNvY2tldEtleSkgJiYgIWlzQ29ubmVjdGluZyhzb2NrZXRLZXkpKSB7XG4gICAgLy8gY29uc29sZS5pbmZvKGBTcGF3bmluZyBXZWJTb2NrZXQgJHtzb2NrZXRVcmx9YCk7XG4gICAgc29ja2V0c1tzb2NrZXRLZXldID0gbmV3IFdlYlNvY2tldChzb2NrZXRLZXkpO1xuXG4gICAgZXZlbnRzLm9uY2UoRVZFTlQuU09DS0VUX09QRVJBVElPTl9URVJNSU5BVEVELCAoKSA9PiB7XG4gICAgICBzb2NrZXRzW3NvY2tldEtleV0uY2xvc2UoKTtcbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbmNlKEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsICgpID0+IHtcbiAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULlNPQ0tFVF9PUEVSQVRJT05fVEVSTUlOQVRFRCk7XG4gICAgfSk7XG5cbiAgICBzb2NrZXRzW3NvY2tldEtleV0ub25vcGVuID0gKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5pbmZvKGBXZWJzb2NrZXQgJHtzb2NrZXRLZXl9IGhhcyBiZWVuIG9wZW5gKTtcbiAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULlNPQ0tFVF9PUEVORUQpO1xuICAgIH07XG5cbiAgICBzb2NrZXRzW3NvY2tldEtleV0ub25jbG9zZSA9ICgpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUuaW5mbyhgV2Vic29ja2V0ICR7c29ja2V0S2V5fSBoYXMgYmVlbiBjbG9zZWRgKTtcbiAgICB9O1xuXG4gICAgc29ja2V0c1tzb2NrZXRLZXldLm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBpZiAoKytlcnJvckNvdW50IDw9IE1BWF9FUlJPUlMpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgICBgQW4gZXJyb3IgaGFwcGVuZWQgd2hpbGUgdHJ5aW5nIHRvIGNvbm5lY3QgdG8gV2ViU29ja2V0IFwiJHtzb2NrZXRLZXl9XCIuIFRyeWluZyBhZ2Fpbi4gJHtlcnJvckNvdW50fSAvICR7TUFYX0VSUk9SU31gLFxuICAgICAgICAgIChldmVudCBhcyBFcnJvckV2ZW50KS5lcnJvcixcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gc3Bhd24oc29ja2V0S2V5LCBlcnJvckNvdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULlNPQ0tFVF9PTkVSUk9SKTtcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgICAgIG5ldyBXZWJTb2NrZXRDb25uZWN0aW9uRXJyb3IoXG4gICAgICAgICAgICBgVW5hYmxlIHRvIGNvbm5lY3QgdG8gV2ViU29ja2V0ICR7c29ja2V0S2V5fS5gLFxuICAgICAgICAgICksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB3YWl0Rm9yQ29ubmVjdGlvbihzb2NrZXRLZXkpXG4gICAgLmFuZFRoZW4oKCkgPT4gb2tBc3luYyhzb2NrZXRLZXkpKVxuICAgIC5vckVsc2UoKGVycm9yKSA9PiBlcnJBc3luYyhlcnJvcikpO1xufTtcblxuLyoqXG4gKiBXYWl0IGZvciBXZWJTb2NrZXQgdG8gb3Blbi4gUmV0dXJucyBhbiBlcnJvciBpZiB0b28gbWFueSBjb25uZWN0aW9uIGF0dGVtcHRzIGFyZSBtYWRlLlxuICpcbiAqIEBwYXJhbSBzb2NrZXRLZXlcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCB3YWl0Rm9yQ29ubmVjdGlvbiA9IChcbiAgc29ja2V0S2V5OiBzdHJpbmcsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT5cbiAgUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCFpc1NwYXduZWQoc29ja2V0S2V5KSkge1xuICAgICAgICBldmVudHMub25jZShFVkVOVC5TT0NLRVRfT1BFTkVELCAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBldmVudHMub24oRVZFTlQuU09DS0VUX09ORVJST1IsICgpID0+IHtcbiAgICAgICAgICByZWplY3QobmV3IFdlYlNvY2tldENvbm5lY3Rpb25FcnJvcigpKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICB9XG4gICAgfSksXG4gICAgKGVycm9yKSA9PiB7XG4gICAgICByZXR1cm4gZW5zdXJlRXJyb3IoZXJyb3IpO1xuICAgIH0sXG4gICk7XG5cbi8qKlxuICogQ2xvc2UgdGhlIFdlYlNvY2tldFxuICogQHBhcmFtIHNvY2tldEtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGNsb3NlID0gKHNvY2tldEtleTogc3RyaW5nKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBXZWJTb2NrZXRFcnJvcj4gPT5cbiAgUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKGlzU3Bhd25lZChzb2NrZXRLZXkpKSB7XG4gICAgICAgIGNvbnN0IHRpbWVvdXRJRCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgV2ViU29ja2V0RXJyb3IoXCJVbmFibGUgdG8gY2xvc2UgdGhlIFdlYlNvY2tldFwiKSk7XG4gICAgICAgIH0sIDEwMDApO1xuXG4gICAgICAgIHNvY2tldHNbc29ja2V0S2V5XS5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SUQpO1xuICAgICAgICAgIHJlc29sdmUoc29ja2V0S2V5KTtcbiAgICAgICAgfTtcblxuICAgICAgICBzb2NrZXRzW3NvY2tldEtleV0uY2xvc2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUoc29ja2V0S2V5KTtcbiAgICAgIH1cbiAgICB9KSxcbiAgICAoZXJyb3IpID0+IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGFuIGluc3RhbmNlIFVSTCBpbiBhIFdlYlNvY2tldCBVUkxcbiAqXG4gKiBAcGFyYW0gaW5zdGFuY2VVcmxcbiAqIEBwYXJhbSBwYXRobmFtZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGJ1aWxkU29ja2V0VXJsID0gKGluc3RhbmNlVXJsOiBVUkwsIHBhdGhuYW1lOiBzdHJpbmcpOiBVUkwgPT4ge1xuICBjb25zdCB1cmwgPSBuZXcgVVJMKGluc3RhbmNlVXJsKTtcblxuICBpZiAoIVtcIndzOlwiLCBcIndzczpcIl0uaW5jbHVkZXModXJsLnByb3RvY29sKSkge1xuICAgIHVybC5wcm90b2NvbCA9IHVybC5wcm90b2NvbCA9PT0gXCJodHRwOlwiID8gXCJ3czpcIiA6IFwid3NzOlwiO1xuICB9XG4gIHVybC5wYXRobmFtZSArPSBwYXRobmFtZTtcblxuICByZXR1cm4gbmV3IFVSTCh1cmwub3JpZ2luICsgdXJsLnBhdGhuYW1lKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgdGhlIGRvd25sb2FkIFVSTCBmb3IgdGhlIHNvY2tldC4gUmV0dXJucyBhIHN0cmluZyBzaW5jZSBpdCdzIG1vc3RseSB1c2VkIGFzIHNvY2tldHMga2V5XG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZG93bmxvYWRTb2NrZXRVcmwgPSAobHVmaUZpbGU6IEx1ZmlGaWxlKTogc3RyaW5nID0+IHtcbiAgcmV0dXJuIGJ1aWxkU29ja2V0VXJsKFxuICAgIG5ldyBVUkwobHVmaUZpbGUuc2VydmVyVXJsKSxcbiAgICBTb2NrZXRQYXRoLkRPV05MT0FEICsgYC8ke2x1ZmlGaWxlLmtleXMuc2VydmVyfWAsXG4gICkudG9TdHJpbmcoKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgdGhlIHVwbG9hZCBVUkwgZm9yIHRoZSBzb2NrZXQuIFJldHVybnMgYSBzdHJpbmcgc2luY2UgaXQncyBtb3N0bHkgdXNlZCBhcyBzb2NrZXRzIGtleVxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHVwbG9hZFNvY2tldFVybCA9IChsdWZpRmlsZTogTHVmaUZpbGUpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYnVpbGRTb2NrZXRVcmwobmV3IFVSTChsdWZpRmlsZS5zZXJ2ZXJVcmwpLCBTb2NrZXRQYXRoLlVQTE9BRClcbiAgICAudG9TdHJpbmcoKTtcbn07XG5cbi8qKlxuICogVHJ5IHRvIHBhcnNlIGEgc3RyaW5nIGludG8gYSBKU09OLiBSZXR1cm5zIGZhbHNlIGlmIG5vdCBwb3NzaWJsZS5cbiAqXG4gKiBAcGFyYW0gZGF0YVxuICogQHJldHVybnNcbiAqL1xuY29uc3QgdHJ5UGFyc2VKc29uID0gKGRhdGE6IHN0cmluZykgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZE9iamVjdCA9IEpTT04ucGFyc2UoZGF0YSk7XG5cbiAgICBpZiAocGFyc2VkT2JqZWN0ICYmIHR5cGVvZiBwYXJzZWRPYmplY3QgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgIHJldHVybiBwYXJzZWRPYmplY3Q7XG4gICAgfVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgfSBjYXRjaCAoX2UpIHtcbiAgICAvKiBlbXB0eSAqL1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIHR5cGUgb2YgdGhlIG1lc3NhZ2UgcmVjZWl2ZWQgZnJvbSB0aGUgc2VydmVyIGlzIFNlcnZlckRvd25sb2FkQ2h1bmtNZXRhZGF0YVxuICpcbiAqIEBwYXJhbSBtZXNzYWdlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaXNTZXJ2ZXJEb3dubG9hZENodW5rU3VjY2Vzc01ldGFkYXRhID0gKFxuICBtZXNzYWdlOiBTZXJ2ZXJEb3dubG9hZENodW5rTWV0YWRhdGEsXG4pOiBtZXNzYWdlIGlzIFNlcnZlckRvd25sb2FkQ2h1bmtTdWNjZXNzTWV0YWRhdGEgPT5cbiAgdHlwZW9mIG1lc3NhZ2UgPT09IFwib2JqZWN0XCIgJiYgbWVzc2FnZSAhPT0gbnVsbCAmJiAhKFwibXNnXCIgaW4gbWVzc2FnZSk7XG4iLCAiaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgeyBldmVudHMsIGluaXQgfSBmcm9tIFwifi93b3JrZXIvc2hhcmVkLnRzXCI7XG5pbXBvcnQgeyBjYW5jZWxVcGxvYWQgYXMgd3NDYW5jZWxVcGxvYWQgfSBmcm9tIFwifi9hcGkvd2Vic29ja2V0LnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckFjdGlvbk1lc3NhZ2UgfSBmcm9tIFwifi9pbnRlcmZhY2Uvd29ya2VyLWFjdGlvbi1tZXNzYWdlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB0eXBlIHsgV29ya2VyRXZlbnQgfSBmcm9tIFwifi9pbnRlcmZhY2Uvd29ya2VyLWV2ZW50LnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdlYlNvY2tldEVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd2Vic29ja2V0L3dlYnNvY2tldC1lcnJvci50c1wiO1xuXG5kZWNsYXJlIGNvbnN0IHNlbGY6IFdvcmtlcjtcbmxldCBpc0luaXRpYXRlZCA9IGZhbHNlO1xuXG5zZWxmLm9ubWVzc2FnZSA9IChldmVudDogTWVzc2FnZUV2ZW50KSA9PiB7XG4gIGlmICghaXNJbml0aWF0ZWQpIHtcbiAgICBpbml0KCk7XG4gICAgaXNJbml0aWF0ZWQgPSB0cnVlO1xuICB9XG5cbiAgZXZlbnRzLm9uKEVWRU5ULlVQTE9BRF9DQU5DRUxMRUQsIChzdWNjZXNzOiBib29sZWFuKSA9PiB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5VUExPQURfQ0FOQ0VMTEVELCBzdWNjZXNzIH0pO1xuICB9KTtcblxuICBjYW5jZWxVcGxvYWQoZXZlbnQuZGF0YSkubWFwRXJyKChlcnJvcikgPT4ge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgZXZlbnQ6IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsXG4gICAgICBlcnJvcixcbiAgICB9IGFzIFdvcmtlckV2ZW50KTtcbiAgfSk7XG59O1xuXG5jb25zdCBjYW5jZWxVcGxvYWQgPSAoXG4gIHdvcmtlck1lc3NhZ2U6IFdvcmtlckFjdGlvbk1lc3NhZ2UsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT5cbiAgd3NDYW5jZWxVcGxvYWQod29ya2VyTWVzc2FnZS5hcmdzLmx1ZmlGaWxlKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBdUJBLFFBQUksSUFBSSxPQUFPLFlBQVksV0FBVyxVQUFVO0FBQ2hELFFBQUksZUFBZSxLQUFLLE9BQU8sRUFBRSxVQUFVLGFBQ3ZDLEVBQUUsUUFDRixTQUFTQSxjQUFhLFFBQVEsVUFBVSxNQUFNO0FBQzlDLGFBQU8sU0FBUyxVQUFVLE1BQU0sS0FBSyxRQUFRLFVBQVUsSUFBSTtBQUFBLElBQzdEO0FBRUYsUUFBSTtBQUNKLFFBQUksS0FBSyxPQUFPLEVBQUUsWUFBWSxZQUFZO0FBQ3hDLHVCQUFpQixFQUFFO0FBQUEsSUFDckIsV0FBVyxPQUFPLHVCQUF1QjtBQUN2Qyx1QkFBaUIsU0FBU0MsZ0JBQWUsUUFBUTtBQUMvQyxlQUFPLE9BQU8sb0JBQW9CLE1BQU0sRUFDckMsT0FBTyxPQUFPLHNCQUFzQixNQUFNLENBQUM7QUFBQSxNQUNoRDtBQUFBLElBQ0YsT0FBTztBQUNMLHVCQUFpQixTQUFTQSxnQkFBZSxRQUFRO0FBQy9DLGVBQU8sT0FBTyxvQkFBb0IsTUFBTTtBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUVBLGFBQVMsbUJBQW1CLFNBQVM7QUFDbkMsVUFBSSxXQUFXLFFBQVEsS0FBTSxTQUFRLEtBQUssT0FBTztBQUFBLElBQ25EO0FBRUEsUUFBSSxjQUFjLE9BQU8sU0FBUyxTQUFTQyxhQUFZLE9BQU87QUFDNUQsYUFBTyxVQUFVO0FBQUEsSUFD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QUFTLEdBQUU7QUFBQyxXQUFLLFdBQVMsV0FBVTtBQUFDLGVBQU0sVUFBUSxLQUFLO0FBQUEsTUFBTztBQUFFLFdBQUssVUFBUTtBQUFBLElBQUMsR0FBRSxVQUFTLFNBQVMsR0FBRTtBQUFDLFdBQUssV0FBUyxXQUFVO0FBQUMsZUFBTSxnQkFBYyxLQUFLO0FBQUEsTUFBTztBQUFFLFdBQUssVUFBUTtBQUFBLElBQUMsRUFBQyxFQUFDO0FBQzNjLElBQUFBLE1BQUssT0FBTyxNQUFJLFNBQVMsR0FBRTtBQUFDLFdBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBRyxLQUFLLEVBQUU7QUFBRSxVQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRSxJQUFFLEtBQUssRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFO0FBQU8sVUFBSSxJQUFFO0FBQUUsVUFBRyxNQUFJLEtBQUcsTUFBSSxLQUFHLE1BQUksRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHNCQUFzQjtBQUFFLFdBQUssSUFBRSxDQUFDLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxJQUFFLENBQUMsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsSUFBRSxJQUFFLElBQUcsS0FBSTtBQUFDLFlBQUUsRUFBRSxJQUFFLENBQUM7QUFBRSxZQUFHLE1BQUksSUFBRSxLQUFHLE1BQUksS0FBRyxNQUFJLElBQUUsRUFBRSxLQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsS0FBRyxFQUFFLEtBQUcsS0FBRyxHQUFHLEtBQUcsS0FBRyxFQUFFLEtBQUcsSUFBRSxHQUFHLEtBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxHQUFFLE1BQUksSUFBRSxNQUFJLElBQUUsS0FBRyxJQUFFLE1BQUksS0FBRyxLQUFHLElBQUcsSUFBRSxLQUFHLElBQUUsT0FBSyxLQUFHO0FBQUksVUFBRSxDQUFDLElBQUUsRUFBRSxJQUFFLENBQUMsSUFBRTtBQUFBLE1BQUM7QUFBQyxXQUFJLElBQUUsR0FBRSxHQUFFLEtBQUksSUFBSSxLQUFFLEVBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsS0FBRyxLQUFHLElBQUUsSUFBRSxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBSSxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLENBQUMsSUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLENBQUMsSUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLElBQzNmLEdBQUcsQ0FBQztBQUFBLElBQUM7QUFDTCxJQUFBQSxNQUFLLE9BQU8sSUFBSSxZQUFVLEVBQUMsU0FBUSxTQUFTLEdBQUU7QUFBQyxhQUFPLEdBQUcsTUFBSyxHQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUU7QUFBQyxhQUFPLEdBQUcsTUFBSyxHQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsR0FBRSxXQUFVO0FBQUMsVUFBSSxJQUFFLEtBQUssRUFBRSxDQUFDLEdBQUUsSUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFFLFdBQUksSUFBRSxHQUFFLE1BQU0sR0FBRSxJQUFJLElBQUcsRUFBRSxDQUFDLElBQUUsS0FBRyxJQUFFLE9BQUssS0FBRyxNQUFJLENBQUMsSUFBRTtBQUFFLFdBQUksSUFBRSxJQUFFLEdBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRSxLQUFHLEtBQUcsR0FBRSxJQUFFLEVBQUUsQ0FBQyxLQUFHLEVBQUUsTUFBSSxJQUFFLElBQUUsS0FBRyxJQUFFLEtBQUcsSUFBRSxLQUFHLElBQUUsS0FBRyxHQUFFLElBQUUsS0FBRyxJQUFFLElBQUUsTUFBSSxJQUFHLEVBQUUsQ0FBQyxJQUFFLEdBQUUsRUFBRSxDQUFDLElBQUUsR0FBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFFLElBQUUsV0FBVSxJQUFFLFFBQVEsSUFBRSxNQUFNLElBQUUsV0FBVSxHQUFFLElBQUUsTUFBTSxFQUFFLENBQUMsSUFBRSxXQUFVLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsQ0FBQyxFQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLEdBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxLQUFHLE1BQUk7QUFBRSxXQUFJLElBQ2xnQixHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztBQUFBLElBQUMsRUFBQztBQUNoRCxhQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFHLE1BQUksRUFBRSxPQUFPLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsd0JBQXdCO0FBQUUsVUFBSSxJQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUUsRUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLFNBQU8sSUFBRSxHQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEtBQUUsRUFBRSxNQUFJLEVBQUUsSUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLElBQUUsRUFBRSxLQUFHLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFJLEVBQUUsSUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLElBQUUsRUFBRSxLQUFHLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBSSxFQUFFLElBQUUsRUFBRSxLQUFHLEtBQUcsR0FBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxDQUFDLEdBQUUsS0FBRyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRTtBQUFFLFdBQUksSUFDcmYsR0FBRSxJQUFFLEdBQUUsSUFBSSxHQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsS0FBRyxFQUFFLEtBQUcsS0FBRyxHQUFHLEtBQUcsS0FBRyxFQUFFLEtBQUcsSUFBRSxHQUFHLEtBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFO0FBQUUsYUFBTztBQUFBLElBQUM7QUFDaEgsSUFBQUEsTUFBSyxXQUFTLEVBQUMsVUFBUyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBRUEsTUFBSyxTQUFTLEVBQUUsRUFBRSxNQUFNLElBQUUsRUFBRSxHQUFFLE1BQUksSUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDO0FBQUUsYUFBTyxXQUFTLElBQUUsSUFBRUEsTUFBSyxTQUFTLE1BQU0sR0FBRSxJQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFLEtBQUssTUFBTSxDQUFDLElBQUUsSUFBRSxFQUFFO0FBQUUsZUFBUSxJQUFFLElBQUUsSUFBRSxLQUFHLE1BQUksRUFBRSxJQUFFLEtBQUcsQ0FBQyxLQUFHLEtBQUcsSUFBRSxFQUFFLElBQUUsS0FBRyxJQUFFLENBQUMsTUFBSSxJQUFFLEVBQUUsSUFBRSxLQUFHLENBQUMsTUFBSSxNQUFJLEtBQUcsS0FBRztBQUFBLElBQUMsR0FBRSxRQUFPLFNBQVMsR0FBRSxHQUFFO0FBQUMsVUFBRyxNQUFJLEVBQUUsVUFBUSxNQUFJLEVBQUUsT0FBTyxRQUFPLEVBQUUsT0FBTyxDQUFDO0FBQUUsVUFBSSxJQUFFLEVBQUUsRUFBRSxTQUFPLENBQUMsR0FBRSxJQUFFQSxNQUFLLFNBQVMsV0FBVyxDQUFDO0FBQUUsYUFBTyxPQUFLLElBQUUsRUFBRSxPQUFPLENBQUMsSUFBRUEsTUFBSyxTQUFTLEVBQUUsR0FBRSxHQUFFLElBQUUsR0FBRSxFQUFFLE1BQU0sR0FBRSxFQUFFLFNBQU8sQ0FBQyxDQUFDO0FBQUEsSUFBQyxHQUFFLFdBQVUsU0FBUyxHQUFFO0FBQUMsVUFBSSxJQUFFLEVBQUU7QUFBTyxhQUFPLE1BQzFmLElBQUUsSUFBRSxNQUFJLElBQUUsS0FBR0EsTUFBSyxTQUFTLFdBQVcsRUFBRSxJQUFFLENBQUMsQ0FBQztBQUFBLElBQUMsR0FBRSxPQUFNLFNBQVMsR0FBRSxHQUFFO0FBQUMsVUFBRyxLQUFHLEVBQUUsU0FBTyxFQUFFLFFBQU87QUFBRSxVQUFFLEVBQUUsTUFBTSxHQUFFLEtBQUssS0FBSyxJQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUksSUFBRSxFQUFFO0FBQU8sVUFBRSxJQUFFO0FBQUcsVUFBRSxLQUFHLE1BQUksRUFBRSxJQUFFLENBQUMsSUFBRUEsTUFBSyxTQUFTLFFBQVEsR0FBRSxFQUFFLElBQUUsQ0FBQyxJQUFFLGNBQVksSUFBRSxHQUFFLENBQUM7QUFBRyxhQUFPO0FBQUEsSUFBQyxHQUFFLFNBQVEsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDLGFBQU8sT0FBSyxJQUFFLEtBQUcsSUFBRSxJQUFFLElBQUUsS0FBRyxLQUFHLEtBQUcsZ0JBQWM7QUFBQSxJQUFDLEdBQUUsWUFBVyxTQUFTLEdBQUU7QUFBQyxhQUFPLEtBQUssTUFBTSxJQUFFLGFBQWEsS0FBRztBQUFBLElBQUUsR0FBRSxPQUFNLFNBQVMsR0FBRSxHQUFFO0FBQUMsVUFBR0EsTUFBSyxTQUFTLFVBQVUsQ0FBQyxNQUFJQSxNQUFLLFNBQVMsVUFBVSxDQUFDLEVBQUUsUUFBTTtBQUFHLFVBQUksSUFBRSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxNQUFHLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLGFBQU8sTUFDbGY7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJO0FBQUUsVUFBRTtBQUFFLFdBQUksV0FBUyxNQUFJLElBQUUsQ0FBQyxJQUFHLE1BQUksR0FBRSxLQUFHLEdBQUcsR0FBRSxLQUFLLENBQUMsR0FBRSxJQUFFO0FBQUUsVUFBRyxNQUFJLEVBQUUsUUFBTyxFQUFFLE9BQU8sQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksR0FBRSxLQUFLLElBQUUsRUFBRSxDQUFDLE1BQUksQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEtBQUcsS0FBRztBQUFFLFVBQUUsRUFBRSxTQUFPLEVBQUUsRUFBRSxTQUFPLENBQUMsSUFBRTtBQUFFLFVBQUVBLE1BQUssU0FBUyxXQUFXLENBQUM7QUFBRSxRQUFFLEtBQUtBLE1BQUssU0FBUyxRQUFRLElBQUUsSUFBRSxJQUFHLEtBQUcsSUFBRSxJQUFFLElBQUUsRUFBRSxJQUFJLEdBQUUsQ0FBQyxDQUFDO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFO0FBQUMsYUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQyxHQUFFLFdBQVUsU0FBUyxHQUFFO0FBQUMsVUFBSSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sRUFBRSxFQUFFLEtBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsTUFBSSxLQUFHLE1BQUksSUFBRSxTQUFRLElBQUUsVUFBUyxJQUFFLEtBQUc7QUFBRyxhQUFPO0FBQUEsSUFBQyxFQUFDO0FBQ3BkLElBQUFBLE1BQUssTUFBTSxhQUFXLEVBQUMsVUFBUyxTQUFTLEdBQUU7QUFBQyxVQUFJLElBQUUsSUFBRyxJQUFFQSxNQUFLLFNBQVMsVUFBVSxDQUFDLEdBQUUsR0FBRTtBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLElBQUksUUFBSyxJQUFFLE9BQUssSUFBRSxFQUFFLElBQUUsQ0FBQyxJQUFHLEtBQUcsT0FBTyxhQUFhLE1BQUksTUFBSSxNQUFJLENBQUMsR0FBRSxNQUFJO0FBQUUsYUFBTyxtQkFBbUIsT0FBTyxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxVQUFFLFNBQVMsbUJBQW1CLENBQUMsQ0FBQztBQUFFLFVBQUksSUFBRSxDQUFDLEdBQUUsR0FBRSxJQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxLQUFFLEtBQUcsSUFBRSxFQUFFLFdBQVcsQ0FBQyxHQUFFLE9BQUssSUFBRSxPQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUUsSUFBRTtBQUFHLFVBQUUsS0FBRyxFQUFFLEtBQUtBLE1BQUssU0FBUyxRQUFRLEtBQUcsSUFBRSxJQUFHLENBQUMsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFDLEVBQUM7QUFDcFosSUFBQUEsTUFBSyxNQUFNLE1BQUksRUFBQyxVQUFTLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRSxJQUFHO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxRQUFLLEVBQUUsQ0FBQyxJQUFFLEtBQUcsaUJBQWdCLFNBQVMsRUFBRSxFQUFFLE9BQU8sQ0FBQztBQUFFLGFBQU8sRUFBRSxPQUFPLEdBQUVBLE1BQUssU0FBUyxVQUFVLENBQUMsSUFBRSxDQUFDO0FBQUEsSUFBQyxHQUFFLFFBQU8sU0FBUyxHQUFFO0FBQUMsVUFBSSxHQUFFLElBQUUsQ0FBQyxHQUFFO0FBQUUsVUFBRSxFQUFFLFFBQVEsVUFBUyxFQUFFO0FBQUUsVUFBRSxFQUFFO0FBQU8sVUFBRSxJQUFFO0FBQVcsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBRyxFQUFFLEdBQUUsS0FBSyxTQUFTLEVBQUUsT0FBTyxHQUFFLENBQUMsR0FBRSxFQUFFLElBQUUsQ0FBQztBQUFFLGFBQU9BLE1BQUssU0FBUyxNQUFNLEdBQUUsSUFBRSxDQUFDO0FBQUEsSUFBQyxFQUFDO0FBQzlWLElBQUFBLE1BQUssTUFBTSxTQUFPLEVBQUMsR0FBRSxvRUFBbUUsVUFBUyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUVBLE1BQUssTUFBTSxPQUFPLEdBQUUsSUFBRSxHQUFFLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUM7QUFBRSxZQUFJLElBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxJQUFFO0FBQU0sV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFNBQU8sSUFBRyxN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TUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLElBQUUsTUFBTyxLQUFHLEdBQUUsS0FBRyxJQUFJLE1BQUssRUFBRSxFQUFFLE9BQU8sR0FBRSxFQUFFLENBQUM7QUFBRSxhQUFPO0FBQUEsSUFBSSxHQUFFLFVBQVMsV0FBVTtBQUFDLFVBQUksR0FBRSxJQUFFLEtBQUssR0FBRSxJQUFFLEtBQUssR0FBRSxJQUFFQSxNQUFLLFNBQVMsT0FBTyxHQUFFLENBQUNBLE1BQUssU0FBUyxRQUFRLEdBQUUsQ0FBQyxDQUFDLENBQUM7QUFBRSxXQUFJLElBQUUsRUFBRSxTQUFPLEdBQUUsSUFBRSxJQUFHLElBQUksR0FBRSxLQUFLLENBQUM7QUFBRSxRQUFFLEtBQUssS0FBSyxNQUFNLEtBQUssSUFBRSxVQUFXLENBQUM7QUFBRSxXQUFJLEVBQUUsS0FBSyxLQUFLLElBQUUsQ0FBQyxHQUFFLEVBQUUsU0FBUSxNQUFLLEVBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSyxNQUFNO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxHQUFFLFdBQVU7QUFBQyxlQUFTLEVBQUVDLElBQUU7QUFBQyxlQUFPLGNBQWFBLEtBQUUsS0FBSyxNQUFNQSxFQUFDLEtBQUc7QUFBQSxNQUFDO0FBQUMsZUFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEdBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUU7QUFBRyxhQUFJLElBQUUsR0FBRSxJQUFFLEtBQUcsR0FBRSxJQUFJLEtBQUcsTUFBSSxJQUFFLEdBQUU7QUFBQyxjQUN6ZjtBQUFHO0FBQUEsUUFBSztBQUFDLGNBQUksSUFBRSxNQUFJLEtBQUssRUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxHQUFFLENBQUMsSUFBRyxLQUFLLEVBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRTtBQUFBLE1BQUk7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUM7QUFBRSxXQUFJLElBQUUsR0FBRSxLQUFHLEdBQUUsSUFBSSxNQUFHLElBQUUsSUFBRSxFQUFFLENBQUMsS0FBRyxJQUFFLEVBQUUsSUFBRSxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsSUFBRSxLQUFHLEVBQUUsR0FBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLElBQUUsS0FBRyxLQUFHLEtBQUcsT0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxNQUFJLEVBQUUsSUFBRSxFQUFFLElBQUUsRUFBRSxJQUFFLElBQUUsRUFBRSxJQUFFLElBQUcsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLEtBQUcsS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLE1BQUksSUFBRSxLQUFHLElBQUUsTUFBSSxFQUFFLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsS0FBRyxJQUFFLElBQUUsS0FBRyxJQUFFLE9BQUssTUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLEtBQUcsS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLE1BQUk7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUNwZjtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBQSxJQUFDLEVBQUM7QUFBRSxJQUFBRCxNQUFLLEtBQUssU0FBTyxTQUFTLEdBQUU7QUFBQyxXQUFLLEVBQUUsQ0FBQyxLQUFHLEtBQUssRUFBRTtBQUFFLFdBQUcsS0FBSyxJQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxLQUFLLElBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEtBQUssSUFBRSxFQUFFLEtBQUcsS0FBSyxNQUFNO0FBQUEsSUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxPQUFPLE9BQUssU0FBUyxHQUFFO0FBQUMsYUFBTyxJQUFJQSxNQUFLLEtBQUssU0FBUSxPQUFPLENBQUMsRUFBRSxTQUFTO0FBQUEsSUFBQztBQUMvUyxJQUFBQSxNQUFLLEtBQUssT0FBTyxZQUFVLEVBQUMsV0FBVSxNQUFLLE9BQU0sV0FBVTtBQUFDLFdBQUssSUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO0FBQUUsV0FBSyxJQUFFLENBQUM7QUFBRSxXQUFLLElBQUU7QUFBRSxhQUFPO0FBQUEsSUFBSSxHQUFFLFFBQU8sU0FBUyxHQUFFO0FBQUMsbUJBQVcsT0FBTyxNQUFJLElBQUVBLE1BQUssTUFBTSxXQUFXLE9BQU8sQ0FBQztBQUFHLFVBQUksR0FBRSxJQUFFLEtBQUssSUFBRUEsTUFBSyxTQUFTLE9BQU8sS0FBSyxHQUFFLENBQUM7QUFBRSxVQUFFLEtBQUs7QUFBRSxVQUFFLEtBQUssSUFBRSxJQUFFQSxNQUFLLFNBQVMsVUFBVSxDQUFDO0FBQUUsVUFBRyxtQkFBaUIsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHFDQUFxQztBQUFFLFVBQUcsZ0JBQWMsT0FBTyxhQUFZO0FBQUMsWUFBSSxJQUFFLElBQUksWUFBWSxDQUFDLEdBQUUsSUFBRTtBQUFFLGFBQUksSUFBRSxPQUFLLEtBQUcsT0FBSyxJQUFFLE9BQU0sS0FBRyxHQUFFLEtBQUcsS0FBSyxNQUFLLEVBQUUsRUFBRSxTQUFTLEtBQ3RmLEdBQUUsTUFBSSxJQUFFLEVBQUUsQ0FBQyxHQUFFLEtBQUc7QUFBRSxVQUFFLE9BQU8sR0FBRSxLQUFHLENBQUM7QUFBQSxNQUFDLE1BQU0sTUFBSSxJQUFFLE9BQUssS0FBRyxPQUFLLElBQUUsT0FBTSxLQUFHLEdBQUUsS0FBRyxLQUFLLE1BQUssRUFBRSxFQUFFLE9BQU8sR0FBRSxFQUFFLENBQUM7QUFBRSxhQUFPO0FBQUEsSUFBSSxHQUFFLFVBQVMsV0FBVTtBQUFDLFVBQUksR0FBRSxJQUFFLEtBQUssR0FBRSxJQUFFLEtBQUssR0FBRSxJQUFFQSxNQUFLLFNBQVMsT0FBTyxHQUFFLENBQUNBLE1BQUssU0FBUyxRQUFRLEdBQUUsQ0FBQyxDQUFDLENBQUM7QUFBRSxXQUFJLElBQUUsRUFBRSxTQUFPLEdBQUUsSUFBRSxJQUFHLElBQUksR0FBRSxLQUFLLENBQUM7QUFBRSxRQUFFLEtBQUssQ0FBQztBQUFFLFFBQUUsS0FBSyxDQUFDO0FBQUUsUUFBRSxLQUFLLEtBQUssTUFBTSxLQUFLLElBQUUsVUFBVyxDQUFDO0FBQUUsV0FBSSxFQUFFLEtBQUssS0FBSyxJQUFFLENBQUMsR0FBRSxFQUFFLFNBQVEsTUFBSyxFQUFFLEVBQUUsT0FBTyxHQUFFLEVBQUUsQ0FBQztBQUFFLFdBQUssTUFBTTtBQUFFLGFBQU87QUFBQSxJQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRyxDQUFDLFVBQVMsVUFBUyxTQUFRLFNBQVEsVUFBUyxTQUFRLFNBQVEsT0FBTyxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUc7QUFBQSxNQUFDO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFDbGY7QUFBQSxNQUFRO0FBQUEsTUFBTztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBTztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBTztBQUFBLE1BQU87QUFBQSxNQUFPO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUNwZjtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsSUFBTyxHQUFFLEdBQUUsV0FBVTtBQUFDLGVBQVMsRUFBRUMsSUFBRTtBQUFDLGVBQU8sY0FBYUEsS0FBRSxLQUFLLE1BQU1BLEVBQUMsS0FBRztBQUFBLE1BQUM7QUFBQyxlQUFTLEVBQUVBLElBQUU7QUFBQyxlQUFPLGlCQUFlQSxLQUFFLEtBQUssTUFBTUEsRUFBQyxLQUFHO0FBQUEsTUFBRztBQUFDLGVBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxHQUFFLEdBQUUsS0FBRyxHQUFFLEtBQUk7QUFBQyxZQUFFO0FBQUcsYUFBSSxJQUFFLEdBQUUsSUFBRSxLQUFHLEdBQUUsSUFBSSxLQUFHLE1BQUksSUFBRSxHQUFFO0FBQUMsY0FBRTtBQUFHO0FBQUEsUUFBSztBQUFDLGNBQUksSUFBRSxNQUFJLEtBQUssRUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEtBQUssRUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsR0FBRSxDQUFDLEtBQUcsS0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFHLEtBQUssRUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLElBQUUsQ0FBQyxDQUFDLEdBQUUsS0FBSyxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxJQUFFLENBQUMsQ0FBQyxLQUFHLEtBQUcsS0FBSyxHQUFHLENBQUMsR0FBRTtBQUFBLE1BQUk7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQ3ZnQixHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRSxLQUFHLEVBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxFQUFFLEdBQUU7QUFBRSxVQUFHLGdCQUFjLE9BQU8sYUFBWTtBQUFDLFlBQUUsTUFBTSxHQUFHO0FBQUUsaUJBQVEsSUFBRSxHQUFFLEtBQUcsR0FBRSxJQUFJLEdBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFBLE1BQUMsTUFBTSxLQUFFO0FBQUUsVUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsS0FBRyxHQUFFLEtBQUk7QUFBQyxZQUFHLEtBQUcsRUFBRSxLQUFFLEVBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLElBQUUsSUFBRSxDQUFDO0FBQUEsYUFBTTtBQUFDLGNBQUUsRUFBRSxLQUFHLElBQUUsR0FBRztBQUFFLGNBQUksSUFBRSxFQUFFLEtBQUcsSUFBRSxNQUFJLENBQUM7QUFBRSxlQUFHLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksS0FBRyxNQUFJO0FBQUUsY0FBSSxLQUFHLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSTtBQUFHLGNBQUUsRUFBRSxLQUFHLElBQUUsRUFBRTtBQUFFLGNBQUksSUFBRSxFQUFFLEtBQUcsSUFBRSxLQUFHLENBQUMsR0FDbmYsS0FBRyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsSUFBRSxNQUFJLE1BQUksTUFBSSxHQUFFLEtBQUcsS0FBRyxLQUFHLE1BQUksT0FBSyxLQUFHLElBQUUsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLElBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLEdBQUUsSUFBRSxFQUFFLEtBQUcsSUFBRSxNQUFJLENBQUM7QUFBRSxjQUFFLElBQUUsRUFBRSxLQUFHLElBQUUsS0FBRyxDQUFDO0FBQUUsY0FBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFO0FBQUcsZUFBRztBQUFFLGVBQUcsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBRyxlQUFHO0FBQUUsZUFBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFBLFFBQUU7QUFBQyxVQUFFLElBQUUsQ0FBQyxJQUFFLEtBQUc7QUFBRSxVQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsS0FBRztBQUFFLFlBQUksSUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEdBQUUsS0FBRyxJQUFFLElBQUUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsR0FBRSxLQUFHLElBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxHQUFFLEtBQUcsS0FBRyxJQUFFLE1BQUksT0FBSyxLQUFHLEtBQUcsTUFBSSxNQUFJLEtBQUcsS0FBRyxNQUFJLElBQUcsS0FBRyxLQUFHLElBQUUsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksSUFBRyxLQUFHLEVBQUUsSUFBRSxDQUFDLEdBQUUsS0FBRyxFQUFFLElBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxNQUFJLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksT0FBSyxLQUFHLEtBQUcsTUFBSSxLQUFJLElBQUUsTUFBSSxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FDcGYsS0FBRyxNQUFJLE9BQUssTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLElBQUcsSUFBRSxJQUFFLElBQUcsSUFBRSxLQUFHLEtBQUcsTUFBSSxJQUFFLE9BQUssSUFBRSxJQUFFLEtBQUksSUFBRSxJQUFFLElBQUcsSUFBRSxLQUFHLE1BQUksTUFBSSxJQUFFLE9BQUssSUFBRSxJQUFFLEtBQUksSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBSSxZQUFFLElBQUU7QUFBRyxZQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBRyxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFLElBQUUsSUFBRTtBQUFFLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRSxJQUFFLElBQUU7QUFBRSxZQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFBLE1BQUM7QUFBQyxVQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLEVBQUUsSUFBRSxJQUFFLElBQ25mO0FBQUUsUUFBRSxFQUFFLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLEVBQUUsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLEVBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsRUFBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFBLElBQUMsRUFBQztBQUN6SCxJQUFBRCxNQUFLLEtBQUssTUFBSSxFQUFDLE1BQUssT0FBTSxHQUFFLENBQUMsR0FBRSxnQkFBZSxTQUFTLEdBQUU7QUFBQyxNQUFBQSxNQUFLLEtBQUssSUFBSSxFQUFFLEtBQUssQ0FBQztBQUFBLElBQUMsR0FBRSxrQkFBaUIsU0FBUyxHQUFFO0FBQUMsVUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxRQUFRLENBQUM7QUFBRSxXQUFHLEtBQUdBLE1BQUssS0FBSyxJQUFJLEVBQUUsT0FBTyxHQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsSUFBRyxTQUFTLEdBQUU7QUFBQyxVQUFJLElBQUVBLE1BQUssS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUksR0FBRSxJQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsSUFBRUEsTUFBSyxVQUFTLElBQUUsRUFBRSxVQUFVLENBQUMsSUFBRSxHQUFFLElBQUUsRUFBRSxVQUFVLENBQUMsSUFBRTtBQUFFLFVBQUUsS0FBRztBQUFHLFVBQUUsS0FBRyxDQUFDO0FBQUUsVUFBRyxJQUFFLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSxrQ0FBa0M7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLEdBQUUsSUFBSTtBQUFDLFVBQUUsS0FBRyxNQUFJLElBQUUsS0FBRztBQUFHLFVBQUUsRUFBRTtBQUFBLFFBQU07QUFBQSxRQUN0ZixLQUFHLEtBQUc7QUFBQSxNQUFFO0FBQUUsVUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLFVBQUVBLE1BQUssS0FBSyxJQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxhQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUssRUFBRSxHQUFHO0FBQUEsSUFBQyxHQUFFLFNBQVEsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFFLEtBQUc7QUFBRyxVQUFFLEtBQUcsQ0FBQztBQUFFLFVBQUksSUFBRUEsTUFBSyxVQUFTLElBQUUsRUFBRSxVQUFVLENBQUMsSUFBRSxHQUFFLElBQUUsRUFBRSxVQUFVLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBTSxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxDQUFDLEdBQUUsS0FBRyxJQUFFLEtBQUc7QUFBRSxVQUFHLElBQUUsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLGtDQUFrQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsR0FBRSxJQUFJO0FBQUMsVUFBRSxLQUFHLE1BQUksSUFBRSxLQUFHO0FBQUcsVUFBRSxFQUFFLE1BQU0sR0FBRSxLQUFHLEtBQUcsRUFBRTtBQUFFLFVBQUVBLE1BQUssS0FBSyxJQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFFQSxNQUFLLEtBQUssSUFBSSxFQUFFLEdBQUUsRUFBRSxNQUFLLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSSxDQUFDLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx3QkFBd0I7QUFDeGhCLGFBQU8sRUFBRTtBQUFBLElBQUksR0FBRSxJQUFHLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsQ0FBQyxHQUFFLElBQUVBLE1BQUssVUFBUyxJQUFFLEVBQUU7QUFBRSxVQUFFLENBQUMsRUFBRSxRQUFRLElBQUcsRUFBRSxTQUFPLEtBQUcsS0FBRyxJQUFFLEtBQUcsSUFBRSxJQUFFLENBQUMsQ0FBQztBQUFFLFVBQUUsRUFBRSxPQUFPLEdBQUUsQ0FBQztBQUFFLFFBQUUsQ0FBQyxLQUFHO0FBQUUsVUFBRSxFQUFFLFFBQVEsQ0FBQztBQUFFLFVBQUcsRUFBRSxPQUFPLE1BQUksSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsU0FBTyxJQUFFLElBQUUsQ0FBQyxFQUFFLFFBQVEsSUFBRyxDQUFDLENBQUMsSUFBRSxjQUFZLE1BQUksSUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLFFBQVEsSUFBRyxLQUFLLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFHLElBQUUsRUFBRSxPQUFPLEdBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEVBQUUsS0FBRSxFQUFFLFFBQVEsRUFBRSxHQUFFLEVBQUUsTUFBTSxHQUFFLElBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFQSxNQUFLLFVBQVMsSUFBRSxFQUFFO0FBQUUsV0FBRztBQUFFLFVBQUcsSUFBRSxLQUFHLElBQUUsS0FBRyxLQUFHLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx5QkFBeUI7QUFDbmYsVUFBRyxhQUFXLEVBQUUsVUFBUSxhQUFXLEVBQUUsT0FBTyxPQUFNLElBQUlBLE1BQUssVUFBVSxJQUFJLHdDQUF3QztBQUFFLFVBQUVBLE1BQUssS0FBSyxJQUFJLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsRUFBRSxLQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUUsRUFBRSxNQUFNLEdBQUUsSUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUUsYUFBTyxFQUFFLE1BQU0sR0FBRSxJQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxHQUFFLElBQUVBLE1BQUs7QUFBUyxVQUFFLEVBQUU7QUFBRSxVQUFJLElBQUUsRUFBRSxRQUFPLElBQUUsRUFBRSxVQUFVLENBQUMsR0FBRSxJQUFFLElBQUUsSUFBRyxJQUFFO0FBQUUsVUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLFFBQVEsR0FBRSxJQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFHLENBQUMsRUFBRSxRQUFNLEVBQUMsS0FBSSxHQUFFLE1BQUssQ0FBQyxFQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxLQUFFLE1BQUlBLE1BQUssS0FBSyxJQUFJLEdBQUcsSUFDcmdCLENBQUMsR0FBRSxLQUFHLElBQUcsRUFBRSxDQUFDLEtBQUksSUFBRSxFQUFFLFFBQVEsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLEdBQUUsRUFBRSxJQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsR0FBRSxFQUFFLElBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQztBQUFFLGFBQU0sRUFBQyxLQUFJLEdBQUUsTUFBSyxFQUFFLE1BQU0sR0FBRSxDQUFDLEVBQUM7QUFBQSxJQUFDLEVBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssT0FBSyxTQUFTLEdBQUUsR0FBRTtBQUFDLFdBQUssSUFBRSxJQUFFLEtBQUdBLE1BQUssS0FBSztBQUFPLFVBQUksSUFBRSxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsR0FBRSxHQUFFLElBQUUsRUFBRSxVQUFVLFlBQVU7QUFBRyxXQUFLLElBQUUsQ0FBQyxJQUFJLEtBQUUsSUFBSSxHQUFDO0FBQUUsUUFBRSxTQUFPLE1BQUksSUFBRSxFQUFFLEtBQUssQ0FBQztBQUFHLFdBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsQ0FBQyxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxXQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRTtBQUFXLFdBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUFFLFdBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUFFLFdBQUssSUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUFBLElBQUM7QUFDM1ksSUFBQUEsTUFBSyxLQUFLLEtBQUssVUFBVSxVQUFRQSxNQUFLLEtBQUssS0FBSyxVQUFVLE1BQUksU0FBUyxHQUFFO0FBQUMsVUFBRyxLQUFLLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx5Q0FBeUM7QUFBRSxXQUFLLE9BQU8sQ0FBQztBQUFFLGFBQU8sS0FBSyxPQUFPLENBQUM7QUFBQSxJQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLEtBQUssVUFBVSxRQUFNLFdBQVU7QUFBQyxXQUFLLElBQUUsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFBLElBQUU7QUFBRSxJQUFBQSxNQUFLLEtBQUssS0FB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LENBQUMsSUFBRSxFQUFFLENBQUM7QUFBQSxNQUFDO0FBQUMsYUFBTztBQUFBLElBQUMsR0FBRSxJQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFLENBQUMsR0FBRTtBQUFFLFdBQUksS0FBSyxFQUFFLEdBQUUsZUFBZSxDQUFDLEtBQUcsRUFBRSxDQUFDLE1BQUksRUFBRSxDQUFDLE1BQUksRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUcsYUFBTztBQUFBLElBQUMsR0FBRSxJQUFHLFNBQVMsR0FDNWYsR0FBRTtBQUFDLFVBQUksSUFBRSxDQUFDLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLFlBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUcsYUFBTztBQUFBLElBQUMsRUFBQztBQUFFLElBQUFBLE1BQUssVUFBUUEsTUFBSyxLQUFLO0FBQVEsSUFBQUEsTUFBSyxVQUFRQSxNQUFLLEtBQUs7QUFBUSxJQUFBQSxNQUFLLEtBQUssS0FBRyxDQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLGVBQWEsU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUVBLE1BQUssS0FBSyxJQUFHO0FBQUUsVUFBRSxLQUFHLENBQUM7QUFBRSxVQUFFLEVBQUUsUUFBTTtBQUFJLFVBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUcsQ0FBQztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUcsRUFBQyxXQUFVLEVBQUUsUUFBTSxFQUFFLEtBQUssU0FBTyxFQUFFLEtBQUssTUFBTSxDQUFDLElBQUVBLE1BQUssT0FBTyxZQUFZLEdBQUUsQ0FBQyxFQUFDO0FBQUUsVUFBRSxXQUFTLEVBQUUsT0FBSyxFQUFFLFlBQVUsRUFBRTtBQUFLLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxLQUFHQSxNQUFLLEtBQUssT0FBTyxHQUFFLEdBQUUsRUFBRSxJQUFJ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QUM3RCxDQUFDO0FBRUQsRUFBQUMsY0FBYSxNQUFNLElBQUksRUFBRSxPQUFPLENBQUMsVUFBVTtBQUN6QyxTQUFLLFlBQVk7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBZ0I7QUFBQSxFQUNsQixDQUFDO0FBQ0g7QUFFQSxJQUFNQSxnQkFBZSxDQUNuQixrQkFFQSxhQUFlLGNBQWMsS0FBSyxRQUFROyIsCiAgIm5hbWVzIjogWyJSZWZsZWN0QXBwbHkiLCAiUmVmbGVjdE93bktleXMiLCAiTnVtYmVySXNOYU4iLCAiRXZlbnRFbWl0dGVyIiwgImV2ZW50cyIsICJlcnIiLCAib25jZSIsICJzamNsIiwgImEiLCAiRXZlbnRFbWl0dGVyIiwgInYiLCAib2siLCAiZXJyIiwgIlJlc3VsdCIsICJmcm9tVGhyb3dhYmxlIiwgIm9rIiwgImVyciIsICJzZWxmIiwgIm9iaiIsICJEZWNvZGUiLCAib2JqIiwgInNqY2wiLCAiZGVjcnlwdCIsICJEZWNvZGUiLCAiZGVjcnlwdCIsICJkZWNyeXB0IiwgImNhbmNlbFVwbG9hZCJdCn0K
