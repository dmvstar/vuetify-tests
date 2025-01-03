/**
 * Skipped minification because the original files appears to be already minified.
 * Original file: /npm/@vue-leaflet/vue-leaflet@0.10.1/dist/vue-leaflet.cjs.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
"use strict";
var st = Object.create;
var Ge = Object.defineProperty;
var at = Object.getOwnPropertyDescriptor;
var lt = Object.getOwnPropertyNames;
var it = Object.getPrototypeOf,
  ut = Object.prototype.hasOwnProperty;
var ct = (e, o, t, r) => {
  if ((o && typeof o == "object") || typeof o == "function")
    for (let a of lt(o))
      !ut.call(e, a) &&
        a !== t &&
        Ge(e, a, {
          get: () => o[a],
          enumerable: !(r = at(o, a)) || r.enumerable
        });
  return e;
};
var v = (e, o, t) => (
  (t = e != null ? st(it(e)) : {}),
  ct(
    o || !e || !e.__esModule
      ? Ge(t, "default", { value: e, enumerable: !0 })
      : t,
    e
  )
);
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const n = require("vue"),
  oe = (e, o) => {
    for (const t of Object.keys(o)) e.on(t, o[t]);
  },
  re = e => {
    for (const o of Object.keys(e)) {
      const t = e[o];
      t && I(t.cancel) && t.cancel();
    }
  },
  Ne = e =>
    !e || typeof e.charAt != "function"
      ? e
      : e.charAt(0).toUpperCase() + e.slice(1),
  I = e => typeof e == "function",
  L = (e, o, t) => {
    for (const r in t) {
      const a = "set" + Ne(r);
      e[a]
        ? n.watch(
            () => t[r],
            (s, i) => {
              e[a](s, i);
            }
          )
        : o[a] &&
          n.watch(
            () => t[r],
            s => {
              o[a](s);
            }
          );
    }
  },
  g = (e, o, t = {}) => {
    const r = { ...t };
    for (const a in e) {
      const s = o[a],
        i = e[a];
      s && ((s && s.custom === !0) || (i !== void 0 && (r[a] = i)));
    }
    return r;
  },
  S = e => {
    const o = {},
      t = {};
    for (const r in e)
      if (r.startsWith("on") && !r.startsWith("onUpdate") && r !== "onReady") {
        const a = r.slice(2).toLocaleLowerCase();
        o[a] = e[r];
      } else t[r] = e[r];
    return { listeners: o, attrs: t };
  },
  $e = async e => {
    const o = await Promise.all([
      import("leaflet/dist/images/marker-icon-2x.png"),
      import("leaflet/dist/images/marker-icon.png"),
      import("leaflet/dist/images/marker-shadow.png")
    ]);
    delete e.Default.prototype._getIconUrl, e.Default.mergeOptions({
      iconRetinaUrl: o[0].default,
      iconUrl: o[1].default,
      shadowUrl: o[2].default
    });
  },
  W = e => {
    const o = n.ref((...r) =>
        console.warn(`Method ${e} has been invoked without being replaced`)
      ),
      t = (...r) => o.value(...r);
    return (t.wrapped = o), n.provide(e, t), t;
  },
  J = (e, o) => (e.wrapped.value = o),
  b =
    (typeof self == "object" && self.self === self && self) ||
    (typeof global == "object" && global.global === global && global) ||
    globalThis,
  m = e => {
    const o = n.inject(e);
    if (o === void 0)
      throw new Error(
        `Attempt to inject ${e.description} before it was provided.`
      );
    return o;
  },
  dt = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        WINDOW_OR_GLOBAL: b,
        assertInject: m,
        bindEventHandlers: oe,
        cancelDebounces: re,
        capitalizeFirstLetter: Ne,
        isFunction: I,
        propsBinder: L,
        propsToLeafletOptions: g,
        provideLeafletWrapper: W,
        remapEvents: S,
        resetWebpackIcon: $e,
        updateLeafletWrapper: J
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  h = Symbol("useGlobalLeaflet"),
  _ = Symbol("addLayer"),
  x = Symbol("removeLayer"),
  $ = Symbol("registerControl"),
  se = Symbol("registerLayerControl"),
  ae = Symbol("canSetParentHtml"),
  le = Symbol("setParentHtml"),
  ie = Symbol("setIcon"),
  ue = Symbol("bindPopup"),
  ce = Symbol("bindTooltip"),
  de = Symbol("unbindPopup"),
  pe = Symbol("unbindTooltip"),
  pt = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        AddLayerInjection: _,
        BindPopupInjection: ue,
        BindTooltipInjection: ce,
        CanSetParentHtmlInjection: ae,
        RegisterControlInjection: $,
        RegisterLayerControlInjection: se,
        RemoveLayerInjection: x,
        SetIconInjection: ie,
        SetParentHtmlInjection: le,
        UnbindPopupInjection: de,
        UnbindTooltipInjection: pe,
        UseGlobalLeafletInjection: h
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  U = { options: { type: Object, default: () => ({}), custom: !0 } },
  D = e => ({ options: e.options, methods: {} }),
  yt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, componentProps: U, setupComponent: D },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  A = {
    ...U,
    pane: { type: String },
    attribution: { type: String },
    name: { type: String, custom: !0 },
    layerType: { type: String, custom: !0 },
    visible: { type: Boolean, custom: !0, default: !0 }
  },
  F = (e, o, t) => {
    const r = m(_),
      a = m(x),
      { options: s, methods: i } = D(e),
      l = g(e, A, s),
      u = () => r({ leafletObject: o.value }),
      c = () => a({ leafletObject: o.value }),
      d = {
        ...i,
        setAttribution(y) {
          c(), (o.value.options.attribution = y), e.visible && u();
        },
        setName() {
          c(), e.visible && u();
        },
        setLayerType() {
          c(), e.visible && u();
        },
        setVisible(y) {
          o.value && (y ? u() : c());
        },
        bindPopup(y) {
          if (!o.value || !I(o.value.bindPopup)) {
            console.warn(
              "Attempt to bind popup before bindPopup method available on layer."
            );
            return;
          }
          o.value.bindPopup(y);
        },
        bindTooltip(y) {
          if (!o.value || !I(o.value.bindTooltip)) {
            console.warn(
              "Attempt to bind tooltip before bindTooltip method available on layer."
            );
            return;
          }
          o.value.bindTooltip(y);
        },
        unbindTooltip() {
          o.value &&
            (
              I(o.value.closeTooltip) && o.value.closeTooltip(),
              I(o.value.unbindTooltip) && o.value.unbindTooltip()
            );
        },
        unbindPopup() {
          o.value &&
            (
              I(o.value.closePopup) && o.value.closePopup(),
              I(o.value.unbindPopup) && o.value.unbindPopup()
            );
        },
        updateVisibleProp(y) {
          t.emit("update:visible", y);
        }
      };
    return n.provide(ue, d.bindPopup), n.provide(ce, d.bindTooltip), n.provide(
      de,
      d.unbindPopup
    ), n.provide(pe, d.unbindTooltip), n.onUnmounted(() => {
      d.unbindPopup(), d.unbindTooltip(), c();
    }), { options: l, methods: d };
  },
  M = (e, o) => {
    if (e && o.default)
      return n.h("div", { style: { display: "none" } }, o.default());
  },
  mt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, layerProps: A, render: M, setupLayer: F },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  ye = {
    ...A,
    interactive: { type: Boolean, default: void 0 },
    bubblingMouseEvents: { type: Boolean, default: void 0 }
  },
  Ue = (e, o, t) => {
    const { options: r, methods: a } = F(e, o, t);
    return { options: g(e, ye, r), methods: a };
  },
  vt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, interactiveLayerProps: ye, setupInteractiveLayer: Ue },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  R = {
    ...ye,
    stroke: { type: Boolean, default: void 0 },
    color: { type: String },
    weight: { type: Number },
    opacity: { type: Number },
    lineCap: { type: String },
    lineJoin: { type: String },
    dashArray: { type: String },
    dashOffset: { type: String },
    fill: { type: Boolean, default: void 0 },
    fillColor: { type: String },
    fillOpacity: { type: Number },
    fillRule: { type: String },
    className: { type: String }
  },
  me = (e, o, t) => {
    const { options: r, methods: a } = Ue(e, o, t),
      s = g(e, R, r),
      i = m(x),
      l = {
        ...a,
        setStroke(u) {
          o.value.setStyle({ stroke: u });
        },
        setColor(u) {
          o.value.setStyle({ color: u });
        },
        setWeight(u) {
          o.value.setStyle({ weight: u });
        },
        setOpacity(u) {
          o.value.setStyle({ opacity: u });
        },
        setLineCap(u) {
          o.value.setStyle({ lineCap: u });
        },
        setLineJoin(u) {
          o.value.setStyle({ lineJoin: u });
        },
        setDashArray(u) {
          o.value.setStyle({ dashArray: u });
        },
        setDashOffset(u) {
          o.value.setStyle({ dashOffset: u });
        },
        setFill(u) {
          o.value.setStyle({ fill: u });
        },
        setFillColor(u) {
          o.value.setStyle({ fillColor: u });
        },
        setFillOpacity(u) {
          o.value.setStyle({ fillOpacity: u });
        },
        setFillRule(u) {
          o.value.setStyle({ fillRule: u });
        },
        setClassName(u) {
          o.value.setStyle({ className: u });
        }
      };
    return n.onBeforeUnmount(() => {
      i({ leafletObject: o.value });
    }), { options: s, methods: l };
  },
  ft = Object.freeze(
    Object.defineProperty(
      { __proto__: null, pathProps: R, setupPath: me },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Q = {
    ...R,
    radius: { type: Number },
    latLng: { type: [Object, Array], required: !0, custom: !0 }
  },
  ve = (e, o, t) => {
    const { options: r, methods: a } = me(e, o, t),
      s = g(e, Q, r),
      i = {
        ...a,
        setRadius(l) {
          o.value.setRadius(l);
        },
        setLatLng(l) {
          o.value.setLatLng(l);
        }
      };
    return { options: s, methods: i };
  },
  bt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, circleMarkerProps: Q, setupCircleMarker: ve },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  fe = { ...Q, radius: { type: Number } },
  De = (e, o, t) => {
    const { options: r, methods: a } = ve(e, o, t),
      s = g(e, fe, r),
      i = { ...a };
    return { options: s, methods: i };
  },
  gt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, circleProps: fe, setupCircle: De },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Lt = n.defineComponent({
    name: "LCircle",
    props: fe,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_),
        { options: i, methods: l } = De(e, t, o);
      return n.onMounted(async () => {
        const { circle: u } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(u(e.latLng, i));
        const { listeners: c } = S(o.attrs);
        t.value.on(c), L(l, t.value, e), s({
          ...e,
          ...l,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  }),
  ht = n.defineComponent({
    name: "LCircleMarker",
    props: Q,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_),
        { options: i, methods: l } = ve(e, t, o);
      return n.onMounted(async () => {
        const { circleMarker: u } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(u(e.latLng, i));
        const { listeners: c } = S(o.attrs);
        t.value.on(c), L(l, t.value, e), s({
          ...e,
          ...l,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  }),
  G = { ...U, position: { type: String } },
  Z = (e, o) => {
    const { options: t, methods: r } = D(e),
      a = g(e, G, t),
      s = {
        ...r,
        setPosition(i) {
          o.value && o.value.setPosition(i);
        }
      };
    return n.onUnmounted(() => {
      o.value && o.value.remove();
    }), { options: a, methods: s };
  },
  Fe = e => (e.default ? n.h("div", { ref: "root" }, e.default()) : null),
  Ot = Object.freeze(
    Object.defineProperty(
      { __proto__: null, controlProps: G, renderLControl: Fe, setupControl: Z },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  jt = n.defineComponent({
    name: "LControl",
    props: {
      ...G,
      disableClickPropagation: { type: Boolean, custom: !0, default: !0 },
      disableScrollPropagation: { type: Boolean, custom: !0, default: !1 }
    },
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(),
        a = n.inject(h),
        s = m($),
        { options: i, methods: l } = Z(e, t);
      return n.onMounted(async () => {
        const { Control: u, DomEvent: c } = a
            ? b.L
            : await import("leaflet/dist/leaflet-src.esm"),
          d = u.extend({
            onAdd() {
              return r.value;
            }
          });
        (t.value = n.markRaw(new d(i))), L(l, t.value, e), s({
          leafletObject: t.value
        }), e.disableClickPropagation &&
          r.value &&
          c.disableClickPropagation(r.value), e.disableScrollPropagation &&
          r.value &&
          c.disableScrollPropagation(r.value), n.nextTick(() =>
          o.emit("ready", t.value)
        );
      }), { root: r, leafletObject: t };
    },
    render() {
      return Fe(this.$slots);
    }
  }),
  be = { ...G, prefix: { type: String } },
  Ze = (e, o) => {
    const { options: t, methods: r } = Z(e, o),
      a = g(e, be, t),
      s = {
        ...r,
        setPrefix(i) {
          o.value.setPrefix(i);
        }
      };
    return { options: a, methods: s };
  },
  St = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        controlAttributionProps: be,
        setupControlAttribution: Ze
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  _t = n.defineComponent({
    name: "LControlAttribution",
    props: be,
    setup(e, o) {
      const t = n.ref(),
        r = n.inject(h),
        a = m($),
        { options: s, methods: i } = Ze(e, t);
      return n.onMounted(async () => {
        const { control: l } = r
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        (t.value = n.markRaw(l.attribution(s))), L(i, t.value, e), a({
          leafletObject: t.value
        }), n.nextTick(() => o.emit("ready", t.value));
      }), { leafletObject: t };
    },
    render() {
      return null;
    }
  }),
  ge = {
    ...G,
    collapsed: { type: Boolean, default: void 0 },
    autoZIndex: { type: Boolean, default: void 0 },
    hideSingleBase: { type: Boolean, default: void 0 },
    sortLayers: { type: Boolean, default: void 0 },
    sortFunction: { type: Function }
  },
  Ee = (e, o) => {
    const { options: t } = Z(e, o);
    return {
      options: g(e, ge, t),
      methods: {
        addLayer(s) {
          s.layerType === "base"
            ? o.value.addBaseLayer(s.leafletObject, s.name)
            : s.layerType === "overlay" &&
              o.value.addOverlay(s.leafletObject, s.name);
        },
        removeLayer(s) {
          o.value.removeLayer(s.leafletObject);
        }
      }
    };
  },
  Ct = Object.freeze(
    Object.defineProperty(
      { __proto__: null, controlLayersProps: ge, setupControlLayers: Ee },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Tt = n.defineComponent({
    name: "LControlLayers",
    props: ge,
    setup(e, o) {
      const t = n.ref(),
        r = n.inject(h),
        a = m(se),
        { options: s, methods: i } = Ee(e, t);
      return n.onMounted(async () => {
        const { control: l } = r
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        (t.value = n.markRaw(l.layers(void 0, void 0, s))), L(
          i,
          t.value,
          e
        ), a({ ...e, ...i, leafletObject: t.value }), n.nextTick(() =>
          o.emit("ready", t.value)
        );
      }), { leafletObject: t };
    },
    render() {
      return null;
    }
  }),
  Le = {
    ...G,
    maxWidth: { type: Number },
    metric: { type: Boolean, default: void 0 },
    imperial: { type: Boolean, default: void 0 },
    updateWhenIdle: { type: Boolean, default: void 0 }
  },
  He = (e, o) => {
    const { options: t, methods: r } = Z(e, o);
    return { options: g(e, Le, t), methods: r };
  },
  Pt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, controlScaleProps: Le, setupControlScale: He },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Mt = n.defineComponent({
    name: "LControlScale",
    props: Le,
    setup(e, o) {
      const t = n.ref(),
        r = n.inject(h),
        a = m($),
        { options: s, methods: i } = He(e, t);
      return n.onMounted(async () => {
        const { control: l } = r
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        (t.value = n.markRaw(l.scale(s))), L(i, t.value, e), a({
          leafletObject: t.value
        }), n.nextTick(() => o.emit("ready", t.value));
      }), { leafletObject: t };
    },
    render() {
      return null;
    }
  }),
  he = {
    ...G,
    zoomInText: { type: String },
    zoomInTitle: { type: String },
    zoomOutText: { type: String },
    zoomOutTitle: { type: String }
  },
  We = (e, o) => {
    const { options: t, methods: r } = Z(e, o);
    return { options: g(e, he, t), methods: r };
  },
  wt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, controlZoomProps: he, setupControlZoom: We },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  kt = n.defineComponent({
    name: "LControlZoom",
    props: he,
    setup(e, o) {
      const t = n.ref(),
        r = n.inject(h),
        a = m($),
        { options: s, methods: i } = We(e, t);
      return n.onMounted(async () => {
        const { control: l } = r
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        (t.value = n.markRaw(l.zoom(s))), L(i, t.value, e), a({
          leafletObject: t.value
        }), n.nextTick(() => o.emit("ready", t.value));
      }), { leafletObject: t };
    },
    render() {
      return null;
    }
  }),
  K = { ...A },
  X = (e, o, t) => {
    const { options: r, methods: a } = F(e, o, t),
      s = g(e, K, r),
      i = {
        ...a,
        addLayer(l) {
          o.value.addLayer(l.leafletObject);
        },
        removeLayer(l) {
          o.value.removeLayer(l.leafletObject);
        }
      };
    return n.provide(_, i.addLayer), n.provide(x, i.removeLayer), {
      options: s,
      methods: i
    };
  },
  Bt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, layerGroupProps: K, setupLayerGroup: X },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Oe = { ...K },
  Je = (e, o, t) => {
    const { options: r, methods: a } = X(e, o, t),
      s = g(e, Oe, r),
      i = { ...a };
    return { options: s, methods: i };
  },
  It = Object.freeze(
    Object.defineProperty(
      { __proto__: null, featureGroupProps: Oe, setupFeatureGroup: Je },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  At = n.defineComponent({
    props: Oe,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_),
        { methods: i, options: l } = Je(e, t, o);
      return n.onMounted(async () => {
        const { featureGroup: u } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(u(void 0, l));
        const { listeners: c } = S(o.attrs);
        t.value.on(c), L(i, t.value, e), s({
          ...e,
          ...i,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  }),
  je = {
    ...K,
    geojson: { type: [Object, Array], custom: !0 },
    optionsStyle: { type: Function, custom: !0 }
  },
  qe = (e, o, t) => {
    const { options: r, methods: a } = X(e, o, t),
      s = g(e, je, r);
    Object.prototype.hasOwnProperty.call(e, "optionsStyle") &&
      (s.style = e.optionsStyle);
    const i = {
      ...a,
      setGeojson(l) {
        o.value.clearLayers(), o.value.addData(l);
      },
      setOptionsStyle(l) {
        o.value.setStyle(l);
      },
      getGeoJSONData() {
        return o.value.toGeoJSON();
      },
      getBounds() {
        return o.value.getBounds();
      }
    };
    return { options: s, methods: i };
  },
  Gt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, geoJSONProps: je, setupGeoJSON: qe },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  zt = n.defineComponent({
    props: je,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_),
        { methods: i, options: l } = qe(e, t, o);
      return n.onMounted(async () => {
        const { geoJSON: u } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(u(e.geojson, l));
        const { listeners: c } = S(o.attrs);
        t.value.on(c), L(i, t.value, e), s({
          ...e,
          ...i,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  }),
  Y = {
    ...A,
    opacity: { type: Number },
    zIndex: { type: Number },
    tileSize: { type: [Number, Array, Object] },
    noWrap: { type: Boolean, default: void 0 },
    minZoom: { type: Number },
    maxZoom: { type: Number },
    className: { type: String }
  },
  Se = (e, o, t) => {
    const { options: r, methods: a } = F(e, o, t),
      s = g(e, Y, r),
      i = {
        ...a,
        setTileComponent() {
          var l;
          (l = o.value) == null || l.redraw();
        }
      };
    return n.onUnmounted(() => {
      o.value.off();
    }), { options: s, methods: i };
  },
  xe = (e, o, t, r) =>
    e.extend({
      initialize(a) {
        (this.tileComponents = {}), this.on(
          "tileunload",
          this._unloadTile
        ), t.setOptions(this, a);
      },
      createTile(a) {
        const s = this._tileCoordsToKey(a);
        this.tileComponents[s] = o.create("div");
        const i = n.h({ setup: r, props: ["coords"] }, { coords: a });
        return n.render(i, this.tileComponents[s]), this.tileComponents[s];
      },
      _unloadTile(a) {
        const s = this._tileCoordsToKey(a.coords);
        this.tileComponents[s] &&
          (
            (this.tileComponents[s].innerHTML = ""),
            (this.tileComponents[s] = void 0)
          );
      }
    }),
  Nt = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        CreateVueGridLayer: xe,
        gridLayerProps: Y,
        setupGridLayer: Se
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  $t = n.defineComponent({
    props: { ...Y, childRender: { type: Function, required: !0 } },
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(null),
        a = n.ref(!1),
        s = n.inject(h),
        i = m(_),
        { options: l, methods: u } = Se(e, t, o);
      return n.onMounted(async () => {
        const { GridLayer: c, DomUtil: d, Util: y } = s
            ? b.L
            : await import("leaflet/dist/leaflet-src.esm"),
          T = xe(c, d, y, e.childRender);
        t.value = n.markRaw(new T(l));
        const { listeners: f } = S(o.attrs);
        t.value.on(f), L(u, t.value, e), i({
          ...e,
          ...u,
          leafletObject: t.value
        }), (a.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { root: r, ready: a, leafletObject: t };
    },
    render() {
      return this.ready
        ? n.h("div", { style: { display: "none" }, ref: "root" })
        : null;
    }
  }),
  ne = {
    iconUrl: { type: String },
    iconRetinaUrl: { type: String },
    iconSize: { type: [Object, Array] },
    iconAnchor: { type: [Object, Array] },
    popupAnchor: { type: [Object, Array] },
    tooltipAnchor: { type: [Object, Array] },
    shadowUrl: { type: String },
    shadowRetinaUrl: { type: String },
    shadowSize: { type: [Object, Array] },
    shadowAnchor: { type: [Object, Array] },
    bgPos: { type: [Object, Array] },
    className: { type: String }
  },
  Ut = Object.freeze(
    Object.defineProperty(
      { __proto__: null, iconProps: ne },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Dt = n.defineComponent({
    name: "LIcon",
    props: { ...ne, ...U },
    setup(e, o) {
      const t = n.ref(),
        r = n.inject(h),
        a = m(ae),
        s = m(le),
        i = m(ie);
      let l, u, c, d, y;
      const T = (k, O, C) => {
          const P = k && k.innerHTML;
          if (!O) {
            C && y && a() && s(P);
            return;
          }
          const { listeners: N } = S(o.attrs);
          y && u(y, N);
          const { options: te } = D(e),
            B = g(e, ne, te);
          P && (B.html = P), (y = B.html ? c(B) : d(B)), l(y, N), i(y);
        },
        f = () => {
          n.nextTick(() => T(t.value, !0, !1));
        },
        w = () => {
          n.nextTick(() => T(t.value, !1, !0));
        },
        z = {
          setIconUrl: f,
          setIconRetinaUrl: f,
          setIconSize: f,
          setIconAnchor: f,
          setPopupAnchor: f,
          setTooltipAnchor: f,
          setShadowUrl: f,
          setShadowRetinaUrl: f,
          setShadowAnchor: f,
          setBgPos: f,
          setClassName: f,
          setHtml: f
        };
      return n.onMounted(async () => {
        const { DomEvent: k, divIcon: O, icon: C } = r
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        (l = k.on), (u = k.off), (c = O), (d = C), L(
          z,
          {},
          e
        ), new MutationObserver(w).observe(t.value, {
          attributes: !0,
          childList: !0,
          characterData: !0,
          subtree: !0
        }), f();
      }), { root: t };
    },
    render() {
      const e = this.$slots.default ? this.$slots.default() : void 0;
      return n.h("div", { ref: "root" }, e);
    }
  }),
  _e = {
    ...A,
    opacity: { type: Number },
    alt: { type: String },
    interactive: { type: Boolean, default: void 0 },
    crossOrigin: { type: Boolean, default: void 0 },
    errorOverlayUrl: { type: String },
    zIndex: { type: Number },
    className: { type: String },
    url: { type: String, required: !0, custom: !0 },
    bounds: { type: [Array, Object], required: !0, custom: !0 }
  },
  Ke = (e, o, t) => {
    const { options: r, methods: a } = F(e, o, t),
      s = g(e, _e, r),
      i = {
        ...a,
        setOpacity(l) {
          return o.value.setOpacity(l);
        },
        setUrl(l) {
          return o.value.setUrl(l);
        },
        setBounds(l) {
          return o.value.setBounds(l);
        },
        getBounds() {
          return o.value.getBounds();
        },
        getElement() {
          return o.value.getElement();
        },
        bringToFront() {
          return o.value.bringToFront();
        },
        bringToBack() {
          return o.value.bringToBack();
        },
        setZIndex(l) {
          return o.value.setZIndex(l);
        }
      };
    return { options: s, methods: i };
  },
  Ft = Object.freeze(
    Object.defineProperty(
      { __proto__: null, imageOverlayProps: _e, setupImageOverlay: Ke },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Zt = n.defineComponent({
    name: "LImageOverlay",
    props: _e,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_),
        { options: i, methods: l } = Ke(e, t, o);
      return n.onMounted(async () => {
        const { imageOverlay: u } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(u(e.url, e.bounds, i));
        const { listeners: c } = S(o.attrs);
        t.value.on(c), L(l, t.value, e), s({
          ...e,
          ...l,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  }),
  Et = n.defineComponent({
    props: K,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_),
        { methods: i } = X(e, t, o);
      return n.onMounted(async () => {
        const { layerGroup: l } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(l(void 0, e.options));
        const { listeners: u } = S(o.attrs);
        t.value.on(u), L(i, t.value, e), s({
          ...e,
          ...i,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  });
function Re(e, o, t) {
  var r, a, s;
  o === void 0 && (o = 50), t === void 0 && (t = {});
  var i = (r = t.isImmediate) != null && r,
    l = (a = t.callback) != null && a,
    u = t.maxWait,
    c = Date.now(),
    d = [];
  function y() {
    if (u !== void 0) {
      var f = Date.now() - c;
      if (f + o >= u) return u - f;
    }
    return o;
  }
  var T = function() {
    var f = [].slice.call(arguments),
      w = this;
    return new Promise(function(z, k) {
      var O = i && s === void 0;
      if (
        (
          s !== void 0 && clearTimeout(s),
          (s = setTimeout(function() {
            if (((s = void 0), (c = Date.now()), !i)) {
              var P = e.apply(w, f);
              l && l(P), d.forEach(function(N) {
                return (0, N.resolve)(P);
              }), (d = []);
            }
          }, y())),
          O
        )
      ) {
        var C = e.apply(w, f);
        return l && l(C), z(C);
      }
      d.push({ resolve: z, reject: k });
    });
  };
  return (T.cancel = function(f) {
    s !== void 0 && clearTimeout(s), d.forEach(function(w) {
      return (0, w.reject)(f);
    }), (d = []);
  }), T;
}
const ze = {
    ...U,
    center: { type: [Object, Array] },
    bounds: { type: [Array, Object] },
    maxBounds: { type: [Array, Object] },
    zoom: { type: Number },
    minZoom: { type: Number },
    maxZoom: { type: Number },
    paddingBottomRight: { type: [Object, Array] },
    paddingTopLeft: { type: Object },
    padding: { type: Object },
    worldCopyJump: { type: Boolean, default: void 0 },
    crs: { type: [String, Object] },
    maxBoundsViscosity: { type: Number },
    inertia: { type: Boolean, default: void 0 },
    inertiaDeceleration: { type: Number },
    inertiaMaxSpeed: { type: Number },
    easeLinearity: { type: Number },
    zoomAnimation: { type: Boolean, default: void 0 },
    zoomAnimationThreshold: { type: Number },
    fadeAnimation: { type: Boolean, default: void 0 },
    markerZoomAnimation: { type: Boolean, default: void 0 },
    noBlockingAnimations: { type: Boolean, default: void 0 },
    useGlobalLeaflet: { type: Boolean, default: !0, custom: !0 }
  },
  Ht = n.defineComponent({
    inheritAttrs: !1,
    emits: ["ready", "update:zoom", "update:center", "update:bounds"],
    props: ze,
    setup(e, o) {
      const t = n.ref(),
        r = n.reactive({ ready: !1, layersToAdd: [], layersInControl: [] }),
        { options: a } = D(e),
        s = g(e, ze, a),
        { listeners: i, attrs: l } = S(o.attrs),
        u = W(_),
        c = W(x),
        d = W($),
        y = W(se);
      n.provide(h, e.useGlobalLeaflet);
      const T = n.computed(() => {
          const O = {};
          return e.noBlockingAnimations && (O.animate = !1), O;
        }),
        f = n.computed(() => {
          const O = T.value;
          return e.padding && (O.padding = e.padding), e.paddingTopLeft &&
            (O.paddingTopLeft = e.paddingTopLeft), e.paddingBottomRight &&
            (O.paddingBottomRight = e.paddingBottomRight), O;
        }),
        w = {
          moveend: Re(O => {
            r.leafletRef &&
              (
                o.emit("update:zoom", r.leafletRef.getZoom()),
                o.emit("update:center", r.leafletRef.getCenter()),
                o.emit("update:bounds", r.leafletRef.getBounds())
              );
          }),
          overlayadd(O) {
            const C = r.layersInControl.find(P => P.name === O.name);
            C && C.updateVisibleProp(!0);
          },
          overlayremove(O) {
            const C = r.layersInControl.find(P => P.name === O.name);
            C && C.updateVisibleProp(!1);
          }
        };
      n.onMounted(async () => {
        e.useGlobalLeaflet && (b.L = b.L || (await import("leaflet")));
        const {
          map: O,
          CRS: C,
          Icon: P,
          latLngBounds: N,
          latLng: te,
          stamp: B
        } = e.useGlobalLeaflet
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        try {
          s.beforeMapMount && (await s.beforeMapMount());
        } catch (p) {
          console.error(
            `The following error occurred running the provided beforeMapMount hook ${p.message}`
          );
        }
        await $e(P);
        const rt = typeof s.crs == "string" ? C[s.crs] : s.crs;
        s.crs = rt || C.EPSG3857;
        const E = {
          addLayer(p) {
            p.layerType !== void 0 &&
              (r.layerControl === void 0
                ? r.layersToAdd.push(p)
                : r.layersInControl.find(
                    H => B(H.leafletObject) === B(p.leafletObject)
                  ) ||
                  (
                    r.layerControl.addLayer(p),
                    r.layersInControl.push(p)
                  )), p.visible !== !1 &&
              r.leafletRef.addLayer(p.leafletObject);
          },
          removeLayer(p) {
            p.layerType !== void 0 &&
              (r.layerControl === void 0
                ? (r.layersToAdd = r.layersToAdd.filter(j => j.name !== p.name))
                : (
                    r.layerControl.removeLayer(p.leafletObject),
                    (r.layersInControl = r.layersInControl.filter(
                      j => B(j.leafletObject) !== B(p.leafletObject)
                    ))
                  )), r.leafletRef.removeLayer(p.leafletObject);
          },
          registerLayerControl(p) {
            (r.layerControl = p), r.layersToAdd.forEach(j => {
              r.layerControl.addLayer(j);
            }), (r.layersToAdd = []), d(p);
          },
          registerControl(p) {
            r.leafletRef.addControl(p.leafletObject);
          },
          setZoom(p) {
            const j = r.leafletRef.getZoom();
            p !== j && r.leafletRef.setZoom(p, T.value);
          },
          setCrs(p) {
            const j = r.leafletRef.getBounds();
            (r.leafletRef.options.crs = p), r.leafletRef.fitBounds(j, {
              animate: !1,
              padding: [0, 0]
            });
          },
          fitBounds(p) {
            r.leafletRef.fitBounds(p, f.value);
          },
          setBounds(p) {
            if (!p) return;
            const j = N(p);
            if (!j.isValid()) return;
            !(r.lastSetBounds || r.leafletRef.getBounds()).equals(j, 0) &&
              ((r.lastSetBounds = j), r.leafletRef.fitBounds(j));
          },
          setCenter(p) {
            if (p == null) return;
            const j = te(p),
              H = r.lastSetCenter || r.leafletRef.getCenter();
            (H.lat !== j.lat || H.lng !== j.lng) &&
              ((r.lastSetCenter = j), r.leafletRef.panTo(j, T.value));
          }
        };
        J(u, E.addLayer), J(c, E.removeLayer), J(d, E.registerControl), J(
          y,
          E.registerLayerControl
        ), (r.leafletRef = n.markRaw(O(t.value, s))), L(E, r.leafletRef, e), oe(
          r.leafletRef,
          w
        ), oe(r.leafletRef, i), (r.ready = !0), n.nextTick(() =>
          o.emit("ready", r.leafletRef)
        );
      }), n.onBeforeUnmount(() => {
        re(w), r.leafletRef && (r.leafletRef.off(), r.leafletRef.remove());
      });
      const z = n.computed(() => r.leafletRef),
        k = n.computed(() => r.ready);
      return { root: t, ready: k, leafletObject: z, attrs: l };
    },
    render({ attrs: e }) {
      return e.style || (e.style = {}), e.style.width ||
        (e.style.width = "100%"), e.style.height ||
        (e.style.height = "100%"), n.h(
        "div",
        { ...e, ref: "root" },
        this.ready && this.$slots.default ? this.$slots.default() : {}
      );
    }
  }),
  Wt = ["Symbol(Comment)", "Symbol(Text)"],
  Jt = ["LTooltip", "LPopup"],
  Ce = {
    ...A,
    draggable: { type: Boolean, default: void 0 },
    icon: { type: [Object] },
    zIndexOffset: { type: Number },
    latLng: { type: [Object, Array], custom: !0, required: !0 }
  },
  Qe = (e, o, t) => {
    const { options: r, methods: a } = F(e, o, t),
      s = g(e, Ce, r),
      i = {
        ...a,
        setDraggable(l) {
          o.value.dragging &&
            (l ? o.value.dragging.enable() : o.value.dragging.disable());
        },
        latLngSync(l) {
          t.emit("update:latLng", l.latlng), t.emit("update:lat-lng", l.latlng);
        },
        setLatLng(l) {
          if (l != null && o.value) {
            const u = o.value.getLatLng();
            (!u || !u.equals(l)) && o.value.setLatLng(l);
          }
        }
      };
    return { options: s, methods: i };
  },
  Xe = (e, o) => {
    const t = o.slots.default && o.slots.default();
    return t && t.length && t.some(qt);
  };
function qt(e) {
  return !(Wt.includes(e.type.toString()) || Jt.includes(e.type.name));
}
const xt = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        markerProps: Ce,
        setupMarker: Qe,
        shouldBlankIcon: Xe
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Kt = n.defineComponent({
    name: "LMarker",
    props: Ce,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_);
      n.provide(ae, () => {
        var c;
        return !!((c = t.value) != null && c.getElement());
      }), n.provide(le, c => {
        var y, T;
        const d =
          I((y = t.value) == null ? void 0 : y.getElement) &&
          ((T = t.value) == null ? void 0 : T.getElement());
        d && (d.innerHTML = c);
      }), n.provide(ie, c => {
        var d;
        return (
          ((d = t.value) == null ? void 0 : d.setIcon) && t.value.setIcon(c)
        );
      });
      const { options: i, methods: l } = Qe(e, t, o),
        u = { moveHandler: Re(l.latLngSync) };
      return n.onMounted(async () => {
        const { marker: c, divIcon: d } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        Xe(i, o) && (i.icon = d({ className: "" })), (t.value = n.markRaw(
          c(e.latLng, i)
        ));
        const { listeners: y } = S(o.attrs);
        t.value.on(y), t.value.on("move", u.moveHandler), L(l, t.value, e), s({
          ...e,
          ...l,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), n.onBeforeUnmount(() => re(u)), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  }),
  V = {
    ...R,
    smoothFactor: { type: Number },
    noClip: { type: Boolean, default: void 0 },
    latLngs: { type: Array, required: !0, custom: !0 }
  },
  Te = (e, o, t) => {
    const { options: r, methods: a } = me(e, o, t),
      s = g(e, V, r),
      i = {
        ...a,
        setSmoothFactor(l) {
          o.value.setStyle({ smoothFactor: l });
        },
        setNoClip(l) {
          o.value.setStyle({ noClip: l });
        },
        addLatLng(l) {
          o.value.addLatLng(l);
        }
      };
    return { options: s, methods: i };
  },
  Rt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, polylineProps: V, setupPolyline: Te },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  q = { ...V },
  Pe = (e, o, t) => {
    const { options: r, methods: a } = Te(e, o, t),
      s = g(e, q, r),
      i = {
        ...a,
        toGeoJSON(l) {
          return o.value.toGeoJSON(l);
        }
      };
    return { options: s, methods: i };
  },
  Qt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, polygonProps: q, setupPolygon: Pe },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Xt = n.defineComponent({
    name: "LPolygon",
    props: q,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_),
        { options: i, methods: l } = Pe(e, t, o);
      return n.onMounted(async () => {
        const { polygon: u } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(u(e.latLngs, i));
        const { listeners: c } = S(o.attrs);
        t.value.on(c), L(l, t.value, e), s({
          ...e,
          ...l,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  }),
  Yt = n.defineComponent({
    name: "LPolyline",
    props: V,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_),
        { options: i, methods: l } = Te(e, t, o);
      return n.onMounted(async () => {
        const { polyline: u } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(u(e.latLngs, i));
        const { listeners: c } = S(o.attrs);
        t.value.on(c), L(l, t.value, e), s({
          ...e,
          ...l,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  }),
  Me = { ...U, content: { type: String, default: null } },
  we = (e, o) => {
    const { options: t, methods: r } = D(e),
      a = {
        ...r,
        setContent(s) {
          o.value && s !== null && s !== void 0 && o.value.setContent(s);
        }
      };
    return { options: t, methods: a };
  },
  ke = e => (e.default ? n.h("div", { ref: "root" }, e.default()) : null),
  Vt = Object.freeze(
    Object.defineProperty(
      { __proto__: null, popperProps: Me, render: ke, setupPopper: we },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Ye = { ...Me, latLng: { type: [Object, Array], default: () => [] } },
  Ve = (e, o) => {
    const { options: t, methods: r } = we(e, o);
    return { options: t, methods: r };
  },
  eo = Object.freeze(
    Object.defineProperty(
      { __proto__: null, popupProps: Ye, setupPopup: Ve },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  to = n.defineComponent({
    name: "LPopup",
    props: Ye,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(null),
        a = n.inject(h),
        s = m(ue),
        i = m(de),
        { options: l, methods: u } = Ve(e, t);
      return n.onMounted(async () => {
        const { popup: c } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        (t.value = n.markRaw(c(l))), e.latLng !== void 0 &&
          t.value.setLatLng(e.latLng), L(u, t.value, e);
        const { listeners: d } = S(o.attrs);
        t.value.on(d), t.value.setContent(e.content || r.value || ""), s(
          t.value
        ), n.nextTick(() => o.emit("ready", t.value));
      }), n.onBeforeUnmount(() => {
        i();
      }), { root: r, leafletObject: t };
    },
    render() {
      return ke(this.$slots);
    }
  }),
  Be = {
    ...q,
    latLngs: { ...q.latLngs, required: !1 },
    bounds: { type: Object, custom: !0 }
  },
  et = (e, o, t) => {
    const { options: r, methods: a } = Pe(e, o, t),
      s = g(e, Be, r),
      i = {
        ...a,
        setBounds(l) {
          o.value.setBounds(l);
        },
        setLatLngs(l) {
          o.value.setBounds(l);
        }
      };
    return { options: s, methods: i };
  },
  oo = Object.freeze(
    Object.defineProperty(
      { __proto__: null, rectangleProps: Be, setupRectangle: et },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  no = n.defineComponent({
    name: "LRectangle",
    props: Be,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(!1),
        a = n.inject(h),
        s = m(_),
        { options: i, methods: l } = et(e, t, o);
      return n.onMounted(async () => {
        const { rectangle: u, latLngBounds: c } = a
            ? b.L
            : await import("leaflet/dist/leaflet-src.esm"),
          d = e.bounds ? c(e.bounds) : c(e.latLngs || []);
        t.value = n.markRaw(u(d, i));
        const { listeners: y } = S(o.attrs);
        t.value.on(y), L(l, t.value, e), s({
          ...e,
          ...l,
          leafletObject: t.value
        }), (r.value = !0), n.nextTick(() => o.emit("ready", t.value));
      }), { ready: r, leafletObject: t };
    },
    render() {
      return M(this.ready, this.$slots);
    }
  }),
  ee = {
    ...Y,
    tms: { type: Boolean, default: void 0 },
    subdomains: {
      type: [String, Array],
      validator: e =>
        typeof e == "string"
          ? !0
          : Array.isArray(e) ? e.every(o => typeof o == "string") : !1
    },
    detectRetina: { type: Boolean, default: void 0 },
    url: { type: String, required: !0, custom: !0 }
  },
  Ie = (e, o, t) => {
    const { options: r, methods: a } = Se(e, o, t),
      s = g(e, ee, r),
      i = { ...a };
    return { options: s, methods: i };
  },
  ro = Object.freeze(
    Object.defineProperty(
      { __proto__: null, setupTileLayer: Ie, tileLayerProps: ee },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  so = n.defineComponent({
    props: ee,
    setup(e, o) {
      const t = n.ref(),
        r = n.inject(h),
        a = m(_),
        { options: s, methods: i } = Ie(e, t, o);
      return n.onMounted(async () => {
        const { tileLayer: l } = r
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(l(e.url, s));
        const { listeners: u } = S(o.attrs);
        t.value.on(u), L(i, t.value, e), a({
          ...e,
          ...i,
          leafletObject: t.value
        }), n.nextTick(() => o.emit("ready", t.value));
      }), { leafletObject: t };
    },
    render() {
      return null;
    }
  }),
  tt = { ...Me },
  ot = (e, o) => {
    const { options: t, methods: r } = we(e, o),
      a = m(pe);
    return n.onBeforeUnmount(() => {
      a();
    }), { options: t, methods: r };
  },
  ao = Object.freeze(
    Object.defineProperty(
      { __proto__: null, setupTooltip: ot, tooltipProps: tt },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  lo = n.defineComponent({
    name: "LTooltip",
    props: tt,
    setup(e, o) {
      const t = n.ref(),
        r = n.ref(null),
        a = n.inject(h),
        s = m(ce),
        { options: i, methods: l } = ot(e, t);
      return n.onMounted(async () => {
        const { tooltip: u } = a
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        (t.value = n.markRaw(u(i))), L(l, t.value, e);
        const { listeners: c } = S(o.attrs);
        t.value.on(c), t.value.setContent(e.content || r.value || ""), s(
          t.value
        ), n.nextTick(() => o.emit("ready", t.value));
      }), { root: r, leafletObject: t };
    },
    render() {
      return ke(this.$slots);
    }
  }),
  Ae = {
    ...ee,
    layers: { type: String, required: !0 },
    styles: { type: String },
    format: { type: String },
    transparent: { type: Boolean, default: void 0 },
    version: { type: String },
    crs: { type: Object },
    uppercase: { type: Boolean, default: void 0 }
  },
  nt = (e, o, t) => {
    const { options: r, methods: a } = Ie(e, o, t);
    return { options: g(e, Ae, r), methods: { ...a } };
  },
  io = Object.freeze(
    Object.defineProperty(
      { __proto__: null, setupWMSTileLayer: nt, wmsTileLayerProps: Ae },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  uo = n.defineComponent({
    props: Ae,
    setup(e, o) {
      const t = n.ref(),
        r = n.inject(h),
        a = m(_),
        { options: s, methods: i } = nt(e, t, o);
      return n.onMounted(async () => {
        const { tileLayer: l } = r
          ? b.L
          : await import("leaflet/dist/leaflet-src.esm");
        t.value = n.markRaw(l.wms(e.url, s));
        const { listeners: u } = S(o.attrs);
        t.value.on(u), L(i, t.value, e), a({
          ...e,
          ...i,
          leafletObject: t.value
        }), n.nextTick(() => o.emit("ready", t.value));
      }), { leafletObject: t };
    },
    render() {
      return null;
    }
  }),
  co = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Circle: gt,
        CircleMarker: bt,
        Component: yt,
        Control: Ot,
        ControlAttribution: St,
        ControlLayers: Ct,
        ControlScale: Pt,
        ControlZoom: wt,
        FeatureGroup: It,
        GeoJSON: Gt,
        GridLayer: Nt,
        Icon: Ut,
        ImageOverlay: Ft,
        InteractiveLayer: vt,
        Layer: mt,
        LayerGroup: Bt,
        Marker: xt,
        Path: ft,
        Polygon: Qt,
        Polyline: Rt,
        Popper: Vt,
        Popup: eo,
        Rectangle: oo,
        TileLayer: ro,
        Tooltip: ao,
        WmsTileLayer: io
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
exports.Functions = co;
exports.InjectionKeys = pt;
exports.LCircle = Lt;
exports.LCircleMarker = ht;
exports.LControl = jt;
exports.LControlAttribution = _t;
exports.LControlLayers = Tt;
exports.LControlScale = Mt;
exports.LControlZoom = kt;
exports.LFeatureGroup = At;
exports.LGeoJson = zt;
exports.LGridLayer = $t;
exports.LIcon = Dt;
exports.LImageOverlay = Zt;
exports.LLayerGroup = Et;
exports.LMap = Ht;
exports.LMarker = Kt;
exports.LPolygon = Xt;
exports.LPolyline = Yt;
exports.LPopup = to;
exports.LRectangle = no;
exports.LTileLayer = so;
exports.LTooltip = lo;
exports.LWmsTileLayer = uo;
exports.Utilities = dt;
