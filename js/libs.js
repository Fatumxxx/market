!
        function (t) {
                "use strict";
                "function" == typeof define && define.amd ? define(["jquery"], t) : "undefined" != typeof exports ? module.exports = t(require("jquery")) : t(jQuery)
        }(function (c) {
                "use strict";
                var s, a = window.Slick || {};
                s = 0,
                        (a = function (t, e) {
                                var i, o = this;
                                o.defaults = {
                                        accessibility: !0,
                                        adaptiveHeight: !1,
                                        appendArrows: c(t),
                                        appendDots: c(t),
                                        arrows: !0,
                                        asNavFor: null,
                                        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                                        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                                        autoplay: !1,
                                        autoplaySpeed: 3e3,
                                        centerMode: !1,
                                        centerPadding: "50px",
                                        cssEase: "ease",
                                        customPaging: function (t, e) {
                                                return c('<button type="button" />').text(e + 1)
                                        },
                                        dots: !1,
                                        dotsClass: "slick-dots",
                                        draggable: !0,
                                        easing: "linear",
                                        edgeFriction: .35,
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
                                },
                                        o.initials = {
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
                                        },
                                        c.extend(o, o.initials),
                                        o.activeBreakpoint = null,
                                        o.animType = null,
                                        o.animProp = null,
                                        o.breakpoints = [],
                                        o.breakpointSettings = [],
                                        o.cssTransitions = !1,
                                        o.focussed = !1,
                                        o.interrupted = !1,
                                        o.hidden = "hidden",
                                        o.paused = !0,
                                        o.positionProp = null,
                                        o.respondTo = null,
                                        o.rowCount = 1,
                                        o.shouldClick = !0,
                                        o.$slider = c(t),
                                        o.$slidesCache = null,
                                        o.transformType = null,
                                        o.transitionType = null,
                                        o.visibilityChange = "visibilitychange",
                                        o.windowWidth = 0,
                                        o.windowTimer = null,
                                        i = c(t).data("slick") || {},
                                        o.options = c.extend({}, o.defaults, e, i),
                                        o.currentSlide = o.options.initialSlide,
                                        o.originalSettings = o.options,
                                        void 0 !== document.mozHidden ? (o.hidden = "mozHidden", o.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (o.hidden = "webkitHidden", o.visibilityChange = "webkitvisibilitychange"),
                                        o.autoPlay = c.proxy(o.autoPlay, o),
                                        o.autoPlayClear = c.proxy(o.autoPlayClear, o),
                                        o.autoPlayIterator = c.proxy(o.autoPlayIterator, o),
                                        o.changeSlide = c.proxy(o.changeSlide, o),
                                        o.clickHandler = c.proxy(o.clickHandler, o),
                                        o.selectHandler = c.proxy(o.selectHandler, o),
                                        o.setPosition = c.proxy(o.setPosition, o),
                                        o.swipeHandler = c.proxy(o.swipeHandler, o),
                                        o.dragHandler = c.proxy(o.dragHandler, o),
                                        o.keyHandler = c.proxy(o.keyHandler, o),
                                        o.instanceUid = s++,
                                        o.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/,
                                        o.registerBreakpoints(),
                                        o.init(!0)
                        }).prototype.activateADA = function () {
                                this.$slideTrack.find(".slick-active").attr({
                                        "aria-hidden": "false"
                                }).find("a, input, button, select").attr({
                                        tabindex: "0"
                                })
                        },
                        a.prototype.addSlide = a.prototype.slickAdd = function (t, e, i) {
                                var o = this;
                                if ("boolean" == typeof e) i = e,
                                        e = null;
                                else if (e < 0 || e >= o.slideCount) return !1;
                                o.unload(),
                                        "number" == typeof e ? 0 === e && 0 === o.$slides.length ? c(t).appendTo(o.$slideTrack) : i ? c(t).insertBefore(o.$slides.eq(e)) : c(t).insertAfter(o.$slides.eq(e)) : !0 === i ? c(t).prependTo(o.$slideTrack) : c(t).appendTo(o.$slideTrack),
                                        o.$slides = o.$slideTrack.children(this.options.slide),
                                        o.$slideTrack.children(this.options.slide).detach(),
                                        o.$slideTrack.append(o.$slides),
                                        o.$slides.each(function (t, e) {
                                                c(e).attr("data-slick-index", t)
                                        }),
                                        o.$slidesCache = o.$slides,
                                        o.reinit()
                        },
                        a.prototype.animateHeight = function () {
                                var t = this;
                                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                                        var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                                        t.$list.animate({
                                                height: e
                                        }, t.options.speed)
                                }
                        },
                        a.prototype.animateSlide = function (t, e) {
                                var i = {},
                                        o = this;
                                o.animateHeight(),
                                        !0 === o.options.rtl && !1 === o.options.vertical && (t = -t),
                                        !1 === o.transformsEnabled ? !1 === o.options.vertical ? o.$slideTrack.animate({
                                                left: t
                                        }, o.options.speed, o.options.easing, e) : o.$slideTrack.animate({
                                                top: t
                                        }, o.options.speed, o.options.easing, e) : !1 === o.cssTransitions ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft), c({
                                                animStart: o.currentLeft
                                        }).animate({
                                                animStart: t
                                        }, {
                                                duration: o.options.speed,
                                                easing: o.options.easing,
                                                step: function (t) {
                                                        t = Math.ceil(t),
                                                                !1 === o.options.vertical ? i[o.animType] = "translate(" + t + "px, 0px)" : i[o.animType] = "translate(0px," + t + "px)",
                                                                o.$slideTrack.css(i)
                                                },
                                                complete: function () {
                                                        e && e.call()
                                                }
                                        })) : (o.applyTransition(), t = Math.ceil(t), !1 === o.options.vertical ? i[o.animType] = "translate3d(" + t + "px, 0px, 0px)" : i[o.animType] = "translate3d(0px," + t + "px, 0px)", o.$slideTrack.css(i), e && setTimeout(function () {
                                                o.disableTransition(),
                                                        e.call()
                                        }, o.options.speed))
                        },
                        a.prototype.getNavTarget = function () {
                                var t = this.options.asNavFor;
                                return t && null !== t && (t = c(t).not(this.$slider)),
                                        t
                        },
                        a.prototype.asNavFor = function (e) {
                                var t = this.getNavTarget();
                                null !== t && "object" == typeof t && t.each(function () {
                                        var t = c(this).slick("getSlick");
                                        t.unslicked || t.slideHandler(e, !0)
                                })
                        },
                        a.prototype.applyTransition = function (t) {
                                var e = this,
                                        i = {};
                                !1 === e.options.fade ? i[e.transitionType] = e.transformType + " " + e.options.speed + "ms " + e.options.cssEase : i[e.transitionType] = "opacity " + e.options.speed + "ms " + e.options.cssEase,
                                        !1 === e.options.fade ? e.$slideTrack.css(i) : e.$slides.eq(t).css(i)
                        },
                        a.prototype.autoPlay = function () {
                                var t = this;
                                t.autoPlayClear(),
                                        t.slideCount > t.options.slidesToShow && (t.autoPlayTimer = setInterval(t.autoPlayIterator, t.options.autoplaySpeed))
                        },
                        a.prototype.autoPlayClear = function () {
                                this.autoPlayTimer && clearInterval(this.autoPlayTimer)
                        },
                        a.prototype.autoPlayIterator = function () {
                                var t = this,
                                        e = t.currentSlide + t.options.slidesToScroll;
                                t.paused || t.interrupted || t.focussed || (!1 === t.options.infinite && (1 === t.direction && t.currentSlide + 1 === t.slideCount - 1 ? t.direction = 0 : 0 === t.direction && (e = t.currentSlide - t.options.slidesToScroll, t.currentSlide - 1 == 0 && (t.direction = 1))), t.slideHandler(e))
                        },
                        a.prototype.buildArrows = function () {
                                var t = this;
                                !0 === t.options.arrows && (t.$prevArrow = c(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = c(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
                                        "aria-disabled": "true",
                                        tabindex: "-1"
                                }))
                        },
                        a.prototype.buildDots = function () {
                                var t, e, i = this;
                                if (!0 === i.options.dots && i.slideCount > i.options.slidesToShow) {
                                        for (i.$slider.addClass("slick-dotted"), e = c("<ul />").addClass(i.options.dotsClass), t = 0; t <= i.getDotCount(); t += 1) e.append(c("<li />").append(i.options.customPaging.call(this, i, t)));
                                        i.$dots = e.appendTo(i.options.appendDots),
                                                i.$dots.find("li").first().addClass("slick-active")
                                }
                        },
                        a.prototype.buildOut = function () {
                                var t = this;
                                t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide"),
                                        t.slideCount = t.$slides.length,
                                        t.$slides.each(function (t, e) {
                                                c(e).attr("data-slick-index", t).data("originalStyling", c(e).attr("style") || "")
                                        }),
                                        t.$slider.addClass("slick-slider"),
                                        t.$slideTrack = 0 === t.slideCount ? c('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent(),
                                        t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent(),
                                        t.$slideTrack.css("opacity", 0),
                                        !0 !== t.options.centerMode && !0 !== t.options.swipeToSlide || (t.options.slidesToScroll = 1),
                                        c("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
                                        t.setupInfinite(),
                                        t.buildArrows(),
                                        t.buildDots(),
                                        t.updateDots(),
                                        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
                                        !0 === t.options.draggable && t.$list.addClass("draggable")
                        },
                        a.prototype.buildRows = function () {
                                var t, e, i, o, s, n, a, r = this;
                                if (o = document.createDocumentFragment(), n = r.$slider.children(), 0 < r.options.rows) {
                                        for (a = r.options.slidesPerRow * r.options.rows, s = Math.ceil(n.length / a), t = 0; t < s; t++) {
                                                var l = document.createElement("div");
                                                for (e = 0; e < r.options.rows; e++) {
                                                        var c = document.createElement("div");
                                                        for (i = 0; i < r.options.slidesPerRow; i++) {
                                                                var d = t * a + (e * r.options.slidesPerRow + i);
                                                                n.get(d) && c.appendChild(n.get(d))
                                                        }
                                                        l.appendChild(c)
                                                }
                                                o.appendChild(l)
                                        }
                                        r.$slider.empty().append(o),
                                                r.$slider.children().children().children().css({
                                                        width: 100 / r.options.slidesPerRow + "%",
                                                        display: "inline-block"
                                                })
                                }
                        },
                        a.prototype.checkResponsive = function (t, e) {
                                var i, o, s, n = this,
                                        a = !1,
                                        r = n.$slider.width(),
                                        l = window.innerWidth || c(window).width();
                                if ("window" === n.respondTo ? s = l : "slider" === n.respondTo ? s = r : "min" === n.respondTo && (s = Math.min(l, r)), n.options.responsive && n.options.responsive.length && null !== n.options.responsive) {
                                        for (i in o = null, n.breakpoints) n.breakpoints.hasOwnProperty(i) && (!1 === n.originalSettings.mobileFirst ? s < n.breakpoints[i] && (o = n.breakpoints[i]) : s > n.breakpoints[i] && (o = n.breakpoints[i]));
                                        null !== o ? null !== n.activeBreakpoint && o === n.activeBreakpoint && !e || (n.activeBreakpoint = o, "unslick" === n.breakpointSettings[o] ? n.unslick(o) : (n.options = c.extend({}, n.originalSettings, n.breakpointSettings[o]), !0 === t && (n.currentSlide = n.options.initialSlide), n.refresh(t)), a = o) : null !== n.activeBreakpoint && (n.activeBreakpoint = null, n.options = n.originalSettings, !0 === t && (n.currentSlide = n.options.initialSlide), n.refresh(t), a = o),
                                                t || !1 === a || n.$slider.trigger("breakpoint", [n, a])
                                }
                        },
                        a.prototype.changeSlide = function (t, e) {
                                var i, o, s = this,
                                        n = c(t.currentTarget);
                                switch (n.is("a") && t.preventDefault(), n.is("li") || (n = n.closest("li")), i = s.slideCount % s.options.slidesToScroll != 0 ? 0 : (s.slideCount - s.currentSlide) % s.options.slidesToScroll, t.data.message) {
                                        case "previous":
                                                o = 0 == i ? s.options.slidesToScroll : s.options.slidesToShow - i,
                                                        s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide - o, !1, e);
                                                break;
                                        case "next":
                                                o = 0 == i ? s.options.slidesToScroll : i,
                                                        s.slideCount > s.options.slidesToShow && s.slideHandler(s.currentSlide + o, !1, e);
                                                break;
                                        case "index":
                                                var a = 0 === t.data.index ? 0 : t.data.index || n.index() * s.options.slidesToScroll;
                                                s.slideHandler(s.checkNavigable(a), !1, e),
                                                        n.children().trigger("focus");
                                                break;
                                        default:
                                                return
                                }
                        },
                        a.prototype.checkNavigable = function (t) {
                                var e, i;
                                if (i = 0, t > (e = this.getNavigableIndexes())[e.length - 1]) t = e[e.length - 1];
                                else for (var o in e) {
                                        if (t < e[o]) {
                                                t = i;
                                                break
                                        }
                                        i = e[o]
                                }
                                return t
                        },
                        a.prototype.cleanUpEvents = function () {
                                var t = this;
                                t.options.dots && null !== t.$dots && (c("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", c.proxy(t.interrupt, t, !0)).off("mouseleave.slick", c.proxy(t.interrupt, t, !1)), !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)),
                                        t.$slider.off("focus.slick blur.slick"),
                                        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))),
                                        t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
                                        t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
                                        t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
                                        t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
                                        t.$list.off("click.slick", t.clickHandler),
                                        c(document).off(t.visibilityChange, t.visibility),
                                        t.cleanUpSlideEvents(),
                                        !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler),
                                        !0 === t.options.focusOnSelect && c(t.$slideTrack).children().off("click.slick", t.selectHandler),
                                        c(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange),
                                        c(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
                                        c("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault),
                                        c(window).off("load.slick.slick-" + t.instanceUid, t.setPosition)
                        },
                        a.prototype.cleanUpSlideEvents = function () {
                                var t = this;
                                t.$list.off("mouseenter.slick", c.proxy(t.interrupt, t, !0)),
                                        t.$list.off("mouseleave.slick", c.proxy(t.interrupt, t, !1))
                        },
                        a.prototype.cleanUpRows = function () {
                                var t;
                                0 < this.options.rows && ((t = this.$slides.children().children()).removeAttr("style"), this.$slider.empty().append(t))
                        },
                        a.prototype.clickHandler = function (t) {
                                !1 === this.shouldClick && (t.stopImmediatePropagation(), t.stopPropagation(), t.preventDefault())
                        },
                        a.prototype.destroy = function (t) {
                                var e = this;
                                e.autoPlayClear(),
                                        e.touchObject = {},
                                        e.cleanUpEvents(),
                                        c(".slick-cloned", e.$slider).detach(),
                                        e.$dots && e.$dots.remove(),
                                        e.$prevArrow && e.$prevArrow.length && (e.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.prevArrow) && e.$prevArrow.remove()),
                                        e.$nextArrow && e.$nextArrow.length && (e.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), e.htmlExpr.test(e.options.nextArrow) && e.$nextArrow.remove()),
                                        e.$slides && (e.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
                                                c(this).attr("style", c(this).data("originalStyling"))
                                        }), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.detach(), e.$list.detach(), e.$slider.append(e.$slides)),
                                        e.cleanUpRows(),
                                        e.$slider.removeClass("slick-slider"),
                                        e.$slider.removeClass("slick-initialized"),
                                        e.$slider.removeClass("slick-dotted"),
                                        e.unslicked = !0,
                                        t || e.$slider.trigger("destroy", [e])
                        },
                        a.prototype.disableTransition = function (t) {
                                var e = {};
                                e[this.transitionType] = "",
                                        !1 === this.options.fade ? this.$slideTrack.css(e) : this.$slides.eq(t).css(e)
                        },
                        a.prototype.fadeSlide = function (t, e) {
                                var i = this;
                                !1 === i.cssTransitions ? (i.$slides.eq(t).css({
                                        zIndex: i.options.zIndex
                                }), i.$slides.eq(t).animate({
                                        opacity: 1
                                }, i.options.speed, i.options.easing, e)) : (i.applyTransition(t), i.$slides.eq(t).css({
                                        opacity: 1,
                                        zIndex: i.options.zIndex
                                }), e && setTimeout(function () {
                                        i.disableTransition(t),
                                                e.call()
                                }, i.options.speed))
                        },
                        a.prototype.fadeSlideOut = function (t) {
                                var e = this;
                                !1 === e.cssTransitions ? e.$slides.eq(t).animate({
                                        opacity: 0,
                                        zIndex: e.options.zIndex - 2
                                }, e.options.speed, e.options.easing) : (e.applyTransition(t), e.$slides.eq(t).css({
                                        opacity: 0,
                                        zIndex: e.options.zIndex - 2
                                }))
                        },
                        a.prototype.filterSlides = a.prototype.slickFilter = function (t) {
                                var e = this;
                                null !== t && (e.$slidesCache = e.$slides, e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.filter(t).appendTo(e.$slideTrack), e.reinit())
                        },
                        a.prototype.focusHandler = function () {
                                var i = this;
                                i.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (t) {
                                        t.stopImmediatePropagation();
                                        var e = c(this);
                                        setTimeout(function () {
                                                i.options.pauseOnFocus && (i.focussed = e.is(":focus"), i.autoPlay())
                                        }, 0)
                                })
                        },
                        a.prototype.getCurrent = a.prototype.slickCurrentSlide = function () {
                                return this.currentSlide
                        },
                        a.prototype.getDotCount = function () {
                                var t = this,
                                        e = 0,
                                        i = 0,
                                        o = 0;
                                if (!0 === t.options.infinite) if (t.slideCount <= t.options.slidesToShow) ++o;
                                else for (; e < t.slideCount;)++o,
                                        e = i + t.options.slidesToScroll,
                                        i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
                                else if (!0 === t.options.centerMode) o = t.slideCount;
                                else if (t.options.asNavFor) for (; e < t.slideCount;)++o,
                                        e = i + t.options.slidesToScroll,
                                        i += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow;
                                else o = 1 + Math.ceil((t.slideCount - t.options.slidesToShow) / t.options.slidesToScroll);
                                return o - 1
                        },
                        a.prototype.getLeft = function (t) {
                                var e, i, o, s, n = this,
                                        a = 0;
                                return n.slideOffset = 0,
                                        i = n.$slides.first().outerHeight(!0),
                                        !0 === n.options.infinite ? (n.slideCount > n.options.slidesToShow && (n.slideOffset = n.slideWidth * n.options.slidesToShow * -1, s = -1, !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? s = -1.5 : 1 === n.options.slidesToShow && (s = -2)), a = i * n.options.slidesToShow * s), n.slideCount % n.options.slidesToScroll != 0 && t + n.options.slidesToScroll > n.slideCount && n.slideCount > n.options.slidesToShow && (a = t > n.slideCount ? (n.slideOffset = (n.options.slidesToShow - (t - n.slideCount)) * n.slideWidth * -1, (n.options.slidesToShow - (t - n.slideCount)) * i * -1) : (n.slideOffset = n.slideCount % n.options.slidesToScroll * n.slideWidth * -1, n.slideCount % n.options.slidesToScroll * i * -1))) : t + n.options.slidesToShow > n.slideCount && (n.slideOffset = (t + n.options.slidesToShow - n.slideCount) * n.slideWidth, a = (t + n.options.slidesToShow - n.slideCount) * i),
                                        n.slideCount <= n.options.slidesToShow && (a = n.slideOffset = 0),
                                        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow ? n.slideOffset = n.slideWidth * Math.floor(n.options.slidesToShow) / 2 - n.slideWidth * n.slideCount / 2 : !0 === n.options.centerMode && !0 === n.options.infinite ? n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth : !0 === n.options.centerMode && (n.slideOffset = 0, n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2)),
                                        e = !1 === n.options.vertical ? t * n.slideWidth * -1 + n.slideOffset : t * i * -1 + a,
                                        !0 === n.options.variableWidth && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, !0 === n.options.centerMode && (o = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(t) : n.$slideTrack.children(".slick-slide").eq(t + n.options.slidesToShow + 1), e = !0 === n.options.rtl ? o[0] ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width()) : 0 : o[0] ? -1 * o[0].offsetLeft : 0, e += (n.$list.width() - o.outerWidth()) / 2)),
                                        e
                        },
                        a.prototype.getOption = a.prototype.slickGetOption = function (t) {
                                return this.options[t]
                        },
                        a.prototype.getNavigableIndexes = function () {
                                var t, e = this,
                                        i = 0,
                                        o = 0,
                                        s = [];
                                for (t = !1 === e.options.infinite ? e.slideCount : (i = -1 * e.options.slidesToScroll, o = -1 * e.options.slidesToScroll, 2 * e.slideCount); i < t;) s.push(i),
                                        i = o + e.options.slidesToScroll,
                                        o += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow;
                                return s
                        },
                        a.prototype.getSlick = function () {
                                return this
                        },
                        a.prototype.getSlideCount = function () {
                                var i, o, s = this;
                                return o = !0 === s.options.centerMode ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0,
                                        !0 === s.options.swipeToSlide ? (s.$slideTrack.find(".slick-slide").each(function (t, e) {
                                                if (e.offsetLeft - o + c(e).outerWidth() / 2 > -1 * s.swipeLeft) return i = e,
                                                        !1
                                        }), Math.abs(c(i).attr("data-slick-index") - s.currentSlide) || 1) : s.options.slidesToScroll
                        },
                        a.prototype.goTo = a.prototype.slickGoTo = function (t, e) {
                                this.changeSlide({
                                        data: {
                                                message: "index",
                                                index: parseInt(t)
                                        }
                                }, e)
                        },
                        a.prototype.init = function (t) {
                                var e = this;
                                c(e.$slider).hasClass("slick-initialized") || (c(e.$slider).addClass("slick-initialized"), e.buildRows(), e.buildOut(), e.setProps(), e.startLoad(), e.loadSlider(), e.initializeEvents(), e.updateArrows(), e.updateDots(), e.checkResponsive(!0), e.focusHandler()),
                                        t && e.$slider.trigger("init", [e]),
                                        !0 === e.options.accessibility && e.initADA(),
                                        e.options.autoplay && (e.paused = !1, e.autoPlay())
                        },
                        a.prototype.initADA = function () {
                                var o = this,
                                        i = Math.ceil(o.slideCount / o.options.slidesToShow),
                                        s = o.getNavigableIndexes().filter(function (t) {
                                                return 0 <= t && t < o.slideCount
                                        });
                                o.$slides.add(o.$slideTrack.find(".slick-cloned")).attr({
                                        "aria-hidden": "true",
                                        tabindex: "-1"
                                }).find("a, input, button, select").attr({
                                        tabindex: "-1"
                                }),
                                        null !== o.$dots && (o.$slides.not(o.$slideTrack.find(".slick-cloned")).each(function (t) {
                                                var e = s.indexOf(t);
                                                if (c(this).attr({
                                                        role: "tabpanel",
                                                        id: "slick-slide" + o.instanceUid + t,
                                                        tabindex: -1
                                                }), -1 !== e) {
                                                        var i = "slick-slide-control" + o.instanceUid + e;
                                                        c("#" + i).length && c(this).attr({
                                                                "aria-describedby": i
                                                        })
                                                }
                                        }), o.$dots.attr("role", "tablist").find("li").each(function (t) {
                                                var e = s[t];
                                                c(this).attr({
                                                        role: "presentation"
                                                }),
                                                        c(this).find("button").first().attr({
                                                                role: "tab",
                                                                id: "slick-slide-control" + o.instanceUid + t,
                                                                "aria-controls": "slick-slide" + o.instanceUid + e,
                                                                "aria-label": t + 1 + " of " + i,
                                                                "aria-selected": null,
                                                                tabindex: "-1"
                                                        })
                                        }).eq(o.currentSlide).find("button").attr({
                                                "aria-selected": "true",
                                                tabindex: "0"
                                        }).end());
                                for (var t = o.currentSlide, e = t + o.options.slidesToShow; t < e; t++) o.options.focusOnChange ? o.$slides.eq(t).attr({
                                        tabindex: "0"
                                }) : o.$slides.eq(t).removeAttr("tabindex");
                                o.activateADA()
                        },
                        a.prototype.initArrowEvents = function () {
                                var t = this;
                                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.off("click.slick").on("click.slick", {
                                        message: "previous"
                                }, t.changeSlide), t.$nextArrow.off("click.slick").on("click.slick", {
                                        message: "next"
                                }, t.changeSlide), !0 === t.options.accessibility && (t.$prevArrow.on("keydown.slick", t.keyHandler), t.$nextArrow.on("keydown.slick", t.keyHandler)))
                        },
                        a.prototype.initDotEvents = function () {
                                var t = this;
                                !0 === t.options.dots && t.slideCount > t.options.slidesToShow && (c("li", t.$dots).on("click.slick", {
                                        message: "index"
                                }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)),
                                        !0 === t.options.dots && !0 === t.options.pauseOnDotsHover && t.slideCount > t.options.slidesToShow && c("li", t.$dots).on("mouseenter.slick", c.proxy(t.interrupt, t, !0)).on("mouseleave.slick", c.proxy(t.interrupt, t, !1))
                        },
                        a.prototype.initSlideEvents = function () {
                                var t = this;
                                t.options.pauseOnHover && (t.$list.on("mouseenter.slick", c.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", c.proxy(t.interrupt, t, !1)))
                        },
                        a.prototype.initializeEvents = function () {
                                var t = this;
                                t.initArrowEvents(),
                                        t.initDotEvents(),
                                        t.initSlideEvents(),
                                        t.$list.on("touchstart.slick mousedown.slick", {
                                                action: "start"
                                        }, t.swipeHandler),
                                        t.$list.on("touchmove.slick mousemove.slick", {
                                                action: "move"
                                        }, t.swipeHandler),
                                        t.$list.on("touchend.slick mouseup.slick", {
                                                action: "end"
                                        }, t.swipeHandler),
                                        t.$list.on("touchcancel.slick mouseleave.slick", {
                                                action: "end"
                                        }, t.swipeHandler),
                                        t.$list.on("click.slick", t.clickHandler),
                                        c(document).on(t.visibilityChange, c.proxy(t.visibility, t)),
                                        !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler),
                                        !0 === t.options.focusOnSelect && c(t.$slideTrack).children().on("click.slick", t.selectHandler),
                                        c(window).on("orientationchange.slick.slick-" + t.instanceUid, c.proxy(t.orientationChange, t)),
                                        c(window).on("resize.slick.slick-" + t.instanceUid, c.proxy(t.resize, t)),
                                        c("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault),
                                        c(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
                                        c(t.setPosition)
                        },
                        a.prototype.initUI = function () {
                                var t = this;
                                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.show(), t.$nextArrow.show()),
                                        !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.show()
                        },
                        a.prototype.keyHandler = function (t) {
                                var e = this;
                                t.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === t.keyCode && !0 === e.options.accessibility ? e.changeSlide({
                                        data: {
                                                message: !0 === e.options.rtl ? "next" : "previous"
                                        }
                                }) : 39 === t.keyCode && !0 === e.options.accessibility && e.changeSlide({
                                        data: {
                                                message: !0 === e.options.rtl ? "previous" : "next"
                                        }
                                }))
                        },
                        a.prototype.lazyLoad = function () {
                                var t, e, i, n = this;

                                function o(t) {
                                        c("img[data-lazy]", t).each(function () {
                                                var t = c(this),
                                                        e = c(this).attr("data-lazy"),
                                                        i = c(this).attr("data-srcset"),
                                                        o = c(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
                                                        s = document.createElement("img");
                                                s.onload = function () {
                                                        t.animate({
                                                                opacity: 0
                                                        }, 100, function () {
                                                                i && (t.attr("srcset", i), o && t.attr("sizes", o)),
                                                                        t.attr("src", e).animate({
                                                                                opacity: 1
                                                                        }, 200, function () {
                                                                                t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")
                                                                        }),
                                                                        n.$slider.trigger("lazyLoaded", [n, t, e])
                                                        })
                                                },
                                                        s.onerror = function () {
                                                                t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),
                                                                        n.$slider.trigger("lazyLoadError", [n, t, e])
                                                        },
                                                        s.src = e
                                        })
                                }
                                if (!0 === n.options.centerMode ? i = !0 === n.options.infinite ? (e = n.currentSlide + (n.options.slidesToShow / 2 + 1)) + n.options.slidesToShow + 2 : (e = Math.max(0, n.currentSlide - (n.options.slidesToShow / 2 + 1)), n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide) : (e = n.options.infinite ? n.options.slidesToShow + n.currentSlide : n.currentSlide, i = Math.ceil(e + n.options.slidesToShow), !0 === n.options.fade && (0 < e && e--, i <= n.slideCount && i++)), t = n.$slider.find(".slick-slide").slice(e, i), "anticipated" === n.options.lazyLoad) for (var s = e - 1, a = i, r = n.$slider.find(".slick-slide"), l = 0; l < n.options.slidesToScroll; l++) s < 0 && (s = n.slideCount - 1),
                                        t = (t = t.add(r.eq(s))).add(r.eq(a)),
                                        s--,
                                        a++;
                                o(t),
                                        n.slideCount <= n.options.slidesToShow ? o(n.$slider.find(".slick-slide")) : n.currentSlide >= n.slideCount - n.options.slidesToShow ? o(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow)) : 0 === n.currentSlide && o(n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow))
                        },
                        a.prototype.loadSlider = function () {
                                var t = this;
                                t.setPosition(),
                                        t.$slideTrack.css({
                                                opacity: 1
                                        }),
                                        t.$slider.removeClass("slick-loading"),
                                        t.initUI(),
                                        "progressive" === t.options.lazyLoad && t.progressiveLazyLoad()
                        },
                        a.prototype.next = a.prototype.slickNext = function () {
                                this.changeSlide({
                                        data: {
                                                message: "next"
                                        }
                                })
                        },
                        a.prototype.orientationChange = function () {
                                this.checkResponsive(),
                                        this.setPosition()
                        },
                        a.prototype.pause = a.prototype.slickPause = function () {
                                this.autoPlayClear(),
                                        this.paused = !0
                        },
                        a.prototype.play = a.prototype.slickPlay = function () {
                                var t = this;
                                t.autoPlay(),
                                        t.options.autoplay = !0,
                                        t.paused = !1,
                                        t.focussed = !1,
                                        t.interrupted = !1
                        },
                        a.prototype.postSlide = function (t) {
                                var e = this;
                                e.unslicked || (e.$slider.trigger("afterChange", [e, t]), e.animating = !1, e.slideCount > e.options.slidesToShow && e.setPosition(), e.swipeLeft = null, e.options.autoplay && e.autoPlay(), !0 === e.options.accessibility && (e.initADA(), e.options.focusOnChange && c(e.$slides.get(e.currentSlide)).attr("tabindex", 0).focus()))
                        },
                        a.prototype.prev = a.prototype.slickPrev = function () {
                                this.changeSlide({
                                        data: {
                                                message: "previous"
                                        }
                                })
                        },
                        a.prototype.preventDefault = function (t) {
                                t.preventDefault()
                        },
                        a.prototype.progressiveLazyLoad = function (t) {
                                t = t || 1;
                                var e, i, o, s, n, a = this,
                                        r = c("img[data-lazy]", a.$slider);
                                r.length ? (e = r.first(), i = e.attr("data-lazy"), o = e.attr("data-srcset"), s = e.attr("data-sizes") || a.$slider.attr("data-sizes"), (n = document.createElement("img")).onload = function () {
                                        o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                                                e.attr("src", i).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                                                !0 === a.options.adaptiveHeight && a.setPosition(),
                                                a.$slider.trigger("lazyLoaded", [a, e, i]),
                                                a.progressiveLazyLoad()
                                }, n.onerror = function () {
                                        t < 3 ? setTimeout(function () {
                                                a.progressiveLazyLoad(t + 1)
                                        }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), a.$slider.trigger("lazyLoadError", [a, e, i]), a.progressiveLazyLoad())
                                }, n.src = i) : a.$slider.trigger("allImagesLoaded", [a])
                        },
                        a.prototype.refresh = function (t) {
                                var e, i, o = this;
                                i = o.slideCount - o.options.slidesToShow,
                                        !o.options.infinite && o.currentSlide > i && (o.currentSlide = i),
                                        o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0),
                                        e = o.currentSlide,
                                        o.destroy(!0),
                                        c.extend(o, o.initials, {
                                                currentSlide: e
                                        }),
                                        o.init(),
                                        t || o.changeSlide({
                                                data: {
                                                        message: "index",
                                                        index: e
                                                }
                                        }, !1)
                        },
                        a.prototype.registerBreakpoints = function () {
                                var t, e, i, o = this,
                                        s = o.options.responsive || null;
                                if ("array" === c.type(s) && s.length) {
                                        for (t in o.respondTo = o.options.respondTo || "window", s) if (i = o.breakpoints.length - 1, s.hasOwnProperty(t)) {
                                                for (e = s[t].breakpoint; 0 <= i;) o.breakpoints[i] && o.breakpoints[i] === e && o.breakpoints.splice(i, 1),
                                                        i--;
                                                o.breakpoints.push(e),
                                                        o.breakpointSettings[e] = s[t].settings
                                        }
                                        o.breakpoints.sort(function (t, e) {
                                                return o.options.mobileFirst ? t - e : e - t
                                        })
                                }
                        },
                        a.prototype.reinit = function () {
                                var t = this;
                                t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide"),
                                        t.slideCount = t.$slides.length,
                                        t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
                                        t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
                                        t.registerBreakpoints(),
                                        t.setProps(),
                                        t.setupInfinite(),
                                        t.buildArrows(),
                                        t.updateArrows(),
                                        t.initArrowEvents(),
                                        t.buildDots(),
                                        t.updateDots(),
                                        t.initDotEvents(),
                                        t.cleanUpSlideEvents(),
                                        t.initSlideEvents(),
                                        t.checkResponsive(!1, !0),
                                        !0 === t.options.focusOnSelect && c(t.$slideTrack).children().on("click.slick", t.selectHandler),
                                        t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
                                        t.setPosition(),
                                        t.focusHandler(),
                                        t.paused = !t.options.autoplay,
                                        t.autoPlay(),
                                        t.$slider.trigger("reInit", [t])
                        },
                        a.prototype.resize = function () {
                                var t = this;
                                c(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function () {
                                        t.windowWidth = c(window).width(),
                                                t.checkResponsive(),
                                                t.unslicked || t.setPosition()
                                }, 50))
                        },
                        a.prototype.removeSlide = a.prototype.slickRemove = function (t, e, i) {
                                var o = this;
                                if (t = "boolean" == typeof t ? !0 === (e = t) ? 0 : o.slideCount - 1 : !0 === e ? --t : t, o.slideCount < 1 || t < 0 || t > o.slideCount - 1) return !1;
                                o.unload(),
                                        !0 === i ? o.$slideTrack.children().remove() : o.$slideTrack.children(this.options.slide).eq(t).remove(),
                                        o.$slides = o.$slideTrack.children(this.options.slide),
                                        o.$slideTrack.children(this.options.slide).detach(),
                                        o.$slideTrack.append(o.$slides),
                                        o.$slidesCache = o.$slides,
                                        o.reinit()
                        },
                        a.prototype.setCSS = function (t) {
                                var e, i, o = this,
                                        s = {};
                                !0 === o.options.rtl && (t = -t),
                                        e = "left" == o.positionProp ? Math.ceil(t) + "px" : "0px",
                                        i = "top" == o.positionProp ? Math.ceil(t) + "px" : "0px",
                                        s[o.positionProp] = t,
                                        !1 === o.transformsEnabled || (!(s = {}) === o.cssTransitions ? s[o.animType] = "translate(" + e + ", " + i + ")" : s[o.animType] = "translate3d(" + e + ", " + i + ", 0px)"),
                                        o.$slideTrack.css(s)
                        },
                        a.prototype.setDimensions = function () {
                                var t = this;
                                !1 === t.options.vertical ? !0 === t.options.centerMode && t.$list.css({
                                        padding: "0px " + t.options.centerPadding
                                }) : (t.$list.height(t.$slides.first().outerHeight(!0) * t.options.slidesToShow), !0 === t.options.centerMode && t.$list.css({
                                        padding: t.options.centerPadding + " 0px"
                                })),
                                        t.listWidth = t.$list.width(),
                                        t.listHeight = t.$list.height(),
                                        !1 === t.options.vertical && !1 === t.options.variableWidth ? (t.slideWidth = Math.ceil(t.listWidth / t.options.slidesToShow), t.$slideTrack.width(Math.ceil(t.slideWidth * t.$slideTrack.children(".slick-slide").length))) : !0 === t.options.variableWidth ? t.$slideTrack.width(5e3 * t.slideCount) : (t.slideWidth = Math.ceil(t.listWidth), t.$slideTrack.height(Math.ceil(t.$slides.first().outerHeight(!0) * t.$slideTrack.children(".slick-slide").length)));
                                var e = t.$slides.first().outerWidth(!0) - t.$slides.first().width();
                                !1 === t.options.variableWidth && t.$slideTrack.children(".slick-slide").width(t.slideWidth - e)
                        },
                        a.prototype.setFade = function () {
                                var i, o = this;
                                o.$slides.each(function (t, e) {
                                        i = o.slideWidth * t * -1,
                                                !0 === o.options.rtl ? c(e).css({
                                                        position: "relative",
                                                        right: i,
                                                        top: 0,
                                                        zIndex: o.options.zIndex - 2,
                                                        opacity: 0
                                                }) : c(e).css({
                                                        position: "relative",
                                                        left: i,
                                                        top: 0,
                                                        zIndex: o.options.zIndex - 2,
                                                        opacity: 0
                                                })
                                }),
                                        o.$slides.eq(o.currentSlide).css({
                                                zIndex: o.options.zIndex - 1,
                                                opacity: 1
                                        })
                        },
                        a.prototype.setHeight = function () {
                                var t = this;
                                if (1 === t.options.slidesToShow && !0 === t.options.adaptiveHeight && !1 === t.options.vertical) {
                                        var e = t.$slides.eq(t.currentSlide).outerHeight(!0);
                                        t.$list.css("height", e)
                                }
                        },
                        a.prototype.setOption = a.prototype.slickSetOption = function () {
                                var t, e, i, o, s, n = this,
                                        a = !1;
                                if ("object" === c.type(arguments[0]) ? (i = arguments[0], a = arguments[1], s = "multiple") : "string" === c.type(arguments[0]) && (o = arguments[1], a = arguments[2], "responsive" === (i = arguments[0]) && "array" === c.type(arguments[1]) ? s = "responsive" : void 0 !== arguments[1] && (s = "single")), "single" === s) n.options[i] = o;
                                else if ("multiple" === s) c.each(i, function (t, e) {
                                        n.options[t] = e
                                });
                                else if ("responsive" === s) for (e in o) if ("array" !== c.type(n.options.responsive)) n.options.responsive = [o[e]];
                                else {
                                        for (t = n.options.responsive.length - 1; 0 <= t;) n.options.responsive[t].breakpoint === o[e].breakpoint && n.options.responsive.splice(t, 1),
                                                t--;
                                        n.options.responsive.push(o[e])
                                }
                                a && (n.unload(), n.reinit())
                        },
                        a.prototype.setPosition = function () {
                                var t = this;
                                t.setDimensions(),
                                        t.setHeight(),
                                        !1 === t.options.fade ? t.setCSS(t.getLeft(t.currentSlide)) : t.setFade(),
                                        t.$slider.trigger("setPosition", [t])
                        },
                        a.prototype.setProps = function () {
                                var t = this,
                                        e = document.body.style;
                                t.positionProp = !0 === t.options.vertical ? "top" : "left",
                                        "top" === t.positionProp ? t.$slider.addClass("slick-vertical") : t.$slider.removeClass("slick-vertical"),
                                        void 0 === e.WebkitTransition && void 0 === e.MozTransition && void 0 === e.msTransition || !0 === t.options.useCSS && (t.cssTransitions = !0),
                                        t.options.fade && ("number" == typeof t.options.zIndex ? t.options.zIndex < 3 && (t.options.zIndex = 3) : t.options.zIndex = t.defaults.zIndex),
                                        void 0 !== e.OTransform && (t.animType = "OTransform", t.transformType = "-o-transform", t.transitionType = "OTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                                        void 0 !== e.MozTransform && (t.animType = "MozTransform", t.transformType = "-moz-transform", t.transitionType = "MozTransition", void 0 === e.perspectiveProperty && void 0 === e.MozPerspective && (t.animType = !1)),
                                        void 0 !== e.webkitTransform && (t.animType = "webkitTransform", t.transformType = "-webkit-transform", t.transitionType = "webkitTransition", void 0 === e.perspectiveProperty && void 0 === e.webkitPerspective && (t.animType = !1)),
                                        void 0 !== e.msTransform && (t.animType = "msTransform", t.transformType = "-ms-transform", t.transitionType = "msTransition", void 0 === e.msTransform && (t.animType = !1)),
                                        void 0 !== e.transform && !1 !== t.animType && (t.animType = "transform", t.transformType = "transform", t.transitionType = "transition"),
                                        t.transformsEnabled = t.options.useTransform && null !== t.animType && !1 !== t.animType
                        },
                        a.prototype.setSlideClasses = function (t) {
                                var e, i, o, s, n = this;
                                if (i = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), n.$slides.eq(t).addClass("slick-current"), !0 === n.options.centerMode) {
                                        var a = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                                        e = Math.floor(n.options.slidesToShow / 2),
                                                !0 === n.options.infinite && (e <= t && t <= n.slideCount - 1 - e ? n.$slides.slice(t - e + a, t + e + 1).addClass("slick-active").attr("aria-hidden", "false") : (o = n.options.slidesToShow + t, i.slice(o - e + 1 + a, o + e + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === t ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center") : t === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")),
                                                n.$slides.eq(t).addClass("slick-center")
                                } else 0 <= t && t <= n.slideCount - n.options.slidesToShow ? n.$slides.slice(t, t + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= n.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (s = n.slideCount % n.options.slidesToShow, o = !0 === n.options.infinite ? n.options.slidesToShow + t : t, n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - t < n.options.slidesToShow ? i.slice(o - (n.options.slidesToShow - s), o + s).addClass("slick-active").attr("aria-hidden", "false") : i.slice(o, o + n.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
                                "ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad || n.lazyLoad()
                        },
                        a.prototype.setupInfinite = function () {
                                var t, e, i, o = this;
                                if (!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && (e = null, o.slideCount > o.options.slidesToShow)) {
                                        for (i = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - i; --t) e = t - 1,
                                                c(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e - o.slideCount).prependTo(o.$slideTrack).addClass("slick-cloned");
                                        for (t = 0; t < i + o.slideCount; t += 1) e = t,
                                                c(o.$slides[e]).clone(!0).attr("id", "").attr("data-slick-index", e + o.slideCount).appendTo(o.$slideTrack).addClass("slick-cloned");
                                        o.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
                                                c(this).attr("id", "")
                                        })
                                }
                        },
                        a.prototype.interrupt = function (t) {
                                t || this.autoPlay(),
                                        this.interrupted = t
                        },
                        a.prototype.selectHandler = function (t) {
                                var e = c(t.target).is(".slick-slide") ? c(t.target) : c(t.target).parents(".slick-slide"),
                                        i = parseInt(e.attr("data-slick-index"));
                                i = i || 0,
                                        this.slideCount <= this.options.slidesToShow ? this.slideHandler(i, !1, !0) : this.slideHandler(i)
                        },
                        a.prototype.slideHandler = function (t, e, i) {
                                var o, s, n, a, r, l, c = this;
                                if (e = e || !1, !(!0 === c.animating && !0 === c.options.waitForAnimate || !0 === c.options.fade && c.currentSlide === t)) if (!1 === e && c.asNavFor(t), o = t, r = c.getLeft(o), a = c.getLeft(c.currentSlide), c.currentLeft = null === c.swipeLeft ? a : c.swipeLeft, !1 === c.options.infinite && !1 === c.options.centerMode && (t < 0 || t > c.getDotCount() * c.options.slidesToScroll)) !1 === c.options.fade && (o = c.currentSlide, !0 !== i && c.slideCount > c.options.slidesToShow ? c.animateSlide(a, function () {
                                        c.postSlide(o)
                                }) : c.postSlide(o));
                                else if (!1 === c.options.infinite && !0 === c.options.centerMode && (t < 0 || t > c.slideCount - c.options.slidesToScroll)) !1 === c.options.fade && (o = c.currentSlide, !0 !== i && c.slideCount > c.options.slidesToShow ? c.animateSlide(a, function () {
                                        c.postSlide(o)
                                }) : c.postSlide(o));
                                else {
                                        if (c.options.autoplay && clearInterval(c.autoPlayTimer), s = o < 0 ? c.slideCount % c.options.slidesToScroll != 0 ? c.slideCount - c.slideCount % c.options.slidesToScroll : c.slideCount + o : o >= c.slideCount ? c.slideCount % c.options.slidesToScroll != 0 ? 0 : o - c.slideCount : o, c.animating = !0, c.$slider.trigger("beforeChange", [c, c.currentSlide, s]), n = c.currentSlide, c.currentSlide = s, c.setSlideClasses(c.currentSlide), c.options.asNavFor && (l = (l = c.getNavTarget()).slick("getSlick")).slideCount <= l.options.slidesToShow && l.setSlideClasses(c.currentSlide), c.updateDots(), c.updateArrows(), !0 === c.options.fade) return !0 !== i ? (c.fadeSlideOut(n), c.fadeSlide(s, function () {
                                                c.postSlide(s)
                                        })) : c.postSlide(s),
                                                void c.animateHeight();
                                        !0 !== i && c.slideCount > c.options.slidesToShow ? c.animateSlide(r, function () {
                                                c.postSlide(s)
                                        }) : c.postSlide(s)
                                }
                        },
                        a.prototype.startLoad = function () {
                                var t = this;
                                !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && (t.$prevArrow.hide(), t.$nextArrow.hide()),
                                        !0 === t.options.dots && t.slideCount > t.options.slidesToShow && t.$dots.hide(),
                                        t.$slider.addClass("slick-loading")
                        },
                        a.prototype.swipeDirection = function () {
                                var t, e, i, o, s = this;
                                return t = s.touchObject.startX - s.touchObject.curX,
                                        e = s.touchObject.startY - s.touchObject.curY,
                                        i = Math.atan2(e, t),
                                        (o = Math.round(180 * i / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
                                        o <= 45 && 0 <= o || o <= 360 && 315 <= o ? !1 === s.options.rtl ? "left" : "right" : 135 <= o && o <= 225 ? !1 === s.options.rtl ? "right" : "left" : !0 === s.options.verticalSwiping ? 35 <= o && o <= 135 ? "down" : "up" : "vertical"
                        },
                        a.prototype.swipeEnd = function (t) {
                                var e, i, o = this;
                                if (o.dragging = !1, o.swiping = !1, o.scrolling) return o.scrolling = !1;
                                if (o.interrupted = !1, o.shouldClick = !(10 < o.touchObject.swipeLength), void 0 === o.touchObject.curX) return !1;
                                if (!0 === o.touchObject.edgeHit && o.$slider.trigger("edge", [o, o.swipeDirection()]), o.touchObject.swipeLength >= o.touchObject.minSwipe) {
                                        switch (i = o.swipeDirection()) {
                                                case "left":
                                                case "down":
                                                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide + o.getSlideCount()) : o.currentSlide + o.getSlideCount(),
                                                                o.currentDirection = 0;
                                                        break;
                                                case "right":
                                                case "up":
                                                        e = o.options.swipeToSlide ? o.checkNavigable(o.currentSlide - o.getSlideCount()) : o.currentSlide - o.getSlideCount(),
                                                                o.currentDirection = 1
                                        }
                                        "vertical" != i && (o.slideHandler(e), o.touchObject = {}, o.$slider.trigger("swipe", [o, i]))
                                } else o.touchObject.startX !== o.touchObject.curX && (o.slideHandler(o.currentSlide), o.touchObject = {})
                        },
                        a.prototype.swipeHandler = function (t) {
                                var e = this;
                                if (!(!1 === e.options.swipe || "ontouchend" in document && !1 === e.options.swipe || !1 === e.options.draggable && -1 !== t.type.indexOf("mouse"))) switch (e.touchObject.fingerCount = t.originalEvent && void 0 !== t.originalEvent.touches ? t.originalEvent.touches.length : 1, e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold, !0 === e.options.verticalSwiping && (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold), t.data.action) {
                                        case "start":
                                                e.swipeStart(t);
                                                break;
                                        case "move":
                                                e.swipeMove(t);
                                                break;
                                        case "end":
                                                e.swipeEnd(t)
                                }
                        },
                        a.prototype.swipeMove = function (t) {
                                var e, i, o, s, n, a, r = this;
                                return n = void 0 !== t.originalEvent ? t.originalEvent.touches : null,
                                        !(!r.dragging || r.scrolling || n && 1 !== n.length) && (e = r.getLeft(r.currentSlide), r.touchObject.curX = void 0 !== n ? n[0].pageX : t.clientX, r.touchObject.curY = void 0 !== n ? n[0].pageY : t.clientY, r.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(r.touchObject.curX - r.touchObject.startX, 2))), a = Math.round(Math.sqrt(Math.pow(r.touchObject.curY - r.touchObject.startY, 2))), !r.options.verticalSwiping && !r.swiping && 4 < a ? !(r.scrolling = !0) : (!0 === r.options.verticalSwiping && (r.touchObject.swipeLength = a), i = r.swipeDirection(), void 0 !== t.originalEvent && 4 < r.touchObject.swipeLength && (r.swiping = !0, t.preventDefault()), s = (!1 === r.options.rtl ? 1 : -1) * (r.touchObject.curX > r.touchObject.startX ? 1 : -1), !0 === r.options.verticalSwiping && (s = r.touchObject.curY > r.touchObject.startY ? 1 : -1), o = r.touchObject.swipeLength, (r.touchObject.edgeHit = !1) === r.options.infinite && (0 === r.currentSlide && "right" === i || r.currentSlide >= r.getDotCount() && "left" === i) && (o = r.touchObject.swipeLength * r.options.edgeFriction, r.touchObject.edgeHit = !0), !1 === r.options.vertical ? r.swipeLeft = e + o * s : r.swipeLeft = e + o * (r.$list.height() / r.listWidth) * s, !0 === r.options.verticalSwiping && (r.swipeLeft = e + o * s), !0 !== r.options.fade && !1 !== r.options.touchMove && (!0 === r.animating ? (r.swipeLeft = null, !1) : void r.setCSS(r.swipeLeft))))
                        },
                        a.prototype.swipeStart = function (t) {
                                var e, i = this;
                                if (i.interrupted = !0, 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow) return !(i.touchObject = {});
                                void 0 !== t.originalEvent && void 0 !== t.originalEvent.touches && (e = t.originalEvent.touches[0]),
                                        i.touchObject.startX = i.touchObject.curX = void 0 !== e ? e.pageX : t.clientX,
                                        i.touchObject.startY = i.touchObject.curY = void 0 !== e ? e.pageY : t.clientY,
                                        i.dragging = !0
                        },
                        a.prototype.unfilterSlides = a.prototype.slickUnfilter = function () {
                                var t = this;
                                null !== t.$slidesCache && (t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.appendTo(t.$slideTrack), t.reinit())
                        },
                        a.prototype.unload = function () {
                                var t = this;
                                c(".slick-cloned", t.$slider).remove(),
                                        t.$dots && t.$dots.remove(),
                                        t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(),
                                        t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(),
                                        t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
                        },
                        a.prototype.unslick = function (t) {
                                this.$slider.trigger("unslick", [this, t]),
                                        this.destroy()
                        },
                        a.prototype.updateArrows = function () {
                                var t = this;
                                Math.floor(t.options.slidesToShow / 2),
                                        !0 === t.options.arrows && t.slideCount > t.options.slidesToShow && !t.options.infinite && (t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === t.currentSlide ? (t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : (t.currentSlide >= t.slideCount - t.options.slidesToShow && !1 === t.options.centerMode || t.currentSlide >= t.slideCount - 1 && !0 === t.options.centerMode) && (t.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), t.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
                        },
                        a.prototype.updateDots = function () {
                                var t = this;
                                null !== t.$dots && (t.$dots.find("li").removeClass("slick-active").end(), t.$dots.find("li").eq(Math.floor(t.currentSlide / t.options.slidesToScroll)).addClass("slick-active"))
                        },
                        a.prototype.visibility = function () {
                                this.options.autoplay && (document[this.hidden] ? this.interrupted = !0 : this.interrupted = !1)
                        },
                        c.fn.slick = function () {
                                var t, e, i = this,
                                        o = arguments[0],
                                        s = Array.prototype.slice.call(arguments, 1),
                                        n = i.length;
                                for (t = 0; t < n; t++) if ("object" == typeof o || void 0 === o ? i[t].slick = new a(i[t], o) : e = i[t].slick[o].apply(i[t].slick, s), void 0 !== e) return e;
                                return i
                        }
        }),


        function (t) {
                "function" == typeof define && define.amd ? define(["jquery"], t) : t("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
        }(function (d) {
                function t() { }
                function h(t, e) {
                        m.ev.on("mfp" + t + w, e)
                }
                function p(t, e, i, o) {
                        var s = document.createElement("div");
                        return s.className = "mfp-" + t,
                                i && (s.innerHTML = i),
                                o ? e && e.appendChild(s) : (s = d(s), e && s.appendTo(e)),
                                s
                }
                function u(t, e) {
                        m.ev.triggerHandler("mfp" + t, e),
                                m.st.callbacks && (t = t.charAt(0).toLowerCase() + t.slice(1), m.st.callbacks[t] && m.st.callbacks[t].apply(m, d.isArray(e) ? e : [e]))
                }
                function f(t) {
                        return t === e && m.currTemplate.closeBtn || (m.currTemplate.closeBtn = d(m.st.closeMarkup.replace("%title%", m.st.tClose)), e = t),
                                m.currTemplate.closeBtn
                }
                function n() {
                        d.magnificPopup.instance || ((m = new t).init(), d.magnificPopup.instance = m)
                }
                var m, o, g, s, v, e, l = "Close",
                        c = "BeforeClose",
                        b = "MarkupParse",
                        y = "Open",
                        w = ".mfp",
                        x = "mfp-ready",
                        i = "mfp-removing",
                        a = "mfp-prevent-close",
                        r = !!window.jQuery,
                        _ = d(window);
                t.prototype = {
                        constructor: t,
                        init: function () {
                                var t = navigator.appVersion;
                                m.isLowIE = m.isIE8 = document.all && !document.addEventListener,
                                        m.isAndroid = /android/gi.test(t),
                                        m.isIOS = /iphone|ipad|ipod/gi.test(t),
                                        m.supportsTransition = function () {
                                                var t = document.createElement("p").style,
                                                        e = ["ms", "O", "Moz", "Webkit"];
                                                if (void 0 !== t.transition) return !0;
                                                for (; e.length;) if (e.pop() + "Transition" in t) return !0;
                                                return !1
                                        }(),
                                        m.probablyMobile = m.isAndroid || m.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
                                        g = d(document),
                                        m.popupsCache = {}
                        },
                        open: function (t) {
                                var e;
                                if (!1 === t.isObj) {
                                        m.items = t.items.toArray(),
                                                m.index = 0;
                                        var i, o = t.items;
                                        for (e = 0; e < o.length; e++) if ((i = o[e]).parsed && (i = i.el[0]), i === t.el[0]) {
                                                m.index = e;
                                                break
                                        }
                                } else m.items = d.isArray(t.items) ? t.items : [t.items],
                                        m.index = t.index || 0;
                                if (!m.isOpen) {
                                        m.types = [],
                                                v = "",
                                                t.mainEl && t.mainEl.length ? m.ev = t.mainEl.eq(0) : m.ev = g,
                                                t.key ? (m.popupsCache[t.key] || (m.popupsCache[t.key] = {}), m.currTemplate = m.popupsCache[t.key]) : m.currTemplate = {},
                                                m.st = d.extend(!0, {}, d.magnificPopup.defaults, t),
                                                m.fixedContentPos = "auto" === m.st.fixedContentPos ? !m.probablyMobile : m.st.fixedContentPos,
                                                m.st.modal && (m.st.closeOnContentClick = !1, m.st.closeOnBgClick = !1, m.st.showCloseBtn = !1, m.st.enableEscapeKey = !1),
                                                m.bgOverlay || (m.bgOverlay = p("bg").on("click" + w, function () {
                                                        m.close()
                                                }), m.wrap = p("wrap").attr("tabindex", -1).on("click" + w, function (t) {
                                                        m._checkIfClose(t.target) && m.close()
                                                }), m.container = p("container", m.wrap)),
                                                m.contentContainer = p("content"),
                                                m.st.preloader && (m.preloader = p("preloader", m.container, m.st.tLoading));
                                        var s = d.magnificPopup.modules;
                                        for (e = 0; e < s.length; e++) {
                                                var n = s[e];
                                                n = n.charAt(0).toUpperCase() + n.slice(1),
                                                        m["init" + n].call(m)
                                        }
                                        u("BeforeOpen"),
                                                m.st.showCloseBtn && (m.st.closeBtnInside ? (h(b, function (t, e, i, o) {
                                                        i.close_replaceWith = f(o.type)
                                                }), v += " mfp-close-btn-in") : m.wrap.append(f())),
                                                m.st.alignTop && (v += " mfp-align-top"),
                                                m.fixedContentPos ? m.wrap.css({
                                                        overflow: m.st.overflowY,
                                                        overflowX: "hidden",
                                                        overflowY: m.st.overflowY
                                                }) : m.wrap.css({
                                                        top: _.scrollTop(),
                                                        position: "absolute"
                                                }),
                                                !1 !== m.st.fixedBgPos && ("auto" !== m.st.fixedBgPos || m.fixedContentPos) || m.bgOverlay.css({
                                                        height: g.height(),
                                                        position: "absolute"
                                                }),
                                                m.st.enableEscapeKey && g.on("keyup" + w, function (t) {
                                                        27 === t.keyCode && m.close()
                                                }),
                                                _.on("resize" + w, function () {
                                                        m.updateSize()
                                                }),
                                                m.st.closeOnContentClick || (v += " mfp-auto-cursor"),
                                                v && m.wrap.addClass(v);
                                        var a = m.wH = _.height(),
                                                r = {};
                                        if (m.fixedContentPos && m._hasScrollBar(a)) {
                                                var l = m._getScrollbarSize();
                                                l && (r.marginRight = l)
                                        }
                                        m.fixedContentPos && (m.isIE7 ? d("body, html").css("overflow", "hidden") : r.overflow = "hidden");
                                        var c = m.st.mainClass;
                                        return m.isIE7 && (c += " mfp-ie7"),
                                                c && m._addClassToMFP(c),
                                                m.updateItemHTML(),
                                                u("BuildControls"),
                                                d("html").css(r),
                                                m.bgOverlay.add(m.wrap).prependTo(m.st.prependTo || d(document.body)),
                                                m._lastFocusedEl = document.activeElement,
                                                setTimeout(function () {
                                                        m.content ? (m._addClassToMFP(x), m._setFocus()) : m.bgOverlay.addClass(x),
                                                                g.on("focusin" + w, m._onFocusIn)
                                                }, 16),
                                                m.isOpen = !0,
                                                m.updateSize(a),
                                                u(y),
                                                t
                                }
                                m.updateItemHTML()
                        },
                        close: function () {
                                m.isOpen && (u(c), m.isOpen = !1, m.st.removalDelay && !m.isLowIE && m.supportsTransition ? (m._addClassToMFP(i), setTimeout(function () {
                                        m._close()
                                }, m.st.removalDelay)) : m._close())
                        },
                        _close: function () {
                                u(l);
                                var t = i + " " + x + " ";
                                if (m.bgOverlay.detach(), m.wrap.detach(), m.container.empty(), m.st.mainClass && (t += m.st.mainClass + " "), m._removeClassFromMFP(t), m.fixedContentPos) {
                                        var e = {
                                                marginRight: ""
                                        };
                                        m.isIE7 ? d("body, html").css("overflow", "") : e.overflow = "",
                                                d("html").css(e)
                                }
                                g.off("keyup.mfp focusin" + w),
                                        m.ev.off(w),
                                        m.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                                        m.bgOverlay.attr("class", "mfp-bg"),
                                        m.container.attr("class", "mfp-container"),
                                        !m.st.showCloseBtn || m.st.closeBtnInside && !0 !== m.currTemplate[m.currItem.type] || m.currTemplate.closeBtn && m.currTemplate.closeBtn.detach(),
                                        m.st.autoFocusLast && m._lastFocusedEl && d(m._lastFocusedEl).focus(),
                                        m.currItem = null,
                                        m.content = null,
                                        m.currTemplate = null,
                                        m.prevHeight = 0,
                                        u("AfterClose")
                        },
                        updateSize: function (t) {
                                if (m.isIOS) {
                                        var e = document.documentElement.clientWidth / window.innerWidth,
                                                i = window.innerHeight * e;
                                        m.wrap.css("height", i),
                                                m.wH = i
                                } else m.wH = t || _.height();
                                m.fixedContentPos || m.wrap.css("height", m.wH),
                                        u("Resize")
                        },
                        updateItemHTML: function () {
                                var t = m.items[m.index];
                                m.contentContainer.detach(),
                                        m.content && m.content.detach(),
                                        t.parsed || (t = m.parseEl(m.index));
                                var e = t.type;
                                if (u("BeforeChange", [m.currItem ? m.currItem.type : "", e]), m.currItem = t, !m.currTemplate[e]) {
                                        var i = !!m.st[e] && m.st[e].markup;
                                        u("FirstMarkupParse", i),
                                                m.currTemplate[e] = !i || d(i)
                                }
                                s && s !== t.type && m.container.removeClass("mfp-" + s + "-holder");
                                var o = m["get" + e.charAt(0).toUpperCase() + e.slice(1)](t, m.currTemplate[e]);
                                m.appendContent(o, e),
                                        t.preloaded = !0,
                                        u("Change", t),
                                        s = t.type,
                                        m.container.prepend(m.contentContainer),
                                        u("AfterChange")
                        },
                        appendContent: function (t, e) {
                                (m.content = t) ? m.st.showCloseBtn && m.st.closeBtnInside && !0 === m.currTemplate[e] ? m.content.find(".mfp-close").length || m.content.append(f()) : m.content = t : m.content = "",
                                        u("BeforeAppend"),
                                        m.container.addClass("mfp-" + e + "-holder"),
                                        m.contentContainer.append(m.content)
                        },
                        parseEl: function (t) {
                                var e, i = m.items[t];
                                if ((i = i.tagName ? {
                                        el: d(i)
                                } : (e = i.type, {
                                        data: i,
                                        src: i.src
                                })).el) {
                                        for (var o = m.types, s = 0; s < o.length; s++) if (i.el.hasClass("mfp-" + o[s])) {
                                                e = o[s];
                                                break
                                        }
                                        i.src = i.el.attr("data-mfp-src"),
                                                i.src || (i.src = i.el.attr("href"))
                                }
                                return i.type = e || m.st.type || "inline",
                                        i.index = t,
                                        i.parsed = !0,
                                        m.items[t] = i,
                                        u("ElementParse", i),
                                        m.items[t]
                        },
                        addGroup: function (e, i) {
                                function t(t) {
                                        t.mfpEl = this,
                                                m._openClick(t, e, i)
                                }
                                var o = "click.magnificPopup";
                                (i = i || {}).mainEl = e,
                                        i.items ? (i.isObj = !0, e.off(o).on(o, t)) : (i.isObj = !1, i.delegate ? e.off(o).on(o, i.delegate, t) : (i.items = e).off(o).on(o, t))
                        },
                        _openClick: function (t, e, i) {
                                if ((void 0 !== i.midClick ? i.midClick : d.magnificPopup.defaults.midClick) || !(2 === t.which || t.ctrlKey || t.metaKey || t.altKey || t.shiftKey)) {
                                        var o = void 0 !== i.disableOn ? i.disableOn : d.magnificPopup.defaults.disableOn;
                                        if (o) if (d.isFunction(o)) {
                                                if (!o.call(m)) return !0
                                        } else if (_.width() < o) return !0;
                                        t.type && (t.preventDefault(), m.isOpen && t.stopPropagation()),
                                                i.el = d(t.mfpEl),
                                                i.delegate && (i.items = e.find(i.delegate)),
                                                m.open(i)
                                }
                        },
                        updateStatus: function (t, e) {
                                if (m.preloader) {
                                        o !== t && m.container.removeClass("mfp-s-" + o),
                                                e || "loading" !== t || (e = m.st.tLoading);
                                        var i = {
                                                status: t,
                                                text: e
                                        };
                                        u("UpdateStatus", i),
                                                t = i.status,
                                                e = i.text,
                                                m.preloader.html(e),
                                                m.preloader.find("a").on("click", function (t) {
                                                        t.stopImmediatePropagation()
                                                }),
                                                m.container.addClass("mfp-s-" + t),
                                                o = t
                                }
                        },
                        _checkIfClose: function (t) {
                                if (!d(t).hasClass(a)) {
                                        var e = m.st.closeOnContentClick,
                                                i = m.st.closeOnBgClick;
                                        if (e && i) return !0;
                                        if (!m.content || d(t).hasClass("mfp-close") || m.preloader && t === m.preloader[0]) return !0;
                                        if (t === m.content[0] || d.contains(m.content[0], t)) {
                                                if (e) return !0
                                        } else if (i && d.contains(document, t)) return !0;
                                        return !1
                                }
                        },
                        _addClassToMFP: function (t) {
                                m.bgOverlay.addClass(t),
                                        m.wrap.addClass(t)
                        },
                        _removeClassFromMFP: function (t) {
                                this.bgOverlay.removeClass(t),
                                        m.wrap.removeClass(t)
                        },
                        _hasScrollBar: function (t) {
                                return (m.isIE7 ? g.height() : document.body.scrollHeight) > (t || _.height())
                        },
                        _setFocus: function () {
                                (m.st.focus ? m.content.find(m.st.focus).eq(0) : m.wrap).focus()
                        },
                        _onFocusIn: function (t) {
                                return t.target === m.wrap[0] || d.contains(m.wrap[0], t.target) ? void 0 : (m._setFocus(), !1)
                        },
                        _parseMarkup: function (s, t, e) {
                                var n;
                                e.data && (t = d.extend(e.data, t)),
                                        u(b, [s, t, e]),
                                        d.each(t, function (t, e) {
                                                if (void 0 === e || !1 === e) return !0;
                                                if (1 < (n = t.split("_")).length) {
                                                        var i = s.find(w + "-" + n[0]);
                                                        if (0 < i.length) {
                                                                var o = n[1];
                                                                "replaceWith" === o ? i[0] !== e[0] && i.replaceWith(e) : "img" === o ? i.is("img") ? i.attr("src", e) : i.replaceWith(d("<img>").attr("src", e).attr("class", i.attr("class"))) : i.attr(n[1], e)
                                                        }
                                                } else s.find(w + "-" + t).html(e)
                                        })
                        },
                        _getScrollbarSize: function () {
                                if (void 0 === m.scrollbarSize) {
                                        var t = document.createElement("div");
                                        t.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                                                document.body.appendChild(t),
                                                m.scrollbarSize = t.offsetWidth - t.clientWidth,
                                                document.body.removeChild(t)
                                }
                                return m.scrollbarSize
                        }
                },
                        d.magnificPopup = {
                                instance: null,
                                proto: t.prototype,
                                modules: [],
                                open: function (t, e) {
                                        return n(),
                                                (t = t ? d.extend(!0, {}, t) : {}).isObj = !0,
                                                t.index = e || 0,
                                                this.instance.open(t)
                                },
                                close: function () {
                                        return d.magnificPopup.instance && d.magnificPopup.instance.close()
                                },
                                registerModule: function (t, e) {
                                        e.options && (d.magnificPopup.defaults[t] = e.options),
                                                d.extend(this.proto, e.proto),
                                                this.modules.push(t)
                                },
                                defaults: {
                                        disableOn: 0,
                                        key: null,
                                        midClick: !1,
                                        mainClass: "",
                                        preloader: !0,
                                        focus: "",
                                        closeOnContentClick: !1,
                                        closeOnBgClick: !0,
                                        closeBtnInside: !0,
                                        showCloseBtn: !0,
                                        enableEscapeKey: !0,
                                        modal: !1,
                                        alignTop: !1,
                                        removalDelay: 0,
                                        prependTo: null,
                                        fixedContentPos: "auto",
                                        fixedBgPos: "auto",
                                        overflowY: "auto",
                                        closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                                        tClose: "Close (Esc)",
                                        tLoading: "Loading...",
                                        autoFocusLast: !0
                                }
                        },
                        d.fn.magnificPopup = function (t) {
                                n();
                                var e = d(this);
                                if ("string" == typeof t) if ("open" === t) {
                                        var i, o = r ? e.data("magnificPopup") : e[0].magnificPopup,
                                                s = parseInt(arguments[1], 10) || 0;
                                        i = o.items ? o.items[s] : (i = e, o.delegate && (i = i.find(o.delegate)), i.eq(s)),
                                                m._openClick({
                                                        mfpEl: i
                                                }, e, o)
                                } else m.isOpen && m[t].apply(m, Array.prototype.slice.call(arguments, 1));
                                else t = d.extend(!0, {}, t),
                                        r ? e.data("magnificPopup", t) : e[0].magnificPopup = t,
                                        m.addGroup(e, t);
                                return e
                        };

                function C() {
                        k && (T.after(k.addClass(S)).detach(), k = null)
                }
                var S, T, k, $ = "inline";
                d.magnificPopup.registerModule($, {
                        options: {
                                hiddenClass: "hide",
                                markup: "",
                                tNotFound: "Content not found"
                        },
                        proto: {
                                initInline: function () {
                                        m.types.push($),
                                                h(l + "." + $, function () {
                                                        C()
                                                })
                                },
                                getInline: function (t, e) {
                                        if (C(), t.src) {
                                                var i = m.st.inline,
                                                        o = d(t.src);
                                                if (o.length) {
                                                        var s = o[0].parentNode;
                                                        s && s.tagName && (T || (S = i.hiddenClass, T = p(S), S = "mfp-" + S), k = o.after(T).detach().removeClass(S)),
                                                                m.updateStatus("ready")
                                                } else m.updateStatus("error", i.tNotFound),
                                                        o = d("<div>");
                                                return t.inlineElement = o
                                        }
                                        return m.updateStatus("ready"),
                                                m._parseMarkup(e, {}, t),
                                                e
                                }
                        }
                });

                function A() {
                        I && d(document.body).removeClass(I)
                }
                function P() {
                        A(),
                                m.req && m.req.abort()
                }
                var I, E = "ajax";
                d.magnificPopup.registerModule(E, {
                        options: {
                                settings: null,
                                cursor: "mfp-ajax-cur",
                                tError: '<a href="%url%">The content</a> could not be loaded.'
                        },
                        proto: {
                                initAjax: function () {
                                        m.types.push(E),
                                                I = m.st.ajax.cursor,
                                                h(l + "." + E, P),
                                                h("BeforeChange." + E, P)
                                },
                                getAjax: function (s) {
                                        I && d(document.body).addClass(I),
                                                m.updateStatus("loading");
                                        var t = d.extend({
                                                url: s.src,
                                                success: function (t, e, i) {
                                                        var o = {
                                                                data: t,
                                                                xhr: i
                                                        };
                                                        u("ParseAjax", o),
                                                                m.appendContent(d(o.data), E),
                                                                s.finished = !0,
                                                                A(),
                                                                m._setFocus(),
                                                                setTimeout(function () {
                                                                        m.wrap.addClass(x)
                                                                }, 16),
                                                                m.updateStatus("ready"),
                                                                u("AjaxContentAdded")
                                                },
                                                error: function () {
                                                        A(),
                                                                s.finished = s.loadError = !0,
                                                                m.updateStatus("error", m.st.ajax.tError.replace("%url%", s.src))
                                                }
                                        }, m.st.ajax.settings);
                                        return m.req = d.ajax(t),
                                                ""
                                }
                        }
                });
                var O;
                d.magnificPopup.registerModule("image", {
                        options: {
                                markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
                                cursor: "mfp-zoom-out-cur",
                                titleSrc: "title",
                                verticalFit: !0,
                                tError: '<a href="%url%">The image</a> could not be loaded.'
                        },
                        proto: {
                                initImage: function () {
                                        var t = m.st.image,
                                                e = ".image";
                                        m.types.push("image"),
                                                h(y + e, function () {
                                                        "image" === m.currItem.type && t.cursor && d(document.body).addClass(t.cursor)
                                                }),
                                                h(l + e, function () {
                                                        t.cursor && d(document.body).removeClass(t.cursor),
                                                                _.off("resize" + w)
                                                }),
                                                h("Resize" + e, m.resizeImage),
                                                m.isLowIE && h("AfterChange", m.resizeImage)
                                },
                                resizeImage: function () {
                                        var t = m.currItem;
                                        if (t && t.img && m.st.image.verticalFit) {
                                                var e = 0;
                                                m.isLowIE && (e = parseInt(t.img.css("padding-top"), 10) + parseInt(t.img.css("padding-bottom"), 10)),
                                                        t.img.css("max-height", m.wH - e)
                                        }
                                },
                                _onImageHasSize: function (t) {
                                        t.img && (t.hasSize = !0, O && clearInterval(O), t.isCheckingImgSize = !1, u("ImageHasSize", t), t.imgHidden && (m.content && m.content.removeClass("mfp-loading"), t.imgHidden = !1))
                                },
                                findImageSize: function (e) {
                                        var i = 0,
                                                o = e.img[0],
                                                s = function (t) {
                                                        O && clearInterval(O),
                                                                O = setInterval(function () {
                                                                        return 0 < o.naturalWidth ? void m._onImageHasSize(e) : (200 < i && clearInterval(O), void (3 === ++i ? s(10) : 40 === i ? s(50) : 100 === i && s(500)))
                                                                }, t)
                                                };
                                        s(1)
                                },
                                getImage: function (t, e) {
                                        var i = 0,
                                                o = function () {
                                                        t && (t.img[0].complete ? (t.img.off(".mfploader"), t === m.currItem && (m._onImageHasSize(t), m.updateStatus("ready")), t.hasSize = !0, t.loaded = !0, u("ImageLoadComplete")) : ++i < 200 ? setTimeout(o, 100) : s())
                                                },
                                                s = function () {
                                                        t && (t.img.off(".mfploader"), t === m.currItem && (m._onImageHasSize(t), m.updateStatus("error", n.tError.replace("%url%", t.src))), t.hasSize = !0, t.loaded = !0, t.loadError = !0)
                                                },
                                                n = m.st.image,
                                                a = e.find(".mfp-img");
                                        if (a.length) {
                                                var r = document.createElement("img");
                                                r.className = "mfp-img",
                                                        t.el && t.el.find("img").length && (r.alt = t.el.find("img").attr("alt")),
                                                        t.img = d(r).on("load.mfploader", o).on("error.mfploader", s),
                                                        r.src = t.src,
                                                        a.is("img") && (t.img = t.img.clone()),
                                                        0 < (r = t.img[0]).naturalWidth ? t.hasSize = !0 : r.width || (t.hasSize = !1)
                                        }
                                        return m._parseMarkup(e, {
                                                title: function (t) {
                                                        if (t.data && void 0 !== t.data.title) return t.data.title;
                                                        var e = m.st.image.titleSrc;
                                                        if (e) {
                                                                if (d.isFunction(e)) return e.call(m, t);
                                                                if (t.el) return t.el.attr(e) || ""
                                                        }
                                                        return ""
                                                }(t),
                                                img_replaceWith: t.img
                                        }, t),
                                                m.resizeImage(),
                                                t.hasSize ? (O && clearInterval(O), t.loadError ? (e.addClass("mfp-loading"), m.updateStatus("error", n.tError.replace("%url%", t.src))) : (e.removeClass("mfp-loading"), m.updateStatus("ready"))) : (m.updateStatus("loading"), t.loading = !0, t.hasSize || (t.imgHidden = !0, e.addClass("mfp-loading"), m.findImageSize(t))),
                                                e
                                }
                        }
                });
                var D;
                d.magnificPopup.registerModule("zoom", {
                        options: {
                                enabled: !1,
                                easing: "ease-in-out",
                                duration: 300,
                                opener: function (t) {
                                        return t.is("img") ? t : t.find("img")
                                }
                        },
                        proto: {
                                initZoom: function () {
                                        var t, n = m.st.zoom,
                                                e = ".zoom";
                                        if (n.enabled && m.supportsTransition) {
                                                function i(t) {
                                                        var e = t.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                                                i = "all " + n.duration / 1e3 + "s " + n.easing,
                                                                o = {
                                                                        position: "fixed",
                                                                        zIndex: 9999,
                                                                        left: 0,
                                                                        top: 0,
                                                                        "-webkit-backface-visibility": "hidden"
                                                                },
                                                                s = "transition";
                                                        return o["-webkit-" + s] = o["-moz-" + s] = o["-o-" + s] = o[s] = i,
                                                                e.css(o),
                                                                e
                                                }
                                                function o() {
                                                        m.content.css("visibility", "visible")
                                                }
                                                var s, a, r = n.duration;
                                                h("BuildControls" + e, function () {
                                                        if (m._allowZoom()) {
                                                                if (clearTimeout(s), m.content.css("visibility", "hidden"), !(t = m._getItemToZoom())) return void o();
                                                                (a = i(t)).css(m._getOffset()),
                                                                        m.wrap.append(a),
                                                                        s = setTimeout(function () {
                                                                                a.css(m._getOffset(!0)),
                                                                                        s = setTimeout(function () {
                                                                                                o(),
                                                                                                        setTimeout(function () {
                                                                                                                a.remove(),
                                                                                                                        t = a = null,
                                                                                                                        u("ZoomAnimationEnded")
                                                                                                        }, 16)
                                                                                        }, r)
                                                                        }, 16)
                                                        }
                                                }),
                                                        h(c + e, function () {
                                                                if (m._allowZoom()) {
                                                                        if (clearTimeout(s), m.st.removalDelay = r, !t) {
                                                                                if (!(t = m._getItemToZoom())) return;
                                                                                a = i(t)
                                                                        }
                                                                        a.css(m._getOffset(!0)),
                                                                                m.wrap.append(a),
                                                                                m.content.css("visibility", "hidden"),
                                                                                setTimeout(function () {
                                                                                        a.css(m._getOffset())
                                                                                }, 16)
                                                                }
                                                        }),
                                                        h(l + e, function () {
                                                                m._allowZoom() && (o(), a && a.remove(), t = null)
                                                        })
                                        }
                                },
                                _allowZoom: function () {
                                        return "image" === m.currItem.type
                                },
                                _getItemToZoom: function () {
                                        return !!m.currItem.hasSize && m.currItem.img
                                },
                                _getOffset: function (t) {
                                        var e, i = (e = t ? m.currItem.img : m.st.zoom.opener(m.currItem.el || m.currItem)).offset(),
                                                o = parseInt(e.css("padding-top"), 10),
                                                s = parseInt(e.css("padding-bottom"), 10);
                                        i.top -= d(window).scrollTop() - o;
                                        var n = {
                                                width: e.width(),
                                                height: (r ? e.innerHeight() : e[0].offsetHeight) - s - o
                                        };
                                        return void 0 === D && (D = void 0 !== document.createElement("p").style.MozTransform),
                                                D ? n["-moz-transform"] = n.transform = "translate(" + i.left + "px," + i.top + "px)" : (n.left = i.left, n.top = i.top),
                                                n
                                }
                        }
                });

                function M(t) {
                        if (m.currTemplate[F]) {
                                var e = m.currTemplate[F].find("iframe");
                                e.length && (t || (e[0].src = "//about:blank"), m.isIE8 && e.css("display", t ? "block" : "none"))
                        }
                }
                var F = "iframe";
                d.magnificPopup.registerModule(F, {
                        options: {
                                markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
                                srcAction: "iframe_src",
                                patterns: {
                                        youtube: {
                                                index: "youtube.com",
                                                id: "v=",
                                                src: "//www.youtube.com/embed/%id%?autoplay=1"
                                        },
                                        vimeo: {
                                                index: "vimeo.com/",
                                                id: "/",
                                                src: "//player.vimeo.com/video/%id%?autoplay=1"
                                        },
                                        gmaps: {
                                                index: "//maps.google.",
                                                src: "%id%&output=embed"
                                        }
                                }
                        },
                        proto: {
                                initIframe: function () {
                                        m.types.push(F),
                                                h("BeforeChange", function (t, e, i) {
                                                        e !== i && (e === F ? M() : i === F && M(!0))
                                                }),
                                                h(l + "." + F, function () {
                                                        M()
                                                })
                                },
                                getIframe: function (t, e) {
                                        var i = t.src,
                                                o = m.st.iframe;
                                        d.each(o.patterns, function () {
                                                return -1 < i.indexOf(this.index) ? (this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), i = this.src.replace("%id%", i), !1) : void 0
                                        });
                                        var s = {};
                                        return o.srcAction && (s[o.srcAction] = i),
                                                m._parseMarkup(e, s, t),
                                                m.updateStatus("ready"),
                                                e
                                }
                        }
                });

                function N(t) {
                        var e = m.items.length;
                        return e - 1 < t ? t - e : t < 0 ? e + t : t
                }
                function R(t, e, i) {
                        return t.replace(/%curr%/gi, e + 1).replace(/%total%/gi, i)
                }
                d.magnificPopup.registerModule("gallery", {
                        options: {
                                enabled: !1,
                                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                                preload: [0, 2],
                                navigateByImgClick: !0,
                                arrows: !0,
                                tPrev: "Previous (Left arrow key)",
                                tNext: "Next (Right arrow key)",
                                tCounter: "%curr% of %total%"
                        },
                        proto: {
                                initGallery: function () {
                                        var n = m.st.gallery,
                                                t = ".mfp-gallery";
                                        return m.direction = !0,
                                                !(!n || !n.enabled) && (v += " mfp-gallery", h(y + t, function () {
                                                        n.navigateByImgClick && m.wrap.on("click" + t, ".mfp-img", function () {
                                                                return 1 < m.items.length ? (m.next(), !1) : void 0
                                                        }),
                                                                g.on("keydown" + t, function (t) {
                                                                        37 === t.keyCode ? m.prev() : 39 === t.keyCode && m.next()
                                                                })
                                                }), h("UpdateStatus" + t, function (t, e) {
                                                        e.text && (e.text = R(e.text, m.currItem.index, m.items.length))
                                                }), h(b + t, function (t, e, i, o) {
                                                        var s = m.items.length;
                                                        i.counter = 1 < s ? R(n.tCounter, o.index, s) : ""
                                                }), h("BuildControls" + t, function () {
                                                        if (1 < m.items.length && n.arrows && !m.arrowLeft) {
                                                                var t = n.arrowMarkup,
                                                                        e = m.arrowLeft = d(t.replace(/%title%/gi, n.tPrev).replace(/%dir%/gi, "left")).addClass(a),
                                                                        i = m.arrowRight = d(t.replace(/%title%/gi, n.tNext).replace(/%dir%/gi, "right")).addClass(a);
                                                                e.click(function () {
                                                                        m.prev()
                                                                }),
                                                                        i.click(function () {
                                                                                m.next()
                                                                        }),
                                                                        m.container.append(e.add(i))
                                                        }
                                                }), h("Change" + t, function () {
                                                        m._preloadTimeout && clearTimeout(m._preloadTimeout),
                                                                m._preloadTimeout = setTimeout(function () {
                                                                        m.preloadNearbyImages(),
                                                                                m._preloadTimeout = null
                                                                }, 16)
                                                }), void h(l + t, function () {
                                                        g.off(t),
                                                                m.wrap.off("click" + t),
                                                                m.arrowRight = m.arrowLeft = null
                                                }))
                                },
                                next: function () {
                                        m.direction = !0,
                                                m.index = N(m.index + 1),
                                                m.updateItemHTML()
                                },
                                prev: function () {
                                        m.direction = !1,
                                                m.index = N(m.index - 1),
                                                m.updateItemHTML()
                                },
                                goTo: function (t) {
                                        m.direction = t >= m.index,
                                                m.index = t,
                                                m.updateItemHTML()
                                },
                                preloadNearbyImages: function () {
                                        var t, e = m.st.gallery.preload,
                                                i = Math.min(e[0], m.items.length),
                                                o = Math.min(e[1], m.items.length);
                                        for (t = 1; t <= (m.direction ? o : i); t++) m._preloadItem(m.index + t);
                                        for (t = 1; t <= (m.direction ? i : o); t++) m._preloadItem(m.index - t)
                                },
                                _preloadItem: function (t) {
                                        if (t = N(t), !m.items[t].preloaded) {
                                                var e = m.items[t];
                                                e.parsed || (e = m.parseEl(t)),
                                                        u("LazyLoad", e),
                                                        "image" === e.type && (e.img = d('<img class="mfp-img" />').on("load.mfploader", function () {
                                                                e.hasSize = !0
                                                        }).on("error.mfploader", function () {
                                                                e.hasSize = !0,
                                                                        e.loadError = !0,
                                                                        u("LazyLoadError", e)
                                                        }).attr("src", e.src)),
                                                        e.preloaded = !0
                                        }
                                }
                        }
                });
                var B = "retina";
                d.magnificPopup.registerModule(B, {
                        options: {
                                replaceSrc: function (t) {
                                        return t.src.replace(/\.\w+$/, function (t) {
                                                return "@2x" + t
                                        })
                                },
                                ratio: 1
                        },
                        proto: {
                                initRetina: function () {
                                        if (1 < window.devicePixelRatio) {
                                                var i = m.st.retina,
                                                        o = i.ratio;
                                                1 < (o = isNaN(o) ? o() : o) && (h("ImageHasSize." + B, function (t, e) {
                                                        e.img.css({
                                                                "max-width": e.img[0].naturalWidth / o,
                                                                width: "100%"
                                                        })
                                                }), h("ElementParse." + B, function (t, e) {
                                                        e.src = i.replaceSrc(e, o)
                                                }))
                                        }
                                }
                        }
                }),
                        n()
        }),


        function (l, h, m, g) {
                "use strict";
                if (l.console = l.console || {
                        info: function (t) { }
                }, m) if (m.fn.fancybox) console.info("fancyBox already initialized");
                        else {
                                var t, e, i, o, s = {
                                        closeExisting: !1,
                                        loop: !1,
                                        gutter: 50,
                                        keyboard: !0,
                                        preventCaptionOverlap: !0,
                                        arrows: !0,
                                        infobar: !0,
                                        smallBtn: "auto",
                                        toolbar: "auto",
                                        buttons: ["zoom", "slideShow", "thumbs", "close"],
                                        idleTime: 3,
                                        protect: !1,
                                        modal: !1,
                                        image: {
                                                preload: !1
                                        },
                                        ajax: {
                                                settings: {
                                                        data: {
                                                                fancybox: !0
                                                        }
                                                }
                                        },
                                        iframe: {
                                                tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
                                                preload: !0,
                                                css: {},
                                                attr: {
                                                        scrolling: "auto"
                                                }
                                        },
                                        video: {
                                                tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
                                                format: "",
                                                autoStart: !0
                                        },
                                        defaultType: "image",
                                        animationEffect: "zoom",
                                        animationDuration: 366,
                                        zoomOpacity: "auto",
                                        transitionEffect: "fade",
                                        transitionDuration: 366,
                                        slideClass: "",
                                        baseClass: "",
                                        baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
                                        spinnerTpl: '<div class="fancybox-loading"></div>',
                                        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
                                        btnTpl: {
                                                download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                                                zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                                                close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                                                arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                                                arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                                                smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>'
                                        },
                                        parentEl: "body",
                                        hideScrollbar: !0,
                                        autoFocus: !0,
                                        backFocus: !0,
                                        trapFocus: !0,
                                        fullScreen: {
                                                autoStart: !1
                                        },
                                        touch: {
                                                vertical: !0,
                                                momentum: !0
                                        },
                                        hash: null,
                                        media: {},
                                        slideShow: {
                                                autoStart: !1,
                                                speed: 3e3
                                        },
                                        thumbs: {
                                                autoStart: !1,
                                                hideOnClose: !0,
                                                parentEl: ".fancybox-container",
                                                axis: "y"
                                        },
                                        wheel: "auto",
                                        onInit: m.noop,
                                        beforeLoad: m.noop,
                                        afterLoad: m.noop,
                                        beforeShow: m.noop,
                                        afterShow: m.noop,
                                        beforeClose: m.noop,
                                        afterClose: m.noop,
                                        onActivate: m.noop,
                                        onDeactivate: m.noop,
                                        clickContent: function (t, e) {
                                                return "image" === t.type && "zoom"
                                        },
                                        clickSlide: "close",
                                        clickOutside: "close",
                                        dblclickContent: !1,
                                        dblclickSlide: !1,
                                        dblclickOutside: !1,
                                        mobile: {
                                                preventCaptionOverlap: !1,
                                                idleTime: !1,
                                                clickContent: function (t, e) {
                                                        return "image" === t.type && "toggleControls"
                                                },
                                                clickSlide: function (t, e) {
                                                        return "image" === t.type ? "toggleControls" : "close"
                                                },
                                                dblclickContent: function (t, e) {
                                                        return "image" === t.type && "zoom"
                                                },
                                                dblclickSlide: function (t, e) {
                                                        return "image" === t.type && "zoom"
                                                }
                                        },
                                        lang: "en",
                                        i18n: {
                                                en: {
                                                        CLOSE: "Close",
                                                        NEXT: "Next",
                                                        PREV: "Previous",
                                                        ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                                                        PLAY_START: "Start slideshow",
                                                        PLAY_STOP: "Pause slideshow",
                                                        FULL_SCREEN: "Full screen",
                                                        THUMBS: "Thumbnails",
                                                        DOWNLOAD: "Download",
                                                        SHARE: "Share",
                                                        ZOOM: "Zoom"
                                                },
                                                de: {
                                                        CLOSE: "Schlie&szlig;en",
                                                        NEXT: "Weiter",
                                                        PREV: "Zur&uuml;ck",
                                                        ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
                                                        PLAY_START: "Diaschau starten",
                                                        PLAY_STOP: "Diaschau beenden",
                                                        FULL_SCREEN: "Vollbild",
                                                        THUMBS: "Vorschaubilder",
                                                        DOWNLOAD: "Herunterladen",
                                                        SHARE: "Teilen",
                                                        ZOOM: "Vergr&ouml;&szlig;ern"
                                                }
                                        }
                                },
                                        n = m(l),
                                        a = m(h),
                                        r = 0,
                                        p = l.requestAnimationFrame || l.webkitRequestAnimationFrame || l.mozRequestAnimationFrame || l.oRequestAnimationFrame ||
                                                function (t) {
                                                        return l.setTimeout(t, 1e3 / 60)
                                                },
                                        c = l.cancelAnimationFrame || l.webkitCancelAnimationFrame || l.mozCancelAnimationFrame || l.oCancelAnimationFrame ||
                                                function (t) {
                                                        l.clearTimeout(t)
                                                },
                                        d = function () {
                                                var t, e = h.createElement("fakeelement"),
                                                        i = {
                                                                transition: "transitionend",
                                                                OTransition: "oTransitionEnd",
                                                                MozTransition: "transitionend",
                                                                WebkitTransition: "webkitTransitionEnd"
                                                        };
                                                for (t in i) if (e.style[t] !== g) return i[t];
                                                return "transitionend"
                                        }(),
                                        u = function (t) {
                                                return t && t.length && t[0].offsetHeight
                                        },
                                        f = function (t, e) {
                                                var i = m.extend(!0, {}, t, e);
                                                return m.each(e, function (t, e) {
                                                        m.isArray(e) && (i[t] = e)
                                                }),
                                                        i
                                        },
                                        v = function (t, e, i) {
                                                var o = this;
                                                o.opts = f({
                                                        index: i
                                                }, m.fancybox.defaults),
                                                        m.isPlainObject(e) && (o.opts = f(o.opts, e)),
                                                        m.fancybox.isMobile && (o.opts = f(o.opts, o.opts.mobile)),
                                                        o.id = o.opts.id || ++r,
                                                        o.currIndex = parseInt(o.opts.index, 10) || 0,
                                                        o.prevIndex = null,
                                                        o.prevPos = null,
                                                        o.currPos = 0,
                                                        o.firstRun = !0,
                                                        o.group = [],
                                                        o.slides = {},
                                                        o.addContent(t),
                                                        o.group.length && o.init()
                                        };
                                m.extend(v.prototype, {
                                        init: function () {
                                                var e, i, o = this,
                                                        s = o.group[o.currIndex].opts;
                                                s.closeExisting && m.fancybox.close(!0),
                                                        m("body").addClass("fancybox-active"),
                                                        !m.fancybox.getInstance() && !1 !== s.hideScrollbar && !m.fancybox.isMobile && h.body.scrollHeight > l.innerHeight && (m("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' + (l.innerWidth - h.documentElement.clientWidth) + "px;}</style>"), m("body").addClass("compensate-for-scrollbar")),
                                                        i = "",
                                                        m.each(s.buttons, function (t, e) {
                                                                i += s.btnTpl[e] || ""
                                                        }),
                                                        e = m(o.translate(o, s.baseTpl.replace("{{buttons}}", i).replace("{{arrows}}", s.btnTpl.arrowLeft + s.btnTpl.arrowRight))).attr("id", "fancybox-container-" + o.id).addClass(s.baseClass).data("FancyBox", o).appendTo(s.parentEl),
                                                        o.$refs = {
                                                                container: e
                                                        },
                                                        ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(function (t) {
                                                                o.$refs[t] = e.find(".fancybox-" + t)
                                                        }),
                                                        o.trigger("onInit"),
                                                        o.activate(),
                                                        o.jumpTo(o.currIndex)
                                        },
                                        translate: function (t, e) {
                                                var i = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
                                                return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
                                                        return i[e] === g ? t : i[e]
                                                })
                                        },
                                        addContent: function (t) {
                                                var e, c = this,
                                                        i = m.makeArray(t);
                                                m.each(i, function (t, e) {
                                                        var i, o, s, n, a, r = {},
                                                                l = {};
                                                        m.isPlainObject(e) ? l = (r = e).opts || e : "object" === m.type(e) && m(e).length ? (l = (i = m(e)).data() || {}, (l = m.extend(!0, {}, l, l.options)).$orig = i, r.src = c.opts.src || l.src || i.attr("href"), r.type || r.src || (r.type = "inline", r.src = e)) : r = {
                                                                type: "html",
                                                                src: e + ""
                                                        },
                                                                r.opts = m.extend(!0, {}, c.opts, l),
                                                                m.isArray(l.buttons) && (r.opts.buttons = l.buttons),
                                                                m.fancybox.isMobile && r.opts.mobile && (r.opts = f(r.opts, r.opts.mobile)),
                                                                o = r.type || r.opts.type,
                                                                n = r.src || "",
                                                                !o && n && ((s = n.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (o = "video", r.opts.video.format || (r.opts.video.format = "video/" + ("ogv" === s[1] ? "ogg" : s[1]))) : n.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? o = "image" : n.match(/\.(pdf)((\?|#).*)?$/i) ? (o = "iframe", r = m.extend(!0, r, {
                                                                        contentType: "pdf",
                                                                        opts: {
                                                                                iframe: {
                                                                                        preload: !1
                                                                                }
                                                                        }
                                                                })) : "#" === n.charAt(0) && (o = "inline")),
                                                                o ? r.type = o : c.trigger("objectNeedsType", r),
                                                                r.contentType || (r.contentType = -1 < m.inArray(r.type, ["html", "inline", "ajax"]) ? "html" : r.type),
                                                                r.index = c.group.length,
                                                                "auto" == r.opts.smallBtn && (r.opts.smallBtn = -1 < m.inArray(r.type, ["html", "inline", "ajax"])),
                                                                "auto" === r.opts.toolbar && (r.opts.toolbar = !r.opts.smallBtn),
                                                                r.$thumb = r.opts.$thumb || null,
                                                                r.opts.$trigger && r.index === c.opts.index && (r.$thumb = r.opts.$trigger.find("img:first"), r.$thumb.length && (r.opts.$orig = r.opts.$trigger)),
                                                                r.$thumb && r.$thumb.length || !r.opts.$orig || (r.$thumb = r.opts.$orig.find("img:first")),
                                                                r.$thumb && !r.$thumb.length && (r.$thumb = null),
                                                                r.thumb = r.opts.thumb || (r.$thumb ? r.$thumb[0].src : null),
                                                                "function" === m.type(r.opts.caption) && (r.opts.caption = r.opts.caption.apply(e, [c, r])),
                                                                "function" === m.type(c.opts.caption) && (r.opts.caption = c.opts.caption.apply(e, [c, r])),
                                                                r.opts.caption instanceof m || (r.opts.caption = r.opts.caption === g ? "" : r.opts.caption + ""),
                                                                "ajax" === r.type && 1 < (a = n.split(/\s+/, 2)).length && (r.src = a.shift(), r.opts.filter = a.shift()),
                                                                r.opts.modal && (r.opts = m.extend(!0, r.opts, {
                                                                        trapFocus: !0,
                                                                        infobar: 0,
                                                                        toolbar: 0,
                                                                        smallBtn: 0,
                                                                        keyboard: 0,
                                                                        slideShow: 0,
                                                                        fullScreen: 0,
                                                                        thumbs: 0,
                                                                        touch: 0,
                                                                        clickContent: !1,
                                                                        clickSlide: !1,
                                                                        clickOutside: !1,
                                                                        dblclickContent: !1,
                                                                        dblclickSlide: !1,
                                                                        dblclickOutside: !1
                                                                })),
                                                                c.group.push(r)
                                                }),
                                                        Object.keys(c.slides).length && (c.updateControls(), (e = c.Thumbs) && e.isActive && (e.create(), e.focus()))
                                        },
                                        addEvents: function () {
                                                var o = this;
                                                o.removeEvents(),
                                                        o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function (t) {
                                                                t.stopPropagation(),
                                                                        t.preventDefault(),
                                                                        o.close(t)
                                                        }).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function (t) {
                                                                t.stopPropagation(),
                                                                        t.preventDefault(),
                                                                        o.previous()
                                                        }).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function (t) {
                                                                t.stopPropagation(),
                                                                        t.preventDefault(),
                                                                        o.next()
                                                        }).on("click.fb", "[data-fancybox-zoom]", function (t) {
                                                                o[o.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
                                                        }),
                                                        n.on("orientationchange.fb resize.fb", function (t) {
                                                                t && t.originalEvent && "resize" === t.originalEvent.type ? (o.requestId && c(o.requestId), o.requestId = p(function () {
                                                                        o.update(t)
                                                                })) : (o.current && "iframe" === o.current.type && o.$refs.stage.hide(), setTimeout(function () {
                                                                        o.$refs.stage.show(),
                                                                                o.update(t)
                                                                }, m.fancybox.isMobile ? 600 : 250))
                                                        }),
                                                        a.on("keydown.fb", function (t) {
                                                                var e = (m.fancybox ? m.fancybox.getInstance() : null).current,
                                                                        i = t.keyCode || t.which;
                                                                if (9 != i) {
                                                                        if (!(!e.opts.keyboard || t.ctrlKey || t.altKey || t.shiftKey || m(t.target).is("input,textarea,video,audio,select"))) return 8 === i || 27 === i ? (t.preventDefault(), void o.close(t)) : 37 === i || 38 === i ? (t.preventDefault(), void o.previous()) : 39 === i || 40 === i ? (t.preventDefault(), void o.next()) : void o.trigger("afterKeydown", t, i)
                                                                } else e.opts.trapFocus && o.focus(t)
                                                        }),
                                                        o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, a.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function (t) {
                                                                o.idleSecondsCounter = 0,
                                                                        o.isIdle && o.showControls(),
                                                                        o.isIdle = !1
                                                        }), o.idleInterval = l.setInterval(function () {
                                                                o.idleSecondsCounter++,
                                                                        o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && !o.isDragging && (o.isIdle = !0, o.idleSecondsCounter = 0, o.hideControls())
                                                        }, 1e3))
                                        },
                                        removeEvents: function () {
                                                n.off("orientationchange.fb resize.fb"),
                                                        a.off("keydown.fb .fb-idle"),
                                                        this.$refs.container.off(".fb-close .fb-prev .fb-next"),
                                                        this.idleInterval && (l.clearInterval(this.idleInterval), this.idleInterval = null)
                                        },
                                        previous: function (t) {
                                                return this.jumpTo(this.currPos - 1, t)
                                        },
                                        next: function (t) {
                                                return this.jumpTo(this.currPos + 1, t)
                                        },
                                        jumpTo: function (t, o) {
                                                var e, i, s, n, a, r, l, c, d, h = this,
                                                        p = h.group.length;
                                                if (!(h.isDragging || h.isClosing || h.isAnimating && h.firstRun)) {
                                                        if (t = parseInt(t, 10), !(s = h.current ? h.current.opts.loop : h.opts.loop) && (t < 0 || p <= t)) return !1;
                                                        if (e = h.firstRun = !Object.keys(h.slides).length, a = h.current, h.prevIndex = h.currIndex, h.prevPos = h.currPos, n = h.createSlide(t), 1 < p && ((s || n.index < p - 1) && h.createSlide(t + 1), (s || 0 < n.index) && h.createSlide(t - 1)), h.current = n, h.currIndex = n.index, h.currPos = n.pos, h.trigger("beforeShow", e), h.updateControls(), n.forcedDuration = g, m.isNumeric(o) ? n.forcedDuration = o : o = n.opts[e ? "animationDuration" : "transitionDuration"], o = parseInt(o, 10), i = h.isMoved(n), n.$slide.addClass("fancybox-slide--current"), e) return n.opts.animationEffect && o && h.$refs.container.css("transition-duration", o + "ms"),
                                                                h.$refs.container.addClass("fancybox-is-open").trigger("focus"),
                                                                h.loadSlide(n),
                                                                void h.preload("image");
                                                        r = m.fancybox.getTranslate(a.$slide),
                                                                l = m.fancybox.getTranslate(h.$refs.stage),
                                                                m.each(h.slides, function (t, e) {
                                                                        m.fancybox.stop(e.$slide, !0)
                                                                }),
                                                                a.pos !== n.pos && (a.isComplete = !1),
                                                                a.$slide.removeClass("fancybox-slide--complete fancybox-slide--current"),
                                                                i ? (d = r.left - (a.pos * r.width + a.pos * a.opts.gutter), m.each(h.slides, function (t, e) {
                                                                        e.$slide.removeClass("fancybox-animated").removeClass(function (t, e) {
                                                                                return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                                                                        });
                                                                        var i = e.pos * r.width + e.pos * e.opts.gutter;
                                                                        m.fancybox.setTranslate(e.$slide, {
                                                                                top: 0,
                                                                                left: i - l.left + d
                                                                        }),
                                                                                e.pos !== n.pos && e.$slide.addClass("fancybox-slide--" + (e.pos > n.pos ? "next" : "previous")),
                                                                                u(e.$slide),
                                                                                m.fancybox.animate(e.$slide, {
                                                                                        top: 0,
                                                                                        left: (e.pos - n.pos) * r.width + (e.pos - n.pos) * e.opts.gutter
                                                                                }, o, function () {
                                                                                        e.$slide.css({
                                                                                                transform: "",
                                                                                                opacity: ""
                                                                                        }).removeClass("fancybox-slide--next fancybox-slide--previous"),
                                                                                                e.pos === h.currPos && h.complete()
                                                                                })
                                                                })) : o && n.opts.transitionEffect && (c = "fancybox-animated fancybox-fx-" + n.opts.transitionEffect, a.$slide.addClass("fancybox-slide--" + (a.pos > n.pos ? "next" : "previous")), m.fancybox.animate(a.$slide, c, o, function () {
                                                                        a.$slide.removeClass(c).removeClass("fancybox-slide--next fancybox-slide--previous")
                                                                }, !1)),
                                                                n.isLoaded ? h.revealContent(n) : h.loadSlide(n),
                                                                h.preload("image")
                                                }
                                        },
                                        createSlide: function (t) {
                                                var e, i, o = this;
                                                return i = (i = t % o.group.length) < 0 ? o.group.length + i : i,
                                                        !o.slides[t] && o.group[i] && (e = m('<div class="fancybox-slide"></div>').appendTo(o.$refs.stage), o.slides[t] = m.extend(!0, {}, o.group[i], {
                                                                pos: t,
                                                                $slide: e,
                                                                isLoaded: !1
                                                        }), o.updateSlide(o.slides[t])),
                                                        o.slides[t]
                                        },
                                        scaleToActual: function (t, e, i) {
                                                var o, s, n, a, r, l = this,
                                                        c = l.current,
                                                        d = c.$content,
                                                        h = m.fancybox.getTranslate(c.$slide).width,
                                                        p = m.fancybox.getTranslate(c.$slide).height,
                                                        u = c.width,
                                                        f = c.height;
                                                l.isAnimating || l.isMoved() || !d || "image" != c.type || !c.isLoaded || c.hasError || (l.isAnimating = !0, m.fancybox.stop(d), t = t === g ? .5 * h : t, e = e === g ? .5 * p : e, (o = m.fancybox.getTranslate(d)).top -= m.fancybox.getTranslate(c.$slide).top, o.left -= m.fancybox.getTranslate(c.$slide).left, a = u / o.width, r = f / o.height, s = .5 * h - .5 * u, n = .5 * p - .5 * f, h < u && (0 < (s = o.left * a - (t * a - t)) && (s = 0), s < h - u && (s = h - u)), p < f && (0 < (n = o.top * r - (e * r - e)) && (n = 0), n < p - f && (n = p - f)), l.updateCursor(u, f), m.fancybox.animate(d, {
                                                        top: n,
                                                        left: s,
                                                        scaleX: a,
                                                        scaleY: r
                                                }, i || 366, function () {
                                                        l.isAnimating = !1
                                                }), l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop())
                                        },
                                        scaleToFit: function (t) {
                                                var e, i = this,
                                                        o = i.current,
                                                        s = o.$content;
                                                i.isAnimating || i.isMoved() || !s || "image" != o.type || !o.isLoaded || o.hasError || (i.isAnimating = !0, m.fancybox.stop(s), e = i.getFitPos(o), i.updateCursor(e.width, e.height), m.fancybox.animate(s, {
                                                        top: e.top,
                                                        left: e.left,
                                                        scaleX: e.width / s.width(),
                                                        scaleY: e.height / s.height()
                                                }, t || 366, function () {
                                                        i.isAnimating = !1
                                                }))
                                        },
                                        getFitPos: function (t) {
                                                var e, i, o, s, n = t.$content,
                                                        a = t.$slide,
                                                        r = t.width || t.opts.width,
                                                        l = t.height || t.opts.height,
                                                        c = {};
                                                return !!(t.isLoaded && n && n.length) && (e = m.fancybox.getTranslate(this.$refs.stage).width, i = m.fancybox.getTranslate(this.$refs.stage).height, e -= parseFloat(a.css("paddingLeft")) + parseFloat(a.css("paddingRight")) + parseFloat(n.css("marginLeft")) + parseFloat(n.css("marginRight")), i -= parseFloat(a.css("paddingTop")) + parseFloat(a.css("paddingBottom")) + parseFloat(n.css("marginTop")) + parseFloat(n.css("marginBottom")), r && l || (r = e, l = i), e - .5 < (r *= o = Math.min(1, e / r, i / l)) && (r = e), i - .5 < (l *= o) && (l = i), "image" === t.type ? (c.top = Math.floor(.5 * (i - l)) + parseFloat(a.css("paddingTop")), c.left = Math.floor(.5 * (e - r)) + parseFloat(a.css("paddingLeft"))) : "video" === t.contentType && (r / (s = t.opts.width && t.opts.height ? r / l : t.opts.ratio || 16 / 9) < l ? l = r / s : l * s < r && (r = l * s)), c.width = r, c.height = l, c)
                                        },
                                        update: function (i) {
                                                var o = this;
                                                m.each(o.slides, function (t, e) {
                                                        o.updateSlide(e, i)
                                                })
                                        },
                                        updateSlide: function (t, e) {
                                                var i = this,
                                                        o = t && t.$content,
                                                        s = t.width || t.opts.width,
                                                        n = t.height || t.opts.height,
                                                        a = t.$slide;
                                                i.adjustCaption(t),
                                                        o && (s || n || "video" === t.contentType) && !t.hasError && (m.fancybox.stop(o), m.fancybox.setTranslate(o, i.getFitPos(t)), t.pos === i.currPos && (i.isAnimating = !1, i.updateCursor())),
                                                        i.adjustLayout(t),
                                                        a.length && (a.trigger("refresh"), t.pos === i.currPos && i.$refs.toolbar.add(i.$refs.navigation.find(".fancybox-button--arrow_right")).toggleClass("compensate-for-scrollbar", a.get(0).scrollHeight > a.get(0).clientHeight)),
                                                        i.trigger("onUpdate", t, e)
                                        },
                                        centerSlide: function (t) {
                                                var e = this,
                                                        i = e.current,
                                                        o = i.$slide;
                                                !e.isClosing && i && (o.siblings().css({
                                                        transform: "",
                                                        opacity: ""
                                                }), o.parent().children().removeClass("fancybox-slide--previous fancybox-slide--next"), m.fancybox.animate(o, {
                                                        top: 0,
                                                        left: 0,
                                                        opacity: 1
                                                }, t === g ? 0 : t, function () {
                                                        o.css({
                                                                transform: "",
                                                                opacity: ""
                                                        }),
                                                                i.isComplete || e.complete()
                                                }, !1))
                                        },
                                        isMoved: function (t) {
                                                var e, i, o = t || this.current;
                                                return !!o && (i = m.fancybox.getTranslate(this.$refs.stage), e = m.fancybox.getTranslate(o.$slide), !o.$slide.hasClass("fancybox-animated") && (.5 < Math.abs(e.top - i.top) || .5 < Math.abs(e.left - i.left)))
                                        },
                                        updateCursor: function (t, e) {
                                                var i, o, s = this,
                                                        n = s.current,
                                                        a = s.$refs.container;
                                                n && !s.isClosing && s.Guestures && (a.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"), o = !!(i = s.canPan(t, e)) || s.isZoomable(), a.toggleClass("fancybox-is-zoomable", o), m("[data-fancybox-zoom]").prop("disabled", !o), i ? a.addClass("fancybox-can-pan") : o && ("zoom" === n.opts.clickContent || m.isFunction(n.opts.clickContent) && "zoom" == n.opts.clickContent(n)) ? a.addClass("fancybox-can-zoomIn") : n.opts.touch && (n.opts.touch.vertical || 1 < s.group.length) && "video" !== n.contentType && a.addClass("fancybox-can-swipe"))
                                        },
                                        isZoomable: function () {
                                                var t, e = this.current;
                                                if (e && !this.isClosing && "image" === e.type && !e.hasError) {
                                                        if (!e.isLoaded) return !0;
                                                        if ((t = this.getFitPos(e)) && (e.width > t.width || e.height > t.height)) return !0
                                                }
                                                return !1
                                        },
                                        isScaledDown: function (t, e) {
                                                var i = !1,
                                                        o = this.current,
                                                        s = o.$content;
                                                return t !== g && e !== g ? i = t < o.width && e < o.height : s && (i = (i = m.fancybox.getTranslate(s)).width < o.width && i.height < o.height),
                                                        i
                                        },
                                        canPan: function (t, e) {
                                                var i = this.current,
                                                        o = null,
                                                        s = !1;
                                                return "image" === i.type && (i.isComplete || t && e) && !i.hasError && (s = this.getFitPos(i), t !== g && e !== g ? o = {
                                                        width: t,
                                                        height: e
                                                } : i.isComplete && (o = m.fancybox.getTranslate(i.$content)), o && s && (s = 1.5 < Math.abs(o.width - s.width) || 1.5 < Math.abs(o.height - s.height))),
                                                        s
                                        },
                                        loadSlide: function (i) {
                                                var t, e, o, s = this;
                                                if (!i.isLoading && !i.isLoaded) {
                                                        if (!(i.isLoading = !0) === s.trigger("beforeLoad", i)) return i.isLoading = !1;
                                                        switch (t = i.type, (e = i.$slide).off("refresh").trigger("onReset").addClass(i.opts.slideClass), t) {
                                                                case "image":
                                                                        s.setImage(i);
                                                                        break;
                                                                case "iframe":
                                                                        s.setIframe(i);
                                                                        break;
                                                                case "html":
                                                                        s.setContent(i, i.src || i.content);
                                                                        break;
                                                                case "video":
                                                                        s.setContent(i, i.opts.video.tpl.replace(/\{\{src\}\}/gi, i.src).replace("{{format}}", i.opts.videoFormat || i.opts.video.format || "").replace("{{poster}}", i.thumb || ""));
                                                                        break;
                                                                case "inline":
                                                                        m(i.src).length ? s.setContent(i, m(i.src)) : s.setError(i);
                                                                        break;
                                                                case "ajax":
                                                                        s.showLoading(i),
                                                                                o = m.ajax(m.extend({}, i.opts.ajax.settings, {
                                                                                        url: i.src,
                                                                                        success: function (t, e) {
                                                                                                "success" === e && s.setContent(i, t)
                                                                                        },
                                                                                        error: function (t, e) {
                                                                                                t && "abort" !== e && s.setError(i)
                                                                                        }
                                                                                })),
                                                                                e.one("onReset", function () {
                                                                                        o.abort()
                                                                                });
                                                                        break;
                                                                default:
                                                                        s.setError(i)
                                                        }
                                                        return !0
                                                }
                                        },
                                        setImage: function (e) {
                                                var t, i = this;
                                                setTimeout(function () {
                                                        var t = e.$image;
                                                        i.isClosing || !e.isLoading || t && t.length && t[0].complete || e.hasError || i.showLoading(e)
                                                }, 50),
                                                        i.checkSrcset(e),
                                                        e.$content = m('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide.addClass("fancybox-slide--image")),
                                                        !1 !== e.opts.preload && e.opts.width && e.opts.height && e.thumb && (e.width = e.opts.width, e.height = e.opts.height, (t = h.createElement("img")).onerror = function () {
                                                                m(this).remove(),
                                                                        e.$ghost = null
                                                        }, t.onload = function () {
                                                                i.afterLoad(e)
                                                        }, e.$ghost = m(t).addClass("fancybox-image").appendTo(e.$content).attr("src", e.thumb)),
                                                        i.setBigImage(e)
                                        },
                                        checkSrcset: function (t) {
                                                var e, i, o, s, n = t.opts.srcset || t.opts.image.srcset;
                                                if (n) {
                                                        o = l.devicePixelRatio || 1,
                                                                s = l.innerWidth * o,
                                                                (i = n.split(",").map(function (t) {
                                                                        var o = {};
                                                                        return t.trim().split(/\s+/).forEach(function (t, e) {
                                                                                var i = parseInt(t.substring(0, t.length - 1), 10);
                                                                                if (0 === e) return o.url = t;
                                                                                i && (o.value = i, o.postfix = t[t.length - 1])
                                                                        }),
                                                                                o
                                                                })).sort(function (t, e) {
                                                                        return t.value - e.value
                                                                });
                                                        for (var a = 0; a < i.length; a++) {
                                                                var r = i[a];
                                                                if ("w" === r.postfix && r.value >= s || "x" === r.postfix && r.value >= o) {
                                                                        e = r;
                                                                        break
                                                                }
                                                        } !e && i.length && (e = i[i.length - 1]),
                                                                e && (t.src = e.url, t.width && t.height && "w" == e.postfix && (t.height = t.width / t.height * e.value, t.width = e.value), t.opts.srcset = n)
                                                }
                                        },
                                        setBigImage: function (e) {
                                                var i = this,
                                                        t = h.createElement("img"),
                                                        o = m(t);
                                                e.$image = o.one("error", function () {
                                                        i.setError(e)
                                                }).one("load", function () {
                                                        var t;
                                                        e.$ghost || (i.resolveImageSlideSize(e, this.naturalWidth, this.naturalHeight), i.afterLoad(e)),
                                                                i.isClosing || (e.opts.srcset && ((t = e.opts.sizes) && "auto" !== t || (t = (1 < e.width / e.height && 1 < n.width() / n.height() ? "100" : Math.round(e.width / e.height * 100)) + "vw"), o.attr("sizes", t).attr("srcset", e.opts.srcset)), e.$ghost && setTimeout(function () {
                                                                        e.$ghost && !i.isClosing && e.$ghost.hide()
                                                                }, Math.min(300, Math.max(1e3, e.height / 1600))), i.hideLoading(e))
                                                }).addClass("fancybox-image").attr("src", e.src).appendTo(e.$content),
                                                        (t.complete || "complete" == t.readyState) && o.naturalWidth && o.naturalHeight ? o.trigger("load") : t.error && o.trigger("error")
                                        },
                                        resolveImageSlideSize: function (t, e, i) {
                                                var o = parseInt(t.opts.width, 10),
                                                        s = parseInt(t.opts.height, 10);
                                                t.width = e,
                                                        t.height = i,
                                                        0 < o && (t.width = o, t.height = Math.floor(o * i / e)),
                                                        0 < s && (t.width = Math.floor(s * e / i), t.height = s)
                                        },
                                        setIframe: function (s) {
                                                var n, e = this,
                                                        a = s.opts.iframe,
                                                        r = s.$slide;
                                                s.$content = m('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") + '"></div>').css(a.css).appendTo(r),
                                                        r.addClass("fancybox-slide--" + s.contentType),
                                                        s.$iframe = n = m(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr).appendTo(s.$content),
                                                        a.preload ? (e.showLoading(s), n.on("load.fb error.fb", function (t) {
                                                                this.isReady = 1,
                                                                        s.$slide.trigger("refresh"),
                                                                        e.afterLoad(s)
                                                        }), r.on("refresh.fb", function () {
                                                                var t, e = s.$content,
                                                                        i = a.css.width,
                                                                        o = a.css.height;
                                                                if (1 === n[0].isReady) {
                                                                        try {
                                                                                t = n.contents().find("body")
                                                                        } catch (t) { }
                                                                        t && t.length && t.children().length && (r.css("overflow", "visible"), e.css({
                                                                                width: "100%",
                                                                                "max-width": "100%",
                                                                                height: "9999px"
                                                                        }), i === g && (i = Math.ceil(Math.max(t[0].clientWidth, t.outerWidth(!0)))), e.css("width", i || "").css("max-width", ""), o === g && (o = Math.ceil(Math.max(t[0].clientHeight, t.outerHeight(!0)))), e.css("height", o || ""), r.css("overflow", "auto")),
                                                                                e.removeClass("fancybox-is-hidden")
                                                                }
                                                        })) : e.afterLoad(s),
                                                        n.attr("src", s.src),
                                                        r.one("onReset", function () {
                                                                try {
                                                                        m(this).find("iframe").hide().unbind().attr("src", "//about:blank")
                                                                } catch (t) { }
                                                                m(this).off("refresh.fb").empty(),
                                                                        s.isLoaded = !1,
                                                                        s.isRevealed = !1
                                                        })
                                        },
                                        setContent: function (t, e) {
                                                var i;
                                                this.isClosing || (this.hideLoading(t), t.$content && m.fancybox.stop(t.$content), t.$slide.empty(), (i = e) && i.hasOwnProperty && i instanceof m && e.parent().length ? ((e.hasClass("fancybox-content") || e.parent().hasClass("fancybox-content")) && e.parents(".fancybox-slide").trigger("onReset"), t.$placeholder = m("<div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === m.type(e) && (e = m("<div>").append(m.trim(e)).contents()), t.opts.filter && (e = m("<div>").html(e).find(t.opts.filter))), t.$slide.one("onReset", function () {
                                                        m(this).find("video,audio").trigger("pause"),
                                                                t.$placeholder && (t.$placeholder.after(e.removeClass("fancybox-content").hide()).remove(), t.$placeholder = null),
                                                                t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null),
                                                                t.hasError || (m(this).empty(), t.isLoaded = !1, t.isRevealed = !1)
                                                }), m(e).appendTo(t.$slide), m(e).is("video,audio") && (m(e).addClass("fancybox-video"), m(e).wrap("<div></div>"), t.contentType = "video", t.opts.width = t.opts.width || m(e).attr("width"), t.opts.height = t.opts.height || m(e).attr("height")), t.$content = t.$slide.children().filter("div,form,main,video,audio,article,.fancybox-content").first(), t.$content.siblings().hide(), t.$content.length || (t.$content = t.$slide.wrapInner("<div></div>").children().first()), t.$content.addClass("fancybox-content"), t.$slide.addClass("fancybox-slide--" + t.contentType), this.afterLoad(t))
                                        },
                                        setError: function (t) {
                                                t.hasError = !0,
                                                        t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType).addClass("fancybox-slide--error"),
                                                        t.contentType = "html",
                                                        this.setContent(t, this.translate(t, t.opts.errorTpl)),
                                                        t.pos === this.currPos && (this.isAnimating = !1)
                                        },
                                        showLoading: function (t) {
                                                (t = t || this.current) && !t.$spinner && (t.$spinner = m(this.translate(this, this.opts.spinnerTpl)).appendTo(t.$slide).hide().fadeIn("fast"))
                                        },
                                        hideLoading: function (t) {
                                                (t = t || this.current) && t.$spinner && (t.$spinner.stop().remove(), delete t.$spinner)
                                        },
                                        afterLoad: function (t) {
                                                var e = this;
                                                e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), !t.opts.smallBtn || t.$smallBtn && t.$smallBtn.length || (t.$smallBtn = m(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function (t) {
                                                        return 2 == t.button && t.preventDefault(),
                                                                !0
                                                }), "image" === t.type && m('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), e.adjustCaption(t), e.adjustLayout(t), t.pos === e.currPos && e.updateCursor(), e.revealContent(t))
                                        },
                                        adjustCaption: function (t) {
                                                var e, i = this,
                                                        o = t || i.current,
                                                        s = o.opts.caption,
                                                        n = o.opts.preventCaptionOverlap,
                                                        a = i.$refs.caption,
                                                        r = !1;
                                                a.toggleClass("fancybox-caption--separate", n),
                                                        n && s && s.length && (o.pos !== i.currPos ? ((e = a.clone().appendTo(a.parent())).children().eq(0).empty().html(s), r = e.outerHeight(!0), e.empty().remove()) : i.$caption && (r = i.$caption.outerHeight(!0)), o.$slide.css("padding-bottom", r || ""))
                                        },
                                        adjustLayout: function (t) {
                                                var e, i, o, s, n = t || this.current;
                                                n.isLoaded && !0 !== n.opts.disableLayoutFix && (n.$content.css("margin-bottom", ""), n.$content.outerHeight() > n.$slide.height() + .5 && (o = n.$slide[0].style["padding-bottom"], s = n.$slide.css("padding-bottom"), 0 < parseFloat(s) && (e = n.$slide[0].scrollHeight, n.$slide.css("padding-bottom", 0), Math.abs(e - n.$slide[0].scrollHeight) < 1 && (i = s), n.$slide.css("padding-bottom", o))), n.$content.css("margin-bottom", i))
                                        },
                                        revealContent: function (t) {
                                                var e, i, o, s, n = this,
                                                        a = t.$slide,
                                                        r = !1,
                                                        l = !1,
                                                        c = n.isMoved(t),
                                                        d = t.isRevealed;
                                                return t.isRevealed = !0,
                                                        e = t.opts[n.firstRun ? "animationEffect" : "transitionEffect"],
                                                        o = t.opts[n.firstRun ? "animationDuration" : "transitionDuration"],
                                                        o = parseInt(t.forcedDuration === g ? o : t.forcedDuration, 10),
                                                        !c && t.pos === n.currPos && o || (e = !1),
                                                        "zoom" === e && (t.pos === n.currPos && o && "image" === t.type && !t.hasError && (l = n.getThumbPos(t)) ? r = n.getFitPos(t) : e = "fade"),
                                                        "zoom" === e ? (n.isAnimating = !0, r.scaleX = r.width / l.width, r.scaleY = r.height / l.height, "auto" == (s = t.opts.zoomOpacity) && (s = .1 < Math.abs(t.width / t.height - l.width / l.height)), s && (l.opacity = .1, r.opacity = 1), m.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), l), u(t.$content), void m.fancybox.animate(t.$content, r, o, function () {
                                                                n.isAnimating = !1,
                                                                        n.complete()
                                                        })) : (n.updateSlide(t), e ? (m.fancybox.stop(a), i = "fancybox-slide--" + (t.pos >= n.prevPos ? "next" : "previous") + " fancybox-animated fancybox-fx-" + e, a.addClass(i).removeClass("fancybox-slide--current"), t.$content.removeClass("fancybox-is-hidden"), u(a), "image" !== t.type && t.$content.hide().show(0), void m.fancybox.animate(a, "fancybox-slide--current", o, function () {
                                                                a.removeClass(i).css({
                                                                        transform: "",
                                                                        opacity: ""
                                                                }),
                                                                        t.pos === n.currPos && n.complete()
                                                        }, !0)) : (t.$content.removeClass("fancybox-is-hidden"), d || !c || "image" !== t.type || t.hasError || t.$content.hide().fadeIn("fast"), void (t.pos === n.currPos && n.complete())))
                                        },
                                        getThumbPos: function (t) {
                                                var e, i, o, s, n, a, r, l, c, d = t.$thumb;
                                                return !!(d && (r = d[0]) && r.ownerDocument === h && (m(".fancybox-container").css("pointer-events", "none"), l = {
                                                        x: r.getBoundingClientRect().left + r.offsetWidth / 2,
                                                        y: r.getBoundingClientRect().top + r.offsetHeight / 2
                                                }, c = h.elementFromPoint(l.x, l.y) === r, m(".fancybox-container").css("pointer-events", ""), c)) && (i = m.fancybox.getTranslate(d), o = parseFloat(d.css("border-top-width") || 0), s = parseFloat(d.css("border-right-width") || 0), n = parseFloat(d.css("border-bottom-width") || 0), a = parseFloat(d.css("border-left-width") || 0), e = {
                                                        top: i.top + o,
                                                        left: i.left + a,
                                                        width: i.width - s - a,
                                                        height: i.height - o - n,
                                                        scaleX: 1,
                                                        scaleY: 1
                                                }, 0 < i.width && 0 < i.height && e)
                                        },
                                        complete: function () {
                                                var t, i = this,
                                                        e = i.current,
                                                        o = {};
                                                !i.isMoved() && e.isLoaded && (e.isComplete || (e.isComplete = !0, e.$slide.siblings().trigger("onReset"), i.preload("inline"), u(e.$slide), e.$slide.addClass("fancybox-slide--complete"), m.each(i.slides, function (t, e) {
                                                        e.pos >= i.currPos - 1 && e.pos <= i.currPos + 1 ? o[e.pos] = e : e && (m.fancybox.stop(e.$slide), e.$slide.off().remove())
                                                }), i.slides = o), i.isAnimating = !1, i.updateCursor(), i.trigger("afterShow"), e.opts.video.autoStart && e.$slide.find("video,audio").filter(":visible:first").trigger("play").one("ended", function () {
                                                        Document.exitFullscreen ? Document.exitFullscreen() : this.webkitExitFullscreen && this.webkitExitFullscreen(),
                                                                i.next()
                                                }), e.opts.autoFocus && "html" === e.contentType && ((t = e.$content.find("input[autofocus]:enabled:visible:first")).length ? t.trigger("focus") : i.focus(null, !0)), e.$slide.scrollTop(0).scrollLeft(0))
                                        },
                                        preload: function (t) {
                                                var e, i, o = this;
                                                o.group.length < 2 || (i = o.slides[o.currPos + 1], (e = o.slides[o.currPos - 1]) && e.type === t && o.loadSlide(e), i && i.type === t && o.loadSlide(i))
                                        },
                                        focus: function (t, e) {
                                                var i, o, s = this,
                                                        n = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden])", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'].join(",");
                                                s.isClosing || ((i = (i = !t && s.current && s.current.isComplete ? s.current.$slide.find("*:visible" + (e ? ":not(.fancybox-close-small)" : "")) : s.$refs.container.find("*:visible")).filter(n).filter(function () {
                                                        return "hidden" !== m(this).css("visibility") && !m(this).hasClass("disabled")
                                                })).length ? (o = i.index(h.activeElement), t && t.shiftKey ? (o < 0 || 0 == o) && (t.preventDefault(), i.eq(i.length - 1).trigger("focus")) : (o < 0 || o == i.length - 1) && (t && t.preventDefault(), i.eq(0).trigger("focus"))) : s.$refs.container.trigger("focus"))
                                        },
                                        activate: function () {
                                                var e = this;
                                                m(".fancybox-container").each(function () {
                                                        var t = m(this).data("FancyBox");
                                                        t && t.id !== e.id && !t.isClosing && (t.trigger("onDeactivate"), t.removeEvents(), t.isVisible = !1)
                                                }),
                                                        e.isVisible = !0,
                                                        (e.current || e.isIdle) && (e.update(), e.updateControls()),
                                                        e.trigger("onActivate"),
                                                        e.addEvents()
                                        },
                                        close: function (t, e) {
                                                function i() {
                                                        d.cleanUp(t)
                                                }
                                                var o, s, n, a, r, l, c, d = this,
                                                        h = d.current;
                                                return !d.isClosing && (!(d.isClosing = !0) === d.trigger("beforeClose", t) ? (d.isClosing = !1, p(function () {
                                                        d.update()
                                                }), !1) : (d.removeEvents(), n = h.$content, o = h.opts.animationEffect, s = m.isNumeric(e) ? e : o ? h.opts.animationDuration : 0, h.$slide.removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), !0 !== t ? m.fancybox.stop(h.$slide) : o = !1, h.$slide.siblings().trigger("onReset").remove(), s && d.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing").css("transition-duration", s + "ms"), d.hideLoading(h), d.hideControls(!0), d.updateCursor(), "zoom" !== o || n && s && "image" === h.type && !d.isMoved() && !h.hasError && (c = d.getThumbPos(h)) || (o = "fade"), "zoom" === o ? (m.fancybox.stop(n), l = {
                                                        top: (a = m.fancybox.getTranslate(n)).top,
                                                        left: a.left,
                                                        scaleX: a.width / c.width,
                                                        scaleY: a.height / c.height,
                                                        width: c.width,
                                                        height: c.height
                                                }, "auto" == (r = h.opts.zoomOpacity) && (r = .1 < Math.abs(h.width / h.height - c.width / c.height)), r && (c.opacity = 0), m.fancybox.setTranslate(n, l), u(n), m.fancybox.animate(n, c, s, i)) : o && s ? m.fancybox.animate(h.$slide.addClass("fancybox-slide--previous").removeClass("fancybox-slide--current"), "fancybox-animated fancybox-fx-" + o, s, i) : !0 === t ? setTimeout(i, s) : i(), !0))
                                        },
                                        cleanUp: function (t) {
                                                var e, i, o, s = this,
                                                        n = s.current.opts.$orig;
                                                s.current.$slide.trigger("onReset"),
                                                        s.$refs.container.empty().remove(),
                                                        s.trigger("afterClose", t),
                                                        s.current.opts.backFocus && (n && n.length && n.is(":visible") || (n = s.$trigger), n && n.length && (i = l.scrollX, o = l.scrollY, n.trigger("focus"), m("html, body").scrollTop(o).scrollLeft(i))),
                                                        s.current = null,
                                                        (e = m.fancybox.getInstance()) ? e.activate() : (m("body").removeClass("fancybox-active compensate-for-scrollbar"), m("#fancybox-style-noscroll").remove())
                                        },
                                        trigger: function (t, e) {
                                                var i, o = Array.prototype.slice.call(arguments, 1),
                                                        s = this,
                                                        n = e && e.opts ? e : s.current;
                                                if (n ? o.unshift(n) : n = s, o.unshift(s), m.isFunction(n.opts[t]) && (i = n.opts[t].apply(n, o)), !1 === i) return i;
                                                "afterClose" !== t && s.$refs ? s.$refs.container.trigger(t + ".fb", o) : a.trigger(t + ".fb", o)
                                        },
                                        updateControls: function () {
                                                var t = this,
                                                        e = t.current,
                                                        i = e.index,
                                                        o = t.$refs.container,
                                                        s = t.$refs.caption,
                                                        n = e.opts.caption;
                                                e.$slide.trigger("refresh"),
                                                        n && n.length ? (t.$caption = s).children().eq(0).html(n) : t.$caption = null,
                                                        t.hasHiddenControls || t.isIdle || t.showControls(),
                                                        o.find("[data-fancybox-count]").html(t.group.length),
                                                        o.find("[data-fancybox-index]").html(i + 1),
                                                        o.find("[data-fancybox-prev]").prop("disabled", !e.opts.loop && i <= 0),
                                                        o.find("[data-fancybox-next]").prop("disabled", !e.opts.loop && i >= t.group.length - 1),
                                                        "image" === e.type ? o.find("[data-fancybox-zoom]").show().end().find("[data-fancybox-download]").attr("href", e.opts.image.src || e.src).show() : e.opts.toolbar && o.find("[data-fancybox-download],[data-fancybox-zoom]").hide(),
                                                        m(h.activeElement).is(":hidden,[disabled]") && t.$refs.container.trigger("focus")
                                        },
                                        hideControls: function (t) {
                                                var e = ["infobar", "toolbar", "nav"];
                                                !t && this.current.opts.preventCaptionOverlap || e.push("caption"),
                                                        this.$refs.container.removeClass(e.map(function (t) {
                                                                return "fancybox-show-" + t
                                                        }).join(" ")),
                                                        this.hasHiddenControls = !0
                                        },
                                        showControls: function () {
                                                var t = this,
                                                        e = t.current ? t.current.opts : t.opts,
                                                        i = t.$refs.container;
                                                t.hasHiddenControls = !1,
                                                        t.idleSecondsCounter = 0,
                                                        i.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && 1 < t.group.length)).toggleClass("fancybox-show-caption", !!t.$caption).toggleClass("fancybox-show-nav", !!(e.arrows && 1 < t.group.length)).toggleClass("fancybox-is-modal", !!e.modal)
                                        },
                                        toggleControls: function () {
                                                this.hasHiddenControls ? this.showControls() : this.hideControls()
                                        }
                                }),
                                        m.fancybox = {
                                                version: "3.5.7",
                                                defaults: s,
                                                getInstance: function (t) {
                                                        var e = m('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
                                                                i = Array.prototype.slice.call(arguments, 1);
                                                        return e instanceof v && ("string" === m.type(t) ? e[t].apply(e, i) : "function" === m.type(t) && t.apply(e, i), e)
                                                },
                                                open: function (t, e, i) {
                                                        return new v(t, e, i)
                                                },
                                                close: function (t) {
                                                        var e = this.getInstance();
                                                        e && (e.close(), !0 === t && this.close(t))
                                                },
                                                destroy: function () {
                                                        this.close(!0),
                                                                a.add("body").off("click.fb-start", "**")
                                                },
                                                isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
                                                use3d: (t = h.createElement("div"), l.getComputedStyle && l.getComputedStyle(t) && l.getComputedStyle(t).getPropertyValue("transform") && !(h.documentMode && h.documentMode < 11)),
                                                getTranslate: function (t) {
                                                        var e;
                                                        return !(!t || !t.length) && {
                                                                top: (e = t[0].getBoundingClientRect()).top || 0,
                                                                left: e.left || 0,
                                                                width: e.width,
                                                                height: e.height,
                                                                opacity: parseFloat(t.css("opacity"))
                                                        }
                                                },
                                                setTranslate: function (t, e) {
                                                        var i = "",
                                                                o = {};
                                                        if (t && e) return e.left === g && e.top === g || (i = (e.left === g ? t.position().left : e.left) + "px, " + (e.top === g ? t.position().top : e.top) + "px", i = this.use3d ? "translate3d(" + i + ", 0px)" : "translate(" + i + ")"),
                                                                e.scaleX !== g && e.scaleY !== g ? i += " scale(" + e.scaleX + ", " + e.scaleY + ")" : e.scaleX !== g && (i += " scaleX(" + e.scaleX + ")"),
                                                                i.length && (o.transform = i),
                                                                e.opacity !== g && (o.opacity = e.opacity),
                                                                e.width !== g && (o.width = e.width),
                                                                e.height !== g && (o.height = e.height),
                                                                t.css(o)
                                                },
                                                animate: function (e, i, o, s, n) {
                                                        var a, r = this;
                                                        m.isFunction(o) && (s = o, o = null),
                                                                r.stop(e),
                                                                a = r.getTranslate(e),
                                                                e.on(d, function (t) {
                                                                        t && t.originalEvent && (!e.is(t.originalEvent.target) || "z-index" == t.originalEvent.propertyName) || (r.stop(e), m.isNumeric(o) && e.css("transition-duration", ""), m.isPlainObject(i) ? i.scaleX !== g && i.scaleY !== g && r.setTranslate(e, {
                                                                                top: i.top,
                                                                                left: i.left,
                                                                                width: a.width * i.scaleX,
                                                                                height: a.height * i.scaleY,
                                                                                scaleX: 1,
                                                                                scaleY: 1
                                                                        }) : !0 !== n && e.removeClass(i), m.isFunction(s) && s(t))
                                                                }),
                                                                m.isNumeric(o) && e.css("transition-duration", o + "ms"),
                                                                m.isPlainObject(i) ? (i.scaleX !== g && i.scaleY !== g && (delete i.width, delete i.height, e.parent().hasClass("fancybox-slide--image") && e.parent().addClass("fancybox-is-scaling")), m.fancybox.setTranslate(e, i)) : e.addClass(i),
                                                                e.data("timer", setTimeout(function () {
                                                                        e.trigger(d)
                                                                }, o + 33))
                                                },
                                                stop: function (t, e) {
                                                        t && t.length && (clearTimeout(t.data("timer")), e && t.trigger(d), t.off(d).css("transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
                                                }
                                        },
                                        m.fn.fancybox = function (t) {
                                                var e;
                                                return (e = (t = t || {}).selector || !1) ? m("body").off("click.fb-start", e).on("click.fb-start", e, {
                                                        options: t
                                                }, b) : this.off("click.fb-start").on("click.fb-start", {
                                                        items: this,
                                                        options: t
                                                }, b),
                                                        this
                                        },
                                        a.on("click.fb-start", "[data-fancybox]", b),
                                        a.on("click.fb-start", "[data-fancybox-trigger]", function (t) {
                                                m('[data-fancybox="' + m(this).attr("data-fancybox-trigger") + '"]').eq(m(this).attr("data-fancybox-index") || 0).trigger("click.fb-start", {
                                                        $trigger: m(this)
                                                })
                                        }),
                                        e = ".fancybox-button",
                                        i = "fancybox-focus",
                                        o = null,
                                        a.on("mousedown mouseup focus blur", e, function (t) {
                                                switch (t.type) {
                                                        case "mousedown":
                                                                o = m(this);
                                                                break;
                                                        case "mouseup":
                                                                o = null;
                                                                break;
                                                        case "focusin":
                                                                m(e).removeClass(i),
                                                                        m(this).is(o) || m(this).is("[disabled]") || m(this).addClass(i);
                                                                break;
                                                        case "focusout":
                                                                m(e).removeClass(i)
                                                }
                                        })
                        }
                function b(t, e) {
                        var i, o, s, n = [],
                                a = 0;
                        t && t.isDefaultPrevented() || (t.preventDefault(), e = e || {}, t && t.data && (e = f(t.data.options, e)), i = e.$target || m(t.currentTarget).trigger("blur"), (s = m.fancybox.getInstance()) && s.$trigger && s.$trigger.is(i) || (n = e.selector ? m(e.selector) : (o = i.attr("data-fancybox") || "") ? (n = t.data ? t.data.items : []).length ? n.filter('[data-fancybox="' + o + '"]') : m('[data-fancybox="' + o + '"]') : [i], (a = m(n).index(i)) < 0 && (a = 0), (s = m.fancybox.open(n, e, a)).$trigger = i))
                }
        }(window, document, jQuery),


        function (u) {
                "use strict";

                function f(i, t, e) {
                        if (i) return e = e || "",
                                "object" === u.type(e) && (e = u.param(e, !0)),
                                u.each(t, function (t, e) {
                                        i = i.replace("$" + t, e || "")
                                }),
                                e.length && (i += (0 < i.indexOf("?") ? "&" : "?") + e),
                                i
                }
                var o = {
                        youtube: {
                                matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
                                params: {
                                        autoplay: 1,
                                        autohide: 1,
                                        fs: 1,
                                        rel: 0,
                                        hd: 1,
                                        wmode: "transparent",
                                        enablejsapi: 1,
                                        html5: 1
                                },
                                paramPlace: 8,
                                type: "iframe",
                                url: "https://www.youtube-nocookie.com/embed/$4",
                                thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg"
                        },
                        vimeo: {
                                matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
                                params: {
                                        autoplay: 1,
                                        hd: 1,
                                        show_title: 1,
                                        show_byline: 1,
                                        show_portrait: 0,
                                        fullscreen: 1
                                },
                                paramPlace: 3,
                                type: "iframe",
                                url: "//player.vimeo.com/video/$2"
                        },
                        instagram: {
                                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                                type: "image",
                                url: "//$1/p/$2/media/?size=l"
                        },
                        gmap_place: {
                                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
                                type: "iframe",
                                url: function (t) {
                                        return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[12] && 0 < t[12].indexOf("layer=c") ? "svembed" : "embed")
                                }
                        },
                        gmap_search: {
                                matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
                                type: "iframe",
                                url: function (t) {
                                        return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed"
                                }
                        }
                };
                u(document).on("objectNeedsType.fb", function (t, e, s) {
                        var i, n, a, r, l, c, d, h = s.src || "",
                                p = !1;
                        i = u.extend(!0, {}, o, s.opts.media),
                                u.each(i, function (t, e) {
                                        if (a = h.match(e.matcher)) {
                                                if (p = e.type, d = t, c = {}, e.paramPlace && a[e.paramPlace]) {
                                                        "?" == (l = a[e.paramPlace])[0] && (l = l.substring(1)),
                                                                l = l.split("&");
                                                        for (var i = 0; i < l.length; ++i) {
                                                                var o = l[i].split("=", 2);
                                                                2 == o.length && (c[o[0]] = decodeURIComponent(o[1].replace(/\+/g, " ")))
                                                        }
                                                }
                                                return r = u.extend(!0, {}, e.params, s.opts[t], c),
                                                        h = "function" === u.type(e.url) ? e.url.call(this, a, r, s) : f(e.url, a, r),
                                                        n = "function" === u.type(e.thumb) ? e.thumb.call(this, a, r, s) : f(e.thumb, a),
                                                        "youtube" === t ? h = h.replace(/&t=((\d+)m)?(\d+)s/, function (t, e, i, o) {
                                                                return "&start=" + ((i ? 60 * parseInt(i, 10) : 0) + parseInt(o, 10))
                                                        }) : "vimeo" === t && (h = h.replace("&%23", "#")),
                                                        !1
                                        }
                                }),
                                p ? (s.opts.thumb || s.opts.$thumb && s.opts.$thumb.length || (s.opts.thumb = n), "iframe" === p && (s.opts = u.extend(!0, s.opts, {
                                        iframe: {
                                                preload: !1,
                                                attr: {
                                                        scrolling: "no"
                                                }
                                        }
                                })), u.extend(s, {
                                        type: p,
                                        src: h,
                                        origSrc: s.src,
                                        contentSource: d,
                                        contentType: "image" === p ? "image" : "gmap_place" == d || "gmap_search" == d ? "map" : "video"
                                })) : h && (s.type = s.opts.defaultType)
                });
                var s = {
                        youtube: {
                                src: "https://www.youtube.com/iframe_api",
                                class: "YT",
                                loading: !1,
                                loaded: !1
                        },
                        vimeo: {
                                src: "https://player.vimeo.com/api/player.js",
                                class: "Vimeo",
                                loading: !1,
                                loaded: !1
                        },
                        load: function (t) {
                                var e, i = this;
                                this[t].loaded ? setTimeout(function () {
                                        i.done(t)
                                }) : this[t].loading || (this[t].loading = !0, (e = document.createElement("script")).type = "text/javascript", e.src = this[t].src, "youtube" === t ? window.onYouTubeIframeAPIReady = function () {
                                        i[t].loaded = !0,
                                                i.done(t)
                                } : e.onload = function () {
                                        i[t].loaded = !0,
                                                i.done(t)
                                }, document.body.appendChild(e))
                        },
                        done: function (t) {
                                var e, i;
                                "youtube" === t && delete window.onYouTubeIframeAPIReady,
                                        (e = u.fancybox.getInstance()) && (i = e.current.$content.find("iframe"), "youtube" === t && void 0 !== YT && YT ? new YT.Player(i.attr("id"), {
                                                events: {
                                                        onStateChange: function (t) {
                                                                0 == t.data && e.next()
                                                        }
                                                }
                                        }) : "vimeo" === t && void 0 !== Vimeo && Vimeo && new Vimeo.Player(i).on("ended", function () {
                                                e.next()
                                        }))
                        }
                };
                u(document).on({
                        "afterShow.fb": function (t, e, i) {
                                1 < e.group.length && ("youtube" === i.contentSource || "vimeo" === i.contentSource) && s.load(i.contentSource)
                        }
                })
        }(jQuery),


        function (m, l, g) {
                "use strict";

                function d(t) {
                        var e = [];
                        for (var i in t = (t = t.originalEvent || t || m.e).touches && t.touches.length ? t.touches : t.changedTouches && t.changedTouches.length ? t.changedTouches : [t]) t[i].pageX ? e.push({
                                x: t[i].pageX,
                                y: t[i].pageY
                        }) : t[i].clientX && e.push({
                                x: t[i].clientX,
                                y: t[i].clientY
                        });
                        return e
                }
                function v(t, e, i) {
                        return e && t ? "x" === i ? t.x - e.x : "y" === i ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0
                }
                function c(t) {
                        if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe') || g.isFunction(t.get(0).onclick) || t.data("selectable")) return 1;
                        for (var e = 0, i = t[0].attributes, o = i.length; e < o; e++) if ("data-fancybox-" === i[e].nodeName.substr(0, 14)) return 1
                }
                function h(t) {
                        for (var e, i, o, s, n, a = !1; e = t.get(0), 0, i = m.getComputedStyle(e)["overflow-y"], o = m.getComputedStyle(e)["overflow-x"], s = ("scroll" === i || "auto" === i) && e.scrollHeight > e.clientHeight, n = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth, !(a = s || n) && (t = t.parent()).length && !t.hasClass("fancybox-stage") && !t.is("body"););
                        return a
                }
                function i(t) {
                        var e = this;
                        e.instance = t,
                                e.$bg = t.$refs.bg,
                                e.$stage = t.$refs.stage,
                                e.$container = t.$refs.container,
                                e.destroy(),
                                e.$container.on("touchstart.fb.touch mousedown.fb.touch", g.proxy(e, "ontouchstart"))
                }
                var b = m.requestAnimationFrame || m.webkitRequestAnimationFrame || m.mozRequestAnimationFrame || m.oRequestAnimationFrame ||
                        function (t) {
                                return m.setTimeout(t, 1e3 / 60)
                        },
                        y = m.cancelAnimationFrame || m.webkitCancelAnimationFrame || m.mozCancelAnimationFrame || m.oCancelAnimationFrame ||
                                function (t) {
                                        m.clearTimeout(t)
                                };
                i.prototype.destroy = function () {
                        var t = this;
                        t.$container.off(".fb.touch"),
                                g(l).off(".fb.touch"),
                                t.requestId && (y(t.requestId), t.requestId = null),
                                t.tapped && (clearTimeout(t.tapped), t.tapped = null)
                },
                        i.prototype.ontouchstart = function (t) {
                                var e = this,
                                        i = g(t.target),
                                        o = e.instance,
                                        s = o.current,
                                        n = s.$slide,
                                        a = s.$content,
                                        r = "touchstart" == t.type;
                                if (r && e.$container.off("mousedown.fb.touch"), (!t.originalEvent || 2 != t.originalEvent.button) && n.length && i.length && !c(i) && !c(i.parent()) && (i.is("img") || !(t.originalEvent.clientX > i[0].clientWidth + i.offset().left))) {
                                        if (!s || o.isAnimating || s.$slide.hasClass("fancybox-animated")) return t.stopPropagation(),
                                                void t.preventDefault();
                                        e.realPoints = e.startPoints = d(t),
                                                e.startPoints.length && (s.touch && t.stopPropagation(), e.startEvent = t, e.canTap = !0, e.$target = i, e.$content = a, e.opts = s.opts.touch, e.isPanning = !1, e.isSwiping = !1, e.isZooming = !1, e.isScrolling = !1, e.canPan = o.canPan(), e.startTime = (new Date).getTime(), e.distanceX = e.distanceY = e.distance = 0, e.canvasWidth = Math.round(n[0].clientWidth), e.canvasHeight = Math.round(n[0].clientHeight), e.contentLastPos = null, e.contentStartPos = g.fancybox.getTranslate(e.$content) || {
                                                        top: 0,
                                                        left: 0
                                                }, e.sliderStartPos = g.fancybox.getTranslate(n), e.stagePos = g.fancybox.getTranslate(o.$refs.stage), e.sliderStartPos.top -= e.stagePos.top, e.sliderStartPos.left -= e.stagePos.left, e.contentStartPos.top -= e.stagePos.top, e.contentStartPos.left -= e.stagePos.left, g(l).off(".fb.touch").on(r ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", g.proxy(e, "ontouchend")).on(r ? "touchmove.fb.touch" : "mousemove.fb.touch", g.proxy(e, "ontouchmove")), g.fancybox.isMobile && l.addEventListener("scroll", e.onscroll, !0), ((e.opts || e.canPan) && (i.is(e.$stage) || e.$stage.find(i).length) || (i.is(".fancybox-image") && t.preventDefault(), g.fancybox.isMobile && i.parents(".fancybox-caption").length)) && (e.isScrollable = h(i) || h(i.parent()), g.fancybox.isMobile && e.isScrollable || t.preventDefault(), 1 !== e.startPoints.length && !s.hasError || (e.canPan ? (g.fancybox.stop(e.$content), e.isPanning = !0) : e.isSwiping = !0, e.$container.addClass("fancybox-is-grabbing")), 2 === e.startPoints.length && "image" === s.type && (s.isLoaded || s.$ghost) && (e.canTap = !1, e.isSwiping = !1, e.isPanning = !1, e.isZooming = !0, g.fancybox.stop(e.$content), e.centerPointStartX = .5 * (e.startPoints[0].x + e.startPoints[1].x) - g(m).scrollLeft(), e.centerPointStartY = .5 * (e.startPoints[0].y + e.startPoints[1].y) - g(m).scrollTop(), e.percentageOfImageAtPinchPointX = (e.centerPointStartX - e.contentStartPos.left) / e.contentStartPos.width, e.percentageOfImageAtPinchPointY = (e.centerPointStartY - e.contentStartPos.top) / e.contentStartPos.height, e.startDistanceBetweenFingers = v(e.startPoints[0], e.startPoints[1]))))
                                }
                        },
                        i.prototype.onscroll = function (t) {
                                this.isScrolling = !0,
                                        l.removeEventListener("scroll", this.onscroll, !0)
                        },
                        i.prototype.ontouchmove = function (t) {
                                var e = this;
                                void 0 === t.originalEvent.buttons || 0 !== t.originalEvent.buttons ? e.isScrolling ? e.canTap = !1 : (e.newPoints = d(t), (e.opts || e.canPan) && e.newPoints.length && e.newPoints.length && (e.isSwiping && !0 === e.isSwiping || t.preventDefault(), e.distanceX = v(e.newPoints[0], e.startPoints[0], "x"), e.distanceY = v(e.newPoints[0], e.startPoints[0], "y"), e.distance = v(e.newPoints[0], e.startPoints[0]), 0 < e.distance && (e.isSwiping ? e.onSwipe(t) : e.isPanning ? e.onPan() : e.isZooming && e.onZoom()))) : e.ontouchend(t)
                        },
                        i.prototype.onSwipe = function (t) {
                                var e, s = this,
                                        n = s.instance,
                                        i = s.isSwiping,
                                        o = s.sliderStartPos.left || 0;
                                if (!0 !== i) "x" == i && (0 < s.distanceX && (s.instance.group.length < 2 || 0 === s.instance.current.index && !s.instance.current.opts.loop) ? o += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s.instance.current.opts.loop) ? o -= Math.pow(-s.distanceX, .8) : o += s.distanceX),
                                        s.sliderLastPos = {
                                                top: "x" == i ? 0 : s.sliderStartPos.top + s.distanceY,
                                                left: o
                                        },
                                        s.requestId && (y(s.requestId), s.requestId = null),
                                        s.requestId = b(function () {
                                                s.sliderLastPos && (g.each(s.instance.slides, function (t, e) {
                                                        var i = e.pos - s.instance.currPos;
                                                        g.fancybox.setTranslate(e.$slide, {
                                                                top: s.sliderLastPos.top,
                                                                left: s.sliderLastPos.left + i * s.canvasWidth + i * e.opts.gutter
                                                        })
                                                }), s.$container.addClass("fancybox-is-sliding"))
                                        });
                                else if (10 < Math.abs(s.distance)) {
                                        if (s.canTap = !1, n.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : n.isDragging || !1 === s.opts.vertical || "auto" === s.opts.vertical && 800 < g(m).width() ? s.isSwiping = "x" : (e = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s.isSwiping = 45 < e && e < 135 ? "y" : "x"), "y" === s.isSwiping && g.fancybox.isMobile && s.isScrollable) return void (s.isScrolling = !0);
                                        n.isDragging = s.isSwiping,
                                                s.startPoints = s.newPoints,
                                                g.each(n.slides, function (t, e) {
                                                        var i, o;
                                                        g.fancybox.stop(e.$slide),
                                                                i = g.fancybox.getTranslate(e.$slide),
                                                                o = g.fancybox.getTranslate(n.$refs.stage),
                                                                e.$slide.css({
                                                                        transform: "",
                                                                        opacity: "",
                                                                        "transition-duration": ""
                                                                }).removeClass("fancybox-animated").removeClass(function (t, e) {
                                                                        return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ")
                                                                }),
                                                                e.pos === n.current.pos && (s.sliderStartPos.top = i.top - o.top, s.sliderStartPos.left = i.left - o.left),
                                                                g.fancybox.setTranslate(e.$slide, {
                                                                        top: i.top - o.top,
                                                                        left: i.left - o.left
                                                                })
                                                }),
                                                n.SlideShow && n.SlideShow.isActive && n.SlideShow.stop()
                                }
                        },
                        i.prototype.onPan = function () {
                                var t = this;
                                v(t.newPoints[0], t.realPoints[0]) < (g.fancybox.isMobile ? 10 : 5) ? t.startPoints = t.newPoints : (t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && y(t.requestId), t.requestId = b(function () {
                                        g.fancybox.setTranslate(t.$content, t.contentLastPos)
                                }))
                        },
                        i.prototype.limitMovement = function () {
                                var t, e, i, o, s, n, a = this,
                                        r = a.canvasWidth,
                                        l = a.canvasHeight,
                                        c = a.distanceX,
                                        d = a.distanceY,
                                        h = a.contentStartPos,
                                        p = h.left,
                                        u = h.top,
                                        f = h.width,
                                        m = h.height;
                                return s = r < f ? p + c : p,
                                        n = u + d,
                                        t = Math.max(0, .5 * r - .5 * f),
                                        e = Math.max(0, .5 * l - .5 * m),
                                        i = Math.min(r - f, .5 * r - .5 * f),
                                        o = Math.min(l - m, .5 * l - .5 * m),
                                        0 < c && t < s && (s = t - 1 + Math.pow(-t + p + c, .8) || 0),
                                        c < 0 && s < i && (s = i + 1 - Math.pow(i - p - c, .8) || 0),
                                        0 < d && e < n && (n = e - 1 + Math.pow(-e + u + d, .8) || 0),
                                        d < 0 && n < o && (n = o + 1 - Math.pow(o - u - d, .8) || 0),
                                {
                                        top: n,
                                        left: s
                                }
                        },
                        i.prototype.limitPosition = function (t, e, i, o) {
                                var s = this.canvasWidth,
                                        n = this.canvasHeight;
                                return t = s < i ? (t = 0 < t ? 0 : t) < s - i ? s - i : t : Math.max(0, s / 2 - i / 2),
                                {
                                        top: e = n < o ? (e = 0 < e ? 0 : e) < n - o ? n - o : e : Math.max(0, n / 2 - o / 2),
                                        left: t
                                }
                        },
                        i.prototype.onZoom = function () {
                                var t = this,
                                        e = t.contentStartPos,
                                        i = e.width,
                                        o = e.height,
                                        s = e.left,
                                        n = e.top,
                                        a = v(t.newPoints[0], t.newPoints[1]) / t.startDistanceBetweenFingers,
                                        r = Math.floor(i * a),
                                        l = Math.floor(o * a),
                                        c = (i - r) * t.percentageOfImageAtPinchPointX,
                                        d = (o - l) * t.percentageOfImageAtPinchPointY,
                                        h = (t.newPoints[0].x + t.newPoints[1].x) / 2 - g(m).scrollLeft(),
                                        p = (t.newPoints[0].y + t.newPoints[1].y) / 2 - g(m).scrollTop(),
                                        u = h - t.centerPointStartX,
                                        f = {
                                                top: n + (d + (p - t.centerPointStartY)),
                                                left: s + (c + u),
                                                scaleX: a,
                                                scaleY: a
                                        };
                                t.canTap = !1,
                                        t.newWidth = r,
                                        t.newHeight = l,
                                        t.contentLastPos = f,
                                        t.requestId && y(t.requestId),
                                        t.requestId = b(function () {
                                                g.fancybox.setTranslate(t.$content, t.contentLastPos)
                                        })
                        },
                        i.prototype.ontouchend = function (t) {
                                var e = this,
                                        i = e.isSwiping,
                                        o = e.isPanning,
                                        s = e.isZooming,
                                        n = e.isScrolling;
                                if (e.endPoints = d(t), e.dMs = Math.max((new Date).getTime() - e.startTime, 1), e.$container.removeClass("fancybox-is-grabbing"), g(l).off(".fb.touch"), l.removeEventListener("scroll", e.onscroll, !0), e.requestId && (y(e.requestId), e.requestId = null), e.isSwiping = !1, e.isPanning = !1, e.isZooming = !1, e.isScrolling = !1, e.instance.isDragging = !1, e.canTap) return e.onTap(t);
                                e.speed = 100,
                                        e.velocityX = e.distanceX / e.dMs * .5,
                                        e.velocityY = e.distanceY / e.dMs * .5,
                                        o ? e.endPanning() : s ? e.endZooming() : e.endSwiping(i, n)
                        },
                        i.prototype.endSwiping = function (t, e) {
                                var i = this,
                                        o = !1,
                                        s = i.instance.group.length,
                                        n = Math.abs(i.distanceX),
                                        a = "x" == t && 1 < s && (130 < i.dMs && 10 < n || 50 < n);
                                i.sliderLastPos = null,
                                        "y" == t && !e && 50 < Math.abs(i.distanceY) ? (g.fancybox.animate(i.instance.current.$slide, {
                                                top: i.sliderStartPos.top + i.distanceY + 150 * i.velocityY,
                                                opacity: 0
                                        }, 200), o = i.instance.close(!0, 250)) : a && 0 < i.distanceX ? o = i.instance.previous(300) : a && i.distanceX < 0 && (o = i.instance.next(300)),
                                        !1 !== o || "x" != t && "y" != t || i.instance.centerSlide(200),
                                        i.$container.removeClass("fancybox-is-sliding")
                        },
                        i.prototype.endPanning = function () {
                                var t, e, i, o = this;
                                o.contentLastPos && (e = !1 === o.opts.momentum || 350 < o.dMs ? (t = o.contentLastPos.left, o.contentLastPos.top) : (t = o.contentLastPos.left + 500 * o.velocityX, o.contentLastPos.top + 500 * o.velocityY), (i = o.limitPosition(t, e, o.contentStartPos.width, o.contentStartPos.height)).width = o.contentStartPos.width, i.height = o.contentStartPos.height, g.fancybox.animate(o.$content, i, 366))
                        },
                        i.prototype.endZooming = function () {
                                var t, e, i, o, s = this,
                                        n = s.instance.current,
                                        a = s.newWidth,
                                        r = s.newHeight;
                                s.contentLastPos && (t = s.contentLastPos.left, o = {
                                        top: e = s.contentLastPos.top,
                                        left: t,
                                        width: a,
                                        height: r,
                                        scaleX: 1,
                                        scaleY: 1
                                }, g.fancybox.setTranslate(s.$content, o), a < s.canvasWidth && r < s.canvasHeight ? s.instance.scaleToFit(150) : a > n.width || r > n.height ? s.instance.scaleToActual(s.centerPointStartX, s.centerPointStartY, 150) : (i = s.limitPosition(t, e, a, r), g.fancybox.animate(s.$content, i, 150)))
                        },
                        i.prototype.onTap = function (i) {
                                function t(t) {
                                        var e = a.opts[t];
                                        if (g.isFunction(e) && (e = e.apply(n, [a, i])), e) switch (e) {
                                                case "close":
                                                        n.close(o.startEvent);
                                                        break;
                                                case "toggleControls":
                                                        n.toggleControls();
                                                        break;
                                                case "next":
                                                        n.next();
                                                        break;
                                                case "nextOrClose":
                                                        1 < n.group.length ? n.next() : n.close(o.startEvent);
                                                        break;
                                                case "zoom":
                                                        "image" == a.type && (a.isLoaded || a.$ghost) && (n.canPan() ? n.scaleToFit() : n.isScaledDown() ? n.scaleToActual(l, c) : n.group.length < 2 && n.close(o.startEvent))
                                        }
                                }
                                var e, o = this,
                                        s = g(i.target),
                                        n = o.instance,
                                        a = n.current,
                                        r = i && d(i) || o.startPoints,
                                        l = r[0] ? r[0].x - g(m).scrollLeft() - o.stagePos.left : 0,
                                        c = r[0] ? r[0].y - g(m).scrollTop() - o.stagePos.top : 0;
                                if ((!i.originalEvent || 2 != i.originalEvent.button) && (s.is("img") || !(l > s[0].clientWidth + s.offset().left))) {
                                        if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) e = "Outside";
                                        else if (s.is(".fancybox-slide")) e = "Slide";
                                        else {
                                                if (!n.current.$content || !n.current.$content.find(s).addBack().filter(s).length) return;
                                                e = "Content"
                                        }
                                        if (o.tapped) {
                                                if (clearTimeout(o.tapped), o.tapped = null, 50 < Math.abs(l - o.tapX) || 50 < Math.abs(c - o.tapY)) return this;
                                                t("dblclick" + e)
                                        } else o.tapX = l,
                                                o.tapY = c,
                                                a.opts["dblclick" + e] && a.opts["dblclick" + e] !== a.opts["click" + e] ? o.tapped = setTimeout(function () {
                                                        o.tapped = null,
                                                                n.isAnimating || t("click" + e)
                                                }, 500) : t("click" + e);
                                        return this
                                }
                        },
                        g(l).on("onActivate.fb", function (t, e) {
                                e && !e.Guestures && (e.Guestures = new i(e))
                        }).on("beforeClose.fb", function (t, e) {
                                e && e.Guestures && e.Guestures.destroy()
                        })
        }(window, document, jQuery),


        function (a, r) {
                "use strict";
                r.extend(!0, r.fancybox.defaults, {
                        btnTpl: {
                                slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>'
                        },
                        slideShow: {
                                autoStart: !1,
                                speed: 3e3,
                                progress: !0
                        }
                });

                function i(t) {
                        this.instance = t,
                                this.init()
                }
                r.extend(i.prototype, {
                        timer: null,
                        isActive: !1,
                        $button: null,
                        init: function () {
                                var t = this,
                                        e = t.instance,
                                        i = e.group[e.currIndex].opts.slideShow;
                                t.$button = e.$refs.toolbar.find("[data-fancybox-play]").on("click", function () {
                                        t.toggle()
                                }),
                                        e.group.length < 2 || !i ? t.$button.hide() : i.progress && (t.$progress = r('<div class="fancybox-progress"></div>').appendTo(e.$refs.inner))
                        },
                        set: function (t) {
                                var e = this,
                                        i = e.instance,
                                        o = i.current;
                                o && (!0 === t || o.opts.loop || i.currIndex < i.group.length - 1) ? e.isActive && "video" !== o.contentType && (e.$progress && r.fancybox.animate(e.$progress.show(), {
                                        scaleX: 1
                                }, o.opts.slideShow.speed), e.timer = setTimeout(function () {
                                        i.current.opts.loop || i.current.index != i.group.length - 1 ? i.next() : i.jumpTo(0)
                                }, o.opts.slideShow.speed)) : (e.stop(), i.idleSecondsCounter = 0, i.showControls())
                        },
                        clear: function () {
                                clearTimeout(this.timer),
                                        this.timer = null,
                                        this.$progress && this.$progress.removeAttr("style").hide()
                        },
                        start: function () {
                                var t = this,
                                        e = t.instance.current;
                                e && (t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), t.isActive = !0, e.isComplete && t.set(!0), t.instance.trigger("onSlideShowChange", !0))
                        },
                        stop: function () {
                                var t = this,
                                        e = t.instance.current;
                                t.clear(),
                                        t.$button.attr("title", (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"),
                                        t.isActive = !1,
                                        t.instance.trigger("onSlideShowChange", !1),
                                        t.$progress && t.$progress.removeAttr("style").hide()
                        },
                        toggle: function () {
                                this.isActive ? this.stop() : this.start()
                        }
                }),
                        r(a).on({
                                "onInit.fb": function (t, e) {
                                        e && !e.SlideShow && (e.SlideShow = new i(e))
                                },
                                "beforeShow.fb": function (t, e, i, o) {
                                        var s = e && e.SlideShow;
                                        o ? s && i.opts.slideShow.autoStart && s.start() : s && s.isActive && s.clear()
                                },
                                "afterShow.fb": function (t, e, i) {
                                        var o = e && e.SlideShow;
                                        o && o.isActive && o.set()
                                },
                                "afterKeydown.fb": function (t, e, i, o, s) {
                                        var n = e && e.SlideShow;
                                        !n || !i.opts.slideShow || 80 !== s && 32 !== s || r(a.activeElement).is("button,a,input") || (o.preventDefault(), n.toggle())
                                },
                                "beforeClose.fb onDeactivate.fb": function (t, e) {
                                        var i = e && e.SlideShow;
                                        i && i.stop()
                                }
                        }),
                        r(a).on("visibilitychange", function () {
                                var t = r.fancybox.getInstance(),
                                        e = t && t.SlideShow;
                                e && e.isActive && (a.hidden ? e.clear() : e.set())
                        })
        }(document, jQuery),


        function (n, i) {
                "use strict";
                var o = function () {
                        for (var t = [
                                ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
                                ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
                                ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
                                ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
                                ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
                        ], e = {}, i = 0; i < t.length; i++) {
                                var o = t[i];
                                if (o && o[1] in n) {
                                        for (var s = 0; s < o.length; s++) e[t[0][s]] = o[s];
                                        return e
                                }
                        }
                        return !1
                }();
                if (o) {
                        var s = {
                                request: function (t) {
                                        (t = t || n.documentElement)[o.requestFullscreen](t.ALLOW_KEYBOARD_INPUT)
                                },
                                exit: function () {
                                        n[o.exitFullscreen]()
                                },
                                toggle: function (t) {
                                        t = t || n.documentElement,
                                                this.isFullscreen() ? this.exit() : this.request(t)
                                },
                                isFullscreen: function () {
                                        return Boolean(n[o.fullscreenElement])
                                },
                                enabled: function () {
                                        return Boolean(n[o.fullscreenEnabled])
                                }
                        };
                        i.extend(!0, i.fancybox.defaults, {
                                btnTpl: {
                                        fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>'
                                },
                                fullScreen: {
                                        autoStart: !1
                                }
                        }),
                                i(n).on(o.fullscreenchange, function () {
                                        var t = s.isFullscreen(),
                                                e = i.fancybox.getInstance();
                                        e && (e.current && "image" === e.current.type && e.isAnimating && (e.isAnimating = !1, e.update(!0, !0, 0), e.isComplete || e.complete()), e.trigger("onFullscreenChange", t), e.$refs.container.toggleClass("fancybox-is-fullscreen", t), e.$refs.toolbar.find("[data-fancybox-fullscreen]").toggleClass("fancybox-button--fsenter", !t).toggleClass("fancybox-button--fsexit", t))
                                })
                }
                i(n).on({
                        "onInit.fb": function (t, e) {
                                o ? e && e.group[e.currIndex].opts.fullScreen ? (e.$refs.container.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function (t) {
                                        t.stopPropagation(),
                                                t.preventDefault(),
                                                s.toggle()
                                }), e.opts.fullScreen && !0 === e.opts.fullScreen.autoStart && s.request(), e.FullScreen = s) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide() : e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove()
                        },
                        "afterKeydown.fb": function (t, e, i, o, s) {
                                e && e.FullScreen && 70 === s && (o.preventDefault(), e.FullScreen.toggle())
                        },
                        "beforeClose.fb": function (t, e) {
                                e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && s.exit()
                        }
                })
        }(document, jQuery),


        function (t, n) {
                "use strict";
                var a = "fancybox-thumbs",
                        r = a + "-active";
                n.fancybox.defaults = n.extend(!0, {
                        btnTpl: {
                                thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>'
                        },
                        thumbs: {
                                autoStart: !1,
                                hideOnClose: !0,
                                parentEl: ".fancybox-container",
                                axis: "y"
                        }
                }, n.fancybox.defaults);

                function o(t) {
                        this.init(t)
                }
                n.extend(o.prototype, {
                        $button: null,
                        $grid: null,
                        $list: null,
                        isVisible: !1,
                        isActive: !1,
                        init: function (t) {
                                var e = this,
                                        i = t.group,
                                        o = 0;
                                e.instance = t,
                                        e.opts = i[t.currIndex].opts.thumbs,
                                        (t.Thumbs = e).$button = t.$refs.toolbar.find("[data-fancybox-thumbs]");
                                for (var s = 0, n = i.length; s < n && (i[s].thumb && o++, !(1 < o)); s++);
                                1 < o && e.opts ? (e.$button.removeAttr("style").on("click", function () {
                                        e.toggle()
                                }), e.isActive = !0) : e.$button.hide()
                        },
                        create: function () {
                                var i, t = this,
                                        e = t.instance,
                                        o = t.opts.parentEl,
                                        s = [];
                                t.$grid || (t.$grid = n('<div class="' + a + " " + a + "-" + t.opts.axis + '"></div>').appendTo(e.$refs.container.find(o).addBack().filter(o)), t.$grid.on("click", "a", function () {
                                        e.jumpTo(n(this).attr("data-index"))
                                })),
                                        t.$list || (t.$list = n('<div class="' + a + '__list">').appendTo(t.$grid)),
                                        n.each(e.group, function (t, e) {
                                                (i = e.thumb) || "image" !== e.type || (i = e.src),
                                                        s.push('<a href="javascript:;" tabindex="0" data-index="' + t + '"' + (i && i.length ? ' style="background-image:url(' + i + ')"' : 'class="fancybox-thumbs-missing"') + "></a>")
                                        }),
                                        t.$list[0].innerHTML = s.join(""),
                                        "x" === t.opts.axis && t.$list.width(parseInt(t.$grid.css("padding-right"), 10) + e.group.length * t.$list.children().eq(0).outerWidth(!0))
                        },
                        focus: function (t) {
                                var e, i, o = this,
                                        s = o.$list,
                                        n = o.$grid;
                                o.instance.current && (i = (e = s.children().removeClass(r).filter('[data-index="' + o.instance.current.index + '"]').addClass(r)).position(), "y" === o.opts.axis && (i.top < 0 || i.top > s.height() - e.outerHeight()) ? s.stop().animate({
                                        scrollTop: s.scrollTop() + i.top
                                }, t) : "x" === o.opts.axis && (i.left < n.scrollLeft() || i.left > n.scrollLeft() + (n.width() - e.outerWidth())) && s.parent().stop().animate({
                                        scrollLeft: i.left
                                }, t))
                        },
                        update: function () {
                                var t = this;
                                t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible),
                                        t.isVisible ? (t.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t.instance.trigger("onThumbsHide"),
                                        t.instance.update()
                        },
                        hide: function () {
                                this.isVisible = !1,
                                        this.update()
                        },
                        show: function () {
                                this.isVisible = !0,
                                        this.update()
                        },
                        toggle: function () {
                                this.isVisible = !this.isVisible,
                                        this.update()
                        }
                }),
                        n(t).on({
                                "onInit.fb": function (t, e) {
                                        var i;
                                        e && !e.Thumbs && (i = new o(e)).isActive && !0 === i.opts.autoStart && i.show()
                                },
                                "beforeShow.fb": function (t, e, i, o) {
                                        var s = e && e.Thumbs;
                                        s && s.isVisible && s.focus(o ? 0 : 250)
                                },
                                "afterKeydown.fb": function (t, e, i, o, s) {
                                        var n = e && e.Thumbs;
                                        n && n.isActive && 71 === s && (o.preventDefault(), n.toggle())
                                },
                                "beforeClose.fb": function (t, e) {
                                        var i = e && e.Thumbs;
                                        i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide()
                                }
                        })
        }(document, jQuery),


        function (t, n) {
                "use strict";
                n.extend(!0, n.fancybox.defaults, {
                        btnTpl: {
                                share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>'
                        },
                        share: {
                                url: function (t, e) {
                                        return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) || window.location
                                },
                                tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>'
                        }
                }),
                        n(t).on("click", "[data-fancybox-share]", function () {
                                var t, e, i, o = n.fancybox.getInstance(),
                                        s = o.current || null;
                                s && ("function" === n.type(s.opts.share.url) && (t = s.opts.share.url.apply(s, [o, s])), e = s.opts.share.tpl.replace(/\{\{media\}\}/g, "image" === s.type ? encodeURIComponent(s.src) : "").replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, (i = {
                                        "&": "&amp;",
                                        "<": "&lt;",
                                        ">": "&gt;",
                                        '"': "&quot;",
                                        "'": "&#39;",
                                        "/": "&#x2F;",
                                        "`": "&#x60;",
                                        "=": "&#x3D;"
                                }, String(t).replace(/[&<>"'`=\/]/g, function (t) {
                                        return i[t]
                                }))).replace(/\{\{descr\}\}/g, o.$caption ? encodeURIComponent(o.$caption.text()) : ""), n.fancybox.open({
                                        src: o.translate(o, e),
                                        type: "html",
                                        opts: {
                                                touch: !1,
                                                animationEffect: !1,
                                                afterLoad: function (t, e) {
                                                        o.$refs.container.one("beforeClose.fb", function () {
                                                                t.close(null, 0)
                                                        }),
                                                                e.$content.find(".fancybox-share__button").click(function () {
                                                                        return window.open(this.href, "Share", "width=550, height=450"),
                                                                                !1
                                                                })
                                                },
                                                mobile: {
                                                        autoFocus: !1
                                                }
                                        }
                                }))
                        })
        }(document, jQuery),


        function (n, a, s) {
                "use strict";

                function r() {
                        var t = n.location.hash.substr(1),
                                e = t.split("-"),
                                i = 1 < e.length && /^\+?\d+$/.test(e[e.length - 1]) && parseInt(e.pop(-1), 10) || 1;
                        return {
                                hash: t,
                                index: i < 1 ? 1 : i,
                                gallery: e.join("-")
                        }
                }
                function e(t) {
                        "" !== t.gallery && s("[data-fancybox='" + s.escapeSelector(t.gallery) + "']").eq(t.index - 1).focus().trigger("click.fb-start")
                }
                function l(t) {
                        var e, i;
                        return !!t && ("" !== (i = (e = t.current ? t.current.opts : t.opts).hash || (e.$orig ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger") : "")) && i)
                }
                s.escapeSelector || (s.escapeSelector = function (t) {
                        return (t + "").replace(/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, function (t, e) {
                                return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t
                        })
                }),
                        s(function () {
                                !1 !== s.fancybox.defaults.hash && (s(a).on({
                                        "onInit.fb": function (t, e) {
                                                var i, o;
                                                !1 !== e.group[e.currIndex].opts.hash && (i = r(), (o = l(e)) && i.gallery && o == i.gallery && (e.currIndex = i.index - 1))
                                        },
                                        "beforeShow.fb": function (t, e, i, o) {
                                                var s;
                                                i && !1 !== i.opts.hash && (s = l(e)) && (e.currentHash = s + (1 < e.group.length ? "-" + (i.index + 1) : ""), n.location.hash !== "#" + e.currentHash && (o && !e.origHash && (e.origHash = n.location.hash), e.hashTimer && clearTimeout(e.hashTimer), e.hashTimer = setTimeout(function () {
                                                        "replaceState" in n.history ? (n.history[o ? "pushState" : "replaceState"]({}, a.title, n.location.pathname + n.location.search + "#" + e.currentHash), o && (e.hasCreatedHistory = !0)) : n.location.hash = e.currentHash,
                                                                e.hashTimer = null
                                                }, 300)))
                                        },
                                        "beforeClose.fb": function (t, e, i) {
                                                i && !1 !== i.opts.hash && (clearTimeout(e.hashTimer), e.currentHash && e.hasCreatedHistory ? n.history.back() : e.currentHash && ("replaceState" in n.history ? n.history.replaceState({}, a.title, n.location.pathname + n.location.search + (e.origHash || "")) : n.location.hash = e.origHash), e.currentHash = null)
                                        }
                                }), s(n).on("hashchange.fb", function () {
                                        var t = r(),
                                                o = null;
                                        s.each(s(".fancybox-container").get().reverse(), function (t, e) {
                                                var i = s(e).data("FancyBox");
                                                if (i && i.currentHash) return o = i,
                                                        !1
                                        }),
                                                o ? o.currentHash === t.gallery + "-" + t.index || 1 === t.index && o.currentHash == t.gallery || (o.currentHash = null, o.close()) : "" !== t.gallery && e(t)
                                }), setTimeout(function () {
                                        s.fancybox.getInstance() || e(r())
                                }, 50))
                        })
        }(window, document, jQuery),


        function (t, e) {
                "use strict";
                var s = (new Date).getTime();
                e(t).on({
                        "onInit.fb": function (t, o, e) {
                                o.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function (t) {
                                        var e = o.current,
                                                i = (new Date).getTime();
                                        o.group.length < 2 || !1 === e.opts.wheel || "auto" === e.opts.wheel && "image" !== e.type || (t.preventDefault(), t.stopPropagation(), e.$slide.hasClass("fancybox-animated") || (t = t.originalEvent || t, i - s < 250 || (s = i, o[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ? "next" : "previous"]())))
                                })
                        }
                })
        }(document, jQuery),


        function (t, e) {
                if ("function" == typeof define && define.amd) define(["module", "exports"], e);
                else if ("undefined" != typeof exports) e(module, exports);
                else {
                        var i = {
                                exports: {}
                        };
                        e(i, i.exports),
                                t.WOW = i.exports
                }
        }(this, function (t, e) {
                "use strict";

                function i(t, e) {
                        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
                }
                Object.defineProperty(e, "__esModule", {
                        value: !0
                });
                var o = function (t, e, i) {
                        return e && s(t.prototype, e),
                                i && s(t, i),
                                t
                };

                function s(t, e) {
                        for (var i = 0; i < e.length; i++) {
                                var o = e[i];
                                o.enumerable = o.enumerable || !1,
                                        o.configurable = !0,
                                        "value" in o && (o.writable = !0),
                                        Object.defineProperty(t, o.key, o)
                        }
                }
                function n(t, e) {
                        return 0 <= e.indexOf(t)
                }
                function a(t, e, i) {
                        null != t.addEventListener ? t.addEventListener(e, i, !1) : null != t.attachEvent ? t.attachEvent("on" + e, i) : t[e] = i
                }
                function r(t, e, i) {
                        null != t.removeEventListener ? t.removeEventListener(e, i, !1) : null != t.detachEvent ? t.detachEvent("on" + e, i) : delete t[e]
                }
                var l = window.WeakMap || window.MozWeakMap || (o(c, [{
                        key: "get",
                        value: function (t) {
                                for (var e = 0; e < this.keys.length; e++) if (this.keys[e] === t) return this.values[e]
                        }
                },
                {
                        key: "set",
                        value: function (t, e) {
                                for (var i = 0; i < this.keys.length; i++) if (this.keys[i] === t) return this.values[i] = e,
                                        this;
                                return this.keys.push(t),
                                        this.values.push(e),
                                        this
                        }
                }]), c);

                function c() {
                        i(this, c),
                                this.keys = [],
                                this.values = []
                }
                var d = window.MutationObserver || window.WebkitMutationObserver || window.MozMutationObserver || (o(h, [{
                        key: "observe",
                        value: function () { }
                }]), h.notSupported = !0, h);

                function h() {
                        i(this, h),
                                "undefined" != typeof console && null !== console && (console.warn("MutationObserver is not supported by your browser."), console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content."))
                }
                var p = window.getComputedStyle ||
                        function (i) {
                                var o = /(\-([a-z]){1})/g;
                                return {
                                        getPropertyValue: function (t) {
                                                "float" === t && (t = "styleFloat"),
                                                        o.test(t) && t.replace(o, function (t, e) {
                                                                return e.toUpperCase()
                                                        });
                                                var e = i.currentStyle;
                                                return (null != e ? e[t] : void 0) || null
                                        }
                                }
                        },
                        u = (o(f, [{
                                key: "init",
                                value: function () {
                                        this.element = window.document.documentElement,
                                                n(document.readyState, ["interactive", "complete"]) ? this.start() : a(document, "DOMContentLoaded", this.start),
                                                this.finished = []
                                }
                        },
                        {
                                key: "start",
                                value: function () {
                                        var n = this;
                                        if (this.stopped = !1, this.boxes = [].slice.call(this.element.querySelectorAll("." + this.config.boxClass)), this.all = this.boxes.slice(0), this.boxes.length) if (this.disabled()) this.resetStyle();
                                        else for (var t = 0; t < this.boxes.length; t++) {
                                                var e = this.boxes[t];
                                                this.applyStyle(e, !0)
                                        }
                                        this.disabled() || (a(this.config.scrollContainer || window, "scroll", this.scrollHandler), a(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)),
                                                this.config.live && new d(function (t) {
                                                        for (var e = 0; e < t.length; e++) for (var i = t[e], o = 0; o < i.addedNodes.length; o++) {
                                                                var s = i.addedNodes[o];
                                                                n.doSync(s)
                                                        }
                                                }).observe(document.body, {
                                                        childList: !0,
                                                        subtree: !0
                                                })
                                }
                        },
                        {
                                key: "stop",
                                value: function () {
                                        this.stopped = !0,
                                                r(this.config.scrollContainer || window, "scroll", this.scrollHandler),
                                                r(window, "resize", this.scrollHandler),
                                                null != this.interval && clearInterval(this.interval)
                                }
                        },
                        {
                                key: "sync",
                                value: function () {
                                        d.notSupported && this.doSync(this.element)
                                }
                        },
                        {
                                key: "doSync",
                                value: function (t) {
                                        if (null == t && (t = this.element), 1 === t.nodeType) for (var e = (t = t.parentNode || t).querySelectorAll("." + this.config.boxClass), i = 0; i < e.length; i++) {
                                                var o = e[i];
                                                n(o, this.all) || (this.boxes.push(o), this.all.push(o), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(o, !0), this.scrolled = !0)
                                        }
                                }
                        },
                        {
                                key: "show",
                                value: function (t) {
                                        var e, i;
                                        return this.applyStyle(t),
                                                t.className = t.className + " " + this.config.animateClass,
                                                null != this.config.callback && this.config.callback(t),
                                                e = t,
                                                i = this.wowEvent,
                                                null != e.dispatchEvent ? e.dispatchEvent(i) : i in (null != e) ? e[i]() : "on" + i in (null != e) && e["on" + i](),
                                                a(t, "animationend", this.resetAnimation),
                                                a(t, "oanimationend", this.resetAnimation),
                                                a(t, "webkitAnimationEnd", this.resetAnimation),
                                                a(t, "MSAnimationEnd", this.resetAnimation),
                                                t
                                }
                        },
                        {
                                key: "applyStyle",
                                value: function (t, e) {
                                        var i = this,
                                                o = t.getAttribute("data-wow-duration"),
                                                s = t.getAttribute("data-wow-delay"),
                                                n = t.getAttribute("data-wow-iteration");
                                        return this.animate(function () {
                                                return i.customStyle(t, e, o, s, n)
                                        })
                                }
                        },
                        {
                                key: "resetStyle",
                                value: function () {
                                        for (var t = 0; t < this.boxes.length; t++) this.boxes[t].style.visibility = "visible"
                                }
                        },
                        {
                                key: "resetAnimation",
                                value: function (t) {
                                        if (0 <= t.type.toLowerCase().indexOf("animationend")) {
                                                var e = t.target || t.srcElement;
                                                e.className = e.className.replace(this.config.animateClass, "").trim()
                                        }
                                }
                        },
                        {
                                key: "customStyle",
                                value: function (t, e, i, o, s) {
                                        return e && this.cacheAnimationName(t),
                                                t.style.visibility = e ? "hidden" : "visible",
                                                i && this.vendorSet(t.style, {
                                                        animationDuration: i
                                                }),
                                                o && this.vendorSet(t.style, {
                                                        animationDelay: o
                                                }),
                                                s && this.vendorSet(t.style, {
                                                        animationIterationCount: s
                                                }),
                                                this.vendorSet(t.style, {
                                                        animationName: e ? "none" : this.cachedAnimationName(t)
                                                }),
                                                t
                                }
                        },
                        {
                                key: "vendorSet",
                                value: function (t, e) {
                                        for (var i in e) if (e.hasOwnProperty(i)) {
                                                var o = e[i];
                                                t["" + i] = o;
                                                for (var s = 0; s < this.vendors.length; s++) t["" + this.vendors[s] + i.charAt(0).toUpperCase() + i.substr(1)] = o
                                        }
                                }
                        },
                        {
                                key: "vendorCSS",
                                value: function (t, e) {
                                        for (var i = p(t), o = i.getPropertyCSSValue(e), s = 0; s < this.vendors.length; s++) {
                                                var n = this.vendors[s];
                                                o = o || i.getPropertyCSSValue("-" + n + "-" + e)
                                        }
                                        return o
                                }
                        },
                        {
                                key: "animationName",
                                value: function (e) {
                                        var i = void 0;
                                        try {
                                                i = this.vendorCSS(e, "animation-name").cssText
                                        } catch (t) {
                                                i = p(e).getPropertyValue("animation-name")
                                        }
                                        return "none" === i ? "" : i
                                }
                        },
                        {
                                key: "cacheAnimationName",
                                value: function (t) {
                                        return this.animationNameCache.set(t, this.animationName(t))
                                }
                        },
                        {
                                key: "cachedAnimationName",
                                value: function (t) {
                                        return this.animationNameCache.get(t)
                                }
                        },
                        {
                                key: "scrollHandler",
                                value: function () {
                                        this.scrolled = !0
                                }
                        },
                        {
                                key: "scrollCallback",
                                value: function () {
                                        if (this.scrolled) {
                                                this.scrolled = !1;
                                                for (var t = [], e = 0; e < this.boxes.length; e++) {
                                                        var i = this.boxes[e];
                                                        if (i) {
                                                                if (this.isVisible(i)) {
                                                                        this.show(i);
                                                                        continue
                                                                }
                                                                t.push(i)
                                                        }
                                                }
                                                this.boxes = t,
                                                        this.boxes.length || this.config.live || this.stop()
                                        }
                                }
                        },
                        {
                                key: "offsetTop",
                                value: function (t) {
                                        for (; void 0 === t.offsetTop;) t = t.parentNode;
                                        for (var e = t.offsetTop; t.offsetParent;) e += (t = t.offsetParent).offsetTop;
                                        return e
                                }
                        },
                        {
                                key: "isVisible",
                                value: function (t) {
                                        var e = t.getAttribute("data-wow-offset") || this.config.offset,
                                                i = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset,
                                                o = i + Math.min(this.element.clientHeight, "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight) - e,
                                                s = this.offsetTop(t),
                                                n = s + t.clientHeight;
                                        return s <= o && i <= n
                                }
                        },
                        {
                                key: "disabled",
                                value: function () {
                                        return !this.config.mobile && (t = navigator.userAgent, /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(t));
                                        var t
                                }
                        }]), f);

                function f() {
                        var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                        i(this, f),
                                this.defaults = {
                                        boxClass: "wow",
                                        animateClass: "animated",
                                        offset: 0,
                                        mobile: !0,
                                        live: !0,
                                        callback: null,
                                        scrollContainer: null
                                },
                                this.animate = "requestAnimationFrame" in window ?
                                        function (t) {
                                                return window.requestAnimationFrame(t)
                                        } : function (t) {
                                                return t()
                                        },
                                this.vendors = ["moz", "webkit"],
                                this.start = this.start.bind(this),
                                this.resetAnimation = this.resetAnimation.bind(this),
                                this.scrollHandler = this.scrollHandler.bind(this),
                                this.scrollCallback = this.scrollCallback.bind(this),
                                this.scrolled = !0,
                                this.config = function (t, e) {
                                        for (var i in e) if (null == t[i]) {
                                                var o = e[i];
                                                t[i] = o
                                        }
                                        return t
                                }(t, this.defaults),
                                null != t.scrollContainer && (this.config.scrollContainer = document.querySelector(t.scrollContainer)),
                                this.animationNameCache = new l,
                                this.wowEvent = function (t, e, i, o) {
                                        var s = !(arguments.length <= 1 || void 0 === e) && e,
                                                n = !(arguments.length <= 2 || void 0 === i) && i,
                                                a = arguments.length <= 3 || void 0 === o ? null : o,
                                                r = void 0;
                                        return null != document.createEvent ? (r = document.createEvent("CustomEvent")).initCustomEvent(t, s, n, a) : null != document.createEventObject ? (r = document.createEventObject()).eventType = t : r.eventName = t,
                                                r
                                }(this.config.boxClass)
                }
                e.
                        default = u,
                        t.exports = e.
                                default
        }),


        function (t) {
                "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof exports ? module.exports = t($ || require("jquery")) : t(jQuery)
        }(function (N) {
                "use strict";
                var s = "styler",
                        o = {
                                idSuffix: "-styler",
                                filePlaceholder: "Файл не выбран",
                                fileBrowse: "Обзор...",
                                fileNumber: "Выбрано файлов: %s",
                                selectPlaceholder: "Выберите...",
                                selectSearch: !1,
                                selectSearchLimit: 10,
                                selectSearchNotFound: "Совпадений не найдено",
                                selectSearchPlaceholder: "Поиск...",
                                selectVisibleOptions: 0,
                                selectSmartPositioning: !0,
                                locale: "ru",
                                locales: {
                                        en: {
                                                filePlaceholder: "No file selected",
                                                fileBrowse: "Browse...",
                                                fileNumber: "Selected files: %s",
                                                selectPlaceholder: "Select...",
                                                selectSearchNotFound: "No matches found",
                                                selectSearchPlaceholder: "Search..."
                                        }
                                },
                                onSelectOpened: function () { },
                                onSelectClosed: function () { },
                                onFormStyled: function () { }
                        };

                function n(t, e) {
                        this.element = t,
                                this.options = N.extend({}, o, e);
                        var i = this.options.locale;
                        void 0 !== this.options.locales[i] && N.extend(this.options, this.options.locales[i]),
                                this.init()
                }
                function R(t) {
                        if (!N(t.target).parents().hasClass("jq-selectbox") && "OPTION" != t.target.nodeName && N("div.jq-selectbox.opened").length) {
                                var e = N("div.jq-selectbox.opened"),
                                        i = N("div.jq-selectbox__search input", e),
                                        o = N("div.jq-selectbox__dropdown", e);
                                e.find("select").data("_" + s).options.onSelectClosed.call(e),
                                        i.length && i.val("").keyup(),
                                        o.hide().find("li.sel").addClass("selected"),
                                        e.removeClass("focused opened dropup dropdown")
                        }
                }
                n.prototype = {
                        init: function () {
                                var O = N(this.element),
                                        D = this.options,
                                        M = !(!navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || navigator.userAgent.match(/(Windows\sPhone)/i)),
                                        t = !(!navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/(Windows\sPhone)/i));

                                function F() {
                                        void 0 !== O.attr("id") && "" !== O.attr("id") && (this.id = O.attr("id") + D.idSuffix),
                                                this.title = O.attr("title"),
                                                this.classes = O.attr("class"),
                                                this.data = O.data()
                                }
                                if (O.is(":checkbox")) {
                                        var e = function () {
                                                var t = new F,
                                                        e = N('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>').attr({
                                                                id: t.id,
                                                                title: t.title
                                                        }).addClass(t.classes).data(t.data);
                                                O.after(e).prependTo(e),
                                                        O.is(":checked") && e.addClass("checked"),
                                                        O.is(":disabled") && e.addClass("disabled"),
                                                        e.click(function (t) {
                                                                t.preventDefault(),
                                                                        O.triggerHandler("click"),
                                                                        e.is(".disabled") || (O.is(":checked") ? (O.prop("checked", !1), e.removeClass("checked")) : (O.prop("checked", !0), e.addClass("checked")), O.focus().change())
                                                        }),
                                                        O.closest("label").add('label[for="' + O.attr("id") + '"]').on("click.styler", function (t) {
                                                                N(t.target).is("a") || N(t.target).closest(e).length || (e.triggerHandler("click"), t.preventDefault())
                                                        }),
                                                        O.on("change.styler", function () {
                                                                O.is(":checked") ? e.addClass("checked") : e.removeClass("checked")
                                                        }).on("keydown.styler", function (t) {
                                                                32 == t.which && e.click()
                                                        }).on("focus.styler", function () {
                                                                e.is(".disabled") || e.addClass("focused")
                                                        }).on("blur.styler", function () {
                                                                e.removeClass("focused")
                                                        })
                                        };
                                        e(),
                                                O.on("refresh", function () {
                                                        O.closest("label").add('label[for="' + O.attr("id") + '"]').off(".styler"),
                                                                O.off(".styler").parent().before(O).remove(),
                                                                e()
                                                })
                                } else if (O.is(":radio")) {
                                        var i = function () {
                                                var t = new F,
                                                        i = N('<div class="jq-radio"><div class="jq-radio__div"></div></div>').attr({
                                                                id: t.id,
                                                                title: t.title
                                                        }).addClass(t.classes).data(t.data);
                                                O.after(i).prependTo(i),
                                                        O.is(":checked") && i.addClass("checked"),
                                                        O.is(":disabled") && i.addClass("disabled"),
                                                        N.fn.commonParents = function () {
                                                                var t = this;
                                                                return t.first().parents().filter(function () {
                                                                        return N(this).find(t).length === t.length
                                                                })
                                                        },
                                                        N.fn.commonParent = function () {
                                                                return N(this).commonParents().first()
                                                        },
                                                        i.click(function (t) {
                                                                if (t.preventDefault(), O.triggerHandler("click"), !i.is(".disabled")) {
                                                                        var e = N('input[name="' + O.attr("name") + '"]');
                                                                        e.commonParent().find(e).prop("checked", !1).parent().removeClass("checked"),
                                                                                O.prop("checked", !0).parent().addClass("checked"),
                                                                                O.focus().change()
                                                                }
                                                        }),
                                                        O.closest("label").add('label[for="' + O.attr("id") + '"]').on("click.styler", function (t) {
                                                                N(t.target).is("a") || N(t.target).closest(i).length || (i.triggerHandler("click"), t.preventDefault())
                                                        }),
                                                        O.on("change.styler", function () {
                                                                O.parent().addClass("checked")
                                                        }).on("focus.styler", function () {
                                                                i.is(".disabled") || i.addClass("focused")
                                                        }).on("blur.styler", function () {
                                                                i.removeClass("focused")
                                                        })
                                        };
                                        i(),
                                                O.on("refresh", function () {
                                                        O.closest("label").add('label[for="' + O.attr("id") + '"]').off(".styler"),
                                                                O.off(".styler").parent().before(O).remove(),
                                                                i()
                                                })
                                } else if (O.is(":file")) {
                                        var o = function () {
                                                var t = new F,
                                                        o = O.data("placeholder");
                                                void 0 === o && (o = D.filePlaceholder);
                                                var e = O.data("browse");
                                                void 0 !== e && "" !== e || (e = D.fileBrowse);
                                                var s = N('<div class="jq-file"><div class="jq-file__name">' + o + '</div><div class="jq-file__browse">' + e + "</div></div>").attr({
                                                        id: t.id,
                                                        title: t.title
                                                }).addClass(t.classes).data(t.data);
                                                O.after(s).appendTo(s),
                                                        O.is(":disabled") && s.addClass("disabled");
                                                var i = O.val(),
                                                        n = N("div.jq-file__name", s);
                                                i && n.text(i.replace(/.+[\\\/]/, "")),
                                                        O.on("change.styler", function () {
                                                                var t = O.val();
                                                                if (O.is("[multiple]")) {
                                                                        t = "";
                                                                        var e = O[0].files.length;
                                                                        if (0 < e) {
                                                                                var i = O.data("number");
                                                                                void 0 === i && (i = D.fileNumber),
                                                                                        t = i = i.replace("%s", e)
                                                                        }
                                                                }
                                                                n.text(t.replace(/.+[\\\/]/, "")),
                                                                        "" === t ? (n.text(o), s.removeClass("changed")) : s.addClass("changed")
                                                        }).on("focus.styler", function () {
                                                                s.addClass("focused")
                                                        }).on("blur.styler", function () {
                                                                s.removeClass("focused")
                                                        }).on("click.styler", function () {
                                                                s.removeClass("focused")
                                                        })
                                        };
                                        o(),
                                                O.on("refresh", function () {
                                                        O.off(".styler").parent().before(O).remove(),
                                                                o()
                                                })
                                } else if (O.is('input[type="number"]')) {
                                        var s = function () {
                                                var t = new F,
                                                        e = N('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>').attr({
                                                                id: t.id,
                                                                title: t.title
                                                        }).addClass(t.classes).data(t.data);
                                                O.after(e).prependTo(e).wrap('<div class="jq-number__field"></div>'),
                                                        O.is(":disabled") && e.addClass("disabled");
                                                var n, a, r, i = null,
                                                        o = null;
                                                void 0 !== O.attr("min") && (n = O.attr("min")),
                                                        void 0 !== O.attr("max") && (a = O.attr("max")),
                                                        r = void 0 !== O.attr("step") && N.isNumeric(O.attr("step")) ? Number(O.attr("step")) : Number(1);

                                                function s(t) {
                                                        var e, i = O.val();
                                                        N.isNumeric(i) || (i = 0, O.val("0")),
                                                                t.is(".minus") ? e = Number(i) - r : t.is(".plus") && (e = Number(i) + r);
                                                        var o = (r.toString().split(".")[1] || []).length;
                                                        if (0 < o) {
                                                                for (var s = "1"; s.length <= o;) s += "0";
                                                                e = Math.round(e * s) / s
                                                        }
                                                        N.isNumeric(n) && N.isNumeric(a) ? n <= e && e <= a && O.val(e) : N.isNumeric(n) && !N.isNumeric(a) ? n <= e && O.val(e) : (N.isNumeric(n) || !N.isNumeric(a) || e <= a) && O.val(e)
                                                }
                                                e.is(".disabled") || (e.on("mousedown", "div.jq-number__spin", function () {
                                                        var t = N(this);
                                                        s(t),
                                                                i = setTimeout(function () {
                                                                        o = setInterval(function () {
                                                                                s(t)
                                                                        }, 40)
                                                                }, 350)
                                                }).on("mouseup mouseout", "div.jq-number__spin", function () {
                                                        clearTimeout(i),
                                                                clearInterval(o)
                                                }).on("mouseup", "div.jq-number__spin", function () {
                                                        O.change().trigger("input")
                                                }), O.on("focus.styler", function () {
                                                        e.addClass("focused")
                                                }).on("blur.styler", function () {
                                                        e.removeClass("focused")
                                                }))
                                        };
                                        s(),
                                                O.on("refresh", function () {
                                                        O.off(".styler").closest(".jq-number").before(O).remove(),
                                                                s()
                                                })
                                } else if (O.is("select")) {
                                        var n = function () {
                                                function A(e) {
                                                        var i = e.prop("scrollHeight") - e.outerHeight(),
                                                                o = null,
                                                                s = null;
                                                        e.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function (t) {
                                                                o = t.originalEvent.detail < 0 || 0 < t.originalEvent.wheelDelta ? 1 : -1,
                                                                        s = e.scrollTop(),
                                                                        (i <= s && o < 0 || s <= 0 && 0 < o) && (t.stopPropagation(), t.preventDefault())
                                                        })
                                                }
                                                var P = N("option", O),
                                                        I = "";

                                                function E() {
                                                        for (var t = 0; t < P.length; t++) {
                                                                var e = P.eq(t),
                                                                        i = "",
                                                                        o = "",
                                                                        s = "",
                                                                        n = "",
                                                                        a = "",
                                                                        r = "",
                                                                        l = "",
                                                                        c = "",
                                                                        d = "";
                                                                e.prop("selected") && (o = "selected sel"),
                                                                        e.is(":disabled") && (o = "disabled"),
                                                                        e.is(":selected:disabled") && (o = "selected sel disabled"),
                                                                        void 0 !== e.attr("id") && "" !== e.attr("id") && (n = ' id="' + e.attr("id") + D.idSuffix + '"'),
                                                                        void 0 !== e.attr("title") && "" !== P.attr("title") && (a = ' title="' + e.attr("title") + '"'),
                                                                        void 0 !== e.attr("class") && (l = " " + e.attr("class"), d = ' data-jqfs-class="' + e.attr("class") + '"');
                                                                var h = e.data();
                                                                for (var p in h) "" !== h[p] && (r += " data-" + p + '="' + h[p] + '"');
                                                                o + l !== "" && (s = ' class="' + o + l + '"'),
                                                                        i = "<li" + d + r + s + a + n + ">" + e.html() + "</li>",
                                                                        e.parent().is("optgroup") && (void 0 !== e.parent().attr("class") && (c = " " + e.parent().attr("class")), i = "<li" + d + r + ' class="' + o + l + " option" + c + '"' + a + n + ">" + e.html() + "</li>", e.is(":first-child") && (i = '<li class="optgroup' + c + '">' + e.parent().attr("label") + "</li>" + i)),
                                                                        I += i
                                                        }
                                                }
                                                if (O.is("[multiple]")) {
                                                        if (t || M) return;
                                                        !
                                                                function () {
                                                                        var t = new F,
                                                                                e = N('<div class="jq-select-multiple jqselect"></div>').attr({
                                                                                        id: t.id,
                                                                                        title: t.title
                                                                                }).addClass(t.classes).data(t.data);
                                                                        O.after(e),
                                                                                E(),
                                                                                e.append("<ul>" + I + "</ul>");
                                                                        var i = N("ul", e),
                                                                                s = N("li", e),
                                                                                o = O.attr("size"),
                                                                                n = i.outerHeight(),
                                                                                a = s.outerHeight();
                                                                        void 0 !== o && 0 < o ? i.css({
                                                                                height: a * o
                                                                        }) : i.css({
                                                                                height: 4 * a
                                                                        }),
                                                                                n > e.height() && (i.css("overflowY", "scroll"), A(i), s.filter(".selected").length && i.scrollTop(i.scrollTop() + s.filter(".selected").position().top)),
                                                                                O.prependTo(e),
                                                                                O.is(":disabled") ? (e.addClass("disabled"), P.each(function () {
                                                                                        N(this).is(":selected") && s.eq(N(this).index()).addClass("selected")
                                                                                })) : (s.filter(":not(.disabled):not(.optgroup)").click(function (t) {
                                                                                        O.focus();
                                                                                        var e = N(this);
                                                                                        if (t.ctrlKey || t.metaKey || e.addClass("selected"), t.shiftKey || e.addClass("first"), t.ctrlKey || t.metaKey || t.shiftKey || e.siblings().removeClass("selected first"), (t.ctrlKey || t.metaKey) && (e.is(".selected") ? e.removeClass("selected first") : e.addClass("selected first"), e.siblings().removeClass("first")), t.shiftKey) {
                                                                                                var i = !1,
                                                                                                        o = !1;
                                                                                                e.siblings().removeClass("selected").siblings(".first").addClass("selected"),
                                                                                                        e.prevAll().each(function () {
                                                                                                                N(this).is(".first") && (i = !0)
                                                                                                        }),
                                                                                                        e.nextAll().each(function () {
                                                                                                                N(this).is(".first") && (o = !0)
                                                                                                        }),
                                                                                                        i && e.prevAll().each(function () {
                                                                                                                if (N(this).is(".selected")) return !1;
                                                                                                                N(this).not(".disabled, .optgroup").addClass("selected")
                                                                                                        }),
                                                                                                        o && e.nextAll().each(function () {
                                                                                                                if (N(this).is(".selected")) return !1;
                                                                                                                N(this).not(".disabled, .optgroup").addClass("selected")
                                                                                                        }),
                                                                                                        1 == s.filter(".selected").length && e.addClass("first")
                                                                                        }
                                                                                        P.prop("selected", !1),
                                                                                                s.filter(".selected").each(function () {
                                                                                                        var t = N(this),
                                                                                                                e = t.index();
                                                                                                        t.is(".option") && (e -= t.prevAll(".optgroup").length),
                                                                                                                P.eq(e).prop("selected", !0)
                                                                                                }),
                                                                                                O.change()
                                                                                }), P.each(function (t) {
                                                                                        N(this).data("optionIndex", t)
                                                                                }), O.on("change.styler", function () {
                                                                                        s.removeClass("selected");
                                                                                        var e = [];
                                                                                        P.filter(":selected").each(function () {
                                                                                                e.push(N(this).data("optionIndex"))
                                                                                        }),
                                                                                                s.not(".optgroup").filter(function (t) {
                                                                                                        return -1 < N.inArray(t, e)
                                                                                                }).addClass("selected")
                                                                                }).on("focus.styler", function () {
                                                                                        e.addClass("focused")
                                                                                }).on("blur.styler", function () {
                                                                                        e.removeClass("focused")
                                                                                }), n > e.height() && O.on("keydown.styler", function (t) {
                                                                                        38 != t.which && 37 != t.which && 33 != t.which || i.scrollTop(i.scrollTop() + s.filter(".selected").position().top - a),
                                                                                                40 != t.which && 39 != t.which && 34 != t.which || i.scrollTop(i.scrollTop() + s.filter(".selected:last").position().top - i.innerHeight() + 2 * a)
                                                                                }))
                                                                }()
                                                } else !
                                                        function () {
                                                                var t = new F,
                                                                        e = "",
                                                                        i = O.data("placeholder"),
                                                                        o = O.data("search"),
                                                                        s = O.data("search-limit"),
                                                                        n = O.data("search-not-found"),
                                                                        a = O.data("search-placeholder"),
                                                                        l = O.data("smart-positioning");
                                                                void 0 === i && (i = D.selectPlaceholder),
                                                                        void 0 !== o && "" !== o || (o = D.selectSearch),
                                                                        void 0 !== s && "" !== s || (s = D.selectSearchLimit),
                                                                        void 0 !== n && "" !== n || (n = D.selectSearchNotFound),
                                                                        void 0 === a && (a = D.selectSearchPlaceholder),
                                                                        void 0 !== l && "" !== l || (l = D.selectSmartPositioning);
                                                                var c = N('<div class="jq-selectbox jqselect"><div class="jq-selectbox__select"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>').attr({
                                                                        id: t.id,
                                                                        title: t.title
                                                                }).addClass(t.classes).data(t.data);
                                                                O.after(c).prependTo(c);
                                                                var d = c.css("z-index");
                                                                d = 0 < d ? d : 1;
                                                                var r = N("div.jq-selectbox__select", c),
                                                                        h = N("div.jq-selectbox__select-text", c),
                                                                        p = P.filter(":selected");
                                                                E(),
                                                                        o && (e = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + a + '"></div><div class="jq-selectbox__not-found">' + n + "</div>");
                                                                var u = N('<div class="jq-selectbox__dropdown">' + e + "<ul>" + I + "</ul></div>");
                                                                c.append(u);
                                                                var f = N("ul", u),
                                                                        m = N("li", u),
                                                                        g = N("input", u),
                                                                        v = N("div.jq-selectbox__not-found", u).hide();
                                                                m.length < s && g.parent().hide(),
                                                                        "" === P.first().text() && P.first().is(":selected") && !1 !== i ? h.text(i).addClass("placeholder") : h.text(p.text());
                                                                var b = 0,
                                                                        y = 0;
                                                                if (m.css({
                                                                        display: "inline-block"
                                                                }), m.each(function () {
                                                                        var t = N(this);
                                                                        t.innerWidth() > b && (b = t.innerWidth(), y = t.width())
                                                                }), m.css({
                                                                        display: ""
                                                                }), h.is(".placeholder") && h.width() > b) h.width(h.width());
                                                                else {
                                                                        var w = c.clone().appendTo("body").width("auto"),
                                                                                x = w.outerWidth();
                                                                        w.remove(),
                                                                                x == c.outerWidth() && h.width(y)
                                                                }
                                                                b > c.width() && u.width(b),
                                                                        "" === P.first().text() && "" !== O.data("placeholder") && m.first().hide();
                                                                var _ = c.outerHeight(!0),
                                                                        C = g.parent().outerHeight(!0) || 0,
                                                                        S = f.css("max-height"),
                                                                        T = m.filter(".selected");
                                                                if (T.length < 1 && m.first().addClass("selected sel"), void 0 === m.data("li-height")) {
                                                                        var k = m.outerHeight();
                                                                        !1 !== i && (k = m.eq(1).outerHeight()),
                                                                                m.data("li-height", k)
                                                                }
                                                                var $ = u.css("top");
                                                                if ("auto" == u.css("left") && u.css({
                                                                        left: 0
                                                                }), "auto" == u.css("top") && (u.css({
                                                                        top: _
                                                                }), $ = _), u.hide(), T.length && (P.first().text() != p.text() && c.addClass("changed"), c.data("jqfs-class", T.data("jqfs-class")), c.addClass(T.data("jqfs-class"))), O.is(":disabled")) c.addClass("disabled");
                                                                else {
                                                                        r.click(function () {
                                                                                if (N("div.jq-selectbox").filter(".opened").length && D.onSelectClosed.call(N("div.jq-selectbox").filter(".opened")), O.focus(), !M) {
                                                                                        var e = N(window),
                                                                                                i = m.data("li-height"),
                                                                                                o = c.offset().top,
                                                                                                s = e.height() - _ - (o - e.scrollTop()),
                                                                                                t = O.data("visible-options");
                                                                                        void 0 !== t && "" !== t || (t = D.selectVisibleOptions);
                                                                                        var n = 5 * i,
                                                                                                a = i * t;
                                                                                        0 < t && t < 6 && (n = a),
                                                                                                0 === t && (a = "auto");
                                                                                        var r = function () {
                                                                                                u.height("auto").css({
                                                                                                        bottom: "auto",
                                                                                                        top: $
                                                                                                });

                                                                                                function t() {
                                                                                                        f.css("max-height", Math.floor((s - 20 - C) / i) * i)
                                                                                                }
                                                                                                t(),
                                                                                                        f.css("max-height", a),
                                                                                                        "none" != S && f.css("max-height", S),
                                                                                                        s < u.outerHeight() + 20 && t()
                                                                                        };
                                                                                        !0 === l || 1 === l ? n + C + 20 < s ? (r(), c.removeClass("dropup").addClass("dropdown")) : (function () {
                                                                                                u.height("auto").css({
                                                                                                        top: "auto",
                                                                                                        bottom: $
                                                                                                });

                                                                                                function t() {
                                                                                                        f.css("max-height", Math.floor((o - e.scrollTop() - 20 - C) / i) * i)
                                                                                                }
                                                                                                t(),
                                                                                                        f.css("max-height", a),
                                                                                                        "none" != S && f.css("max-height", S),
                                                                                                        o - e.scrollTop() - 20 < u.outerHeight() + 20 && t()
                                                                                        }(), c.removeClass("dropdown").addClass("dropup")) : !1 === l || 0 === l ? n + C + 20 < s && (r(), c.removeClass("dropup").addClass("dropdown")) : (u.height("auto").css({
                                                                                                bottom: "auto",
                                                                                                top: $
                                                                                        }), f.css("max-height", a), "none" != S && f.css("max-height", S)),
                                                                                                c.offset().left + u.outerWidth() > e.width() && u.css({
                                                                                                        left: "auto",
                                                                                                        right: 0
                                                                                                }),
                                                                                                N("div.jqselect").css({
                                                                                                        zIndex: d - 1
                                                                                                }).removeClass("opened"),
                                                                                                c.css({
                                                                                                        zIndex: d
                                                                                                }),
                                                                                                u.is(":hidden") ? (N("div.jq-selectbox__dropdown:visible").hide(), u.show(), c.addClass("opened focused"), D.onSelectOpened.call(c)) : (u.hide(), c.removeClass("opened dropup dropdown"), N("div.jq-selectbox").filter(".opened").length && D.onSelectClosed.call(c)),
                                                                                                g.length && (g.val("").keyup(), v.hide(), g.keyup(function () {
                                                                                                        var t = N(this).val();
                                                                                                        m.each(function () {
                                                                                                                N(this).html().match(new RegExp(".*?" + t + ".*?", "i")) ? N(this).show() : N(this).hide()
                                                                                                        }),
                                                                                                                "" === P.first().text() && "" !== O.data("placeholder") && m.first().hide(),
                                                                                                                m.filter(":visible").length < 1 ? v.show() : v.hide()
                                                                                                })),
                                                                                                m.filter(".selected").length && ("" === O.val() ? f.scrollTop(0) : (f.innerHeight() / i % 2 != 0 && (i /= 2), f.scrollTop(f.scrollTop() + m.filter(".selected").position().top - f.innerHeight() / 2 + i))),
                                                                                                A(f)
                                                                                }
                                                                        }),
                                                                                m.hover(function () {
                                                                                        N(this).siblings().removeClass("selected")
                                                                                });
                                                                        m.filter(".selected").text();
                                                                        m.filter(":not(.disabled):not(.optgroup)").click(function () {
                                                                                O.focus();
                                                                                var t = N(this),
                                                                                        e = t.text();
                                                                                if (!t.is(".selected")) {
                                                                                        var i = t.index();
                                                                                        i -= t.prevAll(".optgroup").length,
                                                                                                t.addClass("selected sel").siblings().removeClass("selected sel"),
                                                                                                P.prop("selected", !1).eq(i).prop("selected", !0),
                                                                                                h.text(e),
                                                                                                c.data("jqfs-class") && c.removeClass(c.data("jqfs-class")),
                                                                                                c.data("jqfs-class", t.data("jqfs-class")),
                                                                                                c.addClass(t.data("jqfs-class")),
                                                                                                O.change()
                                                                                }
                                                                                u.hide(),
                                                                                        c.removeClass("opened dropup dropdown"),
                                                                                        D.onSelectClosed.call(c)
                                                                        }),
                                                                                u.mouseout(function () {
                                                                                        N("li.sel", u).addClass("selected")
                                                                                }),
                                                                                O.on("change.styler", function () {
                                                                                        h.text(P.filter(":selected").text()).removeClass("placeholder"),
                                                                                                m.removeClass("selected sel").not(".optgroup").eq(O[0].selectedIndex).addClass("selected sel"),
                                                                                                P.first().text() != m.filter(".selected").text() ? c.addClass("changed") : c.removeClass("changed")
                                                                                }).on("focus.styler", function () {
                                                                                        c.addClass("focused"),
                                                                                                N("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide()
                                                                                }).on("blur.styler", function () {
                                                                                        c.removeClass("focused")
                                                                                }).on("keydown.styler keyup.styler", function (t) {
                                                                                        var e = m.data("li-height");
                                                                                        "" === O.val() ? h.text(i).addClass("placeholder") : h.text(P.filter(":selected").text()),
                                                                                                m.removeClass("selected sel").not(".optgroup").eq(O[0].selectedIndex).addClass("selected sel"),
                                                                                                38 != t.which && 37 != t.which && 33 != t.which && 36 != t.which || ("" === O.val() ? f.scrollTop(0) : f.scrollTop(f.scrollTop() + m.filter(".selected").position().top)),
                                                                                                40 != t.which && 39 != t.which && 34 != t.which && 35 != t.which || f.scrollTop(f.scrollTop() + m.filter(".selected").position().top - f.innerHeight() + e),
                                                                                                13 == t.which && (t.preventDefault(), u.hide(), c.removeClass("opened dropup dropdown"), D.onSelectClosed.call(c))
                                                                                }).on("keydown.styler", function (t) {
                                                                                        32 == t.which && (t.preventDefault(), r.click())
                                                                                }),
                                                                                R.registered || (N(document).on("click", R), R.registered = !0)
                                                                }
                                                        }()
                                        };
                                        n(),
                                                O.on("refresh", function () {
                                                        O.off(".styler").parent().before(O).remove(),
                                                                n()
                                                })
                                } else O.is(":reset") && O.on("click", function () {
                                        setTimeout(function () {
                                                O.closest("form").find("input, select").trigger("refresh")
                                        }, 1)
                                })
                        },
                        destroy: function () {
                                var t = N(this.element);
                                t.is(":checkbox") || t.is(":radio") ? (t.removeData("_" + s).off(".styler refresh").removeAttr("style").parent().before(t).remove(), t.closest("label").add('label[for="' + t.attr("id") + '"]').off(".styler")) : t.is('input[type="number"]') ? t.removeData("_" + s).off(".styler refresh").closest(".jq-number").before(t).remove() : (t.is(":file") || t.is("select")) && t.removeData("_" + s).off(".styler refresh").removeAttr("style").parent().before(t).remove()
                        }
                },
                        N.fn[s] = function (e) {
                                var i, o = arguments;
                                return void 0 === e || "object" == typeof e ? (this.each(function () {
                                        N.data(this, "_" + s) || N.data(this, "_" + s, new n(this, e))
                                }).promise().done(function () {
                                        var t = N(this[0]).data("_" + s);
                                        t && t.options.onFormStyled.call()
                                }), this) : "string" == typeof e && "_" !== e[0] && "init" !== e ? (this.each(function () {
                                        var t = N.data(this, "_" + s);
                                        t instanceof n && "function" == typeof t[e] && (i = t[e].apply(t, Array.prototype.slice.call(o, 1)))
                                }), void 0 !== i ? i : this) : void 0
                        },
                        R.registered = !1
        }),


        function (p) {
                "use strict";
                var u = null,
                        f = null;
                !
                        function () {
                                var t, s, n, a, r, e = ["webkit", "moz", "o", "ms"],
                                        i = p.document.createElement("div"),
                                        o = -1;
                                for (o = 0; o < e.length && !p.requestAnimationFrame; o++) p.requestAnimationFrame = p[e[o] + "RequestAnimationFrame"];

                                function l() { }
                                void 0 === i.nextElementSibling && Object.defineProperty(p.Element.prototype, "nextElementSibling", {
                                        get: function () {
                                                for (var t = this.nextSibling; t;) {
                                                        if (1 === t.nodeType) return t;
                                                        t = t.nextSibling
                                                }
                                                return null
                                        }
                                }),
                                        (t = p.Element.prototype).matches = t.matches || t.machesSelector || t.mozMatchesSelector || t.msMatchesSelector || t.oMatchesSelector || t.webkitMatchesSelector ||
                                        function (t) {
                                                return -1 < Array.prototype.indexOf.call(this.parentElement.querySelectorAll(t), this)
                                        },
                                        Object.keys || (Object.keys = (r = Object.prototype.hasOwnProperty, s = !{
                                                toString: null
                                        }.propertyIsEnumerable("toString"), a = (n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]).length, function (t) {
                                                var e = [],
                                                        i = "",
                                                        o = -1;
                                                if ("object" != typeof t && ("function" != typeof t || null === t)) throw new TypeError("Object.keys called on non-object");
                                                for (i in t) r.call(t, i) && e.push(i);
                                                if (s) for (o = 0; o < a; o++) r.call(t, n[o]) && e.push(n[o]);
                                                return e
                                        })),
                                        Array.isArray || (Array.isArray = function (t) {
                                                return "[object Array]" === Object.prototype.toString.call(t)
                                        }),
                                        "function" != typeof Object.create && (Object.create = function (t, e) {
                                                if (t !== Object(t) && null !== t) throw TypeError("Argument must be an object, or null");
                                                l.prototype = t || {};
                                                var i = new l;
                                                return l.prototype = null,
                                                        void 0 !== e && Object.defineProperties(i, e),
                                                        null === t && (i.__proto__ = null),
                                                        i
                                        }),
                                        String.prototype.trim || (String.prototype.trim = function () {
                                                return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                                        }),
                                        Array.prototype.indexOf || (Array.prototype.indexOf = function (t) {
                                                var e, i, o, s;
                                                if (null === this) throw new TypeError;
                                                if (0 == (s = (o = Object(this)).length >>> 0)) return -1;
                                                if (e = 0, 1 < arguments.length && ((e = Number(arguments[1])) != e ? e = 0 : 0 !== e && e !== 1 / 0 && e !== -1 / 0 && (e = (0 < e || -1) * Math.floor(Math.abs(e)))), s <= e) return -1;
                                                for (i = 0 <= e ? e : Math.max(s - Math.abs(e), 0); i < s; i++) if (i in o && o[i] === t) return i;
                                                return -1
                                        }),
                                        Function.prototype.bind || (Function.prototype.bind = function (t) {
                                                var e, i, o, s;
                                                if ("function" != typeof this) throw new TypeError;
                                                return e = Array.prototype.slice.call(arguments, 1),
                                                        o = function () { },
                                                        s = function () {
                                                                return i.apply(this instanceof o ? this : t, e.concat(Array.prototype.slice.call(arguments)))
                                                        },
                                                        (i = this).prototype && (o.prototype = this.prototype),
                                                        s.prototype = new o,
                                                        s
                                        }),
                                        p.Element.prototype.dispatchEvent || (p.Element.prototype.dispatchEvent = function (t) {
                                                try {
                                                        return this.fireEvent("on" + t.type, t)
                                                } catch (t) { }
                                        })
                        }(),
                        (u = function (t, e, i) {
                                var o = null,
                                        s = !1,
                                        n = null,
                                        a = null,
                                        r = null,
                                        l = [],
                                        c = "",
                                        d = [],
                                        h = -1;
                                if (r = i || p.document, (s = arguments[3]) && (s = "boolean" == typeof s), "string" == typeof t) d = r.querySelectorAll(t);
                                else if (t && "object" == typeof t && f.isElement(t, r)) d = [t];
                                else {
                                        if (!t || "object" != typeof t || !t.length) throw new Error(u.messages.errorFactoryInvalidContainer());
                                        d = t
                                }
                                if (d.length < 1) throw new Error(u.messages.errorFactoryContainerNotFound());
                                for (h = 0;
                                        (o = d[h]) && (!(0 < h) || s); h++) o.id ? c = o.id : (c = "MixItUp" + f.randomHex(), o.id = c),
                                                u.instances[c] instanceof u.Mixer ? (n = u.instances[c], (!e || e && e.debug && !1 !== e.debug.showWarnings) && console.warn(u.messages.warningFactoryPreexistingInstance())) : ((n = new u.Mixer).attach(o, r, c, e), u.instances[c] = n),
                                                a = new u.Facade(n),
                                                e && e.debug && e.debug.enable ? l.push(n) : l.push(a);
                                return s ? new u.Collection(l) : l[0]
                        }).use = function (t) {
                                u.Base.prototype.callActions.call(u, "beforeUse", arguments),
                                        "function" == typeof t && "mixitup-extension" === t.TYPE ? void 0 === u.extensions[t.NAME] && (t(u), u.extensions[t.NAME] = t) : t.fn && t.fn.jquery && (u.libraries.$ = t),
                                        u.Base.prototype.callActions.call(u, "afterUse", arguments)
                        },
                        u.instances = {},
                        u.extensions = {},
                        u.libraries = {},
                        f = {
                                hasClass: function (t, e) {
                                        return !!t.className.match(new RegExp("(\\s|^)" + e + "(\\s|$)"))
                                },
                                addClass: function (t, e) {
                                        this.hasClass(t, e) || (t.className += t.className ? " " + e : e)
                                },
                                removeClass: function (t, e) {
                                        if (this.hasClass(t, e)) {
                                                var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
                                                t.className = t.className.replace(i, " ").trim()
                                        }
                                },
                                extend: function (e, t, i, o) {
                                        var s = [],
                                                n = "",
                                                a = -1;
                                        i = i || !1,
                                                o = o || !1;
                                        try {
                                                if (Array.isArray(t)) for (a = 0; a < t.length; a++) s.push(a);
                                                else t && (s = Object.keys(t));
                                                for (a = 0; a < s.length; a++) n = s[a],
                                                        !i || "object" != typeof t[n] || this.isElement(t[n]) ? e[n] = t[n] : (Array.isArray(t[n]) ? e[n] || (e[n] = []) : e[n] || (e[n] = {}), this.extend(e[n], t[n], i, o))
                                        } catch (t) {
                                                if (!o) throw t;
                                                this.handleExtendError(t, e)
                                        }
                                        return e
                                },
                                handleExtendError: function (t, e) {
                                        var i = null,
                                                o = "",
                                                s = "",
                                                n = "",
                                                a = "",
                                                r = "",
                                                l = -1,
                                                c = -1;
                                        if (t instanceof TypeError && (i = /property "?(\w*)"?[,:] object/i.exec(t.message))) {
                                                for (r in o = i[1], e) {
                                                        for (c = 0; c < o.length && o.charAt(c) === r.charAt(c);) c++;
                                                        l < c && (l = c, a = r)
                                                }
                                                throw 1 < l && (n = u.messages.errorConfigInvalidPropertySuggestion({
                                                        probableMatch: a
                                                })),
                                                s = u.messages.errorConfigInvalidProperty({
                                                        erroneous: o,
                                                        suggestion: n
                                                }),
                                                new TypeError(s)
                                        }
                                        throw t
                                },
                                template: function (o) {
                                        for (var t = /\${([\w]*)}/g, s = {}, e = null; e = t.exec(o);) s[e[1]] = new RegExp("\\${" + e[1] + "}", "g");
                                        return function (t) {
                                                var e = "",
                                                        i = o;
                                                for (e in t = t || {}, s) i = i.replace(s[e], void 0 !== t[e] ? t[e] : "");
                                                return i
                                        }
                                },
                                on: function (t, e, i, o) {
                                        t && (t.addEventListener ? t.addEventListener(e, i, o) : t.attachEvent && (t["e" + e + i] = i, t[e + i] = function () {
                                                t["e" + e + i](p.event)
                                        }, t.attachEvent("on" + e, t[e + i])))
                                },
                                off: function (t, e, i) {
                                        t && (t.removeEventListener ? t.removeEventListener(e, i, !1) : t.detachEvent && (t.detachEvent("on" + e, t[e + i]), t[e + i] = null))
                                },
                                getCustomEvent: function (t, e, i) {
                                        var o = null;
                                        return i = i || p.document,
                                                "function" == typeof p.CustomEvent ? o = new p.CustomEvent(t, {
                                                        detail: e,
                                                        bubbles: !0,
                                                        cancelable: !0
                                                }) : "function" == typeof i.createEvent ? (o = i.createEvent("CustomEvent")).initCustomEvent(t, !0, !0, e) : ((o = i.createEventObject()).type = t, o.returnValue = !1, o.cancelBubble = !1, o.detail = e),
                                                o
                                },
                                getOriginalEvent: function (t) {
                                        return t.touches && t.touches.length ? t.touches[0] : t.changedTouches && t.changedTouches.length ? t.changedTouches[0] : t
                                },
                                index: function (t, e) {
                                        for (var i = 0; null !== (t = t.previousElementSibling);) e && !t.matches(e) || ++i;
                                        return i
                                },
                                camelCase: function (t) {
                                        return t.toLowerCase().replace(/([_-][a-z])/g, function (t) {
                                                return t.toUpperCase().replace(/[_-]/, "")
                                        })
                                },
                                pascalCase: function (t) {
                                        return (t = this.camelCase(t)).charAt(0).toUpperCase() + t.slice(1)
                                },
                                dashCase: function (t) {
                                        return t.replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase()
                                },
                                isElement: function (t, e) {
                                        return e = e || p.document,
                                                !!(p.HTMLElement && t instanceof p.HTMLElement) || (!!(e.defaultView && e.defaultView.HTMLElement && t instanceof e.defaultView.HTMLElement) || null !== t && 1 === t.nodeType && "string" == typeof t.nodeName)
                                },
                                createElement: function (t, e) {
                                        var i = null,
                                                o = null;
                                        for (i = (e = e || p.document).createDocumentFragment(), (o = e.createElement("div")).innerHTML = t.trim(); o.firstChild;) i.appendChild(o.firstChild);
                                        return i
                                },
                                removeWhitespace: function (t) {
                                        for (var e; t && "#text" === t.nodeName;) t = (e = t).previousSibling,
                                                e.parentElement && e.parentElement.removeChild(e)
                                },
                                isEqualArray: function (t, e) {
                                        var i = t.length;
                                        if (i !== e.length) return !1;
                                        for (; i--;) if (t[i] !== e[i]) return !1;
                                        return !0
                                },
                                deepEquals: function (t, e) {
                                        var i;
                                        if ("object" == typeof t && t && "object" == typeof e && e) {
                                                if (Object.keys(t).length !== Object.keys(e).length) return !1;
                                                for (i in t) if (!e.hasOwnProperty(i) || !this.deepEquals(t[i], e[i])) return !1
                                        } else if (t !== e) return !1;
                                        return !0
                                },
                                arrayShuffle: function (t) {
                                        for (var e = t.slice(), i = e.length, o = i, s = -1, n = []; o--;) s = ~~(Math.random() * i),
                                                n = e[o],
                                                e[o] = e[s],
                                                e[s] = n;
                                        return e
                                },
                                arrayFromList: function (e) {
                                        var i, o;
                                        try {
                                                return Array.prototype.slice.call(e)
                                        } catch (t) {
                                                for (i = [], o = 0; o < e.length; o++) i.push(e[o]);
                                                return i
                                        }
                                },
                                debounce: function (s, n, a) {
                                        var r;
                                        return function () {
                                                var t, e = this,
                                                        i = arguments,
                                                        o = a && !r;
                                                t = function () {
                                                        r = null,
                                                                a || s.apply(e, i)
                                                },
                                                        clearTimeout(r),
                                                        r = setTimeout(t, n),
                                                        o && s.apply(e, i)
                                        }
                                },
                                position: function (t) {
                                        for (var e = 0, i = 0, o = t; t;) e -= t.scrollLeft,
                                                i -= t.scrollTop,
                                                t === o && (e += t.offsetLeft, i += t.offsetTop, o = t.offsetParent),
                                                t = t.parentElement;
                                        return {
                                                x: e,
                                                y: i
                                        }
                                },
                                getHypotenuse: function (t, e) {
                                        var i = t.x - e.x,
                                                o = t.y - e.y;
                                        return i = i < 0 ? -1 * i : i,
                                                o = o < 0 ? -1 * o : o,
                                                Math.sqrt(Math.pow(i, 2) + Math.pow(o, 2))
                                },
                                getIntersectionRatio: function (t, e) {
                                        var i, o = t.width * t.height;
                                        return i = Math.max(0, Math.min(t.left + t.width, e.left + e.width) - Math.max(t.left, e.left)),
                                                Math.max(0, Math.min(t.top + t.height, e.top + e.height) - Math.max(t.top, e.top)) * i / o
                                },
                                closestParent: function (t, e, i, o) {
                                        var s = t.parentNode;
                                        if (o = o || p.document, i && t.matches(e)) return t;
                                        for (; s && s != o.body;) {
                                                if (s.matches && s.matches(e)) return s;
                                                if (!s.parentNode) return null;
                                                s = s.parentNode
                                        }
                                        return null
                                },
                                children: function (t, e, i) {
                                        var o = [],
                                                s = "";
                                        return i = i || p.doc,
                                                t && (t.id || (s = "Temp" + this.randomHexKey(), t.id = s), o = i.querySelectorAll("#" + t.id + " > " + e), s && t.removeAttribute("id")),
                                                o
                                },
                                clean: function (t) {
                                        var e = [],
                                                i = -1;
                                        for (i = 0; i < t.length; i++)"" !== t[i] && e.push(t[i]);
                                        return e
                                },
                                defer: function (t) {
                                        var e = null,
                                                i = null,
                                                o = null;
                                        return i = new this.Deferred,
                                                u.features.has.promises ? i.promise = new Promise(function (t, e) {
                                                        i.resolve = t,
                                                                i.reject = e
                                                }) : (o = p.jQuery || t.$) && "function" == typeof o.Deferred ? (e = o.Deferred(), i.promise = e.promise(), i.resolve = e.resolve, i.reject = e.reject) : p.console && console.warn(u.messages.warningNoPromiseImplementation()),
                                                i
                                },
                                all: function (t, e) {
                                        var i = null;
                                        return u.features.has.promises ? Promise.all(t) : (i = p.jQuery || e.$) && "function" == typeof i.when ? i.when.apply(i, t).done(function () {
                                                return arguments
                                        }) : (p.console && console.warn(u.messages.warningNoPromiseImplementation()), [])
                                },
                                getPrefix: function (t, e, i) {
                                        var o = -1,
                                                s = "";
                                        if (f.dashCase(e) in t.style) return "";
                                        for (o = 0; s = i[o]; o++) if (s + e in t.style) return s.toLowerCase();
                                        return "unsupported"
                                },
                                randomHex: function () {
                                        return ("00000" + (16777216 * Math.random() << 0).toString(16)).substr(-6).toUpperCase()
                                },
                                getDocumentState: function (t) {
                                        return t = "object" == typeof t.body ? t : p.document,
                                        {
                                                scrollTop: p.pageYOffset,
                                                scrollLeft: p.pageXOffset,
                                                docHeight: t.documentElement.scrollHeight,
                                                docWidth: t.documentElement.scrollWidth,
                                                viewportHeight: t.documentElement.clientHeight,
                                                viewportWidth: t.documentElement.clientWidth
                                        }
                                },
                                bind: function (t, e) {
                                        return function () {
                                                return e.apply(t, arguments)
                                        }
                                },
                                isVisible: function (t) {
                                        var e;
                                        return !!t.offsetParent || "fixed" === (e = p.getComputedStyle(t)).position && "hidden" !== e.visibility && "0" !== e.opacity
                                },
                                seal: function (t) {
                                        "function" == typeof Object.seal && Object.seal(t)
                                },
                                freeze: function (t) {
                                        "function" == typeof Object.freeze && Object.freeze(t)
                                },
                                compareVersions: function (t, e) {
                                        var i = t.split("."),
                                                o = e.split("."),
                                                s = -1,
                                                n = -1,
                                                a = -1;
                                        for (a = 0; a < i.length; a++) {
                                                if (s = parseInt(i[a].replace(/[^\d.]/g, "")), (n = parseInt(o[a].replace(/[^\d.]/g, "") || 0)) < s) return !1;
                                                if (s < n) return !0
                                        }
                                        return !0
                                },
                                Deferred: function () {
                                        this.promise = null,
                                                this.resolve = null,
                                                this.reject = null,
                                                this.id = f.randomHex()
                                },
                                isEmptyObject: function (t) {
                                        var e = "";
                                        if ("function" == typeof Object.keys) return 0 === Object.keys(t).length;
                                        for (e in t) if (t.hasOwnProperty(e)) return !1;
                                        return !0
                                },
                                getClassname: function (t, e, i) {
                                        var o = "";
                                        return (o += t.block).length && (o += t.delineatorElement),
                                                o += t["element" + this.pascalCase(e)],
                                                i ? (o.length && (o += t.delineatorModifier), o += i) : o
                                },
                                getProperty: function (t, e) {
                                        var i, o = e.split("."),
                                                s = "",
                                                n = 0;
                                        if (!e) return t;
                                        for (i = function (t) {
                                                return t ? t[s] : null
                                        }; n < o.length;) s = o[n],
                                                t = i(t),
                                                n++;
                                        return void 0 !== t ? t : null
                                }
                        },
                        u.h = f,
                        u.Base = function () { },
                        u.Base.prototype = {
                                constructor: u.Base,
                                callActions: function (t, e) {
                                        var i = this.constructor.actions[t],
                                                o = "";
                                        if (i && !f.isEmptyObject(i)) for (o in i) i[o].apply(this, e)
                                },
                                callFilters: function (t, e, i) {
                                        var o = this.constructor.filters[t],
                                                s = e,
                                                n = "";
                                        if (!o || f.isEmptyObject(o)) return s;
                                        for (n in i = i || [], o) (i = f.arrayFromList(i)).unshift(s),
                                                s = o[n].apply(this, i);
                                        return s
                                }
                        },
                        u.BaseStatic = function () {
                                this.actions = {},
                                        this.filters = {},
                                        this.extend = function (t) {
                                                f.extend(this.prototype, t)
                                        },
                                        this.registerAction = function (t, e, i) {
                                                (this.actions[t] = this.actions[t] || {})[e] = i
                                        },
                                        this.registerFilter = function (t, e, i) {
                                                (this.filters[t] = this.filters[t] || {})[e] = i
                                        }
                        },
                        u.Features = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.boxSizingPrefix = "",
                                        this.transformPrefix = "",
                                        this.transitionPrefix = "",
                                        this.boxSizingPrefix = "",
                                        this.transformProp = "",
                                        this.transformRule = "",
                                        this.transitionProp = "",
                                        this.perspectiveProp = "",
                                        this.perspectiveOriginProp = "",
                                        this.has = new u.Has,
                                        this.canary = null,
                                        this.BOX_SIZING_PROP = "boxSizing",
                                        this.TRANSITION_PROP = "transition",
                                        this.TRANSFORM_PROP = "transform",
                                        this.PERSPECTIVE_PROP = "perspective",
                                        this.PERSPECTIVE_ORIGIN_PROP = "perspectiveOrigin",
                                        this.VENDORS = ["Webkit", "moz", "O", "ms"],
                                        this.TWEENABLE = ["opacity", "width", "height", "marginRight", "marginBottom", "x", "y", "scale", "translateX", "translateY", "translateZ", "rotateX", "rotateY", "rotateZ"],
                                        this.callActions("afterConstruct")
                        },
                        u.BaseStatic.call(u.Features),
                        u.Features.prototype = Object.create(u.Base.prototype),
                        f.extend(u.Features.prototype, {
                                constructor: u.Features,
                                init: function () {
                                        var t = this;
                                        t.callActions("beforeInit", arguments),
                                                t.canary = document.createElement("div"),
                                                t.setPrefixes(),
                                                t.runTests(),
                                                t.callActions("beforeInit", arguments)
                                },
                                runTests: function () {
                                        var t = this;
                                        t.callActions("beforeRunTests", arguments),
                                                t.has.promises = "function" == typeof p.Promise,
                                                t.has.transitions = "unsupported" !== t.transitionPrefix,
                                                t.callActions("afterRunTests", arguments),
                                                f.freeze(t.has)
                                },
                                setPrefixes: function () {
                                        var t = this;
                                        t.callActions("beforeSetPrefixes", arguments),
                                                t.transitionPrefix = f.getPrefix(t.canary, "Transition", t.VENDORS),
                                                t.transformPrefix = f.getPrefix(t.canary, "Transform", t.VENDORS),
                                                t.boxSizingPrefix = f.getPrefix(t.canary, "BoxSizing", t.VENDORS),
                                                t.boxSizingProp = t.boxSizingPrefix ? t.boxSizingPrefix + f.pascalCase(t.BOX_SIZING_PROP) : t.BOX_SIZING_PROP,
                                                t.transitionProp = t.transitionPrefix ? t.transitionPrefix + f.pascalCase(t.TRANSITION_PROP) : t.TRANSITION_PROP,
                                                t.transformProp = t.transformPrefix ? t.transformPrefix + f.pascalCase(t.TRANSFORM_PROP) : t.TRANSFORM_PROP,
                                                t.transformRule = t.transformPrefix ? "-" + t.transformPrefix + "-" + t.TRANSFORM_PROP : t.TRANSFORM_PROP,
                                                t.perspectiveProp = t.transformPrefix ? t.transformPrefix + f.pascalCase(t.PERSPECTIVE_PROP) : t.PERSPECTIVE_PROP,
                                                t.perspectiveOriginProp = t.transformPrefix ? t.transformPrefix + f.pascalCase(t.PERSPECTIVE_ORIGIN_PROP) : t.PERSPECTIVE_ORIGIN_PROP,
                                                t.callActions("afterSetPrefixes", arguments)
                                }
                        }),
                        u.Has = function () {
                                this.transitions = !1,
                                        this.promises = !1,
                                        f.seal(this)
                        },
                        u.features = new u.Features,
                        u.features.init(),
                        u.ConfigAnimation = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.enable = !0,
                                        this.effects = "fade scale",
                                        this.effectsIn = "",
                                        this.effectsOut = "",
                                        this.duration = 600,
                                        this.easing = "ease",
                                        this.applyPerspective = !0,
                                        this.perspectiveDistance = "3000px",
                                        this.perspectiveOrigin = "50% 50%",
                                        this.queue = !0,
                                        this.queueLimit = 3,
                                        this.animateResizeContainer = !0,
                                        this.animateResizeTargets = !1,
                                        this.staggerSequence = null,
                                        this.reverseOut = !1,
                                        this.nudge = !0,
                                        this.clampHeight = !0,
                                        this.clampWidth = !0,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigAnimation),
                        u.ConfigAnimation.prototype = Object.create(u.Base.prototype),
                        u.ConfigAnimation.prototype.constructor = u.ConfigAnimation,
                        u.ConfigBehavior = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.liveSort = !1,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigBehavior),
                        u.ConfigBehavior.prototype = Object.create(u.Base.prototype),
                        u.ConfigBehavior.prototype.constructor = u.ConfigBehavior,
                        u.ConfigCallbacks = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.onMixStart = null,
                                        this.onMixBusy = null,
                                        this.onMixEnd = null,
                                        this.onMixFail = null,
                                        this.onMixClick = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigCallbacks),
                        u.ConfigCallbacks.prototype = Object.create(u.Base.prototype),
                        u.ConfigCallbacks.prototype.constructor = u.ConfigCallbacks,
                        u.ConfigControls = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.enable = !0,
                                        this.live = !1,
                                        this.scope = "global",
                                        this.toggleLogic = "or",
                                        this.toggleDefault = "all",
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigControls),
                        u.ConfigControls.prototype = Object.create(u.Base.prototype),
                        u.ConfigControls.prototype.constructor = u.ConfigControls,
                        u.ConfigClassNames = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.block = "mixitup",
                                        this.elementContainer = "container",
                                        this.elementFilter = "control",
                                        this.elementSort = "control",
                                        this.elementMultimix = "control",
                                        this.elementToggle = "control",
                                        this.modifierActive = "active",
                                        this.modifierDisabled = "disabled",
                                        this.modifierFailed = "failed",
                                        this.delineatorElement = "-",
                                        this.delineatorModifier = "-",
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigClassNames),
                        u.ConfigClassNames.prototype = Object.create(u.Base.prototype),
                        u.ConfigClassNames.prototype.constructor = u.ConfigClassNames,
                        u.ConfigData = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.uidKey = "",
                                        this.dirtyCheck = !1,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigData),
                        u.ConfigData.prototype = Object.create(u.Base.prototype),
                        u.ConfigData.prototype.constructor = u.ConfigData,
                        u.ConfigDebug = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.enable = !1,
                                        this.showWarnings = !0,
                                        this.fauxAsync = !1,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigDebug),
                        u.ConfigDebug.prototype = Object.create(u.Base.prototype),
                        u.ConfigDebug.prototype.constructor = u.ConfigDebug,
                        u.ConfigLayout = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.allowNestedTargets = !0,
                                        this.containerClassName = "",
                                        this.siblingBefore = null,
                                        this.siblingAfter = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigLayout),
                        u.ConfigLayout.prototype = Object.create(u.Base.prototype),
                        u.ConfigLayout.prototype.constructor = u.ConfigLayout,
                        u.ConfigLoad = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.filter = "all",
                                        this.sort = "default:asc",
                                        this.dataset = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigLoad),
                        u.ConfigLoad.prototype = Object.create(u.Base.prototype),
                        u.ConfigLoad.prototype.constructor = u.ConfigLoad,
                        u.ConfigSelectors = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.target = ".mix",
                                        this.control = "",
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigSelectors),
                        u.ConfigSelectors.prototype = Object.create(u.Base.prototype),
                        u.ConfigSelectors.prototype.constructor = u.ConfigSelectors,
                        u.ConfigRender = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.target = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigRender),
                        u.ConfigRender.prototype = Object.create(u.Base.prototype),
                        u.ConfigRender.prototype.constructor = u.ConfigRender,
                        u.ConfigTemplates = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ConfigTemplates),
                        u.ConfigTemplates.prototype = Object.create(u.Base.prototype),
                        u.ConfigTemplates.prototype.constructor = u.ConfigTemplates,
                        u.Config = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.animation = new u.ConfigAnimation,
                                        this.behavior = new u.ConfigBehavior,
                                        this.callbacks = new u.ConfigCallbacks,
                                        this.controls = new u.ConfigControls,
                                        this.classNames = new u.ConfigClassNames,
                                        this.data = new u.ConfigData,
                                        this.debug = new u.ConfigDebug,
                                        this.layout = new u.ConfigLayout,
                                        this.load = new u.ConfigLoad,
                                        this.selectors = new u.ConfigSelectors,
                                        this.render = new u.ConfigRender,
                                        this.templates = new u.ConfigTemplates,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.Config),
                        u.Config.prototype = Object.create(u.Base.prototype),
                        u.Config.prototype.constructor = u.Config,
                        u.MixerDom = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.document = null,
                                        this.body = null,
                                        this.container = null,
                                        this.parent = null,
                                        this.targets = [],
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.MixerDom),
                        u.MixerDom.prototype = Object.create(u.Base.prototype),
                        u.MixerDom.prototype.constructor = u.MixerDom,
                        u.UiClassNames = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.base = "",
                                        this.active = "",
                                        this.disabled = "",
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.UiClassNames),
                        u.UiClassNames.prototype = Object.create(u.Base.prototype),
                        u.UiClassNames.prototype.constructor = u.UiClassNames,
                        u.CommandDataset = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.dataset = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.CommandDataset),
                        u.CommandDataset.prototype = Object.create(u.Base.prototype),
                        u.CommandDataset.prototype.constructor = u.CommandDataset,
                        u.CommandMultimix = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.filter = null,
                                        this.sort = null,
                                        this.insert = null,
                                        this.remove = null,
                                        this.changeLayout = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.CommandMultimix),
                        u.CommandMultimix.prototype = Object.create(u.Base.prototype),
                        u.CommandMultimix.prototype.constructor = u.CommandMultimix,
                        u.CommandFilter = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.selector = "",
                                        this.collection = null,
                                        this.action = "show",
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.CommandFilter),
                        u.CommandFilter.prototype = Object.create(u.Base.prototype),
                        u.CommandFilter.prototype.constructor = u.CommandFilter,
                        u.CommandSort = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.sortString = "",
                                        this.attribute = "",
                                        this.order = "asc",
                                        this.collection = null,
                                        this.next = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.CommandSort),
                        u.CommandSort.prototype = Object.create(u.Base.prototype),
                        u.CommandSort.prototype.constructor = u.CommandSort,
                        u.CommandInsert = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.index = 0,
                                        this.collection = [],
                                        this.position = "before",
                                        this.sibling = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.CommandInsert),
                        u.CommandInsert.prototype = Object.create(u.Base.prototype),
                        u.CommandInsert.prototype.constructor = u.CommandInsert,
                        u.CommandRemove = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.targets = [],
                                        this.collection = [],
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.CommandRemove),
                        u.CommandRemove.prototype = Object.create(u.Base.prototype),
                        u.CommandRemove.prototype.constructor = u.CommandRemove,
                        u.CommandChangeLayout = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.containerClassName = "",
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.CommandChangeLayout),
                        u.CommandChangeLayout.prototype = Object.create(u.Base.prototype),
                        u.CommandChangeLayout.prototype.constructor = u.CommandChangeLayout,
                        u.ControlDefinition = function (t, e, i, o) {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.type = t,
                                        this.selector = e,
                                        this.live = i || !1,
                                        this.parent = o || "",
                                        this.callActions("afterConstruct"),
                                        f.freeze(this),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.ControlDefinition),
                        u.ControlDefinition.prototype = Object.create(u.Base.prototype),
                        u.ControlDefinition.prototype.constructor = u.ControlDefinition,
                        u.controlDefinitions = [],
                        u.controlDefinitions.push(new u.ControlDefinition("multimix", "[data-filter][data-sort]")),
                        u.controlDefinitions.push(new u.ControlDefinition("filter", "[data-filter]")),
                        u.controlDefinitions.push(new u.ControlDefinition("sort", "[data-sort]")),
                        u.controlDefinitions.push(new u.ControlDefinition("toggle", "[data-toggle]")),
                        u.Control = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.el = null,
                                        this.selector = "",
                                        this.bound = [],
                                        this.pending = -1,
                                        this.type = "",
                                        this.status = "inactive",
                                        this.filter = "",
                                        this.sort = "",
                                        this.canDisable = !1,
                                        this.handler = null,
                                        this.classNames = new u.UiClassNames,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.Control),
                        u.Control.prototype = Object.create(u.Base.prototype),
                        f.extend(u.Control.prototype, {
                                constructor: u.Control,
                                init: function (t, e, i) {
                                        var o = this;
                                        if (this.callActions("beforeInit", arguments), o.el = t, o.type = e, o.selector = i, o.selector) o.status = "live";
                                        else switch (o.canDisable = "boolean" == typeof o.el.disable, o.type) {
                                                case "filter":
                                                        o.filter = o.el.getAttribute("data-filter");
                                                        break;
                                                case "toggle":
                                                        o.filter = o.el.getAttribute("data-toggle");
                                                        break;
                                                case "sort":
                                                        o.sort = o.el.getAttribute("data-sort");
                                                        break;
                                                case "multimix":
                                                        o.filter = o.el.getAttribute("data-filter"),
                                                                o.sort = o.el.getAttribute("data-sort")
                                        }
                                        o.bindClick(),
                                                u.controls.push(o),
                                                this.callActions("afterInit", arguments)
                                },
                                isBound: function (t) {
                                        var e;
                                        return this.callActions("beforeIsBound", arguments),
                                                e = -1 < this.bound.indexOf(t),
                                                this.callFilters("afterIsBound", e, arguments)
                                },
                                addBinding: function (t) {
                                        this.callActions("beforeAddBinding", arguments),
                                                this.isBound() || this.bound.push(t),
                                                this.callActions("afterAddBinding", arguments)
                                },
                                removeBinding: function (t) {
                                        var e = this,
                                                i = -1;
                                        this.callActions("beforeRemoveBinding", arguments),
                                                -1 < (i = e.bound.indexOf(t)) && e.bound.splice(i, 1),
                                                e.bound.length < 1 && (e.unbindClick(), i = u.controls.indexOf(e), u.controls.splice(i, 1), "active" === e.status && e.renderStatus(e.el, "inactive")),
                                                this.callActions("afterRemoveBinding", arguments)
                                },
                                bindClick: function () {
                                        var e = this;
                                        this.callActions("beforeBindClick", arguments),
                                                e.handler = function (t) {
                                                        e.handleClick(t)
                                                },
                                                f.on(e.el, "click", e.handler),
                                                this.callActions("afterBindClick", arguments)
                                },
                                unbindClick: function () {
                                        this.callActions("beforeUnbindClick", arguments),
                                                f.off(this.el, "click", this.handler),
                                                this.handler = null,
                                                this.callActions("afterUnbindClick", arguments)
                                },
                                handleClick: function (t) {
                                        var e = this,
                                                i = null,
                                                o = null,
                                                s = !1,
                                                n = {},
                                                a = null,
                                                r = [],
                                                l = -1;
                                        if (this.callActions("beforeHandleClick", arguments), this.pending = 0, o = e.bound[0], i = e.selector ? f.closestParent(t.target, o.config.selectors.control + e.selector, !0, o.dom.document) : e.el) {
                                                switch (e.type) {
                                                        case "filter":
                                                                n.filter = e.filter || i.getAttribute("data-filter");
                                                                break;
                                                        case "sort":
                                                                n.sort = e.sort || i.getAttribute("data-sort");
                                                                break;
                                                        case "multimix":
                                                                n.filter = e.filter || i.getAttribute("data-filter"),
                                                                        n.sort = e.sort || i.getAttribute("data-sort");
                                                                break;
                                                        case "toggle":
                                                                n.filter = e.filter || i.getAttribute("data-toggle"),
                                                                        s = "live" === e.status ? f.hasClass(i, e.classNames.active) : "active" === e.status
                                                }
                                                for (l = 0; l < e.bound.length; l++) a = new u.CommandMultimix,
                                                        f.extend(a, n),
                                                        r.push(a);
                                                for (r = e.callFilters("commandsHandleClick", r, arguments), e.pending = e.bound.length, l = 0; o = e.bound[l]; l++)(n = r[l]) && (o.lastClicked || (o.lastClicked = i), u.events.fire("mixClick", o.dom.container, {
                                                        state: o.state,
                                                        instance: o,
                                                        originalEvent: t,
                                                        control: o.lastClicked
                                                }, o.dom.document), "function" == typeof o.config.callbacks.onMixClick && !1 === o.config.callbacks.onMixClick.call(o.lastClicked, o.state, t, o) || ("toggle" === e.type ? s ? o.toggleOff(n.filter) : o.toggleOn(n.filter) : o.multimix(n)));
                                                this.callActions("afterHandleClick", arguments)
                                        } else e.callActions("afterHandleClick", arguments)
                                },
                                update: function (t, e) {
                                        var i = this,
                                                o = new u.CommandMultimix;
                                        i.callActions("beforeUpdate", arguments),
                                                i.pending--,
                                                i.pending = Math.max(0, i.pending),
                                                0 < i.pending || ("live" === i.status ? i.updateLive(t, e) : (o.sort = i.sort, o.filter = i.filter, i.callFilters("actionsUpdate", o, arguments), i.parseStatusChange(i.el, t, o, e)), i.callActions("afterUpdate", arguments))
                                },
                                updateLive: function (t, e) {
                                        var i, o = this,
                                                s = null,
                                                n = null,
                                                a = -1;
                                        if (o.callActions("beforeUpdateLive", arguments), o.el) {
                                                for (i = o.el.querySelectorAll(o.selector), a = 0; n = i[a]; a++) {
                                                        switch (s = new u.CommandMultimix, o.type) {
                                                                case "filter":
                                                                        s.filter = n.getAttribute("data-filter");
                                                                        break;
                                                                case "sort":
                                                                        s.sort = n.getAttribute("data-sort");
                                                                        break;
                                                                case "multimix":
                                                                        s.filter = n.getAttribute("data-filter"),
                                                                                s.sort = n.getAttribute("data-sort");
                                                                        break;
                                                                case "toggle":
                                                                        s.filter = n.getAttribute("data-toggle")
                                                        }
                                                        s = o.callFilters("actionsUpdateLive", s, arguments),
                                                                o.parseStatusChange(n, t, s, e)
                                                }
                                                o.callActions("afterUpdateLive", arguments)
                                        }
                                },
                                parseStatusChange: function (t, e, i, o) {
                                        var s = this,
                                                n = "",
                                                a = -1;
                                        switch (s.callActions("beforeParseStatusChange", arguments), s.type) {
                                                case "filter":
                                                        e.filter === i.filter ? s.renderStatus(t, "active") : s.renderStatus(t, "inactive");
                                                        break;
                                                case "multimix":
                                                        e.sort === i.sort && e.filter === i.filter ? s.renderStatus(t, "active") : s.renderStatus(t, "inactive");
                                                        break;
                                                case "sort":
                                                        e.sort.match(/:asc/g) && (n = e.sort.replace(/:asc/g, "")),
                                                                e.sort === i.sort || n === i.sort ? s.renderStatus(t, "active") : s.renderStatus(t, "inactive");
                                                        break;
                                                case "toggle":
                                                        for (o.length < 1 && s.renderStatus(t, "inactive"), e.filter === i.filter && s.renderStatus(t, "active"), a = 0; a < o.length; a++) {
                                                                if (o[a] === i.filter) {
                                                                        s.renderStatus(t, "active");
                                                                        break
                                                                }
                                                                s.renderStatus(t, "inactive")
                                                        }
                                        }
                                        s.callActions("afterParseStatusChange", arguments)
                                },
                                renderStatus: function (t, e) {
                                        var i = this;
                                        switch (i.callActions("beforeRenderStatus", arguments), e) {
                                                case "active":
                                                        f.addClass(t, i.classNames.active),
                                                                f.removeClass(t, i.classNames.disabled),
                                                                i.canDisable && (i.el.disabled = !1);
                                                        break;
                                                case "inactive":
                                                        f.removeClass(t, i.classNames.active),
                                                                f.removeClass(t, i.classNames.disabled),
                                                                i.canDisable && (i.el.disabled = !1);
                                                        break;
                                                case "disabled":
                                                        i.canDisable && (i.el.disabled = !0),
                                                                f.addClass(t, i.classNames.disabled),
                                                                f.removeClass(t, i.classNames.active)
                                        }
                                        "live" !== i.status && (i.status = e),
                                                i.callActions("afterRenderStatus", arguments)
                                }
                        }),
                        u.controls = [],
                        u.StyleData = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.x = 0,
                                        this.y = 0,
                                        this.top = 0,
                                        this.right = 0,
                                        this.bottom = 0,
                                        this.left = 0,
                                        this.width = 0,
                                        this.height = 0,
                                        this.marginRight = 0,
                                        this.marginBottom = 0,
                                        this.opacity = 0,
                                        this.scale = new u.TransformData,
                                        this.translateX = new u.TransformData,
                                        this.translateY = new u.TransformData,
                                        this.translateZ = new u.TransformData,
                                        this.rotateX = new u.TransformData,
                                        this.rotateY = new u.TransformData,
                                        this.rotateZ = new u.TransformData,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.StyleData),
                        u.StyleData.prototype = Object.create(u.Base.prototype),
                        u.StyleData.prototype.constructor = u.StyleData,
                        u.TransformData = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.value = 0,
                                        this.unit = "",
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.TransformData),
                        u.TransformData.prototype = Object.create(u.Base.prototype),
                        u.TransformData.prototype.constructor = u.TransformData,
                        u.TransformDefaults = function () {
                                u.StyleData.apply(this),
                                        this.callActions("beforeConstruct"),
                                        this.scale.value = .01,
                                        this.scale.unit = "",
                                        this.translateX.value = 20,
                                        this.translateX.unit = "px",
                                        this.translateY.value = 20,
                                        this.translateY.unit = "px",
                                        this.translateZ.value = 20,
                                        this.translateZ.unit = "px",
                                        this.rotateX.value = 90,
                                        this.rotateX.unit = "deg",
                                        this.rotateY.value = 90,
                                        this.rotateY.unit = "deg",
                                        this.rotateX.value = 90,
                                        this.rotateX.unit = "deg",
                                        this.rotateZ.value = 180,
                                        this.rotateZ.unit = "deg",
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.TransformDefaults),
                        u.TransformDefaults.prototype = Object.create(u.StyleData.prototype),
                        u.TransformDefaults.prototype.constructor = u.TransformDefaults,
                        u.transformDefaults = new u.TransformDefaults,
                        u.EventDetail = function () {
                                this.state = null,
                                        this.futureState = null,
                                        this.instance = null,
                                        this.originalEvent = null
                        },
                        u.Events = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.mixStart = null,
                                        this.mixBusy = null,
                                        this.mixEnd = null,
                                        this.mixFail = null,
                                        this.mixClick = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.Events),
                        u.Events.prototype = Object.create(u.Base.prototype),
                        u.Events.prototype.constructor = u.Events,
                        u.Events.prototype.fire = function (t, e, i, o) {
                                var s, n = new u.EventDetail;
                                if (this.callActions("beforeFire", arguments), void 0 === this[t]) throw new Error('Event type "' + t + '" not found.');
                                n.state = new u.State,
                                        f.extend(n.state, i.state),
                                        i.futureState && (n.futureState = new u.State, f.extend(n.futureState, i.futureState)),
                                        n.instance = i.instance,
                                        i.originalEvent && (n.originalEvent = i.originalEvent),
                                        s = f.getCustomEvent(t, n, o),
                                        this.callFilters("eventFire", s, arguments),
                                        e.dispatchEvent(s)
                        },
                        u.events = new u.Events,
                        u.QueueItem = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.args = [],
                                        this.instruction = null,
                                        this.triggerElement = null,
                                        this.deferred = null,
                                        this.isToggling = !1,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.QueueItem),
                        u.QueueItem.prototype = Object.create(u.Base.prototype),
                        u.QueueItem.prototype.constructor = u.QueueItem,
                        u.Mixer = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.config = new u.Config,
                                        this.id = "",
                                        this.isBusy = !1,
                                        this.isToggling = !1,
                                        this.incPadding = !0,
                                        this.controls = [],
                                        this.targets = [],
                                        this.origOrder = [],
                                        this.cache = {},
                                        this.toggleArray = [],
                                        this.targetsMoved = 0,
                                        this.targetsImmovable = 0,
                                        this.targetsBound = 0,
                                        this.targetsDone = 0,
                                        this.staggerDuration = 0,
                                        this.effectsIn = null,
                                        this.effectsOut = null,
                                        this.transformIn = [],
                                        this.transformOut = [],
                                        this.queue = [],
                                        this.state = null,
                                        this.lastOperation = null,
                                        this.lastClicked = null,
                                        this.userCallback = null,
                                        this.userDeferred = null,
                                        this.dom = new u.MixerDom,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.Mixer),
                        u.Mixer.prototype = Object.create(u.Base.prototype),
                        f.extend(u.Mixer.prototype, {
                                constructor: u.Mixer,
                                attach: function (t, e, i, o) {
                                        var s = this,
                                                n = null,
                                                a = -1;
                                        for (s.callActions("beforeAttach", arguments), s.id = i, o && f.extend(s.config, o, !0, !0), s.sanitizeConfig(), s.cacheDom(t, e), s.config.layout.containerClassName && f.addClass(s.dom.container, s.config.layout.containerClassName), u.features.has.transitions || (s.config.animation.enable = !1), void 0 === p.console && (s.config.debug.showWarnings = !1), s.config.data.uidKey && (s.config.controls.enable = !1), s.indexTargets(), s.state = s.getInitialState(), a = 0; n = s.lastOperation.toHide[a]; a++) n.hide();
                                        s.config.controls.enable && (s.initControls(), s.buildToggleArray(null, s.state), s.updateControls({
                                                filter: s.state.activeFilter,
                                                sort: s.state.activeSort
                                        })),
                                                s.parseEffects(),
                                                s.callActions("afterAttach", arguments)
                                },
                                sanitizeConfig: function () {
                                        var t = this;
                                        t.callActions("beforeSanitizeConfig", arguments),
                                                t.config.controls.scope = t.config.controls.scope.toLowerCase().trim(),
                                                t.config.controls.toggleLogic = t.config.controls.toggleLogic.toLowerCase().trim(),
                                                t.config.controls.toggleDefault = t.config.controls.toggleDefault.toLowerCase().trim(),
                                                t.config.animation.effects = t.config.animation.effects.trim(),
                                                t.callActions("afterSanitizeConfig", arguments)
                                },
                                getInitialState: function () {
                                        var t = this,
                                                e = new u.State,
                                                i = new u.Operation;
                                        if (t.callActions("beforeGetInitialState", arguments), e.activeContainerClassName = t.config.layout.containerClassName, t.config.load.dataset) {
                                                if (!t.config.data.uidKey || "string" != typeof t.config.data.uidKey) throw new TypeError(u.messages.errorConfigDataUidKeyNotSet());
                                                i.startDataset = i.newDataset = e.activeDataset = t.config.load.dataset.slice(),
                                                        i.startContainerClassName = i.newContainerClassName = e.activeContainerClassName,
                                                        i.show = t.targets.slice(),
                                                        e = t.callFilters("stateGetInitialState", e, arguments)
                                        } else e.activeFilter = t.parseFilterArgs([t.config.load.filter]).command,
                                                e.activeSort = t.parseSortArgs([t.config.load.sort]).command,
                                                e.totalTargets = t.targets.length,
                                                (e = t.callFilters("stateGetInitialState", e, arguments)).activeSort.collection || e.activeSort.attribute || "random" === e.activeSort.order || "desc" === e.activeSort.order ? (i.newSort = e.activeSort, t.sortOperation(i), t.printSort(!1, i), t.targets = i.newOrder) : i.startOrder = i.newOrder = t.targets,
                                                i.startFilter = i.newFilter = e.activeFilter,
                                                i.startSort = i.newSort = e.activeSort,
                                                i.startContainerClassName = i.newContainerClassName = e.activeContainerClassName,
                                                "all" === i.newFilter.selector ? i.newFilter.selector = t.config.selectors.target : "none" === i.newFilter.selector && (i.newFilter.selector = "");
                                        return i = t.callFilters("operationGetInitialState", i, [e]),
                                                (t.lastOperation = i).newFilter && t.filterOperation(i),
                                                e = t.buildState(i)
                                },
                                cacheDom: function (t, e) {
                                        var i = this;
                                        i.callActions("beforeCacheDom", arguments),
                                                i.dom.document = e,
                                                i.dom.body = i.dom.document.querySelector("body"),
                                                i.dom.container = t,
                                                i.dom.parent = t,
                                                i.callActions("afterCacheDom", arguments)
                                },
                                indexTargets: function () {
                                        var t, e = this,
                                                i = null,
                                                o = null,
                                                s = -1;
                                        if (e.callActions("beforeIndexTargets", arguments), e.dom.targets = e.config.layout.allowNestedTargets ? e.dom.container.querySelectorAll(e.config.selectors.target) : f.children(e.dom.container, e.config.selectors.target, e.dom.document), e.dom.targets = f.arrayFromList(e.dom.targets), e.targets = [], (t = e.config.load.dataset) && t.length !== e.dom.targets.length) throw new Error(u.messages.errorDatasetPrerenderedMismatch());
                                        if (e.dom.targets.length) {
                                                for (s = 0; o = e.dom.targets[s]; s++)(i = new u.Target).init(o, e, t ? t[s] : void 0),
                                                        i.isInDom = !0,
                                                        e.targets.push(i);
                                                e.dom.parent = e.dom.targets[0].parentElement === e.dom.container ? e.dom.container : e.dom.targets[0].parentElement
                                        }
                                        e.origOrder = e.targets,
                                                e.callActions("afterIndexTargets", arguments)
                                },
                                initControls: function () {
                                        var t = this,
                                                e = "",
                                                i = null,
                                                o = null,
                                                s = null,
                                                n = null,
                                                a = null,
                                                r = -1,
                                                l = -1;
                                        switch (t.callActions("beforeInitControls", arguments), t.config.controls.scope) {
                                                case "local":
                                                        s = t.dom.container;
                                                        break;
                                                case "global":
                                                        s = t.dom.document;
                                                        break;
                                                default:
                                                        throw new Error(u.messages.errorConfigInvalidControlsScope())
                                        }
                                        for (r = 0; e = u.controlDefinitions[r]; r++) if (t.config.controls.live || e.live) {
                                                if (e.parent) {
                                                        if (!(n = t.dom[e.parent]) || n.length < 0) continue;
                                                        "number" != typeof n.length && (n = [n])
                                                } else n = [s];
                                                for (l = 0; o = n[l]; l++) a = t.getControl(o, e.type, e.selector),
                                                        t.controls.push(a)
                                        } else for (i = s.querySelectorAll(t.config.selectors.control + e.selector), l = 0; o = i[l]; l++)(a = t.getControl(o, e.type, "")) && t.controls.push(a);
                                        t.callActions("afterInitControls", arguments)
                                },
                                getControl: function (t, e, i) {
                                        var o = this,
                                                s = null,
                                                n = -1;
                                        if (o.callActions("beforeGetControl", arguments), !i) for (n = 0; s = u.controls[n]; n++) {
                                                if (s.el === t && s.isBound(o)) return o.callFilters("controlGetControl", null, arguments);
                                                if (s.el === t && s.type === e && s.selector === i) return s.addBinding(o),
                                                        o.callFilters("controlGetControl", s, arguments)
                                        }
                                        return (s = new u.Control).init(t, e, i),
                                                s.classNames.base = f.getClassname(o.config.classNames, e),
                                                s.classNames.active = f.getClassname(o.config.classNames, e, o.config.classNames.modifierActive),
                                                s.classNames.disabled = f.getClassname(o.config.classNames, e, o.config.classNames.modifierDisabled),
                                                s.addBinding(o),
                                                o.callFilters("controlGetControl", s, arguments)
                                },
                                getToggleSelector: function () {
                                        var t = this,
                                                e = "or" === t.config.controls.toggleLogic ? ", " : "",
                                                i = "";
                                        return t.callActions("beforeGetToggleSelector", arguments),
                                                t.toggleArray = f.clean(t.toggleArray),
                                                "" === (i = t.toggleArray.join(e)) && (i = t.config.controls.toggleDefault),
                                                t.callFilters("selectorGetToggleSelector", i, arguments)
                                },
                                buildToggleArray: function (t, e) {
                                        var i = this,
                                                o = "";
                                        if (i.callActions("beforeBuildToggleArray", arguments), t && t.filter) o = t.filter.selector.replace(/\s/g, "");
                                        else {
                                                if (!e) return;
                                                o = e.activeFilter.selector.replace(/\s/g, "")
                                        }
                                        o !== i.config.selectors.target && "all" !== o || (o = ""),
                                                "or" === i.config.controls.toggleLogic ? i.toggleArray = o.split(",") : i.toggleArray = i.splitCompoundSelector(o),
                                                i.toggleArray = f.clean(i.toggleArray),
                                                i.callActions("afterBuildToggleArray", arguments)
                                },
                                splitCompoundSelector: function (t) {
                                        var e = t.split(/([\.\[])/g),
                                                i = [],
                                                o = "",
                                                s = -1;
                                        for ("" === e[0] && e.shift(), s = 0; s < e.length; s++) s % 2 == 0 && (o = ""),
                                                o += e[s],
                                                s % 2 != 0 && i.push(o);
                                        return i
                                },
                                updateControls: function (t) {
                                        var e = this,
                                                i = null,
                                                o = new u.CommandMultimix,
                                                s = -1;
                                        for (e.callActions("beforeUpdateControls", arguments), t.filter ? o.filter = t.filter.selector : o.filter = e.state.activeFilter.selector, t.sort ? o.sort = e.buildSortString(t.sort) : o.sort = e.buildSortString(e.state.activeSort), o.filter === e.config.selectors.target && (o.filter = "all"), "" === o.filter && (o.filter = "none"), f.freeze(o), s = 0; i = e.controls[s]; s++) i.update(o, e.toggleArray);
                                        e.callActions("afterUpdateControls", arguments)
                                },
                                buildSortString: function (t) {
                                        var e = "";
                                        return e += t.sortString,
                                                t.next && (e += " " + this.buildSortString(t.next)),
                                                e
                                },
                                insertTargets: function (t, e) {
                                        var i, o = this,
                                                s = -1,
                                                n = null,
                                                a = null,
                                                r = null,
                                                l = -1;
                                        if (o.callActions("beforeInsertTargets", arguments), void 0 === t.index && (t.index = 0), i = o.getNextSibling(t.index, t.sibling, t.position), n = o.dom.document.createDocumentFragment(), s = i ? f.index(i, o.config.selectors.target) : o.targets.length, t.collection) {
                                                for (l = 0; r = t.collection[l]; l++) {
                                                        if (-1 < o.dom.targets.indexOf(r)) throw new Error(u.messages.errorInsertPreexistingElement());
                                                        r.style.display = "none",
                                                                n.appendChild(r),
                                                                n.appendChild(o.dom.document.createTextNode(" ")),
                                                                f.isElement(r, o.dom.document) && r.matches(o.config.selectors.target) && ((a = new u.Target).init(r, o), a.isInDom = !0, o.targets.splice(s, 0, a), s++)
                                                }
                                                o.dom.parent.insertBefore(n, i)
                                        }
                                        e.startOrder = o.origOrder = o.targets,
                                                o.callActions("afterInsertTargets", arguments)
                                },
                                getNextSibling: function (t, e, i) {
                                        var o = this,
                                                s = null;
                                        return t = Math.max(t, 0),
                                                e && "before" === i ? s = e : e && "after" === i ? s = e.nextElementSibling || null : 0 < o.targets.length && void 0 !== t ? s = t < o.targets.length || !o.targets.length ? o.targets[t].dom.el : o.targets[o.targets.length - 1].dom.el.nextElementSibling : 0 === o.targets.length && 0 < o.dom.parent.children.length && (o.config.layout.siblingAfter ? s = o.config.layout.siblingAfter : o.config.layout.siblingBefore ? s = o.config.layout.siblingBefore.nextElementSibling : o.dom.parent.children[0]),
                                                o.callFilters("elementGetNextSibling", s, arguments)
                                },
                                filterOperation: function (t) {
                                        var e, i = !1,
                                                o = -1,
                                                s = null,
                                                n = -1;
                                        for (this.callActions("beforeFilterOperation", arguments), e = t.newFilter.action, n = 0; s = t.newOrder[n]; n++) i = t.newFilter.collection ? -1 < t.newFilter.collection.indexOf(s.dom.el) : "" !== t.newFilter.selector && s.dom.el.matches(t.newFilter.selector),
                                                this.evaluateHideShow(i, s, e, t);
                                        if (t.toRemove.length) for (n = 0; s = t.show[n]; n++) - 1 < t.toRemove.indexOf(s) && (t.show.splice(n, 1), -1 < (o = t.toShow.indexOf(s)) && t.toShow.splice(o, 1), t.toHide.push(s), t.hide.push(s), n--);
                                        t.matching = t.show.slice(),
                                                0 === t.show.length && "" !== t.newFilter.selector && 0 !== this.targets.length && (t.hasFailed = !0),
                                                this.callActions("afterFilterOperation", arguments)
                                },
                                evaluateHideShow: function (t, e, i, o) {
                                        var s, n = Array.prototype.slice.call(arguments, 1);
                                        s = this.callFilters("testResultEvaluateHideShow", t, n),
                                                this.callActions("beforeEvaluateHideShow", arguments),
                                                !0 === s && "show" === i || !1 === s && "hide" === i ? (o.show.push(e), e.isShown || o.toShow.push(e)) : (o.hide.push(e), e.isShown && o.toHide.push(e)),
                                                this.callActions("afterEvaluateHideShow", arguments)
                                },
                                sortOperation: function (i) {
                                        var o = this,
                                                t = [],
                                                e = null,
                                                s = null,
                                                n = -1;
                                        if (o.callActions("beforeSortOperation", arguments), i.startOrder = o.targets, i.newSort.collection) {
                                                for (t = [], n = 0; s = i.newSort.collection[n]; n++) {
                                                        if (o.dom.targets.indexOf(s) < 0) throw new Error(u.messages.errorSortNonExistentElement());
                                                        (e = new u.Target).init(s, o),
                                                                e.isInDom = !0,
                                                                t.push(e)
                                                }
                                                i.newOrder = t
                                        } else "random" === i.newSort.order ? i.newOrder = f.arrayShuffle(i.startOrder) : "" === i.newSort.attribute ? (i.newOrder = o.origOrder.slice(), "desc" === i.newSort.order && i.newOrder.reverse()) : (i.newOrder = i.startOrder.slice(), i.newOrder.sort(function (t, e) {
                                                return o.compare(t, e, i.newSort)
                                        }));
                                        f.isEqualArray(i.newOrder, i.startOrder) && (i.willSort = !1),
                                                o.callActions("afterSortOperation", arguments)
                                },
                                compare: function (t, e, i) {
                                        var o = i.order,
                                                s = this.getAttributeValue(t, i.attribute),
                                                n = this.getAttributeValue(e, i.attribute);
                                        return n = isNaN(+s) || isNaN(+n) ? (s = s.toLowerCase(), n.toLowerCase()) : (s = +s, +n),
                                                s < n ? "asc" === o ? -1 : 1 : n < s ? "asc" === o ? 1 : -1 : s === n && i.next ? this.compare(t, e, i.next) : 0
                                },
                                getAttributeValue: function (t, e) {
                                        var i;
                                        return null === (i = t.dom.el.getAttribute("data-" + e)) && this.config.debug.showWarnings && console.warn(u.messages.warningInconsistentSortingAttributes({
                                                attribute: "data-" + e
                                        })),
                                                this.callFilters("valueGetAttributeValue", i || 0, arguments)
                                },
                                printSort: function (t, e) {
                                        var i, o = this,
                                                s = t ? e.newOrder : e.startOrder,
                                                n = t ? e.startOrder : e.newOrder,
                                                a = s.length ? s[s.length - 1].dom.el.nextElementSibling : null,
                                                r = p.document.createDocumentFragment(),
                                                l = null,
                                                c = null,
                                                d = -1;
                                        for (o.callActions("beforePrintSort", arguments), d = 0; l = s[d]; d++)"absolute" !== (c = l.dom.el).style.position && (f.removeWhitespace(c.previousSibling), c.parentElement.removeChild(c));
                                        for ((i = a ? a.previousSibling : o.dom.parent.lastChild) && "#text" === i.nodeName && f.removeWhitespace(i), d = 0; l = n[d]; d++) c = l.dom.el,
                                                f.isElement(r.lastChild) && r.appendChild(p.document.createTextNode(" ")),
                                                r.appendChild(c);
                                        o.dom.parent.firstChild && o.dom.parent.firstChild !== a && r.insertBefore(p.document.createTextNode(" "), r.childNodes[0]),
                                                a ? (r.appendChild(p.document.createTextNode(" ")), o.dom.parent.insertBefore(r, a)) : o.dom.parent.appendChild(r),
                                                o.callActions("afterPrintSort", arguments)
                                },
                                parseSortString: function (t, e) {
                                        var i = t.split(" "),
                                                o = e,
                                                s = [],
                                                n = -1;
                                        for (n = 0; n < i.length; n++) {
                                                switch (s = i[n].split(":"), o.sortString = i[n], o.attribute = f.dashCase(s[0]), o.order = s[1] || "asc", o.attribute) {
                                                        case "default":
                                                                o.attribute = "";
                                                                break;
                                                        case "random":
                                                                o.attribute = "",
                                                                        o.order = "random"
                                                }
                                                if (!o.attribute || "random" === o.order) break;
                                                n < i.length - 1 && (o.next = new u.CommandSort, f.freeze(o), o = o.next)
                                        }
                                        return this.callFilters("commandsParseSort", e, arguments)
                                },
                                parseEffects: function () {
                                        var t = this,
                                                e = "",
                                                i = t.config.animation.effectsIn || t.config.animation.effects,
                                                o = t.config.animation.effectsOut || t.config.animation.effects;
                                        for (e in t.callActions("beforeParseEffects", arguments), t.effectsIn = new u.StyleData, t.effectsOut = new u.StyleData, t.transformIn = [], t.transformOut = [], t.effectsIn.opacity = t.effectsOut.opacity = 1, t.parseEffect("fade", i, t.effectsIn, t.transformIn), t.parseEffect("fade", o, t.effectsOut, t.transformOut, !0), u.transformDefaults) u.transformDefaults[e] instanceof u.TransformData && (t.parseEffect(e, i, t.effectsIn, t.transformIn), t.parseEffect(e, o, t.effectsOut, t.transformOut, !0));
                                        t.parseEffect("stagger", i, t.effectsIn, t.transformIn),
                                                t.parseEffect("stagger", o, t.effectsOut, t.transformOut, !0),
                                                t.callActions("afterParseEffects", arguments)
                                },
                                parseEffect: function (t, e, i, o, s) {
                                        var n, a = this,
                                                r = "",
                                                l = "",
                                                c = ["%", "px", "em", "rem", "vh", "vw", "deg"],
                                                d = "",
                                                h = -1;
                                        if (a.callActions("beforeParseEffect", arguments), "string" != typeof e) throw new TypeError(u.messages.errorConfigInvalidAnimationEffects());
                                        if (e.indexOf(t) < 0) "stagger" === t && (a.staggerDuration = 0);
                                        else {
                                                switch (-1 < (n = e.indexOf(t + "(")) && (r = e.substring(n), l = /\(([^)]+)\)/.exec(r)[1]), t) {
                                                        case "fade":
                                                                i.opacity = l ? parseFloat(l) : 0;
                                                                break;
                                                        case "stagger":
                                                                a.staggerDuration = l ? parseFloat(l) : 100;
                                                                break;
                                                        default:
                                                                if (s && a.config.animation.reverseOut && "scale" !== t ? i[t].value = -1 * (l ? parseFloat(l) : u.transformDefaults[t].value) : i[t].value = l ? parseFloat(l) : u.transformDefaults[t].value, l) {
                                                                        for (h = 0; d = c[h]; h++) if (-1 < l.indexOf(d)) {
                                                                                i[t].unit = d;
                                                                                break
                                                                        }
                                                                } else i[t].unit = u.transformDefaults[t].unit;
                                                                o.push(t + "(" + i[t].value + i[t].unit + ")")
                                                }
                                                a.callActions("afterParseEffect", arguments)
                                        }
                                },
                                buildState: function (t) {
                                        var e = this,
                                                i = new u.State,
                                                o = null,
                                                s = -1;
                                        for (e.callActions("beforeBuildState", arguments), s = 0; o = e.targets[s]; s++)(!t.toRemove.length || t.toRemove.indexOf(o) < 0) && i.targets.push(o.dom.el);
                                        for (s = 0; o = t.matching[s]; s++) i.matching.push(o.dom.el);
                                        for (s = 0; o = t.show[s]; s++) i.show.push(o.dom.el);
                                        for (s = 0; o = t.hide[s]; s++)(!t.toRemove.length || t.toRemove.indexOf(o) < 0) && i.hide.push(o.dom.el);
                                        return i.id = e.id,
                                                i.container = e.dom.container,
                                                i.activeFilter = t.newFilter,
                                                i.activeSort = t.newSort,
                                                i.activeDataset = t.newDataset,
                                                i.activeContainerClassName = t.newContainerClassName,
                                                i.hasFailed = t.hasFailed,
                                                i.totalTargets = e.targets.length,
                                                i.totalShow = t.show.length,
                                                i.totalHide = t.hide.length,
                                                i.totalMatching = t.matching.length,
                                                i.triggerElement = t.triggerElement,
                                                e.callFilters("stateBuildState", i, arguments)
                                },
                                goMix: function (t, e) {
                                        var i = this,
                                                o = null;
                                        return i.callActions("beforeGoMix", arguments),
                                                i.config.animation.duration && i.config.animation.effects && f.isVisible(i.dom.container) || (t = !1),
                                                e.toShow.length || e.toHide.length || e.willSort || e.willChangeLayout || (t = !1),
                                                e.startState.show.length || e.show.length || (t = !1),
                                                u.events.fire("mixStart", i.dom.container, {
                                                        state: e.startState,
                                                        futureState: e.newState,
                                                        instance: i
                                                }, i.dom.document),
                                                "function" == typeof i.config.callbacks.onMixStart && i.config.callbacks.onMixStart.call(i.dom.container, e.startState, e.newState, i),
                                                f.removeClass(i.dom.container, f.getClassname(i.config.classNames, "container", i.config.classNames.modifierFailed)),
                                                o = i.userDeferred ? i.userDeferred : i.userDeferred = f.defer(u.libraries),
                                                i.isBusy = !0,
                                                t && u.features.has.transitions ? (p.pageYOffset !== e.docState.scrollTop && p.scrollTo(e.docState.scrollLeft, e.docState.scrollTop), i.config.animation.applyPerspective && (i.dom.parent.style[u.features.perspectiveProp] = i.config.animation.perspectiveDistance, i.dom.parent.style[u.features.perspectiveOriginProp] = i.config.animation.perspectiveOrigin), i.config.animation.animateResizeContainer && e.startHeight !== e.newHeight && e.viewportDeltaY !== e.startHeight - e.newHeight && (i.dom.parent.style.height = e.startHeight + "px"), i.config.animation.animateResizeContainer && e.startWidth !== e.newWidth && e.viewportDeltaX !== e.startWidth - e.newWidth && (i.dom.parent.style.width = e.startWidth + "px"), e.startHeight === e.newHeight && (i.dom.parent.style.height = e.startHeight + "px"), e.startWidth === e.newWidth && (i.dom.parent.style.width = e.startWidth + "px"), e.startHeight === e.newHeight && e.startWidth === e.newWidth && (i.dom.parent.style.overflow = "hidden"), requestAnimationFrame(function () {
                                                        i.moveTargets(e)
                                                })) : i.config.debug.fauxAsync ? setTimeout(function () {
                                                        i.cleanUp(e)
                                                }, i.config.animation.duration) : i.cleanUp(e),
                                                i.callFilters("promiseGoMix", o.promise, arguments)
                                },
                                getStartMixData: function (t) {
                                        var e = this,
                                                i = p.getComputedStyle(e.dom.parent),
                                                o = e.dom.parent.getBoundingClientRect(),
                                                s = null,
                                                n = {},
                                                a = -1,
                                                r = i[u.features.boxSizingProp];
                                        for (e.incPadding = "border-box" === r, e.callActions("beforeGetStartMixData", arguments), a = 0; s = t.show[a]; a++) n = s.getPosData(),
                                                t.showPosData[a] = {
                                                        startPosData: n
                                                };
                                        for (a = 0; s = t.toHide[a]; a++) n = s.getPosData(),
                                                t.toHidePosData[a] = {
                                                        startPosData: n
                                                };
                                        t.startX = o.left,
                                                t.startY = o.top,
                                                t.startHeight = e.incPadding ? o.height : o.height - parseFloat(i.paddingTop) - parseFloat(i.paddingBottom) - parseFloat(i.borderTop) - parseFloat(i.borderBottom),
                                                t.startWidth = e.incPadding ? o.width : o.width - parseFloat(i.paddingLeft) - parseFloat(i.paddingRight) - parseFloat(i.borderLeft) - parseFloat(i.borderRight),
                                                e.callActions("afterGetStartMixData", arguments)
                                },
                                setInter: function (t) {
                                        var e = this,
                                                i = null,
                                                o = -1;
                                        for (e.callActions("beforeSetInter", arguments), e.config.animation.clampHeight && (e.dom.parent.style.height = t.startHeight + "px", e.dom.parent.style.overflow = "hidden"), e.config.animation.clampWidth && (e.dom.parent.style.width = t.startWidth + "px", e.dom.parent.style.overflow = "hidden"), o = 0; i = t.toShow[o]; o++) i.show();
                                        t.willChangeLayout && (f.removeClass(e.dom.container, t.startContainerClassName), f.addClass(e.dom.container, t.newContainerClassName)),
                                                e.callActions("afterSetInter", arguments)
                                },
                                getInterMixData: function (t) {
                                        var e = null,
                                                i = -1;
                                        for (this.callActions("beforeGetInterMixData", arguments), i = 0; e = t.show[i]; i++) t.showPosData[i].interPosData = e.getPosData();
                                        for (i = 0; e = t.toHide[i]; i++) t.toHidePosData[i].interPosData = e.getPosData();
                                        this.callActions("afterGetInterMixData", arguments)
                                },
                                setFinal: function (t) {
                                        var e = null,
                                                i = -1;
                                        for (this.callActions("beforeSetFinal", arguments), t.willSort && this.printSort(!1, t), i = 0; e = t.toHide[i]; i++) e.hide();
                                        this.callActions("afterSetFinal", arguments)
                                },
                                getFinalMixData: function (t) {
                                        var e, i = this,
                                                o = null,
                                                s = null,
                                                n = -1;
                                        for (i.callActions("beforeGetFinalMixData", arguments), n = 0; s = t.show[n]; n++) t.showPosData[n].finalPosData = s.getPosData();
                                        for (n = 0; s = t.toHide[n]; n++) t.toHidePosData[n].finalPosData = s.getPosData();
                                        for ((i.config.animation.clampHeight || i.config.animation.clampWidth) && (i.dom.parent.style.height = i.dom.parent.style.width = i.dom.parent.style.overflow = ""), i.incPadding || (o = p.getComputedStyle(i.dom.parent)), e = i.dom.parent.getBoundingClientRect(), t.newX = e.left, t.newY = e.top, t.newHeight = i.incPadding ? e.height : e.height - parseFloat(o.paddingTop) - parseFloat(o.paddingBottom) - parseFloat(o.borderTop) - parseFloat(o.borderBottom), t.newWidth = i.incPadding ? e.width : e.width - parseFloat(o.paddingLeft) - parseFloat(o.paddingRight) - parseFloat(o.borderLeft) - parseFloat(o.borderRight), t.viewportDeltaX = t.docState.viewportWidth - this.dom.document.documentElement.clientWidth, t.viewportDeltaY = t.docState.viewportHeight - this.dom.document.documentElement.clientHeight, t.willSort && i.printSort(!0, t), n = 0; s = t.toShow[n]; n++) s.hide();
                                        for (n = 0; s = t.toHide[n]; n++) s.show();
                                        t.willChangeLayout && (f.removeClass(i.dom.container, t.newContainerClassName), f.addClass(i.dom.container, i.config.layout.containerClassName)),
                                                i.callActions("afterGetFinalMixData", arguments)
                                },
                                getTweenData: function (t) {
                                        var e = this,
                                                i = null,
                                                o = null,
                                                s = Object.getOwnPropertyNames(e.effectsIn),
                                                n = "",
                                                a = null,
                                                r = -1,
                                                l = -1,
                                                c = -1,
                                                d = -1;
                                        for (e.callActions("beforeGetTweenData", arguments), c = 0; i = t.show[c]; c++) for ((o = t.showPosData[c]).posIn = new u.StyleData, o.posOut = new u.StyleData, o.tweenData = new u.StyleData, i.isShown ? (o.posIn.x = o.startPosData.x - o.interPosData.x, o.posIn.y = o.startPosData.y - o.interPosData.y) : o.posIn.x = o.posIn.y = 0, o.posOut.x = o.finalPosData.x - o.interPosData.x, o.posOut.y = o.finalPosData.y - o.interPosData.y, o.posIn.opacity = i.isShown ? 1 : e.effectsIn.opacity, o.posOut.opacity = 1, o.tweenData.opacity = o.posOut.opacity - o.posIn.opacity, i.isShown || e.config.animation.nudge || (o.posIn.x = o.posOut.x, o.posIn.y = o.posOut.y), o.tweenData.x = o.posOut.x - o.posIn.x, o.tweenData.y = o.posOut.y - o.posIn.y, e.config.animation.animateResizeTargets && (o.posIn.width = o.startPosData.width, o.posIn.height = o.startPosData.height, r = (o.startPosData.width || o.finalPosData.width) - o.interPosData.width, o.posIn.marginRight = o.startPosData.marginRight - r, l = (o.startPosData.height || o.finalPosData.height) - o.interPosData.height, o.posIn.marginBottom = o.startPosData.marginBottom - l, o.posOut.width = o.finalPosData.width, o.posOut.height = o.finalPosData.height, r = (o.finalPosData.width || o.startPosData.width) - o.interPosData.width, o.posOut.marginRight = o.finalPosData.marginRight - r, l = (o.finalPosData.height || o.startPosData.height) - o.interPosData.height, o.posOut.marginBottom = o.finalPosData.marginBottom - l, o.tweenData.width = o.posOut.width - o.posIn.width, o.tweenData.height = o.posOut.height - o.posIn.height, o.tweenData.marginRight = o.posOut.marginRight - o.posIn.marginRight, o.tweenData.marginBottom = o.posOut.marginBottom - o.posIn.marginBottom), d = 0; n = s[d]; d++)(a = e.effectsIn[n]) instanceof u.TransformData && a.value && (o.posIn[n].value = a.value, o.posOut[n].value = 0, o.tweenData[n].value = o.posOut[n].value - o.posIn[n].value, o.posIn[n].unit = o.posOut[n].unit = o.tweenData[n].unit = a.unit);
                                        for (c = 0; i = t.toHide[c]; c++) for ((o = t.toHidePosData[c]).posIn = new u.StyleData, o.posOut = new u.StyleData, o.tweenData = new u.StyleData, o.posIn.x = i.isShown ? o.startPosData.x - o.interPosData.x : 0, o.posIn.y = i.isShown ? o.startPosData.y - o.interPosData.y : 0, o.posOut.x = e.config.animation.nudge ? 0 : o.posIn.x, o.posOut.y = e.config.animation.nudge ? 0 : o.posIn.y, o.tweenData.x = o.posOut.x - o.posIn.x, o.tweenData.y = o.posOut.y - o.posIn.y, e.config.animation.animateResizeTargets && (o.posIn.width = o.startPosData.width, o.posIn.height = o.startPosData.height, r = o.startPosData.width - o.interPosData.width, o.posIn.marginRight = o.startPosData.marginRight - r, l = o.startPosData.height - o.interPosData.height, o.posIn.marginBottom = o.startPosData.marginBottom - l), o.posIn.opacity = 1, o.posOut.opacity = e.effectsOut.opacity, o.tweenData.opacity = o.posOut.opacity - o.posIn.opacity, d = 0; n = s[d]; d++)(a = e.effectsOut[n]) instanceof u.TransformData && a.value && (o.posIn[n].value = 0, o.posOut[n].value = a.value, o.tweenData[n].value = o.posOut[n].value - o.posIn[n].value, o.posIn[n].unit = o.posOut[n].unit = o.tweenData[n].unit = a.unit);
                                        e.callActions("afterGetTweenData", arguments)
                                },
                                moveTargets: function (t) {
                                        var e = this,
                                                i = null,
                                                o = null,
                                                s = null,
                                                n = "",
                                                a = !1,
                                                r = -1,
                                                l = -1,
                                                c = e.checkProgress.bind(e);
                                        for (e.callActions("beforeMoveTargets", arguments), l = 0; i = t.show[l]; l++) o = new u.IMoveData,
                                                s = t.showPosData[l],
                                                n = i.isShown ? "none" : "show",
                                                (a = e.willTransition(n, t.hasEffect, s.posIn, s.posOut)) && r++,
                                                i.show(),
                                                o.posIn = s.posIn,
                                                o.posOut = s.posOut,
                                                o.statusChange = n,
                                                o.staggerIndex = r,
                                                o.operation = t,
                                                o.callback = a ? c : null,
                                                i.move(o);
                                        for (l = 0; i = t.toHide[l]; l++) s = t.toHidePosData[l],
                                                o = new u.IMoveData,
                                                n = "hide",
                                                a = e.willTransition(n, s.posIn, s.posOut),
                                                o.posIn = s.posIn,
                                                o.posOut = s.posOut,
                                                o.statusChange = n,
                                                o.staggerIndex = l,
                                                o.operation = t,
                                                o.callback = a ? c : null,
                                                i.move(o);
                                        e.config.animation.animateResizeContainer && (e.dom.parent.style[u.features.transitionProp] = "height " + e.config.animation.duration + "ms ease, width " + e.config.animation.duration + "ms ease ", requestAnimationFrame(function () {
                                                t.startHeight !== t.newHeight && t.viewportDeltaY !== t.startHeight - t.newHeight && (e.dom.parent.style.height = t.newHeight + "px"),
                                                        t.startWidth !== t.newWidth && t.viewportDeltaX !== t.startWidth - t.newWidth && (e.dom.parent.style.width = t.newWidth + "px")
                                        })),
                                                t.willChangeLayout && (f.removeClass(e.dom.container, e.config.layout.ContainerClassName), f.addClass(e.dom.container, t.newContainerClassName)),
                                                e.callActions("afterMoveTargets", arguments)
                                },
                                hasEffect: function () {
                                        var t = ["scale", "translateX", "translateY", "translateZ", "rotateX", "rotateY", "rotateZ"],
                                                e = "",
                                                i = null,
                                                o = !1,
                                                s = -1;
                                        if (1 !== this.effectsIn.opacity) return this.callFilters("resultHasEffect", !0, arguments);
                                        for (s = 0; e = t[s]; s++) if (0 !== ("undefined" !== (i = this.effectsIn[e]).value ? i.value : i)) {
                                                o = !0;
                                                break
                                        }
                                        return this.callFilters("resultHasEffect", o, arguments)
                                },
                                willTransition: function (t, e, i, o) {
                                        var s = !1;
                                        return s = !!f.isVisible(this.dom.container) && (!!("none" !== t && e || i.x !== o.x || i.y !== o.y) || !!this.config.animation.animateResizeTargets && (i.width !== o.width || i.height !== o.height || i.marginRight !== o.marginRight || i.marginTop !== o.marginTop)),
                                                this.callFilters("resultWillTransition", s, arguments)
                                },
                                checkProgress: function (t) {
                                        this.targetsDone++,
                                                this.targetsBound === this.targetsDone && this.cleanUp(t)
                                },
                                cleanUp: function (t) {
                                        var e = this,
                                                i = null,
                                                o = null,
                                                s = null,
                                                n = null,
                                                a = -1;
                                        for (e.callActions("beforeCleanUp", arguments), e.targetsMoved = e.targetsImmovable = e.targetsBound = e.targetsDone = 0, a = 0; i = t.show[a]; a++) i.cleanUp(),
                                                i.show();
                                        for (a = 0; i = t.toHide[a]; a++) i.cleanUp(),
                                                i.hide();
                                        if (t.willSort && e.printSort(!1, t), e.dom.parent.style[u.features.transitionProp] = e.dom.parent.style.height = e.dom.parent.style.width = e.dom.parent.style.overflow = e.dom.parent.style[u.features.perspectiveProp] = e.dom.parent.style[u.features.perspectiveOriginProp] = "", t.willChangeLayout && (f.removeClass(e.dom.container, t.startContainerClassName), f.addClass(e.dom.container, t.newContainerClassName)), t.toRemove.length) {
                                                for (a = 0; i = e.targets[a]; a++) - 1 < t.toRemove.indexOf(i) && ((o = i.dom.el.previousSibling) && "#text" === o.nodeName && (s = i.dom.el.nextSibling) && "#text" === s.nodeName && f.removeWhitespace(o), t.willSort || e.dom.parent.removeChild(i.dom.el), e.targets.splice(a, 1), i.isInDom = !1, a--);
                                                e.origOrder = e.targets
                                        }
                                        t.willSort && (e.targets = t.newOrder),
                                                e.state = t.newState,
                                                e.lastOperation = t,
                                                e.dom.targets = e.state.targets,
                                                u.events.fire("mixEnd", e.dom.container, {
                                                        state: e.state,
                                                        instance: e
                                                }, e.dom.document),
                                                "function" == typeof e.config.callbacks.onMixEnd && e.config.callbacks.onMixEnd.call(e.dom.container, e.state, e),
                                                t.hasFailed && (u.events.fire("mixFail", e.dom.container, {
                                                        state: e.state,
                                                        instance: e
                                                }, e.dom.document), "function" == typeof e.config.callbacks.onMixFail && e.config.callbacks.onMixFail.call(e.dom.container, e.state, e), f.addClass(e.dom.container, f.getClassname(e.config.classNames, "container", e.config.classNames.modifierFailed))),
                                                "function" == typeof e.userCallback && e.userCallback.call(e.dom.container, e.state, e),
                                                "function" == typeof e.userDeferred.resolve && e.userDeferred.resolve(e.state),
                                                e.userCallback = null,
                                                e.userDeferred = null,
                                                e.lastClicked = null,
                                                e.isToggling = !1,
                                                e.isBusy = !1,
                                                e.queue.length && (e.callActions("beforeReadQueueCleanUp", arguments), n = e.queue.shift(), e.userDeferred = n.deferred, e.isToggling = n.isToggling, e.lastClicked = n.triggerElement, n.instruction.command instanceof u.CommandMultimix ? e.multimix.apply(e, n.args) : e.dataset.apply(e, n.args)),
                                                e.callActions("afterCleanUp", arguments)
                                },
                                parseMultimixArgs: function (t) {
                                        var e = this,
                                                i = new u.UserInstruction,
                                                o = null,
                                                s = -1;
                                        for (i.animate = e.config.animation.enable, i.command = new u.CommandMultimix, s = 0; s < t.length; s++) null !== (o = t[s]) && ("object" == typeof o ? f.extend(i.command, o) : "boolean" == typeof o ? i.animate = o : "function" == typeof o && (i.callback = o));
                                        return !i.command.insert || i.command.insert instanceof u.CommandInsert || (i.command.insert = e.parseInsertArgs([i.command.insert]).command),
                                                !i.command.remove || i.command.remove instanceof u.CommandRemove || (i.command.remove = e.parseRemoveArgs([i.command.remove]).command),
                                                !i.command.filter || i.command.filter instanceof u.CommandFilter || (i.command.filter = e.parseFilterArgs([i.command.filter]).command),
                                                !i.command.sort || i.command.sort instanceof u.CommandSort || (i.command.sort = e.parseSortArgs([i.command.sort]).command),
                                                !i.command.changeLayout || i.command.changeLayout instanceof u.CommandChangeLayout || (i.command.changeLayout = e.parseChangeLayoutArgs([i.command.changeLayout]).command),
                                                i = e.callFilters("instructionParseMultimixArgs", i, arguments),
                                                f.freeze(i),
                                                i
                                },
                                parseFilterArgs: function (t) {
                                        var e = new u.UserInstruction,
                                                i = null,
                                                o = -1;
                                        for (e.animate = this.config.animation.enable, e.command = new u.CommandFilter, o = 0; o < t.length; o++)"string" == typeof (i = t[o]) ? e.command.selector = i : null === i ? e.command.collection = [] : "object" == typeof i && f.isElement(i, this.dom.document) ? e.command.collection = [i] : "object" == typeof i && void 0 !== i.length ? e.command.collection = f.arrayFromList(i) : "object" == typeof i ? f.extend(e.command, i) : "boolean" == typeof i ? e.animate = i : "function" == typeof i && (e.callback = i);
                                        if (e.command.selector && e.command.collection) throw new Error(u.messages.errorFilterInvalidArguments());
                                        return e = this.callFilters("instructionParseFilterArgs", e, arguments),
                                                f.freeze(e),
                                                e
                                },
                                parseSortArgs: function (t) {
                                        var e = new u.UserInstruction,
                                                i = null,
                                                o = "",
                                                s = -1;
                                        for (e.animate = this.config.animation.enable, e.command = new u.CommandSort, s = 0; s < t.length; s++) if (null !== (i = t[s])) switch (typeof i) {
                                                case "string":
                                                        o = i;
                                                        break;
                                                case "object":
                                                        i.length && (e.command.collection = f.arrayFromList(i));
                                                        break;
                                                case "boolean":
                                                        e.animate = i;
                                                        break;
                                                case "function":
                                                        e.callback = i
                                        }
                                        return o && (e.command = this.parseSortString(o, e.command)),
                                                e = this.callFilters("instructionParseSortArgs", e, arguments),
                                                f.freeze(e),
                                                e
                                },
                                parseInsertArgs: function (t) {
                                        var e = new u.UserInstruction,
                                                i = null,
                                                o = -1;
                                        for (e.animate = this.config.animation.enable, e.command = new u.CommandInsert, o = 0; o < t.length; o++) null !== (i = t[o]) && ("number" == typeof i ? e.command.index = i : "string" == typeof i && -1 < ["before", "after"].indexOf(i) ? e.command.position = i : "string" == typeof i ? e.command.collection = f.arrayFromList(f.createElement(i).childNodes) : "object" == typeof i && f.isElement(i, this.dom.document) ? e.command.collection.length ? e.command.sibling = i : e.command.collection = [i] : "object" == typeof i && i.length ? e.command.collection.length ? e.command.sibling = i[0] : e.command.collection = i : "object" == typeof i && i.childNodes && i.childNodes.length ? e.command.collection.length ? e.command.sibling = i.childNodes[0] : e.command.collection = f.arrayFromList(i.childNodes) : "object" == typeof i ? f.extend(e.command, i) : "boolean" == typeof i ? e.animate = i : "function" == typeof i && (e.callback = i));
                                        if (e.command.index && e.command.sibling) throw new Error(u.messages.errorInsertInvalidArguments());
                                        return !e.command.collection.length && this.config.debug.showWarnings && console.warn(u.messages.warningInsertNoElements()),
                                                e = this.callFilters("instructionParseInsertArgs", e, arguments),
                                                f.freeze(e),
                                                e
                                },
                                parseRemoveArgs: function (t) {
                                        var e = this,
                                                i = new u.UserInstruction,
                                                o = null,
                                                s = null,
                                                n = -1;
                                        for (i.animate = e.config.animation.enable, i.command = new u.CommandRemove, n = 0; n < t.length; n++) if (null !== (s = t[n])) switch (typeof s) {
                                                case "number":
                                                        e.targets[s] && (i.command.targets[0] = e.targets[s]);
                                                        break;
                                                case "string":
                                                        i.command.collection = f.arrayFromList(e.dom.parent.querySelectorAll(s));
                                                        break;
                                                case "object":
                                                        s && s.length ? i.command.collection = s : f.isElement(s, e.dom.document) ? i.command.collection = [s] : f.extend(i.command, s);
                                                        break;
                                                case "boolean":
                                                        i.animate = s;
                                                        break;
                                                case "function":
                                                        i.callback = s
                                        }
                                        if (i.command.collection.length) for (n = 0; o = e.targets[n]; n++) - 1 < i.command.collection.indexOf(o.dom.el) && i.command.targets.push(o);
                                        return !i.command.targets.length && e.config.debug.showWarnings && console.warn(u.messages.warningRemoveNoElements()),
                                                f.freeze(i),
                                                i
                                },
                                parseDatasetArgs: function (t) {
                                        var e = new u.UserInstruction,
                                                i = null,
                                                o = -1;
                                        for (e.animate = this.config.animation.enable, e.command = new u.CommandDataset, o = 0; o < t.length; o++) if (null !== (i = t[o])) switch (typeof i) {
                                                case "object":
                                                        Array.isArray(i) || "number" == typeof i.length ? e.command.dataset = i : f.extend(e.command, i);
                                                        break;
                                                case "boolean":
                                                        e.animate = i;
                                                        break;
                                                case "function":
                                                        e.callback = i
                                        }
                                        return f.freeze(e),
                                                e
                                },
                                parseChangeLayoutArgs: function (t) {
                                        var e = new u.UserInstruction,
                                                i = null,
                                                o = -1;
                                        for (e.animate = this.config.animation.enable, e.command = new u.CommandChangeLayout, o = 0; o < t.length; o++) if (null !== (i = t[o])) switch (typeof i) {
                                                case "string":
                                                        e.command.containerClassName = i;
                                                        break;
                                                case "object":
                                                        f.extend(e.command, i);
                                                        break;
                                                case "boolean":
                                                        e.animate = i;
                                                        break;
                                                case "function":
                                                        e.callback = i
                                        }
                                        return f.freeze(e),
                                                e
                                },
                                queueMix: function (t) {
                                        var e = this,
                                                i = null,
                                                o = "";
                                        return e.callActions("beforeQueueMix", arguments),
                                                i = f.defer(u.libraries),
                                                e.config.animation.queue && e.queue.length < e.config.animation.queueLimit ? (t.deferred = i, e.queue.push(t), e.config.controls.enable && (e.isToggling ? (e.buildToggleArray(t.instruction.command), o = e.getToggleSelector(), e.updateControls({
                                                        filter: {
                                                                selector: o
                                                        }
                                                })) : e.updateControls(t.instruction.command))) : (e.config.debug.showWarnings && console.warn(u.messages.warningMultimixInstanceQueueFull()), i.resolve(e.state), u.events.fire("mixBusy", e.dom.container, {
                                                        state: e.state,
                                                        instance: e
                                                }, e.dom.document), "function" == typeof e.config.callbacks.onMixBusy && e.config.callbacks.onMixBusy.call(e.dom.container, e.state, e)),
                                                e.callFilters("promiseQueueMix", i.promise, arguments)
                                },
                                getDataOperation: function (t) {
                                        var e = this,
                                                i = new u.Operation,
                                                o = [];
                                        if (i = e.callFilters("operationUnmappedGetDataOperation", i, arguments), e.dom.targets.length && !(o = e.state.activeDataset || []).length) throw new Error(u.messages.errorDatasetNotSet());
                                        return i.id = f.randomHex(),
                                                i.startState = e.state,
                                                i.startDataset = o,
                                                i.newDataset = t.slice(),
                                                e.diffDatasets(i),
                                                i.startOrder = e.targets,
                                                i.newOrder = i.show,
                                                e.config.animation.enable && (e.getStartMixData(i), e.setInter(i), i.docState = f.getDocumentState(e.dom.document), e.getInterMixData(i), e.setFinal(i), e.getFinalMixData(i), e.parseEffects(), i.hasEffect = e.hasEffect(), e.getTweenData(i)),
                                                e.targets = i.show.slice(),
                                                i.newState = e.buildState(i),
                                                Array.prototype.push.apply(e.targets, i.toRemove),
                                                i = e.callFilters("operationMappedGetDataOperation", i, arguments)
                                },
                                diffDatasets: function (t) {
                                        var e = this,
                                                i = [],
                                                o = [],
                                                s = [],
                                                n = null,
                                                a = null,
                                                r = null,
                                                l = null,
                                                c = null,
                                                d = {},
                                                h = "",
                                                p = -1;
                                        for (e.callActions("beforeDiffDatasets", arguments), p = 0; n = t.newDataset[p]; p++) {
                                                if (void 0 === (h = n[e.config.data.uidKey]) || h.toString().length < 1) throw new TypeError(u.messages.errorDatasetInvalidUidKey({
                                                        uidKey: e.config.data.uidKey
                                                }));
                                                if (d[h]) throw new Error(u.messages.errorDatasetDuplicateUid({
                                                        uid: h
                                                }));
                                                d[h] = !0,
                                                        (a = e.cache[h]) instanceof u.Target ? (e.config.data.dirtyCheck && !f.deepEquals(n, a.data) && (r = a.render(n), a.data = n, r !== a.dom.el && (a.isInDom && (a.unbindEvents(), e.dom.parent.replaceChild(r, a.dom.el)), a.isShown || (r.style.display = "none"), a.dom.el = r, a.isInDom && a.bindEvents())), r = a.dom.el) : ((a = new u.Target).init(null, e, n), a.hide()),
                                                        a.isInDom ? (c = a.dom.el.nextElementSibling, o.push(h), l && (l.lastElementChild && l.appendChild(e.dom.document.createTextNode(" ")), e.insertDatasetFrag(l, a.dom.el, s), l = null)) : ((l = l || e.dom.document.createDocumentFragment()).lastElementChild && l.appendChild(e.dom.document.createTextNode(" ")), l.appendChild(a.dom.el), a.isInDom = !0, a.unbindEvents(), a.bindEvents(), a.hide(), t.toShow.push(a), s.push(a)),
                                                        t.show.push(a)
                                        }
                                        for (l && ((c = c || e.config.layout.siblingAfter) && l.appendChild(e.dom.document.createTextNode(" ")), e.insertDatasetFrag(l, c, s)), p = 0; n = t.startDataset[p]; p++) h = n[e.config.data.uidKey],
                                                a = e.cache[h],
                                                t.show.indexOf(a) < 0 ? (t.hide.push(a), t.toHide.push(a), t.toRemove.push(a)) : i.push(h);
                                        f.isEqualArray(i, o) || (t.willSort = !0),
                                                e.callActions("afterDiffDatasets", arguments)
                                },
                                insertDatasetFrag: function (t, e, i) {
                                        var o = e ? f.arrayFromList(this.dom.parent.children).indexOf(e) : this.targets.length;
                                        for (this.dom.parent.insertBefore(t, e); i.length;) this.targets.splice(o, 0, i.shift()),
                                                o++
                                },
                                willSort: function (t, e) {
                                        var i = !1;
                                        return i = !!(this.config.behavior.liveSort || "random" === t.order || t.attribute !== e.attribute || t.order !== e.order || t.collection !== e.collection || null === t.next && e.next || t.next && null === e.next) || !(!t.next || !e.next) && this.willSort(t.next, e.next),
                                                this.callFilters("resultWillSort", i, arguments)
                                },
                                show: function () {
                                        return this.filter("all")
                                },
                                hide: function () {
                                        return this.filter("none")
                                },
                                isMixing: function () {
                                        return this.isBusy
                                },
                                filter: function () {
                                        var t = this.parseFilterArgs(arguments);
                                        return this.multimix({
                                                filter: t.command
                                        }, t.animate, t.callback)
                                },
                                toggleOn: function () {
                                        var t, e = this,
                                                i = e.parseFilterArgs(arguments),
                                                o = i.command.selector;
                                        return e.isToggling = !0,
                                                e.toggleArray.indexOf(o) < 0 && e.toggleArray.push(o),
                                                t = e.getToggleSelector(),
                                                e.multimix({
                                                        filter: t
                                                }, i.animate, i.callback)
                                },
                                toggleOff: function () {
                                        var t, e = this,
                                                i = e.parseFilterArgs(arguments),
                                                o = i.command.selector,
                                                s = e.toggleArray.indexOf(o);
                                        return e.isToggling = !0,
                                                -1 < s && e.toggleArray.splice(s, 1),
                                                t = e.getToggleSelector(),
                                                e.multimix({
                                                        filter: t
                                                }, i.animate, i.callback)
                                },
                                sort: function () {
                                        var t = this.parseSortArgs(arguments);
                                        return this.multimix({
                                                sort: t.command
                                        }, t.animate, t.callback)
                                },
                                changeLayout: function () {
                                        var t = this.parseChangeLayoutArgs(arguments);
                                        return this.multimix({
                                                changeLayout: t.command
                                        }, t.animate, t.callback)
                                },
                                dataset: function () {
                                        var t = this,
                                                e = t.parseDatasetArgs(arguments),
                                                i = null,
                                                o = null,
                                                s = !1;
                                        return t.callActions("beforeDataset", arguments),
                                                t.isBusy ? ((o = new u.QueueItem).args = arguments, o.instruction = e, t.queueMix(o)) : (e.callback && (t.userCallback = e.callback), s = e.animate ^ t.config.animation.enable ? e.animate : t.config.animation.enable, i = t.getDataOperation(e.command.dataset), t.goMix(s, i))
                                },
                                multimix: function () {
                                        var t = this,
                                                e = null,
                                                i = !1,
                                                o = null,
                                                s = t.parseMultimixArgs(arguments);
                                        return t.callActions("beforeMultimix", arguments),
                                                t.isBusy ? ((o = new u.QueueItem).args = arguments, o.instruction = s, o.triggerElement = t.lastClicked, o.isToggling = t.isToggling, t.queueMix(o)) : (e = t.getOperation(s.command), t.config.controls.enable && (s.command.filter && !t.isToggling && (t.toggleArray.length = 0, t.buildToggleArray(e.command)), t.queue.length < 1 && t.updateControls(e.command)), s.callback && (t.userCallback = s.callback), i = s.animate ^ t.config.animation.enable ? s.animate : t.config.animation.enable, t.callFilters("operationMultimix", e, arguments), t.goMix(i, e))
                                },
                                getOperation: function (t) {
                                        var e = this,
                                                i = t.sort,
                                                o = t.filter,
                                                s = t.changeLayout,
                                                n = t.remove,
                                                a = t.insert,
                                                r = new u.Operation;
                                        return (r = e.callFilters("operationUnmappedGetOperation", r, arguments)).id = f.randomHex(),
                                                r.command = t,
                                                r.startState = e.state,
                                                r.triggerElement = e.lastClicked,
                                                e.isBusy ? (e.config.debug.showWarnings && console.warn(u.messages.warningGetOperationInstanceBusy()), null) : (a && e.insertTargets(a, r), n && (r.toRemove = n.targets), r.startSort = r.newSort = r.startState.activeSort, r.startOrder = r.newOrder = e.targets, i && (r.startSort = r.startState.activeSort, r.newSort = i, r.willSort = e.willSort(i, r.startState.activeSort), r.willSort && e.sortOperation(r)), r.startFilter = r.startState.activeFilter, r.newFilter = o || f.extend(new u.CommandFilter, r.startFilter), "all" === r.newFilter.selector ? r.newFilter.selector = e.config.selectors.target : "none" === r.newFilter.selector && (r.newFilter.selector = ""), e.filterOperation(r), r.startContainerClassName = r.startState.activeContainerClassName, s ? (r.newContainerClassName = s.containerClassName, r.newContainerClassName !== r.startContainerClassName && (r.willChangeLayout = !0)) : r.newContainerClassName = r.startContainerClassName, e.config.animation.enable && (e.getStartMixData(r), e.setInter(r), r.docState = f.getDocumentState(e.dom.document), e.getInterMixData(r), e.setFinal(r), e.getFinalMixData(r), e.parseEffects(), r.hasEffect = e.hasEffect(), e.getTweenData(r)), r.willSort && (e.targets = r.newOrder), r.newState = e.buildState(r), e.callFilters("operationMappedGetOperation", r, arguments))
                                },
                                tween: function (t, e) {
                                        var i = null,
                                                o = null,
                                                s = -1,
                                                n = -1;
                                        for (e = Math.min(e, 1), e = Math.max(e, 0), n = 0; i = t.show[n]; n++) o = t.showPosData[n],
                                                i.applyTween(o, e);
                                        for (n = 0; i = t.hide[n]; n++) i.isShown && i.hide(),
                                                -1 < (s = t.toHide.indexOf(i)) && (o = t.toHidePosData[s], i.isShown || i.show(), i.applyTween(o, e))
                                },
                                insert: function () {
                                        var t = this.parseInsertArgs(arguments);
                                        return this.multimix({
                                                insert: t.command
                                        }, t.animate, t.callback)
                                },
                                insertBefore: function () {
                                        var t = this.parseInsertArgs(arguments);
                                        return this.insert(t.command.collection, "before", t.command.sibling, t.animate, t.callback)
                                },
                                insertAfter: function () {
                                        var t = this.parseInsertArgs(arguments);
                                        return this.insert(t.command.collection, "after", t.command.sibling, t.animate, t.callback)
                                },
                                prepend: function () {
                                        var t = this.parseInsertArgs(arguments);
                                        return this.insert(0, t.command.collection, t.animate, t.callback)
                                },
                                append: function () {
                                        var t = this.parseInsertArgs(arguments);
                                        return this.insert(this.state.totalTargets, t.command.collection, t.animate, t.callback)
                                },
                                remove: function () {
                                        var t = this.parseRemoveArgs(arguments);
                                        return this.multimix({
                                                remove: t.command
                                        }, t.animate, t.callback)
                                },
                                getConfig: function (t) {
                                        var e = null;
                                        return e = t ? f.getProperty(this.config, t) : this.config,
                                                this.callFilters("valueGetConfig", e, arguments)
                                },
                                configure: function (t) {
                                        this.callActions("beforeConfigure", arguments),
                                                f.extend(this.config, t, !0, !0),
                                                this.callActions("afterConfigure", arguments)
                                },
                                getState: function () {
                                        var t;
                                        return t = new u.State,
                                                f.extend(t, this.state),
                                                f.freeze(t),
                                                this.callFilters("stateGetState", t, arguments)
                                },
                                forceRefresh: function () {
                                        this.indexTargets()
                                },
                                forceRender: function () {
                                        var t = this,
                                                e = null,
                                                i = null,
                                                o = "";
                                        for (o in t.cache) (i = (e = t.cache[o]).render(e.data)) !== e.dom.el && (e.isInDom && (e.unbindEvents(), t.dom.parent.replaceChild(i, e.dom.el)), e.isShown || (i.style.display = "none"), e.dom.el = i, e.isInDom && e.bindEvents());
                                        t.state = t.buildState(t.lastOperation)
                                },
                                destroy: function (t) {
                                        var e = this,
                                                i = null,
                                                o = null,
                                                s = 0;
                                        for (e.callActions("beforeDestroy", arguments), s = 0; i = e.controls[s]; s++) i.removeBinding(e);
                                        for (s = 0; o = e.targets[s]; s++) t && o.show(),
                                                o.unbindEvents();
                                        e.dom.container.id.match(/^MixItUp/) && e.dom.container.removeAttribute("id"),
                                                delete u.instances[e.id],
                                                e.callActions("afterDestroy", arguments)
                                }
                        }),
                        u.IMoveData = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.posIn = null,
                                        this.posOut = null,
                                        this.operation = null,
                                        this.callback = null,
                                        this.statusChange = "",
                                        this.duration = -1,
                                        this.staggerIndex = -1,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.IMoveData),
                        u.IMoveData.prototype = Object.create(u.Base.prototype),
                        u.IMoveData.prototype.constructor = u.IMoveData,
                        u.TargetDom = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.el = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.TargetDom),
                        u.TargetDom.prototype = Object.create(u.Base.prototype),
                        u.TargetDom.prototype.constructor = u.TargetDom,
                        u.Target = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.id = "",
                                        this.sortString = "",
                                        this.mixer = null,
                                        this.callback = null,
                                        this.isShown = !1,
                                        this.isBound = !1,
                                        this.isExcluded = !1,
                                        this.isInDom = !1,
                                        this.handler = null,
                                        this.operation = null,
                                        this.data = null,
                                        this.dom = new u.TargetDom,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.Target),
                        u.Target.prototype = Object.create(u.Base.prototype),
                        f.extend(u.Target.prototype, {
                                constructor: u.Target,
                                init: function (t, e, i) {
                                        var o = this,
                                                s = "";
                                        if (o.callActions("beforeInit", arguments), o.mixer = e, t = t || o.render(i), o.cacheDom(t), o.bindEvents(), "none" !== o.dom.el.style.display && (o.isShown = !0), i && e.config.data.uidKey) {
                                                if (void 0 === (s = i[e.config.data.uidKey]) || s.toString().length < 1) throw new TypeError(u.messages.errorDatasetInvalidUidKey({
                                                        uidKey: e.config.data.uidKey
                                                }));
                                                o.id = s,
                                                        o.data = i,
                                                        e.cache[s] = o
                                        }
                                        o.callActions("afterInit", arguments)
                                },
                                render: function (t) {
                                        var e, i = null,
                                                o = null,
                                                s = null;
                                        if (this.callActions("beforeRender", arguments), "function" != typeof (i = this.callFilters("renderRender", this.mixer.config.render.target, arguments))) throw new TypeError(u.messages.errorDatasetRendererNotSet());
                                        return (e = i(t)) && "object" == typeof e && f.isElement(e) ? o = e : "string" == typeof e && ((s = document.createElement("div")).innerHTML = e, o = s.firstElementChild),
                                                this.callFilters("elRender", o, arguments)
                                },
                                cacheDom: function (t) {
                                        this.callActions("beforeCacheDom", arguments),
                                                this.dom.el = t,
                                                this.callActions("afterCacheDom", arguments)
                                },
                                getSortString: function (t) {
                                        var e = this.dom.el.getAttribute("data-" + t) || "";
                                        this.callActions("beforeGetSortString", arguments),
                                                e = isNaN(+e) ? e.toLowerCase() : +e,
                                                this.sortString = e,
                                                this.callActions("afterGetSortString", arguments)
                                },
                                show: function () {
                                        var t = this;
                                        t.callActions("beforeShow", arguments),
                                                t.isShown || (t.dom.el.style.display = "", t.isShown = !0),
                                                t.callActions("afterShow", arguments)
                                },
                                hide: function () {
                                        var t = this;
                                        t.callActions("beforeHide", arguments),
                                                t.isShown && (t.dom.el.style.display = "none", t.isShown = !1),
                                                t.callActions("afterHide", arguments)
                                },
                                move: function (t) {
                                        var e = this;
                                        e.callActions("beforeMove", arguments),
                                                e.isExcluded || e.mixer.targetsMoved++,
                                                e.applyStylesIn(t),
                                                requestAnimationFrame(function () {
                                                        e.applyStylesOut(t)
                                                }),
                                                e.callActions("afterMove", arguments)
                                },
                                applyTween: function (t, e) {
                                        var i = this,
                                                o = "",
                                                s = null,
                                                n = t.posIn,
                                                a = [],
                                                r = new u.StyleData,
                                                l = -1;
                                        for (i.callActions("beforeApplyTween", arguments), r.x = n.x, r.y = n.y, 0 === e ? i.hide() : i.isShown || i.show(), l = 0; o = u.features.TWEENABLE[l]; l++) if (s = t.tweenData[o], "x" === o) {
                                                if (!s) continue;
                                                r.x = n.x + s * e
                                        } else if ("y" === o) {
                                                if (!s) continue;
                                                r.y = n.y + s * e
                                        } else if (s instanceof u.TransformData) {
                                                if (!s.value) continue;
                                                r[o].value = n[o].value + s.value * e,
                                                        r[o].unit = s.unit,
                                                        a.push(o + "(" + r[o].value + s.unit + ")")
                                        } else {
                                                if (!s) continue;
                                                r[o] = n[o] + s * e,
                                                        i.dom.el.style[o] = r[o]
                                        } (r.x || r.y) && a.unshift("translate(" + r.x + "px, " + r.y + "px)"),
                                                a.length && (i.dom.el.style[u.features.transformProp] = a.join(" ")),
                                                i.callActions("afterApplyTween", arguments)
                                },
                                applyStylesIn: function (t) {
                                        var e = this,
                                                i = t.posIn,
                                                o = 1 !== e.mixer.effectsIn.opacity,
                                                s = [];
                                        e.callActions("beforeApplyStylesIn", arguments),
                                                s.push("translate(" + i.x + "px, " + i.y + "px)"),
                                                e.mixer.config.animation.animateResizeTargets && ("show" !== t.statusChange && (e.dom.el.style.width = i.width + "px", e.dom.el.style.height = i.height + "px"), e.dom.el.style.marginRight = i.marginRight + "px", e.dom.el.style.marginBottom = i.marginBottom + "px"),
                                                o && (e.dom.el.style.opacity = i.opacity),
                                                "show" === t.statusChange && (s = s.concat(e.mixer.transformIn)),
                                                e.dom.el.style[u.features.transformProp] = s.join(" "),
                                                e.callActions("afterApplyStylesIn", arguments)
                                },
                                applyStylesOut: function (t) {
                                        var e = this,
                                                i = [],
                                                o = [],
                                                s = e.mixer.config.animation.animateResizeTargets,
                                                n = void 0 !== e.mixer.effectsIn.opacity;
                                        if (e.callActions("beforeApplyStylesOut", arguments), i.push(e.writeTransitionRule(u.features.transformRule, t.staggerIndex)), "none" !== t.statusChange && i.push(e.writeTransitionRule("opacity", t.staggerIndex, t.duration)), s && (i.push(e.writeTransitionRule("width", t.staggerIndex, t.duration)), i.push(e.writeTransitionRule("height", t.staggerIndex, t.duration)), i.push(e.writeTransitionRule("margin", t.staggerIndex, t.duration))), !t.callback) return e.mixer.targetsImmovable++,
                                                void (e.mixer.targetsMoved === e.mixer.targetsImmovable && e.mixer.cleanUp(t.operation));
                                        switch (e.operation = t.operation, e.callback = t.callback, e.isExcluded || e.mixer.targetsBound++, e.isBound = !0, e.applyTransition(i), s && 0 < t.posOut.width && 0 < t.posOut.height && (e.dom.el.style.width = t.posOut.width + "px", e.dom.el.style.height = t.posOut.height + "px", e.dom.el.style.marginRight = t.posOut.marginRight + "px", e.dom.el.style.marginBottom = t.posOut.marginBottom + "px"), e.mixer.config.animation.nudge || "hide" !== t.statusChange || o.push("translate(" + t.posOut.x + "px, " + t.posOut.y + "px)"), t.statusChange) {
                                                case "hide":
                                                        n && (e.dom.el.style.opacity = e.mixer.effectsOut.opacity),
                                                                o = o.concat(e.mixer.transformOut);
                                                        break;
                                                case "show":
                                                        n && (e.dom.el.style.opacity = 1)
                                        }(e.mixer.config.animation.nudge || !e.mixer.config.animation.nudge && "hide" !== t.statusChange) && o.push("translate(" + t.posOut.x + "px, " + t.posOut.y + "px)"),
                                                e.dom.el.style[u.features.transformProp] = o.join(" "),
                                                e.callActions("afterApplyStylesOut", arguments)
                                },
                                writeTransitionRule: function (t, e, i) {
                                        var o, s = this.getDelay(e);
                                        return o = t + " " + (0 < i ? i : this.mixer.config.animation.duration) + "ms " + s + "ms " + ("opacity" === t ? "linear" : this.mixer.config.animation.easing),
                                                this.callFilters("ruleWriteTransitionRule", o, arguments)
                                },
                                getDelay: function (t) {
                                        var e, i = this;
                                        return "function" == typeof i.mixer.config.animation.staggerSequence && (t = i.mixer.config.animation.staggerSequence.call(i, t, i.state)),
                                                e = i.mixer.staggerDuration ? t * i.mixer.staggerDuration : 0,
                                                i.callFilters("delayGetDelay", e, arguments)
                                },
                                applyTransition: function (t) {
                                        var e = t.join(", ");
                                        this.callActions("beforeApplyTransition", arguments),
                                                this.dom.el.style[u.features.transitionProp] = e,
                                                this.callActions("afterApplyTransition", arguments)
                                },
                                handleTransitionEnd: function (t) {
                                        var e = this,
                                                i = t.propertyName,
                                                o = e.mixer.config.animation.animateResizeTargets;
                                        e.callActions("beforeHandleTransitionEnd", arguments),
                                                e.isBound && t.target.matches(e.mixer.config.selectors.target) && (-1 < i.indexOf("transform") || -1 < i.indexOf("opacity") || o && -1 < i.indexOf("height") || o && -1 < i.indexOf("width") || o && -1 < i.indexOf("margin")) && (e.callback.call(e, e.operation), e.isBound = !1, e.callback = null, e.operation = null),
                                                e.callActions("afterHandleTransitionEnd", arguments)
                                },
                                eventBus: function (t) {
                                        switch (this.callActions("beforeEventBus", arguments), t.type) {
                                                case "webkitTransitionEnd":
                                                case "transitionend":
                                                        this.handleTransitionEnd(t)
                                        }
                                        this.callActions("afterEventBus", arguments)
                                },
                                unbindEvents: function () {
                                        var t = this;
                                        t.callActions("beforeUnbindEvents", arguments),
                                                f.off(t.dom.el, "webkitTransitionEnd", t.handler),
                                                f.off(t.dom.el, "transitionend", t.handler),
                                                t.callActions("afterUnbindEvents", arguments)
                                },
                                bindEvents: function () {
                                        var t, e = this;
                                        e.callActions("beforeBindEvents", arguments),
                                                t = "webkit" === u.features.transitionPrefix ? "webkitTransitionEnd" : "transitionend",
                                                e.handler = function (t) {
                                                        return e.eventBus(t)
                                                },
                                                f.on(e.dom.el, t, e.handler),
                                                e.callActions("afterBindEvents", arguments)
                                },
                                getPosData: function (t) {
                                        var e = this,
                                                i = {},
                                                o = null,
                                                s = new u.StyleData;
                                        return e.callActions("beforeGetPosData", arguments),
                                                s.x = e.dom.el.offsetLeft,
                                                s.y = e.dom.el.offsetTop,
                                                (e.mixer.config.animation.animateResizeTargets || t) && (o = e.dom.el.getBoundingClientRect(), s.top = o.top, s.right = o.right, s.bottom = o.bottom, s.left = o.left, s.width = o.width, s.height = o.height),
                                                e.mixer.config.animation.animateResizeTargets && (i = p.getComputedStyle(e.dom.el), s.marginBottom = parseFloat(i.marginBottom), s.marginRight = parseFloat(i.marginRight)),
                                                e.callFilters("posDataGetPosData", s, arguments)
                                },
                                cleanUp: function () {
                                        var t = this;
                                        t.callActions("beforeCleanUp", arguments),
                                                t.dom.el.style[u.features.transformProp] = "",
                                                t.dom.el.style[u.features.transitionProp] = "",
                                                t.dom.el.style.opacity = "",
                                                t.mixer.config.animation.animateResizeTargets && (t.dom.el.style.width = "", t.dom.el.style.height = "", t.dom.el.style.marginRight = "", t.dom.el.style.marginBottom = ""),
                                                t.callActions("afterCleanUp", arguments)
                                }
                        }),
                        u.Collection = function (t) {
                                var e = null,
                                        i = -1;
                                for (this.callActions("beforeConstruct"), i = 0; e = t[i]; i++) this[i] = e;
                                this.length = t.length,
                                        this.callActions("afterConstruct"),
                                        f.freeze(this)
                        },
                        u.BaseStatic.call(u.Collection),
                        u.Collection.prototype = Object.create(u.Base.prototype),
                        f.extend(u.Collection.prototype, {
                                constructor: u.Collection,
                                mixitup: function (t) {
                                        var e = null,
                                                i = Array.prototype.slice.call(arguments),
                                                o = [],
                                                s = -1;
                                        for (this.callActions("beforeMixitup"), i.shift(), s = 0; e = this[s]; s++) o.push(e[t].apply(e, i));
                                        return this.callFilters("promiseMixitup", f.all(o, u.libraries), arguments)
                                }
                        }),
                        u.Operation = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.id = "",
                                        this.args = [],
                                        this.command = null,
                                        this.showPosData = [],
                                        this.toHidePosData = [],
                                        this.startState = null,
                                        this.newState = null,
                                        this.docState = null,
                                        this.willSort = !1,
                                        this.willChangeLayout = !1,
                                        this.hasEffect = !1,
                                        this.hasFailed = !1,
                                        this.triggerElement = null,
                                        this.show = [],
                                        this.hide = [],
                                        this.matching = [],
                                        this.toShow = [],
                                        this.toHide = [],
                                        this.toMove = [],
                                        this.toRemove = [],
                                        this.startOrder = [],
                                        this.newOrder = [],
                                        this.startSort = null,
                                        this.newSort = null,
                                        this.startFilter = null,
                                        this.newFilter = null,
                                        this.startDataset = null,
                                        this.newDataset = null,
                                        this.viewportDeltaX = 0,
                                        this.viewportDeltaY = 0,
                                        this.startX = 0,
                                        this.startY = 0,
                                        this.startHeight = 0,
                                        this.startWidth = 0,
                                        this.newX = 0,
                                        this.newY = 0,
                                        this.newHeight = 0,
                                        this.newWidth = 0,
                                        this.startContainerClassName = "",
                                        this.startDisplay = "",
                                        this.newContainerClassName = "",
                                        this.newDisplay = "",
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.Operation),
                        u.Operation.prototype = Object.create(u.Base.prototype),
                        u.Operation.prototype.constructor = u.Operation,
                        u.State = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.id = "",
                                        this.activeFilter = null,
                                        this.activeSort = null,
                                        this.activeContainerClassName = "",
                                        this.container = null,
                                        this.targets = [],
                                        this.hide = [],
                                        this.show = [],
                                        this.matching = [],
                                        this.totalTargets = -1,
                                        this.totalShow = -1,
                                        this.totalHide = -1,
                                        this.totalMatching = -1,
                                        this.hasFailed = !1,
                                        this.triggerElement = null,
                                        this.activeDataset = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.State),
                        u.State.prototype = Object.create(u.Base.prototype),
                        u.State.prototype.constructor = u.State,
                        u.UserInstruction = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.command = {},
                                        this.animate = !1,
                                        this.callback = null,
                                        this.callActions("afterConstruct"),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.UserInstruction),
                        u.UserInstruction.prototype = Object.create(u.Base.prototype),
                        u.UserInstruction.prototype.constructor = u.UserInstruction,
                        u.Messages = function () {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct"),
                                        this.ERROR_FACTORY_INVALID_CONTAINER = "[MixItUp] An invalid selector or element reference was passed to the mixitup factory function",
                                        this.ERROR_FACTORY_CONTAINER_NOT_FOUND = "[MixItUp] The provided selector yielded no container element",
                                        this.ERROR_CONFIG_INVALID_ANIMATION_EFFECTS = "[MixItUp] Invalid value for `animation.effects`",
                                        this.ERROR_CONFIG_INVALID_CONTROLS_SCOPE = "[MixItUp] Invalid value for `controls.scope`",
                                        this.ERROR_CONFIG_INVALID_PROPERTY = '[MixitUp] Invalid configuration object property "${erroneous}"${suggestion}',
                                        this.ERROR_CONFIG_INVALID_PROPERTY_SUGGESTION = '. Did you mean "${probableMatch}"?',
                                        this.ERROR_CONFIG_DATA_UID_KEY_NOT_SET = "[MixItUp] To use the dataset API, a UID key must be specified using `data.uidKey`",
                                        this.ERROR_DATASET_INVALID_UID_KEY = '[MixItUp] The specified UID key "${uidKey}" is not present on one or more dataset items',
                                        this.ERROR_DATASET_DUPLICATE_UID = '[MixItUp] The UID "${uid}" was found on two or more dataset items. UIDs must be unique.',
                                        this.ERROR_INSERT_INVALID_ARGUMENTS = "[MixItUp] Please provider either an index or a sibling and position to insert, not both",
                                        this.ERROR_INSERT_PREEXISTING_ELEMENT = "[MixItUp] An element to be inserted already exists in the container",
                                        this.ERROR_FILTER_INVALID_ARGUMENTS = "[MixItUp] Please provide either a selector or collection `.filter()`, not both",
                                        this.ERROR_DATASET_NOT_SET = "[MixItUp] To use the dataset API with pre-rendered targets, a starting dataset must be set using `load.dataset`",
                                        this.ERROR_DATASET_PRERENDERED_MISMATCH = "[MixItUp] `load.dataset` does not match pre-rendered targets",
                                        this.ERROR_DATASET_RENDERER_NOT_SET = "[MixItUp] To insert an element via the dataset API, a target renderer function must be provided to `render.target`",
                                        this.ERROR_SORT_NON_EXISTENT_ELEMENT = "[MixItUp] An element to be sorted does not already exist in the container",
                                        this.WARNING_FACTORY_PREEXISTING_INSTANCE = "[MixItUp] WARNING: This element already has an active MixItUp instance. The provided configuration object will be ignored. If you wish to perform additional methods on this instance, please create a reference.",
                                        this.WARNING_INSERT_NO_ELEMENTS = "[MixItUp] WARNING: No valid elements were passed to `.insert()`",
                                        this.WARNING_REMOVE_NO_ELEMENTS = "[MixItUp] WARNING: No valid elements were passed to `.remove()`",
                                        this.WARNING_MULTIMIX_INSTANCE_QUEUE_FULL = "[MixItUp] WARNING: An operation was requested but the MixItUp instance was busy. The operation was rejected because the queue is full or queuing is disabled.",
                                        this.WARNING_GET_OPERATION_INSTANCE_BUSY = "[MixItUp] WARNING: Operations can be be created while the MixItUp instance is busy.",
                                        this.WARNING_NO_PROMISE_IMPLEMENTATION = "[MixItUp] WARNING: No Promise implementations could be found. If you wish to use promises with MixItUp please install an ES6 Promise polyfill.",
                                        this.WARNING_INCONSISTENT_SORTING_ATTRIBUTES = '[MixItUp] WARNING: The requested sorting data attribute "${attribute}" was not present on one or more target elements which may product unexpected sort output',
                                        this.callActions("afterConstruct"),
                                        this.compileTemplates(),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.Messages),
                        u.Messages.prototype = Object.create(u.Base.prototype),
                        u.Messages.prototype.constructor = u.Messages,
                        u.Messages.prototype.compileTemplates = function () {
                                var t = "",
                                        e = "";
                                for (t in this) "string" == typeof (e = this[t]) && (this[f.camelCase(t)] = f.template(e))
                        },
                        u.messages = new u.Messages,
                        u.Facade = function (t) {
                                u.Base.call(this),
                                        this.callActions("beforeConstruct", arguments),
                                        this.configure = t.configure.bind(t),
                                        this.show = t.show.bind(t),
                                        this.hide = t.hide.bind(t),
                                        this.filter = t.filter.bind(t),
                                        this.toggleOn = t.toggleOn.bind(t),
                                        this.toggleOff = t.toggleOff.bind(t),
                                        this.sort = t.sort.bind(t),
                                        this.changeLayout = t.changeLayout.bind(t),
                                        this.multimix = t.multimix.bind(t),
                                        this.dataset = t.dataset.bind(t),
                                        this.tween = t.tween.bind(t),
                                        this.insert = t.insert.bind(t),
                                        this.insertBefore = t.insertBefore.bind(t),
                                        this.insertAfter = t.insertAfter.bind(t),
                                        this.prepend = t.prepend.bind(t),
                                        this.append = t.append.bind(t),
                                        this.remove = t.remove.bind(t),
                                        this.destroy = t.destroy.bind(t),
                                        this.forceRefresh = t.forceRefresh.bind(t),
                                        this.forceRender = t.forceRender.bind(t),
                                        this.isMixing = t.isMixing.bind(t),
                                        this.getOperation = t.getOperation.bind(t),
                                        this.getConfig = t.getConfig.bind(t),
                                        this.getState = t.getState.bind(t),
                                        this.callActions("afterConstruct", arguments),
                                        f.freeze(this),
                                        f.seal(this)
                        },
                        u.BaseStatic.call(u.Facade),
                        u.Facade.prototype = Object.create(u.Base.prototype),
                        u.Facade.prototype.constructor = u.Facade,
                        "object" == typeof exports && "object" == typeof module ? module.exports = u : "function" == typeof define && define.amd ? define(function () {
                                return u
                        }) : void 0 !== p.mixitup && "function" == typeof p.mixitup || (p.mixitup = u),
                        u.BaseStatic.call(u.constructor),
                        u.NAME = "mixitup",
                        u.CORE_VERSION = "3.3.1"
        }(window),


        function (e) {
                "undefined" != typeof jQuery && jQuery || "function" != typeof define || !define.amd ? "undefined" != typeof jQuery && jQuery || "object" != typeof exports ? e(jQuery, document, window, navigator) : e(require("jquery"), document, window, navigator) : define(["jquery"], function (t) {
                        return e(t, document, window, navigator)
                })
        }(function (l, c, d, t, h) {
                "use strict";
                var e, i, o = 0,
                        s = (e = t.userAgent, i = /msie\s\d+/i, 0 < e.search(i) && i.exec(e).toString().split(" ")[1] < 9 && (l("html").addClass("lt-ie9"), !0));
                Function.prototype.bind || (Function.prototype.bind = function (o) {
                        var s = this,
                                n = [].slice;
                        if ("function" != typeof s) throw new TypeError;
                        var a = n.call(arguments, 1),
                                r = function () {
                                        if (this instanceof r) {
                                                var t = function () { };
                                                t.prototype = s.prototype;
                                                var e = new t,
                                                        i = s.apply(e, a.concat(n.call(arguments)));
                                                return Object(i) === i ? i : e
                                        }
                                        return s.apply(o, a.concat(n.call(arguments)))
                                };
                        return r
                }),
                        Array.prototype.indexOf || (Array.prototype.indexOf = function (t, e) {
                                var i;
                                if (null == this) throw new TypeError('"this" is null or not defined');
                                var o = Object(this),
                                        s = o.length >>> 0;
                                if (0 == s) return -1;
                                var n = +e || 0;
                                if (Math.abs(n) === 1 / 0 && (n = 0), s <= n) return -1;
                                for (i = Math.max(0 <= n ? n : s - Math.abs(n), 0); i < s;) {
                                        if (i in o && o[i] === t) return i;
                                        i++
                                }
                                return -1
                        });

                function n(t, e, i) {
                        this.VERSION = "2.3.1",
                                this.input = t,
                                this.plugin_count = i,
                                this.current_plugin = 0,
                                this.calc_count = 0,
                                this.update_tm = 0,
                                this.old_from = 0,
                                this.old_to = 0,
                                this.old_min_interval = null,
                                this.raf_id = null,
                                this.dragging = !1,
                                this.force_redraw = !1,
                                this.no_diapason = !1,
                                this.has_tab_index = !0,
                                this.is_key = !1,
                                this.is_update = !1,
                                this.is_start = !0,
                                this.is_finish = !1,
                                this.is_active = !1,
                                this.is_resize = !1,
                                this.is_click = !1,
                                e = e || {},
                                this.$cache = {
                                        win: l(d),
                                        body: l(c.body),
                                        input: l(t),
                                        cont: null,
                                        rs: null,
                                        min: null,
                                        max: null,
                                        from: null,
                                        to: null,
                                        single: null,
                                        bar: null,
                                        line: null,
                                        s_single: null,
                                        s_from: null,
                                        s_to: null,
                                        shad_single: null,
                                        shad_from: null,
                                        shad_to: null,
                                        edge: null,
                                        grid: null,
                                        grid_labels: []
                                },
                                this.coords = {
                                        x_gap: 0,
                                        x_pointer: 0,
                                        w_rs: 0,
                                        w_rs_old: 0,
                                        w_handle: 0,
                                        p_gap: 0,
                                        p_gap_left: 0,
                                        p_gap_right: 0,
                                        p_step: 0,
                                        p_pointer: 0,
                                        p_handle: 0,
                                        p_single_fake: 0,
                                        p_single_real: 0,
                                        p_from_fake: 0,
                                        p_from_real: 0,
                                        p_to_fake: 0,
                                        p_to_real: 0,
                                        p_bar_x: 0,
                                        p_bar_w: 0,
                                        grid_gap: 0,
                                        big_num: 0,
                                        big: [],
                                        big_w: [],
                                        big_p: [],
                                        big_x: []
                                },
                                this.labels = {
                                        w_min: 0,
                                        w_max: 0,
                                        w_from: 0,
                                        w_to: 0,
                                        w_single: 0,
                                        p_min: 0,
                                        p_max: 0,
                                        p_from_fake: 0,
                                        p_from_left: 0,
                                        p_to_fake: 0,
                                        p_to_left: 0,
                                        p_single_fake: 0,
                                        p_single_left: 0
                                };
                        var o, s, n, a = this.$cache.input,
                                r = a.prop("value");
                        for (n in o = {
                                skin: "flat",
                                type: "single",
                                min: 10,
                                max: 100,
                                from: null,
                                to: null,
                                step: 1,
                                min_interval: 0,
                                max_interval: 0,
                                drag_interval: !1,
                                values: [],
                                p_values: [],
                                from_fixed: !1,
                                from_min: null,
                                from_max: null,
                                from_shadow: !1,
                                to_fixed: !1,
                                to_min: null,
                                to_max: null,
                                to_shadow: !1,
                                prettify_enabled: !0,
                                prettify_separator: " ",
                                prettify: null,
                                force_edges: !1,
                                keyboard: !0,
                                grid: !1,
                                grid_margin: !0,
                                grid_num: 4,
                                grid_snap: !1,
                                hide_min_max: !1,
                                hide_from_to: !1,
                                prefix: "",
                                postfix: "",
                                max_postfix: "",
                                decorate_both: !0,
                                values_separator: " — ",
                                input_values_separator: ";",
                                disable: !1,
                                block: !1,
                                extra_classes: "",
                                scope: null,
                                onStart: null,
                                onChange: null,
                                onFinish: null,
                                onUpdate: null
                        }, "INPUT" !== a[0].nodeName && console && console.warn && console.warn("Base element should be <input>!", a[0]), (s = {
                                skin: a.data("skin"),
                                type: a.data("type"),
                                min: a.data("min"),
                                max: a.data("max"),
                                from: a.data("from"),
                                to: a.data("to"),
                                step: a.data("step"),
                                min_interval: a.data("minInterval"),
                                max_interval: a.data("maxInterval"),
                                drag_interval: a.data("dragInterval"),
                                values: a.data("values"),
                                from_fixed: a.data("fromFixed"),
                                from_min: a.data("fromMin"),
                                from_max: a.data("fromMax"),
                                from_shadow: a.data("fromShadow"),
                                to_fixed: a.data("toFixed"),
                                to_min: a.data("toMin"),
                                to_max: a.data("toMax"),
                                to_shadow: a.data("toShadow"),
                                prettify_enabled: a.data("prettifyEnabled"),
                                prettify_separator: a.data("prettifySeparator"),
                                force_edges: a.data("forceEdges"),
                                keyboard: a.data("keyboard"),
                                grid: a.data("grid"),
                                grid_margin: a.data("gridMargin"),
                                grid_num: a.data("gridNum"),
                                grid_snap: a.data("gridSnap"),
                                hide_min_max: a.data("hideMinMax"),
                                hide_from_to: a.data("hideFromTo"),
                                prefix: a.data("prefix"),
                                postfix: a.data("postfix"),
                                max_postfix: a.data("maxPostfix"),
                                decorate_both: a.data("decorateBoth"),
                                values_separator: a.data("valuesSeparator"),
                                input_values_separator: a.data("inputValuesSeparator"),
                                disable: a.data("disable"),
                                block: a.data("block"),
                                extra_classes: a.data("extraClasses")
                        }).values = s.values && s.values.split(","), s) s.hasOwnProperty(n) && (s[n] !== h && "" !== s[n] || delete s[n]);
                        r !== h && "" !== r && ((r = r.split(s.input_values_separator || e.input_values_separator || ";"))[0] && r[0] == +r[0] && (r[0] = +r[0]), r[1] && r[1] == +r[1] && (r[1] = +r[1]), e && e.values && e.values.length ? (o.from = r[0] && e.values.indexOf(r[0]), o.to = r[1] && e.values.indexOf(r[1])) : (o.from = r[0] && +r[0], o.to = r[1] && +r[1])),
                                l.extend(o, e),
                                l.extend(o, s),
                                this.options = o,
                                this.update_check = {},
                                this.validate(),
                                this.result = {
                                        input: this.$cache.input,
                                        slider: null,
                                        min: this.options.min,
                                        max: this.options.max,
                                        from: this.options.from,
                                        from_percent: 0,
                                        from_value: null,
                                        to: this.options.to,
                                        to_percent: 0,
                                        to_value: null
                                },
                                this.init()
                }
                n.prototype = {
                        init: function (t) {
                                this.no_diapason = !1,
                                        this.coords.p_step = this.convertToPercent(this.options.step, !0),
                                        this.target = "base",
                                        this.toggleInput(),
                                        this.append(),
                                        this.setMinMax(),
                                        t ? (this.force_redraw = !0, this.calc(!0), this.callOnUpdate()) : (this.force_redraw = !0, this.calc(!0), this.callOnStart()),
                                        this.updateScene()
                        },
                        append: function () {
                                var t = '<span class="irs irs--' + this.options.skin + " js-irs-" + this.plugin_count + " " + this.options.extra_classes + '"></span>';
                                this.$cache.input.before(t),
                                        this.$cache.input.prop("readonly", !0),
                                        this.$cache.cont = this.$cache.input.prev(),
                                        this.result.slider = this.$cache.cont,
                                        this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="0"></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span>'),
                                        this.$cache.rs = this.$cache.cont.find(".irs"),
                                        this.$cache.min = this.$cache.cont.find(".irs-min"),
                                        this.$cache.max = this.$cache.cont.find(".irs-max"),
                                        this.$cache.from = this.$cache.cont.find(".irs-from"),
                                        this.$cache.to = this.$cache.cont.find(".irs-to"),
                                        this.$cache.single = this.$cache.cont.find(".irs-single"),
                                        this.$cache.line = this.$cache.cont.find(".irs-line"),
                                        this.$cache.grid = this.$cache.cont.find(".irs-grid"),
                                        "single" === this.options.type ? (this.$cache.cont.append('<span class="irs-bar irs-bar--single"></span><span class="irs-shadow shadow-single"></span><span class="irs-handle single"><i></i><i></i><i></i></span>'), this.$cache.bar = this.$cache.cont.find(".irs-bar"), this.$cache.edge = this.$cache.cont.find(".irs-bar-edge"), this.$cache.s_single = this.$cache.cont.find(".single"), this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append('<span class="irs-bar"></span><span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-handle from"><i></i><i></i><i></i></span><span class="irs-handle to"><i></i><i></i><i></i></span>'), this.$cache.bar = this.$cache.cont.find(".irs-bar"), this.$cache.s_from = this.$cache.cont.find(".from"), this.$cache.s_to = this.$cache.cont.find(".to"), this.$cache.shad_from = this.$cache.cont.find(".shadow-from"), this.$cache.shad_to = this.$cache.cont.find(".shadow-to"), this.setTopHandler()),
                                        this.options.hide_from_to && (this.$cache.from[0].style.display = "none", this.$cache.to[0].style.display = "none", this.$cache.single[0].style.display = "none"),
                                        this.appendGrid(),
                                        this.options.disable ? (this.appendDisableMask(), this.$cache.input[0].disabled = !0) : (this.$cache.input[0].disabled = !1, this.removeDisableMask(), this.bindEvents()),
                                        this.options.disable || (this.options.block ? this.appendDisableMask() : this.removeDisableMask()),
                                        this.options.drag_interval && (this.$cache.bar[0].style.cursor = "ew-resize")
                        },
                        setTopHandler: function () {
                                var t = this.options.min,
                                        e = this.options.max,
                                        i = this.options.from,
                                        o = this.options.to;
                                t < i && o === e ? this.$cache.s_from.addClass("type_last") : o < e && this.$cache.s_to.addClass("type_last")
                        },
                        changeLevel: function (t) {
                                switch (t) {
                                        case "single":
                                                this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake),
                                                        this.$cache.s_single.addClass("state_hover");
                                                break;
                                        case "from":
                                                this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake),
                                                        this.$cache.s_from.addClass("state_hover"),
                                                        this.$cache.s_from.addClass("type_last"),
                                                        this.$cache.s_to.removeClass("type_last");
                                                break;
                                        case "to":
                                                this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake),
                                                        this.$cache.s_to.addClass("state_hover"),
                                                        this.$cache.s_to.addClass("type_last"),
                                                        this.$cache.s_from.removeClass("type_last");
                                                break;
                                        case "both":
                                                this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake),
                                                        this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer),
                                                        this.$cache.s_to.removeClass("type_last"),
                                                        this.$cache.s_from.removeClass("type_last")
                                }
                        },
                        appendDisableMask: function () {
                                this.$cache.cont.append('<span class="irs-disable-mask"></span>'),
                                        this.$cache.cont.addClass("irs-disabled")
                        },
                        removeDisableMask: function () {
                                this.$cache.cont.remove(".irs-disable-mask"),
                                        this.$cache.cont.removeClass("irs-disabled")
                        },
                        remove: function () {
                                this.$cache.cont.remove(),
                                        this.$cache.cont = null,
                                        this.$cache.line.off("keydown.irs_" + this.plugin_count),
                                        this.$cache.body.off("touchmove.irs_" + this.plugin_count),
                                        this.$cache.body.off("mousemove.irs_" + this.plugin_count),
                                        this.$cache.win.off("touchend.irs_" + this.plugin_count),
                                        this.$cache.win.off("mouseup.irs_" + this.plugin_count),
                                        s && (this.$cache.body.off("mouseup.irs_" + this.plugin_count), this.$cache.body.off("mouseleave.irs_" + this.plugin_count)),
                                        this.$cache.grid_labels = [],
                                        this.coords.big = [],
                                        this.coords.big_w = [],
                                        this.coords.big_p = [],
                                        this.coords.big_x = [],
                                        cancelAnimationFrame(this.raf_id)
                        },
                        bindEvents: function () {
                                this.no_diapason || (this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this)), this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.line.on("focus.irs_" + this.plugin_count, this.pointerFocus.bind(this)), this.options.drag_interval && "double" === this.options.type ? (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"))) : (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), "single" === this.options.type ? (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")), this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null)), this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")), this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")), this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")), this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))), this.options.keyboard && this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard")), s && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)), this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this))))
                        },
                        pointerFocus: function (t) {
                                var e, i;
                                this.target || (e = (i = "single" === this.options.type ? this.$cache.single : this.$cache.from).offset().left, e += i.width() / 2 - 1, this.pointerClick("single", {
                                        preventDefault: function () { },
                                        pageX: e
                                }))
                        },
                        pointerMove: function (t) {
                                if (this.dragging) {
                                        var e = t.pageX || t.originalEvent.touches && t.originalEvent.touches[0].pageX;
                                        this.coords.x_pointer = e - this.coords.x_gap,
                                                this.calc()
                                }
                        },
                        pointerUp: function (t) {
                                this.current_plugin === this.plugin_count && this.is_active && (this.is_active = !1, this.$cache.cont.find(".state_hover").removeClass("state_hover"), this.force_redraw = !0, s && l("*").prop("unselectable", !1), this.updateScene(), this.restoreOriginalMinInterval(), (l.contains(this.$cache.cont[0], t.target) || this.dragging) && this.callOnFinish(), this.dragging = !1)
                        },
                        pointerDown: function (t, e) {
                                e.preventDefault();
                                var i = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
                                2 !== e.button && ("both" === t && this.setTempMinInterval(), t = t || (this.target || "from"), this.current_plugin = this.plugin_count, this.target = t, this.is_active = !0, this.dragging = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = i - this.coords.x_gap, this.calcPointerPercent(), this.changeLevel(t), s && l("*").prop("unselectable", !0), this.$cache.line.trigger("focus"), this.updateScene())
                        },
                        pointerClick: function (t, e) {
                                e.preventDefault();
                                var i = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
                                2 !== e.button && (this.current_plugin = this.plugin_count, this.target = t, this.is_click = !0, this.coords.x_gap = this.$cache.rs.offset().left, this.coords.x_pointer = +(i - this.coords.x_gap).toFixed(), this.force_redraw = !0, this.calc(), this.$cache.line.trigger("focus"))
                        },
                        key: function (t, e) {
                                if (!(this.current_plugin !== this.plugin_count || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)) {
                                        switch (e.which) {
                                                case 83:
                                                case 65:
                                                case 40:
                                                case 37:
                                                        e.preventDefault(),
                                                                this.moveByKey(!1);
                                                        break;
                                                case 87:
                                                case 68:
                                                case 38:
                                                case 39:
                                                        e.preventDefault(),
                                                                this.moveByKey(!0)
                                        }
                                        return !0
                                }
                        },
                        moveByKey: function (t) {
                                var e = this.coords.p_pointer,
                                        i = (this.options.max - this.options.min) / 100;
                                i = this.options.step / i,
                                        t ? e += i : e -= i,
                                        this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * e),
                                        this.is_key = !0,
                                        this.calc()
                        },
                        setMinMax: function () {
                                if (this.options) {
                                        if (this.options.hide_min_max) return this.$cache.min[0].style.display = "none",
                                                void (this.$cache.max[0].style.display = "none");
                                        if (this.options.values.length) this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])),
                                                this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]));
                                        else {
                                                var t = this._prettify(this.options.min),
                                                        e = this._prettify(this.options.max);
                                                this.result.min_pretty = t,
                                                        this.result.max_pretty = e,
                                                        this.$cache.min.html(this.decorate(t, this.options.min)),
                                                        this.$cache.max.html(this.decorate(e, this.options.max))
                                        }
                                        this.labels.w_min = this.$cache.min.outerWidth(!1),
                                                this.labels.w_max = this.$cache.max.outerWidth(!1)
                                }
                        },
                        setTempMinInterval: function () {
                                var t = this.result.to - this.result.from;
                                null === this.old_min_interval && (this.old_min_interval = this.options.min_interval),
                                        this.options.min_interval = t
                        },
                        restoreOriginalMinInterval: function () {
                                null !== this.old_min_interval && (this.options.min_interval = this.old_min_interval, this.old_min_interval = null)
                        },
                        calc: function (t) {
                                if (this.options && (this.calc_count++, 10 !== this.calc_count && !t || (this.calc_count = 0, this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.calcHandlePercent()), this.coords.w_rs)) {
                                        this.calcPointerPercent();
                                        var e = this.getHandleX();
                                        switch ("both" === this.target && (this.coords.p_gap = 0, e = this.getHandleX()), "click" === this.target && (this.coords.p_gap = this.coords.p_handle / 2, e = this.getHandleX(), this.options.drag_interval ? this.target = "both_one" : this.target = this.chooseHandle(e)), this.target) {
                                                case "base":
                                                        var i = (this.options.max - this.options.min) / 100,
                                                                o = (this.result.from - this.options.min) / i,
                                                                s = (this.result.to - this.options.min) / i;
                                                        this.coords.p_single_real = this.toFixed(o),
                                                                this.coords.p_from_real = this.toFixed(o),
                                                                this.coords.p_to_real = this.toFixed(s),
                                                                this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max),
                                                                this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max),
                                                                this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max),
                                                                this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real),
                                                                this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real),
                                                                this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real),
                                                                this.target = null;
                                                        break;
                                                case "single":
                                                        if (this.options.from_fixed) break;
                                                        this.coords.p_single_real = this.convertToRealPercent(e),
                                                                this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real),
                                                                this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max),
                                                                this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                                                        break;
                                                case "from":
                                                        if (this.options.from_fixed) break;
                                                        this.coords.p_from_real = this.convertToRealPercent(e),
                                                                this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real),
                                                                this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real),
                                                                this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max),
                                                                this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"),
                                                                this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from"),
                                                                this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                                                        break;
                                                case "to":
                                                        if (this.options.to_fixed) break;
                                                        this.coords.p_to_real = this.convertToRealPercent(e),
                                                                this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real),
                                                                this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real),
                                                                this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max),
                                                                this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"),
                                                                this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to"),
                                                                this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                                                        break;
                                                case "both":
                                                        if (this.options.from_fixed || this.options.to_fixed) break;
                                                        e = this.toFixed(e + .001 * this.coords.p_handle),
                                                                this.coords.p_from_real = this.convertToRealPercent(e) - this.coords.p_gap_left,
                                                                this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real),
                                                                this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max),
                                                                this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from"),
                                                                this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real),
                                                                this.coords.p_to_real = this.convertToRealPercent(e) + this.coords.p_gap_right,
                                                                this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real),
                                                                this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max),
                                                                this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to"),
                                                                this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                                                        break;
                                                case "both_one":
                                                        if (this.options.from_fixed || this.options.to_fixed) break;
                                                        var n = this.convertToRealPercent(e),
                                                                a = this.result.from_percent,
                                                                r = this.result.to_percent - a,
                                                                l = r / 2,
                                                                c = n - l,
                                                                d = n + l;
                                                        c < 0 && (d = (c = 0) + r),
                                                                100 < d && (c = (d = 100) - r),
                                                                this.coords.p_from_real = this.calcWithStep(c),
                                                                this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max),
                                                                this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real),
                                                                this.coords.p_to_real = this.calcWithStep(d),
                                                                this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max),
                                                                this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real)
                                        }
                                        "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2, this.coords.p_bar_w = this.coords.p_single_fake, this.result.from_percent = this.coords.p_single_real, this.result.from = this.convertToValue(this.coords.p_single_real), this.result.from_pretty = this._prettify(this.result.from), this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2), this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake), this.result.from_percent = this.coords.p_from_real, this.result.from = this.convertToValue(this.coords.p_from_real), this.result.from_pretty = this._prettify(this.result.from), this.result.to_percent = this.coords.p_to_real, this.result.to = this.convertToValue(this.coords.p_to_real), this.result.to_pretty = this._prettify(this.result.to), this.options.values.length && (this.result.from_value = this.options.values[this.result.from], this.result.to_value = this.options.values[this.result.to])),
                                                this.calcMinMax(),
                                                this.calcLabels()
                                }
                        },
                        calcPointerPercent: function () {
                                this.coords.w_rs ? (this.coords.x_pointer < 0 || isNaN(this.coords.x_pointer) ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs), this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100)) : this.coords.p_pointer = 0
                        },
                        convertToRealPercent: function (t) {
                                return t / (100 - this.coords.p_handle) * 100
                        },
                        convertToFakePercent: function (t) {
                                return t / 100 * (100 - this.coords.p_handle)
                        },
                        getHandleX: function () {
                                var t = 100 - this.coords.p_handle,
                                        e = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
                                return e < 0 ? e = 0 : t < e && (e = t),
                                        e
                        },
                        calcHandlePercent: function () {
                                "single" === this.options.type ? this.coords.w_handle = this.$cache.s_single.outerWidth(!1) : this.coords.w_handle = this.$cache.s_from.outerWidth(!1),
                                        this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100)
                        },
                        chooseHandle: function (t) {
                                return "single" === this.options.type ? "single" : this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2 <= t ? this.options.to_fixed ? "from" : "to" : this.options.from_fixed ? "to" : "from"
                        },
                        calcMinMax: function () {
                                this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100, this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100)
                        },
                        calcLabels: function () {
                                this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2) : (this.labels.w_from = this.$cache.from.outerWidth(!1), this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100, this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2, this.labels.p_from_left = this.toFixed(this.labels.p_from_left), this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake), this.labels.w_to = this.$cache.to.outerWidth(!1), this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100, this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2, this.labels.p_to_left = this.toFixed(this.labels.p_to_left), this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake), this.labels.w_single = this.$cache.single.outerWidth(!1), this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100, this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2, this.labels.p_single_left = this.toFixed(this.labels.p_single_left)), this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake))
                        },
                        updateScene: function () {
                                this.raf_id && (cancelAnimationFrame(this.raf_id), this.raf_id = null),
                                        clearTimeout(this.update_tm),
                                        this.update_tm = null,
                                        this.options && (this.drawHandles(), this.is_active ? this.raf_id = requestAnimationFrame(this.updateScene.bind(this)) : this.update_tm = setTimeout(this.updateScene.bind(this), 300))
                        },
                        drawHandles: function () {
                                this.coords.w_rs = this.$cache.rs.outerWidth(!1),
                                        this.coords.w_rs && (this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base", this.is_resize = !0), this.coords.w_rs === this.coords.w_rs_old && !this.force_redraw || (this.setMinMax(), this.calc(!0), this.drawLabels(), this.options.grid && (this.calcGridMargin(), this.calcGridLabels()), this.force_redraw = !0, this.coords.w_rs_old = this.coords.w_rs, this.drawShadow()), this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key) && ((this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) && (this.drawLabels(), this.$cache.bar[0].style.left = this.coords.p_bar_x + "%", this.$cache.bar[0].style.width = this.coords.p_bar_w + "%", "single" === this.options.type ? (this.$cache.bar[0].style.left = 0, this.$cache.bar[0].style.width = this.coords.p_bar_w + this.coords.p_bar_x + "%", this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%") : (this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%", this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%", this.old_from === this.result.from && !this.force_redraw || (this.$cache.from[0].style.left = this.labels.p_from_left + "%"), this.old_to === this.result.to && !this.force_redraw || (this.$cache.to[0].style.left = this.labels.p_to_left + "%")), this.$cache.single[0].style.left = this.labels.p_single_left + "%", this.writeToInput(), this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || (this.$cache.input.trigger("change"), this.$cache.input.trigger("input")), this.old_from = this.result.from, this.old_to = this.result.to, this.is_resize || this.is_update || this.is_start || this.is_finish || this.callOnChange(), (this.is_key || this.is_click) && (this.is_key = !1, this.is_click = !1, this.callOnFinish()), this.is_update = !1, this.is_resize = !1, this.is_finish = !1), this.is_start = !1, this.is_key = !1, this.is_click = !1, this.force_redraw = !1))
                        },
                        drawLabels: function () {
                                if (this.options) {
                                        var t, e, i, o, s, n = this.options.values.length,
                                                a = this.options.p_values;
                                        if (!this.options.hide_from_to) if ("single" === this.options.type) t = n ? this.decorate(a[this.result.from]) : (o = this._prettify(this.result.from), this.decorate(o, this.result.from)),
                                                this.$cache.single.html(t),
                                                this.calcLabels(),
                                                this.labels.p_single_left < this.labels.p_min + 1 ? this.$cache.min[0].style.visibility = "hidden" : this.$cache.min[0].style.visibility = "visible",
                                                this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1 ? this.$cache.max[0].style.visibility = "hidden" : this.$cache.max[0].style.visibility = "visible";
                                        else {
                                                i = n ? (this.options.decorate_both ? (t = this.decorate(a[this.result.from]), t += this.options.values_separator, t += this.decorate(a[this.result.to])) : t = this.decorate(a[this.result.from] + this.options.values_separator + a[this.result.to]), e = this.decorate(a[this.result.from]), this.decorate(a[this.result.to])) : (o = this._prettify(this.result.from), s = this._prettify(this.result.to), this.options.decorate_both ? (t = this.decorate(o, this.result.from), t += this.options.values_separator, t += this.decorate(s, this.result.to)) : t = this.decorate(o + this.options.values_separator + s, this.result.to), e = this.decorate(o, this.result.from), this.decorate(s, this.result.to)),
                                                        this.$cache.single.html(t),
                                                        this.$cache.from.html(e),
                                                        this.$cache.to.html(i),
                                                        this.calcLabels();
                                                var r = Math.min(this.labels.p_single_left, this.labels.p_from_left),
                                                        l = this.labels.p_single_left + this.labels.p_single_fake,
                                                        c = this.labels.p_to_left + this.labels.p_to_fake,
                                                        d = Math.max(l, c);
                                                this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", d = this.result.from === this.result.to ? ("from" === this.target ? this.$cache.from[0].style.visibility = "visible" : "to" === this.target ? this.$cache.to[0].style.visibility = "visible" : this.target || (this.$cache.from[0].style.visibility = "visible"), this.$cache.single[0].style.visibility = "hidden", c) : (this.$cache.from[0].style.visibility = "hidden", this.$cache.to[0].style.visibility = "hidden", this.$cache.single[0].style.visibility = "visible", Math.max(l, c))) : (this.$cache.from[0].style.visibility = "visible", this.$cache.to[0].style.visibility = "visible", this.$cache.single[0].style.visibility = "hidden"),
                                                        r < this.labels.p_min + 1 ? this.$cache.min[0].style.visibility = "hidden" : this.$cache.min[0].style.visibility = "visible",
                                                        d > 100 - this.labels.p_max - 1 ? this.$cache.max[0].style.visibility = "hidden" : this.$cache.max[0].style.visibility = "visible"
                                        }
                                }
                        },
                        drawShadow: function () {
                                var t, e, i, o, s = this.options,
                                        n = this.$cache,
                                        a = "number" == typeof s.from_min && !isNaN(s.from_min),
                                        r = "number" == typeof s.from_max && !isNaN(s.from_max),
                                        l = "number" == typeof s.to_min && !isNaN(s.to_min),
                                        c = "number" == typeof s.to_max && !isNaN(s.to_max);
                                "single" === s.type ? s.from_shadow && (a || r) ? (t = this.convertToPercent(a ? s.from_min : s.min), e = this.convertToPercent(r ? s.from_max : s.max) - t, t = this.toFixed(t - this.coords.p_handle / 100 * t), e = this.toFixed(e - this.coords.p_handle / 100 * e), t += this.coords.p_handle / 2, n.shad_single[0].style.display = "block", n.shad_single[0].style.left = t + "%", n.shad_single[0].style.width = e + "%") : n.shad_single[0].style.display = "none" : (s.from_shadow && (a || r) ? (t = this.convertToPercent(a ? s.from_min : s.min), e = this.convertToPercent(r ? s.from_max : s.max) - t, t = this.toFixed(t - this.coords.p_handle / 100 * t), e = this.toFixed(e - this.coords.p_handle / 100 * e), t += this.coords.p_handle / 2, n.shad_from[0].style.display = "block", n.shad_from[0].style.left = t + "%", n.shad_from[0].style.width = e + "%") : n.shad_from[0].style.display = "none", s.to_shadow && (l || c) ? (i = this.convertToPercent(l ? s.to_min : s.min), o = this.convertToPercent(c ? s.to_max : s.max) - i, i = this.toFixed(i - this.coords.p_handle / 100 * i), o = this.toFixed(o - this.coords.p_handle / 100 * o), i += this.coords.p_handle / 2, n.shad_to[0].style.display = "block", n.shad_to[0].style.left = i + "%", n.shad_to[0].style.width = o + "%") : n.shad_to[0].style.display = "none")
                        },
                        writeToInput: function () {
                                "single" === this.options.type ? (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value) : this.$cache.input.prop("value", this.result.from), this.$cache.input.data("from", this.result.from)) : (this.options.values.length ? this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value) : this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to), this.$cache.input.data("from", this.result.from), this.$cache.input.data("to", this.result.to))
                        },
                        callOnStart: function () {
                                this.writeToInput(),
                                        this.options.onStart && "function" == typeof this.options.onStart && (this.options.scope ? this.options.onStart.call(this.options.scope, this.result) : this.options.onStart(this.result))
                        },
                        callOnChange: function () {
                                this.writeToInput(),
                                        this.options.onChange && "function" == typeof this.options.onChange && (this.options.scope ? this.options.onChange.call(this.options.scope, this.result) : this.options.onChange(this.result))
                        },
                        callOnFinish: function () {
                                this.writeToInput(),
                                        this.options.onFinish && "function" == typeof this.options.onFinish && (this.options.scope ? this.options.onFinish.call(this.options.scope, this.result) : this.options.onFinish(this.result))
                        },
                        callOnUpdate: function () {
                                this.writeToInput(),
                                        this.options.onUpdate && "function" == typeof this.options.onUpdate && (this.options.scope ? this.options.onUpdate.call(this.options.scope, this.result) : this.options.onUpdate(this.result))
                        },
                        toggleInput: function () {
                                this.$cache.input.toggleClass("irs-hidden-input"),
                                        this.has_tab_index ? this.$cache.input.prop("tabindex", -1) : this.$cache.input.removeProp("tabindex"),
                                        this.has_tab_index = !this.has_tab_index
                        },
                        convertToPercent: function (t, e) {
                                var i, o = this.options.max - this.options.min,
                                        s = o / 100;
                                return o ? (i = (e ? t : t - this.options.min) / s, this.toFixed(i)) : (this.no_diapason = !0, 0)
                        },
                        convertToValue: function (t) {
                                var e, i, o = this.options.min,
                                        s = this.options.max,
                                        n = o.toString().split(".")[1],
                                        a = s.toString().split(".")[1],
                                        r = 0,
                                        l = 0;
                                if (0 === t) return this.options.min;
                                if (100 === t) return this.options.max;
                                n && (r = e = n.length),
                                        a && (r = i = a.length),
                                        e && i && (r = i <= e ? e : i),
                                        o < 0 && (o = +(o + (l = Math.abs(o))).toFixed(r), s = +(s + l).toFixed(r));
                                var c, d = (s - o) / 100 * t + o,
                                        h = this.options.step.toString().split(".")[1];
                                return d = h ? +d.toFixed(h.length) : (d /= this.options.step, +(d *= this.options.step).toFixed(0)),
                                        l && (d -= l),
                                        (c = h ? +d.toFixed(h.length) : this.toFixed(d)) < this.options.min ? c = this.options.min : c > this.options.max && (c = this.options.max),
                                        c
                        },
                        calcWithStep: function (t) {
                                var e = Math.round(t / this.coords.p_step) * this.coords.p_step;
                                return 100 < e && (e = 100),
                                        100 === t && (e = 100),
                                        this.toFixed(e)
                        },
                        checkMinInterval: function (t, e, i) {
                                var o, s, n = this.options;
                                return n.min_interval ? (o = this.convertToValue(t), s = this.convertToValue(e), "from" === i ? s - o < n.min_interval && (o = s - n.min_interval) : o - s < n.min_interval && (o = s + n.min_interval), this.convertToPercent(o)) : t
                        },
                        checkMaxInterval: function (t, e, i) {
                                var o, s, n = this.options;
                                return n.max_interval ? (o = this.convertToValue(t), s = this.convertToValue(e), "from" === i ? s - o > n.max_interval && (o = s - n.max_interval) : o - s > n.max_interval && (o = s + n.max_interval), this.convertToPercent(o)) : t
                        },
                        checkDiapason: function (t, e, i) {
                                var o = this.convertToValue(t),
                                        s = this.options;
                                return "number" != typeof e && (e = s.min),
                                        "number" != typeof i && (i = s.max),
                                        o < e && (o = e),
                                        i < o && (o = i),
                                        this.convertToPercent(o)
                        },
                        toFixed: function (t) {
                                return +(t = t.toFixed(20))
                        },
                        _prettify: function (t) {
                                return this.options.prettify_enabled ? this.options.prettify && "function" == typeof this.options.prettify ? this.options.prettify(t) : this.prettify(t) : t
                        },
                        prettify: function (t) {
                                return t.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator)
                        },
                        checkEdges: function (t, e) {
                                return this.options.force_edges && (t < 0 ? t = 0 : 100 - e < t && (t = 100 - e)),
                                        this.toFixed(t)
                        },
                        validate: function () {
                                var t, e, i = this.options,
                                        o = this.result,
                                        s = i.values,
                                        n = s.length;
                                if ("string" == typeof i.min && (i.min = +i.min), "string" == typeof i.max && (i.max = +i.max), "string" == typeof i.from && (i.from = +i.from), "string" == typeof i.to && (i.to = +i.to), "string" == typeof i.step && (i.step = +i.step), "string" == typeof i.from_min && (i.from_min = +i.from_min), "string" == typeof i.from_max && (i.from_max = +i.from_max), "string" == typeof i.to_min && (i.to_min = +i.to_min), "string" == typeof i.to_max && (i.to_max = +i.to_max), "string" == typeof i.grid_num && (i.grid_num = +i.grid_num), i.max < i.min && (i.max = i.min), n) for (i.p_values = [], i.min = 0, i.max = n - 1, i.step = 1, i.grid_num = i.max, i.grid_snap = !0, e = 0; e < n; e++) t = +s[e],
                                        t = isNaN(t) ? s[e] : (s[e] = t, this._prettify(t)),
                                        i.p_values.push(t);
                                "number" == typeof i.from && !isNaN(i.from) || (i.from = i.min),
                                        "number" == typeof i.to && !isNaN(i.to) || (i.to = i.max),
                                        "single" === i.type ? (i.from < i.min && (i.from = i.min), i.from > i.max && (i.from = i.max)) : (i.from < i.min && (i.from = i.min), i.from > i.max && (i.from = i.max), i.to < i.min && (i.to = i.min), i.to > i.max && (i.to = i.max), this.update_check.from && (this.update_check.from !== i.from && i.from > i.to && (i.from = i.to), this.update_check.to !== i.to && i.to < i.from && (i.to = i.from)), i.from > i.to && (i.from = i.to), i.to < i.from && (i.to = i.from)),
                                        ("number" != typeof i.step || isNaN(i.step) || !i.step || i.step < 0) && (i.step = 1),
                                        "number" == typeof i.from_min && i.from < i.from_min && (i.from = i.from_min),
                                        "number" == typeof i.from_max && i.from > i.from_max && (i.from = i.from_max),
                                        "number" == typeof i.to_min && i.to < i.to_min && (i.to = i.to_min),
                                        "number" == typeof i.to_max && i.from > i.to_max && (i.to = i.to_max),
                                        o && (o.min !== i.min && (o.min = i.min), o.max !== i.max && (o.max = i.max), (o.from < o.min || o.from > o.max) && (o.from = i.from), (o.to < o.min || o.to > o.max) && (o.to = i.to)),
                                        ("number" != typeof i.min_interval || isNaN(i.min_interval) || !i.min_interval || i.min_interval < 0) && (i.min_interval = 0),
                                        ("number" != typeof i.max_interval || isNaN(i.max_interval) || !i.max_interval || i.max_interval < 0) && (i.max_interval = 0),
                                        i.min_interval && i.min_interval > i.max - i.min && (i.min_interval = i.max - i.min),
                                        i.max_interval && i.max_interval > i.max - i.min && (i.max_interval = i.max - i.min)
                        },
                        decorate: function (t, e) {
                                var i = "",
                                        o = this.options;
                                return o.prefix && (i += o.prefix),
                                        i += t,
                                        o.max_postfix && (o.values.length && t === o.p_values[o.max] || e === o.max) && (i += o.max_postfix, o.postfix && (i += " ")),
                                        o.postfix && (i += o.postfix),
                                        i
                        },
                        updateFrom: function () {
                                this.result.from = this.options.from,
                                        this.result.from_percent = this.convertToPercent(this.result.from),
                                        this.result.from_pretty = this._prettify(this.result.from),
                                        this.options.values && (this.result.from_value = this.options.values[this.result.from])
                        },
                        updateTo: function () {
                                this.result.to = this.options.to,
                                        this.result.to_percent = this.convertToPercent(this.result.to),
                                        this.result.to_pretty = this._prettify(this.result.to),
                                        this.options.values && (this.result.to_value = this.options.values[this.result.to])
                        },
                        updateResult: function () {
                                this.result.min = this.options.min,
                                        this.result.max = this.options.max,
                                        this.updateFrom(),
                                        this.updateTo()
                        },
                        appendGrid: function () {
                                if (this.options.grid) {
                                        var t, e, i, o, s, n, a = this.options,
                                                r = a.max - a.min,
                                                l = a.grid_num,
                                                c = 0,
                                                d = 4,
                                                h = "";
                                        for (this.calcGridMargin(), a.grid_snap && (l = r / a.step), 50 < l && (l = 50), i = this.toFixed(100 / l), 4 < l && (d = 3), 7 < l && (d = 2), 14 < l && (d = 1), 28 < l && (d = 0), t = 0; t < l + 1; t++) {
                                                for (o = d, 100 < (c = this.toFixed(i * t)) && (c = 100), s = ((this.coords.big[t] = c) - i * (t - 1)) / (o + 1), e = 1; e <= o && 0 !== c; e++) h += '<span class="irs-grid-pol small" style="left: ' + this.toFixed(c - s * e) + '%"></span>';
                                                h += '<span class="irs-grid-pol" style="left: ' + c + '%"></span>',
                                                        n = this.convertToValue(c),
                                                        h += '<span class="irs-grid-text js-grid-text-' + t + '" style="left: ' + c + '%">' + (n = a.values.length ? a.p_values[n] : this._prettify(n)) + "</span>"
                                        }
                                        this.coords.big_num = Math.ceil(l + 1),
                                                this.$cache.cont.addClass("irs-with-grid"),
                                                this.$cache.grid.html(h),
                                                this.cacheGridLabels()
                                }
                        },
                        cacheGridLabels: function () {
                                var t, e, i = this.coords.big_num;
                                for (e = 0; e < i; e++) t = this.$cache.grid.find(".js-grid-text-" + e),
                                        this.$cache.grid_labels.push(t);
                                this.calcGridLabels()
                        },
                        calcGridLabels: function () {
                                var t, e, i = [],
                                        o = [],
                                        s = this.coords.big_num;
                                for (t = 0; t < s; t++) this.coords.big_w[t] = this.$cache.grid_labels[t].outerWidth(!1),
                                        this.coords.big_p[t] = this.toFixed(this.coords.big_w[t] / this.coords.w_rs * 100),
                                        this.coords.big_x[t] = this.toFixed(this.coords.big_p[t] / 2),
                                        i[t] = this.toFixed(this.coords.big[t] - this.coords.big_x[t]),
                                        o[t] = this.toFixed(i[t] + this.coords.big_p[t]);
                                for (this.options.force_edges && (i[0] < -this.coords.grid_gap && (i[0] = -this.coords.grid_gap, o[0] = this.toFixed(i[0] + this.coords.big_p[0]), this.coords.big_x[0] = this.coords.grid_gap), o[s - 1] > 100 + this.coords.grid_gap && (o[s - 1] = 100 + this.coords.grid_gap, i[s - 1] = this.toFixed(o[s - 1] - this.coords.big_p[s - 1]), this.coords.big_x[s - 1] = this.toFixed(this.coords.big_p[s - 1] - this.coords.grid_gap))), this.calcGridCollision(2, i, o), this.calcGridCollision(4, i, o), t = 0; t < s; t++) e = this.$cache.grid_labels[t][0],
                                        this.coords.big_x[t] !== Number.POSITIVE_INFINITY && (e.style.marginLeft = -this.coords.big_x[t] + "%")
                        },
                        calcGridCollision: function (t, e, i) {
                                var o, s, n, a = this.coords.big_num;
                                for (o = 0; o < a && !(a <= (s = o + t / 2)); o += t) n = this.$cache.grid_labels[s][0],
                                        i[o] <= e[s] ? n.style.visibility = "visible" : n.style.visibility = "hidden"
                        },
                        calcGridMargin: function () {
                                this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1), this.coords.w_rs && ("single" === this.options.type ? this.coords.w_handle = this.$cache.s_single.outerWidth(!1) : this.coords.w_handle = this.$cache.s_from.outerWidth(!1), this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100), this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1), this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%", this.$cache.grid[0].style.left = this.coords.grid_gap + "%"))
                        },
                        update: function (t) {
                                this.input && (this.is_update = !0, this.options.from = this.result.from, this.options.to = this.result.to, this.update_check.from = this.result.from, this.update_check.to = this.result.to, this.options = l.extend(this.options, t), this.validate(), this.updateResult(t), this.toggleInput(), this.remove(), this.init(!0))
                        },
                        reset: function () {
                                this.input && (this.updateResult(), this.update())
                        },
                        destroy: function () {
                                this.input && (this.toggleInput(), this.$cache.input.prop("readonly", !1), l.data(this.input, "ionRangeSlider", null), this.remove(), this.input = null, this.options = null)
                        }
                },
                        l.fn.ionRangeSlider = function (t) {
                                return this.each(function () {
                                        l.data(this, "ionRangeSlider") || l.data(this, "ionRangeSlider", new n(this, t, o++))
                                })
                        },


                        function () {
                                for (var n = 0, t = ["ms", "moz", "webkit", "o"], e = 0; e < t.length && !d.requestAnimationFrame; ++e) d.requestAnimationFrame = d[t[e] + "RequestAnimationFrame"],
                                        d.cancelAnimationFrame = d[t[e] + "CancelAnimationFrame"] || d[t[e] + "CancelRequestAnimationFrame"];
                                d.requestAnimationFrame || (d.requestAnimationFrame = function (t, e) {
                                        var i = (new Date).getTime(),
                                                o = Math.max(0, 16 - (i - n)),
                                                s = d.setTimeout(function () {
                                                        t(i + o)
                                                }, o);
                                        return n = i + o,
                                                s
                                }),
                                        d.cancelAnimationFrame || (d.cancelAnimationFrame = function (t) {
                                                clearTimeout(t)
                                        })
                        }()
        });