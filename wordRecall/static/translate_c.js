/**
 * Created by hanzhao on 15-6-10.
 */
/* Copyright 2011 Google */
var tn_;
function tn_aa(a) {
    return a in tn_ba ? tn_ba[a] : tn_ba[a] = -1 != navigator.userAgent.toLowerCase().indexOf(a)
}
var tn_ba = {}, tn_ca = {
    ieQuirks_: function (a) {
        return a.document.body.scrollTop
    }, ieStandards_: function (a) {
        return a.document.documentElement.scrollTop
    }, dom_: function (a) {
        return a.pageYOffset
    }
}, tn_da = {
    ieQuirks_: function (a) {
        return a.document.body.scrollLeft
    }, ieStandards_: function (a) {
        return a.document.documentElement.scrollLeft
    }, dom_: function (a) {
        return a.pageXOffset
    }
};
function tn_ea(a, b) {
    try {
        if (tn_aa("safari") || tn_aa("konqueror"))return b.dom_(a);
        if (!window.opera && "compatMode"in a.document && "CSS1Compat" == a.document.compatMode)return b.ieStandards_(a);
        if ((tn_aa("msie") || tn_aa("trident")) && !window.opera)return b.ieQuirks_(a)
    } catch (c) {
    }
    return b.dom_(a)
};
function tn_a(a, b, c) {
    this.x = a;
    this.y = b;
    this.coordinateFrame = c || null
}
tn_a.prototype.toString = function () {
    return "[P " + this.x + "," + this.y + "]"
};
tn_a.prototype.clone = function () {
    return new tn_a(this.x, this.y, this.coordinateFrame)
};
function tn_fa(a, b) {
    this.dx = a;
    this.dy = b
}
tn_fa.prototype.toString = function () {
    return "[D " + this.dx + "," + this.dy + "]"
};
function Rect(a, b, c, d, e) {
    this.x = a;
    this.y = b;
    this.w = c;
    this.h = d;
    this.coordinateFrame = e || null
}
Rect.prototype.contains = function (a) {
    return this.x <= a.x && a.x < this.x + this.w && this.y <= a.y && a.y < this.y + this.h
};
Rect.prototype.toString = function () {
    return "[R " + this.w + "x" + this.h + "+" + this.x + "+" + this.y + "]"
};
Rect.prototype.clone = function () {
    return new Rect(this.x, this.y, this.w, this.h, this.coordinateFrame)
};
function tn_ga(a) {
    function b(b) {
        for (var c = a.offsetParent; c && c.offsetParent; c = c.offsetParent)c.scrollLeft && (b.x -= c.scrollLeft), c.scrollTop && (b.y -= c.scrollTop)
    }

    if (!a)return null;
    var c;
    c = a.ownerDocument && a.ownerDocument.parentWindow ? a.ownerDocument.parentWindow : a.ownerDocument && a.ownerDocument.defaultView ? a.ownerDocument.defaultView : window;
    if (a.getBoundingClientRect) {
        var d = a.getBoundingClientRect();
        return new Rect(d.left + tn_ea(c, tn_da), d.top + tn_ea(c, tn_ca), d.right - d.left, d.bottom - d.top, c)
    }
    if (a.ownerDocument &&
        a.ownerDocument.getBoxObjectFor)return d = a.ownerDocument.getBoxObjectFor(a), c = new Rect(d.x, d.y, d.width, d.height, c), b(c), c;
    for (var e = d = 0, f = a; f.offsetParent; f = f.offsetParent)d += f.offsetLeft, e += f.offsetTop;
    c = new Rect(d, e, a.offsetWidth, a.offsetHeight, c);
    b(c);
    return c
};
var tn_ha;
a:{
    for (var tn_ia = [" ", "\u0120", -1, "!", "\u0120", -1, "\u0120", "\u0120", 0, "\u0121", "\u0120", -1, "\u0121", "\u0120|\u0121", 0, "\u0122", "\u0120|\u0121", -1, "\u0120", "[\u0120]", 0, "\u0121", "[\u0120]", -1, "\u0121", "[\u0120\u0121]", 0, "\u0122", "[\u0120\u0121]", -1, "\u0121", "[\u0120-\u0121]", 0, "\u0122", "[\u0120-\u0121]", -1], tn_b = 0; tn_b < tn_ia.length; tn_b += 3)if (tn_ia[tn_b].search(new RegExp(tn_ia[tn_b + 1])) != tn_ia[tn_b + 2]) {
        tn_ha = !1;
        break a
    }
    tn_ha = !0
}
var tn_c = tn_ha, tn_ja = tn_c ? "A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u00ff\u0100-\u0131\u0134-\u013e\u0141-\u0148\u014a-\u017e\u0180-\u01c3\u01cd-\u01f0\u01f4-\u01f5\u01fa-\u0217\u0250-\u02a8\u02bb-\u02c1\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03ce\u03d0-\u03d6\u03da\u03dc\u03de\u03e0\u03e2-\u03f3\u0401-\u040c\u040e-\u044f\u0451-\u045c\u045e-\u0481\u0490-\u04c4\u04c7-\u04c8\u04cb-\u04cc\u04d0-\u04eb\u04ee-\u04f5\u04f8-\u04f9\u0531-\u0556\u0559\u0561-\u0586\u05d0-\u05ea\u05f0-\u05f2\u0621-\u063a\u0641-\u064a\u0671-\u06b7\u06ba-\u06be\u06c0-\u06ce\u06d0-\u06d3\u06d5\u06e5-\u06e6\u0905-\u0939\u093d\u0958-\u0961\u0985-\u098c\u098f-\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09dc-\u09dd\u09df-\u09e1\u09f0-\u09f1\u0a05-\u0a0a\u0a0f-\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32-\u0a33\u0a35-\u0a36\u0a38-\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8b\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2-\u0ab3\u0ab5-\u0ab9\u0abd\u0ae0\u0b05-\u0b0c\u0b0f-\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32-\u0b33\u0b36-\u0b39\u0b3d\u0b5c-\u0b5d\u0b5f-\u0b61\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99-\u0b9a\u0b9c\u0b9e-\u0b9f\u0ba3-\u0ba4\u0ba8-\u0baa\u0bae-\u0bb5\u0bb7-\u0bb9\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c60-\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cde\u0ce0-\u0ce1\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d28\u0d2a-\u0d39\u0d60-\u0d61\u0e01-\u0e2e\u0e30\u0e32-\u0e33\u0e40-\u0e45\u0e81-\u0e82\u0e84\u0e87-\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa-\u0eab\u0ead-\u0eae\u0eb0\u0eb2-\u0eb3\u0ebd\u0ec0-\u0ec4\u0f40-\u0f47\u0f49-\u0f69\u10a0-\u10c5\u10d0-\u10f6\u1100\u1102-\u1103\u1105-\u1107\u1109\u110b-\u110c\u110e-\u1112\u113c\u113e\u1140\u114c\u114e\u1150\u1154-\u1155\u1159\u115f-\u1161\u1163\u1165\u1167\u1169\u116d-\u116e\u1172-\u1173\u1175\u119e\u11a8\u11ab\u11ae-\u11af\u11b7-\u11b8\u11ba\u11bc-\u11c2\u11eb\u11f0\u11f9\u1e00-\u1e9b\u1ea0-\u1ef9\u1f00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2126\u212a-\u212b\u212e\u2180-\u2182\u3041-\u3094\u30a1-\u30fa\u3105-\u312c\uac00-\ud7a3" : "A-Za-z",
    tn_ka = tn_c ? "\u4e00-\u9fa5\u3007\u3021-\u3029" : "", tn_la = tn_c ? "\u0300-\u0345\u0360-\u0361\u0483-\u0486\u0591-\u05a1\u05a3-\u05b9\u05bb-\u05bd\u05bf\u05c1-\u05c2\u05c4\u064b-\u0652\u0670\u06d6-\u06dc\u06dd-\u06df\u06e0-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0901-\u0903\u093c\u093e-\u094c\u094d\u0951-\u0954\u0962-\u0963\u0981-\u0983\u09bc\u09be\u09bf\u09c0-\u09c4\u09c7-\u09c8\u09cb-\u09cd\u09d7\u09e2-\u09e3\u0a02\u0a3c\u0a3e\u0a3f\u0a40-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a70-\u0a71\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0b01-\u0b03\u0b3c\u0b3e-\u0b43\u0b47-\u0b48\u0b4b-\u0b4d\u0b56-\u0b57\u0b82-\u0b83\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0c01-\u0c03\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c82-\u0c83\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5-\u0cd6\u0d02-\u0d03\u0d3e-\u0d43\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86-\u0f8b\u0f90-\u0f95\u0f97\u0f99-\u0fad\u0fb1-\u0fb7\u0fb9\u20d0-\u20dc\u20e1\u302a-\u302f\u3099\u309a" :
        "", tn_ma = tn_c ? "0-9\u0660-\u0669\u06f0-\u06f9\u0966-\u096f\u09e6-\u09ef\u0a66-\u0a6f\u0ae6-\u0aef\u0b66-\u0b6f\u0be7-\u0bef\u0c66-\u0c6f\u0ce6-\u0cef\u0d66-\u0d6f\u0e50-\u0e59\u0ed0-\u0ed9\u0f20-\u0f29" : "0-9", tn_na = tn_c ? "\u00b7\u02d0\u02d1\u0387\u0640\u0e46\u0ec6\u3005\u3031-\u3035\u309d-\u309e\u30fc-\u30fe" : "", tn_oa = tn_ja + tn_ka, tn_pa = tn_oa + tn_ma + "\\._:" + tn_la + tn_na + "-", tn_qa = "[" + tn_oa + "_:][" + tn_pa + "]*", tn_ra = "&" + tn_qa + ";", tn_sa = tn_ra + "|&#[0-9]+;|&#x[0-9a-fA-F]+;", tn_ta = '"(([^<&"]|' + tn_sa + ")*)\"|'(([^<&']|" +
        tn_sa + ")*)'", tn_ua = "(" + tn_qa + ")([ \t\r\n]+)?=([ \t\r\n]+)?(" + tn_ta + ")", tn_va = tn_c ? ":A-Z_a-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02ff\u0370-\u037d\u037f-\u1fff\u200c-\u200d\u2070-\u218f\u2c00-\u2fef\u3001-\ud7ff\uf900-\ufdcf\ufdf0-\ufffd" : ":A-Z_a-z", tn_wa = tn_va + (tn_c ? "\\.0-9\u00b7\u0300-\u036f\u203f-\u2040-" : "\\.0-9-"), tn_xa = "[" + tn_va + "][" + tn_wa + "]*", tn_ya = "&" + tn_xa + ";", tn_za = tn_ya + "|&#[0-9]+;|&#x[0-9a-fA-F]+;", tn_Aa = '"(([^<&"]|' + tn_za + ")*)\"|'(([^<&']|" + tn_za + ")*)'", tn_Ba = "(" + tn_xa + ")([ \t\r\n]+)?=([ \t\r\n]+)?(" +
        tn_Aa + ")", tn_Ca = tn_oa + tn_ma + "\\._" + tn_la + tn_na + "-", tn_Da = "[" + tn_oa + "_][" + tn_Ca + "]*";
