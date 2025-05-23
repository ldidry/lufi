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
    function EventEmitter3() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter3.prototype.eventNames = function eventNames() {
      var names = [], events2, name;
      if (this._eventsCount === 0) return names;
      for (name in events2 = this._events) {
        if (has.call(events2, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events2));
      }
      return names;
    };
    EventEmitter3.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter3.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter3.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
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
    EventEmitter3.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter3.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter3.prototype.removeListener = function removeListener(event, fn, context, once) {
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
        for (var i = 0, events2 = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events2.push(listeners[i]);
          }
        }
        if (events2.length) this._events[evt] = events2.length === 1 ? events2[0] : events2;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter3.prototype.removeAllListeners = function removeAllListeners(event) {
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
    EventEmitter3.prototype.off = EventEmitter3.prototype.removeListener;
    EventEmitter3.prototype.addListener = EventEmitter3.prototype.on;
    EventEmitter3.prefixed = prefix;
    EventEmitter3.EventEmitter = EventEmitter3;
    if ("undefined" !== typeof module) {
      module.exports = EventEmitter3;
    }
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
var sendFileError = (lufiFile, error) => {
  updateFile(lufiFile, { uploadStatus: 2 /* FAILED */ });
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

// src/worker/download.ts
var QUEUE_CONCURRENCY_LIMIT = navigator.hardwareConcurrency || 1;
var queue = new PQueue({
  concurrency: QUEUE_CONCURRENCY_LIMIT
});
var itemsInQueue = 0;
var isInitiated = false;
var isPaused = false;
self.onmessage = (event) => {
  if (!isInitiated) {
    init();
    isInitiated = true;
    events.once("DOWNLOAD_STARTED" /* DOWNLOAD_STARTED */, () => {
      self.postMessage({ event: "DOWNLOAD_STARTED" /* DOWNLOAD_STARTED */ });
    });
    events.once("DOWNLOAD_COMPLETE" /* DOWNLOAD_COMPLETE */, () => {
      self.postMessage({ event: "DOWNLOAD_COMPLETE" /* DOWNLOAD_COMPLETE */ });
    });
    events.on("FILE_UPDATED" /* FILE_UPDATED */, updateFile);
    events.on(
      "CHUNK_DOWNLOADED" /* CHUNK_DOWNLOADED */,
      (buffer, index) => {
        itemsInQueue--;
        if (!isPaused && itemsInQueue < QUEUE_CONCURRENCY_LIMIT) {
          queue.start();
        }
        self.postMessage({
          event: "CHUNK_DOWNLOADED" /* CHUNK_DOWNLOADED */,
          chunk: { buffer, index }
        }, [buffer]);
      }
    );
  }
  const data = event.data;
  switch (data.action) {
    case 0 /* PAUSE */:
      {
        isPaused = true;
        self.postMessage({ event: "JOB_PAUSED" /* JOB_PAUSED */ });
      }
      break;
    case 2 /* RESUME */:
      {
        isPaused = false;
        self.postMessage({ event: "JOB_RESUMED" /* JOB_RESUMED */ });
      }
      break;
    default:
      download(data).mapErr((error) => {
        sendFileError(data.args.lufiFile, error);
      });
  }
};
var download = (workerMessage) => {
  const { lufiFile } = workerMessage.args;
  events.on("DOWNLOAD_STARTED" /* DOWNLOAD_STARTED */, async () => {
    for (let i = 1; i < lufiFile.totalChunks; i++) {
      if (!isPaused && itemsInQueue < QUEUE_CONCURRENCY_LIMIT) {
        queue.start();
      }
      await queue.add(async () => {
        await downloadChunk(lufiFile, i);
        itemsInQueue++;
        if (isPaused || itemsInQueue === QUEUE_CONCURRENCY_LIMIT) {
          queue.pause();
        }
      });
    }
  });
  itemsInQueue++;
  return downloadChunk(lufiFile, 0);
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vbHVmaS1zamNsQDEuMC44L25vZGVfbW9kdWxlcy9sdWZpLXNqY2wvc2pjbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vZXZlbnRlbWl0dGVyM0A1LjAuMS9ub2RlX21vZHVsZXMvZXZlbnRlbWl0dGVyMy9pbmRleC5qcyIsICIuLi8uLi9zcmMvd29ya2VyL3NoYXJlZC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vbmV2ZXJ0aHJvd0A4LjEuMS9ub2RlX21vZHVsZXMvbmV2ZXJ0aHJvdy9kaXN0L2luZGV4LmVzLmpzIiwgIi4uLy4uL3NyYy9lcnJvci9iYXNlLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWNvbm5lY3Rpb24tZXJyb3IudHMiLCAiLi4vLi4vc3JjL3V0aWxzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9hcnJheWJ1ZmZlci1lbmNvZGluZ0AxLjEuMC9ub2RlX21vZHVsZXMvYXJyYXlidWZmZXItZW5jb2Rpbmcvc3JjL2Jhc2U2NC9lbmNvZGluZy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vYXJyYXlidWZmZXItZW5jb2RpbmdAMS4xLjAvbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLWVuY29kaW5nL3NyYy9iYXNlNjQvc3RhbmRhcmQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2FycmF5YnVmZmVyLWVuY29kaW5nQDEuMS4wL25vZGVfbW9kdWxlcy9hcnJheWJ1ZmZlci1lbmNvZGluZy9zcmMvYmFzZTY0L3VybC50cyIsICIuLi8uLi9zcmMvYXBpL2NyeXB0by9zamNsLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vZGVjcnlwdGlvbi1lcnJvci50cyIsICIuLi8uLi9zcmMvYXBpL2NyeXB0by93ZWIudHMiLCAiLi4vLi4vc3JjL2FwaS9jcnlwdG8udHMiLCAiLi4vLi4vc3JjL2FwaS93ZWJzb2NrZXQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50ZW1pdHRlcjNANS4wLjEvbm9kZV9tb2R1bGVzL2V2ZW50ZW1pdHRlcjMvaW5kZXgubWpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9wLXRpbWVvdXRANi4xLjMvbm9kZV9tb2R1bGVzL3AtdGltZW91dC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vcC1xdWV1ZUA4LjAuMS9ub2RlX21vZHVsZXMvcC1xdWV1ZS9kaXN0L2xvd2VyLWJvdW5kLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9wLXF1ZXVlQDguMC4xL25vZGVfbW9kdWxlcy9wLXF1ZXVlL2Rpc3QvcHJpb3JpdHktcXVldWUuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL3AtcXVldWVAOC4wLjEvbm9kZV9tb2R1bGVzL3AtcXVldWUvZGlzdC9pbmRleC5qcyIsICIuLi8uLi9zcmMvd29ya2VyL2Rvd25sb2FkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwgIlwidXNlIHN0cmljdFwiO3ZhciBzamNsPXtjaXBoZXI6e30saGFzaDp7fSxrZXlleGNoYW5nZTp7fSxtb2RlOnt9LG1pc2M6e30sY29kZWM6e30sZXhjZXB0aW9uOntjb3JydXB0OmZ1bmN0aW9uKGEpe3RoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIkNPUlJVUFQ6IFwiK3RoaXMubWVzc2FnZX07dGhpcy5tZXNzYWdlPWF9LGludmFsaWQ6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiSU5WQUxJRDogXCIrdGhpcy5tZXNzYWdlfTt0aGlzLm1lc3NhZ2U9YX0sYnVnOmZ1bmN0aW9uKGEpe3RoaXMudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm5cIkJVRzogXCIrdGhpcy5tZXNzYWdlfTt0aGlzLm1lc3NhZ2U9YX0sbm90UmVhZHk6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiTk9UIFJFQURZOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfX19O1xuc2pjbC5jaXBoZXIuYWVzPWZ1bmN0aW9uKGEpe3RoaXMud1swXVswXVswXXx8dGhpcy5DKCk7dmFyIGIsYyxkLGUsZj10aGlzLndbMF1bNF0sZz10aGlzLndbMV07Yj1hLmxlbmd0aDt2YXIgaD0xO2lmKDQhPT1iJiY2IT09YiYmOCE9PWIpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJpbnZhbGlkIGFlcyBrZXkgc2l6ZVwiKTt0aGlzLmI9W2Q9YS5zbGljZSgwKSxlPVtdXTtmb3IoYT1iO2E8NCpiKzI4O2ErKyl7Yz1kW2EtMV07aWYoMD09PWElYnx8OD09PWImJjQ9PT1hJWIpYz1mW2M+Pj4yNF08PDI0XmZbYz4+MTYmMjU1XTw8MTZeZltjPj44JjI1NV08PDheZltjJjI1NV0sMD09PWElYiYmKGM9Yzw8OF5jPj4+MjReaDw8MjQsaD1oPDwxXjI4MyooaD4+NykpO2RbYV09ZFthLWJdXmN9Zm9yKGI9MDthO2IrKyxhLS0pYz1kW2ImMz9hOmEtNF0sZVtiXT00Pj1hfHw0PmI/YzpnWzBdW2ZbYz4+PjI0XV1eZ1sxXVtmW2M+PjE2JjI1NV1dXmdbMl1bZltjPj44JjI1NV1dXmdbM11bZltjJlxuMjU1XV19O1xuc2pjbC5jaXBoZXIuYWVzLnByb3RvdHlwZT17ZW5jcnlwdDpmdW5jdGlvbihhKXtyZXR1cm4gYWEodGhpcyxhLDApfSxkZWNyeXB0OmZ1bmN0aW9uKGEpe3JldHVybiBhYSh0aGlzLGEsMSl9LHc6W1tbXSxbXSxbXSxbXSxbXV0sW1tdLFtdLFtdLFtdLFtdXV0sQzpmdW5jdGlvbigpe3ZhciBhPXRoaXMud1swXSxiPXRoaXMud1sxXSxjPWFbNF0sZD1iWzRdLGUsZixnLGg9W10saz1bXSxuLGwsbSxwO2ZvcihlPTA7MHgxMDA+ZTtlKyspa1soaFtlXT1lPDwxXjI4MyooZT4+NykpXmVdPWU7Zm9yKGY9Zz0wOyFjW2ZdO2ZePW58fDEsZz1rW2ddfHwxKWZvcihtPWdeZzw8MV5nPDwyXmc8PDNeZzw8NCxtPW0+PjhebSYyNTVeOTksY1tmXT1tLGRbbV09ZixsPWhbZT1oW249aFtmXV1dLHA9MHgxMDEwMTAxKmxeMHgxMDAwMSplXjB4MTAxKm5eMHgxMDEwMTAwKmYsbD0weDEwMSpoW21dXjB4MTAxMDEwMCptLGU9MDs0PmU7ZSsrKWFbZV1bZl09bD1sPDwyNF5sPj4+OCxiW2VdW21dPXA9cDw8MjRecD4+Pjg7Zm9yKGU9XG4wOzU+ZTtlKyspYVtlXT1hW2VdLnNsaWNlKDApLGJbZV09YltlXS5zbGljZSgwKX19O1xuZnVuY3Rpb24gYWEoYSxiLGMpe2lmKDQhPT1iLmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImludmFsaWQgYWVzIGJsb2NrIHNpemVcIik7dmFyIGQ9YS5iW2NdLGU9YlswXV5kWzBdLGY9YltjPzM6MV1eZFsxXSxnPWJbMl1eZFsyXTtiPWJbYz8xOjNdXmRbM107dmFyIGgsayxuLGw9ZC5sZW5ndGgvNC0yLG0scD00LHo9WzAsMCwwLDBdO2g9YS53W2NdO2E9aFswXTt2YXIgQT1oWzFdLEM9aFsyXSxCPWhbM10sRD1oWzRdO2ZvcihtPTA7bTxsO20rKyloPWFbZT4+PjI0XV5BW2Y+PjE2JjI1NV1eQ1tnPj44JjI1NV1eQltiJjI1NV1eZFtwXSxrPWFbZj4+PjI0XV5BW2c+PjE2JjI1NV1eQ1tiPj44JjI1NV1eQltlJjI1NV1eZFtwKzFdLG49YVtnPj4+MjRdXkFbYj4+MTYmMjU1XV5DW2U+PjgmMjU1XV5CW2YmMjU1XV5kW3ArMl0sYj1hW2I+Pj4yNF1eQVtlPj4xNiYyNTVdXkNbZj4+OCYyNTVdXkJbZyYyNTVdXmRbcCszXSxwKz00LGU9aCxmPWssZz1uO2ZvcihtPVxuMDs0Pm07bSsrKXpbYz8zJi1tOm1dPURbZT4+PjI0XTw8MjReRFtmPj4xNiYyNTVdPDwxNl5EW2c+PjgmMjU1XTw8OF5EW2ImMjU1XV5kW3ArK10saD1lLGU9ZixmPWcsZz1iLGI9aDtyZXR1cm4gen1cbnNqY2wuYml0QXJyYXk9e2JpdFNsaWNlOmZ1bmN0aW9uKGEsYixjKXthPXNqY2wuYml0QXJyYXkuWShhLnNsaWNlKGIvMzIpLDMyLShiJjMxKSkuc2xpY2UoMSk7cmV0dXJuIHZvaWQgMD09PWM/YTpzamNsLmJpdEFycmF5LmNsYW1wKGEsYy1iKX0sZXh0cmFjdDpmdW5jdGlvbihhLGIsYyl7dmFyIGQ9TWF0aC5mbG9vcigtYi1jJjMxKTtyZXR1cm4oKGIrYy0xXmIpJi0zMj9hW2IvMzJ8MF08PDMyLWReYVtiLzMyKzF8MF0+Pj5kOmFbYi8zMnwwXT4+PmQpJigxPDxjKS0xfSxjb25jYXQ6ZnVuY3Rpb24oYSxiKXtpZigwPT09YS5sZW5ndGh8fDA9PT1iLmxlbmd0aClyZXR1cm4gYS5jb25jYXQoYik7dmFyIGM9YVthLmxlbmd0aC0xXSxkPXNqY2wuYml0QXJyYXkuZ2V0UGFydGlhbChjKTtyZXR1cm4gMzI9PT1kP2EuY29uY2F0KGIpOnNqY2wuYml0QXJyYXkuWShiLGQsY3wwLGEuc2xpY2UoMCxhLmxlbmd0aC0xKSl9LGJpdExlbmd0aDpmdW5jdGlvbihhKXt2YXIgYj1hLmxlbmd0aDtyZXR1cm4gMD09PVxuYj8wOjMyKihiLTEpK3NqY2wuYml0QXJyYXkuZ2V0UGFydGlhbChhW2ItMV0pfSxjbGFtcDpmdW5jdGlvbihhLGIpe2lmKDMyKmEubGVuZ3RoPGIpcmV0dXJuIGE7YT1hLnNsaWNlKDAsTWF0aC5jZWlsKGIvMzIpKTt2YXIgYz1hLmxlbmd0aDtiPWImMzE7MDxjJiZiJiYoYVtjLTFdPXNqY2wuYml0QXJyYXkucGFydGlhbChiLGFbYy0xXSYyMTQ3NDgzNjQ4Pj5iLTEsMSkpO3JldHVybiBhfSxwYXJ0aWFsOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4gMzI9PT1hP2I6KGM/YnwwOmI8PDMyLWEpKzB4MTAwMDAwMDAwMDAqYX0sZ2V0UGFydGlhbDpmdW5jdGlvbihhKXtyZXR1cm4gTWF0aC5yb3VuZChhLzB4MTAwMDAwMDAwMDApfHwzMn0sZXF1YWw6ZnVuY3Rpb24oYSxiKXtpZihzamNsLmJpdEFycmF5LmJpdExlbmd0aChhKSE9PXNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGIpKXJldHVybiExO3ZhciBjPTAsZDtmb3IoZD0wO2Q8YS5sZW5ndGg7ZCsrKWN8PWFbZF1eYltkXTtyZXR1cm4gMD09PVxuY30sWTpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZTtlPTA7Zm9yKHZvaWQgMD09PWQmJihkPVtdKTszMjw9YjtiLT0zMilkLnB1c2goYyksYz0wO2lmKDA9PT1iKXJldHVybiBkLmNvbmNhdChhKTtmb3IoZT0wO2U8YS5sZW5ndGg7ZSsrKWQucHVzaChjfGFbZV0+Pj5iKSxjPWFbZV08PDMyLWI7ZT1hLmxlbmd0aD9hW2EubGVuZ3RoLTFdOjA7YT1zamNsLmJpdEFycmF5LmdldFBhcnRpYWwoZSk7ZC5wdXNoKHNqY2wuYml0QXJyYXkucGFydGlhbChiK2EmMzEsMzI8YithP2M6ZC5wb3AoKSwxKSk7cmV0dXJuIGR9LFA6ZnVuY3Rpb24oYSxiKXtyZXR1cm5bYVswXV5iWzBdLGFbMV1eYlsxXSxhWzJdXmJbMl0sYVszXV5iWzNdXX0sYnl0ZXN3YXBNOmZ1bmN0aW9uKGEpe3ZhciBiLGM7Zm9yKGI9MDtiPGEubGVuZ3RoOysrYiljPWFbYl0sYVtiXT1jPj4+MjR8Yz4+PjgmMHhmZjAwfChjJjB4ZmYwMCk8PDh8Yzw8MjQ7cmV0dXJuIGF9fTtcbnNqY2wuY29kZWMudXRmOFN0cmluZz17ZnJvbUJpdHM6ZnVuY3Rpb24oYSl7dmFyIGI9XCJcIixjPXNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpLGQsZTtmb3IoZD0wO2Q8Yy84O2QrKykwPT09KGQmMykmJihlPWFbZC80XSksYis9U3RyaW5nLmZyb21DaGFyQ29kZShlPj4+OD4+Pjg+Pj44KSxlPDw9ODtyZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KGVzY2FwZShiKSl9LHRvQml0czpmdW5jdGlvbihhKXthPXVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChhKSk7dmFyIGI9W10sYyxkPTA7Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKylkPWQ8PDh8YS5jaGFyQ29kZUF0KGMpLDM9PT0oYyYzKSYmKGIucHVzaChkKSxkPTApO2MmMyYmYi5wdXNoKHNqY2wuYml0QXJyYXkucGFydGlhbCg4KihjJjMpLGQpKTtyZXR1cm4gYn19O1xuc2pjbC5jb2RlYy5oZXg9e2Zyb21CaXRzOmZ1bmN0aW9uKGEpe3ZhciBiPVwiXCIsYztmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWIrPSgoYVtjXXwwKSsweGYwMDAwMDAwMDAwMCkudG9TdHJpbmcoMTYpLnN1YnN0cig0KTtyZXR1cm4gYi5zdWJzdHIoMCxzamNsLmJpdEFycmF5LmJpdExlbmd0aChhKS80KX0sdG9CaXRzOmZ1bmN0aW9uKGEpe3ZhciBiLGM9W10sZDthPWEucmVwbGFjZSgvXFxzfDB4L2csXCJcIik7ZD1hLmxlbmd0aDthPWErXCIwMDAwMDAwMFwiO2ZvcihiPTA7YjxhLmxlbmd0aDtiKz04KWMucHVzaChwYXJzZUludChhLnN1YnN0cihiLDgpLDE2KV4wKTtyZXR1cm4gc2pjbC5iaXRBcnJheS5jbGFtcChjLDQqZCl9fTtcbnNqY2wuY29kZWMuYmFzZTY0PXtTOlwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiLGZyb21CaXRzOmZ1bmN0aW9uKGEsYixjKXt2YXIgZD1cIlwiLGU9MCxmPXNqY2wuY29kZWMuYmFzZTY0LlMsZz0wLGg9c2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSk7YyYmKGY9Zi5zdWJzdHIoMCw2MikrXCItX1wiKTtmb3IoYz0wOzYqZC5sZW5ndGg8aDspZCs9Zi5jaGFyQXQoKGdeYVtjXT4+PmUpPj4+MjYpLDY+ZT8oZz1hW2NdPDw2LWUsZSs9MjYsYysrKTooZzw8PTYsZS09Nik7Zm9yKDtkLmxlbmd0aCYzJiYhYjspZCs9XCI9XCI7cmV0dXJuIGR9LHRvQml0czpmdW5jdGlvbihhLGIpe2E9YS5yZXBsYWNlKC9cXHN8PS9nLFwiXCIpO3ZhciBjPVtdLGQsZT0wLGY9c2pjbC5jb2RlYy5iYXNlNjQuUyxnPTAsaDtiJiYoZj1mLnN1YnN0cigwLDYyKStcIi1fXCIpO2ZvcihkPTA7ZDxhLmxlbmd0aDtkKyspe2g9Zi5pbmRleE9mKGEuY2hhckF0KGQpKTtcbmlmKDA+aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcInRoaXMgaXNuJ3QgYmFzZTY0IVwiKTsyNjxlPyhlLT0yNixjLnB1c2goZ15oPj4+ZSksZz1oPDwzMi1lKTooZSs9NixnXj1oPDwzMi1lKX1lJjU2JiZjLnB1c2goc2pjbC5iaXRBcnJheS5wYXJ0aWFsKGUmNTYsZywxKSk7cmV0dXJuIGN9fTtzamNsLmNvZGVjLmJhc2U2NHVybD17ZnJvbUJpdHM6ZnVuY3Rpb24oYSl7cmV0dXJuIHNqY2wuY29kZWMuYmFzZTY0LmZyb21CaXRzKGEsMSwxKX0sdG9CaXRzOmZ1bmN0aW9uKGEpe3JldHVybiBzamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYSwxKX19O3NqY2wuaGFzaC5zaGEyNTY9ZnVuY3Rpb24oYSl7dGhpcy5iWzBdfHx0aGlzLkMoKTthPyh0aGlzLmc9YS5nLnNsaWNlKDApLHRoaXMuZj1hLmYuc2xpY2UoMCksdGhpcy5jPWEuYyk6dGhpcy5yZXNldCgpfTtzamNsLmhhc2guc2hhMjU2Lmhhc2g9ZnVuY3Rpb24oYSl7cmV0dXJuKG5ldyBzamNsLmhhc2guc2hhMjU2KS51cGRhdGUoYSkuZmluYWxpemUoKX07XG5zamNsLmhhc2guc2hhMjU2LnByb3RvdHlwZT17YmxvY2tTaXplOjUxMixyZXNldDpmdW5jdGlvbigpe3RoaXMuZz10aGlzLm8uc2xpY2UoMCk7dGhpcy5mPVtdO3RoaXMuYz0wO3JldHVybiB0aGlzfSx1cGRhdGU6ZnVuY3Rpb24oYSl7XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYoYT1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGEpKTt2YXIgYixjPXRoaXMuZj1zamNsLmJpdEFycmF5LmNvbmNhdCh0aGlzLmYsYSk7Yj10aGlzLmM7YT10aGlzLmM9YitzamNsLmJpdEFycmF5LmJpdExlbmd0aChhKTtpZigweDFmZmZmZmZmZmZmZmZmPGEpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJDYW5ub3QgaGFzaCBtb3JlIHRoYW4gMl41MyAtIDEgYml0c1wiKTtpZihcInVuZGVmaW5lZFwiIT09dHlwZW9mIFVpbnQzMkFycmF5KXt2YXIgZD1uZXcgVWludDMyQXJyYXkoYyksZT0wO2ZvcihiPTUxMitiLSg1MTIrYiYweDFmZik7Yjw9YTtiKz01MTIpdGhpcy5sKGQuc3ViYXJyYXkoMTYqZSxcbjE2KihlKzEpKSksZSs9MTtjLnNwbGljZSgwLDE2KmUpfWVsc2UgZm9yKGI9NTEyK2ItKDUxMitiJjB4MWZmKTtiPD1hO2IrPTUxMil0aGlzLmwoYy5zcGxpY2UoMCwxNikpO3JldHVybiB0aGlzfSxmaW5hbGl6ZTpmdW5jdGlvbigpe3ZhciBhLGI9dGhpcy5mLGM9dGhpcy5nLGI9c2pjbC5iaXRBcnJheS5jb25jYXQoYixbc2pjbC5iaXRBcnJheS5wYXJ0aWFsKDEsMSldKTtmb3IoYT1iLmxlbmd0aCsyO2EmMTU7YSsrKWIucHVzaCgwKTtiLnB1c2goTWF0aC5mbG9vcih0aGlzLmMvMHgxMDAwMDAwMDApKTtmb3IoYi5wdXNoKHRoaXMuY3wwKTtiLmxlbmd0aDspdGhpcy5sKGIuc3BsaWNlKDAsMTYpKTt0aGlzLnJlc2V0KCk7cmV0dXJuIGN9LG86W10sYjpbXSxDOmZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhKXtyZXR1cm4gMHgxMDAwMDAwMDAqKGEtTWF0aC5mbG9vcihhKSl8MH1mb3IodmFyIGI9MCxjPTIsZCxlOzY0PmI7YysrKXtlPSEwO2ZvcihkPTI7ZCpkPD1jO2QrKylpZigwPT09YyVkKXtlPVxuITE7YnJlYWt9ZSYmKDg+YiYmKHRoaXMub1tiXT1hKE1hdGgucG93KGMsLjUpKSksdGhpcy5iW2JdPWEoTWF0aC5wb3coYywxLzMpKSxiKyspfX0sbDpmdW5jdGlvbihhKXt2YXIgYixjLGQsZT10aGlzLmcsZj10aGlzLmIsZz1lWzBdLGg9ZVsxXSxrPWVbMl0sbj1lWzNdLGw9ZVs0XSxtPWVbNV0scD1lWzZdLHo9ZVs3XTtmb3IoYj0wOzY0PmI7YisrKTE2PmI/Yz1hW2JdOihjPWFbYisxJjE1XSxkPWFbYisxNCYxNV0sYz1hW2ImMTVdPShjPj4+N15jPj4+MTheYz4+PjNeYzw8MjVeYzw8MTQpKyhkPj4+MTdeZD4+PjE5XmQ+Pj4xMF5kPDwxNV5kPDwxMykrYVtiJjE1XSthW2IrOSYxNV18MCksYz1jK3orKGw+Pj42Xmw+Pj4xMV5sPj4+MjVebDw8MjZebDw8MjFebDw8NykrKHBebCYobV5wKSkrZltiXSx6PXAscD1tLG09bCxsPW4rY3wwLG49ayxrPWgsaD1nLGc9YysoaCZrXm4mKGheaykpKyhoPj4+Ml5oPj4+MTNeaD4+PjIyXmg8PDMwXmg8PDE5Xmg8PDEwKXwwO2VbMF09ZVswXStnfFxuMDtlWzFdPWVbMV0raHwwO2VbMl09ZVsyXStrfDA7ZVszXT1lWzNdK258MDtlWzRdPWVbNF0rbHwwO2VbNV09ZVs1XSttfDA7ZVs2XT1lWzZdK3B8MDtlWzddPWVbN10renwwfX07c2pjbC5oYXNoLnNoYTUxMj1mdW5jdGlvbihhKXt0aGlzLmJbMF18fHRoaXMuQygpO2E/KHRoaXMuZz1hLmcuc2xpY2UoMCksdGhpcy5mPWEuZi5zbGljZSgwKSx0aGlzLmM9YS5jKTp0aGlzLnJlc2V0KCl9O3NqY2wuaGFzaC5zaGE1MTIuaGFzaD1mdW5jdGlvbihhKXtyZXR1cm4obmV3IHNqY2wuaGFzaC5zaGE1MTIpLnVwZGF0ZShhKS5maW5hbGl6ZSgpfTtcbnNqY2wuaGFzaC5zaGE1MTIucHJvdG90eXBlPXtibG9ja1NpemU6MTAyNCxyZXNldDpmdW5jdGlvbigpe3RoaXMuZz10aGlzLm8uc2xpY2UoMCk7dGhpcy5mPVtdO3RoaXMuYz0wO3JldHVybiB0aGlzfSx1cGRhdGU6ZnVuY3Rpb24oYSl7XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYoYT1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGEpKTt2YXIgYixjPXRoaXMuZj1zamNsLmJpdEFycmF5LmNvbmNhdCh0aGlzLmYsYSk7Yj10aGlzLmM7YT10aGlzLmM9YitzamNsLmJpdEFycmF5LmJpdExlbmd0aChhKTtpZigweDFmZmZmZmZmZmZmZmZmPGEpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJDYW5ub3QgaGFzaCBtb3JlIHRoYW4gMl41MyAtIDEgYml0c1wiKTtpZihcInVuZGVmaW5lZFwiIT09dHlwZW9mIFVpbnQzMkFycmF5KXt2YXIgZD1uZXcgVWludDMyQXJyYXkoYyksZT0wO2ZvcihiPTEwMjQrYi0oMTAyNCtiJjEwMjMpO2I8PWE7Yis9MTAyNCl0aGlzLmwoZC5zdWJhcnJheSgzMipcbmUsMzIqKGUrMSkpKSxlKz0xO2Muc3BsaWNlKDAsMzIqZSl9ZWxzZSBmb3IoYj0xMDI0K2ItKDEwMjQrYiYxMDIzKTtiPD1hO2IrPTEwMjQpdGhpcy5sKGMuc3BsaWNlKDAsMzIpKTtyZXR1cm4gdGhpc30sZmluYWxpemU6ZnVuY3Rpb24oKXt2YXIgYSxiPXRoaXMuZixjPXRoaXMuZyxiPXNqY2wuYml0QXJyYXkuY29uY2F0KGIsW3NqY2wuYml0QXJyYXkucGFydGlhbCgxLDEpXSk7Zm9yKGE9Yi5sZW5ndGgrNDthJjMxO2ErKyliLnB1c2goMCk7Yi5wdXNoKDApO2IucHVzaCgwKTtiLnB1c2goTWF0aC5mbG9vcih0aGlzLmMvMHgxMDAwMDAwMDApKTtmb3IoYi5wdXNoKHRoaXMuY3wwKTtiLmxlbmd0aDspdGhpcy5sKGIuc3BsaWNlKDAsMzIpKTt0aGlzLnJlc2V0KCk7cmV0dXJuIGN9LG86W10saWE6WzEyMzcyMjMyLDEzMjgxMDgzLDk3NjI4NTksMTkxNDYwOSwxNTEwNjc2OSw0MDkwOTExLDQzMDgzMzEsODI2NjEwNV0sYjpbXSxrYTpbMjY2NjAxOCwxNTY4OTE2NSw1MDYxNDIzLDkwMzQ2ODQsXG40NzY0OTg0LDM4MDk1MywxNjU4Nzc5LDcxNzY0NzIsMTk3MTg2LDczNjg2MzgsMTQ5ODc5MTYsMTY3NTc5ODYsODA5NjExMSwxNDgwMzY5LDEzMDQ2MzI1LDY4OTExNTYsMTU4MTMzMzAsNTE4NzA0Myw5MjI5NzQ5LDExMzEyMjI5LDI4MTg2NzcsMTA5Mzc0NzUsNDMyNDMwOCwxMTM1NTQxLDY3NDE5MzEsMTE4MDkyOTYsMTY0NTgwNDcsMTU2NjY5MTYsMTEwNDY4NTAsNjk4MTQ5LDIyOTk5OSw5NDU3NzYsMTM3NzQ4NDQsMjU0MTg2MiwxMjg1NjA0NSw5ODEwOTExLDExNDk0MzY2LDc4NDQ1MjAsMTU1NzY4MDYsODUzMzMwNywxNTc5NTA0NCw0MzM3NjY1LDE2MjkxNzI5LDU1NTM3MTIsMTU2ODQxMjAsNjY2MjQxNiw3NDEzODAyLDEyMzA4OTIwLDEzODE2MDA4LDQzMDM2OTksOTM2NjQyNSwxMDE3NjY4MCwxMzE5NTg3NSw0Mjk1MzcxLDY1NDYyOTEsMTE3MTI2NzUsMTU3MDg5MjQsMTUxOTQ1NiwxNTc3MjUzMCw2NTY4NDI4LDY0OTU3ODQsODU2ODI5NywxMzAwNzEyNSw3NDkyMzk1LDI1MTUzNTYsXG4xMjYzMjU4MywxNDc0MDI1NCw3MjYyNTg0LDE1MzU5MzAsMTMxNDYyNzgsMTYzMjE5NjYsMTg1MzIxMSwyOTQyNzYsMTMwNTEwMjcsMTMyMjE1NjQsMTA1MTk4MCw0MDgwMzEwLDY2NTE0MzQsMTQwODg5NDAsNDY3NTYwN10sQzpmdW5jdGlvbigpe2Z1bmN0aW9uIGEoYSl7cmV0dXJuIDB4MTAwMDAwMDAwKihhLU1hdGguZmxvb3IoYSkpfDB9ZnVuY3Rpb24gYihhKXtyZXR1cm4gMHgxMDAwMDAwMDAwMCooYS1NYXRoLmZsb29yKGEpKSYyNTV9Zm9yKHZhciBjPTAsZD0yLGUsZjs4MD5jO2QrKyl7Zj0hMDtmb3IoZT0yO2UqZTw9ZDtlKyspaWYoMD09PWQlZSl7Zj0hMTticmVha31mJiYoOD5jJiYodGhpcy5vWzIqY109YShNYXRoLnBvdyhkLC41KSksdGhpcy5vWzIqYysxXT1iKE1hdGgucG93KGQsLjUpKTw8MjR8dGhpcy5pYVtjXSksdGhpcy5iWzIqY109YShNYXRoLnBvdyhkLDEvMykpLHRoaXMuYlsyKmMrMV09YihNYXRoLnBvdyhkLDEvMykpPDwyNHx0aGlzLmthW2NdLGMrKyl9fSxsOmZ1bmN0aW9uKGEpe3ZhciBiLFxuYyxkPXRoaXMuZyxlPXRoaXMuYixmPWRbMF0sZz1kWzFdLGg9ZFsyXSxrPWRbM10sbj1kWzRdLGw9ZFs1XSxtPWRbNl0scD1kWzddLHo9ZFs4XSxBPWRbOV0sQz1kWzEwXSxCPWRbMTFdLEQ9ZFsxMl0sUD1kWzEzXSxlYT1kWzE0XSxRPWRbMTVdLHQ7aWYoXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBVaW50MzJBcnJheSl7dD1BcnJheSgxNjApO2Zvcih2YXIgcj0wOzMyPnI7cisrKXRbcl09YVtyXX1lbHNlIHQ9YTt2YXIgcj1mLHU9ZyxHPWgsRT1rLEg9bixGPWwsVj1tLEk9cCx3PXosdj1BLFI9QyxKPUIsUz1ELEs9UCxXPWVhLEw9UTtmb3IoYT0wOzgwPmE7YSsrKXtpZigxNj5hKWI9dFsyKmFdLGM9dFsyKmErMV07ZWxzZXtjPXRbMiooYS0xNSldO3ZhciBxPXRbMiooYS0xNSkrMV07Yj0ocTw8MzF8Yz4+PjEpXihxPDwyNHxjPj4+OCleYz4+Pjc7dmFyIHg9KGM8PDMxfHE+Pj4xKV4oYzw8MjR8cT4+PjgpXihjPDwyNXxxPj4+Nyk7Yz10WzIqKGEtMildO3ZhciB5PXRbMiooYS0yKSsxXSxcbnE9KHk8PDEzfGM+Pj4xOSleKGM8PDN8eT4+PjI5KV5jPj4+Nix5PShjPDwxM3x5Pj4+MTkpXih5PDwzfGM+Pj4yOSleKGM8PDI2fHk+Pj42KSxYPXRbMiooYS03KV0sWT10WzIqKGEtMTYpXSxNPXRbMiooYS0xNikrMV07Yz14K3RbMiooYS03KSsxXTtiPWIrWCsoYz4+PjA8eD4+PjA/MTowKTtjKz15O2IrPXErKGM+Pj4wPHk+Pj4wPzE6MCk7Yys9TTtiKz1ZKyhjPj4+MDxNPj4+MD8xOjApfXRbMiphXT1ifD0wO3RbMiphKzFdPWN8PTA7dmFyIFg9dyZSXn53JlMsZmE9diZKXn52JksseT1yJkdeciZIXkcmSCxqYT11JkVedSZGXkUmRixZPSh1PDw0fHI+Pj4yOCleKHI8PDMwfHU+Pj4yKV4ocjw8MjV8dT4+PjcpLE09KHI8PDR8dT4+PjI4KV4odTw8MzB8cj4+PjIpXih1PDwyNXxyPj4+Nyksa2E9ZVsyKmFdLGdhPWVbMiphKzFdLHE9TCsoKHc8PDE4fHY+Pj4xNCleKHc8PDE0fHY+Pj4xOCleKHY8PDIzfHc+Pj45KSkseD1XKygodjw8MTh8dz4+PjE0KV4odjw8MTR8dz4+PjE4KV4odzw8XG4yM3x2Pj4+OSkpKyhxPj4+MDxMPj4+MD8xOjApLHE9cStmYSx4PXgrKFgrKHE+Pj4wPGZhPj4+MD8xOjApKSxxPXErZ2EseD14KyhrYSsocT4+PjA8Z2E+Pj4wPzE6MCkpLHE9cStjfDAseD14KyhiKyhxPj4+MDxjPj4+MD8xOjApKTtjPU0ramE7Yj1ZK3krKGM+Pj4wPE0+Pj4wPzE6MCk7Vz1TO0w9SztTPVI7Sz1KO1I9dztKPXY7dj1JK3F8MDt3PVYreCsodj4+PjA8ST4+PjA/MTowKXwwO1Y9SDtJPUY7SD1HO0Y9RTtHPXI7RT11O3U9cStjfDA7cj14K2IrKHU+Pj4wPHE+Pj4wPzE6MCl8MH1nPWRbMV09Zyt1fDA7ZFswXT1mK3IrKGc+Pj4wPHU+Pj4wPzE6MCl8MDtrPWRbM109aytFfDA7ZFsyXT1oK0crKGs+Pj4wPEU+Pj4wPzE6MCl8MDtsPWRbNV09bCtGfDA7ZFs0XT1uK0grKGw+Pj4wPEY+Pj4wPzE6MCl8MDtwPWRbN109cCtJfDA7ZFs2XT1tK1YrKHA+Pj4wPEk+Pj4wPzE6MCl8MDtBPWRbOV09QSt2fDA7ZFs4XT16K3crKEE+Pj4wPHY+Pj4wPzE6MCl8MDtCPWRbMTFdPUIrSnxcbjA7ZFsxMF09QytSKyhCPj4+MDxKPj4+MD8xOjApfDA7UD1kWzEzXT1QK0t8MDtkWzEyXT1EK1MrKFA+Pj4wPEs+Pj4wPzE6MCl8MDtRPWRbMTVdPVErTHwwO2RbMTRdPWVhK1crKFE+Pj4wPEw+Pj4wPzE6MCl8MH19O1xuc2pjbC5tb2RlLmNjbT17bmFtZTpcImNjbVwiLEY6W10sbGlzdGVuUHJvZ3Jlc3M6ZnVuY3Rpb24oYSl7c2pjbC5tb2RlLmNjbS5GLnB1c2goYSl9LHVuTGlzdGVuUHJvZ3Jlc3M6ZnVuY3Rpb24oYSl7YT1zamNsLm1vZGUuY2NtLkYuaW5kZXhPZihhKTstMTxhJiZzamNsLm1vZGUuY2NtLkYuc3BsaWNlKGEsMSl9LGRhOmZ1bmN0aW9uKGEpe3ZhciBiPXNqY2wubW9kZS5jY20uRi5zbGljZSgpLGM7Zm9yKGM9MDtjPGIubGVuZ3RoO2MrPTEpYltjXShhKX0sZW5jcnlwdDpmdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmLGc9Yi5zbGljZSgwKSxoPXNqY2wuYml0QXJyYXksaz1oLmJpdExlbmd0aChjKS84LG49aC5iaXRMZW5ndGgoZykvODtlPWV8fDY0O2Q9ZHx8W107aWYoNz5rKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiY2NtOiBpdiBtdXN0IGJlIGF0IGxlYXN0IDcgYnl0ZXNcIik7Zm9yKGY9Mjs0PmYmJm4+Pj44KmY7ZisrKTtmPDE1LWsmJihmPTE1LWspO2M9aC5jbGFtcChjLFxuOCooMTUtZikpO2I9c2pjbC5tb2RlLmNjbS5VKGEsYixjLGQsZSxmKTtnPXNqY2wubW9kZS5jY20uVihhLGcsYyxiLGUsZik7cmV0dXJuIGguY29uY2F0KGcuZGF0YSxnLnRhZyl9LGRlY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCxlKXtlPWV8fDY0O2Q9ZHx8W107dmFyIGY9c2pjbC5iaXRBcnJheSxnPWYuYml0TGVuZ3RoKGMpLzgsaD1mLmJpdExlbmd0aChiKSxrPWYuY2xhbXAoYixoLWUpLG49Zi5iaXRTbGljZShiLGgtZSksaD0oaC1lKS84O2lmKDc+Zyl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImNjbTogaXYgbXVzdCBiZSBhdCBsZWFzdCA3IGJ5dGVzXCIpO2ZvcihiPTI7ND5iJiZoPj4+OCpiO2IrKyk7YjwxNS1nJiYoYj0xNS1nKTtjPWYuY2xhbXAoYyw4KigxNS1iKSk7az1zamNsLm1vZGUuY2NtLlYoYSxrLGMsbixlLGIpO2E9c2pjbC5tb2RlLmNjbS5VKGEsay5kYXRhLGMsZCxlLGIpO2lmKCFmLmVxdWFsKGsudGFnLGEpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5jb3JydXB0KFwiY2NtOiB0YWcgZG9lc24ndCBtYXRjaFwiKTtcbnJldHVybiBrLmRhdGF9LG1hOmZ1bmN0aW9uKGEsYixjLGQsZSxmKXt2YXIgZz1bXSxoPXNqY2wuYml0QXJyYXksaz1oLlA7ZD1baC5wYXJ0aWFsKDgsKGIubGVuZ3RoPzY0OjApfGQtMjw8MnxmLTEpXTtkPWguY29uY2F0KGQsYyk7ZFszXXw9ZTtkPWEuZW5jcnlwdChkKTtpZihiLmxlbmd0aClmb3IoYz1oLmJpdExlbmd0aChiKS84LDY1Mjc5Pj1jP2c9W2gucGFydGlhbCgxNixjKV06MHhmZmZmZmZmZj49YyYmKGc9aC5jb25jYXQoW2gucGFydGlhbCgxNiw2NTUzNCldLFtjXSkpLGc9aC5jb25jYXQoZyxiKSxiPTA7YjxnLmxlbmd0aDtiKz00KWQ9YS5lbmNyeXB0KGsoZCxnLnNsaWNlKGIsYis0KS5jb25jYXQoWzAsMCwwXSkpKTtyZXR1cm4gZH0sVTpmdW5jdGlvbihhLGIsYyxkLGUsZil7dmFyIGc9c2pjbC5iaXRBcnJheSxoPWcuUDtlLz04O2lmKGUlMnx8ND5lfHwxNjxlKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiY2NtOiBpbnZhbGlkIHRhZyBsZW5ndGhcIik7XG5pZigweGZmZmZmZmZmPGQubGVuZ3RofHwweGZmZmZmZmZmPGIubGVuZ3RoKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJjY206IGNhbid0IGRlYWwgd2l0aCA0R2lCIG9yIG1vcmUgZGF0YVwiKTtjPXNqY2wubW9kZS5jY20ubWEoYSxkLGMsZSxnLmJpdExlbmd0aChiKS84LGYpO2ZvcihkPTA7ZDxiLmxlbmd0aDtkKz00KWM9YS5lbmNyeXB0KGgoYyxiLnNsaWNlKGQsZCs0KS5jb25jYXQoWzAsMCwwXSkpKTtyZXR1cm4gZy5jbGFtcChjLDgqZSl9LFY6ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe3ZhciBnLGg9c2pjbC5iaXRBcnJheTtnPWguUDt2YXIgaz1iLmxlbmd0aCxuPWguYml0TGVuZ3RoKGIpLGw9ay81MCxtPWw7Yz1oLmNvbmNhdChbaC5wYXJ0aWFsKDgsZi0xKV0sYykuY29uY2F0KFswLDAsMF0pLnNsaWNlKDAsNCk7ZD1oLmJpdFNsaWNlKGcoZCxhLmVuY3J5cHQoYykpLDAsZSk7aWYoIWspcmV0dXJue3RhZzpkLGRhdGE6W119O2ZvcihnPTA7ZzxrO2crPTQpZz5sJiYoc2pjbC5tb2RlLmNjbS5kYShnL1xuayksbCs9bSksY1szXSsrLGU9YS5lbmNyeXB0KGMpLGJbZ11ePWVbMF0sYltnKzFdXj1lWzFdLGJbZysyXV49ZVsyXSxiW2crM11ePWVbM107cmV0dXJue3RhZzpkLGRhdGE6aC5jbGFtcChiLG4pfX19O3NqY2wubWlzYy5obWFjPWZ1bmN0aW9uKGEsYil7dGhpcy5XPWI9Ynx8c2pjbC5oYXNoLnNoYTI1Njt2YXIgYz1bW10sW11dLGQsZT1iLnByb3RvdHlwZS5ibG9ja1NpemUvMzI7dGhpcy5CPVtuZXcgYixuZXcgYl07YS5sZW5ndGg+ZSYmKGE9Yi5oYXNoKGEpKTtmb3IoZD0wO2Q8ZTtkKyspY1swXVtkXT1hW2RdXjkwOTUyMjQ4NixjWzFdW2RdPWFbZF1eMTU0OTU1NjgyODt0aGlzLkJbMF0udXBkYXRlKGNbMF0pO3RoaXMuQlsxXS51cGRhdGUoY1sxXSk7dGhpcy5PPW5ldyBiKHRoaXMuQlswXSl9O1xuc2pjbC5taXNjLmhtYWMucHJvdG90eXBlLmVuY3J5cHQ9c2pjbC5taXNjLmhtYWMucHJvdG90eXBlLm1hYz1mdW5jdGlvbihhKXtpZih0aGlzLlopdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJlbmNyeXB0IG9uIGFscmVhZHkgdXBkYXRlZCBobWFjIGNhbGxlZCFcIik7dGhpcy51cGRhdGUoYSk7cmV0dXJuIHRoaXMuZGlnZXN0KGEpfTtzamNsLm1pc2MuaG1hYy5wcm90b3R5cGUucmVzZXQ9ZnVuY3Rpb24oKXt0aGlzLk89bmV3IHRoaXMuVyh0aGlzLkJbMF0pO3RoaXMuWj0hMX07c2pjbC5taXNjLmhtYWMucHJvdG90eXBlLnVwZGF0ZT1mdW5jdGlvbihhKXt0aGlzLlo9ITA7dGhpcy5PLnVwZGF0ZShhKX07c2pjbC5taXNjLmhtYWMucHJvdG90eXBlLmRpZ2VzdD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuTy5maW5hbGl6ZSgpLGE9KG5ldyB0aGlzLlcodGhpcy5CWzFdKSkudXBkYXRlKGEpLmZpbmFsaXplKCk7dGhpcy5yZXNldCgpO3JldHVybiBhfTtcbnNqY2wubWlzYy5wYmtkZjI9ZnVuY3Rpb24oYSxiLGMsZCxlKXtjPWN8fDFFNDtpZigwPmR8fDA+Yyl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImludmFsaWQgcGFyYW1zIHRvIHBia2RmMlwiKTtcInN0cmluZ1wiPT09dHlwZW9mIGEmJihhPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYSkpO1wic3RyaW5nXCI9PT10eXBlb2YgYiYmKGI9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhiKSk7ZT1lfHxzamNsLm1pc2MuaG1hYzthPW5ldyBlKGEpO3ZhciBmLGcsaCxrLG49W10sbD1zamNsLmJpdEFycmF5O2ZvcihrPTE7MzIqbi5sZW5ndGg8KGR8fDEpO2srKyl7ZT1mPWEuZW5jcnlwdChsLmNvbmNhdChiLFtrXSkpO2ZvcihnPTE7ZzxjO2crKylmb3IoZj1hLmVuY3J5cHQoZiksaD0wO2g8Zi5sZW5ndGg7aCsrKWVbaF1ePWZbaF07bj1uLmNvbmNhdChlKX1kJiYobj1sLmNsYW1wKG4sZCkpO3JldHVybiBufTtcbnNqY2wucHJuZz1mdW5jdGlvbihhKXt0aGlzLmg9W25ldyBzamNsLmhhc2guc2hhMjU2XTt0aGlzLnM9WzBdO3RoaXMuTj0wO3RoaXMuRz17fTt0aGlzLk09MDt0aGlzLlQ9e307dGhpcy5YPXRoaXMuaT10aGlzLnU9dGhpcy5mYT0wO3RoaXMuYj1bMCwwLDAsMCwwLDAsMCwwXTt0aGlzLm09WzAsMCwwLDBdO3RoaXMuSz12b2lkIDA7dGhpcy5MPWE7dGhpcy5EPSExO3RoaXMuSj17cHJvZ3Jlc3M6e30sc2VlZGVkOnt9fTt0aGlzLkE9dGhpcy5lYT0wO3RoaXMuSD0xO3RoaXMuST0yO3RoaXMuYWE9MHgxMDAwMDt0aGlzLlI9WzAsNDgsNjQsOTYsMTI4LDE5MiwweDEwMCwzODQsNTEyLDc2OCwxMDI0XTt0aGlzLmJhPTNFNDt0aGlzLiQ9ODB9O1xuc2pjbC5wcm5nLnByb3RvdHlwZT17cmFuZG9tV29yZHM6ZnVuY3Rpb24oYSxiKXt2YXIgYz1bXSxkO2Q9dGhpcy5pc1JlYWR5KGIpO3ZhciBlO2lmKGQ9PT10aGlzLkEpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLm5vdFJlYWR5KFwiZ2VuZXJhdG9yIGlzbid0IHNlZWRlZFwiKTtpZihkJnRoaXMuSSl7ZD0hKGQmdGhpcy5IKTtlPVtdO3ZhciBmPTAsZzt0aGlzLlg9ZVswXT0obmV3IERhdGUpLnZhbHVlT2YoKSt0aGlzLmJhO2ZvcihnPTA7MTY+ZztnKyspZS5wdXNoKDB4MTAwMDAwMDAwKk1hdGgucmFuZG9tKCl8MCk7Zm9yKGc9MDtnPHRoaXMuaC5sZW5ndGgmJihlPWUuY29uY2F0KHRoaXMuaFtnXS5maW5hbGl6ZSgpKSxmKz10aGlzLnNbZ10sdGhpcy5zW2ddPTAsZHx8ISh0aGlzLk4mMTw8ZykpO2crKyk7dGhpcy5OPj0xPDx0aGlzLmgubGVuZ3RoJiYodGhpcy5oLnB1c2gobmV3IHNqY2wuaGFzaC5zaGEyNTYpLHRoaXMucy5wdXNoKDApKTt0aGlzLmktPWY7Zj50aGlzLnUmJih0aGlzLnU9XG5mKTt0aGlzLk4rKzt0aGlzLmI9c2pjbC5oYXNoLnNoYTI1Ni5oYXNoKHRoaXMuYi5jb25jYXQoZSkpO3RoaXMuSz1uZXcgc2pjbC5jaXBoZXIuYWVzKHRoaXMuYik7Zm9yKGQ9MDs0PmQmJih0aGlzLm1bZF09dGhpcy5tW2RdKzF8MCwhdGhpcy5tW2RdKTtkKyspO31mb3IoZD0wO2Q8YTtkKz00KTA9PT0oZCsxKSV0aGlzLmFhJiZiYSh0aGlzKSxlPU4odGhpcyksYy5wdXNoKGVbMF0sZVsxXSxlWzJdLGVbM10pO2JhKHRoaXMpO3JldHVybiBjLnNsaWNlKDAsYSl9LHNldERlZmF1bHRQYXJhbm9pYTpmdW5jdGlvbihhLGIpe2lmKDA9PT1hJiZcIlNldHRpbmcgcGFyYW5vaWE9MCB3aWxsIHJ1aW4geW91ciBzZWN1cml0eTsgdXNlIGl0IG9ubHkgZm9yIHRlc3RpbmdcIiE9PWIpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJTZXR0aW5nIHBhcmFub2lhPTAgd2lsbCBydWluIHlvdXIgc2VjdXJpdHk7IHVzZSBpdCBvbmx5IGZvciB0ZXN0aW5nXCIpO3RoaXMuTD1hfSxhZGRFbnRyb3B5OmZ1bmN0aW9uKGEsXG5iLGMpe2M9Y3x8XCJ1c2VyXCI7dmFyIGQsZSxmPShuZXcgRGF0ZSkudmFsdWVPZigpLGc9dGhpcy5HW2NdLGg9dGhpcy5pc1JlYWR5KCksaz0wO2Q9dGhpcy5UW2NdO3ZvaWQgMD09PWQmJihkPXRoaXMuVFtjXT10aGlzLmZhKyspO3ZvaWQgMD09PWcmJihnPXRoaXMuR1tjXT0wKTt0aGlzLkdbY109KHRoaXMuR1tjXSsxKSV0aGlzLmgubGVuZ3RoO3N3aXRjaCh0eXBlb2YgYSl7Y2FzZSBcIm51bWJlclwiOnZvaWQgMD09PWImJihiPTEpO3RoaXMuaFtnXS51cGRhdGUoW2QsdGhpcy5NKyssMSxiLGYsMSxhfDBdKTticmVhaztjYXNlIFwib2JqZWN0XCI6Yz1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSk7aWYoXCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiPT09Yyl7ZT1bXTtmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWUucHVzaChhW2NdKTthPWV9ZWxzZSBmb3IoXCJbb2JqZWN0IEFycmF5XVwiIT09YyYmKGs9MSksYz0wO2M8YS5sZW5ndGgmJiFrO2MrKylcIm51bWJlclwiIT09dHlwZW9mIGFbY10mJlxuKGs9MSk7aWYoIWspe2lmKHZvaWQgMD09PWIpZm9yKGM9Yj0wO2M8YS5sZW5ndGg7YysrKWZvcihlPWFbY107MDxlOyliKyssZT1lPj4+MTt0aGlzLmhbZ10udXBkYXRlKFtkLHRoaXMuTSsrLDIsYixmLGEubGVuZ3RoXS5jb25jYXQoYSkpfWJyZWFrO2Nhc2UgXCJzdHJpbmdcIjp2b2lkIDA9PT1iJiYoYj1hLmxlbmd0aCk7dGhpcy5oW2ddLnVwZGF0ZShbZCx0aGlzLk0rKywzLGIsZixhLmxlbmd0aF0pO3RoaXMuaFtnXS51cGRhdGUoYSk7YnJlYWs7ZGVmYXVsdDprPTF9aWYoayl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwicmFuZG9tOiBhZGRFbnRyb3B5IG9ubHkgc3VwcG9ydHMgbnVtYmVyLCBhcnJheSBvZiBudW1iZXJzIG9yIHN0cmluZ1wiKTt0aGlzLnNbZ10rPWI7dGhpcy5pKz1iO2g9PT10aGlzLkEmJih0aGlzLmlzUmVhZHkoKSE9PXRoaXMuQSYmY2EoXCJzZWVkZWRcIixNYXRoLm1heCh0aGlzLnUsdGhpcy5pKSksY2EoXCJwcm9ncmVzc1wiLHRoaXMuZ2V0UHJvZ3Jlc3MoKSkpfSxcbmlzUmVhZHk6ZnVuY3Rpb24oYSl7YT10aGlzLlJbdm9pZCAwIT09YT9hOnRoaXMuTF07cmV0dXJuIHRoaXMudSYmdGhpcy51Pj1hP3RoaXMuc1swXT50aGlzLiQmJihuZXcgRGF0ZSkudmFsdWVPZigpPnRoaXMuWD90aGlzLkl8dGhpcy5IOnRoaXMuSDp0aGlzLmk+PWE/dGhpcy5JfHRoaXMuQTp0aGlzLkF9LGdldFByb2dyZXNzOmZ1bmN0aW9uKGEpe2E9dGhpcy5SW2E/YTp0aGlzLkxdO3JldHVybiB0aGlzLnU+PWE/MTp0aGlzLmk+YT8xOnRoaXMuaS9hfSxzdGFydENvbGxlY3RvcnM6ZnVuY3Rpb24oKXtpZighdGhpcy5EKXt0aGlzLmE9e2xvYWRUaW1lQ29sbGVjdG9yOk8odGhpcyx0aGlzLmxhKSxtb3VzZUNvbGxlY3RvcjpPKHRoaXMsdGhpcy5uYSksa2V5Ym9hcmRDb2xsZWN0b3I6Tyh0aGlzLHRoaXMuamEpLGFjY2VsZXJvbWV0ZXJDb2xsZWN0b3I6Tyh0aGlzLHRoaXMuY2EpLHRvdWNoQ29sbGVjdG9yOk8odGhpcyx0aGlzLnBhKX07aWYod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsXG50aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcy5hLm1vdXNlQ29sbGVjdG9yLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRldmljZW1vdGlvblwiLHRoaXMuYS5hY2NlbGVyb21ldGVyQ29sbGVjdG9yLCExKSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHRoaXMuYS50b3VjaENvbGxlY3RvciwhMSk7ZWxzZSBpZihkb2N1bWVudC5hdHRhY2hFdmVudClkb2N1bWVudC5hdHRhY2hFdmVudChcIm9ubG9hZFwiLHRoaXMuYS5sb2FkVGltZUNvbGxlY3RvciksZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJvbm1vdXNlbW92ZVwiLHRoaXMuYS5tb3VzZUNvbGxlY3RvciksZG9jdW1lbnQuYXR0YWNoRXZlbnQoXCJrZXlwcmVzc1wiLHRoaXMuYS5rZXlib2FyZENvbGxlY3Rvcik7ZWxzZSB0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uYnVnKFwiY2FuJ3QgYXR0YWNoIGV2ZW50XCIpO1xudGhpcy5EPSEwfX0sc3RvcENvbGxlY3RvcnM6ZnVuY3Rpb24oKXt0aGlzLkQmJih3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcj8od2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsdGhpcy5hLmxvYWRUaW1lQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLHRoaXMuYS5tb3VzZUNvbGxlY3RvciwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLHRoaXMuYS5rZXlib2FyZENvbGxlY3RvciwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJkZXZpY2Vtb3Rpb25cIix0aGlzLmEuYWNjZWxlcm9tZXRlckNvbGxlY3RvciwhMSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIix0aGlzLmEudG91Y2hDb2xsZWN0b3IsITEpKTpkb2N1bWVudC5kZXRhY2hFdmVudCYmKGRvY3VtZW50LmRldGFjaEV2ZW50KFwib25sb2FkXCIsdGhpcy5hLmxvYWRUaW1lQ29sbGVjdG9yKSxkb2N1bWVudC5kZXRhY2hFdmVudChcIm9ubW91c2Vtb3ZlXCIsXG50aGlzLmEubW91c2VDb2xsZWN0b3IpLGRvY3VtZW50LmRldGFjaEV2ZW50KFwia2V5cHJlc3NcIix0aGlzLmEua2V5Ym9hcmRDb2xsZWN0b3IpKSx0aGlzLkQ9ITEpfSxhZGRFdmVudExpc3RlbmVyOmZ1bmN0aW9uKGEsYil7dGhpcy5KW2FdW3RoaXMuZWErK109Yn0scmVtb3ZlRXZlbnRMaXN0ZW5lcjpmdW5jdGlvbihhLGIpe3ZhciBjLGQsZT10aGlzLkpbYV0sZj1bXTtmb3IoZCBpbiBlKWUuaGFzT3duUHJvcGVydHkoZCkmJmVbZF09PT1iJiZmLnB1c2goZCk7Zm9yKGM9MDtjPGYubGVuZ3RoO2MrKylkPWZbY10sZGVsZXRlIGVbZF19LGphOmZ1bmN0aW9uKCl7VCh0aGlzLDEpfSxuYTpmdW5jdGlvbihhKXt2YXIgYixjO3RyeXtiPWEueHx8YS5jbGllbnRYfHxhLm9mZnNldFh8fDAsYz1hLnl8fGEuY2xpZW50WXx8YS5vZmZzZXRZfHwwfWNhdGNoKGQpe2M9Yj0wfTAhPWImJjAhPWMmJnRoaXMuYWRkRW50cm9weShbYixjXSwyLFwibW91c2VcIik7VCh0aGlzLDApfSxwYTpmdW5jdGlvbihhKXthPVxuYS50b3VjaGVzWzBdfHxhLmNoYW5nZWRUb3VjaGVzWzBdO3RoaXMuYWRkRW50cm9weShbYS5wYWdlWHx8YS5jbGllbnRYLGEucGFnZVl8fGEuY2xpZW50WV0sMSxcInRvdWNoXCIpO1QodGhpcywwKX0sbGE6ZnVuY3Rpb24oKXtUKHRoaXMsMil9LGNhOmZ1bmN0aW9uKGEpe2E9YS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnh8fGEuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS55fHxhLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkuejtpZih3aW5kb3cub3JpZW50YXRpb24pe3ZhciBiPXdpbmRvdy5vcmllbnRhdGlvbjtcIm51bWJlclwiPT09dHlwZW9mIGImJnRoaXMuYWRkRW50cm9weShiLDEsXCJhY2NlbGVyb21ldGVyXCIpfWEmJnRoaXMuYWRkRW50cm9weShhLDIsXCJhY2NlbGVyb21ldGVyXCIpO1QodGhpcywwKX19O1xuZnVuY3Rpb24gY2EoYSxiKXt2YXIgYyxkPXNqY2wucmFuZG9tLkpbYV0sZT1bXTtmb3IoYyBpbiBkKWQuaGFzT3duUHJvcGVydHkoYykmJmUucHVzaChkW2NdKTtmb3IoYz0wO2M8ZS5sZW5ndGg7YysrKWVbY10oYil9ZnVuY3Rpb24gVChhLGIpe1widW5kZWZpbmVkXCIhPT10eXBlb2Ygd2luZG93JiZ3aW5kb3cucGVyZm9ybWFuY2UmJlwiZnVuY3Rpb25cIj09PXR5cGVvZiB3aW5kb3cucGVyZm9ybWFuY2Uubm93P2EuYWRkRW50cm9weSh3aW5kb3cucGVyZm9ybWFuY2Uubm93KCksYixcImxvYWR0aW1lXCIpOmEuYWRkRW50cm9weSgobmV3IERhdGUpLnZhbHVlT2YoKSxiLFwibG9hZHRpbWVcIil9ZnVuY3Rpb24gYmEoYSl7YS5iPU4oYSkuY29uY2F0KE4oYSkpO2EuSz1uZXcgc2pjbC5jaXBoZXIuYWVzKGEuYil9ZnVuY3Rpb24gTihhKXtmb3IodmFyIGI9MDs0PmImJihhLm1bYl09YS5tW2JdKzF8MCwhYS5tW2JdKTtiKyspO3JldHVybiBhLksuZW5jcnlwdChhLm0pfVxuZnVuY3Rpb24gTyhhLGIpe3JldHVybiBmdW5jdGlvbigpe2IuYXBwbHkoYSxhcmd1bWVudHMpfX1zamNsLnJhbmRvbT1uZXcgc2pjbC5wcm5nKDYpO1xuYTp0cnl7dmFyIFUsZGEsWixoYTtpZihoYT1cInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMpe3ZhciBpYTt0cnl7aWE9cmVxdWlyZShcImNyeXB0b1wiKX1jYXRjaChhKXtpYT1udWxsfWhhPWRhPWlhfWlmKGhhJiZkYS5yYW5kb21CeXRlcylVPWRhLnJhbmRvbUJ5dGVzKDEyOCksVT1uZXcgVWludDMyQXJyYXkoKG5ldyBVaW50OEFycmF5KFUpKS5idWZmZXIpLHNqY2wucmFuZG9tLmFkZEVudHJvcHkoVSwxMDI0LFwiY3J5cHRvWydyYW5kb21CeXRlcyddXCIpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiB3aW5kb3cmJlwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe1o9bmV3IFVpbnQzMkFycmF5KDMyKTtpZih3aW5kb3cuY3J5cHRvJiZ3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyl3aW5kb3cuY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhaKTtlbHNlIGlmKHdpbmRvdy5tc0NyeXB0byYmd2luZG93Lm1zQ3J5cHRvLmdldFJhbmRvbVZhbHVlcyl3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKFopO1xuZWxzZSBicmVhayBhO3NqY2wucmFuZG9tLmFkZEVudHJvcHkoWiwxMDI0LFwiY3J5cHRvWydnZXRSYW5kb21WYWx1ZXMnXVwiKX19Y2F0Y2goYSl7XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiB3aW5kb3cmJndpbmRvdy5jb25zb2xlJiYoY29uc29sZS5sb2coXCJUaGVyZSB3YXMgYW4gZXJyb3IgY29sbGVjdGluZyBlbnRyb3B5IGZyb20gdGhlIGJyb3dzZXI6XCIpLGNvbnNvbGUubG9nKGEpKX1cbnNqY2wuanNvbj17ZGVmYXVsdHM6e3Y6MSxpdGVyOjFFNCxrczoxMjgsdHM6NjQsbW9kZTpcImNjbVwiLGFkYXRhOlwiXCIsY2lwaGVyOlwiYWVzXCJ9LGhhOmZ1bmN0aW9uKGEsYixjLGQpe2M9Y3x8e307ZD1kfHx7fTt2YXIgZT1zamNsLmpzb24sZj1lLmooe2l2OnNqY2wucmFuZG9tLnJhbmRvbVdvcmRzKDQsMCl9LGUuZGVmYXVsdHMpLGc7ZS5qKGYsYyk7Yz1mLmFkYXRhO1wic3RyaW5nXCI9PT10eXBlb2YgZi5zYWx0JiYoZi5zYWx0PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhmLnNhbHQpKTtcInN0cmluZ1wiPT09dHlwZW9mIGYuaXYmJihmLml2PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhmLml2KSk7aWYoIXNqY2wubW9kZVtmLm1vZGVdfHwhc2pjbC5jaXBoZXJbZi5jaXBoZXJdfHxcInN0cmluZ1wiPT09dHlwZW9mIGEmJjEwMD49Zi5pdGVyfHw2NCE9PWYudHMmJjk2IT09Zi50cyYmMTI4IT09Zi50c3x8MTI4IT09Zi5rcyYmMTkyIT09Zi5rcyYmMHgxMDAhPT1mLmtzfHwyPmYuaXYubGVuZ3RofHxcbjQ8Zi5pdi5sZW5ndGgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGVuY3J5cHQ6IGludmFsaWQgcGFyYW1ldGVyc1wiKTtcInN0cmluZ1wiPT09dHlwZW9mIGE/KGc9c2pjbC5taXNjLmNhY2hlZFBia2RmMihhLGYpLGE9Zy5rZXkuc2xpY2UoMCxmLmtzLzMyKSxmLnNhbHQ9Zy5zYWx0KTpzamNsLmVjYyYmYSBpbnN0YW5jZW9mIHNqY2wuZWNjLmVsR2FtYWwucHVibGljS2V5JiYoZz1hLmtlbSgpLGYua2VtdGFnPWcudGFnLGE9Zy5rZXkuc2xpY2UoMCxmLmtzLzMyKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBiJiYoYj1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGIpKTtcInN0cmluZ1wiPT09dHlwZW9mIGMmJihmLmFkYXRhPWM9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhjKSk7Zz1uZXcgc2pjbC5jaXBoZXJbZi5jaXBoZXJdKGEpO2UuaihkLGYpO2Qua2V5PWE7Zi5jdD1cImNjbVwiPT09Zi5tb2RlJiZzamNsLmFycmF5QnVmZmVyJiZzamNsLmFycmF5QnVmZmVyLmNjbSYmXG5iIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/c2pjbC5hcnJheUJ1ZmZlci5jY20uZW5jcnlwdChnLGIsZi5pdixjLGYudHMpOnNqY2wubW9kZVtmLm1vZGVdLmVuY3J5cHQoZyxiLGYuaXYsYyxmLnRzKTtyZXR1cm4gZn0sZW5jcnlwdDpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1zamNsLmpzb24sZj1lLmhhLmFwcGx5KGUsYXJndW1lbnRzKTtyZXR1cm4gZS5lbmNvZGUoZil9LGdhOmZ1bmN0aW9uKGEsYixjLGQpe2M9Y3x8e307ZD1kfHx7fTt2YXIgZT1zamNsLmpzb247Yj1lLmooZS5qKGUuaih7fSxlLmRlZmF1bHRzKSxiKSxjLCEwKTt2YXIgZixnO2Y9Yi5hZGF0YTtcInN0cmluZ1wiPT09dHlwZW9mIGIuc2FsdCYmKGIuc2FsdD1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYi5zYWx0KSk7XCJzdHJpbmdcIj09PXR5cGVvZiBiLml2JiYoYi5pdj1zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYi5pdikpO2lmKCFzamNsLm1vZGVbYi5tb2RlXXx8IXNqY2wuY2lwaGVyW2IuY2lwaGVyXXx8XCJzdHJpbmdcIj09PVxudHlwZW9mIGEmJjEwMD49Yi5pdGVyfHw2NCE9PWIudHMmJjk2IT09Yi50cyYmMTI4IT09Yi50c3x8MTI4IT09Yi5rcyYmMTkyIT09Yi5rcyYmMHgxMDAhPT1iLmtzfHwhYi5pdnx8Mj5iLml2Lmxlbmd0aHx8NDxiLml2Lmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZGVjcnlwdDogaW52YWxpZCBwYXJhbWV0ZXJzXCIpO1wic3RyaW5nXCI9PT10eXBlb2YgYT8oZz1zamNsLm1pc2MuY2FjaGVkUGJrZGYyKGEsYiksYT1nLmtleS5zbGljZSgwLGIua3MvMzIpLGIuc2FsdD1nLnNhbHQpOnNqY2wuZWNjJiZhIGluc3RhbmNlb2Ygc2pjbC5lY2MuZWxHYW1hbC5zZWNyZXRLZXkmJihhPWEudW5rZW0oc2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGIua2VtdGFnKSkuc2xpY2UoMCxiLmtzLzMyKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBmJiYoZj1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGYpKTtnPW5ldyBzamNsLmNpcGhlcltiLmNpcGhlcl0oYSk7Zj1cImNjbVwiPT09XG5iLm1vZGUmJnNqY2wuYXJyYXlCdWZmZXImJnNqY2wuYXJyYXlCdWZmZXIuY2NtJiZiLmN0IGluc3RhbmNlb2YgQXJyYXlCdWZmZXI/c2pjbC5hcnJheUJ1ZmZlci5jY20uZGVjcnlwdChnLGIuY3QsYi5pdixiLnRhZyxmLGIudHMpOnNqY2wubW9kZVtiLm1vZGVdLmRlY3J5cHQoZyxiLmN0LGIuaXYsZixiLnRzKTtlLmooZCxiKTtkLmtleT1hO3JldHVybiAxPT09Yy5yYXc/ZjpzamNsLmNvZGVjLnV0ZjhTdHJpbmcuZnJvbUJpdHMoZil9LGRlY3J5cHQ6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9c2pjbC5qc29uO3JldHVybiBlLmdhKGEsZS5kZWNvZGUoYiksYyxkKX0sZW5jb2RlOmZ1bmN0aW9uKGEpe3ZhciBiLGM9XCJ7XCIsZD1cIlwiO2ZvcihiIGluIGEpaWYoYS5oYXNPd25Qcm9wZXJ0eShiKSl7aWYoIWIubWF0Y2goL15bYS16MC05XSskL2kpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBlbmNvZGU6IGludmFsaWQgcHJvcGVydHkgbmFtZVwiKTtjKz1kKydcIicrXG5iKydcIjonO2Q9XCIsXCI7c3dpdGNoKHR5cGVvZiBhW2JdKXtjYXNlIFwibnVtYmVyXCI6Y2FzZSBcImJvb2xlYW5cIjpjKz1hW2JdO2JyZWFrO2Nhc2UgXCJzdHJpbmdcIjpjKz0nXCInK2VzY2FwZShhW2JdKSsnXCInO2JyZWFrO2Nhc2UgXCJvYmplY3RcIjpjKz0nXCInK3NqY2wuY29kZWMuYmFzZTY0LmZyb21CaXRzKGFbYl0sMCkrJ1wiJzticmVhaztkZWZhdWx0OnRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJqc29uIGVuY29kZTogdW5zdXBwb3J0ZWQgdHlwZVwiKTt9fXJldHVybiBjK1wifVwifSxkZWNvZGU6ZnVuY3Rpb24oYSl7YT1hLnJlcGxhY2UoL1xccy9nLFwiXCIpO2lmKCFhLm1hdGNoKC9eXFx7LipcXH0kLykpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGRlY29kZTogdGhpcyBpc24ndCBqc29uIVwiKTthPWEucmVwbGFjZSgvXlxce3xcXH0kL2csXCJcIikuc3BsaXQoLywvKTt2YXIgYj17fSxjLGQ7Zm9yKGM9MDtjPGEubGVuZ3RoO2MrKyl7aWYoIShkPWFbY10ubWF0Y2goL15cXHMqKD86KFtcIiddPykoW2Etel1bYS16MC05XSopXFwxKVxccyo6XFxzKig/OigtP1xcZCspfFwiKFthLXowLTkrXFwvJSpfLkA9XFwtXSopXCJ8KHRydWV8ZmFsc2UpKSQvaSkpKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBkZWNvZGU6IHRoaXMgaXNuJ3QganNvbiFcIik7XG5udWxsIT1kWzNdP2JbZFsyXV09cGFyc2VJbnQoZFszXSwxMCk6bnVsbCE9ZFs0XT9iW2RbMl1dPWRbMl0ubWF0Y2goL14oY3R8YWRhdGF8c2FsdHxpdikkLyk/c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGRbNF0pOnVuZXNjYXBlKGRbNF0pOm51bGwhPWRbNV0mJihiW2RbMl1dPVwidHJ1ZVwiPT09ZFs1XSl9cmV0dXJuIGJ9LGo6ZnVuY3Rpb24oYSxiLGMpe3ZvaWQgMD09PWEmJihhPXt9KTtpZih2b2lkIDA9PT1iKXJldHVybiBhO2Zvcih2YXIgZCBpbiBiKWlmKGIuaGFzT3duUHJvcGVydHkoZCkpe2lmKGMmJnZvaWQgMCE9PWFbZF0mJmFbZF0hPT1iW2RdKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwicmVxdWlyZWQgcGFyYW1ldGVyIG92ZXJyaWRkZW5cIik7YVtkXT1iW2RdfXJldHVybiBhfSxyYTpmdW5jdGlvbihhLGIpe3ZhciBjPXt9LGQ7Zm9yKGQgaW4gYSlhLmhhc093blByb3BlcnR5KGQpJiZhW2RdIT09YltkXSYmKGNbZF09YVtkXSk7cmV0dXJuIGN9LHFhOmZ1bmN0aW9uKGEsXG5iKXt2YXIgYz17fSxkO2ZvcihkPTA7ZDxiLmxlbmd0aDtkKyspdm9pZCAwIT09YVtiW2RdXSYmKGNbYltkXV09YVtiW2RdXSk7cmV0dXJuIGN9fTtzamNsLmVuY3J5cHQ9c2pjbC5qc29uLmVuY3J5cHQ7c2pjbC5kZWNyeXB0PXNqY2wuanNvbi5kZWNyeXB0O3NqY2wubWlzYy5vYT17fTtzamNsLm1pc2MuY2FjaGVkUGJrZGYyPWZ1bmN0aW9uKGEsYil7dmFyIGM9c2pjbC5taXNjLm9hLGQ7Yj1ifHx7fTtkPWIuaXRlcnx8MUUzO2M9Y1thXT1jW2FdfHx7fTtkPWNbZF09Y1tkXXx8e2ZpcnN0U2FsdDpiLnNhbHQmJmIuc2FsdC5sZW5ndGg/Yi5zYWx0LnNsaWNlKDApOnNqY2wucmFuZG9tLnJhbmRvbVdvcmRzKDIsMCl9O2M9dm9pZCAwPT09Yi5zYWx0P2QuZmlyc3RTYWx0OmIuc2FsdDtkW2NdPWRbY118fHNqY2wubWlzYy5wYmtkZjIoYSxjLGIuaXRlcik7cmV0dXJue2tleTpkW2NdLnNsaWNlKDApLHNhbHQ6Yy5zbGljZSgwKX19O1xuXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9c2pjbCk7XCJmdW5jdGlvblwiPT09dHlwZW9mIGRlZmluZSYmZGVmaW5lKFtdLGZ1bmN0aW9uKCl7cmV0dXJuIHNqY2x9KTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG4gICwgcHJlZml4ID0gJ34nO1xuXG4vKipcbiAqIENvbnN0cnVjdG9yIHRvIGNyZWF0ZSBhIHN0b3JhZ2UgZm9yIG91ciBgRUVgIG9iamVjdHMuXG4gKiBBbiBgRXZlbnRzYCBpbnN0YW5jZSBpcyBhIHBsYWluIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIGFyZSBldmVudCBuYW1lcy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIEV2ZW50cygpIHt9XG5cbi8vXG4vLyBXZSB0cnkgdG8gbm90IGluaGVyaXQgZnJvbSBgT2JqZWN0LnByb3RvdHlwZWAuIEluIHNvbWUgZW5naW5lcyBjcmVhdGluZyBhblxuLy8gaW5zdGFuY2UgaW4gdGhpcyB3YXkgaXMgZmFzdGVyIHRoYW4gY2FsbGluZyBgT2JqZWN0LmNyZWF0ZShudWxsKWAgZGlyZWN0bHkuXG4vLyBJZiBgT2JqZWN0LmNyZWF0ZShudWxsKWAgaXMgbm90IHN1cHBvcnRlZCB3ZSBwcmVmaXggdGhlIGV2ZW50IG5hbWVzIHdpdGggYVxuLy8gY2hhcmFjdGVyIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBidWlsdC1pbiBvYmplY3QgcHJvcGVydGllcyBhcmUgbm90XG4vLyBvdmVycmlkZGVuIG9yIHVzZWQgYXMgYW4gYXR0YWNrIHZlY3Rvci5cbi8vXG5pZiAoT2JqZWN0LmNyZWF0ZSkge1xuICBFdmVudHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICAvL1xuICAvLyBUaGlzIGhhY2sgaXMgbmVlZGVkIGJlY2F1c2UgdGhlIGBfX3Byb3RvX19gIHByb3BlcnR5IGlzIHN0aWxsIGluaGVyaXRlZCBpblxuICAvLyBzb21lIG9sZCBicm93c2VycyBsaWtlIEFuZHJvaWQgNCwgaVBob25lIDUuMSwgT3BlcmEgMTEgYW5kIFNhZmFyaSA1LlxuICAvL1xuICBpZiAoIW5ldyBFdmVudHMoKS5fX3Byb3RvX18pIHByZWZpeCA9IGZhbHNlO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIGV2ZW50IGxpc3RlbmVyLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvbmNlPWZhbHNlXSBTcGVjaWZ5IGlmIHRoZSBsaXN0ZW5lciBpcyBhIG9uZS10aW1lIGxpc3RlbmVyLlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogQWRkIGEgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtFdmVudEVtaXR0ZXJ9IGVtaXR0ZXIgUmVmZXJlbmNlIHRvIHRoZSBgRXZlbnRFbWl0dGVyYCBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgU3BlY2lmeSBpZiB0aGUgbGlzdGVuZXIgaXMgYSBvbmUtdGltZSBsaXN0ZW5lci5cbiAqIEByZXR1cm5zIHtFdmVudEVtaXR0ZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcihlbWl0dGVyLCBldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgaWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcbiAgfVxuXG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCBlbWl0dGVyLCBvbmNlKVxuICAgICwgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudDtcblxuICBpZiAoIWVtaXR0ZXIuX2V2ZW50c1tldnRdKSBlbWl0dGVyLl9ldmVudHNbZXZ0XSA9IGxpc3RlbmVyLCBlbWl0dGVyLl9ldmVudHNDb3VudCsrO1xuICBlbHNlIGlmICghZW1pdHRlci5fZXZlbnRzW2V2dF0uZm4pIGVtaXR0ZXIuX2V2ZW50c1tldnRdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlIGVtaXR0ZXIuX2V2ZW50c1tldnRdID0gW2VtaXR0ZXIuX2V2ZW50c1tldnRdLCBsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIGVtaXR0ZXI7XG59XG5cbi8qKlxuICogQ2xlYXIgZXZlbnQgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge0V2ZW50RW1pdHRlcn0gZW1pdHRlciBSZWZlcmVuY2UgdG8gdGhlIGBFdmVudEVtaXR0ZXJgIGluc3RhbmNlLlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2dCBUaGUgRXZlbnQgbmFtZS5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNsZWFyRXZlbnQoZW1pdHRlciwgZXZ0KSB7XG4gIGlmICgtLWVtaXR0ZXIuX2V2ZW50c0NvdW50ID09PSAwKSBlbWl0dGVyLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIGVsc2UgZGVsZXRlIGVtaXR0ZXIuX2V2ZW50c1tldnRdO1xufVxuXG4vKipcbiAqIE1pbmltYWwgYEV2ZW50RW1pdHRlcmAgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIGBFdmVudEVtaXR0ZXJgIGludGVyZmFjZS5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICB0aGlzLl9ldmVudHMgPSBuZXcgRXZlbnRzKCk7XG4gIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYW4gYXJyYXkgbGlzdGluZyB0aGUgZXZlbnRzIGZvciB3aGljaCB0aGUgZW1pdHRlciBoYXMgcmVnaXN0ZXJlZFxuICogbGlzdGVuZXJzLlxuICpcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5ldmVudE5hbWVzID0gZnVuY3Rpb24gZXZlbnROYW1lcygpIHtcbiAgdmFyIG5hbWVzID0gW11cbiAgICAsIGV2ZW50c1xuICAgICwgbmFtZTtcblxuICBpZiAodGhpcy5fZXZlbnRzQ291bnQgPT09IDApIHJldHVybiBuYW1lcztcblxuICBmb3IgKG5hbWUgaW4gKGV2ZW50cyA9IHRoaXMuX2V2ZW50cykpIHtcbiAgICBpZiAoaGFzLmNhbGwoZXZlbnRzLCBuYW1lKSkgbmFtZXMucHVzaChwcmVmaXggPyBuYW1lLnNsaWNlKDEpIDogbmFtZSk7XG4gIH1cblxuICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgIHJldHVybiBuYW1lcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhldmVudHMpKTtcbiAgfVxuXG4gIHJldHVybiBuYW1lcztcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBsaXN0ZW5lcnMgcmVnaXN0ZXJlZCBmb3IgYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFRoZSByZWdpc3RlcmVkIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnRcbiAgICAsIGhhbmRsZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuIFtdO1xuICBpZiAoaGFuZGxlcnMuZm4pIHJldHVybiBbaGFuZGxlcnMuZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gaGFuZGxlcnMubGVuZ3RoLCBlZSA9IG5ldyBBcnJheShsKTsgaSA8IGw7IGkrKykge1xuICAgIGVlW2ldID0gaGFuZGxlcnNbaV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIFJldHVybiB0aGUgbnVtYmVyIG9mIGxpc3RlbmVycyBsaXN0ZW5pbmcgdG8gYSBnaXZlbiBldmVudC5cbiAqXG4gKiBAcGFyYW0geyhTdHJpbmd8U3ltYm9sKX0gZXZlbnQgVGhlIGV2ZW50IG5hbWUuXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGxpc3RlbmVycy5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24gbGlzdGVuZXJDb3VudChldmVudCkge1xuICB2YXIgZXZ0ID0gcHJlZml4ID8gcHJlZml4ICsgZXZlbnQgOiBldmVudFxuICAgICwgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKCFsaXN0ZW5lcnMpIHJldHVybiAwO1xuICBpZiAobGlzdGVuZXJzLmZuKSByZXR1cm4gMTtcbiAgcmV0dXJuIGxpc3RlbmVycy5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENhbGxzIGVhY2ggb2YgdGhlIGxpc3RlbmVycyByZWdpc3RlcmVkIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV2ZW50IGhhZCBsaXN0ZW5lcnMsIGVsc2UgYGZhbHNlYC5cbiAqIEBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIHZhciBldnQgPSBwcmVmaXggPyBwcmVmaXggKyBldmVudCA6IGV2ZW50O1xuXG4gIGlmICghdGhpcy5fZXZlbnRzW2V2dF0pIHJldHVybiBmYWxzZTtcblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChsaXN0ZW5lcnMub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzLmZuLCB1bmRlZmluZWQsIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgY2FzZSA0OiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyLCBhMyk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGlmICghYXJncykgZm9yIChqID0gMSwgYXJncyA9IG5ldyBBcnJheShsZW4gLTEpOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaiAtIDFdID0gYXJndW1lbnRzW2pdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxpc3RlbmVyc1tpXS5mbi5hcHBseShsaXN0ZW5lcnNbaV0uY29udGV4dCwgYXJncyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCBhIGxpc3RlbmVyIGZvciBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2NvbnRleHQ9dGhpc10gVGhlIGNvbnRleHQgdG8gaW52b2tlIHRoZSBsaXN0ZW5lciB3aXRoLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gb24oZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogQWRkIGEgb25lLXRpbWUgbGlzdGVuZXIgZm9yIGEgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHsoU3RyaW5nfFN5bWJvbCl9IGV2ZW50IFRoZSBldmVudCBuYW1lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBbY29udGV4dD10aGlzXSBUaGUgY29udGV4dCB0byBpbnZva2UgdGhlIGxpc3RlbmVyIHdpdGguXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHJldHVybiBhZGRMaXN0ZW5lcih0aGlzLCBldmVudCwgZm4sIGNvbnRleHQsIHRydWUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGxpc3RlbmVycyBvZiBhIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBldmVudCBUaGUgZXZlbnQgbmFtZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBtYXRjaCB0aGlzIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IE9ubHkgcmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdGhhdCBoYXZlIHRoaXMgY29udGV4dC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmUtdGltZSBsaXN0ZW5lcnMuXG4gKiBAcmV0dXJucyB7RXZlbnRFbWl0dGVyfSBgdGhpc2AuXG4gKiBAcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdmFyIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZ0XSkgcmV0dXJuIHRoaXM7XG4gIGlmICghZm4pIHtcbiAgICBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW2V2dF07XG5cbiAgaWYgKGxpc3RlbmVycy5mbikge1xuICAgIGlmIChcbiAgICAgIGxpc3RlbmVycy5mbiA9PT0gZm4gJiZcbiAgICAgICghb25jZSB8fCBsaXN0ZW5lcnMub25jZSkgJiZcbiAgICAgICghY29udGV4dCB8fCBsaXN0ZW5lcnMuY29udGV4dCA9PT0gY29udGV4dClcbiAgICApIHtcbiAgICAgIGNsZWFyRXZlbnQodGhpcywgZXZ0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGV2ZW50cyA9IFtdLCBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChcbiAgICAgICAgbGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fFxuICAgICAgICAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpIHx8XG4gICAgICAgIChjb250ZXh0ICYmIGxpc3RlbmVyc1tpXS5jb250ZXh0ICE9PSBjb250ZXh0KVxuICAgICAgKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9cbiAgICAvLyBSZXNldCB0aGUgYXJyYXksIG9yIHJlbW92ZSBpdCBjb21wbGV0ZWx5IGlmIHdlIGhhdmUgbm8gbW9yZSBsaXN0ZW5lcnMuXG4gICAgLy9cbiAgICBpZiAoZXZlbnRzLmxlbmd0aCkgdGhpcy5fZXZlbnRzW2V2dF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICAgIGVsc2UgY2xlYXJFdmVudCh0aGlzLCBldnQpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzLCBvciB0aG9zZSBvZiB0aGUgc3BlY2lmaWVkIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7KFN0cmluZ3xTeW1ib2wpfSBbZXZlbnRdIFRoZSBldmVudCBuYW1lLlxuICogQHJldHVybnMge0V2ZW50RW1pdHRlcn0gYHRoaXNgLlxuICogQHB1YmxpY1xuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyhldmVudCkge1xuICB2YXIgZXZ0O1xuXG4gIGlmIChldmVudCkge1xuICAgIGV2dCA9IHByZWZpeCA/IHByZWZpeCArIGV2ZW50IDogZXZlbnQ7XG4gICAgaWYgKHRoaXMuX2V2ZW50c1tldnRdKSBjbGVhckV2ZW50KHRoaXMsIGV2dCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZXZlbnRzID0gbmV3IEV2ZW50cygpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBFeHBvc2UgdGhlIHByZWZpeC5cbi8vXG5FdmVudEVtaXR0ZXIucHJlZml4ZWQgPSBwcmVmaXg7XG5cbi8vXG4vLyBBbGxvdyBgRXZlbnRFbWl0dGVyYCB0byBiZSBpbXBvcnRlZCBhcyBtb2R1bGUgbmFtZXNwYWNlLlxuLy9cbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5pZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBtb2R1bGUpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG59XG4iLCAiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQgeyBXT1JLRVJfQUNUSU9OIH0gZnJvbSBcIn4vZW51bS93b3JrZXItYWN0aW9uLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEx1ZmlGaWxlIH0gZnJvbSBcIn4vZW50aXRpZXMvbHVmaS1maWxlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckFjdGlvbk1lc3NhZ2UgfSBmcm9tIFwifi9pbnRlcmZhY2Uvd29ya2VyLWFjdGlvbi1tZXNzYWdlLnRzXCI7XG5pbXBvcnQgeyBFVkVOVCB9IGZyb20gXCJ+L2VudW0vZXZlbnQudHNcIjtcbmltcG9ydCB7IFVQTE9BRF9TVEFUVVMgfSBmcm9tIFwifi9lbnVtL2ZpbGUtc3RhdHVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckV2ZW50IH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1ldmVudC50c1wiO1xuXG5kZWNsYXJlIGxldCBzZWxmOiBXb3JrZXI7XG5cbmV4cG9ydCBjb25zdCBldmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbi8qKlxuICogVXBkYXRlIGZpbGUgaW4gd29ya2VycyBhbmQgcHJvdmlkZSBtb2RpZmljYXRpb25zIHRvIHRoZSBtYWluIHRocmVhZFxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHBhcmFtIGFyZ3NcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVGaWxlID0gKGx1ZmlGaWxlOiBMdWZpRmlsZSwgYXJnczogUGFydGlhbDxMdWZpRmlsZT4pID0+IHtcbiAgT2JqZWN0LmFzc2lnbihsdWZpRmlsZSwgYXJncyk7XG5cbiAgaWYgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgZXZlbnQ6IEVWRU5ULkZJTEVfVVBEQVRFRCxcbiAgICAgIGx1ZmlGaWxlLFxuICAgIH0gYXMgV29ya2VyRXZlbnQpO1xuICB9XG5cbiAgcmV0dXJuIGx1ZmlGaWxlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbmRGaWxlRXJyb3IgPSAobHVmaUZpbGU6IEx1ZmlGaWxlLCBlcnJvcjogRXJyb3IpID0+IHtcbiAgdXBkYXRlRmlsZShsdWZpRmlsZSwgeyB1cGxvYWRTdGF0dXM6IFVQTE9BRF9TVEFUVVMuRkFJTEVEIH0pO1xuXG4gIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudDogRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IgfSBhcyBXb3JrZXJFdmVudCk7XG59O1xuXG4vKipcbiAqIEluaXQgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgZWFjaCBjaGlsZCB3b3JrZXIncyBvbm1lc3NhZ2UgZXZlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0ID0gKCkgPT4ge1xuICBldmVudHMub25jZShFVkVOVC5TT0NLRVRfT1BFTkVELCAoKSA9PiB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICBldmVudDogRVZFTlQuU09DS0VUX09QRU5FRCxcbiAgICB9KTtcbiAgfSk7XG5cbiAgZXZlbnRzLm9uY2UoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudDogRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzV29ya2VyQWN0aW9uTWVzc2FnZSA9IChcbiAgLy8gZGVuby1saW50LWlnbm9yZSBuby1leHBsaWNpdC1hbnlcbiAgbWVzc2FnZTogYW55LFxuKTogbWVzc2FnZSBpcyBXb3JrZXJBY3Rpb25NZXNzYWdlID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgbWVzc2FnZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgIG1lc3NhZ2UgIT09IG51bGwgJiZcbiAgICBcImFjdGlvblwiIGluIG1lc3NhZ2UgJiZcbiAgICBPYmplY3QudmFsdWVzKFdPUktFUl9BQ1RJT04pLmluY2x1ZGVzKG1lc3NhZ2UuYWN0aW9uKVxuICApO1xufTtcbiIsICJjb25zdCBkZWZhdWx0RXJyb3JDb25maWcgPSB7XHJcbiAgICB3aXRoU3RhY2tUcmFjZTogZmFsc2UsXHJcbn07XHJcbi8vIEN1c3RvbSBlcnJvciBvYmplY3RcclxuLy8gQ29udGV4dCAvIGRpc2N1c3Npb246IGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBlcm1hY3JvL25ldmVydGhyb3cvcHVsbC8yMTVcclxuY29uc3QgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yID0gKG1lc3NhZ2UsIHJlc3VsdCwgY29uZmlnID0gZGVmYXVsdEVycm9yQ29uZmlnKSA9PiB7XHJcbiAgICBjb25zdCBkYXRhID0gcmVzdWx0LmlzT2soKVxyXG4gICAgICAgID8geyB0eXBlOiAnT2snLCB2YWx1ZTogcmVzdWx0LnZhbHVlIH1cclxuICAgICAgICA6IHsgdHlwZTogJ0VycicsIHZhbHVlOiByZXN1bHQuZXJyb3IgfTtcclxuICAgIGNvbnN0IG1heWJlU3RhY2sgPSBjb25maWcud2l0aFN0YWNrVHJhY2UgPyBuZXcgRXJyb3IoKS5zdGFjayA6IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgIHN0YWNrOiBtYXliZVN0YWNrLFxyXG4gICAgfTtcclxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cclxuXHJcblxyXG5mdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbnR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xuXG5jbGFzcyBSZXN1bHRBc3luYyB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZXMpIHtcclxuICAgICAgICB0aGlzLl9wcm9taXNlID0gcmVzO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb21TYWZlUHJvbWlzZShwcm9taXNlKSB7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvbWlzZSA9IHByb21pc2UudGhlbigodmFsdWUpID0+IG5ldyBPayh2YWx1ZSkpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmMobmV3UHJvbWlzZSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZnJvbVByb21pc2UocHJvbWlzZSwgZXJyb3JGbikge1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb21pc2UgPSBwcm9taXNlXHJcbiAgICAgICAgICAgIC50aGVuKCh2YWx1ZSkgPT4gbmV3IE9rKHZhbHVlKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiBuZXcgRXJyKGVycm9yRm4oZSkpKTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG5ld1Byb21pc2UpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIHN0YXRpYyBmcm9tVGhyb3dhYmxlKGZuLCBlcnJvckZuKSB7XHJcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmMoKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPayh5aWVsZCBmbiguLi5hcmdzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihlcnJvckZuID8gZXJyb3JGbihlcnJvcikgOiBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKSgpKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGNvbWJpbmUoYXN5bmNSZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRBc3luY0xpc3QoYXN5bmNSZXN1bHRMaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21iaW5lV2l0aEFsbEVycm9ycyhhc3luY1Jlc3VsdExpc3QpIHtcclxuICAgICAgICByZXR1cm4gY29tYmluZVJlc3VsdEFzeW5jTGlzdFdpdGhBbGxFcnJvcnMoYXN5bmNSZXN1bHRMaXN0KTtcclxuICAgIH1cclxuICAgIG1hcChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayh5aWVsZCBmKHJlcy52YWx1ZSkpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIocmVzLmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBuZXdSZXMgPSB5aWVsZCBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdSZXMuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIobmV3UmVzLmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHlpZWxkIGYocmVzLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGVlIGRvZXMgbm90IGNhcmUgYWJvdXQgdGhlIGVycm9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBtYXBFcnIoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc09rKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycih5aWVsZCBmKHJlcy5lcnJvcikpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhlbihmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZSBpbnN0YW5jZW9mIFJlc3VsdEFzeW5jID8gbmV3VmFsdWUuX3Byb21pc2UgOiBuZXdWYWx1ZTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgb3JFbHNlKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGYocmVzLmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuICAgIG1hdGNoKG9rLCBfZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiByZXMubWF0Y2gob2ssIF9lcnIpKTtcclxuICAgIH1cclxuICAgIHVud3JhcE9yKHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHJlcy51bndyYXBPcih0KSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkIHdpbGwgYmUgcmVtb3ZlZCBpbiA5LjAuMC5cclxuICAgICAqXHJcbiAgICAgKiBZb3UgY2FuIHVzZSBgc2FmZVRyeWAgd2l0aG91dCB0aGlzIG1ldGhvZC5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBgYGB0eXBlc2NyaXB0XHJcbiAgICAgKiBzYWZlVHJ5KGFzeW5jIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgKiAgIGNvbnN0IG9rVmFsdWUgPSB5aWVsZCogeW91clJlc3VsdFxyXG4gICAgICogfSlcclxuICAgICAqIGBgYFxyXG4gICAgICogRW11bGF0ZXMgUnVzdCdzIGA/YCBvcGVyYXRvciBpbiBgc2FmZVRyeWAncyBib2R5LiBTZWUgYWxzbyBgc2FmZVRyeWAuXHJcbiAgICAgKi9cclxuICAgIHNhZmVVbndyYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXN5bmNHZW5lcmF0b3IodGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiogc2FmZVVud3JhcF8xKCkge1xyXG4gICAgICAgICAgICByZXR1cm4geWllbGQgX19hd2FpdCh5aWVsZCBfX2F3YWl0KHlpZWxkKiBfX2FzeW5jRGVsZWdhdG9yKF9fYXN5bmNWYWx1ZXMoeWllbGQgX19hd2FpdCh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gcmVzLnNhZmVVbndyYXAoKSkpKSkpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIE1ha2VzIFJlc3VsdEFzeW5jIGltcGxlbWVudCBQcm9taXNlTGlrZTxSZXN1bHQ+XHJcbiAgICB0aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCkge1xyXG4gICAgICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24qIF9hKCkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCBfX2F3YWl0KHRoaXMuX3Byb21pc2UpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLS0gVGhpcyBpcyBzdHJ1Y3R1cmFsbHkgZXF1aXZhbGVudCBhbmQgc2FmZVxyXG4gICAgICAgICAgICAgICAgeWllbGQgeWllbGQgX19hd2FpdChlcnJBc3luYyhyZXN1bHQuZXJyb3IpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9fYXdhaXQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5jb25zdCBva0FzeW5jID0gKHZhbHVlKSA9PiBuZXcgUmVzdWx0QXN5bmMoUHJvbWlzZS5yZXNvbHZlKG5ldyBPayh2YWx1ZSkpKTtcclxuY29uc3QgZXJyQXN5bmMgPSAoZXJyKSA9PiBuZXcgUmVzdWx0QXN5bmMoUHJvbWlzZS5yZXNvbHZlKG5ldyBFcnIoZXJyKSkpO1xyXG5jb25zdCBmcm9tUHJvbWlzZSA9IFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlO1xyXG5jb25zdCBmcm9tU2FmZVByb21pc2UgPSBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2U7XHJcbmNvbnN0IGZyb21Bc3luY1Rocm93YWJsZSA9IFJlc3VsdEFzeW5jLmZyb21UaHJvd2FibGU7XG5cbi8qKlxyXG4gKiBTaG9ydCBjaXJjdWl0cyBvbiB0aGUgRklSU1QgRXJyIHZhbHVlIHRoYXQgd2UgZmluZFxyXG4gKi9cclxuY29uc3QgY29tYmluZVJlc3VsdExpc3QgPSAocmVzdWx0TGlzdCkgPT4ge1xyXG4gICAgbGV0IGFjYyA9IG9rKFtdKTtcclxuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdExpc3QpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgYWNjID0gZXJyKHJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWNjLm1hcCgobGlzdCkgPT4gbGlzdC5wdXNoKHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbn07XHJcbi8qIFRoaXMgaXMgdGhlIHR5cGVzYWZlIHZlcnNpb24gb2YgUHJvbWlzZS5hbGxcclxuICpcclxuICogVGFrZXMgYSBsaXN0IG9mIFJlc3VsdEFzeW5jPFQsIEU+IGFuZCBzdWNjZXNzIGlmIGFsbCBpbm5lciByZXN1bHRzIGFyZSBPayB2YWx1ZXNcclxuICogb3IgZmFpbHMgaWYgb25lIChvciBtb3JlKSBvZiB0aGUgaW5uZXIgcmVzdWx0cyBhcmUgRXJyIHZhbHVlc1xyXG4gKi9cclxuY29uc3QgY29tYmluZVJlc3VsdEFzeW5jTGlzdCA9IChhc3luY1Jlc3VsdExpc3QpID0+IFJlc3VsdEFzeW5jLmZyb21TYWZlUHJvbWlzZShQcm9taXNlLmFsbChhc3luY1Jlc3VsdExpc3QpKS5hbmRUaGVuKGNvbWJpbmVSZXN1bHRMaXN0KTtcclxuLyoqXHJcbiAqIEdpdmUgYSBsaXN0IG9mIGFsbCB0aGUgZXJyb3JzIHdlIGZpbmRcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRMaXN0V2l0aEFsbEVycm9ycyA9IChyZXN1bHRMaXN0KSA9PiB7XHJcbiAgICBsZXQgYWNjID0gb2soW10pO1xyXG4gICAgZm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0TGlzdCkge1xyXG4gICAgICAgIGlmIChyZXN1bHQuaXNFcnIoKSAmJiBhY2MuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICBhY2MuZXJyb3IucHVzaChyZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXN1bHQuaXNFcnIoKSAmJiBhY2MuaXNPaygpKSB7XHJcbiAgICAgICAgICAgIGFjYyA9IGVycihbcmVzdWx0LmVycm9yXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdC5pc09rKCkgJiYgYWNjLmlzT2soKSkge1xyXG4gICAgICAgICAgICBhY2MudmFsdWUucHVzaChyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkbyBub3RoaW5nIHdoZW4gcmVzdWx0LmlzT2soKSAmJiBhY2MuaXNFcnIoKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjYztcclxufTtcclxuY29uc3QgY29tYmluZVJlc3VsdEFzeW5jTGlzdFdpdGhBbGxFcnJvcnMgPSAoYXN5bmNSZXN1bHRMaXN0KSA9PiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoUHJvbWlzZS5hbGwoYXN5bmNSZXN1bHRMaXN0KSkuYW5kVGhlbihjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxyXG52YXIgUmVzdWx0O1xyXG4oZnVuY3Rpb24gKFJlc3VsdCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcyBhIGZ1bmN0aW9uIHdpdGggYSB0cnkgY2F0Y2gsIGNyZWF0aW5nIGEgbmV3IGZ1bmN0aW9uIHdpdGggdGhlIHNhbWVcclxuICAgICAqIGFyZ3VtZW50cyBidXQgcmV0dXJuaW5nIGBPa2AgaWYgc3VjY2Vzc2Z1bCwgYEVycmAgaWYgdGhlIGZ1bmN0aW9uIHRocm93c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBmbiBmdW5jdGlvbiB0byB3cmFwIHdpdGggb2sgb24gc3VjY2VzcyBvciBlcnIgb24gZmFpbHVyZVxyXG4gICAgICogQHBhcmFtIGVycm9yRm4gd2hlbiBhbiBlcnJvciBpcyB0aHJvd24sIHRoaXMgd2lsbCB3cmFwIHRoZSBlcnJvciByZXN1bHQgaWYgcHJvdmlkZWRcclxuICAgICAqL1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGZ1bmN0aW9uIGZyb21UaHJvd2FibGUoZm4sIGVycm9yRm4pIHtcclxuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9rKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlcnIoZXJyb3JGbiA/IGVycm9yRm4oZSkgOiBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuZnJvbVRocm93YWJsZSA9IGZyb21UaHJvd2FibGU7XHJcbiAgICBmdW5jdGlvbiBjb21iaW5lKHJlc3VsdExpc3QpIHtcclxuICAgICAgICByZXR1cm4gY29tYmluZVJlc3VsdExpc3QocmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuY29tYmluZSA9IGNvbWJpbmU7XHJcbiAgICBmdW5jdGlvbiBjb21iaW5lV2l0aEFsbEVycm9ycyhyZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRMaXN0V2l0aEFsbEVycm9ycyhyZXN1bHRMaXN0KTtcclxuICAgIH1cclxuICAgIFJlc3VsdC5jb21iaW5lV2l0aEFsbEVycm9ycyA9IGNvbWJpbmVXaXRoQWxsRXJyb3JzO1xyXG59KShSZXN1bHQgfHwgKFJlc3VsdCA9IHt9KSk7XHJcbmNvbnN0IG9rID0gKHZhbHVlKSA9PiBuZXcgT2sodmFsdWUpO1xyXG5mdW5jdGlvbiBlcnIoZXJyKSB7XHJcbiAgICByZXR1cm4gbmV3IEVycihlcnIpO1xyXG59XHJcbmZ1bmN0aW9uIHNhZmVUcnkoYm9keSkge1xyXG4gICAgY29uc3QgbiA9IGJvZHkoKS5uZXh0KCk7XHJcbiAgICBpZiAobiBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG4udGhlbigocikgPT4gci52YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG4udmFsdWU7XHJcbn1cclxuY2xhc3MgT2sge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBpc09rKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaXNFcnIoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzT2soKTtcclxuICAgIH1cclxuICAgIG1hcChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG9rKGYodGhpcy52YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWFwRXJyKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRocm91Z2goZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpLm1hcCgoX3ZhbHVlKSA9PiB0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShmKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZih0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gVGVlIGRvZXNuJ3QgY2FyZSBhYm91dCB0aGUgZXJyb3JcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIG9yRWxzZShfZikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGFzeW5jQW5kVGhlbihmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYXN5bmNBbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKS5tYXAoKCkgPT4gdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhc3luY01hcChmKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21TYWZlUHJvbWlzZShmKHRoaXMudmFsdWUpKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIHVud3JhcE9yKF92KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICBtYXRjaChvaywgX2Vycikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHNhZmVVbndyYXAoKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLXlpZWxkICovXHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXAoXykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcEVycihjb25maWcpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVOZXZlclRocm93RXJyb3IoJ0NhbGxlZCBgX3Vuc2FmZVVud3JhcEVycmAgb24gYW4gT2snLCB0aGlzLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzLCByZXF1aXJlLXlpZWxkXHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgRXJyIHtcclxuICAgIGNvbnN0cnVjdG9yKGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgfVxyXG4gICAgaXNPaygpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpc0VycigpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuaXNPaygpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWFwKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIG1hcEVycihmKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycihmKHRoaXMuZXJyb3IpKTtcclxuICAgIH1cclxuICAgIGFuZFRocm91Z2goX2YpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgYW5kVGVlKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaGVuKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBvckVsc2UoZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgYXN5bmNBbmRUaGVuKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgYXN5bmNBbmRUaHJvdWdoKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgYXN5bmNNYXAoX2YpIHtcclxuICAgICAgICByZXR1cm4gZXJyQXN5bmModGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICB1bndyYXBPcih2KSB7XHJcbiAgICAgICAgcmV0dXJuIHY7XHJcbiAgICB9XHJcbiAgICBtYXRjaChfb2ssIGVycikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gdGhpcy5lcnJvcjtcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHlpZWxkIGVycihlcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRG8gbm90IHVzZSB0aGlzIGdlbmVyYXRvciBvdXQgb2YgYHNhZmVUcnlgJyk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXAoY29uZmlnKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yKCdDYWxsZWQgYF91bnNhZmVVbndyYXBgIG9uIGFuIEVycicsIHRoaXMsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwRXJyKF8pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcjtcclxuICAgIH1cclxuICAgICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICB5aWVsZCBzZWxmO1xyXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLS0gVGhpcyBpcyBzdHJ1Y3R1cmFsbHkgZXF1aXZhbGVudCBhbmQgc2FmZVxyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IGZyb21UaHJvd2FibGUgPSBSZXN1bHQuZnJvbVRocm93YWJsZTtcclxuLy8jZW5kcmVnaW9uXG5cbmV4cG9ydCB7IEVyciwgT2ssIFJlc3VsdCwgUmVzdWx0QXN5bmMsIGVyciwgZXJyQXN5bmMsIGZyb21Bc3luY1Rocm93YWJsZSwgZnJvbVByb21pc2UsIGZyb21TYWZlUHJvbWlzZSwgZnJvbVRocm93YWJsZSwgb2ssIG9rQXN5bmMsIHNhZmVUcnkgfTtcbiIsICJ0eXBlIEpzb25hYmxlID1cbiAgfCBzdHJpbmdcbiAgfCBudW1iZXJcbiAgfCBib29sZWFuXG4gIHwgbnVsbFxuICB8IHVuZGVmaW5lZFxuICB8IHJlYWRvbmx5IEpzb25hYmxlW11cbiAgfCB7IHJlYWRvbmx5IFtrZXk6IHN0cmluZ106IEpzb25hYmxlIH1cbiAgfCB7IHRvSlNPTigpOiBKc29uYWJsZSB9O1xuXG5leHBvcnQgY2xhc3MgQmFzZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwdWJsaWMgcmVhZG9ubHkgY29udGV4dD86IEpzb25hYmxlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIG1lc3NhZ2U/OiBzdHJpbmcsXG4gICAgb3B0aW9uczogeyBjYXVzZT86IEVycm9yOyBjb250ZXh0PzogSnNvbmFibGUgfSA9IHt9LFxuICApIHtcbiAgICBjb25zdCB7IGNhdXNlLCBjb250ZXh0IH0gPSBvcHRpb25zO1xuXG4gICAgc3VwZXIobWVzc2FnZSwgeyBjYXVzZSB9KTtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG5cbiAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB9XG59XG4iLCAiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcIn4vZXJyb3IvYmFzZS1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgV2ViU29ja2V0RXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige31cbiIsICJpbXBvcnQgeyBXZWJTb2NrZXRFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3dlYnNvY2tldC93ZWJzb2NrZXQtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIFdlYlNvY2tldENvbm5lY3Rpb25FcnJvciBleHRlbmRzIFdlYlNvY2tldEVycm9yIHtcbiAgb3ZlcnJpZGUgbWVzc2FnZSA9IFwiQW4gZXJyb3Igb2NjdXJlZCB3aGlsZSB0cnlpbmcgdG8gY29ubmVjdCB0byBXZWJTb2NrZXRcIjtcbn1cbiIsICJpbXBvcnQgeyBlcnJBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY29ubmVjdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwifi9lcnJvci9zZXJ2ZXItZXJyb3IudHNcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyQ29uZmlnIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3NlcnZlci1jb25maWcudHNcIjtcblxuLyoqXG4gKiBFbnN1cmUgYW4gZXJyb3IgbWVzc2FnZSBpcyB0cmFuc2Zvcm1lZCBpbiBhbiBFcnJvciBvYmplY3RcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbnN1cmVFcnJvciA9ICh2YWx1ZTogdW5rbm93bik6IEVycm9yID0+IHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWx1ZTtcblxuICBsZXQgc3RyaW5naWZpZWQgPSBcIltVbmFibGUgdG8gc3RyaW5naWZ5IHRoZSB0aHJvd24gdmFsdWVdXCI7XG4gIHRyeSB7XG4gICAgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgIC8qIGVtcHR5ICovXG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKHN0cmluZ2lmaWVkKTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgTHVmaSdzIGNvbmZpZyBmcm9tIGl0cyBBUElcbiAqXG4gKiBAcGFyYW0gaW5zdGFuY2VVcmxcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFNlcnZlckNvbmZpZyA9IChcbiAgaW5zdGFuY2VVcmw6IFVSTCxcbik6IFJlc3VsdEFzeW5jPFNlcnZlckNvbmZpZywgRXJyb3I+ID0+IHtcbiAgY29uc3Qgb3JpZ2luTWF0Y2hlcyA9IGluc3RhbmNlVXJsLmhyZWYubWF0Y2goXG4gICAgLyguKj8pXFwvPyg/OlxcL1tkcl17MX1cXC98bG9naW5cXC8/fGZpbGVzXFwvPykvLFxuICApO1xuXG4gIGNvbnN0IHVybE9yaWdpbiA9IG9yaWdpbk1hdGNoZXMgJiYgb3JpZ2luTWF0Y2hlc1sxXVxuICAgID8gb3JpZ2luTWF0Y2hlc1sxXVxuICAgIDogaW5zdGFuY2VVcmwub3JpZ2luO1xuXG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBmZXRjaCh1cmxPcmlnaW4gKyBcIi9hYm91dC9jb25maWdcIiksXG4gICAgKGVycm9yKSA9PlxuICAgICAgbmV3IENvbm5lY3Rpb25FcnJvcih1bmRlZmluZWQsIHtcbiAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgIH0pLFxuICApLmFuZFRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICAgIHJlc3BvbnNlLmpzb24oKSxcbiAgICAgICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICAgIG5ldyBTZXJ2ZXJFcnJvcih1bmRlZmluZWQsIHsgY29udGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0Rlbm9SdW50aW1lID0gKCk6IGJvb2xlYW4gPT4gdHlwZW9mIERlbm8gIT09IFwidW5kZWZpbmVkXCI7XG5cbmV4cG9ydCBjb25zdCBpc1NlY3VyZUNvbnRleHQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBpc0Rlbm9SdW50aW1lKCkgfHwgZ2xvYmFsVGhpcy5pc1NlY3VyZUNvbnRleHQgfHxcbiAgICBnbG9iYWxUaGlzLmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xufTtcblxuZXhwb3J0IGNvbnN0IHdvcmtlclVybCA9IChyZWxhdGl2ZVBhdGg6IHN0cmluZyk6IFVSTCA9PiB7XG4gIHJldHVybiBpc0Rlbm9SdW50aW1lKClcbiAgICA/IG5ldyBVUkwoYC4vd29ya2VyLyR7cmVsYXRpdmVQYXRofS50c2AsIG5ldyBVUkwoXCIuXCIsIGltcG9ydC5tZXRhLnVybCkuaHJlZilcbiAgICA6IG5ldyBVUkwoXG4gICAgICBpbXBvcnQubWV0YS5yZXNvbHZlKFxuICAgICAgICBgLi8ke1xuICAgICAgICAgIHJlbGF0aXZlUGF0aCAhPT0gXCJlbmNyeXB0XCIgPyBgd29ya2VyLyR7cmVsYXRpdmVQYXRofWAgOiByZWxhdGl2ZVBhdGhcbiAgICAgICAgfS5qc2AsXG4gICAgICApLFxuICAgICk7XG59O1xuIiwgbnVsbCwgbnVsbCwgbnVsbCwgImltcG9ydCB7XG4gIERlY29kZSBhcyBiNjRkZWNvZGUsXG4gIEVuY29kZSBhcyBiNjRlbmNvZGUsXG59IGZyb20gXCJhcnJheWJ1ZmZlci1lbmNvZGluZy9iYXNlNjRcIjtcbmltcG9ydCB7IGVyckFzeW5jLCBva0FzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgc2pjbCBmcm9tIFwibHVmaS1zamNsXCI7XG5pbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IENyeXB0b0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2NyeXB0by1lcnJvci50c1wiO1xuaW1wb3J0IHsgRGVjcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2RlY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCB7IGVuc3VyZUVycm9yIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB7IEhhc2hpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzXCI7XG5cbi8qKlxuICogRGVjcnlwdCBhbiBFbmNyeXB0ZWREYXRhIG9yIGEgc3RyaW5nIHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvbi5cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gZW5jcnlwdGVkRGF0YVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICBlbmNyeXB0ZWREYXRhOiBFbmNyeXB0ZWREYXRhIHwgc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8QXJyYXlCdWZmZXIsIERlY3J5cHRpb25FcnJvcj4gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGEgPSB0eXBlb2YgZW5jcnlwdGVkRGF0YSA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBlbmNyeXB0ZWREYXRhXG4gICAgICA6IG5ldyBUZXh0RGVjb2RlcigpLmRlY29kZShlbmNyeXB0ZWREYXRhLmRhdGEgYXMgQXJyYXlCdWZmZXIpO1xuXG4gICAgcmV0dXJuIG9rQXN5bmMoYjY0ZGVjb2RlKHNqY2wuZGVjcnlwdChrZXksIGRhdGEpKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IERlY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEVuY3J5cHQgYW4gQXJyYXlCdWZmZXIgaW50byBhbiBFbmNyeXB0ZWREYXRhIHVzaW5nIHRoZSBwcm92aWRlZCBrZXlcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuKTogUmVzdWx0QXN5bmM8RW5jcnlwdGVkRGF0YSwgRW5jcnlwdGlvbkVycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZW5jcnlwdGVkID0gc2pjbC5lbmNyeXB0KGtleSwgYjY0ZW5jb2RlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gb2tBc3luYyh7XG4gICAgICBhbGdvOiBDcnlwdG9BbGdvcml0aG0uU2pjbCxcbiAgICAgIGRhdGE6IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShlbmNyeXB0ZWQpLmJ1ZmZlcixcbiAgICAgIGl2OiBKU09OLnBhcnNlKGVuY3J5cHRlZCBhcyB1bmtub3duIGFzIHN0cmluZykuaXYsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IEVuY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZyB1c2luZyBTamNsIEFQSVxuICpcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleSA9ICgpOiBSZXN1bHRBc3luYzxzdHJpbmcsIENyeXB0b0Vycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG9rQXN5bmMoc2pjbC5jb2RlYy5iYXNlNjQuZnJvbUJpdHMoc2pjbC5yYW5kb20ucmFuZG9tV29yZHMoOCwgMTApKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGdlbmVyYXRlIGtleVwiLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgICApO1xuICB9XG59O1xuXG4vKipcbiAqIEhhc2ggYSBwYXNzd29yZCB1c2luZyBTamNsIEFQSVxuICpcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgSGFzaGluZ0Vycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIG9rQXN5bmMoc2pjbC5jb2RlYy5oZXguZnJvbUJpdHMoc2pjbC5oYXNoLnNoYTUxMi5oYXNoKHBhc3N3b3JkKSkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBlcnJBc3luYyhuZXcgSGFzaGluZ0Vycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXRlY3QgaWYgdGhlIGtleSBoYXMgYmVlbiBnZW5lcmF0ZWQgYnkgU2pjbC4gU2luY2Ugd2UncmUgbm90IGdlbmVyYXRpbmcgYW4gZXF1YWwgc3ltYm9sIGF0IHRoZSBlbmQgb2YgdGhlIHN0cmluZyB3aXRoIHRoZSBXZWJDcnlwdG8gQVBJIChieSB1c2luZyBiYXNlNjR1cmwpLCBpdCdzIGVhc3kgdG8gZGV0ZWN0XG4gKlxuICogQHBhcmFtIGtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzU2pjbEtleSA9IChrZXk6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4ga2V5W2tleS5sZW5ndGggLSAxXSA9PT0gXCI9XCI7XG59O1xuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIENyeXB0b0Vycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBEZWNyeXB0aW9uRXJyb3IgZXh0ZW5kcyBDcnlwdG9FcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2U6IHN0cmluZyA9IFwiVW5hYmxlIHRvIGRlY3J5cHQgdGhlIHByb3ZpZGVkIGRhdGFcIjtcbn1cbiIsICJpbXBvcnQge1xuICBEZWNvZGUgYXMgYjY0dXJsZGVjb2RlLFxuICBFbmNvZGUgYXMgYjY0dXJsZW5jb2RlLFxufSBmcm9tIFwiYXJyYXlidWZmZXItZW5jb2RpbmcvYmFzZTY0L3VybFwiO1xuaW1wb3J0IHsgdHlwZSBFbmNyeXB0ZWREYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL2VuY3J5cHRlZC1kYXRhLnRzXCI7XG5pbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IERlY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9kZWNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBva0FzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgeyBlbnN1cmVFcnJvciB9IGZyb20gXCJ+L3V0aWxzLnRzXCI7XG5pbXBvcnQgeyBFbmNyeXB0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vZW5jcnlwdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBIYXNoaW5nRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vaGFzaGluZy1lcnJvci50c1wiO1xuXG4vKipcbiAqIERlY3J5cHQgYW4gZW5jcnlwdGVkRGF0YSB1c2luZyB0aGUga2V5IHVzZWQgZm9yIGVuY3J5cHRpb25cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gZW5jcnlwdGVkXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZGVjcnlwdCA9IChcbiAga2V5OiBzdHJpbmcsXG4gIGVuY3J5cHRlZDogRW5jcnlwdGVkRGF0YSxcbik6IFJlc3VsdEFzeW5jPEFycmF5QnVmZmVyLCBEZWNyeXB0aW9uRXJyb3I+ID0+IHtcbiAgcmV0dXJuIGltcG9ydEtleShrZXkpLmFuZFRoZW4oKGltcG9ydGVkS2V5KSA9PlxuICAgIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgICAgY3J5cHRvLnN1YnRsZS5kZWNyeXB0KFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogXCJBRVMtR0NNXCIsXG4gICAgICAgICAgaXY6IGVuY3J5cHRlZC5pdiBhcyBVaW50OEFycmF5LFxuICAgICAgICB9LFxuICAgICAgICBpbXBvcnRlZEtleSxcbiAgICAgICAgZW5jcnlwdGVkLmRhdGEgYXMgQXJyYXlCdWZmZXIsXG4gICAgICApLFxuICAgICAgKGVycm9yKSA9PiBuZXcgRGVjcnlwdGlvbkVycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICAgIClcbiAgKTtcbn07XG5cbi8qKlxuICogRW5jcnlwdCBhbiBBcnJheUJ1ZmZlciBpbnRvIGFuIEVuY3J5cHRlZERhdGEgdXNpbmcgdGhlIHByb3ZpZGVkIGtleVxuICogQHBhcmFtIGtleVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5jcnlwdCA9IChcbiAga2V5OiBzdHJpbmcsXG4gIHZhbHVlOiBBcnJheUJ1ZmZlcixcbik6IFJlc3VsdEFzeW5jPEVuY3J5cHRlZERhdGEsIEVuY3J5cHRpb25FcnJvcj4gPT4ge1xuICByZXR1cm4gaW1wb3J0S2V5KGtleSkuYW5kVGhlbigoaW1wb3J0ZWRLZXkpID0+IHtcbiAgICBjb25zdCBpdiA9IGNyeXB0by5nZXRSYW5kb21WYWx1ZXMobmV3IFVpbnQ4QXJyYXkoMTIpKTtcbiAgICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICBjcnlwdG8uc3VidGxlLmVuY3J5cHQoXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIkFFUy1HQ01cIixcbiAgICAgICAgICBpdixcbiAgICAgICAgfSxcbiAgICAgICAgaW1wb3J0ZWRLZXksXG4gICAgICAgIHZhbHVlLFxuICAgICAgKSxcbiAgICAgIChlcnJvcikgPT5cbiAgICAgICAgbmV3IEVuY3J5cHRpb25FcnJvcih1bmRlZmluZWQsIHtcbiAgICAgICAgICBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgICB9KSxcbiAgICApLmFuZFRoZW4oKGVuY3J5cHRlZCkgPT4ge1xuICAgICAgcmV0dXJuIG9rQXN5bmMoe1xuICAgICAgICBhbGdvOiBDcnlwdG9BbGdvcml0aG0uV2ViQ3J5cHRvLFxuICAgICAgICBkYXRhOiBlbmNyeXB0ZWQsXG4gICAgICAgIGl2LFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSBzdHJpbmcgaW50byBhIENyeXB0b0tleSwgdXNhYmxlIGluIFdlYiBDcnlwdG8gQVBJXG4gKlxuICogQHBhcmFtIGtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGltcG9ydEtleSA9IChrZXk6IHN0cmluZyk6IFJlc3VsdEFzeW5jPENyeXB0b0tleSwgQ3J5cHRvRXJyb3I+ID0+IHtcbiAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgIGNyeXB0by5zdWJ0bGUuaW1wb3J0S2V5KFxuICAgICAgXCJyYXdcIixcbiAgICAgIGI2NHVybGRlY29kZShrZXkpLFxuICAgICAgeyBuYW1lOiBcIkFFUy1HQ01cIiB9LFxuICAgICAgZmFsc2UsXG4gICAgICBbXG4gICAgICAgIFwiZW5jcnlwdFwiLFxuICAgICAgICBcImRlY3J5cHRcIixcbiAgICAgIF0sXG4gICAgKSxcbiAgICAoZXJyb3IpID0+XG4gICAgICBuZXcgQ3J5cHRvRXJyb3IoXCJVbmFibGUgdG8gaW1wb3J0IGNyeXB0b2dyYXBoeSBrZXlcIiwge1xuICAgICAgICBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgfSksXG4gICk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgcmFuZG9tIHN0cmluZyB1c2luZyBXZWIgQ3J5cHRvIEFQSS5cbiAqXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVLZXkgPSAoKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBDcnlwdG9FcnJvcj4gPT4ge1xuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICAgIGNyeXB0by5zdWJ0bGVcbiAgICAgICAgLmdlbmVyYXRlS2V5KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IFwiQUVTLUdDTVwiLFxuICAgICAgICAgICAgbGVuZ3RoOiAyNTYsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIFtcImVuY3J5cHRcIiwgXCJkZWNyeXB0XCJdLFxuICAgICAgICApXG4gICAgICAgIC50aGVuKChnZW5lcmF0ZWRLZXkpID0+XG4gICAgICAgICAgY3J5cHRvLnN1YnRsZVxuICAgICAgICAgICAgLmV4cG9ydEtleShcInJhd1wiLCBnZW5lcmF0ZWRLZXkpXG4gICAgICAgICAgICAudGhlbigoa2V5KSA9PiByZXNvbHZlKGI2NHVybGVuY29kZShrZXkpKSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgICAgIG5ldyBDcnlwdG9FcnJvcihcIlVuYWJsZSB0byBiYXNlNjQgZW5jb2RlIHRoZSB1cmxcIiwge1xuICAgICAgICAgICAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0KGVycm9yKSlcbiAgICApLFxuICAgIChlcnJvcikgPT5cbiAgICAgIG5ldyBDcnlwdG9FcnJvcihcIlVuYWJsZSB0byBnZW5lcmF0ZSBrZXlcIiwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICApO1xufTtcblxuLyoqXG4gKiBIYXNoIGEgcGFzc3dvcmQgdXNpbmcgV2ViQ3J5cHRvIEFQSVxuICpcbiAqIEBwYXJhbSBwYXNzd29yZFxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgSGFzaGluZ0Vycm9yPiA9PiB7XG4gIGNvbnN0IHByb21pc2UgPSBhc3luYyAoKSA9PiB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oXG4gICAgICBuZXcgVWludDhBcnJheShcbiAgICAgICAgYXdhaXQgY3J5cHRvLnN1YnRsZS5kaWdlc3QoXG4gICAgICAgICAgXCJTSEEtNTEyXCIsXG4gICAgICAgICAgbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHBhc3N3b3JkKSxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKS5tYXAoKGIpID0+IGIudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDIsIFwiMFwiKSkuam9pbihcIlwiKTtcbiAgfTtcblxuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgcHJvbWlzZSgpLFxuICAgIChlcnJvcikgPT4gbmV3IEhhc2hpbmdFcnJvcih1bmRlZmluZWQsIHsgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSB9KSxcbiAgKTtcbn07XG4iLCAiaW1wb3J0IHsgQ3J5cHRvQWxnb3JpdGhtIH0gZnJvbSBcIn4vZW51bS9jcnlwdG8tYWxnb3JpdGhtLnRzXCI7XG5pbXBvcnQgeyBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgdHlwZSB7IENyeXB0b0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2NyeXB0by1lcnJvci50c1wiO1xuaW1wb3J0IHR5cGUgeyBEZWNyeXB0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vZGVjcnlwdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHR5cGUgeyBFbmNyeXB0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vZW5jcnlwdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgdHlwZSBFbmNyeXB0ZWREYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL2VuY3J5cHRlZC1kYXRhLnRzXCI7XG5pbXBvcnQgKiBhcyBzamNsIGZyb20gXCJ+L2FwaS9jcnlwdG8vc2pjbC50c1wiO1xuaW1wb3J0ICogYXMgd2ViIGZyb20gXCJ+L2FwaS9jcnlwdG8vd2ViLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEhhc2hpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzXCI7XG5cbi8qKlxuICogRGVjcnlwdCBhbiBFbmNyeXB0ZWREYXRhIG9iamVjdCB1c2luZyB0aGUga2V5IHVzZWQgZm9yIGVuY3J5cHRpb25cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkZWNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEVuY3J5cHRlZERhdGEsXG4pOiBSZXN1bHRBc3luYzxBcnJheUJ1ZmZlciwgRGVjcnlwdGlvbkVycm9yPiA9PlxuICB2YWx1ZS5hbGdvID09PSB1bmRlZmluZWQgfHwgdmFsdWUuYWxnbyA9PT0gQ3J5cHRvQWxnb3JpdGhtLlNqY2xcbiAgICA/IHNqY2wuZGVjcnlwdChrZXksIHZhbHVlKVxuICAgIDogd2ViLmRlY3J5cHQoa2V5LCB2YWx1ZSk7XG5cbi8qKlxuICogRW5jcnlwdCBhbiBBcnJheUJ1ZmZlciB1c2luZyB0aGUgcHJvdmlkZWQga2V5IGFuZCBhbGdvcml0aG1cbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBhbGdvXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5jcnlwdCA9IChcbiAga2V5OiBzdHJpbmcsXG4gIHZhbHVlOiBBcnJheUJ1ZmZlcixcbiAgYWxnbzogQ3J5cHRvQWxnb3JpdGhtLFxuKTogUmVzdWx0QXN5bmM8RW5jcnlwdGVkRGF0YSwgRW5jcnlwdGlvbkVycm9yPiA9PlxuICAoYWxnbyA9PT0gQ3J5cHRvQWxnb3JpdGhtLlNqY2wpXG4gICAgPyBzamNsLmVuY3J5cHQoa2V5LCB2YWx1ZSlcbiAgICA6IHdlYi5lbmNyeXB0KGtleSwgdmFsdWUpO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgbmV3IGtleSBmb3IgZW5jcnlwdGlvbi9kZWNyeXB0aW9uXG4gKlxuICogQHBhcmFtIGFsZ29cbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleSA9IChcbiAgYWxnbyA9IENyeXB0b0FsZ29yaXRobS5XZWJDcnlwdG8sXG4pOiBSZXN1bHRBc3luYzxzdHJpbmcsIENyeXB0b0Vycm9yPiA9PlxuICBhbGdvID09PSBDcnlwdG9BbGdvcml0aG0uU2pjbCA/IHNqY2wuZ2VuZXJhdGVLZXkoKSA6IHdlYi5nZW5lcmF0ZUtleSgpO1xuXG4vKipcbiAqIEhhc2ggYSBwYXNzd29yZCB1c2luZyB0aGUgcHJvdmlkZWQgYWxnb3JpdGhtXG4gKlxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcGFyYW0gYWxnb1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGhhc2hQYXNzd29yZCA9IChcbiAgcGFzc3dvcmQ6IHN0cmluZyxcbiAgYWxnbzogQ3J5cHRvQWxnb3JpdGhtLFxuKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBIYXNoaW5nRXJyb3I+ID0+XG4gIGFsZ28gPT09IENyeXB0b0FsZ29yaXRobS5TamNsXG4gICAgPyBzamNsLmhhc2hQYXNzd29yZChwYXNzd29yZClcbiAgICA6IHdlYi5oYXNoUGFzc3dvcmQocGFzc3dvcmQpO1xuIiwgImltcG9ydCB7IGVyckFzeW5jLCBva0FzeW5jLCBSZXN1bHRBc3luYyB9IGZyb20gXCJuZXZlcnRocm93XCI7XG5pbXBvcnQgeyBMdWZpRmlsZSB9IGZyb20gXCJ+L2VudGl0aWVzL2x1ZmktZmlsZS50c1wiO1xuaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgeyBVUExPQURfU1RBVFVTIH0gZnJvbSBcIn4vZW51bS9maWxlLXN0YXR1cy50c1wiO1xuaW1wb3J0IHsgU29ja2V0UGF0aCB9IGZyb20gXCJ+L2VudW0vc29ja2V0LXBhdGgudHNcIjtcbmltcG9ydCB7IFVwbG9hZEVycm9yIH0gZnJvbSBcIn4vZXJyb3IvdXBsb2FkL3VwbG9hZC1lcnJvci50c1wiO1xuaW1wb3J0IHsgV2ViU29ja2V0Q29ubmVjdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd2Vic29ja2V0L3dlYnNvY2tldC1jb25uZWN0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBXZWJTb2NrZXRFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3dlYnNvY2tldC93ZWJzb2NrZXQtZXJyb3IudHNcIjtcbmltcG9ydCB0eXBlIHsgQ2xpZW50VXBsb2FkQ2h1bmtNZXRhZGF0YSB9IGZyb20gXCJ+L2ludGVyZmFjZS9jbGllbnQtdXBsb2FkLWNodW5rLW1ldGFkYXRhLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyQ2FuY2VsTWV0YWRhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2Uvc2VydmVyLWNhbmNlbC1tZXRhZGF0YS50c1wiO1xuaW1wb3J0IHR5cGUgeyBTZXJ2ZXJEb3dubG9hZENodW5rU3VjY2Vzc01ldGFkYXRhIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3NlcnZlci1kb3dubG9hZC1jaHVuay1zdWNjZXNzLW1ldGFkYXRhLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlclVwbG9hZENodW5rTWV0YWRhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2Uvc2VydmVyLXVwbG9hZC1jaHVuay1tZXRhZGF0YS50c1wiO1xuaW1wb3J0IHR5cGUgeyBTZXJ2ZXJEb3dubG9hZENodW5rTWV0YWRhdGEgfSBmcm9tIFwifi90eXBlL3NlcnZlci1kb3dubG9hZC1jaHVuay1tZXRhZGF0YS50c1wiO1xuaW1wb3J0IHsgZW5zdXJlRXJyb3IgfSBmcm9tIFwifi91dGlscy50c1wiO1xuaW1wb3J0IHsgZXZlbnRzLCB1cGRhdGVGaWxlIH0gZnJvbSBcIn4vd29ya2VyL3NoYXJlZC50c1wiO1xuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gXCJ+L2FwaS9jcnlwdG8udHNcIjtcbmltcG9ydCB7XG4gIERlY29kZSBhcyBiNjRkZWNvZGUsXG4gIEVuY29kZSBhcyBiNjRlbmNvZGUsXG59IGZyb20gXCJhcnJheWJ1ZmZlci1lbmNvZGluZy9iYXNlNjRcIjtcblxuZXhwb3J0IGNvbnN0IHNvY2tldHM6IHtcbiAgW2tleTogc3RyaW5nXTogV2ViU29ja2V0O1xufSA9IHt9O1xuXG5jb25zdCBNQVhfRVJST1JTID0gNTtcblxuLyoqXG4gKiBIYW5kbGUgV2ViU29ja2V0IHJlc3BvbnNlIGZvciBjYW5jZWwgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSBkYXRhXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBvbkNhbmNlbE1lc3NhZ2UgPSAoXG4gIGRhdGE6IFNlcnZlckNhbmNlbE1ldGFkYXRhLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgRXJyb3I+ID0+IHtcbiAgZXZlbnRzLmVtaXQoRVZFTlQuVVBMT0FEX0NBTkNFTExFRCwgZGF0YS5zdWNjZXNzKTtcblxuICByZXR1cm4gb2tBc3luYyh1bmRlZmluZWQpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgV2ViU29ja2V0IHJlc3BvbnNlIGZvciBkb3dubG9hZCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHJlc3BvbnNlXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IG9uRG93bmxvYWRNZXNzYWdlID0gKFxuICByZXNwb25zZTogc3RyaW5nLFxuICBsdWZpRmlsZTogTHVmaUZpbGUsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICBjb25zdCByZXN1bHQgPSByZXNwb25zZS5zcGxpdChcIlhYTU9KT1hYXCIpO1xuICBjb25zdCBtZXRhZGF0YVN0cmluZyA9IHJlc3VsdC5zaGlmdCgpO1xuXG4gIGlmIChtZXRhZGF0YVN0cmluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgbWV0YWRhdGEgPSBKU09OLnBhcnNlKG1ldGFkYXRhU3RyaW5nKSBhcyBTZXJ2ZXJEb3dubG9hZENodW5rTWV0YWRhdGE7XG5cbiAgICBpZiAoaXNTZXJ2ZXJEb3dubG9hZENodW5rU3VjY2Vzc01ldGFkYXRhKG1ldGFkYXRhKSkge1xuICAgICAgY29uc3QgZGF0YVN0cmluZyA9IHJlc3VsdC5zaGlmdCgpO1xuXG4gICAgICBpZiAoZGF0YVN0cmluZykge1xuICAgICAgICBjb25zdCBlbmNyeXB0ZWREYXRhOiBFbmNyeXB0ZWREYXRhID0gSlNPTi5wYXJzZShkYXRhU3RyaW5nKTtcblxuICAgICAgICAvLyBJZiBmaWxlIHdhcyB1cGxvYWRlZCB1c2luZyBMdWZpIEFQSVxuICAgICAgICBpZiAoZW5jcnlwdGVkRGF0YS5pdikge1xuICAgICAgICAgIGVuY3J5cHRlZERhdGEuaXYgPSBuZXcgVWludDhBcnJheShPYmplY3QudmFsdWVzKGVuY3J5cHRlZERhdGEuaXYpKTtcbiAgICAgICAgICBlbmNyeXB0ZWREYXRhLmRhdGEgPSBiNjRkZWNvZGUoZW5jcnlwdGVkRGF0YS5kYXRhIGFzIHN0cmluZyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY3J5cHRvLmRlY3J5cHQobHVmaUZpbGUua2V5cy5jbGllbnQsIGVuY3J5cHRlZERhdGEpLmFuZFRoZW4oXG4gICAgICAgICAgKGRlY3J5cHRlZFBhcnQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJ1ZmZlciA9IHR5cGVvZiBkZWNyeXB0ZWRQYXJ0ID09PSBcInN0cmluZ1wiXG4gICAgICAgICAgICAgID8gKG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShkZWNyeXB0ZWRQYXJ0KS5idWZmZXIgYXMgQXJyYXlCdWZmZXIpXG4gICAgICAgICAgICAgIDogZGVjcnlwdGVkUGFydDtcblxuICAgICAgICAgICAgLy8gSWYgZmlyc3QgY2h1bmtcbiAgICAgICAgICAgIGlmIChtZXRhZGF0YS5wYXJ0ID09PSAwKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHtcbiAgICAgICAgICAgICAgICBjaHVua3NSZWFkeTogbHVmaUZpbGUuY2h1bmtzUmVhZHkgKyAxLFxuICAgICAgICAgICAgICAgIGRlbEF0Rmlyc3RWaWV3OiBtZXRhZGF0YS5kZWxfYXRfZmlyc3RfdmlldyxcbiAgICAgICAgICAgICAgICBkZWxheTogbWV0YWRhdGEuZGVsYXksXG4gICAgICAgICAgICAgICAgbmFtZTogbWV0YWRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBzaXplOiBtZXRhZGF0YS5zaXplLFxuICAgICAgICAgICAgICAgIHRvdGFsQ2h1bmtzOiBtZXRhZGF0YS50b3RhbCxcbiAgICAgICAgICAgICAgICB0eXBlOiBtZXRhZGF0YS50eXBlLFxuICAgICAgICAgICAgICAgIHppcHBlZDogbWV0YWRhdGEuemlwcGVkLFxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBldmVudHMuZW1pdChFVkVOVC5ET1dOTE9BRF9TVEFSVEVEKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHsgY2h1bmtzUmVhZHk6IGx1ZmlGaWxlLmNodW5rc1JlYWR5ICsgMSB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuQ0hVTktfRE9XTkxPQURFRCwgYnVmZmVyLCBtZXRhZGF0YS5wYXJ0KTtcblxuICAgICAgICAgICAgaWYgKGx1ZmlGaWxlLmNodW5rc1JlYWR5ID09PSBtZXRhZGF0YS50b3RhbCkge1xuICAgICAgICAgICAgICByZXR1cm4gZW5kRG93bmxvYWQobHVmaUZpbGUpLmFuZFRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULkRPV05MT0FEX0NPTVBMRVRFKTtcbiAgICAgICAgICAgICAgICBldmVudHMuZW1pdChFVkVOVC5TT0NLRVRfT1BFUkFUSU9OX1RFUk1JTkFURUQpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBva0FzeW5jKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IFdlYlNvY2tldEVycm9yKFxuICAgICAgICAgIFwiQ2Fubm90IHJldHJpZXZlIG1ldGFkYXRhIGZyb20gZGF0YSByZWNlaXZlZCBieSB0aGUgc2VydmVyXCIsXG4gICAgICAgICk7XG5cbiAgICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IpO1xuICAgICAgICByZXR1cm4gZXJyQXN5bmMoZXJyb3IpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBXZWJTb2NrZXRFcnJvcihtZXRhZGF0YS5tc2cpO1xuXG4gICAgICBldmVudHMuZW1pdChFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvcik7XG4gICAgICByZXR1cm4gZXJyQXN5bmMoZXJyb3IpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBXZWJTb2NrZXRFcnJvcihcbiAgICAgIFwiQ2Fubm90IHJldHJpZXZlIG1ldGFkYXRhIGZyb20gZGF0YSByZWNlaXZlZCBieSB0aGUgc2VydmVyXCIsXG4gICAgKTtcblxuICAgIGV2ZW50cy5lbWl0KEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yKTtcbiAgICByZXR1cm4gZXJyQXN5bmMoZXJyb3IpO1xuICB9XG59O1xuXG4vKipcbiAqIEhhbmRsZSBXZWJTb2NrZXQgcmVzcG9uc2UgZm9yIHVwbG9hZCByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHJlc3BvbnNlXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEByZXR1cm5zXG4gKi9cbmNvbnN0IG9uVXBsb2FkTWVzc2FnZSA9IChcbiAgcmVzcG9uc2U6IFNlcnZlclVwbG9hZENodW5rTWV0YWRhdGEsXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFVwbG9hZEVycm9yPiA9PiB7XG4gIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgLy8gSWYgZmlyc3QgY2h1bmtcbiAgICBpZiAocmVzcG9uc2UuaiA9PT0gMCkge1xuICAgICAgLy8gY29uc29sZS5pbmZvKGBVcGxvYWQgb2YgJHtsdWZpRmlsZS5rZXlzLmNsaWVudH0gc3RhcnRlZGApO1xuXG4gICAgICB1cGRhdGVGaWxlKGx1ZmlGaWxlLCB7XG4gICAgICAgIGtleXM6IHsgY2xpZW50OiBsdWZpRmlsZS5rZXlzLmNsaWVudCwgc2VydmVyOiByZXNwb25zZS5zaG9ydCB9LFxuICAgICAgICBhY3Rpb25Ub2tlbjogcmVzcG9uc2UudG9rZW4sXG4gICAgICAgIHF1ZXVlSW5kZXg6IHJlc3BvbnNlLmksXG4gICAgICB9KTtcblxuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuVVBMT0FEX1NUQVJURUQpO1xuICAgIH1cblxuICAgIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHtcbiAgICAgIGNodW5rc1JlYWR5OiBsdWZpRmlsZS5jaHVua3NSZWFkeSArIDEsXG4gICAgICBjcmVhdGVkQXQ6IHJlc3BvbnNlLmNyZWF0ZWRfYXQsXG4gICAgfSk7XG5cbiAgICBldmVudHMuZW1pdChFVkVOVC5DSFVOS19VUExPQURFRCk7XG5cbiAgICBpZiAobHVmaUZpbGUuY2h1bmtzUmVhZHkgPT09IGx1ZmlGaWxlLnRvdGFsQ2h1bmtzKSB7XG4gICAgICB1cGRhdGVGaWxlKGx1ZmlGaWxlLCB7IHVwbG9hZFN0YXR1czogVVBMT0FEX1NUQVRVUy5DT01QTEVURSB9KTtcblxuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuVVBMT0FEX0NPTVBMRVRFKTtcbiAgICAgIGV2ZW50cy5lbWl0KEVWRU5ULlNPQ0tFVF9PUEVSQVRJT05fVEVSTUlOQVRFRCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBXZWJTb2NrZXRFcnJvcihyZXNwb25zZS5tc2cpO1xuICAgIGV2ZW50cy5lbWl0KEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yKTtcblxuICAgIHJldHVybiBlcnJBc3luYyhlcnJvcik7XG4gIH1cbn07XG5cbi8qKlxuICogQ2FsbGVkIG9uIHNvY2tldHMgXCJvbm1lc3NhZ2VcIiBldmVudFxuICpcbiAqIEBwYXJhbSBlXG4gKiBAcGFyYW0gc29ja2V0VXJsXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBvbk1lc3NhZ2UgPSAoXG4gIGU6IE1lc3NhZ2VFdmVudCxcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgVXBsb2FkRXJyb3I+ID0+IHtcbiAgY29uc3QgZGF0YSA9IHRyeVBhcnNlSnNvbihlLmRhdGEpO1xuXG4gIGxldCBjYWxsYmFjaztcblxuICBpZiAoZGF0YSkge1xuICAgIGlmICghZGF0YS5hY3Rpb24gJiYgZGF0YS5tc2cpIHtcbiAgICAgIC8vIElmIGVycm9yXG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBXZWJTb2NrZXRFcnJvcihkYXRhLm1zZyk7XG4gICAgICBldmVudHMuZW1pdChFVkVOVC5PUEVSQVRJT05fRkFJTEVELCBlcnJvcik7XG5cbiAgICAgIHJldHVybiBlcnJBc3luYyhlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChcImRlbGF5XCIgaW4gZGF0YSkge1xuICAgICAgICBjYWxsYmFjayA9IG9uVXBsb2FkTWVzc2FnZShkYXRhLCBsdWZpRmlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjYWxsYmFjayA9IG9uQ2FuY2VsTWVzc2FnZShkYXRhKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY2FsbGJhY2sgPSBvbkRvd25sb2FkTWVzc2FnZShlLmRhdGEsIGx1ZmlGaWxlKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsYmFjaztcbn07XG5cbi8qKlxuICogSXMgc29ja2V0IGNvbm5lY3Rpbmc/XG4gKlxuICogQHBhcmFtIHNvY2tldEtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGlzQ29ubmVjdGluZyA9IChzb2NrZXRLZXk6IHN0cmluZyk6IGJvb2xlYW4gPT5cbiAgc29ja2V0cyAhPT0gdW5kZWZpbmVkICYmXG4gIHNvY2tldHNbc29ja2V0S2V5XSAhPT0gdW5kZWZpbmVkICYmXG4gIHNvY2tldHNbc29ja2V0S2V5XS5yZWFkeVN0YXRlID09PSBXZWJTb2NrZXQuQ09OTkVDVElORztcblxuLyoqXG4gKiBJcyBzb2NrZXQgc3Bhd25lZD9cbiAqXG4gKiBAcGFyYW0gc29ja2V0S2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaXNTcGF3bmVkID0gKHNvY2tldEtleTogc3RyaW5nKTogYm9vbGVhbiA9PlxuICBzb2NrZXRzICE9PSB1bmRlZmluZWQgJiZcbiAgc29ja2V0c1tzb2NrZXRLZXldICE9PSB1bmRlZmluZWQgJiZcbiAgc29ja2V0c1tzb2NrZXRLZXldLnJlYWR5U3RhdGUgPT09IFdlYlNvY2tldC5PUEVOO1xuXG4vKipcbiAqIEFzayBXZWJTb2NrZXQgdG8gY2FuY2VsIGFuIHVwbG9hZFxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGNhbmNlbFVwbG9hZCA9IChcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgcmV0dXJuIHNlbmRNZXNzYWdlKFxuICAgIHVwbG9hZFNvY2tldFVybChsdWZpRmlsZSksXG4gICAgbHVmaUZpbGUsXG4gICAgYCR7XG4gICAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIGlkOiBsdWZpRmlsZS5rZXlzLnNlcnZlcixcbiAgICAgICAgbW9kX3Rva2VuOiBsdWZpRmlsZS5hY3Rpb25Ub2tlbixcbiAgICAgICAgY2FuY2VsOiB0cnVlLFxuICAgICAgICBpOiBsdWZpRmlsZS5xdWV1ZUluZGV4LFxuICAgICAgfSlcbiAgICB9WFhNT0pPWFh1c2VsZXNzYCxcbiAgKTtcbn07XG5cbi8qKlxuICogRG93bmxvYWQgYSBwYXJ0IG9mIHRoZSBmaWxlIHRocm91Z2ggdGhlIFdlYlNvY2tldFxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHBhcmFtIGNodW5rTnVtYmVyXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZG93bmxvYWRDaHVuayA9IChcbiAgbHVmaUZpbGU6IEx1ZmlGaWxlLFxuICBjaHVua051bWJlcjogbnVtYmVyLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgbGV0IG1lc3NhZ2U7XG5cbiAgaWYgKGx1ZmlGaWxlLnBhc3N3b3JkKSB7XG4gICAgbWVzc2FnZSA9IHsgcGFydDogY2h1bmtOdW1iZXIsIGZpbGVfcHdkOiBsdWZpRmlsZS5wYXNzd29yZCB9O1xuICB9IGVsc2Uge1xuICAgIG1lc3NhZ2UgPSB7IHBhcnQ6IGNodW5rTnVtYmVyIH07XG4gIH1cblxuICByZXR1cm4gc2VuZE1lc3NhZ2UoXG4gICAgZG93bmxvYWRTb2NrZXRVcmwobHVmaUZpbGUpLFxuICAgIGx1ZmlGaWxlLFxuICAgIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpLFxuICApO1xufTtcblxuLyoqXG4gKiBUZWxsIHRoZSBXZWJTb2NrZXQgdGhlIGRvd25sb2FkIGVuZGVkXG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5kRG93bmxvYWQgPSAoXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFdlYlNvY2tldEVycm9yPiA9PiB7XG4gIGxldCBtZXNzYWdlOiB7IGVuZGVkOiB0cnVlOyBmaWxlX3B3ZD86IHN0cmluZyB9O1xuXG4gIGlmIChsdWZpRmlsZS5wYXNzd29yZCkge1xuICAgIG1lc3NhZ2UgPSB7IGVuZGVkOiB0cnVlLCBmaWxlX3B3ZDogbHVmaUZpbGUucGFzc3dvcmQgfTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlID0geyBlbmRlZDogdHJ1ZSB9O1xuICB9XG5cbiAgcmV0dXJuIHNlbmRNZXNzYWdlKFxuICAgIGRvd25sb2FkU29ja2V0VXJsKGx1ZmlGaWxlKSxcbiAgICBsdWZpRmlsZSxcbiAgICBKU09OLnN0cmluZ2lmeShtZXNzYWdlKSxcbiAgKTtcbn07XG5cbi8qKlxuICogVXBsb2FkIGEgY2h1bmsgb2YgdGhlIGZpbGUgdGhyb3VnaCB0aGUgV2ViU29ja2V0XG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcGFyYW0gbWV0YWRhdGFcbiAqIEBwYXJhbSBlbmNyeXB0ZWREYXRhXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgdXBsb2FkQ2h1bmsgPSAoXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbiAgbWV0YWRhdGE6IENsaWVudFVwbG9hZENodW5rTWV0YWRhdGEsXG4gIGVuY3J5cHRlZERhdGE6IEVuY3J5cHRlZERhdGEsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICBlbmNyeXB0ZWREYXRhLmRhdGEgPSBiNjRlbmNvZGUoZW5jcnlwdGVkRGF0YS5kYXRhIGFzIEFycmF5QnVmZmVyKTtcblxuICByZXR1cm4gc2VuZE1lc3NhZ2UoXG4gICAgdXBsb2FkU29ja2V0VXJsKGx1ZmlGaWxlKSxcbiAgICBsdWZpRmlsZSxcbiAgICBgJHtKU09OLnN0cmluZ2lmeShtZXRhZGF0YSl9WFhNT0pPWFgke0pTT04uc3RyaW5naWZ5KGVuY3J5cHRlZERhdGEpfWAsXG4gICk7XG59O1xuXG4vKipcbiAqIFNlbmQgYSBtZXNzYWdlIHRvIHRoZSBXZWJTb2NrZXRcbiAqXG4gKiBAcGFyYW0gc29ja2V0VXJsXG4gKiBAcGFyYW0gbWVzc2FnZVxuICogQHBhcmFtIGhhc1ByaW9yaXR5XG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCBzZW5kTWVzc2FnZSA9IChcbiAgc29ja2V0VXJsOiBzdHJpbmcsXG4gIGx1ZmlGaWxlOiBMdWZpRmlsZSxcbiAgbWVzc2FnZTogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8dm9pZCwgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgaWYgKCFpc1NwYXduZWQoc29ja2V0VXJsKSkge1xuICAgIHJldHVybiBzcGF3bihzb2NrZXRVcmwpLmFuZFRoZW4oKCkgPT4ge1xuICAgICAgc29ja2V0c1tzb2NrZXRVcmxdLm9ubWVzc2FnZSA9IChlKSA9PiBvbk1lc3NhZ2UoZSwgbHVmaUZpbGUpO1xuICAgICAgcmV0dXJuIHNlbmRNZXNzYWdlKHNvY2tldFVybCwgbHVmaUZpbGUsIG1lc3NhZ2UpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHNvY2tldHNbc29ja2V0VXJsXS5zZW5kKG1lc3NhZ2UpO1xuXG4gICAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTcGF3biBhIG5ldyBXZWJTb2NrZXQgb3IgcmV1c2UgYW4gZXhpc3Rpbmcgb25lLlxuICpcbiAqIEBwYXJhbSBzb2NrZXRLZXlcbiAqIEBwYXJhbSBlcnJvckNvdW50XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3Qgc3Bhd24gPSAoXG4gIHNvY2tldEtleTogc3RyaW5nLFxuICBlcnJvckNvdW50ID0gMCxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgV2ViU29ja2V0RXJyb3I+ID0+IHtcbiAgaWYgKCFpc1NwYXduZWQoc29ja2V0S2V5KSAmJiAhaXNDb25uZWN0aW5nKHNvY2tldEtleSkpIHtcbiAgICAvLyBjb25zb2xlLmluZm8oYFNwYXduaW5nIFdlYlNvY2tldCAke3NvY2tldFVybH1gKTtcbiAgICBzb2NrZXRzW3NvY2tldEtleV0gPSBuZXcgV2ViU29ja2V0KHNvY2tldEtleSk7XG5cbiAgICBldmVudHMub25jZShFVkVOVC5TT0NLRVRfT1BFUkFUSU9OX1RFUk1JTkFURUQsICgpID0+IHtcbiAgICAgIHNvY2tldHNbc29ja2V0S2V5XS5jbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgZXZlbnRzLm9uY2UoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgKCkgPT4ge1xuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuU09DS0VUX09QRVJBVElPTl9URVJNSU5BVEVEKTtcbiAgICB9KTtcblxuICAgIHNvY2tldHNbc29ja2V0S2V5XS5vbm9wZW4gPSAoKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmluZm8oYFdlYnNvY2tldCAke3NvY2tldEtleX0gaGFzIGJlZW4gb3BlbmApO1xuICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuU09DS0VUX09QRU5FRCk7XG4gICAgfTtcblxuICAgIHNvY2tldHNbc29ja2V0S2V5XS5vbmNsb3NlID0gKCkgPT4ge1xuICAgICAgLy8gY29uc29sZS5pbmZvKGBXZWJzb2NrZXQgJHtzb2NrZXRLZXl9IGhhcyBiZWVuIGNsb3NlZGApO1xuICAgIH07XG5cbiAgICBzb2NrZXRzW3NvY2tldEtleV0ub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcbiAgICAgIGlmICgrK2Vycm9yQ291bnQgPD0gTUFYX0VSUk9SUykge1xuICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgIGBBbiBlcnJvciBoYXBwZW5lZCB3aGlsZSB0cnlpbmcgdG8gY29ubmVjdCB0byBXZWJTb2NrZXQgXCIke3NvY2tldEtleX1cIi4gVHJ5aW5nIGFnYWluLiAke2Vycm9yQ291bnR9IC8gJHtNQVhfRVJST1JTfWAsXG4gICAgICAgICAgKGV2ZW50IGFzIEVycm9yRXZlbnQpLmVycm9yLFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBzcGF3bihzb2NrZXRLZXksIGVycm9yQ291bnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnRzLmVtaXQoRVZFTlQuU09DS0VUX09ORVJST1IpO1xuICAgICAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICAgICAgbmV3IFdlYlNvY2tldENvbm5lY3Rpb25FcnJvcihcbiAgICAgICAgICAgIGBVbmFibGUgdG8gY29ubmVjdCB0byBXZWJTb2NrZXQgJHtzb2NrZXRLZXl9LmAsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHdhaXRGb3JDb25uZWN0aW9uKHNvY2tldEtleSlcbiAgICAuYW5kVGhlbigoKSA9PiBva0FzeW5jKHNvY2tldEtleSkpXG4gICAgLm9yRWxzZSgoZXJyb3IpID0+IGVyckFzeW5jKGVycm9yKSk7XG59O1xuXG4vKipcbiAqIFdhaXQgZm9yIFdlYlNvY2tldCB0byBvcGVuLiBSZXR1cm5zIGFuIGVycm9yIGlmIHRvbyBtYW55IGNvbm5lY3Rpb24gYXR0ZW1wdHMgYXJlIG1hZGUuXG4gKlxuICogQHBhcmFtIHNvY2tldEtleVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IHdhaXRGb3JDb25uZWN0aW9uID0gKFxuICBzb2NrZXRLZXk6IHN0cmluZyxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIFdlYlNvY2tldEVycm9yPiA9PlxuICBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIWlzU3Bhd25lZChzb2NrZXRLZXkpKSB7XG4gICAgICAgIGV2ZW50cy5vbmNlKEVWRU5ULlNPQ0tFVF9PUEVORUQsICgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50cy5vbihFVkVOVC5TT0NLRVRfT05FUlJPUiwgKCkgPT4ge1xuICAgICAgICAgIHJlamVjdChuZXcgV2ViU29ja2V0Q29ubmVjdGlvbkVycm9yKCkpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc29sdmUodW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICB9KSxcbiAgICAoZXJyb3IpID0+IHtcbiAgICAgIHJldHVybiBlbnN1cmVFcnJvcihlcnJvcik7XG4gICAgfSxcbiAgKTtcblxuLyoqXG4gKiBDbG9zZSB0aGUgV2ViU29ja2V0XG4gKiBAcGFyYW0gc29ja2V0S2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgY2xvc2UgPSAoc29ja2V0S2V5OiBzdHJpbmcpOiBSZXN1bHRBc3luYzxzdHJpbmcsIFdlYlNvY2tldEVycm9yPiA9PlxuICBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoaXNTcGF3bmVkKHNvY2tldEtleSkpIHtcbiAgICAgICAgY29uc3QgdGltZW91dElEID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgcmVqZWN0KG5ldyBXZWJTb2NrZXRFcnJvcihcIlVuYWJsZSB0byBjbG9zZSB0aGUgV2ViU29ja2V0XCIpKTtcbiAgICAgICAgfSwgMTAwMCk7XG5cbiAgICAgICAgc29ja2V0c1tzb2NrZXRLZXldLm9uY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRJRCk7XG4gICAgICAgICAgcmVzb2x2ZShzb2NrZXRLZXkpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHNvY2tldHNbc29ja2V0S2V5XS5jbG9zZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzb2x2ZShzb2NrZXRLZXkpO1xuICAgICAgfVxuICAgIH0pLFxuICAgIChlcnJvcikgPT4gZW5zdXJlRXJyb3IoZXJyb3IpLFxuICApO1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYW4gaW5zdGFuY2UgVVJMIGluIGEgV2ViU29ja2V0IFVSTFxuICpcbiAqIEBwYXJhbSBpbnN0YW5jZVVybFxuICogQHBhcmFtIHBhdGhuYW1lXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgYnVpbGRTb2NrZXRVcmwgPSAoaW5zdGFuY2VVcmw6IFVSTCwgcGF0aG5hbWU6IHN0cmluZyk6IFVSTCA9PiB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwoaW5zdGFuY2VVcmwpO1xuXG4gIGlmICghW1wid3M6XCIsIFwid3NzOlwiXS5pbmNsdWRlcyh1cmwucHJvdG9jb2wpKSB7XG4gICAgdXJsLnByb3RvY29sID0gdXJsLnByb3RvY29sID09PSBcImh0dHA6XCIgPyBcIndzOlwiIDogXCJ3c3M6XCI7XG4gIH1cbiAgdXJsLnBhdGhuYW1lICs9IHBhdGhuYW1lO1xuXG4gIHJldHVybiBuZXcgVVJMKHVybC5vcmlnaW4gKyB1cmwucGF0aG5hbWUpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0aGUgZG93bmxvYWQgVVJMIGZvciB0aGUgc29ja2V0LiBSZXR1cm5zIGEgc3RyaW5nIHNpbmNlIGl0J3MgbW9zdGx5IHVzZWQgYXMgc29ja2V0cyBrZXlcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkb3dubG9hZFNvY2tldFVybCA9IChsdWZpRmlsZTogTHVmaUZpbGUpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYnVpbGRTb2NrZXRVcmwoXG4gICAgbmV3IFVSTChsdWZpRmlsZS5zZXJ2ZXJVcmwpLFxuICAgIFNvY2tldFBhdGguRE9XTkxPQUQgKyBgLyR7bHVmaUZpbGUua2V5cy5zZXJ2ZXJ9YCxcbiAgKS50b1N0cmluZygpO1xufTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0aGUgdXBsb2FkIFVSTCBmb3IgdGhlIHNvY2tldC4gUmV0dXJucyBhIHN0cmluZyBzaW5jZSBpdCdzIG1vc3RseSB1c2VkIGFzIHNvY2tldHMga2V5XG4gKlxuICogQHBhcmFtIGx1ZmlGaWxlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgdXBsb2FkU29ja2V0VXJsID0gKGx1ZmlGaWxlOiBMdWZpRmlsZSk6IHN0cmluZyA9PiB7XG4gIHJldHVybiBidWlsZFNvY2tldFVybChuZXcgVVJMKGx1ZmlGaWxlLnNlcnZlclVybCksIFNvY2tldFBhdGguVVBMT0FEKVxuICAgIC50b1N0cmluZygpO1xufTtcblxuLyoqXG4gKiBUcnkgdG8gcGFyc2UgYSBzdHJpbmcgaW50byBhIEpTT04uIFJldHVybnMgZmFsc2UgaWYgbm90IHBvc3NpYmxlLlxuICpcbiAqIEBwYXJhbSBkYXRhXG4gKiBAcmV0dXJuc1xuICovXG5jb25zdCB0cnlQYXJzZUpzb24gPSAoZGF0YTogc3RyaW5nKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgcGFyc2VkT2JqZWN0ID0gSlNPTi5wYXJzZShkYXRhKTtcblxuICAgIGlmIChwYXJzZWRPYmplY3QgJiYgdHlwZW9mIHBhcnNlZE9iamVjdCA9PT0gXCJvYmplY3RcIikge1xuICAgICAgcmV0dXJuIHBhcnNlZE9iamVjdDtcbiAgICB9XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICB9IGNhdGNoIChfZSkge1xuICAgIC8qIGVtcHR5ICovXG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgdHlwZSBvZiB0aGUgbWVzc2FnZSByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXIgaXMgU2VydmVyRG93bmxvYWRDaHVua01ldGFkYXRhXG4gKlxuICogQHBhcmFtIG1lc3NhZ2VcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBpc1NlcnZlckRvd25sb2FkQ2h1bmtTdWNjZXNzTWV0YWRhdGEgPSAoXG4gIG1lc3NhZ2U6IFNlcnZlckRvd25sb2FkQ2h1bmtNZXRhZGF0YSxcbik6IG1lc3NhZ2UgaXMgU2VydmVyRG93bmxvYWRDaHVua1N1Y2Nlc3NNZXRhZGF0YSA9PlxuICB0eXBlb2YgbWVzc2FnZSA9PT0gXCJvYmplY3RcIiAmJiBtZXNzYWdlICE9PSBudWxsICYmICEoXCJtc2dcIiBpbiBtZXNzYWdlKTtcbiIsICJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4vaW5kZXguanMnXG5cbmV4cG9ydCB7IEV2ZW50RW1pdHRlciB9XG5leHBvcnQgZGVmYXVsdCBFdmVudEVtaXR0ZXJcbiIsICJleHBvcnQgY2xhc3MgVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuXHRjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG5cdFx0c3VwZXIobWVzc2FnZSk7XG5cdFx0dGhpcy5uYW1lID0gJ1RpbWVvdXRFcnJvcic7XG5cdH1cbn1cblxuLyoqXG5BbiBlcnJvciB0byBiZSB0aHJvd24gd2hlbiB0aGUgcmVxdWVzdCBpcyBhYm9ydGVkIGJ5IEFib3J0Q29udHJvbGxlci5cbkRPTUV4Y2VwdGlvbiBpcyB0aHJvd24gaW5zdGVhZCBvZiB0aGlzIEVycm9yIHdoZW4gRE9NRXhjZXB0aW9uIGlzIGF2YWlsYWJsZS5cbiovXG5leHBvcnQgY2xhc3MgQWJvcnRFcnJvciBleHRlbmRzIEVycm9yIHtcblx0Y29uc3RydWN0b3IobWVzc2FnZSkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5uYW1lID0gJ0Fib3J0RXJyb3InO1xuXHRcdHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG5cdH1cbn1cblxuLyoqXG5UT0RPOiBSZW1vdmUgQWJvcnRFcnJvciBhbmQganVzdCB0aHJvdyBET01FeGNlcHRpb24gd2hlbiB0YXJnZXRpbmcgTm9kZSAxOC5cbiovXG5jb25zdCBnZXRET01FeGNlcHRpb24gPSBlcnJvck1lc3NhZ2UgPT4gZ2xvYmFsVGhpcy5ET01FeGNlcHRpb24gPT09IHVuZGVmaW5lZFxuXHQ/IG5ldyBBYm9ydEVycm9yKGVycm9yTWVzc2FnZSlcblx0OiBuZXcgRE9NRXhjZXB0aW9uKGVycm9yTWVzc2FnZSk7XG5cbi8qKlxuVE9ETzogUmVtb3ZlIGJlbG93IGZ1bmN0aW9uIGFuZCBqdXN0ICdyZWplY3Qoc2lnbmFsLnJlYXNvbiknIHdoZW4gdGFyZ2V0aW5nIE5vZGUgMTguXG4qL1xuY29uc3QgZ2V0QWJvcnRlZFJlYXNvbiA9IHNpZ25hbCA9PiB7XG5cdGNvbnN0IHJlYXNvbiA9IHNpZ25hbC5yZWFzb24gPT09IHVuZGVmaW5lZFxuXHRcdD8gZ2V0RE9NRXhjZXB0aW9uKCdUaGlzIG9wZXJhdGlvbiB3YXMgYWJvcnRlZC4nKVxuXHRcdDogc2lnbmFsLnJlYXNvbjtcblxuXHRyZXR1cm4gcmVhc29uIGluc3RhbmNlb2YgRXJyb3IgPyByZWFzb24gOiBnZXRET01FeGNlcHRpb24ocmVhc29uKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBUaW1lb3V0KHByb21pc2UsIG9wdGlvbnMpIHtcblx0Y29uc3Qge1xuXHRcdG1pbGxpc2Vjb25kcyxcblx0XHRmYWxsYmFjayxcblx0XHRtZXNzYWdlLFxuXHRcdGN1c3RvbVRpbWVycyA9IHtzZXRUaW1lb3V0LCBjbGVhclRpbWVvdXR9LFxuXHR9ID0gb3B0aW9ucztcblxuXHRsZXQgdGltZXI7XG5cblx0Y29uc3Qgd3JhcHBlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0aWYgKHR5cGVvZiBtaWxsaXNlY29uZHMgIT09ICdudW1iZXInIHx8IE1hdGguc2lnbihtaWxsaXNlY29uZHMpICE9PSAxKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBtaWxsaXNlY29uZHNcXGAgdG8gYmUgYSBwb3NpdGl2ZSBudW1iZXIsIGdvdCBcXGAke21pbGxpc2Vjb25kc31cXGBgKTtcblx0XHR9XG5cblx0XHRpZiAob3B0aW9ucy5zaWduYWwpIHtcblx0XHRcdGNvbnN0IHtzaWduYWx9ID0gb3B0aW9ucztcblx0XHRcdGlmIChzaWduYWwuYWJvcnRlZCkge1xuXHRcdFx0XHRyZWplY3QoZ2V0QWJvcnRlZFJlYXNvbihzaWduYWwpKTtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3QgYWJvcnRIYW5kbGVyID0gKCkgPT4ge1xuXHRcdFx0XHRyZWplY3QoZ2V0QWJvcnRlZFJlYXNvbihzaWduYWwpKTtcblx0XHRcdH07XG5cblx0XHRcdHNpZ25hbC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGFib3J0SGFuZGxlciwge29uY2U6IHRydWV9KTtcblxuXHRcdFx0cHJvbWlzZS5maW5hbGx5KCgpID0+IHtcblx0XHRcdFx0c2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRIYW5kbGVyKTtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGlmIChtaWxsaXNlY29uZHMgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSkge1xuXHRcdFx0cHJvbWlzZS50aGVuKHJlc29sdmUsIHJlamVjdCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gV2UgY3JlYXRlIHRoZSBlcnJvciBvdXRzaWRlIG9mIGBzZXRUaW1lb3V0YCB0byBwcmVzZXJ2ZSB0aGUgc3RhY2sgdHJhY2UuXG5cdFx0Y29uc3QgdGltZW91dEVycm9yID0gbmV3IFRpbWVvdXRFcnJvcigpO1xuXG5cdFx0dGltZXIgPSBjdXN0b21UaW1lcnMuc2V0VGltZW91dC5jYWxsKHVuZGVmaW5lZCwgKCkgPT4ge1xuXHRcdFx0aWYgKGZhbGxiYWNrKSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0cmVzb2x2ZShmYWxsYmFjaygpKTtcblx0XHRcdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIHByb21pc2UuY2FuY2VsID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdHByb21pc2UuY2FuY2VsKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChtZXNzYWdlID09PSBmYWxzZSkge1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9IGVsc2UgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0XHRyZWplY3QobWVzc2FnZSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR0aW1lb3V0RXJyb3IubWVzc2FnZSA9IG1lc3NhZ2UgPz8gYFByb21pc2UgdGltZWQgb3V0IGFmdGVyICR7bWlsbGlzZWNvbmRzfSBtaWxsaXNlY29uZHNgO1xuXHRcdFx0XHRyZWplY3QodGltZW91dEVycm9yKTtcblx0XHRcdH1cblx0XHR9LCBtaWxsaXNlY29uZHMpO1xuXG5cdFx0KGFzeW5jICgpID0+IHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHJlc29sdmUoYXdhaXQgcHJvbWlzZSk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH0pKCk7XG5cdH0pO1xuXG5cdGNvbnN0IGNhbmNlbGFibGVQcm9taXNlID0gd3JhcHBlZFByb21pc2UuZmluYWxseSgoKSA9PiB7XG5cdFx0Y2FuY2VsYWJsZVByb21pc2UuY2xlYXIoKTtcblx0fSk7XG5cblx0Y2FuY2VsYWJsZVByb21pc2UuY2xlYXIgPSAoKSA9PiB7XG5cdFx0Y3VzdG9tVGltZXJzLmNsZWFyVGltZW91dC5jYWxsKHVuZGVmaW5lZCwgdGltZXIpO1xuXHRcdHRpbWVyID0gdW5kZWZpbmVkO1xuXHR9O1xuXG5cdHJldHVybiBjYW5jZWxhYmxlUHJvbWlzZTtcbn1cbiIsICIvLyBQb3J0IG9mIGxvd2VyX2JvdW5kIGZyb20gaHR0cHM6Ly9lbi5jcHByZWZlcmVuY2UuY29tL3cvY3BwL2FsZ29yaXRobS9sb3dlcl9ib3VuZFxuLy8gVXNlZCB0byBjb21wdXRlIGluc2VydGlvbiBpbmRleCB0byBrZWVwIHF1ZXVlIHNvcnRlZCBhZnRlciBpbnNlcnRpb25cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvd2VyQm91bmQoYXJyYXksIHZhbHVlLCBjb21wYXJhdG9yKSB7XG4gICAgbGV0IGZpcnN0ID0gMDtcbiAgICBsZXQgY291bnQgPSBhcnJheS5sZW5ndGg7XG4gICAgd2hpbGUgKGNvdW50ID4gMCkge1xuICAgICAgICBjb25zdCBzdGVwID0gTWF0aC50cnVuYyhjb3VudCAvIDIpO1xuICAgICAgICBsZXQgaXQgPSBmaXJzdCArIHN0ZXA7XG4gICAgICAgIGlmIChjb21wYXJhdG9yKGFycmF5W2l0XSwgdmFsdWUpIDw9IDApIHtcbiAgICAgICAgICAgIGZpcnN0ID0gKytpdDtcbiAgICAgICAgICAgIGNvdW50IC09IHN0ZXAgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY291bnQgPSBzdGVwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaXJzdDtcbn1cbiIsICJpbXBvcnQgbG93ZXJCb3VuZCBmcm9tICcuL2xvd2VyLWJvdW5kLmpzJztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByaW9yaXR5UXVldWUge1xuICAgICNxdWV1ZSA9IFtdO1xuICAgIGVucXVldWUocnVuLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBwcmlvcml0eTogMCxcbiAgICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB7XG4gICAgICAgICAgICBwcmlvcml0eTogb3B0aW9ucy5wcmlvcml0eSxcbiAgICAgICAgICAgIHJ1bixcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZSAmJiB0aGlzLiNxdWV1ZVt0aGlzLnNpemUgLSAxXS5wcmlvcml0eSA+PSBvcHRpb25zLnByaW9yaXR5KSB7XG4gICAgICAgICAgICB0aGlzLiNxdWV1ZS5wdXNoKGVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGluZGV4ID0gbG93ZXJCb3VuZCh0aGlzLiNxdWV1ZSwgZWxlbWVudCwgKGEsIGIpID0+IGIucHJpb3JpdHkgLSBhLnByaW9yaXR5KTtcbiAgICAgICAgdGhpcy4jcXVldWUuc3BsaWNlKGluZGV4LCAwLCBlbGVtZW50KTtcbiAgICB9XG4gICAgZGVxdWV1ZSgpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IHRoaXMuI3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgIHJldHVybiBpdGVtPy5ydW47XG4gICAgfVxuICAgIGZpbHRlcihvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNxdWV1ZS5maWx0ZXIoKGVsZW1lbnQpID0+IGVsZW1lbnQucHJpb3JpdHkgPT09IG9wdGlvbnMucHJpb3JpdHkpLm1hcCgoZWxlbWVudCkgPT4gZWxlbWVudC5ydW4pO1xuICAgIH1cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI3F1ZXVlLmxlbmd0aDtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRlbWl0dGVyMyc7XG5pbXBvcnQgcFRpbWVvdXQsIHsgVGltZW91dEVycm9yIH0gZnJvbSAncC10aW1lb3V0JztcbmltcG9ydCBQcmlvcml0eVF1ZXVlIGZyb20gJy4vcHJpb3JpdHktcXVldWUuanMnO1xuLyoqXG5Qcm9taXNlIHF1ZXVlIHdpdGggY29uY3VycmVuY3kgY29udHJvbC5cbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQUXVldWUgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgICNjYXJyeW92ZXJDb25jdXJyZW5jeUNvdW50O1xuICAgICNpc0ludGVydmFsSWdub3JlZDtcbiAgICAjaW50ZXJ2YWxDb3VudCA9IDA7XG4gICAgI2ludGVydmFsQ2FwO1xuICAgICNpbnRlcnZhbDtcbiAgICAjaW50ZXJ2YWxFbmQgPSAwO1xuICAgICNpbnRlcnZhbElkO1xuICAgICN0aW1lb3V0SWQ7XG4gICAgI3F1ZXVlO1xuICAgICNxdWV1ZUNsYXNzO1xuICAgICNwZW5kaW5nID0gMDtcbiAgICAvLyBUaGUgYCFgIGlzIG5lZWRlZCBiZWNhdXNlIG9mIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMzIxOTRcbiAgICAjY29uY3VycmVuY3k7XG4gICAgI2lzUGF1c2VkO1xuICAgICN0aHJvd09uVGltZW91dDtcbiAgICAvKipcbiAgICBQZXItb3BlcmF0aW9uIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzLiBPcGVyYXRpb25zIGZ1bGZpbGwgb25jZSBgdGltZW91dGAgZWxhcHNlcyBpZiB0aGV5IGhhdmVuJ3QgYWxyZWFkeS5cblxuICAgIEFwcGxpZXMgdG8gZWFjaCBmdXR1cmUgb3BlcmF0aW9uLlxuICAgICovXG4gICAgdGltZW91dDtcbiAgICAvLyBUT0RPOiBUaGUgYHRocm93T25UaW1lb3V0YCBvcHRpb24gc2hvdWxkIGFmZmVjdCB0aGUgcmV0dXJuIHR5cGVzIG9mIGBhZGQoKWAgYW5kIGBhZGRBbGwoKWBcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvY29uc2lzdGVudC10eXBlLWFzc2VydGlvbnNcbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNhcnJ5b3ZlckNvbmN1cnJlbmN5Q291bnQ6IGZhbHNlLFxuICAgICAgICAgICAgaW50ZXJ2YWxDYXA6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgICAgIGludGVydmFsOiAwLFxuICAgICAgICAgICAgY29uY3VycmVuY3k6IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgICAgICAgIGF1dG9TdGFydDogdHJ1ZSxcbiAgICAgICAgICAgIHF1ZXVlQ2xhc3M6IFByaW9yaXR5UXVldWUsXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoISh0eXBlb2Ygb3B0aW9ucy5pbnRlcnZhbENhcCA9PT0gJ251bWJlcicgJiYgb3B0aW9ucy5pbnRlcnZhbENhcCA+PSAxKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXFxgaW50ZXJ2YWxDYXBcXGAgdG8gYmUgYSBudW1iZXIgZnJvbSAxIGFuZCB1cCwgZ290IFxcYCR7b3B0aW9ucy5pbnRlcnZhbENhcD8udG9TdHJpbmcoKSA/PyAnJ31cXGAgKCR7dHlwZW9mIG9wdGlvbnMuaW50ZXJ2YWxDYXB9KWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLmludGVydmFsID09PSB1bmRlZmluZWQgfHwgIShOdW1iZXIuaXNGaW5pdGUob3B0aW9ucy5pbnRlcnZhbCkgJiYgb3B0aW9ucy5pbnRlcnZhbCA+PSAwKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgXFxgaW50ZXJ2YWxcXGAgdG8gYmUgYSBmaW5pdGUgbnVtYmVyID49IDAsIGdvdCBcXGAke29wdGlvbnMuaW50ZXJ2YWw/LnRvU3RyaW5nKCkgPz8gJyd9XFxgICgke3R5cGVvZiBvcHRpb25zLmludGVydmFsfSlgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNjYXJyeW92ZXJDb25jdXJyZW5jeUNvdW50ID0gb3B0aW9ucy5jYXJyeW92ZXJDb25jdXJyZW5jeUNvdW50O1xuICAgICAgICB0aGlzLiNpc0ludGVydmFsSWdub3JlZCA9IG9wdGlvbnMuaW50ZXJ2YWxDYXAgPT09IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSB8fCBvcHRpb25zLmludGVydmFsID09PSAwO1xuICAgICAgICB0aGlzLiNpbnRlcnZhbENhcCA9IG9wdGlvbnMuaW50ZXJ2YWxDYXA7XG4gICAgICAgIHRoaXMuI2ludGVydmFsID0gb3B0aW9ucy5pbnRlcnZhbDtcbiAgICAgICAgdGhpcy4jcXVldWUgPSBuZXcgb3B0aW9ucy5xdWV1ZUNsYXNzKCk7XG4gICAgICAgIHRoaXMuI3F1ZXVlQ2xhc3MgPSBvcHRpb25zLnF1ZXVlQ2xhc3M7XG4gICAgICAgIHRoaXMuY29uY3VycmVuY3kgPSBvcHRpb25zLmNvbmN1cnJlbmN5O1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBvcHRpb25zLnRpbWVvdXQ7XG4gICAgICAgIHRoaXMuI3Rocm93T25UaW1lb3V0ID0gb3B0aW9ucy50aHJvd09uVGltZW91dCA9PT0gdHJ1ZTtcbiAgICAgICAgdGhpcy4jaXNQYXVzZWQgPSBvcHRpb25zLmF1dG9TdGFydCA9PT0gZmFsc2U7XG4gICAgfVxuICAgIGdldCAjZG9lc0ludGVydmFsQWxsb3dBbm90aGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jaXNJbnRlcnZhbElnbm9yZWQgfHwgdGhpcy4jaW50ZXJ2YWxDb3VudCA8IHRoaXMuI2ludGVydmFsQ2FwO1xuICAgIH1cbiAgICBnZXQgI2RvZXNDb25jdXJyZW50QWxsb3dBbm90aGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jcGVuZGluZyA8IHRoaXMuI2NvbmN1cnJlbmN5O1xuICAgIH1cbiAgICAjbmV4dCgpIHtcbiAgICAgICAgdGhpcy4jcGVuZGluZy0tO1xuICAgICAgICB0aGlzLiN0cnlUb1N0YXJ0QW5vdGhlcigpO1xuICAgICAgICB0aGlzLmVtaXQoJ25leHQnKTtcbiAgICB9XG4gICAgI29uUmVzdW1lSW50ZXJ2YWwoKSB7XG4gICAgICAgIHRoaXMuI29uSW50ZXJ2YWwoKTtcbiAgICAgICAgdGhpcy4jaW5pdGlhbGl6ZUludGVydmFsSWZOZWVkZWQoKTtcbiAgICAgICAgdGhpcy4jdGltZW91dElkID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBnZXQgI2lzSW50ZXJ2YWxQYXVzZWQoKSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICh0aGlzLiNpbnRlcnZhbElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy4jaW50ZXJ2YWxFbmQgLSBub3c7XG4gICAgICAgICAgICBpZiAoZGVsYXkgPCAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQWN0IGFzIHRoZSBpbnRlcnZhbCB3YXMgZG9uZVxuICAgICAgICAgICAgICAgIC8vIFdlIGRvbid0IG5lZWQgdG8gcmVzdW1lIGl0IGhlcmUgYmVjYXVzZSBpdCB3aWxsIGJlIHJlc3VtZWQgb24gbGluZSAxNjBcbiAgICAgICAgICAgICAgICB0aGlzLiNpbnRlcnZhbENvdW50ID0gKHRoaXMuI2NhcnJ5b3ZlckNvbmN1cnJlbmN5Q291bnQpID8gdGhpcy4jcGVuZGluZyA6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBY3QgYXMgdGhlIGludGVydmFsIGlzIHBlbmRpbmdcbiAgICAgICAgICAgICAgICBpZiAodGhpcy4jdGltZW91dElkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4jdGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiNvblJlc3VtZUludGVydmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAjdHJ5VG9TdGFydEFub3RoZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLiNxdWV1ZS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAvLyBXZSBjYW4gY2xlYXIgdGhlIGludGVydmFsIChcInBhdXNlXCIpXG4gICAgICAgICAgICAvLyBCZWNhdXNlIHdlIGNhbiByZWRvIGl0IGxhdGVyIChcInJlc3VtZVwiKVxuICAgICAgICAgICAgaWYgKHRoaXMuI2ludGVydmFsSWQpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuI2ludGVydmFsSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4jaW50ZXJ2YWxJZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZW1wdHknKTtcbiAgICAgICAgICAgIGlmICh0aGlzLiNwZW5kaW5nID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpZGxlJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLiNpc1BhdXNlZCkge1xuICAgICAgICAgICAgY29uc3QgY2FuSW5pdGlhbGl6ZUludGVydmFsID0gIXRoaXMuI2lzSW50ZXJ2YWxQYXVzZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy4jZG9lc0ludGVydmFsQWxsb3dBbm90aGVyICYmIHRoaXMuI2RvZXNDb25jdXJyZW50QWxsb3dBbm90aGVyKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgam9iID0gdGhpcy4jcXVldWUuZGVxdWV1ZSgpO1xuICAgICAgICAgICAgICAgIGlmICgham9iKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBqb2IoKTtcbiAgICAgICAgICAgICAgICBpZiAoY2FuSW5pdGlhbGl6ZUludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuI2luaXRpYWxpemVJbnRlcnZhbElmTmVlZGVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgI2luaXRpYWxpemVJbnRlcnZhbElmTmVlZGVkKCkge1xuICAgICAgICBpZiAodGhpcy4jaXNJbnRlcnZhbElnbm9yZWQgfHwgdGhpcy4jaW50ZXJ2YWxJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4jaW50ZXJ2YWxJZCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuI29uSW50ZXJ2YWwoKTtcbiAgICAgICAgfSwgdGhpcy4jaW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLiNpbnRlcnZhbEVuZCA9IERhdGUubm93KCkgKyB0aGlzLiNpbnRlcnZhbDtcbiAgICB9XG4gICAgI29uSW50ZXJ2YWwoKSB7XG4gICAgICAgIGlmICh0aGlzLiNpbnRlcnZhbENvdW50ID09PSAwICYmIHRoaXMuI3BlbmRpbmcgPT09IDAgJiYgdGhpcy4jaW50ZXJ2YWxJZCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLiNpbnRlcnZhbElkKTtcbiAgICAgICAgICAgIHRoaXMuI2ludGVydmFsSWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4jaW50ZXJ2YWxDb3VudCA9IHRoaXMuI2NhcnJ5b3ZlckNvbmN1cnJlbmN5Q291bnQgPyB0aGlzLiNwZW5kaW5nIDogMDtcbiAgICAgICAgdGhpcy4jcHJvY2Vzc1F1ZXVlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgIEV4ZWN1dGVzIGFsbCBxdWV1ZWQgZnVuY3Rpb25zIHVudGlsIGl0IHJlYWNoZXMgdGhlIGxpbWl0LlxuICAgICovXG4gICAgI3Byb2Nlc3NRdWV1ZSgpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgICAgIHdoaWxlICh0aGlzLiN0cnlUb1N0YXJ0QW5vdGhlcigpKSB7IH1cbiAgICB9XG4gICAgZ2V0IGNvbmN1cnJlbmN5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jY29uY3VycmVuY3k7XG4gICAgfVxuICAgIHNldCBjb25jdXJyZW5jeShuZXdDb25jdXJyZW5jeSkge1xuICAgICAgICBpZiAoISh0eXBlb2YgbmV3Q29uY3VycmVuY3kgPT09ICdudW1iZXInICYmIG5ld0NvbmN1cnJlbmN5ID49IDEpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBcXGBjb25jdXJyZW5jeVxcYCB0byBiZSBhIG51bWJlciBmcm9tIDEgYW5kIHVwLCBnb3QgXFxgJHtuZXdDb25jdXJyZW5jeX1cXGAgKCR7dHlwZW9mIG5ld0NvbmN1cnJlbmN5fSlgKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiNjb25jdXJyZW5jeSA9IG5ld0NvbmN1cnJlbmN5O1xuICAgICAgICB0aGlzLiNwcm9jZXNzUXVldWUoKTtcbiAgICB9XG4gICAgYXN5bmMgI3Rocm93T25BYm9ydChzaWduYWwpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChfcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBzaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHNpZ25hbC5yZWFzb24pO1xuICAgICAgICAgICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgYWRkKGZ1bmN0aW9uXywgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0aW1lb3V0OiB0aGlzLnRpbWVvdXQsXG4gICAgICAgICAgICB0aHJvd09uVGltZW91dDogdGhpcy4jdGhyb3dPblRpbWVvdXQsXG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4jcXVldWUuZW5xdWV1ZShhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4jcGVuZGluZysrO1xuICAgICAgICAgICAgICAgIHRoaXMuI2ludGVydmFsQ291bnQrKztcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnNpZ25hbD8udGhyb3dJZkFib3J0ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wZXJhdGlvbiA9IGZ1bmN0aW9uXyh7IHNpZ25hbDogb3B0aW9ucy5zaWduYWwgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnRpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGlvbiA9IHBUaW1lb3V0KFByb21pc2UucmVzb2x2ZShvcGVyYXRpb24pLCB7IG1pbGxpc2Vjb25kczogb3B0aW9ucy50aW1lb3V0IH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnNpZ25hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BlcmF0aW9uID0gUHJvbWlzZS5yYWNlKFtvcGVyYXRpb24sIHRoaXMuI3Rocm93T25BYm9ydChvcHRpb25zLnNpZ25hbCldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBvcGVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdjb21wbGV0ZWQnLCByZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgVGltZW91dEVycm9yICYmICFvcHRpb25zLnRocm93T25UaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuI25leHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnYWRkJyk7XG4gICAgICAgICAgICB0aGlzLiN0cnlUb1N0YXJ0QW5vdGhlcigpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgYWRkQWxsKGZ1bmN0aW9ucywgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZnVuY3Rpb25zLm1hcChhc3luYyAoZnVuY3Rpb25fKSA9PiB0aGlzLmFkZChmdW5jdGlvbl8sIG9wdGlvbnMpKSk7XG4gICAgfVxuICAgIC8qKlxuICAgIFN0YXJ0IChvciByZXN1bWUpIGV4ZWN1dGluZyBlbnF1ZXVlZCB0YXNrcyB3aXRoaW4gY29uY3VycmVuY3kgbGltaXQuIE5vIG5lZWQgdG8gY2FsbCB0aGlzIGlmIHF1ZXVlIGlzIG5vdCBwYXVzZWQgKHZpYSBgb3B0aW9ucy5hdXRvU3RhcnQgPSBmYWxzZWAgb3IgYnkgYC5wYXVzZSgpYCBtZXRob2QuKVxuICAgICovXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIGlmICghdGhpcy4jaXNQYXVzZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuI2lzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuI3Byb2Nlc3NRdWV1ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgUHV0IHF1ZXVlIGV4ZWN1dGlvbiBvbiBob2xkLlxuICAgICovXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIHRoaXMuI2lzUGF1c2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgQ2xlYXIgdGhlIHF1ZXVlLlxuICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuI3F1ZXVlID0gbmV3IHRoaXMuI3F1ZXVlQ2xhc3MoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgQ2FuIGJlIGNhbGxlZCBtdWx0aXBsZSB0aW1lcy4gVXNlZnVsIGlmIHlvdSBmb3IgZXhhbXBsZSBhZGQgYWRkaXRpb25hbCBpdGVtcyBhdCBhIGxhdGVyIHRpbWUuXG5cbiAgICBAcmV0dXJucyBBIHByb21pc2UgdGhhdCBzZXR0bGVzIHdoZW4gdGhlIHF1ZXVlIGJlY29tZXMgZW1wdHkuXG4gICAgKi9cbiAgICBhc3luYyBvbkVtcHR5KCkge1xuICAgICAgICAvLyBJbnN0YW50bHkgcmVzb2x2ZSBpZiB0aGUgcXVldWUgaXMgZW1wdHlcbiAgICAgICAgaWYgKHRoaXMuI3F1ZXVlLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLiNvbkV2ZW50KCdlbXB0eScpO1xuICAgIH1cbiAgICAvKipcbiAgICBAcmV0dXJucyBBIHByb21pc2UgdGhhdCBzZXR0bGVzIHdoZW4gdGhlIHF1ZXVlIHNpemUgaXMgbGVzcyB0aGFuIHRoZSBnaXZlbiBsaW1pdDogYHF1ZXVlLnNpemUgPCBsaW1pdGAuXG5cbiAgICBJZiB5b3Ugd2FudCB0byBhdm9pZCBoYXZpbmcgdGhlIHF1ZXVlIGdyb3cgYmV5b25kIGEgY2VydGFpbiBzaXplIHlvdSBjYW4gYGF3YWl0IHF1ZXVlLm9uU2l6ZUxlc3NUaGFuKClgIGJlZm9yZSBhZGRpbmcgYSBuZXcgaXRlbS5cblxuICAgIE5vdGUgdGhhdCB0aGlzIG9ubHkgbGltaXRzIHRoZSBudW1iZXIgb2YgaXRlbXMgd2FpdGluZyB0byBzdGFydC4gVGhlcmUgY291bGQgc3RpbGwgYmUgdXAgdG8gYGNvbmN1cnJlbmN5YCBqb2JzIGFscmVhZHkgcnVubmluZyB0aGF0IHRoaXMgY2FsbCBkb2VzIG5vdCBpbmNsdWRlIGluIGl0cyBjYWxjdWxhdGlvbi5cbiAgICAqL1xuICAgIGFzeW5jIG9uU2l6ZUxlc3NUaGFuKGxpbWl0KSB7XG4gICAgICAgIC8vIEluc3RhbnRseSByZXNvbHZlIGlmIHRoZSBxdWV1ZSBpcyBlbXB0eS5cbiAgICAgICAgaWYgKHRoaXMuI3F1ZXVlLnNpemUgPCBsaW1pdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHRoaXMuI29uRXZlbnQoJ25leHQnLCAoKSA9PiB0aGlzLiNxdWV1ZS5zaXplIDwgbGltaXQpO1xuICAgIH1cbiAgICAvKipcbiAgICBUaGUgZGlmZmVyZW5jZSB3aXRoIGAub25FbXB0eWAgaXMgdGhhdCBgLm9uSWRsZWAgZ3VhcmFudGVlcyB0aGF0IGFsbCB3b3JrIGZyb20gdGhlIHF1ZXVlIGhhcyBmaW5pc2hlZC4gYC5vbkVtcHR5YCBtZXJlbHkgc2lnbmFscyB0aGF0IHRoZSBxdWV1ZSBpcyBlbXB0eSwgYnV0IGl0IGNvdWxkIG1lYW4gdGhhdCBzb21lIHByb21pc2VzIGhhdmVuJ3QgY29tcGxldGVkIHlldC5cblxuICAgIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHNldHRsZXMgd2hlbiB0aGUgcXVldWUgYmVjb21lcyBlbXB0eSwgYW5kIGFsbCBwcm9taXNlcyBoYXZlIGNvbXBsZXRlZDsgYHF1ZXVlLnNpemUgPT09IDAgJiYgcXVldWUucGVuZGluZyA9PT0gMGAuXG4gICAgKi9cbiAgICBhc3luYyBvbklkbGUoKSB7XG4gICAgICAgIC8vIEluc3RhbnRseSByZXNvbHZlIGlmIG5vbmUgcGVuZGluZyBhbmQgaWYgbm90aGluZyBlbHNlIGlzIHF1ZXVlZFxuICAgICAgICBpZiAodGhpcy4jcGVuZGluZyA9PT0gMCAmJiB0aGlzLiNxdWV1ZS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdGhpcy4jb25FdmVudCgnaWRsZScpO1xuICAgIH1cbiAgICBhc3luYyAjb25FdmVudChldmVudCwgZmlsdGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVyID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXIgJiYgIWZpbHRlcigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoZXZlbnQsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5vbihldmVudCwgbGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgU2l6ZSBvZiB0aGUgcXVldWUsIHRoZSBudW1iZXIgb2YgcXVldWVkIGl0ZW1zIHdhaXRpbmcgdG8gcnVuLlxuICAgICovXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiNxdWV1ZS5zaXplO1xuICAgIH1cbiAgICAvKipcbiAgICBTaXplIG9mIHRoZSBxdWV1ZSwgZmlsdGVyZWQgYnkgdGhlIGdpdmVuIG9wdGlvbnMuXG5cbiAgICBGb3IgZXhhbXBsZSwgdGhpcyBjYW4gYmUgdXNlZCB0byBmaW5kIHRoZSBudW1iZXIgb2YgaXRlbXMgcmVtYWluaW5nIGluIHRoZSBxdWV1ZSB3aXRoIGEgc3BlY2lmaWMgcHJpb3JpdHkgbGV2ZWwuXG4gICAgKi9cbiAgICBzaXplQnkob3B0aW9ucykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdW5pY29ybi9uby1hcnJheS1jYWxsYmFjay1yZWZlcmVuY2VcbiAgICAgICAgcmV0dXJuIHRoaXMuI3F1ZXVlLmZpbHRlcihvcHRpb25zKS5sZW5ndGg7XG4gICAgfVxuICAgIC8qKlxuICAgIE51bWJlciBvZiBydW5uaW5nIGl0ZW1zIChubyBsb25nZXIgaW4gdGhlIHF1ZXVlKS5cbiAgICAqL1xuICAgIGdldCBwZW5kaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4jcGVuZGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgV2hldGhlciB0aGUgcXVldWUgaXMgY3VycmVudGx5IHBhdXNlZC5cbiAgICAqL1xuICAgIGdldCBpc1BhdXNlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuI2lzUGF1c2VkO1xuICAgIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IEVWRU5UIH0gZnJvbSBcIn4vZW51bS9ldmVudC50c1wiO1xuaW1wb3J0IHsgZXZlbnRzLCBpbml0LCBzZW5kRmlsZUVycm9yLCB1cGRhdGVGaWxlIH0gZnJvbSBcIn4vd29ya2VyL3NoYXJlZC50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJBY3Rpb25NZXNzYWdlIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1hY3Rpb24tbWVzc2FnZS50c1wiO1xuaW1wb3J0IHsgZG93bmxvYWRDaHVuayB9IGZyb20gXCJ+L2FwaS93ZWJzb2NrZXQudHNcIjtcbmltcG9ydCBQUXVldWUgZnJvbSBcInAtcXVldWVcIjtcbmltcG9ydCB7IFdPUktFUl9BQ1RJT04gfSBmcm9tIFwifi9lbnVtL3dvcmtlci1hY3Rpb24udHNcIjtcbmltcG9ydCB0eXBlIHsgV2ViU29ja2V0RXJyb3IgfSBmcm9tIFwifi9lcnJvci93ZWJzb2NrZXQvd2Vic29ja2V0LWVycm9yLnRzXCI7XG5cbmRlY2xhcmUgY29uc3Qgc2VsZjogV29ya2VyO1xuXG5jb25zdCBRVUVVRV9DT05DVVJSRU5DWV9MSU1JVCA9IG5hdmlnYXRvci5oYXJkd2FyZUNvbmN1cnJlbmN5IHx8IDE7XG5jb25zdCBxdWV1ZSA9IG5ldyBQUXVldWUoe1xuICBjb25jdXJyZW5jeTogUVVFVUVfQ09OQ1VSUkVOQ1lfTElNSVQsXG59KTtcbmxldCBpdGVtc0luUXVldWUgPSAwO1xubGV0IGlzSW5pdGlhdGVkID0gZmFsc2U7XG5sZXQgaXNQYXVzZWQgPSBmYWxzZTtcblxuc2VsZi5vbm1lc3NhZ2UgPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICBpZiAoIWlzSW5pdGlhdGVkKSB7XG4gICAgaW5pdCgpO1xuICAgIGlzSW5pdGlhdGVkID0gdHJ1ZTtcblxuICAgIGV2ZW50cy5vbmNlKEVWRU5ULkRPV05MT0FEX1NUQVJURUQsICgpID0+IHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudDogRVZFTlQuRE9XTkxPQURfU1RBUlRFRCB9KTtcbiAgICB9KTtcblxuICAgIGV2ZW50cy5vbmNlKEVWRU5ULkRPV05MT0FEX0NPTVBMRVRFLCAoKSA9PiB7XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULkRPV05MT0FEX0NPTVBMRVRFIH0pO1xuICAgIH0pO1xuXG4gICAgZXZlbnRzLm9uKEVWRU5ULkZJTEVfVVBEQVRFRCwgdXBkYXRlRmlsZSk7XG5cbiAgICBldmVudHMub24oXG4gICAgICBFVkVOVC5DSFVOS19ET1dOTE9BREVELFxuICAgICAgKGJ1ZmZlcjogQXJyYXlCdWZmZXIsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgaXRlbXNJblF1ZXVlLS07XG5cbiAgICAgICAgaWYgKCFpc1BhdXNlZCAmJiBpdGVtc0luUXVldWUgPCBRVUVVRV9DT05DVVJSRU5DWV9MSU1JVCkge1xuICAgICAgICAgIHF1ZXVlLnN0YXJ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICBldmVudDogRVZFTlQuQ0hVTktfRE9XTkxPQURFRCxcbiAgICAgICAgICBjaHVuazogeyBidWZmZXIsIGluZGV4IH0sXG4gICAgICAgIH0sIFtidWZmZXJdKTtcbiAgICAgIH0sXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGEgPSBldmVudC5kYXRhIGFzIFdvcmtlckFjdGlvbk1lc3NhZ2U7XG5cbiAgc3dpdGNoIChkYXRhLmFjdGlvbikge1xuICAgIGNhc2UgV09SS0VSX0FDVElPTi5QQVVTRTpcbiAgICAgIHtcbiAgICAgICAgaXNQYXVzZWQgPSB0cnVlO1xuICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULkpPQl9QQVVTRUQgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgV09SS0VSX0FDVElPTi5SRVNVTUU6XG4gICAgICB7XG4gICAgICAgIGlzUGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudDogRVZFTlQuSk9CX1JFU1VNRUQgfSk7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICBkb3dubG9hZChkYXRhKS5tYXBFcnIoKGVycm9yKSA9PiB7XG4gICAgICAgIHNlbmRGaWxlRXJyb3IoZGF0YS5hcmdzLmx1ZmlGaWxlLCBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxufTtcblxuY29uc3QgZG93bmxvYWQgPSAoXG4gIHdvcmtlck1lc3NhZ2U6IFdvcmtlckFjdGlvbk1lc3NhZ2UsXG4pOiBSZXN1bHRBc3luYzx2b2lkLCBXZWJTb2NrZXRFcnJvcj4gPT4ge1xuICBjb25zdCB7IGx1ZmlGaWxlIH0gPSB3b3JrZXJNZXNzYWdlLmFyZ3M7XG5cbiAgZXZlbnRzLm9uKEVWRU5ULkRPV05MT0FEX1NUQVJURUQsIGFzeW5jICgpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGx1ZmlGaWxlLnRvdGFsQ2h1bmtzOyBpKyspIHtcbiAgICAgIGlmICghaXNQYXVzZWQgJiYgaXRlbXNJblF1ZXVlIDwgUVVFVUVfQ09OQ1VSUkVOQ1lfTElNSVQpIHtcbiAgICAgICAgcXVldWUuc3RhcnQoKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgcXVldWUuYWRkKGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgZG93bmxvYWRDaHVuayhsdWZpRmlsZSwgaSk7XG5cbiAgICAgICAgaXRlbXNJblF1ZXVlKys7XG5cbiAgICAgICAgaWYgKGlzUGF1c2VkIHx8IGl0ZW1zSW5RdWV1ZSA9PT0gUVVFVUVfQ09OQ1VSUkVOQ1lfTElNSVQpIHtcbiAgICAgICAgICBxdWV1ZS5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIGl0ZW1zSW5RdWV1ZSsrO1xuXG4gIHJldHVybiBkb3dubG9hZENodW5rKGx1ZmlGaWxlLCAwKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUF1QkEsUUFBSSxJQUFJLE9BQU8sWUFBWSxXQUFXLFVBQVU7QUFDaEQsUUFBSSxlQUFlLEtBQUssT0FBTyxFQUFFLFVBQVUsYUFDdkMsRUFBRSxRQUNGLFNBQVNBLGNBQWEsUUFBUSxVQUFVLE1BQU07QUFDOUMsYUFBTyxTQUFTLFVBQVUsTUFBTSxLQUFLLFFBQVEsVUFBVSxJQUFJO0FBQUEsSUFDN0Q7QUFFRixRQUFJO0FBQ0osUUFBSSxLQUFLLE9BQU8sRUFBRSxZQUFZLFlBQVk7QUFDeEMsdUJBQWlCLEVBQUU7QUFBQSxJQUNyQixXQUFXLE9BQU8sdUJBQXVCO0FBQ3ZDLHVCQUFpQixTQUFTQyxnQkFBZSxRQUFRO0FBQy9DLGVBQU8sT0FBTyxvQkFBb0IsTUFBTSxFQUNyQyxPQUFPLE9BQU8sc0JBQXNCLE1BQU0sQ0FBQztBQUFBLE1BQ2hEO0FBQUEsSUFDRixPQUFPO0FBQ0wsdUJBQWlCLFNBQVNBLGdCQUFlLFFBQVE7QUFDL0MsZUFBTyxPQUFPLG9CQUFvQixNQUFNO0FBQUEsTUFDMUM7QUFBQSxJQUNGO0FBRUEsYUFBUyxtQkFBbUIsU0FBUztBQUNuQyxVQUFJLFdBQVcsUUFBUSxLQUFNLFNBQVEsS0FBSyxPQUFPO0FBQUEsSUFDbkQ7QUFFQSxRQUFJLGNBQWMsT0FBTyxTQUFTLFNBQVNDLGFBQVksT0FBTztBQUM1RCxhQUFPLFVBQVU7QUFBQSxJQUNuQjtBQUVBLGFBQVNDLGdCQUFlO0FBQ3RCLE1BQUFBLGNBQWEsS0FBSyxLQUFLLElBQUk7QUFBQSxJQUM3QjtBQUNBLFdBQU8sVUFBVUE7QUFDakIsV0FBTyxRQUFRLE9BQU87QUFHdEIsSUFB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V0FBSyxXQUFTLFdBQVU7QUFBQyxlQUFNLGdCQUFjLEtBQUs7QUFBQSxNQUFPO0FBQUUsV0FBSyxVQUFRO0FBQUEsSUFBQyxFQUFDLEVBQUM7QUFDM2MsSUFBQUEsTUFBSyxPQUFPLE1BQUksU0FBUyxHQUFFO0FBQUMsV0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFHLEtBQUssRUFBRTtBQUFFLFVBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUUsS0FBSyxFQUFFLENBQUM7QUFBRSxVQUFFLEVBQUU7QUFBTyxVQUFJLElBQUU7QUFBRSxVQUFHLE1BQUksS0FBRyxNQUFJLEtBQUcsTUFBSSxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsc0JBQXNCO0FBQUUsV0FBSyxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRyxLQUFJO0FBQUMsWUFBRSxFQUFFLElBQUUsQ0FBQztBQUFFLFlBQUcsTUFBSSxJQUFFLEtBQUcsTUFBSSxLQUFHLE1BQUksSUFBRSxFQUFFLEtBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEdBQUcsS0FBRyxLQUFHLEVBQUUsS0FBRyxJQUFFLEdBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLEdBQUUsTUFBSSxJQUFFLE1BQUksSUFBRSxLQUFHLElBQUUsTUFBSSxLQUFHLEtBQUcsSUFBRyxJQUFFLEtBQUcsSUFBRSxPQUFLLEtBQUc7QUFBSSxVQUFFLENBQUMsSUFBRSxFQUFFLElBQUUsQ0FBQyxJQUFFO0FBQUEsTUFBQztBQUFDLFdBQUksSUFBRSxHQUFFLEdBQUUsS0FBSSxJQUFJLEtBQUUsRUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxLQUFHLEtBQUcsSUFBRSxJQUFFLElBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFJLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFDM2YsR0FBRyxDQUFDO0FBQUEsSUFBQztBQUNMLElBQUFBLE1BQUssT0FBTyxJQUFJLFlBQVUsRUFBQyxTQUFRLFNBQVMsR0FBRTtBQUFDLGFBQU8sR0FBRyxNQUFLLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRTtBQUFDLGFBQU8sR0FBRyxNQUFLLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxHQUFFLFdBQVU7QUFBQyxVQUFJLElBQUUsS0FBSyxFQUFFLENBQUMsR0FBRSxJQUFFLEtBQUssRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsTUFBTSxHQUFFLElBQUksSUFBRyxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsT0FBSyxLQUFHLE1BQUksQ0FBQyxJQUFFO0FBQUUsV0FBSSxJQUFFLElBQUUsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEtBQUcsS0FBRyxHQUFFLElBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHLElBQUUsS0FBRyxJQUFFLEtBQUcsSUFBRSxLQUFHLEdBQUUsSUFBRSxLQUFHLElBQUUsSUFBRSxNQUFJLElBQUcsRUFBRSxDQUFDLElBQUUsR0FBRSxFQUFFLENBQUMsSUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsSUFBRSxXQUFVLElBQUUsUUFBUSxJQUFFLE1BQU0sSUFBRSxXQUFVLEdBQUUsSUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFFLFdBQVUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksR0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLEtBQUcsTUFBSTtBQUFFLFdBQUksSUFDbGdCLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDO0FBQUEsSUFBQyxFQUFDO0FBQ2hELGFBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUcsTUFBSSxFQUFFLE9BQU8sT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx3QkFBd0I7QUFBRSxVQUFJLElBQUUsRUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsU0FBTyxJQUFFLEdBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFFLEVBQUUsRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLENBQUM7QUFBRSxVQUFJLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksS0FBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBSSxFQUFFLElBQUUsRUFBRSxLQUFHLEtBQUcsR0FBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFJLEVBQUUsSUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLElBQUUsRUFBRSxLQUFHLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFO0FBQUUsV0FBSSxJQUNyZixHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEdBQUcsS0FBRyxLQUFHLEVBQUUsS0FBRyxJQUFFLEdBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUU7QUFBRSxhQUFPO0FBQUEsSUFBQztBQUNoSCxJQUFBQSxNQUFLLFdBQVMsRUFBQyxVQUFTLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFFQSxNQUFLLFNBQVMsRUFBRSxFQUFFLE1BQU0sSUFBRSxFQUFFLEdBQUUsTUFBSSxJQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7QUFBRSxhQUFPLFdBQVMsSUFBRSxJQUFFQSxNQUFLLFNBQVMsTUFBTSxHQUFFLElBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsS0FBSyxNQUFNLENBQUMsSUFBRSxJQUFFLEVBQUU7QUFBRSxlQUFRLElBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxFQUFFLElBQUUsS0FBRyxDQUFDLEtBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxLQUFHLElBQUUsQ0FBQyxNQUFJLElBQUUsRUFBRSxJQUFFLEtBQUcsQ0FBQyxNQUFJLE1BQUksS0FBRyxLQUFHO0FBQUEsSUFBQyxHQUFFLFFBQU8sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHLE1BQUksRUFBRSxVQUFRLE1BQUksRUFBRSxPQUFPLFFBQU8sRUFBRSxPQUFPLENBQUM7QUFBRSxVQUFJLElBQUUsRUFBRSxFQUFFLFNBQU8sQ0FBQyxHQUFFLElBQUVBLE1BQUssU0FBUyxXQUFXLENBQUM7QUFBRSxhQUFPLE9BQUssSUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFFQSxNQUFLLFNBQVMsRUFBRSxHQUFFLEdBQUUsSUFBRSxHQUFFLEVBQUUsTUFBTSxHQUFFLEVBQUUsU0FBTyxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsV0FBVSxTQUFTLEdBQUU7QUFBQyxVQUFJLElBQUUsRUFBRTtBQUFPLGFBQU8sTUFDMWYsSUFBRSxJQUFFLE1BQUksSUFBRSxLQUFHQSxNQUFLLFNBQVMsV0FBVyxFQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQyxHQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHLEtBQUcsRUFBRSxTQUFPLEVBQUUsUUFBTztBQUFFLFVBQUUsRUFBRSxNQUFNLEdBQUUsS0FBSyxLQUFLLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxJQUFFLEVBQUU7QUFBTyxVQUFFLElBQUU7QUFBRyxVQUFFLEtBQUcsTUFBSSxFQUFFLElBQUUsQ0FBQyxJQUFFQSxNQUFLLFNBQVMsUUFBUSxHQUFFLEVBQUUsSUFBRSxDQUFDLElBQUUsY0FBWSxJQUFFLEdBQUUsQ0FBQztBQUFHLGFBQU87QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsYUFBTyxPQUFLLElBQUUsS0FBRyxJQUFFLElBQUUsSUFBRSxLQUFHLEtBQUcsS0FBRyxnQkFBYztBQUFBLElBQUMsR0FBRSxZQUFXLFNBQVMsR0FBRTtBQUFDLGFBQU8sS0FBSyxNQUFNLElBQUUsYUFBYSxLQUFHO0FBQUEsSUFBRSxHQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHQSxNQUFLLFNBQVMsVUFBVSxDQUFDLE1BQUlBLE1BQUssU0FBUyxVQUFVLENBQUMsRUFBRSxRQUFNO0FBQUcsVUFBSSxJQUFFLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLE1BQUcsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsYUFBTyxNQUNsZjtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUk7QUFBRSxVQUFFO0FBQUUsV0FBSSxXQUFTLE1BQUksSUFBRSxDQUFDLElBQUcsTUFBSSxHQUFFLEtBQUcsR0FBRyxHQUFFLEtBQUssQ0FBQyxHQUFFLElBQUU7QUFBRSxVQUFHLE1BQUksRUFBRSxRQUFPLEVBQUUsT0FBTyxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxHQUFFLEtBQUssSUFBRSxFQUFFLENBQUMsTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsS0FBRyxLQUFHO0FBQUUsVUFBRSxFQUFFLFNBQU8sRUFBRSxFQUFFLFNBQU8sQ0FBQyxJQUFFO0FBQUUsVUFBRUEsTUFBSyxTQUFTLFdBQVcsQ0FBQztBQUFFLFFBQUUsS0FBS0EsTUFBSyxTQUFTLFFBQVEsSUFBRSxJQUFFLElBQUcsS0FBRyxJQUFFLElBQUUsSUFBRSxFQUFFLElBQUksR0FBRSxDQUFDLENBQUM7QUFBRSxhQUFPO0FBQUEsSUFBQyxHQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUU7QUFBQyxhQUFNLENBQUMsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsV0FBVSxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxFQUFFLEVBQUUsS0FBRSxFQUFFLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxNQUFJLEtBQUcsTUFBSSxJQUFFLFNBQVEsSUFBRSxVQUFTLElBQUUsS0FBRztBQUFHLGFBQU87QUFBQSxJQUFDLEVBQUM7QUFDcGQsSUFBQUEsTUFBSyxNQUFNLGFBQVcsRUFBQyxVQUFTLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRSxJQUFHLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUMsR0FBRSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsSUFBSSxRQUFLLElBQUUsT0FBSyxJQUFFLEVBQUUsSUFBRSxDQUFDLElBQUcsS0FBRyxPQUFPLGFBQWEsTUFBSSxNQUFJLE1BQUksQ0FBQyxHQUFFLE1BQUk7QUFBRSxhQUFPLG1CQUFtQixPQUFPLENBQUMsQ0FBQztBQUFBLElBQUMsR0FBRSxRQUFPLFNBQVMsR0FBRTtBQUFDLFVBQUUsU0FBUyxtQkFBbUIsQ0FBQyxDQUFDO0FBQUUsVUFBSSxJQUFFLENBQUMsR0FBRSxHQUFFLElBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLEtBQUUsS0FBRyxJQUFFLEVBQUUsV0FBVyxDQUFDLEdBQUUsT0FBSyxJQUFFLE9BQUssRUFBRSxLQUFLLENBQUMsR0FBRSxJQUFFO0FBQUcsVUFBRSxLQUFHLEVBQUUsS0FBS0EsTUFBSyxTQUFTLFFB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LEdBQUUsVUFBUyxXQUFVO0FBQUMsVUFBSSxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUVBLE1BQUssU0FBUyxPQUFPLEdBQUUsQ0FBQ0EsTUFBSyxTQUFTLFFBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUFFLFdBQUksSUFBRSxFQUFFLFNBQU8sR0FBRSxJQUFFLElBQUcsSUFBSSxHQUFFLEtBQUssQ0FBQztBQUFFLFFBQUUsS0FBSyxLQUFLLE1BQU0sS0FBSyxJQUFFLFVBQVcsQ0FBQztBQUFFLFdBQUksRUFBRSxLQUFLLEtBQUssSUFBRSxDQUFDLEdBQUUsRUFBRSxTQUFRLE1BQUssRUFBRSxFQUFFLE9BQU8sR0FBRSxFQUFFLENBQUM7QUFBRSxXQUFLLE1BQU07QUFBRSxhQUFPO0FBQUEsSUFBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEdBQUUsV0FBVTtBQUFDLGVBQVMsRUFBRUMsSUFBRTtBQUFDLGVBQU8sY0FBYUEsS0FBRSxLQUFLLE1BQU1BLEVBQUMsS0FBRztBQUFBLE1BQUM7QUFBQyxlQUFRLElBQUUsR0FBRSxJQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUcsR0FBRSxLQUFJO0FBQUMsWUFBRTtBQUFHLGFBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxHQUFFLElBQUksS0FBRyxNQUFJLElBQUUsR0FBRTtBQUFDLGNBQ3pmO0FBQUc7QUFBQSxRQUFLO0FBQUMsY0FBSSxJQUFFLE1BQUksS0FBSyxFQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLEdBQUUsQ0FBQyxJQUFHLEtBQUssRUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxJQUFFLENBQUMsQ0FBQyxHQUFFO0FBQUEsTUFBSTtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLFVBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLEtBQUcsR0FBRSxJQUFJLE1BQUcsSUFBRSxJQUFFLEVBQUUsQ0FBQyxLQUFHLElBQUUsRUFBRSxJQUFFLElBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEtBQUcsRUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEVBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksSUFBRSxLQUFHLEtBQUcsS0FBRyxPQUFLLE1BQUksS0FBRyxNQUFJLEtBQUcsTUFBSSxLQUFHLEtBQUcsS0FBRyxLQUFHLE1BQUksRUFBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLElBQUUsSUFBRSxFQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEtBQUcsTUFBSSxJQUFFLEtBQUcsSUFBRSxNQUFJLEVBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFHLElBQUUsSUFBRSxLQUFHLElBQUUsT0FBSyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEtBQUcsTUFBSTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQ3BmO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFBLElBQUMsRUFBQztBQUFFLElBQUFELE1BQUssS0FBSyxTQUFPLFNBQVMsR0FBRTtBQUFDLFdBQUssRUFBRSxDQUFDLEtBQUcsS0FBSyxFQUFFO0FBQUUsV0FBRyxLQUFLLElBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEtBQUssSUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsS0FBSyxJQUFFLEVBQUUsS0FBRyxLQUFLLE1BQU07QUFBQSxJQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLE9BQU8sT0FBSyxTQUFTLEdBQUU7QUFBQyxhQUFPLElBQUlBLE1BQUssS0FBSyxTQUFRLE9BQU8sQ0FBQyxFQUFFLFNBQVM7QUFBQSxJQUFDO0FBQy9TLElBQUFBLE1BQUssS0FBSyxPQUFPLFlBQVUsRUFBQyxXQUFVLE1BQUssT0FBTSxXQUFVO0FBQUMsV0FBSyxJQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxtQkFBVyxPQUFPLE1BQUksSUFBRUEsTUFBSyxNQUFNLFdBQVcsT0FBTyxDQUFDO0FBQUcsVUFBSSxHQUFFLElBQUUsS0FBSyxJQUFFQSxNQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUUsQ0FBQztBQUFFLFVBQUUsS0FBSztBQUFFLFVBQUUsS0FBSyxJQUFFLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUM7QUFBRSxVQUFHLG1CQUFpQixFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEscUNBQXFDO0FBQUUsVUFBRyxnQkFBYyxPQUFPLGFBQVk7QUFBQyxZQUFJLElBQUUsSUFBSSxZQUFZLENBQUMsR0FBRSxJQUFFO0FBQUUsYUFBSSxJQUFFLE9BQUssS0FBRyxPQUFLLElBQUUsT0FBTSxLQUFHLEdBQUUsS0FBRyxLQUFLLE1BQUssRUFBRSxFQUFFLFNBQVMsS0FDdGYsR0FBRSxNQUFJLElBQUUsRUFBRSxDQUFDLEdBQUUsS0FBRztBQUFFLFVBQUUsT0FBTyxHQUFFLEtBQUcsQ0FBQztBQUFBLE1BQUMsTUFBTSxNQUFJLElBQUUsT0FBSyxLQUFHLE9BQUssSUFBRSxPQUFNLEtBQUcsR0FBRSxLQUFHLEtBQUssTUFBSyxFQUFFLEVBQUUsT0FBTyxHQUFFLEVBQUUsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsVUFBUyxXQUFVO0FBQUMsVUFBSSxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUVBLE1BQUssU0FBUyxPQUFPLEdBQUUsQ0FBQ0EsTUFBSyxTQUFTLFFBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUFFLFdBQUksSUFBRSxFQUFFLFNBQU8sR0FBRSxJQUFFLElBQUcsSUFBSSxHQUFFLEtBQUssQ0FBQztBQUFFLFFBQUUsS0FBSyxDQUFDO0FBQUUsUUFBRSxLQUFLLENBQUM7QUFBRSxRQUFFLEtBQUssS0FBSyxNQUFNLEtBQUssSUFBRSxVQUFXLENBQUM7QUFBRSxXQUFJLEVBQUUsS0FBSyxLQUFLLElBQUUsQ0FBQyxHQUFFLEVBQUUsU0FBUSxNQUFLLEVBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSyxNQUFNO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsVUFBUyxVQUFTLFNBQVEsU0FBUSxVQUFTLFNBQVEsU0FBUSxPQUFPLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRztBQUFBLE1BQUM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUNsZjtBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFPO0FBQUEsTUFBTztBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQ3BmO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxJQUFPLEdBQUUsR0FBRSxXQUFVO0FBQUMsZUFBUyxFQUFFQyxJQUFFO0FBQUMsZUFBTyxjQUFhQSxLQUFFLEtBQUssTUFBTUEsRUFBQyxLQUFHO0FBQUEsTUFBQztBQUFDLGVBQVMsRUFBRUEsSUFBRTtBQUFDLGVBQU8saUJBQWVBLEtBQUUsS0FBSyxNQUFNQSxFQUFDLEtBQUc7QUFBQSxNQUFHO0FBQUMsZUFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEdBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUU7QUFBRyxhQUFJLElBQUUsR0FBRSxJQUFFLEtBQUcsR0FBRSxJQUFJLEtBQUcsTUFBSSxJQUFFLEdBQUU7QUFBQyxjQUFFO0FBQUc7QUFBQSxRQUFLO0FBQUMsY0FBSSxJQUFFLE1BQUksS0FBSyxFQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsR0FBRSxDQUFDLEdBQUUsS0FBSyxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxHQUFFLENBQUMsS0FBRyxLQUFHLEtBQUssR0FBRyxDQUFDLElBQUcsS0FBSyxFQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRSxLQUFLLEVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLElBQUUsQ0FBQyxDQUFDLEtBQUcsS0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFFO0FBQUEsTUFBSTtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLFVBQUksR0FDdmdCLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLEtBQUcsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRTtBQUFFLFVBQUcsZ0JBQWMsT0FBTyxhQUFZO0FBQUMsWUFBRSxNQUFNLEdBQUc7QUFBRSxpQkFBUSxJQUFFLEdBQUUsS0FBRyxHQUFFLElBQUksR0FBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUEsTUFBQyxNQUFNLEtBQUU7QUFBRSxVQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUcsS0FBRyxFQUFFLEtBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsSUFBRSxJQUFFLENBQUM7QUFBQSxhQUFNO0FBQUMsY0FBRSxFQUFFLEtBQUcsSUFBRSxHQUFHO0FBQUUsY0FBSSxJQUFFLEVBQUUsS0FBRyxJQUFFLE1BQUksQ0FBQztBQUFFLGVBQUcsS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxLQUFHLE1BQUk7QUFBRSxjQUFJLEtBQUcsS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxNQUFJLEtBQUcsS0FBRyxNQUFJO0FBQUcsY0FBRSxFQUFFLEtBQUcsSUFBRSxFQUFFO0FBQUUsY0FBSSxJQUFFLEVBQUUsS0FBRyxJQUFFLEtBQUcsQ0FBQyxHQUNuZixLQUFHLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxJQUFFLE1BQUksTUFBSSxNQUFJLEdBQUUsS0FBRyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsSUFBRSxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksSUFBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsR0FBRSxJQUFFLEVBQUUsS0FBRyxJQUFFLE1BQUksQ0FBQztBQUFFLGNBQUUsSUFBRSxFQUFFLEtBQUcsSUFBRSxLQUFHLENBQUM7QUFBRSxjQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBRyxlQUFHO0FBQUUsZUFBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFHLGVBQUc7QUFBRSxlQUFHLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFO0FBQUEsUUFBRTtBQUFDLFVBQUUsSUFBRSxDQUFDLElBQUUsS0FBRztBQUFFLFVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxLQUFHO0FBQUUsWUFBSSxJQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxLQUFHLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxHQUFFLEtBQUcsSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksSUFBRyxLQUFHLEtBQUcsSUFBRSxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxJQUFHLEtBQUcsRUFBRSxJQUFFLENBQUMsR0FBRSxLQUFHLEVBQUUsSUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLE1BQUksS0FBRyxLQUFHLE1BQUksT0FBSyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLEtBQUksSUFBRSxNQUFJLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksT0FBSyxLQUNwZixLQUFHLE1BQUksT0FBSyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsSUFBRyxJQUFFLEtBQUcsS0FBRyxNQUFJLElBQUUsT0FBSyxJQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRyxJQUFFLEtBQUcsTUFBSSxNQUFJLElBQUUsT0FBSyxJQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFJLFlBQUUsSUFBRTtBQUFHLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFHLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUUsSUFBRSxJQUFFO0FBQUUsWUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFLElBQUUsSUFBRTtBQUFFLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUEsTUFBQztBQUFDLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFDbmY7QUFBRSxRQUFFLEVBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsRUFBRSxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxFQUFFLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxFQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUEsSUFBQyxFQUFDO0FBQ3pILElBQUFELE1BQUssS0FBSyxNQUFJLEVBQUMsTUFBSyxPQUFNLEdBQUUsQ0FBQyxHQUFFLGdCQUFlLFNBQVMsR0FBRTtBQUFDLE1BQUFBLE1BQUssS0FBSyxJQUFJLEVBQUUsS0FBSyxDQUFDO0FBQUEsSUFBQyxHQUFFLGtCQUFpQixTQUFTLEdBQUU7QUFBQyxVQUFFQSxNQUFLLEtBQUssSUFBSSxFQUFFLFFBQVEsQ0FBQztBQUFFLFdBQUcsS0FBR0EsTUFBSyxLQUFLLElBQUksRUFBRSxPQUFPLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxJQUFHLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxHQUFFLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxJQUFFQSxNQUFLLFVBQVMsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFO0FBQUUsVUFBRSxLQUFHO0FBQUcsVUFBRSxLQUFHLENBQUM7QUFBRSxVQUFHLElBQUUsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLGtDQUFrQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsR0FBRSxJQUFJO0FBQUMsVUFBRSxLQUFHLE1BQUksSUFBRSxLQUFHO0FBQUcsVUFBRSxFQUFFO0FBQUEsUUFBTTtBQUFBLFFBQ3RmLEtBQUcsS0FBRztBQUFB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QUFFLEtBQUUsRUFBRSxRQUFRLEVBQUUsR0FBRSxFQUFFLE1BQU0sR0FBRSxJQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsR0FBRSxHQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFBRSxhQUFPLEVBQUUsTUFBTSxHQUFFLElBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLEdBQUUsSUFBRUEsTUFBSztBQUFTLFVBQUUsRUFBRTtBQUFFLFVBQUksSUFBRSxFQUFFLFFBQU8sSUFBRSxFQUFFLFVBQVUsQ0FBQyxHQUFFLElBQUUsSUFBRSxJQUFHLElBQUU7QUFBRSxVQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsUUFBUSxHQUFFLElBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFFLENBQUM7QUFBRSxVQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFFLEdBQUUsQ0FBQztBQUFFLFVBQUcsQ0FBQyxFQUFFLFFBQU0sRUFBQyxLQUFJLEdBQUUsTUFBSyxDQUFDLEVBQUM7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBRyxFQUFFLEtBQUUsTUFBSUEsTUFBSyxLQUFLLElBQUksR0FBRyxJQUNyZ0IsQ0FBQyxHQUFFLEtBQUcsSUFBRyxFQUFFLENBQUMsS0FBSSxJQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLEdBQUUsRUFBRSxJQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsR0FBRSxFQUFFLElBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDO0FBQUUsYUFBTSxFQUFDLEtBQUksR0FBRSxNQUFLLEVBQUUsTUFBTSxHQUFFLENBQUMsRUFBQztBQUFBLElBQUMsRUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxPQUFLLFNBQVMsR0FBRSxHQUFFO0FBQUMsV0FBSyxJQUFFLElBQUUsS0FBR0EsTUFBSyxLQUFLO0FBQU8sVUFBSSxJQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsWUFBVTtBQUFHLFdBQUssSUFBRSxDQUFDLElBQUksS0FBRSxJQUFJLEdBQUM7QUFBRSxRQUFFLFNBQU8sTUFBSSxJQUFFLEVBQUUsS0FBSyxDQUFDO0FBQUcsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLFdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFO0FBQVcsV0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxJQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQztBQUMzWSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFVBQVFBLE1BQUssS0FBSyxLQUFLLFVBQVUsTUFBSSxTQUFTLEdBQUU7QUFBQyxVQUFHLEtBQUssRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHlDQUF5QztBQUFFLFdBQUssT0FBTyxDQUFDO0FBQUUsYUFBTyxLQUFLLE9BQU8sQ0FBQztBQUFBLElBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFFBQU0sV0FBVTtBQUFDLFdBQUssSUFBRSxJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxJQUFFO0FBQUEsSUFBRTtBQUFFLElBQUFBLE1BQUssS0FBSyxLQUFLLFVBQVUsU0FBTyxTQUFTLEdBQUU7QUFBQyxXQUFLLElBQUU7QUFBRyxXQUFLLEVBQUUsT0FBTyxDQUFDO0FBQUEsSUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxLQUFLLFVBQVUsU0FBTyxXQUFVO0FBQUMsVUFBSSxJQUFFLEtBQUssRUFBRSxTQUFTLEdBQUUsSUFBRyxJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUcsT0FBTyxDQUFDLEVBQUUsU0FBUztBQUFFLFdBQUssTUFBTTtBQUFFLGFBQU87QUFBQSxJQUFDO0FBQ3ZlLElBQUFBLE1BQUssS0FBSyxTQUFPLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBRSxLQUFHO0FBQUksVUFBRyxJQUFFLEtBQUcsSUFBRSxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsMEJBQTBCO0FBQUUsbUJBQVcsT0FBTyxNQUFJLElBQUVBLE1BQUssTUFBTSxXQUFXLE9BQU8sQ0FBQztBQUFHLG1CQUFXLE9BQU8sTUFBSSxJQUFFQSxNQUFLLE1BQU0sV0FBVyxPQUFPLENBQUM7QUFBRyxVQUFFLEtBQUdBLE1BQUssS0FBSztBQUFLLFVBQUUsSUFBSSxFQUFFLENBQUM7QUFBRSxVQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRUEsTUFBSztBQUFTLFdBQUksSUFBRSxHQUFFLEtBQUcsRUFBRSxVQUFRLEtBQUcsSUFBRyxLQUFJO0FBQUMsWUFBRSxJQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUUsYUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksTUFBSSxJQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksR0FBRSxDQUFDLEtBQUcsRUFBRSxDQUFDO0FBQUUsWUFBRSxFQUFFLE9BQU8sQ0FBQztBQUFBLE1BQUM7QUFBQyxZQUFJLElBQUUsRUFBRSxNQUFNLEdBQUUsQ0FBQztBQUFHLGFBQU87QUFBQSxJQUFDO0FBQ25kLElBQUFBLE1BQUssT0FBSyxTQUFTLEdBQUU7QUFBQyxXQUFLLElBQUUsQ0FBQyxJQUFJQSxNQUFLLEtBQUssUUFBTTtBQUFFLFdBQUssSUFBRSxDQUFDLENBQUM7QUFBRSxXQUFLLElBQUU7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRSxDQUFDO0FBQUUsV0FBSyxJQUFFLEtBQUssSUFBRSxLQUFLLElBQUUsS0FBSyxLQUFHO0FBQUUsV0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsV0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFPLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRTtBQUFHLFdBQUssSUFBRSxFQUFDLFVBQVMsQ0FBQyxHQUFFLFFBQU8sQ0FBQyxFQUFDO0FBQUUsV0FBSyxJQUFFLEtBQUssS0FBRztBQUFFLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRTtBQUFFLFdBQUssS0FBRztBQUFRLFdBQUssSUFBRSxDQUFDLEdBQUUsSUFBRyxJQUFHLElBQUcsS0FBSSxLQUFJLEtBQU0sS0FBSSxLQUFJLEtBQUksSUFBSTtBQUFFLFdBQUssS0FBRztBQUFJLFdBQUssSUFBRTtBQUFBLElBQUU7QUFDelcsSUFBQUEsTUFBSyxLQUFLLFlBQVU7QUFBQSxNQUFDLGFBQVksU0FBUyxHQUFFLEdBQUU7QUFBQyxZQUFJLElBQUUsQ0FBQyxHQUFFO0FBQUUsWUFBRSxLQUFLLFFBQVEsQ0FBQztBQUFFLFlBQUk7QUFBRSxZQUFHLE1BQUksS0FBSyxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFNBQVMsd0JBQXdCO0FBQUUsWUFBRyxJQUFFLEtBQUssR0FBRTtBQUFDLGNBQUUsRUFBRSxJQUFFLEtBQUs7QUFBRyxjQUFFLENBQUM7QUFBRSxjQUFJLElBQUUsR0FBRTtBQUFFLGVBQUssSUFBRSxFQUFFLENBQUMsS0FBRyxvQkFBSSxRQUFNLFFBQVEsSUFBRSxLQUFLO0FBQUcsZUFBSSxJQUFFLEdBQUUsS0FBRyxHQUFFLElBQUksR0FBRSxLQUFLLGFBQVksS0FBSyxPQUFPLElBQUUsQ0FBQztBQUFFLGVBQUksSUFBRSxH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QTtBQUFBLE1BRUwsQ0FBQyxRQUFxQixVQUFrQjtBQUN0QztBQUVBLFlBQUksQ0FBQyxZQUFZLGVBQWUseUJBQXlCO0FBQ3ZELGdCQUFNLE1BQU07QUFBQSxRQUNkO0FBRUEsYUFBSyxZQUFZO0FBQUEsVUFDZjtBQUFBLFVBQ0EsT0FBTyxFQUFFLFFBQVEsTUFBTTtBQUFBLFFBQ3pCLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFBQSxNQUNiO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLE9BQU8sTUFBTTtBQUVuQixVQUFRLEtBQUssUUFBUTtBQUFBLElBQ25CO0FBQ0U7QUFDRSxtQkFBVztBQUNYLGFBQUssWUFBWSxFQUFFLHFDQUF3QixDQUFDO0FBQUEsTUFDOUM7QUFDQTtBQUFBLElBRUY7QUFDRTtBQUNFLG1CQUFXO0FBQ1gsYUFBSyxZQUFZLEVBQUUsdUNBQXlCLENBQUM7QUFBQSxNQUMvQztBQUNBO0FBQUEsSUFFRjtBQUNFLGVBQVMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFVO0FBQy9CLHNCQUFjLEtBQUssS0FBSyxVQUFVLEtBQUs7QUFBQSxNQUN6QyxDQUFDO0FBQUEsRUFDTDtBQUNGO0FBRUEsSUFBTSxXQUFXLENBQ2Ysa0JBQ3NDO0FBQ3RDLFFBQU0sRUFBRSxTQUFTLElBQUksY0FBYztBQUVuQyxTQUFPLDhDQUEyQixZQUFZO0FBQzVDLGFBQVMsSUFBSSxHQUFHLElBQUksU0FBUyxhQUFhLEtBQUs7QUFDN0MsVUFBSSxDQUFDLFlBQVksZUFBZSx5QkFBeUI7QUFDdkQsY0FBTSxNQUFNO0FBQUEsTUFDZDtBQUVBLFlBQU0sTUFBTSxJQUFJLFlBQVk7QUFDMUIsY0FBTSxjQUFjLFVBQVUsQ0FBQztBQUUvQjtBQUVBLFlBQUksWUFBWSxpQkFBaUIseUJBQXlCO0FBQ3hELGdCQUFNLE1BQU07QUFBQSxRQUNkO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsQ0FBQztBQUVEO0FBRUEsU0FBTyxjQUFjLFVBQVUsQ0FBQztBQUNsQzsiLAogICJuYW1lcyI6IFsiUmVmbGVjdEFwcGx5IiwgIlJlZmxlY3RPd25LZXlzIiwgIk51bWJlcklzTmFOIiwgIkV2ZW50RW1pdHRlciIsICJldmVudHMiLCAiZXJyIiwgIm9uY2UiLCAic2pjbCIsICJhIiwgIkV2ZW50RW1pdHRlciIsICJldmVudHMiLCAiRXZlbnRFbWl0dGVyIiwgInYiLCAib2siLCAiZXJyIiwgIlJlc3VsdCIsICJmcm9tVGhyb3dhYmxlIiwgIm9rIiwgImVyciIsICJzZWxmIiwgIm9iaiIsICJEZWNvZGUiLCAib2JqIiwgInNqY2wiLCAiZGVjcnlwdCIsICJEZWNvZGUiLCAiZGVjcnlwdCIsICJkZWNyeXB0IiwgIl9xdWV1ZSIsICJFdmVudEVtaXR0ZXIiXQp9Cg==
