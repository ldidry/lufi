var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

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

// src/error/zip/zip-error.ts
var ZipError = class extends BaseError {
};

// src/error/zip/zip-decompression-error.ts
var ZipDecompressionError = class extends ZipError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "An error occured while trying to decompress the data");
  }
};

// node_modules/.deno/fflate@0.8.2/node_modules/fflate/esm/browser.js
var ch2 = {};
var wk = function(c, id, msg, transfer, cb) {
  var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
    c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
  ], { type: "text/javascript" }))));
  w.onmessage = function(e) {
    var d = e.data, ed = d.$e$;
    if (ed) {
      var err3 = new Error(ed[0]);
      err3["code"] = ed[1];
      err3.stack = ed[2];
      cb(err3, null);
    } else
      cb(null, d);
  };
  w.postMessage(msg, transfer);
  return w;
};
var u8 = Uint8Array;
var u16 = Uint16Array;
var i32 = Int32Array;
var fleb = new u8([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]);
var fdeb = new u8([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var freb = function(eb, start) {
  var b = new u16(31);
  for (var i = 0; i < 31; ++i) {
    b[i] = start += 1 << eb[i - 1];
  }
  var r = new i32(b[30]);
  for (var i = 1; i < 30; ++i) {
    for (var j = b[i]; j < b[i + 1]; ++j) {
      r[j] = j - b[i] << 5 | i;
    }
  }
  return { b, r };
};
var _a = freb(fleb, 2);
var fl = _a.b;
var revfl = _a.r;
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b.b;
var revfd = _b.r;
var rev = new u16(32768);
for (i = 0; i < 32768; ++i) {
  x = (i & 43690) >> 1 | (i & 21845) << 1;
  x = (x & 52428) >> 2 | (x & 13107) << 2;
  x = (x & 61680) >> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
}
var x;
var i;
var hMap = function(cd, mb, r) {
  var s = cd.length;
  var i = 0;
  var l = new u16(mb);
  for (; i < s; ++i) {
    if (cd[i])
      ++l[cd[i] - 1];
  }
  var le = new u16(mb);
  for (i = 1; i < mb; ++i) {
    le[i] = le[i - 1] + l[i - 1] << 1;
  }
  var co;
  if (r) {
    co = new u16(1 << mb);
    var rvb = 15 - mb;
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        var sv = i << 4 | cd[i];
        var r_1 = mb - cd[i];
        var v = le[cd[i] - 1]++ << r_1;
        for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
          co[rev[v] >> rvb] = sv;
        }
      }
    }
  } else {
    co = new u16(s);
    for (i = 0; i < s; ++i) {
      if (cd[i]) {
        co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
      }
    }
  }
  return co;
};
var flt = new u8(288);
for (i = 0; i < 144; ++i)
  flt[i] = 8;
var i;
for (i = 144; i < 256; ++i)
  flt[i] = 9;
var i;
for (i = 256; i < 280; ++i)
  flt[i] = 7;
var i;
for (i = 280; i < 288; ++i)
  flt[i] = 8;
var i;
var fdt = new u8(32);
for (i = 0; i < 32; ++i)
  fdt[i] = 5;
