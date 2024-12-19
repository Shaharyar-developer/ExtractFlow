var xh = Object.defineProperty;
var Qc = (t) => {
  throw TypeError(t);
};
var qh = (t, e, r) => e in t ? xh(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var Nn = (t, e, r) => qh(t, typeof e != "symbol" ? e + "" : e, r), eu = (t, e, r) => e.has(t) || Qc("Cannot " + r);
var ve = (t, e, r) => (eu(t, e, "read from private field"), r ? r.call(t) : e.get(t)), On = (t, e, r) => e.has(t) ? Qc("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, r), Tn = (t, e, r, n) => (eu(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r);
import Kh, { ipcMain as ra, app as Qt, shell as Gh, BrowserWindow as td } from "electron";
import { fileURLToPath as Zh } from "node:url";
import Te from "node:process";
import de from "node:path";
import { promisify as Ae, isDeepStrictEqual as Hh } from "node:util";
import ae from "node:fs";
import kn from "node:crypto";
import Bh from "node:assert";
import ba from "node:os";
var Wo = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, Xr = (t, e, r) => (Wo(t, e, "read from private field"), r ? r.call(t) : e.get(t)), Os = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, Wh = (t, e, r, n) => (Wo(t, e, "write to private field"), e.set(t, r), r), $o = (t, e, r) => (Wo(t, e, "access private method"), r);
const rd = "electron-trpc";
function Jh(t) {
  return !!t && !Array.isArray(t) && typeof t == "object";
}
class Xh extends Error {
}
function Yh(t) {
  if (t instanceof Error)
    return t;
  const e = typeof t;
  if (!(e === "undefined" || e === "function" || t === null)) {
    if (e !== "object")
      return new Error(String(t));
    if (Jh(t)) {
      const r = new Xh();
      for (const n in t)
        r[n] = t[n];
      return r;
    }
  }
}
class na extends Error {
  constructor(e) {
    const r = Yh(e.cause), n = e.message ?? (r == null ? void 0 : r.message) ?? e.code;
    super(n, {
      cause: r
    }), this.code = e.code, this.name = "TRPCError", this.cause || (this.cause = r);
  }
}
function nd(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const r in t) {
    const n = t[r];
    e[n] = r;
  }
  return e;
}
const sd = {
  /**
  * Invalid JSON was received by the server.
  * An error occurred on the server while parsing the JSON text.
  */
  PARSE_ERROR: -32700,
  /**
  * The JSON sent is not a valid Request object.
  */
  BAD_REQUEST: -32600,
  // Internal JSON-RPC error
  INTERNAL_SERVER_ERROR: -32603,
  NOT_IMPLEMENTED: -32603,
  // Implementation specific errors
  UNAUTHORIZED: -32001,
  FORBIDDEN: -32003,
  NOT_FOUND: -32004,
  METHOD_NOT_SUPPORTED: -32005,
  TIMEOUT: -32008,
  CONFLICT: -32009,
  PRECONDITION_FAILED: -32012,
  PAYLOAD_TOO_LARGE: -32013,
  UNPROCESSABLE_CONTENT: -32022,
  TOO_MANY_REQUESTS: -32029,
  CLIENT_CLOSED_REQUEST: -32099
};
nd(sd);
nd(sd);
function Qh(t) {
  var e;
  const { type: r, path: n } = t;
  if (!(n in t.procedures) || !((e = t.procedures[n]) != null && e._def[r]))
    throw new na({
      code: "NOT_FOUND",
      message: `No "${r}"-procedure on path "${n}"`
    });
  const s = t.procedures[n];
  return s(t);
}
var tu, ru, nu, su, au, ou;
typeof window > "u" || "Deno" in window || ((ru = (tu = globalThis.process) == null ? void 0 : tu.env) == null ? void 0 : ru.NODE_ENV) === "test" || (su = (nu = globalThis.process) == null ? void 0 : nu.env) != null && su.JEST_WORKER_ID || (ou = (au = globalThis.process) == null ? void 0 : au.env) != null && ou.VITEST_WORKER_ID;
function em(t) {
  return typeof t == "object" && t !== null && "subscribe" in t;
}
function iu(t, e) {
  return "error" in e ? {
    ...e,
    error: t.transformer.output.serialize(e.error)
  } : "data" in e.result ? {
    ...e,
    result: {
      ...e.result,
      data: t.transformer.output.serialize(e.result.data)
    }
  } : e;
}
function tm(t, e) {
  return Array.isArray(e) ? e.map((r) => iu(t, r)) : iu(t, e);
}
function cu(t) {
  if (t instanceof na)
    return t;
  const e = rm(t), r = new na({
    code: "INTERNAL_SERVER_ERROR",
    cause: e,
    message: e.message
  });
  return r.stack = e.stack, r;
}
function rm(t) {
  return t instanceof Error ? t : typeof t == "string" ? new Error(t) : new Error("Unknown error");
}
function nm(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var go = { exports: {} }, Za, uu;
function sm() {
  if (uu)
    return Za;
  uu = 1;
  var t = 1e3, e = t * 60, r = e * 60, n = r * 24, s = n * 7, a = n * 365.25;
  Za = function(l, f) {
    f = f || {};
    var v = typeof l;
    if (v === "string" && l.length > 0)
      return o(l);
    if (v === "number" && isFinite(l))
      return f.long ? c(l) : i(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function o(l) {
    if (l = String(l), !(l.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (f) {
        var v = parseFloat(f[1]), g = (f[2] || "ms").toLowerCase();
        switch (g) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return v * a;
          case "weeks":
          case "week":
          case "w":
            return v * s;
          case "days":
          case "day":
          case "d":
            return v * n;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return v * r;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return v * e;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return v * t;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return v;
          default:
            return;
        }
      }
    }
  }
  function i(l) {
    var f = Math.abs(l);
    return f >= n ? Math.round(l / n) + "d" : f >= r ? Math.round(l / r) + "h" : f >= e ? Math.round(l / e) + "m" : f >= t ? Math.round(l / t) + "s" : l + "ms";
  }
  function c(l) {
    var f = Math.abs(l);
    return f >= n ? u(l, f, n, "day") : f >= r ? u(l, f, r, "hour") : f >= e ? u(l, f, e, "minute") : f >= t ? u(l, f, t, "second") : l + " ms";
  }
  function u(l, f, v, g) {
    var y = f >= v * 1.5;
    return Math.round(l / v) + " " + g + (y ? "s" : "");
  }
  return Za;
}
function am(t) {
  r.debug = r, r.default = r, r.coerce = c, r.disable = a, r.enable = s, r.enabled = o, r.humanize = sm(), r.destroy = u, Object.keys(t).forEach((l) => {
    r[l] = t[l];
  }), r.names = [], r.skips = [], r.formatters = {};
  function e(l) {
    let f = 0;
    for (let v = 0; v < l.length; v++)
      f = (f << 5) - f + l.charCodeAt(v), f |= 0;
    return r.colors[Math.abs(f) % r.colors.length];
  }
  r.selectColor = e;
  function r(l) {
    let f, v = null, g, y;
    function w(...$) {
      if (!w.enabled)
        return;
      const m = w, E = Number(/* @__PURE__ */ new Date()), R = E - (f || E);
      m.diff = R, m.prev = f, m.curr = E, f = E, $[0] = r.coerce($[0]), typeof $[0] != "string" && $.unshift("%O");
      let N = 0;
      $[0] = $[0].replace(/%([a-zA-Z%])/g, (O, q) => {
        if (O === "%%")
          return "%";
        N++;
        const Y = r.formatters[q];
        if (typeof Y == "function") {
          const $e = $[N];
          O = Y.call(m, $e), $.splice(N, 1), N--;
        }
        return O;
      }), r.formatArgs.call(m, $), (m.log || r.log).apply(m, $);
    }
    return w.namespace = l, w.useColors = r.useColors(), w.color = r.selectColor(l), w.extend = n, w.destroy = r.destroy, Object.defineProperty(w, "enabled", {
      enumerable: !0,
      configurable: !1,
      get: () => v !== null ? v : (g !== r.namespaces && (g = r.namespaces, y = r.enabled(l)), y),
      set: ($) => {
        v = $;
      }
    }), typeof r.init == "function" && r.init(w), w;
  }
  function n(l, f) {
    const v = r(this.namespace + (typeof f > "u" ? ":" : f) + l);
    return v.log = this.log, v;
  }
  function s(l) {
    r.save(l), r.namespaces = l, r.names = [], r.skips = [];
    let f;
    const v = (typeof l == "string" ? l : "").split(/[\s,]+/), g = v.length;
    for (f = 0; f < g; f++)
      v[f] && (l = v[f].replace(/\*/g, ".*?"), l[0] === "-" ? r.skips.push(new RegExp("^" + l.slice(1) + "$")) : r.names.push(new RegExp("^" + l + "$")));
  }
  function a() {
    const l = [
      ...r.names.map(i),
      ...r.skips.map(i).map((f) => "-" + f)
    ].join(",");
    return r.enable(""), l;
  }
  function o(l) {
    if (l[l.length - 1] === "*")
      return !0;
    let f, v;
    for (f = 0, v = r.skips.length; f < v; f++)
      if (r.skips[f].test(l))
        return !1;
    for (f = 0, v = r.names.length; f < v; f++)
      if (r.names[f].test(l))
        return !0;
    return !1;
  }
  function i(l) {
    return l.toString().substring(2, l.toString().length - 2).replace(/\.\*\?$/, "*");
  }
  function c(l) {
    return l instanceof Error ? l.stack || l.message : l;
  }
  function u() {
    console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
  }
  return r.enable(r.load()), r;
}
var om = am;
(function(t, e) {
  e.formatArgs = n, e.save = s, e.load = a, e.useColors = r, e.storage = o(), e.destroy = /* @__PURE__ */ (() => {
    let c = !1;
    return () => {
      c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), e.colors = [
    "#0000CC",
    "#0000FF",
    "#0033CC",
    "#0033FF",
    "#0066CC",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CC00",
    "#00CC33",
    "#00CC66",
    "#00CC99",
    "#00CCCC",
    "#00CCFF",
    "#3300CC",
    "#3300FF",
    "#3333CC",
    "#3333FF",
    "#3366CC",
    "#3366FF",
    "#3399CC",
    "#3399FF",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33CCFF",
    "#6600CC",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#66CC00",
    "#66CC33",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9933FF",
    "#99CC00",
    "#99CC33",
    "#CC0000",
    "#CC0033",
    "#CC0066",
    "#CC0099",
    "#CC00CC",
    "#CC00FF",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#CC33CC",
    "#CC33FF",
    "#CC6600",
    "#CC6633",
    "#CC9900",
    "#CC9933",
    "#CCCC00",
    "#CCCC33",
    "#FF0000",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF00FF",
    "#FF3300",
    "#FF3333",
    "#FF3366",
    "#FF3399",
    "#FF33CC",
    "#FF33FF",
    "#FF6600",
    "#FF6633",
    "#FF9900",
    "#FF9933",
    "#FFCC00",
    "#FFCC33"
  ];
  function r() {
    return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
    typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
    typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }
  function n(c) {
    if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors)
      return;
    const u = "color: " + this.color;
    c.splice(1, 0, u, "color: inherit");
    let l = 0, f = 0;
    c[0].replace(/%[a-zA-Z%]/g, (v) => {
      v !== "%%" && (l++, v === "%c" && (f = l));
    }), c.splice(f, 0, u);
  }
  e.log = console.debug || console.log || (() => {
  });
  function s(c) {
    try {
      c ? e.storage.setItem("debug", c) : e.storage.removeItem("debug");
    } catch {
    }
  }
  function a() {
    let c;
    try {
      c = e.storage.getItem("debug");
    } catch {
    }
    return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
  }
  function o() {
    try {
      return localStorage;
    } catch {
    }
  }
  t.exports = om(e);
  const { formatters: i } = t.exports;
  i.j = function(c) {
    try {
      return JSON.stringify(c);
    } catch (u) {
      return "[UnexpectedJSONParseError]: " + u.message;
    }
  };
})(go, go.exports);
var im = go.exports;
const ad = /* @__PURE__ */ nm(im), cm = ad("electron-trpc:main:handleIPCMessage");
async function um({
  router: t,
  createContext: e,
  internalId: r,
  message: n,
  event: s,
  subscriptions: a
}) {
  if (n.method === "subscription.stop") {
    const g = a.get(r);
    if (!g)
      return;
    g.unsubscribe(), a.delete(r);
    return;
  }
  const { type: o, input: i, path: c, id: u } = n.operation, l = i ? t._def._config.transformer.input.deserialize(i) : void 0, f = await (e == null ? void 0 : e({ event: s })) ?? {}, v = (g) => {
    s.sender.isDestroyed() || s.reply(rd, tm(t._def._config, g));
  };
  try {
    const g = await Qh({
      ctx: f,
      path: c,
      procedures: t._def.procedures,
      rawInput: l,
      type: o
    });
    if (o !== "subscription") {
      v({
        id: u,
        result: {
          type: "data",
          data: g
        }
      });
      return;
    } else if (!em(g))
      throw new na({
        message: `Subscription ${c} did not return an observable`,
        code: "INTERNAL_SERVER_ERROR"
      });
    const y = g.subscribe({
      next(w) {
        v({
          id: u,
          result: {
            type: "data",
            data: w
          }
        });
      },
      error(w) {
        const $ = cu(w);
        v({
          id: u,
          error: t.getErrorShape({
            error: $,
            type: o,
            path: c,
            input: l,
            ctx: f
          })
        });
      },
      complete() {
        v({
          id: u,
          result: {
            type: "stopped"
          }
        });
      }
    });
    cm("Creating subscription", r), a.set(r, y);
  } catch (g) {
    const y = cu(g);
    return v({
      id: u,
      error: t.getErrorShape({
        error: y,
        type: o,
        path: c,
        input: l,
        ctx: f
      })
    });
  }
}
const Un = ad("electron-trpc:main:IPCHandler"), lm = (t, e) => {
  const r = e.method === "request" ? e.operation.id : e.id;
  return `${t.sender.id}-${t.senderFrame.routingId}:${r}`;
};
var Zr, xn, sa, _o, vo, od;
class dm {
  constructor({
    createContext: e,
    router: r,
    windows: n = []
  }) {
    Os(this, sa), Os(this, vo), Os(this, Zr, []), Os(this, xn, /* @__PURE__ */ new Map()), n.forEach((s) => this.attachWindow(s)), ra.on(rd, (s, a) => {
      um({
        router: r,
        createContext: e,
        internalId: lm(s, a),
        event: s,
        message: a,
        subscriptions: Xr(this, xn)
      });
    });
  }
  attachWindow(e) {
    Xr(this, Zr).includes(e) || (Un("Attaching window", e.id), Xr(this, Zr).push(e), $o(this, vo, od).call(this, e));
  }
  detachWindow(e, r) {
    if (Un("Detaching window", e.id), e.isDestroyed() && r === void 0)
      throw new Error("webContentsId is required when calling detachWindow on a destroyed window");
    Wh(this, Zr, Xr(this, Zr).filter((n) => n !== e)), $o(this, sa, _o).call(this, { webContentsId: r ?? e.webContents.id });
  }
}
Zr = /* @__PURE__ */ new WeakMap(), xn = /* @__PURE__ */ new WeakMap(), sa = /* @__PURE__ */ new WeakSet(), _o = function({
  webContentsId: t,
  frameRoutingId: e
}) {
  for (const [r, n] of Xr(this, xn).entries())
    r.startsWith(`${t}-${e ?? ""}`) && (Un("Closing subscription", r), n.unsubscribe(), Xr(this, xn).delete(r));
}, vo = /* @__PURE__ */ new WeakSet(), od = function(t) {
  const e = t.webContents.id;
  t.webContents.on("did-start-navigation", ({ isSameDocument: r, frame: n }) => {
    r || (Un(
      "Handling hard navigation event",
      `webContentsId: ${e}`,
      `frameRoutingId: ${n.routingId}`
    ), $o(this, sa, _o).call(this, {
      webContentsId: e,
      frameRoutingId: n.routingId
    }));
  }), t.webContents.on("destroyed", () => {
    Un("Handling webContents `destroyed` event"), this.detachWindow(t, e);
  });
};
const fm = ({
  createContext: t,
  router: e,
  windows: r = []
}) => new dm({ createContext: t, router: e, windows: r });
var he;
(function(t) {
  t.assertEqual = (s) => s;
  function e(s) {
  }
  t.assertIs = e;
  function r(s) {
    throw new Error();
  }
  t.assertNever = r, t.arrayToEnum = (s) => {
    const a = {};
    for (const o of s)
      a[o] = o;
    return a;
  }, t.getValidEnumValues = (s) => {
    const a = t.objectKeys(s).filter((i) => typeof s[s[i]] != "number"), o = {};
    for (const i of a)
      o[i] = s[i];
    return t.objectValues(o);
  }, t.objectValues = (s) => t.objectKeys(s).map(function(a) {
    return s[a];
  }), t.objectKeys = typeof Object.keys == "function" ? (s) => Object.keys(s) : (s) => {
    const a = [];
    for (const o in s)
      Object.prototype.hasOwnProperty.call(s, o) && a.push(o);
    return a;
  }, t.find = (s, a) => {
    for (const o of s)
      if (a(o))
        return o;
  }, t.isInteger = typeof Number.isInteger == "function" ? (s) => Number.isInteger(s) : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s;
  function n(s, a = " | ") {
    return s.map((o) => typeof o == "string" ? `'${o}'` : o).join(a);
  }
  t.joinValues = n, t.jsonStringifyReplacer = (s, a) => typeof a == "bigint" ? a.toString() : a;
})(he || (he = {}));
var wo;
(function(t) {
  t.mergeShapes = (e, r) => ({
    ...e,
    ...r
    // second overwrites first
  });
})(wo || (wo = {}));
const V = he.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), kt = (t) => {
  switch (typeof t) {
    case "undefined":
      return V.undefined;
    case "string":
      return V.string;
    case "number":
      return isNaN(t) ? V.nan : V.number;
    case "boolean":
      return V.boolean;
    case "function":
      return V.function;
    case "bigint":
      return V.bigint;
    case "symbol":
      return V.symbol;
    case "object":
      return Array.isArray(t) ? V.array : t === null ? V.null : t.then && typeof t.then == "function" && t.catch && typeof t.catch == "function" ? V.promise : typeof Map < "u" && t instanceof Map ? V.map : typeof Set < "u" && t instanceof Set ? V.set : typeof Date < "u" && t instanceof Date ? V.date : V.object;
    default:
      return V.unknown;
  }
}, j = he.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), hm = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class Xe extends Error {
  get errors() {
    return this.issues;
  }
  constructor(e) {
    super(), this.issues = [], this.addIssue = (n) => {
      this.issues = [...this.issues, n];
    }, this.addIssues = (n = []) => {
      this.issues = [...this.issues, ...n];
    };
    const r = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, r) : this.__proto__ = r, this.name = "ZodError", this.issues = e;
  }
  format(e) {
    const r = e || function(a) {
      return a.message;
    }, n = { _errors: [] }, s = (a) => {
      for (const o of a.issues)
        if (o.code === "invalid_union")
          o.unionErrors.map(s);
        else if (o.code === "invalid_return_type")
          s(o.returnTypeError);
        else if (o.code === "invalid_arguments")
          s(o.argumentsError);
        else if (o.path.length === 0)
          n._errors.push(r(o));
        else {
          let i = n, c = 0;
          for (; c < o.path.length; ) {
            const u = o.path[c];
            c === o.path.length - 1 ? (i[u] = i[u] || { _errors: [] }, i[u]._errors.push(r(o))) : i[u] = i[u] || { _errors: [] }, i = i[u], c++;
          }
        }
    };
    return s(this), n;
  }
  static assert(e) {
    if (!(e instanceof Xe))
      throw new Error(`Not a ZodError: ${e}`);
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, he.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (r) => r.message) {
    const r = {}, n = [];
    for (const s of this.issues)
      s.path.length > 0 ? (r[s.path[0]] = r[s.path[0]] || [], r[s.path[0]].push(e(s))) : n.push(e(s));
    return { formErrors: n, fieldErrors: r };
  }
  get formErrors() {
    return this.flatten();
  }
}
Xe.create = (t) => new Xe(t);
const on = (t, e) => {
  let r;
  switch (t.code) {
    case j.invalid_type:
      t.received === V.undefined ? r = "Required" : r = `Expected ${t.expected}, received ${t.received}`;
      break;
    case j.invalid_literal:
      r = `Invalid literal value, expected ${JSON.stringify(t.expected, he.jsonStringifyReplacer)}`;
      break;
    case j.unrecognized_keys:
      r = `Unrecognized key(s) in object: ${he.joinValues(t.keys, ", ")}`;
      break;
    case j.invalid_union:
      r = "Invalid input";
      break;
    case j.invalid_union_discriminator:
      r = `Invalid discriminator value. Expected ${he.joinValues(t.options)}`;
      break;
    case j.invalid_enum_value:
      r = `Invalid enum value. Expected ${he.joinValues(t.options)}, received '${t.received}'`;
      break;
    case j.invalid_arguments:
      r = "Invalid function arguments";
      break;
    case j.invalid_return_type:
      r = "Invalid function return type";
      break;
    case j.invalid_date:
      r = "Invalid date";
      break;
    case j.invalid_string:
      typeof t.validation == "object" ? "includes" in t.validation ? (r = `Invalid input: must include "${t.validation.includes}"`, typeof t.validation.position == "number" && (r = `${r} at one or more positions greater than or equal to ${t.validation.position}`)) : "startsWith" in t.validation ? r = `Invalid input: must start with "${t.validation.startsWith}"` : "endsWith" in t.validation ? r = `Invalid input: must end with "${t.validation.endsWith}"` : he.assertNever(t.validation) : t.validation !== "regex" ? r = `Invalid ${t.validation}` : r = "Invalid";
      break;
    case j.too_small:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}` : r = "Invalid input";
      break;
    case j.too_big:
      t.type === "array" ? r = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)` : t.type === "string" ? r = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)` : t.type === "number" ? r = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "bigint" ? r = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}` : t.type === "date" ? r = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}` : r = "Invalid input";
      break;
    case j.custom:
      r = "Invalid input";
      break;
    case j.invalid_intersection_types:
      r = "Intersection results could not be merged";
      break;
    case j.not_multiple_of:
      r = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case j.not_finite:
      r = "Number must be finite";
      break;
    default:
      r = e.defaultError, he.assertNever(t);
  }
  return { message: r };
};
let id = on;
function mm(t) {
  id = t;
}
function aa() {
  return id;
}
const oa = (t) => {
  const { data: e, path: r, errorMaps: n, issueData: s } = t, a = [...r, ...s.path || []], o = {
    ...s,
    path: a
  };
  if (s.message !== void 0)
    return {
      ...s,
      path: a,
      message: s.message
    };
  let i = "";
  const c = n.filter((u) => !!u).slice().reverse();
  for (const u of c)
    i = u(o, { data: e, defaultError: i }).message;
  return {
    ...s,
    path: a,
    message: i
  };
}, pm = [];
function A(t, e) {
  const r = aa(), n = oa({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [
      t.common.contextualErrorMap,
      // contextual error map is first priority
      t.schemaErrorMap,
      // then schema-bound map if available
      r,
      // then global override map
      r === on ? void 0 : on
      // then global default map
    ].filter((s) => !!s)
  });
  t.common.issues.push(n);
}
class Fe {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, r) {
    const n = [];
    for (const s of r) {
      if (s.status === "aborted")
        return X;
      s.status === "dirty" && e.dirty(), n.push(s.value);
    }
    return { status: e.value, value: n };
  }
  static async mergeObjectAsync(e, r) {
    const n = [];
    for (const s of r) {
      const a = await s.key, o = await s.value;
      n.push({
        key: a,
        value: o
      });
    }
    return Fe.mergeObjectSync(e, n);
  }
  static mergeObjectSync(e, r) {
    const n = {};
    for (const s of r) {
      const { key: a, value: o } = s;
      if (a.status === "aborted" || o.status === "aborted")
        return X;
      a.status === "dirty" && e.dirty(), o.status === "dirty" && e.dirty(), a.value !== "__proto__" && (typeof o.value < "u" || s.alwaysSet) && (n[a.value] = o.value);
    }
    return { status: e.value, value: n };
  }
}
const X = Object.freeze({
  status: "aborted"
}), Yr = (t) => ({ status: "dirty", value: t }), qe = (t) => ({ status: "valid", value: t }), Eo = (t) => t.status === "aborted", bo = (t) => t.status === "dirty", Cr = (t) => t.status === "valid", rs = (t) => typeof Promise < "u" && t instanceof Promise;
function ia(t, e, r, n) {
  if (typeof e == "function" ? t !== e || !n : !e.has(t)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return e.get(t);
}
function cd(t, e, r, n, s) {
  if (typeof e == "function" ? t !== e || !s : !e.has(t)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(t, r), r;
}
var x;
(function(t) {
  t.errToObj = (e) => typeof e == "string" ? { message: e } : e || {}, t.toString = (e) => typeof e == "string" ? e : e == null ? void 0 : e.message;
})(x || (x = {}));
var Mn, Vn;
class St {
  constructor(e, r, n, s) {
    this._cachedPath = [], this.parent = e, this.data = r, this._path = n, this._key = s;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const lu = (t, e) => {
  if (Cr(e))
    return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const r = new Xe(t.common.issues);
      return this._error = r, this._error;
    }
  };
};
function te(t) {
  if (!t)
    return {};
  const { errorMap: e, invalid_type_error: r, required_error: n, description: s } = t;
  if (e && (r || n))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return e ? { errorMap: e, description: s } : { errorMap: (o, i) => {
    var c, u;
    const { message: l } = t;
    return o.code === "invalid_enum_value" ? { message: l ?? i.defaultError } : typeof i.data > "u" ? { message: (c = l ?? n) !== null && c !== void 0 ? c : i.defaultError } : o.code !== "invalid_type" ? { message: i.defaultError } : { message: (u = l ?? r) !== null && u !== void 0 ? u : i.defaultError };
  }, description: s };
}
class oe {
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return kt(e.data);
  }
  _getOrReturnCtx(e, r) {
    return r || {
      common: e.parent.common,
      data: e.data,
      parsedType: kt(e.data),
      schemaErrorMap: this._def.errorMap,
      path: e.path,
      parent: e.parent
    };
  }
  _processInputParams(e) {
    return {
      status: new Fe(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: kt(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent
      }
    };
  }
  _parseSync(e) {
    const r = this._parse(e);
    if (rs(r))
      throw new Error("Synchronous parse encountered promise.");
    return r;
  }
  _parseAsync(e) {
    const r = this._parse(e);
    return Promise.resolve(r);
  }
  parse(e, r) {
    const n = this.safeParse(e, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  safeParse(e, r) {
    var n;
    const s = {
      common: {
        issues: [],
        async: (n = r == null ? void 0 : r.async) !== null && n !== void 0 ? n : !1,
        contextualErrorMap: r == null ? void 0 : r.errorMap
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: kt(e)
    }, a = this._parseSync({ data: e, path: s.path, parent: s });
    return lu(s, a);
  }
  "~validate"(e) {
    var r, n;
    const s = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: kt(e)
    };
    if (!this["~standard"].async)
      try {
        const a = this._parseSync({ data: e, path: [], parent: s });
        return Cr(a) ? {
          value: a.value
        } : {
          issues: s.common.issues
        };
      } catch (a) {
        !((n = (r = a == null ? void 0 : a.message) === null || r === void 0 ? void 0 : r.toLowerCase()) === null || n === void 0) && n.includes("encountered") && (this["~standard"].async = !0), s.common = {
          issues: [],
          async: !0
        };
      }
    return this._parseAsync({ data: e, path: [], parent: s }).then((a) => Cr(a) ? {
      value: a.value
    } : {
      issues: s.common.issues
    });
  }
  async parseAsync(e, r) {
    const n = await this.safeParseAsync(e, r);
    if (n.success)
      return n.data;
    throw n.error;
  }
  async safeParseAsync(e, r) {
    const n = {
      common: {
        issues: [],
        contextualErrorMap: r == null ? void 0 : r.errorMap,
        async: !0
      },
      path: (r == null ? void 0 : r.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: e,
      parsedType: kt(e)
    }, s = this._parse({ data: e, path: n.path, parent: n }), a = await (rs(s) ? s : Promise.resolve(s));
    return lu(n, a);
  }
  refine(e, r) {
    const n = (s) => typeof r == "string" || typeof r > "u" ? { message: r } : typeof r == "function" ? r(s) : r;
    return this._refinement((s, a) => {
      const o = e(s), i = () => a.addIssue({
        code: j.custom,
        ...n(s)
      });
      return typeof Promise < "u" && o instanceof Promise ? o.then((c) => c ? !0 : (i(), !1)) : o ? !0 : (i(), !1);
    });
  }
  refinement(e, r) {
    return this._refinement((n, s) => e(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1));
  }
  _refinement(e) {
    return new ft({
      schema: this,
      typeName: J.ZodEffects,
      effect: { type: "refinement", refinement: e }
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  constructor(e) {
    this.spa = this.safeParseAsync, this._def = e, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this), this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (r) => this["~validate"](r)
    };
  }
  optional() {
    return bt.create(this, this._def);
  }
  nullable() {
    return ar.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ut.create(this);
  }
  promise() {
    return un.create(this, this._def);
  }
  or(e) {
    return os.create([this, e], this._def);
  }
  and(e) {
    return is.create(this, e, this._def);
  }
  transform(e) {
    return new ft({
      ...te(this._def),
      schema: this,
      typeName: J.ZodEffects,
      effect: { type: "transform", transform: e }
    });
  }
  default(e) {
    const r = typeof e == "function" ? e : () => e;
    return new fs({
      ...te(this._def),
      innerType: this,
      defaultValue: r,
      typeName: J.ZodDefault
    });
  }
  brand() {
    return new Jo({
      typeName: J.ZodBranded,
      type: this,
      ...te(this._def)
    });
  }
  catch(e) {
    const r = typeof e == "function" ? e : () => e;
    return new hs({
      ...te(this._def),
      innerType: this,
      catchValue: r,
      typeName: J.ZodCatch
    });
  }
  describe(e) {
    const r = this.constructor;
    return new r({
      ...this._def,
      description: e
    });
  }
  pipe(e) {
    return vs.create(this, e);
  }
  readonly() {
    return ms.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const ym = /^c[^\s-]{8,}$/i, $m = /^[0-9a-z]+$/, gm = /^[0-9A-HJKMNP-TV-Z]{26}$/i, _m = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, vm = /^[a-z0-9_-]{21}$/i, wm = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/, Em = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/, bm = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, Sm = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let Ha;
const Pm = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/, Rm = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/, Nm = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/, Om = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/, Tm = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/, km = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/, ud = "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))", Im = new RegExp(`^${ud}$`);
function ld(t) {
  let e = "([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d";
  return t.precision ? e = `${e}\\.\\d{${t.precision}}` : t.precision == null && (e = `${e}(\\.\\d+)?`), e;
}
function Cm(t) {
  return new RegExp(`^${ld(t)}$`);
}
function dd(t) {
  let e = `${ud}T${ld(t)}`;
  const r = [];
  return r.push(t.local ? "Z?" : "Z"), t.offset && r.push("([+-]\\d{2}:?\\d{2})"), e = `${e}(${r.join("|")})`, new RegExp(`^${e}$`);
}
function jm(t, e) {
  return !!((e === "v4" || !e) && Pm.test(t) || (e === "v6" || !e) && Nm.test(t));
}
function Am(t, e) {
  if (!wm.test(t))
    return !1;
  try {
    const [r] = t.split("."), n = r.replace(/-/g, "+").replace(/_/g, "/").padEnd(r.length + (4 - r.length % 4) % 4, "="), s = JSON.parse(atob(n));
    return !(typeof s != "object" || s === null || !s.typ || !s.alg || e && s.alg !== e);
  } catch {
    return !1;
  }
}
function Dm(t, e) {
  return !!((e === "v4" || !e) && Rm.test(t) || (e === "v6" || !e) && Om.test(t));
}
class ct extends oe {
  _parse(e) {
    if (this._def.coerce && (e.data = String(e.data)), this._getType(e) !== V.string) {
      const a = this._getOrReturnCtx(e);
      return A(a, {
        code: j.invalid_type,
        expected: V.string,
        received: a.parsedType
      }), X;
    }
    const n = new Fe();
    let s;
    for (const a of this._def.checks)
      if (a.kind === "min")
        e.data.length < a.value && (s = this._getOrReturnCtx(e, s), A(s, {
          code: j.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "max")
        e.data.length > a.value && (s = this._getOrReturnCtx(e, s), A(s, {
          code: j.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: a.message
        }), n.dirty());
      else if (a.kind === "length") {
        const o = e.data.length > a.value, i = e.data.length < a.value;
        (o || i) && (s = this._getOrReturnCtx(e, s), o ? A(s, {
          code: j.too_big,
          maximum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }) : i && A(s, {
          code: j.too_small,
          minimum: a.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: a.message
        }), n.dirty());
      } else if (a.kind === "email")
        bm.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
          validation: "email",
          code: j.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "emoji")
        Ha || (Ha = new RegExp(Sm, "u")), Ha.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
          validation: "emoji",
          code: j.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "uuid")
        _m.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
          validation: "uuid",
          code: j.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "nanoid")
        vm.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
          validation: "nanoid",
          code: j.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid")
        ym.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
          validation: "cuid",
          code: j.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "cuid2")
        $m.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
          validation: "cuid2",
          code: j.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "ulid")
        gm.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
          validation: "ulid",
          code: j.invalid_string,
          message: a.message
        }), n.dirty());
      else if (a.kind === "url")
        try {
          new URL(e.data);
        } catch {
          s = this._getOrReturnCtx(e, s), A(s, {
            validation: "url",
            code: j.invalid_string,
            message: a.message
          }), n.dirty();
        }
      else a.kind === "regex" ? (a.regex.lastIndex = 0, a.regex.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
        validation: "regex",
        code: j.invalid_string,
        message: a.message
      }), n.dirty())) : a.kind === "trim" ? e.data = e.data.trim() : a.kind === "includes" ? e.data.includes(a.value, a.position) || (s = this._getOrReturnCtx(e, s), A(s, {
        code: j.invalid_string,
        validation: { includes: a.value, position: a.position },
        message: a.message
      }), n.dirty()) : a.kind === "toLowerCase" ? e.data = e.data.toLowerCase() : a.kind === "toUpperCase" ? e.data = e.data.toUpperCase() : a.kind === "startsWith" ? e.data.startsWith(a.value) || (s = this._getOrReturnCtx(e, s), A(s, {
        code: j.invalid_string,
        validation: { startsWith: a.value },
        message: a.message
      }), n.dirty()) : a.kind === "endsWith" ? e.data.endsWith(a.value) || (s = this._getOrReturnCtx(e, s), A(s, {
        code: j.invalid_string,
        validation: { endsWith: a.value },
        message: a.message
      }), n.dirty()) : a.kind === "datetime" ? dd(a).test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
        code: j.invalid_string,
        validation: "datetime",
        message: a.message
      }), n.dirty()) : a.kind === "date" ? Im.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
        code: j.invalid_string,
        validation: "date",
        message: a.message
      }), n.dirty()) : a.kind === "time" ? Cm(a).test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
        code: j.invalid_string,
        validation: "time",
        message: a.message
      }), n.dirty()) : a.kind === "duration" ? Em.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
        validation: "duration",
        code: j.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "ip" ? jm(e.data, a.version) || (s = this._getOrReturnCtx(e, s), A(s, {
        validation: "ip",
        code: j.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "jwt" ? Am(e.data, a.alg) || (s = this._getOrReturnCtx(e, s), A(s, {
        validation: "jwt",
        code: j.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "cidr" ? Dm(e.data, a.version) || (s = this._getOrReturnCtx(e, s), A(s, {
        validation: "cidr",
        code: j.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "base64" ? Tm.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
        validation: "base64",
        code: j.invalid_string,
        message: a.message
      }), n.dirty()) : a.kind === "base64url" ? km.test(e.data) || (s = this._getOrReturnCtx(e, s), A(s, {
        validation: "base64url",
        code: j.invalid_string,
        message: a.message
      }), n.dirty()) : he.assertNever(a);
    return { status: n.value, value: e.data };
  }
  _regex(e, r, n) {
    return this.refinement((s) => e.test(s), {
      validation: r,
      code: j.invalid_string,
      ...x.errToObj(n)
    });
  }
  _addCheck(e) {
    return new ct({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...x.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...x.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...x.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...x.errToObj(e) });
  }
  nanoid(e) {
    return this._addCheck({ kind: "nanoid", ...x.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...x.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...x.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...x.errToObj(e) });
  }
  base64(e) {
    return this._addCheck({ kind: "base64", ...x.errToObj(e) });
  }
  base64url(e) {
    return this._addCheck({
      kind: "base64url",
      ...x.errToObj(e)
    });
  }
  jwt(e) {
    return this._addCheck({ kind: "jwt", ...x.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...x.errToObj(e) });
  }
  cidr(e) {
    return this._addCheck({ kind: "cidr", ...x.errToObj(e) });
  }
  datetime(e) {
    var r, n;
    return typeof e == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      local: !1,
      message: e
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      offset: (r = e == null ? void 0 : e.offset) !== null && r !== void 0 ? r : !1,
      local: (n = e == null ? void 0 : e.local) !== null && n !== void 0 ? n : !1,
      ...x.errToObj(e == null ? void 0 : e.message)
    });
  }
  date(e) {
    return this._addCheck({ kind: "date", message: e });
  }
  time(e) {
    return typeof e == "string" ? this._addCheck({
      kind: "time",
      precision: null,
      message: e
    }) : this._addCheck({
      kind: "time",
      precision: typeof (e == null ? void 0 : e.precision) > "u" ? null : e == null ? void 0 : e.precision,
      ...x.errToObj(e == null ? void 0 : e.message)
    });
  }
  duration(e) {
    return this._addCheck({ kind: "duration", ...x.errToObj(e) });
  }
  regex(e, r) {
    return this._addCheck({
      kind: "regex",
      regex: e,
      ...x.errToObj(r)
    });
  }
  includes(e, r) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: r == null ? void 0 : r.position,
      ...x.errToObj(r == null ? void 0 : r.message)
    });
  }
  startsWith(e, r) {
    return this._addCheck({
      kind: "startsWith",
      value: e,
      ...x.errToObj(r)
    });
  }
  endsWith(e, r) {
    return this._addCheck({
      kind: "endsWith",
      value: e,
      ...x.errToObj(r)
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e,
      ...x.errToObj(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e,
      ...x.errToObj(r)
    });
  }
  length(e, r) {
    return this._addCheck({
      kind: "length",
      value: e,
      ...x.errToObj(r)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(e) {
    return this.min(1, x.errToObj(e));
  }
  trim() {
    return new ct({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ct({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ct({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((e) => e.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((e) => e.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((e) => e.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((e) => e.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((e) => e.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((e) => e.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((e) => e.kind === "base64url");
  }
  get minLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
ct.create = (t) => {
  var e;
  return new ct({
    checks: [],
    typeName: J.ZodString,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...te(t)
  });
};
function Mm(t, e) {
  const r = (t.toString().split(".")[1] || "").length, n = (e.toString().split(".")[1] || "").length, s = r > n ? r : n, a = parseInt(t.toFixed(s).replace(".", "")), o = parseInt(e.toFixed(s).replace(".", ""));
  return a % o / Math.pow(10, s);
}
class rr extends oe {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(e) {
    if (this._def.coerce && (e.data = Number(e.data)), this._getType(e) !== V.number) {
      const a = this._getOrReturnCtx(e);
      return A(a, {
        code: j.invalid_type,
        expected: V.number,
        received: a.parsedType
      }), X;
    }
    let n;
    const s = new Fe();
    for (const a of this._def.checks)
      a.kind === "int" ? he.isInteger(e.data) || (n = this._getOrReturnCtx(e, n), A(n, {
        code: j.invalid_type,
        expected: "integer",
        received: "float",
        message: a.message
      }), s.dirty()) : a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), A(n, {
        code: j.too_small,
        minimum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), A(n, {
        code: j.too_big,
        maximum: a.value,
        type: "number",
        inclusive: a.inclusive,
        exact: !1,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? Mm(e.data, a.value) !== 0 && (n = this._getOrReturnCtx(e, n), A(n, {
        code: j.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : a.kind === "finite" ? Number.isFinite(e.data) || (n = this._getOrReturnCtx(e, n), A(n, {
        code: j.not_finite,
        message: a.message
      }), s.dirty()) : he.assertNever(a);
    return { status: s.value, value: e.data };
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, x.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, x.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, x.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, x.toString(r));
  }
  setLimit(e, r, n, s) {
    return new rr({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: x.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new rr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  int(e) {
    return this._addCheck({
      kind: "int",
      message: x.toString(e)
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: x.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: x.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: x.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: x.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: x.toString(r)
    });
  }
  finite(e) {
    return this._addCheck({
      kind: "finite",
      message: x.toString(e)
    });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: x.toString(e)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: x.toString(e)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find((e) => e.kind === "int" || e.kind === "multipleOf" && he.isInteger(e.value));
  }
  get isFinite() {
    let e = null, r = null;
    for (const n of this._def.checks) {
      if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
        return !0;
      n.kind === "min" ? (r === null || n.value > r) && (r = n.value) : n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    }
    return Number.isFinite(r) && Number.isFinite(e);
  }
}
rr.create = (t) => new rr({
  checks: [],
  typeName: J.ZodNumber,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...te(t)
});
class nr extends oe {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(e) {
    if (this._def.coerce)
      try {
        e.data = BigInt(e.data);
      } catch {
        return this._getInvalidInput(e);
      }
    if (this._getType(e) !== V.bigint)
      return this._getInvalidInput(e);
    let n;
    const s = new Fe();
    for (const a of this._def.checks)
      a.kind === "min" ? (a.inclusive ? e.data < a.value : e.data <= a.value) && (n = this._getOrReturnCtx(e, n), A(n, {
        code: j.too_small,
        type: "bigint",
        minimum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "max" ? (a.inclusive ? e.data > a.value : e.data >= a.value) && (n = this._getOrReturnCtx(e, n), A(n, {
        code: j.too_big,
        type: "bigint",
        maximum: a.value,
        inclusive: a.inclusive,
        message: a.message
      }), s.dirty()) : a.kind === "multipleOf" ? e.data % a.value !== BigInt(0) && (n = this._getOrReturnCtx(e, n), A(n, {
        code: j.not_multiple_of,
        multipleOf: a.value,
        message: a.message
      }), s.dirty()) : he.assertNever(a);
    return { status: s.value, value: e.data };
  }
  _getInvalidInput(e) {
    const r = this._getOrReturnCtx(e);
    return A(r, {
      code: j.invalid_type,
      expected: V.bigint,
      received: r.parsedType
    }), X;
  }
  gte(e, r) {
    return this.setLimit("min", e, !0, x.toString(r));
  }
  gt(e, r) {
    return this.setLimit("min", e, !1, x.toString(r));
  }
  lte(e, r) {
    return this.setLimit("max", e, !0, x.toString(r));
  }
  lt(e, r) {
    return this.setLimit("max", e, !1, x.toString(r));
  }
  setLimit(e, r, n, s) {
    return new nr({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: e,
          value: r,
          inclusive: n,
          message: x.toString(s)
        }
      ]
    });
  }
  _addCheck(e) {
    return new nr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: x.toString(e)
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: x.toString(e)
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: x.toString(e)
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: x.toString(e)
    });
  }
  multipleOf(e, r) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: x.toString(r)
    });
  }
  get minValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e;
  }
}
nr.create = (t) => {
  var e;
  return new nr({
    checks: [],
    typeName: J.ZodBigInt,
    coerce: (e = t == null ? void 0 : t.coerce) !== null && e !== void 0 ? e : !1,
    ...te(t)
  });
};
class ns extends oe {
  _parse(e) {
    if (this._def.coerce && (e.data = !!e.data), this._getType(e) !== V.boolean) {
      const n = this._getOrReturnCtx(e);
      return A(n, {
        code: j.invalid_type,
        expected: V.boolean,
        received: n.parsedType
      }), X;
    }
    return qe(e.data);
  }
}
ns.create = (t) => new ns({
  typeName: J.ZodBoolean,
  coerce: (t == null ? void 0 : t.coerce) || !1,
  ...te(t)
});
class jr extends oe {
  _parse(e) {
    if (this._def.coerce && (e.data = new Date(e.data)), this._getType(e) !== V.date) {
      const a = this._getOrReturnCtx(e);
      return A(a, {
        code: j.invalid_type,
        expected: V.date,
        received: a.parsedType
      }), X;
    }
    if (isNaN(e.data.getTime())) {
      const a = this._getOrReturnCtx(e);
      return A(a, {
        code: j.invalid_date
      }), X;
    }
    const n = new Fe();
    let s;
    for (const a of this._def.checks)
      a.kind === "min" ? e.data.getTime() < a.value && (s = this._getOrReturnCtx(e, s), A(s, {
        code: j.too_small,
        message: a.message,
        inclusive: !0,
        exact: !1,
        minimum: a.value,
        type: "date"
      }), n.dirty()) : a.kind === "max" ? e.data.getTime() > a.value && (s = this._getOrReturnCtx(e, s), A(s, {
        code: j.too_big,
        message: a.message,
        inclusive: !0,
        exact: !1,
        maximum: a.value,
        type: "date"
      }), n.dirty()) : he.assertNever(a);
    return {
      status: n.value,
      value: new Date(e.data.getTime())
    };
  }
  _addCheck(e) {
    return new jr({
      ...this._def,
      checks: [...this._def.checks, e]
    });
  }
  min(e, r) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: x.toString(r)
    });
  }
  max(e, r) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: x.toString(r)
    });
  }
  get minDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "min" && (e === null || r.value > e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const r of this._def.checks)
      r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    return e != null ? new Date(e) : null;
  }
}
jr.create = (t) => new jr({
  checks: [],
  coerce: (t == null ? void 0 : t.coerce) || !1,
  typeName: J.ZodDate,
  ...te(t)
});
class ca extends oe {
  _parse(e) {
    if (this._getType(e) !== V.symbol) {
      const n = this._getOrReturnCtx(e);
      return A(n, {
        code: j.invalid_type,
        expected: V.symbol,
        received: n.parsedType
      }), X;
    }
    return qe(e.data);
  }
}
ca.create = (t) => new ca({
  typeName: J.ZodSymbol,
  ...te(t)
});
class ss extends oe {
  _parse(e) {
    if (this._getType(e) !== V.undefined) {
      const n = this._getOrReturnCtx(e);
      return A(n, {
        code: j.invalid_type,
        expected: V.undefined,
        received: n.parsedType
      }), X;
    }
    return qe(e.data);
  }
}
ss.create = (t) => new ss({
  typeName: J.ZodUndefined,
  ...te(t)
});
class as extends oe {
  _parse(e) {
    if (this._getType(e) !== V.null) {
      const n = this._getOrReturnCtx(e);
      return A(n, {
        code: j.invalid_type,
        expected: V.null,
        received: n.parsedType
      }), X;
    }
    return qe(e.data);
  }
}
as.create = (t) => new as({
  typeName: J.ZodNull,
  ...te(t)
});
class cn extends oe {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(e) {
    return qe(e.data);
  }
}
cn.create = (t) => new cn({
  typeName: J.ZodAny,
  ...te(t)
});
class Ir extends oe {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(e) {
    return qe(e.data);
  }
}
Ir.create = (t) => new Ir({
  typeName: J.ZodUnknown,
  ...te(t)
});
class Vt extends oe {
  _parse(e) {
    const r = this._getOrReturnCtx(e);
    return A(r, {
      code: j.invalid_type,
      expected: V.never,
      received: r.parsedType
    }), X;
  }
}
Vt.create = (t) => new Vt({
  typeName: J.ZodNever,
  ...te(t)
});
class ua extends oe {
  _parse(e) {
    if (this._getType(e) !== V.undefined) {
      const n = this._getOrReturnCtx(e);
      return A(n, {
        code: j.invalid_type,
        expected: V.void,
        received: n.parsedType
      }), X;
    }
    return qe(e.data);
  }
}
ua.create = (t) => new ua({
  typeName: J.ZodVoid,
  ...te(t)
});
class ut extends oe {
  _parse(e) {
    const { ctx: r, status: n } = this._processInputParams(e), s = this._def;
    if (r.parsedType !== V.array)
      return A(r, {
        code: j.invalid_type,
        expected: V.array,
        received: r.parsedType
      }), X;
    if (s.exactLength !== null) {
      const o = r.data.length > s.exactLength.value, i = r.data.length < s.exactLength.value;
      (o || i) && (A(r, {
        code: o ? j.too_big : j.too_small,
        minimum: i ? s.exactLength.value : void 0,
        maximum: o ? s.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: s.exactLength.message
      }), n.dirty());
    }
    if (s.minLength !== null && r.data.length < s.minLength.value && (A(r, {
      code: j.too_small,
      minimum: s.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.minLength.message
    }), n.dirty()), s.maxLength !== null && r.data.length > s.maxLength.value && (A(r, {
      code: j.too_big,
      maximum: s.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: s.maxLength.message
    }), n.dirty()), r.common.async)
      return Promise.all([...r.data].map((o, i) => s.type._parseAsync(new St(r, o, r.path, i)))).then((o) => Fe.mergeArray(n, o));
    const a = [...r.data].map((o, i) => s.type._parseSync(new St(r, o, r.path, i)));
    return Fe.mergeArray(n, a);
  }
  get element() {
    return this._def.type;
  }
  min(e, r) {
    return new ut({
      ...this._def,
      minLength: { value: e, message: x.toString(r) }
    });
  }
  max(e, r) {
    return new ut({
      ...this._def,
      maxLength: { value: e, message: x.toString(r) }
    });
  }
  length(e, r) {
    return new ut({
      ...this._def,
      exactLength: { value: e, message: x.toString(r) }
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
ut.create = (t, e) => new ut({
  type: t,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: J.ZodArray,
  ...te(e)
});
function Hr(t) {
  if (t instanceof Ee) {
    const e = {};
    for (const r in t.shape) {
      const n = t.shape[r];
      e[r] = bt.create(Hr(n));
    }
    return new Ee({
      ...t._def,
      shape: () => e
    });
  } else return t instanceof ut ? new ut({
    ...t._def,
    type: Hr(t.element)
  }) : t instanceof bt ? bt.create(Hr(t.unwrap())) : t instanceof ar ? ar.create(Hr(t.unwrap())) : t instanceof Pt ? Pt.create(t.items.map((e) => Hr(e))) : t;
}
class Ee extends oe {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const e = this._def.shape(), r = he.objectKeys(e);
    return this._cached = { shape: e, keys: r };
  }
  _parse(e) {
    if (this._getType(e) !== V.object) {
      const u = this._getOrReturnCtx(e);
      return A(u, {
        code: j.invalid_type,
        expected: V.object,
        received: u.parsedType
      }), X;
    }
    const { status: n, ctx: s } = this._processInputParams(e), { shape: a, keys: o } = this._getCached(), i = [];
    if (!(this._def.catchall instanceof Vt && this._def.unknownKeys === "strip"))
      for (const u in s.data)
        o.includes(u) || i.push(u);
    const c = [];
    for (const u of o) {
      const l = a[u], f = s.data[u];
      c.push({
        key: { status: "valid", value: u },
        value: l._parse(new St(s, f, s.path, u)),
        alwaysSet: u in s.data
      });
    }
    if (this._def.catchall instanceof Vt) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const l of i)
          c.push({
            key: { status: "valid", value: l },
            value: { status: "valid", value: s.data[l] }
          });
      else if (u === "strict")
        i.length > 0 && (A(s, {
          code: j.unrecognized_keys,
          keys: i
        }), n.dirty());
      else if (u !== "strip") throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const l of i) {
        const f = s.data[l];
        c.push({
          key: { status: "valid", value: l },
          value: u._parse(
            new St(s, f, s.path, l)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: l in s.data
        });
      }
    }
    return s.common.async ? Promise.resolve().then(async () => {
      const u = [];
      for (const l of c) {
        const f = await l.key, v = await l.value;
        u.push({
          key: f,
          value: v,
          alwaysSet: l.alwaysSet
        });
      }
      return u;
    }).then((u) => Fe.mergeObjectSync(n, u)) : Fe.mergeObjectSync(n, c);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return x.errToObj, new Ee({
      ...this._def,
      unknownKeys: "strict",
      ...e !== void 0 ? {
        errorMap: (r, n) => {
          var s, a, o, i;
          const c = (o = (a = (s = this._def).errorMap) === null || a === void 0 ? void 0 : a.call(s, r, n).message) !== null && o !== void 0 ? o : n.defaultError;
          return r.code === "unrecognized_keys" ? {
            message: (i = x.errToObj(e).message) !== null && i !== void 0 ? i : c
          } : {
            message: c
          };
        }
      } : {}
    });
  }
  strip() {
    return new Ee({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new Ee({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(e) {
    return new Ee({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...e
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(e) {
    return new Ee({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...e._def.shape()
      }),
      typeName: J.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(e, r) {
    return this.augment({ [e]: r });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(e) {
    return new Ee({
      ...this._def,
      catchall: e
    });
  }
  pick(e) {
    const r = {};
    return he.objectKeys(e).forEach((n) => {
      e[n] && this.shape[n] && (r[n] = this.shape[n]);
    }), new Ee({
      ...this._def,
      shape: () => r
    });
  }
  omit(e) {
    const r = {};
    return he.objectKeys(this.shape).forEach((n) => {
      e[n] || (r[n] = this.shape[n]);
    }), new Ee({
      ...this._def,
      shape: () => r
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return Hr(this);
  }
  partial(e) {
    const r = {};
    return he.objectKeys(this.shape).forEach((n) => {
      const s = this.shape[n];
      e && !e[n] ? r[n] = s : r[n] = s.optional();
    }), new Ee({
      ...this._def,
      shape: () => r
    });
  }
  required(e) {
    const r = {};
    return he.objectKeys(this.shape).forEach((n) => {
      if (e && !e[n])
        r[n] = this.shape[n];
      else {
        let a = this.shape[n];
        for (; a instanceof bt; )
          a = a._def.innerType;
        r[n] = a;
      }
    }), new Ee({
      ...this._def,
      shape: () => r
    });
  }
  keyof() {
    return fd(he.objectKeys(this.shape));
  }
}
Ee.create = (t, e) => new Ee({
  shape: () => t,
  unknownKeys: "strip",
  catchall: Vt.create(),
  typeName: J.ZodObject,
  ...te(e)
});
Ee.strictCreate = (t, e) => new Ee({
  shape: () => t,
  unknownKeys: "strict",
  catchall: Vt.create(),
  typeName: J.ZodObject,
  ...te(e)
});
Ee.lazycreate = (t, e) => new Ee({
  shape: t,
  unknownKeys: "strip",
  catchall: Vt.create(),
  typeName: J.ZodObject,
  ...te(e)
});
class os extends oe {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = this._def.options;
    function s(a) {
      for (const i of a)
        if (i.result.status === "valid")
          return i.result;
      for (const i of a)
        if (i.result.status === "dirty")
          return r.common.issues.push(...i.ctx.common.issues), i.result;
      const o = a.map((i) => new Xe(i.ctx.common.issues));
      return A(r, {
        code: j.invalid_union,
        unionErrors: o
      }), X;
    }
    if (r.common.async)
      return Promise.all(n.map(async (a) => {
        const o = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await a._parseAsync({
            data: r.data,
            path: r.path,
            parent: o
          }),
          ctx: o
        };
      })).then(s);
    {
      let a;
      const o = [];
      for (const c of n) {
        const u = {
          ...r,
          common: {
            ...r.common,
            issues: []
          },
          parent: null
        }, l = c._parseSync({
          data: r.data,
          path: r.path,
          parent: u
        });
        if (l.status === "valid")
          return l;
        l.status === "dirty" && !a && (a = { result: l, ctx: u }), u.common.issues.length && o.push(u.common.issues);
      }
      if (a)
        return r.common.issues.push(...a.ctx.common.issues), a.result;
      const i = o.map((c) => new Xe(c));
      return A(r, {
        code: j.invalid_union,
        unionErrors: i
      }), X;
    }
  }
  get options() {
    return this._def.options;
  }
}
os.create = (t, e) => new os({
  options: t,
  typeName: J.ZodUnion,
  ...te(e)
});
const Tt = (t) => t instanceof us ? Tt(t.schema) : t instanceof ft ? Tt(t.innerType()) : t instanceof ls ? [t.value] : t instanceof sr ? t.options : t instanceof ds ? he.objectValues(t.enum) : t instanceof fs ? Tt(t._def.innerType) : t instanceof ss ? [void 0] : t instanceof as ? [null] : t instanceof bt ? [void 0, ...Tt(t.unwrap())] : t instanceof ar ? [null, ...Tt(t.unwrap())] : t instanceof Jo || t instanceof ms ? Tt(t.unwrap()) : t instanceof hs ? Tt(t._def.innerType) : [];
class Sa extends oe {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== V.object)
      return A(r, {
        code: j.invalid_type,
        expected: V.object,
        received: r.parsedType
      }), X;
    const n = this.discriminator, s = r.data[n], a = this.optionsMap.get(s);
    return a ? r.common.async ? a._parseAsync({
      data: r.data,
      path: r.path,
      parent: r
    }) : a._parseSync({
      data: r.data,
      path: r.path,
      parent: r
    }) : (A(r, {
      code: j.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [n]
    }), X);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(e, r, n) {
    const s = /* @__PURE__ */ new Map();
    for (const a of r) {
      const o = Tt(a.shape[e]);
      if (!o.length)
        throw new Error(`A discriminator value for key \`${e}\` could not be extracted from all schema options`);
      for (const i of o) {
        if (s.has(i))
          throw new Error(`Discriminator property ${String(e)} has duplicate value ${String(i)}`);
        s.set(i, a);
      }
    }
    return new Sa({
      typeName: J.ZodDiscriminatedUnion,
      discriminator: e,
      options: r,
      optionsMap: s,
      ...te(n)
    });
  }
}
function So(t, e) {
  const r = kt(t), n = kt(e);
  if (t === e)
    return { valid: !0, data: t };
  if (r === V.object && n === V.object) {
    const s = he.objectKeys(e), a = he.objectKeys(t).filter((i) => s.indexOf(i) !== -1), o = { ...t, ...e };
    for (const i of a) {
      const c = So(t[i], e[i]);
      if (!c.valid)
        return { valid: !1 };
      o[i] = c.data;
    }
    return { valid: !0, data: o };
  } else if (r === V.array && n === V.array) {
    if (t.length !== e.length)
      return { valid: !1 };
    const s = [];
    for (let a = 0; a < t.length; a++) {
      const o = t[a], i = e[a], c = So(o, i);
      if (!c.valid)
        return { valid: !1 };
      s.push(c.data);
    }
    return { valid: !0, data: s };
  } else return r === V.date && n === V.date && +t == +e ? { valid: !0, data: t } : { valid: !1 };
}
class is extends oe {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = (a, o) => {
      if (Eo(a) || Eo(o))
        return X;
      const i = So(a.value, o.value);
      return i.valid ? ((bo(a) || bo(o)) && r.dirty(), { status: r.value, value: i.data }) : (A(n, {
        code: j.invalid_intersection_types
      }), X);
    };
    return n.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      }),
      this._def.right._parseAsync({
        data: n.data,
        path: n.path,
        parent: n
      })
    ]).then(([a, o]) => s(a, o)) : s(this._def.left._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }), this._def.right._parseSync({
      data: n.data,
      path: n.path,
      parent: n
    }));
  }
}
is.create = (t, e, r) => new is({
  left: t,
  right: e,
  typeName: J.ZodIntersection,
  ...te(r)
});
class Pt extends oe {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== V.array)
      return A(n, {
        code: j.invalid_type,
        expected: V.array,
        received: n.parsedType
      }), X;
    if (n.data.length < this._def.items.length)
      return A(n, {
        code: j.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), X;
    !this._def.rest && n.data.length > this._def.items.length && (A(n, {
      code: j.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), r.dirty());
    const a = [...n.data].map((o, i) => {
      const c = this._def.items[i] || this._def.rest;
      return c ? c._parse(new St(n, o, n.path, i)) : null;
    }).filter((o) => !!o);
    return n.common.async ? Promise.all(a).then((o) => Fe.mergeArray(r, o)) : Fe.mergeArray(r, a);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new Pt({
      ...this._def,
      rest: e
    });
  }
}
Pt.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new Pt({
    items: t,
    typeName: J.ZodTuple,
    rest: null,
    ...te(e)
  });
};
class cs extends oe {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== V.object)
      return A(n, {
        code: j.invalid_type,
        expected: V.object,
        received: n.parsedType
      }), X;
    const s = [], a = this._def.keyType, o = this._def.valueType;
    for (const i in n.data)
      s.push({
        key: a._parse(new St(n, i, n.path, i)),
        value: o._parse(new St(n, n.data[i], n.path, i)),
        alwaysSet: i in n.data
      });
    return n.common.async ? Fe.mergeObjectAsync(r, s) : Fe.mergeObjectSync(r, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, r, n) {
    return r instanceof oe ? new cs({
      keyType: e,
      valueType: r,
      typeName: J.ZodRecord,
      ...te(n)
    }) : new cs({
      keyType: ct.create(),
      valueType: e,
      typeName: J.ZodRecord,
      ...te(r)
    });
  }
}
class la extends oe {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== V.map)
      return A(n, {
        code: j.invalid_type,
        expected: V.map,
        received: n.parsedType
      }), X;
    const s = this._def.keyType, a = this._def.valueType, o = [...n.data.entries()].map(([i, c], u) => ({
      key: s._parse(new St(n, i, n.path, [u, "key"])),
      value: a._parse(new St(n, c, n.path, [u, "value"]))
    }));
    if (n.common.async) {
      const i = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const c of o) {
          const u = await c.key, l = await c.value;
          if (u.status === "aborted" || l.status === "aborted")
            return X;
          (u.status === "dirty" || l.status === "dirty") && r.dirty(), i.set(u.value, l.value);
        }
        return { status: r.value, value: i };
      });
    } else {
      const i = /* @__PURE__ */ new Map();
      for (const c of o) {
        const u = c.key, l = c.value;
        if (u.status === "aborted" || l.status === "aborted")
          return X;
        (u.status === "dirty" || l.status === "dirty") && r.dirty(), i.set(u.value, l.value);
      }
      return { status: r.value, value: i };
    }
  }
}
la.create = (t, e, r) => new la({
  valueType: e,
  keyType: t,
  typeName: J.ZodMap,
  ...te(r)
});
class Ar extends oe {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.parsedType !== V.set)
      return A(n, {
        code: j.invalid_type,
        expected: V.set,
        received: n.parsedType
      }), X;
    const s = this._def;
    s.minSize !== null && n.data.size < s.minSize.value && (A(n, {
      code: j.too_small,
      minimum: s.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.minSize.message
    }), r.dirty()), s.maxSize !== null && n.data.size > s.maxSize.value && (A(n, {
      code: j.too_big,
      maximum: s.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: s.maxSize.message
    }), r.dirty());
    const a = this._def.valueType;
    function o(c) {
      const u = /* @__PURE__ */ new Set();
      for (const l of c) {
        if (l.status === "aborted")
          return X;
        l.status === "dirty" && r.dirty(), u.add(l.value);
      }
      return { status: r.value, value: u };
    }
    const i = [...n.data.values()].map((c, u) => a._parse(new St(n, c, n.path, u)));
    return n.common.async ? Promise.all(i).then((c) => o(c)) : o(i);
  }
  min(e, r) {
    return new Ar({
      ...this._def,
      minSize: { value: e, message: x.toString(r) }
    });
  }
  max(e, r) {
    return new Ar({
      ...this._def,
      maxSize: { value: e, message: x.toString(r) }
    });
  }
  size(e, r) {
    return this.min(e, r).max(e, r);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Ar.create = (t, e) => new Ar({
  valueType: t,
  minSize: null,
  maxSize: null,
  typeName: J.ZodSet,
  ...te(e)
});
class tn extends oe {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== V.function)
      return A(r, {
        code: j.invalid_type,
        expected: V.function,
        received: r.parsedType
      }), X;
    function n(i, c) {
      return oa({
        data: i,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          aa(),
          on
        ].filter((u) => !!u),
        issueData: {
          code: j.invalid_arguments,
          argumentsError: c
        }
      });
    }
    function s(i, c) {
      return oa({
        data: i,
        path: r.path,
        errorMaps: [
          r.common.contextualErrorMap,
          r.schemaErrorMap,
          aa(),
          on
        ].filter((u) => !!u),
        issueData: {
          code: j.invalid_return_type,
          returnTypeError: c
        }
      });
    }
    const a = { errorMap: r.common.contextualErrorMap }, o = r.data;
    if (this._def.returns instanceof un) {
      const i = this;
      return qe(async function(...c) {
        const u = new Xe([]), l = await i._def.args.parseAsync(c, a).catch((g) => {
          throw u.addIssue(n(c, g)), u;
        }), f = await Reflect.apply(o, this, l);
        return await i._def.returns._def.type.parseAsync(f, a).catch((g) => {
          throw u.addIssue(s(f, g)), u;
        });
      });
    } else {
      const i = this;
      return qe(function(...c) {
        const u = i._def.args.safeParse(c, a);
        if (!u.success)
          throw new Xe([n(c, u.error)]);
        const l = Reflect.apply(o, this, u.data), f = i._def.returns.safeParse(l, a);
        if (!f.success)
          throw new Xe([s(l, f.error)]);
        return f.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new tn({
      ...this._def,
      args: Pt.create(e).rest(Ir.create())
    });
  }
  returns(e) {
    return new tn({
      ...this._def,
      returns: e
    });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, r, n) {
    return new tn({
      args: e || Pt.create([]).rest(Ir.create()),
      returns: r || Ir.create(),
      typeName: J.ZodFunction,
      ...te(n)
    });
  }
}
class us extends oe {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    return this._def.getter()._parse({ data: r.data, path: r.path, parent: r });
  }
}
us.create = (t, e) => new us({
  getter: t,
  typeName: J.ZodLazy,
  ...te(e)
});
class ls extends oe {
  _parse(e) {
    if (e.data !== this._def.value) {
      const r = this._getOrReturnCtx(e);
      return A(r, {
        received: r.data,
        code: j.invalid_literal,
        expected: this._def.value
      }), X;
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
ls.create = (t, e) => new ls({
  value: t,
  typeName: J.ZodLiteral,
  ...te(e)
});
function fd(t, e) {
  return new sr({
    values: t,
    typeName: J.ZodEnum,
    ...te(e)
  });
}
class sr extends oe {
  constructor() {
    super(...arguments), Mn.set(this, void 0);
  }
  _parse(e) {
    if (typeof e.data != "string") {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return A(r, {
        expected: he.joinValues(n),
        received: r.parsedType,
        code: j.invalid_type
      }), X;
    }
    if (ia(this, Mn) || cd(this, Mn, new Set(this._def.values)), !ia(this, Mn).has(e.data)) {
      const r = this._getOrReturnCtx(e), n = this._def.values;
      return A(r, {
        received: r.data,
        code: j.invalid_enum_value,
        options: n
      }), X;
    }
    return qe(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Values() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  get Enum() {
    const e = {};
    for (const r of this._def.values)
      e[r] = r;
    return e;
  }
  extract(e, r = this._def) {
    return sr.create(e, {
      ...this._def,
      ...r
    });
  }
  exclude(e, r = this._def) {
    return sr.create(this.options.filter((n) => !e.includes(n)), {
      ...this._def,
      ...r
    });
  }
}
Mn = /* @__PURE__ */ new WeakMap();
sr.create = fd;
class ds extends oe {
  constructor() {
    super(...arguments), Vn.set(this, void 0);
  }
  _parse(e) {
    const r = he.getValidEnumValues(this._def.values), n = this._getOrReturnCtx(e);
    if (n.parsedType !== V.string && n.parsedType !== V.number) {
      const s = he.objectValues(r);
      return A(n, {
        expected: he.joinValues(s),
        received: n.parsedType,
        code: j.invalid_type
      }), X;
    }
    if (ia(this, Vn) || cd(this, Vn, new Set(he.getValidEnumValues(this._def.values))), !ia(this, Vn).has(e.data)) {
      const s = he.objectValues(r);
      return A(n, {
        received: n.data,
        code: j.invalid_enum_value,
        options: s
      }), X;
    }
    return qe(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
Vn = /* @__PURE__ */ new WeakMap();
ds.create = (t, e) => new ds({
  values: t,
  typeName: J.ZodNativeEnum,
  ...te(e)
});
class un extends oe {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    if (r.parsedType !== V.promise && r.common.async === !1)
      return A(r, {
        code: j.invalid_type,
        expected: V.promise,
        received: r.parsedType
      }), X;
    const n = r.parsedType === V.promise ? r.data : Promise.resolve(r.data);
    return qe(n.then((s) => this._def.type.parseAsync(s, {
      path: r.path,
      errorMap: r.common.contextualErrorMap
    })));
  }
}
un.create = (t, e) => new un({
  type: t,
  typeName: J.ZodPromise,
  ...te(e)
});
class ft extends oe {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === J.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e), s = this._def.effect || null, a = {
      addIssue: (o) => {
        A(n, o), o.fatal ? r.abort() : r.dirty();
      },
      get path() {
        return n.path;
      }
    };
    if (a.addIssue = a.addIssue.bind(a), s.type === "preprocess") {
      const o = s.transform(n.data, a);
      if (n.common.async)
        return Promise.resolve(o).then(async (i) => {
          if (r.value === "aborted")
            return X;
          const c = await this._def.schema._parseAsync({
            data: i,
            path: n.path,
            parent: n
          });
          return c.status === "aborted" ? X : c.status === "dirty" || r.value === "dirty" ? Yr(c.value) : c;
        });
      {
        if (r.value === "aborted")
          return X;
        const i = this._def.schema._parseSync({
          data: o,
          path: n.path,
          parent: n
        });
        return i.status === "aborted" ? X : i.status === "dirty" || r.value === "dirty" ? Yr(i.value) : i;
      }
    }
    if (s.type === "refinement") {
      const o = (i) => {
        const c = s.refinement(i, a);
        if (n.common.async)
          return Promise.resolve(c);
        if (c instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return i;
      };
      if (n.common.async === !1) {
        const i = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return i.status === "aborted" ? X : (i.status === "dirty" && r.dirty(), o(i.value), { status: r.value, value: i.value });
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((i) => i.status === "aborted" ? X : (i.status === "dirty" && r.dirty(), o(i.value).then(() => ({ status: r.value, value: i.value }))));
    }
    if (s.type === "transform")
      if (n.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: n.data,
          path: n.path,
          parent: n
        });
        if (!Cr(o))
          return o;
        const i = s.transform(o.value, a);
        if (i instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: r.value, value: i };
      } else
        return this._def.schema._parseAsync({ data: n.data, path: n.path, parent: n }).then((o) => Cr(o) ? Promise.resolve(s.transform(o.value, a)).then((i) => ({ status: r.value, value: i })) : o);
    he.assertNever(s);
  }
}
ft.create = (t, e, r) => new ft({
  schema: t,
  typeName: J.ZodEffects,
  effect: e,
  ...te(r)
});
ft.createWithPreprocess = (t, e, r) => new ft({
  schema: e,
  effect: { type: "preprocess", transform: t },
  typeName: J.ZodEffects,
  ...te(r)
});
class bt extends oe {
  _parse(e) {
    return this._getType(e) === V.undefined ? qe(void 0) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
bt.create = (t, e) => new bt({
  innerType: t,
  typeName: J.ZodOptional,
  ...te(e)
});
class ar extends oe {
  _parse(e) {
    return this._getType(e) === V.null ? qe(null) : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ar.create = (t, e) => new ar({
  innerType: t,
  typeName: J.ZodNullable,
  ...te(e)
});
class fs extends oe {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e);
    let n = r.data;
    return r.parsedType === V.undefined && (n = this._def.defaultValue()), this._def.innerType._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
fs.create = (t, e) => new fs({
  innerType: t,
  typeName: J.ZodDefault,
  defaultValue: typeof e.default == "function" ? e.default : () => e.default,
  ...te(e)
});
class hs extends oe {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = {
      ...r,
      common: {
        ...r.common,
        issues: []
      }
    }, s = this._def.innerType._parse({
      data: n.data,
      path: n.path,
      parent: {
        ...n
      }
    });
    return rs(s) ? s.then((a) => ({
      status: "valid",
      value: a.status === "valid" ? a.value : this._def.catchValue({
        get error() {
          return new Xe(n.common.issues);
        },
        input: n.data
      })
    })) : {
      status: "valid",
      value: s.status === "valid" ? s.value : this._def.catchValue({
        get error() {
          return new Xe(n.common.issues);
        },
        input: n.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
hs.create = (t, e) => new hs({
  innerType: t,
  typeName: J.ZodCatch,
  catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
  ...te(e)
});
class da extends oe {
  _parse(e) {
    if (this._getType(e) !== V.nan) {
      const n = this._getOrReturnCtx(e);
      return A(n, {
        code: j.invalid_type,
        expected: V.nan,
        received: n.parsedType
      }), X;
    }
    return { status: "valid", value: e.data };
  }
}
da.create = (t) => new da({
  typeName: J.ZodNaN,
  ...te(t)
});
const Vm = Symbol("zod_brand");
class Jo extends oe {
  _parse(e) {
    const { ctx: r } = this._processInputParams(e), n = r.data;
    return this._def.type._parse({
      data: n,
      path: r.path,
      parent: r
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class vs extends oe {
  _parse(e) {
    const { status: r, ctx: n } = this._processInputParams(e);
    if (n.common.async)
      return (async () => {
        const a = await this._def.in._parseAsync({
          data: n.data,
          path: n.path,
          parent: n
        });
        return a.status === "aborted" ? X : a.status === "dirty" ? (r.dirty(), Yr(a.value)) : this._def.out._parseAsync({
          data: a.value,
          path: n.path,
          parent: n
        });
      })();
    {
      const s = this._def.in._parseSync({
        data: n.data,
        path: n.path,
        parent: n
      });
      return s.status === "aborted" ? X : s.status === "dirty" ? (r.dirty(), {
        status: "dirty",
        value: s.value
      }) : this._def.out._parseSync({
        data: s.value,
        path: n.path,
        parent: n
      });
    }
  }
  static create(e, r) {
    return new vs({
      in: e,
      out: r,
      typeName: J.ZodPipeline
    });
  }
}
class ms extends oe {
  _parse(e) {
    const r = this._def.innerType._parse(e), n = (s) => (Cr(s) && (s.value = Object.freeze(s.value)), s);
    return rs(r) ? r.then((s) => n(s)) : n(r);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ms.create = (t, e) => new ms({
  innerType: t,
  typeName: J.ZodReadonly,
  ...te(e)
});
function hd(t, e = {}, r) {
  return t ? cn.create().superRefine((n, s) => {
    var a, o;
    if (!t(n)) {
      const i = typeof e == "function" ? e(n) : typeof e == "string" ? { message: e } : e, c = (o = (a = i.fatal) !== null && a !== void 0 ? a : r) !== null && o !== void 0 ? o : !0, u = typeof i == "string" ? { message: i } : i;
      s.addIssue({ code: "custom", ...u, fatal: c });
    }
  }) : cn.create();
}
const Lm = {
  object: Ee.lazycreate
};
var J;
(function(t) {
  t.ZodString = "ZodString", t.ZodNumber = "ZodNumber", t.ZodNaN = "ZodNaN", t.ZodBigInt = "ZodBigInt", t.ZodBoolean = "ZodBoolean", t.ZodDate = "ZodDate", t.ZodSymbol = "ZodSymbol", t.ZodUndefined = "ZodUndefined", t.ZodNull = "ZodNull", t.ZodAny = "ZodAny", t.ZodUnknown = "ZodUnknown", t.ZodNever = "ZodNever", t.ZodVoid = "ZodVoid", t.ZodArray = "ZodArray", t.ZodObject = "ZodObject", t.ZodUnion = "ZodUnion", t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", t.ZodIntersection = "ZodIntersection", t.ZodTuple = "ZodTuple", t.ZodRecord = "ZodRecord", t.ZodMap = "ZodMap", t.ZodSet = "ZodSet", t.ZodFunction = "ZodFunction", t.ZodLazy = "ZodLazy", t.ZodLiteral = "ZodLiteral", t.ZodEnum = "ZodEnum", t.ZodEffects = "ZodEffects", t.ZodNativeEnum = "ZodNativeEnum", t.ZodOptional = "ZodOptional", t.ZodNullable = "ZodNullable", t.ZodDefault = "ZodDefault", t.ZodCatch = "ZodCatch", t.ZodPromise = "ZodPromise", t.ZodBranded = "ZodBranded", t.ZodPipeline = "ZodPipeline", t.ZodReadonly = "ZodReadonly";
})(J || (J = {}));
const Fm = (t, e = {
  message: `Input not instance of ${t.name}`
}) => hd((r) => r instanceof t, e), md = ct.create, pd = rr.create, zm = da.create, Um = nr.create, yd = ns.create, xm = jr.create, qm = ca.create, Km = ss.create, Gm = as.create, Zm = cn.create, Hm = Ir.create, Bm = Vt.create, Wm = ua.create, Jm = ut.create, Xm = Ee.create, Ym = Ee.strictCreate, Qm = os.create, ep = Sa.create, tp = is.create, rp = Pt.create, np = cs.create, sp = la.create, ap = Ar.create, op = tn.create, ip = us.create, cp = ls.create, up = sr.create, lp = ds.create, dp = un.create, du = ft.create, fp = bt.create, hp = ar.create, mp = ft.createWithPreprocess, pp = vs.create, yp = () => md().optional(), $p = () => pd().optional(), gp = () => yd().optional(), _p = {
  string: (t) => ct.create({ ...t, coerce: !0 }),
  number: (t) => rr.create({ ...t, coerce: !0 }),
  boolean: (t) => ns.create({
    ...t,
    coerce: !0
  }),
  bigint: (t) => nr.create({ ...t, coerce: !0 }),
  date: (t) => jr.create({ ...t, coerce: !0 })
}, vp = X;
var wr = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: on,
  setErrorMap: mm,
  getErrorMap: aa,
  makeIssue: oa,
  EMPTY_PATH: pm,
  addIssueToContext: A,
  ParseStatus: Fe,
  INVALID: X,
  DIRTY: Yr,
  OK: qe,
  isAborted: Eo,
  isDirty: bo,
  isValid: Cr,
  isAsync: rs,
  get util() {
    return he;
  },
  get objectUtil() {
    return wo;
  },
  ZodParsedType: V,
  getParsedType: kt,
  ZodType: oe,
  datetimeRegex: dd,
  ZodString: ct,
  ZodNumber: rr,
  ZodBigInt: nr,
  ZodBoolean: ns,
  ZodDate: jr,
  ZodSymbol: ca,
  ZodUndefined: ss,
  ZodNull: as,
  ZodAny: cn,
  ZodUnknown: Ir,
  ZodNever: Vt,
  ZodVoid: ua,
  ZodArray: ut,
  ZodObject: Ee,
  ZodUnion: os,
  ZodDiscriminatedUnion: Sa,
  ZodIntersection: is,
  ZodTuple: Pt,
  ZodRecord: cs,
  ZodMap: la,
  ZodSet: Ar,
  ZodFunction: tn,
  ZodLazy: us,
  ZodLiteral: ls,
  ZodEnum: sr,
  ZodNativeEnum: ds,
  ZodPromise: un,
  ZodEffects: ft,
  ZodTransformer: ft,
  ZodOptional: bt,
  ZodNullable: ar,
  ZodDefault: fs,
  ZodCatch: hs,
  ZodNaN: da,
  BRAND: Vm,
  ZodBranded: Jo,
  ZodPipeline: vs,
  ZodReadonly: ms,
  custom: hd,
  Schema: oe,
  ZodSchema: oe,
  late: Lm,
  get ZodFirstPartyTypeKind() {
    return J;
  },
  coerce: _p,
  any: Zm,
  array: Jm,
  bigint: Um,
  boolean: yd,
  date: xm,
  discriminatedUnion: ep,
  effect: du,
  enum: up,
  function: op,
  instanceof: Fm,
  intersection: tp,
  lazy: ip,
  literal: cp,
  map: sp,
  nan: zm,
  nativeEnum: lp,
  never: Bm,
  null: Gm,
  nullable: hp,
  number: pd,
  object: Xm,
  oboolean: gp,
  onumber: $p,
  optional: fp,
  ostring: yp,
  pipeline: pp,
  preprocess: mp,
  promise: dp,
  record: np,
  set: ap,
  strictObject: Ym,
  string: md,
  symbol: qm,
  transformer: du,
  tuple: rp,
  undefined: Km,
  union: Qm,
  unknown: Hm,
  void: Wm,
  NEVER: vp,
  ZodIssueCode: j,
  quotelessJson: hm,
  ZodError: Xe
});
function wp(t) {
  return !!t && !Array.isArray(t) && typeof t == "object";
}
class Ep extends Error {
}
function bp(t) {
  if (t instanceof Error)
    return t;
  const e = typeof t;
  if (!(e === "undefined" || e === "function" || t === null)) {
    if (e !== "object")
      return new Error(String(t));
    if (wp(t)) {
      const r = new Ep();
      for (const n in t)
        r[n] = t[n];
      return r;
    }
  }
}
function Sp(t) {
  if (t instanceof ln || t instanceof Error && t.name === "TRPCError")
    return t;
  const e = new ln({
    code: "INTERNAL_SERVER_ERROR",
    cause: t
  });
  return t instanceof Error && t.stack && (e.stack = t.stack), e;
}
class ln extends Error {
  constructor(e) {
    const r = bp(e.cause), n = e.message ?? (r == null ? void 0 : r.message) ?? e.code;
    super(n, {
      cause: r
    }), this.code = e.code, this.name = "TRPCError", this.cause || (this.cause = r);
  }
}
function $d(t) {
  const e = /* @__PURE__ */ Object.create(null);
  for (const r in t) {
    const n = t[r];
    e[n] = r;
  }
  return e;
}
const Xo = {
  /**
  * Invalid JSON was received by the server.
  * An error occurred on the server while parsing the JSON text.
  */
  PARSE_ERROR: -32700,
  /**
  * The JSON sent is not a valid Request object.
  */
  BAD_REQUEST: -32600,
  // Internal JSON-RPC error
  INTERNAL_SERVER_ERROR: -32603,
  NOT_IMPLEMENTED: -32603,
  // Implementation specific errors
  UNAUTHORIZED: -32001,
  FORBIDDEN: -32003,
  NOT_FOUND: -32004,
  METHOD_NOT_SUPPORTED: -32005,
  TIMEOUT: -32008,
  CONFLICT: -32009,
  PRECONDITION_FAILED: -32012,
  PAYLOAD_TOO_LARGE: -32013,
  UNPROCESSABLE_CONTENT: -32022,
  TOO_MANY_REQUESTS: -32029,
  CLIENT_CLOSED_REQUEST: -32099
};
$d(Xo);
$d(Xo);
const Pp = {
  PARSE_ERROR: 400,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  FORBIDDEN: 403,
  METHOD_NOT_SUPPORTED: 405,
  TIMEOUT: 408,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501
};
function Rp(t) {
  return Pp[t] ?? 500;
}
function Np(t) {
  return Rp(t.code);
}
const gd = () => {
};
function _d(t, e) {
  return new Proxy(gd, {
    get(n, s) {
      if (!(typeof s != "string" || s === "then"))
        return _d(t, [
          ...e,
          s
        ]);
    },
    apply(n, s, a) {
      const o = e[e.length - 1] === "apply";
      return t({
        args: o ? a.length >= 2 ? a[1] : [] : a,
        path: o ? e.slice(0, -1) : e
      });
    }
  });
}
const Op = (t) => _d(t, []), Tp = (t) => new Proxy(gd, {
  get(e, r) {
    if (!(typeof r != "string" || r === "then"))
      return t(r);
  }
});
function kp(t) {
  return "input" in t ? t : {
    input: t,
    output: t
  };
}
const qn = {
  _default: !0,
  input: {
    serialize: (t) => t,
    deserialize: (t) => t
  },
  output: {
    serialize: (t) => t,
    deserialize: (t) => t
  }
}, Kn = ({ shape: t }) => t;
function Ip(t) {
  return Object.assign(/* @__PURE__ */ Object.create(null), t);
}
const Cp = [
  "query",
  "mutation",
  "subscription"
];
function jp(t) {
  return "router" in t._def;
}
const Ap = {
  _ctx: null,
  _errorShape: null,
  _meta: null,
  queries: {},
  mutations: {},
  subscriptions: {},
  errorFormatter: Kn,
  transformer: qn
}, Dp = [
  /**
  * Then is a reserved word because otherwise we can't return a promise that returns a Proxy
  * since JS will think that `.then` is something that exists
  */
  "then"
];
function vd(t) {
  return function(r) {
    const n = new Set(Object.keys(r).filter((c) => Dp.includes(c)));
    if (n.size > 0)
      throw new Error("Reserved words used in `router({})` call: " + Array.from(n).join(", "));
    const s = Ip({});
    function a(c, u = "") {
      for (const [l, f] of Object.entries(c ?? {})) {
        const v = `${u}${l}`;
        if (jp(f)) {
          a(f._def.procedures, `${v}.`);
          continue;
        }
        if (s[v])
          throw new Error(`Duplicate key: ${v}`);
        s[v] = f;
      }
    }
    a(r);
    const o = {
      _config: t,
      router: !0,
      procedures: s,
      ...Ap,
      record: r,
      queries: Object.entries(s).filter((c) => c[1]._def.query).reduce((c, [u, l]) => ({
        ...c,
        [u]: l
      }), {}),
      mutations: Object.entries(s).filter((c) => c[1]._def.mutation).reduce((c, [u, l]) => ({
        ...c,
        [u]: l
      }), {}),
      subscriptions: Object.entries(s).filter((c) => c[1]._def.subscription).reduce((c, [u, l]) => ({
        ...c,
        [u]: l
      }), {})
    }, i = {
      ...r,
      _def: o,
      createCaller(c) {
        return wd()(i)(c);
      },
      getErrorShape(c) {
        const { path: u, error: l } = c, { code: f } = c.error, v = {
          message: l.message,
          code: Xo[f],
          data: {
            code: f,
            httpStatus: Np(l)
          }
        };
        return t.isDev && typeof c.error.stack == "string" && (v.data.stack = c.error.stack), typeof u == "string" && (v.data.path = u), this._def._config.errorFormatter({
          ...c,
          shape: v
        });
      }
    };
    return i;
  };
}
function Mp(t) {
  var s;
  const { type: e, path: r } = t;
  if (!(r in t.procedures) || !((s = t.procedures[r]) != null && s._def[e]))
    throw new ln({
      code: "NOT_FOUND",
      message: `No "${e}"-procedure on path "${r}"`
    });
  const n = t.procedures[r];
  return n(t);
}
function wd() {
  return function(e) {
    const r = e._def;
    return function(s) {
      return Op(({ path: o, args: i }) => {
        if (o.length === 1 && Cp.includes(o[0]))
          return Mp({
            procedures: r.procedures,
            path: i[0],
            rawInput: i[1],
            ctx: s,
            type: o[0]
          });
        const c = o.join("."), u = r.procedures[c];
        let l = "query";
        return u._def.mutation ? l = "mutation" : u._def.subscription && (l = "subscription"), u({
          path: c,
          rawInput: i[0],
          ctx: s,
          type: l
        });
      });
    };
  };
}
var Wl, Jl, Xl, Yl, Ql, ed;
const fu = typeof window > "u" || "Deno" in window || ((Jl = (Wl = globalThis.process) == null ? void 0 : Wl.env) == null ? void 0 : Jl.NODE_ENV) === "test" || !!((Yl = (Xl = globalThis.process) == null ? void 0 : Xl.env) != null && Yl.JEST_WORKER_ID) || !!((ed = (Ql = globalThis.process) == null ? void 0 : Ql.env) != null && ed.VITEST_WORKER_ID);
function hu(t) {
  const e = t;
  if (typeof e == "function")
    return e;
  if (typeof e.parseAsync == "function")
    return e.parseAsync.bind(e);
  if (typeof e.parse == "function")
    return e.parse.bind(e);
  if (typeof e.validateSync == "function")
    return e.validateSync.bind(e);
  if (typeof e.create == "function")
    return e.create.bind(e);
  if (typeof e.assert == "function")
    return (r) => (e.assert(r), r);
  throw new Error("Could not find a validator fn");
}
function Ed(t, ...e) {
  const r = Object.assign(/* @__PURE__ */ Object.create(null), t);
  for (const n of e)
    for (const s in n) {
      if (s in r && r[s] !== n[s])
        throw new Error(`Duplicate key ${s}`);
      r[s] = n[s];
    }
  return r;
}
function Vp() {
  function t(r) {
    return {
      _middlewares: r,
      unstable_pipe(n) {
        const s = "_middlewares" in n ? n._middlewares : [
          n
        ];
        return t([
          ...r,
          ...s
        ]);
      }
    };
  }
  function e(r) {
    return t([
      r
    ]);
  }
  return e;
}
function mu(t) {
  return t && typeof t == "object" && !Array.isArray(t);
}
function Lp(t) {
  const e = async ({ next: r, rawInput: n, input: s }) => {
    let a;
    try {
      a = await t(n);
    } catch (i) {
      throw new ln({
        code: "BAD_REQUEST",
        cause: i
      });
    }
    const o = mu(s) && mu(a) ? {
      ...s,
      ...a
    } : a;
    return r({
      input: o
    });
  };
  return e._type = "input", e;
}
function Fp(t) {
  const e = async ({ next: r }) => {
    const n = await r();
    if (!n.ok)
      return n;
    try {
      const s = await t(n.data);
      return {
        ...n,
        data: s
      };
    } catch (s) {
      throw new ln({
        message: "Output validation failed",
        code: "INTERNAL_SERVER_ERROR",
        cause: s
      });
    }
  };
  return e._type = "output", e;
}
const bd = "middlewareMarker";
function Br(t, e) {
  const { middlewares: r = [], inputs: n, meta: s, ...a } = e;
  return Sd({
    ...Ed(t, a),
    inputs: [
      ...t.inputs,
      ...n ?? []
    ],
    middlewares: [
      ...t.middlewares,
      ...r
    ],
    meta: t.meta && s ? {
      ...t.meta,
      ...s
    } : s ?? t.meta
  });
}
function Sd(t = {}) {
  const e = {
    inputs: [],
    middlewares: [],
    ...t
  };
  return {
    _def: e,
    input(r) {
      const n = hu(r);
      return Br(e, {
        inputs: [
          r
        ],
        middlewares: [
          Lp(n)
        ]
      });
    },
    output(r) {
      const n = hu(r);
      return Br(e, {
        output: r,
        middlewares: [
          Fp(n)
        ]
      });
    },
    meta(r) {
      return Br(e, {
        meta: r
      });
    },
    /**
    * @deprecated
    * This functionality is deprecated and will be removed in the next major version.
    */
    unstable_concat(r) {
      return Br(e, r._def);
    },
    use(r) {
      const n = "_middlewares" in r ? r._middlewares : [
        r
      ];
      return Br(e, {
        middlewares: n
      });
    },
    query(r) {
      return Ba({
        ...e,
        query: !0
      }, r);
    },
    mutation(r) {
      return Ba({
        ...e,
        mutation: !0
      }, r);
    },
    subscription(r) {
      return Ba({
        ...e,
        subscription: !0
      }, r);
    }
  };
}
function Ba(t, e) {
  const r = Br(t, {
    resolver: e,
    middlewares: [
      async function(s) {
        const a = await e(s);
        return {
          marker: bd,
          ok: !0,
          data: a,
          ctx: s.ctx
        };
      }
    ]
  });
  return Up(r._def);
}
const zp = `
This is a client-only function.
If you want to call this function on the server, see https://trpc.io/docs/server/server-side-calls
`.trim();
function Up(t) {
  const e = async function(n) {
    if (!n || !("rawInput" in n))
      throw new Error(zp);
    const s = async (o = {
      index: 0,
      ctx: n.ctx
    }) => {
      try {
        const i = t.middlewares[o.index];
        return await i({
          ctx: o.ctx,
          type: n.type,
          path: n.path,
          rawInput: o.rawInput ?? n.rawInput,
          meta: t.meta,
          input: o.input,
          next(u) {
            const l = u;
            return s({
              index: o.index + 1,
              ctx: l && "ctx" in l ? {
                ...o.ctx,
                ...l.ctx
              } : o.ctx,
              input: l && "input" in l ? l.input : o.input,
              rawInput: l && "rawInput" in l ? l.rawInput : o.rawInput
            });
          }
        });
      } catch (i) {
        return {
          ok: !1,
          error: Sp(i),
          marker: bd
        };
      }
    }, a = await s();
    if (!a)
      throw new ln({
        code: "INTERNAL_SERVER_ERROR",
        message: "No result from middlewares - did you forget to `return next()`?"
      });
    if (!a.ok)
      throw a.error;
    return a.data;
  };
  return e._def = t, e.meta = t.meta, e;
}
function xp(...t) {
  var a;
  const e = Ed({}, ...t.map((o) => o._def.record)), r = t.reduce((o, i) => {
    if (i._def._config.errorFormatter && i._def._config.errorFormatter !== Kn) {
      if (o !== Kn && o !== i._def._config.errorFormatter)
        throw new Error("You seem to have several error formatters");
      return i._def._config.errorFormatter;
    }
    return o;
  }, Kn), n = t.reduce((o, i) => {
    if (i._def._config.transformer && i._def._config.transformer !== qn) {
      if (o !== qn && o !== i._def._config.transformer)
        throw new Error("You seem to have several transformers");
      return i._def._config.transformer;
    }
    return o;
  }, qn);
  return vd({
    errorFormatter: r,
    transformer: n,
    isDev: t.some((o) => o._def._config.isDev),
    allowOutsideOfServer: t.some((o) => o._def._config.allowOutsideOfServer),
    isServer: t.some((o) => o._def._config.isServer),
    $types: (a = t[0]) == null ? void 0 : a._def._config.$types
  })(e);
}
class fa {
  context() {
    return new fa();
  }
  meta() {
    return new fa();
  }
  create(e) {
    return Kp()(e);
  }
}
const qp = new fa();
function Kp() {
  return function(e) {
    var a, o;
    const r = (e == null ? void 0 : e.errorFormatter) ?? Kn, s = {
      transformer: kp((e == null ? void 0 : e.transformer) ?? qn),
      isDev: (e == null ? void 0 : e.isDev) ?? ((o = (a = globalThis.process) == null ? void 0 : a.env) == null ? void 0 : o.NODE_ENV) !== "production",
      allowOutsideOfServer: (e == null ? void 0 : e.allowOutsideOfServer) ?? !1,
      errorFormatter: r,
      isServer: (e == null ? void 0 : e.isServer) ?? fu,
      /**
      * @internal
      */
      $types: Tp((i) => {
        throw new Error(`Tried to access "$types.${i}" which is not available at runtime`);
      })
    };
    if (!((e == null ? void 0 : e.isServer) ?? fu) && (e == null ? void 0 : e.allowOutsideOfServer) !== !0)
      throw new Error("You're trying to use @trpc/server in a non-server environment. This is not supported by default.");
    return {
      /**
      * These are just types, they can't be used
      * @internal
      */
      _config: s,
      /**
      * Builder object for creating procedures
      * @see https://trpc.io/docs/server/procedures
      */
      procedure: Sd({
        meta: e == null ? void 0 : e.defaultMeta
      }),
      /**
      * Create reusable middlewares
      * @see https://trpc.io/docs/server/middlewares
      */
      middleware: Vp(),
      /**
      * Create a router
      * @see https://trpc.io/docs/server/routers
      */
      router: vd(s),
      /**
      * Merge Routers
      * @see https://trpc.io/docs/server/merging-routers
      */
      mergeRouters: xp,
      /**
      * Create a server-side caller for a router
      * @see https://trpc.io/docs/server/server-side-calls
      */
      createCallerFactory: wd()
    };
  };
}
class Gp {
  constructor() {
    this.keyToValue = /* @__PURE__ */ new Map(), this.valueToKey = /* @__PURE__ */ new Map();
  }
  set(e, r) {
    this.keyToValue.set(e, r), this.valueToKey.set(r, e);
  }
  getByKey(e) {
    return this.keyToValue.get(e);
  }
  getByValue(e) {
    return this.valueToKey.get(e);
  }
  clear() {
    this.keyToValue.clear(), this.valueToKey.clear();
  }
}
class Pd {
  constructor(e) {
    this.generateIdentifier = e, this.kv = new Gp();
  }
  register(e, r) {
    this.kv.getByValue(e) || (r || (r = this.generateIdentifier(e)), this.kv.set(r, e));
  }
  clear() {
    this.kv.clear();
  }
  getIdentifier(e) {
    return this.kv.getByValue(e);
  }
  getValue(e) {
    return this.kv.getByKey(e);
  }
}
class Zp extends Pd {
  constructor() {
    super((e) => e.name), this.classToAllowedProps = /* @__PURE__ */ new Map();
  }
  register(e, r) {
    typeof r == "object" ? (r.allowProps && this.classToAllowedProps.set(e, r.allowProps), super.register(e, r.identifier)) : super.register(e, r);
  }
  getAllowedProps(e) {
    return this.classToAllowedProps.get(e);
  }
}
function Hp(t) {
  if ("values" in Object)
    return Object.values(t);
  const e = [];
  for (const r in t)
    t.hasOwnProperty(r) && e.push(t[r]);
  return e;
}
function Bp(t, e) {
  const r = Hp(t);
  if ("find" in r)
    return r.find(e);
  const n = r;
  for (let s = 0; s < n.length; s++) {
    const a = n[s];
    if (e(a))
      return a;
  }
}
function dn(t, e) {
  Object.entries(t).forEach(([r, n]) => e(n, r));
}
function Gs(t, e) {
  return t.indexOf(e) !== -1;
}
function pu(t, e) {
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    if (e(n))
      return n;
  }
}
class Wp {
  constructor() {
    this.transfomers = {};
  }
  register(e) {
    this.transfomers[e.name] = e;
  }
  findApplicable(e) {
    return Bp(this.transfomers, (r) => r.isApplicable(e));
  }
  findByName(e) {
    return this.transfomers[e];
  }
}
const Jp = (t) => Object.prototype.toString.call(t).slice(8, -1), Rd = (t) => typeof t > "u", Xp = (t) => t === null, ps = (t) => typeof t != "object" || t === null || t === Object.prototype ? !1 : Object.getPrototypeOf(t) === null ? !0 : Object.getPrototypeOf(t) === Object.prototype, Po = (t) => ps(t) && Object.keys(t).length === 0, or = (t) => Array.isArray(t), Yp = (t) => typeof t == "string", Qp = (t) => typeof t == "number" && !isNaN(t), ey = (t) => typeof t == "boolean", ty = (t) => t instanceof RegExp, ys = (t) => t instanceof Map, $s = (t) => t instanceof Set, Nd = (t) => Jp(t) === "Symbol", ry = (t) => t instanceof Date && !isNaN(t.valueOf()), ny = (t) => t instanceof Error, yu = (t) => typeof t == "number" && isNaN(t), sy = (t) => ey(t) || Xp(t) || Rd(t) || Qp(t) || Yp(t) || Nd(t), ay = (t) => typeof t == "bigint", oy = (t) => t === 1 / 0 || t === -1 / 0, iy = (t) => ArrayBuffer.isView(t) && !(t instanceof DataView), cy = (t) => t instanceof URL, Od = (t) => t.replace(/\./g, "\\."), Wa = (t) => t.map(String).map(Od).join("."), Gn = (t) => {
  const e = [];
  let r = "";
  for (let s = 0; s < t.length; s++) {
    let a = t.charAt(s);
    if (a === "\\" && t.charAt(s + 1) === ".") {
      r += ".", s++;
      continue;
    }
    if (a === ".") {
      e.push(r), r = "";
      continue;
    }
    r += a;
  }
  const n = r;
  return e.push(n), e;
};
function pt(t, e, r, n) {
  return {
    isApplicable: t,
    annotation: e,
    transform: r,
    untransform: n
  };
}
const Td = [
  pt(Rd, "undefined", () => null, () => {
  }),
  pt(ay, "bigint", (t) => t.toString(), (t) => typeof BigInt < "u" ? BigInt(t) : (console.error("Please add a BigInt polyfill."), t)),
  pt(ry, "Date", (t) => t.toISOString(), (t) => new Date(t)),
  pt(ny, "Error", (t, e) => {
    const r = {
      name: t.name,
      message: t.message
    };
    return e.allowedErrorProps.forEach((n) => {
      r[n] = t[n];
    }), r;
  }, (t, e) => {
    const r = new Error(t.message);
    return r.name = t.name, r.stack = t.stack, e.allowedErrorProps.forEach((n) => {
      r[n] = t[n];
    }), r;
  }),
  pt(ty, "regexp", (t) => "" + t, (t) => {
    const e = t.slice(1, t.lastIndexOf("/")), r = t.slice(t.lastIndexOf("/") + 1);
    return new RegExp(e, r);
  }),
  pt(
    $s,
    "set",
    // (sets only exist in es6+)
    // eslint-disable-next-line es5/no-es6-methods
    (t) => [...t.values()],
    (t) => new Set(t)
  ),
  pt(ys, "map", (t) => [...t.entries()], (t) => new Map(t)),
  pt((t) => yu(t) || oy(t), "number", (t) => yu(t) ? "NaN" : t > 0 ? "Infinity" : "-Infinity", Number),
  pt((t) => t === 0 && 1 / t === -1 / 0, "number", () => "-0", Number),
  pt(cy, "URL", (t) => t.toString(), (t) => new URL(t))
];
function Pa(t, e, r, n) {
  return {
    isApplicable: t,
    annotation: e,
    transform: r,
    untransform: n
  };
}
const kd = Pa((t, e) => Nd(t) ? !!e.symbolRegistry.getIdentifier(t) : !1, (t, e) => ["symbol", e.symbolRegistry.getIdentifier(t)], (t) => t.description, (t, e, r) => {
  const n = r.symbolRegistry.getValue(e[1]);
  if (!n)
    throw new Error("Trying to deserialize unknown symbol");
  return n;
}), uy = [
  Int8Array,
  Uint8Array,
  Int16Array,
  Uint16Array,
  Int32Array,
  Uint32Array,
  Float32Array,
  Float64Array,
  Uint8ClampedArray
].reduce((t, e) => (t[e.name] = e, t), {}), Id = Pa(iy, (t) => ["typed-array", t.constructor.name], (t) => [...t], (t, e) => {
  const r = uy[e[1]];
  if (!r)
    throw new Error("Trying to deserialize unknown typed array");
  return new r(t);
});
function Cd(t, e) {
  return t != null && t.constructor ? !!e.classRegistry.getIdentifier(t.constructor) : !1;
}
const jd = Pa(Cd, (t, e) => ["class", e.classRegistry.getIdentifier(t.constructor)], (t, e) => {
  const r = e.classRegistry.getAllowedProps(t.constructor);
  if (!r)
    return { ...t };
  const n = {};
  return r.forEach((s) => {
    n[s] = t[s];
  }), n;
}, (t, e, r) => {
  const n = r.classRegistry.getValue(e[1]);
  if (!n)
    throw new Error(`Trying to deserialize unknown class '${e[1]}' - check https://github.com/blitz-js/superjson/issues/116#issuecomment-773996564`);
  return Object.assign(Object.create(n.prototype), t);
}), Ad = Pa((t, e) => !!e.customTransformerRegistry.findApplicable(t), (t, e) => ["custom", e.customTransformerRegistry.findApplicable(t).name], (t, e) => e.customTransformerRegistry.findApplicable(t).serialize(t), (t, e, r) => {
  const n = r.customTransformerRegistry.findByName(e[1]);
  if (!n)
    throw new Error("Trying to deserialize unknown custom value");
  return n.deserialize(t);
}), ly = [jd, kd, Ad, Id], $u = (t, e) => {
  const r = pu(ly, (s) => s.isApplicable(t, e));
  if (r)
    return {
      value: r.transform(t, e),
      type: r.annotation(t, e)
    };
  const n = pu(Td, (s) => s.isApplicable(t, e));
  if (n)
    return {
      value: n.transform(t, e),
      type: n.annotation
    };
}, Dd = {};
Td.forEach((t) => {
  Dd[t.annotation] = t;
});
const dy = (t, e, r) => {
  if (or(e))
    switch (e[0]) {
      case "symbol":
        return kd.untransform(t, e, r);
      case "class":
        return jd.untransform(t, e, r);
      case "custom":
        return Ad.untransform(t, e, r);
      case "typed-array":
        return Id.untransform(t, e, r);
      default:
        throw new Error("Unknown transformation: " + e);
    }
  else {
    const n = Dd[e];
    if (!n)
      throw new Error("Unknown transformation: " + e);
    return n.untransform(t, r);
  }
}, Qr = (t, e) => {
  if (e > t.size)
    throw new Error("index out of bounds");
  const r = t.keys();
  for (; e > 0; )
    r.next(), e--;
  return r.next().value;
};
function Md(t) {
  if (Gs(t, "__proto__"))
    throw new Error("__proto__ is not allowed as a property");
  if (Gs(t, "prototype"))
    throw new Error("prototype is not allowed as a property");
  if (Gs(t, "constructor"))
    throw new Error("constructor is not allowed as a property");
}
const fy = (t, e) => {
  Md(e);
  for (let r = 0; r < e.length; r++) {
    const n = e[r];
    if ($s(t))
      t = Qr(t, +n);
    else if (ys(t)) {
      const s = +n, a = +e[++r] == 0 ? "key" : "value", o = Qr(t, s);
      switch (a) {
        case "key":
          t = o;
          break;
        case "value":
          t = t.get(o);
          break;
      }
    } else
      t = t[n];
  }
  return t;
}, Ro = (t, e, r) => {
  if (Md(e), e.length === 0)
    return r(t);
  let n = t;
  for (let a = 0; a < e.length - 1; a++) {
    const o = e[a];
    if (or(n)) {
      const i = +o;
      n = n[i];
    } else if (ps(n))
      n = n[o];
    else if ($s(n)) {
      const i = +o;
      n = Qr(n, i);
    } else if (ys(n)) {
      if (a === e.length - 2)
        break;
      const c = +o, u = +e[++a] == 0 ? "key" : "value", l = Qr(n, c);
      switch (u) {
        case "key":
          n = l;
          break;
        case "value":
          n = n.get(l);
          break;
      }
    }
  }
  const s = e[e.length - 1];
  if (or(n) ? n[+s] = r(n[+s]) : ps(n) && (n[s] = r(n[s])), $s(n)) {
    const a = Qr(n, +s), o = r(a);
    a !== o && (n.delete(a), n.add(o));
  }
  if (ys(n)) {
    const a = +e[e.length - 2], o = Qr(n, a);
    switch (+s == 0 ? "key" : "value") {
      case "key": {
        const c = r(o);
        n.set(c, n.get(o)), c !== o && n.delete(o);
        break;
      }
      case "value": {
        n.set(o, r(n.get(o)));
        break;
      }
    }
  }
  return t;
};
function No(t, e, r = []) {
  if (!t)
    return;
  if (!or(t)) {
    dn(t, (a, o) => No(a, e, [...r, ...Gn(o)]));
    return;
  }
  const [n, s] = t;
  s && dn(s, (a, o) => {
    No(a, e, [...r, ...Gn(o)]);
  }), e(n, r);
}
function hy(t, e, r) {
  return No(e, (n, s) => {
    t = Ro(t, s, (a) => dy(a, n, r));
  }), t;
}
function my(t, e) {
  function r(n, s) {
    const a = fy(t, Gn(s));
    n.map(Gn).forEach((o) => {
      t = Ro(t, o, () => a);
    });
  }
  if (or(e)) {
    const [n, s] = e;
    n.forEach((a) => {
      t = Ro(t, Gn(a), () => t);
    }), s && dn(s, r);
  } else
    dn(e, r);
  return t;
}
const py = (t, e) => ps(t) || or(t) || ys(t) || $s(t) || Cd(t, e);
function yy(t, e, r) {
  const n = r.get(t);
  n ? n.push(e) : r.set(t, [e]);
}
function $y(t, e) {
  const r = {};
  let n;
  return t.forEach((s) => {
    if (s.length <= 1)
      return;
    e || (s = s.map((i) => i.map(String)).sort((i, c) => i.length - c.length));
    const [a, ...o] = s;
    a.length === 0 ? n = o.map(Wa) : r[Wa(a)] = o.map(Wa);
  }), n ? Po(r) ? [n] : [n, r] : Po(r) ? void 0 : r;
}
const Vd = (t, e, r, n, s = [], a = [], o = /* @__PURE__ */ new Map()) => {
  const i = sy(t);
  if (!i) {
    yy(t, s, e);
    const g = o.get(t);
    if (g)
      return n ? {
        transformedValue: null
      } : g;
  }
  if (!py(t, r)) {
    const g = $u(t, r), y = g ? {
      transformedValue: g.value,
      annotations: [g.type]
    } : {
      transformedValue: t
    };
    return i || o.set(t, y), y;
  }
  if (Gs(a, t))
    return {
      transformedValue: null
    };
  const c = $u(t, r), u = (c == null ? void 0 : c.value) ?? t, l = or(u) ? [] : {}, f = {};
  dn(u, (g, y) => {
    if (y === "__proto__" || y === "constructor" || y === "prototype")
      throw new Error(`Detected property ${y}. This is a prototype pollution risk, please remove it from your object.`);
    const w = Vd(g, e, r, n, [...s, y], [...a, t], o);
    l[y] = w.transformedValue, or(w.annotations) ? f[y] = w.annotations : ps(w.annotations) && dn(w.annotations, ($, m) => {
      f[Od(y) + "." + m] = $;
    });
  });
  const v = Po(f) ? {
    transformedValue: l,
    annotations: c ? [c.type] : void 0
  } : {
    transformedValue: l,
    annotations: c ? [c.type, f] : f
  };
  return i || o.set(t, v), v;
};
function Ld(t) {
  return Object.prototype.toString.call(t).slice(8, -1);
}
function gu(t) {
  return Ld(t) === "Array";
}
function gy(t) {
  if (Ld(t) !== "Object")
    return !1;
  const e = Object.getPrototypeOf(t);
  return !!e && e.constructor === Object && e === Object.prototype;
}
function _y(t, e, r, n, s) {
  const a = {}.propertyIsEnumerable.call(n, e) ? "enumerable" : "nonenumerable";
  a === "enumerable" && (t[e] = r), s && a === "nonenumerable" && Object.defineProperty(t, e, {
    value: r,
    enumerable: !1,
    writable: !0,
    configurable: !0
  });
}
function Oo(t, e = {}) {
  if (gu(t))
    return t.map((s) => Oo(s, e));
  if (!gy(t))
    return t;
  const r = Object.getOwnPropertyNames(t), n = Object.getOwnPropertySymbols(t);
  return [...r, ...n].reduce((s, a) => {
    if (gu(e.props) && !e.props.includes(a))
      return s;
    const o = t[a], i = Oo(o, e);
    return _y(s, a, i, t, e.nonenumerable), s;
  }, {});
}
class fe {
  /**
   * @param dedupeReferentialEqualities  If true, SuperJSON will make sure only one instance of referentially equal objects are serialized and the rest are replaced with `null`.
   */
  constructor({ dedupe: e = !1 } = {}) {
    this.classRegistry = new Zp(), this.symbolRegistry = new Pd((r) => r.description ?? ""), this.customTransformerRegistry = new Wp(), this.allowedErrorProps = [], this.dedupe = e;
  }
  serialize(e) {
    const r = /* @__PURE__ */ new Map(), n = Vd(e, r, this, this.dedupe), s = {
      json: n.transformedValue
    };
    n.annotations && (s.meta = {
      ...s.meta,
      values: n.annotations
    });
    const a = $y(r, this.dedupe);
    return a && (s.meta = {
      ...s.meta,
      referentialEqualities: a
    }), s;
  }
  deserialize(e) {
    const { json: r, meta: n } = e;
    let s = Oo(r);
    return n != null && n.values && (s = hy(s, n.values, this)), n != null && n.referentialEqualities && (s = my(s, n.referentialEqualities)), s;
  }
  stringify(e) {
    return JSON.stringify(this.serialize(e));
  }
  parse(e) {
    return this.deserialize(JSON.parse(e));
  }
  registerClass(e, r) {
    this.classRegistry.register(e, r);
  }
  registerSymbol(e, r) {
    this.symbolRegistry.register(e, r);
  }
  registerCustom(e, r) {
    this.customTransformerRegistry.register({
      name: r,
      ...e
    });
  }
  allowErrorProps(...e) {
    this.allowedErrorProps.push(...e);
  }
}
fe.defaultInstance = new fe();
fe.serialize = fe.defaultInstance.serialize.bind(fe.defaultInstance);
fe.deserialize = fe.defaultInstance.deserialize.bind(fe.defaultInstance);
fe.stringify = fe.defaultInstance.stringify.bind(fe.defaultInstance);
fe.parse = fe.defaultInstance.parse.bind(fe.defaultInstance);
fe.registerClass = fe.defaultInstance.registerClass.bind(fe.defaultInstance);
fe.registerSymbol = fe.defaultInstance.registerSymbol.bind(fe.defaultInstance);
fe.registerCustom = fe.defaultInstance.registerCustom.bind(fe.defaultInstance);
fe.allowErrorProps = fe.defaultInstance.allowErrorProps.bind(fe.defaultInstance);
fe.serialize;
fe.deserialize;
fe.stringify;
fe.parse;
fe.registerClass;
fe.registerCustom;
fe.registerSymbol;
fe.allowErrorProps;
const Dr = (t) => {
  const e = typeof t;
  return t !== null && (e === "object" || e === "function");
}, Ja = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), vy = new Set("0123456789");
function Ra(t) {
  const e = [];
  let r = "", n = "start", s = !1;
  for (const a of t)
    switch (a) {
      case "\\": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        s && (r += a), n = "property", s = !s;
        break;
      }
      case ".": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "property";
          break;
        }
        if (s) {
          s = !1, r += a;
          break;
        }
        if (Ja.has(r))
          return [];
        e.push(r), r = "", n = "property";
        break;
      }
      case "[": {
        if (n === "index")
          throw new Error("Invalid character in an index");
        if (n === "indexEnd") {
          n = "index";
          break;
        }
        if (s) {
          s = !1, r += a;
          break;
        }
        if (n === "property") {
          if (Ja.has(r))
            return [];
          e.push(r), r = "";
        }
        n = "index";
        break;
      }
      case "]": {
        if (n === "index") {
          e.push(Number.parseInt(r, 10)), r = "", n = "indexEnd";
          break;
        }
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (n === "index" && !vy.has(a))
          throw new Error("Invalid character in an index");
        if (n === "indexEnd")
          throw new Error("Invalid character after an index");
        n === "start" && (n = "property"), s && (s = !1, r += "\\"), r += a;
      }
    }
  switch (s && (r += "\\"), n) {
    case "property": {
      if (Ja.has(r))
        return [];
      e.push(r);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      e.push("");
      break;
    }
  }
  return e;
}
function Yo(t, e) {
  if (typeof e != "number" && Array.isArray(t)) {
    const r = Number.parseInt(e, 10);
    return Number.isInteger(r) && t[r] === t[e];
  }
  return !1;
}
function Fd(t, e) {
  if (Yo(t, e))
    throw new Error("Cannot use string index");
}
function wy(t, e, r) {
  if (!Dr(t) || typeof e != "string")
    return r === void 0 ? t : r;
  const n = Ra(e);
  if (n.length === 0)
    return r;
  for (let s = 0; s < n.length; s++) {
    const a = n[s];
    if (Yo(t, a) ? t = s === n.length - 1 ? void 0 : null : t = t[a], t == null) {
      if (s !== n.length - 1)
        return r;
      break;
    }
  }
  return t === void 0 ? r : t;
}
function _u(t, e, r) {
  if (!Dr(t) || typeof e != "string")
    return t;
  const n = t, s = Ra(e);
  for (let a = 0; a < s.length; a++) {
    const o = s[a];
    Fd(t, o), a === s.length - 1 ? t[o] = r : Dr(t[o]) || (t[o] = typeof s[a + 1] == "number" ? [] : {}), t = t[o];
  }
  return n;
}
function Ey(t, e) {
  if (!Dr(t) || typeof e != "string")
    return !1;
  const r = Ra(e);
  for (let n = 0; n < r.length; n++) {
    const s = r[n];
    if (Fd(t, s), n === r.length - 1)
      return delete t[s], !0;
    if (t = t[s], !Dr(t))
      return !1;
  }
}
function by(t, e) {
  if (!Dr(t) || typeof e != "string")
    return !1;
  const r = Ra(e);
  if (r.length === 0)
    return !1;
  for (const n of r) {
    if (!Dr(t) || !(n in t) || Yo(t, n))
      return !1;
    t = t[n];
  }
  return !0;
}
const Wt = ba.homedir(), Qo = ba.tmpdir(), { env: en } = Te, Sy = (t) => {
  const e = de.join(Wt, "Library");
  return {
    data: de.join(e, "Application Support", t),
    config: de.join(e, "Preferences", t),
    cache: de.join(e, "Caches", t),
    log: de.join(e, "Logs", t),
    temp: de.join(Qo, t)
  };
}, Py = (t) => {
  const e = en.APPDATA || de.join(Wt, "AppData", "Roaming"), r = en.LOCALAPPDATA || de.join(Wt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: de.join(r, t, "Data"),
    config: de.join(e, t, "Config"),
    cache: de.join(r, t, "Cache"),
    log: de.join(r, t, "Log"),
    temp: de.join(Qo, t)
  };
}, Ry = (t) => {
  const e = de.basename(Wt);
  return {
    data: de.join(en.XDG_DATA_HOME || de.join(Wt, ".local", "share"), t),
    config: de.join(en.XDG_CONFIG_HOME || de.join(Wt, ".config"), t),
    cache: de.join(en.XDG_CACHE_HOME || de.join(Wt, ".cache"), t),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: de.join(en.XDG_STATE_HOME || de.join(Wt, ".local", "state"), t),
    temp: de.join(Qo, e, t)
  };
};
function Ny(t, { suffix: e = "nodejs" } = {}) {
  if (typeof t != "string")
    throw new TypeError(`Expected a string, got ${typeof t}`);
  return e && (t += `-${e}`), Te.platform === "darwin" ? Sy(t) : Te.platform === "win32" ? Py(t) : Ry(t);
}
const zt = (t, e) => function(...n) {
  return t.apply(void 0, n).catch(e);
}, Nt = (t, e) => function(...n) {
  try {
    return t.apply(void 0, n);
  } catch (s) {
    return e(s);
  }
}, Oy = Te.getuid ? !Te.getuid() : !1, Ty = 1e4, We = () => {
}, we = {
  /* API */
  isChangeErrorOk: (t) => {
    if (!we.isNodeError(t))
      return !1;
    const { code: e } = t;
    return e === "ENOSYS" || !Oy && (e === "EINVAL" || e === "EPERM");
  },
  isNodeError: (t) => t instanceof Error,
  isRetriableError: (t) => {
    if (!we.isNodeError(t))
      return !1;
    const { code: e } = t;
    return e === "EMFILE" || e === "ENFILE" || e === "EAGAIN" || e === "EBUSY" || e === "EACCESS" || e === "EACCES" || e === "EACCS" || e === "EPERM";
  },
  onChangeError: (t) => {
    if (!we.isNodeError(t))
      throw t;
    if (!we.isChangeErrorOk(t))
      throw t;
  }
};
class ky {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = Ty, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
      this.intervalId || (this.intervalId = setInterval(this.tick, this.interval));
    }, this.reset = () => {
      this.intervalId && (clearInterval(this.intervalId), delete this.intervalId);
    }, this.add = (e) => {
      this.queueWaiting.add(e), this.queueActive.size < this.limit / 2 ? this.tick() : this.init();
    }, this.remove = (e) => {
      this.queueWaiting.delete(e), this.queueActive.delete(e);
    }, this.schedule = () => new Promise((e) => {
      const r = () => this.remove(n), n = () => e(r);
      this.add(n);
    }), this.tick = () => {
      if (!(this.queueActive.size >= this.limit)) {
        if (!this.queueWaiting.size)
          return this.reset();
        for (const e of this.queueWaiting) {
          if (this.queueActive.size >= this.limit)
            break;
          this.queueWaiting.delete(e), this.queueActive.add(e), e();
        }
      }
    };
  }
}
const Iy = new ky(), Ut = (t, e) => function(n) {
  return function s(...a) {
    return Iy.schedule().then((o) => {
      const i = (u) => (o(), u), c = (u) => {
        if (o(), Date.now() >= n)
          throw u;
        if (e(u)) {
          const l = Math.round(100 * Math.random());
          return new Promise((v) => setTimeout(v, l)).then(() => s.apply(void 0, a));
        }
        throw u;
      };
      return t.apply(void 0, a).then(i, c);
    });
  };
}, xt = (t, e) => function(n) {
  return function s(...a) {
    try {
      return t.apply(void 0, a);
    } catch (o) {
      if (Date.now() > n)
        throw o;
      if (e(o))
        return s.apply(void 0, a);
      throw o;
    }
  };
}, Ve = {
  attempt: {
    /* ASYNC */
    chmod: zt(Ae(ae.chmod), we.onChangeError),
    chown: zt(Ae(ae.chown), we.onChangeError),
    close: zt(Ae(ae.close), We),
    fsync: zt(Ae(ae.fsync), We),
    mkdir: zt(Ae(ae.mkdir), We),
    realpath: zt(Ae(ae.realpath), We),
    stat: zt(Ae(ae.stat), We),
    unlink: zt(Ae(ae.unlink), We),
    /* SYNC */
    chmodSync: Nt(ae.chmodSync, we.onChangeError),
    chownSync: Nt(ae.chownSync, we.onChangeError),
    closeSync: Nt(ae.closeSync, We),
    existsSync: Nt(ae.existsSync, We),
    fsyncSync: Nt(ae.fsync, We),
    mkdirSync: Nt(ae.mkdirSync, We),
    realpathSync: Nt(ae.realpathSync, We),
    statSync: Nt(ae.statSync, We),
    unlinkSync: Nt(ae.unlinkSync, We)
  },
  retry: {
    /* ASYNC */
    close: Ut(Ae(ae.close), we.isRetriableError),
    fsync: Ut(Ae(ae.fsync), we.isRetriableError),
    open: Ut(Ae(ae.open), we.isRetriableError),
    readFile: Ut(Ae(ae.readFile), we.isRetriableError),
    rename: Ut(Ae(ae.rename), we.isRetriableError),
    stat: Ut(Ae(ae.stat), we.isRetriableError),
    write: Ut(Ae(ae.write), we.isRetriableError),
    writeFile: Ut(Ae(ae.writeFile), we.isRetriableError),
    /* SYNC */
    closeSync: xt(ae.closeSync, we.isRetriableError),
    fsyncSync: xt(ae.fsyncSync, we.isRetriableError),
    openSync: xt(ae.openSync, we.isRetriableError),
    readFileSync: xt(ae.readFileSync, we.isRetriableError),
    renameSync: xt(ae.renameSync, we.isRetriableError),
    statSync: xt(ae.statSync, we.isRetriableError),
    writeSync: xt(ae.writeSync, we.isRetriableError),
    writeFileSync: xt(ae.writeFileSync, we.isRetriableError)
  }
}, Cy = "utf8", vu = 438, jy = 511, Ay = {}, Dy = ba.userInfo().uid, My = ba.userInfo().gid, Vy = 1e3, Ly = !!Te.getuid;
Te.getuid && Te.getuid();
const wu = 128, Fy = (t) => t instanceof Error && "code" in t, Eu = (t) => typeof t == "string", Xa = (t) => t === void 0, zy = Te.platform === "linux", zd = Te.platform === "win32", ei = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
zd || ei.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
zy && ei.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class Uy {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (e) => {
      if (!this.exited) {
        this.exited = !0;
        for (const r of this.callbacks)
          r();
        e && (zd && e !== "SIGINT" && e !== "SIGTERM" && e !== "SIGKILL" ? Te.kill(Te.pid, "SIGTERM") : Te.kill(Te.pid, e));
      }
    }, this.hook = () => {
      Te.once("exit", () => this.exit());
      for (const e of ei)
        try {
          Te.once(e, () => this.exit(e));
        } catch {
        }
    }, this.register = (e) => (this.callbacks.add(e), () => {
      this.callbacks.delete(e);
    }), this.hook();
  }
}
const xy = new Uy(), qy = xy.register, Le = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (t) => {
    const e = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), s = `.tmp-${Date.now().toString().slice(-10)}${e}`;
    return `${t}${s}`;
  },
  get: (t, e, r = !0) => {
    const n = Le.truncate(e(t));
    return n in Le.store ? Le.get(t, e, r) : (Le.store[n] = r, [n, () => delete Le.store[n]]);
  },
  purge: (t) => {
    Le.store[t] && (delete Le.store[t], Ve.attempt.unlink(t));
  },
  purgeSync: (t) => {
    Le.store[t] && (delete Le.store[t], Ve.attempt.unlinkSync(t));
  },
  purgeSyncAll: () => {
    for (const t in Le.store)
      Le.purgeSync(t);
  },
  truncate: (t) => {
    const e = de.basename(t);
    if (e.length <= wu)
      return t;
    const r = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(e);
    if (!r)
      return t;
    const n = e.length - wu;
    return `${t.slice(0, -e.length)}${r[1]}${r[2].slice(0, -n)}${r[3]}`;
  }
};
qy(Le.purgeSyncAll);
function Ud(t, e, r = Ay) {
  if (Eu(r))
    return Ud(t, e, { encoding: r });
  const n = Date.now() + ((r.timeout ?? Vy) || -1);
  let s = null, a = null, o = null;
  try {
    const i = Ve.attempt.realpathSync(t), c = !!i;
    t = i || t, [a, s] = Le.get(t, r.tmpCreate || Le.create, r.tmpPurge !== !1);
    const u = Ly && Xa(r.chown), l = Xa(r.mode);
    if (c && (u || l)) {
      const f = Ve.attempt.statSync(t);
      f && (r = { ...r }, u && (r.chown = { uid: f.uid, gid: f.gid }), l && (r.mode = f.mode));
    }
    if (!c) {
      const f = de.dirname(t);
      Ve.attempt.mkdirSync(f, {
        mode: jy,
        recursive: !0
      });
    }
    o = Ve.retry.openSync(n)(a, "w", r.mode || vu), r.tmpCreated && r.tmpCreated(a), Eu(e) ? Ve.retry.writeSync(n)(o, e, 0, r.encoding || Cy) : Xa(e) || Ve.retry.writeSync(n)(o, e, 0, e.length, 0), r.fsync !== !1 && (r.fsyncWait !== !1 ? Ve.retry.fsyncSync(n)(o) : Ve.attempt.fsync(o)), Ve.retry.closeSync(n)(o), o = null, r.chown && (r.chown.uid !== Dy || r.chown.gid !== My) && Ve.attempt.chownSync(a, r.chown.uid, r.chown.gid), r.mode && r.mode !== vu && Ve.attempt.chmodSync(a, r.mode);
    try {
      Ve.retry.renameSync(n)(a, t);
    } catch (f) {
      if (!Fy(f) || f.code !== "ENAMETOOLONG")
        throw f;
      Ve.retry.renameSync(n)(a, Le.truncate(t));
    }
    s(), a = null;
  } finally {
    o && Ve.attempt.closeSync(o), a && Le.purge(a);
  }
}
function xd(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var To = { exports: {} }, qd = {}, lt = {}, fn = {}, ws = {}, re = {}, gs = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.regexpCode = t.getEsmExportName = t.getProperty = t.safeStringify = t.stringify = t.strConcat = t.addCodeArg = t.str = t._ = t.nil = t._Code = t.Name = t.IDENTIFIER = t._CodeOrName = void 0;
  class e {
  }
  t._CodeOrName = e, t.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends e {
    constructor(E) {
      if (super(), !t.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  t.Name = r;
  class n extends e {
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((R, N) => `${R}${N}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((R, N) => (N instanceof r && (R[N.str] = (R[N.str] || 0) + 1), R), {});
    }
  }
  t._Code = n, t.nil = new n("");
  function s(m, ...E) {
    const R = [m[0]];
    let N = 0;
    for (; N < E.length; )
      i(R, E[N]), R.push(m[++N]);
    return new n(R);
  }
  t._ = s;
  const a = new n("+");
  function o(m, ...E) {
    const R = [g(m[0])];
    let N = 0;
    for (; N < E.length; )
      R.push(a), i(R, E[N]), R.push(a, g(m[++N]));
    return c(R), new n(R);
  }
  t.str = o;
  function i(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(f(E));
  }
  t.addCodeArg = i;
  function c(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === a) {
        const R = u(m[E - 1], m[E + 1]);
        if (R !== void 0) {
          m.splice(E - 1, 3, R);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function u(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function l(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : o`${m}${E}`;
  }
  t.strConcat = l;
  function f(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : g(Array.isArray(m) ? m.join(",") : m);
  }
  function v(m) {
    return new n(g(m));
  }
  t.stringify = v;
  function g(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  t.safeStringify = g;
  function y(m) {
    return typeof m == "string" && t.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  t.getProperty = y;
  function w(m) {
    if (typeof m == "string" && t.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  t.getEsmExportName = w;
  function $(m) {
    return new n(m.toString());
  }
  t.regexpCode = $;
})(gs);
var ko = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.ValueScope = t.ValueScopeName = t.Scope = t.varKinds = t.UsedValueState = void 0;
  const e = gs;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (t.UsedValueState = n = {})), t.varKinds = {
    const: new e.Name("const"),
    let: new e.Name("let"),
    var: new e.Name("var")
  };
  class s {
    constructor({ prefixes: u, parent: l } = {}) {
      this._names = {}, this._prefixes = u, this._parent = l;
    }
    toName(u) {
      return u instanceof e.Name ? u : this.name(u);
    }
    name(u) {
      return new e.Name(this._newName(u));
    }
    _newName(u) {
      const l = this._names[u] || this._nameGroup(u);
      return `${u}${l.index++}`;
    }
    _nameGroup(u) {
      var l, f;
      if (!((f = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || f === void 0) && f.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  t.Scope = s;
  class a extends e.Name {
    constructor(u, l) {
      super(l), this.prefix = u;
    }
    setValue(u, { property: l, itemIndex: f }) {
      this.value = u, this.scopePath = (0, e._)`.${new e.Name(l)}[${f}]`;
    }
  }
  t.ValueScopeName = a;
  const o = (0, e._)`\n`;
  class i extends s {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? o : e.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new a(u, this._newName(u));
    }
    value(u, l) {
      var f;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const v = this.toName(u), { prefix: g } = v, y = (f = l.key) !== null && f !== void 0 ? f : l.ref;
      let w = this._values[g];
      if (w) {
        const E = w.get(y);
        if (E)
          return E;
      } else
        w = this._values[g] = /* @__PURE__ */ new Map();
      w.set(y, v);
      const $ = this._scope[g] || (this._scope[g] = []), m = $.length;
      return $[m] = l.ref, v.setValue(l, { property: g, itemIndex: m }), v;
    }
    getValue(u, l) {
      const f = this._values[u];
      if (f)
        return f.get(l);
    }
    scopeRefs(u, l = this._values) {
      return this._reduceValues(l, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, e._)`${u}${f.scopePath}`;
      });
    }
    scopeCode(u = this._values, l, f) {
      return this._reduceValues(u, (v) => {
        if (v.value === void 0)
          throw new Error(`CodeGen: name "${v}" has no value`);
        return v.value.code;
      }, l, f);
    }
    _reduceValues(u, l, f = {}, v) {
      let g = e.nil;
      for (const y in u) {
        const w = u[y];
        if (!w)
          continue;
        const $ = f[y] = f[y] || /* @__PURE__ */ new Map();
        w.forEach((m) => {
          if ($.has(m))
            return;
          $.set(m, n.Started);
          let E = l(m);
          if (E) {
            const R = this.opts.es5 ? t.varKinds.var : t.varKinds.const;
            g = (0, e._)`${g}${R} ${m} = ${E};${this.opts._n}`;
          } else if (E = v == null ? void 0 : v(m))
            g = (0, e._)`${g}${E}${this.opts._n}`;
          else
            throw new r(m);
          $.set(m, n.Completed);
        });
      }
      return g;
    }
  }
  t.ValueScope = i;
})(ko);
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.or = t.and = t.not = t.CodeGen = t.operators = t.varKinds = t.ValueScopeName = t.ValueScope = t.Scope = t.Name = t.regexpCode = t.stringify = t.getProperty = t.nil = t.strConcat = t.str = t._ = void 0;
  const e = gs, r = ko;
  var n = gs;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(t, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(t, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(t, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = ko;
  Object.defineProperty(t, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(t, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(t, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(t, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), t.operators = {
    GT: new e._Code(">"),
    GTE: new e._Code(">="),
    LT: new e._Code("<"),
    LTE: new e._Code("<="),
    EQ: new e._Code("==="),
    NEQ: new e._Code("!=="),
    NOT: new e._Code("!"),
    OR: new e._Code("||"),
    AND: new e._Code("&&"),
    ADD: new e._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, h) {
      return this;
    }
  }
  class o extends a {
    constructor(d, h, b) {
      super(), this.varKind = d, this.name = h, this.rhs = b;
    }
    render({ es5: d, _n: h }) {
      const b = d ? r.varKinds.var : this.varKind, T = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${T};` + h;
    }
    optimizeNames(d, h) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = k(this.rhs, d, h)), this;
    }
    get names() {
      return this.rhs instanceof e._CodeOrName ? this.rhs.names : {};
    }
  }
  class i extends a {
    constructor(d, h, b) {
      super(), this.lhs = d, this.rhs = h, this.sideEffects = b;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, h) {
      if (!(this.lhs instanceof e.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = k(this.rhs, d, h), this;
    }
    get names() {
      const d = this.lhs instanceof e.Name ? {} : { ...this.lhs.names };
      return me(d, this.rhs);
    }
  }
  class c extends i {
    constructor(d, h, b, T) {
      super(d, b, T), this.op = h;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class u extends a {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends a {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class f extends a {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class v extends a {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, h) {
      return this.code = k(this.code, d, h), this;
    }
    get names() {
      return this.code instanceof e._CodeOrName ? this.code.names : {};
    }
  }
  class g extends a {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce((h, b) => h + b.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let h = d.length;
      for (; h--; ) {
        const b = d[h].optimizeNodes();
        Array.isArray(b) ? d.splice(h, 1, ...b) : b ? d[h] = b : d.splice(h, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, h) {
      const { nodes: b } = this;
      let T = b.length;
      for (; T--; ) {
        const I = b[T];
        I.optimizeNames(d, h) || (C(d, I.names), b.splice(T, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, h) => W(d, h.names), {});
    }
  }
  class y extends g {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class w extends g {
  }
  class $ extends y {
  }
  $.kind = "else";
  class m extends y {
    constructor(d, h) {
      super(h), this.condition = d;
    }
    render(d) {
      let h = `if(${this.condition})` + super.render(d);
      return this.else && (h += "else " + this.else.render(d)), h;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let h = this.else;
      if (h) {
        const b = h.optimizeNodes();
        h = this.else = Array.isArray(b) ? new $(b) : b;
      }
      if (h)
        return d === !1 ? h instanceof m ? h : h.nodes : this.nodes.length ? this : new m(z(d), h instanceof m ? [h] : h.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, h) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(d, h), !!(super.optimizeNames(d, h) || this.else))
        return this.condition = k(this.condition, d, h), this;
    }
    get names() {
      const d = super.names;
      return me(d, this.condition), this.else && W(d, this.else.names), d;
    }
  }
  m.kind = "if";
  class E extends y {
  }
  E.kind = "for";
  class R extends E {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, h) {
      if (super.optimizeNames(d, h))
        return this.iteration = k(this.iteration, d, h), this;
    }
    get names() {
      return W(super.names, this.iteration.names);
    }
  }
  class N extends E {
    constructor(d, h, b, T) {
      super(), this.varKind = d, this.name = h, this.from = b, this.to = T;
    }
    render(d) {
      const h = d.es5 ? r.varKinds.var : this.varKind, { name: b, from: T, to: I } = this;
      return `for(${h} ${b}=${T}; ${b}<${I}; ${b}++)` + super.render(d);
    }
    get names() {
      const d = me(super.names, this.from);
      return me(d, this.to);
    }
  }
  class O extends E {
    constructor(d, h, b, T) {
      super(), this.loop = d, this.varKind = h, this.name = b, this.iterable = T;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, h) {
      if (super.optimizeNames(d, h))
        return this.iterable = k(this.iterable, d, h), this;
    }
    get names() {
      return W(super.names, this.iterable.names);
    }
  }
  class q extends y {
    constructor(d, h, b) {
      super(), this.name = d, this.args = h, this.async = b;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  q.kind = "func";
  class Y extends g {
    render(d) {
      return "return " + super.render(d);
    }
  }
  Y.kind = "return";
  class $e extends y {
    render(d) {
      let h = "try" + super.render(d);
      return this.catch && (h += this.catch.render(d)), this.finally && (h += this.finally.render(d)), h;
    }
    optimizeNodes() {
      var d, h;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), (h = this.finally) === null || h === void 0 || h.optimizeNodes(), this;
    }
    optimizeNames(d, h) {
      var b, T;
      return super.optimizeNames(d, h), (b = this.catch) === null || b === void 0 || b.optimizeNames(d, h), (T = this.finally) === null || T === void 0 || T.optimizeNames(d, h), this;
    }
    get names() {
      const d = super.names;
      return this.catch && W(d, this.catch.names), this.finally && W(d, this.finally.names), d;
    }
  }
  class be extends y {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  be.kind = "catch";
  class Re extends y {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  Re.kind = "finally";
  class G {
    constructor(d, h = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...h, _n: h.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new w()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, h) {
      const b = this._extScope.value(d, h);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(d, h) {
      return this._extScope.getValue(d, h);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, h, b, T) {
      const I = this._scope.toName(h);
      return b !== void 0 && T && (this._constants[I.str] = b), this._leafNode(new o(d, I, b)), I;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, h, b) {
      return this._def(r.varKinds.const, d, h, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, h, b) {
      return this._def(r.varKinds.let, d, h, b);
    }
    // `var` declaration with optional assignment
    var(d, h, b) {
      return this._def(r.varKinds.var, d, h, b);
    }
    // assignment code
    assign(d, h, b) {
      return this._leafNode(new i(d, h, b));
    }
    // `+=` code
    add(d, h) {
      return this._leafNode(new c(d, t.operators.ADD, h));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== e.nil && this._leafNode(new v(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const h = ["{"];
      for (const [b, T] of d)
        h.length > 1 && h.push(","), h.push(b), (b !== T || this.opts.es5) && (h.push(":"), (0, e.addCodeArg)(h, T));
      return h.push("}"), new e._Code(h);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, h, b) {
      if (this._blockNode(new m(d)), h && b)
        this.code(h).else().code(b).endIf();
      else if (h)
        this.code(h).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new m(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, $);
    }
    _for(d, h) {
      return this._blockNode(d), h && this.code(h).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, h) {
      return this._for(new R(d), h);
    }
    // `for` statement for a range of values
    forRange(d, h, b, T, I = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const K = this._scope.toName(d);
      return this._for(new N(I, K, h, b), () => T(K));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, h, b, T = r.varKinds.const) {
      const I = this._scope.toName(d);
      if (this.opts.es5) {
        const K = h instanceof e.Name ? h : this.var("_arr", h);
        return this.forRange("_i", 0, (0, e._)`${K}.length`, (U) => {
          this.var(I, (0, e._)`${K}[${U}]`), b(I);
        });
      }
      return this._for(new O("of", T, I, h), () => b(I));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, h, b, T = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, e._)`Object.keys(${h})`, b);
      const I = this._scope.toName(d);
      return this._for(new O("in", T, I, h), () => b(I));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new u(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const h = new Y();
      if (this._blockNode(h), this.code(d), h.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Y);
    }
    // `try` statement
    try(d, h, b) {
      if (!h && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const T = new $e();
      if (this._blockNode(T), this.code(d), h) {
        const I = this.name("e");
        this._currNode = T.catch = new be(I), h(I);
      }
      return b && (this._currNode = T.finally = new Re(), this.code(b)), this._endBlockNode(be, Re);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new f(d));
    }
    // start self-balancing block
    block(d, h) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock(h), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const h = this._blockStarts.pop();
      if (h === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - h;
      if (b < 0 || d !== void 0 && b !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${d} expected`);
      return this._nodes.length = h, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, h = e.nil, b, T) {
      return this._blockNode(new q(d, h, b)), T && this.code(T).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(q);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, h) {
      const b = this._currNode;
      if (b instanceof d || h && b instanceof h)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${h ? `${d.kind}/${h.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const h = this._currNode;
      if (!(h instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = h.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const h = this._nodes;
      h[h.length - 1] = d;
    }
  }
  t.CodeGen = G;
  function W(_, d) {
    for (const h in d)
      _[h] = (_[h] || 0) + (d[h] || 0);
    return _;
  }
  function me(_, d) {
    return d instanceof e._CodeOrName ? W(_, d.names) : _;
  }
  function k(_, d, h) {
    if (_ instanceof e.Name)
      return b(_);
    if (!T(_))
      return _;
    return new e._Code(_._items.reduce((I, K) => (K instanceof e.Name && (K = b(K)), K instanceof e._Code ? I.push(...K._items) : I.push(K), I), []));
    function b(I) {
      const K = h[I.str];
      return K === void 0 || d[I.str] !== 1 ? I : (delete d[I.str], K);
    }
    function T(I) {
      return I instanceof e._Code && I._items.some((K) => K instanceof e.Name && d[K.str] === 1 && h[K.str] !== void 0);
    }
  }
  function C(_, d) {
    for (const h in d)
      _[h] = (_[h] || 0) - (d[h] || 0);
  }
  function z(_) {
    return typeof _ == "boolean" || typeof _ == "number" || _ === null ? !_ : (0, e._)`!${S(_)}`;
  }
  t.not = z;
  const L = p(t.operators.AND);
  function B(..._) {
    return _.reduce(L);
  }
  t.and = B;
  const F = p(t.operators.OR);
  function P(..._) {
    return _.reduce(F);
  }
  t.or = P;
  function p(_) {
    return (d, h) => d === e.nil ? h : h === e.nil ? d : (0, e._)`${S(d)} ${_} ${S(h)}`;
  }
  function S(_) {
    return _ instanceof e.Name ? _ : (0, e._)`(${_})`;
  }
})(re);
var D = {};
Object.defineProperty(D, "__esModule", { value: !0 });
D.checkStrictMode = D.getErrorPath = D.Type = D.useFunc = D.setEvaluated = D.evaluatedPropsToName = D.mergeEvaluated = D.eachItem = D.unescapeJsonPointer = D.escapeJsonPointer = D.escapeFragment = D.unescapeFragment = D.schemaRefOrVal = D.schemaHasRulesButRef = D.schemaHasRules = D.checkUnknownRules = D.alwaysValidSchema = D.toHash = void 0;
const pe = re, Ky = gs;
function Gy(t) {
  const e = {};
  for (const r of t)
    e[r] = !0;
  return e;
}
D.toHash = Gy;
function Zy(t, e) {
  return typeof e == "boolean" ? e : Object.keys(e).length === 0 ? !0 : (Kd(t, e), !Gd(e, t.self.RULES.all));
}
D.alwaysValidSchema = Zy;
function Kd(t, e = t.schema) {
  const { opts: r, self: n } = t;
  if (!r.strictSchema || typeof e == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in e)
    s[a] || Bd(t, `unknown keyword: "${a}"`);
}
D.checkUnknownRules = Kd;
function Gd(t, e) {
  if (typeof t == "boolean")
    return !t;
  for (const r in t)
    if (e[r])
      return !0;
  return !1;
}
D.schemaHasRules = Gd;
function Hy(t, e) {
  if (typeof t == "boolean")
    return !t;
  for (const r in t)
    if (r !== "$ref" && e.all[r])
      return !0;
  return !1;
}
D.schemaHasRulesButRef = Hy;
function By({ topSchemaRef: t, schemaPath: e }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, pe._)`${r}`;
  }
  return (0, pe._)`${t}${e}${(0, pe.getProperty)(n)}`;
}
D.schemaRefOrVal = By;
function Wy(t) {
  return Zd(decodeURIComponent(t));
}
D.unescapeFragment = Wy;
function Jy(t) {
  return encodeURIComponent(ti(t));
}
D.escapeFragment = Jy;
function ti(t) {
  return typeof t == "number" ? `${t}` : t.replace(/~/g, "~0").replace(/\//g, "~1");
}
D.escapeJsonPointer = ti;
function Zd(t) {
  return t.replace(/~1/g, "/").replace(/~0/g, "~");
}
D.unescapeJsonPointer = Zd;
function Xy(t, e) {
  if (Array.isArray(t))
    for (const r of t)
      e(r);
  else
    e(t);
}
D.eachItem = Xy;
function bu({ mergeNames: t, mergeToName: e, mergeValues: r, resultToName: n }) {
  return (s, a, o, i) => {
    const c = o === void 0 ? a : o instanceof pe.Name ? (a instanceof pe.Name ? t(s, a, o) : e(s, a, o), o) : a instanceof pe.Name ? (e(s, o, a), a) : r(a, o);
    return i === pe.Name && !(c instanceof pe.Name) ? n(s, c) : c;
  };
}
D.mergeEvaluated = {
  props: bu({
    mergeNames: (t, e, r) => t.if((0, pe._)`${r} !== true && ${e} !== undefined`, () => {
      t.if((0, pe._)`${e} === true`, () => t.assign(r, !0), () => t.assign(r, (0, pe._)`${r} || {}`).code((0, pe._)`Object.assign(${r}, ${e})`));
    }),
    mergeToName: (t, e, r) => t.if((0, pe._)`${r} !== true`, () => {
      e === !0 ? t.assign(r, !0) : (t.assign(r, (0, pe._)`${r} || {}`), ri(t, r, e));
    }),
    mergeValues: (t, e) => t === !0 ? !0 : { ...t, ...e },
    resultToName: Hd
  }),
  items: bu({
    mergeNames: (t, e, r) => t.if((0, pe._)`${r} !== true && ${e} !== undefined`, () => t.assign(r, (0, pe._)`${e} === true ? true : ${r} > ${e} ? ${r} : ${e}`)),
    mergeToName: (t, e, r) => t.if((0, pe._)`${r} !== true`, () => t.assign(r, e === !0 ? !0 : (0, pe._)`${r} > ${e} ? ${r} : ${e}`)),
    mergeValues: (t, e) => t === !0 ? !0 : Math.max(t, e),
    resultToName: (t, e) => t.var("items", e)
  })
};
function Hd(t, e) {
  if (e === !0)
    return t.var("props", !0);
  const r = t.var("props", (0, pe._)`{}`);
  return e !== void 0 && ri(t, r, e), r;
}
D.evaluatedPropsToName = Hd;
function ri(t, e, r) {
  Object.keys(r).forEach((n) => t.assign((0, pe._)`${e}${(0, pe.getProperty)(n)}`, !0));
}
D.setEvaluated = ri;
const Su = {};
function Yy(t, e) {
  return t.scopeValue("func", {
    ref: e,
    code: Su[e.code] || (Su[e.code] = new Ky._Code(e.code))
  });
}
D.useFunc = Yy;
var Io;
(function(t) {
  t[t.Num = 0] = "Num", t[t.Str = 1] = "Str";
})(Io || (D.Type = Io = {}));
function Qy(t, e, r) {
  if (t instanceof pe.Name) {
    const n = e === Io.Num;
    return r ? n ? (0, pe._)`"[" + ${t} + "]"` : (0, pe._)`"['" + ${t} + "']"` : n ? (0, pe._)`"/" + ${t}` : (0, pe._)`"/" + ${t}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, pe.getProperty)(t).toString() : "/" + ti(t);
}
D.getErrorPath = Qy;
function Bd(t, e, r = t.opts.strictSchema) {
  if (r) {
    if (e = `strict mode: ${e}`, r === !0)
      throw new Error(e);
    t.self.logger.warn(e);
  }
}
D.checkStrictMode = Bd;
var Ye = {};
Object.defineProperty(Ye, "__esModule", { value: !0 });
const De = re, e$ = {
  // validation function arguments
  data: new De.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new De.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new De.Name("instancePath"),
  parentData: new De.Name("parentData"),
  parentDataProperty: new De.Name("parentDataProperty"),
  rootData: new De.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new De.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new De.Name("vErrors"),
  // null or array of validation errors
  errors: new De.Name("errors"),
  // counter of validation errors
  this: new De.Name("this"),
  // "globals"
  self: new De.Name("self"),
  scope: new De.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new De.Name("json"),
  jsonPos: new De.Name("jsonPos"),
  jsonLen: new De.Name("jsonLen"),
  jsonPart: new De.Name("jsonPart")
};
Ye.default = e$;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.extendErrors = t.resetErrorsCount = t.reportExtraError = t.reportError = t.keyword$DataError = t.keywordError = void 0;
  const e = re, r = D, n = Ye;
  t.keywordError = {
    message: ({ keyword: $ }) => (0, e.str)`must pass "${$}" keyword validation`
  }, t.keyword$DataError = {
    message: ({ keyword: $, schemaType: m }) => m ? (0, e.str)`"${$}" keyword must be ${m} ($data)` : (0, e.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, m = t.keywordError, E, R) {
    const { it: N } = $, { gen: O, compositeRule: q, allErrors: Y } = N, $e = f($, m, E);
    R ?? (q || Y) ? c(O, $e) : u(N, (0, e._)`[${$e}]`);
  }
  t.reportError = s;
  function a($, m = t.keywordError, E) {
    const { it: R } = $, { gen: N, compositeRule: O, allErrors: q } = R, Y = f($, m, E);
    c(N, Y), O || q || u(R, n.default.vErrors);
  }
  t.reportExtraError = a;
  function o($, m) {
    $.assign(n.default.errors, m), $.if((0, e._)`${n.default.vErrors} !== null`, () => $.if(m, () => $.assign((0, e._)`${n.default.vErrors}.length`, m), () => $.assign(n.default.vErrors, null)));
  }
  t.resetErrorsCount = o;
  function i({ gen: $, keyword: m, schemaValue: E, data: R, errsCount: N, it: O }) {
    if (N === void 0)
      throw new Error("ajv implementation error");
    const q = $.name("err");
    $.forRange("i", N, n.default.errors, (Y) => {
      $.const(q, (0, e._)`${n.default.vErrors}[${Y}]`), $.if((0, e._)`${q}.instancePath === undefined`, () => $.assign((0, e._)`${q}.instancePath`, (0, e.strConcat)(n.default.instancePath, O.errorPath))), $.assign((0, e._)`${q}.schemaPath`, (0, e.str)`${O.errSchemaPath}/${m}`), O.opts.verbose && ($.assign((0, e._)`${q}.schema`, E), $.assign((0, e._)`${q}.data`, R));
    });
  }
  t.extendErrors = i;
  function c($, m) {
    const E = $.const("err", m);
    $.if((0, e._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, e._)`[${E}]`), (0, e._)`${n.default.vErrors}.push(${E})`), $.code((0, e._)`${n.default.errors}++`);
  }
  function u($, m) {
    const { gen: E, validateName: R, schemaEnv: N } = $;
    N.$async ? E.throw((0, e._)`new ${$.ValidationError}(${m})`) : (E.assign((0, e._)`${R}.errors`, m), E.return(!1));
  }
  const l = {
    keyword: new e.Name("keyword"),
    schemaPath: new e.Name("schemaPath"),
    // also used in JTD errors
    params: new e.Name("params"),
    propertyName: new e.Name("propertyName"),
    message: new e.Name("message"),
    schema: new e.Name("schema"),
    parentSchema: new e.Name("parentSchema")
  };
  function f($, m, E) {
    const { createErrors: R } = $.it;
    return R === !1 ? (0, e._)`{}` : v($, m, E);
  }
  function v($, m, E = {}) {
    const { gen: R, it: N } = $, O = [
      g(N, E),
      y($, E)
    ];
    return w($, m, O), R.object(...O);
  }
  function g({ errorPath: $ }, { instancePath: m }) {
    const E = m ? (0, e.str)`${$}${(0, r.getErrorPath)(m, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, e.strConcat)(n.default.instancePath, E)];
  }
  function y({ keyword: $, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: R }) {
    let N = R ? m : (0, e.str)`${m}/${$}`;
    return E && (N = (0, e.str)`${N}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, N];
  }
  function w($, { params: m, message: E }, R) {
    const { keyword: N, data: O, schemaValue: q, it: Y } = $, { opts: $e, propertyName: be, topSchemaRef: Re, schemaPath: G } = Y;
    R.push([l.keyword, N], [l.params, typeof m == "function" ? m($) : m || (0, e._)`{}`]), $e.messages && R.push([l.message, typeof E == "function" ? E($) : E]), $e.verbose && R.push([l.schema, q], [l.parentSchema, (0, e._)`${Re}${G}`], [n.default.data, O]), be && R.push([l.propertyName, be]);
  }
})(ws);
Object.defineProperty(fn, "__esModule", { value: !0 });
fn.boolOrEmptySchema = fn.topBoolOrEmptySchema = void 0;
const t$ = ws, r$ = re, n$ = Ye, s$ = {
  message: "boolean schema is false"
};
function a$(t) {
  const { gen: e, schema: r, validateName: n } = t;
  r === !1 ? Wd(t, !1) : typeof r == "object" && r.$async === !0 ? e.return(n$.default.data) : (e.assign((0, r$._)`${n}.errors`, null), e.return(!0));
}
fn.topBoolOrEmptySchema = a$;
function o$(t, e) {
  const { gen: r, schema: n } = t;
  n === !1 ? (r.var(e, !1), Wd(t)) : r.var(e, !0);
}
fn.boolOrEmptySchema = o$;
function Wd(t, e) {
  const { gen: r, data: n } = t, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: t
  };
  (0, t$.reportError)(s, s$, void 0, e);
}
var Ne = {}, Mr = {};
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.getRules = Mr.isJSONType = void 0;
const i$ = ["string", "number", "integer", "boolean", "null", "object", "array"], c$ = new Set(i$);
function u$(t) {
  return typeof t == "string" && c$.has(t);
}
Mr.isJSONType = u$;
function l$() {
  const t = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...t, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, t.number, t.string, t.array, t.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Mr.getRules = l$;
var jt = {};
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.shouldUseRule = jt.shouldUseGroup = jt.schemaHasRulesForType = void 0;
function d$({ schema: t, self: e }, r) {
  const n = e.RULES.types[r];
  return n && n !== !0 && Jd(t, n);
}
jt.schemaHasRulesForType = d$;
function Jd(t, e) {
  return e.rules.some((r) => Xd(t, r));
}
jt.shouldUseGroup = Jd;
function Xd(t, e) {
  var r;
  return t[e.keyword] !== void 0 || ((r = e.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => t[n] !== void 0));
}
jt.shouldUseRule = Xd;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.reportTypeError = Ne.checkDataTypes = Ne.checkDataType = Ne.coerceAndCheckDataType = Ne.getJSONTypes = Ne.getSchemaTypes = Ne.DataType = void 0;
const f$ = Mr, h$ = jt, m$ = ws, ne = re, Yd = D;
var rn;
(function(t) {
  t[t.Correct = 0] = "Correct", t[t.Wrong = 1] = "Wrong";
})(rn || (Ne.DataType = rn = {}));
function p$(t) {
  const e = Qd(t.type);
  if (e.includes("null")) {
    if (t.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!e.length && t.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    t.nullable === !0 && e.push("null");
  }
  return e;
}
Ne.getSchemaTypes = p$;
function Qd(t) {
  const e = Array.isArray(t) ? t : t ? [t] : [];
  if (e.every(f$.isJSONType))
    return e;
  throw new Error("type must be JSONType or JSONType[]: " + e.join(","));
}
Ne.getJSONTypes = Qd;
function y$(t, e) {
  const { gen: r, data: n, opts: s } = t, a = $$(e, s.coerceTypes), o = e.length > 0 && !(a.length === 0 && e.length === 1 && (0, h$.schemaHasRulesForType)(t, e[0]));
  if (o) {
    const i = ni(e, n, s.strictNumbers, rn.Wrong);
    r.if(i, () => {
      a.length ? g$(t, e, a) : si(t);
    });
  }
  return o;
}
Ne.coerceAndCheckDataType = y$;
const ef = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function $$(t, e) {
  return e ? t.filter((r) => ef.has(r) || e === "array" && r === "array") : [];
}
function g$(t, e, r) {
  const { gen: n, data: s, opts: a } = t, o = n.let("dataType", (0, ne._)`typeof ${s}`), i = n.let("coerced", (0, ne._)`undefined`);
  a.coerceTypes === "array" && n.if((0, ne._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, ne._)`${s}[0]`).assign(o, (0, ne._)`typeof ${s}`).if(ni(e, s, a.strictNumbers), () => n.assign(i, s))), n.if((0, ne._)`${i} !== undefined`);
  for (const u of r)
    (ef.has(u) || u === "array" && a.coerceTypes === "array") && c(u);
  n.else(), si(t), n.endIf(), n.if((0, ne._)`${i} !== undefined`, () => {
    n.assign(s, i), _$(t, i);
  });
  function c(u) {
    switch (u) {
      case "string":
        n.elseIf((0, ne._)`${o} == "number" || ${o} == "boolean"`).assign(i, (0, ne._)`"" + ${s}`).elseIf((0, ne._)`${s} === null`).assign(i, (0, ne._)`""`);
        return;
      case "number":
        n.elseIf((0, ne._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(i, (0, ne._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, ne._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(i, (0, ne._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, ne._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(i, !1).elseIf((0, ne._)`${s} === "true" || ${s} === 1`).assign(i, !0);
        return;
      case "null":
        n.elseIf((0, ne._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(i, null);
        return;
      case "array":
        n.elseIf((0, ne._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(i, (0, ne._)`[${s}]`);
    }
  }
}
function _$({ gen: t, parentData: e, parentDataProperty: r }, n) {
  t.if((0, ne._)`${e} !== undefined`, () => t.assign((0, ne._)`${e}[${r}]`, n));
}
function Co(t, e, r, n = rn.Correct) {
  const s = n === rn.Correct ? ne.operators.EQ : ne.operators.NEQ;
  let a;
  switch (t) {
    case "null":
      return (0, ne._)`${e} ${s} null`;
    case "array":
      a = (0, ne._)`Array.isArray(${e})`;
      break;
    case "object":
      a = (0, ne._)`${e} && typeof ${e} == "object" && !Array.isArray(${e})`;
      break;
    case "integer":
      a = o((0, ne._)`!(${e} % 1) && !isNaN(${e})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, ne._)`typeof ${e} ${s} ${t}`;
  }
  return n === rn.Correct ? a : (0, ne.not)(a);
  function o(i = ne.nil) {
    return (0, ne.and)((0, ne._)`typeof ${e} == "number"`, i, r ? (0, ne._)`isFinite(${e})` : ne.nil);
  }
}
Ne.checkDataType = Co;
function ni(t, e, r, n) {
  if (t.length === 1)
    return Co(t[0], e, r, n);
  let s;
  const a = (0, Yd.toHash)(t);
  if (a.array && a.object) {
    const o = (0, ne._)`typeof ${e} != "object"`;
    s = a.null ? o : (0, ne._)`!${e} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    s = ne.nil;
  a.number && delete a.integer;
  for (const o in a)
    s = (0, ne.and)(s, Co(o, e, r, n));
  return s;
}
Ne.checkDataTypes = ni;
const v$ = {
  message: ({ schema: t }) => `must be ${t}`,
  params: ({ schema: t, schemaValue: e }) => typeof t == "string" ? (0, ne._)`{type: ${t}}` : (0, ne._)`{type: ${e}}`
};
function si(t) {
  const e = w$(t);
  (0, m$.reportError)(e, v$);
}
Ne.reportTypeError = si;
function w$(t) {
  const { gen: e, data: r, schema: n } = t, s = (0, Yd.schemaRefOrVal)(t, n, "type");
  return {
    gen: e,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: t
  };
}
var Na = {};
Object.defineProperty(Na, "__esModule", { value: !0 });
Na.assignDefaults = void 0;
const Fr = re, E$ = D;
function b$(t, e) {
  const { properties: r, items: n } = t.schema;
  if (e === "object" && r)
    for (const s in r)
      Pu(t, s, r[s].default);
  else e === "array" && Array.isArray(n) && n.forEach((s, a) => Pu(t, a, s.default));
}
Na.assignDefaults = b$;
function Pu(t, e, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = t;
  if (r === void 0)
    return;
  const i = (0, Fr._)`${a}${(0, Fr.getProperty)(e)}`;
  if (s) {
    (0, E$.checkStrictMode)(t, `default is ignored for: ${i}`);
    return;
  }
  let c = (0, Fr._)`${i} === undefined`;
  o.useDefaults === "empty" && (c = (0, Fr._)`${c} || ${i} === null || ${i} === ""`), n.if(c, (0, Fr._)`${i} = ${(0, Fr.stringify)(r)}`);
}
var vt = {}, ce = {};
Object.defineProperty(ce, "__esModule", { value: !0 });
ce.validateUnion = ce.validateArray = ce.usePattern = ce.callValidateCode = ce.schemaProperties = ce.allSchemaProperties = ce.noPropertyInData = ce.propertyInData = ce.isOwnProperty = ce.hasPropFunc = ce.reportMissingProp = ce.checkMissingProp = ce.checkReportMissingProp = void 0;
const ge = re, ai = D, qt = Ye, S$ = D;
function P$(t, e) {
  const { gen: r, data: n, it: s } = t;
  r.if(ii(r, n, e, s.opts.ownProperties), () => {
    t.setParams({ missingProperty: (0, ge._)`${e}` }, !0), t.error();
  });
}
ce.checkReportMissingProp = P$;
function R$({ gen: t, data: e, it: { opts: r } }, n, s) {
  return (0, ge.or)(...n.map((a) => (0, ge.and)(ii(t, e, a, r.ownProperties), (0, ge._)`${s} = ${a}`)));
}
ce.checkMissingProp = R$;
function N$(t, e) {
  t.setParams({ missingProperty: e }, !0), t.error();
}
ce.reportMissingProp = N$;
function tf(t) {
  return t.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, ge._)`Object.prototype.hasOwnProperty`
  });
}
ce.hasPropFunc = tf;
function oi(t, e, r) {
  return (0, ge._)`${tf(t)}.call(${e}, ${r})`;
}
ce.isOwnProperty = oi;
function O$(t, e, r, n) {
  const s = (0, ge._)`${e}${(0, ge.getProperty)(r)} !== undefined`;
  return n ? (0, ge._)`${s} && ${oi(t, e, r)}` : s;
}
ce.propertyInData = O$;
function ii(t, e, r, n) {
  const s = (0, ge._)`${e}${(0, ge.getProperty)(r)} === undefined`;
  return n ? (0, ge.or)(s, (0, ge.not)(oi(t, e, r))) : s;
}
ce.noPropertyInData = ii;
function rf(t) {
  return t ? Object.keys(t).filter((e) => e !== "__proto__") : [];
}
ce.allSchemaProperties = rf;
function T$(t, e) {
  return rf(e).filter((r) => !(0, ai.alwaysValidSchema)(t, e[r]));
}
ce.schemaProperties = T$;
function k$({ schemaCode: t, data: e, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, i, c, u) {
  const l = u ? (0, ge._)`${t}, ${e}, ${n}${s}` : e, f = [
    [qt.default.instancePath, (0, ge.strConcat)(qt.default.instancePath, a)],
    [qt.default.parentData, o.parentData],
    [qt.default.parentDataProperty, o.parentDataProperty],
    [qt.default.rootData, qt.default.rootData]
  ];
  o.opts.dynamicRef && f.push([qt.default.dynamicAnchors, qt.default.dynamicAnchors]);
  const v = (0, ge._)`${l}, ${r.object(...f)}`;
  return c !== ge.nil ? (0, ge._)`${i}.call(${c}, ${v})` : (0, ge._)`${i}(${v})`;
}
ce.callValidateCode = k$;
const I$ = (0, ge._)`new RegExp`;
function C$({ gen: t, it: { opts: e } }, r) {
  const n = e.unicodeRegExp ? "u" : "", { regExp: s } = e.code, a = s(r, n);
  return t.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, ge._)`${s.code === "new RegExp" ? I$ : (0, S$.useFunc)(t, s)}(${r}, ${n})`
  });
}
ce.usePattern = C$;
function j$(t) {
  const { gen: e, data: r, keyword: n, it: s } = t, a = e.name("valid");
  if (s.allErrors) {
    const i = e.let("valid", !0);
    return o(() => e.assign(i, !1)), i;
  }
  return e.var(a, !0), o(() => e.break()), a;
  function o(i) {
    const c = e.const("len", (0, ge._)`${r}.length`);
    e.forRange("i", 0, c, (u) => {
      t.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: ai.Type.Num
      }, a), e.if((0, ge.not)(a), i);
    });
  }
}
ce.validateArray = j$;
function A$(t) {
  const { gen: e, schema: r, keyword: n, it: s } = t;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ai.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const o = e.let("valid", !1), i = e.name("_valid");
  e.block(() => r.forEach((c, u) => {
    const l = t.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, i);
    e.assign(o, (0, ge._)`${o} || ${i}`), t.mergeValidEvaluated(l, i) || e.if((0, ge.not)(o));
  })), t.result(o, () => t.reset(), () => t.error(!0));
}
ce.validateUnion = A$;
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.validateKeywordUsage = vt.validSchemaType = vt.funcKeywordCode = vt.macroKeywordCode = void 0;
const ze = re, Sr = Ye, D$ = ce, M$ = ws;
function V$(t, e) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = t, i = e.macro.call(o.self, s, a, o), c = nf(r, n, i);
  o.opts.validateSchema !== !1 && o.self.validateSchema(i, !0);
  const u = r.name("valid");
  t.subschema({
    schema: i,
    schemaPath: ze.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, u), t.pass(u, () => t.error(!0));
}
vt.macroKeywordCode = V$;
function L$(t, e) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: i, it: c } = t;
  z$(c, e);
  const u = !i && e.compile ? e.compile.call(c.self, a, o, c) : e.validate, l = nf(n, s, u), f = n.let("valid");
  t.block$data(f, v), t.ok((r = e.valid) !== null && r !== void 0 ? r : f);
  function v() {
    if (e.errors === !1)
      w(), e.modifying && Ru(t), $(() => t.error());
    else {
      const m = e.async ? g() : y();
      e.modifying && Ru(t), $(() => F$(t, m));
    }
  }
  function g() {
    const m = n.let("ruleErrs", null);
    return n.try(() => w((0, ze._)`await `), (E) => n.assign(f, !1).if((0, ze._)`${E} instanceof ${c.ValidationError}`, () => n.assign(m, (0, ze._)`${E}.errors`), () => n.throw(E))), m;
  }
  function y() {
    const m = (0, ze._)`${l}.errors`;
    return n.assign(m, null), w(ze.nil), m;
  }
  function w(m = e.async ? (0, ze._)`await ` : ze.nil) {
    const E = c.opts.passContext ? Sr.default.this : Sr.default.self, R = !("compile" in e && !i || e.schema === !1);
    n.assign(f, (0, ze._)`${m}${(0, D$.callValidateCode)(t, l, E, R)}`, e.modifying);
  }
  function $(m) {
    var E;
    n.if((0, ze.not)((E = e.valid) !== null && E !== void 0 ? E : f), m);
  }
}
vt.funcKeywordCode = L$;
function Ru(t) {
  const { gen: e, data: r, it: n } = t;
  e.if(n.parentData, () => e.assign(r, (0, ze._)`${n.parentData}[${n.parentDataProperty}]`));
}
function F$(t, e) {
  const { gen: r } = t;
  r.if((0, ze._)`Array.isArray(${e})`, () => {
    r.assign(Sr.default.vErrors, (0, ze._)`${Sr.default.vErrors} === null ? ${e} : ${Sr.default.vErrors}.concat(${e})`).assign(Sr.default.errors, (0, ze._)`${Sr.default.vErrors}.length`), (0, M$.extendErrors)(t);
  }, () => t.error());
}
function z$({ schemaEnv: t }, e) {
  if (e.async && !t.$async)
    throw new Error("async keyword in sync schema");
}
function nf(t, e, r) {
  if (r === void 0)
    throw new Error(`keyword "${e}" failed to compile`);
  return t.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, ze.stringify)(r) });
}
function U$(t, e, r = !1) {
  return !e.length || e.some((n) => n === "array" ? Array.isArray(t) : n === "object" ? t && typeof t == "object" && !Array.isArray(t) : typeof t == n || r && typeof t > "u");
}
vt.validSchemaType = U$;
function x$({ schema: t, opts: e, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((i) => !Object.prototype.hasOwnProperty.call(t, i)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(t[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (e.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
vt.validateKeywordUsage = x$;
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.extendSubschemaMode = er.extendSubschemaData = er.getSubschema = void 0;
const gt = re, sf = D;
function q$(t, { keyword: e, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (e !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (e !== void 0) {
    const i = t.schema[e];
    return r === void 0 ? {
      schema: i,
      schemaPath: (0, gt._)`${t.schemaPath}${(0, gt.getProperty)(e)}`,
      errSchemaPath: `${t.errSchemaPath}/${e}`
    } : {
      schema: i[r],
      schemaPath: (0, gt._)`${t.schemaPath}${(0, gt.getProperty)(e)}${(0, gt.getProperty)(r)}`,
      errSchemaPath: `${t.errSchemaPath}/${e}/${(0, sf.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: o,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
er.getSubschema = q$;
function K$(t, e, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: i } = e;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: l, opts: f } = e, v = i.let("data", (0, gt._)`${e.data}${(0, gt.getProperty)(r)}`, !0);
    c(v), t.errorPath = (0, gt.str)`${u}${(0, sf.getErrorPath)(r, n, f.jsPropertySyntax)}`, t.parentDataProperty = (0, gt._)`${r}`, t.dataPathArr = [...l, t.parentDataProperty];
  }
  if (s !== void 0) {
    const u = s instanceof gt.Name ? s : i.let("data", s, !0);
    c(u), o !== void 0 && (t.propertyName = o);
  }
  a && (t.dataTypes = a);
  function c(u) {
    t.data = u, t.dataLevel = e.dataLevel + 1, t.dataTypes = [], e.definedProperties = /* @__PURE__ */ new Set(), t.parentData = e.data, t.dataNames = [...e.dataNames, u];
  }
}
er.extendSubschemaData = K$;
function G$(t, { jtdDiscriminator: e, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (t.compositeRule = n), s !== void 0 && (t.createErrors = s), a !== void 0 && (t.allErrors = a), t.jtdDiscriminator = e, t.jtdMetadata = r;
}
er.extendSubschemaMode = G$;
var Ce = {}, Oa = function t(e, r) {
  if (e === r) return !0;
  if (e && r && typeof e == "object" && typeof r == "object") {
    if (e.constructor !== r.constructor) return !1;
    var n, s, a;
    if (Array.isArray(e)) {
      if (n = e.length, n != r.length) return !1;
      for (s = n; s-- !== 0; )
        if (!t(e[s], r[s])) return !1;
      return !0;
    }
    if (e.constructor === RegExp) return e.source === r.source && e.flags === r.flags;
    if (e.valueOf !== Object.prototype.valueOf) return e.valueOf() === r.valueOf();
    if (e.toString !== Object.prototype.toString) return e.toString() === r.toString();
    if (a = Object.keys(e), n = a.length, n !== Object.keys(r).length) return !1;
    for (s = n; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(r, a[s])) return !1;
    for (s = n; s-- !== 0; ) {
      var o = a[s];
      if (!t(e[o], r[o])) return !1;
    }
    return !0;
  }
  return e !== e && r !== r;
}, af = { exports: {} }, Xt = af.exports = function(t, e, r) {
  typeof e == "function" && (r = e, e = {}), r = e.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Zs(e, n, s, t, "", t);
};
Xt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Xt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Xt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Xt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Zs(t, e, r, n, s, a, o, i, c, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    e(n, s, a, o, i, c, u);
    for (var l in n) {
      var f = n[l];
      if (Array.isArray(f)) {
        if (l in Xt.arrayKeywords)
          for (var v = 0; v < f.length; v++)
            Zs(t, e, r, f[v], s + "/" + l + "/" + v, a, s, l, n, v);
      } else if (l in Xt.propsKeywords) {
        if (f && typeof f == "object")
          for (var g in f)
            Zs(t, e, r, f[g], s + "/" + l + "/" + Z$(g), a, s, l, n, g);
      } else (l in Xt.keywords || t.allKeys && !(l in Xt.skipKeywords)) && Zs(t, e, r, f, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, o, i, c, u);
  }
}
function Z$(t) {
  return t.replace(/~/g, "~0").replace(/\//g, "~1");
}
var H$ = af.exports;
Object.defineProperty(Ce, "__esModule", { value: !0 });
Ce.getSchemaRefs = Ce.resolveUrl = Ce.normalizeId = Ce._getFullPath = Ce.getFullPath = Ce.inlineRef = void 0;
const B$ = D, W$ = Oa, J$ = H$, X$ = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Y$(t, e = !0) {
  return typeof t == "boolean" ? !0 : e === !0 ? !jo(t) : e ? of(t) <= e : !1;
}
Ce.inlineRef = Y$;
const Q$ = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function jo(t) {
  for (const e in t) {
    if (Q$.has(e))
      return !0;
    const r = t[e];
    if (Array.isArray(r) && r.some(jo) || typeof r == "object" && jo(r))
      return !0;
  }
  return !1;
}
function of(t) {
  let e = 0;
  for (const r in t) {
    if (r === "$ref")
      return 1 / 0;
    if (e++, !X$.has(r) && (typeof t[r] == "object" && (0, B$.eachItem)(t[r], (n) => e += of(n)), e === 1 / 0))
      return 1 / 0;
  }
  return e;
}
function cf(t, e = "", r) {
  r !== !1 && (e = nn(e));
  const n = t.parse(e);
  return uf(t, n);
}
Ce.getFullPath = cf;
function uf(t, e) {
  return t.serialize(e).split("#")[0] + "#";
}
Ce._getFullPath = uf;
const eg = /#\/?$/;
function nn(t) {
  return t ? t.replace(eg, "") : "";
}
Ce.normalizeId = nn;
function tg(t, e, r) {
  return r = nn(r), t.resolve(e, r);
}
Ce.resolveUrl = tg;
const rg = /^[a-z_][-a-z0-9._]*$/i;
function ng(t, e) {
  if (typeof t == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = nn(t[r] || e), a = { "": s }, o = cf(n, s, !1), i = {}, c = /* @__PURE__ */ new Set();
  return J$(t, { allKeys: !0 }, (f, v, g, y) => {
    if (y === void 0)
      return;
    const w = o + v;
    let $ = a[y];
    typeof f[r] == "string" && ($ = m.call(this, f[r])), E.call(this, f.$anchor), E.call(this, f.$dynamicAnchor), a[v] = $;
    function m(R) {
      const N = this.opts.uriResolver.resolve;
      if (R = nn($ ? N($, R) : R), c.has(R))
        throw l(R);
      c.add(R);
      let O = this.refs[R];
      return typeof O == "string" && (O = this.refs[O]), typeof O == "object" ? u(f, O.schema, R) : R !== nn(w) && (R[0] === "#" ? (u(f, i[R], R), i[R] = f) : this.refs[R] = w), R;
    }
    function E(R) {
      if (typeof R == "string") {
        if (!rg.test(R))
          throw new Error(`invalid anchor "${R}"`);
        m.call(this, `#${R}`);
      }
    }
  }), i;
  function u(f, v, g) {
    if (v !== void 0 && !W$(f, v))
      throw l(g);
  }
  function l(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
Ce.getSchemaRefs = ng;
Object.defineProperty(lt, "__esModule", { value: !0 });
lt.getData = lt.KeywordCxt = lt.validateFunctionCode = void 0;
const lf = fn, Nu = Ne, ci = jt, ha = Ne, sg = Na, Zn = vt, Ya = er, Z = re, Q = Ye, ag = Ce, At = D, In = ws;
function og(t) {
  if (hf(t) && (mf(t), ff(t))) {
    ug(t);
    return;
  }
  df(t, () => (0, lf.topBoolOrEmptySchema)(t));
}
lt.validateFunctionCode = og;
function df({ gen: t, validateName: e, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? t.func(e, (0, Z._)`${Q.default.data}, ${Q.default.valCxt}`, n.$async, () => {
    t.code((0, Z._)`"use strict"; ${Ou(r, s)}`), cg(t, s), t.code(a);
  }) : t.func(e, (0, Z._)`${Q.default.data}, ${ig(s)}`, n.$async, () => t.code(Ou(r, s)).code(a));
}
function ig(t) {
  return (0, Z._)`{${Q.default.instancePath}="", ${Q.default.parentData}, ${Q.default.parentDataProperty}, ${Q.default.rootData}=${Q.default.data}${t.dynamicRef ? (0, Z._)`, ${Q.default.dynamicAnchors}={}` : Z.nil}}={}`;
}
function cg(t, e) {
  t.if(Q.default.valCxt, () => {
    t.var(Q.default.instancePath, (0, Z._)`${Q.default.valCxt}.${Q.default.instancePath}`), t.var(Q.default.parentData, (0, Z._)`${Q.default.valCxt}.${Q.default.parentData}`), t.var(Q.default.parentDataProperty, (0, Z._)`${Q.default.valCxt}.${Q.default.parentDataProperty}`), t.var(Q.default.rootData, (0, Z._)`${Q.default.valCxt}.${Q.default.rootData}`), e.dynamicRef && t.var(Q.default.dynamicAnchors, (0, Z._)`${Q.default.valCxt}.${Q.default.dynamicAnchors}`);
  }, () => {
    t.var(Q.default.instancePath, (0, Z._)`""`), t.var(Q.default.parentData, (0, Z._)`undefined`), t.var(Q.default.parentDataProperty, (0, Z._)`undefined`), t.var(Q.default.rootData, Q.default.data), e.dynamicRef && t.var(Q.default.dynamicAnchors, (0, Z._)`{}`);
  });
}
function ug(t) {
  const { schema: e, opts: r, gen: n } = t;
  df(t, () => {
    r.$comment && e.$comment && yf(t), mg(t), n.let(Q.default.vErrors, null), n.let(Q.default.errors, 0), r.unevaluated && lg(t), pf(t), $g(t);
  });
}
function lg(t) {
  const { gen: e, validateName: r } = t;
  t.evaluated = e.const("evaluated", (0, Z._)`${r}.evaluated`), e.if((0, Z._)`${t.evaluated}.dynamicProps`, () => e.assign((0, Z._)`${t.evaluated}.props`, (0, Z._)`undefined`)), e.if((0, Z._)`${t.evaluated}.dynamicItems`, () => e.assign((0, Z._)`${t.evaluated}.items`, (0, Z._)`undefined`));
}
function Ou(t, e) {
  const r = typeof t == "object" && t[e.schemaId];
  return r && (e.code.source || e.code.process) ? (0, Z._)`/*# sourceURL=${r} */` : Z.nil;
}
function dg(t, e) {
  if (hf(t) && (mf(t), ff(t))) {
    fg(t, e);
    return;
  }
  (0, lf.boolOrEmptySchema)(t, e);
}
function ff({ schema: t, self: e }) {
  if (typeof t == "boolean")
    return !t;
  for (const r in t)
    if (e.RULES.all[r])
      return !0;
  return !1;
}
function hf(t) {
  return typeof t.schema != "boolean";
}
function fg(t, e) {
  const { schema: r, gen: n, opts: s } = t;
  s.$comment && r.$comment && yf(t), pg(t), yg(t);
  const a = n.const("_errs", Q.default.errors);
  pf(t, a), n.var(e, (0, Z._)`${a} === ${Q.default.errors}`);
}
function mf(t) {
  (0, At.checkUnknownRules)(t), hg(t);
}
function pf(t, e) {
  if (t.opts.jtd)
    return Tu(t, [], !1, e);
  const r = (0, Nu.getSchemaTypes)(t.schema), n = (0, Nu.coerceAndCheckDataType)(t, r);
  Tu(t, r, !n, e);
}
function hg(t) {
  const { schema: e, errSchemaPath: r, opts: n, self: s } = t;
  e.$ref && n.ignoreKeywordsWithRef && (0, At.schemaHasRulesButRef)(e, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function mg(t) {
  const { schema: e, opts: r } = t;
  e.default !== void 0 && r.useDefaults && r.strictSchema && (0, At.checkStrictMode)(t, "default is ignored in the schema root");
}
function pg(t) {
  const e = t.schema[t.opts.schemaId];
  e && (t.baseId = (0, ag.resolveUrl)(t.opts.uriResolver, t.baseId, e));
}
function yg(t) {
  if (t.schema.$async && !t.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function yf({ gen: t, schemaEnv: e, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    t.code((0, Z._)`${Q.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, Z.str)`${n}/$comment`, i = t.scopeValue("root", { ref: e.root });
    t.code((0, Z._)`${Q.default.self}.opts.$comment(${a}, ${o}, ${i}.schema)`);
  }
}
function $g(t) {
  const { gen: e, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = t;
  r.$async ? e.if((0, Z._)`${Q.default.errors} === 0`, () => e.return(Q.default.data), () => e.throw((0, Z._)`new ${s}(${Q.default.vErrors})`)) : (e.assign((0, Z._)`${n}.errors`, Q.default.vErrors), a.unevaluated && gg(t), e.return((0, Z._)`${Q.default.errors} === 0`));
}
function gg({ gen: t, evaluated: e, props: r, items: n }) {
  r instanceof Z.Name && t.assign((0, Z._)`${e}.props`, r), n instanceof Z.Name && t.assign((0, Z._)`${e}.items`, n);
}
function Tu(t, e, r, n) {
  const { gen: s, schema: a, data: o, allErrors: i, opts: c, self: u } = t, { RULES: l } = u;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, At.schemaHasRulesButRef)(a, l))) {
    s.block(() => _f(t, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || _g(t, e), s.block(() => {
    for (const v of l.rules)
      f(v);
    f(l.post);
  });
  function f(v) {
    (0, ci.shouldUseGroup)(a, v) && (v.type ? (s.if((0, ha.checkDataType)(v.type, o, c.strictNumbers)), ku(t, v), e.length === 1 && e[0] === v.type && r && (s.else(), (0, ha.reportTypeError)(t)), s.endIf()) : ku(t, v), i || s.if((0, Z._)`${Q.default.errors} === ${n || 0}`));
  }
}
function ku(t, e) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = t;
  s && (0, sg.assignDefaults)(t, e.type), r.block(() => {
    for (const a of e.rules)
      (0, ci.shouldUseRule)(n, a) && _f(t, a.keyword, a.definition, e.type);
  });
}
function _g(t, e) {
  t.schemaEnv.meta || !t.opts.strictTypes || (vg(t, e), t.opts.allowUnionTypes || wg(t, e), Eg(t, t.dataTypes));
}
function vg(t, e) {
  if (e.length) {
    if (!t.dataTypes.length) {
      t.dataTypes = e;
      return;
    }
    e.forEach((r) => {
      $f(t.dataTypes, r) || ui(t, `type "${r}" not allowed by context "${t.dataTypes.join(",")}"`);
    }), Sg(t, e);
  }
}
function wg(t, e) {
  e.length > 1 && !(e.length === 2 && e.includes("null")) && ui(t, "use allowUnionTypes to allow union type keyword");
}
function Eg(t, e) {
  const r = t.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, ci.shouldUseRule)(t.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => bg(e, o)) && ui(t, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function bg(t, e) {
  return t.includes(e) || e === "number" && t.includes("integer");
}
function $f(t, e) {
  return t.includes(e) || e === "integer" && t.includes("number");
}
function Sg(t, e) {
  const r = [];
  for (const n of t.dataTypes)
    $f(e, n) ? r.push(n) : e.includes("integer") && n === "number" && r.push("integer");
  t.dataTypes = r;
}
function ui(t, e) {
  const r = t.schemaEnv.baseId + t.errSchemaPath;
  e += ` at "${r}" (strictTypes)`, (0, At.checkStrictMode)(t, e, t.opts.strictTypes);
}
let gf = class {
  constructor(e, r, n) {
    if ((0, Zn.validateKeywordUsage)(e, r, n), this.gen = e.gen, this.allErrors = e.allErrors, this.keyword = n, this.data = e.data, this.schema = e.schema[n], this.$data = r.$data && e.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, At.schemaRefOrVal)(e, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = e.schema, this.params = {}, this.it = e, this.def = r, this.$data)
      this.schemaCode = e.gen.const("vSchema", vf(this.$data, e));
    else if (this.schemaCode = this.schemaValue, !(0, Zn.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = e.gen.const("_errs", Q.default.errors));
  }
  result(e, r, n) {
    this.failResult((0, Z.not)(e), r, n);
  }
  failResult(e, r, n) {
    this.gen.if(e), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(e, r) {
    this.failResult((0, Z.not)(e), void 0, r);
  }
  fail(e) {
    if (e === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(e), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(e) {
    if (!this.$data)
      return this.fail(e);
    const { schemaCode: r } = this;
    this.fail((0, Z._)`${r} !== undefined && (${(0, Z.or)(this.invalid$data(), e)})`);
  }
  error(e, r, n) {
    if (r) {
      this.setParams(r), this._error(e, n), this.setParams({});
      return;
    }
    this._error(e, n);
  }
  _error(e, r) {
    (e ? In.reportExtraError : In.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, In.reportError)(this, this.def.$dataError || In.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, In.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(e) {
    this.allErrors || this.gen.if(e);
  }
  setParams(e, r) {
    r ? Object.assign(this.params, e) : this.params = e;
  }
  block$data(e, r, n = Z.nil) {
    this.gen.block(() => {
      this.check$data(e, n), r();
    });
  }
  check$data(e = Z.nil, r = Z.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: o } = this;
    n.if((0, Z.or)((0, Z._)`${s} === undefined`, r)), e !== Z.nil && n.assign(e, !0), (a.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), e !== Z.nil && n.assign(e, !1)), n.else();
  }
  invalid$data() {
    const { gen: e, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, Z.or)(o(), i());
    function o() {
      if (n.length) {
        if (!(r instanceof Z.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, Z._)`${(0, ha.checkDataTypes)(c, r, a.opts.strictNumbers, ha.DataType.Wrong)}`;
      }
      return Z.nil;
    }
    function i() {
      if (s.validateSchema) {
        const c = e.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, Z._)`!${c}(${r})`;
      }
      return Z.nil;
    }
  }
  subschema(e, r) {
    const n = (0, Ya.getSubschema)(this.it, e);
    (0, Ya.extendSubschemaData)(n, this.it, e), (0, Ya.extendSubschemaMode)(n, e);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return dg(s, r), s;
  }
  mergeEvaluated(e, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && e.props !== void 0 && (n.props = At.mergeEvaluated.props(s, e.props, n.props, r)), n.items !== !0 && e.items !== void 0 && (n.items = At.mergeEvaluated.items(s, e.items, n.items, r)));
  }
  mergeValidEvaluated(e, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(e, Z.Name)), !0;
  }
};
lt.KeywordCxt = gf;
function _f(t, e, r, n) {
  const s = new gf(t, r, e);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Zn.funcKeywordCode)(s, r) : "macro" in r ? (0, Zn.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Zn.funcKeywordCode)(s, r);
}
const Pg = /^\/(?:[^~]|~0|~1)*$/, Rg = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function vf(t, { dataLevel: e, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (t === "")
    return Q.default.rootData;
  if (t[0] === "/") {
    if (!Pg.test(t))
      throw new Error(`Invalid JSON-pointer: ${t}`);
    s = t, a = Q.default.rootData;
  } else {
    const u = Rg.exec(t);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${t}`);
    const l = +u[1];
    if (s = u[2], s === "#") {
      if (l >= e)
        throw new Error(c("property/index", l));
      return n[e - l];
    }
    if (l > e)
      throw new Error(c("data", l));
    if (a = r[e - l], !s)
      return a;
  }
  let o = a;
  const i = s.split("/");
  for (const u of i)
    u && (a = (0, Z._)`${a}${(0, Z.getProperty)((0, At.unescapeJsonPointer)(u))}`, o = (0, Z._)`${o} && ${a}`);
  return o;
  function c(u, l) {
    return `Cannot access ${u} ${l} levels up, current level is ${e}`;
  }
}
lt.getData = vf;
var Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
let Ng = class extends Error {
  constructor(e) {
    super("validation failed"), this.errors = e, this.ajv = this.validation = !0;
  }
};
Es.default = Ng;
var yn = {};
Object.defineProperty(yn, "__esModule", { value: !0 });
const Qa = Ce;
let Og = class extends Error {
  constructor(e, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, Qa.resolveUrl)(e, r, n), this.missingSchema = (0, Qa.normalizeId)((0, Qa.getFullPath)(e, this.missingRef));
  }
};
yn.default = Og;
var xe = {};
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.resolveSchema = xe.getCompilingSchema = xe.resolveRef = xe.compileSchema = xe.SchemaEnv = void 0;
const rt = re, Tg = Es, Er = Ye, ot = Ce, Iu = D, kg = lt;
let Ta = class {
  constructor(e) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof e.schema == "object" && (n = e.schema), this.schema = e.schema, this.schemaId = e.schemaId, this.root = e.root || this, this.baseId = (r = e.baseId) !== null && r !== void 0 ? r : (0, ot.normalizeId)(n == null ? void 0 : n[e.schemaId || "$id"]), this.schemaPath = e.schemaPath, this.localRefs = e.localRefs, this.meta = e.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
};
xe.SchemaEnv = Ta;
function li(t) {
  const e = wf.call(this, t);
  if (e)
    return e;
  const r = (0, ot.getFullPath)(this.opts.uriResolver, t.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new rt.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let i;
  t.$async && (i = o.scopeValue("Error", {
    ref: Tg.default,
    code: (0, rt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  t.validateName = c;
  const u = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: Er.default.data,
    parentData: Er.default.parentData,
    parentDataProperty: Er.default.parentDataProperty,
    dataNames: [Er.default.data],
    dataPathArr: [rt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: t.schema, code: (0, rt.stringify)(t.schema) } : { ref: t.schema }),
    validateName: c,
    ValidationError: i,
    schema: t.schema,
    schemaEnv: t,
    rootId: r,
    baseId: t.baseId || r,
    schemaPath: rt.nil,
    errSchemaPath: t.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, rt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(t), (0, kg.validateFunctionCode)(u), o.optimize(this.opts.code.optimize);
    const f = o.toString();
    l = `${o.scopeRefs(Er.default.scope)}return ${f}`, this.opts.code.process && (l = this.opts.code.process(l, t));
    const g = new Function(`${Er.default.self}`, `${Er.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = t.schema, g.schemaEnv = t, t.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: f, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: y, items: w } = u;
      g.evaluated = {
        props: y instanceof rt.Name ? void 0 : y,
        items: w instanceof rt.Name ? void 0 : w,
        dynamicProps: y instanceof rt.Name,
        dynamicItems: w instanceof rt.Name
      }, g.source && (g.source.evaluated = (0, rt.stringify)(g.evaluated));
    }
    return t.validate = g, t;
  } catch (f) {
    throw delete t.validate, delete t.validateName, l && this.logger.error("Error compiling schema, function code:", l), f;
  } finally {
    this._compilations.delete(t);
  }
}
xe.compileSchema = li;
function Ig(t, e, r) {
  var n;
  r = (0, ot.resolveUrl)(this.opts.uriResolver, e, r);
  const s = t.refs[r];
  if (s)
    return s;
  let a = Ag.call(this, t, r);
  if (a === void 0) {
    const o = (n = t.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: i } = this.opts;
    o && (a = new Ta({ schema: o, schemaId: i, root: t, baseId: e }));
  }
  if (a !== void 0)
    return t.refs[r] = Cg.call(this, a);
}
xe.resolveRef = Ig;
function Cg(t) {
  return (0, ot.inlineRef)(t.schema, this.opts.inlineRefs) ? t.schema : t.validate ? t : li.call(this, t);
}
function wf(t) {
  for (const e of this._compilations)
    if (jg(e, t))
      return e;
}
xe.getCompilingSchema = wf;
function jg(t, e) {
  return t.schema === e.schema && t.root === e.root && t.baseId === e.baseId;
}
function Ag(t, e) {
  let r;
  for (; typeof (r = this.refs[e]) == "string"; )
    e = r;
  return r || this.schemas[e] || ka.call(this, t, e);
}
function ka(t, e) {
  const r = this.opts.uriResolver.parse(e), n = (0, ot._getFullPath)(this.opts.uriResolver, r);
  let s = (0, ot.getFullPath)(this.opts.uriResolver, t.baseId, void 0);
  if (Object.keys(t.schema).length > 0 && n === s)
    return eo.call(this, r, t);
  const a = (0, ot.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const i = ka.call(this, t, o);
    return typeof (i == null ? void 0 : i.schema) != "object" ? void 0 : eo.call(this, r, i);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || li.call(this, o), a === (0, ot.normalizeId)(e)) {
      const { schema: i } = o, { schemaId: c } = this.opts, u = i[c];
      return u && (s = (0, ot.resolveUrl)(this.opts.uriResolver, s, u)), new Ta({ schema: i, schemaId: c, root: t, baseId: s });
    }
    return eo.call(this, r, o);
  }
}
xe.resolveSchema = ka;
const Dg = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function eo(t, { baseId: e, schema: r, root: n }) {
  var s;
  if (((s = t.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const i of t.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, Iu.unescapeFragment)(i)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !Dg.has(i) && u && (e = (0, ot.resolveUrl)(this.opts.uriResolver, e, u));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, Iu.schemaHasRulesButRef)(r, this.RULES)) {
    const i = (0, ot.resolveUrl)(this.opts.uriResolver, e, r.$ref);
    a = ka.call(this, n, i);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new Ta({ schema: r, schemaId: o, root: n, baseId: e }), a.schema !== a.root.schema)
    return a;
}
const Mg = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Vg = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Lg = "object", Fg = [
  "$data"
], zg = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, Ug = !1, xg = {
  $id: Mg,
  description: Vg,
  type: Lg,
  required: Fg,
  properties: zg,
  additionalProperties: Ug
};
var di = {}, Ia = { exports: {} };
const qg = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
var Kg = {
  HEX: qg
};
const { HEX: Gg } = Kg;
function Ef(t) {
  if (Sf(t, ".") < 3)
    return { host: t, isIPV4: !1 };
  const e = t.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [r] = e;
  return r ? { host: Hg(r, "."), isIPV4: !0 } : { host: t, isIPV4: !1 };
}
function Ao(t, e = !1) {
  let r = "", n = !0;
  for (const s of t) {
    if (Gg[s] === void 0) return;
    s !== "0" && n === !0 && (n = !1), n || (r += s);
  }
  return e && r.length === 0 && (r = "0"), r;
}
function Zg(t) {
  let e = 0;
  const r = { error: !1, address: "", zone: "" }, n = [], s = [];
  let a = !1, o = !1, i = !1;
  function c() {
    if (s.length) {
      if (a === !1) {
        const u = Ao(s);
        if (u !== void 0)
          n.push(u);
        else
          return r.error = !0, !1;
      }
      s.length = 0;
    }
    return !0;
  }
  for (let u = 0; u < t.length; u++) {
    const l = t[u];
    if (!(l === "[" || l === "]"))
      if (l === ":") {
        if (o === !0 && (i = !0), !c())
          break;
        if (e++, n.push(":"), e > 7) {
          r.error = !0;
          break;
        }
        u - 1 >= 0 && t[u - 1] === ":" && (o = !0);
        continue;
      } else if (l === "%") {
        if (!c())
          break;
        a = !0;
      } else {
        s.push(l);
        continue;
      }
  }
  return s.length && (a ? r.zone = s.join("") : i ? n.push(s.join("")) : n.push(Ao(s))), r.address = n.join(""), r;
}
function bf(t, e = {}) {
  if (Sf(t, ":") < 2)
    return { host: t, isIPV6: !1 };
  const r = Zg(t);
  if (r.error)
    return { host: t, isIPV6: !1 };
  {
    let n = r.address, s = r.address;
    return r.zone && (n += "%" + r.zone, s += "%25" + r.zone), { host: n, escapedHost: s, isIPV6: !0 };
  }
}
function Hg(t, e) {
  let r = "", n = !0;
  const s = t.length;
  for (let a = 0; a < s; a++) {
    const o = t[a];
    o === "0" && n ? (a + 1 <= s && t[a + 1] === e || a + 1 === s) && (r += o, n = !1) : (o === e ? n = !0 : n = !1, r += o);
  }
  return r;
}
function Sf(t, e) {
  let r = 0;
  for (let n = 0; n < t.length; n++)
    t[n] === e && r++;
  return r;
}
const Cu = /^\.\.?\//u, ju = /^\/\.(?:\/|$)/u, Au = /^\/\.\.(?:\/|$)/u, Bg = /^\/?(?:.|\n)*?(?=\/|$)/u;
function Wg(t) {
  const e = [];
  for (; t.length; )
    if (t.match(Cu))
      t = t.replace(Cu, "");
    else if (t.match(ju))
      t = t.replace(ju, "/");
    else if (t.match(Au))
      t = t.replace(Au, "/"), e.pop();
    else if (t === "." || t === "..")
      t = "";
    else {
      const r = t.match(Bg);
      if (r) {
        const n = r[0];
        t = t.slice(n.length), e.push(n);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return e.join("");
}
function Jg(t, e) {
  const r = e !== !0 ? escape : unescape;
  return t.scheme !== void 0 && (t.scheme = r(t.scheme)), t.userinfo !== void 0 && (t.userinfo = r(t.userinfo)), t.host !== void 0 && (t.host = r(t.host)), t.path !== void 0 && (t.path = r(t.path)), t.query !== void 0 && (t.query = r(t.query)), t.fragment !== void 0 && (t.fragment = r(t.fragment)), t;
}
function Xg(t, e) {
  const r = [];
  if (t.userinfo !== void 0 && (r.push(t.userinfo), r.push("@")), t.host !== void 0) {
    let n = unescape(t.host);
    const s = Ef(n);
    if (s.isIPV4)
      n = s.host;
    else {
      const a = bf(s.host, { isIPV4: !1 });
      a.isIPV6 === !0 ? n = `[${a.escapedHost}]` : n = t.host;
    }
    r.push(n);
  }
  return (typeof t.port == "number" || typeof t.port == "string") && (r.push(":"), r.push(String(t.port))), r.length ? r.join("") : void 0;
}
var Yg = {
  recomposeAuthority: Xg,
  normalizeComponentEncoding: Jg,
  removeDotSegments: Wg,
  normalizeIPv4: Ef,
  normalizeIPv6: bf,
  stringArrayToHexStripped: Ao
};
const Qg = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, e_ = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Pf(t) {
  return typeof t.secure == "boolean" ? t.secure : String(t.scheme).toLowerCase() === "wss";
}
function Rf(t) {
  return t.host || (t.error = t.error || "HTTP URIs must have a host."), t;
}
function Nf(t) {
  const e = String(t.scheme).toLowerCase() === "https";
  return (t.port === (e ? 443 : 80) || t.port === "") && (t.port = void 0), t.path || (t.path = "/"), t;
}
function t_(t) {
  return t.secure = Pf(t), t.resourceName = (t.path || "/") + (t.query ? "?" + t.query : ""), t.path = void 0, t.query = void 0, t;
}
function r_(t) {
  if ((t.port === (Pf(t) ? 443 : 80) || t.port === "") && (t.port = void 0), typeof t.secure == "boolean" && (t.scheme = t.secure ? "wss" : "ws", t.secure = void 0), t.resourceName) {
    const [e, r] = t.resourceName.split("?");
    t.path = e && e !== "/" ? e : void 0, t.query = r, t.resourceName = void 0;
  }
  return t.fragment = void 0, t;
}
function n_(t, e) {
  if (!t.path)
    return t.error = "URN can not be parsed", t;
  const r = t.path.match(e_);
  if (r) {
    const n = e.scheme || t.scheme || "urn";
    t.nid = r[1].toLowerCase(), t.nss = r[2];
    const s = `${n}:${e.nid || t.nid}`, a = fi[s];
    t.path = void 0, a && (t = a.parse(t, e));
  } else
    t.error = t.error || "URN can not be parsed.";
  return t;
}
function s_(t, e) {
  const r = e.scheme || t.scheme || "urn", n = t.nid.toLowerCase(), s = `${r}:${e.nid || n}`, a = fi[s];
  a && (t = a.serialize(t, e));
  const o = t, i = t.nss;
  return o.path = `${n || e.nid}:${i}`, e.skipEscape = !0, o;
}
function a_(t, e) {
  const r = t;
  return r.uuid = r.nss, r.nss = void 0, !e.tolerant && (!r.uuid || !Qg.test(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
}
function o_(t) {
  const e = t;
  return e.nss = (t.uuid || "").toLowerCase(), e;
}
const Of = {
  scheme: "http",
  domainHost: !0,
  parse: Rf,
  serialize: Nf
}, i_ = {
  scheme: "https",
  domainHost: Of.domainHost,
  parse: Rf,
  serialize: Nf
}, Hs = {
  scheme: "ws",
  domainHost: !0,
  parse: t_,
  serialize: r_
}, c_ = {
  scheme: "wss",
  domainHost: Hs.domainHost,
  parse: Hs.parse,
  serialize: Hs.serialize
}, u_ = {
  scheme: "urn",
  parse: n_,
  serialize: s_,
  skipNormalize: !0
}, l_ = {
  scheme: "urn:uuid",
  parse: a_,
  serialize: o_,
  skipNormalize: !0
}, fi = {
  http: Of,
  https: i_,
  ws: Hs,
  wss: c_,
  urn: u_,
  "urn:uuid": l_
};
var d_ = fi;
const { normalizeIPv6: f_, normalizeIPv4: h_, removeDotSegments: Ln, recomposeAuthority: m_, normalizeComponentEncoding: Ts } = Yg, hi = d_;
function p_(t, e) {
  return typeof t == "string" ? t = wt(Lt(t, e), e) : typeof t == "object" && (t = Lt(wt(t, e), e)), t;
}
function y_(t, e, r) {
  const n = Object.assign({ scheme: "null" }, r), s = Tf(Lt(t, n), Lt(e, n), n, !0);
  return wt(s, { ...n, skipEscape: !0 });
}
function Tf(t, e, r, n) {
  const s = {};
  return n || (t = Lt(wt(t, r), r), e = Lt(wt(e, r), r)), r = r || {}, !r.tolerant && e.scheme ? (s.scheme = e.scheme, s.userinfo = e.userinfo, s.host = e.host, s.port = e.port, s.path = Ln(e.path || ""), s.query = e.query) : (e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0 ? (s.userinfo = e.userinfo, s.host = e.host, s.port = e.port, s.path = Ln(e.path || ""), s.query = e.query) : (e.path ? (e.path.charAt(0) === "/" ? s.path = Ln(e.path) : ((t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0) && !t.path ? s.path = "/" + e.path : t.path ? s.path = t.path.slice(0, t.path.lastIndexOf("/") + 1) + e.path : s.path = e.path, s.path = Ln(s.path)), s.query = e.query) : (s.path = t.path, e.query !== void 0 ? s.query = e.query : s.query = t.query), s.userinfo = t.userinfo, s.host = t.host, s.port = t.port), s.scheme = t.scheme), s.fragment = e.fragment, s;
}
function $_(t, e, r) {
  return typeof t == "string" ? (t = unescape(t), t = wt(Ts(Lt(t, r), !0), { ...r, skipEscape: !0 })) : typeof t == "object" && (t = wt(Ts(t, !0), { ...r, skipEscape: !0 })), typeof e == "string" ? (e = unescape(e), e = wt(Ts(Lt(e, r), !0), { ...r, skipEscape: !0 })) : typeof e == "object" && (e = wt(Ts(e, !0), { ...r, skipEscape: !0 })), t.toLowerCase() === e.toLowerCase();
}
function wt(t, e) {
  const r = {
    host: t.host,
    scheme: t.scheme,
    userinfo: t.userinfo,
    port: t.port,
    path: t.path,
    query: t.query,
    nid: t.nid,
    nss: t.nss,
    uuid: t.uuid,
    fragment: t.fragment,
    reference: t.reference,
    resourceName: t.resourceName,
    secure: t.secure,
    error: ""
  }, n = Object.assign({}, e), s = [], a = hi[(n.scheme || r.scheme || "").toLowerCase()];
  a && a.serialize && a.serialize(r, n), r.path !== void 0 && (n.skipEscape ? r.path = unescape(r.path) : (r.path = escape(r.path), r.scheme !== void 0 && (r.path = r.path.split("%3A").join(":")))), n.reference !== "suffix" && r.scheme && s.push(r.scheme, ":");
  const o = m_(r, n);
  if (o !== void 0 && (n.reference !== "suffix" && s.push("//"), s.push(o), r.path && r.path.charAt(0) !== "/" && s.push("/")), r.path !== void 0) {
    let i = r.path;
    !n.absolutePath && (!a || !a.absolutePath) && (i = Ln(i)), o === void 0 && (i = i.replace(/^\/\//u, "/%2F")), s.push(i);
  }
  return r.query !== void 0 && s.push("?", r.query), r.fragment !== void 0 && s.push("#", r.fragment), s.join("");
}
const g_ = Array.from({ length: 127 }, (t, e) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(e)));
function __(t) {
  let e = 0;
  for (let r = 0, n = t.length; r < n; ++r)
    if (e = t.charCodeAt(r), e > 126 || g_[e])
      return !0;
  return !1;
}
const v_ = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function Lt(t, e) {
  const r = Object.assign({}, e), n = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, s = t.indexOf("%") !== -1;
  let a = !1;
  r.reference === "suffix" && (t = (r.scheme ? r.scheme + ":" : "") + "//" + t);
  const o = t.match(v_);
  if (o) {
    if (n.scheme = o[1], n.userinfo = o[3], n.host = o[4], n.port = parseInt(o[5], 10), n.path = o[6] || "", n.query = o[7], n.fragment = o[8], isNaN(n.port) && (n.port = o[5]), n.host) {
      const c = h_(n.host);
      if (c.isIPV4 === !1) {
        const u = f_(c.host, { isIPV4: !1 });
        n.host = u.host.toLowerCase(), a = u.isIPV6;
      } else
        n.host = c.host, a = !0;
    }
    n.scheme === void 0 && n.userinfo === void 0 && n.host === void 0 && n.port === void 0 && !n.path && n.query === void 0 ? n.reference = "same-document" : n.scheme === void 0 ? n.reference = "relative" : n.fragment === void 0 ? n.reference = "absolute" : n.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== n.reference && (n.error = n.error || "URI is not a " + r.reference + " reference.");
    const i = hi[(r.scheme || n.scheme || "").toLowerCase()];
    if (!r.unicodeSupport && (!i || !i.unicodeSupport) && n.host && (r.domainHost || i && i.domainHost) && a === !1 && __(n.host))
      try {
        n.host = URL.domainToASCII(n.host.toLowerCase());
      } catch (c) {
        n.error = n.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!i || i && !i.skipNormalize) && (s && n.scheme !== void 0 && (n.scheme = unescape(n.scheme)), s && n.host !== void 0 && (n.host = unescape(n.host)), n.path !== void 0 && n.path.length && (n.path = escape(unescape(n.path))), n.fragment !== void 0 && n.fragment.length && (n.fragment = encodeURI(decodeURIComponent(n.fragment)))), i && i.parse && i.parse(n, r);
  } else
    n.error = n.error || "URI can not be parsed.";
  return n;
}
const mi = {
  SCHEMES: hi,
  normalize: p_,
  resolve: y_,
  resolveComponents: Tf,
  equal: $_,
  serialize: wt,
  parse: Lt
};
Ia.exports = mi;
Ia.exports.default = mi;
Ia.exports.fastUri = mi;
var kf = Ia.exports;
Object.defineProperty(di, "__esModule", { value: !0 });
const If = kf;
If.code = 'require("ajv/dist/runtime/uri").default';
di.default = If;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = void 0;
  var e = lt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return e.KeywordCxt;
  } });
  var r = re;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Es, s = yn, a = Mr, o = xe, i = re, c = Ce, u = Ne, l = D, f = xg, v = di, g = (P, p) => new RegExp(P, p);
  g.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], w = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), $ = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function R(P) {
    var p, S, _, d, h, b, T, I, K, U, le, Be, ir, cr, ur, lr, dr, fr, hr, mr, pr, yr, $r, gr, _r;
    const tt = P.strict, vr = (p = P.code) === null || p === void 0 ? void 0 : p.optimize, Pn = vr === !0 || vr === void 0 ? 1 : vr || 0, Rn = (_ = (S = P.code) === null || S === void 0 ? void 0 : S.regExp) !== null && _ !== void 0 ? _ : g, Ga = (d = P.uriResolver) !== null && d !== void 0 ? d : v.default;
    return {
      strictSchema: (b = (h = P.strictSchema) !== null && h !== void 0 ? h : tt) !== null && b !== void 0 ? b : !0,
      strictNumbers: (I = (T = P.strictNumbers) !== null && T !== void 0 ? T : tt) !== null && I !== void 0 ? I : !0,
      strictTypes: (U = (K = P.strictTypes) !== null && K !== void 0 ? K : tt) !== null && U !== void 0 ? U : "log",
      strictTuples: (Be = (le = P.strictTuples) !== null && le !== void 0 ? le : tt) !== null && Be !== void 0 ? Be : "log",
      strictRequired: (cr = (ir = P.strictRequired) !== null && ir !== void 0 ? ir : tt) !== null && cr !== void 0 ? cr : !1,
      code: P.code ? { ...P.code, optimize: Pn, regExp: Rn } : { optimize: Pn, regExp: Rn },
      loopRequired: (ur = P.loopRequired) !== null && ur !== void 0 ? ur : E,
      loopEnum: (lr = P.loopEnum) !== null && lr !== void 0 ? lr : E,
      meta: (dr = P.meta) !== null && dr !== void 0 ? dr : !0,
      messages: (fr = P.messages) !== null && fr !== void 0 ? fr : !0,
      inlineRefs: (hr = P.inlineRefs) !== null && hr !== void 0 ? hr : !0,
      schemaId: (mr = P.schemaId) !== null && mr !== void 0 ? mr : "$id",
      addUsedSchema: (pr = P.addUsedSchema) !== null && pr !== void 0 ? pr : !0,
      validateSchema: (yr = P.validateSchema) !== null && yr !== void 0 ? yr : !0,
      validateFormats: ($r = P.validateFormats) !== null && $r !== void 0 ? $r : !0,
      unicodeRegExp: (gr = P.unicodeRegExp) !== null && gr !== void 0 ? gr : !0,
      int32range: (_r = P.int32range) !== null && _r !== void 0 ? _r : !0,
      uriResolver: Ga
    };
  }
  class N {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...R(p) };
      const { es5: S, lines: _ } = this.opts.code;
      this.scope = new i.ValueScope({ scope: {}, prefixes: w, es5: S, lines: _ }), this.logger = W(p.logger);
      const d = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), O.call(this, $, p, "NOT SUPPORTED"), O.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = Re.call(this), p.formats && $e.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && be.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), Y.call(this), p.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: _ } = this.opts;
      let d = f;
      _ === "id" && (d = { ...f }, d.id = d.$id, delete d.$id), S && p && this.addMetaSchema(d, d[_], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let _;
      if (typeof p == "string") {
        if (_ = this.getSchema(p), !_)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        _ = this.compile(p);
      const d = _(S);
      return "$async" in _ || (this.errors = _.errors), d;
    }
    compile(p, S) {
      const _ = this._addSchema(p, S);
      return _.validate || this._compileSchemaEnv(_);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: _ } = this.opts;
      return d.call(this, p, S);
      async function d(U, le) {
        await h.call(this, U.$schema);
        const Be = this._addSchema(U, le);
        return Be.validate || b.call(this, Be);
      }
      async function h(U) {
        U && !this.getSchema(U) && await d.call(this, { $ref: U }, !0);
      }
      async function b(U) {
        try {
          return this._compileSchemaEnv(U);
        } catch (le) {
          if (!(le instanceof s.default))
            throw le;
          return T.call(this, le), await I.call(this, le.missingSchema), b.call(this, U);
        }
      }
      function T({ missingSchema: U, missingRef: le }) {
        if (this.refs[U])
          throw new Error(`AnySchema ${U} is loaded but ${le} cannot be resolved`);
      }
      async function I(U) {
        const le = await K.call(this, U);
        this.refs[U] || await h.call(this, le.$schema), this.refs[U] || this.addSchema(le, U, S);
      }
      async function K(U) {
        const le = this._loading[U];
        if (le)
          return le;
        try {
          return await (this._loading[U] = _(U));
        } finally {
          delete this._loading[U];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, _, d = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, _, d);
        return this;
      }
      let h;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (h = p[b], h !== void 0 && typeof h != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || h), this._checkUnique(S), this.schemas[S] = this._addSchema(p, _, S, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, _ = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, _), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let _;
      if (_ = p.$schema, _ !== void 0 && typeof _ != "string")
        throw new Error("$schema must be a string");
      if (_ = _ || this.opts.defaultMeta || this.defaultMeta(), !_)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(_, p);
      if (!d && S) {
        const h = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(h);
        else
          throw new Error(h);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = q.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: _ } = this.opts, d = new o.SchemaEnv({ schema: {}, schemaId: _ });
        if (S = o.resolveSchema.call(this, d, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = q.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let _ = p[this.opts.schemaId];
          return _ && (_ = (0, c.normalizeId)(_), delete this.schemas[_], delete this.refs[_]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let _;
      if (typeof p == "string")
        _ = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = _);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, _ = S.keyword, Array.isArray(_) && !_.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (k.call(this, _, S), !S)
        return (0, l.eachItem)(_, (h) => C.call(this, h)), this;
      L.call(this, S);
      const d = {
        ...S,
        type: (0, u.getJSONTypes)(S.type),
        schemaType: (0, u.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)(_, d.type.length === 0 ? (h) => C.call(this, h, d) : (h) => d.type.forEach((b) => C.call(this, h, d, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const _ of S.rules) {
        const d = _.rules.findIndex((h) => h.keyword === p);
        d >= 0 && _.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: _ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((d) => `${_}${d.instancePath} ${d.message}`).reduce((d, h) => d + S + h);
    }
    $dataMetaSchema(p, S) {
      const _ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const d of S) {
        const h = d.split("/").slice(1);
        let b = p;
        for (const T of h)
          b = b[T];
        for (const T in _) {
          const I = _[T];
          if (typeof I != "object")
            continue;
          const { $data: K } = I.definition, U = b[T];
          K && U && (b[T] = F(U));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const _ in p) {
        const d = p[_];
        (!S || S.test(_)) && (typeof d == "string" ? delete p[_] : d && !d.meta && (this._cache.delete(d.schema), delete p[_]));
      }
    }
    _addSchema(p, S, _, d = this.opts.validateSchema, h = this.opts.addUsedSchema) {
      let b;
      const { schemaId: T } = this.opts;
      if (typeof p == "object")
        b = p[T];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let I = this._cache.get(p);
      if (I !== void 0)
        return I;
      _ = (0, c.normalizeId)(b || _);
      const K = c.getSchemaRefs.call(this, p, _);
      return I = new o.SchemaEnv({ schema: p, schemaId: T, meta: S, baseId: _, localRefs: K }), this._cache.set(I.schema, I), h && !_.startsWith("#") && (_ && this._checkUnique(_), this.refs[_] = I), d && this.validateSchema(p, !0), I;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : o.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  N.ValidationError = n.default, N.MissingRefError = s.default, t.default = N;
  function O(P, p, S, _ = "error") {
    for (const d in P) {
      const h = d;
      h in p && this.logger[_](`${S}: option ${d}. ${P[h]}`);
    }
  }
  function q(P) {
    return P = (0, c.normalizeId)(P), this.schemas[P] || this.refs[P];
  }
  function Y() {
    const P = this.opts.schemas;
    if (P)
      if (Array.isArray(P))
        this.addSchema(P);
      else
        for (const p in P)
          this.addSchema(P[p], p);
  }
  function $e() {
    for (const P in this.opts.formats) {
      const p = this.opts.formats[P];
      p && this.addFormat(P, p);
    }
  }
  function be(P) {
    if (Array.isArray(P)) {
      this.addVocabulary(P);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in P) {
      const S = P[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function Re() {
    const P = { ...this.opts };
    for (const p of y)
      delete P[p];
    return P;
  }
  const G = { log() {
  }, warn() {
  }, error() {
  } };
  function W(P) {
    if (P === !1)
      return G;
    if (P === void 0)
      return console;
    if (P.log && P.warn && P.error)
      return P;
    throw new Error("logger must implement log, warn and error methods");
  }
  const me = /^[a-z_$][a-z0-9_$:-]*$/i;
  function k(P, p) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(P, (_) => {
      if (S.keywords[_])
        throw new Error(`Keyword ${_} is already defined`);
      if (!me.test(_))
        throw new Error(`Keyword ${_} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function C(P, p, S) {
    var _;
    const d = p == null ? void 0 : p.post;
    if (S && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: h } = this;
    let b = d ? h.post : h.rules.find(({ type: I }) => I === S);
    if (b || (b = { type: S, rules: [] }, h.rules.push(b)), h.keywords[P] = !0, !p)
      return;
    const T = {
      keyword: P,
      definition: {
        ...p,
        type: (0, u.getJSONTypes)(p.type),
        schemaType: (0, u.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? z.call(this, b, T, p.before) : b.rules.push(T), h.all[P] = T, (_ = p.implements) === null || _ === void 0 || _.forEach((I) => this.addKeyword(I));
  }
  function z(P, p, S) {
    const _ = P.rules.findIndex((d) => d.keyword === S);
    _ >= 0 ? P.rules.splice(_, 0, p) : (P.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function L(P) {
    let { metaSchema: p } = P;
    p !== void 0 && (P.$data && this.opts.$data && (p = F(p)), P.validateSchema = this.compile(p, !0));
  }
  const B = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function F(P) {
    return { anyOf: [P, B] };
  }
})(qd);
var pi = {}, yi = {}, $i = {};
Object.defineProperty($i, "__esModule", { value: !0 });
const w_ = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
$i.default = w_;
var Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.callRef = Ft.getValidate = void 0;
const E_ = yn, Du = ce, Ge = re, zr = Ye, Mu = xe, ks = D, b_ = {
  keyword: "$ref",
  schemaType: "string",
  code(t) {
    const { gen: e, schema: r, it: n } = t, { baseId: s, schemaEnv: a, validateName: o, opts: i, self: c } = n, { root: u } = a;
    if ((r === "#" || r === "#/") && s === u.baseId)
      return f();
    const l = Mu.resolveRef.call(c, u, s, r);
    if (l === void 0)
      throw new E_.default(n.opts.uriResolver, s, r);
    if (l instanceof Mu.SchemaEnv)
      return v(l);
    return g(l);
    function f() {
      if (a === u)
        return Bs(t, o, a, a.$async);
      const y = e.scopeValue("root", { ref: u });
      return Bs(t, (0, Ge._)`${y}.validate`, u, u.$async);
    }
    function v(y) {
      const w = Cf(t, y);
      Bs(t, w, y, y.$async);
    }
    function g(y) {
      const w = e.scopeValue("schema", i.code.source === !0 ? { ref: y, code: (0, Ge.stringify)(y) } : { ref: y }), $ = e.name("valid"), m = t.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: Ge.nil,
        topSchemaRef: w,
        errSchemaPath: r
      }, $);
      t.mergeEvaluated(m), t.ok($);
    }
  }
};
function Cf(t, e) {
  const { gen: r } = t;
  return e.validate ? r.scopeValue("validate", { ref: e.validate }) : (0, Ge._)`${r.scopeValue("wrapper", { ref: e })}.validate`;
}
Ft.getValidate = Cf;
function Bs(t, e, r, n) {
  const { gen: s, it: a } = t, { allErrors: o, schemaEnv: i, opts: c } = a, u = c.passContext ? zr.default.this : Ge.nil;
  n ? l() : f();
  function l() {
    if (!i.$async)
      throw new Error("async schema referenced by sync schema");
    const y = s.let("valid");
    s.try(() => {
      s.code((0, Ge._)`await ${(0, Du.callValidateCode)(t, e, u)}`), g(e), o || s.assign(y, !0);
    }, (w) => {
      s.if((0, Ge._)`!(${w} instanceof ${a.ValidationError})`, () => s.throw(w)), v(w), o || s.assign(y, !1);
    }), t.ok(y);
  }
  function f() {
    t.result((0, Du.callValidateCode)(t, e, u), () => g(e), () => v(e));
  }
  function v(y) {
    const w = (0, Ge._)`${y}.errors`;
    s.assign(zr.default.vErrors, (0, Ge._)`${zr.default.vErrors} === null ? ${w} : ${zr.default.vErrors}.concat(${w})`), s.assign(zr.default.errors, (0, Ge._)`${zr.default.vErrors}.length`);
  }
  function g(y) {
    var w;
    if (!a.opts.unevaluated)
      return;
    const $ = (w = r == null ? void 0 : r.validate) === null || w === void 0 ? void 0 : w.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = ks.mergeEvaluated.props(s, $.props, a.props));
      else {
        const m = s.var("props", (0, Ge._)`${y}.evaluated.props`);
        a.props = ks.mergeEvaluated.props(s, m, a.props, Ge.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = ks.mergeEvaluated.items(s, $.items, a.items));
      else {
        const m = s.var("items", (0, Ge._)`${y}.evaluated.items`);
        a.items = ks.mergeEvaluated.items(s, m, a.items, Ge.Name);
      }
  }
}
Ft.callRef = Bs;
Ft.default = b_;
Object.defineProperty(yi, "__esModule", { value: !0 });
const S_ = $i, P_ = Ft, R_ = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  S_.default,
  P_.default
];
yi.default = R_;
var gi = {}, _i = {};
Object.defineProperty(_i, "__esModule", { value: !0 });
const ma = re, Kt = ma.operators, pa = {
  maximum: { okStr: "<=", ok: Kt.LTE, fail: Kt.GT },
  minimum: { okStr: ">=", ok: Kt.GTE, fail: Kt.LT },
  exclusiveMaximum: { okStr: "<", ok: Kt.LT, fail: Kt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Kt.GT, fail: Kt.LTE }
}, N_ = {
  message: ({ keyword: t, schemaCode: e }) => (0, ma.str)`must be ${pa[t].okStr} ${e}`,
  params: ({ keyword: t, schemaCode: e }) => (0, ma._)`{comparison: ${pa[t].okStr}, limit: ${e}}`
}, O_ = {
  keyword: Object.keys(pa),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: N_,
  code(t) {
    const { keyword: e, data: r, schemaCode: n } = t;
    t.fail$data((0, ma._)`${r} ${pa[e].fail} ${n} || isNaN(${r})`);
  }
};
_i.default = O_;
var vi = {};
Object.defineProperty(vi, "__esModule", { value: !0 });
const Hn = re, T_ = {
  message: ({ schemaCode: t }) => (0, Hn.str)`must be multiple of ${t}`,
  params: ({ schemaCode: t }) => (0, Hn._)`{multipleOf: ${t}}`
}, k_ = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: T_,
  code(t) {
    const { gen: e, data: r, schemaCode: n, it: s } = t, a = s.opts.multipleOfPrecision, o = e.let("res"), i = a ? (0, Hn._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Hn._)`${o} !== parseInt(${o})`;
    t.fail$data((0, Hn._)`(${n} === 0 || (${o} = ${r}/${n}, ${i}))`);
  }
};
vi.default = k_;
var wi = {}, Ei = {};
Object.defineProperty(Ei, "__esModule", { value: !0 });
function jf(t) {
  const e = t.length;
  let r = 0, n = 0, s;
  for (; n < e; )
    r++, s = t.charCodeAt(n++), s >= 55296 && s <= 56319 && n < e && (s = t.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
Ei.default = jf;
jf.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(wi, "__esModule", { value: !0 });
const Pr = re, I_ = D, C_ = Ei, j_ = {
  message({ keyword: t, schemaCode: e }) {
    const r = t === "maxLength" ? "more" : "fewer";
    return (0, Pr.str)`must NOT have ${r} than ${e} characters`;
  },
  params: ({ schemaCode: t }) => (0, Pr._)`{limit: ${t}}`
}, A_ = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: j_,
  code(t) {
    const { keyword: e, data: r, schemaCode: n, it: s } = t, a = e === "maxLength" ? Pr.operators.GT : Pr.operators.LT, o = s.opts.unicode === !1 ? (0, Pr._)`${r}.length` : (0, Pr._)`${(0, I_.useFunc)(t.gen, C_.default)}(${r})`;
    t.fail$data((0, Pr._)`${o} ${a} ${n}`);
  }
};
wi.default = A_;
var bi = {};
Object.defineProperty(bi, "__esModule", { value: !0 });
const D_ = ce, ya = re, M_ = {
  message: ({ schemaCode: t }) => (0, ya.str)`must match pattern "${t}"`,
  params: ({ schemaCode: t }) => (0, ya._)`{pattern: ${t}}`
}, V_ = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: M_,
  code(t) {
    const { data: e, $data: r, schema: n, schemaCode: s, it: a } = t, o = a.opts.unicodeRegExp ? "u" : "", i = r ? (0, ya._)`(new RegExp(${s}, ${o}))` : (0, D_.usePattern)(t, n);
    t.fail$data((0, ya._)`!${i}.test(${e})`);
  }
};
bi.default = V_;
var Si = {};
Object.defineProperty(Si, "__esModule", { value: !0 });
const Bn = re, L_ = {
  message({ keyword: t, schemaCode: e }) {
    const r = t === "maxProperties" ? "more" : "fewer";
    return (0, Bn.str)`must NOT have ${r} than ${e} properties`;
  },
  params: ({ schemaCode: t }) => (0, Bn._)`{limit: ${t}}`
}, F_ = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: L_,
  code(t) {
    const { keyword: e, data: r, schemaCode: n } = t, s = e === "maxProperties" ? Bn.operators.GT : Bn.operators.LT;
    t.fail$data((0, Bn._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
Si.default = F_;
var Pi = {};
Object.defineProperty(Pi, "__esModule", { value: !0 });
const Cn = ce, Wn = re, z_ = D, U_ = {
  message: ({ params: { missingProperty: t } }) => (0, Wn.str)`must have required property '${t}'`,
  params: ({ params: { missingProperty: t } }) => (0, Wn._)`{missingProperty: ${t}}`
}, x_ = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: U_,
  code(t) {
    const { gen: e, schema: r, schemaCode: n, data: s, $data: a, it: o } = t, { opts: i } = o;
    if (!a && r.length === 0)
      return;
    const c = r.length >= i.loopRequired;
    if (o.allErrors ? u() : l(), i.strictRequired) {
      const g = t.parentSchema.properties, { definedProperties: y } = t.it;
      for (const w of r)
        if ((g == null ? void 0 : g[w]) === void 0 && !y.has(w)) {
          const $ = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${w}" is not defined at "${$}" (strictRequired)`;
          (0, z_.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function u() {
      if (c || a)
        t.block$data(Wn.nil, f);
      else
        for (const g of r)
          (0, Cn.checkReportMissingProp)(t, g);
    }
    function l() {
      const g = e.let("missing");
      if (c || a) {
        const y = e.let("valid", !0);
        t.block$data(y, () => v(g, y)), t.ok(y);
      } else
        e.if((0, Cn.checkMissingProp)(t, r, g)), (0, Cn.reportMissingProp)(t, g), e.else();
    }
    function f() {
      e.forOf("prop", n, (g) => {
        t.setParams({ missingProperty: g }), e.if((0, Cn.noPropertyInData)(e, s, g, i.ownProperties), () => t.error());
      });
    }
    function v(g, y) {
      t.setParams({ missingProperty: g }), e.forOf(g, n, () => {
        e.assign(y, (0, Cn.propertyInData)(e, s, g, i.ownProperties)), e.if((0, Wn.not)(y), () => {
          t.error(), e.break();
        });
      }, Wn.nil);
    }
  }
};
Pi.default = x_;
var Ri = {};
Object.defineProperty(Ri, "__esModule", { value: !0 });
const Jn = re, q_ = {
  message({ keyword: t, schemaCode: e }) {
    const r = t === "maxItems" ? "more" : "fewer";
    return (0, Jn.str)`must NOT have ${r} than ${e} items`;
  },
  params: ({ schemaCode: t }) => (0, Jn._)`{limit: ${t}}`
}, K_ = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: q_,
  code(t) {
    const { keyword: e, data: r, schemaCode: n } = t, s = e === "maxItems" ? Jn.operators.GT : Jn.operators.LT;
    t.fail$data((0, Jn._)`${r}.length ${s} ${n}`);
  }
};
Ri.default = K_;
var Ni = {}, bs = {};
Object.defineProperty(bs, "__esModule", { value: !0 });
const Af = Oa;
Af.code = 'require("ajv/dist/runtime/equal").default';
bs.default = Af;
Object.defineProperty(Ni, "__esModule", { value: !0 });
const to = Ne, ke = re, G_ = D, Z_ = bs, H_ = {
  message: ({ params: { i: t, j: e } }) => (0, ke.str)`must NOT have duplicate items (items ## ${e} and ${t} are identical)`,
  params: ({ params: { i: t, j: e } }) => (0, ke._)`{i: ${t}, j: ${e}}`
}, B_ = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: H_,
  code(t) {
    const { gen: e, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: i } = t;
    if (!n && !s)
      return;
    const c = e.let("valid"), u = a.items ? (0, to.getSchemaTypes)(a.items) : [];
    t.block$data(c, l, (0, ke._)`${o} === false`), t.ok(c);
    function l() {
      const y = e.let("i", (0, ke._)`${r}.length`), w = e.let("j");
      t.setParams({ i: y, j: w }), e.assign(c, !0), e.if((0, ke._)`${y} > 1`, () => (f() ? v : g)(y, w));
    }
    function f() {
      return u.length > 0 && !u.some((y) => y === "object" || y === "array");
    }
    function v(y, w) {
      const $ = e.name("item"), m = (0, to.checkDataTypes)(u, $, i.opts.strictNumbers, to.DataType.Wrong), E = e.const("indices", (0, ke._)`{}`);
      e.for((0, ke._)`;${y}--;`, () => {
        e.let($, (0, ke._)`${r}[${y}]`), e.if(m, (0, ke._)`continue`), u.length > 1 && e.if((0, ke._)`typeof ${$} == "string"`, (0, ke._)`${$} += "_"`), e.if((0, ke._)`typeof ${E}[${$}] == "number"`, () => {
          e.assign(w, (0, ke._)`${E}[${$}]`), t.error(), e.assign(c, !1).break();
        }).code((0, ke._)`${E}[${$}] = ${y}`);
      });
    }
    function g(y, w) {
      const $ = (0, G_.useFunc)(e, Z_.default), m = e.name("outer");
      e.label(m).for((0, ke._)`;${y}--;`, () => e.for((0, ke._)`${w} = ${y}; ${w}--;`, () => e.if((0, ke._)`${$}(${r}[${y}], ${r}[${w}])`, () => {
        t.error(), e.assign(c, !1).break(m);
      })));
    }
  }
};
Ni.default = B_;
var Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
const Do = re, W_ = D, J_ = bs, X_ = {
  message: "must be equal to constant",
  params: ({ schemaCode: t }) => (0, Do._)`{allowedValue: ${t}}`
}, Y_ = {
  keyword: "const",
  $data: !0,
  error: X_,
  code(t) {
    const { gen: e, data: r, $data: n, schemaCode: s, schema: a } = t;
    n || a && typeof a == "object" ? t.fail$data((0, Do._)`!${(0, W_.useFunc)(e, J_.default)}(${r}, ${s})`) : t.fail((0, Do._)`${a} !== ${r}`);
  }
};
Oi.default = Y_;
var Ti = {};
Object.defineProperty(Ti, "__esModule", { value: !0 });
const Fn = re, Q_ = D, ev = bs, tv = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: t }) => (0, Fn._)`{allowedValues: ${t}}`
}, rv = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: tv,
  code(t) {
    const { gen: e, data: r, $data: n, schema: s, schemaCode: a, it: o } = t;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const i = s.length >= o.opts.loopEnum;
    let c;
    const u = () => c ?? (c = (0, Q_.useFunc)(e, ev.default));
    let l;
    if (i || n)
      l = e.let("valid"), t.block$data(l, f);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = e.const("vSchema", a);
      l = (0, Fn.or)(...s.map((y, w) => v(g, w)));
    }
    t.pass(l);
    function f() {
      e.assign(l, !1), e.forOf("v", a, (g) => e.if((0, Fn._)`${u()}(${r}, ${g})`, () => e.assign(l, !0).break()));
    }
    function v(g, y) {
      const w = s[y];
      return typeof w == "object" && w !== null ? (0, Fn._)`${u()}(${r}, ${g}[${y}])` : (0, Fn._)`${r} === ${w}`;
    }
  }
};
Ti.default = rv;
Object.defineProperty(gi, "__esModule", { value: !0 });
const nv = _i, sv = vi, av = wi, ov = bi, iv = Si, cv = Pi, uv = Ri, lv = Ni, dv = Oi, fv = Ti, hv = [
  // number
  nv.default,
  sv.default,
  // string
  av.default,
  ov.default,
  // object
  iv.default,
  cv.default,
  // array
  uv.default,
  lv.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  dv.default,
  fv.default
];
gi.default = hv;
var ki = {}, $n = {};
Object.defineProperty($n, "__esModule", { value: !0 });
$n.validateAdditionalItems = void 0;
const Rr = re, Mo = D, mv = {
  message: ({ params: { len: t } }) => (0, Rr.str)`must NOT have more than ${t} items`,
  params: ({ params: { len: t } }) => (0, Rr._)`{limit: ${t}}`
}, pv = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: mv,
  code(t) {
    const { parentSchema: e, it: r } = t, { items: n } = e;
    if (!Array.isArray(n)) {
      (0, Mo.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Df(t, n);
  }
};
function Df(t, e) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = t;
  o.items = !0;
  const i = r.const("len", (0, Rr._)`${s}.length`);
  if (n === !1)
    t.setParams({ len: e.length }), t.pass((0, Rr._)`${i} <= ${e.length}`);
  else if (typeof n == "object" && !(0, Mo.alwaysValidSchema)(o, n)) {
    const u = r.var("valid", (0, Rr._)`${i} <= ${e.length}`);
    r.if((0, Rr.not)(u), () => c(u)), t.ok(u);
  }
  function c(u) {
    r.forRange("i", e.length, i, (l) => {
      t.subschema({ keyword: a, dataProp: l, dataPropType: Mo.Type.Num }, u), o.allErrors || r.if((0, Rr.not)(u), () => r.break());
    });
  }
}
$n.validateAdditionalItems = Df;
$n.default = pv;
var Ii = {}, gn = {};
Object.defineProperty(gn, "__esModule", { value: !0 });
gn.validateTuple = void 0;
const Vu = re, Ws = D, yv = ce, $v = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(t) {
    const { schema: e, it: r } = t;
    if (Array.isArray(e))
      return Mf(t, "additionalItems", e);
    r.items = !0, !(0, Ws.alwaysValidSchema)(r, e) && t.ok((0, yv.validateArray)(t));
  }
};
function Mf(t, e, r = t.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: i } = t;
  l(s), i.opts.unevaluated && r.length && i.items !== !0 && (i.items = Ws.mergeEvaluated.items(n, r.length, i.items));
  const c = n.name("valid"), u = n.const("len", (0, Vu._)`${a}.length`);
  r.forEach((f, v) => {
    (0, Ws.alwaysValidSchema)(i, f) || (n.if((0, Vu._)`${u} > ${v}`, () => t.subschema({
      keyword: o,
      schemaProp: v,
      dataProp: v
    }, c)), t.ok(c));
  });
  function l(f) {
    const { opts: v, errSchemaPath: g } = i, y = r.length, w = y === f.minItems && (y === f.maxItems || f[e] === !1);
    if (v.strictTuples && !w) {
      const $ = `"${o}" is ${y}-tuple, but minItems or maxItems/${e} are not specified or different at path "${g}"`;
      (0, Ws.checkStrictMode)(i, $, v.strictTuples);
    }
  }
}
gn.validateTuple = Mf;
gn.default = $v;
Object.defineProperty(Ii, "__esModule", { value: !0 });
const gv = gn, _v = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (t) => (0, gv.validateTuple)(t, "items")
};
Ii.default = _v;
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
const Lu = re, vv = D, wv = ce, Ev = $n, bv = {
  message: ({ params: { len: t } }) => (0, Lu.str)`must NOT have more than ${t} items`,
  params: ({ params: { len: t } }) => (0, Lu._)`{limit: ${t}}`
}, Sv = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: bv,
  code(t) {
    const { schema: e, parentSchema: r, it: n } = t, { prefixItems: s } = r;
    n.items = !0, !(0, vv.alwaysValidSchema)(n, e) && (s ? (0, Ev.validateAdditionalItems)(t, s) : t.ok((0, wv.validateArray)(t)));
  }
};
Ci.default = Sv;
var ji = {};
Object.defineProperty(ji, "__esModule", { value: !0 });
const Qe = re, Is = D, Pv = {
  message: ({ params: { min: t, max: e } }) => e === void 0 ? (0, Qe.str)`must contain at least ${t} valid item(s)` : (0, Qe.str)`must contain at least ${t} and no more than ${e} valid item(s)`,
  params: ({ params: { min: t, max: e } }) => e === void 0 ? (0, Qe._)`{minContains: ${t}}` : (0, Qe._)`{minContains: ${t}, maxContains: ${e}}`
}, Rv = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Pv,
  code(t) {
    const { gen: e, schema: r, parentSchema: n, data: s, it: a } = t;
    let o, i;
    const { minContains: c, maxContains: u } = n;
    a.opts.next ? (o = c === void 0 ? 1 : c, i = u) : o = 1;
    const l = e.const("len", (0, Qe._)`${s}.length`);
    if (t.setParams({ min: o, max: i }), i === void 0 && o === 0) {
      (0, Is.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (i !== void 0 && o > i) {
      (0, Is.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), t.fail();
      return;
    }
    if ((0, Is.alwaysValidSchema)(a, r)) {
      let w = (0, Qe._)`${l} >= ${o}`;
      i !== void 0 && (w = (0, Qe._)`${w} && ${l} <= ${i}`), t.pass(w);
      return;
    }
    a.items = !0;
    const f = e.name("valid");
    i === void 0 && o === 1 ? g(f, () => e.if(f, () => e.break())) : o === 0 ? (e.let(f, !0), i !== void 0 && e.if((0, Qe._)`${s}.length > 0`, v)) : (e.let(f, !1), v()), t.result(f, () => t.reset());
    function v() {
      const w = e.name("_valid"), $ = e.let("count", 0);
      g(w, () => e.if(w, () => y($)));
    }
    function g(w, $) {
      e.forRange("i", 0, l, (m) => {
        t.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: Is.Type.Num,
          compositeRule: !0
        }, w), $();
      });
    }
    function y(w) {
      e.code((0, Qe._)`${w}++`), i === void 0 ? e.if((0, Qe._)`${w} >= ${o}`, () => e.assign(f, !0).break()) : (e.if((0, Qe._)`${w} > ${i}`, () => e.assign(f, !1).break()), o === 1 ? e.assign(f, !0) : e.if((0, Qe._)`${w} >= ${o}`, () => e.assign(f, !0)));
    }
  }
};
ji.default = Rv;
var Ca = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.validateSchemaDeps = t.validatePropertyDeps = t.error = void 0;
  const e = re, r = D, n = ce;
  t.error = {
    message: ({ params: { property: c, depsCount: u, deps: l } }) => {
      const f = u === 1 ? "property" : "properties";
      return (0, e.str)`must have ${f} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: u, deps: l, missingProperty: f } }) => (0, e._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${u},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: t.error,
    code(c) {
      const [u, l] = a(c);
      o(c, u), i(c, l);
    }
  };
  function a({ schema: c }) {
    const u = {}, l = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const v = Array.isArray(c[f]) ? u : l;
      v[f] = c[f];
    }
    return [u, l];
  }
  function o(c, u = c.schema) {
    const { gen: l, data: f, it: v } = c;
    if (Object.keys(u).length === 0)
      return;
    const g = l.let("missing");
    for (const y in u) {
      const w = u[y];
      if (w.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, f, y, v.opts.ownProperties);
      c.setParams({
        property: y,
        depsCount: w.length,
        deps: w.join(", ")
      }), v.allErrors ? l.if($, () => {
        for (const m of w)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, e._)`${$} && (${(0, n.checkMissingProp)(c, w, g)})`), (0, n.reportMissingProp)(c, g), l.else());
    }
  }
  t.validatePropertyDeps = o;
  function i(c, u = c.schema) {
    const { gen: l, data: f, keyword: v, it: g } = c, y = l.name("valid");
    for (const w in u)
      (0, r.alwaysValidSchema)(g, u[w]) || (l.if(
        (0, n.propertyInData)(l, f, w, g.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: v, schemaProp: w }, y);
          c.mergeValidEvaluated($, y);
        },
        () => l.var(y, !0)
        // TODO var
      ), c.ok(y));
  }
  t.validateSchemaDeps = i, t.default = s;
})(Ca);
var Ai = {};
Object.defineProperty(Ai, "__esModule", { value: !0 });
const Vf = re, Nv = D, Ov = {
  message: "property name must be valid",
  params: ({ params: t }) => (0, Vf._)`{propertyName: ${t.propertyName}}`
}, Tv = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Ov,
  code(t) {
    const { gen: e, schema: r, data: n, it: s } = t;
    if ((0, Nv.alwaysValidSchema)(s, r))
      return;
    const a = e.name("valid");
    e.forIn("key", n, (o) => {
      t.setParams({ propertyName: o }), t.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), e.if((0, Vf.not)(a), () => {
        t.error(!0), s.allErrors || e.break();
      });
    }), t.ok(a);
  }
};
Ai.default = Tv;
var ja = {};
Object.defineProperty(ja, "__esModule", { value: !0 });
const Cs = ce, st = re, kv = Ye, js = D, Iv = {
  message: "must NOT have additional properties",
  params: ({ params: t }) => (0, st._)`{additionalProperty: ${t.additionalProperty}}`
}, Cv = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Iv,
  code(t) {
    const { gen: e, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = t;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: i, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, js.alwaysValidSchema)(o, r))
      return;
    const u = (0, Cs.allSchemaProperties)(n.properties), l = (0, Cs.allSchemaProperties)(n.patternProperties);
    f(), t.ok((0, st._)`${a} === ${kv.default.errors}`);
    function f() {
      e.forIn("key", s, ($) => {
        !u.length && !l.length ? y($) : e.if(v($), () => y($));
      });
    }
    function v($) {
      let m;
      if (u.length > 8) {
        const E = (0, js.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, Cs.isOwnProperty)(e, E, $);
      } else u.length ? m = (0, st.or)(...u.map((E) => (0, st._)`${$} === ${E}`)) : m = st.nil;
      return l.length && (m = (0, st.or)(m, ...l.map((E) => (0, st._)`${(0, Cs.usePattern)(t, E)}.test(${$})`))), (0, st.not)(m);
    }
    function g($) {
      e.code((0, st._)`delete ${s}[${$}]`);
    }
    function y($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        g($);
        return;
      }
      if (r === !1) {
        t.setParams({ additionalProperty: $ }), t.error(), i || e.break();
        return;
      }
      if (typeof r == "object" && !(0, js.alwaysValidSchema)(o, r)) {
        const m = e.name("valid");
        c.removeAdditional === "failing" ? (w($, m, !1), e.if((0, st.not)(m), () => {
          t.reset(), g($);
        })) : (w($, m), i || e.if((0, st.not)(m), () => e.break()));
      }
    }
    function w($, m, E) {
      const R = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: js.Type.Str
      };
      E === !1 && Object.assign(R, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), t.subschema(R, m);
    }
  }
};
ja.default = Cv;
var Di = {};
Object.defineProperty(Di, "__esModule", { value: !0 });
const jv = lt, Fu = ce, ro = D, zu = ja, Av = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(t) {
    const { gen: e, schema: r, parentSchema: n, data: s, it: a } = t;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && zu.default.code(new jv.KeywordCxt(a, zu.default, "additionalProperties"));
    const o = (0, Fu.allSchemaProperties)(r);
    for (const f of o)
      a.definedProperties.add(f);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = ro.mergeEvaluated.props(e, (0, ro.toHash)(o), a.props));
    const i = o.filter((f) => !(0, ro.alwaysValidSchema)(a, r[f]));
    if (i.length === 0)
      return;
    const c = e.name("valid");
    for (const f of i)
      u(f) ? l(f) : (e.if((0, Fu.propertyInData)(e, s, f, a.opts.ownProperties)), l(f), a.allErrors || e.else().var(c, !0), e.endIf()), t.it.definedProperties.add(f), t.ok(c);
    function u(f) {
      return a.opts.useDefaults && !a.compositeRule && r[f].default !== void 0;
    }
    function l(f) {
      t.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
Di.default = Av;
var Mi = {};
Object.defineProperty(Mi, "__esModule", { value: !0 });
const Uu = ce, As = re, xu = D, qu = D, Dv = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(t) {
    const { gen: e, schema: r, data: n, parentSchema: s, it: a } = t, { opts: o } = a, i = (0, Uu.allSchemaProperties)(r), c = i.filter((w) => (0, xu.alwaysValidSchema)(a, r[w]));
    if (i.length === 0 || c.length === i.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const u = o.strictSchema && !o.allowMatchingProperties && s.properties, l = e.name("valid");
    a.props !== !0 && !(a.props instanceof As.Name) && (a.props = (0, qu.evaluatedPropsToName)(e, a.props));
    const { props: f } = a;
    v();
    function v() {
      for (const w of i)
        u && g(w), a.allErrors ? y(w) : (e.var(l, !0), y(w), e.if(l));
    }
    function g(w) {
      for (const $ in u)
        new RegExp(w).test($) && (0, xu.checkStrictMode)(a, `property ${$} matches pattern ${w} (use allowMatchingProperties)`);
    }
    function y(w) {
      e.forIn("key", n, ($) => {
        e.if((0, As._)`${(0, Uu.usePattern)(t, w)}.test(${$})`, () => {
          const m = c.includes(w);
          m || t.subschema({
            keyword: "patternProperties",
            schemaProp: w,
            dataProp: $,
            dataPropType: qu.Type.Str
          }, l), a.opts.unevaluated && f !== !0 ? e.assign((0, As._)`${f}[${$}]`, !0) : !m && !a.allErrors && e.if((0, As.not)(l), () => e.break());
        });
      });
    }
  }
};
Mi.default = Dv;
var Vi = {};
Object.defineProperty(Vi, "__esModule", { value: !0 });
const Mv = D, Vv = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(t) {
    const { gen: e, schema: r, it: n } = t;
    if ((0, Mv.alwaysValidSchema)(n, r)) {
      t.fail();
      return;
    }
    const s = e.name("valid");
    t.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), t.failResult(s, () => t.reset(), () => t.error());
  },
  error: { message: "must NOT be valid" }
};
Vi.default = Vv;
var Li = {};
Object.defineProperty(Li, "__esModule", { value: !0 });
const Lv = ce, Fv = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Lv.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Li.default = Fv;
var Fi = {};
Object.defineProperty(Fi, "__esModule", { value: !0 });
const Js = re, zv = D, Uv = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: t }) => (0, Js._)`{passingSchemas: ${t.passing}}`
}, xv = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Uv,
  code(t) {
    const { gen: e, schema: r, parentSchema: n, it: s } = t;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = e.let("valid", !1), i = e.let("passing", null), c = e.name("_valid");
    t.setParams({ passing: i }), e.block(u), t.result(o, () => t.reset(), () => t.error(!0));
    function u() {
      a.forEach((l, f) => {
        let v;
        (0, zv.alwaysValidSchema)(s, l) ? e.var(c, !0) : v = t.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && e.if((0, Js._)`${c} && ${o}`).assign(o, !1).assign(i, (0, Js._)`[${i}, ${f}]`).else(), e.if(c, () => {
          e.assign(o, !0), e.assign(i, f), v && t.mergeEvaluated(v, Js.Name);
        });
      });
    }
  }
};
Fi.default = xv;
var zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
const qv = D, Kv = {
  keyword: "allOf",
  schemaType: "array",
  code(t) {
    const { gen: e, schema: r, it: n } = t;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = e.name("valid");
    r.forEach((a, o) => {
      if ((0, qv.alwaysValidSchema)(n, a))
        return;
      const i = t.subschema({ keyword: "allOf", schemaProp: o }, s);
      t.ok(s), t.mergeEvaluated(i);
    });
  }
};
zi.default = Kv;
var Ui = {};
Object.defineProperty(Ui, "__esModule", { value: !0 });
const $a = re, Lf = D, Gv = {
  message: ({ params: t }) => (0, $a.str)`must match "${t.ifClause}" schema`,
  params: ({ params: t }) => (0, $a._)`{failingKeyword: ${t.ifClause}}`
}, Zv = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Gv,
  code(t) {
    const { gen: e, parentSchema: r, it: n } = t;
    r.then === void 0 && r.else === void 0 && (0, Lf.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = Ku(n, "then"), a = Ku(n, "else");
    if (!s && !a)
      return;
    const o = e.let("valid", !0), i = e.name("_valid");
    if (c(), t.reset(), s && a) {
      const l = e.let("ifClause");
      t.setParams({ ifClause: l }), e.if(i, u("then", l), u("else", l));
    } else s ? e.if(i, u("then")) : e.if((0, $a.not)(i), u("else"));
    t.pass(o, () => t.error(!0));
    function c() {
      const l = t.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, i);
      t.mergeEvaluated(l);
    }
    function u(l, f) {
      return () => {
        const v = t.subschema({ keyword: l }, i);
        e.assign(o, i), t.mergeValidEvaluated(v, o), f ? e.assign(f, (0, $a._)`${l}`) : t.setParams({ ifClause: l });
      };
    }
  }
};
function Ku(t, e) {
  const r = t.schema[e];
  return r !== void 0 && !(0, Lf.alwaysValidSchema)(t, r);
}
Ui.default = Zv;
var xi = {};
Object.defineProperty(xi, "__esModule", { value: !0 });
const Hv = D, Bv = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: t, parentSchema: e, it: r }) {
    e.if === void 0 && (0, Hv.checkStrictMode)(r, `"${t}" without "if" is ignored`);
  }
};
xi.default = Bv;
Object.defineProperty(ki, "__esModule", { value: !0 });
const Wv = $n, Jv = Ii, Xv = gn, Yv = Ci, Qv = ji, e0 = Ca, t0 = Ai, r0 = ja, n0 = Di, s0 = Mi, a0 = Vi, o0 = Li, i0 = Fi, c0 = zi, u0 = Ui, l0 = xi;
function d0(t = !1) {
  const e = [
    // any
    a0.default,
    o0.default,
    i0.default,
    c0.default,
    u0.default,
    l0.default,
    // object
    t0.default,
    r0.default,
    e0.default,
    n0.default,
    s0.default
  ];
  return t ? e.push(Jv.default, Yv.default) : e.push(Wv.default, Xv.default), e.push(Qv.default), e;
}
ki.default = d0;
var qi = {}, _n = {};
Object.defineProperty(_n, "__esModule", { value: !0 });
_n.dynamicAnchor = void 0;
const no = re, f0 = Ye, Gu = xe, h0 = Ft, m0 = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (t) => Ff(t, t.schema)
};
function Ff(t, e) {
  const { gen: r, it: n } = t;
  n.schemaEnv.root.dynamicAnchors[e] = !0;
  const s = (0, no._)`${f0.default.dynamicAnchors}${(0, no.getProperty)(e)}`, a = n.errSchemaPath === "#" ? n.validateName : p0(t);
  r.if((0, no._)`!${s}`, () => r.assign(s, a));
}
_n.dynamicAnchor = Ff;
function p0(t) {
  const { schemaEnv: e, schema: r, self: n } = t.it, { root: s, baseId: a, localRefs: o, meta: i } = e.root, { schemaId: c } = n.opts, u = new Gu.SchemaEnv({ schema: r, schemaId: c, root: s, baseId: a, localRefs: o, meta: i });
  return Gu.compileSchema.call(n, u), (0, h0.getValidate)(t, u);
}
_n.default = m0;
var vn = {};
Object.defineProperty(vn, "__esModule", { value: !0 });
vn.dynamicRef = void 0;
const Zu = re, y0 = Ye, Hu = Ft, $0 = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (t) => zf(t, t.schema)
};
function zf(t, e) {
  const { gen: r, keyword: n, it: s } = t;
  if (e[0] !== "#")
    throw new Error(`"${n}" only supports hash fragment reference`);
  const a = e.slice(1);
  if (s.allErrors)
    o();
  else {
    const c = r.let("valid", !1);
    o(c), t.ok(c);
  }
  function o(c) {
    if (s.schemaEnv.root.dynamicAnchors[a]) {
      const u = r.let("_v", (0, Zu._)`${y0.default.dynamicAnchors}${(0, Zu.getProperty)(a)}`);
      r.if(u, i(u, c), i(s.validateName, c));
    } else
      i(s.validateName, c)();
  }
  function i(c, u) {
    return u ? () => r.block(() => {
      (0, Hu.callRef)(t, c), r.let(u, !0);
    }) : () => (0, Hu.callRef)(t, c);
  }
}
vn.dynamicRef = zf;
vn.default = $0;
var Ki = {};
Object.defineProperty(Ki, "__esModule", { value: !0 });
const g0 = _n, _0 = D, v0 = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(t) {
    t.schema ? (0, g0.dynamicAnchor)(t, "") : (0, _0.checkStrictMode)(t.it, "$recursiveAnchor: false is ignored");
  }
};
Ki.default = v0;
var Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
const w0 = vn, E0 = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (t) => (0, w0.dynamicRef)(t, t.schema)
};
Gi.default = E0;
Object.defineProperty(qi, "__esModule", { value: !0 });
const b0 = _n, S0 = vn, P0 = Ki, R0 = Gi, N0 = [b0.default, S0.default, P0.default, R0.default];
qi.default = N0;
var Zi = {}, Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
const Bu = Ca, O0 = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: Bu.error,
  code: (t) => (0, Bu.validatePropertyDeps)(t)
};
Hi.default = O0;
var Bi = {};
Object.defineProperty(Bi, "__esModule", { value: !0 });
const T0 = Ca, k0 = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (t) => (0, T0.validateSchemaDeps)(t)
};
Bi.default = k0;
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
const I0 = D, C0 = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: t, parentSchema: e, it: r }) {
    e.contains === void 0 && (0, I0.checkStrictMode)(r, `"${t}" without "contains" is ignored`);
  }
};
Wi.default = C0;
Object.defineProperty(Zi, "__esModule", { value: !0 });
const j0 = Hi, A0 = Bi, D0 = Wi, M0 = [j0.default, A0.default, D0.default];
Zi.default = M0;
var Ji = {}, Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
const Bt = re, Wu = D, V0 = Ye, L0 = {
  message: "must NOT have unevaluated properties",
  params: ({ params: t }) => (0, Bt._)`{unevaluatedProperty: ${t.unevaluatedProperty}}`
}, F0 = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: L0,
  code(t) {
    const { gen: e, schema: r, data: n, errsCount: s, it: a } = t;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: o, props: i } = a;
    i instanceof Bt.Name ? e.if((0, Bt._)`${i} !== true`, () => e.forIn("key", n, (f) => e.if(u(i, f), () => c(f)))) : i !== !0 && e.forIn("key", n, (f) => i === void 0 ? c(f) : e.if(l(i, f), () => c(f))), a.props = !0, t.ok((0, Bt._)`${s} === ${V0.default.errors}`);
    function c(f) {
      if (r === !1) {
        t.setParams({ unevaluatedProperty: f }), t.error(), o || e.break();
        return;
      }
      if (!(0, Wu.alwaysValidSchema)(a, r)) {
        const v = e.name("valid");
        t.subschema({
          keyword: "unevaluatedProperties",
          dataProp: f,
          dataPropType: Wu.Type.Str
        }, v), o || e.if((0, Bt.not)(v), () => e.break());
      }
    }
    function u(f, v) {
      return (0, Bt._)`!${f} || !${f}[${v}]`;
    }
    function l(f, v) {
      const g = [];
      for (const y in f)
        f[y] === !0 && g.push((0, Bt._)`${v} !== ${y}`);
      return (0, Bt.and)(...g);
    }
  }
};
Xi.default = F0;
var Yi = {};
Object.defineProperty(Yi, "__esModule", { value: !0 });
const Nr = re, Ju = D, z0 = {
  message: ({ params: { len: t } }) => (0, Nr.str)`must NOT have more than ${t} items`,
  params: ({ params: { len: t } }) => (0, Nr._)`{limit: ${t}}`
}, U0 = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: z0,
  code(t) {
    const { gen: e, schema: r, data: n, it: s } = t, a = s.items || 0;
    if (a === !0)
      return;
    const o = e.const("len", (0, Nr._)`${n}.length`);
    if (r === !1)
      t.setParams({ len: a }), t.fail((0, Nr._)`${o} > ${a}`);
    else if (typeof r == "object" && !(0, Ju.alwaysValidSchema)(s, r)) {
      const c = e.var("valid", (0, Nr._)`${o} <= ${a}`);
      e.if((0, Nr.not)(c), () => i(c, a)), t.ok(c);
    }
    s.items = !0;
    function i(c, u) {
      e.forRange("i", u, o, (l) => {
        t.subschema({ keyword: "unevaluatedItems", dataProp: l, dataPropType: Ju.Type.Num }, c), s.allErrors || e.if((0, Nr.not)(c), () => e.break());
      });
    }
  }
};
Yi.default = U0;
Object.defineProperty(Ji, "__esModule", { value: !0 });
const x0 = Xi, q0 = Yi, K0 = [x0.default, q0.default];
Ji.default = K0;
var Qi = {}, ec = {};
Object.defineProperty(ec, "__esModule", { value: !0 });
const Se = re, G0 = {
  message: ({ schemaCode: t }) => (0, Se.str)`must match format "${t}"`,
  params: ({ schemaCode: t }) => (0, Se._)`{format: ${t}}`
}, Z0 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: G0,
  code(t, e) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: i } = t, { opts: c, errSchemaPath: u, schemaEnv: l, self: f } = i;
    if (!c.validateFormats)
      return;
    s ? v() : g();
    function v() {
      const y = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), w = r.const("fDef", (0, Se._)`${y}[${o}]`), $ = r.let("fType"), m = r.let("format");
      r.if((0, Se._)`typeof ${w} == "object" && !(${w} instanceof RegExp)`, () => r.assign($, (0, Se._)`${w}.type || "string"`).assign(m, (0, Se._)`${w}.validate`), () => r.assign($, (0, Se._)`"string"`).assign(m, w)), t.fail$data((0, Se.or)(E(), R()));
      function E() {
        return c.strictSchema === !1 ? Se.nil : (0, Se._)`${o} && !${m}`;
      }
      function R() {
        const N = l.$async ? (0, Se._)`(${w}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Se._)`${m}(${n})`, O = (0, Se._)`(typeof ${m} == "function" ? ${N} : ${m}.test(${n}))`;
        return (0, Se._)`${m} && ${m} !== true && ${$} === ${e} && !${O}`;
      }
    }
    function g() {
      const y = f.formats[a];
      if (!y) {
        E();
        return;
      }
      if (y === !0)
        return;
      const [w, $, m] = R(y);
      w === e && t.pass(N());
      function E() {
        if (c.strictSchema === !1) {
          f.logger.warn(O());
          return;
        }
        throw new Error(O());
        function O() {
          return `unknown format "${a}" ignored in schema at path "${u}"`;
        }
      }
      function R(O) {
        const q = O instanceof RegExp ? (0, Se.regexpCode)(O) : c.code.formats ? (0, Se._)`${c.code.formats}${(0, Se.getProperty)(a)}` : void 0, Y = r.scopeValue("formats", { key: a, ref: O, code: q });
        return typeof O == "object" && !(O instanceof RegExp) ? [O.type || "string", O.validate, (0, Se._)`${Y}.validate`] : ["string", O, Y];
      }
      function N() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Se._)`await ${m}(${n})`;
        }
        return typeof $ == "function" ? (0, Se._)`${m}(${n})` : (0, Se._)`${m}.test(${n})`;
      }
    }
  }
};
ec.default = Z0;
Object.defineProperty(Qi, "__esModule", { value: !0 });
const H0 = ec, B0 = [H0.default];
Qi.default = B0;
var hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.contentVocabulary = hn.metadataVocabulary = void 0;
hn.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
hn.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(pi, "__esModule", { value: !0 });
const W0 = yi, J0 = gi, X0 = ki, Y0 = qi, Q0 = Zi, ew = Ji, tw = Qi, Xu = hn, rw = [
  Y0.default,
  W0.default,
  J0.default,
  (0, X0.default)(!0),
  tw.default,
  Xu.metadataVocabulary,
  Xu.contentVocabulary,
  Q0.default,
  ew.default
];
pi.default = rw;
var tc = {}, Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
Aa.DiscrError = void 0;
var Yu;
(function(t) {
  t.Tag = "tag", t.Mapping = "mapping";
})(Yu || (Aa.DiscrError = Yu = {}));
Object.defineProperty(tc, "__esModule", { value: !0 });
const Wr = re, Vo = Aa, Qu = xe, nw = yn, sw = D, aw = {
  message: ({ params: { discrError: t, tagName: e } }) => t === Vo.DiscrError.Tag ? `tag "${e}" must be string` : `value of tag "${e}" must be in oneOf`,
  params: ({ params: { discrError: t, tag: e, tagName: r } }) => (0, Wr._)`{error: ${t}, tag: ${r}, tagValue: ${e}}`
}, ow = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: aw,
  code(t) {
    const { gen: e, data: r, schema: n, parentSchema: s, it: a } = t, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const i = n.propertyName;
    if (typeof i != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = e.let("valid", !1), u = e.const("tag", (0, Wr._)`${r}${(0, Wr.getProperty)(i)}`);
    e.if((0, Wr._)`typeof ${u} == "string"`, () => l(), () => t.error(!1, { discrError: Vo.DiscrError.Tag, tag: u, tagName: i })), t.ok(c);
    function l() {
      const g = v();
      e.if(!1);
      for (const y in g)
        e.elseIf((0, Wr._)`${u} === ${y}`), e.assign(c, f(g[y]));
      e.else(), t.error(!1, { discrError: Vo.DiscrError.Mapping, tag: u, tagName: i }), e.endIf();
    }
    function f(g) {
      const y = e.name("valid"), w = t.subschema({ keyword: "oneOf", schemaProp: g }, y);
      return t.mergeEvaluated(w, Wr.Name), y;
    }
    function v() {
      var g;
      const y = {}, w = m(s);
      let $ = !0;
      for (let N = 0; N < o.length; N++) {
        let O = o[N];
        if (O != null && O.$ref && !(0, sw.schemaHasRulesButRef)(O, a.self.RULES)) {
          const Y = O.$ref;
          if (O = Qu.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, Y), O instanceof Qu.SchemaEnv && (O = O.schema), O === void 0)
            throw new nw.default(a.opts.uriResolver, a.baseId, Y);
        }
        const q = (g = O == null ? void 0 : O.properties) === null || g === void 0 ? void 0 : g[i];
        if (typeof q != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${i}"`);
        $ = $ && (w || m(O)), E(q, N);
      }
      if (!$)
        throw new Error(`discriminator: "${i}" must be required`);
      return y;
      function m({ required: N }) {
        return Array.isArray(N) && N.includes(i);
      }
      function E(N, O) {
        if (N.const)
          R(N.const, O);
        else if (N.enum)
          for (const q of N.enum)
            R(q, O);
        else
          throw new Error(`discriminator: "properties/${i}" must have "const" or "enum"`);
      }
      function R(N, O) {
        if (typeof N != "string" || N in y)
          throw new Error(`discriminator: "${i}" values must be unique strings`);
        y[N] = O;
      }
    }
  }
};
tc.default = ow;
var rc = {};
const iw = "https://json-schema.org/draft/2020-12/schema", cw = "https://json-schema.org/draft/2020-12/schema", uw = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, lw = "meta", dw = "Core and Validation specifications meta-schema", fw = [
  {
    $ref: "meta/core"
  },
  {
    $ref: "meta/applicator"
  },
  {
    $ref: "meta/unevaluated"
  },
  {
    $ref: "meta/validation"
  },
  {
    $ref: "meta/meta-data"
  },
  {
    $ref: "meta/format-annotation"
  },
  {
    $ref: "meta/content"
  }
], hw = [
  "object",
  "boolean"
], mw = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", pw = {
  definitions: {
    $comment: '"definitions" has been replaced by "$defs".',
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    deprecated: !0,
    default: {}
  },
  dependencies: {
    $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $dynamicRef: "#meta"
        },
        {
          $ref: "meta/validation#/$defs/stringArray"
        }
      ]
    },
    deprecated: !0,
    default: {}
  },
  $recursiveAnchor: {
    $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
    $ref: "meta/core#/$defs/anchorString",
    deprecated: !0
  },
  $recursiveRef: {
    $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
    $ref: "meta/core#/$defs/uriReferenceString",
    deprecated: !0
  }
}, yw = {
  $schema: iw,
  $id: cw,
  $vocabulary: uw,
  $dynamicAnchor: lw,
  title: dw,
  allOf: fw,
  type: hw,
  $comment: mw,
  properties: pw
}, $w = "https://json-schema.org/draft/2020-12/schema", gw = "https://json-schema.org/draft/2020-12/meta/applicator", _w = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, vw = "meta", ww = "Applicator vocabulary meta-schema", Ew = [
  "object",
  "boolean"
], bw = {
  prefixItems: {
    $ref: "#/$defs/schemaArray"
  },
  items: {
    $dynamicRef: "#meta"
  },
  contains: {
    $dynamicRef: "#meta"
  },
  additionalProperties: {
    $dynamicRef: "#meta"
  },
  properties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependentSchemas: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  propertyNames: {
    $dynamicRef: "#meta"
  },
  if: {
    $dynamicRef: "#meta"
  },
  then: {
    $dynamicRef: "#meta"
  },
  else: {
    $dynamicRef: "#meta"
  },
  allOf: {
    $ref: "#/$defs/schemaArray"
  },
  anyOf: {
    $ref: "#/$defs/schemaArray"
  },
  oneOf: {
    $ref: "#/$defs/schemaArray"
  },
  not: {
    $dynamicRef: "#meta"
  }
}, Sw = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, Pw = {
  $schema: $w,
  $id: gw,
  $vocabulary: _w,
  $dynamicAnchor: vw,
  title: ww,
  type: Ew,
  properties: bw,
  $defs: Sw
}, Rw = "https://json-schema.org/draft/2020-12/schema", Nw = "https://json-schema.org/draft/2020-12/meta/unevaluated", Ow = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, Tw = "meta", kw = "Unevaluated applicator vocabulary meta-schema", Iw = [
  "object",
  "boolean"
], Cw = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, jw = {
  $schema: Rw,
  $id: Nw,
  $vocabulary: Ow,
  $dynamicAnchor: Tw,
  title: kw,
  type: Iw,
  properties: Cw
}, Aw = "https://json-schema.org/draft/2020-12/schema", Dw = "https://json-schema.org/draft/2020-12/meta/content", Mw = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, Vw = "meta", Lw = "Content vocabulary meta-schema", Fw = [
  "object",
  "boolean"
], zw = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, Uw = {
  $schema: Aw,
  $id: Dw,
  $vocabulary: Mw,
  $dynamicAnchor: Vw,
  title: Lw,
  type: Fw,
  properties: zw
}, xw = "https://json-schema.org/draft/2020-12/schema", qw = "https://json-schema.org/draft/2020-12/meta/core", Kw = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, Gw = "meta", Zw = "Core vocabulary meta-schema", Hw = [
  "object",
  "boolean"
], Bw = {
  $id: {
    $ref: "#/$defs/uriReferenceString",
    $comment: "Non-empty fragments not allowed.",
    pattern: "^[^#]*#?$"
  },
  $schema: {
    $ref: "#/$defs/uriString"
  },
  $ref: {
    $ref: "#/$defs/uriReferenceString"
  },
  $anchor: {
    $ref: "#/$defs/anchorString"
  },
  $dynamicRef: {
    $ref: "#/$defs/uriReferenceString"
  },
  $dynamicAnchor: {
    $ref: "#/$defs/anchorString"
  },
  $vocabulary: {
    type: "object",
    propertyNames: {
      $ref: "#/$defs/uriString"
    },
    additionalProperties: {
      type: "boolean"
    }
  },
  $comment: {
    type: "string"
  },
  $defs: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    }
  }
}, Ww = {
  anchorString: {
    type: "string",
    pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
  },
  uriString: {
    type: "string",
    format: "uri"
  },
  uriReferenceString: {
    type: "string",
    format: "uri-reference"
  }
}, Jw = {
  $schema: xw,
  $id: qw,
  $vocabulary: Kw,
  $dynamicAnchor: Gw,
  title: Zw,
  type: Hw,
  properties: Bw,
  $defs: Ww
}, Xw = "https://json-schema.org/draft/2020-12/schema", Yw = "https://json-schema.org/draft/2020-12/meta/format-annotation", Qw = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, eE = "meta", tE = "Format vocabulary meta-schema for annotation results", rE = [
  "object",
  "boolean"
], nE = {
  format: {
    type: "string"
  }
}, sE = {
  $schema: Xw,
  $id: Yw,
  $vocabulary: Qw,
  $dynamicAnchor: eE,
  title: tE,
  type: rE,
  properties: nE
}, aE = "https://json-schema.org/draft/2020-12/schema", oE = "https://json-schema.org/draft/2020-12/meta/meta-data", iE = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, cE = "meta", uE = "Meta-data vocabulary meta-schema", lE = [
  "object",
  "boolean"
], dE = {
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  deprecated: {
    type: "boolean",
    default: !1
  },
  readOnly: {
    type: "boolean",
    default: !1
  },
  writeOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  }
}, fE = {
  $schema: aE,
  $id: oE,
  $vocabulary: iE,
  $dynamicAnchor: cE,
  title: uE,
  type: lE,
  properties: dE
}, hE = "https://json-schema.org/draft/2020-12/schema", mE = "https://json-schema.org/draft/2020-12/meta/validation", pE = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, yE = "meta", $E = "Validation vocabulary meta-schema", gE = [
  "object",
  "boolean"
], _E = {
  type: {
    anyOf: [
      {
        $ref: "#/$defs/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  const: !0,
  enum: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  maxItems: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  maxContains: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minContains: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 1
  },
  maxProperties: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/$defs/stringArray"
  },
  dependentRequired: {
    type: "object",
    additionalProperties: {
      $ref: "#/$defs/stringArray"
    }
  }
}, vE = {
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 0
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, wE = {
  $schema: hE,
  $id: mE,
  $vocabulary: pE,
  $dynamicAnchor: yE,
  title: $E,
  type: gE,
  properties: _E,
  $defs: vE
};
Object.defineProperty(rc, "__esModule", { value: !0 });
const EE = yw, bE = Pw, SE = jw, PE = Uw, RE = Jw, NE = sE, OE = fE, TE = wE, kE = ["/properties"];
function IE(t) {
  return [
    EE,
    bE,
    SE,
    PE,
    RE,
    e(this, NE),
    OE,
    e(this, TE)
  ].forEach((r) => this.addMetaSchema(r, void 0, !1)), this;
  function e(r, n) {
    return t ? r.$dataMetaSchema(n, kE) : n;
  }
}
rc.default = IE;
(function(t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.MissingRefError = e.ValidationError = e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = e.Ajv2020 = void 0;
  const r = qd, n = pi, s = tc, a = rc, o = "https://json-schema.org/draft/2020-12/schema";
  class i extends r.default {
    constructor(g = {}) {
      super({
        ...g,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((g) => this.addVocabulary(g)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: g, meta: y } = this.opts;
      y && (a.default.call(this, g), this.refs["http://json-schema.org/schema"] = o);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(o) ? o : void 0);
    }
  }
  e.Ajv2020 = i, t.exports = e = i, t.exports.Ajv2020 = i, Object.defineProperty(e, "__esModule", { value: !0 }), e.default = i;
  var c = lt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var u = re;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var l = Es;
  Object.defineProperty(e, "ValidationError", { enumerable: !0, get: function() {
    return l.default;
  } });
  var f = yn;
  Object.defineProperty(e, "MissingRefError", { enumerable: !0, get: function() {
    return f.default;
  } });
})(To, To.exports);
var CE = To.exports, Lo = { exports: {} }, Uf = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.formatNames = t.fastFormats = t.fullFormats = void 0;
  function e(G, W) {
    return { validate: G, compare: W };
  }
  t.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: e(a, o),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: e(c(!0), u),
    "date-time": e(v(!0), g),
    "iso-time": e(c(), l),
    "iso-date-time": e(v(), y),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: m,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: Re,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: R,
    // signed 32 bit integer
    int32: { type: "number", validate: q },
    // signed 64 bit integer
    int64: { type: "number", validate: Y },
    // C-type float
    float: { type: "number", validate: $e },
    // C-type double
    double: { type: "number", validate: $e },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, t.fastFormats = {
    ...t.fullFormats,
    date: e(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, o),
    time: e(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, u),
    "date-time": e(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, g),
    "iso-time": e(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, l),
    "iso-date-time": e(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, y),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, t.formatNames = Object.keys(t.fullFormats);
  function r(G) {
    return G % 4 === 0 && (G % 100 !== 0 || G % 400 === 0);
  }
  const n = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function a(G) {
    const W = n.exec(G);
    if (!W)
      return !1;
    const me = +W[1], k = +W[2], C = +W[3];
    return k >= 1 && k <= 12 && C >= 1 && C <= (k === 2 && r(me) ? 29 : s[k]);
  }
  function o(G, W) {
    if (G && W)
      return G > W ? 1 : G < W ? -1 : 0;
  }
  const i = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(G) {
    return function(me) {
      const k = i.exec(me);
      if (!k)
        return !1;
      const C = +k[1], z = +k[2], L = +k[3], B = k[4], F = k[5] === "-" ? -1 : 1, P = +(k[6] || 0), p = +(k[7] || 0);
      if (P > 23 || p > 59 || G && !B)
        return !1;
      if (C <= 23 && z <= 59 && L < 60)
        return !0;
      const S = z - p * F, _ = C - P * F - (S < 0 ? 1 : 0);
      return (_ === 23 || _ === -1) && (S === 59 || S === -1) && L < 61;
    };
  }
  function u(G, W) {
    if (!(G && W))
      return;
    const me = (/* @__PURE__ */ new Date("2020-01-01T" + G)).valueOf(), k = (/* @__PURE__ */ new Date("2020-01-01T" + W)).valueOf();
    if (me && k)
      return me - k;
  }
  function l(G, W) {
    if (!(G && W))
      return;
    const me = i.exec(G), k = i.exec(W);
    if (me && k)
      return G = me[1] + me[2] + me[3], W = k[1] + k[2] + k[3], G > W ? 1 : G < W ? -1 : 0;
  }
  const f = /t|\s/i;
  function v(G) {
    const W = c(G);
    return function(k) {
      const C = k.split(f);
      return C.length === 2 && a(C[0]) && W(C[1]);
    };
  }
  function g(G, W) {
    if (!(G && W))
      return;
    const me = new Date(G).valueOf(), k = new Date(W).valueOf();
    if (me && k)
      return me - k;
  }
  function y(G, W) {
    if (!(G && W))
      return;
    const [me, k] = G.split(f), [C, z] = W.split(f), L = o(me, C);
    if (L !== void 0)
      return L || u(k, z);
  }
  const w = /\/|:/, $ = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function m(G) {
    return w.test(G) && $.test(G);
  }
  const E = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function R(G) {
    return E.lastIndex = 0, E.test(G);
  }
  const N = -(2 ** 31), O = 2 ** 31 - 1;
  function q(G) {
    return Number.isInteger(G) && G <= O && G >= N;
  }
  function Y(G) {
    return Number.isInteger(G);
  }
  function $e() {
    return !0;
  }
  const be = /[^\\]\\Z/;
  function Re(G) {
    if (be.test(G))
      return !1;
    try {
      return new RegExp(G), !0;
    } catch {
      return !1;
    }
  }
})(Uf);
var xf = {}, Fo = { exports: {} }, qf = {}, dt = {}, mn = {}, Ss = {}, ie = {}, _s = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.regexpCode = t.getEsmExportName = t.getProperty = t.safeStringify = t.stringify = t.strConcat = t.addCodeArg = t.str = t._ = t.nil = t._Code = t.Name = t.IDENTIFIER = t._CodeOrName = void 0;
  class e {
  }
  t._CodeOrName = e, t.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class r extends e {
    constructor(E) {
      if (super(), !t.IDENTIFIER.test(E))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  t.Name = r;
  class n extends e {
    constructor(E) {
      super(), this._items = typeof E == "string" ? [E] : E;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const E = this._items[0];
      return E === "" || E === '""';
    }
    get str() {
      var E;
      return (E = this._str) !== null && E !== void 0 ? E : this._str = this._items.reduce((R, N) => `${R}${N}`, "");
    }
    get names() {
      var E;
      return (E = this._names) !== null && E !== void 0 ? E : this._names = this._items.reduce((R, N) => (N instanceof r && (R[N.str] = (R[N.str] || 0) + 1), R), {});
    }
  }
  t._Code = n, t.nil = new n("");
  function s(m, ...E) {
    const R = [m[0]];
    let N = 0;
    for (; N < E.length; )
      i(R, E[N]), R.push(m[++N]);
    return new n(R);
  }
  t._ = s;
  const a = new n("+");
  function o(m, ...E) {
    const R = [g(m[0])];
    let N = 0;
    for (; N < E.length; )
      R.push(a), i(R, E[N]), R.push(a, g(m[++N]));
    return c(R), new n(R);
  }
  t.str = o;
  function i(m, E) {
    E instanceof n ? m.push(...E._items) : E instanceof r ? m.push(E) : m.push(f(E));
  }
  t.addCodeArg = i;
  function c(m) {
    let E = 1;
    for (; E < m.length - 1; ) {
      if (m[E] === a) {
        const R = u(m[E - 1], m[E + 1]);
        if (R !== void 0) {
          m.splice(E - 1, 3, R);
          continue;
        }
        m[E++] = "+";
      }
      E++;
    }
  }
  function u(m, E) {
    if (E === '""')
      return m;
    if (m === '""')
      return E;
    if (typeof m == "string")
      return E instanceof r || m[m.length - 1] !== '"' ? void 0 : typeof E != "string" ? `${m.slice(0, -1)}${E}"` : E[0] === '"' ? m.slice(0, -1) + E.slice(1) : void 0;
    if (typeof E == "string" && E[0] === '"' && !(m instanceof r))
      return `"${m}${E.slice(1)}`;
  }
  function l(m, E) {
    return E.emptyStr() ? m : m.emptyStr() ? E : o`${m}${E}`;
  }
  t.strConcat = l;
  function f(m) {
    return typeof m == "number" || typeof m == "boolean" || m === null ? m : g(Array.isArray(m) ? m.join(",") : m);
  }
  function v(m) {
    return new n(g(m));
  }
  t.stringify = v;
  function g(m) {
    return JSON.stringify(m).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  t.safeStringify = g;
  function y(m) {
    return typeof m == "string" && t.IDENTIFIER.test(m) ? new n(`.${m}`) : s`[${m}]`;
  }
  t.getProperty = y;
  function w(m) {
    if (typeof m == "string" && t.IDENTIFIER.test(m))
      return new n(`${m}`);
    throw new Error(`CodeGen: invalid export name: ${m}, use explicit $id name mapping`);
  }
  t.getEsmExportName = w;
  function $(m) {
    return new n(m.toString());
  }
  t.regexpCode = $;
})(_s);
var zo = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.ValueScope = t.ValueScopeName = t.Scope = t.varKinds = t.UsedValueState = void 0;
  const e = _s;
  class r extends Error {
    constructor(u) {
      super(`CodeGen: "code" for ${u} not defined`), this.value = u.value;
    }
  }
  var n;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(n || (t.UsedValueState = n = {})), t.varKinds = {
    const: new e.Name("const"),
    let: new e.Name("let"),
    var: new e.Name("var")
  };
  class s {
    constructor({ prefixes: u, parent: l } = {}) {
      this._names = {}, this._prefixes = u, this._parent = l;
    }
    toName(u) {
      return u instanceof e.Name ? u : this.name(u);
    }
    name(u) {
      return new e.Name(this._newName(u));
    }
    _newName(u) {
      const l = this._names[u] || this._nameGroup(u);
      return `${u}${l.index++}`;
    }
    _nameGroup(u) {
      var l, f;
      if (!((f = (l = this._parent) === null || l === void 0 ? void 0 : l._prefixes) === null || f === void 0) && f.has(u) || this._prefixes && !this._prefixes.has(u))
        throw new Error(`CodeGen: prefix "${u}" is not allowed in this scope`);
      return this._names[u] = { prefix: u, index: 0 };
    }
  }
  t.Scope = s;
  class a extends e.Name {
    constructor(u, l) {
      super(l), this.prefix = u;
    }
    setValue(u, { property: l, itemIndex: f }) {
      this.value = u, this.scopePath = (0, e._)`.${new e.Name(l)}[${f}]`;
    }
  }
  t.ValueScopeName = a;
  const o = (0, e._)`\n`;
  class i extends s {
    constructor(u) {
      super(u), this._values = {}, this._scope = u.scope, this.opts = { ...u, _n: u.lines ? o : e.nil };
    }
    get() {
      return this._scope;
    }
    name(u) {
      return new a(u, this._newName(u));
    }
    value(u, l) {
      var f;
      if (l.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const v = this.toName(u), { prefix: g } = v, y = (f = l.key) !== null && f !== void 0 ? f : l.ref;
      let w = this._values[g];
      if (w) {
        const E = w.get(y);
        if (E)
          return E;
      } else
        w = this._values[g] = /* @__PURE__ */ new Map();
      w.set(y, v);
      const $ = this._scope[g] || (this._scope[g] = []), m = $.length;
      return $[m] = l.ref, v.setValue(l, { property: g, itemIndex: m }), v;
    }
    getValue(u, l) {
      const f = this._values[u];
      if (f)
        return f.get(l);
    }
    scopeRefs(u, l = this._values) {
      return this._reduceValues(l, (f) => {
        if (f.scopePath === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return (0, e._)`${u}${f.scopePath}`;
      });
    }
    scopeCode(u = this._values, l, f) {
      return this._reduceValues(u, (v) => {
        if (v.value === void 0)
          throw new Error(`CodeGen: name "${v}" has no value`);
        return v.value.code;
      }, l, f);
    }
    _reduceValues(u, l, f = {}, v) {
      let g = e.nil;
      for (const y in u) {
        const w = u[y];
        if (!w)
          continue;
        const $ = f[y] = f[y] || /* @__PURE__ */ new Map();
        w.forEach((m) => {
          if ($.has(m))
            return;
          $.set(m, n.Started);
          let E = l(m);
          if (E) {
            const R = this.opts.es5 ? t.varKinds.var : t.varKinds.const;
            g = (0, e._)`${g}${R} ${m} = ${E};${this.opts._n}`;
          } else if (E = v == null ? void 0 : v(m))
            g = (0, e._)`${g}${E}${this.opts._n}`;
          else
            throw new r(m);
          $.set(m, n.Completed);
        });
      }
      return g;
    }
  }
  t.ValueScope = i;
})(zo);
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.or = t.and = t.not = t.CodeGen = t.operators = t.varKinds = t.ValueScopeName = t.ValueScope = t.Scope = t.Name = t.regexpCode = t.stringify = t.getProperty = t.nil = t.strConcat = t.str = t._ = void 0;
  const e = _s, r = zo;
  var n = _s;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(t, "strConcat", { enumerable: !0, get: function() {
    return n.strConcat;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(t, "getProperty", { enumerable: !0, get: function() {
    return n.getProperty;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(t, "regexpCode", { enumerable: !0, get: function() {
    return n.regexpCode;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } });
  var s = zo;
  Object.defineProperty(t, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(t, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(t, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(t, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), t.operators = {
    GT: new e._Code(">"),
    GTE: new e._Code(">="),
    LT: new e._Code("<"),
    LTE: new e._Code("<="),
    EQ: new e._Code("==="),
    NEQ: new e._Code("!=="),
    NOT: new e._Code("!"),
    OR: new e._Code("||"),
    AND: new e._Code("&&"),
    ADD: new e._Code("+")
  };
  class a {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, h) {
      return this;
    }
  }
  class o extends a {
    constructor(d, h, b) {
      super(), this.varKind = d, this.name = h, this.rhs = b;
    }
    render({ es5: d, _n: h }) {
      const b = d ? r.varKinds.var : this.varKind, T = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${b} ${this.name}${T};` + h;
    }
    optimizeNames(d, h) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = k(this.rhs, d, h)), this;
    }
    get names() {
      return this.rhs instanceof e._CodeOrName ? this.rhs.names : {};
    }
  }
  class i extends a {
    constructor(d, h, b) {
      super(), this.lhs = d, this.rhs = h, this.sideEffects = b;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, h) {
      if (!(this.lhs instanceof e.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = k(this.rhs, d, h), this;
    }
    get names() {
      const d = this.lhs instanceof e.Name ? {} : { ...this.lhs.names };
      return me(d, this.rhs);
    }
  }
  class c extends i {
    constructor(d, h, b, T) {
      super(d, b, T), this.op = h;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class u extends a {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class l extends a {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class f extends a {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class v extends a {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, h) {
      return this.code = k(this.code, d, h), this;
    }
    get names() {
      return this.code instanceof e._CodeOrName ? this.code.names : {};
    }
  }
  class g extends a {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce((h, b) => h + b.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let h = d.length;
      for (; h--; ) {
        const b = d[h].optimizeNodes();
        Array.isArray(b) ? d.splice(h, 1, ...b) : b ? d[h] = b : d.splice(h, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, h) {
      const { nodes: b } = this;
      let T = b.length;
      for (; T--; ) {
        const I = b[T];
        I.optimizeNames(d, h) || (C(d, I.names), b.splice(T, 1));
      }
      return b.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, h) => W(d, h.names), {});
    }
  }
  class y extends g {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class w extends g {
  }
  class $ extends y {
  }
  $.kind = "else";
  class m extends y {
    constructor(d, h) {
      super(h), this.condition = d;
    }
    render(d) {
      let h = `if(${this.condition})` + super.render(d);
      return this.else && (h += "else " + this.else.render(d)), h;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let h = this.else;
      if (h) {
        const b = h.optimizeNodes();
        h = this.else = Array.isArray(b) ? new $(b) : b;
      }
      if (h)
        return d === !1 ? h instanceof m ? h : h.nodes : this.nodes.length ? this : new m(z(d), h instanceof m ? [h] : h.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, h) {
      var b;
      if (this.else = (b = this.else) === null || b === void 0 ? void 0 : b.optimizeNames(d, h), !!(super.optimizeNames(d, h) || this.else))
        return this.condition = k(this.condition, d, h), this;
    }
    get names() {
      const d = super.names;
      return me(d, this.condition), this.else && W(d, this.else.names), d;
    }
  }
  m.kind = "if";
  class E extends y {
  }
  E.kind = "for";
  class R extends E {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, h) {
      if (super.optimizeNames(d, h))
        return this.iteration = k(this.iteration, d, h), this;
    }
    get names() {
      return W(super.names, this.iteration.names);
    }
  }
  class N extends E {
    constructor(d, h, b, T) {
      super(), this.varKind = d, this.name = h, this.from = b, this.to = T;
    }
    render(d) {
      const h = d.es5 ? r.varKinds.var : this.varKind, { name: b, from: T, to: I } = this;
      return `for(${h} ${b}=${T}; ${b}<${I}; ${b}++)` + super.render(d);
    }
    get names() {
      const d = me(super.names, this.from);
      return me(d, this.to);
    }
  }
  class O extends E {
    constructor(d, h, b, T) {
      super(), this.loop = d, this.varKind = h, this.name = b, this.iterable = T;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, h) {
      if (super.optimizeNames(d, h))
        return this.iterable = k(this.iterable, d, h), this;
    }
    get names() {
      return W(super.names, this.iterable.names);
    }
  }
  class q extends y {
    constructor(d, h, b) {
      super(), this.name = d, this.args = h, this.async = b;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  q.kind = "func";
  class Y extends g {
    render(d) {
      return "return " + super.render(d);
    }
  }
  Y.kind = "return";
  class $e extends y {
    render(d) {
      let h = "try" + super.render(d);
      return this.catch && (h += this.catch.render(d)), this.finally && (h += this.finally.render(d)), h;
    }
    optimizeNodes() {
      var d, h;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), (h = this.finally) === null || h === void 0 || h.optimizeNodes(), this;
    }
    optimizeNames(d, h) {
      var b, T;
      return super.optimizeNames(d, h), (b = this.catch) === null || b === void 0 || b.optimizeNames(d, h), (T = this.finally) === null || T === void 0 || T.optimizeNames(d, h), this;
    }
    get names() {
      const d = super.names;
      return this.catch && W(d, this.catch.names), this.finally && W(d, this.finally.names), d;
    }
  }
  class be extends y {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  be.kind = "catch";
  class Re extends y {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  Re.kind = "finally";
  class G {
    constructor(d, h = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...h, _n: h.lines ? `
` : "" }, this._extScope = d, this._scope = new r.Scope({ parent: d }), this._nodes = [new w()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, h) {
      const b = this._extScope.value(d, h);
      return (this._values[b.prefix] || (this._values[b.prefix] = /* @__PURE__ */ new Set())).add(b), b;
    }
    getScopeValue(d, h) {
      return this._extScope.getValue(d, h);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, h, b, T) {
      const I = this._scope.toName(h);
      return b !== void 0 && T && (this._constants[I.str] = b), this._leafNode(new o(d, I, b)), I;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, h, b) {
      return this._def(r.varKinds.const, d, h, b);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, h, b) {
      return this._def(r.varKinds.let, d, h, b);
    }
    // `var` declaration with optional assignment
    var(d, h, b) {
      return this._def(r.varKinds.var, d, h, b);
    }
    // assignment code
    assign(d, h, b) {
      return this._leafNode(new i(d, h, b));
    }
    // `+=` code
    add(d, h) {
      return this._leafNode(new c(d, t.operators.ADD, h));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== e.nil && this._leafNode(new v(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const h = ["{"];
      for (const [b, T] of d)
        h.length > 1 && h.push(","), h.push(b), (b !== T || this.opts.es5) && (h.push(":"), (0, e.addCodeArg)(h, T));
      return h.push("}"), new e._Code(h);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, h, b) {
      if (this._blockNode(new m(d)), h && b)
        this.code(h).else().code(b).endIf();
      else if (h)
        this.code(h).endIf();
      else if (b)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new m(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new $());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(m, $);
    }
    _for(d, h) {
      return this._blockNode(d), h && this.code(h).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, h) {
      return this._for(new R(d), h);
    }
    // `for` statement for a range of values
    forRange(d, h, b, T, I = this.opts.es5 ? r.varKinds.var : r.varKinds.let) {
      const K = this._scope.toName(d);
      return this._for(new N(I, K, h, b), () => T(K));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, h, b, T = r.varKinds.const) {
      const I = this._scope.toName(d);
      if (this.opts.es5) {
        const K = h instanceof e.Name ? h : this.var("_arr", h);
        return this.forRange("_i", 0, (0, e._)`${K}.length`, (U) => {
          this.var(I, (0, e._)`${K}[${U}]`), b(I);
        });
      }
      return this._for(new O("of", T, I, h), () => b(I));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, h, b, T = this.opts.es5 ? r.varKinds.var : r.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, e._)`Object.keys(${h})`, b);
      const I = this._scope.toName(d);
      return this._for(new O("in", T, I, h), () => b(I));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode(E);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new u(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new l(d));
    }
    // `return` statement
    return(d) {
      const h = new Y();
      if (this._blockNode(h), this.code(d), h.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Y);
    }
    // `try` statement
    try(d, h, b) {
      if (!h && !b)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const T = new $e();
      if (this._blockNode(T), this.code(d), h) {
        const I = this.name("e");
        this._currNode = T.catch = new be(I), h(I);
      }
      return b && (this._currNode = T.finally = new Re(), this.code(b)), this._endBlockNode(be, Re);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new f(d));
    }
    // start self-balancing block
    block(d, h) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock(h), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const h = this._blockStarts.pop();
      if (h === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const b = this._nodes.length - h;
      if (b < 0 || d !== void 0 && b !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${b} vs ${d} expected`);
      return this._nodes.length = h, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, h = e.nil, b, T) {
      return this._blockNode(new q(d, h, b)), T && this.code(T).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(q);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, h) {
      const b = this._currNode;
      if (b instanceof d || h && b instanceof h)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${h ? `${d.kind}/${h.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const h = this._currNode;
      if (!(h instanceof m))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = h.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const h = this._nodes;
      h[h.length - 1] = d;
    }
  }
  t.CodeGen = G;
  function W(_, d) {
    for (const h in d)
      _[h] = (_[h] || 0) + (d[h] || 0);
    return _;
  }
  function me(_, d) {
    return d instanceof e._CodeOrName ? W(_, d.names) : _;
  }
  function k(_, d, h) {
    if (_ instanceof e.Name)
      return b(_);
    if (!T(_))
      return _;
    return new e._Code(_._items.reduce((I, K) => (K instanceof e.Name && (K = b(K)), K instanceof e._Code ? I.push(...K._items) : I.push(K), I), []));
    function b(I) {
      const K = h[I.str];
      return K === void 0 || d[I.str] !== 1 ? I : (delete d[I.str], K);
    }
    function T(I) {
      return I instanceof e._Code && I._items.some((K) => K instanceof e.Name && d[K.str] === 1 && h[K.str] !== void 0);
    }
  }
  function C(_, d) {
    for (const h in d)
      _[h] = (_[h] || 0) - (d[h] || 0);
  }
  function z(_) {
    return typeof _ == "boolean" || typeof _ == "number" || _ === null ? !_ : (0, e._)`!${S(_)}`;
  }
  t.not = z;
  const L = p(t.operators.AND);
  function B(..._) {
    return _.reduce(L);
  }
  t.and = B;
  const F = p(t.operators.OR);
  function P(..._) {
    return _.reduce(F);
  }
  t.or = P;
  function p(_) {
    return (d, h) => d === e.nil ? h : h === e.nil ? d : (0, e._)`${S(d)} ${_} ${S(h)}`;
  }
  function S(_) {
    return _ instanceof e.Name ? _ : (0, e._)`(${_})`;
  }
})(ie);
var M = {};
Object.defineProperty(M, "__esModule", { value: !0 });
M.checkStrictMode = M.getErrorPath = M.Type = M.useFunc = M.setEvaluated = M.evaluatedPropsToName = M.mergeEvaluated = M.eachItem = M.unescapeJsonPointer = M.escapeJsonPointer = M.escapeFragment = M.unescapeFragment = M.schemaRefOrVal = M.schemaHasRulesButRef = M.schemaHasRules = M.checkUnknownRules = M.alwaysValidSchema = M.toHash = void 0;
const ye = ie, jE = _s;
function AE(t) {
  const e = {};
  for (const r of t)
    e[r] = !0;
  return e;
}
M.toHash = AE;
function DE(t, e) {
  return typeof e == "boolean" ? e : Object.keys(e).length === 0 ? !0 : (Kf(t, e), !Gf(e, t.self.RULES.all));
}
M.alwaysValidSchema = DE;
function Kf(t, e = t.schema) {
  const { opts: r, self: n } = t;
  if (!r.strictSchema || typeof e == "boolean")
    return;
  const s = n.RULES.keywords;
  for (const a in e)
    s[a] || Bf(t, `unknown keyword: "${a}"`);
}
M.checkUnknownRules = Kf;
function Gf(t, e) {
  if (typeof t == "boolean")
    return !t;
  for (const r in t)
    if (e[r])
      return !0;
  return !1;
}
M.schemaHasRules = Gf;
function ME(t, e) {
  if (typeof t == "boolean")
    return !t;
  for (const r in t)
    if (r !== "$ref" && e.all[r])
      return !0;
  return !1;
}
M.schemaHasRulesButRef = ME;
function VE({ topSchemaRef: t, schemaPath: e }, r, n, s) {
  if (!s) {
    if (typeof r == "number" || typeof r == "boolean")
      return r;
    if (typeof r == "string")
      return (0, ye._)`${r}`;
  }
  return (0, ye._)`${t}${e}${(0, ye.getProperty)(n)}`;
}
M.schemaRefOrVal = VE;
function LE(t) {
  return Zf(decodeURIComponent(t));
}
M.unescapeFragment = LE;
function FE(t) {
  return encodeURIComponent(nc(t));
}
M.escapeFragment = FE;
function nc(t) {
  return typeof t == "number" ? `${t}` : t.replace(/~/g, "~0").replace(/\//g, "~1");
}
M.escapeJsonPointer = nc;
function Zf(t) {
  return t.replace(/~1/g, "/").replace(/~0/g, "~");
}
M.unescapeJsonPointer = Zf;
function zE(t, e) {
  if (Array.isArray(t))
    for (const r of t)
      e(r);
  else
    e(t);
}
M.eachItem = zE;
function el({ mergeNames: t, mergeToName: e, mergeValues: r, resultToName: n }) {
  return (s, a, o, i) => {
    const c = o === void 0 ? a : o instanceof ye.Name ? (a instanceof ye.Name ? t(s, a, o) : e(s, a, o), o) : a instanceof ye.Name ? (e(s, o, a), a) : r(a, o);
    return i === ye.Name && !(c instanceof ye.Name) ? n(s, c) : c;
  };
}
M.mergeEvaluated = {
  props: el({
    mergeNames: (t, e, r) => t.if((0, ye._)`${r} !== true && ${e} !== undefined`, () => {
      t.if((0, ye._)`${e} === true`, () => t.assign(r, !0), () => t.assign(r, (0, ye._)`${r} || {}`).code((0, ye._)`Object.assign(${r}, ${e})`));
    }),
    mergeToName: (t, e, r) => t.if((0, ye._)`${r} !== true`, () => {
      e === !0 ? t.assign(r, !0) : (t.assign(r, (0, ye._)`${r} || {}`), sc(t, r, e));
    }),
    mergeValues: (t, e) => t === !0 ? !0 : { ...t, ...e },
    resultToName: Hf
  }),
  items: el({
    mergeNames: (t, e, r) => t.if((0, ye._)`${r} !== true && ${e} !== undefined`, () => t.assign(r, (0, ye._)`${e} === true ? true : ${r} > ${e} ? ${r} : ${e}`)),
    mergeToName: (t, e, r) => t.if((0, ye._)`${r} !== true`, () => t.assign(r, e === !0 ? !0 : (0, ye._)`${r} > ${e} ? ${r} : ${e}`)),
    mergeValues: (t, e) => t === !0 ? !0 : Math.max(t, e),
    resultToName: (t, e) => t.var("items", e)
  })
};
function Hf(t, e) {
  if (e === !0)
    return t.var("props", !0);
  const r = t.var("props", (0, ye._)`{}`);
  return e !== void 0 && sc(t, r, e), r;
}
M.evaluatedPropsToName = Hf;
function sc(t, e, r) {
  Object.keys(r).forEach((n) => t.assign((0, ye._)`${e}${(0, ye.getProperty)(n)}`, !0));
}
M.setEvaluated = sc;
const tl = {};
function UE(t, e) {
  return t.scopeValue("func", {
    ref: e,
    code: tl[e.code] || (tl[e.code] = new jE._Code(e.code))
  });
}
M.useFunc = UE;
var Uo;
(function(t) {
  t[t.Num = 0] = "Num", t[t.Str = 1] = "Str";
})(Uo || (M.Type = Uo = {}));
function xE(t, e, r) {
  if (t instanceof ye.Name) {
    const n = e === Uo.Num;
    return r ? n ? (0, ye._)`"[" + ${t} + "]"` : (0, ye._)`"['" + ${t} + "']"` : n ? (0, ye._)`"/" + ${t}` : (0, ye._)`"/" + ${t}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return r ? (0, ye.getProperty)(t).toString() : "/" + nc(t);
}
M.getErrorPath = xE;
function Bf(t, e, r = t.opts.strictSchema) {
  if (r) {
    if (e = `strict mode: ${e}`, r === !0)
      throw new Error(e);
    t.self.logger.warn(e);
  }
}
M.checkStrictMode = Bf;
var Rt = {};
Object.defineProperty(Rt, "__esModule", { value: !0 });
const Me = ie, qE = {
  // validation function arguments
  data: new Me.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new Me.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new Me.Name("instancePath"),
  parentData: new Me.Name("parentData"),
  parentDataProperty: new Me.Name("parentDataProperty"),
  rootData: new Me.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new Me.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new Me.Name("vErrors"),
  // null or array of validation errors
  errors: new Me.Name("errors"),
  // counter of validation errors
  this: new Me.Name("this"),
  // "globals"
  self: new Me.Name("self"),
  scope: new Me.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new Me.Name("json"),
  jsonPos: new Me.Name("jsonPos"),
  jsonLen: new Me.Name("jsonLen"),
  jsonPart: new Me.Name("jsonPart")
};
Rt.default = qE;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.extendErrors = t.resetErrorsCount = t.reportExtraError = t.reportError = t.keyword$DataError = t.keywordError = void 0;
  const e = ie, r = M, n = Rt;
  t.keywordError = {
    message: ({ keyword: $ }) => (0, e.str)`must pass "${$}" keyword validation`
  }, t.keyword$DataError = {
    message: ({ keyword: $, schemaType: m }) => m ? (0, e.str)`"${$}" keyword must be ${m} ($data)` : (0, e.str)`"${$}" keyword is invalid ($data)`
  };
  function s($, m = t.keywordError, E, R) {
    const { it: N } = $, { gen: O, compositeRule: q, allErrors: Y } = N, $e = f($, m, E);
    R ?? (q || Y) ? c(O, $e) : u(N, (0, e._)`[${$e}]`);
  }
  t.reportError = s;
  function a($, m = t.keywordError, E) {
    const { it: R } = $, { gen: N, compositeRule: O, allErrors: q } = R, Y = f($, m, E);
    c(N, Y), O || q || u(R, n.default.vErrors);
  }
  t.reportExtraError = a;
  function o($, m) {
    $.assign(n.default.errors, m), $.if((0, e._)`${n.default.vErrors} !== null`, () => $.if(m, () => $.assign((0, e._)`${n.default.vErrors}.length`, m), () => $.assign(n.default.vErrors, null)));
  }
  t.resetErrorsCount = o;
  function i({ gen: $, keyword: m, schemaValue: E, data: R, errsCount: N, it: O }) {
    if (N === void 0)
      throw new Error("ajv implementation error");
    const q = $.name("err");
    $.forRange("i", N, n.default.errors, (Y) => {
      $.const(q, (0, e._)`${n.default.vErrors}[${Y}]`), $.if((0, e._)`${q}.instancePath === undefined`, () => $.assign((0, e._)`${q}.instancePath`, (0, e.strConcat)(n.default.instancePath, O.errorPath))), $.assign((0, e._)`${q}.schemaPath`, (0, e.str)`${O.errSchemaPath}/${m}`), O.opts.verbose && ($.assign((0, e._)`${q}.schema`, E), $.assign((0, e._)`${q}.data`, R));
    });
  }
  t.extendErrors = i;
  function c($, m) {
    const E = $.const("err", m);
    $.if((0, e._)`${n.default.vErrors} === null`, () => $.assign(n.default.vErrors, (0, e._)`[${E}]`), (0, e._)`${n.default.vErrors}.push(${E})`), $.code((0, e._)`${n.default.errors}++`);
  }
  function u($, m) {
    const { gen: E, validateName: R, schemaEnv: N } = $;
    N.$async ? E.throw((0, e._)`new ${$.ValidationError}(${m})`) : (E.assign((0, e._)`${R}.errors`, m), E.return(!1));
  }
  const l = {
    keyword: new e.Name("keyword"),
    schemaPath: new e.Name("schemaPath"),
    // also used in JTD errors
    params: new e.Name("params"),
    propertyName: new e.Name("propertyName"),
    message: new e.Name("message"),
    schema: new e.Name("schema"),
    parentSchema: new e.Name("parentSchema")
  };
  function f($, m, E) {
    const { createErrors: R } = $.it;
    return R === !1 ? (0, e._)`{}` : v($, m, E);
  }
  function v($, m, E = {}) {
    const { gen: R, it: N } = $, O = [
      g(N, E),
      y($, E)
    ];
    return w($, m, O), R.object(...O);
  }
  function g({ errorPath: $ }, { instancePath: m }) {
    const E = m ? (0, e.str)`${$}${(0, r.getErrorPath)(m, r.Type.Str)}` : $;
    return [n.default.instancePath, (0, e.strConcat)(n.default.instancePath, E)];
  }
  function y({ keyword: $, it: { errSchemaPath: m } }, { schemaPath: E, parentSchema: R }) {
    let N = R ? m : (0, e.str)`${m}/${$}`;
    return E && (N = (0, e.str)`${N}${(0, r.getErrorPath)(E, r.Type.Str)}`), [l.schemaPath, N];
  }
  function w($, { params: m, message: E }, R) {
    const { keyword: N, data: O, schemaValue: q, it: Y } = $, { opts: $e, propertyName: be, topSchemaRef: Re, schemaPath: G } = Y;
    R.push([l.keyword, N], [l.params, typeof m == "function" ? m($) : m || (0, e._)`{}`]), $e.messages && R.push([l.message, typeof E == "function" ? E($) : E]), $e.verbose && R.push([l.schema, q], [l.parentSchema, (0, e._)`${Re}${G}`], [n.default.data, O]), be && R.push([l.propertyName, be]);
  }
})(Ss);
Object.defineProperty(mn, "__esModule", { value: !0 });
mn.boolOrEmptySchema = mn.topBoolOrEmptySchema = void 0;
const KE = Ss, GE = ie, ZE = Rt, HE = {
  message: "boolean schema is false"
};
function BE(t) {
  const { gen: e, schema: r, validateName: n } = t;
  r === !1 ? Wf(t, !1) : typeof r == "object" && r.$async === !0 ? e.return(ZE.default.data) : (e.assign((0, GE._)`${n}.errors`, null), e.return(!0));
}
mn.topBoolOrEmptySchema = BE;
function WE(t, e) {
  const { gen: r, schema: n } = t;
  n === !1 ? (r.var(e, !1), Wf(t)) : r.var(e, !0);
}
mn.boolOrEmptySchema = WE;
function Wf(t, e) {
  const { gen: r, data: n } = t, s = {
    gen: r,
    keyword: "false schema",
    data: n,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: t
  };
  (0, KE.reportError)(s, HE, void 0, e);
}
var Oe = {}, Vr = {};
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.getRules = Vr.isJSONType = void 0;
const JE = ["string", "number", "integer", "boolean", "null", "object", "array"], XE = new Set(JE);
function YE(t) {
  return typeof t == "string" && XE.has(t);
}
Vr.isJSONType = YE;
function QE() {
  const t = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...t, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, t.number, t.string, t.array, t.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Vr.getRules = QE;
var Dt = {};
Object.defineProperty(Dt, "__esModule", { value: !0 });
Dt.shouldUseRule = Dt.shouldUseGroup = Dt.schemaHasRulesForType = void 0;
function eb({ schema: t, self: e }, r) {
  const n = e.RULES.types[r];
  return n && n !== !0 && Jf(t, n);
}
Dt.schemaHasRulesForType = eb;
function Jf(t, e) {
  return e.rules.some((r) => Xf(t, r));
}
Dt.shouldUseGroup = Jf;
function Xf(t, e) {
  var r;
  return t[e.keyword] !== void 0 || ((r = e.definition.implements) === null || r === void 0 ? void 0 : r.some((n) => t[n] !== void 0));
}
Dt.shouldUseRule = Xf;
Object.defineProperty(Oe, "__esModule", { value: !0 });
Oe.reportTypeError = Oe.checkDataTypes = Oe.checkDataType = Oe.coerceAndCheckDataType = Oe.getJSONTypes = Oe.getSchemaTypes = Oe.DataType = void 0;
const tb = Vr, rb = Dt, nb = Ss, se = ie, Yf = M;
var sn;
(function(t) {
  t[t.Correct = 0] = "Correct", t[t.Wrong = 1] = "Wrong";
})(sn || (Oe.DataType = sn = {}));
function sb(t) {
  const e = Qf(t.type);
  if (e.includes("null")) {
    if (t.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!e.length && t.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    t.nullable === !0 && e.push("null");
  }
  return e;
}
Oe.getSchemaTypes = sb;
function Qf(t) {
  const e = Array.isArray(t) ? t : t ? [t] : [];
  if (e.every(tb.isJSONType))
    return e;
  throw new Error("type must be JSONType or JSONType[]: " + e.join(","));
}
Oe.getJSONTypes = Qf;
function ab(t, e) {
  const { gen: r, data: n, opts: s } = t, a = ob(e, s.coerceTypes), o = e.length > 0 && !(a.length === 0 && e.length === 1 && (0, rb.schemaHasRulesForType)(t, e[0]));
  if (o) {
    const i = ac(e, n, s.strictNumbers, sn.Wrong);
    r.if(i, () => {
      a.length ? ib(t, e, a) : oc(t);
    });
  }
  return o;
}
Oe.coerceAndCheckDataType = ab;
const eh = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function ob(t, e) {
  return e ? t.filter((r) => eh.has(r) || e === "array" && r === "array") : [];
}
function ib(t, e, r) {
  const { gen: n, data: s, opts: a } = t, o = n.let("dataType", (0, se._)`typeof ${s}`), i = n.let("coerced", (0, se._)`undefined`);
  a.coerceTypes === "array" && n.if((0, se._)`${o} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => n.assign(s, (0, se._)`${s}[0]`).assign(o, (0, se._)`typeof ${s}`).if(ac(e, s, a.strictNumbers), () => n.assign(i, s))), n.if((0, se._)`${i} !== undefined`);
  for (const u of r)
    (eh.has(u) || u === "array" && a.coerceTypes === "array") && c(u);
  n.else(), oc(t), n.endIf(), n.if((0, se._)`${i} !== undefined`, () => {
    n.assign(s, i), cb(t, i);
  });
  function c(u) {
    switch (u) {
      case "string":
        n.elseIf((0, se._)`${o} == "number" || ${o} == "boolean"`).assign(i, (0, se._)`"" + ${s}`).elseIf((0, se._)`${s} === null`).assign(i, (0, se._)`""`);
        return;
      case "number":
        n.elseIf((0, se._)`${o} == "boolean" || ${s} === null
              || (${o} == "string" && ${s} && ${s} == +${s})`).assign(i, (0, se._)`+${s}`);
        return;
      case "integer":
        n.elseIf((0, se._)`${o} === "boolean" || ${s} === null
              || (${o} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(i, (0, se._)`+${s}`);
        return;
      case "boolean":
        n.elseIf((0, se._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(i, !1).elseIf((0, se._)`${s} === "true" || ${s} === 1`).assign(i, !0);
        return;
      case "null":
        n.elseIf((0, se._)`${s} === "" || ${s} === 0 || ${s} === false`), n.assign(i, null);
        return;
      case "array":
        n.elseIf((0, se._)`${o} === "string" || ${o} === "number"
              || ${o} === "boolean" || ${s} === null`).assign(i, (0, se._)`[${s}]`);
    }
  }
}
function cb({ gen: t, parentData: e, parentDataProperty: r }, n) {
  t.if((0, se._)`${e} !== undefined`, () => t.assign((0, se._)`${e}[${r}]`, n));
}
function xo(t, e, r, n = sn.Correct) {
  const s = n === sn.Correct ? se.operators.EQ : se.operators.NEQ;
  let a;
  switch (t) {
    case "null":
      return (0, se._)`${e} ${s} null`;
    case "array":
      a = (0, se._)`Array.isArray(${e})`;
      break;
    case "object":
      a = (0, se._)`${e} && typeof ${e} == "object" && !Array.isArray(${e})`;
      break;
    case "integer":
      a = o((0, se._)`!(${e} % 1) && !isNaN(${e})`);
      break;
    case "number":
      a = o();
      break;
    default:
      return (0, se._)`typeof ${e} ${s} ${t}`;
  }
  return n === sn.Correct ? a : (0, se.not)(a);
  function o(i = se.nil) {
    return (0, se.and)((0, se._)`typeof ${e} == "number"`, i, r ? (0, se._)`isFinite(${e})` : se.nil);
  }
}
Oe.checkDataType = xo;
function ac(t, e, r, n) {
  if (t.length === 1)
    return xo(t[0], e, r, n);
  let s;
  const a = (0, Yf.toHash)(t);
  if (a.array && a.object) {
    const o = (0, se._)`typeof ${e} != "object"`;
    s = a.null ? o : (0, se._)`!${e} || ${o}`, delete a.null, delete a.array, delete a.object;
  } else
    s = se.nil;
  a.number && delete a.integer;
  for (const o in a)
    s = (0, se.and)(s, xo(o, e, r, n));
  return s;
}
Oe.checkDataTypes = ac;
const ub = {
  message: ({ schema: t }) => `must be ${t}`,
  params: ({ schema: t, schemaValue: e }) => typeof t == "string" ? (0, se._)`{type: ${t}}` : (0, se._)`{type: ${e}}`
};
function oc(t) {
  const e = lb(t);
  (0, nb.reportError)(e, ub);
}
Oe.reportTypeError = oc;
function lb(t) {
  const { gen: e, data: r, schema: n } = t, s = (0, Yf.schemaRefOrVal)(t, n, "type");
  return {
    gen: e,
    keyword: "type",
    data: r,
    schema: n.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: n,
    params: {},
    it: t
  };
}
var Da = {};
Object.defineProperty(Da, "__esModule", { value: !0 });
Da.assignDefaults = void 0;
const Ur = ie, db = M;
function fb(t, e) {
  const { properties: r, items: n } = t.schema;
  if (e === "object" && r)
    for (const s in r)
      rl(t, s, r[s].default);
  else e === "array" && Array.isArray(n) && n.forEach((s, a) => rl(t, a, s.default));
}
Da.assignDefaults = fb;
function rl(t, e, r) {
  const { gen: n, compositeRule: s, data: a, opts: o } = t;
  if (r === void 0)
    return;
  const i = (0, Ur._)`${a}${(0, Ur.getProperty)(e)}`;
  if (s) {
    (0, db.checkStrictMode)(t, `default is ignored for: ${i}`);
    return;
  }
  let c = (0, Ur._)`${i} === undefined`;
  o.useDefaults === "empty" && (c = (0, Ur._)`${c} || ${i} === null || ${i} === ""`), n.if(c, (0, Ur._)`${i} = ${(0, Ur.stringify)(r)}`);
}
var Et = {}, ue = {};
Object.defineProperty(ue, "__esModule", { value: !0 });
ue.validateUnion = ue.validateArray = ue.usePattern = ue.callValidateCode = ue.schemaProperties = ue.allSchemaProperties = ue.noPropertyInData = ue.propertyInData = ue.isOwnProperty = ue.hasPropFunc = ue.reportMissingProp = ue.checkMissingProp = ue.checkReportMissingProp = void 0;
const _e = ie, ic = M, Gt = Rt, hb = M;
function mb(t, e) {
  const { gen: r, data: n, it: s } = t;
  r.if(uc(r, n, e, s.opts.ownProperties), () => {
    t.setParams({ missingProperty: (0, _e._)`${e}` }, !0), t.error();
  });
}
ue.checkReportMissingProp = mb;
function pb({ gen: t, data: e, it: { opts: r } }, n, s) {
  return (0, _e.or)(...n.map((a) => (0, _e.and)(uc(t, e, a, r.ownProperties), (0, _e._)`${s} = ${a}`)));
}
ue.checkMissingProp = pb;
function yb(t, e) {
  t.setParams({ missingProperty: e }, !0), t.error();
}
ue.reportMissingProp = yb;
function th(t) {
  return t.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, _e._)`Object.prototype.hasOwnProperty`
  });
}
ue.hasPropFunc = th;
function cc(t, e, r) {
  return (0, _e._)`${th(t)}.call(${e}, ${r})`;
}
ue.isOwnProperty = cc;
function $b(t, e, r, n) {
  const s = (0, _e._)`${e}${(0, _e.getProperty)(r)} !== undefined`;
  return n ? (0, _e._)`${s} && ${cc(t, e, r)}` : s;
}
ue.propertyInData = $b;
function uc(t, e, r, n) {
  const s = (0, _e._)`${e}${(0, _e.getProperty)(r)} === undefined`;
  return n ? (0, _e.or)(s, (0, _e.not)(cc(t, e, r))) : s;
}
ue.noPropertyInData = uc;
function rh(t) {
  return t ? Object.keys(t).filter((e) => e !== "__proto__") : [];
}
ue.allSchemaProperties = rh;
function gb(t, e) {
  return rh(e).filter((r) => !(0, ic.alwaysValidSchema)(t, e[r]));
}
ue.schemaProperties = gb;
function _b({ schemaCode: t, data: e, it: { gen: r, topSchemaRef: n, schemaPath: s, errorPath: a }, it: o }, i, c, u) {
  const l = u ? (0, _e._)`${t}, ${e}, ${n}${s}` : e, f = [
    [Gt.default.instancePath, (0, _e.strConcat)(Gt.default.instancePath, a)],
    [Gt.default.parentData, o.parentData],
    [Gt.default.parentDataProperty, o.parentDataProperty],
    [Gt.default.rootData, Gt.default.rootData]
  ];
  o.opts.dynamicRef && f.push([Gt.default.dynamicAnchors, Gt.default.dynamicAnchors]);
  const v = (0, _e._)`${l}, ${r.object(...f)}`;
  return c !== _e.nil ? (0, _e._)`${i}.call(${c}, ${v})` : (0, _e._)`${i}(${v})`;
}
ue.callValidateCode = _b;
const vb = (0, _e._)`new RegExp`;
function wb({ gen: t, it: { opts: e } }, r) {
  const n = e.unicodeRegExp ? "u" : "", { regExp: s } = e.code, a = s(r, n);
  return t.scopeValue("pattern", {
    key: a.toString(),
    ref: a,
    code: (0, _e._)`${s.code === "new RegExp" ? vb : (0, hb.useFunc)(t, s)}(${r}, ${n})`
  });
}
ue.usePattern = wb;
function Eb(t) {
  const { gen: e, data: r, keyword: n, it: s } = t, a = e.name("valid");
  if (s.allErrors) {
    const i = e.let("valid", !0);
    return o(() => e.assign(i, !1)), i;
  }
  return e.var(a, !0), o(() => e.break()), a;
  function o(i) {
    const c = e.const("len", (0, _e._)`${r}.length`);
    e.forRange("i", 0, c, (u) => {
      t.subschema({
        keyword: n,
        dataProp: u,
        dataPropType: ic.Type.Num
      }, a), e.if((0, _e.not)(a), i);
    });
  }
}
ue.validateArray = Eb;
function bb(t) {
  const { gen: e, schema: r, keyword: n, it: s } = t;
  if (!Array.isArray(r))
    throw new Error("ajv implementation error");
  if (r.some((c) => (0, ic.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const o = e.let("valid", !1), i = e.name("_valid");
  e.block(() => r.forEach((c, u) => {
    const l = t.subschema({
      keyword: n,
      schemaProp: u,
      compositeRule: !0
    }, i);
    e.assign(o, (0, _e._)`${o} || ${i}`), t.mergeValidEvaluated(l, i) || e.if((0, _e.not)(o));
  })), t.result(o, () => t.reset(), () => t.error(!0));
}
ue.validateUnion = bb;
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.validateKeywordUsage = Et.validSchemaType = Et.funcKeywordCode = Et.macroKeywordCode = void 0;
const Ue = ie, Or = Rt, Sb = ue, Pb = Ss;
function Rb(t, e) {
  const { gen: r, keyword: n, schema: s, parentSchema: a, it: o } = t, i = e.macro.call(o.self, s, a, o), c = nh(r, n, i);
  o.opts.validateSchema !== !1 && o.self.validateSchema(i, !0);
  const u = r.name("valid");
  t.subschema({
    schema: i,
    schemaPath: Ue.nil,
    errSchemaPath: `${o.errSchemaPath}/${n}`,
    topSchemaRef: c,
    compositeRule: !0
  }, u), t.pass(u, () => t.error(!0));
}
Et.macroKeywordCode = Rb;
function Nb(t, e) {
  var r;
  const { gen: n, keyword: s, schema: a, parentSchema: o, $data: i, it: c } = t;
  Tb(c, e);
  const u = !i && e.compile ? e.compile.call(c.self, a, o, c) : e.validate, l = nh(n, s, u), f = n.let("valid");
  t.block$data(f, v), t.ok((r = e.valid) !== null && r !== void 0 ? r : f);
  function v() {
    if (e.errors === !1)
      w(), e.modifying && nl(t), $(() => t.error());
    else {
      const m = e.async ? g() : y();
      e.modifying && nl(t), $(() => Ob(t, m));
    }
  }
  function g() {
    const m = n.let("ruleErrs", null);
    return n.try(() => w((0, Ue._)`await `), (E) => n.assign(f, !1).if((0, Ue._)`${E} instanceof ${c.ValidationError}`, () => n.assign(m, (0, Ue._)`${E}.errors`), () => n.throw(E))), m;
  }
  function y() {
    const m = (0, Ue._)`${l}.errors`;
    return n.assign(m, null), w(Ue.nil), m;
  }
  function w(m = e.async ? (0, Ue._)`await ` : Ue.nil) {
    const E = c.opts.passContext ? Or.default.this : Or.default.self, R = !("compile" in e && !i || e.schema === !1);
    n.assign(f, (0, Ue._)`${m}${(0, Sb.callValidateCode)(t, l, E, R)}`, e.modifying);
  }
  function $(m) {
    var E;
    n.if((0, Ue.not)((E = e.valid) !== null && E !== void 0 ? E : f), m);
  }
}
Et.funcKeywordCode = Nb;
function nl(t) {
  const { gen: e, data: r, it: n } = t;
  e.if(n.parentData, () => e.assign(r, (0, Ue._)`${n.parentData}[${n.parentDataProperty}]`));
}
function Ob(t, e) {
  const { gen: r } = t;
  r.if((0, Ue._)`Array.isArray(${e})`, () => {
    r.assign(Or.default.vErrors, (0, Ue._)`${Or.default.vErrors} === null ? ${e} : ${Or.default.vErrors}.concat(${e})`).assign(Or.default.errors, (0, Ue._)`${Or.default.vErrors}.length`), (0, Pb.extendErrors)(t);
  }, () => t.error());
}
function Tb({ schemaEnv: t }, e) {
  if (e.async && !t.$async)
    throw new Error("async keyword in sync schema");
}
function nh(t, e, r) {
  if (r === void 0)
    throw new Error(`keyword "${e}" failed to compile`);
  return t.scopeValue("keyword", typeof r == "function" ? { ref: r } : { ref: r, code: (0, Ue.stringify)(r) });
}
function kb(t, e, r = !1) {
  return !e.length || e.some((n) => n === "array" ? Array.isArray(t) : n === "object" ? t && typeof t == "object" && !Array.isArray(t) : typeof t == n || r && typeof t > "u");
}
Et.validSchemaType = kb;
function Ib({ schema: t, opts: e, self: r, errSchemaPath: n }, s, a) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(a) : s.keyword !== a)
    throw new Error("ajv implementation error");
  const o = s.dependencies;
  if (o != null && o.some((i) => !Object.prototype.hasOwnProperty.call(t, i)))
    throw new Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
  if (s.validateSchema && !s.validateSchema(t[a])) {
    const c = `keyword "${a}" value is invalid at path "${n}": ` + r.errorsText(s.validateSchema.errors);
    if (e.validateSchema === "log")
      r.logger.error(c);
    else
      throw new Error(c);
  }
}
Et.validateKeywordUsage = Ib;
var tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.extendSubschemaMode = tr.extendSubschemaData = tr.getSubschema = void 0;
const _t = ie, sh = M;
function Cb(t, { keyword: e, schemaProp: r, schema: n, schemaPath: s, errSchemaPath: a, topSchemaRef: o }) {
  if (e !== void 0 && n !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (e !== void 0) {
    const i = t.schema[e];
    return r === void 0 ? {
      schema: i,
      schemaPath: (0, _t._)`${t.schemaPath}${(0, _t.getProperty)(e)}`,
      errSchemaPath: `${t.errSchemaPath}/${e}`
    } : {
      schema: i[r],
      schemaPath: (0, _t._)`${t.schemaPath}${(0, _t.getProperty)(e)}${(0, _t.getProperty)(r)}`,
      errSchemaPath: `${t.errSchemaPath}/${e}/${(0, sh.escapeFragment)(r)}`
    };
  }
  if (n !== void 0) {
    if (s === void 0 || a === void 0 || o === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: n,
      schemaPath: s,
      topSchemaRef: o,
      errSchemaPath: a
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
tr.getSubschema = Cb;
function jb(t, e, { dataProp: r, dataPropType: n, data: s, dataTypes: a, propertyName: o }) {
  if (s !== void 0 && r !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: i } = e;
  if (r !== void 0) {
    const { errorPath: u, dataPathArr: l, opts: f } = e, v = i.let("data", (0, _t._)`${e.data}${(0, _t.getProperty)(r)}`, !0);
    c(v), t.errorPath = (0, _t.str)`${u}${(0, sh.getErrorPath)(r, n, f.jsPropertySyntax)}`, t.parentDataProperty = (0, _t._)`${r}`, t.dataPathArr = [...l, t.parentDataProperty];
  }
  if (s !== void 0) {
    const u = s instanceof _t.Name ? s : i.let("data", s, !0);
    c(u), o !== void 0 && (t.propertyName = o);
  }
  a && (t.dataTypes = a);
  function c(u) {
    t.data = u, t.dataLevel = e.dataLevel + 1, t.dataTypes = [], e.definedProperties = /* @__PURE__ */ new Set(), t.parentData = e.data, t.dataNames = [...e.dataNames, u];
  }
}
tr.extendSubschemaData = jb;
function Ab(t, { jtdDiscriminator: e, jtdMetadata: r, compositeRule: n, createErrors: s, allErrors: a }) {
  n !== void 0 && (t.compositeRule = n), s !== void 0 && (t.createErrors = s), a !== void 0 && (t.allErrors = a), t.jtdDiscriminator = e, t.jtdMetadata = r;
}
tr.extendSubschemaMode = Ab;
var je = {}, ah = { exports: {} }, Yt = ah.exports = function(t, e, r) {
  typeof e == "function" && (r = e, e = {}), r = e.cb || r;
  var n = typeof r == "function" ? r : r.pre || function() {
  }, s = r.post || function() {
  };
  Xs(e, n, s, t, "", t);
};
Yt.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
Yt.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
Yt.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
Yt.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Xs(t, e, r, n, s, a, o, i, c, u) {
  if (n && typeof n == "object" && !Array.isArray(n)) {
    e(n, s, a, o, i, c, u);
    for (var l in n) {
      var f = n[l];
      if (Array.isArray(f)) {
        if (l in Yt.arrayKeywords)
          for (var v = 0; v < f.length; v++)
            Xs(t, e, r, f[v], s + "/" + l + "/" + v, a, s, l, n, v);
      } else if (l in Yt.propsKeywords) {
        if (f && typeof f == "object")
          for (var g in f)
            Xs(t, e, r, f[g], s + "/" + l + "/" + Db(g), a, s, l, n, g);
      } else (l in Yt.keywords || t.allKeys && !(l in Yt.skipKeywords)) && Xs(t, e, r, f, s + "/" + l, a, s, l, n);
    }
    r(n, s, a, o, i, c, u);
  }
}
function Db(t) {
  return t.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Mb = ah.exports;
Object.defineProperty(je, "__esModule", { value: !0 });
je.getSchemaRefs = je.resolveUrl = je.normalizeId = je._getFullPath = je.getFullPath = je.inlineRef = void 0;
const Vb = M, Lb = Oa, Fb = Mb, zb = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function Ub(t, e = !0) {
  return typeof t == "boolean" ? !0 : e === !0 ? !qo(t) : e ? oh(t) <= e : !1;
}
je.inlineRef = Ub;
const xb = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function qo(t) {
  for (const e in t) {
    if (xb.has(e))
      return !0;
    const r = t[e];
    if (Array.isArray(r) && r.some(qo) || typeof r == "object" && qo(r))
      return !0;
  }
  return !1;
}
function oh(t) {
  let e = 0;
  for (const r in t) {
    if (r === "$ref")
      return 1 / 0;
    if (e++, !zb.has(r) && (typeof t[r] == "object" && (0, Vb.eachItem)(t[r], (n) => e += oh(n)), e === 1 / 0))
      return 1 / 0;
  }
  return e;
}
function ih(t, e = "", r) {
  r !== !1 && (e = an(e));
  const n = t.parse(e);
  return ch(t, n);
}
je.getFullPath = ih;
function ch(t, e) {
  return t.serialize(e).split("#")[0] + "#";
}
je._getFullPath = ch;
const qb = /#\/?$/;
function an(t) {
  return t ? t.replace(qb, "") : "";
}
je.normalizeId = an;
function Kb(t, e, r) {
  return r = an(r), t.resolve(e, r);
}
je.resolveUrl = Kb;
const Gb = /^[a-z_][-a-z0-9._]*$/i;
function Zb(t, e) {
  if (typeof t == "boolean")
    return {};
  const { schemaId: r, uriResolver: n } = this.opts, s = an(t[r] || e), a = { "": s }, o = ih(n, s, !1), i = {}, c = /* @__PURE__ */ new Set();
  return Fb(t, { allKeys: !0 }, (f, v, g, y) => {
    if (y === void 0)
      return;
    const w = o + v;
    let $ = a[y];
    typeof f[r] == "string" && ($ = m.call(this, f[r])), E.call(this, f.$anchor), E.call(this, f.$dynamicAnchor), a[v] = $;
    function m(R) {
      const N = this.opts.uriResolver.resolve;
      if (R = an($ ? N($, R) : R), c.has(R))
        throw l(R);
      c.add(R);
      let O = this.refs[R];
      return typeof O == "string" && (O = this.refs[O]), typeof O == "object" ? u(f, O.schema, R) : R !== an(w) && (R[0] === "#" ? (u(f, i[R], R), i[R] = f) : this.refs[R] = w), R;
    }
    function E(R) {
      if (typeof R == "string") {
        if (!Gb.test(R))
          throw new Error(`invalid anchor "${R}"`);
        m.call(this, `#${R}`);
      }
    }
  }), i;
  function u(f, v, g) {
    if (v !== void 0 && !Lb(f, v))
      throw l(g);
  }
  function l(f) {
    return new Error(`reference "${f}" resolves to more than one schema`);
  }
}
je.getSchemaRefs = Zb;
Object.defineProperty(dt, "__esModule", { value: !0 });
dt.getData = dt.KeywordCxt = dt.validateFunctionCode = void 0;
const uh = mn, sl = Oe, lc = Dt, ga = Oe, Hb = Da, Xn = Et, so = tr, H = ie, ee = Rt, Bb = je, Mt = M, jn = Ss;
function Wb(t) {
  if (fh(t) && (hh(t), dh(t))) {
    Yb(t);
    return;
  }
  lh(t, () => (0, uh.topBoolOrEmptySchema)(t));
}
dt.validateFunctionCode = Wb;
function lh({ gen: t, validateName: e, schema: r, schemaEnv: n, opts: s }, a) {
  s.code.es5 ? t.func(e, (0, H._)`${ee.default.data}, ${ee.default.valCxt}`, n.$async, () => {
    t.code((0, H._)`"use strict"; ${al(r, s)}`), Xb(t, s), t.code(a);
  }) : t.func(e, (0, H._)`${ee.default.data}, ${Jb(s)}`, n.$async, () => t.code(al(r, s)).code(a));
}
function Jb(t) {
  return (0, H._)`{${ee.default.instancePath}="", ${ee.default.parentData}, ${ee.default.parentDataProperty}, ${ee.default.rootData}=${ee.default.data}${t.dynamicRef ? (0, H._)`, ${ee.default.dynamicAnchors}={}` : H.nil}}={}`;
}
function Xb(t, e) {
  t.if(ee.default.valCxt, () => {
    t.var(ee.default.instancePath, (0, H._)`${ee.default.valCxt}.${ee.default.instancePath}`), t.var(ee.default.parentData, (0, H._)`${ee.default.valCxt}.${ee.default.parentData}`), t.var(ee.default.parentDataProperty, (0, H._)`${ee.default.valCxt}.${ee.default.parentDataProperty}`), t.var(ee.default.rootData, (0, H._)`${ee.default.valCxt}.${ee.default.rootData}`), e.dynamicRef && t.var(ee.default.dynamicAnchors, (0, H._)`${ee.default.valCxt}.${ee.default.dynamicAnchors}`);
  }, () => {
    t.var(ee.default.instancePath, (0, H._)`""`), t.var(ee.default.parentData, (0, H._)`undefined`), t.var(ee.default.parentDataProperty, (0, H._)`undefined`), t.var(ee.default.rootData, ee.default.data), e.dynamicRef && t.var(ee.default.dynamicAnchors, (0, H._)`{}`);
  });
}
function Yb(t) {
  const { schema: e, opts: r, gen: n } = t;
  lh(t, () => {
    r.$comment && e.$comment && ph(t), nS(t), n.let(ee.default.vErrors, null), n.let(ee.default.errors, 0), r.unevaluated && Qb(t), mh(t), oS(t);
  });
}
function Qb(t) {
  const { gen: e, validateName: r } = t;
  t.evaluated = e.const("evaluated", (0, H._)`${r}.evaluated`), e.if((0, H._)`${t.evaluated}.dynamicProps`, () => e.assign((0, H._)`${t.evaluated}.props`, (0, H._)`undefined`)), e.if((0, H._)`${t.evaluated}.dynamicItems`, () => e.assign((0, H._)`${t.evaluated}.items`, (0, H._)`undefined`));
}
function al(t, e) {
  const r = typeof t == "object" && t[e.schemaId];
  return r && (e.code.source || e.code.process) ? (0, H._)`/*# sourceURL=${r} */` : H.nil;
}
function eS(t, e) {
  if (fh(t) && (hh(t), dh(t))) {
    tS(t, e);
    return;
  }
  (0, uh.boolOrEmptySchema)(t, e);
}
function dh({ schema: t, self: e }) {
  if (typeof t == "boolean")
    return !t;
  for (const r in t)
    if (e.RULES.all[r])
      return !0;
  return !1;
}
function fh(t) {
  return typeof t.schema != "boolean";
}
function tS(t, e) {
  const { schema: r, gen: n, opts: s } = t;
  s.$comment && r.$comment && ph(t), sS(t), aS(t);
  const a = n.const("_errs", ee.default.errors);
  mh(t, a), n.var(e, (0, H._)`${a} === ${ee.default.errors}`);
}
function hh(t) {
  (0, Mt.checkUnknownRules)(t), rS(t);
}
function mh(t, e) {
  if (t.opts.jtd)
    return ol(t, [], !1, e);
  const r = (0, sl.getSchemaTypes)(t.schema), n = (0, sl.coerceAndCheckDataType)(t, r);
  ol(t, r, !n, e);
}
function rS(t) {
  const { schema: e, errSchemaPath: r, opts: n, self: s } = t;
  e.$ref && n.ignoreKeywordsWithRef && (0, Mt.schemaHasRulesButRef)(e, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${r}"`);
}
function nS(t) {
  const { schema: e, opts: r } = t;
  e.default !== void 0 && r.useDefaults && r.strictSchema && (0, Mt.checkStrictMode)(t, "default is ignored in the schema root");
}
function sS(t) {
  const e = t.schema[t.opts.schemaId];
  e && (t.baseId = (0, Bb.resolveUrl)(t.opts.uriResolver, t.baseId, e));
}
function aS(t) {
  if (t.schema.$async && !t.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function ph({ gen: t, schemaEnv: e, schema: r, errSchemaPath: n, opts: s }) {
  const a = r.$comment;
  if (s.$comment === !0)
    t.code((0, H._)`${ee.default.self}.logger.log(${a})`);
  else if (typeof s.$comment == "function") {
    const o = (0, H.str)`${n}/$comment`, i = t.scopeValue("root", { ref: e.root });
    t.code((0, H._)`${ee.default.self}.opts.$comment(${a}, ${o}, ${i}.schema)`);
  }
}
function oS(t) {
  const { gen: e, schemaEnv: r, validateName: n, ValidationError: s, opts: a } = t;
  r.$async ? e.if((0, H._)`${ee.default.errors} === 0`, () => e.return(ee.default.data), () => e.throw((0, H._)`new ${s}(${ee.default.vErrors})`)) : (e.assign((0, H._)`${n}.errors`, ee.default.vErrors), a.unevaluated && iS(t), e.return((0, H._)`${ee.default.errors} === 0`));
}
function iS({ gen: t, evaluated: e, props: r, items: n }) {
  r instanceof H.Name && t.assign((0, H._)`${e}.props`, r), n instanceof H.Name && t.assign((0, H._)`${e}.items`, n);
}
function ol(t, e, r, n) {
  const { gen: s, schema: a, data: o, allErrors: i, opts: c, self: u } = t, { RULES: l } = u;
  if (a.$ref && (c.ignoreKeywordsWithRef || !(0, Mt.schemaHasRulesButRef)(a, l))) {
    s.block(() => gh(t, "$ref", l.all.$ref.definition));
    return;
  }
  c.jtd || cS(t, e), s.block(() => {
    for (const v of l.rules)
      f(v);
    f(l.post);
  });
  function f(v) {
    (0, lc.shouldUseGroup)(a, v) && (v.type ? (s.if((0, ga.checkDataType)(v.type, o, c.strictNumbers)), il(t, v), e.length === 1 && e[0] === v.type && r && (s.else(), (0, ga.reportTypeError)(t)), s.endIf()) : il(t, v), i || s.if((0, H._)`${ee.default.errors} === ${n || 0}`));
  }
}
function il(t, e) {
  const { gen: r, schema: n, opts: { useDefaults: s } } = t;
  s && (0, Hb.assignDefaults)(t, e.type), r.block(() => {
    for (const a of e.rules)
      (0, lc.shouldUseRule)(n, a) && gh(t, a.keyword, a.definition, e.type);
  });
}
function cS(t, e) {
  t.schemaEnv.meta || !t.opts.strictTypes || (uS(t, e), t.opts.allowUnionTypes || lS(t, e), dS(t, t.dataTypes));
}
function uS(t, e) {
  if (e.length) {
    if (!t.dataTypes.length) {
      t.dataTypes = e;
      return;
    }
    e.forEach((r) => {
      yh(t.dataTypes, r) || dc(t, `type "${r}" not allowed by context "${t.dataTypes.join(",")}"`);
    }), hS(t, e);
  }
}
function lS(t, e) {
  e.length > 1 && !(e.length === 2 && e.includes("null")) && dc(t, "use allowUnionTypes to allow union type keyword");
}
function dS(t, e) {
  const r = t.self.RULES.all;
  for (const n in r) {
    const s = r[n];
    if (typeof s == "object" && (0, lc.shouldUseRule)(t.schema, s)) {
      const { type: a } = s.definition;
      a.length && !a.some((o) => fS(e, o)) && dc(t, `missing type "${a.join(",")}" for keyword "${n}"`);
    }
  }
}
function fS(t, e) {
  return t.includes(e) || e === "number" && t.includes("integer");
}
function yh(t, e) {
  return t.includes(e) || e === "integer" && t.includes("number");
}
function hS(t, e) {
  const r = [];
  for (const n of t.dataTypes)
    yh(e, n) ? r.push(n) : e.includes("integer") && n === "number" && r.push("integer");
  t.dataTypes = r;
}
function dc(t, e) {
  const r = t.schemaEnv.baseId + t.errSchemaPath;
  e += ` at "${r}" (strictTypes)`, (0, Mt.checkStrictMode)(t, e, t.opts.strictTypes);
}
class $h {
  constructor(e, r, n) {
    if ((0, Xn.validateKeywordUsage)(e, r, n), this.gen = e.gen, this.allErrors = e.allErrors, this.keyword = n, this.data = e.data, this.schema = e.schema[n], this.$data = r.$data && e.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, Mt.schemaRefOrVal)(e, this.schema, n, this.$data), this.schemaType = r.schemaType, this.parentSchema = e.schema, this.params = {}, this.it = e, this.def = r, this.$data)
      this.schemaCode = e.gen.const("vSchema", _h(this.$data, e));
    else if (this.schemaCode = this.schemaValue, !(0, Xn.validSchemaType)(this.schema, r.schemaType, r.allowUndefined))
      throw new Error(`${n} value must be ${JSON.stringify(r.schemaType)}`);
    ("code" in r ? r.trackErrors : r.errors !== !1) && (this.errsCount = e.gen.const("_errs", ee.default.errors));
  }
  result(e, r, n) {
    this.failResult((0, H.not)(e), r, n);
  }
  failResult(e, r, n) {
    this.gen.if(e), n ? n() : this.error(), r ? (this.gen.else(), r(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(e, r) {
    this.failResult((0, H.not)(e), void 0, r);
  }
  fail(e) {
    if (e === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(e), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(e) {
    if (!this.$data)
      return this.fail(e);
    const { schemaCode: r } = this;
    this.fail((0, H._)`${r} !== undefined && (${(0, H.or)(this.invalid$data(), e)})`);
  }
  error(e, r, n) {
    if (r) {
      this.setParams(r), this._error(e, n), this.setParams({});
      return;
    }
    this._error(e, n);
  }
  _error(e, r) {
    (e ? jn.reportExtraError : jn.reportError)(this, this.def.error, r);
  }
  $dataError() {
    (0, jn.reportError)(this, this.def.$dataError || jn.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, jn.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(e) {
    this.allErrors || this.gen.if(e);
  }
  setParams(e, r) {
    r ? Object.assign(this.params, e) : this.params = e;
  }
  block$data(e, r, n = H.nil) {
    this.gen.block(() => {
      this.check$data(e, n), r();
    });
  }
  check$data(e = H.nil, r = H.nil) {
    if (!this.$data)
      return;
    const { gen: n, schemaCode: s, schemaType: a, def: o } = this;
    n.if((0, H.or)((0, H._)`${s} === undefined`, r)), e !== H.nil && n.assign(e, !0), (a.length || o.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), e !== H.nil && n.assign(e, !1)), n.else();
  }
  invalid$data() {
    const { gen: e, schemaCode: r, schemaType: n, def: s, it: a } = this;
    return (0, H.or)(o(), i());
    function o() {
      if (n.length) {
        if (!(r instanceof H.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(n) ? n : [n];
        return (0, H._)`${(0, ga.checkDataTypes)(c, r, a.opts.strictNumbers, ga.DataType.Wrong)}`;
      }
      return H.nil;
    }
    function i() {
      if (s.validateSchema) {
        const c = e.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, H._)`!${c}(${r})`;
      }
      return H.nil;
    }
  }
  subschema(e, r) {
    const n = (0, so.getSubschema)(this.it, e);
    (0, so.extendSubschemaData)(n, this.it, e), (0, so.extendSubschemaMode)(n, e);
    const s = { ...this.it, ...n, items: void 0, props: void 0 };
    return eS(s, r), s;
  }
  mergeEvaluated(e, r) {
    const { it: n, gen: s } = this;
    n.opts.unevaluated && (n.props !== !0 && e.props !== void 0 && (n.props = Mt.mergeEvaluated.props(s, e.props, n.props, r)), n.items !== !0 && e.items !== void 0 && (n.items = Mt.mergeEvaluated.items(s, e.items, n.items, r)));
  }
  mergeValidEvaluated(e, r) {
    const { it: n, gen: s } = this;
    if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0))
      return s.if(r, () => this.mergeEvaluated(e, H.Name)), !0;
  }
}
dt.KeywordCxt = $h;
function gh(t, e, r, n) {
  const s = new $h(t, r, e);
  "code" in r ? r.code(s, n) : s.$data && r.validate ? (0, Xn.funcKeywordCode)(s, r) : "macro" in r ? (0, Xn.macroKeywordCode)(s, r) : (r.compile || r.validate) && (0, Xn.funcKeywordCode)(s, r);
}
const mS = /^\/(?:[^~]|~0|~1)*$/, pS = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function _h(t, { dataLevel: e, dataNames: r, dataPathArr: n }) {
  let s, a;
  if (t === "")
    return ee.default.rootData;
  if (t[0] === "/") {
    if (!mS.test(t))
      throw new Error(`Invalid JSON-pointer: ${t}`);
    s = t, a = ee.default.rootData;
  } else {
    const u = pS.exec(t);
    if (!u)
      throw new Error(`Invalid JSON-pointer: ${t}`);
    const l = +u[1];
    if (s = u[2], s === "#") {
      if (l >= e)
        throw new Error(c("property/index", l));
      return n[e - l];
    }
    if (l > e)
      throw new Error(c("data", l));
    if (a = r[e - l], !s)
      return a;
  }
  let o = a;
  const i = s.split("/");
  for (const u of i)
    u && (a = (0, H._)`${a}${(0, H.getProperty)((0, Mt.unescapeJsonPointer)(u))}`, o = (0, H._)`${o} && ${a}`);
  return o;
  function c(u, l) {
    return `Cannot access ${u} ${l} levels up, current level is ${e}`;
  }
}
dt.getData = _h;
var Ps = {};
Object.defineProperty(Ps, "__esModule", { value: !0 });
class yS extends Error {
  constructor(e) {
    super("validation failed"), this.errors = e, this.ajv = this.validation = !0;
  }
}
Ps.default = yS;
var wn = {};
Object.defineProperty(wn, "__esModule", { value: !0 });
const ao = je;
class $S extends Error {
  constructor(e, r, n, s) {
    super(s || `can't resolve reference ${n} from id ${r}`), this.missingRef = (0, ao.resolveUrl)(e, r, n), this.missingSchema = (0, ao.normalizeId)((0, ao.getFullPath)(e, this.missingRef));
  }
}
wn.default = $S;
var He = {};
Object.defineProperty(He, "__esModule", { value: !0 });
He.resolveSchema = He.getCompilingSchema = He.resolveRef = He.compileSchema = He.SchemaEnv = void 0;
const nt = ie, gS = Ps, br = Rt, it = je, cl = M, _S = dt;
class Ma {
  constructor(e) {
    var r;
    this.refs = {}, this.dynamicAnchors = {};
    let n;
    typeof e.schema == "object" && (n = e.schema), this.schema = e.schema, this.schemaId = e.schemaId, this.root = e.root || this, this.baseId = (r = e.baseId) !== null && r !== void 0 ? r : (0, it.normalizeId)(n == null ? void 0 : n[e.schemaId || "$id"]), this.schemaPath = e.schemaPath, this.localRefs = e.localRefs, this.meta = e.meta, this.$async = n == null ? void 0 : n.$async, this.refs = {};
  }
}
He.SchemaEnv = Ma;
function fc(t) {
  const e = vh.call(this, t);
  if (e)
    return e;
  const r = (0, it.getFullPath)(this.opts.uriResolver, t.root.baseId), { es5: n, lines: s } = this.opts.code, { ownProperties: a } = this.opts, o = new nt.CodeGen(this.scope, { es5: n, lines: s, ownProperties: a });
  let i;
  t.$async && (i = o.scopeValue("Error", {
    ref: gS.default,
    code: (0, nt._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = o.scopeName("validate");
  t.validateName = c;
  const u = {
    gen: o,
    allErrors: this.opts.allErrors,
    data: br.default.data,
    parentData: br.default.parentData,
    parentDataProperty: br.default.parentDataProperty,
    dataNames: [br.default.data],
    dataPathArr: [nt.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: o.scopeValue("schema", this.opts.code.source === !0 ? { ref: t.schema, code: (0, nt.stringify)(t.schema) } : { ref: t.schema }),
    validateName: c,
    ValidationError: i,
    schema: t.schema,
    schemaEnv: t,
    rootId: r,
    baseId: t.baseId || r,
    schemaPath: nt.nil,
    errSchemaPath: t.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, nt._)`""`,
    opts: this.opts,
    self: this
  };
  let l;
  try {
    this._compilations.add(t), (0, _S.validateFunctionCode)(u), o.optimize(this.opts.code.optimize);
    const f = o.toString();
    l = `${o.scopeRefs(br.default.scope)}return ${f}`, this.opts.code.process && (l = this.opts.code.process(l, t));
    const g = new Function(`${br.default.self}`, `${br.default.scope}`, l)(this, this.scope.get());
    if (this.scope.value(c, { ref: g }), g.errors = null, g.schema = t.schema, g.schemaEnv = t, t.$async && (g.$async = !0), this.opts.code.source === !0 && (g.source = { validateName: c, validateCode: f, scopeValues: o._values }), this.opts.unevaluated) {
      const { props: y, items: w } = u;
      g.evaluated = {
        props: y instanceof nt.Name ? void 0 : y,
        items: w instanceof nt.Name ? void 0 : w,
        dynamicProps: y instanceof nt.Name,
        dynamicItems: w instanceof nt.Name
      }, g.source && (g.source.evaluated = (0, nt.stringify)(g.evaluated));
    }
    return t.validate = g, t;
  } catch (f) {
    throw delete t.validate, delete t.validateName, l && this.logger.error("Error compiling schema, function code:", l), f;
  } finally {
    this._compilations.delete(t);
  }
}
He.compileSchema = fc;
function vS(t, e, r) {
  var n;
  r = (0, it.resolveUrl)(this.opts.uriResolver, e, r);
  const s = t.refs[r];
  if (s)
    return s;
  let a = bS.call(this, t, r);
  if (a === void 0) {
    const o = (n = t.localRefs) === null || n === void 0 ? void 0 : n[r], { schemaId: i } = this.opts;
    o && (a = new Ma({ schema: o, schemaId: i, root: t, baseId: e }));
  }
  if (a !== void 0)
    return t.refs[r] = wS.call(this, a);
}
He.resolveRef = vS;
function wS(t) {
  return (0, it.inlineRef)(t.schema, this.opts.inlineRefs) ? t.schema : t.validate ? t : fc.call(this, t);
}
function vh(t) {
  for (const e of this._compilations)
    if (ES(e, t))
      return e;
}
He.getCompilingSchema = vh;
function ES(t, e) {
  return t.schema === e.schema && t.root === e.root && t.baseId === e.baseId;
}
function bS(t, e) {
  let r;
  for (; typeof (r = this.refs[e]) == "string"; )
    e = r;
  return r || this.schemas[e] || Va.call(this, t, e);
}
function Va(t, e) {
  const r = this.opts.uriResolver.parse(e), n = (0, it._getFullPath)(this.opts.uriResolver, r);
  let s = (0, it.getFullPath)(this.opts.uriResolver, t.baseId, void 0);
  if (Object.keys(t.schema).length > 0 && n === s)
    return oo.call(this, r, t);
  const a = (0, it.normalizeId)(n), o = this.refs[a] || this.schemas[a];
  if (typeof o == "string") {
    const i = Va.call(this, t, o);
    return typeof (i == null ? void 0 : i.schema) != "object" ? void 0 : oo.call(this, r, i);
  }
  if (typeof (o == null ? void 0 : o.schema) == "object") {
    if (o.validate || fc.call(this, o), a === (0, it.normalizeId)(e)) {
      const { schema: i } = o, { schemaId: c } = this.opts, u = i[c];
      return u && (s = (0, it.resolveUrl)(this.opts.uriResolver, s, u)), new Ma({ schema: i, schemaId: c, root: t, baseId: s });
    }
    return oo.call(this, r, o);
  }
}
He.resolveSchema = Va;
const SS = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function oo(t, { baseId: e, schema: r, root: n }) {
  var s;
  if (((s = t.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const i of t.fragment.slice(1).split("/")) {
    if (typeof r == "boolean")
      return;
    const c = r[(0, cl.unescapeFragment)(i)];
    if (c === void 0)
      return;
    r = c;
    const u = typeof r == "object" && r[this.opts.schemaId];
    !SS.has(i) && u && (e = (0, it.resolveUrl)(this.opts.uriResolver, e, u));
  }
  let a;
  if (typeof r != "boolean" && r.$ref && !(0, cl.schemaHasRulesButRef)(r, this.RULES)) {
    const i = (0, it.resolveUrl)(this.opts.uriResolver, e, r.$ref);
    a = Va.call(this, n, i);
  }
  const { schemaId: o } = this.opts;
  if (a = a || new Ma({ schema: r, schemaId: o, root: n, baseId: e }), a.schema !== a.root.schema)
    return a;
}
const PS = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", RS = "Meta-schema for $data reference (JSON AnySchema extension proposal)", NS = "object", OS = [
  "$data"
], TS = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, kS = !1, IS = {
  $id: PS,
  description: RS,
  type: NS,
  required: OS,
  properties: TS,
  additionalProperties: kS
};
var hc = {};
Object.defineProperty(hc, "__esModule", { value: !0 });
const wh = kf;
wh.code = 'require("ajv/dist/runtime/uri").default';
hc.default = wh;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = void 0;
  var e = dt;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return e.KeywordCxt;
  } });
  var r = ie;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return r._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return r.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return r.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return r.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return r.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return r.CodeGen;
  } });
  const n = Ps, s = wn, a = Vr, o = He, i = ie, c = je, u = Oe, l = M, f = IS, v = hc, g = (P, p) => new RegExp(P, p);
  g.code = "new RegExp";
  const y = ["removeAdditional", "useDefaults", "coerceTypes"], w = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), $ = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, m = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, E = 200;
  function R(P) {
    var p, S, _, d, h, b, T, I, K, U, le, Be, ir, cr, ur, lr, dr, fr, hr, mr, pr, yr, $r, gr, _r;
    const tt = P.strict, vr = (p = P.code) === null || p === void 0 ? void 0 : p.optimize, Pn = vr === !0 || vr === void 0 ? 1 : vr || 0, Rn = (_ = (S = P.code) === null || S === void 0 ? void 0 : S.regExp) !== null && _ !== void 0 ? _ : g, Ga = (d = P.uriResolver) !== null && d !== void 0 ? d : v.default;
    return {
      strictSchema: (b = (h = P.strictSchema) !== null && h !== void 0 ? h : tt) !== null && b !== void 0 ? b : !0,
      strictNumbers: (I = (T = P.strictNumbers) !== null && T !== void 0 ? T : tt) !== null && I !== void 0 ? I : !0,
      strictTypes: (U = (K = P.strictTypes) !== null && K !== void 0 ? K : tt) !== null && U !== void 0 ? U : "log",
      strictTuples: (Be = (le = P.strictTuples) !== null && le !== void 0 ? le : tt) !== null && Be !== void 0 ? Be : "log",
      strictRequired: (cr = (ir = P.strictRequired) !== null && ir !== void 0 ? ir : tt) !== null && cr !== void 0 ? cr : !1,
      code: P.code ? { ...P.code, optimize: Pn, regExp: Rn } : { optimize: Pn, regExp: Rn },
      loopRequired: (ur = P.loopRequired) !== null && ur !== void 0 ? ur : E,
      loopEnum: (lr = P.loopEnum) !== null && lr !== void 0 ? lr : E,
      meta: (dr = P.meta) !== null && dr !== void 0 ? dr : !0,
      messages: (fr = P.messages) !== null && fr !== void 0 ? fr : !0,
      inlineRefs: (hr = P.inlineRefs) !== null && hr !== void 0 ? hr : !0,
      schemaId: (mr = P.schemaId) !== null && mr !== void 0 ? mr : "$id",
      addUsedSchema: (pr = P.addUsedSchema) !== null && pr !== void 0 ? pr : !0,
      validateSchema: (yr = P.validateSchema) !== null && yr !== void 0 ? yr : !0,
      validateFormats: ($r = P.validateFormats) !== null && $r !== void 0 ? $r : !0,
      unicodeRegExp: (gr = P.unicodeRegExp) !== null && gr !== void 0 ? gr : !0,
      int32range: (_r = P.int32range) !== null && _r !== void 0 ? _r : !0,
      uriResolver: Ga
    };
  }
  class N {
    constructor(p = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), p = this.opts = { ...p, ...R(p) };
      const { es5: S, lines: _ } = this.opts.code;
      this.scope = new i.ValueScope({ scope: {}, prefixes: w, es5: S, lines: _ }), this.logger = W(p.logger);
      const d = p.validateFormats;
      p.validateFormats = !1, this.RULES = (0, a.getRules)(), O.call(this, $, p, "NOT SUPPORTED"), O.call(this, m, p, "DEPRECATED", "warn"), this._metaOpts = Re.call(this), p.formats && $e.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), p.keywords && be.call(this, p.keywords), typeof p.meta == "object" && this.addMetaSchema(p.meta), Y.call(this), p.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: p, meta: S, schemaId: _ } = this.opts;
      let d = f;
      _ === "id" && (d = { ...f }, d.id = d.$id, delete d.$id), S && p && this.addMetaSchema(d, d[_], !1);
    }
    defaultMeta() {
      const { meta: p, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof p == "object" ? p[S] || p : void 0;
    }
    validate(p, S) {
      let _;
      if (typeof p == "string") {
        if (_ = this.getSchema(p), !_)
          throw new Error(`no schema with key or ref "${p}"`);
      } else
        _ = this.compile(p);
      const d = _(S);
      return "$async" in _ || (this.errors = _.errors), d;
    }
    compile(p, S) {
      const _ = this._addSchema(p, S);
      return _.validate || this._compileSchemaEnv(_);
    }
    compileAsync(p, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: _ } = this.opts;
      return d.call(this, p, S);
      async function d(U, le) {
        await h.call(this, U.$schema);
        const Be = this._addSchema(U, le);
        return Be.validate || b.call(this, Be);
      }
      async function h(U) {
        U && !this.getSchema(U) && await d.call(this, { $ref: U }, !0);
      }
      async function b(U) {
        try {
          return this._compileSchemaEnv(U);
        } catch (le) {
          if (!(le instanceof s.default))
            throw le;
          return T.call(this, le), await I.call(this, le.missingSchema), b.call(this, U);
        }
      }
      function T({ missingSchema: U, missingRef: le }) {
        if (this.refs[U])
          throw new Error(`AnySchema ${U} is loaded but ${le} cannot be resolved`);
      }
      async function I(U) {
        const le = await K.call(this, U);
        this.refs[U] || await h.call(this, le.$schema), this.refs[U] || this.addSchema(le, U, S);
      }
      async function K(U) {
        const le = this._loading[U];
        if (le)
          return le;
        try {
          return await (this._loading[U] = _(U));
        } finally {
          delete this._loading[U];
        }
      }
    }
    // Adds schema to the instance
    addSchema(p, S, _, d = this.opts.validateSchema) {
      if (Array.isArray(p)) {
        for (const b of p)
          this.addSchema(b, void 0, _, d);
        return this;
      }
      let h;
      if (typeof p == "object") {
        const { schemaId: b } = this.opts;
        if (h = p[b], h !== void 0 && typeof h != "string")
          throw new Error(`schema ${b} must be string`);
      }
      return S = (0, c.normalizeId)(S || h), this._checkUnique(S), this.schemas[S] = this._addSchema(p, _, S, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(p, S, _ = this.opts.validateSchema) {
      return this.addSchema(p, S, !0, _), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(p, S) {
      if (typeof p == "boolean")
        return !0;
      let _;
      if (_ = p.$schema, _ !== void 0 && typeof _ != "string")
        throw new Error("$schema must be a string");
      if (_ = _ || this.opts.defaultMeta || this.defaultMeta(), !_)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(_, p);
      if (!d && S) {
        const h = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(h);
        else
          throw new Error(h);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(p) {
      let S;
      for (; typeof (S = q.call(this, p)) == "string"; )
        p = S;
      if (S === void 0) {
        const { schemaId: _ } = this.opts, d = new o.SchemaEnv({ schema: {}, schemaId: _ });
        if (S = o.resolveSchema.call(this, d, p), !S)
          return;
        this.refs[p] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(p) {
      if (p instanceof RegExp)
        return this._removeAllSchemas(this.schemas, p), this._removeAllSchemas(this.refs, p), this;
      switch (typeof p) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = q.call(this, p);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[p], delete this.refs[p], this;
        }
        case "object": {
          const S = p;
          this._cache.delete(S);
          let _ = p[this.opts.schemaId];
          return _ && (_ = (0, c.normalizeId)(_), delete this.schemas[_], delete this.refs[_]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(p) {
      for (const S of p)
        this.addKeyword(S);
      return this;
    }
    addKeyword(p, S) {
      let _;
      if (typeof p == "string")
        _ = p, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = _);
      else if (typeof p == "object" && S === void 0) {
        if (S = p, _ = S.keyword, Array.isArray(_) && !_.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (k.call(this, _, S), !S)
        return (0, l.eachItem)(_, (h) => C.call(this, h)), this;
      L.call(this, S);
      const d = {
        ...S,
        type: (0, u.getJSONTypes)(S.type),
        schemaType: (0, u.getJSONTypes)(S.schemaType)
      };
      return (0, l.eachItem)(_, d.type.length === 0 ? (h) => C.call(this, h, d) : (h) => d.type.forEach((b) => C.call(this, h, d, b))), this;
    }
    getKeyword(p) {
      const S = this.RULES.all[p];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(p) {
      const { RULES: S } = this;
      delete S.keywords[p], delete S.all[p];
      for (const _ of S.rules) {
        const d = _.rules.findIndex((h) => h.keyword === p);
        d >= 0 && _.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(p, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[p] = S, this;
    }
    errorsText(p = this.errors, { separator: S = ", ", dataVar: _ = "data" } = {}) {
      return !p || p.length === 0 ? "No errors" : p.map((d) => `${_}${d.instancePath} ${d.message}`).reduce((d, h) => d + S + h);
    }
    $dataMetaSchema(p, S) {
      const _ = this.RULES.all;
      p = JSON.parse(JSON.stringify(p));
      for (const d of S) {
        const h = d.split("/").slice(1);
        let b = p;
        for (const T of h)
          b = b[T];
        for (const T in _) {
          const I = _[T];
          if (typeof I != "object")
            continue;
          const { $data: K } = I.definition, U = b[T];
          K && U && (b[T] = F(U));
        }
      }
      return p;
    }
    _removeAllSchemas(p, S) {
      for (const _ in p) {
        const d = p[_];
        (!S || S.test(_)) && (typeof d == "string" ? delete p[_] : d && !d.meta && (this._cache.delete(d.schema), delete p[_]));
      }
    }
    _addSchema(p, S, _, d = this.opts.validateSchema, h = this.opts.addUsedSchema) {
      let b;
      const { schemaId: T } = this.opts;
      if (typeof p == "object")
        b = p[T];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof p != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let I = this._cache.get(p);
      if (I !== void 0)
        return I;
      _ = (0, c.normalizeId)(b || _);
      const K = c.getSchemaRefs.call(this, p, _);
      return I = new o.SchemaEnv({ schema: p, schemaId: T, meta: S, baseId: _, localRefs: K }), this._cache.set(I.schema, I), h && !_.startsWith("#") && (_ && this._checkUnique(_), this.refs[_] = I), d && this.validateSchema(p, !0), I;
    }
    _checkUnique(p) {
      if (this.schemas[p] || this.refs[p])
        throw new Error(`schema with key or id "${p}" already exists`);
    }
    _compileSchemaEnv(p) {
      if (p.meta ? this._compileMetaSchema(p) : o.compileSchema.call(this, p), !p.validate)
        throw new Error("ajv implementation error");
      return p.validate;
    }
    _compileMetaSchema(p) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        o.compileSchema.call(this, p);
      } finally {
        this.opts = S;
      }
    }
  }
  N.ValidationError = n.default, N.MissingRefError = s.default, t.default = N;
  function O(P, p, S, _ = "error") {
    for (const d in P) {
      const h = d;
      h in p && this.logger[_](`${S}: option ${d}. ${P[h]}`);
    }
  }
  function q(P) {
    return P = (0, c.normalizeId)(P), this.schemas[P] || this.refs[P];
  }
  function Y() {
    const P = this.opts.schemas;
    if (P)
      if (Array.isArray(P))
        this.addSchema(P);
      else
        for (const p in P)
          this.addSchema(P[p], p);
  }
  function $e() {
    for (const P in this.opts.formats) {
      const p = this.opts.formats[P];
      p && this.addFormat(P, p);
    }
  }
  function be(P) {
    if (Array.isArray(P)) {
      this.addVocabulary(P);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const p in P) {
      const S = P[p];
      S.keyword || (S.keyword = p), this.addKeyword(S);
    }
  }
  function Re() {
    const P = { ...this.opts };
    for (const p of y)
      delete P[p];
    return P;
  }
  const G = { log() {
  }, warn() {
  }, error() {
  } };
  function W(P) {
    if (P === !1)
      return G;
    if (P === void 0)
      return console;
    if (P.log && P.warn && P.error)
      return P;
    throw new Error("logger must implement log, warn and error methods");
  }
  const me = /^[a-z_$][a-z0-9_$:-]*$/i;
  function k(P, p) {
    const { RULES: S } = this;
    if ((0, l.eachItem)(P, (_) => {
      if (S.keywords[_])
        throw new Error(`Keyword ${_} is already defined`);
      if (!me.test(_))
        throw new Error(`Keyword ${_} has invalid name`);
    }), !!p && p.$data && !("code" in p || "validate" in p))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function C(P, p, S) {
    var _;
    const d = p == null ? void 0 : p.post;
    if (S && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: h } = this;
    let b = d ? h.post : h.rules.find(({ type: I }) => I === S);
    if (b || (b = { type: S, rules: [] }, h.rules.push(b)), h.keywords[P] = !0, !p)
      return;
    const T = {
      keyword: P,
      definition: {
        ...p,
        type: (0, u.getJSONTypes)(p.type),
        schemaType: (0, u.getJSONTypes)(p.schemaType)
      }
    };
    p.before ? z.call(this, b, T, p.before) : b.rules.push(T), h.all[P] = T, (_ = p.implements) === null || _ === void 0 || _.forEach((I) => this.addKeyword(I));
  }
  function z(P, p, S) {
    const _ = P.rules.findIndex((d) => d.keyword === S);
    _ >= 0 ? P.rules.splice(_, 0, p) : (P.rules.push(p), this.logger.warn(`rule ${S} is not defined`));
  }
  function L(P) {
    let { metaSchema: p } = P;
    p !== void 0 && (P.$data && this.opts.$data && (p = F(p)), P.validateSchema = this.compile(p, !0));
  }
  const B = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function F(P) {
    return { anyOf: [P, B] };
  }
})(qf);
var mc = {}, pc = {}, yc = {};
Object.defineProperty(yc, "__esModule", { value: !0 });
const CS = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
yc.default = CS;
var Lr = {};
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.callRef = Lr.getValidate = void 0;
const jS = wn, ul = ue, Ze = ie, xr = Rt, ll = He, Ds = M, AS = {
  keyword: "$ref",
  schemaType: "string",
  code(t) {
    const { gen: e, schema: r, it: n } = t, { baseId: s, schemaEnv: a, validateName: o, opts: i, self: c } = n, { root: u } = a;
    if ((r === "#" || r === "#/") && s === u.baseId)
      return f();
    const l = ll.resolveRef.call(c, u, s, r);
    if (l === void 0)
      throw new jS.default(n.opts.uriResolver, s, r);
    if (l instanceof ll.SchemaEnv)
      return v(l);
    return g(l);
    function f() {
      if (a === u)
        return Ys(t, o, a, a.$async);
      const y = e.scopeValue("root", { ref: u });
      return Ys(t, (0, Ze._)`${y}.validate`, u, u.$async);
    }
    function v(y) {
      const w = Eh(t, y);
      Ys(t, w, y, y.$async);
    }
    function g(y) {
      const w = e.scopeValue("schema", i.code.source === !0 ? { ref: y, code: (0, Ze.stringify)(y) } : { ref: y }), $ = e.name("valid"), m = t.subschema({
        schema: y,
        dataTypes: [],
        schemaPath: Ze.nil,
        topSchemaRef: w,
        errSchemaPath: r
      }, $);
      t.mergeEvaluated(m), t.ok($);
    }
  }
};
function Eh(t, e) {
  const { gen: r } = t;
  return e.validate ? r.scopeValue("validate", { ref: e.validate }) : (0, Ze._)`${r.scopeValue("wrapper", { ref: e })}.validate`;
}
Lr.getValidate = Eh;
function Ys(t, e, r, n) {
  const { gen: s, it: a } = t, { allErrors: o, schemaEnv: i, opts: c } = a, u = c.passContext ? xr.default.this : Ze.nil;
  n ? l() : f();
  function l() {
    if (!i.$async)
      throw new Error("async schema referenced by sync schema");
    const y = s.let("valid");
    s.try(() => {
      s.code((0, Ze._)`await ${(0, ul.callValidateCode)(t, e, u)}`), g(e), o || s.assign(y, !0);
    }, (w) => {
      s.if((0, Ze._)`!(${w} instanceof ${a.ValidationError})`, () => s.throw(w)), v(w), o || s.assign(y, !1);
    }), t.ok(y);
  }
  function f() {
    t.result((0, ul.callValidateCode)(t, e, u), () => g(e), () => v(e));
  }
  function v(y) {
    const w = (0, Ze._)`${y}.errors`;
    s.assign(xr.default.vErrors, (0, Ze._)`${xr.default.vErrors} === null ? ${w} : ${xr.default.vErrors}.concat(${w})`), s.assign(xr.default.errors, (0, Ze._)`${xr.default.vErrors}.length`);
  }
  function g(y) {
    var w;
    if (!a.opts.unevaluated)
      return;
    const $ = (w = r == null ? void 0 : r.validate) === null || w === void 0 ? void 0 : w.evaluated;
    if (a.props !== !0)
      if ($ && !$.dynamicProps)
        $.props !== void 0 && (a.props = Ds.mergeEvaluated.props(s, $.props, a.props));
      else {
        const m = s.var("props", (0, Ze._)`${y}.evaluated.props`);
        a.props = Ds.mergeEvaluated.props(s, m, a.props, Ze.Name);
      }
    if (a.items !== !0)
      if ($ && !$.dynamicItems)
        $.items !== void 0 && (a.items = Ds.mergeEvaluated.items(s, $.items, a.items));
      else {
        const m = s.var("items", (0, Ze._)`${y}.evaluated.items`);
        a.items = Ds.mergeEvaluated.items(s, m, a.items, Ze.Name);
      }
  }
}
Lr.callRef = Ys;
Lr.default = AS;
Object.defineProperty(pc, "__esModule", { value: !0 });
const DS = yc, MS = Lr, VS = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  DS.default,
  MS.default
];
pc.default = VS;
var $c = {}, gc = {};
Object.defineProperty(gc, "__esModule", { value: !0 });
const _a = ie, Zt = _a.operators, va = {
  maximum: { okStr: "<=", ok: Zt.LTE, fail: Zt.GT },
  minimum: { okStr: ">=", ok: Zt.GTE, fail: Zt.LT },
  exclusiveMaximum: { okStr: "<", ok: Zt.LT, fail: Zt.GTE },
  exclusiveMinimum: { okStr: ">", ok: Zt.GT, fail: Zt.LTE }
}, LS = {
  message: ({ keyword: t, schemaCode: e }) => (0, _a.str)`must be ${va[t].okStr} ${e}`,
  params: ({ keyword: t, schemaCode: e }) => (0, _a._)`{comparison: ${va[t].okStr}, limit: ${e}}`
}, FS = {
  keyword: Object.keys(va),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: LS,
  code(t) {
    const { keyword: e, data: r, schemaCode: n } = t;
    t.fail$data((0, _a._)`${r} ${va[e].fail} ${n} || isNaN(${r})`);
  }
};
gc.default = FS;
var _c = {};
Object.defineProperty(_c, "__esModule", { value: !0 });
const Yn = ie, zS = {
  message: ({ schemaCode: t }) => (0, Yn.str)`must be multiple of ${t}`,
  params: ({ schemaCode: t }) => (0, Yn._)`{multipleOf: ${t}}`
}, US = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: zS,
  code(t) {
    const { gen: e, data: r, schemaCode: n, it: s } = t, a = s.opts.multipleOfPrecision, o = e.let("res"), i = a ? (0, Yn._)`Math.abs(Math.round(${o}) - ${o}) > 1e-${a}` : (0, Yn._)`${o} !== parseInt(${o})`;
    t.fail$data((0, Yn._)`(${n} === 0 || (${o} = ${r}/${n}, ${i}))`);
  }
};
_c.default = US;
var vc = {}, wc = {};
Object.defineProperty(wc, "__esModule", { value: !0 });
function bh(t) {
  const e = t.length;
  let r = 0, n = 0, s;
  for (; n < e; )
    r++, s = t.charCodeAt(n++), s >= 55296 && s <= 56319 && n < e && (s = t.charCodeAt(n), (s & 64512) === 56320 && n++);
  return r;
}
wc.default = bh;
bh.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(vc, "__esModule", { value: !0 });
const Tr = ie, xS = M, qS = wc, KS = {
  message({ keyword: t, schemaCode: e }) {
    const r = t === "maxLength" ? "more" : "fewer";
    return (0, Tr.str)`must NOT have ${r} than ${e} characters`;
  },
  params: ({ schemaCode: t }) => (0, Tr._)`{limit: ${t}}`
}, GS = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: KS,
  code(t) {
    const { keyword: e, data: r, schemaCode: n, it: s } = t, a = e === "maxLength" ? Tr.operators.GT : Tr.operators.LT, o = s.opts.unicode === !1 ? (0, Tr._)`${r}.length` : (0, Tr._)`${(0, xS.useFunc)(t.gen, qS.default)}(${r})`;
    t.fail$data((0, Tr._)`${o} ${a} ${n}`);
  }
};
vc.default = GS;
var Ec = {};
Object.defineProperty(Ec, "__esModule", { value: !0 });
const ZS = ue, wa = ie, HS = {
  message: ({ schemaCode: t }) => (0, wa.str)`must match pattern "${t}"`,
  params: ({ schemaCode: t }) => (0, wa._)`{pattern: ${t}}`
}, BS = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: HS,
  code(t) {
    const { data: e, $data: r, schema: n, schemaCode: s, it: a } = t, o = a.opts.unicodeRegExp ? "u" : "", i = r ? (0, wa._)`(new RegExp(${s}, ${o}))` : (0, ZS.usePattern)(t, n);
    t.fail$data((0, wa._)`!${i}.test(${e})`);
  }
};
Ec.default = BS;
var bc = {};
Object.defineProperty(bc, "__esModule", { value: !0 });
const Qn = ie, WS = {
  message({ keyword: t, schemaCode: e }) {
    const r = t === "maxProperties" ? "more" : "fewer";
    return (0, Qn.str)`must NOT have ${r} than ${e} properties`;
  },
  params: ({ schemaCode: t }) => (0, Qn._)`{limit: ${t}}`
}, JS = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: WS,
  code(t) {
    const { keyword: e, data: r, schemaCode: n } = t, s = e === "maxProperties" ? Qn.operators.GT : Qn.operators.LT;
    t.fail$data((0, Qn._)`Object.keys(${r}).length ${s} ${n}`);
  }
};
bc.default = JS;
var Sc = {};
Object.defineProperty(Sc, "__esModule", { value: !0 });
const An = ue, es = ie, XS = M, YS = {
  message: ({ params: { missingProperty: t } }) => (0, es.str)`must have required property '${t}'`,
  params: ({ params: { missingProperty: t } }) => (0, es._)`{missingProperty: ${t}}`
}, QS = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: YS,
  code(t) {
    const { gen: e, schema: r, schemaCode: n, data: s, $data: a, it: o } = t, { opts: i } = o;
    if (!a && r.length === 0)
      return;
    const c = r.length >= i.loopRequired;
    if (o.allErrors ? u() : l(), i.strictRequired) {
      const g = t.parentSchema.properties, { definedProperties: y } = t.it;
      for (const w of r)
        if ((g == null ? void 0 : g[w]) === void 0 && !y.has(w)) {
          const $ = o.schemaEnv.baseId + o.errSchemaPath, m = `required property "${w}" is not defined at "${$}" (strictRequired)`;
          (0, XS.checkStrictMode)(o, m, o.opts.strictRequired);
        }
    }
    function u() {
      if (c || a)
        t.block$data(es.nil, f);
      else
        for (const g of r)
          (0, An.checkReportMissingProp)(t, g);
    }
    function l() {
      const g = e.let("missing");
      if (c || a) {
        const y = e.let("valid", !0);
        t.block$data(y, () => v(g, y)), t.ok(y);
      } else
        e.if((0, An.checkMissingProp)(t, r, g)), (0, An.reportMissingProp)(t, g), e.else();
    }
    function f() {
      e.forOf("prop", n, (g) => {
        t.setParams({ missingProperty: g }), e.if((0, An.noPropertyInData)(e, s, g, i.ownProperties), () => t.error());
      });
    }
    function v(g, y) {
      t.setParams({ missingProperty: g }), e.forOf(g, n, () => {
        e.assign(y, (0, An.propertyInData)(e, s, g, i.ownProperties)), e.if((0, es.not)(y), () => {
          t.error(), e.break();
        });
      }, es.nil);
    }
  }
};
Sc.default = QS;
var Pc = {};
Object.defineProperty(Pc, "__esModule", { value: !0 });
const ts = ie, e1 = {
  message({ keyword: t, schemaCode: e }) {
    const r = t === "maxItems" ? "more" : "fewer";
    return (0, ts.str)`must NOT have ${r} than ${e} items`;
  },
  params: ({ schemaCode: t }) => (0, ts._)`{limit: ${t}}`
}, t1 = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: e1,
  code(t) {
    const { keyword: e, data: r, schemaCode: n } = t, s = e === "maxItems" ? ts.operators.GT : ts.operators.LT;
    t.fail$data((0, ts._)`${r}.length ${s} ${n}`);
  }
};
Pc.default = t1;
var Rc = {}, Rs = {};
Object.defineProperty(Rs, "__esModule", { value: !0 });
const Sh = Oa;
Sh.code = 'require("ajv/dist/runtime/equal").default';
Rs.default = Sh;
Object.defineProperty(Rc, "__esModule", { value: !0 });
const io = Oe, Ie = ie, r1 = M, n1 = Rs, s1 = {
  message: ({ params: { i: t, j: e } }) => (0, Ie.str)`must NOT have duplicate items (items ## ${e} and ${t} are identical)`,
  params: ({ params: { i: t, j: e } }) => (0, Ie._)`{i: ${t}, j: ${e}}`
}, a1 = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: s1,
  code(t) {
    const { gen: e, data: r, $data: n, schema: s, parentSchema: a, schemaCode: o, it: i } = t;
    if (!n && !s)
      return;
    const c = e.let("valid"), u = a.items ? (0, io.getSchemaTypes)(a.items) : [];
    t.block$data(c, l, (0, Ie._)`${o} === false`), t.ok(c);
    function l() {
      const y = e.let("i", (0, Ie._)`${r}.length`), w = e.let("j");
      t.setParams({ i: y, j: w }), e.assign(c, !0), e.if((0, Ie._)`${y} > 1`, () => (f() ? v : g)(y, w));
    }
    function f() {
      return u.length > 0 && !u.some((y) => y === "object" || y === "array");
    }
    function v(y, w) {
      const $ = e.name("item"), m = (0, io.checkDataTypes)(u, $, i.opts.strictNumbers, io.DataType.Wrong), E = e.const("indices", (0, Ie._)`{}`);
      e.for((0, Ie._)`;${y}--;`, () => {
        e.let($, (0, Ie._)`${r}[${y}]`), e.if(m, (0, Ie._)`continue`), u.length > 1 && e.if((0, Ie._)`typeof ${$} == "string"`, (0, Ie._)`${$} += "_"`), e.if((0, Ie._)`typeof ${E}[${$}] == "number"`, () => {
          e.assign(w, (0, Ie._)`${E}[${$}]`), t.error(), e.assign(c, !1).break();
        }).code((0, Ie._)`${E}[${$}] = ${y}`);
      });
    }
    function g(y, w) {
      const $ = (0, r1.useFunc)(e, n1.default), m = e.name("outer");
      e.label(m).for((0, Ie._)`;${y}--;`, () => e.for((0, Ie._)`${w} = ${y}; ${w}--;`, () => e.if((0, Ie._)`${$}(${r}[${y}], ${r}[${w}])`, () => {
        t.error(), e.assign(c, !1).break(m);
      })));
    }
  }
};
Rc.default = a1;
var Nc = {};
Object.defineProperty(Nc, "__esModule", { value: !0 });
const Ko = ie, o1 = M, i1 = Rs, c1 = {
  message: "must be equal to constant",
  params: ({ schemaCode: t }) => (0, Ko._)`{allowedValue: ${t}}`
}, u1 = {
  keyword: "const",
  $data: !0,
  error: c1,
  code(t) {
    const { gen: e, data: r, $data: n, schemaCode: s, schema: a } = t;
    n || a && typeof a == "object" ? t.fail$data((0, Ko._)`!${(0, o1.useFunc)(e, i1.default)}(${r}, ${s})`) : t.fail((0, Ko._)`${a} !== ${r}`);
  }
};
Nc.default = u1;
var Oc = {};
Object.defineProperty(Oc, "__esModule", { value: !0 });
const zn = ie, l1 = M, d1 = Rs, f1 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: t }) => (0, zn._)`{allowedValues: ${t}}`
}, h1 = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: f1,
  code(t) {
    const { gen: e, data: r, $data: n, schema: s, schemaCode: a, it: o } = t;
    if (!n && s.length === 0)
      throw new Error("enum must have non-empty array");
    const i = s.length >= o.opts.loopEnum;
    let c;
    const u = () => c ?? (c = (0, l1.useFunc)(e, d1.default));
    let l;
    if (i || n)
      l = e.let("valid"), t.block$data(l, f);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const g = e.const("vSchema", a);
      l = (0, zn.or)(...s.map((y, w) => v(g, w)));
    }
    t.pass(l);
    function f() {
      e.assign(l, !1), e.forOf("v", a, (g) => e.if((0, zn._)`${u()}(${r}, ${g})`, () => e.assign(l, !0).break()));
    }
    function v(g, y) {
      const w = s[y];
      return typeof w == "object" && w !== null ? (0, zn._)`${u()}(${r}, ${g}[${y}])` : (0, zn._)`${r} === ${w}`;
    }
  }
};
Oc.default = h1;
Object.defineProperty($c, "__esModule", { value: !0 });
const m1 = gc, p1 = _c, y1 = vc, $1 = Ec, g1 = bc, _1 = Sc, v1 = Pc, w1 = Rc, E1 = Nc, b1 = Oc, S1 = [
  // number
  m1.default,
  p1.default,
  // string
  y1.default,
  $1.default,
  // object
  g1.default,
  _1.default,
  // array
  v1.default,
  w1.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  E1.default,
  b1.default
];
$c.default = S1;
var Tc = {}, En = {};
Object.defineProperty(En, "__esModule", { value: !0 });
En.validateAdditionalItems = void 0;
const kr = ie, Go = M, P1 = {
  message: ({ params: { len: t } }) => (0, kr.str)`must NOT have more than ${t} items`,
  params: ({ params: { len: t } }) => (0, kr._)`{limit: ${t}}`
}, R1 = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: P1,
  code(t) {
    const { parentSchema: e, it: r } = t, { items: n } = e;
    if (!Array.isArray(n)) {
      (0, Go.checkStrictMode)(r, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    Ph(t, n);
  }
};
function Ph(t, e) {
  const { gen: r, schema: n, data: s, keyword: a, it: o } = t;
  o.items = !0;
  const i = r.const("len", (0, kr._)`${s}.length`);
  if (n === !1)
    t.setParams({ len: e.length }), t.pass((0, kr._)`${i} <= ${e.length}`);
  else if (typeof n == "object" && !(0, Go.alwaysValidSchema)(o, n)) {
    const u = r.var("valid", (0, kr._)`${i} <= ${e.length}`);
    r.if((0, kr.not)(u), () => c(u)), t.ok(u);
  }
  function c(u) {
    r.forRange("i", e.length, i, (l) => {
      t.subschema({ keyword: a, dataProp: l, dataPropType: Go.Type.Num }, u), o.allErrors || r.if((0, kr.not)(u), () => r.break());
    });
  }
}
En.validateAdditionalItems = Ph;
En.default = R1;
var kc = {}, bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.validateTuple = void 0;
const dl = ie, Qs = M, N1 = ue, O1 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(t) {
    const { schema: e, it: r } = t;
    if (Array.isArray(e))
      return Rh(t, "additionalItems", e);
    r.items = !0, !(0, Qs.alwaysValidSchema)(r, e) && t.ok((0, N1.validateArray)(t));
  }
};
function Rh(t, e, r = t.schema) {
  const { gen: n, parentSchema: s, data: a, keyword: o, it: i } = t;
  l(s), i.opts.unevaluated && r.length && i.items !== !0 && (i.items = Qs.mergeEvaluated.items(n, r.length, i.items));
  const c = n.name("valid"), u = n.const("len", (0, dl._)`${a}.length`);
  r.forEach((f, v) => {
    (0, Qs.alwaysValidSchema)(i, f) || (n.if((0, dl._)`${u} > ${v}`, () => t.subschema({
      keyword: o,
      schemaProp: v,
      dataProp: v
    }, c)), t.ok(c));
  });
  function l(f) {
    const { opts: v, errSchemaPath: g } = i, y = r.length, w = y === f.minItems && (y === f.maxItems || f[e] === !1);
    if (v.strictTuples && !w) {
      const $ = `"${o}" is ${y}-tuple, but minItems or maxItems/${e} are not specified or different at path "${g}"`;
      (0, Qs.checkStrictMode)(i, $, v.strictTuples);
    }
  }
}
bn.validateTuple = Rh;
bn.default = O1;
Object.defineProperty(kc, "__esModule", { value: !0 });
const T1 = bn, k1 = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (t) => (0, T1.validateTuple)(t, "items")
};
kc.default = k1;
var Ic = {};
Object.defineProperty(Ic, "__esModule", { value: !0 });
const fl = ie, I1 = M, C1 = ue, j1 = En, A1 = {
  message: ({ params: { len: t } }) => (0, fl.str)`must NOT have more than ${t} items`,
  params: ({ params: { len: t } }) => (0, fl._)`{limit: ${t}}`
}, D1 = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: A1,
  code(t) {
    const { schema: e, parentSchema: r, it: n } = t, { prefixItems: s } = r;
    n.items = !0, !(0, I1.alwaysValidSchema)(n, e) && (s ? (0, j1.validateAdditionalItems)(t, s) : t.ok((0, C1.validateArray)(t)));
  }
};
Ic.default = D1;
var Cc = {};
Object.defineProperty(Cc, "__esModule", { value: !0 });
const et = ie, Ms = M, M1 = {
  message: ({ params: { min: t, max: e } }) => e === void 0 ? (0, et.str)`must contain at least ${t} valid item(s)` : (0, et.str)`must contain at least ${t} and no more than ${e} valid item(s)`,
  params: ({ params: { min: t, max: e } }) => e === void 0 ? (0, et._)`{minContains: ${t}}` : (0, et._)`{minContains: ${t}, maxContains: ${e}}`
}, V1 = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: M1,
  code(t) {
    const { gen: e, schema: r, parentSchema: n, data: s, it: a } = t;
    let o, i;
    const { minContains: c, maxContains: u } = n;
    a.opts.next ? (o = c === void 0 ? 1 : c, i = u) : o = 1;
    const l = e.const("len", (0, et._)`${s}.length`);
    if (t.setParams({ min: o, max: i }), i === void 0 && o === 0) {
      (0, Ms.checkStrictMode)(a, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (i !== void 0 && o > i) {
      (0, Ms.checkStrictMode)(a, '"minContains" > "maxContains" is always invalid'), t.fail();
      return;
    }
    if ((0, Ms.alwaysValidSchema)(a, r)) {
      let w = (0, et._)`${l} >= ${o}`;
      i !== void 0 && (w = (0, et._)`${w} && ${l} <= ${i}`), t.pass(w);
      return;
    }
    a.items = !0;
    const f = e.name("valid");
    i === void 0 && o === 1 ? g(f, () => e.if(f, () => e.break())) : o === 0 ? (e.let(f, !0), i !== void 0 && e.if((0, et._)`${s}.length > 0`, v)) : (e.let(f, !1), v()), t.result(f, () => t.reset());
    function v() {
      const w = e.name("_valid"), $ = e.let("count", 0);
      g(w, () => e.if(w, () => y($)));
    }
    function g(w, $) {
      e.forRange("i", 0, l, (m) => {
        t.subschema({
          keyword: "contains",
          dataProp: m,
          dataPropType: Ms.Type.Num,
          compositeRule: !0
        }, w), $();
      });
    }
    function y(w) {
      e.code((0, et._)`${w}++`), i === void 0 ? e.if((0, et._)`${w} >= ${o}`, () => e.assign(f, !0).break()) : (e.if((0, et._)`${w} > ${i}`, () => e.assign(f, !1).break()), o === 1 ? e.assign(f, !0) : e.if((0, et._)`${w} >= ${o}`, () => e.assign(f, !0)));
    }
  }
};
Cc.default = V1;
var Nh = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.validateSchemaDeps = t.validatePropertyDeps = t.error = void 0;
  const e = ie, r = M, n = ue;
  t.error = {
    message: ({ params: { property: c, depsCount: u, deps: l } }) => {
      const f = u === 1 ? "property" : "properties";
      return (0, e.str)`must have ${f} ${l} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: u, deps: l, missingProperty: f } }) => (0, e._)`{property: ${c},
    missingProperty: ${f},
    depsCount: ${u},
    deps: ${l}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: t.error,
    code(c) {
      const [u, l] = a(c);
      o(c, u), i(c, l);
    }
  };
  function a({ schema: c }) {
    const u = {}, l = {};
    for (const f in c) {
      if (f === "__proto__")
        continue;
      const v = Array.isArray(c[f]) ? u : l;
      v[f] = c[f];
    }
    return [u, l];
  }
  function o(c, u = c.schema) {
    const { gen: l, data: f, it: v } = c;
    if (Object.keys(u).length === 0)
      return;
    const g = l.let("missing");
    for (const y in u) {
      const w = u[y];
      if (w.length === 0)
        continue;
      const $ = (0, n.propertyInData)(l, f, y, v.opts.ownProperties);
      c.setParams({
        property: y,
        depsCount: w.length,
        deps: w.join(", ")
      }), v.allErrors ? l.if($, () => {
        for (const m of w)
          (0, n.checkReportMissingProp)(c, m);
      }) : (l.if((0, e._)`${$} && (${(0, n.checkMissingProp)(c, w, g)})`), (0, n.reportMissingProp)(c, g), l.else());
    }
  }
  t.validatePropertyDeps = o;
  function i(c, u = c.schema) {
    const { gen: l, data: f, keyword: v, it: g } = c, y = l.name("valid");
    for (const w in u)
      (0, r.alwaysValidSchema)(g, u[w]) || (l.if(
        (0, n.propertyInData)(l, f, w, g.opts.ownProperties),
        () => {
          const $ = c.subschema({ keyword: v, schemaProp: w }, y);
          c.mergeValidEvaluated($, y);
        },
        () => l.var(y, !0)
        // TODO var
      ), c.ok(y));
  }
  t.validateSchemaDeps = i, t.default = s;
})(Nh);
var jc = {};
Object.defineProperty(jc, "__esModule", { value: !0 });
const Oh = ie, L1 = M, F1 = {
  message: "property name must be valid",
  params: ({ params: t }) => (0, Oh._)`{propertyName: ${t.propertyName}}`
}, z1 = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: F1,
  code(t) {
    const { gen: e, schema: r, data: n, it: s } = t;
    if ((0, L1.alwaysValidSchema)(s, r))
      return;
    const a = e.name("valid");
    e.forIn("key", n, (o) => {
      t.setParams({ propertyName: o }), t.subschema({
        keyword: "propertyNames",
        data: o,
        dataTypes: ["string"],
        propertyName: o,
        compositeRule: !0
      }, a), e.if((0, Oh.not)(a), () => {
        t.error(!0), s.allErrors || e.break();
      });
    }), t.ok(a);
  }
};
jc.default = z1;
var La = {};
Object.defineProperty(La, "__esModule", { value: !0 });
const Vs = ue, at = ie, U1 = Rt, Ls = M, x1 = {
  message: "must NOT have additional properties",
  params: ({ params: t }) => (0, at._)`{additionalProperty: ${t.additionalProperty}}`
}, q1 = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: x1,
  code(t) {
    const { gen: e, schema: r, parentSchema: n, data: s, errsCount: a, it: o } = t;
    if (!a)
      throw new Error("ajv implementation error");
    const { allErrors: i, opts: c } = o;
    if (o.props = !0, c.removeAdditional !== "all" && (0, Ls.alwaysValidSchema)(o, r))
      return;
    const u = (0, Vs.allSchemaProperties)(n.properties), l = (0, Vs.allSchemaProperties)(n.patternProperties);
    f(), t.ok((0, at._)`${a} === ${U1.default.errors}`);
    function f() {
      e.forIn("key", s, ($) => {
        !u.length && !l.length ? y($) : e.if(v($), () => y($));
      });
    }
    function v($) {
      let m;
      if (u.length > 8) {
        const E = (0, Ls.schemaRefOrVal)(o, n.properties, "properties");
        m = (0, Vs.isOwnProperty)(e, E, $);
      } else u.length ? m = (0, at.or)(...u.map((E) => (0, at._)`${$} === ${E}`)) : m = at.nil;
      return l.length && (m = (0, at.or)(m, ...l.map((E) => (0, at._)`${(0, Vs.usePattern)(t, E)}.test(${$})`))), (0, at.not)(m);
    }
    function g($) {
      e.code((0, at._)`delete ${s}[${$}]`);
    }
    function y($) {
      if (c.removeAdditional === "all" || c.removeAdditional && r === !1) {
        g($);
        return;
      }
      if (r === !1) {
        t.setParams({ additionalProperty: $ }), t.error(), i || e.break();
        return;
      }
      if (typeof r == "object" && !(0, Ls.alwaysValidSchema)(o, r)) {
        const m = e.name("valid");
        c.removeAdditional === "failing" ? (w($, m, !1), e.if((0, at.not)(m), () => {
          t.reset(), g($);
        })) : (w($, m), i || e.if((0, at.not)(m), () => e.break()));
      }
    }
    function w($, m, E) {
      const R = {
        keyword: "additionalProperties",
        dataProp: $,
        dataPropType: Ls.Type.Str
      };
      E === !1 && Object.assign(R, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), t.subschema(R, m);
    }
  }
};
La.default = q1;
var Ac = {};
Object.defineProperty(Ac, "__esModule", { value: !0 });
const K1 = dt, hl = ue, co = M, ml = La, G1 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(t) {
    const { gen: e, schema: r, parentSchema: n, data: s, it: a } = t;
    a.opts.removeAdditional === "all" && n.additionalProperties === void 0 && ml.default.code(new K1.KeywordCxt(a, ml.default, "additionalProperties"));
    const o = (0, hl.allSchemaProperties)(r);
    for (const f of o)
      a.definedProperties.add(f);
    a.opts.unevaluated && o.length && a.props !== !0 && (a.props = co.mergeEvaluated.props(e, (0, co.toHash)(o), a.props));
    const i = o.filter((f) => !(0, co.alwaysValidSchema)(a, r[f]));
    if (i.length === 0)
      return;
    const c = e.name("valid");
    for (const f of i)
      u(f) ? l(f) : (e.if((0, hl.propertyInData)(e, s, f, a.opts.ownProperties)), l(f), a.allErrors || e.else().var(c, !0), e.endIf()), t.it.definedProperties.add(f), t.ok(c);
    function u(f) {
      return a.opts.useDefaults && !a.compositeRule && r[f].default !== void 0;
    }
    function l(f) {
      t.subschema({
        keyword: "properties",
        schemaProp: f,
        dataProp: f
      }, c);
    }
  }
};
Ac.default = G1;
var Dc = {};
Object.defineProperty(Dc, "__esModule", { value: !0 });
const pl = ue, Fs = ie, yl = M, $l = M, Z1 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(t) {
    const { gen: e, schema: r, data: n, parentSchema: s, it: a } = t, { opts: o } = a, i = (0, pl.allSchemaProperties)(r), c = i.filter((w) => (0, yl.alwaysValidSchema)(a, r[w]));
    if (i.length === 0 || c.length === i.length && (!a.opts.unevaluated || a.props === !0))
      return;
    const u = o.strictSchema && !o.allowMatchingProperties && s.properties, l = e.name("valid");
    a.props !== !0 && !(a.props instanceof Fs.Name) && (a.props = (0, $l.evaluatedPropsToName)(e, a.props));
    const { props: f } = a;
    v();
    function v() {
      for (const w of i)
        u && g(w), a.allErrors ? y(w) : (e.var(l, !0), y(w), e.if(l));
    }
    function g(w) {
      for (const $ in u)
        new RegExp(w).test($) && (0, yl.checkStrictMode)(a, `property ${$} matches pattern ${w} (use allowMatchingProperties)`);
    }
    function y(w) {
      e.forIn("key", n, ($) => {
        e.if((0, Fs._)`${(0, pl.usePattern)(t, w)}.test(${$})`, () => {
          const m = c.includes(w);
          m || t.subschema({
            keyword: "patternProperties",
            schemaProp: w,
            dataProp: $,
            dataPropType: $l.Type.Str
          }, l), a.opts.unevaluated && f !== !0 ? e.assign((0, Fs._)`${f}[${$}]`, !0) : !m && !a.allErrors && e.if((0, Fs.not)(l), () => e.break());
        });
      });
    }
  }
};
Dc.default = Z1;
var Mc = {};
Object.defineProperty(Mc, "__esModule", { value: !0 });
const H1 = M, B1 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(t) {
    const { gen: e, schema: r, it: n } = t;
    if ((0, H1.alwaysValidSchema)(n, r)) {
      t.fail();
      return;
    }
    const s = e.name("valid");
    t.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), t.failResult(s, () => t.reset(), () => t.error());
  },
  error: { message: "must NOT be valid" }
};
Mc.default = B1;
var Vc = {};
Object.defineProperty(Vc, "__esModule", { value: !0 });
const W1 = ue, J1 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: W1.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
Vc.default = J1;
var Lc = {};
Object.defineProperty(Lc, "__esModule", { value: !0 });
const ea = ie, X1 = M, Y1 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: t }) => (0, ea._)`{passingSchemas: ${t.passing}}`
}, Q1 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Y1,
  code(t) {
    const { gen: e, schema: r, parentSchema: n, it: s } = t;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && n.discriminator)
      return;
    const a = r, o = e.let("valid", !1), i = e.let("passing", null), c = e.name("_valid");
    t.setParams({ passing: i }), e.block(u), t.result(o, () => t.reset(), () => t.error(!0));
    function u() {
      a.forEach((l, f) => {
        let v;
        (0, X1.alwaysValidSchema)(s, l) ? e.var(c, !0) : v = t.subschema({
          keyword: "oneOf",
          schemaProp: f,
          compositeRule: !0
        }, c), f > 0 && e.if((0, ea._)`${c} && ${o}`).assign(o, !1).assign(i, (0, ea._)`[${i}, ${f}]`).else(), e.if(c, () => {
          e.assign(o, !0), e.assign(i, f), v && t.mergeEvaluated(v, ea.Name);
        });
      });
    }
  }
};
Lc.default = Q1;
var Fc = {};
Object.defineProperty(Fc, "__esModule", { value: !0 });
const eP = M, tP = {
  keyword: "allOf",
  schemaType: "array",
  code(t) {
    const { gen: e, schema: r, it: n } = t;
    if (!Array.isArray(r))
      throw new Error("ajv implementation error");
    const s = e.name("valid");
    r.forEach((a, o) => {
      if ((0, eP.alwaysValidSchema)(n, a))
        return;
      const i = t.subschema({ keyword: "allOf", schemaProp: o }, s);
      t.ok(s), t.mergeEvaluated(i);
    });
  }
};
Fc.default = tP;
var zc = {};
Object.defineProperty(zc, "__esModule", { value: !0 });
const Ea = ie, Th = M, rP = {
  message: ({ params: t }) => (0, Ea.str)`must match "${t.ifClause}" schema`,
  params: ({ params: t }) => (0, Ea._)`{failingKeyword: ${t.ifClause}}`
}, nP = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: rP,
  code(t) {
    const { gen: e, parentSchema: r, it: n } = t;
    r.then === void 0 && r.else === void 0 && (0, Th.checkStrictMode)(n, '"if" without "then" and "else" is ignored');
    const s = gl(n, "then"), a = gl(n, "else");
    if (!s && !a)
      return;
    const o = e.let("valid", !0), i = e.name("_valid");
    if (c(), t.reset(), s && a) {
      const l = e.let("ifClause");
      t.setParams({ ifClause: l }), e.if(i, u("then", l), u("else", l));
    } else s ? e.if(i, u("then")) : e.if((0, Ea.not)(i), u("else"));
    t.pass(o, () => t.error(!0));
    function c() {
      const l = t.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, i);
      t.mergeEvaluated(l);
    }
    function u(l, f) {
      return () => {
        const v = t.subschema({ keyword: l }, i);
        e.assign(o, i), t.mergeValidEvaluated(v, o), f ? e.assign(f, (0, Ea._)`${l}`) : t.setParams({ ifClause: l });
      };
    }
  }
};
function gl(t, e) {
  const r = t.schema[e];
  return r !== void 0 && !(0, Th.alwaysValidSchema)(t, r);
}
zc.default = nP;
var Uc = {};
Object.defineProperty(Uc, "__esModule", { value: !0 });
const sP = M, aP = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: t, parentSchema: e, it: r }) {
    e.if === void 0 && (0, sP.checkStrictMode)(r, `"${t}" without "if" is ignored`);
  }
};
Uc.default = aP;
Object.defineProperty(Tc, "__esModule", { value: !0 });
const oP = En, iP = kc, cP = bn, uP = Ic, lP = Cc, dP = Nh, fP = jc, hP = La, mP = Ac, pP = Dc, yP = Mc, $P = Vc, gP = Lc, _P = Fc, vP = zc, wP = Uc;
function EP(t = !1) {
  const e = [
    // any
    yP.default,
    $P.default,
    gP.default,
    _P.default,
    vP.default,
    wP.default,
    // object
    fP.default,
    hP.default,
    dP.default,
    mP.default,
    pP.default
  ];
  return t ? e.push(iP.default, uP.default) : e.push(oP.default, cP.default), e.push(lP.default), e;
}
Tc.default = EP;
var xc = {}, qc = {};
Object.defineProperty(qc, "__esModule", { value: !0 });
const Pe = ie, bP = {
  message: ({ schemaCode: t }) => (0, Pe.str)`must match format "${t}"`,
  params: ({ schemaCode: t }) => (0, Pe._)`{format: ${t}}`
}, SP = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: bP,
  code(t, e) {
    const { gen: r, data: n, $data: s, schema: a, schemaCode: o, it: i } = t, { opts: c, errSchemaPath: u, schemaEnv: l, self: f } = i;
    if (!c.validateFormats)
      return;
    s ? v() : g();
    function v() {
      const y = r.scopeValue("formats", {
        ref: f.formats,
        code: c.code.formats
      }), w = r.const("fDef", (0, Pe._)`${y}[${o}]`), $ = r.let("fType"), m = r.let("format");
      r.if((0, Pe._)`typeof ${w} == "object" && !(${w} instanceof RegExp)`, () => r.assign($, (0, Pe._)`${w}.type || "string"`).assign(m, (0, Pe._)`${w}.validate`), () => r.assign($, (0, Pe._)`"string"`).assign(m, w)), t.fail$data((0, Pe.or)(E(), R()));
      function E() {
        return c.strictSchema === !1 ? Pe.nil : (0, Pe._)`${o} && !${m}`;
      }
      function R() {
        const N = l.$async ? (0, Pe._)`(${w}.async ? await ${m}(${n}) : ${m}(${n}))` : (0, Pe._)`${m}(${n})`, O = (0, Pe._)`(typeof ${m} == "function" ? ${N} : ${m}.test(${n}))`;
        return (0, Pe._)`${m} && ${m} !== true && ${$} === ${e} && !${O}`;
      }
    }
    function g() {
      const y = f.formats[a];
      if (!y) {
        E();
        return;
      }
      if (y === !0)
        return;
      const [w, $, m] = R(y);
      w === e && t.pass(N());
      function E() {
        if (c.strictSchema === !1) {
          f.logger.warn(O());
          return;
        }
        throw new Error(O());
        function O() {
          return `unknown format "${a}" ignored in schema at path "${u}"`;
        }
      }
      function R(O) {
        const q = O instanceof RegExp ? (0, Pe.regexpCode)(O) : c.code.formats ? (0, Pe._)`${c.code.formats}${(0, Pe.getProperty)(a)}` : void 0, Y = r.scopeValue("formats", { key: a, ref: O, code: q });
        return typeof O == "object" && !(O instanceof RegExp) ? [O.type || "string", O.validate, (0, Pe._)`${Y}.validate`] : ["string", O, Y];
      }
      function N() {
        if (typeof y == "object" && !(y instanceof RegExp) && y.async) {
          if (!l.$async)
            throw new Error("async format in sync schema");
          return (0, Pe._)`await ${m}(${n})`;
        }
        return typeof $ == "function" ? (0, Pe._)`${m}(${n})` : (0, Pe._)`${m}.test(${n})`;
      }
    }
  }
};
qc.default = SP;
Object.defineProperty(xc, "__esModule", { value: !0 });
const PP = qc, RP = [PP.default];
xc.default = RP;
var pn = {};
Object.defineProperty(pn, "__esModule", { value: !0 });
pn.contentVocabulary = pn.metadataVocabulary = void 0;
pn.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
pn.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(mc, "__esModule", { value: !0 });
const NP = pc, OP = $c, TP = Tc, kP = xc, _l = pn, IP = [
  NP.default,
  OP.default,
  (0, TP.default)(),
  kP.default,
  _l.metadataVocabulary,
  _l.contentVocabulary
];
mc.default = IP;
var Kc = {}, Fa = {};
Object.defineProperty(Fa, "__esModule", { value: !0 });
Fa.DiscrError = void 0;
var vl;
(function(t) {
  t.Tag = "tag", t.Mapping = "mapping";
})(vl || (Fa.DiscrError = vl = {}));
Object.defineProperty(Kc, "__esModule", { value: !0 });
const Jr = ie, Zo = Fa, wl = He, CP = wn, jP = M, AP = {
  message: ({ params: { discrError: t, tagName: e } }) => t === Zo.DiscrError.Tag ? `tag "${e}" must be string` : `value of tag "${e}" must be in oneOf`,
  params: ({ params: { discrError: t, tag: e, tagName: r } }) => (0, Jr._)`{error: ${t}, tag: ${r}, tagValue: ${e}}`
}, DP = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: AP,
  code(t) {
    const { gen: e, data: r, schema: n, parentSchema: s, it: a } = t, { oneOf: o } = s;
    if (!a.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const i = n.propertyName;
    if (typeof i != "string")
      throw new Error("discriminator: requires propertyName");
    if (n.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!o)
      throw new Error("discriminator: requires oneOf keyword");
    const c = e.let("valid", !1), u = e.const("tag", (0, Jr._)`${r}${(0, Jr.getProperty)(i)}`);
    e.if((0, Jr._)`typeof ${u} == "string"`, () => l(), () => t.error(!1, { discrError: Zo.DiscrError.Tag, tag: u, tagName: i })), t.ok(c);
    function l() {
      const g = v();
      e.if(!1);
      for (const y in g)
        e.elseIf((0, Jr._)`${u} === ${y}`), e.assign(c, f(g[y]));
      e.else(), t.error(!1, { discrError: Zo.DiscrError.Mapping, tag: u, tagName: i }), e.endIf();
    }
    function f(g) {
      const y = e.name("valid"), w = t.subschema({ keyword: "oneOf", schemaProp: g }, y);
      return t.mergeEvaluated(w, Jr.Name), y;
    }
    function v() {
      var g;
      const y = {}, w = m(s);
      let $ = !0;
      for (let N = 0; N < o.length; N++) {
        let O = o[N];
        if (O != null && O.$ref && !(0, jP.schemaHasRulesButRef)(O, a.self.RULES)) {
          const Y = O.$ref;
          if (O = wl.resolveRef.call(a.self, a.schemaEnv.root, a.baseId, Y), O instanceof wl.SchemaEnv && (O = O.schema), O === void 0)
            throw new CP.default(a.opts.uriResolver, a.baseId, Y);
        }
        const q = (g = O == null ? void 0 : O.properties) === null || g === void 0 ? void 0 : g[i];
        if (typeof q != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${i}"`);
        $ = $ && (w || m(O)), E(q, N);
      }
      if (!$)
        throw new Error(`discriminator: "${i}" must be required`);
      return y;
      function m({ required: N }) {
        return Array.isArray(N) && N.includes(i);
      }
      function E(N, O) {
        if (N.const)
          R(N.const, O);
        else if (N.enum)
          for (const q of N.enum)
            R(q, O);
        else
          throw new Error(`discriminator: "properties/${i}" must have "const" or "enum"`);
      }
      function R(N, O) {
        if (typeof N != "string" || N in y)
          throw new Error(`discriminator: "${i}" values must be unique strings`);
        y[N] = O;
      }
    }
  }
};
Kc.default = DP;
const MP = "http://json-schema.org/draft-07/schema#", VP = "http://json-schema.org/draft-07/schema#", LP = "Core schema meta-schema", FP = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, zP = [
  "object",
  "boolean"
], UP = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, xP = {
  $schema: MP,
  $id: VP,
  title: LP,
  definitions: FP,
  type: zP,
  properties: UP,
  default: !0
};
(function(t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.MissingRefError = e.ValidationError = e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = e.Ajv = void 0;
  const r = qf, n = mc, s = Kc, a = xP, o = ["/properties"], i = "http://json-schema.org/draft-07/schema";
  class c extends r.default {
    _addVocabularies() {
      super._addVocabularies(), n.default.forEach((y) => this.addVocabulary(y)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const y = this.opts.$data ? this.$dataMetaSchema(a, o) : a;
      this.addMetaSchema(y, i, !1), this.refs["http://json-schema.org/schema"] = i;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(i) ? i : void 0);
    }
  }
  e.Ajv = c, t.exports = e = c, t.exports.Ajv = c, Object.defineProperty(e, "__esModule", { value: !0 }), e.default = c;
  var u = dt;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return u.KeywordCxt;
  } });
  var l = ie;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return l._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return l.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return l.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return l.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return l.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return l.CodeGen;
  } });
  var f = Ps;
  Object.defineProperty(e, "ValidationError", { enumerable: !0, get: function() {
    return f.default;
  } });
  var v = wn;
  Object.defineProperty(e, "MissingRefError", { enumerable: !0, get: function() {
    return v.default;
  } });
})(Fo, Fo.exports);
var qP = Fo.exports;
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.formatLimitDefinition = void 0;
  const e = qP, r = ie, n = r.operators, s = {
    formatMaximum: { okStr: "<=", ok: n.LTE, fail: n.GT },
    formatMinimum: { okStr: ">=", ok: n.GTE, fail: n.LT },
    formatExclusiveMaximum: { okStr: "<", ok: n.LT, fail: n.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: n.GT, fail: n.LTE }
  }, a = {
    message: ({ keyword: i, schemaCode: c }) => (0, r.str)`should be ${s[i].okStr} ${c}`,
    params: ({ keyword: i, schemaCode: c }) => (0, r._)`{comparison: ${s[i].okStr}, limit: ${c}}`
  };
  t.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: a,
    code(i) {
      const { gen: c, data: u, schemaCode: l, keyword: f, it: v } = i, { opts: g, self: y } = v;
      if (!g.validateFormats)
        return;
      const w = new e.KeywordCxt(v, y.RULES.all.format.definition, "format");
      w.$data ? $() : m();
      function $() {
        const R = c.scopeValue("formats", {
          ref: y.formats,
          code: g.code.formats
        }), N = c.const("fmt", (0, r._)`${R}[${w.schemaCode}]`);
        i.fail$data((0, r.or)((0, r._)`typeof ${N} != "object"`, (0, r._)`${N} instanceof RegExp`, (0, r._)`typeof ${N}.compare != "function"`, E(N)));
      }
      function m() {
        const R = w.schema, N = y.formats[R];
        if (!N || N === !0)
          return;
        if (typeof N != "object" || N instanceof RegExp || typeof N.compare != "function")
          throw new Error(`"${f}": format "${R}" does not define "compare" function`);
        const O = c.scopeValue("formats", {
          key: R,
          ref: N,
          code: g.code.formats ? (0, r._)`${g.code.formats}${(0, r.getProperty)(R)}` : void 0
        });
        i.fail$data(E(O));
      }
      function E(R) {
        return (0, r._)`${R}.compare(${u}, ${l}) ${s[f].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const o = (i) => (i.addKeyword(t.formatLimitDefinition), i);
  t.default = o;
})(xf);
(function(t, e) {
  Object.defineProperty(e, "__esModule", { value: !0 });
  const r = Uf, n = xf, s = ie, a = new s.Name("fullFormats"), o = new s.Name("fastFormats"), i = (u, l = { keywords: !0 }) => {
    if (Array.isArray(l))
      return c(u, l, r.fullFormats, a), u;
    const [f, v] = l.mode === "fast" ? [r.fastFormats, o] : [r.fullFormats, a], g = l.formats || r.formatNames;
    return c(u, g, f, v), l.keywords && (0, n.default)(u), u;
  };
  i.get = (u, l = "full") => {
    const v = (l === "fast" ? r.fastFormats : r.fullFormats)[u];
    if (!v)
      throw new Error(`Unknown format "${u}"`);
    return v;
  };
  function c(u, l, f, v) {
    var g, y;
    (g = (y = u.opts.code).formats) !== null && g !== void 0 || (y.formats = (0, s._)`require("ajv-formats/dist/formats").${v}`);
    for (const w of l)
      u.addFormat(w, f[w]);
  }
  t.exports = e = i, Object.defineProperty(e, "__esModule", { value: !0 }), e.default = i;
})(Lo, Lo.exports);
var KP = Lo.exports;
const GP = /* @__PURE__ */ xd(KP), ZP = (t, e, r, n) => {
  if (r === "length" || r === "prototype" || r === "arguments" || r === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(t, r), a = Object.getOwnPropertyDescriptor(e, r);
  !HP(s, a) && n || Object.defineProperty(t, r, a);
}, HP = function(t, e) {
  return t === void 0 || t.configurable || t.writable === e.writable && t.enumerable === e.enumerable && t.configurable === e.configurable && (t.writable || t.value === e.value);
}, BP = (t, e) => {
  const r = Object.getPrototypeOf(e);
  r !== Object.getPrototypeOf(t) && Object.setPrototypeOf(t, r);
}, WP = (t, e) => `/* Wrapped ${t}*/
${e}`, JP = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), XP = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), YP = (t, e, r) => {
  const n = r === "" ? "" : `with ${r.trim()}() `, s = WP.bind(null, n, e.toString());
  Object.defineProperty(s, "name", XP);
  const { writable: a, enumerable: o, configurable: i } = JP;
  Object.defineProperty(t, "toString", { value: s, writable: a, enumerable: o, configurable: i });
};
function QP(t, e, { ignoreNonConfigurable: r = !1 } = {}) {
  const { name: n } = t;
  for (const s of Reflect.ownKeys(e))
    ZP(t, e, s, r);
  return BP(t, e), YP(t, e, n), t;
}
const El = (t, e = {}) => {
  if (typeof t != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof t}\``);
  const {
    wait: r = 0,
    maxWait: n = Number.POSITIVE_INFINITY,
    before: s = !1,
    after: a = !0
  } = e;
  if (r < 0 || n < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!s && !a)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let o, i, c;
  const u = function(...l) {
    const f = this, v = () => {
      o = void 0, i && (clearTimeout(i), i = void 0), a && (c = t.apply(f, l));
    }, g = () => {
      i = void 0, o && (clearTimeout(o), o = void 0), a && (c = t.apply(f, l));
    }, y = s && !o;
    return clearTimeout(o), o = setTimeout(v, r), n > 0 && n !== Number.POSITIVE_INFINITY && !i && (i = setTimeout(g, n)), y && (c = t.apply(f, l)), c;
  };
  return QP(u, t), u.cancel = () => {
    o && (clearTimeout(o), o = void 0), i && (clearTimeout(i), i = void 0);
  }, u;
};
var Ho = { exports: {} };
const eR = "2.0.0", kh = 256, tR = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, rR = 16, nR = kh - 6, sR = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var za = {
  MAX_LENGTH: kh,
  MAX_SAFE_COMPONENT_LENGTH: rR,
  MAX_SAFE_BUILD_LENGTH: nR,
  MAX_SAFE_INTEGER: tR,
  RELEASE_TYPES: sR,
  SEMVER_SPEC_VERSION: eR,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const aR = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...t) => console.error("SEMVER", ...t) : () => {
};
var Ua = aR;
(function(t, e) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: r,
    MAX_SAFE_BUILD_LENGTH: n,
    MAX_LENGTH: s
  } = za, a = Ua;
  e = t.exports = {};
  const o = e.re = [], i = e.safeRe = [], c = e.src = [], u = e.t = {};
  let l = 0;
  const f = "[a-zA-Z0-9-]", v = [
    ["\\s", 1],
    ["\\d", s],
    [f, n]
  ], g = (w) => {
    for (const [$, m] of v)
      w = w.split(`${$}*`).join(`${$}{0,${m}}`).split(`${$}+`).join(`${$}{1,${m}}`);
    return w;
  }, y = (w, $, m) => {
    const E = g($), R = l++;
    a(w, R, $), u[w] = R, c[R] = $, o[R] = new RegExp($, m ? "g" : void 0), i[R] = new RegExp(E, m ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${f}*`), y("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${c[u.NUMERICIDENTIFIER]}|${c[u.NONNUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NUMERICIDENTIFIERLOOSE]}|${c[u.NONNUMERICIDENTIFIER]})`), y("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${f}+`), y("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), y("FULL", `^${c[u.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), y("LOOSE", `^${c[u.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), y("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${r}})(?:\\.(\\d{1,${r}}))?(?:\\.(\\d{1,${r}}))?`), y("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", c[u.COERCE], !0), y("COERCERTLFULL", c[u.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", y("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", y("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Ho, Ho.exports);
var Ns = Ho.exports;
const oR = Object.freeze({ loose: !0 }), iR = Object.freeze({}), cR = (t) => t ? typeof t != "object" ? oR : t : iR;
var Gc = cR;
const bl = /^[0-9]+$/, Ih = (t, e) => {
  const r = bl.test(t), n = bl.test(e);
  return r && n && (t = +t, e = +e), t === e ? 0 : r && !n ? -1 : n && !r ? 1 : t < e ? -1 : 1;
}, uR = (t, e) => Ih(e, t);
var Ch = {
  compareIdentifiers: Ih,
  rcompareIdentifiers: uR
};
const zs = Ua, { MAX_LENGTH: Sl, MAX_SAFE_INTEGER: Us } = za, { safeRe: Pl, t: Rl } = Ns, lR = Gc, { compareIdentifiers: qr } = Ch;
let dR = class yt {
  constructor(e, r) {
    if (r = lR(r), e instanceof yt) {
      if (e.loose === !!r.loose && e.includePrerelease === !!r.includePrerelease)
        return e;
      e = e.version;
    } else if (typeof e != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof e}".`);
    if (e.length > Sl)
      throw new TypeError(
        `version is longer than ${Sl} characters`
      );
    zs("SemVer", e, r), this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease;
    const n = e.trim().match(r.loose ? Pl[Rl.LOOSE] : Pl[Rl.FULL]);
    if (!n)
      throw new TypeError(`Invalid Version: ${e}`);
    if (this.raw = e, this.major = +n[1], this.minor = +n[2], this.patch = +n[3], this.major > Us || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Us || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Us || this.patch < 0)
      throw new TypeError("Invalid patch version");
    n[4] ? this.prerelease = n[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const a = +s;
        if (a >= 0 && a < Us)
          return a;
      }
      return s;
    }) : this.prerelease = [], this.build = n[5] ? n[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(e) {
    if (zs("SemVer.compare", this.version, this.options, e), !(e instanceof yt)) {
      if (typeof e == "string" && e === this.version)
        return 0;
      e = new yt(e, this.options);
    }
    return e.version === this.version ? 0 : this.compareMain(e) || this.comparePre(e);
  }
  compareMain(e) {
    return e instanceof yt || (e = new yt(e, this.options)), qr(this.major, e.major) || qr(this.minor, e.minor) || qr(this.patch, e.patch);
  }
  comparePre(e) {
    if (e instanceof yt || (e = new yt(e, this.options)), this.prerelease.length && !e.prerelease.length)
      return -1;
    if (!this.prerelease.length && e.prerelease.length)
      return 1;
    if (!this.prerelease.length && !e.prerelease.length)
      return 0;
    let r = 0;
    do {
      const n = this.prerelease[r], s = e.prerelease[r];
      if (zs("prerelease compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return qr(n, s);
    } while (++r);
  }
  compareBuild(e) {
    e instanceof yt || (e = new yt(e, this.options));
    let r = 0;
    do {
      const n = this.build[r], s = e.build[r];
      if (zs("build compare", r, n, s), n === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (n === void 0)
        return -1;
      if (n === s)
        continue;
      return qr(n, s);
    } while (++r);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(e, r, n) {
    switch (e) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r, n);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r, n);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", r, n), this.inc("pre", r, n);
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const s = Number(n) ? 1 : 0;
        if (!r && n === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let a = this.prerelease.length;
          for (; --a >= 0; )
            typeof this.prerelease[a] == "number" && (this.prerelease[a]++, a = -2);
          if (a === -1) {
            if (r === this.prerelease.join(".") && n === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (r) {
          let a = [r, s];
          n === !1 && (a = [r]), qr(this.prerelease[0], r) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = a) : this.prerelease = a;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${e}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ke = dR;
const Nl = Ke, fR = (t, e, r = !1) => {
  if (t instanceof Nl)
    return t;
  try {
    return new Nl(t, e);
  } catch (n) {
    if (!r)
      return null;
    throw n;
  }
};
var Sn = fR;
const hR = Sn, mR = (t, e) => {
  const r = hR(t, e);
  return r ? r.version : null;
};
var pR = mR;
const yR = Sn, $R = (t, e) => {
  const r = yR(t.trim().replace(/^[=v]+/, ""), e);
  return r ? r.version : null;
};
var gR = $R;
const Ol = Ke, _R = (t, e, r, n, s) => {
  typeof r == "string" && (s = n, n = r, r = void 0);
  try {
    return new Ol(
      t instanceof Ol ? t.version : t,
      r
    ).inc(e, n, s).version;
  } catch {
    return null;
  }
};
var vR = _R;
const Tl = Sn, wR = (t, e) => {
  const r = Tl(t, null, !0), n = Tl(e, null, !0), s = r.compare(n);
  if (s === 0)
    return null;
  const a = s > 0, o = a ? r : n, i = a ? n : r, c = !!o.prerelease.length;
  if (!!i.prerelease.length && !c)
    return !i.patch && !i.minor ? "major" : o.patch ? "patch" : o.minor ? "minor" : "major";
  const l = c ? "pre" : "";
  return r.major !== n.major ? l + "major" : r.minor !== n.minor ? l + "minor" : r.patch !== n.patch ? l + "patch" : "prerelease";
};
var ER = wR;
const bR = Ke, SR = (t, e) => new bR(t, e).major;
var PR = SR;
const RR = Ke, NR = (t, e) => new RR(t, e).minor;
var OR = NR;
const TR = Ke, kR = (t, e) => new TR(t, e).patch;
var IR = kR;
const CR = Sn, jR = (t, e) => {
  const r = CR(t, e);
  return r && r.prerelease.length ? r.prerelease : null;
};
var AR = jR;
const kl = Ke, DR = (t, e, r) => new kl(t, r).compare(new kl(e, r));
var ht = DR;
const MR = ht, VR = (t, e, r) => MR(e, t, r);
var LR = VR;
const FR = ht, zR = (t, e) => FR(t, e, !0);
var UR = zR;
const Il = Ke, xR = (t, e, r) => {
  const n = new Il(t, r), s = new Il(e, r);
  return n.compare(s) || n.compareBuild(s);
};
var Zc = xR;
const qR = Zc, KR = (t, e) => t.sort((r, n) => qR(r, n, e));
var GR = KR;
const ZR = Zc, HR = (t, e) => t.sort((r, n) => ZR(n, r, e));
var BR = HR;
const WR = ht, JR = (t, e, r) => WR(t, e, r) > 0;
var xa = JR;
const XR = ht, YR = (t, e, r) => XR(t, e, r) < 0;
var Hc = YR;
const QR = ht, eN = (t, e, r) => QR(t, e, r) === 0;
var jh = eN;
const tN = ht, rN = (t, e, r) => tN(t, e, r) !== 0;
var Ah = rN;
const nN = ht, sN = (t, e, r) => nN(t, e, r) >= 0;
var Bc = sN;
const aN = ht, oN = (t, e, r) => aN(t, e, r) <= 0;
var Wc = oN;
const iN = jh, cN = Ah, uN = xa, lN = Bc, dN = Hc, fN = Wc, hN = (t, e, r, n) => {
  switch (e) {
    case "===":
      return typeof t == "object" && (t = t.version), typeof r == "object" && (r = r.version), t === r;
    case "!==":
      return typeof t == "object" && (t = t.version), typeof r == "object" && (r = r.version), t !== r;
    case "":
    case "=":
    case "==":
      return iN(t, r, n);
    case "!=":
      return cN(t, r, n);
    case ">":
      return uN(t, r, n);
    case ">=":
      return lN(t, r, n);
    case "<":
      return dN(t, r, n);
    case "<=":
      return fN(t, r, n);
    default:
      throw new TypeError(`Invalid operator: ${e}`);
  }
};
var Dh = hN;
const mN = Ke, pN = Sn, { safeRe: xs, t: qs } = Ns, yN = (t, e) => {
  if (t instanceof mN)
    return t;
  if (typeof t == "number" && (t = String(t)), typeof t != "string")
    return null;
  e = e || {};
  let r = null;
  if (!e.rtl)
    r = t.match(e.includePrerelease ? xs[qs.COERCEFULL] : xs[qs.COERCE]);
  else {
    const c = e.includePrerelease ? xs[qs.COERCERTLFULL] : xs[qs.COERCERTL];
    let u;
    for (; (u = c.exec(t)) && (!r || r.index + r[0].length !== t.length); )
      (!r || u.index + u[0].length !== r.index + r[0].length) && (r = u), c.lastIndex = u.index + u[1].length + u[2].length;
    c.lastIndex = -1;
  }
  if (r === null)
    return null;
  const n = r[2], s = r[3] || "0", a = r[4] || "0", o = e.includePrerelease && r[5] ? `-${r[5]}` : "", i = e.includePrerelease && r[6] ? `+${r[6]}` : "";
  return pN(`${n}.${s}.${a}${o}${i}`, e);
};
var $N = yN;
class gN {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(e) {
    const r = this.map.get(e);
    if (r !== void 0)
      return this.map.delete(e), this.map.set(e, r), r;
  }
  delete(e) {
    return this.map.delete(e);
  }
  set(e, r) {
    if (!this.delete(e) && r !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(e, r);
    }
    return this;
  }
}
var _N = gN, uo, Cl;
function mt() {
  if (Cl) return uo;
  Cl = 1;
  const t = /\s+/g;
  class e {
    constructor(C, z) {
      if (z = s(z), C instanceof e)
        return C.loose === !!z.loose && C.includePrerelease === !!z.includePrerelease ? C : new e(C.raw, z);
      if (C instanceof a)
        return this.raw = C.value, this.set = [[C]], this.formatted = void 0, this;
      if (this.options = z, this.loose = !!z.loose, this.includePrerelease = !!z.includePrerelease, this.raw = C.trim().replace(t, " "), this.set = this.raw.split("||").map((L) => this.parseRange(L.trim())).filter((L) => L.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const L = this.set[0];
        if (this.set = this.set.filter((B) => !w(B[0])), this.set.length === 0)
          this.set = [L];
        else if (this.set.length > 1) {
          for (const B of this.set)
            if (B.length === 1 && $(B[0])) {
              this.set = [B];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let C = 0; C < this.set.length; C++) {
          C > 0 && (this.formatted += "||");
          const z = this.set[C];
          for (let L = 0; L < z.length; L++)
            L > 0 && (this.formatted += " "), this.formatted += z[L].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(C) {
      const L = ((this.options.includePrerelease && g) | (this.options.loose && y)) + ":" + C, B = n.get(L);
      if (B)
        return B;
      const F = this.options.loose, P = F ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
      C = C.replace(P, W(this.options.includePrerelease)), o("hyphen replace", C), C = C.replace(c[u.COMPARATORTRIM], l), o("comparator trim", C), C = C.replace(c[u.TILDETRIM], f), o("tilde trim", C), C = C.replace(c[u.CARETTRIM], v), o("caret trim", C);
      let p = C.split(" ").map((h) => E(h, this.options)).join(" ").split(/\s+/).map((h) => G(h, this.options));
      F && (p = p.filter((h) => (o("loose invalid filter", h, this.options), !!h.match(c[u.COMPARATORLOOSE])))), o("range list", p);
      const S = /* @__PURE__ */ new Map(), _ = p.map((h) => new a(h, this.options));
      for (const h of _) {
        if (w(h))
          return [h];
        S.set(h.value, h);
      }
      S.size > 1 && S.has("") && S.delete("");
      const d = [...S.values()];
      return n.set(L, d), d;
    }
    intersects(C, z) {
      if (!(C instanceof e))
        throw new TypeError("a Range is required");
      return this.set.some((L) => m(L, z) && C.set.some((B) => m(B, z) && L.every((F) => B.every((P) => F.intersects(P, z)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(C) {
      if (!C)
        return !1;
      if (typeof C == "string")
        try {
          C = new i(C, this.options);
        } catch {
          return !1;
        }
      for (let z = 0; z < this.set.length; z++)
        if (me(this.set[z], C, this.options))
          return !0;
      return !1;
    }
  }
  uo = e;
  const r = _N, n = new r(), s = Gc, a = qa(), o = Ua, i = Ke, {
    safeRe: c,
    t: u,
    comparatorTrimReplace: l,
    tildeTrimReplace: f,
    caretTrimReplace: v
  } = Ns, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: y } = za, w = (k) => k.value === "<0.0.0-0", $ = (k) => k.value === "", m = (k, C) => {
    let z = !0;
    const L = k.slice();
    let B = L.pop();
    for (; z && L.length; )
      z = L.every((F) => B.intersects(F, C)), B = L.pop();
    return z;
  }, E = (k, C) => (o("comp", k, C), k = q(k, C), o("caret", k), k = N(k, C), o("tildes", k), k = $e(k, C), o("xrange", k), k = Re(k, C), o("stars", k), k), R = (k) => !k || k.toLowerCase() === "x" || k === "*", N = (k, C) => k.trim().split(/\s+/).map((z) => O(z, C)).join(" "), O = (k, C) => {
    const z = C.loose ? c[u.TILDELOOSE] : c[u.TILDE];
    return k.replace(z, (L, B, F, P, p) => {
      o("tilde", k, L, B, F, P, p);
      let S;
      return R(B) ? S = "" : R(F) ? S = `>=${B}.0.0 <${+B + 1}.0.0-0` : R(P) ? S = `>=${B}.${F}.0 <${B}.${+F + 1}.0-0` : p ? (o("replaceTilde pr", p), S = `>=${B}.${F}.${P}-${p} <${B}.${+F + 1}.0-0`) : S = `>=${B}.${F}.${P} <${B}.${+F + 1}.0-0`, o("tilde return", S), S;
    });
  }, q = (k, C) => k.trim().split(/\s+/).map((z) => Y(z, C)).join(" "), Y = (k, C) => {
    o("caret", k, C);
    const z = C.loose ? c[u.CARETLOOSE] : c[u.CARET], L = C.includePrerelease ? "-0" : "";
    return k.replace(z, (B, F, P, p, S) => {
      o("caret", k, B, F, P, p, S);
      let _;
      return R(F) ? _ = "" : R(P) ? _ = `>=${F}.0.0${L} <${+F + 1}.0.0-0` : R(p) ? F === "0" ? _ = `>=${F}.${P}.0${L} <${F}.${+P + 1}.0-0` : _ = `>=${F}.${P}.0${L} <${+F + 1}.0.0-0` : S ? (o("replaceCaret pr", S), F === "0" ? P === "0" ? _ = `>=${F}.${P}.${p}-${S} <${F}.${P}.${+p + 1}-0` : _ = `>=${F}.${P}.${p}-${S} <${F}.${+P + 1}.0-0` : _ = `>=${F}.${P}.${p}-${S} <${+F + 1}.0.0-0`) : (o("no pr"), F === "0" ? P === "0" ? _ = `>=${F}.${P}.${p}${L} <${F}.${P}.${+p + 1}-0` : _ = `>=${F}.${P}.${p}${L} <${F}.${+P + 1}.0-0` : _ = `>=${F}.${P}.${p} <${+F + 1}.0.0-0`), o("caret return", _), _;
    });
  }, $e = (k, C) => (o("replaceXRanges", k, C), k.split(/\s+/).map((z) => be(z, C)).join(" ")), be = (k, C) => {
    k = k.trim();
    const z = C.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
    return k.replace(z, (L, B, F, P, p, S) => {
      o("xRange", k, L, B, F, P, p, S);
      const _ = R(F), d = _ || R(P), h = d || R(p), b = h;
      return B === "=" && b && (B = ""), S = C.includePrerelease ? "-0" : "", _ ? B === ">" || B === "<" ? L = "<0.0.0-0" : L = "*" : B && b ? (d && (P = 0), p = 0, B === ">" ? (B = ">=", d ? (F = +F + 1, P = 0, p = 0) : (P = +P + 1, p = 0)) : B === "<=" && (B = "<", d ? F = +F + 1 : P = +P + 1), B === "<" && (S = "-0"), L = `${B + F}.${P}.${p}${S}`) : d ? L = `>=${F}.0.0${S} <${+F + 1}.0.0-0` : h && (L = `>=${F}.${P}.0${S} <${F}.${+P + 1}.0-0`), o("xRange return", L), L;
    });
  }, Re = (k, C) => (o("replaceStars", k, C), k.trim().replace(c[u.STAR], "")), G = (k, C) => (o("replaceGTE0", k, C), k.trim().replace(c[C.includePrerelease ? u.GTE0PRE : u.GTE0], "")), W = (k) => (C, z, L, B, F, P, p, S, _, d, h, b) => (R(L) ? z = "" : R(B) ? z = `>=${L}.0.0${k ? "-0" : ""}` : R(F) ? z = `>=${L}.${B}.0${k ? "-0" : ""}` : P ? z = `>=${z}` : z = `>=${z}${k ? "-0" : ""}`, R(_) ? S = "" : R(d) ? S = `<${+_ + 1}.0.0-0` : R(h) ? S = `<${_}.${+d + 1}.0-0` : b ? S = `<=${_}.${d}.${h}-${b}` : k ? S = `<${_}.${d}.${+h + 1}-0` : S = `<=${S}`, `${z} ${S}`.trim()), me = (k, C, z) => {
    for (let L = 0; L < k.length; L++)
      if (!k[L].test(C))
        return !1;
    if (C.prerelease.length && !z.includePrerelease) {
      for (let L = 0; L < k.length; L++)
        if (o(k[L].semver), k[L].semver !== a.ANY && k[L].semver.prerelease.length > 0) {
          const B = k[L].semver;
          if (B.major === C.major && B.minor === C.minor && B.patch === C.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return uo;
}
var lo, jl;
function qa() {
  if (jl) return lo;
  jl = 1;
  const t = Symbol("SemVer ANY");
  class e {
    static get ANY() {
      return t;
    }
    constructor(l, f) {
      if (f = r(f), l instanceof e) {
        if (l.loose === !!f.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), o("comparator", l, f), this.options = f, this.loose = !!f.loose, this.parse(l), this.semver === t ? this.value = "" : this.value = this.operator + this.semver.version, o("comp", this);
    }
    parse(l) {
      const f = this.options.loose ? n[s.COMPARATORLOOSE] : n[s.COMPARATOR], v = l.match(f);
      if (!v)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = v[1] !== void 0 ? v[1] : "", this.operator === "=" && (this.operator = ""), v[2] ? this.semver = new i(v[2], this.options.loose) : this.semver = t;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (o("Comparator.test", l, this.options.loose), this.semver === t || l === t)
        return !0;
      if (typeof l == "string")
        try {
          l = new i(l, this.options);
        } catch {
          return !1;
        }
      return a(l, this.operator, this.semver, this.options);
    }
    intersects(l, f) {
      if (!(l instanceof e))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, f).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, f).test(l.semver) : (f = r(f), f.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || a(this.semver, "<", l.semver, f) && this.operator.startsWith(">") && l.operator.startsWith("<") || a(this.semver, ">", l.semver, f) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  lo = e;
  const r = Gc, { safeRe: n, t: s } = Ns, a = Dh, o = Ua, i = Ke, c = mt();
  return lo;
}
const vN = mt(), wN = (t, e, r) => {
  try {
    e = new vN(e, r);
  } catch {
    return !1;
  }
  return e.test(t);
};
var Ka = wN;
const EN = mt(), bN = (t, e) => new EN(t, e).set.map((r) => r.map((n) => n.value).join(" ").trim().split(" "));
var SN = bN;
const PN = Ke, RN = mt(), NN = (t, e, r) => {
  let n = null, s = null, a = null;
  try {
    a = new RN(e, r);
  } catch {
    return null;
  }
  return t.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === -1) && (n = o, s = new PN(n, r));
  }), n;
};
var ON = NN;
const TN = Ke, kN = mt(), IN = (t, e, r) => {
  let n = null, s = null, a = null;
  try {
    a = new kN(e, r);
  } catch {
    return null;
  }
  return t.forEach((o) => {
    a.test(o) && (!n || s.compare(o) === 1) && (n = o, s = new TN(n, r));
  }), n;
};
var CN = IN;
const fo = Ke, jN = mt(), Al = xa, AN = (t, e) => {
  t = new jN(t, e);
  let r = new fo("0.0.0");
  if (t.test(r) || (r = new fo("0.0.0-0"), t.test(r)))
    return r;
  r = null;
  for (let n = 0; n < t.set.length; ++n) {
    const s = t.set[n];
    let a = null;
    s.forEach((o) => {
      const i = new fo(o.semver.version);
      switch (o.operator) {
        case ">":
          i.prerelease.length === 0 ? i.patch++ : i.prerelease.push(0), i.raw = i.format();
        case "":
        case ">=":
          (!a || Al(i, a)) && (a = i);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${o.operator}`);
      }
    }), a && (!r || Al(r, a)) && (r = a);
  }
  return r && t.test(r) ? r : null;
};
var DN = AN;
const MN = mt(), VN = (t, e) => {
  try {
    return new MN(t, e).range || "*";
  } catch {
    return null;
  }
};
var LN = VN;
const FN = Ke, Mh = qa(), { ANY: zN } = Mh, UN = mt(), xN = Ka, Dl = xa, Ml = Hc, qN = Wc, KN = Bc, GN = (t, e, r, n) => {
  t = new FN(t, n), e = new UN(e, n);
  let s, a, o, i, c;
  switch (r) {
    case ">":
      s = Dl, a = qN, o = Ml, i = ">", c = ">=";
      break;
    case "<":
      s = Ml, a = KN, o = Dl, i = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (xN(t, e, n))
    return !1;
  for (let u = 0; u < e.set.length; ++u) {
    const l = e.set[u];
    let f = null, v = null;
    if (l.forEach((g) => {
      g.semver === zN && (g = new Mh(">=0.0.0")), f = f || g, v = v || g, s(g.semver, f.semver, n) ? f = g : o(g.semver, v.semver, n) && (v = g);
    }), f.operator === i || f.operator === c || (!v.operator || v.operator === i) && a(t, v.semver))
      return !1;
    if (v.operator === c && o(t, v.semver))
      return !1;
  }
  return !0;
};
var Jc = GN;
const ZN = Jc, HN = (t, e, r) => ZN(t, e, ">", r);
var BN = HN;
const WN = Jc, JN = (t, e, r) => WN(t, e, "<", r);
var XN = JN;
const Vl = mt(), YN = (t, e, r) => (t = new Vl(t, r), e = new Vl(e, r), t.intersects(e, r));
var QN = YN;
const eO = Ka, tO = ht;
var rO = (t, e, r) => {
  const n = [];
  let s = null, a = null;
  const o = t.sort((l, f) => tO(l, f, r));
  for (const l of o)
    eO(l, e, r) ? (a = l, s || (s = l)) : (a && n.push([s, a]), a = null, s = null);
  s && n.push([s, null]);
  const i = [];
  for (const [l, f] of n)
    l === f ? i.push(l) : !f && l === o[0] ? i.push("*") : f ? l === o[0] ? i.push(`<=${f}`) : i.push(`${l} - ${f}`) : i.push(`>=${l}`);
  const c = i.join(" || "), u = typeof e.raw == "string" ? e.raw : String(e);
  return c.length < u.length ? c : e;
};
const Ll = mt(), Xc = qa(), { ANY: ho } = Xc, Dn = Ka, Yc = ht, nO = (t, e, r = {}) => {
  if (t === e)
    return !0;
  t = new Ll(t, r), e = new Ll(e, r);
  let n = !1;
  e: for (const s of t.set) {
    for (const a of e.set) {
      const o = aO(s, a, r);
      if (n = n || o !== null, o)
        continue e;
    }
    if (n)
      return !1;
  }
  return !0;
}, sO = [new Xc(">=0.0.0-0")], Fl = [new Xc(">=0.0.0")], aO = (t, e, r) => {
  if (t === e)
    return !0;
  if (t.length === 1 && t[0].semver === ho) {
    if (e.length === 1 && e[0].semver === ho)
      return !0;
    r.includePrerelease ? t = sO : t = Fl;
  }
  if (e.length === 1 && e[0].semver === ho) {
    if (r.includePrerelease)
      return !0;
    e = Fl;
  }
  const n = /* @__PURE__ */ new Set();
  let s, a;
  for (const g of t)
    g.operator === ">" || g.operator === ">=" ? s = zl(s, g, r) : g.operator === "<" || g.operator === "<=" ? a = Ul(a, g, r) : n.add(g.semver);
  if (n.size > 1)
    return null;
  let o;
  if (s && a) {
    if (o = Yc(s.semver, a.semver, r), o > 0)
      return null;
    if (o === 0 && (s.operator !== ">=" || a.operator !== "<="))
      return null;
  }
  for (const g of n) {
    if (s && !Dn(g, String(s), r) || a && !Dn(g, String(a), r))
      return null;
    for (const y of e)
      if (!Dn(g, String(y), r))
        return !1;
    return !0;
  }
  let i, c, u, l, f = a && !r.includePrerelease && a.semver.prerelease.length ? a.semver : !1, v = s && !r.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  f && f.prerelease.length === 1 && a.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const g of e) {
    if (l = l || g.operator === ">" || g.operator === ">=", u = u || g.operator === "<" || g.operator === "<=", s) {
      if (v && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === v.major && g.semver.minor === v.minor && g.semver.patch === v.patch && (v = !1), g.operator === ">" || g.operator === ">=") {
        if (i = zl(s, g, r), i === g && i !== s)
          return !1;
      } else if (s.operator === ">=" && !Dn(s.semver, String(g), r))
        return !1;
    }
    if (a) {
      if (f && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === f.major && g.semver.minor === f.minor && g.semver.patch === f.patch && (f = !1), g.operator === "<" || g.operator === "<=") {
        if (c = Ul(a, g, r), c === g && c !== a)
          return !1;
      } else if (a.operator === "<=" && !Dn(a.semver, String(g), r))
        return !1;
    }
    if (!g.operator && (a || s) && o !== 0)
      return !1;
  }
  return !(s && u && !a && o !== 0 || a && l && !s && o !== 0 || v || f);
}, zl = (t, e, r) => {
  if (!t)
    return e;
  const n = Yc(t.semver, e.semver, r);
  return n > 0 ? t : n < 0 || e.operator === ">" && t.operator === ">=" ? e : t;
}, Ul = (t, e, r) => {
  if (!t)
    return e;
  const n = Yc(t.semver, e.semver, r);
  return n < 0 ? t : n > 0 || e.operator === "<" && t.operator === "<=" ? e : t;
};
var oO = nO;
const mo = Ns, xl = za, iO = Ke, ql = Ch, cO = Sn, uO = pR, lO = gR, dO = vR, fO = ER, hO = PR, mO = OR, pO = IR, yO = AR, $O = ht, gO = LR, _O = UR, vO = Zc, wO = GR, EO = BR, bO = xa, SO = Hc, PO = jh, RO = Ah, NO = Bc, OO = Wc, TO = Dh, kO = $N, IO = qa(), CO = mt(), jO = Ka, AO = SN, DO = ON, MO = CN, VO = DN, LO = LN, FO = Jc, zO = BN, UO = XN, xO = QN, qO = rO, KO = oO;
var GO = {
  parse: cO,
  valid: uO,
  clean: lO,
  inc: dO,
  diff: fO,
  major: hO,
  minor: mO,
  patch: pO,
  prerelease: yO,
  compare: $O,
  rcompare: gO,
  compareLoose: _O,
  compareBuild: vO,
  sort: wO,
  rsort: EO,
  gt: bO,
  lt: SO,
  eq: PO,
  neq: RO,
  gte: NO,
  lte: OO,
  cmp: TO,
  coerce: kO,
  Comparator: IO,
  Range: CO,
  satisfies: jO,
  toComparators: AO,
  maxSatisfying: DO,
  minSatisfying: MO,
  minVersion: VO,
  validRange: LO,
  outside: FO,
  gtr: zO,
  ltr: UO,
  intersects: xO,
  simplifyRange: qO,
  subset: KO,
  SemVer: iO,
  re: mo.re,
  src: mo.src,
  tokens: mo.t,
  SEMVER_SPEC_VERSION: xl.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: xl.RELEASE_TYPES,
  compareIdentifiers: ql.compareIdentifiers,
  rcompareIdentifiers: ql.rcompareIdentifiers
};
const Kr = /* @__PURE__ */ xd(GO), ZO = Object.prototype.toString, HO = "[object Uint8Array]", BO = "[object ArrayBuffer]";
function Vh(t, e, r) {
  return t ? t.constructor === e ? !0 : ZO.call(t) === r : !1;
}
function Lh(t) {
  return Vh(t, Uint8Array, HO);
}
function WO(t) {
  return Vh(t, ArrayBuffer, BO);
}
function JO(t) {
  return Lh(t) || WO(t);
}
function XO(t) {
  if (!Lh(t))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof t}\``);
}
function YO(t) {
  if (!JO(t))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof t}\``);
}
function Kl(t, e) {
  if (t.length === 0)
    return new Uint8Array(0);
  e ?? (e = t.reduce((s, a) => s + a.length, 0));
  const r = new Uint8Array(e);
  let n = 0;
  for (const s of t)
    XO(s), r.set(s, n), n += s.length;
  return r;
}
const Ks = {
  utf8: new globalThis.TextDecoder("utf8")
};
function Gl(t, e = "utf8") {
  return YO(t), Ks[e] ?? (Ks[e] = new globalThis.TextDecoder(e)), Ks[e].decode(t);
}
function QO(t) {
  if (typeof t != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof t}\``);
}
const eT = new globalThis.TextEncoder();
function po(t) {
  return QO(t), eT.encode(t);
}
Array.from({ length: 256 }, (t, e) => e.toString(16).padStart(2, "0"));
const tT = GP.default, Zl = "aes-256-cbc", Gr = () => /* @__PURE__ */ Object.create(null), rT = (t) => t != null, nT = (t, e) => {
  const r = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), n = typeof e;
  if (r.has(n))
    throw new TypeError(`Setting a value of type \`${n}\` for key \`${t}\` is not allowed as it's not supported by JSON`);
}, ta = "__internal__", yo = `${ta}.migrations.version`;
var Jt, It, Je, Ct;
class sT {
  constructor(e = {}) {
    Nn(this, "path");
    Nn(this, "events");
    On(this, Jt);
    On(this, It);
    On(this, Je);
    On(this, Ct, {});
    Nn(this, "_deserialize", (e) => JSON.parse(e));
    Nn(this, "_serialize", (e) => JSON.stringify(e, void 0, "	"));
    const r = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...e
    };
    if (!r.cwd) {
      if (!r.projectName)
        throw new Error("Please specify the `projectName` option.");
      r.cwd = Ny(r.projectName, { suffix: r.projectSuffix }).config;
    }
    if (Tn(this, Je, r), r.schema ?? r.ajvOptions ?? r.rootSchema) {
      if (r.schema && typeof r.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const o = new CE.Ajv2020({
        allErrors: !0,
        useDefaults: !0,
        ...r.ajvOptions
      });
      tT(o);
      const i = {
        ...r.rootSchema,
        type: "object",
        properties: r.schema
      };
      Tn(this, Jt, o.compile(i));
      for (const [c, u] of Object.entries(r.schema ?? {}))
        u != null && u.default && (ve(this, Ct)[c] = u.default);
    }
    r.defaults && Tn(this, Ct, {
      ...ve(this, Ct),
      ...r.defaults
    }), r.serialize && (this._serialize = r.serialize), r.deserialize && (this._deserialize = r.deserialize), this.events = new EventTarget(), Tn(this, It, r.encryptionKey);
    const n = r.fileExtension ? `.${r.fileExtension}` : "";
    this.path = de.resolve(r.cwd, `${r.configName ?? "config"}${n}`);
    const s = this.store, a = Object.assign(Gr(), r.defaults, s);
    if (r.migrations) {
      if (!r.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(r.migrations, r.projectVersion, r.beforeEachMigration);
    }
    this._validate(a);
    try {
      Bh.deepEqual(s, a);
    } catch {
      this.store = a;
    }
    r.watch && this._watch();
  }
  get(e, r) {
    if (ve(this, Je).accessPropertiesByDotNotation)
      return this._get(e, r);
    const { store: n } = this;
    return e in n ? n[e] : r;
  }
  set(e, r) {
    if (typeof e != "string" && typeof e != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof e}`);
    if (typeof e != "object" && r === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(e))
      throw new TypeError(`Please don't use the ${ta} key, as it's used to manage this module internal operations.`);
    const { store: n } = this, s = (a, o) => {
      nT(a, o), ve(this, Je).accessPropertiesByDotNotation ? _u(n, a, o) : n[a] = o;
    };
    if (typeof e == "object") {
      const a = e;
      for (const [o, i] of Object.entries(a))
        s(o, i);
    } else
      s(e, r);
    this.store = n;
  }
  /**
      Check if an item exists.
  
      @param key - The key of the item to check.
      */
  has(e) {
    return ve(this, Je).accessPropertiesByDotNotation ? by(this.store, e) : e in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...e) {
    for (const r of e)
      rT(ve(this, Ct)[r]) && this.set(r, ve(this, Ct)[r]);
  }
  delete(e) {
    const { store: r } = this;
    ve(this, Je).accessPropertiesByDotNotation ? Ey(r, e) : delete r[e], this.store = r;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = Gr();
    for (const e of Object.keys(ve(this, Ct)))
      this.reset(e);
  }
  /**
      Watches the given `key`, calling `callback` on any changes.
  
      @param key - The key to watch.
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidChange(e, r) {
    if (typeof e != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof e}`);
    if (typeof r != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof r}`);
    return this._handleChange(() => this.get(e), r);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(e) {
    if (typeof e != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof e}`);
    return this._handleChange(() => this.store, e);
  }
  get size() {
    return Object.keys(this.store).length;
  }
  get store() {
    try {
      const e = ae.readFileSync(this.path, ve(this, It) ? null : "utf8"), r = this._encryptData(e), n = this._deserialize(r);
      return this._validate(n), Object.assign(Gr(), n);
    } catch (e) {
      if ((e == null ? void 0 : e.code) === "ENOENT")
        return this._ensureDirectory(), Gr();
      if (ve(this, Je).clearInvalidConfig && e.name === "SyntaxError")
        return Gr();
      throw e;
    }
  }
  set store(e) {
    this._ensureDirectory(), this._validate(e), this._write(e), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [e, r] of Object.entries(this.store))
      yield [e, r];
  }
  _encryptData(e) {
    if (!ve(this, It))
      return typeof e == "string" ? e : Gl(e);
    try {
      const r = e.slice(0, 16), n = kn.pbkdf2Sync(ve(this, It), r.toString(), 1e4, 32, "sha512"), s = kn.createDecipheriv(Zl, n, r), a = e.slice(17), o = typeof a == "string" ? po(a) : a;
      return Gl(Kl([s.update(o), s.final()]));
    } catch {
    }
    return e.toString();
  }
  _handleChange(e, r) {
    let n = e();
    const s = () => {
      const a = n, o = e();
      Hh(o, a) || (n = o, r.call(this, o, a));
    };
    return this.events.addEventListener("change", s), () => {
      this.events.removeEventListener("change", s);
    };
  }
  _validate(e) {
    if (!ve(this, Jt) || ve(this, Jt).call(this, e) || !ve(this, Jt).errors)
      return;
    const n = ve(this, Jt).errors.map(({ instancePath: s, message: a = "" }) => `\`${s.slice(1)}\` ${a}`);
    throw new Error("Config schema violation: " + n.join("; "));
  }
  _ensureDirectory() {
    ae.mkdirSync(de.dirname(this.path), { recursive: !0 });
  }
  _write(e) {
    let r = this._serialize(e);
    if (ve(this, It)) {
      const n = kn.randomBytes(16), s = kn.pbkdf2Sync(ve(this, It), n.toString(), 1e4, 32, "sha512"), a = kn.createCipheriv(Zl, s, n);
      r = Kl([n, po(":"), a.update(po(r)), a.final()]);
    }
    if (Te.env.SNAP)
      ae.writeFileSync(this.path, r, { mode: ve(this, Je).configFileMode });
    else
      try {
        Ud(this.path, r, { mode: ve(this, Je).configFileMode });
      } catch (n) {
        if ((n == null ? void 0 : n.code) === "EXDEV") {
          ae.writeFileSync(this.path, r, { mode: ve(this, Je).configFileMode });
          return;
        }
        throw n;
      }
  }
  _watch() {
    this._ensureDirectory(), ae.existsSync(this.path) || this._write(Gr()), Te.platform === "win32" ? ae.watch(this.path, { persistent: !1 }, El(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : ae.watchFile(this.path, { persistent: !1 }, El(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(e, r, n) {
    let s = this._get(yo, "0.0.0");
    const a = Object.keys(e).filter((i) => this._shouldPerformMigration(i, s, r));
    let o = { ...this.store };
    for (const i of a)
      try {
        n && n(this, {
          fromVersion: s,
          toVersion: i,
          finalVersion: r,
          versions: a
        });
        const c = e[i];
        c == null || c(this), this._set(yo, i), s = i, o = { ...this.store };
      } catch (c) {
        throw this.store = o, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(s) || !Kr.eq(s, r)) && this._set(yo, r);
  }
  _containsReservedKey(e) {
    return typeof e == "object" && Object.keys(e)[0] === ta ? !0 : typeof e != "string" ? !1 : ve(this, Je).accessPropertiesByDotNotation ? !!e.startsWith(`${ta}.`) : !1;
  }
  _isVersionInRangeFormat(e) {
    return Kr.clean(e) === null;
  }
  _shouldPerformMigration(e, r, n) {
    return this._isVersionInRangeFormat(e) ? r !== "0.0.0" && Kr.satisfies(r, e) ? !1 : Kr.satisfies(n, e) : !(Kr.lte(e, r) || Kr.gt(e, n));
  }
  _get(e, r) {
    return wy(this.store, e, r);
  }
  _set(e, r) {
    const { store: n } = this;
    _u(n, e, r), this.store = n;
  }
}
Jt = new WeakMap(), It = new WeakMap(), Je = new WeakMap(), Ct = new WeakMap();
let Hl = !1;
const Bl = () => {
  if (!ra || !Qt)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const t = {
    defaultCwd: Qt.getPath("userData"),
    appVersion: Qt.getVersion()
  };
  return Hl || (ra.on("electron-store-get-data", (e) => {
    e.returnValue = t;
  }), Hl = !0), t;
};
class aT extends sT {
  constructor(e) {
    let r, n;
    if (Te.type === "renderer") {
      const s = Kh.ipcRenderer.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: r, appVersion: n } = s);
    } else ra && Qt && ({ defaultCwd: r, appVersion: n } = Bl());
    e = {
      name: "config",
      ...e
    }, e.projectVersion || (e.projectVersion = n), e.cwd ? e.cwd = de.isAbsolute(e.cwd) ? e.cwd : de.join(r, e.cwd) : e.cwd = r, e.configName = e.name, delete e.name, super(e);
  }
  static initRenderer() {
    Bl();
  }
  async openInEditor() {
    const e = await Gh.openPath(this.path);
    if (e)
      throw new Error(e);
  }
}
const Ot = new aT({
  // schema: storeSchema,
}), Ht = qp.create({ isServer: !0, transformer: fe }), oT = Ht.router({
  setTheme: Ht.procedure.input(wr.string()).mutation((t) => {
    const { input: e } = t;
    Ot.set("theme", e);
  }),
  getTheme: Ht.procedure.query(() => Ot.get("theme") || "dark"),
  setOllamaUrl: Ht.procedure.input(wr.string()).mutation((t) => {
    const { input: e } = t;
    Ot.set("ollamaUrl", e);
  }),
  getOllamaUrl: Ht.procedure.query(() => Ot.get("ollamaUrl") || "https://ollama.com"),
  getKeyPoints: Ht.procedure.query(() => Ot.get("keyPoints") || []),
  setKeyPoints: Ht.procedure.input(
    wr.object({
      title: wr.string(),
      points: wr.array(wr.string())
    })
  ).mutation((t) => {
    const { input: e } = t, r = Ot.get("keyPoints") || [];
    r.push(e), Ot.set("keyPoints", r);
  }),
  deleteKeyPoints: Ht.procedure.input(wr.string()).mutation((t) => {
    const { input: e } = t, r = Ot.get("keyPoints") || [];
    Ot.set(
      "keyPoints",
      r.filter((n) => n.title !== e)
    );
  })
}), Fh = de.dirname(Zh(import.meta.url));
process.env.APP_ROOT = de.join(Fh, "..");
const Bo = process.env.VITE_DEV_SERVER_URL, wT = de.join(process.env.APP_ROOT, "dist-electron"), zh = de.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Bo ? de.join(process.env.APP_ROOT, "public") : zh;
let $t;
function Uh() {
  $t = new td({
    icon: de.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: de.join(Fh, "preload.mjs")
    }
  }), $t.setMenu(null), $t.webContents.on("did-finish-load", () => {
    $t == null || $t.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Bo ? $t.loadURL(Bo) : $t.loadFile(de.join(zh, "index.html")), fm({ router: oT, windows: [$t] });
}
Qt.on("window-all-closed", () => {
  process.platform !== "darwin" && (Qt.quit(), $t = null);
});
Qt.on("activate", () => {
  td.getAllWindows().length === 0 && Uh();
});
Qt.whenReady().then(Uh);
export {
  wT as MAIN_DIST,
  zh as RENDERER_DIST,
  Bo as VITE_DEV_SERVER_URL
};
