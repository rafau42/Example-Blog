/*!
Waypoints - 4.0.1
Copyright © 2011-2016 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blob/master/licenses.txt
*/
! function() {
    "use strict";

    function t(o) {
        if (!o) throw new Error("No options passed to Waypoint constructor");
        if (!o.element) throw new Error("No element option passed to Waypoint constructor");
        if (!o.handler) throw new Error("No handler option passed to Waypoint constructor");
        this.key = "waypoint-" + e, this.options = t.Adapter.extend({}, t.defaults, o), this.element = this.options.element, this.adapter = new t.Adapter(this.element), this.callback = o.handler, this.axis = this.options.horizontal ? "horizontal" : "vertical", this.enabled = this.options.enabled, this.triggerPoint = null, this.group = t.Group.findOrCreate({
            name: this.options.group,
            axis: this.axis
        }), this.context = t.Context.findOrCreateByElement(this.options.context), t.offsetAliases[this.options.offset] && (this.options.offset = t.offsetAliases[this.options.offset]), this.group.add(this), this.context.add(this), i[this.key] = this, e += 1
    }
    var e = 0,
        i = {};
    t.prototype.queueTrigger = function(t) {
        this.group.queueTrigger(this, t)
    }, t.prototype.trigger = function(t) {
        this.enabled && this.callback && this.callback.apply(this, t)
    }, t.prototype.destroy = function() {
        this.context.remove(this), this.group.remove(this), delete i[this.key]
    }, t.prototype.disable = function() {
        return this.enabled = !1, this
    }, t.prototype.enable = function() {
        return this.context.refresh(), this.enabled = !0, this
    }, t.prototype.next = function() {
        return this.group.next(this)
    }, t.prototype.previous = function() {
        return this.group.previous(this)
    }, t.invokeAll = function(t) {
        var e = [];
        for (var o in i) e.push(i[o]);
        for (var n = 0, r = e.length; r > n; n++) e[n][t]()
    }, t.destroyAll = function() {
        t.invokeAll("destroy")
    }, t.disableAll = function() {
        t.invokeAll("disable")
    }, t.enableAll = function() {
        t.Context.refreshAll();
        for (var e in i) i[e].enabled = !0;
        return this
    }, t.refreshAll = function() {
        t.Context.refreshAll()
    }, t.viewportHeight = function() {
        return window.innerHeight || document.documentElement.clientHeight
    }, t.viewportWidth = function() {
        return document.documentElement.clientWidth
    }, t.adapters = [], t.defaults = {
        context: window,
        continuous: !0,
        enabled: !0,
        group: "default",
        horizontal: !1,
        offset: 0
    }, t.offsetAliases = {
        "bottom-in-view": function() {
            return this.context.innerHeight() - this.adapter.outerHeight()
        },
        "right-in-view": function() {
            return this.context.innerWidth() - this.adapter.outerWidth()
        }
    }, window.Waypoint = t
}(),
function() {
    "use strict";

    function t(t) {
        window.setTimeout(t, 1e3 / 60)
    }

    function e(t) {
        this.element = t, this.Adapter = n.Adapter, this.adapter = new this.Adapter(t), this.key = "waypoint-context-" + i, this.didScroll = !1, this.didResize = !1, this.oldScroll = {
            x: this.adapter.scrollLeft(),
            y: this.adapter.scrollTop()
        }, this.waypoints = {
            vertical: {},
            horizontal: {}
        }, t.waypointContextKey = this.key, o[t.waypointContextKey] = this, i += 1, n.windowContext || (n.windowContext = !0, n.windowContext = new e(window)), this.createThrottledScrollHandler(), this.createThrottledResizeHandler()
    }
    var i = 0,
        o = {},
        n = window.Waypoint,
        r = window.onload;
    e.prototype.add = function(t) {
        var e = t.options.horizontal ? "horizontal" : "vertical";
        this.waypoints[e][t.key] = t, this.refresh()
    }, e.prototype.checkEmpty = function() {
        var t = this.Adapter.isEmptyObject(this.waypoints.horizontal),
            e = this.Adapter.isEmptyObject(this.waypoints.vertical),
            i = this.element == this.element.window;
        t && e && !i && (this.adapter.off(".waypoints"), delete o[this.key])
    }, e.prototype.createThrottledResizeHandler = function() {
        function t() {
            e.handleResize(), e.didResize = !1
        }
        var e = this;
        this.adapter.on("resize.waypoints", function() {
            e.didResize || (e.didResize = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.createThrottledScrollHandler = function() {
        function t() {
            e.handleScroll(), e.didScroll = !1
        }
        var e = this;
        this.adapter.on("scroll.waypoints", function() {
            (!e.didScroll || n.isTouch) && (e.didScroll = !0, n.requestAnimationFrame(t))
        })
    }, e.prototype.handleResize = function() {
        n.Context.refreshAll()
    }, e.prototype.handleScroll = function() {
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
                    (p || u) && (a.queueTrigger(r), t[a.group.id] = a.group)
                }
            }
        }
        for (var c in t) t[c].flushTriggers();
        this.oldScroll = {
            x: e.horizontal.newScroll,
            y: e.vertical.newScroll
        }
    }, e.prototype.innerHeight = function() {
        return this.element == this.element.window ? n.viewportHeight() : this.adapter.innerHeight()
    }, e.prototype.remove = function(t) {
        delete this.waypoints[t.axis][t.key], this.checkEmpty()
    }, e.prototype.innerWidth = function() {
        return this.element == this.element.window ? n.viewportWidth() : this.adapter.innerWidth()
    }, e.prototype.destroy = function() {
        var t = [];
        for (var e in this.waypoints)
            for (var i in this.waypoints[e]) t.push(this.waypoints[e][i]);
        for (var o = 0, n = t.length; n > o; o++) t[o].destroy()
    }, e.prototype.refresh = function() {
        var t, e = this.element == this.element.window,
            i = e ? void 0 : this.adapter.offset(),
            o = {};
        this.handleScroll(), t = {
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
        };
        for (var r in t) {
            var s = t[r];
            for (var a in this.waypoints[r]) {
                var l, h, p, u, c, d = this.waypoints[r][a],
                    f = d.options.offset,
                    w = d.triggerPoint,
                    y = 0,
                    g = null == w;
                d.element !== d.element.window && (y = d.adapter.offset()[s.offsetProp]), "function" == typeof f ? f = f.apply(d) : "string" == typeof f && (f = parseFloat(f), d.options.offset.indexOf("%") > -1 && (f = Math.ceil(s.contextDimension * f / 100))), l = s.contextScroll - s.contextOffset, d.triggerPoint = Math.floor(y + l - f), h = w < s.oldScroll, p = d.triggerPoint >= s.oldScroll, u = h && p, c = !h && !p, !g && u ? (d.queueTrigger(s.backward), o[d.group.id] = d.group) : !g && c ? (d.queueTrigger(s.forward), o[d.group.id] = d.group) : g && s.oldScroll >= d.triggerPoint && (d.queueTrigger(s.forward), o[d.group.id] = d.group)
            }
        }
        return n.requestAnimationFrame(function() {
            for (var t in o) o[t].flushTriggers()
        }), this
    }, e.findOrCreateByElement = function(t) {
        return e.findByElement(t) || new e(t)
    }, e.refreshAll = function() {
        for (var t in o) o[t].refresh()
    }, e.findByElement = function(t) {
        return o[t.waypointContextKey]
    }, window.onload = function() {
        r && r(), e.refreshAll()
    }, n.requestAnimationFrame = function(e) {
        var i = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || t;
        i.call(window, e)
    }, n.Context = e
}(),
function() {
    "use strict";

    function t(t, e) {
        return t.triggerPoint - e.triggerPoint
    }

    function e(t, e) {
        return e.triggerPoint - t.triggerPoint
    }

    function i(t) {
        this.name = t.name, this.axis = t.axis, this.id = this.name + "-" + this.axis, this.waypoints = [], this.clearTriggerQueues(), o[this.axis][this.name] = this
    }
    var o = {
            vertical: {},
            horizontal: {}
        },
        n = window.Waypoint;
    i.prototype.add = function(t) {
        this.waypoints.push(t)
    }, i.prototype.clearTriggerQueues = function() {
        this.triggerQueues = {
            up: [],
            down: [],
            left: [],
            right: []
        }
    }, i.prototype.flushTriggers = function() {
        for (var i in this.triggerQueues) {
            var o = this.triggerQueues[i],
                n = "up" === i || "left" === i;
            o.sort(n ? e : t);
            for (var r = 0, s = o.length; s > r; r += 1) {
                var a = o[r];
                (a.options.continuous || r === o.length - 1) && a.trigger([i])
            }
        }
        this.clearTriggerQueues()
    }, i.prototype.next = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints),
            o = i === this.waypoints.length - 1;
        return o ? null : this.waypoints[i + 1]
    }, i.prototype.previous = function(e) {
        this.waypoints.sort(t);
        var i = n.Adapter.inArray(e, this.waypoints);
        return i ? this.waypoints[i - 1] : null
    }, i.prototype.queueTrigger = function(t, e) {
        this.triggerQueues[e].push(t)
    }, i.prototype.remove = function(t) {
        var e = n.Adapter.inArray(t, this.waypoints);
        e > -1 && this.waypoints.splice(e, 1)
    }, i.prototype.first = function() {
        return this.waypoints[0]
    }, i.prototype.last = function() {
        return this.waypoints[this.waypoints.length - 1]
    }, i.findOrCreate = function(t) {
        return o[t.axis][t.name] || new i(t)
    }, n.Group = i
}(),
function() {
    "use strict";

    function t(t) {
        this.$element = e(t)
    }
    var e = window.jQuery,
        i = window.Waypoint;
    e.each(["innerHeight", "innerWidth", "off", "offset", "on", "outerHeight", "outerWidth", "scrollLeft", "scrollTop"], function(e, i) {
        t.prototype[i] = function() {
            var t = Array.prototype.slice.call(arguments);
            return this.$element[i].apply(this.$element, t)
        }
    }), e.each(["extend", "inArray", "isEmptyObject"], function(i, o) {
        t[o] = e[o]
    }), i.adapters.push({
        name: "jquery",
        Adapter: t
    }), i.Adapter = t
}(),
function() {
    "use strict";

    function t(t) {
        return function() {
            var i = [],
                o = arguments[0];
            return t.isFunction(arguments[0]) && (o = t.extend({}, arguments[1]), o.handler = arguments[0]), this.each(function() {
                var n = t.extend({}, o, {
                    element: this
                });
                "string" == typeof n.context && (n.context = t(this).closest(n.context)[0]), i.push(new e(n))
            }), i
        }
    }
    var e = window.Waypoint;
    window.jQuery && (window.jQuery.fn.waypoint = t(window.jQuery)), window.Zepto && (window.Zepto.fn.waypoint = t(window.Zepto))
}();
(function($) {
    $.fn.toggleAttrVal = function(attr, val1, val2) {
        var test = $(this).attr(attr);
        if (test === val1) {
            $(this).attr(attr, val2);
            return this;
        }
        if (test === val2) {
            $(this).attr(attr, val1);
            return this;
        }
        // default to val1 if neither
        $(this).attr(attr, val1);
        return this;
    };
    $.fn.toggleText = function(t1, t2) {
        if (this.text() == t1) this.text(t2);
        else this.text(t1);
        return this;
    };
})(jQuery);
(function($) {
    $.fn.validate = function() {
        if ($(this).val().length < 3) {
            $(this).addClass("error");
            return false;
        } else {
            $(this).removeClass("error");
            return true;
        }
    };
    $.fn.validateEmail = function() {
        var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            emailToValidate = $(this).val();
        if (!emailReg.test(emailToValidate) || emailToValidate == "") {
            $(this).addClass("error");
            return false;
        } else {
            $(this).removeClass("error");
            return true;
        }
    };
})(jQuery);
(function($) {
    var navigation_wrap = $(".navigation-wrap");
    var navigation = $("#main-navigation");
    navigation.before('<button class="navigation__toggle" type="button" aria-label="Toggle Menu" aria-expanded="false" aria-controls="main-menu" title="Toggle Menu"><span class="sr-only">Open </span>Menu</button>');
    var navigation_toggle = $(".navigation__toggle");
    navigation_toggle.append('<i class="navigation__toggle-icon navigation__icon fa fa-bars"></i>');
    var navigation_icon = $(".navigation__toggle-icon");
    var navigation_list = $(".navigation__list");
    $("li.menu-item-has-children").addClass("navigation__dropdown-list-item");
    $("li.menu-item-has-children .sub-menu").addClass("navigation__sub-list");
    $("li.menu-item-has-children .sub-menu li").addClass("navigation__sub-list-item");
    $("li.menu-item-has-children > a").replaceWith('<button class = "navigation__sub-toggle" type="button" aria-label="Toggle Sub-Menu" aria-expanded="false" aria-controls="sub-menu" title="Toggle Sub-Menu"><span class="sr-only">Open </span>Categories</button>');
    var navigation_sub_toggle = $(".navigation__sub-toggle");
    navigation_sub_toggle.append('<i class = "navigation__sub-toggle-icon navigation__icon fa fa-bars"></i>');
    var navigation_sub_icon = $(".navigation__sub-toggle-icon");
    var navigation_sub_list = $(".navigation__sub-list");
    toggleNav(navigation_toggle, navigation_list, navigation_icon);
    toggleNav(navigation_sub_toggle, navigation_sub_list, navigation_sub_icon);
    fixedNav();

    function toggleNav(toggle, list, icon) {
        toggle.click(function() {
            toggle.toggleAttrVal("aria-expanded", "true", "false");
            toggle.find(".sr-only").toggleText("Close ", "Open ");
            list.slideToggle(200);
            icon.toggleClass("fa-window-close", "fa-bars");
        });
    }

    function fixedNav() {
        navigation_wrap.waypoint(function(direction) {
            if (direction == "down") {
                navigation_wrap.addClass("sticky");
            } else {
                navigation_wrap.removeClass("sticky");
            }
        }, {
            offset: "-250px"
        });
    }
})(jQuery);
(function($) {
    var button_recent = $("#button-recent");
    var button_popular = $("#button-popular");
    var button_comments = $("#button-comments");
    var target1 = $("#target1");
    var target2 = $("#target2");
    var target3 = $("#target3");
    nextTab(button_recent, target1);
    nextTab(button_popular, target2);
    nextTab(button_comments, target3);
    button_recent.click();

    function nextTab(button, target) {
        button.click(function() {
            $(this).addClass("btn--red-non-hover").removeClass("btn--dark").attr("aria-expanded", "true").find(".sr-state").text("Close");
            $(this).siblings(".btn--aside").removeClass("btn--red-non-hover").addClass("btn--dark").attr("aria-expanded", "false").find(".sr-state").text("Close");
            target.siblings(".box-hidden").hide();
            target.fadeIn(500);
        });
    }
})(jQuery);
(function($) {
    /* containers */
    var container_main_string = ".main__container";
    /* actions */
    var loadmore_blog = "loadmore_blog";
    var loadmore_category_sport = "loadmore_category_sport";
    var loadmore_category_food = "loadmore_category_food";
    var loadmore_category_books = "loadmore_category_books";
    var loadmore_category_uncategorized = "loadmore_category_uncategorized";
    var loadmore_gallery = "loadmore_gallery";
    /* variables - ajax content */
    var button_blog_string = ".load-more-blog";
    var button_category_sport_string = ".load-more-category-sport";
    var button_category_food_string = ".load-more-category-food";
    var button_category_books_string = ".load-more-category-books";
    var button_category_uncategorized_string = ".load-more-category-uncategorized";
    var button_gallery_string = ".load-more-gallery";
    eventsAjaxContent();

    function eventsAjaxContent() {
        morePostsAjaxContent(button_blog_string, loadmore_blog);
        morePostsAjaxContent(button_category_sport_string, loadmore_category_sport);
        morePostsAjaxContent(button_category_food_string, loadmore_category_food);
        morePostsAjaxContent(button_category_books_string, loadmore_category_books);
        morePostsAjaxContent(button_category_uncategorized_string, loadmore_category_uncategorized);
        morePostsAjaxContent(button_gallery_string, loadmore_gallery);
    }

    function morePostsAjaxContent(button, wp_action) {
        $(document).on("click", button, function() {
            var data = {
                action: wp_action,
                page: wp_params.current_page
            };
            $.ajax({
                url: wp_params.ajaxurl,
                data: data,
                type: "POST",
                beforeSend: function(xhr) {
                    $(button).text("Loading...");
                },
                success: function(data) {
                    if (data) {
                        $(button).text("More posts");
                        $(container_main_string).append(data);
                        wp_params.current_page++;
                        var class_ajax = ".ajax" + wp_params.current_page;
                        $(container_main_string).find(class_ajax).hide().fadeIn(1000);
                        if (wp_params.current_page == wp_params.max_page) $(button).remove();
                    } else {
                        $(button).remove();
                    }
                }
            });
        });
    }
})(jQuery);
(function($) {
    var container = $(".main");
    /* actions */
    var action_blog = "blog";
    var action_sport = "category_sport";
    var action_food = "category_food";
    var action_books = "category_books";
    var action_uncategorized = "category_uncategorized";
    var action_sample_page = "sample_page";
    var action_gallery = "gallery";
    var action_contact = "contact";
    /* links */
    var link_blog = $(".menu-item-53 > .navigation__link");
    var link_category_sport = $(".menu-item-19 > .navigation__link");
    var link_category_food = $(".menu-item-57 > .navigation__link");
    var link_category_books = $(".menu-item-58 > .navigation__link");
    var link_category_uncategorized = $(".menu-item-18 > .navigation__link");
    var link_gallery_sidebar = $(".gallery-box__link");
    var link_gallery = $(".menu-item-86 > .navigation__link");
    var link_sample_page = $(".menu-item-56 > .navigation__link");
    var link_contact = $(".menu-item-54 > .navigation__link");
    eventsPage();

    function eventsPage() {
        ajaxPage(link_blog, action_blog);
        ajaxPage(link_category_sport, action_sport);
        ajaxPage(link_category_food, action_food);
        ajaxPage(link_category_books, action_books);
        ajaxPage(link_category_uncategorized, action_uncategorized);
        ajaxPage(link_sample_page, action_sample_page);
        ajaxPage(link_gallery, action_gallery);
        ajaxPage(link_gallery_sidebar, action_gallery);
        ajaxPage(link_contact, action_contact);
    }

    function ajaxPage(link, wp_action) {
        link.click(function(event) {
            event.preventDefault();
            var state = {};
            var window_url = $(this).attr("href");
            var data = {
                action: wp_action,
                page: 1
            };
            $.ajax({
                url: wp_params.ajaxurl,
                data: data,
                type: "POST",
                beforeSend: function(xhr) {},
                success: function(data) {
                    if (data) {
                        container.html(data).find(".main__container").hide().fadeIn(500);
                        wp_params.current_page = 1;
                        history.pushState(state, "", window_url);
                    }
                }
            });
        });
    }
})(jQuery);
(function($) {
    var container_string = ".main";
    var single_link_string = ".js-single-link";
    var action_single = "single";
    singleAjax();

    function singleAjax() {
        $(document).on("click", single_link_string, function(event) {
            event.preventDefault();
            var post_id = $(this).data("id");
            var state = {};
            var window_url = $(this).attr("href");
            var data = {
                action: action_single,
                post_id: post_id
            };
            $.ajax({
                type: "POST",
                url: wp_params.ajaxurl,
                context: this,
                data: data,
                success: function(data) {
                    $(container_string).html(data).find(".main__container").hide().fadeIn(500);
                    history.pushState(state, "", window_url);
                }
            });
        });
    }
})(jQuery);
(function($) {
    var reply_link = ".comment__reply-link";
    var cancel_reply_link = "#cancel-comment-reply-link";
    var reply = undefined;
    var button = "#submit";
    var respond = "#respond";
    var comment_list = ".comments__list";
    var cancelreplylink = "#cancel-comment-reply-link";
    isReply();
    submitComment();

    function isReply() {
        $(document).on("click", reply_link, function(event) {
            event.preventDefault();
            $(respond).addClass("comment-respond--reply");
        });
        $(document).on("click", cancel_reply_link, function(event) {
            event.preventDefault();
            $(respond).removeClass("comment-respond--reply");
        });
    }

    function submitComment() {
        $(document).on("submit", "#commentform", function(event) {
            event.preventDefault();
            validateFields();
            if (!$(button).hasClass("loading") && !$("#author").hasClass("error") && !$("#email").hasClass("error") && !$("#comment").hasClass("error")) {
                $.ajax({
                    type: "POST",
                    url: wp_params.ajaxurl,
                    data: $(this).serialize() + "&action=ajaxcomments",
                    beforeSend: function(xhr) {
                        $(button).addClass("loading");
                        $(button).val("Loading...");
                    },
                    error: function(request, status, error) {
                        if (status == 500) {
                            alert("Error while adding comment");
                        } else if (status == "timeout") {
                            alert("Error: Server doesn't respond.");
                        } else {
                            var wpErrorHtml = request.responseText.split("<p>"),
                                wpErrorStr = wpErrorHtml[1].split("</p>");
                            alert(wpErrorStr[0]);
                        }
                    },
                    success: function(addedCommentHTML) {
                        if ($(respond).hasClass("comment-respond--reply")) {
                            $(respond).before(addedCommentHTML);
                        } else {
                            $(respond).before(addedCommentHTML);
                            $(".comment:last").hide().fadeIn(1000);
                        }
                        $("#comment").val("");
                    },
                    complete: function() {
                        $(button).removeClass("loading");
                        $(button).val("Post Comment");
                    }
                });
            }
            return false;
        });
    }

    function validateFields() {
        if ($("#author").length) {
            $("#author").validate();
        }
        if ($("#email").length) {
            $("#email").validateEmail();
        }
        $("#comment").validate();
    }
})(jQuery);
(function($) {
    var button = ".loadmore-comments";
    var action_comments = "loadmore_comments";
    var comment_list = ".comments__list";
    $(document).on("click", button, function() {
        var button = $(this);
        cpage--;
        $.ajax({
            url: wp_params.ajaxurl,
            data: {
                action: action_comments,
                post_id: parent_post_id,
                cpage: cpage
            },
            type: "POST",
            beforeSend: function(xhr) {
                $(button).text("Loading..."); // preloader here
            },
            success: function(data) {
                if (data) {
                    $(button).text("More comments");
                    $(comment_list).append(data);
                    var class_ajax = ".ajax" + cpage;
                    $(comment_list).find(class_ajax).hide().fadeIn(500);
                    if (cpage == 1) {
                        $(button).remove();
                    }
                } else {
                    $(button).remove();
                }
            }
        });
        return false;
    });
})(jQuery);
(function($) {
    var navigation_link = ".navigation__link";
    var single_link = ".js-single-link";
    var target = ".main";
    siteScroll();

    function siteScroll() {
        $(document).on("click", navigation_link, function() {
            scrollToContent();
        });
        $(document).on("click", single_link, function() {
            scrollToContent();
        });
    }

    function scrollToContent() {
        $("html,body").animate({
            scrollTop: $(target).offset().top
        }, 1500);
    }
})(jQuery);