function tn_d(a) {
    a || tn_e("Assertion failed")
}
function tn_f(a, b) {
    var c = a.indexOf(b);
    if (-1 == c)return [a];
    var d = [];
    for (d.push(a.substr(0, c)); -1 != c;) {
        var e = a.indexOf(b, c + 1);
        -1 != e ? d.push(a.substr(c + 1, e - c - 1)) : d.push(a.substr(c + 1));
        c = e
    }
    return d
}
function tn_Ea(a, b) {
    if (3 == b.nodeType)return a.createTextNode(b.nodeValue);
    if (4 == b.nodeType)return a.createCDATASection(b.nodeValue);
    if (1 == b.nodeType) {
        for (var c = a.createElement(b.nodeName), d = 0; d < b.attributes.length; ++d) {
            var e = b.attributes[d], f = e.nodeName, e = e.nodeValue;
            c.setAttribute(f, e)
        }
        for (d = b.firstChild; d; d = d.nextSibling)f = arguments.callee(a, d), c.appendChild(f);
        return c
    }
    return a.createComment(b.nodeName)
}
function Set() {
    this.keys = []
}
tn_ = Set.prototype;
tn_.size = function () {
    return this.keys.length
};
tn_.add = function (a, b) {
    var c = b || 1;
    this.contains(a) || (this[":" + a] = c, this.keys.push(a))
};
tn_.set = function (a, b) {
    var c = b || 1;
    this.contains(a) ? this[":" + a] = c : (this[":" + a] = c, this.keys.push(a))
};
tn_.get = function (a) {
    if (this.contains(a))return this[":" + a];
    var b;
    return b
};
tn_.remove = function (a) {
    this.contains(a) && (delete this[":" + a], tn_Fa(this.keys, a, !0))
};
tn_.contains = function (a) {
    return "undefined" != typeof this[":" + a]
};
tn_.items = function () {
    for (var a = [], b = 0; b < this.keys.length; ++b) {
        var c = this.keys[b], c = this[":" + c];
        a.push(c)
    }
    return a
};
tn_.map = function (a) {
    for (var b = 0; b < this.keys.length; ++b) {
        var c = this.keys[b];
        a.call(this, c, this[":" + c])
    }
};
tn_.clear = function () {
    for (var a = 0; a < this.keys.length; ++a)delete this[":" + this.keys[a]];
    this.keys.length = 0
};
function tn_Ga(a, b) {
    for (var c = 0; c < a.length; ++c)b.call(this, a[c], c)
}
function tn_Ha(a, b) {
    for (var c = [], d = 0; d < a.length; ++d)c.push(b(a[d]));
    return c
}
function tn_Ia(a) {
    for (var b = 0; b < a.length / 2; ++b) {
        var c = a[b], d = a.length - b - 1;
        a[b] = a[d];
        a[d] = c
    }
}
function tn_Fa(a, b, c) {
    for (var d = 0, e = 0; e < a.length; ++e)if (a[e] === b || c && a[e] == b)a.splice(e--, 1), d++;
    return d
}
function tn_Ja(a, b) {
    for (var c = 0; c < b.length; ++c)a.push(b[c])
}
function tn_g(a) {
    if (!a)return "";
    var b = "";
    if (3 == a.nodeType || 4 == a.nodeType || 2 == a.nodeType)b += a.nodeValue; else if (1 == a.nodeType || 9 == a.nodeType || 11 == a.nodeType)for (var c = 0; c < a.childNodes.length; ++c)b += arguments.callee(a.childNodes[c]);
    return b
}
function tn_Ka(a, b) {
    var c = [];
    tn_La(a, c, b);
    return c.join("")
}
function tn_La(a, b, c) {
    if (3 == a.nodeType)b.push(tn_Ma(a.nodeValue)); else if (4 == a.nodeType)c ? b.push(a.nodeValue) : b.push("<![CDATA[" + a.nodeValue + "]]\x3e"); else if (8 == a.nodeType)b.push("\x3c!--" + a.nodeValue + "--\x3e"); else if (1 == a.nodeType) {
        b.push("<" + tn_Na(a));
        for (var d = 0; d < a.attributes.length; ++d) {
            var e = a.attributes[d];
            e && e.nodeName && e.nodeValue && b.push(" " + tn_Na(e) + '="' + tn_Ma(e.nodeValue).replace(/\"/g, "&quot;") + '"')
        }
        if (0 == a.childNodes.length)b.push("/>"); else {
            b.push(">");
            for (d = 0; d < a.childNodes.length; ++d)arguments.callee(a.childNodes[d],
                b, c);
            b.push("</" + tn_Na(a) + ">")
        }
    } else if (9 == a.nodeType || 11 == a.nodeType)for (d = 0; d < a.childNodes.length; ++d)arguments.callee(a.childNodes[d], b, c)
}
function tn_Na(a) {
    return a.prefix && 0 != a.nodeName.indexOf(a.prefix + ":") ? a.prefix + ":" + a.nodeName : a.nodeName
}
function tn_Ma(a) {
    return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}
function tn_e(a) {
    if ("undefined" != typeof Error)throw Error(a || "Assertion Failed");
    throw a;
};
function tn_Oa(a) {
    a = tn_f(a, "&");
    for (var b = a[0], c = 1; c < a.length; ++c) {
        var d = a[c].indexOf(";");
        if (-1 == d)b += a[c]; else {
            var e = a[c].substring(0, d), d = a[c].substring(d + 1);
            switch (e) {
                case "lt":
                    e = "<";
                    break;
                case "gt":
                    e = ">";
                    break;
                case "amp":
                    e = "&";
                    break;
                case "quot":
                    e = '"';
                    break;
                case "apos":
                    e = "'";
                    break;
                case "nbsp":
                    e = String.fromCharCode(160);
                    break;
                default:
                    var f = window.document.createElement("span");
                    f.innerHTML = "&" + e + "; ";
                    e = f.childNodes[0].nodeValue.charAt(0)
            }
            b += e + d
        }
    }
    return b
}
var tn_Pa = new RegExp("^(" + tn_qa + ")"), tn_Qa = new RegExp(tn_ua, "g"), tn_Ra = new RegExp("^(" + tn_xa + ")"), tn_Sa = new RegExp(tn_Ba, "g");
function tn_Ta(a) {
    var b = /\/$/, c, d;
    a.match(/^<\?xml/) ? 5 == a.search(/[ \t\r\n]+version([ \t\r\n]+)?=([ \t\r\n]+)?("1\.0"|'1\.0')/) ? (c = tn_Pa, d = tn_Qa) : 5 == a.search(/[ \t\r\n]+version([ \t\r\n]+)?=([ \t\r\n]+)?("1\.1"|'1\.1')/) ? (c = tn_Ra, d = tn_Sa) : alert("VersionInfo is missing, or unknown version number.") : (c = tn_Pa, d = tn_Qa);
    var e = new tn_h, f = e, h = [], l = f;
    h.push(l);
    var n = "";
    a = tn_f(a, "<");
    for (var m = 1; m < a.length; ++m) {
        var g = tn_f(a[m], ">"), k = g[0], g = tn_Oa(g[1] || "");
        if (n)if (k = a[m].indexOf(n), -1 != k) {
            var q = a[m].substring(0,
                k);
            l.nodeValue += "<" + q;
            h.pop();
            l = h[h.length - 1];
            g = a[m].substring(k + n.length);
            n = ""
        } else l.nodeValue += "<" + a[m], g = null; else if (0 == k.indexOf("![CDATA["))if (q = 8, k = a[m].indexOf("]]\x3e"), -1 != k) {
            var q = a[m].substring(q, k), p = e.createCDATASection(q);
            l.appendChild(p)
        } else q = a[m].substring(q), g = null, p = e.createCDATASection(q), l.appendChild(p), l = p, h.push(p), n = "]]\x3e"; else if (0 == k.indexOf("!--"))q = 3, k = a[m].indexOf("--\x3e"), -1 != k ? (q = a[m].substring(q, k), p = e.createComment(q), l.appendChild(p)) : (q = a[m].substring(q),
            g = null, p = e.createComment(q), l.appendChild(p), l = p, h.push(p), n = "--\x3e"); else if ("/" == k.charAt(0))h.pop(), l = h[h.length - 1]; else if ("?" != k.charAt(0) && "!" != k.charAt(0)) {
            for (var q = k.match(b), p = c.exec(k)[1], p = e.createElement(p), t; t = d.exec(k);) {
                var r = tn_Oa(t[5] || t[7] || "");
                p.setAttribute(t[1], r)
            }
            l.appendChild(p);
            q || (l = p, h.push(p))
        }
        g && l != f && (g = e.createTextNode(g), l.appendChild(g))
    }
    return f
}
function tn_Ua(a, b, c) {
    var d;
    if (b && (d = b.call(null, a), "boolean" == typeof d && !d))return !1;
    for (var e = a.firstChild; e; e = e.nextSibling)if (1 == e.nodeType && (d = arguments.callee.call(this, e, b, c), "boolean" == typeof d && !d))return !1;
    if (c && (d = c.call(null, a), "boolean" == typeof d && !d))return !1
}
function tn_i(a, b, c, d) {
    this.attributes = [];
    this.childNodes = [];
    tn_i.init.call(this, a, b, c, d)
}
tn_i.init = function (a, b, c, d) {
    this.nodeType = a - 0;
    this.nodeName = "" + b;
    this.nodeValue = "" + c;
    this.ownerDocument = d;
    this.parentNode = this.previousSibling = this.nextSibling = this.lastChild = this.firstChild = null
};
tn_i.unused_ = [];
tn_i.recycle = function (a) {
    if (a)if (a.constructor == tn_h)tn_i.recycle(a.documentElement); else if (a.constructor == this) {
        tn_i.unused_.push(a);
        for (var b = 0; b < a.attributes.length; ++b)tn_i.recycle(a.attributes[b]);
        for (b = 0; b < a.childNodes.length; ++b)tn_i.recycle(a.childNodes[b]);
        a.attributes.length = 0;
        a.childNodes.length = 0;
        tn_i.init.call(a, 0, "", "", null)
    }
};
tn_i.create = function (a, b, c, d) {
    if (0 < tn_i.unused_.length) {
        var e = tn_i.unused_.pop();
        tn_i.init.call(e, a, b, c, d);
        return e
    }
    return new tn_i(a, b, c, d)
};
tn_ = tn_i.prototype;
tn_.appendChild = function (a) {
    0 == this.childNodes.length && (this.firstChild = a);
    a.previousSibling = this.lastChild;
    a.nextSibling = null;
    this.lastChild && (this.lastChild.nextSibling = a);
    a.parentNode = this;
    this.lastChild = a;
    this.childNodes.push(a)
};
tn_.replaceChild = function (a, b) {
    if (b != a)for (var c = 0; c < this.childNodes.length; ++c)if (this.childNodes[c] == b) {
        this.childNodes[c] = a;
        c = b.parentNode;
        b.parentNode = null;
        a.parentNode = c;
        c = b.previousSibling;
        b.previousSibling = null;
        a.previousSibling = c;
        a.previousSibling && (a.previousSibling.nextSibling = a);
        c = b.nextSibling;
        b.nextSibling = null;
        a.nextSibling = c;
        a.nextSibling && (a.nextSibling.previousSibling = a);
        this.firstChild == b && (this.firstChild = a);
        this.lastChild == b && (this.lastChild = a);
        break
    }
};
tn_.insertBefore = function (a, b) {
    if (b != a && b.parentNode == this) {
        a.parentNode && a.parentNode.removeChild(a);
        for (var c = [], d = 0; d < this.childNodes.length; ++d) {
            var e = this.childNodes[d];
            e == b && (c.push(a), a.parentNode = this, a.previousSibling = b.previousSibling, b.previousSibling = a, a.previousSibling && (a.previousSibling.nextSibling = a), a.nextSibling = b, this.firstChild == b && (this.firstChild = a));
            c.push(e)
        }
        this.childNodes = c
    }
};
tn_.removeChild = function (a) {
    for (var b = [], c = 0; c < this.childNodes.length; ++c) {
        var d = this.childNodes[c];
        d != a ? b.push(d) : (d.previousSibling && (d.previousSibling.nextSibling = d.nextSibling), d.nextSibling && (d.nextSibling.previousSibling = d.previousSibling), this.firstChild == d && (this.firstChild = d.nextSibling), this.lastChild == d && (this.lastChild = d.previousSibling))
    }
    this.childNodes = b
};
tn_.hasAttributes = function () {
    return 0 < this.attributes.length
};
tn_.setAttribute = function (a, b) {
    for (var c = 0; c < this.attributes.length; ++c)if (this.attributes[c].nodeName == a) {
        this.attributes[c].nodeValue = "" + b;
        return
    }
    this.attributes.push(tn_i.create(2, a, b, this))
};
tn_.getAttribute = function (a) {
    for (var b = 0; b < this.attributes.length; ++b)if (this.attributes[b].nodeName == a)return this.attributes[b].nodeValue;
    return null
};
tn_.removeAttribute = function (a) {
    for (var b = [], c = 0; c < this.attributes.length; ++c)this.attributes[c].nodeName != a && b.push(this.attributes[c]);
    this.attributes = b
};
tn_.getElementsByTagName = function (a) {
    var b = [];
    tn_Ua(this, function (c) {
        c.nodeName == a && b.push(c)
    }, null);
    return b
};
tn_.getElementById = function (a) {
    var b = null;
    tn_Ua(this, function (c) {
        if (c.getAttribute("id") == a)return b = c, !1
    }, null);
    return b
};
function tn_h() {
    tn_i.call(this, 9, "#document", null, null);
    this.documentElement = null
}
tn_h.prototype = new tn_i(9, "#document");
tn_ = tn_h.prototype;
tn_.clear = function () {
    tn_i.recycle(this.documentElement);
    this.documentElement = null
};
tn_.appendChild = function (a) {
    tn_i.prototype.appendChild.call(this, a);
    this.documentElement = this.childNodes[0]
};
tn_.createElement = function (a) {
    return tn_i.create(1, a, null, this)
};
tn_.createDocumentFragment = function () {
    return tn_i.create(11, "#document-fragment", null, this)
};
tn_.createTextNode = function (a) {
    return tn_i.create(3, "#text", a, this)
};
tn_.createAttribute = function (a) {
    return tn_i.create(2, a, null, this)
};
tn_.createComment = function (a) {
    return tn_i.create(8, "#comment", a, this)
};
tn_.createCDATASection = function (a) {
    return tn_i.create(4, "#cdata-section", a, this)
};
function tn_Va(a, b) {
    tn_Wa(new tn_Xa(a, b), b)
}
function tn_Wa(a, b) {
    var c = b.getAttribute("select");
    if (c) {
        b.removeAttribute("select");
        var d = a, e = b, f = c.split(/;/), h = tn_Ya(f[0], d).nodeSetValue();
        if (0 < h.length) {
            for (var c = [], l = 1; l < h.length; ++l) {
                var n = tn_Ea(e.ownerDocument, e);
                c.push(n);
                e.parentNode.insertBefore(n, e)
            }
            c.push(e);
            e = [];
            for (l = 1; l < f.length; ++l) {
                var m = f[l], g = 0;
                "#" == m.charAt(g) ? (n = "number", g++) : n = "text";
                "-" == m.charAt(g) ? (m = "descending", g++) : m = "ascending";
                g = tn_Za(f[l].substr(g));
                e.push({expr: g, type: n, order: m})
            }
            d = d.clone(h[0], 0, h);
            tn__a(d, e);
            for (l =
                     0; l < d.contextSize(); ++l)1 == d.nodelist[l].nodeType && tn_Wa(d.clone(d.nodelist[l], l), c[l])
        } else e.parentNode.removeChild(e)
    } else {
        if (d = b.getAttribute("display"))if (tn_Ya(d, a).booleanValue())b.removeAttribute("display"); else {
            b.parentNode.removeChild(b);
            return
        }
        if (f = b.getAttribute("values"))for (b.removeAttribute("values"), d = a, c = b, f = f.split(/;/), h = 0; h < f.length; ++h)l = f[h].indexOf(":"), 0 > l || (e = f[h].substr(0, l), l = tn_Ya(f[h].substr(l + 1), d), "$" == e.charAt(0) ? d.setVariable(e.substr(1), l) : e && (l = l.stringValue(), c.setAttribute(e,
            l)));
        if (c = b.getAttribute("transclude"))d = b.ownerDocument, d = (c = d.getElementById(c)) ? tn_Ea(d, c) : null, d ? (b.parentNode.replaceChild(d, b), tn_Wa(a, d)) : b.parentNode.removeChild(b), tn_i.recycle(b); else if (f = b.getAttribute("content")) {
            b.removeAttribute("content");
            c = a;
            for (d = b; d.firstChild;)d.removeChild(d.firstChild);
            c = tn_Ya(f, c);
            if ("node-set" == c.type)for (f = 0; f < c.value.length; ++f)if (h = c.value[f], 1 == h.nodeType)for (h = h.firstChild; h; h = h.nextSibling)e = tn_Ea(d.ownerDocument, h), d.appendChild(e); else 2 == h.nodeType &&
            (h = d.ownerDocument.createTextNode(h.nodeValue), d.appendChild(h)); else c = c.stringValue(), h = d.ownerDocument.createTextNode(c), d.appendChild(h)
        } else {
            d = [];
            for (c = 0; c < b.childNodes.length; ++c)1 == b.childNodes[c].nodeType && d.push(b.childNodes[c]);
            for (c = 0; c < d.length; ++c)tn_Wa(a, d[c])
        }
    }
}
function tn_Ya(a, b) {
    var c = tn_Za(a);
    return c = c.evaluate(b)
};
function tn_Za(a) {
    tn_0a();
    var b = tn_1a[a];
    if (b)return b;
    if (a.match(/^(\$|@)?\w+$/i))return b = tn_2a(a), tn_1a[a] = b;
    if (a.match(/^\w+(\/\w+)*$/i)) {
        for (var b = tn_f(a, "/"), c = new tn_j, d = 0; d < b.length; ++d) {
            var e = new tn_3a(b[d]), e = new tn_k("child", e);
            c.appendStep(e)
        }
        b = c;
        return tn_1a[a] = b
    }
    for (var b = a, c = [], e = d = null, f = !1, h = 0, l = 0, n = 0; !f;) {
        h++;
        a = a.replace(/^\s*/, "");
        for (var e = d, m = d = null, g = "", k = 0; k < tn_4a.length; ++k) {
            var q = tn_4a[k].re.exec(a);
            l++;
            if (q && 0 < q.length && q[0].length > g.length) {
                m = tn_4a[k];
                g = q[0];
                break
            }
        }
        !m ||
        m != tn_5a && m != tn_6a && m != tn_7a && m != tn_8a || e && e.tag != tn_9a && e.tag != tn_l && e.tag != tn_m && e.tag != tn_$a && e.tag != tn_ab || (m = tn_n);
        m ? (a = a.substr(g.length), d = {tag: m, match: g, prec: m.prec ? m.prec : 0, expr: new tn_bb(g)}) : f = !0;
        for (; tn_cb(c, d);)n++
    }
    if (1 != c.length) {
        a = "";
        for (d = 0; d < c.length; ++d)a && (a += "\n"), a += c[d].tag.label;
        tn_e("XPath parse error " + b + ":\n" + a)
    }
    q = c[0].expr;
    return tn_1a[b] = q
}
var tn_1a = {};
function tn_cb(a, b) {
    var c = null;
    if (0 < a.length) {
        var d = a[a.length - 1];
        if (d = tn_o[d.tag.key])for (var e = 0; e < d.length; ++e) {
            var f = d[e], h = tn_db(a, f[1]);
            if (h.length) {
                c = {tag: f[0], rule: f, match: h};
                c.prec = tn_eb(c);
                break
            }
        }
    }
    if (c && (!b || c.prec > b.prec || b.tag.left && c.prec >= b.prec)) {
        for (e = 0; e < c.match.matchlength; ++e)a.pop();
        d = tn_Ha(c.match, function (a) {
            return a.expr
        });
        c.expr = c.rule[3].apply(null, d);
        a.push(c);
        c = !0
    } else b && a.push(b), c = !1;
    return c
}
function tn_db(a, b) {
    for (var c = a.length, d = b.length, e = [], f = e.matchlength = 0, d = d - 1, c = c - 1; 0 <= d && 0 <= c; --d, c -= f) {
        var f = 0, h = [];
        if (b[d] == tn_fb)for (--d, e.push(h); 0 <= c - f && a[c - f].tag == b[d];)h.push(a[c - f]), f += 1, e.matchlength += 1; else if (b[d] == tn_gb)for (--d, e.push(h); 0 <= c - f && 2 > f && a[c - f].tag == b[d];)h.push(a[c - f]), f += 1, e.matchlength += 1; else if (b[d] == tn_hb)if (--d, e.push(h), a[c].tag == b[d])for (; 0 <= c - f && a[c - f].tag == b[d];)h.push(a[c - f]), f += 1, e.matchlength += 1; else return []; else if (a[c].tag == b[d])e.push(a[c]), f += 1, e.matchlength +=
            1; else return [];
        tn_Ia(h);
        h.expr = tn_Ha(h, function (a) {
            return a.expr
        })
    }
    tn_Ia(e);
    return -1 == d ? e : []
}
function tn_eb(a) {
    var b = 0;
    if (a.rule)if (3 <= a.rule.length && 0 <= a.rule[2])b = a.rule[2]; else for (var c = 0; c < a.rule[1].length; ++c)var d = a.rule[1][c].prec || 2, b = Math.max(b, d); else if (a.tag)b = a.tag.prec || 2; else if (a.length)for (c = 0; c < a.length; ++c)d = tn_eb(a[c]), b = Math.max(b, d);
    return b
}
function tn_Xa(a, b, c, d, e) {
    this.node = a;
    this.stylesheet = b || null;
    this.position = c || 0;
    this.nodelist = d || [a];
    this.variables = {};
    this.parent = e || null;
    this.root = e ? e.root : 9 == this.node.nodeType ? a : a.ownerDocument
}
tn_ = tn_Xa.prototype;
tn_.clone = function (a, b, c) {
    return new tn_Xa(a || this.node, this.stylesheet, "undefined" != typeof b ? b : this.position, c || this.nodelist, this)
};
tn_.setVariable = function (a, b) {
    this.variables[a] = b
};
tn_.getVariable = function (a) {
    return "undefined" != typeof this.variables[a] ? this.variables[a] : this.parent ? this.parent.getVariable(a) : null
};
tn_.setNode = function (a) {
    this.node = this.nodelist[a];
    this.position = a
};
tn_.contextSize = function () {
    return this.nodelist.length
};
function tn_p(a) {
    this.value = a;
    this.type = "string"
}
tn_p.prototype.stringValue = function () {
    return this.value
};
tn_p.prototype.booleanValue = function () {
    return 0 < this.value.length
};
tn_p.prototype.numberValue = function () {
    return this.value - 0
};
tn_p.prototype.nodeSetValue = function () {
    tn_e(this)
};
function tn_q(a) {
    this.value = a;
    this.type = "boolean"
}
tn_q.prototype.stringValue = function () {
    return "" + this.value
};
tn_q.prototype.booleanValue = function () {
    return this.value
};
tn_q.prototype.numberValue = function () {
    return this.value ? 1 : 0
};
tn_q.prototype.nodeSetValue = function () {
    tn_e(this)
};
function tn_r(a) {
    this.value = a;
    this.type = "number"
}
tn_r.prototype.stringValue = function () {
    return "" + this.value
};
tn_r.prototype.booleanValue = function () {
    return !!this.value
};
tn_r.prototype.numberValue = function () {
    return this.value - 0
};
tn_r.prototype.nodeSetValue = function () {
    tn_e(this)
};
function tn_s(a) {
    this.value = a;
    this.type = "node-set"
}
tn_s.prototype.stringValue = function () {
    return 0 == this.value.length ? "" : tn_g(this.value[0])
};
tn_s.prototype.booleanValue = function () {
    return 0 < this.value.length
};
tn_s.prototype.numberValue = function () {
    return this.stringValue() - 0
};
tn_s.prototype.nodeSetValue = function () {
    return this.value
};
function tn_bb(a) {
    this.value = a
}
tn_bb.prototype.evaluate = function () {
    return new tn_p(this.value)
};
function tn_j() {
    this.absolute = !1;
    this.rootExpr = null;
    this.steps = []
}
tn_j.prototype.appendStep = function (a) {
    this.steps.push(a)
};
tn_j.prototype.prependStep = function (a) {
    this.steps.unshift(a)
};
tn_j.prototype.evaluate = function (a) {
    var b;
    b = this.rootExpr ? this.rootExpr.evaluate(a).nodeSetValue() : this.absolute ? [a.root] : [a.node];
    for (var c = [], d = 0; d < b.length; ++d) {
        var e = b[d];
        tn_ib(c, this.steps, 0, e, a)
    }
    return new tn_s(c)
};
function tn_ib(a, b, c, d, e) {
    var f = b[c];
    d = e.clone(d);
    f = f.evaluate(d).nodeSetValue();
    for (d = 0; d < f.length; ++d)c == b.length - 1 ? a.push(f[d]) : tn_ib(a, b, c + 1, f[d], e)
}
function tn_k(a, b, c) {
    this.axis = a;
    this.nodetest = b;
    this.predicate = c || []
}
tn_k.prototype.appendPredicate = function (a) {
    this.predicate.push(a)
};
tn_k.prototype.evaluate = function (a) {
    var b = a.node, c = [];
    if (this.axis == tn_t.ANCESTOR_OR_SELF)for (c.push(b), b = b.parentNode; b; b = b.parentNode)c.push(b); else if (this.axis == tn_t.ANCESTOR)for (b = b.parentNode; b; b = b.parentNode)c.push(b); else if (this.axis == tn_t.ATTRIBUTE)tn_Ja(c, b.attributes); else if (this.axis == tn_t.CHILD)tn_Ja(c, b.childNodes); else if (this.axis == tn_t.DESCENDANT_OR_SELF)c.push(b), tn_jb(c, b); else if (this.axis == tn_t.DESCENDANT)tn_jb(c, b); else if (this.axis == tn_t.FOLLOWING)for (; b; b = b.parentNode)for (var d =
        b.nextSibling; d; d = d.nextSibling)c.push(d), tn_jb(c, d); else if (this.axis == tn_t.FOLLOWING_SIBLING)for (b = b.nextSibling; b; b = b.nextSibling)c.push(b); else if (this.axis == tn_t.NAMESPACE)tn_e("not implemented: axis namespace"); else if (this.axis == tn_t.PARENT)b.parentNode && c.push(b.parentNode); else if (this.axis == tn_t.PRECEDING)for (; b; b = b.parentNode)for (d = b.previousSibling; d; d = d.previousSibling)c.push(d), tn_kb(c, d); else if (this.axis == tn_t.PRECEDING_SIBLING)for (b = b.previousSibling; b; b = b.previousSibling)c.push(b);
    else this.axis == tn_t.SELF ? c.push(b) : tn_e("ERROR -- NO SUCH AXIS: " + this.axis);
    for (var d = c, c = [], e = 0; e < d.length; ++e)b = d[e], this.nodetest.evaluate(a.clone(b, e, d)).booleanValue() && c.push(b);
    for (e = 0; e < this.predicate.length; ++e)for (var d = c, c = [], f = 0; f < d.length; ++f)b = d[f], this.predicate[e].evaluate(a.clone(b, f, d)).booleanValue() && c.push(b);
    return new tn_s(c)
};
function tn_lb() {
    this.value = new tn_q(!0)
}
tn_lb.prototype.evaluate = function () {
    return this.value
};
function tn_mb() {
}
tn_mb.prototype.evaluate = function (a) {
    return new tn_q(1 == a.node.nodeType || 2 == a.node.nodeType)
};
function tn_nb() {
}
tn_nb.prototype.evaluate = function (a) {
    return new tn_q(3 == a.node.nodeType)
};
function tn_ob() {
}
tn_ob.prototype.evaluate = function (a) {
    return new tn_q(8 == a.node.nodeType)
};
function tn_pb(a) {
    this.target = a
}
tn_pb.prototype.evaluate = function (a) {
    return new tn_q(7 == a.node.nodeType && (!this.target || a.node.nodeName == this.target))
};
function tn_qb(a) {
    this.regex = new RegExp("^" + a + ":")
}
tn_qb.prototype.evaluate = function (a) {
    a = a.node;
    return new tn_q(this.regex.test(a.nodeName))
};
function tn_3a(a) {
    this.name = a
}
tn_3a.prototype.evaluate = function (a) {
    a = a.node;
    return new tn_q(a.nodeName == this.name)
};
function tn_rb(a) {
    this.expr = a
}
tn_rb.prototype.evaluate = function (a) {
    var b = this.expr.evaluate(a);
    return "number" == b.type ? new tn_q(a.position == b.numberValue() - 1) : new tn_q(b.booleanValue())
};
function tn_sb(a) {
    this.name = a;
    this.args = []
}
tn_sb.prototype.appendArg = function (a) {
    this.args.push(a)
};
tn_sb.prototype.evaluate = function (a) {
    var b = "" + this.name.value;
    return (b = this.xpathfunctions[b]) ? b.call(this, a) : new tn_q(!1)
};
tn_sb.prototype.xpathfunctions = {
    last: function (a) {
        tn_d(0 == this.args.length);
        return new tn_r(a.contextSize())
    }, position: function (a) {
        tn_d(0 == this.args.length);
        return new tn_r(a.position + 1)
    }, count: function (a) {
        tn_d(1 == this.args.length);
        a = this.args[0].evaluate(a);
        return new tn_r(a.nodeSetValue().length)
    }, id: function (a) {
        tn_d(1 == this.args.length);
        var b = this.args[0].evaluate(a), c = [], d;
        if ("node-set" == b.type) {
            d = [];
            for (var e = b.nodeSetValue(), b = 0; b < e.length; ++b)for (var f = tn_g(e[b]).split(/\s+/), h = 0; h < f.length; ++h)d.push(f[h])
        } else d =
            b.stringValue().split(/\s+/);
        a = a.node.ownerDocument;
        for (b = 0; b < d.length; ++b)(e = a.getElementById(d[b])) && c.push(e);
        return new tn_s(c)
    }, "local-name": function () {
        tn_e("not implmented yet: XPath function local-name()")
    }, "namespace-uri": function () {
        tn_e("not implmented yet: XPath function namespace-uri()")
    }, name: function (a) {
        tn_d(1 == this.args.length || 0 == this.args.length);
        a = 0 == this.args.length ? [a.node] : this.args[0].evaluate(a).nodeSetValue();
        return 0 == a.length ? new tn_p("") : new tn_p(a[0].nodeName)
    }, string: function (a) {
        tn_d(1 ==
        this.args.length || 0 == this.args.length);
        return 0 == this.args.length ? new tn_p((new tn_s([a.node])).stringValue()) : new tn_p(this.args[0].evaluate(a).stringValue())
    }, concat: function (a) {
        for (var b = "", c = 0; c < this.args.length; ++c)b += this.args[c].evaluate(a).stringValue();
        return new tn_p(b)
    }, document: function (a) {
        var b = this.args[0].evaluate(a).stringValue();
        if ("" === b && a.stylesheet)return new tn_s([a.stylesheet]);
        tn_e("Can't resolve uri in document(\"" + b + '")')
    }, "starts-with": function (a) {
        tn_d(2 == this.args.length);
        var b = this.args[0].evaluate(a).stringValue();
        a = this.args[1].evaluate(a).stringValue();
        return new tn_q(0 == b.indexOf(a))
    }, contains: function (a) {
        tn_d(2 == this.args.length);
        var b = this.args[0].evaluate(a).stringValue();
        a = this.args[1].evaluate(a).stringValue();
        return new tn_q(-1 != b.indexOf(a))
    }, "substring-before": function (a) {
        tn_d(2 == this.args.length);
        var b = this.args[0].evaluate(a).stringValue();
        a = this.args[1].evaluate(a).stringValue();
        a = b.indexOf(a);
        b = -1 == a ? "" : b.substr(0, a);
        return new tn_p(b)
    }, "substring-after": function (a) {
        tn_d(2 ==
        this.args.length);
        var b = this.args[0].evaluate(a).stringValue();
        a = this.args[1].evaluate(a).stringValue();
        var c = b.indexOf(a), b = -1 == c ? "" : b.substr(c + a.length);
        return new tn_p(b)
    }, substring: function (a) {
        tn_d(2 == this.args.length || 3 == this.args.length);
        var b = this.args[0].evaluate(a).stringValue(), c = this.args[1].evaluate(a).numberValue();
        if (2 == this.args.length)c = Math.max(0, Math.round(c) - 1), b = b.substr(c); else {
            a = this.args[2].evaluate(a).numberValue();
            var d = Math.round(c) - 1, c = Math.max(0, d);
            a = Math.round(a) - Math.max(0,
                -d);
            b = b.substr(c, a)
        }
        return new tn_p(b)
    }, "string-length": function (a) {
        a = 0 < this.args.length ? this.args[0].evaluate(a).stringValue() : (new tn_s([a.node])).stringValue();
        return new tn_r(a.length)
    }, "normalize-space": function (a) {
        a = 0 < this.args.length ? this.args[0].evaluate(a).stringValue() : (new tn_s([a.node])).stringValue();
        a = a.replace(/^\s*/, "").replace(/\s*$/, "").replace(/\s+/g, " ");
        return new tn_p(a)
    }, translate: function (a) {
        tn_d(3 == this.args.length);
        var b = this.args[0].evaluate(a).stringValue(), c = this.args[1].evaluate(a).stringValue();
        a = this.args[2].evaluate(a).stringValue();
        for (var d = 0; d < c.length; ++d)b = b.replace(new RegExp(c.charAt(d), "g"), a.charAt(d));
        return new tn_p(b)
    }, "boolean": function (a) {
        tn_d(1 == this.args.length);
        return new tn_q(this.args[0].evaluate(a).booleanValue())
    }, not: function (a) {
        tn_d(1 == this.args.length);
        a = !this.args[0].evaluate(a).booleanValue();
        return new tn_q(a)
    }, "true": function () {
        tn_d(0 == this.args.length);
        return new tn_q(!0)
    }, "false": function () {
        tn_d(0 == this.args.length);
        return new tn_q(!1)
    }, lang: function (a) {
        tn_d(1 ==
        this.args.length);
        var b = this.args[0].evaluate(a).stringValue(), c;
        for (a = a.node; a && a != a.parentNode && !(c = a.getAttribute("xml:lang"));)a = a.parentNode;
        return c ? (b = new RegExp("^" + b + "$", "i"), new tn_q(b.test(c) || b.test(c.replace(/_.*$/, "")))) : new tn_q(!1)
    }, number: function (a) {
        tn_d(1 == this.args.length || 0 == this.args.length);
        return 1 == this.args.length ? new tn_r(this.args[0].evaluate(a).numberValue()) : new tn_r((new tn_s([a.node])).numberValue())
    }, sum: function (a) {
        tn_d(1 == this.args.length);
        a = this.args[0].evaluate(a).nodeSetValue();
        for (var b = 0, c = 0; c < a.length; ++c)b += tn_g(a[c]) - 0;
        return new tn_r(b)
    }, floor: function (a) {
        tn_d(1 == this.args.length);
        a = this.args[0].evaluate(a).numberValue();
        return new tn_r(Math.floor(a))
    }, ceiling: function (a) {
        tn_d(1 == this.args.length);
        a = this.args[0].evaluate(a).numberValue();
        return new tn_r(Math.ceil(a))
    }, round: function (a) {
        tn_d(1 == this.args.length);
        a = this.args[0].evaluate(a).numberValue();
        return new tn_r(Math.round(a))
    }, "ext-join": function (a) {
        tn_d(2 == this.args.length);
        var b = this.args[0].evaluate(a).nodeSetValue();
        a = this.args[1].evaluate(a).stringValue();
        for (var c = "", d = 0; d < b.length; ++d)c && (c += a), c += tn_g(b[d]);
        return new tn_p(c)
    }, "ext-if": function (a) {
        tn_d(3 == this.args.length);
        return this.args[0].evaluate(a).booleanValue() ? this.args[1].evaluate(a) : this.args[2].evaluate(a)
    }, "ext-cardinal": function (a) {
        tn_d(1 <= this.args.length);
        for (var b = this.args[0].evaluate(a).numberValue(), c = [], d = 0; d < b; ++d)c.push(a.node);
        return new tn_s(c)
    }
};
function tn_tb(a, b) {
    this.expr1 = a;
    this.expr2 = b
}
tn_tb.prototype.evaluate = function (a) {
    var b = this.expr1.evaluate(a).nodeSetValue();
    a = this.expr2.evaluate(a).nodeSetValue();
    for (var c = b.length, d = 0; d < a.length; ++d) {
        for (var e = a[d], f = !1, h = 0; h < c; ++h)b[h] == e && (f = !0, h = c);
        f || b.push(e)
    }
    return new tn_s(b)
};
function tn_ub(a, b) {
    this.filter = a;
    this.rel = b
}
tn_ub.prototype.evaluate = function (a) {
    for (var b = this.filter.evaluate(a).nodeSetValue(), c = [], d = 0; d < b.length; ++d)for (var e = this.rel.evaluate(a.clone(b[d], d, b)).nodeSetValue(), f = 0; f < e.length; ++f)c.push(e[f]);
    return new tn_s(c)
};
function tn_vb(a, b) {
    this.expr = a;
    this.predicate = b
}
tn_vb.prototype.evaluate = function (a) {
    for (var b = this.expr.evaluate(a).nodeSetValue(), c = 0; c < this.predicate.length; ++c)for (var d = b, b = [], e = 0; e < d.length; ++e) {
        var f = d[e];
        this.predicate[c].evaluate(a.clone(f, e, d)).booleanValue() && b.push(f)
    }
    return new tn_s(b)
};
function tn_wb(a) {
    this.expr = a
}
tn_wb.prototype.evaluate = function (a) {
    return new tn_r(-this.expr.evaluate(a).numberValue())
};
function tn_xb(a, b, c) {
    this.expr1 = a;
    this.expr2 = c;
    this.op = b
}
tn_xb.prototype.evaluate = function (a) {
    var b;
    switch (this.op.value) {
        case "or":
            b = new tn_q(this.expr1.evaluate(a).booleanValue() || this.expr2.evaluate(a).booleanValue());
            break;
        case "and":
            b = new tn_q(this.expr1.evaluate(a).booleanValue() && this.expr2.evaluate(a).booleanValue());
            break;
        case "+":
            b = new tn_r(this.expr1.evaluate(a).numberValue() + this.expr2.evaluate(a).numberValue());
            break;
        case "-":
            b = new tn_r(this.expr1.evaluate(a).numberValue() - this.expr2.evaluate(a).numberValue());
            break;
        case "*":
            b = new tn_r(this.expr1.evaluate(a).numberValue() *
            this.expr2.evaluate(a).numberValue());
            break;
        case "mod":
            b = new tn_r(this.expr1.evaluate(a).numberValue() % this.expr2.evaluate(a).numberValue());
            break;
        case "div":
            b = new tn_r(this.expr1.evaluate(a).numberValue() / this.expr2.evaluate(a).numberValue());
            break;
        case "=":
            b = this.compare(a, function (a, b) {
                return a == b
            });
            break;
        case "!=":
            b = this.compare(a, function (a, b) {
                return a != b
            });
            break;
        case "<":
            b = this.compare(a, function (a, b) {
                return a < b
            });
            break;
        case "<=":
            b = this.compare(a, function (a, b) {
                return a <= b
            });
            break;
        case ">":
            b =
                this.compare(a, function (a, b) {
                    return a > b
                });
            break;
        case ">=":
            b = this.compare(a, function (a, b) {
                return a >= b
            });
            break;
        default:
            tn_e("BinaryExpr.evaluate: " + this.op.value)
    }
    return b
};
tn_xb.prototype.compare = function (a, b) {
    var c = this.expr1.evaluate(a), d = this.expr2.evaluate(a);
    if ("node-set" == c.type && "node-set" == d.type)for (var c = c.nodeSetValue(), e = d.nodeSetValue(), d = !1, f = 0; f < c.length; ++f)for (var h = 0; h < e.length; ++h)b(tn_g(c[f]), tn_g(e[h])) && (d = !0, h = e.length, f = c.length); else if ("node-set" == c.type || "node-set" == d.type)if ("number" == c.type)for (c = c.numberValue(), e = d.nodeSetValue(), d = !1, f = 0; f < e.length; ++f) {
        if (h = tn_g(e[f]) - 0, b(c, h)) {
            d = !0;
            break
        }
    } else if ("number" == d.type)for (e = c.nodeSetValue(),
                                           c = d.numberValue(), d = !1, f = 0; f < e.length; ++f) {
        if (h = tn_g(e[f]) - 0, b(h, c)) {
            d = !0;
            break
        }
    } else if ("string" == c.type)for (c = c.stringValue(), e = d.nodeSetValue(), d = !1, f = 0; f < e.length; ++f) {
        if (h = tn_g(e[f]), b(c, h)) {
            d = !0;
            break
        }
    } else if ("string" == d.type)for (e = c.nodeSetValue(), c = d.stringValue(), d = !1, f = 0; f < e.length; ++f) {
        if (h = tn_g(e[f]), b(h, c)) {
            d = !0;
            break
        }
    } else d = b(c.booleanValue(), d.booleanValue()); else d = "boolean" == c.type || "boolean" == d.type ? b(c.booleanValue(), d.booleanValue()) : "number" == c.type || "number" == d.type ? b(c.numberValue(),
        d.numberValue()) : b(c.stringValue(), d.stringValue());
    return new tn_q(!!d)
};
function tn_yb(a) {
    this.value = a
}
tn_yb.prototype.evaluate = function () {
    return new tn_p(this.value)
};
function tn_zb(a) {
    this.value = a
}
tn_zb.prototype.evaluate = function () {
    return new tn_r(this.value)
};
function tn_Ab(a) {
    this.name = a
}
tn_Ab.prototype.evaluate = function (a) {
    return a.getVariable(this.name)
};
function tn_u(a) {
    return a
}
function tn_Bb(a, b) {
    b.absolute = !0;
    return b
}
function tn_Cb(a, b) {
    b.absolute = !0;
    b.prependStep(tn_v(a.value));
    return b
}
function tn_Db() {
    var a = new tn_j;
    a.appendStep(tn_v("."));
    a.absolute = !0;
    return a
}
function tn_Eb(a) {
    var b = new tn_j;
    b.absolute = !0;
    b.appendStep(tn_v(a.value));
    return b
}
function tn_Fb(a) {
    var b = new tn_j;
    b.appendStep(a);
    return b
}
function tn_Gb(a, b, c) {
    a.appendStep(c);
    return a
}
function tn_Hb(a, b) {
    a.appendStep(tn_v(b.value));
    return a
}
function tn_Ib(a, b, c) {
    b = new tn_j;
    b.rootExpr = a;
    b.appendStep(c);
    return b
}
function tn_Jb(a) {
    return tn_v(a.value)
}
function tn_Kb(a) {
    return tn_v(a.value)
}
function tn_Lb(a, b, c) {
    return new tn_k(a.value, c)
}
function tn_Mb(a, b) {
    return new tn_k("attribute", b)
}
function tn_Nb(a) {
    return new tn_k("child", a)
}
function tn_Ob(a, b) {
    a.appendPredicate(b);
    return a
}
function tn_v(a) {
    switch (a) {
        case "//":
            return new tn_k("descendant-or-self", new tn_lb);
        case ".":
            return new tn_k("self", new tn_lb);
        case "..":
            return new tn_k("parent", new tn_lb)
    }
}
function tn_Pb() {
    return new tn_mb
}
function tn_Qb(a) {
    return new tn_qb(a.value)
}
function tn_Rb(a) {
    return new tn_3a(a.value)
}
function tn_Sb(a) {
    a = a.value.replace(/\s*\($/, "");
    switch (a) {
        case "node":
            return new tn_lb;
        case "text":
            return new tn_nb;
        case "comment":
            return new tn_ob;
        case "processing-instruction":
            return new tn_pb("")
    }
}
function tn_Tb(a, b) {
    var c = a.replace(/\s*\($/, "");
    "processing-instruction" != c && tn_e(c);
    return new tn_pb(b.value)
}
function tn_Ub(a, b) {
    return new tn_rb(b)
}
function tn_Vb(a, b) {
    return b
}
function tn_Wb(a) {
    return new tn_sb(a)
}
function tn_Xb(a, b, c, d) {
    a = new tn_sb(a);
    a.appendArg(c);
    for (c = 0; c < d.length; ++c)a.appendArg(d[c]);
    return a
}
function tn_Yb(a, b) {
    return b
}
function tn_Zb(a, b, c) {
    return new tn_tb(a, c)
}
function tn__b(a, b, c) {
    return new tn_ub(a, c)
}
function tn_0b(a, b, c) {
    c.prependStep(tn_v(b.value));
    return new tn_ub(a, c)
}
function tn_1b(a, b) {
    return 0 < b.length ? new tn_vb(a, b) : a
}
function tn_2b(a, b) {
    return new tn_wb(b)
}
function tn_w(a, b, c) {
    return new tn_xb(a, b, c)
}
function tn_3b(a) {
    a = a.value.substring(1, a.value.length - 1);
    return new tn_yb(a)
}
function tn_4b(a) {
    return new tn_zb(a.value)
}
function tn_5b(a, b) {
    return new tn_Ab(b.value)
}
function tn_2a(a) {
    if ("$" == a.charAt(0))return new tn_Ab(a.substr(1));
    if ("@" == a.charAt(0)) {
        a = new tn_3a(a.substr(1));
        a = new tn_k("attribute", a);
        var b = new tn_j;
        b.appendStep(a);
        return b
    }
    if (a.match(/^[0-9]+$/))return new tn_zb(a);
    a = new tn_3a(a);
    a = new tn_k("child", a);
    b = new tn_j;
    b.appendStep(a);
    return b
}
var tn_t = {
        ANCESTOR_OR_SELF: "ancestor-or-self",
        ANCESTOR: "ancestor",
        ATTRIBUTE: "attribute",
        CHILD: "child",
        DESCENDANT_OR_SELF: "descendant-or-self",
        DESCENDANT: "descendant",
        FOLLOWING_SIBLING: "following-sibling",
        FOLLOWING: "following",
        NAMESPACE: "namespace",
        PARENT: "parent",
        PRECEDING_SIBLING: "preceding-sibling",
        PRECEDING: "preceding",
        SELF: "self"
    }, tn_6b = [tn_t.ANCESTOR_OR_SELF, tn_t.ANCESTOR, tn_t.ATTRIBUTE, tn_t.CHILD, tn_t.DESCENDANT_OR_SELF, tn_t.DESCENDANT, tn_t.FOLLOWING_SIBLING, tn_t.FOLLOWING, tn_t.NAMESPACE, tn_t.PARENT,
        tn_t.PRECEDING_SIBLING, tn_t.PRECEDING, tn_t.SELF].join("|"), tn_7b = {
        label: "|",
        prec: 17,
        re: /^\|/
    }, tn_l = {label: "//", prec: 19, re: /^\/\//}, tn_m = {label: "/", prec: 30, re: /^\//}, tn_$a = {
        label: "::",
        prec: 20,
        re: /^::/
    }, tn_8b = {label: ":", prec: 1E3, re: /^:/}, tn_9b = {
        label: "[axis]",
        re: new RegExp("^(" + tn_6b + ")")
    }, tn_$b = {label: "(", prec: 34, re: /^\(/}, tn_x = {label: ")", re: /^\)/}, tn_ac = {
        label: "..",
        prec: 34,
        re: /^\.\./
    }, tn_bc = {label: ".", prec: 34, re: /^\./}, tn_9a = {label: "@", prec: 34, re: /^@/}, tn_cc = {
        label: ",",
        re: /^,/
    }, tn_8a = {
        label: "or",
        prec: 10, re: /^or\b/
    }, tn_7a = {label: "and", prec: 11, re: /^and\b/}, tn_dc = {label: "=", prec: 12, re: /^=/}, tn_ec = {
        label: "!=",
        prec: 12,
        re: /^!=/
    }, tn_fc = {label: ">=", prec: 13, re: /^>=/}, tn_gc = {label: ">", prec: 13, re: /^>/}, tn_hc = {
        label: "<=",
        prec: 13,
        re: /^<=/
    }, tn_ic = {label: "<", prec: 13, re: /^</}, tn_jc = {
        label: "+",
        prec: 14,
        re: /^\+/,
        left: !0
    }, tn_kc = {label: "-", prec: 14, re: /^\-/, left: !0}, tn_5a = {
        label: "div",
        prec: 15,
        re: /^div\b/,
        left: !0
    }, tn_6a = {label: "mod", prec: 15, re: /^mod\b/, left: !0}, tn_lc = {label: "[", prec: 32, re: /^\[/}, tn_mc = {
        label: "]",
        re: /^\]/
    }, tn_ab = {label: "$", re: /^\$/}, tn_nc = {label: "[ncname]", re: new RegExp("^" + tn_Da)}, tn_oc = {
        label: "*",
        prec: 15,
        re: /^\*/,
        left: !0
    }, tn_pc = {label: "[litq]", prec: 20, re: /^'[^\']*'/}, tn_qc = {
        label: "[litqq]",
        prec: 20,
        re: /^"[^\"]*"/
    }, tn_rc = {label: "[number]", prec: 35, re: /^\d+(\.\d*)?/}, tn_n = {
        label: "[qname]",
        re: new RegExp("^(" + tn_Da + ":)?" + tn_Da)
    }, tn_sc = {
        label: "[nodetest-start]",
        re: /^(processing-instruction|comment|text|node)\(/
    }, tn_4a = [tn_l, tn_m, tn_ac, tn_bc, tn_$a, tn_8b, tn_9b, tn_sc, tn_$b, tn_x, tn_lc, tn_mc, tn_9a,
        tn_cc, tn_8a, tn_7a, tn_ec, tn_dc, tn_fc, tn_gc, tn_hc, tn_ic, tn_jc, tn_kc, tn_oc, tn_7b, tn_6a, tn_5a, tn_pc, tn_qc, tn_rc, tn_n, tn_nc, tn_ab], tn_tc = {label: "LocationPath"}, tn_y = {label: "RelativeLocationPath"}, tn_z = {label: "AbsoluteLocationPath"}, tn_A = {label: "Step"}, tn_B = {label: "NodeTest"}, tn_uc = {label: "Predicate"}, tn_vc = {label: "Literal"}, tn_C = {label: "Expr"}, tn_D = {label: "PrimaryExpr"}, tn_wc = {label: "Variablereference"}, tn_xc = {label: "Number"}, tn_yc = {label: "FunctionCall"}, tn_zc = {label: "ArgumentRemainder"}, tn_E = {label: "PathExpr"},
    tn_Ac = {label: "UnionExpr"}, tn_Bc = {label: "FilterExpr"}, tn_Cc = {label: "Digits"}, tn_Dc = [tn_tc, tn_y, tn_z, tn_A, tn_B, tn_uc, tn_vc, tn_C, tn_D, tn_wc, tn_xc, tn_yc, tn_zc, tn_E, tn_Ac, tn_Bc, tn_Cc], tn_gb = {label: "?"}, tn_fb = {label: "*"}, tn_hb = {label: "+"}, tn_Ec = [[tn_tc, [tn_y], 18, tn_u], [tn_tc, [tn_z], 18, tn_u], [tn_z, [tn_m, tn_y], 18, tn_Bb], [tn_z, [tn_l, tn_y], 18, tn_Cb], [tn_z, [tn_m], 0, tn_Db], [tn_z, [tn_l], 0, tn_Eb], [tn_y, [tn_A], 31, tn_Fb], [tn_y, [tn_y, tn_m, tn_A], 31, tn_Gb], [tn_y, [tn_y, tn_l, tn_A], 31, tn_Hb], [tn_y, [tn_D, tn_m, tn_A], 31,
        tn_Ib], [tn_A, [tn_bc], 33, tn_Jb], [tn_A, [tn_ac], 33, tn_Kb], [tn_A, [tn_9b, tn_$a, tn_B], 33, tn_Lb], [tn_A, [tn_9a, tn_B], 33, tn_Mb], [tn_A, [tn_B], 33, tn_Nb], [tn_A, [tn_A, tn_uc], 33, tn_Ob], [tn_B, [tn_oc], 33, tn_Pb], [tn_B, [tn_nc, tn_8b, tn_oc], 33, tn_Qb], [tn_B, [tn_n], 33, tn_Rb], [tn_B, [tn_sc, tn_x], 33, tn_Sb], [tn_B, [tn_sc, tn_vc, tn_x], 33, tn_Tb], [tn_uc, [tn_lc, tn_C, tn_mc], 33, tn_Ub], [tn_D, [tn_wc], 33, tn_u], [tn_D, [tn_$b, tn_C, tn_x], 33, tn_Vb], [tn_D, [tn_vc], 30, tn_u], [tn_D, [tn_xc], 30, tn_u], [tn_D, [tn_yc], 30, tn_u], [tn_yc, [tn_n, tn_$b, tn_x],
        -1, tn_Wb], [tn_yc, [tn_n, tn_$b, tn_C, tn_zc, tn_fb, tn_x], -1, tn_Xb], [tn_zc, [tn_cc, tn_C], -1, tn_Yb], [tn_Ac, [tn_E], 20, tn_u], [tn_Ac, [tn_Ac, tn_7b, tn_E], 20, tn_Zb], [tn_E, [tn_tc], 20, tn_u], [tn_E, [tn_Bc], 19, tn_u], [tn_E, [tn_Bc, tn_m, tn_y], 20, tn__b], [tn_E, [tn_Bc, tn_l, tn_y], 20, tn_0b], [tn_Bc, [tn_D, tn_uc, tn_fb], 20, tn_1b], [tn_C, [tn_D], 16, tn_u], [tn_C, [tn_Ac], 16, tn_u], [tn_C, [tn_kc, tn_C], -1, tn_2b], [tn_C, [tn_C, tn_8a, tn_C], -1, tn_w], [tn_C, [tn_C, tn_7a, tn_C], -1, tn_w], [tn_C, [tn_C, tn_dc, tn_C], -1, tn_w], [tn_C, [tn_C, tn_ec, tn_C], -1,
        tn_w], [tn_C, [tn_C, tn_ic, tn_C], -1, tn_w], [tn_C, [tn_C, tn_hc, tn_C], -1, tn_w], [tn_C, [tn_C, tn_gc, tn_C], -1, tn_w], [tn_C, [tn_C, tn_fc, tn_C], -1, tn_w], [tn_C, [tn_C, tn_jc, tn_C], -1, tn_w, !0], [tn_C, [tn_C, tn_kc, tn_C], -1, tn_w, !0], [tn_C, [tn_C, tn_oc, tn_C], -1, tn_w, !0], [tn_C, [tn_C, tn_5a, tn_C], -1, tn_w, !0], [tn_C, [tn_C, tn_6a, tn_C], -1, tn_w, !0], [tn_vc, [tn_pc], -1, tn_3b], [tn_vc, [tn_qc], -1, tn_3b], [tn_xc, [tn_rc], -1, tn_4b], [tn_wc, [tn_ab, tn_n], 200, tn_5b]], tn_o = [];
function tn_0a() {
    function a(a, b, c) {
        a[b] || (a[b] = []);
        a[b].push(c)
    }

    if (!tn_o.length) {
        tn_Ec.sort(function (a, b) {
            var c = a[1].length, d = b[1].length;
            return c < d ? 1 : c > d ? -1 : 0
        });
        for (var b = 1, c = 0; c < tn_Dc.length; ++c)tn_Dc[c].key = b++;
        for (c = 0; c < tn_4a.length; ++c)tn_4a[c].key = b++;
        for (c = 0; c < tn_Ec.length; ++c)for (var b = tn_Ec[c], d = b[1], e = d.length - 1; 0 <= e; --e)if (d[e] == tn_hb) {
            a(tn_o, d[e - 1].key, b);
            break
        } else if (d[e] == tn_fb || d[e] == tn_gb)a(tn_o, d[e - 1].key, b), --e; else {
            a(tn_o, d[e].key, b);
            break
        }
        tn_Ga(tn_o, function () {
        })
    }
}
function tn_jb(a, b) {
    for (var c = b.firstChild; c; c = c.nextSibling)a.push(c), arguments.callee(a, c)
}
function tn_kb(a, b) {
    for (var c = b.lastChild; c; c = c.previousSibling)a.push(c), arguments.callee(a, c)
}
function tn__a(a, b) {
    if (0 != b.length) {
        for (var c = [], d = 0; d < a.contextSize(); ++d) {
            for (var e = a.nodelist[d], f = {node: e, key: []}, e = a.clone(e, 0, [e]), h = 0; h < b.length; ++h) {
                var l = b[h], n = l.expr.evaluate(e), m;
                "text" == l.type ? m = n.stringValue() : "number" == l.type && (m = n.numberValue());
                f.key.push({value: m, order: l.order})
            }
            f.key.push({value: d, order: "ascending"});
            c.push(f)
        }
        c.sort(tn_Fc);
        f = [];
        for (d = 0; d < c.length; ++d)f.push(c[d].node);
        a.nodelist = f;
        a.setNode(0)
    }
}
function tn_Fc(a, b) {
    for (var c = 0; c < a.key.length; ++c) {
        var d = "descending" == a.key[c].order ? -1 : 1;
        if (a.key[c].value > b.key[c].value)return 1 * d;
        if (a.key[c].value < b.key[c].value)return -1 * d
    }
    return 0
}
function tn_F(a, b) {
    var c = tn_Za(a);
    return c = c.evaluate(b)
};
function tn_Gc(a, b) {
    var c;
    c = new tn_h;
    c = c.createDocumentFragment();
    tn_Hc(new tn_Xa(a, b), b, c);
    return c = tn_Ka(c)
}
function tn_Hc(a, b, c) {
    var d;
    d = 9 == c.nodeType ? c : c.ownerDocument;
    var e = b.nodeName.split(/:/);
    if (1 == e.length || "xsl" != e[0])if (3 == b.nodeType)tn_Ic(b) && (d = d.createTextNode(b.nodeValue), c.appendChild(d)); else if (1 == b.nodeType) {
        d = d.createElement(b.nodeName);
        for (e = 0; e < b.attributes.length; ++e) {
            var f = b.attributes[e];
            if (f) {
                var h = f.nodeName, f = tn_Jc(f.nodeValue, a);
                d.setAttribute(h, f)
            }
        }
        c.appendChild(d);
        tn_G(a, b, d)
    } else tn_G(a, b, c); else switch (e[1]) {
        case "apply-imports":
            alert("not implemented: " + e[1]);
            break;
        case "apply-templates":
            e =
                (e = tn_H(b, "select")) ? tn_F(e, a).nodeSetValue() : a.node.childNodes;
            a = a.clone(e[0], 0, e);
            tn_Kc(a, b);
            tn_Lc(a, b);
            f = tn_H(b, "mode");
            d = b.ownerDocument.documentElement;
            e = [];
            for (b = 0; b < d.childNodes.length; ++b)h = d.childNodes[b], 1 == h.nodeType && "xsl:template" == h.nodeName && h.getAttribute("mode") == f && e.push(h);
            for (d = 0; d < a.contextSize(); ++d)for (h = a.nodelist[d], b = 0; b < e.length; ++b)tn_Hc(a.clone(h, d), e[b], c);
            break;
        case "attribute":
            e = tn_H(b, "name");
            e = tn_Jc(e, a);
            h = d.createDocumentFragment();
            tn_G(a, b, h);
            b = tn_g(h);
            c.setAttribute(e,
                b);
            break;
        case "attribute-set":
            alert("not implemented: " + e[1]);
            break;
        case "call-template":
            e = tn_H(b, "name");
            d = b.ownerDocument.documentElement;
            a = a.clone();
            tn_Kc(a, b);
            for (b = 0; b < d.childNodes.length; ++b)if (h = d.childNodes[b], 1 == h.nodeType && "xsl:template" == h.nodeName && h.getAttribute("name") == e) {
                tn_G(a, h, c);
                break
            }
            break;
        case "choose":
            for (d = 0; d < b.childNodes.length; ++d)if (e = b.childNodes[d], 1 == e.nodeType)if ("xsl:when" == e.nodeName) {
                if (h = tn_H(e, "test"), tn_F(h, a).booleanValue()) {
                    tn_G(a, e, c);
                    break
                }
            } else if ("xsl:otherwise" ==
                e.nodeName) {
                tn_G(a, e, c);
                break
            }
            break;
        case "comment":
            h = d.createDocumentFragment();
            tn_G(a, b, h);
            b = tn_g(h);
            b = d.createComment(b);
            c.appendChild(b);
            break;
        case "copy":
            (h = tn_Mc(c, a.node, d)) && tn_G(a, b, h);
            break;
        case "copy-of":
            e = tn_H(b, "select");
            b = tn_F(e, a);
            if ("node-set" == b.type)for (e = b.nodeSetValue(), b = 0; b < e.length; ++b)tn_Nc(c, e[b], d); else b = b.stringValue(), h = d.createTextNode(b), c.appendChild(h);
            break;
        case "decimal-format":
            alert("not implemented: " + e[1]);
            break;
        case "element":
            e = tn_H(b, "name");
            e = tn_Jc(e, a);
            h = d.createElement(e);
            c.appendChild(h);
            tn_G(a, b, h);
            break;
        case "fallback":
            alert("not implemented: " + e[1]);
            break;
        case "for-each":
            d = tn_H(b, "select");
            d = tn_F(d, a).nodeSetValue();
            a = a.clone(d[0], 0, d);
            tn_Lc(a, b);
            for (d = 0; d < a.contextSize(); ++d)e = a.nodelist[d], tn_G(a.clone(e, d), b, c);
            break;
        case "if":
            d = tn_H(b, "test");
            d = tn_F(d, a);
            null != d && d.booleanValue() && tn_G(a, b, c);
            break;
        case "import":
            alert("not implemented: " + e[1]);
            break;
        case "include":
            alert("not implemented: " + e[1]);
            break;
        case "key":
            alert("not implemented: " + e[1]);
            break;
        case "message":
            alert("not implemented: " +
            e[1]);
            break;
        case "namespace-alias":
            alert("not implemented: " + e[1]);
            break;
        case "number":
            alert("not implemented: " + e[1]);
            break;
        case "otherwise":
            alert("error if here: " + e[1]);
            break;
        case "output":
            break;
        case "preserve-space":
            break;
        case "processing-instruction":
            alert("not implemented: " + e[1]);
            break;
        case "sort":
            break;
        case "strip-space":
            alert("not implemented: " + e[1]);
            break;
        case "stylesheet":
        case "transform":
            tn_G(a, b, c);
            break;
        case "template":
            if (d = e = tn_H(b, "match")) {
                d = a;
                e = tn_Za(e);
                if (e.steps && !e.absolute &&
                    1 == e.steps.length && "child" == e.steps[0].axis && 0 == e.steps[0].predicate.length)h = e.steps[0].nodetest.evaluate(d).booleanValue(); else for (h = !1, f = d.node; !h && f;) {
                    for (var l = e.evaluate(d.clone(f, 0, [f])).nodeSetValue(), n = 0; n < l.length; ++n)if (l[n] == d.node) {
                        h = !0;
                        break
                    }
                    f = f.parentNode
                }
                d = h
            }
            d && tn_G(a, b, c);
            break;
        case "text":
            b = tn_g(b);
            h = d.createTextNode(b);
            c.appendChild(h);
            break;
        case "value-of":
            e = tn_H(b, "select");
            b = tn_F(e, a).stringValue();
            h = d.createTextNode(b);
            c.appendChild(h);
            break;
        case "param":
            tn_Oc(a, b, !1);
            break;
        case "variable":
            tn_Oc(a, b, !0);
            break;
        case "when":
            alert("error if here: " + e[1]);
            break;
        case "with-param":
            alert("error if here: " + e[1]);
            break;
        default:
            alert("error if here: " + e[1])
    }
}
function tn_Kc(a, b) {
    for (var c = 0; c < b.childNodes.length; ++c) {
        var d = b.childNodes[c];
        1 == d.nodeType && "xsl:with-param" == d.nodeName && tn_Oc(a, d, !0)
    }
}
function tn_Lc(a, b) {
    for (var c = [], d = 0; d < b.childNodes.length; ++d) {
        var e = b.childNodes[d];
        if (1 == e.nodeType && "xsl:sort" == e.nodeName) {
            var f = tn_H(e, "select"), f = tn_Za(f), h = tn_H(e, "data-type") || "text", e = tn_H(e, "order") || "ascending";
            c.push({expr: f, type: h, order: e})
        }
    }
    tn__a(a, c)
}
function tn_Oc(a, b, c) {
    var d = tn_H(b, "name"), e = tn_H(b, "select");
    0 < b.childNodes.length ? (e = b.ownerDocument.createDocumentFragment(), tn_G(a, b, e), b = new tn_s([e])) : b = e ? tn_F(e, a) : new tn_p("");
    !c && a.getVariable(d) || a.setVariable(d, b)
}
function tn_G(a, b, c) {
    a = a.clone();
    for (var d = 0; d < b.childNodes.length; ++d)tn_Hc(a, b.childNodes[d], c)
}
function tn_Ic(a) {
    if (!a.nodeValue.match(/^\s*$/))return !0;
    a = a.parentNode;
    if ("xsl:text" == a.nodeName)return !0;
    for (; a && 1 == a.nodeType;) {
        var b = a.getAttribute("xml:space");
        if (b)if ("default" == b)break; else if ("preserve" == b)return !0;
        a = a.parentNode
    }
    return !1
}
function tn_Jc(a, b) {
    var c = tn_f(a, "{");
    if (1 == c.length)return a;
    for (var d = "", e = 0; e < c.length; ++e) {
        var f = tn_f(c[e], "}");
        if (2 != f.length)d += c[e]; else var h = tn_F(f[0], b).stringValue(), d = d + (h + f[1])
    }
    return d
}
function tn_H(a, b) {
    var c = a.getAttribute(b);
    return c ? tn_Oa(c) : c
}
function tn_Nc(a, b, c) {
    if (11 == b.nodeType || 9 == b.nodeType)for (var d = 0; d < b.childNodes.length; ++d)arguments.callee(a, b.childNodes[d], c); else {
        var e = tn_Mc(a, b, c);
        if (e) {
            for (d = 0; d < b.attributes.length; ++d)arguments.callee(e, b.attributes[d], c);
            for (d = 0; d < b.childNodes.length; ++d)arguments.callee(e, b.childNodes[d], c)
        }
    }
}
function tn_Mc(a, b, c) {
    if (1 == b.nodeType)return b = c.createElement(b.nodeName), a.appendChild(b), b;
    3 == b.nodeType ? (b = c.createTextNode(b.nodeValue), a.appendChild(b)) : 4 == b.nodeType ? (b = c.createCDATASection(b.nodeValue), a.appendChild(b)) : 8 == b.nodeType ? (b = c.createComment(b.nodeValue), a.appendChild(b)) : 2 == b.nodeType && a.setAttribute(b.nodeName, b.nodeValue);
    return null
};
window.nxslProcess = tn_Va;
window.xmlParse = tn_Ta;
window.xsltProcess = tn_Gc;
window.xmlText = tn_Ka;
window.xmlImportNode = tn_Ea;
var tn_Pc = "http://www.gstatic.com/translate/infowindow/";
function tn_Qc() {
    return tn_Pc + "transparent.png"
}
var tn_Rc = Number.MAX_VALUE;
function tn_I(a, b, c, d, e, f) {
    var h = ((b ? b.ownerDocument : null) || document).createElement(a);
    c && tn_J(h, c);
    d && tn_Sc(h, d);
    h.style.display = "none";
    b && !e && (b.appendChild(h), b.windo && (h.windo = b.windo));
    f || window.setTimeout(function () {
        h.style.display = ""
    }, 0);
    return h
}
function tn_K(a, b) {
    var c = ((b ? b.ownerDocument : null) || document).createTextNode(a);
    b && b.appendChild(c);
    return c
}
function tn_L(a) {
    return tn_M(a) + "px"
}
function tn_J(a, b) {
    var c = a.style;
    c.position = "absolute";
    c.left = tn_L(b.x);
    c.top = tn_L(b.y)
}
function tn_Sc(a, b) {
    var c = a.style;
    c.width = tn_L(b.width);
    c.height = tn_L(b.height)
}
function tn_N(a, b) {
    a.style.width = tn_L(b)
}
function tn_O(a, b) {
    a.style.height = tn_L(b)
}
function tn_P(a) {
    a.style.display = "none"
}
function tn_Q(a) {
    a.style.display = ""
}
function tn_R(a) {
    a.style.visibility = "hidden"
}
var tn_S = Math.min, tn_T = Math.max, tn_M = Math.round;
function tn_U(a, b) {
    try {
        a.style.cursor = b
    } catch (c) {
        "pointer" == b && tn_U(a, "hand")
    }
}
function tn_Tc(a) {
    var b = a, c = "gmnoscreen", d = b.className ? "" + b.className : "";
    if (d && -1 != d.indexOf(c)) {
        for (var d = d.split(/\s+/), e = 0; e < d.length; ++e)d[e] == c && d.splice(e--, 1);
        b.className = d.join(" ")
    }
    b = "gmnoprint";
    if (c = a.className ? "" + a.className : "") {
        c = c.split(/\s+/);
        d = !1;
        for (e = 0; e < c.length; ++e)if (c[e] == b) {
            d = !0;
            break
        }
        d || c.push(b);
        a.className = c.join(" ")
    } else a.className = b
}
function tn_Uc(a, b, c) {
    return window.setTimeout(function () {
        b.apply(a)
    }, c)
}
function tn_V(a) {
    a.parentNode && (a.parentNode.removeChild(a), tn_Ua(a, tn_Vc))
}
function tn_Wc(a) {
    tn_W.isGeckoBased() ? a.style.MozUserSelect = "none" : (a.unselectable = "on", a.onselectstart = tn_Xc)
}
function tn_Yc(a, b) {
    for (var c = a.length, d = 0; d < c; ++d)b(a[d], d)
}
function tn_Zc(a, b, c) {
    for (var d in a)(c || !a.hasOwnProperty || a.hasOwnProperty(d)) && b(d, a[d])
}
function tn__c(a, b, c, d) {
    c = c || 0;
    for (d = d || b.length; c < d; ++c)a.push(b[c])
}
function tn_Xc() {
    return !1
}
function tn_X(a, b) {
    var c = (a ? a.ownerDocument : null) || document;
    if (a.currentStyle)return c = tn_0c(b), a.currentStyle[c];
    if (c.defaultView && c.defaultView.getComputedStyle)return (c = c.defaultView.getComputedStyle(a, "")) ? c.getPropertyValue(b) : "";
    c = tn_0c(b);
    return a.style[c]
}
function tn_1c(a, b, c) {
    b = c ? c : tn_X(a, b);
    if ("number" == typeof b || isNaN(parseInt(b, 10)))return b;
    if (2 < b.length && "px" == b.substring(b.length - 2))return parseInt(b, 10);
    (c = a.ownerDocument.getElementById("__mapsBaseCssDummy__")) ? a.parentNode.appendChild(c) : (c = tn_I("div", a, new tn_a(0, 0), new tn_Y(0, 0)), c.id = "__mapsBaseCssDummy__", tn_R(c));
    c.style.width = "0px";
    c.style.width = b;
    return c.offsetWidth
}
function tn_Z(a) {
    return new tn_Y(tn_2c(a, "border-left-width"), tn_2c(a, "border-top-width"))
}
function tn_2c(a, b) {
    var c = tn_X(a, b);
    return isNaN(parseInt(c, 10)) ? 0 : tn_1c(a, b, c)
}
function tn_0c(a) {
    return a.replace(/-(\w)/g, function (a, c) {
        return ("" + c).toUpperCase()
    })
}
function tn_3c(a) {
    var b;
    b = !1;
    a && "object" == typeof a && (b = "function" == typeof Window ? a instanceof Window : "object" == typeof a.navigator && "object" == typeof a.history && "object" == typeof a.document);
    return a = b ? a : a && a.windo ? a.windo : window
};
function tn_4c(a, b, c) {
    tn_5c([a], function (a) {
        b(a[0])
    }, c)
}
function tn_5c(a, b, c) {
    c = c || screen.width;
    var d = tn_I("div", window.document.body, new tn_a(-screen.width, -screen.height), new tn_Y(c, screen.height)), e = [];
    for (c = 0; c < a.length; c++) {
        var f = tn_I("div", d, tn_a.ORIGIN);
        f.appendChild(a[c]);
        e.push(f)
    }
    window.setTimeout(function () {
        for (var c = [], f = new tn_Y(0, 0), n = 0; n < e.length; n++) {
            var m = e[n], g = new tn_Y(m.offsetWidth, m.offsetHeight);
            c.push(g);
            m.removeChild(a[n]);
            tn_V(m);
            f.width = tn_T(f.width, g.width);
            f.height = tn_T(f.height, g.height)
        }
        tn_V(d);
        e = null;
        b(c, f)
    }, 0)
};
function tn_6c(a, b, c, d, e, f, h) {
    e && 1 == tn_W.type ? (b = tn_I("div", b, c, d), b.style.overflow = "hidden", d && f && (b.sizingMethod = "scale"), d = tn_I("img", b), tn_R(d), tn_7c(d, tn_8c, tn_9c)) : (b = tn_I("img", b, c, d), h && tn_7c(b, tn_8c, tn_$c));
    h && (b.hideAndTrackLoading = !0);
    tn_Wc(b);
    1 == tn_W.type && (b.galleryImg = "no");
    b.style.border = tn_L(0);
    b.style.padding = tn_L(0);
    b.style.margin = tn_L(0);
    b.oncontextmenu = tn_ad;
    h = b;
    "DIV" == h.tagName ? (h.firstChild.src = a, h.src = a, h.hideAndTrackLoading && (h.style.filter = "", h.loaded = !1)) : h.hideAndTrackLoading &&
    a != tn_Qc() ? (a != tn_Qc() ? (h.loaded = !1, h.pendingSrc = a) : h.pendingSrc = null, h.src = tn_Qc()) : h.src = a;
    return b
}
function tn_9c() {
    var a = this.parentNode;
    a.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=" + (a.sizingMethod ? a.sizingMethod : "crop") + ',src="' + this.src + '")';
    a.hideAndTrackLoading && (a.loaded = !0)
}
function tn_$c() {
    var a = this;
    a.src == tn_Qc() && a.pendingSrc ? (a.src = a.pendingSrc, a.pendingSrc = null) : a.loaded = !0
};
var tn_bd = "dblclick", tn_8c = "load", tn_cd = "unload", tn_dd = "clearlisteners";
var tn_ed = !1;
function tn__() {
    this.listeners_ = []
}
function tn_fd() {
}
tn__.instance = function (a) {
    a || (a = window);
    a.gEventListenerPool || (a.gEventListenerPool = new tn__);
    return a.gEventListenerPool
};
tn__.remove = function (a) {
    tn__.instance(tn_3c(a)).remove_(a)
};
tn__.prototype.remove_ = function (a) {
    var b = this.listeners_.pop(), c = a.getIndex_();
    c < this.listeners_.length && (this.listeners_[c] = b, b.setIndex_(c));
    a.setIndex_(-1)
};
tn__.push = function (a) {
    tn__.instance(tn_3c(a)).push_(a)
};
tn__.prototype.push_ = function (a) {
    this.listeners_.push(a);
    a.setIndex_(this.listeners_.length - 1)
};
tn__.prototype.clear = function () {
    for (var a = 0; a < this.listeners_.length; ++a)this.listeners_[a].setIndex_(-1);
    this.listeners_ = []
};
function tn_gd(a, b, c) {
    a = new EventListener(a, b, c, 0);
    tn__.push(a);
    return a
}
function tn_hd(a) {
    a.remove();
    tn__.remove(a)
}
function tn_Vc(a) {
    tn_0(a, tn_dd);
    tn_Yc(tn_id(a), function (a) {
        a.remove();
        tn__.remove(a)
    })
}
function tn_id(a, b) {
    var c = [], d = a.__e_;
    d && (b ? d[b] && tn__c(c, d[b]) : tn_Zc(d, function (a, b) {
        tn__c(c, b)
    }));
    return c
}
function tn_jd(a, b, c) {
    var d = null, e = a.__e_;
    e ? (d = e[b], d || (d = [], c && (e[b] = d))) : (d = [], c && (a.__e_ = {}, a.__e_[b] = d));
    return d
}
function tn_0(a, b, c) {
    var d = [];
    tn__c(d, arguments, 2);
    tn_Yc(tn_id(a, b), function (b) {
        if (tn_ed)b.apply(a, d); else try {
            b.apply(a, d)
        } catch (c) {
        }
    })
}
function tn_7c(a, b, c) {
    3 == tn_W.type && b == tn_bd ? (a["on" + b] = c, c = new EventListener(a, b, c, 3)) : a.addEventListener ? (a.addEventListener(b, c, !1), c = new EventListener(a, b, c, 1)) : a.attachEvent ? (c = tn_kd(a, c), a.attachEvent("on" + b, c), c = new EventListener(a, b, c, 2)) : (a["on" + b] = c, c = new EventListener(a, b, c, 3));
    var d = tn_3c(a);
    a == d && b == tn_cd || tn__.push(c);
    return c
}
function tn_1(a, b, c, d) {
    c = tn_ld(c, d);
    return tn_7c(a, b, c)
}
function tn_md(a, b, c) {
    tn_1(a, "click", b, c);
    1 == tn_W.type && tn_1(a, tn_bd, b, c)
}
function tn_ld(a, b) {
    return function (c) {
        c || (c = window.event);
        c && !c.target && (c.target = c.srcElement);
        b.call(a, c, this)
    }
}
function tn_kd(a, b) {
    return function () {
        return b.apply(a, arguments)
    }
}
function EventListener(a, b, c, d) {
    tn_d(a);
    tn_d("function" == typeof c);
    var e = this;
    e.instance_ = a;
    e.eventName_ = b;
    e.handler_ = c;
    e.registrationType_ = d;
    e.index_ = -1;
    c = tn_3c(a);
    e.windo = c;
    tn_jd(a, b, !0).push(e)
}
EventListener.prototype.remove = function () {
    var a = this;
    switch (a.registrationType_) {
        case 1:
            a.instance_.removeEventListener(a.eventName_, a.handler_, !1);
            break;
        case 2:
            a.instance_.detachEvent("on" + a.eventName_, a.handler_);
            break;
        case 3:
            a.instance_["on" + a.eventName_] = null
    }
    tn_Fa(tn_jd(a.instance_, a.eventName_), a);
    a.instance_ = null;
    a.handler_ = null;
    a.remove = tn_fd;
    a.apply = tn_fd
};
EventListener.prototype.getIndex_ = function () {
    return this.index_
};
EventListener.prototype.setIndex_ = function (a) {
    this.index_ = a
};
EventListener.prototype.apply = function (a, b) {
    return this.handler_.apply(a, b)
};
function tn_nd(a) {
    "click" == a.type && tn_0(document, "logclick", a);
    1 == tn_W.type ? (window.event.cancelBubble = !0, window.event.returnValue = !1) : (a.preventDefault(), a.stopPropagation())
}
function tn_od(a) {
    "click" == a.type && tn_0(document, "logclick", a);
    1 == tn_W.type ? window.event.cancelBubble = !0 : a.stopPropagation()
}
function tn_ad(a) {
    1 == tn_W.type ? window.event.returnValue = !1 : a.preventDefault()
};
var tn_pd = "opera msie chrome applewebkit firefox camino mozilla".split(" "), tn_qd = "x11; macintosh windows android ipad ipod iphone webos".split(" ");
function tn_2(a) {
    this.agent = a;
    this.os = this.type = -1;
    this.revision = this.version = 0;
    a = a.toLowerCase();
    for (var b = 0; b < tn_pd.length; b++) {
        var c = tn_pd[b];
        if (-1 != a.indexOf(c)) {
            this.type = b;
            b = new RegExp(c + "[ /]?([0-9]+(.[0-9]+)?)");
            if (b = b.exec(a))this.version = parseFloat(b[1]);
            break
        }
    }
    6 == this.type && (b = /^Mozilla\/.*Gecko\/.*(Minefield|Shiretoko)[ /]?([0-9]+(.[0-9]+)?)/, b = b.exec(this.agent)) && (this.type = 4, this.version = parseFloat(b[2]));
    3 == this.type && (b = /^.*Version\/?([0-9]+(.[0-9]+)?)/, b = b.exec(this.agent)) && (this.version =
        parseFloat(b[1]));
    0 == this.type && (b = /^Opera\/9.[89].*Version\/?([0-9]+(.[0-9]+)?)/, b = b.exec(this.agent)) && (this.version = parseFloat(b[1]));
    for (b = 0; b < tn_qd.length; b++)if (c = tn_qd[b], -1 != a.indexOf(c)) {
        this.os = b;
        break
    }
    1 == this.os ? (b = /Mac OS X[ ]+([0-9]+)[\._]([0-9]+)/, b.exec(this.agent)) : 2 == this.os && (b = /Windows NT ([0-9]+.[0-9]+)/, b.exec(this.agent));
    a = /\brv:\s*(\d+\.\d+)/.exec(a);
    this.isGeckoBased() && a && (this.revision = parseFloat(a[1]))
}
tn_2.EARTH_PLUGIN_MAIN_CLSID_ = "F9152AEC-3462-4632-8087-EEE3C3CDDA24";
tn_2.EARTH_PLUGIN_MAIN_MIMETYPE_ = "application/geplugin";
tn_2.EARTH_GET_SELF_ = "getSelf";
tn_2.prototype.isGeckoBased = function () {
    return 4 == this.type || 6 == this.type || 5 == this.type
};
tn_2.OS_NAMES = {};
tn_2.OS_NAMES[2] = "windows";
tn_2.OS_NAMES[1] = "macos";
tn_2.OS_NAMES[0] = "unix";
tn_2.OS_NAMES[3] = "android";
tn_2.OS_NAMES[6] = "iphone";
tn_2.OS_NAMES[-1] = "other";
tn_2.BROWSER_NAMES = {};
tn_2.BROWSER_NAMES[1] = "ie";
tn_2.BROWSER_NAMES[4] = "firefox";
tn_2.BROWSER_NAMES[2] = "chrome";
tn_2.BROWSER_NAMES[3] = "safari";
tn_2.BROWSER_NAMES[0] = "opera";
tn_2.BROWSER_NAMES[5] = "camino";
tn_2.BROWSER_NAMES[6] = "mozilla";
tn_2.BROWSER_NAMES[-1] = "other";
var tn_W = new tn_2(navigator.userAgent);
tn_a.ORIGIN = new tn_a(0, 0);
tn_a.prototype.toString = function () {
    return "(" + this.x + ", " + this.y + ")"
};
function tn_Y(a, b) {
    this.width = a;
    this.height = b
}
tn_Y.ZERO = new tn_Y(0, 0);
tn_Y.prototype.toString = function () {
    return "(" + this.width + ", " + this.height + ")"
};
function tn_3(a) {
    this.minX = this.minY = tn_Rc;
    this.maxX = this.maxY = -tn_Rc;
    var b = arguments;
    if (a && a.length)for (b = 0; b < a.length; b++)this.extend(a[b]); else 4 <= b.length && (this.minX = b[0], this.minY = b[1], this.maxX = b[2], this.maxY = b[3])
}
tn_3.prototype.min = function () {
    return new tn_a(this.minX, this.minY)
};
tn_3.prototype.max = function () {
    return new tn_a(this.maxX, this.maxY)
};
tn_3.prototype.toString = function () {
    return "(" + this.min() + ", " + this.max() + ")"
};
tn_3.prototype.extend = function (a) {
    var b = this;
    b.minX = tn_S(b.minX, a.x);
    b.maxX = tn_T(b.maxX, a.x);
    b.minY = tn_S(b.minY, a.y);
    b.maxY = tn_T(b.maxY, a.y)
};
tn_3.intersection = function (a, b) {
    return new tn_3([new tn_a(tn_T(a.minX, b.minX), tn_T(a.minY, b.minY)), new tn_a(tn_S(a.maxX, b.maxX), tn_S(a.maxY, b.maxY))])
};
function tn_rd() {
}
tn_rd.monitor = function () {
};
tn_rd.monitorAll = function () {
};
tn_rd.dump = function () {
};
function tn_sd() {
    var a = tn_I("div", document.body), b = a.style;
    b.position = "absolute";
    b.left = tn_L(7);
    b.bottom = tn_L(4);
    b.zIndex = 1E4;
    var c;
    c = new tn_a(2, 2);
    c = tn_I("div", a, c, void 0);
    c.style.backgroundColor = "black";
    var d = c;
    1 == tn_W.type ? d.style.filter = "alpha(opacity=" + tn_M(35) + ")" : d.style.opacity = .35;
    d = tn_I("div", a);
    b = d.style;
    b.position = "relative";
    b.zIndex = 1;
    b.fontFamily = "Verdana,Arial,sans-serif";
    b.fontSize = "small";
    b.border = "1px solid black";
    var e = [["Clear", this.clear], ["Close", this.close]], f = tn_I("div", d),
        b = f.style;
    b.position = "relative";
    b.zIndex = 2;
    b.backgroundColor = "#979797";
    b.color = "white";
    b.fontSize = "85%";
    b.padding = tn_L(2);
    tn_U(f, "default");
    tn_Wc(f);
    tn_K("Log", f);
    for (b = 0; b < e.length; b++) {
        var h = e[b];
        tn_K(" - ", f);
        var l = tn_I("span", f);
        l.style.textDecoration = "underline";
        tn_K(h[0], l);
        tn_md(l, this, h[1]);
        tn_U(l, "pointer")
    }
    d = tn_I("div", d);
    b = d.style;
    b.backgroundColor = "white";
    b.width = "80em";
    b.height = "10em";
    b.overflow = tn_W.isGeckoBased() ? "-moz-scrollbars-vertical" : "auto";
    tn_7c(d, "mousedown", tn_od);
    this.logDiv_ =
        d;
    this.container_ = a;
    this.shadow_ = c
}
tn_sd.instance = function () {
    var a = tn_sd.instance_;
    a || (a = new tn_sd, tn_sd.instance_ = a);
    return a
};
tn_ = tn_sd.prototype;
tn_.write = function (a, b) {
    var c = this.createLogLine_();
    b && (c = tn_I("span", c), c.style.color = b);
    tn_K(a, c);
    this.scroll_()
};
tn_.clear = function () {
    this.logDiv_.innerHTML = ""
};
tn_.close = function () {
    tn_V(this.container_)
};
tn_.createLogLine_ = function () {
    var a = tn_I("div", this.logDiv_), b = a.style;
    b.fontSize = "85%";
    b.borderBottom = "1px solid silver";
    b.paddingBottom = tn_L(2);
    b = tn_I("div", a);
    b.style.color = "gray";
    b.style.fontSize = "75%";
    tn_K(this.timestamp_(), b);
    return a
};
tn_.scroll_ = function () {
    this.logDiv_.scrollTop = this.logDiv_.scrollHeight;
    this.sizeShadow_()
};
tn_.timestamp_ = function () {
    var a = new Date;
    return this.padNumber_(a.getHours(), 2) + ":" + this.padNumber_(a.getMinutes(), 2) + ":" + this.padNumber_(a.getSeconds(), 2) + ":" + this.padNumber_(a.getMilliseconds(), 3)
};
tn_.padNumber_ = function (a, b) {
    for (var c = a.toString(); c.length < b;)c = "0" + c;
    return c
};
tn_.sizeShadow_ = function () {
    tn_Sc(this.shadow_, new tn_Y(this.container_.offsetWidth, this.container_.offsetHeight))
};
function tn_td(a, b) {
    for (var c = new tn_a(0, 0); a && a != b;) {
        if ("BODY" == a.nodeName) {
            var d = c, e = a, f = !1;
            if (tn_W.isGeckoBased()) {
                var f = "visible" != tn_X(e, "overflow") && "visible" != tn_X(e.parentNode, "overflow"), h = "static" != tn_X(e, "position");
                if (h || f) {
                    d.x += tn_1c(e, "margin-left");
                    d.y += tn_1c(e, "margin-top");
                    var l = tn_Z(e.parentNode);
                    d.x += l.width;
                    d.y += l.height
                }
                h && (d.x += tn_1c(e, "left"), d.y += tn_1c(e, "top"))
            }
            if ((tn_W.isGeckoBased() || 1 == tn_W.type) && "BackCompat" != document.compatMode || f)self.pageYOffset ? (d.x -= self.pageXOffset,
                d.y -= self.pageYOffset) : (d.x -= document.documentElement.scrollLeft, d.y -= document.documentElement.scrollTop)
        }
        d = tn_Z(a);
        c.x += d.width;
        c.y += d.height;
        "BODY" == a.nodeName && tn_W.isGeckoBased() || (c.x += a.offsetLeft, c.y += a.offsetTop);
        tn_W.isGeckoBased() && 1.8 <= tn_W.revision && a.offsetParent && "BODY" != a.offsetParent.nodeName && "visible" != tn_X(a.offsetParent, "overflow") && (d = tn_Z(a.offsetParent), c.x += d.width, c.y += d.height);
        a.offsetParent && (c.x -= a.offsetParent.scrollLeft, c.y -= a.offsetParent.scrollTop);
        if (d = 1 != tn_W.type)a:{
            d =
                a;
            if (d.offsetParent && "BODY" == d.offsetParent.nodeName && "static" == tn_X(d.offsetParent, "position"))if (0 == tn_W.type && "static" != tn_X(d, "position")) {
                d = !0;
                break a
            } else if (0 != tn_W.type && "absolute" == tn_X(d, "position")) {
                d = !0;
                break a
            }
            d = !1
        }
        if (d) {
            tn_W.isGeckoBased() && (c.x -= self.pageXOffset, c.y -= self.pageYOffset, d = tn_Z(a.offsetParent.parentNode), c.x += d.width, c.y += d.height);
            break
        }
        3 == tn_W.type && a.offsetParent && (d = tn_Z(a.offsetParent), c.x -= d.width, c.y -= d.height);
        a = a.offsetParent
    }
    1 == tn_W.type && !b && document.documentElement &&
    (c.x += document.documentElement.clientLeft, c.y += document.documentElement.clientTop);
    return b && null == a ? (d = tn_td(b), new tn_a(c.x - d.x, c.y - d.y)) : c
}
function tn_ud(a, b) {
    if ("undefined" != typeof a.offsetX) {
        var c, d = a.target || a.srcElement;
        3 == d.nodeType && (d = d.parentNode);
        c = d;
        var d = tn_td(c, b), e = new tn_a(a.offsetX, a.offsetY);
        3 == tn_W.type && (c = tn_Z(c), e.x -= c.width, e.y -= c.height);
        return new tn_a(d.x + e.x, d.y + e.y)
    }
    return "undefined" != typeof a.clientX ? (d = 3 == tn_W.type ? new tn_a(a.pageX - self.pageXOffset, a.pageY - self.pageYOffset) : new tn_a(a.clientX, a.clientY), e = tn_td(b), new tn_a(d.x - e.x, d.y - e.y)) : tn_a.ORIGIN
};
function tn_vd(a) {
    this.ticks = a;
    this.tick = 0
}
tn_vd.prototype.reset = function () {
    this.tick = 0
};
tn_vd.prototype.next = function () {
    this.tick++;
    var a = Math.PI * (this.tick / this.ticks - .5);
    return (Math.sin(a) + 1) / 2
};
tn_vd.prototype.more = function () {
    return this.tick < this.ticks
};
tn_vd.prototype.extend = function () {
    this.tick > this.ticks / 3 && (this.tick = tn_M(this.ticks / 3))
};
var tn_wd = !1;
function tn_xd(a, b, c) {
    this.name = a;
    if ("string" == typeof b) {
        var d = a = tn_I("div", null);
        if (d.innerHTML != b) {
            for (var e = d, f; f = e.firstChild;)tn_Ua(f, tn_Vc), e.removeChild(f);
            d.innerHTML = b
        }
        b = a
    }
    this.contentElem = b;
    b.style.zIndex = 9500;
    this.onclick = c
}
function tn_yd() {
    this.rectPosition_ = new Rect(0, 0, 0, 0);
    this.pixelOffset_ = tn_Y.ZERO;
    this.tabs_ = [];
    this.contentContainers_ = [];
    this.tabImages_ = [];
    this.tabShadowOverlapImages_ = [];
    this.selectedTab_ = this.totalTabWidth_ = 0;
    this.centerSize_ = this.boundSize_(tn_Y.ZERO);
    this.images_ = {};
    this.allowBeside_ = this.allowDownwards_ = this.keepInBounds_ = !1;
    this.tabPos_ = new tn_a(8, 8);
    this.interfaceDirection_ = "ltr"
}
tn_ = tn_yd.prototype;
tn_.create = function (a, b) {
    var c = this.images_, d = tn_zd(c, a, [["iw_n", 628, 6, 0, 0, "iw_n1"], ["iw_n", 628, 6, 0, 0, "iw_n2"], ["iw_w", 6, 598, 0, 0], ["iw_e", 6, 598, 0, 0], ["iw_s0", 628, 6, 0, 0, "iw_s1"], ["iw_s0", 628, 6, 0, 0, "iw_s2"], ["iw_c", 628, 598, 0, 0]]), e = new tn_Y(6, 6);
    tn_4(c, d, "iw_nw", e);
    tn_4(c, d, "iw_ne", e);
    tn_4(c, d, "iw_xtap", new tn_Y(32, 21));
    tn_4(c, d, "iw_xtap_l", new tn_Y(32, 21));
    tn_4(c, d, "iw_xtap_u", new tn_Y(32, 21));
    tn_4(c, d, "iw_xtap_ul", new tn_Y(32, 21));
    tn_4(c, d, "iw_xtap_rd", new tn_Y(21, 32));
    tn_4(c, d, "iw_xtap_ld", new tn_Y(21,
        32));
    tn_4(c, d, "iw_sw0", e, "iw_sw");
    tn_4(c, d, "iw_se0", e, "iw_se");
    tn_Tc(d);
    this.window_ = d;
    var e = new tn_Y(8, 8), f = tn_zd(c, b, [["iws_n", 628, 8, 0, 0, "iws_n1"], ["iws_n", 628, 8, 0, 0, "iws_n2"], ["iws_w", 8, 598, 0, 0], ["iws_e", 8, 598, 0, 0], ["iws_s", 628, 8, 0, 0, "iws_s1"], ["iws_s", 628, 8, 0, 0, "iws_s2"], ["iws_c", 628, 598, 0, 0]]);
    tn_4(c, f, "iws_nw", e);
    tn_4(c, f, "iws_ne", e);
    tn_4(c, f, "iws_sw", e);
    tn_4(c, f, "iws_se", e);
    tn_4(c, f, "iws_tap", new tn_Y(37, 16));
    tn_4(c, f, "iws_tap_l", new tn_Y(32, 16));
    tn_4(c, f, "iws_tap_u", new tn_Y(37, 26));
    tn_4(c,
        f, "iws_tap_ul", new tn_Y(32, 26));
    tn_4(c, f, "iws_tap_rd", new tn_Y(16, 37));
    tn_4(c, f, "iws_tap_ld", new tn_Y(26, 37));
    tn_4(c, f, "iws_tab_dl", new tn_Y(8, 28));
    tn_4(c, f, "iws_tab_dr", new tn_Y(14, 28));
    tn_4(c, f, "iws_tab_l", new tn_Y(8, 28));
    tn_4(c, f, "iws_tab_r", new tn_Y(14, 28));
    tn_P(c.iws_tab_dl);
    tn_P(c.iws_tab_dr);
    tn_P(c.iws_tab_l);
    tn_P(c.iws_tab_r);
    tn_Tc(f);
    this.shadow_ = f;
    e = new tn_Y(14, 13);
    f = tn_4(c, d, "close", e, "close", !0);
    f.style.zIndex = 1E4;
    tn_U(f, "pointer");
    tn_md(f, this, this.onCloseClick_);
    f = tn_4(c, d, "maximize",
        e, "maximize", !0);
    f.style.zIndex = 1E4;
    tn_R(f);
    tn_U(f, "pointer");
    tn_md(f, this, this.maximize);
    c = tn_4(c, d, "restore", e, "restore", !0);
    c.style.zIndex = 10001;
    tn_R(c);
    tn_U(c, "pointer");
    tn_md(c, this, this.restore);
    tn_1(d, "mousedown", this, this.filterMouseDown_);
    tn_1(d, tn_bd, this, this.filterMouseDblClick_);
    tn_1(d, "click", this, this.filterMouseDown_);
    tn_1(d, "contextmenu", this, tn_od);
    tn_1(d, "mousewheel", this, tn_od);
    tn_1(d, "DOMMouseScroll", this, tn_od);
    this.showTap();
    this.hide()
};
tn_.remove = function () {
    tn_V(this.shadow_);
    tn_V(this.window_)
};
tn_.allowMaximizeAndRestoreButtons = function (a) {
    a ? (tn_Q(this.images_.maximize), tn_Q(this.images_.restore)) : (tn_P(this.images_.maximize), tn_P(this.images_.restore))
};
tn_.showCloseButton = function (a) {
    this.images_.close.style.visibility = a ? "visible" : "hidden"
};
tn_.setInterfaceDirection = function (a) {
    this.interfaceDirection_ = !0 === a || "rtl" === a ? "rtl" : "ltr"
};
tn_.keepInBounds = function (a) {
    this.keepInBounds_ = a
};
tn_.keepInScrollpane = function (a) {
    this.keepInScrollpane_ = a
};
tn_.allowDownwards = function (a) {
    this.allowDownwards_ = a
};
tn_.setNodePosition = function (a) {
    if (!a.getClientRects)return this.setRectPosition(tn_ga(a));
    var b = this.getCenterSize(), c = this.images_, d = b.width, e = b.height, f = window.innerWidth || document.body.scrollWidth, b = document.documentElement.scrollLeft || window.scrollX || document.body.scrollLeft, h = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop;
    tn_P(c.iw_xtap);
    tn_P(c.iw_xtap_l);
    tn_P(c.iw_xtap_u);
    tn_P(c.iw_xtap_ul);
    tn_P(c.iw_xtap_ld);
    tn_P(c.iw_xtap_rd);
    tn_P(c.iws_tap);
    tn_P(c.iws_tap_l);
    tn_P(c.iws_tap_u);
    tn_P(c.iws_tap_ul);
    tn_P(c.iws_tap_ld);
    tn_P(c.iws_tap_rd);
    var l, n, m, g, c = a.getClientRects(), k = Array(c.length), q = tn_ga(a);
    a = c[0].top - q.y;
    for (var p = 0; p < c.length; ++p) {
        k[p] = {left: c[p].left, right: c[p].right, top: c[p].top, bottom: c[p].bottom};
        0 < p && k[p].bottom == k[p - 1].bottom && (k[p].left == k[p - 1].right ? (k[p].left = k[p - 1].left, k[p].top = tn_S(k[p].top, k[p - 1].top)) : k[p].right == k[p - 1].left && (k[p].right = k[p - 1].right, k[p].top = tn_S(k[p].top, k[p - 1].top)));
        if (!l || k[p].left <= l.left)l = k[p];
        if (!n || k[p].right >=
            n.right)n = k[p];
        if (!m || k[p].top <= m.top)m = k[p];
        if (!g || k[p].bottom >= g.bottom)g = k[p]
    }
    if (this.allowBeside_ && 21 + d + 6 + 12 + n.right < f)return this.setRectPosition(new Rect(l.left + b, n.top - a, n.right - l.left, n.bottom - n.top));
    if (this.allowBeside_ && 18 + d + 21 < l.left)return this.setRectPosition(new Rect(l.left + b, l.top - a, n.right - l.left, l.bottom - l.top));
    this.allowDownwards_ && 21 + e + 6 + 12 + (1 < this.tabs_.length ? 20 : 0) > q.y - (this.keepInScrollpane_ ? h : 0) ? (d = this.allowBeside_, this.allowBeside_ = !1, m = this.setRectPosition(new Rect(g.left +
    b, m.top - a, g.right - g.left, g.bottom - m.top))) : (d = this.allowBeside_, this.allowBeside_ = !1, m = this.setRectPosition(new Rect(m.left + b, m.top - a, m.right - m.left, g.bottom - m.top)));
    this.allowBeside_ = d;
    return m
};
tn_.setRectPosition = function (a, b) {
    var c = this.getCenterSize(), d = this.images_, e = c.width, f = c.height, h = document.body.scrollWidth, l = document.documentElement.scrollLeft || window.scrollX || document.body.scrollLeft, n = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop;
    tn_P(d.iw_xtap);
    tn_P(d.iw_xtap_l);
    tn_P(d.iw_xtap_u);
    tn_P(d.iw_xtap_ul);
    tn_P(d.iw_xtap_ld);
    tn_P(d.iw_xtap_rd);
    tn_P(d.iws_tap);
    tn_P(d.iws_tap_l);
    tn_P(d.iws_tap_u);
    tn_P(d.iws_tap_ul);
    tn_P(d.iws_tap_ld);
    tn_P(d.iws_tap_rd);
    var m = 0, c = 0, g, k, q, p, t, r = 0, u = this.allowBeside_;
    u && 21 + e + 6 + 12 + a.x + a.w < l + h ? (k = !0, f = d.iw_xtap_ld, n = d.iws_tap_ld) : u && 18 + e + 21 + l < a.x ? (q = !0, f = d.iw_xtap_rd, n = d.iws_tap_rd, c = 5) : (this.allowDownwards_ && 21 + f + 6 + 12 + (1 < this.tabs_.length ? 20 : 0) + (this.keepInScrollpane_ ? n : 0) > a.y ? (f = d.iw_xtap_u, n = d.iws_tap_u, m = 0, g = !0) : (f = d.iw_xtap, n = d.iws_tap, m = 0), tn_M(a.x + a.w / 2) + 32 + 6 + 12 > l + h && (f == d.iw_xtap_u ? (f = d.iw_xtap_ul, n = d.iws_tap_ul) : (f = d.iw_xtap_l, n = d.iws_tap_l), c = 5, m = 32), p = tn_M((e - 32) / 2), this.keepInBounds_ && (p + 6 + 12 + m + l > a.x + tn_M(a.w /
    2) ? (p = a.x + tn_M(a.w / 2) - 6 - 12 - m - l, 0 > p && (r = tn_S(-p, tn_M(a.w / 2)), p = 0)) : a.x + tn_M(a.w / 2) - m + e - p + 18 > l + h && (g ? (f = d.iw_xtap_ul, n = d.iws_tap_ul) : (f = d.iw_xtap_l, n = d.iws_tap_l), c = 5, m = 32, p = a.x + tn_M(a.w / 2) - m + e + 6 + 12 - h - l, p > e - 32 && (r = tn_T(e - 32 - p, -tn_M(a.w / 2)), p = e - 32))), t = e - 32 - p);
    tn_Q(f);
    tn_Q(n);
    this.pointerOffset_ = k ? 0 : q ? 6 + e + 21 : 6 + p + m;
    e = this.pixelOffset_ = b || tn_Y.ZERO;
    r = this.pointerOffset_ - r;
    d = k || q ? 6 : g ? 0 : this.getTotalSize().height + (1 < this.tabs_.length ? 20 : 0);
    r -= e.width;
    d -= e.height;
    e = new tn_a(a.x + (k ? a.w : q ? 0 : a.w / 2) - r, a.y + (k ||
    q ? a.h / 2 : g ? a.h : 0) - d);
    tn_J(this.window_, e);
    tn_J(this.shadow_, e);
    this.rectPosition_ = a;
    this.nodePosition_ = void 0;
    return this.position_(k, q, g, p, t, f, n, c)
};
tn_.position_ = function (a, b, c, d, e, f, h, l) {
    var n = !(a || b || c);
    this.tapImg_ = f;
    this.shadowTapImg_ = h;
    var m = this.getCenterSize(), g = this.images_, k = m.width, q = m.height, p = 1 < this.tabs_.length ? this.totalTabWidth_ : 0;
    c ? (tn_N(g.iw_n1, tn_T(d, 0)), tn_N(g.iw_n2, tn_T(e, 0)), tn_N(g.iw_s1, k - p), tn_N(g.iw_s2, 0), tn_N(g.iws_n1, tn_T(d, 0)), tn_N(g.iws_n2, tn_T(e, 0)), tn_N(g.iws_s1, k - p), tn_N(g.iws_s2, 0)) : n ? (tn_N(g.iw_n1, k - p), tn_N(g.iw_n2, 0), tn_N(g.iw_s1, tn_T(d, 0)), tn_N(g.iw_s2, tn_T(e, 0)), tn_N(g.iws_n1, k - p), tn_N(g.iws_n2, 0), tn_N(g.iws_s1,
        tn_T(d, 0)), tn_N(g.iws_s2, tn_T(e, 0))) : (tn_N(g.iw_n1, k), tn_N(g.iw_n2, 0), tn_N(g.iw_s1, k - p), tn_N(g.iw_s2, 0), tn_N(g.iws_n1, k), tn_N(g.iws_n2, 0), tn_N(g.iws_s1, k - p), tn_N(g.iws_s2, 0));
    tn_Sc(g.iw_c, m);
    a ? (tn_O(g.iw_w, tn_T(q - 32, 0)), tn_O(g.iw_e, tn_T(q, 32)), tn_O(g.iws_w, tn_T(q - 32, 0)), tn_O(g.iws_e, tn_T(q, 32))) : b ? (tn_O(g.iw_e, tn_T(q - 32, 0)), tn_O(g.iw_w, tn_T(q, 32)), tn_O(g.iws_e, tn_T(q - 32, 0)), tn_O(g.iws_w, tn_T(q, 32))) : (tn_O(g.iw_w, q), tn_O(g.iw_e, q), tn_O(g.iws_w, q), tn_O(g.iws_e, q));
    e = a ? 15 : 0;
    var m = e + 5 - 2, t = e + 6, r = t + 5, u =
        t + k, A = u + 5, C = a ? 0 : b ? u : t + d, F = C + l, E = C + 32, G = E + 5, k = c ? 15 : !a && !b && 1 < this.tabs_.length ? 20 : 0, B = k + 5 - 2, v = k + 6, D = v + 5, w = v + (a || b ? tn_T(q, 32) : q), y = w + 5, q = c || a || b ? w : 0;
    l = q + 5 - (c || a || b ? 0 : 2);
    d = c || a || b ? w + 6 - 1 : 0;
    var H = new tn_a(t, w), I = new tn_a(r, y), J = new tn_a(t, k), K = new tn_a(r, B);
    tn_J(g.iw_nw, new tn_a(e, k));
    tn_J(g.iws_nw, new tn_a(m, B));
    n ? (tn_J(g.iw_n1, new tn_a(t + p, k)), tn_J(g.iws_n1, new tn_a(r + p, B)), tn_J(g.iw_s1, H), tn_J(g.iws_s1, I), tn_J(g.iw_s2, new tn_a(E, w)), tn_J(g.iws_s2, new tn_a(G, y)), tn_P(g.iws_tab_dl), tn_P(g.iws_tab_dr),
        tn_Q(g.iws_tab_l), tn_Q(g.iws_tab_r), tn_J(g.iws_tab_l, new tn_a(m, l)), tn_J(g.iws_tab_r, new tn_a(r + p - 14, l))) : (tn_J(g.iw_n1, J), tn_J(g.iws_n1, K), tn_J(g.iw_s2, H), tn_J(g.iws_s2, I), tn_J(g.iw_s1, new tn_a(t + p, w)), tn_J(g.iws_s1, new tn_a(r + p, y)), tn_Q(g.iws_tab_dl), tn_Q(g.iws_tab_dr), tn_P(g.iws_tab_l), tn_P(g.iws_tab_r), tn_J(g.iws_tab_dl, new tn_a(m, l)), tn_J(g.iws_tab_dr, new tn_a(r + p - 14, l)));
    c ? (tn_J(g.iw_n2, new tn_a(E, k)), tn_J(g.iws_n2, new tn_a(G, B))) : (tn_J(g.iw_n2, J), tn_J(g.iws_n2, K));
    tn_J(g.iw_ne, new tn_a(u, k));
    tn_J(g.iws_ne, new tn_a(A, B));
    tn_J(g.iw_w, new tn_a(e, v + (a ? 32 : 0)));
    tn_J(g.iws_w, new tn_a(m, D + (a ? 32 : 0)));
    tn_J(g.iw_c, new tn_a(t, v));
    tn_J(g.iws_c, new tn_a(r, D));
    tn_N(g.iw_c, u - t);
    tn_O(g.iw_c, w - v);
    tn_N(g.iws_c, A - r);
    tn_O(g.iws_c, y - D);
    tn_J(g.iw_e, new tn_a(u, v + (b ? 32 : 0)));
    tn_J(g.iws_e, new tn_a(A, D + (b ? 32 : 0)));
    tn_J(g.iw_sw, new tn_a(e, w));
    tn_J(g.iws_sw, new tn_a(m, y));
    tn_J(g.iw_se, new tn_a(u, w));
    tn_J(g.iws_se, new tn_a(A, y));
    a ? (tn_J(f, new tn_a(0, v)), tn_J(h, new tn_a(0, v))) : b ? (tn_J(f, new tn_a(u, v)), tn_J(h, new tn_a(A,
        v))) : c ? (tn_J(f, new tn_a(C, 0)), tn_J(h, new tn_a(F, 0))) : (tn_J(f, new tn_a(C, w)), tn_J(h, new tn_a(F, y)));
    a = "rtl" == this.interfaceDirection_ ? -0 + t : u - 14 + 0;
    b = v - 0;
    tn_J(g.close, new tn_a(a, b));
    "hidden" != g.close.style.visibility && (a = "rtl" == this.interfaceDirection_ ? a + 16 : a - 16);
    a = new tn_a(a, b);
    tn_J(g.maximize, a);
    tn_J(g.restore, a);
    this.tabPos_ = new tn_a(e + 8, k + 8);
    for (a = 0; a < this.contentContainers_.length; a++)b = this.contentContainers_[a], tn_J(b, this.tabPos_);
    if (2 > this.tabs_.length)tn_P(g.iws_tab_l), tn_P(g.iws_tab_r), tn_P(g.iws_tab_dl),
        tn_P(g.iws_tab_dr), tn_Q(g.iw_sw), tn_Q(g.iws_sw), tn_Q(g.iw_nw), tn_Q(g.iws_nw); else for (n ? (tn_P(g.iw_nw), tn_P(g.iws_nw), tn_Q(g.iw_sw), tn_Q(g.iws_sw)) : (tn_P(g.iw_sw), tn_P(g.iws_sw), tn_Q(g.iw_nw), tn_Q(g.iws_nw)), a = 0; a < this.tabs_.length; ++a) {
        g = this.tabs_[a];
        k = g.images;
        f = g.textWidth;
        b = g.labelNode;
        var r = b.style, x;
        0 < a && (x = this.tabShadowOverlapImages_[a - 1]);
        tn_P(k.iw_tabback_dl);
        tn_P(k.iw_tabback_dm);
        tn_P(k.iw_tabback_dr);
        tn_P(k.iw_tabback_l);
        tn_P(k.iw_tabback_m);
        tn_P(k.iw_tabback_r);
        tn_P(k.iw_tab_dl);
        tn_P(k.iw_tab_dm);
        tn_P(k.iw_tab_dr);
        tn_P(k.iw_tab_l);
        tn_P(k.iw_tab_m);
        tn_P(k.iw_tab_r);
        tn_P(k.iws_tab_m);
        tn_P(k.iws_tab_dm);
        x ? (tn_P(x.iws_tab_do), tn_P(x.iws_tab_o)) : (tn_P(k.iw_tab_1l), tn_P(k.iw_tab_1dl), tn_P(k.iw_tabback_1l), tn_P(k.iw_tabback_1dl), tn_P(k.iws_tab_1l), tn_P(k.iws_tab_1dl));
        var z;
        c = this.window_.style.zIndex;
        n ? (this.selectedTab_ == a ? (h = 0 == a ? k.iw_tab_1l : k.iw_tab_l, p = k.iw_tab_m, t = k.iw_tab_r, ++c) : (h = 0 == a ? k.iw_tabback_1l : k.iw_tabback_l, p = k.iw_tabback_m, t = k.iw_tabback_r), k = k.iws_tab_m, x && (z = x.iws_tab_o), r.paddingTop =
            tn_L(4), r.paddingBottom = tn_L(0)) : (this.selectedTab_ == a ? (h = 0 == a ? k.iw_tab_1dl : k.iw_tab_dl, p = k.iw_tab_dm, t = k.iw_tab_dr, ++c) : (h = 0 == a ? k.iw_tabback_1dl : k.iw_tabback_dl, p = k.iw_tabback_dm, t = k.iw_tabback_dr), k = k.iws_tab_dm, x && (z = x.iws_tab_do), r.paddingTop = tn_L(4), r.paddingBottom = "");
        tn_Q(h);
        tn_Q(p);
        tn_Q(t);
        tn_Q(k);
        r = g.offset + (0 == a ? 6 : 11);
        tn_J(h, new tn_a(e + g.offset, q));
        tn_J(p, new tn_a(e + r, q));
        tn_N(p, f);
        tn_J(k, new tn_a(m + 2 + r, l));
        tn_N(k, f);
        tn_J(t, new tn_a(e + r + f, q));
        z && (tn_Q(z), tn_J(z, new tn_a(m + r - 14 + 2, l)), z.parentNode ||
        this.shadow_.appendChild(z));
        h.style.zIndex = c;
        p.style.zIndex = c;
        t.style.zIndex = c;
        f = f + 2 + 3;
        tn_N(b, f);
        tn_J(b, new tn_a(e + r - 2, d));
        tn_Q(b);
        b.style.zIndex = c + 1;
        !b.parentNode && 0 < g.textWidth && this.window_.appendChild(b)
    }
};
tn_.resetPixelPosition = function () {
    this.nodePosition_ ? this.setNodePosition(this.nodePosition_, this.pixelOffset_) : this.rectPosition_ && this.setRectPosition(this.rectPosition_, this.pixelOffset_)
};
tn_.getCenterSize = function () {
    return new tn_Y(tn_T(this.centerSize_.width, this.totalTabWidth_), this.centerSize_.height)
};
tn_.reset = function (a, b, c, d, e) {
    this.setContent(c, b, e);
    this.setRectPosition(a, d);
    this.show();
    tn_R(this.images_.restore)
};
tn_.hide = function () {
    this.tapImg_ && tn_P(this.tapImg_);
    this.shadowTapImg_ && tn_P(this.shadowTapImg_);
    tn_P(this.window_);
    tn_P(this.shadow_)
};
tn_.show = function () {
    this.isHidden() && (tn_Q(this.window_), tn_Q(this.shadow_), this.tapImg_ && tn_Q(this.tapImg_), this.shadowTapImg_ && tn_Q(this.shadowTapImg_))
};
tn_.showTap = function () {
};
tn_.isHidden = function () {
    return "none" == this.window_.style.display
};
tn_.selectTab = function (a) {
    if (a != this.selectedTab_) {
        this.setTab_(a);
        var b = this.contentContainers_;
        tn_Yc(b, tn_P);
        tn_Q(b[a]);
        var c = this;
        window.setTimeout(function () {
            c.resetPixelPosition()
        }, 0)
    }
};
tn_.onCloseClick_ = function () {
    tn_0(this, "closeclick")
};
tn_.maximize = function (a) {
    if (!this.isMaximized_) {
        tn_0(this, "maximizeclick");
        this.images_.restore.style.visibility = "";
        this.smallSize_ = this.centerSize_;
        this.smallTabs_ = this.tabs_;
        this.smallSelectedTab_ = this.selectedTab_;
        this.maximizedSize_ = this.maximizedSize_ || new tn_Y(628, 598);
        var b = new tn_Y(4 + this.maximizedSize_.width, 4 + this.maximizedSize_.height);
        tn_W.isGeckoBased() && (b.width += 1);
        this.grow_(b, a)
    }
};
tn_.restore = function (a) {
    this.isMaximized_ && (tn_0(this, "restoreclick"), tn_R(this.images_.restore), this.setContent(this.maximizedSize_, this.smallTabs_, this.smallSelectedTab_), this.grow_(this.smallSize_, a))
};
tn_.grow_ = function (a, b) {
    this.growSiner_ = new tn_vd(!0 === b ? 1 : 10);
    this.growStartSize_ = this.centerSize_;
    this.growEndSize_ = a;
    this.doGrow_()
};
tn_.doGrow_ = function () {
    var a = this.growSiner_.next();
    this.growSiner_.more() && tn_Uc(this, this.doGrow_, 10);
    var b = this.growStartSize_.width + (this.growEndSize_.width - this.growStartSize_.width) * a, a = this.growStartSize_.height + (this.growEndSize_.height - this.growStartSize_.height) * a;
    this.setCenterSize_(new tn_Y(b, a));
    this.resetPixelPosition();
    this.updateContentSize();
    this.growSiner_.more() || this.growDone_()
};
tn_.growDone_ = function () {
    this.isMaximized_ ? (this.isMaximized_ = !1, tn_0(this, "restoreend")) : (this.isMaximized_ = !0, tn_0(this, "maximizeend"), this.maximizedSize_ && this.maximizedTabs_ && this.setContent(this.maximizedSize_, this.maximizedTabs_, this.maximizedSelectedTab_))
};
tn_.setCenterSize_ = function (a) {
    return a = this.centerSize_ = this.boundSize_(a)
};
tn_.filterMouseDblClick_ = function (a) {
    if (1 == tn_W.type)tn_nd(a); else {
        var b = tn_ud(a, this.window_);
        b.y <= this.getWindowHeight() && tn_nd(a)
    }
};
tn_.filterMouseDown_ = function (a) {
    if (1 == tn_W.type)tn_od(a); else {
        var b = tn_ud(a, this.window_);
        b.y <= this.getWindowHeight() && (a.cancelDrag = !0)
    }
};
tn_.getWindowHeight = function () {
    return this.getCenterSize().height + 12
};
tn_.getTotalSize = function () {
    var a = this.getCenterSize();
    return new tn_Y(a.width + 12, a.height + 21 + 6)
};
tn_.setContent = function (a, b, c) {
    this.clearContent();
    a = new tn_Y(4 + a.width, 4 + a.height);
    tn_W.isGeckoBased() && (a.width += 1);
    var d = this.setCenterSize_(a), e = [];
    this.tabs_ = e;
    var f = c || 0;
    a = new tn_Y(d.width + -4, d.height + -4);
    var h = this.tabPos_, l = this.contentContainers_ = [];
    for (c = 0; c < b.length; c++) {
        var n = tn_I("div", this.window_, h, a);
        n.style.overflow = "hidden";
        c != f && tn_P(n);
        n.style.zIndex = 10;
        n.appendChild(b[c].contentElem);
        l.push(n)
    }
    if (1 < b.length) {
        a = [];
        h = new tn_Y(11, 26);
        l = new tn_Y(14, 26);
        this.initializeTabs_();
        for (c =
                 0; c < b.length; ++c) {
            var m = {
                images: b[c].images || {},
                textWidth: b[c].textWidth || 0,
                offset: b[c].offset || 0,
                name: b[c].name,
                contentElem: b[c].contentElem,
                onclick: b[c].onclick
            }, g = m.images;
            tn_zd(g, this.window_, [["iw_tabback_dm", 1, 26, 0, 0], ["iw_tabback_m", 1, 26, 0, 0], ["iw_tab_dm", 1, 26, 0, 0], ["iw_tab_m", 1, 26, 0, 0]]);
            tn_4(g, this.window_, "iw_tabback_dl", h);
            tn_4(g, this.window_, "iw_tabback_dr", l);
            tn_4(g, this.window_, "iw_tabback_l", h);
            tn_4(g, this.window_, "iw_tabback_r", l);
            tn_4(g, this.window_, "iw_tab_dl", h);
            tn_4(g, this.window_,
                "iw_tab_dr", l);
            tn_4(g, this.window_, "iw_tab_l", h);
            tn_4(g, this.window_, "iw_tab_r", l);
            tn_zd(g, this.shadow_, [["iws_tab_dm", 1, 28, 0, 0], ["iws_tab_m", 1, 28, 0, 0]]);
            n = function (a, b) {
                tn_P(b);
                a.tabImages_.push(b)
            };
            if (0 == c) {
                var k = new tn_Y(6, 26);
                tn_4(g, this.window_, "iw_tab_1dl", k);
                tn_4(g, this.window_, "iw_tab_1l", k);
                tn_4(g, this.window_, "iw_tabback_1dl", k);
                tn_4(g, this.window_, "iw_tabback_1l", k);
                k = new tn_Y(8, 28);
                tn_4(g, this.shadow_, "iws_tab_1dl", k);
                tn_4(g, this.shadow_, "iws_tab_1l", k);
                n(this, g.iw_tab_1dl);
                n(this, g.iw_tab_1l);
                n(this, g.iw_tabback_1dl);
                n(this, g.iw_tabback_1l);
                n(this, g.iws_tab_1dl);
                n(this, g.iws_tab_1l)
            }
            n(this, g.iw_tabback_dl);
            n(this, g.iw_tabback_dm);
            n(this, g.iw_tabback_dr);
            n(this, g.iw_tabback_l);
            n(this, g.iw_tabback_m);
            n(this, g.iw_tabback_r);
            n(this, g.iw_tab_dl);
            n(this, g.iw_tab_dm);
            n(this, g.iw_tab_dr);
            n(this, g.iw_tab_l);
            n(this, g.iw_tab_m);
            n(this, g.iw_tab_r);
            n(this, g.iws_tab_dm);
            n(this, g.iws_tab_m);
            g = document.createElement("div");
            m.labelNode = g;
            tn_O(g, 20);
            k = g.style;
            g.style.overflow = "hidden";
            k.fontWeight = "bold";
            k.fontFamily = "Arial,sans-serif";
            k.fontSize = tn_L(12);
            k.textAlign = "center";
            k.display = "inline";
            tn_Ad(g);
            tn_K(m.name, g);
            (function (a, b, c, d) {
                tn_md(d, a, function () {
                    a.selectTab(b);
                    c && c()
                })
            })(this, c, b[c].onclick, g);
            this.tabImages_.push(g);
            a.push(g);
            this.tabs_.push(m);
            0 < c && (m = {}, g = new tn_Y(14, 28), tn_4(m, this.shadow_, "iws_tab_do", g), tn_4(m, this.shadow_, "iws_tab_o", g), n(this, m.iws_tab_do), n(this, m.iws_tab_o), this.tabShadowOverlapImages_.push(m))
        }
        var q = this;
        tn_5c(a, function (a) {
            var b;
            if (a.length == e.length) {
                for (var c =
                    0; c < a.length; ++c) {
                    var g = b = e[c];
                    0 != a[c].width && (g.textWidth = tn_T(0, a[c].width - 2 - 3));
                    tn_Q(g.labelNode);
                    q.window_.appendChild(g.labelNode);
                    if (0 < c) {
                        var h = e[c - 1];
                        g.offset = h.offset + h.textWidth + (1 == c ? 6 : 11) + 14 - 11
                    }
                }
                q.totalTabWidth_ = b.offset + b.textWidth + 14 + 11 - 6;
                if (q.totalTabWidth_ + 30 > d.width)for (q.setCenterSize_(new tn_Y(q.totalTabWidth_ + 30, d.height)), a = new tn_Y(q.totalTabWidth_ + 30 + -4, d.height + -4), c = 0; c < q.contentContainers_.length; ++c)tn_Sc(q.contentContainers_[c], a)
            }
            q.setTab_(f);
            q.resetPixelPosition()
        })
    } else m =
    {
        images: b[0].images || {},
        textWidth: b[0].textWidth || 0,
        offset: b[0].offset || 0,
        name: b[0].name,
        contentElem: b[0].contentElem,
        onclick: b[0].onclick
    }, this.tabs_.push(m), this.resetPixelPosition()
};
tn_.updateContentSize = function () {
    for (var a = new tn_Y(this.centerSize_.width + -4, this.centerSize_.height + -4), b = 0; b < this.contentContainers_.length; b++) {
        var c = this.contentContainers_[b];
        tn_Sc(c, a)
    }
};
tn_.setMaximizedContent = function (a, b, c) {
    this.maximizedSize_ = a;
    this.maximizedTabs_ = b;
    this.maximizedSelectedTab_ = c;
    this.images_.maximize.style.visibility = ""
};
tn_.clearContent = function () {
    var a = this.contentContainers_;
    tn_Yc(a, tn_V);
    a.length = 0;
    a = this.tabImages_;
    tn_Yc(a, tn_V);
    this.selectedTab_ = a.length = 0
};
tn_.boundSize_ = function (a) {
    return new tn_Y(tn_T(a.width, 32), tn_T(a.height, 0))
};
tn_.initializeTabs_ = function () {
    this.tabImages_ = [];
    this.tabShadowOverlapImages_ = [];
    this.totalTabWidth_ = 0
};
tn_.setTab_ = function (a) {
    tn_Ad(this.tabs_[this.selectedTab_].labelNode);
    this.selectedTab_ = a;
    a = this.tabs_[a].labelNode;
    var b = a.style;
    b.color = "";
    b.textDecoration = "";
    tn_U(a, "")
};
function tn_Ad(a) {
    var b = a.style;
    b.color = "#0000cc";
    b.textDecoration = "underline";
    tn_U(a, "pointer")
}
function tn_zd(a, b, c) {
    b = tn_I("div", b, null, null, !1, !0);
    for (var d = 0; d < c.length; d++) {
        var e = c[d], f = new tn_Y(e[1], e[2]), h = new tn_a(e[3], e[4]), l = tn_Pc + e[0] + ".png", f = tn_6c(l, b, h, f, !0, !0);
        a[e[5] || e[0]] = f
    }
    return b
}
function tn_4(a, b, c, d, e, f) {
    if (1 == tn_W.type && 7 > tn_W.version)return b = tn_6c(tn_Pc + c + (f ? ".gif" : ".png"), b, new tn_a(0, 0), d, !0, !0), a[e || c] = b;
    tn_wd || (tn_wd = !0, d = document.createElement("link"), d.rel = "stylesheet", d.type = "text/css", d.href = tn_Pc + "iw_sprite.css", document.getElementsByTagName("head")[0].appendChild(d));
    d = document.createElement("div");
    d.className = "SPRITE_" + c;
    d.style.overflow = "hidden";
    b.appendChild(d);
    return a[e || c] = d
};
if (window.jstiming) {
    window.jstiming.beaconImageReferences_ = {};
    window.jstiming.reportCounter_ = 1;
    var tn_Bd = function (a, b, c) {
        var d = a.t[b], e = a.t.start;
        if (d && (e || c))return d = a.t[b][0], e = void 0 != c ? c : e[0], a = d - e, Math.round(a)
    }, tn_Cd = function (a, b, c) {
        var d = "";
        window.jstiming.srt && (d += "&srt=" + window.jstiming.srt, delete window.jstiming.srt);
        window.jstiming.pt && (d += "&tbsrt=" + window.jstiming.pt, delete window.jstiming.pt);
        try {
            window.external && window.external.tran ? d += "&tran=" + window.external.tran : window.gtbExternal &&
            window.gtbExternal.tran ? d += "&tran=" + window.gtbExternal.tran() : window.chrome && window.chrome.csi && (d += "&tran=" + window.chrome.csi().tran)
        } catch (e) {
        }
        var f = window.chrome;
        if (f && (f = f.loadTimes)) {
            f().wasFetchedViaSpdy && (d += "&p=s");
            if (f().wasNpnNegotiated) {
                var d = d + "&npn=1", h = f().npnNegotiatedProtocol;
                h && (d += "&npnv=" + (encodeURIComponent || escape)(h))
            }
            f().wasAlternateProtocolAvailable && (d += "&apa=1")
        }
        var l = a.t, n = l.start, f = [], h = [], m;
        for (m in l)if ("start" != m && 0 != m.indexOf("_")) {
            var g = l[m][1];
            g ? l[g] && h.push(m + "." +
            tn_Bd(a, m, l[g][0])) : n && f.push(m + "." + tn_Bd(a, m))
        }
        delete l.start;
        if (b)for (var k in b)d += "&" + k + "=" + b[k];
        (b = c) || (b = "https:" == document.location.protocol ? "https://csi.gstatic.com/csi" : "http://csi.gstatic.com/csi");
        return a = [b, "?v=3", "&s=" + (window.jstiming.sn || "translate") + "&action=", a.name, h.length ? "&it=" + h.join(",") : "", d, "&rt=", f.join(",")].join("")
    }, tn_Dd = function (a, b, c) {
        a = tn_Cd(a, b, c);
        if (!a)return "";
        b = new Image;
        var d = window.jstiming.reportCounter_++;
        window.jstiming.beaconImageReferences_[d] = b;
        b.onload =
            b.onerror = function () {
                window.jstiming && delete window.jstiming.beaconImageReferences_[d]
            };
        b.src = a;
        b = null;
        return a
    };
    window.jstiming.report = function (a, b, c) {
        if ("prerender" == document.webkitVisibilityState) {
            var d = !1, e = function () {
                if (!d) {
                    b ? b.prerender = "1" : b = {prerender: "1"};
                    var f;
                    "prerender" == document.webkitVisibilityState ? f = !1 : (tn_Dd(a, b, c), f = !0);
                    f && (d = !0, document.removeEventListener("webkitvisibilitychange", e, !1))
                }
            };
            document.addEventListener("webkitvisibilitychange", e, !1);
            return ""
        }
        return tn_Dd(a, b, c)
    }
}
;
var tn_5, tn_6 = null, tn_7, tn_Ed, tn_Fd, tn_Gd = !1, tn_Hd = !1, tn_8 = !1, tn_9 = !1, tn_Id = {
    right: "left",
    left: "right",
    ltr: "rtl",
    rtl: "ltr"
};
function tn_Jd(a) {
    return a.substring(0, 1).toUpperCase() + a.substring(1)
}
var _intlStrings = {
    _originalText: "Original Text:",
    _interfaceDirection: "ltr",
    _interfaceAlign: "left",
    _langpair: "",
    _currentBy: "",
    _unknown: "unknown",
    _suggestTranslation: "Suggest a translation",
    _submit: "Submit",
    _feedbackUrl: "https://translate.google.com/translate_suggestion",
    _suggestThanks: "Thank you for helping us improve the quality of our translations.",
    _reverse: !1,
    _staticContentPath: ""
};
function tn_Kd(a) {
    if (3 == a.nodeType)return a.nodeValue;
    if (1 == a.nodeType) {
        for (var b = "", c = 0; c < a.childNodes.length; ++c)b += tn_Kd(a.childNodes[c]);
        return b
    }
    return ""
}
function tn_Ld(a, b) {
    if (a)if (3 == b.nodeType)a.appendChild(document.createTextNode(b.nodeValue)); else if (1 == b.nodeType) {
        var c;
        if ("a" === b.nodeName || "A" === b.nodeName) {
            c = document.createElement("a");
            var d = b.getAttribute("href");
            d && c.setAttribute("href", d);
            a.appendChild(c)
        } else c = a;
        for (d = 0; d < b.childNodes.length; ++d)tn_Ld(c, b.childNodes[d])
    }
}
function _setupIW() {
    if (!tn_Gd) {
        _intlStrings._staticContentPath && (tn_Pc = _intlStrings._staticContentPath);
        tn_5 = new tn_yd;
        tn_7 = document.createElement("div");
        tn_7.id = "google-infowindow";
        tn_7.className = "notranslate";
        tn_Ed = document.createElement("span");
        tn_7.onmouseover = tn_Md;
        tn_7.onmouseout = tn_Nd;
        document.body.appendChild(tn_Ed);
        document.body.appendChild(tn_7);
        var a = document.createElement("div");
        document.body.appendChild(a);
        tn_P(a);
        a.innerHTML = '<iframe id="google-feedback-frame" name="" + FEEDBACK_TARGET_IFRAME_NAME + ""></iframe>';
        tn_5.create(tn_7, tn_Ed);
        tn_7.firstChild.style.zIndex = 2147483647;
        tn_Ed.firstChild.style.zIndex = 2147483647;
        tn_5.showCloseButton(!0);
        tn_5.keepInBounds(!0);
        tn_5.keepInScrollpane(!0);
        tn_5.allowDownwards(!0);
        tn_5.allowMaximizeAndRestoreButtons(!1);
        tn_5.setInterfaceDirection(_intlStrings._interfaceDirection);
        tn_gd(tn_5, "closeclick", function () {
            tn_Nd(!0);
            tn_9 && tn_Od(!1)
        });
        var b = document.getElementById("gt-nvframe");
        b && window.addEventListener("scroll", function () {
            b.style.top = -document.body.scrollTop + "px"
        }, !1);
        tn_Gd = !0
    }
}
var tn_$ = null;
function tn_Md() {
    tn_Hd = !0;
    tn_Pd(tn_6)
}
function tn_Pd(a) {
    if (a && (null !== tn_$ && (window.clearTimeout(tn_$), tn_$ = null), !tn_8))if (tn_6 == a)tn_9 || (tn_Fd = tn_6.style.backgroundColor, tn_6.style.backgroundColor = "#E6ECF9"); else {
        tn_9 && (tn_5.restore(!0), tn_9 = !1);
        for (var b, c = a.cloneNode(!0), d = a.childNodes.length - 1; 0 <= d; --d)"google-src-text" == a.childNodes[d].className && (b = a.childNodes[d].cloneNode(!0), c.removeChild(c.childNodes[d]), b.className = "google-src-active-text");
        if (b) {
            tn_5.showCloseButton(!0);
            tn_Fd = a.style.backgroundColor;
            a.style.backgroundColor =
                "#E6ECF9";
            var e = document.createElement("div"), d = document.createElement("div"), f = document.createElement("img"), h = document.createElement("div");
            h.appendChild(f);
            f.width = 48;
            f.height = 17;
            f.border = 0;
            f.style.display = "inline";
            f.style.padding = "0px";
            f.style.border = "0px solid black";
            h.style.margin = "0px";
            h.style.marginBottom = "-17px";
            h.style.padding = "0px";
            h.style.textAlign = tn_Id[_intlStrings._interfaceAlign];
            f.src = "http://www.google.com/images/logo_smallest.png";
            f.style["margin" + tn_Jd(_intlStrings._interfaceAlign)] =
                "6px";
            f.style["margin" + tn_Jd(tn_Id[_intlStrings._interfaceAlign])] = tn_L(18);
            e.appendChild(h);
            e.appendChild(d);
            d.appendChild(document.createTextNode(_intlStrings._originalText));
            d.style.color = "#333";
            d.style.direction = _intlStrings._interfaceDirection;
            d.style.textAlign = _intlStrings._interfaceAlign;
            d.style.fontWeight = "bold";
            d.style.fontSize = "12px";
            d.style.minHeight = "19px";
            d.style.fontFamily = "arial,sans-serif";
            d.style["margin" + tn_Jd(tn_Id[_intlStrings._interfaceAlign])] = tn_L(72);
            d = document.createElement("div");
            d.className = "google-src-active-text";
            d.style.lineHeight = "19px";
            d.style.direction = _intlStrings._interfaceDirection;
            d.style.textAlign = _intlStrings._interfaceAlign;
            tn_Ld(d, b);
            e.appendChild(d);
            e.style.zIndex = 2147483647;
            if (0 == _intlStrings._langpair.length)tn_6 = a, tn_4c(e, function (a) {
                tn_5.hide();
                tn_5.setContent(a, [new tn_xd(_intlStrings._originalText, e)]);
                tn_5.setNodePosition(tn_6);
                tn_5.show()
            }, (document.width || document.body.scrollWidth) / 2); else {
                var d = e.cloneNode(!0), l = document.createElement("div");
                l.appendChild(d);
                d = document.createElement("div");
                f = document.createElement("span");
                h = document.createElement("div");
                h.style.direction = _intlStrings._interfaceDirection;
                h.style.textAlign = _intlStrings._interfaceAlign;
                h.style.marginTop = tn_L(5);
                d.appendChild(h);
                var n = document.createElement("img");
                n.src = "http://www.google.com/images/zippy_plus_sm.gif";
                n.width = 12;
                n.height = 12;
                n.border = 0;
                n.style.border = "none";
                n.style.verticalAlign = "middle";
                h.appendChild(n);
                h.appendChild(document.createTextNode(" "));
                h.appendChild(f);
                f.appendChild(document.createTextNode(_intlStrings._suggestTranslation));
                f.style.direction = _intlStrings._interfaceDirection;
                f.style.textAlign = _intlStrings._interfaceAlign;
                f.style.color = "#0000CC";
                f.style.textDecoration = "underline";
                f.style.fontFamily = "arial,sans-serif";
                f.style.fontSize = "12px";
                h.onclick = tn_Qd;
                tn_U(f, "pointer");
                e.appendChild(d);
                var m = document.createElement("div"), d = document.createElement("div"), f = document.createElement("span");
                d.style.direction = _intlStrings._interfaceDirection;
                d.style.textAlign = _intlStrings._interfaceAlign;
                d.style.marginTop = tn_L(5);
                d.style.marginBottom =
                    tn_L(6);
                m.appendChild(d);
                h = document.createElement("img");
                h.src = "http://www.google.com/images/zippy_minus_sm.gif";
                h.width = 12;
                h.height = 12;
                h.border = 0;
                h.style.border = "none";
                h.style.verticalAlign = "middle";
                d.appendChild(h);
                d.appendChild(document.createTextNode(" "));
                d.appendChild(f);
                f.appendChild(document.createTextNode(_intlStrings._suggestTranslation));
                f.style.direction = _intlStrings._interfaceDirection;
                f.style.textAlign = _intlStrings._interfaceAlign;
                f.style.color = "#0000CC";
                f.style.textDecoration = "underline";
                f.style.fontFamily = "arial,sans-serif";
                f.style.fontSize = "12px";
                d.onclick = function () {
                    tn_Od(!0)
                };
                tn_U(f, "pointer");
                tn_6 = a;
                a = document.createElement("div");
                d = document.createElement("form");
                d.style.marginBottom = "0px";
                d.style.paddingBottom = "0px";
                d.target = "google-feedback-frame";
                d.method = "post";
                d.action = _intlStrings._feedbackUrl;
                a.appendChild(d);
                var g = document.createElement("input");
                g.type = "hidden";
                g.name = "gtrans";
                d.appendChild(g);
                _intlStrings._reverse ? (f = tn_Kd(c), c = tn_Kd(b)) : (c = tn_Kd(c), f = tn_Kd(b));
                g.value =
                    c;
                b = document.createElement("input");
                b.type = "hidden";
                b.value = f;
                b.name = "text";
                d.appendChild(b);
                b = document.createElement("input");
                b.name = "langpair";
                b.type = "hidden";
                b.value = _intlStrings._langpair;
                d.appendChild(b);
                b = document.createElement("input");
                b.name = "u";
                b.type = "hidden";
                b.value = tn_Rd("u");
                d.appendChild(b);
                b = document.createElement("input");
                b.name = "oe";
                b.type = "hidden";
                if (document.charset)b.value = document.charset, d.appendChild(b); else if (document.characterSet)b.value = document.characterSet, d.appendChild(b);
                else if (f = tn_Rd("oe"))d.appendChild(b), b.value = f;
                var k = document.createElement("textarea");
                k.rows = 3;
                k.name = "utrans";
                k.value = c;
                d.appendChild(k);
                b = document.createElement("div");
                b.style.direction = _intlStrings._interfaceDirection;
                b.style.textAlign = tn_Id[_intlStrings._interfaceAlign];
                b.style.marginTop = tn_L(6);
                b.style.marginBottom = "0px";
                d.appendChild(b);
                c = document.createElement("input");
                c.type = "submit";
                c.value = _intlStrings._submit;
                b.appendChild(c);
                var q = document.createElement("div");
                q.appendChild(document.createElement("hr"));
                q.appendChild(document.createTextNode(_intlStrings._suggestThanks));
                q.style.direction = _intlStrings._interfaceDirection;
                q.style.textAlign = _intlStrings._interfaceAlign;
                q.style.fontFamily = "arial,sans-serif";
                q.style.fontSize = "12px";
                q.style.overflow = "auto";
                q.style.marginTop = "10px";
                tn_P(q);
                m.appendChild(a);
                l.appendChild(m);
                l.appendChild(q);
                d.onsubmit = function () {
                    window.setTimeout(function () {
                        tn_P(m);
                        tn_Q(q)
                    }, 1);
                    tn_8 = !1;
                    return k.value != g.value
                };
                tn_5c([l, e], function (a) {
                    k.style.width = tn_L(a[0].width - 6);
                    k.style.padding =
                        tn_L(2);
                    tn_5.hide();
                    tn_5.setContent(a[1], [new tn_xd(_intlStrings._originalText, e)]);
                    tn_5.setMaximizedContent(a[0], [new tn_xd(_intlStrings._originalText, l)]);
                    tn_5.setNodePosition(tn_6);
                    tn_5.showCloseButton(!0);
                    tn_5.show()
                }, (document.width || document.body.scrollWidth) / 2)
            }
        }
    }
}
function tn_Rd(a) {
    for (var b = window.location.search.substring(1), b = b.split("&"), c = 0; c < b.length; c++) {
        var d = b[c].split("=");
        if (d[0].toLowerCase() == a && 0 < d.length)return window.unescape(d[1])
    }
    return ""
}
function tn_Sd(a) {
    tn_Gd && (tn_Hd = !0, tn_8 || (null !== tn_$ && (window.clearTimeout(tn_$), tn_$ = null), tn_6 == a ? (tn_Fd = tn_6.style.backgroundColor, tn_6.style.backgroundColor = "#E6ECF9") : tn_$ = window.setTimeout(function () {
        tn_Pd(a)
    }, 500)))
}
function tn_Nd(a) {
    tn_Gd && (!0 !== a && (tn_Hd = !1), tn_8 || (tn_6 && tn_6.style && (tn_6.style.backgroundColor = tn_Fd), tn_$ && (window.clearTimeout(tn_$), tn_$ = null), !0 !== a ? tn_$ = window.setTimeout(tn_Td, 250) : tn_Td()))
}
function tn_Td() {
    tn_8 || (tn_5.hide(), tn_9 && (tn_5.restore(!0), tn_9 = !1), tn_6 = null)
}
function tn_Qd() {
    tn_9 = tn_8 = !0;
    var a = tn_gd(tn_5, "maximizeend", function () {
        tn_hd(a)
    });
    tn_5.maximize()
}
function tn_Od(a) {
    var b = tn_gd(tn_5, "restoreend", function () {
        tn_hd(b);
        tn_9 = !1;
        a ? window.setTimeout(function () {
            tn_8 = !1;
            tn_Hd || tn_Nd(!0)
        }, 500) : (tn_8 = !1, tn_Hd || tn_Nd(!0))
    });
    tn_5.restore()
}
function _csi(a, b) {
    var c = {};
    c.sl = a;
    c.tl = b;
    var d = window.jstiming.load;
    d.tick("prt");
    d.tick("ol");
    d.name = "w";
    window.jstiming.sn = "translate";
    window.jstiming.report(d, c);
    try {
        window.external && window.external.resT()
    } catch (e) {
    }
}
function tn_Ud(a) {
    var b = window.onload;
    window.onload = b ? function () {
        try {
            a()
        } catch (c) {
        }
        b(null)
    } : a
}
var _tipon = tn_Sd, _tipoff = tn_Nd, _addload = tn_Ud, tn_Vd = window.jstiming.load;
tn_Vd.tick("jl");
