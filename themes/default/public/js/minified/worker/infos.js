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
var downloadChunk = (lufiFile, chunkNumber) => {
  let message;
  if (lufiFile.password) {
    message = { part: chunkNumber, file_pwd: lufiFile.password };
  } else {
    message = { part: chunkNumber };
  }
  return sendMessage(
    downloadSocketUrl(lufiFile),
    lufiFile,
    JSON.stringify(message)
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

// src/worker/infos.ts
var isInitiated = false;
self.onmessage = (event) => {
  if (!isInitiated) {
    init();
    isInitiated = true;
  }
  events.on("DOWNLOAD_STARTED" /* DOWNLOAD_STARTED */, () => {
    sockets[downloadSocketUrl(event.data.args.lufiFile)].close();
    self.postMessage({ event: "INFOS_RETRIEVED" /* INFOS_RETRIEVED */ });
  });
  retrieveInfos(event.data).mapErr((error) => {
    self.postMessage({
      event: "OPERATION_FAILED" /* OPERATION_FAILED */,
      error
    });
  });
};
var retrieveInfos = (workerMessage) => downloadChunk(workerMessage.args.lufiFile, 0);
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vbHVmaS1zamNsQDEuMC44L25vZGVfbW9kdWxlcy9sdWZpLXNqY2wvc2pjbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vbmV2ZXJ0aHJvd0A4LjEuMS9ub2RlX21vZHVsZXMvbmV2ZXJ0aHJvdy9kaXN0L2luZGV4LmVzLmpzIiwgIi4uLy4uL3NyYy9lcnJvci9iYXNlLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWNvbm5lY3Rpb24tZXJyb3IudHMiLCAiLi4vLi4vc3JjL3V0aWxzLnRzIiwgIi4uLy4uL3NyYy93b3JrZXIvc2hhcmVkLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9hcnJheWJ1ZmZlci1lbmNvZGluZ0AxLjEuMC9ub2RlX21vZHVsZXMvYXJyYXlidWZmZXItZW5jb2Rpbmcvc3JjL2Jhc2U2NC9lbmNvZGluZy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vYXJyYXlidWZmZXItZW5jb2RpbmdAMS4xLjAvbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLWVuY29kaW5nL3NyYy9iYXNlNjQvc3RhbmRhcmQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2FycmF5YnVmZmVyLWVuY29kaW5nQDEuMS4wL25vZGVfbW9kdWxlcy9hcnJheWJ1ZmZlci1lbmNvZGluZy9zcmMvYmFzZTY0L3VybC50cyIsICIuLi8uLi9zcmMvYXBpL2NyeXB0by9zamNsLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vZGVjcnlwdGlvbi1lcnJvci50cyIsICIuLi8uLi9zcmMvYXBpL2NyeXB0by93ZWIudHMiLCAiLi4vLi4vc3JjL2FwaS9jcnlwdG8udHMiLCAiLi4vLi4vc3JjL2FwaS93ZWJzb2NrZXQudHMiLCAiLi4vLi4vc3JjL3dvcmtlci9pbmZvcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFIgPSB0eXBlb2YgUmVmbGVjdCA9PT0gJ29iamVjdCcgPyBSZWZsZWN0IDogbnVsbFxudmFyIFJlZmxlY3RBcHBseSA9IFIgJiYgdHlwZW9mIFIuYXBwbHkgPT09ICdmdW5jdGlvbidcbiAgPyBSLmFwcGx5XG4gIDogZnVuY3Rpb24gUmVmbGVjdEFwcGx5KHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpIHtcbiAgICByZXR1cm4gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwodGFyZ2V0LCByZWNlaXZlciwgYXJncyk7XG4gIH1cblxudmFyIFJlZmxlY3RPd25LZXlzXG5pZiAoUiAmJiB0eXBlb2YgUi5vd25LZXlzID09PSAnZnVuY3Rpb24nKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gUi5vd25LZXlzXG59IGVsc2UgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KVxuICAgICAgLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCkpO1xuICB9O1xufSBlbHNlIHtcbiAgUmVmbGVjdE93bktleXMgPSBmdW5jdGlvbiBSZWZsZWN0T3duS2V5cyh0YXJnZXQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGFyZ2V0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gUHJvY2Vzc0VtaXRXYXJuaW5nKHdhcm5pbmcpIHtcbiAgaWYgKGNvbnNvbGUgJiYgY29uc29sZS53YXJuKSBjb25zb2xlLndhcm4od2FybmluZyk7XG59XG5cbnZhciBOdW1iZXJJc05hTiA9IE51bWJlci5pc05hTiB8fCBmdW5jdGlvbiBOdW1iZXJJc05hTih2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT09IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIEV2ZW50RW1pdHRlci5pbml0LmNhbGwodGhpcyk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcbm1vZHVsZS5leHBvcnRzLm9uY2UgPSBvbmNlO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50c0NvdW50ID0gMDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxudmFyIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuZnVuY3Rpb24gY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcikge1xuICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwibGlzdGVuZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRnVuY3Rpb24uIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBsaXN0ZW5lcik7XG4gIH1cbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50RW1pdHRlciwgJ2RlZmF1bHRNYXhMaXN0ZW5lcnMnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oYXJnKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgTnVtYmVySXNOYU4oYXJnKSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcImRlZmF1bHRNYXhMaXN0ZW5lcnNcIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgYXJnICsgJy4nKTtcbiAgICB9XG4gICAgZGVmYXVsdE1heExpc3RlbmVycyA9IGFyZztcbiAgfVxufSk7XG5cbkV2ZW50RW1pdHRlci5pbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgaWYgKHRoaXMuX2V2ZW50cyA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICB0aGlzLl9ldmVudHMgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZih0aGlzKS5fZXZlbnRzKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gIH1cblxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufTtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBOdW1iZXJJc05hTihuKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJuXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIG4gKyAnLicpO1xuICB9XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gX2dldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gX2dldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgYXJncyA9IFtdO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgYXJncy5wdXNoKGFyZ3VtZW50c1tpXSk7XG4gIHZhciBkb0Vycm9yID0gKHR5cGUgPT09ICdlcnJvcicpO1xuXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZClcbiAgICBkb0Vycm9yID0gKGRvRXJyb3IgJiYgZXZlbnRzLmVycm9yID09PSB1bmRlZmluZWQpO1xuICBlbHNlIGlmICghZG9FcnJvcilcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAoZG9FcnJvcikge1xuICAgIHZhciBlcjtcbiAgICBpZiAoYXJncy5sZW5ndGggPiAwKVxuICAgICAgZXIgPSBhcmdzWzBdO1xuICAgIGlmIChlciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAvLyBOb3RlOiBUaGUgY29tbWVudHMgb24gdGhlIGB0aHJvd2AgbGluZXMgYXJlIGludGVudGlvbmFsLCB0aGV5IHNob3dcbiAgICAgIC8vIHVwIGluIE5vZGUncyBvdXRwdXQgaWYgdGhpcyByZXN1bHRzIGluIGFuIHVuaGFuZGxlZCBleGNlcHRpb24uXG4gICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICB9XG4gICAgLy8gQXQgbGVhc3QgZ2l2ZSBzb21lIGtpbmQgb2YgY29udGV4dCB0byB0aGUgdXNlclxuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBlcnJvci4nICsgKGVyID8gJyAoJyArIGVyLm1lc3NhZ2UgKyAnKScgOiAnJykpO1xuICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgdGhyb3cgZXJyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBldmVudHNbdHlwZV07XG5cbiAgaWYgKGhhbmRsZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgUmVmbGVjdEFwcGx5KGhhbmRsZXIsIHRoaXMsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBSZWZsZWN0QXBwbHkobGlzdGVuZXJzW2ldLCB0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuZnVuY3Rpb24gX2FkZExpc3RlbmVyKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIsIHByZXBlbmQpIHtcbiAgdmFyIG07XG4gIHZhciBldmVudHM7XG4gIHZhciBleGlzdGluZztcblxuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRhcmdldC5fZXZlbnRzQ291bnQgPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gICAgLy8gYWRkaW5nIGl0IHRvIHRoZSBsaXN0ZW5lcnMsIGZpcnN0IGVtaXQgXCJuZXdMaXN0ZW5lclwiLlxuICAgIGlmIChldmVudHMubmV3TGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLmxpc3RlbmVyID8gbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgICAgIC8vIFJlLWFzc2lnbiBgZXZlbnRzYCBiZWNhdXNlIGEgbmV3TGlzdGVuZXIgaGFuZGxlciBjb3VsZCBoYXZlIGNhdXNlZCB0aGVcbiAgICAgIC8vIHRoaXMuX2V2ZW50cyB0byBiZSBhc3NpZ25lZCB0byBhIG5ldyBvYmplY3RcbiAgICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICAgIH1cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXTtcbiAgfVxuXG4gIGlmIChleGlzdGluZyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgIHByZXBlbmQgPyBbbGlzdGVuZXIsIGV4aXN0aW5nXSA6IFtleGlzdGluZywgbGlzdGVuZXJdO1xuICAgICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIH0gZWxzZSBpZiAocHJlcGVuZCkge1xuICAgICAgZXhpc3RpbmcudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0aW5nLnB1c2gobGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gICAgbSA9IF9nZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICBpZiAobSA+IDAgJiYgZXhpc3RpbmcubGVuZ3RoID4gbSAmJiAhZXhpc3Rpbmcud2FybmVkKSB7XG4gICAgICBleGlzdGluZy53YXJuZWQgPSB0cnVlO1xuICAgICAgLy8gTm8gZXJyb3IgY29kZSBmb3IgdGhpcyBzaW5jZSBpdCBpcyBhIFdhcm5pbmdcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV4aXN0aW5nLmxlbmd0aCArICcgJyArIFN0cmluZyh0eXBlKSArICcgbGlzdGVuZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAnaW5jcmVhc2UgbGltaXQnKTtcbiAgICAgIHcubmFtZSA9ICdNYXhMaXN0ZW5lcnNFeGNlZWRlZFdhcm5pbmcnO1xuICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgdy50eXBlID0gdHlwZTtcbiAgICAgIHcuY291bnQgPSBleGlzdGluZy5sZW5ndGg7XG4gICAgICBQcm9jZXNzRW1pdFdhcm5pbmcodyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0KTtcbiAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb25jZVdyYXAodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgc3RhdGUgPSB7IGZpcmVkOiBmYWxzZSwgd3JhcEZuOiB1bmRlZmluZWQsIHRhcmdldDogdGFyZ2V0LCB0eXBlOiB0eXBlLCBsaXN0ZW5lcjogbGlzdGVuZXIgfTtcbiAgdmFyIHdyYXBwZWQgPSBvbmNlV3JhcHBlci5iaW5kKHN0YXRlKTtcbiAgd3JhcHBlZC5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICBzdGF0ZS53cmFwRm4gPSB3cmFwcGVkO1xuICByZXR1cm4gd3JhcHBlZDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgdGhpcy5vbih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRPbmNlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRPbmNlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmIChsaXN0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHwgbGlzdC5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3QubGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBsaXN0ICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHBvc2l0aW9uID0gLTE7XG5cbiAgICAgICAgZm9yIChpID0gbGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fCBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgb3JpZ2luYWxMaXN0ZW5lciA9IGxpc3RbaV0ubGlzdGVuZXI7XG4gICAgICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMClcbiAgICAgICAgICBsaXN0LnNoaWZ0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHNwbGljZU9uZShsaXN0LCBwb3NpdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIG9yaWdpbmFsTGlzdGVuZXIgfHwgbGlzdGVuZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cbiAgICBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnModHlwZSkge1xuICAgICAgdmFyIGxpc3RlbmVycywgZXZlbnRzLCBpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudHNbdHlwZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXZlbnRzKTtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBMSUZPIG9yZGVyXG4gICAgICAgIGZvciAoaSA9IGxpc3RlbmVycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG5mdW5jdGlvbiBfbGlzdGVuZXJzKHRhcmdldCwgdHlwZSwgdW53cmFwKSB7XG4gIHZhciBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoZXZsaXN0ZW5lciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpXG4gICAgcmV0dXJuIHVud3JhcCA/IFtldmxpc3RlbmVyLmxpc3RlbmVyIHx8IGV2bGlzdGVuZXJdIDogW2V2bGlzdGVuZXJdO1xuXG4gIHJldHVybiB1bndyYXAgP1xuICAgIHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcblxuICAgIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfSBlbHNlIGlmIChldmxpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gMDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgcmV0dXJuIHRoaXMuX2V2ZW50c0NvdW50ID4gMCA/IFJlZmxlY3RPd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gc3BsaWNlT25lKGxpc3QsIGluZGV4KSB7XG4gIGZvciAoOyBpbmRleCArIDEgPCBsaXN0Lmxlbmd0aDsgaW5kZXgrKylcbiAgICBsaXN0W2luZGV4XSA9IGxpc3RbaW5kZXggKyAxXTtcbiAgbGlzdC5wb3AoKTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb25jZShlbWl0dGVyLCBuYW1lKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZnVuY3Rpb24gZXJyb3JMaXN0ZW5lcihlcnIpIHtcbiAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIobmFtZSwgcmVzb2x2ZXIpO1xuICAgICAgcmVqZWN0KGVycik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZXIoKSB7XG4gICAgICBpZiAodHlwZW9mIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBlcnJvckxpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUoW10uc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIHJlc29sdmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgaWYgKG5hbWUgIT09ICdlcnJvcicpIHtcbiAgICAgIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGVycm9yTGlzdGVuZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBoYW5kbGVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgJ2Vycm9yJywgaGFuZGxlciwgZmxhZ3MpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCBsaXN0ZW5lciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgIGVtaXR0ZXIub25jZShuYW1lLCBsaXN0ZW5lcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVtaXR0ZXIub24obmFtZSwgbGlzdGVuZXIpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gRXZlbnRUYXJnZXQgZG9lcyBub3QgaGF2ZSBgZXJyb3JgIGV2ZW50IHNlbWFudGljcyBsaWtlIE5vZGVcbiAgICAvLyBFdmVudEVtaXR0ZXJzLCB3ZSBkbyBub3QgbGlzdGVuIGZvciBgZXJyb3JgIGV2ZW50cyBoZXJlLlxuICAgIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmdW5jdGlvbiB3cmFwTGlzdGVuZXIoYXJnKSB7XG4gICAgICAvLyBJRSBkb2VzIG5vdCBoYXZlIGJ1aWx0aW4gYHsgb25jZTogdHJ1ZSB9YCBzdXBwb3J0IHNvIHdlXG4gICAgICAvLyBoYXZlIHRvIGRvIGl0IG1hbnVhbGx5LlxuICAgICAgaWYgKGZsYWdzLm9uY2UpIHtcbiAgICAgICAgZW1pdHRlci5yZW1vdmVFdmVudExpc3RlbmVyKG5hbWUsIHdyYXBMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICBsaXN0ZW5lcihhcmcpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImVtaXR0ZXJcIiBhcmd1bWVudCBtdXN0IGJlIG9mIHR5cGUgRXZlbnRFbWl0dGVyLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgZW1pdHRlcik7XG4gIH1cbn1cbiIsICJcInVzZSBzdHJpY3RcIjt2YXIgc2pjbD17Y2lwaGVyOnt9LGhhc2g6e30sa2V5ZXhjaGFuZ2U6e30sbW9kZTp7fSxtaXNjOnt9LGNvZGVjOnt9LGV4Y2VwdGlvbjp7Y29ycnVwdDpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJDT1JSVVBUOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfSxpbnZhbGlkOmZ1bmN0aW9uKGEpe3RoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIklOVkFMSUQ6IFwiK3RoaXMubWVzc2FnZX07dGhpcy5tZXNzYWdlPWF9LGJ1ZzpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJCVUc6IFwiK3RoaXMubWVzc2FnZX07dGhpcy5tZXNzYWdlPWF9LG5vdFJlYWR5OmZ1bmN0aW9uKGEpe3RoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIk5PVCBSRUFEWTogXCIrdGhpcy5tZXNzYWdlfTt0aGlzLm1lc3NhZ2U9YX19fTtcbnNqY2wuY2lwaGVyLmFlcz1mdW5jdGlvbihhKXt0aGlzLndbMF1bMF1bMF18fHRoaXMuQygpO3ZhciBiLGMsZCxlLGY9dGhpcy53WzBdWzRdLGc9dGhpcy53WzFdO2I9YS5sZW5ndGg7dmFyIGg9MTtpZig0IT09YiYmNiE9PWImJjghPT1iKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiaW52YWxpZCBhZXMga2V5IHNpemVcIik7dGhpcy5iPVtkPWEuc2xpY2UoMCksZT1bXV07Zm9yKGE9YjthPDQqYisyODthKyspe2M9ZFthLTFdO2lmKDA9PT1hJWJ8fDg9PT1iJiY0PT09YSViKWM9ZltjPj4+MjRdPDwyNF5mW2M+PjE2JjI1NV08PDE2XmZbYz4+OCYyNTVdPDw4XmZbYyYyNTVdLDA9PT1hJWImJihjPWM8PDheYz4+PjI0Xmg8PDI0LGg9aDw8MV4yODMqKGg+PjcpKTtkW2FdPWRbYS1iXV5jfWZvcihiPTA7YTtiKyssYS0tKWM9ZFtiJjM/YTphLTRdLGVbYl09ND49YXx8ND5iP2M6Z1swXVtmW2M+Pj4yNF1dXmdbMV1bZltjPj4xNiYyNTVdXV5nWzJdW2ZbYz4+OCYyNTVdXV5nWzNdW2ZbYyZcbjI1NV1dfTtcbnNqY2wuY2lwaGVyLmFlcy5wcm90b3R5cGU9e2VuY3J5cHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIGFhKHRoaXMsYSwwKX0sZGVjcnlwdDpmdW5jdGlvbihhKXtyZXR1cm4gYWEodGhpcyxhLDEpfSx3OltbW10sW10sW10sW10sW11dLFtbXSxbXSxbXSxbXSxbXV1dLEM6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLndbMF0sYj10aGlzLndbMV0sYz1hWzRdLGQ9Yls0XSxlLGYsZyxoPVtdLGs9W10sbixsLG0scDtmb3IoZT0wOzB4MTAwPmU7ZSsrKWtbKGhbZV09ZTw8MV4yODMqKGU+PjcpKV5lXT1lO2ZvcihmPWc9MDshY1tmXTtmXj1ufHwxLGc9a1tnXXx8MSlmb3IobT1nXmc8PDFeZzw8Ml5nPDwzXmc8PDQsbT1tPj44Xm0mMjU1Xjk5LGNbZl09bSxkW21dPWYsbD1oW2U9aFtuPWhbZl1dXSxwPTB4MTAxMDEwMSpsXjB4MTAwMDEqZV4weDEwMSpuXjB4MTAxMDEwMCpmLGw9MHgxMDEqaFttXV4weDEwMTAxMDAqbSxlPTA7ND5lO2UrKylhW2VdW2ZdPWw9bDw8MjRebD4+PjgsYltlXVttXT1wPXA8PDI0XnA+Pj44O2ZvcihlPVxuMDs1PmU7ZSsrKWFbZV09YVtlXS5zbGljZSgwKSxiW2VdPWJbZV0uc2xpY2UoMCl9fTtcbmZ1bmN0aW9uIGFhKGEsYixjKXtpZig0IT09Yi5sZW5ndGgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJpbnZhbGlkIGFlcyBibG9jayBzaXplXCIpO3ZhciBkPWEuYltjXSxlPWJbMF1eZFswXSxmPWJbYz8zOjFdXmRbMV0sZz1iWzJdXmRbMl07Yj1iW2M/MTozXV5kWzNdO3ZhciBoLGssbixsPWQubGVuZ3RoLzQtMixtLHA9NCx6PVswLDAsMCwwXTtoPWEud1tjXTthPWhbMF07dmFyIEE9aFsxXSxDPWhbMl0sQj1oWzNdLEQ9aFs0XTtmb3IobT0wO208bDttKyspaD1hW2U+Pj4yNF1eQVtmPj4xNiYyNTVdXkNbZz4+OCYyNTVdXkJbYiYyNTVdXmRbcF0saz1hW2Y+Pj4yNF1eQVtnPj4xNiYyNTVdXkNbYj4+OCYyNTVdXkJbZSYyNTVdXmRbcCsxXSxuPWFbZz4+PjI0XV5BW2I+PjE2JjI1NV1eQ1tlPj44JjI1NV1eQltmJjI1NV1eZFtwKzJdLGI9YVtiPj4+MjRdXkFbZT4+MTYmMjU1XV5DW2Y+PjgmMjU1XV5CW2cmMjU1XV5kW3ArM10scCs9NCxlPWgsZj1rLGc9bjtmb3IobT1cbjA7ND5tO20rKyl6W2M/MyYtbTptXT1EW2U+Pj4yNF08PDI0XkRbZj4+MTYmMjU1XTw8MTZeRFtnPj44JjI1NV08PDheRFtiJjI1NV1eZFtwKytdLGg9ZSxlPWYsZj1nLGc9YixiPWg7cmV0dXJuIHp9XG5zamNsLmJpdEFycmF5PXtiaXRTbGljZTpmdW5jdGlvbihhLGIsYyl7YT1zamNsLmJpdEFycmF5LlkoYS5zbGljZShiLzMyKSwzMi0oYiYzMSkpLnNsaWNlKDEpO3JldHVybiB2b2lkIDA9PT1jP2E6c2pjbC5iaXRBcnJheS5jbGFtcChhLGMtYil9LGV4dHJhY3Q6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPU1hdGguZmxvb3IoLWItYyYzMSk7cmV0dXJuKChiK2MtMV5iKSYtMzI/YVtiLzMyfDBdPDwzMi1kXmFbYi8zMisxfDBdPj4+ZDphW2IvMzJ8MF0+Pj5kKSYoMTw8YyktMX0sY29uY2F0OmZ1bmN0aW9uKGEsYil7aWYoMD09PWEubGVuZ3RofHwwPT09Yi5sZW5ndGgpcmV0dXJuIGEuY29uY2F0KGIpO3ZhciBjPWFbYS5sZW5ndGgtMV0sZD1zamNsLmJpdEFycmF5LmdldFBhcnRpYWwoYyk7cmV0dXJuIDMyPT09ZD9hLmNvbmNhdChiKTpzamNsLmJpdEFycmF5LlkoYixkLGN8MCxhLnNsaWNlKDAsYS5sZW5ndGgtMSkpfSxiaXRMZW5ndGg6ZnVuY3Rpb24oYSl7dmFyIGI9YS5sZW5ndGg7cmV0dXJuIDA9PT1cbmI/MDozMiooYi0xKStzamNsLmJpdEFycmF5LmdldFBhcnRpYWwoYVtiLTFdKX0sY2xhbXA6ZnVuY3Rpb24oYSxiKXtpZigzMiphLmxlbmd0aDxiKXJldHVybiBhO2E9YS5zbGljZSgwLE1hdGguY2VpbChiLzMyKSk7dmFyIGM9YS5sZW5ndGg7Yj1iJjMxOzA8YyYmYiYmKGFbYy0xXT1zamNsLmJpdEFycmF5LnBhcnRpYWwoYixhW2MtMV0mMjE0NzQ4MzY0OD4+Yi0xLDEpKTtyZXR1cm4gYX0scGFydGlhbDpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIDMyPT09YT9iOihjP2J8MDpiPDwzMi1hKSsweDEwMDAwMDAwMDAwKmF9LGdldFBhcnRpYWw6ZnVuY3Rpb24oYSl7cmV0dXJuIE1hdGgucm91bmQoYS8weDEwMDAwMDAwMDAwKXx8MzJ9LGVxdWFsOmZ1bmN0aW9uKGEsYil7aWYoc2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSkhPT1zamNsLmJpdEFycmF5LmJpdExlbmd0aChiKSlyZXR1cm4hMTt2YXIgYz0wLGQ7Zm9yKGQ9MDtkPGEubGVuZ3RoO2QrKyljfD1hW2RdXmJbZF07cmV0dXJuIDA9PT1cbmN9LFk6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU7ZT0wO2Zvcih2b2lkIDA9PT1kJiYoZD1bXSk7MzI8PWI7Yi09MzIpZC5wdXNoKGMpLGM9MDtpZigwPT09YilyZXR1cm4gZC5jb25jYXQoYSk7Zm9yKGU9MDtlPGEubGVuZ3RoO2UrKylkLnB1c2goY3xhW2VdPj4+YiksYz1hW2VdPDwzMi1iO2U9YS5sZW5ndGg/YVthLmxlbmd0aC0xXTowO2E9c2pjbC5iaXRBcnJheS5nZXRQYXJ0aWFsKGUpO2QucHVzaChzamNsLmJpdEFycmF5LnBhcnRpYWwoYithJjMxLDMyPGIrYT9jOmQucG9wKCksMSkpO3JldHVybiBkfSxQOmZ1bmN0aW9uKGEsYil7cmV0dXJuW2FbMF1eYlswXSxhWzFdXmJbMV0sYVsyXV5iWzJdLGFbM11eYlszXV19LGJ5dGVzd2FwTTpmdW5jdGlvbihhKXt2YXIgYixjO2ZvcihiPTA7YjxhLmxlbmd0aDsrK2IpYz1hW2JdLGFbYl09Yz4+PjI0fGM+Pj44JjB4ZmYwMHwoYyYweGZmMDApPDw4fGM8PDI0O3JldHVybiBhfX07XG5zamNsLmNvZGVjLnV0ZjhTdHJpbmc9e2Zyb21CaXRzOmZ1bmN0aW9uKGEpe3ZhciBiPVwiXCIsYz1zamNsLmJpdEFycmF5LmJpdExlbmd0aChhKSxkLGU7Zm9yKGQ9MDtkPGMvODtkKyspMD09PShkJjMpJiYoZT1hW2QvNF0pLGIrPVN0cmluZy5mcm9tQ2hhckNvZGUoZT4+Pjg+Pj44Pj4+OCksZTw8PTg7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChlc2NhcGUoYikpfSx0b0JpdHM6ZnVuY3Rpb24oYSl7YT11bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoYSkpO3ZhciBiPVtdLGMsZD0wO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspZD1kPDw4fGEuY2hhckNvZGVBdChjKSwzPT09KGMmMykmJihiLnB1c2goZCksZD0wKTtjJjMmJmIucHVzaChzamNsLmJpdEFycmF5LnBhcnRpYWwoOCooYyYzKSxkKSk7cmV0dXJuIGJ9fTtcbnNqY2wuY29kZWMuaGV4PXtmcm9tQml0czpmdW5jdGlvbihhKXt2YXIgYj1cIlwiLGM7Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKyliKz0oKGFbY118MCkrMHhmMDAwMDAwMDAwMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoNCk7cmV0dXJuIGIuc3Vic3RyKDAsc2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSkvNCl9LHRvQml0czpmdW5jdGlvbihhKXt2YXIgYixjPVtdLGQ7YT1hLnJlcGxhY2UoL1xcc3wweC9nLFwiXCIpO2Q9YS5sZW5ndGg7YT1hK1wiMDAwMDAwMDBcIjtmb3IoYj0wO2I8YS5sZW5ndGg7Yis9OCljLnB1c2gocGFyc2VJbnQoYS5zdWJzdHIoYiw4KSwxNileMCk7cmV0dXJuIHNqY2wuYml0QXJyYXkuY2xhbXAoYyw0KmQpfX07XG5zamNsLmNvZGVjLmJhc2U2ND17UzpcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky9cIixmcm9tQml0czpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9XCJcIixlPTAsZj1zamNsLmNvZGVjLmJhc2U2NC5TLGc9MCxoPXNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpO2MmJihmPWYuc3Vic3RyKDAsNjIpK1wiLV9cIik7Zm9yKGM9MDs2KmQubGVuZ3RoPGg7KWQrPWYuY2hhckF0KChnXmFbY10+Pj5lKT4+PjI2KSw2PmU/KGc9YVtjXTw8Ni1lLGUrPTI2LGMrKyk6KGc8PD02LGUtPTYpO2Zvcig7ZC5sZW5ndGgmMyYmIWI7KWQrPVwiPVwiO3JldHVybiBkfSx0b0JpdHM6ZnVuY3Rpb24oYSxiKXthPWEucmVwbGFjZSgvXFxzfD0vZyxcIlwiKTt2YXIgYz1bXSxkLGU9MCxmPXNqY2wuY29kZWMuYmFzZTY0LlMsZz0wLGg7YiYmKGY9Zi5zdWJzdHIoMCw2MikrXCItX1wiKTtmb3IoZD0wO2Q8YS5sZW5ndGg7ZCsrKXtoPWYuaW5kZXhPZihhLmNoYXJBdChkKSk7XG5pZigwPmgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJ0aGlzIGlzbid0IGJhc2U2NCFcIik7MjY8ZT8oZS09MjYsYy5wdXNoKGdeaD4+PmUpLGc9aDw8MzItZSk6KGUrPTYsZ149aDw8MzItZSl9ZSY1NiYmYy5wdXNoKHNqY2wuYml0QXJyYXkucGFydGlhbChlJjU2LGcsMSkpO3JldHVybiBjfX07c2pjbC5jb2RlYy5iYXNlNjR1cmw9e2Zyb21CaXRzOmZ1bmN0aW9uKGEpe3JldHVybiBzamNsLmNvZGVjLmJhc2U2NC5mcm9tQml0cyhhLDEsMSl9LHRvQml0czpmdW5jdGlvbihhKXtyZXR1cm4gc2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGEsMSl9fTtzamNsLmhhc2guc2hhMjU2PWZ1bmN0aW9uKGEpe3RoaXMuYlswXXx8dGhpcy5DKCk7YT8odGhpcy5nPWEuZy5zbGljZSgwKSx0aGlzLmY9YS5mLnNsaWNlKDApLHRoaXMuYz1hLmMpOnRoaXMucmVzZXQoKX07c2pjbC5oYXNoLnNoYTI1Ni5oYXNoPWZ1bmN0aW9uKGEpe3JldHVybihuZXcgc2pjbC5oYXNoLnNoYTI1NikudXBkYXRlKGEpLmZpbmFsaXplKCl9O1xuc2pjbC5oYXNoLnNoYTI1Ni5wcm90b3R5cGU9e2Jsb2NrU2l6ZTo1MTIscmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLmc9dGhpcy5vLnNsaWNlKDApO3RoaXMuZj1bXTt0aGlzLmM9MDtyZXR1cm4gdGhpc30sdXBkYXRlOmZ1bmN0aW9uKGEpe1wic3RyaW5nXCI9PT10eXBlb2YgYSYmKGE9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhhKSk7dmFyIGIsYz10aGlzLmY9c2pjbC5iaXRBcnJheS5jb25jYXQodGhpcy5mLGEpO2I9dGhpcy5jO2E9dGhpcy5jPWIrc2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSk7aWYoMHgxZmZmZmZmZmZmZmZmZjxhKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiQ2Fubm90IGhhc2ggbW9yZSB0aGFuIDJeNTMgLSAxIGJpdHNcIik7aWYoXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBVaW50MzJBcnJheSl7dmFyIGQ9bmV3IFVpbnQzMkFycmF5KGMpLGU9MDtmb3IoYj01MTIrYi0oNTEyK2ImMHgxZmYpO2I8PWE7Yis9NTEyKXRoaXMubChkLnN1YmFycmF5KDE2KmUsXG4xNiooZSsxKSkpLGUrPTE7Yy5zcGxpY2UoMCwxNiplKX1lbHNlIGZvcihiPTUxMitiLSg1MTIrYiYweDFmZik7Yjw9YTtiKz01MTIpdGhpcy5sKGMuc3BsaWNlKDAsMTYpKTtyZXR1cm4gdGhpc30sZmluYWxpemU6ZnVuY3Rpb24oKXt2YXIgYSxiPXRoaXMuZixjPXRoaXMuZyxiPXNqY2wuYml0QXJyYXkuY29uY2F0KGIsW3NqY2wuYml0QXJyYXkucGFydGlhbCgxLDEpXSk7Zm9yKGE9Yi5sZW5ndGgrMjthJjE1O2ErKyliLnB1c2goMCk7Yi5wdXNoKE1hdGguZmxvb3IodGhpcy5jLzB4MTAwMDAwMDAwKSk7Zm9yKGIucHVzaCh0aGlzLmN8MCk7Yi5sZW5ndGg7KXRoaXMubChiLnNwbGljZSgwLDE2KSk7dGhpcy5yZXNldCgpO3JldHVybiBjfSxvOltdLGI6W10sQzpmdW5jdGlvbigpe2Z1bmN0aW9uIGEoYSl7cmV0dXJuIDB4MTAwMDAwMDAwKihhLU1hdGguZmxvb3IoYSkpfDB9Zm9yKHZhciBiPTAsYz0yLGQsZTs2ND5iO2MrKyl7ZT0hMDtmb3IoZD0yO2QqZDw9YztkKyspaWYoMD09PWMlZCl7ZT1cbiExO2JyZWFrfWUmJig4PmImJih0aGlzLm9bYl09YShNYXRoLnBvdyhjLC41KSkpLHRoaXMuYltiXT1hKE1hdGgucG93KGMsMS8zKSksYisrKX19LGw6ZnVuY3Rpb24oYSl7dmFyIGIsYyxkLGU9dGhpcy5nLGY9dGhpcy5iLGc9ZVswXSxoPWVbMV0saz1lWzJdLG49ZVszXSxsPWVbNF0sbT1lWzVdLHA9ZVs2XSx6PWVbN107Zm9yKGI9MDs2ND5iO2IrKykxNj5iP2M9YVtiXTooYz1hW2IrMSYxNV0sZD1hW2IrMTQmMTVdLGM9YVtiJjE1XT0oYz4+PjdeYz4+PjE4XmM+Pj4zXmM8PDI1XmM8PDE0KSsoZD4+PjE3XmQ+Pj4xOV5kPj4+MTBeZDw8MTVeZDw8MTMpK2FbYiYxNV0rYVtiKzkmMTVdfDApLGM9Yyt6KyhsPj4+Nl5sPj4+MTFebD4+PjI1Xmw8PDI2Xmw8PDIxXmw8PDcpKyhwXmwmKG1ecCkpK2ZbYl0sej1wLHA9bSxtPWwsbD1uK2N8MCxuPWssaz1oLGg9ZyxnPWMrKGgma15uJihoXmspKSsoaD4+PjJeaD4+PjEzXmg+Pj4yMl5oPDwzMF5oPDwxOV5oPDwxMCl8MDtlWzBdPWVbMF0rZ3xcbjA7ZVsxXT1lWzFdK2h8MDtlWzJdPWVbMl0ra3wwO2VbM109ZVszXStufDA7ZVs0XT1lWzRdK2x8MDtlWzVdPWVbNV0rbXwwO2VbNl09ZVs2XStwfDA7ZVs3XT1lWzddK3p8MH19O3NqY2wuaGFzaC5zaGE1MTI9ZnVuY3Rpb24oYSl7dGhpcy5iWzBdfHx0aGlzLkMoKTthPyh0aGlzLmc9YS5nLnNsaWNlKDApLHRoaXMuZj1hLmYuc2xpY2UoMCksdGhpcy5jPWEuYyk6dGhpcy5yZXNldCgpfTtzamNsLmhhc2guc2hhNTEyLmhhc2g9ZnVuY3Rpb24oYSl7cmV0dXJuKG5ldyBzamNsLmhhc2guc2hhNTEyKS51cGRhdGUoYSkuZmluYWxpemUoKX07XG5zamNsLmhhc2guc2hhNTEyLnByb3RvdHlwZT17YmxvY2tTaXplOjEwMjQscmVzZXQ6ZnVuY3Rpb24oKXt0aGlzLmc9dGhpcy5vLnNsaWNlKDApO3RoaXMuZj1bXTt0aGlzLmM9MDtyZXR1cm4gdGhpc30sdXBkYXRlOmZ1bmN0aW9uKGEpe1wic3RyaW5nXCI9PT10eXBlb2YgYSYmKGE9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhhKSk7dmFyIGIsYz10aGlzLmY9c2pjbC5iaXRBcnJheS5jb25jYXQodGhpcy5mLGEpO2I9dGhpcy5jO2E9dGhpcy5jPWIrc2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSk7aWYoMHgxZmZmZmZmZmZmZmZmZjxhKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiQ2Fubm90IGhhc2ggbW9yZSB0aGFuIDJeNTMgLSAxIGJpdHNcIik7aWYoXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBVaW50MzJBcnJheSl7dmFyIGQ9bmV3IFVpbnQzMkFycmF5KGMpLGU9MDtmb3IoYj0xMDI0K2ItKDEwMjQrYiYxMDIzKTtiPD1hO2IrPTEwMjQpdGhpcy5sKGQuc3ViYXJyYXkoMzIqXG5lLDMyKihlKzEpKSksZSs9MTtjLnNwbGljZSgwLDMyKmUpfWVsc2UgZm9yKGI9MTAyNCtiLSgxMDI0K2ImMTAyMyk7Yjw9YTtiKz0xMDI0KXRoaXMubChjLnNwbGljZSgwLDMyKSk7cmV0dXJuIHRoaXN9LGZpbmFsaXplOmZ1bmN0aW9uKCl7dmFyIGEsYj10aGlzLmYsYz10aGlzLmcsYj1zamNsLmJpdEFycmF5LmNvbmNhdChiLFtzamNsLmJpdEFycmF5LnBhcnRpYWwoMSwxKV0pO2ZvcihhPWIubGVuZ3RoKzQ7YSYzMTthKyspYi5wdXNoKDApO2IucHVzaCgwKTtiLnB1c2goMCk7Yi5wdXNoKE1hdGguZmxvb3IodGhpcy5jLzB4MTAwMDAwMDAwKSk7Zm9yKGIucHVzaCh0aGlzLmN8MCk7Yi5sZW5ndGg7KXRoaXMubChiLnNwbGljZSgwLDMyKSk7dGhpcy5yZXNldCgpO3JldHVybiBjfSxvOltdLGlhOlsxMjM3MjIzMiwxMzI4MTA4Myw5NzYyODU5LDE5MTQ2MDksMTUxMDY3NjksNDA5MDkxMSw0MzA4MzMxLDgyNjYxMDVdLGI6W10sa2E6WzI2NjYwMTgsMTU2ODkxNjUsNTA2MTQyMyw5MDM0Njg0LFxuNDc2NDk4NCwzODA5NTMsMTY1ODc3OSw3MTc2NDcyLDE5NzE4Niw3MzY4NjM4LDE0OTg3OTE2LDE2NzU3OTg2LDgwOTYxMTEsMTQ4MDM2OSwxMzA0NjMyNSw2ODkxMTU2LDE1ODEzMzMwLDUxODcwNDMsOTIyOTc0OSwxMTMxMjIyOSwyODE4Njc3LDEwOTM3NDc1LDQzMjQzMDgsMTEzNTU0MSw2NzQxOTMxLDExODA5Mjk2LDE2NDU4MDQ3LDE1NjY2OTE2LDExMDQ2ODUwLDY5ODE0OSwyMjk5OTksOTQ1Nzc2LDEzNzc0ODQ0LDI1NDE4NjIsMTI4NTYwNDUsOTgxMDkxMSwxMTQ5NDM2Niw3ODQ0NTIwLDE1NTc2ODA2LDg1MzMzMDcsMTU3OTUwNDQsNDMzNzY2NSwxNjI5MTcyOSw1NTUzNzEyLDE1Njg0MTIwLDY2NjI0MTYsNzQxMzgwMiwxMjMwODkyMCwxMzgxNjAwOCw0MzAzNjk5LDkzNjY0MjUsMTAxNzY2ODAsMTMxOTU4NzUsNDI5NTM3MSw2NTQ2MjkxLDExNzEyNjc1LDE1NzA4OTI0LDE1MTk0NTYsMTU3NzI1MzAsNjU2ODQyOCw2NDk1Nzg0LDg1NjgyOTcsMTMwMDcxMjUsNzQ5MjM5NSwyNTE1MzU2LFxuMTI2MzI1ODMsMTQ3NDAyNTQsNzI2MjU4NCwxNTM1OTMwLDEzMTQ2Mjc4LDE2MzIxOTY2LDE4NTMyMTEsMjk0Mjc2LDEzMDUxMDI3LDEzMjIxNTY0LDEwNTE5ODAsNDA4MDMxMCw2NjUxNDM0LDE0MDg4OTQwLDQ2NzU2MDddLEM6ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEpe3JldHVybiAweDEwMDAwMDAwMCooYS1NYXRoLmZsb29yKGEpKXwwfWZ1bmN0aW9uIGIoYSl7cmV0dXJuIDB4MTAwMDAwMDAwMDAqKGEtTWF0aC5mbG9vcihhKSkmMjU1fWZvcih2YXIgYz0wLGQ9MixlLGY7ODA+YztkKyspe2Y9ITA7Zm9yKGU9MjtlKmU8PWQ7ZSsrKWlmKDA9PT1kJWUpe2Y9ITE7YnJlYWt9ZiYmKDg+YyYmKHRoaXMub1syKmNdPWEoTWF0aC5wb3coZCwuNSkpLHRoaXMub1syKmMrMV09YihNYXRoLnBvdyhkLC41KSk8PDI0fHRoaXMuaWFbY10pLHRoaXMuYlsyKmNdPWEoTWF0aC5wb3coZCwxLzMpKSx0aGlzLmJbMipjKzFdPWIoTWF0aC5wb3coZCwxLzMpKTw8MjR8dGhpcy5rYVtjXSxjKyspfX0sbDpmdW5jdGlvbihhKXt2YXIgYixcbmMsZD10aGlzLmcsZT10aGlzLmIsZj1kWzBdLGc9ZFsxXSxoPWRbMl0saz1kWzNdLG49ZFs0XSxsPWRbNV0sbT1kWzZdLHA9ZFs3XSx6PWRbOF0sQT1kWzldLEM9ZFsxMF0sQj1kWzExXSxEPWRbMTJdLFA9ZFsxM10sZWE9ZFsxNF0sUT1kWzE1XSx0O2lmKFwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe3Q9QXJyYXkoMTYwKTtmb3IodmFyIHI9MDszMj5yO3IrKyl0W3JdPWFbcl19ZWxzZSB0PWE7dmFyIHI9Zix1PWcsRz1oLEU9ayxIPW4sRj1sLFY9bSxJPXAsdz16LHY9QSxSPUMsSj1CLFM9RCxLPVAsVz1lYSxMPVE7Zm9yKGE9MDs4MD5hO2ErKyl7aWYoMTY+YSliPXRbMiphXSxjPXRbMiphKzFdO2Vsc2V7Yz10WzIqKGEtMTUpXTt2YXIgcT10WzIqKGEtMTUpKzFdO2I9KHE8PDMxfGM+Pj4xKV4ocTw8MjR8Yz4+PjgpXmM+Pj43O3ZhciB4PShjPDwzMXxxPj4+MSleKGM8PDI0fHE+Pj44KV4oYzw8MjV8cT4+PjcpO2M9dFsyKihhLTIpXTt2YXIgeT10WzIqKGEtMikrMV0sXG5xPSh5PDwxM3xjPj4+MTkpXihjPDwzfHk+Pj4yOSleYz4+PjYseT0oYzw8MTN8eT4+PjE5KV4oeTw8M3xjPj4+MjkpXihjPDwyNnx5Pj4+NiksWD10WzIqKGEtNyldLFk9dFsyKihhLTE2KV0sTT10WzIqKGEtMTYpKzFdO2M9eCt0WzIqKGEtNykrMV07Yj1iK1grKGM+Pj4wPHg+Pj4wPzE6MCk7Yys9eTtiKz1xKyhjPj4+MDx5Pj4+MD8xOjApO2MrPU07Yis9WSsoYz4+PjA8TT4+PjA/MTowKX10WzIqYV09Ynw9MDt0WzIqYSsxXT1jfD0wO3ZhciBYPXcmUl5+dyZTLGZhPXYmSl5+diZLLHk9ciZHXnImSF5HJkgsamE9dSZFXnUmRl5FJkYsWT0odTw8NHxyPj4+MjgpXihyPDwzMHx1Pj4+MileKHI8PDI1fHU+Pj43KSxNPShyPDw0fHU+Pj4yOCleKHU8PDMwfHI+Pj4yKV4odTw8MjV8cj4+PjcpLGthPWVbMiphXSxnYT1lWzIqYSsxXSxxPUwrKCh3PDwxOHx2Pj4+MTQpXih3PDwxNHx2Pj4+MTgpXih2PDwyM3x3Pj4+OSkpLHg9VysoKHY8PDE4fHc+Pj4xNCleKHY8PDE0fHc+Pj4xOCleKHc8PFxuMjN8dj4+PjkpKSsocT4+PjA8TD4+PjA/MTowKSxxPXErZmEseD14KyhYKyhxPj4+MDxmYT4+PjA/MTowKSkscT1xK2dhLHg9eCsoa2ErKHE+Pj4wPGdhPj4+MD8xOjApKSxxPXErY3wwLHg9eCsoYisocT4+PjA8Yz4+PjA/MTowKSk7Yz1NK2phO2I9WSt5KyhjPj4+MDxNPj4+MD8xOjApO1c9UztMPUs7Uz1SO0s9SjtSPXc7Sj12O3Y9SStxfDA7dz1WK3grKHY+Pj4wPEk+Pj4wPzE6MCl8MDtWPUg7ST1GO0g9RztGPUU7Rz1yO0U9dTt1PXErY3wwO3I9eCtiKyh1Pj4+MDxxPj4+MD8xOjApfDB9Zz1kWzFdPWcrdXwwO2RbMF09ZityKyhnPj4+MDx1Pj4+MD8xOjApfDA7az1kWzNdPWsrRXwwO2RbMl09aCtHKyhrPj4+MDxFPj4+MD8xOjApfDA7bD1kWzVdPWwrRnwwO2RbNF09bitIKyhsPj4+MDxGPj4+MD8xOjApfDA7cD1kWzddPXArSXwwO2RbNl09bStWKyhwPj4+MDxJPj4+MD8xOjApfDA7QT1kWzldPUErdnwwO2RbOF09eit3KyhBPj4+MDx2Pj4+MD8xOjApfDA7Qj1kWzExXT1CK0p8XG4wO2RbMTBdPUMrUisoQj4+PjA8Sj4+PjA/MTowKXwwO1A9ZFsxM109UCtLfDA7ZFsxMl09RCtTKyhQPj4+MDxLPj4+MD8xOjApfDA7UT1kWzE1XT1RK0x8MDtkWzE0XT1lYStXKyhRPj4+MDxMPj4+MD8xOjApfDB9fTtcbnNqY2wubW9kZS5jY209e25hbWU6XCJjY21cIixGOltdLGxpc3RlblByb2dyZXNzOmZ1bmN0aW9uKGEpe3NqY2wubW9kZS5jY20uRi5wdXNoKGEpfSx1bkxpc3RlblByb2dyZXNzOmZ1bmN0aW9uKGEpe2E9c2pjbC5tb2RlLmNjbS5GLmluZGV4T2YoYSk7LTE8YSYmc2pjbC5tb2RlLmNjbS5GLnNwbGljZShhLDEpfSxkYTpmdW5jdGlvbihhKXt2YXIgYj1zamNsLm1vZGUuY2NtLkYuc2xpY2UoKSxjO2ZvcihjPTA7YzxiLmxlbmd0aDtjKz0xKWJbY10oYSl9LGVuY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZixnPWIuc2xpY2UoMCksaD1zamNsLmJpdEFycmF5LGs9aC5iaXRMZW5ndGgoYykvOCxuPWguYml0TGVuZ3RoKGcpLzg7ZT1lfHw2NDtkPWR8fFtdO2lmKDc+ayl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImNjbTogaXYgbXVzdCBiZSBhdCBsZWFzdCA3IGJ5dGVzXCIpO2ZvcihmPTI7ND5mJiZuPj4+OCpmO2YrKyk7ZjwxNS1rJiYoZj0xNS1rKTtjPWguY2xhbXAoYyxcbjgqKDE1LWYpKTtiPXNqY2wubW9kZS5jY20uVShhLGIsYyxkLGUsZik7Zz1zamNsLm1vZGUuY2NtLlYoYSxnLGMsYixlLGYpO3JldHVybiBoLmNvbmNhdChnLmRhdGEsZy50YWcpfSxkZWNyeXB0OmZ1bmN0aW9uKGEsYixjLGQsZSl7ZT1lfHw2NDtkPWR8fFtdO3ZhciBmPXNqY2wuYml0QXJyYXksZz1mLmJpdExlbmd0aChjKS84LGg9Zi5iaXRMZW5ndGgoYiksaz1mLmNsYW1wKGIsaC1lKSxuPWYuYml0U2xpY2UoYixoLWUpLGg9KGgtZSkvODtpZig3PmcpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJjY206IGl2IG11c3QgYmUgYXQgbGVhc3QgNyBieXRlc1wiKTtmb3IoYj0yOzQ+YiYmaD4+PjgqYjtiKyspO2I8MTUtZyYmKGI9MTUtZyk7Yz1mLmNsYW1wKGMsOCooMTUtYikpO2s9c2pjbC5tb2RlLmNjbS5WKGEsayxjLG4sZSxiKTthPXNqY2wubW9kZS5jY20uVShhLGsuZGF0YSxjLGQsZSxiKTtpZighZi5lcXVhbChrLnRhZyxhKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uY29ycnVwdChcImNjbTogdGFnIGRvZXNuJ3QgbWF0Y2hcIik7XG5yZXR1cm4gay5kYXRhfSxtYTpmdW5jdGlvbihhLGIsYyxkLGUsZil7dmFyIGc9W10saD1zamNsLmJpdEFycmF5LGs9aC5QO2Q9W2gucGFydGlhbCg4LChiLmxlbmd0aD82NDowKXxkLTI8PDJ8Zi0xKV07ZD1oLmNvbmNhdChkLGMpO2RbM118PWU7ZD1hLmVuY3J5cHQoZCk7aWYoYi5sZW5ndGgpZm9yKGM9aC5iaXRMZW5ndGgoYikvOCw2NTI3OT49Yz9nPVtoLnBhcnRpYWwoMTYsYyldOjB4ZmZmZmZmZmY+PWMmJihnPWguY29uY2F0KFtoLnBhcnRpYWwoMTYsNjU1MzQpXSxbY10pKSxnPWguY29uY2F0KGcsYiksYj0wO2I8Zy5sZW5ndGg7Yis9NClkPWEuZW5jcnlwdChrKGQsZy5zbGljZShiLGIrNCkuY29uY2F0KFswLDAsMF0pKSk7cmV0dXJuIGR9LFU6ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe3ZhciBnPXNqY2wuYml0QXJyYXksaD1nLlA7ZS89ODtpZihlJTJ8fDQ+ZXx8MTY8ZSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImNjbTogaW52YWxpZCB0YWcgbGVuZ3RoXCIpO1xuaWYoMHhmZmZmZmZmZjxkLmxlbmd0aHx8MHhmZmZmZmZmZjxiLmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwiY2NtOiBjYW4ndCBkZWFsIHdpdGggNEdpQiBvciBtb3JlIGRhdGFcIik7Yz1zamNsLm1vZGUuY2NtLm1hKGEsZCxjLGUsZy5iaXRMZW5ndGgoYikvOCxmKTtmb3IoZD0wO2Q8Yi5sZW5ndGg7ZCs9NCljPWEuZW5jcnlwdChoKGMsYi5zbGljZShkLGQrNCkuY29uY2F0KFswLDAsMF0pKSk7cmV0dXJuIGcuY2xhbXAoYyw4KmUpfSxWOmZ1bmN0aW9uKGEsYixjLGQsZSxmKXt2YXIgZyxoPXNqY2wuYml0QXJyYXk7Zz1oLlA7dmFyIGs9Yi5sZW5ndGgsbj1oLmJpdExlbmd0aChiKSxsPWsvNTAsbT1sO2M9aC5jb25jYXQoW2gucGFydGlhbCg4LGYtMSldLGMpLmNvbmNhdChbMCwwLDBdKS5zbGljZSgwLDQpO2Q9aC5iaXRTbGljZShnKGQsYS5lbmNyeXB0KGMpKSwwLGUpO2lmKCFrKXJldHVybnt0YWc6ZCxkYXRhOltdfTtmb3IoZz0wO2c8aztnKz00KWc+bCYmKHNqY2wubW9kZS5jY20uZGEoZy9cbmspLGwrPW0pLGNbM10rKyxlPWEuZW5jcnlwdChjKSxiW2ddXj1lWzBdLGJbZysxXV49ZVsxXSxiW2crMl1ePWVbMl0sYltnKzNdXj1lWzNdO3JldHVybnt0YWc6ZCxkYXRhOmguY2xhbXAoYixuKX19fTtzamNsLm1pc2MuaG1hYz1mdW5jdGlvbihhLGIpe3RoaXMuVz1iPWJ8fHNqY2wuaGFzaC5zaGEyNTY7dmFyIGM9W1tdLFtdXSxkLGU9Yi5wcm90b3R5cGUuYmxvY2tTaXplLzMyO3RoaXMuQj1bbmV3IGIsbmV3IGJdO2EubGVuZ3RoPmUmJihhPWIuaGFzaChhKSk7Zm9yKGQ9MDtkPGU7ZCsrKWNbMF1bZF09YVtkXV45MDk1MjI0ODYsY1sxXVtkXT1hW2RdXjE1NDk1NTY4Mjg7dGhpcy5CWzBdLnVwZGF0ZShjWzBdKTt0aGlzLkJbMV0udXBkYXRlKGNbMV0pO3RoaXMuTz1uZXcgYih0aGlzLkJbMF0pfTtcbnNqY2wubWlzYy5obWFjLnByb3RvdHlwZS5lbmNyeXB0PXNqY2wubWlzYy5obWFjLnByb3RvdHlwZS5tYWM9ZnVuY3Rpb24oYSl7aWYodGhpcy5aKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiZW5jcnlwdCBvbiBhbHJlYWR5IHVwZGF0ZWQgaG1hYyBjYWxsZWQhXCIpO3RoaXMudXBkYXRlKGEpO3JldHVybiB0aGlzLmRpZ2VzdChhKX07c2pjbC5taXNjLmhtYWMucHJvdG90eXBlLnJlc2V0PWZ1bmN0aW9uKCl7dGhpcy5PPW5ldyB0aGlzLlcodGhpcy5CWzBdKTt0aGlzLlo9ITF9O3NqY2wubWlzYy5obWFjLnByb3RvdHlwZS51cGRhdGU9ZnVuY3Rpb24oYSl7dGhpcy5aPSEwO3RoaXMuTy51cGRhdGUoYSl9O3NqY2wubWlzYy5obWFjLnByb3RvdHlwZS5kaWdlc3Q9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLk8uZmluYWxpemUoKSxhPShuZXcgdGhpcy5XKHRoaXMuQlsxXSkpLnVwZGF0ZShhKS5maW5hbGl6ZSgpO3RoaXMucmVzZXQoKTtyZXR1cm4gYX07XG5zamNsLm1pc2MucGJrZGYyPWZ1bmN0aW9uKGEsYixjLGQsZSl7Yz1jfHwxRTQ7aWYoMD5kfHwwPmMpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJpbnZhbGlkIHBhcmFtcyB0byBwYmtkZjJcIik7XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYoYT1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGEpKTtcInN0cmluZ1wiPT09dHlwZW9mIGImJihiPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYikpO2U9ZXx8c2pjbC5taXNjLmhtYWM7YT1uZXcgZShhKTt2YXIgZixnLGgsayxuPVtdLGw9c2pjbC5iaXRBcnJheTtmb3Ioaz0xOzMyKm4ubGVuZ3RoPChkfHwxKTtrKyspe2U9Zj1hLmVuY3J5cHQobC5jb25jYXQoYixba10pKTtmb3IoZz0xO2c8YztnKyspZm9yKGY9YS5lbmNyeXB0KGYpLGg9MDtoPGYubGVuZ3RoO2grKyllW2hdXj1mW2hdO249bi5jb25jYXQoZSl9ZCYmKG49bC5jbGFtcChuLGQpKTtyZXR1cm4gbn07XG5zamNsLnBybmc9ZnVuY3Rpb24oYSl7dGhpcy5oPVtuZXcgc2pjbC5oYXNoLnNoYTI1Nl07dGhpcy5zPVswXTt0aGlzLk49MDt0aGlzLkc9e307dGhpcy5NPTA7dGhpcy5UPXt9O3RoaXMuWD10aGlzLmk9dGhpcy51PXRoaXMuZmE9MDt0aGlzLmI9WzAsMCwwLDAsMCwwLDAsMF07dGhpcy5tPVswLDAsMCwwXTt0aGlzLks9dm9pZCAwO3RoaXMuTD1hO3RoaXMuRD0hMTt0aGlzLko9e3Byb2dyZXNzOnt9LHNlZWRlZDp7fX07dGhpcy5BPXRoaXMuZWE9MDt0aGlzLkg9MTt0aGlzLkk9Mjt0aGlzLmFhPTB4MTAwMDA7dGhpcy5SPVswLDQ4LDY0LDk2LDEyOCwxOTIsMHgxMDAsMzg0LDUxMiw3NjgsMTAyNF07dGhpcy5iYT0zRTQ7dGhpcy4kPTgwfTtcbnNqY2wucHJuZy5wcm90b3R5cGU9e3JhbmRvbVdvcmRzOmZ1bmN0aW9uKGEsYil7dmFyIGM9W10sZDtkPXRoaXMuaXNSZWFkeShiKTt2YXIgZTtpZihkPT09dGhpcy5BKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5ub3RSZWFkeShcImdlbmVyYXRvciBpc24ndCBzZWVkZWRcIik7aWYoZCZ0aGlzLkkpe2Q9IShkJnRoaXMuSCk7ZT1bXTt2YXIgZj0wLGc7dGhpcy5YPWVbMF09KG5ldyBEYXRlKS52YWx1ZU9mKCkrdGhpcy5iYTtmb3IoZz0wOzE2Pmc7ZysrKWUucHVzaCgweDEwMDAwMDAwMCpNYXRoLnJhbmRvbSgpfDApO2ZvcihnPTA7Zzx0aGlzLmgubGVuZ3RoJiYoZT1lLmNvbmNhdCh0aGlzLmhbZ10uZmluYWxpemUoKSksZis9dGhpcy5zW2ddLHRoaXMuc1tnXT0wLGR8fCEodGhpcy5OJjE8PGcpKTtnKyspO3RoaXMuTj49MTw8dGhpcy5oLmxlbmd0aCYmKHRoaXMuaC5wdXNoKG5ldyBzamNsLmhhc2guc2hhMjU2KSx0aGlzLnMucHVzaCgwKSk7dGhpcy5pLT1mO2Y+dGhpcy51JiYodGhpcy51PVxuZik7dGhpcy5OKys7dGhpcy5iPXNqY2wuaGFzaC5zaGEyNTYuaGFzaCh0aGlzLmIuY29uY2F0KGUpKTt0aGlzLks9bmV3IHNqY2wuY2lwaGVyLmFlcyh0aGlzLmIpO2ZvcihkPTA7ND5kJiYodGhpcy5tW2RdPXRoaXMubVtkXSsxfDAsIXRoaXMubVtkXSk7ZCsrKTt9Zm9yKGQ9MDtkPGE7ZCs9NCkwPT09KGQrMSkldGhpcy5hYSYmYmEodGhpcyksZT1OKHRoaXMpLGMucHVzaChlWzBdLGVbMV0sZVsyXSxlWzNdKTtiYSh0aGlzKTtyZXR1cm4gYy5zbGljZSgwLGEpfSxzZXREZWZhdWx0UGFyYW5vaWE6ZnVuY3Rpb24oYSxiKXtpZigwPT09YSYmXCJTZXR0aW5nIHBhcmFub2lhPTAgd2lsbCBydWluIHlvdXIgc2VjdXJpdHk7IHVzZSBpdCBvbmx5IGZvciB0ZXN0aW5nXCIhPT1iKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiU2V0dGluZyBwYXJhbm9pYT0wIHdpbGwgcnVpbiB5b3VyIHNlY3VyaXR5OyB1c2UgaXQgb25seSBmb3IgdGVzdGluZ1wiKTt0aGlzLkw9YX0sYWRkRW50cm9weTpmdW5jdGlvbihhLFxuYixjKXtjPWN8fFwidXNlclwiO3ZhciBkLGUsZj0obmV3IERhdGUpLnZhbHVlT2YoKSxnPXRoaXMuR1tjXSxoPXRoaXMuaXNSZWFkeSgpLGs9MDtkPXRoaXMuVFtjXTt2b2lkIDA9PT1kJiYoZD10aGlzLlRbY109dGhpcy5mYSsrKTt2b2lkIDA9PT1nJiYoZz10aGlzLkdbY109MCk7dGhpcy5HW2NdPSh0aGlzLkdbY10rMSkldGhpcy5oLmxlbmd0aDtzd2l0Y2godHlwZW9mIGEpe2Nhc2UgXCJudW1iZXJcIjp2b2lkIDA9PT1iJiYoYj0xKTt0aGlzLmhbZ10udXBkYXRlKFtkLHRoaXMuTSsrLDEsYixmLDEsYXwwXSk7YnJlYWs7Y2FzZSBcIm9iamVjdFwiOmM9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpO2lmKFwiW29iamVjdCBVaW50MzJBcnJheV1cIj09PWMpe2U9W107Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKyllLnB1c2goYVtjXSk7YT1lfWVsc2UgZm9yKFwiW29iamVjdCBBcnJheV1cIiE9PWMmJihrPTEpLGM9MDtjPGEubGVuZ3RoJiYhaztjKyspXCJudW1iZXJcIiE9PXR5cGVvZiBhW2NdJiZcbihrPTEpO2lmKCFrKXtpZih2b2lkIDA9PT1iKWZvcihjPWI9MDtjPGEubGVuZ3RoO2MrKylmb3IoZT1hW2NdOzA8ZTspYisrLGU9ZT4+PjE7dGhpcy5oW2ddLnVwZGF0ZShbZCx0aGlzLk0rKywyLGIsZixhLmxlbmd0aF0uY29uY2F0KGEpKX1icmVhaztjYXNlIFwic3RyaW5nXCI6dm9pZCAwPT09YiYmKGI9YS5sZW5ndGgpO3RoaXMuaFtnXS51cGRhdGUoW2QsdGhpcy5NKyssMyxiLGYsYS5sZW5ndGhdKTt0aGlzLmhbZ10udXBkYXRlKGEpO2JyZWFrO2RlZmF1bHQ6az0xfWlmKGspdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmJ1ZyhcInJhbmRvbTogYWRkRW50cm9weSBvbmx5IHN1cHBvcnRzIG51bWJlciwgYXJyYXkgb2YgbnVtYmVycyBvciBzdHJpbmdcIik7dGhpcy5zW2ddKz1iO3RoaXMuaSs9YjtoPT09dGhpcy5BJiYodGhpcy5pc1JlYWR5KCkhPT10aGlzLkEmJmNhKFwic2VlZGVkXCIsTWF0aC5tYXgodGhpcy51LHRoaXMuaSkpLGNhKFwicHJvZ3Jlc3NcIix0aGlzLmdldFByb2dyZXNzKCkpKX0sXG5pc1JlYWR5OmZ1bmN0aW9uKGEpe2E9dGhpcy5SW3ZvaWQgMCE9PWE/YTp0aGlzLkxdO3JldHVybiB0aGlzLnUmJnRoaXMudT49YT90aGlzLnNbMF0+dGhpcy4kJiYobmV3IERhdGUpLnZhbHVlT2YoKT50aGlzLlg/dGhpcy5JfHRoaXMuSDp0aGlzLkg6dGhpcy5pPj1hP3RoaXMuSXx0aGlzLkE6dGhpcy5BfSxnZXRQcm9ncmVzczpmdW5jdGlvbihhKXthPXRoaXMuUlthP2E6dGhpcy5MXTtyZXR1cm4gdGhpcy51Pj1hPzE6dGhpcy5pPmE/MTp0aGlzLmkvYX0sc3RhcnRDb2xsZWN0b3JzOmZ1bmN0aW9uKCl7aWYoIXRoaXMuRCl7dGhpcy5hPXtsb2FkVGltZUNvbGxlY3RvcjpPKHRoaXMsdGhpcy5sYSksbW91c2VDb2xsZWN0b3I6Tyh0aGlzLHRoaXMubmEpLGtleWJvYXJkQ29sbGVjdG9yOk8odGhpcyx0aGlzLmphKSxhY2NlbGVyb21ldGVyQ29sbGVjdG9yOk8odGhpcyx0aGlzLmNhKSx0b3VjaENvbGxlY3RvcjpPKHRoaXMsdGhpcy5wYSl9O2lmKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLFxudGhpcy5hLmxvYWRUaW1lQ29sbGVjdG9yLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMuYS5tb3VzZUNvbGxlY3RvciwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLHRoaXMuYS5rZXlib2FyZENvbGxlY3RvciwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkZXZpY2Vtb3Rpb25cIix0aGlzLmEuYWNjZWxlcm9tZXRlckNvbGxlY3RvciwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIix0aGlzLmEudG91Y2hDb2xsZWN0b3IsITEpO2Vsc2UgaWYoZG9jdW1lbnQuYXR0YWNoRXZlbnQpZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIix0aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IpLGRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25tb3VzZW1vdmVcIix0aGlzLmEubW91c2VDb2xsZWN0b3IpLGRvY3VtZW50LmF0dGFjaEV2ZW50KFwia2V5cHJlc3NcIix0aGlzLmEua2V5Ym9hcmRDb2xsZWN0b3IpO2Vsc2UgdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmJ1ZyhcImNhbid0IGF0dGFjaCBldmVudFwiKTtcbnRoaXMuRD0hMH19LHN0b3BDb2xsZWN0b3JzOmZ1bmN0aW9uKCl7dGhpcy5EJiYod2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXI/KHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibG9hZFwiLHRoaXMuYS5sb2FkVGltZUNvbGxlY3RvciwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLmEubW91c2VDb2xsZWN0b3IsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIix0aGlzLmEua2V5Ym9hcmRDb2xsZWN0b3IsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwiZGV2aWNlbW90aW9uXCIsdGhpcy5hLmFjY2VsZXJvbWV0ZXJDb2xsZWN0b3IsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsdGhpcy5hLnRvdWNoQ29sbGVjdG9yLCExKSk6ZG9jdW1lbnQuZGV0YWNoRXZlbnQmJihkb2N1bWVudC5kZXRhY2hFdmVudChcIm9ubG9hZFwiLHRoaXMuYS5sb2FkVGltZUNvbGxlY3RvciksZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJvbm1vdXNlbW92ZVwiLFxudGhpcy5hLm1vdXNlQ29sbGVjdG9yKSxkb2N1bWVudC5kZXRhY2hFdmVudChcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yKSksdGhpcy5EPSExKX0sYWRkRXZlbnRMaXN0ZW5lcjpmdW5jdGlvbihhLGIpe3RoaXMuSlthXVt0aGlzLmVhKytdPWJ9LHJlbW92ZUV2ZW50TGlzdGVuZXI6ZnVuY3Rpb24oYSxiKXt2YXIgYyxkLGU9dGhpcy5KW2FdLGY9W107Zm9yKGQgaW4gZSllLmhhc093blByb3BlcnR5KGQpJiZlW2RdPT09YiYmZi5wdXNoKGQpO2ZvcihjPTA7YzxmLmxlbmd0aDtjKyspZD1mW2NdLGRlbGV0ZSBlW2RdfSxqYTpmdW5jdGlvbigpe1QodGhpcywxKX0sbmE6ZnVuY3Rpb24oYSl7dmFyIGIsYzt0cnl7Yj1hLnh8fGEuY2xpZW50WHx8YS5vZmZzZXRYfHwwLGM9YS55fHxhLmNsaWVudFl8fGEub2Zmc2V0WXx8MH1jYXRjaChkKXtjPWI9MH0wIT1iJiYwIT1jJiZ0aGlzLmFkZEVudHJvcHkoW2IsY10sMixcIm1vdXNlXCIpO1QodGhpcywwKX0scGE6ZnVuY3Rpb24oYSl7YT1cbmEudG91Y2hlc1swXXx8YS5jaGFuZ2VkVG91Y2hlc1swXTt0aGlzLmFkZEVudHJvcHkoW2EucGFnZVh8fGEuY2xpZW50WCxhLnBhZ2VZfHxhLmNsaWVudFldLDEsXCJ0b3VjaFwiKTtUKHRoaXMsMCl9LGxhOmZ1bmN0aW9uKCl7VCh0aGlzLDIpfSxjYTpmdW5jdGlvbihhKXthPWEuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS54fHxhLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueXx8YS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lno7aWYod2luZG93Lm9yaWVudGF0aW9uKXt2YXIgYj13aW5kb3cub3JpZW50YXRpb247XCJudW1iZXJcIj09PXR5cGVvZiBiJiZ0aGlzLmFkZEVudHJvcHkoYiwxLFwiYWNjZWxlcm9tZXRlclwiKX1hJiZ0aGlzLmFkZEVudHJvcHkoYSwyLFwiYWNjZWxlcm9tZXRlclwiKTtUKHRoaXMsMCl9fTtcbmZ1bmN0aW9uIGNhKGEsYil7dmFyIGMsZD1zamNsLnJhbmRvbS5KW2FdLGU9W107Zm9yKGMgaW4gZClkLmhhc093blByb3BlcnR5KGMpJiZlLnB1c2goZFtjXSk7Zm9yKGM9MDtjPGUubGVuZ3RoO2MrKyllW2NdKGIpfWZ1bmN0aW9uIFQoYSxiKXtcInVuZGVmaW5lZFwiIT09dHlwZW9mIHdpbmRvdyYmd2luZG93LnBlcmZvcm1hbmNlJiZcImZ1bmN0aW9uXCI9PT10eXBlb2Ygd2luZG93LnBlcmZvcm1hbmNlLm5vdz9hLmFkZEVudHJvcHkod2luZG93LnBlcmZvcm1hbmNlLm5vdygpLGIsXCJsb2FkdGltZVwiKTphLmFkZEVudHJvcHkoKG5ldyBEYXRlKS52YWx1ZU9mKCksYixcImxvYWR0aW1lXCIpfWZ1bmN0aW9uIGJhKGEpe2EuYj1OKGEpLmNvbmNhdChOKGEpKTthLks9bmV3IHNqY2wuY2lwaGVyLmFlcyhhLmIpfWZ1bmN0aW9uIE4oYSl7Zm9yKHZhciBiPTA7ND5iJiYoYS5tW2JdPWEubVtiXSsxfDAsIWEubVtiXSk7YisrKTtyZXR1cm4gYS5LLmVuY3J5cHQoYS5tKX1cbmZ1bmN0aW9uIE8oYSxiKXtyZXR1cm4gZnVuY3Rpb24oKXtiLmFwcGx5KGEsYXJndW1lbnRzKX19c2pjbC5yYW5kb209bmV3IHNqY2wucHJuZyg2KTtcbmE6dHJ5e3ZhciBVLGRhLFosaGE7aWYoaGE9XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzKXt2YXIgaWE7dHJ5e2lhPXJlcXVpcmUoXCJjcnlwdG9cIil9Y2F0Y2goYSl7aWE9bnVsbH1oYT1kYT1pYX1pZihoYSYmZGEucmFuZG9tQnl0ZXMpVT1kYS5yYW5kb21CeXRlcygxMjgpLFU9bmV3IFVpbnQzMkFycmF5KChuZXcgVWludDhBcnJheShVKSkuYnVmZmVyKSxzamNsLnJhbmRvbS5hZGRFbnRyb3B5KFUsMTAyNCxcImNyeXB0b1sncmFuZG9tQnl0ZXMnXVwiKTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPT10eXBlb2Ygd2luZG93JiZcInVuZGVmaW5lZFwiIT09dHlwZW9mIFVpbnQzMkFycmF5KXtaPW5ldyBVaW50MzJBcnJheSgzMik7aWYod2luZG93LmNyeXB0byYmd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMpd2luZG93LmNyeXB0by5nZXRSYW5kb21WYWx1ZXMoWik7ZWxzZSBpZih3aW5kb3cubXNDcnlwdG8mJndpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMpd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyhaKTtcbmVsc2UgYnJlYWsgYTtzamNsLnJhbmRvbS5hZGRFbnRyb3B5KFosMTAyNCxcImNyeXB0b1snZ2V0UmFuZG9tVmFsdWVzJ11cIil9fWNhdGNoKGEpe1widW5kZWZpbmVkXCIhPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cuY29uc29sZSYmKGNvbnNvbGUubG9nKFwiVGhlcmUgd2FzIGFuIGVycm9yIGNvbGxlY3RpbmcgZW50cm9weSBmcm9tIHRoZSBicm93c2VyOlwiKSxjb25zb2xlLmxvZyhhKSl9XG5zamNsLmpzb249e2RlZmF1bHRzOnt2OjEsaXRlcjoxRTQsa3M6MTI4LHRzOjY0LG1vZGU6XCJjY21cIixhZGF0YTpcIlwiLGNpcGhlcjpcImFlc1wifSxoYTpmdW5jdGlvbihhLGIsYyxkKXtjPWN8fHt9O2Q9ZHx8e307dmFyIGU9c2pjbC5qc29uLGY9ZS5qKHtpdjpzamNsLnJhbmRvbS5yYW5kb21Xb3Jkcyg0LDApfSxlLmRlZmF1bHRzKSxnO2UuaihmLGMpO2M9Zi5hZGF0YTtcInN0cmluZ1wiPT09dHlwZW9mIGYuc2FsdCYmKGYuc2FsdD1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoZi5zYWx0KSk7XCJzdHJpbmdcIj09PXR5cGVvZiBmLml2JiYoZi5pdj1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoZi5pdikpO2lmKCFzamNsLm1vZGVbZi5tb2RlXXx8IXNqY2wuY2lwaGVyW2YuY2lwaGVyXXx8XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYxMDA+PWYuaXRlcnx8NjQhPT1mLnRzJiY5NiE9PWYudHMmJjEyOCE9PWYudHN8fDEyOCE9PWYua3MmJjE5MiE9PWYua3MmJjB4MTAwIT09Zi5rc3x8Mj5mLml2Lmxlbmd0aHx8XG40PGYuaXYubGVuZ3RoKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBlbmNyeXB0OiBpbnZhbGlkIHBhcmFtZXRlcnNcIik7XCJzdHJpbmdcIj09PXR5cGVvZiBhPyhnPXNqY2wubWlzYy5jYWNoZWRQYmtkZjIoYSxmKSxhPWcua2V5LnNsaWNlKDAsZi5rcy8zMiksZi5zYWx0PWcuc2FsdCk6c2pjbC5lY2MmJmEgaW5zdGFuY2VvZiBzamNsLmVjYy5lbEdhbWFsLnB1YmxpY0tleSYmKGc9YS5rZW0oKSxmLmtlbXRhZz1nLnRhZyxhPWcua2V5LnNsaWNlKDAsZi5rcy8zMikpO1wic3RyaW5nXCI9PT10eXBlb2YgYiYmKGI9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhiKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBjJiYoZi5hZGF0YT1jPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYykpO2c9bmV3IHNqY2wuY2lwaGVyW2YuY2lwaGVyXShhKTtlLmooZCxmKTtkLmtleT1hO2YuY3Q9XCJjY21cIj09PWYubW9kZSYmc2pjbC5hcnJheUJ1ZmZlciYmc2pjbC5hcnJheUJ1ZmZlci5jY20mJlxuYiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyP3NqY2wuYXJyYXlCdWZmZXIuY2NtLmVuY3J5cHQoZyxiLGYuaXYsYyxmLnRzKTpzamNsLm1vZGVbZi5tb2RlXS5lbmNyeXB0KGcsYixmLml2LGMsZi50cyk7cmV0dXJuIGZ9LGVuY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9c2pjbC5qc29uLGY9ZS5oYS5hcHBseShlLGFyZ3VtZW50cyk7cmV0dXJuIGUuZW5jb2RlKGYpfSxnYTpmdW5jdGlvbihhLGIsYyxkKXtjPWN8fHt9O2Q9ZHx8e307dmFyIGU9c2pjbC5qc29uO2I9ZS5qKGUuaihlLmooe30sZS5kZWZhdWx0cyksYiksYywhMCk7dmFyIGYsZztmPWIuYWRhdGE7XCJzdHJpbmdcIj09PXR5cGVvZiBiLnNhbHQmJihiLnNhbHQ9c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGIuc2FsdCkpO1wic3RyaW5nXCI9PT10eXBlb2YgYi5pdiYmKGIuaXY9c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGIuaXYpKTtpZighc2pjbC5tb2RlW2IubW9kZV18fCFzamNsLmNpcGhlcltiLmNpcGhlcl18fFwic3RyaW5nXCI9PT1cbnR5cGVvZiBhJiYxMDA+PWIuaXRlcnx8NjQhPT1iLnRzJiY5NiE9PWIudHMmJjEyOCE9PWIudHN8fDEyOCE9PWIua3MmJjE5MiE9PWIua3MmJjB4MTAwIT09Yi5rc3x8IWIuaXZ8fDI+Yi5pdi5sZW5ndGh8fDQ8Yi5pdi5sZW5ndGgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGRlY3J5cHQ6IGludmFsaWQgcGFyYW1ldGVyc1wiKTtcInN0cmluZ1wiPT09dHlwZW9mIGE/KGc9c2pjbC5taXNjLmNhY2hlZFBia2RmMihhLGIpLGE9Zy5rZXkuc2xpY2UoMCxiLmtzLzMyKSxiLnNhbHQ9Zy5zYWx0KTpzamNsLmVjYyYmYSBpbnN0YW5jZW9mIHNqY2wuZWNjLmVsR2FtYWwuc2VjcmV0S2V5JiYoYT1hLnVua2VtKHNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhiLmtlbXRhZykpLnNsaWNlKDAsYi5rcy8zMikpO1wic3RyaW5nXCI9PT10eXBlb2YgZiYmKGY9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhmKSk7Zz1uZXcgc2pjbC5jaXBoZXJbYi5jaXBoZXJdKGEpO2Y9XCJjY21cIj09PVxuYi5tb2RlJiZzamNsLmFycmF5QnVmZmVyJiZzamNsLmFycmF5QnVmZmVyLmNjbSYmYi5jdCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyP3NqY2wuYXJyYXlCdWZmZXIuY2NtLmRlY3J5cHQoZyxiLmN0LGIuaXYsYi50YWcsZixiLnRzKTpzamNsLm1vZGVbYi5tb2RlXS5kZWNyeXB0KGcsYi5jdCxiLml2LGYsYi50cyk7ZS5qKGQsYik7ZC5rZXk9YTtyZXR1cm4gMT09PWMucmF3P2Y6c2pjbC5jb2RlYy51dGY4U3RyaW5nLmZyb21CaXRzKGYpfSxkZWNyeXB0OmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPXNqY2wuanNvbjtyZXR1cm4gZS5nYShhLGUuZGVjb2RlKGIpLGMsZCl9LGVuY29kZTpmdW5jdGlvbihhKXt2YXIgYixjPVwie1wiLGQ9XCJcIjtmb3IoYiBpbiBhKWlmKGEuaGFzT3duUHJvcGVydHkoYikpe2lmKCFiLm1hdGNoKC9eW2EtejAtOV0rJC9pKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZW5jb2RlOiBpbnZhbGlkIHByb3BlcnR5IG5hbWVcIik7Yys9ZCsnXCInK1xuYisnXCI6JztkPVwiLFwiO3N3aXRjaCh0eXBlb2YgYVtiXSl7Y2FzZSBcIm51bWJlclwiOmNhc2UgXCJib29sZWFuXCI6Yys9YVtiXTticmVhaztjYXNlIFwic3RyaW5nXCI6Yys9J1wiJytlc2NhcGUoYVtiXSkrJ1wiJzticmVhaztjYXNlIFwib2JqZWN0XCI6Yys9J1wiJytzamNsLmNvZGVjLmJhc2U2NC5mcm9tQml0cyhhW2JdLDApKydcIic7YnJlYWs7ZGVmYXVsdDp0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwianNvbiBlbmNvZGU6IHVuc3VwcG9ydGVkIHR5cGVcIik7fX1yZXR1cm4gYytcIn1cIn0sZGVjb2RlOmZ1bmN0aW9uKGEpe2E9YS5yZXBsYWNlKC9cXHMvZyxcIlwiKTtpZighYS5tYXRjaCgvXlxcey4qXFx9JC8pKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBkZWNvZGU6IHRoaXMgaXNuJ3QganNvbiFcIik7YT1hLnJlcGxhY2UoL15cXHt8XFx9JC9nLFwiXCIpLnNwbGl0KC8sLyk7dmFyIGI9e30sYyxkO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspe2lmKCEoZD1hW2NdLm1hdGNoKC9eXFxzKig/OihbXCInXT8pKFthLXpdW2EtejAtOV0qKVxcMSlcXHMqOlxccyooPzooLT9cXGQrKXxcIihbYS16MC05K1xcLyUqXy5APVxcLV0qKVwifCh0cnVlfGZhbHNlKSkkL2kpKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZGVjb2RlOiB0aGlzIGlzbid0IGpzb24hXCIpO1xubnVsbCE9ZFszXT9iW2RbMl1dPXBhcnNlSW50KGRbM10sMTApOm51bGwhPWRbNF0/YltkWzJdXT1kWzJdLm1hdGNoKC9eKGN0fGFkYXRhfHNhbHR8aXYpJC8pP3NqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhkWzRdKTp1bmVzY2FwZShkWzRdKTpudWxsIT1kWzVdJiYoYltkWzJdXT1cInRydWVcIj09PWRbNV0pfXJldHVybiBifSxqOmZ1bmN0aW9uKGEsYixjKXt2b2lkIDA9PT1hJiYoYT17fSk7aWYodm9pZCAwPT09YilyZXR1cm4gYTtmb3IodmFyIGQgaW4gYilpZihiLmhhc093blByb3BlcnR5KGQpKXtpZihjJiZ2b2lkIDAhPT1hW2RdJiZhW2RdIT09YltkXSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcInJlcXVpcmVkIHBhcmFtZXRlciBvdmVycmlkZGVuXCIpO2FbZF09YltkXX1yZXR1cm4gYX0scmE6ZnVuY3Rpb24oYSxiKXt2YXIgYz17fSxkO2ZvcihkIGluIGEpYS5oYXNPd25Qcm9wZXJ0eShkKSYmYVtkXSE9PWJbZF0mJihjW2RdPWFbZF0pO3JldHVybiBjfSxxYTpmdW5jdGlvbihhLFxuYil7dmFyIGM9e30sZDtmb3IoZD0wO2Q8Yi5sZW5ndGg7ZCsrKXZvaWQgMCE9PWFbYltkXV0mJihjW2JbZF1dPWFbYltkXV0pO3JldHVybiBjfX07c2pjbC5lbmNyeXB0PXNqY2wuanNvbi5lbmNyeXB0O3NqY2wuZGVjcnlwdD1zamNsLmpzb24uZGVjcnlwdDtzamNsLm1pc2Mub2E9e307c2pjbC5taXNjLmNhY2hlZFBia2RmMj1mdW5jdGlvbihhLGIpe3ZhciBjPXNqY2wubWlzYy5vYSxkO2I9Ynx8e307ZD1iLml0ZXJ8fDFFMztjPWNbYV09Y1thXXx8e307ZD1jW2RdPWNbZF18fHtmaXJzdFNhbHQ6Yi5zYWx0JiZiLnNhbHQubGVuZ3RoP2Iuc2FsdC5zbGljZSgwKTpzamNsLnJhbmRvbS5yYW5kb21Xb3JkcygyLDApfTtjPXZvaWQgMD09PWIuc2FsdD9kLmZpcnN0U2FsdDpiLnNhbHQ7ZFtjXT1kW2NdfHxzamNsLm1pc2MucGJrZGYyKGEsYyxiLml0ZXIpO3JldHVybntrZXk6ZFtjXS5zbGljZSgwKSxzYWx0OmMuc2xpY2UoMCl9fTtcblwidW5kZWZpbmVkXCIhPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cyYmKG1vZHVsZS5leHBvcnRzPXNqY2wpO1wiZnVuY3Rpb25cIj09PXR5cGVvZiBkZWZpbmUmJmRlZmluZShbXSxmdW5jdGlvbigpe3JldHVybiBzamNsfSk7XG4iLCAiY29uc3QgZGVmYXVsdEVycm9yQ29uZmlnID0ge1xyXG4gICAgd2l0aFN0YWNrVHJhY2U6IGZhbHNlLFxyXG59O1xyXG4vLyBDdXN0b20gZXJyb3Igb2JqZWN0XHJcbi8vIENvbnRleHQgLyBkaXNjdXNzaW9uOiBodHRwczovL2dpdGh1Yi5jb20vc3VwZXJtYWNyby9uZXZlcnRocm93L3B1bGwvMjE1XHJcbmNvbnN0IGNyZWF0ZU5ldmVyVGhyb3dFcnJvciA9IChtZXNzYWdlLCByZXN1bHQsIGNvbmZpZyA9IGRlZmF1bHRFcnJvckNvbmZpZykgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHJlc3VsdC5pc09rKClcclxuICAgICAgICA/IHsgdHlwZTogJ09rJywgdmFsdWU6IHJlc3VsdC52YWx1ZSB9XHJcbiAgICAgICAgOiB7IHR5cGU6ICdFcnInLCB2YWx1ZTogcmVzdWx0LmVycm9yIH07XHJcbiAgICBjb25zdCBtYXliZVN0YWNrID0gY29uZmlnLndpdGhTdGFja1RyYWNlID8gbmV3IEVycm9yKCkuc3RhY2sgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBzdGFjazogbWF5YmVTdGFjayxcclxuICAgIH07XHJcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG5cclxuZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG50eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcblxuY2xhc3MgUmVzdWx0QXN5bmMge1xyXG4gICAgY29uc3RydWN0b3IocmVzKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHJlcztcclxuICAgIH1cclxuICAgIHN0YXRpYyBmcm9tU2FmZVByb21pc2UocHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb21pc2UgPSBwcm9taXNlLnRoZW4oKHZhbHVlKSA9PiBuZXcgT2sodmFsdWUpKTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG5ld1Byb21pc2UpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb21Qcm9taXNlKHByb21pc2UsIGVycm9yRm4pIHtcclxuICAgICAgICBjb25zdCBuZXdQcm9taXNlID0gcHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IG5ldyBPayh2YWx1ZSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gbmV3IEVycihlcnJvckZuKGUpKSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuZXdQcm9taXNlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBzdGF0aWMgZnJvbVRocm93YWJsZShmbiwgZXJyb3JGbikge1xyXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKCgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZm4oLi4uYXJncykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoZXJyb3JGbiA/IGVycm9yRm4oZXJyb3IpIDogZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSkoKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21iaW5lKGFzeW5jUmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0QXN5bmNMaXN0KGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29tYmluZVdpdGhBbGxFcnJvcnMoYXN5bmNSZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzKGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZihyZXMudmFsdWUpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgYW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3UmVzID0geWllbGQgZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3UmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKG5ld1Jlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRlZSBkb2VzIG5vdCBjYXJlIGFib3V0IHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgbWFwRXJyKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNPaygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoeWllbGQgZihyZXMuZXJyb3IpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWUgaW5zdGFuY2VvZiBSZXN1bHRBc3luYyA/IG5ld1ZhbHVlLl9wcm9taXNlIDogbmV3VmFsdWU7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIG9yRWxzZShmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBtYXRjaChvaywgX2Vycikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gcmVzLm1hdGNoKG9rLCBfZXJyKSk7XHJcbiAgICB9XHJcbiAgICB1bndyYXBPcih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiByZXMudW53cmFwT3IodCkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCB3aWxsIGJlIHJlbW92ZWQgaW4gOS4wLjAuXHJcbiAgICAgKlxyXG4gICAgICogWW91IGNhbiB1c2UgYHNhZmVUcnlgIHdpdGhvdXQgdGhpcyBtZXRob2QuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYGBgdHlwZXNjcmlwdFxyXG4gICAgICogc2FmZVRyeShhc3luYyBmdW5jdGlvbiogKCkge1xyXG4gICAgICogICBjb25zdCBva1ZhbHVlID0geWllbGQqIHlvdXJSZXN1bHRcclxuICAgICAqIH0pXHJcbiAgICAgKiBgYGBcclxuICAgICAqIEVtdWxhdGVzIFJ1c3QncyBgP2Agb3BlcmF0b3IgaW4gYHNhZmVUcnlgJ3MgYm9keS4gU2VlIGFsc28gYHNhZmVUcnlgLlxyXG4gICAgICovXHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24qIHNhZmVVbndyYXBfMSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9fYXdhaXQoeWllbGQgX19hd2FpdCh5aWVsZCogX19hc3luY0RlbGVnYXRvcihfX2FzeW5jVmFsdWVzKHlpZWxkIF9fYXdhaXQodGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHJlcy5zYWZlVW53cmFwKCkpKSkpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlcyBSZXN1bHRBc3luYyBpbXBsZW1lbnQgUHJvbWlzZUxpa2U8UmVzdWx0PlxyXG4gICAgdGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpIHtcclxuICAgICAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBfYSgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgX19hd2FpdCh0aGlzLl9wcm9taXNlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICAgICAgICAgIHlpZWxkIHlpZWxkIF9fYXdhaXQoZXJyQXN5bmMocmVzdWx0LmVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCBfX2F3YWl0KHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuY29uc3Qgb2tBc3luYyA9ICh2YWx1ZSkgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgT2sodmFsdWUpKSk7XHJcbmNvbnN0IGVyckFzeW5jID0gKGVycikgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgRXJyKGVycikpKTtcclxuY29uc3QgZnJvbVByb21pc2UgPSBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZTtcclxuY29uc3QgZnJvbVNhZmVQcm9taXNlID0gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlO1xyXG5jb25zdCBmcm9tQXN5bmNUaHJvd2FibGUgPSBSZXN1bHRBc3luYy5mcm9tVGhyb3dhYmxlO1xuXG4vKipcclxuICogU2hvcnQgY2lyY3VpdHMgb24gdGhlIEZJUlNUIEVyciB2YWx1ZSB0aGF0IHdlIGZpbmRcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRMaXN0ID0gKHJlc3VsdExpc3QpID0+IHtcclxuICAgIGxldCBhY2MgPSBvayhbXSk7XHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgIGFjYyA9IGVycihyZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFjYy5tYXAoKGxpc3QpID0+IGxpc3QucHVzaChyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG59O1xyXG4vKiBUaGlzIGlzIHRoZSB0eXBlc2FmZSB2ZXJzaW9uIG9mIFByb21pc2UuYWxsXHJcbiAqXHJcbiAqIFRha2VzIGEgbGlzdCBvZiBSZXN1bHRBc3luYzxULCBFPiBhbmQgc3VjY2VzcyBpZiBhbGwgaW5uZXIgcmVzdWx0cyBhcmUgT2sgdmFsdWVzXHJcbiAqIG9yIGZhaWxzIGlmIG9uZSAob3IgbW9yZSkgb2YgdGhlIGlubmVyIHJlc3VsdHMgYXJlIEVyciB2YWx1ZXNcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3QgPSAoYXN5bmNSZXN1bHRMaXN0KSA9PiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoUHJvbWlzZS5hbGwoYXN5bmNSZXN1bHRMaXN0KSkuYW5kVGhlbihjb21iaW5lUmVzdWx0TGlzdCk7XHJcbi8qKlxyXG4gKiBHaXZlIGEgbGlzdCBvZiBhbGwgdGhlIGVycm9ycyB3ZSBmaW5kXHJcbiAqL1xyXG5jb25zdCBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMgPSAocmVzdWx0TGlzdCkgPT4ge1xyXG4gICAgbGV0IGFjYyA9IG9rKFtdKTtcclxuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdExpc3QpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgYWNjLmVycm9yLnB1c2gocmVzdWx0LmVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzT2soKSkge1xyXG4gICAgICAgICAgICBhY2MgPSBlcnIoW3Jlc3VsdC5lcnJvcl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXN1bHQuaXNPaygpICYmIGFjYy5pc09rKCkpIHtcclxuICAgICAgICAgICAgYWNjLnZhbHVlLnB1c2gocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZG8gbm90aGluZyB3aGVuIHJlc3VsdC5pc09rKCkgJiYgYWNjLmlzRXJyKClcclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbn07XHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzID0gKGFzeW5jUmVzdWx0TGlzdCkgPT4gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlKFByb21pc2UuYWxsKGFzeW5jUmVzdWx0TGlzdCkpLmFuZFRoZW4oY29tYmluZVJlc3VsdExpc3RXaXRoQWxsRXJyb3JzKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcclxudmFyIFJlc3VsdDtcclxuKGZ1bmN0aW9uIChSZXN1bHQpIHtcclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgYSBmdW5jdGlvbiB3aXRoIGEgdHJ5IGNhdGNoLCBjcmVhdGluZyBhIG5ldyBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lXHJcbiAgICAgKiBhcmd1bWVudHMgYnV0IHJldHVybmluZyBgT2tgIGlmIHN1Y2Nlc3NmdWwsIGBFcnJgIGlmIHRoZSBmdW5jdGlvbiB0aHJvd3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24gdG8gd3JhcCB3aXRoIG9rIG9uIHN1Y2Nlc3Mgb3IgZXJyIG9uIGZhaWx1cmVcclxuICAgICAqIEBwYXJhbSBlcnJvckZuIHdoZW4gYW4gZXJyb3IgaXMgdGhyb3duLCB0aGlzIHdpbGwgd3JhcCB0aGUgZXJyb3IgcmVzdWx0IGlmIHByb3ZpZGVkXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBmdW5jdGlvbiBmcm9tVGhyb3dhYmxlKGZuLCBlcnJvckZuKSB7XHJcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbiguLi5hcmdzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvayhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyKGVycm9yRm4gPyBlcnJvckZuKGUpIDogZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmZyb21UaHJvd2FibGUgPSBmcm9tVGhyb3dhYmxlO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZShyZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRMaXN0KHJlc3VsdExpc3QpO1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmNvbWJpbmUgPSBjb21iaW5lO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZVdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuY29tYmluZVdpdGhBbGxFcnJvcnMgPSBjb21iaW5lV2l0aEFsbEVycm9ycztcclxufSkoUmVzdWx0IHx8IChSZXN1bHQgPSB7fSkpO1xyXG5jb25zdCBvayA9ICh2YWx1ZSkgPT4gbmV3IE9rKHZhbHVlKTtcclxuZnVuY3Rpb24gZXJyKGVycikge1xyXG4gICAgcmV0dXJuIG5ldyBFcnIoZXJyKTtcclxufVxyXG5mdW5jdGlvbiBzYWZlVHJ5KGJvZHkpIHtcclxuICAgIGNvbnN0IG4gPSBib2R5KCkubmV4dCgpO1xyXG4gICAgaWYgKG4gaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuLnRoZW4oKHIpID0+IHIudmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuLnZhbHVlO1xyXG59XHJcbmNsYXNzIE9rIHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaXNPaygpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlzRXJyKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc09rKCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBvayhmKHRoaXMudmFsdWUpKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcEVycihfZikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaGVuKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKS5tYXAoKF92YWx1ZSkgPT4gdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGYodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRlZSBkb2Vzbid0IGNhcmUgYWJvdXQgdGhlIGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBvckVsc2UoX2YpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhc3luY0FuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFzeW5jQW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSkubWFwKCgpID0+IHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgYXN5bmNNYXAoZikge1xyXG4gICAgICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoZih0aGlzLnZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICB1bndyYXBPcihfdikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWF0Y2gob2ssIF9lcnIpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS15aWVsZCAqL1xyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKF8pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXBFcnIoY29uZmlnKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yKCdDYWxsZWQgYF91bnNhZmVVbndyYXBFcnJgIG9uIGFuIE9rJywgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcywgcmVxdWlyZS15aWVsZFxyXG4gICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEVyciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgIH1cclxuICAgIGlzT2soKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNFcnIoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzT2soKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBtYXBFcnIoZikge1xyXG4gICAgICAgIHJldHVybiBlcnIoZih0aGlzLmVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUaHJvdWdoKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgb3JFbHNlKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jQW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFzeW5jQW5kVGhyb3VnaChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jTWFwKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgdW53cmFwT3Iodikge1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG4gICAgbWF0Y2goX29rLCBlcnIpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2FmZVVud3JhcCgpIHtcclxuICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuZXJyb3I7XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB5aWVsZCBlcnIoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgdGhpcyBnZW5lcmF0b3Igb3V0IG9mIGBzYWZlVHJ5YCcpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKGNvbmZpZykge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZU5ldmVyVGhyb3dFcnJvcignQ2FsbGVkIGBfdW5zYWZlVW53cmFwYCBvbiBhbiBFcnInLCB0aGlzLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcEVycihfKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3I7XHJcbiAgICB9XHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgeWllbGQgc2VsZjtcclxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxufVxyXG5jb25zdCBmcm9tVGhyb3dhYmxlID0gUmVzdWx0LmZyb21UaHJvd2FibGU7XHJcbi8vI2VuZHJlZ2lvblxuXG5leHBvcnQgeyBFcnIsIE9rLCBSZXN1bHQsIFJlc3VsdEFzeW5jLCBlcnIsIGVyckFzeW5jLCBmcm9tQXN5bmNUaHJvd2FibGUsIGZyb21Qcm9taXNlLCBmcm9tU2FmZVByb21pc2UsIGZyb21UaHJvd2FibGUsIG9rLCBva0FzeW5jLCBzYWZlVHJ5IH07XG4iLCAidHlwZSBKc29uYWJsZSA9XG4gIHwgc3RyaW5nXG4gIHwgbnVtYmVyXG4gIHwgYm9vbGVhblxuICB8IG51bGxcbiAgfCB1bmRlZmluZWRcbiAgfCByZWFkb25seSBKc29uYWJsZVtdXG4gIHwgeyByZWFkb25seSBba2V5OiBzdHJpbmddOiBKc29uYWJsZSB9XG4gIHwgeyB0b0pTT04oKTogSnNvbmFibGUgfTtcblxuZXhwb3J0IGNsYXNzIEJhc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbnRleHQ/OiBKc29uYWJsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIG9wdGlvbnM6IHsgY2F1c2U/OiBFcnJvcjsgY29udGV4dD86IEpzb25hYmxlIH0gPSB7fSxcbiAgKSB7XG4gICAgY29uc3QgeyBjYXVzZSwgY29udGV4dCB9ID0gb3B0aW9ucztcblxuICAgIHN1cGVyKG1lc3NhZ2UsIHsgY2F1c2UgfSk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgfVxufVxuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIFdlYlNvY2tldEVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgV2ViU29ja2V0RXJyb3IgfSBmcm9tIFwifi9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBXZWJTb2NrZXRDb25uZWN0aW9uRXJyb3IgZXh0ZW5kcyBXZWJTb2NrZXRFcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2UgPSBcIkFuIGVycm9yIG9jY3VyZWQgd2hpbGUgdHJ5aW5nIHRvIGNvbm5lY3QgdG8gV2ViU29ja2V0XCI7XG59XG4iLCAiaW1wb3J0IHsgZXJyQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IENvbm5lY3Rpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Nvbm5lY3Rpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IFNlcnZlckVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivc2VydmVyLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlckNvbmZpZyB9IGZyb20gXCJ+L2ludGVyZmFjZS9zZXJ2ZXItY29uZmlnLnRzXCI7XG5cbi8qKlxuICogRW5zdXJlIGFuIGVycm9yIG1lc3NhZ2UgaXMgdHJhbnNmb3JtZWQgaW4gYW4gRXJyb3Igb2JqZWN0XG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5zdXJlRXJyb3IgPSAodmFsdWU6IHVua25vd24pOiBFcnJvciA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsdWU7XG5cbiAgbGV0IHN0cmluZ2lmaWVkID0gXCJbVW5hYmxlIHRvIHN0cmluZ2lmeSB0aGUgdGhyb3duIHZhbHVlXVwiO1xuICB0cnkge1xuICAgIHN0cmluZ2lmaWVkID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAvKiBlbXB0eSAqL1xuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihzdHJpbmdpZmllZCk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIEx1ZmkncyBjb25maWcgZnJvbSBpdHMgQVBJXG4gKlxuICogQHBhcmFtIGluc3RhbmNlVXJsXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTZXJ2ZXJDb25maWcgPSAoXG4gIGluc3RhbmNlVXJsOiBVUkwsXG4pOiBSZXN1bHRBc3luYzxTZXJ2ZXJDb25maWcsIEVycm9yPiA9PiB7XG4gIGNvbnN0IG9yaWdpbk1hdGNoZXMgPSBpbnN0YW5jZVVybC5ocmVmLm1hdGNoKFxuICAgIC8oLio/KVxcLz8oPzpcXC9bZHJdezF9XFwvfGxvZ2luXFwvP3xmaWxlc1xcLz8pLyxcbiAgKTtcblxuICBjb25zdCB1cmxPcmlnaW4gPSBvcmlnaW5NYXRjaGVzICYmIG9yaWdpbk1hdGNoZXNbMV1cbiAgICA/IG9yaWdpbk1hdGNoZXNbMV1cbiAgICA6IGluc3RhbmNlVXJsLm9yaWdpbjtcblxuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgZmV0Y2godXJsT3JpZ2luICsgXCIvYWJvdXQvY29uZmlnXCIpLFxuICAgIChlcnJvcikgPT5cbiAgICAgIG5ldyBDb25uZWN0aW9uRXJyb3IodW5kZWZpbmVkLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgKS5hbmRUaGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgICAgICByZXNwb25zZS5qc29uKCksXG4gICAgICAgIChlcnJvcikgPT4gZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgICBuZXcgU2VydmVyRXJyb3IodW5kZWZpbmVkLCB7IGNvbnRleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQgfSksXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNEZW5vUnVudGltZSA9ICgpOiBib29sZWFuID0+IHR5cGVvZiBEZW5vICE9PSBcInVuZGVmaW5lZFwiO1xuXG5leHBvcnQgY29uc3QgaXNTZWN1cmVDb250ZXh0ID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gaXNEZW5vUnVudGltZSgpIHx8IGdsb2JhbFRoaXMuaXNTZWN1cmVDb250ZXh0IHx8XG4gICAgZ2xvYmFsVGhpcy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcbn07XG5cbmV4cG9ydCBjb25zdCB3b3JrZXJVcmwgPSAocmVsYXRpdmVQYXRoOiBzdHJpbmcpOiBVUkwgPT4ge1xuICByZXR1cm4gaXNEZW5vUnVudGltZSgpXG4gICAgPyBuZXcgVVJMKGAuL3dvcmtlci8ke3JlbGF0aXZlUGF0aH0udHNgLCBuZXcgVVJMKFwiLlwiLCBpbXBvcnQubWV0YS51cmwpLmhyZWYpXG4gICAgOiBuZXcgVVJMKFxuICAgICAgaW1wb3J0Lm1ldGEucmVzb2x2ZShcbiAgICAgICAgYC4vJHtcbiAgICAgICAgICByZWxhdGl2ZVBhdGggIT09IFwiZW5jcnlwdFwiID8gYHdvcmtlci8ke3JlbGF0aXZlUGF0aH1gIDogcmVsYXRpdmVQYXRoXG4gICAgICAgIH0uanNgLFxuICAgICAgKSxcbiAgICApO1xufTtcbiIsICJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudHNcIjtcbmltcG9ydCB7IFdPUktFUl9BQ1RJT04gfSBmcm9tIFwifi9lbnVtL3dvcmtlci1hY3Rpb24udHNcIjtcbmltcG9ydCB0eXBlIHsgTHVmaUZpbGUgfSBmcm9tIFwifi9lbnRpdGllcy9sdWZpLWZpbGUudHNcIjtcbmltcG9ydCB0eXBlIHsgV29ya2VyQWN0aW9uTWVzc2FnZSB9IGZyb20gXCJ+L2ludGVyZmFjZS93b3JrZXItYWN0aW9uLW1lc3NhZ2UudHNcIjtcbmltcG9ydCB7IEVWRU5UIH0gZnJvbSBcIn4vZW51bS9ldmVudC50c1wiO1xuaW1wb3J0IHsgVVBMT0FEX1NUQVRVUyB9IGZyb20gXCJ+L2VudW0vZmlsZS1zdGF0dXMudHNcIjtcbmltcG9ydCB0eXBlIHsgV29ya2VyRXZlbnQgfSBmcm9tIFwifi9pbnRlcmZhY2Uvd29ya2VyLWV2ZW50LnRzXCI7XG5cbmRlY2xhcmUgbGV0IHNlbGY6IFdvcmtlcjtcblxuZXhwb3J0IGNvbnN0IGV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuLyoqXG4gKiBVcGRhdGUgZmlsZSBpbiB3b3JrZXJzIGFuZCBwcm92aWRlIG1vZGlmaWNhdGlvbnMgdG8gdGhlIG1haW4gdGhyZWFkXG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcGFyYW0gYXJnc1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHVwZGF0ZUZpbGUgPSAobHVmaUZpbGU6IEx1ZmlGaWxlLCBhcmdzOiBQYXJ0aWFsPEx1ZmlGaWxlPikgPT4ge1xuICBPYmplY3QuYXNzaWduKGx1ZmlGaWxlLCBhcmdzKTtcblxuICBpZiAodHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICBldmVudDogRVZFTlQuRklMRV9VUERBVEVELFxuICAgICAgbHVmaUZpbGUsXG4gICAgfSBhcyBXb3JrZXJFdmVudCk7XG4gIH1cblxuICByZXR1cm4gbHVmaUZpbGU7XG59O1xuXG5leHBvcnQgY29uc3Qgc2VuZEZpbGVFcnJvciA9IChsdWZpRmlsZTogTHVmaUZpbGUsIGVycm9yOiBFcnJvcikgPT4ge1xuICB1cGRhdGVGaWxlKGx1ZmlGaWxlLCB7IHVwbG9hZFN0YXR1czogVVBMT0FEX1NUQVRVUy5GQUlMRUQgfSk7XG5cbiAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvciB9IGFzIFdvcmtlckV2ZW50KTtcbn07XG5cbi8qKlxuICogSW5pdCBmdW5jdGlvbiB0byBiZSBjYWxsZWQgYXQgdGhlIGJlZ2lubmluZyBvZiBlYWNoIGNoaWxkIHdvcmtlcidzIG9ubWVzc2FnZSBldmVudC5cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gIGV2ZW50cy5vbmNlKEVWRU5ULlNPQ0tFVF9PUEVORUQsICgpID0+IHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgIGV2ZW50OiBFVkVOVC5TT0NLRVRfT1BFTkVELFxuICAgIH0pO1xuICB9KTtcblxuICBldmVudHMub25jZShFVkVOVC5PUEVSQVRJT05fRkFJTEVELCAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvciB9KTtcbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNXb3JrZXJBY3Rpb25NZXNzYWdlID0gKFxuICAvLyBkZW5vLWxpbnQtaWdub3JlIG5vLWV4cGxpY2l0LWFueVxuICBtZXNzYWdlOiBhbnksXG4pOiBtZXNzYWdlIGlzIFdvcmtlckFjdGlvbk1lc3NhZ2UgPT4ge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBtZXNzYWdlID09PSBcIm9iamVjdFwiICYmXG4gICAgbWVzc2FnZSAhPT0gbnVsbCAmJlxuICAgIFwiYWN0aW9uXCIgaW4gbWVzc2FnZSAmJlxuICAgIE9iamVjdC52YWx1ZXMoV09SS0VSX0FDVElPTikuaW5jbHVkZXMobWVzc2FnZS5hY3Rpb24pXG4gICk7XG59O1xuIiwgbnVsbCwgbnVsbCwgbnVsbCwgImltcG9ydCB7XG4gIERlY29kZSBhcyBiNjRkZWNvZGUsXG4gIEVuY29kZSBhcyBiNjRlbmNvZGUsXG59IGZyb20gXCJhcnJheWJ1ZmZlci1lbmNvZGluZy9iYXNlNjRcIjtcbmltcG9ydCB7IGVyckFzeW5jLCBva0FzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgc2pjbCBmcm9tIFwibHVmaS1zamNsXCI7XG5pbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IENyeXB0b0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2NyeXB0by1lcnJvci50c1wiO1xuaW1wb3J0IHsgRGVjcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2RlY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCB7IGVuc3VyZUVycm9yIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB7IEhhc2hpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzXCI7XG5cbi8qKlxuICogRGVjcnlwdCBhbiBFbmNyeXB0ZWREYXRhIG9yIGEgc3RyaW5nIHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvbi5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gZW5jcnlwdGVkRGF0YVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICBlbmNyeXB0ZWREYXRhOiBFbmNyeXB0ZWREYXRhIHwgc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8QXJyYXlCdWZmZXIsIERlY3J5cHRpb25FcnJvcj4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSB0eXBlb2YgZW5jcnlwdGVkRGF0YSA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBlbmNyeXB0ZWREYXRhXG4gICAgICA6IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShlbmNyeXB0ZWREYXRhLmRhdGEgYXMgQXJyYXlCdWZmZXIpO1xuXG4gICAgcmV0dXJuIG9rQXN5bmMoYjY0ZGVjb2RlKHNqY2wuZGVjcnlwdChrZXksIGRhdGEpKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IERlY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEVuY3J5cHQgYW4gQXJyYXlCdWZmZXIgaW50byBhbiBFbmNyeXB0ZWREYXRhIHVzaW5nIHRoZSBwcm92aWRlZCBrZXlcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuKTogUmVzdWx0QXN5bmM8RW5jcnlwdGVkRGF0YSwgRW5jcnlwdGlvbkVycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZW5jcnlwdGVkID0gc2pjbC5lbmNyeXB0KGtleSwgYjY0ZW5jb2RlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gb2tBc3luYyh7XG4gICAgICBhbGdvOiBDcnlwdG9BbGdvcml0aG0uU2pjbCxcbiAgICAgIGRhdGE6IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShlbmNyeXB0ZWQpLmJ1ZmZlcixcbiAgICAgIGl2OiBKU09OLnBhcnNlKGVuY3J5cHRlZCBhcyB1bmtub3duIGFzIHN0cmluZykuaXYsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IEVuY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZyB1c2luZyBTamNsIEFQSVxuICpcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleSA9ICgpOiBSZXN1bHRBc3luYzxzdHJpbmcsIENyeXB0b0Vycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG9rQXN5bmMoc2pjbC5jb2RlYy5iYXNlNjQuZnJvbUJpdHMoc2pjbC5yYW5kb20ucmFuZG9tV29yZHMoOCwgMTApKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGdlbmVyYXRlIGtleVwiLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEhhc2ggYSBwYXNzd29yZCB1c2luZyBTamNsIEFQSVxuICpcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgSGFzaGluZ0Vycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG9rQXN5bmMoc2pjbC5jb2RlYy5oZXguZnJvbUJpdHMoc2pjbC5oYXNoLnNoYTUxMi5oYXNoKHBhc3N3b3JkKSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJBc3luYyhuZXcgSGFzaGluZ0Vycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXRlY3QgaWYgdGhlIGtleSBoYXMgYmVlbiBnZW5lcmF0ZWQgYnkgU2pjbC4gU2luY2Ugd2UncmUgbm90IGdlbmVyYXRpbmcgYW4gZXF1YWwgc3ltYm9sIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZyB3aXRoIHRoZSBXZWJDcnlwdG8gQVBJIChieSB1c2luZyBiYXNlNjR1cmwpLCBpdCdzIGVhc3kgdG8gZGV0ZWN0XG4gKlxuICogQHBhcmFtIGtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2pjbEtleSA9IChrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4ga2V5W2tleS5sZW5ndGggLSAxXSA9PT0gXCI9XCI7XG59O1xuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIENyeXB0b0Vycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBEZWNyeXB0aW9uRXJyb3IgZXh0ZW5kcyBDcnlwdG9FcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2U6IHN0cmluZyA9IFwiVW5hYmxlIHRvIGRlY3J5cHQgdGhlIHByb3ZpZGVkIGRhdGFcIjtcbn1cbiIsICJpbXBvcnQge1xuICBEZWNvZGUgYXMgYjY0dXJsZGVjb2RlLFxuICBFbmNvZGUgYXMgYjY0dXJsZW5jb2RlLFxufSBmcm9tIFwiYXJyYXlidWZmZXItZW5jb2RpbmcvYmFzZTY0L3VybFwiO1xuaW1wb3J0IHsgdHlwZSBFbmNyeXB0ZWREYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL2VuY3J5cHRlZC1kYXRhLnRzXCI7XG5pbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IERlY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9kZWNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBva0FzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgeyBlbnN1cmVFcnJvciB9IGZyb20gXCJ+L3V0aWxzLnRzXCI7XG5pbXBvcnQgeyBFbmNyeXB0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vZW5jcnlwdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBIYXNoaW5nRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vaGFzaGluZy1lcnJvci50c1wiO1xuXG4vKipcbiAqIERlY3J5cHQgYW4gZW5jcnlwdGVkRGF0YSB1c2luZyB0aGUga2V5IHVzZWQgZm9yIGVuY3J5cHRpb25cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gZW5jcnlwdGVkXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZGVjcnlwdCA9IChcbiAga2V5OiBzdHJpbmcsXG4gIGVuY3J5cHRlZDogRW5jcnlwdGVkRGF0YSxcbik6IFJlc3VsdEFzeW5jPEFycmF5QnVmZmVyLCBEZWNyeXB0aW9uRXJyb3I+ID0+IHtcbiAgcmV0dXJuIGltcG9ydEtleShrZXkpLmFuZFRoZW4oKGltcG9ydGVkS2V5KSA9PlxuICAgIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgICAgY3J5cHRvLnN1YnRsZS5kZWNyeXB0KFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJBRVMtR0NNXCIsXG4gICAgICAgICAgaXY6IGVuY3J5cHRlZC5pdiBhcyBVaW50OEFycmF5LFxuICAgICAgICB9LFxuICAgICAgICBpbXBvcnRlZEtleSxcbiAgICAgICAgZW5jcnlwdGVkLmRhdGEgYXMgQXJyYXlCdWZmZXIsXG4gICAgICApLFxuICAgICAgKGVycm9yKSA9PiBuZXcgRGVjcnlwdGlvbkVycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICAgIClcbiAgKTtcbn07XG5cbi8qKlxuICogRW5jcnlwdCBhbiBBcnJheUJ1ZmZlciBpbnRvIGFuIEVuY3J5cHRlZERhdGEgdXNpbmcgdGhlIHByb3ZpZGVkIGtleVxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5jcnlwdCA9IChcbiAga2V5OiBzdHJpbmcsXG4gIHZhbHVlOiBBcnJheUJ1ZmZlcixcbik6IFJlc3VsdEFzeW5jPEVuY3J5cHRlZERhdGEsIEVuY3J5cHRpb25FcnJvcj4gPT4ge1xuICByZXR1cm4gaW1wb3J0S2V5KGtleSkuYW5kVGhlbigoaW1wb3J0ZWRLZXkpID0+IHtcbiAgICBjb25zdCBpdiA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMTIpKTtcbiAgICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICBjcnlwdG8uc3VidGxlLmVuY3J5cHQoXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIkFFUy1HQ01cIixcbiAgICAgICAgICBpdixcbiAgICAgICAgfSxcbiAgICAgICAgaW1wb3J0ZWRLZXksXG4gICAgICAgIHZhbHVlLFxuICAgICAgKSxcbiAgICAgIChlcnJvcikgPT5cbiAgICAgICAgbmV3IEVuY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHtcbiAgICAgICAgICBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgICB9KSxcbiAgICApLmFuZFRoZW4oKGVuY3J5cHRlZCkgPT4ge1xuICAgICAgcmV0dXJuIG9rQXN5bmMoe1xuICAgICAgICBhbGdvOiBDcnlwdG9BbGdvcml0aG0uV2ViQ3J5cHRvLFxuICAgICAgICBkYXRhOiBlbmNyeXB0ZWQsXG4gICAgICAgIGl2LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSBzdHJpbmcgaW50byBhIENyeXB0b0tleSwgdXNhYmxlIGluIFdlYiBDcnlwdG8gQVBJXG4gKlxuICogQHBhcmFtIGtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGltcG9ydEtleSA9IChrZXk6IHN0cmluZyk6IFJlc3VsdEFzeW5jPENyeXB0b0tleSwgQ3J5cHRvRXJyb3I+ID0+IHtcbiAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KFxuICAgICAgXCJyYXdcIixcbiAgICAgIGI2NHVybGRlY29kZShrZXkpLFxuICAgICAgeyBuYW1lOiBcIkFFUy1HQ01cIiB9LFxuICAgICAgZmFsc2UsXG4gICAgICBbXG4gICAgICAgIFwiZW5jcnlwdFwiLFxuICAgICAgICBcImRlY3J5cHRcIixcbiAgICAgIF0sXG4gICAgKSxcbiAgICAoZXJyb3IpID0+XG4gICAgICBuZXcgQ3J5cHRvRXJyb3IoXCJVbmFibGUgdG8gaW1wb3J0IGNyeXB0b2dyYXBoeSBrZXlcIiwge1xuICAgICAgICBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgfSksXG4gICk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZyB1c2luZyBXZWIgQ3J5cHRvIEFQSS5cbiAqXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVLZXkgPSAoKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBDcnlwdG9FcnJvcj4gPT4ge1xuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIGNyeXB0by5zdWJ0bGVcbiAgICAgICAgLmdlbmVyYXRlS2V5KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiQUVTLUdDTVwiLFxuICAgICAgICAgICAgbGVuZ3RoOiAyNTYsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIFtcImVuY3J5cHRcIiwgXCJkZWNyeXB0XCJdLFxuICAgICAgICApXG4gICAgICAgIC50aGVuKChnZW5lcmF0ZWRLZXkpID0+XG4gICAgICAgICAgY3J5cHRvLnN1YnRsZVxuICAgICAgICAgICAgLmV4cG9ydEtleShcInJhd1wiLCBnZW5lcmF0ZWRLZXkpXG4gICAgICAgICAgICAudGhlbigoa2V5KSA9PiByZXNvbHZlKGI2NHVybGVuY29kZShrZXkpKSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgICAgIG5ldyBDcnlwdG9FcnJvcihcIlVuYWJsZSB0byBiYXNlNjQgZW5jb2RlIHRoZSB1cmxcIiwge1xuICAgICAgICAgICAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSlcbiAgICApLFxuICAgIChlcnJvcikgPT5cbiAgICAgIG5ldyBDcnlwdG9FcnJvcihcIlVuYWJsZSB0byBnZW5lcmF0ZSBrZXlcIiwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICApO1xufTtcblxuLyoqXG4gKiBIYXNoIGEgcGFzc3dvcmQgdXNpbmcgV2ViQ3J5cHRvIEFQSVxuICpcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgSGFzaGluZ0Vycm9yPiA9PiB7XG4gIGNvbnN0IHByb21pc2UgPSBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oXG4gICAgICBuZXcgVWludDhBcnJheShcbiAgICAgICAgYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoXG4gICAgICAgICAgXCJTSEEtNTEyXCIsXG4gICAgICAgICAgbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHBhc3N3b3JkKSxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKS5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSkuam9pbihcIlwiKTtcbiAgfTtcblxuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgcHJvbWlzZSgpLFxuICAgIChlcnJvcikgPT4gbmV3IEhhc2hpbmdFcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgKTtcbn07XG4iLCAiaW1wb3J0IHsgQ3J5cHRvQWxnb3JpdGhtIH0gZnJvbSBcIn4vZW51bS9jcnlwdG8tYWxnb3JpdGhtLnRzXCI7XG5pbXBvcnQgeyBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgdHlwZSB7IENyeXB0b0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2NyeXB0by1lcnJvci50c1wiO1xuaW1wb3J0IHR5cGUgeyBEZWNyeXB0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vZGVjcnlwdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHR5cGUgeyBFbmNyeXB0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vZW5jcnlwdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgdHlwZSBFbmNyeXB0ZWREYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL2VuY3J5cHRlZC1kYXRhLnRzXCI7XG5pbXBvcnQgKiBhcyBzamNsIGZyb20gXCJ+L2FwaS9jcnlwdG8vc2pjbC50c1wiO1xuaW1wb3J0ICogYXMgd2ViIGZyb20gXCJ+L2FwaS9jcnlwdG8vd2ViLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEhhc2hpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzXCI7XG5cbi8qKlxuICogRGVjcnlwdCBhbiBFbmNyeXB0ZWREYXRhIG9iamVjdCB1c2luZyB0aGUga2V5IHVzZWQgZm9yIGVuY3J5cHRpb25cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkZWNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEVuY3J5cHRlZERhdGEsXG4pOiBSZXN1bHRBc3luYzxBcnJheUJ1ZmZlciwgRGVjcnlwdGlvbkVycm9yPiA9PlxuICB2YWx1ZS5hbGdvID09PSB1bmRlZmluZWQgfHwgdmFsdWUuYWxnbyA9PT0gQ3J5cHRvQWxnb3JpdGhtLlNqY2xcbiAgICA/IHNqY2wuZGVjcnlwdChrZXksIHZhbHVlKVxuICAgIDogd2ViLmRlY3J5cHQoa2V5LCB2YWx1ZSk7XG5cbi8qKlxuICogRW5jcnlwdCBhbiBBcnJheUJ1ZmZlciB1c2luZyB0aGUgcHJvdmlkZWQga2V5IGFuZCBhbGdvcml0aG1cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBhbGdvXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5jcnlwdCA9IChcbiAga2V5OiBzdHJpbmcsXG4gIHZhbHVlOiBBcnJheUJ1ZmZlcixcbiAgYWxnbzogQ3J5cHRvQWxnb3JpdGhtLFxuKTogUmVzdWx0QXN5bmM8RW5jcnlwdGVkRGF0YSwgRW5jcnlwdGlvbkVycm9yPiA9PlxuICAoYWxnbyA9PT0gQ3J5cHRvQWxnb3JpdGhtLlNqY2wpXG4gICAgPyBzamNsLmVuY3J5cHQoa2V5LCB2YWx1ZSlcbiAgICA6IHdlYi5lbmNyeXB0KGtleSwgdmFsdWUpO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgbmV3IGtleSBmb3IgZW5jcnlwdGlvbi9kZWNyeXB0aW9uXG4gKlxuICogQHBhcmFtIGFsZ29cbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleSA9IChcbiAgYWxnbyA9IENyeXB0b0FsZ29yaXRobS5XZWJDcnlwdG8sXG4pOiBSZXN1bHRBc3luYzxzdHJpbmcsIENyeXB0b0Vycm9yPiA9PlxuICBhbGdvID09PSBDcnlwdG9BbGdvcml0aG0uU2pjbCA/IHNqY2wuZ2VuZXJhdGVLZXkoKSA6IHdlYi5nZW5lcmF0ZUtleSgpO1xuXG4vKipcbiAqIEhhc2ggYSBwYXNzd29yZCB1c2luZyB0aGUgcHJvdmlkZWQgYWxnb3JpdGhtXG4gKlxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcGFyYW0gYWxnb1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgYWxnbzogQ3J5cHRvQWxnb3JpdGhtLFxuKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBIYXNoaW5nRXJyb3I+ID0+XG4gIGFsZ28gPT09IENyeXB0b0FsZ29yaXRobS5TamNsXG4gICAgPyBzamNsLmhhc2hQYXNzd29yZChwYXNzd29yZClcbiAgICA6IHdlYi5oYXNoUGFzc3dvcmQocGFzc3dvcmQpO1xuIiwgImltcG9ydCB7IGVyckFzeW5jLCBva0FzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgeyBMdWZpRmlsZSB9IGZyb20gXCJ+L2VudGl0aWVzL2x1ZmktZmlsZS50c1wiO1xuaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgeyBVUExPQURfU1RBVFVTIH0gZnJvbSBcIn4vZW51bS9maWxlLXN0YXR1cy50c1wiO1xuaW1wb3J0IHsgU29ja2V0UGF0aCB9IGZyb20gXCJ+L2VudW0vc29ja2V0LXBhdGgudHNcIjtcbmltcG9ydCB7IFVwbG9hZEVycm9yIH0gZnJvbSBcIn4vZXJyb3IvdXBsb2FkL3VwbG9hZC1lcnJvci50c1wiO1xuaW1wb3J0IHsgV2ViU29ja2V0Q29ubmVjdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd2Vic29ja2V0L3dlYnNvY2tldC1jb25uZWN0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBXZWJTb2NrZXRFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3dlYnNvY2tldC93ZWJzb2NrZXQtZXJyb3IudHNcIjtcbmltcG9ydCB0eXBlIHsgQ2xpZW50VXBsb2FkQ2h1bmtNZXRhZGF0YSB9IGZyb20gXCJ+L2ludGVyZmFjZS9jbGllbnQtdXBsb2FkLWNodW5rLW1ldGFkYXRhLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyQ2FuY2VsTWV0YWRhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2Uvc2VydmVyLWNhbmNlbC1tZXRhZGF0YS50c1wiO1xuaW1wb3J0IHR5cGUgeyBTZXJ2ZXJEb3dubG9hZENodW5rU3VjY2Vzc01ldGFkYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3NlcnZlci1kb3dubG9hZC1jaHVuay1zdWNjZXNzLW1ldGFkYXRhLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlclVwbG9hZENodW5rTWV0YWRhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2Uvc2VydmVyLXVwbG9hZC1jaHVuay1tZXRhZGF0YS50c1wiO1xuaW1wb3J0IHR5cGUgeyBTZXJ2ZXJEb3dubG9hZENodW5rTWV0YWRhdGEgfSBmcm9tIFwifi90eXBlL3NlcnZlci1kb3dubG9hZC1jaHVuay1tZXRhZGF0YS50c1wiO1xuaW1wb3J0IHsgZW5zdXJlRXJyb3IgfSBmcm9tIFwifi91dGlscy50c1wiO1xuaW1wb3J0IHsgZXZlbnRzLCB1cGRhdGVGaWxlIH0gZnJvbSBcIn4vd29ya2VyL3NoYXJlZC50c1wiO1xuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gXCJ+L2FwaS9jcnlwdG8udHNcIjtcbmltcG9ydCB7XG4gIERlY29kZSBhcyBiNjRkZWNvZGUsXG4gIEVuY29kZSBhcyBiNjRlbmNvZGUsXG59IGZyb20gXCJhcnJheWJ1ZmZlci1lbmNvZGluZy9iYXNlNjRcIjtcblxuZXhwb3J0IGNvbnN0IHNvY2tldHM6IHtcbiAgW2tleTogc3RyaW5nXTogV2ViU29ja2V0O1xufSA9IHt9O1xuXG5jb25zdCBNQVhfRVJST1JTID0gNTtcblxuLyoqXG4gKiBIYW5kbGUgV2ViU29ja2V0IHJlc3BvbnNlIGZvciBjYW5jZWwgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSBkYXRhXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBvbkNhbmNlbE1lc3NhZ2UgPSAoXG4gIGRhdGE6IFNlcnZlckNhbmNlbE1ldGFkYXRhLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgRXJyb3I+ID0+IHtcbiAgZXZlbnRzLmVtaXQoRVZFTlQuVVBMT0FEX0NBTkNFTExFRCwgZGF0YS5zdWNjZXNzKTtcblxuICByZXR1cm4gb2tBc3luYyh1bmRlZmluZWQpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgV2ViU29ja2V0IHJlc3BvbnNlIGZvciBkb3dubG9hZCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHJlc3BvbnNlXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IG9uRG93bmxvYWRNZXNzYWdlID0gKFxuICByZXNwb25zZTogc3RyaW5nLFxuICBsdWZpRmlsZTogTHVmaUZpbGUsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5zcGxpdChcIlhYTU9KT1hYXCIpO1xuICBjb25zdCBtZXRhZGF0YVN0cmluZyA9IHJlc3VsdC5zaGlmdCgpO1xuXG4gIGlmIChtZXRhZGF0YVN0cmluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBKU09OLnBhcnNlKG1ldGFkYXRhU3RyaW5nKSBhcyBTZXJ2ZXJEb3dubG9hZENodW5rTWV0YWRhdGE7XG5cbiAgICBpZiAoaXNTZXJ2ZXJEb3dubG9hZENodW5rU3VjY2Vzc01ldGFkYXRhKG1ldGFkYXRhKSkge1xuICAgICAgY29uc3QgZGF0YVN0cmluZyA9IHJlc3VsdC5zaGlmdCgpO1xuXG4gICAgICBpZiAoZGF0YVN0cmluZykge1xuICAgICAgICBjb25zdCBlbmNyeXB0ZWREYXRhOiBFbmNyeXB0ZWREYXRhID0gSlNPTi5wYXJzZShkYXRhU3RyaW5nKTtcblxuICAgICAgICAvLyBJZiBmaWxlIHdhcyB1cGxvYWRlZCB1c2luZyBMdWZpIEFQSVxuICAgICAgICBpZiAoZW5jcnlwdGVkRGF0YS5pdikge1xuICAgICAgICAgIGVuY3J5cHRlZERhdGEuaXYgPSBuZXcgVWludDhBcnJheShPYmplY3QudmFsdWVzKGVuY3J5cHRlZERhdGEuaXYpKTtcbiAgICAgICAgICBlbmNyeXB0ZWREYXRhLmRhdGEgPSBiNjRkZWNvZGUoZW5jcnlwdGVkRGF0YS5kYXRhIGFzIHN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3J5cHRvLmRlY3J5cHQobHVmaUZpbGUua2V5cy5jbGllbnQsIGVuY3J5cHRlZERhdGEpLmFuZFRoZW4oXG4gICAgICAgICAgKGRlY3J5cHRlZFBhcnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHR5cGVvZiBkZWNyeXB0ZWRQYXJ0ID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgICAgID8gKG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShkZWNyeXB0ZWRQYXJ0KS5idWZmZXIgYXMgQXJyYXlCdWZmZXIpXG4gICAgICAgICAgICAgIDogZGVjcnlwdGVkUGFydDtcblxuICAgICAgICAgICAgLy8gSWYgZmlyc3QgY2h1bmtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5wYXJ0ID09PSAwKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHtcbiAgICAgICAgICAgICAgICBjaHVua3NSZWFkeTogbHVmaUZpbGUuY2h1bmtzUmVhZHkgKyAxLFxuICAgICAgICAgICAgICAgIGRlbEF0Rmlyc3RWaWV3OiBtZXRhZGF0YS5kZWxfYXRfZmlyc3RfdmlldyxcbiAgICAgICAgICAgICAgICBkZWxheTogbWV0YWRhdGEuZGVsYXksXG4gICAgICAgICAgICAgICAgbmFtZTogbWV0YWRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBzaXplOiBtZXRhZGF0YS5zaXplLFxuICAgICAgICAgICAgICAgIHRvdGFsQ2h1bmtzOiBtZXRhZGF0YS50b3RhbCxcbiAgICAgICAgICAgICAgICB0eXBlOiBtZXRhZGF0YS50eXBlLFxuICAgICAgICAgICAgICAgIHppcHBlZDogbWV0YWRhdGEuemlwcGVkLFxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBldmVudHMuZW1pdChFVkVOVC5ET1dOTE9BRF9TVEFSVEVEKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHsgY2h1bmtzUmVhZHk6IGx1ZmlGaWxlLmNodW5rc1JlYWR5ICsgMSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuQ0hVTktfRE9XTkxPQURFRCwgYnVmZmVyLCBtZXRhZGF0YS5wYXJ0KTtcblxuICAgICAgICAgICAgaWYgKGx1ZmlGaWxlLmNodW5rc1JlYWR5ID09PSBtZXRhZGF0YS50b3RhbCkge1xuICAgICAgICAgICAgICByZXR1cm4gZW5kRG93bmxvYWQobHVmaUZpbGUpLmFuZFRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULkRPV05MT0FEX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICBldmVudHMuZW1pdChFVkVOVC5TT0NLRVRfT1BFUkFUSU9OX1RFUk1JTkFURUQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBva0FzeW5jKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFdlYlNvY2tldEVycm9yKFxuICAgICAgICAgIFwiQ2Fubm90IHJldHJpZXZlIG1ldGFkYXRhIGZyb20gZGF0YSByZWNlaXZlZCBieSB0aGUgc2VydmVyXCIsXG4gICAgICAgICk7XG5cbiAgICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZXJyQXN5bmMoZXJyb3IpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBXZWJTb2NrZXRFcnJvcihtZXRhZGF0YS5tc2cpO1xuXG4gICAgICBldmVudHMuZW1pdChFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvcik7XG4gICAgICByZXR1cm4gZXJyQXN5bmMoZXJyb3IpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBXZWJTb2NrZXRFcnJvcihcbiAgICAgIFwiQ2Fubm90IHJldHJpZXZlIG1ldGFkYXRhIGZyb20gZGF0YSByZWNlaXZlZCBieSB0aGUgc2VydmVyXCIsXG4gICAgKTtcblxuICAgIGV2ZW50cy5lbWl0KEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yKTtcbiAgICByZXR1cm4gZXJyQXN5bmMoZXJyb3IpO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZSBXZWJTb2NrZXQgcmVzcG9uc2UgZm9yIHVwbG9hZCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHJlc3BvbnNlXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IG9uVXBsb2FkTWVzc2FnZSA9IChcbiAgcmVzcG9uc2U6IFNlcnZlclVwbG9hZENodW5rTWV0YWRhdGEsXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFVwbG9hZEVycm9yPiA9PiB7XG4gIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgLy8gSWYgZmlyc3QgY2h1bmtcbiAgICBpZiAocmVzcG9uc2UuaiA9PT0gMCkge1xuICAgICAgLy8gY29uc29sZS5pbmZvKGBVcGxvYWQgb2YgJHtsdWZpRmlsZS5rZXlzLmNsaWVudH0gc3RhcnRlZGApO1xuXG4gICAgICB1cGRhdGVGaWxlKGx1ZmlGaWxlLCB7XG4gICAgICAgIGtleXM6IHsgY2xpZW50OiBsdWZpRmlsZS5rZXlzLmNsaWVudCwgc2VydmVyOiByZXNwb25zZS5zaG9ydCB9LFxuICAgICAgICBhY3Rpb25Ub2tlbjogcmVzcG9uc2UudG9rZW4sXG4gICAgICAgIHF1ZXVlSW5kZXg6IHJlc3BvbnNlLmksXG4gICAgICB9KTtcblxuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuVVBMT0FEX1NUQVJURUQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHtcbiAgICAgIGNodW5rc1JlYWR5OiBsdWZpRmlsZS5jaHVua3NSZWFkeSArIDEsXG4gICAgICBjcmVhdGVkQXQ6IHJlc3BvbnNlLmNyZWF0ZWRfYXQsXG4gICAgfSk7XG5cbiAgICBldmVudHMuZW1pdChFVkVOVC5DSFVOS19VUExPQURFRCk7XG5cbiAgICBpZiAobHVmaUZpbGUuY2h1bmtzUmVhZHkgPT09IGx1ZmlGaWxlLnRvdGFsQ2h1bmtzKSB7XG4gICAgICB1cGRhdGVGaWxlKGx1ZmlGaWxlLCB7IHVwbG9hZFN0YXR1czogVVBMT0FEX1NUQVRVUy5DT01QTEVURSB9KTtcblxuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuVVBMT0FEX0NPTVBMRVRFKTtcbiAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULlNPQ0tFVF9PUEVSQVRJT05fVEVSTUlOQVRFRCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBXZWJTb2NrZXRFcnJvcihyZXNwb25zZS5tc2cpO1xuICAgIGV2ZW50cy5lbWl0KEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yKTtcblxuICAgIHJldHVybiBlcnJBc3luYyhlcnJvcik7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIG9uIHNvY2tldHMgXCJvbm1lc3NhZ2VcIiBldmVudFxuICpcbiAqIEBwYXJhbSBlXG4gKiBAcGFyYW0gc29ja2V0VXJsXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBvbk1lc3NhZ2UgPSAoXG4gIGU6IE1lc3NhZ2VFdmVudCxcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgVXBsb2FkRXJyb3I+ID0+IHtcbiAgY29uc3QgZGF0YSA9IHRyeVBhcnNlSnNvbihlLmRhdGEpO1xuXG4gIGxldCBjYWxsYmFjaztcblxuICBpZiAoZGF0YSkge1xuICAgIGlmICghZGF0YS5hY3Rpb24gJiYgZGF0YS5tc2cpIHtcbiAgICAgIC8vIElmIGVycm9yXG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBXZWJTb2NrZXRFcnJvcihkYXRhLm1zZyk7XG4gICAgICBldmVudHMuZW1pdChFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvcik7XG5cbiAgICAgIHJldHVybiBlcnJBc3luYyhlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChcImRlbGF5XCIgaW4gZGF0YSkge1xuICAgICAgICBjYWxsYmFjayA9IG9uVXBsb2FkTWVzc2FnZShkYXRhLCBsdWZpRmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayA9IG9uQ2FuY2VsTWVzc2FnZShkYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY2FsbGJhY2sgPSBvbkRvd25sb2FkTWVzc2FnZShlLmRhdGEsIGx1ZmlGaWxlKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsYmFjaztcbn07XG5cbi8qKlxuICogSXMgc29ja2V0IGNvbm5lY3Rpbmc/XG4gKlxuICogQHBhcmFtIHNvY2tldEtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQ29ubmVjdGluZyA9IChzb2NrZXRLZXk6IHN0cmluZyk6IGJvb2xlYW4gPT5cbiAgc29ja2V0cyAhPT0gdW5kZWZpbmVkICYmXG4gIHNvY2tldHNbc29ja2V0S2V5XSAhPT0gdW5kZWZpbmVkICYmXG4gIHNvY2tldHNbc29ja2V0S2V5XS5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORztcblxuLyoqXG4gKiBJcyBzb2NrZXQgc3Bhd25lZD9cbiAqXG4gKiBAcGFyYW0gc29ja2V0S2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaXNTcGF3bmVkID0gKHNvY2tldEtleTogc3RyaW5nKTogYm9vbGVhbiA9PlxuICBzb2NrZXRzICE9PSB1bmRlZmluZWQgJiZcbiAgc29ja2V0c1tzb2NrZXRLZXldICE9PSB1bmRlZmluZWQgJiZcbiAgc29ja2V0c1tzb2NrZXRLZXldLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOO1xuXG4vKipcbiAqIEFzayBXZWJTb2NrZXQgdG8gY2FuY2VsIGFuIHVwbG9hZFxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGNhbmNlbFVwbG9hZCA9IChcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgcmV0dXJuIHNlbmRNZXNzYWdlKFxuICAgIHVwbG9hZFNvY2tldFVybChsdWZpRmlsZSksXG4gICAgbHVmaUZpbGUsXG4gICAgYCR7XG4gICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGlkOiBsdWZpRmlsZS5rZXlzLnNlcnZlcixcbiAgICAgICAgbW9kX3Rva2VuOiBsdWZpRmlsZS5hY3Rpb25Ub2tlbixcbiAgICAgICAgY2FuY2VsOiB0cnVlLFxuICAgICAgICBpOiBsdWZpRmlsZS5xdWV1ZUluZGV4LFxuICAgICAgfSlcbiAgICB9WFhNT0pPWFh1c2VsZXNzYCxcbiAgKTtcbn07XG5cbi8qKlxuICogRG93bmxvYWQgYSBwYXJ0IG9mIHRoZSBmaWxlIHRocm91Z2ggdGhlIFdlYlNvY2tldFxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHBhcmFtIGNodW5rTnVtYmVyXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZG93bmxvYWRDaHVuayA9IChcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuICBjaHVua051bWJlcjogbnVtYmVyLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgbGV0IG1lc3NhZ2U7XG5cbiAgaWYgKGx1ZmlGaWxlLnBhc3N3b3JkKSB7XG4gICAgbWVzc2FnZSA9IHsgcGFydDogY2h1bmtOdW1iZXIsIGZpbGVfcHdkOiBsdWZpRmlsZS5wYXNzd29yZCB9O1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2UgPSB7IHBhcnQ6IGNodW5rTnVtYmVyIH07XG4gIH1cblxuICByZXR1cm4gc2VuZE1lc3NhZ2UoXG4gICAgZG93bmxvYWRTb2NrZXRVcmwobHVmaUZpbGUpLFxuICAgIGx1ZmlGaWxlLFxuICAgIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICApO1xufTtcblxuLyoqXG4gKiBUZWxsIHRoZSBXZWJTb2NrZXQgdGhlIGRvd25sb2FkIGVuZGVkXG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5kRG93bmxvYWQgPSAoXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFdlYlNvY2tldEVycm9yPiA9PiB7XG4gIGxldCBtZXNzYWdlOiB7IGVuZGVkOiB0cnVlOyBmaWxlX3B3ZD86IHN0cmluZyB9O1xuXG4gIGlmIChsdWZpRmlsZS5wYXNzd29yZCkge1xuICAgIG1lc3NhZ2UgPSB7IGVuZGVkOiB0cnVlLCBmaWxlX3B3ZDogbHVmaUZpbGUucGFzc3dvcmQgfTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlID0geyBlbmRlZDogdHJ1ZSB9O1xuICB9XG5cbiAgcmV0dXJuIHNlbmRNZXNzYWdlKFxuICAgIGRvd25sb2FkU29ja2V0VXJsKGx1ZmlGaWxlKSxcbiAgICBsdWZpRmlsZSxcbiAgICBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgKTtcbn07XG5cbi8qKlxuICogVXBsb2FkIGEgY2h1bmsgb2YgdGhlIGZpbGUgdGhyb3VnaCB0aGUgV2ViU29ja2V0XG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcGFyYW0gbWV0YWRhdGFcbiAqIEBwYXJhbSBlbmNyeXB0ZWREYXRhXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgdXBsb2FkQ2h1bmsgPSAoXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbiAgbWV0YWRhdGE6IENsaWVudFVwbG9hZENodW5rTWV0YWRhdGEsXG4gIGVuY3J5cHRlZERhdGE6IEVuY3J5cHRlZERhdGEsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICBlbmNyeXB0ZWREYXRhLmRhdGEgPSBiNjRlbmNvZGUoZW5jcnlwdGVkRGF0YS5kYXRhIGFzIEFycmF5QnVmZmVyKTtcblxuICByZXR1cm4gc2VuZE1lc3NhZ2UoXG4gICAgdXBsb2FkU29ja2V0VXJsKGx1ZmlGaWxlKSxcbiAgICBsdWZpRmlsZSxcbiAgICBgJHtKU09OLnN0cmluZ2lmeShtZXRhZGF0YSl9WFhNT0pPWFgke0pTT04uc3RyaW5naWZ5KGVuY3J5cHRlZERhdGEpfWAsXG4gICk7XG59O1xuXG4vKipcbiAqIFNlbmQgYSBtZXNzYWdlIHRvIHRoZSBXZWJTb2NrZXRcbiAqXG4gKiBAcGFyYW0gc29ja2V0VXJsXG4gKiBAcGFyYW0gbWVzc2FnZVxuICogQHBhcmFtIGhhc1ByaW9yaXR5XG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBzZW5kTWVzc2FnZSA9IChcbiAgc29ja2V0VXJsOiBzdHJpbmcsXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbiAgbWVzc2FnZTogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgaWYgKCFpc1NwYXduZWQoc29ja2V0VXJsKSkge1xuICAgIHJldHVybiBzcGF3bihzb2NrZXRVcmwpLmFuZFRoZW4oKCkgPT4ge1xuICAgICAgc29ja2V0c1tzb2NrZXRVcmxdLm9ubWVzc2FnZSA9IChlKSA9PiBvbk1lc3NhZ2UoZSwgbHVmaUZpbGUpO1xuICAgICAgcmV0dXJuIHNlbmRNZXNzYWdlKHNvY2tldFVybCwgbHVmaUZpbGUsIG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHNvY2tldHNbc29ja2V0VXJsXS5zZW5kKG1lc3NhZ2UpO1xuXG4gICAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTcGF3biBhIG5ldyBXZWJTb2NrZXQgb3IgcmV1c2UgYW4gZXhpc3Rpbmcgb25lLlxuICpcbiAqIEBwYXJhbSBzb2NrZXRLZXlcbiAqIEBwYXJhbSBlcnJvckNvdW50XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3Qgc3Bhd24gPSAoXG4gIHNvY2tldEtleTogc3RyaW5nLFxuICBlcnJvckNvdW50ID0gMCxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgaWYgKCFpc1NwYXduZWQoc29ja2V0S2V5KSAmJiAhaXNDb25uZWN0aW5nKHNvY2tldEtleSkpIHtcbiAgICAvLyBjb25zb2xlLmluZm8oYFNwYXduaW5nIFdlYlNvY2tldCAke3NvY2tldFVybH1gKTtcbiAgICBzb2NrZXRzW3NvY2tldEtleV0gPSBuZXcgV2ViU29ja2V0KHNvY2tldEtleSk7XG5cbiAgICBldmVudHMub25jZShFVkVOVC5TT0NLRVRfT1BFUkFUSU9OX1RFUk1JTkFURUQsICgpID0+IHtcbiAgICAgIHNvY2tldHNbc29ja2V0S2V5XS5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgZXZlbnRzLm9uY2UoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgKCkgPT4ge1xuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuU09DS0VUX09QRVJBVElPTl9URVJNSU5BVEVEKTtcbiAgICB9KTtcblxuICAgIHNvY2tldHNbc29ja2V0S2V5XS5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYFdlYnNvY2tldCAke3NvY2tldEtleX0gaGFzIGJlZW4gb3BlbmApO1xuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuU09DS0VUX09QRU5FRCk7XG4gICAgfTtcblxuICAgIHNvY2tldHNbc29ja2V0S2V5XS5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5pbmZvKGBXZWJzb2NrZXQgJHtzb2NrZXRLZXl9IGhhcyBiZWVuIGNsb3NlZGApO1xuICAgIH07XG5cbiAgICBzb2NrZXRzW3NvY2tldEtleV0ub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGlmICgrK2Vycm9yQ291bnQgPD0gTUFYX0VSUk9SUykge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGBBbiBlcnJvciBoYXBwZW5lZCB3aGlsZSB0cnlpbmcgdG8gY29ubmVjdCB0byBXZWJTb2NrZXQgXCIke3NvY2tldEtleX1cIi4gVHJ5aW5nIGFnYWluLiAke2Vycm9yQ291bnR9IC8gJHtNQVhfRVJST1JTfWAsXG4gICAgICAgICAgKGV2ZW50IGFzIEVycm9yRXZlbnQpLmVycm9yLFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBzcGF3bihzb2NrZXRLZXksIGVycm9yQ291bnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuU09DS0VUX09ORVJST1IpO1xuICAgICAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICAgICAgbmV3IFdlYlNvY2tldENvbm5lY3Rpb25FcnJvcihcbiAgICAgICAgICAgIGBVbmFibGUgdG8gY29ubmVjdCB0byBXZWJTb2NrZXQgJHtzb2NrZXRLZXl9LmAsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHdhaXRGb3JDb25uZWN0aW9uKHNvY2tldEtleSlcbiAgICAuYW5kVGhlbigoKSA9PiBva0FzeW5jKHNvY2tldEtleSkpXG4gICAgLm9yRWxzZSgoZXJyb3IpID0+IGVyckFzeW5jKGVycm9yKSk7XG59O1xuXG4vKipcbiAqIFdhaXQgZm9yIFdlYlNvY2tldCB0byBvcGVuLiBSZXR1cm5zIGFuIGVycm9yIGlmIHRvbyBtYW55IGNvbm5lY3Rpb24gYXR0ZW1wdHMgYXJlIG1hZGUuXG4gKlxuICogQHBhcmFtIHNvY2tldEtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHdhaXRGb3JDb25uZWN0aW9uID0gKFxuICBzb2NrZXRLZXk6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFdlYlNvY2tldEVycm9yPiA9PlxuICBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIWlzU3Bhd25lZChzb2NrZXRLZXkpKSB7XG4gICAgICAgIGV2ZW50cy5vbmNlKEVWRU5ULlNPQ0tFVF9PUEVORUQsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50cy5vbihFVkVOVC5TT0NLRVRfT05FUlJPUiwgKCkgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgV2ViU29ja2V0Q29ubmVjdGlvbkVycm9yKCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9KSxcbiAgICAoZXJyb3IpID0+IHtcbiAgICAgIHJldHVybiBlbnN1cmVFcnJvcihlcnJvcik7XG4gICAgfSxcbiAgKTtcblxuLyoqXG4gKiBDbG9zZSB0aGUgV2ViU29ja2V0XG4gKiBAcGFyYW0gc29ja2V0S2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgY2xvc2UgPSAoc29ja2V0S2V5OiBzdHJpbmcpOiBSZXN1bHRBc3luYzxzdHJpbmcsIFdlYlNvY2tldEVycm9yPiA9PlxuICBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoaXNTcGF3bmVkKHNvY2tldEtleSkpIHtcbiAgICAgICAgY29uc3QgdGltZW91dElEID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBXZWJTb2NrZXRFcnJvcihcIlVuYWJsZSB0byBjbG9zZSB0aGUgV2ViU29ja2V0XCIpKTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgc29ja2V0c1tzb2NrZXRLZXldLm9uY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmVzb2x2ZShzb2NrZXRLZXkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNvY2tldHNbc29ja2V0S2V5XS5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShzb2NrZXRLZXkpO1xuICAgICAgfVxuICAgIH0pLFxuICAgIChlcnJvcikgPT4gZW5zdXJlRXJyb3IoZXJyb3IpLFxuICApO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYW4gaW5zdGFuY2UgVVJMIGluIGEgV2ViU29ja2V0IFVSTFxuICpcbiAqIEBwYXJhbSBpbnN0YW5jZVVybFxuICogQHBhcmFtIHBhdGhuYW1lXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgYnVpbGRTb2NrZXRVcmwgPSAoaW5zdGFuY2VVcmw6IFVSTCwgcGF0aG5hbWU6IHN0cmluZyk6IFVSTCA9PiB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwoaW5zdGFuY2VVcmwpO1xuXG4gIGlmICghW1wid3M6XCIsIFwid3NzOlwiXS5pbmNsdWRlcyh1cmwucHJvdG9jb2wpKSB7XG4gICAgdXJsLnByb3RvY29sID0gdXJsLnByb3RvY29sID09PSBcImh0dHA6XCIgPyBcIndzOlwiIDogXCJ3c3M6XCI7XG4gIH1cbiAgdXJsLnBhdGhuYW1lICs9IHBhdGhuYW1lO1xuXG4gIHJldHVybiBuZXcgVVJMKHVybC5vcmlnaW4gKyB1cmwucGF0aG5hbWUpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0aGUgZG93bmxvYWQgVVJMIGZvciB0aGUgc29ja2V0LiBSZXR1cm5zIGEgc3RyaW5nIHNpbmNlIGl0J3MgbW9zdGx5IHVzZWQgYXMgc29ja2V0cyBrZXlcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkb3dubG9hZFNvY2tldFVybCA9IChsdWZpRmlsZTogTHVmaUZpbGUpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYnVpbGRTb2NrZXRVcmwoXG4gICAgbmV3IFVSTChsdWZpRmlsZS5zZXJ2ZXJVcmwpLFxuICAgIFNvY2tldFBhdGguRE9XTkxPQUQgKyBgLyR7bHVmaUZpbGUua2V5cy5zZXJ2ZXJ9YCxcbiAgKS50b1N0cmluZygpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0aGUgdXBsb2FkIFVSTCBmb3IgdGhlIHNvY2tldC4gUmV0dXJucyBhIHN0cmluZyBzaW5jZSBpdCdzIG1vc3RseSB1c2VkIGFzIHNvY2tldHMga2V5XG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgdXBsb2FkU29ja2V0VXJsID0gKGx1ZmlGaWxlOiBMdWZpRmlsZSk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBidWlsZFNvY2tldFVybChuZXcgVVJMKGx1ZmlGaWxlLnNlcnZlclVybCksIFNvY2tldFBhdGguVVBMT0FEKVxuICAgIC50b1N0cmluZygpO1xufTtcblxuLyoqXG4gKiBUcnkgdG8gcGFyc2UgYSBzdHJpbmcgaW50byBhIEpTT04uIFJldHVybnMgZmFsc2UgaWYgbm90IHBvc3NpYmxlLlxuICpcbiAqIEBwYXJhbSBkYXRhXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCB0cnlQYXJzZUpzb24gPSAoZGF0YTogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyc2VkT2JqZWN0ID0gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgIGlmIChwYXJzZWRPYmplY3QgJiYgdHlwZW9mIHBhcnNlZE9iamVjdCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHBhcnNlZE9iamVjdDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICB9IGNhdGNoIChfZSkge1xuICAgIC8qIGVtcHR5ICovXG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgdHlwZSBvZiB0aGUgbWVzc2FnZSByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXIgaXMgU2VydmVyRG93bmxvYWRDaHVua01ldGFkYXRhXG4gKlxuICogQHBhcmFtIG1lc3NhZ2VcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NlcnZlckRvd25sb2FkQ2h1bmtTdWNjZXNzTWV0YWRhdGEgPSAoXG4gIG1lc3NhZ2U6IFNlcnZlckRvd25sb2FkQ2h1bmtNZXRhZGF0YSxcbik6IG1lc3NhZ2UgaXMgU2VydmVyRG93bmxvYWRDaHVua1N1Y2Nlc3NNZXRhZGF0YSA9PlxuICB0eXBlb2YgbWVzc2FnZSA9PT0gXCJvYmplY3RcIiAmJiBtZXNzYWdlICE9PSBudWxsICYmICEoXCJtc2dcIiBpbiBtZXNzYWdlKTtcbiIsICJpbXBvcnQgdHlwZSB7IFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IGRvd25sb2FkQ2h1bmssIGRvd25sb2FkU29ja2V0VXJsLCBzb2NrZXRzIH0gZnJvbSBcIn4vYXBpL3dlYnNvY2tldC50c1wiO1xuaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckFjdGlvbk1lc3NhZ2UgfSBmcm9tIFwifi9pbnRlcmZhY2Uvd29ya2VyLWFjdGlvbi1tZXNzYWdlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckV2ZW50IH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1ldmVudC50c1wiO1xuaW1wb3J0IHsgZXZlbnRzLCBpbml0IH0gZnJvbSBcIn4vd29ya2VyL3NoYXJlZC50c1wiO1xuaW1wb3J0IHR5cGUgeyBXZWJTb2NrZXRFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3dlYnNvY2tldC93ZWJzb2NrZXQtZXJyb3IudHNcIjtcblxuZGVjbGFyZSBjb25zdCBzZWxmOiBXb3JrZXI7XG5sZXQgaXNJbml0aWF0ZWQgPSBmYWxzZTtcblxuc2VsZi5vbm1lc3NhZ2UgPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICBpZiAoIWlzSW5pdGlhdGVkKSB7XG4gICAgaW5pdCgpO1xuICAgIGlzSW5pdGlhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGV2ZW50cy5vbihFVkVOVC5ET1dOTE9BRF9TVEFSVEVELCAoKSA9PiB7XG4gICAgc29ja2V0c1tkb3dubG9hZFNvY2tldFVybChldmVudC5kYXRhLmFyZ3MubHVmaUZpbGUpXS5jbG9zZSgpO1xuXG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5JTkZPU19SRVRSSUVWRUQgfSk7XG4gIH0pO1xuXG4gIHJldHJpZXZlSW5mb3MoZXZlbnQuZGF0YSkubWFwRXJyKChlcnJvcikgPT4ge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgZXZlbnQ6IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsXG4gICAgICBlcnJvcixcbiAgICB9IGFzIFdvcmtlckV2ZW50KTtcbiAgfSk7XG59O1xuXG5jb25zdCByZXRyaWV2ZUluZm9zID0gKFxuICB3b3JrZXJNZXNzYWdlOiBXb3JrZXJBY3Rpb25NZXNzYWdlLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+XG4gIGRvd25sb2FkQ2h1bmsod29ya2VyTWVzc2FnZS5hcmdzLmx1ZmlGaWxlLCAwKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBdUJBLFFBQUksSUFBSSxPQUFPLFlBQVksV0FBVyxVQUFVO0FBQ2hELFFBQUksZUFBZSxLQUFLLE9BQU8sRUFBRSxVQUFVLGFBQ3ZDLEVBQUUsUUFDRixTQUFTQSxjQUFhLFFBQVEsVUFBVSxNQUFNO0FBQzlDLGFBQU8sU0FBUyxVQUFVLE1BQU0sS0FBSyxRQUFRLFVBQVUsSUFBSTtBQUFBLElBQzdEO0FBRUYsUUFBSTtBQUNKLFFBQUksS0FBSyxPQUFPLEVBQUUsWUFBWSxZQUFZO0FBQ3hDLHVCQUFpQixFQUFFO0FBQUEsSUFDckIsV0FBVyxPQUFPLHVCQUF1QjtBQUN2Qyx1QkFBaUIsU0FBU0MsZ0JBQWUsUUFBUTtBQUMvQyxlQUFPLE9BQU8sb0JBQW9CLE1BQU0sRUFDckMsT0FBTyxPQUFPLHNCQUFzQixNQUFNLENBQUM7QUFBQSxNQUNoRDtBQUFBLElBQ0YsT0FBTztBQUNMLHVCQUFpQixTQUFTQSxnQkFBZSxRQUFRO0FBQy9DLGVBQU8sT0FBTyxvQkFBb0IsTUFBTTtBQUFBLE1BQzFDO0FBQUEsSUFDRjtBQUVBLGFBQVMsbUJBQW1CLFNBQVM7QUFDbkMsVUFBSSxXQUFXLFFBQVEsS0FBTSxTQUFRLEtBQUssT0FBTztBQUFBLElBQ25EO0FBRUEsUUFB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LGNBQVksS0FBSztBQUFBLE1BQU87QUFBRSxXQUFLLFVBQVE7QUFBQSxJQUFDLEdBQUUsS0FBSSxTQUFTLEdBQUU7QUFBQyxXQUFLLFdBQVMsV0FBVTtBQUFDLGVBQU0sVUFBUSxLQUFLO0FBQUEsTUFBTztBQUFFLFdBQUssVUFBUTtBQUFBLElBQUMsR0FBRSxVQUFTLFNBQVMsR0FBRTtBQUFDLFdBQUssV0FBUyxXQUFVO0FBQUMsZUFBTSxnQkFBYyxLQUFLO0FBQUEsTUFBTztBQUFFLFdBQUssVUFBUTtBQUFBLElBQUMsRUFBQyxFQUFDO0FBQzNjLElBQUFBLE1BQUssT0FBTyxNQUFJLFNBQVMsR0FBRTtBQUFDLFdBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBRyxLQUFLLEVBQUU7QUFBRSxVQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRSxJQUFFLEtBQUssRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFO0FBQU8sVUFBSSxJQUFFO0FBQUUsVUFBRyxNQUFJLEtBQUcsTUFBSSxLQUFHLE1BQUksRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHNCQUFzQjtBQUFFLFdBQUssSUFBRSxDQUFDLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxJQUFFLENBQUMsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsSUFBRSxJQUFFLElBQUcsS0FBSTtBQUFDLFlBQUUsRUFBRSxJQUFFLENBQUM7QUFBRSxZQUFHLE1BQUksSUFBRSxLQUFHLE1BQUksS0FBRyxNQUFJLElBQUUsRUFBRSxLQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsS0FBRyxFQUFFLEtBQUcsS0FBRyxHQUFHLEtBQUcsS0FBRyxFQUFFLEtBQUcsSUFBRSxHQUFHLEtBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxHQUFFLE1BQUksSUFBRSxNQUFJLElBQUUsS0FBRyxJQUFFLE1BQUksS0FBRyxLQUFHLElBQUcsSUFBRSxLQUFHLElBQUUsT0FBSyxLQUFHO0FBQUksVUFBRSxDQUFDLElBQUUsRUFBRSxJQUFFLENBQUMsSUFBRTtBQUFBLE1BQUM7QUFBQyxXQUFJLElBQUUsR0FBRSxHQUFFLEtBQUksSUFBSSxLQUFFLEVBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsS0FBRyxLQUFHLElBQUUsSUFBRSxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsTUFBSSxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLENBQUMsSUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLENBQUMsSUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLElBQzNmLEdBQUcsQ0FBQztBQUFBLElBQUM7QUFDTCxJQUFBQSxNQUFLLE9BQU8sSUFBSSxZQUFVLEVBQUMsU0FBUSxTQUFTLEdBQUU7QUFBQyxhQUFPLEdBQUcsTUFBSyxHQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUU7QUFBQyxhQUFPLEdBQUcsTUFBSyxHQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsR0FBRSxXQUFVO0FBQUMsVUFBSSxJQUFFLEtBQUssRUFBRSxDQUFDLEdBQUUsSUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLENBQUMsR0FBRSxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFFLFdBQUksSUFBRSxHQUFFLE1BQU0sR0FBRSxJQUFJLElBQUcsRUFBRSxDQUFDLElBQUUsS0FBRyxJQUFFLE9BQUssS0FBRyxNQUFJLENBQUMsSUFBRTtBQUFFLFdBQUksSUFBRSxJQUFFLEdBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRSxLQUFHLEtBQUcsR0FBRSxJQUFFLEVBQUUsQ0FBQyxLQUFHLEVBQUUsTUFBSSxJQUFFLElBQUUsS0FBRyxJQUFFLEtBQUcsSUFBRSxLQUFHLElBQUUsS0FBRyxHQUFFLElBQUUsS0FBRyxJQUFFLElBQUUsTUFBSSxJQUFHLEVBQUUsQ0FBQyxJQUFFLEdBQUUsRUFBRSxDQUFDLElBQUUsR0FBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLElBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFFLElBQUUsV0FBVSxJQUFFLFFBQVEsSUFBRSxNQUFNLElBQUUsV0FBVSxHQUFFLElBQUUsTUFBTSxFQUFFLENBQUMsSUFBRSxXQUFVLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsQ0FBQyxFQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLEdBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxLQUFHLE1BQUk7QUFBRSxXQUFJLElBQ2xnQixHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQztBQUFBLElBQUMsRUFBQztBQUNoRCxhQUFTLEdBQUcsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFHLE1BQUksRUFBRSxPQUFPLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsd0JBQXdCO0FBQUUsVUFBSSxJQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUUsRUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxFQUFFLFNBQU8sSUFBRSxHQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEtBQUUsRUFBRSxNQUFJLEVBQUUsSUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLElBQUUsRUFBRSxLQUFHLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFJLEVBQUUsSUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLElBQUUsRUFBRSxLQUFHLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBSSxFQUFFLElBQUUsRUFBRSxLQUFHLEtBQUcsR0FBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxDQUFDLEdBQUUsS0FBRyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRTtBQUFFLFdBQUksSUFDcmYsR0FBRSxJQUFFLEdBQUUsSUFBSSxHQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsQ0FBQyxJQUFFLEVBQUUsTUFBSSxFQUFFLEtBQUcsS0FBRyxFQUFFLEtBQUcsS0FBRyxHQUFHLEtBQUcsS0FBRyxFQUFFLEtBQUcsSUFBRSxHQUFHLEtBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxJQUFFLEVBQUUsR0FBRyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFO0FBQUUsYUFBTztBQUFBLElBQUM7QUFDaEgsSUFBQUEsTUFBSyxXQUFTLEVBQUMsVUFBUyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBRUEsTUFBSyxTQUFTLEVBQUUsRUFBRSxNQUFNLElBQUUsRUFBRSxHQUFFLE1BQUksSUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDO0FBQUUsYUFBTyxXQUFTLElBQUUsSUFBRUEsTUFBSyxTQUFTLE1BQU0sR0FBRSxJQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFLEtBQUssTUFBTSxDQUFDLElBQUUsSUFBRSxFQUFFO0FBQUUsZUFBUSxJQUFFLElBQUUsSUFBRSxLQUFHLE1BQUksRUFBRSxJQUFFLEtBQUcsQ0FBQyxLQUFHLEtBQUcsSUFBRSxFQUFFLElBQUUsS0FBRyxJQUFFLENBQUMsTUFBSSxJQUFFLEVBQUUsSUFBRSxLQUFHLENBQUMsTUFBSSxNQUFJLEtBQUcsS0FBRztBQUFBLElBQUMsR0FBRSxRQUFPLFNBQVMsR0FBRSxHQUFFO0FBQUMsVUFBRyxNQUFJLEVBQUUsVUFBUSxNQUFJLEVBQUUsT0FBTyxRQUFPLEVBQUUsT0FBTyxDQUFDO0FBQUUsVUFBSSxJQUFFLEVBQUUsRUFBRSxTQUFPLENBQUMsR0FBRSxJQUFFQSxNQUFLLFNBQVMsV0FBVyxDQUFDO0FBQUUsYUFBTyxPQUFLLElBQUUsRUFBRSxPQUFPLENBQUMsSUFBRUEsTUFBSyxTQUFTLEVBQUUsR0FBRSxHQUFFLElBQUUsR0FBRSxFQUFFLE1BQU0sR0FBRSxFQUFFLFNBQU8sQ0FBQyxDQUFDO0FBQUEsSUFBQyxHQUFFLFdBQVUsU0FBUyxHQUFFO0FBQUMsVUFBSSxJQUFFLEVBQUU7QUFBTyxhQUFPLE1BQzFmLElBQUUsSUFBRSxNQUFJLElBQUUsS0FBR0EsTUFBSyxTQUFTLFdBQVcsRUFBRSxJQUFFLENBQUMsQ0FBQztBQUFBLElBQUMsR0FBRSxPQUFNLFNBQVMsR0FBRSxHQUFFO0FBQUMsVUFBRyxLQUFHLEVBQUUsU0FBTyxFQUFFLFFBQU87QUFBRSxVQUFFLEVBQUUsTUFBTSxHQUFFLEtBQUssS0FBSyxJQUFFLEVBQUUsQ0FBQztBQUFFLFVBQUksSUFBRSxFQUFFO0FBQU8sVUFBRSxJQUFFO0FBQUcsVUFBRSxLQUFHLE1BQUksRUFBRSxJQUFFLENBQUMsSUFBRUEsTUFBSyxTQUFTLFFBQVEsR0FBRSxFQUFFLElBQUUsQ0FBQyxJQUFFLGNBQVksSUFBRSxHQUFFLENBQUM7QUFBRyxhQUFPO0FBQUEsSUFBQyxHQUFFLFNBQVEsU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDLGFBQU8sT0FBSyxJQUFFLEtBQUcsSUFBRSxJQUFFLElBQUUsS0FBRyxLQUFHLEtBQUcsZ0JBQWM7QUFBQSxJQUFDLEdBQUUsWUFBVyxTQUFTLEdBQUU7QUFBQyxhQUFPLEtBQUssTUFBTSxJQUFFLGFBQWEsS0FBRztBQUFBLElBQUUsR0FBRSxPQUFNLFNBQVMsR0FBRSxHQUFFO0FBQUMsVUFBR0EsTUFBSyxTQUFTLFVBQVUsQ0FBQyxNQUFJQSxNQUFLLFNBQVMsVUFBVSxDQUFDLEVBQUUsUUFBTTtBQUFHLFVBQUksSUFBRSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxNQUFHLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFFLGFBQU8sTUFDbGY7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJO0FBQUUsVUFBRTtBQUFFLFdBQUksV0FBUyxNQUFJLElBQUUsQ0FBQyxJQUFHLE1BQUksR0FBRSxLQUFHLEdBQUcsR0FBRSxLQUFLLENBQUMsR0FBRSxJQUFFO0FBQUUsVUFBRyxNQUFJLEVBQUUsUUFBTyxFQUFFLE9BQU8sQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksR0FBRSxLQUFLLElBQUUsRUFBRSxDQUFDLE1BQUksQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEtBQUcsS0FBRztBQUFFLFVBQUUsRUFBRSxTQUFPLEVBQUUsRUFBRSxTQUFPLENBQUMsSUFBRTtBQUFFLFVBQUVBLE1BQUssU0FBUyxXQUFXLENBQUM7QUFBRSxRQUFFLEtBQUtBLE1BQUssU0FBUyxRQUFRLElBQUUsSUFBRSxJQUFHLEtBQUcsSUFBRSxJQUFFLElBQUUsRUFBRSxJQUFJLEdBQUUsQ0FBQyxDQUFDO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFO0FBQUMsYUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQyxHQUFFLFdBQVUsU0FBUyxHQUFFO0FBQUMsVUFBSSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sRUFBRSxFQUFFLEtBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsTUFBSSxLQUFHLE1BQUksSUFBRSxTQUFRLElBQUUsVUFBUyxJQUFFLEtBQUc7QUFBRyxhQUFPO0FBQUEsSUFBQyxFQUFDO0FBQ3BkLElBQUFBLE1BQUssTUFBTSxhQUFXLEVBQUMsVUFBUyxTQUFTLEdBQUU7QUFBQyxVQUFJLElBQUUsSUFBRyxJQUFFQSxNQUFLLFNBQVMsVUFBVSxDQUFDLEdBQUUsR0FBRTtBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLElBQUksUUFBSyxJQUFFLE9BQUssSUFBRSxFQUFFLElBQUUsQ0FBQyxJQUFHLEtBQUcsT0FBTyxhQUFhLE1BQUksTUFBSSxNQUFJLENBQUMsR0FBRSxNQUFJO0FBQUUsYUFBTyxtQkFBbUIsT0FBTyxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxVQUFFLFNBQVMsbUJBQW1CLENBQUMsQ0FBQztBQUFFLFVBQUksSUFBRSxDQUFDLEdBQUUsR0FBRSxJQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxLQUFFLEtBQUcsSUFBRSxFQUFFLFdBQVcsQ0FBQyxHQUFFLE9BQUssSUFBRSxPQUFLLEVBQUUsS0FBSyxDQUFDLEdBQUUsSUFBRTtBQUFHLFVBQUUsS0FBRyxFQUFFLEtBQUtBLE1BQUssU0FBUyxRQUFRLEtBQUcsSUFBRSxJQUFHLENBQUMsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFDLEVBQUM7QUFDcFosSUFBQUEsTUFBSyxNQUFNLE1BQUksRUFBQyxVQUFTLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRSxJQUFHO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxRQUFLLEVBQUUsQ0FBQyxJQUFFLEtBQUcsaUJBQWdCLFNBQVMsRUFBRSxFQUFFLE9BQU8sQ0FBQztBQUFFLGFBQU8sRUFBRSxPQUFPLEdBQUVBLE1BQUssU0FBUyxVQUFVLENBQUMsSUFBRSxDQUFDO0FBQUEsSUFBQyxHQUFFLFFBQU8sU0FBUyxHQUFFO0FBQUMsVUFBSSxHQUFFLElBQUUsQ0FBQyxHQUFFO0FBQUUsVUFBRSxFQUFFLFFBQVEsVUFBUyxFQUFFO0FBQUUsVUFBRSxFQUFFO0FBQU8sVUFBRSxJQUFFO0FBQVcsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBRyxFQUFFLEdBQUUsS0FBSyxTQUFTLEVBQUUsT0FBTyxHQUFFLENBQUMsR0FBRSxFQUFFLElBQUUsQ0FBQztBQUFFLGFBQU9BLE1BQUssU0FBUyxNQUFNLEdBQUUsSUFBRSxDQUFDO0FBQUEsSUFBQyxFQUFDO0FBQzlWLElBQUFBLE1BQUssTUFBTSxTQUFPLEVBQUMsR0FBRSxvRUFBbUUsVUFBUyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUVBLE1BQUssTUFBTSxPQUFPLEdBQUUsSUFBRSxHQUFFLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUM7QUFBRSxZQUFJLElBQUUsRUFBRSxPQUFP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QyxHQUFFLEtBQUc7QUFBRSxVQUFFLE9BQU8sR0FBRSxLQUFHLENBQUM7QUFBQSxNQUFDLE1BQU0sTUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLElBQUUsTUFBTyxLQUFHLEdBQUUsS0FBRyxJQUFJLE1BQUssRUFBRSxFQUFFLE9BQU8sR0FBRSxFQUFFLENBQUM7QUFBRSxhQUFPO0FBQUEsSUFBSSxHQUFFLFVBQVMsV0FBVTtBQUFDLFVBQUksR0FBRSxJQUFFLEtBQUssR0FBRSxJQUFFLEtBQUssR0FBRSxJQUFFQSxNQUFLLFNBQVMsT0FBTyxHQUFFLENBQUNBLE1BQUssU0FBUyxRQUFRLEdBQUUsQ0FBQyxDQUFDLENBQUM7QUFBRSxXQUFJLElBQUUsRUFBRSxTQUFPLEdBQUUsSUFBRSxJQUFHLElBQUksR0FBRSxLQUFLLENBQUM7QUFBRSxRQUFFLEtBQUssS0FBSyxNQUFNLEtBQUssSUFBRSxVQUFXLENBQUM7QUFBRSxXQUFJLEVBQUUsS0FBSyxLQUFLLElBQUUsQ0FBQyxHQUFFLEVBQUUsU0FBUSxNQUFLLEVBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSyxNQUFNO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxHQUFFLFdBQVU7QUFBQyxlQUFTLEVBQUVDLElBQUU7QUFBQyxlQUFPLGNBQWFBLEtBQUUsS0FBSyxNQUFNQSxFQUFDLEtBQUc7QUFBQSxNQUFDO0FBQUMsZUFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEdBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUU7QUFBRyxhQUFJLElBQUUsR0FBRSxJQUFFLEtBQUcsR0FBRSxJQUFJLEtBQUcsTUFBSSxJQUFFLEdBQUU7QUFBQyxjQUN6ZjtBQUFHO0FBQUEsUUFBSztBQUFDLGNBQUksSUFBRSxNQUFJLEtBQUssRUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxHQUFFLENBQUMsSUFBRyxLQUFLLEVBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRTtBQUFBLE1BQUk7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQUUsR0FBRSxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUM7QUFBRSxXQUFJLElBQUUsR0FBRSxLQUFHLEdBQUUsSUFBSSxNQUFHLElBQUUsSUFBRSxFQUFFLENBQUMsS0FBRyxJQUFFLEVBQUUsSUFBRSxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsSUFBRSxLQUFHLEVBQUUsR0FBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLElBQUUsS0FBRyxLQUFHLEtBQUcsT0FBSyxNQUFJLEtBQUcsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxNQUFJLEVBQUUsSUFBRSxFQUFFLElBQUUsRUFBRSxJQUFFLElBQUUsRUFBRSxJQUFFLElBQUcsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLEtBQUcsS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLE1BQUksSUFBRSxLQUFHLElBQUUsTUFBSSxFQUFFLENBQUMsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsS0FBRyxJQUFFLElBQUUsS0FBRyxJQUFFLE9BQUssTUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLEtBQUcsS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLE1BQUk7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUNwZjtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBQSxJQUFDLEVBQUM7QUFBRSxJQUFBRCxNQUFLLEtBQUssU0FBTyxTQUFTLEdBQUU7QUFBQyxXQUFLLEVBQUUsQ0FBQyxLQUFHLEtBQUssRUFBRTtBQUFFLFdBQUcsS0FBSyxJQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxLQUFLLElBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEtBQUssSUFBRSxFQUFFLEtBQUcsS0FBSyxNQUFNO0FBQUEsSUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxPQUFPLE9BQUssU0FBUyxHQUFFO0FBQUMsYUFBTyxJQUFJQSxNQUFLLEtBQUssU0FBUSxPQUFPLENBQUMsRUFBRSxTQUFTO0FBQUEsSUFBQztBQUMvUyxJQUFBQSxNQUFLLEtBQUssT0FBTyxZQUFVLEVBQUMsV0FBVSxNQUFLLE9BQU0sV0FBVTtBQUFDLFdBQUssSUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDO0FBQUUsV0FBSyxJQUFFLENBQUM7QUFBRSxXQUFLLElBQUU7QUFBRSxhQUFPO0FBQUEsSUFBSSxHQUFFLFFBQU8sU0FBUyxHQUFFO0FBQUMsbUJBQVcsT0FBTyxNQUFJLElBQUVBLE1BQUssTUFBTSxXQUFXLE9BQU8sQ0FBQztBQUFHLFVBQUksR0FBRSxJQUFFLEtBQUssSUFBRUEsTUFBSyxTQUFTLE9BQU8sS0FBSyxHQUFFLENBQUM7QUFBRSxVQUFFLEtBQUs7QUFBRSxVQUFFLEtBQUssSUFBRSxJQUFFQSxNQUFLLFNBQVMsVUFBVSxDQUFDO0FBQUUsVUFBRyxtQkFBaUIsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHFDQUFxQztBQUFFLFVBQUcsZ0JBQWMsT0FBTyxhQUFZO0FBQUMsWUFBSSxJQUFFLElBQUksWUFBWSxDQUFDLEdBQUUsSUFBRTtBQUFFLGFBQUksSUFBRSxPQUFLLEtBQUcsT0FBSyxJQUFFLE9BQU0sS0FBRyxHQUFFLEtBQUcsS0FBSyxNQUFLLEVBQUUsRUFBRSxTQUFTLEtBQ3RmLEdBQUUsTUFBSSxJQUFFLEVBQUUsQ0FBQyxHQUFFLEtBQUc7QUFBRSxVQUFFLE9BQU8sR0FBRSxLQUFHLENBQUM7QUFBQSxNQUFDLE1BQU0sTUFBSSxJQUFFLE9BQUssS0FBRyxPQUFLLElBQUUsT0FBTSxLQUFHLEdBQUUsS0FBRyxLQUFLLE1BQUssRUFBRSxFQUFFLE9BQU8sR0FBRSxFQUFFLENBQUM7QUFBRSxhQUFPO0FBQUEsSUFBSSxHQUFFLFVBQVMsV0FBVTtBQUFDLFVBQUksR0FBRSxJQUFFLEtBQUssR0FBRSxJQUFFLEtBQUssR0FBRSxJQUFFQSxNQUFLLFNBQVMsT0FBTyxHQUFFLENBQUNBLE1BQUssU0FBUyxRQUFRLEdBQUUsQ0FBQyxDQUFDLENBQUM7QUFBRSxXQUFJLElBQUUsRUFBRSxTQUFPLEdBQUUsSUFBRSxJQUFHLElBQUksR0FBRSxLQUFLLENBQUM7QUFBRSxRQUFFLEtBQUssQ0FBQztBQUFFLFFBQUUsS0FBSyxDQUFDO0FBQUUsUUFBRSxLQUFLLEtBQUssTUFBTSxLQUFLLElBQUUsVUFBVyxDQUFDO0FBQUUsV0FBSSxFQUFFLEtBQUssS0FBSyxJQUFFLENBQUMsR0FBRSxFQUFFLFNBQVEsTUFBSyxFQUFFLEVBQUUsT0FBTyxHQUFFLEVBQUUsQ0FBQztBQUFFLFdBQUssTUFBTTtBQUFFLGFBQU87QUFBQSxJQUFDLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRyxDQUFDLFVBQVMsVUFBUyxTQUFRLFNBQVEsVUFBUyxTQUFRLFNBQVEsT0FBTyxHQUFFLEdBQUUsQ0FBQyxHQUFFLElBQUc7QUFBQSxNQUFDO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFDbGY7QUFBQSxNQUFRO0FBQUEsTUFBTztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBTztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBTztBQUFBLE1BQU87QUFBQSxNQUFPO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUNwZjtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsSUFBTyxHQUFFLEdBQUUsV0FBVTtBQUFDLGVBQVMsRUFBRUMsSUFBRTtBQUFDLGVBQU8sY0FBYUEsS0FBRSxLQUFLLE1BQU1BLEVBQUMsS0FBRztBQUFBLE1BQUM7QUFBQyxlQUFTLEVBQUVBLElBQUU7QUFBQyxlQUFPLGlCQUFlQSxLQUFFLEtBQUssTUFBTUEsRUFBQyxLQUFHO0FBQUEsTUFBRztBQUFDLGVBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxHQUFFLEdBQUUsS0FBRyxHQUFFLEtBQUk7QUFBQyxZQUFFO0FBQUcsYUFBSSxJQUFFLEdBQUUsSUFBRSxLQUFHLEdBQUUsSUFBSSxLQUFHLE1BQUksSUFBRSxHQUFFO0FBQUMsY0FBRTtBQUFHO0FBQUEsUUFBSztBQUFDLGNBQUksSUFBRSxNQUFJLEtBQUssRUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLEdBQUUsQ0FBQyxHQUFFLEtBQUssRUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsR0FBRSxDQUFDLEtBQUcsS0FBRyxLQUFLLEdBQUcsQ0FBQyxJQUFHLEtBQUssRUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLElBQUUsQ0FBQyxDQUFDLEdBQUUsS0FBSyxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxJQUFFLENBQUMsQ0FBQyxLQUFHLEtBQUcsS0FBSyxHQUFHLENBQUMsR0FBRTtBQUFBLE1BQUk7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQ3ZnQixHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRSxLQUFHLEVBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxFQUFFLEdBQUU7QUFBRSxVQUFHLGdCQUFjLE9BQU8sYUFBWTtBQUFDLFlBQUUsTUFBTSxHQUFHO0FBQUUsaUJBQVEsSUFBRSxHQUFFLEtBQUcsR0FBRSxJQUFJLEdBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQztBQUFBLE1BQUMsTUFBTSxLQUFFO0FBQUUsVUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRyxJQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsS0FBRyxHQUFFLEtBQUk7QUFBQyxZQUFHLEtBQUcsRUFBRSxLQUFFLEVBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLElBQUUsSUFBRSxDQUFDO0FBQUEsYUFBTTtBQUFDLGNBQUUsRUFBRSxLQUFHLElBQUUsR0FBRztBQUFFLGNBQUksSUFBRSxFQUFFLEtBQUcsSUFBRSxNQUFJLENBQUM7QUFBRSxlQUFHLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksS0FBRyxNQUFJO0FBQUUsY0FBSSxLQUFHLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSTtBQUFHLGNBQUUsRUFBRSxLQUFHLElBQUUsRUFBRTtBQUFFLGNBQUksSUFBRSxFQUFFLEtBQUcsSUFBRSxLQUFHLENBQUMsR0FDbmYsS0FBRyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsSUFBRSxNQUFJLE1BQUksTUFBSSxHQUFFLEtBQUcsS0FBRyxLQUFHLE1BQUksT0FBSyxLQUFHLElBQUUsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLElBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLEdBQUUsSUFBRSxFQUFFLEtBQUcsSUFBRSxNQUFJLENBQUM7QUFBRSxjQUFFLElBQUUsRUFBRSxLQUFHLElBQUUsS0FBRyxDQUFDO0FBQUUsY0FBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFO0FBQUcsZUFBRztBQUFFLGVBQUcsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBRyxlQUFHO0FBQUUsZUFBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFBLFFBQUU7QUFBQyxVQUFFLElBQUUsQ0FBQyxJQUFFLEtBQUc7QUFBRSxVQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsS0FBRztBQUFFLFlBQUksSUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEdBQUUsS0FBRyxJQUFFLElBQUUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsR0FBRSxLQUFHLElBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxHQUFFLEtBQUcsS0FBRyxJQUFFLE1BQUksT0FBSyxLQUFHLEtBQUcsTUFBSSxNQUFJLEtBQUcsS0FBRyxNQUFJLElBQUcsS0FBRyxLQUFHLElBQUUsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksSUFBRyxLQUFHLEVBQUUsSUFBRSxDQUFDLEdBQUUsS0FBRyxFQUFFLElBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxNQUFJLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksT0FBSyxLQUFHLEtBQUcsTUFBSSxLQUFJLElBQUUsTUFBSSxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FDcGYsS0FBRyxNQUFJLE9BQUssTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLElBQUcsSUFBRSxJQUFFLElBQUcsSUFBRSxLQUFHLEtBQUcsTUFBSSxJQUFFLE9BQUssSUFBRSxJQUFFLEtBQUksSUFBRSxJQUFFLElBQUcsSUFBRSxLQUFHLE1BQUksTUFBSSxJQUFFLE9BQUssSUFBRSxJQUFFLEtBQUksSUFBRSxJQUFFLElBQUUsR0FBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBSSxZQUFFLElBQUU7QUFBRyxZQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBRyxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFLElBQUUsSUFBRTtBQUFFLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRSxJQUFFLElBQUU7QUFBRSxZQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFBLE1BQUM7QUFBQyxVQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLEVBQUUsSUFBRSxJQUFFLElBQ25mO0FBQUUsUUFBRSxFQUFFLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLEVBQUUsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLEVBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsRUFBRSxJQUFFLEtBQUcsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFBLElBQUMsRUFBQztBQUN6SCxJQUFBRCxNQUFLLEtBQUssTUFBSSxFQUFDLE1BQUssT0FBTSxHQUFFLENBQUMsR0FBRSxnQkFBZSxTQUFTLEdBQUU7QUFBQyxNQUFBQSxNQUFLLEtBQUssSUFBSSxFQUFFLEtBQUssQ0FBQztBQUFBLElBQUMsR0FBRSxrQkFBaUIsU0FBUyxHQUFFO0FBQUMsVUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxRQUFRLENBQUM7QUFBRSxXQUFHLEtBQUdBLE1BQUssS0FBSyxJQUFJLEVBQUUsT0FBTyxHQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsSUFBRyxTQUFTLEdBQUU7QUFBQyxVQUFJLElBQUVBLE1BQUssS0FBSyxJQUFJLEVBQUUsTUFBTSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBRyxFQUFFLEdBQUUsQ0FBQyxFQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUksR0FBRSxJQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsSUFBRUEsTUFBSyxVQUFTLElBQUUsRUFBRSxVQUFVLENBQUMsSUFBRSxHQUFFLElBQUUsRUFBRSxVQUFVLENBQUMsSUFBRTtBQUFFLFVBQUUsS0FBRztBQUFHLFVBQUUsS0FBRyxDQUFDO0FBQUUsVUFBRyxJQUFFLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSxrQ0FBa0M7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLEdBQUUsSUFBSTtBQUFDLFVBQUUsS0FBRyxNQUFJLElBQUUsS0FBRztBQUFHLFVBQUUsRUFBRTtBQUFBLFFBQU07QUFBQSxRQUN0ZixLQUFHLEtBQUc7QUFBQSxNQUFFO0FBQUUsVUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLFVBQUVBLE1BQUssS0FBSyxJQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxhQUFPLEVBQUUsT0FBTyxFQUFFLE1BQUssRUFBRSxHQUFHO0FBQUEsSUFBQyxHQUFFLFNBQVEsU0FBUyxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFFLEtBQUc7QUFBRyxVQUFFLEtBQUcsQ0FBQztBQUFFLFVBQUksSUFBRUEsTUFBSyxVQUFTLElBQUUsRUFBRSxVQUFVLENBQUMsSUFBRSxHQUFFLElBQUUsRUFBRSxVQUFVLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBTSxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxTQUFTLEdBQUUsSUFBRSxDQUFDLEdBQUUsS0FBRyxJQUFFLEtBQUc7QUFBRSxVQUFHLElBQUUsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLGtDQUFrQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsR0FBRSxJQUFJO0FBQUMsVUFBRSxLQUFHLE1BQUksSUFBRSxLQUFHO0FBQUcsVUFBRSxFQUFFLE1BQU0sR0FBRSxLQUFHLEtBQUcsRUFBRTtBQUFFLFVBQUVBLE1BQUssS0FBSyxJQUFJLEVBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFFQSxNQUFLLEtBQUssSUFBSSxFQUFFLEdBQUUsRUFBRSxNQUFLLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSSxDQUFDLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx3QkFBd0I7QUFDeGhCLGFBQU8sRUFBRTtBQUFBLElBQUksR0FBRSxJQUFHLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsQ0FBQyxHQUFFLElBQUVBLE1BQUssVUFBUyxJQUFFLEVBQUU7QUFBRSxVQUFFLENBQUMsRUFBRSxRQUFRLElBQUcsRUFBRSxTQUFPLEtBQUcsS0FBRyxJQUFFLEtBQUcsSUFBRSxJQUFFLENBQUMsQ0FBQztBQUFFLFVBQUUsRUFBRSxPQUFPLEdBQUUsQ0FBQztBQUFFLFFBQUUsQ0FBQyxLQUFHO0FBQUUsVUFBRSxFQUFFLFFBQVEsQ0FBQztBQUFFLFVBQUcsRUFBRSxPQUFPLE1BQUksSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsU0FBTyxJQUFFLElBQUUsQ0FBQyxFQUFFLFFBQVEsSUFBRyxDQUFDLENBQUMsSUFBRSxjQUFZLE1BQUksSUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLFFBQVEsSUFBRyxLQUFLLENBQUMsR0FBRSxDQUFDLENBQUMsQ0FBQyxJQUFHLElBQUUsRUFBRSxPQUFPLEdBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEVBQUUsS0FBRSxFQUFFLFFBQVEsRUFBRSxHQUFFLEVBQUUsTUFBTSxHQUFFLElBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFQSxNQUFLLFVBQVMsSUFBRSxFQUFFO0FBQUUsV0FBRztBQUFFLFVBQUcsSUFBRSxLQUFHLElBQUUsS0FBRyxLQUFHLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx5QkFBeUI7QUFDbmYsVUFBRyxhQUFXLEVBQUUsVUFBUSxhQUFXLEVBQUUsT0FBTyxPQUFNLElBQUlBLE1BQUssVUFBVSxJQUFJLHdDQUF3QztBQUFFLFVBQUVBLE1BQUssS0FBSyxJQUFJLEdBQUcsR0FBRSxHQUFFLEdBQUUsR0FBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLEtBQUcsRUFBRSxLQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUUsRUFBRSxNQUFNLEdBQUUsSUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUUsYUFBTyxFQUFFLE1BQU0sR0FBRSxJQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxHQUFFLElBQUVBLE1BQUs7QUFBUyxVQUFFLEVBQUU7QUFBRSxVQUFJLElBQUUsRUFBRSxRQUFPLElBQUUsRUFBRSxVQUFVLENBQUMsR0FBRSxJQUFFLElBQUUsSUFBRyxJQUFFO0FBQUUsVUFBRSxFQUFFLE9BQU8sQ0FBQyxFQUFFLFFBQVEsR0FBRSxJQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRSxHQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sR0FBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFHLENBQUMsRUFBRSxRQUFNLEVBQUMsS0FBSSxHQUFFLE1BQUssQ0FBQyxFQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxLQUFFLE1BQUlBLE1BQUssS0FBSyxJQUFJLEdBQUcsSUFDcmdCLENBQUMsR0FBRSxLQUFHLElBQUcsRUFBRSxDQUFDLEtBQUksSUFBRSxFQUFFLFFBQVEsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLEdBQUUsRUFBRSxJQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsR0FBRSxFQUFFLElBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQztBQUFFLGFBQU0sRUFBQyxLQUFJLEdBQUUsTUFBSyxFQUFFLE1BQU0sR0FBRSxDQUFDLEVBQUM7QUFBQSxJQUFDLEVBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssT0FBSyxTQUFTLEdBQUUsR0FBRTtBQUFDLFdBQUssSUFBRSxJQUFFLEtBQUdBLE1BQUssS0FBSztBQUFPLFVBQUksSUFBRSxDQUFDLENBQUMsR0FBRSxDQUFDLENBQUMsR0FBRSxHQUFFLElBQUUsRUFBRSxVQUFVLFlBQVU7QUFBRyxXQUFLLElBQUUsQ0FBQyxJQUFJLEtBQUUsSUFBSSxHQUFDO0FBQUUsUUFBRSxTQUFPLE1BQUksSUFBRSxFQUFFLEtBQUssQ0FBQztBQUFHLFdBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsQ0FBQyxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxXQUFVLEVBQUUsQ0FBQyxFQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRTtBQUFXLFdBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUFFLFdBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztBQUFFLFdBQUssSUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUFBLElBQUM7QUFDM1ksSUFBQUEsTUFBSyxLQUFLLEtBQUssVUFBVSxVQUFRQSxNQUFLLEtBQUssS0FBSyxVQUFVLE1BQUksU0FBUyxHQUFFO0FBQUMsVUFBRyxLQUFLLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx5Q0FBeUM7QUFBRSxXQUFLLE9BQU8sQ0FBQztBQUFFLGFBQU8sS0FBSyxPQUFPLENBQUM7QUFBQSxJQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLEtBQUssVUFBVSxRQUFNLFdBQVU7QUFBQyxXQUFLLElBQUUsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFBLElBQUU7QUFBRSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFNBQU8sU0FBUyxHQUFFO0FBQUMsV0FBSyxJQUFFO0FBQUcsV0FBSyxFQUFFLE9BQU8sQ0FBQztBQUFBLElBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFNBQU8sV0FBVTtBQUFDLFVBQUksSUFBRSxLQUFLLEVBQUUsU0FBUyxHQUFFLElBQUcsSUFBSSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFHLE9BQU8sQ0FBQyxFQUFFLFNBQVM7QUFBRSxXQUFLLE1BQU07QUFBRSxhQUFPO0FBQUEsSUFBQztBQUN2ZSxJQUFBQSxNQUFLLEtBQUssU0FBTyxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUUsS0FBRztBQUFJLFVBQUcsSUFBRSxLQUFHLElBQUUsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLDBCQUEwQjtBQUFFLG1CQUFXLE9BQU8sTUFBSSxJQUFFQSxNQUFLLE1BQU0sV0FBVyxPQUFPLENBQUM7QUFBRyxtQkFBVyxPQUFPLE1BQUksSUFBRUEsTUFBSyxNQUFNLFdBQVcsT0FBTyxDQUFDO0FBQUcsVUFBRSxLQUFHQSxNQUFLLEtBQUs7QUFBSyxVQUFFLElBQUksRUFBRSxDQUFDO0FBQUUsVUFBSSxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUVBLE1BQUs7QUFBUyxXQUFJLElBQUUsR0FBRSxLQUFHLEVBQUUsVUFBUSxLQUFHLElBQUcsS0FBSTtBQUFDLFlBQUUsSUFBRSxFQUFFLFFBQVEsRUFBRSxPQUFPLEdBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFFLGFBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFJLE1BQUksSUFBRSxFQUFFLFFBQVEsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLEdBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQztBQUFFLFlBQUUsRUFBRSxPQUFPLENBQUM7QUFBQSxNQUFDO0FBQUMsWUFBSSxJQUFFLEVBQUUsTUFBTSxHQUFFLENBQUM7QUFBRyxhQUFPO0FBQUEsSUFBQztBQUNuZCxJQUFBQSxNQUFLLE9BQUssU0FBUyxHQUFFO0FBQUMsV0FBSyxJQUFFLENBQUMsSUFBSUEsTUFBSyxLQUFLLFFBQU07QUFBRSxXQUFLLElBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxJQUFFO0FBQUUsV0FBSyxJQUFFLENBQUM7QUFBRSxXQUFLLElBQUU7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRSxLQUFLLElBQUUsS0FBSyxJQUFFLEtBQUssS0FBRztBQUFFLFdBQUssSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLFdBQUssSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxXQUFLLElBQUU7QUFBTyxXQUFLLElBQUU7QUFBRSxXQUFLLElBQUU7QUFBRyxXQUFLLElBQUUsRUFBQyxVQUFTLENBQUMsR0FBRSxRQUFPLENBQUMsRUFBQztBQUFFLFdBQUssSUFBRSxLQUFLLEtBQUc7QUFBRSxXQUFLLElBQUU7QUFBRSxXQUFLLElBQUU7QUFBRSxXQUFLLEtBQUc7QUFBUSxXQUFLLElBQUUsQ0FBQyxHQUFFLElBQUcsSUFBRyxJQUFHLEtBQUksS0FBSSxLQUFNLEtBQUksS0FBSSxLQUFJLElBQUk7QUFBRSxXQUFLLEtBQUc7QUFBSSxXQUFLLElBQUU7QUFBQSxJQUFFO0FBQ3pXLElBQUFBLE1BQUssS0FBSyxZQUFVO0FBQUEsTUFBQyxhQUFZLFNBQVMsR0FBRSxHQUFFO0FBQUMsWUFBSSxJQUFFLENBQUMsR0FBRTtBQUFFLFlBQUUsS0FBSyxRQUFRLENBQUM7QUFBRSxZQUFJO0FBQUUsWUFBRyxNQUFJLEtBQUssRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxTQUFTLHdCQUF3QjtBQUFFLFlBQUcsSUFBRSxLQUFLLEdBQUU7QUFBQyxjQUFFLEVBQUUsSUFBRSxLQUFLO0FBQUcsY0FBRSxDQUFDO0FBQUUsY0FBSSxJQUFFLEdBQUU7QUFBRSxlQUFLLElBQUUsRUFBRSxDQUFDLEtBQUcsb0JBQUksUUFBTSxRQUFRLElBQUUsS0FBSztBQUFHLGVBQUksSUFBRSxHQUFFLEtBQUcsR0FBRSxJQUFJLEdBQUUsS0FBSyxhQUFZLEtBQUssT0FBTyxJQUFFLENBQUM7QUFBRSxlQUFJLElBQUUsR0FBRSxJQUFFLEtBQUssRUFBRSxXQUFTLElBQUUsRUFBRSxPQUFPLEtBQUssRUFBRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUUsS0FBRyxLQUFLLEVBQUUsQ0FBQyxHQUFFLEtBQUssRUFBRSxDQUFDLElBQUUsR0FBRSxLQUFHLEVBQUUsS0FBSyxJQUFFLEtBQUcsS0FBSSxJQUFJO0FBQUMsZUFBSyxLQUFHLEtBQUcsS0FBSyxFQUFFLFdBQVMsS0FBSyxFQUFFLEtBQUssSUFBSUEsTUFBSyxLQUFLLFFBQU0sR0FBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0FBQUcsZUFBSyxLQUFHO0FBQUUsY0FBRSxLQUFLLE1BQUksS0FBSyxJQUN2ZjtBQUFHLGVBQUs7QUFBSSxlQUFLLElBQUVBLE1BQUssS0FBSyxPQUFPLEtBQUssS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQUUsZUFBSyxJQUFFLElBQUlBLE1BQUssT0FBTyxJQUFJLEtBQUssQ0FBQztBQUFFLGVBQUksSUFBRSxHQUFFLElBQUUsTUFBSSxLQUFLLEVBQUUsQ0FBQyxJQUFFLEtBQUssRUFBRSxDQUFDLElBQUUsSUFBRSxHQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBRyxJQUFJO0FBQUEsUUFBQztBQUFDLGFBQUksSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFHLEVBQUUsUUFBSyxJQUFFLEtBQUcsS0FBSyxNQUFJLEdBQUcsSUFBSSxHQUFFLElBQUUsRUFBRSxJQUFJLEdBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxHQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBRyxJQUFJO0FBQUUsZUFBTyxFQUFFLE1BQU0sR0FBRSxDQUFDO0FBQUEsTUFBQztBQUFBLE1BQUUsb0JBQW1CLFNBQVMsR0FBRSxHQUFFO0FBQUMsWUFBRyxNQUFJLEtBQUcsMEVBQXdFLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSxxRUFBcUU7QUFBRSxhQUFLLElBQUU7QUFBQSxNQUFDO0FBQUEsTUFBRSxZQUFXLFNBQVMsR0FDbGdCLEdBQUUsR0FBRTtBQUFDLFlBQUUsS0FBRztBQUFPLFlBQUksR0FBRSxHQUFFLEtBQUcsb0JBQUksUUFBTSxRQUFRLEdBQUUsSUFBRSxLQUFLLEVBQUUsQ0FBQyxHQUFFLElBQUUsS0FBSyxRQUFRLEdBQUUsSUFBRTtBQUFFLFlBQUUsS0FBSyxFQUFFLENBQUM7QUFBRSxtQkFBUyxNQUFJLElBQUUsS0FBSyxFQUFFLENBQUMsSUFBRSxLQUFLO0FBQU0sbUJBQVMsTUFBSSxJQUFFLEtBQUssRUFBRSxDQUFDLElBQUU7QUFBRyxhQUFLLEVBQUUsQ0FBQyxLQUFHLEtBQUssRUFBRSxDQUFDLElBQUUsS0FBRyxLQUFLLEVBQUU7QUFBTyxnQkFBTyxPQUFPLEdBQUU7QUFBQSxVQUFDLEtBQUs7QUFBUyx1QkFBUyxNQUFJLElBQUU7QUFBRyxpQkFBSyxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRSxLQUFLLEtBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLENBQUMsQ0FBQztBQUFFO0FBQUEsVUFBTSxLQUFLO0FBQVMsZ0JBQUUsT0FBTyxVQUFVLFNBQVMsS0FBSyxDQUFDO0FBQUUsZ0JBQUcsMkJBQXlCLEdBQUU7QUFBQyxrQkFBRSxDQUFDO0FBQUUsbUJBQUksSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksR0FBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUUsa0JBQUU7QUFBQSxZQUFDLE1BQU0sTUFBSSxxQkFBbUIsTUFBSSxJQUFFLElBQUcsSUFBRSxHQUFFLElBQUUsRUFBRSxVQUFRLENBQUMsR0FBRSxJQUFJLGNBQVcsT0FBTyxFQUFFLENBQUMsTUFDbmYsSUFBRTtBQUFHLGdCQUFHLENBQUMsR0FBRTtBQUFDLGtCQUFHLFdBQVMsRUFBRSxNQUFJLElBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksTUFBSSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsSUFBRyxNQUFJLElBQUUsTUFBSTtBQUFFLG1CQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFFLEtBQUssS0FBSSxHQUFFLEdBQUUsR0FBRSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUFBLFlBQUM7QUFBQztBQUFBLFVBQU0sS0FBSztBQUFTLHVCQUFTLE1BQUksSUFBRSxFQUFFO0FBQVEsaUJBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDLEdBQUUsS0FBSyxLQUFJLEdBQUUsR0FBRSxHQUFFLEVBQUUsTUFBTSxDQUFDO0FBQUUsaUJBQUssRUFBRSxDQUFDLEVBQUUsT0FBTyxDQUFDO0FBQUU7QUFBQSxVQUFNO0FBQVEsZ0JBQUU7QUFBQSxRQUFDO0FBQUMsWUFBRyxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLElBQUkscUVBQXFFO0FBQUUsYUFBSyxFQUFFLENBQUMsS0FBRztBQUFFLGFBQUssS0FBRztBQUFFLGNBQUksS0FBSyxNQUFJLEtBQUssUUFBUSxNQUFJLEtBQUssS0FBRyxHQUFHLFVBQVMsS0FBSyxJQUFJLEtBQUssR0FBRSxLQUFLLENBQUMsQ0FBQyxHQUFFLEdBQUcsWUFBVyxLQUFLLFlBQVksQ0FBQztBQUFBLE1BQUU7QUFBQSxNQUN0ZixTQUFRLFNBQVMsR0FBRTtBQUFDLFlBQUUsS0FBSyxFQUFFLFdBQVMsSUFBRSxJQUFFLEtBQUssQ0FBQztBQUFFLGVBQU8sS0FBSyxLQUFHLEtBQUssS0FBRyxJQUFFLEtBQUssRUFBRSxDQUFDLElBQUUsS0FBSyxNQUFJLG9CQUFJLFFBQU0sUUFBUSxJQUFFLEtBQUssSUFBRSxLQUFLLElBQUUsS0FBSyxJQUFFLEtBQUssSUFBRSxLQUFLLEtBQUcsSUFBRSxLQUFLLElBQUUsS0FBSyxJQUFFLEtBQUs7QUFBQSxNQUFD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LFVBQUUsS0FBRyxDQUFDO0FBQUUsVUFBRSxLQUFHLENBQUM7QUFBRSxVQUFJLElBQUVBLE1BQUs7QUFBSyxVQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsR0FBRSxFQUFFLFFBQVEsR0FBRSxDQUFDLEdBQUUsR0FBRSxJQUFFO0FBQUUsVUFBSSxHQUFFO0FBQUUsVUFBRSxFQUFFO0FBQU0sbUJBQVcsT0FBTyxFQUFFLFNBQU8sRUFBRSxPQUFLQSxNQUFLLE1BQU0sT0FBTyxPQUFPLEVBQUUsSUFBSTtBQUFHLG1CQUFXLE9BQU8sRUFBRSxPQUFLLEVBQUUsS0FBR0EsTUFBSyxNQUFNLE9BQU8sT0FBTyxFQUFFLEVBQUU7QUFBRyxVQUFHLENBQUNBLE1BQUssS0FBSyxFQUFFLElBQUksS0FBRyxDQUFDQSxNQUFLLE9BQU8sRUFBRSxNQUFNLEtBQUcsYUFDbGYsT0FBTyxLQUFHLE9BQUssRUFBRSxRQUFNLE9BQUssRUFBRSxNQUFJLE9BQUssRUFBRSxNQUFJLFFBQU0sRUFBRSxNQUFJLFFBQU0sRUFBRSxNQUFJLFFBQU0sRUFBRSxNQUFJLFFBQVEsRUFBRSxNQUFJLENBQUMsRUFBRSxNQUFJLElBQUUsRUFBRSxHQUFHLFVBQVEsSUFBRSxFQUFFLEdBQUcsT0FBTyxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLGtDQUFrQztBQUFFLG1CQUFXLE9BQU8sS0FBRyxJQUFFQSxNQUFLLEtBQUssYUFBYSxHQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsSUFBSSxNQUFNLEdBQUUsRUFBRSxLQUFHLEVBQUUsR0FBRSxFQUFFLE9BQUssRUFBRSxRQUFNQSxNQUFLLE9BQUssYUFBYUEsTUFBSyxJQUFJLFFBQVEsY0FBWSxJQUFFLEVBQUUsTUFBTUEsTUFBSyxNQUFNLE9BQU8sT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sR0FBRSxFQUFFLEtBQUcsRUFBRTtBQUFHLG1CQUFXLE9BQU8sTUFBSSxJQUFFQSxNQUFLLE1BQU0sV0FBVyxPQUFPLENBQUM7QUFBRyxVQUFFLElBQUlBLE1BQUss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RUFBRSxDQUFDLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSwrQkFBK0I7QUFBRSxVQUFFLENBQUMsSUFBRSxFQUFFLENBQUM7QUFBQSxNQUFDO0FBQUMsYUFBTztBQUFBLElBQUMsR0FBRSxJQUFHLFNBQVMsR0FBRSxHQUFFO0FBQUMsVUFBSSxJQUFFLENBQUMsR0FBRTtBQUFFLFdBQUksS0FBSyxFQUFFLEdBQUUsZUFBZSxDQUFDLEtBQUcsRUFBRSxDQUFDLE1BQUksRUFBRSxDQUFDLE1BQUksRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUcsYUFBTztBQUFBLElBQUMsR0FBRSxJQUFHLFNBQVMsR0FDNWYsR0FBRTtBQUFDLFVBQUksSUFBRSxDQUFDLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLFlBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQUcsYUFBTztBQUFBLElBQUMsRUFBQztBQUFFLElBQUFBLE1BQUssVUFBUUEsTUFBSyxLQUFLO0FBQVEsSUFBQUEsTUFBSyxVQUFRQSxNQUFLLEtBQUs7QUFBUSxJQUFBQSxNQUFLLEtBQUssS0FBRyxDQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLGVBQWEsU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUVBLE1BQUssS0FBSyxJQUFHO0FBQUUsVUFBRSxLQUFHLENBQUM7QUFBRSxVQUFFLEVBQUUsUUFBTTtBQUFJLFVBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUcsQ0FBQztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEtBQUcsRUFBQyxXQUFVLEVBQUUsUUFBTSxFQUFFLEtBQUssU0FBTyxFQUFFLEtBQUssTUFBTSxDQUFDLElBQUVBLE1BQUssT0FBTyxZQUFZLEdBQUUsQ0FBQyxFQUFDO0FBQUUsVUFBRSxXQUFTLEVBQUUsT0FBSyxFQUFFLFlBQVUsRUFBRTtBQUFLLFFBQUUsQ0FB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QUFNO0FBRTNELFNBQUssWUFBWSxFQUFFLCtDQUE2QixDQUFDO0FBQUEsRUFDbkQsQ0FBQztBQUVELGdCQUFjLE1BQU0sSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFVO0FBQzFDLFNBQUssWUFBWTtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFnQjtBQUFBLEVBQ2xCLENBQUM7QUFDSDtBQUVBLElBQU0sZ0JBQWdCLENBQ3BCLGtCQUVBLGNBQWMsY0FBYyxLQUFLLFVBQVUsQ0FBQzsiLAogICJuYW1lcyI6IFsiUmVmbGVjdEFwcGx5IiwgIlJlZmxlY3RPd25LZXlzIiwgIk51bWJlcklzTmFOIiwgIkV2ZW50RW1pdHRlciIsICJldmVudHMiLCAiZXJyIiwgIm9uY2UiLCAic2pjbCIsICJhIiwgInYiLCAib2siLCAiZXJyIiwgIlJlc3VsdCIsICJmcm9tVGhyb3dhYmxlIiwgIm9rIiwgImVyciIsICJzZWxmIiwgIkV2ZW50RW1pdHRlciIsICJvYmoiLCAiRGVjb2RlIiwgIm9iaiIsICJzamNsIiwgImRlY3J5cHQiLCAiRGVjb2RlIiwgImRlY3J5cHQiLCAiZGVjcnlwdCJdCn0K
