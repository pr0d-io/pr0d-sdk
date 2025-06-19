import * as Te from "react";
import Zi, { forwardRef as Va, useContext as Ki, createContext as qa, useState as K, useRef as _n, useEffect as at } from "react";
import Se from "axios";
import Ga from "qr-code-styling";
import { createConnector as Xr, createConfig as Ya, http as Qa, WagmiProvider as Za, useAccount as Ka, useConnect as Ja, useDisconnect as Xa, useSignMessage as ec, useSignTypedData as tc } from "wagmi";
import { QueryClientProvider as nc, QueryClient as rc } from "@tanstack/react-query";
import { jwtDecode as oc } from "jwt-decode";
import { connectorsForWallets as ic } from "@rainbow-me/rainbowkit";
import { getAddress as De, SwitchChainError as It, numberToHex as yt, UserRejectedRequestError as ke, withRetry as sc, withTimeout as ac, ResourceUnavailableRpcError as jr } from "viem";
var xh = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function cc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function vh(e) {
  if (Object.prototype.hasOwnProperty.call(e, "__esModule")) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var Rn = { exports: {} }, sn = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ko;
function lc() {
  if (Ko) return sn;
  Ko = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.fragment");
  function n(r, o, i) {
    var s = null;
    if (i !== void 0 && (s = "" + i), o.key !== void 0 && (s = "" + o.key), "key" in o) {
      i = {};
      for (var a in o)
        a !== "key" && (i[a] = o[a]);
    } else i = o;
    return o = i.ref, {
      $$typeof: e,
      type: r,
      key: s,
      ref: o !== void 0 ? o : null,
      props: i
    };
  }
  return sn.Fragment = t, sn.jsx = n, sn.jsxs = n, sn;
}
var an = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jo;
function uc() {
  return Jo || (Jo = 1, process.env.NODE_ENV !== "production" && function() {
    function e(w) {
      if (w == null) return null;
      if (typeof w == "function")
        return w.$$typeof === h ? null : w.displayName || w.name || null;
      if (typeof w == "string") return w;
      switch (w) {
        case f:
          return "Fragment";
        case j:
          return "Profiler";
        case I:
          return "StrictMode";
        case k:
          return "Suspense";
        case _:
          return "SuspenseList";
        case X:
          return "Activity";
      }
      if (typeof w == "object")
        switch (typeof w.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), w.$$typeof) {
          case C:
            return "Portal";
          case T:
            return (w.displayName || "Context") + ".Provider";
          case B:
            return (w._context.displayName || "Context") + ".Consumer";
          case M:
            var P = w.render;
            return w = w.displayName, w || (w = P.displayName || P.name || "", w = w !== "" ? "ForwardRef(" + w + ")" : "ForwardRef"), w;
          case D:
            return P = w.displayName || null, P !== null ? P : e(w.type) || "Memo";
          case J:
            P = w._payload, w = w._init;
            try {
              return e(w(P));
            } catch {
            }
        }
      return null;
    }
    function t(w) {
      return "" + w;
    }
    function n(w) {
      try {
        t(w);
        var P = !1;
      } catch {
        P = !0;
      }
      if (P) {
        P = console;
        var L = P.error, F = typeof Symbol == "function" && Symbol.toStringTag && w[Symbol.toStringTag] || w.constructor.name || "Object";
        return L.call(
          P,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          F
        ), t(w);
      }
    }
    function r(w) {
      if (w === f) return "<>";
      if (typeof w == "object" && w !== null && w.$$typeof === J)
        return "<...>";
      try {
        var P = e(w);
        return P ? "<" + P + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function o() {
      var w = $.A;
      return w === null ? null : w.getOwner();
    }
    function i() {
      return Error("react-stack-top-frame");
    }
    function s(w) {
      if (H.call(w, "key")) {
        var P = Object.getOwnPropertyDescriptor(w, "key").get;
        if (P && P.isReactWarning) return !1;
      }
      return w.key !== void 0;
    }
    function a(w, P) {
      function L() {
        ve || (ve = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          P
        ));
      }
      L.isReactWarning = !0, Object.defineProperty(w, "key", {
        get: L,
        configurable: !0
      });
    }
    function l() {
      var w = e(this.type);
      return de[w] || (de[w] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), w = this.props.ref, w !== void 0 ? w : null;
    }
    function c(w, P, L, F, z, q, W, Y) {
      return L = q.ref, w = {
        $$typeof: x,
        type: w,
        key: P,
        props: q,
        _owner: z
      }, (L !== void 0 ? L : null) !== null ? Object.defineProperty(w, "ref", {
        enumerable: !1,
        get: l
      }) : Object.defineProperty(w, "ref", { enumerable: !1, value: null }), w._store = {}, Object.defineProperty(w._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(w, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(w, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: W
      }), Object.defineProperty(w, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: Y
      }), Object.freeze && (Object.freeze(w.props), Object.freeze(w)), w;
    }
    function p(w, P, L, F, z, q, W, Y) {
      var U = P.children;
      if (U !== void 0)
        if (F)
          if (R(U)) {
            for (F = 0; F < U.length; F++)
              g(U[F]);
            Object.freeze && Object.freeze(U);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else g(U);
      if (H.call(P, "key")) {
        U = e(w);
        var G = Object.keys(P).filter(function(ce) {
          return ce !== "key";
        });
        F = 0 < G.length ? "{key: someKey, " + G.join(": ..., ") + ": ...}" : "{key: someKey}", it[U + F] || (G = 0 < G.length ? "{" + G.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          F,
          U,
          G,
          U
        ), it[U + F] = !0);
      }
      if (U = null, L !== void 0 && (n(L), U = "" + L), s(P) && (n(P.key), U = "" + P.key), "key" in P) {
        L = {};
        for (var V in P)
          V !== "key" && (L[V] = P[V]);
      } else L = P;
      return U && a(
        L,
        typeof w == "function" ? w.displayName || w.name || "Unknown" : w
      ), c(
        w,
        U,
        q,
        z,
        o(),
        L,
        W,
        Y
      );
    }
    function g(w) {
      typeof w == "object" && w !== null && w.$$typeof === x && w._store && (w._store.validated = 1);
    }
    var m = Zi, x = Symbol.for("react.transitional.element"), C = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), I = Symbol.for("react.strict_mode"), j = Symbol.for("react.profiler"), B = Symbol.for("react.consumer"), T = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), D = Symbol.for("react.memo"), J = Symbol.for("react.lazy"), X = Symbol.for("react.activity"), h = Symbol.for("react.client.reference"), $ = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, H = Object.prototype.hasOwnProperty, R = Array.isArray, u = console.createTask ? console.createTask : function() {
      return null;
    };
    m = {
      "react-stack-bottom-frame": function(w) {
        return w();
      }
    };
    var ve, de = {}, pe = m["react-stack-bottom-frame"].bind(
      m,
      i
    )(), Ce = u(r(i)), it = {};
    an.Fragment = f, an.jsx = function(w, P, L, F, z) {
      var q = 1e4 > $.recentlyCreatedOwnerStacks++;
      return p(
        w,
        P,
        L,
        !1,
        F,
        z,
        q ? Error("react-stack-top-frame") : pe,
        q ? u(r(w)) : Ce
      );
    }, an.jsxs = function(w, P, L, F, z) {
      var q = 1e4 > $.recentlyCreatedOwnerStacks++;
      return p(
        w,
        P,
        L,
        !0,
        F,
        z,
        q ? Error("react-stack-top-frame") : pe,
        q ? u(r(w)) : Ce
      );
    };
  }()), an;
}
var Xo;
function dc() {
  return Xo || (Xo = 1, process.env.NODE_ENV === "production" ? Rn.exports = lc() : Rn.exports = uc()), Rn.exports;
}
var d = dc();
const Ji = "2.31.3";
let cn = {
  getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: n }) => t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
  version: `viem@${Ji}`
}, be = class Fr extends Error {
  constructor(t, n = {}) {
    var a;
    const r = (() => {
      var l;
      return n.cause instanceof Fr ? n.cause.details : (l = n.cause) != null && l.message ? n.cause.message : n.details;
    })(), o = n.cause instanceof Fr && n.cause.docsPath || n.docsPath, i = (a = cn.getDocsUrl) == null ? void 0 : a.call(cn, { ...n, docsPath: o }), s = [
      t || "An error occurred.",
      "",
      ...n.metaMessages ? [...n.metaMessages, ""] : [],
      ...i ? [`Docs: ${i}`] : [],
      ...r ? [`Details: ${r}`] : [],
      ...cn.version ? [`Version: ${cn.version}`] : []
    ].join(`
`);
    super(s, n.cause ? { cause: n.cause } : void 0), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metaMessages", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "version", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "BaseError"
    }), this.details = r, this.docsPath = o, this.metaMessages = n.metaMessages, this.name = n.name ?? this.name, this.shortMessage = t, this.version = Ji;
  }
  walk(t) {
    return Xi(this, t);
  }
};
function Xi(e, t) {
  return t != null && t(e) ? e : e && typeof e == "object" && "cause" in e && e.cause !== void 0 ? Xi(e.cause, t) : t ? null : e;
}
class fc extends be {
  constructor({ max: t, min: n, signed: r, size: o, value: i }) {
    super(`Number "${i}" is not in safe ${o ? `${o * 8}-bit ${r ? "signed" : "unsigned"} ` : ""}integer range ${t ? `(${n} to ${t})` : `(above ${n})`}`, { name: "IntegerOutOfRangeError" });
  }
}
class hc extends be {
  constructor({ givenSize: t, maxSize: n }) {
    super(`Size cannot exceed ${n} bytes. Given size: ${t} bytes.`, { name: "SizeOverflowError" });
  }
}
class pc extends be {
  constructor({ offset: t, position: n, size: r }) {
    super(`Slice ${n === "start" ? "starting" : "ending"} at offset "${t}" is out-of-bounds (size: ${r}).`, { name: "SliceOffsetOutOfBoundsError" });
  }
}
class es extends be {
  constructor({ size: t, targetSize: n, type: r }) {
    super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${t}) exceeds padding size (${n}).`, { name: "SizeExceedsPaddingSizeError" });
  }
}
function Gt(e, { dir: t, size: n = 32 } = {}) {
  return typeof e == "string" ? gc(e, { dir: t, size: n }) : mc(e, { dir: t, size: n });
}
function gc(e, { dir: t, size: n = 32 } = {}) {
  if (n === null)
    return e;
  const r = e.replace("0x", "");
  if (r.length > n * 2)
    throw new es({
      size: Math.ceil(r.length / 2),
      targetSize: n,
      type: "hex"
    });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function mc(e, { dir: t, size: n = 32 } = {}) {
  if (n === null)
    return e;
  if (e.length > n)
    throw new es({
      size: e.length,
      targetSize: n,
      type: "bytes"
    });
  const r = new Uint8Array(n);
  for (let o = 0; o < n; o++) {
    const i = t === "right";
    r[i ? o : n - o - 1] = e[i ? o : e.length - o - 1];
  }
  return r;
}
function Sn(e, { strict: t = !0 } = {}) {
  return !e || typeof e != "string" ? !1 : t ? /^0x[0-9a-fA-F]*$/.test(e) : e.startsWith("0x");
}
function Wt(e) {
  return Sn(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
function Qn(e, { dir: t = "left" } = {}) {
  let n = typeof e == "string" ? e.replace("0x", "") : e, r = 0;
  for (let o = 0; o < n.length - 1 && n[t === "left" ? o : n.length - o - 1].toString() === "0"; o++)
    r++;
  return n = t === "left" ? n.slice(r) : n.slice(0, n.length - r), typeof e == "string" ? (n.length === 1 && t === "right" && (n = `${n}0`), `0x${n.length % 2 === 1 ? `0${n}` : n}`) : n;
}
const yc = /* @__PURE__ */ new TextEncoder();
function ts(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint" ? wc(e, t) : typeof e == "boolean" ? bc(e, t) : Sn(e) ? Tt(e, t) : ns(e, t);
}
function bc(e, t = {}) {
  const n = new Uint8Array(1);
  return n[0] = Number(e), typeof t.size == "number" ? (Yt(n, { size: t.size }), Gt(n, { size: t.size })) : n;
}
const ct = {
  zero: 48,
  nine: 57,
  A: 65,
  F: 70,
  a: 97,
  f: 102
};
function ei(e) {
  if (e >= ct.zero && e <= ct.nine)
    return e - ct.zero;
  if (e >= ct.A && e <= ct.F)
    return e - (ct.A - 10);
  if (e >= ct.a && e <= ct.f)
    return e - (ct.a - 10);
}
function Tt(e, t = {}) {
  let n = e;
  t.size && (Yt(n, { size: t.size }), n = Gt(n, { dir: "right", size: t.size }));
  let r = n.slice(2);
  r.length % 2 && (r = `0${r}`);
  const o = r.length / 2, i = new Uint8Array(o);
  for (let s = 0, a = 0; s < o; s++) {
    const l = ei(r.charCodeAt(a++)), c = ei(r.charCodeAt(a++));
    if (l === void 0 || c === void 0)
      throw new be(`Invalid byte sequence ("${r[a - 2]}${r[a - 1]}" in "${r}").`);
    i[s] = l * 16 + c;
  }
  return i;
}
function wc(e, t) {
  const n = te(e, t);
  return Tt(n);
}
function ns(e, t = {}) {
  const n = yc.encode(e);
  return typeof t.size == "number" ? (Yt(n, { size: t.size }), Gt(n, { dir: "right", size: t.size })) : n;
}
function Yt(e, { size: t }) {
  if (Wt(e) > t)
    throw new hc({
      givenSize: Wt(e),
      maxSize: t
    });
}
function zt(e, t = {}) {
  const { signed: n } = t;
  t.size && Yt(e, { size: t.size });
  const r = BigInt(e);
  if (!n)
    return r;
  const o = (e.length - 2) / 2, i = (1n << BigInt(o) * 8n - 1n) - 1n;
  return r <= i ? r : r - BigInt(`0x${"f".padStart(o * 2, "f")}`) - 1n;
}
function Zn(e, t = {}) {
  return Number(zt(e, t));
}
const xc = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function gn(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint" ? te(e, t) : typeof e == "string" ? Sc(e, t) : typeof e == "boolean" ? vc(e, t) : xt(e, t);
}
function vc(e, t = {}) {
  const n = `0x${Number(e)}`;
  return typeof t.size == "number" ? (Yt(n, { size: t.size }), Gt(n, { size: t.size })) : n;
}
function xt(e, t = {}) {
  let n = "";
  for (let o = 0; o < e.length; o++)
    n += xc[e[o]];
  const r = `0x${n}`;
  return typeof t.size == "number" ? (Yt(r, { size: t.size }), Gt(r, { dir: "right", size: t.size })) : r;
}
function te(e, t = {}) {
  const { signed: n, size: r } = t, o = BigInt(e);
  let i;
  r ? n ? i = (1n << BigInt(r) * 8n - 1n) - 1n : i = 2n ** (BigInt(r) * 8n) - 1n : typeof e == "number" && (i = BigInt(Number.MAX_SAFE_INTEGER));
  const s = typeof i == "bigint" && n ? -i - 1n : 0;
  if (i && o > i || o < s) {
    const l = typeof e == "bigint" ? "n" : "";
    throw new fc({
      max: i ? `${i}${l}` : void 0,
      min: `${s}${l}`,
      signed: n,
      size: r,
      value: `${e}${l}`
    });
  }
  const a = `0x${(n && o < 0 ? (1n << BigInt(r * 8)) + BigInt(o) : o).toString(16)}`;
  return r ? Gt(a, { size: r }) : a;
}
const Cc = /* @__PURE__ */ new TextEncoder();
function Sc(e, t = {}) {
  const n = Cc.encode(e);
  return xt(n, t);
}
function kn(e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
class Et extends be {
  constructor({ address: t }) {
    super(`Address "${t}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart."
      ],
      name: "InvalidAddressError"
    });
  }
}
class rs extends Map {
  constructor(t) {
    super(), Object.defineProperty(this, "maxSize", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.maxSize = t;
  }
  get(t) {
    const n = super.get(t);
    return super.has(t) && n !== void 0 && (this.delete(t), super.set(t, n)), n;
  }
  set(t, n) {
    if (super.set(t, n), this.maxSize && this.size > this.maxSize) {
      const r = this.keys().next().value;
      r && this.delete(r);
    }
    return this;
  }
}
const Nn = /* @__PURE__ */ BigInt(2 ** 32 - 1), ti = /* @__PURE__ */ BigInt(32);
function kc(e, t = !1) {
  return t ? { h: Number(e & Nn), l: Number(e >> ti & Nn) } : { h: Number(e >> ti & Nn) | 0, l: Number(e & Nn) | 0 };
}
function Ic(e, t = !1) {
  const n = e.length;
  let r = new Uint32Array(n), o = new Uint32Array(n);
  for (let i = 0; i < n; i++) {
    const { h: s, l: a } = kc(e[i], t);
    [r[i], o[i]] = [s, a];
  }
  return [r, o];
}
const Tc = (e, t, n) => e << n | t >>> 32 - n, Ec = (e, t, n) => t << n | e >>> 32 - n, jc = (e, t, n) => t << n - 32 | e >>> 64 - n, Ac = (e, t, n) => e << n - 32 | t >>> 64 - n;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function Mc(e) {
  return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array";
}
function ni(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error("positive integer expected, got " + e);
}
function Ht(e, ...t) {
  if (!Mc(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error("Uint8Array expected of length " + t + ", got length=" + e.length);
}
function Kn(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function os(e, t) {
  Ht(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error("digestInto() expects output buffer of length at least " + n);
}
function Pc(e) {
  return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
function yn(...e) {
  for (let t = 0; t < e.length; t++)
    e[t].fill(0);
}
function Ar(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function et(e, t) {
  return e << 32 - t | e >>> t;
}
const Oc = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function $c(e) {
  return e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255;
}
function _c(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = $c(e[t]);
  return e;
}
const ri = Oc ? (e) => e : _c, Rc = /* @ts-ignore */ typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", Nc = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Ch(e) {
  if (Ht(e), Rc)
    return e.toHex();
  let t = "";
  for (let n = 0; n < e.length; n++)
    t += Nc[e[n]];
  return t;
}
function Bc(e) {
  if (typeof e != "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(e));
}
function eo(e) {
  return typeof e == "string" && (e = Bc(e)), Ht(e), e;
}
class is {
}
function ss(e) {
  const t = (r) => e().update(eo(r)).digest(), n = e();
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = () => e(), t;
}
const Dc = BigInt(0), ln = BigInt(1), Lc = BigInt(2), zc = BigInt(7), Uc = BigInt(256), Fc = BigInt(113), as = [], cs = [], ls = [];
for (let e = 0, t = ln, n = 1, r = 0; e < 24; e++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], as.push(2 * (5 * r + n)), cs.push((e + 1) * (e + 2) / 2 % 64);
  let o = Dc;
  for (let i = 0; i < 7; i++)
    t = (t << ln ^ (t >> zc) * Fc) % Uc, t & Lc && (o ^= ln << (ln << /* @__PURE__ */ BigInt(i)) - ln);
  ls.push(o);
}
const us = Ic(ls, !0), Wc = us[0], Hc = us[1], oi = (e, t, n) => n > 32 ? jc(e, t, n) : Tc(e, t, n), ii = (e, t, n) => n > 32 ? Ac(e, t, n) : Ec(e, t, n);
function Vc(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let s = 0; s < 10; s++)
      n[s] = e[s] ^ e[s + 10] ^ e[s + 20] ^ e[s + 30] ^ e[s + 40];
    for (let s = 0; s < 10; s += 2) {
      const a = (s + 8) % 10, l = (s + 2) % 10, c = n[l], p = n[l + 1], g = oi(c, p, 1) ^ n[a], m = ii(c, p, 1) ^ n[a + 1];
      for (let x = 0; x < 50; x += 10)
        e[s + x] ^= g, e[s + x + 1] ^= m;
    }
    let o = e[2], i = e[3];
    for (let s = 0; s < 24; s++) {
      const a = cs[s], l = oi(o, i, a), c = ii(o, i, a), p = as[s];
      o = e[p], i = e[p + 1], e[p] = l, e[p + 1] = c;
    }
    for (let s = 0; s < 50; s += 10) {
      for (let a = 0; a < 10; a++)
        n[a] = e[s + a];
      for (let a = 0; a < 10; a++)
        e[s + a] ^= ~n[(a + 2) % 10] & n[(a + 4) % 10];
    }
    e[0] ^= Wc[r], e[1] ^= Hc[r];
  }
  yn(n);
}
class to extends is {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(t, n, r, o = !1, i = 24) {
    if (super(), this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, this.enableXOF = !1, this.blockLen = t, this.suffix = n, this.outputLen = r, this.enableXOF = o, this.rounds = i, ni(r), !(0 < t && t < 200))
      throw new Error("only keccak-f1600 function is supported");
    this.state = new Uint8Array(200), this.state32 = Pc(this.state);
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    ri(this.state32), Vc(this.state32, this.rounds), ri(this.state32), this.posOut = 0, this.pos = 0;
  }
  update(t) {
    Kn(this), t = eo(t), Ht(t);
    const { blockLen: n, state: r } = this, o = t.length;
    for (let i = 0; i < o; ) {
      const s = Math.min(n - this.pos, o - i);
      for (let a = 0; a < s; a++)
        r[this.pos++] ^= t[i++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: t, suffix: n, pos: r, blockLen: o } = this;
    t[r] ^= n, (n & 128) !== 0 && r === o - 1 && this.keccak(), t[o - 1] ^= 128, this.keccak();
  }
  writeInto(t) {
    Kn(this, !1), Ht(t), this.finish();
    const n = this.state, { blockLen: r } = this;
    for (let o = 0, i = t.length; o < i; ) {
      this.posOut >= r && this.keccak();
      const s = Math.min(r - this.posOut, i - o);
      t.set(n.subarray(this.posOut, this.posOut + s), o), this.posOut += s, o += s;
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return ni(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if (os(t, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, yn(this.state);
  }
  _cloneInto(t) {
    const { blockLen: n, suffix: r, outputLen: o, rounds: i, enableXOF: s } = this;
    return t || (t = new to(n, r, o, s, i)), t.state32.set(this.state32), t.pos = this.pos, t.posOut = this.posOut, t.finished = this.finished, t.rounds = i, t.suffix = r, t.outputLen = o, t.enableXOF = s, t.destroyed = this.destroyed, t;
  }
}
const qc = (e, t, n) => ss(() => new to(t, e, n)), Gc = qc(1, 136, 256 / 8);
function Yc(e, t) {
  return Gc(Sn(e, { strict: !1 }) ? ts(e) : e);
}
const Mr = /* @__PURE__ */ new rs(8192);
function Qc(e, t) {
  if (Mr.has(`${e}.${t}`))
    return Mr.get(`${e}.${t}`);
  const n = e.substring(2).toLowerCase(), r = Yc(ns(n)), o = n.split("");
  for (let s = 0; s < 40; s += 2)
    r[s >> 1] >> 4 >= 8 && o[s] && (o[s] = o[s].toUpperCase()), (r[s >> 1] & 15) >= 8 && o[s + 1] && (o[s + 1] = o[s + 1].toUpperCase());
  const i = `0x${o.join("")}`;
  return Mr.set(`${e}.${t}`, i), i;
}
const Zc = /^0x[a-fA-F0-9]{40}$/, Pr = /* @__PURE__ */ new rs(8192);
function jt(e, t) {
  const { strict: n = !0 } = t ?? {}, r = `${e}.${n}`;
  if (Pr.has(r))
    return Pr.get(r);
  const o = Zc.test(e) ? e.toLowerCase() === e ? !0 : n ? Qc(e) === e : !0 : !1;
  return Pr.set(r, o), o;
}
function Kc(e, t, n, { strict: r } = {}) {
  return Sn(e, { strict: !1 }) ? Xc(e, t, n, {
    strict: r
  }) : Jc(e, t, n, {
    strict: r
  });
}
function ds(e, t, n) {
  if (Wt(e) !== n - t)
    throw new pc({
      offset: n,
      position: "end",
      size: Wt(e)
    });
}
function Jc(e, t, n, { strict: r } = {}) {
  const o = e.slice(t, n);
  return r && ds(o, t, n), o;
}
function Xc(e, t, n, { strict: r } = {}) {
  const o = `0x${e.replace("0x", "").slice(t * 2, n * 2)}`;
  return r && ds(o, t, n), o;
}
class si extends be {
  constructor({ offset: t }) {
    super(`Offset \`${t}\` cannot be negative.`, {
      name: "NegativeOffsetError"
    });
  }
}
class el extends be {
  constructor({ length: t, position: n }) {
    super(`Position \`${n}\` is out of bounds (\`0 < position < ${t}\`).`, { name: "PositionOutOfBoundsError" });
  }
}
class tl extends be {
  constructor({ count: t, limit: n }) {
    super(`Recursive read limit of \`${n}\` exceeded (recursive read count: \`${t}\`).`, { name: "RecursiveReadLimitExceededError" });
  }
}
const nl = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new tl({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(e) {
    if (e < 0 || e > this.bytes.length - 1)
      throw new el({
        length: this.bytes.length,
        position: e
      });
  },
  decrementPosition(e) {
    if (e < 0)
      throw new si({ offset: e });
    const t = this.position - e;
    this.assertPosition(t), this.position = t;
  },
  getReadCount(e) {
    return this.positionReadCount.get(e || this.position) || 0;
  },
  incrementPosition(e) {
    if (e < 0)
      throw new si({ offset: e });
    const t = this.position + e;
    this.assertPosition(t), this.position = t;
  },
  inspectByte(e) {
    const t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectBytes(e, t) {
    const n = t ?? this.position;
    return this.assertPosition(n + e - 1), this.bytes.subarray(n, n + e);
  },
  inspectUint8(e) {
    const t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectUint16(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 1), this.dataView.getUint16(t);
  },
  inspectUint24(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 2), (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2);
  },
  inspectUint32(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 3), this.dataView.getUint32(t);
  },
  pushByte(e) {
    this.assertPosition(this.position), this.bytes[this.position] = e, this.position++;
  },
  pushBytes(e) {
    this.assertPosition(this.position + e.length - 1), this.bytes.set(e, this.position), this.position += e.length;
  },
  pushUint8(e) {
    this.assertPosition(this.position), this.bytes[this.position] = e, this.position++;
  },
  pushUint16(e) {
    this.assertPosition(this.position + 1), this.dataView.setUint16(this.position, e), this.position += 2;
  },
  pushUint24(e) {
    this.assertPosition(this.position + 2), this.dataView.setUint16(this.position, e >> 8), this.dataView.setUint8(this.position + 2, e & 255), this.position += 3;
  },
  pushUint32(e) {
    this.assertPosition(this.position + 3), this.dataView.setUint32(this.position, e), this.position += 4;
  },
  readByte() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectByte();
    return this.position++, e;
  },
  readBytes(e, t) {
    this.assertReadLimit(), this._touch();
    const n = this.inspectBytes(e);
    return this.position += t ?? e, n;
  },
  readUint8() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint8();
    return this.position += 1, e;
  },
  readUint16() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint16();
    return this.position += 2, e;
  },
  readUint24() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint24();
    return this.position += 3, e;
  },
  readUint32() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint32();
    return this.position += 4, e;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(e) {
    const t = this.position;
    return this.assertPosition(e), this.position = e, () => this.position = t;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const e = this.getReadCount();
    this.positionReadCount.set(this.position, e + 1), e > 0 && this.recursiveReadCount++;
  }
};
function fs(e, { recursiveReadLimit: t = 8192 } = {}) {
  const n = Object.create(nl);
  return n.bytes = e, n.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength), n.positionReadCount = /* @__PURE__ */ new Map(), n.recursiveReadLimit = t, n;
}
function At(e, t = "hex") {
  const n = hs(e), r = fs(new Uint8Array(n.length));
  return n.encode(r), t === "hex" ? xt(r.bytes) : r.bytes;
}
function hs(e) {
  return Array.isArray(e) ? rl(e.map((t) => hs(t))) : ol(e);
}
function rl(e) {
  const t = e.reduce((o, i) => o + i.length, 0), n = ps(t);
  return {
    length: t <= 55 ? 1 + t : 1 + n + t,
    encode(o) {
      t <= 55 ? o.pushByte(192 + t) : (o.pushByte(247 + n), n === 1 ? o.pushUint8(t) : n === 2 ? o.pushUint16(t) : n === 3 ? o.pushUint24(t) : o.pushUint32(t));
      for (const { encode: i } of e)
        i(o);
    }
  };
}
function ol(e) {
  const t = typeof e == "string" ? Tt(e) : e, n = ps(t.length);
  return {
    length: t.length === 1 && t[0] < 128 ? 1 : t.length <= 55 ? 1 + t.length : 1 + n + t.length,
    encode(o) {
      t.length === 1 && t[0] < 128 ? o.pushBytes(t) : t.length <= 55 ? (o.pushByte(128 + t.length), o.pushBytes(t)) : (o.pushByte(183 + n), n === 1 ? o.pushUint8(t.length) : n === 2 ? o.pushUint16(t.length) : n === 3 ? o.pushUint24(t.length) : o.pushUint32(t.length), o.pushBytes(t));
    }
  };
}
function ps(e) {
  if (e < 2 ** 8)
    return 1;
  if (e < 2 ** 16)
    return 2;
  if (e < 2 ** 24)
    return 3;
  if (e < 2 ** 32)
    return 4;
  throw new be("Length is too large.");
}
class rr extends be {
  constructor({ chainId: t }) {
    super(typeof t == "number" ? `Chain ID "${t}" is invalid.` : "Chain ID is invalid.", { name: "InvalidChainIdError" });
  }
}
const il = {
  ether: -9,
  wei: 9
};
function sl(e, t) {
  let n = e.toString();
  const r = n.startsWith("-");
  r && (n = n.slice(1)), n = n.padStart(t, "0");
  let [o, i] = [
    n.slice(0, n.length - t),
    n.slice(n.length - t)
  ];
  return i = i.replace(/(0+)$/, ""), `${r ? "-" : ""}${o || "0"}${i ? `.${i}` : ""}`;
}
function Wr(e, t = "wei") {
  return sl(e, il[t]);
}
class or extends be {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(`The fee cap (\`maxFeePerGas\`${n ? ` = ${Wr(n)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
      cause: t,
      name: "FeeCapTooHighError"
    });
  }
}
Object.defineProperty(or, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
});
class gs extends be {
  constructor({ cause: t, maxPriorityFeePerGas: n, maxFeePerGas: r } = {}) {
    super([
      `The provided tip (\`maxPriorityFeePerGas\`${n ? ` = ${Wr(n)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${r ? ` = ${Wr(r)} gwei` : ""}).`
    ].join(`
`), {
      cause: t,
      name: "TipAboveFeeCapError"
    });
  }
}
Object.defineProperty(gs, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
});
function al(e) {
  const t = Object.entries(e).map(([r, o]) => o === void 0 || o === !1 ? null : [r, o]).filter(Boolean), n = t.reduce((r, [o]) => Math.max(r, o.length), 0);
  return t.map(([r, o]) => `  ${`${r}:`.padEnd(n + 1)}  ${o}`).join(`
`);
}
class cl extends be {
  constructor({ v: t }) {
    super(`Invalid \`v\` value "${t}". Expected 27 or 28.`, {
      name: "InvalidLegacyVError"
    });
  }
}
class ll extends be {
  constructor({ transaction: t }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        al(t),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
        "- an EIP-7702 Transaction with `authorizationList`, or",
        "- a Legacy Transaction with `gasPrice`"
      ],
      name: "InvalidSerializableTransactionError"
    });
  }
}
class ul extends be {
  constructor({ storageKey: t }) {
    super(`Size for storage key "${t}" is invalid. Expected 32 bytes. Got ${Math.floor((t.length - 2) / 2)} bytes.`, { name: "InvalidStorageKeySizeError" });
  }
}
function no(e, t) {
  return ({ exclude: n, format: r }) => ({
    exclude: n,
    format: (o) => {
      const i = t(o);
      if (n)
        for (const s of n)
          delete i[s];
      return {
        ...i,
        ...r(o)
      };
    },
    type: e
  });
}
const ro = 2n ** 256n - 1n, ms = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function oo(e) {
  const t = {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    chainId: e.chainId ? Zn(e.chainId) : void 0,
    gas: e.gas ? BigInt(e.gas) : void 0,
    gasPrice: e.gasPrice ? BigInt(e.gasPrice) : void 0,
    maxFeePerBlobGas: e.maxFeePerBlobGas ? BigInt(e.maxFeePerBlobGas) : void 0,
    maxFeePerGas: e.maxFeePerGas ? BigInt(e.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: e.maxPriorityFeePerGas ? BigInt(e.maxPriorityFeePerGas) : void 0,
    nonce: e.nonce ? Zn(e.nonce) : void 0,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    type: e.type ? ms[e.type] : void 0,
    typeHex: e.type ? e.type : void 0,
    value: e.value ? BigInt(e.value) : void 0,
    v: e.v ? BigInt(e.v) : void 0
  };
  return e.authorizationList && (t.authorizationList = fl(e.authorizationList)), t.yParity = (() => {
    if (e.yParity)
      return Number(e.yParity);
    if (typeof t.v == "bigint") {
      if (t.v === 0n || t.v === 27n)
        return 0;
      if (t.v === 1n || t.v === 28n)
        return 1;
      if (t.v >= 35n)
        return t.v % 2n === 0n ? 1 : 0;
    }
  })(), t.type === "legacy" && (delete t.accessList, delete t.maxFeePerBlobGas, delete t.maxFeePerGas, delete t.maxPriorityFeePerGas, delete t.yParity), t.type === "eip2930" && (delete t.maxFeePerBlobGas, delete t.maxFeePerGas, delete t.maxPriorityFeePerGas), t.type === "eip1559" && delete t.maxFeePerBlobGas, t;
}
const dl = /* @__PURE__ */ no("transaction", oo);
function fl(e) {
  return e.map((t) => ({
    address: t.address,
    chainId: Number(t.chainId),
    nonce: Number(t.nonce),
    r: t.r,
    s: t.s,
    yParity: Number(t.yParity)
  }));
}
function hl(e) {
  const t = (e.transactions ?? []).map((n) => typeof n == "string" ? n : oo(n));
  return {
    ...e,
    baseFeePerGas: e.baseFeePerGas ? BigInt(e.baseFeePerGas) : null,
    blobGasUsed: e.blobGasUsed ? BigInt(e.blobGasUsed) : void 0,
    difficulty: e.difficulty ? BigInt(e.difficulty) : void 0,
    excessBlobGas: e.excessBlobGas ? BigInt(e.excessBlobGas) : void 0,
    gasLimit: e.gasLimit ? BigInt(e.gasLimit) : void 0,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : void 0,
    hash: e.hash ? e.hash : null,
    logsBloom: e.logsBloom ? e.logsBloom : null,
    nonce: e.nonce ? e.nonce : null,
    number: e.number ? BigInt(e.number) : null,
    size: e.size ? BigInt(e.size) : void 0,
    timestamp: e.timestamp ? BigInt(e.timestamp) : void 0,
    transactions: t,
    totalDifficulty: e.totalDifficulty ? BigInt(e.totalDifficulty) : null
  };
}
const pl = /* @__PURE__ */ no("block", hl);
function ys(e) {
  const { kzg: t } = e, n = e.to ?? (typeof e.blobs[0] == "string" ? "hex" : "bytes"), r = typeof e.blobs[0] == "string" ? e.blobs.map((i) => Tt(i)) : e.blobs, o = [];
  for (const i of r)
    o.push(Uint8Array.from(t.blobToKzgCommitment(i)));
  return n === "bytes" ? o : o.map((i) => xt(i));
}
function bs(e) {
  const { kzg: t } = e, n = e.to ?? (typeof e.blobs[0] == "string" ? "hex" : "bytes"), r = typeof e.blobs[0] == "string" ? e.blobs.map((s) => Tt(s)) : e.blobs, o = typeof e.commitments[0] == "string" ? e.commitments.map((s) => Tt(s)) : e.commitments, i = [];
  for (let s = 0; s < r.length; s++) {
    const a = r[s], l = o[s];
    i.push(Uint8Array.from(t.computeBlobKzgProof(a, l)));
  }
  return n === "bytes" ? i : i.map((s) => xt(s));
}
function gl(e, t, n, r) {
  if (typeof e.setBigUint64 == "function")
    return e.setBigUint64(t, n, r);
  const o = BigInt(32), i = BigInt(4294967295), s = Number(n >> o & i), a = Number(n & i), l = r ? 4 : 0, c = r ? 0 : 4;
  e.setUint32(t + l, s, r), e.setUint32(t + c, a, r);
}
function ml(e, t, n) {
  return e & t ^ ~e & n;
}
function yl(e, t, n) {
  return e & t ^ e & n ^ t & n;
}
class bl extends is {
  constructor(t, n, r, o) {
    super(), this.finished = !1, this.length = 0, this.pos = 0, this.destroyed = !1, this.blockLen = t, this.outputLen = n, this.padOffset = r, this.isLE = o, this.buffer = new Uint8Array(t), this.view = Ar(this.buffer);
  }
  update(t) {
    Kn(this), t = eo(t), Ht(t);
    const { view: n, buffer: r, blockLen: o } = this, i = t.length;
    for (let s = 0; s < i; ) {
      const a = Math.min(o - this.pos, i - s);
      if (a === o) {
        const l = Ar(t);
        for (; o <= i - s; s += o)
          this.process(l, s);
        continue;
      }
      r.set(t.subarray(s, s + a), this.pos), this.pos += a, s += a, this.pos === o && (this.process(n, 0), this.pos = 0);
    }
    return this.length += t.length, this.roundClean(), this;
  }
  digestInto(t) {
    Kn(this), os(t, this), this.finished = !0;
    const { buffer: n, view: r, blockLen: o, isLE: i } = this;
    let { pos: s } = this;
    n[s++] = 128, yn(this.buffer.subarray(s)), this.padOffset > o - s && (this.process(r, 0), s = 0);
    for (let g = s; g < o; g++)
      n[g] = 0;
    gl(r, o - 8, BigInt(this.length * 8), i), this.process(r, 0);
    const a = Ar(t), l = this.outputLen;
    if (l % 4)
      throw new Error("_sha2: outputLen should be aligned to 32bit");
    const c = l / 4, p = this.get();
    if (c > p.length)
      throw new Error("_sha2: outputLen bigger than state");
    for (let g = 0; g < c; g++)
      a.setUint32(4 * g, p[g], i);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const { blockLen: n, buffer: r, length: o, finished: i, destroyed: s, pos: a } = this;
    return t.destroyed = s, t.finished = i, t.length = o, t.pos = a, o % n && t.buffer.set(r), t;
  }
  clone() {
    return this._cloneInto();
  }
}
const pt = /* @__PURE__ */ Uint32Array.from([
  1779033703,
  3144134277,
  1013904242,
  2773480762,
  1359893119,
  2600822924,
  528734635,
  1541459225
]), wl = /* @__PURE__ */ Uint32Array.from([
  1116352408,
  1899447441,
  3049323471,
  3921009573,
  961987163,
  1508970993,
  2453635748,
  2870763221,
  3624381080,
  310598401,
  607225278,
  1426881987,
  1925078388,
  2162078206,
  2614888103,
  3248222580,
  3835390401,
  4022224774,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  2554220882,
  2821834349,
  2952996808,
  3210313671,
  3336571891,
  3584528711,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  2177026350,
  2456956037,
  2730485921,
  2820302411,
  3259730800,
  3345764771,
  3516065817,
  3600352804,
  4094571909,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  2227730452,
  2361852424,
  2428436474,
  2756734187,
  3204031479,
  3329325298
]), gt = /* @__PURE__ */ new Uint32Array(64);
class xl extends bl {
  constructor(t = 32) {
    super(64, t, 8, !1), this.A = pt[0] | 0, this.B = pt[1] | 0, this.C = pt[2] | 0, this.D = pt[3] | 0, this.E = pt[4] | 0, this.F = pt[5] | 0, this.G = pt[6] | 0, this.H = pt[7] | 0;
  }
  get() {
    const { A: t, B: n, C: r, D: o, E: i, F: s, G: a, H: l } = this;
    return [t, n, r, o, i, s, a, l];
  }
  // prettier-ignore
  set(t, n, r, o, i, s, a, l) {
    this.A = t | 0, this.B = n | 0, this.C = r | 0, this.D = o | 0, this.E = i | 0, this.F = s | 0, this.G = a | 0, this.H = l | 0;
  }
  process(t, n) {
    for (let g = 0; g < 16; g++, n += 4)
      gt[g] = t.getUint32(n, !1);
    for (let g = 16; g < 64; g++) {
      const m = gt[g - 15], x = gt[g - 2], C = et(m, 7) ^ et(m, 18) ^ m >>> 3, f = et(x, 17) ^ et(x, 19) ^ x >>> 10;
      gt[g] = f + gt[g - 7] + C + gt[g - 16] | 0;
    }
    let { A: r, B: o, C: i, D: s, E: a, F: l, G: c, H: p } = this;
    for (let g = 0; g < 64; g++) {
      const m = et(a, 6) ^ et(a, 11) ^ et(a, 25), x = p + m + ml(a, l, c) + wl[g] + gt[g] | 0, f = (et(r, 2) ^ et(r, 13) ^ et(r, 22)) + yl(r, o, i) | 0;
      p = c, c = l, l = a, a = s + x | 0, s = i, i = o, o = r, r = x + f | 0;
    }
    r = r + this.A | 0, o = o + this.B | 0, i = i + this.C | 0, s = s + this.D | 0, a = a + this.E | 0, l = l + this.F | 0, c = c + this.G | 0, p = p + this.H | 0, this.set(r, o, i, s, a, l, c, p);
  }
  roundClean() {
    yn(gt);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), yn(this.buffer);
  }
}
const vl = /* @__PURE__ */ ss(() => new xl()), Cl = vl;
function Sl(e, t) {
  return Cl(Sn(e, { strict: !1 }) ? ts(e) : e);
}
function kl(e) {
  const { commitment: t, version: n = 1 } = e, r = e.to ?? (typeof t == "string" ? "hex" : "bytes"), o = Sl(t);
  return o.set([n], 0), r === "bytes" ? o : xt(o);
}
function Il(e) {
  const { commitments: t, version: n } = e, r = e.to ?? (typeof t[0] == "string" ? "hex" : "bytes"), o = [];
  for (const i of t)
    o.push(kl({
      commitment: i,
      to: r,
      version: n
    }));
  return o;
}
const ai = 6, ws = 32, io = 4096, xs = ws * io, ci = xs * ai - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * io * ai, vs = 1;
class Tl extends be {
  constructor({ maxSize: t, size: n }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${t} bytes`, `Given: ${n} bytes`],
      name: "BlobSizeTooLargeError"
    });
  }
}
class Cs extends be {
  constructor() {
    super("Blob data must not be empty.", { name: "EmptyBlobError" });
  }
}
class El extends be {
  constructor({ hash: t, size: n }) {
    super(`Versioned hash "${t}" size is invalid.`, {
      metaMessages: ["Expected: 32", `Received: ${n}`],
      name: "InvalidVersionedHashSizeError"
    });
  }
}
class jl extends be {
  constructor({ hash: t, version: n }) {
    super(`Versioned hash "${t}" version is invalid.`, {
      metaMessages: [
        `Expected: ${vs}`,
        `Received: ${n}`
      ],
      name: "InvalidVersionedHashVersionError"
    });
  }
}
function Al(e) {
  const t = e.to ?? (typeof e.data == "string" ? "hex" : "bytes"), n = typeof e.data == "string" ? Tt(e.data) : e.data, r = Wt(n);
  if (!r)
    throw new Cs();
  if (r > ci)
    throw new Tl({
      maxSize: ci,
      size: r
    });
  const o = [];
  let i = !0, s = 0;
  for (; i; ) {
    const a = fs(new Uint8Array(xs));
    let l = 0;
    for (; l < io; ) {
      const c = n.slice(s, s + (ws - 1));
      if (a.pushByte(0), a.pushBytes(c), c.length < 31) {
        a.pushByte(128), i = !1;
        break;
      }
      l++, s += 31;
    }
    o.push(a);
  }
  return t === "bytes" ? o.map((a) => a.bytes) : o.map((a) => xt(a.bytes));
}
function Ml(e) {
  const { data: t, kzg: n, to: r } = e, o = e.blobs ?? Al({ data: t, to: r }), i = e.commitments ?? ys({ blobs: o, kzg: n, to: r }), s = e.proofs ?? bs({ blobs: o, commitments: i, kzg: n, to: r }), a = [];
  for (let l = 0; l < o.length; l++)
    a.push({
      blob: o[l],
      commitment: i[l],
      proof: s[l]
    });
  return a;
}
function Pl(e) {
  if (e.type)
    return e.type;
  if (typeof e.authorizationList < "u")
    return "eip7702";
  if (typeof e.blobs < "u" || typeof e.blobVersionedHashes < "u" || typeof e.maxFeePerBlobGas < "u" || typeof e.sidecars < "u")
    return "eip4844";
  if (typeof e.maxFeePerGas < "u" || typeof e.maxPriorityFeePerGas < "u")
    return "eip1559";
  if (typeof e.gasPrice < "u")
    return typeof e.accessList < "u" ? "eip2930" : "legacy";
  throw new ll({ transaction: e });
}
function Ol(e, { args: t, eventName: n } = {}) {
  return {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    logIndex: e.logIndex ? Number(e.logIndex) : null,
    transactionHash: e.transactionHash ? e.transactionHash : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    ...n ? { args: t, eventName: n } : {}
  };
}
const $l = {
  "0x0": "reverted",
  "0x1": "success"
};
function _l(e) {
  const t = {
    ...e,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    contractAddress: e.contractAddress ? e.contractAddress : null,
    cumulativeGasUsed: e.cumulativeGasUsed ? BigInt(e.cumulativeGasUsed) : null,
    effectiveGasPrice: e.effectiveGasPrice ? BigInt(e.effectiveGasPrice) : null,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : null,
    logs: e.logs ? e.logs.map((n) => Ol(n)) : null,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? Zn(e.transactionIndex) : null,
    status: e.status ? $l[e.status] : null,
    type: e.type ? ms[e.type] || e.type : null
  };
  return e.blobGasPrice && (t.blobGasPrice = BigInt(e.blobGasPrice)), e.blobGasUsed && (t.blobGasUsed = BigInt(e.blobGasUsed)), t;
}
const Rl = /* @__PURE__ */ no("transactionReceipt", _l);
function so(e) {
  return {
    formatters: void 0,
    fees: void 0,
    serializers: void 0,
    ...e
  };
}
function Nl(e) {
  const { authorizationList: t } = e;
  if (t)
    for (const n of t) {
      const { chainId: r } = n, o = n.address;
      if (!jt(o))
        throw new Et({ address: o });
      if (r < 0)
        throw new rr({ chainId: r });
    }
  ao(e);
}
function Bl(e) {
  const { blobVersionedHashes: t } = e;
  if (t) {
    if (t.length === 0)
      throw new Cs();
    for (const n of t) {
      const r = Wt(n), o = Zn(Kc(n, 0, 1));
      if (r !== 32)
        throw new El({ hash: n, size: r });
      if (o !== vs)
        throw new jl({
          hash: n,
          version: o
        });
    }
  }
  ao(e);
}
function ao(e) {
  const { chainId: t, maxPriorityFeePerGas: n, maxFeePerGas: r, to: o } = e;
  if (t <= 0)
    throw new rr({ chainId: t });
  if (o && !jt(o))
    throw new Et({ address: o });
  if (r && r > ro)
    throw new or({ maxFeePerGas: r });
  if (n && r && n > r)
    throw new gs({ maxFeePerGas: r, maxPriorityFeePerGas: n });
}
function Dl(e) {
  const { chainId: t, maxPriorityFeePerGas: n, gasPrice: r, maxFeePerGas: o, to: i } = e;
  if (t <= 0)
    throw new rr({ chainId: t });
  if (i && !jt(i))
    throw new Et({ address: i });
  if (n || o)
    throw new be("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
  if (r && r > ro)
    throw new or({ maxFeePerGas: r });
}
function Ll(e) {
  const { chainId: t, maxPriorityFeePerGas: n, gasPrice: r, maxFeePerGas: o, to: i } = e;
  if (i && !jt(i))
    throw new Et({ address: i });
  if (typeof t < "u" && t <= 0)
    throw new rr({ chainId: t });
  if (n || o)
    throw new be("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
  if (r && r > ro)
    throw new or({ maxFeePerGas: r });
}
function ir(e) {
  if (!e || e.length === 0)
    return [];
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const { address: r, storageKeys: o } = e[n];
    for (let i = 0; i < o.length; i++)
      if (o[i].length - 2 !== 64)
        throw new ul({ storageKey: o[i] });
    if (!jt(r, { strict: !1 }))
      throw new Et({ address: r });
    t.push([r, o]);
  }
  return t;
}
function zl(e, t) {
  const n = Pl(e);
  return n === "eip1559" ? Wl(e, t) : n === "eip2930" ? Hl(e, t) : n === "eip4844" ? Fl(e, t) : n === "eip7702" ? Ul(e, t) : Vl(e, t);
}
function Ul(e, t) {
  const { authorizationList: n, chainId: r, gas: o, nonce: i, to: s, value: a, maxFeePerGas: l, maxPriorityFeePerGas: c, accessList: p, data: g } = e;
  Nl(e);
  const m = ir(p), x = ql(n);
  return kn([
    "0x04",
    At([
      te(r),
      i ? te(i) : "0x",
      c ? te(c) : "0x",
      l ? te(l) : "0x",
      o ? te(o) : "0x",
      s ?? "0x",
      a ? te(a) : "0x",
      g ?? "0x",
      m,
      x,
      ...In(e, t)
    ])
  ]);
}
function Fl(e, t) {
  const { chainId: n, gas: r, nonce: o, to: i, value: s, maxFeePerBlobGas: a, maxFeePerGas: l, maxPriorityFeePerGas: c, accessList: p, data: g } = e;
  Bl(e);
  let m = e.blobVersionedHashes, x = e.sidecars;
  if (e.blobs && (typeof m > "u" || typeof x > "u")) {
    const T = typeof e.blobs[0] == "string" ? e.blobs : e.blobs.map((_) => xt(_)), M = e.kzg, k = ys({
      blobs: T,
      kzg: M
    });
    if (typeof m > "u" && (m = Il({
      commitments: k
    })), typeof x > "u") {
      const _ = bs({ blobs: T, commitments: k, kzg: M });
      x = Ml({ blobs: T, commitments: k, proofs: _ });
    }
  }
  const C = ir(p), f = [
    te(n),
    o ? te(o) : "0x",
    c ? te(c) : "0x",
    l ? te(l) : "0x",
    r ? te(r) : "0x",
    i ?? "0x",
    s ? te(s) : "0x",
    g ?? "0x",
    C,
    a ? te(a) : "0x",
    m ?? [],
    ...In(e, t)
  ], I = [], j = [], B = [];
  if (x)
    for (let T = 0; T < x.length; T++) {
      const { blob: M, commitment: k, proof: _ } = x[T];
      I.push(M), j.push(k), B.push(_);
    }
  return kn([
    "0x03",
    // If sidecars are enabled, envelope turns into a "wrapper":
    At(x ? [f, I, j, B] : f)
  ]);
}
function Wl(e, t) {
  const { chainId: n, gas: r, nonce: o, to: i, value: s, maxFeePerGas: a, maxPriorityFeePerGas: l, accessList: c, data: p } = e;
  ao(e);
  const g = ir(c), m = [
    te(n),
    o ? te(o) : "0x",
    l ? te(l) : "0x",
    a ? te(a) : "0x",
    r ? te(r) : "0x",
    i ?? "0x",
    s ? te(s) : "0x",
    p ?? "0x",
    g,
    ...In(e, t)
  ];
  return kn([
    "0x02",
    At(m)
  ]);
}
function Hl(e, t) {
  const { chainId: n, gas: r, data: o, nonce: i, to: s, value: a, accessList: l, gasPrice: c } = e;
  Dl(e);
  const p = ir(l), g = [
    te(n),
    i ? te(i) : "0x",
    c ? te(c) : "0x",
    r ? te(r) : "0x",
    s ?? "0x",
    a ? te(a) : "0x",
    o ?? "0x",
    p,
    ...In(e, t)
  ];
  return kn([
    "0x01",
    At(g)
  ]);
}
function Vl(e, t) {
  const { chainId: n = 0, gas: r, data: o, nonce: i, to: s, value: a, gasPrice: l } = e;
  Ll(e);
  let c = [
    i ? te(i) : "0x",
    l ? te(l) : "0x",
    r ? te(r) : "0x",
    s ?? "0x",
    a ? te(a) : "0x",
    o ?? "0x"
  ];
  if (t) {
    const p = (() => {
      if (t.v >= 35n)
        return (t.v - 35n) / 2n > 0 ? t.v : 27n + (t.v === 35n ? 0n : 1n);
      if (n > 0)
        return BigInt(n * 2) + BigInt(35n + t.v - 27n);
      const x = 27n + (t.v === 27n ? 0n : 1n);
      if (t.v !== x)
        throw new cl({ v: t.v });
      return x;
    })(), g = Qn(t.r), m = Qn(t.s);
    c = [
      ...c,
      te(p),
      g === "0x00" ? "0x" : g,
      m === "0x00" ? "0x" : m
    ];
  } else n > 0 && (c = [
    ...c,
    te(n),
    "0x",
    "0x"
  ]);
  return At(c);
}
function In(e, t) {
  const n = t ?? e, { v: r, yParity: o } = n;
  if (typeof n.r > "u")
    return [];
  if (typeof n.s > "u")
    return [];
  if (typeof r > "u" && typeof o > "u")
    return [];
  const i = Qn(n.r), s = Qn(n.s);
  return [typeof o == "number" ? o ? te(1) : "0x" : r === 0n ? "0x" : r === 1n ? te(1) : r === 27n ? "0x" : te(1), i === "0x00" ? "0x" : i, s === "0x00" ? "0x" : s];
}
function ql(e) {
  if (!e || e.length === 0)
    return [];
  const t = [];
  for (const n of e) {
    const { chainId: r, nonce: o, ...i } = n, s = n.address;
    t.push([
      r ? gn(r) : "0x",
      s,
      o ? gn(o) : "0x",
      ...In({}, i)
    ]);
  }
  return t;
}
const Gl = "2.17.3", Yl = () => `@wagmi/core@${Gl}`;
var Ss = function(e, t, n, r) {
  if (n === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, Jn, ks;
class bn extends Error {
  get docsBaseUrl() {
    return "https://wagmi.sh/core";
  }
  get version() {
    return Yl();
  }
  constructor(t, n = {}) {
    var i;
    super(), Jn.add(this), Object.defineProperty(this, "details", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "docsPath", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "metaMessages", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "shortMessage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "WagmiCoreError"
    });
    const r = n.cause instanceof bn ? n.cause.details : (i = n.cause) != null && i.message ? n.cause.message : n.details, o = n.cause instanceof bn && n.cause.docsPath || n.docsPath;
    this.message = [
      t || "An error occurred.",
      "",
      ...n.metaMessages ? [...n.metaMessages, ""] : [],
      ...o ? [
        `Docs: ${this.docsBaseUrl}${o}.html${n.docsSlug ? `#${n.docsSlug}` : ""}`
      ] : [],
      ...r ? [`Details: ${r}`] : [],
      `Version: ${this.version}`
    ].join(`
`), n.cause && (this.cause = n.cause), this.details = r, this.docsPath = o, this.metaMessages = n.metaMessages, this.shortMessage = t;
  }
  walk(t) {
    return Ss(this, Jn, "m", ks).call(this, this, t);
  }
}
Jn = /* @__PURE__ */ new WeakSet(), ks = function e(t, n) {
  return n != null && n(t) ? t : t.cause ? Ss(this, Jn, "m", e).call(this, t.cause, n) : t;
};
class sr extends bn {
  constructor() {
    super("Chain not configured."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ChainNotConfiguredError"
    });
  }
}
class mt extends bn {
  constructor() {
    super("Provider not found."), Object.defineProperty(this, "name", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "ProviderNotFoundError"
    });
  }
}
co.type = "injected";
function co(e = {}) {
  const { shimDisconnect: t = !0, unstable_shimAsyncInject: n } = e;
  function r() {
    const l = e.target;
    if (typeof l == "function") {
      const c = l();
      if (c)
        return c;
    }
    return typeof l == "object" ? l : typeof l == "string" ? {
      ...Ql[l] ?? {
        id: l,
        name: `${l[0].toUpperCase()}${l.slice(1)}`,
        provider: `is${l[0].toUpperCase()}${l.slice(1)}`
      }
    } : {
      id: "injected",
      name: "Injected",
      provider(c) {
        return c == null ? void 0 : c.ethereum;
      }
    };
  }
  let o, i, s, a;
  return (l) => ({
    get icon() {
      return r().icon;
    },
    get id() {
      return r().id;
    },
    get name() {
      return r().name;
    },
    /** @deprecated */
    get supportsSimulation() {
      return !0;
    },
    type: co.type,
    async setup() {
      const c = await this.getProvider();
      c != null && c.on && e.target && (s || (s = this.onConnect.bind(this), c.on("connect", s)), o || (o = this.onAccountsChanged.bind(this), c.on("accountsChanged", o)));
    },
    async connect({ chainId: c, isReconnecting: p } = {}) {
      var x, C, f, I, j, B;
      const g = await this.getProvider();
      if (!g)
        throw new mt();
      let m = [];
      if (p)
        m = await this.getAccounts().catch(() => []);
      else if (t)
        try {
          m = (I = (f = (C = (x = (await g.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }]
          }))[0]) == null ? void 0 : x.caveats) == null ? void 0 : C[0]) == null ? void 0 : f.value) == null ? void 0 : I.map((M) => De(M)), m.length > 0 && (m = await this.getAccounts());
        } catch (T) {
          const M = T;
          if (M.code === ke.code)
            throw new ke(M);
          if (M.code === jr.code)
            throw M;
        }
      try {
        !(m != null && m.length) && !p && (m = (await g.request({
          method: "eth_requestAccounts"
        })).map((k) => De(k))), s && (g.removeListener("connect", s), s = void 0), o || (o = this.onAccountsChanged.bind(this), g.on("accountsChanged", o)), i || (i = this.onChainChanged.bind(this), g.on("chainChanged", i)), a || (a = this.onDisconnect.bind(this), g.on("disconnect", a));
        let T = await this.getChainId();
        if (c && T !== c) {
          const M = await this.switchChain({ chainId: c }).catch((k) => {
            if (k.code === ke.code)
              throw k;
            return { id: T };
          });
          T = (M == null ? void 0 : M.id) ?? T;
        }
        return t && await ((j = l.storage) == null ? void 0 : j.removeItem(`${this.id}.disconnected`)), e.target || await ((B = l.storage) == null ? void 0 : B.setItem("injected.connected", !0)), { accounts: m, chainId: T };
      } catch (T) {
        const M = T;
        throw M.code === ke.code ? new ke(M) : M.code === jr.code ? new jr(M) : M;
      }
    },
    async disconnect() {
      var p, g;
      const c = await this.getProvider();
      if (!c)
        throw new mt();
      i && (c.removeListener("chainChanged", i), i = void 0), a && (c.removeListener("disconnect", a), a = void 0), s || (s = this.onConnect.bind(this), c.on("connect", s));
      try {
        await ac(() => (
          // TODO: Remove explicit type for viem@3
          c.request({
            // `'wallet_revokePermissions'` added in `viem@2.10.3`
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }]
          })
        ), { timeout: 100 });
      } catch {
      }
      t && await ((p = l.storage) == null ? void 0 : p.setItem(`${this.id}.disconnected`, !0)), e.target || await ((g = l.storage) == null ? void 0 : g.removeItem("injected.connected"));
    },
    async getAccounts() {
      const c = await this.getProvider();
      if (!c)
        throw new mt();
      return (await c.request({ method: "eth_accounts" })).map((g) => De(g));
    },
    async getChainId() {
      const c = await this.getProvider();
      if (!c)
        throw new mt();
      const p = await c.request({ method: "eth_chainId" });
      return Number(p);
    },
    async getProvider() {
      if (typeof window > "u")
        return;
      let c;
      const p = r();
      return typeof p.provider == "function" ? c = p.provider(window) : typeof p.provider == "string" ? c = Hn(window, p.provider) : c = p.provider, c && !c.removeListener && ("off" in c && typeof c.off == "function" ? c.removeListener = c.off : c.removeListener = () => {
      }), c;
    },
    async isAuthorized() {
      var c, p;
      try {
        if (t && // If shim exists in storage, connector is disconnected
        await ((c = l.storage) == null ? void 0 : c.getItem(`${this.id}.disconnected`)) || !e.target && !await ((p = l.storage) == null ? void 0 : p.getItem("injected.connected")))
          return !1;
        if (!await this.getProvider()) {
          if (n !== void 0 && n !== !1) {
            const C = async () => (typeof window < "u" && window.removeEventListener("ethereum#initialized", C), !!await this.getProvider()), f = typeof n == "number" ? n : 1e3;
            if (await Promise.race([
              ...typeof window < "u" ? [
                new Promise((j) => window.addEventListener("ethereum#initialized", () => j(C()), { once: !0 }))
              ] : [],
              new Promise((j) => setTimeout(() => j(C()), f))
            ]))
              return !0;
          }
          throw new mt();
        }
        return !!(await sc(() => this.getAccounts())).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: c, chainId: p }) {
      var C, f, I, j;
      const g = await this.getProvider();
      if (!g)
        throw new mt();
      const m = l.chains.find((B) => B.id === p);
      if (!m)
        throw new It(new sr());
      const x = new Promise((B) => {
        const T = (M) => {
          "chainId" in M && M.chainId === p && (l.emitter.off("change", T), B());
        };
        l.emitter.on("change", T);
      });
      try {
        return await Promise.all([
          g.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: yt(p) }]
          }).then(async () => {
            await this.getChainId() === p && l.emitter.emit("change", { chainId: p });
          }),
          x
        ]), m;
      } catch (B) {
        const T = B;
        if (T.code === 4902 || // Unwrapping for MetaMask Mobile
        // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
        ((f = (C = T == null ? void 0 : T.data) == null ? void 0 : C.originalError) == null ? void 0 : f.code) === 4902)
          try {
            const { default: M, ...k } = m.blockExplorers ?? {};
            let _;
            c != null && c.blockExplorerUrls ? _ = c.blockExplorerUrls : M && (_ = [
              M.url,
              ...Object.values(k).map((X) => X.url)
            ]);
            let D;
            (I = c == null ? void 0 : c.rpcUrls) != null && I.length ? D = c.rpcUrls : D = [((j = m.rpcUrls.default) == null ? void 0 : j.http[0]) ?? ""];
            const J = {
              blockExplorerUrls: _,
              chainId: yt(p),
              chainName: (c == null ? void 0 : c.chainName) ?? m.name,
              iconUrls: c == null ? void 0 : c.iconUrls,
              nativeCurrency: (c == null ? void 0 : c.nativeCurrency) ?? m.nativeCurrency,
              rpcUrls: D
            };
            return await Promise.all([
              g.request({
                method: "wallet_addEthereumChain",
                params: [J]
              }).then(async () => {
                if (await this.getChainId() === p)
                  l.emitter.emit("change", { chainId: p });
                else
                  throw new ke(new Error("User rejected switch after adding network."));
              }),
              x
            ]), m;
          } catch (M) {
            throw new ke(M);
          }
        throw T.code === ke.code ? new ke(T) : new It(T);
      }
    },
    async onAccountsChanged(c) {
      var p;
      if (c.length === 0)
        this.onDisconnect();
      else if (l.emitter.listenerCount("connect")) {
        const g = (await this.getChainId()).toString();
        this.onConnect({ chainId: g }), t && await ((p = l.storage) == null ? void 0 : p.removeItem(`${this.id}.disconnected`));
      } else
        l.emitter.emit("change", {
          accounts: c.map((g) => De(g))
        });
    },
    onChainChanged(c) {
      const p = Number(c);
      l.emitter.emit("change", { chainId: p });
    },
    async onConnect(c) {
      const p = await this.getAccounts();
      if (p.length === 0)
        return;
      const g = Number(c.chainId);
      l.emitter.emit("connect", { accounts: p, chainId: g });
      const m = await this.getProvider();
      m && (s && (m.removeListener("connect", s), s = void 0), o || (o = this.onAccountsChanged.bind(this), m.on("accountsChanged", o)), i || (i = this.onChainChanged.bind(this), m.on("chainChanged", i)), a || (a = this.onDisconnect.bind(this), m.on("disconnect", a)));
    },
    async onDisconnect(c) {
      const p = await this.getProvider();
      c && c.code === 1013 && p && (await this.getAccounts()).length || (l.emitter.emit("disconnect"), p && (i && (p.removeListener("chainChanged", i), i = void 0), a && (p.removeListener("disconnect", a), a = void 0), s || (s = this.onConnect.bind(this), p.on("connect", s))));
    }
  });
}
const Ql = {
  coinbaseWallet: {
    id: "coinbaseWallet",
    name: "Coinbase Wallet",
    provider(e) {
      return e != null && e.coinbaseWalletExtension ? e.coinbaseWalletExtension : Hn(e, "isCoinbaseWallet");
    }
  },
  metaMask: {
    id: "metaMask",
    name: "MetaMask",
    provider(e) {
      return Hn(e, (t) => {
        if (!t.isMetaMask || t.isBraveWallet && !t._events && !t._state)
          return !1;
        const n = [
          "isApexWallet",
          "isAvalanche",
          "isBitKeep",
          "isBlockWallet",
          "isKuCoinWallet",
          "isMathWallet",
          "isOkxWallet",
          "isOKExWallet",
          "isOneInchIOSWallet",
          "isOneInchAndroidWallet",
          "isOpera",
          "isPhantom",
          "isPortal",
          "isRabby",
          "isTokenPocket",
          "isTokenary",
          "isUniswapWallet",
          "isZerion"
        ];
        for (const r of n)
          if (t[r])
            return !1;
        return !0;
      });
    }
  },
  phantom: {
    id: "phantom",
    name: "Phantom",
    provider(e) {
      var t, n;
      return (t = e == null ? void 0 : e.phantom) != null && t.ethereum ? (n = e.phantom) == null ? void 0 : n.ethereum : Hn(e, "isPhantom");
    }
  }
};
function Hn(e, t) {
  function n(o) {
    return typeof t == "function" ? t(o) : typeof t == "string" ? o[t] : !0;
  }
  const r = e.ethereum;
  if (r != null && r.providers)
    return r.providers.find((o) => n(o));
  if (r && n(r))
    return r;
}
function Zl(e) {
  var i, s, a;
  const { chain: t } = e, n = t.rpcUrls.default.http[0];
  if (!e.transports)
    return [n];
  const r = (s = (i = e.transports) == null ? void 0 : i[t.id]) == null ? void 0 : s.call(i, { chain: t });
  return (((a = r == null ? void 0 : r.value) == null ? void 0 : a.transports) || [r]).map(({ value: l }) => (l == null ? void 0 : l.url) || n);
}
ar.type = "coinbaseWallet";
function ar(e = {}) {
  return e.version === "3" || e.headlessMode ? Jl(e) : Kl(e);
}
function Kl(e) {
  let t, n, r, o;
  return (i) => ({
    id: "coinbaseWalletSDK",
    name: "Coinbase Wallet",
    rdns: "com.coinbase.wallet",
    type: ar.type,
    async connect({ chainId: s, ...a } = {}) {
      try {
        const l = await this.getProvider(), c = (await l.request({
          method: "eth_requestAccounts",
          params: "instantOnboarding" in a && a.instantOnboarding ? [{ onboarding: "instant" }] : []
        })).map((g) => De(g));
        n || (n = this.onAccountsChanged.bind(this), l.on("accountsChanged", n)), r || (r = this.onChainChanged.bind(this), l.on("chainChanged", r)), o || (o = this.onDisconnect.bind(this), l.on("disconnect", o));
        let p = await this.getChainId();
        if (s && p !== s) {
          const g = await this.switchChain({ chainId: s }).catch((m) => {
            if (m.code === ke.code)
              throw m;
            return { id: p };
          });
          p = (g == null ? void 0 : g.id) ?? p;
        }
        return { accounts: c, chainId: p };
      } catch (l) {
        throw /(user closed modal|accounts received is empty|user denied account|request rejected)/i.test(l.message) ? new ke(l) : l;
      }
    },
    async disconnect() {
      var a;
      const s = await this.getProvider();
      n && (s.removeListener("accountsChanged", n), n = void 0), r && (s.removeListener("chainChanged", r), r = void 0), o && (s.removeListener("disconnect", o), o = void 0), s.disconnect(), (a = s.close) == null || a.call(s);
    },
    async getAccounts() {
      return (await (await this.getProvider()).request({
        method: "eth_accounts"
      })).map((a) => De(a));
    },
    async getChainId() {
      const a = await (await this.getProvider()).request({
        method: "eth_chainId"
      });
      return Number(a);
    },
    async getProvider() {
      if (!t) {
        const s = (() => {
          var c;
          return typeof e.preference == "string" ? { options: e.preference } : {
            ...e.preference,
            options: ((c = e.preference) == null ? void 0 : c.options) ?? "all"
          };
        })(), { createCoinbaseWalletSDK: a } = await import("./index-Dj2DOoun.mjs");
        t = a({
          ...e,
          appChainIds: i.chains.map((c) => c.id),
          preference: s
        }).getProvider();
      }
      return t;
    },
    async isAuthorized() {
      try {
        return !!(await this.getAccounts()).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: s, chainId: a }) {
      var p, g, m, x;
      const l = i.chains.find((C) => C.id === a);
      if (!l)
        throw new It(new sr());
      const c = await this.getProvider();
      try {
        return await c.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: yt(l.id) }]
        }), l;
      } catch (C) {
        if (C.code === 4902)
          try {
            let f;
            s != null && s.blockExplorerUrls ? f = s.blockExplorerUrls : f = (p = l.blockExplorers) != null && p.default.url ? [(g = l.blockExplorers) == null ? void 0 : g.default.url] : [];
            let I;
            (m = s == null ? void 0 : s.rpcUrls) != null && m.length ? I = s.rpcUrls : I = [((x = l.rpcUrls.default) == null ? void 0 : x.http[0]) ?? ""];
            const j = {
              blockExplorerUrls: f,
              chainId: yt(a),
              chainName: (s == null ? void 0 : s.chainName) ?? l.name,
              iconUrls: s == null ? void 0 : s.iconUrls,
              nativeCurrency: (s == null ? void 0 : s.nativeCurrency) ?? l.nativeCurrency,
              rpcUrls: I
            };
            return await c.request({
              method: "wallet_addEthereumChain",
              params: [j]
            }), l;
          } catch (f) {
            throw new ke(f);
          }
        throw new It(C);
      }
    },
    onAccountsChanged(s) {
      s.length === 0 ? this.onDisconnect() : i.emitter.emit("change", {
        accounts: s.map((a) => De(a))
      });
    },
    onChainChanged(s) {
      const a = Number(s);
      i.emitter.emit("change", { chainId: a });
    },
    async onDisconnect(s) {
      i.emitter.emit("disconnect");
      const a = await this.getProvider();
      n && (a.removeListener("accountsChanged", n), n = void 0), r && (a.removeListener("chainChanged", r), r = void 0), o && (a.removeListener("disconnect", o), o = void 0);
    }
  });
}
function Jl(e) {
  let n, r, o, i, s;
  return (a) => ({
    id: "coinbaseWalletSDK",
    name: "Coinbase Wallet",
    rdns: "com.coinbase.wallet",
    type: ar.type,
    async connect({ chainId: l } = {}) {
      try {
        const c = await this.getProvider(), p = (await c.request({
          method: "eth_requestAccounts"
        })).map((m) => De(m));
        o || (o = this.onAccountsChanged.bind(this), c.on("accountsChanged", o)), i || (i = this.onChainChanged.bind(this), c.on("chainChanged", i)), s || (s = this.onDisconnect.bind(this), c.on("disconnect", s));
        let g = await this.getChainId();
        if (l && g !== l) {
          const m = await this.switchChain({ chainId: l }).catch((x) => {
            if (x.code === ke.code)
              throw x;
            return { id: g };
          });
          g = (m == null ? void 0 : m.id) ?? g;
        }
        return { accounts: p, chainId: g };
      } catch (c) {
        throw /(user closed modal|accounts received is empty|user denied account)/i.test(c.message) ? new ke(c) : c;
      }
    },
    async disconnect() {
      const l = await this.getProvider();
      o && (l.removeListener("accountsChanged", o), o = void 0), i && (l.removeListener("chainChanged", i), i = void 0), s && (l.removeListener("disconnect", s), s = void 0), l.disconnect(), l.close();
    },
    async getAccounts() {
      return (await (await this.getProvider()).request({
        method: "eth_accounts"
      })).map((c) => De(c));
    },
    async getChainId() {
      const c = await (await this.getProvider()).request({
        method: "eth_chainId"
      });
      return Number(c);
    },
    async getProvider() {
      var l;
      if (!r) {
        const c = await (async () => {
          const { default: C } = await import("./index-loY7THxe.mjs").then((f) => f.i);
          return typeof C != "function" && typeof C.default == "function" ? C.default : C;
        })();
        n = new c({ ...e, reloadOnDisconnect: !1 });
        const p = (l = n.walletExtension) == null ? void 0 : l.getChainId(), g = a.chains.find((C) => e.chainId ? C.id === e.chainId : C.id === p) || a.chains[0], m = e.chainId || (g == null ? void 0 : g.id), x = e.jsonRpcUrl || (g == null ? void 0 : g.rpcUrls.default.http[0]);
        r = n.makeWeb3Provider(x, m);
      }
      return r;
    },
    async isAuthorized() {
      try {
        return !!(await this.getAccounts()).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: l, chainId: c }) {
      var m, x, C, f;
      const p = a.chains.find((I) => I.id === c);
      if (!p)
        throw new It(new sr());
      const g = await this.getProvider();
      try {
        return await g.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: yt(p.id) }]
        }), p;
      } catch (I) {
        if (I.code === 4902)
          try {
            let j;
            l != null && l.blockExplorerUrls ? j = l.blockExplorerUrls : j = (m = p.blockExplorers) != null && m.default.url ? [(x = p.blockExplorers) == null ? void 0 : x.default.url] : [];
            let B;
            (C = l == null ? void 0 : l.rpcUrls) != null && C.length ? B = l.rpcUrls : B = [((f = p.rpcUrls.default) == null ? void 0 : f.http[0]) ?? ""];
            const T = {
              blockExplorerUrls: j,
              chainId: yt(c),
              chainName: (l == null ? void 0 : l.chainName) ?? p.name,
              iconUrls: l == null ? void 0 : l.iconUrls,
              nativeCurrency: (l == null ? void 0 : l.nativeCurrency) ?? p.nativeCurrency,
              rpcUrls: B
            };
            return await g.request({
              method: "wallet_addEthereumChain",
              params: [T]
            }), p;
          } catch (j) {
            throw new ke(j);
          }
        throw new It(I);
      }
    },
    onAccountsChanged(l) {
      l.length === 0 ? this.onDisconnect() : a.emitter.emit("change", {
        accounts: l.map((c) => De(c))
      });
    },
    onChainChanged(l) {
      const c = Number(l);
      a.emitter.emit("change", { chainId: c });
    },
    async onDisconnect(l) {
      a.emitter.emit("disconnect");
      const c = await this.getProvider();
      o && (c.removeListener("accountsChanged", o), o = void 0), i && (c.removeListener("chainChanged", i), i = void 0), s && (c.removeListener("disconnect", s), s = void 0);
    }
  });
}
lo.type = "walletConnect";
function lo(e) {
  const t = e.isNewChainsStale ?? !0;
  let n, r;
  const o = "eip155";
  let i, s, a, l, c, p;
  return (g) => ({
    id: "walletConnect",
    name: "WalletConnect",
    type: lo.type,
    async setup() {
      const m = await this.getProvider().catch(() => null);
      m && (a || (a = this.onConnect.bind(this), m.on("connect", a)), c || (c = this.onSessionDelete.bind(this), m.on("session_delete", c)));
    },
    async connect({ chainId: m, ...x } = {}) {
      var C, f;
      try {
        const I = await this.getProvider();
        if (!I)
          throw new mt();
        l || (l = this.onDisplayUri, I.on("display_uri", l));
        let j = m;
        if (!j) {
          const k = await ((C = g.storage) == null ? void 0 : C.getItem("state")) ?? {};
          g.chains.some((D) => D.id === k.chainId) ? j = k.chainId : j = (f = g.chains[0]) == null ? void 0 : f.id;
        }
        if (!j)
          throw new Error("No chains found on connector.");
        const B = await this.isChainsStale();
        if (I.session && B && await I.disconnect(), !I.session || B) {
          const k = g.chains.filter((_) => _.id !== j).map((_) => _.id);
          await I.connect({
            optionalChains: [j, ...k],
            ..."pairingTopic" in x ? { pairingTopic: x.pairingTopic } : {}
          }), this.setRequestedChainsIds(g.chains.map((_) => _.id));
        }
        const T = (await I.enable()).map((k) => De(k)), M = await this.getChainId();
        return l && (I.removeListener("display_uri", l), l = void 0), a && (I.removeListener("connect", a), a = void 0), i || (i = this.onAccountsChanged.bind(this), I.on("accountsChanged", i)), s || (s = this.onChainChanged.bind(this), I.on("chainChanged", s)), p || (p = this.onDisconnect.bind(this), I.on("disconnect", p)), c || (c = this.onSessionDelete.bind(this), I.on("session_delete", c)), { accounts: T, chainId: M };
      } catch (I) {
        throw /(user rejected|connection request reset)/i.test(I == null ? void 0 : I.message) ? new ke(I) : I;
      }
    },
    async disconnect() {
      const m = await this.getProvider();
      try {
        await (m == null ? void 0 : m.disconnect());
      } catch (x) {
        if (!/No matching key/i.test(x.message))
          throw x;
      } finally {
        s && (m == null || m.removeListener("chainChanged", s), s = void 0), p && (m == null || m.removeListener("disconnect", p), p = void 0), a || (a = this.onConnect.bind(this), m == null || m.on("connect", a)), i && (m == null || m.removeListener("accountsChanged", i), i = void 0), c && (m == null || m.removeListener("session_delete", c), c = void 0), this.setRequestedChainsIds([]);
      }
    },
    async getAccounts() {
      return (await this.getProvider()).accounts.map((x) => De(x));
    },
    async getProvider({ chainId: m } = {}) {
      var C;
      async function x() {
        const f = g.chains.map((j) => j.id);
        if (!f.length)
          return;
        const { EthereumProvider: I } = await import("./index.es-Db43vtJY.mjs").then((j) => j.H);
        return await I.init({
          ...e,
          disableProviderPing: !0,
          optionalChains: f,
          projectId: e.projectId,
          rpcMap: Object.fromEntries(g.chains.map((j) => {
            const [B] = Zl({
              chain: j,
              transports: g.transports
            });
            return [j.id, B];
          })),
          showQrModal: e.showQrModal ?? !0
        });
      }
      return n || (r || (r = x()), n = await r, n == null || n.events.setMaxListeners(Number.POSITIVE_INFINITY)), m && await ((C = this.switchChain) == null ? void 0 : C.call(this, { chainId: m })), n;
    },
    async getChainId() {
      return (await this.getProvider()).chainId;
    },
    async isAuthorized() {
      try {
        const [m, x] = await Promise.all([
          this.getAccounts(),
          this.getProvider()
        ]);
        return m.length ? await this.isChainsStale() && x.session ? (await x.disconnect().catch(() => {
        }), !1) : !0 : !1;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: m, chainId: x }) {
      var I, j, B;
      const C = await this.getProvider();
      if (!C)
        throw new mt();
      const f = g.chains.find((T) => T.id === x);
      if (!f)
        throw new It(new sr());
      try {
        await Promise.all([
          new Promise((M) => {
            const k = ({ chainId: _ }) => {
              _ === x && (g.emitter.off("change", k), M());
            };
            g.emitter.on("change", k);
          }),
          C.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: yt(x) }]
          })
        ]);
        const T = await this.getRequestedChainsIds();
        return this.setRequestedChainsIds([...T, x]), f;
      } catch (T) {
        const M = T;
        if (/(user rejected)/i.test(M.message))
          throw new ke(M);
        try {
          let k;
          m != null && m.blockExplorerUrls ? k = m.blockExplorerUrls : k = (I = f.blockExplorers) != null && I.default.url ? [(j = f.blockExplorers) == null ? void 0 : j.default.url] : [];
          let _;
          (B = m == null ? void 0 : m.rpcUrls) != null && B.length ? _ = m.rpcUrls : _ = [...f.rpcUrls.default.http];
          const D = {
            blockExplorerUrls: k,
            chainId: yt(x),
            chainName: (m == null ? void 0 : m.chainName) ?? f.name,
            iconUrls: m == null ? void 0 : m.iconUrls,
            nativeCurrency: (m == null ? void 0 : m.nativeCurrency) ?? f.nativeCurrency,
            rpcUrls: _
          };
          await C.request({
            method: "wallet_addEthereumChain",
            params: [D]
          });
          const J = await this.getRequestedChainsIds();
          return this.setRequestedChainsIds([...J, x]), f;
        } catch (k) {
          throw new ke(k);
        }
      }
    },
    onAccountsChanged(m) {
      m.length === 0 ? this.onDisconnect() : g.emitter.emit("change", {
        accounts: m.map((x) => De(x))
      });
    },
    onChainChanged(m) {
      const x = Number(m);
      g.emitter.emit("change", { chainId: x });
    },
    async onConnect(m) {
      const x = Number(m.chainId), C = await this.getAccounts();
      g.emitter.emit("connect", { accounts: C, chainId: x });
    },
    async onDisconnect(m) {
      this.setRequestedChainsIds([]), g.emitter.emit("disconnect");
      const x = await this.getProvider();
      i && (x.removeListener("accountsChanged", i), i = void 0), s && (x.removeListener("chainChanged", s), s = void 0), p && (x.removeListener("disconnect", p), p = void 0), c && (x.removeListener("session_delete", c), c = void 0), a || (a = this.onConnect.bind(this), x.on("connect", a));
    },
    onDisplayUri(m) {
      g.emitter.emit("message", { type: "display_uri", data: m });
    },
    onSessionDelete() {
      this.onDisconnect();
    },
    getNamespaceChainsIds() {
      var x, C, f;
      return n ? ((f = (C = (x = n.session) == null ? void 0 : x.namespaces[o]) == null ? void 0 : C.accounts) == null ? void 0 : f.map((I) => Number.parseInt(I.split(":")[1] || ""))) ?? [] : [];
    },
    async getRequestedChainsIds() {
      var m;
      return await ((m = g.storage) == null ? void 0 : m.getItem(this.requestedChainsStorageKey)) ?? [];
    },
    /**
     * Checks if the target chains match the chains that were
     * initially requested by the connector for the WalletConnect session.
     * If there is a mismatch, this means that the chains on the connector
     * are considered stale, and need to be revalidated at a later point (via
     * connection).
     *
     * There may be a scenario where a dapp adds a chain to the
     * connector later on, however, this chain will not have been approved or rejected
     * by the wallet. In this case, the chain is considered stale.
     */
    async isChainsStale() {
      if (!t)
        return !1;
      const m = g.chains.map((f) => f.id), x = this.getNamespaceChainsIds();
      if (x.length && !x.some((f) => m.includes(f)))
        return !1;
      const C = await this.getRequestedChainsIds();
      return !m.every((f) => C.includes(f));
    },
    async setRequestedChainsIds(m) {
      var x;
      await ((x = g.storage) == null ? void 0 : x.setItem(this.requestedChainsStorageKey, m));
    },
    get requestedChainsStorageKey() {
      return `${this.id}.requestedChains`;
    }
  });
}
var li = /* @__PURE__ */ new Map(), Xl = ({
  projectId: e,
  walletConnectParameters: t,
  rkDetailsShowQrModal: n,
  rkDetailsIsWalletConnectModalConnector: r
}) => {
  let o = {
    ...t || {},
    projectId: e,
    showQrModal: !1
    // Required. Otherwise WalletConnect modal (Web3Modal) will popup during time of connection for a wallet
  };
  n && (o = { ...o, showQrModal: !0 }), "customStoragePrefix" in o || (o = {
    ...o,
    customStoragePrefix: r ? "clientOne" : "clientTwo"
  });
  const i = JSON.stringify(o), s = li.get(i);
  if (s)
    return s;
  const a = lo(o);
  return li.set(i, a), a;
};
function eu({
  projectId: e,
  walletDetails: t,
  walletConnectParameters: n
}) {
  return Xr((r) => ({
    ...Xl({
      projectId: e,
      walletConnectParameters: n,
      // Used in `connectorsForWallets` to add another
      // walletConnect wallet into rainbowkit with modal popup option
      rkDetailsShowQrModal: t.rkDetails.showQrModal,
      rkDetailsIsWalletConnectModalConnector: t.rkDetails.isWalletConnectModalConnector
    })(r),
    ...t
  }));
}
function uo({
  projectId: e,
  walletConnectParameters: t
}) {
  const n = "21fef48091f12692cad574a6f7753643";
  if (!e || e === "")
    throw new Error(
      "No projectId found. Every dApp must now provide a WalletConnect Cloud projectId to enable WalletConnect v2 https://www.rainbowkit.com/docs/installation#configure"
    );
  return e === "YOUR_PROJECT_ID" && (e = n), (r) => eu({
    projectId: e,
    walletDetails: r,
    walletConnectParameters: t
  });
}
function Is(e) {
  const t = typeof window < "u" ? window : void 0;
  if (typeof t > "u" || typeof t.ethereum > "u")
    return;
  const n = t.ethereum.providers;
  return n ? n.find((r) => r[e]) : t.ethereum[e] ? t.ethereum : void 0;
}
function Ts(e) {
  const t = (n, r) => {
    const [o, ...i] = r.split("."), s = n[o];
    if (s)
      return i.length === 0 ? s : t(s, i.join("."));
  };
  if (typeof window < "u") return t(window, e);
}
function Hr({
  flag: e,
  namespace: t
}) {
  return !!(t && typeof Ts(t) < "u" || e && typeof Is(e) < "u");
}
function tu({
  flag: e,
  namespace: t
}) {
  var o;
  const n = typeof window < "u" ? window : void 0;
  if (typeof n > "u") return;
  if (t) {
    const i = Ts(t);
    if (i) return i;
  }
  const r = (o = n.ethereum) == null ? void 0 : o.providers;
  if (e) {
    const i = Is(e);
    if (i) return i;
  }
  return typeof r < "u" && r.length > 0 ? r[0] : n.ethereum;
}
function nu(e) {
  return (t) => {
    const n = e ? {
      target: () => ({
        id: t.rkDetails.id,
        name: t.rkDetails.name,
        provider: e
      })
    } : {};
    return Xr((r) => ({
      // Spread the injectedConfig object, which may be empty or contain the target function
      ...co(n)(r),
      ...t
    }));
  };
}
function Vr({
  flag: e,
  namespace: t,
  target: n
}) {
  const r = n || tu({ flag: e, namespace: t });
  return nu(r);
}
function Es() {
  return typeof navigator < "u" && /android/i.test(navigator.userAgent);
}
function ru() {
  return typeof navigator < "u" && /iPhone|iPod/.test(navigator.userAgent);
}
function ou() {
  return typeof navigator < "u" && (/iPad/.test(navigator.userAgent) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}
function js() {
  return ru() || ou();
}
function ui() {
  return Es() || js();
}
var iu = ({
  projectId: e,
  walletConnectParameters: t
}) => {
  const n = ui() ? Hr({ flag: "isTrust" }) : Hr({ flag: "isTrustWallet" }), r = !n, o = (c) => `trust://wc?uri=${encodeURIComponent(c)}`, i = (c) => c, s = {
    getUri: r ? o : void 0
  };
  let a;
  return r && (a = {
    getUri: i,
    instructions: {
      learnMoreUrl: "https://trustwallet.com/",
      steps: [
        {
          description: "wallet_connectors.trust.qr_code.step1.description",
          step: "install",
          title: "wallet_connectors.trust.qr_code.step1.title"
        },
        {
          description: "wallet_connectors.trust.qr_code.step2.description",
          step: "create",
          title: "wallet_connectors.trust.qr_code.step2.title"
        },
        {
          description: "wallet_connectors.trust.qr_code.step3.description",
          step: "scan",
          title: "wallet_connectors.trust.qr_code.step3.title"
        }
      ]
    }
  }), {
    id: "trust",
    name: "Trust Wallet",
    rdns: "com.trustwallet.app",
    iconUrl: async () => (await import("./trustWallet-42DZQQWY-AI73E_6k.mjs")).default,
    // Note that we never resolve `installed` to `false` because the
    // Trust Wallet provider falls back to other connection methods if
    // the injected connector isn't available
    installed: n || void 0,
    iconAccent: "#3375BB",
    iconBackground: "#fff",
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp",
      ios: "https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409",
      mobile: "https://trustwallet.com/download",
      qrCode: "https://trustwallet.com/download",
      chrome: "https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph",
      browserExtension: "https://trustwallet.com/browser-extension"
    },
    mobile: s,
    qrCode: a,
    extension: {
      instructions: {
        learnMoreUrl: "https://trustwallet.com/browser-extension",
        steps: [
          {
            description: "wallet_connectors.trust.extension.step1.description",
            step: "install",
            title: "wallet_connectors.trust.extension.step1.title"
          },
          {
            description: "wallet_connectors.trust.extension.step2.description",
            step: "create",
            title: "wallet_connectors.trust.extension.step2.title"
          },
          {
            description: "wallet_connectors.trust.extension.step3.description",
            step: "refresh",
            title: "wallet_connectors.trust.extension.step3.title"
          }
        ]
      }
    },
    createConnector: r ? uo({
      projectId: e,
      walletConnectParameters: t
    }) : ui() ? Vr({ flag: "isTrust" }) : Vr({ flag: "isTrustWallet" })
  };
}, su = ({
  projectId: e,
  walletConnectParameters: t
}) => ({
  id: "uniswap",
  name: "Uniswap Wallet",
  iconUrl: async () => (await import("./uniswapWallet-VSBIGDAA-CNIlagTq.mjs")).default,
  iconBackground: "#FFD8EA",
  downloadUrls: {
    ios: "https://apps.apple.com/app/apple-store/id6443944476",
    mobile: "https://wallet.uniswap.org/",
    qrCode: "https://wallet.uniswap.org/"
  },
  mobile: {
    getUri: (n) => `uniswap://wc?uri=${encodeURIComponent(n)}`
  },
  qrCode: {
    getUri: (n) => n,
    instructions: {
      learnMoreUrl: "https://wallet.uniswap.org/",
      steps: [
        {
          description: "wallet_connectors.uniswap.qr_code.step1.description",
          step: "install",
          title: "wallet_connectors.uniswap.qr_code.step1.title"
        },
        {
          description: "wallet_connectors.uniswap.qr_code.step2.description",
          step: "create",
          title: "wallet_connectors.uniswap.qr_code.step2.title"
        },
        {
          description: "wallet_connectors.uniswap.qr_code.step3.description",
          step: "scan",
          title: "wallet_connectors.uniswap.qr_code.step3.title"
        }
      ]
    }
  },
  createConnector: uo({
    projectId: e,
    walletConnectParameters: t
  })
}), As = ({ appName: e, appIcon: t }) => {
  const n = (o) => o, r = js();
  return {
    id: "coinbase",
    name: "Coinbase Wallet",
    shortName: "Coinbase",
    rdns: "com.coinbase.wallet",
    iconUrl: async () => (await import("./coinbaseWallet-OKXU3TRC-5iCQMeiP.mjs")).default,
    iconAccent: "#2c5ff6",
    iconBackground: "#2c5ff6",
    // If the coinbase wallet browser extension is not installed, a popup will appear
    // prompting the user to connect or create a wallet via passkey. This means if you either have
    // or don't have the coinbase wallet browser extension installed it'll do some action anyways
    installed: !0,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=org.toshi",
      ios: "https://apps.apple.com/us/app/coinbase-wallet-store-crypto/id1278383455",
      mobile: "https://coinbase.com/wallet/downloads",
      qrCode: "https://coinbase-wallet.onelink.me/q5Sx/fdb9b250",
      chrome: "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
      browserExtension: "https://coinbase.com/wallet"
    },
    ...r ? {} : {
      qrCode: {
        getUri: n,
        instructions: {
          learnMoreUrl: "https://coinbase.com/wallet/articles/getting-started-mobile",
          steps: [
            {
              description: "wallet_connectors.coinbase.qr_code.step1.description",
              step: "install",
              title: "wallet_connectors.coinbase.qr_code.step1.title"
            },
            {
              description: "wallet_connectors.coinbase.qr_code.step2.description",
              step: "create",
              title: "wallet_connectors.coinbase.qr_code.step2.title"
            },
            {
              description: "wallet_connectors.coinbase.qr_code.step3.description",
              step: "scan",
              title: "wallet_connectors.coinbase.qr_code.step3.title"
            }
          ]
        }
      },
      extension: {
        instructions: {
          learnMoreUrl: "https://coinbase.com/wallet/articles/getting-started-extension",
          steps: [
            {
              description: "wallet_connectors.coinbase.extension.step1.description",
              step: "install",
              title: "wallet_connectors.coinbase.extension.step1.title"
            },
            {
              description: "wallet_connectors.coinbase.extension.step2.description",
              step: "create",
              title: "wallet_connectors.coinbase.extension.step2.title"
            },
            {
              description: "wallet_connectors.coinbase.extension.step3.description",
              step: "refresh",
              title: "wallet_connectors.coinbase.extension.step3.title"
            }
          ]
        }
      }
    },
    createConnector: (o) => {
      const { ...i } = As, s = ar({
        appName: e,
        appLogoUrl: t,
        ...i
      });
      return Xr((a) => ({
        ...s(a),
        ...o
      }));
    }
  };
}, au = ({
  projectId: e,
  walletConnectParameters: t
}) => {
  const n = Hr({
    flag: "isBinance"
  }), r = !n;
  return {
    id: "binance",
    name: "Binance Wallet",
    rdns: "com.binance.wallet",
    iconUrl: async () => (await import("./binanceWallet-RCEFB436-3ybVlXes.mjs")).default,
    iconBackground: "#000000",
    installed: r ? void 0 : n,
    downloadUrls: {
      android: "https://play.google.com/store/apps/details?id=com.binance.dev",
      ios: "https://apps.apple.com/us/app/id1436799971",
      mobile: "https://www.binance.com/en/download",
      qrCode: "https://www.binance.com/en/web3wallet"
    },
    mobile: r ? {
      getUri: (o) => Es() ? o : `bnc://app.binance.com/cedefi/wc?uri=${encodeURIComponent(
        o
      )}`
    } : void 0,
    qrCode: r ? {
      getUri: (o) => o,
      instructions: {
        learnMoreUrl: "https://www.binance.com/en/web3wallet",
        steps: [
          {
            description: "wallet_connectors.binance.qr_code.step1.description",
            step: "install",
            title: "wallet_connectors.binance.qr_code.step1.title"
          },
          {
            description: "wallet_connectors.binance.qr_code.step2.description",
            step: "create",
            title: "wallet_connectors.binance.qr_code.step2.title"
          },
          {
            description: "wallet_connectors.binance.qr_code.step3.description",
            step: "scan",
            title: "wallet_connectors.binance.qr_code.step3.title"
          }
        ]
      }
    } : void 0,
    createConnector: r ? uo({
      projectId: e,
      walletConnectParameters: t
    }) : Vr({
      flag: "isBinance"
    })
  };
};
const cu = {
  gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
  l1Block: { address: "0x4200000000000000000000000000000000000015" },
  l2CrossDomainMessenger: {
    address: "0x4200000000000000000000000000000000000007"
  },
  l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
  l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
  l2ToL1MessagePasser: {
    address: "0x4200000000000000000000000000000000000016"
  }
}, lu = {
  block: /* @__PURE__ */ pl({
    format(e) {
      var n;
      return {
        transactions: (n = e.transactions) == null ? void 0 : n.map((r) => {
          if (typeof r == "string")
            return r;
          const o = oo(r);
          return o.typeHex === "0x7e" && (o.isSystemTx = r.isSystemTx, o.mint = r.mint ? zt(r.mint) : void 0, o.sourceHash = r.sourceHash, o.type = "deposit"), o;
        }),
        stateRoot: e.stateRoot
      };
    }
  }),
  transaction: /* @__PURE__ */ dl({
    format(e) {
      const t = {};
      return e.type === "0x7e" && (t.isSystemTx = e.isSystemTx, t.mint = e.mint ? zt(e.mint) : void 0, t.sourceHash = e.sourceHash, t.type = "deposit"), t;
    }
  }),
  transactionReceipt: /* @__PURE__ */ Rl({
    format(e) {
      return {
        l1GasPrice: e.l1GasPrice ? zt(e.l1GasPrice) : null,
        l1GasUsed: e.l1GasUsed ? zt(e.l1GasUsed) : null,
        l1Fee: e.l1Fee ? zt(e.l1Fee) : null,
        l1FeeScalar: e.l1FeeScalar ? Number(e.l1FeeScalar) : null
      };
    }
  })
};
function uu(e, t) {
  return hu(e) ? fu(e) : zl(e, t);
}
const du = {
  transaction: uu
};
function fu(e) {
  pu(e);
  const { sourceHash: t, data: n, from: r, gas: o, isSystemTx: i, mint: s, to: a, value: l } = e, c = [
    t,
    r,
    a ?? "0x",
    s ? gn(s) : "0x",
    l ? gn(l) : "0x",
    o ? gn(o) : "0x",
    i ? "0x1" : "0x",
    n ?? "0x"
  ];
  return kn([
    "0x7e",
    At(c)
  ]);
}
function hu(e) {
  return e.type === "deposit" || typeof e.sourceHash < "u";
}
function pu(e) {
  const { from: t, to: n } = e;
  if (t && !jt(t))
    throw new Et({ address: t });
  if (n && !jt(n))
    throw new Et({ address: n });
}
const di = {
  blockTime: 2e3,
  contracts: cu,
  formatters: lu,
  serializers: du
}, un = 1, gu = /* @__PURE__ */ so({
  ...di,
  id: 8453,
  name: "Base",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://mainnet.base.org"]
    }
  },
  blockExplorers: {
    default: {
      name: "Basescan",
      url: "https://basescan.org",
      apiUrl: "https://api.basescan.org/api"
    }
  },
  contracts: {
    ...di.contracts,
    disputeGameFactory: {
      [un]: {
        address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e"
      }
    },
    l2OutputOracle: {
      [un]: {
        address: "0x56315b90c40730925ec5485cf004d835058518A0"
      }
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 5022
    },
    portal: {
      [un]: {
        address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
        blockCreated: 17482143
      }
    },
    l1StandardBridge: {
      [un]: {
        address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
        blockCreated: 17482143
      }
    }
  },
  sourceId: un
}), mu = /* @__PURE__ */ so({
  id: 56,
  name: "BNB Smart Chain",
  nativeCurrency: {
    decimals: 18,
    name: "BNB",
    symbol: "BNB"
  },
  rpcUrls: {
    default: { http: ["https://56.rpc.thirdweb.com"] }
  },
  blockExplorers: {
    default: {
      name: "BscScan",
      url: "https://bscscan.com",
      apiUrl: "https://api.bscscan.com/api"
    }
  },
  contracts: {
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 15921452
    }
  }
}), yu = /* @__PURE__ */ so({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://eth.merkle.io"]
    }
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    ensUniversalResolver: {
      address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
      blockCreated: 19258213
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14353601
    }
  }
}), bu = "pr0d", wu = "8ce47691a97bb4e85997c6bbbff1e6a7", fi = [yu, gu, mu], Ms = ic(
  [
    {
      groupName: "Popular",
      wallets: [
        au,
        iu,
        su,
        As
      ]
    }
  ],
  {
    appName: bu,
    projectId: wu
  }
);
console.log(Ms);
const xu = Ya({
  connectors: Ms,
  chains: fi,
  transports: fi.reduce((e, t) => (e[t.id] = Qa(), e), {}),
  multiInjectedProviderDiscovery: !0
}), hi = (e) => e, vu = () => {
  let e = hi;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = hi;
    }
  };
}, Cu = vu();
function bt(e, ...t) {
  const n = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((r) => n.searchParams.append("args[]", r)), `Minified MUI error #${e}; visit ${n} for the full message.`;
}
function Mt(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : bt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
var Bn = { exports: {} }, Dn = { exports: {} }, se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pi;
function Su() {
  if (pi) return se;
  pi = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, x = e ? Symbol.for("react.memo") : 60115, C = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, I = e ? Symbol.for("react.fundamental") : 60117, j = e ? Symbol.for("react.responder") : 60118, B = e ? Symbol.for("react.scope") : 60119;
  function T(k) {
    if (typeof k == "object" && k !== null) {
      var _ = k.$$typeof;
      switch (_) {
        case t:
          switch (k = k.type, k) {
            case l:
            case c:
            case r:
            case i:
            case o:
            case g:
              return k;
            default:
              switch (k = k && k.$$typeof, k) {
                case a:
                case p:
                case C:
                case x:
                case s:
                  return k;
                default:
                  return _;
              }
          }
        case n:
          return _;
      }
    }
  }
  function M(k) {
    return T(k) === c;
  }
  return se.AsyncMode = l, se.ConcurrentMode = c, se.ContextConsumer = a, se.ContextProvider = s, se.Element = t, se.ForwardRef = p, se.Fragment = r, se.Lazy = C, se.Memo = x, se.Portal = n, se.Profiler = i, se.StrictMode = o, se.Suspense = g, se.isAsyncMode = function(k) {
    return M(k) || T(k) === l;
  }, se.isConcurrentMode = M, se.isContextConsumer = function(k) {
    return T(k) === a;
  }, se.isContextProvider = function(k) {
    return T(k) === s;
  }, se.isElement = function(k) {
    return typeof k == "object" && k !== null && k.$$typeof === t;
  }, se.isForwardRef = function(k) {
    return T(k) === p;
  }, se.isFragment = function(k) {
    return T(k) === r;
  }, se.isLazy = function(k) {
    return T(k) === C;
  }, se.isMemo = function(k) {
    return T(k) === x;
  }, se.isPortal = function(k) {
    return T(k) === n;
  }, se.isProfiler = function(k) {
    return T(k) === i;
  }, se.isStrictMode = function(k) {
    return T(k) === o;
  }, se.isSuspense = function(k) {
    return T(k) === g;
  }, se.isValidElementType = function(k) {
    return typeof k == "string" || typeof k == "function" || k === r || k === c || k === i || k === o || k === g || k === m || typeof k == "object" && k !== null && (k.$$typeof === C || k.$$typeof === x || k.$$typeof === s || k.$$typeof === a || k.$$typeof === p || k.$$typeof === I || k.$$typeof === j || k.$$typeof === B || k.$$typeof === f);
  }, se.typeOf = T, se;
}
var ae = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gi;
function ku() {
  return gi || (gi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, m = e ? Symbol.for("react.suspense_list") : 60120, x = e ? Symbol.for("react.memo") : 60115, C = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, I = e ? Symbol.for("react.fundamental") : 60117, j = e ? Symbol.for("react.responder") : 60118, B = e ? Symbol.for("react.scope") : 60119;
    function T(N) {
      return typeof N == "string" || typeof N == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      N === r || N === c || N === i || N === o || N === g || N === m || typeof N == "object" && N !== null && (N.$$typeof === C || N.$$typeof === x || N.$$typeof === s || N.$$typeof === a || N.$$typeof === p || N.$$typeof === I || N.$$typeof === j || N.$$typeof === B || N.$$typeof === f);
    }
    function M(N) {
      if (typeof N == "object" && N !== null) {
        var Re = N.$$typeof;
        switch (Re) {
          case t:
            var Ue = N.type;
            switch (Ue) {
              case l:
              case c:
              case r:
              case i:
              case o:
              case g:
                return Ue;
              default:
                var Zt = Ue && Ue.$$typeof;
                switch (Zt) {
                  case a:
                  case p:
                  case C:
                  case x:
                  case s:
                    return Zt;
                  default:
                    return Re;
                }
            }
          case n:
            return Re;
        }
      }
    }
    var k = l, _ = c, D = a, J = s, X = t, h = p, $ = r, H = C, R = x, u = n, ve = i, de = o, pe = g, Ce = !1;
    function it(N) {
      return Ce || (Ce = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), w(N) || M(N) === l;
    }
    function w(N) {
      return M(N) === c;
    }
    function P(N) {
      return M(N) === a;
    }
    function L(N) {
      return M(N) === s;
    }
    function F(N) {
      return typeof N == "object" && N !== null && N.$$typeof === t;
    }
    function z(N) {
      return M(N) === p;
    }
    function q(N) {
      return M(N) === r;
    }
    function W(N) {
      return M(N) === C;
    }
    function Y(N) {
      return M(N) === x;
    }
    function U(N) {
      return M(N) === n;
    }
    function G(N) {
      return M(N) === i;
    }
    function V(N) {
      return M(N) === o;
    }
    function ce(N) {
      return M(N) === g;
    }
    ae.AsyncMode = k, ae.ConcurrentMode = _, ae.ContextConsumer = D, ae.ContextProvider = J, ae.Element = X, ae.ForwardRef = h, ae.Fragment = $, ae.Lazy = H, ae.Memo = R, ae.Portal = u, ae.Profiler = ve, ae.StrictMode = de, ae.Suspense = pe, ae.isAsyncMode = it, ae.isConcurrentMode = w, ae.isContextConsumer = P, ae.isContextProvider = L, ae.isElement = F, ae.isForwardRef = z, ae.isFragment = q, ae.isLazy = W, ae.isMemo = Y, ae.isPortal = U, ae.isProfiler = G, ae.isStrictMode = V, ae.isSuspense = ce, ae.isValidElementType = T, ae.typeOf = M;
  }()), ae;
}
var mi;
function Ps() {
  return mi || (mi = 1, process.env.NODE_ENV === "production" ? Dn.exports = Su() : Dn.exports = ku()), Dn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Or, yi;
function Iu() {
  if (yi) return Or;
  yi = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var s = {}, a = 0; a < 10; a++)
        s["_" + String.fromCharCode(a)] = a;
      var l = Object.getOwnPropertyNames(s).map(function(p) {
        return s[p];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var c = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(p) {
        c[p] = p;
      }), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Or = o() ? Object.assign : function(i, s) {
    for (var a, l = r(i), c, p = 1; p < arguments.length; p++) {
      a = Object(arguments[p]);
      for (var g in a)
        t.call(a, g) && (l[g] = a[g]);
      if (e) {
        c = e(a);
        for (var m = 0; m < c.length; m++)
          n.call(a, c[m]) && (l[c[m]] = a[c[m]]);
      }
    }
    return l;
  }, Or;
}
var $r, bi;
function fo() {
  if (bi) return $r;
  bi = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return $r = e, $r;
}
var _r, wi;
function Os() {
  return wi || (wi = 1, _r = Function.call.bind(Object.prototype.hasOwnProperty)), _r;
}
var Rr, xi;
function Tu() {
  if (xi) return Rr;
  xi = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = /* @__PURE__ */ fo(), n = {}, r = /* @__PURE__ */ Os();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, a, l, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var p in i)
        if (r(i, p)) {
          var g;
          try {
            if (typeof i[p] != "function") {
              var m = Error(
                (l || "React class") + ": " + a + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw m.name = "Invariant Violation", m;
            }
            g = i[p](s, p, l, a, null, t);
          } catch (C) {
            g = C;
          }
          if (g && !(g instanceof Error) && e(
            (l || "React class") + ": type specification of " + a + " `" + p + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof g + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), g instanceof Error && !(g.message in n)) {
            n[g.message] = !0;
            var x = c ? c() : "";
            e(
              "Failed " + a + " type: " + g.message + (x ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Rr = o, Rr;
}
var Nr, vi;
function Eu() {
  if (vi) return Nr;
  vi = 1;
  var e = Ps(), t = Iu(), n = /* @__PURE__ */ fo(), r = /* @__PURE__ */ Os(), o = /* @__PURE__ */ Tu(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(a) {
    var l = "Warning: " + a;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return Nr = function(a, l) {
    var c = typeof Symbol == "function" && Symbol.iterator, p = "@@iterator";
    function g(w) {
      var P = w && (c && w[c] || w[p]);
      if (typeof P == "function")
        return P;
    }
    var m = "<<anonymous>>", x = {
      array: j("array"),
      bigint: j("bigint"),
      bool: j("boolean"),
      func: j("function"),
      number: j("number"),
      object: j("object"),
      string: j("string"),
      symbol: j("symbol"),
      any: B(),
      arrayOf: T,
      element: M(),
      elementType: k(),
      instanceOf: _,
      node: h(),
      objectOf: J,
      oneOf: D,
      oneOfType: X,
      shape: H,
      exact: R
    };
    function C(w, P) {
      return w === P ? w !== 0 || 1 / w === 1 / P : w !== w && P !== P;
    }
    function f(w, P) {
      this.message = w, this.data = P && typeof P == "object" ? P : {}, this.stack = "";
    }
    f.prototype = Error.prototype;
    function I(w) {
      if (process.env.NODE_ENV !== "production")
        var P = {}, L = 0;
      function F(q, W, Y, U, G, V, ce) {
        if (U = U || m, V = V || Y, ce !== n) {
          if (l) {
            var N = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw N.name = "Invariant Violation", N;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Re = U + ":" + Y;
            !P[Re] && // Avoid spamming the console because they are often not actionable except for lib authors
            L < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + V + "` prop on `" + U + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), P[Re] = !0, L++);
          }
        }
        return W[Y] == null ? q ? W[Y] === null ? new f("The " + G + " `" + V + "` is marked as required " + ("in `" + U + "`, but its value is `null`.")) : new f("The " + G + " `" + V + "` is marked as required in " + ("`" + U + "`, but its value is `undefined`.")) : null : w(W, Y, U, G, V);
      }
      var z = F.bind(null, !1);
      return z.isRequired = F.bind(null, !0), z;
    }
    function j(w) {
      function P(L, F, z, q, W, Y) {
        var U = L[F], G = de(U);
        if (G !== w) {
          var V = pe(U);
          return new f(
            "Invalid " + q + " `" + W + "` of type " + ("`" + V + "` supplied to `" + z + "`, expected ") + ("`" + w + "`."),
            { expectedType: w }
          );
        }
        return null;
      }
      return I(P);
    }
    function B() {
      return I(s);
    }
    function T(w) {
      function P(L, F, z, q, W) {
        if (typeof w != "function")
          return new f("Property `" + W + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var Y = L[F];
        if (!Array.isArray(Y)) {
          var U = de(Y);
          return new f("Invalid " + q + " `" + W + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an array."));
        }
        for (var G = 0; G < Y.length; G++) {
          var V = w(Y, G, z, q, W + "[" + G + "]", n);
          if (V instanceof Error)
            return V;
        }
        return null;
      }
      return I(P);
    }
    function M() {
      function w(P, L, F, z, q) {
        var W = P[L];
        if (!a(W)) {
          var Y = de(W);
          return new f("Invalid " + z + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected a single ReactElement."));
        }
        return null;
      }
      return I(w);
    }
    function k() {
      function w(P, L, F, z, q) {
        var W = P[L];
        if (!e.isValidElementType(W)) {
          var Y = de(W);
          return new f("Invalid " + z + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return I(w);
    }
    function _(w) {
      function P(L, F, z, q, W) {
        if (!(L[F] instanceof w)) {
          var Y = w.name || m, U = it(L[F]);
          return new f("Invalid " + q + " `" + W + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected ") + ("instance of `" + Y + "`."));
        }
        return null;
      }
      return I(P);
    }
    function D(w) {
      if (!Array.isArray(w))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function P(L, F, z, q, W) {
        for (var Y = L[F], U = 0; U < w.length; U++)
          if (C(Y, w[U]))
            return null;
        var G = JSON.stringify(w, function(ce, N) {
          var Re = pe(N);
          return Re === "symbol" ? String(N) : N;
        });
        return new f("Invalid " + q + " `" + W + "` of value `" + String(Y) + "` " + ("supplied to `" + z + "`, expected one of " + G + "."));
      }
      return I(P);
    }
    function J(w) {
      function P(L, F, z, q, W) {
        if (typeof w != "function")
          return new f("Property `" + W + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var Y = L[F], U = de(Y);
        if (U !== "object")
          return new f("Invalid " + q + " `" + W + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an object."));
        for (var G in Y)
          if (r(Y, G)) {
            var V = w(Y, G, z, q, W + "." + G, n);
            if (V instanceof Error)
              return V;
          }
        return null;
      }
      return I(P);
    }
    function X(w) {
      if (!Array.isArray(w))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var P = 0; P < w.length; P++) {
        var L = w[P];
        if (typeof L != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Ce(L) + " at index " + P + "."
          ), s;
      }
      function F(z, q, W, Y, U) {
        for (var G = [], V = 0; V < w.length; V++) {
          var ce = w[V], N = ce(z, q, W, Y, U, n);
          if (N == null)
            return null;
          N.data && r(N.data, "expectedType") && G.push(N.data.expectedType);
        }
        var Re = G.length > 0 ? ", expected one of type [" + G.join(", ") + "]" : "";
        return new f("Invalid " + Y + " `" + U + "` supplied to " + ("`" + W + "`" + Re + "."));
      }
      return I(F);
    }
    function h() {
      function w(P, L, F, z, q) {
        return u(P[L]) ? null : new f("Invalid " + z + " `" + q + "` supplied to " + ("`" + F + "`, expected a ReactNode."));
      }
      return I(w);
    }
    function $(w, P, L, F, z) {
      return new f(
        (w || "React class") + ": " + P + " type `" + L + "." + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function H(w) {
      function P(L, F, z, q, W) {
        var Y = L[F], U = de(Y);
        if (U !== "object")
          return new f("Invalid " + q + " `" + W + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var G in w) {
          var V = w[G];
          if (typeof V != "function")
            return $(z, q, W, G, pe(V));
          var ce = V(Y, G, z, q, W + "." + G, n);
          if (ce)
            return ce;
        }
        return null;
      }
      return I(P);
    }
    function R(w) {
      function P(L, F, z, q, W) {
        var Y = L[F], U = de(Y);
        if (U !== "object")
          return new f("Invalid " + q + " `" + W + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        var G = t({}, L[F], w);
        for (var V in G) {
          var ce = w[V];
          if (r(w, V) && typeof ce != "function")
            return $(z, q, W, V, pe(ce));
          if (!ce)
            return new f(
              "Invalid " + q + " `" + W + "` key `" + V + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(L[F], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(w), null, "  ")
            );
          var N = ce(Y, V, z, q, W + "." + V, n);
          if (N)
            return N;
        }
        return null;
      }
      return I(P);
    }
    function u(w) {
      switch (typeof w) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !w;
        case "object":
          if (Array.isArray(w))
            return w.every(u);
          if (w === null || a(w))
            return !0;
          var P = g(w);
          if (P) {
            var L = P.call(w), F;
            if (P !== w.entries) {
              for (; !(F = L.next()).done; )
                if (!u(F.value))
                  return !1;
            } else
              for (; !(F = L.next()).done; ) {
                var z = F.value;
                if (z && !u(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function ve(w, P) {
      return w === "symbol" ? !0 : P ? P["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && P instanceof Symbol : !1;
    }
    function de(w) {
      var P = typeof w;
      return Array.isArray(w) ? "array" : w instanceof RegExp ? "object" : ve(P, w) ? "symbol" : P;
    }
    function pe(w) {
      if (typeof w > "u" || w === null)
        return "" + w;
      var P = de(w);
      if (P === "object") {
        if (w instanceof Date)
          return "date";
        if (w instanceof RegExp)
          return "regexp";
      }
      return P;
    }
    function Ce(w) {
      var P = pe(w);
      switch (P) {
        case "array":
        case "object":
          return "an " + P;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + P;
        default:
          return P;
      }
    }
    function it(w) {
      return !w.constructor || !w.constructor.name ? m : w.constructor.name;
    }
    return x.checkPropTypes = o, x.resetWarningCache = o.resetWarningCache, x.PropTypes = x, x;
  }, Nr;
}
var Br, Ci;
function ju() {
  if (Ci) return Br;
  Ci = 1;
  var e = /* @__PURE__ */ fo();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Br = function() {
    function r(s, a, l, c, p, g) {
      if (g !== e) {
        var m = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw m.name = "Invariant Violation", m;
      }
    }
    r.isRequired = r;
    function o() {
      return r;
    }
    var i = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: o,
      element: r,
      elementType: r,
      instanceOf: o,
      node: r,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, Br;
}
var Si;
function Au() {
  if (Si) return Bn.exports;
  if (Si = 1, process.env.NODE_ENV !== "production") {
    var e = Ps(), t = !0;
    Bn.exports = /* @__PURE__ */ Eu()(e.isElement, t);
  } else
    Bn.exports = /* @__PURE__ */ ju()();
  return Bn.exports;
}
var Mu = /* @__PURE__ */ Au();
const ne = /* @__PURE__ */ cc(Mu);
function $s(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = $s(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function Pu() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = $s(e)) && (r && (r += " "), r += t);
  return r;
}
function Ou(e, t, n = void 0) {
  const r = {};
  for (const o in e) {
    const i = e[o];
    let s = "", a = !0;
    for (let l = 0; l < i.length; l += 1) {
      const c = i[l];
      c && (s += (a === !0 ? "" : " ") + t(c), a = !1, n && n[c] && (s += " " + n[c]));
    }
    r[o] = s;
  }
  return r;
}
var Ln = { exports: {} }, le = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ki;
function $u() {
  if (ki) return le;
  ki = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.consumer"), s = Symbol.for("react.context"), a = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), m = Symbol.for("react.view_transition"), x = Symbol.for("react.client.reference");
  function C(f) {
    if (typeof f == "object" && f !== null) {
      var I = f.$$typeof;
      switch (I) {
        case e:
          switch (f = f.type, f) {
            case n:
            case o:
            case r:
            case l:
            case c:
            case m:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case s:
                case a:
                case g:
                case p:
                  return f;
                case i:
                  return f;
                default:
                  return I;
              }
          }
        case t:
          return I;
      }
    }
  }
  return le.ContextConsumer = i, le.ContextProvider = s, le.Element = e, le.ForwardRef = a, le.Fragment = n, le.Lazy = g, le.Memo = p, le.Portal = t, le.Profiler = o, le.StrictMode = r, le.Suspense = l, le.SuspenseList = c, le.isContextConsumer = function(f) {
    return C(f) === i;
  }, le.isContextProvider = function(f) {
    return C(f) === s;
  }, le.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, le.isForwardRef = function(f) {
    return C(f) === a;
  }, le.isFragment = function(f) {
    return C(f) === n;
  }, le.isLazy = function(f) {
    return C(f) === g;
  }, le.isMemo = function(f) {
    return C(f) === p;
  }, le.isPortal = function(f) {
    return C(f) === t;
  }, le.isProfiler = function(f) {
    return C(f) === o;
  }, le.isStrictMode = function(f) {
    return C(f) === r;
  }, le.isSuspense = function(f) {
    return C(f) === l;
  }, le.isSuspenseList = function(f) {
    return C(f) === c;
  }, le.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === n || f === o || f === r || f === l || f === c || typeof f == "object" && f !== null && (f.$$typeof === g || f.$$typeof === p || f.$$typeof === s || f.$$typeof === i || f.$$typeof === a || f.$$typeof === x || f.getModuleId !== void 0);
  }, le.typeOf = C, le;
}
var ue = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ii;
function _u() {
  return Ii || (Ii = 1, process.env.NODE_ENV !== "production" && function() {
    function e(f) {
      if (typeof f == "object" && f !== null) {
        var I = f.$$typeof;
        switch (I) {
          case t:
            switch (f = f.type, f) {
              case r:
              case i:
              case o:
              case c:
              case p:
              case x:
                return f;
              default:
                switch (f = f && f.$$typeof, f) {
                  case a:
                  case l:
                  case m:
                  case g:
                    return f;
                  case s:
                    return f;
                  default:
                    return I;
                }
            }
          case n:
            return I;
        }
      }
    }
    var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), s = Symbol.for("react.consumer"), a = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), m = Symbol.for("react.lazy"), x = Symbol.for("react.view_transition"), C = Symbol.for("react.client.reference");
    ue.ContextConsumer = s, ue.ContextProvider = a, ue.Element = t, ue.ForwardRef = l, ue.Fragment = r, ue.Lazy = m, ue.Memo = g, ue.Portal = n, ue.Profiler = i, ue.StrictMode = o, ue.Suspense = c, ue.SuspenseList = p, ue.isContextConsumer = function(f) {
      return e(f) === s;
    }, ue.isContextProvider = function(f) {
      return e(f) === a;
    }, ue.isElement = function(f) {
      return typeof f == "object" && f !== null && f.$$typeof === t;
    }, ue.isForwardRef = function(f) {
      return e(f) === l;
    }, ue.isFragment = function(f) {
      return e(f) === r;
    }, ue.isLazy = function(f) {
      return e(f) === m;
    }, ue.isMemo = function(f) {
      return e(f) === g;
    }, ue.isPortal = function(f) {
      return e(f) === n;
    }, ue.isProfiler = function(f) {
      return e(f) === i;
    }, ue.isStrictMode = function(f) {
      return e(f) === o;
    }, ue.isSuspense = function(f) {
      return e(f) === c;
    }, ue.isSuspenseList = function(f) {
      return e(f) === p;
    }, ue.isValidElementType = function(f) {
      return typeof f == "string" || typeof f == "function" || f === r || f === i || f === o || f === c || f === p || typeof f == "object" && f !== null && (f.$$typeof === m || f.$$typeof === g || f.$$typeof === a || f.$$typeof === s || f.$$typeof === l || f.$$typeof === C || f.getModuleId !== void 0);
    }, ue.typeOf = e;
  }()), ue;
}
var Ti;
function Ru() {
  return Ti || (Ti = 1, process.env.NODE_ENV === "production" ? Ln.exports = /* @__PURE__ */ $u() : Ln.exports = /* @__PURE__ */ _u()), Ln.exports;
}
var Xn = /* @__PURE__ */ Ru();
function ut(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function _s(e) {
  if (/* @__PURE__ */ Te.isValidElement(e) || Xn.isValidElementType(e) || !ut(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = _s(e[n]);
  }), t;
}
function Le(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? {
    ...e
  } : e;
  return ut(e) && ut(t) && Object.keys(t).forEach((o) => {
    /* @__PURE__ */ Te.isValidElement(t[o]) || Xn.isValidElementType(t[o]) ? r[o] = t[o] : ut(t[o]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, o) && ut(e[o]) ? r[o] = Le(e[o], t[o], n) : n.clone ? r[o] = ut(t[o]) ? _s(t[o]) : t[o] : r[o] = t[o];
  }), r;
}
function mn(e, t) {
  return t ? Le(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const vt = process.env.NODE_ENV !== "production" ? ne.oneOfType([ne.number, ne.string, ne.object, ne.array]) : {};
function Nu(e, t) {
  if (!e.containerQueries)
    return t;
  const n = Object.keys(t).filter((r) => r.startsWith("@container")).sort((r, o) => {
    var s, a;
    const i = /min-width:\s*([0-9.]+)/;
    return +(((s = r.match(i)) == null ? void 0 : s[1]) || 0) - +(((a = o.match(i)) == null ? void 0 : a[1]) || 0);
  });
  return n.length ? n.reduce((r, o) => {
    const i = t[o];
    return delete r[o], r[o] = i, r;
  }, {
    ...t
  }) : t;
}
function Bu(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((n) => t.startsWith(`@${n}`)) || !!t.match(/^@\d/));
}
function Du(e, t) {
  const n = t.match(/^@([^/]+)?\/?(.+)?$/);
  if (!n) {
    if (process.env.NODE_ENV !== "production")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The provided shorthand ${`(${t})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : bt(18, `(${t})`));
    return null;
  }
  const [, r, o] = n, i = Number.isNaN(+r) ? r || 0 : +r;
  return e.containerQueries(o).up(i);
}
function Lu(e) {
  const t = (i, s) => i.replace("@media", s ? `@container ${s}` : "@container");
  function n(i, s) {
    i.up = (...a) => t(e.breakpoints.up(...a), s), i.down = (...a) => t(e.breakpoints.down(...a), s), i.between = (...a) => t(e.breakpoints.between(...a), s), i.only = (...a) => t(e.breakpoints.only(...a), s), i.not = (...a) => {
      const l = t(e.breakpoints.not(...a), s);
      return l.includes("not all and") ? l.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : l;
    };
  }
  const r = {}, o = (i) => (n(r, i), r);
  return n(o), {
    ...e,
    containerQueries: o
  };
}
const cr = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, Ei = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${cr[e]}px)`
}, zu = {
  containerQueries: (e) => ({
    up: (t) => {
      let n = typeof t == "number" ? t : cr[t] || t;
      return typeof n == "number" && (n = `${n}px`), e ? `@container ${e} (min-width:${n})` : `@container (min-width:${n})`;
    }
  })
};
function dt(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Ei;
    return t.reduce((s, a, l) => (s[i.up(i.keys[l])] = n(t[l]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Ei;
    return Object.keys(t).reduce((s, a) => {
      if (Bu(i.keys, a)) {
        const l = Du(r.containerQueries ? r : zu, a);
        l && (s[l] = n(t[a], a));
      } else if (Object.keys(i.values || cr).includes(a)) {
        const l = i.up(a);
        s[l] = n(t[a], a);
      } else {
        const l = a;
        s[l] = t[l];
      }
      return s;
    }, {});
  }
  return n(t);
}
function Uu(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function Fu(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function lr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function er(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = lr(e, n) || r, t && (o = t(o, r, e)), o;
}
function we(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const a = s[t], l = s.theme, c = lr(l, r) || {};
    return dt(s, a, (g) => {
      let m = er(c, o, g);
      return g === m && typeof g == "string" && (m = er(c, o, `${t}${g === "default" ? "" : Mt(g)}`, g)), n === !1 ? m : {
        [n]: m
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: vt
  } : {}, i.filterProps = [t], i;
}
function Wu(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Hu = {
  m: "margin",
  p: "padding"
}, Vu = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ji = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, qu = Wu((e) => {
  if (e.length > 2)
    if (ji[e])
      e = ji[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Hu[t], o = Vu[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), ur = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], dr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Gu = [...ur, ...dr];
function Tn(e, t, n, r) {
  const o = lr(e, t, !0) ?? n;
  return typeof o == "number" || typeof o == "string" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), typeof o == "string" ? o.startsWith("var(") && i === 0 ? 0 : o.startsWith("var(") && i === 1 ? o : `calc(${i} * ${o})` : o * i) : Array.isArray(o) ? (i) => {
    if (typeof i == "string")
      return i;
    const s = Math.abs(i);
    process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > o.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(o)}.`, `${s} > ${o.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`)));
    const a = o[s];
    return i >= 0 ? a : typeof a == "number" ? -a : typeof a == "string" && a.startsWith("var(") ? `calc(-1 * ${a})` : `-${a}`;
  } : typeof o == "function" ? o : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${o}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ho(e) {
  return Tn(e, "spacing", 8, "spacing");
}
function En(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
function Yu(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = En(t, n), r), {});
}
function Qu(e, t, n, r) {
  if (!t.includes(n))
    return null;
  const o = qu(n), i = Yu(o, r), s = e[n];
  return dt(e, s, i);
}
function Rs(e, t) {
  const n = ho(e.theme);
  return Object.keys(e).map((r) => Qu(e, t, r, n)).reduce(mn, {});
}
function me(e) {
  return Rs(e, ur);
}
me.propTypes = process.env.NODE_ENV !== "production" ? ur.reduce((e, t) => (e[t] = vt, e), {}) : {};
me.filterProps = ur;
function ye(e) {
  return Rs(e, dr);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? dr.reduce((e, t) => (e[t] = vt, e), {}) : {};
ye.filterProps = dr;
process.env.NODE_ENV !== "production" && Gu.reduce((e, t) => (e[t] = vt, e), {});
function fr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? mn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Ge(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ye(e, t) {
  return we({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Zu = Ye("border", Ge), Ku = Ye("borderTop", Ge), Ju = Ye("borderRight", Ge), Xu = Ye("borderBottom", Ge), ed = Ye("borderLeft", Ge), td = Ye("borderColor"), nd = Ye("borderTopColor"), rd = Ye("borderRightColor"), od = Ye("borderBottomColor"), id = Ye("borderLeftColor"), sd = Ye("outline", Ge), ad = Ye("outlineColor"), hr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Tn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: En(t, r)
    });
    return dt(e, e.borderRadius, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: vt
} : {};
hr.filterProps = ["borderRadius"];
fr(Zu, Ku, Ju, Xu, ed, td, nd, rd, od, id, hr, sd, ad);
const pr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Tn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: En(t, r)
    });
    return dt(e, e.gap, n);
  }
  return null;
};
pr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: vt
} : {};
pr.filterProps = ["gap"];
const gr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Tn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: En(t, r)
    });
    return dt(e, e.columnGap, n);
  }
  return null;
};
gr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: vt
} : {};
gr.filterProps = ["columnGap"];
const mr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Tn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: En(t, r)
    });
    return dt(e, e.rowGap, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: vt
} : {};
mr.filterProps = ["rowGap"];
const cd = we({
  prop: "gridColumn"
}), ld = we({
  prop: "gridRow"
}), ud = we({
  prop: "gridAutoFlow"
}), dd = we({
  prop: "gridAutoColumns"
}), fd = we({
  prop: "gridAutoRows"
}), hd = we({
  prop: "gridTemplateColumns"
}), pd = we({
  prop: "gridTemplateRows"
}), gd = we({
  prop: "gridTemplateAreas"
}), md = we({
  prop: "gridArea"
});
fr(pr, gr, mr, cd, ld, ud, dd, fd, hd, pd, gd, md);
function Ut(e, t) {
  return t === "grey" ? t : e;
}
const yd = we({
  prop: "color",
  themeKey: "palette",
  transform: Ut
}), bd = we({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ut
}), wd = we({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ut
});
fr(yd, bd, wd);
function Be(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const xd = we({
  prop: "width",
  transform: Be
}), po = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var o, i, s, a, l;
      const r = ((s = (i = (o = e.theme) == null ? void 0 : o.breakpoints) == null ? void 0 : i.values) == null ? void 0 : s[n]) || cr[n];
      return r ? ((l = (a = e.theme) == null ? void 0 : a.breakpoints) == null ? void 0 : l.unit) !== "px" ? {
        maxWidth: `${r}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: r
      } : {
        maxWidth: Be(n)
      };
    };
    return dt(e, e.maxWidth, t);
  }
  return null;
};
po.filterProps = ["maxWidth"];
const vd = we({
  prop: "minWidth",
  transform: Be
}), Cd = we({
  prop: "height",
  transform: Be
}), Sd = we({
  prop: "maxHeight",
  transform: Be
}), kd = we({
  prop: "minHeight",
  transform: Be
});
we({
  prop: "size",
  cssProperty: "width",
  transform: Be
});
we({
  prop: "size",
  cssProperty: "height",
  transform: Be
});
const Id = we({
  prop: "boxSizing"
});
fr(xd, po, vd, Cd, Sd, kd, Id);
const yr = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ge
  },
  borderTop: {
    themeKey: "borders",
    transform: Ge
  },
  borderRight: {
    themeKey: "borders",
    transform: Ge
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ge
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ge
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: Ge
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: hr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Ut
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Ut
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Ut
  },
  // spacing
  p: {
    style: ye
  },
  pt: {
    style: ye
  },
  pr: {
    style: ye
  },
  pb: {
    style: ye
  },
  pl: {
    style: ye
  },
  px: {
    style: ye
  },
  py: {
    style: ye
  },
  padding: {
    style: ye
  },
  paddingTop: {
    style: ye
  },
  paddingRight: {
    style: ye
  },
  paddingBottom: {
    style: ye
  },
  paddingLeft: {
    style: ye
  },
  paddingX: {
    style: ye
  },
  paddingY: {
    style: ye
  },
  paddingInline: {
    style: ye
  },
  paddingInlineStart: {
    style: ye
  },
  paddingInlineEnd: {
    style: ye
  },
  paddingBlock: {
    style: ye
  },
  paddingBlockStart: {
    style: ye
  },
  paddingBlockEnd: {
    style: ye
  },
  m: {
    style: me
  },
  mt: {
    style: me
  },
  mr: {
    style: me
  },
  mb: {
    style: me
  },
  ml: {
    style: me
  },
  mx: {
    style: me
  },
  my: {
    style: me
  },
  margin: {
    style: me
  },
  marginTop: {
    style: me
  },
  marginRight: {
    style: me
  },
  marginBottom: {
    style: me
  },
  marginLeft: {
    style: me
  },
  marginX: {
    style: me
  },
  marginY: {
    style: me
  },
  marginInline: {
    style: me
  },
  marginInlineStart: {
    style: me
  },
  marginInlineEnd: {
    style: me
  },
  marginBlock: {
    style: me
  },
  marginBlockStart: {
    style: me
  },
  marginBlockEnd: {
    style: me
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: pr
  },
  rowGap: {
    style: mr
  },
  columnGap: {
    style: gr
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: Be
  },
  maxWidth: {
    style: po
  },
  minWidth: {
    transform: Be
  },
  height: {
    transform: Be
  },
  maxHeight: {
    transform: Be
  },
  minHeight: {
    transform: Be
  },
  boxSizing: {},
  // typography
  font: {
    themeKey: "font"
  },
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
};
function Td(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Ed(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function jd() {
  function e(n, r, o, i) {
    const s = {
      [n]: r,
      theme: o
    }, a = i[n];
    if (!a)
      return {
        [n]: r
      };
    const {
      cssProperty: l = n,
      themeKey: c,
      transform: p,
      style: g
    } = a;
    if (r == null)
      return null;
    if (c === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const m = lr(o, c) || {};
    return g ? g(s) : dt(s, r, (C) => {
      let f = er(m, p, C);
      return C === f && typeof C == "string" && (f = er(m, p, `${n}${C === "default" ? "" : Mt(C)}`, C)), l === !1 ? f : {
        [l]: f
      };
    });
  }
  function t(n) {
    const {
      sx: r,
      theme: o = {}
    } = n || {};
    if (!r)
      return null;
    const i = o.unstable_sxConfig ?? yr;
    function s(a) {
      let l = a;
      if (typeof a == "function")
        l = a(o);
      else if (typeof a != "object")
        return a;
      if (!l)
        return null;
      const c = Uu(o.breakpoints), p = Object.keys(c);
      let g = c;
      return Object.keys(l).forEach((m) => {
        const x = Ed(l[m], o);
        if (x != null)
          if (typeof x == "object")
            if (i[m])
              g = mn(g, e(m, x, o, i));
            else {
              const C = dt({
                theme: o
              }, x, (f) => ({
                [m]: f
              }));
              Td(C, x) ? g[m] = t({
                sx: x,
                theme: o
              }) : g = mn(g, C);
            }
          else
            g = mn(g, e(m, x, o, i));
      }), Nu(o, Fu(p, g));
    }
    return Array.isArray(r) ? r.map(s) : s(r);
  }
  return t;
}
const Vt = jd();
Vt.filterProps = ["sx"];
function qr() {
  return qr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, qr.apply(null, arguments);
}
function Ad(e) {
  if (e.sheet)
    return e.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === e)
      return document.styleSheets[t];
}
function Md(e) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", e.key), e.nonce !== void 0 && t.setAttribute("nonce", e.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var Pd = /* @__PURE__ */ function() {
  function e(n) {
    var r = this;
    this._insertTag = function(o) {
      var i;
      r.tags.length === 0 ? r.insertionPoint ? i = r.insertionPoint.nextSibling : r.prepend ? i = r.container.firstChild : i = r.before : i = r.tags[r.tags.length - 1].nextSibling, r.container.insertBefore(o, i), r.tags.push(o);
    }, this.isSpeedy = n.speedy === void 0 ? !0 : n.speedy, this.tags = [], this.ctr = 0, this.nonce = n.nonce, this.key = n.key, this.container = n.container, this.prepend = n.prepend, this.insertionPoint = n.insertionPoint, this.before = null;
  }
  var t = e.prototype;
  return t.hydrate = function(r) {
    r.forEach(this._insertTag);
  }, t.insert = function(r) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Md(this));
    var o = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var i = Ad(o);
      try {
        i.insertRule(r, i.cssRules.length);
      } catch {
      }
    } else
      o.appendChild(document.createTextNode(r));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(r) {
      var o;
      return (o = r.parentNode) == null ? void 0 : o.removeChild(r);
    }), this.tags = [], this.ctr = 0;
  }, e;
}(), je = "-ms-", tr = "-moz-", oe = "-webkit-", Ns = "comm", go = "rule", mo = "decl", Od = "@import", Bs = "@keyframes", $d = "@layer", _d = Math.abs, br = String.fromCharCode, Rd = Object.assign;
function Nd(e, t) {
  return Ie(e, 0) ^ 45 ? (((t << 2 ^ Ie(e, 0)) << 2 ^ Ie(e, 1)) << 2 ^ Ie(e, 2)) << 2 ^ Ie(e, 3) : 0;
}
function Ds(e) {
  return e.trim();
}
function Bd(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function ie(e, t, n) {
  return e.replace(t, n);
}
function Gr(e, t) {
  return e.indexOf(t);
}
function Ie(e, t) {
  return e.charCodeAt(t) | 0;
}
function wn(e, t, n) {
  return e.slice(t, n);
}
function nt(e) {
  return e.length;
}
function yo(e) {
  return e.length;
}
function zn(e, t) {
  return t.push(e), e;
}
function Dd(e, t) {
  return e.map(t).join("");
}
var wr = 1, qt = 1, Ls = 0, _e = 0, xe = 0, Qt = "";
function xr(e, t, n, r, o, i, s) {
  return { value: e, root: t, parent: n, type: r, props: o, children: i, line: wr, column: qt, length: s, return: "" };
}
function dn(e, t) {
  return Rd(xr("", null, null, "", null, null, 0), e, { length: -e.length }, t);
}
function Ld() {
  return xe;
}
function zd() {
  return xe = _e > 0 ? Ie(Qt, --_e) : 0, qt--, xe === 10 && (qt = 1, wr--), xe;
}
function ze() {
  return xe = _e < Ls ? Ie(Qt, _e++) : 0, qt++, xe === 10 && (qt = 1, wr++), xe;
}
function ot() {
  return Ie(Qt, _e);
}
function Vn() {
  return _e;
}
function jn(e, t) {
  return wn(Qt, e, t);
}
function xn(e) {
  switch (e) {
    // \0 \t \n \r \s whitespace token
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    // ! + , / > @ ~ isolate token
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    // ; { } breakpoint token
    case 59:
    case 123:
    case 125:
      return 4;
    // : accompanied token
    case 58:
      return 3;
    // " ' ( [ opening delimit token
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    // ) ] closing delimit token
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function zs(e) {
  return wr = qt = 1, Ls = nt(Qt = e), _e = 0, [];
}
function Us(e) {
  return Qt = "", e;
}
function qn(e) {
  return Ds(jn(_e - 1, Yr(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ud(e) {
  for (; (xe = ot()) && xe < 33; )
    ze();
  return xn(e) > 2 || xn(xe) > 3 ? "" : " ";
}
function Fd(e, t) {
  for (; --t && ze() && !(xe < 48 || xe > 102 || xe > 57 && xe < 65 || xe > 70 && xe < 97); )
    ;
  return jn(e, Vn() + (t < 6 && ot() == 32 && ze() == 32));
}
function Yr(e) {
  for (; ze(); )
    switch (xe) {
      // ] ) " '
      case e:
        return _e;
      // " '
      case 34:
      case 39:
        e !== 34 && e !== 39 && Yr(xe);
        break;
      // (
      case 40:
        e === 41 && Yr(e);
        break;
      // \
      case 92:
        ze();
        break;
    }
  return _e;
}
function Wd(e, t) {
  for (; ze() && e + xe !== 57; )
    if (e + xe === 84 && ot() === 47)
      break;
  return "/*" + jn(t, _e - 1) + "*" + br(e === 47 ? e : ze());
}
function Hd(e) {
  for (; !xn(ot()); )
    ze();
  return jn(e, _e);
}
function Vd(e) {
  return Us(Gn("", null, null, null, [""], e = zs(e), 0, [0], e));
}
function Gn(e, t, n, r, o, i, s, a, l) {
  for (var c = 0, p = 0, g = s, m = 0, x = 0, C = 0, f = 1, I = 1, j = 1, B = 0, T = "", M = o, k = i, _ = r, D = T; I; )
    switch (C = B, B = ze()) {
      // (
      case 40:
        if (C != 108 && Ie(D, g - 1) == 58) {
          Gr(D += ie(qn(B), "&", "&\f"), "&\f") != -1 && (j = -1);
          break;
        }
      // " ' [
      case 34:
      case 39:
      case 91:
        D += qn(B);
        break;
      // \t \n \r \s
      case 9:
      case 10:
      case 13:
      case 32:
        D += Ud(C);
        break;
      // \
      case 92:
        D += Fd(Vn() - 1, 7);
        continue;
      // /
      case 47:
        switch (ot()) {
          case 42:
          case 47:
            zn(qd(Wd(ze(), Vn()), t, n), l);
            break;
          default:
            D += "/";
        }
        break;
      // {
      case 123 * f:
        a[c++] = nt(D) * j;
      // } ; \0
      case 125 * f:
      case 59:
      case 0:
        switch (B) {
          // \0 }
          case 0:
          case 125:
            I = 0;
          // ;
          case 59 + p:
            j == -1 && (D = ie(D, /\f/g, "")), x > 0 && nt(D) - g && zn(x > 32 ? Mi(D + ";", r, n, g - 1) : Mi(ie(D, " ", "") + ";", r, n, g - 2), l);
            break;
          // @ ;
          case 59:
            D += ";";
          // { rule/at-rule
          default:
            if (zn(_ = Ai(D, t, n, c, p, o, a, T, M = [], k = [], g), i), B === 123)
              if (p === 0)
                Gn(D, t, _, _, M, i, g, a, k);
              else
                switch (m === 99 && Ie(D, 3) === 110 ? 100 : m) {
                  // d l m s
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Gn(e, _, _, r && zn(Ai(e, _, _, 0, 0, o, a, T, o, M = [], g), k), o, k, g, a, r ? M : k);
                    break;
                  default:
                    Gn(D, _, _, _, [""], k, 0, a, k);
                }
        }
        c = p = x = 0, f = j = 1, T = D = "", g = s;
        break;
      // :
      case 58:
        g = 1 + nt(D), x = C;
      default:
        if (f < 1) {
          if (B == 123)
            --f;
          else if (B == 125 && f++ == 0 && zd() == 125)
            continue;
        }
        switch (D += br(B), B * f) {
          // &
          case 38:
            j = p > 0 ? 1 : (D += "\f", -1);
            break;
          // ,
          case 44:
            a[c++] = (nt(D) - 1) * j, j = 1;
            break;
          // @
          case 64:
            ot() === 45 && (D += qn(ze())), m = ot(), p = g = nt(T = D += Hd(Vn())), B++;
            break;
          // -
          case 45:
            C === 45 && nt(D) == 2 && (f = 0);
        }
    }
  return i;
}
function Ai(e, t, n, r, o, i, s, a, l, c, p) {
  for (var g = o - 1, m = o === 0 ? i : [""], x = yo(m), C = 0, f = 0, I = 0; C < r; ++C)
    for (var j = 0, B = wn(e, g + 1, g = _d(f = s[C])), T = e; j < x; ++j)
      (T = Ds(f > 0 ? m[j] + " " + B : ie(B, /&\f/g, m[j]))) && (l[I++] = T);
  return xr(e, t, n, o === 0 ? go : a, l, c, p);
}
function qd(e, t, n) {
  return xr(e, t, n, Ns, br(Ld()), wn(e, 2, -2), 0);
}
function Mi(e, t, n, r) {
  return xr(e, t, n, mo, wn(e, 0, r), wn(e, r + 1, -1), r);
}
function Ft(e, t) {
  for (var n = "", r = yo(e), o = 0; o < r; o++)
    n += t(e[o], o, e, t) || "";
  return n;
}
function Gd(e, t, n, r) {
  switch (e.type) {
    case $d:
      if (e.children.length) break;
    case Od:
    case mo:
      return e.return = e.return || e.value;
    case Ns:
      return "";
    case Bs:
      return e.return = e.value + "{" + Ft(e.children, r) + "}";
    case go:
      e.value = e.props.join(",");
  }
  return nt(n = Ft(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
function Yd(e) {
  var t = yo(e);
  return function(n, r, o, i) {
    for (var s = "", a = 0; a < t; a++)
      s += e[a](n, r, o, i) || "";
    return s;
  };
}
function Qd(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function Fs(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var Zd = function(t, n, r) {
  for (var o = 0, i = 0; o = i, i = ot(), o === 38 && i === 12 && (n[r] = 1), !xn(i); )
    ze();
  return jn(t, _e);
}, Kd = function(t, n) {
  var r = -1, o = 44;
  do
    switch (xn(o)) {
      case 0:
        o === 38 && ot() === 12 && (n[r] = 1), t[r] += Zd(_e - 1, n, r);
        break;
      case 2:
        t[r] += qn(o);
        break;
      case 4:
        if (o === 44) {
          t[++r] = ot() === 58 ? "&\f" : "", n[r] = t[r].length;
          break;
        }
      // fallthrough
      default:
        t[r] += br(o);
    }
  while (o = ze());
  return t;
}, Jd = function(t, n) {
  return Us(Kd(zs(t), n));
}, Pi = /* @__PURE__ */ new WeakMap(), Xd = function(t) {
  if (!(t.type !== "rule" || !t.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  t.length < 1)) {
    for (var n = t.value, r = t.parent, o = t.column === r.column && t.line === r.line; r.type !== "rule"; )
      if (r = r.parent, !r) return;
    if (!(t.props.length === 1 && n.charCodeAt(0) !== 58 && !Pi.get(r)) && !o) {
      Pi.set(t, !0);
      for (var i = [], s = Jd(n, i), a = r.props, l = 0, c = 0; l < s.length; l++)
        for (var p = 0; p < a.length; p++, c++)
          t.props[c] = i[l] ? s[l].replace(/&\f/g, a[p]) : a[p] + " " + s[l];
    }
  }
}, ef = function(t) {
  if (t.type === "decl") {
    var n = t.value;
    // charcode for l
    n.charCodeAt(0) === 108 && // charcode for b
    n.charCodeAt(2) === 98 && (t.return = "", t.value = "");
  }
};
function Ws(e, t) {
  switch (Nd(e, t)) {
    // color-adjust
    case 5103:
      return oe + "print-" + e + e;
    // animation, animation-(delay|direction|duration|fill-mode|iteration-count|name|play-state|timing-function)
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    // text-decoration, filter, clip-path, backface-visibility, column, box-decoration-break
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    // mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    // background-clip, columns, column-(count|fill|gap|rule|rule-color|rule-style|rule-width|span|width)
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return oe + e + e;
    // appearance, user-select, transform, hyphens, text-size-adjust
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return oe + e + tr + e + je + e + e;
    // flex, flex-direction
    case 6828:
    case 4268:
      return oe + e + je + e + e;
    // order
    case 6165:
      return oe + e + je + "flex-" + e + e;
    // align-items
    case 5187:
      return oe + e + ie(e, /(\w+).+(:[^]+)/, oe + "box-$1$2" + je + "flex-$1$2") + e;
    // align-self
    case 5443:
      return oe + e + je + "flex-item-" + ie(e, /flex-|-self/, "") + e;
    // align-content
    case 4675:
      return oe + e + je + "flex-line-pack" + ie(e, /align-content|flex-|-self/, "") + e;
    // flex-shrink
    case 5548:
      return oe + e + je + ie(e, "shrink", "negative") + e;
    // flex-basis
    case 5292:
      return oe + e + je + ie(e, "basis", "preferred-size") + e;
    // flex-grow
    case 6060:
      return oe + "box-" + ie(e, "-grow", "") + oe + e + je + ie(e, "grow", "positive") + e;
    // transition
    case 4554:
      return oe + ie(e, /([^-])(transform)/g, "$1" + oe + "$2") + e;
    // cursor
    case 6187:
      return ie(ie(ie(e, /(zoom-|grab)/, oe + "$1"), /(image-set)/, oe + "$1"), e, "") + e;
    // background, background-image
    case 5495:
    case 3959:
      return ie(e, /(image-set\([^]*)/, oe + "$1$`$1");
    // justify-content
    case 4968:
      return ie(ie(e, /(.+:)(flex-)?(.*)/, oe + "box-pack:$3" + je + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + oe + e + e;
    // (margin|padding)-inline-(start|end)
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return ie(e, /(.+)-inline(.+)/, oe + "$1$2") + e;
    // (min|max)?(width|height|inline-size|block-size)
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (nt(e) - 1 - t > 6) switch (Ie(e, t + 1)) {
        // (m)ax-content, (m)in-content
        case 109:
          if (Ie(e, t + 4) !== 45) break;
        // (f)ill-available, (f)it-content
        case 102:
          return ie(e, /(.+:)(.+)-([^]+)/, "$1" + oe + "$2-$3$1" + tr + (Ie(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
        // (s)tretch
        case 115:
          return ~Gr(e, "stretch") ? Ws(ie(e, "stretch", "fill-available"), t) + e : e;
      }
      break;
    // position: sticky
    case 4949:
      if (Ie(e, t + 1) !== 115) break;
    // display: (flex|inline-flex)
    case 6444:
      switch (Ie(e, nt(e) - 3 - (~Gr(e, "!important") && 10))) {
        // stic(k)y
        case 107:
          return ie(e, ":", ":" + oe) + e;
        // (inline-)?fl(e)x
        case 101:
          return ie(e, /(.+:)([^;!]+)(;|!.+)?/, "$1" + oe + (Ie(e, 14) === 45 ? "inline-" : "") + "box$3$1" + oe + "$2$3$1" + je + "$2box$3") + e;
      }
      break;
    // writing-mode
    case 5936:
      switch (Ie(e, t + 11)) {
        // vertical-l(r)
        case 114:
          return oe + e + je + ie(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        // vertical-r(l)
        case 108:
          return oe + e + je + ie(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        // horizontal(-)tb
        case 45:
          return oe + e + je + ie(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
      return oe + e + je + e + e;
  }
  return e;
}
var tf = function(t, n, r, o) {
  if (t.length > -1 && !t.return) switch (t.type) {
    case mo:
      t.return = Ws(t.value, t.length);
      break;
    case Bs:
      return Ft([dn(t, {
        value: ie(t.value, "@", "@" + oe)
      })], o);
    case go:
      if (t.length) return Dd(t.props, function(i) {
        switch (Bd(i, /(::plac\w+|:read-\w+)/)) {
          // :read-(only|write)
          case ":read-only":
          case ":read-write":
            return Ft([dn(t, {
              props: [ie(i, /:(read-\w+)/, ":" + tr + "$1")]
            })], o);
          // :placeholder
          case "::placeholder":
            return Ft([dn(t, {
              props: [ie(i, /:(plac\w+)/, ":" + oe + "input-$1")]
            }), dn(t, {
              props: [ie(i, /:(plac\w+)/, ":" + tr + "$1")]
            }), dn(t, {
              props: [ie(i, /:(plac\w+)/, je + "input-$1")]
            })], o);
        }
        return "";
      });
  }
}, nf = [tf], rf = function(t) {
  var n = t.key;
  if (n === "css") {
    var r = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(r, function(f) {
      var I = f.getAttribute("data-emotion");
      I.indexOf(" ") !== -1 && (document.head.appendChild(f), f.setAttribute("data-s", ""));
    });
  }
  var o = t.stylisPlugins || nf, i = {}, s, a = [];
  s = t.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + n + ' "]'),
    function(f) {
      for (var I = f.getAttribute("data-emotion").split(" "), j = 1; j < I.length; j++)
        i[I[j]] = !0;
      a.push(f);
    }
  );
  var l, c = [Xd, ef];
  {
    var p, g = [Gd, Qd(function(f) {
      p.insert(f);
    })], m = Yd(c.concat(o, g)), x = function(I) {
      return Ft(Vd(I), m);
    };
    l = function(I, j, B, T) {
      p = B, x(I ? I + "{" + j.styles + "}" : j.styles), T && (C.inserted[j.name] = !0);
    };
  }
  var C = {
    key: n,
    sheet: new Pd({
      key: n,
      container: s,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
      insertionPoint: t.insertionPoint
    }),
    nonce: t.nonce,
    inserted: i,
    registered: {},
    insert: l
  };
  return C.sheet.hydrate(a), C;
}, of = !0;
function sf(e, t, n) {
  var r = "";
  return n.split(" ").forEach(function(o) {
    e[o] !== void 0 ? t.push(e[o] + ";") : o && (r += o + " ");
  }), r;
}
var Hs = function(t, n, r) {
  var o = t.key + "-" + n.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (r === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  of === !1) && t.registered[o] === void 0 && (t.registered[o] = n.styles);
}, af = function(t, n, r) {
  Hs(t, n, r);
  var o = t.key + "-" + n.name;
  if (t.inserted[n.name] === void 0) {
    var i = n;
    do
      t.insert(n === i ? "." + o : "", i, t.sheet, !0), i = i.next;
    while (i !== void 0);
  }
};
function cf(e) {
  for (var t = 0, n, r = 0, o = e.length; o >= 4; ++r, o -= 4)
    n = e.charCodeAt(r) & 255 | (e.charCodeAt(++r) & 255) << 8 | (e.charCodeAt(++r) & 255) << 16 | (e.charCodeAt(++r) & 255) << 24, n = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16), n ^= /* k >>> r: */
    n >>> 24, t = /* Math.imul(k, m): */
    (n & 65535) * 1540483477 + ((n >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  switch (o) {
    case 3:
      t ^= (e.charCodeAt(r + 2) & 255) << 16;
    case 2:
      t ^= (e.charCodeAt(r + 1) & 255) << 8;
    case 1:
      t ^= e.charCodeAt(r) & 255, t = /* Math.imul(h, m): */
      (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16);
  }
  return t ^= t >>> 13, t = /* Math.imul(h, m): */
  (t & 65535) * 1540483477 + ((t >>> 16) * 59797 << 16), ((t ^ t >>> 15) >>> 0).toString(36);
}
var lf = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, uf = /[A-Z]|^ms/g, df = /_EMO_([^_]+?)_([^]*?)_EMO_/g, Vs = function(t) {
  return t.charCodeAt(1) === 45;
}, Oi = function(t) {
  return t != null && typeof t != "boolean";
}, Dr = /* @__PURE__ */ Fs(function(e) {
  return Vs(e) ? e : e.replace(uf, "-$&").toLowerCase();
}), $i = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(df, function(r, o, i) {
          return rt = {
            name: o,
            styles: i,
            next: rt
          }, o;
        });
  }
  return lf[t] !== 1 && !Vs(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
};
function vn(e, t, n) {
  if (n == null)
    return "";
  var r = n;
  if (r.__emotion_styles !== void 0)
    return r;
  switch (typeof n) {
    case "boolean":
      return "";
    case "object": {
      var o = n;
      if (o.anim === 1)
        return rt = {
          name: o.name,
          styles: o.styles,
          next: rt
        }, o.name;
      var i = n;
      if (i.styles !== void 0) {
        var s = i.next;
        if (s !== void 0)
          for (; s !== void 0; )
            rt = {
              name: s.name,
              styles: s.styles,
              next: rt
            }, s = s.next;
        var a = i.styles + ";";
        return a;
      }
      return ff(e, t, n);
    }
    case "function": {
      if (e !== void 0) {
        var l = rt, c = n(e);
        return rt = l, vn(e, t, c);
      }
      break;
    }
  }
  var p = n;
  if (t == null)
    return p;
  var g = t[p];
  return g !== void 0 ? g : p;
}
function ff(e, t, n) {
  var r = "";
  if (Array.isArray(n))
    for (var o = 0; o < n.length; o++)
      r += vn(e, t, n[o]) + ";";
  else
    for (var i in n) {
      var s = n[i];
      if (typeof s != "object") {
        var a = s;
        t != null && t[a] !== void 0 ? r += i + "{" + t[a] + "}" : Oi(a) && (r += Dr(i) + ":" + $i(i, a) + ";");
      } else if (Array.isArray(s) && typeof s[0] == "string" && (t == null || t[s[0]] === void 0))
        for (var l = 0; l < s.length; l++)
          Oi(s[l]) && (r += Dr(i) + ":" + $i(i, s[l]) + ";");
      else {
        var c = vn(e, t, s);
        switch (i) {
          case "animation":
          case "animationName": {
            r += Dr(i) + ":" + c + ";";
            break;
          }
          default:
            r += i + "{" + c + "}";
        }
      }
    }
  return r;
}
var _i = /label:\s*([^\s;{]+)\s*(;|$)/g, rt;
function qs(e, t, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var r = !0, o = "";
  rt = void 0;
  var i = e[0];
  if (i == null || i.raw === void 0)
    r = !1, o += vn(n, t, i);
  else {
    var s = i;
    o += s[0];
  }
  for (var a = 1; a < e.length; a++)
    if (o += vn(n, t, e[a]), r) {
      var l = i;
      o += l[a];
    }
  _i.lastIndex = 0;
  for (var c = "", p; (p = _i.exec(o)) !== null; )
    c += "-" + p[1];
  var g = cf(o) + c;
  return {
    name: g,
    styles: o,
    next: rt
  };
}
var hf = function(t) {
  return t();
}, pf = Te.useInsertionEffect ? Te.useInsertionEffect : !1, gf = pf || hf, Gs = /* @__PURE__ */ Te.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ rf({
    key: "css"
  }) : null
);
Gs.Provider;
var mf = function(t) {
  return /* @__PURE__ */ Va(function(n, r) {
    var o = Ki(Gs);
    return t(n, o, r);
  });
}, yf = /* @__PURE__ */ Te.createContext({}), bf = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, wf = /* @__PURE__ */ Fs(
  function(e) {
    return bf.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), xf = wf, vf = function(t) {
  return t !== "theme";
}, Ri = function(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96 ? xf : vf;
}, Ni = function(t, n, r) {
  var o;
  if (n) {
    var i = n.shouldForwardProp;
    o = t.__emotion_forwardProp && i ? function(s) {
      return t.__emotion_forwardProp(s) && i(s);
    } : i;
  }
  return typeof o != "function" && r && (o = t.__emotion_forwardProp), o;
}, Cf = function(t) {
  var n = t.cache, r = t.serialized, o = t.isStringTag;
  return Hs(n, r, o), gf(function() {
    return af(n, r, o);
  }), null;
}, Sf = function e(t, n) {
  var r = t.__emotion_real === t, o = r && t.__emotion_base || t, i, s;
  n !== void 0 && (i = n.label, s = n.target);
  var a = Ni(t, n, r), l = a || Ri(o), c = !l("as");
  return function() {
    var p = arguments, g = r && t.__emotion_styles !== void 0 ? t.__emotion_styles.slice(0) : [];
    if (i !== void 0 && g.push("label:" + i + ";"), p[0] == null || p[0].raw === void 0)
      g.push.apply(g, p);
    else {
      var m = p[0];
      g.push(m[0]);
      for (var x = p.length, C = 1; C < x; C++)
        g.push(p[C], m[C]);
    }
    var f = mf(function(I, j, B) {
      var T = c && I.as || o, M = "", k = [], _ = I;
      if (I.theme == null) {
        _ = {};
        for (var D in I)
          _[D] = I[D];
        _.theme = Te.useContext(yf);
      }
      typeof I.className == "string" ? M = sf(j.registered, k, I.className) : I.className != null && (M = I.className + " ");
      var J = qs(g.concat(k), j.registered, _);
      M += j.key + "-" + J.name, s !== void 0 && (M += " " + s);
      var X = c && a === void 0 ? Ri(T) : l, h = {};
      for (var $ in I)
        c && $ === "as" || X($) && (h[$] = I[$]);
      return h.className = M, B && (h.ref = B), /* @__PURE__ */ Te.createElement(Te.Fragment, null, /* @__PURE__ */ Te.createElement(Cf, {
        cache: j,
        serialized: J,
        isStringTag: typeof T == "string"
      }), /* @__PURE__ */ Te.createElement(T, h));
    });
    return f.displayName = i !== void 0 ? i : "Styled(" + (typeof o == "string" ? o : o.displayName || o.name || "Component") + ")", f.defaultProps = t.defaultProps, f.__emotion_real = f, f.__emotion_base = o, f.__emotion_styles = g, f.__emotion_forwardProp = a, Object.defineProperty(f, "toString", {
      value: function() {
        return "." + s;
      }
    }), f.withComponent = function(I, j) {
      var B = e(I, qr({}, n, j, {
        shouldForwardProp: Ni(f, j, !0)
      }));
      return B.apply(void 0, g);
    }, f;
  };
}, kf = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
], Qr = Sf.bind(null);
kf.forEach(function(e) {
  Qr[e] = Qr(e);
});
/**
 * @mui/styled-engine v7.1.1
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function If(e, t) {
  const n = Qr(e, t);
  return process.env.NODE_ENV !== "production" ? (...r) => {
    const o = typeof e == "string" ? `"${e}"` : "component";
    return r.length === 0 ? console.error([`MUI: Seems like you called \`styled(${o})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : r.some((i) => i === void 0) && console.error(`MUI: the styled(${o})(...args) API requires all its args to be defined.`), n(...r);
  } : n;
}
function Tf(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const Bi = [];
function Di(e) {
  return Bi[0] = e, qs(Bi);
}
const Ef = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => ({
    ...n,
    [r.key]: r.val
  }), {});
};
function jf(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: t = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: n = "px",
    step: r = 5,
    ...o
  } = e, i = Ef(t), s = Object.keys(i);
  function a(m) {
    return `@media (min-width:${typeof t[m] == "number" ? t[m] : m}${n})`;
  }
  function l(m) {
    return `@media (max-width:${(typeof t[m] == "number" ? t[m] : m) - r / 100}${n})`;
  }
  function c(m, x) {
    const C = s.indexOf(x);
    return `@media (min-width:${typeof t[m] == "number" ? t[m] : m}${n}) and (max-width:${(C !== -1 && typeof t[s[C]] == "number" ? t[s[C]] : x) - r / 100}${n})`;
  }
  function p(m) {
    return s.indexOf(m) + 1 < s.length ? c(m, s[s.indexOf(m) + 1]) : a(m);
  }
  function g(m) {
    const x = s.indexOf(m);
    return x === 0 ? a(s[1]) : x === s.length - 1 ? l(s[x]) : c(m, s[s.indexOf(m) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: s,
    values: i,
    up: a,
    down: l,
    between: c,
    only: p,
    not: g,
    unit: n,
    ...o
  };
}
const Af = {
  borderRadius: 4
};
function Ys(e = 8, t = ho({
  spacing: e
})) {
  if (e.mui)
    return e;
  const n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function Mf(e, t) {
  var r;
  const n = this;
  if (n.vars) {
    if (!((r = n.colorSchemes) != null && r[e]) || typeof n.getColorSchemeSelector != "function")
      return {};
    let o = n.getColorSchemeSelector(e);
    return o === "&" ? t : ((o.includes("data-") || o.includes(".")) && (o = `*:where(${o.replace(/\s*&$/, "")}) &`), {
      [o]: t
    });
  }
  return n.palette.mode === e ? t : {};
}
function Qs(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {},
    ...s
  } = e, a = jf(n), l = Ys(o);
  let c = Le({
    breakpoints: a,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...r
    },
    spacing: l,
    shape: {
      ...Af,
      ...i
    }
  }, s);
  return c = Lu(c), c.applyStyles = Mf, c = t.reduce((p, g) => Le(p, g), c), c.unstable_sxConfig = {
    ...yr,
    ...s == null ? void 0 : s.unstable_sxConfig
  }, c.unstable_sx = function(g) {
    return Vt({
      sx: g,
      theme: this
    });
  }, c;
}
const Pf = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function bo(e, t, n = "Mui") {
  const r = Pf[t];
  return r ? `${n}-${r}` : `${Cu.generate(e)}-${t}`;
}
function Of(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = bo(e, o, n);
  }), r;
}
function Zs(e, t = "") {
  return e.displayName || e.name || t;
}
function Li(e, t, n) {
  const r = Zs(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function $f(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Zs(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Xn.ForwardRef:
          return Li(e, e.render, "ForwardRef");
        case Xn.Memo:
          return Li(e, e.type, "memo");
        default:
          return;
      }
  }
}
function Ks(e) {
  const {
    variants: t,
    ...n
  } = e, r = {
    variants: t,
    style: Di(n),
    isProcessed: !0
  };
  return r.style === n || t && t.forEach((o) => {
    typeof o.style != "function" && (o.style = Di(o.style));
  }), r;
}
const _f = Qs();
function Lr(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function Rf(e) {
  return e ? (t, n) => n[e] : null;
}
function Nf(e, t, n) {
  e.theme = zf(e.theme) ? n : e.theme[t] || e.theme;
}
function Yn(e, t) {
  const n = typeof t == "function" ? t(e) : t;
  if (Array.isArray(n))
    return n.flatMap((r) => Yn(e, r));
  if (Array.isArray(n == null ? void 0 : n.variants)) {
    let r;
    if (n.isProcessed)
      r = n.style;
    else {
      const {
        variants: o,
        ...i
      } = n;
      r = i;
    }
    return Js(e, n.variants, [r]);
  }
  return n != null && n.isProcessed ? n.style : n;
}
function Js(e, t, n = []) {
  var o;
  let r;
  e: for (let i = 0; i < t.length; i += 1) {
    const s = t[i];
    if (typeof s.props == "function") {
      if (r ?? (r = {
        ...e,
        ...e.ownerState,
        ownerState: e.ownerState
      }), !s.props(r))
        continue;
    } else
      for (const a in s.props)
        if (e[a] !== s.props[a] && ((o = e.ownerState) == null ? void 0 : o[a]) !== s.props[a])
          continue e;
    typeof s.style == "function" ? (r ?? (r = {
      ...e,
      ...e.ownerState,
      ownerState: e.ownerState
    }), n.push(s.style(r))) : n.push(s.style);
  }
  return n;
}
function Bf(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = _f,
    rootShouldForwardProp: r = Lr,
    slotShouldForwardProp: o = Lr
  } = e;
  function i(a) {
    Nf(a, t, n);
  }
  return (a, l = {}) => {
    Tf(a, (k) => k.filter((_) => _ !== Vt));
    const {
      name: c,
      slot: p,
      skipVariantsResolver: g,
      skipSx: m,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: x = Rf(Xs(p)),
      ...C
    } = l, f = g !== void 0 ? g : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      p && p !== "Root" && p !== "root" || !1
    ), I = m || !1;
    let j = Lr;
    p === "Root" || p === "root" ? j = r : p ? j = o : Uf(a) && (j = void 0);
    const B = If(a, {
      shouldForwardProp: j,
      label: Lf(c, p),
      ...C
    }), T = (k) => {
      if (k.__emotion_real === k)
        return k;
      if (typeof k == "function")
        return function(D) {
          return Yn(D, k);
        };
      if (ut(k)) {
        const _ = Ks(k);
        return _.variants ? function(J) {
          return Yn(J, _);
        } : _.style;
      }
      return k;
    }, M = (...k) => {
      const _ = [], D = k.map(T), J = [];
      if (_.push(i), c && x && J.push(function(H) {
        var de, pe;
        const u = (pe = (de = H.theme.components) == null ? void 0 : de[c]) == null ? void 0 : pe.styleOverrides;
        if (!u)
          return null;
        const ve = {};
        for (const Ce in u)
          ve[Ce] = Yn(H, u[Ce]);
        return x(H, ve);
      }), c && !f && J.push(function(H) {
        var ve, de;
        const R = H.theme, u = (de = (ve = R == null ? void 0 : R.components) == null ? void 0 : ve[c]) == null ? void 0 : de.variants;
        return u ? Js(H, u) : null;
      }), I || J.push(Vt), Array.isArray(D[0])) {
        const $ = D.shift(), H = new Array(_.length).fill(""), R = new Array(J.length).fill("");
        let u;
        u = [...H, ...$, ...R], u.raw = [...H, ...$.raw, ...R], _.unshift(u);
      }
      const X = [..._, ...D, ...J], h = B(...X);
      return a.muiName && (h.muiName = a.muiName), process.env.NODE_ENV !== "production" && (h.displayName = Df(c, p, a)), h;
    };
    return B.withConfig && (M.withConfig = B.withConfig), M;
  };
}
function Df(e, t, n) {
  return e ? `${e}${Mt(t || "")}` : `Styled(${$f(n)})`;
}
function Lf(e, t) {
  let n;
  return process.env.NODE_ENV !== "production" && e && (n = `${e}-${Xs(t || "Root")}`), n;
}
function zf(e) {
  for (const t in e)
    return !1;
  return !0;
}
function Uf(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Xs(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
function Zr(e, t) {
  const n = {
    ...t
  };
  for (const r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      const o = r;
      if (o === "components" || o === "slots")
        n[o] = {
          ...e[o],
          ...n[o]
        };
      else if (o === "componentsProps" || o === "slotProps") {
        const i = e[o], s = t[o];
        if (!s)
          n[o] = i || {};
        else if (!i)
          n[o] = s;
        else {
          n[o] = {
            ...s
          };
          for (const a in i)
            if (Object.prototype.hasOwnProperty.call(i, a)) {
              const l = a;
              n[o][l] = Zr(i[l], s[l]);
            }
        }
      } else n[o] === void 0 && (n[o] = e[o]);
    }
  return n;
}
function Ff(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function wo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Ff(e, t, n);
}
function Wf(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), process.env.NODE_ENV !== "production" && e.length !== e.trim().length && console.error(`MUI: The color: "${e}" is invalid. Make sure the color input doesn't contain leading/trailing space.`), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function wt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return wt(Wf(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(n))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : bt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(o))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : bt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
const Hf = (e) => {
  const t = wt(e);
  return t.values.slice(0, 3).map((n, r) => t.type.includes("hsl") && r !== 0 ? `${n}%` : n).join(" ");
}, hn = (e, t) => {
  try {
    return Hf(e);
  } catch {
    return t && process.env.NODE_ENV !== "production" && console.warn(t), e;
  }
};
function vr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.includes("rgb") ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.includes("color") ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function ea(e) {
  e = wt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (c, p = (c + n / 30) % 12) => o - i * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  let a = "rgb";
  const l = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (a += "a", l.push(t[3])), vr({
    type: a,
    values: l
  });
}
function Kr(e) {
  e = wt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? wt(ea(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function zi(e, t) {
  const n = Kr(e), r = Kr(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Vf(e, t) {
  return e = wt(e), t = wo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, vr(e);
}
function Un(e, t, n) {
  try {
    return Vf(e, t);
  } catch {
    return e;
  }
}
function xo(e, t) {
  if (e = wt(e), t = wo(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return vr(e);
}
function fe(e, t, n) {
  try {
    return xo(e, t);
  } catch {
    return e;
  }
}
function vo(e, t) {
  if (e = wt(e), t = wo(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return vr(e);
}
function he(e, t, n) {
  try {
    return vo(e, t);
  } catch {
    return e;
  }
}
function qf(e, t = 0.15) {
  return Kr(e) > 0.5 ? xo(e, t) : vo(e, t);
}
function Fn(e, t, n) {
  try {
    return qf(e, t);
  } catch {
    return e;
  }
}
const Gf = /* @__PURE__ */ Te.createContext(void 0);
process.env.NODE_ENV !== "production" && (ne.node, ne.object);
function Yf(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  if (!t || !t.components || !t.components[n])
    return r;
  const o = t.components[n];
  return o.defaultProps ? Zr(o.defaultProps, r) : !o.styleOverrides && !o.variants ? Zr(o, r) : r;
}
function Qf({
  props: e,
  name: t
}) {
  const n = Te.useContext(Gf);
  return Yf({
    props: e,
    name: t,
    theme: {
      components: n
    }
  });
}
const Ui = {
  theme: void 0
};
function Zf(e) {
  let t, n;
  return function(o) {
    let i = t;
    return (i === void 0 || o.theme !== n) && (Ui.theme = o.theme, i = Ks(e(Ui)), t = i, n = o.theme), i;
  };
}
function Kf(e = "") {
  function t(...r) {
    if (!r.length)
      return "";
    const o = r[0];
    return typeof o == "string" && !o.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${o}${t(...r.slice(1))})` : `, ${o}`;
  }
  return (r, ...o) => `var(--${e ? `${e}-` : ""}${r}${t(...o)})`;
}
const Fi = (e, t, n, r = []) => {
  let o = e;
  t.forEach((i, s) => {
    s === t.length - 1 ? Array.isArray(o) ? o[Number(i)] = n : o && typeof o == "object" && (o[i] = n) : o && typeof o == "object" && (o[i] || (o[i] = r.includes(i) ? [] : {}), o = o[i]);
  });
}, Jf = (e, t, n) => {
  function r(o, i = [], s = []) {
    Object.entries(o).forEach(([a, l]) => {
      (!n || n && !n([...i, a])) && l != null && (typeof l == "object" && Object.keys(l).length > 0 ? r(l, [...i, a], Array.isArray(l) ? [...s, a] : s) : t([...i, a], l, s));
    });
  }
  r(e);
}, Xf = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((r) => e.includes(r)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function zr(e, t) {
  const {
    prefix: n,
    shouldSkipGeneratingVar: r
  } = t || {}, o = {}, i = {}, s = {};
  return Jf(
    e,
    (a, l, c) => {
      if ((typeof l == "string" || typeof l == "number") && (!r || !r(a, l))) {
        const p = `--${n ? `${n}-` : ""}${a.join("-")}`, g = Xf(a, l);
        Object.assign(o, {
          [p]: g
        }), Fi(i, a, `var(${p})`, c), Fi(s, a, `var(${p}, ${g})`, c);
      }
    },
    (a) => a[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: o,
    vars: i,
    varsWithDefaults: s
  };
}
function e0(e, t = {}) {
  const {
    getSelector: n = I,
    disableCssColorScheme: r,
    colorSchemeSelector: o
  } = t, {
    colorSchemes: i = {},
    components: s,
    defaultColorScheme: a = "light",
    ...l
  } = e, {
    vars: c,
    css: p,
    varsWithDefaults: g
  } = zr(l, t);
  let m = g;
  const x = {}, {
    [a]: C,
    ...f
  } = i;
  if (Object.entries(f || {}).forEach(([T, M]) => {
    const {
      vars: k,
      css: _,
      varsWithDefaults: D
    } = zr(M, t);
    m = Le(m, D), x[T] = {
      css: _,
      vars: k
    };
  }), C) {
    const {
      css: T,
      vars: M,
      varsWithDefaults: k
    } = zr(C, t);
    m = Le(m, k), x[a] = {
      css: T,
      vars: M
    };
  }
  function I(T, M) {
    var _, D;
    let k = o;
    if (o === "class" && (k = ".%s"), o === "data" && (k = "[data-%s]"), o != null && o.startsWith("data-") && !o.includes("%s") && (k = `[${o}="%s"]`), T) {
      if (k === "media")
        return e.defaultColorScheme === T ? ":root" : {
          [`@media (prefers-color-scheme: ${((D = (_ = i[T]) == null ? void 0 : _.palette) == null ? void 0 : D.mode) || T})`]: {
            ":root": M
          }
        };
      if (k)
        return e.defaultColorScheme === T ? `:root, ${k.replace("%s", String(T))}` : k.replace("%s", String(T));
    }
    return ":root";
  }
  return {
    vars: m,
    generateThemeVars: () => {
      let T = {
        ...c
      };
      return Object.entries(x).forEach(([, {
        vars: M
      }]) => {
        T = Le(T, M);
      }), T;
    },
    generateStyleSheets: () => {
      var J, X;
      const T = [], M = e.defaultColorScheme || "light";
      function k(h, $) {
        Object.keys($).length && T.push(typeof h == "string" ? {
          [h]: {
            ...$
          }
        } : h);
      }
      k(n(void 0, {
        ...p
      }), p);
      const {
        [M]: _,
        ...D
      } = x;
      if (_) {
        const {
          css: h
        } = _, $ = (X = (J = i[M]) == null ? void 0 : J.palette) == null ? void 0 : X.mode, H = !r && $ ? {
          colorScheme: $,
          ...h
        } : {
          ...h
        };
        k(n(M, {
          ...H
        }), H);
      }
      return Object.entries(D).forEach(([h, {
        css: $
      }]) => {
        var u, ve;
        const H = (ve = (u = i[h]) == null ? void 0 : u.palette) == null ? void 0 : ve.mode, R = !r && H ? {
          colorScheme: H,
          ...$
        } : {
          ...$
        };
        k(n(h, {
          ...R
        }), R);
      }), T;
    }
  };
}
function t0(e) {
  return function(n) {
    return e === "media" ? (process.env.NODE_ENV !== "production" && n !== "light" && n !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${n}'.`), `@media (prefers-color-scheme: ${n})`) : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${n}"] &` : e === "class" ? `.${n} &` : e === "data" ? `[data-${n}] &` : `${e.replace("%s", n)} &` : "&";
  };
}
const Cn = {
  black: "#000",
  white: "#fff"
}, n0 = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, _t = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, Rt = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, fn = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, Nt = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, Bt = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, Dt = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
};
function ta() {
  return {
    // The colors used to style the text.
    text: {
      // The most important text.
      primary: "rgba(0, 0, 0, 0.87)",
      // Secondary text.
      secondary: "rgba(0, 0, 0, 0.6)",
      // Disabled text have even lower visual prominence.
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    // The color used to divide different elements.
    divider: "rgba(0, 0, 0, 0.12)",
    // The background colors used to style the surfaces.
    // Consistency between these values is important.
    background: {
      paper: Cn.white,
      default: Cn.white
    },
    // The colors used to style the action elements.
    action: {
      // The color of an active action like an icon button.
      active: "rgba(0, 0, 0, 0.54)",
      // The color of an hovered action.
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      // The color of a selected action.
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      // The color of a disabled action.
      disabled: "rgba(0, 0, 0, 0.26)",
      // The background color of a disabled action.
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  };
}
const r0 = ta();
function na() {
  return {
    text: {
      primary: Cn.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)"
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#121212",
      default: "#121212"
    },
    action: {
      active: Cn.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    }
  };
}
const Wi = na();
function Hi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = vo(e.main, o) : t === "dark" && (e.dark = xo(e.main, i)));
}
function o0(e = "light") {
  return e === "dark" ? {
    main: Nt[200],
    light: Nt[50],
    dark: Nt[400]
  } : {
    main: Nt[700],
    light: Nt[400],
    dark: Nt[800]
  };
}
function i0(e = "light") {
  return e === "dark" ? {
    main: _t[200],
    light: _t[50],
    dark: _t[400]
  } : {
    main: _t[500],
    light: _t[300],
    dark: _t[700]
  };
}
function s0(e = "light") {
  return e === "dark" ? {
    main: Rt[500],
    light: Rt[300],
    dark: Rt[700]
  } : {
    main: Rt[700],
    light: Rt[400],
    dark: Rt[800]
  };
}
function a0(e = "light") {
  return e === "dark" ? {
    main: Bt[400],
    light: Bt[300],
    dark: Bt[700]
  } : {
    main: Bt[700],
    light: Bt[500],
    dark: Bt[900]
  };
}
function c0(e = "light") {
  return e === "dark" ? {
    main: Dt[400],
    light: Dt[300],
    dark: Dt[700]
  } : {
    main: Dt[800],
    light: Dt[500],
    dark: Dt[900]
  };
}
function l0(e = "light") {
  return e === "dark" ? {
    main: fn[400],
    light: fn[300],
    dark: fn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: fn[500],
    dark: fn[900]
  };
}
function Co(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2,
    ...o
  } = e, i = e.primary || o0(t), s = e.secondary || i0(t), a = e.error || s0(t), l = e.info || a0(t), c = e.success || c0(t), p = e.warning || l0(t);
  function g(f) {
    const I = zi(f, Wi.text.primary) >= n ? Wi.text.primary : r0.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const j = zi(f, I);
      j < 3 && console.error([`MUI: The contrast ratio of ${j}:1 for ${I} on ${f}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return I;
  }
  const m = ({
    color: f,
    name: I,
    mainShade: j = 500,
    lightShade: B = 300,
    darkShade: T = 700
  }) => {
    if (f = {
      ...f
    }, !f.main && f[j] && (f.main = f[j]), !f.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${I ? ` (${I})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${j}\` property.` : bt(11, I ? ` (${I})` : "", j));
    if (typeof f.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${I ? ` (${I})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : bt(12, I ? ` (${I})` : "", JSON.stringify(f.main)));
    return Hi(f, "light", B, r), Hi(f, "dark", T, r), f.contrastText || (f.contrastText = g(f.main)), f;
  };
  let x;
  return t === "light" ? x = ta() : t === "dark" && (x = na()), process.env.NODE_ENV !== "production" && (x || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Le({
    // A collection of common colors.
    common: {
      ...Cn
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: m({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: m({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: m({
      color: a,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: m({
      color: p,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: m({
      color: l,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: m({
      color: c,
      name: "success"
    }),
    // The grey colors.
    grey: n0,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: g,
    // Generate a rich color object.
    augmentColor: m,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r,
    // The light and dark mode object.
    ...x
  }, o);
}
function u0(e) {
  const t = {};
  return Object.entries(e).forEach((r) => {
    const [o, i] = r;
    typeof i == "object" && (t[o] = `${i.fontStyle ? `${i.fontStyle} ` : ""}${i.fontVariant ? `${i.fontVariant} ` : ""}${i.fontWeight ? `${i.fontWeight} ` : ""}${i.fontStretch ? `${i.fontStretch} ` : ""}${i.fontSize || ""}${i.lineHeight ? `/${i.lineHeight} ` : ""}${i.fontFamily || ""}`);
  }), t;
}
function d0(e, t) {
  return {
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    },
    ...t
  };
}
function f0(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Vi = {
  textTransform: "uppercase"
}, qi = '"Roboto", "Helvetica", "Arial", sans-serif';
function h0(e, t) {
  const {
    fontFamily: n = qi,
    // The default font size of the Material Specification.
    fontSize: r = 14,
    // px
    fontWeightLight: o = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: s = 500,
    fontWeightBold: a = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: l = 16,
    // Apply the CSS properties to all the variants.
    allVariants: c,
    pxToRem: p,
    ...g
  } = typeof t == "function" ? t(e) : t;
  process.env.NODE_ENV !== "production" && (typeof r != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof l != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const m = r / 14, x = p || ((I) => `${I / l * m}rem`), C = (I, j, B, T, M) => ({
    fontFamily: n,
    fontWeight: I,
    fontSize: x(j),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: B,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...n === qi ? {
      letterSpacing: `${f0(T / j)}em`
    } : {},
    ...M,
    ...c
  }), f = {
    h1: C(o, 96, 1.167, -1.5),
    h2: C(o, 60, 1.2, -0.5),
    h3: C(i, 48, 1.167, 0),
    h4: C(i, 34, 1.235, 0.25),
    h5: C(i, 24, 1.334, 0),
    h6: C(s, 20, 1.6, 0.15),
    subtitle1: C(i, 16, 1.75, 0.15),
    subtitle2: C(s, 14, 1.57, 0.1),
    body1: C(i, 16, 1.5, 0.15),
    body2: C(i, 14, 1.43, 0.15),
    button: C(s, 14, 1.75, 0.4, Vi),
    caption: C(i, 12, 1.66, 0.4),
    overline: C(i, 12, 2.66, 1, Vi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Le({
    htmlFontSize: l,
    pxToRem: x,
    fontFamily: n,
    fontSize: r,
    fontWeightLight: o,
    fontWeightRegular: i,
    fontWeightMedium: s,
    fontWeightBold: a,
    ...f
  }, g, {
    clone: !1
    // No need to clone deep
  });
}
const p0 = 0.2, g0 = 0.14, m0 = 0.12;
function ge(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${p0})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${g0})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${m0})`].join(",");
}
const y0 = ["none", ge(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ge(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ge(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ge(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ge(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ge(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ge(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ge(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ge(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ge(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ge(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ge(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ge(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ge(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ge(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ge(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ge(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ge(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ge(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ge(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ge(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ge(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ge(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ge(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], b0 = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, w0 = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function Gi(e) {
  return `${Math.round(e)}ms`;
}
function x0(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function v0(e) {
  const t = {
    ...b0,
    ...e.easing
  }, n = {
    ...w0,
    ...e.duration
  };
  return {
    getAutoHeightDuration: x0,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: a = t.easeInOut,
        delay: l = 0,
        ...c
      } = i;
      if (process.env.NODE_ENV !== "production") {
        const p = (m) => typeof m == "string", g = (m) => !Number.isNaN(parseFloat(m));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !g(s) && !p(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), p(a) || console.error('MUI: Argument "easing" must be a string.'), !g(l) && !p(l) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(c).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof s == "string" ? s : Gi(s)} ${a} ${typeof l == "string" ? l : Gi(l)}`).join(",");
    },
    ...e,
    easing: t,
    duration: n
  };
}
const C0 = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function S0(e) {
  return ut(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function ra(e = {}) {
  const t = {
    ...e
  };
  function n(r) {
    const o = Object.entries(r);
    for (let i = 0; i < o.length; i++) {
      const [s, a] = o[i];
      !S0(a) || s.startsWith("unstable_") ? delete r[s] : ut(a) && (r[s] = {
        ...a
      }, n(r[s]));
    }
  }
  return n(t), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(t, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function Jr(e = {}, ...t) {
  const {
    breakpoints: n,
    mixins: r = {},
    spacing: o,
    palette: i = {},
    transitions: s = {},
    typography: a = {},
    shape: l,
    ...c
  } = e;
  if (e.vars && // The error should throw only for the root theme creation because user is not allowed to use a custom node `vars`.
  // `generateThemeVars` is the closest identifier for checking that the `options` is a result of `createTheme` with CSS variables so that user can create new theme for nested ThemeProvider.
  e.generateThemeVars === void 0)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name or follow the [docs](https://mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature." : bt(20));
  const p = Co(i), g = Qs(e);
  let m = Le(g, {
    mixins: d0(g.breakpoints, r),
    palette: p,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: y0.slice(),
    typography: h0(p, a),
    transitions: v0(s),
    zIndex: {
      ...C0
    }
  });
  if (m = Le(m, c), m = t.reduce((x, C) => Le(x, C), m), process.env.NODE_ENV !== "production") {
    const x = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], C = (f, I) => {
      let j;
      for (j in f) {
        const B = f[j];
        if (x.includes(j) && Object.keys(B).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const T = bo("", j);
            console.error([`MUI: The \`${I}\` component increases the CSS specificity of the \`${j}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${T}' syntax:`, JSON.stringify({
              root: {
                [`&.${T}`]: B
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[j] = {};
        }
      }
    };
    Object.keys(m.components).forEach((f) => {
      const I = m.components[f].styleOverrides;
      I && f.startsWith("Mui") && C(I, f);
    });
  }
  return m.unstable_sxConfig = {
    ...yr,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, m.unstable_sx = function(C) {
    return Vt({
      sx: C,
      theme: this
    });
  }, m.toRuntimeSource = ra, m;
}
function k0(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const I0 = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const n = k0(t);
  return `linear-gradient(rgba(255 255 255 / ${n}), rgba(255 255 255 / ${n}))`;
});
function oa(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function ia(e) {
  return e === "dark" ? I0 : [];
}
function T0(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: n,
    overlays: r,
    ...o
  } = e, i = Co(t);
  return {
    palette: i,
    opacity: {
      ...oa(i.mode),
      ...n
    },
    overlays: r || ia(i.mode),
    ...o
  };
}
function E0(e) {
  var t;
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!((t = e[1]) != null && t.match(/(mode|contrastThreshold|tonalOffset)/));
}
const j0 = (e) => [...[...Array(25)].map((t, n) => `--${e ? `${e}-` : ""}overlays-${n}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], A0 = (e) => (t, n) => {
  const r = e.rootSelector || ":root", o = e.colorSchemeSelector;
  let i = o;
  if (o === "class" && (i = ".%s"), o === "data" && (i = "[data-%s]"), o != null && o.startsWith("data-") && !o.includes("%s") && (i = `[${o}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const s = {};
      return j0(e.cssVarPrefix).forEach((a) => {
        s[a] = n[a], delete n[a];
      }), i === "media" ? {
        [r]: n,
        "@media (prefers-color-scheme: dark)": {
          [r]: s
        }
      } : i ? {
        [i.replace("%s", t)]: s,
        [`${r}, ${i.replace("%s", t)}`]: n
      } : {
        [r]: {
          ...n,
          ...s
        }
      };
    }
    if (i && i !== "media")
      return `${r}, ${i.replace("%s", String(t))}`;
  } else if (t) {
    if (i === "media")
      return {
        [`@media (prefers-color-scheme: ${String(t)})`]: {
          [r]: n
        }
      };
    if (i)
      return i.replace("%s", String(t));
  }
  return r;
};
function M0(e, t) {
  t.forEach((n) => {
    e[n] || (e[n] = {});
  });
}
function E(e, t, n) {
  !e[t] && n && (e[t] = n);
}
function pn(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : ea(e);
}
function lt(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = hn(pn(e[t]), `MUI: Can't create \`palette.${t}Channel\` because \`palette.${t}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${t}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function P0(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const tt = (e) => {
  try {
    return e();
  } catch {
  }
}, O0 = (e = "mui") => Kf(e);
function Ur(e, t, n, r) {
  if (!t)
    return;
  t = t === !0 ? {} : t;
  const o = r === "dark" ? "dark" : "light";
  if (!n) {
    e[r] = T0({
      ...t,
      palette: {
        mode: o,
        ...t == null ? void 0 : t.palette
      }
    });
    return;
  }
  const {
    palette: i,
    ...s
  } = Jr({
    ...n,
    palette: {
      mode: o,
      ...t == null ? void 0 : t.palette
    }
  });
  return e[r] = {
    ...t,
    palette: i,
    opacity: {
      ...oa(o),
      ...t == null ? void 0 : t.opacity
    },
    overlays: (t == null ? void 0 : t.overlays) || ia(o)
  }, s;
}
function $0(e = {}, ...t) {
  const {
    colorSchemes: n = {
      light: !0
    },
    defaultColorScheme: r,
    disableCssColorScheme: o = !1,
    cssVarPrefix: i = "mui",
    shouldSkipGeneratingVar: s = E0,
    colorSchemeSelector: a = n.light && n.dark ? "media" : void 0,
    rootSelector: l = ":root",
    ...c
  } = e, p = Object.keys(n)[0], g = r || (n.light && p !== "light" ? "light" : p), m = O0(i), {
    [g]: x,
    light: C,
    dark: f,
    ...I
  } = n, j = {
    ...I
  };
  let B = x;
  if ((g === "dark" && !("dark" in n) || g === "light" && !("light" in n)) && (B = !0), !B)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${g}\` option is either missing or invalid.` : bt(21, g));
  const T = Ur(j, B, c, g);
  C && !j.light && Ur(j, C, void 0, "light"), f && !j.dark && Ur(j, f, void 0, "dark");
  let M = {
    defaultColorScheme: g,
    ...T,
    cssVarPrefix: i,
    colorSchemeSelector: a,
    rootSelector: l,
    getCssVar: m,
    colorSchemes: j,
    font: {
      ...u0(T.typography),
      ...T.font
    },
    spacing: P0(c.spacing)
  };
  Object.keys(M.colorSchemes).forEach((X) => {
    const h = M.colorSchemes[X].palette, $ = (H) => {
      const R = H.split("-"), u = R[1], ve = R[2];
      return m(H, h[u][ve]);
    };
    if (h.mode === "light" && (E(h.common, "background", "#fff"), E(h.common, "onBackground", "#000")), h.mode === "dark" && (E(h.common, "background", "#000"), E(h.common, "onBackground", "#fff")), M0(h, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), h.mode === "light") {
      E(h.Alert, "errorColor", fe(h.error.light, 0.6)), E(h.Alert, "infoColor", fe(h.info.light, 0.6)), E(h.Alert, "successColor", fe(h.success.light, 0.6)), E(h.Alert, "warningColor", fe(h.warning.light, 0.6)), E(h.Alert, "errorFilledBg", $("palette-error-main")), E(h.Alert, "infoFilledBg", $("palette-info-main")), E(h.Alert, "successFilledBg", $("palette-success-main")), E(h.Alert, "warningFilledBg", $("palette-warning-main")), E(h.Alert, "errorFilledColor", tt(() => h.getContrastText(h.error.main))), E(h.Alert, "infoFilledColor", tt(() => h.getContrastText(h.info.main))), E(h.Alert, "successFilledColor", tt(() => h.getContrastText(h.success.main))), E(h.Alert, "warningFilledColor", tt(() => h.getContrastText(h.warning.main))), E(h.Alert, "errorStandardBg", he(h.error.light, 0.9)), E(h.Alert, "infoStandardBg", he(h.info.light, 0.9)), E(h.Alert, "successStandardBg", he(h.success.light, 0.9)), E(h.Alert, "warningStandardBg", he(h.warning.light, 0.9)), E(h.Alert, "errorIconColor", $("palette-error-main")), E(h.Alert, "infoIconColor", $("palette-info-main")), E(h.Alert, "successIconColor", $("palette-success-main")), E(h.Alert, "warningIconColor", $("palette-warning-main")), E(h.AppBar, "defaultBg", $("palette-grey-100")), E(h.Avatar, "defaultBg", $("palette-grey-400")), E(h.Button, "inheritContainedBg", $("palette-grey-300")), E(h.Button, "inheritContainedHoverBg", $("palette-grey-A100")), E(h.Chip, "defaultBorder", $("palette-grey-400")), E(h.Chip, "defaultAvatarColor", $("palette-grey-700")), E(h.Chip, "defaultIconColor", $("palette-grey-700")), E(h.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), E(h.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), E(h.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), E(h.LinearProgress, "primaryBg", he(h.primary.main, 0.62)), E(h.LinearProgress, "secondaryBg", he(h.secondary.main, 0.62)), E(h.LinearProgress, "errorBg", he(h.error.main, 0.62)), E(h.LinearProgress, "infoBg", he(h.info.main, 0.62)), E(h.LinearProgress, "successBg", he(h.success.main, 0.62)), E(h.LinearProgress, "warningBg", he(h.warning.main, 0.62)), E(h.Skeleton, "bg", `rgba(${$("palette-text-primaryChannel")} / 0.11)`), E(h.Slider, "primaryTrack", he(h.primary.main, 0.62)), E(h.Slider, "secondaryTrack", he(h.secondary.main, 0.62)), E(h.Slider, "errorTrack", he(h.error.main, 0.62)), E(h.Slider, "infoTrack", he(h.info.main, 0.62)), E(h.Slider, "successTrack", he(h.success.main, 0.62)), E(h.Slider, "warningTrack", he(h.warning.main, 0.62));
      const H = Fn(h.background.default, 0.8);
      E(h.SnackbarContent, "bg", H), E(h.SnackbarContent, "color", tt(() => h.getContrastText(H))), E(h.SpeedDialAction, "fabHoverBg", Fn(h.background.paper, 0.15)), E(h.StepConnector, "border", $("palette-grey-400")), E(h.StepContent, "border", $("palette-grey-400")), E(h.Switch, "defaultColor", $("palette-common-white")), E(h.Switch, "defaultDisabledColor", $("palette-grey-100")), E(h.Switch, "primaryDisabledColor", he(h.primary.main, 0.62)), E(h.Switch, "secondaryDisabledColor", he(h.secondary.main, 0.62)), E(h.Switch, "errorDisabledColor", he(h.error.main, 0.62)), E(h.Switch, "infoDisabledColor", he(h.info.main, 0.62)), E(h.Switch, "successDisabledColor", he(h.success.main, 0.62)), E(h.Switch, "warningDisabledColor", he(h.warning.main, 0.62)), E(h.TableCell, "border", he(Un(h.divider, 1), 0.88)), E(h.Tooltip, "bg", Un(h.grey[700], 0.92));
    }
    if (h.mode === "dark") {
      E(h.Alert, "errorColor", he(h.error.light, 0.6)), E(h.Alert, "infoColor", he(h.info.light, 0.6)), E(h.Alert, "successColor", he(h.success.light, 0.6)), E(h.Alert, "warningColor", he(h.warning.light, 0.6)), E(h.Alert, "errorFilledBg", $("palette-error-dark")), E(h.Alert, "infoFilledBg", $("palette-info-dark")), E(h.Alert, "successFilledBg", $("palette-success-dark")), E(h.Alert, "warningFilledBg", $("palette-warning-dark")), E(h.Alert, "errorFilledColor", tt(() => h.getContrastText(h.error.dark))), E(h.Alert, "infoFilledColor", tt(() => h.getContrastText(h.info.dark))), E(h.Alert, "successFilledColor", tt(() => h.getContrastText(h.success.dark))), E(h.Alert, "warningFilledColor", tt(() => h.getContrastText(h.warning.dark))), E(h.Alert, "errorStandardBg", fe(h.error.light, 0.9)), E(h.Alert, "infoStandardBg", fe(h.info.light, 0.9)), E(h.Alert, "successStandardBg", fe(h.success.light, 0.9)), E(h.Alert, "warningStandardBg", fe(h.warning.light, 0.9)), E(h.Alert, "errorIconColor", $("palette-error-main")), E(h.Alert, "infoIconColor", $("palette-info-main")), E(h.Alert, "successIconColor", $("palette-success-main")), E(h.Alert, "warningIconColor", $("palette-warning-main")), E(h.AppBar, "defaultBg", $("palette-grey-900")), E(h.AppBar, "darkBg", $("palette-background-paper")), E(h.AppBar, "darkColor", $("palette-text-primary")), E(h.Avatar, "defaultBg", $("palette-grey-600")), E(h.Button, "inheritContainedBg", $("palette-grey-800")), E(h.Button, "inheritContainedHoverBg", $("palette-grey-700")), E(h.Chip, "defaultBorder", $("palette-grey-700")), E(h.Chip, "defaultAvatarColor", $("palette-grey-300")), E(h.Chip, "defaultIconColor", $("palette-grey-300")), E(h.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), E(h.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), E(h.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), E(h.LinearProgress, "primaryBg", fe(h.primary.main, 0.5)), E(h.LinearProgress, "secondaryBg", fe(h.secondary.main, 0.5)), E(h.LinearProgress, "errorBg", fe(h.error.main, 0.5)), E(h.LinearProgress, "infoBg", fe(h.info.main, 0.5)), E(h.LinearProgress, "successBg", fe(h.success.main, 0.5)), E(h.LinearProgress, "warningBg", fe(h.warning.main, 0.5)), E(h.Skeleton, "bg", `rgba(${$("palette-text-primaryChannel")} / 0.13)`), E(h.Slider, "primaryTrack", fe(h.primary.main, 0.5)), E(h.Slider, "secondaryTrack", fe(h.secondary.main, 0.5)), E(h.Slider, "errorTrack", fe(h.error.main, 0.5)), E(h.Slider, "infoTrack", fe(h.info.main, 0.5)), E(h.Slider, "successTrack", fe(h.success.main, 0.5)), E(h.Slider, "warningTrack", fe(h.warning.main, 0.5));
      const H = Fn(h.background.default, 0.98);
      E(h.SnackbarContent, "bg", H), E(h.SnackbarContent, "color", tt(() => h.getContrastText(H))), E(h.SpeedDialAction, "fabHoverBg", Fn(h.background.paper, 0.15)), E(h.StepConnector, "border", $("palette-grey-600")), E(h.StepContent, "border", $("palette-grey-600")), E(h.Switch, "defaultColor", $("palette-grey-300")), E(h.Switch, "defaultDisabledColor", $("palette-grey-600")), E(h.Switch, "primaryDisabledColor", fe(h.primary.main, 0.55)), E(h.Switch, "secondaryDisabledColor", fe(h.secondary.main, 0.55)), E(h.Switch, "errorDisabledColor", fe(h.error.main, 0.55)), E(h.Switch, "infoDisabledColor", fe(h.info.main, 0.55)), E(h.Switch, "successDisabledColor", fe(h.success.main, 0.55)), E(h.Switch, "warningDisabledColor", fe(h.warning.main, 0.55)), E(h.TableCell, "border", fe(Un(h.divider, 1), 0.68)), E(h.Tooltip, "bg", Un(h.grey[700], 0.92));
    }
    lt(h.background, "default"), lt(h.background, "paper"), lt(h.common, "background"), lt(h.common, "onBackground"), lt(h, "divider"), Object.keys(h).forEach((H) => {
      const R = h[H];
      H !== "tonalOffset" && R && typeof R == "object" && (R.main && E(h[H], "mainChannel", hn(pn(R.main))), R.light && E(h[H], "lightChannel", hn(pn(R.light))), R.dark && E(h[H], "darkChannel", hn(pn(R.dark))), R.contrastText && E(h[H], "contrastTextChannel", hn(pn(R.contrastText))), H === "text" && (lt(h[H], "primary"), lt(h[H], "secondary")), H === "action" && (R.active && lt(h[H], "active"), R.selected && lt(h[H], "selected")));
    });
  }), M = t.reduce((X, h) => Le(X, h), M);
  const k = {
    prefix: i,
    disableCssColorScheme: o,
    shouldSkipGeneratingVar: s,
    getSelector: A0(M)
  }, {
    vars: _,
    generateThemeVars: D,
    generateStyleSheets: J
  } = e0(M, k);
  return M.vars = _, Object.entries(M.colorSchemes[M.defaultColorScheme]).forEach(([X, h]) => {
    M[X] = h;
  }), M.generateThemeVars = D, M.generateStyleSheets = J, M.generateSpacing = function() {
    return Ys(c.spacing, ho(this));
  }, M.getColorSchemeSelector = t0(a), M.spacing = M.generateSpacing(), M.shouldSkipGeneratingVar = s, M.unstable_sxConfig = {
    ...yr,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, M.unstable_sx = function(h) {
    return Vt({
      sx: h,
      theme: this
    });
  }, M.toRuntimeSource = ra, M;
}
function Yi(e, t, n) {
  e.colorSchemes && n && (e.colorSchemes[t] = {
    ...n !== !0 && n,
    palette: Co({
      ...n === !0 ? {} : n.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function _0(e = {}, ...t) {
  const {
    palette: n,
    cssVariables: r = !1,
    colorSchemes: o = n ? void 0 : {
      light: !0
    },
    defaultColorScheme: i = n == null ? void 0 : n.mode,
    ...s
  } = e, a = i || "light", l = o == null ? void 0 : o[a], c = {
    ...o,
    ...n ? {
      [a]: {
        ...typeof l != "boolean" && l,
        palette: n
      }
    } : void 0
  };
  if (r === !1) {
    if (!("colorSchemes" in e))
      return Jr(e, ...t);
    let p = n;
    "palette" in e || c[a] && (c[a] !== !0 ? p = c[a].palette : a === "dark" && (p = {
      mode: "dark"
    }));
    const g = Jr({
      ...e,
      palette: p
    }, ...t);
    return g.defaultColorScheme = a, g.colorSchemes = c, g.palette.mode === "light" && (g.colorSchemes.light = {
      ...c.light !== !0 && c.light,
      palette: g.palette
    }, Yi(g, "dark", c.dark)), g.palette.mode === "dark" && (g.colorSchemes.dark = {
      ...c.dark !== !0 && c.dark,
      palette: g.palette
    }, Yi(g, "light", c.light)), g;
  }
  return !n && !("light" in c) && a === "light" && (c.light = !0), $0({
    ...s,
    colorSchemes: c,
    defaultColorScheme: a,
    ...typeof r != "boolean" && r
  }, ...t);
}
const R0 = _0(), N0 = "$$material";
function B0(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const D0 = (e) => B0(e) && e !== "classes", L0 = Bf({
  themeId: N0,
  defaultTheme: R0,
  rootShouldForwardProp: D0
}), z0 = Zf;
process.env.NODE_ENV !== "production" && (ne.node, ne.object.isRequired);
function U0(e) {
  return Qf(e);
}
function F0(e) {
  return bo("MuiSvgIcon", e);
}
Of("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const W0 = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Mt(t)}`, `fontSize${Mt(n)}`]
  };
  return Ou(o, F0, r);
}, H0 = L0("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Mt(n.color)}`], t[`fontSize${Mt(n.fontSize)}`]];
  }
})(z0(({
  theme: e
}) => {
  var t, n, r, o, i, s, a, l, c, p, g, m, x, C;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    flexShrink: 0,
    transition: (o = (t = e.transitions) == null ? void 0 : t.create) == null ? void 0 : o.call(t, "fill", {
      duration: (r = (n = (e.vars ?? e).transitions) == null ? void 0 : n.duration) == null ? void 0 : r.shorter
    }),
    variants: [
      {
        props: (f) => !f.hasSvgAsChild,
        style: {
          // the <svg> will define the property that has `currentColor`
          // for example heroicons uses fill="none" and stroke="currentColor"
          fill: "currentColor"
        }
      },
      {
        props: {
          fontSize: "inherit"
        },
        style: {
          fontSize: "inherit"
        }
      },
      {
        props: {
          fontSize: "small"
        },
        style: {
          fontSize: ((s = (i = e.typography) == null ? void 0 : i.pxToRem) == null ? void 0 : s.call(i, 20)) || "1.25rem"
        }
      },
      {
        props: {
          fontSize: "medium"
        },
        style: {
          fontSize: ((l = (a = e.typography) == null ? void 0 : a.pxToRem) == null ? void 0 : l.call(a, 24)) || "1.5rem"
        }
      },
      {
        props: {
          fontSize: "large"
        },
        style: {
          fontSize: ((p = (c = e.typography) == null ? void 0 : c.pxToRem) == null ? void 0 : p.call(c, 35)) || "2.1875rem"
        }
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((e.vars ?? e).palette).filter(([, f]) => f && f.main).map(([f]) => {
        var I, j;
        return {
          props: {
            color: f
          },
          style: {
            color: (j = (I = (e.vars ?? e).palette) == null ? void 0 : I[f]) == null ? void 0 : j.main
          }
        };
      }),
      {
        props: {
          color: "action"
        },
        style: {
          color: (m = (g = (e.vars ?? e).palette) == null ? void 0 : g.action) == null ? void 0 : m.active
        }
      },
      {
        props: {
          color: "disabled"
        },
        style: {
          color: (C = (x = (e.vars ?? e).palette) == null ? void 0 : x.action) == null ? void 0 : C.disabled
        }
      },
      {
        props: {
          color: "inherit"
        },
        style: {
          color: void 0
        }
      }
    ]
  };
})), nr = /* @__PURE__ */ Te.forwardRef(function(t, n) {
  const r = U0({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: a = "svg",
    fontSize: l = "medium",
    htmlColor: c,
    inheritViewBox: p = !1,
    titleAccess: g,
    viewBox: m = "0 0 24 24",
    ...x
  } = r, C = /* @__PURE__ */ Te.isValidElement(o) && o.type === "svg", f = {
    ...r,
    color: s,
    component: a,
    fontSize: l,
    instanceFontSize: t.fontSize,
    inheritViewBox: p,
    viewBox: m,
    hasSvgAsChild: C
  }, I = {};
  p || (I.viewBox = m);
  const j = W0(f);
  return /* @__PURE__ */ d.jsxs(H0, {
    as: a,
    className: Pu(j.root, i),
    focusable: "false",
    color: c,
    "aria-hidden": g ? void 0 : !0,
    role: g ? "img" : void 0,
    ref: n,
    ...I,
    ...x,
    ...C && o.props,
    ownerState: f,
    children: [C ? o.props.children : o, g ? /* @__PURE__ */ d.jsx("title", {
      children: g
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (nr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: ne.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: ne.object,
  /**
   * @ignore
   */
  className: ne.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: ne.oneOfType([ne.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), ne.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: ne.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: ne.oneOfType([ne.oneOf(["inherit", "large", "medium", "small"]), ne.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: ne.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: ne.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: ne.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: ne.oneOfType([ne.arrayOf(ne.oneOfType([ne.func, ne.object, ne.bool])), ne.func, ne.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: ne.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: ne.string
});
nr.muiName = "SvgIcon";
function An(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ d.jsx(nr, {
      "data-testid": process.env.NODE_ENV !== "production" ? `${t}Icon` : void 0,
      ref: o,
      ...r,
      children: e
    });
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = nr.muiName, /* @__PURE__ */ Te.memo(/* @__PURE__ */ Te.forwardRef(n));
}
const Lt = An(/* @__PURE__ */ d.jsx("path", {
  d: "M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.82 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28M3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 14 4.03 17.15 5.65c1.5.77 2.76 1.86 3.75 3.25.16.22.11.54-.12.7s-.54.11-.7-.12c-.9-1.26-2.04-2.25-3.39-2.94-2.87-1.47-6.54-1.47-9.4.01-1.36.7-2.5 1.7-3.4 2.96-.08.14-.23.21-.39.21m6.25 12.07c-.13 0-.26-.05-.35-.15-.87-.87-1.34-1.43-2.01-2.64-.69-1.23-1.05-2.73-1.05-4.34 0-2.97 2.54-5.39 5.66-5.39s5.66 2.42 5.66 5.39c0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-2.42-2.09-4.39-4.66-4.39s-4.66 1.97-4.66 4.39c0 1.44.32 2.77.93 3.85.64 1.15 1.08 1.64 1.85 2.42.19.2.19.51 0 .71-.11.1-.24.15-.37.15m7.17-1.85c-1.19 0-2.24-.3-3.1-.89-1.49-1.01-2.38-2.65-2.38-4.39 0-.28.22-.5.5-.5s.5.22.5.5c0 1.41.72 2.74 1.94 3.56.71.48 1.54.71 2.54.71.24 0 .64-.03 1.04-.1.27-.05.53.13.58.41.05.27-.13.53-.41.58-.57.11-1.07.12-1.21.12M14.91 22c-.04 0-.09-.01-.13-.02-1.59-.44-2.63-1.03-3.72-2.1-1.4-1.39-2.17-3.24-2.17-5.22 0-1.62 1.38-2.94 3.08-2.94s3.08 1.32 3.08 2.94c0 1.07.93 1.94 2.08 1.94s2.08-.87 2.08-1.94c0-3.77-3.25-6.83-7.25-6.83-2.84 0-5.44 1.58-6.61 4.03-.39.81-.59 1.76-.59 2.8 0 .78.07 2.01.67 3.61.1.26-.03.55-.29.64-.26.1-.55-.04-.64-.29-.49-1.31-.73-2.61-.73-3.96 0-1.2.23-2.29.68-3.24 1.33-2.79 4.28-4.6 7.51-4.6 4.55 0 8.25 3.51 8.25 7.83 0 1.62-1.38 2.94-3.08 2.94s-3.08-1.32-3.08-2.94c0-1.07-.93-1.94-2.08-1.94s-2.08.87-2.08 1.94c0 1.71.66 3.31 1.87 4.51.95.94 1.86 1.46 3.27 1.85.27.07.42.35.35.61-.05.23-.26.38-.47.38"
}), "Fingerprint"), V0 = An(/* @__PURE__ */ d.jsx("path", {
  d: "M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1m-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5m4.5-4H7V4h9z"
}), "PhoneIphone"), q0 = An(/* @__PURE__ */ d.jsx("path", {
  d: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
}), "Close"), G0 = An(/* @__PURE__ */ d.jsx("path", {
  d: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"
}), "ArrowBack"), Qi = An(/* @__PURE__ */ d.jsx("path", {
  d: "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"
}), "KeyboardArrowRight"), sa = qa(null), qe = ({ size: e = 16 }) => /* @__PURE__ */ d.jsx(
  "div",
  {
    style: {
      width: e,
      height: e,
      border: "2px solid #f3f3f3",
      borderTop: "2px solid #666",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      display: "inline-block"
    }
  }
), $e = ({
  id: e,
  style: t = {},
  onClick: n,
  onMouseEnter: r,
  onMouseLeave: o,
  disabled: i = !1,
  children: s,
  focusedButton: a,
  setFocusedButton: l,
  hoveredButton: c,
  setHoveredButton: p,
  appConfig: g,
  focusBorderWidth: m = 1,
  hoverBackgroundColor: x,
  defaultBackgroundColor: C,
  ...f
}) => {
  const I = a === e, j = c === e, B = () => {
    p(e), r == null || r();
  }, T = () => {
    p(null), l(null), o == null || o();
  }, M = () => {
    l(e);
  }, k = () => {
    l(null);
  };
  let _ = t.backgroundColor || C;
  j && x && (_ = x);
  const D = I ? `${m}px solid ${(g == null ? void 0 : g.accent) || "#007bff"}` : t.border || `${m}px solid transparent`;
  return /* @__PURE__ */ d.jsx(
    "button",
    {
      style: {
        ...t,
        backgroundColor: _,
        border: D
      },
      onClick: n,
      onMouseEnter: B,
      onMouseLeave: T,
      onMouseDown: M,
      onMouseUp: k,
      disabled: i,
      ...f,
      children: s
    }
  );
};
if (typeof document < "u") {
  const e = document.createElement("style");
  e.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `, document.head.querySelector("style[data-spinner]") || (e.setAttribute("data-spinner", "true"), document.head.appendChild(e));
}
const Wn = ({
  status: e,
  walletName: t,
  connectors: n,
  connectingWallet: r,
  hasLoadingAnimation: o = !1
}) => {
  const i = () => {
    switch (e) {
      case "success":
        return {
          border: "3px solid #4CAF50"
        };
      case "error":
        return {
          border: "3px solid #dc3545"
        };
      case "loading":
        return {
          border: "3px solid #20c997"
        };
      case "signing":
        return {
          border: "3px solid #e3f2fd"
        };
      default:
        return {
          border: "3px solid #e9ecef"
        };
    }
  }, s = {
    position: "relative",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, a = {
    width: 64,
    height: 64,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    ...i()
  }, l = () => {
    var c, p;
    return r && ((c = n.find((g) => g.id === r.id)) != null && c.icon) ? /* @__PURE__ */ d.jsx(
      "img",
      {
        src: (p = n.find((g) => g.id === r.id)) == null ? void 0 : p.icon,
        alt: t,
        style: {
          width: 32,
          height: 32,
          borderRadius: 4
        }
      }
    ) : /* @__PURE__ */ d.jsx("div", { style: {
      fontSize: 24,
      fontWeight: 600,
      color: "#4A90E2",
      width: 32,
      height: 32,
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: t.charAt(0).toUpperCase() });
  };
  return /* @__PURE__ */ d.jsxs("div", { style: s, children: [
    /* @__PURE__ */ d.jsx("div", { style: a, children: l() }),
    o && (e === "signing" || e === "loading") && /* @__PURE__ */ d.jsx("div", { style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 64,
      height: 64,
      border: "3px solid #e3f2fd",
      borderTop: "3px solid #20c997",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    } })
  ] });
}, Y0 = ({
  status: e,
  provider: t,
  hasLoadingAnimation: n = !1
}) => {
  const r = () => {
    switch (e) {
      case "success":
        return {
          border: "3px solid #4CAF50"
        };
      case "error":
        return {
          border: "3px solid #dc3545"
        };
      case "loading":
        return {
          border: "3px solid #20c997"
        };
      default:
        return {
          border: "3px solid #e9ecef"
        };
    }
  }, o = {
    position: "relative",
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, i = {
    width: 88,
    height: 88,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    ...r()
  }, s = () => {
    const a = {
      width: 64,
      height: 64,
      borderRadius: "50%",
      padding: 12,
      backgroundColor: "transparent"
    };
    switch (t) {
      case "google":
        return /* @__PURE__ */ d.jsxs("svg", { style: a, viewBox: "0 0 24 24", fill: "currentColor", children: [
          /* @__PURE__ */ d.jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
          /* @__PURE__ */ d.jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
          /* @__PURE__ */ d.jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
          /* @__PURE__ */ d.jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
        ] });
      case "discord":
        return /* @__PURE__ */ d.jsx("svg", { style: a, viewBox: "0 0 24 24", fill: "#5865F2", children: /* @__PURE__ */ d.jsx("path", { d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a .077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" }) });
      case "x":
        return /* @__PURE__ */ d.jsx("svg", { style: a, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ d.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) });
      default:
        return /* @__PURE__ */ d.jsx("div", { style: {
          fontSize: 32,
          fontWeight: 600,
          color: "#4A90E2",
          width: 64,
          height: 64,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }, children: "?" });
    }
  };
  return /* @__PURE__ */ d.jsxs("div", { style: o, children: [
    /* @__PURE__ */ d.jsx("div", { style: i, children: s() }),
    n && e === "loading" && /* @__PURE__ */ d.jsx("div", { style: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 88,
      height: 88,
      border: "3px solid #e3f2fd",
      borderTop: "3px solid #20c997",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    } })
  ] });
}, Q0 = ({ appId: e, children: t }) => {
  var Lo, zo, Uo, Fo, Wo, Ho, Vo, qo, Go, Yo, Qo, Zo;
  const n = "https://auth.pr0d.io", [r, o] = K(null), [i, s] = K(null), [a, l] = K(null), [c, p] = K({ show: !1 }), [g, m] = K(null), [x, C] = K(null), [f, I] = K(null), [j, B] = K(!1), [T, M] = K(""), [k, _] = K(["", "", "", "", "", ""]), D = _n([]), [J, X] = K("email"), [h, $] = K(!1), [H, R] = K(null), [u, ve] = K(null), de = _n(null), { address: pe, isConnected: Ce } = Ka(), { connect: it, connectors: w } = Ja();
  w[0].id = "custom-binance", w[0].name = "Binance Wallet", w[0].icon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjU2IiBoZWlnaHQ9IjI1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsPSIjMUUxRTFFIiBkPSJNMCAwaDI1NnYyNTZIMHoiLz48cGF0aCBkPSJtNzMuMTgzMyAxMjguMDI4LTIyLjU2MzIgMjIuNTY0TDI4IDEyOC4wMjhsMjIuNTYzMi0yMi41NjMgMjIuNjIwMSAyMi41NjNabTU0Ljg0NDctNTQuODQ0NyAzOC43MDUgMzguNzA1NyAyMi41NjMtMjIuNTYyOEwxMjguMDI4IDI4IDY2LjcwNDIgODkuMzI0MmwyMi41NjMyIDIyLjU2MjggMzguNzYwNi0zOC43MDM3Wm03Ny40MDkgMzIuMjgxNy0yMi41NjMgMjIuNTYzIDIyLjU2MyAyMi41NjRMMjI4IDEyOC4wMjhsLTIyLjU2My0yMi41NjNabS03Ny40MDkgNzcuNDA5LTM4LjcwMzgtMzguNzA1LTIyLjU2MzIgMjIuNTY0IDYxLjI2NyA2MS4zMjQgNjEuMjY4LTYxLjMyNC0yMi41NjMtMjIuNTY0LTM4LjcwNSAzOC43MDVabTAtMzIuMjgyIDIyLjU2NC0yMi41NjQtMjIuNTY0LTIyLjU2My0yMi42MiAyMi41NjMgMjIuNjIgMjIuNTY0WiIgZmlsbD0iI0YwQjkwQiIvPjwvc3ZnPg==", w[0].requireQRcode = !0, w[1].id = "custom-trust", w[1].name = "Trust Wallet", w[1].icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI4IDI4Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMCAwaDI4djI4SDB6Ii8+PHBhdGggZmlsbD0iIzA1MDBGRiIgZD0iTTYgNy41ODMgMTMuNTMgNXYxNy44ODJDOC4xNSAyMC40OTggNiAxNS45MjggNiAxMy4zNDVWNy41ODNaIi8+PHBhdGggZmlsbD0idXJsKCNhKSIgZD0iTTIyIDcuNTgzIDEzLjUzIDV2MTcuODgyYzYuMDUtMi4zODQgOC40Ny02Ljk1NCA4LjQ3LTkuNTM3VjcuNTgzWiIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjE5Ljc2OCIgeDI9IjE0LjA3MiIgeTE9IjMuNzUzIiB5Mj0iMjIuODUzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIuMDIiIHN0b3AtY29sb3I9IiMwMEYiLz48c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzAwOTRGRiIvPjxzdG9wIG9mZnNldD0iLjE2IiBzdG9wLWNvbG9yPSIjNDhGRjkxIi8+PHN0b3Agb2Zmc2V0PSIuNDIiIHN0b3AtY29sb3I9IiMwMDk0RkYiLz48c3RvcCBvZmZzZXQ9Ii42OCIgc3RvcC1jb2xvcj0iIzAwMzhGRiIvPjxzdG9wIG9mZnNldD0iLjkiIHN0b3AtY29sb3I9IiMwNTAwRkYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4K", w[1].requireQRcode = !0, w[2].id = "custom-walletconnect", w[2].name = "WalletConnect", w[2].icon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjM0I5OUZDIi8+CjxwYXRoIGQ9Ik04LjM4OTY5IDEwLjM3MzlDMTEuNDg4MiA3LjI3NTM4IDE2LjUxMTggNy4yNzUzOCAxOS42MTAzIDEwLjM3MzlMMTkuOTgzMiAxMC43NDY4QzIwLjEzODIgMTAuOTAxNyAyMC4xMzgyIDExLjE1MjkgMTkuOTgzMiAxMS4zMDc4TDE4LjcwNzYgMTIuNTgzNUMxOC42MzAxIDEyLjY2MDkgMTguNTA0NSAxMi42NjA5IDE4LjQyNzEgMTIuNTgzNUwxNy45MTM5IDEyLjA3MDNDMTUuNzUyMyA5LjkwODcgMTIuMjQ3NyA5LjkwODcgMTAuMDg2MSAxMi4wNzAzTDkuNTM2NTUgMTIuNjE5OEM5LjQ1OTA5IDEyLjY5NzMgOS4zMzM1IDEyLjY5NzMgOS4yNTYwNCAxMi42MTk4TDcuOTgwMzkgMTEuMzQ0MkM3LjgyNTQ3IDExLjE4OTMgNy44MjU0NyAxMC45MzgxIDcuOTgwMzkgMTAuNzgzMkw4LjM4OTY5IDEwLjM3MzlaTTIyLjI0ODUgMTMuMDEyTDIzLjM4MzggMTQuMTQ3NEMyMy41Mzg3IDE0LjMwMjMgMjMuNTM4NyAxNC41NTM1IDIzLjM4MzggMTQuNzA4NEwxOC4yNjQ1IDE5LjgyNzdDMTguMTA5NiAxOS45ODI3IDE3Ljg1ODQgMTkuOTgyNyAxNy43MDM1IDE5LjgyNzdDMTcuNzAzNSAxOS44Mjc3IDE3LjcwMzUgMTkuODI3NyAxNy43MDM1IDE5LjgyNzdMMTQuMDcwMiAxNi4xOTQ0QzE0LjAzMTQgMTYuMTU1NyAxMy45Njg2IDE2LjE1NTcgMTMuOTI5OSAxNi4xOTQ0QzEzLjkyOTkgMTYuMTk0NCAxMy45Mjk5IDE2LjE5NDQgMTMuOTI5OSAxNi4xOTQ0TDEwLjI5NjYgMTkuODI3N0MxMC4xNDE3IDE5Ljk4MjcgOS44OTA1MyAxOS45ODI3IDkuNzM1NjEgMTkuODI3OEM5LjczNTYgMTkuODI3OCA5LjczNTYgMTkuODI3NyA5LjczNTYgMTkuODI3N0w0LjYxNjE5IDE0LjcwODNDNC40NjEyNyAxNC41NTM0IDQuNDYxMjcgMTQuMzAyMiA0LjYxNjE5IDE0LjE0NzNMNS43NTE1MiAxMy4wMTJDNS45MDY0NSAxMi44NTcgNi4xNTc2MyAxMi44NTcgNi4zMTI1NSAxMy4wMTJMOS45NDU5NSAxNi42NDU0QzkuOTg0NjggMTYuNjg0MSAxMC4wNDc1IDE2LjY4NDEgMTAuMDg2MiAxNi42NDU0QzEwLjA4NjIgMTYuNjQ1NCAxMC4wODYyIDE2LjY0NTQgMTAuMDg2MiAxNi42NDU0TDEzLjcxOTQgMTMuMDEyQzEzLjg3NDMgMTIuODU3IDE0LjEyNTUgMTIuODU3IDE0LjI4MDUgMTMuMDEyQzE0LjI4MDUgMTMuMDEyIDE0LjI4MDUgMTMuMDEyIDE0LjI4MDUgMTMuMDEyTDE3LjkxMzkgMTYuNjQ1NEMxNy45NTI2IDE2LjY4NDEgMTguMDE1NCAxNi42ODQxIDE4LjA1NDEgMTYuNjQ1NEwyMS42ODc0IDEzLjAxMkMyMS44NDI0IDEyLjg1NzEgMjIuMDkzNiAxMi44NTcxIDIyLjI0ODUgMTMuMDEyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==", w[2].requireQRcode = !0, w[3].icon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjMkM1RkY2Ii8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTQgMjMuOEMxOS40MTI0IDIzLjggMjMuOCAxOS40MTI0IDIzLjggMTRDMjMuOCA4LjU4NzYxIDE5LjQxMjQgNC4yIDE0IDQuMkM4LjU4NzYxIDQuMiA0LjIgOC41ODc2MSA0LjIgMTRDNC4yIDE5LjQxMjQgOC41ODc2MSAyMy44IDE0IDIzLjhaTTExLjU1IDEwLjhDMTEuMTM1OCAxMC44IDEwLjggMTEuMTM1OCAxMC44IDExLjU1VjE2LjQ1QzEwLjggMTYuODY0MiAxMS4xMzU4IDE3LjIgMTEuNTUgMTcuMkgxNi40NUMxNi44NjQyIDE3LjIgMTcuMiAxNi44NjQyIDE3LjIgMTYuNDVWMTEuNTVDMTcuMiAxMS4xMzU4IDE2Ljg2NDIgMTAuOCAxNi40NSAxMC44SDExLjU1WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==";
  const { disconnect: P } = Xa(), { signMessage: L } = ec(), { signTypedData: F } = tc(), [z, q] = K(null), W = (y) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(y), [Y, U] = K(["", "", "", "", "", ""]), G = _n([]), [V, ce] = K("method"), [N, Re] = K(null), [Ue, Zt] = K(null), [ca, Kt] = K(!1), [la, Jt] = K(!1), [eh, ua] = K(null), [Pt, Cr] = K(!1), [Sr, kr] = K(!1), [th, Ne] = K(!1), [re, Qe] = K(null), [nh, Ee] = K(null), [Ke, Je] = K(null), [Fe, ft] = K(null), Ze = _n(!1), [Xt, Ot] = K(!1), [rh, Ir] = K(!1), [en, Ct] = K(!1), [tn, Mn] = K(!1), [oh, Pn] = K(!1), [nn, Xe] = K(null), [da, So] = K(!1), [ih, ko] = K(null), [sh, fa] = K(c), [Ae, Me] = K(null), [Pe, Oe] = K(null), S = Zi.useMemo(() => J0(u), [u]), We = (y) => {
    da || (So(!0), ko(y), p(y), fa(y), So(!1), ko(null));
  };
  at(() => {
    D.current = D.current.slice(0, 6);
  }, []), at(() => {
    G.current = G.current.slice(0, 6);
  }, []), at(() => {
    (() => {
      window.PublicKeyCredential && typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable == "function" ? window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then((b) => Cr(b)).catch(() => Cr(!1)) : Cr(!1);
    })();
  }, []), at(() => {
    try {
      const b = localStorage.getItem("pr0d:access_token");
      if (b) {
        const v = oc(b);
        !v.exp || v.exp < Date.now() / 1e3 ? (localStorage.removeItem("pr0d:access_token"), o(null), l(null), ha()) : (o(b), He(b));
      }
    } catch (b) {
      console.error("Failed to decode token:", b);
    }
    (async () => {
      try {
        const b = await Se.get(`${n}/api/apps/${e}`, {
          headers: { "pr0d-app-id": e }
        });
        ve(b.data.data);
      } catch (b) {
        console.error("Failed to fetch app configuration:", b);
      }
    })();
  }, [e]), at(() => {
    const y = new URLSearchParams(window.location.search), b = y.get("status") === "success", v = y.get("code");
    y.get("token");
    const A = y.get("error"), O = y.get("pr0d_oauth_code"), Z = y.get("pr0d_oauth_state"), ee = y.get("pr0d_oauth_provider");
    if (O && Z && ee) {
      window.history.replaceState({}, document.title, window.location.pathname), O === "error" ? (m({ provider: ee, state: Z, errorMessage: A }), p({ show: !0, view: "oauth-error" })) : (C({ provider: ee }), p({ show: !0, view: "oauth-loading" }), ma(O, ee));
      return;
    }
    b && v ? ga(v) : !b && A && R(A);
  }, []);
  const $t = (y, b, v = !1) => {
    y && (localStorage.setItem("pr0d:access_token", y), o(y), v && He(y)), b && (localStorage.setItem("pr0d:refresh_token", b), s(b));
  }, ha = async () => {
    const y = localStorage.getItem("pr0d:refresh_token");
    if (y) {
      const b = await Se.post(`${n}/api/sessions/refresh`, { refresh_token: y }, { headers: { "pr0d-app-id": e } });
      $t(b.data.data.access_token, b.data.data.refresh_token, !1);
    }
  }, Io = async () => {
    var y, b;
    if (!T) {
      R("Email is required");
      return;
    }
    if (!W(T)) {
      R("Please enter a valid email address");
      return;
    }
    $(!0), R(null);
    try {
      const v = await Se.post(
        `${n}/api/email/init`,
        { email: T },
        { headers: { "pr0d-app-id": e } }
      );
      X("code"), setTimeout(() => {
        D.current[0] && D.current[0].focus();
      }, 100);
    } catch (v) {
      R(((b = (y = v.response) == null ? void 0 : y.data) == null ? void 0 : b.message) || "Failed to send verification code");
    } finally {
      $(!1);
    }
  }, To = (y, b) => {
    var v;
    if (/^[0-9]?$/.test(b)) {
      H && R(null);
      const A = [...k];
      A[y] = b, _(A), b && y < 5 && ((v = D.current[y + 1]) == null || v.focus()), b && y === 5 && A.every((O) => O) && (c.view === "link" ? $o(A.join("")) : Ao(A.join("")));
    }
  }, Eo = (y, b) => {
    var v, A, O;
    b.key === "Backspace" ? !k[y] && y > 0 && ((v = D.current[y - 1]) == null || v.focus()) : b.key === "ArrowLeft" && y > 0 ? (A = D.current[y - 1]) == null || A.focus() : b.key === "ArrowRight" && y < 5 && ((O = D.current[y + 1]) == null || O.focus());
  }, jo = (y) => {
    y.preventDefault();
    const b = y.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(b)) {
      const v = b.split("");
      _(v), setTimeout(() => {
        c.view === "link" ? $o(b) : Ao(b);
      }, 100);
    }
  }, Ao = async (y) => {
    var v, A;
    const b = y || k.join("");
    if (!b || b.length !== 6) {
      R("Please enter a valid 6-digit code");
      return;
    }
    $(!0), R(null);
    try {
      const O = await Se.post(
        `${n}/api/email/auth`,
        { email: T, code: b },
        { headers: { "pr0d-app-id": e } }
      );
      $t(O.data.data.access_token, O.data.data.refresh_token, !0), p({ show: !1 }), X("email"), _(["", "", "", "", "", ""]);
    } catch (O) {
      R(((A = (v = O.response) == null ? void 0 : v.data) == null ? void 0 : A.message) || "Invalid verification code");
    } finally {
      $(!1);
    }
  }, pa = async () => {
    const y = localStorage.getItem("pr0d:refresh_token");
    if (y)
      try {
        const b = await Se.delete(`${n}/api/sessions/revoke`, {
          headers: { "pr0d-app-id": e },
          data: { refresh_token: y }
        });
      } catch (b) {
        console.error("Failed to revoke session:", b);
      }
    localStorage.removeItem("pr0d:access_token"), localStorage.removeItem("pr0d:refresh_token"), o(null), s(null), l(null);
  }, ga = async (y) => {
    var b, v;
    try {
      const A = await Se.get(`${n}/api/oauth/exchange`, {
        headers: { "pr0d-app-id": e },
        params: { code: y }
      });
      $t(A.data.data.access_token, A.data.data.refresh_token, !0), p({ show: !1 }), X("email"), _(["", "", "", "", "", ""]), window.history.replaceState({}, document.title, window.location.pathname);
    } catch (A) {
      R(((v = (b = A.response) == null ? void 0 : b.data) == null ? void 0 : v.message) || "Failed to exchange code for token");
    }
  }, ma = async (y, b) => {
    var v, A, O, Z;
    try {
      const ee = await Se.get(`${n}/api/oauth/exchange`, {
        headers: { "pr0d-app-id": e },
        params: { code: y }
      });
      $t(ee.data.data.access_token, ee.data.data.refresh_token, !0), C(null), p({ show: !1 }), X("email"), _(["", "", "", "", "", ""]);
    } catch (ee) {
      C(null), m({ provider: b, state: "exchange_failed", errorMessage: ((A = (v = ee.response) == null ? void 0 : v.data) == null ? void 0 : A.message) || "Failed to verify connection" }), p({ show: !0, view: "oauth-error" }), R(((Z = (O = ee.response) == null ? void 0 : O.data) == null ? void 0 : Z.message) || "Failed to verify connection");
    }
  }, Mo = async () => {
    var y, b;
    if (!r)
      throw new Error("User must be authenticated to set up MFA");
    try {
      const v = await Se.post(
        `${n}/api/mfa/init`,
        {},
        {
          headers: {
            "pr0d-app-id": e,
            Authorization: `Bearer ${r}`
          }
        }
      );
      return He(), v.data.data;
    } catch (v) {
      throw new Error(((b = (y = v.response) == null ? void 0 : y.data) == null ? void 0 : b.message) || "Failed to setup MFA");
    }
  }, Po = async (y) => {
    var b, v;
    if (!r)
      throw new Error("User must be authenticated to verify MFA");
    try {
      const A = await Se.post(
        `${n}/api/mfa/link`,
        { code: y },
        {
          headers: {
            "pr0d-app-id": e,
            Authorization: `Bearer ${r}`
          }
        }
      );
      return He(), !0;
    } catch (A) {
      throw new Error(((v = (b = A.response) == null ? void 0 : b.data) == null ? void 0 : v.message) || "Failed to verify MFA code");
    }
  }, ya = async () => {
    var y, b;
    if (!r)
      throw new Error("User must be authenticated to delete MFA");
    try {
      const v = await Se.delete(
        `${n}/api/mfa/delete`,
        {
          headers: {
            "pr0d-app-id": e,
            Authorization: `Bearer ${r}`
          }
        }
      );
      He();
    } catch (v) {
      throw new Error(((b = (y = v.response) == null ? void 0 : y.data) == null ? void 0 : b.message) || "Failed to delete MFA");
    }
  }, On = () => {
    if (!r) return null;
    try {
      return JSON.parse(atob(r.split(".")[1]));
    } catch {
      return null;
    }
  }, $n = async (y) => {
    var b, v;
    C({ provider: y }), p({ show: !0, view: "oauth-loading" }), $(!0), R(null);
    try {
      const O = (await Se.get(`${n}/api/${y}/init`, {
        headers: { "pr0d-app-id": e },
        params: { redirect_uri: window.location.href }
      })).data.data;
      window.location.href = O;
    } catch (A) {
      C(null), p({ show: !1 }), R(((v = (b = A.response) == null ? void 0 : b.data) == null ? void 0 : v.message) || `Failed to initiate login with ${y}`);
    } finally {
      $(!1);
    }
  }, St = () => {
    M(""), X("email"), _(["", "", "", "", "", ""]), R(null);
  }, ba = () => {
    St(), p({ show: !0, view: "loginorsignup" });
  }, wa = () => {
    St(), p({ show: !0, view: "mfa" });
  }, xa = () => {
    St(), p({ show: !0, view: "link" });
  }, va = () => {
    St(), p({ show: !0, view: "provider" });
  }, Ca = () => {
    Ce && P(), St(), Ee(null), Qe(null), Ne(!1), q(null), Ot(!1), Ir(!1), Ct(!0), Mn(!0), We({ show: !0, view: "wallet" });
  }, Sa = () => {
    St(), p({ show: !0, view: "mfa" }), ce("passkey"), Do();
  }, ka = async () => {
    Ce && (P(), await new Promise((y) => setTimeout(y, 200))), St(), Ee(null), Qe(null), Ne(!1), q(null), Ot(!1), Ir(!1), Ct(!1), We({ show: !0, view: "wallet" });
  }, Ia = async (y) => {
    if ($(!1), R(null), Ee(null), Ne(!0), Ct(!0), console.log("User clicked wallet option:", y.name), de.current && (de.current.innerHTML = ""), Je(null), Ze.current = !1, Fe && (clearTimeout(Fe), ft(null)), Qe({ name: y.name, id: y.id }), Ce && (P(), await new Promise((v) => setTimeout(v, 100))), !!y.requireQRcode) {
      console.log("Setting up WalletConnect-based wallet:", y.name), We({ show: !0, view: "wallet-connecting" }), (async () => {
        try {
          console.log("Setting up WalletConnect...");
          const O = await y.getProvider();
          if (console.log("WalletConnect provider:", O), O) {
            const Z = ["display_uri", "qr_code_modal", "uri", "connect_uri"];
            Z.forEach((ee) => {
              var on;
              (on = O.on) == null || on.call(O, ee, (Ve) => {
                console.log(`WalletConnect event ${ee}:`, Ve), typeof Ve == "string" && Ve.startsWith("wc:") ? (Je(Ve), Ze.current = !0, Fe && (clearTimeout(Fe), ft(null))) : Ve != null && Ve.uri && typeof Ve.uri == "string" && (Je(Ve.uri), Ze.current = !0, Fe && (clearTimeout(Fe), ft(null)));
              });
            }), O.connector && Z.forEach((ee) => {
              var on, Ve;
              (Ve = (on = O.connector).on) == null || Ve.call(on, ee, (st) => {
                console.log(`WalletConnect connector event ${ee}:`, st), typeof st == "string" && st.startsWith("wc:") ? (Je(st), Ze.current = !0, Fe && (clearTimeout(Fe), ft(null))) : st != null && st.uri && typeof st.uri == "string" && (Je(st.uri), Ze.current = !0, Fe && (clearTimeout(Fe), ft(null)));
              });
            });
          }
        } catch (O) {
          console.error("Failed to setup WalletConnect provider:", O);
        }
      })(), it(
        { connector: y },
        {
          onError: (O) => {
            console.error("WalletConnect error:", O), Ee("Failed to connect with WalletConnect"), Ne(!1), Je(null), Ct(!1), We({ show: !0, view: "wallet-error" });
          }
        }
      );
      const A = setTimeout(async () => {
        var O, Z;
        if (console.log("Fallback timeout fired, URI received:", Ze.current), Ze.current)
          console.log("URI already exists, skipping fallback");
        else
          try {
            const ee = await y.getProvider();
            console.log("Fallback: Checking provider for URI...", ee), (O = ee == null ? void 0 : ee.connector) != null && O.uri ? (console.log("Found URI in provider.connector.uri:", ee.connector.uri), Je(ee.connector.uri), Ze.current = !0) : ee != null && ee.uri ? (console.log("Found URI in provider.uri:", ee.uri), Je(ee.uri), Ze.current = !0) : (Z = ee == null ? void 0 : ee.session) != null && Z.uri ? (console.log("Found URI in provider.session.uri:", ee.session.uri), Je(ee.session.uri), Ze.current = !0) : (console.log("No URI found after timeout, showing loading message"), Ee("Unable to generate QR code. Please try again."), p({ show: !0, view: "wallet-error" }));
          } catch (ee) {
            console.error("Fallback URI check failed:", ee), Ee("Failed to initialize wallet connection. Please try again."), p({ show: !0, view: "wallet-error" });
          }
        ft(null);
      }, 5e4);
      ft(A);
      return;
    }
    p({ show: !0, view: "wallet-connecting" }), console.log("Setting up injected wallet:", y.name), it(
      { connector: y },
      {
        onError: (v) => {
          console.error("Connection error:", v);
          let A = "Failed to connect wallet";
          const O = v.message || v.toString();
          O.includes("rejected") || O.includes("denied") || O.includes("User rejected") || O.includes("user rejected") || O.includes("User denied") || O.includes("cancelled") || O.includes("canceled") || v.code && (v.code === 4001 || v.code === "ACTION_REJECTED") ? A = "You rejected the request" : (O.includes("install") || O.includes("not found")) && (A = `${y.name} not found. Please install the extension.`), Ee(A), Ne(!1), Ct(!1), p({ show: !0, view: "wallet-error" });
        }
      }
    );
  }, Ta = async (y) => {
    var b, v;
    try {
      const A = { "pr0d-app-id": e };
      r && (A.Authorization = `Bearer ${r}`);
      const O = await Se.post(`${n}/api/wallet/init`, {
        address: y,
        uri: window.location.origin,
        version: "1",
        chainId: 1
        // You might want to get this dynamically
      }, {
        headers: A
      });
      return {
        nonce: O.data.data.nonce,
        message: O.data.data.message
      };
    } catch (A) {
      throw new Error(((v = (b = A.response) == null ? void 0 : b.data) == null ? void 0 : v.message) || "Failed to initialize wallet authentication");
    }
  }, Ea = async (y, b) => {
    var v, A, O;
    try {
      console.log("Authenticating with:", { signature: y, nonce: b });
      const Z = await Se.post(`${n}/api/wallet/auth`, {
        signature: y,
        nonce: b
      }, {
        headers: { "pr0d-app-id": e }
      });
      return $t(Z.data.data.access_token, Z.data.data.refresh_token, !0), kt(), Ot(!0), !0;
    } catch (Z) {
      throw console.error("Authentication API error:", ((v = Z.response) == null ? void 0 : v.data) || Z.message), new Error(((O = (A = Z.response) == null ? void 0 : A.data) == null ? void 0 : O.message) || "Failed to authenticate wallet");
    }
  }, ja = async () => {
    if (console.log("handleWalletSignature called, walletAuthData:", z), !z) {
      console.log("No walletAuthData, exiting handleWalletSignature");
      return;
    }
    console.log("Setting loading to true and showing wallet-signing popup"), $(!0), R(null), p({ show: !0, view: "wallet-signing" }), console.log("Popup set to wallet-signing view");
    try {
      const y = z.message, b = `${y.domain} wants you to sign in with your Ethereum account:
${y.address}

${y.statement}

URI: ${y.uri}
Version: ${y.version}
Chain ID: ${y.chainId}
Nonce: ${y.nonce}
Issued At: ${y.issuedAt}`;
      console.log("Signing ERC-4361 message:", b), L(
        { message: b },
        {
          onSuccess: async (v) => {
            try {
              console.log("Signature received:", v), tn ? (await No(v, z.nonce), kt(), Mn(!1), Ot(!0)) : await Ea(v, z.nonce);
            } catch (A) {
              console.error("Wallet operation error:", A), R(A.message), p({ show: !0, view: "wallet-error" });
            }
          },
          onError: (v) => {
            var O, Z;
            console.error("Signature error:", v);
            let A = "Failed to sign message";
            ((O = v.message) != null && O.includes("rejected") || (Z = v.message) != null && Z.includes("denied")) && (A = "Signature rejected by user"), Ee(A), p({ show: !0, view: "wallet-error" });
          }
        }
      );
    } catch (y) {
      console.error("Signature setup error:", y), R(y.message || "Failed to sign message"), p({ show: !0, view: "wallet-error" });
    } finally {
      $(!1);
    }
  };
  at(() => {
    console.log("Wallet connection useEffect triggered:", {
      isConnected: Ce,
      address: pe,
      userInitiatedWalletAuth: en,
      walletAuthCompleted: Xt
    }), Ce && pe && en && !Xt && (console.log("All conditions met, starting authentication flow"), Pn(!0), p({ show: !0, view: "wallet-success" }), (async () => {
      try {
        await new Promise((v) => setTimeout(v, 1e3)), console.log("Initializing wallet auth for address:", pe);
        const b = await Ta(pe);
        q({
          ...b,
          connector: re || { name: "Wallet" }
        }), Ne(!1), Pn(!1);
      } catch (b) {
        console.error("Wallet auth initialization error:", b), Ee(b.message), p({ show: !0, view: "wallet-error" }), Ne(!1), Pn(!1);
      }
    })());
  }, [Ce, pe, en, Xt]), at(() => {
    z && en && !Xt && (console.log("walletAuthData set, triggering signature:", z), ja());
  }, [z, en, Xt]);
  const Oo = async () => {
    if (!T) {
      R("Email is required");
      return;
    }
    if (!W(T)) {
      R("Please enter a valid email address");
      return;
    }
    $(!0), R(null);
    try {
      await _o(T), X("code"), setTimeout(() => {
        D.current[0] && D.current[0].focus();
      }, 100);
    } catch (y) {
      R(y.message || "Failed to send verification code");
    } finally {
      $(!1);
    }
  }, $o = async (y) => {
    const b = y || k.join("");
    if (!b || b.length !== 6) {
      R("Please enter a valid 6-digit code");
      return;
    }
    $(!0), R(null);
    try {
      await Ro(T, b), p({ show: !1 }), X("email"), _(["", "", "", "", "", ""]), M("");
    } catch (v) {
      R(v.message || "Failed to link email");
    } finally {
      $(!1);
    }
  }, Aa = async () => {
    $(!0), R(null);
    try {
      const { secret: y, qrCodeUrl: b } = await Mo();
      Re(b), Zt(y), ce("qr");
    } catch {
      R("Failed to load MFA setup.");
    } finally {
      $(!1);
    }
  };
  at(() => {
    if (de.current) {
      let y = "", b = !1, v = null;
      if (V === "qr" && (Ue || N))
        y = Ma() || "";
      else if (Ke && (y = Ke, b = !0, re)) {
        const A = w.find((O) => O.id === re.id);
        A && A.icon && (v = A.icon);
      }
      if (y) {
        let A;
        b && v ? A = v : b || (A = "data:image/svg+xml;base64," + btoa(`
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="12" fill="white"/>
                            <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" fill="#666"/>
                            <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    `));
        const O = new Ga({
          width: 200,
          height: 200,
          type: "svg",
          data: y,
          image: A,
          dotsOptions: {
            color: "#000000",
            type: "dots"
          },
          cornersSquareOptions: {
            color: "#000000",
            type: "extra-rounded"
          },
          cornersDotOptions: {
            color: "#000000",
            type: "dot"
          },
          backgroundOptions: {
            color: "#ffffff"
          },
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 2,
            imageSize: b && v ? 0.2 : b ? 0 : 0.15
          }
        });
        de.current.innerHTML = "", O.append(de.current);
      }
    }
  }, [V, Ue, N, Ke, re, w]), at(() => {
    V === "code" && G.current[0] && setTimeout(() => {
      var y;
      (y = G.current[0]) == null || y.focus();
    }, 100);
  }, [V]);
  const Ma = () => {
    var y;
    if (N && N.includes("otpauth://")) {
      const b = N.match(/otpauth:\/\/[^&\s]+/);
      if (b) return decodeURIComponent(b[0]);
    }
    if (Ue) {
      const b = On(), v = ((y = b == null ? void 0 : b.email) == null ? void 0 : y.email) || "user", A = (u == null ? void 0 : u.name) || "pr0d.io";
      return `otpauth://totp/${encodeURIComponent(A)}:${encodeURIComponent(v)}?secret=${Ue}&issuer=${encodeURIComponent(A)}`;
    }
    return N;
  }, Pa = (y, b) => {
    var v, A;
    if (/^[0-9]?$/.test(b)) {
      const O = [...Y];
      O[y] = b, U(O), b && y < 5 && ((v = G.current[y + 1]) == null || v.focus()), !b && y > 0 && ((A = G.current[y - 1]) == null || A.focus()), O.every((Z) => Z) && Oa(O.join(""));
    }
  }, Oa = async (y) => {
    $(!0), R(null);
    try {
      await Po(y) ? (p({ show: !1 }), ce("qr"), U(["", "", "", "", "", ""])) : R("Invalid MFA code.");
    } catch {
      R("Failed to verify MFA code.");
    } finally {
      $(!1);
    }
  }, $a = async () => {
    if (Ue)
      try {
        await navigator.clipboard.writeText(Ue), Kt(!0), setTimeout(() => Kt(!1), 2e3);
      } catch {
        const b = document.createElement("textarea");
        b.value = Ue, document.body.appendChild(b), b.select(), document.execCommand("copy"), document.body.removeChild(b), Kt(!0), setTimeout(() => Kt(!1), 2e3);
      }
  }, _a = async () => {
    if (Ke)
      try {
        await navigator.clipboard.writeText(Ke), Jt(!0), setTimeout(() => Jt(!1), 2e3);
      } catch {
        const b = document.createElement("textarea");
        b.value = Ke, document.body.appendChild(b), b.select(), document.execCommand("copy"), document.body.removeChild(b), Jt(!0), setTimeout(() => Jt(!1), 2e3);
      }
  }, kt = () => {
    B(!0), setTimeout(() => {
      p({ show: !1 }), ce("method"), U(["", "", "", "", "", ""]), Re(null), Zt(null), Kt(!1), Jt(!1), R(null), X("email"), M(""), _(["", "", "", "", "", ""]), m(null), C(null), Je(null), Ze.current = !1, Ee(null), Qe(null), Ne(!1), Ir(!1), Ct(!1), Mn(!1), q(null), Fe && (clearTimeout(Fe), ft(null)), Ce && (z && !r || tn) && (console.log("Cleaning up wallet connection after", tn ? "linking" : "incomplete auth"), P(), Ot(!1)), B(!1);
    }, 200);
  }, _o = async (y) => {
    var b, v;
    if (!r)
      throw new Error("User must be authenticated to initiate email linking");
    if (!y)
      throw new Error("Email is required");
    if (!W(y))
      throw new Error("Please enter a valid email address");
    try {
      await Se.post(
        `${n}/api/email/init`,
        { email: y.trim().toLowerCase() },
        {
          headers: {
            "pr0d-app-id": e,
            Authorization: `Bearer ${r}`
          }
        }
      );
    } catch (A) {
      throw new Error(((v = (b = A.response) == null ? void 0 : b.data) == null ? void 0 : v.message) || "Failed to initiate email linking");
    }
  }, Ro = async (y, b) => {
    var v, A;
    if (!r)
      throw new Error("User must be authenticated to link email");
    if (!y || !b)
      throw new Error("Email and code are required");
    if (!W(y))
      throw new Error("Please enter a valid email address");
    if (b.length !== 6)
      throw new Error("Code must be 6 digits");
    try {
      const O = await Se.post(
        `${n}/api/email/link`,
        { email: y.trim().toLowerCase(), code: b },
        {
          headers: {
            "pr0d-app-id": e,
            Authorization: `Bearer ${r}`
          }
        }
      );
      return He(), !0;
    } catch (O) {
      throw new Error(((A = (v = O.response) == null ? void 0 : v.data) == null ? void 0 : A.message) || "Failed to link email");
    }
  }, ht = async (y) => {
    var b, v;
    if (!r)
      throw new Error("User must be authenticated to link provider");
    if (!u)
      throw new Error("App configuration not loaded");
    if (!u[y])
      throw new Error(`${y} is not enabled for this app`);
    try {
      const O = (await Se.get(`${n}/api/${y}/init`, {
        headers: {
          "pr0d-app-id": e,
          Authorization: `Bearer ${r}`
        },
        params: { redirect_uri: window.location.href }
      })).data.data;
      window.location.href = O;
    } catch (A) {
      throw new Error(((v = (b = A.response) == null ? void 0 : b.data) == null ? void 0 : v.message) || `Failed to initiate linking with ${y}`);
    }
  }, Ra = async (y) => {
    var b, v;
    if (!r)
      throw new Error("User must be authenticated to unlink provider");
    if (!u)
      throw new Error("App configuration not loaded");
    if (!u[y])
      throw new Error(`${y} is not enabled for this app`);
    try {
      const A = await Se.delete(`${n}/api/${y}/delete`, {
        headers: {
          "pr0d-app-id": e,
          Authorization: `Bearer ${r}`
        }
      });
      He();
    } catch (A) {
      throw new Error(((v = (b = A.response) == null ? void 0 : b.data) == null ? void 0 : v.message) || `Failed to unlink ${y}`);
    }
  }, No = async (y, b) => {
    var v, A;
    if (!r)
      throw new Error("User must be authenticated to link wallet");
    try {
      const O = await Se.post(`${n}/api/wallet/link`, {
        signature: y,
        nonce: b
      }, {
        headers: {
          "pr0d-app-id": e,
          Authorization: `Bearer ${r}`
        }
      });
      return He(), !0;
    } catch (O) {
      throw new Error(((A = (v = O.response) == null ? void 0 : v.data) == null ? void 0 : A.message) || "Failed to link wallet");
    }
  }, Na = async (y) => {
    var b, v;
    if (!r)
      throw new Error("User must be authenticated to unlink wallet");
    try {
      const A = await Se.delete(`${n}/api/wallet/delete`, {
        headers: {
          "pr0d-app-id": e,
          Authorization: `Bearer ${r}`
        },
        data: { address: y }
      });
      Ce && pe && y.toLowerCase() === pe.toLowerCase() && (console.log("Disconnecting wallet after unlinking:", y), P(), Ot(!1), q(null), Ct(!1), Qe(null), Ee(null)), He();
    } catch (A) {
      throw new Error(((v = (b = A.response) == null ? void 0 : b.data) == null ? void 0 : v.message) || "Failed to unlink wallet");
    }
  }, Ba = async () => ht("google"), Da = async () => ht("discord"), La = async () => ht("x"), rn = (y) => {
    const b = y.replace(/-/g, "+").replace(/_/g, "/"), v = b.padEnd(b.length + (4 - b.length % 4) % 4, "="), A = atob(v), O = new Uint8Array(A.length);
    for (let Z = 0; Z < A.length; Z++)
      O[Z] = A.charCodeAt(Z);
    return O;
  }, Bo = (y) => {
    var b, v;
    if (console.log("Formatting passkey options:", y), !y)
      throw new Error("Options is undefined");
    return y.user ? {
      ...y,
      user: {
        ...y.user,
        id: rn(y.user.id)
      },
      challenge: rn(y.challenge),
      excludeCredentials: ((b = y.excludeCredentials) == null ? void 0 : b.map((A) => ({
        ...A,
        id: rn(A.id)
      }))) || []
    } : {
      ...y,
      challenge: rn(y.challenge),
      allowCredentials: ((v = y.allowCredentials) == null ? void 0 : v.map((A) => ({
        ...A,
        id: rn(A.id)
      }))) || []
    };
  }, Do = async () => {
    if (!Pt) {
      R("Passkeys are not supported on this device");
      return;
    }
    kr(!0), R(null);
    try {
      const { options: y } = await Tr(), b = Bo(y);
      ua(b), ce("passkey"), setTimeout(async () => {
        try {
          const v = await navigator.credentials.create({
            publicKey: b
          });
          v && (await Er(v)).type === "registration" && (ce("passkey-success"), setTimeout(() => {
            kt();
          }, 2e3));
        } catch (v) {
          console.error("Passkey creation failed:", v), R(v.message || "Failed to create passkey"), ce("method");
        }
        kr(!1);
      }, 500);
    } catch (y) {
      console.error("Passkey setup failed:", y), R(y.message || "Failed to setup passkey"), kr(!1);
    }
  }, za = async () => {
    if (!Pt) {
      R("Passkeys are not supported on this device");
      return;
    }
    I(null), p({ show: !0, view: "passkey-loading" });
    try {
      const { options: y } = await Tr(), b = Bo(y), v = await navigator.credentials.get({
        publicKey: b
      });
      v && (p({ show: !0, view: "passkey-signing" }), await Er(v));
    } catch (y) {
      console.error("Passkey login failed:", y), I(y.message || "Failed to login with passkey"), p({ show: !0, view: "passkey-error" });
    }
  }, Tr = async (y) => {
    const b = {};
    y && (b.userHandle = y);
    const v = await fetch(`${n}/api/passkeys/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PR0D-APP-ID": e,
        ...r && { Authorization: `Bearer ${r}` }
      },
      body: JSON.stringify(b)
    });
    if (!v.ok) {
      const Z = await v.json();
      throw new Error(Z.message || "Failed to initialize passkey");
    }
    const A = await v.json();
    console.log("Backend response data:", A);
    const O = A.data || A;
    return {
      options: O.options,
      type: O.type
    };
  }, Ua = () => {
    const y = navigator.userAgent;
    let b = "";
    y.includes("Windows") ? b = "Windows" : y.includes("Mac OS X") ? b = "macOS" : y.includes("iPhone") ? b = "iOS" : y.includes("iPad") ? b = "iPadOS" : y.includes("Android") ? b = "Android" : y.includes("Linux") && (b = "Linux");
    let v = "";
    return y.includes("Chrome") && !y.includes("Edge") ? v = "Chrome" : y.includes("Safari") && !y.includes("Chrome") ? v = "Safari" : y.includes("Firefox") ? v = "Firefox" : y.includes("Edge") && (v = "Edge"), b && v ? `${v} on ${b}` : b || v || "Unknown Device";
  }, Er = async (y) => {
    const b = Ua(), v = await fetch(`${n}/api/passkeys/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PR0D-APP-ID": e,
        ...r && { Authorization: `Bearer ${r}` }
      },
      body: JSON.stringify({
        credential: y,
        deviceName: b
      })
    });
    if (!v.ok) {
      const Z = await v.json();
      throw new Error(Z.message || "Failed to verify passkey");
    }
    const A = await v.json();
    console.log("Verify passkey response:", A);
    const O = A.data || A;
    return O.type === "authentication" && O.access_token && ($t(O.access_token, O.refresh_token, !0), kt()), O.type === "registration" && (He(), kt()), {
      type: O.type,
      user: O.user,
      accessToken: O.access_token || O.accessToken,
      refreshToken: O.refresh_token || O.refreshToken,
      message: O.message
    };
  }, Fa = async () => {
    if (!r)
      throw new Error("Authentication required");
    const y = await fetch(`${n}/api/passkeys/list`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "PR0D-APP-ID": e,
        Authorization: `Bearer ${r}`
      }
    });
    if (!y.ok) {
      const v = await y.json();
      throw new Error(v.message || "Failed to list passkeys");
    }
    const b = await y.json();
    return {
      passkeys: b.passkeys,
      count: b.count
    };
  }, Wa = async (y) => {
    if (!r)
      throw new Error("Authentication required");
    const b = await fetch(`${n}/api/passkeys/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "PR0D-APP-ID": e,
        Authorization: `Bearer ${r}`
      },
      body: JSON.stringify({ credentialId: y })
    });
    if (He(), !b.ok) {
      const v = await b.json();
      throw new Error(v.message || "Failed to delete passkey");
    }
  }, He = async (y) => {
    const b = y || r;
    if (!b)
      throw new Error("Authentication required");
    const v = await fetch(`${n}/api/sessions/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "PR0D-APP-ID": e,
        Authorization: `Bearer ${b}`
      }
    });
    if (!v.ok) {
      const Z = await v.json();
      throw new Error(Z.message || "Failed to fetch user data");
    }
    const O = (await v.json()).data;
    return l(O), O;
  }, Ha = {
    accessToken: r,
    isAuthenticated: !!r,
    user: a,
    logout: pa,
    login: ba,
    triggerMfaSetup: wa,
    triggerEmailLink: xa,
    triggerProviderLink: va,
    triggerWalletLink: Ca,
    triggerPasskeySetup: Sa,
    setupMFA: Mo,
    verifyMFA: Po,
    deleteMFA: ya,
    initEmailLink: _o,
    linkEmail: Ro,
    linkProvider: ht,
    unlinkProvider: Ra,
    linkWallet: No,
    unlinkWallet: Na,
    linkGoogle: Ba,
    linkDiscord: Da,
    linkX: La,
    initPasskey: Tr,
    verifyPasskey: Er,
    listPasskeys: Fa,
    deletePasskey: Wa,
    getUser: He,
    teeSignMessage: async (y) => {
      if (!r)
        throw new Error("User not authenticated");
      try {
        const b = await fetch(`${n}/api/tee/sign-message`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${r}`,
            "PR0D-APP-ID": e
          },
          body: JSON.stringify({ message: y })
        });
        if (!b.ok) {
          const A = await b.json();
          throw new Error(A.message || "Failed to sign message");
        }
        return (await b.json()).data;
      } catch (b) {
        throw console.error("Error signing message:", b), b;
      }
    },
    createTransaction: async (y) => {
      if (!r)
        throw new Error("User not authenticated");
      try {
        const b = await fetch(`${n}/api/transactions/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${r}`,
            "PR0D-APP-ID": e
          },
          body: JSON.stringify(y)
        });
        if (!b.ok) {
          const A = await b.json();
          throw new Error(A.message || "Failed to create transaction");
        }
        return (await b.json()).data;
      } catch (b) {
        throw console.error("Error creating transaction:", b), b;
      }
    },
    getTransaction: async (y) => {
      try {
        const b = await fetch(`${n}/api/transactions/${y}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "PR0D-APP-ID": e
          }
        });
        if (!b.ok) {
          const A = await b.json();
          throw new Error(A.message || "Failed to get transaction");
        }
        return (await b.json()).data;
      } catch (b) {
        throw console.error("Error getting transaction:", b), b;
      }
    },
    sponsorTransaction: async (y, b, v, A) => {
      try {
        const O = await fetch(`${n}/api/transactions/${y}/sponsor`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "PR0D-APP-ID": e
          },
          body: JSON.stringify({ sponsorPrivateKey: b, rpcUrl: v, nonce: A })
        });
        if (!O.ok) {
          const ee = await O.json();
          throw new Error(ee.message || "Failed to sponsor transaction");
        }
        return (await O.json()).data;
      } catch (O) {
        throw console.error("Error sponsoring transaction:", O), O;
      }
    },
    getPendingTransactions: async () => {
      if (!r)
        throw new Error("User not authenticated");
      try {
        const y = await fetch(`${n}/api/transactions/user/pending`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${r}`,
            "PR0D-APP-ID": e
          }
        });
        if (!y.ok) {
          const v = await y.json();
          throw new Error(v.message || "Failed to get pending transactions");
        }
        return (await y.json()).data;
      } catch (y) {
        throw console.error("Error getting pending transactions:", y), y;
      }
    }
  };
  return /* @__PURE__ */ d.jsx(sa.Provider, { value: Ha, children: /* @__PURE__ */ d.jsxs("div", { children: [
    c.show && /* @__PURE__ */ d.jsx(
      "div",
      {
        style: S.overlay,
        onClick: (y) => {
          y.target === y.currentTarget && kt();
        },
        children: /* @__PURE__ */ d.jsxs("div", { style: {
          ...S.modal,
          transform: j ? "translateY(-20px)" : "translateY(0)",
          opacity: j ? 0 : 1,
          transition: "width 0.3s ease-out, height 0.3s ease-out, transform 0.3s ease-out, opacity 0.3s ease-out"
        }, children: [
          /* @__PURE__ */ d.jsx(
            "button",
            {
              style: S.close,
              onClick: kt,
              "data-pr0d-close": "true",
              children: /* @__PURE__ */ d.jsx(q0, { style: { width: 16, height: 16 } })
            }
          ),
          (c.view === "loginorsignup" && J === "code" || c.view === "link" && J === "code" || c.view === "wallet" || c.view === "wallet-connecting" || c.view === "wallet-signing" || c.view === "wallet-success" || c.view === "wallet-error" || c.view === "oauth-error" || c.view === "mfa" && (V === "qr" || V === "code")) && /* @__PURE__ */ d.jsx(
            "button",
            {
              style: S.backArrow,
              "data-pr0d-back": "true",
              onClick: () => {
                c.view === "loginorsignup" ? (X("email"), R(null), _(["", "", "", "", "", ""])) : c.view === "link" ? (X("email"), R(null), _(["", "", "", "", "", ""])) : c.view === "wallet" ? (R(null), Ee(null), Qe(null), Mn(!1), We(tn ? { show: !0, view: "provider" } : { show: !0, view: "loginorsignup" })) : c.view === "wallet-connecting" ? (R(null), Ee(null), Ne(!1), Qe(null), P(), We({ show: !0, view: "wallet" })) : c.view === "wallet-signing" ? (P(), Ee(null), q(null), Ne(!1), Qe(null), We({ show: !0, view: "wallet" })) : c.view === "wallet-success" ? (Pn(!1), Qe(null), Ne(!1), P(), We({ show: !0, view: "wallet" })) : c.view === "wallet-error" ? (Ee(null), Qe(null), Ne(!1), P(), We({ show: !0, view: "wallet" })) : c.view === "oauth-error" ? (m(null), X("email"), R(null), We({ show: !0, view: "loginorsignup" })) : c.view === "mfa" && (V === "code" ? ce("qr") : V === "qr" && ce("method"), R(null), U(["", "", "", "", "", ""]));
              },
              children: /* @__PURE__ */ d.jsx(G0, { style: { width: 16, height: 16 } })
            }
          ),
          c.view == "loginorsignup" && J === "email" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Log in or sign up" }) : null,
          c.view == "loginorsignup" && J === "code" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Enter confirmation code" }) : null,
          c.view == "wallet" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: tn ? "Link Wallet" : "Connect Wallet" }) : null,
          c.view == "wallet-connecting" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Requesting Connection" }) : null,
          c.view == "wallet-signing" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Sign to verify" }) : null,
          c.view == "wallet-success" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Wallet Connected" }) : null,
          c.view == "wallet-error" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Connection Failed" }) : null,
          c.view == "link" && J === "email" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Link your Email" }) : null,
          c.view == "link" && J === "code" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Enter confirmation code" }) : null,
          c.view == "provider" ? /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Link Social Account" }) : null,
          (c.view == "oauth-error", null),
          c.view === "mfa" && V === "method" && /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsx("div", { style: S.shieldIcon, children: /* @__PURE__ */ d.jsx("svg", { viewBox: "0 0 24 24", fill: (u == null ? void 0 : u.accent) || "#666", style: { width: 48, height: 48 }, children: /* @__PURE__ */ d.jsx("path", { d: "M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z" }) }) }),
            /* @__PURE__ */ d.jsx("h3", { style: S.title, children: "Choose a verification method" }),
            /* @__PURE__ */ d.jsx("p", { style: S.subtitle, children: "How would you like to verify your identity? You can change this later." })
          ] }),
          c.view === "loginorsignup" && /* @__PURE__ */ d.jsx("div", { style: S.logo, children: J === "code" ? /* @__PURE__ */ d.jsx("div", { style: S.emailIconContainer, children: /* @__PURE__ */ d.jsxs("svg", { style: S.emailIconLarge, viewBox: "0 0 24 24", fill: "none", stroke: (u == null ? void 0 : u.accent) || "#666", strokeWidth: "1.5", children: [
            /* @__PURE__ */ d.jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
            /* @__PURE__ */ d.jsx("polyline", { points: "22,6 12,13 2,6" })
          ] }) }) : u != null && u.image ? /* @__PURE__ */ d.jsx("img", { src: u.image, alt: u.name, style: S.logoImage }) : null }),
          H && /* @__PURE__ */ d.jsx("div", { style: S.error, children: H }),
          c.view === "mfa" && V === "method" ? /* @__PURE__ */ d.jsxs("div", { style: S.methodContainer, children: [
            /* @__PURE__ */ d.jsxs(
              $e,
              {
                id: "mfa-authenticator",
                style: {
                  ...S.altButton,
                  opacity: h ? 0.7 : 1
                },
                onClick: () => Aa(),
                disabled: h,
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f0f0f0" : "#3a3a3a",
                defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                children: [
                  /* @__PURE__ */ d.jsx(V0, { style: S.providerIcon }),
                  h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                    "Authenticator app",
                    /* @__PURE__ */ d.jsx("span", { style: {
                      fontSize: 11,
                      fontWeight: 600,
                      color: (u == null ? void 0 : u.accent) || "#20c997",
                      backgroundColor: aa((u == null ? void 0 : u.accent) || "#20c997"),
                      padding: "2px 6px",
                      borderRadius: 4,
                      marginLeft: "auto"
                    }, children: "Recommended" })
                  ] })
                ]
              }
            ),
            ((Lo = u == null ? void 0 : u.options) == null ? void 0 : Lo.allowPasskeys) && /* @__PURE__ */ d.jsxs(
              $e,
              {
                id: "mfa-passkey",
                style: {
                  ...S.altButton,
                  opacity: Sr || !Pt ? 0.7 : 1
                },
                onClick: () => Do(),
                disabled: Sr || !Pt,
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f0f0f0" : "#3a3a3a",
                defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                children: [
                  /* @__PURE__ */ d.jsx(Lt, { style: S.providerIcon }),
                  Sr ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                    "Passkey",
                    !Pt && /* @__PURE__ */ d.jsx("span", { style: {
                      fontSize: 11,
                      fontWeight: 600,
                      color: "#dc3545",
                      backgroundColor: "#f8d7da",
                      padding: "2px 6px",
                      borderRadius: 4,
                      marginLeft: "auto"
                    }, children: "Not Supported" })
                  ] })
                ]
              }
            )
          ] }) : c.view === "mfa" && V === "qr" && N ? /* @__PURE__ */ d.jsxs("div", { style: S.mfaContainer, children: [
            /* @__PURE__ */ d.jsx("h3", { style: S.mfaTitle, children: "Scan QR code" }),
            /* @__PURE__ */ d.jsx("p", { style: S.mfaInstruction, children: "Open your authenticator app and scan the QR code to continue." }),
            /* @__PURE__ */ d.jsx("div", { style: S.qrCodeContainer, children: /* @__PURE__ */ d.jsx("div", { ref: de, style: S.qrCodeWrapper }) }),
            /* @__PURE__ */ d.jsx("button", { style: S.copyButton, onClick: $a, children: ca ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("svg", { style: S.copyIcon, viewBox: "0 0 24 24", fill: "#666", children: /* @__PURE__ */ d.jsx("path", { d: "M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" }) }),
              "Copied setup key"
            ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("svg", { style: S.copyIcon, viewBox: "0 0 24 24", fill: "#666", children: /* @__PURE__ */ d.jsx("path", { d: "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" }) }),
              "Copy setup key"
            ] }) }),
            /* @__PURE__ */ d.jsx(
              $e,
              {
                id: "mfa-continue",
                style: {
                  ...S.submit,
                  backgroundColor: (u == null ? void 0 : u.accent) || "#007bff",
                  color: "#fff"
                },
                onClick: () => ce("code"),
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: `rgba(${u != null && u.accent ? parseInt(u.accent.slice(1, 3), 16) : 0}, ${u != null && u.accent ? parseInt(u.accent.slice(3, 5), 16) : 123}, ${u != null && u.accent ? parseInt(u.accent.slice(5, 7), 16) : 255}, 0.8)`,
                defaultBackgroundColor: (u == null ? void 0 : u.accent) || "#007bff",
                children: "Continue"
              }
            )
          ] }) : c.view === "mfa" && V === "code" ? /* @__PURE__ */ d.jsxs("div", { style: S.mfaContainer, children: [
            /* @__PURE__ */ d.jsx("h3", { style: S.mfaTitle, children: "Enter enrollment code" }),
            /* @__PURE__ */ d.jsx("p", { style: S.mfaInstruction, children: "To continue, enter the 6-digit code generated from your authenticator app." }),
            /* @__PURE__ */ d.jsx("div", { style: S.codeContainer, children: Y.map((y, b) => /* @__PURE__ */ d.jsx(
              "input",
              {
                ref: (v) => {
                  G.current[b] = v;
                },
                style: {
                  ...S.codeInput,
                  borderColor: nn === `mfa-code-${b}` && (u == null ? void 0 : u.accent) || (Q((u == null ? void 0 : u.background) || "#ffffff") ? "#e5e7eb" : "#636363")
                },
                type: "text",
                maxLength: 1,
                inputMode: "numeric",
                value: y,
                onChange: (v) => Pa(b, v.target.value),
                onFocus: () => Xe(`mfa-code-${b}`),
                onBlur: () => Xe(null),
                onKeyDown: (v) => {
                  var A;
                  v.key === "Backspace" && !Y[b] && b > 0 && ((A = G.current[b - 1]) == null || A.focus());
                }
              },
              b
            )) }),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                style: {
                  ...S.backButton,
                  color: (u == null ? void 0 : u.accent) || "#555"
                },
                onClick: () => {
                  ce("qr"), R(null), U(["", "", "", "", "", ""]);
                },
                children: "Back to QR Code"
              }
            )
          ] }) : c.view === "mfa" && V === "passkey" ? /* @__PURE__ */ d.jsxs("div", { style: S.passkeySigningContainer, children: [
            /* @__PURE__ */ d.jsx("div", { style: S.passkeySigningIcon, children: /* @__PURE__ */ d.jsxs("div", { style: {
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: [
              /* @__PURE__ */ d.jsx("div", { style: {
                position: "absolute",
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: `2px solid ${(u == null ? void 0 : u.accent) || "#007bff"}`,
                opacity: 0.3,
                animation: "pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite"
              } }),
              /* @__PURE__ */ d.jsx("div", { style: {
                position: "absolute",
                width: 60,
                height: 60,
                borderRadius: "50%",
                border: `2px solid ${(u == null ? void 0 : u.accent) || "#007bff"}`,
                opacity: 0.5,
                animation: "pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.5s infinite"
              } }),
              /* @__PURE__ */ d.jsx(
                Lt,
                {
                  style: {
                    fontSize: 48,
                    color: (u == null ? void 0 : u.accent) || "#007bff",
                    animation: "fingerprint-pulse 1.5s ease-in-out infinite alternate"
                  }
                }
              )
            ] }) }),
            /* @__PURE__ */ d.jsx("h3", { style: S.passkeySigningTitle, children: "Creating Passkey" }),
            /* @__PURE__ */ d.jsx("p", { style: S.passkeySigningMessage, children: "Follow your browser's instructions to create a passkey" })
          ] }) : c.view === "mfa" && V === "passkey-success" ? /* @__PURE__ */ d.jsxs("div", { style: S.passkeySigningContainer, children: [
            /* @__PURE__ */ d.jsx("div", { style: S.passkeySigningIcon, children: /* @__PURE__ */ d.jsx("div", { style: {
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: /* @__PURE__ */ d.jsx("div", { style: {
              width: 60,
              height: 60,
              borderRadius: "50%",
              backgroundColor: (u == null ? void 0 : u.accent) || "#007bff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: /* @__PURE__ */ d.jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", children: /* @__PURE__ */ d.jsx("path", { d: "M9 12l2 2 4-4", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }) }) }),
            /* @__PURE__ */ d.jsx("h3", { style: S.passkeySigningTitle, children: "Passkey Created Successfully" }),
            /* @__PURE__ */ d.jsx("p", { style: S.passkeySigningMessage, children: "Your passkey has been linked to your account for secure authentication" })
          ] }) : c.view === "link" ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            J === "code" && /* @__PURE__ */ d.jsx("div", { style: S.emailIconContainer, children: /* @__PURE__ */ d.jsxs("svg", { style: S.emailIconLarge, viewBox: "0 0 24 24", fill: "none", stroke: (u == null ? void 0 : u.accent) || "#666", strokeWidth: "1.5", children: [
              /* @__PURE__ */ d.jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
              /* @__PURE__ */ d.jsx("polyline", { points: "22,6 12,13 2,6" })
            ] }) }),
            J === "email" ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsx("p", { style: S.subtitle, children: "Connect your email to enhance your login options." }),
              /* @__PURE__ */ d.jsxs("div", { style: S.inputContainer, children: [
                /* @__PURE__ */ d.jsxs("svg", { style: S.inputIcon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ d.jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
                  /* @__PURE__ */ d.jsx("polyline", { points: "22,6 12,13 2,6" })
                ] }),
                /* @__PURE__ */ d.jsx(
                  "input",
                  {
                    style: {
                      ...S.inputField,
                      borderColor: nn === "link-email" && (u == null ? void 0 : u.accent) || (Q((u == null ? void 0 : u.background) || "#ffffff") ? "#e5e7eb" : "#636363")
                    },
                    type: "email",
                    placeholder: "your@email.com",
                    value: T,
                    onChange: (y) => M(y.target.value),
                    onFocus: () => Xe("link-email"),
                    onBlur: () => Xe(null),
                    onKeyDown: (y) => {
                      y.key === "Enter" && Oo();
                    }
                  }
                ),
                /* @__PURE__ */ d.jsx(
                  "button",
                  {
                    style: {
                      ...S.inputSubmitButton,
                      opacity: h || !T || !W(T) ? 0.3 : 1,
                      color: h || !T || !W(T) ? "#ccc" : (u == null ? void 0 : u.accent) || "#000",
                      cursor: h || !T || !W(T) ? "not-allowed" : "pointer"
                    },
                    onClick: Oo,
                    disabled: h || !T || !W(T),
                    type: "button",
                    children: "Submit"
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
              /* @__PURE__ */ d.jsxs("p", { style: S.codeText, children: [
                "Enter the 6-digit code sent to",
                /* @__PURE__ */ d.jsx("br", {}),
                /* @__PURE__ */ d.jsx("strong", { children: T })
              ] }),
              /* @__PURE__ */ d.jsx("div", { style: S.codeContainer, onPaste: jo, children: k.map((y, b) => /* @__PURE__ */ d.jsx(
                "input",
                {
                  ref: (v) => {
                    D.current[b] = v;
                  },
                  style: {
                    ...S.codeInput,
                    borderColor: nn === `link-code-${b}` && (u == null ? void 0 : u.accent) || (Q((u == null ? void 0 : u.background) || "#ffffff") ? "#e5e7eb" : "#636363")
                  },
                  type: "text",
                  inputMode: "numeric",
                  maxLength: 1,
                  value: y,
                  onChange: (v) => To(b, v.target.value),
                  onFocus: () => Xe(`link-code-${b}`),
                  onBlur: () => Xe(null),
                  onKeyDown: (v) => Eo(b, v),
                  autoComplete: "one-time-code"
                },
                b
              )) }),
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  style: {
                    ...S.backButton,
                    color: (u == null ? void 0 : u.accent) || "#555"
                  },
                  onClick: () => {
                    X("email"), R(null), _(["", "", "", "", "", ""]);
                  },
                  children: "Back to Email"
                }
              )
            ] })
          ] }) : c.view === "loginorsignup" ? /* @__PURE__ */ d.jsx(d.Fragment, { children: J === "email" ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsxs("div", { style: S.inputContainer, children: [
              /* @__PURE__ */ d.jsxs("svg", { style: S.inputIcon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ d.jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
                /* @__PURE__ */ d.jsx("polyline", { points: "22,6 12,13 2,6" })
              ] }),
              /* @__PURE__ */ d.jsx(
                "input",
                {
                  style: {
                    ...S.inputField,
                    borderColor: nn === "login-email" && (u == null ? void 0 : u.accent) || (Q((u == null ? void 0 : u.background) || "#ffffff") ? "#e5e7eb" : "#636363")
                  },
                  type: "email",
                  placeholder: "your@email.com",
                  value: T,
                  onChange: (y) => M(y.target.value),
                  onFocus: () => Xe("login-email"),
                  onBlur: () => Xe(null),
                  onKeyDown: (y) => {
                    y.key === "Enter" && Io();
                  }
                }
              ),
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  style: {
                    ...S.inputSubmitButton,
                    opacity: h || !T || !W(T) ? 0.3 : 1,
                    color: h || !T || !W(T) ? "#ccc" : (u == null ? void 0 : u.accent) || "#000",
                    cursor: h || !T || !W(T) ? "not-allowed" : "pointer"
                  },
                  onClick: Io,
                  disabled: h || !T || !W(T),
                  type: "button",
                  children: "Submit"
                }
              )
            ] }),
            (u == null ? void 0 : u.google) && /* @__PURE__ */ d.jsxs(
              $e,
              {
                id: "google-login",
                style: {
                  ...S.altButton
                },
                onClick: () => $n("google"),
                disabled: h,
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f8f9fa" : "#3a3a3a",
                defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                children: [
                  /* @__PURE__ */ d.jsxs("svg", { style: S.providerIcon, viewBox: "0 0 24 24", fill: "currentColor", children: [
                    /* @__PURE__ */ d.jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
                    /* @__PURE__ */ d.jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
                    /* @__PURE__ */ d.jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
                    /* @__PURE__ */ d.jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
                  ] }),
                  h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : "Google"
                ]
              }
            ),
            (u == null ? void 0 : u.x) && /* @__PURE__ */ d.jsxs(
              $e,
              {
                id: "x-login",
                style: {
                  ...S.altButton
                },
                onClick: () => $n("x"),
                disabled: h,
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f8f9fa" : "#3a3a3a",
                defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                children: [
                  /* @__PURE__ */ d.jsx("svg", { style: S.providerIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ d.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }),
                  h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : "Twitter"
                ]
              }
            ),
            (u == null ? void 0 : u.discord) && /* @__PURE__ */ d.jsxs(
              $e,
              {
                id: "discord-login",
                style: {
                  ...S.altButton
                },
                onClick: () => $n("discord"),
                disabled: h,
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f8f9fa" : "#3a3a3a",
                defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                children: [
                  /* @__PURE__ */ d.jsx("svg", { style: S.providerIcon, viewBox: "0 0 24 24", fill: "#5865F2", children: /* @__PURE__ */ d.jsx("path", { d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a .077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" }) }),
                  h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : "Discord"
                ]
              }
            ),
            ((zo = u == null ? void 0 : u.options) == null ? void 0 : zo.allowPasskeys) && Pt && /* @__PURE__ */ d.jsxs(
              $e,
              {
                id: "passkey-login",
                style: {
                  ...S.altButton,
                  opacity: h ? 0.7 : 1
                },
                onClick: za,
                disabled: h,
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f8f9fa" : "#3a3a3a",
                defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                children: [
                  /* @__PURE__ */ d.jsx(Lt, { style: S.providerIcon }),
                  h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : /* @__PURE__ */ d.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }, children: [
                    /* @__PURE__ */ d.jsx("span", { children: "Passkey" }),
                    /* @__PURE__ */ d.jsx(Qi, {})
                  ] })
                ]
              }
            ),
            ((Uo = u == null ? void 0 : u.options) == null ? void 0 : Uo.allowExternalWallets) && /* @__PURE__ */ d.jsxs(
              $e,
              {
                id: "wallet-auth",
                style: {
                  ...S.altButton
                },
                onClick: ka,
                disabled: h,
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f8f9fa" : "#3a3a3a",
                defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                children: [
                  /* @__PURE__ */ d.jsxs("svg", { style: S.providerIcon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ d.jsx("rect", { x: "1", y: "3", width: "22", height: "18", rx: "2", ry: "2" }),
                    /* @__PURE__ */ d.jsx("line", { x1: "1", y1: "9", x2: "23", y2: "9" }),
                    /* @__PURE__ */ d.jsx("path", { d: "m1 9 22 0" })
                  ] }),
                  h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : /* @__PURE__ */ d.jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }, children: [
                    /* @__PURE__ */ d.jsx("span", { children: "Continue with Wallet" }),
                    /* @__PURE__ */ d.jsx(Qi, {})
                  ] })
                ]
              }
            )
          ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsxs("p", { style: S.codeText, children: [
              "Enter the 6-digit code sent to ",
              /* @__PURE__ */ d.jsx("strong", { children: T })
            ] }),
            /* @__PURE__ */ d.jsx("div", { style: S.codeContainer, onPaste: jo, children: k.map((y, b) => /* @__PURE__ */ d.jsx(
              "input",
              {
                ref: (v) => {
                  D.current[b] = v;
                },
                style: {
                  ...S.codeInput,
                  borderColor: nn === `login-code-${b}` && (u == null ? void 0 : u.accent) || (Q((u == null ? void 0 : u.background) || "#ffffff") ? "#e5e7eb" : "#636363")
                },
                type: "text",
                inputMode: "numeric",
                maxLength: 1,
                value: y,
                onChange: (v) => To(b, v.target.value),
                onFocus: () => Xe(`login-code-${b}`),
                onBlur: () => Xe(null),
                onKeyDown: (v) => Eo(b, v),
                autoComplete: "one-time-code"
              },
              b
            )) }),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                style: {
                  ...S.backButton,
                  color: (u == null ? void 0 : u.accent) || "#555"
                },
                onClick: () => {
                  X("email"), R(null), _(["", "", "", "", "", ""]);
                },
                children: "Back to Email"
              }
            )
          ] }) }) : c.view === "provider" ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
            /* @__PURE__ */ d.jsx("p", { style: S.subtitle, children: "Connect your social media accounts to enhance your profile and login options." }),
            H && /* @__PURE__ */ d.jsx("div", { style: S.error, children: H }),
            /* @__PURE__ */ d.jsxs("div", { style: S.providerLinkContainer, children: [
              (u == null ? void 0 : u.google) && !((Fo = On()) != null && Fo.google) && /* @__PURE__ */ d.jsxs(
                $e,
                {
                  id: "google-link",
                  style: {
                    ...S.altButton,
                    marginBottom: 0,
                    opacity: h ? 0.7 : 1
                  },
                  onClick: async () => {
                    $(!0), R(null);
                    try {
                      await ht("google");
                    } catch (y) {
                      R(y.message);
                    } finally {
                      $(!1);
                    }
                  },
                  disabled: h,
                  focusedButton: Pe,
                  setFocusedButton: Oe,
                  hoveredButton: Ae,
                  setHoveredButton: Me,
                  appConfig: u,
                  hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f8f9fa" : "#3a3a3a",
                  defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                  children: [
                    /* @__PURE__ */ d.jsxs("svg", { style: S.providerIcon, viewBox: "0 0 24 24", fill: "currentColor", children: [
                      /* @__PURE__ */ d.jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
                      /* @__PURE__ */ d.jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
                      /* @__PURE__ */ d.jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
                      /* @__PURE__ */ d.jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
                    ] }),
                    h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : "Google"
                  ]
                }
              ),
              (u == null ? void 0 : u.discord) && !((Wo = On()) != null && Wo.discord) && /* @__PURE__ */ d.jsxs(
                $e,
                {
                  id: "discord-link",
                  style: {
                    ...S.altButton,
                    marginBottom: 0,
                    opacity: h ? 0.7 : 1
                  },
                  onClick: async () => {
                    $(!0), R(null);
                    try {
                      await ht("discord");
                    } catch (y) {
                      R(y.message);
                    } finally {
                      $(!1);
                    }
                  },
                  disabled: h,
                  focusedButton: Pe,
                  setFocusedButton: Oe,
                  hoveredButton: Ae,
                  setHoveredButton: Me,
                  appConfig: u,
                  hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f8f9fa" : "#3a3a3a",
                  defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                  children: [
                    /* @__PURE__ */ d.jsx("svg", { style: S.providerIcon, viewBox: "0 0 24 24", fill: "#5865F2", children: /* @__PURE__ */ d.jsx("path", { d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" }) }),
                    h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : "Discord"
                  ]
                }
              ),
              (u == null ? void 0 : u.x) && !((Ho = On()) != null && Ho.x) && /* @__PURE__ */ d.jsxs(
                $e,
                {
                  id: "x-link",
                  style: {
                    ...S.altButton,
                    marginBottom: 0,
                    opacity: h ? 0.7 : 1
                  },
                  onClick: async () => {
                    $(!0), R(null);
                    try {
                      await ht("x");
                    } catch (y) {
                      R(y.message);
                    } finally {
                      $(!1);
                    }
                  },
                  disabled: h,
                  focusedButton: Pe,
                  setFocusedButton: Oe,
                  hoveredButton: Ae,
                  setHoveredButton: Me,
                  appConfig: u,
                  hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f8f9fa" : "#3a3a3a",
                  defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                  children: [
                    /* @__PURE__ */ d.jsx("svg", { style: S.providerIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ d.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) }),
                    h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : "Twitter"
                  ]
                }
              )
            ] })
          ] }) : c.view === "oauth-error" && g ? /* @__PURE__ */ d.jsxs("div", { style: S.oauthErrorContainer, children: [
            /* @__PURE__ */ d.jsxs("div", { style: S.oauthErrorIcon, children: [
              g.provider === "google" && /* @__PURE__ */ d.jsxs("svg", { style: S.providerIconLarge, viewBox: "0 0 24 24", fill: "currentColor", children: [
                /* @__PURE__ */ d.jsx("path", { d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z", fill: "#4285F4" }),
                /* @__PURE__ */ d.jsx("path", { d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z", fill: "#34A853" }),
                /* @__PURE__ */ d.jsx("path", { d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z", fill: "#FBBC05" }),
                /* @__PURE__ */ d.jsx("path", { d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z", fill: "#EA4335" })
              ] }),
              g.provider === "discord" && /* @__PURE__ */ d.jsx("svg", { style: S.providerIconLarge, viewBox: "0 0 24 24", fill: "#5865F2", children: /* @__PURE__ */ d.jsx("path", { d: "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a .077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a .076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a .077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a .0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a .0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a .077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a .076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a .077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a .061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.019 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" }) }),
              g.provider === "x" && /* @__PURE__ */ d.jsx("svg", { style: S.providerIconLarge, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ d.jsx("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }) })
            ] }),
            /* @__PURE__ */ d.jsx("h3", { style: S.oauthErrorTitle, children: "Authentication failed" }),
            /* @__PURE__ */ d.jsx("p", { style: S.oauthErrorMessage, children: g.errorMessage ? g.errorMessage : "Something went wrong. Try again." }),
            /* @__PURE__ */ d.jsx(
              "button",
              {
                style: {
                  ...S.retryButton,
                  backgroundColor: (u == null ? void 0 : u.accent) || "#007bff",
                  color: "#fff"
                },
                onClick: () => {
                  m(null), C({ provider: g.provider }), p({ show: !0, view: "oauth-loading" }), setTimeout(() => {
                    r ? ht(g.provider).catch((y) => {
                      m({ provider: g.provider, state: "retry_failed", errorMessage: "Retry failed" }), p({ show: !0, view: "oauth-error" }), C(null);
                    }) : $n(g.provider);
                  }, 100);
                },
                children: "Retry"
              }
            )
          ] }) : c.view === "wallet" ? /* @__PURE__ */ d.jsxs("div", { style: S.walletContainer, children: [
            H && /* @__PURE__ */ d.jsx("div", { style: S.error, children: H }),
            /* @__PURE__ */ d.jsxs("div", { style: S.walletListContainer, children: [
              w && w.length > 0 ? w.map((y) => {
                var v, A, O;
                y.ready;
                const b = y.id === "walletConnect" || y.id === "binance-wallet" || ((v = y.name) == null ? void 0 : v.toLowerCase().includes("walletconnect")) || ((A = y.name) == null ? void 0 : A.toLowerCase().includes("trust")) && y.type === "walletConnect" || ((O = y.name) == null ? void 0 : O.toLowerCase().includes("binance")) || y.type === "walletConnect";
                return /* @__PURE__ */ d.jsxs(
                  $e,
                  {
                    id: `wallet-${y.uid}`,
                    style: {
                      ...S.altButton,
                      opacity: h ? 0.7 : 1
                    },
                    onClick: () => Ia(y),
                    disabled: h,
                    focusedButton: Pe,
                    setFocusedButton: Oe,
                    hoveredButton: Ae,
                    setHoveredButton: Me,
                    appConfig: u,
                    hoverBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#f8f9fa" : "#3a3a3a",
                    defaultBackgroundColor: Q((u == null ? void 0 : u.background) || "#ffffff") ? "#ffffff" : "#2a2a2a",
                    children: [
                      y.icon ? /* @__PURE__ */ d.jsx(
                        "img",
                        {
                          src: y.icon,
                          alt: y.name,
                          style: S.providerIcon,
                          onError: (Z) => {
                            Z.target.style.display = "none";
                          }
                        }
                      ) : (
                        // Fallback icon for wallets without icons
                        /* @__PURE__ */ d.jsx("svg", { style: S.providerIcon, viewBox: "0 0 24 24", fill: "#666", children: /* @__PURE__ */ d.jsx("path", { d: "M19 7H18V6C18 3.79 16.21 2 14 2H10C7.79 2 6 3.79 6 6V7H5C3.9 7 3 7.9 3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM10 4H14C15.1 4 16 4.9 16 6V7H8V6C8 4.9 8.9 4 10 4ZM19 19H5V9H19V19ZM12 16C13.1 16 14 15.1 14 14C14 12.9 13.1 12 12 12C10.9 12 10 12.9 10 14C10 15.1 10.9 16 12 16Z" }) })
                      ),
                      h ? /* @__PURE__ */ d.jsx("div", { style: { display: "flex", justifyContent: "center", width: "100%" }, children: /* @__PURE__ */ d.jsx(qe, { size: 16 }) }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                        y.name,
                        b && /* @__PURE__ */ d.jsx("span", { style: {
                          fontSize: 11,
                          fontWeight: 600,
                          color: (u == null ? void 0 : u.accent) || "#3B99FC",
                          backgroundColor: `${(u == null ? void 0 : u.accent) || "#3B99FC"}25`,
                          // 25 hex = ~15% opacity
                          padding: "2px 6px",
                          borderRadius: 4,
                          marginLeft: "auto"
                        }, children: "QR" })
                      ] })
                    ]
                  },
                  y.uid
                );
              }) : /* @__PURE__ */ d.jsx("div", { style: S.noWalletsMessage, children: /* @__PURE__ */ d.jsx("p", { children: "Loading wallets..." }) }),
              /* @__PURE__ */ d.jsxs("div", { style: S.getStartedSection, children: [
                /* @__PURE__ */ d.jsx("span", { style: S.getStartedText, children: "Haven't got a wallet? " }),
                /* @__PURE__ */ d.jsx(
                  "a",
                  {
                    href: "https://ethereum.org/en/wallets/find-wallet/",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    style: {
                      ...S.getStartedLink,
                      color: (u == null ? void 0 : u.accent) || "#007bff"
                    },
                    children: "Get started"
                  }
                )
              ] })
            ] })
          ] }) : c.view === "wallet-connecting" && re ? /* @__PURE__ */ d.jsx("div", { style: S.walletConnectingContainer, children: Ke ? (
            // Show QR code for WalletConnect
            /* @__PURE__ */ d.jsxs("div", { style: S.walletConnectQrContainer, children: [
              /* @__PURE__ */ d.jsx("div", { style: S.walletConnectQrCode, children: /* @__PURE__ */ d.jsx("div", { ref: de, style: S.qrCodeWrapper }) }),
              /* @__PURE__ */ d.jsx(
                "button",
                {
                  style: S.copyButton,
                  onClick: _a,
                  children: la ? /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                    /* @__PURE__ */ d.jsx("svg", { style: S.copyIcon, viewBox: "0 0 24 24", fill: "#666", children: /* @__PURE__ */ d.jsx("path", { d: "M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" }) }),
                    "Copied URI"
                  ] }) : /* @__PURE__ */ d.jsxs(d.Fragment, { children: [
                    /* @__PURE__ */ d.jsx("svg", { style: S.copyIcon, viewBox: "0 0 24 24", fill: "#666", children: /* @__PURE__ */ d.jsx("path", { d: "M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" }) }),
                    "Copy URI"
                  ] })
                }
              ),
              /* @__PURE__ */ d.jsx("h3", { style: S.walletConnectingTitle, children: "Scan with your wallet" }),
              /* @__PURE__ */ d.jsx("p", { style: S.walletConnectingMessage, children: "Open your mobile wallet and scan the QR code to connect." }),
              (((Vo = re == null ? void 0 : re.name) == null ? void 0 : Vo.toLowerCase().includes("binance")) || ((qo = re == null ? void 0 : re.name) == null ? void 0 : qo.toLowerCase().includes("trust"))) && /* @__PURE__ */ d.jsxs(
                "button",
                {
                  style: S.mobileDeepLinkButton,
                  onClick: () => {
                    var b, v;
                    const y = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    if (Ke) {
                      let A = "";
                      (b = re.name) != null && b.toLowerCase().includes("binance") ? A = `bnc://app.binance.com/cedefi/wc?uri=${encodeURIComponent(Ke)}` : (v = re.name) != null && v.toLowerCase().includes("trust") && (A = `https://link.trustwallet.com/wc?uri=${encodeURIComponent(Ke)}`), A && (window.open(A, "_blank"), setTimeout(() => {
                        if (y) {
                          const O = window.open("about:blank", "_blank"), Z = window.open("about:blank", "_blank");
                          setTimeout(() => {
                            O && O.close(), Z && Z.close();
                          }, 100);
                        }
                        console.log("Wallet connection stabilization period completed");
                      }, 3e3));
                    }
                  },
                  children: [
                    /* @__PURE__ */ d.jsx("svg", { style: S.mobileIcon, viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ d.jsx("path", { d: "M17 19H7V5H17M17 1H7C5.89 1 5 1.89 5 3V21C5 22.1 5.89 23 7 23H17C18.1 23 19 22.1 19 21V3C19 1.89 18.1 1 17 1Z" }) }),
                    "Open in App"
                  ]
                }
              )
            ] })
          ) : (
            // Show loading spinner for other wallets or while generating QR code
            /* @__PURE__ */ d.jsxs("div", { style: S.walletConnectingContainer, children: [
              /* @__PURE__ */ d.jsx(
                Wn,
                {
                  status: "loading",
                  walletName: re.name,
                  connectors: w,
                  connectingWallet: re,
                  hasLoadingAnimation: !0
                }
              ),
              /* @__PURE__ */ d.jsx("h3", { style: S.walletConnectingTitle, children: (Go = re.name) != null && Go.toLowerCase().includes("walletconnect") || (Yo = re.name) != null && Yo.toLowerCase().includes("trust") ? "Generating QR Code..." : `Opening ${re.name}` }),
              /* @__PURE__ */ d.jsx("p", { style: S.walletConnectingMessage, children: (Qo = re.name) != null && Qo.toLowerCase().includes("walletconnect") || (Zo = re.name) != null && Zo.toLowerCase().includes("trust") ? "Please wait while we generate your QR code." : "Don't see your wallet? Check your other browser windows." })
            ] })
          ) }) : c.view === "wallet-signing" && re ? /* @__PURE__ */ d.jsxs("div", { style: S.walletSigningContainer, children: [
            /* @__PURE__ */ d.jsx(
              Wn,
              {
                status: "signing",
                walletName: re.name,
                connectors: w,
                connectingWallet: re,
                hasLoadingAnimation: !0
              }
            ),
            /* @__PURE__ */ d.jsx("p", { style: S.walletSigningMessage, children: "Don't see your wallet? Check your other browser windows." })
          ] }) : c.view === "wallet-success" && re ? /* @__PURE__ */ d.jsxs("div", { style: S.walletConnectingContainer, children: [
            /* @__PURE__ */ d.jsx(
              Wn,
              {
                status: "success",
                walletName: re.name,
                connectors: w,
                connectingWallet: re
              }
            ),
            /* @__PURE__ */ d.jsxs("p", { style: S.walletConnectingMessage, children: [
              "Successfully connected to ",
              re.name
            ] }),
            /* @__PURE__ */ d.jsx("p", { style: S.walletConnectingSubMessage, children: pe && `Address: ${pe.slice(0, 6)}...${pe.slice(-4)}` }),
            /* @__PURE__ */ d.jsx("div", { style: S.walletGeneratingChallenge, children: /* @__PURE__ */ d.jsx("span", { children: "Generating challenge" }) }),
            /* @__PURE__ */ d.jsx(qe, { size: 16 })
          ] }) : c.view === "wallet-error" ? /* @__PURE__ */ d.jsxs("div", { style: S.walletErrorContainer, children: [
            /* @__PURE__ */ d.jsx(
              Wn,
              {
                status: "error",
                walletName: (re == null ? void 0 : re.name) || "Wallet",
                connectors: w,
                connectingWallet: re
              }
            ),
            /* @__PURE__ */ d.jsx("h3", { style: S.walletErrorTitle, children: "Could not log in with wallet" }),
            /* @__PURE__ */ d.jsx("p", { style: S.walletErrorSubtitle, children: "Please try connecting again." }),
            /* @__PURE__ */ d.jsx(
              $e,
              {
                id: "wallet-retry",
                style: {
                  ...S.walletRetryButton,
                  backgroundColor: (u == null ? void 0 : u.accent) || "#007bff",
                  color: "#fff"
                },
                onClick: () => {
                  Ee(null), Qe(null), Ne(!1), P(), We({ show: !0, view: "wallet" });
                },
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: `rgba(${u != null && u.accent ? parseInt(u.accent.slice(1, 3), 16) : 0}, ${u != null && u.accent ? parseInt(u.accent.slice(3, 5), 16) : 123}, ${u != null && u.accent ? parseInt(u.accent.slice(5, 7), 16) : 255}, 0.8)`,
                defaultBackgroundColor: (u == null ? void 0 : u.accent) || "#007bff",
                children: "Try Again"
              }
            )
          ] }) : c.view === "oauth-loading" && x ? /* @__PURE__ */ d.jsxs("div", { style: S.oauthLoadingContainer, children: [
            /* @__PURE__ */ d.jsx(
              Y0,
              {
                status: "loading",
                provider: x.provider,
                hasLoadingAnimation: !0
              }
            ),
            /* @__PURE__ */ d.jsxs("h3", { style: S.oauthLoadingTitle, children: [
              "Verifying connection to ",
              x.provider === "x" ? "Twitter" : x.provider.charAt(0).toUpperCase() + x.provider.slice(1)
            ] }),
            /* @__PURE__ */ d.jsx("p", { style: S.oauthLoadingMessage, children: "Just a few moments more" })
          ] }) : c.view === "passkey-loading" ? /* @__PURE__ */ d.jsxs("div", { style: S.passkeyLoadingContainer, children: [
            /* @__PURE__ */ d.jsx("div", { style: S.passkeyLoadingIcon, children: /* @__PURE__ */ d.jsx("div", { style: S.passkeyDualIcons, children: /* @__PURE__ */ d.jsx(
              Lt,
              {
                style: {
                  ...S.passkeyBiometricIcon,
                  color: (u == null ? void 0 : u.accent) || "#007bff",
                  fontSize: 48
                }
              }
            ) }) }),
            /* @__PURE__ */ d.jsx("h3", { style: S.passkeyLoadingTitle, children: "Authenticating with Passkey" }),
            /* @__PURE__ */ d.jsx("p", { style: S.passkeyLoadingMessage, children: "Please use your face, fingerprint, or device PIN to authenticate" })
          ] }) : c.view === "passkey-signing" ? /* @__PURE__ */ d.jsxs("div", { style: S.passkeySigningContainer, children: [
            /* @__PURE__ */ d.jsx("div", { style: S.passkeySigningIcon, children: /* @__PURE__ */ d.jsxs("div", { style: {
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: [
              /* @__PURE__ */ d.jsx("div", { style: {
                position: "absolute",
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: `2px solid ${(u == null ? void 0 : u.accent) || "#007bff"}`,
                opacity: 0.3,
                animation: "pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite"
              } }),
              /* @__PURE__ */ d.jsx("div", { style: {
                position: "absolute",
                width: 60,
                height: 60,
                borderRadius: "50%",
                border: `2px solid ${(u == null ? void 0 : u.accent) || "#007bff"}`,
                opacity: 0.5,
                animation: "pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.5s infinite"
              } }),
              /* @__PURE__ */ d.jsx(
                Lt,
                {
                  style: {
                    fontSize: 48,
                    color: (u == null ? void 0 : u.accent) || "#007bff",
                    animation: "fingerprint-pulse 1.5s ease-in-out infinite alternate"
                  }
                }
              )
            ] }) }),
            /* @__PURE__ */ d.jsx("h3", { style: S.passkeySigningTitle, children: "Verifying Passkey" }),
            /* @__PURE__ */ d.jsx("p", { style: S.passkeySigningMessage, children: "Confirming your identity with the server..." })
          ] }) : c.view === "passkey-error" && f ? /* @__PURE__ */ d.jsxs("div", { style: S.passkeyErrorContainer, children: [
            /* @__PURE__ */ d.jsx("div", { style: S.passkeyErrorIcon, children: /* @__PURE__ */ d.jsx(
              Lt,
              {
                style: {
                  fontSize: 48,
                  color: "#dc3545",
                  animation: "fingerprint-pulse 1.5s ease-in-out infinite alternate"
                }
              }
            ) }),
            /* @__PURE__ */ d.jsx("h3", { style: S.passkeyErrorTitle, children: "Passkey Authentication Failed" }),
            /* @__PURE__ */ d.jsx("p", { style: S.passkeyErrorMessage, children: f }),
            /* @__PURE__ */ d.jsx("div", { style: S.passkeyErrorButtons, children: /* @__PURE__ */ d.jsx(
              $e,
              {
                id: "passkey-retry",
                style: S.retryButton,
                onClick: () => {
                  I(null), p({ show: !0, view: "loginorsignup" });
                },
                focusedButton: Pe,
                setFocusedButton: Oe,
                hoveredButton: Ae,
                setHoveredButton: Me,
                appConfig: u,
                hoverBackgroundColor: `rgba(${u != null && u.accent ? parseInt(u.accent.slice(1, 3), 16) : 0}, ${u != null && u.accent ? parseInt(u.accent.slice(3, 5), 16) : 123}, ${u != null && u.accent ? parseInt(u.accent.slice(5, 7), 16) : 255}, 0.8)`,
                defaultBackgroundColor: (u == null ? void 0 : u.accent) || "#007bff",
                children: "Try Again"
              }
            ) })
          ] }) : null,
          /* @__PURE__ */ d.jsx("div", { style: { fontSize: 12, color: "#888", marginTop: 20 }, children: /* @__PURE__ */ d.jsx("a", { href: "https://pr0d.io", target: "_blank", rel: "noopener noreferrer", style: { color: "#888", textDecoration: "none" }, children: "Protected by pr0d.io" }) })
        ] })
      }
    ),
    t
  ] }) });
}, Q = (e) => {
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), r = parseInt(t.substr(2, 2), 16), o = parseInt(t.substr(4, 2), 16);
  return (0.299 * n + 0.587 * r + 0.114 * o) / 255 > 0.5;
}, Z0 = (e) => Q(e) ? "#000000" : "#ffffff", K0 = (e) => Q(e) ? "#666666" : "#cccccc", aa = (e) => {
  if (!e || e === "#ffffff") return "rgba(32, 201, 151, 0.1)";
  const t = e.replace("#", ""), n = parseInt(t.substr(0, 2), 16), r = parseInt(t.substr(2, 2), 16), o = parseInt(t.substr(4, 2), 16);
  return `rgba(${n}, ${r}, ${o}, 0.1)`;
}, J0 = (e) => {
  const t = (e == null ? void 0 : e.background) || "#ffffff", n = Z0(t), r = K0(t), o = typeof window < "u" && window.innerWidth <= 430, i = document.createElement("style");
  return i.textContent = `
        @keyframes pulse-ring {
            0% {
                transform: scale(0.8);
                opacity: 0.8;
            }
            50% {
                transform: scale(1.2);
                opacity: 0.3;
            }
            100% {
                transform: scale(1.4);
                opacity: 0;
            }
        }
        
        @keyframes fingerprint-pulse {
            0% {
                opacity: 0.7;
                transform: scale(1);
            }
            100% {
                opacity: 1;
                transform: scale(1.05);
            }
        }
        
        /* High specificity protection for close button */
        button[data-pr0d-close="true"][data-pr0d-close] {
            position: absolute !important;
            top: 12px !important;
            right: 12px !important;
            border: none !important;
            width: 28px !important;
            height: 28px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            font-size: 18px !important;
            line-height: 1 !important;
            padding: 0 !important;
            margin: 0 !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            min-width: auto !important;
            min-height: auto !important;
            max-width: none !important;
            max-height: none !important;
            font-family: inherit !important;
            transition: background-color 0.2s ease !important;
        }
        
        /* High specificity protection for back button */
        button[data-pr0d-back="true"][data-pr0d-back] {
            position: absolute !important;
            top: 12px !important;
            left: 12px !important;
            border: none !important;
            width: 28px !important;
            height: 28px !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            font-size: 18px !important;
            font-weight: bold !important;
            line-height: 1 !important;
            padding: 0 !important;
            margin: 0 !important;
            outline: none !important;
            text-decoration: none !important;
            box-shadow: none !important;
            min-width: auto !important;
            min-height: auto !important;
            max-width: none !important;
            max-height: none !important;
            font-family: inherit !important;
            transition: background-color 0.2s ease !important;
        }
    `, document.head.querySelector("style[data-pr0d-styles]") || (i.setAttribute("data-pr0d-styles", "true"), document.head.appendChild(i)), {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backdropFilter: "blur(3px)",
      WebkitBackdropFilter: "blur(3px)",
      // Safari support
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
      opacity: 1,
      transition: "opacity 0.3s ease-out"
    },
    modal: {
      backgroundColor: t,
      borderRadius: 16,
      padding: 24,
      width: 320,
      textAlign: "center",
      position: "relative",
      transform: "translateY(0)",
      transition: "all 0.3s ease-out",
      color: n,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "SF Pro Display", Roboto, "Helvetica Neue", Arial, sans-serif',
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale"
    },
    close: {
      position: "absolute",
      top: 12,
      right: 12,
      border: "none",
      background: Q(t) ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)",
      fontSize: 18,
      cursor: "pointer",
      width: 28,
      height: 28,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s ease",
      color: r
    },
    logo: {
      width: 64,
      height: 64,
      borderRadius: 16,
      margin: "20px auto 24px"
    },
    logoImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: 16
    },
    emailIconContainer: {
      width: 48,
      height: 48,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 12px auto"
    },
    emailIconLarge: {
      width: 40,
      height: 40
    },
    title: {
      fontSize: 18,
      fontWeight: 500,
      marginBottom: 8,
      color: n
    },
    inputContainer: {
      position: "relative",
      width: "100%",
      marginBottom: 16
    },
    inputIcon: {
      position: "absolute",
      left: 16,
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
      pointerEvents: "none",
      zIndex: 1
    },
    inputField: {
      width: "100%",
      padding: "14px 80px 14px 44px",
      fontSize: 15,
      border: `1px solid ${Q(t) ? "#e5e7eb" : "#636363"}`,
      borderRadius: 12,
      outline: "none",
      transition: "border-color 0.2s ease, background-color 5000s ease-in-out 0s",
      boxSizing: "border-box",
      fontWeight: 400,
      color: n,
      backgroundColor: "transparent",
      boxShadow: `inset 0 0 0 1000px transparent, ${Q(t) ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "0 1px 2px rgba(255, 255, 255, 0.05)"}`,
      WebkitBoxShadow: `inset 0 0 0 1000px transparent, ${Q(t) ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "0 1px 2px rgba(255, 255, 255, 0.05)"}`,
      WebkitTextFillColor: n
    },
    inputSubmitButton: {
      position: "absolute",
      right: 8,
      top: "50%",
      transform: "translateY(-50%)",
      background: "transparent",
      border: "none",
      color: "#000",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      padding: "4px 8px",
      borderRadius: 4,
      transition: "all 0.2s ease",
      opacity: 1
    },
    input: {
      width: "100%",
      padding: 12,
      fontSize: 14,
      marginBottom: 16,
      border: `1px solid ${Q(t) ? "#e5e7eb" : "#636363"}`,
      borderRadius: 8,
      outline: "none",
      transition: "border-color 0.2s ease",
      boxSizing: "border-box",
      backgroundColor: "transparent",
      color: n
    },
    submit: {
      width: "100%",
      padding: 10,
      fontSize: 14,
      marginBottom: 12,
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      fontWeight: 600
    },
    altButton: {
      width: "100%",
      padding: "14px 16px",
      marginBottom: 12,
      backgroundColor: "transparent",
      borderRadius: 12,
      border: `1px solid ${Q(t) ? "#e5e7eb" : "#636363"}`,
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: 12,
      fontSize: 15,
      fontWeight: 500,
      color: n,
      boxShadow: Q(t) ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "0 1px 2px rgba(255, 255, 255, 0.05)",
      transition: "all 0.2s ease"
    },
    error: {
      color: "red",
      marginBottom: 10,
      fontSize: 14
    },
    codeText: {
      fontSize: 14,
      marginBottom: 16,
      color: n
    },
    backButton: {
      background: "transparent",
      border: "none",
      color: "#555",
      textDecoration: "underline",
      cursor: "pointer",
      marginTop: 10
    },
    codeContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: 16,
      gap: o ? "4px" : "8px",
      maxWidth: "100%"
    },
    codeInput: {
      width: o ? "calc((100% - 20px) / 6)" : 40,
      height: o ? 44 : 48,
      fontSize: o ? 18 : 20,
      textAlign: "center",
      border: `1px solid ${Q(t) ? "#e5e7eb" : "#636363"}`,
      borderRadius: o ? 6 : 8,
      margin: 0,
      backgroundColor: "transparent",
      color: n,
      minWidth: o ? 0 : 40,
      maxWidth: o ? "none" : 48,
      boxSizing: "border-box"
    },
    orSeparator: {
      textAlign: "center",
      margin: "16px 0",
      fontSize: 14,
      color: "#888"
    },
    mfaContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%"
    },
    verifyButton: {
      marginTop: 20,
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      cursor: "pointer"
    },
    qrCodeContainer: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 16,
      borderRadius: 16,
      border: "2px solid #000000",
      padding: 8,
      backgroundColor: "#ffffff"
    },
    qrCode: {
      width: 200,
      height: 200,
      marginBottom: 16,
      borderRadius: 16,
      border: "2px solid #e5e7eb",
      padding: 8
    },
    mfaTitle: {
      fontSize: 18,
      fontWeight: 500,
      marginBottom: 16
    },
    mfaInstruction: {
      fontSize: 14,
      marginBottom: 20,
      textAlign: "center",
      lineHeight: 1.4
    },
    continueButton: {
      marginTop: 20,
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      cursor: "pointer"
    },
    copyButton: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontSize: 14,
      fontWeight: 500,
      color: r,
      padding: "8px 0",
      marginBottom: 12
    },
    copyIcon: {
      width: 16,
      height: 16,
      flexShrink: 0
    },
    providerIcon: {
      width: 16,
      height: 16,
      flexShrink: 0
    },
    backArrow: {
      position: "absolute",
      top: 12,
      left: 12,
      border: "none",
      background: Q(t) ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)",
      fontSize: 18,
      cursor: "pointer",
      color: r,
      fontWeight: "bold",
      width: 28,
      height: 28,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s ease"
    },
    shieldIcon: {
      display: "flex",
      justifyContent: "center",
      marginBottom: 16
    },
    subtitle: {
      fontSize: 14,
      color: "#666",
      marginBottom: 32,
      textAlign: "center",
      lineHeight: 1.4
    },
    methodContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      width: "100%"
    },
    methodButton: {
      width: "100%",
      padding: 16,
      backgroundColor: "#f8f9fa",
      border: "1px solid #e9ecef",
      borderRadius: 8,
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    methodButtonDisabled: {
      cursor: "not-allowed",
      opacity: 0.6
    },
    methodButtonContent: {
      display: "flex",
      alignItems: "center",
      gap: 12
    },
    methodIcon: {
      width: 24,
      height: 24,
      flexShrink: 0
    },
    methodText: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      flex: 1
    },
    methodTitle: {
      fontSize: 16,
      fontWeight: 500,
      color: "#333"
    },
    recommendedBadgeRight: {
      fontSize: 12,
      fontWeight: 500,
      color: (e == null ? void 0 : e.accent) || "#20c997",
      backgroundColor: aa((e == null ? void 0 : e.accent) || "#20c997"),
      padding: "2px 6px",
      borderRadius: 4,
      marginLeft: "auto"
    },
    arrowIcon: {
      width: 20,
      height: 20,
      flexShrink: 0
    },
    qrCodeWrapper: {
      borderRadius: 8,
      overflow: "hidden"
    },
    qrCodeSvg: {
      borderRadius: 8
    },
    providerLinkContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      width: "100%",
      marginBottom: 24
    },
    providerLinkButton: {
      width: "100%",
      padding: 12,
      backgroundColor: "#f8f9fa",
      border: "1px solid #e9ecef",
      borderRadius: 8,
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      gap: 12,
      fontSize: 14,
      fontWeight: 500
    },
    checkIcon: {
      width: 16,
      height: 16
    },
    passkeyIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16
    },
    passkeySpinner: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16
    },
    successIcon: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 16
    },
    linkedAccountsSection: {
      borderTop: "1px solid #e9ecef",
      paddingTop: 16,
      marginTop: 16
    },
    linkedAccountsTitle: {
      fontSize: 14,
      fontWeight: 600,
      marginBottom: 12,
      color: "#333"
    },
    noLinkedAccounts: {
      fontSize: 14,
      color: "#666",
      fontStyle: "italic",
      textAlign: "center",
      margin: 0
    },
    linkedAccountsList: {
      display: "flex",
      flexDirection: "column",
      gap: 8
    },
    linkedAccount: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: 8,
      backgroundColor: "#f8f9fa",
      borderRadius: 6,
      fontSize: 14
    },
    oauthErrorContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px 0"
    },
    oauthErrorIcon: {
      position: "relative",
      marginBottom: 20
    },
    providerIconLarge: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      padding: 12,
      border: "3px solid #dc3545"
    },
    providerIconLoading: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      padding: 12
    },
    errorCircle: {
      position: "absolute",
      bottom: -4,
      right: -4,
      width: 24,
      height: 24,
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "2px solid #dc3545"
    },
    errorIcon: {
      width: 14,
      height: 14
    },
    oauthErrorTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: "#333",
      margin: "0 0 8px 0"
    },
    oauthErrorMessage: {
      fontSize: 14,
      color: "#666",
      margin: "0 0 24px 0",
      lineHeight: 1.4
    },
    oauthLoadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px 0"
    },
    oauthLoadingIcon: {
      position: "relative",
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    loadingCircle: {
      position: "absolute",
      top: 0,
      left: 0,
      width: 88,
      height: 88,
      border: "3px solid #e3f2fd",
      borderTop: "3px solid #20c997",
      borderRadius: "50%",
      animation: "spin 1s linear infinite"
    },
    oauthLoadingTitle: {
      fontSize: 18,
      fontWeight: 500,
      color: n,
      margin: "0 0 8px 0"
    },
    oauthLoadingMessage: {
      fontSize: 14,
      color: r,
      margin: 0,
      lineHeight: 1.4
    },
    passkeyLoadingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px 0"
    },
    passkeyLoadingIcon: {
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    passkeyLoadingTitle: {
      fontSize: 18,
      fontWeight: 500,
      color: n,
      margin: "0 0 8px 0"
    },
    passkeyLoadingMessage: {
      fontSize: 14,
      color: r,
      margin: 0,
      lineHeight: 1.4
    },
    passkeyDualIcons: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      justifyContent: "center"
    },
    passkeyBiometricIcon: {
      flexShrink: 0
    },
    passkeyOrText: {
      fontSize: 12,
      color: r,
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    passkeySigningContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px 0"
    },
    passkeySigningIcon: {
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    passkeySigningTitle: {
      fontSize: 18,
      fontWeight: 500,
      color: n,
      margin: "0 0 8px 0"
    },
    passkeySigningMessage: {
      fontSize: 14,
      color: r,
      margin: 0,
      lineHeight: 1.4
    },
    passkeyErrorContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px 0"
    },
    passkeyErrorIcon: {
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    passkeyErrorTitle: {
      fontSize: 18,
      fontWeight: 500,
      color: n,
      margin: "0 0 8px 0"
    },
    passkeyErrorMessage: {
      fontSize: 14,
      color: r,
      margin: "0 0 16px 0",
      lineHeight: 1.4
    },
    passkeyErrorButtons: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 8
    },
    retryButton: {
      width: "100%",
      padding: "14px 16px",
      fontSize: 15,
      fontWeight: 500,
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      transition: "all 0.2s ease"
    },
    walletContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "0"
    },
    walletListContainer: {
      display: "flex",
      flexDirection: "column",
      gap: 0,
      width: "100%"
    },
    walletListButton: {
      width: "100%",
      padding: "12px 16px",
      backgroundColor: "#ffffff",
      border: "1px solid #e9ecef",
      borderRadius: 8,
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      textAlign: "left"
    },
    walletListContent: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      gap: 12
    },
    walletIconContainer: {
      width: 40,
      height: 40,
      borderRadius: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0
    },
    walletListIcon: {
      width: 24,
      height: 24
    },
    walletListName: {
      fontSize: 16,
      fontWeight: 500,
      color: n,
      flex: 1
    },
    walletListStatus: {
      marginLeft: "auto"
    },
    statusBadgeBlue: {
      fontSize: 11,
      fontWeight: 600,
      color: "#3B99FC",
      backgroundColor: "transparent",
      padding: "4px 8px",
      borderRadius: 4,
      letterSpacing: "0.5px"
    },
    statusBadgeInstalled: {
      fontSize: 11,
      fontWeight: 600,
      color: "#4CAF50",
      backgroundColor: "transparent",
      padding: "4px 8px",
      borderRadius: 4,
      letterSpacing: "0.5px"
    },
    // statusBadgeNotInstalled: {
    //     fontSize: 11,
    //     fontWeight: 600,
    //     color: '#666',
    //     backgroundColor: '#f5f5f5',
    //     padding: '4px 8px',
    //     borderRadius: 4,
    //     letterSpacing: '0.5px'
    // },
    walletDivider: {
      textAlign: "center",
      margin: "16px 0",
      fontSize: 14,
      color: "#888",
      position: "relative"
    },
    getStartedSection: {
      textAlign: "center",
      marginTop: 8
    },
    getStartedText: {
      fontSize: 14,
      color: r
    },
    getStartedLink: {
      fontSize: 14,
      color: "#007bff",
      textDecoration: "none",
      fontWeight: 500
    },
    walletButton: {
      width: "100%",
      padding: 16,
      border: "1px solid #e9ecef",
      borderRadius: 8,
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center"
    },
    walletButtonContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%"
    },
    walletInfo: {
      display: "flex",
      alignItems: "center",
      gap: 12
    },
    walletName: {
      fontSize: 16,
      fontWeight: 500,
      color: n
    },
    noWalletsMessage: {
      padding: 16,
      backgroundColor: "#f8f9fa",
      borderRadius: 8,
      border: "1px solid #e9ecef",
      textAlign: "center"
    },
    walletConnectingContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "20px 0"
    },
    walletConnectingIcon: {
      position: "relative",
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    walletIconPlaceholder: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      backgroundColor: "#f8f9fa",
      border: "3px solid #20c997",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    walletIconSvg: {
      width: 32,
      height: 32,
      color: r
    },
    walletConnectingLogo: {
      width: 32,
      height: 32,
      borderRadius: 4
    },
    walletConnectingMessage: {
      fontSize: 14,
      color: r,
      margin: 0,
      lineHeight: 1.4
    },
    walletConnectingTitle: {
      fontSize: 18,
      fontWeight: 500,
      color: n,
      margin: "0 0 20px 0"
    },
    walletSuccessContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      padding: "20px 0"
    },
    walletSuccessIcon: {
      marginBottom: 20
    },
    checkIconLarge: {
      width: 64,
      height: 64
    },
    walletSuccessMessage: {
      fontSize: 16,
      fontWeight: 500,
      color: "#333",
      margin: "0 0 8px 0"
    },
    walletSuccessSubMessage: {
      fontSize: 14,
      color: "#666",
      margin: 0,
      fontFamily: "monospace"
    },
    walletGeneratingChallenge: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
      fontSize: 14,
      color: "#666"
    },
    walletSuccessCheckmark: {
      position: "absolute",
      bottom: -4,
      right: -4,
      width: 24,
      height: 24,
      backgroundColor: "white",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    },
    checkIconSmall: {
      width: 16,
      height: 16
    },
    walletIconFallback: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
      fontWeight: "bold",
      color: r,
      borderRadius: "50%"
    },
    walletErrorContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "20px 0"
    },
    walletErrorIconContainer: {
      marginBottom: 20
    },
    walletErrorIconWrapper: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      border: "3px solid #dc3545",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    },
    walletIconError: {
      width: 32,
      height: 32,
      borderRadius: 4
    },
    walletErrorTitle: {
      fontSize: 18,
      fontWeight: 600,
      color: n,
      margin: "0 0 8px 0"
    },
    walletErrorSubtitle: {
      fontSize: 14,
      color: r,
      margin: "0 0 24px 0",
      lineHeight: 1.4
    },
    walletRetryButton: {
      backgroundColor: "#20c997",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "12px 32px",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      transition: "background-color 0.2s ease"
    },
    walletErrorIcon: {
      marginBottom: 20
    },
    errorIconLarge: {
      width: 64,
      height: 64
    },
    walletErrorMessage: {
      fontSize: 14,
      color: r,
      margin: "0 0 24px 0",
      lineHeight: 1.4
    },
    walletSigningContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      margin: "20px 0"
    },
    walletSigningIcon: {
      position: "relative",
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    walletSigningLogo: {
      width: 32,
      height: 32,
      borderRadius: 4
    },
    walletSigningLetter: {
      fontSize: 24,
      fontWeight: 600,
      color: "#4A90E2",
      width: 32,
      height: 32,
      borderRadius: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    walletSigningMessage: {
      fontSize: 14,
      color: r,
      margin: 0,
      lineHeight: 1.4,
      maxWidth: 280
    },
    walletSigningStatus: {
      fontSize: 12,
      color: "#999",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    walletConnectQrContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      width: "100%"
    },
    walletConnectQrCode: {
      marginBottom: 20,
      padding: 16,
      backgroundColor: "#ffffff",
      borderRadius: 16,
      border: "2px solid #e9ecef"
    },
    mobileDeepLinkButton: {
      backgroundColor: "#20c997",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "12px 32px",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      marginTop: 16,
      display: "flex",
      alignItems: "center",
      gap: 8
    },
    mobileIcon: {
      width: 16,
      height: 16,
      flexShrink: 0
    },
    walletSuccessIconContainer: {
      position: "relative",
      marginBottom: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    walletSuccessCircle: {
      width: 64,
      height: 64,
      borderRadius: "50%",
      border: "3px solid #4CAF50",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative"
    }
  };
}, X0 = new rc(), Sh = ({ appId: e, children: t }) => /* @__PURE__ */ d.jsx(Za, { config: xu, children: /* @__PURE__ */ d.jsx(nc, { client: X0, children: /* @__PURE__ */ d.jsx(Q0, { appId: e, children: t }) }) }), kh = () => {
  const e = Ki(sa);
  if (!e)
    throw new Error("usePr0d must be used within a Pr0dProvider");
  return e;
};
export {
  Sh as P,
  vh as a,
  Ch as b,
  xh as c,
  cc as g,
  Cl as s,
  kh as u
};
