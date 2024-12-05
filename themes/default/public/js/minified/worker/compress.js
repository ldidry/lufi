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

// src/error/zip/zip-compression-error.ts
var ZipCompressionError = class extends ZipError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "An error occured while trying to compress the data");
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
var flm = /* @__PURE__ */ hMap(flt, 9, 0);
var fdm = /* @__PURE__ */ hMap(fdt, 5, 0);
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
var wbits = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
};
var wbits16 = function(d, p, v) {
  v <<= p & 7;
  var o = p / 8 | 0;
  d[o] |= v;
  d[o + 1] |= v >> 8;
  d[o + 2] |= v >> 16;
};
var hTree = function(d, mb) {
  var t = [];
  for (var i = 0; i < d.length; ++i) {
    if (d[i])
      t.push({ s: i, f: d[i] });
  }
  var s = t.length;
  var t2 = t.slice();
  if (!s)
    return { t: et, l: 0 };
  if (s == 1) {
    var v = new u8(t[0].s + 1);
    v[t[0].s] = 1;
    return { t: v, l: 1 };
  }
  t.sort(function(a, b) {
    return a.f - b.f;
  });
  t.push({ s: -1, f: 25001 });
  var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
  t[0] = { s: -1, f: l.f + r.f, l, r };
  while (i1 != s - 1) {
    l = t[t[i0].f < t[i2].f ? i0++ : i2++];
    r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
    t[i1++] = { s: -1, f: l.f + r.f, l, r };
  }
  var maxSym = t2[0].s;
  for (var i = 1; i < s; ++i) {
    if (t2[i].s > maxSym)
      maxSym = t2[i].s;
  }
  var tr = new u16(maxSym + 1);
  var mbt = ln(t[i1 - 1], tr, 0);
  if (mbt > mb) {
    var i = 0, dt = 0;
    var lft = mbt - mb, cst = 1 << lft;
    t2.sort(function(a, b) {
      return tr[b.s] - tr[a.s] || a.f - b.f;
    });
    for (; i < s; ++i) {
      var i2_1 = t2[i].s;
      if (tr[i2_1] > mb) {
        dt += cst - (1 << mbt - tr[i2_1]);
        tr[i2_1] = mb;
      } else
        break;
    }
    dt >>= lft;
    while (dt > 0) {
      var i2_2 = t2[i].s;
      if (tr[i2_2] < mb)
        dt -= 1 << mb - tr[i2_2]++ - 1;
      else
        ++i;
    }
    for (; i >= 0 && dt; --i) {
      var i2_3 = t2[i].s;
      if (tr[i2_3] == mb) {
        --tr[i2_3];
        ++dt;
      }
    }
    mbt = mb;
  }
  return { t: new u8(tr), l: mbt };
};
var ln = function(n, l, d) {
  return n.s == -1 ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1)) : l[n.s] = d;
};
var lc = function(c) {
  var s = c.length;
  while (s && !c[--s])
    ;
  var cl = new u16(++s);
  var cli = 0, cln = c[0], cls = 1;
  var w = function(v) {
    cl[cli++] = v;
  };
  for (var i = 1; i <= s; ++i) {
    if (c[i] == cln && i != s)
      ++cls;
    else {
      if (!cln && cls > 2) {
        for (; cls > 138; cls -= 138)
          w(32754);
        if (cls > 2) {
          w(cls > 10 ? cls - 11 << 5 | 28690 : cls - 3 << 5 | 12305);
          cls = 0;
        }
      } else if (cls > 3) {
        w(cln), --cls;
        for (; cls > 6; cls -= 6)
          w(8304);
        if (cls > 2)
          w(cls - 3 << 5 | 8208), cls = 0;
      }
      while (cls--)
        w(cln);
      cls = 1;
      cln = c[i];
    }
  }
  return { c: cl.subarray(0, cli), n: s };
};
var clen = function(cf, cl) {
  var l = 0;
  for (var i = 0; i < cl.length; ++i)
    l += cf[i] * cl[i];
  return l;
};
var wfblk = function(out, pos, dat) {
  var s = dat.length;
  var o = shft(pos + 2);
  out[o] = s & 255;
  out[o + 1] = s >> 8;
  out[o + 2] = out[o] ^ 255;
  out[o + 3] = out[o + 1] ^ 255;
  for (var i = 0; i < s; ++i)
    out[o + i + 4] = dat[i];
  return (o + 4 + s) * 8;
};
var wblk = function(dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
  wbits(out, p++, final);
  ++lf[256];
  var _a2 = hTree(lf, 15), dlt = _a2.t, mlb = _a2.l;
  var _b2 = hTree(df, 15), ddt = _b2.t, mdb = _b2.l;
  var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
  var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
  var lcfreq = new u16(19);
  for (var i = 0; i < lclt.length; ++i)
    ++lcfreq[lclt[i] & 31];
  for (var i = 0; i < lcdt.length; ++i)
    ++lcfreq[lcdt[i] & 31];
  var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
  var nlcc = 19;
  for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
    ;
  var flen = bl + 5 << 3;
  var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
  var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
  if (bs >= 0 && flen <= ftlen && flen <= dtlen)
    return wfblk(out, p, dat.subarray(bs, bs + bl));
  var lm, ll, dm, dl;
  wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
  if (dtlen < ftlen) {
    lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
    var llm = hMap(lct, mlcb, 0);
    wbits(out, p, nlc - 257);
    wbits(out, p + 5, ndc - 1);
    wbits(out, p + 10, nlcc - 4);
    p += 14;
    for (var i = 0; i < nlcc; ++i)
      wbits(out, p + 3 * i, lct[clim[i]]);
    p += 3 * nlcc;
    var lcts = [lclt, lcdt];
    for (var it = 0; it < 2; ++it) {
      var clct = lcts[it];
      for (var i = 0; i < clct.length; ++i) {
        var len = clct[i] & 31;
        wbits(out, p, llm[len]), p += lct[len];
        if (len > 15)
          wbits(out, p, clct[i] >> 5 & 127), p += clct[i] >> 12;
      }
    }
  } else {
    lm = flm, ll = flt, dm = fdm, dl = fdt;
  }
  for (var i = 0; i < li; ++i) {
    var sym = syms[i];
    if (sym > 255) {
      var len = sym >> 18 & 31;
      wbits16(out, p, lm[len + 257]), p += ll[len + 257];
      if (len > 7)
        wbits(out, p, sym >> 23 & 31), p += fleb[len];
      var dst = sym & 31;
      wbits16(out, p, dm[dst]), p += dl[dst];
      if (dst > 3)
        wbits16(out, p, sym >> 5 & 8191), p += fdeb[dst];
    } else {
      wbits16(out, p, lm[sym]), p += ll[sym];
    }
  }
  wbits16(out, p, lm[256]);
  return p + ll[256];
};
var deo = /* @__PURE__ */ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
var et = /* @__PURE__ */ new u8(0);
var dflt = function(dat, lvl, plvl, pre, post, st) {
  var s = st.z || dat.length;
  var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7e3)) + post);
  var w = o.subarray(pre, o.length - post);
  var lst = st.l;
  var pos = (st.r || 0) & 7;
  if (lvl) {
    if (pos)
      w[0] = st.r >> 3;
    var opt = deo[lvl - 1];
    var n = opt >> 13, c = opt & 8191;
    var msk_1 = (1 << plvl) - 1;
    var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
    var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
    var hsh = function(i2) {
      return (dat[i2] ^ dat[i2 + 1] << bs1_1 ^ dat[i2 + 2] << bs2_1) & msk_1;
    };
    var syms = new i32(25e3);
    var lf = new u16(288), df = new u16(32);
    var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
    for (; i + 2 < s; ++i) {
      var hv = hsh(i);
      var imod = i & 32767, pimod = head[hv];
      prev[imod] = pimod;
      head[hv] = imod;
      if (wi <= i) {
        var rem = s - i;
        if ((lc_1 > 7e3 || li > 24576) && (rem > 423 || !lst)) {
          pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
          li = lc_1 = eb = 0, bs = i;
          for (var j = 0; j < 286; ++j)
            lf[j] = 0;
          for (var j = 0; j < 30; ++j)
            df[j] = 0;
        }
        var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
        if (rem > 2 && hv == hsh(i - dif)) {
          var maxn = Math.min(n, rem) - 1;
          var maxd = Math.min(32767, i);
          var ml = Math.min(258, rem);
          while (dif <= maxd && --ch_1 && imod != pimod) {
            if (dat[i + l] == dat[i + l - dif]) {
              var nl = 0;
              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                ;
              if (nl > l) {
                l = nl, d = dif;
                if (nl > maxn)
                  break;
                var mmd = Math.min(dif, nl - 2);
                var md = 0;
                for (var j = 0; j < mmd; ++j) {
                  var ti = i - dif + j & 32767;
                  var pti = prev[ti];
                  var cd = ti - pti & 32767;
                  if (cd > md)
                    md = cd, pimod = ti;
                }
              }
            }
            imod = pimod, pimod = prev[imod];
            dif += imod - pimod & 32767;
          }
        }
        if (d) {
          syms[li++] = 268435456 | revfl[l] << 18 | revfd[d];
          var lin = revfl[l] & 31, din = revfd[d] & 31;
          eb += fleb[lin] + fdeb[din];
          ++lf[257 + lin];
          ++df[din];
          wi = i + l;
          ++lc_1;
        } else {
          syms[li++] = dat[i];
          ++lf[dat[i]];
        }
      }
    }
    for (i = Math.max(i, wi); i < s; ++i) {
      syms[li++] = dat[i];
      ++lf[dat[i]];
    }
    pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
    if (!lst) {
      st.r = pos & 7 | w[pos / 8 | 0] << 3;
      pos -= 7;
      st.h = head, st.p = prev, st.i = i, st.w = wi;
    }
  } else {
    for (var i = st.w || 0; i < s + lst; i += 65535) {
      var e = i + 65535;
      if (e >= s) {
        w[pos / 8 | 0] = lst;
        e = s;
      }
      pos = wfblk(w, pos + 1, dat.subarray(i, e));
    }
    st.i = s;
  }
  return slc(o, 0, pre + shft(pos) + post);
};
var crct = /* @__PURE__ */ function() {
  var t = new Int32Array(256);
  for (var i = 0; i < 256; ++i) {
    var c = i, k = 9;
    while (--k)
      c = (c & 1 && -306674912) ^ c >>> 1;
    t[i] = c;
  }
  return t;
}();
var crc = function() {
  var c = -1;
  return {
    p: function(d) {
      var cr = c;
      for (var i = 0; i < d.length; ++i)
        cr = crct[cr & 255 ^ d[i]] ^ cr >>> 8;
      c = cr;
    },
    d: function() {
      return ~c;
    }
  };
};
var dopt = function(dat, opt, pre, post, st) {
  if (!st) {
    st = { l: 1 };
    if (opt.dictionary) {
      var dict = opt.dictionary.subarray(-32768);
      var newDat = new u8(dict.length + dat.length);
      newDat.set(dict);
      newDat.set(dat, dict.length);
      dat = newDat;
      st.w = dict.length;
    }
  }
  return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20 : 12 + opt.mem, pre, post, st);
};
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
var bDflt = function() {
  return [u8, u16, i32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf];
};
var pbf = function(msg) {
  return postMessage(msg, [msg.buffer]);
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
var wbytes = function(d, b, v) {
  for (; v; ++b)
    d[b] = v, v >>>= 8;
};
function deflate(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  return cbify(data, opts, [
    bDflt
  ], function(ev) {
    return pbf(deflateSync(ev.data[0], ev.data[1]));
  }, 0, cb);
}
function deflateSync(data, opts) {
  return dopt(data, opts || {}, 0, 0);
}
var fltn = function(d, p, t, o) {
  for (var k in d) {
    var val = d[k], n = p + k, op = o;
    if (Array.isArray(val))
      op = mrg(o, val[1]), val = val[0];
    if (val instanceof u8)
      t[n] = [val, op];
    else {
      t[n += "/"] = [new u8(0), op];
      fltn(val, n, t, o);
    }
  }
};
var te = typeof TextEncoder != "undefined" && /* @__PURE__ */ new TextEncoder();
var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
var tds = 0;
try {
  td.decode(et, { stream: true });
  tds = 1;
} catch (e) {
}
function strToU8(str, latin1) {
  if (latin1) {
    var ar_1 = new u8(str.length);
    for (var i = 0; i < str.length; ++i)
      ar_1[i] = str.charCodeAt(i);
    return ar_1;
  }
  if (te)
    return te.encode(str);
  var l = str.length;
  var ar = new u8(str.length + (str.length >> 1));
  var ai = 0;
  var w = function(v) {
    ar[ai++] = v;
  };
  for (var i = 0; i < l; ++i) {
    if (ai + 5 > ar.length) {
      var n = new u8(ai + 8 + (l - i << 1));
      n.set(ar);
      ar = n;
    }
    var c = str.charCodeAt(i);
    if (c < 128 || latin1)
      w(c);
    else if (c < 2048)
      w(192 | c >> 6), w(128 | c & 63);
    else if (c > 55295 && c < 57344)
      c = 65536 + (c & 1023 << 10) | str.charCodeAt(++i) & 1023, w(240 | c >> 18), w(128 | c >> 12 & 63), w(128 | c >> 6 & 63), w(128 | c & 63);
    else
      w(224 | c >> 12), w(128 | c >> 6 & 63), w(128 | c & 63);
  }
  return slc(ar, 0, ai);
}
var exfl = function(ex) {
  var le = 0;
  if (ex) {
    for (var k in ex) {
      var l = ex[k].length;
      if (l > 65535)
        err(9);
      le += l + 4;
    }
  }
  return le;
};
var wzh = function(d, b, f, fn, u, c, ce, co) {
  var fl2 = fn.length, ex = f.extra, col = co && co.length;
  var exl = exfl(ex);
  wbytes(d, b, ce != null ? 33639248 : 67324752), b += 4;
  if (ce != null)
    d[b++] = 20, d[b++] = f.os;
  d[b] = 20, b += 2;
  d[b++] = f.flag << 1 | (c < 0 && 8), d[b++] = u && 8;
  d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
  var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
  if (y < 0 || y > 119)
    err(10);
  wbytes(d, b, y << 25 | dt.getMonth() + 1 << 21 | dt.getDate() << 16 | dt.getHours() << 11 | dt.getMinutes() << 5 | dt.getSeconds() >> 1), b += 4;
  if (c != -1) {
    wbytes(d, b, f.crc);
    wbytes(d, b + 4, c < 0 ? -c - 2 : c);
    wbytes(d, b + 8, f.size);
  }
  wbytes(d, b + 12, fl2);
  wbytes(d, b + 14, exl), b += 16;
  if (ce != null) {
    wbytes(d, b, col);
    wbytes(d, b + 6, f.attrs);
    wbytes(d, b + 10, ce), b += 14;
  }
  d.set(fn, b);
  b += fl2;
  if (exl) {
    for (var k in ex) {
      var exf = ex[k], l = exf.length;
      wbytes(d, b, +k);
      wbytes(d, b + 2, l);
      d.set(exf, b + 4), b += 4 + l;
    }
  }
  if (col)
    d.set(co, b), b += col;
  return b;
};
var wzf = function(o, b, c, d, e) {
  wbytes(o, b, 101010256);
  wbytes(o, b + 8, c);
  wbytes(o, b + 10, c);
  wbytes(o, b + 12, d);
  wbytes(o, b + 16, e);
};
function zip(data, opts, cb) {
  if (!cb)
    cb = opts, opts = {};
  if (typeof cb != "function")
    err(7);
  var r = {};
  fltn(data, "", r, opts);
  var k = Object.keys(r);
  var lft = k.length, o = 0, tot = 0;
  var slft = lft, files = new Array(lft);
  var term = [];
  var tAll = function() {
    for (var i2 = 0; i2 < term.length; ++i2)
      term[i2]();
  };
  var cbd = function(a, b) {
    mt(function() {
      cb(a, b);
    });
  };
  mt(function() {
    cbd = cb;
  });
  var cbf = function() {
    var out = new u8(tot + 22), oe = o, cdl = tot - o;
    tot = 0;
    for (var i2 = 0; i2 < slft; ++i2) {
      var f = files[i2];
      try {
        var l = f.c.length;
        wzh(out, tot, f, f.f, f.u, l);
        var badd = 30 + f.f.length + exfl(f.extra);
        var loc = tot + badd;
        out.set(f.c, loc);
        wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
      } catch (e) {
        return cbd(e, null);
      }
    }
    wzf(out, o, files.length, cdl, oe);
    cbd(null, out);
  };
  if (!lft)
    cbf();
  var _loop_1 = function(i2) {
    var fn = k[i2];
    var _a2 = r[fn], file = _a2[0], p = _a2[1];
    var c = crc(), size = file.length;
    c.p(file);
    var f = strToU8(fn), s = f.length;
    var com = p.comment, m = com && strToU8(com), ms = m && m.length;
    var exl = exfl(p.extra);
    var compression = p.level == 0 ? 0 : 8;
    var cbl = function(e, d) {
      if (e) {
        tAll();
        cbd(e, null);
      } else {
        var l = d.length;
        files[i2] = mrg(p, {
          size,
          crc: c.d(),
          c: d,
          f,
          m,
          u: s != fn.length || m && com.length != ms,
          compression
        });
        o += 30 + s + exl + l;
        tot += 76 + 2 * (s + exl) + (ms || 0) + l;
        if (!--lft)
          cbf();
      }
    };
    if (s > 65535)
      cbl(err(11, 0, 1), null);
    if (!compression)
      cbl(null, file);
    else if (size < 16e4) {
      try {
        cbl(null, deflateSync(file, p));
      } catch (e) {
        cbl(e, null);
      }
    } else
      term.push(deflate(file, p, cbl));
  };
  for (var i = 0; i < slft; ++i) {
    _loop_1(i);
  }
  return tAll;
}
var mt = typeof queueMicrotask == "function" ? queueMicrotask : typeof setTimeout == "function" ? setTimeout : function(fn) {
  fn();
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

// src/worker/compress.ts
self.onmessage = (event) => {
  compress(event.data).map((bytes) => {
    self.postMessage({ event: "ARCHIVE_CREATED" /* ARCHIVE_CREATED */, buffer: bytes.buffer }, [
      bytes.buffer
    ]);
  }).mapErr((error) => {
    self.postMessage({ event: "OPERATION_FAILED" /* OPERATION_FAILED */, error });
  });
};
var compress = (workerMessage) => {
  const { archive } = workerMessage.args;
  if (archive) {
    const promiseZip = () => new Promise((resolve, reject) => {
      if (archive.entries) {
        zip(archive.entries, (error, data) => {
          if (error) reject(error);
          resolve(data);
        });
      } else {
        reject(
          new WorkerUndefinedParameterError(
            "archive.entries must be defined"
          )
        );
      }
    });
    return ResultAsync.fromPromise(
      promiseZip(),
      (error) => error
    ).andThen((bytes) => okAsync(bytes)).orElse(
      (error) => errAsync(
        new ZipCompressionError(void 0, { cause: ensureError(error) })
      )
    );
  } else {
    return errAsync(
      new WorkerUndefinedParameterError("archive must be defined")
    );
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL2Vycm9yL2Jhc2UtZXJyb3IudHMiLCAiLi4vLi4vc3JjL2Vycm9yL3ppcC96aXAtZXJyb3IudHMiLCAiLi4vLi4vc3JjL2Vycm9yL3ppcC96aXAtY29tcHJlc3Npb24tZXJyb3IudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2ZmbGF0ZUAwLjguMi9ub2RlX21vZHVsZXMvZmZsYXRlL2VzbS9icm93c2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9uZXZlcnRocm93QDguMS4xL25vZGVfbW9kdWxlcy9uZXZlcnRocm93L2Rpc3QvaW5kZXguZXMuanMiLCAiLi4vLi4vc3JjL2Vycm9yL3dvcmtlci93b3JrZXItZXJyb3IudHMiLCAiLi4vLi4vc3JjL2Vycm9yL3dvcmtlci93b3JrZXItdW5kZWZpbmVkLXBhcmFtZXRlci1lcnJvci50cyIsICIuLi8uLi9zcmMvdXRpbHMudHMiLCAiLi4vLi4vc3JjL3dvcmtlci9jb21wcmVzcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsidHlwZSBKc29uYWJsZSA9XG4gIHwgc3RyaW5nXG4gIHwgbnVtYmVyXG4gIHwgYm9vbGVhblxuICB8IG51bGxcbiAgfCB1bmRlZmluZWRcbiAgfCByZWFkb25seSBKc29uYWJsZVtdXG4gIHwgeyByZWFkb25seSBba2V5OiBzdHJpbmddOiBKc29uYWJsZSB9XG4gIHwgeyB0b0pTT04oKTogSnNvbmFibGUgfTtcblxuZXhwb3J0IGNsYXNzIEJhc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbnRleHQ/OiBKc29uYWJsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIG9wdGlvbnM6IHsgY2F1c2U/OiBFcnJvcjsgY29udGV4dD86IEpzb25hYmxlIH0gPSB7fSxcbiAgKSB7XG4gICAgY29uc3QgeyBjYXVzZSwgY29udGV4dCB9ID0gb3B0aW9ucztcblxuICAgIHN1cGVyKG1lc3NhZ2UsIHsgY2F1c2UgfSk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgfVxufVxuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIFppcEVycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgWmlwRXJyb3IgfSBmcm9tIFwifi9lcnJvci96aXAvemlwLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBaaXBDb21wcmVzc2lvbkVycm9yIGV4dGVuZHMgWmlwRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlID0gXCJBbiBlcnJvciBvY2N1cmVkIHdoaWxlIHRyeWluZyB0byBjb21wcmVzcyB0aGUgZGF0YVwiO1xufVxuIiwgIi8vIERFRkxBVEUgaXMgYSBjb21wbGV4IGZvcm1hdDsgdG8gcmVhZCB0aGlzIGNvZGUsIHlvdSBzaG91bGQgcHJvYmFibHkgY2hlY2sgdGhlIFJGQyBmaXJzdDpcbi8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMxOTUxXG4vLyBZb3UgbWF5IGFsc28gd2lzaCB0byB0YWtlIGEgbG9vayBhdCB0aGUgZ3VpZGUgSSBtYWRlIGFib3V0IHRoaXMgcHJvZ3JhbTpcbi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzEwMWFycm93ei8yNTNmMzFlYjVhYmMzZDkyNzVhYjk0MzAwM2ZmZWNhZFxuLy8gU29tZSBvZiB0aGUgZm9sbG93aW5nIGNvZGUgaXMgc2ltaWxhciB0byB0aGF0IG9mIFVaSVAuanM6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vcGhvdG9wZWEvVVpJUC5qc1xuLy8gSG93ZXZlciwgdGhlIHZhc3QgbWFqb3JpdHkgb2YgdGhlIGNvZGViYXNlIGhhcyBkaXZlcmdlZCBmcm9tIFVaSVAuanMgdG8gaW5jcmVhc2UgcGVyZm9ybWFuY2UgYW5kIHJlZHVjZSBidW5kbGUgc2l6ZS5cbi8vIFNvbWV0aW1lcyAwIHdpbGwgYXBwZWFyIHdoZXJlIC0xIHdvdWxkIGJlIG1vcmUgYXBwcm9wcmlhdGUuIFRoaXMgaXMgYmVjYXVzZSB1c2luZyBhIHVpbnRcbi8vIGlzIGJldHRlciBmb3IgbWVtb3J5IGluIG1vc3QgZW5naW5lcyAoSSAqdGhpbmsqKS5cbnZhciBjaDIgPSB7fTtcbnZhciB3ayA9IChmdW5jdGlvbiAoYywgaWQsIG1zZywgdHJhbnNmZXIsIGNiKSB7XG4gICAgdmFyIHcgPSBuZXcgV29ya2VyKGNoMltpZF0gfHwgKGNoMltpZF0gPSBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtcbiAgICAgICAgYyArICc7YWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZnVuY3Rpb24oZSl7ZT1lLmVycm9yO3Bvc3RNZXNzYWdlKHskZSQ6W2UubWVzc2FnZSxlLmNvZGUsZS5zdGFja119KX0pJ1xuICAgIF0sIHsgdHlwZTogJ3RleHQvamF2YXNjcmlwdCcgfSkpKSk7XG4gICAgdy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgZCA9IGUuZGF0YSwgZWQgPSBkLiRlJDtcbiAgICAgICAgaWYgKGVkKSB7XG4gICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKGVkWzBdKTtcbiAgICAgICAgICAgIGVyclsnY29kZSddID0gZWRbMV07XG4gICAgICAgICAgICBlcnIuc3RhY2sgPSBlZFsyXTtcbiAgICAgICAgICAgIGNiKGVyciwgbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgY2IobnVsbCwgZCk7XG4gICAgfTtcbiAgICB3LnBvc3RNZXNzYWdlKG1zZywgdHJhbnNmZXIpO1xuICAgIHJldHVybiB3O1xufSk7XG5cbi8vIGFsaWFzZXMgZm9yIHNob3J0ZXIgY29tcHJlc3NlZCBjb2RlIChtb3N0IG1pbmlmZXJzIGRvbid0IGRvIHRoaXMpXG52YXIgdTggPSBVaW50OEFycmF5LCB1MTYgPSBVaW50MTZBcnJheSwgaTMyID0gSW50MzJBcnJheTtcbi8vIGZpeGVkIGxlbmd0aCBleHRyYSBiaXRzXG52YXIgZmxlYiA9IG5ldyB1OChbMCwgMCwgMCwgMCwgMCwgMCwgMCwgMCwgMSwgMSwgMSwgMSwgMiwgMiwgMiwgMiwgMywgMywgMywgMywgNCwgNCwgNCwgNCwgNSwgNSwgNSwgNSwgMCwgLyogdW51c2VkICovIDAsIDAsIC8qIGltcG9zc2libGUgKi8gMF0pO1xuLy8gZml4ZWQgZGlzdGFuY2UgZXh0cmEgYml0c1xudmFyIGZkZWIgPSBuZXcgdTgoWzAsIDAsIDAsIDAsIDEsIDEsIDIsIDIsIDMsIDMsIDQsIDQsIDUsIDUsIDYsIDYsIDcsIDcsIDgsIDgsIDksIDksIDEwLCAxMCwgMTEsIDExLCAxMiwgMTIsIDEzLCAxMywgLyogdW51c2VkICovIDAsIDBdKTtcbi8vIGNvZGUgbGVuZ3RoIGluZGV4IG1hcFxudmFyIGNsaW0gPSBuZXcgdTgoWzE2LCAxNywgMTgsIDAsIDgsIDcsIDksIDYsIDEwLCA1LCAxMSwgNCwgMTIsIDMsIDEzLCAyLCAxNCwgMSwgMTVdKTtcbi8vIGdldCBiYXNlLCByZXZlcnNlIGluZGV4IG1hcCBmcm9tIGV4dHJhIGJpdHNcbnZhciBmcmViID0gZnVuY3Rpb24gKGViLCBzdGFydCkge1xuICAgIHZhciBiID0gbmV3IHUxNigzMSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzMTsgKytpKSB7XG4gICAgICAgIGJbaV0gPSBzdGFydCArPSAxIDw8IGViW2kgLSAxXTtcbiAgICB9XG4gICAgLy8gbnVtYmVycyBoZXJlIGFyZSBhdCBtYXggMTggYml0c1xuICAgIHZhciByID0gbmV3IGkzMihiWzMwXSk7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAzMDsgKytpKSB7XG4gICAgICAgIGZvciAodmFyIGogPSBiW2ldOyBqIDwgYltpICsgMV07ICsraikge1xuICAgICAgICAgICAgcltqXSA9ICgoaiAtIGJbaV0pIDw8IDUpIHwgaTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geyBiOiBiLCByOiByIH07XG59O1xudmFyIF9hID0gZnJlYihmbGViLCAyKSwgZmwgPSBfYS5iLCByZXZmbCA9IF9hLnI7XG4vLyB3ZSBjYW4gaWdub3JlIHRoZSBmYWN0IHRoYXQgdGhlIG90aGVyIG51bWJlcnMgYXJlIHdyb25nOyB0aGV5IG5ldmVyIGhhcHBlbiBhbnl3YXlcbmZsWzI4XSA9IDI1OCwgcmV2ZmxbMjU4XSA9IDI4O1xudmFyIF9iID0gZnJlYihmZGViLCAwKSwgZmQgPSBfYi5iLCByZXZmZCA9IF9iLnI7XG4vLyBtYXAgb2YgdmFsdWUgdG8gcmV2ZXJzZSAoYXNzdW1pbmcgMTYgYml0cylcbnZhciByZXYgPSBuZXcgdTE2KDMyNzY4KTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMzI3Njg7ICsraSkge1xuICAgIC8vIHJldmVyc2UgdGFibGUgYWxnb3JpdGhtIGZyb20gU09cbiAgICB2YXIgeCA9ICgoaSAmIDB4QUFBQSkgPj4gMSkgfCAoKGkgJiAweDU1NTUpIDw8IDEpO1xuICAgIHggPSAoKHggJiAweENDQ0MpID4+IDIpIHwgKCh4ICYgMHgzMzMzKSA8PCAyKTtcbiAgICB4ID0gKCh4ICYgMHhGMEYwKSA+PiA0KSB8ICgoeCAmIDB4MEYwRikgPDwgNCk7XG4gICAgcmV2W2ldID0gKCgoeCAmIDB4RkYwMCkgPj4gOCkgfCAoKHggJiAweDAwRkYpIDw8IDgpKSA+PiAxO1xufVxuLy8gY3JlYXRlIGh1ZmZtYW4gdHJlZSBmcm9tIHU4IFwibWFwXCI6IGluZGV4IC0+IGNvZGUgbGVuZ3RoIGZvciBjb2RlIGluZGV4XG4vLyBtYiAobWF4IGJpdHMpIG11c3QgYmUgYXQgbW9zdCAxNVxuLy8gVE9ETzogb3B0aW1pemUvc3BsaXQgdXA/XG52YXIgaE1hcCA9IChmdW5jdGlvbiAoY2QsIG1iLCByKSB7XG4gICAgdmFyIHMgPSBjZC5sZW5ndGg7XG4gICAgLy8gaW5kZXhcbiAgICB2YXIgaSA9IDA7XG4gICAgLy8gdTE2IFwibWFwXCI6IGluZGV4IC0+ICMgb2YgY29kZXMgd2l0aCBiaXQgbGVuZ3RoID0gaW5kZXhcbiAgICB2YXIgbCA9IG5ldyB1MTYobWIpO1xuICAgIC8vIGxlbmd0aCBvZiBjZCBtdXN0IGJlIDI4OCAodG90YWwgIyBvZiBjb2RlcylcbiAgICBmb3IgKDsgaSA8IHM7ICsraSkge1xuICAgICAgICBpZiAoY2RbaV0pXG4gICAgICAgICAgICArK2xbY2RbaV0gLSAxXTtcbiAgICB9XG4gICAgLy8gdTE2IFwibWFwXCI6IGluZGV4IC0+IG1pbmltdW0gY29kZSBmb3IgYml0IGxlbmd0aCA9IGluZGV4XG4gICAgdmFyIGxlID0gbmV3IHUxNihtYik7XG4gICAgZm9yIChpID0gMTsgaSA8IG1iOyArK2kpIHtcbiAgICAgICAgbGVbaV0gPSAobGVbaSAtIDFdICsgbFtpIC0gMV0pIDw8IDE7XG4gICAgfVxuICAgIHZhciBjbztcbiAgICBpZiAocikge1xuICAgICAgICAvLyB1MTYgXCJtYXBcIjogaW5kZXggLT4gbnVtYmVyIG9mIGFjdHVhbCBiaXRzLCBzeW1ib2wgZm9yIGNvZGVcbiAgICAgICAgY28gPSBuZXcgdTE2KDEgPDwgbWIpO1xuICAgICAgICAvLyBiaXRzIHRvIHJlbW92ZSBmb3IgcmV2ZXJzZXJcbiAgICAgICAgdmFyIHJ2YiA9IDE1IC0gbWI7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIC8vIGlnbm9yZSAwIGxlbmd0aHNcbiAgICAgICAgICAgIGlmIChjZFtpXSkge1xuICAgICAgICAgICAgICAgIC8vIG51bSBlbmNvZGluZyBib3RoIHN5bWJvbCBhbmQgYml0cyByZWFkXG4gICAgICAgICAgICAgICAgdmFyIHN2ID0gKGkgPDwgNCkgfCBjZFtpXTtcbiAgICAgICAgICAgICAgICAvLyBmcmVlIGJpdHNcbiAgICAgICAgICAgICAgICB2YXIgcl8xID0gbWIgLSBjZFtpXTtcbiAgICAgICAgICAgICAgICAvLyBzdGFydCB2YWx1ZVxuICAgICAgICAgICAgICAgIHZhciB2ID0gbGVbY2RbaV0gLSAxXSsrIDw8IHJfMTtcbiAgICAgICAgICAgICAgICAvLyBtIGlzIGVuZCB2YWx1ZVxuICAgICAgICAgICAgICAgIGZvciAodmFyIG0gPSB2IHwgKCgxIDw8IHJfMSkgLSAxKTsgdiA8PSBtOyArK3YpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlcnkgMTYgYml0IHZhbHVlIHN0YXJ0aW5nIHdpdGggdGhlIGNvZGUgeWllbGRzIHRoZSBzYW1lIHJlc3VsdFxuICAgICAgICAgICAgICAgICAgICBjb1tyZXZbdl0gPj4gcnZiXSA9IHN2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY28gPSBuZXcgdTE2KHMpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgczsgKytpKSB7XG4gICAgICAgICAgICBpZiAoY2RbaV0pIHtcbiAgICAgICAgICAgICAgICBjb1tpXSA9IHJldltsZVtjZFtpXSAtIDFdKytdID4+ICgxNSAtIGNkW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY287XG59KTtcbi8vIGZpeGVkIGxlbmd0aCB0cmVlXG52YXIgZmx0ID0gbmV3IHU4KDI4OCk7XG5mb3IgKHZhciBpID0gMDsgaSA8IDE0NDsgKytpKVxuICAgIGZsdFtpXSA9IDg7XG5mb3IgKHZhciBpID0gMTQ0OyBpIDwgMjU2OyArK2kpXG4gICAgZmx0W2ldID0gOTtcbmZvciAodmFyIGkgPSAyNTY7IGkgPCAyODA7ICsraSlcbiAgICBmbHRbaV0gPSA3O1xuZm9yICh2YXIgaSA9IDI4MDsgaSA8IDI4ODsgKytpKVxuICAgIGZsdFtpXSA9IDg7XG4vLyBmaXhlZCBkaXN0YW5jZSB0cmVlXG52YXIgZmR0ID0gbmV3IHU4KDMyKTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMzI7ICsraSlcbiAgICBmZHRbaV0gPSA1O1xuLy8gZml4ZWQgbGVuZ3RoIG1hcFxudmFyIGZsbSA9IC8qI19fUFVSRV9fKi8gaE1hcChmbHQsIDksIDApLCBmbHJtID0gLyojX19QVVJFX18qLyBoTWFwKGZsdCwgOSwgMSk7XG4vLyBmaXhlZCBkaXN0YW5jZSBtYXBcbnZhciBmZG0gPSAvKiNfX1BVUkVfXyovIGhNYXAoZmR0LCA1LCAwKSwgZmRybSA9IC8qI19fUFVSRV9fKi8gaE1hcChmZHQsIDUsIDEpO1xuLy8gZmluZCBtYXggb2YgYXJyYXlcbnZhciBtYXggPSBmdW5jdGlvbiAoYSkge1xuICAgIHZhciBtID0gYVswXTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGFbaV0gPiBtKVxuICAgICAgICAgICAgbSA9IGFbaV07XG4gICAgfVxuICAgIHJldHVybiBtO1xufTtcbi8vIHJlYWQgZCwgc3RhcnRpbmcgYXQgYml0IHAgYW5kIG1hc2sgd2l0aCBtXG52YXIgYml0cyA9IGZ1bmN0aW9uIChkLCBwLCBtKSB7XG4gICAgdmFyIG8gPSAocCAvIDgpIHwgMDtcbiAgICByZXR1cm4gKChkW29dIHwgKGRbbyArIDFdIDw8IDgpKSA+PiAocCAmIDcpKSAmIG07XG59O1xuLy8gcmVhZCBkLCBzdGFydGluZyBhdCBiaXQgcCBjb250aW51aW5nIGZvciBhdCBsZWFzdCAxNiBiaXRzXG52YXIgYml0czE2ID0gZnVuY3Rpb24gKGQsIHApIHtcbiAgICB2YXIgbyA9IChwIC8gOCkgfCAwO1xuICAgIHJldHVybiAoKGRbb10gfCAoZFtvICsgMV0gPDwgOCkgfCAoZFtvICsgMl0gPDwgMTYpKSA+PiAocCAmIDcpKTtcbn07XG4vLyBnZXQgZW5kIG9mIGJ5dGVcbnZhciBzaGZ0ID0gZnVuY3Rpb24gKHApIHsgcmV0dXJuICgocCArIDcpIC8gOCkgfCAwOyB9O1xuLy8gdHlwZWQgYXJyYXkgc2xpY2UgLSBhbGxvd3MgZ2FyYmFnZSBjb2xsZWN0b3IgdG8gZnJlZSBvcmlnaW5hbCByZWZlcmVuY2UsXG4vLyB3aGlsZSBiZWluZyBtb3JlIGNvbXBhdGlibGUgdGhhbiAuc2xpY2VcbnZhciBzbGMgPSBmdW5jdGlvbiAodiwgcywgZSkge1xuICAgIGlmIChzID09IG51bGwgfHwgcyA8IDApXG4gICAgICAgIHMgPSAwO1xuICAgIGlmIChlID09IG51bGwgfHwgZSA+IHYubGVuZ3RoKVxuICAgICAgICBlID0gdi5sZW5ndGg7XG4gICAgLy8gY2FuJ3QgdXNlIC5jb25zdHJ1Y3RvciBpbiBjYXNlIHVzZXItc3VwcGxpZWRcbiAgICByZXR1cm4gbmV3IHU4KHYuc3ViYXJyYXkocywgZSkpO1xufTtcbi8qKlxuICogQ29kZXMgZm9yIGVycm9ycyBnZW5lcmF0ZWQgd2l0aGluIHRoaXMgbGlicmFyeVxuICovXG5leHBvcnQgdmFyIEZsYXRlRXJyb3JDb2RlID0ge1xuICAgIFVuZXhwZWN0ZWRFT0Y6IDAsXG4gICAgSW52YWxpZEJsb2NrVHlwZTogMSxcbiAgICBJbnZhbGlkTGVuZ3RoTGl0ZXJhbDogMixcbiAgICBJbnZhbGlkRGlzdGFuY2U6IDMsXG4gICAgU3RyZWFtRmluaXNoZWQ6IDQsXG4gICAgTm9TdHJlYW1IYW5kbGVyOiA1LFxuICAgIEludmFsaWRIZWFkZXI6IDYsXG4gICAgTm9DYWxsYmFjazogNyxcbiAgICBJbnZhbGlkVVRGODogOCxcbiAgICBFeHRyYUZpZWxkVG9vTG9uZzogOSxcbiAgICBJbnZhbGlkRGF0ZTogMTAsXG4gICAgRmlsZW5hbWVUb29Mb25nOiAxMSxcbiAgICBTdHJlYW1GaW5pc2hpbmc6IDEyLFxuICAgIEludmFsaWRaaXBEYXRhOiAxMyxcbiAgICBVbmtub3duQ29tcHJlc3Npb25NZXRob2Q6IDE0XG59O1xuLy8gZXJyb3IgY29kZXNcbnZhciBlYyA9IFtcbiAgICAndW5leHBlY3RlZCBFT0YnLFxuICAgICdpbnZhbGlkIGJsb2NrIHR5cGUnLFxuICAgICdpbnZhbGlkIGxlbmd0aC9saXRlcmFsJyxcbiAgICAnaW52YWxpZCBkaXN0YW5jZScsXG4gICAgJ3N0cmVhbSBmaW5pc2hlZCcsXG4gICAgJ25vIHN0cmVhbSBoYW5kbGVyJyxcbiAgICAsXG4gICAgJ25vIGNhbGxiYWNrJyxcbiAgICAnaW52YWxpZCBVVEYtOCBkYXRhJyxcbiAgICAnZXh0cmEgZmllbGQgdG9vIGxvbmcnLFxuICAgICdkYXRlIG5vdCBpbiByYW5nZSAxOTgwLTIwOTknLFxuICAgICdmaWxlbmFtZSB0b28gbG9uZycsXG4gICAgJ3N0cmVhbSBmaW5pc2hpbmcnLFxuICAgICdpbnZhbGlkIHppcCBkYXRhJ1xuICAgIC8vIGRldGVybWluZWQgYnkgdW5rbm93biBjb21wcmVzc2lvbiBtZXRob2Rcbl07XG47XG52YXIgZXJyID0gZnVuY3Rpb24gKGluZCwgbXNnLCBudCkge1xuICAgIHZhciBlID0gbmV3IEVycm9yKG1zZyB8fCBlY1tpbmRdKTtcbiAgICBlLmNvZGUgPSBpbmQ7XG4gICAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKVxuICAgICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZShlLCBlcnIpO1xuICAgIGlmICghbnQpXG4gICAgICAgIHRocm93IGU7XG4gICAgcmV0dXJuIGU7XG59O1xuLy8gZXhwYW5kcyByYXcgREVGTEFURSBkYXRhXG52YXIgaW5mbHQgPSBmdW5jdGlvbiAoZGF0LCBzdCwgYnVmLCBkaWN0KSB7XG4gICAgLy8gc291cmNlIGxlbmd0aCAgICAgICBkaWN0IGxlbmd0aFxuICAgIHZhciBzbCA9IGRhdC5sZW5ndGgsIGRsID0gZGljdCA/IGRpY3QubGVuZ3RoIDogMDtcbiAgICBpZiAoIXNsIHx8IHN0LmYgJiYgIXN0LmwpXG4gICAgICAgIHJldHVybiBidWYgfHwgbmV3IHU4KDApO1xuICAgIHZhciBub0J1ZiA9ICFidWY7XG4gICAgLy8gaGF2ZSB0byBlc3RpbWF0ZSBzaXplXG4gICAgdmFyIHJlc2l6ZSA9IG5vQnVmIHx8IHN0LmkgIT0gMjtcbiAgICAvLyBubyBzdGF0ZVxuICAgIHZhciBub1N0ID0gc3QuaTtcbiAgICAvLyBBc3N1bWVzIHJvdWdobHkgMzMlIGNvbXByZXNzaW9uIHJhdGlvIGF2ZXJhZ2VcbiAgICBpZiAobm9CdWYpXG4gICAgICAgIGJ1ZiA9IG5ldyB1OChzbCAqIDMpO1xuICAgIC8vIGVuc3VyZSBidWZmZXIgY2FuIGZpdCBhdCBsZWFzdCBsIGVsZW1lbnRzXG4gICAgdmFyIGNidWYgPSBmdW5jdGlvbiAobCkge1xuICAgICAgICB2YXIgYmwgPSBidWYubGVuZ3RoO1xuICAgICAgICAvLyBuZWVkIHRvIGluY3JlYXNlIHNpemUgdG8gZml0XG4gICAgICAgIGlmIChsID4gYmwpIHtcbiAgICAgICAgICAgIC8vIERvdWJsZSBvciBzZXQgdG8gbmVjZXNzYXJ5LCB3aGljaGV2ZXIgaXMgZ3JlYXRlclxuICAgICAgICAgICAgdmFyIG5idWYgPSBuZXcgdTgoTWF0aC5tYXgoYmwgKiAyLCBsKSk7XG4gICAgICAgICAgICBuYnVmLnNldChidWYpO1xuICAgICAgICAgICAgYnVmID0gbmJ1ZjtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLy8gIGxhc3QgY2h1bmsgICAgICAgICBiaXRwb3MgICAgICAgICAgIGJ5dGVzXG4gICAgdmFyIGZpbmFsID0gc3QuZiB8fCAwLCBwb3MgPSBzdC5wIHx8IDAsIGJ0ID0gc3QuYiB8fCAwLCBsbSA9IHN0LmwsIGRtID0gc3QuZCwgbGJ0ID0gc3QubSwgZGJ0ID0gc3QubjtcbiAgICAvLyB0b3RhbCBiaXRzXG4gICAgdmFyIHRidHMgPSBzbCAqIDg7XG4gICAgZG8ge1xuICAgICAgICBpZiAoIWxtKSB7XG4gICAgICAgICAgICAvLyBCRklOQUwgLSB0aGlzIGlzIG9ubHkgMSB3aGVuIGxhc3QgY2h1bmsgaXMgbmV4dFxuICAgICAgICAgICAgZmluYWwgPSBiaXRzKGRhdCwgcG9zLCAxKTtcbiAgICAgICAgICAgIC8vIHR5cGU6IDAgPSBubyBjb21wcmVzc2lvbiwgMSA9IGZpeGVkIGh1ZmZtYW4sIDIgPSBkeW5hbWljIGh1ZmZtYW5cbiAgICAgICAgICAgIHZhciB0eXBlID0gYml0cyhkYXQsIHBvcyArIDEsIDMpO1xuICAgICAgICAgICAgcG9zICs9IDM7XG4gICAgICAgICAgICBpZiAoIXR5cGUpIHtcbiAgICAgICAgICAgICAgICAvLyBnbyB0byBlbmQgb2YgYnl0ZSBib3VuZGFyeVxuICAgICAgICAgICAgICAgIHZhciBzID0gc2hmdChwb3MpICsgNCwgbCA9IGRhdFtzIC0gNF0gfCAoZGF0W3MgLSAzXSA8PCA4KSwgdCA9IHMgKyBsO1xuICAgICAgICAgICAgICAgIGlmICh0ID4gc2wpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vU3QpXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIoMCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbnN1cmUgc2l6ZVxuICAgICAgICAgICAgICAgIGlmIChyZXNpemUpXG4gICAgICAgICAgICAgICAgICAgIGNidWYoYnQgKyBsKTtcbiAgICAgICAgICAgICAgICAvLyBDb3B5IG92ZXIgdW5jb21wcmVzc2VkIGRhdGFcbiAgICAgICAgICAgICAgICBidWYuc2V0KGRhdC5zdWJhcnJheShzLCB0KSwgYnQpO1xuICAgICAgICAgICAgICAgIC8vIEdldCBuZXcgYml0cG9zLCB1cGRhdGUgYnl0ZSBjb3VudFxuICAgICAgICAgICAgICAgIHN0LmIgPSBidCArPSBsLCBzdC5wID0gcG9zID0gdCAqIDgsIHN0LmYgPSBmaW5hbDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMSlcbiAgICAgICAgICAgICAgICBsbSA9IGZscm0sIGRtID0gZmRybSwgbGJ0ID0gOSwgZGJ0ID0gNTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgIC8vICBsaXRlcmFsICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aHNcbiAgICAgICAgICAgICAgICB2YXIgaExpdCA9IGJpdHMoZGF0LCBwb3MsIDMxKSArIDI1NywgaGNMZW4gPSBiaXRzKGRhdCwgcG9zICsgMTAsIDE1KSArIDQ7XG4gICAgICAgICAgICAgICAgdmFyIHRsID0gaExpdCArIGJpdHMoZGF0LCBwb3MgKyA1LCAzMSkgKyAxO1xuICAgICAgICAgICAgICAgIHBvcyArPSAxNDtcbiAgICAgICAgICAgICAgICAvLyBsZW5ndGgrZGlzdGFuY2UgdHJlZVxuICAgICAgICAgICAgICAgIHZhciBsZHQgPSBuZXcgdTgodGwpO1xuICAgICAgICAgICAgICAgIC8vIGNvZGUgbGVuZ3RoIHRyZWVcbiAgICAgICAgICAgICAgICB2YXIgY2x0ID0gbmV3IHU4KDE5KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhjTGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdXNlIGluZGV4IG1hcCB0byBnZXQgcmVhbCBjb2RlXG4gICAgICAgICAgICAgICAgICAgIGNsdFtjbGltW2ldXSA9IGJpdHMoZGF0LCBwb3MgKyBpICogMywgNyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcyArPSBoY0xlbiAqIDM7XG4gICAgICAgICAgICAgICAgLy8gY29kZSBsZW5ndGhzIGJpdHNcbiAgICAgICAgICAgICAgICB2YXIgY2xiID0gbWF4KGNsdCksIGNsYm1zayA9ICgxIDw8IGNsYikgLSAxO1xuICAgICAgICAgICAgICAgIC8vIGNvZGUgbGVuZ3RocyBtYXBcbiAgICAgICAgICAgICAgICB2YXIgY2xtID0gaE1hcChjbHQsIGNsYiwgMSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0bDspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIgPSBjbG1bYml0cyhkYXQsIHBvcywgY2xibXNrKV07XG4gICAgICAgICAgICAgICAgICAgIC8vIGJpdHMgcmVhZFxuICAgICAgICAgICAgICAgICAgICBwb3MgKz0gciAmIDE1O1xuICAgICAgICAgICAgICAgICAgICAvLyBzeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSByID4+IDQ7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvZGUgbGVuZ3RoIHRvIGNvcHlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMgPCAxNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGR0W2krK10gPSBzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGNvcHkgICBjb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSAwLCBuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzID09IDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSAzICsgYml0cyhkYXQsIHBvcywgMyksIHBvcyArPSAyLCBjID0gbGR0W2kgLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMgPT0gMTcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IDMgKyBiaXRzKGRhdCwgcG9zLCA3KSwgcG9zICs9IDM7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzID09IDE4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG4gPSAxMSArIGJpdHMoZGF0LCBwb3MsIDEyNyksIHBvcyArPSA3O1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKG4tLSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZHRbaSsrXSA9IGM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gICAgbGVuZ3RoIHRyZWUgICAgICAgICAgICAgICAgIGRpc3RhbmNlIHRyZWVcbiAgICAgICAgICAgICAgICB2YXIgbHQgPSBsZHQuc3ViYXJyYXkoMCwgaExpdCksIGR0ID0gbGR0LnN1YmFycmF5KGhMaXQpO1xuICAgICAgICAgICAgICAgIC8vIG1heCBsZW5ndGggYml0c1xuICAgICAgICAgICAgICAgIGxidCA9IG1heChsdCk7XG4gICAgICAgICAgICAgICAgLy8gbWF4IGRpc3QgYml0c1xuICAgICAgICAgICAgICAgIGRidCA9IG1heChkdCk7XG4gICAgICAgICAgICAgICAgbG0gPSBoTWFwKGx0LCBsYnQsIDEpO1xuICAgICAgICAgICAgICAgIGRtID0gaE1hcChkdCwgZGJ0LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlcnIoMSk7XG4gICAgICAgICAgICBpZiAocG9zID4gdGJ0cykge1xuICAgICAgICAgICAgICAgIGlmIChub1N0KVxuICAgICAgICAgICAgICAgICAgICBlcnIoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBidWZmZXIgY2FuIGhvbGQgdGhpcyArIHRoZSBsYXJnZXN0IHBvc3NpYmxlIGFkZGl0aW9uXG4gICAgICAgIC8vIE1heGltdW0gY2h1bmsgc2l6ZSAocHJhY3RpY2FsbHksIHRoZW9yZXRpY2FsbHkgaW5maW5pdGUpIGlzIDJeMTdcbiAgICAgICAgaWYgKHJlc2l6ZSlcbiAgICAgICAgICAgIGNidWYoYnQgKyAxMzEwNzIpO1xuICAgICAgICB2YXIgbG1zID0gKDEgPDwgbGJ0KSAtIDEsIGRtcyA9ICgxIDw8IGRidCkgLSAxO1xuICAgICAgICB2YXIgbHBvcyA9IHBvcztcbiAgICAgICAgZm9yICg7OyBscG9zID0gcG9zKSB7XG4gICAgICAgICAgICAvLyBiaXRzIHJlYWQsIGNvZGVcbiAgICAgICAgICAgIHZhciBjID0gbG1bYml0czE2KGRhdCwgcG9zKSAmIGxtc10sIHN5bSA9IGMgPj4gNDtcbiAgICAgICAgICAgIHBvcyArPSBjICYgMTU7XG4gICAgICAgICAgICBpZiAocG9zID4gdGJ0cykge1xuICAgICAgICAgICAgICAgIGlmIChub1N0KVxuICAgICAgICAgICAgICAgICAgICBlcnIoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWMpXG4gICAgICAgICAgICAgICAgZXJyKDIpO1xuICAgICAgICAgICAgaWYgKHN5bSA8IDI1NilcbiAgICAgICAgICAgICAgICBidWZbYnQrK10gPSBzeW07XG4gICAgICAgICAgICBlbHNlIGlmIChzeW0gPT0gMjU2KSB7XG4gICAgICAgICAgICAgICAgbHBvcyA9IHBvcywgbG0gPSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGFkZCA9IHN5bSAtIDI1NDtcbiAgICAgICAgICAgICAgICAvLyBubyBleHRyYSBiaXRzIG5lZWRlZCBpZiBsZXNzXG4gICAgICAgICAgICAgICAgaWYgKHN5bSA+IDI2NCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpbmRleFxuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IHN5bSAtIDI1NywgYiA9IGZsZWJbaV07XG4gICAgICAgICAgICAgICAgICAgIGFkZCA9IGJpdHMoZGF0LCBwb3MsICgxIDw8IGIpIC0gMSkgKyBmbFtpXTtcbiAgICAgICAgICAgICAgICAgICAgcG9zICs9IGI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGRpc3RcbiAgICAgICAgICAgICAgICB2YXIgZCA9IGRtW2JpdHMxNihkYXQsIHBvcykgJiBkbXNdLCBkc3ltID0gZCA+PiA0O1xuICAgICAgICAgICAgICAgIGlmICghZClcbiAgICAgICAgICAgICAgICAgICAgZXJyKDMpO1xuICAgICAgICAgICAgICAgIHBvcyArPSBkICYgMTU7XG4gICAgICAgICAgICAgICAgdmFyIGR0ID0gZmRbZHN5bV07XG4gICAgICAgICAgICAgICAgaWYgKGRzeW0gPiAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBiID0gZmRlYltkc3ltXTtcbiAgICAgICAgICAgICAgICAgICAgZHQgKz0gYml0czE2KGRhdCwgcG9zKSAmICgxIDw8IGIpIC0gMSwgcG9zICs9IGI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwb3MgPiB0YnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChub1N0KVxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyKDApO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlc2l6ZSlcbiAgICAgICAgICAgICAgICAgICAgY2J1ZihidCArIDEzMTA3Mik7XG4gICAgICAgICAgICAgICAgdmFyIGVuZCA9IGJ0ICsgYWRkO1xuICAgICAgICAgICAgICAgIGlmIChidCA8IGR0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaGlmdCA9IGRsIC0gZHQsIGRlbmQgPSBNYXRoLm1pbihkdCwgZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoaWZ0ICsgYnQgPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyKDMpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgYnQgPCBkZW5kOyArK2J0KVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmW2J0XSA9IGRpY3Rbc2hpZnQgKyBidF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoOyBidCA8IGVuZDsgKytidClcbiAgICAgICAgICAgICAgICAgICAgYnVmW2J0XSA9IGJ1ZltidCAtIGR0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdC5sID0gbG0sIHN0LnAgPSBscG9zLCBzdC5iID0gYnQsIHN0LmYgPSBmaW5hbDtcbiAgICAgICAgaWYgKGxtKVxuICAgICAgICAgICAgZmluYWwgPSAxLCBzdC5tID0gbGJ0LCBzdC5kID0gZG0sIHN0Lm4gPSBkYnQ7XG4gICAgfSB3aGlsZSAoIWZpbmFsKTtcbiAgICAvLyBkb24ndCByZWFsbG9jYXRlIGZvciBzdHJlYW1zIG9yIHVzZXIgYnVmZmVyc1xuICAgIHJldHVybiBidCAhPSBidWYubGVuZ3RoICYmIG5vQnVmID8gc2xjKGJ1ZiwgMCwgYnQpIDogYnVmLnN1YmFycmF5KDAsIGJ0KTtcbn07XG4vLyBzdGFydGluZyBhdCBwLCB3cml0ZSB0aGUgbWluaW11bSBudW1iZXIgb2YgYml0cyB0aGF0IGNhbiBob2xkIHYgdG8gZFxudmFyIHdiaXRzID0gZnVuY3Rpb24gKGQsIHAsIHYpIHtcbiAgICB2IDw8PSBwICYgNztcbiAgICB2YXIgbyA9IChwIC8gOCkgfCAwO1xuICAgIGRbb10gfD0gdjtcbiAgICBkW28gKyAxXSB8PSB2ID4+IDg7XG59O1xuLy8gc3RhcnRpbmcgYXQgcCwgd3JpdGUgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGJpdHMgKD44KSB0aGF0IGNhbiBob2xkIHYgdG8gZFxudmFyIHdiaXRzMTYgPSBmdW5jdGlvbiAoZCwgcCwgdikge1xuICAgIHYgPDw9IHAgJiA3O1xuICAgIHZhciBvID0gKHAgLyA4KSB8IDA7XG4gICAgZFtvXSB8PSB2O1xuICAgIGRbbyArIDFdIHw9IHYgPj4gODtcbiAgICBkW28gKyAyXSB8PSB2ID4+IDE2O1xufTtcbi8vIGNyZWF0ZXMgY29kZSBsZW5ndGhzIGZyb20gYSBmcmVxdWVuY3kgdGFibGVcbnZhciBoVHJlZSA9IGZ1bmN0aW9uIChkLCBtYikge1xuICAgIC8vIE5lZWQgZXh0cmEgaW5mbyB0byBtYWtlIGEgdHJlZVxuICAgIHZhciB0ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChkW2ldKVxuICAgICAgICAgICAgdC5wdXNoKHsgczogaSwgZjogZFtpXSB9KTtcbiAgICB9XG4gICAgdmFyIHMgPSB0Lmxlbmd0aDtcbiAgICB2YXIgdDIgPSB0LnNsaWNlKCk7XG4gICAgaWYgKCFzKVxuICAgICAgICByZXR1cm4geyB0OiBldCwgbDogMCB9O1xuICAgIGlmIChzID09IDEpIHtcbiAgICAgICAgdmFyIHYgPSBuZXcgdTgodFswXS5zICsgMSk7XG4gICAgICAgIHZbdFswXS5zXSA9IDE7XG4gICAgICAgIHJldHVybiB7IHQ6IHYsIGw6IDEgfTtcbiAgICB9XG4gICAgdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmYgLSBiLmY7IH0pO1xuICAgIC8vIGFmdGVyIGkyIHJlYWNoZXMgbGFzdCBpbmQsIHdpbGwgYmUgc3RvcHBlZFxuICAgIC8vIGZyZXEgbXVzdCBiZSBncmVhdGVyIHRoYW4gbGFyZ2VzdCBwb3NzaWJsZSBudW1iZXIgb2Ygc3ltYm9sc1xuICAgIHQucHVzaCh7IHM6IC0xLCBmOiAyNTAwMSB9KTtcbiAgICB2YXIgbCA9IHRbMF0sIHIgPSB0WzFdLCBpMCA9IDAsIGkxID0gMSwgaTIgPSAyO1xuICAgIHRbMF0gPSB7IHM6IC0xLCBmOiBsLmYgKyByLmYsIGw6IGwsIHI6IHIgfTtcbiAgICAvLyBlZmZpY2llbnQgYWxnb3JpdGhtIGZyb20gVVpJUC5qc1xuICAgIC8vIGkwIGlzIGxvb2tiZWhpbmQsIGkyIGlzIGxvb2thaGVhZCAtIGFmdGVyIHByb2Nlc3NpbmcgdHdvIGxvdy1mcmVxXG4gICAgLy8gc3ltYm9scyB0aGF0IGNvbWJpbmVkIGhhdmUgaGlnaCBmcmVxLCB3aWxsIHN0YXJ0IHByb2Nlc3NpbmcgaTIgKGhpZ2gtZnJlcSxcbiAgICAvLyBub24tY29tcG9zaXRlKSBzeW1ib2xzIGluc3RlYWRcbiAgICAvLyBzZWUgaHR0cHM6Ly9yZWRkaXQuY29tL3IvcGhvdG9wZWEvY29tbWVudHMvaWtla2h0L3V6aXBqc19xdWVzdGlvbnMvXG4gICAgd2hpbGUgKGkxICE9IHMgLSAxKSB7XG4gICAgICAgIGwgPSB0W3RbaTBdLmYgPCB0W2kyXS5mID8gaTArKyA6IGkyKytdO1xuICAgICAgICByID0gdFtpMCAhPSBpMSAmJiB0W2kwXS5mIDwgdFtpMl0uZiA/IGkwKysgOiBpMisrXTtcbiAgICAgICAgdFtpMSsrXSA9IHsgczogLTEsIGY6IGwuZiArIHIuZiwgbDogbCwgcjogciB9O1xuICAgIH1cbiAgICB2YXIgbWF4U3ltID0gdDJbMF0ucztcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHM7ICsraSkge1xuICAgICAgICBpZiAodDJbaV0ucyA+IG1heFN5bSlcbiAgICAgICAgICAgIG1heFN5bSA9IHQyW2ldLnM7XG4gICAgfVxuICAgIC8vIGNvZGUgbGVuZ3Roc1xuICAgIHZhciB0ciA9IG5ldyB1MTYobWF4U3ltICsgMSk7XG4gICAgLy8gbWF4IGJpdHMgaW4gdHJlZVxuICAgIHZhciBtYnQgPSBsbih0W2kxIC0gMV0sIHRyLCAwKTtcbiAgICBpZiAobWJ0ID4gbWIpIHtcbiAgICAgICAgLy8gbW9yZSBhbGdvcml0aG1zIGZyb20gVVpJUC5qc1xuICAgICAgICAvLyBUT0RPOiBmaW5kIG91dCBob3cgdGhpcyBjb2RlIHdvcmtzIChkZWJ0KVxuICAgICAgICAvLyAgaW5kICAgIGRlYnRcbiAgICAgICAgdmFyIGkgPSAwLCBkdCA9IDA7XG4gICAgICAgIC8vICAgIGxlZnQgICAgICAgICAgICBjb3N0XG4gICAgICAgIHZhciBsZnQgPSBtYnQgLSBtYiwgY3N0ID0gMSA8PCBsZnQ7XG4gICAgICAgIHQyLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIHRyW2Iuc10gLSB0clthLnNdIHx8IGEuZiAtIGIuZjsgfSk7XG4gICAgICAgIGZvciAoOyBpIDwgczsgKytpKSB7XG4gICAgICAgICAgICB2YXIgaTJfMSA9IHQyW2ldLnM7XG4gICAgICAgICAgICBpZiAodHJbaTJfMV0gPiBtYikge1xuICAgICAgICAgICAgICAgIGR0ICs9IGNzdCAtICgxIDw8IChtYnQgLSB0cltpMl8xXSkpO1xuICAgICAgICAgICAgICAgIHRyW2kyXzFdID0gbWI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZHQgPj49IGxmdDtcbiAgICAgICAgd2hpbGUgKGR0ID4gMCkge1xuICAgICAgICAgICAgdmFyIGkyXzIgPSB0MltpXS5zO1xuICAgICAgICAgICAgaWYgKHRyW2kyXzJdIDwgbWIpXG4gICAgICAgICAgICAgICAgZHQgLT0gMSA8PCAobWIgLSB0cltpMl8yXSsrIC0gMSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoOyBpID49IDAgJiYgZHQ7IC0taSkge1xuICAgICAgICAgICAgdmFyIGkyXzMgPSB0MltpXS5zO1xuICAgICAgICAgICAgaWYgKHRyW2kyXzNdID09IG1iKSB7XG4gICAgICAgICAgICAgICAgLS10cltpMl8zXTtcbiAgICAgICAgICAgICAgICArK2R0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG1idCA9IG1iO1xuICAgIH1cbiAgICByZXR1cm4geyB0OiBuZXcgdTgodHIpLCBsOiBtYnQgfTtcbn07XG4vLyBnZXQgdGhlIG1heCBsZW5ndGggYW5kIGFzc2lnbiBsZW5ndGggY29kZXNcbnZhciBsbiA9IGZ1bmN0aW9uIChuLCBsLCBkKSB7XG4gICAgcmV0dXJuIG4ucyA9PSAtMVxuICAgICAgICA/IE1hdGgubWF4KGxuKG4ubCwgbCwgZCArIDEpLCBsbihuLnIsIGwsIGQgKyAxKSlcbiAgICAgICAgOiAobFtuLnNdID0gZCk7XG59O1xuLy8gbGVuZ3RoIGNvZGVzIGdlbmVyYXRpb25cbnZhciBsYyA9IGZ1bmN0aW9uIChjKSB7XG4gICAgdmFyIHMgPSBjLmxlbmd0aDtcbiAgICAvLyBOb3RlIHRoYXQgdGhlIHNlbWljb2xvbiB3YXMgaW50ZW50aW9uYWxcbiAgICB3aGlsZSAocyAmJiAhY1stLXNdKVxuICAgICAgICA7XG4gICAgdmFyIGNsID0gbmV3IHUxNigrK3MpO1xuICAgIC8vICBpbmQgICAgICBudW0gICAgICAgICBzdHJlYWtcbiAgICB2YXIgY2xpID0gMCwgY2xuID0gY1swXSwgY2xzID0gMTtcbiAgICB2YXIgdyA9IGZ1bmN0aW9uICh2KSB7IGNsW2NsaSsrXSA9IHY7IH07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gczsgKytpKSB7XG4gICAgICAgIGlmIChjW2ldID09IGNsbiAmJiBpICE9IHMpXG4gICAgICAgICAgICArK2NscztcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWNsbiAmJiBjbHMgPiAyKSB7XG4gICAgICAgICAgICAgICAgZm9yICg7IGNscyA+IDEzODsgY2xzIC09IDEzOClcbiAgICAgICAgICAgICAgICAgICAgdygzMjc1NCk7XG4gICAgICAgICAgICAgICAgaWYgKGNscyA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgdyhjbHMgPiAxMCA/ICgoY2xzIC0gMTEpIDw8IDUpIHwgMjg2OTAgOiAoKGNscyAtIDMpIDw8IDUpIHwgMTIzMDUpO1xuICAgICAgICAgICAgICAgICAgICBjbHMgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNscyA+IDMpIHtcbiAgICAgICAgICAgICAgICB3KGNsbiksIC0tY2xzO1xuICAgICAgICAgICAgICAgIGZvciAoOyBjbHMgPiA2OyBjbHMgLT0gNilcbiAgICAgICAgICAgICAgICAgICAgdyg4MzA0KTtcbiAgICAgICAgICAgICAgICBpZiAoY2xzID4gMilcbiAgICAgICAgICAgICAgICAgICAgdygoKGNscyAtIDMpIDw8IDUpIHwgODIwOCksIGNscyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoY2xzLS0pXG4gICAgICAgICAgICAgICAgdyhjbG4pO1xuICAgICAgICAgICAgY2xzID0gMTtcbiAgICAgICAgICAgIGNsbiA9IGNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgYzogY2wuc3ViYXJyYXkoMCwgY2xpKSwgbjogcyB9O1xufTtcbi8vIGNhbGN1bGF0ZSB0aGUgbGVuZ3RoIG9mIG91dHB1dCBmcm9tIHRyZWUsIGNvZGUgbGVuZ3Roc1xudmFyIGNsZW4gPSBmdW5jdGlvbiAoY2YsIGNsKSB7XG4gICAgdmFyIGwgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2wubGVuZ3RoOyArK2kpXG4gICAgICAgIGwgKz0gY2ZbaV0gKiBjbFtpXTtcbiAgICByZXR1cm4gbDtcbn07XG4vLyB3cml0ZXMgYSBmaXhlZCBibG9ja1xuLy8gcmV0dXJucyB0aGUgbmV3IGJpdCBwb3NcbnZhciB3ZmJsayA9IGZ1bmN0aW9uIChvdXQsIHBvcywgZGF0KSB7XG4gICAgLy8gbm8gbmVlZCB0byB3cml0ZSAwMCBhcyB0eXBlOiBUeXBlZEFycmF5IGRlZmF1bHRzIHRvIDBcbiAgICB2YXIgcyA9IGRhdC5sZW5ndGg7XG4gICAgdmFyIG8gPSBzaGZ0KHBvcyArIDIpO1xuICAgIG91dFtvXSA9IHMgJiAyNTU7XG4gICAgb3V0W28gKyAxXSA9IHMgPj4gODtcbiAgICBvdXRbbyArIDJdID0gb3V0W29dIF4gMjU1O1xuICAgIG91dFtvICsgM10gPSBvdXRbbyArIDFdIF4gMjU1O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgczsgKytpKVxuICAgICAgICBvdXRbbyArIGkgKyA0XSA9IGRhdFtpXTtcbiAgICByZXR1cm4gKG8gKyA0ICsgcykgKiA4O1xufTtcbi8vIHdyaXRlcyBhIGJsb2NrXG52YXIgd2JsayA9IGZ1bmN0aW9uIChkYXQsIG91dCwgZmluYWwsIHN5bXMsIGxmLCBkZiwgZWIsIGxpLCBicywgYmwsIHApIHtcbiAgICB3Yml0cyhvdXQsIHArKywgZmluYWwpO1xuICAgICsrbGZbMjU2XTtcbiAgICB2YXIgX2EgPSBoVHJlZShsZiwgMTUpLCBkbHQgPSBfYS50LCBtbGIgPSBfYS5sO1xuICAgIHZhciBfYiA9IGhUcmVlKGRmLCAxNSksIGRkdCA9IF9iLnQsIG1kYiA9IF9iLmw7XG4gICAgdmFyIF9jID0gbGMoZGx0KSwgbGNsdCA9IF9jLmMsIG5sYyA9IF9jLm47XG4gICAgdmFyIF9kID0gbGMoZGR0KSwgbGNkdCA9IF9kLmMsIG5kYyA9IF9kLm47XG4gICAgdmFyIGxjZnJlcSA9IG5ldyB1MTYoMTkpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGNsdC5sZW5ndGg7ICsraSlcbiAgICAgICAgKytsY2ZyZXFbbGNsdFtpXSAmIDMxXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxjZHQubGVuZ3RoOyArK2kpXG4gICAgICAgICsrbGNmcmVxW2xjZHRbaV0gJiAzMV07XG4gICAgdmFyIF9lID0gaFRyZWUobGNmcmVxLCA3KSwgbGN0ID0gX2UudCwgbWxjYiA9IF9lLmw7XG4gICAgdmFyIG5sY2MgPSAxOTtcbiAgICBmb3IgKDsgbmxjYyA+IDQgJiYgIWxjdFtjbGltW25sY2MgLSAxXV07IC0tbmxjYylcbiAgICAgICAgO1xuICAgIHZhciBmbGVuID0gKGJsICsgNSkgPDwgMztcbiAgICB2YXIgZnRsZW4gPSBjbGVuKGxmLCBmbHQpICsgY2xlbihkZiwgZmR0KSArIGViO1xuICAgIHZhciBkdGxlbiA9IGNsZW4obGYsIGRsdCkgKyBjbGVuKGRmLCBkZHQpICsgZWIgKyAxNCArIDMgKiBubGNjICsgY2xlbihsY2ZyZXEsIGxjdCkgKyAyICogbGNmcmVxWzE2XSArIDMgKiBsY2ZyZXFbMTddICsgNyAqIGxjZnJlcVsxOF07XG4gICAgaWYgKGJzID49IDAgJiYgZmxlbiA8PSBmdGxlbiAmJiBmbGVuIDw9IGR0bGVuKVxuICAgICAgICByZXR1cm4gd2ZibGsob3V0LCBwLCBkYXQuc3ViYXJyYXkoYnMsIGJzICsgYmwpKTtcbiAgICB2YXIgbG0sIGxsLCBkbSwgZGw7XG4gICAgd2JpdHMob3V0LCBwLCAxICsgKGR0bGVuIDwgZnRsZW4pKSwgcCArPSAyO1xuICAgIGlmIChkdGxlbiA8IGZ0bGVuKSB7XG4gICAgICAgIGxtID0gaE1hcChkbHQsIG1sYiwgMCksIGxsID0gZGx0LCBkbSA9IGhNYXAoZGR0LCBtZGIsIDApLCBkbCA9IGRkdDtcbiAgICAgICAgdmFyIGxsbSA9IGhNYXAobGN0LCBtbGNiLCAwKTtcbiAgICAgICAgd2JpdHMob3V0LCBwLCBubGMgLSAyNTcpO1xuICAgICAgICB3Yml0cyhvdXQsIHAgKyA1LCBuZGMgLSAxKTtcbiAgICAgICAgd2JpdHMob3V0LCBwICsgMTAsIG5sY2MgLSA0KTtcbiAgICAgICAgcCArPSAxNDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBubGNjOyArK2kpXG4gICAgICAgICAgICB3Yml0cyhvdXQsIHAgKyAzICogaSwgbGN0W2NsaW1baV1dKTtcbiAgICAgICAgcCArPSAzICogbmxjYztcbiAgICAgICAgdmFyIGxjdHMgPSBbbGNsdCwgbGNkdF07XG4gICAgICAgIGZvciAodmFyIGl0ID0gMDsgaXQgPCAyOyArK2l0KSB7XG4gICAgICAgICAgICB2YXIgY2xjdCA9IGxjdHNbaXRdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IGNsY3RbaV0gJiAzMTtcbiAgICAgICAgICAgICAgICB3Yml0cyhvdXQsIHAsIGxsbVtsZW5dKSwgcCArPSBsY3RbbGVuXTtcbiAgICAgICAgICAgICAgICBpZiAobGVuID4gMTUpXG4gICAgICAgICAgICAgICAgICAgIHdiaXRzKG91dCwgcCwgKGNsY3RbaV0gPj4gNSkgJiAxMjcpLCBwICs9IGNsY3RbaV0gPj4gMTI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxtID0gZmxtLCBsbCA9IGZsdCwgZG0gPSBmZG0sIGRsID0gZmR0O1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpOyArK2kpIHtcbiAgICAgICAgdmFyIHN5bSA9IHN5bXNbaV07XG4gICAgICAgIGlmIChzeW0gPiAyNTUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSAoc3ltID4+IDE4KSAmIDMxO1xuICAgICAgICAgICAgd2JpdHMxNihvdXQsIHAsIGxtW2xlbiArIDI1N10pLCBwICs9IGxsW2xlbiArIDI1N107XG4gICAgICAgICAgICBpZiAobGVuID4gNylcbiAgICAgICAgICAgICAgICB3Yml0cyhvdXQsIHAsIChzeW0gPj4gMjMpICYgMzEpLCBwICs9IGZsZWJbbGVuXTtcbiAgICAgICAgICAgIHZhciBkc3QgPSBzeW0gJiAzMTtcbiAgICAgICAgICAgIHdiaXRzMTYob3V0LCBwLCBkbVtkc3RdKSwgcCArPSBkbFtkc3RdO1xuICAgICAgICAgICAgaWYgKGRzdCA+IDMpXG4gICAgICAgICAgICAgICAgd2JpdHMxNihvdXQsIHAsIChzeW0gPj4gNSkgJiA4MTkxKSwgcCArPSBmZGViW2RzdF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3Yml0czE2KG91dCwgcCwgbG1bc3ltXSksIHAgKz0gbGxbc3ltXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3Yml0czE2KG91dCwgcCwgbG1bMjU2XSk7XG4gICAgcmV0dXJuIHAgKyBsbFsyNTZdO1xufTtcbi8vIGRlZmxhdGUgb3B0aW9ucyAobmljZSA8PCAxMykgfCBjaGFpblxudmFyIGRlbyA9IC8qI19fUFVSRV9fKi8gbmV3IGkzMihbNjU1NDAsIDEzMTA4MCwgMTMxMDg4LCAxMzExMDQsIDI2MjE3NiwgMTA0ODcwNCwgMTA0ODgzMiwgMjExNDU2MCwgMjExNzYzMl0pO1xuLy8gZW1wdHlcbnZhciBldCA9IC8qI19fUFVSRV9fKi8gbmV3IHU4KDApO1xuLy8gY29tcHJlc3NlcyBkYXRhIGludG8gYSByYXcgREVGTEFURSBidWZmZXJcbnZhciBkZmx0ID0gZnVuY3Rpb24gKGRhdCwgbHZsLCBwbHZsLCBwcmUsIHBvc3QsIHN0KSB7XG4gICAgdmFyIHMgPSBzdC56IHx8IGRhdC5sZW5ndGg7XG4gICAgdmFyIG8gPSBuZXcgdTgocHJlICsgcyArIDUgKiAoMSArIE1hdGguY2VpbChzIC8gNzAwMCkpICsgcG9zdCk7XG4gICAgLy8gd3JpdGluZyB0byB0aGlzIHdyaXRlcyB0byB0aGUgb3V0cHV0IGJ1ZmZlclxuICAgIHZhciB3ID0gby5zdWJhcnJheShwcmUsIG8ubGVuZ3RoIC0gcG9zdCk7XG4gICAgdmFyIGxzdCA9IHN0Lmw7XG4gICAgdmFyIHBvcyA9IChzdC5yIHx8IDApICYgNztcbiAgICBpZiAobHZsKSB7XG4gICAgICAgIGlmIChwb3MpXG4gICAgICAgICAgICB3WzBdID0gc3QuciA+PiAzO1xuICAgICAgICB2YXIgb3B0ID0gZGVvW2x2bCAtIDFdO1xuICAgICAgICB2YXIgbiA9IG9wdCA+PiAxMywgYyA9IG9wdCAmIDgxOTE7XG4gICAgICAgIHZhciBtc2tfMSA9ICgxIDw8IHBsdmwpIC0gMTtcbiAgICAgICAgLy8gICAgcHJldiAyLWJ5dGUgdmFsIG1hcCAgICBjdXJyIDItYnl0ZSB2YWwgbWFwXG4gICAgICAgIHZhciBwcmV2ID0gc3QucCB8fCBuZXcgdTE2KDMyNzY4KSwgaGVhZCA9IHN0LmggfHwgbmV3IHUxNihtc2tfMSArIDEpO1xuICAgICAgICB2YXIgYnMxXzEgPSBNYXRoLmNlaWwocGx2bCAvIDMpLCBiczJfMSA9IDIgKiBiczFfMTtcbiAgICAgICAgdmFyIGhzaCA9IGZ1bmN0aW9uIChpKSB7IHJldHVybiAoZGF0W2ldIF4gKGRhdFtpICsgMV0gPDwgYnMxXzEpIF4gKGRhdFtpICsgMl0gPDwgYnMyXzEpKSAmIG1za18xOyB9O1xuICAgICAgICAvLyAyNDU3NiBpcyBhbiBhcmJpdHJhcnkgbnVtYmVyIG9mIG1heGltdW0gc3ltYm9scyBwZXIgYmxvY2tcbiAgICAgICAgLy8gNDI0IGJ1ZmZlciBmb3IgbGFzdCBibG9ja1xuICAgICAgICB2YXIgc3ltcyA9IG5ldyBpMzIoMjUwMDApO1xuICAgICAgICAvLyBsZW5ndGgvbGl0ZXJhbCBmcmVxICAgZGlzdGFuY2UgZnJlcVxuICAgICAgICB2YXIgbGYgPSBuZXcgdTE2KDI4OCksIGRmID0gbmV3IHUxNigzMik7XG4gICAgICAgIC8vICBsL2xjbnQgIGV4Yml0cyAgaW5kZXggICAgICAgICAgbC9saW5kICB3YWl0ZHggICAgICAgICAgYmxrcG9zXG4gICAgICAgIHZhciBsY18xID0gMCwgZWIgPSAwLCBpID0gc3QuaSB8fCAwLCBsaSA9IDAsIHdpID0gc3QudyB8fCAwLCBicyA9IDA7XG4gICAgICAgIGZvciAoOyBpICsgMiA8IHM7ICsraSkge1xuICAgICAgICAgICAgLy8gaGFzaCB2YWx1ZVxuICAgICAgICAgICAgdmFyIGh2ID0gaHNoKGkpO1xuICAgICAgICAgICAgLy8gaW5kZXggbW9kIDMyNzY4ICAgIHByZXZpb3VzIGluZGV4IG1vZFxuICAgICAgICAgICAgdmFyIGltb2QgPSBpICYgMzI3NjcsIHBpbW9kID0gaGVhZFtodl07XG4gICAgICAgICAgICBwcmV2W2ltb2RdID0gcGltb2Q7XG4gICAgICAgICAgICBoZWFkW2h2XSA9IGltb2Q7XG4gICAgICAgICAgICAvLyBXZSBhbHdheXMgc2hvdWxkIG1vZGlmeSBoZWFkIGFuZCBwcmV2LCBidXQgb25seSBhZGQgc3ltYm9scyBpZlxuICAgICAgICAgICAgLy8gdGhpcyBkYXRhIGlzIG5vdCB5ZXQgcHJvY2Vzc2VkIChcIndhaXRcIiBmb3Igd2FpdCBpbmRleClcbiAgICAgICAgICAgIGlmICh3aSA8PSBpKSB7XG4gICAgICAgICAgICAgICAgLy8gYnl0ZXMgcmVtYWluaW5nXG4gICAgICAgICAgICAgICAgdmFyIHJlbSA9IHMgLSBpO1xuICAgICAgICAgICAgICAgIGlmICgobGNfMSA+IDcwMDAgfHwgbGkgPiAyNDU3NikgJiYgKHJlbSA+IDQyMyB8fCAhbHN0KSkge1xuICAgICAgICAgICAgICAgICAgICBwb3MgPSB3YmxrKGRhdCwgdywgMCwgc3ltcywgbGYsIGRmLCBlYiwgbGksIGJzLCBpIC0gYnMsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIGxpID0gbGNfMSA9IGViID0gMCwgYnMgPSBpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDI4NjsgKytqKVxuICAgICAgICAgICAgICAgICAgICAgICAgbGZbal0gPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDMwOyArK2opXG4gICAgICAgICAgICAgICAgICAgICAgICBkZltqXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICBsZW4gICAgZGlzdCAgIGNoYWluXG4gICAgICAgICAgICAgICAgdmFyIGwgPSAyLCBkID0gMCwgY2hfMSA9IGMsIGRpZiA9IGltb2QgLSBwaW1vZCAmIDMyNzY3O1xuICAgICAgICAgICAgICAgIGlmIChyZW0gPiAyICYmIGh2ID09IGhzaChpIC0gZGlmKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4biA9IE1hdGgubWluKG4sIHJlbSkgLSAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4ZCA9IE1hdGgubWluKDMyNzY3LCBpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF4IHBvc3NpYmxlIGxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAvLyBub3QgY2FwcGVkIGF0IGRpZiBiZWNhdXNlIGRlY29tcHJlc3NvcnMgaW1wbGVtZW50IFwicm9sbGluZ1wiIGluZGV4IHBvcHVsYXRpb25cbiAgICAgICAgICAgICAgICAgICAgdmFyIG1sID0gTWF0aC5taW4oMjU4LCByZW0pO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZGlmIDw9IG1heGQgJiYgLS1jaF8xICYmIGltb2QgIT0gcGltb2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRbaSArIGxdID09IGRhdFtpICsgbCAtIGRpZl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBubCA8IG1sICYmIGRhdFtpICsgbmxdID09IGRhdFtpICsgbmwgLSBkaWZdOyArK25sKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5sID4gbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsID0gbmwsIGQgPSBkaWY7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJyZWFrIG91dCBlYXJseSB3aGVuIHdlIHJlYWNoIFwibmljZVwiICh3ZSBhcmUgc2F0aXNmaWVkIGVub3VnaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5sID4gbWF4bilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3csIGZpbmQgdGhlIHJhcmVzdCAyLWJ5dGUgc2VxdWVuY2Ugd2l0aGluIHRoaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGVuZ3RoIG9mIGxpdGVyYWxzIGFuZCBzZWFyY2ggZm9yIHRoYXQgaW5zdGVhZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTXVjaCBmYXN0ZXIgdGhhbiBqdXN0IHVzaW5nIHRoZSBzdGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW1kID0gTWF0aC5taW4oZGlmLCBubCAtIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG1tZDsgKytqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGkgPSBpIC0gZGlmICsgaiAmIDMyNzY3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHB0aSA9IHByZXZbdGldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNkID0gdGkgLSBwdGkgJiAzMjc2NztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZCA+IG1kKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1kID0gY2QsIHBpbW9kID0gdGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayB0aGUgcHJldmlvdXMgbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIGltb2QgPSBwaW1vZCwgcGltb2QgPSBwcmV2W2ltb2RdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlmICs9IGltb2QgLSBwaW1vZCAmIDMyNzY3O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGQgd2lsbCBiZSBub256ZXJvIG9ubHkgd2hlbiBhIG1hdGNoIHdhcyBmb3VuZFxuICAgICAgICAgICAgICAgIGlmIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHN0b3JlIGJvdGggZGlzdCBhbmQgbGVuIGRhdGEgaW4gb25lIGludDMyXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIGlzIHJlY29nbml6ZWQgYXMgYSBsZW4vZGlzdCB3aXRoIDI4dGggYml0ICgyXjI4KVxuICAgICAgICAgICAgICAgICAgICBzeW1zW2xpKytdID0gMjY4NDM1NDU2IHwgKHJldmZsW2xdIDw8IDE4KSB8IHJldmZkW2RdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGluID0gcmV2ZmxbbF0gJiAzMSwgZGluID0gcmV2ZmRbZF0gJiAzMTtcbiAgICAgICAgICAgICAgICAgICAgZWIgKz0gZmxlYltsaW5dICsgZmRlYltkaW5dO1xuICAgICAgICAgICAgICAgICAgICArK2xmWzI1NyArIGxpbl07XG4gICAgICAgICAgICAgICAgICAgICsrZGZbZGluXTtcbiAgICAgICAgICAgICAgICAgICAgd2kgPSBpICsgbDtcbiAgICAgICAgICAgICAgICAgICAgKytsY18xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3ltc1tsaSsrXSA9IGRhdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgKytsZltkYXRbaV1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSBNYXRoLm1heChpLCB3aSk7IGkgPCBzOyArK2kpIHtcbiAgICAgICAgICAgIHN5bXNbbGkrK10gPSBkYXRbaV07XG4gICAgICAgICAgICArK2xmW2RhdFtpXV07XG4gICAgICAgIH1cbiAgICAgICAgcG9zID0gd2JsayhkYXQsIHcsIGxzdCwgc3ltcywgbGYsIGRmLCBlYiwgbGksIGJzLCBpIC0gYnMsIHBvcyk7XG4gICAgICAgIGlmICghbHN0KSB7XG4gICAgICAgICAgICBzdC5yID0gKHBvcyAmIDcpIHwgd1socG9zIC8gOCkgfCAwXSA8PCAzO1xuICAgICAgICAgICAgLy8gc2hmdChwb3MpIG5vdyAxIGxlc3MgaWYgcG9zICYgNyAhPSAwXG4gICAgICAgICAgICBwb3MgLT0gNztcbiAgICAgICAgICAgIHN0LmggPSBoZWFkLCBzdC5wID0gcHJldiwgc3QuaSA9IGksIHN0LncgPSB3aTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0LncgfHwgMDsgaSA8IHMgKyBsc3Q7IGkgKz0gNjU1MzUpIHtcbiAgICAgICAgICAgIC8vIGVuZFxuICAgICAgICAgICAgdmFyIGUgPSBpICsgNjU1MzU7XG4gICAgICAgICAgICBpZiAoZSA+PSBzKSB7XG4gICAgICAgICAgICAgICAgLy8gd3JpdGUgZmluYWwgYmxvY2tcbiAgICAgICAgICAgICAgICB3Wyhwb3MgLyA4KSB8IDBdID0gbHN0O1xuICAgICAgICAgICAgICAgIGUgPSBzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcG9zID0gd2ZibGsodywgcG9zICsgMSwgZGF0LnN1YmFycmF5KGksIGUpKTtcbiAgICAgICAgfVxuICAgICAgICBzdC5pID0gcztcbiAgICB9XG4gICAgcmV0dXJuIHNsYyhvLCAwLCBwcmUgKyBzaGZ0KHBvcykgKyBwb3N0KTtcbn07XG4vLyBDUkMzMiB0YWJsZVxudmFyIGNyY3QgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHQgPSBuZXcgSW50MzJBcnJheSgyNTYpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBpLCBrID0gOTtcbiAgICAgICAgd2hpbGUgKC0taylcbiAgICAgICAgICAgIGMgPSAoKGMgJiAxKSAmJiAtMzA2Njc0OTEyKSBeIChjID4+PiAxKTtcbiAgICAgICAgdFtpXSA9IGM7XG4gICAgfVxuICAgIHJldHVybiB0O1xufSkoKTtcbi8vIENSQzMyXG52YXIgY3JjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjID0gLTE7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcDogZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIC8vIGNsb3N1cmVzIGhhdmUgYXdmdWwgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgIHZhciBjciA9IGM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGQubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICAgICAgY3IgPSBjcmN0WyhjciAmIDI1NSkgXiBkW2ldXSBeIChjciA+Pj4gOCk7XG4gICAgICAgICAgICBjID0gY3I7XG4gICAgICAgIH0sXG4gICAgICAgIGQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIH5jOyB9XG4gICAgfTtcbn07XG4vLyBBZGxlcjMyXG52YXIgYWRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGEgPSAxLCBiID0gMDtcbiAgICByZXR1cm4ge1xuICAgICAgICBwOiBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgLy8gY2xvc3VyZXMgaGF2ZSBhd2Z1bCBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgdmFyIG4gPSBhLCBtID0gYjtcbiAgICAgICAgICAgIHZhciBsID0gZC5sZW5ndGggfCAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgIT0gbDspIHtcbiAgICAgICAgICAgICAgICB2YXIgZSA9IE1hdGgubWluKGkgKyAyNjU1LCBsKTtcbiAgICAgICAgICAgICAgICBmb3IgKDsgaSA8IGU7ICsraSlcbiAgICAgICAgICAgICAgICAgICAgbSArPSBuICs9IGRbaV07XG4gICAgICAgICAgICAgICAgbiA9IChuICYgNjU1MzUpICsgMTUgKiAobiA+PiAxNiksIG0gPSAobSAmIDY1NTM1KSArIDE1ICogKG0gPj4gMTYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYSA9IG4sIGIgPSBtO1xuICAgICAgICB9LFxuICAgICAgICBkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhICU9IDY1NTIxLCBiICU9IDY1NTIxO1xuICAgICAgICAgICAgcmV0dXJuIChhICYgMjU1KSA8PCAyNCB8IChhICYgMHhGRjAwKSA8PCA4IHwgKGIgJiAyNTUpIDw8IDggfCAoYiA+PiA4KTtcbiAgICAgICAgfVxuICAgIH07XG59O1xuO1xuLy8gZGVmbGF0ZSB3aXRoIG9wdHNcbnZhciBkb3B0ID0gZnVuY3Rpb24gKGRhdCwgb3B0LCBwcmUsIHBvc3QsIHN0KSB7XG4gICAgaWYgKCFzdCkge1xuICAgICAgICBzdCA9IHsgbDogMSB9O1xuICAgICAgICBpZiAob3B0LmRpY3Rpb25hcnkpIHtcbiAgICAgICAgICAgIHZhciBkaWN0ID0gb3B0LmRpY3Rpb25hcnkuc3ViYXJyYXkoLTMyNzY4KTtcbiAgICAgICAgICAgIHZhciBuZXdEYXQgPSBuZXcgdTgoZGljdC5sZW5ndGggKyBkYXQubGVuZ3RoKTtcbiAgICAgICAgICAgIG5ld0RhdC5zZXQoZGljdCk7XG4gICAgICAgICAgICBuZXdEYXQuc2V0KGRhdCwgZGljdC5sZW5ndGgpO1xuICAgICAgICAgICAgZGF0ID0gbmV3RGF0O1xuICAgICAgICAgICAgc3QudyA9IGRpY3QubGVuZ3RoO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZmx0KGRhdCwgb3B0LmxldmVsID09IG51bGwgPyA2IDogb3B0LmxldmVsLCBvcHQubWVtID09IG51bGwgPyAoc3QubCA/IE1hdGguY2VpbChNYXRoLm1heCg4LCBNYXRoLm1pbigxMywgTWF0aC5sb2coZGF0Lmxlbmd0aCkpKSAqIDEuNSkgOiAyMCkgOiAoMTIgKyBvcHQubWVtKSwgcHJlLCBwb3N0LCBzdCk7XG59O1xuLy8gV2FsbWFydCBvYmplY3Qgc3ByZWFkXG52YXIgbXJnID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICB2YXIgbyA9IHt9O1xuICAgIGZvciAodmFyIGsgaW4gYSlcbiAgICAgICAgb1trXSA9IGFba107XG4gICAgZm9yICh2YXIgayBpbiBiKVxuICAgICAgICBvW2tdID0gYltrXTtcbiAgICByZXR1cm4gbztcbn07XG4vLyB3b3JrZXIgY2xvbmVcbi8vIFRoaXMgaXMgcG9zc2libHkgdGhlIGNyYXppZXN0IHBhcnQgb2YgdGhlIGVudGlyZSBjb2RlYmFzZSwgZGVzcGl0ZSBob3cgc2ltcGxlIGl0IG1heSBzZWVtLlxuLy8gVGhlIG9ubHkgcGFyYW1ldGVyIHRvIHRoaXMgZnVuY3Rpb24gaXMgYSBjbG9zdXJlIHRoYXQgcmV0dXJucyBhbiBhcnJheSBvZiB2YXJpYWJsZXMgb3V0c2lkZSBvZiB0aGUgZnVuY3Rpb24gc2NvcGUuXG4vLyBXZSdyZSBnb2luZyB0byB0cnkgdG8gZmlndXJlIG91dCB0aGUgdmFyaWFibGUgbmFtZXMgdXNlZCBpbiB0aGUgY2xvc3VyZSBhcyBzdHJpbmdzIGJlY2F1c2UgdGhhdCBpcyBjcnVjaWFsIGZvciB3b3JrZXJpemF0aW9uLlxuLy8gV2Ugd2lsbCByZXR1cm4gYW4gb2JqZWN0IG1hcHBpbmcgb2YgdHJ1ZSB2YXJpYWJsZSBuYW1lIHRvIHZhbHVlIChiYXNpY2FsbHksIHRoZSBjdXJyZW50IHNjb3BlIGFzIGEgSlMgb2JqZWN0KS5cbi8vIFRoZSByZWFzb24gd2UgY2FuJ3QganVzdCB1c2UgdGhlIG9yaWdpbmFsIHZhcmlhYmxlIG5hbWVzIGlzIG1pbmlmaWVycyBtYW5nbGluZyB0aGUgdG9wbGV2ZWwgc2NvcGUuXG4vLyBUaGlzIHRvb2sgbWUgdGhyZWUgd2Vla3MgdG8gZmlndXJlIG91dCBob3cgdG8gZG8uXG52YXIgd2NsbiA9IGZ1bmN0aW9uIChmbiwgZm5TdHIsIHRkKSB7XG4gICAgdmFyIGR0ID0gZm4oKTtcbiAgICB2YXIgc3QgPSBmbi50b1N0cmluZygpO1xuICAgIHZhciBrcyA9IHN0LnNsaWNlKHN0LmluZGV4T2YoJ1snKSArIDEsIHN0Lmxhc3RJbmRleE9mKCddJykpLnJlcGxhY2UoL1xccysvZywgJycpLnNwbGl0KCcsJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkdC5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgdiA9IGR0W2ldLCBrID0ga3NbaV07XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBmblN0ciArPSAnOycgKyBrICsgJz0nO1xuICAgICAgICAgICAgdmFyIHN0XzEgPSB2LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAodi5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgICAgICAvLyBmb3IgZ2xvYmFsIG9iamVjdHNcbiAgICAgICAgICAgICAgICBpZiAoc3RfMS5pbmRleE9mKCdbbmF0aXZlIGNvZGVdJykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwSW5kID0gc3RfMS5pbmRleE9mKCcgJywgOCkgKyAxO1xuICAgICAgICAgICAgICAgICAgICBmblN0ciArPSBzdF8xLnNsaWNlKHNwSW5kLCBzdF8xLmluZGV4T2YoJygnLCBzcEluZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm5TdHIgKz0gc3RfMTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgdCBpbiB2LnByb3RvdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZuU3RyICs9ICc7JyArIGsgKyAnLnByb3RvdHlwZS4nICsgdCArICc9JyArIHYucHJvdG90eXBlW3RdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGZuU3RyICs9IHN0XzE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGRba10gPSB2O1xuICAgIH1cbiAgICByZXR1cm4gZm5TdHI7XG59O1xudmFyIGNoID0gW107XG4vLyBjbG9uZSBidWZzXG52YXIgY2JmcyA9IGZ1bmN0aW9uICh2KSB7XG4gICAgdmFyIHRsID0gW107XG4gICAgZm9yICh2YXIgayBpbiB2KSB7XG4gICAgICAgIGlmICh2W2tdLmJ1ZmZlcikge1xuICAgICAgICAgICAgdGwucHVzaCgodltrXSA9IG5ldyB2W2tdLmNvbnN0cnVjdG9yKHZba10pKS5idWZmZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0bDtcbn07XG4vLyB1c2UgYSB3b3JrZXIgdG8gZXhlY3V0ZSBjb2RlXG52YXIgd3JrciA9IGZ1bmN0aW9uIChmbnMsIGluaXQsIGlkLCBjYikge1xuICAgIGlmICghY2hbaWRdKSB7XG4gICAgICAgIHZhciBmblN0ciA9ICcnLCB0ZF8xID0ge30sIG0gPSBmbnMubGVuZ3RoIC0gMTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtOyArK2kpXG4gICAgICAgICAgICBmblN0ciA9IHdjbG4oZm5zW2ldLCBmblN0ciwgdGRfMSk7XG4gICAgICAgIGNoW2lkXSA9IHsgYzogd2NsbihmbnNbbV0sIGZuU3RyLCB0ZF8xKSwgZTogdGRfMSB9O1xuICAgIH1cbiAgICB2YXIgdGQgPSBtcmcoe30sIGNoW2lkXS5lKTtcbiAgICByZXR1cm4gd2soY2hbaWRdLmMgKyAnO29ubWVzc2FnZT1mdW5jdGlvbihlKXtmb3IodmFyIGsgaW4gZS5kYXRhKXNlbGZba109ZS5kYXRhW2tdO29ubWVzc2FnZT0nICsgaW5pdC50b1N0cmluZygpICsgJ30nLCBpZCwgdGQsIGNiZnModGQpLCBjYik7XG59O1xuLy8gYmFzZSBhc3luYyBpbmZsYXRlIGZuXG52YXIgYkluZmx0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW3U4LCB1MTYsIGkzMiwgZmxlYiwgZmRlYiwgY2xpbSwgZmwsIGZkLCBmbHJtLCBmZHJtLCByZXYsIGVjLCBoTWFwLCBtYXgsIGJpdHMsIGJpdHMxNiwgc2hmdCwgc2xjLCBlcnIsIGluZmx0LCBpbmZsYXRlU3luYywgcGJmLCBnb3B0XTsgfTtcbnZhciBiRGZsdCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIFt1OCwgdTE2LCBpMzIsIGZsZWIsIGZkZWIsIGNsaW0sIHJldmZsLCByZXZmZCwgZmxtLCBmbHQsIGZkbSwgZmR0LCByZXYsIGRlbywgZXQsIGhNYXAsIHdiaXRzLCB3Yml0czE2LCBoVHJlZSwgbG4sIGxjLCBjbGVuLCB3ZmJsaywgd2Jsaywgc2hmdCwgc2xjLCBkZmx0LCBkb3B0LCBkZWZsYXRlU3luYywgcGJmXTsgfTtcbi8vIGd6aXAgZXh0cmFcbnZhciBnemUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbZ3poLCBnemhsLCB3Ynl0ZXMsIGNyYywgY3JjdF07IH07XG4vLyBndW56aXAgZXh0cmFcbnZhciBndXplID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gW2d6cywgZ3psXTsgfTtcbi8vIHpsaWIgZXh0cmFcbnZhciB6bGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbemxoLCB3Ynl0ZXMsIGFkbGVyXTsgfTtcbi8vIHVuemxpYiBleHRyYVxudmFyIHp1bGUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBbemxzXTsgfTtcbi8vIHBvc3QgYnVmXG52YXIgcGJmID0gZnVuY3Rpb24gKG1zZykgeyByZXR1cm4gcG9zdE1lc3NhZ2UobXNnLCBbbXNnLmJ1ZmZlcl0pOyB9O1xuLy8gZ2V0IG9wdHNcbnZhciBnb3B0ID0gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIG8gJiYge1xuICAgIG91dDogby5zaXplICYmIG5ldyB1OChvLnNpemUpLFxuICAgIGRpY3Rpb25hcnk6IG8uZGljdGlvbmFyeVxufTsgfTtcbi8vIGFzeW5jIGhlbHBlclxudmFyIGNiaWZ5ID0gZnVuY3Rpb24gKGRhdCwgb3B0cywgZm5zLCBpbml0LCBpZCwgY2IpIHtcbiAgICB2YXIgdyA9IHdya3IoZm5zLCBpbml0LCBpZCwgZnVuY3Rpb24gKGVyciwgZGF0KSB7XG4gICAgICAgIHcudGVybWluYXRlKCk7XG4gICAgICAgIGNiKGVyciwgZGF0KTtcbiAgICB9KTtcbiAgICB3LnBvc3RNZXNzYWdlKFtkYXQsIG9wdHNdLCBvcHRzLmNvbnN1bWUgPyBbZGF0LmJ1ZmZlcl0gOiBbXSk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgdy50ZXJtaW5hdGUoKTsgfTtcbn07XG4vLyBhdXRvIHN0cmVhbVxudmFyIGFzdHJtID0gZnVuY3Rpb24gKHN0cm0pIHtcbiAgICBzdHJtLm9uZGF0YSA9IGZ1bmN0aW9uIChkYXQsIGZpbmFsKSB7IHJldHVybiBwb3N0TWVzc2FnZShbZGF0LCBmaW5hbF0sIFtkYXQuYnVmZmVyXSk7IH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldikge1xuICAgICAgICBpZiAoZXYuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0cm0ucHVzaChldi5kYXRhWzBdLCBldi5kYXRhWzFdKTtcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlKFtldi5kYXRhWzBdLmxlbmd0aF0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHN0cm0uZmx1c2goKTtcbiAgICB9O1xufTtcbi8vIGFzeW5jIHN0cmVhbSBhdHRhY2hcbnZhciBhc3RybWlmeSA9IGZ1bmN0aW9uIChmbnMsIHN0cm0sIG9wdHMsIGluaXQsIGlkLCBmbHVzaCwgZXh0KSB7XG4gICAgdmFyIHQ7XG4gICAgdmFyIHcgPSB3cmtyKGZucywgaW5pdCwgaWQsIGZ1bmN0aW9uIChlcnIsIGRhdCkge1xuICAgICAgICBpZiAoZXJyKVxuICAgICAgICAgICAgdy50ZXJtaW5hdGUoKSwgc3RybS5vbmRhdGEuY2FsbChzdHJtLCBlcnIpO1xuICAgICAgICBlbHNlIGlmICghQXJyYXkuaXNBcnJheShkYXQpKVxuICAgICAgICAgICAgZXh0KGRhdCk7XG4gICAgICAgIGVsc2UgaWYgKGRhdC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgc3RybS5xdWV1ZWRTaXplIC09IGRhdFswXTtcbiAgICAgICAgICAgIGlmIChzdHJtLm9uZHJhaW4pXG4gICAgICAgICAgICAgICAgc3RybS5vbmRyYWluKGRhdFswXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZGF0WzFdKVxuICAgICAgICAgICAgICAgIHcudGVybWluYXRlKCk7XG4gICAgICAgICAgICBzdHJtLm9uZGF0YS5jYWxsKHN0cm0sIGVyciwgZGF0WzBdLCBkYXRbMV0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgdy5wb3N0TWVzc2FnZShvcHRzKTtcbiAgICBzdHJtLnF1ZXVlZFNpemUgPSAwO1xuICAgIHN0cm0ucHVzaCA9IGZ1bmN0aW9uIChkLCBmKSB7XG4gICAgICAgIGlmICghc3RybS5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICh0KVxuICAgICAgICAgICAgc3RybS5vbmRhdGEoZXJyKDQsIDAsIDEpLCBudWxsLCAhIWYpO1xuICAgICAgICBzdHJtLnF1ZXVlZFNpemUgKz0gZC5sZW5ndGg7XG4gICAgICAgIHcucG9zdE1lc3NhZ2UoW2QsIHQgPSBmXSwgW2QuYnVmZmVyXSk7XG4gICAgfTtcbiAgICBzdHJtLnRlcm1pbmF0ZSA9IGZ1bmN0aW9uICgpIHsgdy50ZXJtaW5hdGUoKTsgfTtcbiAgICBpZiAoZmx1c2gpIHtcbiAgICAgICAgc3RybS5mbHVzaCA9IGZ1bmN0aW9uICgpIHsgdy5wb3N0TWVzc2FnZShbXSk7IH07XG4gICAgfVxufTtcbi8vIHJlYWQgMiBieXRlc1xudmFyIGIyID0gZnVuY3Rpb24gKGQsIGIpIHsgcmV0dXJuIGRbYl0gfCAoZFtiICsgMV0gPDwgOCk7IH07XG4vLyByZWFkIDQgYnl0ZXNcbnZhciBiNCA9IGZ1bmN0aW9uIChkLCBiKSB7IHJldHVybiAoZFtiXSB8IChkW2IgKyAxXSA8PCA4KSB8IChkW2IgKyAyXSA8PCAxNikgfCAoZFtiICsgM10gPDwgMjQpKSA+Pj4gMDsgfTtcbnZhciBiOCA9IGZ1bmN0aW9uIChkLCBiKSB7IHJldHVybiBiNChkLCBiKSArIChiNChkLCBiICsgNCkgKiA0Mjk0OTY3Mjk2KTsgfTtcbi8vIHdyaXRlIGJ5dGVzXG52YXIgd2J5dGVzID0gZnVuY3Rpb24gKGQsIGIsIHYpIHtcbiAgICBmb3IgKDsgdjsgKytiKVxuICAgICAgICBkW2JdID0gdiwgdiA+Pj49IDg7XG59O1xuLy8gZ3ppcCBoZWFkZXJcbnZhciBnemggPSBmdW5jdGlvbiAoYywgbykge1xuICAgIHZhciBmbiA9IG8uZmlsZW5hbWU7XG4gICAgY1swXSA9IDMxLCBjWzFdID0gMTM5LCBjWzJdID0gOCwgY1s4XSA9IG8ubGV2ZWwgPCAyID8gNCA6IG8ubGV2ZWwgPT0gOSA/IDIgOiAwLCBjWzldID0gMzsgLy8gYXNzdW1lIFVuaXhcbiAgICBpZiAoby5tdGltZSAhPSAwKVxuICAgICAgICB3Ynl0ZXMoYywgNCwgTWF0aC5mbG9vcihuZXcgRGF0ZShvLm10aW1lIHx8IERhdGUubm93KCkpIC8gMTAwMCkpO1xuICAgIGlmIChmbikge1xuICAgICAgICBjWzNdID0gODtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gZm4ubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBjW2kgKyAxMF0gPSBmbi5jaGFyQ29kZUF0KGkpO1xuICAgIH1cbn07XG4vLyBnemlwIGZvb3RlcjogLTggdG8gLTQgPSBDUkMsIC00IHRvIC0wIGlzIGxlbmd0aFxuLy8gZ3ppcCBzdGFydFxudmFyIGd6cyA9IGZ1bmN0aW9uIChkKSB7XG4gICAgaWYgKGRbMF0gIT0gMzEgfHwgZFsxXSAhPSAxMzkgfHwgZFsyXSAhPSA4KVxuICAgICAgICBlcnIoNiwgJ2ludmFsaWQgZ3ppcCBkYXRhJyk7XG4gICAgdmFyIGZsZyA9IGRbM107XG4gICAgdmFyIHN0ID0gMTA7XG4gICAgaWYgKGZsZyAmIDQpXG4gICAgICAgIHN0ICs9IChkWzEwXSB8IGRbMTFdIDw8IDgpICsgMjtcbiAgICBmb3IgKHZhciB6cyA9IChmbGcgPj4gMyAmIDEpICsgKGZsZyA+PiA0ICYgMSk7IHpzID4gMDsgenMgLT0gIWRbc3QrK10pXG4gICAgICAgIDtcbiAgICByZXR1cm4gc3QgKyAoZmxnICYgMik7XG59O1xuLy8gZ3ppcCBsZW5ndGhcbnZhciBnemwgPSBmdW5jdGlvbiAoZCkge1xuICAgIHZhciBsID0gZC5sZW5ndGg7XG4gICAgcmV0dXJuIChkW2wgLSA0XSB8IGRbbCAtIDNdIDw8IDggfCBkW2wgLSAyXSA8PCAxNiB8IGRbbCAtIDFdIDw8IDI0KSA+Pj4gMDtcbn07XG4vLyBnemlwIGhlYWRlciBsZW5ndGhcbnZhciBnemhsID0gZnVuY3Rpb24gKG8pIHsgcmV0dXJuIDEwICsgKG8uZmlsZW5hbWUgPyBvLmZpbGVuYW1lLmxlbmd0aCArIDEgOiAwKTsgfTtcbi8vIHpsaWIgaGVhZGVyXG52YXIgemxoID0gZnVuY3Rpb24gKGMsIG8pIHtcbiAgICB2YXIgbHYgPSBvLmxldmVsLCBmbCA9IGx2ID09IDAgPyAwIDogbHYgPCA2ID8gMSA6IGx2ID09IDkgPyAzIDogMjtcbiAgICBjWzBdID0gMTIwLCBjWzFdID0gKGZsIDw8IDYpIHwgKG8uZGljdGlvbmFyeSAmJiAzMik7XG4gICAgY1sxXSB8PSAzMSAtICgoY1swXSA8PCA4KSB8IGNbMV0pICUgMzE7XG4gICAgaWYgKG8uZGljdGlvbmFyeSkge1xuICAgICAgICB2YXIgaCA9IGFkbGVyKCk7XG4gICAgICAgIGgucChvLmRpY3Rpb25hcnkpO1xuICAgICAgICB3Ynl0ZXMoYywgMiwgaC5kKCkpO1xuICAgIH1cbn07XG4vLyB6bGliIHN0YXJ0XG52YXIgemxzID0gZnVuY3Rpb24gKGQsIGRpY3QpIHtcbiAgICBpZiAoKGRbMF0gJiAxNSkgIT0gOCB8fCAoZFswXSA+PiA0KSA+IDcgfHwgKChkWzBdIDw8IDggfCBkWzFdKSAlIDMxKSlcbiAgICAgICAgZXJyKDYsICdpbnZhbGlkIHpsaWIgZGF0YScpO1xuICAgIGlmICgoZFsxXSA+PiA1ICYgMSkgPT0gKyFkaWN0KVxuICAgICAgICBlcnIoNiwgJ2ludmFsaWQgemxpYiBkYXRhOiAnICsgKGRbMV0gJiAzMiA/ICduZWVkJyA6ICd1bmV4cGVjdGVkJykgKyAnIGRpY3Rpb25hcnknKTtcbiAgICByZXR1cm4gKGRbMV0gPj4gMyAmIDQpICsgMjtcbn07XG5mdW5jdGlvbiBTdHJtT3B0KG9wdHMsIGNiKSB7XG4gICAgaWYgKHR5cGVvZiBvcHRzID09ICdmdW5jdGlvbicpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgcmV0dXJuIG9wdHM7XG59XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGNvbXByZXNzaW9uXG4gKi9cbnZhciBEZWZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlZmxhdGUob3B0cywgY2IpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgdGhpcy5vID0gb3B0cyB8fCB7fTtcbiAgICAgICAgdGhpcy5zID0geyBsOiAwLCBpOiAzMjc2OCwgdzogMzI3NjgsIHo6IDMyNzY4IH07XG4gICAgICAgIC8vIEJ1ZmZlciBsZW5ndGggbXVzdCBhbHdheXMgYmUgMCBtb2QgMzI3NjggZm9yIGluZGV4IGNhbGN1bGF0aW9ucyB0byBiZSBjb3JyZWN0IHdoZW4gbW9kaWZ5aW5nIGhlYWQgYW5kIHByZXZcbiAgICAgICAgLy8gOTgzMDQgPSAzMjc2OCAobG9va2JhY2spICsgNjU1MzYgKGNvbW1vbiBjaHVuayBzaXplKVxuICAgICAgICB0aGlzLmIgPSBuZXcgdTgoOTgzMDQpO1xuICAgICAgICBpZiAodGhpcy5vLmRpY3Rpb25hcnkpIHtcbiAgICAgICAgICAgIHZhciBkaWN0ID0gdGhpcy5vLmRpY3Rpb25hcnkuc3ViYXJyYXkoLTMyNzY4KTtcbiAgICAgICAgICAgIHRoaXMuYi5zZXQoZGljdCwgMzI3NjggLSBkaWN0Lmxlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLnMuaSA9IDMyNzY4IC0gZGljdC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgRGVmbGF0ZS5wcm90b3R5cGUucCA9IGZ1bmN0aW9uIChjLCBmKSB7XG4gICAgICAgIHRoaXMub25kYXRhKGRvcHQoYywgdGhpcy5vLCAwLCAwLCB0aGlzLnMpLCBmKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlZmxhdGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIERlZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICh0aGlzLnMubClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgdmFyIGVuZExlbiA9IGNodW5rLmxlbmd0aCArIHRoaXMucy56O1xuICAgICAgICBpZiAoZW5kTGVuID4gdGhpcy5iLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGVuZExlbiA+IDIgKiB0aGlzLmIubGVuZ3RoIC0gMzI3NjgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3QnVmID0gbmV3IHU4KGVuZExlbiAmIC0zMjc2OCk7XG4gICAgICAgICAgICAgICAgbmV3QnVmLnNldCh0aGlzLmIuc3ViYXJyYXkoMCwgdGhpcy5zLnopKTtcbiAgICAgICAgICAgICAgICB0aGlzLmIgPSBuZXdCdWY7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3BsaXQgPSB0aGlzLmIubGVuZ3RoIC0gdGhpcy5zLno7XG4gICAgICAgICAgICB0aGlzLmIuc2V0KGNodW5rLnN1YmFycmF5KDAsIHNwbGl0KSwgdGhpcy5zLnopO1xuICAgICAgICAgICAgdGhpcy5zLnogPSB0aGlzLmIubGVuZ3RoO1xuICAgICAgICAgICAgdGhpcy5wKHRoaXMuYiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5iLnNldCh0aGlzLmIuc3ViYXJyYXkoLTMyNzY4KSk7XG4gICAgICAgICAgICB0aGlzLmIuc2V0KGNodW5rLnN1YmFycmF5KHNwbGl0KSwgMzI3NjgpO1xuICAgICAgICAgICAgdGhpcy5zLnogPSBjaHVuay5sZW5ndGggLSBzcGxpdCArIDMyNzY4O1xuICAgICAgICAgICAgdGhpcy5zLmkgPSAzMjc2NiwgdGhpcy5zLncgPSAzMjc2ODtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYi5zZXQoY2h1bmssIHRoaXMucy56KTtcbiAgICAgICAgICAgIHRoaXMucy56ICs9IGNodW5rLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnMubCA9IGZpbmFsICYgMTtcbiAgICAgICAgaWYgKHRoaXMucy56ID4gdGhpcy5zLncgKyA4MTkxIHx8IGZpbmFsKSB7XG4gICAgICAgICAgICB0aGlzLnAodGhpcy5iLCBmaW5hbCB8fCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLnMudyA9IHRoaXMucy5pLCB0aGlzLnMuaSAtPSAyO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGbHVzaGVzIGJ1ZmZlcmVkIHVuY29tcHJlc3NlZCBkYXRhLiBVc2VmdWwgdG8gaW1tZWRpYXRlbHkgcmV0cmlldmUgdGhlXG4gICAgICogZGVmbGF0ZWQgb3V0cHV0IGZvciBzbWFsbCBpbnB1dHMuXG4gICAgICovXG4gICAgRGVmbGF0ZS5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICh0aGlzLnMubClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgdGhpcy5wKHRoaXMuYiwgZmFsc2UpO1xuICAgICAgICB0aGlzLnMudyA9IHRoaXMucy5pLCB0aGlzLnMuaSAtPSAyO1xuICAgIH07XG4gICAgcmV0dXJuIERlZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgRGVmbGF0ZSB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jRGVmbGF0ZSA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY0RlZmxhdGUob3B0cywgY2IpIHtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkRmbHQsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIERlZmxhdGVdOyB9XG4gICAgICAgIF0sIHRoaXMsIFN0cm1PcHQuY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgRGVmbGF0ZShldi5kYXRhKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCA2LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jRGVmbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBBc3luY0RlZmxhdGUgfTtcbmV4cG9ydCBmdW5jdGlvbiBkZWZsYXRlKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkRmbHQsXG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYoZGVmbGF0ZVN5bmMoZXYuZGF0YVswXSwgZXYuZGF0YVsxXSkpOyB9LCAwLCBjYik7XG59XG4vKipcbiAqIENvbXByZXNzZXMgZGF0YSB3aXRoIERFRkxBVEUgd2l0aG91dCBhbnkgd3JhcHBlclxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gY29tcHJlc3NcbiAqIEBwYXJhbSBvcHRzIFRoZSBjb21wcmVzc2lvbiBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZGVmbGF0ZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVmbGF0ZVN5bmMoZGF0YSwgb3B0cykge1xuICAgIHJldHVybiBkb3B0KGRhdGEsIG9wdHMgfHwge30sIDAsIDApO1xufVxuLyoqXG4gKiBTdHJlYW1pbmcgREVGTEFURSBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBJbmZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEluZmxhdGUob3B0cywgY2IpIHtcbiAgICAgICAgLy8gbm8gU3RybU9wdCBoZXJlIHRvIGF2b2lkIGFkZGluZyB0byB3b3JrZXJpemVyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgICAgIHZhciBkaWN0ID0gb3B0cyAmJiBvcHRzLmRpY3Rpb25hcnkgJiYgb3B0cy5kaWN0aW9uYXJ5LnN1YmFycmF5KC0zMjc2OCk7XG4gICAgICAgIHRoaXMucyA9IHsgaTogMCwgYjogZGljdCA/IGRpY3QubGVuZ3RoIDogMCB9O1xuICAgICAgICB0aGlzLm8gPSBuZXcgdTgoMzI3NjgpO1xuICAgICAgICB0aGlzLnAgPSBuZXcgdTgoMCk7XG4gICAgICAgIGlmIChkaWN0KVxuICAgICAgICAgICAgdGhpcy5vLnNldChkaWN0KTtcbiAgICB9XG4gICAgSW5mbGF0ZS5wcm90b3R5cGUuZSA9IGZ1bmN0aW9uIChjKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICh0aGlzLmQpXG4gICAgICAgICAgICBlcnIoNCk7XG4gICAgICAgIGlmICghdGhpcy5wLmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMucCA9IGM7XG4gICAgICAgIGVsc2UgaWYgKGMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbiA9IG5ldyB1OCh0aGlzLnAubGVuZ3RoICsgYy5sZW5ndGgpO1xuICAgICAgICAgICAgbi5zZXQodGhpcy5wKSwgbi5zZXQoYywgdGhpcy5wLmxlbmd0aCksIHRoaXMucCA9IG47XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEluZmxhdGUucHJvdG90eXBlLmMgPSBmdW5jdGlvbiAoZmluYWwpIHtcbiAgICAgICAgdGhpcy5zLmkgPSArKHRoaXMuZCA9IGZpbmFsIHx8IGZhbHNlKTtcbiAgICAgICAgdmFyIGJ0cyA9IHRoaXMucy5iO1xuICAgICAgICB2YXIgZHQgPSBpbmZsdCh0aGlzLnAsIHRoaXMucywgdGhpcy5vKTtcbiAgICAgICAgdGhpcy5vbmRhdGEoc2xjKGR0LCBidHMsIHRoaXMucy5iKSwgdGhpcy5kKTtcbiAgICAgICAgdGhpcy5vID0gc2xjKGR0LCB0aGlzLnMuYiAtIDMyNzY4KSwgdGhpcy5zLmIgPSB0aGlzLm8ubGVuZ3RoO1xuICAgICAgICB0aGlzLnAgPSBzbGModGhpcy5wLCAodGhpcy5zLnAgLyA4KSB8IDApLCB0aGlzLnMucCAmPSA3O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgaW5mbGF0ZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBmaW5hbCBjaHVua1xuICAgICAqL1xuICAgIEluZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHRoaXMuZShjaHVuayksIHRoaXMuYyhmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gSW5mbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBJbmZsYXRlIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgREVGTEFURSBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0luZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXN5bmNJbmZsYXRlKG9wdHMsIGNiKSB7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJJbmZsdCxcbiAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIFthc3RybSwgSW5mbGF0ZV07IH1cbiAgICAgICAgXSwgdGhpcywgU3RybU9wdC5jYWxsKHRoaXMsIG9wdHMsIGNiKSwgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc3RybSA9IG5ldyBJbmZsYXRlKGV2LmRhdGEpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDcsIDApO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jSW5mbGF0ZSB9O1xuZXhwb3J0IGZ1bmN0aW9uIGluZmxhdGUoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiSW5mbHRcbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZihpbmZsYXRlU3luYyhldi5kYXRhWzBdLCBnb3B0KGV2LmRhdGFbMV0pKSk7IH0sIDEsIGNiKTtcbn1cbi8qKlxuICogRXhwYW5kcyBERUZMQVRFIGRhdGEgd2l0aCBubyB3cmFwcGVyXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBkZWNvbXByZXNzXG4gKiBAcGFyYW0gb3B0cyBUaGUgZGVjb21wcmVzc2lvbiBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluZmxhdGVTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICByZXR1cm4gaW5mbHQoZGF0YSwgeyBpOiAyIH0sIG9wdHMgJiYgb3B0cy5vdXQsIG9wdHMgJiYgb3B0cy5kaWN0aW9uYXJ5KTtcbn1cbi8vIGJlZm9yZSB5b3UgeWVsbCBhdCBtZSBmb3Igbm90IGp1c3QgdXNpbmcgZXh0ZW5kcywgbXkgcmVhc29uIGlzIHRoYXQgVFMgaW5oZXJpdGFuY2UgaXMgaGFyZCB0byB3b3JrZXJpemUuXG4vKipcbiAqIFN0cmVhbWluZyBHWklQIGNvbXByZXNzaW9uXG4gKi9cbnZhciBHemlwID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEd6aXAob3B0cywgY2IpIHtcbiAgICAgICAgdGhpcy5jID0gY3JjKCk7XG4gICAgICAgIHRoaXMubCA9IDA7XG4gICAgICAgIHRoaXMudiA9IDE7XG4gICAgICAgIERlZmxhdGUuY2FsbCh0aGlzLCBvcHRzLCBjYik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIEdaSVBwZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgR3ppcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5jLnAoY2h1bmspO1xuICAgICAgICB0aGlzLmwgKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgICBEZWZsYXRlLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIEd6aXAucHJvdG90eXBlLnAgPSBmdW5jdGlvbiAoYywgZikge1xuICAgICAgICB2YXIgcmF3ID0gZG9wdChjLCB0aGlzLm8sIHRoaXMudiAmJiBnemhsKHRoaXMubyksIGYgJiYgOCwgdGhpcy5zKTtcbiAgICAgICAgaWYgKHRoaXMudilcbiAgICAgICAgICAgIGd6aChyYXcsIHRoaXMubyksIHRoaXMudiA9IDA7XG4gICAgICAgIGlmIChmKVxuICAgICAgICAgICAgd2J5dGVzKHJhdywgcmF3Lmxlbmd0aCAtIDgsIHRoaXMuYy5kKCkpLCB3Ynl0ZXMocmF3LCByYXcubGVuZ3RoIC0gNCwgdGhpcy5sKTtcbiAgICAgICAgdGhpcy5vbmRhdGEocmF3LCBmKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEZsdXNoZXMgYnVmZmVyZWQgdW5jb21wcmVzc2VkIGRhdGEuIFVzZWZ1bCB0byBpbW1lZGlhdGVseSByZXRyaWV2ZSB0aGVcbiAgICAgKiBHWklQcGVkIG91dHB1dCBmb3Igc21hbGwgaW5wdXRzLlxuICAgICAqL1xuICAgIEd6aXAucHJvdG90eXBlLmZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBEZWZsYXRlLnByb3RvdHlwZS5mbHVzaC5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgcmV0dXJuIEd6aXA7XG59KCkpO1xuZXhwb3J0IHsgR3ppcCB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIEdaSVAgY29tcHJlc3Npb25cbiAqL1xudmFyIEFzeW5jR3ppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY0d6aXAob3B0cywgY2IpIHtcbiAgICAgICAgYXN0cm1pZnkoW1xuICAgICAgICAgICAgYkRmbHQsXG4gICAgICAgICAgICBnemUsXG4gICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbYXN0cm0sIERlZmxhdGUsIEd6aXBdOyB9XG4gICAgICAgIF0sIHRoaXMsIFN0cm1PcHQuY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgR3ppcChldi5kYXRhKTtcbiAgICAgICAgICAgIG9ubWVzc2FnZSA9IGFzdHJtKHN0cm0pO1xuICAgICAgICB9LCA4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jR3ppcDtcbn0oKSk7XG5leHBvcnQgeyBBc3luY0d6aXAgfTtcbmV4cG9ydCBmdW5jdGlvbiBnemlwKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkRmbHQsXG4gICAgICAgIGd6ZSxcbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2d6aXBTeW5jXTsgfVxuICAgIF0sIGZ1bmN0aW9uIChldikgeyByZXR1cm4gcGJmKGd6aXBTeW5jKGV2LmRhdGFbMF0sIGV2LmRhdGFbMV0pKTsgfSwgMiwgY2IpO1xufVxuLyoqXG4gKiBDb21wcmVzc2VzIGRhdGEgd2l0aCBHWklQXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBnemlwcGVkIHZlcnNpb24gb2YgdGhlIGRhdGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGd6aXBTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpXG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB2YXIgYyA9IGNyYygpLCBsID0gZGF0YS5sZW5ndGg7XG4gICAgYy5wKGRhdGEpO1xuICAgIHZhciBkID0gZG9wdChkYXRhLCBvcHRzLCBnemhsKG9wdHMpLCA4KSwgcyA9IGQubGVuZ3RoO1xuICAgIHJldHVybiBnemgoZCwgb3B0cyksIHdieXRlcyhkLCBzIC0gOCwgYy5kKCkpLCB3Ynl0ZXMoZCwgcyAtIDQsIGwpLCBkO1xufVxuLyoqXG4gKiBTdHJlYW1pbmcgc2luZ2xlIG9yIG11bHRpLW1lbWJlciBHWklQIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIEd1bnppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHdW56aXAob3B0cywgY2IpIHtcbiAgICAgICAgdGhpcy52ID0gMTtcbiAgICAgICAgdGhpcy5yID0gMDtcbiAgICAgICAgSW5mbGF0ZS5jYWxsKHRoaXMsIG9wdHMsIGNiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgR1VOWklQcGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIEd1bnppcC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgSW5mbGF0ZS5wcm90b3R5cGUuZS5jYWxsKHRoaXMsIGNodW5rKTtcbiAgICAgICAgdGhpcy5yICs9IGNodW5rLmxlbmd0aDtcbiAgICAgICAgaWYgKHRoaXMudikge1xuICAgICAgICAgICAgdmFyIHAgPSB0aGlzLnAuc3ViYXJyYXkodGhpcy52IC0gMSk7XG4gICAgICAgICAgICB2YXIgcyA9IHAubGVuZ3RoID4gMyA/IGd6cyhwKSA6IDQ7XG4gICAgICAgICAgICBpZiAocyA+IHAubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFmaW5hbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy52ID4gMSAmJiB0aGlzLm9ubWVtYmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbm1lbWJlcih0aGlzLnIgLSBwLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnAgPSBwLnN1YmFycmF5KHMpLCB0aGlzLnYgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIG5lY2Vzc2FyeSB0byBwcmV2ZW50IFRTIGZyb20gdXNpbmcgdGhlIGNsb3N1cmUgdmFsdWVcbiAgICAgICAgLy8gVGhpcyBhbGxvd3MgZm9yIHdvcmtlcml6YXRpb24gdG8gZnVuY3Rpb24gY29ycmVjdGx5XG4gICAgICAgIEluZmxhdGUucHJvdG90eXBlLmMuY2FsbCh0aGlzLCBmaW5hbCk7XG4gICAgICAgIC8vIHByb2Nlc3MgY29uY2F0ZW5hdGVkIEdaSVBcbiAgICAgICAgaWYgKHRoaXMucy5mICYmICF0aGlzLnMubCAmJiAhZmluYWwpIHtcbiAgICAgICAgICAgIHRoaXMudiA9IHNoZnQodGhpcy5zLnApICsgOTtcbiAgICAgICAgICAgIHRoaXMucyA9IHsgaTogMCB9O1xuICAgICAgICAgICAgdGhpcy5vID0gbmV3IHU4KDApO1xuICAgICAgICAgICAgdGhpcy5wdXNoKG5ldyB1OCgwKSwgZmluYWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gR3VuemlwO1xufSgpKTtcbmV4cG9ydCB7IEd1bnppcCB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIHNpbmdsZSBvciBtdWx0aS1tZW1iZXIgR1pJUCBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY0d1bnppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY0d1bnppcChvcHRzLCBjYikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiSW5mbHQsXG4gICAgICAgICAgICBndXplLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBJbmZsYXRlLCBHdW56aXBdOyB9XG4gICAgICAgIF0sIHRoaXMsIFN0cm1PcHQuY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgR3VuemlwKGV2LmRhdGEpO1xuICAgICAgICAgICAgc3RybS5vbm1lbWJlciA9IGZ1bmN0aW9uIChvZmZzZXQpIHsgcmV0dXJuIHBvc3RNZXNzYWdlKG9mZnNldCk7IH07XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgOSwgMCwgZnVuY3Rpb24gKG9mZnNldCkgeyByZXR1cm4gX3RoaXMub25tZW1iZXIgJiYgX3RoaXMub25tZW1iZXIob2Zmc2V0KTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBBc3luY0d1bnppcDtcbn0oKSk7XG5leHBvcnQgeyBBc3luY0d1bnppcCB9O1xuZXhwb3J0IGZ1bmN0aW9uIGd1bnppcChkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiBjYmlmeShkYXRhLCBvcHRzLCBbXG4gICAgICAgIGJJbmZsdCxcbiAgICAgICAgZ3V6ZSxcbiAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2d1bnppcFN5bmNdOyB9XG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYoZ3VuemlwU3luYyhldi5kYXRhWzBdLCBldi5kYXRhWzFdKSk7IH0sIDMsIGNiKTtcbn1cbi8qKlxuICogRXhwYW5kcyBHWklQIGRhdGFcbiAqIEBwYXJhbSBkYXRhIFRoZSBkYXRhIHRvIGRlY29tcHJlc3NcbiAqIEBwYXJhbSBvcHRzIFRoZSBkZWNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSBkZWNvbXByZXNzZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3VuemlwU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgdmFyIHN0ID0gZ3pzKGRhdGEpO1xuICAgIGlmIChzdCArIDggPiBkYXRhLmxlbmd0aClcbiAgICAgICAgZXJyKDYsICdpbnZhbGlkIGd6aXAgZGF0YScpO1xuICAgIHJldHVybiBpbmZsdChkYXRhLnN1YmFycmF5KHN0LCAtOCksIHsgaTogMiB9LCBvcHRzICYmIG9wdHMub3V0IHx8IG5ldyB1OChnemwoZGF0YSkpLCBvcHRzICYmIG9wdHMuZGljdGlvbmFyeSk7XG59XG4vKipcbiAqIFN0cmVhbWluZyBabGliIGNvbXByZXNzaW9uXG4gKi9cbnZhciBabGliID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFpsaWIob3B0cywgY2IpIHtcbiAgICAgICAgdGhpcy5jID0gYWRsZXIoKTtcbiAgICAgICAgdGhpcy52ID0gMTtcbiAgICAgICAgRGVmbGF0ZS5jYWxsKHRoaXMsIG9wdHMsIGNiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgemxpYmJlZFxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHVzaFxuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBabGliLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0aGlzLmMucChjaHVuayk7XG4gICAgICAgIERlZmxhdGUucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgWmxpYi5wcm90b3R5cGUucCA9IGZ1bmN0aW9uIChjLCBmKSB7XG4gICAgICAgIHZhciByYXcgPSBkb3B0KGMsIHRoaXMubywgdGhpcy52ICYmICh0aGlzLm8uZGljdGlvbmFyeSA/IDYgOiAyKSwgZiAmJiA0LCB0aGlzLnMpO1xuICAgICAgICBpZiAodGhpcy52KVxuICAgICAgICAgICAgemxoKHJhdywgdGhpcy5vKSwgdGhpcy52ID0gMDtcbiAgICAgICAgaWYgKGYpXG4gICAgICAgICAgICB3Ynl0ZXMocmF3LCByYXcubGVuZ3RoIC0gNCwgdGhpcy5jLmQoKSk7XG4gICAgICAgIHRoaXMub25kYXRhKHJhdywgZik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBGbHVzaGVzIGJ1ZmZlcmVkIHVuY29tcHJlc3NlZCBkYXRhLiBVc2VmdWwgdG8gaW1tZWRpYXRlbHkgcmV0cmlldmUgdGhlXG4gICAgICogemxpYmJlZCBvdXRwdXQgZm9yIHNtYWxsIGlucHV0cy5cbiAgICAgKi9cbiAgICBabGliLnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRGVmbGF0ZS5wcm90b3R5cGUuZmx1c2guY2FsbCh0aGlzKTtcbiAgICB9O1xuICAgIHJldHVybiBabGliO1xufSgpKTtcbmV4cG9ydCB7IFpsaWIgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBabGliIGNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY1psaWIgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXN5bmNabGliKG9wdHMsIGNiKSB7XG4gICAgICAgIGFzdHJtaWZ5KFtcbiAgICAgICAgICAgIGJEZmx0LFxuICAgICAgICAgICAgemxlLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBEZWZsYXRlLCBabGliXTsgfVxuICAgICAgICBdLCB0aGlzLCBTdHJtT3B0LmNhbGwodGhpcywgb3B0cywgY2IpLCBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgIHZhciBzdHJtID0gbmV3IFpsaWIoZXYuZGF0YSk7XG4gICAgICAgICAgICBvbm1lc3NhZ2UgPSBhc3RybShzdHJtKTtcbiAgICAgICAgfSwgMTAsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gQXN5bmNabGliO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jWmxpYiB9O1xuZXhwb3J0IGZ1bmN0aW9uIHpsaWIoZGF0YSwgb3B0cywgY2IpIHtcbiAgICBpZiAoIWNiKVxuICAgICAgICBjYiA9IG9wdHMsIG9wdHMgPSB7fTtcbiAgICBpZiAodHlwZW9mIGNiICE9ICdmdW5jdGlvbicpXG4gICAgICAgIGVycig3KTtcbiAgICByZXR1cm4gY2JpZnkoZGF0YSwgb3B0cywgW1xuICAgICAgICBiRGZsdCxcbiAgICAgICAgemxlLFxuICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbemxpYlN5bmNdOyB9XG4gICAgXSwgZnVuY3Rpb24gKGV2KSB7IHJldHVybiBwYmYoemxpYlN5bmMoZXYuZGF0YVswXSwgZXYuZGF0YVsxXSkpOyB9LCA0LCBjYik7XG59XG4vKipcbiAqIENvbXByZXNzIGRhdGEgd2l0aCBabGliXG4gKiBAcGFyYW0gZGF0YSBUaGUgZGF0YSB0byBjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGNvbXByZXNzaW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIFRoZSB6bGliLWNvbXByZXNzZWQgdmVyc2lvbiBvZiB0aGUgZGF0YVxuICovXG5leHBvcnQgZnVuY3Rpb24gemxpYlN5bmMoZGF0YSwgb3B0cykge1xuICAgIGlmICghb3B0cylcbiAgICAgICAgb3B0cyA9IHt9O1xuICAgIHZhciBhID0gYWRsZXIoKTtcbiAgICBhLnAoZGF0YSk7XG4gICAgdmFyIGQgPSBkb3B0KGRhdGEsIG9wdHMsIG9wdHMuZGljdGlvbmFyeSA/IDYgOiAyLCA0KTtcbiAgICByZXR1cm4gemxoKGQsIG9wdHMpLCB3Ynl0ZXMoZCwgZC5sZW5ndGggLSA0LCBhLmQoKSksIGQ7XG59XG4vKipcbiAqIFN0cmVhbWluZyBabGliIGRlY29tcHJlc3Npb25cbiAqL1xudmFyIFVuemxpYiA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBVbnpsaWIob3B0cywgY2IpIHtcbiAgICAgICAgSW5mbGF0ZS5jYWxsKHRoaXMsIG9wdHMsIGNiKTtcbiAgICAgICAgdGhpcy52ID0gb3B0cyAmJiBvcHRzLmRpY3Rpb25hcnkgPyAyIDogMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgdW56bGliYmVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIFVuemxpYi5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgSW5mbGF0ZS5wcm90b3R5cGUuZS5jYWxsKHRoaXMsIGNodW5rKTtcbiAgICAgICAgaWYgKHRoaXMudikge1xuICAgICAgICAgICAgaWYgKHRoaXMucC5sZW5ndGggPCA2ICYmICFmaW5hbClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLnAgPSB0aGlzLnAuc3ViYXJyYXkoemxzKHRoaXMucCwgdGhpcy52IC0gMSkpLCB0aGlzLnYgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucC5sZW5ndGggPCA0KVxuICAgICAgICAgICAgICAgIGVycig2LCAnaW52YWxpZCB6bGliIGRhdGEnKTtcbiAgICAgICAgICAgIHRoaXMucCA9IHRoaXMucC5zdWJhcnJheSgwLCAtNCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbmVjZXNzYXJ5IHRvIHByZXZlbnQgVFMgZnJvbSB1c2luZyB0aGUgY2xvc3VyZSB2YWx1ZVxuICAgICAgICAvLyBUaGlzIGFsbG93cyBmb3Igd29ya2VyaXphdGlvbiB0byBmdW5jdGlvbiBjb3JyZWN0bHlcbiAgICAgICAgSW5mbGF0ZS5wcm90b3R5cGUuYy5jYWxsKHRoaXMsIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBVbnpsaWI7XG59KCkpO1xuZXhwb3J0IHsgVW56bGliIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgWmxpYiBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBBc3luY1VuemxpYiA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBBc3luY1VuemxpYihvcHRzLCBjYikge1xuICAgICAgICBhc3RybWlmeShbXG4gICAgICAgICAgICBiSW5mbHQsXG4gICAgICAgICAgICB6dWxlLFxuICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gW2FzdHJtLCBJbmZsYXRlLCBVbnpsaWJdOyB9XG4gICAgICAgIF0sIHRoaXMsIFN0cm1PcHQuY2FsbCh0aGlzLCBvcHRzLCBjYiksIGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgdmFyIHN0cm0gPSBuZXcgVW56bGliKGV2LmRhdGEpO1xuICAgICAgICAgICAgb25tZXNzYWdlID0gYXN0cm0oc3RybSk7XG4gICAgICAgIH0sIDExLCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIEFzeW5jVW56bGliO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jVW56bGliIH07XG5leHBvcnQgZnVuY3Rpb24gdW56bGliKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgcmV0dXJuIGNiaWZ5KGRhdGEsIG9wdHMsIFtcbiAgICAgICAgYkluZmx0LFxuICAgICAgICB6dWxlLFxuICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBbdW56bGliU3luY107IH1cbiAgICBdLCBmdW5jdGlvbiAoZXYpIHsgcmV0dXJuIHBiZih1bnpsaWJTeW5jKGV2LmRhdGFbMF0sIGdvcHQoZXYuZGF0YVsxXSkpKTsgfSwgNSwgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIFpsaWIgZGF0YVxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGRlY29tcHJlc3Npb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnpsaWJTeW5jKGRhdGEsIG9wdHMpIHtcbiAgICByZXR1cm4gaW5mbHQoZGF0YS5zdWJhcnJheSh6bHMoZGF0YSwgb3B0cyAmJiBvcHRzLmRpY3Rpb25hcnkpLCAtNCksIHsgaTogMiB9LCBvcHRzICYmIG9wdHMub3V0LCBvcHRzICYmIG9wdHMuZGljdGlvbmFyeSk7XG59XG4vLyBEZWZhdWx0IGFsZ29yaXRobSBmb3IgY29tcHJlc3Npb24gKHVzZWQgYmVjYXVzZSBoYXZpbmcgYSBrbm93biBvdXRwdXQgc2l6ZSBhbGxvd3MgZmFzdGVyIGRlY29tcHJlc3Npb24pXG5leHBvcnQgeyBnemlwIGFzIGNvbXByZXNzLCBBc3luY0d6aXAgYXMgQXN5bmNDb21wcmVzcyB9O1xuZXhwb3J0IHsgZ3ppcFN5bmMgYXMgY29tcHJlc3NTeW5jLCBHemlwIGFzIENvbXByZXNzIH07XG4vKipcbiAqIFN0cmVhbWluZyBHWklQLCBabGliLCBvciByYXcgREVGTEFURSBkZWNvbXByZXNzaW9uXG4gKi9cbnZhciBEZWNvbXByZXNzID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERlY29tcHJlc3Mob3B0cywgY2IpIHtcbiAgICAgICAgdGhpcy5vID0gU3RybU9wdC5jYWxsKHRoaXMsIG9wdHMsIGNiKSB8fCB7fTtcbiAgICAgICAgdGhpcy5HID0gR3VuemlwO1xuICAgICAgICB0aGlzLkkgPSBJbmZsYXRlO1xuICAgICAgICB0aGlzLlogPSBVbnpsaWI7XG4gICAgfVxuICAgIC8vIGluaXQgc3Vic3RyZWFtXG4gICAgLy8gb3ZlcnJpZGVuIGJ5IEFzeW5jRGVjb21wcmVzc1xuICAgIERlY29tcHJlc3MucHJvdG90eXBlLmkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMucy5vbmRhdGEgPSBmdW5jdGlvbiAoZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgX3RoaXMub25kYXRhKGRhdCwgZmluYWwpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVjb21wcmVzc2VkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIERlY29tcHJlc3MucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICghdGhpcy5zKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wICYmIHRoaXMucC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbiA9IG5ldyB1OCh0aGlzLnAubGVuZ3RoICsgY2h1bmsubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBuLnNldCh0aGlzLnApLCBuLnNldChjaHVuaywgdGhpcy5wLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5wID0gY2h1bms7XG4gICAgICAgICAgICBpZiAodGhpcy5wLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnMgPSAodGhpcy5wWzBdID09IDMxICYmIHRoaXMucFsxXSA9PSAxMzkgJiYgdGhpcy5wWzJdID09IDgpXG4gICAgICAgICAgICAgICAgICAgID8gbmV3IHRoaXMuRyh0aGlzLm8pXG4gICAgICAgICAgICAgICAgICAgIDogKCh0aGlzLnBbMF0gJiAxNSkgIT0gOCB8fCAodGhpcy5wWzBdID4+IDQpID4gNyB8fCAoKHRoaXMucFswXSA8PCA4IHwgdGhpcy5wWzFdKSAlIDMxKSlcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbmV3IHRoaXMuSSh0aGlzLm8pXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG5ldyB0aGlzLloodGhpcy5vKTtcbiAgICAgICAgICAgICAgICB0aGlzLmkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnMucHVzaCh0aGlzLnAsIGZpbmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLnAgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMucy5wdXNoKGNodW5rLCBmaW5hbCk7XG4gICAgfTtcbiAgICByZXR1cm4gRGVjb21wcmVzcztcbn0oKSk7XG5leHBvcnQgeyBEZWNvbXByZXNzIH07XG4vKipcbiAqIEFzeW5jaHJvbm91cyBzdHJlYW1pbmcgR1pJUCwgWmxpYiwgb3IgcmF3IERFRkxBVEUgZGVjb21wcmVzc2lvblxuICovXG52YXIgQXN5bmNEZWNvbXByZXNzID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFzeW5jRGVjb21wcmVzcyhvcHRzLCBjYikge1xuICAgICAgICBEZWNvbXByZXNzLmNhbGwodGhpcywgb3B0cywgY2IpO1xuICAgICAgICB0aGlzLnF1ZXVlZFNpemUgPSAwO1xuICAgICAgICB0aGlzLkcgPSBBc3luY0d1bnppcDtcbiAgICAgICAgdGhpcy5JID0gQXN5bmNJbmZsYXRlO1xuICAgICAgICB0aGlzLlogPSBBc3luY1VuemxpYjtcbiAgICB9XG4gICAgQXN5bmNEZWNvbXByZXNzLnByb3RvdHlwZS5pID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnMub25kYXRhID0gZnVuY3Rpb24gKGVyciwgZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgX3RoaXMub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucy5vbmRyYWluID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgICAgICAgICAgIF90aGlzLnF1ZXVlZFNpemUgLT0gc2l6ZTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5vbmRyYWluKVxuICAgICAgICAgICAgICAgIF90aGlzLm9uZHJhaW4oc2l6ZSk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBQdXNoZXMgYSBjaHVuayB0byBiZSBkZWNvbXByZXNzZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgQXN5bmNEZWNvbXByZXNzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24gKGNodW5rLCBmaW5hbCkge1xuICAgICAgICB0aGlzLnF1ZXVlZFNpemUgKz0gY2h1bmsubGVuZ3RoO1xuICAgICAgICBEZWNvbXByZXNzLnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIHJldHVybiBBc3luY0RlY29tcHJlc3M7XG59KCkpO1xuZXhwb3J0IHsgQXN5bmNEZWNvbXByZXNzIH07XG5leHBvcnQgZnVuY3Rpb24gZGVjb21wcmVzcyhkYXRhLCBvcHRzLCBjYikge1xuICAgIGlmICghY2IpXG4gICAgICAgIGNiID0gb3B0cywgb3B0cyA9IHt9O1xuICAgIGlmICh0eXBlb2YgY2IgIT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgZXJyKDcpO1xuICAgIHJldHVybiAoZGF0YVswXSA9PSAzMSAmJiBkYXRhWzFdID09IDEzOSAmJiBkYXRhWzJdID09IDgpXG4gICAgICAgID8gZ3VuemlwKGRhdGEsIG9wdHMsIGNiKVxuICAgICAgICA6ICgoZGF0YVswXSAmIDE1KSAhPSA4IHx8IChkYXRhWzBdID4+IDQpID4gNyB8fCAoKGRhdGFbMF0gPDwgOCB8IGRhdGFbMV0pICUgMzEpKVxuICAgICAgICAgICAgPyBpbmZsYXRlKGRhdGEsIG9wdHMsIGNiKVxuICAgICAgICAgICAgOiB1bnpsaWIoZGF0YSwgb3B0cywgY2IpO1xufVxuLyoqXG4gKiBFeHBhbmRzIGNvbXByZXNzZWQgR1pJUCwgWmxpYiwgb3IgcmF3IERFRkxBVEUgZGF0YSwgYXV0b21hdGljYWxseSBkZXRlY3RpbmcgdGhlIGZvcm1hdFxuICogQHBhcmFtIGRhdGEgVGhlIGRhdGEgdG8gZGVjb21wcmVzc1xuICogQHBhcmFtIG9wdHMgVGhlIGRlY29tcHJlc3Npb24gb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGRlY29tcHJlc3NlZCB2ZXJzaW9uIG9mIHRoZSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbXByZXNzU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgcmV0dXJuIChkYXRhWzBdID09IDMxICYmIGRhdGFbMV0gPT0gMTM5ICYmIGRhdGFbMl0gPT0gOClcbiAgICAgICAgPyBndW56aXBTeW5jKGRhdGEsIG9wdHMpXG4gICAgICAgIDogKChkYXRhWzBdICYgMTUpICE9IDggfHwgKGRhdGFbMF0gPj4gNCkgPiA3IHx8ICgoZGF0YVswXSA8PCA4IHwgZGF0YVsxXSkgJSAzMSkpXG4gICAgICAgICAgICA/IGluZmxhdGVTeW5jKGRhdGEsIG9wdHMpXG4gICAgICAgICAgICA6IHVuemxpYlN5bmMoZGF0YSwgb3B0cyk7XG59XG4vLyBmbGF0dGVuIGEgZGlyZWN0b3J5IHN0cnVjdHVyZVxudmFyIGZsdG4gPSBmdW5jdGlvbiAoZCwgcCwgdCwgbykge1xuICAgIGZvciAodmFyIGsgaW4gZCkge1xuICAgICAgICB2YXIgdmFsID0gZFtrXSwgbiA9IHAgKyBrLCBvcCA9IG87XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkpXG4gICAgICAgICAgICBvcCA9IG1yZyhvLCB2YWxbMV0pLCB2YWwgPSB2YWxbMF07XG4gICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiB1OClcbiAgICAgICAgICAgIHRbbl0gPSBbdmFsLCBvcF07XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdFtuICs9ICcvJ10gPSBbbmV3IHU4KDApLCBvcF07XG4gICAgICAgICAgICBmbHRuKHZhbCwgbiwgdCwgbyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLy8gdGV4dCBlbmNvZGVyXG52YXIgdGUgPSB0eXBlb2YgVGV4dEVuY29kZXIgIT0gJ3VuZGVmaW5lZCcgJiYgLyojX19QVVJFX18qLyBuZXcgVGV4dEVuY29kZXIoKTtcbi8vIHRleHQgZGVjb2RlclxudmFyIHRkID0gdHlwZW9mIFRleHREZWNvZGVyICE9ICd1bmRlZmluZWQnICYmIC8qI19fUFVSRV9fKi8gbmV3IFRleHREZWNvZGVyKCk7XG4vLyB0ZXh0IGRlY29kZXIgc3RyZWFtXG52YXIgdGRzID0gMDtcbnRyeSB7XG4gICAgdGQuZGVjb2RlKGV0LCB7IHN0cmVhbTogdHJ1ZSB9KTtcbiAgICB0ZHMgPSAxO1xufVxuY2F0Y2ggKGUpIHsgfVxuLy8gZGVjb2RlIFVURjhcbnZhciBkdXRmOCA9IGZ1bmN0aW9uIChkKSB7XG4gICAgZm9yICh2YXIgciA9ICcnLCBpID0gMDs7KSB7XG4gICAgICAgIHZhciBjID0gZFtpKytdO1xuICAgICAgICB2YXIgZWIgPSAoYyA+IDEyNykgKyAoYyA+IDIyMykgKyAoYyA+IDIzOSk7XG4gICAgICAgIGlmIChpICsgZWIgPiBkLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB7IHM6IHIsIHI6IHNsYyhkLCBpIC0gMSkgfTtcbiAgICAgICAgaWYgKCFlYilcbiAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICAgICAgZWxzZSBpZiAoZWIgPT0gMykge1xuICAgICAgICAgICAgYyA9ICgoYyAmIDE1KSA8PCAxOCB8IChkW2krK10gJiA2MykgPDwgMTIgfCAoZFtpKytdICYgNjMpIDw8IDYgfCAoZFtpKytdICYgNjMpKSAtIDY1NTM2LFxuICAgICAgICAgICAgICAgIHIgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSg1NTI5NiB8IChjID4+IDEwKSwgNTYzMjAgfCAoYyAmIDEwMjMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlYiAmIDEpXG4gICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAzMSkgPDwgNiB8IChkW2krK10gJiA2MykpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiAxNSkgPDwgMTIgfCAoZFtpKytdICYgNjMpIDw8IDYgfCAoZFtpKytdICYgNjMpKTtcbiAgICB9XG59O1xuLyoqXG4gKiBTdHJlYW1pbmcgVVRGLTggZGVjb2RpbmdcbiAqL1xudmFyIERlY29kZVVURjggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVURi04IGRlY29kaW5nIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGRlY29kZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBEZWNvZGVVVEY4KGNiKSB7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgICAgIGlmICh0ZHMpXG4gICAgICAgICAgICB0aGlzLnQgPSBuZXcgVGV4dERlY29kZXIoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5wID0gZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlY29kZWQgZnJvbSBVVEYtOCBiaW5hcnlcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRGVjb2RlVVRGOC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgZmluYWwgPSAhIWZpbmFsO1xuICAgICAgICBpZiAodGhpcy50KSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YSh0aGlzLnQuZGVjb2RlKGNodW5rLCB7IHN0cmVhbTogdHJ1ZSB9KSwgZmluYWwpO1xuICAgICAgICAgICAgaWYgKGZpbmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudC5kZWNvZGUoKS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGVycig4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnQgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICB2YXIgZGF0ID0gbmV3IHU4KHRoaXMucC5sZW5ndGggKyBjaHVuay5sZW5ndGgpO1xuICAgICAgICBkYXQuc2V0KHRoaXMucCk7XG4gICAgICAgIGRhdC5zZXQoY2h1bmssIHRoaXMucC5sZW5ndGgpO1xuICAgICAgICB2YXIgX2EgPSBkdXRmOChkYXQpLCBzID0gX2EucywgciA9IF9hLnI7XG4gICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgaWYgKHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGVycig4KTtcbiAgICAgICAgICAgIHRoaXMucCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5wID0gcjtcbiAgICAgICAgdGhpcy5vbmRhdGEocywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIERlY29kZVVURjg7XG59KCkpO1xuZXhwb3J0IHsgRGVjb2RlVVRGOCB9O1xuLyoqXG4gKiBTdHJlYW1pbmcgVVRGLTggZW5jb2RpbmdcbiAqL1xudmFyIEVuY29kZVVURjggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVURi04IGRlY29kaW5nIHN0cmVhbVxuICAgICAqIEBwYXJhbSBjYiBUaGUgY2FsbGJhY2sgdG8gY2FsbCB3aGVuZXZlciBkYXRhIGlzIGVuY29kZWRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBFbmNvZGVVVEY4KGNiKSB7XG4gICAgICAgIHRoaXMub25kYXRhID0gY2I7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGVuY29kZWQgdG8gVVRGLThcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIHN0cmluZyBkYXRhIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgRW5jb2RlVVRGOC5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgaWYgKCF0aGlzLm9uZGF0YSlcbiAgICAgICAgICAgIGVycig1KTtcbiAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgIGVycig0KTtcbiAgICAgICAgdGhpcy5vbmRhdGEoc3RyVG9VOChjaHVuayksIHRoaXMuZCA9IGZpbmFsIHx8IGZhbHNlKTtcbiAgICB9O1xuICAgIHJldHVybiBFbmNvZGVVVEY4O1xufSgpKTtcbmV4cG9ydCB7IEVuY29kZVVURjggfTtcbi8qKlxuICogQ29udmVydHMgYSBzdHJpbmcgaW50byBhIFVpbnQ4QXJyYXkgZm9yIHVzZSB3aXRoIGNvbXByZXNzaW9uL2RlY29tcHJlc3Npb24gbWV0aG9kc1xuICogQHBhcmFtIHN0ciBUaGUgc3RyaW5nIHRvIGVuY29kZVxuICogQHBhcmFtIGxhdGluMSBXaGV0aGVyIG9yIG5vdCB0byBpbnRlcnByZXQgdGhlIGRhdGEgYXMgTGF0aW4tMS4gVGhpcyBzaG91bGRcbiAqICAgICAgICAgICAgICAgbm90IG5lZWQgdG8gYmUgdHJ1ZSB1bmxlc3MgZGVjb2RpbmcgYSBiaW5hcnkgc3RyaW5nLlxuICogQHJldHVybnMgVGhlIHN0cmluZyBlbmNvZGVkIGluIFVURi04L0xhdGluLTEgYmluYXJ5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJUb1U4KHN0ciwgbGF0aW4xKSB7XG4gICAgaWYgKGxhdGluMSkge1xuICAgICAgICB2YXIgYXJfMSA9IG5ldyB1OChzdHIubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpXG4gICAgICAgICAgICBhcl8xW2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIHJldHVybiBhcl8xO1xuICAgIH1cbiAgICBpZiAodGUpXG4gICAgICAgIHJldHVybiB0ZS5lbmNvZGUoc3RyKTtcbiAgICB2YXIgbCA9IHN0ci5sZW5ndGg7XG4gICAgdmFyIGFyID0gbmV3IHU4KHN0ci5sZW5ndGggKyAoc3RyLmxlbmd0aCA+PiAxKSk7XG4gICAgdmFyIGFpID0gMDtcbiAgICB2YXIgdyA9IGZ1bmN0aW9uICh2KSB7IGFyW2FpKytdID0gdjsgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7ICsraSkge1xuICAgICAgICBpZiAoYWkgKyA1ID4gYXIubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbiA9IG5ldyB1OChhaSArIDggKyAoKGwgLSBpKSA8PCAxKSk7XG4gICAgICAgICAgICBuLnNldChhcik7XG4gICAgICAgICAgICBhciA9IG47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAxMjggfHwgbGF0aW4xKVxuICAgICAgICAgICAgdyhjKTtcbiAgICAgICAgZWxzZSBpZiAoYyA8IDIwNDgpXG4gICAgICAgICAgICB3KDE5MiB8IChjID4+IDYpKSwgdygxMjggfCAoYyAmIDYzKSk7XG4gICAgICAgIGVsc2UgaWYgKGMgPiA1NTI5NSAmJiBjIDwgNTczNDQpXG4gICAgICAgICAgICBjID0gNjU1MzYgKyAoYyAmIDEwMjMgPDwgMTApIHwgKHN0ci5jaGFyQ29kZUF0KCsraSkgJiAxMDIzKSxcbiAgICAgICAgICAgICAgICB3KDI0MCB8IChjID4+IDE4KSksIHcoMTI4IHwgKChjID4+IDEyKSAmIDYzKSksIHcoMTI4IHwgKChjID4+IDYpICYgNjMpKSwgdygxMjggfCAoYyAmIDYzKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHcoMjI0IHwgKGMgPj4gMTIpKSwgdygxMjggfCAoKGMgPj4gNikgJiA2MykpLCB3KDEyOCB8IChjICYgNjMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHNsYyhhciwgMCwgYWkpO1xufVxuLyoqXG4gKiBDb252ZXJ0cyBhIFVpbnQ4QXJyYXkgdG8gYSBzdHJpbmdcbiAqIEBwYXJhbSBkYXQgVGhlIGRhdGEgdG8gZGVjb2RlIHRvIHN0cmluZ1xuICogQHBhcmFtIGxhdGluMSBXaGV0aGVyIG9yIG5vdCB0byBpbnRlcnByZXQgdGhlIGRhdGEgYXMgTGF0aW4tMS4gVGhpcyBzaG91bGRcbiAqICAgICAgICAgICAgICAgbm90IG5lZWQgdG8gYmUgdHJ1ZSB1bmxlc3MgZW5jb2RpbmcgdG8gYmluYXJ5IHN0cmluZy5cbiAqIEByZXR1cm5zIFRoZSBvcmlnaW5hbCBVVEYtOC9MYXRpbi0xIHN0cmluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gc3RyRnJvbVU4KGRhdCwgbGF0aW4xKSB7XG4gICAgaWYgKGxhdGluMSkge1xuICAgICAgICB2YXIgciA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdC5sZW5ndGg7IGkgKz0gMTYzODQpXG4gICAgICAgICAgICByICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgZGF0LnN1YmFycmF5KGksIGkgKyAxNjM4NCkpO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9XG4gICAgZWxzZSBpZiAodGQpIHtcbiAgICAgICAgcmV0dXJuIHRkLmRlY29kZShkYXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIF9hID0gZHV0ZjgoZGF0KSwgcyA9IF9hLnMsIHIgPSBfYS5yO1xuICAgICAgICBpZiAoci5sZW5ndGgpXG4gICAgICAgICAgICBlcnIoOCk7XG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cbn1cbjtcbi8vIGRlZmxhdGUgYml0IGZsYWdcbnZhciBkYmYgPSBmdW5jdGlvbiAobCkgeyByZXR1cm4gbCA9PSAxID8gMyA6IGwgPCA2ID8gMiA6IGwgPT0gOSA/IDEgOiAwOyB9O1xuLy8gc2tpcCBsb2NhbCB6aXAgaGVhZGVyXG52YXIgc2x6aCA9IGZ1bmN0aW9uIChkLCBiKSB7IHJldHVybiBiICsgMzAgKyBiMihkLCBiICsgMjYpICsgYjIoZCwgYiArIDI4KTsgfTtcbi8vIHJlYWQgemlwIGhlYWRlclxudmFyIHpoID0gZnVuY3Rpb24gKGQsIGIsIHopIHtcbiAgICB2YXIgZm5sID0gYjIoZCwgYiArIDI4KSwgZm4gPSBzdHJGcm9tVTgoZC5zdWJhcnJheShiICsgNDYsIGIgKyA0NiArIGZubCksICEoYjIoZCwgYiArIDgpICYgMjA0OCkpLCBlcyA9IGIgKyA0NiArIGZubCwgYnMgPSBiNChkLCBiICsgMjApO1xuICAgIHZhciBfYSA9IHogJiYgYnMgPT0gNDI5NDk2NzI5NSA/IHo2NGUoZCwgZXMpIDogW2JzLCBiNChkLCBiICsgMjQpLCBiNChkLCBiICsgNDIpXSwgc2MgPSBfYVswXSwgc3UgPSBfYVsxXSwgb2ZmID0gX2FbMl07XG4gICAgcmV0dXJuIFtiMihkLCBiICsgMTApLCBzYywgc3UsIGZuLCBlcyArIGIyKGQsIGIgKyAzMCkgKyBiMihkLCBiICsgMzIpLCBvZmZdO1xufTtcbi8vIHJlYWQgemlwNjQgZXh0cmEgZmllbGRcbnZhciB6NjRlID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKDsgYjIoZCwgYikgIT0gMTsgYiArPSA0ICsgYjIoZCwgYiArIDIpKVxuICAgICAgICA7XG4gICAgcmV0dXJuIFtiOChkLCBiICsgMTIpLCBiOChkLCBiICsgNCksIGI4KGQsIGIgKyAyMCldO1xufTtcbi8vIGV4dHJhIGZpZWxkIGxlbmd0aFxudmFyIGV4ZmwgPSBmdW5jdGlvbiAoZXgpIHtcbiAgICB2YXIgbGUgPSAwO1xuICAgIGlmIChleCkge1xuICAgICAgICBmb3IgKHZhciBrIGluIGV4KSB7XG4gICAgICAgICAgICB2YXIgbCA9IGV4W2tdLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChsID4gNjU1MzUpXG4gICAgICAgICAgICAgICAgZXJyKDkpO1xuICAgICAgICAgICAgbGUgKz0gbCArIDQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlO1xufTtcbi8vIHdyaXRlIHppcCBoZWFkZXJcbnZhciB3emggPSBmdW5jdGlvbiAoZCwgYiwgZiwgZm4sIHUsIGMsIGNlLCBjbykge1xuICAgIHZhciBmbCA9IGZuLmxlbmd0aCwgZXggPSBmLmV4dHJhLCBjb2wgPSBjbyAmJiBjby5sZW5ndGg7XG4gICAgdmFyIGV4bCA9IGV4ZmwoZXgpO1xuICAgIHdieXRlcyhkLCBiLCBjZSAhPSBudWxsID8gMHgyMDE0QjUwIDogMHg0MDM0QjUwKSwgYiArPSA0O1xuICAgIGlmIChjZSAhPSBudWxsKVxuICAgICAgICBkW2IrK10gPSAyMCwgZFtiKytdID0gZi5vcztcbiAgICBkW2JdID0gMjAsIGIgKz0gMjsgLy8gc3BlYyBjb21wbGlhbmNlPyB3aGF0J3MgdGhhdD9cbiAgICBkW2IrK10gPSAoZi5mbGFnIDw8IDEpIHwgKGMgPCAwICYmIDgpLCBkW2IrK10gPSB1ICYmIDg7XG4gICAgZFtiKytdID0gZi5jb21wcmVzc2lvbiAmIDI1NSwgZFtiKytdID0gZi5jb21wcmVzc2lvbiA+PiA4O1xuICAgIHZhciBkdCA9IG5ldyBEYXRlKGYubXRpbWUgPT0gbnVsbCA/IERhdGUubm93KCkgOiBmLm10aW1lKSwgeSA9IGR0LmdldEZ1bGxZZWFyKCkgLSAxOTgwO1xuICAgIGlmICh5IDwgMCB8fCB5ID4gMTE5KVxuICAgICAgICBlcnIoMTApO1xuICAgIHdieXRlcyhkLCBiLCAoeSA8PCAyNSkgfCAoKGR0LmdldE1vbnRoKCkgKyAxKSA8PCAyMSkgfCAoZHQuZ2V0RGF0ZSgpIDw8IDE2KSB8IChkdC5nZXRIb3VycygpIDw8IDExKSB8IChkdC5nZXRNaW51dGVzKCkgPDwgNSkgfCAoZHQuZ2V0U2Vjb25kcygpID4+IDEpKSwgYiArPSA0O1xuICAgIGlmIChjICE9IC0xKSB7XG4gICAgICAgIHdieXRlcyhkLCBiLCBmLmNyYyk7XG4gICAgICAgIHdieXRlcyhkLCBiICsgNCwgYyA8IDAgPyAtYyAtIDIgOiBjKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyA4LCBmLnNpemUpO1xuICAgIH1cbiAgICB3Ynl0ZXMoZCwgYiArIDEyLCBmbCk7XG4gICAgd2J5dGVzKGQsIGIgKyAxNCwgZXhsKSwgYiArPSAxNjtcbiAgICBpZiAoY2UgIT0gbnVsbCkge1xuICAgICAgICB3Ynl0ZXMoZCwgYiwgY29sKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyA2LCBmLmF0dHJzKTtcbiAgICAgICAgd2J5dGVzKGQsIGIgKyAxMCwgY2UpLCBiICs9IDE0O1xuICAgIH1cbiAgICBkLnNldChmbiwgYik7XG4gICAgYiArPSBmbDtcbiAgICBpZiAoZXhsKSB7XG4gICAgICAgIGZvciAodmFyIGsgaW4gZXgpIHtcbiAgICAgICAgICAgIHZhciBleGYgPSBleFtrXSwgbCA9IGV4Zi5sZW5ndGg7XG4gICAgICAgICAgICB3Ynl0ZXMoZCwgYiwgK2spO1xuICAgICAgICAgICAgd2J5dGVzKGQsIGIgKyAyLCBsKTtcbiAgICAgICAgICAgIGQuc2V0KGV4ZiwgYiArIDQpLCBiICs9IDQgKyBsO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjb2wpXG4gICAgICAgIGQuc2V0KGNvLCBiKSwgYiArPSBjb2w7XG4gICAgcmV0dXJuIGI7XG59O1xuLy8gd3JpdGUgemlwIGZvb3RlciAoZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5KVxudmFyIHd6ZiA9IGZ1bmN0aW9uIChvLCBiLCBjLCBkLCBlKSB7XG4gICAgd2J5dGVzKG8sIGIsIDB4NjA1NEI1MCk7IC8vIHNraXAgZGlza1xuICAgIHdieXRlcyhvLCBiICsgOCwgYyk7XG4gICAgd2J5dGVzKG8sIGIgKyAxMCwgYyk7XG4gICAgd2J5dGVzKG8sIGIgKyAxMiwgZCk7XG4gICAgd2J5dGVzKG8sIGIgKyAxNiwgZSk7XG59O1xuLyoqXG4gKiBBIHBhc3MtdGhyb3VnaCBzdHJlYW0gdG8ga2VlcCBkYXRhIHVuY29tcHJlc3NlZCBpbiBhIFpJUCBhcmNoaXZlLlxuICovXG52YXIgWmlwUGFzc1Rocm91Z2ggPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHBhc3MtdGhyb3VnaCBzdHJlYW0gdGhhdCBjYW4gYmUgYWRkZWQgdG8gWklQIGFyY2hpdmVzXG4gICAgICogQHBhcmFtIGZpbGVuYW1lIFRoZSBmaWxlbmFtZSB0byBhc3NvY2lhdGUgd2l0aCB0aGlzIGRhdGEgc3RyZWFtXG4gICAgICovXG4gICAgZnVuY3Rpb24gWmlwUGFzc1Rocm91Z2goZmlsZW5hbWUpIHtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgICAgICB0aGlzLmMgPSBjcmMoKTtcbiAgICAgICAgdGhpcy5zaXplID0gMDtcbiAgICAgICAgdGhpcy5jb21wcmVzc2lvbiA9IDA7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlcyBhIGNodW5rIGFuZCBwdXNoZXMgdG8gdGhlIG91dHB1dCBzdHJlYW0uIFlvdSBjYW4gb3ZlcnJpZGUgdGhpc1xuICAgICAqIG1ldGhvZCBpbiBhIHN1YmNsYXNzIGZvciBjdXN0b20gYmVoYXZpb3IsIGJ1dCBieSBkZWZhdWx0IHRoaXMgcGFzc2VzXG4gICAgICogdGhlIGRhdGEgdGhyb3VnaC4gWW91IG11c3QgY2FsbCB0aGlzLm9uZGF0YShlcnIsIGNodW5rLCBmaW5hbCkgYXQgc29tZVxuICAgICAqIHBvaW50IGluIHRoaXMgbWV0aG9kLlxuICAgICAqIEBwYXJhbSBjaHVuayBUaGUgY2h1bmsgdG8gcHJvY2Vzc1xuICAgICAqIEBwYXJhbSBmaW5hbCBXaGV0aGVyIHRoaXMgaXMgdGhlIGxhc3QgY2h1bmtcbiAgICAgKi9cbiAgICBaaXBQYXNzVGhyb3VnaC5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEobnVsbCwgY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGFkZGVkLiBJZiB5b3UgYXJlIHN1YmNsYXNzaW5nIHRoaXMgd2l0aCBhIGN1c3RvbVxuICAgICAqIGNvbXByZXNzaW9uIGFsZ29yaXRobSwgbm90ZSB0aGF0IHlvdSBtdXN0IHB1c2ggZGF0YSBmcm9tIHRoZSBzb3VyY2VcbiAgICAgKiBmaWxlIG9ubHksIHByZS1jb21wcmVzc2lvbi5cbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgWmlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIHRoaXMuYy5wKGNodW5rKTtcbiAgICAgICAgdGhpcy5zaXplICs9IGNodW5rLmxlbmd0aDtcbiAgICAgICAgaWYgKGZpbmFsKVxuICAgICAgICAgICAgdGhpcy5jcmMgPSB0aGlzLmMuZCgpO1xuICAgICAgICB0aGlzLnByb2Nlc3MoY2h1bmssIGZpbmFsIHx8IGZhbHNlKTtcbiAgICB9O1xuICAgIHJldHVybiBaaXBQYXNzVGhyb3VnaDtcbn0oKSk7XG5leHBvcnQgeyBaaXBQYXNzVGhyb3VnaCB9O1xuLy8gSSBkb24ndCBleHRlbmQgYmVjYXVzZSBUeXBlU2NyaXB0IGV4dGVuc2lvbiBhZGRzIDFrQiBvZiBydW50aW1lIGJsb2F0XG4vKipcbiAqIFN0cmVhbWluZyBERUZMQVRFIGNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXMuIFByZWZlciB1c2luZyBBc3luY1ppcERlZmxhdGVcbiAqIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAqL1xudmFyIFppcERlZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERFRkxBVEUgc3RyZWFtIHRoYXQgY2FuIGJlIGFkZGVkIHRvIFpJUCBhcmNoaXZlc1xuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBUaGUgZmlsZW5hbWUgdG8gYXNzb2NpYXRlIHdpdGggdGhpcyBkYXRhIHN0cmVhbVxuICAgICAqIEBwYXJhbSBvcHRzIFRoZSBjb21wcmVzc2lvbiBvcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gWmlwRGVmbGF0ZShmaWxlbmFtZSwgb3B0cykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIW9wdHMpXG4gICAgICAgICAgICBvcHRzID0ge307XG4gICAgICAgIFppcFBhc3NUaHJvdWdoLmNhbGwodGhpcywgZmlsZW5hbWUpO1xuICAgICAgICB0aGlzLmQgPSBuZXcgRGVmbGF0ZShvcHRzLCBmdW5jdGlvbiAoZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgX3RoaXMub25kYXRhKG51bGwsIGRhdCwgZmluYWwpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jb21wcmVzc2lvbiA9IDg7XG4gICAgICAgIHRoaXMuZmxhZyA9IGRiZihvcHRzLmxldmVsKTtcbiAgICB9XG4gICAgWmlwRGVmbGF0ZS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZC5wdXNoKGNodW5rLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMub25kYXRhKGUsIG51bGwsIGZpbmFsKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgZGVmbGF0ZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgWmlwRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIFppcERlZmxhdGU7XG59KCkpO1xuZXhwb3J0IHsgWmlwRGVmbGF0ZSB9O1xuLyoqXG4gKiBBc3luY2hyb25vdXMgc3RyZWFtaW5nIERFRkxBVEUgY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlc1xuICovXG52YXIgQXN5bmNaaXBEZWZsYXRlID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gYXN5bmNocm9ub3VzIERFRkxBVEUgc3RyZWFtIHRoYXQgY2FuIGJlIGFkZGVkIHRvIFpJUCBhcmNoaXZlc1xuICAgICAqIEBwYXJhbSBmaWxlbmFtZSBUaGUgZmlsZW5hbWUgdG8gYXNzb2NpYXRlIHdpdGggdGhpcyBkYXRhIHN0cmVhbVxuICAgICAqIEBwYXJhbSBvcHRzIFRoZSBjb21wcmVzc2lvbiBvcHRpb25zXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXN5bmNaaXBEZWZsYXRlKGZpbGVuYW1lLCBvcHRzKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghb3B0cylcbiAgICAgICAgICAgIG9wdHMgPSB7fTtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2guY2FsbCh0aGlzLCBmaWxlbmFtZSk7XG4gICAgICAgIHRoaXMuZCA9IG5ldyBBc3luY0RlZmxhdGUob3B0cywgZnVuY3Rpb24gKGVyciwgZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgX3RoaXMub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvbXByZXNzaW9uID0gODtcbiAgICAgICAgdGhpcy5mbGFnID0gZGJmKG9wdHMubGV2ZWwpO1xuICAgICAgICB0aGlzLnRlcm1pbmF0ZSA9IHRoaXMuZC50ZXJtaW5hdGU7XG4gICAgfVxuICAgIEFzeW5jWmlwRGVmbGF0ZS5wcm90b3R5cGUucHJvY2VzcyA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgdGhpcy5kLnB1c2goY2h1bmssIGZpbmFsKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFB1c2hlcyBhIGNodW5rIHRvIGJlIGRlZmxhdGVkXG4gICAgICogQHBhcmFtIGNodW5rIFRoZSBjaHVuayB0byBwdXNoXG4gICAgICogQHBhcmFtIGZpbmFsIFdoZXRoZXIgdGhpcyBpcyB0aGUgbGFzdCBjaHVua1xuICAgICAqL1xuICAgIEFzeW5jWmlwRGVmbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChjaHVuaywgZmluYWwpIHtcbiAgICAgICAgWmlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCBjaHVuaywgZmluYWwpO1xuICAgIH07XG4gICAgcmV0dXJuIEFzeW5jWmlwRGVmbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBBc3luY1ppcERlZmxhdGUgfTtcbi8vIFRPRE86IEJldHRlciB0cmVlIHNoYWtpbmdcbi8qKlxuICogQSB6aXBwYWJsZSBhcmNoaXZlIHRvIHdoaWNoIGZpbGVzIGNhbiBpbmNyZW1lbnRhbGx5IGJlIGFkZGVkXG4gKi9cbnZhciBaaXAgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBlbXB0eSBaSVAgYXJjaGl2ZSB0byB3aGljaCBmaWxlcyBjYW4gYmUgYWRkZWRcbiAgICAgKiBAcGFyYW0gY2IgVGhlIGNhbGxiYWNrIHRvIGNhbGwgd2hlbmV2ZXIgZGF0YSBmb3IgdGhlIGdlbmVyYXRlZCBaSVAgYXJjaGl2ZVxuICAgICAqICAgICAgICAgICBpcyBhdmFpbGFibGVcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBaaXAoY2IpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEgPSBjYjtcbiAgICAgICAgdGhpcy51ID0gW107XG4gICAgICAgIHRoaXMuZCA9IDE7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBmaWxlIHRvIHRoZSBaSVAgYXJjaGl2ZVxuICAgICAqIEBwYXJhbSBmaWxlIFRoZSBmaWxlIHN0cmVhbSB0byBhZGRcbiAgICAgKi9cbiAgICBaaXAucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChmaWxlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5vbmRhdGEpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIC8vIGZpbmlzaGluZyBvciBmaW5pc2hlZFxuICAgICAgICBpZiAodGhpcy5kICYgMilcbiAgICAgICAgICAgIHRoaXMub25kYXRhKGVycig0ICsgKHRoaXMuZCAmIDEpICogOCwgMCwgMSksIG51bGwsIGZhbHNlKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZiA9IHN0clRvVTgoZmlsZS5maWxlbmFtZSksIGZsXzEgPSBmLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBjb20gPSBmaWxlLmNvbW1lbnQsIG8gPSBjb20gJiYgc3RyVG9VOChjb20pO1xuICAgICAgICAgICAgdmFyIHUgPSBmbF8xICE9IGZpbGUuZmlsZW5hbWUubGVuZ3RoIHx8IChvICYmIChjb20ubGVuZ3RoICE9IG8ubGVuZ3RoKSk7XG4gICAgICAgICAgICB2YXIgaGxfMSA9IGZsXzEgKyBleGZsKGZpbGUuZXh0cmEpICsgMzA7XG4gICAgICAgICAgICBpZiAoZmxfMSA+IDY1NTM1KVxuICAgICAgICAgICAgICAgIHRoaXMub25kYXRhKGVycigxMSwgMCwgMSksIG51bGwsIGZhbHNlKTtcbiAgICAgICAgICAgIHZhciBoZWFkZXIgPSBuZXcgdTgoaGxfMSk7XG4gICAgICAgICAgICB3emgoaGVhZGVyLCAwLCBmaWxlLCBmLCB1LCAtMSk7XG4gICAgICAgICAgICB2YXIgY2hrc18xID0gW2hlYWRlcl07XG4gICAgICAgICAgICB2YXIgcEFsbF8xID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIF9pID0gMCwgY2hrc18yID0gY2hrc18xOyBfaSA8IGNoa3NfMi5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoayA9IGNoa3NfMltfaV07XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm9uZGF0YShudWxsLCBjaGssIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2hrc18xID0gW107XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHRyXzEgPSB0aGlzLmQ7XG4gICAgICAgICAgICB0aGlzLmQgPSAwO1xuICAgICAgICAgICAgdmFyIGluZF8xID0gdGhpcy51Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciB1Zl8xID0gbXJnKGZpbGUsIHtcbiAgICAgICAgICAgICAgICBmOiBmLFxuICAgICAgICAgICAgICAgIHU6IHUsXG4gICAgICAgICAgICAgICAgbzogbyxcbiAgICAgICAgICAgICAgICB0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWxlLnRlcm1pbmF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUudGVybWluYXRlKCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHBBbGxfMSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG54dCA9IF90aGlzLnVbaW5kXzEgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChueHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnh0LnIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cl8xID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBjbF8xID0gMDtcbiAgICAgICAgICAgIGZpbGUub25kYXRhID0gZnVuY3Rpb24gKGVyciwgZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMub25kYXRhKGVyciwgZGF0LCBmaW5hbCk7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnRlcm1pbmF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xfMSArPSBkYXQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjaGtzXzEucHVzaChkYXQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmluYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZCA9IG5ldyB1OCgxNik7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDAsIDB4ODA3NEI1MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDQsIGZpbGUuY3JjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdieXRlcyhkZCwgOCwgY2xfMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3Ynl0ZXMoZGQsIDEyLCBmaWxlLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hrc18xLnB1c2goZGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdWZfMS5jID0gY2xfMSwgdWZfMS5iID0gaGxfMSArIGNsXzEgKyAxNiwgdWZfMS5jcmMgPSBmaWxlLmNyYywgdWZfMS5zaXplID0gZmlsZS5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWZfMS5yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cl8xID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0cl8xKVxuICAgICAgICAgICAgICAgICAgICAgICAgcEFsbF8xKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudS5wdXNoKHVmXzEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBFbmRzIHRoZSBwcm9jZXNzIG9mIGFkZGluZyBmaWxlcyBhbmQgcHJlcGFyZXMgdG8gZW1pdCB0aGUgZmluYWwgY2h1bmtzLlxuICAgICAqIFRoaXMgKm11c3QqIGJlIGNhbGxlZCBhZnRlciBhZGRpbmcgYWxsIGRlc2lyZWQgZmlsZXMgZm9yIHRoZSByZXN1bHRpbmdcbiAgICAgKiBaSVAgZmlsZSB0byB3b3JrIHByb3Blcmx5LlxuICAgICAqL1xuICAgIFppcC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5kICYgMikge1xuICAgICAgICAgICAgdGhpcy5vbmRhdGEoZXJyKDQgKyAodGhpcy5kICYgMSkgKiA4LCAwLCAxKSwgbnVsbCwgdHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgIHRoaXMuZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnUucHVzaCh7XG4gICAgICAgICAgICAgICAgcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShfdGhpcy5kICYgMSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnUuc3BsaWNlKC0xLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZSgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdDogZnVuY3Rpb24gKCkgeyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5kID0gMztcbiAgICB9O1xuICAgIFppcC5wcm90b3R5cGUuZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGJ0ID0gMCwgbCA9IDAsIHRsID0gMDtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBmID0gX2FbX2ldO1xuICAgICAgICAgICAgdGwgKz0gNDYgKyBmLmYubGVuZ3RoICsgZXhmbChmLmV4dHJhKSArIChmLm8gPyBmLm8ubGVuZ3RoIDogMCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG91dCA9IG5ldyB1OCh0bCArIDIyKTtcbiAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IHRoaXMudTsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgIHZhciBmID0gX2NbX2JdO1xuICAgICAgICAgICAgd3poKG91dCwgYnQsIGYsIGYuZiwgZi51LCAtZi5jIC0gMiwgbCwgZi5vKTtcbiAgICAgICAgICAgIGJ0ICs9IDQ2ICsgZi5mLmxlbmd0aCArIGV4ZmwoZi5leHRyYSkgKyAoZi5vID8gZi5vLmxlbmd0aCA6IDApLCBsICs9IGYuYjtcbiAgICAgICAgfVxuICAgICAgICB3emYob3V0LCBidCwgdGhpcy51Lmxlbmd0aCwgdGwsIGwpO1xuICAgICAgICB0aGlzLm9uZGF0YShudWxsLCBvdXQsIHRydWUpO1xuICAgICAgICB0aGlzLmQgPSAyO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogQSBtZXRob2QgdG8gdGVybWluYXRlIGFueSBpbnRlcm5hbCB3b3JrZXJzIHVzZWQgYnkgdGhlIHN0cmVhbS4gU3Vic2VxdWVudFxuICAgICAqIGNhbGxzIHRvIGFkZCgpIHdpbGwgZmFpbC5cbiAgICAgKi9cbiAgICBaaXAucHJvdG90eXBlLnRlcm1pbmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMudTsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBmID0gX2FbX2ldO1xuICAgICAgICAgICAgZi50KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kID0gMjtcbiAgICB9O1xuICAgIHJldHVybiBaaXA7XG59KCkpO1xuZXhwb3J0IHsgWmlwIH07XG5leHBvcnQgZnVuY3Rpb24gemlwKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgdmFyIHIgPSB7fTtcbiAgICBmbHRuKGRhdGEsICcnLCByLCBvcHRzKTtcbiAgICB2YXIgayA9IE9iamVjdC5rZXlzKHIpO1xuICAgIHZhciBsZnQgPSBrLmxlbmd0aCwgbyA9IDAsIHRvdCA9IDA7XG4gICAgdmFyIHNsZnQgPSBsZnQsIGZpbGVzID0gbmV3IEFycmF5KGxmdCk7XG4gICAgdmFyIHRlcm0gPSBbXTtcbiAgICB2YXIgdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXJtLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgdGVybVtpXSgpO1xuICAgIH07XG4gICAgdmFyIGNiZCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIG10KGZ1bmN0aW9uICgpIHsgY2IoYSwgYik7IH0pO1xuICAgIH07XG4gICAgbXQoZnVuY3Rpb24gKCkgeyBjYmQgPSBjYjsgfSk7XG4gICAgdmFyIGNiZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG91dCA9IG5ldyB1OCh0b3QgKyAyMiksIG9lID0gbywgY2RsID0gdG90IC0gbztcbiAgICAgICAgdG90ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGZ0OyArK2kpIHtcbiAgICAgICAgICAgIHZhciBmID0gZmlsZXNbaV07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBsID0gZi5jLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3emgob3V0LCB0b3QsIGYsIGYuZiwgZi51LCBsKTtcbiAgICAgICAgICAgICAgICB2YXIgYmFkZCA9IDMwICsgZi5mLmxlbmd0aCArIGV4ZmwoZi5leHRyYSk7XG4gICAgICAgICAgICAgICAgdmFyIGxvYyA9IHRvdCArIGJhZGQ7XG4gICAgICAgICAgICAgICAgb3V0LnNldChmLmMsIGxvYyk7XG4gICAgICAgICAgICAgICAgd3poKG91dCwgbywgZiwgZi5mLCBmLnUsIGwsIHRvdCwgZi5tKSwgbyArPSAxNiArIGJhZGQgKyAoZi5tID8gZi5tLmxlbmd0aCA6IDApLCB0b3QgPSBsb2MgKyBsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2JkKGUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHd6ZihvdXQsIG8sIGZpbGVzLmxlbmd0aCwgY2RsLCBvZSk7XG4gICAgICAgIGNiZChudWxsLCBvdXQpO1xuICAgIH07XG4gICAgaWYgKCFsZnQpXG4gICAgICAgIGNiZigpO1xuICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgdmFyIGZuID0ga1tpXTtcbiAgICAgICAgdmFyIF9hID0gcltmbl0sIGZpbGUgPSBfYVswXSwgcCA9IF9hWzFdO1xuICAgICAgICB2YXIgYyA9IGNyYygpLCBzaXplID0gZmlsZS5sZW5ndGg7XG4gICAgICAgIGMucChmaWxlKTtcbiAgICAgICAgdmFyIGYgPSBzdHJUb1U4KGZuKSwgcyA9IGYubGVuZ3RoO1xuICAgICAgICB2YXIgY29tID0gcC5jb21tZW50LCBtID0gY29tICYmIHN0clRvVTgoY29tKSwgbXMgPSBtICYmIG0ubGVuZ3RoO1xuICAgICAgICB2YXIgZXhsID0gZXhmbChwLmV4dHJhKTtcbiAgICAgICAgdmFyIGNvbXByZXNzaW9uID0gcC5sZXZlbCA9PSAwID8gMCA6IDg7XG4gICAgICAgIHZhciBjYmwgPSBmdW5jdGlvbiAoZSwgZCkge1xuICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICB0QWxsKCk7XG4gICAgICAgICAgICAgICAgY2JkKGUsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSBkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmaWxlc1tpXSA9IG1yZyhwLCB7XG4gICAgICAgICAgICAgICAgICAgIHNpemU6IHNpemUsXG4gICAgICAgICAgICAgICAgICAgIGNyYzogYy5kKCksXG4gICAgICAgICAgICAgICAgICAgIGM6IGQsXG4gICAgICAgICAgICAgICAgICAgIGY6IGYsXG4gICAgICAgICAgICAgICAgICAgIG06IG0sXG4gICAgICAgICAgICAgICAgICAgIHU6IHMgIT0gZm4ubGVuZ3RoIHx8IChtICYmIChjb20ubGVuZ3RoICE9IG1zKSksXG4gICAgICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjb21wcmVzc2lvblxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG8gKz0gMzAgKyBzICsgZXhsICsgbDtcbiAgICAgICAgICAgICAgICB0b3QgKz0gNzYgKyAyICogKHMgKyBleGwpICsgKG1zIHx8IDApICsgbDtcbiAgICAgICAgICAgICAgICBpZiAoIS0tbGZ0KVxuICAgICAgICAgICAgICAgICAgICBjYmYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHMgPiA2NTUzNSlcbiAgICAgICAgICAgIGNibChlcnIoMTEsIDAsIDEpLCBudWxsKTtcbiAgICAgICAgaWYgKCFjb21wcmVzc2lvbilcbiAgICAgICAgICAgIGNibChudWxsLCBmaWxlKTtcbiAgICAgICAgZWxzZSBpZiAoc2l6ZSA8IDE2MDAwMCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjYmwobnVsbCwgZGVmbGF0ZVN5bmMoZmlsZSwgcCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBjYmwoZSwgbnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGVybS5wdXNoKGRlZmxhdGUoZmlsZSwgcCwgY2JsKSk7XG4gICAgfTtcbiAgICAvLyBDYW5ub3QgdXNlIGxmdCBiZWNhdXNlIGl0IGNhbiBkZWNyZWFzZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xmdDsgKytpKSB7XG4gICAgICAgIF9sb29wXzEoaSk7XG4gICAgfVxuICAgIHJldHVybiB0QWxsO1xufVxuLyoqXG4gKiBTeW5jaHJvbm91c2x5IGNyZWF0ZXMgYSBaSVAgZmlsZS4gUHJlZmVyIHVzaW5nIGB6aXBgIGZvciBiZXR0ZXIgcGVyZm9ybWFuY2VcbiAqIHdpdGggbW9yZSB0aGFuIG9uZSBmaWxlLlxuICogQHBhcmFtIGRhdGEgVGhlIGRpcmVjdG9yeSBzdHJ1Y3R1cmUgZm9yIHRoZSBaSVAgYXJjaGl2ZVxuICogQHBhcmFtIG9wdHMgVGhlIG1haW4gb3B0aW9ucywgbWVyZ2VkIHdpdGggcGVyLWZpbGUgb3B0aW9uc1xuICogQHJldHVybnMgVGhlIGdlbmVyYXRlZCBaSVAgYXJjaGl2ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gemlwU3luYyhkYXRhLCBvcHRzKSB7XG4gICAgaWYgKCFvcHRzKVxuICAgICAgICBvcHRzID0ge307XG4gICAgdmFyIHIgPSB7fTtcbiAgICB2YXIgZmlsZXMgPSBbXTtcbiAgICBmbHRuKGRhdGEsICcnLCByLCBvcHRzKTtcbiAgICB2YXIgbyA9IDA7XG4gICAgdmFyIHRvdCA9IDA7XG4gICAgZm9yICh2YXIgZm4gaW4gcikge1xuICAgICAgICB2YXIgX2EgPSByW2ZuXSwgZmlsZSA9IF9hWzBdLCBwID0gX2FbMV07XG4gICAgICAgIHZhciBjb21wcmVzc2lvbiA9IHAubGV2ZWwgPT0gMCA/IDAgOiA4O1xuICAgICAgICB2YXIgZiA9IHN0clRvVTgoZm4pLCBzID0gZi5sZW5ndGg7XG4gICAgICAgIHZhciBjb20gPSBwLmNvbW1lbnQsIG0gPSBjb20gJiYgc3RyVG9VOChjb20pLCBtcyA9IG0gJiYgbS5sZW5ndGg7XG4gICAgICAgIHZhciBleGwgPSBleGZsKHAuZXh0cmEpO1xuICAgICAgICBpZiAocyA+IDY1NTM1KVxuICAgICAgICAgICAgZXJyKDExKTtcbiAgICAgICAgdmFyIGQgPSBjb21wcmVzc2lvbiA/IGRlZmxhdGVTeW5jKGZpbGUsIHApIDogZmlsZSwgbCA9IGQubGVuZ3RoO1xuICAgICAgICB2YXIgYyA9IGNyYygpO1xuICAgICAgICBjLnAoZmlsZSk7XG4gICAgICAgIGZpbGVzLnB1c2gobXJnKHAsIHtcbiAgICAgICAgICAgIHNpemU6IGZpbGUubGVuZ3RoLFxuICAgICAgICAgICAgY3JjOiBjLmQoKSxcbiAgICAgICAgICAgIGM6IGQsXG4gICAgICAgICAgICBmOiBmLFxuICAgICAgICAgICAgbTogbSxcbiAgICAgICAgICAgIHU6IHMgIT0gZm4ubGVuZ3RoIHx8IChtICYmIChjb20ubGVuZ3RoICE9IG1zKSksXG4gICAgICAgICAgICBvOiBvLFxuICAgICAgICAgICAgY29tcHJlc3Npb246IGNvbXByZXNzaW9uXG4gICAgICAgIH0pKTtcbiAgICAgICAgbyArPSAzMCArIHMgKyBleGwgKyBsO1xuICAgICAgICB0b3QgKz0gNzYgKyAyICogKHMgKyBleGwpICsgKG1zIHx8IDApICsgbDtcbiAgICB9XG4gICAgdmFyIG91dCA9IG5ldyB1OCh0b3QgKyAyMiksIG9lID0gbywgY2RsID0gdG90IC0gbztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBmID0gZmlsZXNbaV07XG4gICAgICAgIHd6aChvdXQsIGYubywgZiwgZi5mLCBmLnUsIGYuYy5sZW5ndGgpO1xuICAgICAgICB2YXIgYmFkZCA9IDMwICsgZi5mLmxlbmd0aCArIGV4ZmwoZi5leHRyYSk7XG4gICAgICAgIG91dC5zZXQoZi5jLCBmLm8gKyBiYWRkKTtcbiAgICAgICAgd3poKG91dCwgbywgZiwgZi5mLCBmLnUsIGYuYy5sZW5ndGgsIGYubywgZi5tKSwgbyArPSAxNiArIGJhZGQgKyAoZi5tID8gZi5tLmxlbmd0aCA6IDApO1xuICAgIH1cbiAgICB3emYob3V0LCBvLCBmaWxlcy5sZW5ndGgsIGNkbCwgb2UpO1xuICAgIHJldHVybiBvdXQ7XG59XG4vKipcbiAqIFN0cmVhbWluZyBwYXNzLXRocm91Z2ggZGVjb21wcmVzc2lvbiBmb3IgWklQIGFyY2hpdmVzXG4gKi9cbnZhciBVbnppcFBhc3NUaHJvdWdoID0gLyojX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFVuemlwUGFzc1Rocm91Z2goKSB7XG4gICAgfVxuICAgIFVuemlwUGFzc1Rocm91Z2gucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgZmluYWwpIHtcbiAgICAgICAgdGhpcy5vbmRhdGEobnVsbCwgZGF0YSwgZmluYWwpO1xuICAgIH07XG4gICAgVW56aXBQYXNzVGhyb3VnaC5jb21wcmVzc2lvbiA9IDA7XG4gICAgcmV0dXJuIFVuemlwUGFzc1Rocm91Z2g7XG59KCkpO1xuZXhwb3J0IHsgVW56aXBQYXNzVGhyb3VnaCB9O1xuLyoqXG4gKiBTdHJlYW1pbmcgREVGTEFURSBkZWNvbXByZXNzaW9uIGZvciBaSVAgYXJjaGl2ZXMuIFByZWZlciBBc3luY1ppcEluZmxhdGUgZm9yXG4gKiBiZXR0ZXIgcGVyZm9ybWFuY2UuXG4gKi9cbnZhciBVbnppcEluZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERFRkxBVEUgZGVjb21wcmVzc2lvbiB0aGF0IGNhbiBiZSB1c2VkIGluIFpJUCBhcmNoaXZlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIFVuemlwSW5mbGF0ZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5pID0gbmV3IEluZmxhdGUoZnVuY3Rpb24gKGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgIF90aGlzLm9uZGF0YShudWxsLCBkYXQsIGZpbmFsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFVuemlwSW5mbGF0ZS5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uIChkYXRhLCBmaW5hbCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5pLnB1c2goZGF0YSwgZmluYWwpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICB0aGlzLm9uZGF0YShlLCBudWxsLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFVuemlwSW5mbGF0ZS5jb21wcmVzc2lvbiA9IDg7XG4gICAgcmV0dXJuIFVuemlwSW5mbGF0ZTtcbn0oKSk7XG5leHBvcnQgeyBVbnppcEluZmxhdGUgfTtcbi8qKlxuICogQXN5bmNocm9ub3VzIHN0cmVhbWluZyBERUZMQVRFIGRlY29tcHJlc3Npb24gZm9yIFpJUCBhcmNoaXZlc1xuICovXG52YXIgQXN5bmNVbnppcEluZmxhdGUgPSAvKiNfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIERFRkxBVEUgZGVjb21wcmVzc2lvbiB0aGF0IGNhbiBiZSB1c2VkIGluIFpJUCBhcmNoaXZlc1xuICAgICAqL1xuICAgIGZ1bmN0aW9uIEFzeW5jVW56aXBJbmZsYXRlKF8sIHN6KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChzeiA8IDMyMDAwMCkge1xuICAgICAgICAgICAgdGhpcy5pID0gbmV3IEluZmxhdGUoZnVuY3Rpb24gKGRhdCwgZmluYWwpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5vbmRhdGEobnVsbCwgZGF0LCBmaW5hbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaSA9IG5ldyBBc3luY0luZmxhdGUoZnVuY3Rpb24gKGVyciwgZGF0LCBmaW5hbCkge1xuICAgICAgICAgICAgICAgIF90aGlzLm9uZGF0YShlcnIsIGRhdCwgZmluYWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRlcm1pbmF0ZSA9IHRoaXMuaS50ZXJtaW5hdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQXN5bmNVbnppcEluZmxhdGUucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoZGF0YSwgZmluYWwpIHtcbiAgICAgICAgaWYgKHRoaXMuaS50ZXJtaW5hdGUpXG4gICAgICAgICAgICBkYXRhID0gc2xjKGRhdGEsIDApO1xuICAgICAgICB0aGlzLmkucHVzaChkYXRhLCBmaW5hbCk7XG4gICAgfTtcbiAgICBBc3luY1VuemlwSW5mbGF0ZS5jb21wcmVzc2lvbiA9IDg7XG4gICAgcmV0dXJuIEFzeW5jVW56aXBJbmZsYXRlO1xufSgpKTtcbmV4cG9ydCB7IEFzeW5jVW56aXBJbmZsYXRlIH07XG4vKipcbiAqIEEgWklQIGFyY2hpdmUgZGVjb21wcmVzc2lvbiBzdHJlYW0gdGhhdCBlbWl0cyBmaWxlcyBhcyB0aGV5IGFyZSBkaXNjb3ZlcmVkXG4gKi9cbnZhciBVbnppcCA9IC8qI19fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgWklQIGRlY29tcHJlc3Npb24gc3RyZWFtXG4gICAgICogQHBhcmFtIGNiIFRoZSBjYWxsYmFjayB0byBjYWxsIHdoZW5ldmVyIGEgZmlsZSBpbiB0aGUgWklQIGFyY2hpdmUgaXMgZm91bmRcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBVbnppcChjYikge1xuICAgICAgICB0aGlzLm9uZmlsZSA9IGNiO1xuICAgICAgICB0aGlzLmsgPSBbXTtcbiAgICAgICAgdGhpcy5vID0ge1xuICAgICAgICAgICAgMDogVW56aXBQYXNzVGhyb3VnaFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnAgPSBldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHVzaGVzIGEgY2h1bmsgdG8gYmUgdW56aXBwZWRcbiAgICAgKiBAcGFyYW0gY2h1bmsgVGhlIGNodW5rIHRvIHB1c2hcbiAgICAgKiBAcGFyYW0gZmluYWwgV2hldGhlciB0aGlzIGlzIHRoZSBsYXN0IGNodW5rXG4gICAgICovXG4gICAgVW56aXAucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiAoY2h1bmssIGZpbmFsKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICghdGhpcy5vbmZpbGUpXG4gICAgICAgICAgICBlcnIoNSk7XG4gICAgICAgIGlmICghdGhpcy5wKVxuICAgICAgICAgICAgZXJyKDQpO1xuICAgICAgICBpZiAodGhpcy5jID4gMCkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IE1hdGgubWluKHRoaXMuYywgY2h1bmsubGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciB0b0FkZCA9IGNodW5rLnN1YmFycmF5KDAsIGxlbik7XG4gICAgICAgICAgICB0aGlzLmMgLT0gbGVuO1xuICAgICAgICAgICAgaWYgKHRoaXMuZClcbiAgICAgICAgICAgICAgICB0aGlzLmQucHVzaCh0b0FkZCwgIXRoaXMuYyk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5rWzBdLnB1c2godG9BZGQpO1xuICAgICAgICAgICAgY2h1bmsgPSBjaHVuay5zdWJhcnJheShsZW4pO1xuICAgICAgICAgICAgaWYgKGNodW5rLmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGNodW5rLCBmaW5hbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZiA9IDAsIGkgPSAwLCBpcyA9IHZvaWQgMCwgYnVmID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnAubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGJ1ZiA9IGNodW5rO1xuICAgICAgICAgICAgZWxzZSBpZiAoIWNodW5rLmxlbmd0aClcbiAgICAgICAgICAgICAgICBidWYgPSB0aGlzLnA7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidWYgPSBuZXcgdTgodGhpcy5wLmxlbmd0aCArIGNodW5rLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnVmLnNldCh0aGlzLnApLCBidWYuc2V0KGNodW5rLCB0aGlzLnAubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsID0gYnVmLmxlbmd0aCwgb2MgPSB0aGlzLmMsIGFkZCA9IG9jICYmIHRoaXMuZDtcbiAgICAgICAgICAgIHZhciBfbG9vcF8yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICB2YXIgc2lnID0gYjQoYnVmLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoc2lnID09IDB4NDAzNEI1MCkge1xuICAgICAgICAgICAgICAgICAgICBmID0gMSwgaXMgPSBpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzXzEuZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNfMS5jID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJmID0gYjIoYnVmLCBpICsgNiksIGNtcF8xID0gYjIoYnVmLCBpICsgOCksIHUgPSBiZiAmIDIwNDgsIGRkID0gYmYgJiA4LCBmbmwgPSBiMihidWYsIGkgKyAyNiksIGVzID0gYjIoYnVmLCBpICsgMjgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobCA+IGkgKyAzMCArIGZubCArIGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hrc18zID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzXzEuay51bnNoaWZ0KGNoa3NfMyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmID0gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY18xID0gYjQoYnVmLCBpICsgMTgpLCBzdV8xID0gYjQoYnVmLCBpICsgMjIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZuXzEgPSBzdHJGcm9tVTgoYnVmLnN1YmFycmF5KGkgKyAzMCwgaSArPSAzMCArIGZubCksICF1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY18xID09IDQyOTQ5NjcyOTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYSA9IGRkID8gWy0yXSA6IHo2NGUoYnVmLCBpKSwgc2NfMSA9IF9hWzBdLCBzdV8xID0gX2FbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY18xID0gLTE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc18xLmMgPSBzY18xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWxlXzEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZm5fMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wcmVzc2lvbjogY21wXzEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWxlXzEub25kYXRhKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyKDUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNjXzEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlXzEub25kYXRhKG51bGwsIGV0LCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY3RyID0gX3RoaXMub1tjbXBfMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWN0cilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlXzEub25kYXRhKGVycigxNCwgJ3Vua25vd24gY29tcHJlc3Npb24gdHlwZSAnICsgY21wXzEsIDEpLCBudWxsLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEgPSBzY18xIDwgMCA/IG5ldyBjdHIoZm5fMSkgOiBuZXcgY3RyKGZuXzEsIHNjXzEsIHN1XzEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xLm9uZGF0YSA9IGZ1bmN0aW9uIChlcnIsIGRhdCwgZmluYWwpIHsgZmlsZV8xLm9uZGF0YShlcnIsIGRhdCwgZmluYWwpOyB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBjaGtzXzQgPSBjaGtzXzM7IF9pIDwgY2hrc180Lmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXQgPSBjaGtzXzRbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMS5wdXNoKGRhdCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLmtbMF0gPT0gY2hrc18zICYmIF90aGlzLmMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZCA9IGRfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEucHVzaChldCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZF8xICYmIGRfMS50ZXJtaW5hdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkXzEudGVybWluYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzY18xID49IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV8xLnNpemUgPSBzY18xLCBmaWxlXzEub3JpZ2luYWxTaXplID0gc3VfMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNfMS5vbmZpbGUoZmlsZV8xKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJicmVha1wiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2lnID09IDB4ODA3NEI1MCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXMgPSBpICs9IDEyICsgKG9jID09IC0yICYmIDgpLCBmID0gMywgdGhpc18xLmMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYnJlYWtcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzaWcgPT0gMHgyMDE0QjUwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpcyA9IGkgLT0gNCwgZiA9IDMsIHRoaXNfMS5jID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImJyZWFrXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XG4gICAgICAgICAgICBmb3IgKDsgaSA8IGwgLSA0OyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGVfMSA9IF9sb29wXzIoKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGVfMSA9PT0gXCJicmVha1wiKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucCA9IGV0O1xuICAgICAgICAgICAgaWYgKG9jIDwgMCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXQgPSBmID8gYnVmLnN1YmFycmF5KDAsIGlzIC0gMTIgLSAob2MgPT0gLTIgJiYgOCkgLSAoYjQoYnVmLCBpcyAtIDE2KSA9PSAweDgwNzRCNTAgJiYgNCkpIDogYnVmLnN1YmFycmF5KDAsIGkpO1xuICAgICAgICAgICAgICAgIGlmIChhZGQpXG4gICAgICAgICAgICAgICAgICAgIGFkZC5wdXNoKGRhdCwgISFmKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMua1srKGYgPT0gMildLnB1c2goZGF0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmICYgMilcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGJ1Zi5zdWJhcnJheShpKSwgZmluYWwpO1xuICAgICAgICAgICAgdGhpcy5wID0gYnVmLnN1YmFycmF5KGkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaW5hbCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYylcbiAgICAgICAgICAgICAgICBlcnIoMTMpO1xuICAgICAgICAgICAgdGhpcy5wID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgZGVjb2RlciB3aXRoIHRoZSBzdHJlYW0sIGFsbG93aW5nIGZvciBmaWxlcyBjb21wcmVzc2VkIHdpdGhcbiAgICAgKiB0aGUgY29tcHJlc3Npb24gdHlwZSBwcm92aWRlZCB0byBiZSBleHBhbmRlZCBjb3JyZWN0bHlcbiAgICAgKiBAcGFyYW0gZGVjb2RlciBUaGUgZGVjb2RlciBjb25zdHJ1Y3RvclxuICAgICAqL1xuICAgIFVuemlwLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChkZWNvZGVyKSB7XG4gICAgICAgIHRoaXMub1tkZWNvZGVyLmNvbXByZXNzaW9uXSA9IGRlY29kZXI7XG4gICAgfTtcbiAgICByZXR1cm4gVW56aXA7XG59KCkpO1xuZXhwb3J0IHsgVW56aXAgfTtcbnZhciBtdCA9IHR5cGVvZiBxdWV1ZU1pY3JvdGFzayA9PSAnZnVuY3Rpb24nID8gcXVldWVNaWNyb3Rhc2sgOiB0eXBlb2Ygc2V0VGltZW91dCA9PSAnZnVuY3Rpb24nID8gc2V0VGltZW91dCA6IGZ1bmN0aW9uIChmbikgeyBmbigpOyB9O1xuZXhwb3J0IGZ1bmN0aW9uIHVuemlwKGRhdGEsIG9wdHMsIGNiKSB7XG4gICAgaWYgKCFjYilcbiAgICAgICAgY2IgPSBvcHRzLCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBjYiAhPSAnZnVuY3Rpb24nKVxuICAgICAgICBlcnIoNyk7XG4gICAgdmFyIHRlcm0gPSBbXTtcbiAgICB2YXIgdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXJtLmxlbmd0aDsgKytpKVxuICAgICAgICAgICAgdGVybVtpXSgpO1xuICAgIH07XG4gICAgdmFyIGZpbGVzID0ge307XG4gICAgdmFyIGNiZCA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIG10KGZ1bmN0aW9uICgpIHsgY2IoYSwgYik7IH0pO1xuICAgIH07XG4gICAgbXQoZnVuY3Rpb24gKCkgeyBjYmQgPSBjYjsgfSk7XG4gICAgdmFyIGUgPSBkYXRhLmxlbmd0aCAtIDIyO1xuICAgIGZvciAoOyBiNChkYXRhLCBlKSAhPSAweDYwNTRCNTA7IC0tZSkge1xuICAgICAgICBpZiAoIWUgfHwgZGF0YS5sZW5ndGggLSBlID4gNjU1NTgpIHtcbiAgICAgICAgICAgIGNiZChlcnIoMTMsIDAsIDEpLCBudWxsKTtcbiAgICAgICAgICAgIHJldHVybiB0QWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIDtcbiAgICB2YXIgbGZ0ID0gYjIoZGF0YSwgZSArIDgpO1xuICAgIGlmIChsZnQpIHtcbiAgICAgICAgdmFyIGMgPSBsZnQ7XG4gICAgICAgIHZhciBvID0gYjQoZGF0YSwgZSArIDE2KTtcbiAgICAgICAgdmFyIHogPSBvID09IDQyOTQ5NjcyOTUgfHwgYyA9PSA2NTUzNTtcbiAgICAgICAgaWYgKHopIHtcbiAgICAgICAgICAgIHZhciB6ZSA9IGI0KGRhdGEsIGUgLSAxMik7XG4gICAgICAgICAgICB6ID0gYjQoZGF0YSwgemUpID09IDB4NjA2NEI1MDtcbiAgICAgICAgICAgIGlmICh6KSB7XG4gICAgICAgICAgICAgICAgYyA9IGxmdCA9IGI0KGRhdGEsIHplICsgMzIpO1xuICAgICAgICAgICAgICAgIG8gPSBiNChkYXRhLCB6ZSArIDQ4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZmx0ciA9IG9wdHMgJiYgb3B0cy5maWx0ZXI7XG4gICAgICAgIHZhciBfbG9vcF8zID0gZnVuY3Rpb24gKGkpIHtcbiAgICAgICAgICAgIHZhciBfYSA9IHpoKGRhdGEsIG8sIHopLCBjXzEgPSBfYVswXSwgc2MgPSBfYVsxXSwgc3UgPSBfYVsyXSwgZm4gPSBfYVszXSwgbm8gPSBfYVs0XSwgb2ZmID0gX2FbNV0sIGIgPSBzbHpoKGRhdGEsIG9mZik7XG4gICAgICAgICAgICBvID0gbm87XG4gICAgICAgICAgICB2YXIgY2JsID0gZnVuY3Rpb24gKGUsIGQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0QWxsKCk7XG4gICAgICAgICAgICAgICAgICAgIGNiZChlLCBudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkKVxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNbZm5dID0gZDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEtLWxmdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiZChudWxsLCBmaWxlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghZmx0ciB8fCBmbHRyKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBmbixcbiAgICAgICAgICAgICAgICBzaXplOiBzYyxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFNpemU6IHN1LFxuICAgICAgICAgICAgICAgIGNvbXByZXNzaW9uOiBjXzFcbiAgICAgICAgICAgIH0pKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjXzEpXG4gICAgICAgICAgICAgICAgICAgIGNibChudWxsLCBzbGMoZGF0YSwgYiwgYiArIHNjKSk7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY18xID09IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZmwgPSBkYXRhLnN1YmFycmF5KGIsIGIgKyBzYyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFN5bmNocm9ub3VzbHkgZGVjb21wcmVzcyB1bmRlciA1MTJLQiwgb3IgYmFyZWx5LWNvbXByZXNzZWQgZGF0YVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3UgPCA1MjQyODggfHwgc2MgPiAwLjggKiBzdSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYmwobnVsbCwgaW5mbGF0ZVN5bmMoaW5mbCwgeyBvdXQ6IG5ldyB1OChzdSkgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYmwoZSwgbnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGVybS5wdXNoKGluZmxhdGUoaW5mbCwgeyBzaXplOiBzdSB9LCBjYmwpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjYmwoZXJyKDE0LCAndW5rbm93biBjb21wcmVzc2lvbiB0eXBlICcgKyBjXzEsIDEpLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBjYmwobnVsbCwgbnVsbCk7XG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYzsgKytpKSB7XG4gICAgICAgICAgICBfbG9vcF8zKGkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICAgICAgY2JkKG51bGwsIHt9KTtcbiAgICByZXR1cm4gdEFsbDtcbn1cbi8qKlxuICogU3luY2hyb25vdXNseSBkZWNvbXByZXNzZXMgYSBaSVAgYXJjaGl2ZS4gUHJlZmVyIHVzaW5nIGB1bnppcGAgZm9yIGJldHRlclxuICogcGVyZm9ybWFuY2Ugd2l0aCBtb3JlIHRoYW4gb25lIGZpbGUuXG4gKiBAcGFyYW0gZGF0YSBUaGUgcmF3IGNvbXByZXNzZWQgWklQIGZpbGVcbiAqIEBwYXJhbSBvcHRzIFRoZSBaSVAgZXh0cmFjdGlvbiBvcHRpb25zXG4gKiBAcmV0dXJucyBUaGUgZGVjb21wcmVzc2VkIGZpbGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bnppcFN5bmMoZGF0YSwgb3B0cykge1xuICAgIHZhciBmaWxlcyA9IHt9O1xuICAgIHZhciBlID0gZGF0YS5sZW5ndGggLSAyMjtcbiAgICBmb3IgKDsgYjQoZGF0YSwgZSkgIT0gMHg2MDU0QjUwOyAtLWUpIHtcbiAgICAgICAgaWYgKCFlIHx8IGRhdGEubGVuZ3RoIC0gZSA+IDY1NTU4KVxuICAgICAgICAgICAgZXJyKDEzKTtcbiAgICB9XG4gICAgO1xuICAgIHZhciBjID0gYjIoZGF0YSwgZSArIDgpO1xuICAgIGlmICghYylcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIHZhciBvID0gYjQoZGF0YSwgZSArIDE2KTtcbiAgICB2YXIgeiA9IG8gPT0gNDI5NDk2NzI5NSB8fCBjID09IDY1NTM1O1xuICAgIGlmICh6KSB7XG4gICAgICAgIHZhciB6ZSA9IGI0KGRhdGEsIGUgLSAxMik7XG4gICAgICAgIHogPSBiNChkYXRhLCB6ZSkgPT0gMHg2MDY0QjUwO1xuICAgICAgICBpZiAoeikge1xuICAgICAgICAgICAgYyA9IGI0KGRhdGEsIHplICsgMzIpO1xuICAgICAgICAgICAgbyA9IGI0KGRhdGEsIHplICsgNDgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBmbHRyID0gb3B0cyAmJiBvcHRzLmZpbHRlcjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGM7ICsraSkge1xuICAgICAgICB2YXIgX2EgPSB6aChkYXRhLCBvLCB6KSwgY18yID0gX2FbMF0sIHNjID0gX2FbMV0sIHN1ID0gX2FbMl0sIGZuID0gX2FbM10sIG5vID0gX2FbNF0sIG9mZiA9IF9hWzVdLCBiID0gc2x6aChkYXRhLCBvZmYpO1xuICAgICAgICBvID0gbm87XG4gICAgICAgIGlmICghZmx0ciB8fCBmbHRyKHtcbiAgICAgICAgICAgIG5hbWU6IGZuLFxuICAgICAgICAgICAgc2l6ZTogc2MsXG4gICAgICAgICAgICBvcmlnaW5hbFNpemU6IHN1LFxuICAgICAgICAgICAgY29tcHJlc3Npb246IGNfMlxuICAgICAgICB9KSkge1xuICAgICAgICAgICAgaWYgKCFjXzIpXG4gICAgICAgICAgICAgICAgZmlsZXNbZm5dID0gc2xjKGRhdGEsIGIsIGIgKyBzYyk7XG4gICAgICAgICAgICBlbHNlIGlmIChjXzIgPT0gOClcbiAgICAgICAgICAgICAgICBmaWxlc1tmbl0gPSBpbmZsYXRlU3luYyhkYXRhLnN1YmFycmF5KGIsIGIgKyBzYyksIHsgb3V0OiBuZXcgdTgoc3UpIH0pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVycigxNCwgJ3Vua25vd24gY29tcHJlc3Npb24gdHlwZSAnICsgY18yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsZXM7XG59XG4iLCAiY29uc3QgZGVmYXVsdEVycm9yQ29uZmlnID0ge1xyXG4gICAgd2l0aFN0YWNrVHJhY2U6IGZhbHNlLFxyXG59O1xyXG4vLyBDdXN0b20gZXJyb3Igb2JqZWN0XHJcbi8vIENvbnRleHQgLyBkaXNjdXNzaW9uOiBodHRwczovL2dpdGh1Yi5jb20vc3VwZXJtYWNyby9uZXZlcnRocm93L3B1bGwvMjE1XHJcbmNvbnN0IGNyZWF0ZU5ldmVyVGhyb3dFcnJvciA9IChtZXNzYWdlLCByZXN1bHQsIGNvbmZpZyA9IGRlZmF1bHRFcnJvckNvbmZpZykgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHJlc3VsdC5pc09rKClcclxuICAgICAgICA/IHsgdHlwZTogJ09rJywgdmFsdWU6IHJlc3VsdC52YWx1ZSB9XHJcbiAgICAgICAgOiB7IHR5cGU6ICdFcnInLCB2YWx1ZTogcmVzdWx0LmVycm9yIH07XHJcbiAgICBjb25zdCBtYXliZVN0YWNrID0gY29uZmlnLndpdGhTdGFja1RyYWNlID8gbmV3IEVycm9yKCkuc3RhY2sgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBzdGFjazogbWF5YmVTdGFjayxcclxuICAgIH07XHJcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG5cclxuZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG50eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcblxuY2xhc3MgUmVzdWx0QXN5bmMge1xyXG4gICAgY29uc3RydWN0b3IocmVzKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHJlcztcclxuICAgIH1cclxuICAgIHN0YXRpYyBmcm9tU2FmZVByb21pc2UocHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb21pc2UgPSBwcm9taXNlLnRoZW4oKHZhbHVlKSA9PiBuZXcgT2sodmFsdWUpKTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG5ld1Byb21pc2UpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb21Qcm9taXNlKHByb21pc2UsIGVycm9yRm4pIHtcclxuICAgICAgICBjb25zdCBuZXdQcm9taXNlID0gcHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IG5ldyBPayh2YWx1ZSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gbmV3IEVycihlcnJvckZuKGUpKSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuZXdQcm9taXNlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBzdGF0aWMgZnJvbVRocm93YWJsZShmbiwgZXJyb3JGbikge1xyXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKCgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZm4oLi4uYXJncykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoZXJyb3JGbiA/IGVycm9yRm4oZXJyb3IpIDogZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSkoKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21iaW5lKGFzeW5jUmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0QXN5bmNMaXN0KGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29tYmluZVdpdGhBbGxFcnJvcnMoYXN5bmNSZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzKGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZihyZXMudmFsdWUpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgYW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3UmVzID0geWllbGQgZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3UmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKG5ld1Jlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRlZSBkb2VzIG5vdCBjYXJlIGFib3V0IHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgbWFwRXJyKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNPaygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoeWllbGQgZihyZXMuZXJyb3IpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWUgaW5zdGFuY2VvZiBSZXN1bHRBc3luYyA/IG5ld1ZhbHVlLl9wcm9taXNlIDogbmV3VmFsdWU7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIG9yRWxzZShmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBtYXRjaChvaywgX2Vycikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gcmVzLm1hdGNoKG9rLCBfZXJyKSk7XHJcbiAgICB9XHJcbiAgICB1bndyYXBPcih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiByZXMudW53cmFwT3IodCkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCB3aWxsIGJlIHJlbW92ZWQgaW4gOS4wLjAuXHJcbiAgICAgKlxyXG4gICAgICogWW91IGNhbiB1c2UgYHNhZmVUcnlgIHdpdGhvdXQgdGhpcyBtZXRob2QuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYGBgdHlwZXNjcmlwdFxyXG4gICAgICogc2FmZVRyeShhc3luYyBmdW5jdGlvbiogKCkge1xyXG4gICAgICogICBjb25zdCBva1ZhbHVlID0geWllbGQqIHlvdXJSZXN1bHRcclxuICAgICAqIH0pXHJcbiAgICAgKiBgYGBcclxuICAgICAqIEVtdWxhdGVzIFJ1c3QncyBgP2Agb3BlcmF0b3IgaW4gYHNhZmVUcnlgJ3MgYm9keS4gU2VlIGFsc28gYHNhZmVUcnlgLlxyXG4gICAgICovXHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24qIHNhZmVVbndyYXBfMSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9fYXdhaXQoeWllbGQgX19hd2FpdCh5aWVsZCogX19hc3luY0RlbGVnYXRvcihfX2FzeW5jVmFsdWVzKHlpZWxkIF9fYXdhaXQodGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHJlcy5zYWZlVW53cmFwKCkpKSkpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlcyBSZXN1bHRBc3luYyBpbXBsZW1lbnQgUHJvbWlzZUxpa2U8UmVzdWx0PlxyXG4gICAgdGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpIHtcclxuICAgICAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBfYSgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgX19hd2FpdCh0aGlzLl9wcm9taXNlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICAgICAgICAgIHlpZWxkIHlpZWxkIF9fYXdhaXQoZXJyQXN5bmMocmVzdWx0LmVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCBfX2F3YWl0KHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuY29uc3Qgb2tBc3luYyA9ICh2YWx1ZSkgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgT2sodmFsdWUpKSk7XHJcbmNvbnN0IGVyckFzeW5jID0gKGVycikgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgRXJyKGVycikpKTtcclxuY29uc3QgZnJvbVByb21pc2UgPSBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZTtcclxuY29uc3QgZnJvbVNhZmVQcm9taXNlID0gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlO1xyXG5jb25zdCBmcm9tQXN5bmNUaHJvd2FibGUgPSBSZXN1bHRBc3luYy5mcm9tVGhyb3dhYmxlO1xuXG4vKipcclxuICogU2hvcnQgY2lyY3VpdHMgb24gdGhlIEZJUlNUIEVyciB2YWx1ZSB0aGF0IHdlIGZpbmRcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRMaXN0ID0gKHJlc3VsdExpc3QpID0+IHtcclxuICAgIGxldCBhY2MgPSBvayhbXSk7XHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgIGFjYyA9IGVycihyZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFjYy5tYXAoKGxpc3QpID0+IGxpc3QucHVzaChyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG59O1xyXG4vKiBUaGlzIGlzIHRoZSB0eXBlc2FmZSB2ZXJzaW9uIG9mIFByb21pc2UuYWxsXHJcbiAqXHJcbiAqIFRha2VzIGEgbGlzdCBvZiBSZXN1bHRBc3luYzxULCBFPiBhbmQgc3VjY2VzcyBpZiBhbGwgaW5uZXIgcmVzdWx0cyBhcmUgT2sgdmFsdWVzXHJcbiAqIG9yIGZhaWxzIGlmIG9uZSAob3IgbW9yZSkgb2YgdGhlIGlubmVyIHJlc3VsdHMgYXJlIEVyciB2YWx1ZXNcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3QgPSAoYXN5bmNSZXN1bHRMaXN0KSA9PiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoUHJvbWlzZS5hbGwoYXN5bmNSZXN1bHRMaXN0KSkuYW5kVGhlbihjb21iaW5lUmVzdWx0TGlzdCk7XHJcbi8qKlxyXG4gKiBHaXZlIGEgbGlzdCBvZiBhbGwgdGhlIGVycm9ycyB3ZSBmaW5kXHJcbiAqL1xyXG5jb25zdCBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMgPSAocmVzdWx0TGlzdCkgPT4ge1xyXG4gICAgbGV0IGFjYyA9IG9rKFtdKTtcclxuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdExpc3QpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgYWNjLmVycm9yLnB1c2gocmVzdWx0LmVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzT2soKSkge1xyXG4gICAgICAgICAgICBhY2MgPSBlcnIoW3Jlc3VsdC5lcnJvcl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXN1bHQuaXNPaygpICYmIGFjYy5pc09rKCkpIHtcclxuICAgICAgICAgICAgYWNjLnZhbHVlLnB1c2gocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZG8gbm90aGluZyB3aGVuIHJlc3VsdC5pc09rKCkgJiYgYWNjLmlzRXJyKClcclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbn07XHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzID0gKGFzeW5jUmVzdWx0TGlzdCkgPT4gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlKFByb21pc2UuYWxsKGFzeW5jUmVzdWx0TGlzdCkpLmFuZFRoZW4oY29tYmluZVJlc3VsdExpc3RXaXRoQWxsRXJyb3JzKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcclxudmFyIFJlc3VsdDtcclxuKGZ1bmN0aW9uIChSZXN1bHQpIHtcclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgYSBmdW5jdGlvbiB3aXRoIGEgdHJ5IGNhdGNoLCBjcmVhdGluZyBhIG5ldyBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lXHJcbiAgICAgKiBhcmd1bWVudHMgYnV0IHJldHVybmluZyBgT2tgIGlmIHN1Y2Nlc3NmdWwsIGBFcnJgIGlmIHRoZSBmdW5jdGlvbiB0aHJvd3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24gdG8gd3JhcCB3aXRoIG9rIG9uIHN1Y2Nlc3Mgb3IgZXJyIG9uIGZhaWx1cmVcclxuICAgICAqIEBwYXJhbSBlcnJvckZuIHdoZW4gYW4gZXJyb3IgaXMgdGhyb3duLCB0aGlzIHdpbGwgd3JhcCB0aGUgZXJyb3IgcmVzdWx0IGlmIHByb3ZpZGVkXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBmdW5jdGlvbiBmcm9tVGhyb3dhYmxlKGZuLCBlcnJvckZuKSB7XHJcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbiguLi5hcmdzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvayhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyKGVycm9yRm4gPyBlcnJvckZuKGUpIDogZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmZyb21UaHJvd2FibGUgPSBmcm9tVGhyb3dhYmxlO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZShyZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRMaXN0KHJlc3VsdExpc3QpO1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmNvbWJpbmUgPSBjb21iaW5lO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZVdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuY29tYmluZVdpdGhBbGxFcnJvcnMgPSBjb21iaW5lV2l0aEFsbEVycm9ycztcclxufSkoUmVzdWx0IHx8IChSZXN1bHQgPSB7fSkpO1xyXG5jb25zdCBvayA9ICh2YWx1ZSkgPT4gbmV3IE9rKHZhbHVlKTtcclxuZnVuY3Rpb24gZXJyKGVycikge1xyXG4gICAgcmV0dXJuIG5ldyBFcnIoZXJyKTtcclxufVxyXG5mdW5jdGlvbiBzYWZlVHJ5KGJvZHkpIHtcclxuICAgIGNvbnN0IG4gPSBib2R5KCkubmV4dCgpO1xyXG4gICAgaWYgKG4gaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuLnRoZW4oKHIpID0+IHIudmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuLnZhbHVlO1xyXG59XHJcbmNsYXNzIE9rIHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaXNPaygpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlzRXJyKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc09rKCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBvayhmKHRoaXMudmFsdWUpKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcEVycihfZikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaGVuKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKS5tYXAoKF92YWx1ZSkgPT4gdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGYodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRlZSBkb2Vzbid0IGNhcmUgYWJvdXQgdGhlIGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBvckVsc2UoX2YpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhc3luY0FuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFzeW5jQW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSkubWFwKCgpID0+IHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgYXN5bmNNYXAoZikge1xyXG4gICAgICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoZih0aGlzLnZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICB1bndyYXBPcihfdikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWF0Y2gob2ssIF9lcnIpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS15aWVsZCAqL1xyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKF8pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXBFcnIoY29uZmlnKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yKCdDYWxsZWQgYF91bnNhZmVVbndyYXBFcnJgIG9uIGFuIE9rJywgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcywgcmVxdWlyZS15aWVsZFxyXG4gICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEVyciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgIH1cclxuICAgIGlzT2soKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNFcnIoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzT2soKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBtYXBFcnIoZikge1xyXG4gICAgICAgIHJldHVybiBlcnIoZih0aGlzLmVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUaHJvdWdoKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgb3JFbHNlKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jQW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFzeW5jQW5kVGhyb3VnaChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jTWFwKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgdW53cmFwT3Iodikge1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG4gICAgbWF0Y2goX29rLCBlcnIpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2FmZVVud3JhcCgpIHtcclxuICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuZXJyb3I7XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB5aWVsZCBlcnIoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgdGhpcyBnZW5lcmF0b3Igb3V0IG9mIGBzYWZlVHJ5YCcpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKGNvbmZpZykge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZU5ldmVyVGhyb3dFcnJvcignQ2FsbGVkIGBfdW5zYWZlVW53cmFwYCBvbiBhbiBFcnInLCB0aGlzLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcEVycihfKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3I7XHJcbiAgICB9XHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgeWllbGQgc2VsZjtcclxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxufVxyXG5jb25zdCBmcm9tVGhyb3dhYmxlID0gUmVzdWx0LmZyb21UaHJvd2FibGU7XHJcbi8vI2VuZHJlZ2lvblxuXG5leHBvcnQgeyBFcnIsIE9rLCBSZXN1bHQsIFJlc3VsdEFzeW5jLCBlcnIsIGVyckFzeW5jLCBmcm9tQXN5bmNUaHJvd2FibGUsIGZyb21Qcm9taXNlLCBmcm9tU2FmZVByb21pc2UsIGZyb21UaHJvd2FibGUsIG9rLCBva0FzeW5jLCBzYWZlVHJ5IH07XG4iLCAiaW1wb3J0IHsgQmFzZUVycm9yIH0gZnJvbSBcIn4vZXJyb3IvYmFzZS1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyRXJyb3IgZXh0ZW5kcyBCYXNlRXJyb3Ige31cbiIsICJpbXBvcnQgeyBXb3JrZXJFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3dvcmtlci93b3JrZXItZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIFdvcmtlclVuZGVmaW5lZFBhcmFtZXRlckVycm9yIGV4dGVuZHMgV29ya2VyRXJyb3Ige1xuICBvdmVycmlkZSBtZXNzYWdlID0gXCJQYXJhbWV0ZXIgbXVzdCBiZSBkZWZpbmVkXCI7XG59XG4iLCAiaW1wb3J0IHsgZXJyQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IENvbm5lY3Rpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Nvbm5lY3Rpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IFNlcnZlckVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivc2VydmVyLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFNlcnZlckNvbmZpZyB9IGZyb20gXCJ+L2ludGVyZmFjZS9zZXJ2ZXItY29uZmlnLnRzXCI7XG5cbi8qKlxuICogRW5zdXJlIGFuIGVycm9yIG1lc3NhZ2UgaXMgdHJhbnNmb3JtZWQgaW4gYW4gRXJyb3Igb2JqZWN0XG4gKlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZW5zdXJlRXJyb3IgPSAodmFsdWU6IHVua25vd24pOiBFcnJvciA9PiB7XG4gIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsdWU7XG5cbiAgbGV0IHN0cmluZ2lmaWVkID0gXCJbVW5hYmxlIHRvIHN0cmluZ2lmeSB0aGUgdGhyb3duIHZhbHVlXVwiO1xuICB0cnkge1xuICAgIHN0cmluZ2lmaWVkID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAvKiBlbXB0eSAqL1xuICB9XG5cbiAgcmV0dXJuIG5ldyBFcnJvcihzdHJpbmdpZmllZCk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIEx1ZmkncyBjb25maWcgZnJvbSBpdHMgQVBJXG4gKlxuICogQHBhcmFtIGluc3RhbmNlVXJsXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZmV0Y2hTZXJ2ZXJDb25maWcgPSAoXG4gIGluc3RhbmNlVXJsOiBVUkwsXG4pOiBSZXN1bHRBc3luYzxTZXJ2ZXJDb25maWcsIEVycm9yPiA9PiB7XG4gIGNvbnN0IG9yaWdpbk1hdGNoZXMgPSBpbnN0YW5jZVVybC5ocmVmLm1hdGNoKFxuICAgIC8oLio/KVxcLz8oPzpcXC9bZHJdezF9XFwvfGxvZ2luXFwvP3xmaWxlc1xcLz8pLyxcbiAgKTtcblxuICBjb25zdCB1cmxPcmlnaW4gPSBvcmlnaW5NYXRjaGVzICYmIG9yaWdpbk1hdGNoZXNbMV1cbiAgICA/IG9yaWdpbk1hdGNoZXNbMV1cbiAgICA6IGluc3RhbmNlVXJsLm9yaWdpbjtcblxuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgZmV0Y2godXJsT3JpZ2luICsgXCIvYWJvdXQvY29uZmlnXCIpLFxuICAgIChlcnJvcikgPT5cbiAgICAgIG5ldyBDb25uZWN0aW9uRXJyb3IodW5kZWZpbmVkLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgKS5hbmRUaGVuKChyZXNwb25zZSkgPT4ge1xuICAgIGlmIChyZXNwb25zZS5vaykge1xuICAgICAgcmV0dXJuIFJlc3VsdEFzeW5jLmZyb21Qcm9taXNlKFxuICAgICAgICByZXNwb25zZS5qc29uKCksXG4gICAgICAgIChlcnJvcikgPT4gZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGVyckFzeW5jKFxuICAgICAgICBuZXcgU2VydmVyRXJyb3IodW5kZWZpbmVkLCB7IGNvbnRleHQ6IHJlc3BvbnNlLnN0YXR1c1RleHQgfSksXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgaXNEZW5vUnVudGltZSA9ICgpOiBib29sZWFuID0+IHR5cGVvZiBEZW5vICE9PSBcInVuZGVmaW5lZFwiO1xuXG5leHBvcnQgY29uc3QgaXNTZWN1cmVDb250ZXh0ID0gKCk6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gaXNEZW5vUnVudGltZSgpIHx8IGdsb2JhbFRoaXMuaXNTZWN1cmVDb250ZXh0IHx8XG4gICAgZ2xvYmFsVGhpcy5sb2NhdGlvbi5wcm90b2NvbCA9PT0gXCJodHRwczpcIjtcbn07XG5cbmV4cG9ydCBjb25zdCB3b3JrZXJVcmwgPSAocmVsYXRpdmVQYXRoOiBzdHJpbmcpOiBVUkwgPT4ge1xuICByZXR1cm4gaXNEZW5vUnVudGltZSgpXG4gICAgPyBuZXcgVVJMKGAuL3dvcmtlci8ke3JlbGF0aXZlUGF0aH0udHNgLCBuZXcgVVJMKFwiLlwiLCBpbXBvcnQubWV0YS51cmwpLmhyZWYpXG4gICAgOiBuZXcgVVJMKFxuICAgICAgaW1wb3J0Lm1ldGEucmVzb2x2ZShcbiAgICAgICAgYC4vJHtcbiAgICAgICAgICByZWxhdGl2ZVBhdGggIT09IFwiZW5jcnlwdFwiID8gYHdvcmtlci8ke3JlbGF0aXZlUGF0aH1gIDogcmVsYXRpdmVQYXRoXG4gICAgICAgIH0uanNgLFxuICAgICAgKSxcbiAgICApO1xufTtcbiIsICJpbXBvcnQgeyBaaXBDb21wcmVzc2lvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvemlwL3ppcC1jb21wcmVzc2lvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgemlwIH0gZnJvbSBcImZmbGF0ZVwiO1xuaW1wb3J0IHsgZXJyQXN5bmMsIG9rQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IFdvcmtlclVuZGVmaW5lZFBhcmFtZXRlckVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd29ya2VyL3dvcmtlci11bmRlZmluZWQtcGFyYW1ldGVyLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBlbnN1cmVFcnJvciB9IGZyb20gXCJ+L3V0aWxzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckFjdGlvbk1lc3NhZ2UgfSBmcm9tIFwifi9pbnRlcmZhY2Uvd29ya2VyLWFjdGlvbi1tZXNzYWdlLnRzXCI7XG5pbXBvcnQgeyBFVkVOVCB9IGZyb20gXCJ+L2VudW0vZXZlbnQudHNcIjtcblxuZGVjbGFyZSBjb25zdCBzZWxmOiBXb3JrZXI7XG5cbnNlbGYub25tZXNzYWdlID0gKGV2ZW50OiBNZXNzYWdlRXZlbnQpID0+IHtcbiAgY29tcHJlc3MoZXZlbnQuZGF0YSkubWFwKChieXRlcykgPT4ge1xuICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudDogRVZFTlQuQVJDSElWRV9DUkVBVEVELCBidWZmZXI6IGJ5dGVzLmJ1ZmZlciB9LCBbXG4gICAgICBieXRlcy5idWZmZXIsXG4gICAgXSk7XG4gIH0pLm1hcEVycigoZXJyb3IpID0+IHtcbiAgICBzZWxmLnBvc3RNZXNzYWdlKHsgZXZlbnQ6IEVWRU5ULk9QRVJBVElPTl9GQUlMRUQsIGVycm9yIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IGNvbXByZXNzID0gKFxuICB3b3JrZXJNZXNzYWdlOiBXb3JrZXJBY3Rpb25NZXNzYWdlLFxuKTogUmVzdWx0QXN5bmM8VWludDhBcnJheSwgRXJyb3I+ID0+IHtcbiAgY29uc3QgeyBhcmNoaXZlIH0gPSB3b3JrZXJNZXNzYWdlLmFyZ3M7XG5cbiAgaWYgKGFyY2hpdmUpIHtcbiAgICBjb25zdCBwcm9taXNlWmlwID0gKCk6IFByb21pc2U8VWludDhBcnJheT4gPT5cbiAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgaWYgKGFyY2hpdmUuZW50cmllcykge1xuICAgICAgICAgIHppcChhcmNoaXZlLmVudHJpZXMsIChlcnJvciwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgICAgICByZXNvbHZlKGRhdGEpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlamVjdChcbiAgICAgICAgICAgIG5ldyBXb3JrZXJVbmRlZmluZWRQYXJhbWV0ZXJFcnJvcihcbiAgICAgICAgICAgICAgXCJhcmNoaXZlLmVudHJpZXMgbXVzdCBiZSBkZWZpbmVkXCIsXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgIHByb21pc2VaaXAoKSxcbiAgICAgIChlcnJvcikgPT4gZXJyb3IsXG4gICAgKS5hbmRUaGVuKChieXRlcykgPT4gb2tBc3luYyhieXRlcykpLm9yRWxzZSgoZXJyb3IpID0+XG4gICAgICBlcnJBc3luYyhcbiAgICAgICAgbmV3IFppcENvbXByZXNzaW9uRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICAgICApXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICBuZXcgV29ya2VyVW5kZWZpbmVkUGFyYW1ldGVyRXJyb3IoXCJhcmNoaXZlIG11c3QgYmUgZGVmaW5lZFwiKSxcbiAgICApO1xuICB9XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7QUFVTyxJQUFNLFlBQU4sY0FBd0IsTUFBTTtBQUFBLEVBR25DLFlBQ0UsU0FDQSxVQUFpRCxDQUFDLEdBQ2xEO0FBQ0EsVUFBTSxFQUFFLE9BQU8sUUFBUSxJQUFJO0FBRTNCLFVBQU0s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LFVBQU1BO0FBRU4sV0FBT0E7QUFBQSxFQUNYO0FBQ0o7QUFDQSxJQUFNLGdCQUFnQixPQUFPOzs7QUMzY3RCLElBQU0sY0FBTixjQUEwQixVQUFVO0FBQUM7OztBQ0FyQyxJQUFNLGdDQUFOLGNBQTRDLFlBQVk7QUFBQSxFQUF4RDtBQUFBO0FBQ0wsd0JBQVMsV0FBVTtBQUFBO0FBQ3JCOzs7QUNPTyxJQUFNLGNBQWMsQ0FBQyxVQUEwQjtBQUNwRCxNQUFJLGlCQUFpQixNQUFPLFFBQU87QUFFbkMsTUFBSSxjQUFjO0FBQ2xCLE1BQUk7QUFDRixrQkFBYyxLQUFLLFVBQVUsS0FBSztBQUFBLEVBQ3BDLFNBQVMsUUFBUTtBQUFBLEVBRWpCO0FBRUEsU0FBTyxJQUFJLE1BQU0sV0FBVztBQUM5Qjs7O0FDWkEsS0FBSyxZQUFZLENBQUMsVUFBd0I7QUFDeEMsV0FBUyxNQUFNLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVTtBQUNsQyxTQUFLLFlBQVksRUFBRSxnREFBOEIsUUFBUSxNQUFNLE9BQU8sR0FBRztBQUFBLE1BQ3ZFLE1BQU07QUFBQSxJQUNSLENBQUM7QUFBQSxFQUNILENBQUMsRUFBRSxPQUFPLENBQUMsVUFBVTtBQUNuQixTQUFLLFlBQVksRUFBRSxrREFBK0IsTUFBTSxDQUFDO0FBQUEsRUFDM0QsQ0FBQztBQUNIO0FBRUEsSUFBTSxXQUFXLENBQ2Ysa0JBQ21DO0FBQ25DLFFBQU0sRUFBRSxRQUFRLElBQUksY0FBYztBQUVsQyxNQUFJLFNBQVM7QUFDWCxVQUFNLGFBQWEsTUFDakIsSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQy9CLFVBQUksUUFBUSxTQUFTO0FBQ25CLFlBQUksUUFBUSxTQUFTLENBQUMsT0FBTyxTQUFTO0FBQ3BDLGNBQUksTUFBTyxRQUFPLEtBQUs7QUFFdkIsa0JBQVEsSUFBSTtBQUFBLFFBQ2QsQ0FBQztBQUFBLE1BQ0gsT0FBTztBQUNMO0FBQUEsVUFDRSxJQUFJO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUNILFdBQU8sWUFBWTtBQUFBLE1BQ2pCLFdBQVc7QUFBQSxNQUNYLENBQUMsVUFBVTtBQUFBLElBQ2IsRUFBRSxRQUFRLENBQUMsVUFBVSxRQUFRLEtBQUssQ0FBQyxFQUFFO0FBQUEsTUFBTyxDQUFDLFVBQzNDO0FBQUEsUUFDRSxJQUFJLG9CQUFvQixRQUFXLEVBQUUsT0FBTyxZQUFZLEtBQUssRUFBRSxDQUFDO0FBQUEsTUFDbEU7QUFBQSxJQUNGO0FBQUEsRUFDRixPQUFPO0FBQ0wsV0FBTztBQUFBLE1BQ0wsSUFBSSw4QkFBOEIseUJBQXlCO0FBQUEsSUFDN0Q7QUFBQSxFQUNGO0FBQ0Y7IiwKICAibmFtZXMiOiBbImVyciIsICJfYSIsICJfYiIsICJpIiwgInRkIiwgImVyciIsICJkYXQiLCAiZmwiLCAiaSIsICJfYSIsICJ2IiwgIm9rIiwgIl9hIiwgImVyciIsICJSZXN1bHQiLCAiZnJvbVRocm93YWJsZSIsICJvayIsICJlcnIiLCAic2VsZiJdCn0K
