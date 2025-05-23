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

// node_modules/.deno/arraybuffer-encoding@1.1.0/node_modules/arraybuffer-encoding/dist/esm/base64/url.js
var obj2 = new Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", true);
function Decode(str) {
  return obj2.Decode(str);
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

// src/api/crypto/sjcl.ts
var import_lufi_sjcl = __toESM(require_sjcl());

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

// src/error/crypto/crypto-error.ts
var CryptoError = class extends BaseError {
};

// src/error/crypto/encryption-error.ts
var EncryptionError = class extends CryptoError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "Unable to encrypt the provided data");
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

// src/api/crypto/sjcl.ts
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
      Decode(key),
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
var encrypt3 = (key, value, algo) => algo === 0 /* Sjcl */ ? encrypt(key, value) : encrypt2(key, value);

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

// src/error/worker/worker-undefined-parameter-error.ts
var WorkerUndefinedParameterError = class extends WorkerError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "Parameter must be defined");
  }
};

// src/error/worker/worker-upload-already-failed-error.ts
var WorkerUploadAlreadyFailedError = class extends WorkerError {
  constructor() {
    super(...arguments);
    __publicField(this, "message", "File upload already failed");
  }
};

// src/worker/encrypt.ts
var isInitiated = false;
self.onmessage = (event) => {
  if (!isInitiated) {
    init();
    isInitiated = true;
  }
  const { lufiFile, chunk, algo } = event.data.args;
  if (chunk && typeof algo !== "undefined") {
    if (lufiFile.uploadStatus !== 2 /* FAILED */) {
      encrypt3(lufiFile.keys.client, chunk.buffer, algo).map((encryptedData) => {
        self.postMessage({ encryptedData, chunkIndex: chunk.index }, [
          typeof encryptedData.data === "string" ? new TextEncoder().encode(encryptedData.data).buffer : encryptedData.data
        ]);
      }).mapErr((error) => {
        self.postMessage({ error });
      });
    } else {
      self.postMessage({
        error: new WorkerUploadAlreadyFailedError("File upload already failed")
      });
    }
  } else {
    if (!chunk) {
      self.postMessage({
        error: new WorkerUndefinedParameterError(
          "chunk buffer must be defined"
        )
      });
    }
    if (typeof algo === "undefined") {
      self.postMessage({
        error: new WorkerUndefinedParameterError("algo must be defined")
      });
    }
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2x1Zmktc2pjbEAxLjAuOC9ub2RlX21vZHVsZXMvbHVmaS1zamNsL3NqY2wuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2V2ZW50c0AzLjMuMC9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvLmRlbm8vYXJyYXlidWZmZXItZW5jb2RpbmdAMS4xLjAvbm9kZV9tb2R1bGVzL2FycmF5YnVmZmVyLWVuY29kaW5nL3NyYy9iYXNlNjQvZW5jb2RpbmcudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL2FycmF5YnVmZmVyLWVuY29kaW5nQDEuMS4wL25vZGVfbW9kdWxlcy9hcnJheWJ1ZmZlci1lbmNvZGluZy9zcmMvYmFzZTY0L3N0YW5kYXJkLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy8uZGVuby9hcnJheWJ1ZmZlci1lbmNvZGluZ0AxLjEuMC9ub2RlX21vZHVsZXMvYXJyYXlidWZmZXItZW5jb2Rpbmcvc3JjL2Jhc2U2NC91cmwudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzLy5kZW5vL25ldmVydGhyb3dAOC4xLjEvbm9kZV9tb2R1bGVzL25ldmVydGhyb3cvZGlzdC9pbmRleC5lcy5qcyIsICIuLi8uLi9zcmMvYXBpL2NyeXB0by9zamNsLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9iYXNlLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci9jcnlwdG8vZW5jcnlwdGlvbi1lcnJvci50cyIsICIuLi8uLi9zcmMvdXRpbHMudHMiLCAiLi4vLi4vc3JjL2FwaS9jcnlwdG8vd2ViLnRzIiwgIi4uLy4uL3NyYy9hcGkvY3J5cHRvLnRzIiwgIi4uLy4uL3NyYy93b3JrZXIvc2hhcmVkLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93b3JrZXIvd29ya2VyLWVycm9yLnRzIiwgIi4uLy4uL3NyYy9lcnJvci93b3JrZXIvd29ya2VyLXVuZGVmaW5lZC1wYXJhbWV0ZXItZXJyb3IudHMiLCAiLi4vLi4vc3JjL2Vycm9yL3dvcmtlci93b3JrZXItdXBsb2FkLWFscmVhZHktZmFpbGVkLWVycm9yLnRzIiwgIi4uLy4uL3NyYy93b3JrZXIvZW5jcnlwdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiXCJ1c2Ugc3RyaWN0XCI7dmFyIHNqY2w9e2NpcGhlcjp7fSxoYXNoOnt9LGtleWV4Y2hhbmdlOnt9LG1vZGU6e30sbWlzYzp7fSxjb2RlYzp7fSxleGNlcHRpb246e2NvcnJ1cHQ6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiQ09SUlVQVDogXCIrdGhpcy5tZXNzYWdlfTt0aGlzLm1lc3NhZ2U9YX0saW52YWxpZDpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJJTlZBTElEOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfSxidWc6ZnVuY3Rpb24oYSl7dGhpcy50b1N0cmluZz1mdW5jdGlvbigpe3JldHVyblwiQlVHOiBcIit0aGlzLm1lc3NhZ2V9O3RoaXMubWVzc2FnZT1hfSxub3RSZWFkeTpmdW5jdGlvbihhKXt0aGlzLnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuXCJOT1QgUkVBRFk6IFwiK3RoaXMubWVzc2FnZX07dGhpcy5tZXNzYWdlPWF9fX07XG5zamNsLmNpcGhlci5hZXM9ZnVuY3Rpb24oYSl7dGhpcy53WzBdWzBdWzBdfHx0aGlzLkMoKTt2YXIgYixjLGQsZSxmPXRoaXMud1swXVs0XSxnPXRoaXMud1sxXTtiPWEubGVuZ3RoO3ZhciBoPTE7aWYoNCE9PWImJjYhPT1iJiY4IT09Yil0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImludmFsaWQgYWVzIGtleSBzaXplXCIpO3RoaXMuYj1bZD1hLnNsaWNlKDApLGU9W11dO2ZvcihhPWI7YTw0KmIrMjg7YSsrKXtjPWRbYS0xXTtpZigwPT09YSVifHw4PT09YiYmND09PWElYiljPWZbYz4+PjI0XTw8MjReZltjPj4xNiYyNTVdPDwxNl5mW2M+PjgmMjU1XTw8OF5mW2MmMjU1XSwwPT09YSViJiYoYz1jPDw4XmM+Pj4yNF5oPDwyNCxoPWg8PDFeMjgzKihoPj43KSk7ZFthXT1kW2EtYl1eY31mb3IoYj0wO2E7YisrLGEtLSljPWRbYiYzP2E6YS00XSxlW2JdPTQ+PWF8fDQ+Yj9jOmdbMF1bZltjPj4+MjRdXV5nWzFdW2ZbYz4+MTYmMjU1XV1eZ1syXVtmW2M+PjgmMjU1XV1eZ1szXVtmW2MmXG4yNTVdXX07XG5zamNsLmNpcGhlci5hZXMucHJvdG90eXBlPXtlbmNyeXB0OmZ1bmN0aW9uKGEpe3JldHVybiBhYSh0aGlzLGEsMCl9LGRlY3J5cHQ6ZnVuY3Rpb24oYSl7cmV0dXJuIGFhKHRoaXMsYSwxKX0sdzpbW1tdLFtdLFtdLFtdLFtdXSxbW10sW10sW10sW10sW11dXSxDOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy53WzBdLGI9dGhpcy53WzFdLGM9YVs0XSxkPWJbNF0sZSxmLGcsaD1bXSxrPVtdLG4sbCxtLHA7Zm9yKGU9MDsweDEwMD5lO2UrKylrWyhoW2VdPWU8PDFeMjgzKihlPj43KSleZV09ZTtmb3IoZj1nPTA7IWNbZl07Zl49bnx8MSxnPWtbZ118fDEpZm9yKG09Z15nPDwxXmc8PDJeZzw8M15nPDw0LG09bT4+OF5tJjI1NV45OSxjW2ZdPW0sZFttXT1mLGw9aFtlPWhbbj1oW2ZdXV0scD0weDEwMTAxMDEqbF4weDEwMDAxKmVeMHgxMDEqbl4weDEwMTAxMDAqZixsPTB4MTAxKmhbbV1eMHgxMDEwMTAwKm0sZT0wOzQ+ZTtlKyspYVtlXVtmXT1sPWw8PDI0Xmw+Pj44LGJbZV1bbV09cD1wPDwyNF5wPj4+ODtmb3IoZT1cbjA7NT5lO2UrKylhW2VdPWFbZV0uc2xpY2UoMCksYltlXT1iW2VdLnNsaWNlKDApfX07XG5mdW5jdGlvbiBhYShhLGIsYyl7aWYoNCE9PWIubGVuZ3RoKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiaW52YWxpZCBhZXMgYmxvY2sgc2l6ZVwiKTt2YXIgZD1hLmJbY10sZT1iWzBdXmRbMF0sZj1iW2M/MzoxXV5kWzFdLGc9YlsyXV5kWzJdO2I9YltjPzE6M11eZFszXTt2YXIgaCxrLG4sbD1kLmxlbmd0aC80LTIsbSxwPTQsej1bMCwwLDAsMF07aD1hLndbY107YT1oWzBdO3ZhciBBPWhbMV0sQz1oWzJdLEI9aFszXSxEPWhbNF07Zm9yKG09MDttPGw7bSsrKWg9YVtlPj4+MjRdXkFbZj4+MTYmMjU1XV5DW2c+PjgmMjU1XV5CW2ImMjU1XV5kW3BdLGs9YVtmPj4+MjRdXkFbZz4+MTYmMjU1XV5DW2I+PjgmMjU1XV5CW2UmMjU1XV5kW3ArMV0sbj1hW2c+Pj4yNF1eQVtiPj4xNiYyNTVdXkNbZT4+OCYyNTVdXkJbZiYyNTVdXmRbcCsyXSxiPWFbYj4+PjI0XV5BW2U+PjE2JjI1NV1eQ1tmPj44JjI1NV1eQltnJjI1NV1eZFtwKzNdLHArPTQsZT1oLGY9ayxnPW47Zm9yKG09XG4wOzQ+bTttKyspeltjPzMmLW06bV09RFtlPj4+MjRdPDwyNF5EW2Y+PjE2JjI1NV08PDE2XkRbZz4+OCYyNTVdPDw4XkRbYiYyNTVdXmRbcCsrXSxoPWUsZT1mLGY9ZyxnPWIsYj1oO3JldHVybiB6fVxuc2pjbC5iaXRBcnJheT17Yml0U2xpY2U6ZnVuY3Rpb24oYSxiLGMpe2E9c2pjbC5iaXRBcnJheS5ZKGEuc2xpY2UoYi8zMiksMzItKGImMzEpKS5zbGljZSgxKTtyZXR1cm4gdm9pZCAwPT09Yz9hOnNqY2wuYml0QXJyYXkuY2xhbXAoYSxjLWIpfSxleHRyYWN0OmZ1bmN0aW9uKGEsYixjKXt2YXIgZD1NYXRoLmZsb29yKC1iLWMmMzEpO3JldHVybigoYitjLTFeYikmLTMyP2FbYi8zMnwwXTw8MzItZF5hW2IvMzIrMXwwXT4+PmQ6YVtiLzMyfDBdPj4+ZCkmKDE8PGMpLTF9LGNvbmNhdDpmdW5jdGlvbihhLGIpe2lmKDA9PT1hLmxlbmd0aHx8MD09PWIubGVuZ3RoKXJldHVybiBhLmNvbmNhdChiKTt2YXIgYz1hW2EubGVuZ3RoLTFdLGQ9c2pjbC5iaXRBcnJheS5nZXRQYXJ0aWFsKGMpO3JldHVybiAzMj09PWQ/YS5jb25jYXQoYik6c2pjbC5iaXRBcnJheS5ZKGIsZCxjfDAsYS5zbGljZSgwLGEubGVuZ3RoLTEpKX0sYml0TGVuZ3RoOmZ1bmN0aW9uKGEpe3ZhciBiPWEubGVuZ3RoO3JldHVybiAwPT09XG5iPzA6MzIqKGItMSkrc2pjbC5iaXRBcnJheS5nZXRQYXJ0aWFsKGFbYi0xXSl9LGNsYW1wOmZ1bmN0aW9uKGEsYil7aWYoMzIqYS5sZW5ndGg8YilyZXR1cm4gYTthPWEuc2xpY2UoMCxNYXRoLmNlaWwoYi8zMikpO3ZhciBjPWEubGVuZ3RoO2I9YiYzMTswPGMmJmImJihhW2MtMV09c2pjbC5iaXRBcnJheS5wYXJ0aWFsKGIsYVtjLTFdJjIxNDc0ODM2NDg+PmItMSwxKSk7cmV0dXJuIGF9LHBhcnRpYWw6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiAzMj09PWE/YjooYz9ifDA6Yjw8MzItYSkrMHgxMDAwMDAwMDAwMCphfSxnZXRQYXJ0aWFsOmZ1bmN0aW9uKGEpe3JldHVybiBNYXRoLnJvdW5kKGEvMHgxMDAwMDAwMDAwMCl8fDMyfSxlcXVhbDpmdW5jdGlvbihhLGIpe2lmKHNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpIT09c2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYikpcmV0dXJuITE7dmFyIGM9MCxkO2ZvcihkPTA7ZDxhLmxlbmd0aDtkKyspY3w9YVtkXV5iW2RdO3JldHVybiAwPT09XG5jfSxZOmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlO2U9MDtmb3Iodm9pZCAwPT09ZCYmKGQ9W10pOzMyPD1iO2ItPTMyKWQucHVzaChjKSxjPTA7aWYoMD09PWIpcmV0dXJuIGQuY29uY2F0KGEpO2ZvcihlPTA7ZTxhLmxlbmd0aDtlKyspZC5wdXNoKGN8YVtlXT4+PmIpLGM9YVtlXTw8MzItYjtlPWEubGVuZ3RoP2FbYS5sZW5ndGgtMV06MDthPXNqY2wuYml0QXJyYXkuZ2V0UGFydGlhbChlKTtkLnB1c2goc2pjbC5iaXRBcnJheS5wYXJ0aWFsKGIrYSYzMSwzMjxiK2E/YzpkLnBvcCgpLDEpKTtyZXR1cm4gZH0sUDpmdW5jdGlvbihhLGIpe3JldHVyblthWzBdXmJbMF0sYVsxXV5iWzFdLGFbMl1eYlsyXSxhWzNdXmJbM11dfSxieXRlc3dhcE06ZnVuY3Rpb24oYSl7dmFyIGIsYztmb3IoYj0wO2I8YS5sZW5ndGg7KytiKWM9YVtiXSxhW2JdPWM+Pj4yNHxjPj4+OCYweGZmMDB8KGMmMHhmZjAwKTw8OHxjPDwyNDtyZXR1cm4gYX19O1xuc2pjbC5jb2RlYy51dGY4U3RyaW5nPXtmcm9tQml0czpmdW5jdGlvbihhKXt2YXIgYj1cIlwiLGM9c2pjbC5iaXRBcnJheS5iaXRMZW5ndGgoYSksZCxlO2ZvcihkPTA7ZDxjLzg7ZCsrKTA9PT0oZCYzKSYmKGU9YVtkLzRdKSxiKz1TdHJpbmcuZnJvbUNoYXJDb2RlKGU+Pj44Pj4+OD4+PjgpLGU8PD04O3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGIpKX0sdG9CaXRzOmZ1bmN0aW9uKGEpe2E9dW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KGEpKTt2YXIgYj1bXSxjLGQ9MDtmb3IoYz0wO2M8YS5sZW5ndGg7YysrKWQ9ZDw8OHxhLmNoYXJDb2RlQXQoYyksMz09PShjJjMpJiYoYi5wdXNoKGQpLGQ9MCk7YyYzJiZiLnB1c2goc2pjbC5iaXRBcnJheS5wYXJ0aWFsKDgqKGMmMyksZCkpO3JldHVybiBifX07XG5zamNsLmNvZGVjLmhleD17ZnJvbUJpdHM6ZnVuY3Rpb24oYSl7dmFyIGI9XCJcIixjO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspYis9KChhW2NdfDApKzB4ZjAwMDAwMDAwMDAwKS50b1N0cmluZygxNikuc3Vic3RyKDQpO3JldHVybiBiLnN1YnN0cigwLHNqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpLzQpfSx0b0JpdHM6ZnVuY3Rpb24oYSl7dmFyIGIsYz1bXSxkO2E9YS5yZXBsYWNlKC9cXHN8MHgvZyxcIlwiKTtkPWEubGVuZ3RoO2E9YStcIjAwMDAwMDAwXCI7Zm9yKGI9MDtiPGEubGVuZ3RoO2IrPTgpYy5wdXNoKHBhcnNlSW50KGEuc3Vic3RyKGIsOCksMTYpXjApO3JldHVybiBzamNsLmJpdEFycmF5LmNsYW1wKGMsNCpkKX19O1xuc2pjbC5jb2RlYy5iYXNlNjQ9e1M6XCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCIsZnJvbUJpdHM6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPVwiXCIsZT0wLGY9c2pjbC5jb2RlYy5iYXNlNjQuUyxnPTAsaD1zamNsLmJpdEFycmF5LmJpdExlbmd0aChhKTtjJiYoZj1mLnN1YnN0cigwLDYyKStcIi1fXCIpO2ZvcihjPTA7NipkLmxlbmd0aDxoOylkKz1mLmNoYXJBdCgoZ15hW2NdPj4+ZSk+Pj4yNiksNj5lPyhnPWFbY108PDYtZSxlKz0yNixjKyspOihnPDw9NixlLT02KTtmb3IoO2QubGVuZ3RoJjMmJiFiOylkKz1cIj1cIjtyZXR1cm4gZH0sdG9CaXRzOmZ1bmN0aW9uKGEsYil7YT1hLnJlcGxhY2UoL1xcc3w9L2csXCJcIik7dmFyIGM9W10sZCxlPTAsZj1zamNsLmNvZGVjLmJhc2U2NC5TLGc9MCxoO2ImJihmPWYuc3Vic3RyKDAsNjIpK1wiLV9cIik7Zm9yKGQ9MDtkPGEubGVuZ3RoO2QrKyl7aD1mLmluZGV4T2YoYS5jaGFyQXQoZCkpO1xuaWYoMD5oKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwidGhpcyBpc24ndCBiYXNlNjQhXCIpOzI2PGU/KGUtPTI2LGMucHVzaChnXmg+Pj5lKSxnPWg8PDMyLWUpOihlKz02LGdePWg8PDMyLWUpfWUmNTYmJmMucHVzaChzamNsLmJpdEFycmF5LnBhcnRpYWwoZSY1NixnLDEpKTtyZXR1cm4gY319O3NqY2wuY29kZWMuYmFzZTY0dXJsPXtmcm9tQml0czpmdW5jdGlvbihhKXtyZXR1cm4gc2pjbC5jb2RlYy5iYXNlNjQuZnJvbUJpdHMoYSwxLDEpfSx0b0JpdHM6ZnVuY3Rpb24oYSl7cmV0dXJuIHNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhhLDEpfX07c2pjbC5oYXNoLnNoYTI1Nj1mdW5jdGlvbihhKXt0aGlzLmJbMF18fHRoaXMuQygpO2E/KHRoaXMuZz1hLmcuc2xpY2UoMCksdGhpcy5mPWEuZi5zbGljZSgwKSx0aGlzLmM9YS5jKTp0aGlzLnJlc2V0KCl9O3NqY2wuaGFzaC5zaGEyNTYuaGFzaD1mdW5jdGlvbihhKXtyZXR1cm4obmV3IHNqY2wuaGFzaC5zaGEyNTYpLnVwZGF0ZShhKS5maW5hbGl6ZSgpfTtcbnNqY2wuaGFzaC5zaGEyNTYucHJvdG90eXBlPXtibG9ja1NpemU6NTEyLHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5nPXRoaXMuby5zbGljZSgwKTt0aGlzLmY9W107dGhpcy5jPTA7cmV0dXJuIHRoaXN9LHVwZGF0ZTpmdW5jdGlvbihhKXtcInN0cmluZ1wiPT09dHlwZW9mIGEmJihhPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYSkpO3ZhciBiLGM9dGhpcy5mPXNqY2wuYml0QXJyYXkuY29uY2F0KHRoaXMuZixhKTtiPXRoaXMuYzthPXRoaXMuYz1iK3NqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpO2lmKDB4MWZmZmZmZmZmZmZmZmY8YSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcIkNhbm5vdCBoYXNoIG1vcmUgdGhhbiAyXjUzIC0gMSBiaXRzXCIpO2lmKFwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe3ZhciBkPW5ldyBVaW50MzJBcnJheShjKSxlPTA7Zm9yKGI9NTEyK2ItKDUxMitiJjB4MWZmKTtiPD1hO2IrPTUxMil0aGlzLmwoZC5zdWJhcnJheSgxNiplLFxuMTYqKGUrMSkpKSxlKz0xO2Muc3BsaWNlKDAsMTYqZSl9ZWxzZSBmb3IoYj01MTIrYi0oNTEyK2ImMHgxZmYpO2I8PWE7Yis9NTEyKXRoaXMubChjLnNwbGljZSgwLDE2KSk7cmV0dXJuIHRoaXN9LGZpbmFsaXplOmZ1bmN0aW9uKCl7dmFyIGEsYj10aGlzLmYsYz10aGlzLmcsYj1zamNsLmJpdEFycmF5LmNvbmNhdChiLFtzamNsLmJpdEFycmF5LnBhcnRpYWwoMSwxKV0pO2ZvcihhPWIubGVuZ3RoKzI7YSYxNTthKyspYi5wdXNoKDApO2IucHVzaChNYXRoLmZsb29yKHRoaXMuYy8weDEwMDAwMDAwMCkpO2ZvcihiLnB1c2godGhpcy5jfDApO2IubGVuZ3RoOyl0aGlzLmwoYi5zcGxpY2UoMCwxNikpO3RoaXMucmVzZXQoKTtyZXR1cm4gY30sbzpbXSxiOltdLEM6ZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEpe3JldHVybiAweDEwMDAwMDAwMCooYS1NYXRoLmZsb29yKGEpKXwwfWZvcih2YXIgYj0wLGM9MixkLGU7NjQ+YjtjKyspe2U9ITA7Zm9yKGQ9MjtkKmQ8PWM7ZCsrKWlmKDA9PT1jJWQpe2U9XG4hMTticmVha31lJiYoOD5iJiYodGhpcy5vW2JdPWEoTWF0aC5wb3coYywuNSkpKSx0aGlzLmJbYl09YShNYXRoLnBvdyhjLDEvMykpLGIrKyl9fSxsOmZ1bmN0aW9uKGEpe3ZhciBiLGMsZCxlPXRoaXMuZyxmPXRoaXMuYixnPWVbMF0saD1lWzFdLGs9ZVsyXSxuPWVbM10sbD1lWzRdLG09ZVs1XSxwPWVbNl0sej1lWzddO2ZvcihiPTA7NjQ+YjtiKyspMTY+Yj9jPWFbYl06KGM9YVtiKzEmMTVdLGQ9YVtiKzE0JjE1XSxjPWFbYiYxNV09KGM+Pj43XmM+Pj4xOF5jPj4+M15jPDwyNV5jPDwxNCkrKGQ+Pj4xN15kPj4+MTleZD4+PjEwXmQ8PDE1XmQ8PDEzKSthW2ImMTVdK2FbYis5JjE1XXwwKSxjPWMreisobD4+PjZebD4+PjExXmw+Pj4yNV5sPDwyNl5sPDwyMV5sPDw3KSsocF5sJihtXnApKStmW2JdLHo9cCxwPW0sbT1sLGw9bitjfDAsbj1rLGs9aCxoPWcsZz1jKyhoJmtebiYoaF5rKSkrKGg+Pj4yXmg+Pj4xM15oPj4+MjJeaDw8MzBeaDw8MTleaDw8MTApfDA7ZVswXT1lWzBdK2d8XG4wO2VbMV09ZVsxXStofDA7ZVsyXT1lWzJdK2t8MDtlWzNdPWVbM10rbnwwO2VbNF09ZVs0XStsfDA7ZVs1XT1lWzVdK218MDtlWzZdPWVbNl0rcHwwO2VbN109ZVs3XSt6fDB9fTtzamNsLmhhc2guc2hhNTEyPWZ1bmN0aW9uKGEpe3RoaXMuYlswXXx8dGhpcy5DKCk7YT8odGhpcy5nPWEuZy5zbGljZSgwKSx0aGlzLmY9YS5mLnNsaWNlKDApLHRoaXMuYz1hLmMpOnRoaXMucmVzZXQoKX07c2pjbC5oYXNoLnNoYTUxMi5oYXNoPWZ1bmN0aW9uKGEpe3JldHVybihuZXcgc2pjbC5oYXNoLnNoYTUxMikudXBkYXRlKGEpLmZpbmFsaXplKCl9O1xuc2pjbC5oYXNoLnNoYTUxMi5wcm90b3R5cGU9e2Jsb2NrU2l6ZToxMDI0LHJlc2V0OmZ1bmN0aW9uKCl7dGhpcy5nPXRoaXMuby5zbGljZSgwKTt0aGlzLmY9W107dGhpcy5jPTA7cmV0dXJuIHRoaXN9LHVwZGF0ZTpmdW5jdGlvbihhKXtcInN0cmluZ1wiPT09dHlwZW9mIGEmJihhPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYSkpO3ZhciBiLGM9dGhpcy5mPXNqY2wuYml0QXJyYXkuY29uY2F0KHRoaXMuZixhKTtiPXRoaXMuYzthPXRoaXMuYz1iK3NqY2wuYml0QXJyYXkuYml0TGVuZ3RoKGEpO2lmKDB4MWZmZmZmZmZmZmZmZmY8YSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcIkNhbm5vdCBoYXNoIG1vcmUgdGhhbiAyXjUzIC0gMSBiaXRzXCIpO2lmKFwidW5kZWZpbmVkXCIhPT10eXBlb2YgVWludDMyQXJyYXkpe3ZhciBkPW5ldyBVaW50MzJBcnJheShjKSxlPTA7Zm9yKGI9MTAyNCtiLSgxMDI0K2ImMTAyMyk7Yjw9YTtiKz0xMDI0KXRoaXMubChkLnN1YmFycmF5KDMyKlxuZSwzMiooZSsxKSkpLGUrPTE7Yy5zcGxpY2UoMCwzMiplKX1lbHNlIGZvcihiPTEwMjQrYi0oMTAyNCtiJjEwMjMpO2I8PWE7Yis9MTAyNCl0aGlzLmwoYy5zcGxpY2UoMCwzMikpO3JldHVybiB0aGlzfSxmaW5hbGl6ZTpmdW5jdGlvbigpe3ZhciBhLGI9dGhpcy5mLGM9dGhpcy5nLGI9c2pjbC5iaXRBcnJheS5jb25jYXQoYixbc2pjbC5iaXRBcnJheS5wYXJ0aWFsKDEsMSldKTtmb3IoYT1iLmxlbmd0aCs0O2EmMzE7YSsrKWIucHVzaCgwKTtiLnB1c2goMCk7Yi5wdXNoKDApO2IucHVzaChNYXRoLmZsb29yKHRoaXMuYy8weDEwMDAwMDAwMCkpO2ZvcihiLnB1c2godGhpcy5jfDApO2IubGVuZ3RoOyl0aGlzLmwoYi5zcGxpY2UoMCwzMikpO3RoaXMucmVzZXQoKTtyZXR1cm4gY30sbzpbXSxpYTpbMTIzNzIyMzIsMTMyODEwODMsOTc2Mjg1OSwxOTE0NjA5LDE1MTA2NzY5LDQwOTA5MTEsNDMwODMzMSw4MjY2MTA1XSxiOltdLGthOlsyNjY2MDE4LDE1Njg5MTY1LDUwNjE0MjMsOTAzNDY4NCxcbjQ3NjQ5ODQsMzgwOTUzLDE2NTg3NzksNzE3NjQ3MiwxOTcxODYsNzM2ODYzOCwxNDk4NzkxNiwxNjc1Nzk4Niw4MDk2MTExLDE0ODAzNjksMTMwNDYzMjUsNjg5MTE1NiwxNTgxMzMzMCw1MTg3MDQzLDkyMjk3NDksMTEzMTIyMjksMjgxODY3NywxMDkzNzQ3NSw0MzI0MzA4LDExMzU1NDEsNjc0MTkzMSwxMTgwOTI5NiwxNjQ1ODA0NywxNTY2NjkxNiwxMTA0Njg1MCw2OTgxNDksMjI5OTk5LDk0NTc3NiwxMzc3NDg0NCwyNTQxODYyLDEyODU2MDQ1LDk4MTA5MTEsMTE0OTQzNjYsNzg0NDUyMCwxNTU3NjgwNiw4NTMzMzA3LDE1Nzk1MDQ0LDQzMzc2NjUsMTYyOTE3MjksNTU1MzcxMiwxNTY4NDEyMCw2NjYyNDE2LDc0MTM4MDIsMTIzMDg5MjAsMTM4MTYwMDgsNDMwMzY5OSw5MzY2NDI1LDEwMTc2NjgwLDEzMTk1ODc1LDQyOTUzNzEsNjU0NjI5MSwxMTcxMjY3NSwxNTcwODkyNCwxNTE5NDU2LDE1NzcyNTMwLDY1Njg0MjgsNjQ5NTc4NCw4NTY4Mjk3LDEzMDA3MTI1LDc0OTIzOTUsMjUxNTM1NixcbjEyNjMyNTgzLDE0NzQwMjU0LDcyNjI1ODQsMTUzNTkzMCwxMzE0NjI3OCwxNjMyMTk2NiwxODUzMjExLDI5NDI3NiwxMzA1MTAyNywxMzIyMTU2NCwxMDUxOTgwLDQwODAzMTAsNjY1MTQzNCwxNDA4ODk0MCw0Njc1NjA3XSxDOmZ1bmN0aW9uKCl7ZnVuY3Rpb24gYShhKXtyZXR1cm4gMHgxMDAwMDAwMDAqKGEtTWF0aC5mbG9vcihhKSl8MH1mdW5jdGlvbiBiKGEpe3JldHVybiAweDEwMDAwMDAwMDAwKihhLU1hdGguZmxvb3IoYSkpJjI1NX1mb3IodmFyIGM9MCxkPTIsZSxmOzgwPmM7ZCsrKXtmPSEwO2ZvcihlPTI7ZSplPD1kO2UrKylpZigwPT09ZCVlKXtmPSExO2JyZWFrfWYmJig4PmMmJih0aGlzLm9bMipjXT1hKE1hdGgucG93KGQsLjUpKSx0aGlzLm9bMipjKzFdPWIoTWF0aC5wb3coZCwuNSkpPDwyNHx0aGlzLmlhW2NdKSx0aGlzLmJbMipjXT1hKE1hdGgucG93KGQsMS8zKSksdGhpcy5iWzIqYysxXT1iKE1hdGgucG93KGQsMS8zKSk8PDI0fHRoaXMua2FbY10sYysrKX19LGw6ZnVuY3Rpb24oYSl7dmFyIGIsXG5jLGQ9dGhpcy5nLGU9dGhpcy5iLGY9ZFswXSxnPWRbMV0saD1kWzJdLGs9ZFszXSxuPWRbNF0sbD1kWzVdLG09ZFs2XSxwPWRbN10sej1kWzhdLEE9ZFs5XSxDPWRbMTBdLEI9ZFsxMV0sRD1kWzEyXSxQPWRbMTNdLGVhPWRbMTRdLFE9ZFsxNV0sdDtpZihcInVuZGVmaW5lZFwiIT09dHlwZW9mIFVpbnQzMkFycmF5KXt0PUFycmF5KDE2MCk7Zm9yKHZhciByPTA7MzI+cjtyKyspdFtyXT1hW3JdfWVsc2UgdD1hO3ZhciByPWYsdT1nLEc9aCxFPWssSD1uLEY9bCxWPW0sST1wLHc9eix2PUEsUj1DLEo9QixTPUQsSz1QLFc9ZWEsTD1RO2ZvcihhPTA7ODA+YTthKyspe2lmKDE2PmEpYj10WzIqYV0sYz10WzIqYSsxXTtlbHNle2M9dFsyKihhLTE1KV07dmFyIHE9dFsyKihhLTE1KSsxXTtiPShxPDwzMXxjPj4+MSleKHE8PDI0fGM+Pj44KV5jPj4+Nzt2YXIgeD0oYzw8MzF8cT4+PjEpXihjPDwyNHxxPj4+OCleKGM8PDI1fHE+Pj43KTtjPXRbMiooYS0yKV07dmFyIHk9dFsyKihhLTIpKzFdLFxucT0oeTw8MTN8Yz4+PjE5KV4oYzw8M3x5Pj4+MjkpXmM+Pj42LHk9KGM8PDEzfHk+Pj4xOSleKHk8PDN8Yz4+PjI5KV4oYzw8MjZ8eT4+PjYpLFg9dFsyKihhLTcpXSxZPXRbMiooYS0xNildLE09dFsyKihhLTE2KSsxXTtjPXgrdFsyKihhLTcpKzFdO2I9YitYKyhjPj4+MDx4Pj4+MD8xOjApO2MrPXk7Yis9cSsoYz4+PjA8eT4+PjA/MTowKTtjKz1NO2IrPVkrKGM+Pj4wPE0+Pj4wPzE6MCl9dFsyKmFdPWJ8PTA7dFsyKmErMV09Y3w9MDt2YXIgWD13JlJefncmUyxmYT12JkpefnYmSyx5PXImR15yJkheRyZILGphPXUmRV51JkZeRSZGLFk9KHU8PDR8cj4+PjI4KV4ocjw8MzB8dT4+PjIpXihyPDwyNXx1Pj4+NyksTT0ocjw8NHx1Pj4+MjgpXih1PDwzMHxyPj4+MileKHU8PDI1fHI+Pj43KSxrYT1lWzIqYV0sZ2E9ZVsyKmErMV0scT1MKygodzw8MTh8dj4+PjE0KV4odzw8MTR8dj4+PjE4KV4odjw8MjN8dz4+PjkpKSx4PVcrKCh2PDwxOHx3Pj4+MTQpXih2PDwxNHx3Pj4+MTgpXih3PDxcbjIzfHY+Pj45KSkrKHE+Pj4wPEw+Pj4wPzE6MCkscT1xK2ZhLHg9eCsoWCsocT4+PjA8ZmE+Pj4wPzE6MCkpLHE9cStnYSx4PXgrKGthKyhxPj4+MDxnYT4+PjA/MTowKSkscT1xK2N8MCx4PXgrKGIrKHE+Pj4wPGM+Pj4wPzE6MCkpO2M9TStqYTtiPVkreSsoYz4+PjA8TT4+PjA/MTowKTtXPVM7TD1LO1M9UjtLPUo7Uj13O0o9djt2PUkrcXwwO3c9Vit4Kyh2Pj4+MDxJPj4+MD8xOjApfDA7Vj1IO0k9RjtIPUc7Rj1FO0c9cjtFPXU7dT1xK2N8MDtyPXgrYisodT4+PjA8cT4+PjA/MTowKXwwfWc9ZFsxXT1nK3V8MDtkWzBdPWYrcisoZz4+PjA8dT4+PjA/MTowKXwwO2s9ZFszXT1rK0V8MDtkWzJdPWgrRysoaz4+PjA8RT4+PjA/MTowKXwwO2w9ZFs1XT1sK0Z8MDtkWzRdPW4rSCsobD4+PjA8Rj4+PjA/MTowKXwwO3A9ZFs3XT1wK0l8MDtkWzZdPW0rVisocD4+PjA8ST4+PjA/MTowKXwwO0E9ZFs5XT1BK3Z8MDtkWzhdPXordysoQT4+PjA8dj4+PjA/MTowKXwwO0I9ZFsxMV09QitKfFxuMDtkWzEwXT1DK1IrKEI+Pj4wPEo+Pj4wPzE6MCl8MDtQPWRbMTNdPVArS3wwO2RbMTJdPUQrUysoUD4+PjA8Sz4+PjA/MTowKXwwO1E9ZFsxNV09UStMfDA7ZFsxNF09ZWErVysoUT4+PjA8TD4+PjA/MTowKXwwfX07XG5zamNsLm1vZGUuY2NtPXtuYW1lOlwiY2NtXCIsRjpbXSxsaXN0ZW5Qcm9ncmVzczpmdW5jdGlvbihhKXtzamNsLm1vZGUuY2NtLkYucHVzaChhKX0sdW5MaXN0ZW5Qcm9ncmVzczpmdW5jdGlvbihhKXthPXNqY2wubW9kZS5jY20uRi5pbmRleE9mKGEpOy0xPGEmJnNqY2wubW9kZS5jY20uRi5zcGxpY2UoYSwxKX0sZGE6ZnVuY3Rpb24oYSl7dmFyIGI9c2pjbC5tb2RlLmNjbS5GLnNsaWNlKCksYztmb3IoYz0wO2M8Yi5sZW5ndGg7Yys9MSliW2NdKGEpfSxlbmNyeXB0OmZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGYsZz1iLnNsaWNlKDApLGg9c2pjbC5iaXRBcnJheSxrPWguYml0TGVuZ3RoKGMpLzgsbj1oLmJpdExlbmd0aChnKS84O2U9ZXx8NjQ7ZD1kfHxbXTtpZig3PmspdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJjY206IGl2IG11c3QgYmUgYXQgbGVhc3QgNyBieXRlc1wiKTtmb3IoZj0yOzQ+ZiYmbj4+PjgqZjtmKyspO2Y8MTUtayYmKGY9MTUtayk7Yz1oLmNsYW1wKGMsXG44KigxNS1mKSk7Yj1zamNsLm1vZGUuY2NtLlUoYSxiLGMsZCxlLGYpO2c9c2pjbC5tb2RlLmNjbS5WKGEsZyxjLGIsZSxmKTtyZXR1cm4gaC5jb25jYXQoZy5kYXRhLGcudGFnKX0sZGVjcnlwdDpmdW5jdGlvbihhLGIsYyxkLGUpe2U9ZXx8NjQ7ZD1kfHxbXTt2YXIgZj1zamNsLmJpdEFycmF5LGc9Zi5iaXRMZW5ndGgoYykvOCxoPWYuYml0TGVuZ3RoKGIpLGs9Zi5jbGFtcChiLGgtZSksbj1mLmJpdFNsaWNlKGIsaC1lKSxoPShoLWUpLzg7aWYoNz5nKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiY2NtOiBpdiBtdXN0IGJlIGF0IGxlYXN0IDcgYnl0ZXNcIik7Zm9yKGI9Mjs0PmImJmg+Pj44KmI7YisrKTtiPDE1LWcmJihiPTE1LWcpO2M9Zi5jbGFtcChjLDgqKDE1LWIpKTtrPXNqY2wubW9kZS5jY20uVihhLGssYyxuLGUsYik7YT1zamNsLm1vZGUuY2NtLlUoYSxrLmRhdGEsYyxkLGUsYik7aWYoIWYuZXF1YWwoay50YWcsYSkpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmNvcnJ1cHQoXCJjY206IHRhZyBkb2Vzbid0IG1hdGNoXCIpO1xucmV0dXJuIGsuZGF0YX0sbWE6ZnVuY3Rpb24oYSxiLGMsZCxlLGYpe3ZhciBnPVtdLGg9c2pjbC5iaXRBcnJheSxrPWguUDtkPVtoLnBhcnRpYWwoOCwoYi5sZW5ndGg/NjQ6MCl8ZC0yPDwyfGYtMSldO2Q9aC5jb25jYXQoZCxjKTtkWzNdfD1lO2Q9YS5lbmNyeXB0KGQpO2lmKGIubGVuZ3RoKWZvcihjPWguYml0TGVuZ3RoKGIpLzgsNjUyNzk+PWM/Zz1baC5wYXJ0aWFsKDE2LGMpXToweGZmZmZmZmZmPj1jJiYoZz1oLmNvbmNhdChbaC5wYXJ0aWFsKDE2LDY1NTM0KV0sW2NdKSksZz1oLmNvbmNhdChnLGIpLGI9MDtiPGcubGVuZ3RoO2IrPTQpZD1hLmVuY3J5cHQoayhkLGcuc2xpY2UoYixiKzQpLmNvbmNhdChbMCwwLDBdKSkpO3JldHVybiBkfSxVOmZ1bmN0aW9uKGEsYixjLGQsZSxmKXt2YXIgZz1zamNsLmJpdEFycmF5LGg9Zy5QO2UvPTg7aWYoZSUyfHw0PmV8fDE2PGUpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJjY206IGludmFsaWQgdGFnIGxlbmd0aFwiKTtcbmlmKDB4ZmZmZmZmZmY8ZC5sZW5ndGh8fDB4ZmZmZmZmZmY8Yi5sZW5ndGgpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmJ1ZyhcImNjbTogY2FuJ3QgZGVhbCB3aXRoIDRHaUIgb3IgbW9yZSBkYXRhXCIpO2M9c2pjbC5tb2RlLmNjbS5tYShhLGQsYyxlLGcuYml0TGVuZ3RoKGIpLzgsZik7Zm9yKGQ9MDtkPGIubGVuZ3RoO2QrPTQpYz1hLmVuY3J5cHQoaChjLGIuc2xpY2UoZCxkKzQpLmNvbmNhdChbMCwwLDBdKSkpO3JldHVybiBnLmNsYW1wKGMsOCplKX0sVjpmdW5jdGlvbihhLGIsYyxkLGUsZil7dmFyIGcsaD1zamNsLmJpdEFycmF5O2c9aC5QO3ZhciBrPWIubGVuZ3RoLG49aC5iaXRMZW5ndGgoYiksbD1rLzUwLG09bDtjPWguY29uY2F0KFtoLnBhcnRpYWwoOCxmLTEpXSxjKS5jb25jYXQoWzAsMCwwXSkuc2xpY2UoMCw0KTtkPWguYml0U2xpY2UoZyhkLGEuZW5jcnlwdChjKSksMCxlKTtpZighaylyZXR1cm57dGFnOmQsZGF0YTpbXX07Zm9yKGc9MDtnPGs7Zys9NClnPmwmJihzamNsLm1vZGUuY2NtLmRhKGcvXG5rKSxsKz1tKSxjWzNdKyssZT1hLmVuY3J5cHQoYyksYltnXV49ZVswXSxiW2crMV1ePWVbMV0sYltnKzJdXj1lWzJdLGJbZyszXV49ZVszXTtyZXR1cm57dGFnOmQsZGF0YTpoLmNsYW1wKGIsbil9fX07c2pjbC5taXNjLmhtYWM9ZnVuY3Rpb24oYSxiKXt0aGlzLlc9Yj1ifHxzamNsLmhhc2guc2hhMjU2O3ZhciBjPVtbXSxbXV0sZCxlPWIucHJvdG90eXBlLmJsb2NrU2l6ZS8zMjt0aGlzLkI9W25ldyBiLG5ldyBiXTthLmxlbmd0aD5lJiYoYT1iLmhhc2goYSkpO2ZvcihkPTA7ZDxlO2QrKyljWzBdW2RdPWFbZF1eOTA5NTIyNDg2LGNbMV1bZF09YVtkXV4xNTQ5NTU2ODI4O3RoaXMuQlswXS51cGRhdGUoY1swXSk7dGhpcy5CWzFdLnVwZGF0ZShjWzFdKTt0aGlzLk89bmV3IGIodGhpcy5CWzBdKX07XG5zamNsLm1pc2MuaG1hYy5wcm90b3R5cGUuZW5jcnlwdD1zamNsLm1pc2MuaG1hYy5wcm90b3R5cGUubWFjPWZ1bmN0aW9uKGEpe2lmKHRoaXMuWil0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImVuY3J5cHQgb24gYWxyZWFkeSB1cGRhdGVkIGhtYWMgY2FsbGVkIVwiKTt0aGlzLnVwZGF0ZShhKTtyZXR1cm4gdGhpcy5kaWdlc3QoYSl9O3NqY2wubWlzYy5obWFjLnByb3RvdHlwZS5yZXNldD1mdW5jdGlvbigpe3RoaXMuTz1uZXcgdGhpcy5XKHRoaXMuQlswXSk7dGhpcy5aPSExfTtzamNsLm1pc2MuaG1hYy5wcm90b3R5cGUudXBkYXRlPWZ1bmN0aW9uKGEpe3RoaXMuWj0hMDt0aGlzLk8udXBkYXRlKGEpfTtzamNsLm1pc2MuaG1hYy5wcm90b3R5cGUuZGlnZXN0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5PLmZpbmFsaXplKCksYT0obmV3IHRoaXMuVyh0aGlzLkJbMV0pKS51cGRhdGUoYSkuZmluYWxpemUoKTt0aGlzLnJlc2V0KCk7cmV0dXJuIGF9O1xuc2pjbC5taXNjLnBia2RmMj1mdW5jdGlvbihhLGIsYyxkLGUpe2M9Y3x8MUU0O2lmKDA+ZHx8MD5jKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwiaW52YWxpZCBwYXJhbXMgdG8gcGJrZGYyXCIpO1wic3RyaW5nXCI9PT10eXBlb2YgYSYmKGE9c2pjbC5jb2RlYy51dGY4U3RyaW5nLnRvQml0cyhhKSk7XCJzdHJpbmdcIj09PXR5cGVvZiBiJiYoYj1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGIpKTtlPWV8fHNqY2wubWlzYy5obWFjO2E9bmV3IGUoYSk7dmFyIGYsZyxoLGssbj1bXSxsPXNqY2wuYml0QXJyYXk7Zm9yKGs9MTszMipuLmxlbmd0aDwoZHx8MSk7aysrKXtlPWY9YS5lbmNyeXB0KGwuY29uY2F0KGIsW2tdKSk7Zm9yKGc9MTtnPGM7ZysrKWZvcihmPWEuZW5jcnlwdChmKSxoPTA7aDxmLmxlbmd0aDtoKyspZVtoXV49ZltoXTtuPW4uY29uY2F0KGUpfWQmJihuPWwuY2xhbXAobixkKSk7cmV0dXJuIG59O1xuc2pjbC5wcm5nPWZ1bmN0aW9uKGEpe3RoaXMuaD1bbmV3IHNqY2wuaGFzaC5zaGEyNTZdO3RoaXMucz1bMF07dGhpcy5OPTA7dGhpcy5HPXt9O3RoaXMuTT0wO3RoaXMuVD17fTt0aGlzLlg9dGhpcy5pPXRoaXMudT10aGlzLmZhPTA7dGhpcy5iPVswLDAsMCwwLDAsMCwwLDBdO3RoaXMubT1bMCwwLDAsMF07dGhpcy5LPXZvaWQgMDt0aGlzLkw9YTt0aGlzLkQ9ITE7dGhpcy5KPXtwcm9ncmVzczp7fSxzZWVkZWQ6e319O3RoaXMuQT10aGlzLmVhPTA7dGhpcy5IPTE7dGhpcy5JPTI7dGhpcy5hYT0weDEwMDAwO3RoaXMuUj1bMCw0OCw2NCw5NiwxMjgsMTkyLDB4MTAwLDM4NCw1MTIsNzY4LDEwMjRdO3RoaXMuYmE9M0U0O3RoaXMuJD04MH07XG5zamNsLnBybmcucHJvdG90eXBlPXtyYW5kb21Xb3JkczpmdW5jdGlvbihhLGIpe3ZhciBjPVtdLGQ7ZD10aGlzLmlzUmVhZHkoYik7dmFyIGU7aWYoZD09PXRoaXMuQSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24ubm90UmVhZHkoXCJnZW5lcmF0b3IgaXNuJ3Qgc2VlZGVkXCIpO2lmKGQmdGhpcy5JKXtkPSEoZCZ0aGlzLkgpO2U9W107dmFyIGY9MCxnO3RoaXMuWD1lWzBdPShuZXcgRGF0ZSkudmFsdWVPZigpK3RoaXMuYmE7Zm9yKGc9MDsxNj5nO2crKyllLnB1c2goMHgxMDAwMDAwMDAqTWF0aC5yYW5kb20oKXwwKTtmb3IoZz0wO2c8dGhpcy5oLmxlbmd0aCYmKGU9ZS5jb25jYXQodGhpcy5oW2ddLmZpbmFsaXplKCkpLGYrPXRoaXMuc1tnXSx0aGlzLnNbZ109MCxkfHwhKHRoaXMuTiYxPDxnKSk7ZysrKTt0aGlzLk4+PTE8PHRoaXMuaC5sZW5ndGgmJih0aGlzLmgucHVzaChuZXcgc2pjbC5oYXNoLnNoYTI1NiksdGhpcy5zLnB1c2goMCkpO3RoaXMuaS09ZjtmPnRoaXMudSYmKHRoaXMudT1cbmYpO3RoaXMuTisrO3RoaXMuYj1zamNsLmhhc2guc2hhMjU2Lmhhc2godGhpcy5iLmNvbmNhdChlKSk7dGhpcy5LPW5ldyBzamNsLmNpcGhlci5hZXModGhpcy5iKTtmb3IoZD0wOzQ+ZCYmKHRoaXMubVtkXT10aGlzLm1bZF0rMXwwLCF0aGlzLm1bZF0pO2QrKyk7fWZvcihkPTA7ZDxhO2QrPTQpMD09PShkKzEpJXRoaXMuYWEmJmJhKHRoaXMpLGU9Tih0aGlzKSxjLnB1c2goZVswXSxlWzFdLGVbMl0sZVszXSk7YmEodGhpcyk7cmV0dXJuIGMuc2xpY2UoMCxhKX0sc2V0RGVmYXVsdFBhcmFub2lhOmZ1bmN0aW9uKGEsYil7aWYoMD09PWEmJlwiU2V0dGluZyBwYXJhbm9pYT0wIHdpbGwgcnVpbiB5b3VyIHNlY3VyaXR5OyB1c2UgaXQgb25seSBmb3IgdGVzdGluZ1wiIT09Yil0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcIlNldHRpbmcgcGFyYW5vaWE9MCB3aWxsIHJ1aW4geW91ciBzZWN1cml0eTsgdXNlIGl0IG9ubHkgZm9yIHRlc3RpbmdcIik7dGhpcy5MPWF9LGFkZEVudHJvcHk6ZnVuY3Rpb24oYSxcbmIsYyl7Yz1jfHxcInVzZXJcIjt2YXIgZCxlLGY9KG5ldyBEYXRlKS52YWx1ZU9mKCksZz10aGlzLkdbY10saD10aGlzLmlzUmVhZHkoKSxrPTA7ZD10aGlzLlRbY107dm9pZCAwPT09ZCYmKGQ9dGhpcy5UW2NdPXRoaXMuZmErKyk7dm9pZCAwPT09ZyYmKGc9dGhpcy5HW2NdPTApO3RoaXMuR1tjXT0odGhpcy5HW2NdKzEpJXRoaXMuaC5sZW5ndGg7c3dpdGNoKHR5cGVvZiBhKXtjYXNlIFwibnVtYmVyXCI6dm9pZCAwPT09YiYmKGI9MSk7dGhpcy5oW2ddLnVwZGF0ZShbZCx0aGlzLk0rKywxLGIsZiwxLGF8MF0pO2JyZWFrO2Nhc2UgXCJvYmplY3RcIjpjPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKTtpZihcIltvYmplY3QgVWludDMyQXJyYXldXCI9PT1jKXtlPVtdO2ZvcihjPTA7YzxhLmxlbmd0aDtjKyspZS5wdXNoKGFbY10pO2E9ZX1lbHNlIGZvcihcIltvYmplY3QgQXJyYXldXCIhPT1jJiYoaz0xKSxjPTA7YzxhLmxlbmd0aCYmIWs7YysrKVwibnVtYmVyXCIhPT10eXBlb2YgYVtjXSYmXG4oaz0xKTtpZighayl7aWYodm9pZCAwPT09Yilmb3IoYz1iPTA7YzxhLmxlbmd0aDtjKyspZm9yKGU9YVtjXTswPGU7KWIrKyxlPWU+Pj4xO3RoaXMuaFtnXS51cGRhdGUoW2QsdGhpcy5NKyssMixiLGYsYS5sZW5ndGhdLmNvbmNhdChhKSl9YnJlYWs7Y2FzZSBcInN0cmluZ1wiOnZvaWQgMD09PWImJihiPWEubGVuZ3RoKTt0aGlzLmhbZ10udXBkYXRlKFtkLHRoaXMuTSsrLDMsYixmLGEubGVuZ3RoXSk7dGhpcy5oW2ddLnVwZGF0ZShhKTticmVhaztkZWZhdWx0Oms9MX1pZihrKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJyYW5kb206IGFkZEVudHJvcHkgb25seSBzdXBwb3J0cyBudW1iZXIsIGFycmF5IG9mIG51bWJlcnMgb3Igc3RyaW5nXCIpO3RoaXMuc1tnXSs9Yjt0aGlzLmkrPWI7aD09PXRoaXMuQSYmKHRoaXMuaXNSZWFkeSgpIT09dGhpcy5BJiZjYShcInNlZWRlZFwiLE1hdGgubWF4KHRoaXMudSx0aGlzLmkpKSxjYShcInByb2dyZXNzXCIsdGhpcy5nZXRQcm9ncmVzcygpKSl9LFxuaXNSZWFkeTpmdW5jdGlvbihhKXthPXRoaXMuUlt2b2lkIDAhPT1hP2E6dGhpcy5MXTtyZXR1cm4gdGhpcy51JiZ0aGlzLnU+PWE/dGhpcy5zWzBdPnRoaXMuJCYmKG5ldyBEYXRlKS52YWx1ZU9mKCk+dGhpcy5YP3RoaXMuSXx0aGlzLkg6dGhpcy5IOnRoaXMuaT49YT90aGlzLkl8dGhpcy5BOnRoaXMuQX0sZ2V0UHJvZ3Jlc3M6ZnVuY3Rpb24oYSl7YT10aGlzLlJbYT9hOnRoaXMuTF07cmV0dXJuIHRoaXMudT49YT8xOnRoaXMuaT5hPzE6dGhpcy5pL2F9LHN0YXJ0Q29sbGVjdG9yczpmdW5jdGlvbigpe2lmKCF0aGlzLkQpe3RoaXMuYT17bG9hZFRpbWVDb2xsZWN0b3I6Tyh0aGlzLHRoaXMubGEpLG1vdXNlQ29sbGVjdG9yOk8odGhpcyx0aGlzLm5hKSxrZXlib2FyZENvbGxlY3RvcjpPKHRoaXMsdGhpcy5qYSksYWNjZWxlcm9tZXRlckNvbGxlY3RvcjpPKHRoaXMsdGhpcy5jYSksdG91Y2hDb2xsZWN0b3I6Tyh0aGlzLHRoaXMucGEpfTtpZih3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcil3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixcbnRoaXMuYS5sb2FkVGltZUNvbGxlY3RvciwhMSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzLmEubW91c2VDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5cHJlc3NcIix0aGlzLmEua2V5Ym9hcmRDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZGV2aWNlbW90aW9uXCIsdGhpcy5hLmFjY2VsZXJvbWV0ZXJDb2xsZWN0b3IsITEpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsdGhpcy5hLnRvdWNoQ29sbGVjdG9yLCExKTtlbHNlIGlmKGRvY3VtZW50LmF0dGFjaEV2ZW50KWRvY3VtZW50LmF0dGFjaEV2ZW50KFwib25sb2FkXCIsdGhpcy5hLmxvYWRUaW1lQ29sbGVjdG9yKSxkb2N1bWVudC5hdHRhY2hFdmVudChcIm9ubW91c2Vtb3ZlXCIsdGhpcy5hLm1vdXNlQ29sbGVjdG9yKSxkb2N1bWVudC5hdHRhY2hFdmVudChcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yKTtlbHNlIHRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5idWcoXCJjYW4ndCBhdHRhY2ggZXZlbnRcIik7XG50aGlzLkQ9ITB9fSxzdG9wQ29sbGVjdG9yczpmdW5jdGlvbigpe3RoaXMuRCYmKHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyPyh3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImxvYWRcIix0aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IsITEpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcy5hLm1vdXNlQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsdGhpcy5hLmtleWJvYXJkQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImRldmljZW1vdGlvblwiLHRoaXMuYS5hY2NlbGVyb21ldGVyQ29sbGVjdG9yLCExKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLHRoaXMuYS50b3VjaENvbGxlY3RvciwhMSkpOmRvY3VtZW50LmRldGFjaEV2ZW50JiYoZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJvbmxvYWRcIix0aGlzLmEubG9hZFRpbWVDb2xsZWN0b3IpLGRvY3VtZW50LmRldGFjaEV2ZW50KFwib25tb3VzZW1vdmVcIixcbnRoaXMuYS5tb3VzZUNvbGxlY3RvciksZG9jdW1lbnQuZGV0YWNoRXZlbnQoXCJrZXlwcmVzc1wiLHRoaXMuYS5rZXlib2FyZENvbGxlY3RvcikpLHRoaXMuRD0hMSl9LGFkZEV2ZW50TGlzdGVuZXI6ZnVuY3Rpb24oYSxiKXt0aGlzLkpbYV1bdGhpcy5lYSsrXT1ifSxyZW1vdmVFdmVudExpc3RlbmVyOmZ1bmN0aW9uKGEsYil7dmFyIGMsZCxlPXRoaXMuSlthXSxmPVtdO2ZvcihkIGluIGUpZS5oYXNPd25Qcm9wZXJ0eShkKSYmZVtkXT09PWImJmYucHVzaChkKTtmb3IoYz0wO2M8Zi5sZW5ndGg7YysrKWQ9ZltjXSxkZWxldGUgZVtkXX0samE6ZnVuY3Rpb24oKXtUKHRoaXMsMSl9LG5hOmZ1bmN0aW9uKGEpe3ZhciBiLGM7dHJ5e2I9YS54fHxhLmNsaWVudFh8fGEub2Zmc2V0WHx8MCxjPWEueXx8YS5jbGllbnRZfHxhLm9mZnNldFl8fDB9Y2F0Y2goZCl7Yz1iPTB9MCE9YiYmMCE9YyYmdGhpcy5hZGRFbnRyb3B5KFtiLGNdLDIsXCJtb3VzZVwiKTtUKHRoaXMsMCl9LHBhOmZ1bmN0aW9uKGEpe2E9XG5hLnRvdWNoZXNbMF18fGEuY2hhbmdlZFRvdWNoZXNbMF07dGhpcy5hZGRFbnRyb3B5KFthLnBhZ2VYfHxhLmNsaWVudFgsYS5wYWdlWXx8YS5jbGllbnRZXSwxLFwidG91Y2hcIik7VCh0aGlzLDApfSxsYTpmdW5jdGlvbigpe1QodGhpcywyKX0sY2E6ZnVuY3Rpb24oYSl7YT1hLmFjY2VsZXJhdGlvbkluY2x1ZGluZ0dyYXZpdHkueHx8YS5hY2NlbGVyYXRpb25JbmNsdWRpbmdHcmF2aXR5Lnl8fGEuYWNjZWxlcmF0aW9uSW5jbHVkaW5nR3Jhdml0eS56O2lmKHdpbmRvdy5vcmllbnRhdGlvbil7dmFyIGI9d2luZG93Lm9yaWVudGF0aW9uO1wibnVtYmVyXCI9PT10eXBlb2YgYiYmdGhpcy5hZGRFbnRyb3B5KGIsMSxcImFjY2VsZXJvbWV0ZXJcIil9YSYmdGhpcy5hZGRFbnRyb3B5KGEsMixcImFjY2VsZXJvbWV0ZXJcIik7VCh0aGlzLDApfX07XG5mdW5jdGlvbiBjYShhLGIpe3ZhciBjLGQ9c2pjbC5yYW5kb20uSlthXSxlPVtdO2ZvcihjIGluIGQpZC5oYXNPd25Qcm9wZXJ0eShjKSYmZS5wdXNoKGRbY10pO2ZvcihjPTA7YzxlLmxlbmd0aDtjKyspZVtjXShiKX1mdW5jdGlvbiBUKGEsYil7XCJ1bmRlZmluZWRcIiE9PXR5cGVvZiB3aW5kb3cmJndpbmRvdy5wZXJmb3JtYW5jZSYmXCJmdW5jdGlvblwiPT09dHlwZW9mIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3c/YS5hZGRFbnRyb3B5KHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSxiLFwibG9hZHRpbWVcIik6YS5hZGRFbnRyb3B5KChuZXcgRGF0ZSkudmFsdWVPZigpLGIsXCJsb2FkdGltZVwiKX1mdW5jdGlvbiBiYShhKXthLmI9TihhKS5jb25jYXQoTihhKSk7YS5LPW5ldyBzamNsLmNpcGhlci5hZXMoYS5iKX1mdW5jdGlvbiBOKGEpe2Zvcih2YXIgYj0wOzQ+YiYmKGEubVtiXT1hLm1bYl0rMXwwLCFhLm1bYl0pO2IrKyk7cmV0dXJuIGEuSy5lbmNyeXB0KGEubSl9XG5mdW5jdGlvbiBPKGEsYil7cmV0dXJuIGZ1bmN0aW9uKCl7Yi5hcHBseShhLGFyZ3VtZW50cyl9fXNqY2wucmFuZG9tPW5ldyBzamNsLnBybmcoNik7XG5hOnRyeXt2YXIgVSxkYSxaLGhhO2lmKGhhPVwidW5kZWZpbmVkXCIhPT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cyl7dmFyIGlhO3RyeXtpYT1yZXF1aXJlKFwiY3J5cHRvXCIpfWNhdGNoKGEpe2lhPW51bGx9aGE9ZGE9aWF9aWYoaGEmJmRhLnJhbmRvbUJ5dGVzKVU9ZGEucmFuZG9tQnl0ZXMoMTI4KSxVPW5ldyBVaW50MzJBcnJheSgobmV3IFVpbnQ4QXJyYXkoVSkpLmJ1ZmZlciksc2pjbC5yYW5kb20uYWRkRW50cm9weShVLDEwMjQsXCJjcnlwdG9bJ3JhbmRvbUJ5dGVzJ11cIik7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT09dHlwZW9mIHdpbmRvdyYmXCJ1bmRlZmluZWRcIiE9PXR5cGVvZiBVaW50MzJBcnJheSl7Wj1uZXcgVWludDMyQXJyYXkoMzIpO2lmKHdpbmRvdy5jcnlwdG8mJndpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKXdpbmRvdy5jcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKFopO2Vsc2UgaWYod2luZG93Lm1zQ3J5cHRvJiZ3aW5kb3cubXNDcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKXdpbmRvdy5tc0NyeXB0by5nZXRSYW5kb21WYWx1ZXMoWik7XG5lbHNlIGJyZWFrIGE7c2pjbC5yYW5kb20uYWRkRW50cm9weShaLDEwMjQsXCJjcnlwdG9bJ2dldFJhbmRvbVZhbHVlcyddXCIpfX1jYXRjaChhKXtcInVuZGVmaW5lZFwiIT09dHlwZW9mIHdpbmRvdyYmd2luZG93LmNvbnNvbGUmJihjb25zb2xlLmxvZyhcIlRoZXJlIHdhcyBhbiBlcnJvciBjb2xsZWN0aW5nIGVudHJvcHkgZnJvbSB0aGUgYnJvd3NlcjpcIiksY29uc29sZS5sb2coYSkpfVxuc2pjbC5qc29uPXtkZWZhdWx0czp7djoxLGl0ZXI6MUU0LGtzOjEyOCx0czo2NCxtb2RlOlwiY2NtXCIsYWRhdGE6XCJcIixjaXBoZXI6XCJhZXNcIn0saGE6ZnVuY3Rpb24oYSxiLGMsZCl7Yz1jfHx7fTtkPWR8fHt9O3ZhciBlPXNqY2wuanNvbixmPWUuaih7aXY6c2pjbC5yYW5kb20ucmFuZG9tV29yZHMoNCwwKX0sZS5kZWZhdWx0cyksZztlLmooZixjKTtjPWYuYWRhdGE7XCJzdHJpbmdcIj09PXR5cGVvZiBmLnNhbHQmJihmLnNhbHQ9c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGYuc2FsdCkpO1wic3RyaW5nXCI9PT10eXBlb2YgZi5pdiYmKGYuaXY9c2pjbC5jb2RlYy5iYXNlNjQudG9CaXRzKGYuaXYpKTtpZighc2pjbC5tb2RlW2YubW9kZV18fCFzamNsLmNpcGhlcltmLmNpcGhlcl18fFwic3RyaW5nXCI9PT10eXBlb2YgYSYmMTAwPj1mLml0ZXJ8fDY0IT09Zi50cyYmOTYhPT1mLnRzJiYxMjghPT1mLnRzfHwxMjghPT1mLmtzJiYxOTIhPT1mLmtzJiYweDEwMCE9PWYua3N8fDI+Zi5pdi5sZW5ndGh8fFxuNDxmLml2Lmxlbmd0aCl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZW5jcnlwdDogaW52YWxpZCBwYXJhbWV0ZXJzXCIpO1wic3RyaW5nXCI9PT10eXBlb2YgYT8oZz1zamNsLm1pc2MuY2FjaGVkUGJrZGYyKGEsZiksYT1nLmtleS5zbGljZSgwLGYua3MvMzIpLGYuc2FsdD1nLnNhbHQpOnNqY2wuZWNjJiZhIGluc3RhbmNlb2Ygc2pjbC5lY2MuZWxHYW1hbC5wdWJsaWNLZXkmJihnPWEua2VtKCksZi5rZW10YWc9Zy50YWcsYT1nLmtleS5zbGljZSgwLGYua3MvMzIpKTtcInN0cmluZ1wiPT09dHlwZW9mIGImJihiPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoYikpO1wic3RyaW5nXCI9PT10eXBlb2YgYyYmKGYuYWRhdGE9Yz1zamNsLmNvZGVjLnV0ZjhTdHJpbmcudG9CaXRzKGMpKTtnPW5ldyBzamNsLmNpcGhlcltmLmNpcGhlcl0oYSk7ZS5qKGQsZik7ZC5rZXk9YTtmLmN0PVwiY2NtXCI9PT1mLm1vZGUmJnNqY2wuYXJyYXlCdWZmZXImJnNqY2wuYXJyYXlCdWZmZXIuY2NtJiZcbmIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcj9zamNsLmFycmF5QnVmZmVyLmNjbS5lbmNyeXB0KGcsYixmLml2LGMsZi50cyk6c2pjbC5tb2RlW2YubW9kZV0uZW5jcnlwdChnLGIsZi5pdixjLGYudHMpO3JldHVybiBmfSxlbmNyeXB0OmZ1bmN0aW9uKGEsYixjLGQpe3ZhciBlPXNqY2wuanNvbixmPWUuaGEuYXBwbHkoZSxhcmd1bWVudHMpO3JldHVybiBlLmVuY29kZShmKX0sZ2E6ZnVuY3Rpb24oYSxiLGMsZCl7Yz1jfHx7fTtkPWR8fHt9O3ZhciBlPXNqY2wuanNvbjtiPWUuaihlLmooZS5qKHt9LGUuZGVmYXVsdHMpLGIpLGMsITApO3ZhciBmLGc7Zj1iLmFkYXRhO1wic3RyaW5nXCI9PT10eXBlb2YgYi5zYWx0JiYoYi5zYWx0PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhiLnNhbHQpKTtcInN0cmluZ1wiPT09dHlwZW9mIGIuaXYmJihiLml2PXNqY2wuY29kZWMuYmFzZTY0LnRvQml0cyhiLml2KSk7aWYoIXNqY2wubW9kZVtiLm1vZGVdfHwhc2pjbC5jaXBoZXJbYi5jaXBoZXJdfHxcInN0cmluZ1wiPT09XG50eXBlb2YgYSYmMTAwPj1iLml0ZXJ8fDY0IT09Yi50cyYmOTYhPT1iLnRzJiYxMjghPT1iLnRzfHwxMjghPT1iLmtzJiYxOTIhPT1iLmtzJiYweDEwMCE9PWIua3N8fCFiLml2fHwyPmIuaXYubGVuZ3RofHw0PGIuaXYubGVuZ3RoKXRocm93IG5ldyBzamNsLmV4Y2VwdGlvbi5pbnZhbGlkKFwianNvbiBkZWNyeXB0OiBpbnZhbGlkIHBhcmFtZXRlcnNcIik7XCJzdHJpbmdcIj09PXR5cGVvZiBhPyhnPXNqY2wubWlzYy5jYWNoZWRQYmtkZjIoYSxiKSxhPWcua2V5LnNsaWNlKDAsYi5rcy8zMiksYi5zYWx0PWcuc2FsdCk6c2pjbC5lY2MmJmEgaW5zdGFuY2VvZiBzamNsLmVjYy5lbEdhbWFsLnNlY3JldEtleSYmKGE9YS51bmtlbShzamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoYi5rZW10YWcpKS5zbGljZSgwLGIua3MvMzIpKTtcInN0cmluZ1wiPT09dHlwZW9mIGYmJihmPXNqY2wuY29kZWMudXRmOFN0cmluZy50b0JpdHMoZikpO2c9bmV3IHNqY2wuY2lwaGVyW2IuY2lwaGVyXShhKTtmPVwiY2NtXCI9PT1cbmIubW9kZSYmc2pjbC5hcnJheUJ1ZmZlciYmc2pjbC5hcnJheUJ1ZmZlci5jY20mJmIuY3QgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcj9zamNsLmFycmF5QnVmZmVyLmNjbS5kZWNyeXB0KGcsYi5jdCxiLml2LGIudGFnLGYsYi50cyk6c2pjbC5tb2RlW2IubW9kZV0uZGVjcnlwdChnLGIuY3QsYi5pdixmLGIudHMpO2UuaihkLGIpO2Qua2V5PWE7cmV0dXJuIDE9PT1jLnJhdz9mOnNqY2wuY29kZWMudXRmOFN0cmluZy5mcm9tQml0cyhmKX0sZGVjcnlwdDpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1zamNsLmpzb247cmV0dXJuIGUuZ2EoYSxlLmRlY29kZShiKSxjLGQpfSxlbmNvZGU6ZnVuY3Rpb24oYSl7dmFyIGIsYz1cIntcIixkPVwiXCI7Zm9yKGIgaW4gYSlpZihhLmhhc093blByb3BlcnR5KGIpKXtpZighYi5tYXRjaCgvXlthLXowLTldKyQvaSkpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGVuY29kZTogaW52YWxpZCBwcm9wZXJ0eSBuYW1lXCIpO2MrPWQrJ1wiJytcbmIrJ1wiOic7ZD1cIixcIjtzd2l0Y2godHlwZW9mIGFbYl0pe2Nhc2UgXCJudW1iZXJcIjpjYXNlIFwiYm9vbGVhblwiOmMrPWFbYl07YnJlYWs7Y2FzZSBcInN0cmluZ1wiOmMrPSdcIicrZXNjYXBlKGFbYl0pKydcIic7YnJlYWs7Y2FzZSBcIm9iamVjdFwiOmMrPSdcIicrc2pjbC5jb2RlYy5iYXNlNjQuZnJvbUJpdHMoYVtiXSwwKSsnXCInO2JyZWFrO2RlZmF1bHQ6dGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmJ1ZyhcImpzb24gZW5jb2RlOiB1bnN1cHBvcnRlZCB0eXBlXCIpO319cmV0dXJuIGMrXCJ9XCJ9LGRlY29kZTpmdW5jdGlvbihhKXthPWEucmVwbGFjZSgvXFxzL2csXCJcIik7aWYoIWEubWF0Y2goL15cXHsuKlxcfSQvKSl0aHJvdyBuZXcgc2pjbC5leGNlcHRpb24uaW52YWxpZChcImpzb24gZGVjb2RlOiB0aGlzIGlzbid0IGpzb24hXCIpO2E9YS5yZXBsYWNlKC9eXFx7fFxcfSQvZyxcIlwiKS5zcGxpdCgvLC8pO3ZhciBiPXt9LGMsZDtmb3IoYz0wO2M8YS5sZW5ndGg7YysrKXtpZighKGQ9YVtjXS5tYXRjaCgvXlxccyooPzooW1wiJ10/KShbYS16XVthLXowLTldKilcXDEpXFxzKjpcXHMqKD86KC0/XFxkKyl8XCIoW2EtejAtOStcXC8lKl8uQD1cXC1dKilcInwodHJ1ZXxmYWxzZSkpJC9pKSkpdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJqc29uIGRlY29kZTogdGhpcyBpc24ndCBqc29uIVwiKTtcbm51bGwhPWRbM10/YltkWzJdXT1wYXJzZUludChkWzNdLDEwKTpudWxsIT1kWzRdP2JbZFsyXV09ZFsyXS5tYXRjaCgvXihjdHxhZGF0YXxzYWx0fGl2KSQvKT9zamNsLmNvZGVjLmJhc2U2NC50b0JpdHMoZFs0XSk6dW5lc2NhcGUoZFs0XSk6bnVsbCE9ZFs1XSYmKGJbZFsyXV09XCJ0cnVlXCI9PT1kWzVdKX1yZXR1cm4gYn0sajpmdW5jdGlvbihhLGIsYyl7dm9pZCAwPT09YSYmKGE9e30pO2lmKHZvaWQgMD09PWIpcmV0dXJuIGE7Zm9yKHZhciBkIGluIGIpaWYoYi5oYXNPd25Qcm9wZXJ0eShkKSl7aWYoYyYmdm9pZCAwIT09YVtkXSYmYVtkXSE9PWJbZF0pdGhyb3cgbmV3IHNqY2wuZXhjZXB0aW9uLmludmFsaWQoXCJyZXF1aXJlZCBwYXJhbWV0ZXIgb3ZlcnJpZGRlblwiKTthW2RdPWJbZF19cmV0dXJuIGF9LHJhOmZ1bmN0aW9uKGEsYil7dmFyIGM9e30sZDtmb3IoZCBpbiBhKWEuaGFzT3duUHJvcGVydHkoZCkmJmFbZF0hPT1iW2RdJiYoY1tkXT1hW2RdKTtyZXR1cm4gY30scWE6ZnVuY3Rpb24oYSxcbmIpe3ZhciBjPXt9LGQ7Zm9yKGQ9MDtkPGIubGVuZ3RoO2QrKyl2b2lkIDAhPT1hW2JbZF1dJiYoY1tiW2RdXT1hW2JbZF1dKTtyZXR1cm4gY319O3NqY2wuZW5jcnlwdD1zamNsLmpzb24uZW5jcnlwdDtzamNsLmRlY3J5cHQ9c2pjbC5qc29uLmRlY3J5cHQ7c2pjbC5taXNjLm9hPXt9O3NqY2wubWlzYy5jYWNoZWRQYmtkZjI9ZnVuY3Rpb24oYSxiKXt2YXIgYz1zamNsLm1pc2Mub2EsZDtiPWJ8fHt9O2Q9Yi5pdGVyfHwxRTM7Yz1jW2FdPWNbYV18fHt9O2Q9Y1tkXT1jW2RdfHx7Zmlyc3RTYWx0OmIuc2FsdCYmYi5zYWx0Lmxlbmd0aD9iLnNhbHQuc2xpY2UoMCk6c2pjbC5yYW5kb20ucmFuZG9tV29yZHMoMiwwKX07Yz12b2lkIDA9PT1iLnNhbHQ/ZC5maXJzdFNhbHQ6Yi5zYWx0O2RbY109ZFtjXXx8c2pjbC5taXNjLnBia2RmMihhLGMsYi5pdGVyKTtyZXR1cm57a2V5OmRbY10uc2xpY2UoMCksc2FsdDpjLnNsaWNlKDApfX07XG5cInVuZGVmaW5lZFwiIT09dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz1zamNsKTtcImZ1bmN0aW9uXCI9PT10eXBlb2YgZGVmaW5lJiZkZWZpbmUoW10sZnVuY3Rpb24oKXtyZXR1cm4gc2pjbH0pO1xuIiwgIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSID0gdHlwZW9mIFJlZmxlY3QgPT09ICdvYmplY3QnID8gUmVmbGVjdCA6IG51bGxcbnZhciBSZWZsZWN0QXBwbHkgPSBSICYmIHR5cGVvZiBSLmFwcGx5ID09PSAnZnVuY3Rpb24nXG4gID8gUi5hcHBseVxuICA6IGZ1bmN0aW9uIFJlZmxlY3RBcHBseSh0YXJnZXQsIHJlY2VpdmVyLCBhcmdzKSB7XG4gICAgcmV0dXJuIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKHRhcmdldCwgcmVjZWl2ZXIsIGFyZ3MpO1xuICB9XG5cbnZhciBSZWZsZWN0T3duS2V5c1xuaWYgKFIgJiYgdHlwZW9mIFIub3duS2V5cyA9PT0gJ2Z1bmN0aW9uJykge1xuICBSZWZsZWN0T3duS2V5cyA9IFIub3duS2V5c1xufSBlbHNlIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldClcbiAgICAgIC5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIFJlZmxlY3RPd25LZXlzID0gZnVuY3Rpb24gUmVmbGVjdE93bktleXModGFyZ2V0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRhcmdldCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIFByb2Nlc3NFbWl0V2FybmluZyh3YXJuaW5nKSB7XG4gIGlmIChjb25zb2xlICYmIGNvbnNvbGUud2FybikgY29uc29sZS53YXJuKHdhcm5pbmcpO1xufVxuXG52YXIgTnVtYmVySXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgZnVuY3Rpb24gTnVtYmVySXNOYU4odmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICBFdmVudEVtaXR0ZXIuaW5pdC5jYWxsKHRoaXMpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5tb2R1bGUuZXhwb3J0cy5vbmNlID0gb25jZTtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHNDb3VudCA9IDA7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbmZ1bmN0aW9uIGNoZWNrTGlzdGVuZXIobGlzdGVuZXIpIHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEZ1bmN0aW9uLiBSZWNlaXZlZCB0eXBlICcgKyB0eXBlb2YgbGlzdGVuZXIpO1xuICB9XG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICBlbnVtZXJhYmxlOiB0cnVlLFxuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICB9LFxuICBzZXQ6IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyB8fCBhcmcgPCAwIHx8IE51bWJlcklzTmFOKGFyZykpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGUgdmFsdWUgb2YgXCJkZWZhdWx0TWF4TGlzdGVuZXJzXCIgaXMgb3V0IG9mIHJhbmdlLiBJdCBtdXN0IGJlIGEgbm9uLW5lZ2F0aXZlIG51bWJlci4gUmVjZWl2ZWQgJyArIGFyZyArICcuJyk7XG4gICAgfVxuICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gIH1cbn0pO1xuXG5FdmVudEVtaXR0ZXIuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG4gIGlmICh0aGlzLl9ldmVudHMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgdGhpcy5fZXZlbnRzID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcykuX2V2ZW50cykge1xuICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICB9XG5cbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn07XG5cbi8vIE9idmlvdXNseSBub3QgYWxsIEVtaXR0ZXJzIHNob3VsZCBiZSBsaW1pdGVkIHRvIDEwLiBUaGlzIGZ1bmN0aW9uIGFsbG93c1xuLy8gdGhhdCB0byBiZSBpbmNyZWFzZWQuIFNldCB0byB6ZXJvIGZvciB1bmxpbWl0ZWQuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycyhuKSB7XG4gIGlmICh0eXBlb2YgbiAhPT0gJ251bWJlcicgfHwgbiA8IDAgfHwgTnVtYmVySXNOYU4obikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIG9mIFwiblwiIGlzIG91dCBvZiByYW5nZS4gSXQgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBudW1iZXIuIFJlY2VpdmVkICcgKyBuICsgJy4nKTtcbiAgfVxuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmZ1bmN0aW9uIF9nZXRNYXhMaXN0ZW5lcnModGhhdCkge1xuICBpZiAodGhhdC5fbWF4TGlzdGVuZXJzID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICByZXR1cm4gdGhhdC5fbWF4TGlzdGVuZXJzO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmdldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIF9nZXRNYXhMaXN0ZW5lcnModGhpcyk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiBlbWl0KHR5cGUpIHtcbiAgdmFyIGFyZ3MgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIGFyZ3MucHVzaChhcmd1bWVudHNbaV0pO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICBpZiAoZXZlbnRzICE9PSB1bmRlZmluZWQpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PT0gdW5kZWZpbmVkKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICB2YXIgZXI7XG4gICAgaWYgKGFyZ3MubGVuZ3RoID4gMClcbiAgICAgIGVyID0gYXJnc1swXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgLy8gTm90ZTogVGhlIGNvbW1lbnRzIG9uIHRoZSBgdGhyb3dgIGxpbmVzIGFyZSBpbnRlbnRpb25hbCwgdGhleSBzaG93XG4gICAgICAvLyB1cCBpbiBOb2RlJ3Mgb3V0cHV0IGlmIHRoaXMgcmVzdWx0cyBpbiBhbiB1bmhhbmRsZWQgZXhjZXB0aW9uLlxuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfVxuICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdVbmhhbmRsZWQgZXJyb3IuJyArIChlciA/ICcgKCcgKyBlci5tZXNzYWdlICsgJyknIDogJycpKTtcbiAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgIHRocm93IGVycjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChoYW5kbGVyID09PSB1bmRlZmluZWQpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIFJlZmxlY3RBcHBseShoYW5kbGVyLCB0aGlzLCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgUmVmbGVjdEFwcGx5KGxpc3RlbmVyc1tpXSwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmIChldmVudHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGV2ZW50cyA9IHRhcmdldC5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB0YXJnZXQuX2V2ZW50c0NvdW50ID0gMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAgIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgICBpZiAoZXZlbnRzLm5ld0xpc3RlbmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRhcmdldC5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoZXhpc3RpbmcgPT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9wdGltaXplIHRoZSBjYXNlIG9mIG9uZSBsaXN0ZW5lci4gRG9uJ3QgbmVlZCB0aGUgZXh0cmEgYXJyYXkgb2JqZWN0LlxuICAgIGV4aXN0aW5nID0gZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gICAgKyt0YXJnZXQuX2V2ZW50c0NvdW50O1xuICB9IGVsc2Uge1xuICAgIGlmICh0eXBlb2YgZXhpc3RpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPVxuICAgICAgICBwcmVwZW5kID8gW2xpc3RlbmVyLCBleGlzdGluZ10gOiBbZXhpc3RpbmcsIGxpc3RlbmVyXTtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICB9IGVsc2UgaWYgKHByZXBlbmQpIHtcbiAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleGlzdGluZy5wdXNoKGxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICAgIG0gPSBfZ2V0TWF4TGlzdGVuZXJzKHRhcmdldCk7XG4gICAgaWYgKG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0gJiYgIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgIC8vIE5vIGVycm9yIGNvZGUgZm9yIHRoaXMgc2luY2UgaXQgaXMgYSBXYXJuaW5nXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICAgIHZhciB3ID0gbmV3IEVycm9yKCdQb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnICcgKyBTdHJpbmcodHlwZSkgKyAnIGxpc3RlbmVycyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2FkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0Jyk7XG4gICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgIHcuZW1pdHRlciA9IHRhcmdldDtcbiAgICAgIHcudHlwZSA9IHR5cGU7XG4gICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgUHJvY2Vzc0VtaXRXYXJuaW5nKHcpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHByZXBlbmRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIF9hZGRMaXN0ZW5lcih0aGlzLCB0eXBlLCBsaXN0ZW5lciwgdHJ1ZSk7XG4gICAgfTtcblxuZnVuY3Rpb24gb25jZVdyYXBwZXIoKSB7XG4gIGlmICghdGhpcy5maXJlZCkge1xuICAgIHRoaXMudGFyZ2V0LnJlbW92ZUxpc3RlbmVyKHRoaXMudHlwZSwgdGhpcy53cmFwRm4pO1xuICAgIHRoaXMuZmlyZWQgPSB0cnVlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuY2FsbCh0aGlzLnRhcmdldCk7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXIuYXBwbHkodGhpcy50YXJnZXQsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX29uY2VXcmFwKHRhcmdldCwgdHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIHN0YXRlID0geyBmaXJlZDogZmFsc2UsIHdyYXBGbjogdW5kZWZpbmVkLCB0YXJnZXQ6IHRhcmdldCwgdHlwZTogdHlwZSwgbGlzdGVuZXI6IGxpc3RlbmVyIH07XG4gIHZhciB3cmFwcGVkID0gb25jZVdyYXBwZXIuYmluZChzdGF0ZSk7XG4gIHdyYXBwZWQubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgc3RhdGUud3JhcEZuID0gd3JhcHBlZDtcbiAgcmV0dXJuIHdyYXBwZWQ7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG4gIHRoaXMub24odHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5wcmVwZW5kT25jZUxpc3RlbmVyID1cbiAgICBmdW5jdGlvbiBwcmVwZW5kT25jZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICBjaGVja0xpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgIHRoaXMucHJlcGVuZExpc3RlbmVyKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuLy8gRW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmIGFuZCBvbmx5IGlmIHRoZSBsaXN0ZW5lciB3YXMgcmVtb3ZlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICB2YXIgbGlzdCwgZXZlbnRzLCBwb3NpdGlvbiwgaSwgb3JpZ2luYWxMaXN0ZW5lcjtcblxuICAgICAgY2hlY2tMaXN0ZW5lcihsaXN0ZW5lcik7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmIChldmVudHMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGxpc3QgPSBldmVudHNbdHlwZV07XG4gICAgICBpZiAobGlzdCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8IGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBzcGxpY2VPbmUobGlzdCwgcG9zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoID09PSAxKVxuICAgICAgICAgIGV2ZW50c1t0eXBlXSA9IGxpc3RbMF07XG5cbiAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKHR5cGUpIHtcbiAgICAgIHZhciBsaXN0ZW5lcnMsIGV2ZW50cywgaTtcblxuICAgICAgZXZlbnRzID0gdGhpcy5fZXZlbnRzO1xuICAgICAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZlbnRzW3R5cGVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50cyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlIGV2ZW50c1t0eXBlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLl9ldmVudHNDb3VudCA9IDA7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICBsaXN0ZW5lcnMgPSBldmVudHNbdHlwZV07XG5cbiAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyA9PT0gdW5kZWZpbmVkKVxuICAgIHJldHVybiBbXTtcblxuICB2YXIgZXZsaXN0ZW5lciA9IGV2ZW50c1t0eXBlXTtcbiAgaWYgKGV2bGlzdGVuZXIgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gW107XG5cbiAgaWYgKHR5cGVvZiBldmxpc3RlbmVyID09PSAnZnVuY3Rpb24nKVxuICAgIHJldHVybiB1bndyYXAgPyBbZXZsaXN0ZW5lci5saXN0ZW5lciB8fCBldmxpc3RlbmVyXSA6IFtldmxpc3RlbmVyXTtcblxuICByZXR1cm4gdW53cmFwID9cbiAgICB1bndyYXBMaXN0ZW5lcnMoZXZsaXN0ZW5lcikgOiBhcnJheUNsb25lKGV2bGlzdGVuZXIsIGV2bGlzdGVuZXIubGVuZ3RoKTtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCB0cnVlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmF3TGlzdGVuZXJzID0gZnVuY3Rpb24gcmF3TGlzdGVuZXJzKHR5cGUpIHtcbiAgcmV0dXJuIF9saXN0ZW5lcnModGhpcywgdHlwZSwgZmFsc2UpO1xufTtcblxuRXZlbnRFbWl0dGVyLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbihlbWl0dGVyLCB0eXBlKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5saXN0ZW5lckNvdW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbGlzdGVuZXJDb3VudC5jYWxsKGVtaXR0ZXIsIHR5cGUpO1xuICB9XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBsaXN0ZW5lckNvdW50O1xuZnVuY3Rpb24gbGlzdGVuZXJDb3VudCh0eXBlKSB7XG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHM7XG5cbiAgaWYgKGV2ZW50cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZXZlbnROYW1lcyA9IGZ1bmN0aW9uIGV2ZW50TmFtZXMoKSB7XG4gIHJldHVybiB0aGlzLl9ldmVudHNDb3VudCA+IDAgPyBSZWZsZWN0T3duS2V5cyh0aGlzLl9ldmVudHMpIDogW107XG59O1xuXG5mdW5jdGlvbiBhcnJheUNsb25lKGFyciwgbikge1xuICB2YXIgY29weSA9IG5ldyBBcnJheShuKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyArK2kpXG4gICAgY29weVtpXSA9IGFycltpXTtcbiAgcmV0dXJuIGNvcHk7XG59XG5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKDsgaW5kZXggKyAxIDwgbGlzdC5sZW5ndGg7IGluZGV4KyspXG4gICAgbGlzdFtpbmRleF0gPSBsaXN0W2luZGV4ICsgMV07XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIHVud3JhcExpc3RlbmVycyhhcnIpIHtcbiAgdmFyIHJldCA9IG5ldyBBcnJheShhcnIubGVuZ3RoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXQubGVuZ3RoOyArK2kpIHtcbiAgICByZXRbaV0gPSBhcnJbaV0ubGlzdGVuZXIgfHwgYXJyW2ldO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5cbmZ1bmN0aW9uIG9uY2UoZW1pdHRlciwgbmFtZSkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGZ1bmN0aW9uIGVycm9yTGlzdGVuZXIoZXJyKSB7XG4gICAgICBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG5hbWUsIHJlc29sdmVyKTtcbiAgICAgIHJlamVjdChlcnIpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc29sdmVyKCkge1xuICAgICAgaWYgKHR5cGVvZiBlbWl0dGVyLnJlbW92ZUxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgICByZXNvbHZlKFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gICAgfTtcblxuICAgIGV2ZW50VGFyZ2V0QWdub3N0aWNBZGRMaXN0ZW5lcihlbWl0dGVyLCBuYW1lLCByZXNvbHZlciwgeyBvbmNlOiB0cnVlIH0pO1xuICAgIGlmIChuYW1lICE9PSAnZXJyb3InKSB7XG4gICAgICBhZGRFcnJvckhhbmRsZXJJZkV2ZW50RW1pdHRlcihlbWl0dGVyLCBlcnJvckxpc3RlbmVyLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gYWRkRXJyb3JIYW5kbGVySWZFdmVudEVtaXR0ZXIoZW1pdHRlciwgaGFuZGxlciwgZmxhZ3MpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLm9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZXZlbnRUYXJnZXRBZ25vc3RpY0FkZExpc3RlbmVyKGVtaXR0ZXIsICdlcnJvcicsIGhhbmRsZXIsIGZsYWdzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBldmVudFRhcmdldEFnbm9zdGljQWRkTGlzdGVuZXIoZW1pdHRlciwgbmFtZSwgbGlzdGVuZXIsIGZsYWdzKSB7XG4gIGlmICh0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICBlbWl0dGVyLm9uY2UobmFtZSwgbGlzdGVuZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbWl0dGVyLm9uKG5hbWUsIGxpc3RlbmVyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIEV2ZW50VGFyZ2V0IGRvZXMgbm90IGhhdmUgYGVycm9yYCBldmVudCBzZW1hbnRpY3MgbGlrZSBOb2RlXG4gICAgLy8gRXZlbnRFbWl0dGVycywgd2UgZG8gbm90IGxpc3RlbiBmb3IgYGVycm9yYCBldmVudHMgaGVyZS5cbiAgICBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZnVuY3Rpb24gd3JhcExpc3RlbmVyKGFyZykge1xuICAgICAgLy8gSUUgZG9lcyBub3QgaGF2ZSBidWlsdGluIGB7IG9uY2U6IHRydWUgfWAgc3VwcG9ydCBzbyB3ZVxuICAgICAgLy8gaGF2ZSB0byBkbyBpdCBtYW51YWxseS5cbiAgICAgIGlmIChmbGFncy5vbmNlKSB7XG4gICAgICAgIGVtaXR0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB3cmFwTGlzdGVuZXIpO1xuICAgICAgfVxuICAgICAgbGlzdGVuZXIoYXJnKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJlbWl0dGVyXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIEV2ZW50RW1pdHRlci4gUmVjZWl2ZWQgdHlwZSAnICsgdHlwZW9mIGVtaXR0ZXIpO1xuICB9XG59XG4iLCBudWxsLCBudWxsLCBudWxsLCAiY29uc3QgZGVmYXVsdEVycm9yQ29uZmlnID0ge1xyXG4gICAgd2l0aFN0YWNrVHJhY2U6IGZhbHNlLFxyXG59O1xyXG4vLyBDdXN0b20gZXJyb3Igb2JqZWN0XHJcbi8vIENvbnRleHQgLyBkaXNjdXNzaW9uOiBodHRwczovL2dpdGh1Yi5jb20vc3VwZXJtYWNyby9uZXZlcnRocm93L3B1bGwvMjE1XHJcbmNvbnN0IGNyZWF0ZU5ldmVyVGhyb3dFcnJvciA9IChtZXNzYWdlLCByZXN1bHQsIGNvbmZpZyA9IGRlZmF1bHRFcnJvckNvbmZpZykgPT4ge1xyXG4gICAgY29uc3QgZGF0YSA9IHJlc3VsdC5pc09rKClcclxuICAgICAgICA/IHsgdHlwZTogJ09rJywgdmFsdWU6IHJlc3VsdC52YWx1ZSB9XHJcbiAgICAgICAgOiB7IHR5cGU6ICdFcnInLCB2YWx1ZTogcmVzdWx0LmVycm9yIH07XHJcbiAgICBjb25zdCBtYXliZVN0YWNrID0gY29uZmlnLndpdGhTdGFja1RyYWNlID8gbmV3IEVycm9yKCkuc3RhY2sgOiB1bmRlZmluZWQ7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGRhdGEsXHJcbiAgICAgICAgbWVzc2FnZSxcclxuICAgICAgICBzdGFjazogbWF5YmVTdGFjayxcclxuICAgIH07XHJcbn07XG5cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSwgU3VwcHJlc3NlZEVycm9yLCBTeW1ib2wsIEl0ZXJhdG9yICovXHJcblxyXG5cclxuZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fYXN5bmNHZW5lcmF0b3IodGhpc0FyZywgX2FyZ3VtZW50cywgZ2VuZXJhdG9yKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIGcgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSksIGksIHEgPSBbXTtcclxuICAgIHJldHVybiBpID0gT2JqZWN0LmNyZWF0ZSgodHlwZW9mIEFzeW5jSXRlcmF0b3IgPT09IFwiZnVuY3Rpb25cIiA/IEFzeW5jSXRlcmF0b3IgOiBPYmplY3QpLnByb3RvdHlwZSksIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiksIHZlcmIoXCJyZXR1cm5cIiwgYXdhaXRSZXR1cm4pLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiBhd2FpdFJldHVybihmKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZiwgcmVqZWN0KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlmIChnW25dKSB7IGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IGlmIChmKSBpW25dID0gZihpW25dKTsgfSB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBmYWxzZSB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG50eXBlb2YgU3VwcHJlc3NlZEVycm9yID09PSBcImZ1bmN0aW9uXCIgPyBTdXBwcmVzc2VkRXJyb3IgOiBmdW5jdGlvbiAoZXJyb3IsIHN1cHByZXNzZWQsIG1lc3NhZ2UpIHtcclxuICAgIHZhciBlID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xyXG4gICAgcmV0dXJuIGUubmFtZSA9IFwiU3VwcHJlc3NlZEVycm9yXCIsIGUuZXJyb3IgPSBlcnJvciwgZS5zdXBwcmVzc2VkID0gc3VwcHJlc3NlZCwgZTtcclxufTtcblxuY2xhc3MgUmVzdWx0QXN5bmMge1xyXG4gICAgY29uc3RydWN0b3IocmVzKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvbWlzZSA9IHJlcztcclxuICAgIH1cclxuICAgIHN0YXRpYyBmcm9tU2FmZVByb21pc2UocHJvbWlzZSkge1xyXG4gICAgICAgIGNvbnN0IG5ld1Byb21pc2UgPSBwcm9taXNlLnRoZW4oKHZhbHVlKSA9PiBuZXcgT2sodmFsdWUpKTtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKG5ld1Byb21pc2UpO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGZyb21Qcm9taXNlKHByb21pc2UsIGVycm9yRm4pIHtcclxuICAgICAgICBjb25zdCBuZXdQcm9taXNlID0gcHJvbWlzZVxyXG4gICAgICAgICAgICAudGhlbigodmFsdWUpID0+IG5ldyBPayh2YWx1ZSkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZSkgPT4gbmV3IEVycihlcnJvckZuKGUpKSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuZXdQcm9taXNlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBzdGF0aWMgZnJvbVRocm93YWJsZShmbiwgZXJyb3JGbikge1xyXG4gICAgICAgIHJldHVybiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKCgoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZm4oLi4uYXJncykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoZXJyb3JGbiA/IGVycm9yRm4oZXJyb3IpIDogZXJyb3IpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSkoKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21iaW5lKGFzeW5jUmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0QXN5bmNMaXN0KGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgY29tYmluZVdpdGhBbGxFcnJvcnMoYXN5bmNSZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzKGFzeW5jUmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2soeWllbGQgZihyZXMudmFsdWUpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgYW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbmV3UmVzID0geWllbGQgZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAobmV3UmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRXJyKG5ld1Jlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBmKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIC8vIFRlZSBkb2VzIG5vdCBjYXJlIGFib3V0IHRoZSBlcnJvclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgT2socmVzLnZhbHVlKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgbWFwRXJyKGYpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFJlc3VsdEFzeW5jKHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMuaXNPaygpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IE9rKHJlcy52YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnIoeWllbGQgZihyZXMuZXJyb3IpKTtcclxuICAgICAgICB9KSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBuZXcgUmVzdWx0QXN5bmModGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHtcclxuICAgICAgICAgICAgaWYgKHJlcy5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEVycihyZXMuZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZihyZXMudmFsdWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsdWUgaW5zdGFuY2VvZiBSZXN1bHRBc3luYyA/IG5ld1ZhbHVlLl9wcm9taXNlIDogbmV3VmFsdWU7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIG9yRWxzZShmKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyh0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICBpZiAocmVzLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmKHJlcy5lcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBPayhyZXMudmFsdWUpO1xyXG4gICAgICAgIH0pKSk7XHJcbiAgICB9XHJcbiAgICBtYXRjaChvaywgX2Vycikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oKHJlcykgPT4gcmVzLm1hdGNoKG9rLCBfZXJyKSk7XHJcbiAgICB9XHJcbiAgICB1bndyYXBPcih0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2UudGhlbigocmVzKSA9PiByZXMudW53cmFwT3IodCkpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZCB3aWxsIGJlIHJlbW92ZWQgaW4gOS4wLjAuXHJcbiAgICAgKlxyXG4gICAgICogWW91IGNhbiB1c2UgYHNhZmVUcnlgIHdpdGhvdXQgdGhpcyBtZXRob2QuXHJcbiAgICAgKiBAZXhhbXBsZVxyXG4gICAgICogYGBgdHlwZXNjcmlwdFxyXG4gICAgICogc2FmZVRyeShhc3luYyBmdW5jdGlvbiogKCkge1xyXG4gICAgICogICBjb25zdCBva1ZhbHVlID0geWllbGQqIHlvdXJSZXN1bHRcclxuICAgICAqIH0pXHJcbiAgICAgKiBgYGBcclxuICAgICAqIEVtdWxhdGVzIFJ1c3QncyBgP2Agb3BlcmF0b3IgaW4gYHNhZmVUcnlgJ3MgYm9keS4gU2VlIGFsc28gYHNhZmVUcnlgLlxyXG4gICAgICovXHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIHJldHVybiBfX2FzeW5jR2VuZXJhdG9yKHRoaXMsIGFyZ3VtZW50cywgZnVuY3Rpb24qIHNhZmVVbndyYXBfMSgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHlpZWxkIF9fYXdhaXQoeWllbGQgX19hd2FpdCh5aWVsZCogX19hc3luY0RlbGVnYXRvcihfX2FzeW5jVmFsdWVzKHlpZWxkIF9fYXdhaXQodGhpcy5fcHJvbWlzZS50aGVuKChyZXMpID0+IHJlcy5zYWZlVW53cmFwKCkpKSkpKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBNYWtlcyBSZXN1bHRBc3luYyBpbXBsZW1lbnQgUHJvbWlzZUxpa2U8UmVzdWx0PlxyXG4gICAgdGhlbihzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjaykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpIHtcclxuICAgICAgICByZXR1cm4gX19hc3luY0dlbmVyYXRvcih0aGlzLCBhcmd1bWVudHMsIGZ1bmN0aW9uKiBfYSgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0geWllbGQgX19hd2FpdCh0aGlzLl9wcm9taXNlKTtcclxuICAgICAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICAgICAgICAgIHlpZWxkIHlpZWxkIF9fYXdhaXQoZXJyQXN5bmMocmVzdWx0LmVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgICAgIHJldHVybiB5aWVsZCBfX2F3YWl0KHJlc3VsdC52YWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuY29uc3Qgb2tBc3luYyA9ICh2YWx1ZSkgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgT2sodmFsdWUpKSk7XHJcbmNvbnN0IGVyckFzeW5jID0gKGVycikgPT4gbmV3IFJlc3VsdEFzeW5jKFByb21pc2UucmVzb2x2ZShuZXcgRXJyKGVycikpKTtcclxuY29uc3QgZnJvbVByb21pc2UgPSBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZTtcclxuY29uc3QgZnJvbVNhZmVQcm9taXNlID0gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlO1xyXG5jb25zdCBmcm9tQXN5bmNUaHJvd2FibGUgPSBSZXN1bHRBc3luYy5mcm9tVGhyb3dhYmxlO1xuXG4vKipcclxuICogU2hvcnQgY2lyY3VpdHMgb24gdGhlIEZJUlNUIEVyciB2YWx1ZSB0aGF0IHdlIGZpbmRcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRMaXN0ID0gKHJlc3VsdExpc3QpID0+IHtcclxuICAgIGxldCBhY2MgPSBvayhbXSk7XHJcbiAgICBmb3IgKGNvbnN0IHJlc3VsdCBvZiByZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgaWYgKHJlc3VsdC5pc0VycigpKSB7XHJcbiAgICAgICAgICAgIGFjYyA9IGVycihyZXN1bHQuZXJyb3IpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFjYy5tYXAoKGxpc3QpID0+IGxpc3QucHVzaChyZXN1bHQudmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWNjO1xyXG59O1xyXG4vKiBUaGlzIGlzIHRoZSB0eXBlc2FmZSB2ZXJzaW9uIG9mIFByb21pc2UuYWxsXHJcbiAqXHJcbiAqIFRha2VzIGEgbGlzdCBvZiBSZXN1bHRBc3luYzxULCBFPiBhbmQgc3VjY2VzcyBpZiBhbGwgaW5uZXIgcmVzdWx0cyBhcmUgT2sgdmFsdWVzXHJcbiAqIG9yIGZhaWxzIGlmIG9uZSAob3IgbW9yZSkgb2YgdGhlIGlubmVyIHJlc3VsdHMgYXJlIEVyciB2YWx1ZXNcclxuICovXHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3QgPSAoYXN5bmNSZXN1bHRMaXN0KSA9PiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoUHJvbWlzZS5hbGwoYXN5bmNSZXN1bHRMaXN0KSkuYW5kVGhlbihjb21iaW5lUmVzdWx0TGlzdCk7XHJcbi8qKlxyXG4gKiBHaXZlIGEgbGlzdCBvZiBhbGwgdGhlIGVycm9ycyB3ZSBmaW5kXHJcbiAqL1xyXG5jb25zdCBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMgPSAocmVzdWx0TGlzdCkgPT4ge1xyXG4gICAgbGV0IGFjYyA9IG9rKFtdKTtcclxuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdExpc3QpIHtcclxuICAgICAgICBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzRXJyKCkpIHtcclxuICAgICAgICAgICAgYWNjLmVycm9yLnB1c2gocmVzdWx0LmVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0LmlzRXJyKCkgJiYgYWNjLmlzT2soKSkge1xyXG4gICAgICAgICAgICBhY2MgPSBlcnIoW3Jlc3VsdC5lcnJvcl0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChyZXN1bHQuaXNPaygpICYmIGFjYy5pc09rKCkpIHtcclxuICAgICAgICAgICAgYWNjLnZhbHVlLnB1c2gocmVzdWx0LnZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZG8gbm90aGluZyB3aGVuIHJlc3VsdC5pc09rKCkgJiYgYWNjLmlzRXJyKClcclxuICAgIH1cclxuICAgIHJldHVybiBhY2M7XHJcbn07XHJcbmNvbnN0IGNvbWJpbmVSZXN1bHRBc3luY0xpc3RXaXRoQWxsRXJyb3JzID0gKGFzeW5jUmVzdWx0TGlzdCkgPT4gUmVzdWx0QXN5bmMuZnJvbVNhZmVQcm9taXNlKFByb21pc2UuYWxsKGFzeW5jUmVzdWx0TGlzdCkpLmFuZFRoZW4oY29tYmluZVJlc3VsdExpc3RXaXRoQWxsRXJyb3JzKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1uYW1lc3BhY2VcclxudmFyIFJlc3VsdDtcclxuKGZ1bmN0aW9uIChSZXN1bHQpIHtcclxuICAgIC8qKlxyXG4gICAgICogV3JhcHMgYSBmdW5jdGlvbiB3aXRoIGEgdHJ5IGNhdGNoLCBjcmVhdGluZyBhIG5ldyBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lXHJcbiAgICAgKiBhcmd1bWVudHMgYnV0IHJldHVybmluZyBgT2tgIGlmIHN1Y2Nlc3NmdWwsIGBFcnJgIGlmIHRoZSBmdW5jdGlvbiB0aHJvd3NcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZm4gZnVuY3Rpb24gdG8gd3JhcCB3aXRoIG9rIG9uIHN1Y2Nlc3Mgb3IgZXJyIG9uIGZhaWx1cmVcclxuICAgICAqIEBwYXJhbSBlcnJvckZuIHdoZW4gYW4gZXJyb3IgaXMgdGhyb3duLCB0aGlzIHdpbGwgd3JhcCB0aGUgZXJyb3IgcmVzdWx0IGlmIHByb3ZpZGVkXHJcbiAgICAgKi9cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBmdW5jdGlvbiBmcm9tVGhyb3dhYmxlKGZuLCBlcnJvckZuKSB7XHJcbiAgICAgICAgcmV0dXJuICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBmbiguLi5hcmdzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvayhyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXJyKGVycm9yRm4gPyBlcnJvckZuKGUpIDogZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmZyb21UaHJvd2FibGUgPSBmcm9tVGhyb3dhYmxlO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZShyZXN1bHRMaXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbWJpbmVSZXN1bHRMaXN0KHJlc3VsdExpc3QpO1xyXG4gICAgfVxyXG4gICAgUmVzdWx0LmNvbWJpbmUgPSBjb21iaW5lO1xyXG4gICAgZnVuY3Rpb24gY29tYmluZVdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCkge1xyXG4gICAgICAgIHJldHVybiBjb21iaW5lUmVzdWx0TGlzdFdpdGhBbGxFcnJvcnMocmVzdWx0TGlzdCk7XHJcbiAgICB9XHJcbiAgICBSZXN1bHQuY29tYmluZVdpdGhBbGxFcnJvcnMgPSBjb21iaW5lV2l0aEFsbEVycm9ycztcclxufSkoUmVzdWx0IHx8IChSZXN1bHQgPSB7fSkpO1xyXG5jb25zdCBvayA9ICh2YWx1ZSkgPT4gbmV3IE9rKHZhbHVlKTtcclxuZnVuY3Rpb24gZXJyKGVycikge1xyXG4gICAgcmV0dXJuIG5ldyBFcnIoZXJyKTtcclxufVxyXG5mdW5jdGlvbiBzYWZlVHJ5KGJvZHkpIHtcclxuICAgIGNvbnN0IG4gPSBib2R5KCkubmV4dCgpO1xyXG4gICAgaWYgKG4gaW5zdGFuY2VvZiBQcm9taXNlKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBSZXN1bHRBc3luYyhuLnRoZW4oKHIpID0+IHIudmFsdWUpKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuLnZhbHVlO1xyXG59XHJcbmNsYXNzIE9rIHtcclxuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgaXNPaygpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlzRXJyKCkge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pc09rKCk7XHJcbiAgICB9XHJcbiAgICBtYXAoZikge1xyXG4gICAgICAgIHJldHVybiBvayhmKHRoaXMudmFsdWUpKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcEVycihfZikge1xyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaGVuKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBhbmRUaHJvdWdoKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLnZhbHVlKS5tYXAoKF92YWx1ZSkgPT4gdGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhbmRUZWUoZikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGYodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIFRlZSBkb2Vzbid0IGNhcmUgYWJvdXQgdGhlIGVycm9yXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvayh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXHJcbiAgICBvckVsc2UoX2YpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBhc3luY0FuZFRoZW4oZikge1xyXG4gICAgICAgIHJldHVybiBmKHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcclxuICAgIGFzeW5jQW5kVGhyb3VnaChmKSB7XHJcbiAgICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSkubWFwKCgpID0+IHRoaXMudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgYXN5bmNNYXAoZikge1xyXG4gICAgICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tU2FmZVByb21pc2UoZih0aGlzLnZhbHVlKSk7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXHJcbiAgICB1bndyYXBPcihfdikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xyXG4gICAgbWF0Y2gob2ssIF9lcnIpIHtcclxuICAgICAgICByZXR1cm4gb2sodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzYWZlVW53cmFwKCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVxdWlyZS15aWVsZCAqL1xyXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKF8pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuICAgIF91bnNhZmVVbndyYXBFcnIoY29uZmlnKSB7XHJcbiAgICAgICAgdGhyb3cgY3JlYXRlTmV2ZXJUaHJvd0Vycm9yKCdDYWxsZWQgYF91bnNhZmVVbndyYXBFcnJgIG9uIGFuIE9rJywgdGhpcywgY29uZmlnKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhcywgcmVxdWlyZS15aWVsZFxyXG4gICAgKltTeW1ib2wuaXRlcmF0b3JdKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfVxyXG59XHJcbmNsYXNzIEVyciB7XHJcbiAgICBjb25zdHJ1Y3RvcihlcnJvcikge1xyXG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcclxuICAgIH1cclxuICAgIGlzT2soKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgaXNFcnIoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmlzT2soKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIG1hcChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICBtYXBFcnIoZikge1xyXG4gICAgICAgIHJldHVybiBlcnIoZih0aGlzLmVycm9yKSk7XHJcbiAgICB9XHJcbiAgICBhbmRUaHJvdWdoKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVycih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFuZFRlZShfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgYW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnIodGhpcy5lcnJvcik7XHJcbiAgICB9XHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xyXG4gICAgb3JFbHNlKGYpIHtcclxuICAgICAgICByZXR1cm4gZih0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jQW5kVGhlbihfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIGFzeW5jQW5kVGhyb3VnaChfZikge1xyXG4gICAgICAgIHJldHVybiBlcnJBc3luYyh0aGlzLmVycm9yKTtcclxuICAgIH1cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcclxuICAgIGFzeW5jTWFwKF9mKSB7XHJcbiAgICAgICAgcmV0dXJuIGVyckFzeW5jKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgdW53cmFwT3Iodikge1xyXG4gICAgICAgIHJldHVybiB2O1xyXG4gICAgfVxyXG4gICAgbWF0Y2goX29rLCBlcnIpIHtcclxuICAgICAgICByZXR1cm4gZXJyKHRoaXMuZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgc2FmZVVud3JhcCgpIHtcclxuICAgICAgICBjb25zdCBlcnJvciA9IHRoaXMuZXJyb3I7XHJcbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiogKCkge1xyXG4gICAgICAgICAgICB5aWVsZCBlcnIoZXJyb3IpO1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgdGhpcyBnZW5lcmF0b3Igb3V0IG9mIGBzYWZlVHJ5YCcpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbiAgICBfdW5zYWZlVW53cmFwKGNvbmZpZykge1xyXG4gICAgICAgIHRocm93IGNyZWF0ZU5ldmVyVGhyb3dFcnJvcignQ2FsbGVkIGBfdW5zYWZlVW53cmFwYCBvbiBhbiBFcnInLCB0aGlzLCBjb25maWcpO1xyXG4gICAgfVxyXG4gICAgX3Vuc2FmZVVud3JhcEVycihfKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3I7XHJcbiAgICB9XHJcbiAgICAqW1N5bWJvbC5pdGVyYXRvcl0oKSB7XHJcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXHJcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciAtLSBUaGlzIGlzIHN0cnVjdHVyYWxseSBlcXVpdmFsZW50IGFuZCBzYWZlXHJcbiAgICAgICAgeWllbGQgc2VsZjtcclxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIC0tIFRoaXMgaXMgc3RydWN0dXJhbGx5IGVxdWl2YWxlbnQgYW5kIHNhZmVcclxuICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgIH1cclxufVxyXG5jb25zdCBmcm9tVGhyb3dhYmxlID0gUmVzdWx0LmZyb21UaHJvd2FibGU7XHJcbi8vI2VuZHJlZ2lvblxuXG5leHBvcnQgeyBFcnIsIE9rLCBSZXN1bHQsIFJlc3VsdEFzeW5jLCBlcnIsIGVyckFzeW5jLCBmcm9tQXN5bmNUaHJvd2FibGUsIGZyb21Qcm9taXNlLCBmcm9tU2FmZVByb21pc2UsIGZyb21UaHJvd2FibGUsIG9rLCBva0FzeW5jLCBzYWZlVHJ5IH07XG4iLCAiaW1wb3J0IHtcbiAgRGVjb2RlIGFzIGI2NGRlY29kZSxcbiAgRW5jb2RlIGFzIGI2NGVuY29kZSxcbn0gZnJvbSBcImFycmF5YnVmZmVyLWVuY29kaW5nL2Jhc2U2NFwiO1xuaW1wb3J0IHsgZXJyQXN5bmMsIG9rQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCBzamNsIGZyb20gXCJsdWZpLXNqY2xcIjtcbmltcG9ydCB7IENyeXB0b0FsZ29yaXRobSB9IGZyb20gXCJ+L2VudW0vY3J5cHRvLWFsZ29yaXRobS50c1wiO1xuaW1wb3J0IHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBEZWNyeXB0aW9uRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vZGVjcnlwdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgRW5jcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2VuY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IHR5cGUgRW5jcnlwdGVkRGF0YSB9IGZyb20gXCJ+L2ludGVyZmFjZS9lbmNyeXB0ZWQtZGF0YS50c1wiO1xuaW1wb3J0IHsgZW5zdXJlRXJyb3IgfSBmcm9tIFwifi91dGlscy50c1wiO1xuaW1wb3J0IHsgSGFzaGluZ0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2hhc2hpbmctZXJyb3IudHNcIjtcblxuLyoqXG4gKiBEZWNyeXB0IGFuIEVuY3J5cHRlZERhdGEgb3IgYSBzdHJpbmcgdXNpbmcgdGhlIGtleSB1c2VkIGZvciBlbmNyeXB0aW9uLlxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBlbmNyeXB0ZWREYXRhXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgZGVjcnlwdCA9IChcbiAga2V5OiBzdHJpbmcsXG4gIGVuY3J5cHRlZERhdGE6IEVuY3J5cHRlZERhdGEgfCBzdHJpbmcsXG4pOiBSZXN1bHRBc3luYzxBcnJheUJ1ZmZlciwgRGVjcnlwdGlvbkVycm9yPiA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IHR5cGVvZiBlbmNyeXB0ZWREYXRhID09PSBcInN0cmluZ1wiXG4gICAgICA/IGVuY3J5cHRlZERhdGFcbiAgICAgIDogbmV3IFRleHREZWNvZGVyKCkuZGVjb2RlKGVuY3J5cHRlZERhdGEuZGF0YSBhcyBBcnJheUJ1ZmZlcik7XG5cbiAgICByZXR1cm4gb2tBc3luYyhiNjRkZWNvZGUoc2pjbC5kZWNyeXB0KGtleSwgZGF0YSkpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICBuZXcgRGVjcnlwdGlvbkVycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogRW5jcnlwdCBhbiBBcnJheUJ1ZmZlciBpbnRvIGFuIEVuY3J5cHRlZERhdGEgdXNpbmcgdGhlIHByb3ZpZGVkIGtleVxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGVuY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICB2YWx1ZTogQXJyYXlCdWZmZXIsXG4pOiBSZXN1bHRBc3luYzxFbmNyeXB0ZWREYXRhLCBFbmNyeXB0aW9uRXJyb3I+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBlbmNyeXB0ZWQgPSBzamNsLmVuY3J5cHQoa2V5LCBiNjRlbmNvZGUodmFsdWUpKTtcblxuICAgIHJldHVybiBva0FzeW5jKHtcbiAgICAgIGFsZ286IENyeXB0b0FsZ29yaXRobS5TamNsLFxuICAgICAgZGF0YTogbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKGVuY3J5cHRlZCkuYnVmZmVyLFxuICAgICAgaXY6IEpTT04ucGFyc2UoZW5jcnlwdGVkIGFzIHVua25vd24gYXMgc3RyaW5nKS5pdixcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICBuZXcgRW5jcnlwdGlvbkVycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nIHVzaW5nIFNqY2wgQVBJXG4gKlxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlS2V5ID0gKCk6IFJlc3VsdEFzeW5jPHN0cmluZywgQ3J5cHRvRXJyb3I+ID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gb2tBc3luYyhzamNsLmNvZGVjLmJhc2U2NC5mcm9tQml0cyhzamNsLnJhbmRvbS5yYW5kb21Xb3Jkcyg4LCAxMCkpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICBuZXcgQ3J5cHRvRXJyb3IoXCJVbmFibGUgdG8gZ2VuZXJhdGUga2V5XCIsIHtcbiAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogSGFzaCBhIHBhc3N3b3JkIHVzaW5nIFNqY2wgQVBJXG4gKlxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaGFzaFBhc3N3b3JkID0gKFxuICBwYXNzd29yZDogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBIYXNoaW5nRXJyb3I+ID0+IHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gb2tBc3luYyhzamNsLmNvZGVjLmhleC5mcm9tQml0cyhzamNsLmhhc2guc2hhNTEyLmhhc2gocGFzc3dvcmQpKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGVyckFzeW5jKG5ldyBIYXNoaW5nRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSkpO1xuICB9XG59O1xuXG4vKipcbiAqIERldGVjdCBpZiB0aGUga2V5IGhhcyBiZWVuIGdlbmVyYXRlZCBieSBTamNsLiBTaW5jZSB3ZSdyZSBub3QgZ2VuZXJhdGluZyBhbiBlcXVhbCBzeW1ib2wgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nIHdpdGggdGhlIFdlYkNyeXB0byBBUEkgKGJ5IHVzaW5nIGJhc2U2NHVybCksIGl0J3MgZWFzeSB0byBkZXRlY3RcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaXNTamNsS2V5ID0gKGtleTogc3RyaW5nKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBrZXlba2V5Lmxlbmd0aCAtIDFdID09PSBcIj1cIjtcbn07XG4iLCAidHlwZSBKc29uYWJsZSA9XG4gIHwgc3RyaW5nXG4gIHwgbnVtYmVyXG4gIHwgYm9vbGVhblxuICB8IG51bGxcbiAgfCB1bmRlZmluZWRcbiAgfCByZWFkb25seSBKc29uYWJsZVtdXG4gIHwgeyByZWFkb25seSBba2V5OiBzdHJpbmddOiBKc29uYWJsZSB9XG4gIHwgeyB0b0pTT04oKTogSnNvbmFibGUgfTtcblxuZXhwb3J0IGNsYXNzIEJhc2VFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIHJlYWRvbmx5IGNvbnRleHQ/OiBKc29uYWJsZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBtZXNzYWdlPzogc3RyaW5nLFxuICAgIG9wdGlvbnM6IHsgY2F1c2U/OiBFcnJvcjsgY29udGV4dD86IEpzb25hYmxlIH0gPSB7fSxcbiAgKSB7XG4gICAgY29uc3QgeyBjYXVzZSwgY29udGV4dCB9ID0gb3B0aW9ucztcblxuICAgIHN1cGVyKG1lc3NhZ2UsIHsgY2F1c2UgfSk7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgfVxufVxuIiwgImltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2Jhc2UtZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIENyeXB0b0Vycm9yIGV4dGVuZHMgQmFzZUVycm9yIHt9XG4iLCAiaW1wb3J0IHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBFbmNyeXB0aW9uRXJyb3IgZXh0ZW5kcyBDcnlwdG9FcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2U6IHN0cmluZyA9IFwiVW5hYmxlIHRvIGVuY3J5cHQgdGhlIHByb3ZpZGVkIGRhdGFcIjtcbn1cbiIsICJpbXBvcnQgeyBlcnJBc3luYywgUmVzdWx0QXN5bmMgfSBmcm9tIFwibmV2ZXJ0aHJvd1wiO1xuaW1wb3J0IHsgQ29ubmVjdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY29ubmVjdGlvbi1lcnJvci50c1wiO1xuaW1wb3J0IHsgU2VydmVyRXJyb3IgfSBmcm9tIFwifi9lcnJvci9zZXJ2ZXItZXJyb3IudHNcIjtcbmltcG9ydCB0eXBlIHsgU2VydmVyQ29uZmlnIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3NlcnZlci1jb25maWcudHNcIjtcblxuLyoqXG4gKiBFbnN1cmUgYW4gZXJyb3IgbWVzc2FnZSBpcyB0cmFuc2Zvcm1lZCBpbiBhbiBFcnJvciBvYmplY3RcbiAqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbnN1cmVFcnJvciA9ICh2YWx1ZTogdW5rbm93bik6IEVycm9yID0+IHtcbiAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWx1ZTtcblxuICBsZXQgc3RyaW5naWZpZWQgPSBcIltVbmFibGUgdG8gc3RyaW5naWZ5IHRoZSB0aHJvd24gdmFsdWVdXCI7XG4gIHRyeSB7XG4gICAgc3RyaW5naWZpZWQgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgIC8qIGVtcHR5ICovXG4gIH1cblxuICByZXR1cm4gbmV3IEVycm9yKHN0cmluZ2lmaWVkKTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgTHVmaSdzIGNvbmZpZyBmcm9tIGl0cyBBUElcbiAqXG4gKiBAcGFyYW0gaW5zdGFuY2VVcmxcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaFNlcnZlckNvbmZpZyA9IChcbiAgaW5zdGFuY2VVcmw6IFVSTCxcbik6IFJlc3VsdEFzeW5jPFNlcnZlckNvbmZpZywgRXJyb3I+ID0+IHtcbiAgY29uc3Qgb3JpZ2luTWF0Y2hlcyA9IGluc3RhbmNlVXJsLmhyZWYubWF0Y2goXG4gICAgLyguKj8pXFwvPyg/OlxcL1tkcl17MX1cXC98bG9naW5cXC8/fGZpbGVzXFwvPykvLFxuICApO1xuXG4gIGNvbnN0IHVybE9yaWdpbiA9IG9yaWdpbk1hdGNoZXMgJiYgb3JpZ2luTWF0Y2hlc1sxXVxuICAgID8gb3JpZ2luTWF0Y2hlc1sxXVxuICAgIDogaW5zdGFuY2VVcmwub3JpZ2luO1xuXG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBmZXRjaCh1cmxPcmlnaW4gKyBcIi9hYm91dC9jb25maWdcIiksXG4gICAgKGVycm9yKSA9PlxuICAgICAgbmV3IENvbm5lY3Rpb25FcnJvcih1bmRlZmluZWQsIHtcbiAgICAgICAgY2F1c2U6IGVuc3VyZUVycm9yKGVycm9yKSxcbiAgICAgIH0pLFxuICApLmFuZFRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICAgIHJlc3BvbnNlLmpzb24oKSxcbiAgICAgICAgKGVycm9yKSA9PiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZXJyQXN5bmMoXG4gICAgICAgIG5ldyBTZXJ2ZXJFcnJvcih1bmRlZmluZWQsIHsgY29udGV4dDogcmVzcG9uc2Uuc3RhdHVzVGV4dCB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0Rlbm9SdW50aW1lID0gKCk6IGJvb2xlYW4gPT4gdHlwZW9mIERlbm8gIT09IFwidW5kZWZpbmVkXCI7XG5cbmV4cG9ydCBjb25zdCBpc1NlY3VyZUNvbnRleHQgPSAoKTogYm9vbGVhbiA9PiB7XG4gIHJldHVybiBpc0Rlbm9SdW50aW1lKCkgfHwgZ2xvYmFsVGhpcy5pc1NlY3VyZUNvbnRleHQgfHxcbiAgICBnbG9iYWxUaGlzLmxvY2F0aW9uLnByb3RvY29sID09PSBcImh0dHBzOlwiO1xufTtcblxuZXhwb3J0IGNvbnN0IHdvcmtlclVybCA9IChyZWxhdGl2ZVBhdGg6IHN0cmluZyk6IFVSTCA9PiB7XG4gIHJldHVybiBpc0Rlbm9SdW50aW1lKClcbiAgICA/IG5ldyBVUkwoYC4vd29ya2VyLyR7cmVsYXRpdmVQYXRofS50c2AsIG5ldyBVUkwoXCIuXCIsIGltcG9ydC5tZXRhLnVybCkuaHJlZilcbiAgICA6IG5ldyBVUkwoXG4gICAgICBpbXBvcnQubWV0YS5yZXNvbHZlKFxuICAgICAgICBgLi8ke1xuICAgICAgICAgIHJlbGF0aXZlUGF0aCAhPT0gXCJlbmNyeXB0XCIgPyBgd29ya2VyLyR7cmVsYXRpdmVQYXRofWAgOiByZWxhdGl2ZVBhdGhcbiAgICAgICAgfS5qc2AsXG4gICAgICApLFxuICAgICk7XG59O1xuIiwgImltcG9ydCB7XG4gIERlY29kZSBhcyBiNjR1cmxkZWNvZGUsXG4gIEVuY29kZSBhcyBiNjR1cmxlbmNvZGUsXG59IGZyb20gXCJhcnJheWJ1ZmZlci1lbmNvZGluZy9iYXNlNjQvdXJsXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCB7IENyeXB0b0FsZ29yaXRobSB9IGZyb20gXCJ+L2VudW0vY3J5cHRvLWFsZ29yaXRobS50c1wiO1xuaW1wb3J0IHsgRGVjcnlwdGlvbkVycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2RlY3J5cHRpb24tZXJyb3IudHNcIjtcbmltcG9ydCB7IG9rQXN5bmMsIFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB7IGVuc3VyZUVycm9yIH0gZnJvbSBcIn4vdXRpbHMudHNcIjtcbmltcG9ydCB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBDcnlwdG9FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9jcnlwdG8tZXJyb3IudHNcIjtcbmltcG9ydCB7IEhhc2hpbmdFcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9oYXNoaW5nLWVycm9yLnRzXCI7XG5cbi8qKlxuICogRGVjcnlwdCBhbiBlbmNyeXB0ZWREYXRhIHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvblxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSBlbmNyeXB0ZWRcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBkZWNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgZW5jcnlwdGVkOiBFbmNyeXB0ZWREYXRhLFxuKTogUmVzdWx0QXN5bmM8QXJyYXlCdWZmZXIsIERlY3J5cHRpb25FcnJvcj4gPT4ge1xuICByZXR1cm4gaW1wb3J0S2V5KGtleSkuYW5kVGhlbigoaW1wb3J0ZWRLZXkpID0+XG4gICAgUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgICBjcnlwdG8uc3VidGxlLmRlY3J5cHQoXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiBcIkFFUy1HQ01cIixcbiAgICAgICAgICBpdjogZW5jcnlwdGVkLml2IGFzIFVpbnQ4QXJyYXksXG4gICAgICAgIH0sXG4gICAgICAgIGltcG9ydGVkS2V5LFxuICAgICAgICBlbmNyeXB0ZWQuZGF0YSBhcyBBcnJheUJ1ZmZlcixcbiAgICAgICksXG4gICAgICAoZXJyb3IpID0+IG5ldyBEZWNyeXB0aW9uRXJyb3IodW5kZWZpbmVkLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICAgKVxuICApO1xufTtcblxuLyoqXG4gKiBFbmNyeXB0IGFuIEFycmF5QnVmZmVyIGludG8gYW4gRW5jcnlwdGVkRGF0YSB1c2luZyB0aGUgcHJvdmlkZWQga2V5XG4gKiBAcGFyYW0ga2V5XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuKTogUmVzdWx0QXN5bmM8RW5jcnlwdGVkRGF0YSwgRW5jcnlwdGlvbkVycm9yPiA9PiB7XG4gIHJldHVybiBpbXBvcnRLZXkoa2V5KS5hbmRUaGVuKChpbXBvcnRlZEtleSkgPT4ge1xuICAgIGNvbnN0IGl2ID0gY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhuZXcgVWludDhBcnJheSgxMikpO1xuICAgIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICAgIGNyeXB0by5zdWJ0bGUuZW5jcnlwdChcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6IFwiQUVTLUdDTVwiLFxuICAgICAgICAgIGl2LFxuICAgICAgICB9LFxuICAgICAgICBpbXBvcnRlZEtleSxcbiAgICAgICAgdmFsdWUsXG4gICAgICApLFxuICAgICAgKGVycm9yKSA9PlxuICAgICAgICBuZXcgRW5jcnlwdGlvbkVycm9yKHVuZGVmaW5lZCwge1xuICAgICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICAgIH0pLFxuICAgICkuYW5kVGhlbigoZW5jcnlwdGVkKSA9PiB7XG4gICAgICByZXR1cm4gb2tBc3luYyh7XG4gICAgICAgIGFsZ286IENyeXB0b0FsZ29yaXRobS5XZWJDcnlwdG8sXG4gICAgICAgIGRhdGE6IGVuY3J5cHRlZCxcbiAgICAgICAgaXYsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHN0cmluZyBpbnRvIGEgQ3J5cHRvS2V5LCB1c2FibGUgaW4gV2ViIENyeXB0byBBUElcbiAqXG4gKiBAcGFyYW0ga2V5XG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaW1wb3J0S2V5ID0gKGtleTogc3RyaW5nKTogUmVzdWx0QXN5bmM8Q3J5cHRvS2V5LCBDcnlwdG9FcnJvcj4gPT4ge1xuICByZXR1cm4gUmVzdWx0QXN5bmMuZnJvbVByb21pc2UoXG4gICAgY3J5cHRvLnN1YnRsZS5pbXBvcnRLZXkoXG4gICAgICBcInJhd1wiLFxuICAgICAgYjY0dXJsZGVjb2RlKGtleSksXG4gICAgICB7IG5hbWU6IFwiQUVTLUdDTVwiIH0sXG4gICAgICBmYWxzZSxcbiAgICAgIFtcbiAgICAgICAgXCJlbmNyeXB0XCIsXG4gICAgICAgIFwiZGVjcnlwdFwiLFxuICAgICAgXSxcbiAgICApLFxuICAgIChlcnJvcikgPT5cbiAgICAgIG5ldyBDcnlwdG9FcnJvcihcIlVuYWJsZSB0byBpbXBvcnQgY3J5cHRvZ3JhcGh5IGtleVwiLCB7XG4gICAgICAgIGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvciksXG4gICAgICB9KSxcbiAgKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSByYW5kb20gc3RyaW5nIHVzaW5nIFdlYiBDcnlwdG8gQVBJLlxuICpcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBnZW5lcmF0ZUtleSA9ICgpOiBSZXN1bHRBc3luYzxzdHJpbmcsIENyeXB0b0Vycm9yPiA9PiB7XG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgY3J5cHRvLnN1YnRsZVxuICAgICAgICAuZ2VuZXJhdGVLZXkoXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogXCJBRVMtR0NNXCIsXG4gICAgICAgICAgICBsZW5ndGg6IDI1NixcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRydWUsXG4gICAgICAgICAgW1wiZW5jcnlwdFwiLCBcImRlY3J5cHRcIl0sXG4gICAgICAgIClcbiAgICAgICAgLnRoZW4oKGdlbmVyYXRlZEtleSkgPT5cbiAgICAgICAgICBjcnlwdG8uc3VidGxlXG4gICAgICAgICAgICAuZXhwb3J0S2V5KFwicmF3XCIsIGdlbmVyYXRlZEtleSlcbiAgICAgICAgICAgIC50aGVuKChrZXkpID0+IHJlc29sdmUoYjY0dXJsZW5jb2RlKGtleSkpKVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICByZWplY3QoXG4gICAgICAgICAgICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGJhc2U2NCBlbmNvZGUgdGhlIHVybFwiLCB7XG4gICAgICAgICAgICAgICAgICBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpLFxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3QoZXJyb3IpKVxuICAgICksXG4gICAgKGVycm9yKSA9PlxuICAgICAgbmV3IENyeXB0b0Vycm9yKFwiVW5hYmxlIHRvIGdlbmVyYXRlIGtleVwiLCB7IGNhdXNlOiBlbnN1cmVFcnJvcihlcnJvcikgfSksXG4gICk7XG59O1xuXG4vKipcbiAqIEhhc2ggYSBwYXNzd29yZCB1c2luZyBXZWJDcnlwdG8gQVBJXG4gKlxuICogQHBhcmFtIHBhc3N3b3JkXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaGFzaFBhc3N3b3JkID0gKFxuICBwYXNzd29yZDogc3RyaW5nLFxuKTogUmVzdWx0QXN5bmM8c3RyaW5nLCBIYXNoaW5nRXJyb3I+ID0+IHtcbiAgY29uc3QgcHJvbWlzZSA9IGFzeW5jICgpID0+IHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShcbiAgICAgIG5ldyBVaW50OEFycmF5KFxuICAgICAgICBhd2FpdCBjcnlwdG8uc3VidGxlLmRpZ2VzdChcbiAgICAgICAgICBcIlNIQS01MTJcIixcbiAgICAgICAgICBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUocGFzc3dvcmQpLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLm1hcCgoYikgPT4gYi50b1N0cmluZygxNikucGFkU3RhcnQoMiwgXCIwXCIpKS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIHJldHVybiBSZXN1bHRBc3luYy5mcm9tUHJvbWlzZShcbiAgICBwcm9taXNlKCksXG4gICAgKGVycm9yKSA9PiBuZXcgSGFzaGluZ0Vycm9yKHVuZGVmaW5lZCwgeyBjYXVzZTogZW5zdXJlRXJyb3IoZXJyb3IpIH0pLFxuICApO1xufTtcbiIsICJpbXBvcnQgeyBDcnlwdG9BbGdvcml0aG0gfSBmcm9tIFwifi9lbnVtL2NyeXB0by1hbGdvcml0aG0udHNcIjtcbmltcG9ydCB7IFJlc3VsdEFzeW5jIH0gZnJvbSBcIm5ldmVydGhyb3dcIjtcbmltcG9ydCB0eXBlIHsgQ3J5cHRvRXJyb3IgfSBmcm9tIFwifi9lcnJvci9jcnlwdG8vY3J5cHRvLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IERlY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9kZWNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyB0eXBlIEVuY3J5cHRlZERhdGEgfSBmcm9tIFwifi9pbnRlcmZhY2UvZW5jcnlwdGVkLWRhdGEudHNcIjtcbmltcG9ydCAqIGFzIHNqY2wgZnJvbSBcIn4vYXBpL2NyeXB0by9zamNsLnRzXCI7XG5pbXBvcnQgKiBhcyB3ZWIgZnJvbSBcIn4vYXBpL2NyeXB0by93ZWIudHNcIjtcbmltcG9ydCB0eXBlIHsgSGFzaGluZ0Vycm9yIH0gZnJvbSBcIn4vZXJyb3IvY3J5cHRvL2hhc2hpbmctZXJyb3IudHNcIjtcblxuLyoqXG4gKiBEZWNyeXB0IGFuIEVuY3J5cHRlZERhdGEgb2JqZWN0IHVzaW5nIHRoZSBrZXkgdXNlZCBmb3IgZW5jcnlwdGlvblxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGRlY3J5cHQgPSAoXG4gIGtleTogc3RyaW5nLFxuICB2YWx1ZTogRW5jcnlwdGVkRGF0YSxcbik6IFJlc3VsdEFzeW5jPEFycmF5QnVmZmVyLCBEZWNyeXB0aW9uRXJyb3I+ID0+XG4gIHZhbHVlLmFsZ28gPT09IHVuZGVmaW5lZCB8fCB2YWx1ZS5hbGdvID09PSBDcnlwdG9BbGdvcml0aG0uU2pjbFxuICAgID8gc2pjbC5kZWNyeXB0KGtleSwgdmFsdWUpXG4gICAgOiB3ZWIuZGVjcnlwdChrZXksIHZhbHVlKTtcblxuLyoqXG4gKiBFbmNyeXB0IGFuIEFycmF5QnVmZmVyIHVzaW5nIHRoZSBwcm92aWRlZCBrZXkgYW5kIGFsZ29yaXRobVxuICpcbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIGFsZ29cbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCBlbmNyeXB0ID0gKFxuICBrZXk6IHN0cmluZyxcbiAgdmFsdWU6IEFycmF5QnVmZmVyLFxuICBhbGdvOiBDcnlwdG9BbGdvcml0aG0sXG4pOiBSZXN1bHRBc3luYzxFbmNyeXB0ZWREYXRhLCBFbmNyeXB0aW9uRXJyb3I+ID0+XG4gIChhbGdvID09PSBDcnlwdG9BbGdvcml0aG0uU2pjbClcbiAgICA/IHNqY2wuZW5jcnlwdChrZXksIHZhbHVlKVxuICAgIDogd2ViLmVuY3J5cHQoa2V5LCB2YWx1ZSk7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBuZXcga2V5IGZvciBlbmNyeXB0aW9uL2RlY3J5cHRpb25cbiAqXG4gKiBAcGFyYW0gYWxnb1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlS2V5ID0gKFxuICBhbGdvID0gQ3J5cHRvQWxnb3JpdGhtLldlYkNyeXB0byxcbik6IFJlc3VsdEFzeW5jPHN0cmluZywgQ3J5cHRvRXJyb3I+ID0+XG4gIGFsZ28gPT09IENyeXB0b0FsZ29yaXRobS5TamNsID8gc2pjbC5nZW5lcmF0ZUtleSgpIDogd2ViLmdlbmVyYXRlS2V5KCk7XG5cbi8qKlxuICogSGFzaCBhIHBhc3N3b3JkIHVzaW5nIHRoZSBwcm92aWRlZCBhbGdvcml0aG1cbiAqXG4gKiBAcGFyYW0gcGFzc3dvcmRcbiAqIEBwYXJhbSBhbGdvXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgY29uc3QgaGFzaFBhc3N3b3JkID0gKFxuICBwYXNzd29yZDogc3RyaW5nLFxuICBhbGdvOiBDcnlwdG9BbGdvcml0aG0sXG4pOiBSZXN1bHRBc3luYzxzdHJpbmcsIEhhc2hpbmdFcnJvcj4gPT5cbiAgYWxnbyA9PT0gQ3J5cHRvQWxnb3JpdGhtLlNqY2xcbiAgICA/IHNqY2wuaGFzaFBhc3N3b3JkKHBhc3N3b3JkKVxuICAgIDogd2ViLmhhc2hQYXNzd29yZChwYXNzd29yZCk7XG4iLCAiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQgeyBXT1JLRVJfQUNUSU9OIH0gZnJvbSBcIn4vZW51bS93b3JrZXItYWN0aW9uLnRzXCI7XG5pbXBvcnQgdHlwZSB7IEx1ZmlGaWxlIH0gZnJvbSBcIn4vZW50aXRpZXMvbHVmaS1maWxlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckFjdGlvbk1lc3NhZ2UgfSBmcm9tIFwifi9pbnRlcmZhY2Uvd29ya2VyLWFjdGlvbi1tZXNzYWdlLnRzXCI7XG5pbXBvcnQgeyBFVkVOVCB9IGZyb20gXCJ+L2VudW0vZXZlbnQudHNcIjtcbmltcG9ydCB7IFVQTE9BRF9TVEFUVVMgfSBmcm9tIFwifi9lbnVtL2ZpbGUtc3RhdHVzLnRzXCI7XG5pbXBvcnQgdHlwZSB7IFdvcmtlckV2ZW50IH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1ldmVudC50c1wiO1xuXG5kZWNsYXJlIGxldCBzZWxmOiBXb3JrZXI7XG5cbmV4cG9ydCBjb25zdCBldmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbi8qKlxuICogVXBkYXRlIGZpbGUgaW4gd29ya2VycyBhbmQgcHJvdmlkZSBtb2RpZmljYXRpb25zIHRvIHRoZSBtYWluIHRocmVhZFxuICpcbiAqIEBwYXJhbSBsdWZpRmlsZVxuICogQHBhcmFtIGFyZ3NcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBjb25zdCB1cGRhdGVGaWxlID0gKGx1ZmlGaWxlOiBMdWZpRmlsZSwgYXJnczogUGFydGlhbDxMdWZpRmlsZT4pID0+IHtcbiAgT2JqZWN0LmFzc2lnbihsdWZpRmlsZSwgYXJncyk7XG5cbiAgaWYgKHR5cGVvZiBXb3JrZXJHbG9iYWxTY29wZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgZXZlbnQ6IEVWRU5ULkZJTEVfVVBEQVRFRCxcbiAgICAgIGx1ZmlGaWxlLFxuICAgIH0gYXMgV29ya2VyRXZlbnQpO1xuICB9XG5cbiAgcmV0dXJuIGx1ZmlGaWxlO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlbmRGaWxlRXJyb3IgPSAobHVmaUZpbGU6IEx1ZmlGaWxlLCBlcnJvcjogRXJyb3IpID0+IHtcbiAgdXBkYXRlRmlsZShsdWZpRmlsZSwgeyB1cGxvYWRTdGF0dXM6IFVQTE9BRF9TVEFUVVMuRkFJTEVEIH0pO1xuXG4gIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudDogRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IgfSBhcyBXb3JrZXJFdmVudCk7XG59O1xuXG4vKipcbiAqIEluaXQgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIGF0IHRoZSBiZWdpbm5pbmcgb2YgZWFjaCBjaGlsZCB3b3JrZXIncyBvbm1lc3NhZ2UgZXZlbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0ID0gKCkgPT4ge1xuICBldmVudHMub25jZShFVkVOVC5TT0NLRVRfT1BFTkVELCAoKSA9PiB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZSh7XG4gICAgICBldmVudDogRVZFTlQuU09DS0VUX09QRU5FRCxcbiAgICB9KTtcbiAgfSk7XG5cbiAgZXZlbnRzLm9uY2UoRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBldmVudDogRVZFTlQuT1BFUkFUSU9OX0ZBSUxFRCwgZXJyb3IgfSk7XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGlzV29ya2VyQWN0aW9uTWVzc2FnZSA9IChcbiAgLy8gZGVuby1saW50LWlnbm9yZSBuby1leHBsaWNpdC1hbnlcbiAgbWVzc2FnZTogYW55LFxuKTogbWVzc2FnZSBpcyBXb3JrZXJBY3Rpb25NZXNzYWdlID0+IHtcbiAgcmV0dXJuIChcbiAgICB0eXBlb2YgbWVzc2FnZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgIG1lc3NhZ2UgIT09IG51bGwgJiZcbiAgICBcImFjdGlvblwiIGluIG1lc3NhZ2UgJiZcbiAgICBPYmplY3QudmFsdWVzKFdPUktFUl9BQ1RJT04pLmluY2x1ZGVzKG1lc3NhZ2UuYWN0aW9uKVxuICApO1xufTtcbiIsICJpbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwifi9lcnJvci9iYXNlLWVycm9yLnRzXCI7XG5cbmV4cG9ydCBjbGFzcyBXb3JrZXJFcnJvciBleHRlbmRzIEJhc2VFcnJvciB7fVxuIiwgImltcG9ydCB7IFdvcmtlckVycm9yIH0gZnJvbSBcIn4vZXJyb3Ivd29ya2VyL3dvcmtlci1lcnJvci50c1wiO1xuXG5leHBvcnQgY2xhc3MgV29ya2VyVW5kZWZpbmVkUGFyYW1ldGVyRXJyb3IgZXh0ZW5kcyBXb3JrZXJFcnJvciB7XG4gIG92ZXJyaWRlIG1lc3NhZ2UgPSBcIlBhcmFtZXRlciBtdXN0IGJlIGRlZmluZWRcIjtcbn1cbiIsICJpbXBvcnQgeyBXb3JrZXJFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3dvcmtlci93b3JrZXItZXJyb3IudHNcIjtcblxuZXhwb3J0IGNsYXNzIFdvcmtlclVwbG9hZEFscmVhZHlGYWlsZWRFcnJvciBleHRlbmRzIFdvcmtlckVycm9yIHtcbiAgb3ZlcnJpZGUgbWVzc2FnZSA9IFwiRmlsZSB1cGxvYWQgYWxyZWFkeSBmYWlsZWRcIjtcbn1cbiIsICJpbXBvcnQgeyBlbmNyeXB0IH0gZnJvbSBcIn4vYXBpL2NyeXB0by50c1wiO1xuaW1wb3J0IHsgVVBMT0FEX1NUQVRVUyB9IGZyb20gXCJ+L2VudW0vZmlsZS1zdGF0dXMudHNcIjtcbmltcG9ydCB7IEVuY3J5cHRpb25FcnJvciB9IGZyb20gXCJ+L2Vycm9yL2NyeXB0by9lbmNyeXB0aW9uLWVycm9yLnRzXCI7XG5pbXBvcnQgeyBpbml0IH0gZnJvbSBcIn4vd29ya2VyL3NoYXJlZC50c1wiO1xuaW1wb3J0IHR5cGUgeyBXb3JrZXJBY3Rpb25NZXNzYWdlIH0gZnJvbSBcIn4vaW50ZXJmYWNlL3dvcmtlci1hY3Rpb24tbWVzc2FnZS50c1wiO1xuaW1wb3J0IHsgV29ya2VyVW5kZWZpbmVkUGFyYW1ldGVyRXJyb3IgfSBmcm9tIFwifi9lcnJvci93b3JrZXIvd29ya2VyLXVuZGVmaW5lZC1wYXJhbWV0ZXItZXJyb3IudHNcIjtcbmltcG9ydCB7IFdvcmtlclVwbG9hZEFscmVhZHlGYWlsZWRFcnJvciB9IGZyb20gXCJ+L2Vycm9yL3dvcmtlci93b3JrZXItdXBsb2FkLWFscmVhZHktZmFpbGVkLWVycm9yLnRzXCI7XG5cbmRlY2xhcmUgY29uc3Qgc2VsZjogV29ya2VyO1xuXG5sZXQgaXNJbml0aWF0ZWQgPSBmYWxzZTtcblxuc2VsZi5vbm1lc3NhZ2UgPSAoZXZlbnQ6IE1lc3NhZ2VFdmVudCkgPT4ge1xuICBpZiAoIWlzSW5pdGlhdGVkKSB7XG4gICAgaW5pdCgpO1xuICAgIGlzSW5pdGlhdGVkID0gdHJ1ZTtcbiAgfVxuXG4gIGNvbnN0IHsgbHVmaUZpbGUsIGNodW5rLCBhbGdvIH0gPSAoZXZlbnQuZGF0YSBhcyBXb3JrZXJBY3Rpb25NZXNzYWdlKS5hcmdzO1xuXG4gIGlmIChjaHVuayAmJiB0eXBlb2YgYWxnbyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGlmIChsdWZpRmlsZS51cGxvYWRTdGF0dXMgIT09IFVQTE9BRF9TVEFUVVMuRkFJTEVEKSB7XG4gICAgICBlbmNyeXB0KGx1ZmlGaWxlLmtleXMuY2xpZW50LCBjaHVuay5idWZmZXIsIGFsZ28pXG4gICAgICAgIC5tYXAoKGVuY3J5cHRlZERhdGEpID0+IHtcbiAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHsgZW5jcnlwdGVkRGF0YSwgY2h1bmtJbmRleDogY2h1bmsuaW5kZXggfSwgW1xuICAgICAgICAgICAgdHlwZW9mIGVuY3J5cHRlZERhdGEuZGF0YSA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgICA/IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShlbmNyeXB0ZWREYXRhLmRhdGEpLmJ1ZmZlclxuICAgICAgICAgICAgICA6IGVuY3J5cHRlZERhdGEuZGF0YSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm1hcEVycigoZXJyb3I6IEVuY3J5cHRpb25FcnJvcikgPT4ge1xuICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2UoeyBlcnJvciB9KTtcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBlcnJvcjogbmV3IFdvcmtlclVwbG9hZEFscmVhZHlGYWlsZWRFcnJvcihcIkZpbGUgdXBsb2FkIGFscmVhZHkgZmFpbGVkXCIpLFxuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghY2h1bmspIHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xuICAgICAgICBlcnJvcjogbmV3IFdvcmtlclVuZGVmaW5lZFBhcmFtZXRlckVycm9yKFxuICAgICAgICAgIFwiY2h1bmsgYnVmZmVyIG11c3QgYmUgZGVmaW5lZFwiLFxuICAgICAgICApLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhbGdvID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgZXJyb3I6IG5ldyBXb3JrZXJVbmRlZmluZWRQYXJhbWV0ZXJFcnJvcihcImFsZ28gbXVzdCBiZSBkZWZpbmVkXCIpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBYSxRQUFJQSxRQUFLLEVBQUMsUUFBTyxDQUFDLEdBQUUsTUFBSyxDQUFDLEdBQUUsYUFBWSxDQUFDLEdBQUUsTUFBSyxDQUFDLEdBQUUsTUFBSyxDQUFDLEdBQUUsT0FBTSxDQUFDLEdBQUUsV0FBVSxFQUFDLFNBQVEsU0FBUyxHQUFFO0FBQUMsV0FBSyxXQUFTLFdBQVU7QUFBQyxlQUFNLGNBQVksS0FBSztBQUFBLE1BQU87QUFBRSxXQUFLLFVBQVE7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUU7QUFBQyxXQUFLLFdBQVMsV0FBVTtBQUFDLGVBQU0sY0FBWSxLQUFLO0FBQUEsTUFBTztBQUFFLFdBQUssVUFBUTtBQUFBLElBQUMsR0FBRSxLQUFJLFNBQVMsR0FBRTtBQUFDLFdBQUssV0FBUyxXQUFVO0FBQUMsZUFBTSxVQUFRLEtBQUs7QUFBQSxNQUFPO0FBQUUsV0FBSyxVQUFRO0FBQUEsSUFBQyxHQUFFLFVBQVMsU0FBUyxHQUFFO0FBQUMsV0FBSyxXQUFTLFdBQVU7QUFBQyxlQUFNLGdCQUFjLEtBQUs7QUFBQSxNQUFPO0FBQUUsV0FBSyxVQUFRO0FBQUEsSUFBQyxFQUFDLEVBQUM7QUFDM2MsSUFBQUEsTUFBSyxPQUFPLE1BQUksU0FBUyxHQUFFO0FBQUMsV0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFHLEtBQUssRUFBRTtBQUFFLFVBQUksR0FBRSxHQUFFLEdBQUUsR0FBRSxJQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLElBQUUsS0FBSyxFQUFFLENBQUM7QUFBRSxVQUFFLEVBQUU7QUFBTyxVQUFJLElBQUU7QUFBRSxVQUFHLE1BQUksS0FBRyxNQUFJLEtBQUcsTUFBSSxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsc0JBQXNCO0FBQUUsV0FBSyxJQUFFLENBQUMsSUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLElBQUUsSUFBRyxLQUFJO0FBQUMsWUFBRSxFQUFFLElBQUUsQ0FBQztBQUFFLFlBQUcsTUFBSSxJQUFFLEtBQUcsTUFBSSxLQUFHLE1BQUksSUFBRSxFQUFFLEtBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEdBQUcsS0FBRyxLQUFHLEVBQUUsS0FBRyxJQUFFLEdBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLEdBQUUsTUFBSSxJQUFFLE1BQUksSUFBRSxLQUFHLElBQUUsTUFBSSxLQUFHLEtBQUcsSUFBRyxJQUFFLEtBQUcsSUFBRSxPQUFLLEtBQUc7QUFBSSxVQUFFLENBQUMsSUFBRSxFQUFFLElBQUUsQ0FBQyxJQUFFO0FBQUEsTUFBQztBQUFDLFdBQUksSUFBRSxHQUFFLEdBQUUsS0FBSSxJQUFJLEtBQUUsRUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxLQUFHLEtBQUcsSUFBRSxJQUFFLElBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxNQUFJLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsSUFDM2YsR0FBRyxDQUFDO0FBQUEsSUFBQztBQUNMLElBQUFBLE1BQUssT0FBTyxJQUFJLFlBQVUsRUFBQyxTQUFRLFNBQVMsR0FBRTtBQUFDLGFBQU8sR0FBRyxNQUFLLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRTtBQUFDLGFBQU8sR0FBRyxNQUFLLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxHQUFFLENBQUMsR0FBRSxDQUFDLEdBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRSxHQUFFLFdBQVU7QUFBQyxVQUFJLElBQUUsS0FBSyxFQUFFLENBQUMsR0FBRSxJQUFFLEtBQUssRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsQ0FBQyxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsTUFBTSxHQUFFLElBQUksSUFBRyxFQUFFLENBQUMsSUFBRSxLQUFHLElBQUUsT0FBSyxLQUFHLE1BQUksQ0FBQyxJQUFFO0FBQUUsV0FBSSxJQUFFLElBQUUsR0FBRSxDQUFDLEVBQUUsQ0FBQyxHQUFFLEtBQUcsS0FBRyxHQUFFLElBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHLElBQUUsS0FBRyxJQUFFLEtBQUcsSUFBRSxLQUFHLEdBQUUsSUFBRSxLQUFHLElBQUUsSUFBRSxNQUFJLElBQUcsRUFBRSxDQUFDLElBQUUsR0FBRSxFQUFFLENBQUMsSUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUUsSUFBRSxXQUFVLElBQUUsUUFBUSxJQUFFLE1BQU0sSUFBRSxXQUFVLEdBQUUsSUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFFLFdBQVUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksR0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLEtBQUcsTUFBSTtBQUFFLFdBQUksSUFDbGdCLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDO0FBQUEsSUFBQyxFQUFDO0FBQ2hELGFBQVMsR0FBRyxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUcsTUFBSSxFQUFFLE9BQU8sT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSx3QkFBd0I7QUFBRSxVQUFJLElBQUUsRUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxJQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxHQUFFLEdBQUUsR0FBRSxJQUFFLEVBQUUsU0FBTyxJQUFFLEdBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsR0FBRSxHQUFFLENBQUM7QUFBRSxVQUFFLEVBQUUsRUFBRSxDQUFDO0FBQUUsVUFBRSxFQUFFLENBQUM7QUFBRSxVQUFJLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksS0FBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsTUFBSSxFQUFFLElBQUUsRUFBRSxLQUFHLEtBQUcsR0FBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLE1BQUksRUFBRSxJQUFFLEVBQUUsS0FBRyxLQUFHLEdBQUcsSUFBRSxFQUFFLEtBQUcsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLEdBQUcsSUFBRSxFQUFFLElBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxNQUFJLEVBQUUsSUFBRSxFQUFFLEtBQUcsS0FBRyxHQUFHLElBQUUsRUFBRSxLQUFHLElBQUUsR0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxLQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFO0FBQUUsV0FBSSxJQUNyZixHQUFFLElBQUUsR0FBRSxJQUFJLEdBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxDQUFDLElBQUUsRUFBRSxNQUFJLEVBQUUsS0FBRyxLQUFHLEVBQUUsS0FBRyxLQUFHLEdBQUcsS0FBRyxLQUFHLEVBQUUsS0FBRyxJQUFFLEdBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxHQUFHLElBQUUsRUFBRSxHQUFHLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUU7QUFBRSxhQUFPO0FBQUEsSUFBQztBQUNoSCxJQUFBQSxNQUFLLFdBQVMsRUFBQyxVQUFTLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFFQSxNQUFLLFNBQVMsRUFBRSxFQUFFLE1BQU0sSUFBRSxFQUFFLEdBQUUsTUFBSSxJQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7QUFBRSxhQUFPLFdBQVMsSUFBRSxJQUFFQSxNQUFLLFNBQVMsTUFBTSxHQUFFLElBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsS0FBSyxNQUFNLENBQUMsSUFBRSxJQUFFLEVBQUU7QUFBRSxlQUFRLElBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxFQUFFLElBQUUsS0FBRyxDQUFDLEtBQUcsS0FBRyxJQUFFLEVBQUUsSUFBRSxLQUFHLElBQUUsQ0FBQyxNQUFJLElBQUUsRUFBRSxJQUFFLEtBQUcsQ0FBQyxNQUFJLE1BQUksS0FBRyxLQUFHO0FBQUEsSUFBQyxHQUFFLFFBQU8sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHLE1BQUksRUFBRSxVQUFRLE1BQUksRUFBRSxPQUFPLFFBQU8sRUFBRSxPQUFPLENBQUM7QUFBRSxVQUFJLElBQUUsRUFBRSxFQUFFLFNBQU8sQ0FBQyxHQUFFLElBQUVBLE1BQUssU0FBUyxXQUFXLENBQUM7QUFBRSxhQUFPLE9BQUssSUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFFQSxNQUFLLFNBQVMsRUFBRSxHQUFFLEdBQUUsSUFBRSxHQUFFLEVBQUUsTUFBTSxHQUFFLEVBQUUsU0FBTyxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsV0FBVSxTQUFTLEdBQUU7QUFBQyxVQUFJLElBQUUsRUFBRTtBQUFPLGFBQU8sTUFDMWYsSUFBRSxJQUFFLE1BQUksSUFBRSxLQUFHQSxNQUFLLFNBQVMsV0FBVyxFQUFFLElBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQyxHQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHLEtBQUcsRUFBRSxTQUFPLEVBQUUsUUFBTztBQUFFLFVBQUUsRUFBRSxNQUFNLEdBQUUsS0FBSyxLQUFLLElBQUUsRUFBRSxDQUFDO0FBQUUsVUFBSSxJQUFFLEVBQUU7QUFBTyxVQUFFLElBQUU7QUFBRyxVQUFFLEtBQUcsTUFBSSxFQUFFLElBQUUsQ0FBQyxJQUFFQSxNQUFLLFNBQVMsUUFBUSxHQUFFLEVBQUUsSUFBRSxDQUFDLElBQUUsY0FBWSxJQUFFLEdBQUUsQ0FBQztBQUFHLGFBQU87QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsYUFBTyxPQUFLLElBQUUsS0FBRyxJQUFFLElBQUUsSUFBRSxLQUFHLEtBQUcsS0FBRyxnQkFBYztBQUFBLElBQUMsR0FBRSxZQUFXLFNBQVMsR0FBRTtBQUFDLGFBQU8sS0FBSyxNQUFNLElBQUUsYUFBYSxLQUFHO0FBQUEsSUFBRSxHQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUU7QUFBQyxVQUFHQSxNQUFLLFNBQVMsVUFBVSxDQUFDLE1BQUlBLE1BQUssU0FBUyxVQUFVLENBQUMsRUFBRSxRQUFNO0FBQUcsVUFBSSxJQUFFLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLE1BQUcsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUUsYUFBTyxNQUNsZjtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUk7QUFBRSxVQUFFO0FBQUUsV0FBSSxXQUFTLE1BQUksSUFBRSxDQUFDLElBQUcsTUFBSSxHQUFFLEtBQUcsR0FBRyxHQUFFLEtBQUssQ0FBQyxHQUFFLElBQUU7QUFBRSxVQUFHLE1BQUksRUFBRSxRQUFPLEVBQUUsT0FBTyxDQUFDO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBSSxHQUFFLEtBQUssSUFBRSxFQUFFLENBQUMsTUFBSSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsS0FBRyxLQUFHO0FBQUUsVUFBRSxFQUFFLFNBQU8sRUFBRSxFQUFFLFNBQU8sQ0FBQyxJQUFFO0FBQUUsVUFBRUEsTUFBSyxTQUFTLFdBQVcsQ0FBQztBQUFFLFFBQUUsS0FBS0EsTUFBSyxTQUFTLFFBQVEsSUFBRSxJQUFFLElBQUcsS0FBRyxJQUFFLElBQUUsSUFBRSxFQUFFLElBQUksR0FBRSxDQUFDLENBQUM7QUFBRSxhQUFPO0FBQUEsSUFBQyxHQUFFLEdBQUUsU0FBUyxHQUFFLEdBQUU7QUFBQyxhQUFNLENBQUMsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLEdBQUUsRUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsV0FBVSxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxFQUFFLEVBQUUsS0FBRSxFQUFFLENBQUMsR0FBRSxFQUFFLENBQUMsSUFBRSxNQUFJLEtBQUcsTUFBSSxJQUFFLFNBQVEsSUFBRSxVQUFTLElBQUUsS0FBRztBQUFHLGFBQU87QUFBQSxJQUFDLEVBQUM7QUFDcGQsSUFBQUEsTUFBSyxNQUFNLGFBQVcsRUFBQyxVQUFTLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRSxJQUFHLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUMsR0FBRSxHQUFFO0FBQUUsV0FBSSxJQUFFLEdBQUUsSUFBRSxJQUFFLEdBQUUsSUFBSSxRQUFLLElBQUUsT0FBSyxJQUFFLEVBQUUsSUFBRSxDQUFDLElBQUcsS0FBRyxPQUFPLGFBQWEsTUFBSSxNQUFJLE1BQUksQ0FBQyxHQUFFLE1BQUk7QUFBRSxhQUFPLG1CQUFtQixPQUFPLENBQUMsQ0FBQztBQUFBLElBQUMsR0FBRSxRQUFPLFNBQVMsR0FBRTtBQUFDLFVBQUUsU0FBUyxtQkFBbUIsQ0FBQyxDQUFDO0FBQUUsVUFBSSxJQUFFLENBQUMsR0FBRSxHQUFFLElBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLEtBQUUsS0FBRyxJQUFFLEVBQUUsV0FBVyxDQUFDLEdBQUUsT0FBSyxJQUFFLE9BQUssRUFBRSxLQUFLLENBQUMsR0FBRSxJQUFFO0FBQUcsVUFBRSxLQUFHLEVBQUUsS0FBS0EsTUFBSyxTQUFTLFFBQVEsS0FBRyxJQUFFLElBQUcsQ0FBQyxDQUFDO0FBQUUsYUFBTztBQUFBLElBQUMsRUFBQztBQUNwWixJQUFBQSxNQUFLLE1BQU0sTUFBSSxFQUFDLFVBQVMsU0FBUyxHQUFFO0FBQUMsVUFBSSxJQUFFLElBQUc7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLFFBQUssRUFBRSxDQUFDLElBQUUsS0FBRyxpQkFBZ0IsU0FBUyxFQUFFLEVBQUUsT0FBTyxDQUFDO0FBQUUsYUFBTyxFQUFFLE9BQU8sR0FBRUEsTUFBSyxTQUFTLFVBQVUsQ0FBQyxJQUFFLENBQUM7QUFBQSxJQUFDLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxVQUFJLEdBQUUsSUFBRSxDQUFDLEdBQUU7QUFBRSxVQUFFLEVBQUUsUUFBUSxVQUFTLEVBQUU7QUFBRSxVQUFFLEVBQUU7QUFBTyxVQUFFLElBQUU7QUFBVyxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEVBQUUsR0FBRSxLQUFLLFNBQVMsRUFBRSxPQUFPLEdBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBRSxDQUFDO0FBQUUsYUFBT0EsTUFBSyxTQUFTLE1BQU0sR0FBRSxJQUFFLENBQUM7QUFBQSxJQUFDLEVBQUM7QUFDOVYsSUFBQUEsTUFBSyxNQUFNLFNBQU8sRUFBQyxHQUFFLG9FQUFtRSxVQUFTLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxVQUFJLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRUEsTUFBSyxNQUFNLE9BQU8sR0FBRSxJQUFFLEdBQUUsSUFBRUEsTUFBSyxTQUFTLFVBQVUsQ0FBQztBQUFFLFlBQUksSUFBRSxFQUFFLE9BQU8sR0FBRSxFQUFFLElBQUU7QUFBTSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsU0FBTyxJQUFHLE1BQUcsRUFBRSxRQUFRLElBQUUsRUFBRSxDQUFDLE1BQUksT0FBSyxFQUFFLEdBQUUsSUFBRSxLQUFHLElBQUUsRUFBRSxDQUFDLEtBQUcsSUFBRSxHQUFFLEtBQUcsSUFBRyxRQUFNLE1BQUksR0FBRSxLQUFHO0FBQUcsYUFBSyxFQUFFLFNBQU8sS0FBRyxDQUFDLElBQUcsTUFBRztBQUFJLGFBQU87QUFBQSxJQUFDLEdBQUUsUUFBTyxTQUFTLEdBQUUsR0FBRTtBQUFDLFVBQUUsRUFBRSxRQUFRLFNBQVEsRUFBRTtBQUFFLFVBQUksSUFBRSxDQUFDLEdBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRUEsTUFBSyxNQUFNLE9BQU8sR0FBRSxJQUFFLEdBQUU7QUFBRSxZQUFJLElBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxJQUFFO0FBQU0sV0FBSSxJQUFFLEdBQUUsSUFBRSxFQUFFLFFBQU8sS0FBSTtBQUFDLFlBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDdGYsWUFBRyxJQUFFLEVBQUUsT0FBTSxJQUFJQSxNQUFLLFVBQVUsUUFBUSxvQkFBb0I7QUFBRSxhQUFHLEtBQUcsS0FBRyxJQUFHLEVBQUUsS0FBSyxJQUFFLE1BQUksQ0FBQyxHQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksS0FBRyxHQUFFLEtBQUcsS0FBRyxLQUFHO0FBQUEsTUFBRTtBQUFDLFVBQUUsTUFBSSxFQUFFLEtBQUtBLE1BQUssU0FBUyxRQUFRLElBQUUsSUFBRyxHQUFFLENBQUMsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFDLEVBQUM7QUFBRSxJQUFBQSxNQUFLLE1BQU0sWUFBVSxFQUFDLFVBQVMsU0FBUyxHQUFFO0FBQUMsYUFBT0EsTUFBSyxNQUFNLE9BQU8sU0FBUyxHQUFFLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxRQUFPLFNBQVMsR0FBRTtBQUFDLGFBQU9BLE1BQUssTUFBTSxPQUFPLE9BQU8sR0FBRSxDQUFDO0FBQUEsSUFBQyxFQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLFNBQU8sU0FBUyxHQUFFO0FBQUMsV0FBSyxFQUFFLENBQUMsS0FBRyxLQUFLLEVBQUU7QUFBRSxXQUFHLEtBQUssSUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsS0FBSyxJQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxLQUFLLElBQUUsRUFBRSxLQUFHLEtBQUssTUFBTTtBQUFBLElBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssT0FBTyxPQUFLLFNBQVMsR0FBRTtBQUFDLGFBQU8sSUFBSUEsTUFBSyxLQUFLLFNBQVEsT0FBTyxDQUFDLEVBQUUsU0FBUztBQUFBLElBQUM7QUFDeGdCLElBQUFBLE1BQUssS0FBSyxPQUFPLFlBQVUsRUFBQyxXQUFVLEtBQUksT0FBTSxXQUFVO0FBQUMsV0FBSyxJQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxtQkFBVyxPQUFPLE1BQUksSUFBRUEsTUFBSyxNQUFNLFdBQVcsT0FBTyxDQUFDO0FBQUcsVUFBSSxHQUFFLElBQUUsS0FBSyxJQUFFQSxNQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUUsQ0FBQztBQUFFLFVBQUUsS0FBSztBQUFFLFVBQUUsS0FBSyxJQUFFLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUM7QUFBRSxVQUFHLG1CQUFpQixFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEscUNBQXFDO0FBQUUsVUFBRyxnQkFBYyxPQUFPLGFBQVk7QUFBQyxZQUFJLElBQUUsSUFBSSxZQUFZLENBQUMsR0FBRSxJQUFFO0FBQUUsYUFBSSxJQUFFLE1BQUksS0FBRyxNQUFJLElBQUUsTUFBTyxLQUFHLEdBQUUsS0FBRyxJQUFJLE1BQUssRUFBRSxFQUFFO0FBQUEsVUFBUyxLQUFHO0FBQUEsVUFDdGYsTUFBSSxJQUFFO0FBQUEsUUFBRSxDQUFDLEdBQUUsS0FBRztBQUFFLFVBQUUsT0FBTyxHQUFFLEtBQUcsQ0FBQztBQUFBLE1BQUMsTUFBTSxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksSUFBRSxNQUFPLEtBQUcsR0FBRSxLQUFHLElBQUksTUFBSyxFQUFFLEVBQUUsT0FBTyxHQUFFLEVBQUUsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsVUFBUyxXQUFVO0FBQUMsVUFBSSxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUVBLE1BQUssU0FBUyxPQUFPLEdBQUUsQ0FBQ0EsTUFBSyxTQUFTLFFBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUFFLFdBQUksSUFBRSxFQUFFLFNBQU8sR0FBRSxJQUFFLElBQUcsSUFBSSxHQUFFLEtBQUssQ0FBQztBQUFFLFFBQUUsS0FBSyxLQUFLLE1BQU0sS0FBSyxJQUFFLFVBQVcsQ0FBQztBQUFFLFdBQUksRUFBRSxLQUFLLEtBQUssSUFBRSxDQUFDLEdBQUUsRUFBRSxTQUFRLE1BQUssRUFBRSxFQUFFLE9BQU8sR0FBRSxFQUFFLENBQUM7QUFBRSxXQUFLLE1BQU07QUFBRSxhQUFPO0FBQUEsSUFBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEdBQUUsQ0FBQyxHQUFFLEdBQUUsV0FBVTtBQUFDLGVBQVMsRUFBRUMsSUFBRTtBQUFDLGVBQU8sY0FBYUEsS0FBRSxLQUFLLE1BQU1BLEVBQUMsS0FBRztBQUFBLE1BQUM7QUFBQyxlQUFRLElBQUUsR0FBRSxJQUFFLEdBQUUsR0FBRSxHQUFFLEtBQUcsR0FBRSxLQUFJO0FBQUMsWUFBRTtBQUFHLGFBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxHQUFFLElBQUksS0FBRyxNQUFJLElBQUUsR0FBRTtBQUFDLGNBQ3pmO0FBQUc7QUFBQSxRQUFLO0FBQUMsY0FBSSxJQUFFLE1BQUksS0FBSyxFQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLEdBQUUsQ0FBQyxJQUFHLEtBQUssRUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxJQUFFLENBQUMsQ0FBQyxHQUFFO0FBQUEsTUFBSTtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLFVBQUksR0FBRSxHQUFFLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQztBQUFFLFdBQUksSUFBRSxHQUFFLEtBQUcsR0FBRSxJQUFJLE1BQUcsSUFBRSxJQUFFLEVBQUUsQ0FBQyxLQUFHLElBQUUsRUFBRSxJQUFFLElBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEtBQUcsRUFBRSxHQUFFLElBQUUsRUFBRSxJQUFFLEVBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksSUFBRSxLQUFHLEtBQUcsS0FBRyxPQUFLLE1BQUksS0FBRyxNQUFJLEtBQUcsTUFBSSxLQUFHLEtBQUcsS0FBRyxLQUFHLE1BQUksRUFBRSxJQUFFLEVBQUUsSUFBRSxFQUFFLElBQUUsSUFBRSxFQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEtBQUcsTUFBSSxJQUFFLEtBQUcsSUFBRSxNQUFJLEVBQUUsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxLQUFHLElBQUUsSUFBRSxLQUFHLElBQUUsT0FBSyxNQUFJLElBQUUsTUFBSSxLQUFHLE1BQUksS0FBRyxLQUFHLEtBQUcsS0FBRyxLQUFHLEtBQUcsTUFBSTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQ3BmO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsRUFBRSxDQUFDLElBQUUsSUFBRTtBQUFBLElBQUMsRUFBQztBQUFFLElBQUFELE1BQUssS0FBSyxTQUFPLFNBQVMsR0FBRTtBQUFDLFdBQUssRUFBRSxDQUFDLEtBQUcsS0FBSyxFQUFFO0FBQUUsV0FBRyxLQUFLLElBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxHQUFFLEtBQUssSUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEdBQUUsS0FBSyxJQUFFLEVBQUUsS0FBRyxLQUFLLE1BQU07QUFBQSxJQUFDO0FBQUUsSUFBQUEsTUFBSyxLQUFLLE9BQU8sT0FBSyxTQUFTLEdBQUU7QUFBQyxhQUFPLElBQUlBLE1BQUssS0FBSyxTQUFRLE9BQU8sQ0FBQyxFQUFFLFNBQVM7QUFBQSxJQUFDO0FBQy9TLElBQUFBLE1BQUssS0FBSyxPQUFPLFlBQVUsRUFBQyxXQUFVLE1BQUssT0FBTSxXQUFVO0FBQUMsV0FBSyxJQUFFLEtBQUssRUFBRSxNQUFNLENBQUM7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsUUFBTyxTQUFTLEdBQUU7QUFBQyxtQkFBVyxPQUFPLE1BQUksSUFBRUEsTUFBSyxNQUFNLFdBQVcsT0FBTyxDQUFDO0FBQUcsVUFBSSxHQUFFLElBQUUsS0FBSyxJQUFFQSxNQUFLLFNBQVMsT0FBTyxLQUFLLEdBQUUsQ0FBQztBQUFFLFVBQUUsS0FBSztBQUFFLFVBQUUsS0FBSyxJQUFFLElBQUVBLE1BQUssU0FBUyxVQUFVLENBQUM7QUFBRSxVQUFHLG1CQUFpQixFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEscUNBQXFDO0FBQUUsVUFBRyxnQkFBYyxPQUFPLGFBQVk7QUFBQyxZQUFJLElBQUUsSUFBSSxZQUFZLENBQUMsR0FBRSxJQUFFO0FBQUUsYUFBSSxJQUFFLE9BQUssS0FBRyxPQUFLLElBQUUsT0FBTSxLQUFHLEdBQUUsS0FBRyxLQUFLLE1BQUssRUFBRSxFQUFFLFNBQVMsS0FDdGYsR0FBRSxNQUFJLElBQUUsRUFBRSxDQUFDLEdBQUUsS0FBRztBQUFFLFVBQUUsT0FBTyxHQUFFLEtBQUcsQ0FBQztBQUFBLE1BQUMsTUFBTSxNQUFJLElBQUUsT0FBSyxLQUFHLE9BQUssSUFBRSxPQUFNLEtBQUcsR0FBRSxLQUFHLEtBQUssTUFBSyxFQUFFLEVBQUUsT0FBTyxHQUFFLEVBQUUsQ0FBQztBQUFFLGFBQU87QUFBQSxJQUFJLEdBQUUsVUFBUyxXQUFVO0FBQUMsVUFBSSxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUUsS0FBSyxHQUFFLElBQUVBLE1BQUssU0FBUyxPQUFPLEdBQUUsQ0FBQ0EsTUFBSyxTQUFTLFFBQVEsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUFFLFdBQUksSUFBRSxFQUFFLFNBQU8sR0FBRSxJQUFFLElBQUcsSUFBSSxHQUFFLEtBQUssQ0FBQztBQUFFLFFBQUUsS0FBSyxDQUFDO0FBQUUsUUFBRSxLQUFLLENBQUM7QUFBRSxRQUFFLEtBQUssS0FBSyxNQUFNLEtBQUssSUFBRSxVQUFXLENBQUM7QUFBRSxXQUFJLEVBQUUsS0FBSyxLQUFLLElBQUUsQ0FBQyxHQUFFLEVBQUUsU0FBUSxNQUFLLEVBQUUsRUFBRSxPQUFPLEdBQUUsRUFBRSxDQUFDO0FBQUUsV0FBSyxNQUFNO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxHQUFFLENBQUMsR0FBRSxJQUFHLENBQUMsVUFBUyxVQUFTLFNBQVEsU0FBUSxVQUFTLFNBQVEsU0FBUSxPQUFPLEdBQUUsR0FBRSxDQUFDLEdBQUUsSUFBRztBQUFBLE1BQUM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUNsZjtBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFPO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFPO0FBQUEsTUFBTztBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVE7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQ3BmO0FBQUEsTUFBUztBQUFBLE1BQVM7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxNQUFTO0FBQUEsTUFBUTtBQUFBLE1BQU87QUFBQSxNQUFTO0FBQUEsTUFBUztBQUFBLE1BQVE7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQVM7QUFBQSxJQUFPLEdBQUUsR0FBRSxXQUFVO0FBQUMsZUFBUyxFQUFFQyxJQUFFO0FBQUMsZUFBTyxjQUFhQSxLQUFFLEtBQUssTUFBTUEsRUFBQyxLQUFHO0FBQUEsTUFBQztBQUFDLGVBQVMsRUFBRUEsSUFBRTtBQUFDLGVBQU8saUJBQWVBLEtBQUUsS0FBSyxNQUFNQSxFQUFDLEtBQUc7QUFBQSxNQUFHO0FBQUMsZUFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEdBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUU7QUFBRyxhQUFJLElBQUUsR0FBRSxJQUFFLEtBQUcsR0FBRSxJQUFJLEtBQUcsTUFBSSxJQUFFLEdBQUU7QUFBQyxjQUFFO0FBQUc7QUFBQSxRQUFLO0FBQUMsY0FBSSxJQUFFLE1BQUksS0FBSyxFQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsR0FBRSxDQUFDLEdBQUUsS0FBSyxFQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsRUFBRSxLQUFLLElBQUksR0FBRSxHQUFFLENBQUMsS0FBRyxLQUFHLEtBQUssR0FBRyxDQUFDLElBQUcsS0FBSyxFQUFFLElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEdBQUUsSUFBRSxDQUFDLENBQUMsR0FBRSxLQUFLLEVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxFQUFFLEtBQUssSUFBSSxHQUFFLElBQUUsQ0FBQyxDQUFDLEtBQUcsS0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFFO0FBQUEsTUFBSTtBQUFBLElBQUMsR0FBRSxHQUFFLFNBQVMsR0FBRTtBQUFDLFVBQUksR0FDdmdCLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxLQUFLLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsQ0FBQyxHQUFFLElBQUUsRUFBRSxDQUFDLEdBQUUsSUFBRSxFQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLElBQUUsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsRUFBRSxHQUFFLEtBQUcsRUFBRSxFQUFFLEdBQUUsSUFBRSxFQUFFLEVBQUUsR0FBRTtBQUFFLFVBQUcsZ0JBQWMsT0FBTyxhQUFZO0FBQUMsWUFBRSxNQUFNLEdBQUc7QUFBRSxpQkFBUSxJQUFFLEdBQUUsS0FBRyxHQUFFLElBQUksR0FBRSxDQUFDLElBQUUsRUFBRSxDQUFDO0FBQUEsTUFBQyxNQUFNLEtBQUU7QUFBRSxVQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsR0FBRSxJQUFFLEdBQUUsSUFBRSxJQUFHLElBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxLQUFHLEdBQUUsS0FBSTtBQUFDLFlBQUcsS0FBRyxFQUFFLEtBQUUsRUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLEVBQUUsSUFBRSxJQUFFLENBQUM7QUFBQSxhQUFNO0FBQUMsY0FBRSxFQUFFLEtBQUcsSUFBRSxHQUFHO0FBQUUsY0FBSSxJQUFFLEVBQUUsS0FBRyxJQUFFLE1BQUksQ0FBQztBQUFFLGVBQUcsS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxLQUFHLE1BQUk7QUFBRSxjQUFJLEtBQUcsS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxNQUFJLEtBQUcsS0FBRyxNQUFJO0FBQUcsY0FBRSxFQUFFLEtBQUcsSUFBRSxFQUFFO0FBQUUsY0FBSSxJQUFFLEVBQUUsS0FBRyxJQUFFLEtBQUcsQ0FBQyxHQUNuZixLQUFHLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxJQUFFLE1BQUksTUFBSSxNQUFJLEdBQUUsS0FBRyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsSUFBRSxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksSUFBRyxJQUFFLEVBQUUsS0FBRyxJQUFFLEVBQUUsR0FBRSxJQUFFLEVBQUUsS0FBRyxJQUFFLEdBQUcsR0FBRSxJQUFFLEVBQUUsS0FBRyxJQUFFLE1BQUksQ0FBQztBQUFFLGNBQUUsSUFBRSxFQUFFLEtBQUcsSUFBRSxLQUFHLENBQUM7QUFBRSxjQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUU7QUFBRyxlQUFHO0FBQUUsZUFBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFHLGVBQUc7QUFBRSxlQUFHLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFO0FBQUEsUUFBRTtBQUFDLFVBQUUsSUFBRSxDQUFDLElBQUUsS0FBRztBQUFFLFVBQUUsSUFBRSxJQUFFLENBQUMsSUFBRSxLQUFHO0FBQUUsWUFBSSxJQUFFLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxLQUFHLElBQUUsSUFBRSxDQUFDLElBQUUsR0FBRSxJQUFFLElBQUUsSUFBRSxJQUFFLElBQUUsSUFBRSxHQUFFLEtBQUcsSUFBRSxJQUFFLElBQUUsSUFBRSxJQUFFLEdBQUUsS0FBRyxLQUFHLElBQUUsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLE1BQUksS0FBRyxLQUFHLE1BQUksSUFBRyxLQUFHLEtBQUcsSUFBRSxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksTUFBSSxLQUFHLEtBQUcsTUFBSSxJQUFHLEtBQUcsRUFBRSxJQUFFLENBQUMsR0FBRSxLQUFHLEVBQUUsSUFBRSxJQUFFLENBQUMsR0FBRSxJQUFFLE1BQUksS0FBRyxLQUFHLE1BQUksT0FBSyxLQUFHLEtBQUcsTUFBSSxPQUFLLEtBQUcsS0FBRyxNQUFJLEtBQUksSUFBRSxNQUFJLEtBQUcsS0FBRyxNQUFJLE9BQUssS0FBRyxLQUFHLE1BQUksT0FBSyxLQUNwZixLQUFHLE1BQUksT0FBSyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsSUFBRyxJQUFFLElBQUUsSUFBRyxJQUFFLEtBQUcsS0FBRyxNQUFJLElBQUUsT0FBSyxJQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRyxJQUFFLEtBQUcsTUFBSSxNQUFJLElBQUUsT0FBSyxJQUFFLElBQUUsS0FBSSxJQUFFLElBQUUsSUFBRSxHQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFJLFlBQUUsSUFBRTtBQUFHLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRTtBQUFHLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUUsSUFBRSxJQUFFO0FBQUUsWUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFO0FBQUUsWUFBRTtBQUFFLFlBQUU7QUFBRSxZQUFFLElBQUUsSUFBRTtBQUFFLFlBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUEsTUFBQztBQUFDLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsQ0FBQyxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsQ0FBQyxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxDQUFDLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxDQUFDLElBQUUsSUFBRSxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUUsVUFBRSxFQUFFLENBQUMsSUFBRSxJQUFFLElBQUU7QUFBRSxRQUFFLENBQUMsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFDbmY7QUFBRSxRQUFFLEVBQUUsSUFBRSxJQUFFLEtBQUcsTUFBSSxJQUFFLE1BQUksSUFBRSxJQUFFLEtBQUc7QUFBRSxVQUFFLEVBQUUsRUFBRSxJQUFFLElBQUUsSUFBRTtBQUFFLFFBQUUsRUFBRSxJQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsTUFBSSxJQUFFLElBQUUsS0FBRztBQUFFLFVBQUUsRUFBRSxFQUFFLElBQUUsSUFBRSxJQUFFO0FBQUUsUUFBRSxFQUFFLElBQUUsS0FBRyxLQUFHLE1BQUksSUFBRSxNQUFJLElBQUUsSUFBRSxLQUFHO0FBQUEsSUFBQyxFQUFDO0FBQ3pILElBQUFELE1BQUssS0FBSyxNQUFJLEVBQUMsTUFBSyxPQUFNLEdBQUUsQ0FBQyxHQUFFLGdCQUFlLFNBQVMsR0FBRTtBQUFDLE1BQUFBLE1BQUssS0FBSyxJQUFJLEVBQUUsS0FBSyxDQUFDO0FBQUEsSUFBQyxHQUFFLGtCQUFpQixTQUFTLEdBQUU7QUFBQyxVQUFFQSxNQUFLLEtBQUssSUFBSSxFQUFFLFFBQVEsQ0FBQztBQUFFLFdBQUcsS0FBR0EsTUFBSyxLQUFLLElBQUksRUFBRSxPQUFPLEdBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxJQUFHLFNBQVMsR0FBRTtBQUFDLFVBQUksSUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxNQUFNLEdBQUU7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxLQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUUsQ0FBQztBQUFBLElBQUMsR0FBRSxTQUFRLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBSSxHQUFFLElBQUUsRUFBRSxNQUFNLENBQUMsR0FBRSxJQUFFQSxNQUFLLFVBQVMsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJQUFFO0FBQUUsVUFBRSxLQUFHO0FBQUcsVUFBRSxLQUFHLENBQUM7QUFBRSxVQUFHLElBQUUsRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLGtDQUFrQztBQUFFLFdBQUksSUFBRSxHQUFFLElBQUUsS0FBRyxNQUFJLElBQUUsR0FBRSxJQUFJO0FBQUMsVUFBRSxLQUFHLE1BQUksSUFBRSxLQUFHO0FBQUcsVUFBRSxFQUFFO0FBQUEsUUFBTTtBQUFBLFFBQ3RmLEtBQUcsS0FBRztBQUFBLE1BQUU7QUFBRSxVQUFFQSxNQUFLLEtBQUssSUFBSSxFQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsVUFBRUEsTUFBSyxLQUFLLElBQUksRUFBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLGFBQU8sRUFBRSxPQUFPLEVBQUUsTUFBSyxFQUFFLEdBQUc7QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRTtBQUFDLFVBQUUsS0FBRztBQUFHLFVBQUUsS0FBRyxDQUFDO0FBQUUsVUFBSSxJQUFFQSxNQUFLLFVBQVMsSUFBRSxFQUFFLFVBQVUsQ0FBQyxJ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QUFBRSxVQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsUUFBUSxHQUFFLElBQUUsQ0FBQyxDQUFDLEdBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxHQUFFLEdBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxHQUFFLENBQUM7QUFBRSxVQUFFLEVBQUUsU0FBUyxFQUFFLEdBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFFLEdBQUUsQ0FBQztBQUFFLFVBQUcsQ0FBQyxFQUFFLFFBQU0sRUFBQyxLQUFJLEdBQUUsTUFBSyxDQUFDLEVBQUM7QUFBRSxXQUFJLElBQUUsR0FBRSxJQUFFLEdBQUUsS0FBRyxFQUFFLEtBQUUsTUFBSUEsTUFBSyxLQUFLLElBQUksR0FBRyxJQUNyZ0IsQ0FBQyxHQUFFLEtBQUcsSUFBRyxFQUFFLENBQUMsS0FBSSxJQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUUsRUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDLEdBQUUsRUFBRSxJQUFFLENBQUMsS0FBRyxFQUFFLENBQUMsR0FBRSxFQUFFLElBQUUsQ0FBQyxLQUFHLEVBQUUsQ0FBQyxHQUFFLEVBQUUsSUFBRSxDQUFDLEtBQUcsRUFBRSxDQUFDO0FBQUUsYUFBTSxFQUFDLEtBQUksR0FBRSxNQUFLLEVBQUUsTUFBTSxHQUFFLENBQUMsRUFBQztBQUFBLElBQUMsRUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxPQUFLLFNBQVMsR0FBRSxHQUFFO0FBQUMsV0FBSyxJQUFFLElBQUUsS0FBR0EsTUFBSyxLQUFLO0FBQU8sVUFBSSxJQUFFLENBQUMsQ0FBQyxHQUFFLENBQUMsQ0FBQyxHQUFFLEdBQUUsSUFBRSxFQUFFLFVBQVUsWUFBVTtBQUFHLFdBQUssSUFBRSxDQUFDLElBQUksS0FBRSxJQUFJLEdBQUM7QUFBRSxRQUFFLFNBQU8sTUFBSSxJQUFFLEVBQUUsS0FBSyxDQUFDO0FBQUcsV0FBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksR0FBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFLFdBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxJQUFFLEVBQUUsQ0FBQyxJQUFFO0FBQVcsV0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxJQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFBQztBQUMzWSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFVBQVFBLE1BQUssS0FBSyxLQUFLLFVBQVUsTUFBSSxTQUFTLEdBQUU7QUFBQyxVQUFHLEtBQUssRUFBRSxPQUFNLElBQUlBLE1BQUssVUFBVSxRQUFRLHlDQUF5QztBQUFFLFdBQUssT0FBTyxDQUFDO0FBQUUsYUFBTyxLQUFLLE9BQU8sQ0FBQztBQUFBLElBQUM7QUFBRSxJQUFBQSxNQUFLLEtBQUssS0FBSyxVQUFVLFFBQU0sV0FBVTtBQUFDLFdBQUssSUFBRSxJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUUsV0FBSyxJQUFFO0FBQUEsSUFBRTtBQUFFLElBQUFBLE1BQUssS0FBSyxLQUFLLFVBQVUsU0FBTyxTQUFTLEdBQUU7QUFBQyxXQUFLLElBQUU7QUFBRyxXQUFLLEVBQUUsT0FBTyxDQUFDO0FBQUEsSUFBQztBQUFFLElBQUFBLE1BQUssS0FBSyxLQUFLLFVBQVUsU0FBTyxXQUFVO0FBQUMsVUFBSSxJQUFFLEtBQUssRUFBRSxTQUFTLEdBQUUsSUFBRyxJQUFJLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUcsT0FBTyxDQUFDLEVBQUUsU0FBUztBQUFFLFdBQUssTUFBTTtBQUFFLGFBQU87QUFBQSxJQUFDO0FBQ3ZlLElBQUFBLE1BQUssS0FBSyxTQUFPLFNBQVMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBRSxLQUFHO0FBQUksVUFBRyxJQUFFLEtBQUcsSUFBRSxFQUFFLE9BQU0sSUFBSUEsTUFBSyxVQUFVLFFBQVEsMEJBQTBCO0FBQUUsbUJBQVcsT0FBTyxNQUFJLElBQUVBLE1BQUssTUFBTSxXQUFXLE9BQU8sQ0FBQztBQUFHLG1CQUFXLE9BQU8sTUFBSSxJQUFFQSxNQUFLLE1BQU0sV0FBVyxPQUFPLENBQUM7QUFBRyxVQUFFLEtBQUdBLE1BQUssS0FBSztBQUFLLFVBQUUsSUFBSSxFQUFFLENBQUM7QUFBRSxVQUFJLEdBQUUsR0FBRSxHQUFFLEdBQUUsSUFBRSxDQUFDLEdBQUUsSUFBRUEsTUFBSztBQUFTLFdBQUksSUFBRSxHQUFFLEtBQUcsRUFBRSxVQUFRLEtBQUcsSUFBRyxLQUFJO0FBQUMsWUFBRSxJQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sR0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUUsYUFBSSxJQUFFLEdBQUUsSUFBRSxHQUFFLElBQUksTUFBSSxJQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksR0FBRSxDQUFDLEtBQUcsRUFBRSxDQUFDO0FBQUUsWUFBRSxFQUFFLE9BQU8sQ0FBQztBQUFBLE1BQUM7QUFBQyxZQUFJLElBQUUsRUFBRSxNQUFNLEdBQUUsQ0FBQztBQUFHLGFBQU87QUFBQSxJQUFDO0FBQ25kLElBQUFBLE1BQUssT0FBSyxTQUFTLEdBQUU7QUFBQyxXQUFLLElBQUUsQ0FBQyxJQUFJQSxNQUFLLEtBQUssUUFBTTtBQUFFLFdBQUssSUFBRSxDQUFDLENBQUM7QUFBRSxXQUFLLElBQUU7QUFBRSxXQUFLLElBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRSxDQUFDO0FBQUUsV0FBSyxJQUFFLEtBQUssSUFBRSxLQUFLLElBQUUsS0FBSyxLQUFHO0FBQUUsV0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsR0FBRSxHQUFFLEdBQUUsR0FBRSxDQUFDO0FBQUUsV0FBSyxJQUFFLENBQUMsR0FBRSxHQUFFLEdBQUUsQ0FBQztBQUFFLFdBQUssSUFBRTtBQUFPLFdBQUssSUFBRTtBQUFFLFdBQUssSUFBRTtBQUFHLFdBQUssSUFBRSxFQUFDLFVBQVMsQ0FBQyxHQUFFLFFB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LEVBQXpEO0FBQUE7QUFDTCx3QkFBUyxXQUFVO0FBQUE7QUFDckI7OztBQ01BLElBQUksY0FBYztBQUVsQixLQUFLLFlBQVksQ0FBQyxVQUF3QjtBQUN4QyxNQUFJLENBQUMsYUFBYTtBQUNoQixTQUFLO0FBQ0wsa0JBQWM7QUFBQSxFQUNoQjtBQUVBLFFBQU0sRUFBRSxVQUFVLE9BQU8sS0FBSyxJQUFLLE1BQU0sS0FBNkI7QUFFdEUsTUFBSSxTQUFTLE9BQU8sU0FBUyxhQUFhO0FBQ3hDLFFBQUksU0FBUyxpQ0FBdUM7QUFDbEQsTUFBQUMsU0FBUSxTQUFTLEtBQUssUUFBUSxNQUFNLFFBQVEsSUFBSSxFQUM3QyxJQUFJLENBQUMsa0JBQWtCO0FBQ3RCLGFBQUssWUFBWSxFQUFFLGVBQWUsWUFBWSxNQUFNLE1BQU0sR0FBRztBQUFBLFVBQzNELE9BQU8sY0FBYyxTQUFTLFdBQzFCLElBQUksWUFBWSxFQUFFLE9BQU8sY0FBYyxJQUFJLEVBQUUsU0FDN0MsY0FBYztBQUFBLFFBQ3BCLENBQUM7QUFBQSxNQUNILENBQUMsRUFDQSxPQUFPLENBQUMsVUFBMkI7QUFDbEMsYUFBSyxZQUFZLEVBQUUsTUFBTSxDQUFDO0FBQUEsTUFDNUIsQ0FBQztBQUFBLElBQ0wsT0FBTztBQUNMLFdBQUssWUFBWTtBQUFBLFFBQ2YsT0FBTyxJQUFJLCtCQUErQiw0QkFBNEI7QUFBQSxNQUN4RSxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsT0FBTztBQUNMLFFBQUksQ0FBQyxPQUFPO0FBQ1YsV0FBSyxZQUFZO0FBQUEsUUFDZixPQUFPLElBQUk7QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLE9BQU8sU0FBUyxhQUFhO0FBQy9CLFdBQUssWUFBWTtBQUFBLFFBQ2YsT0FBTyxJQUFJLDhCQUE4QixzQkFBc0I7QUFBQSxNQUNqRSxDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFsic2pjbCIsICJhIiwgIlJlZmxlY3RBcHBseSIsICJSZWZsZWN0T3duS2V5cyIsICJOdW1iZXJJc05hTiIsICJFdmVudEVtaXR0ZXIiLCAiZXZlbnRzIiwgImVyciIsICJvbmNlIiwgIm9iaiIsICJvYmoiLCAidiIsICJvayIsICJlcnIiLCAiUmVzdWx0IiwgImZyb21UaHJvd2FibGUiLCAib2siLCAiZXJyIiwgInNlbGYiLCAic2pjbCIsICJlbmNyeXB0IiwgImVuY3J5cHQiLCAiRXZlbnRFbWl0dGVyIiwgImVuY3J5cHQiXQp9Cg==
