/*========= Wow Js =========*/
/*! WOW - v1.1.3 - 2016-05-06
 * Copyright (c) 2016 Matthieu Aussaguel;*/
(function () {
    var a,
      b,
      c,
      d,
      e,
      f = function (a, b) {
        return function () {
          return a.apply(b, arguments);
        };
      },
      g =
        [].indexOf ||
        function (a) {
          for (var b = 0, c = this.length; c > b; b++)
            if (b in this && this[b] === a) return b;
          return -1;
        };
    (b = (function () {
      function a() {}
      return (
        (a.prototype.extend = function (a, b) {
          var c, d;
          for (c in b) (d = b[c]), null == a[c] && (a[c] = d);
          return a;
        }),
        (a.prototype.isMobile = function (a) {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            a
          );
        }),
        (a.prototype.createEvent = function (a, b, c, d) {
          var e;
          return (
            null == b && (b = !1),
            null == c && (c = !1),
            null == d && (d = null),
            null != document.createEvent
              ? ((e = document.createEvent("CustomEvent")),
                e.initCustomEvent(a, b, c, d))
              : null != document.createEventObject
              ? ((e = document.createEventObject()), (e.eventType = a))
              : (e.eventName = a),
            e
          );
        }),
        (a.prototype.emitEvent = function (a, b) {
          return null != a.dispatchEvent
            ? a.dispatchEvent(b)
            : b in (null != a)
            ? a[b]()
            : "on" + b in (null != a)
            ? a["on" + b]()
            : void 0;
        }),
        (a.prototype.addEvent = function (a, b, c) {
          return null != a.addEventListener
            ? a.addEventListener(b, c, !1)
            : null != a.attachEvent
            ? a.attachEvent("on" + b, c)
            : (a[b] = c);
        }),
        (a.prototype.removeEvent = function (a, b, c) {
          return null != a.removeEventListener
            ? a.removeEventListener(b, c, !1)
            : null != a.detachEvent
            ? a.detachEvent("on" + b, c)
            : delete a[b];
        }),
        (a.prototype.innerHeight = function () {
          return "innerHeight" in window
            ? window.innerHeight
            : document.documentElement.clientHeight;
        }),
        a
      );
    })()),
      (c =
        this.WeakMap ||
        this.MozWeakMap ||
        (c = (function () {
          function a() {
            (this.keys = []), (this.values = []);
          }
          return (
            (a.prototype.get = function (a) {
              var b, c, d, e, f;
              for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                if (((c = f[b]), c === a)) return this.values[b];
            }),
            (a.prototype.set = function (a, b) {
              var c, d, e, f, g;
              for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                if (((d = g[c]), d === a)) return void (this.values[c] = b);
              return this.keys.push(a), this.values.push(b);
            }),
            a
          );
        })())),
      (a =
        this.MutationObserver ||
        this.WebkitMutationObserver ||
        this.MozMutationObserver ||
        (a = (function () {
          function a() {
            "undefined" != typeof console &&
              null !== console &&
              console.warn("MutationObserver is not supported by your browser."),
              "undefined" != typeof console &&
                null !== console &&
                console.warn(
                  "WOW.js cannot detect dom mutations, please call .sync() after loading new content."
                );
          }
          return (a.notSupported = !0), (a.prototype.observe = function () {}), a;
        })())),
      (d =
        this.getComputedStyle ||
        function (a, b) {
          return (
            (this.getPropertyValue = function (b) {
              var c;
              return (
                "float" === b && (b = "styleFloat"),
                e.test(b) &&
                  b.replace(e, function (a, b) {
                    return b.toUpperCase();
                  }),
                (null != (c = a.currentStyle) ? c[b] : void 0) || null
              );
            }),
            this
          );
        }),
      (e = /(\-([a-z]){1})/g),
      (this.WOW = (function () {
        function e(a) {
          null == a && (a = {}),
            (this.scrollCallback = f(this.scrollCallback, this)),
            (this.scrollHandler = f(this.scrollHandler, this)),
            (this.resetAnimation = f(this.resetAnimation, this)),
            (this.start = f(this.start, this)),
            (this.scrolled = !0),
            (this.config = this.util().extend(a, this.defaults)),
            null != a.scrollContainer &&
              (this.config.scrollContainer = document.querySelector(
                a.scrollContainer
              )),
            (this.animationNameCache = new c()),
            (this.wowEvent = this.util().createEvent(this.config.boxClass));
        }
        return (
          (e.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0,
            callback: null,
            scrollContainer: null
          }),
          (e.prototype.init = function () {
            var a;
            return (
              (this.element = window.document.documentElement),
              "interactive" === (a = document.readyState) || "complete" === a
                ? this.start()
                : this.util().addEvent(document, "DOMContentLoaded", this.start),
              (this.finished = [])
            );
          }),
          (e.prototype.start = function () {
            var b, c, d, e;
            if (
              ((this.stopped = !1),
              (this.boxes = function () {
                var a, c, d, e;
                for (
                  d = this.element.querySelectorAll("." + this.config.boxClass),
                    e = [],
                    a = 0,
                    c = d.length;
                  c > a;
                  a++
                )
                  (b = d[a]), e.push(b);
                return e;
              }.call(this)),
              (this.all = function () {
                var a, c, d, e;
                for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++)
                  (b = d[a]), e.push(b);
                return e;
              }.call(this)),
              this.boxes.length)
            )
              if (this.disabled()) this.resetStyle();
              else
                for (e = this.boxes, c = 0, d = e.length; d > c; c++)
                  (b = e[c]), this.applyStyle(b, !0);
            return (
              this.disabled() ||
                (this.util().addEvent(
                  this.config.scrollContainer || window,
                  "scroll",
                  this.scrollHandler
                ),
                this.util().addEvent(window, "resize", this.scrollHandler),
                (this.interval = setInterval(this.scrollCallback, 50))),
              this.config.live
                ? new a(
                    (function (a) {
                      return function (b) {
                        var c, d, e, f, g;
                        for (g = [], c = 0, d = b.length; d > c; c++)
                          (f = b[c]),
                            g.push(
                              function () {
                                var a, b, c, d;
                                for (
                                  c = f.addedNodes || [],
                                    d = [],
                                    a = 0,
                                    b = c.length;
                                  b > a;
                                  a++
                                )
                                  (e = c[a]), d.push(this.doSync(e));
                                return d;
                              }.call(a)
                            );
                        return g;
                      };
                    })(this)
                  ).observe(document.body, {
                    childList: !0,
                    subtree: !0
                  })
                : void 0
            );
          }),
          (e.prototype.stop = function () {
            return (
              (this.stopped = !0),
              this.util().removeEvent(
                this.config.scrollContainer || window,
                "scroll",
                this.scrollHandler
              ),
              this.util().removeEvent(window, "resize", this.scrollHandler),
              null != this.interval ? clearInterval(this.interval) : void 0
            );
          }),
          (e.prototype.sync = function (b) {
            return a.notSupported ? this.doSync(this.element) : void 0;
          }),
          (e.prototype.doSync = function (a) {
            var b, c, d, e, f;
            if ((null == a && (a = this.element), 1 === a.nodeType)) {
              for (
                a = a.parentNode || a,
                  e = a.querySelectorAll("." + this.config.boxClass),
                  f = [],
                  c = 0,
                  d = e.length;
                d > c;
                c++
              )
                (b = e[c]),
                  g.call(this.all, b) < 0
                    ? (this.boxes.push(b),
                      this.all.push(b),
                      this.stopped || this.disabled()
                        ? this.resetStyle()
                        : this.applyStyle(b, !0),
                      f.push((this.scrolled = !0)))
                    : f.push(void 0);
              return f;
            }
          }),
          (e.prototype.show = function (a) {
            return (
              this.applyStyle(a),
              (a.className = a.className + " " + this.config.animateClass),
              null != this.config.callback && this.config.callback(a),
              this.util().emitEvent(a, this.wowEvent),
              this.util().addEvent(a, "animationend", this.resetAnimation),
              this.util().addEvent(a, "oanimationend", this.resetAnimation),
              this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation),
              this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation),
              a
            );
          }),
          (e.prototype.applyStyle = function (a, b) {
            var c, d, e;
            return (
              (d = a.getAttribute("data-wow-duration")),
              (c = a.getAttribute("data-wow-delay")),
              (e = a.getAttribute("data-wow-iteration")),
              this.animate(
                (function (f) {
                  return function () {
                    return f.customStyle(a, b, d, c, e);
                  };
                })(this)
              )
            );
          }),
          (e.prototype.animate = (function () {
            return "requestAnimationFrame" in window
              ? function (a) {
                  return window.requestAnimationFrame(a);
                }
              : function (a) {
                  return a();
                };
          })()),
          (e.prototype.resetStyle = function () {
            var a, b, c, d, e;
            for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
              (a = d[b]), e.push((a.style.visibility = "visible"));
            return e;
          }),
          (e.prototype.resetAnimation = function (a) {
            var b;
            return a.type.toLowerCase().indexOf("animationend") >= 0
              ? ((b = a.target || a.srcElement),
                (b.className = b.className
                  .replace(this.config.animateClass, "")
                  .trim()))
              : void 0;
          }),
          (e.prototype.customStyle = function (a, b, c, d, e) {
            return (
              b && this.cacheAnimationName(a),
              (a.style.visibility = b ? "hidden" : "visible"),
              c &&
                this.vendorSet(a.style, {
                  animationDuration: c
                }),
              d &&
                this.vendorSet(a.style, {
                  animationDelay: d
                }),
              e &&
                this.vendorSet(a.style, {
                  animationIterationCount: e
                }),
              this.vendorSet(a.style, {
                animationName: b ? "none" : this.cachedAnimationName(a)
              }),
              a
            );
          }),
          (e.prototype.vendors = ["moz", "webkit"]),
          (e.prototype.vendorSet = function (a, b) {
            var c, d, e, f;
            d = [];
            for (c in b)
              (e = b[c]),
                (a["" + c] = e),
                d.push(
                  function () {
                    var b, d, g, h;
                    for (
                      g = this.vendors, h = [], b = 0, d = g.length;
                      d > b;
                      b++
                    )
                      (f = g[b]),
                        h.push(
                          (a[
                            "" + f + c.charAt(0).toUpperCase() + c.substr(1)
                          ] = e)
                        );
                    return h;
                  }.call(this)
                );
            return d;
          }),
          (e.prototype.vendorCSS = function (a, b) {
            var c, e, f, g, h, i;
            for (
              h = d(a),
                g = h.getPropertyCSSValue(b),
                f = this.vendors,
                c = 0,
                e = f.length;
              e > c;
              c++
            )
              (i = f[c]), (g = g || h.getPropertyCSSValue("-" + i + "-" + b));
            return g;
          }),
          (e.prototype.animationName = function (a) {
            var b;
            try {
              b = this.vendorCSS(a, "animation-name").cssText;
            } catch (c) {
              b = d(a).getPropertyValue("animation-name");
            }
            return "none" === b ? "" : b;
          }),
          (e.prototype.cacheAnimationName = function (a) {
            return this.animationNameCache.set(a, this.animationName(a));
          }),
          (e.prototype.cachedAnimationName = function (a) {
            return this.animationNameCache.get(a);
          }),
          (e.prototype.scrollHandler = function () {
            return (this.scrolled = !0);
          }),
          (e.prototype.scrollCallback = function () {
            var a;
            return !this.scrolled ||
              ((this.scrolled = !1),
              (this.boxes = function () {
                var b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++)
                  (a = d[b]), a && (this.isVisible(a) ? this.show(a) : e.push(a));
                return e;
              }.call(this)),
              this.boxes.length || this.config.live)
              ? void 0
              : this.stop();
          }),
          (e.prototype.offsetTop = function (a) {
            for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
            for (b = a.offsetTop; (a = a.offsetParent); ) b += a.offsetTop;
            return b;
          }),
          (e.prototype.isVisible = function (a) {
            var b, c, d, e, f;
            return (
              (c = a.getAttribute("data-wow-offset") || this.config.offset),
              (f =
                (this.config.scrollContainer &&
                  this.config.scrollContainer.scrollTop) ||
                window.pageYOffset),
              (e =
                f +
                Math.min(this.element.clientHeight, this.util().innerHeight()) -
                c),
              (d = this.offsetTop(a)),
              (b = d + a.clientHeight),
              e >= d && b >= f
            );
          }),
          (e.prototype.util = function () {
            return null != this._util ? this._util : (this._util = new b());
          }),
          (e.prototype.disabled = function () {
            return (
              !this.config.mobile && this.util().isMobile(navigator.userAgent)
            );
          }),
          e
        );
      })());
  }.call(this));
  
  /*
   *
   * scrollup
   * Url: http://markgoodyear.com/labs/scrollup/
   * v2.4.1
   *
   */
  !(function (l, o, e) {
    "use strict";
    (l.fn.scrollUp = function (o) {
      l.data(e.body, "scrollUp") ||
        (l.data(e.body, "scrollUp", !0), l.fn.scrollUp.init(o));
    }),
      (l.fn.scrollUp.init = function (r) {
        var s,
          t,
          c,
          i,
          n,
          a,
          d,
          p = (l.fn.scrollUp.settings = l.extend({}, l.fn.scrollUp.defaults, r)),
          f = !1;
        switch (
          ((d = p.scrollTrigger
            ? l(p.scrollTrigger)
            : l("<a/>", {
                id: p.scrollName,
                href: "#top"
              })),
          p.scrollTitle && d.attr("title", p.scrollTitle),
          d.appendTo("body"),
          p.scrollImg || p.scrollTrigger || d.html(p.scrollText),
          d.css({
            display: "none",
            position: "fixed",
            zIndex: p.zIndex
          }),
          p.activeOverlay &&
            l("<div/>", {
              id: p.scrollName + "-active"
            })
              .css({
                position: "absolute",
                top: p.scrollDistance + "px",
                width: "100%",
                borderTop: "1px dotted" + p.activeOverlay,
                zIndex: p.zIndex
              })
              .appendTo("body"),
          p.animation)
        ) {
          case "fade":
            (s = "fadeIn"), (t = "fadeOut"), (c = p.animationSpeed);
            break;
          case "slide":
            (s = "slideDown"), (t = "slideUp"), (c = p.animationSpeed);
            break;
          default:
            (s = "show"), (t = "hide"), (c = 0);
        }
        (i =
          "top" === p.scrollFrom
            ? p.scrollDistance
            : l(e).height() - l(o).height() - p.scrollDistance),
          (n = l(o).scroll(function () {
            l(o).scrollTop() > i
              ? f || (d[s](c), (f = !0))
              : f && (d[t](c), (f = !1));
          })),
          p.scrollTarget
            ? "number" == typeof p.scrollTarget
              ? (a = p.scrollTarget)
              : "string" == typeof p.scrollTarget &&
                (a = Math.floor(l(p.scrollTarget).offset().top))
            : (a = 0),
          d.click(function (o) {
            o.preventDefault(),
              l("html, body").animate(
                {
                  scrollTop: a
                },
                p.scrollSpeed,
                p.easingType
              );
          });
      }),
      (l.fn.scrollUp.defaults = {
        scrollName: "scrollUp",
        scrollDistance: 300,
        scrollFrom: "top",
        scrollSpeed: 300,
        easingType: "linear",
        animation: "fade",
        animationSpeed: 200,
        scrollTrigger: !1,
        scrollTarget: !1,
        scrollText: "Scroll to top",
        scrollTitle: !1,
        scrollImg: !1,
        activeOverlay: !1,
        zIndex: 2147483647
      }),
      (l.fn.scrollUp.destroy = function (r) {
        l.removeData(e.body, "scrollUp"),
          l("#" + l.fn.scrollUp.settings.scrollName).remove(),
          l("#" + l.fn.scrollUp.settings.scrollName + "-active").remove(),
          l.fn.jquery.split(".")[1] >= 7
            ? l(o).off("scroll", r)
            : l(o).unbind("scroll", r);
      }),
      (l.scrollUp = l.fn.scrollUp);
  })(jQuery, window, document);
  
  /*
   Slick Slider
   Version: 1.8.1
    Author: Ken Wheeler
   Website: http://kenwheeler.github.io
      Docs: http://kenwheeler.github.io/slick
      Repo: http://github.com/kenwheeler/slick
    Issues: http://github.com/kenwheeler/slick/issues
   */
  /* global window, document, define, jQuery, setInterval, clearInterval */
  !(function (i) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], i)
      : "undefined" != typeof exports
      ? (module.exports = i(require("jquery")))
      : i(jQuery);
  })(function (i) {
    "use strict";
    var e = window.Slick || {};
    ((e = (function () {
      var e = 0;
      return function (t, o) {
        var s,
          n = this;
        (n.defaults = {
          accessibility: !0,
          adaptiveHeight: !1,
          appendArrows: i(t),
          appendDots: i(t),
          arrows: !0,
          asNavFor: null,
          prevArrow:
            '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
          nextArrow:
            '<button class="slick-next" aria-label="Next" type="button">Next</button>',
          autoplay: !1,
          autoplaySpeed: 3e3,
          centerMode: !1,
          centerPadding: "50px",
          cssEase: "ease",
          customPaging: function (e, t) {
            return i('<button type="button" />').text(t + 1);
          },
          dots: !1,
          dotsClass: "slick-dots",
          draggable: !0,
          easing: "linear",
          edgeFriction: 0.35,
          fade: !1,
          focusOnSelect: !1,
          focusOnChange: !1,
          infinite: !0,
          initialSlide: 0,
          lazyLoad: "ondemand",
          mobileFirst: !1,
          pauseOnHover: !0,
          pauseOnFocus: !0,
          pauseOnDotsHover: !1,
          respondTo: "window",
          responsive: null,
          rows: 1,
          rtl: !1,
          slide: "",
          slidesPerRow: 1,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 500,
          swipe: !0,
          swipeToSlide: !1,
          touchMove: !0,
          touchThreshold: 5,
          useCSS: !0,
          useTransform: !0,
          variableWidth: !1,
          vertical: !1,
          verticalSwiping: !1,
          waitForAnimate: !0,
          zIndex: 1e3
        }),
          (n.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
          }),
          i.extend(n, n.initials),
          (n.activeBreakpoint = null),
          (n.animType = null),
          (n.animProp = null),
          (n.breakpoints = []),
          (n.breakpointSettings = []),
          (n.cssTransitions = !1),
          (n.focussed = !1),
          (n.interrupted = !1),
          (n.hidden = "hidden"),
          (n.paused = !0),
          (n.positionProp = null),
          (n.respondTo = null),
          (n.rowCount = 1),
          (n.shouldClick = !0),
          (n.$slider = i(t)),
          (n.$slidesCache = null),
          (n.transformType = null),
          (n.transitionType = null),
          (n.visibilityChange = "visibilitychange"),
          (n.windowWidth = 0),
          (n.windowTimer = null),
          (s = i(t).data("slick") || {}),
          (n.options = i.extend({}, n.defaults, o, s)),
          (n.currentSlide = n.options.initialSlide),
          (n.originalSettings = n.options),
          void 0 !== document.mozHidden
            ? ((n.hidden = "mozHidden"),
              (n.visibilityChange = "mozvisibilitychange"))
            : void 0 !== document.webkitHidden &&
              ((n.hidden = "webkitHidden"),
              (n.visibilityChange = "webkitvisibilitychange")),
          (n.autoPlay = i.proxy(n.autoPlay, n)),
          (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
          (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
          (n.changeSlide = i.proxy(n.changeSlide, n)),
          (n.clickHandler = i.proxy(n.clickHandler, n)),
          (n.selectHandler = i.proxy(n.selectHandler, n)),
          (n.setPosition = i.proxy(n.setPosition, n)),
          (n.swipeHandler = i.proxy(n.swipeHandler, n)),
          (n.dragHandler = i.proxy(n.dragHandler, n)),
          (n.keyHandler = i.proxy(n.keyHandler, n)),
          (n.instanceUid = e++),
          (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
          n.registerBreakpoints(),
          n.init(!0);
      };
    })()).prototype.activateADA = function () {
      this.$slideTrack
        .find(".slick-active")
        .attr({
          "aria-hidden": "false"
        })
        .find("a, input, button, select")
        .attr({
          tabindex: "0"
        });
    }),
      (e.prototype.addSlide = e.prototype.slickAdd = function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
      (e.prototype.animateHeight = function () {
        var i = this;
        if (
          1 === i.options.slidesToShow &&
          !0 === i.options.adaptiveHeight &&
          !1 === i.options.vertical
        ) {
          var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
          i.$list.animate(
            {
              height: e
            },
            i.options.speed
          );
        }
      }),
      (e.prototype.animateSlide = function (e, t) {
        var o = {},
          s = this;
        s.animateHeight(),
          !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
          !1 === s.transformsEnabled
            ? !1 === s.options.vertical
              ? s.$slideTrack.animate(
                  {
                    left: e
                  },
                  s.options.speed,
                  s.options.easing,
                  t
                )
              : s.$slideTrack.animate(
                  {
                    top: e
                  },
                  s.options.speed,
                  s.options.easing,
                  t
                )
            : !1 === s.cssTransitions
            ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
              i({
                animStart: s.currentLeft
              }).animate(
                {
                  animStart: e
                },
                {
                  duration: s.options.speed,
                  easing: s.options.easing,
                  step: function (i) {
                    (i = Math.ceil(i)),
                      !1 === s.options.vertical
                        ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                          s.$slideTrack.css(o))
                        : ((o[s.animType] = "translate(0px," + i + "px)"),
                          s.$slideTrack.css(o));
                  },
                  complete: function () {
                    t && t.call();
                  }
                }
              ))
            : (s.applyTransition(),
              (e = Math.ceil(e)),
              !1 === s.options.vertical
                ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
                : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
              s.$slideTrack.css(o),
              t &&
                setTimeout(function () {
                  s.disableTransition(), t.call();
                }, s.options.speed));
      }),
      (e.prototype.getNavTarget = function () {
        var e = this,
          t = e.options.asNavFor;
        return t && null !== t && (t = i(t).not(e.$slider)), t;
      }),
      (e.prototype.asNavFor = function (e) {
        var t = this.getNavTarget();
        null !== t &&
          "object" == typeof t &&
          t.each(function () {
            var t = i(this).slick("getSlick");
            t.unslicked || t.slideHandler(e, !0);
          });
      }),
      (e.prototype.applyTransition = function (i) {
        var e = this,
          t = {};
        !1 === e.options.fade
          ? (t[e.transitionType] =
              e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
          : (t[e.transitionType] =
              "opacity " + e.options.speed + "ms " + e.options.cssEase),
          !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
      }),
      (e.prototype.autoPlay = function () {
        var i = this;
        i.autoPlayClear(),
          i.slideCount > i.options.slidesToShow &&
            (i.autoPlayTimer = setInterval(
              i.autoPlayIterator,
              i.options.autoplaySpeed
            ));
      }),
      (e.prototype.autoPlayClear = function () {
        var i = this;
        i.autoPlayTimer && clearInterval(i.autoPlayTimer);
      }),
      (e.prototype.autoPlayIterator = function () {
        var i = this,
          e = i.currentSlide + i.options.slidesToScroll;
        i.paused ||
          i.interrupted ||
          i.focussed ||
          (!1 === i.options.infinite &&
            (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
              ? (i.direction = 0)
              : 0 === i.direction &&
                ((e = i.currentSlide - i.options.slidesToScroll),
                i.currentSlide - 1 == 0 && (i.direction = 1))),
          i.slideHandler(e));
      }),
      (e.prototype.buildArrows = function () {
        var e = this;
        !0 === e.options.arrows &&
          ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
          (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
          e.slideCount > e.options.slidesToShow
            ? (e.$prevArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.$nextArrow
                .removeClass("slick-hidden")
                .removeAttr("aria-hidden tabindex"),
              e.htmlExpr.test(e.options.prevArrow) &&
                e.$prevArrow.prependTo(e.options.appendArrows),
              e.htmlExpr.test(e.options.nextArrow) &&
                e.$nextArrow.appendTo(e.options.appendArrows),
              !0 !== e.options.infinite &&
                e.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"))
            : e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({
                "aria-disabled": "true",
                tabindex: "-1"
              }));
      }),
      (e.prototype.buildDots = function () {
        var e,
          t,
          o = this;
        if (!0 === o.options.dots) {
          for (
            o.$slider.addClass("slick-dotted"),
              t = i("<ul />").addClass(o.options.dotsClass),
              e = 0;
            e <= o.getDotCount();
            e += 1
          )
            t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
          (o.$dots = t.appendTo(o.options.appendDots)),
            o.$dots.find("li").first().addClass("slick-active");
        }
      }),
      (e.prototype.buildOut = function () {
        var e = this;
        (e.$slides = e.$slider
          .children(e.options.slide + ":not(.slick-cloned)")
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.$slides.each(function (e, t) {
            i(t)
              .attr("data-slick-index", e)
              .data("originalStyling", i(t).attr("style") || "");
          }),
          e.$slider.addClass("slick-slider"),
          (e.$slideTrack =
            0 === e.slideCount
              ? i('<div class="slick-track"/>').appendTo(e.$slider)
              : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
          (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
          e.$slideTrack.css("opacity", 0),
          (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
            (e.options.slidesToScroll = 1),
          i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
          e.setupInfinite(),
          e.buildArrows(),
          e.buildDots(),
          e.updateDots(),
          e.setSlideClasses(
            "number" == typeof e.currentSlide ? e.currentSlide : 0
          ),
          !0 === e.options.draggable && e.$list.addClass("draggable");
      }),
      (e.prototype.buildRows = function () {
        var i,
          e,
          t,
          o,
          s,
          n,
          r,
          l = this;
        if (
          ((o = document.createDocumentFragment()),
          (n = l.$slider.children()),
          l.options.rows > 1)
        ) {
          for (
            r = l.options.slidesPerRow * l.options.rows,
              s = Math.ceil(n.length / r),
              i = 0;
            i < s;
            i++
          ) {
            var d = document.createElement("div");
            for (e = 0; e < l.options.rows; e++) {
              var a = document.createElement("div");
              for (t = 0; t < l.options.slidesPerRow; t++) {
                var c = i * r + (e * l.options.slidesPerRow + t);
                n.get(c) && a.appendChild(n.get(c));
              }
              d.appendChild(a);
            }
            o.appendChild(d);
          }
          l.$slider.empty().append(o),
            l.$slider
              .children()
              .children()
              .children()
              .css({
                width: 100 / l.options.slidesPerRow + "%",
                display: "inline-block"
              });
        }
      }),
      (e.prototype.checkResponsive = function (e, t) {
        var o,
          s,
          n,
          r = this,
          l = !1,
          d = r.$slider.width(),
          a = window.innerWidth || i(window).width();
        if (
          ("window" === r.respondTo
            ? (n = a)
            : "slider" === r.respondTo
            ? (n = d)
            : "min" === r.respondTo && (n = Math.min(a, d)),
          r.options.responsive &&
            r.options.responsive.length &&
            null !== r.options.responsive)
        ) {
          s = null;
          for (o in r.breakpoints)
            r.breakpoints.hasOwnProperty(o) &&
              (!1 === r.originalSettings.mobileFirst
                ? n < r.breakpoints[o] && (s = r.breakpoints[o])
                : n > r.breakpoints[o] && (s = r.breakpoints[o]));
          null !== s
            ? null !== r.activeBreakpoint
              ? (s !== r.activeBreakpoint || t) &&
                ((r.activeBreakpoint = s),
                "unslick" === r.breakpointSettings[s]
                  ? r.unslick(s)
                  : ((r.options = i.extend(
                      {},
                      r.originalSettings,
                      r.breakpointSettings[s]
                    )),
                    !0 === e && (r.currentSlide = r.options.initialSlide),
                    r.refresh(e)),
                (l = s))
              : ((r.activeBreakpoint = s),
                "unslick" === r.breakpointSettings[s]
                  ? r.unslick(s)
                  : ((r.options = i.extend(
                      {},
                      r.originalSettings,
                      r.breakpointSettings[s]
                    )),
                    !0 === e && (r.currentSlide = r.options.initialSlide),
                    r.refresh(e)),
                (l = s))
            : null !== r.activeBreakpoint &&
              ((r.activeBreakpoint = null),
              (r.options = r.originalSettings),
              !0 === e && (r.currentSlide = r.options.initialSlide),
              r.refresh(e),
              (l = s)),
            e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
        }
      }),
      (e.prototype.changeSlide = function (e, t) {
        var o,
          s,
          n,
          r = this,
          l = i(e.currentTarget);
        switch (
          (l.is("a") && e.preventDefault(),
          l.is("li") || (l = l.closest("li")),
          (n = r.slideCount % r.options.slidesToScroll != 0),
          (o = n
            ? 0
            : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
          e.data.message)
        ) {
          case "previous":
            (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
              r.slideCount > r.options.slidesToShow &&
                r.slideHandler(r.currentSlide - s, !1, t);
            break;
          case "next":
            (s = 0 === o ? r.options.slidesToScroll : o),
              r.slideCount > r.options.slidesToShow &&
                r.slideHandler(r.currentSlide + s, !1, t);
            break;
          case "index":
            var d =
              0 === e.data.index
                ? 0
                : e.data.index || l.index() * r.options.slidesToScroll;
            r.slideHandler(r.checkNavigable(d), !1, t),
              l.children().trigger("focus");
            break;
          default:
            return;
        }
      }),
      (e.prototype.checkNavigable = function (i) {
        var e, t;
        if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
          i = e[e.length - 1];
        else
          for (var o in e) {
            if (i < e[o]) {
              i = t;
              break;
            }
            t = e[o];
          }
        return i;
      }),
      (e.prototype.cleanUpEvents = function () {
        var e = this;
        e.options.dots &&
          null !== e.$dots &&
          (i("li", e.$dots)
            .off("click.slick", e.changeSlide)
            .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
          !0 === e.options.accessibility &&
            e.$dots.off("keydown.slick", e.keyHandler)),
          e.$slider.off("focus.slick blur.slick"),
          !0 === e.options.arrows &&
            e.slideCount > e.options.slidesToShow &&
            (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
            e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
            !0 === e.options.accessibility &&
              (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
              e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
          e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
          e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
          e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
          e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
          e.$list.off("click.slick", e.clickHandler),
          i(document).off(e.visibilityChange, e.visibility),
          e.cleanUpSlideEvents(),
          !0 === e.options.accessibility &&
            e.$list.off("keydown.slick", e.keyHandler),
          !0 === e.options.focusOnSelect &&
            i(e.$slideTrack).children().off("click.slick", e.selectHandler),
          i(window).off(
            "orientationchange.slick.slick-" + e.instanceUid,
            e.orientationChange
          ),
          i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
          i("[draggable!=true]", e.$slideTrack).off(
            "dragstart",
            e.preventDefault
          ),
          i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
      }),
      (e.prototype.cleanUpSlideEvents = function () {
        var e = this;
        e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
          e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
      }),
      (e.prototype.cleanUpRows = function () {
        var i,
          e = this;
        e.options.rows > 1 &&
          ((i = e.$slides.children().children()).removeAttr("style"),
          e.$slider.empty().append(i));
      }),
      (e.prototype.clickHandler = function (i) {
        !1 === this.shouldClick &&
          (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
      }),
      (e.prototype.destroy = function (e) {
        var t = this;
        t.autoPlayClear(),
          (t.touchObject = {}),
          t.cleanUpEvents(),
          i(".slick-cloned", t.$slider).detach(),
          t.$dots && t.$dots.remove(),
          t.$prevArrow &&
            t.$prevArrow.length &&
            (t.$prevArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
          t.$nextArrow &&
            t.$nextArrow.length &&
            (t.$nextArrow
              .removeClass("slick-disabled slick-arrow slick-hidden")
              .removeAttr("aria-hidden aria-disabled tabindex")
              .css("display", ""),
            t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
          t.$slides &&
            (t.$slides
              .removeClass(
                "slick-slide slick-active slick-center slick-visible slick-current"
              )
              .removeAttr("aria-hidden")
              .removeAttr("data-slick-index")
              .each(function () {
                i(this).attr("style", i(this).data("originalStyling"));
              }),
            t.$slideTrack.children(this.options.slide).detach(),
            t.$slideTrack.detach(),
            t.$list.detach(),
            t.$slider.append(t.$slides)),
          t.cleanUpRows(),
          t.$slider.removeClass("slick-slider"),
          t.$slider.removeClass("slick-initialized"),
          t.$slider.removeClass("slick-dotted"),
          (t.unslicked = !0),
          e || t.$slider.trigger("destroy", [t]);
      }),
      (e.prototype.disableTransition = function (i) {
        var e = this,
          t = {};
        (t[e.transitionType] = ""),
          !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
      }),
      (e.prototype.fadeSlide = function (i, e) {
        var t = this;
        !1 === t.cssTransitions
          ? (t.$slides.eq(i).css({
              zIndex: t.options.zIndex
            }),
            t.$slides.eq(i).animate(
              {
                opacity: 1
              },
              t.options.speed,
              t.options.easing,
              e
            ))
          : (t.applyTransition(i),
            t.$slides.eq(i).css({
              opacity: 1,
              zIndex: t.options.zIndex
            }),
            e &&
              setTimeout(function () {
                t.disableTransition(i), e.call();
              }, t.options.speed));
      }),
      (e.prototype.fadeSlideOut = function (i) {
        var e = this;
        !1 === e.cssTransitions
          ? e.$slides.eq(i).animate(
              {
                opacity: 0,
                zIndex: e.options.zIndex - 2
              },
              e.options.speed,
              e.options.easing
            )
          : (e.applyTransition(i),
            e.$slides.eq(i).css({
              opacity: 0,
              zIndex: e.options.zIndex - 2
            }));
      }),
      (e.prototype.filterSlides = e.prototype.slickFilter = function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
      (e.prototype.focusHandler = function () {
        var e = this;
        e.$slider
          .off("focus.slick blur.slick")
          .on("focus.slick blur.slick", "*", function (t) {
            t.stopImmediatePropagation();
            var o = i(this);
            setTimeout(function () {
              e.options.pauseOnFocus &&
                ((e.focussed = o.is(":focus")), e.autoPlay());
            }, 0);
          });
      }),
      (e.prototype.getCurrent = e.prototype.slickCurrentSlide = function () {
        return this.currentSlide;
      }),
      (e.prototype.getDotCount = function () {
        var i = this,
          e = 0,
          t = 0,
          o = 0;
        if (!0 === i.options.infinite)
          if (i.slideCount <= i.options.slidesToShow) ++o;
          else
            for (; e < i.slideCount; )
              ++o,
                (e = t + i.options.slidesToScroll),
                (t +=
                  i.options.slidesToScroll <= i.options.slidesToShow
                    ? i.options.slidesToScroll
                    : i.options.slidesToShow);
        else if (!0 === i.options.centerMode) o = i.slideCount;
        else if (i.options.asNavFor)
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
        else
          o =
            1 +
            Math.ceil(
              (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
            );
        return o - 1;
      }),
      (e.prototype.getLeft = function (i) {
        var e,
          t,
          o,
          s,
          n = this,
          r = 0;
        return (
          (n.slideOffset = 0),
          (t = n.$slides.first().outerHeight(!0)),
          !0 === n.options.infinite
            ? (n.slideCount > n.options.slidesToShow &&
                ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
                (s = -1),
                !0 === n.options.vertical &&
                  !0 === n.options.centerMode &&
                  (2 === n.options.slidesToShow
                    ? (s = -1.5)
                    : 1 === n.options.slidesToShow && (s = -2)),
                (r = t * n.options.slidesToShow * s)),
              n.slideCount % n.options.slidesToScroll != 0 &&
                i + n.options.slidesToScroll > n.slideCount &&
                n.slideCount > n.options.slidesToShow &&
                (i > n.slideCount
                  ? ((n.slideOffset =
                      (n.options.slidesToShow - (i - n.slideCount)) *
                      n.slideWidth *
                      -1),
                    (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                  : ((n.slideOffset =
                      (n.slideCount % n.options.slidesToScroll) *
                      n.slideWidth *
                      -1),
                    (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
            : i + n.options.slidesToShow > n.slideCount &&
              ((n.slideOffset =
                (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
              (r = (i + n.options.slidesToShow - n.slideCount) * t)),
          n.slideCount <= n.options.slidesToShow &&
            ((n.slideOffset = 0), (r = 0)),
          !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
            ? (n.slideOffset =
                (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
                (n.slideWidth * n.slideCount) / 2)
            : !0 === n.options.centerMode && !0 === n.options.infinite
            ? (n.slideOffset +=
                n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
                n.slideWidth)
            : !0 === n.options.centerMode &&
              ((n.slideOffset = 0),
              (n.slideOffset +=
                n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
          (e =
            !1 === n.options.vertical
              ? i * n.slideWidth * -1 + n.slideOffset
              : i * t * -1 + r),
          !0 === n.options.variableWidth &&
            ((o =
              n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            !0 === n.options.centerMode &&
              ((o =
                n.slideCount <= n.options.slidesToShow ||
                !1 === n.options.infinite
                  ? n.$slideTrack.children(".slick-slide").eq(i)
                  : n.$slideTrack
                      .children(".slick-slide")
                      .eq(i + n.options.slidesToShow + 1)),
              (e =
                !0 === n.options.rtl
                  ? o[0]
                    ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                    : 0
                  : o[0]
                  ? -1 * o[0].offsetLeft
                  : 0),
              (e += (n.$list.width() - o.outerWidth()) / 2))),
          e
        );
      }),
      (e.prototype.getOption = e.prototype.slickGetOption = function (i) {
        return this.options[i];
      }),
      (e.prototype.getNavigableIndexes = function () {
        var i,
          e = this,
          t = 0,
          o = 0,
          s = [];
        for (
          !1 === e.options.infinite
            ? (i = e.slideCount)
            : ((t = -1 * e.options.slidesToScroll),
              (o = -1 * e.options.slidesToScroll),
              (i = 2 * e.slideCount));
          t < i;
  
        )
          s.push(t),
            (t = o + e.options.slidesToScroll),
            (o +=
              e.options.slidesToScroll <= e.options.slidesToShow
                ? e.options.slidesToScroll
                : e.options.slidesToShow);
        return s;
      }),
      (e.prototype.getSlick = function () {
        return this;
      }),
      (e.prototype.getSlideCount = function () {
        var e,
          t,
          o = this;
        return (
          (t =
            !0 === o.options.centerMode
              ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
              : 0),
          !0 === o.options.swipeToSlide
            ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
                if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                  return (e = n), !1;
              }),
              Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
            : o.options.slidesToScroll
        );
      }),
      (e.prototype.goTo = e.prototype.slickGoTo = function (i, e) {
        this.changeSlide(
          {
            data: {
              message: "index",
              index: parseInt(i)
            }
          },
          e
        );
      }),
      (e.prototype.init = function (e) {
        var t = this;
        i(t.$slider).hasClass("slick-initialized") ||
          (i(t.$slider).addClass("slick-initialized"),
          t.buildRows(),
          t.buildOut(),
          t.setProps(),
          t.startLoad(),
          t.loadSlider(),
          t.initializeEvents(),
          t.updateArrows(),
          t.updateDots(),
          t.checkResponsive(!0),
          t.focusHandler()),
          e && t.$slider.trigger("init", [t]),
          !0 === t.options.accessibility && t.initADA(),
          t.options.autoplay && ((t.paused = !1), t.autoPlay());
      }),
      (e.prototype.initADA = function () {
        var e = this,
          t = Math.ceil(e.slideCount / e.options.slidesToShow),
          o = e.getNavigableIndexes().filter(function (i) {
            return i >= 0 && i < e.slideCount;
          });
        e.$slides
          .add(e.$slideTrack.find(".slick-cloned"))
          .attr({
            "aria-hidden": "true",
            tabindex: "-1"
          })
          .find("a, input, button, select")
          .attr({
            tabindex: "-1"
          }),
          null !== e.$dots &&
            (e.$slides
              .not(e.$slideTrack.find(".slick-cloned"))
              .each(function (t) {
                var s = o.indexOf(t);
                i(this).attr({
                  role: "tabpanel",
                  id: "slick-slide" + e.instanceUid + t,
                  tabindex: -1
                }),
                  -1 !== s &&
                    i(this).attr({
                      "aria-describedby":
                        "slick-slide-control" + e.instanceUid + s
                    });
              }),
            e.$dots
              .attr("role", "tablist")
              .find("li")
              .each(function (s) {
                var n = o[s];
                i(this).attr({
                  role: "presentation"
                }),
                  i(this)
                    .find("button")
                    .first()
                    .attr({
                      role: "tab",
                      id: "slick-slide-control" + e.instanceUid + s,
                      "aria-controls": "slick-slide" + e.instanceUid + n,
                      "aria-label": s + 1 + " of " + t,
                      "aria-selected": null,
                      tabindex: "-1"
                    });
              })
              .eq(e.currentSlide)
              .find("button")
              .attr({
                "aria-selected": "true",
                tabindex: "0"
              })
              .end());
        for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
          e.$slides.eq(s).attr("tabindex", 0);
        e.activateADA();
      }),
      (e.prototype.initArrowEvents = function () {
        var i = this;
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          (i.$prevArrow.off("click.slick").on(
            "click.slick",
            {
              message: "previous"
            },
            i.changeSlide
          ),
          i.$nextArrow.off("click.slick").on(
            "click.slick",
            {
              message: "next"
            },
            i.changeSlide
          ),
          !0 === i.options.accessibility &&
            (i.$prevArrow.on("keydown.slick", i.keyHandler),
            i.$nextArrow.on("keydown.slick", i.keyHandler)));
      }),
      (e.prototype.initDotEvents = function () {
        var e = this;
        !0 === e.options.dots &&
          (i("li", e.$dots).on(
            "click.slick",
            {
              message: "index"
            },
            e.changeSlide
          ),
          !0 === e.options.accessibility &&
            e.$dots.on("keydown.slick", e.keyHandler)),
          !0 === e.options.dots &&
            !0 === e.options.pauseOnDotsHover &&
            i("li", e.$dots)
              .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
              .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
      }),
      (e.prototype.initSlideEvents = function () {
        var e = this;
        e.options.pauseOnHover &&
          (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
          e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
      }),
      (e.prototype.initializeEvents = function () {
        var e = this;
        e.initArrowEvents(),
          e.initDotEvents(),
          e.initSlideEvents(),
          e.$list.on(
            "touchstart.slick mousedown.slick",
            {
              action: "start"
            },
            e.swipeHandler
          ),
          e.$list.on(
            "touchmove.slick mousemove.slick",
            {
              action: "move"
            },
            e.swipeHandler
          ),
          e.$list.on(
            "touchend.slick mouseup.slick",
            {
              action: "end"
            },
            e.swipeHandler
          ),
          e.$list.on(
            "touchcancel.slick mouseleave.slick",
            {
              action: "end"
            },
            e.swipeHandler
          ),
          e.$list.on("click.slick", e.clickHandler),
          i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
          !0 === e.options.accessibility &&
            e.$list.on("keydown.slick", e.keyHandler),
          !0 === e.options.focusOnSelect &&
            i(e.$slideTrack).children().on("click.slick", e.selectHandler),
          i(window).on(
            "orientationchange.slick.slick-" + e.instanceUid,
            i.proxy(e.orientationChange, e)
          ),
          i(window).on(
            "resize.slick.slick-" + e.instanceUid,
            i.proxy(e.resize, e)
          ),
          i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
          i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
          i(e.setPosition);
      }),
      (e.prototype.initUI = function () {
        var i = this;
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          (i.$prevArrow.show(), i.$nextArrow.show()),
          !0 === i.options.dots &&
            i.slideCount > i.options.slidesToShow &&
            i.$dots.show();
      }),
      (e.prototype.keyHandler = function (i) {
        var e = this;
        i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
          (37 === i.keyCode && !0 === e.options.accessibility
            ? e.changeSlide({
                data: {
                  message: !0 === e.options.rtl ? "next" : "previous"
                }
              })
            : 39 === i.keyCode &&
              !0 === e.options.accessibility &&
              e.changeSlide({
                data: {
                  message: !0 === e.options.rtl ? "previous" : "next"
                }
              }));
      }),
      (e.prototype.lazyLoad = function () {
        function e(e) {
          i("img[data-lazy]", e).each(function () {
            var e = i(this),
              t = i(this).attr("data-lazy"),
              o = i(this).attr("data-srcset"),
              s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
              r = document.createElement("img");
            (r.onload = function () {
              e.animate(
                {
                  opacity: 0
                },
                100,
                function () {
                  o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                    e.attr("src", t).animate(
                      {
                        opacity: 1
                      },
                      200,
                      function () {
                        e.removeAttr(
                          "data-lazy data-srcset data-sizes"
                        ).removeClass("slick-loading");
                      }
                    ),
                    n.$slider.trigger("lazyLoaded", [n, e, t]);
                }
              );
            }),
              (r.onerror = function () {
                e
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                  n.$slider.trigger("lazyLoadError", [n, e, t]);
              }),
              (r.src = t);
          });
        }
        var t,
          o,
          s,
          n = this;
        if (
          (!0 === n.options.centerMode
            ? !0 === n.options.infinite
              ? (s =
                  (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                  n.options.slidesToShow +
                  2)
              : ((o = Math.max(
                  0,
                  n.currentSlide - (n.options.slidesToShow / 2 + 1)
                )),
                (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
            : ((o = n.options.infinite
                ? n.options.slidesToShow + n.currentSlide
                : n.currentSlide),
              (s = Math.ceil(o + n.options.slidesToShow)),
              !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
          (t = n.$slider.find(".slick-slide").slice(o, s)),
          "anticipated" === n.options.lazyLoad)
        )
          for (
            var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
            a < n.options.slidesToScroll;
            a++
          )
            r < 0 && (r = n.slideCount - 1),
              (t = (t = t.add(d.eq(r))).add(d.eq(l))),
              r--,
              l++;
        e(t),
          n.slideCount <= n.options.slidesToShow
            ? e(n.$slider.find(".slick-slide"))
            : n.currentSlide >= n.slideCount - n.options.slidesToShow
            ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
            : 0 === n.currentSlide &&
              e(
                n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
              );
      }),
      (e.prototype.loadSlider = function () {
        var i = this;
        i.setPosition(),
          i.$slideTrack.css({
            opacity: 1
          }),
          i.$slider.removeClass("slick-loading"),
          i.initUI(),
          "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
      }),
      (e.prototype.next = e.prototype.slickNext = function () {
        this.changeSlide({
          data: {
            message: "next"
          }
        });
      }),
      (e.prototype.orientationChange = function () {
        var i = this;
        i.checkResponsive(), i.setPosition();
      }),
      (e.prototype.pause = e.prototype.slickPause = function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
      (e.prototype.play = e.prototype.slickPlay = function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
      (e.prototype.postSlide = function (e) {
        var t = this;
        t.unslicked ||
          (t.$slider.trigger("afterChange", [t, e]),
          (t.animating = !1),
          t.slideCount > t.options.slidesToShow && t.setPosition(),
          (t.swipeLeft = null),
          t.options.autoplay && t.autoPlay(),
          !0 === t.options.accessibility &&
            (t.initADA(),
            t.options.focusOnChange &&
              i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
      }),
      (e.prototype.prev = e.prototype.slickPrev = function () {
        this.changeSlide({
          data: {
            message: "previous"
          }
        });
      }),
      (e.prototype.preventDefault = function (i) {
        i.preventDefault();
      }),
      (e.prototype.progressiveLazyLoad = function (e) {
        e = e || 1;
        var t,
          o,
          s,
          n,
          r,
          l = this,
          d = i("img[data-lazy]", l.$slider);
        d.length
          ? ((t = d.first()),
            (o = t.attr("data-lazy")),
            (s = t.attr("data-srcset")),
            (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
            ((r = document.createElement("img")).onload = function () {
              s && (t.attr("srcset", s), n && t.attr("sizes", n)),
                t
                  .attr("src", o)
                  .removeAttr("data-lazy data-srcset data-sizes")
                  .removeClass("slick-loading"),
                !0 === l.options.adaptiveHeight && l.setPosition(),
                l.$slider.trigger("lazyLoaded", [l, t, o]),
                l.progressiveLazyLoad();
            }),
            (r.onerror = function () {
              e < 3
                ? setTimeout(function () {
                    l.progressiveLazyLoad(e + 1);
                  }, 500)
                : (t
                    .removeAttr("data-lazy")
                    .removeClass("slick-loading")
                    .addClass("slick-lazyload-error"),
                  l.$slider.trigger("lazyLoadError", [l, t, o]),
                  l.progressiveLazyLoad());
            }),
            (r.src = o))
          : l.$slider.trigger("allImagesLoaded", [l]);
      }),
      (e.prototype.refresh = function (e) {
        var t,
          o,
          s = this;
        (o = s.slideCount - s.options.slidesToShow),
          !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
          s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
          (t = s.currentSlide),
          s.destroy(!0),
          i.extend(s, s.initials, {
            currentSlide: t
          }),
          s.init(),
          e ||
            s.changeSlide(
              {
                data: {
                  message: "index",
                  index: t
                }
              },
              !1
            );
      }),
      (e.prototype.registerBreakpoints = function () {
        var e,
          t,
          o,
          s = this,
          n = s.options.responsive || null;
        if ("array" === i.type(n) && n.length) {
          s.respondTo = s.options.respondTo || "window";
          for (e in n)
            if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
              for (t = n[e].breakpoint; o >= 0; )
                s.breakpoints[o] &&
                  s.breakpoints[o] === t &&
                  s.breakpoints.splice(o, 1),
                  o--;
              s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
            }
          s.breakpoints.sort(function (i, e) {
            return s.options.mobileFirst ? i - e : e - i;
          });
        }
      }),
      (e.prototype.reinit = function () {
        var e = this;
        (e.$slides = e.$slideTrack
          .children(e.options.slide)
          .addClass("slick-slide")),
          (e.slideCount = e.$slides.length),
          e.currentSlide >= e.slideCount &&
            0 !== e.currentSlide &&
            (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
          e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
          e.registerBreakpoints(),
          e.setProps(),
          e.setupInfinite(),
          e.buildArrows(),
          e.updateArrows(),
          e.initArrowEvents(),
          e.buildDots(),
          e.updateDots(),
          e.initDotEvents(),
          e.cleanUpSlideEvents(),
          e.initSlideEvents(),
          e.checkResponsive(!1, !0),
          !0 === e.options.focusOnSelect &&
            i(e.$slideTrack).children().on("click.slick", e.selectHandler),
          e.setSlideClasses(
            "number" == typeof e.currentSlide ? e.currentSlide : 0
          ),
          e.setPosition(),
          e.focusHandler(),
          (e.paused = !e.options.autoplay),
          e.autoPlay(),
          e.$slider.trigger("reInit", [e]);
      }),
      (e.prototype.resize = function () {
        var e = this;
        i(window).width() !== e.windowWidth &&
          (clearTimeout(e.windowDelay),
          (e.windowDelay = window.setTimeout(function () {
            (e.windowWidth = i(window).width()),
              e.checkResponsive(),
              e.unslicked || e.setPosition();
          }, 50)));
      }),
      (e.prototype.removeSlide = e.prototype.slickRemove = function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
      (e.prototype.setCSS = function (i) {
        var e,
          t,
          o = this,
          s = {};
        !0 === o.options.rtl && (i = -i),
          (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
          (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
          (s[o.positionProp] = i),
          !1 === o.transformsEnabled
            ? o.$slideTrack.css(s)
            : ((s = {}),
              !1 === o.cssTransitions
                ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                  o.$slideTrack.css(s))
                : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                  o.$slideTrack.css(s)));
      }),
      (e.prototype.setDimensions = function () {
        var i = this;
        !1 === i.options.vertical
          ? !0 === i.options.centerMode &&
            i.$list.css({
              padding: "0px " + i.options.centerPadding
            })
          : (i.$list.height(
              i.$slides.first().outerHeight(!0) * i.options.slidesToShow
            ),
            !0 === i.options.centerMode &&
              i.$list.css({
                padding: i.options.centerPadding + " 0px"
              })),
          (i.listWidth = i.$list.width()),
          (i.listHeight = i.$list.height()),
          !1 === i.options.vertical && !1 === i.options.variableWidth
            ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
              i.$slideTrack.width(
                Math.ceil(
                  i.slideWidth * i.$slideTrack.children(".slick-slide").length
                )
              ))
            : !0 === i.options.variableWidth
            ? i.$slideTrack.width(5e3 * i.slideCount)
            : ((i.slideWidth = Math.ceil(i.listWidth)),
              i.$slideTrack.height(
                Math.ceil(
                  i.$slides.first().outerHeight(!0) *
                    i.$slideTrack.children(".slick-slide").length
                )
              ));
        var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
        !1 === i.options.variableWidth &&
          i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
      }),
      (e.prototype.setFade = function () {
        var e,
          t = this;
        t.$slides.each(function (o, s) {
          (e = t.slideWidth * o * -1),
            !0 === t.options.rtl
              ? i(s).css({
                  position: "relative",
                  right: e,
                  top: 0,
                  zIndex: t.options.zIndex - 2,
                  opacity: 0
                })
              : i(s).css({
                  position: "relative",
                  left: e,
                  top: 0,
                  zIndex: t.options.zIndex - 2,
                  opacity: 0
                });
        }),
          t.$slides.eq(t.currentSlide).css({
            zIndex: t.options.zIndex - 1,
            opacity: 1
          });
      }),
      (e.prototype.setHeight = function () {
        var i = this;
        if (
          1 === i.options.slidesToShow &&
          !0 === i.options.adaptiveHeight &&
          !1 === i.options.vertical
        ) {
          var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
          i.$list.css("height", e);
        }
      }),
      (e.prototype.setOption = e.prototype.slickSetOption = function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
      (e.prototype.setPosition = function () {
        var i = this;
        i.setDimensions(),
          i.setHeight(),
          !1 === i.options.fade
            ? i.setCSS(i.getLeft(i.currentSlide))
            : i.setFade(),
          i.$slider.trigger("setPosition", [i]);
      }),
      (e.prototype.setProps = function () {
        var i = this,
          e = document.body.style;
        (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
          "top" === i.positionProp
            ? i.$slider.addClass("slick-vertical")
            : i.$slider.removeClass("slick-vertical"),
          (void 0 === e.WebkitTransition &&
            void 0 === e.MozTransition &&
            void 0 === e.msTransition) ||
            (!0 === i.options.useCSS && (i.cssTransitions = !0)),
          i.options.fade &&
            ("number" == typeof i.options.zIndex
              ? i.options.zIndex < 3 && (i.options.zIndex = 3)
              : (i.options.zIndex = i.defaults.zIndex)),
          void 0 !== e.OTransform &&
            ((i.animType = "OTransform"),
            (i.transformType = "-o-transform"),
            (i.transitionType = "OTransition"),
            void 0 === e.perspectiveProperty &&
              void 0 === e.webkitPerspective &&
              (i.animType = !1)),
          void 0 !== e.MozTransform &&
            ((i.animType = "MozTransform"),
            (i.transformType = "-moz-transform"),
            (i.transitionType = "MozTransition"),
            void 0 === e.perspectiveProperty &&
              void 0 === e.MozPerspective &&
              (i.animType = !1)),
          void 0 !== e.webkitTransform &&
            ((i.animType = "webkitTransform"),
            (i.transformType = "-webkit-transform"),
            (i.transitionType = "webkitTransition"),
            void 0 === e.perspectiveProperty &&
              void 0 === e.webkitPerspective &&
              (i.animType = !1)),
          void 0 !== e.msTransform &&
            ((i.animType = "msTransform"),
            (i.transformType = "-ms-transform"),
            (i.transitionType = "msTransition"),
            void 0 === e.msTransform && (i.animType = !1)),
          void 0 !== e.transform &&
            !1 !== i.animType &&
            ((i.animType = "transform"),
            (i.transformType = "transform"),
            (i.transitionType = "transition")),
          (i.transformsEnabled =
            i.options.useTransform && null !== i.animType && !1 !== i.animType);
      }),
      (e.prototype.setSlideClasses = function (i) {
        var e,
          t,
          o,
          s,
          n = this;
        if (
          ((t = n.$slider
            .find(".slick-slide")
            .removeClass("slick-active slick-center slick-current")
            .attr("aria-hidden", "true")),
          n.$slides.eq(i).addClass("slick-current"),
          !0 === n.options.centerMode)
        ) {
          var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
          (e = Math.floor(n.options.slidesToShow / 2)),
            !0 === n.options.infinite &&
              (i >= e && i <= n.slideCount - 1 - e
                ? n.$slides
                    .slice(i - e + r, i + e + 1)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : ((o = n.options.slidesToShow + i),
                  t
                    .slice(o - e + 1 + r, o + e + 2)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")),
              0 === i
                ? t
                    .eq(t.length - 1 - n.options.slidesToShow)
                    .addClass("slick-center")
                : i === n.slideCount - 1 &&
                  t.eq(n.options.slidesToShow).addClass("slick-center")),
            n.$slides.eq(i).addClass("slick-center");
        } else
          i >= 0 && i <= n.slideCount - n.options.slidesToShow
            ? n.$slides
                .slice(i, i + n.options.slidesToShow)
                .addClass("slick-active")
                .attr("aria-hidden", "false")
            : t.length <= n.options.slidesToShow
            ? t.addClass("slick-active").attr("aria-hidden", "false")
            : ((s = n.slideCount % n.options.slidesToShow),
              (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
              n.options.slidesToShow == n.options.slidesToScroll &&
              n.slideCount - i < n.options.slidesToShow
                ? t
                    .slice(o - (n.options.slidesToShow - s), o + s)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false")
                : t
                    .slice(o, o + n.options.slidesToShow)
                    .addClass("slick-active")
                    .attr("aria-hidden", "false"));
        ("ondemand" !== n.options.lazyLoad &&
          "anticipated" !== n.options.lazyLoad) ||
          n.lazyLoad();
      }),
      (e.prototype.setupInfinite = function () {
        var e,
          t,
          o,
          s = this;
        if (
          (!0 === s.options.fade && (s.options.centerMode = !1),
          !0 === s.options.infinite &&
            !1 === s.options.fade &&
            ((t = null), s.slideCount > s.options.slidesToShow))
        ) {
          for (
            o =
              !0 === s.options.centerMode
                ? s.options.slidesToShow + 1
                : s.options.slidesToShow,
              e = s.slideCount;
            e > s.slideCount - o;
            e -= 1
          )
            (t = e - 1),
              i(s.$slides[t])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", t - s.slideCount)
                .prependTo(s.$slideTrack)
                .addClass("slick-cloned");
          for (e = 0; e < o + s.slideCount; e += 1)
            (t = e),
              i(s.$slides[t])
                .clone(!0)
                .attr("id", "")
                .attr("data-slick-index", t + s.slideCount)
                .appendTo(s.$slideTrack)
                .addClass("slick-cloned");
          s.$slideTrack
            .find(".slick-cloned")
            .find("[id]")
            .each(function () {
              i(this).attr("id", "");
            });
        }
      }),
      (e.prototype.interrupt = function (i) {
        var e = this;
        i || e.autoPlay(), (e.interrupted = i);
      }),
      (e.prototype.selectHandler = function (e) {
        var t = this,
          o = i(e.target).is(".slick-slide")
            ? i(e.target)
            : i(e.target).parents(".slick-slide"),
          s = parseInt(o.attr("data-slick-index"));
        s || (s = 0),
          t.slideCount <= t.options.slidesToShow
            ? t.slideHandler(s, !1, !0)
            : t.slideHandler(s);
      }),
      (e.prototype.slideHandler = function (i, e, t) {
        var o,
          s,
          n,
          r,
          l,
          d = null,
          a = this;
        if (
          ((e = e || !1),
          !(
            (!0 === a.animating && !0 === a.options.waitForAnimate) ||
            (!0 === a.options.fade && a.currentSlide === i)
          ))
        )
          if (
            (!1 === e && a.asNavFor(i),
            (o = i),
            (d = a.getLeft(o)),
            (r = a.getLeft(a.currentSlide)),
            (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
            !1 === a.options.infinite &&
              !1 === a.options.centerMode &&
              (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
          )
            !1 === a.options.fade &&
              ((o = a.currentSlide),
              !0 !== t
                ? a.animateSlide(r, function () {
                    a.postSlide(o);
                  })
                : a.postSlide(o));
          else if (
            !1 === a.options.infinite &&
            !0 === a.options.centerMode &&
            (i < 0 || i > a.slideCount - a.options.slidesToScroll)
          )
            !1 === a.options.fade &&
              ((o = a.currentSlide),
              !0 !== t
                ? a.animateSlide(r, function () {
                    a.postSlide(o);
                  })
                : a.postSlide(o));
          else {
            if (
              (a.options.autoplay && clearInterval(a.autoPlayTimer),
              (s =
                o < 0
                  ? a.slideCount % a.options.slidesToScroll != 0
                    ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                    : a.slideCount + o
                  : o >= a.slideCount
                  ? a.slideCount % a.options.slidesToScroll != 0
                    ? 0
                    : o - a.slideCount
                  : o),
              (a.animating = !0),
              a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
              (n = a.currentSlide),
              (a.currentSlide = s),
              a.setSlideClasses(a.currentSlide),
              a.options.asNavFor &&
                (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                  l.options.slidesToShow &&
                l.setSlideClasses(a.currentSlide),
              a.updateDots(),
              a.updateArrows(),
              !0 === a.options.fade)
            )
              return (
                !0 !== t
                  ? (a.fadeSlideOut(n),
                    a.fadeSlide(s, function () {
                      a.postSlide(s);
                    }))
                  : a.postSlide(s),
                void a.animateHeight()
              );
            !0 !== t
              ? a.animateSlide(d, function () {
                  a.postSlide(s);
                })
              : a.postSlide(s);
          }
      }),
      (e.prototype.startLoad = function () {
        var i = this;
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          (i.$prevArrow.hide(), i.$nextArrow.hide()),
          !0 === i.options.dots &&
            i.slideCount > i.options.slidesToShow &&
            i.$dots.hide(),
          i.$slider.addClass("slick-loading");
      }),
      (e.prototype.swipeDirection = function () {
        var i,
          e,
          t,
          o,
          s = this;
        return (
          (i = s.touchObject.startX - s.touchObject.curX),
          (e = s.touchObject.startY - s.touchObject.curY),
          (t = Math.atan2(e, i)),
          (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
          o <= 45 && o >= 0
            ? !1 === s.options.rtl
              ? "left"
              : "right"
            : o <= 360 && o >= 315
            ? !1 === s.options.rtl
              ? "left"
              : "right"
            : o >= 135 && o <= 225
            ? !1 === s.options.rtl
              ? "right"
              : "left"
            : !0 === s.options.verticalSwiping
            ? o >= 35 && o <= 135
              ? "down"
              : "up"
            : "vertical"
        );
      }),
      (e.prototype.swipeEnd = function (i) {
        var e,
          t,
          o = this;
        if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
          return (o.scrolling = !1), !1;
        if (
          ((o.interrupted = !1),
          (o.shouldClick = !(o.touchObject.swipeLength > 10)),
          void 0 === o.touchObject.curX)
        )
          return !1;
        if (
          (!0 === o.touchObject.edgeHit &&
            o.$slider.trigger("edge", [o, o.swipeDirection()]),
          o.touchObject.swipeLength >= o.touchObject.minSwipe)
        ) {
          switch ((t = o.swipeDirection())) {
            case "left":
            case "down":
              (e = o.options.swipeToSlide
                ? o.checkNavigable(o.currentSlide + o.getSlideCount())
                : o.currentSlide + o.getSlideCount()),
                (o.currentDirection = 0);
              break;
            case "right":
            case "up":
              (e = o.options.swipeToSlide
                ? o.checkNavigable(o.currentSlide - o.getSlideCount())
                : o.currentSlide - o.getSlideCount()),
                (o.currentDirection = 1);
          }
          "vertical" != t &&
            (o.slideHandler(e),
            (o.touchObject = {}),
            o.$slider.trigger("swipe", [o, t]));
        } else
          o.touchObject.startX !== o.touchObject.curX &&
            (o.slideHandler(o.currentSlide), (o.touchObject = {}));
      }),
      (e.prototype.swipeHandler = function (i) {
        var e = this;
        if (
          !(
            !1 === e.options.swipe ||
            ("ontouchend" in document && !1 === e.options.swipe) ||
            (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
          )
        )
          switch (
            ((e.touchObject.fingerCount =
              i.originalEvent && void 0 !== i.originalEvent.touches
                ? i.originalEvent.touches.length
                : 1),
            (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
            !0 === e.options.verticalSwiping &&
              (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
            i.data.action)
          ) {
            case "start":
              e.swipeStart(i);
              break;
            case "move":
              e.swipeMove(i);
              break;
            case "end":
              e.swipeEnd(i);
          }
      }),
      (e.prototype.swipeMove = function (i) {
        var e,
          t,
          o,
          s,
          n,
          r,
          l = this;
        return (
          (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
          !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
            ((e = l.getLeft(l.currentSlide)),
            (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
            (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
            (l.touchObject.swipeLength = Math.round(
              Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
            )),
            (r = Math.round(
              Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
            )),
            !l.options.verticalSwiping && !l.swiping && r > 4
              ? ((l.scrolling = !0), !1)
              : (!0 === l.options.verticalSwiping &&
                  (l.touchObject.swipeLength = r),
                (t = l.swipeDirection()),
                void 0 !== i.originalEvent &&
                  l.touchObject.swipeLength > 4 &&
                  ((l.swiping = !0), i.preventDefault()),
                (s =
                  (!1 === l.options.rtl ? 1 : -1) *
                  (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
                !0 === l.options.verticalSwiping &&
                  (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                (o = l.touchObject.swipeLength),
                (l.touchObject.edgeHit = !1),
                !1 === l.options.infinite &&
                  ((0 === l.currentSlide && "right" === t) ||
                    (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                  ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                  (l.touchObject.edgeHit = !0)),
                !1 === l.options.vertical
                  ? (l.swipeLeft = e + o * s)
                  : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
                !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
                !0 !== l.options.fade &&
                  !1 !== l.options.touchMove &&
                  (!0 === l.animating
                    ? ((l.swipeLeft = null), !1)
                    : void l.setCSS(l.swipeLeft))))
        );
      }),
      (e.prototype.swipeStart = function (i) {
        var e,
          t = this;
        if (
          ((t.interrupted = !0),
          1 !== t.touchObject.fingerCount ||
            t.slideCount <= t.options.slidesToShow)
        )
          return (t.touchObject = {}), !1;
        void 0 !== i.originalEvent &&
          void 0 !== i.originalEvent.touches &&
          (e = i.originalEvent.touches[0]),
          (t.touchObject.startX = t.touchObject.curX =
            void 0 !== e ? e.pageX : i.clientX),
          (t.touchObject.startY = t.touchObject.curY =
            void 0 !== e ? e.pageY : i.clientY),
          (t.dragging = !0);
      }),
      (e.prototype.unfilterSlides = e.prototype.slickUnfilter = function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
      (e.prototype.unload = function () {
        var e = this;
        i(".slick-cloned", e.$slider).remove(),
          e.$dots && e.$dots.remove(),
          e.$prevArrow &&
            e.htmlExpr.test(e.options.prevArrow) &&
            e.$prevArrow.remove(),
          e.$nextArrow &&
            e.htmlExpr.test(e.options.nextArrow) &&
            e.$nextArrow.remove(),
          e.$slides
            .removeClass("slick-slide slick-active slick-visible slick-current")
            .attr("aria-hidden", "true")
            .css("width", "");
      }),
      (e.prototype.unslick = function (i) {
        var e = this;
        e.$slider.trigger("unslick", [e, i]), e.destroy();
      }),
      (e.prototype.updateArrows = function () {
        var i = this;
        Math.floor(i.options.slidesToShow / 2),
          !0 === i.options.arrows &&
            i.slideCount > i.options.slidesToShow &&
            !i.options.infinite &&
            (i.$prevArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            i.$nextArrow
              .removeClass("slick-disabled")
              .attr("aria-disabled", "false"),
            0 === i.currentSlide
              ? (i.$prevArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                i.$nextArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
                !1 === i.options.centerMode
              ? (i.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                i.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false"))
              : i.currentSlide >= i.slideCount - 1 &&
                !0 === i.options.centerMode &&
                (i.$nextArrow
                  .addClass("slick-disabled")
                  .attr("aria-disabled", "true"),
                i.$prevArrow
                  .removeClass("slick-disabled")
                  .attr("aria-disabled", "false")));
      }),
      (e.prototype.updateDots = function () {
        var i = this;
        null !== i.$dots &&
          (i.$dots.find("li").removeClass("slick-active").end(),
          i.$dots
            .find("li")
            .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
            .addClass("slick-active"));
      }),
      (e.prototype.visibility = function () {
        var i = this;
        i.options.autoplay &&
          (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
      }),
      (i.fn.slick = function () {
        var i,
          t,
          o = this,
          s = arguments[0],
          n = Array.prototype.slice.call(arguments, 1),
          r = o.length;
        for (i = 0; i < r; i++)
          if (
            ("object" == typeof s || void 0 === s
              ? (o[i].slick = new e(o[i], s))
              : (t = o[i].slick[s].apply(o[i].slick, n)),
            void 0 !== t)
          )
            return t;
        return o;
      });
  });
  
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top - 160
            },
            1000,
            function () {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              $target.focus();
              if ($target.is(":focus")) {
                // Checking if the target was focused
                return false;
              } else {
                $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                $target.focus(); // Set focus again
              }
            }
          );
        }
      }
    });
  (function ($) {
    "use strict";
  
    var TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick();
      this.isDeleting = !1;
    };
    TxtType.prototype.tick = function () {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
      this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";
      var that = this;
      var delta = 200 - Math.random() * 100;
      if (this.isDeleting) {
        delta /= 2;
      }
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = !0;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = !1;
        this.loopNum++;
        delta = 500;
      }
      setTimeout(function () {
        that.tick();
      }, delta);
    };
    window.onload = function () {
      var elements = document.getElementsByClassName("typewrite");
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML =
        ".typewrite > .wrap { border-right: 0.05em solid rgba(147, 197, 253)}";
      document.body.appendChild(css);
    };
  })(jQuery);
  /*!
  Waypoints - 4.0.1
  Copyright © 2011-2016 Caleb Troughton
  Licensed under the MIT license.
  https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
  */
  !(function () {
    "use strict";
    function t(o) {
      if (!o) throw new Error("No options passed to Waypoint constructor");
      if (!o.element)
        throw new Error("No element option passed to Waypoint constructor");
      if (!o.handler)
        throw new Error("No handler option passed to Waypoint constructor");
      (this.key = "waypoint-" + e),
        (this.options = t.Adapter.extend({}, t.defaults, o)),
        (this.element = this.options.element),
        (this.adapter = new t.Adapter(this.element)),
        (this.callback = o.handler),
        (this.axis = this.options.horizontal ? "horizontal" : "vertical"),
        (this.enabled = this.options.enabled),
        (this.triggerPoint = null),
        (this.group = t.Group.findOrCreate({
          name: this.options.group,
          axis: this.axis
        })),
        (this.context = t.Context.findOrCreateByElement(this.options.context)),
        t.offsetAliases[this.options.offset] &&
          (this.options.offset = t.offsetAliases[this.options.offset]),
        this.group.add(this),
        this.context.add(this),
        (i[this.key] = this),
        (e += 1);
    }
    var e = 0,
      i = {};
    (t.prototype.queueTrigger = function (t) {
      this.group.queueTrigger(this, t);
    }),
      (t.prototype.trigger = function (t) {
        this.enabled && this.callback && this.callback.apply(this, t);
      }),
      (t.prototype.destroy = function () {
        this.context.remove(this), this.group.remove(this), delete i[this.key];
      }),
      (t.prototype.disable = function () {
        return (this.enabled = !1), this;
      }),
      (t.prototype.enable = function () {
        return this.context.refresh(), (this.enabled = !0), this;
      }),
      (t.prototype.next = function () {
        return this.group.next(this);
      }),
      (t.prototype.previous = function () {
        return this.group.previous(this);
      }),
      (t.invokeAll = function (t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]();
      }),
      (t.destroyAll = function () {
        t.invokeAll("destroy");
      }),
      (t.disableAll = function () {
        t.invokeAll("disable");
      }),
      (t.enableAll = function () {
        t.Context.refreshAll();
        for (var e in i) i[e].enabled = !0;
        return this;
      }),
      (t.refreshAll = function () {
        t.Context.refreshAll();
      }),
      (t.viewportHeight = function () {
        return window.innerHeight || document.documentElement.clientHeight;
      }),
      (t.viewportWidth = function () {
        return document.documentElement.clientWidth;
      }),
      (t.adapters = []),
      (t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
      }),
      (t.offsetAliases = {
        "bottom-in-view": function () {
          return this.context.innerHeight() - this.adapter.outerHeight();
        },
        "right-in-view": function () {
          return this.context.innerWidth() - this.adapter.outerWidth();
        }
      }),
      (window.Waypoint = t);
  })(),
    (function () {
      "use strict";
      function t(t) {
        window.setTimeout(t, 1e3 / 60);
      }
      function e(t) {
        (this.element = t),
          (this.Adapter = n.Adapter),
          (this.adapter = new this.Adapter(t)),
          (this.key = "waypoint-context-" + i),
          (this.didScroll = !1),
          (this.didResize = !1),
          (this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
          }),
          (this.waypoints = {
            vertical: {},
            horizontal: {}
          }),
          (t.waypointContextKey = this.key),
          (o[t.waypointContextKey] = this),
          (i += 1),
          n.windowContext ||
            ((n.windowContext = !0), (n.windowContext = new e(window))),
          this.createThrottledScrollHandler(),
          this.createThrottledResizeHandler();
      }
      var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
      (e.prototype.add = function (t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        (this.waypoints[e][t.key] = t), this.refresh();
      }),
        (e.prototype.checkEmpty = function () {
          var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            i = this.element == this.element.window;
          t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key]);
        }),
        (e.prototype.createThrottledResizeHandler = function () {
          function t() {
            e.handleResize(), (e.didResize = !1);
          }
          var e = this;
          this.adapter.on("resize.waypoints", function () {
            e.didResize || ((e.didResize = !0), n.requestAnimationFrame(t));
          });
        }),
        (e.prototype.createThrottledScrollHandler = function () {
          function t() {
            e.handleScroll(), (e.didScroll = !1);
          }
          var e = this;
          this.adapter.on("scroll.waypoints", function () {
            (!e.didScroll || n.isTouch) &&
              ((e.didScroll = !0), n.requestAnimationFrame(t));
          });
        }),
        (e.prototype.handleResize = function () {
          n.Context.refreshAll();
        }),
        (e.prototype.handleScroll = function () {
          var t = {},
            e = {
              horizontal: {
                newScroll: this.adapter.scrollLeft(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left"
              },
              vertical: {
                newScroll: this.adapter.scrollTop(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up"
              }
            };
          for (var i in e) {
            var o = e[i],
              n = o.newScroll > o.oldScroll,
              r = n ? o.forward : o.backward;
            for (var s in this.waypoints[i]) {
              var a = this.waypoints[i][s];
              if (null !== a.triggerPoint) {
                var l = o.oldScroll < a.triggerPoint,
                  h = o.newScroll >= a.triggerPoint,
                  p = l && h,
                  u = !l && !h;
                (p || u) && (a.queueTrigger(r), (t[a.group.id] = a.group));
              }
            }
          }
          for (var c in t) t[c].flushTriggers();
          this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
          };
        }),
        (e.prototype.innerHeight = function () {
          return this.element == this.element.window
            ? n.viewportHeight()
            : this.adapter.innerHeight();
        }),
        (e.prototype.remove = function (t) {
          delete this.waypoints[t.axis][t.key], this.checkEmpty();
        }),
        (e.prototype.innerWidth = function () {
          return this.element == this.element.window
            ? n.viewportWidth()
            : this.adapter.innerWidth();
        }),
        (e.prototype.destroy = function () {
          var t = [];
          for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
          for (var o = 0, n = t.length; n > o; o++) t[o].destroy();
        }),
        (e.prototype.refresh = function () {
          var t,
            e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
          this.handleScroll(),
            (t = {
              horizontal: {
                contextOffset: e ? 0 : i.left,
                contextScroll: e ? 0 : this.oldScroll.x,
                contextDimension: this.innerWidth(),
                oldScroll: this.oldScroll.x,
                forward: "right",
                backward: "left",
                offsetProp: "left"
              },
              vertical: {
                contextOffset: e ? 0 : i.top,
                contextScroll: e ? 0 : this.oldScroll.y,
                contextDimension: this.innerHeight(),
                oldScroll: this.oldScroll.y,
                forward: "down",
                backward: "up",
                offsetProp: "top"
              }
            });
          for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
              var l,
                h,
                p,
                u,
                c,
                d = this.waypoints[r][a],
                f = d.options.offset,
                w = d.triggerPoint,
                y = 0,
                g = null == w;
              d.element !== d.element.window &&
                (y = d.adapter.offset()[s.offsetProp]),
                "function" == typeof f
                  ? (f = f.apply(d))
                  : "string" == typeof f &&
                    ((f = parseFloat(f)),
                    d.options.offset.indexOf("%") > -1 &&
                      (f = Math.ceil((s.contextDimension * f) / 100))),
                (l = s.contextScroll - s.contextOffset),
                (d.triggerPoint = Math.floor(y + l - f)),
                (h = w < s.oldScroll),
                (p = d.triggerPoint >= s.oldScroll),
                (u = h && p),
                (c = !h && !p),
                !g && u
                  ? (d.queueTrigger(s.backward), (o[d.group.id] = d.group))
                  : !g && c
                  ? (d.queueTrigger(s.forward), (o[d.group.id] = d.group))
                  : g &&
                    s.oldScroll >= d.triggerPoint &&
                    (d.queueTrigger(s.forward), (o[d.group.id] = d.group));
            }
          }
          return (
            n.requestAnimationFrame(function () {
              for (var t in o) o[t].flushTriggers();
            }),
            this
          );
        }),
        (e.findOrCreateByElement = function (t) {
          return e.findByElement(t) || new e(t);
        }),
        (e.refreshAll = function () {
          for (var t in o) o[t].refresh();
        }),
        (e.findByElement = function (t) {
          return o[t.waypointContextKey];
        }),
        (window.onload = function () {
          r && r(), e.refreshAll();
        }),
        (n.requestAnimationFrame = function (e) {
          var i =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            t;
          i.call(window, e);
        }),
        (n.Context = e);
    })(),
    (function () {
      "use strict";
      function t(t, e) {
        return t.triggerPoint - e.triggerPoint;
      }
      function e(t, e) {
        return e.triggerPoint - t.triggerPoint;
      }
      function i(t) {
        (this.name = t.name),
          (this.axis = t.axis),
          (this.id = this.name + "-" + this.axis),
          (this.waypoints = []),
          this.clearTriggerQueues(),
          (o[this.axis][this.name] = this);
      }
      var o = {
          vertical: {},
          horizontal: {}
        },
        n = window.Waypoint;
      (i.prototype.add = function (t) {
        this.waypoints.push(t);
      }),
        (i.prototype.clearTriggerQueues = function () {
          this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
          };
        }),
        (i.prototype.flushTriggers = function () {
          for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i],
              n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
              var a = o[r];
              (a.options.continuous || r === o.length - 1) && a.trigger([i]);
            }
          }
          this.clearTriggerQueues();
        }),
        (i.prototype.next = function (e) {
          this.waypoints.sort(t);
          var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1;
          return o ? null : this.waypoints[i + 1];
        }),
        (i.prototype.previous = function (e) {
          this.waypoints.sort(t);
          var i = n.Adapter.inArray(e, this.waypoints);
          return i ? this.waypoints[i - 1] : null;
        }),
        (i.prototype.queueTrigger = function (t, e) {
          this.triggerQueues[e].push(t);
        }),
        (i.prototype.remove = function (t) {
          var e = n.Adapter.inArray(t, this.waypoints);
          e > -1 && this.waypoints.splice(e, 1);
        }),
        (i.prototype.first = function () {
          return this.waypoints[0];
        }),
        (i.prototype.last = function () {
          return this.waypoints[this.waypoints.length - 1];
        }),
        (i.findOrCreate = function (t) {
          return o[t.axis][t.name] || new i(t);
        }),
        (n.Group = i);
    })(),
    (function () {
      "use strict";
      function t(t) {
        this.$element = e(t);
      }
      var e = window.jQuery,
        i = window.Waypoint;
      e.each(
        [
          "innerHeight",
          "innerWidth",
          "off",
          "offset",
          "on",
          "outerHeight",
          "outerWidth",
          "scrollLeft",
          "scrollTop"
        ],
        function (e, i) {
          t.prototype[i] = function () {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t);
          };
        }
      ),
        e.each(["extend", "inArray", "isEmptyObject"], function (i, o) {
          t[o] = e[o];
        }),
        i.adapters.push({
          name: "jquery",
          Adapter: t
        }),
        (i.Adapter = t);
    })(),
    (function () {
      "use strict";
      function t(t) {
        return function () {
          var i = [],
            o = arguments[0];
          return (
            t.isFunction(arguments[0]) &&
              ((o = t.extend({}, arguments[1])), (o.handler = arguments[0])),
            this.each(function () {
              var n = t.extend({}, o, {
                element: this
              });
              "string" == typeof n.context &&
                (n.context = t(this).closest(n.context)[0]),
                i.push(new e(n));
            }),
            i
          );
        };
      }
      var e = window.Waypoint;
      window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)),
        window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto));
    })();
  /*!
   * jquery.counterup.js 1.0
   *
   * Copyright 2013, Benjamin Intal http://gambit.ph @bfintal
   * Released under the GPL v2 License
   *
   * Date: Nov 26, 2013
   */
  (function (e) {
    "use strict";
    e.fn.counterUp = function (t) {
      var n = e.extend(
        {
          time: 400,
          delay: 10
        },
        t
      );
      return this.each(function () {
        var t = e(this),
          r = n,
          i = function () {
            var e = [],
              n = r.time / r.delay,
              i = t.text(),
              s = /[0-9]+,[0-9]+/.test(i);
            i = i.replace(/,/g, "");
            var o = /^[0-9]+$/.test(i),
              u = /^[0-9]+\.[0-9]+$/.test(i),
              a = u ? (i.split(".")[1] || []).length : 0;
            for (var f = n; f >= 1; f--) {
              var l = parseInt((i / n) * f);
              u && (l = parseFloat((i / n) * f).toFixed(a));
              if (s)
                while (/(\d+)(\d{3})/.test(l.toString()))
                  l = l.toString().replace(/(\d+)(\d{3})/, "$1,$2");
              e.unshift(l);
            }
            t.data("counterup-nums", e);
            t.text("0");
            var c = function () {
              t.text(t.data("counterup-nums").shift());
              if (t.data("counterup-nums").length)
                setTimeout(t.data("counterup-func"), r.delay);
              else {
                delete t.data("counterup-nums");
                t.data("counterup-nums", null);
                t.data("counterup-func", null);
              }
            };
            t.data("counterup-func", c);
            setTimeout(t.data("counterup-func"), r.delay);
          };
        t.waypoint(i, {
          offset: "100%",
          triggerOnce: !0
        });
      });
    };
  })(jQuery);
  
  /////////////////////////// custom main
  
  (function ($) {
    "use strict";
    // Page loading
    $(window).on("load", function () {
      $("#preloader-active").delay(450).fadeOut("slow");
      $("body").delay(450).css({
        overflow: "visible"
      });
    });
    /*-----------------
          Menu Stick
      -----------------*/
    var header = $(".sticky-bar");
    var win = $(window);
    win.on("scroll", function () {
      var scroll = win.scrollTop();
      if (scroll < 20) {
        header.removeClass("stick");
      } else {
        header.addClass("stick");
      }
    });
  
    /*Carausel 2 columns*/
    $(".carausel-2-columns").each(function (key, item) {
      var id = $(this).attr("id");
      var sliderID = "#" + id;
      var appendArrowsClassName = "#" + id + "-arrows";
  
      $(sliderID).slick({
        dots: false,
        infinite: true,
        speed: 1000,
        arrows: true,
        autoplay: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        loop: true,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        prevArrow:
          '<span class="mr-4 text-blue-500 flex"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg></span>',
        nextArrow:
          '<span class="text-blue-500  flex"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></span>',
        appendArrows: appendArrowsClassName
      });
    });
  
    /*Carausel Fade*/
    $(".carausel-fade").each(function (key, item) {
      var id = $(this).attr("id");
      var sliderID = "#" + id;
      var appendArrowsClassName = "#" + id + "-arrows";
  
      $(sliderID).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        loop: true,
        dots: false,
        arrows: true,
        prevArrow:
          '<span class="mr-4 text-blue-500 flex"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg></span>',
        nextArrow:
          '<span class="text-blue-500  flex"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></span>',
        appendArrows: appendArrowsClassName,
        autoplay: true
      });
    });
  
    /*Carausel Fade has Dots*/
    $(".carausel-fade-2").each(function (key, item) {
      var id = $(this).attr("id");
      var sliderID = "#" + id;
      var appendArrowsClassName = "#" + id + "-arrows";
  
      $(sliderID).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        loop: true,
        dots: true,
        arrows: false,
        autoplay: true
      });
    });
  
    /*---------------------
          Mobile menu active
      ------------------------ */
    var $offCanvasNav = $(".mobile-menu"),
      $offCanvasNavSubMenu = $offCanvasNav.find(".dropdown");
  
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand">+</span>');
  
    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();
  
    /*Category Sub Menu Toggle*/
    $offCanvasNav.on("click", "li a, li .menu-expand", function (e) {
      var $this = $(this);
      if (
        $this
          .parent()
          .attr("class")
          .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
        ($this.attr("href") === "#" || $this.hasClass("menu-expand"))
      ) {
        e.preventDefault();
        if ($this.siblings("ul:visible").length) {
          $this.parent("li").removeClass("active");
          $this.siblings("ul").slideUp();
        } else {
          $this.parent("li").addClass("active");
          $this
            .closest("li")
            .siblings("li")
            .removeClass("active")
            .find("li")
            .removeClass("active");
          $this.closest("li").siblings("li").find("ul:visible").slideUp();
          $this.siblings("ul").slideDown();
        }
      }
    });
  
    /*------ ScrollUp -------- */
    $.scrollUp({
      scrollText:
        '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>',
      easingType: "linear",
      scrollSpeed: 900,
      animation: "fade"
    });
  
    /*------ Wow Active ----*/
    new WOW().init();
  
    /*---- CounterUp ----*/
    $(".count").counterUp({
      delay: 10,
      time: 2000
    });
  })(jQuery);
  