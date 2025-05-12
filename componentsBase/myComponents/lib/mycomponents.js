/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function tn(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const C = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, nn = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], Z = () => {
}, rn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), V = Object.assign, sn = Object.prototype.hasOwnProperty, w = (e, t) => sn.call(e, t), m = Array.isArray, k = (e) => Re(e) === "[object Map]", on = (e) => Re(e) === "[object Set]", O = (e) => typeof e == "function", A = (e) => typeof e == "string", fe = (e) => typeof e == "symbol", v = (e) => e !== null && typeof e == "object", cn = (e) => (v(e) || O(e)) && O(e.then) && O(e.catch), ln = Object.prototype.toString, Re = (e) => ln.call(e), bt = (e) => Re(e).slice(8, -1), an = (e) => Re(e) === "[object Object]", Xe = (e) => A(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, un = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, fn = un((e) => e.charAt(0).toUpperCase() + e.slice(1)), B = (e, t) => !Object.is(e, t), pn = (e, t, n, s = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: s,
    value: n
  });
};
let at;
const Te = () => at || (at = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ze(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = A(s) ? gn(s) : Ze(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (A(e) || v(e))
    return e;
}
const dn = /;(?![^(]*\))/g, hn = /:([^]+)/, _n = /\/\*[^]*?\*\//g;
function gn(e) {
  const t = {};
  return e.replace(_n, "").split(dn).forEach((n) => {
    if (n) {
      const s = n.split(hn);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function ke(e) {
  let t = "";
  if (A(e))
    t = e;
  else if (m(e))
    for (let n = 0; n < e.length; n++) {
      const s = ke(e[n]);
      s && (t += s + " ");
    }
  else if (v(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function K(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let g;
const Me = /* @__PURE__ */ new WeakSet();
class mn {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Me.has(this) && (Me.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || En(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, ut(this), Nt(this);
    const t = g, n = P;
    g = this, P = !0;
    try {
      return this.fn();
    } finally {
      process.env.NODE_ENV !== "production" && g !== this && K(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), Ot(this), g = t, P = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        nt(t);
      this.deps = this.depsTail = void 0, ut(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Me.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Ue(this) && this.run();
  }
  get dirty() {
    return Ue(this);
  }
}
let wt = 0, ie, ce;
function En(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = ce, ce = e;
    return;
  }
  e.next = ie, ie = e;
}
function et() {
  wt++;
}
function tt() {
  if (--wt > 0)
    return;
  if (ce) {
    let t = ce;
    for (ce = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; ie; ) {
    let t = ie;
    for (ie = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Nt(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ot(e) {
  let t, n = e.depsTail, s = n;
  for (; s; ) {
    const r = s.prevDep;
    s.version === -1 ? (s === n && (n = r), nt(s), wn(s)) : t = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0, s = r;
  }
  e.deps = t, e.depsTail = n;
}
function Ue(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (bn(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function bn(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Ne))
    return;
  e.globalVersion = Ne;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Ue(e)) {
    e.flags &= -3;
    return;
  }
  const n = g, s = P;
  g = e, P = !0;
  try {
    Nt(e);
    const r = e.fn(e._value);
    (t.version === 0 || B(r, e._value)) && (e._value = r, t.version++);
  } catch (r) {
    throw t.version++, r;
  } finally {
    g = n, P = s, Ot(e), e.flags &= -3;
  }
}
function nt(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (s && (s.nextSub = r, e.prevSub = void 0), r && (r.prevSub = s, e.nextSub = void 0), process.env.NODE_ENV !== "production" && n.subsHead === e && (n.subsHead = r), n.subs === e && (n.subs = s, !s && n.computed)) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep)
      nt(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function wn(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let P = !0;
const St = [];
function Ce() {
  St.push(P), P = !1;
}
function Ie() {
  const e = St.pop();
  P = e === void 0 ? !0 : e;
}
function ut(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = g;
    g = void 0;
    try {
      t();
    } finally {
      g = n;
    }
  }
}
let Ne = 0;
class Nn {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class On {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0, process.env.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(t) {
    if (!g || !P || g === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== g)
      n = this.activeLink = new Nn(g, this), g.deps ? (n.prevDep = g.depsTail, g.depsTail.nextDep = n, g.depsTail = n) : g.deps = g.depsTail = n, vt(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = g.depsTail, n.nextDep = void 0, g.depsTail.nextDep = n, g.depsTail = n, g.deps === n && (g.deps = s);
    }
    return process.env.NODE_ENV !== "production" && g.onTrack && g.onTrack(
      V(
        {
          effect: g
        },
        t
      )
    ), n;
  }
  trigger(t) {
    this.version++, Ne++, this.notify(t);
  }
  notify(t) {
    et();
    try {
      if (process.env.NODE_ENV !== "production")
        for (let n = this.subsHead; n; n = n.nextSub)
          n.sub.onTrigger && !(n.sub.flags & 8) && n.sub.onTrigger(
            V(
              {
                effect: n.sub
              },
              t
            )
          );
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      tt();
    }
  }
}
function vt(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep)
        vt(s);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), process.env.NODE_ENV !== "production" && e.dep.subsHead === void 0 && (e.dep.subsHead = e), e.dep.subs = e;
  }
}
const ze = /* @__PURE__ */ new WeakMap(), J = Symbol(
  process.env.NODE_ENV !== "production" ? "Object iterate" : ""
), Be = Symbol(
  process.env.NODE_ENV !== "production" ? "Map keys iterate" : ""
), ae = Symbol(
  process.env.NODE_ENV !== "production" ? "Array iterate" : ""
);
function N(e, t, n) {
  if (P && g) {
    let s = ze.get(e);
    s || ze.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || (s.set(n, r = new On()), r.map = s, r.key = n), process.env.NODE_ENV !== "production" ? r.track({
      target: e,
      type: t,
      key: n
    }) : r.track();
  }
}
function H(e, t, n, s, r, o) {
  const i = ze.get(e);
  if (!i) {
    Ne++;
    return;
  }
  const c = (a) => {
    a && (process.env.NODE_ENV !== "production" ? a.trigger({
      target: e,
      type: t,
      key: n,
      newValue: s,
      oldValue: r,
      oldTarget: o
    }) : a.trigger());
  };
  if (et(), t === "clear")
    i.forEach(c);
  else {
    const a = m(e), f = a && Xe(n);
    if (a && n === "length") {
      const d = Number(s);
      i.forEach((l, u) => {
        (u === "length" || u === ae || !fe(u) && u >= d) && c(l);
      });
    } else
      switch ((n !== void 0 || i.has(void 0)) && c(i.get(n)), f && c(i.get(ae)), t) {
        case "add":
          a ? f && c(i.get("length")) : (c(i.get(J)), k(e) && c(i.get(Be)));
          break;
        case "delete":
          a || (c(i.get(J)), k(e) && c(i.get(Be)));
          break;
        case "set":
          k(e) && c(i.get(J));
          break;
      }
  }
  tt();
}
function G(e) {
  const t = h(e);
  return t === e ? t : (N(t, "iterate", ae), D(e) ? t : t.map(y));
}
function rt(e) {
  return N(e = h(e), "iterate", ae), e;
}
const Sn = {
  __proto__: null,
  [Symbol.iterator]() {
    return Fe(this, Symbol.iterator, y);
  },
  concat(...e) {
    return G(this).concat(
      ...e.map((t) => m(t) ? G(t) : t)
    );
  },
  entries() {
    return Fe(this, "entries", (e) => (e[1] = y(e[1]), e));
  },
  every(e, t) {
    return M(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return M(this, "filter", e, t, (n) => n.map(y), arguments);
  },
  find(e, t) {
    return M(this, "find", e, t, y, arguments);
  },
  findIndex(e, t) {
    return M(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return M(this, "findLast", e, t, y, arguments);
  },
  findLastIndex(e, t) {
    return M(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return M(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return je(this, "includes", e);
  },
  indexOf(...e) {
    return je(this, "indexOf", e);
  },
  join(e) {
    return G(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return je(this, "lastIndexOf", e);
  },
  map(e, t) {
    return M(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return se(this, "pop");
  },
  push(...e) {
    return se(this, "push", e);
  },
  reduce(e, ...t) {
    return ft(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ft(this, "reduceRight", e, t);
  },
  shift() {
    return se(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return M(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return se(this, "splice", e);
  },
  toReversed() {
    return G(this).toReversed();
  },
  toSorted(e) {
    return G(this).toSorted(e);
  },
  toSpliced(...e) {
    return G(this).toSpliced(...e);
  },
  unshift(...e) {
    return se(this, "unshift", e);
  },
  values() {
    return Fe(this, "values", y);
  }
};
function Fe(e, t, n) {
  const s = rt(e), r = s[t]();
  return s !== e && !D(e) && (r._next = r.next, r.next = () => {
    const o = r._next();
    return o.value && (o.value = n(o.value)), o;
  }), r;
}
const vn = Array.prototype;
function M(e, t, n, s, r, o) {
  const i = rt(e), c = i !== e && !D(e), a = i[t];
  if (a !== vn[t]) {
    const l = a.apply(e, o);
    return c ? y(l) : l;
  }
  let f = n;
  i !== e && (c ? f = function(l, u) {
    return n.call(this, y(l), u, e);
  } : n.length > 2 && (f = function(l, u) {
    return n.call(this, l, u, e);
  }));
  const d = a.call(i, f, s);
  return c && r ? r(d) : d;
}
function ft(e, t, n, s) {
  const r = rt(e);
  let o = n;
  return r !== e && (D(e) ? n.length > 3 && (o = function(i, c, a) {
    return n.call(this, i, c, a, e);
  }) : o = function(i, c, a) {
    return n.call(this, i, y(c), a, e);
  }), r[t](o, ...s);
}
function je(e, t, n) {
  const s = h(e);
  N(s, "iterate", ae);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Oe(n[0]) ? (n[0] = h(n[0]), s[t](...n)) : r;
}
function se(e, t, n = []) {
  Ce(), et();
  const s = h(e)[t].apply(e, n);
  return tt(), Ie(), s;
}
const xn = /* @__PURE__ */ tn("__proto__,__v_isRef,__isVue"), xt = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(fe)
);
function yn(e) {
  fe(e) || (e = String(e));
  const t = h(this);
  return N(t, "has", e), t.hasOwnProperty(e);
}
class yt {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? Tt : Rt : o ? Mn : Vt).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = m(t);
    if (!r) {
      let a;
      if (i && (a = Sn[n]))
        return a;
      if (n === "hasOwnProperty")
        return yn;
    }
    const c = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      x(t) ? t : s
    );
    return (fe(n) ? xt.has(n) : xn(n)) || (r || N(t, "get", n), o) ? c : x(c) ? i && Xe(n) ? c : c.value : v(c) ? r ? It(c) : Ct(c) : c;
  }
}
class Dn extends yt {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const a = L(o);
      if (!D(s) && !L(s) && (o = h(o), s = h(s)), !m(t) && x(o) && !x(s))
        return a ? !1 : (o.value = s, !0);
    }
    const i = m(t) && Xe(n) ? Number(n) < t.length : w(t, n), c = Reflect.set(
      t,
      n,
      s,
      x(t) ? t : r
    );
    return t === h(r) && (i ? B(s, o) && H(t, "set", n, s, o) : H(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = w(t, n), r = t[n], o = Reflect.deleteProperty(t, n);
    return o && s && H(t, "delete", n, void 0, r), o;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!fe(n) || !xt.has(n)) && N(t, "has", n), s;
  }
  ownKeys(t) {
    return N(
      t,
      "iterate",
      m(t) ? "length" : J
    ), Reflect.ownKeys(t);
  }
}
class Dt extends yt {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && K(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && K(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const Vn = /* @__PURE__ */ new Dn(), Rn = /* @__PURE__ */ new Dt(), Tn = /* @__PURE__ */ new Dt(!0), Je = (e) => e, he = (e) => Reflect.getPrototypeOf(e);
function Cn(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = h(r), i = k(o), c = e === "entries" || e === Symbol.iterator && i, a = e === "keys" && i, f = r[e](...s), d = n ? Je : t ? Ye : y;
    return !t && N(
      o,
      "iterate",
      a ? Be : J
    ), {
      // iterator protocol
      next() {
        const { value: l, done: u } = f.next();
        return u ? { value: l, done: u } : {
          value: c ? [d(l[0]), d(l[1])] : d(l),
          done: u
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function _e(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      K(
        `${fn(e)} operation ${n}failed: target is readonly.`,
        h(this)
      );
    }
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function In(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      e || (B(r, c) && N(i, "get", r), N(i, "get", c));
      const { has: a } = he(i), f = t ? Je : e ? Ye : y;
      if (a.call(i, r))
        return f(o.get(r));
      if (a.call(i, c))
        return f(o.get(c));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return !e && N(h(r), "iterate", J), Reflect.get(r, "size", r);
    },
    has(r) {
      const o = this.__v_raw, i = h(o), c = h(r);
      return e || (B(r, c) && N(i, "has", r), N(i, "has", c)), r === c ? o.has(r) : o.has(r) || o.has(c);
    },
    forEach(r, o) {
      const i = this, c = i.__v_raw, a = h(c), f = t ? Je : e ? Ye : y;
      return !e && N(a, "iterate", J), c.forEach((d, l) => r.call(o, f(d), f(l), i));
    }
  };
  return V(
    n,
    e ? {
      add: _e("add"),
      set: _e("set"),
      delete: _e("delete"),
      clear: _e("clear")
    } : {
      add(r) {
        !t && !D(r) && !L(r) && (r = h(r));
        const o = h(this);
        return he(o).has.call(o, r) || (o.add(r), H(o, "add", r, r)), this;
      },
      set(r, o) {
        !t && !D(o) && !L(o) && (o = h(o));
        const i = h(this), { has: c, get: a } = he(i);
        let f = c.call(i, r);
        f ? process.env.NODE_ENV !== "production" && pt(i, c, r) : (r = h(r), f = c.call(i, r));
        const d = a.call(i, r);
        return i.set(r, o), f ? B(o, d) && H(i, "set", r, o, d) : H(i, "add", r, o), this;
      },
      delete(r) {
        const o = h(this), { has: i, get: c } = he(o);
        let a = i.call(o, r);
        a ? process.env.NODE_ENV !== "production" && pt(o, i, r) : (r = h(r), a = i.call(o, r));
        const f = c ? c.call(o, r) : void 0, d = o.delete(r);
        return a && H(o, "delete", r, void 0, f), d;
      },
      clear() {
        const r = h(this), o = r.size !== 0, i = process.env.NODE_ENV !== "production" ? k(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
        return o && H(
          r,
          "clear",
          void 0,
          void 0,
          i
        ), c;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((r) => {
    n[r] = Cn(r, e, t);
  }), n;
}
function st(e, t) {
  const n = In(e, t);
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    w(n, r) && r in s ? n : s,
    r,
    o
  );
}
const Pn = {
  get: /* @__PURE__ */ st(!1, !1)
}, $n = {
  get: /* @__PURE__ */ st(!0, !1)
}, An = {
  get: /* @__PURE__ */ st(!0, !0)
};
function pt(e, t, n) {
  const s = h(n);
  if (s !== n && t.call(e, s)) {
    const r = bt(e);
    K(
      `Reactive ${r} contains both the raw and reactive versions of the same object${r === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Vt = /* @__PURE__ */ new WeakMap(), Mn = /* @__PURE__ */ new WeakMap(), Rt = /* @__PURE__ */ new WeakMap(), Tt = /* @__PURE__ */ new WeakMap();
function Fn(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function jn(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Fn(bt(e));
}
function Ct(e) {
  return L(e) ? e : ot(
    e,
    !1,
    Vn,
    Pn,
    Vt
  );
}
function It(e) {
  return ot(
    e,
    !0,
    Rn,
    $n,
    Rt
  );
}
function ge(e) {
  return ot(
    e,
    !0,
    Tn,
    An,
    Tt
  );
}
function ot(e, t, n, s, r) {
  if (!v(e))
    return process.env.NODE_ENV !== "production" && K(
      `value cannot be made ${t ? "readonly" : "reactive"}: ${String(
        e
      )}`
    ), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = jn(e);
  if (i === 0)
    return e;
  const c = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, c), c;
}
function ee(e) {
  return L(e) ? ee(e.__v_raw) : !!(e && e.__v_isReactive);
}
function L(e) {
  return !!(e && e.__v_isReadonly);
}
function D(e) {
  return !!(e && e.__v_isShallow);
}
function Oe(e) {
  return e ? !!e.__v_raw : !1;
}
function h(e) {
  const t = e && e.__v_raw;
  return t ? h(t) : e;
}
function Hn(e) {
  return !w(e, "__v_skip") && Object.isExtensible(e) && pn(e, "__v_skip", !0), e;
}
const y = (e) => v(e) ? Ct(e) : e, Ye = (e) => v(e) ? It(e) : e;
function x(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function Wn(e) {
  return x(e) ? e.value : e;
}
const Kn = {
  get: (e, t, n) => t === "__v_raw" ? e : Wn(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return x(r) && !x(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ln(e) {
  return ee(e) ? e : new Proxy(e, Kn);
}
const me = {}, Se = /* @__PURE__ */ new WeakMap();
let z;
function Un(e, t = !1, n = z) {
  if (n) {
    let s = Se.get(n);
    s || Se.set(n, s = []), s.push(e);
  } else process.env.NODE_ENV !== "production" && !t && K(
    "onWatcherCleanup() was called when there was no active watcher to associate with."
  );
}
function zn(e, t, n = C) {
  const { immediate: s, deep: r, once: o, scheduler: i, augmentJob: c, call: a } = n, f = (_) => {
    (n.onWarn || K)(
      "Invalid watch source: ",
      _,
      "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types."
    );
  }, d = (_) => r ? _ : D(_) || r === !1 || r === 0 ? W(_, 1) : W(_);
  let l, u, p, b, R = !1, pe = !1;
  if (x(e) ? (u = () => e.value, R = D(e)) : ee(e) ? (u = () => d(e), R = !0) : m(e) ? (pe = !0, R = e.some((_) => ee(_) || D(_)), u = () => e.map((_) => {
    if (x(_))
      return _.value;
    if (ee(_))
      return d(_);
    if (O(_))
      return a ? a(_, 2) : _();
    process.env.NODE_ENV !== "production" && f(_);
  })) : O(e) ? t ? u = a ? () => a(e, 2) : e : u = () => {
    if (p) {
      Ce();
      try {
        p();
      } finally {
        Ie();
      }
    }
    const _ = z;
    z = l;
    try {
      return a ? a(e, 3, [b]) : e(b);
    } finally {
      z = _;
    }
  } : (u = Z, process.env.NODE_ENV !== "production" && f(e)), t && r) {
    const _ = u, $ = r === !0 ? 1 / 0 : r;
    u = () => W(_(), $);
  }
  const q = () => {
    l.stop();
  };
  if (o && t) {
    const _ = t;
    t = (...$) => {
      _(...$), q();
    };
  }
  let U = pe ? new Array(e.length).fill(me) : me;
  const re = (_) => {
    if (!(!(l.flags & 1) || !l.dirty && !_))
      if (t) {
        const $ = l.run();
        if (r || R || (pe ? $.some((Ae, de) => B(Ae, U[de])) : B($, U))) {
          p && p();
          const Ae = z;
          z = l;
          try {
            const de = [
              $,
              // pass undefined as the old value when it's changed for the first time
              U === me ? void 0 : pe && U[0] === me ? [] : U,
              b
            ];
            a ? a(t, 3, de) : (
              // @ts-expect-error
              t(...de)
            ), U = $;
          } finally {
            z = Ae;
          }
        }
      } else
        l.run();
  };
  return c && c(re), l = new mn(u), l.scheduler = i ? () => i(re, !1) : re, b = (_) => Un(_, !1, l), p = l.onStop = () => {
    const _ = Se.get(l);
    if (_) {
      if (a)
        a(_, 4);
      else
        for (const $ of _) $();
      Se.delete(l);
    }
  }, process.env.NODE_ENV !== "production" && (l.onTrack = n.onTrack, l.onTrigger = n.onTrigger), t ? s ? re(!0) : U = l.run() : i ? i(re.bind(null, !0), !0) : l.run(), q.pause = l.pause.bind(l), q.resume = l.resume.bind(l), q.stop = q, q;
}
function W(e, t = 1 / 0, n) {
  if (t <= 0 || !v(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, x(e))
    W(e.value, t, n);
  else if (m(e))
    for (let s = 0; s < e.length; s++)
      W(e[s], t, n);
  else if (on(e) || k(e))
    e.forEach((s) => {
      W(s, t, n);
    });
  else if (an(e)) {
    for (const s in e)
      W(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && W(e[s], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Y = [];
function Bn(e) {
  Y.push(e);
}
function Jn() {
  Y.pop();
}
let He = !1;
function E(e, ...t) {
  if (He) return;
  He = !0, Ce();
  const n = Y.length ? Y[Y.length - 1].component : null, s = n && n.appContext.config.warnHandler, r = Yn();
  if (s)
    Pe(
      s,
      n,
      11,
      [
        // eslint-disable-next-line no-restricted-syntax
        e + t.map((o) => {
          var i, c;
          return (c = (i = o.toString) == null ? void 0 : i.call(o)) != null ? c : JSON.stringify(o);
        }).join(""),
        n && n.proxy,
        r.map(
          ({ vnode: o }) => `at <${Zt(n, o.type)}>`
        ).join(`
`),
        r
      ]
    );
  else {
    const o = [`[Vue warn]: ${e}`, ...t];
    r.length && o.push(`
`, ...qn(r)), console.warn(...o);
  }
  Ie(), He = !1;
}
function Yn() {
  let e = Y[Y.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function qn(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Gn(n));
  }), t;
}
function Gn({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, r = ` at <${Zt(
    e.component,
    e.type,
    s
  )}`, o = ">" + n;
  return e.props ? [r, ...Qn(e.props), o] : [r + o];
}
function Qn(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...Pt(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function Pt(e, t, n) {
  return A(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : x(t) ? (t = Pt(e, h(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : O(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = h(t), n ? t : [`${e}=`, t]);
}
const $t = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  0: "setup function",
  1: "render function",
  2: "watcher getter",
  3: "watcher callback",
  4: "watcher cleanup function",
  5: "native event handler",
  6: "component event handler",
  7: "vnode hook",
  8: "directive hook",
  9: "transition hook",
  10: "app errorHandler",
  11: "app warnHandler",
  12: "ref function",
  13: "async component loader",
  14: "scheduler flush",
  15: "component update",
  16: "app unmount cleanup function"
};
function Pe(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    it(r, t, n);
  }
}
function At(e, t, n, s) {
  if (O(e)) {
    const r = Pe(e, t, n, s);
    return r && cn(r) && r.catch((o) => {
      it(o, t, n);
    }), r;
  }
  if (m(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++)
      r.push(At(e[o], t, n, s));
    return r;
  } else process.env.NODE_ENV !== "production" && E(
    `Invalid value type passed to callWithAsyncErrorHandling(): ${typeof e}`
  );
}
function it(e, t, n, s = !0) {
  const r = t ? t.vnode : null, { errorHandler: o, throwUnhandledErrorInProduction: i } = t && t.appContext.config || C;
  if (t) {
    let c = t.parent;
    const a = t.proxy, f = process.env.NODE_ENV !== "production" ? $t[n] : `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; c; ) {
      const d = c.ec;
      if (d) {
        for (let l = 0; l < d.length; l++)
          if (d[l](e, a, f) === !1)
            return;
      }
      c = c.parent;
    }
    if (o) {
      Ce(), Pe(o, null, 10, [
        e,
        a,
        f
      ]), Ie();
      return;
    }
  }
  Xn(e, n, r, s, i);
}
function Xn(e, t, n, s = !0, r = !1) {
  if (process.env.NODE_ENV !== "production") {
    const o = $t[t];
    if (n && Bn(n), E(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && Jn(), s)
      throw e;
    console.error(e);
  } else {
    if (r)
      throw e;
    console.error(e);
  }
}
const T = [];
let F = -1;
const te = [];
let j = null, Q = 0;
const Mt = /* @__PURE__ */ Promise.resolve();
let ve = null;
const Zn = 100;
function kn(e) {
  const t = ve || Mt;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function er(e) {
  let t = F + 1, n = T.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = T[s], o = ue(r);
    o < e || o === e && r.flags & 2 ? t = s + 1 : n = s;
  }
  return t;
}
function ct(e) {
  if (!(e.flags & 1)) {
    const t = ue(e), n = T[T.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= ue(n) ? T.push(e) : T.splice(er(t), 0, e), e.flags |= 1, Ft();
  }
}
function Ft() {
  ve || (ve = Mt.then(Ht));
}
function jt(e) {
  m(e) ? te.push(...e) : j && e.id === -1 ? j.splice(Q + 1, 0, e) : e.flags & 1 || (te.push(e), e.flags |= 1), Ft();
}
function tr(e) {
  if (te.length) {
    const t = [...new Set(te)].sort(
      (n, s) => ue(n) - ue(s)
    );
    if (te.length = 0, j) {
      j.push(...t);
      return;
    }
    for (j = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Q = 0; Q < j.length; Q++) {
      const n = j[Q];
      process.env.NODE_ENV !== "production" && Wt(e, n) || (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2);
    }
    j = null, Q = 0;
  }
}
const ue = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function Ht(e) {
  process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map());
  const t = process.env.NODE_ENV !== "production" ? (n) => Wt(e, n) : Z;
  try {
    for (F = 0; F < T.length; F++) {
      const n = T[F];
      if (n && !(n.flags & 8)) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        n.flags & 4 && (n.flags &= -2), Pe(
          n,
          n.i,
          n.i ? 15 : 14
        ), n.flags & 4 || (n.flags &= -2);
      }
    }
  } finally {
    for (; F < T.length; F++) {
      const n = T[F];
      n && (n.flags &= -2);
    }
    F = -1, T.length = 0, tr(e), ve = null, (T.length || te.length) && Ht(e);
  }
}
function Wt(e, t) {
  const n = e.get(t) || 0;
  if (n > Zn) {
    const s = t.i, r = s && Xt(s.type);
    return it(
      `Maximum recursive updates exceeded${r ? ` in component <${r}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`,
      null,
      10
    ), !0;
  }
  return e.set(t, n + 1), !1;
}
const We = /* @__PURE__ */ new Map();
process.env.NODE_ENV !== "production" && (Te().__VUE_HMR_RUNTIME__ = {
  createRecord: Ke(nr),
  rerender: Ke(rr),
  reload: Ke(sr)
});
const xe = /* @__PURE__ */ new Map();
function nr(e, t) {
  return xe.has(e) ? !1 : (xe.set(e, {
    initialDef: ye(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function ye(e) {
  return kt(e) ? e.__vccOpts : e;
}
function rr(e, t) {
  const n = xe.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, ye(s.type).render = t), s.renderCache = [], s.update();
  }));
}
function sr(e, t) {
  const n = xe.get(e);
  if (!n) return;
  t = ye(t), dt(n.initialDef, t);
  const s = [...n.instances];
  for (let r = 0; r < s.length; r++) {
    const o = s[r], i = ye(o.type);
    let c = We.get(i);
    c || (i !== n.initialDef && dt(i, t), We.set(i, c = /* @__PURE__ */ new Set())), c.add(o), o.appContext.propsCache.delete(o.type), o.appContext.emitsCache.delete(o.type), o.appContext.optionsCache.delete(o.type), o.ceReload ? (c.add(o), o.ceReload(t.styles), c.delete(o)) : o.parent ? ct(() => {
      o.parent.update(), c.delete(o);
    }) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn(
      "[HMR] Root or manually mounted instance modified. Full reload required."
    ), o.root.ce && o !== o.root && o.root.ce._removeChildStyle(i);
  }
  jt(() => {
    We.clear();
  });
}
function dt(e, t) {
  V(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Ke(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn(
        "[HMR] Something went wrong during Vue component hot-reload. Full reload required."
      );
    }
  };
}
let X, Ee = [];
function Kt(e, t) {
  var n, s;
  X = e, X ? (X.enabled = !0, Ee.forEach(({ event: r, args: o }) => X.emit(r, ...o)), Ee = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  // eslint-disable-next-line no-restricted-syntax
  !((s = (n = window.navigator) == null ? void 0 : n.userAgent) != null && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((o) => {
    Kt(o, t);
  }), setTimeout(() => {
    X || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Ee = []);
  }, 3e3)) : Ee = [];
}
let ne = null, or = null;
const ir = (e) => e.__isTeleport;
function Lt(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Lt(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
Te().requestIdleCallback;
Te().cancelIdleCallback;
const cr = Symbol.for("v-ndc"), qe = (e) => e ? Ar(e) ? Mr(e) : qe(e.parent) : null, le = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ V(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => process.env.NODE_ENV !== "production" ? ge(e.props) : e.props,
    $attrs: (e) => process.env.NODE_ENV !== "production" ? ge(e.attrs) : e.attrs,
    $slots: (e) => process.env.NODE_ENV !== "production" ? ge(e.slots) : e.slots,
    $refs: (e) => process.env.NODE_ENV !== "production" ? ge(e.refs) : e.refs,
    $parent: (e) => qe(e.parent),
    $root: (e) => qe(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => ar(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      ct(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = kn.bind(e.proxy)),
    $watch: (e) => wr.bind(e)
  })
), Le = (e, t) => e !== C && !e.__isScriptSetup && w(e, t), lr = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: c, appContext: a } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let f;
    if (t[0] !== "$") {
      const p = i[t];
      if (p !== void 0)
        switch (p) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Le(s, t))
          return i[t] = 1, s[t];
        if (r !== C && w(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (f = e.propsOptions[0]) && w(f, t)
        )
          return i[t] = 3, o[t];
        if (n !== C && w(n, t))
          return i[t] = 4, n[t];
        i[t] = 0;
      }
    }
    const d = le[t];
    let l, u;
    if (d)
      return t === "$attrs" ? (N(e.attrs, "get", ""), process.env.NODE_ENV !== "production" && void 0) : process.env.NODE_ENV !== "production" && t === "$slots" && N(e, "get", t), d(e);
    if (
      // css module (injected by vue-loader)
      (l = c.__cssModules) && (l = l[t])
    )
      return l;
    if (n !== C && w(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      u = a.config.globalProperties, w(u, t)
    )
      return u[t];
    process.env.NODE_ENV;
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Le(r, t) ? (r[t] = n, !0) : process.env.NODE_ENV !== "production" && r.__isScriptSetup && w(r, t) ? (E(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== C && w(s, t) ? (s[t] = n, !0) : w(e.props, t) ? (process.env.NODE_ENV !== "production" && E(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && E(
      `Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`
    ), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(o, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let c;
    return !!n[i] || e !== C && w(e, i) || Le(t, i) || (c = o[0]) && w(c, i) || w(s, i) || w(le, i) || w(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : w(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (lr.ownKeys = (e) => (E(
  "Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."
), Reflect.ownKeys(e)));
function ht(e) {
  return m(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function ar(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, c = o.get(t);
  let a;
  return c ? a = c : !r.length && !n && !s ? a = t : (a = {}, r.length && r.forEach(
    (f) => De(a, f, i, !0)
  ), De(a, t, i)), v(t) && o.set(t, a), a;
}
function De(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && De(e, o, n, !0), r && r.forEach(
    (i) => De(e, i, n, !0)
  );
  for (const i in t)
    if (s && i === "expose")
      process.env.NODE_ENV !== "production" && E(
        '"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.'
      );
    else {
      const c = ur[i] || n && n[i];
      e[i] = c ? c(e[i], t[i]) : t[i];
    }
  return e;
}
const ur = {
  data: _t,
  props: mt,
  emits: mt,
  // objects
  methods: oe,
  computed: oe,
  // lifecycle
  beforeCreate: S,
  created: S,
  beforeMount: S,
  mounted: S,
  beforeUpdate: S,
  updated: S,
  beforeDestroy: S,
  beforeUnmount: S,
  destroyed: S,
  unmounted: S,
  activated: S,
  deactivated: S,
  errorCaptured: S,
  serverPrefetch: S,
  // assets
  components: oe,
  directives: oe,
  // watch
  watch: pr,
  // provide / inject
  provide: _t,
  inject: fr
};
function _t(e, t) {
  return t ? e ? function() {
    return V(
      O(e) ? e.call(this, this) : e,
      O(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function fr(e, t) {
  return oe(gt(e), gt(t));
}
function gt(e) {
  if (m(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function S(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function oe(e, t) {
  return e ? V(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function mt(e, t) {
  return e ? m(e) && m(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : V(
    /* @__PURE__ */ Object.create(null),
    ht(e),
    ht(t ?? {})
  ) : t;
}
function pr(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = V(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = S(e[s], t[s]);
  return n;
}
let dr = null;
function hr(e, t, n = !1) {
  const s = $e || ne;
  if (s || dr) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : void 0;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && O(t) ? t.call(s && s.proxy) : t;
    process.env.NODE_ENV !== "production" && E(`injection "${String(e)}" not found.`);
  } else process.env.NODE_ENV !== "production" && E("inject() can only be used inside setup() or functional components.");
}
const _r = {}, Ut = (e) => Object.getPrototypeOf(e) === _r, gr = Sr, mr = Symbol.for("v-scx"), Er = () => {
  {
    const e = hr(mr);
    return e || process.env.NODE_ENV !== "production" && E(
      "Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."
    ), e;
  }
};
function br(e, t, n = C) {
  const { immediate: s, deep: r, flush: o, once: i } = n;
  process.env.NODE_ENV !== "production" && !t && (s !== void 0 && E(
    'watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'
  ), r !== void 0 && E(
    'watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'
  ), i !== void 0 && E(
    'watch() "once" option is only respected when using the watch(source, callback, options?) signature.'
  ));
  const c = V({}, n);
  process.env.NODE_ENV !== "production" && (c.onWarn = E);
  const a = t && s || !t && o !== "post";
  let f;
  if (Qe) {
    if (o === "sync") {
      const p = Er();
      f = p.__watcherHandles || (p.__watcherHandles = []);
    } else if (!a) {
      const p = () => {
      };
      return p.stop = Z, p.resume = Z, p.pause = Z, p;
    }
  }
  const d = $e;
  c.call = (p, b, R) => At(p, d, b, R);
  let l = !1;
  o === "post" ? c.scheduler = (p) => {
    gr(p, d && d.suspense);
  } : o !== "sync" && (l = !0, c.scheduler = (p, b) => {
    b ? p() : ct(p);
  }), c.augmentJob = (p) => {
    t && (p.flags |= 4), l && (p.flags |= 2, d && (p.id = d.uid, p.i = d));
  };
  const u = zn(e, t, c);
  return Qe && (f ? f.push(u) : a && u()), u;
}
function wr(e, t, n) {
  const s = this.proxy, r = A(e) ? e.includes(".") ? Nr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  O(t) ? o = t : (o = t.handler, n = t);
  const i = $r(this), c = br(r, o.bind(s), n);
  return i(), c;
}
function Nr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
const Or = (e) => e.__isSuspense;
function Sr(e, t) {
  t && t.pendingBranch ? m(e) ? t.effects.push(...e) : t.effects.push(e) : jt(e);
}
const zt = Symbol.for("v-fgt"), vr = Symbol.for("v-txt"), xr = Symbol.for("v-cmt"), be = [];
let I = null;
function Bt(e = !1) {
  be.push(I = e ? null : []);
}
function yr() {
  be.pop(), I = be[be.length - 1] || null;
}
function Dr(e) {
  return e.dynamicChildren = I || nn, yr(), I && I.push(e), e;
}
function Jt(e, t, n, s, r, o) {
  return Dr(
    qt(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Vr(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
const Rr = (...e) => Gt(
  ...e
), Yt = ({ key: e }) => e ?? null, we = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? A(e) || x(e) || O(e) ? { i: ne, r: e, k: t, f: !!n } : e : null);
function qt(e, t = null, n = null, s = 0, r = null, o = e === zt ? 0 : 1, i = !1, c = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Yt(t),
    ref: t && we(t),
    scopeId: or,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: ne
  };
  return c ? (lt(a, n), o & 128 && e.normalize(a)) : n && (a.shapeFlag |= A(n) ? 8 : 16), process.env.NODE_ENV !== "production" && a.key !== a.key && E("VNode created with invalid key (NaN). VNode type:", a.type), // avoid a block node from tracking itself
  !i && // has current parent block
  I && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && I.push(a), a;
}
const Tr = process.env.NODE_ENV !== "production" ? Rr : Gt;
function Gt(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === cr) && (process.env.NODE_ENV !== "production" && !e && E(`Invalid vnode type when creating vnode: ${e}.`), e = xr), Vr(e)) {
    const c = Ve(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && lt(c, n), !o && I && (c.shapeFlag & 6 ? I[I.indexOf(e)] = c : I.push(c)), c.patchFlag = -2, c;
  }
  if (kt(e) && (e = e.__vccOpts), t) {
    t = Cr(t);
    let { class: c, style: a } = t;
    c && !A(c) && (t.class = ke(c)), v(a) && (Oe(a) && !m(a) && (a = V({}, a)), t.style = Ze(a));
  }
  const i = A(e) ? 1 : Or(e) ? 128 : ir(e) ? 64 : v(e) ? 4 : O(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && i & 4 && Oe(e) && (e = h(e), E(
    "Vue received a Component that was made a reactive object. This can lead to unnecessary performance overhead and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.",
    `
Component that was made reactive: `,
    e
  )), qt(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function Cr(e) {
  return e ? Oe(e) || Ut(e) ? V({}, e) : e : null;
}
function Ve(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: c, transition: a } = e, f = t ? Pr(r || {}, t) : r, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: f,
    key: f && Yt(f),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? m(o) ? o.concat(we(t)) : [o, we(t)] : we(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && i === -1 && m(c) ? c.map(Qt) : c,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== zt ? i === -1 ? 16 : i | 16 : i,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ve(e.ssContent),
    ssFallback: e.ssFallback && Ve(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && s && Lt(
    d,
    a.clone(d)
  ), d;
}
function Qt(e) {
  const t = Ve(e);
  return m(e.children) && (t.children = e.children.map(Qt)), t;
}
function Ir(e = " ", t = 0) {
  return Tr(vr, null, e, t);
}
function lt(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (m(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), lt(e, r()), r._c && (r._d = !0));
      return;
    } else
      n = 32, !t._ && !Ut(t) && (t._ctx = ne);
  else O(t) ? (t = { default: t, _ctx: ne }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [Ir(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Pr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = ke([t.class, s.class]));
      else if (r === "style")
        t.style = Ze([t.style, s.style]);
      else if (rn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(m(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
let $e = null, Ge;
{
  const e = Te(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  Ge = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => $e = n
  ), t(
    "__VUE_SSR_SETTERS__",
    (n) => Qe = n
  );
}
const $r = (e) => {
  const t = $e;
  return Ge(e), e.scope.on(), () => {
    e.scope.off(), Ge(t);
  };
};
function Ar(e) {
  return e.vnode.shapeFlag & 4;
}
let Qe = !1;
process.env.NODE_ENV;
function Mr(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(Ln(Hn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in le)
        return le[n](e);
    },
    has(t, n) {
      return n in t || n in le;
    }
  })) : e.proxy;
}
const Fr = /(?:^|[-_])(\w)/g, jr = (e) => e.replace(Fr, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Xt(e, t = !0) {
  return O(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Zt(e, t, n = !1) {
  let s = Xt(t);
  if (!s && t.__file) {
    const r = t.__file.match(/([^/\\]+)\.\w+$/);
    r && (s = r[1]);
  }
  if (!s && e && e.parent) {
    const r = (o) => {
      for (const i in o)
        if (o[i] === t)
          return i;
    };
    s = r(
      e.components || e.parent.type.components
    ) || r(e.appContext.components);
  }
  return s ? jr(s) : n ? "App" : "Anonymous";
}
function kt(e) {
  return O(e) && "__vccOpts" in e;
}
function Hr() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#1677ff" }, n = { style: "color:#f5222d" }, s = { style: "color:#eb2f96" }, r = {
    __vue_custom_formatter: !0,
    header(l) {
      return v(l) ? l.__isVue ? ["div", e, "VueInstance"] : x(l) ? [
        "div",
        {},
        ["span", e, d(l)],
        "<",
        // avoid debugger accessing value affecting behavior
        c("_value" in l ? l._value : l),
        ">"
      ] : ee(l) ? [
        "div",
        {},
        ["span", e, D(l) ? "ShallowReactive" : "Reactive"],
        "<",
        c(l),
        `>${L(l) ? " (readonly)" : ""}`
      ] : L(l) ? [
        "div",
        {},
        ["span", e, D(l) ? "ShallowReadonly" : "Readonly"],
        "<",
        c(l),
        ">"
      ] : null : null;
    },
    hasBody(l) {
      return l && l.__isVue;
    },
    body(l) {
      if (l && l.__isVue)
        return [
          "div",
          {},
          ...o(l.$)
        ];
    }
  };
  function o(l) {
    const u = [];
    l.type.props && l.props && u.push(i("props", h(l.props))), l.setupState !== C && u.push(i("setup", l.setupState)), l.data !== C && u.push(i("data", h(l.data)));
    const p = a(l, "computed");
    p && u.push(i("computed", p));
    const b = a(l, "inject");
    return b && u.push(i("injected", b)), u.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: l }]
    ]), u;
  }
  function i(l, u) {
    return u = V({}, u), Object.keys(u).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        l
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(u).map((p) => [
          "div",
          {},
          ["span", s, p + ": "],
          c(u[p], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function c(l, u = !0) {
    return typeof l == "number" ? ["span", t, l] : typeof l == "string" ? ["span", n, JSON.stringify(l)] : typeof l == "boolean" ? ["span", s, l] : v(l) ? ["object", { object: u ? h(l) : l }] : ["span", n, String(l)];
  }
  function a(l, u) {
    const p = l.type;
    if (O(p))
      return;
    const b = {};
    for (const R in l.ctx)
      f(p, R, u) && (b[R] = l.ctx[R]);
    return b;
  }
  function f(l, u, p) {
    const b = l[p];
    if (m(b) && b.includes(u) || v(b) && u in b || l.extends && f(l.extends, u, p) || l.mixins && l.mixins.some((R) => f(R, u, p)))
      return !0;
  }
  function d(l) {
    return D(l) ? "ShallowRef" : l.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(r) : window.devtoolsFormatters = [r];
}
process.env.NODE_ENV;
process.env.NODE_ENV;
process.env.NODE_ENV;
/**
* vue v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Wr() {
  Hr();
}
process.env.NODE_ENV !== "production" && Wr();
const en = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, Kr = {};
function Lr(e, t) {
  return Bt(), Jt("div", null, "test1");
}
const Ur = /* @__PURE__ */ en(Kr, [["render", Lr]]), zr = {};
function Br(e, t) {
  return Bt(), Jt("div", null, "test2");
}
const Jr = /* @__PURE__ */ en(zr, [["render", Br]]);
let Et = { test: Ur, test2: Jr };
const Yr = {
  install(e) {
    Object.keys(Et).forEach((t) => {
      e.component(t, Et[t]);
    });
  }
};
export {
  Yr as default,
  Ur as test,
  Jr as test2
};
