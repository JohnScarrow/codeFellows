/* eslint-disable */
(function() {
    var e, o, n, t, r, i, s, a, l, c, d, p, u, f, b, m, x, g, h, w, y, v, D, k, _, E, S, C, N, L = [].slice, U = [].indexOf || function(e) {
        for (var o = 0, n = this.length; n > o; o++)
            if (o in this && this[o] === e)
                return o;
        return -1
    }
    ;
    return null == window.Dropbox && (window.Dropbox = {}),
    null == Dropbox.baseUrl && (Dropbox.baseUrl = "https://www.dropbox.com"),
    null == Dropbox.blockBaseUrl && (Dropbox.blockBaseUrl = "https://dl.dropbox.com"),
    Dropbox.addListener = function(e, o, n) {
        e.addEventListener ? e.addEventListener(o, n, !1) : e.attachEvent("on" + o, function(e) {
            return e.preventDefault = function() {
                return this.returnValue = !1
            }
            ,
            n(e)
        })
    }
    ,
    Dropbox.removeListener = function(e, o, n) {
        e.removeEventListener ? e.removeEventListener(o, n, !1) : e.detachEvent("on" + o, n)
    }
    ,
    r = function(e) {
        var o, n;
        return n = encodeURIComponent(Dropbox.VERSION),
        o = -1 === e.indexOf("?") ? "?" : "&",
        "" + e + o + "version=" + n
    }
    ,
    s = function(e, o) {
        var n, t, i, s, a, l, c, d, p;
        return l = encodeURIComponent(window.location.protocol + "//" + window.location.host),
        n = encodeURIComponent(Dropbox.appKey),
        s = encodeURIComponent(e.linkType || ""),
        d = encodeURIComponent(e._trigger || "js"),
        a = Boolean(e.multiselect),
        t = encodeURIComponent((null != (c = e.extensions) && "function" == typeof c.join ? c.join(" ") : void 0) || ""),
        i = Boolean(e.folderselect),
        o = Boolean(o),
        p = Dropbox.baseUrl + "/chooser?origin=" + l + "&app_key=" + n + "&link_type=" + s,
        p += "&trigger=" + d + "&multiselect=" + a + "&extensions=" + t + "&folderselect=" + i + "&iframe=" + o,
        r(p)
    }
    ,
    C = function() {
        var e, o, n;
        return o = encodeURIComponent(window.location.protocol + "//" + window.location.host),
        e = encodeURIComponent(Dropbox.appKey),
        n = Dropbox.baseUrl + "/saver?origin=" + o + "&app_key=" + e,
        r(n)
    }
    ,
    y = 1,
    m = function(e, o) {
        var n, t, i, s;
        if (n = encodeURIComponent(Dropbox.appKey),
        s = Dropbox.baseUrl + "/dropins/job_status?job=" + o + "&app_key=" + n,
        s = r(s),
        i = function(o) {
            var n;
            "COMPLETE" === o.status ? ("function" == typeof e.progress && e.progress(1),
            "function" == typeof e.success && e.success()) : "PENDING" === (n = o.status) || "DOWNLOADING" === n ? (null != o.progress && "function" == typeof e.progress && e.progress(o.progress / 100),
            setTimeout(t, 1500)) : "FAILED" === o.status && "function" == typeof e.error && e.error(o.error)
        }
        ,
        "withCredentials"in new XMLHttpRequest)
            t = function() {
                var o;
                return o = new XMLHttpRequest,
                o.onload = function() {
                    return i(JSON.parse(o.responseText))
                }
                ,
                o.onerror = function() {
                    return "function" == typeof e.error ? e.error() : void 0
                }
                ,
                o.open("GET", s, !0),
                o.send()
            }
            ;
        else if (Dropbox.disableJSONP) {
            if ("undefined" == typeof XDomainRequest || null === XDomainRequest || "https:" !== document.location.protocol)
                throw new Error("Unable to find suitable means of cross domain communication");
            t = function() {
                var o;
                return o = new XDomainRequest,
                o.onload = function() {
                    return i(JSON.parse(o.responseText))
                }
                ,
                o.onerror = function() {
                    return "function" == typeof e.error ? e.error() : void 0
                }
                ,
                o.open("get", s),
                o.send()
            }
        } else
            t = function() {
                var o, n, t;
                return o = "DropboxJsonpCallback" + y++,
                n = !1,
                window[o] = function(e) {
                    return n = !0,
                    i(e)
                }
                ,
                t = document.createElement("script"),
                t.src = s + "&callback=" + o,
                t.onreadystatechange = function() {
                    var o;
                    return "loaded" === t.readyState ? (n || "function" == typeof e.error && e.error(),
                    null != (o = t.parentNode) ? o.removeChild(t) : void 0) : void 0
                }
                ,
                document.getElementsByTagName("head")[0].appendChild(t)
            }
            ;
        return "function" == typeof e.progress && e.progress(0),
        t()
    }
    ,
    x = function(e, o, n) {
        var t, r, i, s, a, l;
        switch (r = JSON.parse(e.data),
        i = "undefined" != typeof g && null !== g && n._popup ? g.contentWindow : e.source,
        r.method) {
        case "origin_request":
            e.source.postMessage(JSON.stringify({
                method: "origin"
            }), Dropbox.baseUrl);
            break;
        case "ready":
            null != n.files && (n._fetch_url_on_save ? (l = function() {
                var e, o, t, r;
                for (t = n.files,
                r = [],
                e = 0,
                o = t.length; o > e; e++)
                    s = t[e],
                    r.push({
                        filename: s.filename
                    });
                return r
            }(),
            a = JSON.stringify({
                method: "files_with_callback",
                params: l
            })) : a = JSON.stringify({
                method: "files",
                params: n.files
            }),
            i.postMessage(a, Dropbox.baseUrl)),
            "function" == typeof n.ready && n.ready();
            break;
        case "files_selected":
        case "files_saved":
            "function" == typeof o && o(),
            "function" == typeof n.success && n.success(r.params);
            break;
        case "progress":
            "function" == typeof n.progress && n.progress(r.params);
            break;
        case "close_dialog":
            "function" == typeof o && o(),
            "function" == typeof n.cancel && n.cancel();
            break;
        case "web_session_error":
            "function" == typeof o && o(),
            "function" == typeof n.webSessionFailure && n.webSessionFailure();
            break;
        case "web_session_unlinked":
            "function" == typeof o && o(),
            "function" == typeof n.webSessionUnlinked && n.webSessionUnlinked();
            break;
        case "resize":
            "function" == typeof n.resize && n.resize(r.params);
            break;
        case "error":
            "function" == typeof o && o(),
            "function" == typeof n.error && n.error(r.params);
            break;
        case "job_id":
            "function" == typeof o && o(),
            m(n, r.params);
            break;
        case "save_callback":
            t = function(e) {
                if (null == e)
                    throw new Error("Please supply {urls: [...]} to success callback");
                if (null != e.url && null != e.urls)
                    throw new Error("Do not pass both url and urls to the save callback");
                if (null != e.url && (e.urls = [e.url]),
                null == e.urls)
                    throw new Error("Please supply {urls: [...]} to success callback");
                r = {
                    method: "continue_saving",
                    params: {
                        download_urls: e.urls
                    }
                },
                i.postMessage(JSON.stringify(r), Dropbox.baseUrl)
            }
            ,
            u(n, r.params, t);
            break;
        case "_debug_log":
            "undefined" != typeof console && null !== console && console.log(r.params.msg)
        }
    }
    ,
    u = function(e, o, n) {
        var t;
        e._fetch_url_on_save && (t = e.fetch_urls_fn,
        "function" != typeof t && "function" == typeof e.error && e.error("Something went wrong, file url callback not provided."),
        t(n, o))
    }
    ,
    g = null ,
    l = function() {
        /\bTrident\b/.test(navigator.userAgent) && null != document.body && null == g && (g = document.createElement("iframe"),
        g.setAttribute("id", "dropbox_xcomm"),
        g.setAttribute("src", Dropbox.baseUrl + "/static/api/1/xcomm.html"),
        g.style.display = "none",
        document.body.appendChild(g))
    }
    ,
    Dropbox.createChooserWidget = function(e) {
        var o;
        return o = c(s(e, !0)),
        o._handler = function(n) {
            n.source === o.contentWindow && n.origin === Dropbox.baseUrl && x(n, null , e)
        }
        ,
        Dropbox.addListener(window, "message", o._handler),
        o
    }
    ,
    Dropbox.cleanupWidget = function(e) {
        if (!e._handler)
            throw new Error("Invalid widget!");
        Dropbox.removeListener(window, "message", e._handler),
        delete e._handler
    }
    ,
    _ = function(e, o) {
        var n, t;
        return n = (window.screenX || window.screenLeft) + ((window.outerWidth || document.documentElement.offsetWidth) - e) / 2,
        t = (window.screenY || window.screenTop) + ((window.outerHeight || document.documentElement.offsetHeight) - o) / 2,
        "width=" + e + ",height=" + o + ",left=" + n + ",top=" + t
    }
    ,
    Dropbox._dropinsjs_loaded ? void ("undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("dropins.js included more than once")) : (Dropbox._dropinsjs_loaded = !0,
    null == Dropbox.appKey && (Dropbox.appKey = null != (E = document.getElementById("dropboxjs")) ? E.getAttribute("data-app-key") : void 0),
    t = function(e) {
        return e
    }
    ,
    e = "https://www.dropbox.com/developers/dropins/chooser/js",
    n = ["text", "documents", "images", "video", "audio"],
    Dropbox.init = function(e) {
        null != e.translation_function && (t = e.translation_function),
        null != e.appKey && (Dropbox.appKey = e.appKey)
    }
    ,
    c = function(e) {
        var o;
        return o = document.createElement("iframe"),
        o.src = e,
        o.style.display = "block",
        o.style.backgroundColor = "white",
        o.style.border = "none",
        o
    }
    ,
    k = function(e) {
        var o, n, t, r, i, s, a, l, c;
        if ("string" == typeof e[0])
            c = e.shift(),
            n = "string" == typeof e[0] ? e.shift() : b(c),
            s = e.shift() || {},
            s.files = [{
                url: c,
                filename: n
            }];
        else {
            if (s = e.shift(),
            null == s)
                throw new Error("Missing arguments. See documentation.");
            if ((null != (a = s.files) ? !a.length : !0) && "function" != typeof s.files)
                throw new Error("Missing files. See documentation.");
            if (null != s.fetch_urls_fn) {
                if ("function" != typeof s.fetch_urls_fn)
                    throw new Error("fetch_urls_fn must be a function if supplied.  See documentation.");
                s._fetch_url_on_save = !0
            }
            for (l = s.files,
            t = r = 0,
            i = l.length; i > r; t = ++r) {
                if (o = l[t],
                "function" == typeof o.url && (s._fetch_url_on_save = !0,
                s.fetch_urls_fn = o.url,
                o.url = null ,
                t > 0))
                    throw new Error("Old style url as callback is only supported for single files.");
                o.filename || (o.filename = b(o.url))
            }
        }
        return s
    }
    ,
    Dropbox.save = function() {
        var e, o, n, r, i, s, a;
        if (e = 1 <= arguments.length ? L.call(arguments, 0) : [],
        s = k(e),
        !Dropbox.isBrowserSupported())
            return void alert(t("Your browser does not support the Dropbox Saver"));
        if (s._popup = !0,
        "object" != typeof s.files || !s.files.length)
            throw new Error("The object passed in must have a 'files' property that contains a list of objects. See documentation.");
        for (a = s.files,
        r = 0,
        i = a.length; i > r; r++)
            if (n = a[r],
            s._fetch_url_on_save) {
                if (s.fetch_urls_fn) {
                    if (null != n.url)
                        throw new Error("You passed in a 'fetch_urls_fn' option to specify the file URLs.  Don't include individual URLs in each file objects.")
                } else if ("function" != typeof n.url)
                    throw new Error("File urls should be all urls, or a single file with function. See documentation.")
            } else if ("string" != typeof n.url)
                throw new Error("File urls to download incorrectly configured. Each file must have a url. See documentation.");
        return o = _(352, 237),
        D(C(), o, s)
    }
    ,
    D = function(e, o, n) {
        var t, r, i, s, a;
        if (t = function() {
            s.closed || s.close(),
            Dropbox.removeListener(window, "message", r),
            clearInterval(a)
        }
        ,
        r = function(e) {
            x(e, t, n)
        }
        ,
        i = function() {
            (function() {
                try {
                    return s.closed
                } catch (e) {}
            })() && (t(),
            "function" == typeof n.cancel && n.cancel())
        }
        ,
        s = window.open(e, "dropbox", o + ",resizable=yes,location=yes"),
        !s)
            throw new Error("Failed to open a popup window. Dropbox.choose and Dropbox.save should only be called from within a user-triggered event handler such as a tap or click event.");
        return s.focus(),
        a = setInterval(i, 100),
        Dropbox.addListener(window, "message", r),
        s
    }
    ,
    N = function(o) {
        var t, r, i, s, a;
        if (null == o.success && "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("You must provide a success callback to the Chooser to see the files that the user selects"),
        r = function() {
            return "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("The provided list of extensions or file types is not valid. See Chooser documentation: " + e),
            "undefined" != typeof console && null !== console && "function" == typeof console.warn && console.warn("Available file types are: " + n.join(", ")),
            delete o.extensions
        }
        ,
        null != o.extensions && null != Array.isArray)
            if (Array.isArray(o.extensions))
                for (a = o.extensions,
                i = 0,
                s = a.length; s > i; i++)
                    t = a[i],
                    !t.match(/^\.[\.\w$#&+@!()\-'`_~]+$/) && U.call(n, t) < 0 && r();
            else
                r();
        return o
    }
    ,
    i = function(e) {
        var o, n, r, i, a, l;
        return Dropbox.isBrowserSupported() ? (l = 640,
        r = 552,
        void (e.iframe ? (a = c(s(e, !0)),
        a.style.width = l + "px",
        a.style.height = r + "px",
        a.style.margin = "125px auto 0 auto",
        a.style.border = "1px solid #ACACAC",
        a.style.boxShadow = "rgba(0, 0, 0, .2) 0px 4px 16px",
        i = document.createElement("div"),
        i.style.position = "fixed",
        i.style.left = i.style.right = i.style.top = i.style.bottom = "0",
        i.style.zIndex = "1000",
        i.style.backgroundColor = "rgba(160, 160, 160, 0.2)",
        i.appendChild(a),
        document.body.appendChild(i),
        n = function(o) {
            o.source === a.contentWindow && x(o, function() {
                document.body.removeChild(i),
                Dropbox.removeListener(window, "message", n)
            }, e)
        }
        ,
        Dropbox.addListener(window, "message", n)) : (o = _(l, r),
        D(s(e), o, e)))) : void alert(t("Your browser does not support the Dropbox Chooser"))
    }
    ,
    Dropbox.choose = function(e) {
        null == e && (e = {}),
        e = N(e),
        i(e)
    }
    ,
    Dropbox.isBrowserSupported = function() {
        var e;
        return e = w(),
        Dropbox.isBrowserSupported = function() {
            return e
        }
        ,
        e
    }
    ,
    w = function() {
        var e, o, n, t;
        for (t = [/IEMobile\/(7|8|9|10)\./, /BB10;/, /CriOS/],
        o = 0,
        n = t.length; n > o; o++)
            if (e = t[o],
            e.test(navigator.userAgent))
                return !1;
        return "undefined" != typeof JSON && null !== JSON && null != window.postMessage && null != window.addEventListener
    }
    ,
    f = function(e) {
        return e.replace(/\/+$/g, "").split("/").pop()
    }
    ,
    b = function(e) {
        var o;
        return o = document.createElement("a"),
        o.href = e,
        f(o.pathname)
    }
    ,
    a = function(e, o) {
        var n;
        return null != o ? o.innerHTML = "" : (o = document.createElement("a"),
        o.href = "#"),
        o.className += " dropbox-dropin-btn",
        Dropbox.isBrowserSupported() ? o.className += " dropbox-dropin-default" : o.className += " dropbox-dropin-disabled",
        n = document.createElement("span"),
        n.className = "dropin-btn-status",
        o.appendChild(n),
        e = document.createTextNode(e),
        o.appendChild(e),
        o
    }
    ,
    Dropbox.createChooseButton = function(e) {
        var o;
        return null == e && (e = {}),
        e = N(e),
        o = a(t("Choose from Dropbox")),
        Dropbox.addListener(o, "click", function(n) {
            n.preventDefault(),
            i({
                success: function(n) {
                    o.className = "dropbox-dropin-btn dropbox-dropin-success",
                    "function" == typeof e.success && e.success(n)
                },
                cancel: e.cancel,
                linkType: e.linkType,
                multiselect: e.multiselect,
                folderselect: e.folderselect,
                extensions: e.extensions,
                iframe: e.iframe,
                _trigger: "button"
            })
        }),
        o
    }
    ,
    Dropbox.createSaveButton = function() {
        var e, o, n;
        return e = 1 <= arguments.length ? L.call(arguments, 0) : [],
        n = k(e),
        o = e.shift(),
        o = a(t("Save to Dropbox"), o),
        Dropbox.addListener(o, "click", function(e) {
            var t;
            return e.preventDefault(),
            o.className.indexOf("dropbox-dropin-error") >= 0 || o.className.indexOf("dropbox-dropin-default") >= 0 || o.className.indexOf("dropbox-dropin-disabled") >= 0 ? (t = ("function" == typeof n.files ? n.files() : void 0) || n.files,
            (null != t ? t.length : void 0) ? void Dropbox.save({
                files: t,
                success: function() {
                    o.className = "dropbox-dropin-btn dropbox-dropin-success",
                    "function" == typeof n.success && n.success()
                },
                progress: function(e) {
                    o.className = "dropbox-dropin-btn dropbox-dropin-progress",
                    "function" == typeof n.progress && n.progress(e)
                },
                cancel: function() {
                    "function" == typeof n.cancel && n.cancel()
                },
                error: function(e) {
                    o.className = "dropbox-dropin-btn dropbox-dropin-error",
                    "function" == typeof n.error && n.error(e)
                }
            }) : (o.className = "dropbox-dropin-btn dropbox-dropin-error",
            void ("function" == typeof n.error && n.error("Missing files")))) : void 0
        }),
        o
    }
    ,
    v = function(e, o) {
        return "background: " + e + ";\nbackground: -moz-linear-gradient(top, " + e + " 0%, " + o + " 100%);\nbackground: -webkit-linear-gradient(top, " + e + " 0%, " + o + " 100%);\nbackground: linear-gradient(to bottom, " + e + " 0%, " + o + " 100%);\nfilter: progid:DXImageTransform.Microsoft.gradient(startColorstr='" + e + "', endColorstr='" + o + "',GradientType=0);"
    }
    ,
    d = document.createElement("style"),
    d.type = "text/css",
    p = '@-webkit-keyframes rotate {\n  from  { -webkit-transform: rotate(0deg); }\n  to   { -webkit-transform: rotate(360deg); }\n}\n\n@keyframes rotate {\n  from  { transform: rotate(0deg); }\n  to   { transform: rotate(360deg); }\n}\n\n.dropbox-dropin-btn, .dropbox-dropin-btn:link, .dropbox-dropin-btn:hover {\n  display: inline-block;\n  height: 14px;\n  font-family: "Lucida Grande", "Segoe UI", "Tahoma", "Helvetica Neue", "Helvetica", sans-serif;\n  font-size: 11px;\n  font-weight: 600;\n  color: #636363;\n  text-decoration: none;\n  padding: 1px 7px 5px 3px;\n  border: 1px solid #ebebeb;\n  border-radius: 2px;\n  border-bottom-color: #d4d4d4;\n  ' + v("#fcfcfc", "#f5f5f5") + "\n}\n\n.dropbox-dropin-default:hover, .dropbox-dropin-error:hover {\n  border-color: #dedede;\n  border-bottom-color: #cacaca;\n  " + v("#fdfdfd", "#f5f5f5") + "\n}\n\n.dropbox-dropin-default:active, .dropbox-dropin-error:active {\n  border-color: #d1d1d1;\n  box-shadow: inset 0 1px 1px rgba(0,0,0,0.1);\n}\n\n.dropbox-dropin-btn .dropin-btn-status {\n  display: inline-block;\n  width: 15px;\n  height: 14px;\n  vertical-align: bottom;\n  margin: 0 5px 0 2px;\n  background: transparent url('" + Dropbox.baseUrl + "/static/images/widgets/dbx-saver-status.png') no-repeat;\n  position: relative;\n  top: 2px;\n}\n\n.dropbox-dropin-default .dropin-btn-status {\n  background-position: 0px 0px;\n}\n\n.dropbox-dropin-progress .dropin-btn-status {\n  width: 18px;\n  margin: 0 4px 0 0;\n  background: url('" + Dropbox.baseUrl + "/static/images/widgets/dbx-progress.png') no-repeat center center;\n  -webkit-animation-name: rotate;\n  -webkit-animation-duration: 1.7s;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-timing-function: linear;\n  animation-name: rotate;\n  animation-duration: 1.7s;\n  animation-iteration-count: infinite;\n  animation-timing-function: linear;\n}\n\n.dropbox-dropin-success .dropin-btn-status {\n  background-position: -15px 0px;\n}\n\n.dropbox-dropin-disabled {\n  background: #e0e0e0;\n  border: 1px #dadada solid;\n  border-bottom: 1px solid #ccc;\n  box-shadow: none;\n}\n\n.dropbox-dropin-disabled .dropin-btn-status {\n  background-position: -30px 0px;\n}\n\n.dropbox-dropin-error .dropin-btn-status {\n  background-position: -45px 0px;\n}\n\n@media only screen and (-webkit-min-device-pixel-ratio: 1.4) {\n  .dropbox-dropin-btn .dropin-btn-status {\n    background-image: url('" + Dropbox.baseUrl + "/static/images/widgets/dbx-saver-status-2x.png');\n    background-size: 60px 14px;\n    -webkit-background-size: 60px 14px;\n  }\n\n  .dropbox-dropin-progress .dropin-btn-status {\n    background: url('" + Dropbox.baseUrl + "/static/images/widgets/dbx-progress-2x.png') no-repeat center center;\n    background-size: 20px 20px;\n    -webkit-background-size: 20px 20px;\n  }\n}\n\n.dropbox-saver:hover, .dropbox-chooser:hover {\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.dropbox-chooser, .dropbox-dropin-btn {\n  line-height: 11px !important;\n  text-decoration: none !important;\n  box-sizing: content-box !important;\n  -webkit-box-sizing: content-box !important;\n  -moz-box-sizing: content-box !important;\n}\n",
    d.styleSheet ? d.styleSheet.cssText = p : d.textContent = p,
    document.getElementsByTagName("head")[0].appendChild(d),
    setTimeout(l, 0),
    o = function() {
        document.removeEventListener ? document.removeEventListener("DOMContentLoaded", o, !1) : document.detachEvent && document.detachEvent("onreadystatechange", o),
        l(),
        h()
    }
    ,
    "interactive" === (S = document.readyState) || "complete" === S ? setTimeout(o, 0) : document.addEventListener ? document.addEventListener("DOMContentLoaded", o, !1) : document.attachEvent("onreadystatechange", o),
    Dropbox.VERSION = "2",
    void (h = function() {
        var e, o, n, t;
        for (t = document.getElementsByTagName("a"),
        o = 0,
        n = t.length; n > o; o++)
            e = t[o],
            U.call((e.getAttribute("class") || "").split(" "), "dropbox-saver") >= 0 && !function(e) {
                Dropbox.createSaveButton({
                    files: function() {
                        return [{
                            url: e.getAttribute("data-url") || e.href,
                            filename: e.getAttribute("data-filename") || f(e.pathname)
                        }]
                    }
                }, e)
            }(e)
    }
    ))
}
).call(this);
