var z = { exports: {} }, ie;
function nt() {
  return ie || (ie = 1, function(t) {
    var e = Object.prototype.hasOwnProperty, _ = "~";
    function r() {
    }
    Object.create && (r.prototype = /* @__PURE__ */ Object.create(null), new r().__proto__ || (_ = !1));
    function i(c, u, f) {
      this.fn = c, this.context = u, this.once = f || !1;
    }
    function o(c, u, f, n, h) {
      if (typeof f != "function")
        throw new TypeError("The listener must be a function");
      var a = new i(f, n || c, h), v = _ ? _ + u : u;
      return c._events[v] ? c._events[v].fn ? c._events[v] = [c._events[v], a] : c._events[v].push(a) : (c._events[v] = a, c._eventsCount++), c;
    }
    function l(c, u) {
      --c._eventsCount === 0 ? c._events = new r() : delete c._events[u];
    }
    function s() {
      this._events = new r(), this._eventsCount = 0;
    }
    s.prototype.eventNames = function() {
      var u = [], f, n;
      if (this._eventsCount === 0) return u;
      for (n in f = this._events)
        e.call(f, n) && u.push(_ ? n.slice(1) : n);
      return Object.getOwnPropertySymbols ? u.concat(Object.getOwnPropertySymbols(f)) : u;
    }, s.prototype.listeners = function(u) {
      var f = _ ? _ + u : u, n = this._events[f];
      if (!n) return [];
      if (n.fn) return [n.fn];
      for (var h = 0, a = n.length, v = new Array(a); h < a; h++)
        v[h] = n[h].fn;
      return v;
    }, s.prototype.listenerCount = function(u) {
      var f = _ ? _ + u : u, n = this._events[f];
      return n ? n.fn ? 1 : n.length : 0;
    }, s.prototype.emit = function(u, f, n, h, a, v) {
      var w = _ ? _ + u : u;
      if (!this._events[w]) return !1;
      var p = this._events[w], d = arguments.length, m, g;
      if (p.fn) {
        switch (p.once && this.removeListener(u, p.fn, void 0, !0), d) {
          case 1:
            return p.fn.call(p.context), !0;
          case 2:
            return p.fn.call(p.context, f), !0;
          case 3:
            return p.fn.call(p.context, f, n), !0;
          case 4:
            return p.fn.call(p.context, f, n, h), !0;
          case 5:
            return p.fn.call(p.context, f, n, h, a), !0;
          case 6:
            return p.fn.call(p.context, f, n, h, a, v), !0;
        }
        for (g = 1, m = new Array(d - 1); g < d; g++)
          m[g - 1] = arguments[g];
        p.fn.apply(p.context, m);
      } else {
        var x = p.length, C;
        for (g = 0; g < x; g++)
          switch (p[g].once && this.removeListener(u, p[g].fn, void 0, !0), d) {
            case 1:
              p[g].fn.call(p[g].context);
              break;
            case 2:
              p[g].fn.call(p[g].context, f);
              break;
            case 3:
              p[g].fn.call(p[g].context, f, n);
              break;
            case 4:
              p[g].fn.call(p[g].context, f, n, h);
              break;
            default:
              if (!m) for (C = 1, m = new Array(d - 1); C < d; C++)
                m[C - 1] = arguments[C];
              p[g].fn.apply(p[g].context, m);
          }
      }
      return !0;
    }, s.prototype.on = function(u, f, n) {
      return o(this, u, f, n, !1);
    }, s.prototype.once = function(u, f, n) {
      return o(this, u, f, n, !0);
    }, s.prototype.removeListener = function(u, f, n, h) {
      var a = _ ? _ + u : u;
      if (!this._events[a]) return this;
      if (!f)
        return l(this, a), this;
      var v = this._events[a];
      if (v.fn)
        v.fn === f && (!h || v.once) && (!n || v.context === n) && l(this, a);
      else {
        for (var w = 0, p = [], d = v.length; w < d; w++)
          (v[w].fn !== f || h && !v[w].once || n && v[w].context !== n) && p.push(v[w]);
        p.length ? this._events[a] = p.length === 1 ? p[0] : p : l(this, a);
      }
      return this;
    }, s.prototype.removeAllListeners = function(u) {
      var f;
      return u ? (f = _ ? _ + u : u, this._events[f] && l(this, f)) : (this._events = new r(), this._eventsCount = 0), this;
    }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = _, s.EventEmitter = s, t.exports = s;
  }(z)), z.exports;
}
var O, b, ye, ge, H, ue, be, ke, we, Z, J, K, xe, F = {}, Ce = [], We = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, W = Array.isArray;
function E(t, e) {
  for (var _ in e) t[_] = e[_];
  return t;
}
function ee(t) {
  t && t.parentNode && t.parentNode.removeChild(t);
}
function Q(t, e, _) {
  var r, i, o, l = {};
  for (o in e) o == "key" ? r = e[o] : o == "ref" ? i = e[o] : l[o] = e[o];
  if (arguments.length > 2 && (l.children = arguments.length > 3 ? O.call(arguments, 2) : _), typeof t == "function" && t.defaultProps != null) for (o in t.defaultProps) l[o] === void 0 && (l[o] = t.defaultProps[o]);
  return D(t, l, r, i, null);
}
function D(t, e, _, r, i) {
  var o = { type: t, props: e, key: _, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: i ?? ++ye, __i: -1, __u: 0 };
  return i == null && b.vnode != null && b.vnode(o), o;
}
function je() {
  return { current: null };
}
function j(t) {
  return t.children;
}
function M(t, e) {
  this.props = t, this.context = e;
}
function T(t, e) {
  if (e == null) return t.__ ? T(t.__, t.__i + 1) : null;
  for (var _; e < t.__k.length; e++) if ((_ = t.__k[e]) != null && _.__e != null) return _.__e;
  return typeof t.type == "function" ? T(t) : null;
}
function $e(t) {
  var e, _;
  if ((t = t.__) != null && t.__c != null) {
    for (t.__e = t.__c.base = null, e = 0; e < t.__k.length; e++) if ((_ = t.__k[e]) != null && _.__e != null) {
      t.__e = t.__c.base = _.__e;
      break;
    }
    return $e(t);
  }
}
function X(t) {
  (!t.__d && (t.__d = !0) && H.push(t) && !B.__r++ || ue != b.debounceRendering) && ((ue = b.debounceRendering) || be)(B);
}
function B() {
  for (var t, e, _, r, i, o, l, s = 1; H.length; ) H.length > s && H.sort(ke), t = H.shift(), s = H.length, t.__d && (_ = void 0, i = (r = (e = t).__v).__e, o = [], l = [], e.__P && ((_ = E({}, r)).__v = r.__v + 1, b.vnode && b.vnode(_), te(e.__P, _, r, e.__n, e.__P.namespaceURI, 32 & r.__u ? [i] : null, o, i ?? T(r), !!(32 & r.__u), l), _.__v = r.__v, _.__.__k[_.__i] = _, Se(o, _, l), _.__e != i && $e(_)));
  B.__r = 0;
}
function Ee(t, e, _, r, i, o, l, s, c, u, f) {
  var n, h, a, v, w, p, d = r && r.__k || Ce, m = e.length;
  for (c = Re(_, e, d, c, m), n = 0; n < m; n++) (a = _.__k[n]) != null && (h = a.__i == -1 ? F : d[a.__i] || F, a.__i = n, p = te(t, a, h, i, o, l, s, c, u, f), v = a.__e, a.ref && h.ref != a.ref && (h.ref && _e(h.ref, null, a), f.push(a.ref, a.__c || v, a)), w == null && v != null && (w = v), 4 & a.__u || h.__k === a.__k ? c = Pe(a, c, t) : typeof a.type == "function" && p !== void 0 ? c = p : v && (c = v.nextSibling), a.__u &= -7);
  return _.__e = w, c;
}
function Re(t, e, _, r, i) {
  var o, l, s, c, u, f = _.length, n = f, h = 0;
  for (t.__k = new Array(i), o = 0; o < i; o++) (l = e[o]) != null && typeof l != "boolean" && typeof l != "function" ? (c = o + h, (l = t.__k[o] = typeof l == "string" || typeof l == "number" || typeof l == "bigint" || l.constructor == String ? D(null, l, null, null, null) : W(l) ? D(j, { children: l }, null, null, null) : l.constructor == null && l.__b > 0 ? D(l.type, l.props, l.key, l.ref ? l.ref : null, l.__v) : l).__ = t, l.__b = t.__b + 1, s = null, (u = l.__i = Ie(l, _, c, n)) != -1 && (n--, (s = _[u]) && (s.__u |= 2)), s == null || s.__v == null ? (u == -1 && (i > f ? h-- : i < f && h++), typeof l.type != "function" && (l.__u |= 4)) : u != c && (u == c - 1 ? h-- : u == c + 1 ? h++ : (u > c ? h-- : h++, l.__u |= 4))) : t.__k[o] = null;
  if (n) for (o = 0; o < f; o++) (s = _[o]) != null && (2 & s.__u) == 0 && (s.__e == r && (r = T(s)), Ne(s, s));
  return r;
}
function Pe(t, e, _) {
  var r, i;
  if (typeof t.type == "function") {
    for (r = t.__k, i = 0; r && i < r.length; i++) r[i] && (r[i].__ = t, e = Pe(r[i], e, _));
    return e;
  }
  t.__e != e && (e && t.type && !_.contains(e) && (e = T(t)), _.insertBefore(t.__e, e || null), e = t.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function He(t, e) {
  return e = e || [], t == null || typeof t == "boolean" || (W(t) ? t.some(function(_) {
    He(_, e);
  }) : e.push(t)), e;
}
function Ie(t, e, _, r) {
  var i, o, l = t.key, s = t.type, c = e[_];
  if (c === null && t.key == null || c && l == c.key && s == c.type && (2 & c.__u) == 0) return _;
  if (r > (c != null && (2 & c.__u) == 0 ? 1 : 0)) for (i = _ - 1, o = _ + 1; i >= 0 || o < e.length; ) {
    if (i >= 0) {
      if ((c = e[i]) && (2 & c.__u) == 0 && l == c.key && s == c.type) return i;
      i--;
    }
    if (o < e.length) {
      if ((c = e[o]) && (2 & c.__u) == 0 && l == c.key && s == c.type) return o;
      o++;
    }
  }
  return -1;
}
function le(t, e, _) {
  e[0] == "-" ? t.setProperty(e, _ ?? "") : t[e] = _ == null ? "" : typeof _ != "number" || We.test(e) ? _ : _ + "px";
}
function I(t, e, _, r, i) {
  var o, l;
  e: if (e == "style") if (typeof _ == "string") t.style.cssText = _;
  else {
    if (typeof r == "string" && (t.style.cssText = r = ""), r) for (e in r) _ && e in _ || le(t.style, e, "");
    if (_) for (e in _) r && _[e] == r[e] || le(t.style, e, _[e]);
  }
  else if (e[0] == "o" && e[1] == "n") o = e != (e = e.replace(we, "$1")), l = e.toLowerCase(), e = l in t || e == "onFocusOut" || e == "onFocusIn" ? l.slice(2) : e.slice(2), t.l || (t.l = {}), t.l[e + o] = _, _ ? r ? _.u = r.u : (_.u = Z, t.addEventListener(e, o ? K : J, o)) : t.removeEventListener(e, o ? K : J, o);
  else {
    if (i == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in t) try {
      t[e] = _ ?? "";
      break e;
    } catch {
    }
    typeof _ == "function" || (_ == null || _ === !1 && e[4] != "-" ? t.removeAttribute(e) : t.setAttribute(e, e == "popover" && _ == 1 ? "" : _));
  }
}
function se(t) {
  return function(e) {
    if (this.l) {
      var _ = this.l[e.type + t];
      if (e.t == null) e.t = Z++;
      else if (e.t < _.u) return;
      return _(b.event ? b.event(e) : e);
    }
  };
}
function te(t, e, _, r, i, o, l, s, c, u) {
  var f, n, h, a, v, w, p, d, m, g, x, C, A, oe, R, L, V, $ = e.type;
  if (e.constructor != null) return null;
  128 & _.__u && (c = !!(32 & _.__u), o = [s = e.__e = _.__e]), (f = b.__b) && f(e);
  e: if (typeof $ == "function") try {
    if (d = e.props, m = "prototype" in $ && $.prototype.render, g = (f = $.contextType) && r[f.__c], x = f ? g ? g.props.value : f.__ : r, _.__c ? p = (n = e.__c = _.__c).__ = n.__E : (m ? e.__c = n = new $(d, x) : (e.__c = n = new M(d, x), n.constructor = $, n.render = Be), g && g.sub(n), n.props = d, n.state || (n.state = {}), n.context = x, n.__n = r, h = n.__d = !0, n.__h = [], n._sb = []), m && n.__s == null && (n.__s = n.state), m && $.getDerivedStateFromProps != null && (n.__s == n.state && (n.__s = E({}, n.__s)), E(n.__s, $.getDerivedStateFromProps(d, n.__s))), a = n.props, v = n.state, n.__v = e, h) m && $.getDerivedStateFromProps == null && n.componentWillMount != null && n.componentWillMount(), m && n.componentDidMount != null && n.__h.push(n.componentDidMount);
    else {
      if (m && $.getDerivedStateFromProps == null && d !== a && n.componentWillReceiveProps != null && n.componentWillReceiveProps(d, x), !n.__e && n.shouldComponentUpdate != null && n.shouldComponentUpdate(d, n.__s, x) === !1 || e.__v == _.__v) {
        for (e.__v != _.__v && (n.props = d, n.state = n.__s, n.__d = !1), e.__e = _.__e, e.__k = _.__k, e.__k.some(function(U) {
          U && (U.__ = e);
        }), C = 0; C < n._sb.length; C++) n.__h.push(n._sb[C]);
        n._sb = [], n.__h.length && l.push(n);
        break e;
      }
      n.componentWillUpdate != null && n.componentWillUpdate(d, n.__s, x), m && n.componentDidUpdate != null && n.__h.push(function() {
        n.componentDidUpdate(a, v, w);
      });
    }
    if (n.context = x, n.props = d, n.__P = t, n.__e = !1, A = b.__r, oe = 0, m) {
      for (n.state = n.__s, n.__d = !1, A && A(e), f = n.render(n.props, n.state, n.context), R = 0; R < n._sb.length; R++) n.__h.push(n._sb[R]);
      n._sb = [];
    } else do
      n.__d = !1, A && A(e), f = n.render(n.props, n.state, n.context), n.state = n.__s;
    while (n.__d && ++oe < 25);
    n.state = n.__s, n.getChildContext != null && (r = E(E({}, r), n.getChildContext())), m && !h && n.getSnapshotBeforeUpdate != null && (w = n.getSnapshotBeforeUpdate(a, v)), L = f, f != null && f.type === j && f.key == null && (L = Te(f.props.children)), s = Ee(t, W(L) ? L : [L], e, _, r, i, o, l, s, c, u), n.base = e.__e, e.__u &= -161, n.__h.length && l.push(n), p && (n.__E = n.__ = null);
  } catch (U) {
    if (e.__v = null, c || o != null) if (U.then) {
      for (e.__u |= c ? 160 : 128; s && s.nodeType == 8 && s.nextSibling; ) s = s.nextSibling;
      o[o.indexOf(s)] = null, e.__e = s;
    } else for (V = o.length; V--; ) ee(o[V]);
    else e.__e = _.__e, e.__k = _.__k;
    b.__e(U, e, _);
  }
  else o == null && e.__v == _.__v ? (e.__k = _.__k, e.__e = _.__e) : s = e.__e = qe(_.__e, e, _, r, i, o, l, c, u);
  return (f = b.diffed) && f(e), 128 & e.__u ? void 0 : s;
}
function Se(t, e, _) {
  for (var r = 0; r < _.length; r++) _e(_[r], _[++r], _[++r]);
  b.__c && b.__c(e, t), t.some(function(i) {
    try {
      t = i.__h, i.__h = [], t.some(function(o) {
        o.call(i);
      });
    } catch (o) {
      b.__e(o, i.__v);
    }
  });
}
function Te(t) {
  return typeof t != "object" || t == null || t.__b && t.__b > 0 ? t : W(t) ? t.map(Te) : E({}, t);
}
function qe(t, e, _, r, i, o, l, s, c) {
  var u, f, n, h, a, v, w, p = _.props, d = e.props, m = e.type;
  if (m == "svg" ? i = "http://www.w3.org/2000/svg" : m == "math" ? i = "http://www.w3.org/1998/Math/MathML" : i || (i = "http://www.w3.org/1999/xhtml"), o != null) {
    for (u = 0; u < o.length; u++) if ((a = o[u]) && "setAttribute" in a == !!m && (m ? a.localName == m : a.nodeType == 3)) {
      t = a, o[u] = null;
      break;
    }
  }
  if (t == null) {
    if (m == null) return document.createTextNode(d);
    t = document.createElementNS(i, m, d.is && d), s && (b.__m && b.__m(e, o), s = !1), o = null;
  }
  if (m == null) p === d || s && t.data == d || (t.data = d);
  else {
    if (o = o && O.call(t.childNodes), p = _.props || F, !s && o != null) for (p = {}, u = 0; u < t.attributes.length; u++) p[(a = t.attributes[u]).name] = a.value;
    for (u in p) if (a = p[u], u != "children") {
      if (u == "dangerouslySetInnerHTML") n = a;
      else if (!(u in d)) {
        if (u == "value" && "defaultValue" in d || u == "checked" && "defaultChecked" in d) continue;
        I(t, u, null, a, i);
      }
    }
    for (u in d) a = d[u], u == "children" ? h = a : u == "dangerouslySetInnerHTML" ? f = a : u == "value" ? v = a : u == "checked" ? w = a : s && typeof a != "function" || p[u] === a || I(t, u, a, p[u], i);
    if (f) s || n && (f.__html == n.__html || f.__html == t.innerHTML) || (t.innerHTML = f.__html), e.__k = [];
    else if (n && (t.innerHTML = ""), Ee(e.type == "template" ? t.content : t, W(h) ? h : [h], e, _, r, m == "foreignObject" ? "http://www.w3.org/1999/xhtml" : i, o, l, o ? o[0] : _.__k && T(_, 0), s, c), o != null) for (u = o.length; u--; ) ee(o[u]);
    s || (u = "value", m == "progress" && v == null ? t.removeAttribute("value") : v != null && (v !== t[u] || m == "progress" && !v || m == "option" && v != p[u]) && I(t, u, v, p[u], i), u = "checked", w != null && w != t[u] && I(t, u, w, p[u], i));
  }
  return t;
}
function _e(t, e, _) {
  try {
    if (typeof t == "function") {
      var r = typeof t.__u == "function";
      r && t.__u(), r && e == null || (t.__u = t(e));
    } else t.current = e;
  } catch (i) {
    b.__e(i, _);
  }
}
function Ne(t, e, _) {
  var r, i;
  if (b.unmount && b.unmount(t), (r = t.ref) && (r.current && r.current != t.__e || _e(r, null, e)), (r = t.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (o) {
      b.__e(o, e);
    }
    r.base = r.__P = null;
  }
  if (r = t.__k) for (i = 0; i < r.length; i++) r[i] && Ne(r[i], e, _ || typeof t.type != "function");
  _ || ee(t.__e), t.__c = t.__ = t.__e = void 0;
}
function Be(t, e, _) {
  return this.constructor(t, _);
}
function Ae(t, e, _) {
  var r, i, o, l;
  e == document && (e = document.documentElement), b.__ && b.__(t, e), i = (r = typeof _ == "function") ? null : _ && _.__k || e.__k, o = [], l = [], te(e, t = (!r && _ || e).__k = Q(j, null, [t]), i || F, F, e.namespaceURI, !r && _ ? [_] : i ? null : e.firstChild ? O.call(e.childNodes) : null, o, !r && _ ? _ : i ? i.__e : e.firstChild, r, l), Se(o, t, l);
}
function Le(t, e) {
  Ae(t, e, Le);
}
function Ve(t, e, _) {
  var r, i, o, l, s = E({}, t.props);
  for (o in t.type && t.type.defaultProps && (l = t.type.defaultProps), e) o == "key" ? r = e[o] : o == "ref" ? i = e[o] : s[o] = e[o] === void 0 && l != null ? l[o] : e[o];
  return arguments.length > 2 && (s.children = arguments.length > 3 ? O.call(arguments, 2) : _), D(t.type, s, r || t.key, i || t.ref, null);
}
function ze(t) {
  function e(_) {
    var r, i;
    return this.getChildContext || (r = /* @__PURE__ */ new Set(), (i = {})[e.__c] = this, this.getChildContext = function() {
      return i;
    }, this.componentWillUnmount = function() {
      r = null;
    }, this.shouldComponentUpdate = function(o) {
      this.props.value != o.value && r.forEach(function(l) {
        l.__e = !0, X(l);
      });
    }, this.sub = function(o) {
      r.add(o);
      var l = o.componentWillUnmount;
      o.componentWillUnmount = function() {
        r && r.delete(o), l && l.call(o);
      };
    }), _.children;
  }
  return e.__c = "__cC" + xe++, e.__ = t, e.Provider = e.__l = (e.Consumer = function(_, r) {
    return _.children(r);
  }).contextType = e, e;
}
O = Ce.slice, b = { __e: function(t, e, _, r) {
  for (var i, o, l; e = e.__; ) if ((i = e.__c) && !i.__) try {
    if ((o = i.constructor) && o.getDerivedStateFromError != null && (i.setState(o.getDerivedStateFromError(t)), l = i.__d), i.componentDidCatch != null && (i.componentDidCatch(t, r || {}), l = i.__d), l) return i.__E = i;
  } catch (s) {
    t = s;
  }
  throw t;
} }, ye = 0, ge = function(t) {
  return t != null && t.constructor == null;
}, M.prototype.setState = function(t, e) {
  var _;
  _ = this.__s != null && this.__s != this.state ? this.__s : this.__s = E({}, this.state), typeof t == "function" && (t = t(E({}, _), this.props)), t && E(_, t), t != null && this.__v && (e && this._sb.push(e), X(this));
}, M.prototype.forceUpdate = function(t) {
  this.__v && (this.__e = !0, t && this.__h.push(t), X(this));
}, M.prototype.render = j, H = [], be = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ke = function(t, e) {
  return t.__v.__b - e.__v.__b;
}, B.__r = 0, we = /(PointerCapture)$|Capture$/i, Z = 0, J = se(!1), K = se(!0), xe = 0;
const rt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Component: M,
  Fragment: j,
  cloneElement: Ve,
  createContext: ze,
  createElement: Q,
  createRef: je,
  h: Q,
  hydrate: Le,
  get isValidElement() {
    return ge;
  },
  get options() {
    return b;
  },
  render: Ae,
  toChildArray: He
}, Symbol.toStringTag, { value: "Module" }));
var P, y, G, ce, N = 0, Ue = [], k = b, fe = k.__b, ae = k.__r, pe = k.diffed, he = k.__c, ve = k.unmount, de = k.__;
function S(t, e) {
  k.__h && k.__h(y, t, N || e), N = 0;
  var _ = y.__H || (y.__H = { __: [], __h: [] });
  return t >= _.__.length && _.__.push({}), _.__[t];
}
function De(t) {
  return N = 1, Me(Oe, t);
}
function Me(t, e, _) {
  var r = S(P++, 2);
  if (r.t = t, !r.__c && (r.__ = [_ ? _(e) : Oe(void 0, e), function(s) {
    var c = r.__N ? r.__N[0] : r.__[0], u = r.t(c, s);
    c !== u && (r.__N = [u, r.__[1]], r.__c.setState({}));
  }], r.__c = y, !y.__f)) {
    var i = function(s, c, u) {
      if (!r.__c.__H) return !0;
      var f = r.__c.__H.__.filter(function(h) {
        return !!h.__c;
      });
      if (f.every(function(h) {
        return !h.__N;
      })) return !o || o.call(this, s, c, u);
      var n = r.__c.props !== s;
      return f.forEach(function(h) {
        if (h.__N) {
          var a = h.__[0];
          h.__ = h.__N, h.__N = void 0, a !== h.__[0] && (n = !0);
        }
      }), o && o.call(this, s, c, u) || n;
    };
    y.__f = !0;
    var o = y.shouldComponentUpdate, l = y.componentWillUpdate;
    y.componentWillUpdate = function(s, c, u) {
      if (this.__e) {
        var f = o;
        o = void 0, i(s, c, u), o = f;
      }
      l && l.call(this, s, c, u);
    }, y.shouldComponentUpdate = i;
  }
  return r.__N || r.__;
}
function Ge(t, e) {
  var _ = S(P++, 3);
  !k.__s && re(_.__H, e) && (_.__ = t, _.u = e, y.__H.__h.push(_));
}
function Fe(t, e) {
  var _ = S(P++, 4);
  !k.__s && re(_.__H, e) && (_.__ = t, _.u = e, y.__h.push(_));
}
function Je(t) {
  return N = 5, ne(function() {
    return { current: t };
  }, []);
}
function Ke(t, e, _) {
  N = 6, Fe(function() {
    if (typeof t == "function") {
      var r = t(e());
      return function() {
        t(null), r && typeof r == "function" && r();
      };
    }
    if (t) return t.current = e(), function() {
      return t.current = null;
    };
  }, _ == null ? _ : _.concat(t));
}
function ne(t, e) {
  var _ = S(P++, 7);
  return re(_.__H, e) && (_.__ = t(), _.__H = e, _.__h = t), _.__;
}
function Qe(t, e) {
  return N = 8, ne(function() {
    return t;
  }, e);
}
function Xe(t) {
  var e = y.context[t.__c], _ = S(P++, 9);
  return _.c = t, e ? (_.__ == null && (_.__ = !0, e.sub(y)), e.props.value) : t.__;
}
function Ye(t, e) {
  k.useDebugValue && k.useDebugValue(e ? e(t) : t);
}
function Ze(t) {
  var e = S(P++, 10), _ = De();
  return e.__ = t, y.componentDidCatch || (y.componentDidCatch = function(r, i) {
    e.__ && e.__(r, i), _[1](r);
  }), [_[0], function() {
    _[1](void 0);
  }];
}
function et() {
  var t = S(P++, 11);
  if (!t.__) {
    for (var e = y.__v; e !== null && !e.__m && e.__ !== null; ) e = e.__;
    var _ = e.__m || (e.__m = [0, 0]);
    t.__ = "P" + _[0] + "-" + _[1]++;
  }
  return t.__;
}
function tt() {
  for (var t; t = Ue.shift(); ) if (t.__P && t.__H) try {
    t.__H.__h.forEach(q), t.__H.__h.forEach(Y), t.__H.__h = [];
  } catch (e) {
    t.__H.__h = [], k.__e(e, t.__v);
  }
}
k.__b = function(t) {
  y = null, fe && fe(t);
}, k.__ = function(t, e) {
  t && e.__k && e.__k.__m && (t.__m = e.__k.__m), de && de(t, e);
}, k.__r = function(t) {
  ae && ae(t), P = 0;
  var e = (y = t.__c).__H;
  e && (G === y ? (e.__h = [], y.__h = [], e.__.forEach(function(_) {
    _.__N && (_.__ = _.__N), _.u = _.__N = void 0;
  })) : (e.__h.forEach(q), e.__h.forEach(Y), e.__h = [], P = 0)), G = y;
}, k.diffed = function(t) {
  pe && pe(t);
  var e = t.__c;
  e && e.__H && (e.__H.__h.length && (Ue.push(e) !== 1 && ce === k.requestAnimationFrame || ((ce = k.requestAnimationFrame) || _t)(tt)), e.__H.__.forEach(function(_) {
    _.u && (_.__H = _.u), _.u = void 0;
  })), G = y = null;
}, k.__c = function(t, e) {
  e.some(function(_) {
    try {
      _.__h.forEach(q), _.__h = _.__h.filter(function(r) {
        return !r.__ || Y(r);
      });
    } catch (r) {
      e.some(function(i) {
        i.__h && (i.__h = []);
      }), e = [], k.__e(r, _.__v);
    }
  }), he && he(t, e);
}, k.unmount = function(t) {
  ve && ve(t);
  var e, _ = t.__c;
  _ && _.__H && (_.__H.__.forEach(function(r) {
    try {
      q(r);
    } catch (i) {
      e = i;
    }
  }), _.__H = void 0, e && k.__e(e, _.__v));
};
var me = typeof requestAnimationFrame == "function";
function _t(t) {
  var e, _ = function() {
    clearTimeout(r), me && cancelAnimationFrame(e), setTimeout(t);
  }, r = setTimeout(_, 35);
  me && (e = requestAnimationFrame(_));
}
function q(t) {
  var e = y, _ = t.__c;
  typeof _ == "function" && (t.__c = void 0, _()), y = e;
}
function Y(t) {
  var e = y;
  t.__c = t.__(), y = e;
}
function re(t, e) {
  return !t || t.length !== e.length || e.some(function(_, r) {
    return _ !== t[r];
  });
}
function Oe(t, e) {
  return typeof e == "function" ? e(t) : e;
}
const ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  useCallback: Qe,
  useContext: Xe,
  useDebugValue: Ye,
  useEffect: Ge,
  useErrorBoundary: Ze,
  useId: et,
  useImperativeHandle: Ke,
  useLayoutEffect: Fe,
  useMemo: ne,
  useReducer: Me,
  useRef: Je,
  useState: De
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ae as E,
  Q as _,
  De as d,
  ot as h,
  rt as p,
  nt as r,
  Ge as y
};
