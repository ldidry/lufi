var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
        var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
        err.context = er;
        throw err;
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
        function errorListener(err) {
          emitter.removeListener(name, resolver);
          reject(err);
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

// src/worker/shared.ts
var import_events = __toESM(require_events());

// src/enum/worker-action.ts
var WORKER_ACTION = /* @__PURE__ */ ((WORKER_ACTION2) => {
  WORKER_ACTION2[WORKER_ACTION2["PAUSE"] = 0] = "PAUSE";
  WORKER_ACTION2[WORKER_ACTION2["PROVIDE_FILE"] = 1] = "PROVIDE_FILE";
  WORKER_ACTION2[WORKER_ACTION2["RESUME"] = 2] = "RESUME";
  return WORKER_ACTION2;
})(WORKER_ACTION || {});

// src/worker/shared.ts
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
var isWorkerActionMessage = (message) => {
  return typeof message === "object" && message !== null && "action" in message && Object.values(WORKER_ACTION).includes(message.action);
};
export {
  events,
  init,
  isWorkerActionMessage,
  sendFileError,
  updateFile
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi9zcmMvd29ya2VyL3NoYXJlZC50cyIsICIuLi8uLi9zcmMvZW51bS93b3JrZXItYWN0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUiA9IHR5cGVvZiBSZWZsZWN0ID09PSAnb2JqZWN0JyA/IFJlZmxlY3QgOiBudWxsXG52YXIgUmVmbGVjdEFwcGx5ID0gUiAmJiB0eXBlb2YgUi5hcHBseSA9PT0gJ2Z1bmN0aW9uJ1xuICA/IFIuYXBwbHlcbiAgOiBmdW5jdGlvbiBSZWZsZWN0QXBwbHkodGFyZ2V0LCByZWNlaXZlciwgYXJncykge1xuICAgIHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbCh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKTtcbiAgfVxuXG52YXIgUmVmbGVjdE93bktleXNcbmlmIChSICYmIHR5cGVvZiBSLm93bktleXMgPT09ICdmdW5jdGlvbicpIHtcbiAgUmVmbGVjdE93bktleXMgPSBSLm93bktleXNcbn0gZWxzZSBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpXG4gICAgICAuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KSk7XG4gIH07XG59IGVsc2Uge1xuICBSZWZsZWN0T3duS2V5cyA9IGZ1bmN0aW9uIFJlZmxlY3RPd25LZXlzKHRhcmdldCkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0YXJnZXQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBQcm9jZXNzRW1pdFdhcm5pbmcod2FybmluZykge1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLndhcm4pIGNvbnNvbGUud2Fybih3YXJuaW5nKTtcbn1cblxudmFyIE51bWJlcklzTmFOID0gTnVtYmVyLmlzTmFOIHx8IGZ1bmN0aW9uIE51bWJlcklzTmFOKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgRXZlbnRFbWl0dGVyLmluaXQuY2FsbCh0aGlzKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xubW9kdWxlLmV4cG9ydHMub25jZSA9IG9uY2U7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzQ291bnQgPSAwO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG52YXIgZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG5mdW5jdGlvbiBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBGdW5jdGlvbi4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGxpc3RlbmVyKTtcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnRFbWl0dGVyLCAnZGVmYXVsdE1heExpc3RlbmVycycsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGVmYXVsdE1heExpc3RlbmVycztcbiAgfSxcbiAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgfHwgYXJnIDwgMCB8fCBOdW1iZXJJc05hTihhcmcpKSB7XG4gICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiZGVmYXVsdE1heExpc3RlbmVyc1wiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBhcmcgKyAnLicpO1xuICAgIH1cbiAgICBkZWZhdWx0TWF4TGlzdGVuZXJzID0gYXJnO1xuICB9XG59KTtcblxuRXZlbnRFbWl0dGVyLmluaXQgPSBmdW5jdGlvbigpIHtcblxuICBpZiAodGhpcy5fZXZlbnRzID09PSB1bmRlZmluZWQgfHxcbiAgICAgIHRoaXMuX2V2ZW50cyA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHRoaXMpLl9ldmVudHMpIHtcbiAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59O1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBzZXRNYXhMaXN0ZW5lcnMobikge1xuICBpZiAodHlwZW9mIG4gIT09ICdudW1iZXInIHx8IG4gPCAwIHx8IE51bWJlcklzTmFOKG4pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBvZiBcIm5cIiBpcyBvdXQgb2YgcmFuZ2UuIEl0IG11c3QgYmUgYSBub24tbmVnYXRpdmUgbnVtYmVyLiBSZWNlaXZlZCAnICsgbiArICcuJyk7XG4gIH1cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5mdW5jdGlvbiBfZ2V0TWF4TGlzdGVuZXJzKHRoYXQpIHtcbiAgaWYgKHRoYXQuX21heExpc3RlbmVycyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBFdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycztcbiAgcmV0dXJuIHRoYXQuX21heExpc3RlbmVycztcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5nZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbiBnZXRNYXhMaXN0ZW5lcnMoKSB7XG4gIHJldHVybiBfZ2V0TWF4TGlzdGVuZXJzKHRoaXMpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdCh0eXBlKSB7XG4gIHZhciBhcmdzID0gW107XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSBhcmdzLnB1c2goYXJndW1lbnRzW2ldKTtcbiAgdmFyIGRvRXJyb3IgPSAodHlwZSA9PT0gJ2Vycm9yJyk7XG5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgIGRvRXJyb3IgPSAoZG9FcnJvciAmJiBldmVudHMuZXJyb3IgPT09IHVuZGVmaW5lZCk7XG4gIGVsc2UgaWYgKCFkb0Vycm9yKVxuICAgIHJldHVybiBmYWxzZTtcblxuICAvLyBJZiB0aGVyZSBpcyBubyAnZXJyb3InIGV2ZW50IGxpc3RlbmVyIHRoZW4gdGhyb3cuXG4gIGlmIChkb0Vycm9yKSB7XG4gICAgdmFyIGVyO1xuICAgIGlmIChhcmdzLmxlbmd0aCA+IDApXG4gICAgICBlciA9IGFyZ3NbMF07XG4gICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIC8vIE5vdGU6IFRoZSBjb21tZW50cyBvbiB0aGUgYHRocm93YCBsaW5lcyBhcmUgaW50ZW50aW9uYWwsIHRoZXkgc2hvd1xuICAgICAgLy8gdXAgaW4gTm9kZSdzIG91dHB1dCBpZiB0aGlzIHJlc3VsdHMgaW4gYW4gdW5oYW5kbGVkIGV4Y2VwdGlvbi5cbiAgICAgIHRocm93IGVyOyAvLyBVbmhhbmRsZWQgJ2Vycm9yJyBldmVudFxuICAgIH1cbiAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5oYW5kbGVkIGVycm9yLicgKyAoZXIgPyAnICgnICsgZXIubWVzc2FnZSArICcpJyA6ICcnKSk7XG4gICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICB0aHJvdyBlcnI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoaGFuZGxlciA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBmYWxzZTtcblxuICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBSZWZsZWN0QXBwbHkoaGFuZGxlciwgdGhpcywgYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIFJlZmxlY3RBcHBseShsaXN0ZW5lcnNbaV0sIHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5mdW5jdGlvbiBfYWRkTGlzdGVuZXIodGFyZ2V0LCB0eXBlLCBsaXN0ZW5lciwgcHJlcGVuZCkge1xuICB2YXIgbTtcbiAgdmFyIGV2ZW50cztcbiAgdmFyIGV4aXN0aW5nO1xuXG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpIHtcbiAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0YXJnZXQuZW1pdCgnbmV3TGlzdGVuZXInLCB0eXBlLFxuICAgICAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgPyBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICAgICAgLy8gUmUtYXNzaWduIGBldmVudHNgIGJlY2F1c2UgYSBuZXdMaXN0ZW5lciBoYW5kbGVyIGNvdWxkIGhhdmUgY2F1c2VkIHRoZVxuICAgICAgLy8gdGhpcy5fZXZlbnRzIHRvIGJlIGFzc2lnbmVkIHRvIGEgbmV3IG9iamVjdFxuICAgICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gICAgfVxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdO1xuICB9XG5cbiAgaWYgKGV4aXN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9IGxpc3RlbmVyO1xuICAgICsrdGFyZ2V0Ll9ldmVudHNDb3VudDtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGV4aXN0aW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBBZGRpbmcgdGhlIHNlY29uZCBlbGVtZW50LCBuZWVkIHRvIGNoYW5nZSB0byBhcnJheS5cbiAgICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID1cbiAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgfSBlbHNlIGlmIChwcmVwZW5kKSB7XG4gICAgICBleGlzdGluZy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBtID0gX2dldE1heExpc3RlbmVycyh0YXJnZXQpO1xuICAgIGlmIChtID4gMCAmJiBleGlzdGluZy5sZW5ndGggPiBtICYmICFleGlzdGluZy53YXJuZWQpIHtcbiAgICAgIGV4aXN0aW5nLndhcm5lZCA9IHRydWU7XG4gICAgICAvLyBObyBlcnJvciBjb2RlIGZvciB0aGlzIHNpbmNlIGl0IGlzIGEgV2FybmluZ1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gICAgICB2YXIgdyA9IG5ldyBFcnJvcignUG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXhpc3RpbmcubGVuZ3RoICsgJyAnICsgU3RyaW5nKHR5cGUpICsgJyBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdpbmNyZWFzZSBsaW1pdCcpO1xuICAgICAgdy5uYW1lID0gJ01heExpc3RlbmVyc0V4Y2VlZGVkV2FybmluZyc7XG4gICAgICB3LmVtaXR0ZXIgPSB0YXJnZXQ7XG4gICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgdy5jb3VudCA9IGV4aXN0aW5nLmxlbmd0aDtcbiAgICAgIFByb2Nlc3NFbWl0V2FybmluZyh3KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24gYWRkTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZExpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIHRydWUpO1xuICAgIH07XG5cbmZ1bmN0aW9uIG9uY2VXcmFwcGVyKCkge1xuICBpZiAoIXRoaXMuZmlyZWQpIHtcbiAgICB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLnR5cGUsIHRoaXMud3JhcEZuKTtcbiAgICB0aGlzLmZpcmVkID0gdHJ1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmFwcGx5KHRoaXMudGFyZ2V0LCBhcmd1bWVudHMpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IG9uY2VXcmFwcGVyLmJpbmQoc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICB0aGlzLnByZXBlbmRMaXN0ZW5lcih0eXBlLCBfb25jZVdyYXAodGhpcywgdHlwZSwgbGlzdGVuZXIpKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbi8vIEVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZiBhbmQgb25seSBpZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgdmFyIGxpc3QsIGV2ZW50cywgcG9zaXRpb24sIGksIG9yaWdpbmFsTGlzdGVuZXI7XG5cbiAgICAgIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpO1xuXG4gICAgICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gICAgICBpZiAoZXZlbnRzID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiB0aGlzO1xuXG4gICAgICBsaXN0ID0gZXZlbnRzW3R5cGVdO1xuICAgICAgaWYgKGxpc3QgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgZXZlbnRzW3R5cGVdO1xuICAgICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdC5saXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGxpc3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcG9zaXRpb24gPSAtMTtcblxuICAgICAgICBmb3IgKGkgPSBsaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGxpc3RlbmVyIHx8IGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBvcmlnaW5hbExpc3RlbmVyID0gbGlzdFtpXS5saXN0ZW5lcjtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwKVxuICAgICAgICAgIGxpc3Quc2hpZnQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICBldmVudHNbdHlwZV0gPSBsaXN0WzBdO1xuXG4gICAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgb3JpZ2luYWxMaXN0ZW5lciB8fCBsaXN0ZW5lcik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgICAgIGlmIChldmVudHMucmVtb3ZlTGlzdGVuZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKC0tdGhpcy5fZXZlbnRzQ291bnQgPT09IDApXG4gICAgICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhldmVudHMpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgICAgaWYgKGtleSA9PT0gJ3JlbW92ZUxpc3RlbmVyJykgY29udGludWU7XG4gICAgICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygncmVtb3ZlTGlzdGVuZXInKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgbGlzdGVuZXJzID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gICAgICB9IGVsc2UgaWYgKGxpc3RlbmVycyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIC8vIExJRk8gb3JkZXJcbiAgICAgICAgZm9yIChpID0gbGlzdGVuZXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbmZ1bmN0aW9uIF9saXN0ZW5lcnModGFyZ2V0LCB0eXBlLCB1bndyYXApIHtcbiAgdmFyIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG4gIGlmIChldmxpc3RlbmVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/XG4gICAgdW53cmFwTGlzdGVuZXJzKGV2bGlzdGVuZXIpIDogYXJyYXlDbG9uZShldmxpc3RlbmVyLCBldmxpc3RlbmVyLmxlbmd0aCk7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgdHJ1ZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJhd0xpc3RlbmVycyA9IGZ1bmN0aW9uIHJhd0xpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIubGlzdGVuZXJDb3VudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBlbWl0dGVyLmxpc3RlbmVyQ291bnQodHlwZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyQ291bnQuY2FsbChlbWl0dGVyLCB0eXBlKTtcbiAgfVxufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gbGlzdGVuZXJDb3VudDtcbmZ1bmN0aW9uIGxpc3RlbmVyQ291bnQodHlwZSkge1xuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuXG4gIGlmIChldmVudHMgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuXG4gICAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYgKGV2bGlzdGVuZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdE93bktleXModGhpcy5fZXZlbnRzKSA6IFtdO1xufTtcblxuZnVuY3Rpb24gYXJyYXlDbG9uZShhcnIsIG4pIHtcbiAgdmFyIGNvcHkgPSBuZXcgQXJyYXkobik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbjsgKytpKVxuICAgIGNvcHlbaV0gPSBhcnJbaV07XG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBzcGxpY2VPbmUobGlzdCwgaW5kZXgpIHtcbiAgZm9yICg7IGluZGV4ICsgMSA8IGxpc3QubGVuZ3RoOyBpbmRleCsrKVxuICAgIGxpc3RbaW5kZXhdID0gbGlzdFtpbmRleCArIDFdO1xuICBsaXN0LnBvcCgpO1xufVxuXG5mdW5jdGlvbiB1bndyYXBMaXN0ZW5lcnMoYXJyKSB7XG4gIHZhciByZXQgPSBuZXcgQXJyYXkoYXJyLmxlbmd0aCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmV0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmV0W2ldID0gYXJyW2ldLmxpc3RlbmVyIHx8IGFycltpXTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG5mdW5jdGlvbiBvbmNlKGVtaXR0ZXIsIG5hbWUpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBmdW5jdGlvbiBlcnJvckxpc3RlbmVyKGVycikge1xuICAgICAgZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihuYW1lLCByZXNvbHZlcik7XG4gICAgICByZWplY3QoZXJyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNvbHZlcigpIHtcbiAgICAgIGlmICh0eXBlb2YgZW1pdHRlci5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIGVycm9yTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShbXS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgcmVzb2x2ZXIsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICBpZiAobmFtZSAhPT0gJ2Vycm9yJykge1xuICAgICAgYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgZXJyb3JMaXN0ZW5lciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGFkZEVycm9ySGFuZGxlcklmRXZlbnRFbWl0dGVyKGVtaXR0ZXIsIGhhbmRsZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCAnZXJyb3InLCBoYW5kbGVyLCBmbGFncyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsIG5hbWUsIGxpc3RlbmVyLCBmbGFncykge1xuICBpZiAodHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgZW1pdHRlci5vbmNlKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW1pdHRlci5vbihuYW1lLCBsaXN0ZW5lcik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBFdmVudFRhcmdldCBkb2VzIG5vdCBoYXZlIGBlcnJvcmAgZXZlbnQgc2VtYW50aWNzIGxpa2UgTm9kZVxuICAgIC8vIEV2ZW50RW1pdHRlcnMsIHdlIGRvIG5vdCBsaXN0ZW4gZm9yIGBlcnJvcmAgZXZlbnRzIGhlcmUuXG4gICAgZW1pdHRlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGZ1bmN0aW9uIHdyYXBMaXN0ZW5lcihhcmcpIHtcbiAgICAgIC8vIElFIGRvZXMgbm90IGhhdmUgYnVpbHRpbiBgeyBvbmNlOiB0cnVlIH1gIHN1cHBvcnQgc28gd2VcbiAgICAgIC8vIGhhdmUgdG8gZG8gaXQgbWFudWFsbHkuXG4gICAgICBpZiAoZmxhZ3Mub25jZSkge1xuICAgICAgICBlbWl0dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIobmFtZSwgd3JhcExpc3RlbmVyKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyKGFyZyk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwiZW1pdHRlclwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBFdmVudEVtaXR0ZXIuIFJlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBlbWl0dGVyKTtcbiAgfVxufVxuIiwgImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgV09SS0VSX0FDVElPTiB9IGZyb20gXCJ+L2VudW0vd29ya2VyLWFjdGlvbi50c1wiO1xuaW1wb3J0IHR5cGUgeyBMdWZpRmlsZSB9IGZyb20gXCJ+L2VudGl0aWVzL2x1ZmktZmlsZS50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJBY3Rpb25NZXNzYWdlIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1hY3Rpb24tbWVzc2FnZS50c1wiO1xuaW1wb3J0IHsgRVZFTlQgfSBmcm9tIFwifi9lbnVtL2V2ZW50LnRzXCI7XG5pbXBvcnQgeyBVUExPQURfU1RBVFVTIH0gZnJvbSBcIn4vZW51bS9maWxlLXN0YXR1cy50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJFdmVudCB9IGZyb20gXCJ+L2ludGVyZmFjZS93b3JrZXItZXZlbnQudHNcIjtcblxuZGVjbGFyZSBsZXQgc2VsZjogV29ya2VyO1xuXG5leHBvcnQgY29uc3QgZXZlbnRzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4vKipcbiAqIFVwZGF0ZSBmaWxlIGluIHdvcmtlcnMgYW5kIHByb3ZpZGUgbW9kaWZpY2F0aW9ucyB0byB0aGUgbWFpbiB0aHJlYWRcbiAqXG4gKiBAcGFyYW0gbHVmaUZpbGVcbiAqIEBwYXJhbSBhcmdzXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgdXBkYXRlRmlsZSA9IChsdWZpRmlsZTogTHVmaUZpbGUsIGFyZ3M6IFBhcnRpYWw8THVmaUZpbGU+KSA9PiB7XG4gIE9iamVjdC5hc3NpZ24obHVmaUZpbGUsIGFyZ3MpO1xuXG4gIGlmICh0eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgIGV2ZW50OiBFVkVOVC5GSUxFX1VQREFURUQsXG4gICAgICBsdWZpRmlsZSxcbiAgICB9IGFzIFdvcmtlckV2ZW50KTtcbiAgfVxuXG4gIHJldHVybiBsdWZpRmlsZTtcbn07XG5cbmV4cG9ydCBjb25zdCBzZW5kRmlsZUVycm9yID0gKGx1ZmlGaWxlOiBMdWZpRmlsZSwgZXJyb3I6IEVycm9yKSA9PiB7XG4gIHVwZGF0ZUZpbGUobHVmaUZpbGUsIHsgdXBsb2FkU3RhdHVzOiBVUExPQURfU1RBVFVTLkZBSUxFRCB9KTtcblxuICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yIH0gYXMgV29ya2VyRXZlbnQpO1xufTtcblxuLyoqXG4gKiBJbml0IGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBhdCB0aGUgYmVnaW5uaW5nIG9mIGVhY2ggY2hpbGQgd29ya2VyJ3Mgb25tZXNzYWdlIGV2ZW50LlxuICovXG5leHBvcnQgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgZXZlbnRzLm9uY2UoRVZFTlQuU09DS0VUX09QRU5FRCwgKCkgPT4ge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgZXZlbnQ6IEVWRU5ULlNPQ0tFVF9PUEVORUQsXG4gICAgfSk7XG4gIH0pO1xuXG4gIGV2ZW50cy5vbmNlKEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yIH0pO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1dvcmtlckFjdGlvbk1lc3NhZ2UgPSAoXG4gIC8vIGRlbm8tbGludC1pZ25vcmUgbm8tZXhwbGljaXQtYW55XG4gIG1lc3NhZ2U6IGFueSxcbik6IG1lc3NhZ2UgaXMgV29ya2VyQWN0aW9uTWVzc2FnZSA9PiB7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIG1lc3NhZ2UgPT09IFwib2JqZWN0XCIgJiZcbiAgICBtZXNzYWdlICE9PSBudWxsICYmXG4gICAgXCJhY3Rpb25cIiBpbiBtZXNzYWdlICYmXG4gICAgT2JqZWN0LnZhbHVlcyhXT1JLRVJfQUNUSU9OKS5pbmNsdWRlcyhtZXNzYWdlLmFjdGlvbilcbiAgKTtcbn07XG4iLCAiZXhwb3J0IGVudW0gV09SS0VSX0FDVElPTiB7XG4gIFBBVVNFLFxuICBQUk9WSURFX0ZJTEUsXG4gIFJFU1VNRSxcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQXVCQSxRQUFJLElBQUksT0FBTyxZQUFZLFdBQVcsVUFBVTtBQUNoRCxRQUFJLGVBQWUsS0FBSyxPQUFPLEVBQUUsVUFBVSxhQUN2QyxFQUFFLFFBQ0YsU0FBU0EsY0FBYSxRQUFRLFVBQVUsTUFBTTtBQUM5QyxhQUFPLFNBQVMsVUFBVSxNQUFNLEtBQUssUUFBUSxVQUFVLElBQUk7QUFBQSxJQUM3RDtBQUVGLFFBQUk7QUFDSixRQUFJLEtBQUssT0FBTyxFQUFFLFlBQVksWUFBWTtBQUN4Qyx1QkFBaUIsRUFBRTtBQUFBLElBQ3JCLFdBQVcsT0FBTyx1QkFBdUI7QUFDdkMsdUJBQWlCLFNBQVNDLGdCQUFlLFFBQVE7QUFDL0MsZUFBTyxPQUFPLG9CQUFvQixNQUFNLEVBQ3JDLE9BQU8sT0FBTyxzQkFBc0IsTUFBTSxDQUFDO0FBQUEsTUFDaEQ7QUFBQSxJQUNGLE9BQU87QUFDTCx1QkFBaUIsU0FBU0EsZ0JBQWUsUUFBUTtBQUMvQyxlQUFPLE9BQU8sb0JBQW9C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U0FBNEI7QUFDekUsU0FBTyxPQUFPLFVBQVUsSUFBSTtBQUU1QixNQUFJLE9BQU8sc0JBQXNCLGFBQWE7QUFDNUMsU0FBSyxZQUFZO0FBQUEsTUFDZjtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQWdCO0FBQUEsRUFDbEI7QUFFQSxTQUFPO0FBQ1Q7QUFFTyxJQUFNLGdCQUFnQixDQUFDLFVBQW9CLFVBQWlCO0FBQ2pFLGFBQVcsVUFBVSxFQUFFLDZCQUFtQyxDQUFDO0FBRTNELE9BQUssWUFBWSxFQUFFLGtEQUErQixNQUFNLENBQWdCO0FBQzFFO0FBS08sSUFBTSxPQUFPLE1BQU07QUFDeEIsU0FBTywwQ0FBMEIsTUFBTTtBQUNyQyxTQUFLLFlBQVk7QUFBQSxNQUNmO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsU0FBTyxnREFBNkIsQ0FBQyxVQUFpQjtBQUNwRCxTQUFLLFlBQVksRUFBRSxrREFBK0IsTUFBTSxDQUFDO0FBQUEsRUFDM0QsQ0FBQztBQUNIO0FBRU8sSUFBTSx3QkFBd0IsQ0FFbkMsWUFDbUM7QUFDbkMsU0FDRSxPQUFPLFlBQVksWUFDbkIsWUFBWSxRQUNaLFlBQVksV0FDWixPQUFPLE9BQU8sYUFBYSxFQUFFLFNBQVMsUUFBUSxNQUFNO0FBRXhEOyIsCiAgIm5hbWVzIjogWyJSZWZsZWN0QXBwbHkiLCAiUmVmbGVjdE93bktleXMiLCAiTnVtYmVySXNOYU4iLCAiRXZlbnRFbWl0dGVyIiwgImV2ZW50cyIsICJvbmNlIiwgIldPUktFUl9BQ1RJT04iLCAiRXZlbnRFbWl0dGVyIl0KfQo=
