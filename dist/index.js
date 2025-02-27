import * as D from "react";
import Ka, { forwardRef as pt, useEffect as ct, useState as At, useRef as Wt, useCallback as ps, Suspense as gs, lazy as qa } from "react";
import { Environment as Ya, Lightformer as St, Line as hs, useGLTF as Xa } from "@react-three/drei";
import { useThree as Za } from "@react-three/fiber";
import * as pe from "three";
import { Matrix4 as Yt, Vector3 as Po, Quaternion as Qa } from "three";
import { ConvexGeometry as el } from "three-stdlib";
import { useTheme as tt, IconButton as Wn, Typography as et, Slider as tl, Stack as ge, CircularProgress as nl, capitalize as rl, styled as po, InputLabel as ol, Select as il, FormControl as sl, Box as al, MenuItem as Xt, ToggleButtonGroup as ll, Divider as Hn, ToggleButton as jo, Tabs as cl, Tab as ul, Tooltip as fl, Dialog as dl, DialogTitle as pl, DialogContent as gl, DialogActions as hl, Button as No, Fab as ml, createTheme as yl, rgbToHex as bl } from "@mui/material";
import { observer as Ie, useLocalObservable as go } from "mobx-react-lite";
import { I18nextProvider as xl, useTranslation as yn } from "react-i18next";
import Sl from "i18next-browser-languagedetector";
import { autorun as ms, reaction as vl, makeAutoObservable as wl, runInAction as _o } from "mobx";
import h from "prop-types";
import Cl from "@emotion/styled";
import { ThemeContext as Tl } from "@emotion/react";
import { tryParseJson as El, radiansToDegrees as Dn, degreesToRadians as Ol, NovaClient as Rl, poseToWandelscriptString as Al } from "@wandelbots/wandelbots-js";
import { lowerFirst as kl, countBy as $l, isString as Pl } from "lodash-es";
import { Globals as jl, useSpring as Nl, animated as _l } from "@react-spring/three";
import { ErrorBoundary as Ll } from "react-error-boundary";
var On = { exports: {} }, Zt = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lo;
function Il() {
  if (Lo) return Zt;
  Lo = 1;
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
  return Zt.Fragment = t, Zt.jsx = n, Zt.jsxs = n, Zt;
}
var Qt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Io;
function Ml() {
  return Io || (Io = 1, process.env.NODE_ENV !== "production" && function() {
    function e(y) {
      if (y == null) return null;
      if (typeof y == "function")
        return y.$$typeof === Z ? null : y.displayName || y.name || null;
      if (typeof y == "string") return y;
      switch (y) {
        case P:
          return "Fragment";
        case A:
          return "Portal";
        case V:
          return "Profiler";
        case N:
          return "StrictMode";
        case _:
          return "Suspense";
        case F:
          return "SuspenseList";
      }
      if (typeof y == "object")
        switch (typeof y.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), y.$$typeof) {
          case g:
            return (y.displayName || "Context") + ".Provider";
          case G:
            return (y._context.displayName || "Context") + ".Consumer";
          case k:
            var M = y.render;
            return y = y.displayName, y || (y = M.displayName || M.name || "", y = y !== "" ? "ForwardRef(" + y + ")" : "ForwardRef"), y;
          case I:
            return M = y.displayName || null, M !== null ? M : e(y.type) || "Memo";
          case Y:
            M = y._payload, y = y._init;
            try {
              return e(y(M));
            } catch {
            }
        }
      return null;
    }
    function t(y) {
      return "" + y;
    }
    function n(y) {
      try {
        t(y);
        var M = !1;
      } catch {
        M = !0;
      }
      if (M) {
        M = console;
        var L = M.error, H = typeof Symbol == "function" && Symbol.toStringTag && y[Symbol.toStringTag] || y.constructor.name || "Object";
        return L.call(
          M,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          H
        ), t(y);
      }
    }
    function r() {
    }
    function o() {
      if (Ye === 0) {
        ht = console.log, Nt = console.info, mt = console.warn, Fe = console.error, Be = console.group, Ve = console.groupCollapsed, Ue = console.groupEnd;
        var y = {
          configurable: !0,
          enumerable: !0,
          value: r,
          writable: !0
        };
        Object.defineProperties(console, {
          info: y,
          log: y,
          warn: y,
          error: y,
          group: y,
          groupCollapsed: y,
          groupEnd: y
        });
      }
      Ye++;
    }
    function i() {
      if (Ye--, Ye === 0) {
        var y = { configurable: !0, enumerable: !0, writable: !0 };
        Object.defineProperties(console, {
          log: W({}, y, { value: ht }),
          info: W({}, y, { value: Nt }),
          warn: W({}, y, { value: mt }),
          error: W({}, y, { value: Fe }),
          group: W({}, y, { value: Be }),
          groupCollapsed: W({}, y, { value: Ve }),
          groupEnd: W({}, y, { value: Ue })
        });
      }
      0 > Ye && console.error(
        "disabledDepth fell below zero. This is a bug in React. Please file an issue."
      );
    }
    function s(y) {
      if (Oe === void 0)
        try {
          throw Error();
        } catch (L) {
          var M = L.stack.trim().match(/\n( *(at )?)/);
          Oe = M && M[1] || "", he = -1 < L.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < L.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
      return `
` + Oe + y + he;
    }
    function a(y, M) {
      if (!y || _e) return "";
      var L = yt.get(y);
      if (L !== void 0) return L;
      _e = !0, L = Error.prepareStackTrace, Error.prepareStackTrace = void 0;
      var H = null;
      H = X.H, X.H = null, o();
      try {
        var T = {
          DetermineComponentFrameRoot: function() {
            try {
              if (M) {
                var Q = function() {
                  throw Error();
                };
                if (Object.defineProperty(Q.prototype, "props", {
                  set: function() {
                    throw Error();
                  }
                }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(Q, []);
                  } catch (Ce) {
                    var be = Ce;
                  }
                  Reflect.construct(y, [], Q);
                } else {
                  try {
                    Q.call();
                  } catch (Ce) {
                    be = Ce;
                  }
                  y.call(Q.prototype);
                }
              } else {
                try {
                  throw Error();
                } catch (Ce) {
                  be = Ce;
                }
                (Q = y()) && typeof Q.catch == "function" && Q.catch(function() {
                });
              }
            } catch (Ce) {
              if (Ce && be && typeof Ce.stack == "string")
                return [Ce.stack, be.stack];
            }
            return [null, null];
          }
        };
        T.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var O = Object.getOwnPropertyDescriptor(
          T.DetermineComponentFrameRoot,
          "name"
        );
        O && O.configurable && Object.defineProperty(
          T.DetermineComponentFrameRoot,
          "name",
          { value: "DetermineComponentFrameRoot" }
        );
        var $ = T.DetermineComponentFrameRoot(), z = $[0], q = $[1];
        if (z && q) {
          var B = z.split(`
`), oe = q.split(`
`);
          for ($ = O = 0; O < B.length && !B[O].includes(
            "DetermineComponentFrameRoot"
          ); )
            O++;
          for (; $ < oe.length && !oe[$].includes(
            "DetermineComponentFrameRoot"
          ); )
            $++;
          if (O === B.length || $ === oe.length)
            for (O = B.length - 1, $ = oe.length - 1; 1 <= O && 0 <= $ && B[O] !== oe[$]; )
              $--;
          for (; 1 <= O && 0 <= $; O--, $--)
            if (B[O] !== oe[$]) {
              if (O !== 1 || $ !== 1)
                do
                  if (O--, $--, 0 > $ || B[O] !== oe[$]) {
                    var ce = `
` + B[O].replace(
                      " at new ",
                      " at "
                    );
                    return y.displayName && ce.includes("<anonymous>") && (ce = ce.replace("<anonymous>", y.displayName)), typeof y == "function" && yt.set(y, ce), ce;
                  }
                while (1 <= O && 0 <= $);
              break;
            }
        }
      } finally {
        _e = !1, X.H = H, i(), Error.prepareStackTrace = L;
      }
      return B = (B = y ? y.displayName || y.name : "") ? s(B) : "", typeof y == "function" && yt.set(y, B), B;
    }
    function l(y) {
      if (y == null) return "";
      if (typeof y == "function") {
        var M = y.prototype;
        return a(
          y,
          !(!M || !M.isReactComponent)
        );
      }
      if (typeof y == "string") return s(y);
      switch (y) {
        case _:
          return s("Suspense");
        case F:
          return s("SuspenseList");
      }
      if (typeof y == "object")
        switch (y.$$typeof) {
          case k:
            return y = a(y.render, !1), y;
          case I:
            return l(y.type);
          case Y:
            M = y._payload, y = y._init;
            try {
              return l(y(M));
            } catch {
            }
        }
      return "";
    }
    function c() {
      var y = X.A;
      return y === null ? null : y.getOwner();
    }
    function u(y) {
      if (ye.call(y, "key")) {
        var M = Object.getOwnPropertyDescriptor(y, "key").get;
        if (M && M.isReactWarning) return !1;
      }
      return y.key !== void 0;
    }
    function d(y, M) {
      function L() {
        me || (me = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          M
        ));
      }
      L.isReactWarning = !0, Object.defineProperty(y, "key", {
        get: L,
        configurable: !0
      });
    }
    function p() {
      var y = e(this.type);
      return it[y] || (it[y] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), y = this.props.ref, y !== void 0 ? y : null;
    }
    function S(y, M, L, H, T, O) {
      return L = O.ref, y = {
        $$typeof: C,
        type: y,
        key: M,
        props: O,
        _owner: T
      }, (L !== void 0 ? L : null) !== null ? Object.defineProperty(y, "ref", {
        enumerable: !1,
        get: p
      }) : Object.defineProperty(y, "ref", { enumerable: !1, value: null }), y._store = {}, Object.defineProperty(y._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(y, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.freeze && (Object.freeze(y.props), Object.freeze(y)), y;
    }
    function m(y, M, L, H, T, O) {
      if (typeof y == "string" || typeof y == "function" || y === P || y === V || y === N || y === _ || y === F || y === K || typeof y == "object" && y !== null && (y.$$typeof === Y || y.$$typeof === I || y.$$typeof === g || y.$$typeof === G || y.$$typeof === k || y.$$typeof === $e || y.getModuleId !== void 0)) {
        var $ = M.children;
        if ($ !== void 0)
          if (H)
            if (De($)) {
              for (H = 0; H < $.length; H++)
                f($[H], y);
              Object.freeze && Object.freeze($);
            } else
              console.error(
                "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
              );
          else f($, y);
      } else
        $ = "", (y === void 0 || typeof y == "object" && y !== null && Object.keys(y).length === 0) && ($ += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports."), y === null ? H = "null" : De(y) ? H = "array" : y !== void 0 && y.$$typeof === C ? (H = "<" + (e(y.type) || "Unknown") + " />", $ = " Did you accidentally export a JSX literal instead of a component?") : H = typeof y, console.error(
          "React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",
          H,
          $
        );
      if (ye.call(M, "key")) {
        $ = e(y);
        var z = Object.keys(M).filter(function(B) {
          return B !== "key";
        });
        H = 0 < z.length ? "{key: someKey, " + z.join(": ..., ") + ": ...}" : "{key: someKey}", bt[$ + H] || (z = 0 < z.length ? "{" + z.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          H,
          $,
          z,
          $
        ), bt[$ + H] = !0);
      }
      if ($ = null, L !== void 0 && (n(L), $ = "" + L), u(M) && (n(M.key), $ = "" + M.key), "key" in M) {
        L = {};
        for (var q in M)
          q !== "key" && (L[q] = M[q]);
      } else L = M;
      return $ && d(
        L,
        typeof y == "function" ? y.displayName || y.name || "Unknown" : y
      ), S(y, $, O, T, c(), L);
    }
    function f(y, M) {
      if (typeof y == "object" && y && y.$$typeof !== _t) {
        if (De(y))
          for (var L = 0; L < y.length; L++) {
            var H = y[L];
            x(H) && E(H, M);
          }
        else if (x(y))
          y._store && (y._store.validated = 1);
        else if (y === null || typeof y != "object" ? L = null : (L = Se && y[Se] || y["@@iterator"], L = typeof L == "function" ? L : null), typeof L == "function" && L !== y.entries && (L = L.call(y), L !== y))
          for (; !(y = L.next()).done; )
            x(y.value) && E(y.value, M);
      }
    }
    function x(y) {
      return typeof y == "object" && y !== null && y.$$typeof === C;
    }
    function E(y, M) {
      if (y._store && !y._store.validated && y.key == null && (y._store.validated = 1, M = j(M), !xt[M])) {
        xt[M] = !0;
        var L = "";
        y && y._owner != null && y._owner !== c() && (L = null, typeof y._owner.tag == "number" ? L = e(y._owner.type) : typeof y._owner.name == "string" && (L = y._owner.name), L = " It was passed a child from " + L + ".");
        var H = X.getCurrentStack;
        X.getCurrentStack = function() {
          var T = l(y.type);
          return H && (T += H() || ""), T;
        }, console.error(
          'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
          M,
          L
        ), X.getCurrentStack = H;
      }
    }
    function j(y) {
      var M = "", L = c();
      return L && (L = e(L.type)) && (M = `

Check the render method of \`` + L + "`."), M || (y = e(y)) && (M = `

Check the top-level render call using <` + y + ">."), M;
    }
    var R = Ka, C = Symbol.for("react.transitional.element"), A = Symbol.for("react.portal"), P = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), V = Symbol.for("react.profiler"), G = Symbol.for("react.consumer"), g = Symbol.for("react.context"), k = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), I = Symbol.for("react.memo"), Y = Symbol.for("react.lazy"), K = Symbol.for("react.offscreen"), Se = Symbol.iterator, Z = Symbol.for("react.client.reference"), X = R.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ye = Object.prototype.hasOwnProperty, W = Object.assign, $e = Symbol.for("react.client.reference"), De = Array.isArray, Ye = 0, ht, Nt, mt, Fe, Be, Ve, Ue;
    r.__reactDisabledLog = !0;
    var Oe, he, _e = !1, yt = new (typeof WeakMap == "function" ? WeakMap : Map)(), _t = Symbol.for("react.client.reference"), me, it = {}, bt = {}, xt = {};
    Qt.Fragment = P, Qt.jsx = function(y, M, L, H, T) {
      return m(y, M, L, !1, H, T);
    }, Qt.jsxs = function(y, M, L, H, T) {
      return m(y, M, L, !0, H, T);
    };
  }()), Qt;
}
var Mo;
function Dl() {
  return Mo || (Mo = 1, process.env.NODE_ENV === "production" ? On.exports = Il() : On.exports = Ml()), On.exports;
}
var b = Dl();
function Db() {
  return /* @__PURE__ */ b.jsx(Ya, { children: /* @__PURE__ */ b.jsx(Fl, {}) });
}
function Fl({ positions: e = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  return /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
    /* @__PURE__ */ b.jsx(
      St,
      {
        intensity: 5,
        "rotation-x": Math.PI / 2,
        position: [0, 5, -9],
        scale: [10, 10, 1]
      }
    ),
    /* @__PURE__ */ b.jsx("group", { rotation: [0, 0.5, 0], children: /* @__PURE__ */ b.jsx("group", { children: e.map((t, n) => /* @__PURE__ */ b.jsx(
      St,
      {
        form: "circle",
        intensity: 5,
        rotation: [Math.PI / 2, 0, 0],
        position: [t, 4, n * 4],
        scale: [3, 1, 1]
      },
      n
    )) }) }),
    /* @__PURE__ */ b.jsx(
      St,
      {
        intensity: 40,
        "rotation-y": Math.PI / 2,
        position: [-5, 1, -1],
        scale: [20, 0.1, 1]
      }
    ),
    /* @__PURE__ */ b.jsx(
      St,
      {
        intensity: 20,
        "rotation-y": -Math.PI,
        position: [-5, -2, -1],
        scale: [20, 0.1, 1]
      }
    ),
    /* @__PURE__ */ b.jsx(
      St,
      {
        "rotation-y": Math.PI / 2,
        position: [-5, -1, -1],
        scale: [20, 0.5, 1],
        intensity: 5
      }
    ),
    /* @__PURE__ */ b.jsx(
      St,
      {
        "rotation-y": -Math.PI / 2,
        position: [10, 1, 0],
        scale: [20, 1, 1],
        intensity: 10
      }
    ),
    /* @__PURE__ */ b.jsx(
      St,
      {
        form: "ring",
        color: "white",
        intensity: 5,
        scale: 10,
        position: [-15, 4, -18],
        target: [0, 0, 0]
      }
    )
  ] });
}
function Bl(e) {
  if (e.length < 3)
    return console.log("Not enough vertices to define a plane"), { isCoplanar: !1 };
  const t = new pe.Vector3(e[0].x, e[0].y, e[0].z), n = new pe.Vector3(e[1].x, e[1].y, e[1].z), r = new pe.Vector3(e[2].x, e[2].y, e[2].z), o = new pe.Vector3().subVectors(n, t), i = new pe.Vector3().subVectors(r, t), s = new pe.Vector3().crossVectors(o, i).normalize();
  for (let a = 3; a < e.length; a++) {
    const l = new pe.Vector3(e[a].x, e[a].y, e[a].z), c = new pe.Vector3().subVectors(l, t), u = s.dot(c);
    if (Math.abs(u) > 1e-6)
      return console.log("Vertices are not on the same plane"), { isCoplanar: !1 };
  }
  return { isCoplanar: !0, normal: s };
}
function Fb({
  safetyZones: e,
  ...t
}) {
  return /* @__PURE__ */ b.jsx("group", { ...t, children: e.map((n, r) => {
    let o = [];
    return n.geometry && (n.geometry.compound ? o = n.geometry.compound.child_geometries : n.geometry.convex_hull && (o = [n.geometry])), o.map((i, s) => {
      if (!i.convex_hull) return null;
      const a = i.convex_hull.vertices.map(
        (u) => new pe.Vector3(u.x / 1e3, u.y / 1e3, u.z / 1e3)
      ), l = Bl(a);
      if (l.isCoplanar && l.normal) {
        const d = new pe.Vector3().addVectors(
          a[0],
          l.normal.multiplyScalar(1e-4)
        );
        a.push(d);
      }
      let c;
      try {
        c = new el(a);
      } catch (u) {
        return console.log("Error creating ConvexGeometry:", u), null;
      }
      return /* @__PURE__ */ b.jsx("mesh", { geometry: c, children: /* @__PURE__ */ b.jsx(
        "meshStandardMaterial",
        {
          attach: "material",
          color: "#009f4d",
          opacity: 0.2,
          depthTest: !1,
          depthWrite: !1,
          transparent: !0,
          polygonOffset: !0,
          polygonOffsetFactor: -s
        },
        r
      ) }, `${r}-${s}`);
    });
  }) });
}
function Bb({
  trajectory: e,
  ...t
}) {
  var r;
  const n = ((r = e.trajectory) == null ? void 0 : r.map((o) => o.tcp_pose ? new pe.Vector3(
    o.tcp_pose.position.x / 1e3,
    o.tcp_pose.position.z / 1e3,
    -o.tcp_pose.position.y / 1e3
  ) : null).filter((o) => o !== null)) || [];
  return /* @__PURE__ */ b.jsx("group", { ...t, children: n.length > 0 && /* @__PURE__ */ b.jsx(
    hs,
    {
      points: n,
      lineWidth: 3,
      polygonOffset: !0,
      polygonOffsetFactor: 10,
      polygonOffsetUnits: 10
    }
  ) });
}
function ut(e, ...t) {
  const n = new URL(`https://mui.com/production-error/?code=${e}`);
  return t.forEach((r) => n.searchParams.append("args[]", r)), `Minified MUI error #${e}; visit ${n} for the full message.`;
}
function Vl(e) {
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
var Ul = {
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
};
function zl(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var Jl = /[A-Z]|^ms/g, Gl = /_EMO_([^_]+?)_([^]*?)_EMO_/g, ys = function(t) {
  return t.charCodeAt(1) === 45;
}, Do = function(t) {
  return t != null && typeof t != "boolean";
}, Lr = /* @__PURE__ */ zl(function(e) {
  return ys(e) ? e : e.replace(Jl, "-$&").toLowerCase();
}), Fo = function(t, n) {
  switch (t) {
    case "animation":
    case "animationName":
      if (typeof n == "string")
        return n.replace(Gl, function(r, o, i) {
          return lt = {
            name: o,
            styles: i,
            next: lt
          }, o;
        });
  }
  return Ul[t] !== 1 && !ys(t) && typeof n == "number" && n !== 0 ? n + "px" : n;
};
function Kn(e, t, n) {
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
        return lt = {
          name: o.name,
          styles: o.styles,
          next: lt
        }, o.name;
      var i = n;
      if (i.styles !== void 0) {
        var s = i.next;
        if (s !== void 0)
          for (; s !== void 0; )
            lt = {
              name: s.name,
              styles: s.styles,
              next: lt
            }, s = s.next;
        var a = i.styles + ";";
        return a;
      }
      return Wl(e, t, n);
    }
  }
  var l = n;
  return l;
}
function Wl(e, t, n) {
  var r = "";
  if (Array.isArray(n))
    for (var o = 0; o < n.length; o++)
      r += Kn(e, t, n[o]) + ";";
  else
    for (var i in n) {
      var s = n[i];
      if (typeof s != "object") {
        var a = s;
        Do(a) && (r += Lr(i) + ":" + Fo(i, a) + ";");
      } else if (Array.isArray(s) && typeof s[0] == "string" && t == null)
        for (var l = 0; l < s.length; l++)
          Do(s[l]) && (r += Lr(i) + ":" + Fo(i, s[l]) + ";");
      else {
        var c = Kn(e, t, s);
        switch (i) {
          case "animation":
          case "animationName": {
            r += Lr(i) + ":" + c + ";";
            break;
          }
          default:
            r += i + "{" + c + "}";
        }
      }
    }
  return r;
}
var Bo = /label:\s*([^\s;{]+)\s*(;|$)/g, lt;
function Hl(e, t, n) {
  if (e.length === 1 && typeof e[0] == "object" && e[0] !== null && e[0].styles !== void 0)
    return e[0];
  var r = !0, o = "";
  lt = void 0;
  var i = e[0];
  if (i == null || i.raw === void 0)
    r = !1, o += Kn(n, t, i);
  else {
    var s = i;
    o += s[0];
  }
  for (var a = 1; a < e.length; a++)
    if (o += Kn(n, t, e[a]), r) {
      var l = i;
      o += l[a];
    }
  Bo.lastIndex = 0;
  for (var c = "", u; (u = Bo.exec(o)) !== null; )
    c += "-" + u[1];
  var d = Vl(o) + c;
  return {
    name: d,
    styles: o,
    next: lt
  };
}
/**
 * @mui/styled-engine v6.4.6
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function Kl(e, t) {
  const n = Cl(e, t);
  return process.env.NODE_ENV !== "production" ? (...r) => {
    const o = typeof e == "string" ? `"${e}"` : "component";
    return r.length === 0 ? console.error([`MUI: Seems like you called \`styled(${o})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : r.some((i) => i === void 0) && console.error(`MUI: the styled(${o})(...args) API requires all its args to be defined.`), n(...r);
  } : n;
}
function ql(e, t) {
  Array.isArray(e.__emotion_styles) && (e.__emotion_styles = t(e.__emotion_styles));
}
const Vo = [];
function Uo(e) {
  return Vo[0] = e, Hl(Vo);
}
var Rn = { exports: {} }, ee = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zo;
function Yl() {
  if (zo) return ee;
  zo = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.consumer"), s = Symbol.for("react.context"), a = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), S = Symbol.for("react.client.reference");
  function m(f) {
    if (typeof f == "object" && f !== null) {
      var x = f.$$typeof;
      switch (x) {
        case e:
          switch (f = f.type, f) {
            case n:
            case o:
            case r:
            case l:
            case c:
              return f;
            default:
              switch (f = f && f.$$typeof, f) {
                case s:
                case a:
                case d:
                case u:
                  return f;
                case i:
                  return f;
                default:
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return ee.ContextConsumer = i, ee.ContextProvider = s, ee.Element = e, ee.ForwardRef = a, ee.Fragment = n, ee.Lazy = d, ee.Memo = u, ee.Portal = t, ee.Profiler = o, ee.StrictMode = r, ee.Suspense = l, ee.SuspenseList = c, ee.isContextConsumer = function(f) {
    return m(f) === i;
  }, ee.isContextProvider = function(f) {
    return m(f) === s;
  }, ee.isElement = function(f) {
    return typeof f == "object" && f !== null && f.$$typeof === e;
  }, ee.isForwardRef = function(f) {
    return m(f) === a;
  }, ee.isFragment = function(f) {
    return m(f) === n;
  }, ee.isLazy = function(f) {
    return m(f) === d;
  }, ee.isMemo = function(f) {
    return m(f) === u;
  }, ee.isPortal = function(f) {
    return m(f) === t;
  }, ee.isProfiler = function(f) {
    return m(f) === o;
  }, ee.isStrictMode = function(f) {
    return m(f) === r;
  }, ee.isSuspense = function(f) {
    return m(f) === l;
  }, ee.isSuspenseList = function(f) {
    return m(f) === c;
  }, ee.isValidElementType = function(f) {
    return typeof f == "string" || typeof f == "function" || f === n || f === o || f === r || f === l || f === c || f === p || typeof f == "object" && f !== null && (f.$$typeof === d || f.$$typeof === u || f.$$typeof === s || f.$$typeof === i || f.$$typeof === a || f.$$typeof === S || f.getModuleId !== void 0);
  }, ee.typeOf = m, ee;
}
var te = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jo;
function Xl() {
  return Jo || (Jo = 1, process.env.NODE_ENV !== "production" && function() {
    function e(f) {
      if (typeof f == "object" && f !== null) {
        var x = f.$$typeof;
        switch (x) {
          case t:
            switch (f = f.type, f) {
              case r:
              case i:
              case o:
              case c:
              case u:
                return f;
              default:
                switch (f = f && f.$$typeof, f) {
                  case a:
                  case l:
                  case p:
                  case d:
                    return f;
                  case s:
                    return f;
                  default:
                    return x;
                }
            }
          case n:
            return x;
        }
      }
    }
    var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), s = Symbol.for("react.consumer"), a = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), d = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), S = Symbol.for("react.offscreen"), m = Symbol.for("react.client.reference");
    te.ContextConsumer = s, te.ContextProvider = a, te.Element = t, te.ForwardRef = l, te.Fragment = r, te.Lazy = p, te.Memo = d, te.Portal = n, te.Profiler = i, te.StrictMode = o, te.Suspense = c, te.SuspenseList = u, te.isContextConsumer = function(f) {
      return e(f) === s;
    }, te.isContextProvider = function(f) {
      return e(f) === a;
    }, te.isElement = function(f) {
      return typeof f == "object" && f !== null && f.$$typeof === t;
    }, te.isForwardRef = function(f) {
      return e(f) === l;
    }, te.isFragment = function(f) {
      return e(f) === r;
    }, te.isLazy = function(f) {
      return e(f) === p;
    }, te.isMemo = function(f) {
      return e(f) === d;
    }, te.isPortal = function(f) {
      return e(f) === n;
    }, te.isProfiler = function(f) {
      return e(f) === i;
    }, te.isStrictMode = function(f) {
      return e(f) === o;
    }, te.isSuspense = function(f) {
      return e(f) === c;
    }, te.isSuspenseList = function(f) {
      return e(f) === u;
    }, te.isValidElementType = function(f) {
      return typeof f == "string" || typeof f == "function" || f === r || f === i || f === o || f === c || f === u || f === S || typeof f == "object" && f !== null && (f.$$typeof === p || f.$$typeof === d || f.$$typeof === a || f.$$typeof === s || f.$$typeof === l || f.$$typeof === m || f.getModuleId !== void 0);
    }, te.typeOf = e;
  }()), te;
}
var Go;
function Zl() {
  return Go || (Go = 1, process.env.NODE_ENV === "production" ? Rn.exports = /* @__PURE__ */ Yl() : Rn.exports = /* @__PURE__ */ Xl()), Rn.exports;
}
var qn = /* @__PURE__ */ Zl();
function Ge(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function bs(e) {
  if (/* @__PURE__ */ D.isValidElement(e) || qn.isValidElementType(e) || !Ge(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = bs(e[n]);
  }), t;
}
function Ee(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? {
    ...e
  } : e;
  return Ge(e) && Ge(t) && Object.keys(t).forEach((o) => {
    /* @__PURE__ */ D.isValidElement(t[o]) || qn.isValidElementType(t[o]) ? r[o] = t[o] : Ge(t[o]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, o) && Ge(e[o]) ? r[o] = Ee(e[o], t[o], n) : n.clone ? r[o] = Ge(t[o]) ? bs(t[o]) : t[o] : r[o] = t[o];
  }), r;
}
const Ql = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => ({
    ...n,
    [r.key]: r.val
  }), {});
};
function ec(e) {
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
  } = e, i = Ql(t), s = Object.keys(i);
  function a(p) {
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n})`;
  }
  function l(p) {
    return `@media (max-width:${(typeof t[p] == "number" ? t[p] : p) - r / 100}${n})`;
  }
  function c(p, S) {
    const m = s.indexOf(S);
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n}) and (max-width:${(m !== -1 && typeof t[s[m]] == "number" ? t[s[m]] : S) - r / 100}${n})`;
  }
  function u(p) {
    return s.indexOf(p) + 1 < s.length ? c(p, s[s.indexOf(p) + 1]) : a(p);
  }
  function d(p) {
    const S = s.indexOf(p);
    return S === 0 ? a(s[1]) : S === s.length - 1 ? l(s[S]) : c(p, s[s.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: s,
    values: i,
    up: a,
    down: l,
    between: c,
    only: u,
    not: d,
    unit: n,
    ...o
  };
}
function tc(e, t) {
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
function nc(e, t) {
  return t === "@" || t.startsWith("@") && (e.some((n) => t.startsWith(`@${n}`)) || !!t.match(/^@\d/));
}
function rc(e, t) {
  const n = t.match(/^@([^/]+)?\/?(.+)?$/);
  if (!n) {
    if (process.env.NODE_ENV !== "production")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The provided shorthand ${`(${t})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : ut(18, `(${t})`));
    return null;
  }
  const [, r, o] = n, i = Number.isNaN(+r) ? r || 0 : +r;
  return e.containerQueries(o).up(i);
}
function oc(e) {
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
const ic = {
  borderRadius: 4
}, gt = process.env.NODE_ENV !== "production" ? h.oneOfType([h.number, h.string, h.object, h.array]) : {};
function an(e, t) {
  return t ? Ee(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const ar = {
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
}, Wo = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${ar[e]}px)`
}, sc = {
  containerQueries: (e) => ({
    up: (t) => {
      let n = typeof t == "number" ? t : ar[t] || t;
      return typeof n == "number" && (n = `${n}px`), e ? `@container ${e} (min-width:${n})` : `@container (min-width:${n})`;
    }
  })
};
function Le(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Wo;
    return t.reduce((s, a, l) => (s[i.up(i.keys[l])] = n(t[l]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Wo;
    return Object.keys(t).reduce((s, a) => {
      if (nc(i.keys, a)) {
        const l = rc(r.containerQueries ? r : sc, a);
        l && (s[l] = n(t[a], a));
      } else if (Object.keys(i.values || ar).includes(a)) {
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
function xs(e = {}) {
  var n;
  return ((n = e.keys) == null ? void 0 : n.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function Ss(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function ac(e, ...t) {
  const n = xs(e), r = [n, ...t].reduce((o, i) => Ee(o, i), {});
  return Ss(Object.keys(n), r);
}
function lc(e, t) {
  if (typeof e != "object")
    return {};
  const n = {}, r = Object.keys(t);
  return Array.isArray(e) ? r.forEach((o, i) => {
    i < e.length && (n[o] = !0);
  }) : r.forEach((o) => {
    e[o] != null && (n[o] = !0);
  }), n;
}
function Ir({
  values: e,
  breakpoints: t,
  base: n
}) {
  const r = n || lc(e, t), o = Object.keys(r);
  if (o.length === 0)
    return e;
  let i;
  return o.reduce((s, a, l) => (Array.isArray(e) ? (s[a] = e[l] != null ? e[l] : e[i], i = l) : typeof e == "object" ? (s[a] = e[a] != null ? e[a] : e[i], i = a) : s[a] = e, s), {});
}
function Te(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : ut(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
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
function Yn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = lr(e, n) || r, t && (o = t(o, r, e)), o;
}
function ue(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const a = s[t], l = s.theme, c = lr(l, r) || {};
    return Le(s, a, (d) => {
      let p = Yn(c, o, d);
      return d === p && typeof d == "string" && (p = Yn(c, o, `${t}${d === "default" ? "" : Te(d)}`, d)), n === !1 ? p : {
        [n]: p
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: gt
  } : {}, i.filterProps = [t], i;
}
function cc(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const uc = {
  m: "margin",
  p: "padding"
}, fc = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ho = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, dc = cc((e) => {
  if (e.length > 2)
    if (Ho[e])
      e = Ho[e];
    else
      return [e];
  const [t, n] = e.split(""), r = uc[t], o = fc[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), cr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], ur = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], pc = [...cr, ...ur];
function bn(e, t, n, r) {
  const o = lr(e, t, !0) ?? n;
  return typeof o == "number" || typeof o == "string" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), typeof o == "string" ? `calc(${i} * ${o})` : o * i) : Array.isArray(o) ? (i) => {
    if (typeof i == "string")
      return i;
    const s = Math.abs(i);
    process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > o.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(o)}.`, `${s} > ${o.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`)));
    const a = o[s];
    return i >= 0 ? a : typeof a == "number" ? -a : `-${a}`;
  } : typeof o == "function" ? o : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${o}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function fr(e) {
  return bn(e, "spacing", 8, "spacing");
}
function Ct(e, t) {
  return typeof t == "string" || t == null ? t : e(t);
}
function gc(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Ct(t, n), r), {});
}
function hc(e, t, n, r) {
  if (!t.includes(n))
    return null;
  const o = dc(n), i = gc(o, r), s = e[n];
  return Le(e, s, i);
}
function vs(e, t) {
  const n = fr(e.theme);
  return Object.keys(e).map((r) => hc(e, t, r, n)).reduce(an, {});
}
function ae(e) {
  return vs(e, cr);
}
ae.propTypes = process.env.NODE_ENV !== "production" ? cr.reduce((e, t) => (e[t] = gt, e), {}) : {};
ae.filterProps = cr;
function le(e) {
  return vs(e, ur);
}
le.propTypes = process.env.NODE_ENV !== "production" ? ur.reduce((e, t) => (e[t] = gt, e), {}) : {};
le.filterProps = ur;
process.env.NODE_ENV !== "production" && pc.reduce((e, t) => (e[t] = gt, e), {});
function ws(e = 8, t = fr({
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
function dr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? an(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Pe(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ne(e, t) {
  return ue({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const mc = Ne("border", Pe), yc = Ne("borderTop", Pe), bc = Ne("borderRight", Pe), xc = Ne("borderBottom", Pe), Sc = Ne("borderLeft", Pe), vc = Ne("borderColor"), wc = Ne("borderTopColor"), Cc = Ne("borderRightColor"), Tc = Ne("borderBottomColor"), Ec = Ne("borderLeftColor"), Oc = Ne("outline", Pe), Rc = Ne("outlineColor"), pr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = bn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Ct(t, r)
    });
    return Le(e, e.borderRadius, n);
  }
  return null;
};
pr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: gt
} : {};
pr.filterProps = ["borderRadius"];
dr(mc, yc, bc, xc, Sc, vc, wc, Cc, Tc, Ec, pr, Oc, Rc);
const gr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = bn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Ct(t, r)
    });
    return Le(e, e.gap, n);
  }
  return null;
};
gr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: gt
} : {};
gr.filterProps = ["gap"];
const hr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = bn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Ct(t, r)
    });
    return Le(e, e.columnGap, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: gt
} : {};
hr.filterProps = ["columnGap"];
const mr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = bn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Ct(t, r)
    });
    return Le(e, e.rowGap, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: gt
} : {};
mr.filterProps = ["rowGap"];
const Ac = ue({
  prop: "gridColumn"
}), kc = ue({
  prop: "gridRow"
}), $c = ue({
  prop: "gridAutoFlow"
}), Pc = ue({
  prop: "gridAutoColumns"
}), jc = ue({
  prop: "gridAutoRows"
}), Nc = ue({
  prop: "gridTemplateColumns"
}), _c = ue({
  prop: "gridTemplateRows"
}), Lc = ue({
  prop: "gridTemplateAreas"
}), Ic = ue({
  prop: "gridArea"
});
dr(gr, hr, mr, Ac, kc, $c, Pc, jc, Nc, _c, Lc, Ic);
function Jt(e, t) {
  return t === "grey" ? t : e;
}
const Mc = ue({
  prop: "color",
  themeKey: "palette",
  transform: Jt
}), Dc = ue({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Jt
}), Fc = ue({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Jt
});
dr(Mc, Dc, Fc);
function Ae(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Bc = ue({
  prop: "width",
  transform: Ae
}), ho = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var o, i, s, a, l;
      const r = ((s = (i = (o = e.theme) == null ? void 0 : o.breakpoints) == null ? void 0 : i.values) == null ? void 0 : s[n]) || ar[n];
      return r ? ((l = (a = e.theme) == null ? void 0 : a.breakpoints) == null ? void 0 : l.unit) !== "px" ? {
        maxWidth: `${r}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: r
      } : {
        maxWidth: Ae(n)
      };
    };
    return Le(e, e.maxWidth, t);
  }
  return null;
};
ho.filterProps = ["maxWidth"];
const Vc = ue({
  prop: "minWidth",
  transform: Ae
}), Uc = ue({
  prop: "height",
  transform: Ae
}), zc = ue({
  prop: "maxHeight",
  transform: Ae
}), Jc = ue({
  prop: "minHeight",
  transform: Ae
});
ue({
  prop: "size",
  cssProperty: "width",
  transform: Ae
});
ue({
  prop: "size",
  cssProperty: "height",
  transform: Ae
});
const Gc = ue({
  prop: "boxSizing"
});
dr(Bc, ho, Vc, Uc, zc, Jc, Gc);
const xn = {
  // borders
  border: {
    themeKey: "borders",
    transform: Pe
  },
  borderTop: {
    themeKey: "borders",
    transform: Pe
  },
  borderRight: {
    themeKey: "borders",
    transform: Pe
  },
  borderBottom: {
    themeKey: "borders",
    transform: Pe
  },
  borderLeft: {
    themeKey: "borders",
    transform: Pe
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
    transform: Pe
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: pr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Jt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Jt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Jt
  },
  // spacing
  p: {
    style: le
  },
  pt: {
    style: le
  },
  pr: {
    style: le
  },
  pb: {
    style: le
  },
  pl: {
    style: le
  },
  px: {
    style: le
  },
  py: {
    style: le
  },
  padding: {
    style: le
  },
  paddingTop: {
    style: le
  },
  paddingRight: {
    style: le
  },
  paddingBottom: {
    style: le
  },
  paddingLeft: {
    style: le
  },
  paddingX: {
    style: le
  },
  paddingY: {
    style: le
  },
  paddingInline: {
    style: le
  },
  paddingInlineStart: {
    style: le
  },
  paddingInlineEnd: {
    style: le
  },
  paddingBlock: {
    style: le
  },
  paddingBlockStart: {
    style: le
  },
  paddingBlockEnd: {
    style: le
  },
  m: {
    style: ae
  },
  mt: {
    style: ae
  },
  mr: {
    style: ae
  },
  mb: {
    style: ae
  },
  ml: {
    style: ae
  },
  mx: {
    style: ae
  },
  my: {
    style: ae
  },
  margin: {
    style: ae
  },
  marginTop: {
    style: ae
  },
  marginRight: {
    style: ae
  },
  marginBottom: {
    style: ae
  },
  marginLeft: {
    style: ae
  },
  marginX: {
    style: ae
  },
  marginY: {
    style: ae
  },
  marginInline: {
    style: ae
  },
  marginInlineStart: {
    style: ae
  },
  marginInlineEnd: {
    style: ae
  },
  marginBlock: {
    style: ae
  },
  marginBlockStart: {
    style: ae
  },
  marginBlockEnd: {
    style: ae
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
    style: gr
  },
  rowGap: {
    style: mr
  },
  columnGap: {
    style: hr
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
    transform: Ae
  },
  maxWidth: {
    style: ho
  },
  minWidth: {
    transform: Ae
  },
  height: {
    transform: Ae
  },
  maxHeight: {
    transform: Ae
  },
  minHeight: {
    transform: Ae
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
function Wc(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Hc(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Kc() {
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
      transform: u,
      style: d
    } = a;
    if (r == null)
      return null;
    if (c === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const p = lr(o, c) || {};
    return d ? d(s) : Le(s, r, (m) => {
      let f = Yn(p, u, m);
      return m === f && typeof m == "string" && (f = Yn(p, u, `${n}${m === "default" ? "" : Te(m)}`, m)), l === !1 ? f : {
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
    const i = o.unstable_sxConfig ?? xn;
    function s(a) {
      let l = a;
      if (typeof a == "function")
        l = a(o);
      else if (typeof a != "object")
        return a;
      if (!l)
        return null;
      const c = xs(o.breakpoints), u = Object.keys(c);
      let d = c;
      return Object.keys(l).forEach((p) => {
        const S = Hc(l[p], o);
        if (S != null)
          if (typeof S == "object")
            if (i[p])
              d = an(d, e(p, S, o, i));
            else {
              const m = Le({
                theme: o
              }, S, (f) => ({
                [p]: f
              }));
              Wc(m, S) ? d[p] = t({
                sx: S,
                theme: o
              }) : d = an(d, m);
            }
          else
            d = an(d, e(p, S, o, i));
      }), tc(o, Ss(u, d));
    }
    return Array.isArray(r) ? r.map(s) : s(r);
  }
  return t;
}
const Ht = Kc();
Ht.filterProps = ["sx"];
function qc(e, t) {
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
function yr(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {},
    ...s
  } = e, a = ec(n), l = ws(o);
  let c = Ee({
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
      ...ic,
      ...i
    }
  }, s);
  return c = oc(c), c.applyStyles = qc, c = t.reduce((u, d) => Ee(u, d), c), c.unstable_sxConfig = {
    ...xn,
    ...s == null ? void 0 : s.unstable_sxConfig
  }, c.unstable_sx = function(d) {
    return Ht({
      sx: d,
      theme: this
    });
  }, c;
}
function Yc(e) {
  return Object.keys(e).length === 0;
}
function Xc(e = null) {
  const t = D.useContext(Tl);
  return !t || Yc(t) ? e : t;
}
const Zc = yr();
function Qc(e = Zc) {
  return Xc(e);
}
const eu = (e) => {
  var r;
  const t = {
    systemProps: {},
    otherProps: {}
  }, n = ((r = e == null ? void 0 : e.theme) == null ? void 0 : r.unstable_sxConfig) ?? xn;
  return Object.keys(e).forEach((o) => {
    n[o] ? t.systemProps[o] = e[o] : t.otherProps[o] = e[o];
  }), t;
};
function tu(e) {
  const {
    sx: t,
    ...n
  } = e, {
    systemProps: r,
    otherProps: o
  } = eu(n);
  let i;
  return Array.isArray(t) ? i = [r, ...t] : typeof t == "function" ? i = (...s) => {
    const a = t(...s);
    return Ge(a) ? {
      ...r,
      ...a
    } : r;
  } : i = {
    ...r,
    ...t
  }, {
    ...o,
    sx: i
  };
}
const Ko = (e) => e, nu = () => {
  let e = Ko;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ko;
    }
  };
}, ru = nu();
function Cs(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = Cs(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function He() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = Cs(e)) && (r && (r += " "), r += t);
  return r;
}
const ou = {
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
function Sn(e, t, n = "Mui") {
  const r = ou[t];
  return r ? `${n}-${r}` : `${ru.generate(e)}-${t}`;
}
function Ts(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Sn(e, o, n);
  }), r;
}
function Es(e, t = "") {
  return e.displayName || e.name || t;
}
function qo(e, t, n) {
  const r = Es(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function iu(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Es(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case qn.ForwardRef:
          return qo(e, e.render, "ForwardRef");
        case qn.Memo:
          return qo(e, e.type, "memo");
        default:
          return;
      }
  }
}
function Os(e) {
  const {
    variants: t,
    ...n
  } = e, r = {
    variants: t,
    style: Uo(n),
    isProcessed: !0
  };
  return r.style === n || t && t.forEach((o) => {
    typeof o.style != "function" && (o.style = Uo(o.style));
  }), r;
}
const su = yr();
function Mr(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
function au(e) {
  return e ? (t, n) => n[e] : null;
}
function lu(e, t, n) {
  e.theme = fu(e.theme) ? n : e.theme[t] || e.theme;
}
function Fn(e, t) {
  const n = typeof t == "function" ? t(e) : t;
  if (Array.isArray(n))
    return n.flatMap((r) => Fn(e, r));
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
    return Rs(e, n.variants, [r]);
  }
  return n != null && n.isProcessed ? n.style : n;
}
function Rs(e, t, n = []) {
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
function As(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = su,
    rootShouldForwardProp: r = Mr,
    slotShouldForwardProp: o = Mr
  } = e;
  function i(a) {
    lu(a, t, n);
  }
  return (a, l = {}) => {
    ql(a, (A) => A.filter((P) => P !== Ht));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: d,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: S = au(ks(u)),
      ...m
    } = l, f = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), x = p || !1;
    let E = Mr;
    u === "Root" || u === "root" ? E = r : u ? E = o : du(a) && (E = void 0);
    const j = Kl(a, {
      shouldForwardProp: E,
      label: uu(c, u),
      ...m
    }), R = (A) => {
      if (typeof A == "function" && A.__emotion_real !== A)
        return function(N) {
          return Fn(N, A);
        };
      if (Ge(A)) {
        const P = Os(A);
        return P.variants ? function(V) {
          return Fn(V, P);
        } : P.style;
      }
      return A;
    }, C = (...A) => {
      const P = [], N = A.map(R), V = [];
      if (P.push(i), c && S && V.push(function(_) {
        var K, Se;
        const I = (Se = (K = _.theme.components) == null ? void 0 : K[c]) == null ? void 0 : Se.styleOverrides;
        if (!I)
          return null;
        const Y = {};
        for (const Z in I)
          Y[Z] = Fn(_, I[Z]);
        return S(_, Y);
      }), c && !f && V.push(function(_) {
        var Y, K;
        const F = _.theme, I = (K = (Y = F == null ? void 0 : F.components) == null ? void 0 : Y[c]) == null ? void 0 : K.variants;
        return I ? Rs(_, I) : null;
      }), x || V.push(Ht), Array.isArray(N[0])) {
        const k = N.shift(), _ = new Array(P.length).fill(""), F = new Array(V.length).fill("");
        let I;
        I = [..._, ...k, ...F], I.raw = [..._, ...k.raw, ...F], P.unshift(I);
      }
      const G = [...P, ...N, ...V], g = j(...G);
      return a.muiName && (g.muiName = a.muiName), process.env.NODE_ENV !== "production" && (g.displayName = cu(c, u, a)), g;
    };
    return j.withConfig && (C.withConfig = j.withConfig), C;
  };
}
function cu(e, t, n) {
  return e ? `${e}${Te(t || "")}` : `Styled(${iu(n)})`;
}
function uu(e, t) {
  let n;
  return process.env.NODE_ENV !== "production" && e && (n = `${e}-${ks(t || "Root")}`), n;
}
function fu(e) {
  for (const t in e)
    return !1;
  return !0;
}
function du(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function ks(e) {
  return e && e.charAt(0).toLowerCase() + e.slice(1);
}
const pu = As();
function Xn(e, t) {
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
              n[o][l] = Xn(i[l], s[l]);
            }
        }
      } else n[o] === void 0 && (n[o] = e[o]);
    }
  return n;
}
function gu(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Xn(t.components[n].defaultProps, r);
}
function hu({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = Qc(n);
  return r && (o = o[r] || o), gu({
    theme: o,
    name: t,
    props: e
  });
}
const $s = typeof window < "u" ? D.useLayoutEffect : D.useEffect;
function zt(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function mo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), zt(e, t, n);
}
function mu(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), process.env.NODE_ENV !== "production" && e.length !== e.trim().length && console.error(`MUI: The color: "${e}" is invalid. Make sure the color input doesn't contain leading/trailing space.`), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function ft(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return ft(mu(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(n))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : ut(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(o))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : ut(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
const yu = (e) => {
  const t = ft(e);
  return t.values.slice(0, 3).map((n, r) => t.type.includes("hsl") && r !== 0 ? `${n}%` : n).join(" ");
}, on = (e, t) => {
  try {
    return yu(e);
  } catch {
    return t && process.env.NODE_ENV !== "production" && console.warn(t), e;
  }
};
function br(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.includes("rgb") ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.includes("hsl") && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.includes("color") ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Ps(e) {
  e = ft(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (c, u = (c + n / 30) % 12) => o - i * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let a = "rgb";
  const l = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (a += "a", l.push(t[3])), br({
    type: a,
    values: l
  });
}
function Yr(e) {
  e = ft(e);
  let t = e.type === "hsl" || e.type === "hsla" ? ft(Ps(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Yo(e, t) {
  const n = Yr(e), r = Yr(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Xr(e, t) {
  return e = ft(e), t = mo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, br(e);
}
function An(e, t, n) {
  try {
    return Xr(e, t);
  } catch {
    return e;
  }
}
function un(e, t) {
  if (e = ft(e), t = mo(t), e.type.includes("hsl"))
    e.values[2] *= 1 - t;
  else if (e.type.includes("rgb") || e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return br(e);
}
function ne(e, t, n) {
  try {
    return un(e, t);
  } catch {
    return e;
  }
}
function fn(e, t) {
  if (e = ft(e), t = mo(t), e.type.includes("hsl"))
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.includes("rgb"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.includes("color"))
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return br(e);
}
function re(e, t, n) {
  try {
    return fn(e, t);
  } catch {
    return e;
  }
}
function bu(e, t = 0.15) {
  return Yr(e) > 0.5 ? un(e, t) : fn(e, t);
}
function kn(e, t, n) {
  try {
    return bu(e, t);
  } catch {
    return e;
  }
}
function Xo(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function Bn(e) {
  return e && e.ownerDocument || document;
}
function xu(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
function Su({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = D.useRef(e !== void 0), [i, s] = D.useState(t), a = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    D.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: c
    } = D.useRef(t);
    D.useEffect(() => {
      !o && !Object.is(c, t) && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const l = D.useCallback((c) => {
    o || s(c);
  }, []);
  return [a, l];
}
function Dr(e) {
  const t = D.useRef(e);
  return $s(() => {
    t.current = e;
  }), D.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function js(...e) {
  return D.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      xu(n, t);
    });
  }, e);
}
function Zo(e) {
  try {
    return e.matches(":focus-visible");
  } catch {
    process.env.NODE_ENV !== "production" && !/jsdom/.test(window.navigator.userAgent) && console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join(`
`));
  }
  return !1;
}
const vu = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: "-1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
};
function yo(e, t, n = void 0) {
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
function wu(e) {
  return typeof e == "string";
}
function Cu(e, t, n) {
  return e === void 0 || wu(e) ? t : {
    ...t,
    ownerState: {
      ...t.ownerState,
      ...n
    }
  };
}
function Vn(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Qo(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Tu(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const S = He(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = {
      ...n == null ? void 0 : n.style,
      ...o == null ? void 0 : o.style,
      ...r == null ? void 0 : r.style
    }, f = {
      ...n,
      ...o,
      ...r
    };
    return S.length > 0 && (f.className = S), Object.keys(m).length > 0 && (f.style = m), {
      props: f,
      internalRef: void 0
    };
  }
  const s = Vn({
    ...o,
    ...r
  }), a = Qo(r), l = Qo(o), c = t(s), u = He(c == null ? void 0 : c.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), d = {
    ...c == null ? void 0 : c.style,
    ...n == null ? void 0 : n.style,
    ...o == null ? void 0 : o.style,
    ...r == null ? void 0 : r.style
  }, p = {
    ...c,
    ...n,
    ...l,
    ...a
  };
  return u.length > 0 && (p.className = u), Object.keys(d).length > 0 && (p.style = d), {
    props: p,
    internalRef: c.ref
  };
}
function Eu(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function st(e) {
  var d;
  const {
    elementType: t,
    externalSlotProps: n,
    ownerState: r,
    skipResolvingSlotProps: o = !1,
    ...i
  } = e, s = o ? {} : Eu(n, r), {
    props: a,
    internalRef: l
  } = Tu({
    ...i,
    externalSlotProps: s
  }), c = js(l, s == null ? void 0 : s.ref, (d = e.additionalProps) == null ? void 0 : d.ref);
  return Cu(t, {
    ...a,
    ref: c
  }, r);
}
const Ou = /* @__PURE__ */ D.createContext();
process.env.NODE_ENV !== "production" && (h.node, h.bool);
const Ru = () => D.useContext(Ou) ?? !1, Au = /* @__PURE__ */ D.createContext(void 0);
process.env.NODE_ENV !== "production" && (h.node, h.object);
function ku(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  if (!t || !t.components || !t.components[n])
    return r;
  const o = t.components[n];
  return o.defaultProps ? Xn(o.defaultProps, r) : !o.styleOverrides && !o.variants ? Xn(o, r) : r;
}
function $u({
  props: e,
  name: t
}) {
  const n = D.useContext(Au);
  return ku({
    props: e,
    name: t,
    theme: {
      components: n
    }
  });
}
const ei = {
  theme: void 0
};
function Pu(e) {
  let t, n;
  return function(o) {
    let i = t;
    return (i === void 0 || o.theme !== n) && (ei.theme = o.theme, i = Os(e(ei)), t = i, n = o.theme), i;
  };
}
function ju(e = "") {
  function t(...r) {
    if (!r.length)
      return "";
    const o = r[0];
    return typeof o == "string" && !o.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${e ? `${e}-` : ""}${o}${t(...r.slice(1))})` : `, ${o}`;
  }
  return (r, ...o) => `var(--${e ? `${e}-` : ""}${r}${t(...o)})`;
}
const ti = (e, t, n, r = []) => {
  let o = e;
  t.forEach((i, s) => {
    s === t.length - 1 ? Array.isArray(o) ? o[Number(i)] = n : o && typeof o == "object" && (o[i] = n) : o && typeof o == "object" && (o[i] || (o[i] = r.includes(i) ? [] : {}), o = o[i]);
  });
}, Nu = (e, t, n) => {
  function r(o, i = [], s = []) {
    Object.entries(o).forEach(([a, l]) => {
      (!n || n && !n([...i, a])) && l != null && (typeof l == "object" && Object.keys(l).length > 0 ? r(l, [...i, a], Array.isArray(l) ? [...s, a] : s) : t([...i, a], l, s));
    });
  }
  r(e);
}, _u = (e, t) => typeof t == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((r) => e.includes(r)) || e[e.length - 1].toLowerCase().includes("opacity") ? t : `${t}px` : t;
function Fr(e, t) {
  const {
    prefix: n,
    shouldSkipGeneratingVar: r
  } = t || {}, o = {}, i = {}, s = {};
  return Nu(
    e,
    (a, l, c) => {
      if ((typeof l == "string" || typeof l == "number") && (!r || !r(a, l))) {
        const u = `--${n ? `${n}-` : ""}${a.join("-")}`, d = _u(a, l);
        Object.assign(o, {
          [u]: d
        }), ti(i, a, `var(${u})`, c), ti(s, a, `var(${u}, ${d})`, c);
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
function Lu(e, t = {}) {
  const {
    getSelector: n = x,
    disableCssColorScheme: r,
    colorSchemeSelector: o
  } = t, {
    colorSchemes: i = {},
    components: s,
    defaultColorScheme: a = "light",
    ...l
  } = e, {
    vars: c,
    css: u,
    varsWithDefaults: d
  } = Fr(l, t);
  let p = d;
  const S = {}, {
    [a]: m,
    ...f
  } = i;
  if (Object.entries(f || {}).forEach(([R, C]) => {
    const {
      vars: A,
      css: P,
      varsWithDefaults: N
    } = Fr(C, t);
    p = Ee(p, N), S[R] = {
      css: P,
      vars: A
    };
  }), m) {
    const {
      css: R,
      vars: C,
      varsWithDefaults: A
    } = Fr(m, t);
    p = Ee(p, A), S[a] = {
      css: R,
      vars: C
    };
  }
  function x(R, C) {
    var P, N;
    let A = o;
    if (o === "class" && (A = ".%s"), o === "data" && (A = "[data-%s]"), o != null && o.startsWith("data-") && !o.includes("%s") && (A = `[${o}="%s"]`), R) {
      if (A === "media")
        return e.defaultColorScheme === R ? ":root" : {
          [`@media (prefers-color-scheme: ${((N = (P = i[R]) == null ? void 0 : P.palette) == null ? void 0 : N.mode) || R})`]: {
            ":root": C
          }
        };
      if (A)
        return e.defaultColorScheme === R ? `:root, ${A.replace("%s", String(R))}` : A.replace("%s", String(R));
    }
    return ":root";
  }
  return {
    vars: p,
    generateThemeVars: () => {
      let R = {
        ...c
      };
      return Object.entries(S).forEach(([, {
        vars: C
      }]) => {
        R = Ee(R, C);
      }), R;
    },
    generateStyleSheets: () => {
      var V, G;
      const R = [], C = e.defaultColorScheme || "light";
      function A(g, k) {
        Object.keys(k).length && R.push(typeof g == "string" ? {
          [g]: {
            ...k
          }
        } : g);
      }
      A(n(void 0, {
        ...u
      }), u);
      const {
        [C]: P,
        ...N
      } = S;
      if (P) {
        const {
          css: g
        } = P, k = (G = (V = i[C]) == null ? void 0 : V.palette) == null ? void 0 : G.mode, _ = !r && k ? {
          colorScheme: k,
          ...g
        } : {
          ...g
        };
        A(n(C, {
          ..._
        }), _);
      }
      return Object.entries(N).forEach(([g, {
        css: k
      }]) => {
        var I, Y;
        const _ = (Y = (I = i[g]) == null ? void 0 : I.palette) == null ? void 0 : Y.mode, F = !r && _ ? {
          colorScheme: _,
          ...k
        } : {
          ...k
        };
        A(n(g, {
          ...F
        }), F);
      }), R;
    }
  };
}
function Iu(e) {
  return function(n) {
    return e === "media" ? (process.env.NODE_ENV !== "production" && n !== "light" && n !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${n}'.`), `@media (prefers-color-scheme: ${n})`) : e ? e.startsWith("data-") && !e.includes("%s") ? `[${e}="${n}"] &` : e === "class" ? `.${n} &` : e === "data" ? `[data-${n}] &` : `${e.replace("%s", n)} &` : "&";
  };
}
const Mu = yr(), Du = pu("div", {
  name: "MuiStack",
  slot: "Root",
  overridesResolver: (e, t) => t.root
});
function Fu(e) {
  return hu({
    props: e,
    name: "MuiStack",
    defaultTheme: Mu
  });
}
function Bu(e, t) {
  const n = D.Children.toArray(e).filter(Boolean);
  return n.reduce((r, o, i) => (r.push(o), i < n.length - 1 && r.push(/* @__PURE__ */ D.cloneElement(t, {
    key: `separator-${i}`
  })), r), []);
}
const Vu = (e) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[e], Uu = ({
  ownerState: e,
  theme: t
}) => {
  let n = {
    display: "flex",
    flexDirection: "column",
    ...Le({
      theme: t
    }, Ir({
      values: e.direction,
      breakpoints: t.breakpoints.values
    }), (r) => ({
      flexDirection: r
    }))
  };
  if (e.spacing) {
    const r = fr(t), o = Object.keys(t.breakpoints.values).reduce((l, c) => ((typeof e.spacing == "object" && e.spacing[c] != null || typeof e.direction == "object" && e.direction[c] != null) && (l[c] = !0), l), {}), i = Ir({
      values: e.direction,
      base: o
    }), s = Ir({
      values: e.spacing,
      base: o
    });
    typeof i == "object" && Object.keys(i).forEach((l, c, u) => {
      if (!i[l]) {
        const p = c > 0 ? i[u[c - 1]] : "column";
        i[l] = p;
      }
    }), n = Ee(n, Le({
      theme: t
    }, s, (l, c) => e.useFlexGap ? {
      gap: Ct(r, l)
    } : {
      // The useFlexGap={false} implement relies on each child to give up control of the margin.
      // We need to reset the margin to avoid double spacing.
      "& > :not(style):not(style)": {
        margin: 0
      },
      "& > :not(style) ~ :not(style)": {
        [`margin${Vu(c ? i[c] : e.direction)}`]: Ct(r, l)
      }
    }));
  }
  return n = ac(t.breakpoints, n), n;
};
function zu(e = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: t = Du,
    useThemeProps: n = Fu,
    componentName: r = "MuiStack"
  } = e, o = () => yo({
    root: ["root"]
  }, (l) => Sn(r, l), {}), i = t(Uu), s = /* @__PURE__ */ D.forwardRef(function(l, c) {
    const u = n(l), d = tu(u), {
      component: p = "div",
      direction: S = "column",
      spacing: m = 0,
      divider: f,
      children: x,
      className: E,
      useFlexGap: j = !1,
      ...R
    } = d, C = {
      direction: S,
      spacing: m,
      useFlexGap: j
    }, A = o();
    return /* @__PURE__ */ b.jsx(i, {
      as: p,
      ownerState: C,
      ref: c,
      className: He(A.root, E),
      ...R,
      children: f ? Bu(x, f) : x
    });
  });
  return process.env.NODE_ENV !== "production" && (s.propTypes = {
    children: h.node,
    direction: h.oneOfType([h.oneOf(["column-reverse", "column", "row-reverse", "row"]), h.arrayOf(h.oneOf(["column-reverse", "column", "row-reverse", "row"])), h.object]),
    divider: h.node,
    spacing: h.oneOfType([h.arrayOf(h.oneOfType([h.number, h.string])), h.number, h.object, h.string]),
    sx: h.oneOfType([h.arrayOf(h.oneOfType([h.func, h.object, h.bool])), h.func, h.object])
  }), s;
}
const dn = {
  black: "#000",
  white: "#fff"
}, Ju = {
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
}, Lt = {
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  700: "#7b1fa2"
}, It = {
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
  800: "#c62828"
}, en = {
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
  900: "#e65100"
}, Mt = {
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
  800: "#1565c0"
}, Dt = {
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
  900: "#01579b"
}, Ft = {
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20"
};
function Ns() {
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
      paper: dn.white,
      default: dn.white
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
const Gu = Ns();
function _s() {
  return {
    text: {
      primary: dn.white,
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
      active: dn.white,
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
const ni = _s();
function ri(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = fn(e.main, o) : t === "dark" && (e.dark = un(e.main, i)));
}
function Wu(e = "light") {
  return e === "dark" ? {
    main: Mt[200],
    light: Mt[50],
    dark: Mt[400]
  } : {
    main: Mt[700],
    light: Mt[400],
    dark: Mt[800]
  };
}
function Hu(e = "light") {
  return e === "dark" ? {
    main: Lt[200],
    light: Lt[50],
    dark: Lt[400]
  } : {
    main: Lt[500],
    light: Lt[300],
    dark: Lt[700]
  };
}
function Ku(e = "light") {
  return e === "dark" ? {
    main: It[500],
    light: It[300],
    dark: It[700]
  } : {
    main: It[700],
    light: It[400],
    dark: It[800]
  };
}
function qu(e = "light") {
  return e === "dark" ? {
    main: Dt[400],
    light: Dt[300],
    dark: Dt[700]
  } : {
    main: Dt[700],
    light: Dt[500],
    dark: Dt[900]
  };
}
function Yu(e = "light") {
  return e === "dark" ? {
    main: Ft[400],
    light: Ft[300],
    dark: Ft[700]
  } : {
    main: Ft[800],
    light: Ft[500],
    dark: Ft[900]
  };
}
function Xu(e = "light") {
  return e === "dark" ? {
    main: en[400],
    light: en[300],
    dark: en[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: en[500],
    dark: en[900]
  };
}
function bo(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2,
    ...o
  } = e, i = e.primary || Wu(t), s = e.secondary || Hu(t), a = e.error || Ku(t), l = e.info || qu(t), c = e.success || Yu(t), u = e.warning || Xu(t);
  function d(f) {
    const x = Yo(f, ni.text.primary) >= n ? ni.text.primary : Gu.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = Yo(f, x);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${x} on ${f}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return x;
  }
  const p = ({
    color: f,
    name: x,
    mainShade: E = 500,
    lightShade: j = 300,
    darkShade: R = 700
  }) => {
    if (f = {
      ...f
    }, !f.main && f[E] && (f.main = f[E]), !f.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${x ? ` (${x})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : ut(11, x ? ` (${x})` : "", E));
    if (typeof f.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${x ? ` (${x})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : ut(12, x ? ` (${x})` : "", JSON.stringify(f.main)));
    return ri(f, "light", j, r), ri(f, "dark", R, r), f.contrastText || (f.contrastText = d(f.main)), f;
  };
  let S;
  return t === "light" ? S = Ns() : t === "dark" && (S = _s()), process.env.NODE_ENV !== "production" && (S || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Ee({
    // A collection of common colors.
    common: {
      ...dn
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: p({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: p({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: p({
      color: a,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: p({
      color: u,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: p({
      color: l,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: p({
      color: c,
      name: "success"
    }),
    // The grey colors.
    grey: Ju,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: d,
    // Generate a rich color object.
    augmentColor: p,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r,
    // The light and dark mode object.
    ...S
  }, o);
}
function Zu(e) {
  const t = {};
  return Object.entries(e).forEach((r) => {
    const [o, i] = r;
    typeof i == "object" && (t[o] = `${i.fontStyle ? `${i.fontStyle} ` : ""}${i.fontVariant ? `${i.fontVariant} ` : ""}${i.fontWeight ? `${i.fontWeight} ` : ""}${i.fontStretch ? `${i.fontStretch} ` : ""}${i.fontSize || ""}${i.lineHeight ? `/${i.lineHeight} ` : ""}${i.fontFamily || ""}`);
  }), t;
}
function Qu(e, t) {
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
function ef(e) {
  return Math.round(e * 1e5) / 1e5;
}
const oi = {
  textTransform: "uppercase"
}, ii = '"Roboto", "Helvetica", "Arial", sans-serif';
function tf(e, t) {
  const {
    fontFamily: n = ii,
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
    pxToRem: u,
    ...d
  } = typeof t == "function" ? t(e) : t;
  process.env.NODE_ENV !== "production" && (typeof r != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof l != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = r / 14, S = u || ((x) => `${x / l * p}rem`), m = (x, E, j, R, C) => ({
    fontFamily: n,
    fontWeight: x,
    fontSize: S(E),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: j,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...n === ii ? {
      letterSpacing: `${ef(R / E)}em`
    } : {},
    ...C,
    ...c
  }), f = {
    h1: m(o, 96, 1.167, -1.5),
    h2: m(o, 60, 1.2, -0.5),
    h3: m(i, 48, 1.167, 0),
    h4: m(i, 34, 1.235, 0.25),
    h5: m(i, 24, 1.334, 0),
    h6: m(s, 20, 1.6, 0.15),
    subtitle1: m(i, 16, 1.75, 0.15),
    subtitle2: m(s, 14, 1.57, 0.1),
    body1: m(i, 16, 1.5, 0.15),
    body2: m(i, 14, 1.43, 0.15),
    button: m(s, 14, 1.75, 0.4, oi),
    caption: m(i, 12, 1.66, 0.4),
    overline: m(i, 12, 2.66, 1, oi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Ee({
    htmlFontSize: l,
    pxToRem: S,
    fontFamily: n,
    fontSize: r,
    fontWeightLight: o,
    fontWeightRegular: i,
    fontWeightMedium: s,
    fontWeightBold: a,
    ...f
  }, d, {
    clone: !1
    // No need to clone deep
  });
}
const nf = 0.2, rf = 0.14, of = 0.12;
function se(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${nf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${rf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${of})`].join(",");
}
const sf = ["none", se(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), se(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), se(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), se(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), se(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), se(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), se(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), se(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), se(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), se(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), se(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), se(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), se(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), se(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), se(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), se(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), se(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), se(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), se(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), se(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), se(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), se(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), se(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), se(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], af = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, lf = {
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
function si(e) {
  return `${Math.round(e)}ms`;
}
function cf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.min(Math.round((4 + 15 * t ** 0.25 + t / 5) * 10), 3e3);
}
function uf(e) {
  const t = {
    ...af,
    ...e.easing
  }, n = {
    ...lf,
    ...e.duration
  };
  return {
    getAutoHeightDuration: cf,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: a = t.easeInOut,
        delay: l = 0,
        ...c
      } = i;
      if (process.env.NODE_ENV !== "production") {
        const u = (p) => typeof p == "string", d = (p) => !Number.isNaN(parseFloat(p));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !d(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(a) || console.error('MUI: Argument "easing" must be a string.'), !d(l) && !u(l) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(c).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : si(s)} ${a} ${typeof l == "string" ? l : si(l)}`).join(",");
    },
    ...e,
    easing: t,
    duration: n
  };
}
const ff = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function df(e) {
  return Ge(e) || typeof e > "u" || typeof e == "string" || typeof e == "boolean" || typeof e == "number" || Array.isArray(e);
}
function Ls(e = {}) {
  const t = {
    ...e
  };
  function n(r) {
    const o = Object.entries(r);
    for (let i = 0; i < o.length; i++) {
      const [s, a] = o[i];
      !df(a) || s.startsWith("unstable_") ? delete r[s] : Ge(a) && (r[s] = {
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
function Zr(e = {}, ...t) {
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
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name or follow the [docs](https://mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature." : ut(20));
  const u = bo(i), d = yr(e);
  let p = Ee(d, {
    mixins: Qu(d.breakpoints, r),
    palette: u,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: sf.slice(),
    typography: tf(u, a),
    transitions: uf(s),
    zIndex: {
      ...ff
    }
  });
  if (p = Ee(p, c), p = t.reduce((S, m) => Ee(S, m), p), process.env.NODE_ENV !== "production") {
    const S = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], m = (f, x) => {
      let E;
      for (E in f) {
        const j = f[E];
        if (S.includes(E) && Object.keys(j).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const R = Sn("", E);
            console.error([`MUI: The \`${x}\` component increases the CSS specificity of the \`${E}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${R}' syntax:`, JSON.stringify({
              root: {
                [`&.${R}`]: j
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[E] = {};
        }
      }
    };
    Object.keys(p.components).forEach((f) => {
      const x = p.components[f].styleOverrides;
      x && f.startsWith("Mui") && m(x, f);
    });
  }
  return p.unstable_sxConfig = {
    ...xn,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, p.unstable_sx = function(m) {
    return Ht({
      sx: m,
      theme: this
    });
  }, p.toRuntimeSource = Ls, p;
}
function pf(e) {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, Math.round(t * 10) / 1e3;
}
const gf = [...Array(25)].map((e, t) => {
  if (t === 0)
    return "none";
  const n = pf(t);
  return `linear-gradient(rgba(255 255 255 / ${n}), rgba(255 255 255 / ${n}))`;
});
function Is(e) {
  return {
    inputPlaceholder: e === "dark" ? 0.5 : 0.42,
    inputUnderline: e === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: e === "dark" ? 0.2 : 0.12,
    switchTrack: e === "dark" ? 0.3 : 0.38
  };
}
function Ms(e) {
  return e === "dark" ? gf : [];
}
function hf(e) {
  const {
    palette: t = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: n,
    overlays: r,
    ...o
  } = e, i = bo(t);
  return {
    palette: i,
    opacity: {
      ...Is(i.mode),
      ...n
    },
    overlays: r || Ms(i.mode),
    ...o
  };
}
function mf(e) {
  var t;
  return !!e[0].match(/(cssVarPrefix|colorSchemeSelector|rootSelector|typography|mixins|breakpoints|direction|transitions)/) || !!e[0].match(/sxConfig$/) || // ends with sxConfig
  e[0] === "palette" && !!((t = e[1]) != null && t.match(/(mode|contrastThreshold|tonalOffset)/));
}
const yf = (e) => [...[...Array(25)].map((t, n) => `--${e ? `${e}-` : ""}overlays-${n}`), `--${e ? `${e}-` : ""}palette-AppBar-darkBg`, `--${e ? `${e}-` : ""}palette-AppBar-darkColor`], bf = (e) => (t, n) => {
  const r = e.rootSelector || ":root", o = e.colorSchemeSelector;
  let i = o;
  if (o === "class" && (i = ".%s"), o === "data" && (i = "[data-%s]"), o != null && o.startsWith("data-") && !o.includes("%s") && (i = `[${o}="%s"]`), e.defaultColorScheme === t) {
    if (t === "dark") {
      const s = {};
      return yf(e.cssVarPrefix).forEach((a) => {
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
function xf(e, t) {
  t.forEach((n) => {
    e[n] || (e[n] = {});
  });
}
function w(e, t, n) {
  !e[t] && n && (e[t] = n);
}
function sn(e) {
  return typeof e != "string" || !e.startsWith("hsl") ? e : Ps(e);
}
function Ze(e, t) {
  `${t}Channel` in e || (e[`${t}Channel`] = on(sn(e[t]), `MUI: Can't create \`palette.${t}Channel\` because \`palette.${t}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${t}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function Sf(e) {
  return typeof e == "number" ? `${e}px` : typeof e == "string" || typeof e == "function" || Array.isArray(e) ? e : "8px";
}
const ze = (e) => {
  try {
    return e();
  } catch {
  }
}, vf = (e = "mui") => ju(e);
function Br(e, t, n, r) {
  if (!t)
    return;
  t = t === !0 ? {} : t;
  const o = r === "dark" ? "dark" : "light";
  if (!n) {
    e[r] = hf({
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
  } = Zr({
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
      ...Is(o),
      ...t == null ? void 0 : t.opacity
    },
    overlays: (t == null ? void 0 : t.overlays) || Ms(o)
  }, s;
}
function wf(e = {}, ...t) {
  const {
    colorSchemes: n = {
      light: !0
    },
    defaultColorScheme: r,
    disableCssColorScheme: o = !1,
    cssVarPrefix: i = "mui",
    shouldSkipGeneratingVar: s = mf,
    colorSchemeSelector: a = n.light && n.dark ? "media" : void 0,
    rootSelector: l = ":root",
    ...c
  } = e, u = Object.keys(n)[0], d = r || (n.light && u !== "light" ? "light" : u), p = vf(i), {
    [d]: S,
    light: m,
    dark: f,
    ...x
  } = n, E = {
    ...x
  };
  let j = S;
  if ((d === "dark" && !("dark" in n) || d === "light" && !("light" in n)) && (j = !0), !j)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${d}\` option is either missing or invalid.` : ut(21, d));
  const R = Br(E, j, c, d);
  m && !E.light && Br(E, m, void 0, "light"), f && !E.dark && Br(E, f, void 0, "dark");
  let C = {
    defaultColorScheme: d,
    ...R,
    cssVarPrefix: i,
    colorSchemeSelector: a,
    rootSelector: l,
    getCssVar: p,
    colorSchemes: E,
    font: {
      ...Zu(R.typography),
      ...R.font
    },
    spacing: Sf(c.spacing)
  };
  Object.keys(C.colorSchemes).forEach((G) => {
    const g = C.colorSchemes[G].palette, k = (_) => {
      const F = _.split("-"), I = F[1], Y = F[2];
      return p(_, g[I][Y]);
    };
    if (g.mode === "light" && (w(g.common, "background", "#fff"), w(g.common, "onBackground", "#000")), g.mode === "dark" && (w(g.common, "background", "#000"), w(g.common, "onBackground", "#fff")), xf(g, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), g.mode === "light") {
      w(g.Alert, "errorColor", ne(g.error.light, 0.6)), w(g.Alert, "infoColor", ne(g.info.light, 0.6)), w(g.Alert, "successColor", ne(g.success.light, 0.6)), w(g.Alert, "warningColor", ne(g.warning.light, 0.6)), w(g.Alert, "errorFilledBg", k("palette-error-main")), w(g.Alert, "infoFilledBg", k("palette-info-main")), w(g.Alert, "successFilledBg", k("palette-success-main")), w(g.Alert, "warningFilledBg", k("palette-warning-main")), w(g.Alert, "errorFilledColor", ze(() => g.getContrastText(g.error.main))), w(g.Alert, "infoFilledColor", ze(() => g.getContrastText(g.info.main))), w(g.Alert, "successFilledColor", ze(() => g.getContrastText(g.success.main))), w(g.Alert, "warningFilledColor", ze(() => g.getContrastText(g.warning.main))), w(g.Alert, "errorStandardBg", re(g.error.light, 0.9)), w(g.Alert, "infoStandardBg", re(g.info.light, 0.9)), w(g.Alert, "successStandardBg", re(g.success.light, 0.9)), w(g.Alert, "warningStandardBg", re(g.warning.light, 0.9)), w(g.Alert, "errorIconColor", k("palette-error-main")), w(g.Alert, "infoIconColor", k("palette-info-main")), w(g.Alert, "successIconColor", k("palette-success-main")), w(g.Alert, "warningIconColor", k("palette-warning-main")), w(g.AppBar, "defaultBg", k("palette-grey-100")), w(g.Avatar, "defaultBg", k("palette-grey-400")), w(g.Button, "inheritContainedBg", k("palette-grey-300")), w(g.Button, "inheritContainedHoverBg", k("palette-grey-A100")), w(g.Chip, "defaultBorder", k("palette-grey-400")), w(g.Chip, "defaultAvatarColor", k("palette-grey-700")), w(g.Chip, "defaultIconColor", k("palette-grey-700")), w(g.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), w(g.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), w(g.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), w(g.LinearProgress, "primaryBg", re(g.primary.main, 0.62)), w(g.LinearProgress, "secondaryBg", re(g.secondary.main, 0.62)), w(g.LinearProgress, "errorBg", re(g.error.main, 0.62)), w(g.LinearProgress, "infoBg", re(g.info.main, 0.62)), w(g.LinearProgress, "successBg", re(g.success.main, 0.62)), w(g.LinearProgress, "warningBg", re(g.warning.main, 0.62)), w(g.Skeleton, "bg", `rgba(${k("palette-text-primaryChannel")} / 0.11)`), w(g.Slider, "primaryTrack", re(g.primary.main, 0.62)), w(g.Slider, "secondaryTrack", re(g.secondary.main, 0.62)), w(g.Slider, "errorTrack", re(g.error.main, 0.62)), w(g.Slider, "infoTrack", re(g.info.main, 0.62)), w(g.Slider, "successTrack", re(g.success.main, 0.62)), w(g.Slider, "warningTrack", re(g.warning.main, 0.62));
      const _ = kn(g.background.default, 0.8);
      w(g.SnackbarContent, "bg", _), w(g.SnackbarContent, "color", ze(() => g.getContrastText(_))), w(g.SpeedDialAction, "fabHoverBg", kn(g.background.paper, 0.15)), w(g.StepConnector, "border", k("palette-grey-400")), w(g.StepContent, "border", k("palette-grey-400")), w(g.Switch, "defaultColor", k("palette-common-white")), w(g.Switch, "defaultDisabledColor", k("palette-grey-100")), w(g.Switch, "primaryDisabledColor", re(g.primary.main, 0.62)), w(g.Switch, "secondaryDisabledColor", re(g.secondary.main, 0.62)), w(g.Switch, "errorDisabledColor", re(g.error.main, 0.62)), w(g.Switch, "infoDisabledColor", re(g.info.main, 0.62)), w(g.Switch, "successDisabledColor", re(g.success.main, 0.62)), w(g.Switch, "warningDisabledColor", re(g.warning.main, 0.62)), w(g.TableCell, "border", re(An(g.divider, 1), 0.88)), w(g.Tooltip, "bg", An(g.grey[700], 0.92));
    }
    if (g.mode === "dark") {
      w(g.Alert, "errorColor", re(g.error.light, 0.6)), w(g.Alert, "infoColor", re(g.info.light, 0.6)), w(g.Alert, "successColor", re(g.success.light, 0.6)), w(g.Alert, "warningColor", re(g.warning.light, 0.6)), w(g.Alert, "errorFilledBg", k("palette-error-dark")), w(g.Alert, "infoFilledBg", k("palette-info-dark")), w(g.Alert, "successFilledBg", k("palette-success-dark")), w(g.Alert, "warningFilledBg", k("palette-warning-dark")), w(g.Alert, "errorFilledColor", ze(() => g.getContrastText(g.error.dark))), w(g.Alert, "infoFilledColor", ze(() => g.getContrastText(g.info.dark))), w(g.Alert, "successFilledColor", ze(() => g.getContrastText(g.success.dark))), w(g.Alert, "warningFilledColor", ze(() => g.getContrastText(g.warning.dark))), w(g.Alert, "errorStandardBg", ne(g.error.light, 0.9)), w(g.Alert, "infoStandardBg", ne(g.info.light, 0.9)), w(g.Alert, "successStandardBg", ne(g.success.light, 0.9)), w(g.Alert, "warningStandardBg", ne(g.warning.light, 0.9)), w(g.Alert, "errorIconColor", k("palette-error-main")), w(g.Alert, "infoIconColor", k("palette-info-main")), w(g.Alert, "successIconColor", k("palette-success-main")), w(g.Alert, "warningIconColor", k("palette-warning-main")), w(g.AppBar, "defaultBg", k("palette-grey-900")), w(g.AppBar, "darkBg", k("palette-background-paper")), w(g.AppBar, "darkColor", k("palette-text-primary")), w(g.Avatar, "defaultBg", k("palette-grey-600")), w(g.Button, "inheritContainedBg", k("palette-grey-800")), w(g.Button, "inheritContainedHoverBg", k("palette-grey-700")), w(g.Chip, "defaultBorder", k("palette-grey-700")), w(g.Chip, "defaultAvatarColor", k("palette-grey-300")), w(g.Chip, "defaultIconColor", k("palette-grey-300")), w(g.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), w(g.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), w(g.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), w(g.LinearProgress, "primaryBg", ne(g.primary.main, 0.5)), w(g.LinearProgress, "secondaryBg", ne(g.secondary.main, 0.5)), w(g.LinearProgress, "errorBg", ne(g.error.main, 0.5)), w(g.LinearProgress, "infoBg", ne(g.info.main, 0.5)), w(g.LinearProgress, "successBg", ne(g.success.main, 0.5)), w(g.LinearProgress, "warningBg", ne(g.warning.main, 0.5)), w(g.Skeleton, "bg", `rgba(${k("palette-text-primaryChannel")} / 0.13)`), w(g.Slider, "primaryTrack", ne(g.primary.main, 0.5)), w(g.Slider, "secondaryTrack", ne(g.secondary.main, 0.5)), w(g.Slider, "errorTrack", ne(g.error.main, 0.5)), w(g.Slider, "infoTrack", ne(g.info.main, 0.5)), w(g.Slider, "successTrack", ne(g.success.main, 0.5)), w(g.Slider, "warningTrack", ne(g.warning.main, 0.5));
      const _ = kn(g.background.default, 0.98);
      w(g.SnackbarContent, "bg", _), w(g.SnackbarContent, "color", ze(() => g.getContrastText(_))), w(g.SpeedDialAction, "fabHoverBg", kn(g.background.paper, 0.15)), w(g.StepConnector, "border", k("palette-grey-600")), w(g.StepContent, "border", k("palette-grey-600")), w(g.Switch, "defaultColor", k("palette-grey-300")), w(g.Switch, "defaultDisabledColor", k("palette-grey-600")), w(g.Switch, "primaryDisabledColor", ne(g.primary.main, 0.55)), w(g.Switch, "secondaryDisabledColor", ne(g.secondary.main, 0.55)), w(g.Switch, "errorDisabledColor", ne(g.error.main, 0.55)), w(g.Switch, "infoDisabledColor", ne(g.info.main, 0.55)), w(g.Switch, "successDisabledColor", ne(g.success.main, 0.55)), w(g.Switch, "warningDisabledColor", ne(g.warning.main, 0.55)), w(g.TableCell, "border", ne(An(g.divider, 1), 0.68)), w(g.Tooltip, "bg", An(g.grey[700], 0.92));
    }
    Ze(g.background, "default"), Ze(g.background, "paper"), Ze(g.common, "background"), Ze(g.common, "onBackground"), Ze(g, "divider"), Object.keys(g).forEach((_) => {
      const F = g[_];
      _ !== "tonalOffset" && F && typeof F == "object" && (F.main && w(g[_], "mainChannel", on(sn(F.main))), F.light && w(g[_], "lightChannel", on(sn(F.light))), F.dark && w(g[_], "darkChannel", on(sn(F.dark))), F.contrastText && w(g[_], "contrastTextChannel", on(sn(F.contrastText))), _ === "text" && (Ze(g[_], "primary"), Ze(g[_], "secondary")), _ === "action" && (F.active && Ze(g[_], "active"), F.selected && Ze(g[_], "selected")));
    });
  }), C = t.reduce((G, g) => Ee(G, g), C);
  const A = {
    prefix: i,
    disableCssColorScheme: o,
    shouldSkipGeneratingVar: s,
    getSelector: bf(C)
  }, {
    vars: P,
    generateThemeVars: N,
    generateStyleSheets: V
  } = Lu(C, A);
  return C.vars = P, Object.entries(C.colorSchemes[C.defaultColorScheme]).forEach(([G, g]) => {
    C[G] = g;
  }), C.generateThemeVars = N, C.generateStyleSheets = V, C.generateSpacing = function() {
    return ws(c.spacing, fr(this));
  }, C.getColorSchemeSelector = Iu(a), C.spacing = C.generateSpacing(), C.shouldSkipGeneratingVar = s, C.unstable_sxConfig = {
    ...xn,
    ...c == null ? void 0 : c.unstable_sxConfig
  }, C.unstable_sx = function(g) {
    return Ht({
      sx: g,
      theme: this
    });
  }, C.toRuntimeSource = Ls, C;
}
function ai(e, t, n) {
  e.colorSchemes && n && (e.colorSchemes[t] = {
    ...n !== !0 && n,
    palette: bo({
      ...n === !0 ? {} : n.palette,
      mode: t
    })
    // cast type to skip module augmentation test
  });
}
function Ds(e = {}, ...t) {
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
      return Zr(e, ...t);
    let u = n;
    "palette" in e || c[a] && (c[a] !== !0 ? u = c[a].palette : a === "dark" && (u = {
      mode: "dark"
    }));
    const d = Zr({
      ...e,
      palette: u
    }, ...t);
    return d.defaultColorScheme = a, d.colorSchemes = c, d.palette.mode === "light" && (d.colorSchemes.light = {
      ...c.light !== !0 && c.light,
      palette: d.palette
    }, ai(d, "dark", c.dark)), d.palette.mode === "dark" && (d.colorSchemes.dark = {
      ...c.dark !== !0 && c.dark,
      palette: d.palette
    }, ai(d, "light", c.light)), d;
  }
  return !n && !("light" in c) && a === "light" && (c.light = !0), wf({
    ...s,
    colorSchemes: c,
    defaultColorScheme: a,
    ...typeof r != "boolean" && r
  }, ...t);
}
const Cf = Ds(), Tf = "$$material";
function xo(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Ef = (e) => xo(e) && e !== "classes", nt = As({
  themeId: Tf,
  defaultTheme: Cf,
  rootShouldForwardProp: Ef
});
process.env.NODE_ENV !== "production" && (h.node, h.object.isRequired);
function So(e) {
  return $u(e);
}
const Gt = zu({
  createStyledComponent: nt("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (e, t) => t.root
  }),
  useThemeProps: (e) => So({
    props: e,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (Gt.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: h.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: h.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: h.oneOfType([h.oneOf(["column-reverse", "column", "row-reverse", "row"]), h.arrayOf(h.oneOf(["column-reverse", "column", "row-reverse", "row"])), h.object]),
  /**
   * Add an element between each child.
   */
  divider: h.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: h.oneOfType([h.arrayOf(h.oneOfType([h.number, h.string])), h.number, h.object, h.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: h.oneOfType([h.arrayOf(h.oneOfType([h.func, h.object, h.bool])), h.func, h.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: h.bool
});
const U = (e) => typeof e == "string", tn = () => {
  let e, t;
  const n = new Promise((r, o) => {
    e = r, t = o;
  });
  return n.resolve = e, n.reject = t, n;
}, li = (e) => e == null ? "" : "" + e, Of = (e, t, n) => {
  e.forEach((r) => {
    t[r] && (n[r] = t[r]);
  });
}, Rf = /###/g, ci = (e) => e && e.indexOf("###") > -1 ? e.replace(Rf, ".") : e, ui = (e) => !e || U(e), ln = (e, t, n) => {
  const r = U(t) ? t.split(".") : t;
  let o = 0;
  for (; o < r.length - 1; ) {
    if (ui(e)) return {};
    const i = ci(r[o]);
    !e[i] && n && (e[i] = new n()), Object.prototype.hasOwnProperty.call(e, i) ? e = e[i] : e = {}, ++o;
  }
  return ui(e) ? {} : {
    obj: e,
    k: ci(r[o])
  };
}, fi = (e, t, n) => {
  const {
    obj: r,
    k: o
  } = ln(e, t, Object);
  if (r !== void 0 || t.length === 1) {
    r[o] = n;
    return;
  }
  let i = t[t.length - 1], s = t.slice(0, t.length - 1), a = ln(e, s, Object);
  for (; a.obj === void 0 && s.length; )
    i = `${s[s.length - 1]}.${i}`, s = s.slice(0, s.length - 1), a = ln(e, s, Object), a != null && a.obj && typeof a.obj[`${a.k}.${i}`] < "u" && (a.obj = void 0);
  a.obj[`${a.k}.${i}`] = n;
}, Af = (e, t, n, r) => {
  const {
    obj: o,
    k: i
  } = ln(e, t, Object);
  o[i] = o[i] || [], o[i].push(n);
}, Zn = (e, t) => {
  const {
    obj: n,
    k: r
  } = ln(e, t);
  if (n && Object.prototype.hasOwnProperty.call(n, r))
    return n[r];
}, kf = (e, t, n) => {
  const r = Zn(e, n);
  return r !== void 0 ? r : Zn(t, n);
}, Fs = (e, t, n) => {
  for (const r in t)
    r !== "__proto__" && r !== "constructor" && (r in e ? U(e[r]) || e[r] instanceof String || U(t[r]) || t[r] instanceof String ? n && (e[r] = t[r]) : Fs(e[r], t[r], n) : e[r] = t[r]);
  return e;
}, Bt = (e) => e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var $f = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
const Pf = (e) => U(e) ? e.replace(/[&<>"'\/]/g, (t) => $f[t]) : e;
class jf {
  constructor(t) {
    this.capacity = t, this.regExpMap = /* @__PURE__ */ new Map(), this.regExpQueue = [];
  }
  getRegExp(t) {
    const n = this.regExpMap.get(t);
    if (n !== void 0)
      return n;
    const r = new RegExp(t);
    return this.regExpQueue.length === this.capacity && this.regExpMap.delete(this.regExpQueue.shift()), this.regExpMap.set(t, r), this.regExpQueue.push(t), r;
  }
}
const Nf = [" ", ",", "?", "!", ";"], _f = new jf(20), Lf = (e, t, n) => {
  t = t || "", n = n || "";
  const r = Nf.filter((s) => t.indexOf(s) < 0 && n.indexOf(s) < 0);
  if (r.length === 0) return !0;
  const o = _f.getRegExp(`(${r.map((s) => s === "?" ? "\\?" : s).join("|")})`);
  let i = !o.test(e);
  if (!i) {
    const s = e.indexOf(n);
    s > 0 && !o.test(e.substring(0, s)) && (i = !0);
  }
  return i;
}, Qr = function(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!e) return;
  if (e[t])
    return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
  const r = t.split(n);
  let o = e;
  for (let i = 0; i < r.length; ) {
    if (!o || typeof o != "object")
      return;
    let s, a = "";
    for (let l = i; l < r.length; ++l)
      if (l !== i && (a += n), a += r[l], s = o[a], s !== void 0) {
        if (["string", "number", "boolean"].indexOf(typeof s) > -1 && l < r.length - 1)
          continue;
        i += l - i + 1;
        break;
      }
    o = s;
  }
  return o;
}, Qn = (e) => e == null ? void 0 : e.replace("_", "-"), If = {
  type: "logger",
  log(e) {
    this.output("log", e);
  },
  warn(e) {
    this.output("warn", e);
  },
  error(e) {
    this.output("error", e);
  },
  output(e, t) {
    var n, r;
    (r = (n = console == null ? void 0 : console[e]) == null ? void 0 : n.apply) == null || r.call(n, console, t);
  }
};
class er {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(t, n);
  }
  init(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = n.prefix || "i18next:", this.logger = t || If, this.options = n, this.debug = n.debug;
  }
  log() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "log", "", !0);
  }
  warn() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "warn", "", !0);
  }
  error() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "error", "");
  }
  deprecate() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(t, n, r, o) {
    return o && !this.debug ? null : (U(t[0]) && (t[0] = `${r}${this.prefix} ${t[0]}`), this.logger[n](t));
  }
  create(t) {
    return new er(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new er(this.logger, t);
  }
}
var We = new er();
class xr {
  constructor() {
    this.observers = {};
  }
  on(t, n) {
    return t.split(" ").forEach((r) => {
      this.observers[r] || (this.observers[r] = /* @__PURE__ */ new Map());
      const o = this.observers[r].get(n) || 0;
      this.observers[r].set(n, o + 1);
    }), this;
  }
  off(t, n) {
    if (this.observers[t]) {
      if (!n) {
        delete this.observers[t];
        return;
      }
      this.observers[t].delete(n);
    }
  }
  emit(t) {
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
      r[o - 1] = arguments[o];
    this.observers[t] && Array.from(this.observers[t].entries()).forEach((s) => {
      let [a, l] = s;
      for (let c = 0; c < l; c++)
        a(...r);
    }), this.observers["*"] && Array.from(this.observers["*"].entries()).forEach((s) => {
      let [a, l] = s;
      for (let c = 0; c < l; c++)
        a.apply(a, [t, ...r]);
    });
  }
}
class di extends xr {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super(), this.data = t || {}, this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(t) {
    this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
  }
  removeNamespaces(t) {
    const n = this.options.ns.indexOf(t);
    n > -1 && this.options.ns.splice(n, 1);
  }
  getResource(t, n, r) {
    var c, u;
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const i = o.keySeparator !== void 0 ? o.keySeparator : this.options.keySeparator, s = o.ignoreJSONStructure !== void 0 ? o.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let a;
    t.indexOf(".") > -1 ? a = t.split(".") : (a = [t, n], r && (Array.isArray(r) ? a.push(...r) : U(r) && i ? a.push(...r.split(i)) : a.push(r)));
    const l = Zn(this.data, a);
    return !l && !n && !r && t.indexOf(".") > -1 && (t = a[0], n = a[1], r = a.slice(2).join(".")), l || !s || !U(r) ? l : Qr((u = (c = this.data) == null ? void 0 : c[t]) == null ? void 0 : u[n], r, i);
  }
  addResource(t, n, r, o) {
    let i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const s = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator;
    let a = [t, n];
    r && (a = a.concat(s ? r.split(s) : r)), t.indexOf(".") > -1 && (a = t.split("."), o = n, n = a[1]), this.addNamespaces(n), fi(this.data, a, o), i.silent || this.emit("added", t, n, r, o);
  }
  addResources(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const i in r)
      (U(r[i]) || Array.isArray(r[i])) && this.addResource(t, n, i, r[i], {
        silent: !0
      });
    o.silent || this.emit("added", t, n, r);
  }
  addResourceBundle(t, n, r, o, i) {
    let s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1,
      skipCopy: !1
    }, a = [t, n];
    t.indexOf(".") > -1 && (a = t.split("."), o = r, r = n, n = a[1]), this.addNamespaces(n);
    let l = Zn(this.data, a) || {};
    s.skipCopy || (r = JSON.parse(JSON.stringify(r))), o ? Fs(l, r, i) : l = {
      ...l,
      ...r
    }, fi(this.data, a, l), s.silent || this.emit("added", t, n, r);
  }
  removeResourceBundle(t, n) {
    this.hasResourceBundle(t, n) && delete this.data[t][n], this.removeNamespaces(n), this.emit("removed", t, n);
  }
  hasResourceBundle(t, n) {
    return this.getResource(t, n) !== void 0;
  }
  getResourceBundle(t, n) {
    return n || (n = this.options.defaultNS), this.getResource(t, n);
  }
  getDataByLanguage(t) {
    return this.data[t];
  }
  hasLanguageSomeTranslations(t) {
    const n = this.getDataByLanguage(t);
    return !!(n && Object.keys(n) || []).find((o) => n[o] && Object.keys(n[o]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var Bs = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, t, n, r, o) {
    return e.forEach((i) => {
      var s;
      t = ((s = this.processors[i]) == null ? void 0 : s.process(t, n, r, o)) ?? t;
    }), t;
  }
};
const pi = {}, gi = (e) => !U(e) && typeof e != "boolean" && typeof e != "number";
class tr extends xr {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Of(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = We.create("translator");
  }
  changeLanguage(t) {
    t && (this.language = t);
  }
  exists(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    if (t == null)
      return !1;
    const r = this.resolve(t, n);
    return (r == null ? void 0 : r.res) !== void 0;
  }
  extractFromKey(t, n) {
    let r = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const o = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let i = n.ns || this.options.defaultNS || [];
    const s = r && t.indexOf(r) > -1, a = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !Lf(t, r, o);
    if (s && !a) {
      const l = t.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0)
        return {
          key: t,
          namespaces: U(i) ? [i] : i
        };
      const c = t.split(r);
      (r !== o || r === o && this.options.ns.indexOf(c[0]) > -1) && (i = c.shift()), t = c.join(o);
    }
    return {
      key: t,
      namespaces: U(i) ? [i] : i
    };
  }
  translate(t, n, r) {
    if (typeof n != "object" && this.options.overloadTranslationOptionHandler && (n = this.options.overloadTranslationOptionHandler(arguments)), typeof n == "object" && (n = {
      ...n
    }), n || (n = {}), t == null) return "";
    Array.isArray(t) || (t = [String(t)]);
    const o = n.returnDetails !== void 0 ? n.returnDetails : this.options.returnDetails, i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator, {
      key: s,
      namespaces: a
    } = this.extractFromKey(t[t.length - 1], n), l = a[a.length - 1], c = n.lng || this.language, u = n.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if ((c == null ? void 0 : c.toLowerCase()) === "cimode") {
      if (u) {
        const k = n.nsSeparator || this.options.nsSeparator;
        return o ? {
          res: `${l}${k}${s}`,
          usedKey: s,
          exactUsedKey: s,
          usedLng: c,
          usedNS: l,
          usedParams: this.getUsedParamsDetails(n)
        } : `${l}${k}${s}`;
      }
      return o ? {
        res: s,
        usedKey: s,
        exactUsedKey: s,
        usedLng: c,
        usedNS: l,
        usedParams: this.getUsedParamsDetails(n)
      } : s;
    }
    const d = this.resolve(t, n);
    let p = d == null ? void 0 : d.res;
    const S = (d == null ? void 0 : d.usedKey) || s, m = (d == null ? void 0 : d.exactUsedKey) || s, f = ["[object Number]", "[object Function]", "[object RegExp]"], x = n.joinArrays !== void 0 ? n.joinArrays : this.options.joinArrays, E = !this.i18nFormat || this.i18nFormat.handleAsObject, j = n.count !== void 0 && !U(n.count), R = tr.hasDefaultValue(n), C = j ? this.pluralResolver.getSuffix(c, n.count, n) : "", A = n.ordinal && j ? this.pluralResolver.getSuffix(c, n.count, {
      ordinal: !1
    }) : "", P = j && !n.ordinal && n.count === 0, N = P && n[`defaultValue${this.options.pluralSeparator}zero`] || n[`defaultValue${C}`] || n[`defaultValue${A}`] || n.defaultValue;
    let V = p;
    E && !p && R && (V = N);
    const G = gi(V), g = Object.prototype.toString.apply(V);
    if (E && V && G && f.indexOf(g) < 0 && !(U(x) && Array.isArray(V))) {
      if (!n.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const k = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(S, V, {
          ...n,
          ns: a
        }) : `key '${s} (${this.language})' returned an object instead of string.`;
        return o ? (d.res = k, d.usedParams = this.getUsedParamsDetails(n), d) : k;
      }
      if (i) {
        const k = Array.isArray(V), _ = k ? [] : {}, F = k ? m : S;
        for (const I in V)
          if (Object.prototype.hasOwnProperty.call(V, I)) {
            const Y = `${F}${i}${I}`;
            R && !p ? _[I] = this.translate(Y, {
              ...n,
              defaultValue: gi(N) ? N[I] : void 0,
              joinArrays: !1,
              ns: a
            }) : _[I] = this.translate(Y, {
              ...n,
              joinArrays: !1,
              ns: a
            }), _[I] === Y && (_[I] = V[I]);
          }
        p = _;
      }
    } else if (E && U(x) && Array.isArray(p))
      p = p.join(x), p && (p = this.extendTranslation(p, t, n, r));
    else {
      let k = !1, _ = !1;
      !this.isValidLookup(p) && R && (k = !0, p = N), this.isValidLookup(p) || (_ = !0, p = s);
      const I = (n.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && _ ? void 0 : p, Y = R && N !== p && this.options.updateMissing;
      if (_ || k || Y) {
        if (this.logger.log(Y ? "updateKey" : "missingKey", c, l, s, Y ? N : p), i) {
          const X = this.resolve(s, {
            ...n,
            keySeparator: !1
          });
          X && X.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let K = [];
        const Se = this.languageUtils.getFallbackCodes(this.options.fallbackLng, n.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && Se && Se[0])
          for (let X = 0; X < Se.length; X++)
            K.push(Se[X]);
        else this.options.saveMissingTo === "all" ? K = this.languageUtils.toResolveHierarchy(n.lng || this.language) : K.push(n.lng || this.language);
        const Z = (X, ye, W) => {
          var De;
          const $e = R && W !== p ? W : I;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(X, l, ye, $e, Y, n) : (De = this.backendConnector) != null && De.saveMissing && this.backendConnector.saveMissing(X, l, ye, $e, Y, n), this.emit("missingKey", X, l, ye, p);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && j ? K.forEach((X) => {
          const ye = this.pluralResolver.getSuffixes(X, n);
          P && n[`defaultValue${this.options.pluralSeparator}zero`] && ye.indexOf(`${this.options.pluralSeparator}zero`) < 0 && ye.push(`${this.options.pluralSeparator}zero`), ye.forEach((W) => {
            Z([X], s + W, n[`defaultValue${W}`] || N);
          });
        }) : Z(K, s, N));
      }
      p = this.extendTranslation(p, t, n, d, r), _ && p === s && this.options.appendNamespaceToMissingKey && (p = `${l}:${s}`), (_ || k) && this.options.parseMissingKeyHandler && (p = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${l}:${s}` : s, k ? p : void 0));
    }
    return o ? (d.res = p, d.usedParams = this.getUsedParamsDetails(n), d) : p;
  }
  extendTranslation(t, n, r, o, i) {
    var c, u;
    var s = this;
    if ((c = this.i18nFormat) != null && c.parse)
      t = this.i18nFormat.parse(t, {
        ...this.options.interpolation.defaultVariables,
        ...r
      }, r.lng || this.language || o.usedLng, o.usedNS, o.usedKey, {
        resolved: o
      });
    else if (!r.skipInterpolation) {
      r.interpolation && this.interpolator.init({
        ...r,
        interpolation: {
          ...this.options.interpolation,
          ...r.interpolation
        }
      });
      const d = U(t) && (((u = r == null ? void 0 : r.interpolation) == null ? void 0 : u.skipOnVariables) !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let p;
      if (d) {
        const m = t.match(this.interpolator.nestingRegexp);
        p = m && m.length;
      }
      let S = r.replace && !U(r.replace) ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (S = {
        ...this.options.interpolation.defaultVariables,
        ...S
      }), t = this.interpolator.interpolate(t, S, r.lng || this.language || o.usedLng, r), d) {
        const m = t.match(this.interpolator.nestingRegexp), f = m && m.length;
        p < f && (r.nest = !1);
      }
      !r.lng && o && o.res && (r.lng = this.language || o.usedLng), r.nest !== !1 && (t = this.interpolator.nest(t, function() {
        for (var m = arguments.length, f = new Array(m), x = 0; x < m; x++)
          f[x] = arguments[x];
        return (i == null ? void 0 : i[0]) === f[0] && !r.context ? (s.logger.warn(`It seems you are nesting recursively key: ${f[0]} in key: ${n[0]}`), null) : s.translate(...f, n);
      }, r)), r.interpolation && this.interpolator.reset();
    }
    const a = r.postProcess || this.options.postProcess, l = U(a) ? [a] : a;
    return t != null && (l != null && l.length) && r.applyPostProcessor !== !1 && (t = Bs.handle(l, t, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: {
        ...o,
        usedParams: this.getUsedParamsDetails(r)
      },
      ...r
    } : r, this)), t;
  }
  resolve(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r, o, i, s, a;
    return U(t) && (t = [t]), t.forEach((l) => {
      if (this.isValidLookup(r)) return;
      const c = this.extractFromKey(l, n), u = c.key;
      o = u;
      let d = c.namespaces;
      this.options.fallbackNS && (d = d.concat(this.options.fallbackNS));
      const p = n.count !== void 0 && !U(n.count), S = p && !n.ordinal && n.count === 0, m = n.context !== void 0 && (U(n.context) || typeof n.context == "number") && n.context !== "", f = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      d.forEach((x) => {
        var E, j;
        this.isValidLookup(r) || (a = x, !pi[`${f[0]}-${x}`] && ((E = this.utils) != null && E.hasLoadedNamespace) && !((j = this.utils) != null && j.hasLoadedNamespace(a)) && (pi[`${f[0]}-${x}`] = !0, this.logger.warn(`key "${o}" for languages "${f.join(", ")}" won't get resolved as namespace "${a}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), f.forEach((R) => {
          var P;
          if (this.isValidLookup(r)) return;
          s = R;
          const C = [u];
          if ((P = this.i18nFormat) != null && P.addLookupKeys)
            this.i18nFormat.addLookupKeys(C, u, R, x, n);
          else {
            let N;
            p && (N = this.pluralResolver.getSuffix(R, n.count, n));
            const V = `${this.options.pluralSeparator}zero`, G = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (p && (C.push(u + N), n.ordinal && N.indexOf(G) === 0 && C.push(u + N.replace(G, this.options.pluralSeparator)), S && C.push(u + V)), m) {
              const g = `${u}${this.options.contextSeparator}${n.context}`;
              C.push(g), p && (C.push(g + N), n.ordinal && N.indexOf(G) === 0 && C.push(g + N.replace(G, this.options.pluralSeparator)), S && C.push(g + V));
            }
          }
          let A;
          for (; A = C.pop(); )
            this.isValidLookup(r) || (i = A, r = this.getResource(R, x, A, n));
        }));
      });
    }), {
      res: r,
      usedKey: o,
      exactUsedKey: i,
      usedLng: s,
      usedNS: a
    };
  }
  isValidLookup(t) {
    return t !== void 0 && !(!this.options.returnNull && t === null) && !(!this.options.returnEmptyString && t === "");
  }
  getResource(t, n, r) {
    var i;
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return (i = this.i18nFormat) != null && i.getResource ? this.i18nFormat.getResource(t, n, r, o) : this.resourceStore.getResource(t, n, r, o);
  }
  getUsedParamsDetails() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    const n = ["defaultValue", "ordinal", "context", "replace", "lng", "lngs", "fallbackLng", "ns", "keySeparator", "nsSeparator", "returnObjects", "returnDetails", "joinArrays", "postProcess", "interpolation"], r = t.replace && !U(t.replace);
    let o = r ? t.replace : t;
    if (r && typeof t.count < "u" && (o.count = t.count), this.options.interpolation.defaultVariables && (o = {
      ...this.options.interpolation.defaultVariables,
      ...o
    }), !r) {
      o = {
        ...o
      };
      for (const i of n)
        delete o[i];
    }
    return o;
  }
  static hasDefaultValue(t) {
    const n = "defaultValue";
    for (const r in t)
      if (Object.prototype.hasOwnProperty.call(t, r) && n === r.substring(0, n.length) && t[r] !== void 0)
        return !0;
    return !1;
  }
}
class hi {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = We.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = Qn(t), !t || t.indexOf("-") < 0) return null;
    const n = t.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = Qn(t), !t || t.indexOf("-") < 0) return t;
    const n = t.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(t) {
    if (U(t) && t.indexOf("-") > -1) {
      let n;
      try {
        n = Intl.getCanonicalLocales(t)[0];
      } catch {
      }
      return n && this.options.lowerCaseLng && (n = n.toLowerCase()), n || (this.options.lowerCaseLng ? t.toLowerCase() : t);
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? t.toLowerCase() : t;
  }
  isSupportedCode(t) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (t = this.getLanguagePartFromCode(t)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(t) > -1;
  }
  getBestMatchFromCodes(t) {
    if (!t) return null;
    let n;
    return t.forEach((r) => {
      if (n) return;
      const o = this.formatLanguageCode(r);
      (!this.options.supportedLngs || this.isSupportedCode(o)) && (n = o);
    }), !n && this.options.supportedLngs && t.forEach((r) => {
      if (n) return;
      const o = this.getLanguagePartFromCode(r);
      if (this.isSupportedCode(o)) return n = o;
      n = this.options.supportedLngs.find((i) => {
        if (i === o) return i;
        if (!(i.indexOf("-") < 0 && o.indexOf("-") < 0) && (i.indexOf("-") > 0 && o.indexOf("-") < 0 && i.substring(0, i.indexOf("-")) === o || i.indexOf(o) === 0 && o.length > 1))
          return i;
      });
    }), n || (n = this.getFallbackCodes(this.options.fallbackLng)[0]), n;
  }
  getFallbackCodes(t, n) {
    if (!t) return [];
    if (typeof t == "function" && (t = t(n)), U(t) && (t = [t]), Array.isArray(t)) return t;
    if (!n) return t.default || [];
    let r = t[n];
    return r || (r = t[this.getScriptPartFromCode(n)]), r || (r = t[this.formatLanguageCode(n)]), r || (r = t[this.getLanguagePartFromCode(n)]), r || (r = t.default), r || [];
  }
  toResolveHierarchy(t, n) {
    const r = this.getFallbackCodes(n || this.options.fallbackLng || [], t), o = [], i = (s) => {
      s && (this.isSupportedCode(s) ? o.push(s) : this.logger.warn(`rejecting language code not found in supportedLngs: ${s}`));
    };
    return U(t) && (t.indexOf("-") > -1 || t.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && i(this.formatLanguageCode(t)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && i(this.getScriptPartFromCode(t)), this.options.load !== "currentOnly" && i(this.getLanguagePartFromCode(t))) : U(t) && i(this.formatLanguageCode(t)), r.forEach((s) => {
      o.indexOf(s) < 0 && i(this.formatLanguageCode(s));
    }), o;
  }
}
const mi = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
}, yi = {
  select: (e) => e === 1 ? "one" : "other",
  resolvedOptions: () => ({
    pluralCategories: ["one", "other"]
  })
};
class Mf {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = t, this.options = n, this.logger = We.create("pluralResolver"), this.pluralRulesCache = {};
  }
  addRule(t, n) {
    this.rules[t] = n;
  }
  clearCache() {
    this.pluralRulesCache = {};
  }
  getRule(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = Qn(t === "dev" ? "en" : t), o = n.ordinal ? "ordinal" : "cardinal", i = JSON.stringify({
      cleanedCode: r,
      type: o
    });
    if (i in this.pluralRulesCache)
      return this.pluralRulesCache[i];
    let s;
    try {
      s = new Intl.PluralRules(r, {
        type: o
      });
    } catch {
      if (!Intl)
        return this.logger.error("No Intl support, please use an Intl polyfill!"), yi;
      if (!t.match(/-|_/)) return yi;
      const l = this.languageUtils.getLanguagePartFromCode(t);
      s = this.getRule(l, n);
    }
    return this.pluralRulesCache[i] = s, s;
  }
  needsPlural(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = this.getRule(t, n);
    return r || (r = this.getRule("dev", n)), (r == null ? void 0 : r.resolvedOptions().pluralCategories.length) > 1;
  }
  getPluralFormsOfKey(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(t, r).map((o) => `${n}${o}`);
  }
  getSuffixes(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = this.getRule(t, n);
    return r || (r = this.getRule("dev", n)), r ? r.resolvedOptions().pluralCategories.sort((o, i) => mi[o] - mi[i]).map((o) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${o}`) : [];
  }
  getSuffix(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const o = this.getRule(t, r);
    return o ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${o.select(n)}` : (this.logger.warn(`no plural rule found for: ${t}`), this.getSuffix("dev", n, r));
  }
}
const bi = function(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", o = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, i = kf(e, t, n);
  return !i && o && U(n) && (i = Qr(e, n, r), i === void 0 && (i = Qr(t, n, r))), i;
}, Vr = (e) => e.replace(/\$/g, "$$$$");
class Df {
  constructor() {
    var n;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = We.create("interpolator"), this.options = t, this.format = ((n = t == null ? void 0 : t.interpolation) == null ? void 0 : n.format) || ((r) => r), this.init(t);
  }
  init() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    t.interpolation || (t.interpolation = {
      escapeValue: !0
    });
    const {
      escape: n,
      escapeValue: r,
      useRawValueToEscape: o,
      prefix: i,
      prefixEscaped: s,
      suffix: a,
      suffixEscaped: l,
      formatSeparator: c,
      unescapeSuffix: u,
      unescapePrefix: d,
      nestingPrefix: p,
      nestingPrefixEscaped: S,
      nestingSuffix: m,
      nestingSuffixEscaped: f,
      nestingOptionsSeparator: x,
      maxReplaces: E,
      alwaysFormat: j
    } = t.interpolation;
    this.escape = n !== void 0 ? n : Pf, this.escapeValue = r !== void 0 ? r : !0, this.useRawValueToEscape = o !== void 0 ? o : !1, this.prefix = i ? Bt(i) : s || "{{", this.suffix = a ? Bt(a) : l || "}}", this.formatSeparator = c || ",", this.unescapePrefix = u ? "" : d || "-", this.unescapeSuffix = this.unescapePrefix ? "" : u || "", this.nestingPrefix = p ? Bt(p) : S || Bt("$t("), this.nestingSuffix = m ? Bt(m) : f || Bt(")"), this.nestingOptionsSeparator = x || ",", this.maxReplaces = E || 1e3, this.alwaysFormat = j !== void 0 ? j : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const t = (n, r) => (n == null ? void 0 : n.source) === r ? (n.lastIndex = 0, n) : new RegExp(r, "g");
    this.regexp = t(this.regexp, `${this.prefix}(.+?)${this.suffix}`), this.regexpUnescape = t(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`), this.nestingRegexp = t(this.nestingRegexp, `${this.nestingPrefix}(.+?)${this.nestingSuffix}`);
  }
  interpolate(t, n, r, o) {
    var S;
    let i, s, a;
    const l = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {}, c = (m) => {
      if (m.indexOf(this.formatSeparator) < 0) {
        const j = bi(n, l, m, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(j, void 0, r, {
          ...o,
          ...n,
          interpolationkey: m
        }) : j;
      }
      const f = m.split(this.formatSeparator), x = f.shift().trim(), E = f.join(this.formatSeparator).trim();
      return this.format(bi(n, l, x, this.options.keySeparator, this.options.ignoreJSONStructure), E, r, {
        ...o,
        ...n,
        interpolationkey: x
      });
    };
    this.resetRegExp();
    const u = (o == null ? void 0 : o.missingInterpolationHandler) || this.options.missingInterpolationHandler, d = ((S = o == null ? void 0 : o.interpolation) == null ? void 0 : S.skipOnVariables) !== void 0 ? o.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (m) => Vr(m)
    }, {
      regex: this.regexp,
      safeValue: (m) => this.escapeValue ? Vr(this.escape(m)) : Vr(m)
    }].forEach((m) => {
      for (a = 0; i = m.regex.exec(t); ) {
        const f = i[1].trim();
        if (s = c(f), s === void 0)
          if (typeof u == "function") {
            const E = u(t, i, o);
            s = U(E) ? E : "";
          } else if (o && Object.prototype.hasOwnProperty.call(o, f))
            s = "";
          else if (d) {
            s = i[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${f} for interpolating ${t}`), s = "";
        else !U(s) && !this.useRawValueToEscape && (s = li(s));
        const x = m.safeValue(s);
        if (t = t.replace(i[0], x), d ? (m.regex.lastIndex += s.length, m.regex.lastIndex -= i[0].length) : m.regex.lastIndex = 0, a++, a >= this.maxReplaces)
          break;
      }
    }), t;
  }
  nest(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o, i, s;
    const a = (l, c) => {
      const u = this.nestingOptionsSeparator;
      if (l.indexOf(u) < 0) return l;
      const d = l.split(new RegExp(`${u}[ ]*{`));
      let p = `{${d[1]}`;
      l = d[0], p = this.interpolate(p, s);
      const S = p.match(/'/g), m = p.match(/"/g);
      (((S == null ? void 0 : S.length) ?? 0) % 2 === 0 && !m || m.length % 2 !== 0) && (p = p.replace(/'/g, '"'));
      try {
        s = JSON.parse(p), c && (s = {
          ...c,
          ...s
        });
      } catch (f) {
        return this.logger.warn(`failed parsing options string in nesting for key ${l}`, f), `${l}${u}${p}`;
      }
      return s.defaultValue && s.defaultValue.indexOf(this.prefix) > -1 && delete s.defaultValue, l;
    };
    for (; o = this.nestingRegexp.exec(t); ) {
      let l = [];
      s = {
        ...r
      }, s = s.replace && !U(s.replace) ? s.replace : s, s.applyPostProcessor = !1, delete s.defaultValue;
      let c = !1;
      if (o[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(o[1])) {
        const u = o[1].split(this.formatSeparator).map((d) => d.trim());
        o[1] = u.shift(), l = u, c = !0;
      }
      if (i = n(a.call(this, o[1].trim(), s), s), i && o[0] === t && !U(i)) return i;
      U(i) || (i = li(i)), i || (this.logger.warn(`missed to resolve ${o[1]} for nesting ${t}`), i = ""), c && (i = l.reduce((u, d) => this.format(u, d, r.lng, {
        ...r,
        interpolationkey: o[1].trim()
      }), i.trim())), t = t.replace(o[0], i), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
const Ff = (e) => {
  let t = e.toLowerCase().trim();
  const n = {};
  if (e.indexOf("(") > -1) {
    const r = e.split("(");
    t = r[0].toLowerCase().trim();
    const o = r[1].substring(0, r[1].length - 1);
    t === "currency" && o.indexOf(":") < 0 ? n.currency || (n.currency = o.trim()) : t === "relativetime" && o.indexOf(":") < 0 ? n.range || (n.range = o.trim()) : o.split(";").forEach((s) => {
      if (s) {
        const [a, ...l] = s.split(":"), c = l.join(":").trim().replace(/^'+|'+$/g, ""), u = a.trim();
        n[u] || (n[u] = c), c === "false" && (n[u] = !1), c === "true" && (n[u] = !0), isNaN(c) || (n[u] = parseInt(c, 10));
      }
    });
  }
  return {
    formatName: t,
    formatOptions: n
  };
}, Vt = (e) => {
  const t = {};
  return (n, r, o) => {
    let i = o;
    o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey] && (i = {
      ...i,
      [o.interpolationkey]: void 0
    });
    const s = r + JSON.stringify(i);
    let a = t[s];
    return a || (a = e(Qn(r), o), t[s] = a), a(n);
  };
};
class Bf {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = We.create("formatter"), this.options = t, this.formats = {
      number: Vt((n, r) => {
        const o = new Intl.NumberFormat(n, {
          ...r
        });
        return (i) => o.format(i);
      }),
      currency: Vt((n, r) => {
        const o = new Intl.NumberFormat(n, {
          ...r,
          style: "currency"
        });
        return (i) => o.format(i);
      }),
      datetime: Vt((n, r) => {
        const o = new Intl.DateTimeFormat(n, {
          ...r
        });
        return (i) => o.format(i);
      }),
      relativetime: Vt((n, r) => {
        const o = new Intl.RelativeTimeFormat(n, {
          ...r
        });
        return (i) => o.format(i, r.range || "day");
      }),
      list: Vt((n, r) => {
        const o = new Intl.ListFormat(n, {
          ...r
        });
        return (i) => o.format(i);
      })
    }, this.init(t);
  }
  init(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    this.formatSeparator = n.interpolation.formatSeparator || ",";
  }
  add(t, n) {
    this.formats[t.toLowerCase().trim()] = n;
  }
  addCached(t, n) {
    this.formats[t.toLowerCase().trim()] = Vt(n);
  }
  format(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const i = n.split(this.formatSeparator);
    if (i.length > 1 && i[0].indexOf("(") > 1 && i[0].indexOf(")") < 0 && i.find((a) => a.indexOf(")") > -1)) {
      const a = i.findIndex((l) => l.indexOf(")") > -1);
      i[0] = [i[0], ...i.splice(1, a)].join(this.formatSeparator);
    }
    return i.reduce((a, l) => {
      var d;
      const {
        formatName: c,
        formatOptions: u
      } = Ff(l);
      if (this.formats[c]) {
        let p = a;
        try {
          const S = ((d = o == null ? void 0 : o.formatParams) == null ? void 0 : d[o.interpolationkey]) || {}, m = S.locale || S.lng || o.locale || o.lng || r;
          p = this.formats[c](a, m, {
            ...u,
            ...o,
            ...S
          });
        } catch (S) {
          this.logger.warn(S);
        }
        return p;
      } else
        this.logger.warn(`there was no format function for ${c}`);
      return a;
    }, t);
  }
}
const Vf = (e, t) => {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
};
class Uf extends xr {
  constructor(t, n, r) {
    var i, s;
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = t, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = o, this.logger = We.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = o.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = o.maxRetries >= 0 ? o.maxRetries : 5, this.retryTimeout = o.retryTimeout >= 1 ? o.retryTimeout : 350, this.state = {}, this.queue = [], (s = (i = this.backend) == null ? void 0 : i.init) == null || s.call(i, r, o.backend, o);
  }
  queueLoad(t, n, r, o) {
    const i = {}, s = {}, a = {}, l = {};
    return t.forEach((c) => {
      let u = !0;
      n.forEach((d) => {
        const p = `${c}|${d}`;
        !r.reload && this.store.hasResourceBundle(c, d) ? this.state[p] = 2 : this.state[p] < 0 || (this.state[p] === 1 ? s[p] === void 0 && (s[p] = !0) : (this.state[p] = 1, u = !1, s[p] === void 0 && (s[p] = !0), i[p] === void 0 && (i[p] = !0), l[d] === void 0 && (l[d] = !0)));
      }), u || (a[c] = !0);
    }), (Object.keys(i).length || Object.keys(s).length) && this.queue.push({
      pending: s,
      pendingCount: Object.keys(s).length,
      loaded: {},
      errors: [],
      callback: o
    }), {
      toLoad: Object.keys(i),
      pending: Object.keys(s),
      toLoadLanguages: Object.keys(a),
      toLoadNamespaces: Object.keys(l)
    };
  }
  loaded(t, n, r) {
    const o = t.split("|"), i = o[0], s = o[1];
    n && this.emit("failedLoading", i, s, n), !n && r && this.store.addResourceBundle(i, s, r, void 0, void 0, {
      skipCopy: !0
    }), this.state[t] = n ? -1 : 2, n && r && (this.state[t] = 0);
    const a = {};
    this.queue.forEach((l) => {
      Af(l.loaded, [i], s), Vf(l, t), n && l.errors.push(n), l.pendingCount === 0 && !l.done && (Object.keys(l.loaded).forEach((c) => {
        a[c] || (a[c] = {});
        const u = l.loaded[c];
        u.length && u.forEach((d) => {
          a[c][d] === void 0 && (a[c][d] = !0);
        });
      }), l.done = !0, l.errors.length ? l.callback(l.errors) : l.callback());
    }), this.emit("loaded", a), this.queue = this.queue.filter((l) => !l.done);
  }
  read(t, n, r) {
    let o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, s = arguments.length > 5 ? arguments[5] : void 0;
    if (!t.length) return s(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: t,
        ns: n,
        fcName: r,
        tried: o,
        wait: i,
        callback: s
      });
      return;
    }
    this.readingCalls++;
    const a = (c, u) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const d = this.waitingReads.shift();
        this.read(d.lng, d.ns, d.fcName, d.tried, d.wait, d.callback);
      }
      if (c && u && o < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, t, n, r, o + 1, i * 2, s);
        }, i);
        return;
      }
      s(c, u);
    }, l = this.backend[r].bind(this.backend);
    if (l.length === 2) {
      try {
        const c = l(t, n);
        c && typeof c.then == "function" ? c.then((u) => a(null, u)).catch(a) : a(null, c);
      } catch (c) {
        a(c);
      }
      return;
    }
    return l(t, n, a);
  }
  prepareLoading(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), o && o();
    U(t) && (t = this.languageUtils.toResolveHierarchy(t)), U(n) && (n = [n]);
    const i = this.queueLoad(t, n, r, o);
    if (!i.toLoad.length)
      return i.pending.length || o(), null;
    i.toLoad.forEach((s) => {
      this.loadOne(s);
    });
  }
  load(t, n, r) {
    this.prepareLoading(t, n, {}, r);
  }
  reload(t, n, r) {
    this.prepareLoading(t, n, {
      reload: !0
    }, r);
  }
  loadOne(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const r = t.split("|"), o = r[0], i = r[1];
    this.read(o, i, "read", void 0, void 0, (s, a) => {
      s && this.logger.warn(`${n}loading namespace ${i} for language ${o} failed`, s), !s && a && this.logger.log(`${n}loaded namespace ${i} for language ${o}`, a), this.loaded(t, s, a);
    });
  }
  saveMissing(t, n, r, o, i) {
    var l, c, u, d, p;
    let s = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, a = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if ((c = (l = this.services) == null ? void 0 : l.utils) != null && c.hasLoadedNamespace && !((d = (u = this.services) == null ? void 0 : u.utils) != null && d.hasLoadedNamespace(n))) {
      this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(r == null || r === "")) {
      if ((p = this.backend) != null && p.create) {
        const S = {
          ...s,
          isUpdate: i
        }, m = this.backend.create.bind(this.backend);
        if (m.length < 6)
          try {
            let f;
            m.length === 5 ? f = m(t, n, r, o, S) : f = m(t, n, r, o), f && typeof f.then == "function" ? f.then((x) => a(null, x)).catch(a) : a(null, f);
          } catch (f) {
            a(f);
          }
        else
          m(t, n, r, o, a, S);
      }
      !t || !t[0] || this.store.addResource(t[0], n, r, o);
    }
  }
}
const xi = () => ({
  debug: !1,
  initAsync: !0,
  ns: ["translation"],
  defaultNS: ["translation"],
  fallbackLng: ["dev"],
  fallbackNS: !1,
  supportedLngs: !1,
  nonExplicitSupportedLngs: !1,
  load: "all",
  preload: !1,
  simplifyPluralSuffix: !0,
  keySeparator: ".",
  nsSeparator: ":",
  pluralSeparator: "_",
  contextSeparator: "_",
  partialBundledLanguages: !1,
  saveMissing: !1,
  updateMissing: !1,
  saveMissingTo: "fallback",
  saveMissingPlurals: !0,
  missingKeyHandler: !1,
  missingInterpolationHandler: !1,
  postProcess: !1,
  postProcessPassResolved: !1,
  returnNull: !1,
  returnEmptyString: !0,
  returnObjects: !1,
  joinArrays: !1,
  returnedObjectHandler: !1,
  parseMissingKeyHandler: !1,
  appendNamespaceToMissingKey: !1,
  appendNamespaceToCIMode: !1,
  overloadTranslationOptionHandler: (e) => {
    let t = {};
    if (typeof e[1] == "object" && (t = e[1]), U(e[1]) && (t.defaultValue = e[1]), U(e[2]) && (t.tDescription = e[2]), typeof e[2] == "object" || typeof e[3] == "object") {
      const n = e[3] || e[2];
      Object.keys(n).forEach((r) => {
        t[r] = n[r];
      });
    }
    return t;
  },
  interpolation: {
    escapeValue: !0,
    format: (e) => e,
    prefix: "{{",
    suffix: "}}",
    formatSeparator: ",",
    unescapePrefix: "-",
    nestingPrefix: "$t(",
    nestingSuffix: ")",
    nestingOptionsSeparator: ",",
    maxReplaces: 1e3,
    skipOnVariables: !0
  }
}), Si = (e) => {
  var t, n;
  return U(e.ns) && (e.ns = [e.ns]), U(e.fallbackLng) && (e.fallbackLng = [e.fallbackLng]), U(e.fallbackNS) && (e.fallbackNS = [e.fallbackNS]), ((n = (t = e.supportedLngs) == null ? void 0 : t.indexOf) == null ? void 0 : n.call(t, "cimode")) < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), typeof e.initImmediate == "boolean" && (e.initAsync = e.initImmediate), e;
}, $n = () => {
}, zf = (e) => {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((n) => {
    typeof e[n] == "function" && (e[n] = e[n].bind(e));
  });
};
class pn extends xr {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = Si(t), this.services = {}, this.logger = We, this.modules = {
      external: []
    }, zf(this), n && !this.isInitialized && !t.isClone) {
      if (!this.options.initAsync)
        return this.init(t, n), this;
      setTimeout(() => {
        this.init(t, n);
      }, 0);
    }
  }
  init() {
    var t = this;
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0;
    this.isInitializing = !0, typeof n == "function" && (r = n, n = {}), n.defaultNS == null && n.ns && (U(n.ns) ? n.defaultNS = n.ns : n.ns.indexOf("translation") < 0 && (n.defaultNS = n.ns[0]));
    const o = xi();
    this.options = {
      ...o,
      ...this.options,
      ...Si(n)
    }, this.options.interpolation = {
      ...o.interpolation,
      ...this.options.interpolation
    }, n.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = n.keySeparator), n.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = n.nsSeparator);
    const i = (u) => u ? typeof u == "function" ? new u() : u : null;
    if (!this.options.isClone) {
      this.modules.logger ? We.init(i(this.modules.logger), this.options) : We.init(null, this.options);
      let u;
      this.modules.formatter ? u = this.modules.formatter : u = Bf;
      const d = new hi(this.options);
      this.store = new di(this.options.resources, this.options);
      const p = this.services;
      p.logger = We, p.resourceStore = this.store, p.languageUtils = d, p.pluralResolver = new Mf(d, {
        prepend: this.options.pluralSeparator,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), u && (!this.options.interpolation.format || this.options.interpolation.format === o.interpolation.format) && (p.formatter = i(u), p.formatter.init(p, this.options), this.options.interpolation.format = p.formatter.format.bind(p.formatter)), p.interpolator = new Df(this.options), p.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, p.backendConnector = new Uf(i(this.modules.backend), p.resourceStore, p, this.options), p.backendConnector.on("*", function(S) {
        for (var m = arguments.length, f = new Array(m > 1 ? m - 1 : 0), x = 1; x < m; x++)
          f[x - 1] = arguments[x];
        t.emit(S, ...f);
      }), this.modules.languageDetector && (p.languageDetector = i(this.modules.languageDetector), p.languageDetector.init && p.languageDetector.init(p, this.options.detection, this.options)), this.modules.i18nFormat && (p.i18nFormat = i(this.modules.i18nFormat), p.i18nFormat.init && p.i18nFormat.init(this)), this.translator = new tr(this.services, this.options), this.translator.on("*", function(S) {
        for (var m = arguments.length, f = new Array(m > 1 ? m - 1 : 0), x = 1; x < m; x++)
          f[x - 1] = arguments[x];
        t.emit(S, ...f);
      }), this.modules.external.forEach((S) => {
        S.init && S.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, r || (r = $n), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const u = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      u.length > 0 && u[0] !== "dev" && (this.options.lng = u[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((u) => {
      this[u] = function() {
        return t.store[u](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((u) => {
      this[u] = function() {
        return t.store[u](...arguments), t;
      };
    });
    const l = tn(), c = () => {
      const u = (d, p) => {
        this.isInitializing = !1, this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), l.resolve(p), r(d, p);
      };
      if (this.languages && !this.isInitialized) return u(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, u);
    };
    return this.options.resources || !this.options.initAsync ? c() : setTimeout(c, 0), l;
  }
  loadResources(t) {
    var i, s;
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $n;
    const o = U(t) ? t : this.language;
    if (typeof t == "function" && (r = t), !this.options.resources || this.options.partialBundledLanguages) {
      if ((o == null ? void 0 : o.toLowerCase()) === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return r();
      const a = [], l = (c) => {
        if (!c || c === "cimode") return;
        this.services.languageUtils.toResolveHierarchy(c).forEach((d) => {
          d !== "cimode" && a.indexOf(d) < 0 && a.push(d);
        });
      };
      o ? l(o) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((u) => l(u)), (s = (i = this.options.preload) == null ? void 0 : i.forEach) == null || s.call(i, (c) => l(c)), this.services.backendConnector.load(a, this.options.ns, (c) => {
        !c && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), r(c);
      });
    } else
      r(null);
  }
  reloadResources(t, n, r) {
    const o = tn();
    return typeof t == "function" && (r = t, t = void 0), typeof n == "function" && (r = n, n = void 0), t || (t = this.languages), n || (n = this.options.ns), r || (r = $n), this.services.backendConnector.reload(t, n, (i) => {
      o.resolve(), r(i);
    }), o;
  }
  use(t) {
    if (!t) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && Bs.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
  }
  setResolvedLanguage(t) {
    if (!(!t || !this.languages) && !(["cimode", "dev"].indexOf(t) > -1))
      for (let n = 0; n < this.languages.length; n++) {
        const r = this.languages[n];
        if (!(["cimode", "dev"].indexOf(r) > -1) && this.store.hasLanguageSomeTranslations(r)) {
          this.resolvedLanguage = r;
          break;
        }
      }
  }
  changeLanguage(t, n) {
    var r = this;
    this.isLanguageChangingTo = t;
    const o = tn();
    this.emit("languageChanging", t);
    const i = (l) => {
      this.language = l, this.languages = this.services.languageUtils.toResolveHierarchy(l), this.resolvedLanguage = void 0, this.setResolvedLanguage(l);
    }, s = (l, c) => {
      c ? (i(c), this.translator.changeLanguage(c), this.isLanguageChangingTo = void 0, this.emit("languageChanged", c), this.logger.log("languageChanged", c)) : this.isLanguageChangingTo = void 0, o.resolve(function() {
        return r.t(...arguments);
      }), n && n(l, function() {
        return r.t(...arguments);
      });
    }, a = (l) => {
      var u, d;
      !t && !l && this.services.languageDetector && (l = []);
      const c = U(l) ? l : this.services.languageUtils.getBestMatchFromCodes(l);
      c && (this.language || i(c), this.translator.language || this.translator.changeLanguage(c), (d = (u = this.services.languageDetector) == null ? void 0 : u.cacheUserLanguage) == null || d.call(u, c)), this.loadResources(c, (p) => {
        s(p, c);
      });
    };
    return !t && this.services.languageDetector && !this.services.languageDetector.async ? a(this.services.languageDetector.detect()) : !t && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(a) : this.services.languageDetector.detect(a) : a(t), o;
  }
  getFixedT(t, n, r) {
    var o = this;
    const i = function(s, a) {
      let l;
      if (typeof a != "object") {
        for (var c = arguments.length, u = new Array(c > 2 ? c - 2 : 0), d = 2; d < c; d++)
          u[d - 2] = arguments[d];
        l = o.options.overloadTranslationOptionHandler([s, a].concat(u));
      } else
        l = {
          ...a
        };
      l.lng = l.lng || i.lng, l.lngs = l.lngs || i.lngs, l.ns = l.ns || i.ns, l.keyPrefix !== "" && (l.keyPrefix = l.keyPrefix || r || i.keyPrefix);
      const p = o.options.keySeparator || ".";
      let S;
      return l.keyPrefix && Array.isArray(s) ? S = s.map((m) => `${l.keyPrefix}${p}${m}`) : S = l.keyPrefix ? `${l.keyPrefix}${p}${s}` : s, o.t(S, l);
    };
    return U(t) ? i.lng = t : i.lngs = t, i.ns = n, i.keyPrefix = r, i;
  }
  t() {
    var o;
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return (o = this.translator) == null ? void 0 : o.translate(...n);
  }
  exists() {
    var o;
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return (o = this.translator) == null ? void 0 : o.exists(...n);
  }
  setDefaultNamespace(t) {
    this.options.defaultNS = t;
  }
  hasLoadedNamespace(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const r = n.lng || this.resolvedLanguage || this.languages[0], o = this.options ? this.options.fallbackLng : !1, i = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode") return !0;
    const s = (a, l) => {
      const c = this.services.backendConnector.state[`${a}|${l}`];
      return c === -1 || c === 0 || c === 2;
    };
    if (n.precheck) {
      const a = n.precheck(this, s);
      if (a !== void 0) return a;
    }
    return !!(this.hasResourceBundle(r, t) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || s(r, t) && (!o || s(i, t)));
  }
  loadNamespaces(t, n) {
    const r = tn();
    return this.options.ns ? (U(t) && (t = [t]), t.forEach((o) => {
      this.options.ns.indexOf(o) < 0 && this.options.ns.push(o);
    }), this.loadResources((o) => {
      r.resolve(), n && n(o);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(t, n) {
    const r = tn();
    U(t) && (t = [t]);
    const o = this.options.preload || [], i = t.filter((s) => o.indexOf(s) < 0 && this.services.languageUtils.isSupportedCode(s));
    return i.length ? (this.options.preload = o.concat(i), this.loadResources((s) => {
      r.resolve(), n && n(s);
    }), r) : (n && n(), Promise.resolve());
  }
  dir(t) {
    var o, i;
    if (t || (t = this.resolvedLanguage || (((o = this.languages) == null ? void 0 : o.length) > 0 ? this.languages[0] : this.language)), !t) return "rtl";
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = ((i = this.services) == null ? void 0 : i.languageUtils) || new hi(xi());
    return n.indexOf(r.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    return new pn(t, n);
  }
  cloneInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : $n;
    const r = t.forkResourceStore;
    r && delete t.forkResourceStore;
    const o = {
      ...this.options,
      ...t,
      isClone: !0
    }, i = new pn(o);
    if ((t.debug !== void 0 || t.prefix !== void 0) && (i.logger = i.logger.clone(t)), ["store", "services", "language"].forEach((a) => {
      i[a] = this[a];
    }), i.services = {
      ...this.services
    }, i.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, r) {
      const a = Object.keys(this.store.data).reduce((l, c) => (l[c] = {
        ...this.store.data[c]
      }, Object.keys(l[c]).reduce((u, d) => (u[d] = {
        ...l[c][d]
      }, u), {})), {});
      i.store = new di(a, o), i.services.resourceStore = i.store;
    }
    return i.translator = new tr(i.services, o), i.translator.on("*", function(a) {
      for (var l = arguments.length, c = new Array(l > 1 ? l - 1 : 0), u = 1; u < l; u++)
        c[u - 1] = arguments[u];
      i.emit(a, ...c);
    }), i.init(o, n), i.translator.options = o, i.translator.backendConnector.services.utils = {
      hasLoadedNamespace: i.hasLoadedNamespace.bind(i)
    }, i;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const we = pn.createInstance();
we.createInstance = pn.createInstance;
we.createInstance;
we.dir;
we.init;
we.loadResources;
we.reloadResources;
we.use;
we.changeLanguage;
we.getFixedT;
we.t;
we.exists;
we.setDefaultNamespace;
we.hasLoadedNamespace;
we.loadNamespaces;
we.loadLanguages;
const Jf = {
  "Jogging.Cartesian.Translation.velocityMmPerSec.lb": "{{amount}} mm/s",
  "Jogging.Cartesian.Rotation.velocityDegPerSec.lb": "{{amount}}°/s",
  "Jogging.Velocity.lb": "Geschwindigkeit",
  "General.degree.variable": "{{amount}}°",
  "General.mm.variable": "{{amount}}mm",
  "Jogging.Cartesian.MotionType.lb": "Bewegungstyp",
  "Jogging.Cartesian.Translation.bt": "Translation",
  "Jogging.Cartesian.Rotation.bt": "Rotation",
  "Jogging.Joints.JointValues.lb": "Gelenkwerte",
  "Jogging.Increment.Continuous.dd": "Fortlaufend",
  "Jogging.Cartesian.Orientation.lb": "Orientierung",
  "Jogging.JointLimitsReached.lb": "Gelenkgrenzen für Gelenk {{jointNumbers}} erreicht",
  "Jogging.Orientation.coordsys": "Base (Roboter)",
  "Jogging.Orientation.tool": "Tool"
}, Gf = {
  "Jogging.Cartesian.Translation.velocityMmPerSec.lb": "{{amount}} mm/s",
  "Jogging.Cartesian.Rotation.velocityDegPerSec.lb": "{{amount}}°/s",
  "Jogging.Velocity.lb": "Velocity",
  "General.degree.variable": "{{amount}}°",
  "General.mm.variable": "{{amount}}mm",
  "Jogging.Cartesian.MotionType.lb": "Motion type",
  "Jogging.Cartesian.Translation.bt": "Translation",
  "Jogging.Cartesian.Rotation.bt": "Rotation",
  "Jogging.Joints.JointValues.lb": "Joint values",
  "Jogging.Increment.Continuous.dd": "Continuous",
  "Jogging.Cartesian.Orientation.lb": "Orientation",
  "Jogging.Activating.lb": "Activating jogging",
  "Jogging.JointLimitsReached.lb": "Joint limit reached for joint {{jointNumbers}}",
  "Jogging.Orientation.coordsys": "Base",
  "Jogging.Orientation.tool": "Tool"
}, Vs = we.createInstance();
Vs.use(Sl).init({
  supportedLngs: ["en", "de"],
  resources: {
    en: {
      translations: Gf
    },
    de: {
      translations: Jf
    }
  },
  ns: ["translations"],
  defaultNS: "translations",
  detection: {
    order: ["navigator", "htmlTag"]
  }
});
function vn(e) {
  return (n) => /* @__PURE__ */ b.jsx(Wf, { children: /* @__PURE__ */ b.jsx(e, { ...n }) });
}
const Wf = ({
  children: e
}) => /* @__PURE__ */ b.jsx(xl, { i18n: Vs, children: e }), Hf = ({
  title: e,
  titleId: t,
  ...n
}, r) => /* @__PURE__ */ D.createElement("svg", { width: 21, height: 21, viewBox: "0 0 21 21", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: r, "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ D.createElement("title", { id: t }, e) : null, /* @__PURE__ */ D.createElement("g", { id: "JogMinus" }, /* @__PURE__ */ D.createElement("path", { id: "Minus", d: "M0 13V8H21V13H0Z", fill: "white" }))), Kf = pt(Hf), qf = ({
  title: e,
  titleId: t,
  ...n
}, r) => /* @__PURE__ */ D.createElement("svg", { width: 21, height: 21, viewBox: "0 0 21 21", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: r, "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ D.createElement("title", { id: t }, e) : null, /* @__PURE__ */ D.createElement("g", { id: "JogPlus" }, /* @__PURE__ */ D.createElement("g", { id: "Plus" }, /* @__PURE__ */ D.createElement("path", { d: "M0 13V8H8V13H0Z", fill: "white" }), /* @__PURE__ */ D.createElement("path", { d: "M8 0L13 2.18557e-07L13 21H8L8 0Z", fill: "white" }), /* @__PURE__ */ D.createElement("path", { d: "M13 13V8H21V13H13Z", fill: "white" })))), Yf = pt(qf);
function vo(e) {
  ct(e, []);
}
function Xf(e) {
  vo(() => ms(e));
}
function Zf(e, t, n) {
  vo(() => vl(e, t, n));
}
function wn(e) {
  return vo(() => {
    let t;
    function n() {
      e(), t = requestAnimationFrame(n);
    }
    return t = requestAnimationFrame(n), () => {
      cancelAnimationFrame(t);
    };
  });
}
const vi = vn(
  Ie(
    ({
      colors: e,
      label: t,
      getDisplayedValue: n,
      startJogging: r,
      stopJogging: o,
      disabled: i,
      activeJoggingDirection: s,
      ...a
    }) => {
      var R, C, A, P, N, V, G;
      wn(() => {
        const g = n(), k = p.current;
        k && (k.textContent = g);
      });
      const l = tt(), [c, u] = At(null);
      ct(() => {
        i && j();
      }, [i]);
      const d = s || c, p = Wt(null);
      e || (e = {
        color: "#fff",
        backgroundColor: "#000",
        borderColor: "#000",
        buttonBackgroundColor: {
          disabled: "#000",
          default: "#000",
          hovered: "#000",
          pressed: "#000"
        }
      });
      const S = d ? (R = e.buttonBackgroundColor) == null ? void 0 : R.pressed : e.borderColor, m = {
        width: "55px",
        color: e.color,
        path: { fill: e.color },
        alignContent: "center",
        fontSize: "37px",
        svg: {
          pointerEvents: "none"
        }
      }, f = {
        ...m,
        backgroundColor: (C = e.buttonBackgroundColor) == null ? void 0 : C.default,
        ":hover": {
          backgroundColor: (A = e.buttonBackgroundColor) == null ? void 0 : A.hovered
        },
        ":active": {
          backgroundColor: (P = e.buttonBackgroundColor) == null ? void 0 : P.pressed,
          color: e.backgroundColor,
          path: { fill: e.backgroundColor }
        },
        ":disabled": {
          backgroundColor: (N = e.buttonBackgroundColor) == null ? void 0 : N.disabled,
          "svg path": { fill: l.palette.action.disabled }
        }
      }, x = {
        ...m,
        backgroundColor: (V = e.buttonBackgroundColor) == null ? void 0 : V.pressed,
        color: e.backgroundColor,
        path: { fill: e.backgroundColor },
        ":disabled": {
          backgroundColor: (G = e.buttonBackgroundColor) == null ? void 0 : G.pressed,
          "svg path": { fill: l.palette.action.disabled }
        }
      };
      function E(g, k) {
        i || g.button === 0 && (u(k), r(k));
      }
      function j() {
        u(null), o();
      }
      return /* @__PURE__ */ b.jsxs(Gt, { height: "64px", direction: "row", justifyContent: "center", ...a, children: [
        /* @__PURE__ */ b.jsx(
          Wn,
          {
            disabled: i,
            disableRipple: !0,
            onPointerDown: (g) => E(g, "-"),
            onPointerUp: j,
            onPointerOut: j,
            size: "large",
            sx: {
              ...d === "-" ? x : f,
              borderRadius: "16px 0px 0px 16px",
              borderLeft: `2px solid ${S ?? "#fff"}`,
              borderBottom: `2px solid ${S ?? "#fff"}`,
              borderTop: `2px solid ${S ?? "#fff"}`
            },
            children: /* @__PURE__ */ b.jsx(Kf, {})
          }
        ),
        /* @__PURE__ */ b.jsxs(
          Gt,
          {
            spacing: "6px",
            sx: {
              width: "150px",
              backgroundColor: e.backgroundColor,
              alignItems: "center",
              justifyContent: "center",
              opacity: "0.9",
              borderBottom: `2px solid ${S ?? "#fff"}`,
              borderTop: `2px solid ${S ?? "#fff"}`
            },
            children: [
              /* @__PURE__ */ b.jsx(
                Gt,
                {
                  height: "22px",
                  direction: "row",
                  alignItems: "center",
                  justifyItems: "center",
                  spacing: 1,
                  sx: {
                    userSelect: "none",
                    color: e.color,
                    ".MuiTypography-root": {
                      fontWeight: 700,
                      ...i ? { color: l.palette.action.disabled } : {}
                    },
                    ...i ? { "svg path": { fill: l.palette.action.disabled } } : {}
                  },
                  children: t
                }
              ),
              /* @__PURE__ */ b.jsx(
                et,
                {
                  height: "22px",
                  sx: {
                    fontSize: "15px",
                    color: i ? l.palette.action.disabled : e.color,
                    fontWeight: 700
                  },
                  ref: p,
                  children: n()
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ b.jsx(
          Wn,
          {
            disableRipple: !0,
            disabled: i,
            onPointerDown: (g) => E(g, "+"),
            onPointerUp: j,
            onPointerOut: j,
            size: "large",
            sx: {
              ...d === "+" ? x : f,
              borderRadius: "0px 16px 16px 0px",
              borderRight: `2px solid ${S ?? "#fff"}`,
              borderBottom: `2px solid ${S ?? "#fff"}`,
              borderTop: `2px solid ${S ?? "#fff"}`
            },
            children: /* @__PURE__ */ b.jsx(Yf, {})
          }
        )
      ] });
    }
  )
), kt = Pu;
function Qf(e) {
  return Sn("MuiSvgIcon", e);
}
Ts("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const ed = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Te(t)}`, `fontSize${Te(n)}`]
  };
  return yo(o, Qf, r);
}, td = nt("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Te(n.color)}`], t[`fontSize${Te(n.fontSize)}`]];
  }
})(kt(({
  theme: e
}) => {
  var t, n, r, o, i, s, a, l, c, u, d, p, S, m;
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
          fontSize: ((u = (c = e.typography) == null ? void 0 : c.pxToRem) == null ? void 0 : u.call(c, 35)) || "2.1875rem"
        }
      },
      // TODO v5 deprecate color prop, v6 remove for sx
      ...Object.entries((e.vars ?? e).palette).filter(([, f]) => f && f.main).map(([f]) => {
        var x, E;
        return {
          props: {
            color: f
          },
          style: {
            color: (E = (x = (e.vars ?? e).palette) == null ? void 0 : x[f]) == null ? void 0 : E.main
          }
        };
      }),
      {
        props: {
          color: "action"
        },
        style: {
          color: (p = (d = (e.vars ?? e).palette) == null ? void 0 : d.action) == null ? void 0 : p.active
        }
      },
      {
        props: {
          color: "disabled"
        },
        style: {
          color: (m = (S = (e.vars ?? e).palette) == null ? void 0 : S.action) == null ? void 0 : m.disabled
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
})), nr = /* @__PURE__ */ D.forwardRef(function(t, n) {
  const r = So({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: a = "svg",
    fontSize: l = "medium",
    htmlColor: c,
    inheritViewBox: u = !1,
    titleAccess: d,
    viewBox: p = "0 0 24 24",
    ...S
  } = r, m = /* @__PURE__ */ D.isValidElement(o) && o.type === "svg", f = {
    ...r,
    color: s,
    component: a,
    fontSize: l,
    instanceFontSize: t.fontSize,
    inheritViewBox: u,
    viewBox: p,
    hasSvgAsChild: m
  }, x = {};
  u || (x.viewBox = p);
  const E = ed(f);
  return /* @__PURE__ */ b.jsxs(td, {
    as: a,
    className: He(E.root, i),
    focusable: "false",
    color: c,
    "aria-hidden": d ? void 0 : !0,
    role: d ? "img" : void 0,
    ref: n,
    ...x,
    ...S,
    ...m && o.props,
    ownerState: f,
    children: [m ? o.props.children : o, d ? /* @__PURE__ */ b.jsx("title", {
      children: d
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
  children: h.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: h.object,
  /**
   * @ignore
   */
  className: h.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: h.oneOfType([h.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), h.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: h.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: h.oneOfType([h.oneOf(["inherit", "large", "medium", "small"]), h.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: h.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: h.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: h.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: h.oneOfType([h.arrayOf(h.oneOfType([h.func, h.object, h.bool])), h.func, h.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: h.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: h.string
});
nr.muiName = "SvgIcon";
function Us(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ b.jsx(nr, {
      "data-testid": `${t}Icon`,
      ref: o,
      ...r,
      children: e
    });
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = nr.muiName, /* @__PURE__ */ D.memo(/* @__PURE__ */ D.forwardRef(n));
}
const nd = Us(/* @__PURE__ */ b.jsx("path", {
  d: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
}), "ChevronLeft"), rd = Us(/* @__PURE__ */ b.jsx("path", {
  d: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
}), "ChevronRight");
function Tt(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var zs = typeof global == "object" && global && global.Object === Object && global, od = typeof self == "object" && self && self.Object === Object && self, qe = zs || od || Function("return this")(), Ur = function() {
  return qe.Date.now();
}, id = /\s/;
function sd(e) {
  for (var t = e.length; t-- && id.test(e.charAt(t)); )
    ;
  return t;
}
var ad = /^\s+/;
function ld(e) {
  return e && e.slice(0, sd(e) + 1).replace(ad, "");
}
var dt = qe.Symbol, Js = Object.prototype, cd = Js.hasOwnProperty, ud = Js.toString, nn = dt ? dt.toStringTag : void 0;
function fd(e) {
  var t = cd.call(e, nn), n = e[nn];
  try {
    e[nn] = void 0;
    var r = !0;
  } catch {
  }
  var o = ud.call(e);
  return r && (t ? e[nn] = n : delete e[nn]), o;
}
var dd = Object.prototype, pd = dd.toString;
function gd(e) {
  return pd.call(e);
}
var hd = "[object Null]", md = "[object Undefined]", wi = dt ? dt.toStringTag : void 0;
function $t(e) {
  return e == null ? e === void 0 ? md : hd : wi && wi in Object(e) ? fd(e) : gd(e);
}
function Et(e) {
  return e != null && typeof e == "object";
}
var yd = "[object Symbol]";
function Sr(e) {
  return typeof e == "symbol" || Et(e) && $t(e) == yd;
}
var Ci = NaN, bd = /^[-+]0x[0-9a-f]+$/i, xd = /^0b[01]+$/i, Sd = /^0o[0-7]+$/i, vd = parseInt;
function Ti(e) {
  if (typeof e == "number")
    return e;
  if (Sr(e))
    return Ci;
  if (Tt(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Tt(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = ld(e);
  var n = xd.test(e);
  return n || Sd.test(e) ? vd(e.slice(2), n ? 2 : 8) : bd.test(e) ? Ci : +e;
}
var wd = "Expected a function", Cd = Math.max, Td = Math.min;
function Ed(e, t, n) {
  var r, o, i, s, a, l, c = 0, u = !1, d = !1, p = !0;
  if (typeof e != "function")
    throw new TypeError(wd);
  t = Ti(t) || 0, Tt(n) && (u = !!n.leading, d = "maxWait" in n, i = d ? Cd(Ti(n.maxWait) || 0, t) : i, p = "trailing" in n ? !!n.trailing : p);
  function S(P) {
    var N = r, V = o;
    return r = o = void 0, c = P, s = e.apply(V, N), s;
  }
  function m(P) {
    return c = P, a = setTimeout(E, t), u ? S(P) : s;
  }
  function f(P) {
    var N = P - l, V = P - c, G = t - N;
    return d ? Td(G, i - V) : G;
  }
  function x(P) {
    var N = P - l, V = P - c;
    return l === void 0 || N >= t || N < 0 || d && V >= i;
  }
  function E() {
    var P = Ur();
    if (x(P))
      return j(P);
    a = setTimeout(E, f(P));
  }
  function j(P) {
    return a = void 0, p && r ? S(P) : (r = o = void 0, s);
  }
  function R() {
    a !== void 0 && clearTimeout(a), c = 0, r = l = o = a = void 0;
  }
  function C() {
    return a === void 0 ? s : j(Ur());
  }
  function A() {
    var P = Ur(), N = x(P);
    if (r = arguments, o = this, l = P, N) {
      if (a === void 0)
        return m(l);
      if (d)
        return clearTimeout(a), a = setTimeout(E, t), S(l);
    }
    return a === void 0 && (a = setTimeout(E, t)), s;
  }
  return A.cancel = R, A.flush = C, A;
}
var Od = "Expected a function";
function Rd(e, t, n) {
  var r = !0, o = !0;
  if (typeof e != "function")
    throw new TypeError(Od);
  return Tt(n) && (r = "leading" in n ? !!n.leading : r, o = "trailing" in n ? !!n.trailing : o), Ed(e, t, {
    leading: r,
    maxWait: t,
    trailing: o
  });
}
const Ad = vn(
  Ie(
    ({
      startJogging: e,
      stopJogging: t,
      lowerLimitDegs: n,
      upperLimitDegs: r,
      getValueDegs: o,
      disabled: i,
      ...s
    }) => {
      var R, C, A, P, N, V, G;
      const { t: a } = yn(), [l, c] = At(), u = tt(), d = {
        background: (R = u.palette.backgroundPaperElevation) == null ? void 0 : R[4],
        color: (C = u.palette.backgroundPaperElevation) == null ? void 0 : C[11]
      }, p = go(() => ({
        activeJoggingDir: null,
        startJogging(g) {
          this.activeJoggingDir = g, e(g);
        },
        stopJogging() {
          this.activeJoggingDir = null, t();
        }
      })), S = Rd(() => {
        c(o());
      }, 50);
      wn(S);
      function m(g) {
        g.button === 0 && p.startJogging("-");
      }
      function f(g) {
        g.button === 0 && p.startJogging("+");
      }
      function x(g) {
        p.stopJogging();
      }
      function E(g) {
        p.stopJogging();
      }
      function j(g, k = 1) {
        if (g === void 0 || isNaN(g)) return "";
        const _ = a("General.degree.variable", {
          amount: g.toFixed(k)
        });
        return g > 0 && k === 0 ? `+${_}` : _;
      }
      return /* @__PURE__ */ b.jsxs(
        Gt,
        {
          height: "64px",
          width: "100%",
          maxWidth: "260px",
          direction: "row",
          ...s,
          sx: {
            "& .MuiIconButton-root": {
              width: "52px",
              color: u.palette.text.primary,
              alignContent: "center",
              backgroundColor: (A = u.palette.backgroundPaperElevation) == null ? void 0 : A[11],
              "& svg": {
                width: "42px",
                height: "42px"
              },
              "&.Mui-disabled": {
                backgroundColor: (P = u.palette.backgroundPaperElevation) == null ? void 0 : P[11],
                color: u.palette.action.disabled,
                opacity: 1
              },
              "&:hover": {
                backgroundColor: (N = u.palette.backgroundPaperElevation) == null ? void 0 : N[9]
              },
              "&:active": {
                ...d
              }
            }
          },
          children: [
            /* @__PURE__ */ b.jsx(
              Wn,
              {
                onPointerDown: m,
                onPointerUp: x,
                onPointerOut: E,
                disabled: i,
                disableRipple: !0,
                sx: {
                  borderRadius: "16px 0px 0px 16px",
                  ...p.activeJoggingDir === "-" ? d : {}
                },
                children: /* @__PURE__ */ b.jsx(
                  nd,
                  {
                    sx: {
                      pointerEvents: "none"
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ b.jsxs(
              Gt,
              {
                flexGrow: 1,
                alignItems: "center",
                justifyContent: "center",
                sx: {
                  borderStyle: "solid",
                  borderLeftWidth: 0,
                  borderRightWidth: 0,
                  border: "none",
                  backgroundColor: (V = u.palette.backgroundPaperElevation) == null ? void 0 : V[11],
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  zIndex: 1
                },
                children: [
                  /* @__PURE__ */ b.jsx(
                    et,
                    {
                      sx: {
                        fontSize: "15px",
                        fontWeight: 700,
                        position: "relative",
                        top: "5px",
                        color: i ? u.palette.action.disabled : u.palette.text.primary
                      },
                      children: j(l)
                    }
                  ),
                  /* @__PURE__ */ b.jsx(
                    tl,
                    {
                      disabled: !0,
                      "aria-label": "Joint position",
                      min: n,
                      max: r,
                      value: l || 0,
                      track: !1,
                      sx: {
                        "& .MuiSlider-mark": {
                          display: "none"
                        },
                        "& .MuiSlider-thumb": {
                          width: "5px",
                          height: "12px",
                          borderRadius: "2px",
                          color: i ? u.palette.action.disabled : u.palette.text.primary
                        },
                        "& .MuiSlider-markLabel": {
                          top: "20px",
                          fontSize: "12px",
                          color: i ? u.palette.action.disabled : u.palette.text.secondary
                        },
                        "& .MuiSlider-rail": {
                          backgroundColor: (G = u.palette.backgroundPaperElevation) == null ? void 0 : G[5],
                          opacity: 1
                        }
                      },
                      marks: n !== void 0 && r !== void 0 && [
                        {
                          value: n,
                          label: j(n, 0)
                        },
                        {
                          value: r,
                          label: j(r, 0)
                        }
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ b.jsx(
              Wn,
              {
                onPointerDown: f,
                onPointerUp: x,
                onPointerOut: E,
                disabled: i,
                disableRipple: !0,
                sx: {
                  borderRadius: "0px 16px 16px 0px",
                  ...p.activeJoggingDir === "+" ? d : {}
                },
                children: /* @__PURE__ */ b.jsx(
                  rd,
                  {
                    sx: {
                      pointerEvents: "none"
                    }
                  }
                )
              }
            )
          ]
        }
      );
    }
  )
);
function Gs(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: kd } = Object.prototype, { getPrototypeOf: wo } = Object, vr = /* @__PURE__ */ ((e) => (t) => {
  const n = kd.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Me = (e) => (e = e.toLowerCase(), (t) => vr(t) === e), wr = (e) => (t) => typeof t === e, { isArray: Kt } = Array, gn = wr("undefined");
function $d(e) {
  return e !== null && !gn(e) && e.constructor !== null && !gn(e.constructor) && ke(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ws = Me("ArrayBuffer");
function Pd(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Ws(e.buffer), t;
}
const jd = wr("string"), ke = wr("function"), Hs = wr("number"), Cr = (e) => e !== null && typeof e == "object", Nd = (e) => e === !0 || e === !1, Un = (e) => {
  if (vr(e) !== "object")
    return !1;
  const t = wo(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, _d = Me("Date"), Ld = Me("File"), Id = Me("Blob"), Md = Me("FileList"), Dd = (e) => Cr(e) && ke(e.pipe), Fd = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || ke(e.append) && ((t = vr(e)) === "formdata" || // detect form-data instance
  t === "object" && ke(e.toString) && e.toString() === "[object FormData]"));
}, Bd = Me("URLSearchParams"), [Vd, Ud, zd, Jd] = ["ReadableStream", "Request", "Response", "Headers"].map(Me), Gd = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Cn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let r, o;
  if (typeof e != "object" && (e = [e]), Kt(e))
    for (r = 0, o = e.length; r < o; r++)
      t.call(null, e[r], r, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), s = i.length;
    let a;
    for (r = 0; r < s; r++)
      a = i[r], t.call(null, e[a], a, e);
  }
}
function Ks(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length, o;
  for (; r-- > 0; )
    if (o = n[r], t === o.toLowerCase())
      return o;
  return null;
}
const vt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, qs = (e) => !gn(e) && e !== vt;
function eo() {
  const { caseless: e } = qs(this) && this || {}, t = {}, n = (r, o) => {
    const i = e && Ks(t, o) || o;
    Un(t[i]) && Un(r) ? t[i] = eo(t[i], r) : Un(r) ? t[i] = eo({}, r) : Kt(r) ? t[i] = r.slice() : t[i] = r;
  };
  for (let r = 0, o = arguments.length; r < o; r++)
    arguments[r] && Cn(arguments[r], n);
  return t;
}
const Wd = (e, t, n, { allOwnKeys: r } = {}) => (Cn(t, (o, i) => {
  n && ke(o) ? e[i] = Gs(o, n) : e[i] = o;
}, { allOwnKeys: r }), e), Hd = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Kd = (e, t, n, r) => {
  e.prototype = Object.create(t.prototype, r), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, qd = (e, t, n, r) => {
  let o, i, s;
  const a = {};
  if (t = t || {}, e == null) return t;
  do {
    for (o = Object.getOwnPropertyNames(e), i = o.length; i-- > 0; )
      s = o[i], (!r || r(s, e, t)) && !a[s] && (t[s] = e[s], a[s] = !0);
    e = n !== !1 && wo(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Yd = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const r = e.indexOf(t, n);
  return r !== -1 && r === n;
}, Xd = (e) => {
  if (!e) return null;
  if (Kt(e)) return e;
  let t = e.length;
  if (!Hs(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Zd = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && wo(Uint8Array)), Qd = (e, t) => {
  const r = (e && e[Symbol.iterator]).call(e);
  let o;
  for (; (o = r.next()) && !o.done; ) {
    const i = o.value;
    t.call(e, i[0], i[1]);
  }
}, ep = (e, t) => {
  let n;
  const r = [];
  for (; (n = e.exec(t)) !== null; )
    r.push(n);
  return r;
}, tp = Me("HTMLFormElement"), np = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, r, o) {
    return r.toUpperCase() + o;
  }
), Ei = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), rp = Me("RegExp"), Ys = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), r = {};
  Cn(n, (o, i) => {
    let s;
    (s = t(o, i, e)) !== !1 && (r[i] = s || o);
  }), Object.defineProperties(e, r);
}, op = (e) => {
  Ys(e, (t, n) => {
    if (ke(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const r = e[n];
    if (ke(r)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ip = (e, t) => {
  const n = {}, r = (o) => {
    o.forEach((i) => {
      n[i] = !0;
    });
  };
  return Kt(e) ? r(e) : r(String(e).split(t)), n;
}, sp = () => {
}, ap = (e, t) => e != null && Number.isFinite(e = +e) ? e : t;
function lp(e) {
  return !!(e && ke(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const cp = (e) => {
  const t = new Array(10), n = (r, o) => {
    if (Cr(r)) {
      if (t.indexOf(r) >= 0)
        return;
      if (!("toJSON" in r)) {
        t[o] = r;
        const i = Kt(r) ? [] : {};
        return Cn(r, (s, a) => {
          const l = n(s, o + 1);
          !gn(l) && (i[a] = l);
        }), t[o] = void 0, i;
      }
    }
    return r;
  };
  return n(e, 0);
}, up = Me("AsyncFunction"), fp = (e) => e && (Cr(e) || ke(e)) && ke(e.then) && ke(e.catch), Xs = ((e, t) => e ? setImmediate : t ? ((n, r) => (vt.addEventListener("message", ({ source: o, data: i }) => {
  o === vt && i === n && r.length && r.shift()();
}, !1), (o) => {
  r.push(o), vt.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  ke(vt.postMessage)
), dp = typeof queueMicrotask < "u" ? queueMicrotask.bind(vt) : typeof process < "u" && process.nextTick || Xs, v = {
  isArray: Kt,
  isArrayBuffer: Ws,
  isBuffer: $d,
  isFormData: Fd,
  isArrayBufferView: Pd,
  isString: jd,
  isNumber: Hs,
  isBoolean: Nd,
  isObject: Cr,
  isPlainObject: Un,
  isReadableStream: Vd,
  isRequest: Ud,
  isResponse: zd,
  isHeaders: Jd,
  isUndefined: gn,
  isDate: _d,
  isFile: Ld,
  isBlob: Id,
  isRegExp: rp,
  isFunction: ke,
  isStream: Dd,
  isURLSearchParams: Bd,
  isTypedArray: Zd,
  isFileList: Md,
  forEach: Cn,
  merge: eo,
  extend: Wd,
  trim: Gd,
  stripBOM: Hd,
  inherits: Kd,
  toFlatObject: qd,
  kindOf: vr,
  kindOfTest: Me,
  endsWith: Yd,
  toArray: Xd,
  forEachEntry: Qd,
  matchAll: ep,
  isHTMLForm: tp,
  hasOwnProperty: Ei,
  hasOwnProp: Ei,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ys,
  freezeMethods: op,
  toObjectSet: ip,
  toCamelCase: np,
  noop: sp,
  toFiniteNumber: ap,
  findKey: Ks,
  global: vt,
  isContextDefined: qs,
  isSpecCompliantForm: lp,
  toJSONObject: cp,
  isAsyncFn: up,
  isThenable: fp,
  setImmediate: Xs,
  asap: dp
};
function J(e, t, n, r, o) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), r && (this.request = r), o && (this.response = o, this.status = o.status ? o.status : null);
}
v.inherits(J, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: v.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Zs = J.prototype, Qs = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Qs[e] = { value: e };
});
Object.defineProperties(J, Qs);
Object.defineProperty(Zs, "isAxiosError", { value: !0 });
J.from = (e, t, n, r, o, i) => {
  const s = Object.create(Zs);
  return v.toFlatObject(e, s, function(l) {
    return l !== Error.prototype;
  }, (a) => a !== "isAxiosError"), J.call(s, e.message, t, n, r, o), s.cause = e, s.name = e.name, i && Object.assign(s, i), s;
};
const pp = null;
function to(e) {
  return v.isPlainObject(e) || v.isArray(e);
}
function ea(e) {
  return v.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Oi(e, t, n) {
  return e ? e.concat(t).map(function(o, i) {
    return o = ea(o), !n && i ? "[" + o + "]" : o;
  }).join(n ? "." : "") : t;
}
function gp(e) {
  return v.isArray(e) && !e.some(to);
}
const hp = v.toFlatObject(v, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function Tr(e, t, n) {
  if (!v.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new FormData(), n = v.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(f, x) {
    return !v.isUndefined(x[f]);
  });
  const r = n.metaTokens, o = n.visitor || u, i = n.dots, s = n.indexes, l = (n.Blob || typeof Blob < "u" && Blob) && v.isSpecCompliantForm(t);
  if (!v.isFunction(o))
    throw new TypeError("visitor must be a function");
  function c(m) {
    if (m === null) return "";
    if (v.isDate(m))
      return m.toISOString();
    if (!l && v.isBlob(m))
      throw new J("Blob is not supported. Use a Buffer instead.");
    return v.isArrayBuffer(m) || v.isTypedArray(m) ? l && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function u(m, f, x) {
    let E = m;
    if (m && !x && typeof m == "object") {
      if (v.endsWith(f, "{}"))
        f = r ? f : f.slice(0, -2), m = JSON.stringify(m);
      else if (v.isArray(m) && gp(m) || (v.isFileList(m) || v.endsWith(f, "[]")) && (E = v.toArray(m)))
        return f = ea(f), E.forEach(function(R, C) {
          !(v.isUndefined(R) || R === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? Oi([f], C, i) : s === null ? f : f + "[]",
            c(R)
          );
        }), !1;
    }
    return to(m) ? !0 : (t.append(Oi(x, f, i), c(m)), !1);
  }
  const d = [], p = Object.assign(hp, {
    defaultVisitor: u,
    convertValue: c,
    isVisitable: to
  });
  function S(m, f) {
    if (!v.isUndefined(m)) {
      if (d.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + f.join("."));
      d.push(m), v.forEach(m, function(E, j) {
        (!(v.isUndefined(E) || E === null) && o.call(
          t,
          E,
          v.isString(j) ? j.trim() : j,
          f,
          p
        )) === !0 && S(E, f ? f.concat(j) : [j]);
      }), d.pop();
    }
  }
  if (!v.isObject(e))
    throw new TypeError("data must be an object");
  return S(e), t;
}
function Ri(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(r) {
    return t[r];
  });
}
function Co(e, t) {
  this._pairs = [], e && Tr(e, this, t);
}
const ta = Co.prototype;
ta.append = function(t, n) {
  this._pairs.push([t, n]);
};
ta.toString = function(t) {
  const n = t ? function(r) {
    return t.call(this, r, Ri);
  } : Ri;
  return this._pairs.map(function(o) {
    return n(o[0]) + "=" + n(o[1]);
  }, "").join("&");
};
function mp(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function na(e, t, n) {
  if (!t)
    return e;
  const r = n && n.encode || mp;
  v.isFunction(n) && (n = {
    serialize: n
  });
  const o = n && n.serialize;
  let i;
  if (o ? i = o(t, n) : i = v.isURLSearchParams(t) ? t.toString() : new Co(t, n).toString(r), i) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Ai {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, r) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: r ? r.synchronous : !1,
      runWhen: r ? r.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    v.forEach(this.handlers, function(r) {
      r !== null && t(r);
    });
  }
}
const ra = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, yp = typeof URLSearchParams < "u" ? URLSearchParams : Co, bp = typeof FormData < "u" ? FormData : null, xp = typeof Blob < "u" ? Blob : null, Sp = {
  isBrowser: !0,
  classes: {
    URLSearchParams: yp,
    FormData: bp,
    Blob: xp
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, To = typeof window < "u" && typeof document < "u", no = typeof navigator == "object" && navigator || void 0, vp = To && (!no || ["ReactNative", "NativeScript", "NS"].indexOf(no.product) < 0), wp = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Cp = To && window.location.href || "http://localhost", Tp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: To,
  hasStandardBrowserEnv: vp,
  hasStandardBrowserWebWorkerEnv: wp,
  navigator: no,
  origin: Cp
}, Symbol.toStringTag, { value: "Module" })), ve = {
  ...Tp,
  ...Sp
};
function Ep(e, t) {
  return Tr(e, new ve.classes.URLSearchParams(), Object.assign({
    visitor: function(n, r, o, i) {
      return ve.isNode && v.isBuffer(n) ? (this.append(r, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function Op(e) {
  return v.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function Rp(e) {
  const t = {}, n = Object.keys(e);
  let r;
  const o = n.length;
  let i;
  for (r = 0; r < o; r++)
    i = n[r], t[i] = e[i];
  return t;
}
function oa(e) {
  function t(n, r, o, i) {
    let s = n[i++];
    if (s === "__proto__") return !0;
    const a = Number.isFinite(+s), l = i >= n.length;
    return s = !s && v.isArray(o) ? o.length : s, l ? (v.hasOwnProp(o, s) ? o[s] = [o[s], r] : o[s] = r, !a) : ((!o[s] || !v.isObject(o[s])) && (o[s] = []), t(n, r, o[s], i) && v.isArray(o[s]) && (o[s] = Rp(o[s])), !a);
  }
  if (v.isFormData(e) && v.isFunction(e.entries)) {
    const n = {};
    return v.forEachEntry(e, (r, o) => {
      t(Op(r), o, n, 0);
    }), n;
  }
  return null;
}
function Ap(e, t, n) {
  if (v.isString(e))
    try {
      return (t || JSON.parse)(e), v.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError")
        throw r;
    }
  return (n || JSON.stringify)(e);
}
const Tn = {
  transitional: ra,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const r = n.getContentType() || "", o = r.indexOf("application/json") > -1, i = v.isObject(t);
    if (i && v.isHTMLForm(t) && (t = new FormData(t)), v.isFormData(t))
      return o ? JSON.stringify(oa(t)) : t;
    if (v.isArrayBuffer(t) || v.isBuffer(t) || v.isStream(t) || v.isFile(t) || v.isBlob(t) || v.isReadableStream(t))
      return t;
    if (v.isArrayBufferView(t))
      return t.buffer;
    if (v.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let a;
    if (i) {
      if (r.indexOf("application/x-www-form-urlencoded") > -1)
        return Ep(t, this.formSerializer).toString();
      if ((a = v.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return Tr(
          a ? { "files[]": t } : t,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return i || o ? (n.setContentType("application/json", !1), Ap(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Tn.transitional, r = n && n.forcedJSONParsing, o = this.responseType === "json";
    if (v.isResponse(t) || v.isReadableStream(t))
      return t;
    if (t && v.isString(t) && (r && !this.responseType || o)) {
      const s = !(n && n.silentJSONParsing) && o;
      try {
        return JSON.parse(t);
      } catch (a) {
        if (s)
          throw a.name === "SyntaxError" ? J.from(a, J.ERR_BAD_RESPONSE, this, null, this.response) : a;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ve.classes.FormData,
    Blob: ve.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
v.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Tn.headers[e] = {};
});
const kp = v.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), $p = (e) => {
  const t = {};
  let n, r, o;
  return e && e.split(`
`).forEach(function(s) {
    o = s.indexOf(":"), n = s.substring(0, o).trim().toLowerCase(), r = s.substring(o + 1).trim(), !(!n || t[n] && kp[n]) && (n === "set-cookie" ? t[n] ? t[n].push(r) : t[n] = [r] : t[n] = t[n] ? t[n] + ", " + r : r);
  }), t;
}, ki = Symbol("internals");
function rn(e) {
  return e && String(e).trim().toLowerCase();
}
function zn(e) {
  return e === !1 || e == null ? e : v.isArray(e) ? e.map(zn) : String(e);
}
function Pp(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; r = n.exec(e); )
    t[r[1]] = r[2];
  return t;
}
const jp = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function zr(e, t, n, r, o) {
  if (v.isFunction(r))
    return r.call(this, t, n);
  if (o && (t = n), !!v.isString(t)) {
    if (v.isString(r))
      return t.indexOf(r) !== -1;
    if (v.isRegExp(r))
      return r.test(t);
  }
}
function Np(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function _p(e, t) {
  const n = v.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function(o, i, s) {
        return this[r].call(this, t, o, i, s);
      },
      configurable: !0
    });
  });
}
let Re = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const o = this;
    function i(a, l, c) {
      const u = rn(l);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const d = v.findKey(o, u);
      (!d || o[d] === void 0 || c === !0 || c === void 0 && o[d] !== !1) && (o[d || l] = zn(a));
    }
    const s = (a, l) => v.forEach(a, (c, u) => i(c, u, l));
    if (v.isPlainObject(t) || t instanceof this.constructor)
      s(t, n);
    else if (v.isString(t) && (t = t.trim()) && !jp(t))
      s($p(t), n);
    else if (v.isHeaders(t))
      for (const [a, l] of t.entries())
        i(l, a, r);
    else
      t != null && i(n, t, r);
    return this;
  }
  get(t, n) {
    if (t = rn(t), t) {
      const r = v.findKey(this, t);
      if (r) {
        const o = this[r];
        if (!n)
          return o;
        if (n === !0)
          return Pp(o);
        if (v.isFunction(n))
          return n.call(this, o, r);
        if (v.isRegExp(n))
          return n.exec(o);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = rn(t), t) {
      const r = v.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || zr(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let o = !1;
    function i(s) {
      if (s = rn(s), s) {
        const a = v.findKey(r, s);
        a && (!n || zr(r, r[a], a, n)) && (delete r[a], o = !0);
      }
    }
    return v.isArray(t) ? t.forEach(i) : i(t), o;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length, o = !1;
    for (; r--; ) {
      const i = n[r];
      (!t || zr(this, this[i], i, t, !0)) && (delete this[i], o = !0);
    }
    return o;
  }
  normalize(t) {
    const n = this, r = {};
    return v.forEach(this, (o, i) => {
      const s = v.findKey(r, i);
      if (s) {
        n[s] = zn(o), delete n[i];
        return;
      }
      const a = t ? Np(i) : String(i).trim();
      a !== i && delete n[i], n[a] = zn(o), r[a] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return v.forEach(this, (r, o) => {
      r != null && r !== !1 && (n[o] = t && v.isArray(r) ? r.join(", ") : r);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((o) => r.set(o)), r;
  }
  static accessor(t) {
    const r = (this[ki] = this[ki] = {
      accessors: {}
    }).accessors, o = this.prototype;
    function i(s) {
      const a = rn(s);
      r[a] || (_p(o, s), r[a] = !0);
    }
    return v.isArray(t) ? t.forEach(i) : i(t), this;
  }
};
Re.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
v.reduceDescriptors(Re.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    }
  };
});
v.freezeMethods(Re);
function Jr(e, t) {
  const n = this || Tn, r = t || n, o = Re.from(r.headers);
  let i = r.data;
  return v.forEach(e, function(a) {
    i = a.call(n, i, o.normalize(), t ? t.status : void 0);
  }), o.normalize(), i;
}
function ia(e) {
  return !!(e && e.__CANCEL__);
}
function qt(e, t, n) {
  J.call(this, e ?? "canceled", J.ERR_CANCELED, t, n), this.name = "CanceledError";
}
v.inherits(qt, J, {
  __CANCEL__: !0
});
function sa(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status) ? e(n) : t(new J(
    "Request failed with status code " + n.status,
    [J.ERR_BAD_REQUEST, J.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Lp(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
function Ip(e, t) {
  e = e || 10;
  const n = new Array(e), r = new Array(e);
  let o = 0, i = 0, s;
  return t = t !== void 0 ? t : 1e3, function(l) {
    const c = Date.now(), u = r[i];
    s || (s = c), n[o] = l, r[o] = c;
    let d = i, p = 0;
    for (; d !== o; )
      p += n[d++], d = d % e;
    if (o = (o + 1) % e, o === i && (i = (i + 1) % e), c - s < t)
      return;
    const S = u && c - u;
    return S ? Math.round(p * 1e3 / S) : void 0;
  };
}
function Mp(e, t) {
  let n = 0, r = 1e3 / t, o, i;
  const s = (c, u = Date.now()) => {
    n = u, o = null, i && (clearTimeout(i), i = null), e.apply(null, c);
  };
  return [(...c) => {
    const u = Date.now(), d = u - n;
    d >= r ? s(c, u) : (o = c, i || (i = setTimeout(() => {
      i = null, s(o);
    }, r - d)));
  }, () => o && s(o)];
}
const rr = (e, t, n = 3) => {
  let r = 0;
  const o = Ip(50, 250);
  return Mp((i) => {
    const s = i.loaded, a = i.lengthComputable ? i.total : void 0, l = s - r, c = o(l), u = s <= a;
    r = s;
    const d = {
      loaded: s,
      total: a,
      progress: a ? s / a : void 0,
      bytes: l,
      rate: c || void 0,
      estimated: c && a && u ? (a - s) / c : void 0,
      event: i,
      lengthComputable: a != null,
      [t ? "download" : "upload"]: !0
    };
    e(d);
  }, n);
}, $i = (e, t) => {
  const n = e != null;
  return [(r) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: r
  }), t[1]];
}, Pi = (e) => (...t) => v.asap(() => e(...t)), Dp = ve.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, t) => (n) => (n = new URL(n, ve.origin), e.protocol === n.protocol && e.host === n.host && (t || e.port === n.port)))(
  new URL(ve.origin),
  ve.navigator && /(msie|trident)/i.test(ve.navigator.userAgent)
) : () => !0, Fp = ve.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, r, o, i) {
      const s = [e + "=" + encodeURIComponent(t)];
      v.isNumber(n) && s.push("expires=" + new Date(n).toGMTString()), v.isString(r) && s.push("path=" + r), v.isString(o) && s.push("domain=" + o), i === !0 && s.push("secure"), document.cookie = s.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function Bp(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Vp(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function aa(e, t, n) {
  let r = !Bp(t);
  return e && r || n == !1 ? Vp(e, t) : t;
}
const ji = (e) => e instanceof Re ? { ...e } : e;
function Ot(e, t) {
  t = t || {};
  const n = {};
  function r(c, u, d, p) {
    return v.isPlainObject(c) && v.isPlainObject(u) ? v.merge.call({ caseless: p }, c, u) : v.isPlainObject(u) ? v.merge({}, u) : v.isArray(u) ? u.slice() : u;
  }
  function o(c, u, d, p) {
    if (v.isUndefined(u)) {
      if (!v.isUndefined(c))
        return r(void 0, c, d, p);
    } else return r(c, u, d, p);
  }
  function i(c, u) {
    if (!v.isUndefined(u))
      return r(void 0, u);
  }
  function s(c, u) {
    if (v.isUndefined(u)) {
      if (!v.isUndefined(c))
        return r(void 0, c);
    } else return r(void 0, u);
  }
  function a(c, u, d) {
    if (d in t)
      return r(c, u);
    if (d in e)
      return r(void 0, c);
  }
  const l = {
    url: i,
    method: i,
    data: i,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: a,
    headers: (c, u, d) => o(ji(c), ji(u), d, !0)
  };
  return v.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
    const d = l[u] || o, p = d(e[u], t[u], u);
    v.isUndefined(p) && d !== a || (n[u] = p);
  }), n;
}
const la = (e) => {
  const t = Ot({}, e);
  let { data: n, withXSRFToken: r, xsrfHeaderName: o, xsrfCookieName: i, headers: s, auth: a } = t;
  t.headers = s = Re.from(s), t.url = na(aa(t.baseURL, t.url), e.params, e.paramsSerializer), a && s.set(
    "Authorization",
    "Basic " + btoa((a.username || "") + ":" + (a.password ? unescape(encodeURIComponent(a.password)) : ""))
  );
  let l;
  if (v.isFormData(n)) {
    if (ve.hasStandardBrowserEnv || ve.hasStandardBrowserWebWorkerEnv)
      s.setContentType(void 0);
    else if ((l = s.getContentType()) !== !1) {
      const [c, ...u] = l ? l.split(";").map((d) => d.trim()).filter(Boolean) : [];
      s.setContentType([c || "multipart/form-data", ...u].join("; "));
    }
  }
  if (ve.hasStandardBrowserEnv && (r && v.isFunction(r) && (r = r(t)), r || r !== !1 && Dp(t.url))) {
    const c = o && i && Fp.read(i);
    c && s.set(o, c);
  }
  return t;
}, Up = typeof XMLHttpRequest < "u", zp = Up && function(e) {
  return new Promise(function(n, r) {
    const o = la(e);
    let i = o.data;
    const s = Re.from(o.headers).normalize();
    let { responseType: a, onUploadProgress: l, onDownloadProgress: c } = o, u, d, p, S, m;
    function f() {
      S && S(), m && m(), o.cancelToken && o.cancelToken.unsubscribe(u), o.signal && o.signal.removeEventListener("abort", u);
    }
    let x = new XMLHttpRequest();
    x.open(o.method.toUpperCase(), o.url, !0), x.timeout = o.timeout;
    function E() {
      if (!x)
        return;
      const R = Re.from(
        "getAllResponseHeaders" in x && x.getAllResponseHeaders()
      ), A = {
        data: !a || a === "text" || a === "json" ? x.responseText : x.response,
        status: x.status,
        statusText: x.statusText,
        headers: R,
        config: e,
        request: x
      };
      sa(function(N) {
        n(N), f();
      }, function(N) {
        r(N), f();
      }, A), x = null;
    }
    "onloadend" in x ? x.onloadend = E : x.onreadystatechange = function() {
      !x || x.readyState !== 4 || x.status === 0 && !(x.responseURL && x.responseURL.indexOf("file:") === 0) || setTimeout(E);
    }, x.onabort = function() {
      x && (r(new J("Request aborted", J.ECONNABORTED, e, x)), x = null);
    }, x.onerror = function() {
      r(new J("Network Error", J.ERR_NETWORK, e, x)), x = null;
    }, x.ontimeout = function() {
      let C = o.timeout ? "timeout of " + o.timeout + "ms exceeded" : "timeout exceeded";
      const A = o.transitional || ra;
      o.timeoutErrorMessage && (C = o.timeoutErrorMessage), r(new J(
        C,
        A.clarifyTimeoutError ? J.ETIMEDOUT : J.ECONNABORTED,
        e,
        x
      )), x = null;
    }, i === void 0 && s.setContentType(null), "setRequestHeader" in x && v.forEach(s.toJSON(), function(C, A) {
      x.setRequestHeader(A, C);
    }), v.isUndefined(o.withCredentials) || (x.withCredentials = !!o.withCredentials), a && a !== "json" && (x.responseType = o.responseType), c && ([p, m] = rr(c, !0), x.addEventListener("progress", p)), l && x.upload && ([d, S] = rr(l), x.upload.addEventListener("progress", d), x.upload.addEventListener("loadend", S)), (o.cancelToken || o.signal) && (u = (R) => {
      x && (r(!R || R.type ? new qt(null, e, x) : R), x.abort(), x = null);
    }, o.cancelToken && o.cancelToken.subscribe(u), o.signal && (o.signal.aborted ? u() : o.signal.addEventListener("abort", u)));
    const j = Lp(o.url);
    if (j && ve.protocols.indexOf(j) === -1) {
      r(new J("Unsupported protocol " + j + ":", J.ERR_BAD_REQUEST, e));
      return;
    }
    x.send(i || null);
  });
}, Jp = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let r = new AbortController(), o;
    const i = function(c) {
      if (!o) {
        o = !0, a();
        const u = c instanceof Error ? c : this.reason;
        r.abort(u instanceof J ? u : new qt(u instanceof Error ? u.message : u));
      }
    };
    let s = t && setTimeout(() => {
      s = null, i(new J(`timeout ${t} of ms exceeded`, J.ETIMEDOUT));
    }, t);
    const a = () => {
      e && (s && clearTimeout(s), s = null, e.forEach((c) => {
        c.unsubscribe ? c.unsubscribe(i) : c.removeEventListener("abort", i);
      }), e = null);
    };
    e.forEach((c) => c.addEventListener("abort", i));
    const { signal: l } = r;
    return l.unsubscribe = () => v.asap(a), l;
  }
}, Gp = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let r = 0, o;
  for (; r < n; )
    o = r + t, yield e.slice(r, o), r = o;
}, Wp = async function* (e, t) {
  for await (const n of Hp(e))
    yield* Gp(n, t);
}, Hp = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: r } = await t.read();
      if (n)
        break;
      yield r;
    }
  } finally {
    await t.cancel();
  }
}, Ni = (e, t, n, r) => {
  const o = Wp(e, t);
  let i = 0, s, a = (l) => {
    s || (s = !0, r && r(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: c, value: u } = await o.next();
        if (c) {
          a(), l.close();
          return;
        }
        let d = u.byteLength;
        if (n) {
          let p = i += d;
          n(p);
        }
        l.enqueue(new Uint8Array(u));
      } catch (c) {
        throw a(c), c;
      }
    },
    cancel(l) {
      return a(l), o.return();
    }
  }, {
    highWaterMark: 2
  });
}, Er = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ca = Er && typeof ReadableStream == "function", Kp = Er && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), ua = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, qp = ca && ua(() => {
  let e = !1;
  const t = new Request(ve.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), _i = 64 * 1024, ro = ca && ua(() => v.isReadableStream(new Response("").body)), or = {
  stream: ro && ((e) => e.body)
};
Er && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !or[t] && (or[t] = v.isFunction(e[t]) ? (n) => n[t]() : (n, r) => {
      throw new J(`Response type '${t}' is not supported`, J.ERR_NOT_SUPPORT, r);
    });
  });
})(new Response());
const Yp = async (e) => {
  if (e == null)
    return 0;
  if (v.isBlob(e))
    return e.size;
  if (v.isSpecCompliantForm(e))
    return (await new Request(ve.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (v.isArrayBufferView(e) || v.isArrayBuffer(e))
    return e.byteLength;
  if (v.isURLSearchParams(e) && (e = e + ""), v.isString(e))
    return (await Kp(e)).byteLength;
}, Xp = async (e, t) => {
  const n = v.toFiniteNumber(e.getContentLength());
  return n ?? Yp(t);
}, Zp = Er && (async (e) => {
  let {
    url: t,
    method: n,
    data: r,
    signal: o,
    cancelToken: i,
    timeout: s,
    onDownloadProgress: a,
    onUploadProgress: l,
    responseType: c,
    headers: u,
    withCredentials: d = "same-origin",
    fetchOptions: p
  } = la(e);
  c = c ? (c + "").toLowerCase() : "text";
  let S = Jp([o, i && i.toAbortSignal()], s), m;
  const f = S && S.unsubscribe && (() => {
    S.unsubscribe();
  });
  let x;
  try {
    if (l && qp && n !== "get" && n !== "head" && (x = await Xp(u, r)) !== 0) {
      let A = new Request(t, {
        method: "POST",
        body: r,
        duplex: "half"
      }), P;
      if (v.isFormData(r) && (P = A.headers.get("content-type")) && u.setContentType(P), A.body) {
        const [N, V] = $i(
          x,
          rr(Pi(l))
        );
        r = Ni(A.body, _i, N, V);
      }
    }
    v.isString(d) || (d = d ? "include" : "omit");
    const E = "credentials" in Request.prototype;
    m = new Request(t, {
      ...p,
      signal: S,
      method: n.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: r,
      duplex: "half",
      credentials: E ? d : void 0
    });
    let j = await fetch(m);
    const R = ro && (c === "stream" || c === "response");
    if (ro && (a || R && f)) {
      const A = {};
      ["status", "statusText", "headers"].forEach((G) => {
        A[G] = j[G];
      });
      const P = v.toFiniteNumber(j.headers.get("content-length")), [N, V] = a && $i(
        P,
        rr(Pi(a), !0)
      ) || [];
      j = new Response(
        Ni(j.body, _i, N, () => {
          V && V(), f && f();
        }),
        A
      );
    }
    c = c || "text";
    let C = await or[v.findKey(or, c) || "text"](j, e);
    return !R && f && f(), await new Promise((A, P) => {
      sa(A, P, {
        data: C,
        headers: Re.from(j.headers),
        status: j.status,
        statusText: j.statusText,
        config: e,
        request: m
      });
    });
  } catch (E) {
    throw f && f(), E && E.name === "TypeError" && /fetch/i.test(E.message) ? Object.assign(
      new J("Network Error", J.ERR_NETWORK, e, m),
      {
        cause: E.cause || E
      }
    ) : J.from(E, E && E.code, e, m);
  }
}), oo = {
  http: pp,
  xhr: zp,
  fetch: Zp
};
v.forEach(oo, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Li = (e) => `- ${e}`, Qp = (e) => v.isFunction(e) || e === null || e === !1, fa = {
  getAdapter: (e) => {
    e = v.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, r;
    const o = {};
    for (let i = 0; i < t; i++) {
      n = e[i];
      let s;
      if (r = n, !Qp(n) && (r = oo[(s = String(n)).toLowerCase()], r === void 0))
        throw new J(`Unknown adapter '${s}'`);
      if (r)
        break;
      o[s || "#" + i] = r;
    }
    if (!r) {
      const i = Object.entries(o).map(
        ([a, l]) => `adapter ${a} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let s = t ? i.length > 1 ? `since :
` + i.map(Li).join(`
`) : " " + Li(i[0]) : "as no adapter specified";
      throw new J(
        "There is no suitable adapter to dispatch the request " + s,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: oo
};
function Gr(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new qt(null, e);
}
function Ii(e) {
  return Gr(e), e.headers = Re.from(e.headers), e.data = Jr.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), fa.getAdapter(e.adapter || Tn.adapter)(e).then(function(r) {
    return Gr(e), r.data = Jr.call(
      e,
      e.transformResponse,
      r
    ), r.headers = Re.from(r.headers), r;
  }, function(r) {
    return ia(r) || (Gr(e), r && r.response && (r.response.data = Jr.call(
      e,
      e.transformResponse,
      r.response
    ), r.response.headers = Re.from(r.response.headers))), Promise.reject(r);
  });
}
const da = "1.8.1", Or = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  Or[e] = function(r) {
    return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const Mi = {};
Or.transitional = function(t, n, r) {
  function o(i, s) {
    return "[Axios v" + da + "] Transitional option '" + i + "'" + s + (r ? ". " + r : "");
  }
  return (i, s, a) => {
    if (t === !1)
      throw new J(
        o(s, " has been removed" + (n ? " in " + n : "")),
        J.ERR_DEPRECATED
      );
    return n && !Mi[s] && (Mi[s] = !0, console.warn(
      o(
        s,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(i, s, a) : !0;
  };
};
Or.spelling = function(t) {
  return (n, r) => (console.warn(`${r} is likely a misspelling of ${t}`), !0);
};
function eg(e, t, n) {
  if (typeof e != "object")
    throw new J("options must be an object", J.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let o = r.length;
  for (; o-- > 0; ) {
    const i = r[o], s = t[i];
    if (s) {
      const a = e[i], l = a === void 0 || s(a, i, e);
      if (l !== !0)
        throw new J("option " + i + " must be " + l, J.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new J("Unknown option " + i, J.ERR_BAD_OPTION);
  }
}
const Jn = {
  assertOptions: eg,
  validators: Or
}, Je = Jn.validators;
let wt = class {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Ai(),
      response: new Ai()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let o = {};
        Error.captureStackTrace ? Error.captureStackTrace(o) : o = new Error();
        const i = o.stack ? o.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack ? i && !String(r.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (r.stack += `
` + i) : r.stack = i;
        } catch {
        }
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = Ot(this.defaults, n);
    const { transitional: r, paramsSerializer: o, headers: i } = n;
    r !== void 0 && Jn.assertOptions(r, {
      silentJSONParsing: Je.transitional(Je.boolean),
      forcedJSONParsing: Je.transitional(Je.boolean),
      clarifyTimeoutError: Je.transitional(Je.boolean)
    }, !1), o != null && (v.isFunction(o) ? n.paramsSerializer = {
      serialize: o
    } : Jn.assertOptions(o, {
      encode: Je.function,
      serialize: Je.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), Jn.assertOptions(n, {
      baseUrl: Je.spelling("baseURL"),
      withXsrfToken: Je.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = i && v.merge(
      i.common,
      i[n.method]
    );
    i && v.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete i[m];
      }
    ), n.headers = Re.concat(s, i);
    const a = [];
    let l = !0;
    this.interceptors.request.forEach(function(f) {
      typeof f.runWhen == "function" && f.runWhen(n) === !1 || (l = l && f.synchronous, a.unshift(f.fulfilled, f.rejected));
    });
    const c = [];
    this.interceptors.response.forEach(function(f) {
      c.push(f.fulfilled, f.rejected);
    });
    let u, d = 0, p;
    if (!l) {
      const m = [Ii.bind(this), void 0];
      for (m.unshift.apply(m, a), m.push.apply(m, c), p = m.length, u = Promise.resolve(n); d < p; )
        u = u.then(m[d++], m[d++]);
      return u;
    }
    p = a.length;
    let S = n;
    for (d = 0; d < p; ) {
      const m = a[d++], f = a[d++];
      try {
        S = m(S);
      } catch (x) {
        f.call(this, x);
        break;
      }
    }
    try {
      u = Ii.call(this, S);
    } catch (m) {
      return Promise.reject(m);
    }
    for (d = 0, p = c.length; d < p; )
      u = u.then(c[d++], c[d++]);
    return u;
  }
  getUri(t) {
    t = Ot(this.defaults, t);
    const n = aa(t.baseURL, t.url, t.allowAbsoluteUrls);
    return na(n, t.params, t.paramsSerializer);
  }
};
v.forEach(["delete", "get", "head", "options"], function(t) {
  wt.prototype[t] = function(n, r) {
    return this.request(Ot(r || {}, {
      method: t,
      url: n,
      data: (r || {}).data
    }));
  };
});
v.forEach(["post", "put", "patch"], function(t) {
  function n(r) {
    return function(i, s, a) {
      return this.request(Ot(a || {}, {
        method: t,
        headers: r ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: s
      }));
    };
  }
  wt.prototype[t] = n(), wt.prototype[t + "Form"] = n(!0);
});
let tg = class pa {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(i) {
      n = i;
    });
    const r = this;
    this.promise.then((o) => {
      if (!r._listeners) return;
      let i = r._listeners.length;
      for (; i-- > 0; )
        r._listeners[i](o);
      r._listeners = null;
    }), this.promise.then = (o) => {
      let i;
      const s = new Promise((a) => {
        r.subscribe(a), i = a;
      }).then(o);
      return s.cancel = function() {
        r.unsubscribe(i);
      }, s;
    }, t(function(i, s, a) {
      r.reason || (r.reason = new qt(i, s, a), n(r.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (r) => {
      t.abort(r);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new pa(function(o) {
        t = o;
      }),
      cancel: t
    };
  }
};
function ng(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function rg(e) {
  return v.isObject(e) && e.isAxiosError === !0;
}
const io = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(io).forEach(([e, t]) => {
  io[t] = e;
});
function ga(e) {
  const t = new wt(e), n = Gs(wt.prototype.request, t);
  return v.extend(n, wt.prototype, t, { allOwnKeys: !0 }), v.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(o) {
    return ga(Ot(e, o));
  }, n;
}
const de = ga(Tn);
de.Axios = wt;
de.CanceledError = qt;
de.CancelToken = tg;
de.isCancel = ia;
de.VERSION = da;
de.toFormData = Tr;
de.AxiosError = J;
de.Cancel = de.CanceledError;
de.all = function(t) {
  return Promise.all(t);
};
de.spread = ng;
de.isAxiosError = rg;
de.mergeConfig = Ot;
de.AxiosHeaders = Re;
de.formToJSON = (e) => oa(v.isHTMLForm(e) ? new FormData(e) : e);
de.getAdapter = fa.getAdapter;
de.HttpStatusCode = io;
de.default = de;
const {
  Axios: zb,
  AxiosError: Di,
  CanceledError: Jb,
  isCancel: Gb,
  CancelToken: Wb,
  VERSION: Hb,
  all: Kb,
  Cancel: qb,
  isAxiosError: Yb,
  spread: Xb,
  toFormData: Zb,
  AxiosHeaders: Qb,
  HttpStatusCode: e0,
  formToJSON: t0,
  getAdapter: n0,
  mergeConfig: r0
} = de;
function og(e) {
  try {
    return JSON.stringify(e);
  } catch {
    return;
  }
}
function ig(e) {
  var t, n, r, o;
  return e instanceof Di && e.code === "ERR_NETWORK" ? "Failed to connect to the server. Please check your internet connection." : e instanceof Di && e.response ? `${(t = e.response) == null ? void 0 : t.status} ${(n = e.response) == null ? void 0 : n.statusText} from ${(r = e.response) == null ? void 0 : r.config.url}: ${JSON.stringify((o = e.response) == null ? void 0 : o.data)}` : e instanceof Error ? e.message : `Unexpected error: ${og(e) || e}`;
}
const ha = (e) => {
  const t = e.softTimeout || 3e3, [n, r] = At(!1), o = tt();
  return ct(() => {
    const i = setTimeout(() => {
      r(!0);
    }, t);
    return () => clearTimeout(i);
  }), /* @__PURE__ */ b.jsx(
    ge,
    {
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      sx: { color: o.palette.text.primary },
      children: e.error ? /* @__PURE__ */ b.jsx(
        sg,
        {
          loadingMessage: e.message,
          error: e.error
        }
      ) : /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
        /* @__PURE__ */ b.jsx(nl, { sx: { marginBottom: "24px" } }),
        !!e.message && /* @__PURE__ */ b.jsx("div", { children: e.message }),
        /* @__PURE__ */ b.jsx(
          ge,
          {
            sx: {
              visibility: n ? "visible" : "hidden",
              marginTop: "1rem",
              color: o.palette.text.secondary
            },
            children: "This is taking longer than expected..."
          }
        )
      ] })
    }
  );
}, sg = (e) => {
  const t = ig(e.error), n = e.error instanceof Error ? e.error.stack : null, r = tt();
  return /* @__PURE__ */ b.jsxs(
    ge,
    {
      sx: {
        maxHeight: "100%",
        maxWidth: "min(100%, 800px)",
        padding: 2,
        overflow: "auto",
        color: r.palette.error.main,
        "& pre": {
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          paddingBottom: "3rem"
        }
      },
      children: [
        (e.loadingMessage ? `Error while ${kl(rl(e.loadingMessage))} - ` : "") + t,
        /* @__PURE__ */ b.jsx("br", {}),
        n && /* @__PURE__ */ b.jsx("pre", { children: n })
      ]
    }
  );
}, ag = ({
  title: e,
  titleId: t,
  ...n
}, r) => /* @__PURE__ */ D.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 19, height: 10, fill: "none", ref: r, "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ D.createElement("title", { id: t }, e) : null, /* @__PURE__ */ D.createElement("path", { fill: "#fff", fillRule: "evenodd", d: "M5.131.312a.9.9 0 0 1 0 1.272L3.07 3.645h12.44l-2.06-2.061A.9.9 0 0 1 14.72.313l3.596 3.596a.9.9 0 0 1 0 1.271l-3.596 3.597a.9.9 0 0 1-1.271-1.272l2.061-2.062H3.07L5.13 7.505A.9.9 0 0 1 3.86 8.777L.263 5.18a.9.9 0 0 1 0-1.271L3.86.312a.9.9 0 0 1 1.271 0", clipRule: "evenodd" })), lg = pt(ag), cg = ({
  title: e,
  titleId: t,
  ...n
}, r) => /* @__PURE__ */ D.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 19, height: 10, fill: "none", ref: r, "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ D.createElement("title", { id: t }, e) : null, /* @__PURE__ */ D.createElement("path", { fill: "#fff", fillRule: "evenodd", d: "M5.131.312a.9.9 0 0 1 0 1.272L3.07 3.645h12.44l-2.06-2.061A.9.9 0 0 1 14.72.313l3.596 3.596a.9.9 0 0 1 0 1.271l-3.596 3.597a.9.9 0 0 1-1.271-1.272l2.061-2.062H3.07L5.13 7.505A.9.9 0 0 1 3.86 8.777L.263 5.18a.9.9 0 0 1 0-1.271L3.86.312a.9.9 0 0 1 1.271 0", clipRule: "evenodd" })), ug = pt(cg), fg = ({
  title: e,
  titleId: t,
  ...n
}, r) => /* @__PURE__ */ D.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 10, height: 19, fill: "none", ref: r, "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ D.createElement("title", { id: t }, e) : null, /* @__PURE__ */ D.createElement("path", { fill: "#fff", fillRule: "evenodd", d: "M9.522 14.811A.899.899 0 1 0 8.25 13.54L6.19 15.601V3.16L8.25 5.221A.9.9 0 0 0 9.522 3.95L5.926.354a.9.9 0 0 0-1.272 0L1.058 3.95a.9.9 0 1 0 1.271 1.271L4.391 3.16v12.442L2.329 13.54a.899.899 0 1 0-1.271 1.271l3.596 3.597a.9.9 0 0 0 1.272 0z", clipRule: "evenodd" })), dg = pt(fg), pg = ({
  title: e,
  titleId: t,
  ...n
}, r) => /* @__PURE__ */ D.createElement("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ref: r, "aria-labelledby": t, ...n }, e ? /* @__PURE__ */ D.createElement("title", { id: t }, e) : null, /* @__PURE__ */ D.createElement("path", { d: "M8 16C5.76667 16 3.875 15.225 2.325 13.675C0.775 12.125 0 10.2333 0 8C0 5.76667 0.775 3.875 2.325 2.325C3.875 0.775 5.76667 0 8 0C9.15 0 10.25 0.2375 11.3 0.7125C12.35 1.1875 13.25 1.86667 14 2.75V0H16V7H9V5H13.2C12.6667 4.06667 11.9375 3.33333 11.0125 2.8C10.0875 2.26667 9.08333 2 8 2C6.33333 2 4.91667 2.58333 3.75 3.75C2.58333 4.91667 2 6.33333 2 8C2 9.66667 2.58333 11.0833 3.75 12.25C4.91667 13.4167 6.33333 14 8 14C9.28333 14 10.4417 13.6333 11.475 12.9C11.0583 14.1 12.5083 12.1667 11.475 12.9L12.9 14.325C11.4667 15.4417 9.83333 16 8 16Z", fill: "white" })), gg = pt(pg);
function hg() {
  this.__data__ = [], this.size = 0;
}
function ma(e, t) {
  return e === t || e !== e && t !== t;
}
function Rr(e, t) {
  for (var n = e.length; n--; )
    if (ma(e[n][0], t))
      return n;
  return -1;
}
var mg = Array.prototype, yg = mg.splice;
function bg(e) {
  var t = this.__data__, n = Rr(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : yg.call(t, n, 1), --this.size, !0;
}
function xg(e) {
  var t = this.__data__, n = Rr(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function Sg(e) {
  return Rr(this.__data__, e) > -1;
}
function vg(e, t) {
  var n = this.__data__, r = Rr(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function rt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
rt.prototype.clear = hg;
rt.prototype.delete = bg;
rt.prototype.get = xg;
rt.prototype.has = Sg;
rt.prototype.set = vg;
function wg() {
  this.__data__ = new rt(), this.size = 0;
}
function Cg(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function Tg(e) {
  return this.__data__.get(e);
}
function Eg(e) {
  return this.__data__.has(e);
}
var Og = "[object AsyncFunction]", Rg = "[object Function]", Ag = "[object GeneratorFunction]", kg = "[object Proxy]";
function ya(e) {
  if (!Tt(e))
    return !1;
  var t = $t(e);
  return t == Rg || t == Ag || t == Og || t == kg;
}
var Wr = qe["__core-js_shared__"], Fi = function() {
  var e = /[^.]+$/.exec(Wr && Wr.keys && Wr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function $g(e) {
  return !!Fi && Fi in e;
}
var Pg = Function.prototype, jg = Pg.toString;
function Pt(e) {
  if (e != null) {
    try {
      return jg.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ng = /[\\^$.*+?()[\]{}|]/g, _g = /^\[object .+?Constructor\]$/, Lg = Function.prototype, Ig = Object.prototype, Mg = Lg.toString, Dg = Ig.hasOwnProperty, Fg = RegExp(
  "^" + Mg.call(Dg).replace(Ng, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Bg(e) {
  if (!Tt(e) || $g(e))
    return !1;
  var t = ya(e) ? Fg : _g;
  return t.test(Pt(e));
}
function Vg(e, t) {
  return e == null ? void 0 : e[t];
}
function jt(e, t) {
  var n = Vg(e, t);
  return Bg(n) ? n : void 0;
}
var hn = jt(qe, "Map"), mn = jt(Object, "create");
function Ug() {
  this.__data__ = mn ? mn(null) : {}, this.size = 0;
}
function zg(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var Jg = "__lodash_hash_undefined__", Gg = Object.prototype, Wg = Gg.hasOwnProperty;
function Hg(e) {
  var t = this.__data__;
  if (mn) {
    var n = t[e];
    return n === Jg ? void 0 : n;
  }
  return Wg.call(t, e) ? t[e] : void 0;
}
var Kg = Object.prototype, qg = Kg.hasOwnProperty;
function Yg(e) {
  var t = this.__data__;
  return mn ? t[e] !== void 0 : qg.call(t, e);
}
var Xg = "__lodash_hash_undefined__";
function Zg(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = mn && t === void 0 ? Xg : t, this;
}
function Rt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
Rt.prototype.clear = Ug;
Rt.prototype.delete = zg;
Rt.prototype.get = Hg;
Rt.prototype.has = Yg;
Rt.prototype.set = Zg;
function Qg() {
  this.size = 0, this.__data__ = {
    hash: new Rt(),
    map: new (hn || rt)(),
    string: new Rt()
  };
}
function eh(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Ar(e, t) {
  var n = e.__data__;
  return eh(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function th(e) {
  var t = Ar(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function nh(e) {
  return Ar(this, e).get(e);
}
function rh(e) {
  return Ar(this, e).has(e);
}
function oh(e, t) {
  var n = Ar(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function ot(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ot.prototype.clear = Qg;
ot.prototype.delete = th;
ot.prototype.get = nh;
ot.prototype.has = rh;
ot.prototype.set = oh;
var ih = 200;
function sh(e, t) {
  var n = this.__data__;
  if (n instanceof rt) {
    var r = n.__data__;
    if (!hn || r.length < ih - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new ot(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Qe(e) {
  var t = this.__data__ = new rt(e);
  this.size = t.size;
}
Qe.prototype.clear = wg;
Qe.prototype.delete = Cg;
Qe.prototype.get = Tg;
Qe.prototype.has = Eg;
Qe.prototype.set = sh;
var ah = "__lodash_hash_undefined__";
function lh(e) {
  return this.__data__.set(e, ah), this;
}
function ch(e) {
  return this.__data__.has(e);
}
function ir(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new ot(); ++t < n; )
    this.add(e[t]);
}
ir.prototype.add = ir.prototype.push = lh;
ir.prototype.has = ch;
function uh(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function fh(e, t) {
  return e.has(t);
}
var dh = 1, ph = 2;
function ba(e, t, n, r, o, i) {
  var s = n & dh, a = e.length, l = t.length;
  if (a != l && !(s && l > a))
    return !1;
  var c = i.get(e), u = i.get(t);
  if (c && u)
    return c == t && u == e;
  var d = -1, p = !0, S = n & ph ? new ir() : void 0;
  for (i.set(e, t), i.set(t, e); ++d < a; ) {
    var m = e[d], f = t[d];
    if (r)
      var x = s ? r(f, m, d, t, e, i) : r(m, f, d, e, t, i);
    if (x !== void 0) {
      if (x)
        continue;
      p = !1;
      break;
    }
    if (S) {
      if (!uh(t, function(E, j) {
        if (!fh(S, j) && (m === E || o(m, E, n, r, i)))
          return S.push(j);
      })) {
        p = !1;
        break;
      }
    } else if (!(m === f || o(m, f, n, r, i))) {
      p = !1;
      break;
    }
  }
  return i.delete(e), i.delete(t), p;
}
var Bi = qe.Uint8Array;
function gh(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, o) {
    n[++t] = [o, r];
  }), n;
}
function hh(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var mh = 1, yh = 2, bh = "[object Boolean]", xh = "[object Date]", Sh = "[object Error]", vh = "[object Map]", wh = "[object Number]", Ch = "[object RegExp]", Th = "[object Set]", Eh = "[object String]", Oh = "[object Symbol]", Rh = "[object ArrayBuffer]", Ah = "[object DataView]", Vi = dt ? dt.prototype : void 0, Hr = Vi ? Vi.valueOf : void 0;
function kh(e, t, n, r, o, i, s) {
  switch (n) {
    case Ah:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Rh:
      return !(e.byteLength != t.byteLength || !i(new Bi(e), new Bi(t)));
    case bh:
    case xh:
    case wh:
      return ma(+e, +t);
    case Sh:
      return e.name == t.name && e.message == t.message;
    case Ch:
    case Eh:
      return e == t + "";
    case vh:
      var a = gh;
    case Th:
      var l = r & mh;
      if (a || (a = hh), e.size != t.size && !l)
        return !1;
      var c = s.get(e);
      if (c)
        return c == t;
      r |= yh, s.set(e, t);
      var u = ba(a(e), a(t), r, o, i, s);
      return s.delete(e), u;
    case Oh:
      if (Hr)
        return Hr.call(e) == Hr.call(t);
  }
  return !1;
}
function $h(e, t) {
  for (var n = -1, r = t.length, o = e.length; ++n < r; )
    e[o + n] = t[n];
  return e;
}
var Ke = Array.isArray;
function Ph(e, t, n) {
  var r = t(e);
  return Ke(e) ? r : $h(r, n(e));
}
function jh(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = 0, i = []; ++n < r; ) {
    var s = e[n];
    t(s, n, e) && (i[o++] = s);
  }
  return i;
}
function Nh() {
  return [];
}
var _h = Object.prototype, Lh = _h.propertyIsEnumerable, Ui = Object.getOwnPropertySymbols, Ih = Ui ? function(e) {
  return e == null ? [] : (e = Object(e), jh(Ui(e), function(t) {
    return Lh.call(e, t);
  }));
} : Nh;
function Mh(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var Dh = "[object Arguments]";
function zi(e) {
  return Et(e) && $t(e) == Dh;
}
var xa = Object.prototype, Fh = xa.hasOwnProperty, Bh = xa.propertyIsEnumerable, Sa = zi(/* @__PURE__ */ function() {
  return arguments;
}()) ? zi : function(e) {
  return Et(e) && Fh.call(e, "callee") && !Bh.call(e, "callee");
};
function Vh() {
  return !1;
}
var va = typeof exports == "object" && exports && !exports.nodeType && exports, Ji = va && typeof module == "object" && module && !module.nodeType && module, Uh = Ji && Ji.exports === va, Gi = Uh ? qe.Buffer : void 0, zh = Gi ? Gi.isBuffer : void 0, so = zh || Vh, Jh = 9007199254740991, Gh = /^(?:0|[1-9]\d*)$/;
function wa(e, t) {
  var n = typeof e;
  return t = t ?? Jh, !!t && (n == "number" || n != "symbol" && Gh.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var Wh = 9007199254740991;
function Eo(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Wh;
}
var Hh = "[object Arguments]", Kh = "[object Array]", qh = "[object Boolean]", Yh = "[object Date]", Xh = "[object Error]", Zh = "[object Function]", Qh = "[object Map]", em = "[object Number]", tm = "[object Object]", nm = "[object RegExp]", rm = "[object Set]", om = "[object String]", im = "[object WeakMap]", sm = "[object ArrayBuffer]", am = "[object DataView]", lm = "[object Float32Array]", cm = "[object Float64Array]", um = "[object Int8Array]", fm = "[object Int16Array]", dm = "[object Int32Array]", pm = "[object Uint8Array]", gm = "[object Uint8ClampedArray]", hm = "[object Uint16Array]", mm = "[object Uint32Array]", ie = {};
ie[lm] = ie[cm] = ie[um] = ie[fm] = ie[dm] = ie[pm] = ie[gm] = ie[hm] = ie[mm] = !0;
ie[Hh] = ie[Kh] = ie[sm] = ie[qh] = ie[am] = ie[Yh] = ie[Xh] = ie[Zh] = ie[Qh] = ie[em] = ie[tm] = ie[nm] = ie[rm] = ie[om] = ie[im] = !1;
function ym(e) {
  return Et(e) && Eo(e.length) && !!ie[$t(e)];
}
function bm(e) {
  return function(t) {
    return e(t);
  };
}
var Ca = typeof exports == "object" && exports && !exports.nodeType && exports, cn = Ca && typeof module == "object" && module && !module.nodeType && module, xm = cn && cn.exports === Ca, Kr = xm && zs.process, Wi = function() {
  try {
    var e = cn && cn.require && cn.require("util").types;
    return e || Kr && Kr.binding && Kr.binding("util");
  } catch {
  }
}(), Hi = Wi && Wi.isTypedArray, Ta = Hi ? bm(Hi) : ym, Sm = Object.prototype, vm = Sm.hasOwnProperty;
function wm(e, t) {
  var n = Ke(e), r = !n && Sa(e), o = !n && !r && so(e), i = !n && !r && !o && Ta(e), s = n || r || o || i, a = s ? Mh(e.length, String) : [], l = a.length;
  for (var c in e)
    vm.call(e, c) && !(s && // Safari 9 has enumerable `arguments.length` in strict mode.
    (c == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    o && (c == "offset" || c == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    i && (c == "buffer" || c == "byteLength" || c == "byteOffset") || // Skip index properties.
    wa(c, l))) && a.push(c);
  return a;
}
var Cm = Object.prototype;
function Tm(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Cm;
  return e === n;
}
function Em(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var Om = Em(Object.keys, Object), Rm = Object.prototype, Am = Rm.hasOwnProperty;
function km(e) {
  if (!Tm(e))
    return Om(e);
  var t = [];
  for (var n in Object(e))
    Am.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function Ea(e) {
  return e != null && Eo(e.length) && !ya(e);
}
function Oo(e) {
  return Ea(e) ? wm(e) : km(e);
}
function Ki(e) {
  return Ph(e, Oo, Ih);
}
var $m = 1, Pm = Object.prototype, jm = Pm.hasOwnProperty;
function Nm(e, t, n, r, o, i) {
  var s = n & $m, a = Ki(e), l = a.length, c = Ki(t), u = c.length;
  if (l != u && !s)
    return !1;
  for (var d = l; d--; ) {
    var p = a[d];
    if (!(s ? p in t : jm.call(t, p)))
      return !1;
  }
  var S = i.get(e), m = i.get(t);
  if (S && m)
    return S == t && m == e;
  var f = !0;
  i.set(e, t), i.set(t, e);
  for (var x = s; ++d < l; ) {
    p = a[d];
    var E = e[p], j = t[p];
    if (r)
      var R = s ? r(j, E, p, t, e, i) : r(E, j, p, e, t, i);
    if (!(R === void 0 ? E === j || o(E, j, n, r, i) : R)) {
      f = !1;
      break;
    }
    x || (x = p == "constructor");
  }
  if (f && !x) {
    var C = e.constructor, A = t.constructor;
    C != A && "constructor" in e && "constructor" in t && !(typeof C == "function" && C instanceof C && typeof A == "function" && A instanceof A) && (f = !1);
  }
  return i.delete(e), i.delete(t), f;
}
var ao = jt(qe, "DataView"), lo = jt(qe, "Promise"), co = jt(qe, "Set"), uo = jt(qe, "WeakMap"), qi = "[object Map]", _m = "[object Object]", Yi = "[object Promise]", Xi = "[object Set]", Zi = "[object WeakMap]", Qi = "[object DataView]", Lm = Pt(ao), Im = Pt(hn), Mm = Pt(lo), Dm = Pt(co), Fm = Pt(uo), at = $t;
(ao && at(new ao(new ArrayBuffer(1))) != Qi || hn && at(new hn()) != qi || lo && at(lo.resolve()) != Yi || co && at(new co()) != Xi || uo && at(new uo()) != Zi) && (at = function(e) {
  var t = $t(e), n = t == _m ? e.constructor : void 0, r = n ? Pt(n) : "";
  if (r)
    switch (r) {
      case Lm:
        return Qi;
      case Im:
        return qi;
      case Mm:
        return Yi;
      case Dm:
        return Xi;
      case Fm:
        return Zi;
    }
  return t;
});
var Bm = 1, es = "[object Arguments]", ts = "[object Array]", Pn = "[object Object]", Vm = Object.prototype, ns = Vm.hasOwnProperty;
function Um(e, t, n, r, o, i) {
  var s = Ke(e), a = Ke(t), l = s ? ts : at(e), c = a ? ts : at(t);
  l = l == es ? Pn : l, c = c == es ? Pn : c;
  var u = l == Pn, d = c == Pn, p = l == c;
  if (p && so(e)) {
    if (!so(t))
      return !1;
    s = !0, u = !1;
  }
  if (p && !u)
    return i || (i = new Qe()), s || Ta(e) ? ba(e, t, n, r, o, i) : kh(e, t, l, n, r, o, i);
  if (!(n & Bm)) {
    var S = u && ns.call(e, "__wrapped__"), m = d && ns.call(t, "__wrapped__");
    if (S || m) {
      var f = S ? e.value() : e, x = m ? t.value() : t;
      return i || (i = new Qe()), o(f, x, n, r, i);
    }
  }
  return p ? (i || (i = new Qe()), Nm(e, t, n, r, o, i)) : !1;
}
function kr(e, t, n, r, o) {
  return e === t ? !0 : e == null || t == null || !Et(e) && !Et(t) ? e !== e && t !== t : Um(e, t, n, r, kr, o);
}
function zm(e, t) {
  return kr(e, t);
}
const Oa = ({
  store: e
}) => {
  const { t } = yn(), [n, r] = At(
    e.jogger.motionStream.rapidlyChangingMotionState.state.joint_limit_reached.limit_reached
  ), o = Wt(n);
  wn(() => {
    const s = e.jogger.motionStream.rapidlyChangingMotionState.state.joint_limit_reached.limit_reached;
    zm(o.current, s) || (o.current = s, r(s));
  });
  const i = [];
  for (const [s, a] of n.entries())
    a && i.push(s);
  return /* @__PURE__ */ b.jsx(
    et,
    {
      color: "error",
      sx: {
        margin: "0.5rem 1rem",
        textAlign: "center",
        minHeight: "1.5rem",
        visibility: i.length ? "visible" : "hidden"
      },
      children: t("Jogging.JointLimitsReached.lb", {
        jointNumbers: i.map((s) => s + 1).join(", ")
      })
    }
  );
}, Jm = po(sl)(({ theme: e }) => ({
  "&.MuiFormControl-root": {
    ".MuiSelect-select": {
      paddingTop: "20px",
      paddingLeft: "12px"
    },
    label: {
      pointerEvents: "none",
      fontSize: "16px"
    },
    ".MuiInputLabel-root": {
      "&.Mui-focused": {
        color: e.palette.text.primary
      }
    }
  }
}));
function jn({
  labelValue: e,
  ...t
}) {
  return /* @__PURE__ */ b.jsxs(Jm, { fullWidth: !0, variant: "filled", children: [
    /* @__PURE__ */ b.jsx(ol, { id: t.labelId, children: e }),
    /* @__PURE__ */ b.jsx(il, { ...t })
  ] });
}
var rs = function() {
  try {
    var e = jt(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
function Gm(e, t, n) {
  t == "__proto__" && rs ? rs(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function Wm(e, t, n, r) {
  for (var o = -1, i = e == null ? 0 : e.length; ++o < i; ) {
    var s = e[o];
    t(r, s, n(s), e);
  }
  return r;
}
function Hm(e) {
  return function(t, n, r) {
    for (var o = -1, i = Object(t), s = r(t), a = s.length; a--; ) {
      var l = s[++o];
      if (n(i[l], l, i) === !1)
        break;
    }
    return t;
  };
}
var Km = Hm();
function qm(e, t) {
  return e && Km(e, t, Oo);
}
function Ym(e, t) {
  return function(n, r) {
    if (n == null)
      return n;
    if (!Ea(n))
      return e(n, r);
    for (var o = n.length, i = -1, s = Object(n); ++i < o && r(s[i], i, s) !== !1; )
      ;
    return n;
  };
}
var Xm = Ym(qm);
function Zm(e, t, n, r) {
  return Xm(e, function(o, i, s) {
    t(r, o, n(o), s);
  }), r;
}
var Qm = 1, ey = 2;
function ty(e, t, n, r) {
  var o = n.length, i = o;
  if (e == null)
    return !i;
  for (e = Object(e); o--; ) {
    var s = n[o];
    if (s[2] ? s[1] !== e[s[0]] : !(s[0] in e))
      return !1;
  }
  for (; ++o < i; ) {
    s = n[o];
    var a = s[0], l = e[a], c = s[1];
    if (s[2]) {
      if (l === void 0 && !(a in e))
        return !1;
    } else {
      var u = new Qe(), d;
      if (!(d === void 0 ? kr(c, l, Qm | ey, r, u) : d))
        return !1;
    }
  }
  return !0;
}
function Ra(e) {
  return e === e && !Tt(e);
}
function ny(e) {
  for (var t = Oo(e), n = t.length; n--; ) {
    var r = t[n], o = e[r];
    t[n] = [r, o, Ra(o)];
  }
  return t;
}
function Aa(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function ry(e) {
  var t = ny(e);
  return t.length == 1 && t[0][2] ? Aa(t[0][0], t[0][1]) : function(n) {
    return n === e || ty(n, e, t);
  };
}
var oy = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, iy = /^\w*$/;
function Ro(e, t) {
  if (Ke(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || Sr(e) ? !0 : iy.test(e) || !oy.test(e) || t != null && e in Object(t);
}
var sy = "Expected a function";
function Ao(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(sy);
  var n = function() {
    var r = arguments, o = t ? t.apply(this, r) : r[0], i = n.cache;
    if (i.has(o))
      return i.get(o);
    var s = e.apply(this, r);
    return n.cache = i.set(o, s) || i, s;
  };
  return n.cache = new (Ao.Cache || ot)(), n;
}
Ao.Cache = ot;
var ay = 500;
function ly(e) {
  var t = Ao(e, function(r) {
    return n.size === ay && n.clear(), r;
  }), n = t.cache;
  return t;
}
var cy = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, uy = /\\(\\)?/g, fy = ly(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(cy, function(n, r, o, i) {
    t.push(o ? i.replace(uy, "$1") : r || n);
  }), t;
});
function dy(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; )
    o[n] = t(e[n], n, e);
  return o;
}
var os = dt ? dt.prototype : void 0, is = os ? os.toString : void 0;
function ka(e) {
  if (typeof e == "string")
    return e;
  if (Ke(e))
    return dy(e, ka) + "";
  if (Sr(e))
    return is ? is.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function $a(e) {
  return e == null ? "" : ka(e);
}
function Pa(e, t) {
  return Ke(e) ? e : Ro(e, t) ? [e] : fy($a(e));
}
function $r(e) {
  if (typeof e == "string" || Sr(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function ja(e, t) {
  t = Pa(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[$r(t[n++])];
  return n && n == r ? e : void 0;
}
function py(e, t, n) {
  var r = e == null ? void 0 : ja(e, t);
  return r === void 0 ? n : r;
}
function gy(e, t) {
  return e != null && t in Object(e);
}
function hy(e, t, n) {
  t = Pa(t, e);
  for (var r = -1, o = t.length, i = !1; ++r < o; ) {
    var s = $r(t[r]);
    if (!(i = e != null && n(e, s)))
      break;
    e = e[s];
  }
  return i || ++r != o ? i : (o = e == null ? 0 : e.length, !!o && Eo(o) && wa(s, o) && (Ke(e) || Sa(e)));
}
function my(e, t) {
  return e != null && hy(e, t, gy);
}
var yy = 1, by = 2;
function xy(e, t) {
  return Ro(e) && Ra(t) ? Aa($r(e), t) : function(n) {
    var r = py(n, e);
    return r === void 0 && r === t ? my(n, e) : kr(t, r, yy | by);
  };
}
function Sy(e) {
  return e;
}
function vy(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function wy(e) {
  return function(t) {
    return ja(t, e);
  };
}
function Cy(e) {
  return Ro(e) ? vy($r(e)) : wy(e);
}
function Ty(e) {
  return typeof e == "function" ? e : e == null ? Sy : typeof e == "object" ? Ke(e) ? xy(e[0], e[1]) : ry(e) : Cy(e);
}
function Ey(e, t) {
  return function(n, r) {
    var o = Ke(n) ? Wm : Zm, i = {};
    return o(n, e, Ty(r), i);
  };
}
var Nn = Ey(function(e, t, n) {
  Gm(e, n, t);
}), Oy = 0;
function Ry(e) {
  var t = ++Oy;
  return $a(e) + t;
}
const fo = [
  { id: "0.1", mm: 0.1, degrees: 0.05 },
  { id: "1", mm: 1, degrees: 0.5 },
  { id: "5", mm: 5, degrees: 2.5 },
  { id: "10", mm: 10, degrees: 5 }
], Ay = [
  { id: "continuous" },
  ...fo
], ky = ["coordsys", "tool"];
class ko {
  constructor(t, n, r, o) {
    var i, s;
    this.jogger = t, this.motionGroupSpec = n, this.coordSystems = r, this.tcps = o, this.selectedTabId = "cartesian", this.activationState = "inactive", this.activationError = null, this.activationCounter = 0, this.locks = /* @__PURE__ */ new Set(), this.selectedCoordSystemId = "world", this.selectedTcpId = "", this.selectedOrientation = "coordsys", this.selectedIncrementId = "continuous", this.selectedCartesianMotionType = "translate", this.incrementJogInProgress = null, this.translationVelocityMmPerSec = 10, this.rotationVelocityDegPerSec = 1, this.minTranslationVelocityMmPerSec = 5, this.maxTranslationVelocityMmPerSec = 250, this.minRotationVelocityDegPerSec = 1, this.maxRotationVelocityDegPerSec = 60, this.disposers = [];
    for (const a of r)
      if (a.coordinate_system === "") {
        a.coordinate_system = "world";
        break;
      }
    this.selectedCoordSystemId = ((i = r[0]) == null ? void 0 : i.coordinate_system) || "world", this.selectedTcpId = ((s = o[0]) == null ? void 0 : s.id) || "", wl(this, {}, { autoBind: !0 }), this.loadFromLocalStorage(), this.disposers.push(ms(() => this.saveToLocalStorage())), window.joggingStore = this;
  }
  /**
   * Load a jogging store with the relevant data it needs
   * from the backend
   */
  static async loadFor(t) {
    const { nova: n } = t, [r, { coordinatesystems: o }, { tcps: i }] = await Promise.all([
      n.api.motionGroupInfos.getMotionGroupSpecification(
        t.motionGroupId
      ),
      // Fetch coord systems so user can select between them
      n.api.coordinateSystems.listCoordinateSystems("ROTATION_VECTOR"),
      // Same for TCPs
      n.api.motionGroupInfos.listTcps(
        t.motionGroupId,
        "ROTATION_VECTOR"
      )
    ]);
    return new ko(
      t,
      r,
      o || [],
      i || []
    );
  }
  dispose() {
    for (const t of this.disposers)
      t();
    this.jogger.dispose();
  }
  get coordSystemCountByName() {
    return $l(this.coordSystems, (t) => t.name);
  }
  async deactivate() {
    const t = this.jogger.activeWebsocket;
    this.jogger.setJoggingMode("increment"), t && await t.closed();
  }
  /** Activate the jogger with current settings */
  async activate() {
    if (this.currentTab.id === "cartesian") {
      const t = {
        tcpId: this.selectedTcpId,
        coordSystemId: this.activeCoordSystemId
      };
      this.activeDiscreteIncrement ? this.jogger.setJoggingMode("increment", t) : this.jogger.setJoggingMode("cartesian", t);
    } else
      this.jogger.setJoggingMode("joint");
    return this.jogger;
  }
  loadFromLocalStorage() {
    const t = El(localStorage.getItem("joggingToolStore"));
    t && (this.tabsById[t.selectedTabId] && (this.selectedTabId = t.selectedTabId), this.coordSystemsById[t.selectedCoordSystemId] && (this.selectedCoordSystemId = t.selectedCoordSystemId), this.tcpsById[t.selectedTcpId] && (this.selectedTcpId = t.selectedTcpId), this.incrementOptionsById[t.selectedIncrementId] && (this.selectedIncrementId = t.selectedIncrementId), ["translate", "rotate"].includes(t.selectedCartesianMotionType) && (this.selectedCartesianMotionType = t.selectedCartesianMotionType), ["coordsys", "tool"].includes(t.selectedOrientation) && (this.selectedOrientation = t.selectedOrientation));
  }
  saveToLocalStorage() {
    localStorage.setItem(
      "joggingToolStore",
      JSON.stringify(this.localStorageSave)
    );
  }
  get isLocked() {
    return this.locks.size > 0;
  }
  get localStorageSave() {
    return {
      selectedTabId: this.selectedTabId,
      selectedCoordSystemId: this.selectedCoordSystemId,
      selectedTcpId: this.selectedTcpId,
      selectedOrientation: this.selectedOrientation,
      selectedIncrementId: this.selectedIncrementId,
      selectedCartesianMotionType: this.selectedCartesianMotionType
    };
  }
  get tabs() {
    return [
      {
        id: "cartesian",
        label: "Cartesian"
      },
      {
        id: "joint",
        label: "Joints"
      }
    ];
  }
  get incrementOptions() {
    return Ay;
  }
  get discreteIncrementOptions() {
    return fo;
  }
  get incrementOptionsById() {
    return Nn(this.incrementOptions, (t) => t.id);
  }
  get tabsById() {
    return Nn(this.tabs, (t) => t.id);
  }
  get currentTab() {
    return this.tabsById[this.selectedTabId] || this.tabs[0];
  }
  get tabIndex() {
    return this.tabs.indexOf(this.currentTab);
  }
  get coordSystemsById() {
    return Nn(this.coordSystems, (t) => t.coordinate_system);
  }
  get selectedCoordSystem() {
    return this.coordSystemsById[this.selectedCoordSystemId];
  }
  /**
   * The id of the coordinate system to use for jogging.
   * If in tool orientation, this is set to "tool", not the
   * selected coordinate system.
   */
  get activeCoordSystemId() {
    return this.selectedOrientation === "tool" ? "tool" : this.selectedCoordSystemId;
  }
  get tcpsById() {
    return Nn(this.tcps, (t) => t.id);
  }
  get activeDiscreteIncrement() {
    return this.selectedOrientation === "tool" ? void 0 : fo.find((t) => t.id === this.selectedIncrementId);
  }
  /** The selected rotation velocity converted to radians per second */
  get rotationVelocityRadsPerSec() {
    return this.rotationVelocityDegPerSec * Math.PI / 180;
  }
  /** Selected velocity in mm/sec or deg/sec */
  get velocityInDisplayUnits() {
    return this.currentMotionType === "translate" ? this.translationVelocityMmPerSec : this.rotationVelocityDegPerSec;
  }
  /** Minimum selectable velocity in mm/sec or deg/sec */
  get minVelocityInDisplayUnits() {
    return this.currentMotionType === "translate" ? this.minTranslationVelocityMmPerSec : this.minRotationVelocityDegPerSec;
  }
  /** Maximum selectable velocity in mm/sec or deg/sec */
  get maxVelocityInDisplayUnits() {
    return this.currentMotionType === "translate" ? this.maxTranslationVelocityMmPerSec : this.maxRotationVelocityDegPerSec;
  }
  /**
   * For velocity unit purposes, joint and cartesian rotation
   * are treated as the same type of motion
   */
  get currentMotionType() {
    return this.selectedTabId === "cartesian" && this.selectedCartesianMotionType === "translate" ? "translate" : "rotate";
  }
  onTabChange(t, n) {
    const r = this.tabs[n] || this.tabs[0];
    this.selectedTabId = r.id;
  }
  setSelectedCoordSystemId(t) {
    this.selectedCoordSystemId = t;
  }
  setSelectedTcpId(t) {
    this.selectedTcpId = t;
  }
  setSelectedOrientation(t) {
    this.selectedOrientation = t;
  }
  setSelectedIncrementId(t) {
    this.selectedIncrementId = t;
  }
  setCurrentIncrementJog(t) {
    this.incrementJogInProgress = t;
  }
  setVelocityFromSlider(t) {
    this.currentMotionType === "translate" ? this.translationVelocityMmPerSec = t : this.rotationVelocityDegPerSec = t;
  }
  setSelectedCartesianMotionType(t) {
    this.selectedCartesianMotionType = t;
  }
  lock(t) {
    this.locks.add(t);
  }
  unlock(t) {
    this.locks.delete(t);
  }
  /** Lock the UI until the given async callback resolves */
  async withMotionLock(t) {
    const n = Ry();
    this.lock(n);
    try {
      return await t();
    } finally {
      this.unlock(n);
    }
  }
}
const $y = Ie(({ store: e }) => {
  var r;
  const { t } = yn();
  function n(o) {
    switch (o) {
      case "coordsys":
        return t("Jogging.Orientation.coordsys");
      case "tool":
        return t("Jogging.Orientation.tool");
      default:
        return o;
    }
  }
  return /* @__PURE__ */ b.jsxs(
    al,
    {
      component: "div",
      sx: {
        display: "grid",
        gap: "16px",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "min-height min-height",
        "& label": {
          opacity: 0.7,
          fontSize: "12px",
          marginBottom: "4px"
        }
      },
      children: [
        /* @__PURE__ */ b.jsx(
          jn,
          {
            labelId: "jogging-coord-select",
            labelValue: "Coordinate Sys.",
            value: e.selectedCoordSystemId,
            size: "small",
            variant: "filled",
            displayEmpty: !0,
            onChange: (o) => {
              e.setSelectedCoordSystemId(o.target.value);
            },
            disabled: e.isLocked,
            children: e.coordSystems.map((o) => /* @__PURE__ */ b.jsx(Xt, { value: o.coordinate_system, children: o.name && e.coordSystemCountByName[o.name] > 1 ? `${o.name} / ${o.coordinate_system}` : o.name || o.coordinate_system }, o.coordinate_system))
          }
        ),
        /* @__PURE__ */ b.jsx(
          jn,
          {
            labelId: "jogging-tcp-select",
            labelValue: "TCP",
            value: e.selectedTcpId,
            size: "small",
            variant: "filled",
            onChange: (o) => {
              e.setSelectedTcpId(o.target.value);
            },
            disabled: e.isLocked,
            children: e.tcps.map((o) => /* @__PURE__ */ b.jsx(Xt, { value: o.id, children: o.id }, o.id))
          }
        ),
        /* @__PURE__ */ b.jsx(
          jn,
          {
            labelValue: t("Jogging.Cartesian.Orientation.lb"),
            id: "orientation-select",
            labelId: "orientation-select",
            value: e.selectedOrientation,
            onChange: (o) => {
              e.setSelectedOrientation(o.target.value);
            },
            disabled: e.isLocked,
            children: ky.map((o) => /* @__PURE__ */ b.jsx(Xt, { value: o, children: n(o) }, o))
          }
        ),
        /* @__PURE__ */ b.jsxs(
          jn,
          {
            labelValue: "Increment",
            labelId: "jogging-increment-select",
            size: "small",
            variant: "filled",
            value: ((r = e.activeDiscreteIncrement) == null ? void 0 : r.id) || "continuous",
            onChange: (o) => {
              e.setSelectedIncrementId(o.target.value);
            },
            disabled: e.isLocked,
            children: [
              /* @__PURE__ */ b.jsx(Xt, { value: "continuous", children: t("Jogging.Increment.Continuous.dd") }, "continuous"),
              e.selectedOrientation === "tool" ? null : e.discreteIncrementOptions.map((o) => /* @__PURE__ */ b.jsx(Xt, { value: o.id, children: e.currentMotionType === "translate" ? `${o.mm}mm` : `${o.degrees}°` }, o.id))
            ]
          }
        )
      ]
    }
  );
}), Py = po(ll)(({ theme: e }) => {
  var t;
  return {
    "&.MuiToggleButtonGroup-root": {
      background: (t = e.palette.backgroundPaperElevation) == null ? void 0 : t[8],
      borderRadius: "8px",
      padding: "4px",
      gap: "4px",
      button: {
        border: "none",
        borderRadius: "4px",
        flex: "1 1 0px",
        minWidth: 0,
        "&.MuiToggleButtonGroup-firstButton": {
          borderRadius: "8px 4px 4px 8px"
        },
        "&.MuiToggleButtonGroup-lastButton": {
          borderRadius: "4px 8px 8px 4px"
        }
      }
    }
  };
});
function jy(e, t, n = (r, o) => r === o) {
  return e.length === t.length && e.every((r, o) => n(r, t[o]));
}
const Ny = 2;
function Ut(e, t, n, r, o) {
  return n === 1 ? Math.min(e + t, o) : Math.max(e - t, r);
}
function Na(e, t) {
  return e - t;
}
function ss(e, t) {
  const {
    index: n
  } = e.reduce((r, o, i) => {
    const s = Math.abs(t - o);
    return r === null || s < r.distance || s === r.distance ? {
      distance: s,
      index: i
    } : r;
  }, null) ?? {};
  return n;
}
function _n(e, t) {
  if (t.current !== void 0 && e.changedTouches) {
    const n = e;
    for (let r = 0; r < n.changedTouches.length; r += 1) {
      const o = n.changedTouches[r];
      if (o.identifier === t.current)
        return {
          x: o.clientX,
          y: o.clientY
        };
    }
    return !1;
  }
  return {
    x: e.clientX,
    y: e.clientY
  };
}
function sr(e, t, n) {
  return (e - t) * 100 / (n - t);
}
function _y(e, t, n) {
  return (n - t) * e + t;
}
function Ly(e) {
  if (Math.abs(e) < 1) {
    const n = e.toExponential().split("e-"), r = n[0].split(".")[1];
    return (r ? r.length : 0) + parseInt(n[1], 10);
  }
  const t = e.toString().split(".")[1];
  return t ? t.length : 0;
}
function Iy(e, t, n) {
  const r = Math.round((e - n) / t) * t + n;
  return Number(r.toFixed(Ly(t)));
}
function as({
  values: e,
  newValue: t,
  index: n
}) {
  const r = e.slice();
  return r[n] = t, r.sort(Na);
}
function Ln({
  sliderRef: e,
  activeIndex: t,
  setActive: n
}) {
  var o, i, s;
  const r = Bn(e.current);
  (!((o = e.current) != null && o.contains(r.activeElement)) || Number((i = r == null ? void 0 : r.activeElement) == null ? void 0 : i.getAttribute("data-index")) !== t) && ((s = e.current) == null || s.querySelector(`[type="range"][data-index="${t}"]`).focus()), n && n(t);
}
function In(e, t) {
  return typeof e == "number" && typeof t == "number" ? e === t : typeof e == "object" && typeof t == "object" ? jy(e, t) : !1;
}
const My = {
  horizontal: {
    offset: (e) => ({
      left: `${e}%`
    }),
    leap: (e) => ({
      width: `${e}%`
    })
  },
  "horizontal-reverse": {
    offset: (e) => ({
      right: `${e}%`
    }),
    leap: (e) => ({
      width: `${e}%`
    })
  },
  vertical: {
    offset: (e) => ({
      bottom: `${e}%`
    }),
    leap: (e) => ({
      height: `${e}%`
    })
  }
}, Dy = (e) => e;
let Mn;
function ls() {
  return Mn === void 0 && (typeof CSS < "u" && typeof CSS.supports == "function" ? Mn = CSS.supports("touch-action", "none") : Mn = !0), Mn;
}
function Fy(e) {
  const {
    "aria-labelledby": t,
    defaultValue: n,
    disabled: r = !1,
    disableSwap: o = !1,
    isRtl: i = !1,
    marks: s = !1,
    max: a = 100,
    min: l = 0,
    name: c,
    onChange: u,
    onChangeCommitted: d,
    orientation: p = "horizontal",
    rootRef: S,
    scale: m = Dy,
    step: f = 1,
    shiftStep: x = 10,
    tabIndex: E,
    value: j
  } = e, R = D.useRef(void 0), [C, A] = D.useState(-1), [P, N] = D.useState(-1), [V, G] = D.useState(!1), g = D.useRef(0), k = D.useRef(null), [_, F] = Su({
    controlled: j,
    default: n ?? l,
    name: "Slider"
  }), I = u && ((T, O, $) => {
    const z = T.nativeEvent || T, q = new z.constructor(z.type, z);
    Object.defineProperty(q, "target", {
      writable: !0,
      value: {
        value: O,
        name: c
      }
    }), k.current = O, u(q, O, $);
  }), Y = Array.isArray(_);
  let K = Y ? _.slice().sort(Na) : [_];
  K = K.map((T) => T == null ? l : zt(T, l, a));
  const Se = s === !0 && f !== null ? [...Array(Math.floor((a - l) / f) + 1)].map((T, O) => ({
    value: l + f * O
  })) : s || [], Z = Se.map((T) => T.value), [X, ye] = D.useState(-1), W = D.useRef(null), $e = js(S, W), De = (T) => (O) => {
    var z;
    const $ = Number(O.currentTarget.getAttribute("data-index"));
    Zo(O.target) && ye($), N($), (z = T == null ? void 0 : T.onFocus) == null || z.call(T, O);
  }, Ye = (T) => (O) => {
    var $;
    Zo(O.target) || ye(-1), N(-1), ($ = T == null ? void 0 : T.onBlur) == null || $.call(T, O);
  }, ht = (T, O) => {
    const $ = Number(T.currentTarget.getAttribute("data-index")), z = K[$], q = Z.indexOf(z);
    let B = O;
    if (Se && f == null) {
      const oe = Z[Z.length - 1];
      B >= oe ? B = oe : B <= Z[0] ? B = Z[0] : B = B < z ? Z[q - 1] : Z[q + 1];
    }
    if (B = zt(B, l, a), Y) {
      o && (B = zt(B, K[$ - 1] || -1 / 0, K[$ + 1] || 1 / 0));
      const oe = B;
      B = as({
        values: K,
        newValue: B,
        index: $
      });
      let ce = $;
      o || (ce = B.indexOf(oe)), Ln({
        sliderRef: W,
        activeIndex: ce
      });
    }
    F(B), ye($), I && !In(B, _) && I(T, B, $), d && d(T, k.current ?? B);
  }, Nt = (T) => (O) => {
    var $;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "PageUp", "PageDown", "Home", "End"].includes(O.key)) {
      O.preventDefault();
      const z = Number(O.currentTarget.getAttribute("data-index")), q = K[z];
      let B = null;
      if (f != null) {
        const oe = O.shiftKey ? x : f;
        switch (O.key) {
          case "ArrowUp":
            B = Ut(q, oe, 1, l, a);
            break;
          case "ArrowRight":
            B = Ut(q, oe, i ? -1 : 1, l, a);
            break;
          case "ArrowDown":
            B = Ut(q, oe, -1, l, a);
            break;
          case "ArrowLeft":
            B = Ut(q, oe, i ? 1 : -1, l, a);
            break;
          case "PageUp":
            B = Ut(q, x, 1, l, a);
            break;
          case "PageDown":
            B = Ut(q, x, -1, l, a);
            break;
          case "Home":
            B = l;
            break;
          case "End":
            B = a;
            break;
        }
      } else if (Se) {
        const oe = Z[Z.length - 1], ce = Z.indexOf(q), Q = [i ? "ArrowRight" : "ArrowLeft", "ArrowDown", "PageDown", "Home"], be = [i ? "ArrowLeft" : "ArrowRight", "ArrowUp", "PageUp", "End"];
        Q.includes(O.key) ? ce === 0 ? B = Z[0] : B = Z[ce - 1] : be.includes(O.key) && (ce === Z.length - 1 ? B = oe : B = Z[ce + 1]);
      }
      B != null && ht(O, B);
    }
    ($ = T == null ? void 0 : T.onKeyDown) == null || $.call(T, O);
  };
  $s(() => {
    var T;
    r && W.current.contains(document.activeElement) && ((T = document.activeElement) == null || T.blur());
  }, [r]), r && C !== -1 && A(-1), r && X !== -1 && ye(-1);
  const mt = (T) => (O) => {
    var $;
    ($ = T.onChange) == null || $.call(T, O), ht(O, O.target.valueAsNumber);
  }, Fe = D.useRef(void 0);
  let Be = p;
  i && p === "horizontal" && (Be += "-reverse");
  const Ve = ({
    finger: T,
    move: O = !1
  }) => {
    const {
      current: $
    } = W, {
      width: z,
      height: q,
      bottom: B,
      left: oe
    } = $.getBoundingClientRect();
    let ce;
    Be.startsWith("vertical") ? ce = (B - T.y) / q : ce = (T.x - oe) / z, Be.includes("-reverse") && (ce = 1 - ce);
    let Q;
    if (Q = _y(ce, l, a), f)
      Q = Iy(Q, f, l);
    else {
      const Ce = ss(Z, Q);
      Q = Z[Ce];
    }
    Q = zt(Q, l, a);
    let be = 0;
    if (Y) {
      O ? be = Fe.current : be = ss(K, Q), o && (Q = zt(Q, K[be - 1] || -1 / 0, K[be + 1] || 1 / 0));
      const Ce = Q;
      Q = as({
        values: K,
        newValue: Q,
        index: be
      }), o && O || (be = Q.indexOf(Ce), Fe.current = be);
    }
    return {
      newValue: Q,
      activeIndex: be
    };
  }, Ue = Dr((T) => {
    const O = _n(T, R);
    if (!O)
      return;
    if (g.current += 1, T.type === "mousemove" && T.buttons === 0) {
      Oe(T);
      return;
    }
    const {
      newValue: $,
      activeIndex: z
    } = Ve({
      finger: O,
      move: !0
    });
    Ln({
      sliderRef: W,
      activeIndex: z,
      setActive: A
    }), F($), !V && g.current > Ny && G(!0), I && !In($, _) && I(T, $, z);
  }), Oe = Dr((T) => {
    const O = _n(T, R);
    if (G(!1), !O)
      return;
    const {
      newValue: $
    } = Ve({
      finger: O,
      move: !0
    });
    A(-1), T.type === "touchend" && N(-1), d && d(T, k.current ?? $), R.current = void 0, _e();
  }), he = Dr((T) => {
    if (r)
      return;
    ls() || T.preventDefault();
    const O = T.changedTouches[0];
    O != null && (R.current = O.identifier);
    const $ = _n(T, R);
    if ($ !== !1) {
      const {
        newValue: q,
        activeIndex: B
      } = Ve({
        finger: $
      });
      Ln({
        sliderRef: W,
        activeIndex: B,
        setActive: A
      }), F(q), I && !In(q, _) && I(T, q, B);
    }
    g.current = 0;
    const z = Bn(W.current);
    z.addEventListener("touchmove", Ue, {
      passive: !0
    }), z.addEventListener("touchend", Oe, {
      passive: !0
    });
  }), _e = D.useCallback(() => {
    const T = Bn(W.current);
    T.removeEventListener("mousemove", Ue), T.removeEventListener("mouseup", Oe), T.removeEventListener("touchmove", Ue), T.removeEventListener("touchend", Oe);
  }, [Oe, Ue]);
  D.useEffect(() => {
    const {
      current: T
    } = W;
    return T.addEventListener("touchstart", he, {
      passive: ls()
    }), () => {
      T.removeEventListener("touchstart", he), _e();
    };
  }, [_e, he]), D.useEffect(() => {
    r && _e();
  }, [r, _e]);
  const yt = (T) => (O) => {
    var q;
    if ((q = T.onMouseDown) == null || q.call(T, O), r || O.defaultPrevented || O.button !== 0)
      return;
    O.preventDefault();
    const $ = _n(O, R);
    if ($ !== !1) {
      const {
        newValue: B,
        activeIndex: oe
      } = Ve({
        finger: $
      });
      Ln({
        sliderRef: W,
        activeIndex: oe,
        setActive: A
      }), F(B), I && !In(B, _) && I(O, B, oe);
    }
    g.current = 0;
    const z = Bn(W.current);
    z.addEventListener("mousemove", Ue, {
      passive: !0
    }), z.addEventListener("mouseup", Oe);
  }, _t = sr(Y ? K[0] : l, l, a), me = sr(K[K.length - 1], l, a) - _t, it = (T = {}) => {
    const O = Vn(T), $ = {
      onMouseDown: yt(O || {})
    }, z = {
      ...O,
      ...$
    };
    return {
      ...T,
      ref: $e,
      ...z
    };
  }, bt = (T) => (O) => {
    var z;
    (z = T.onMouseOver) == null || z.call(T, O);
    const $ = Number(O.currentTarget.getAttribute("data-index"));
    N($);
  }, xt = (T) => (O) => {
    var $;
    ($ = T.onMouseLeave) == null || $.call(T, O), N(-1);
  }, y = (T = {}) => {
    const O = Vn(T), $ = {
      onMouseOver: bt(O || {}),
      onMouseLeave: xt(O || {})
    };
    return {
      ...T,
      ...O,
      ...$
    };
  }, M = (T) => ({
    // So the non active thumb doesn't show its label on hover.
    pointerEvents: C !== -1 && C !== T ? "none" : void 0
  });
  let L;
  return p === "vertical" && (L = i ? "vertical-rl" : "vertical-lr"), {
    active: C,
    axis: Be,
    axisProps: My,
    dragging: V,
    focusedThumbIndex: X,
    getHiddenInputProps: (T = {}) => {
      const O = Vn(T), $ = {
        onChange: mt(O || {}),
        onFocus: De(O || {}),
        onBlur: Ye(O || {}),
        onKeyDown: Nt(O || {})
      }, z = {
        ...O,
        ...$
      };
      return {
        tabIndex: E,
        "aria-labelledby": t,
        "aria-orientation": p,
        "aria-valuemax": m(a),
        "aria-valuemin": m(l),
        name: c,
        type: "range",
        min: e.min,
        max: e.max,
        step: e.step === null && e.marks ? "any" : e.step ?? void 0,
        disabled: r,
        ...T,
        ...z,
        style: {
          ...vu,
          direction: i ? "rtl" : "ltr",
          // So that VoiceOver's focus indicator matches the thumb's dimensions
          width: "100%",
          height: "100%",
          writingMode: L
        }
      };
    },
    getRootProps: it,
    getThumbProps: y,
    marks: Se,
    open: P,
    range: Y,
    rootRef: $e,
    trackLeap: me,
    trackOffset: _t,
    values: K,
    getThumbStyle: M
  };
}
function Gn(e) {
  return typeof e == "string";
}
const By = (e) => !e || !Gn(e);
function Vy(e) {
  return typeof e.main == "string";
}
function Uy(e, t = []) {
  if (!Vy(e))
    return !1;
  for (const n of t)
    if (!e.hasOwnProperty(n) || typeof e[n] != "string")
      return !1;
  return !0;
}
function $o(e = []) {
  return ([, t]) => t && Uy(t, e);
}
function zy(e) {
  return Sn("MuiSlider", e);
}
const je = Ts("MuiSlider", ["root", "active", "colorPrimary", "colorSecondary", "colorError", "colorInfo", "colorSuccess", "colorWarning", "disabled", "dragging", "focusVisible", "mark", "markActive", "marked", "markLabel", "markLabelActive", "rail", "sizeSmall", "thumb", "thumbColorPrimary", "thumbColorSecondary", "thumbColorError", "thumbColorSuccess", "thumbColorInfo", "thumbColorWarning", "track", "trackInverted", "trackFalse", "thumbSizeSmall", "valueLabel", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel", "vertical"]), Jy = (e) => {
  const {
    open: t
  } = e;
  return {
    offset: He(t && je.valueLabelOpen),
    circle: je.valueLabelCircle,
    label: je.valueLabelLabel
  };
};
function _a(e) {
  const {
    children: t,
    className: n,
    value: r
  } = e, o = Jy(e);
  return t ? /* @__PURE__ */ D.cloneElement(t, {
    className: He(t.props.className)
  }, /* @__PURE__ */ b.jsxs(D.Fragment, {
    children: [t.props.children, /* @__PURE__ */ b.jsx("span", {
      className: He(o.offset, n),
      "aria-hidden": !0,
      children: /* @__PURE__ */ b.jsx("span", {
        className: o.circle,
        children: /* @__PURE__ */ b.jsx("span", {
          className: o.label,
          children: r
        })
      })
    })]
  })) : null;
}
process.env.NODE_ENV !== "production" && (_a.propTypes = {
  children: h.element.isRequired,
  className: h.string,
  value: h.node
});
function cs(e) {
  return e;
}
const Gy = nt("span", {
  name: "MuiSlider",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[`color${Te(n.color)}`], n.size !== "medium" && t[`size${Te(n.size)}`], n.marked && t.marked, n.orientation === "vertical" && t.vertical, n.track === "inverted" && t.trackInverted, n.track === !1 && t.trackFalse];
  }
})(kt(({
  theme: e
}) => ({
  borderRadius: 12,
  boxSizing: "content-box",
  display: "inline-block",
  position: "relative",
  cursor: "pointer",
  touchAction: "none",
  WebkitTapHighlightColor: "transparent",
  "@media print": {
    colorAdjust: "exact"
  },
  [`&.${je.disabled}`]: {
    pointerEvents: "none",
    cursor: "default",
    color: (e.vars || e).palette.grey[400]
  },
  [`&.${je.dragging}`]: {
    [`& .${je.thumb}, & .${je.track}`]: {
      transition: "none"
    }
  },
  variants: [...Object.entries(e.palette).filter($o()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      color: (e.vars || e).palette[t].main
    }
  })), {
    props: {
      orientation: "horizontal"
    },
    style: {
      height: 4,
      width: "100%",
      padding: "13px 0",
      // The primary input mechanism of the device includes a pointing device of limited accuracy.
      "@media (pointer: coarse)": {
        // Reach 42px touch target, about ~8mm on screen.
        padding: "20px 0"
      }
    }
  }, {
    props: {
      orientation: "horizontal",
      size: "small"
    },
    style: {
      height: 2
    }
  }, {
    props: {
      orientation: "horizontal",
      marked: !0
    },
    style: {
      marginBottom: 20
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      height: "100%",
      width: 4,
      padding: "0 13px",
      // The primary input mechanism of the device includes a pointing device of limited accuracy.
      "@media (pointer: coarse)": {
        // Reach 42px touch target, about ~8mm on screen.
        padding: "0 20px"
      }
    }
  }, {
    props: {
      orientation: "vertical",
      size: "small"
    },
    style: {
      width: 2
    }
  }, {
    props: {
      orientation: "vertical",
      marked: !0
    },
    style: {
      marginRight: 44
    }
  }]
}))), Wy = nt("span", {
  name: "MuiSlider",
  slot: "Rail",
  overridesResolver: (e, t) => t.rail
})({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  backgroundColor: "currentColor",
  opacity: 0.38,
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      width: "100%",
      height: "inherit",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      height: "100%",
      width: "inherit",
      left: "50%",
      transform: "translateX(-50%)"
    }
  }, {
    props: {
      track: "inverted"
    },
    style: {
      opacity: 1
    }
  }]
}), Hy = nt("span", {
  name: "MuiSlider",
  slot: "Track",
  overridesResolver: (e, t) => t.track
})(kt(({
  theme: e
}) => ({
  display: "block",
  position: "absolute",
  borderRadius: "inherit",
  border: "1px solid currentColor",
  backgroundColor: "currentColor",
  transition: e.transitions.create(["left", "width", "bottom", "height"], {
    duration: e.transitions.duration.shortest
  }),
  variants: [{
    props: {
      size: "small"
    },
    style: {
      border: "none"
    }
  }, {
    props: {
      orientation: "horizontal"
    },
    style: {
      height: "inherit",
      top: "50%",
      transform: "translateY(-50%)"
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      width: "inherit",
      left: "50%",
      transform: "translateX(-50%)"
    }
  }, {
    props: {
      track: !1
    },
    style: {
      display: "none"
    }
  }, ...Object.entries(e.palette).filter($o()).map(([t]) => ({
    props: {
      color: t,
      track: "inverted"
    },
    style: {
      ...e.vars ? {
        backgroundColor: e.vars.palette.Slider[`${t}Track`],
        borderColor: e.vars.palette.Slider[`${t}Track`]
      } : {
        backgroundColor: fn(e.palette[t].main, 0.62),
        borderColor: fn(e.palette[t].main, 0.62),
        ...e.applyStyles("dark", {
          backgroundColor: un(e.palette[t].main, 0.5)
        }),
        ...e.applyStyles("dark", {
          borderColor: un(e.palette[t].main, 0.5)
        })
      }
    }
  }))]
}))), Ky = nt("span", {
  name: "MuiSlider",
  slot: "Thumb",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.thumb, t[`thumbColor${Te(n.color)}`], n.size !== "medium" && t[`thumbSize${Te(n.size)}`]];
  }
})(kt(({
  theme: e
}) => ({
  position: "absolute",
  width: 20,
  height: 20,
  boxSizing: "border-box",
  borderRadius: "50%",
  outline: 0,
  backgroundColor: "currentColor",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: e.transitions.create(["box-shadow", "left", "bottom"], {
    duration: e.transitions.duration.shortest
  }),
  "&::before": {
    position: "absolute",
    content: '""',
    borderRadius: "inherit",
    width: "100%",
    height: "100%",
    boxShadow: (e.vars || e).shadows[2]
  },
  "&::after": {
    position: "absolute",
    content: '""',
    borderRadius: "50%",
    // 42px is the hit target
    width: 42,
    height: 42,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  [`&.${je.disabled}`]: {
    "&:hover": {
      boxShadow: "none"
    }
  },
  variants: [{
    props: {
      size: "small"
    },
    style: {
      width: 12,
      height: 12,
      "&::before": {
        boxShadow: "none"
      }
    }
  }, {
    props: {
      orientation: "horizontal"
    },
    style: {
      top: "50%",
      transform: "translate(-50%, -50%)"
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      left: "50%",
      transform: "translate(-50%, 50%)"
    }
  }, ...Object.entries(e.palette).filter($o()).map(([t]) => ({
    props: {
      color: t
    },
    style: {
      [`&:hover, &.${je.focusVisible}`]: {
        ...e.vars ? {
          boxShadow: `0px 0px 0px 8px rgba(${e.vars.palette[t].mainChannel} / 0.16)`
        } : {
          boxShadow: `0px 0px 0px 8px ${Xr(e.palette[t].main, 0.16)}`
        },
        "@media (hover: none)": {
          boxShadow: "none"
        }
      },
      [`&.${je.active}`]: {
        ...e.vars ? {
          boxShadow: `0px 0px 0px 14px rgba(${e.vars.palette[t].mainChannel} / 0.16)`
        } : {
          boxShadow: `0px 0px 0px 14px ${Xr(e.palette[t].main, 0.16)}`
        }
      }
    }
  }))]
}))), La = nt(_a, {
  name: "MuiSlider",
  slot: "ValueLabel",
  overridesResolver: (e, t) => t.valueLabel
})(kt(({
  theme: e
}) => ({
  zIndex: 1,
  whiteSpace: "nowrap",
  ...e.typography.body2,
  fontWeight: 500,
  transition: e.transitions.create(["transform"], {
    duration: e.transitions.duration.shortest
  }),
  position: "absolute",
  backgroundColor: (e.vars || e).palette.grey[600],
  borderRadius: 2,
  color: (e.vars || e).palette.common.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0.25rem 0.75rem",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      transform: "translateY(-100%) scale(0)",
      top: "-10px",
      transformOrigin: "bottom center",
      "&::before": {
        position: "absolute",
        content: '""',
        width: 8,
        height: 8,
        transform: "translate(-50%, 50%) rotate(45deg)",
        backgroundColor: "inherit",
        bottom: 0,
        left: "50%"
      },
      [`&.${je.valueLabelOpen}`]: {
        transform: "translateY(-100%) scale(1)"
      }
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      transform: "translateY(-50%) scale(0)",
      right: "30px",
      top: "50%",
      transformOrigin: "right center",
      "&::before": {
        position: "absolute",
        content: '""',
        width: 8,
        height: 8,
        transform: "translate(-50%, -50%) rotate(45deg)",
        backgroundColor: "inherit",
        right: -8,
        top: "50%"
      },
      [`&.${je.valueLabelOpen}`]: {
        transform: "translateY(-50%) scale(1)"
      }
    }
  }, {
    props: {
      size: "small"
    },
    style: {
      fontSize: e.typography.pxToRem(12),
      padding: "0.25rem 0.5rem"
    }
  }, {
    props: {
      orientation: "vertical",
      size: "small"
    },
    style: {
      right: "20px"
    }
  }]
})));
process.env.NODE_ENV !== "production" && (La.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: h.element.isRequired,
  /**
   * @ignore
   */
  index: h.number.isRequired,
  /**
   * @ignore
   */
  open: h.bool.isRequired,
  /**
   * @ignore
   */
  value: h.node
});
const qy = nt("span", {
  name: "MuiSlider",
  slot: "Mark",
  shouldForwardProp: (e) => xo(e) && e !== "markActive",
  overridesResolver: (e, t) => {
    const {
      markActive: n
    } = e;
    return [t.mark, n && t.markActive];
  }
})(kt(({
  theme: e
}) => ({
  position: "absolute",
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: "currentColor",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      top: "50%",
      transform: "translate(-1px, -50%)"
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      left: "50%",
      transform: "translate(-50%, 1px)"
    }
  }, {
    props: {
      markActive: !0
    },
    style: {
      backgroundColor: (e.vars || e).palette.background.paper,
      opacity: 0.8
    }
  }]
}))), Yy = nt("span", {
  name: "MuiSlider",
  slot: "MarkLabel",
  shouldForwardProp: (e) => xo(e) && e !== "markLabelActive",
  overridesResolver: (e, t) => t.markLabel
})(kt(({
  theme: e
}) => ({
  ...e.typography.body2,
  color: (e.vars || e).palette.text.secondary,
  position: "absolute",
  whiteSpace: "nowrap",
  variants: [{
    props: {
      orientation: "horizontal"
    },
    style: {
      top: 30,
      transform: "translateX(-50%)",
      "@media (pointer: coarse)": {
        top: 40
      }
    }
  }, {
    props: {
      orientation: "vertical"
    },
    style: {
      left: 36,
      transform: "translateY(50%)",
      "@media (pointer: coarse)": {
        left: 44
      }
    }
  }, {
    props: {
      markLabelActive: !0
    },
    style: {
      color: (e.vars || e).palette.text.primary
    }
  }]
}))), Xy = (e) => {
  const {
    disabled: t,
    dragging: n,
    marked: r,
    orientation: o,
    track: i,
    classes: s,
    color: a,
    size: l
  } = e, c = {
    root: ["root", t && "disabled", n && "dragging", r && "marked", o === "vertical" && "vertical", i === "inverted" && "trackInverted", i === !1 && "trackFalse", a && `color${Te(a)}`, l && `size${Te(l)}`],
    rail: ["rail"],
    track: ["track"],
    mark: ["mark"],
    markActive: ["markActive"],
    markLabel: ["markLabel"],
    markLabelActive: ["markLabelActive"],
    valueLabel: ["valueLabel"],
    thumb: ["thumb", t && "disabled", l && `thumbSize${Te(l)}`, a && `thumbColor${Te(a)}`],
    active: ["active"],
    disabled: ["disabled"],
    focusVisible: ["focusVisible"]
  };
  return yo(c, zy, s);
}, Zy = ({
  children: e
}) => e, Ia = /* @__PURE__ */ D.forwardRef(function(t, n) {
  const r = So({
    props: t,
    name: "MuiSlider"
  }), o = Ru(), {
    "aria-label": i,
    "aria-valuetext": s,
    "aria-labelledby": a,
    // eslint-disable-next-line react/prop-types
    component: l = "span",
    components: c = {},
    componentsProps: u = {},
    color: d = "primary",
    classes: p,
    className: S,
    disableSwap: m = !1,
    disabled: f = !1,
    getAriaLabel: x,
    getAriaValueText: E,
    marks: j = !1,
    max: R = 100,
    min: C = 0,
    name: A,
    onChange: P,
    onChangeCommitted: N,
    orientation: V = "horizontal",
    shiftStep: G = 10,
    size: g = "medium",
    step: k = 1,
    scale: _ = cs,
    slotProps: F,
    slots: I,
    tabIndex: Y,
    track: K = "normal",
    value: Se,
    valueLabelDisplay: Z = "off",
    valueLabelFormat: X = cs,
    ...ye
  } = r, W = {
    ...r,
    isRtl: o,
    max: R,
    min: C,
    classes: p,
    disabled: f,
    disableSwap: m,
    orientation: V,
    marks: j,
    color: d,
    size: g,
    step: k,
    shiftStep: G,
    scale: _,
    track: K,
    valueLabelDisplay: Z,
    valueLabelFormat: X
  }, {
    axisProps: $e,
    getRootProps: De,
    getHiddenInputProps: Ye,
    getThumbProps: ht,
    open: Nt,
    active: mt,
    axis: Fe,
    focusedThumbIndex: Be,
    range: Ve,
    dragging: Ue,
    marks: Oe,
    values: he,
    trackOffset: _e,
    trackLeap: yt,
    getThumbStyle: _t
  } = Fy({
    ...W,
    rootRef: n
  });
  W.marked = Oe.length > 0 && Oe.some((fe) => fe.label), W.dragging = Ue, W.focusedThumbIndex = Be;
  const me = Xy(W), it = (I == null ? void 0 : I.root) ?? c.Root ?? Gy, bt = (I == null ? void 0 : I.rail) ?? c.Rail ?? Wy, xt = (I == null ? void 0 : I.track) ?? c.Track ?? Hy, y = (I == null ? void 0 : I.thumb) ?? c.Thumb ?? Ky, M = (I == null ? void 0 : I.valueLabel) ?? c.ValueLabel ?? La, L = (I == null ? void 0 : I.mark) ?? c.Mark ?? qy, H = (I == null ? void 0 : I.markLabel) ?? c.MarkLabel ?? Yy, T = (I == null ? void 0 : I.input) ?? c.Input ?? "input", O = (F == null ? void 0 : F.root) ?? u.root, $ = (F == null ? void 0 : F.rail) ?? u.rail, z = (F == null ? void 0 : F.track) ?? u.track, q = (F == null ? void 0 : F.thumb) ?? u.thumb, B = (F == null ? void 0 : F.valueLabel) ?? u.valueLabel, oe = (F == null ? void 0 : F.mark) ?? u.mark, ce = (F == null ? void 0 : F.markLabel) ?? u.markLabel, Q = (F == null ? void 0 : F.input) ?? u.input, be = st({
    elementType: it,
    getSlotProps: De,
    externalSlotProps: O,
    externalForwardedProps: ye,
    additionalProps: {
      ...By(it) && {
        as: l
      }
    },
    ownerState: {
      ...W,
      ...O == null ? void 0 : O.ownerState
    },
    className: [me.root, S]
  }), Ce = st({
    elementType: bt,
    externalSlotProps: $,
    ownerState: W,
    className: me.rail
  }), Ga = st({
    elementType: xt,
    externalSlotProps: z,
    additionalProps: {
      style: {
        ...$e[Fe].offset(_e),
        ...$e[Fe].leap(yt)
      }
    },
    ownerState: {
      ...W,
      ...z == null ? void 0 : z.ownerState
    },
    className: me.track
  }), Pr = st({
    elementType: y,
    getSlotProps: ht,
    externalSlotProps: q,
    ownerState: {
      ...W,
      ...q == null ? void 0 : q.ownerState
    },
    className: me.thumb
  }), Wa = st({
    elementType: M,
    externalSlotProps: B,
    ownerState: {
      ...W,
      ...B == null ? void 0 : B.ownerState
    },
    className: me.valueLabel
  }), jr = st({
    elementType: L,
    externalSlotProps: oe,
    ownerState: W,
    className: me.mark
  }), Nr = st({
    elementType: H,
    externalSlotProps: ce,
    ownerState: W,
    className: me.markLabel
  }), Ha = st({
    elementType: T,
    getSlotProps: Ye,
    externalSlotProps: Q,
    ownerState: W
  });
  return /* @__PURE__ */ b.jsxs(it, {
    ...be,
    children: [/* @__PURE__ */ b.jsx(bt, {
      ...Ce
    }), /* @__PURE__ */ b.jsx(xt, {
      ...Ga
    }), Oe.filter((fe) => fe.value >= C && fe.value <= R).map((fe, xe) => {
      const _r = sr(fe.value, C, R), En = $e[Fe].offset(_r);
      let Xe;
      return K === !1 ? Xe = he.includes(fe.value) : Xe = K === "normal" && (Ve ? fe.value >= he[0] && fe.value <= he[he.length - 1] : fe.value <= he[0]) || K === "inverted" && (Ve ? fe.value <= he[0] || fe.value >= he[he.length - 1] : fe.value >= he[0]), /* @__PURE__ */ b.jsxs(D.Fragment, {
        children: [/* @__PURE__ */ b.jsx(L, {
          "data-index": xe,
          ...jr,
          ...!Gn(L) && {
            markActive: Xe
          },
          style: {
            ...En,
            ...jr.style
          },
          className: He(jr.className, Xe && me.markActive)
        }), fe.label != null ? /* @__PURE__ */ b.jsx(H, {
          "aria-hidden": !0,
          "data-index": xe,
          ...Nr,
          ...!Gn(H) && {
            markLabelActive: Xe
          },
          style: {
            ...En,
            ...Nr.style
          },
          className: He(me.markLabel, Nr.className, Xe && me.markLabelActive),
          children: fe.label
        }) : null]
      }, xe);
    }), he.map((fe, xe) => {
      const _r = sr(fe, C, R), En = $e[Fe].offset(_r), Xe = Z === "off" ? Zy : M;
      return (
        /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
        /* @__PURE__ */ b.jsx(Xe, {
          ...!Gn(Xe) && {
            valueLabelFormat: X,
            valueLabelDisplay: Z,
            value: typeof X == "function" ? X(_(fe), xe) : X,
            index: xe,
            open: Nt === xe || mt === xe || Z === "on",
            disabled: f
          },
          ...Wa,
          children: /* @__PURE__ */ b.jsx(y, {
            "data-index": xe,
            ...Pr,
            className: He(me.thumb, Pr.className, mt === xe && me.active, Be === xe && me.focusVisible),
            style: {
              ...En,
              ..._t(xe),
              ...Pr.style
            },
            children: /* @__PURE__ */ b.jsx(T, {
              "data-index": xe,
              "aria-label": x ? x(xe) : i,
              "aria-valuenow": _(fe),
              "aria-labelledby": a,
              "aria-valuetext": E ? E(_(fe), xe) : s,
              value: he[xe],
              ...Ha
            })
          })
        }, xe)
      );
    })]
  });
});
process.env.NODE_ENV !== "production" && (Ia.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The label of the slider.
   */
  "aria-label": Xo(h.string, (e) => Array.isArray(e.value || e.defaultValue) && e["aria-label"] != null ? new Error("MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.") : null),
  /**
   * The id of the element containing a label for the slider.
   */
  "aria-labelledby": h.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  "aria-valuetext": Xo(h.string, (e) => Array.isArray(e.value || e.defaultValue) && e["aria-valuetext"] != null ? new Error("MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.") : null),
  /**
   * @ignore
   */
  children: h.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: h.object,
  /**
   * @ignore
   */
  className: h.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: h.oneOfType([h.oneOf(["primary", "secondary", "error", "info", "success", "warning"]), h.string]),
  /**
   * The components used for each slot inside.
   *
   * @deprecated use the `slots` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  components: h.shape({
    Input: h.elementType,
    Mark: h.elementType,
    MarkLabel: h.elementType,
    Rail: h.elementType,
    Root: h.elementType,
    Thumb: h.elementType,
    Track: h.elementType,
    ValueLabel: h.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @deprecated use the `slotProps` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   *
   * @default {}
   */
  componentsProps: h.shape({
    input: h.oneOfType([h.func, h.object]),
    mark: h.oneOfType([h.func, h.object]),
    markLabel: h.oneOfType([h.func, h.object]),
    rail: h.oneOfType([h.func, h.object]),
    root: h.oneOfType([h.func, h.object]),
    thumb: h.oneOfType([h.func, h.object]),
    track: h.oneOfType([h.func, h.object]),
    valueLabel: h.oneOfType([h.func, h.shape({
      children: h.element,
      className: h.string,
      open: h.bool,
      style: h.object,
      value: h.node,
      valueLabelDisplay: h.oneOf(["auto", "off", "on"])
    })])
  }),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: h.oneOfType([h.arrayOf(h.number), h.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: h.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: h.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: h.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: h.func,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: h.oneOfType([h.arrayOf(h.shape({
    label: h.node,
    value: h.number.isRequired
  })), h.bool]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: h.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: h.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: h.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: h.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: h.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: h.oneOf(["horizontal", "vertical"]),
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale: h.func,
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep: h.number,
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size: h.oneOfType([h.oneOf(["small", "medium"]), h.string]),
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  slotProps: h.shape({
    input: h.oneOfType([h.func, h.object]),
    mark: h.oneOfType([h.func, h.object]),
    markLabel: h.oneOfType([h.func, h.object]),
    rail: h.oneOfType([h.func, h.object]),
    root: h.oneOfType([h.func, h.object]),
    thumb: h.oneOfType([h.func, h.object]),
    track: h.oneOfType([h.func, h.object]),
    valueLabel: h.oneOfType([h.func, h.shape({
      children: h.element,
      className: h.string,
      open: h.bool,
      style: h.object,
      value: h.node,
      valueLabelDisplay: h.oneOf(["auto", "off", "on"])
    })])
  }),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: h.shape({
    input: h.elementType,
    mark: h.elementType,
    markLabel: h.elementType,
    rail: h.elementType,
    root: h.elementType,
    thumb: h.elementType,
    track: h.elementType,
    valueLabel: h.elementType
  }),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: h.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: h.oneOfType([h.arrayOf(h.oneOfType([h.func, h.object, h.bool])), h.func, h.object]),
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: h.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: h.oneOf(["inverted", "normal", !1]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: h.oneOfType([h.arrayOf(h.number), h.number]),
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: h.oneOf(["auto", "off", "on"]),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat: h.oneOfType([h.func, h.string])
});
var Qy = "[object Number]";
function eb(e) {
  return typeof e == "number" || Et(e) && $t(e) == Qy;
}
const tb = Ie((e) => {
  tt();
  function t(n, r) {
    r === e.velocity || !eb(r) || e.onVelocityChange(r);
  }
  return /* @__PURE__ */ b.jsxs(ge, { direction: "row", gap: 2, children: [
    /* @__PURE__ */ b.jsx(
      Ia,
      {
        value: e.velocity,
        color: "secondary",
        onChange: t,
        min: e.min,
        max: e.max,
        "aria-labelledby": "input-slider",
        disabled: e.disabled,
        sx: {
          "& .MuiSlider-valueLabelOpen": {
            zIndex: 100,
            backgroundColor: "transparent",
            top: "0px"
          }
        }
      }
    ),
    e.renderValue ? e.renderValue(e.velocity) : /* @__PURE__ */ b.jsx(Ma, { value: e.velocity.toString() })
  ] });
});
function Ma({ value: e, sx: t }) {
  var r;
  const n = tt();
  return /* @__PURE__ */ b.jsx(
    ge,
    {
      direction: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "5px",
      sx: {
        padding: "6px 12px",
        background: (r = n.palette.backgroundPaperElevation) == null ? void 0 : r[8],
        borderRadius: "10px",
        minWidth: "111px",
        ...t
      },
      children: /* @__PURE__ */ b.jsx(
        et,
        {
          component: "span",
          sx: {
            textAlign: "right",
            fontSize: "14px",
            opacity: 0.8,
            color: n.palette.text.primary,
            whiteSpace: "nowrap"
          },
          children: e
        }
      )
    }
  );
}
const Da = Ie(
  ({ store: e }) => {
    const { t } = yn(), n = go(() => ({
      get valueLabelFormat() {
        return e.currentMotionType === "translate" ? (r) => `v = ${t("Jogging.Cartesian.Translation.velocityMmPerSec.lb", { amount: r })}` : (r) => `ω = ${t("Jogging.Cartesian.Rotation.velocityDegPerSec.lb", { amount: r })}`;
      }
    }));
    return /* @__PURE__ */ b.jsx(
      tb,
      {
        velocity: e.velocityInDisplayUnits,
        min: e.minVelocityInDisplayUnits,
        max: e.maxVelocityInDisplayUnits,
        onVelocityChange: e.setVelocityFromSlider,
        disabled: e.isLocked,
        renderValue: (r) => /* @__PURE__ */ b.jsx(
          Ma,
          {
            value: n.valueLabelFormat(r),
            sx: {
              minWidth: "111px",
              span: {
                transform: "translateY(-1.5px)"
              }
            }
          }
        )
      }
    );
  }
), nb = Ie(
  ({
    store: e,
    children: t
  }) => {
    var d, p, S, m, f, x, E, j, R;
    const { t: n } = yn(), r = tt();
    function o(C, A) {
      (A === "translate" || A === "rotate") && e.setSelectedCartesianMotionType(A);
    }
    Zf(
      () => [e.selectedCoordSystemId, e.selectedTcpId],
      () => {
        e.jogger.motionStream.motionStateSocket.changeUrl(
          e.jogger.nova.makeWebsocketURL(
            `/motion-groups/${e.jogger.motionGroupId}/state-stream?tcp=${e.selectedTcpId}&response_coordinate_system=${e.selectedCoordSystemId}`
          )
        );
      },
      { fireImmediately: !0 }
    );
    async function i(C, A) {
      const P = await e.activate(), N = P.motionStream.rapidlyChangingMotionState.tcp_pose, V = P.motionStream.rapidlyChangingMotionState.state.joint_position;
      N && await e.withMotionLock(async () => {
        try {
          e.setCurrentIncrementJog({
            axis: C.axis,
            direction: C.direction
          }), await e.jogger.runIncrementalCartesianMotion({
            currentTcpPose: N,
            currentJoints: V,
            coordSystemId: e.activeCoordSystemId,
            velocityInRelevantUnits: e.selectedCartesianMotionType === "translate" ? e.translationVelocityMmPerSec : e.rotationVelocityRadsPerSec,
            axis: C.axis,
            direction: C.direction,
            motion: e.selectedCartesianMotionType === "translate" ? {
              type: "translate",
              distanceMm: A.mm
            } : {
              type: "rotate",
              distanceRads: Ol(A.degrees)
            }
          });
        } finally {
          e.setCurrentIncrementJog(null), await e.deactivate();
        }
      });
    }
    async function s(C) {
      if (!e.isLocked) {
        if (await e.activate(), e.activeDiscreteIncrement)
          return i(C, e.activeDiscreteIncrement);
        C.motionType === "translate" ? await e.jogger.startTCPTranslation({
          axis: C.axis,
          direction: C.direction,
          velocityMmPerSec: e.translationVelocityMmPerSec
        }) : await e.jogger.startTCPRotation({
          axis: C.axis,
          direction: C.direction,
          velocityRadsPerSec: e.rotationVelocityRadsPerSec
        });
      }
    }
    async function a() {
      e.isLocked || e.activeDiscreteIncrement || await e.deactivate();
    }
    const l = [
      {
        id: "x",
        colors: (S = (p = (d = r.componentsExt) == null ? void 0 : d.JoggingCartesian) == null ? void 0 : p.Axis) == null ? void 0 : S.X,
        icon: /* @__PURE__ */ b.jsx(lg, {})
      },
      {
        id: "y",
        colors: (x = (f = (m = r.componentsExt) == null ? void 0 : m.JoggingCartesian) == null ? void 0 : f.Axis) == null ? void 0 : x.Y,
        icon: /* @__PURE__ */ b.jsx(ug, {})
      },
      {
        id: "z",
        colors: (R = (j = (E = r.componentsExt) == null ? void 0 : E.JoggingCartesian) == null ? void 0 : j.Axis) == null ? void 0 : R.Z,
        icon: /* @__PURE__ */ b.jsx(dg, {})
      }
    ];
    function c(C) {
      return n("General.mm.variable", { amount: C.toFixed(1) });
    }
    function u(C) {
      return n("General.degree.variable", {
        amount: Dn(C).toFixed(1)
      });
    }
    return /* @__PURE__ */ b.jsxs(ge, { flexGrow: 1, gap: 2, sx: { padding: "18px 24px" }, children: [
      /* @__PURE__ */ b.jsxs(ge, { gap: 2, children: [
        /* @__PURE__ */ b.jsx($y, { store: e }),
        /* @__PURE__ */ b.jsx(Da, { store: e }),
        /* @__PURE__ */ b.jsx(Hn, {})
      ] }),
      /* @__PURE__ */ b.jsx(
        ge,
        {
          marginLeft: "auto",
          marginRight: "auto",
          gap: "24px",
          justifyContent: "center",
          sx: { flexGrow: "1" },
          children: /* @__PURE__ */ b.jsxs(
            ge,
            {
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              sx: { flexGrow: 1 },
              children: [
                /* @__PURE__ */ b.jsxs(
                  Py,
                  {
                    value: e.selectedCartesianMotionType,
                    onChange: o,
                    exclusive: !0,
                    "aria-label": n("Jogging.Cartesian.MotionType.lb"),
                    sx: { justifyContent: "center" },
                    children: [
                      /* @__PURE__ */ b.jsx(jo, { value: "translate", children: n("Jogging.Cartesian.Translation.bt") }),
                      /* @__PURE__ */ b.jsx(jo, { value: "rotate", children: n("Jogging.Cartesian.Rotation.bt") })
                    ]
                  }
                ),
                e.selectedCartesianMotionType === "translate" && l.map((C) => {
                  var A;
                  return /* @__PURE__ */ b.jsx(
                    vi,
                    {
                      colors: C.colors,
                      disabled: e.isLocked,
                      activeJoggingDirection: ((A = e.incrementJogInProgress) == null ? void 0 : A.axis) === C.id ? e.incrementJogInProgress.direction : void 0,
                      label: /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
                        C.icon,
                        /* @__PURE__ */ b.jsx(
                          et,
                          {
                            sx: {
                              fontSize: "24px",
                              color: r.palette.text.primary
                            },
                            children: C.id.toUpperCase()
                          }
                        )
                      ] }),
                      getDisplayedValue: () => {
                        var P;
                        return c(
                          ((P = e.jogger.motionStream.rapidlyChangingMotionState.tcp_pose) == null ? void 0 : P.position[C.id]) || 0
                        );
                      },
                      startJogging: (P) => s({
                        axis: C.id,
                        motionType: "translate",
                        direction: P
                      }),
                      stopJogging: a
                    },
                    C.id
                  );
                }),
                e.selectedCartesianMotionType === "rotate" && l.map((C) => {
                  var A;
                  return /* @__PURE__ */ b.jsx(
                    vi,
                    {
                      colors: C.colors,
                      disabled: e.isLocked,
                      activeJoggingDirection: ((A = e.incrementJogInProgress) == null ? void 0 : A.axis) === C.id ? e.incrementJogInProgress.direction : void 0,
                      label: /* @__PURE__ */ b.jsxs(b.Fragment, { children: [
                        /* @__PURE__ */ b.jsx(gg, {}),
                        /* @__PURE__ */ b.jsx(
                          et,
                          {
                            sx: {
                              fontSize: "24px",
                              color: r.palette.text.primary
                            },
                            children: C.id.toUpperCase()
                          }
                        )
                      ] }),
                      getDisplayedValue: () => {
                        var P, N;
                        return u(
                          ((N = (P = e.jogger.motionStream.rapidlyChangingMotionState.tcp_pose) == null ? void 0 : P.orientation) == null ? void 0 : N[C.id]) || 0
                        );
                      },
                      startJogging: (P) => s({
                        axis: C.id,
                        motionType: "rotate",
                        direction: P
                      }),
                      stopJogging: a
                    },
                    C.id
                  );
                })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ b.jsx(Oa, { store: e }),
      t && /* @__PURE__ */ b.jsx(Hn, {}),
      t
    ] });
  }
), rb = Ie(
  ({ store: e, children: t }) => {
    async function n(o) {
      await e.activate(), await e.jogger.startJointRotation({
        joint: o.joint,
        direction: o.direction,
        velocityRadsPerSec: e.rotationVelocityRadsPerSec
      });
    }
    async function r() {
      await e.jogger.stop(), await e.deactivate();
    }
    return /* @__PURE__ */ b.jsxs(ge, { flexGrow: 1, gap: 2, sx: { padding: "18px 24px" }, children: [
      /* @__PURE__ */ b.jsx(Da, { store: e }),
      /* @__PURE__ */ b.jsx(Hn, {}),
      /* @__PURE__ */ b.jsx(
        ge,
        {
          justifyContent: "center",
          alignItems: "stretch",
          sx: { flexGrow: "1" },
          id: "JointControls",
          children: /* @__PURE__ */ b.jsx(ge, { alignItems: "center", gap: "24px", children: e.jogger.motionStream.joints.map((o) => {
            var l;
            const i = (l = e.motionGroupSpec.mechanical_joint_limits) == null ? void 0 : l[o.index], s = (i == null ? void 0 : i.lower_limit) !== void 0 ? Dn(i.lower_limit) : void 0, a = (i == null ? void 0 : i.upper_limit) !== void 0 ? Dn(i.upper_limit) : void 0;
            return /* @__PURE__ */ b.jsx(
              Ad,
              {
                disabled: e.isLocked,
                lowerLimitDegs: s,
                upperLimitDegs: a,
                getValueDegs: () => {
                  const c = e.jogger.motionStream.rapidlyChangingMotionState.state.joint_position.joints[o.index];
                  return c !== void 0 ? Dn(c) : void 0;
                },
                startJogging: (c) => n({
                  joint: o.index,
                  direction: c
                }),
                stopJogging: r
              },
              `joint-${o.index}`
            );
          }) })
        }
      ),
      /* @__PURE__ */ b.jsx(Oa, { store: e }),
      t && /* @__PURE__ */ b.jsx(Hn, {}),
      t
    ] });
  }
), o0 = vn(
  Ie((e) => {
    const t = Pl(e.nova) ? new Rl({ instanceUrl: e.nova }) : e.nova, n = go(() => ({
      joggingStore: null,
      loadingError: null
    }));
    async function r() {
      _o(() => {
        n.loadingError = null, n.joggingStore = null;
      });
      try {
        let o = e.store;
        if (!o) {
          const i = await t.connectJogger(e.motionGroupId);
          o = await ko.loadFor(i);
        }
        _o(() => {
          n.joggingStore = o;
        }), e.onSetup && e.onSetup(o);
      } catch (o) {
        n.loadingError = o;
      }
    }
    return ct(() => (r(), e.store ? () => null : () => {
      var o;
      (o = n.joggingStore) == null || o.dispose();
    }), [e.store, e.nova, e.motionGroupId]), ct(() => {
      const o = n.joggingStore;
      o && (e.locked ? o.lock("external") : o.unlock("external"));
    }, [n.joggingStore, e.locked]), /* @__PURE__ */ b.jsx(
      ge,
      {
        sx: {
          maxWidth: "460px",
          minWidth: "320px",
          position: "relative",
          ...e.sx
        },
        children: n.joggingStore ? /* @__PURE__ */ b.jsx(
          ob,
          {
            store: n.joggingStore,
            children: e.children
          }
        ) : /* @__PURE__ */ b.jsx(ha, { message: "Loading jogging", error: n.loadingError })
      }
    );
  })
), ob = Ie(
  ({
    store: e,
    children: t
  }) => {
    function n() {
      if (e.currentTab.id === "cartesian")
        return /* @__PURE__ */ b.jsx(b.Fragment, { children: /* @__PURE__ */ b.jsx(nb, { store: e, children: t }) });
      if (e.currentTab.id === "joint")
        return /* @__PURE__ */ b.jsx(b.Fragment, { children: /* @__PURE__ */ b.jsx(rb, { store: e, children: t }) });
    }
    return /* @__PURE__ */ b.jsxs(ge, { flexGrow: 1, sx: { overflow: "hidden" }, children: [
      /* @__PURE__ */ b.jsx(
        cl,
        {
          value: e.tabIndex,
          onChange: e.onTabChange,
          variant: "fullWidth",
          children: e.tabs.map((r) => /* @__PURE__ */ b.jsx(
            ul,
            {
              label: r.label,
              id: `jogging-tab-${r.id}`,
              "aria-controls": `jogging-tab-${r.id}`
            },
            r.id
          ))
        }
      ),
      /* @__PURE__ */ b.jsx(
        ge,
        {
          flexGrow: 1,
          position: "relative",
          sx: { overflowY: "auto", overflowX: "hidden" },
          children: n()
        }
      )
    ] });
  }
), Fa = pt(
  ({
    label: e,
    value: t
  }, n) => {
    var a;
    const r = tt(), [o, i] = At(!1);
    async function s() {
      if (!n || !("current" in n))
        return console.warn("No copy target found"), !1;
      try {
        return await navigator.clipboard.writeText(t), console.log("Copied!"), i(!0), !0;
      } catch (l) {
        console.error(l);
        const c = window.getSelection(), u = document.createRange();
        u.selectNodeContents(n.current), c.removeAllRanges(), c.addRange(u);
      }
      return !1;
    }
    return ct(() => {
      if (!o)
        return;
      const l = setTimeout(() => i(!1), 3e3);
      return () => {
        l && clearTimeout(l);
      };
    }, [o]), /* @__PURE__ */ b.jsx(fl, { open: o, title: "Copied!", children: /* @__PURE__ */ b.jsx(
      ge,
      {
        justifyContent: "center",
        sx: {
          height: "100%",
          boxSizing: "border-box",
          padding: "6px 12px",
          background: (a = r.palette.backgroundPaperElevation) == null ? void 0 : a[8],
          borderRadius: "10px",
          minWidth: "0",
          cursor: "pointer"
        },
        onClick: () => s(),
        children: /* @__PURE__ */ b.jsx(
          et,
          {
            ref: n,
            align: "center",
            sx: {
              pointerEvents: "none",
              fontSize: "12px",
              color: r.palette.text.primary,
              whiteSpace: "nowrap",
              minWidth: 0,
              textOverflow: "ellipsis",
              width: "100%",
              overflow: "hidden"
            },
            children: t
          }
        )
      }
    ) });
  }
), i0 = Ie(
  ({ motionStream: e }) => {
    const t = Wt(null);
    function n() {
      const r = e.rapidlyChangingMotionState.tcp_pose;
      return r ? Al(r) : "";
    }
    return wn(() => {
      if (!t.current)
        return;
      const r = n();
      t.current.textContent !== r && (t.current.textContent = r);
    }), /* @__PURE__ */ b.jsx(
      ge,
      {
        alignItems: "left",
        spacing: 2,
        sx: { flexGrow: 1, minWidth: 0, overflow: "hidden" },
        children: /* @__PURE__ */ b.jsx(Fa, { value: n(), ref: t })
      }
    );
  }
), s0 = Ie(
  ({ motionStream: e }) => {
    const t = Wt(null);
    function n() {
      const { joints: r } = e.rapidlyChangingMotionState.state.joint_position;
      return `[${r.map((o) => parseFloat(o.toFixed(4))).join(", ")}]`;
    }
    return wn(() => {
      if (!t.current)
        return;
      const r = n();
      t.current.textContent !== r && (t.current.textContent = r);
    }), /* @__PURE__ */ b.jsx(
      ge,
      {
        alignItems: "left",
        spacing: 2,
        sx: { flexGrow: 1, minWidth: 0, overflow: "hidden" },
        children: /* @__PURE__ */ b.jsx(Fa, { value: n(), ref: t })
      }
    );
  }
);
function ib() {
  const e = window.location.href;
  return e.substring(
    0,
    e.indexOf("/", e.indexOf("//") + 2)
  );
}
function a0({
  baseUrl: e = ib(),
  ...t
}) {
  return /* @__PURE__ */ b.jsxs(
    dl,
    {
      "aria-labelledby": "no-motion-group-modal-title",
      open: !0,
      fullWidth: !0,
      sx: {
        "& .MuiModal-backdrop": {
          backdropFilter: "blur(10px)"
        },
        "& .MuiDialog-paper": {
          "::before": {
            content: '""',
            height: "8px",
            width: "100%",
            background: "linear-gradient(90deg, #FF0E65 0%, #47D3FF 100%)"
          },
          background: "#101629"
        }
      },
      children: [
        /* @__PURE__ */ b.jsx(pl, { id: "no-motion-group-modal-title", children: "No motion group found" }),
        /* @__PURE__ */ b.jsxs(
          gl,
          {
            sx: {
              marginTop: "3rem",
              marginBottom: "1.5rem",
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ b.jsx(et, { color: "#fff", children: "Found no devices to connect to." }),
              /* @__PURE__ */ b.jsx(et, { color: "#fff", children: "Please ensure a motion group has been created." })
            ]
          }
        ),
        /* @__PURE__ */ b.jsx(hl, { children: /* @__PURE__ */ b.jsxs(ge, { width: "100%", maxWidth: "300px", margin: "auto", marginBottom: "2rem", children: [
          /* @__PURE__ */ b.jsx(
            No,
            {
              href: `${e}/settings`,
              variant: "contained",
              sx: {
                borderRadius: "8px",
                width: "100%"
              },
              children: "Go to settings app"
            }
          ),
          /* @__PURE__ */ b.jsx(
            No,
            {
              href: `${e}`,
              variant: "text",
              sx: {
                marginTop: "1rem",
                color: "#fff",
                textDecoration: "underline",
                fontSize: "0.75rem"
              },
              children: "Back to Homescreen"
            }
          )
        ] }) })
      ]
    }
  );
}
const l0 = Array(6).fill(2 * Math.PI), us = "3.0.0";
function Ba(e) {
  let t = us;
  return us.startsWith("0.") && (t = ""), `https://cdn.jsdelivr.net/gh/wandelbotsgmbh/wandelbots-js-react-components${t ? `@${t}` : ""}/public/models/${e}.glb`;
}
function sb(e) {
  function t(n) {
    return n.children.length === 0 ? [n] : [n, ...n.children.flatMap((r) => t(r))];
  }
  return t(e).filter((n) => Ua(n));
}
function Va(e) {
  return e.name.endsWith("_FLG");
}
function Ua(e) {
  return /_J[0-9]+$/.test(e.name);
}
function ab(e, t) {
  let n;
  function r(o) {
    if (Va(o)) {
      if (n)
        throw Error(
          `Found multiple flange groups in robot model ${t}; first ${n.name} then ${o.name}. Only one _FLG group is allowed.`
        );
      n = o;
    }
    Ua(o), o.children.map(r);
  }
  if (r(e.scene), !n)
    throw Error(
      `No flange group found in robot model ${t}. Flange must be identified with a name ending in _FLG.`
    );
  return { gltf: e };
}
function za({
  rapidlyChangingMotionState: e,
  dhParameters: t,
  onRotationChanged: n,
  children: r
}) {
  jl.assign({ frameLoop: "always" });
  const o = Wt([]), i = Wt([]), { invalidate: s } = Za();
  function a(p) {
    p && (i.current = sb(p), c(), s());
  }
  function l(p) {
    o.current = p, d.start(Object.assign({}, o.current));
  }
  function c() {
    const p = i.current.map(
      (S, m) => u[m].get()
    );
    if (n)
      n(i.current, p);
    else
      for (const [S, m] of i.current.entries()) {
        const f = t[S], x = f.theta || 0, E = f.reverse_rotation_direction ? -1 : 1;
        m.rotation.y = E * p[S] + x;
      }
  }
  Xf(() => {
    const p = e.state.joint_position.joints.filter(
      (S) => S !== void 0
    );
    requestAnimationFrame(() => l(p));
  });
  const [u, d] = Nl(() => ({
    ...Object.assign(
      {},
      e.state.joint_position.joints
    ),
    onChange: () => {
      c(), s();
    },
    onResolve: () => {
      c();
    }
  }));
  return /* @__PURE__ */ b.jsx("group", { ref: a, children: r });
}
const fs = "line", ds = "mesh";
function lb({
  rapidlyChangingMotionState: e,
  dhParameters: t,
  ...n
}) {
  const r = new Yt();
  function o(a, l) {
    const c = new Po(), u = new Qa(), d = new Po();
    r.decompose(c, u, d);
    const p = c.clone(), S = new Yt().makeRotationY(
      a.theta + l * (a.reverse_rotation_direction ? -1 : 1)
    ).multiply(new Yt().makeTranslation(0, a.d / 1e3, 0)).multiply(new Yt().makeTranslation(a.a / 1e3, 0, 0)).multiply(new Yt().makeRotationX(a.alpha));
    return r.multiply(S), r.decompose(c, u, d), { a: p, b: c };
  }
  function i(a, l, c, u) {
    if (!t)
      return;
    const d = t[a];
    if (!d)
      return;
    const { a: p, b: S } = o(d, u);
    l.geometry.setPositions([p.toArray(), S.toArray()].flat()), c.position.set(S.x, S.y, S.z);
  }
  function s(a, l) {
    r.identity(), a.forEach((c, u) => {
      i(
        u,
        c.getObjectByName(fs),
        c.getObjectByName(ds),
        l[u]
      );
    });
  }
  return /* @__PURE__ */ b.jsx(b.Fragment, { children: /* @__PURE__ */ b.jsx(
    za,
    {
      rapidlyChangingMotionState: e,
      dhParameters: t,
      onRotationChanged: s,
      children: /* @__PURE__ */ b.jsxs("group", { ...n, name: "Scene", children: [
        /* @__PURE__ */ b.jsxs("mesh", { children: [
          /* @__PURE__ */ b.jsx("sphereGeometry", { args: [0.01, 32, 32] }),
          /* @__PURE__ */ b.jsx("meshStandardMaterial", { color: "black", depthTest: !0 })
        ] }),
        t.map((a, l) => {
          const { a: c, b: u } = o(
            a,
            e.state.joint_position.joints[l] ?? 0
          ), d = `dhrobot_J0${l}`;
          return /* @__PURE__ */ b.jsxs("group", { name: d, children: [
            /* @__PURE__ */ b.jsx(
              hs,
              {
                name: fs,
                points: [c, u],
                color: "white",
                lineWidth: 5
              }
            ),
            /* @__PURE__ */ b.jsxs("mesh", { name: ds, position: u, children: [
              /* @__PURE__ */ b.jsx("sphereGeometry", { args: [0.01, 32, 32] }),
              /* @__PURE__ */ b.jsx("meshStandardMaterial", { color: "black", depthTest: !0 })
            ] }, "mesh_" + l)
          ] }, d);
        })
      ] })
    }
  ) });
}
const cb = console.warn;
function ub() {
  return ct(() => {
    console.warn = (e) => {
      e !== "Cannot call the manual advancement of rafz whilst frameLoop is not set as demand" && cb(e);
    };
  }, []), /* @__PURE__ */ b.jsx(b.Fragment, {});
}
function fb(e) {
  return e.type === "Mesh";
}
function db({
  modelURL: e,
  flangeRef: t,
  postModelRender: n,
  ...r
}) {
  const { gltf: o } = ab(
    Xa(e),
    e.split("/").pop() || e
  ), i = ps(
    (a) => {
      a && n && n();
    },
    [e]
  );
  function s(a) {
    return fb(a) ? /* @__PURE__ */ b.jsx(
      "mesh",
      {
        name: a.name,
        geometry: a.geometry,
        material: a.material,
        position: a.position,
        rotation: a.rotation
      },
      a.uuid
    ) : /* @__PURE__ */ b.jsx(
      _l.group,
      {
        name: a.name,
        position: a.position,
        rotation: a.rotation,
        ref: Va(a) ? t : void 0,
        children: a.children.map(s)
      },
      a.uuid
    );
  }
  return /* @__PURE__ */ b.jsx("group", { ...r, dispose: null, ref: i, children: s(o.scene) });
}
const pb = (e, t) => {
  e.userData.isGhost || (e.traverse((n) => {
    if (n instanceof pe.Mesh) {
      n.material instanceof pe.Material && (n.material.colorWrite = !1);
      const r = n.clone(), o = n.clone();
      r.material = new pe.MeshStandardMaterial({
        depthTest: !0,
        depthWrite: !0,
        colorWrite: !1,
        polygonOffset: !0,
        polygonOffsetFactor: -1,
        side: pe.DoubleSide
      }), r.userData.isGhost = !0, o.material = new pe.MeshStandardMaterial({
        color: t,
        opacity: 0.3,
        depthTest: !0,
        depthWrite: !1,
        transparent: !0,
        polygonOffset: !0,
        polygonOffsetFactor: -2,
        side: pe.DoubleSide
      }), o.userData.isGhost = !0, n.parent && (n.parent.add(r), n.parent.add(o));
    }
  }), e.userData.isGhost = !0);
}, gb = (e) => {
  if (!e.userData.isGhost) return;
  const t = [];
  e.traverse((n) => {
    var r;
    n instanceof pe.Mesh && ((r = n.userData) != null && r.isGhost ? t.push(n) : n.material instanceof pe.Material && (n.material.colorWrite = !0));
  }), t.forEach((n) => {
    n.parent && n.parent.remove(n);
  }), e.userData.isGhost = !1;
}, hb = vn(
  ({
    rapidlyChangingMotionState: e,
    modelFromController: t,
    dhParameters: n,
    getModel: r = Ba,
    flangeRef: o,
    postModelRender: i,
    transparentColor: s,
    ...a
  }) => {
    const [l, c] = At(null), u = ps((p) => {
      c(p);
    }, []);
    ct(() => {
      l && (s ? pb(l, s) : gb(l));
    }, [l, s]);
    const d = /* @__PURE__ */ b.jsx(
      lb,
      {
        rapidlyChangingMotionState: e,
        dhParameters: n,
        ...a
      }
    );
    return /* @__PURE__ */ b.jsxs(
      Ll,
      {
        fallback: d,
        onError: (p) => {
          if (p.message.includes("404: Not Found"))
            console.error(p);
          else
            throw p;
        },
        children: [
          /* @__PURE__ */ b.jsx(gs, { fallback: d, children: /* @__PURE__ */ b.jsx("group", { ref: u, children: /* @__PURE__ */ b.jsx(
            za,
            {
              rapidlyChangingMotionState: e,
              dhParameters: n,
              children: /* @__PURE__ */ b.jsx(
                db,
                {
                  modelURL: r(t),
                  postModelRender: i,
                  flangeRef: o,
                  ...a
                }
              )
            }
          ) }) }),
          /* @__PURE__ */ b.jsx(ub, {})
        ]
      }
    );
  }
);
function c0({
  connectedMotionGroup: e,
  getModel: t = Ba,
  flangeRef: n,
  transparentColor: r,
  ...o
}) {
  return e.dhParameters ? /* @__PURE__ */ b.jsx(
    hb,
    {
      rapidlyChangingMotionState: e.rapidlyChangingMotionState,
      modelFromController: e.modelFromController || "",
      dhParameters: e.dhParameters,
      getModel: t,
      flangeRef: n,
      transparentColor: r,
      ...o
    }
  ) : null;
}
const mb = po(ml, {
  shouldForwardProp: (e) => e !== "selected"
})(({ theme: e }) => {
  var t, n, r;
  return {
    borderRadius: "20px",
    "&:hover": {
      background: (t = e.palette.backgroundPaperElevation) == null ? void 0 : t[7]
    },
    variants: [
      {
        props: ({ selected: o }) => !o,
        style: {
          background: (n = e.palette.backgroundPaperElevation) == null ? void 0 : n[0],
          color: e.palette.action.disabled,
          "> img": {
            opacity: 0.4
          }
        }
      },
      {
        props: ({ selected: o }) => o,
        style: {
          background: (r = e.palette.backgroundPaperElevation) == null ? void 0 : r[11],
          border: `1px solid ${e.palette.divider}`,
          color: e.palette.primary.contrastText
        }
      }
    ]
  };
}), u0 = pt(
  (e, t) => /* @__PURE__ */ b.jsx(
    mb,
    {
      ref: t,
      selected: e.selected,
      ...e,
      color: "secondary",
      variant: "circular"
    }
  )
), yb = {
  $schema: "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
  name: "wandelscript",
  patterns: [
    {
      include: "#keywords"
    },
    {
      include: "#strings"
    },
    {
      include: "#comments"
    },
    {
      include: "#functions"
    }
  ],
  repository: {
    keywords: {
      patterns: [
        {
          name: "keyword.control.flow.wandelscript",
          match: "\\b(move|via|to|interrupt|def|False|True|for|if|else|elif|while|return|switch|activate|deactivate|print|and|or|not)\\b"
        }
      ]
    },
    strings: {
      name: "string.quoted.double.wandelscript",
      begin: '"',
      end: '"',
      patterns: [
        {
          name: "constant.character.escape.wandelscript",
          match: "\\\\."
        }
      ]
    },
    comments: {
      patterns: [
        {
          begin: "#",
          beginCaptures: {
            0: { name: "punctuation.definition.comment.wandelscript" }
          },
          end: "$",
          name: "comment.line.number-sign.wandelscript"
        }
      ]
    },
    functions: {
      patterns: [
        {
          match: "[a-zA-Z_-]+\\(",
          name: "entity.name.function.wandelscript"
        }
      ]
    }
  },
  scopeName: "source.wandelscript"
}, bb = qa(() => import("@monaco-editor/react"));
let qr = null;
async function xb() {
  if (!qr) {
    const [{ createHighlighter: e }, { shikiToMonaco: t }] = await Promise.all([
      import("shiki"),
      import("@shikijs/monaco")
    ]);
    qr = {
      shiki: await e({
        // Our textmate grammar doesn't quite conform to the expected type
        // here; I'm not sure what the missing properties mean exactly
        langs: [yb],
        themes: ["dark-plus", "light-plus"]
      }),
      shikiToMonaco: t
    };
  }
  return qr;
}
const f0 = vn(
  (e) => {
    const t = tt(), [n, r] = At("dark-plus"), o = t.palette.mode === "dark" ? "dark-plus" : "light-plus";
    async function i(s) {
      var c, u;
      s.languages.register({ id: "wandelscript" }), s.languages.setLanguageConfiguration("wandelscript", {
        comments: {
          lineComment: "#"
        },
        brackets: [
          ["(", ")"],
          ["[", "]"]
        ],
        autoClosingPairs: [
          { open: "[", close: "]" },
          { open: "(", close: ")" }
        ],
        surroundingPairs: [
          { open: "[", close: "]" },
          { open: "(", close: ")" }
        ]
      });
      const { shiki: a, shikiToMonaco: l } = await xb();
      l(a, s), s.editor.defineTheme(
        o,
        ((u = (c = t.componentsExt) == null ? void 0 : c.WandelscriptEditor) == null ? void 0 : u.monacoTheme) ?? {
          base: t.palette.mode === "dark" ? "vs-dark" : "vs",
          inherit: !0,
          rules: [],
          colors: {}
        }
      ), e.monacoSetup && e.monacoSetup(s), r(o);
    }
    return /* @__PURE__ */ b.jsx(gs, { fallback: /* @__PURE__ */ b.jsx(ha, {}), children: /* @__PURE__ */ b.jsx(
      bb,
      {
        value: e.code,
        onMount: (s, a) => {
          i(a);
        },
        onChange: e.onChange,
        defaultLanguage: "wandelscript",
        theme: n,
        options: {
          minimap: { enabled: !1 },
          wordWrap: "on",
          automaticLayout: !0,
          ...e.monacoOptions
        }
      }
    ) });
  }
);
function Ja() {
  var t, n, r, o, i, s, a;
  const e = yl({
    palette: {
      mode: "dark",
      text: {
        primary: "rgba(255, 255, 255, 1)",
        secondary: "rgba(255, 255, 255, 0.7)",
        disabled: "rgba(255, 255, 255, 0.38)"
      },
      primary: {
        main: "rgba(142, 86, 252, 1)",
        dark: "rgba(136, 58, 255, 1)",
        light: "rgba(157, 131, 246, 1)",
        contrastText: "rgba(255, 255, 255, 0.87)"
      },
      secondary: {
        main: "rgba(255, 255, 255, 1)",
        dark: "rgba(255, 255, 255, 0.06)",
        contrastText: "rgba(255, 255, 255, 0.87)"
      },
      tertiary: {
        main: "rgba(100, 255, 218, 1)",
        dark: "rgba(38, 166, 154, 1)",
        light: "rgba(167, 255, 235, 1)",
        contrastText: "rgba(0, 0, 0, 1)"
      },
      error: {
        main: "rgba(239, 83, 80, 1)",
        dark: "rgba(229, 57, 53, 1)",
        light: "rgba(239, 154, 154, 1)",
        contrastText: "rgba(255, 255, 255, 1)"
      },
      warning: {
        main: "rgba(255, 171, 64, 1)",
        dark: "rgba(255, 145, 0, 1)",
        light: "rgba(255, 209, 128, 1)",
        contrastText: "rgba(0, 0, 0, 0.87)"
      },
      success: {
        main: "rgba(38, 166, 154, 1)",
        dark: "rgba(0, 121, 107, 1)",
        light: "rgba(128, 203, 196, 1)",
        contrastText: "rgba(255, 255, 255, 0.87)"
      },
      background: {
        default: "rgba(2, 6, 23, 1)",
        paper: "rgba(17, 19, 31, 1)"
      },
      action: {
        active: "rgba(255, 255, 255, 0.56)",
        hover: "rgba(255, 255, 255, 0.08)",
        selected: "rgba(255, 255, 255, 0.16)",
        disabledBackground: "rgba(255, 255, 255, 0.12)",
        focus: "rgba(255, 255, 255, 0.12)",
        disabled: "rgba(255, 255, 255, 0.38)"
      },
      common: {
        white: "rgba(255, 255, 255, 1)",
        black: "rgba(0, 0, 0, 1)"
      },
      divider: "rgba(255, 255, 255, 0.12)",
      backgroundPaperElevation: {
        0: "rgba(17,19,31,1.0)",
        1: "rgba(20,22,35,1.0)",
        2: "rgba(23,25,39,1.0)",
        3: "rgba(26,28,43,1.0)",
        4: "rgba(29,31,47,1.0)",
        5: "rgba(32,34,51,1.0)",
        6: "rgba(35,37,55,1.0)",
        7: "rgba(38,40,59,1.0)",
        8: "rgba(41,43,63,1.0)",
        9: "rgba(44,46,67,1.0)",
        10: "rgba(47,49,71,1.0)",
        11: "rgba(50,52,75,1.0)",
        12: "rgba(53,55,79,1.0)",
        13: "rgba(56,58,83,1.0)",
        14: "rgba(59,61,87,1.0)",
        15: "rgba(62,64,91,1.0)",
        16: "rgba(57,63,87,1.0)"
      }
    },
    paletteExt: {
      primary: {
        hover: "rgba(142, 86, 252, 0.08)",
        selected: "rgba(142, 86, 252, 0.16)",
        focus: "rgba(142, 86, 252, 0.12)",
        focusVisible: "rgba(142, 86, 252, 0.3)",
        outlineBorder: "rgba(142, 86, 252, 0.5)"
      },
      secondary: {
        tonal: "rgba(255,255,255,0.1)"
      }
    }
  });
  return {
    ...e,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "10px"
          }
        },
        variants: [
          {
            props: { color: "secondary", variant: "contained" },
            style: {
              border: `1px solid ${e.palette.divider}`,
              background: (r = (n = (t = e.paletteExt) == null ? void 0 : t.secondary) == null ? void 0 : n.tonal) == null ? void 0 : r.toString()
            }
          },
          {
            props: { color: "secondary", variant: "outlined" },
            style: {
              border: `1px solid ${e.palette.divider}`
            }
          }
        ]
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            color: e.palette.text.secondary,
            "&.Mui-selected": {
              color: e.palette.text.primary
            }
          }
        }
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            background: (o = e.palette.backgroundPaperElevation) == null ? void 0 : o[1]
          }
        }
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            ".MuiToggleButtonGroup-firstButton": {
              borderRadius: "10px 0 0 10px"
            },
            ".MuiToggleButtonGroup-lastButton": {
              borderRadius: "0 10px 10px 0"
            }
          }
        }
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            padding: "6px 16px"
          }
        }
      },
      MuiSelect: {
        variants: [
          {
            props: { variant: "filled" },
            style: {
              borderRadius: "10px",
              "::before, ::after": {
                visibility: "collapse"
              },
              ".MuiInputBase-input": {
                padding: "6px 16px",
                borderRadius: "10px"
              }
            }
          }
        ]
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            border: "none",
            boxShadow: "4px 0 8px -4px rgba(0, 0, 0, 0.3)"
          }
        }
      },
      MuiFab: {
        styleOverrides: {
          root: {
            background: (s = (i = e.paletteExt) == null ? void 0 : i.secondary) == null ? void 0 : s.tonal
          }
        },
        variants: [
          {
            props: { color: "primary" },
            style: {
              background: e.palette.primary.main
            }
          }
        ]
      }
    },
    componentsExt: {
      JoggingCartesian: {
        Axis: {
          X: {
            backgroundColor: "rgba(215, 66, 56, 1)",
            borderColor: "rgba(215, 66, 56, 1)",
            buttonBackgroundColor: {
              default: "rgba(241, 77, 66, 1)",
              pressed: "rgba(138, 41, 35, 1)",
              hovered: "rgba(241, 77, 66, 1)",
              disabled: "rgba(241, 77, 66, 1)"
            },
            color: "rgba(255, 198, 198, 1)"
          },
          Y: {
            backgroundColor: "rgba(20, 151, 108, 1)",
            borderColor: "rgba(20, 151, 108, 1)",
            buttonBackgroundColor: {
              default: "rgba(28, 188, 135, 1)",
              pressed: "rgba(11, 89, 63, 1)",
              disabled: "rgba(28, 188, 135, 1)",
              hovered: "rgba(28, 188, 135, 1)"
            },
            color: "rgba(215, 255, 242, 1)"
          },
          Z: {
            backgroundColor: "rgba(1, 87, 155, 1)",
            borderColor: "rgba(1, 87, 155, 1)",
            buttonBackgroundColor: {
              default: "rgba(2, 136, 209, 1)",
              pressed: "rgba(2, 64, 114, 1)",
              disabled: "rgba(2, 136, 209, 1)",
              hovered: "rgba(2, 136, 209, 1)"
            },
            color: "rgba(210, 239, 255, 1)"
          }
        }
      },
      WandelscriptEditor: {
        monacoTheme: {
          base: "vs-dark",
          inherit: !0,
          rules: [
            {
              token: "keyword",
              foreground: "#b349a9ff"
            }
          ],
          colors: {
            "editor.background": bl(
              ((a = e.palette.backgroundPaperElevation) == null ? void 0 : a[5]) ?? ""
            ),
            "editor.foreground": "#d4d4d4",
            "editorLineNumber.foreground": "#797979",
            "editorLineNumber.activeForeground": "#e9e9e9",
            "editor.lineHighlightBorder": "#e9e9e911"
          }
        }
      }
    }
  };
}
function Sb() {
  const e = Ja();
  return e.palette.mode = "light", e;
}
function d0(e) {
  var r, o, i, s;
  let t = !0;
  ((r = e.palette) == null ? void 0 : r.mode) === "light" ? t = !1 : ((o = e.palette) == null ? void 0 : o.mode) !== "dark" && (t = !(typeof window < "u" && ((s = (i = window.matchMedia) == null ? void 0 : i.call(window, "(prefers-color-scheme: light)")) == null ? void 0 : s.matches)));
  const n = t ? Ja() : Sb();
  return Ds(n, e);
}
export {
  vi as JoggingCartesianAxisControl,
  Ad as JoggingJointRotationControl,
  o0 as JoggingPanel,
  ko as JoggingStore,
  ha as LoadingCover,
  sg as LoadingErrorMessage,
  a0 as NoMotionGroupModal,
  i0 as PoseCartesianValues,
  s0 as PoseJointValues,
  Db as PresetEnvironment,
  c0 as Robot,
  Fb as SafetyZonesRenderer,
  u0 as SelectableFab,
  hb as SupportedRobot,
  Bb as TrajectoryRenderer,
  tb as VelocitySlider,
  Ma as VelocitySliderLabel,
  f0 as WandelscriptEditor,
  d0 as createNovaMuiTheme,
  l0 as defaultAxisConfig,
  Ba as defaultGetModel,
  wn as useAnimationFrame,
  Xf as useAutorun,
  vo as useMounted,
  Zf as useReaction
};
//# sourceMappingURL=index.js.map