var i;
var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
var max = function(a) {
  var m = a[0];
  for (var i = 1; i < a.length; ++i) {
    if (a[i] > m)
      m = a[i];
  }
  return m;
};
var bits = function(d, p, m) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
};
var bits16 = function(d, p) {
  var o = p / 8 | 0;
  return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
};
var shft = function(p) {
  return (p + 7) / 8 | 0;
};
var slc = function(v, s, e) {
  if (s == null || s < 0)
    s = 0;
  if (e == null || e > v.length)
    e = v.length;
  return new u8(v.subarray(s, e));
};
var ec = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
];
var err = function(ind, msg, nt) {
  var e = new Error(msg || ec[ind]);
  e.code = ind;
  if (Error.captureStackTrace)
    Error.captureStackTrace(e, err);
  if (!nt)
    throw e;
  return e;
};
var inflt = function(dat, st, buf, dict) {
  var sl = dat.length, dl = dict ? dict.length : 0;
  if (!sl || st.f && !st.l)
    return buf || new u8(0);
  var noBuf = !buf;
  var resize = noBuf || st.i != 2;
  var noSt = st.i;
  if (noBuf)
    buf = new u8(sl * 3);
  var cbuf = function(l2) {
    var bl = buf.length;
    if (l2 > bl) {
      var nbuf = new u8(Math.max(bl * 2, l2));
      nbuf.set(buf);
      buf = nbuf;
    }
  };
  var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
  var tbts = sl * 8;
  do {
    if (!lm) {
      final = bits(dat, pos, 1);
      var type = bits(dat, pos + 1, 3);
      pos += 3;
      if (!type) {
        var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
        if (t > sl) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + l);
        buf.set(dat.subarray(s, t), bt);
        st.b = bt += l, st.p = pos = t * 8, st.f = final;
        continue;
      } else if (type == 1)
        lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
      else if (type == 2) {
        var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
        var tl = hLit + bits(dat, pos + 5, 31) + 1;
        pos += 14;
        var ldt = new u8(tl);
        var clt = new u8(19);
        for (var i = 0; i < hcLen; ++i) {
          clt[clim[i]] = bits(dat, pos + i * 3, 7);
        }
        pos += hcLen * 3;
        var clb = max(clt), clbmsk = (1 << clb) - 1;
        var clm = hMap(clt, clb, 1);
        for (var i = 0; i < tl; ) {
          var r = clm[bits(dat, pos, clbmsk)];
          pos += r & 15;
          var s = r >> 4;
          if (s < 16) {
            ldt[i++] = s;
          } else {
            var c = 0, n = 0;
            if (s == 16)
              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
            else if (s == 17)
              n = 3 + bits(dat, pos, 7), pos += 3;
            else if (s == 18)
              n = 11 + bits(dat, pos, 127), pos += 7;
            while (n--)
              ldt[i++] = c;
          }
        }
        var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
        lbt = max(lt);
        dbt = max(dt);
        lm = hMap(lt, lbt, 1);
        dm = hMap(dt, dbt, 1);
      } else
        err(1);
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
    }
    if (resize)
      cbuf(bt + 131072);
    var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
    var lpos = pos;
    for (; ; lpos = pos) {
      var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
      pos += c & 15;
      if (pos > tbts) {
        if (noSt)
          err(0);
        break;
      }
      if (!c)
        err(2);
      if (sym < 256)
        buf[bt++] = sym;
      else if (sym == 256) {
        lpos = pos, lm = null;
        break;
      } else {
        var add = sym - 254;
        if (sym > 264) {
          var i = sym - 257, b = fleb[i];
          add = bits(dat, pos, (1 << b) - 1) + fl[i];
          pos += b;
        }
        var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
        if (!d)
          err(3);
        pos += d & 15;
        var dt = fd[dsym];
        if (dsym > 3) {
          var b = fdeb[dsym];
          dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
        }
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (resize)
          cbuf(bt + 131072);
        var end = bt + add;
        if (bt < dt) {
          var shift = dl - dt, dend = Math.min(dt, end);
          if (shift + bt < 0)
            err(3);
          for (; bt < dend; ++bt)
            buf[bt] = dict[shift + bt];
        }
        for (; bt < end; ++bt)
          buf[bt] = buf[bt - dt];
      }
    }
    st.l = lm, st.p = lpos, st.b = bt, st.f = final;
    if (lm)
      final = 1, st.m = lbt, st.d = dm, st.n = dbt;
  } while (!final);
  return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
};
var et = /* @__PURE__ */ new u8(0);
var mrg = function(a, b) {
  var o = {};
  for (var k in a)
    o[k] = a[k];
  for (var k in b)
    o[k] = b[k];
  return o;
};
var wcln = function(fn, fnStr, td2) {
  var dt = fn();
  var st = fn.toString();
  var ks = st.slice(st.indexOf("[") + 1, st.lastIndexOf("]")).replace(/\s+/g, "").split(",");
  for (var i = 0; i < dt.length; ++i) {
    var v = dt[i], k = ks[i];
    if (typeof v == "function") {
      fnStr += ";" + k + "=";
      var st_1 = v.toString();
      if (v.prototype) {
        if (st_1.indexOf("[native code]") != -1) {
          var spInd = st_1.indexOf(" ", 8) + 1;
          fnStr += st_1.slice(spInd, st_1.indexOf("(", spInd));
        } else {
          fnStr += st_1;
          for (var t in v.prototype)
            fnStr += ";" + k + ".prototype." + t + "=" + v.prototype[t].toString();
        }
      } else
        fnStr += st_1;
    } else
      td2[k] = v;
  }
  return fnStr;
};
var ch = [];
var cbfs = function(v) {
  var tl = [];
  for (var k in v) {
    if (v[k].buffer) {
      tl.push((v[k] = new v[k].constructor(v[k])).buffer);
    }
  }
  return tl;
};
var wrkr = function(fns, init, id, cb) {
  if (!ch[id]) {
    var fnStr = "", td_1 = {}, m = fns.length - 1;
    for (var i = 0; i < m; ++i)
      fnStr = wcln(fns[i], fnStr, td_1);
    ch[id] = { c: wcln(fns[m], fnStr, td_1), e: td_1 };
  }
  var td2 = mrg({}, ch[id].e);
  return wk(ch[id].c + ";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=" + init.toString() + "}", id, td2, cbfs(td2), cb);
};
var bInflt = function() {
  return [u8, u16, i32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gopt];
};
var pbf = function(msg) {
  return postMessage(msg, [msg.buffer]);
};
var gopt = function(o) {
  return o && {
    out: o.size && new u8(o.size),
    dictionary: o.dictionary
  };
};
var cbify = function(dat, opts, fns, init, id, cb) {
  var w = wrkr(fns, init, id, function(err3, dat2) {
    w.terminate();
    cb(err3, dat2);
  });
  w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
  return function() {
    w.terminate();
  };
};
var b2 = function(d, b) {
  return d[b] | d[b + 1] << 8;
};
var b4 = function(d, b) {
  return (d[b] | d[b + 1] << 8 | d[b + 2] << 16 | d[b + 3] << 24) >>> 0;
};
var b8 = function(d, b) {
  return b4(d, b) + b4(d, b + 4) * 4294967296;
};
function inflate(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bInflt
  ], function(ev) {
    return pbf(inflateSync(ev.data[0], gopt(ev.data[1])));
  }, 1, cb);
}
function inflateSync(data, opts) {
  return inflt(data, { i: 2 }, opts && opts.out, opts && opts.dictionary);
}
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
var dutf8 = function(d) {
  for (var r = "", i = 0; ; ) {
    var c = d[i++];
    var eb = (c > 127) + (c > 223) + (c > 239);
    if (i + eb > d.length)
      return { s: r, r: slc(d, i - 1) };
    if (!eb)
      r += String.fromCharCode(c);
    else if (eb == 3) {
      c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | d[i++] & 63) - 65536, r += String.fromCharCode(55296 | c >> 10, 56320 | c & 1023);
    } else if (eb & 1)
      r += String.fromCharCode((c & 31) << 6 | d[i++] & 63);
    else
      r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | d[i++] & 63);
  }
};
function strFromU8(dat, latin1) {
  if (latin1) {
    var r = "";
    for (var i = 0; i < dat.length; i += 16384)
      r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
    return r;
  } else if (td) {
    return td.decode(dat);
  } else {
    var _a2 = dutf8(dat), s = _a2.s, r = _a2.r;
    if (r.length)
      err(8);
    return s;
  }
}
var slzh = function(d, b) {
  return b + 30 + b2(d, b + 26) + b2(d, b + 28);
};
var zh = function(d, b, z) {
  var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
  var _a2 = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a2[0], su = _a2[1], off = _a2[2];
  return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
};
var z64e = function(d, b) {
  for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
    ;
  return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
};
var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
  fn();
};
function unzip(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  var term = [];
  var tAll = function() {
    for (var i2 = 0; i2 < term.length; ++i2)
      term[i2]();
  };
  var files = {};
  var cbd = function(a, b) {
    mt(function() {
      cb(a, b);
    });
  };
  mt(function() {
    cbd = cb;
  });
  var e = data.length - 22;
  for (; b4(data, e) != 101010256; --e) {
    if (!e || data.length - e > 65558) {
      cbd(err(13, 0, 1), null);
      return tAll;
    }
  }
  ;
  var lft = b2(data, e + 8);
  if (lft) {
    var c = lft;
    var o = b4(data, e + 16);
    var z = o == 4294967295 || c == 65535;
    if (z) {
      var ze = b4(data, e - 12);
      z = b4(data, ze) == 101075792;
      if (z) {
        c = lft = b4(data, ze + 32);
        o = b4(data, ze + 48);
      }
    }
    var fltr = opts && opts.filter;
    var _loop_3 = function(i2) {
      var _a2 = zh(data, o, z), c_1 = _a2[0], sc = _a2[1], su = _a2[2], fn = _a2[3], no = _a2[4], off = _a2[5], b = slzh(data, off);
      o = no;
      var cbl = function(e2, d) {
        if (e2) {
          tAll();
          cbd(e2, null);
        } else {
          if (d)
            files[fn] = d;
          if (!--lft)
            cbd(null, files);
        }
      };
      if (!fltr || fltr({
        name: fn,
        size: sc,
        originalSize: su,
        compression: c_1
      })) {
        if (!c_1)
          cbl(null, slc(data, b, b + sc));
        else if (c_1 == 8) {
          var infl = data.subarray(b, b + sc);
          if (su < 524288 || sc > 0.8 * su) {
            try {
              cbl(null, inflateSync(infl, { out: new u8(su) }));
            } catch (e2) {
              cbl(e2, null);
            }
          } else
            term.push(inflate(infl, { size: su }, cbl));
        } else
          cbl(err(14, "unknown compression type " + c_1, 1), null);
      } else
        cbl(null, null);
    };
    for (var i = 0; i < c; ++i) {
      _loop_3(i);
    }
  } else
    cbd(null, {});
  return tAll;
}

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
    return __asyncGenerator(this, arguments, function* _a2() {
      const result = yield __await(this._promise);
      if (result.isErr()) {
        yield yield __await(errAsync(result.error));
      }
      return yield __await(result.value);
    });
  }
};
var okAsync = (value) => new ResultAsync(Promise.resolve(new Ok(value)));
var errAsync = (err3) => new ResultAsync(Promise.resolve(new Err(err3)));
var fromPromise = ResultAsync.fromPromise;
var fromSafePromise = ResultAsync.fromSafePromise;
var fromAsyncThrowable = ResultAsync.fromThrowable;
var combineResultList = (resultList) => {
  let acc = ok([]);
  for (const result of resultList) {
    if (result.isErr()) {
      acc = err2(result.error);
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
      acc = err2([result.error]);
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
        return err2(errorFn ? errorFn(e) : e);
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
function err2(err3) {
  return new Err(err3);
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
    return err2(this.error);
  }
  mapErr(f) {
    return err2(f(this.error));
  }
  andThrough(_f) {
    return err2(this.error);
  }
  andTee(_f) {
    return err2(this.error);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
  andThen(_f) {
    return err2(this.error);
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
  match(_ok, err3) {
    return err3(this.error);
  }
  safeUnwrap() {
    const error = this.error;
    return function* () {
      yield err2(error);
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

// src/worker/decompress.ts
self.onmessage = (event) => {
  decompress(event.data).map(() => {
    self.postMessage({ event: "ARCHIVE_DECOMPRESSED" /* ARCHIVE_DECOMPRESSED */ });
  }).mapErr((error) => {
    self.postMessage({ event: "OPERATION_FAILED" /* OPERATION_FAILED */, error });
  });
};
var decompress = (workerMessage) => {
  const { archive } = workerMessage.args;
  if (archive !== void 0) {
    const unzipPromise = async () => {
      if (archive.file) {
        const fileBytes = await archive.file.bytes();
        return new Promise((resolve, reject) => {
          unzip(fileBytes, (error, files) => {
            if (error) reject(error);
            resolve(files);
          });
        });
      } else {
        return Promise.reject(
          new WorkerUndefinedParameterError("archive.file must be defined")
        );
      }
    };
    return ResultAsync.fromPromise(unzipPromise(), (error) => error).andThen((files) => {
      try {
        for (const path in files) {
          self.postMessage({
            event: "ARCHIVE_RETRIEVED_FILE" /* ARCHIVE_RETRIEVED_FILE */,
            file: { buffer: files[path].buffer, path }
          }, [files[path].buffer]);
        }
        return okAsync(void 0);
      } catch (error) {
        return errAsync(error);
      }
    }).orElse(
      (error) => errAsync(
        new ZipDecompressionError(void 0, { cause: ensureError(error) })
      )
    );
  } else {
    return errAsync(
      new WorkerUndefinedParameterError("archive must be defined")
    );
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2Vycm9yL2Jhc2UtZXJyb3IudHMiLCAiLi4vLi4vc3JjL2Vycm9yL3ppcC96aXAtZXJyb3IudHMiLCAiLi4vLi4vc3JjL2Vycm9yL3ppcC96aXAtZGVjb21wcmVzc2lvbi1lcnJvci50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vZmZsYXRlQDAuOC4yL25vZGVfbW9kdWxlcy9mZmxhdGUvZXNtL2Jyb3dzZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL25ldmVydGhyb3dAOC4xLjEvbm9kZV9tb2R1bGVzL25ldmVydGhyb3cvZGlzdC9pbmRleC5lcy5qcyIsICIuLi8uLi9zcmMvZXJyb3Ivd29ya2VyL3dvcmtlci1lcnJvci50cyIsICIuLi8uLi9zcmMvZXJyb3Ivd29ya2VyL3dvcmtlci11bmRlZmluZWQtcGFyYW1ldGVyLWVycm9yLnRzIiwgIi4uLy4uL3NyYy91dGlscy50cyIsICIuLi8uLi9zcmMvd29ya2VyL2RlY29tcHJlc3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbInR5cGUgSnNvbmFibGUgPVxuICB8IHN0cmluZ1xuICB8IG51bWJlclxuICB8IGJvb2xlYW5cbiAgfCBudWxsXG4gIHwgdW5kZWZpbmVkXG4gIHwgcmVhZG9ubHkgSnNvbmFibGVbXVxuICB8IHsgcmVhZG9ubHkgW2tleTogc3RyaW5nXTogSnNvbmFibGUgfVxuICB8IHsgdG9KU09OKCk6IEpzb25hYmxlIH07XG5cbmV4cG9ydCBjbGFzcyBCYXNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHB1YmxpYyByZWFkb25seSBjb250ZXh0PzogSnNvbmFibGU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgbWVzc2FnZT86IHN0cmluZyxcbiAgICBvcHRpb25zOiB7IGNhdXNlPzogRXJyb3I7IGNvbnRleHQ/OiBKc29uYWJsZSB9ID0ge30sXG4gICkge1xuICAgIGNvbnN0IHsgY2F1c2UsIGNvbnRleHQgfSA9IG9wdGlvbnM7XG5cbiAgICBzdXBlcihtZXNzYWdlLCB7IGNhdXNlIH0pO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcblxuICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwifi9lcnJvci9iYXNlLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBaaXBFcnJvciBleHRlbmRzIEJhc2VFcnJvciB7fVxuIiwgImltcG9ydCB7IFppcEVycm9yIH0gZnJvbSBcIn4vZXJyb3IvemlwL3ppcC1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgWmlwRGVjb21wcmVzc2lvbkVycm9yIGV4dGVuZHMgWmlwRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlID0gXCJBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBkZWNvbXByZXNzIHRoZSBkYXRhXCI7XG59XG4iLCAiLy8gREVGTEFURSBpcyBhIGNvbXBsZXggZm9ybWF0OyB0byByZWFkIHRoaXMgY29kZSwgeW91IHNob3VsZCBwcm9iYWJseSBjaGVjayB0aGUgUkZDIGZpcnN0OlxuLy8gaHR0cHM6Ly90b29scy5pZXRmLm9yZy9odG1sL3JmYzE5NTFcbi8vIFlvdSBtYXkgYWxzbyB3aXNoIHRvIHRha2UgYSBsb29rIGF0IHRoZSBndWlkZSBJIG1hZGUgYWJvdXQgdGhpcyBwcm9ncmFtOlxuLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vMTAxYXJyb3d6LzI1M2YzMWViNWFiYzNkOTI3NWFiOTQzMDAzZmZlY2FkXG4vLyBTb21lIG9mIHRoZSBmb2xsb3dpbmcgY29kZSBpcyBzaW1pbGFyIHRvIHRoYXQgb2YgVVpJUC5qczpcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9waG90b3BlYS9VWklQLmpzXG4vLyBIb3dldmVyLCB0aGUgdmFzdCBtYWpvcml0eSBvZiB0aGUgY29kZWJhc2UgaGFzIGRpdmVyZ2VkIGZyb20gVVpJUC5qcyB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZSBhbmQgcmVkdWNlIGJ1bmRsZSBzaXplLlxuLy8gU29tZXRpbWVzIDAgd2lsbCBhcHBlYXIgd2hlcmUgLTEgd291bGQgYmUgbW9yZSBhcHByb3ByaWF0ZS4gVGhpcyBpcyBiZWNhdXNlIHVzaW5nIGEgdWludFxuLy8gaXMgYmV0dGVyIGZvciBtZW1vcnkgaW4gbW9zdCBlbmdpbmVzIChJICp0aGluayopLlxudmFyIGNoMiA9IHt9O1xudmFyIHdrID0gKGZ1bmN0aW9uIChjLCBpZCwgbXNnLCB0cmFuc2ZlciwgY2IpIHtcbiAgICB2YXIgdyA9IG5ldyBXb3JrZXIoY2gyW2lkXSB8fCAoY2gyW2lkXSA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW1xuICAgICAgICBjICsgJzthZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixmdW5jdGlvbihlKXtlPWUuZXJyb3I7cG9zdE1lc3NhZ2UoeyRlJDpbZS5tZXNzYWdlLGUuY29kZSxlLnN0YWNrXX0pfSknXG4gICAgXSwgeyB0eXBlOiAndGV4dC9qYXZhc2NyaXB0JyB9KSkpKTtcbiAgICB3Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBkID0gZS5kYXRhLCBlZCA9IGQuJGUkO1xuICAgICAgICBpZiAoZWQpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoZWRbMF0pO1xuICAgICAgICAgICAgZXJyWydjb2RlJ10gPSBlZFsxXTtcbiAgICAgICAgICAgIGVyci5zdGFjayA9IGVkWzJdO1xuICAgICAgICAgICAgY2IoZXJyLCBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjYihudWxsLCBkKTtcbiAgICB9O1xuICAgIHcucG9zdE1lc3NhZ2UobXNnLCB0cmFuc2Zlcik7XG4gICAgcmV0dXJuIHc7XG59KTtcblxuLy8gYWxpYXNlcyBmb3Igc2hvcnRlciBjb21wcmVzc2VkIGNvZGUgKG1vc3QgbWluaWZlcnMgZG9uJ3QgZG8gdGhpcylcbnZhciB1OCA9IFVpbnQ4QXJyYXksIHUxNiA9IFVpbnQxNkFycmF5LCBpMzIgPSBJbnQzMkFycmF5O1xuLy8gZml4ZWQgbGVuZ3RoIGV4dHJhIGJpdHNcbnZhciBmbGViID0gbmV3IHU4KFswLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLCAzLCAzLCAzLCAzLCA0LCA0LCA0LCA0LCA1LCA1LCA1LCA1LCAwLCAvKiB1bnVzZWQgKi8gMCwgMCwgLyogaW1wb3NzaWJsZSAqLyAwXSk7XG4vLyBmaXhlZCBkaXN0YW5jZSBleHRyYSBiaXRzXG52YXIgZmRlYiA9IG5ldyB1OChbMCwgMCwgMCwgMCwgMSwgMSwgMiwgMiwgMywgMywgNCwgNCwgNSwgNSwgNiwgNiwgNywgNywgOCwgOCwgOSwgOSwgMTAsIDEwLCAxMSwgMTEsIDEyLCAxMiwgMTMsIDEzLCAvKiB1bnVzZWQgKi8gMCwgMF0pO1xuLy8gY29kZSBsZW5ndGggaW5kZXggbWFwXG52YXIgY2xpbSA9IG5ldyB1OChbMTYsIDE3LCAxOCwgMCwgOCwgNywgOSwgNiwgMTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsIDE0LCAxLCAxNV0pO1xuLy8gZ2V0IGJhc2UsIHJldmVyc2UgaW5kZXggbWFwIGZyb20gZXh0cmEgYml0c1xudmFyIGZyZWIgPSBmdW5jdGlvbiAoZWIsIHN0YXJ0KSB7XG4gICAgdmFyIGIgPSBuZXcgdTE2KDMxKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMxOyArK2kpIHtcbiAgICAgICAgYltpXSA9IHN0YXJ0ICs9IDEgPDwgZWJbaSAtIDFdO1xuICAgIH1cbiAgICAvLyBudW1iZXJzIGhlcmUgYXJlIGF0IG1heCAxOCBiaXRzXG4gICAgdmFyIHIgPSBuZXcgaTMyKGJbMzBdKTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDMwOyArK2kpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IGJbaV07IGogPCBiW2kgKyAxXTsgKytqKSB7XG4gICAgICAgICAgICByW2pdID0gKChqIC0gYltpXSkgPDwgNSkgfCBpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7IGI6IGIsIHI6IHIgfTtcbn07XG52YXIgX2EgPSBmcmViKGZsZWIsIDIpLCBmbCA9IF9hLmIsIHJldmZsID0gX2Eucjtcbi8vIHdlIGNhbiBpZ25vcmUgdGhlIGZhY3QgdGhhdCB0aGUgb3RoZXIgbnVtYmVycyBhcmUgd3Jvbmc7IHRoZXkgbmV2ZXIgaGFwcGVuIGFueXdheVxuZmxbMjhdID0gMjU4LCByZXZmbFsyNThdID0gMjg7XG52YXIgX2IgPSBmcmViKGZkZWIsIDApLCBmZCA9IF9iLmIsIHJldmZkID0gX2Iucjtcbi8vIG1hcCBvZiB2YWx1ZSB0byByZXZlcnNlIChhc3N1bWluZyAxNiBiaXRzKVxudmFyIHJldiA9IG5ldyB1MTYoMzI3NjgpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAzMjc2ODsgKytpKSB7XG4gICAgLy8gcmV2ZXJzZSB0YWJsZSBhbGdvcml0aG0gZnJvbSBTT1xuICAgIHZhciB4ID0gKChpICYgMHhBQUFBKSA+PiAxKSB8ICgoaSAmIDB4NTU1NSkgPDwgMSk7XG4gICAgeCA9ICgoeCAmIDB4Q0NDQykgPj4gMikgfCAoKHggJiAweDMzMzMpIDw8IDIpO1xuICAgIHggPSAoKHggJiAweEYwRjApID4+IDQpIHwgKCh4ICYgMHgwRjBGKSA8PCA0KTtcbiAgICByZXZbaV0gPSAoKCh4ICYgMHhGRjAwKSA+PiA4KSB8ICgoeCAmIDB4MDBGRikgPDwgOCkpID4+IDE7XG59XG4vLyBjcmVhdGUgaHVmZm1hbiB0cmVlIGZyb20gdTggXCJtYXBcIjogaW5kZXggLT4gY29kZSBsZW5ndGggZm9yIGNvZGUgaW5kZXhcbi8vIG1iIChtYXggYml0cykgbXVzdCBiZSBhdCBtb3N0IDE1XG4vLyBUT0RPOiBvcHRpbWl6ZS9zcGxpdCB1cD9cbnZhciBoTWFwID0gKGZ1bmN0aW9uIChjZCwgbWIsIHIpIHtcbiAgICB2YXIgcyA9IGNkLmxlbmd0aDtcbiAgICAvLyBpbmRleFxuICAgIHZhciBpID0gMDtcbiAgICAvLyB1MTYgXCJtYXBcIjogaW5kZXggLT4gIyBvZiBjb2RlcyB3aXRoIGJpdCBsZW5ndGggPSBpbmRleFxuICAgIHZhciBsID0gbmV3IHUxNihtYik7XG4gICAgLy8gbGVuZ3RoIG9mIGNkIG11c3QgYmUgMjg4ICh0b3RhbCAjIG9mIGNvZGVzKVxuICAgIGZvciAoOyBpIDwgczsgKytpKSB7XG4gICAgICAgIGlmIChjZFtpXSlcbiAgICAgICAgICAgICsrbFtjZFtpXSAtIDFdO1xuICAgIH1cbiAgICAvLyB1MTYgXCJtYXBcIjogaW5kZXggLT4gbWluaW11bSBjb2RlIGZvciBiaXQgbGVuZ3RoID0gaW5kZXhcbiAgICB2YXIgbGUgPSBuZXcgdTE2KG1iKTtcbiAgICBmb3IgKGkgPSAxOyBpIDwgbWI7ICsraSkge1xuICAgICAgICBsZVtpXSA9IChsZVtpIC0gMV0gKyBsW2kgLSAxXSkgPDwgMTtcbiAgICB9XG4gICAgdmFyIGNvO1xuICAgIGlmIChyKSB7XG4gICAgICAgIC8vIHUxNiBcIm1hcFwiOiBpbmRleCAtPiBudW1iZXIgb2YgYWN0dWFsIGJpdHMsIHN5bWJvbCBmb3IgY29kZVxuICAgICAgICBjbyA9IG5ldyB1MTYoMSA8PCBtYik7XG4gICAgICAgIC8vIGJpdHMgdG8gcmVtb3ZlIGZvciByZXZlcnNlclxuICAgICAgICB2YXIgcnZiID0gMTUgLSBtYjtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHM7ICsraSkge1xuICAgICAgICAgICAgLy8gaWdub3JlIDAgbGVuZ3Roc1xuICAgICAgICAgICAgaWYgKGNkW2ldKSB7XG4gICAgICAgICAgICAgICAgLy8gbnVtIGVuY29kaW5nIGJvdGggc3ltYm9sIGFuZCBiaXRzIHJlYWRcbiAgICAgICAgICAgICAgICB2YXIgc3YgPSAoaSA8PCA0KSB8IGNkW2ldO1xuICAgICAgICAgICAgICAgIC8vIGZyZWUgYml0c1xuICAgICAgICAgICAgICAgIHZhciByXzEgPSBtYiAtIGNkW2ldO1xuICAgICAgICAgICAgICAgIC8vIHN0YXJ0IHZhbHVlXG4gICAgICAgICAgICAgICAgdmFyIHYgPSBsZVtjZFtpXSAtIDFdKysgPDwgcl8xO1xuICAgICAgICAgICAgICAgIC8vIG0gaXMgZW5kIHZhbHVlXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbSA9IHYgfCAoKDEgPDwgcl8xKSAtIDEpOyB2IDw9IG07ICsrdikge1xuICAgICAgICAgICAgICAgICAgICAvLyBldmVyeSAxNiBiaXQgdmFsdWUgc3RhcnRpbmcgd2l0aCB0aGUgY29kZSB5aWVsZHMgdGhlIHNhbWUgcmVzdWx0XG4gICAgICAgICAgICAgICAgICAgIGNvW3Jldlt2XSA+PiBydmJdID0gc3Y7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjbyA9IG5ldyB1MTYocyk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChjZFtpXSkge1xuICAgICAgICAgICAgICAgIGNvW2ldID0gcmV2W2xlW2NkW2ldIC0gMV0rK10gPj4gKDE1IC0gY2RbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjbztcbn0pO1xuLy8gZml4ZWQgbGVuZ3RoIHRyZWVcbnZhciBmbHQgPSBuZXcgdTgoMjg4KTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMTQ0OyArK2kpXG4gICAgZmx0W2ldID0gODtcbmZvciAodmFyIGkgPSAxNDQ7IGkgPCAyNTY7ICsraSlcbiAgICBmbHRbaV0gPSA5O1xuZm9yICh2YXIgaSA9IDI1NjsgaSA8IDI4MDsgKytpKVxuICAgIGZsdFtpXSA9IDc7XG5mb3IgKHZhciBpID0gMjgwOyBpIDwgMjg4OyArK2kpXG4gICAgZmx0W2ldID0gODtcbi8vIGZpeGVkIGRpc3RhbmNlIHRyZWVcbnZhciBmZHQgPSBuZXcgdTgoMzIpO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAzMjsgKytpKVxuICAgIGZkdFtpXSA9IDU7XG4vLyBmaXhlZCBsZW5ndGggbWFwXG52YXIgZmxtID0gLyojX19QVVJFX18qLyBoTWFwKGZsdCwgOSwgMCksIGZscm0gPSAvKiNfX1BVUkVfXyovIGhNYXAoZmx0LCA5LCAxKTtcbi8vIGZpeGVkIGRpc3RhbmNlIG1hcFxudmFyIGZkbSA9IC8qI19fUFVSRV9fKi8gaE1hcChmZHQsIDUsIDApLCBmZHJtID0gLyojX19QVVJFX18qLyBoTWFwKGZkdCwgNSwgMSk7XG4vLyBmaW5kIG1heCBvZiBhcnJheVxudmFyIG1heCA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIG0gPSBhWzBdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoYVtpXSA+IG0pXG4gICAgICAgICAgICBtID0gYVtpXTtcbiAgICB9XG4gICAgcmV0dXJuIG07XG59O1xuLy8gcmVhZCBkLCBzdGFydGluZyBhdCBiaXQgcCBhbmQgbWFzayB3aXRoIG1cbnZhciBiaXRzID0gZnVuY3Rpb24gKGQsIHAsIG0pIHtcbiAgICB2YXIgbyA9IChwIC8gOCkgfCAwO1xuICAgIHJldHVybiAoKGRbb10gfCAoZFtvICsgMV0gPDwgOCkpID4+IChwICYgNykpICYgbTtcbn07XG4vLyByZWFkIGQsIHN0YXJ0aW5nIGF0IGJpdCBwIGNvbnRpbnVpbmcgZm9yIGF0IGxlYXN0IDE2IGJpdHNcbnZhciBiaXRzMTYgPSBmdW5jdGlvbiAoZCwgcCkge1xuICAgIHZhciBvID0gKHAgLyA4KSB8IDA7XG4gICAgcmV0dXJuICgoZFtvXSB8IChkW28gKyAxXSA8PCA4KSB8IChkW28gKyAyXSA8PCAxNikpID4+IChwICYgNykpO1xufTtcbi8vIGdldCBlbmQgb2YgYnl0ZVxudmFyIHNoZnQgPSBmdW5jdGlvbiAocCkgeyByZXR1cm4gKChwICsgNykgLyA4KSB8IDA7IH07XG4vLyB0eXBlZCBhcnJheSBzbGljZSAtIGFsbG93cyBnYXJiYWdlIGNvbGxlY3RvciB0byBmcmVlIG9yaWdpbmFsIHJlZmVyZW5jZSxcbi8vIHdoaWxlIGJlaW5nIG1vcmUgY29tcGF0aWJsZSB0aGFuIC5zbGljZVxudmFyIHNsYyA9IGZ1bmN0aW9uICh2LCBzLCBlKSB7XG4gICAgaWYgKHMgPT0gbnVsbCB8fCBzIDwgMClcbiAgICAgICAgcyA9IDA7XG4gICAgaWYgKGUgPT0gbnVsbCB8fCBlID4gdi5sZW5ndGgpXG4gICAgICAgIGUgPSB2Lmxlbmd0aDtcbiAgICAvLyBjYW4ndCB1c2UgLmNvbnN0cnVjdG9yIGluIGNhc2UgdXNlci1zdXBwbGllZFxuICAgIHJldHVybiBuZXcgdTgodi5zdWJhcnJheShzLCBlKSk7XG59O1xuLyoqXG4gKiBDb2RlcyBmb3IgZXJyb3JzIGdlbmVyYXRlZCB3aXRoaW4gdGhpcyBsaWJyYXJ5XG4gKi9cbmV4cG9ydCB2YXIgRmxhdGVFcnJvckNvZGUgPSB7XG4gICAgVW5leHBlY3RlZEVPRjogMCxcbiAgICBJbnZhbGlkQmxvY2tUeXBlOiAxLFxuICAgIEludmFsaWRMZW5ndGhMaXRlcmFsOiAyLFxuICAgIEludmFsaWREaXN0YW5jZTogMyxcbiAgICBTdHJlYW1GaW5pc2hlZDogNCxcbiAgICBOb1N0cmVhbUhhbmRsZXI6IDUsXG4gICAgSW52YWxpZEhlYWRlcjogNixcbiAgICBOb0NhbGxiYWNrOiA3LFxuICAgIEludmFsaWRVVEY4OiA4LFxuICAgIEV4dHJhRmllbGRUb29Mb25nOiA5LFxuICAgIEludmFsaWREYXRlOiAxMCxcbiAgICBGaWxlbmFtZVRvb0xvbmc6IDExLFxuICAgIFN0cmVhbUZpbmlzaGluZzogMTIsXG4gICAgSW52YWxpZFppcERhdGE6IDEzLFxuICAgIFVua25vd25Db21wcmVzc2lvbk1ldGhvZDogMTRcbn07XG4vLyBlcnJvciBjb2Rlc1xudmFyIGVjID0gW1xuICAgICd1bmV4cGVjdGVkIEVPRicsXG4gICAgJ2ludmFsaWQgYmxvY2sgdHlwZScsXG4gICAgJ2ludmFsaWQgbGVuZ3RoL2xpdGVyYWwnLFxuICAgICdpbnZhbGlkIGRpc3RhbmNlJyxcbiAgICAnc3RyZWFtIGZpbmlzaGVkJyxcbiAgICAnbm8gc3RyZWFtIGhhbmRsZXInLFxuICAgICxcbiAgICAnbm8gY2FsbGJhY2snLFxuICAgICdpbnZhbGlkIFVURi04IGRhdGEnLFxuICAgICdleHRyYSBmaWVsZCB0b28gbG9uZycsXG4gICAgJ2RhdGUgbm90IGluIHJhbmdlIDE5ODAtMjA5OScsXG4gICAgJ2ZpbGVuYW1lIHRvbyBsb25nJyxcbiAgICAnc3RyZWFtIGZpbmlzaGluZycsXG4gICAgJ2ludmFsaWQgemlwIGRhdGEnXG4gICAgLy8gZGV0ZXJtaW5lZCBieSB1bmtub3duIGNvbXByZXNzaW9uIG1ldGhvZFxuXTtcbjtcbnZhciBlcnIgPSBmdW5jdGlvbiAoaW5kLCBtc2csIG50KSB7XG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobXNnIHx8IGVjW2luZF0pO1xuICAgIGUuY29kZSA9IGluZDtcbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpXG4gICAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKGUsIGVycik7XG4gICAgaWYgKCFudClcbiAgICAgICAgdGhyb3cgZTtcbiAgICByZXR1cm4gZTtcbn07XG4vLyBleHBhbmRzIHJhdyBERUZMQVRFIGRhdGFcbnZhciBpbmZsdCA9IGZ1bmN0aW9uIChkYXQsIHN0LCBidWYsIGRpY3QpIHtcbiAgICAvLyBzb3VyY2UgbGVuZ3RoICAgICAgIGRpY3QgbGVuZ3RoXG4gICAgdmFyIHNsID0gZGF0Lmxlbmd0aCwgZGwgPSBkaWN0ID8gZGljdC5sZW5ndGggOiAwO1xuICAgIGlmICghc2wgfHwgc3QuZiAmJiAhc3QubClcbiAgICAgICAgcmV0dXJuIGJ1ZiB8fCBuZXcgdTgoMCk7XG4gICAgdmFyIG5vQnVmID0gIWJ1ZjtcbiAgICAvLyBoYXZlIHRvIGVzdGltYXRlIHNpemVcbiAgICB2YXIgcmVzaXplID0gbm9CdWYgfHwgc3QuaSAhPSAyO1xuICAgIC8vIG5vIHN0YXRlXG4gICAgdmFyIG5vU3QgPSBzdC5pO1xuICAgIC8vIEFzc3VtZXMgcm91Z2hseSAzMyUgY29tcHJlc3Npb24gcmF0aW8gYXZlcmFnZVxuICAgIGlmIChub0J1ZilcbiAgICAgICAgYnVmID0gbmV3IHU4KHNsICogMyk7XG4gICAgLy8gZW5zdXJlIGJ1ZmZlciBjYW4gZml0IGF0IGxlYXN0IGwgZWxlbWVudHNcbiAgICB2YXIgY2J1ZiA9IGZ1bmN0aW9uIChsKSB7XG4gICAgICAgIHZhciBibCA9IGJ1Zi5sZW5ndGg7XG4gICAgICAgIC8vIG5lZWQgdG8gaW5jcmVhc2Ugc2l6ZSB0byBmaXRcbiAgICAgICAgaWYgKGwgPiBibCkge1xuICAgICAgICAgICAgLy8gRG91YmxlIG9yIHNldCB0byBuZWNlc3NhcnksIHdoaWNoZXZlciBpcyBncmVhdGVyXG4gICAgICAgICAgICB2YXIgbmJ1ZiA9IG5ldyB1OChNYXRoLm1heChibCAqIDIsIGwpKTtcbiAgICAgICAgICAgIG5idWYuc2V0KGJ1Zik7XG4gICAgICAgICAgICBidWYgPSBuYnVmO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyAgbGFzdCBjaHVuayAgICAgICAgIGJpdHBvcyAgICAgICAgICAgYnl0ZXNcbiAgICB2YXIgZmluYWwgPSBzdC5mIHx8IDAsIHBvcyA9IHN0LnAgfHwgMCwgYnQgPSBzdC5iIHx8IDAsIGxtID0gc3QubCwgZG0gPSBzdC5kLCBsYnQgPSBzdC5tLCBkYnQgPSBzdC5uO1xuICAgIC8vIHRvdGFsIGJpdHNcbiAgICB2YXIgdGJ0cyA9IHNsICogODtcbiAgICBkbyB7XG4gICAgICAgIGlmICghbG0pIHtcbiAgICAgICAgICAgIC8vIEJGSU5BTCAtIHRoaXMgaXMgb25seSAxIHdoZW4gbGFzdCBjaHVuayBpcyBuZXh0XG4gICAgICAgICAgICBmaW5hbCA9IGJpdHMoZGF0LCBwb3MsIDEpO1xuICAgICAgICAgICAgLy8gdHlwZTogMCA9IG5vIGNvbXByZXNzaW9uLCAxID0gZml4ZWQgaHVmZm1hbiwgMiA9IGR5bmFtaWMgaHVmZm1hblxuICAgICAgICAgICAgdmFyIHR5cGUgPSBiaXRzKGRhdCwgcG9zICsgMSwgMyk7XG4gICAgICAgICAgICBwb3MgKz0gMztcbiAgICAgICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgICAgICAgIC8vIGdvIHRvIGVuZCBvZiBieXRlIGJvdW5kYXJ5XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBzaGZ0KHBvcykgKyA0LCBsID0gZGF0W3MgLSA0XSB8IChkYXRbcyAtIDNdIDw8IDgpLCB0ID0gcyArIGw7XG4gICAgICAgICAgICAgICAgaWYgKHQgPiBzbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobm9TdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycigwKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBzaXplXG4gICAgICAgICAgICAgICAgaWYgKHJlc2l6ZSlcbiAgICAgICAgICAgICAgICAgICAgY2J1ZihidCArIGwpO1xuICAgICAgICAgICAgICAgIC8vIENvcHkgb3ZlciB1bmNvbXByZXNzZWQgZGF0YVxuICAgICAgICAgICAgICAgIGJ1Zi5zZXQoZGF0LnN1YmFycmF5KHMsIHQpLCBidCk7XG4gICAgICAgICAgICAgICAgLy8gR2V0IG5ldyBiaXRwb3MsIHVwZGF0ZSBieXRlIGNvdW50XG4gICAgICAgICAgICAgICAgc3QuYiA9IGJ0ICs9IGwsIHN0LnAgPSBwb3MgPSB0ICogOCwgc3QuZiA9IGZpbmFsO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAxKVxuICAgICAgICAgICAgICAgIGxtID0gZmxybSwgZG0gPSBmZHJtLCBsYnQgPSA5LCBkYnQgPSA1O1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gIGxpdGVyYWwgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3Roc1xuICAgICAgICAgICAgICAgIHZhciBoTGl0ID0gYml0cyhkYXQsIHBvcywgMzEpICsgMjU3LCBoY0xlbiA9IGJpdHMoZGF0LCBwb3MgKyAxMCwgMTUpICsgNDtcbiAgICAgICAgICAgICAgICB2YXIgdGwgPSBoTGl0ICsgYml0cyhkYXQsIHBvcyArIDUsIDMxKSArIDE7XG4gICAgICAgICAgICAgICAgcG9zICs9IDE0O1xuICAgICAgICAgICAgICAgIC8vIGxlbmd0aCtkaXN0YW5jZSB0cmVlXG4gICAgICAgICAgICAgICAgdmFyIGxkdCA9IG5ldyB1OCh0bCk7XG4gICAgICAgICAgICAgICAgLy8gY29kZSBsZW5ndGggdHJlZVxuICAgICAgICAgICAgICAgIHZhciBjbHQgPSBuZXcgdTgoMTkpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGNMZW47ICsraSkge1xuICAgICAgICAgICAgICAgICAgICAvLyB1c2UgaW5kZXggbWFwIHRvIGdldCByZWFsIGNvZGVcbiAgICAgICAgICAgICAgICAgICAgY2x0W2NsaW1baV1dID0gYml0cyhkYXQsIHBvcyArIGkgKiAzLCA3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zICs9IGhjTGVuICogMztcbiAgICAgICAgICAgICAgICAvLyBjb2RlIGxlbmd0aHMgYml0c1xuICAgICAgICAgICAgICAgIHZhciBjbGIgPSBtYXgoY2x0KSwgY2xibXNrID0gKDEgPDwgY2xiKSAtIDE7XG4gICAgICAgICAgICAgICAgLy8gY29kZSBsZW5ndGhzIG1hcFxuICAgICAgICAgICAgICAgIHZhciBjbG0gPSBoTWFwKGNsdCwgY2xiLCAxKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRsOykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgciA9IGNsbVtiaXRzKGRhdCwgcG9zLCBjbGJtc2spXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gYml0cyByZWFkXG4gICAgICAgICAgICAgICAgICAgIHBvcyArPSByICYgMTU7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN5bWJvbFxuICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IHIgPj4gNDtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29kZSBsZW5ndGggdG8gY29weVxuICAgICAgICAgICAgICAgICAgICBpZiAocyA8IDE2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZHRbaSsrXSA9IHM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgY29weSAgIGNvdW50XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IDAsIG4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgPT0gMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IDMgKyBiaXRzKGRhdCwgcG9zLCAzKSwgcG9zICs9IDIsIGMgPSBsZHRbaSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocyA9PSAxNylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gMyArIGJpdHMoZGF0LCBwb3MsIDcpLCBwb3MgKz0gMztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMgPT0gMTgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IDExICsgYml0cyhkYXQsIHBvcywgMTI3KSwgcG9zICs9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobi0tKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxkdFtpKytdID0gYztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyAgICBsZW5ndGggdHJlZSAgICAgICAgICAgICAgICAgZGlzdGFuY2UgdHJlZVxuICAgICAgICAgICAgICAgIHZhciBsdCA9IGxkdC5zdWJhcnJheSgwLCBoTGl0KSwgZHQgPSBsZHQuc3ViYXJyYXkoaExpdCk7XG4gICAgICAgICAgICAgICAgLy8gbWF4IGxlbmd0aCBiaXRzXG4gICAgICAgICAgICAgICAgbGJ0ID0gbWF4KGx0KTtcbiAgICAgICAgICAgICAgICAvLyBtYXggZGlzdCBiaXRzXG4gICAgICAgICAgICAgICAgZGJ0ID0gbWF4KGR0KTtcbiAgICAgICAgICAgICAgICBsbSA9IGhNYXAobHQsIGxidCwgMSk7XG4gICAgICAgICAgICAgICAgZG0gPSBoTWFwKGR0LCBkYnQsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVycigxKTtcbiAgICAgICAgICAgIGlmIChwb3MgPiB0YnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgIGVycigwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGJ1ZmZlciBjYW4gaG9sZCB0aGlzICsgdGhlIGxhcmdlc3QgcG9zc2libGUgYWRkaXRpb25cbiAgICAgICAgLy8gTWF4aW11bSBjaHVuayBzaXplIChwcmFjdGljYWxseSwgdGhlb3JldGljYWxseSBpbmZpbml0ZSkgaXMgMl4xN1xuICAgICAgICBpZiAocmVzaXplKVxuICAgICAgICAgICAgY2J1ZihidCArIDEzMTA3Mik7XG4gICAgICAgIHZhciBsbXMgPSAoMSA8PCBsYnQpIC0gMSwgZG1zID0gKDEgPDwgZGJ0KSAtIDE7XG4gICAgICAgIHZhciBscG9zID0gcG9zO1xuICAgICAgICBmb3IgKDs7IGxwb3MgPSBwb3MpIHtcbiAgICAgICAgICAgIC8vIGJpdHMgcmVhZCwgY29kZVxuICAgICAgICAgICAgdmFyIGMgPSBsbVtiaXRzMTYoZGF0LCBwb3MpICYgbG1zXSwgc3ltID0gYyA+PiA0O1xuICAgICAgICAgICAgcG9zICs9IGMgJiAxNTtcbiAgICAgICAgICAgIGlmIChwb3MgPiB0YnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgIGVycigwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYylcbiAgICAgICAgICAgICAgICBlcnIoMik7XG4gICAgICAgICAgICBpZiAoc3ltIDwgMjU2KVxuICAgICAgICAgICAgICAgIGJ1ZltidCsrXSA9IHN5bTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHN5bSA9PSAyNTYpIHtcbiAgICAgICAgICAgICAgICBscG9zID0gcG9zLCBsbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgYWRkID0gc3ltIC0gMjU0O1xuICAgICAgICAgICAgICAgIC8vIG5vIGV4dHJhIGJpdHMgbmVlZGVkIGlmIGxlc3NcbiAgICAgICAgICAgICAgICBpZiAoc3ltID4gMjY0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGluZGV4XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gc3ltIC0gMjU3LCBiID0gZmxlYltpXTtcbiAgICAgICAgICAgICAgICAgICAgYWRkID0gYml0cyhkYXQsIHBvcywgKDEgPDwgYikgLSAxKSArIGZsW2ldO1xuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZGlzdFxuICAgICAgICAgICAgICAgIHZhciBkID0gZG1bYml0czE2KGRhdCwgcG9zKSAmIGRtc10sIGRzeW0gPSBkID4+IDQ7XG4gICAgICAgICAgICAgICAgaWYgKCFkKVxuICAgICAgICAgICAgICAgICAgICBlcnIoMyk7XG4gICAgICAgICAgICAgICAgcG9zICs9IGQgJiAxNTtcbiAgICAgICAgICAgICAgICB2YXIgZHQgPSBmZFtkc3ltXTtcbiAgICAgICAgICAgICAgICBpZiAoZHN5bSA+IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGIgPSBmZGViW2RzeW1dO1xuICAgICAgICAgICAgICAgICAgICBkdCArPSBiaXRzMTYoZGF0LCBwb3MpICYgKDEgPDwgYikgLSAxLCBwb3MgKz0gYjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBvcyA+IHRidHMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIoMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmVzaXplKVxuICAgICAgICAgICAgICAgICAgICBjYnVmKGJ0ICsgMTMxMDcyKTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kID0gYnQgKyBhZGQ7XG4gICAgICAgICAgICAgICAgaWYgKGJ0IDwgZHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNoaWZ0ID0gZGwgLSBkdCwgZGVuZCA9IE1hdGgubWluKGR0LCBlbmQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpZnQgKyBidCA8IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIoMyk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoOyBidCA8IGRlbmQ7ICsrYnQpXG4gICAgICAgICAgICAgICAgICAgICAgICBidWZbYnRdID0gZGljdFtzaGlmdCArIGJ0XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICg7IGJ0IDwgZW5kOyArK2J0KVxuICAgICAgICAgICAgICAgICAgICBidWZbYnRdID0gYnVmW2J0IC0gZHRdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0LmwgPSBsbSwgc3QucCA9IGxwb3MsIHN0LmIgPSBidCwgc3QuZiA9IGZpbmFsO1xuICAgICAgICBpZiAobG0pXG4gICAgICAgICAgICBmaW5hbCA9IDEsIHN0Lm0gPSBsYnQsIHN0LmQgPSBkbSwgc3QubiA9IGRidDtcbiAgICB9IHdoaWxlICghZmluYWwpO1xuICAgIC8vIGRvbid0IHJlYWxsb2NhdGUgZm9yIHN0cmVhbXMgb3IgdXNlciBidWZmZXJzXG4gICAgcmV0dXJuIGJ0ICE9IGJ1Zi5sZW5ndGggJiYgbm9CdWYgPyBzbGMoYnVmLCAwLCBidCkgOiBidWYuc3ViYXJyYXkoMCwgYnQpO1xufTtcbi8vIHN0YXJ0aW5nIGF0IHAsIHdyaXRlIHRoZSBtaW5pbXVtIG51bWJlciBvZiBiaXRzIHRoYXQgY2FuIGhvbGQgdiB0byBkXG52YXIgd2JpdHMgPSBmdW5jdGlvbiAoZCwgcCwgdikge1xuICAgIHYgPDw9IHAgJiA3O1xuICAgIHZhciBvID0gKHAgLyA4KSB8IDA7XG4gICAgZFtvXSB8PSB2O1xuICAgIGRbbyArIDFdIHw9IHYgPj4gODtcbn07XG4vLyBzdGFydGluZyBhdCBwLCB3cml0ZSB0aGUgbWluaW11bSBudW1iZXIgb2YgYml0cyAoPjgpIHRoYXQgY2FuIGhvbGQgdiB0byBkXG52YXIgd2JpdHMxNiA9IGZ1bmN0aW9uIChkLCBwLCB2KSB7XG4gICAgdiA8PD0gcCAmIDc7XG4gICAgdmFyIG8gPSAocCAvIDgpIHwgMDtcbiAgICBkW29dIHw9IHY7XG4gICAgZFtvICsgMV0gfD0gdiA+PiA4O1xuICAgIGRbbyArIDJdIHw9IHYgPj4gMTY7XG59O1xuLy8gY3JlYXRlcyBjb2RlIGxlbmd0aHMgZnJvbSBhIGZyZXF1ZW5jeSB0YWJsZVxudmFyIGhUcmVlID0gZnVuY3Rpb24gKGQsIG1iKSB7XG4gICAgLy8gTmVlZCBleHRyYSBpbmZvIHRvIG1ha2UgYSB0cmVlXG4gICAgdmFyIHQgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGQubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGRbaV0pXG4gICAgICAgICAgICB0LnB1c2goeyBzOiBpLCBmOiBkW2ldIH0pO1xuICAgIH1cbiAgICB2YXIgcyA9IHQubGVuZ3RoO1xuICAgIHZhciB0MiA9IHQuc2xpY2UoKTtcbiAgICBpZiAoIXMpXG4gICAgICAgIHJldHVybiB7IHQ6IGV0LCBsOiAwIH07XG4gICAgaWYgKHMgPT0gMSkge1xuICAgICAgICB2YXIgdiA9IG5ldyB1OCh0WzBdLnMgKyAxKTtcbiAgICAgICAgdlt0WzBdLnNdID0gMTtcbiAgICAgICAgcmV0dXJuIHsgdDogdiwgbDogMSB9O1xuICAgIH1cbiAgICB0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuZiAtIGIuZjsgfSk7XG4gICAgLy8gYWZ0ZXIgaTIgcmVhY2hlcyBsYXN0IGluZCwgd2lsbCBiZSBzdG9wcGVkXG4gICAgLy8gZnJlcSBtdXN0IGJlIGdyZWF0ZXIgdGhhbiBsYXJnZXN0IHBvc3NpYmxlIG51bWJlciBvZiBzeW1ib2xzXG4gICAgdC5wdXNoKHsgczogLTEsIGY6IDI1MDAxIH0pO1xuICAgIHZhciBsID0gdFswXSwgciA9IHRbMV0sIGkwID0gMCwgaTEgPSAxLCBpMiA9IDI7XG4gICAgdFswXSA9IHsgczogLTEsIGY6IGwuZiArIHIuZiwgbDogbCwgcjogciB9O1xuICAgIC8vIGVmZmljaWVudCBhbGdvcml0aG0gZnJvbSBVWklQLmpzXG4gICAgLy8gaTAgaXMgbG9va2JlaGluZCwgaTIgaXMgbG9va2FoZWFkIC0gYWZ0ZXIgcHJvY2Vzc2luZyB0d28gbG93LWZyZXFcbiAgICAvLyBzeW1ib2xzIHRoYXQgY29tYmluZWQgaGF2ZSBoaWdoIGZyZXEsIHdpbGwgc3RhcnQgcHJvY2Vzc2luZyBpMiAoaGlnaC1mcmVxLFxuICAgIC8vIG5vbi1jb21wb3NpdGUpIHN5bWJvbHMgaW5zdGVhZFxuICAgIC8vIHNlZSBodHRwczovL3JlZGRpdC5jb20vci9waG90b3BlYS9jb21tZW50cy9pa2VraHQvdXppcGpzX3F1ZXN0aW9ucy9cbiAgICB3aGlsZSAoaTEgIT0gcyAtIDEpIHtcbiAgICAgICAgbCA9IHRbdFtpMF0uZiA8IHRbaTJdLmYgPyBpMCsrIDogaTIrK107XG4gICAgICAgIHIgPSB0W2kwICE9IGkxICYmIHRbaTBdLmYgPCB0W2kyXS5mID8gaTArKyA6IGkyKytdO1xuICAgICAgICB0W2kxKytdID0geyBzOiAtMSwgZjogbC5mICsgci5mLCBsOiBsLCByOiByIH07XG4gICAgfVxuICAgIHZhciBtYXhTeW0gPSB0MlswXS5zO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgczsgKytpKSB7XG4gICAgICAgIGlmICh0MltpXS5zID4gbWF4U3ltKVxuICAgICAgICAgICAgbWF4U3ltID0gdDJbaV0ucztcbiAgICB9XG4gICAgLy8gY29kZSBsZW5ndGhzXG4gICAgdmFyIHRyID0gbmV3IHUxNihtYXhTeW0gKyAxKTtcbiAgICAvLyBtYXggYml0cyBpbiB0cmVlXG4gICAgdmFyIG1idCA9IGxuKHRbaTEgLSAxXSwgdHIsIDApO1xuICAgIGlmIChtYnQgPiBtYikge1xuICAgICAgICAvLyBtb3JlIGFsZ29yaXRobXMgZnJvbSBVWklQLmpzXG4gICAgICAgIC8vIFRPRE86IGZpbmQgb3V0IGhvdyB0aGlzIGNvZGUgd29ya3MgKGRlYnQpXG4gICAgICAgIC8vICBpbmQgICAgZGVidFxuICAgICAgICB2YXIgaSA9IDAsIGR0ID0gMDtcbiAgICAgICAgLy8gICAgbGVmdCAgICAgICAgICAgIGNvc3RcbiAgICAgICAgdmFyIGxmdCA9IG1idCAtIG1iLCBjc3QgPSAxIDw8IGxmdDtcbiAgICAgICAgdDIuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gdHJbYi5zXSAtIHRyW2Euc10gfHwgYS5mIC0gYi5mOyB9KTtcbiAgICAgICAgZm9yICg7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBpMl8xID0gdDJbaV0ucztcbiAgICAgICAgICAgIGlmICh0cltpMl8xXSA+IG1iKSB7XG4gICAgICAgICAgICAgICAgZHQgKz0gY3N0IC0gKDEgPDwgKG1idCAtIHRyW2kyXzFdKSk7XG4gICAgICAgICAgICAgICAgdHJbaTJfMV0gPSBtYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkdCA+Pj0gbGZ0O1xuICAgICAgICB3aGlsZSAoZHQgPiAwKSB7XG4gICAgICAgICAgICB2YXIgaTJfMiA9IHQyW2ldLnM7XG4gICAgICAgICAgICBpZiAodHJbaTJfMl0gPCBtYilcbiAgICAgICAgICAgICAgICBkdCAtPSAxIDw8IChtYiAtIHRyW2kyXzJdKysgLSAxKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7IGkgPj0gMCAmJiBkdDsgLS1pKSB7XG4gICAgICAgICAgICB2YXIgaTJfMyA9IHQyW2ldLnM7XG4gICAgICAgICAgICBpZiAodHJbaTJfM10gPT0gbWIpIHtcbiAgICAgICAgICAgICAgICAtLXRyW2kyXzNdO1xuICAgICAgICAgICAgICAgICsrZHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbWJ0ID0gbWI7XG4gICAgfVxuICAgIHJldHVybiB7IHQ6IG5ldyB1OCh0ciksIGw6IG1idCB9O1xufTtcbi8vIGdldCB0aGUgbWF4IGxlbmd0aCBhbmQgYXNzaWduIGxlbmd0aCBjb2Rlc1xudmFyIGxuID0gZnVuY3Rpb24gKG4sIGwsIGQpIHtcbiAgICByZXR1cm4gbi5zID09IC0xXG4gICAgICAgID8gTWF0aC5tYXgobG4obi5sLCBsLCBkICsgMSksIGxuKG4uciwgbCwgZCArIDEpKVxuICAgICAgICA6IChsW24uc10gPSBkKTtcbn07XG4vLyBsZW5ndGggY29kZXMgZ2VuZXJhdGlvblxudmFyIGxjID0gZnVuY3Rpb24gKGMpIHtcbiAgICB2YXIgcyA9IGMubGVuZ3RoO1xuICAgIC8vIE5vdGUgdGhhdCB0aGUgc2VtaWNvbG9uIHdhcyBpbnRlbnRpb25hbFxuICAgIHdoaWxlIChzICYmICFjWy0tc10pXG4gICAgICAgIDtcbiAgICB2YXIgY2wgPSBuZXcgdTE2KCsrcyk7XG4gICAgLy8gIGluZCAgICAgIG51bSAgICAgICAgIHN0cmVha1xuICAgIHZhciBjbGkgPSAwLCBjbG4gPSBjWzBdLCBjbHMgPSAxO1xuICAgIHZhciB3ID0gZnVuY3Rpb24gKHYpIHsgY2xbY2xpKytdID0gdjsgfTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBzOyArK2kpIHtcbiAgICAgICAgaWYgKGNbaV0gPT0gY2xuICYmIGkgIT0gcylcbiAgICAgICAgICAgICsrY2xzO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghY2xuICYmIGNscyA+IDIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKDsgY2xzID4gMTM4OyBjbHMgLT0gMTM4KVxuICAgICAgICAgICAgICAgICAgICB3KDMyNzU0KTtcbiAgICAgICAgICAgICAgICBpZiAoY2xzID4gMikge1xuICAgICAgICAgICAgICAgICAgICB3KGNscyA+IDEwID8gKChjbHMgLSAxMSkgPDwgNSkgfCAyODY5MCA6ICgoY2xzIC0gMykgPDwgNSkgfCAxMjMwNSk7XG4gICAgICAgICAgICAgICAgICAgIGNscyA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY2xzID4gMykge1xuICAgICAgICAgICAgICAgIHcoY2xuKSwgLS1jbHM7XG4gICAgICAgICAgICAgICAgZm9yICg7IGNscyA+IDY7IGNscyAtPSA2KVxuICAgICAgICAgICAgICAgICAgICB3KDgzMDQpO1xuICAgICAgICAgICAgICAgIGlmIChjbHMgPiAyKVxuICAgICAgICAgICAgICAgICAgICB3KCgoY2xzIC0gMykgPDwgNSkgfCA4MjA4KSwgY2xzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjbHMtLSlcbiAgICAgICAgICAgICAgICB3KGNsbik7XG4gICAgICAgICAgICBjbHMgPSAxO1xuICAgICAgICAgICAgY2xuID0gY1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBjOiBjbC5zdWJhcnJheSgwLCBjbGkpLCBuOiBzIH07XG59O1xuLy8gY2FsY3VsYXRlIHRoZSBsZW5ndGggb2Ygb3V0cHV0IGZyb20gdHJlZSwgY29kZSBsZW5ndGhzXG52YXIgY2xlbiA9IGZ1bmN0aW9uIChjZiwgY2wpIHtcbiAgICB2YXIgbCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbC5sZW5ndGg7ICsraSlcbiAgICAgICAgbCArPSBjZltpXSAqIGNsW2ldO1xuICAgIHJldHVybiBsO1xufTtcbi8vIHdyaXRlcyBhIGZpeGVkIGJsb2NrXG4vLyByZXR1cm5zIHRoZSBuZXcgYml0IHBvc1xudmFyIHdmYmxrID0gZnVuY3Rpb24gKG91dCwgcG9zLCBkYXQpIHtcbiAgICAvLyBubyBuZWVkIHRvIHdyaXRlIDAwIGFzIHR5cGU6IFR5cGVkQXJyYXkgZGVmYXVsdHMgdG8gMFxuICAgIHZhciBzID0gZGF0Lmxlbmd0aDtcbiAgICB2YXIgbyA9IHNoZnQocG9zICsgMik7XG4gICAgb3V0W29dID0gcyAmIDI1NTtcbiAgICBvdXRbbyArIDFdID0gcyA+PiA4O1xuICAgIG91dFtvICsgMl0gPSBvdXRbb10gXiAyNTU7XG4gICAgb3V0W28gKyAzXSA9IG91dFtvICsgMV0gXiAyNTU7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzOyArK2kpXG4gICAgICAgIG91dFtvICsgaSArIDRdID0gZGF0W2ldO1xuICAgIHJldHVybiAobyArIDQgKyBzKSAqIDg7XG59O1xuLy8gd3JpdGVzIGEgYmxvY2tcbnZhciB3YmxrID0gZnVuY3Rpb24gKGRhdCwgb3V0LCBmaW5hbCwgc3ltcywgbGYsIGRmLCBlYiwgbGksIGJzLCBibCwgcCkge1xuICAgIHdiaXRzKG91dCwgcCsrLCBmaW5hbCk7XG4gICAgKytsZlsyNTZdO1xuICAgIHZhciBfYSA9IGhUcmVlKGxmLCAxNSksIGRsdCA9IF9hLnQsIG1sYiA9IF9hLmw7XG4gICAgdmFyIF9iID0gaFRyZWUoZGYsIDE1KSwgZGR0ID0gX2IudCwgbWRiID0gX2IubDtcbiAgICB2YXIgX2MgPSBsYyhkbHQpLCBsY2x0ID0gX2MuYywgbmxjID0gX2MubjtcbiAgICB2YXIgX2QgPSBsYyhkZHQpLCBsY2R0ID0gX2QuYywgbmRjID0gX2QubjtcbiAgICB2YXIgbGNmcmVxID0gbmV3IHUxNigxOSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsY2x0Lmxlbmd0aDsgKytpKVxuICAgICAgICArK2xjZnJlcVtsY2x0W2ldICYgMzFdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGNkdC5sZW5ndGg7ICsraSlcbiAgICAgICAgKytsY2ZyZXFbbGNkdFtpXSAmIDMxXTtcbiAgICB2YXIgX2UgPSBoVHJlZShsY2ZyZXEsIDcpLCBsY3QgPSBfZS50LCBtbGNiID0gX2UubDtcbiAgICB2YXIgbmxjYyA9IDE5O1xuICAgIGZvciAoOyBubGNjID4gNCAmJiAhbGN0W2NsaW1bbmxjYyAtIDFdXTsgLS1ubGNjKVxuICAgICAgICA7XG4gICAgdmFyIGZsZW4gPSAoYmwgKyA1KSA8PCAzO1xuICAgIHZhciBmdGxlbiA9IGNsZW4obGYsIGZsdCkgKyBjbGVuKGRmLCBmZHQpICsgZWI7XG4gICAgdmFyIGR0bGVuID0gY2xlbihsZiwgZGx0KSArIGNsZW4oZGYsIGRkdCkgKyBlYiArIDE0ICsgMyAqIG5sY2MgKyBjbGVuKGxjZnJlcSwgbGN0KSArIDIgKiBsY2ZyZXFbMTZdICsgMyAqIGxjZnJlcVsxN10gKyA3ICogbGNmcmVxWzE4XTtcbiAgICBpZiAoYnMgPj0gMCAmJiBmbGVuIDw9IGZ0bGVuICYmIGZsZW4gPD0gZHRsZW4pXG4gICAgICAgIHJldHVybiB3ZmJsayhvdXQsIHAsIGRhdC5zdWJhcnJheShicywgYnMgKyBibCkpO1xuICAgIHZhciBsbSwgbGwsIGRtLCBkbDtcbiAgICB3Yml0cyhvdXQsIHAsIDEgKyAoZHRsZW4gPCBmdGxlbikpLCBwICs9IDI7XG4gICAgaWYgKGR0bGVuIDwgZnRsZW4pIHtcbiAgICAgICAgbG0gPSBoTWFwKGRsdCwgbWxiLCAwKSwgbGwgPSBkbHQsIGRtID0gaE1hcChkZHQsIG1kYiwgMCksIGRsID0gZGR0O1xuICAgICAgICB2YXIgbGxtID0gaE1hcChsY3QsIG1sY2IsIDApO1xuICAgICAgICB3Yml0cyhvdXQsIHAsIG5sYyAtIDI1Nyk7XG4gICAgICAgIHdiaXRzKG91dCwgcCArIDUsIG5kYyAtIDEpO1xuICAgICAgICB3Yml0cyhvdXQsIHAgKyAxMCwgbmxjYyAtIDQpO1xuICAgICAgICBwICs9IDE0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5sY2M7ICsraSlcbiAgICAgICAgICAgIHdiaXRzKG91dCwgcCArIDMgKiBpLCBsY3RbY2xpbVtpXV0pO1xuICAgICAgICBwICs9IDMgKiBubGNjO1xuICAgICAgICB2YXIgbGN0cyA9IFtsY2x0LCBsY2R0XTtcbiAgICAgICAgZm9yICh2YXIgaXQgPSAwOyBpdCA8IDI7ICsraXQpIHtcbiAgICAgICAgICAgIHZhciBjbGN0ID0gbGN0c1tpdF07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsY3QubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gY2xjdFtpXSAmIDMxO1xuICAgICAgICAgICAgICAgIHdiaXRzKG91dCwgcCwgbGxtW2xlbl0pLCBwICs9IGxjdFtsZW5dO1xuICAgICAgICAgICAgICAgIGlmIChsZW4gPiAxNSlcbiAgICAgICAgICAgICAgICAgICAgd2JpdHMob3V0LCBwLCAoY2xjdFtpXSA+PiA1KSAmIDEyNyksIHAgKz0gY2xjdFtpXSA+PiAxMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbG0gPSBmbG0sIGxsID0gZmx0LCBkbSA9IGZkbSwgZGwgPSBmZHQ7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGk7ICsraSkge1xuICAgICAgICB2YXIgc3ltID0gc3ltc1tpXTtcbiAgICAgICAgaWYgKHN5bSA+IDI1NSkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IChzeW0gPj4gMTgpICYgMzE7XG4gICAgICAgICAgICB3Yml0czE2KG91dCwgcCwgbG1bbGVuICsgMjU3XSksIHAgKz0gbGxbbGVuICsgMjU3XTtcbiAgICAgICAgICAgIGlmIChsZW4gPiA3KVxuICAgICAgICAgICAgICAgIHdiaXRzKG91dCwgcCwgKHN5bSA+PiAyMykgJiAzMSksIHAgKz0gZmxlYltsZW5dO1xuICAgICAgICAgICAgdmFyIGRzdCA9IHN5bSAmIDMxO1xuICAgICAgICAgICAgd2JpdHMxNihvdXQsIHAsIGRtW2RzdF0pLCBwICs9IGRsW2RzdF07XG4gICAgICAgICAgICBpZiAoZHN0ID4gMylcbiAgICAgICAgICAgICAgICB3Yml0czE2KG91dCwgcCwgKHN5bSA+PiA1KSAmIDgxOTEpLCBwICs9IGZkZWJbZHN0XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHdiaXRzMTYob3V0LCBwLCBsbVtzeW1dKSwgcCArPSBsbFtzeW1dO1xuICAgICAgICB9XG4gICAgfVxuICAgIHdiaXRzMTYob3V0LCBwLCBsbVsyNTZdKTtcbiAgICByZXR1cm4gcCArIGxsWzI1Nl07XG59O1xuLy8gZGVmbGF0ZSBvcHRpb25zIChuaWNlIDw8IDEzKSB8IGNoYWluXG52YXIgZGVvID0gLyojX19QVVJFX18qLyBuZXcgaTMyKFs2NTU0MCwgMTMxMDgwLCAxMzEwODgsIDEzMTEwNCwgMjYyMTc2LCAxMDQ4NzA0LCAxMDQ4ODMyLCAyMTE0NTYwLCAyMTE3NjMyXSk7XG4vLyBlbXB0eVxudmFyIGV0ID0gLyojX19QVVJFX18qLyBuZXcgdTgoMCk7XG4vLyBjb21wcmVzc2VzIGRhdGEgaW50byBhIHJhdyBERUZMQVRFIGJ1ZmZlclxudmFyIGRmbHQgPSBmdW5jdGlvbiAoZGF0LCBsdmwsIHBsdmwsIHByZSwgcG9zdCwgc3QpIHtcbiAgICB2YXIgcyA9IHN0LnogfHwgZGF0Lmxlbmd0aDtcbiAgICB2YXIgbyA9IG5ldyB1OChwcmUgKyBzICsgNSAqICgxICsgTWF0aC5jZWlsKHMgLyA3MDAwKSkgKyBwb3N0KTtcbiAgICAvLyB3cml0aW5nIHRvIHRoaXMgd3JpdGVzIHRvIHRoZSBvdXRwdXQgYnVmZmVyXG4gICAgdmFyIHcgPSBvLnN1YmFycmF5KHByZSwgby5sZW5ndGggLSBwb3N0KTtcbiAgICB2YXIgbHN0ID0gc3QubDtcbiAgICB2YXIgcG9zID0gKHN0LnIgfHwgMCkgJiA3O1xuICAgIGlmIChsdmwpIHtcbiAgICAgICAgaWYgKHBvcylcbiAgICAgICAgICAgIHdbMF0gPSBzdC5yID4+IDM7XG4gICAgICAgIHZhciBvcHQgPSBkZW9bbHZsIC0gMV07XG4gICAgICAgIHZhciBuID0gb3B0ID4+IDEzLCBjID0gb3B0ICYgODE5MTtcbiAgICAgICAgdmFyIG1za18xID0gKDEgPDwgcGx2bCkgLSAxO1xuICAgICAgICAvLyAgICBwcmV2IDItYnl0ZSB2YWwgbWFwICAgIGN1cnIgMi1ieXRlIHZhbCBtYXBcbiAgICAgICAgdmFyIHByZXYgPSBzdC5wIHx8IG5ldyB1MTYoMzI3NjgpLCBoZWFkID0gc3QuaCB8fCBuZXcgdTE2KG1za18xICsgMSk7XG4gICAgICAgIHZhciBiczFfMSA9IE1hdGguY2VpbChwbHZsIC8gMyksIGJzMl8xID0gMiAqIGJzMV8xO1xuICAgICAgICB2YXIgaHNoID0gZnVuY3Rpb24gKGkpIHsgcmV0dXJuIChkYXRbaV0gXiAoZGF0W2kgKyAxXSA8PCBiczFfMSkgXiAoZGF0W2kgKyAyXSA8PCBiczJfMSkpICYgbXNrXzE7IH07XG4gICAgICAgIC8vIDI0NTc2IGlzIGFuIGFyYml0cmFyeSBudW1iZXIgb2YgbWF4aW11bSBzeW1ib2xzIHBlciBibG9ja1xuICAgICAgICAvLyA0MjQgYnVmZmVyIGZvciBsYXN0IGJsb2NrXG4gICAgICAgIHZhciBzeW1zID0gbmV3IGkzMigyNTAwMCk7XG4gICAgICAgIC8vIGxlbmd0aC9saXRlcmFsIGZyZXEgICBkaXN0YW5jZSBmcmVxXG4gICAgICAgIHZhciBsZiA9IG5ldyB1MTYoMjg4KSwgZGYgPSBuZXcgdTE2KDMyKTtcbiAgICAgICAgLy8gIGwvbGNudCAgZXhiaXRzICBpbmRleCAgICAgICAgICBsL2xpbmQgIHdhaXRkeCAgICAgICAgICBibGtwb3NcbiAgICAgICAgdmFyIGxjXzEgPSAwLCBlYiA9IDAsIGkgPSBzdC5pIHx8IDAsIGxpID0gMCwgd2kgPSBzdC53IHx8IDAsIGJzID0gMDtcbiAgICAgICAgZm9yICg7IGkgKyAyIDwgczsgKytpKSB7XG4gICAgICAgICAgICAvLyBoYXNoIHZhbHVlXG4gICAgICAgICAgICB2YXIgaHYgPSBoc2goaSk7XG4gICAgICAgICAgICAvLyBpbmRleCBtb2QgMzI3NjggICAgcHJldmlvdXMgaW5kZXggbW9kXG4gICAgICAgICAgICB2YXIgaW1vZCA9IGkgJiAzMjc2NywgcGltb2QgPSBoZWFkW2h2XTtcbiAgICAgICAgICAgIHByZXZbaW1vZF0gPSBwaW1vZDtcbiAgICAgICAgICAgIGhlYWRbaHZdID0gaW1vZDtcbiAgICAgICAgICAgIC8vIFdlIGFsd2F5cyBzaG91bGQgbW9kaWZ5IGhlYWQgYW5kIHByZXYsIGJ1dCBvbmx5IGFkZCBzeW1ib2xzIGlmXG4gICAgICAgICAgICAvLyB0aGlzIGRhdGEgaXMgbm90IHlldCBwcm9jZXNzZWQgKFwid2FpdFwiIGZvciB3YWl0IGluZGV4KVxuICAgICAgICAgICAgaWYgKHdpIDw9IGkpIHtcbiAgICAgICAgICAgICAgICAvLyBieXRlcyByZW1haW5pbmdcbiAgICAgICAgICAgICAgICB2YXIgcmVtID0gcyAtIGk7XG4gICAgICAgICAgICAgICAgaWYgKChsY18xID4gNzAwMCB8fCBsaSA+IDI0NTc2KSAmJiAocmVtID4gNDIzIHx8ICFsc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHdibGsoZGF0LCB3LCAwLCBzeW1zLCBsZiwgZGYsIGViLCBsaSwgYnMsIGkgLSBicywgcG9zKTtcbiAgICAgICAgICAgICAgICAgICAgbGkgPSBsY18xID0gZWIgPSAwLCBicyA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMjg2OyArK2opXG4gICAgICAgICAgICAgICAgICAgICAgICBsZltqXSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMzA7ICsrailcbiAgICAgICAgICAgICAgICAgICAgICAgIGRmW2pdID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gIGxlbiAgICBkaXN0ICAgY2hhaW5cbiAgICAgICAgICAgICAgICB2YXIgbCA9IDIsIGQgPSAwLCBjaF8xID0gYywgZGlmID0gaW1vZCAtIHBpbW9kICYgMzI3Njc7XG4gICAgICAgICAgICAgICAgaWYgKHJlbSA+IDIgJiYgaHYgPT0gaHNoKGkgLSBkaWYpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXhuID0gTWF0aC5taW4obiwgcmVtKSAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtYXhkID0gTWF0aC5taW4oMzI3NjcsIGkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBtYXggcG9zc2libGUgbGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIC8vIG5vdCBjYXBwZWQgYXQgZGlmIGJlY2F1c2UgZGVjb21wcmVzc29ycyBpbXBsZW1lbnQgXCJyb2xsaW5nXCIgaW5kZXggcG9wdWxhdGlvblxuICAgICAgICAgICAgICAgICAgICB2YXIgbWwgPSBNYXRoLm1pbigyNTgsIHJlbSk7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChkaWYgPD0gbWF4ZCAmJiAtLWNoXzEgJiYgaW1vZCAhPSBwaW1vZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdFtpICsgbF0gPT0gZGF0W2kgKyBsIC0gZGlmXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBubCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7IG5sIDwgbWwgJiYgZGF0W2kgKyBubF0gPT0gZGF0W2kgKyBubCAtIGRpZl07ICsrbmwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmwgPiBsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGwgPSBubCwgZCA9IGRpZjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnJlYWsgb3V0IGVhcmx5IHdoZW4gd2UgcmVhY2ggXCJuaWNlXCIgKHdlIGFyZSBzYXRpc2ZpZWQgZW5vdWdoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmwgPiBtYXhuKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdywgZmluZCB0aGUgcmFyZXN0IDItYnl0ZSBzZXF1ZW5jZSB3aXRoaW4gdGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZW5ndGggb2YgbGl0ZXJhbHMgYW5kIHNlYXJjaCBmb3IgdGhhdCBpbnN0ZWFkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNdWNoIGZhc3RlciB0aGFuIGp1c3QgdXNpbmcgdGhlIHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtbWQgPSBNYXRoLm1pbihkaWYsIG5sIC0gMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbW1kOyArK2opIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aSA9IGkgLSBkaWYgKyBqICYgMzI3Njc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHRpID0gcHJldlt0aV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2QgPSB0aSAtIHB0aSAmIDMyNzY3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNkID4gbWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWQgPSBjZCwgcGltb2QgPSB0aTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIHRoZSBwcmV2aW91cyBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1vZCA9IHBpbW9kLCBwaW1vZCA9IHByZXZbaW1vZF07XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWYgKz0gaW1vZCAtIHBpbW9kICYgMzI3Njc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZCB3aWxsIGJlIG5vbnplcm8gb25seSB3aGVuIGEgbWF0Y2ggd2FzIGZvdW5kXG4gICAgICAgICAgICAgICAgaWYgKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gc3RvcmUgYm90aCBkaXN0IGFuZCBsZW4gZGF0YSBpbiBvbmUgaW50MzJcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoaXMgaXMgcmVjb2duaXplZCBhcyBhIGxlbi9kaXN0IHdpdGggMjh0aCBiaXQgKDJeMjgpXG4gICAgICAgICAgICAgICAgICAgIHN5bXNbbGkrK10gPSAyNjg0MzU0NTYgfCAocmV2ZmxbbF0gPDwgMTgpIHwgcmV2ZmRbZF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW4gPSByZXZmbFtsXSAmIDMxLCBkaW4gPSByZXZmZFtkXSAmIDMxO1xuICAgICAgICAgICAgICAgICAgICBlYiArPSBmbGViW2xpbl0gKyBmZGViW2Rpbl07XG4gICAgICAgICAgICAgICAgICAgICsrbGZbMjU3ICsgbGluXTtcbiAgICAgICAgICAgICAgICAgICAgKytkZltkaW5dO1xuICAgICAgICAgICAgICAgICAgICB3aSA9IGkgKyBsO1xuICAgICAgICAgICAgICAgICAgICArK2xjXzE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzeW1zW2xpKytdID0gZGF0W2ldO1xuICAgICAgICAgICAgICAgICAgICArK2xmW2RhdFtpXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IE1hdGgubWF4KGksIHdpKTsgaSA8IHM7ICsraSkge1xuICAgICAgICAgICAgc3ltc1tsaSsrXSA9IGRhdFtpXTtcbiAgICAgICAgICAgICsrbGZbZGF0W2ldXTtcbiAgICAgICAgfVxuICAgICAgICBwb3MgPSB3YmxrKGRhdCwgdywgbHN0LCBzeW1zLCBsZiwgZGYsIGViLCBsaSwgYnMsIGkgLSBicywgcG9zKTtcbiAgICAgICAgaWYgKCFsc3QpIHtcbiAgICAgICAgICAgIHN0LnIgPSAocG9zICYgNykgfCB3Wyhwb3MgLyA4KSB8IDBdIDw8IDM7XG4gICAgICAgICAgICAvLyBzaGZ0KHBvcykgbm93IDEgbGVzcyBpZiBwb3MgJiA3ICE9IDBcbiAgICAgICAgICAgIHBvcyAtPSA3O1xuICAgICAgICAgICAgc3QuaCA9IGhlYWQsIHN0LnAgPSBwcmV2LCBzdC5pID0gaSwgc3QudyA9IHdpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpID0gc3QudyB8fCAwOyBpIDwgcyArIGxzdDsgaSArPSA2NTUzNSkge1xuICAgICAgICAgICAgLy8gZW5kXG4gICAgICAgICAgICB2YXIgZSA9IGkgKyA2NTUzNTtcbiAgICAgICAgICAgIGlmIChlID49IHMpIHtcbiAgICAgICAgICAgICAgICAvLyB3cml0ZSBmaW5hbCBibG9ja1xuICAgICAgICAgICAgICAgIHdbKHBvcyAvIDgpIHwgMF0gPSBsc3Q7XG4gICAgICAgICAgICAgICAgZSA9IHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwb3MgPSB3ZmJsayh3LCBwb3MgKyAxLCBkYXQuc3ViYXJyYXkoaSwgZSkpO1xuICAgICAgICB9XG4gICAgICAgIHN0LmkgPSBzO1xuICAgIH1cbiAgICByZXR1cm4gc2xjKG8sIDAsIHByZSArIHNoZnQocG9zKSArIHBvc3QpO1xufTtcbi8vIENSQzMyIHRhYmxlXG52YXIgY3JjdCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdCA9IG5ldyBJbnQzMkFycmF5KDI1Nik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICB2YXIgYyA9IGksIGsgPSA5O1xuICAgICAgICB3aGlsZSAoLS1rKVxuICAgICAgICAgICAgYyA9ICgoYyAmIDEpICYmIC0zMDY2NzQ5MTIpIF4gKGMgPj4+IDEpO1xuICAgICAgICB0W2ldID0gYztcbiAgICB9XG4gICAgcmV0dXJuIHQ7XG59KSgpO1xuLy8gQ1JDMzJcbnZhciBjcmMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGMgPSAtMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgLy8gY2xvc3VyZXMgaGF2ZSBhd2Z1bCBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgdmFyIGNyID0gYztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZC5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgICAgICBjciA9IGNyY3RbKGNyICYgMjU1KSBeIGRbaV1dIF4gKGNyID4+PiA4KTtcbiAgICAgICAgICAgIGMgPSBjcjtcbiAgICAgICAgfSxcbiAgICAgICAgZDogZnVuY3Rpb24gKCkgeyByZXR1cm4gfmM7IH1cbiAgICB9O1xufTtcbi8vIEFkbGVyMzJcbnZhciBhZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYSA9IDEsIGIgPSAwO1xuICAgIHJldHVybiB7XG4gICAgICAgIHA6IGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAvLyBjbG9zdXJlcyBoYXZlIGF3ZnVsIHBlcmZvcm1hbmNlXG4gICAgICAgICAgICB2YXIgbiA9IGEsIG0gPSBiO1xuICAgICAgICAgICAgdmFyIGwgPSBkLmxlbmd0aCB8IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSAhPSBsOykge1xuICAgICAgICAgICAgICAgIHZhciBlID0gTWF0aC5taW4oaSArIDI2NTUsIGwpO1xuICAgICAgICAgICAgICAgIGZvciAoOyBpIDwgZTsgKytpKVxuICAgICAgICAgICAgICAgICAgICBtICs9IG4gKz0gZFtpXTtcbiAgICAgICAgICAgICAgICBuID0gKG4gJiA2NTUzNSkgKyAxNSAqIChuID4+IDE2KSwgbSA9IChtICYgNjU1MzUpICsgMTUgKiAobSA+PiAxNik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhID0gbiwgYiA9IG07XG4gICAgICAgIH0sXG4gICAgICAgIGQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGEgJT0gNjU1MjEsIGIgJT0gNjU1MjE7XG4gICAgICAgICAgICByZXR1cm4gKGEgJiAyNTUpIDw8IDI0IHwgKGEgJiAweEZGMDApIDw8IDggfCAoYiAmIDI1NSkgPDwgOCB8IChiID4+IDgpO1xuICAgICAgICB9XG4gICAgfTtcbn07XG47XG4vLyBkZWZsYXRlIHdpdGggb3B0c1xudmFyIGRvcHQgPSBmdW5jdGlvbiAoZGF0LCBvcHQsIHByZSwgcG9zdCwgc3QpIHtcbiAgICBpZiAoIXN0KSB7XG4gICAgICAgIHN0ID0geyBsOiAxIH07XG4gICAgICAgIGlmIChvcHQuZGljdGlvbmFyeSkge1xuICAgICAgICAgICAgdmFyIGRpY3QgPSBvcHQuZGljdGlvbmFyeS5zdWJhcnJheSgtMzI3NjgpO1xuICAgICAgICAgICAgdmFyIG5ld0RhdCA9IG5ldyB1OChkaWN0Lmxlbmd0aCArIGRhdC5sZW5ndGgpO1xuICAgICAgICAgICAgbmV3RGF0LnNldChkaWN0KTtcbiAgICAgICAgICAgIG5ld0RhdC5zZXQoZGF0LCBkaWN0Lmxlbmd0aCk7XG4gICAgICAgICAgICBkYXQgPSBuZXdEYXQ7XG4gICAgICAgICAgICBzdC53ID0gZGljdC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRmbHQoZGF0LCBvcHQubGV2ZWwgPT0gbnVsbCA/IDYgOiBvcHQubGV2ZWwsIG9wdC5tZW0gPT0gbnVsbCA/IChzdC5sID8gTWF0aC5jZWlsKE1hdGgubWF4KDgsIE1hdGgubWluKDEzLCBNYXRoLmxvZyhkYXQubGVuZ3RoKSkpICogMS41KSA6IDIwKSA6ICgxMiArIG9wdC5tZW0pLCBwcmUsIHBvc3QsIHN0KTtcbn07XG4vLyBXYWxtYXJ0IG9iamVjdCBzcHJlYWRcbnZhciBtcmcgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHZhciBvID0ge307XG4gICAgZm9yICh2YXIgayBpbiBhKVxuICAgICAgICBvW2tdID0gYVtrXTtcbiAgICBmb3IgKHZhciBrIGluIGIpXG4gICAgICAgIG9ba10gPSBiW2tdO1xuICAgIHJldHVybiBvO1xufTtcbi8vIHdvcmtlciBjbG9uZVxuLy8gVGhpcyBpcyBwb3NzaWJseSB0aGUgY3Jhemllc3QgcGFydCBvZiB0aGUgZW50aXJlIGNvZGViYXNlLCBkZXNwaXRlIGhvdyBzaW1wbGUgaXQgbWF5IHNlZW0uXG4vLyBUaGUgb25seSBwYXJhbWV0ZXIgdG8gdGhpcyBmdW5jdGlvbiBpcyBhIGNsb3N1cmUgdGhhdCByZXR1cm5zIGFuIGFycmF5IG9mIHZhcmlhYmxlcyBvdXRzaWRlIG9mIHRoZSBmdW5jdGlvbiBzY29wZS5cbi8vIFdlJ3JlIGdvaW5nIHRvIHRyeSB0byBmaWd1cmUgb3V0IHRoZSB2YXJpYWJsZSBuYW1lcyB1c2VkIGluIHRoZSBjbG9zdXJlIGFzIHN0cmluZ3MgYmVjYXVzZSB0aGF0IGlzIGNydWNpYWwgZm9yIHdvcmtlcml6YXRpb24uXG4vLyBXZSB3aWxsIHJldHVybiBhbiBvYmplY3QgbWFwcGluZyBvZiB0cnVlIHZhcmlhYmxlIG5hbWUgdG8gdmFsdWUgKGJhc2ljYWxseSwgdGhlIGN1cnJlbnQgc2NvcGUgYXMgYSBKUyBvYmplY3QpLlxuLy8gVGhlIHJlYXNvbiB3ZSBjYW4ndCBqdXN0IHVzZSB0aGUgb3JpZ2luYWwgdmFyaWFibGUgbmFtZXMgaXMgbWluaWZpZXJzIG1hbmdsaW5nIHRoZSB0b3BsZXZlbCBzY29wZS5cbi8vIFRoaXMgdG9vayBtZSB0aHJlZSB3ZWVrcyB0byBmaWd1cmUgb3V0IGhvdyB0byBkby5cbnZhciB3Y2xuID0gZnVuY3Rpb24gKGZuLCBmblN0ciwgdGQpIHtcbiAgICB2YXIgZHQgPSBmbigpO1xuICAgIHZhciBzdCA9IGZuLnRvU3RyaW5nKCk7XG4gICAgdmFyIGtzID0gc3Quc2xpY2Uoc3QuaW5kZXhPZignWycpICsgMSwgc3QubGFzdEluZGV4T2YoJ10nKSkucmVwbGFjZSgvXFxzKy9nLCAnJykuc3BsaXQoJywnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGR0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciB2ID0gZHRbaV0sIGsgPSBrc1tpXTtcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGZuU3RyICs9ICc7JyArIGsgKyAnPSc7XG4gICAgICAgICAgICB2YXIgc3RfMSA9IHYudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmICh2LnByb3RvdHlwZSkge1xuICAgICAgICAgICAgICAgIC8vIGZvciBnbG9iYWwgb2JqZWN0c1xuICAgICAgICAgICAgICAgIGlmIChzdF8xLmluZGV4T2YoJ1tuYXRpdmUgY29kZV0nKSAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3BJbmQgPSBzdF8xLmluZGV4T2YoJyAnLCA4KSArIDE7XG4gICAgICAgICAgICAgICAgICAgIGZuU3RyICs9IHN0XzEuc2xpY2Uoc3BJbmQsIHN0XzEuaW5kZXhPZignKCcsIHNwSW5kKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmblN0ciArPSBzdF8xO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciB0IGluIHYucHJvdG90eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm5TdHIgKz0gJzsnICsgayArICcucHJvdG90eXBlLicgKyB0ICsgJz0nICsgdi5wcm90b3R5cGVbdF0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZm5TdHIgKz0gc3RfMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0ZFtrXSA9IHY7XG4gICAgfVxuICAgIHJldHVybiBmblN0cjtcbn07XG52YXIgY2ggPSBbXTtcbi8vIGNsb25lIGJ1ZnNcbnZhciBjYmZzID0gZnVuY3Rpb24gKHYpIHtcbiAgICB2YXIgdGwgPSBbXTtcbiAgICBmb3IgKHZhciBrIGluIHYpIHtcbiAgICAgICAgaWYgKHZba10uYnVmZmVyKSB7XG4gICAgICAgICAgICB0bC5wdXNoKCh2W2tdID0gbmV3IHZba10uY29uc3RydWN0b3IodltrXSkpLmJ1ZmZlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRsO1xufTtcbi8vIHVzZSBhIHdvcmtlciB0byBleGVjdXRlIGNvZGVcbnZhciB3cmtyID0gZnVuY3Rpb24gKGZucywgaW5pdCwgaWQsIGNiKSB7XG4gICAgaWYgKCFjaFtpZF0pIHtcbiAgICAgICAgdmFyIGZuU3RyID0gJycsIHRkXzEgPSB7fSwgbSA9IGZucy5sZW5ndGggLSAxO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG07ICsraSlcbiAgICAgICAgICAgIGZuU3RyID0gd2NsbihmbnNbaV0sIGZuU3RyLCB0ZF8xKTtcbiAgICAgICAgY2hbaWRdID0geyBjOiB3Y2xuKGZuc1ttXSwgZm5TdHIsIHRkXzEpLCBlOiB0ZF8xIH07XG4gICAgfVxuICAgIHZhciB0ZCA9IG1yZyh7fSwgY2hbaWRdLmUpO1xuICAgIHJldHVybiB3ayhjaFtpZF0uYyArICc7b25tZXNzYWdlPWZ1bmN0aW9uKGUpe2Zvcih2YXIgayBpbiBlLmRhdGEpc2VsZltrXT1lLmRhdGFba107b25tZXNzYWdlPScgKyBpbml0LnRvU3RyaW5nKCkgKyAnfScsIGlkLCB0ZCwgY2Jmcyh0ZCksIGNiKTtcbn07XG4vLyBiYXNlIGFzeW5jIGluZmxhdGUgZm5cbnZhciBiSW5mbHQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbdTgsIHUxNiwgaTMyLCBmbGViLCBmZGViLCBjbGltLCBmbCwgZmQsIGZscm0sIGZkcm0sIHJldiwgZWMsIGhNYXAsIG1heCwgYml0cywgYml0czE2LCBzaGZ0LCBzbGMsIGVyciwgaW5mbHQsIGluZmxhdGVTeW5jLCBwYmYsIGdvcHRdOyB9O1xudmFyIGJEZmx0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW3U4LCB1MTYsIGkzMiwgZmxlYiwgZmRlYiwgY2xpbSwgcmV2ZmwsIHJldmZkLCBmbG0sIGZsdCwgZmRtLCBmZHQsIHJldiwgZGVvLCBldCwgaE1hcCwgd2JpdHMsIHdiaXRzMTYsIGhUcmVlLCBsbiwgbGMsIGNsZW4sIHdmYmxrLCB3YmxrLCBzaGZ0LCBzbGMsIGRmbHQsIGRvcHQsIGRlZmxhdGVTeW5jLCBwYmZdOyB9O1xuLy8gZ3ppcCBleHRyYVxudmFyIGd6ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFtnemgsIGd6aGwsIHdieXRlcywgY3JjLCBjcmN0XTsgfTtcbi8vIGd1bnppcCBleHRyYVxudmFyIGd1emUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbZ3pzLCBnemxdOyB9O1xuLy8gemxpYiBleHRyYVxudmFyIHpsZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt6bGgsIHdieXRlcywgYWRsZXJdOyB9O1xuLy8gdW56bGliIGV4dHJhXG52YXIgenVsZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt6bHNdOyB9O1xuLy8gcG9zdCBidWZcbnZhciBwYmYgPSBmdW5jdGlvbiAobXNnKSB7IHJldHVybiBwb3N0TWVzc2FnZShtc2csIFttc2cuYnVmZmVyXSk7IH07XG4vLyBnZXQgb3B0c1xudmFyIGdvcHQgPSBmdW5jdGlvbiAobykgeyByZXR1cm4gbyAmJiB7XG4gICAgb3V0OiBvLnNpemUgJiYgbmV3IHU4KG8uc2l6ZSksXG4gICAgZGljdGlvbmFyeTogby5kaWN0aW9uYXJ5XG59OyB9O1xuLy8gYXN5bmMgaGVscGVyXG52YXIgY2JpZnkgPSBmdW5jdGlvbiAoZGF0LCBvcHRzLCBmbnMsIGluaXQsIGlkLCBjYikge1xuICAgIHZhciB3ID0gd3JrcihmbnMsIGluaXQsIGlkLCBmdW5jdGlvbiAoZXJyLCBkYXQpIHtcbiAgICAgICAgdy50ZXJtaW5hdGUoKTtcbiAgICAgICAgY2IoZXJyLCBkYXQpO1xuICAgIH0pO1xuICAgIHcucG9zdE1lc3NhZ2UoW2RhdCwgb3B0c10sIG9wdHMuY29uc3VtZSA/IFtkYXQuYnVmZmVyXSA6IFtdKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyB3LnRlcm1pbmF0ZSgpOyB9O1xufTtcbi8vIGF1dG8gc3RyZWFtXG52YXIgYXN0cm0gPSBmdW5jdGlvbiAoc3RybSkge1xuICAgIHN0cm0ub25kYXRhID0gZnVuY3Rpb24gKGRhdCwgZmluYWwpIHsgcmV0dXJuIHBvc3RNZXNzYWdlKFtkYXQsIGZpbmFsXSwgW2RhdC5idWZmZXJdKTsgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgIGlmIChldi5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RybS5wdXNoKGV2LmRhdGFbMF0sIGV2LmRhdGFbMV0pO1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UoW2V2LmRhdGFbMF0ubGVuZ3RoXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc3RybS5mbHVzaCgpO1xuICAgIH07XG59O1xuLy8gYXN5bmMgc3RyZWFtIGF0dGFjaFxudmFyIGFzdHJtaWZ5ID0gZnVuY3Rpb24gKGZucywgc3RybSwgb3B0cywgaW5pdCwgaWQsIGZsdXNoLCBleHQpIHtcbiAgICB2YXIgdDtcbiAgICB2YXIgdyA9IHdya3IoZm5zLCBpbml0LCBpZCwgZnVuY3Rpb24gKGVyciwgZGF0KSB7XG4gICAgICAgIGlmIChlcnIpXG4gICAgICAgICAgICB3LnRlcm1pbmF0ZSgpLCBzdHJtLm9uZGF0YS5jYWxsKHN0cm0sIGVycik7XG4gICAgICAgIGVsc2UgaWYgKCFBcnJheS5pc0FycmF5KGRhdCkpXG4gICAgICAgICAgICBleHQoZGF0KTtcbiAgICAgICAgZWxzZSBpZiAoZGF0Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBzdHJtLnF1ZXVlZFNpemUgLT0gZGF0WzBdO1xuICAgICAgICAgICAgaWYgKHN0cm0ub25kcmFpbilcbiAgICAgICAgICAgICAgICBzdHJtLm9uZHJhaW4oZGF0WzBdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkYXRbMV0pXG4gICAgICAgICAgICAgICAgdy50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgIHN0cm0ub25kYXRhLmNhbGwoc3RybSwgZXJyLCBkYXRbMF0sIGRhdFsxXSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB3LnBvc3RNZXNzYWdlKG9wdHMpO1xuICAgIHN0cm0ucXVldWVkU2l6ZSA9IDA7XG4gICAgc3RybS5wdXNoID0gZnVuY3Rpb24gKGQsIGYpIHtcbiAgICAgICAgaWYgKCFzdHJtLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHQpXG4gICAgICAgICAgICBzdHJtLm9uZGF0YShlcnIoNCwgMCwgMSksIG51bGwsICEhZik7XG4gICAgICAgIHN0cm0ucXVldWVkU2l6ZSArPSBkLmxlbmd0aDtcbiAgICAgICAgdy5wb3N0TWVzc2FnZShbZCwgdCA9IGZdLCBbZC5idWZmZXJdKTtcbiAgICB9O1xuICAgIHN0cm0udGVybWluYXRlID0gZnVuY3Rpb24gKCkgeyB3LnRlcm1pbmF0ZSgpOyB9O1xuICAgIGlmIChmbHVzaCkge1xuICAgICAgICBzdHJtLmZsdXNoID0gZnVuY3Rpb24gKCkgeyB3LnBvc3RNZXNzYWdlKFtdKTsgfTtcbiAgICB9XG59O1xuLy8gcmVhZCAyIGJ5dGVzXG52YXIgYjIgPSBmdW5jdGlvbiAoZCwgYikgeyByZXR1cm4gZFtiXSB8IChkW2IgKyAxXSA8PCA4KTsgfTtcbi8vIHJlYWQgNCBieXRlc1xudmFyIGI0ID0gZnVuY3Rpb24gKGQsIGIpIHsgcmV0dXJuIChkW2JdIHwgKGRbYiArIDFdIDw8IDgpIHwgKGRbYiArIDJdIDw8IDE2KSB8IChkW2IgKyAzXSA8PCAyNCkpID4+PiAwOyB9O1xudmFyIGI4ID0gZnVuY3Rpb24gKGQsIGIpIHsgcmV0dXJuIGI0KGQsIGIpICsgKGI0KGQsIGIgKyA0KSAqIDQyOTQ5NjcyOTYpOyB9O1xuLy8gd3JpdGUgYnl0ZXNcbnZhciB3Ynl0ZXMgPSBmdW5jdGlvbiAoZCwgYiwgdikge1xuICAgIGZvciAoOyB2OyArK2IpXG4gICAgICAgIGRbYl0gPSB2LCB2ID4+Pj0gODtcbn07XG4vLyBnemlwIGhlYWRlclxudmFyIGd6aCA9IGZ1bmN0aW9uIChjLCBvKSB7XG4gICAgdmFyIGZuID0gby5maWxlbmFtZTtcbiAgICBjWzBdID0gMzEsIGNbMV0gPSAxMzksIGNbMl0gPSA4LCBjWzhdID0gby5sZXZlbCA8IDIgPyA0IDogby5sZXZlbCA9PSA5ID8gMiA6IDAsIGNbOV0gPSAzOyAvLyBhc3N1bWUgVW5peFxuICAgIGlmIChvLm10aW1lICE9IDApXG4gICAgICAgIHdieXRlcyhjLCA0LCBNYXRoLmZsb29yKG5ldyBEYXRlKG8ubXRpbWUgfHwgRGF0ZS5ub3coKSkgLyAxMDAwKSk7XG4gICAgaWYgKGZuKSB7XG4gICAgICAgIGNbM10gPSA4O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBmbi5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGNbaSArIDEwXSA9IGZuLmNoYXJDb2RlQXQoaSk7XG4gICAgfVxufTtcbi8vIGd6aXAgZm9vdGVyOiAtOCB0byAtNCA9IENSQywgLTQgdG8gLTAgaXMgbGVuZ3RoXG4vLyBnemlwIHN0YXJ0XG52YXIgZ3pzID0gZnVuY3Rpb24gKGQpIHtcbiAgICBpZiAoZFswXSAhPSAzMSB8fCBkWzFdICE9IDEzOSB8fCBkWzJdICE9IDgpXG4gICAgICAgIGVycig2LCAnaW52YWxpZCBnemlwIGRhdGEnKTtcbiAgICB2YXIgZmxnID0gZFszXTtcbiAgICB2YXIgc3QgPSAxMDtcbiAgICBpZiAoZmxnICYgNClcbiAgICAgICAgc3QgKz0gKGRbMTBdIHwgZFsxMV0gPDwgOCkgKyAyO1xuICAgIGZvciAodmFyIHpzID0gKGZsZyA+PiAzICYgMSkgKyAoZmxnID4+IDQgJiAxKTsgenMgPiAwOyB6cyAtPSAhZFtzdCsrXSlcbiAgICAgICAgO1xuICAgIHJldHVybiBzdCArIChmbGcgJiAyKTtcbn07XG4vLyBnemlwIGxlbmd0aFxudmFyIGd6bCA9IGZ1bmN0aW9uIChkKSB7XG4gICAgdmFyIGwgPSBkLmxlbmd0aDtcbiAgICByZXR1cm4gKGRbbCAtIDRdIHwgZFtsIC0gM10gPDwgOCB8IGRbbCAtIDJdIDw8IDE2IHwgZFtsIC0gMV0gPDwgMjQpID4+PiAwO1xufTtcbi8vIGd6aXAgaGVhZGVyIGxlbmd0aFxudmFyIGd6aGwgPSBmdW5jdGlvbiAobykgeyByZXR1cm4gMTAgKyAoby5maWxlbmFtZSA/IG8uZmlsZW5hbWUubGVuZ3RoICsgMSA6IDApOyB9O1xuLy8gemxpYiBoZWFkZXJcbnZhciB6bGggPSBmdW5jdGlvbiAoYywgbykge1xuICAgIHZhciBsdiA9IG8ubGV2ZWwsIGZsID0gbHYgPT0gMCA/IDAgOiBsdiA8IDYgPyAxIDogbHYgPT0gOSA/IDMgOiAyO1xuICAgIGNbMF0gPSAxMjAsIGNbMV0gPSAoZmwgPDwgNikgfCAoby5kaWN0aW9uYXJ5ICYmIDMyKTtcbiAgICBjWzFdIHw9IDMxIC0gKChjWzBdIDw8IDgpIHwgY1sxXSkgJSAzMTtcbiAgICBpZiAoby5kaWN0aW9uYXJ5KSB7XG4gICAgICAgIHZhciBoID0gYWRsZXIoKTtcbiAgICAgICAgaC5wKG8uZGljdGlvbmFyeSk7XG4gICAgICAgIHdieXRlcyhjLCAyLCBoLmQoKSk7XG4gICAgfVxufTtcbi8vIHpsaWIgc3RhcnRcbnZhciB6bHMgPSBmdW5jdGlvbiAoZCwgZGljdCkge1xuICAgIGlmICgoZFswXSAmIDE1KSAhPSA4IHx8IChkWzBdID4+IDQpID4gNyB8fCAoKGRbMF0gPDwgOCB8IGRbMV0pICUgMzEpKVxuICAgICAgICBlcnIoNiwgJ2ludmFsaWQgemxpYiBkYXRhJyk7XG4gICAgaWYgKChkWzFdID4+IDUgJiAxKSA9PSArIWRpY3QpXG4gICAgICAgIGVycig2LCAnaW52YWxpZCB6bGliIGRhdGE6ICcgKyAoZFsxXSAmIDMyID8gJ25lZWQnIDogJ3VuZXhwZWN0ZWQnKSArICcgZGljdGlvbmFyeScpO1xuICAgIHJldHVybiAoZFsxXSA+PiAzICYgNCkgKyAyO1xufTtcbmZ1bmN0aW9uIFN0cm1PcHQob3B0cywgY2IpIHtcbiAgICBpZiAodHlwZW9mIG9wdHMgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICByZXR1cm4gb3B0cztcbn1cbi8qKlxuICogU3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb25cbiAqL1xudmFyIERlZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVmbGF0ZShvcHRzLCBjYikge1xuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgICAgICB0aGlzLm8gPSBvcHRzIHx8IHt9O1xuICAgICAgICB0aGlzLnMgPSB7IGw6IDAsIGk6IDMyNzY4LCB3OiAzMjc2OCwgejogMzI3NjggfTtcbiAgICAgICAgLy8gQnVmZmVyIGxlbmd0aCBtdXN0IGFsd2F5cyBiZSAwIG1vZCAzMjc2OCBmb3IgaW5kZXggY2FsY3VsYXRpb25zIHRvIGJlIGNvcnJlY3Qgd2hlbiBtb2RpZnlpbmcgaGVhZCBhbmQgcHJldlxuICAgICAgICAvLyA5ODMwNCA9IDMyNzY4IChsb29rYmFjaykgKyA2NTUzNiAoY29tbW9uIGNodW5rIHNpemUpXG4gICAgICAgIHRoaXMuYiA9IG5ldyB1OCg5ODMwNCk7XG4gICAgICAgIGlmICh0aGlzLm8uZGljdGlvbmFyeSkge1xuICAgICAgICAgICAgdmFyIGRpY3QgPSB0aGlzLm8uZGljdGlvbmFyeS5zdWJhcnJheSgtMzI3NjgpO1xuICAgICAgICAgICAgdGhpcy5iLnNldChkaWN0LCAzMjc2OCAtIGRpY3QubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMucy5pID0gMzI3NjggLSBkaWN0Lmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBEZWZsYXRlLnByb3RvdHlwZS5wID0gZnVuY3Rpb24gKGMsIGYpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEoZG9wdChjLCB0aGlzLm8sIDAsIDAsIHRoaXMucyksIGYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVmbGF0ZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHRoaXMucy5sKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB2YXIgZW5kTGVuID0gY2h1bmsubGVuZ3RoICsgdGhpcy5zLno7XG4gICAgICAgIGlmIChlbmRMZW4gPiB0aGlzLmIubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoZW5kTGVuID4gMiAqIHRoaXMuYi5sZW5ndGggLSAzMjc2OCkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdCdWYgPSBuZXcgdTgoZW5kTGVuICYgLTMyNzY4KTtcbiAgICAgICAgICAgICAgICBuZXdCdWYuc2V0KHRoaXMuYi5zdWJhcnJheSgwLCB0aGlzLnMueikpO1xuICAgICAgICAgICAgICAgIHRoaXMuYiA9IG5ld0J1ZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzcGxpdCA9IHRoaXMuYi5sZW5ndGggLSB0aGlzLnMuejtcbiAgICAgICAgICAgIHRoaXMuYi5zZXQoY2h1bmsuc3ViYXJyYXkoMCwgc3BsaXQpLCB0aGlzLnMueik7XG4gICAgICAgICAgICB0aGlzLnMueiA9IHRoaXMuYi5sZW5ndGg7XG4gICAgICAgICAgICB0aGlzLnAodGhpcy5iLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmIuc2V0KHRoaXMuYi5zdWJhcnJheSgtMzI3NjgpKTtcbiAgICAgICAgICAgIHRoaXMuYi5zZXQoY2h1bmsuc3ViYXJyYXkoc3BsaXQpLCAzMjc2OCk7XG4gICAgICAgICAgICB0aGlzLnMueiA9IGNodW5rLmxlbmd0aCAtIHNwbGl0ICsgMzI3Njg7XG4gICAgICAgICAgICB0aGlzLnMuaSA9IDMyNzY2LCB0aGlzLnMudyA9IDMyNzY4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5iLnNldChjaHVuaywgdGhpcy5zLnopO1xuICAgICAgICAgICAgdGhpcy5zLnogKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucy5sID0gZmluYWwgJiAxO1xuICAgICAgICBpZiAodGhpcy5zLnogPiB0aGlzLnMudyArIDgxOTEgfHwgZmluYWwpIHtcbiAgICAgICAgICAgIHRoaXMucCh0aGlzLmIsIGZpbmFsIHx8IGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMucy53ID0gdGhpcy5zLmksIHRoaXMucy5pIC09IDI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZsdXNoZXMgYnVmZmVyZWQgdW5jb21wcmVzc2VkIGRhdGEuIFVzZWZ1bCB0byBpbW1lZGlhdGVseSByZXRyaWV2ZSB0aGVcbiAgICAgKiBkZWZsYXRlZCBvdXRwdXQgZm9yIHNtYWxsIGlucHV0cy5cbiAgICAgKi9cbiAgICBEZWZsYXRlLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHRoaXMucy5sKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB0aGlzLnAodGhpcy5iLCBmYWxzZSk7XG4gICAgICAgIHRoaXMucy53ID0gdGhpcy5zLmksIHRoaXMucy5pIC09IDI7XG4gICAgfTtcbiAgICByZXR1cm4gRGVmbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBEZWZsYXRlIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgREVGTEFURSBjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNEZWZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jRGVmbGF0ZShvcHRzLCBjYikge1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiRGZsdCxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgRGVmbGF0ZV07IH1cbiAgICAgICAgXSwgdGhpcywgU3RybU9wdC5jYWxsKHRoaXMsIG9wdHMsIGNiKSwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBEZWZsYXRlKGV2LmRhdGEpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDYsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNEZWZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jRGVmbGF0ZSB9O1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmxhdGUoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiRGZsdCxcbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZihkZWZsYXRlU3luYyhldi5kYXRhWzBdLCBldi5kYXRhWzFdKSk7IH0sIDAsIGNiKTtcbn1cbi8qKlxuICogQ29tcHJlc3NlcyBkYXRhIHdpdGggREVGTEFURSB3aXRob3V0IGFueSB3cmFwcGVyXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBkZWZsYXRlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWZsYXRlU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgcmV0dXJuIGRvcHQoZGF0YSwgb3B0cyB8fCB7fSwgMCwgMCk7XG59XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEluZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5mbGF0ZShvcHRzLCBjYikge1xuICAgICAgICAvLyBubyBTdHJtT3B0IGhlcmUgdG8gYXZvaWQgYWRkaW5nIHRvIHdvcmtlcml6ZXJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgdmFyIGRpY3QgPSBvcHRzICYmIG9wdHMuZGljdGlvbmFyeSAmJiBvcHRzLmRpY3Rpb25hcnkuc3ViYXJyYXkoLTMyNzY4KTtcbiAgICAgICAgdGhpcy5zID0geyBpOiAwLCBiOiBkaWN0ID8gZGljdC5sZW5ndGggOiAwIH07XG4gICAgICAgIHRoaXMubyA9IG5ldyB1OCgzMjc2OCk7XG4gICAgICAgIHRoaXMucCA9IG5ldyB1OCgwKTtcbiAgICAgICAgaWYgKGRpY3QpXG4gICAgICAgICAgICB0aGlzLm8uc2V0KGRpY3QpO1xuICAgIH1cbiAgICBJbmZsYXRlLnByb3RvdHlwZS5lID0gZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgaWYgKCF0aGlzLnAubGVuZ3RoKVxuICAgICAgICAgICAgdGhpcy5wID0gYztcbiAgICAgICAgZWxzZSBpZiAoYy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBuID0gbmV3IHU4KHRoaXMucC5sZW5ndGggKyBjLmxlbmd0aCk7XG4gICAgICAgICAgICBuLnNldCh0aGlzLnApLCBuLnNldChjLCB0aGlzLnAubGVuZ3RoKSwgdGhpcy5wID0gbjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgSW5mbGF0ZS5wcm90b3R5cGUuYyA9IGZ1bmN0aW9uIChmaW5hbCkge1xuICAgICAgICB0aGlzLnMuaSA9ICsodGhpcy5kID0gZmluYWwgfHwgZmFsc2UpO1xuICAgICAgICB2YXIgYnRzID0gdGhpcy5zLmI7XG4gICAgICAgIHZhciBkdCA9IGluZmx0KHRoaXMucCwgdGhpcy5zLCB0aGlzLm8pO1xuICAgICAgICB0aGlzLm9uZGF0YShzbGMoZHQsIGJ0cywgdGhpcy5zLmIpLCB0aGlzLmQpO1xuICAgICAgICB0aGlzLm8gPSBzbGMoZHQsIHRoaXMucy5iIC0gMzI3NjgpLCB0aGlzLnMuYiA9IHRoaXMuby5sZW5ndGg7XG4gICAgICAgIHRoaXMucCA9IHNsYyh0aGlzLnAsICh0aGlzLnMucCAvIDgpIHwgMCksIHRoaXMucy5wICY9IDc7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBpbmZsYXRlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGZpbmFsIGNodW5rXG4gICAgICovXG4gICAgSW5mbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5lKGNodW5rKSwgdGhpcy5jKGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEluZmxhdGUgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jSW5mbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY0luZmxhdGUob3B0cywgY2IpIHtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkluZmx0LFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBJbmZsYXRlXTsgfVxuICAgICAgICBdLCB0aGlzLCBTdHJtT3B0LmNhbGwodGhpcywgb3B0cywgY2IpLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzdHJtID0gbmV3IEluZmxhdGUoZXYuZGF0YSk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgNywgMCk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0luZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNJbmZsYXRlIH07XG5leHBvcnQgZnVuY3Rpb24gaW5mbGF0ZShkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJJbmZsdFxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKGluZmxhdGVTeW5jKGV2LmRhdGFbMF0sIGdvcHQoZXYuZGF0YVsxXSkpKTsgfSwgMSwgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIERFRkxBVEUgZGF0YSB3aXRoIG5vIHdyYXBwZXJcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGRlY29tcHJlc3NcbiAqIEBwYXJhbSBvcHRzIFRoZSBkZWNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBkZWNvbXByZXNzZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5mbGF0ZVN5bmMoZGF0YSwgb3B0cykge1xuICAgIHJldHVybiBpbmZsdChkYXRhLCB7IGk6IDIgfSwgb3B0cyAmJiBvcHRzLm91dCwgb3B0cyAmJiBvcHRzLmRpY3Rpb25hcnkpO1xufVxuLy8gYmVmb3JlIHlvdSB5ZWxsIGF0IG1lIGZvciBub3QganVzdCB1c2luZyBleHRlbmRzLCBteSByZWFzb24gaXMgdGhhdCBUUyBpbmhlcml0YW5jZSBpcyBoYXJkIHRvIHdvcmtlcml6ZS5cbi8qKlxuICogU3RyZWFtaW5nIEdaSVAgY29tcHJlc3Npb25cbiAqL1xudmFyIEd6aXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR3ppcChvcHRzLCBjYikge1xuICAgICAgICB0aGlzLmMgPSBjcmMoKTtcbiAgICAgICAgdGhpcy5sID0gMDtcbiAgICAgICAgdGhpcy52ID0gMTtcbiAgICAgICAgRGVmbGF0ZS5jYWxsKHRoaXMsIG9wdHMsIGNiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgR1pJUHBlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBHemlwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0aGlzLmMucChjaHVuayk7XG4gICAgICAgIHRoaXMubCArPSBjaHVuay5sZW5ndGg7XG4gICAgICAgIERlZmxhdGUucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgR3ppcC5wcm90b3R5cGUucCA9IGZ1bmN0aW9uIChjLCBmKSB7XG4gICAgICAgIHZhciByYXcgPSBkb3B0KGMsIHRoaXMubywgdGhpcy52ICYmIGd6aGwodGhpcy5vKSwgZiAmJiA4LCB0aGlzLnMpO1xuICAgICAgICBpZiAodGhpcy52KVxuICAgICAgICAgICAgZ3poKHJhdywgdGhpcy5vKSwgdGhpcy52ID0gMDtcbiAgICAgICAgaWYgKGYpXG4gICAgICAgICAgICB3Ynl0ZXMocmF3LCByYXcubGVuZ3RoIC0gOCwgdGhpcy5jLmQoKSksIHdieXRlcyhyYXcsIHJhdy5sZW5ndGggLSA0LCB0aGlzLmwpO1xuICAgICAgICB0aGlzLm9uZGF0YShyYXcsIGYpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogRmx1c2hlcyBidWZmZXJlZCB1bmNvbXByZXNzZWQgZGF0YS4gVXNlZnVsIHRvIGltbWVkaWF0ZWx5IHJldHJpZXZlIHRoZVxuICAgICAqIEdaSVBwZWQgb3V0cHV0IGZvciBzbWFsbCBpbnB1dHMuXG4gICAgICovXG4gICAgR3ppcC5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIERlZmxhdGUucHJvdG90eXBlLmZsdXNoLmNhbGwodGhpcyk7XG4gICAgfTtcbiAgICByZXR1cm4gR3ppcDtcbn0oKSk7XG5leHBvcnQgeyBHemlwIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgR1pJUCBjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNHemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jR3ppcChvcHRzLCBjYikge1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiRGZsdCxcbiAgICAgICAgICAgIGd6ZSxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgRGVmbGF0ZSwgR3ppcF07IH1cbiAgICAgICAgXSwgdGhpcywgU3RybU9wdC5jYWxsKHRoaXMsIG9wdHMsIGNiKSwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBHemlwKGV2LmRhdGEpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDgsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNHemlwO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jR3ppcCB9O1xuZXhwb3J0IGZ1bmN0aW9uIGd6aXAoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiRGZsdCxcbiAgICAgICAgZ3plLFxuICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbZ3ppcFN5bmNdOyB9XG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYoZ3ppcFN5bmMoZXYuZGF0YVswXSwgZXYuZGF0YVsxXSkpOyB9LCAyLCBjYik7XG59XG4vKipcbiAqIENvbXByZXNzZXMgZGF0YSB3aXRoIEdaSVBcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGNvbXByZXNzXG4gKiBAcGFyYW0gb3B0cyBUaGUgY29tcHJlc3Npb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGd6aXBwZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3ppcFN5bmMoZGF0YSwgb3B0cykge1xuICAgIGlmICghb3B0cylcbiAgICAgICAgb3B0cyA9IHt9O1xuICAgIHZhciBjID0gY3JjKCksIGwgPSBkYXRhLmxlbmd0aDtcbiAgICBjLnAoZGF0YSk7XG4gICAgdmFyIGQgPSBkb3B0KGRhdGEsIG9wdHMsIGd6aGwob3B0cyksIDgpLCBzID0gZC5sZW5ndGg7XG4gICAgcmV0dXJuIGd6aChkLCBvcHRzKSwgd2J5dGVzKGQsIHMgLSA4LCBjLmQoKSksIHdieXRlcyhkLCBzIC0gNCwgbCksIGQ7XG59XG4vKipcbiAqIFN0cmVhbWluZyBzaW5nbGUgb3IgbXVsdGktbWVtYmVyIEdaSVAgZGVjb21wcmVzc2lvblxuICovXG52YXIgR3VuemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEd1bnppcChvcHRzLCBjYikge1xuICAgICAgICB0aGlzLnYgPSAxO1xuICAgICAgICB0aGlzLnIgPSAwO1xuICAgICAgICBJbmZsYXRlLmNhbGwodGhpcywgb3B0cywgY2IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBHVU5aSVBwZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgR3VuemlwLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBJbmZsYXRlLnByb3RvdHlwZS5lLmNhbGwodGhpcywgY2h1bmspO1xuICAgICAgICB0aGlzLnIgKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgICBpZiAodGhpcy52KSB7XG4gICAgICAgICAgICB2YXIgcCA9IHRoaXMucC5zdWJhcnJheSh0aGlzLnYgLSAxKTtcbiAgICAgICAgICAgIHZhciBzID0gcC5sZW5ndGggPiAzID8gZ3pzKHApIDogNDtcbiAgICAgICAgICAgIGlmIChzID4gcC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpbmFsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnYgPiAxICYmIHRoaXMub25tZW1iZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ubWVtYmVyKHRoaXMuciAtIHAubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucCA9IHAuc3ViYXJyYXkocyksIHRoaXMudiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmVjZXNzYXJ5IHRvIHByZXZlbnQgVFMgZnJvbSB1c2luZyB0aGUgY2xvc3VyZSB2YWx1ZVxuICAgICAgICAvLyBUaGlzIGFsbG93cyBmb3Igd29ya2VyaXphdGlvbiB0byBmdW5jdGlvbiBjb3JyZWN0bHlcbiAgICAgICAgSW5mbGF0ZS5wcm90b3R5cGUuYy5jYWxsKHRoaXMsIGZpbmFsKTtcbiAgICAgICAgLy8gcHJvY2VzcyBjb25jYXRlbmF0ZWQgR1pJUFxuICAgICAgICBpZiAodGhpcy5zLmYgJiYgIXRoaXMucy5sICYmICFmaW5hbCkge1xuICAgICAgICAgICAgdGhpcy52ID0gc2hmdCh0aGlzLnMucCkgKyA5O1xuICAgICAgICAgICAgdGhpcy5zID0geyBpOiAwIH07XG4gICAgICAgICAgICB0aGlzLm8gPSBuZXcgdTgoMCk7XG4gICAgICAgICAgICB0aGlzLnB1c2gobmV3IHU4KDApLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBHdW56aXA7XG59KCkpO1xuZXhwb3J0IHsgR3VuemlwIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgc2luZ2xlIG9yIG11bHRpLW1lbWJlciBHWklQIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jR3VuemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jR3VuemlwKG9wdHMsIGNiKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJJbmZsdCxcbiAgICAgICAgICAgIGd1emUsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIEluZmxhdGUsIEd1bnppcF07IH1cbiAgICAgICAgXSwgdGhpcywgU3RybU9wdC5jYWxsKHRoaXMsIG9wdHMsIGNiKSwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBHdW56aXAoZXYuZGF0YSk7XG4gICAgICAgICAgICBzdHJtLm9ubWVtYmVyID0gZnVuY3Rpb24gKG9mZnNldCkgeyByZXR1cm4gcG9zdE1lc3NhZ2Uob2Zmc2V0KTsgfTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCA5LCAwLCBmdW5jdGlvbiAob2Zmc2V0KSB7IHJldHVybiBfdGhpcy5vbm1lbWJlciAmJiBfdGhpcy5vbm1lbWJlcihvZmZzZXQpOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jR3VuemlwO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jR3VuemlwIH07XG5leHBvcnQgZnVuY3Rpb24gZ3VuemlwKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkluZmx0LFxuICAgICAgICBndXplLFxuICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbZ3VuemlwU3luY107IH1cbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZihndW56aXBTeW5jKGV2LmRhdGFbMF0sIGV2LmRhdGFbMV0pKTsgfSwgMywgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIEdaSVAgZGF0YVxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGRlY29tcHJlc3Npb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBndW56aXBTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICB2YXIgc3QgPSBnenMoZGF0YSk7XG4gICAgaWYgKHN0ICsgOCA+IGRhdGEubGVuZ3RoKVxuICAgICAgICBlcnIoNiwgJ2ludmFsaWQgZ3ppcCBkYXRhJyk7XG4gICAgcmV0dXJuIGluZmx0KGRhdGEuc3ViYXJyYXkoc3QsIC04KSwgeyBpOiAyIH0sIG9wdHMgJiYgb3B0cy5vdXQgfHwgbmV3IHU4KGd6bChkYXRhKSksIG9wdHMgJiYgb3B0cy5kaWN0aW9uYXJ5KTtcbn1cbi8qKlxuICogU3RyZWFtaW5nIFpsaWIgY29tcHJlc3Npb25cbiAqL1xudmFyIFpsaWIgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gWmxpYihvcHRzLCBjYikge1xuICAgICAgICB0aGlzLmMgPSBhZGxlcigpO1xuICAgICAgICB0aGlzLnYgPSAxO1xuICAgICAgICBEZWZsYXRlLmNhbGwodGhpcywgb3B0cywgY2IpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSB6bGliYmVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFpsaWIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHRoaXMuYy5wKGNodW5rKTtcbiAgICAgICAgRGVmbGF0ZS5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICBabGliLnByb3RvdHlwZS5wID0gZnVuY3Rpb24gKGMsIGYpIHtcbiAgICAgICAgdmFyIHJhdyA9IGRvcHQoYywgdGhpcy5vLCB0aGlzLnYgJiYgKHRoaXMuby5kaWN0aW9uYXJ5ID8gNiA6IDIpLCBmICYmIDQsIHRoaXMucyk7XG4gICAgICAgIGlmICh0aGlzLnYpXG4gICAgICAgICAgICB6bGgocmF3LCB0aGlzLm8pLCB0aGlzLnYgPSAwO1xuICAgICAgICBpZiAoZilcbiAgICAgICAgICAgIHdieXRlcyhyYXcsIHJhdy5sZW5ndGggLSA0LCB0aGlzLmMuZCgpKTtcbiAgICAgICAgdGhpcy5vbmRhdGEocmF3LCBmKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZsdXNoZXMgYnVmZmVyZWQgdW5jb21wcmVzc2VkIGRhdGEuIFVzZWZ1bCB0byBpbW1lZGlhdGVseSByZXRyaWV2ZSB0aGVcbiAgICAgKiB6bGliYmVkIG91dHB1dCBmb3Igc21hbGwgaW5wdXRzLlxuICAgICAqL1xuICAgIFpsaWIucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBEZWZsYXRlLnByb3RvdHlwZS5mbHVzaC5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIFpsaWI7XG59KCkpO1xuZXhwb3J0IHsgWmxpYiB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIFpsaWIgY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jWmxpYiA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY1psaWIob3B0cywgY2IpIHtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkRmbHQsXG4gICAgICAgICAgICB6bGUsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIERlZmxhdGUsIFpsaWJdOyB9XG4gICAgICAgIF0sIHRoaXMsIFN0cm1PcHQuY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgWmxpYihldi5kYXRhKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCAxMCwgMSk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY1psaWI7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNabGliIH07XG5leHBvcnQgZnVuY3Rpb24gemxpYihkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJEZmx0LFxuICAgICAgICB6bGUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt6bGliU3luY107IH1cbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZih6bGliU3luYyhldi5kYXRhWzBdLCBldi5kYXRhWzFdKSk7IH0sIDQsIGNiKTtcbn1cbi8qKlxuICogQ29tcHJlc3MgZGF0YSB3aXRoIFpsaWJcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGNvbXByZXNzXG4gKiBAcGFyYW0gb3B0cyBUaGUgY29tcHJlc3Npb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIHpsaWItY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6bGliU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzKVxuICAgICAgICBvcHRzID0ge307XG4gICAgdmFyIGEgPSBhZGxlcigpO1xuICAgIGEucChkYXRhKTtcbiAgICB2YXIgZCA9IGRvcHQoZGF0YSwgb3B0cywgb3B0cy5kaWN0aW9uYXJ5ID8gNiA6IDIsIDQpO1xuICAgIHJldHVybiB6bGgoZCwgb3B0cyksIHdieXRlcyhkLCBkLmxlbmd0aCAtIDQsIGEuZCgpKSwgZDtcbn1cbi8qKlxuICogU3RyZWFtaW5nIFpsaWIgZGVjb21wcmVzc2lvblxuICovXG52YXIgVW56bGliID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFVuemxpYihvcHRzLCBjYikge1xuICAgICAgICBJbmZsYXRlLmNhbGwodGhpcywgb3B0cywgY2IpO1xuICAgICAgICB0aGlzLnYgPSBvcHRzICYmIG9wdHMuZGljdGlvbmFyeSA/IDIgOiAxO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSB1bnpsaWJiZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgVW56bGliLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBJbmZsYXRlLnByb3RvdHlwZS5lLmNhbGwodGhpcywgY2h1bmspO1xuICAgICAgICBpZiAodGhpcy52KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wLmxlbmd0aCA8IDYgJiYgIWZpbmFsKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMucCA9IHRoaXMucC5zdWJhcnJheSh6bHModGhpcy5wLCB0aGlzLnYgLSAxKSksIHRoaXMudiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wLmxlbmd0aCA8IDQpXG4gICAgICAgICAgICAgICAgZXJyKDYsICdpbnZhbGlkIHpsaWIgZGF0YScpO1xuICAgICAgICAgICAgdGhpcy5wID0gdGhpcy5wLnN1YmFycmF5KDAsIC00KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBuZWNlc3NhcnkgdG8gcHJldmVudCBUUyBmcm9tIHVzaW5nIHRoZSBjbG9zdXJlIHZhbHVlXG4gICAgICAgIC8vIFRoaXMgYWxsb3dzIGZvciB3b3JrZXJpemF0aW9uIHRvIGZ1bmN0aW9uIGNvcnJlY3RseVxuICAgICAgICBJbmZsYXRlLnByb3RvdHlwZS5jLmNhbGwodGhpcywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIFVuemxpYjtcbn0oKSk7XG5leHBvcnQgeyBVbnpsaWIgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBabGliIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jVW56bGliID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jVW56bGliKG9wdHMsIGNiKSB7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJJbmZsdCxcbiAgICAgICAgICAgIHp1bGUsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIEluZmxhdGUsIFVuemxpYl07IH1cbiAgICAgICAgXSwgdGhpcywgU3RybU9wdC5jYWxsKHRoaXMsIG9wdHMsIGNiKSwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBVbnpsaWIoZXYuZGF0YSk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgMTEsIDApO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNVbnpsaWI7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNVbnpsaWIgfTtcbmV4cG9ydCBmdW5jdGlvbiB1bnpsaWIoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiSW5mbHQsXG4gICAgICAgIHp1bGUsXG4gICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt1bnpsaWJTeW5jXTsgfVxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKHVuemxpYlN5bmMoZXYuZGF0YVswXSwgZ29wdChldi5kYXRhWzFdKSkpOyB9LCA1LCBjYik7XG59XG4vKipcbiAqIEV4cGFuZHMgWmxpYiBkYXRhXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBkZWNvbXByZXNzXG4gKiBAcGFyYW0gb3B0cyBUaGUgZGVjb21wcmVzc2lvbiBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuemxpYlN5bmMoZGF0YSwgb3B0cykge1xuICAgIHJldHVybiBpbmZsdChkYXRhLnN1YmFycmF5KHpscyhkYXRhLCBvcHRzICYmIG9wdHMuZGljdGlvbmFyeSksIC00KSwgeyBpOiAyIH0sIG9wdHMgJiYgb3B0cy5vdXQsIG9wdHMgJiYgb3B0cy5kaWN0aW9uYXJ5KTtcbn1cbi8vIERlZmF1bHQgYWxnb3JpdGhtIGZvciBjb21wcmVzc2lvbiAodXNlZCBiZWNhdXNlIGhhdmluZyBhIGtub3duIG91dHB1dCBzaXplIGFsbG93cyBmYXN0ZXIgZGVjb21wcmVzc2lvbilcbmV4cG9ydCB7IGd6aXAgYXMgY29tcHJlc3MsIEFzeW5jR3ppcCBhcyBBc3luY0NvbXByZXNzIH07XG5leHBvcnQgeyBnemlwU3luYyBhcyBjb21wcmVzc1N5bmMsIEd6aXAgYXMgQ29tcHJlc3MgfTtcbi8qKlxuICogU3RyZWFtaW5nIEdaSVAsIFpsaWIsIG9yIHJhdyBERUZMQVRFIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIERlY29tcHJlc3MgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGVjb21wcmVzcyhvcHRzLCBjYikge1xuICAgICAgICB0aGlzLm8gPSBTdHJtT3B0LmNhbGwodGhpcywgb3B0cywgY2IpIHx8IHt9O1xuICAgICAgICB0aGlzLkcgPSBHdW56aXA7XG4gICAgICAgIHRoaXMuSSA9IEluZmxhdGU7XG4gICAgICAgIHRoaXMuWiA9IFVuemxpYjtcbiAgICB9XG4gICAgLy8gaW5pdCBzdWJzdHJlYW1cbiAgICAvLyBvdmVycmlkZW4gYnkgQXN5bmNEZWNvbXByZXNzXG4gICAgRGVjb21wcmVzcy5wcm90b3R5cGUuaSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5zLm9uZGF0YSA9IGZ1bmN0aW9uIChkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICBfdGhpcy5vbmRhdGEoZGF0LCBmaW5hbCk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWNvbXByZXNzZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRGVjb21wcmVzcy5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKCF0aGlzLnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnAgJiYgdGhpcy5wLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBuID0gbmV3IHU4KHRoaXMucC5sZW5ndGggKyBjaHVuay5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIG4uc2V0KHRoaXMucCksIG4uc2V0KGNodW5rLCB0aGlzLnAubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnAgPSBjaHVuaztcbiAgICAgICAgICAgIGlmICh0aGlzLnAubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgIHRoaXMucyA9ICh0aGlzLnBbMF0gPT0gMzEgJiYgdGhpcy5wWzFdID09IDEzOSAmJiB0aGlzLnBbMl0gPT0gOClcbiAgICAgICAgICAgICAgICAgICAgPyBuZXcgdGhpcy5HKHRoaXMubylcbiAgICAgICAgICAgICAgICAgICAgOiAoKHRoaXMucFswXSAmIDE1KSAhPSA4IHx8ICh0aGlzLnBbMF0gPj4gNCkgPiA3IHx8ICgodGhpcy5wWzBdIDw8IDggfCB0aGlzLnBbMV0pICUgMzEpKVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXcgdGhpcy5JKHRoaXMubylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbmV3IHRoaXMuWih0aGlzLm8pO1xuICAgICAgICAgICAgICAgIHRoaXMuaSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucy5wdXNoKHRoaXMucCwgZmluYWwpO1xuICAgICAgICAgICAgICAgIHRoaXMucCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBEZWNvbXByZXNzO1xufSgpKTtcbmV4cG9ydCB7IERlY29tcHJlc3MgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBHWklQLCBabGliLCBvciByYXcgREVGTEFURSBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0RlY29tcHJlc3MgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXN5bmNEZWNvbXByZXNzKG9wdHMsIGNiKSB7XG4gICAgICAgIERlY29tcHJlc3MuY2FsbCh0aGlzLCBvcHRzLCBjYik7XG4gICAgICAgIHRoaXMucXVldWVkU2l6ZSA9IDA7XG4gICAgICAgIHRoaXMuRyA9IEFzeW5jR3VuemlwO1xuICAgICAgICB0aGlzLkkgPSBBc3luY0luZmxhdGU7XG4gICAgICAgIHRoaXMuWiA9IEFzeW5jVW56bGliO1xuICAgIH1cbiAgICBBc3luY0RlY29tcHJlc3MucHJvdG90eXBlLmkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucy5vbmRhdGEgPSBmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICBfdGhpcy5vbmRhdGEoZXJyLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zLm9uZHJhaW4gPSBmdW5jdGlvbiAoc2l6ZSkge1xuICAgICAgICAgICAgX3RoaXMucXVldWVkU2l6ZSAtPSBzaXplO1xuICAgICAgICAgICAgaWYgKF90aGlzLm9uZHJhaW4pXG4gICAgICAgICAgICAgICAgX3RoaXMub25kcmFpbihzaXplKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlY29tcHJlc3NlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBBc3luY0RlY29tcHJlc3MucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHRoaXMucXVldWVkU2l6ZSArPSBjaHVuay5sZW5ndGg7XG4gICAgICAgIERlY29tcHJlc3MucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jRGVjb21wcmVzcztcbn0oKSk7XG5leHBvcnQgeyBBc3luY0RlY29tcHJlc3MgfTtcbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXByZXNzKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIChkYXRhWzBdID09IDMxICYmIGRhdGFbMV0gPT0gMTM5ICYmIGRhdGFbMl0gPT0gOClcbiAgICAgICAgPyBndW56aXAoZGF0YSwgb3B0cywgY2IpXG4gICAgICAgIDogKChkYXRhWzBdICYgMTUpICE9IDggfHwgKGRhdGFbMF0gPj4gNCkgPiA3IHx8ICgoZGF0YVswXSA8PCA4IHwgZGF0YVsxXSkgJSAzMSkpXG4gICAgICAgICAgICA/IGluZmxhdGUoZGF0YSwgb3B0cywgY2IpXG4gICAgICAgICAgICA6IHVuemxpYihkYXRhLCBvcHRzLCBjYik7XG59XG4vKipcbiAqIEV4cGFuZHMgY29tcHJlc3NlZCBHWklQLCBabGliLCBvciByYXcgREVGTEFURSBkYXRhLCBhdXRvbWF0aWNhbGx5IGRldGVjdGluZyB0aGUgZm9ybWF0XG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBkZWNvbXByZXNzXG4gKiBAcGFyYW0gb3B0cyBUaGUgZGVjb21wcmVzc2lvbiBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlY29tcHJlc3NTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICByZXR1cm4gKGRhdGFbMF0gPT0gMzEgJiYgZGF0YVsxXSA9PSAxMzkgJiYgZGF0YVsyXSA9PSA4KVxuICAgICAgICA/IGd1bnppcFN5bmMoZGF0YSwgb3B0cylcbiAgICAgICAgOiAoKGRhdGFbMF0gJiAxNSkgIT0gOCB8fCAoZGF0YVswXSA+PiA0KSA+IDcgfHwgKChkYXRhWzBdIDw8IDggfCBkYXRhWzFdKSAlIDMxKSlcbiAgICAgICAgICAgID8gaW5mbGF0ZVN5bmMoZGF0YSwgb3B0cylcbiAgICAgICAgICAgIDogdW56bGliU3luYyhkYXRhLCBvcHRzKTtcbn1cbi8vIGZsYXR0ZW4gYSBkaXJlY3Rvcnkgc3RydWN0dXJlXG52YXIgZmx0biA9IGZ1bmN0aW9uIChkLCBwLCB0LCBvKSB7XG4gICAgZm9yICh2YXIgayBpbiBkKSB7XG4gICAgICAgIHZhciB2YWwgPSBkW2tdLCBuID0gcCArIGssIG9wID0gbztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSlcbiAgICAgICAgICAgIG9wID0gbXJnKG8sIHZhbFsxXSksIHZhbCA9IHZhbFswXTtcbiAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIHU4KVxuICAgICAgICAgICAgdFtuXSA9IFt2YWwsIG9wXTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0W24gKz0gJy8nXSA9IFtuZXcgdTgoMCksIG9wXTtcbiAgICAgICAgICAgIGZsdG4odmFsLCBuLCB0LCBvKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vLyB0ZXh0IGVuY29kZXJcbnZhciB0ZSA9IHR5cGVvZiBUZXh0RW5jb2RlciAhPSAndW5kZWZpbmVkJyAmJiAvKiNfX1BVUkVfXyovIG5ldyBUZXh0RW5jb2RlcigpO1xuLy8gdGV4dCBkZWNvZGVyXG52YXIgdGQgPSB0eXBlb2YgVGV4dERlY29kZXIgIT0gJ3VuZGVmaW5lZCcgJiYgLyojX19QVVJFX18qLyBuZXcgVGV4dERlY29kZXIoKTtcbi8vIHRleHQgZGVjb2RlciBzdHJlYW1cbnZhciB0ZHMgPSAwO1xudHJ5IHtcbiAgICB0ZC5kZWNvZGUoZXQsIHsgc3RyZWFtOiB0cnVlIH0pO1xuICAgIHRkcyA9IDE7XG59XG5jYXRjaCAoZSkgeyB9XG4vLyBkZWNvZGUgVVRGOFxudmFyIGR1dGY4ID0gZnVuY3Rpb24gKGQpIHtcbiAgICBmb3IgKHZhciByID0gJycsIGkgPSAwOzspIHtcbiAgICAgICAgdmFyIGMgPSBkW2krK107XG4gICAgICAgIHZhciBlYiA9IChjID4gMTI3KSArIChjID4gMjIzKSArIChjID4gMjM5KTtcbiAgICAgICAgaWYgKGkgKyBlYiA+IGQubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHsgczogciwgcjogc2xjKGQsIGkgLSAxKSB9O1xuICAgICAgICBpZiAoIWViKVxuICAgICAgICAgICAgciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGMpO1xuICAgICAgICBlbHNlIGlmIChlYiA9PSAzKSB7XG4gICAgICAgICAgICBjID0gKChjICYgMTUpIDw8IDE4IHwgKGRbaSsrXSAmIDYzKSA8PCAxMiB8IChkW2krK10gJiA2MykgPDwgNiB8IChkW2krK10gJiA2MykpIC0gNjU1MzYsXG4gICAgICAgICAgICAgICAgciArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDU1Mjk2IHwgKGMgPj4gMTApLCA1NjMyMCB8IChjICYgMTAyMykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGViICYgMSlcbiAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDMxKSA8PCA2IHwgKGRbaSsrXSAmIDYzKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgoYyAmIDE1KSA8PCAxMiB8IChkW2krK10gJiA2MykgPDwgNiB8IChkW2krK10gJiA2MykpO1xuICAgIH1cbn07XG4vKipcbiAqIFN0cmVhbWluZyBVVEYtOCBkZWNvZGluZ1xuICovXG52YXIgRGVjb2RlVVRGOCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVVRGLTggZGVjb2Rpbmcgc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZGVjb2RlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIERlY29kZVVURjgoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgaWYgKHRkcylcbiAgICAgICAgICAgIHRoaXMudCA9IG5ldyBUZXh0RGVjb2RlcigpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnAgPSBldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVjb2RlZCBmcm9tIFVURi04IGJpbmFyeVxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBEZWNvZGVVVEY4LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBmaW5hbCA9ICEhZmluYWw7XG4gICAgICAgIGlmICh0aGlzLnQpIHtcbiAgICAgICAgICAgIHRoaXMub25kYXRhKHRoaXMudC5kZWNvZGUoY2h1bmssIHsgc3RyZWFtOiB0cnVlIH0pLCBmaW5hbCk7XG4gICAgICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50LmRlY29kZSgpLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgZXJyKDgpO1xuICAgICAgICAgICAgICAgIHRoaXMudCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnApXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIHZhciBkYXQgPSBuZXcgdTgodGhpcy5wLmxlbmd0aCArIGNodW5rLmxlbmd0aCk7XG4gICAgICAgIGRhdC5zZXQodGhpcy5wKTtcbiAgICAgICAgZGF0LnNldChjaHVuaywgdGhpcy5wLmxlbmd0aCk7XG4gICAgICAgIHZhciBfYSA9IGR1dGY4KGRhdCksIHMgPSBfYS5zLCByID0gX2EucjtcbiAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICBpZiAoci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgZXJyKDgpO1xuICAgICAgICAgICAgdGhpcy5wID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnAgPSByO1xuICAgICAgICB0aGlzLm9uZGF0YShzLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVjb2RlVVRGODtcbn0oKSk7XG5leHBvcnQgeyBEZWNvZGVVVEY4IH07XG4vKipcbiAqIFN0cmVhbWluZyBVVEYtOCBlbmNvZGluZ1xuICovXG52YXIgRW5jb2RlVVRGOCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVVRGLTggZGVjb2Rpbmcgc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGRhdGEgaXMgZW5jb2RlZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEVuY29kZVVURjgoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZW5jb2RlZCB0byBVVEYtOFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgc3RyaW5nIGRhdGEgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBFbmNvZGVVVEY4LnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBpZiAoIXRoaXMub25kYXRhKVxuICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB0aGlzLm9uZGF0YShzdHJUb1U4KGNodW5rKSwgdGhpcy5kID0gZmluYWwgfHwgZmFsc2UpO1xuICAgIH07XG4gICAgcmV0dXJuIEVuY29kZVVURjg7XG59KCkpO1xuZXhwb3J0IHsgRW5jb2RlVVRGOCB9O1xuLyoqXG4gKiBDb252ZXJ0cyBhIHN0cmluZyBpbnRvIGEgVWludDhBcnJheSBmb3IgdXNlIHdpdGggY29tcHJlc3Npb24vZGVjb21wcmVzc2lvbiBtZXRob2RzXG4gKiBAcGFyYW0gc3RyIFRoZSBzdHJpbmcgdG8gZW5jb2RlXG4gKiBAcGFyYW0gbGF0aW4xIFdoZXRoZXIgb3Igbm90IHRvIGludGVycHJldCB0aGUgZGF0YSBhcyBMYXRpbi0xLiBUaGlzIHNob3VsZFxuICogICAgICAgICAgICAgICBub3QgbmVlZCB0byBiZSB0cnVlIHVubGVzcyBkZWNvZGluZyBhIGJpbmFyeSBzdHJpbmcuXG4gKiBAcmV0dXJucyBUaGUgc3RyaW5nIGVuY29kZWQgaW4gVVRGLTgvTGF0aW4tMSBiaW5hcnlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0clRvVTgoc3RyLCBsYXRpbjEpIHtcbiAgICBpZiAobGF0aW4xKSB7XG4gICAgICAgIHZhciBhcl8xID0gbmV3IHU4KHN0ci5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSlcbiAgICAgICAgICAgIGFyXzFbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgcmV0dXJuIGFyXzE7XG4gICAgfVxuICAgIGlmICh0ZSlcbiAgICAgICAgcmV0dXJuIHRlLmVuY29kZShzdHIpO1xuICAgIHZhciBsID0gc3RyLmxlbmd0aDtcbiAgICB2YXIgYXIgPSBuZXcgdTgoc3RyLmxlbmd0aCArIChzdHIubGVuZ3RoID4+IDEpKTtcbiAgICB2YXIgYWkgPSAwO1xuICAgIHZhciB3ID0gZnVuY3Rpb24gKHYpIHsgYXJbYWkrK10gPSB2OyB9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgKytpKSB7XG4gICAgICAgIGlmIChhaSArIDUgPiBhci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBuID0gbmV3IHU4KGFpICsgOCArICgobCAtIGkpIDw8IDEpKTtcbiAgICAgICAgICAgIG4uc2V0KGFyKTtcbiAgICAgICAgICAgIGFyID0gbjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8IDEyOCB8fCBsYXRpbjEpXG4gICAgICAgICAgICB3KGMpO1xuICAgICAgICBlbHNlIGlmIChjIDwgMjA0OClcbiAgICAgICAgICAgIHcoMTkyIHwgKGMgPj4gNikpLCB3KDEyOCB8IChjICYgNjMpKTtcbiAgICAgICAgZWxzZSBpZiAoYyA+IDU1Mjk1ICYmIGMgPCA1NzM0NClcbiAgICAgICAgICAgIGMgPSA2NTUzNiArIChjICYgMTAyMyA8PCAxMCkgfCAoc3RyLmNoYXJDb2RlQXQoKytpKSAmIDEwMjMpLFxuICAgICAgICAgICAgICAgIHcoMjQwIHwgKGMgPj4gMTgpKSwgdygxMjggfCAoKGMgPj4gMTIpICYgNjMpKSwgdygxMjggfCAoKGMgPj4gNikgJiA2MykpLCB3KDEyOCB8IChjICYgNjMpKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdygyMjQgfCAoYyA+PiAxMikpLCB3KDEyOCB8ICgoYyA+PiA2KSAmIDYzKSksIHcoMTI4IHwgKGMgJiA2MykpO1xuICAgIH1cbiAgICByZXR1cm4gc2xjKGFyLCAwLCBhaSk7XG59XG4vKipcbiAqIENvbnZlcnRzIGEgVWludDhBcnJheSB0byBhIHN0cmluZ1xuICogQHBhcmFtIGRhdCBUaGUgZGF0YSB0byBkZWNvZGUgdG8gc3RyaW5nXG4gKiBAcGFyYW0gbGF0aW4xIFdoZXRoZXIgb3Igbm90IHRvIGludGVycHJldCB0aGUgZGF0YSBhcyBMYXRpbi0xLiBUaGlzIHNob3VsZFxuICogICAgICAgICAgICAgICBub3QgbmVlZCB0byBiZSB0cnVlIHVubGVzcyBlbmNvZGluZyB0byBiaW5hcnkgc3RyaW5nLlxuICogQHJldHVybnMgVGhlIG9yaWdpbmFsIFVURi04L0xhdGluLTEgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJGcm9tVTgoZGF0LCBsYXRpbjEpIHtcbiAgICBpZiAobGF0aW4xKSB7XG4gICAgICAgIHZhciByID0gJyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0Lmxlbmd0aDsgaSArPSAxNjM4NClcbiAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBkYXQuc3ViYXJyYXkoaSwgaSArIDE2Mzg0KSk7XG4gICAgICAgIHJldHVybiByO1xuICAgIH1cbiAgICBlbHNlIGlmICh0ZCkge1xuICAgICAgICByZXR1cm4gdGQuZGVjb2RlKGRhdCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgX2EgPSBkdXRmOChkYXQpLCBzID0gX2EucywgciA9IF9hLnI7XG4gICAgICAgIGlmIChyLmxlbmd0aClcbiAgICAgICAgICAgIGVycig4KTtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxufVxuO1xuLy8gZGVmbGF0ZSBiaXQgZmxhZ1xudmFyIGRiZiA9IGZ1bmN0aW9uIChsKSB7IHJldHVybiBsID09IDEgPyAzIDogbCA8IDYgPyAyIDogbCA9PSA5ID8gMSA6IDA7IH07XG4vLyBza2lwIGxvY2FsIHppcCBoZWFkZXJcbnZhciBzbHpoID0gZnVuY3Rpb24gKGQsIGIpIHsgcmV0dXJuIGIgKyAzMCArIGIyKGQsIGIgKyAyNikgKyBiMihkLCBiICsgMjgpOyB9O1xuLy8gcmVhZCB6aXAgaGVhZGVyXG52YXIgemggPSBmdW5jdGlvbiAoZCwgYiwgeikge1xuICAgIHZhciBmbmwgPSBiMihkLCBiICsgMjgpLCBmbiA9IHN0ckZyb21VOChkLnN1YmFycmF5KGIgKyA0NiwgYiArIDQ2ICsgZm5sKSwgIShiMihkLCBiICsgOCkgJiAyMDQ4KSksIGVzID0gYiArIDQ2ICsgZm5sLCBicyA9IGI0KGQsIGIgKyAyMCk7XG4gICAgdmFyIF9hID0geiAmJiBicyA9PSA0Mjk0OTY3Mjk1ID8gejY0ZShkLCBlcykgOiBbYnMsIGI0KGQsIGIgKyAyNCksIGI0KGQsIGIgKyA0MildLCBzYyA9IF9hWzBdLCBzdSA9IF9hWzFdLCBvZmYgPSBfYVsyXTtcbiAgICByZXR1cm4gW2IyKGQsIGIgKyAxMCksIHNjLCBzdSwgZm4sIGVzICsgYjIoZCwgYiArIDMwKSArIGIyKGQsIGIgKyAzMiksIG9mZl07XG59O1xuLy8gcmVhZCB6aXA2NCBleHRyYSBmaWVsZFxudmFyIHo2NGUgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAoOyBiMihkLCBiKSAhPSAxOyBiICs9IDQgKyBiMihkLCBiICsgMikpXG4gICAgICAgIDtcbiAgICByZXR1cm4gW2I4KGQsIGIgKyAxMiksIGI4KGQsIGIgKyA0KSwgYjgoZCwgYiArIDIwKV07XG59O1xuLy8gZXh0cmEgZmllbGQgbGVuZ3RoXG52YXIgZXhmbCA9IGZ1bmN0aW9uIChleCkge1xuICAgIHZhciBsZSA9IDA7XG4gICAgaWYgKGV4KSB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gZXgpIHtcbiAgICAgICAgICAgIHZhciBsID0gZXhba10ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGwgPiA2NTUzNSlcbiAgICAgICAgICAgICAgICBlcnIoOSk7XG4gICAgICAgICAgICBsZSArPSBsICsgNDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGU7XG59O1xuLy8gd3JpdGUgemlwIGhlYWRlclxudmFyIHd6aCA9IGZ1bmN0aW9uIChkLCBiLCBmLCBmbiwgdSwgYywgY2UsIGNvKSB7XG4gICAgdmFyIGZsID0gZm4ubGVuZ3RoLCBleCA9IGYuZXh0cmEsIGNvbCA9IGNvICYmIGNvLmxlbmd0aDtcbiAgICB2YXIgZXhsID0gZXhmbChleCk7XG4gICAgd2J5dGVzKGQsIGIsIGNlICE9IG51bGwgPyAweDIwMTRCNTAgOiAweDQwMzRCNTApLCBiICs9IDQ7XG4gICAgaWYgKGNlICE9IG51bGwpXG4gICAgICAgIGRbYisrXSA9IDIwLCBkW2IrK10gPSBmLm9zO1xuICAgIGRbYl0gPSAyMCwgYiArPSAyOyAvLyBzcGVjIGNvbXBsaWFuY2U/IHdoYXQncyB0aGF0P1xuICAgIGRbYisrXSA9IChmLmZsYWcgPDwgMSkgfCAoYyA8IDAgJiYgOCksIGRbYisrXSA9IHUgJiYgODtcbiAgICBkW2IrK10gPSBmLmNvbXByZXNzaW9uICYgMjU1LCBkW2IrK10gPSBmLmNvbXByZXNzaW9uID4+IDg7XG4gICAgdmFyIGR0ID0gbmV3IERhdGUoZi5tdGltZSA9PSBudWxsID8gRGF0ZS5ub3coKSA6IGYubXRpbWUpLCB5ID0gZHQuZ2V0RnVsbFllYXIoKSAtIDE5ODA7XG4gICAgaWYgKHkgPCAwIHx8IHkgPiAxMTkpXG4gICAgICAgIGVycigxMCk7XG4gICAgd2J5dGVzKGQsIGIsICh5IDw8IDI1KSB8ICgoZHQuZ2V0TW9udGgoKSArIDEpIDw8IDIxKSB8IChkdC5nZXREYXRlKCkgPDwgMTYpIHwgKGR0LmdldEhvdXJzKCkgPDwgMTEpIHwgKGR0LmdldE1pbnV0ZXMoKSA8PCA1KSB8IChkdC5nZXRTZWNvbmRzKCkgPj4gMSkpLCBiICs9IDQ7XG4gICAgaWYgKGMgIT0gLTEpIHtcbiAgICAgICAgd2J5dGVzKGQsIGIsIGYuY3JjKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyA0LCBjIDwgMCA/IC1jIC0gMiA6IGMpO1xuICAgICAgICB3Ynl0ZXMoZCwgYiArIDgsIGYuc2l6ZSk7XG4gICAgfVxuICAgIHdieXRlcyhkLCBiICsgMTIsIGZsKTtcbiAgICB3Ynl0ZXMoZCwgYiArIDE0LCBleGwpLCBiICs9IDE2O1xuICAgIGlmIChjZSAhPSBudWxsKSB7XG4gICAgICAgIHdieXRlcyhkLCBiLCBjb2wpO1xuICAgICAgICB3Ynl0ZXMoZCwgYiArIDYsIGYuYXR0cnMpO1xuICAgICAgICB3Ynl0ZXMoZCwgYiArIDEwLCBjZSksIGIgKz0gMTQ7XG4gICAgfVxuICAgIGQuc2V0KGZuLCBiKTtcbiAgICBiICs9IGZsO1xuICAgIGlmIChleGwpIHtcbiAgICAgICAgZm9yICh2YXIgayBpbiBleCkge1xuICAgICAgICAgICAgdmFyIGV4ZiA9IGV4W2tdLCBsID0gZXhmLmxlbmd0aDtcbiAgICAgICAgICAgIHdieXRlcyhkLCBiLCArayk7XG4gICAgICAgICAgICB3Ynl0ZXMoZCwgYiArIDIsIGwpO1xuICAgICAgICAgICAgZC5zZXQoZXhmLCBiICsgNCksIGIgKz0gNCArIGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbClcbiAgICAgICAgZC5zZXQoY28sIGIpLCBiICs9IGNvbDtcbiAgICByZXR1cm4gYjtcbn07XG4vLyB3cml0ZSB6aXAgZm9vdGVyIChlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkpXG52YXIgd3pmID0gZnVuY3Rpb24gKG8sIGIsIGMsIGQsIGUpIHtcbiAgICB3Ynl0ZXMobywgYiwgMHg2MDU0QjUwKTsgLy8gc2tpcCBkaXNrXG4gICAgd2J5dGVzKG8sIGIgKyA4LCBjKTtcbiAgICB3Ynl0ZXMobywgYiArIDEwLCBjKTtcbiAgICB3Ynl0ZXMobywgYiArIDEyLCBkKTtcbiAgICB3Ynl0ZXMobywgYiArIDE2LCBlKTtcbn07XG4vKipcbiAqIEEgcGFzcy10aHJvdWdoIHN0cmVhbSB0byBrZWVwIGRhdGEgdW5jb21wcmVzc2VkIGluIGEgWklQIGFyY2hpdmUuXG4gKi9cbnZhciBaaXBQYXNzVGhyb3VnaCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcGFzcy10aHJvdWdoIHN0cmVhbSB0aGF0IGNhbiBiZSBhZGRlZCB0byBaSVAgYXJjaGl2ZXNcbiAgICAgKiBAcGFyYW0gZmlsZW5hbWUgVGhlIGZpbGVuYW1lIHRvIGFzc29jaWF0ZSB3aXRoIHRoaXMgZGF0YSBzdHJlYW1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBaaXBQYXNzVGhyb3VnaChmaWxlbmFtZSkge1xuICAgICAgICB0aGlzLmZpbGVuYW1lID0gZmlsZW5hbWU7XG4gICAgICAgIHRoaXMuYyA9IGNyYygpO1xuICAgICAgICB0aGlzLnNpemUgPSAwO1xuICAgICAgICB0aGlzLmNvbXByZXNzaW9uID0gMDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIGEgY2h1bmsgYW5kIHB1c2hlcyB0byB0aGUgb3V0cHV0IHN0cmVhbS4gWW91IGNhbiBvdmVycmlkZSB0aGlzXG4gICAgICogbWV0aG9kIGluIGEgc3ViY2xhc3MgZm9yIGN1c3RvbSBiZWhhdmlvciwgYnV0IGJ5IGRlZmF1bHQgdGhpcyBwYXNzZXNcbiAgICAgKiB0aGUgZGF0YSB0aHJvdWdoLiBZb3UgbXVzdCBjYWxsIHRoaXMub25kYXRhKGVyciwgY2h1bmssIGZpbmFsKSBhdCBzb21lXG4gICAgICogcG9pbnQgaW4gdGhpcyBtZXRob2QuXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwcm9jZXNzXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFppcFBhc3NUaHJvdWdoLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0aGlzLm9uZGF0YShudWxsLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgYWRkZWQuIElmIHlvdSBhcmUgc3ViY2xhc3NpbmcgdGhpcyB3aXRoIGEgY3VzdG9tXG4gICAgICogY29tcHJlc3Npb24gYWxnb3JpdGhtLCBub3RlIHRoYXQgeW91IG11c3QgcHVzaCBkYXRhIGZyb20gdGhlIHNvdXJjZVxuICAgICAqIGZpbGUgb25seSwgcHJlLWNvbXByZXNzaW9uLlxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBaaXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgdGhpcy5jLnAoY2h1bmspO1xuICAgICAgICB0aGlzLnNpemUgKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgICBpZiAoZmluYWwpXG4gICAgICAgICAgICB0aGlzLmNyYyA9IHRoaXMuYy5kKCk7XG4gICAgICAgIHRoaXMucHJvY2VzcyhjaHVuaywgZmluYWwgfHwgZmFsc2UpO1xuICAgIH07XG4gICAgcmV0dXJuIFppcFBhc3NUaHJvdWdoO1xufSgpKTtcbmV4cG9ydCB7IFppcFBhc3NUaHJvdWdoIH07XG4vLyBJIGRvbid0IGV4dGVuZCBiZWNhdXNlIFR5cGVTY3JpcHQgZXh0ZW5zaW9uIGFkZHMgMWtCIG9mIHJ1bnRpbWUgYmxvYXRcbi8qKlxuICogU3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlcy4gUHJlZmVyIHVzaW5nIEFzeW5jWmlwRGVmbGF0ZVxuICogZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICovXG52YXIgWmlwRGVmbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgREVGTEFURSBzdHJlYW0gdGhhdCBjYW4gYmUgYWRkZWQgdG8gWklQIGFyY2hpdmVzXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFRoZSBmaWxlbmFtZSB0byBhc3NvY2lhdGUgd2l0aCB0aGlzIGRhdGEgc3RyZWFtXG4gICAgICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBaaXBEZWZsYXRlKGZpbGVuYW1lLCBvcHRzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghb3B0cylcbiAgICAgICAgICAgIG9wdHMgPSB7fTtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2guY2FsbCh0aGlzLCBmaWxlbmFtZSk7XG4gICAgICAgIHRoaXMuZCA9IG5ldyBEZWZsYXRlKG9wdHMsIGZ1bmN0aW9uIChkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICBfdGhpcy5vbmRhdGEobnVsbCwgZGF0LCBmaW5hbCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbXByZXNzaW9uID0gODtcbiAgICAgICAgdGhpcy5mbGFnID0gZGJmKG9wdHMubGV2ZWwpO1xuICAgIH1cbiAgICBaaXBEZWZsYXRlLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5vbmRhdGEoZSwgbnVsbCwgZmluYWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWZsYXRlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBaaXBEZWZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBaaXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gWmlwRGVmbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBaaXBEZWZsYXRlIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgREVGTEFURSBjb21wcmVzc2lvbiBmb3IgWklQIGFyY2hpdmVzXG4gKi9cbnZhciBBc3luY1ppcERlZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBhc3luY2hyb25vdXMgREVGTEFURSBzdHJlYW0gdGhhdCBjYW4gYmUgYWRkZWQgdG8gWklQIGFyY2hpdmVzXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFRoZSBmaWxlbmFtZSB0byBhc3NvY2lhdGUgd2l0aCB0aGlzIGRhdGEgc3RyZWFtXG4gICAgICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBc3luY1ppcERlZmxhdGUoZmlsZW5hbWUsIG9wdHMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCFvcHRzKVxuICAgICAgICAgICAgb3B0cyA9IHt9O1xuICAgICAgICBaaXBQYXNzVGhyb3VnaC5jYWxsKHRoaXMsIGZpbGVuYW1lKTtcbiAgICAgICAgdGhpcy5kID0gbmV3IEFzeW5jRGVmbGF0ZShvcHRzLCBmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICBfdGhpcy5vbmRhdGEoZXJyLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29tcHJlc3Npb24gPSA4O1xuICAgICAgICB0aGlzLmZsYWcgPSBkYmYob3B0cy5sZXZlbCk7XG4gICAgICAgIHRoaXMudGVybWluYXRlID0gdGhpcy5kLnRlcm1pbmF0ZTtcbiAgICB9XG4gICAgQXN5bmNaaXBEZWZsYXRlLnByb3RvdHlwZS5wcm9jZXNzID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0aGlzLmQucHVzaChjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVmbGF0ZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgQXN5bmNaaXBEZWZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICBaaXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gQXN5bmNaaXBEZWZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jWmlwRGVmbGF0ZSB9O1xuLy8gVE9ETzogQmV0dGVyIHRyZWUgc2hha2luZ1xuLyoqXG4gKiBBIHppcHBhYmxlIGFyY2hpdmUgdG8gd2hpY2ggZmlsZXMgY2FuIGluY3JlbWVudGFsbHkgYmUgYWRkZWRcbiAqL1xudmFyIFppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGVtcHR5IFpJUCBhcmNoaXZlIHRvIHdoaWNoIGZpbGVzIGNhbiBiZSBhZGRlZFxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGZvciB0aGUgZ2VuZXJhdGVkIFpJUCBhcmNoaXZlXG4gICAgICogICAgICAgICAgIGlzIGF2YWlsYWJsZVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFppcChjYikge1xuICAgICAgICB0aGlzLm9uZGF0YSA9IGNiO1xuICAgICAgICB0aGlzLnUgPSBbXTtcbiAgICAgICAgdGhpcy5kID0gMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGZpbGUgdG8gdGhlIFpJUCBhcmNoaXZlXG4gICAgICogQHBhcmFtIGZpbGUgVGhlIGZpbGUgc3RyZWFtIHRvIGFkZFxuICAgICAqL1xuICAgIFppcC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGZpbGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgLy8gZmluaXNoaW5nIG9yIGZpbmlzaGVkXG4gICAgICAgIGlmICh0aGlzLmQgJiAyKVxuICAgICAgICAgICAgdGhpcy5vbmRhdGEoZXJyKDQgKyAodGhpcy5kICYgMSkgKiA4LCAwLCAxKSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmID0gc3RyVG9VOChmaWxlLmZpbGVuYW1lKSwgZmxfMSA9IGYubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvbSA9IGZpbGUuY29tbWVudCwgbyA9IGNvbSAmJiBzdHJUb1U4KGNvbSk7XG4gICAgICAgICAgICB2YXIgdSA9IGZsXzEgIT0gZmlsZS5maWxlbmFtZS5sZW5ndGggfHwgKG8gJiYgKGNvbS5sZW5ndGggIT0gby5sZW5ndGgpKTtcbiAgICAgICAgICAgIHZhciBobF8xID0gZmxfMSArIGV4ZmwoZmlsZS5leHRyYSkgKyAzMDtcbiAgICAgICAgICAgIGlmIChmbF8xID4gNjU1MzUpXG4gICAgICAgICAgICAgICAgdGhpcy5vbmRhdGEoZXJyKDExLCAwLCAxKSwgbnVsbCwgZmFsc2UpO1xuICAgICAgICAgICAgdmFyIGhlYWRlciA9IG5ldyB1OChobF8xKTtcbiAgICAgICAgICAgIHd6aChoZWFkZXIsIDAsIGZpbGUsIGYsIHUsIC0xKTtcbiAgICAgICAgICAgIHZhciBjaGtzXzEgPSBbaGVhZGVyXTtcbiAgICAgICAgICAgIHZhciBwQWxsXzEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBjaGtzXzIgPSBjaGtzXzE7IF9pIDwgY2hrc18yLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hrID0gY2hrc18yW19pXTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub25kYXRhKG51bGwsIGNoaywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjaGtzXzEgPSBbXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgdHJfMSA9IHRoaXMuZDtcbiAgICAgICAgICAgIHRoaXMuZCA9IDA7XG4gICAgICAgICAgICB2YXIgaW5kXzEgPSB0aGlzLnUubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHVmXzEgPSBtcmcoZmlsZSwge1xuICAgICAgICAgICAgICAgIGY6IGYsXG4gICAgICAgICAgICAgICAgdTogdSxcbiAgICAgICAgICAgICAgICBvOiBvLFxuICAgICAgICAgICAgICAgIHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbGUudGVybWluYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZS50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcEFsbF8xKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cl8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbnh0ID0gX3RoaXMudVtpbmRfMSArIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG54dClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBueHQucigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRyXzEgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGNsXzEgPSAwO1xuICAgICAgICAgICAgZmlsZS5vbmRhdGEgPSBmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5vbmRhdGEoZXJyLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudGVybWluYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbF8xICs9IGRhdC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGNoa3NfMS5wdXNoKGRhdCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRkID0gbmV3IHU4KDE2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdieXRlcyhkZCwgMCwgMHg4MDc0QjUwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdieXRlcyhkZCwgNCwgZmlsZS5jcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2J5dGVzKGRkLCA4LCBjbF8xKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdieXRlcyhkZCwgMTIsIGZpbGUuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjaGtzXzEucHVzaChkZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB1Zl8xLmMgPSBjbF8xLCB1Zl8xLmIgPSBobF8xICsgY2xfMSArIDE2LCB1Zl8xLmNyYyA9IGZpbGUuY3JjLCB1Zl8xLnNpemUgPSBmaWxlLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHJfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1Zl8xLnIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyXzEgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRyXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICBwQWxsXzEoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy51LnB1c2godWZfMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEVuZHMgdGhlIHByb2Nlc3Mgb2YgYWRkaW5nIGZpbGVzIGFuZCBwcmVwYXJlcyB0byBlbWl0IHRoZSBmaW5hbCBjaHVua3MuXG4gICAgICogVGhpcyAqbXVzdCogYmUgY2FsbGVkIGFmdGVyIGFkZGluZyBhbGwgZGVzaXJlZCBmaWxlcyBmb3IgdGhlIHJlc3VsdGluZ1xuICAgICAqIFpJUCBmaWxlIHRvIHdvcmsgcHJvcGVybHkuXG4gICAgICovXG4gICAgWmlwLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmQgJiAyKSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YShlcnIoNCArICh0aGlzLmQgJiAxKSAqIDgsIDAsIDEpLCBudWxsLCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgdGhpcy5lKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMudS5wdXNoKHtcbiAgICAgICAgICAgICAgICByOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghKF90aGlzLmQgJiAxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMudS5zcGxpY2UoLTEsIDEpO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5lKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0OiBmdW5jdGlvbiAoKSB7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLmQgPSAzO1xuICAgIH07XG4gICAgWmlwLnByb3RvdHlwZS5lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYnQgPSAwLCBsID0gMCwgdGwgPSAwO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy51OyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGYgPSBfYVtfaV07XG4gICAgICAgICAgICB0bCArPSA0NiArIGYuZi5sZW5ndGggKyBleGZsKGYuZXh0cmEpICsgKGYubyA/IGYuby5sZW5ndGggOiAwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3V0ID0gbmV3IHU4KHRsICsgMjIpO1xuICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gdGhpcy51OyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgdmFyIGYgPSBfY1tfYl07XG4gICAgICAgICAgICB3emgob3V0LCBidCwgZiwgZi5mLCBmLnUsIC1mLmMgLSAyLCBsLCBmLm8pO1xuICAgICAgICAgICAgYnQgKz0gNDYgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKSArIChmLm8gPyBmLm8ubGVuZ3RoIDogMCksIGwgKz0gZi5iO1xuICAgICAgICB9XG4gICAgICAgIHd6ZihvdXQsIGJ0LCB0aGlzLnUubGVuZ3RoLCB0bCwgbCk7XG4gICAgICAgIHRoaXMub25kYXRhKG51bGwsIG91dCwgdHJ1ZSk7XG4gICAgICAgIHRoaXMuZCA9IDI7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBBIG1ldGhvZCB0byB0ZXJtaW5hdGUgYW55IGludGVybmFsIHdvcmtlcnMgdXNlZCBieSB0aGUgc3RyZWFtLiBTdWJzZXF1ZW50XG4gICAgICogY2FsbHMgdG8gYWRkKCkgd2lsbCBmYWlsLlxuICAgICAqL1xuICAgIFppcC5wcm90b3R5cGUudGVybWluYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy51OyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGYgPSBfYVtfaV07XG4gICAgICAgICAgICBmLnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmQgPSAyO1xuICAgIH07XG4gICAgcmV0dXJuIFppcDtcbn0oKSk7XG5leHBvcnQgeyBaaXAgfTtcbmV4cG9ydCBmdW5jdGlvbiB6aXAoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICB2YXIgciA9IHt9O1xuICAgIGZsdG4oZGF0YSwgJycsIHIsIG9wdHMpO1xuICAgIHZhciBrID0gT2JqZWN0LmtleXMocik7XG4gICAgdmFyIGxmdCA9IGsubGVuZ3RoLCBvID0gMCwgdG90ID0gMDtcbiAgICB2YXIgc2xmdCA9IGxmdCwgZmlsZXMgPSBuZXcgQXJyYXkobGZ0KTtcbiAgICB2YXIgdGVybSA9IFtdO1xuICAgIHZhciB0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlcm0ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICB0ZXJtW2ldKCk7XG4gICAgfTtcbiAgICB2YXIgY2JkID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgbXQoZnVuY3Rpb24gKCkgeyBjYihhLCBiKTsgfSk7XG4gICAgfTtcbiAgICBtdChmdW5jdGlvbiAoKSB7IGNiZCA9IGNiOyB9KTtcbiAgICB2YXIgY2JmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3V0ID0gbmV3IHU4KHRvdCArIDIyKSwgb2UgPSBvLCBjZGwgPSB0b3QgLSBvO1xuICAgICAgICB0b3QgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsZnQ7ICsraSkge1xuICAgICAgICAgICAgdmFyIGYgPSBmaWxlc1tpXTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBmLmMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHd6aChvdXQsIHRvdCwgZiwgZi5mLCBmLnUsIGwpO1xuICAgICAgICAgICAgICAgIHZhciBiYWRkID0gMzAgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKTtcbiAgICAgICAgICAgICAgICB2YXIgbG9jID0gdG90ICsgYmFkZDtcbiAgICAgICAgICAgICAgICBvdXQuc2V0KGYuYywgbG9jKTtcbiAgICAgICAgICAgICAgICB3emgob3V0LCBvLCBmLCBmLmYsIGYudSwgbCwgdG90LCBmLm0pLCBvICs9IDE2ICsgYmFkZCArIChmLm0gPyBmLm0ubGVuZ3RoIDogMCksIHRvdCA9IGxvYyArIGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYmQoZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgd3pmKG91dCwgbywgZmlsZXMubGVuZ3RoLCBjZGwsIG9lKTtcbiAgICAgICAgY2JkKG51bGwsIG91dCk7XG4gICAgfTtcbiAgICBpZiAoIWxmdClcbiAgICAgICAgY2JmKCk7XG4gICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICB2YXIgZm4gPSBrW2ldO1xuICAgICAgICB2YXIgX2EgPSByW2ZuXSwgZmlsZSA9IF9hWzBdLCBwID0gX2FbMV07XG4gICAgICAgIHZhciBjID0gY3JjKCksIHNpemUgPSBmaWxlLmxlbmd0aDtcbiAgICAgICAgYy5wKGZpbGUpO1xuICAgICAgICB2YXIgZiA9IHN0clRvVTgoZm4pLCBzID0gZi5sZW5ndGg7XG4gICAgICAgIHZhciBjb20gPSBwLmNvbW1lbnQsIG0gPSBjb20gJiYgc3RyVG9VOChjb20pLCBtcyA9IG0gJiYgbS5sZW5ndGg7XG4gICAgICAgIHZhciBleGwgPSBleGZsKHAuZXh0cmEpO1xuICAgICAgICB2YXIgY29tcHJlc3Npb24gPSBwLmxldmVsID09IDAgPyAwIDogODtcbiAgICAgICAgdmFyIGNibCA9IGZ1bmN0aW9uIChlLCBkKSB7XG4gICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgIHRBbGwoKTtcbiAgICAgICAgICAgICAgICBjYmQoZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbCA9IGQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZpbGVzW2ldID0gbXJnKHAsIHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgY3JjOiBjLmQoKSxcbiAgICAgICAgICAgICAgICAgICAgYzogZCxcbiAgICAgICAgICAgICAgICAgICAgZjogZixcbiAgICAgICAgICAgICAgICAgICAgbTogbSxcbiAgICAgICAgICAgICAgICAgICAgdTogcyAhPSBmbi5sZW5ndGggfHwgKG0gJiYgKGNvbS5sZW5ndGggIT0gbXMpKSxcbiAgICAgICAgICAgICAgICAgICAgY29tcHJlc3Npb246IGNvbXByZXNzaW9uXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbyArPSAzMCArIHMgKyBleGwgKyBsO1xuICAgICAgICAgICAgICAgIHRvdCArPSA3NiArIDIgKiAocyArIGV4bCkgKyAobXMgfHwgMCkgKyBsO1xuICAgICAgICAgICAgICAgIGlmICghLS1sZnQpXG4gICAgICAgICAgICAgICAgICAgIGNiZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBpZiAocyA+IDY1NTM1KVxuICAgICAgICAgICAgY2JsKGVycigxMSwgMCwgMSksIG51bGwpO1xuICAgICAgICBpZiAoIWNvbXByZXNzaW9uKVxuICAgICAgICAgICAgY2JsKG51bGwsIGZpbGUpO1xuICAgICAgICBlbHNlIGlmIChzaXplIDwgMTYwMDAwKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNibChudWxsLCBkZWZsYXRlU3luYyhmaWxlLCBwKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNibChlLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0ZXJtLnB1c2goZGVmbGF0ZShmaWxlLCBwLCBjYmwpKTtcbiAgICB9O1xuICAgIC8vIENhbm5vdCB1c2UgbGZ0IGJlY2F1c2UgaXQgY2FuIGRlY3JlYXNlXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGZ0OyArK2kpIHtcbiAgICAgICAgX2xvb3BfMShpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRBbGw7XG59XG4vKipcbiAqIFN5bmNocm9ub3VzbHkgY3JlYXRlcyBhIFpJUCBmaWxlLiBQcmVmZXIgdXNpbmcgYHppcGAgZm9yIGJldHRlciBwZXJmb3JtYW5jZVxuICogd2l0aCBtb3JlIHRoYW4gb25lIGZpbGUuXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGlyZWN0b3J5IHN0cnVjdHVyZSBmb3IgdGhlIFpJUCBhcmNoaXZlXG4gKiBAcGFyYW0gb3B0cyBUaGUgbWFpbiBvcHRpb25zLCBtZXJnZWQgd2l0aCBwZXItZmlsZSBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZ2VuZXJhdGVkIFpJUCBhcmNoaXZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB6aXBTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpXG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB2YXIgciA9IHt9O1xuICAgIHZhciBmaWxlcyA9IFtdO1xuICAgIGZsdG4oZGF0YSwgJycsIHIsIG9wdHMpO1xuICAgIHZhciBvID0gMDtcbiAgICB2YXIgdG90ID0gMDtcbiAgICBmb3IgKHZhciBmbiBpbiByKSB7XG4gICAgICAgIHZhciBfYSA9IHJbZm5dLCBmaWxlID0gX2FbMF0sIHAgPSBfYVsxXTtcbiAgICAgICAgdmFyIGNvbXByZXNzaW9uID0gcC5sZXZlbCA9PSAwID8gMCA6IDg7XG4gICAgICAgIHZhciBmID0gc3RyVG9VOChmbiksIHMgPSBmLmxlbmd0aDtcbiAgICAgICAgdmFyIGNvbSA9IHAuY29tbWVudCwgbSA9IGNvbSAmJiBzdHJUb1U4KGNvbSksIG1zID0gbSAmJiBtLmxlbmd0aDtcbiAgICAgICAgdmFyIGV4bCA9IGV4ZmwocC5leHRyYSk7XG4gICAgICAgIGlmIChzID4gNjU1MzUpXG4gICAgICAgICAgICBlcnIoMTEpO1xuICAgICAgICB2YXIgZCA9IGNvbXByZXNzaW9uID8gZGVmbGF0ZVN5bmMoZmlsZSwgcCkgOiBmaWxlLCBsID0gZC5sZW5ndGg7XG4gICAgICAgIHZhciBjID0gY3JjKCk7XG4gICAgICAgIGMucChmaWxlKTtcbiAgICAgICAgZmlsZXMucHVzaChtcmcocCwge1xuICAgICAgICAgICAgc2l6ZTogZmlsZS5sZW5ndGgsXG4gICAgICAgICAgICBjcmM6IGMuZCgpLFxuICAgICAgICAgICAgYzogZCxcbiAgICAgICAgICAgIGY6IGYsXG4gICAgICAgICAgICBtOiBtLFxuICAgICAgICAgICAgdTogcyAhPSBmbi5sZW5ndGggfHwgKG0gJiYgKGNvbS5sZW5ndGggIT0gbXMpKSxcbiAgICAgICAgICAgIG86IG8sXG4gICAgICAgICAgICBjb21wcmVzc2lvbjogY29tcHJlc3Npb25cbiAgICAgICAgfSkpO1xuICAgICAgICBvICs9IDMwICsgcyArIGV4bCArIGw7XG4gICAgICAgIHRvdCArPSA3NiArIDIgKiAocyArIGV4bCkgKyAobXMgfHwgMCkgKyBsO1xuICAgIH1cbiAgICB2YXIgb3V0ID0gbmV3IHU4KHRvdCArIDIyKSwgb2UgPSBvLCBjZGwgPSB0b3QgLSBvO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGYgPSBmaWxlc1tpXTtcbiAgICAgICAgd3poKG91dCwgZi5vLCBmLCBmLmYsIGYudSwgZi5jLmxlbmd0aCk7XG4gICAgICAgIHZhciBiYWRkID0gMzAgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKTtcbiAgICAgICAgb3V0LnNldChmLmMsIGYubyArIGJhZGQpO1xuICAgICAgICB3emgob3V0LCBvLCBmLCBmLmYsIGYudSwgZi5jLmxlbmd0aCwgZi5vLCBmLm0pLCBvICs9IDE2ICsgYmFkZCArIChmLm0gPyBmLm0ubGVuZ3RoIDogMCk7XG4gICAgfVxuICAgIHd6ZihvdXQsIG8sIGZpbGVzLmxlbmd0aCwgY2RsLCBvZSk7XG4gICAgcmV0dXJuIG91dDtcbn1cbi8qKlxuICogU3RyZWFtaW5nIHBhc3MtdGhyb3VnaCBkZWNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXNcbiAqL1xudmFyIFVuemlwUGFzc1Rocm91Z2ggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVW56aXBQYXNzVGhyb3VnaCgpIHtcbiAgICB9XG4gICAgVW56aXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBmaW5hbCkge1xuICAgICAgICB0aGlzLm9uZGF0YShudWxsLCBkYXRhLCBmaW5hbCk7XG4gICAgfTtcbiAgICBVbnppcFBhc3NUaHJvdWdoLmNvbXByZXNzaW9uID0gMDtcbiAgICByZXR1cm4gVW56aXBQYXNzVGhyb3VnaDtcbn0oKSk7XG5leHBvcnQgeyBVbnppcFBhc3NUaHJvdWdoIH07XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlcy4gUHJlZmVyIEFzeW5jWmlwSW5mbGF0ZSBmb3JcbiAqIGJldHRlciBwZXJmb3JtYW5jZS5cbiAqL1xudmFyIFVuemlwSW5mbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgREVGTEFURSBkZWNvbXByZXNzaW9uIHRoYXQgY2FuIGJlIHVzZWQgaW4gWklQIGFyY2hpdmVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gVW56aXBJbmZsYXRlKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmkgPSBuZXcgSW5mbGF0ZShmdW5jdGlvbiAoZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgX3RoaXMub25kYXRhKG51bGwsIGRhdCwgZmluYWwpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgVW56aXBJbmZsYXRlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGRhdGEsIGZpbmFsKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLmkucHVzaChkYXRhLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMub25kYXRhKGUsIG51bGwsIGZpbmFsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVW56aXBJbmZsYXRlLmNvbXByZXNzaW9uID0gODtcbiAgICByZXR1cm4gVW56aXBJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IFVuemlwSW5mbGF0ZSB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIERFRkxBVEUgZGVjb21wcmVzc2lvbiBmb3IgWklQIGFyY2hpdmVzXG4gKi9cbnZhciBBc3luY1VuemlwSW5mbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgREVGTEFURSBkZWNvbXByZXNzaW9uIHRoYXQgY2FuIGJlIHVzZWQgaW4gWklQIGFyY2hpdmVzXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNVbnppcEluZmxhdGUoXywgc3opIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHN6IDwgMzIwMDAwKSB7XG4gICAgICAgICAgICB0aGlzLmkgPSBuZXcgSW5mbGF0ZShmdW5jdGlvbiAoZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uZGF0YShudWxsLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pID0gbmV3IEFzeW5jSW5mbGF0ZShmdW5jdGlvbiAoZXJyLCBkYXQsIGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMudGVybWluYXRlID0gdGhpcy5pLnRlcm1pbmF0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBBc3luY1VuemlwSW5mbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBmaW5hbCkge1xuICAgICAgICBpZiAodGhpcy5pLnRlcm1pbmF0ZSlcbiAgICAgICAgICAgIGRhdGEgPSBzbGMoZGF0YSwgMCk7XG4gICAgICAgIHRoaXMuaS5wdXNoKGRhdGEsIGZpbmFsKTtcbiAgICB9O1xuICAgIEFzeW5jVW56aXBJbmZsYXRlLmNvbXByZXNzaW9uID0gODtcbiAgICByZXR1cm4gQXN5bmNVbnppcEluZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNVbnppcEluZmxhdGUgfTtcbi8qKlxuICogQSBaSVAgYXJjaGl2ZSBkZWNvbXByZXNzaW9uIHN0cmVhbSB0aGF0IGVtaXRzIGZpbGVzIGFzIHRoZXkgYXJlIGRpc2NvdmVyZWRcbiAqL1xudmFyIFVuemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBaSVAgZGVjb21wcmVzc2lvbiBzdHJlYW1cbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgYSBmaWxlIGluIHRoZSBaSVAgYXJjaGl2ZSBpcyBmb3VuZFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFVuemlwKGNiKSB7XG4gICAgICAgIHRoaXMub25maWxlID0gY2I7XG4gICAgICAgIHRoaXMuayA9IFtdO1xuICAgICAgICB0aGlzLm8gPSB7XG4gICAgICAgICAgICAwOiBVbnppcFBhc3NUaHJvdWdoXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucCA9IGV0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSB1bnppcHBlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBVbnppcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKCF0aGlzLm9uZmlsZSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKCF0aGlzLnApXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIGlmICh0aGlzLmMgPiAwKSB7XG4gICAgICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4odGhpcy5jLCBjaHVuay5sZW5ndGgpO1xuICAgICAgICAgICAgdmFyIHRvQWRkID0gY2h1bmsuc3ViYXJyYXkoMCwgbGVuKTtcbiAgICAgICAgICAgIHRoaXMuYyAtPSBsZW47XG4gICAgICAgICAgICBpZiAodGhpcy5kKVxuICAgICAgICAgICAgICAgIHRoaXMuZC5wdXNoKHRvQWRkLCAhdGhpcy5jKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmtbMF0ucHVzaCh0b0FkZCk7XG4gICAgICAgICAgICBjaHVuayA9IGNodW5rLnN1YmFycmF5KGxlbik7XG4gICAgICAgICAgICBpZiAoY2h1bmsubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBmID0gMCwgaSA9IDAsIGlzID0gdm9pZCAwLCBidWYgPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAoIXRoaXMucC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgYnVmID0gY2h1bms7XG4gICAgICAgICAgICBlbHNlIGlmICghY2h1bmsubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGJ1ZiA9IHRoaXMucDtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1ZiA9IG5ldyB1OCh0aGlzLnAubGVuZ3RoICsgY2h1bmsubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBidWYuc2V0KHRoaXMucCksIGJ1Zi5zZXQoY2h1bmssIHRoaXMucC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGwgPSBidWYubGVuZ3RoLCBvYyA9IHRoaXMuYywgYWRkID0gb2MgJiYgdGhpcy5kO1xuICAgICAgICAgICAgdmFyIF9sb29wXzIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIHZhciBzaWcgPSBiNChidWYsIGkpO1xuICAgICAgICAgICAgICAgIGlmIChzaWcgPT0gMHg0MDM0QjUwKSB7XG4gICAgICAgICAgICAgICAgICAgIGYgPSAxLCBpcyA9IGk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNfMS5kID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpc18xLmMgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmYgPSBiMihidWYsIGkgKyA2KSwgY21wXzEgPSBiMihidWYsIGkgKyA4KSwgdSA9IGJmICYgMjA0OCwgZGQgPSBiZiAmIDgsIGZubCA9IGIyKGJ1ZiwgaSArIDI2KSwgZXMgPSBiMihidWYsIGkgKyAyOCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsID4gaSArIDMwICsgZm5sICsgZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGtzXzMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMS5rLnVuc2hpZnQoY2hrc18zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGYgPSAyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjXzEgPSBiNChidWYsIGkgKyAxOCksIHN1XzEgPSBiNChidWYsIGkgKyAyMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm5fMSA9IHN0ckZyb21VOChidWYuc3ViYXJyYXkoaSArIDMwLCBpICs9IDMwICsgZm5sKSwgIXUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjXzEgPT0gNDI5NDk2NzI5NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9hID0gZGQgPyBbLTJdIDogejY0ZShidWYsIGkpLCBzY18xID0gX2FbMF0sIHN1XzEgPSBfYVsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGRkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjXzEgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEuYyA9IHNjXzE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZF8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpbGVfMSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBmbl8xLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjbXBfMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbGVfMS5vbmRhdGEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2NfMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfMS5vbmRhdGEobnVsbCwgZXQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdHIgPSBfdGhpcy5vW2NtcF8xXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3RyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfMS5vbmRhdGEoZXJyKDE0LCAndW5rbm93biBjb21wcmVzc2lvbiB0eXBlICcgKyBjbXBfMSwgMSksIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMSA9IHNjXzEgPCAwID8gbmV3IGN0cihmbl8xKSA6IG5ldyBjdHIoZm5fMSwgc2NfMSwgc3VfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEub25kYXRhID0gZnVuY3Rpb24gKGVyciwgZGF0LCBmaW5hbCkgeyBmaWxlXzEub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7IH07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGNoa3NfNCA9IGNoa3NfMzsgX2kgPCBjaGtzXzQubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdCA9IGNoa3NfNFtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xLnB1c2goZGF0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMua1swXSA9PSBjaGtzXzMgJiYgX3RoaXMuYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kID0gZF8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMS5wdXNoKGV0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVybWluYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkXzEgJiYgZF8xLnRlcm1pbmF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMS50ZXJtaW5hdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjXzEgPj0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlXzEuc2l6ZSA9IHNjXzEsIGZpbGVfMS5vcmlnaW5hbFNpemUgPSBzdV8xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18xLm9uZmlsZShmaWxlXzEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImJyZWFrXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9jKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaWcgPT0gMHg4MDc0QjUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpcyA9IGkgKz0gMTIgKyAob2MgPT0gLTIgJiYgOCksIGYgPSAzLCB0aGlzXzEuYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNpZyA9PSAweDIwMTRCNTApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzID0gaSAtPSA0LCBmID0gMywgdGhpc18xLmMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgdGhpc18xID0gdGhpcztcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbCAtIDQ7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBzdGF0ZV8xID0gX2xvb3BfMigpO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZV8xID09PSBcImJyZWFrXCIpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wID0gZXQ7XG4gICAgICAgICAgICBpZiAob2MgPCAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdCA9IGYgPyBidWYuc3ViYXJyYXkoMCwgaXMgLSAxMiAtIChvYyA9PSAtMiAmJiA4KSAtIChiNChidWYsIGlzIC0gMTYpID09IDB4ODA3NEI1MCAmJiA0KSkgOiBidWYuc3ViYXJyYXkoMCwgaSk7XG4gICAgICAgICAgICAgICAgaWYgKGFkZClcbiAgICAgICAgICAgICAgICAgICAgYWRkLnB1c2goZGF0LCAhIWYpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rWysoZiA9PSAyKV0ucHVzaChkYXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGYgJiAyKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goYnVmLnN1YmFycmF5KGkpLCBmaW5hbCk7XG4gICAgICAgICAgICB0aGlzLnAgPSBidWYuc3ViYXJyYXkoaSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jKVxuICAgICAgICAgICAgICAgIGVycigxMyk7XG4gICAgICAgICAgICB0aGlzLnAgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBkZWNvZGVyIHdpdGggdGhlIHN0cmVhbSwgYWxsb3dpbmcgZm9yIGZpbGVzIGNvbXByZXNzZWQgd2l0aFxuICAgICAqIHRoZSBjb21wcmVzc2lvbiB0eXBlIHByb3ZpZGVkIHRvIGJlIGV4cGFuZGVkIGNvcnJlY3RseVxuICAgICAqIEBwYXJhbSBkZWNvZGVyIFRoZSBkZWNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgVW56aXAucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGRlY29kZXIpIHtcbiAgICAgICAgdGhpcy5vW2RlY29kZXIuY29tcHJlc3Npb25dID0gZGVjb2RlcjtcbiAgICB9O1xuICAgIHJldHVybiBVbnppcDtcbn0oKSk7XG5leHBvcnQgeyBVbnppcCB9O1xudmFyIG10ID0gdHlwZW9mIHF1ZXVlTWljcm90YXNrID09ICdmdW5jdGlvbicgPyBxdWV1ZU1pY3JvdGFzayA6IHR5cGVvZiBzZXRUaW1lb3V0ID09ICdmdW5jdGlvbicgPyBzZXRUaW1lb3V0IDogZnVuY3Rpb24gKGZuKSB7IGZuKCk7IH07XG5leHBvcnQgZnVuY3Rpb24gdW56aXAoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICB2YXIgdGVybSA9IFtdO1xuICAgIHZhciB0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRlcm0ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICB0ZXJtW2ldKCk7XG4gICAgfTtcbiAgICB2YXIgZmlsZXMgPSB7fTtcbiAgICB2YXIgY2JkID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgbXQoZnVuY3Rpb24gKCkgeyBjYihhLCBiKTsgfSk7XG4gICAgfTtcbiAgICBtdChmdW5jdGlvbiAoKSB7IGNiZCA9IGNiOyB9KTtcbiAgICB2YXIgZSA9IGRhdGEubGVuZ3RoIC0gMjI7XG4gICAgZm9yICg7IGI0KGRhdGEsIGUpICE9IDB4NjA1NEI1MDsgLS1lKSB7XG4gICAgICAgIGlmICghZSB8fCBkYXRhLmxlbmd0aCAtIGUgPiA2NTU1OCkge1xuICAgICAgICAgICAgY2JkKGVycigxMywgMCwgMSksIG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHRBbGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgO1xuICAgIHZhciBsZnQgPSBiMihkYXRhLCBlICsgOCk7XG4gICAgaWYgKGxmdCkge1xuICAgICAgICB2YXIgYyA9IGxmdDtcbiAgICAgICAgdmFyIG8gPSBiNChkYXRhLCBlICsgMTYpO1xuICAgICAgICB2YXIgeiA9IG8gPT0gNDI5NDk2NzI5NSB8fCBjID09IDY1NTM1O1xuICAgICAgICBpZiAoeikge1xuICAgICAgICAgICAgdmFyIHplID0gYjQoZGF0YSwgZSAtIDEyKTtcbiAgICAgICAgICAgIHogPSBiNChkYXRhLCB6ZSkgPT0gMHg2MDY0QjUwO1xuICAgICAgICAgICAgaWYgKHopIHtcbiAgICAgICAgICAgICAgICBjID0gbGZ0ID0gYjQoZGF0YSwgemUgKyAzMik7XG4gICAgICAgICAgICAgICAgbyA9IGI0KGRhdGEsIHplICsgNDgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBmbHRyID0gb3B0cyAmJiBvcHRzLmZpbHRlcjtcbiAgICAgICAgdmFyIF9sb29wXzMgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgdmFyIF9hID0gemgoZGF0YSwgbywgeiksIGNfMSA9IF9hWzBdLCBzYyA9IF9hWzFdLCBzdSA9IF9hWzJdLCBmbiA9IF9hWzNdLCBubyA9IF9hWzRdLCBvZmYgPSBfYVs1XSwgYiA9IHNsemgoZGF0YSwgb2ZmKTtcbiAgICAgICAgICAgIG8gPSBubztcbiAgICAgICAgICAgIHZhciBjYmwgPSBmdW5jdGlvbiAoZSwgZCkge1xuICAgICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRBbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgY2JkKGUsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQpXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlc1tmbl0gPSBkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIS0tbGZ0KVxuICAgICAgICAgICAgICAgICAgICAgICAgY2JkKG51bGwsIGZpbGVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFmbHRyIHx8IGZsdHIoe1xuICAgICAgICAgICAgICAgIG5hbWU6IGZuLFxuICAgICAgICAgICAgICAgIHNpemU6IHNjLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsU2l6ZTogc3UsXG4gICAgICAgICAgICAgICAgY29tcHJlc3Npb246IGNfMVxuICAgICAgICAgICAgfSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNfMSlcbiAgICAgICAgICAgICAgICAgICAgY2JsKG51bGwsIHNsYyhkYXRhLCBiLCBiICsgc2MpKTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChjXzEgPT0gOCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5mbCA9IGRhdGEuc3ViYXJyYXkoYiwgYiArIHNjKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gU3luY2hyb25vdXNseSBkZWNvbXByZXNzIHVuZGVyIDUxMktCLCBvciBiYXJlbHktY29tcHJlc3NlZCBkYXRhXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdSA8IDUyNDI4OCB8fCBzYyA+IDAuOCAqIHN1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNibChudWxsLCBpbmZsYXRlU3luYyhpbmZsLCB7IG91dDogbmV3IHU4KHN1KSB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNibChlLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXJtLnB1c2goaW5mbGF0ZShpbmZsLCB7IHNpemU6IHN1IH0sIGNibCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGNibChlcnIoMTQsICd1bmtub3duIGNvbXByZXNzaW9uIHR5cGUgJyArIGNfMSwgMSksIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNibChudWxsLCBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjOyArK2kpIHtcbiAgICAgICAgICAgIF9sb29wXzMoaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgICAgICBjYmQobnVsbCwge30pO1xuICAgIHJldHVybiB0QWxsO1xufVxuLyoqXG4gKiBTeW5jaHJvbm91c2x5IGRlY29tcHJlc3NlcyBhIFpJUCBhcmNoaXZlLiBQcmVmZXIgdXNpbmcgYHVuemlwYCBmb3IgYmV0dGVyXG4gKiBwZXJmb3JtYW5jZSB3aXRoIG1vcmUgdGhhbiBvbmUgZmlsZS5cbiAqIEBwYXJhbSBkYXRhIFRoZSByYXcgY29tcHJlc3NlZCBaSVAgZmlsZVxuICogQHBhcmFtIG9wdHMgVGhlIFpJUCBleHRyYWN0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBkZWNvbXByZXNzZWQgZmlsZXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVuemlwU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgdmFyIGZpbGVzID0ge307XG4gICAgdmFyIGUgPSBkYXRhLmxlbmd0aCAtIDIyO1xuICAgIGZvciAoOyBiNChkYXRhLCBlKSAhPSAweDYwNTRCNTA7IC0tZSkge1xuICAgICAgICBpZiAoIWUgfHwgZGF0YS5sZW5ndGggLSBlID4gNjU1NTgpXG4gICAgICAgICAgICBlcnIoMTMpO1xuICAgIH1cbiAgICA7XG4gICAgdmFyIGMgPSBiMihkYXRhLCBlICsgOCk7XG4gICAgaWYgKCFjKVxuICAgICAgICByZXR1cm4ge307XG4gICAgdmFyIG8gPSBiNChkYXRhLCBlICsgMTYpO1xuICAgIHZhciB6ID0gbyA9PSA0Mjk0OTY3Mjk1IHx8IGMgPT0gNjU1MzU7XG4gICAgaWYgKHopIHtcbiAgICAgICAgdmFyIHplID0gYjQoZGF0YSwgZSAtIDEyKTtcbiAgICAgICAgeiA9IGI0KGRhdGEsIHplKSA9PSAweDYwNjRCNTA7XG4gICAgICAgIGlmICh6KSB7XG4gICAgICAgICAgICBjID0gYjQoZGF0YSwgemUgKyAzMik7XG4gICAgICAgICAgICBvID0gYjQoZGF0YSwgemUgKyA0OCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGZsdHIgPSBvcHRzICYmIG9wdHMuZmlsdGVyO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYzsgKytpKSB7XG4gICAgICAgIHZhciBfYSA9IHpoKGRhdGEsIG8sIHopLCBjXzIgPSBfYVswXSwgc2MgPSBfYVsxXSwgc3UgPSBfYVsyXSwgZm4gPSBfYVszXSwgbm8gPSBfYVs0XSwgb2ZmID0gX2FbNV0sIGIgPSBzbHpoKGRhdGEsIG9mZik7XG4gICAgICAgIG8gPSBubztcbiAgICAgICAgaWYgKCFmbHRyIHx8IGZsdHIoe1xuICAgICAgICAgICAgbmFtZTogZm4sXG4gICAgICAgICAgICBzaXplOiBzYyxcbiAgICAgICAgICAgIG9yaWdpbmFsU2l6ZTogc3UsXG4gICAgICAgICAgICBjb21wcmVzc2lvbjogY18yXG4gICAgICAgIH0pKSB7XG4gICAgICAgICAgICBpZiAoIWNfMilcbiAgICAgICAgICAgICAgICBmaWxlc1tmbl0gPSBzbGMoZGF0YSwgYiwgYiArIHNjKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKGNfMiA9PSA4KVxuICAgICAgICAgICAgICAgIGZpbGVzW2ZuXSA9IGluZmxhdGVTeW5jKGRhdGEuc3ViYXJyYXkoYiwgYiArIHNjKSwgeyBvdXQ6IG5ldyB1OChzdSkgfSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZXJyKDE0LCAndW5rbm93biBjb21wcmVzc2lvbiB0eXBlICcgKyBjXzIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWxlcztcbn1cbiIsICJjb25zdCBkZWZhdWx0RXJyb3JDb25maWcgPSB7XHJcbiAgICB3aXRoU3RhY2tUcmFjZTogZmFsc2UsXHJcbn07XHJcbi8vIEN1c3RvbSBlcnJvciBvYmplY3RcclxuLy8gQ29udGV4dCAvIGRpc2N1c3Npb246IGh0dHBzOi8vZ2l0aHViLmNvbS9zdXBlcm1hY3JvL25ldmVydGhyb3cvcHVsbC8yMTVcclxuY29uc3QgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yID0gKG1lc3NhZ2UsIHJlc3VsdCwgY29uZmlnID0gZGVmYXVsdEVycm9yQ29uZmlnKSA9PiB7XHJcbiAgICBjb25zdCBkYXRhID0gcmVzdWx0LmlzT2soKVxyXG4gICAgICAgID8geyB0eXBlOiAnT2snLCB2YWx1ZTogcmVzdWx0LnZhbHVlIH1cclxuICAgICAgICA6IHsgdHlwZTogJ0VycicsIHZhbHVlOiByZXN1bHQuZXJyb3IgfTtcclxuICAgIGNvbnN0IG1heWJlU3RhY2sgPSBjb25maWcud2l0aFN0YWNrVHJhY2UgPyBuZXcgRXJyb3IoKS5zdGFjayA6IHVuZGVmaW5lZDtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZGF0YSxcclxuICAgICAgICBtZXNzYWdlLFxyXG4gICAgICAgIHN0YWNrOiBtYXliZVN0YWNrLFxyXG4gICAgfTtcclxufTtcblxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlLCBTdXBwcmVzc2VkRXJyb3IsIFN5bWJvbCwgSXRlcmF0b3IgKi9cclxuXHJcblxyXG5mdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19hd2FpdCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcyBpbnN0YW5jZW9mIF9fYXdhaXQgPyAodGhpcy52ID0gdiwgdGhpcykgOiBuZXcgX19hd2FpdCh2KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSBPYmplY3QuY3JlYXRlKCh0eXBlb2YgQXN5bmNJdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiID8gQXN5bmNJdGVyYXRvciA6IE9iamVjdCkucHJvdG90eXBlKSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiLCBhd2FpdFJldHVybiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIGF3YWl0UmV0dXJuKGYpIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodikudGhlbihmLCByZWplY3QpOyB9OyB9XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaWYgKGdbbl0pIHsgaVtuXSA9IGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAoYSwgYikgeyBxLnB1c2goW24sIHYsIGEsIGJdKSA+IDEgfHwgcmVzdW1lKG4sIHYpOyB9KTsgfTsgaWYgKGYpIGlbbl0gPSBmKGlbbl0pOyB9IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jRGVsZWdhdG9yKG8pIHtcclxuICAgIHZhciBpLCBwO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiLCBmdW5jdGlvbiAoZSkgeyB0aHJvdyBlOyB9KSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobiwgZikgeyBpW25dID0gb1tuXSA/IGZ1bmN0aW9uICh2KSB7IHJldHVybiAocCA9ICFwKSA/IHsgdmFsdWU6IF9fYXdhaXQob1tuXSh2KSksIGRvbmU6IGZhbHNlIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNWYWx1ZXMobykge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XHJcbiAgICByZXR1cm4gbSA/IG0uY2FsbChvKSA6IChvID0gdHlwZW9mIF9fdmFsdWVzID09PSBcImZ1bmN0aW9uXCIgPyBfX3ZhbHVlcyhvKSA6IG9bU3ltYm9sLml0ZXJhdG9yXSgpLCBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLmFzeW5jSXRlcmF0b3JdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSwgaSk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaVtuXSA9IG9bbl0gJiYgZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHsgdiA9IG9bbl0odiksIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHYuZG9uZSwgdi52YWx1ZSk7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XHJcbn1cclxuXHJcbnR5cGVvZiBTdXBwcmVzc2VkRXJyb3IgPT09IFwiZnVuY3Rpb25cIiA/IFN1cHByZXNzZWRFcnJvciA6IGZ1bmN0aW9uIChlcnJvciwgc3VwcHJlc3NlZCwgbWVzc2FnZSkge1xyXG4gICAgdmFyIGUgPSBuZXcgRXJyb3IobWVzc2FnZSk7XHJcbiAgICByZXR1cm4gZS5uYW1lID0gXCJTdXBwcmVzc2VkRXJyb3JcIiwgZS5lcnJvciA9IGVycm9yLCBlLnN1cHByZXNzZWQgPSBzdXBwcmVzc2VkLCBlO1xyXG59O1xuXG5jbGFzcyBSZXN1bHRBc3luYyB7XHJcbiAgICBjb25zdHJ1Y3RvcihyZXMpIHtcclxuICAgICAgICB0aGlzLl9wcm9taXNlID0gcmVzO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb21TYWZlUHJvbWlzZShwcm9taXNlKSB7XHJcbiAgICAgICAgY29uc3QgbmV3UHJvbWlzZSA9IHByb21pc2UudGhlbigodmFsdWUpID0+IG5ldyBPayh2YWx1ZSkpO1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmMobmV3UHJvbWlzZSk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZnJvbVByb21pc2UocHJvbWlzZSwgZXJyb3JGbikge1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb21pc2UgPSBwcm9taXNlXHJcbiAgICAgICAgICAgIC50aGVuKCh2YWx1ZSkgPT4gbmV3IE9rKHZhbHVlKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlKSA9PiBuZXcgRXJyKGVycm9yRm4oZSkpKTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG5ld1Byb21pc2UpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIHN0YXRpYyBmcm9tVGhyb3dhYmxlKGZuLCBlcnJvckZuKSB7XHJcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmMoKCgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBPayh5aWVsZCBmbiguLi5hcmdzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihlcnJvckZuID8gZXJyb3JGbihlcnJvcikgOiBlcnJvcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKSgpKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGNvbWJpbmUoYXN5bmNSZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRBc3luY0xpc3QoYXN5bmNSZXN1bHRMaXN0KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21iaW5lV2l0aEFsbEVycm9ycyhhc3luY1Jlc3VsdExpc3QpIHtcclxuICAgICAgICByZXR1cm4gY29tYmluZVJlc3VsdEFzeW5jTGlzdFdpdGhBbGxFcnJvcnMoYXN5bmNSZXN1bHRMaXN0KTtcclxuICAgIH1cclxuICAgIG1hcChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayh5aWVsZCBmKHJlcy52YWx1ZSkpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIocmVzLmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBuZXdSZXMgPSB5aWVsZCBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdSZXMuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIobmV3UmVzLmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHlpZWxkIGYocmVzLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gVGVlIGRvZXMgbm90IGNhcmUgYWJvdXQgdGhlIGVycm9yXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBtYXBFcnIoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc09rKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEVycih5aWVsZCBmKHJlcy5lcnJvcikpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhlbihmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZSBpbnN0YW5jZW9mIFJlc3VsdEFzeW5jID8gbmV3VmFsdWUuX3Byb21pc2UgOiBuZXdWYWx1ZTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgb3JFbHNlKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGYocmVzLmVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgfSkpKTtcclxuICAgIH1cclxuICAgIG1hdGNoKG9rLCBfZXJyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiByZXMubWF0Y2gob2ssIF9lcnIpKTtcclxuICAgIH1cclxuICAgIHVud3JhcE9yKHQpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHJlcy51bndyYXBPcih0KSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkIHdpbGwgYmUgcmVtb3ZlZCBpbiA5LjAuMC5cclxuICAgICAqXHJcbiAgICAgKiBZb3UgY2FuIHVzZSBgc2FmZVRyeWAgd2l0aG91dCB0aGlzIG1ldGhvZC5cclxuICAgICAqIEBleGFtcGxlXHJcbiAgICAgKiBgYGB0eXBlc2NyaXB0XHJcbiAgICAgKiBzYWZlVHJ5KGFzeW5jIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgKiAgIGNvbnN0IG9rVmFsdWUgPSB5aWVsZCogeW91clJlc3VsdFxyXG4gICAgICogfSlcclxuICAgICAqIGBgYFxyXG4gICAgICogRW11bGF0ZXMgUnVzdCdzIGA/YCBvcGVyYXRvciBpbiBgc2FmZVRyeWAncyBib2R5LiBTZWUgYWxzbyBgc2FmZVRyeWAuXHJcbiAgICAgKi9cclxuICAgIHNhZmVVbndyYXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIF9fYXN5bmNHZW5lcmF0b3IodGhpcywgYXJndW1lbnRzLCBmdW5jdGlvbiogc2FmZVVud3JhcF8xKCkge1xyXG4gICAgICAgICAgICByZXR1cm4geWllbGQgX19hd2FpdCh5aWVsZCBfX2F3YWl0KHlpZWxkKiBfX2FzeW5jRGVsZWdhdG9yKF9fYXN5bmNWYWx1ZXMoeWllbGQgX19hd2FpdCh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gcmVzLnNhZmVVbndyYXAoKSkpKSkpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIE1ha2VzIFJlc3VsdEFzeW5jIGltcGxlbWVudCBQcm9taXNlTGlrZTxSZXN1bHQ+XHJcbiAgICB0aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCkge1xyXG4gICAgICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24qIF9hKCkge1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCBfX2F3YWl0KHRoaXMuX3Byb21pc2UpO1xyXG4gICAgICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLS0gVGhpcyBpcyBzdHJ1Y3R1cmFsbHkgZXF1aXZhbGVudCBhbmQgc2FmZVxyXG4gICAgICAgICAgICAgICAgeWllbGQgeWllbGQgX19hd2FpdChlcnJBc3luYyhyZXN1bHQuZXJyb3IpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9fYXdhaXQocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5jb25zdCBva0FzeW5jID0gKHZhbHVlKSA9PiBuZXcgUmVzdWx0QXN5bmMoUHJvbWlzZS5yZXNvbHZlKG5ldyBPayh2YWx1ZSkpKTtcclxuY29uc3QgZXJyQXN5bmMgPSAoZXJyKSA9PiBuZXcgUmVzdWx0QXN5bmMoUHJvbWlzZS5yZXNvbHZlKG5ldyBFcnIoZXJyKSkpO1xyXG5jb25zdCBmcm9tUHJvbWlzZSA9IFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlO1xyXG5jb25zdCBmcm9tU2FmZVByb21pc2UgPSBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2U7XHJcbmNvbnN0IGZyb21Bc3luY1Rocm93YWJsZSA9IFJlc3VsdEFzeW5jLmZyb21UaHJvd2FibGU7XG5cbi8qKlxyXG4gKiBTaG9ydCBjaXJjdWl0cyBvbiB0aGUgRklSU1QgRXJyIHZhbHVlIHRoYXQgd2UgZmluZFxyXG4gKi9cclxuY29uc3QgY29tYmluZVJlc3VsdExpc3QgPSAocmVzdWx0TGlzdCkgPT4ge1xyXG4gICAgbGV0IGFjYyA9IG9rKFtdKTtcclxuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdExpc3QpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgYWNjID0gZXJyKHJlc3VsdC5lcnJvcik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgYWNjLm1hcCgobGlzdCkgPT4gbGlzdC5wdXNoKHJlc3VsdC52YWx1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbn07XHJcbi8qIFRoaXMgaXMgdGhlIHR5cGVzYWZlIHZlcnNpb24gb2YgUHJvbWlzZS5hbGxcclxuICpcclxuICogVGFrZXMgYSBsaXN0IG9mIFJlc3VsdEFzeW5jPFQsIEU+IGFuZCBzdWNjZXNzIGlmIGFsbCBpbm5lciByZXN1bHRzIGFyZSBPayB2YWx1ZXNcclxuICogb3IgZmFpbHMgaWYgb25lIChvciBtb3JlKSBvZiB0aGUgaW5uZXIgcmVzdWx0cyBhcmUgRXJyIHZhbHVlc1xyXG4gKi9cclxuY29uc3QgY29tYmluZVJlc3VsdEFzeW5jTGlzdCA9IChhc3luY1Jlc3VsdExpc3QpID0+IFJlc3VsdEFzeW5jLmZyb21TYWZlUHJvbWlzZShQcm9taXNlLmFsbChhc3luY1Jlc3VsdExpc3QpKS5hbmRUaGVuKGNvbWJpbmVSZXN1bHRMaXN0KTtcclxuLyoqXHJcbiAqIEdpdmUgYSBsaXN0IG9mIGFsbCB0aGUgZXJyb3JzIHdlIGZpbmRcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRMaXN0V2l0aEFsbEVycm9ycyA9IChyZXN1bHRMaXN0KSA9PiB7XHJcbiAgICBsZXQgYWNjID0gb2soW10pO1xyXG4gICAgZm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0TGlzdCkge1xyXG4gICAgICAgIGlmIChyZXN1bHQuaXNFcnIoKSAmJiBhY2MuaXNFcnIoKSkge1xyXG4gICAgICAgICAgICBhY2MuZXJyb3IucHVzaChyZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXN1bHQuaXNFcnIoKSAmJiBhY2MuaXNPaygpKSB7XHJcbiAgICAgICAgICAgIGFjYyA9IGVycihbcmVzdWx0LmVycm9yXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHJlc3VsdC5pc09rKCkgJiYgYWNjLmlzT2soKSkge1xyXG4gICAgICAgICAgICBhY2MudmFsdWUucHVzaChyZXN1bHQudmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBkbyBub3RoaW5nIHdoZW4gcmVzdWx0LmlzT2soKSAmJiBhY2MuaXNFcnIoKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFjYztcclxufTtcclxuY29uc3QgY29tYmluZVJlc3VsdEFzeW5jTGlzdFdpdGhBbGxFcnJvcnMgPSAoYXN5bmNSZXN1bHRMaXN0KSA9PiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoUHJvbWlzZS5hbGwoYXN5bmNSZXN1bHRMaXN0KSkuYW5kVGhlbihjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMpO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxyXG52YXIgUmVzdWx0O1xyXG4oZnVuY3Rpb24gKFJlc3VsdCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBXcmFwcyBhIGZ1bmN0aW9uIHdpdGggYSB0cnkgY2F0Y2gsIGNyZWF0aW5nIGEgbmV3IGZ1bmN0aW9uIHdpdGggdGhlIHNhbWVcclxuICAgICAqIGFyZ3VtZW50cyBidXQgcmV0dXJuaW5nIGBPa2AgaWYgc3VjY2Vzc2Z1bCwgYEVycmAgaWYgdGhlIGZ1bmN0aW9uIHRocm93c1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBmbiBmdW5jdGlvbiB0byB3cmFwIHdpdGggb2sgb24gc3VjY2VzcyBvciBlcnIgb24gZmFpbHVyZVxyXG4gICAgICogQHBhcmFtIGVycm9yRm4gd2hlbiBhbiBlcnJvciBpcyB0aHJvd24sIHRoaXMgd2lsbCB3cmFwIHRoZSBlcnJvciByZXN1bHQgaWYgcHJvdmlkZWRcclxuICAgICAqL1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGZ1bmN0aW9uIGZyb21UaHJvd2FibGUoZm4sIGVycm9yRm4pIHtcclxuICAgICAgICByZXR1cm4gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGZuKC4uLmFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9rKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlcnIoZXJyb3JGbiA/IGVycm9yRm4oZSkgOiBlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuZnJvbVRocm93YWJsZSA9IGZyb21UaHJvd2FibGU7XHJcbiAgICBmdW5jdGlvbiBjb21iaW5lKHJlc3VsdExpc3QpIHtcclxuICAgICAgICByZXR1cm4gY29tYmluZVJlc3VsdExpc3QocmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuY29tYmluZSA9IGNvbWJpbmU7XHJcbiAgICBmdW5jdGlvbiBjb21iaW5lV2l0aEFsbEVycm9ycyhyZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRMaXN0V2l0aEFsbEVycm9ycyhyZXN1bHRMaXN0KTtcclxuICAgIH1cclxuICAgIFJlc3VsdC5jb21iaW5lV2l0aEFsbEVycm9ycyA9IGNvbWJpbmVXaXRoQWxsRXJyb3JzO1xyXG59KShSZXN1bHQgfHwgKFJlc3VsdCA9IHt9KSk7XHJcbmNvbnN0IG9rID0gKHZhbHVlKSA9PiBuZXcgT2sodmFsdWUpO1xyXG5mdW5jdGlvbiBlcnIoZXJyKSB7XHJcbiAgICByZXR1cm4gbmV3IEVycihlcnIpO1xyXG59XHJcbmZ1bmN0aW9uIHNhZmVUcnkoYm9keSkge1xyXG4gICAgY29uc3QgbiA9IGJvZHkoKS5uZXh0KCk7XHJcbiAgICBpZiAobiBpbnN0YW5jZW9mIFByb21pc2UpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG4udGhlbigocikgPT4gci52YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG4udmFsdWU7XHJcbn1cclxuY2xhc3MgT2sge1xyXG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBpc09rKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgaXNFcnIoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzT2soKTtcclxuICAgIH1cclxuICAgIG1hcChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG9rKGYodGhpcy52YWx1ZSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWFwRXJyKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRocm91Z2goZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpLm1hcCgoX3ZhbHVlKSA9PiB0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShmKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZih0aGlzLnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gVGVlIGRvZXNuJ3QgY2FyZSBhYm91dCB0aGUgZXJyb3JcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9rKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIG9yRWxzZShfZikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGFzeW5jQW5kVGhlbihmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYXN5bmNBbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKS5tYXAoKCkgPT4gdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhc3luY01hcChmKSB7XHJcbiAgICAgICAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21TYWZlUHJvbWlzZShmKHRoaXMudmFsdWUpKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIHVud3JhcE9yKF92KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICBtYXRjaChvaywgX2Vycikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHNhZmVVbndyYXAoKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZXF1aXJlLXlpZWxkICovXHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXAoXykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcEVycihjb25maWcpIHtcclxuICAgICAgICB0aHJvdyBjcmVhdGVOZXZlclRocm93RXJyb3IoJ0NhbGxlZCBgX3Vuc2FmZVVud3JhcEVycmAgb24gYW4gT2snLCB0aGlzLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzLCByZXF1aXJlLXlpZWxkXHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWU7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgRXJyIHtcclxuICAgIGNvbnN0cnVjdG9yKGVycm9yKSB7XHJcbiAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xyXG4gICAgfVxyXG4gICAgaXNPaygpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpc0VycigpIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuaXNPaygpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWFwKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIG1hcEVycihmKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycihmKHRoaXMuZXJyb3IpKTtcclxuICAgIH1cclxuICAgIGFuZFRocm91Z2goX2YpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgYW5kVGVlKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaGVuKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBvckVsc2UoZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgYXN5bmNBbmRUaGVuKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgYXN5bmNBbmRUaHJvdWdoKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgYXN5bmNNYXAoX2YpIHtcclxuICAgICAgICByZXR1cm4gZXJyQXN5bmModGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICB1bndyYXBPcih2KSB7XHJcbiAgICAgICAgcmV0dXJuIHY7XHJcbiAgICB9XHJcbiAgICBtYXRjaChfb2ssIGVycikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gdGhpcy5lcnJvcjtcclxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIHlpZWxkIGVycihlcnJvcik7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRG8gbm90IHVzZSB0aGlzIGdlbmVyYXRvciBvdXQgb2YgYHNhZmVUcnlgJyk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXAoY29uZmlnKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yKCdDYWxsZWQgYF91bnNhZmVVbndyYXBgIG9uIGFuIEVycicsIHRoaXMsIGNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwRXJyKF8pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcjtcclxuICAgIH1cclxuICAgICpbU3ltYm9sLml0ZXJhdG9yXSgpIHtcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcclxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICB5aWVsZCBzZWxmO1xyXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgLS0gVGhpcyBpcyBzdHJ1Y3R1cmFsbHkgZXF1aXZhbGVudCBhbmQgc2FmZVxyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IGZyb21UaHJvd2FibGUgPSBSZXN1bHQuZnJvbVRocm93YWJsZTtcclxuLy8jZW5kcmVnaW9uXG5cbmV4cG9ydCB7IEVyciwgT2ssIFJlc3VsdCwgUmVzdWx0QXN5bmMsIGVyciwgZXJyQXN5bmMsIGZyb21Bc3luY1Rocm93YWJsZSwgZnJvbVByb21pc2UsIGZyb21TYWZlUHJvbWlzZSwgZnJvbVRocm93YWJsZSwgb2ssIG9rQXN5bmMsIHNhZmVUcnkgfTtcbiIsICJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwifi9lcnJvci9iYXNlLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJFcnJvciBleHRlbmRzIEJhc2VFcnJvciB7fVxuIiwgImltcG9ydCB7IFdvcmtlckVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd29ya2VyL3dvcmtlci1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyVW5kZWZpbmVkUGFyYW1ldGVyRXJyb3IgZXh0ZW5kcyBXb3JrZXJFcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2UgPSBcIlBhcmFtZXRlciBtdXN0IGJlIGRlZmluZWRcIjtcbn1cbiIsICJpbXBvcnQgeyBlcnJBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY29ubmVjdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwifi9lcnJvci9zZXJ2ZXItZXJyb3IudHNcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyQ29uZmlnIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3NlcnZlci1jb25maWcudHNcIjtcblxuLyoqXG4gKiBFbnN1cmUgYW4gZXJyb3IgbWVzc2FnZSBpcyB0cmFuc2Zvcm1lZCBpbiBhbiBFcnJvciBvYmplY3RcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbnN1cmVFcnJvciA9ICh2YWx1ZTogdW5rbm93bik6IEVycm9yID0+IHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWx1ZTtcblxuICBsZXQgc3RyaW5naWZpZWQgPSBcIltVbmFibGUgdG8gc3RyaW5naWZ5IHRoZSB0aHJvd24gdmFsdWVdXCI7XG4gIHRyeSB7XG4gICAgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgIC8qIGVtcHR5ICovXG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKHN0cmluZ2lmaWVkKTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgTHVmaSdzIGNvbmZpZyBmcm9tIGl0cyBBUElcbiAqXG4gKiBAcGFyYW0gaW5zdGFuY2VVcmxcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFNlcnZlckNvbmZpZyA9IChcbiAgaW5zdGFuY2VVcmw6IFVSTCxcbik6IFJlc3VsdEFzeW5jPFNlcnZlckNvbmZpZywgRXJyb3I+ID0+IHtcbiAgY29uc3Qgb3JpZ2luTWF0Y2hlcyA9IGluc3RhbmNlVXJsLmhyZWYubWF0Y2goXG4gICAgLyguKj8pXFwvPyg/OlxcL1tkcl17MX1cXC98bG9naW5cXC8/fGZpbGVzXFwvPykvLFxuICApO1xuXG4gIGNvbnN0IHVybE9yaWdpbiA9IG9yaWdpbk1hdGNoZXMgJiYgb3JpZ2luTWF0Y2hlc1sxXVxuICAgID8gb3JpZ2luTWF0Y2hlc1sxXVxuICAgIDogaW5zdGFuY2VVcmwub3JpZ2luO1xuXG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBmZXRjaCh1cmxPcmlnaW4gKyBcIi9hYm91dC9jb25maWdcIiksXG4gICAgKGVycm9yKSA9PlxuICAgICAgbmV3IENvbm5lY3Rpb25FcnJvcih1bmRlZmluZWQsIHtcbiAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgIH0pLFxuICApLmFuZFRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICAgIHJlc3BvbnNlLmpzb24oKSxcbiAgICAgICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICAgIG5ldyBTZXJ2ZXJFcnJvcih1bmRlZmluZWQsIHsgY29udGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0Rlbm9SdW50aW1lID0gKCk6IGJvb2xlYW4gPT4gdHlwZW9mIERlbm8gIT09IFwidW5kZWZpbmVkXCI7XG5cbmV4cG9ydCBjb25zdCBpc1NlY3VyZUNvbnRleHQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBpc0Rlbm9SdW50aW1lKCkgfHwgZ2xvYmFsVGhpcy5pc1NlY3VyZUNvbnRleHQgfHxcbiAgICBnbG9iYWxUaGlzLmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xufTtcblxuZXhwb3J0IGNvbnN0IHdvcmtlclVybCA9IChyZWxhdGl2ZVBhdGg6IHN0cmluZyk6IFVSTCA9PiB7XG4gIHJldHVybiBpc0Rlbm9SdW50aW1lKClcbiAgICA/IG5ldyBVUkwoYC4vd29ya2VyLyR7cmVsYXRpdmVQYXRofS50c2AsIG5ldyBVUkwoXCIuXCIsIGltcG9ydC5tZXRhLnVybCkuaHJlZilcbiAgICA6IG5ldyBVUkwoXG4gICAgICBpbXBvcnQubWV0YS5yZXNvbHZlKFxuICAgICAgICBgLi8ke1xuICAgICAgICAgIHJlbGF0aXZlUGF0aCAhPT0gXCJlbmNyeXB0XCIgPyBgd29ya2VyLyR7cmVsYXRpdmVQYXRofWAgOiByZWxhdGl2ZVBhdGhcbiAgICAgICAgfS5qc2AsXG4gICAgICApLFxuICAgICk7XG59O1xuIiwgImltcG9ydCB7IFppcERlY29tcHJlc3Npb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL3ppcC96aXAtZGVjb21wcmVzc2lvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgdW56aXAsIHR5cGUgVW56aXBwZWQgfSBmcm9tIFwiZmZsYXRlXCI7XG5pbXBvcnQgeyBlcnJBc3luYywgb2tBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHsgV29ya2VyVW5kZWZpbmVkUGFyYW1ldGVyRXJyb3IgfSBmcm9tIFwifi9lcnJvci93b3JrZXIvd29ya2VyLXVuZGVmaW5lZC1wYXJhbWV0ZXItZXJyb3IudHNcIjtcbmltcG9ydCB7IGVuc3VyZUVycm9yIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB0eXBlIHsgV29ya2VyQWN0aW9uTWVzc2FnZSB9IGZyb20gXCJ+L2ludGVyZmFjZS93b3JrZXItYWN0aW9uLW1lc3NhZ2UudHNcIjtcbmltcG9ydCB7IEVWRU5UIH0gZnJvbSBcIn4vZW51bS9ldmVudC50c1wiO1xuXG5kZWNsYXJlIGNvbnN0IHNlbGY6IFdvcmtlcjtcblxuc2VsZi5vbm1lc3NhZ2UgPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICBkZWNvbXByZXNzKGV2ZW50LmRhdGEpLm1hcCgoKSA9PiB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7IGV2ZW50OiBFVkVOVC5BUkNISVZFX0RFQ09NUFJFU1NFRCB9KTtcbiAgfSkubWFwRXJyKChlcnJvcikgPT4ge1xuICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudDogRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgZGVjb21wcmVzcyA9IChcbiAgd29ya2VyTWVzc2FnZTogV29ya2VyQWN0aW9uTWVzc2FnZSxcbik6IFJlc3VsdEFzeW5jPHZvaWQsIEVycm9yPiA9PiB7XG4gIGNvbnN0IHsgYXJjaGl2ZSB9ID0gd29ya2VyTWVzc2FnZS5hcmdzO1xuXG4gIGlmIChhcmNoaXZlICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCB1bnppcFByb21pc2UgPSBhc3luYyAoKTogUHJvbWlzZTxVbnppcHBlZD4gPT4ge1xuICAgICAgaWYgKGFyY2hpdmUuZmlsZSkge1xuICAgICAgICBjb25zdCBmaWxlQnl0ZXMgPSBhd2FpdCBhcmNoaXZlLmZpbGUuYnl0ZXMoKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgIHVuemlwKGZpbGVCeXRlcywgKGVycm9yLCBmaWxlcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgICAgICByZXNvbHZlKGZpbGVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXG4gICAgICAgICAgbmV3IFdvcmtlclVuZGVmaW5lZFBhcmFtZXRlckVycm9yKFwiYXJjaGl2ZS5maWxlIG11c3QgYmUgZGVmaW5lZFwiKSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKHVuemlwUHJvbWlzZSgpLCAoZXJyb3IpID0+IGVycm9yKVxuICAgICAgLmFuZFRoZW4oKGZpbGVzKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZm9yIChjb25zdCBwYXRoIGluIGZpbGVzKSB7XG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgZXZlbnQ6IEVWRU5ULkFSQ0hJVkVfUkVUUklFVkVEX0ZJTEUsXG4gICAgICAgICAgICAgIGZpbGU6IHsgYnVmZmVyOiBmaWxlc1twYXRoXS5idWZmZXIsIHBhdGggfSxcbiAgICAgICAgICAgIH0sIFtmaWxlc1twYXRoXS5idWZmZXJdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9rQXN5bmModW5kZWZpbmVkKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4gZXJyQXN5bmMoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9KS5vckVsc2UoKGVycm9yKSA9PlxuICAgICAgICBlcnJBc3luYyhcbiAgICAgICAgICBuZXcgWmlwRGVjb21wcmVzc2lvbkVycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICAgICAgICApXG4gICAgICApO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlcnJBc3luYyhcbiAgICAgIG5ldyBXb3JrZXJVbmRlZmluZWRQYXJhbWV0ZXJFcnJvcihcImFyY2hpdmUgbXVzdCBiZSBkZWZpbmVkXCIpLFxuICAgICk7XG4gIH1cbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7OztBQVVPLElBQU0sWUFBTixjQUF3QixNQUFNO0FBQUEsRUFHbkMsWUFDRSxTQUNBLFVBQWlELENBQUMsR0FDbEQ7QUFDQSxVQUFNLEVBQUUsT0FBTyxRQUFRLElBQUk7QUFFM0IsVUFBTSxTQUFTLEVBQUUsTUFBTSxDQUFDO0FBUjFCLHdCQUFnQjtBQVNkLFNBQUssT0FBTyxLQUFLLFlBQVk7QUFFN0IsU0FBSyxVQUFVO0FBQUEsRUFDakI7QUFDRjs7O0FDdEJPLElBQU0sV0FBTixjQUF1QixVQUFVO0FBQUM7OztBQ0FsQyxJQUFNLHdCQUFOLGNBQW9DLFNBQVM7QUFBQSxFQUE3QztBQUFBO0FBQ0wsd0JBQVMsV0FBVTtBQUFBO0FBQ3JCOzs7QUNLQSxJQUFJLE1BQU0sQ0FBQztBQUNYLElBQUksS0FBTSxTQUFVLEdBQUcsSUFBSSxLQUFLLFVBQVUsSUFBSTtBQUMxQyxNQUFJLElBQUksSUFBSSxPQUFPLElBQUksRUFBRSxNQUFNLElBQUksRUFBRSxJQUFJLElBQUksZ0JBQWdCLElBQUksS0FBSztBQUFBLElBQ2xFLElBQUk7QUFBQSxFQUNSLEdBQUcsRUFBRSxNQUFNLGtCQUFrQixDQUFDLENBQUMsRUFBRTtBQUNqQyxJQUFFLFlBQVksU0FBVSxHQUFHO0FBQ3ZCLFFBQUksSUFBSSxFQUFFLE1BQU0sS0FBSyxFQUFFO0FBQ3ZCLFFBQUksSUFBSTtBQUNKLFVBQUlBLE9BQU0sSUFBSSxNQUFN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QUNqQyxnQkFBSSxNQUFPLFFBQU8sS0FBSztBQUV2QixvQkFBUSxLQUFLO0FBQUEsVUFDZixDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQUEsTUFDSCxPQUFPO0FBQ0wsZUFBTyxRQUFRO0FBQUEsVUFDYixJQUFJLDhCQUE4Qiw4QkFBOEI7QUFBQSxRQUNsRTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsV0FBTyxZQUFZLFlBQVksYUFBYSxHQUFHLENBQUMsVUFBVSxLQUFLLEVBQzVELFFBQVEsQ0FBQyxVQUFVO0FBQ2xCLFVBQUk7QUFDRixtQkFBVyxRQUFRLE9BQU87QUFDeEIsZUFBSyxZQUFZO0FBQUEsWUFDZjtBQUFBLFlBQ0EsTUFBTSxFQUFFLFFBQVEsTUFBTSxJQUFJLEVBQUUsUUFBUSxLQUFLO0FBQUEsVUFDM0MsR0FBRyxDQUFDLE1BQU0sSUFBSSxFQUFFLE1BQU0sQ0FBQztBQUFBLFFBQ3pCO0FBQ0EsZUFBTyxRQUFRLE1BQVM7QUFBQSxNQUMxQixTQUFTLE9BQU87QUFDZCxlQUFPLFNBQVMsS0FBSztBQUFBLE1BQ3ZCO0FBQUEsSUFDRixDQUFDLEVBQUU7QUFBQSxNQUFPLENBQUMsVUFDVDtBQUFBLFFBQ0UsSUFBSSxzQkFBc0IsUUFBVyxFQUFFLE9BQU8sWUFBWSxLQUFLLEVBQUUsQ0FBQztBQUFBLE1BQ3BFO0FBQUEsSUFDRjtBQUFBLEVBQ0osT0FBTztBQUNMLFdBQU87QUFBQSxNQUNMLElBQUksOEJBQThCLHlCQUF5QjtBQUFBLElBQzdEO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJlcnIiLCAibCIsICJ0ZCIsICJlcnIiLCAiZGF0IiwgIl9hIiwgIl9hIiwgImkiLCAiX2EiLCAiZSIsICJ2IiwgIm9rIiwgIl9hIiwgImVyciIsICJSZXN1bHQiLCAiZnJvbVRocm93YWJsZSIsICJvayIsICJlcnIiLCAic2VsZiJdCn0K
