// This is ammo.js, a port of Bullet Physics to JavaScript. zlib licensed.

var Ammo = (function() {
    var _scriptDir = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : undefined;
    return (
        function(Ammo) {
            Ammo = Ammo || {};

            var b;
            var g;
            g || (g = typeof Ammo !== 'undefined' ? Ammo : {});
            var aa = {},
                ba;
            for (ba in g) g.hasOwnProperty(ba) && (aa[ba] = g[ba]);
            g.arguments = [];
            g.thisProgram = "./this.program";
            g.quit = function(a, c) {
                throw c;
            };
            g.preRun = [];
            g.postRun = [];
            var ca = !1,
                da = !1,
                ea = !1,
                fa = !1;
            ca = "object" === typeof window;
            da = "function" === typeof importScripts;
            ea = "object" === typeof process && "function" === typeof require && !ca && !da;
            fa = !ca && !ea && !da;
            var ha = "";
            if (ea) {
                ha = __dirname + "/";
                var ia, ja;
                g.read = function(a, c) {
                    ia || (ia = require("fs"));
                    ja || (ja = require("path"));
                    a = ja.normalize(a);
                    a = ia.readFileSync(a);
                    return c ? a : a.toString()
                };
                g.readBinary = function(a) {
                    a = g.read(a, !0);
                    a.buffer || (a = new Uint8Array(a));
                    assert(a.buffer);
                    return a
                };
                1 < process.argv.length && (g.thisProgram = process.argv[1].replace(/\\/g, "/"));
                g.arguments = process.argv.slice(2);
                process.on("uncaughtException", function(a) {
                    if (!(a instanceof ka)) throw a;
                });
                process.on("unhandledRejection", la);
                g.quit = function(a) {
                    process.exit(a)
                };
                g.inspect = function() {
                    return "[Emscripten Module object]"
                }
            } else if (fa) "undefined" != typeof read && (g.read = function(a) {
                return read(a)
            }), g.readBinary = function(a) {
                if ("function" === typeof readbuffer) return new Uint8Array(readbuffer(a));
                a = read(a, "binary");
                assert("object" === typeof a);
                return a
            }, "undefined" != typeof scriptArgs ? g.arguments = scriptArgs : "undefined" != typeof arguments && (g.arguments = arguments), "function" === typeof quit && (g.quit = function(a) {
                quit(a)
            });
            else if (ca || da) da ? ha = self.location.href : document.currentScript &&
                (ha = document.currentScript.src), _scriptDir && (ha = _scriptDir), ha = 0 !== ha.indexOf("blob:") ? ha.substr(0, ha.lastIndexOf("/") + 1) : "", g.read = function(a) {
                    var c = new XMLHttpRequest;
                    c.open("GET", a, !1);
                    c.send(null);
                    return c.responseText
                }, da && (g.readBinary = function(a) {
                    var c = new XMLHttpRequest;
                    c.open("GET", a, !1);
                    c.responseType = "arraybuffer";
                    c.send(null);
                    return new Uint8Array(c.response)
                }), g.readAsync = function(a, c, d) {
                    var e = new XMLHttpRequest;
                    e.open("GET", a, !0);
                    e.responseType = "arraybuffer";
                    e.onload = function() {
                        200 ==
                            e.status || 0 == e.status && e.response ? c(e.response) : d()
                    };
                    e.onerror = d;
                    e.send(null)
                }, g.setWindowTitle = function(a) {
                    document.title = a
                };
            var ma = g.print || ("undefined" !== typeof console ? console.log.bind(console) : "undefined" !== typeof print ? print : null),
                na = g.printErr || ("undefined" !== typeof printErr ? printErr : "undefined" !== typeof console && console.warn.bind(console) || ma);
            for (ba in aa) aa.hasOwnProperty(ba) && (g[ba] = aa[ba]);
            aa = void 0;
            var oa = {
                    "f64-rem": function(a, c) {
                        return a % c
                    },
                    "debugger": function() {
                        debugger
                    }
                },
                h = Array(20);
            "object" !== typeof WebAssembly && na("no native wasm support detected");
            var pa, qa = !1;

            function assert(a, c) {
                a || la("Assertion failed: " + c)
            }
            var ra = "undefined" !== typeof TextDecoder ? new TextDecoder("utf8") : void 0;
            "undefined" !== typeof TextDecoder && new TextDecoder("utf-16le");
            var buffer, sa, ta, ua, va, wa = g.TOTAL_MEMORY || 67108864;
            5242880 > wa && na("TOTAL_MEMORY should be larger than TOTAL_STACK, was " + wa + "! (TOTAL_STACK=5242880)");
            g.buffer ? buffer = g.buffer : "object" === typeof WebAssembly && "function" === typeof WebAssembly.Memory ? (pa = new WebAssembly.Memory({
                initial: wa / 65536,
                maximum: wa / 65536
            }), buffer = pa.buffer) : buffer = new ArrayBuffer(wa);
            g.HEAP8 = sa = new Int8Array(buffer);
            g.HEAP16 = new Int16Array(buffer);
            g.HEAP32 = ua = new Int32Array(buffer);
            g.HEAPU8 = ta = new Uint8Array(buffer);
            g.HEAPU16 = new Uint16Array(buffer);
            g.HEAPU32 = new Uint32Array(buffer);
            g.HEAPF32 = va = new Float32Array(buffer);
            g.HEAPF64 = new Float64Array(buffer);
            ua[7436] = 5272656;

            function xa(a) {
                for (; 0 < a.length;) {
                    var c = a.shift();
                    if ("function" == typeof c) c();
                    else {
                        var d = c.gy;
                        "number" === typeof d ? void 0 === c.Ox ? g.dynCall_v(d) : g.dynCall_vi(d, c.Ox) : d(void 0 === c.Ox ? null : c.Ox)
                    }
                }
            }
            var ya = [],
                za = [],
                Aa = [],
                Ba = [],
                Ca = !1;

            function Da() {
                var a = g.preRun.shift();
                ya.unshift(a)
            }
            var Ea = Math.cos,
                Fa = Math.sin,
                Ga = 0,
                Ha = null,
                Ia = null;
            g.preloadedImages = {};
            g.preloadedAudios = {};

            function Ja() {
                var a = Ka;
                return String.prototype.startsWith ? a.startsWith("data:application/octet-stream;base64,") : 0 === a.indexOf("data:application/octet-stream;base64,")
            }
            var Ka = "ammo.wasm.wasm";
            if (!Ja()) {
                var La = Ka;
                Ka = g.locateFile ? g.locateFile(La, ha) : ha + La
            }

            function Ma() {
                try {
                    if (g.wasmBinary) return new Uint8Array(g.wasmBinary);
                    if (g.readBinary) return g.readBinary(Ka);
                    throw "both async and sync fetching of the wasm failed";
                } catch (a) {
                    la(a)
                }
            }

            function Oa() {
                return g.wasmBinary || !ca && !da || "function" !== typeof fetch ? new Promise(function(a) {
                    a(Ma())
                }) : fetch(Ka, {
                    credentials: "same-origin"
                }).then(function(a) {
                    if (!a.ok) throw "failed to load wasm binary file at '" + Ka + "'";
                    return a.arrayBuffer()
                }).catch(function() {
                    return Ma()
                })
            }

            function Pa(a) {
                function c(a) {
                    g.asm = a.exports;
                    Ga--;
                    g.monitorRunDependencies && g.monitorRunDependencies(Ga);
                    0 == Ga && (null !== Ha && (clearInterval(Ha), Ha = null), Ia && (a = Ia, Ia = null, a()))
                }

                function d(a) {
                    c(a.instance)
                }

                function e(a) {
                    Oa().then(function(a) {
                        return WebAssembly.instantiate(a, f)
                    }).then(a, function(a) {
                        na("failed to asynchronously prepare wasm: " + a);
                        la(a)
                    })
                }
                var f = {
                    env: a,
                    global: {
                        NaN: NaN,
                        Infinity: Infinity
                    },
                    "global.Math": Math,
                    asm2wasm: oa
                };
                Ga++;
                g.monitorRunDependencies && g.monitorRunDependencies(Ga);
                if (g.instantiateWasm) try {
                    return g.instantiateWasm(f,
                        c)
                } catch (l) {
                    return na("Module.instantiateWasm callback failed with error: " + l), !1
                }
                g.wasmBinary || "function" !== typeof WebAssembly.instantiateStreaming || Ja() || "function" !== typeof fetch ? e(d) : WebAssembly.instantiateStreaming(fetch(Ka, {
                    credentials: "same-origin"
                }), f).then(d, function(a) {
                    na("wasm streaming compile failed: " + a);
                    na("falling back to ArrayBuffer instantiation");
                    e(d)
                });
                return {}
            }
            g.asm = function(a, c) {
                c.memory = pa;
                c.table = new WebAssembly.Table({
                    initial: 2720,
                    maximum: 2720,
                    element: "anyfunc"
                });
                c.__memory_base = 1024;
                c.__table_base = 0;
                return Pa(c)
            };
            var Qa = [function(a, c, d, e) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("drawLine")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawLine.";
                a.drawLine(c, d, e)
            }, function(a, c, d, e, f, l) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("drawContactPoint")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::drawContactPoint.";
                a.drawContactPoint(c, d, e, f, l)
            }, function(a, c) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("reportErrorWarning")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::reportErrorWarning.";
                a.reportErrorWarning(c)
            }, function(a, c, d) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("draw3dText")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::draw3dText.";
                a.draw3dText(c, d)
            }, function(a, c) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("setDebugMode")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::setDebugMode.";
                a.setDebugMode(c)
            }, function(a) {
                a = g.getCache(g.DebugDrawer)[a];
                if (!a.hasOwnProperty("getDebugMode")) throw "a JSImplementation must implement all functions, you forgot DebugDrawer::getDebugMode.";
                return a.getDebugMode()
            }, function(a, c, d, e, f, l, q, C) {
                a = g.getCache(g.ConcreteContactResultCallback)[a];
                if (!a.hasOwnProperty("addSingleResult")) throw "a JSImplementation must implement all functions, you forgot ConcreteContactResultCallback::addSingleResult.";
                return a.addSingleResult(c, d, e, f, l, q, C)
            }];
            za.push({
                gy: function() {
                    Ra()
                }
            });
            var Sa = [null, [],
                    []
                ],
                Ta = 0;

            function Ua() {
                Ta += 4;
                return ua[Ta - 4 >> 2]
            }
            var Va = {};

            function Wa() {
                la("OOM")
            }
            var Xa = g.asm({}, {
                b: la,
                $: function() {
                    return 0
                },
                V: function(a, c) {
                    return h[a](c)
                },
                K: function(a, c, d) {
                    return h[a](c, d)
                },
                z: function(a, c, d, e, f, l) {
                    return h[a](c, d, e, f, l)
                },
                o: function(a, c, d, e) {
                    return h[a](c, d, e)
                },
                h: function(a, c, d, e, f, l, q) {
                    return h[a](c, d, e, f, l, q)
                },
                g: function(a, c, d, e, f) {
                    return h[a](c, d, e, f)
                },
                f: function(a, c, d, e, f, l) {
                    return h[a](c, d, e, f, l)
                },
                e: function(a, c, d, e, f, l, q, C, J) {
                    return h[a](c, d, e, f, l, q, C, J)
                },
                d: function(a, c, d, e, f, l, q, C, J, Z) {
                    return h[a](c, d, e, f, l, q, C, J, Z)
                },
                U: function(a, c, d, e, f, l, q, C, J, Z, Na) {
                    return h[a](c,
                        d, e, f, l, q, C, J, Z, Na)
                },
                T: function(a, c) {
                    return h[a](c)
                },
                S: function(a, c, d, e, f) {
                    return h[a](c, d, e, f)
                },
                R: function(a, c, d) {
                    return h[a](c, d)
                },
                Q: function(a, c, d, e) {
                    return h[a](c, d, e)
                },
                P: function(a, c, d, e) {
                    return h[a](c, d, e)
                },
                O: function(a, c, d, e, f) {
                    return h[a](c, d, e, f)
                },
                N: function(a, c, d, e, f, l, q) {
                    return h[a](c, d, e, f, l, q)
                },
                M: function(a, c, d, e, f, l, q, C) {
                    return h[a](c, d, e, f, l, q, C)
                },
                L: function(a, c, d, e, f, l, q, C, J, Z) {
                    return h[a](c, d, e, f, l, q, C, J, Z)
                },
                J: function(a, c, d, e, f, l, q, C, J, Z, Na) {
                    return h[a](c, d, e, f, l, q, C, J, Z, Na)
                },
                _: function(a,
                    c, d, e) {
                    return h[a](c, d, e)
                },
                I: function(a) {
                    h[a]()
                },
                H: function(a, c) {
                    h[a](c)
                },
                G: function(a, c, d) {
                    h[a](c, d)
                },
                F: function(a, c, d, e) {
                    h[a](c, d, e)
                },
                E: function(a, c, d, e, f, l, q) {
                    h[a](c, d, e, f, l, q)
                },
                D: function(a, c, d, e) {
                    h[a](c, d, e)
                },
                C: function(a, c, d, e, f) {
                    h[a](c, d, e, f)
                },
                B: function(a, c, d) {
                    h[a](c, d)
                },
                A: function(a, c, d, e) {
                    h[a](c, d, e)
                },
                y: function(a, c, d, e, f) {
                    h[a](c, d, e, f)
                },
                x: function(a, c, d, e, f, l) {
                    h[a](c, d, e, f, l)
                },
                w: function(a, c, d, e) {
                    h[a](c, d, e)
                },
                v: function(a, c, d, e, f) {
                    h[a](c, d, e, f)
                },
                u: function(a, c, d, e, f, l, q) {
                    h[a](c, d, e, f, l,
                        q)
                },
                t: function(a, c, d, e, f) {
                    h[a](c, d, e, f)
                },
                s: function(a, c, d, e, f, l) {
                    h[a](c, d, e, f, l)
                },
                r: function(a, c, d, e, f, l, q, C, J, Z, Na, fb, gb) {
                    h[a](c, d, e, f, l, q, C, J, Z, Na, fb, gb)
                },
                q: function(a, c, d, e, f, l, q, C, J, Z, Na, fb) {
                    h[a](c, d, e, f, l, q, C, J, Z, Na, fb)
                },
                p: function(a, c, d, e, f, l) {
                    h[a](c, d, e, f, l)
                },
                n: function(a, c, d, e, f, l, q) {
                    h[a](c, d, e, f, l, q)
                },
                m: function(a, c, d, e, f, l, q) {
                    h[a](c, d, e, f, l, q)
                },
                l: function(a, c, d, e, f, l, q, C) {
                    h[a](c, d, e, f, l, q, C)
                },
                k: function(a, c, d, e, f, l, q, C, J, Z) {
                    h[a](c, d, e, f, l, q, C, J, Z)
                },
                j: function(a, c, d, e, f, l, q, C, J, Z) {
                    h[a](c,
                        d, e, f, l, q, C, J, Z)
                },
                i: function(a, c, d, e, f, l, q, C, J, Z, Na) {
                    h[a](c, d, e, f, l, q, C, J, Z, Na)
                },
                na: function() {
                    qa = !0;
                    throw "Pure virtual function called!";
                },
                Z: function(a) {
                    g.___errno_location && (ua[g.___errno_location() >> 2] = a);
                    return a
                },
                ma: function(a, c) {
                    Ta = c;
                    try {
                        return Va.hy(), Ua(), Ua(), Ua(), Ua(), 0
                    } catch (d) {
                        return la(d), -d.ey
                    }
                },
                Y: function(a, c) {
                    Ta = c;
                    try {
                        var d = Ua(),
                            e = Ua(),
                            f = Ua();
                        for (c = a = 0; c < f; c++) {
                            for (var l = ua[e + 8 * c >> 2], q = ua[e + (8 * c + 4) >> 2], C = 0; C < q; C++) {
                                var J = ta[l + C],
                                    Z = Sa[d];
                                if (0 === J || 10 === J) {
                                    var Na = 1 === d ? ma : na;
                                    for (var fb =
                                            Z, gb = 0, Kb = gb + void 0, Nb = gb; fb[Nb] && !(Nb >= Kb);) ++Nb;
                                    if (16 < Nb - gb && fb.subarray && ra) var vc = ra.decode(fb.subarray(gb, Nb));
                                    else {
                                        for (Kb = ""; gb < Nb;) {
                                            var hb = fb[gb++];
                                            if (hb & 128) {
                                                var ic = fb[gb++] & 63;
                                                if (192 == (hb & 224)) Kb += String.fromCharCode((hb & 31) << 6 | ic);
                                                else {
                                                    var wc = fb[gb++] & 63;
                                                    hb = 224 == (hb & 240) ? (hb & 15) << 12 | ic << 6 | wc : (hb & 7) << 18 | ic << 12 | wc << 6 | fb[gb++] & 63;
                                                    if (65536 > hb) Kb += String.fromCharCode(hb);
                                                    else {
                                                        var xc = hb - 65536;
                                                        Kb += String.fromCharCode(55296 | xc >> 10, 56320 | xc & 1023)
                                                    }
                                                }
                                            } else Kb += String.fromCharCode(hb)
                                        }
                                        vc = Kb
                                    }
                                    Na(vc);
                                    Z.length =
                                        0
                                } else Z.push(J)
                            }
                            a += q
                        }
                        return a
                    } catch (yc) {
                        return la(yc), -yc.ey
                    }
                },
                la: function(a, c) {
                    Ta = c;
                    try {
                        return Va.hy(), 0
                    } catch (d) {
                        return la(d), -d.ey
                    }
                },
                ka: function(a, c, d, e, f, l, q, C, J) {
                    return Qa[a](c, d, e, f, l, q, C, J)
                },
                ja: function(a, c) {
                    return Qa[a](c)
                },
                X: function(a, c, d) {
                    return Qa[a](c, d)
                },
                ia: function(a, c, d, e) {
                    return Qa[a](c, d, e)
                },
                ha: function(a, c, d, e, f, l, q) {
                    return Qa[a](c, d, e, f, l, q)
                },
                ga: function(a, c, d, e, f) {
                    return Qa[a](c, d, e, f)
                },
                fa: function() {
                    return sa.length
                },
                ea: function(a, c, d) {
                    ta.set(ta.subarray(c, c + d), a)
                },
                da: function(a) {
                    Wa(a)
                },
                c: function(a) {
                    var c = Date.now();
                    ua[a >> 2] = c / 1E3 | 0;
                    ua[a + 4 >> 2] = c % 1E3 * 1E3 | 0;
                    return 0
                },
                ca: Ea,
                ba: Fa,
                W: function() {
                    la("trap!")
                },
                aa: Wa,
                a: 29744
            }, buffer);
            g.asm = Xa;
            var Ra = g.__GLOBAL__sub_I_btQuickprof_cpp = function() {
                    return g.asm.oa.apply(null, arguments)
                },
                Ya = g._emscripten_bind_Anchor___destroy___0 = function() {
                    return g.asm.pa.apply(null, arguments)
                },
                Za = g._emscripten_bind_Anchor_get_m_body_0 = function() {
                    return g.asm.qa.apply(null, arguments)
                },
                $a = g._emscripten_bind_Anchor_get_m_c0_0 = function() {
                    return g.asm.ra.apply(null, arguments)
                },
                ab = g._emscripten_bind_Anchor_get_m_c1_0 = function() {
                    return g.asm.sa.apply(null, arguments)
                },
                bb = g._emscripten_bind_Anchor_get_m_c2_0 = function() {
                    return g.asm.ta.apply(null,
                        arguments)
                },
                cb = g._emscripten_bind_Anchor_get_m_influence_0 = function() {
                    return g.asm.ua.apply(null, arguments)
                },
                db = g._emscripten_bind_Anchor_get_m_local_0 = function() {
                    return g.asm.va.apply(null, arguments)
                },
                eb = g._emscripten_bind_Anchor_get_m_node_0 = function() {
                    return g.asm.wa.apply(null, arguments)
                },
                ib = g._emscripten_bind_Anchor_set_m_body_1 = function() {
                    return g.asm.xa.apply(null, arguments)
                },
                jb = g._emscripten_bind_Anchor_set_m_c0_1 = function() {
                    return g.asm.ya.apply(null, arguments)
                },
                kb = g._emscripten_bind_Anchor_set_m_c1_1 =
                function() {
                    return g.asm.za.apply(null, arguments)
                },
                lb = g._emscripten_bind_Anchor_set_m_c2_1 = function() {
                    return g.asm.Aa.apply(null, arguments)
                },
                mb = g._emscripten_bind_Anchor_set_m_influence_1 = function() {
                    return g.asm.Ba.apply(null, arguments)
                },
                nb = g._emscripten_bind_Anchor_set_m_local_1 = function() {
                    return g.asm.Ca.apply(null, arguments)
                },
                ob = g._emscripten_bind_Anchor_set_m_node_1 = function() {
                    return g.asm.Da.apply(null, arguments)
                },
                pb = g._emscripten_bind_ClosestConvexResultCallback_ClosestConvexResultCallback_2 =
                function() {
                    return g.asm.Ea.apply(null, arguments)
                },
                qb = g._emscripten_bind_ClosestConvexResultCallback___destroy___0 = function() {
                    return g.asm.Fa.apply(null, arguments)
                },
                rb = g._emscripten_bind_ClosestConvexResultCallback_get_m_closestHitFraction_0 = function() {
                    return g.asm.Ga.apply(null, arguments)
                },
                sb = g._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterGroup_0 = function() {
                    return g.asm.Ha.apply(null, arguments)
                },
                tb = g._emscripten_bind_ClosestConvexResultCallback_get_m_collisionFilterMask_0 = function() {
                    return g.asm.Ia.apply(null,
                        arguments)
                },
                ub = g._emscripten_bind_ClosestConvexResultCallback_get_m_convexFromWorld_0 = function() {
                    return g.asm.Ja.apply(null, arguments)
                },
                vb = g._emscripten_bind_ClosestConvexResultCallback_get_m_convexToWorld_0 = function() {
                    return g.asm.Ka.apply(null, arguments)
                },
                wb = g._emscripten_bind_ClosestConvexResultCallback_get_m_hitNormalWorld_0 = function() {
                    return g.asm.La.apply(null, arguments)
                },
                xb = g._emscripten_bind_ClosestConvexResultCallback_get_m_hitPointWorld_0 = function() {
                    return g.asm.Ma.apply(null, arguments)
                },
                yb = g._emscripten_bind_ClosestConvexResultCallback_hasHit_0 = function() {
                    return g.asm.Na.apply(null, arguments)
                },
                zb = g._emscripten_bind_ClosestConvexResultCallback_set_m_closestHitFraction_1 = function() {
                    return g.asm.Oa.apply(null, arguments)
                },
                Ab = g._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterGroup_1 = function() {
                    return g.asm.Pa.apply(null, arguments)
                },
                Bb = g._emscripten_bind_ClosestConvexResultCallback_set_m_collisionFilterMask_1 = function() {
                    return g.asm.Qa.apply(null, arguments)
                },
                Cb = g._emscripten_bind_ClosestConvexResultCallback_set_m_convexFromWorld_1 =
                function() {
                    return g.asm.Ra.apply(null, arguments)
                },
                Db = g._emscripten_bind_ClosestConvexResultCallback_set_m_convexToWorld_1 = function() {
                    return g.asm.Sa.apply(null, arguments)
                },
                Eb = g._emscripten_bind_ClosestConvexResultCallback_set_m_hitNormalWorld_1 = function() {
                    return g.asm.Ta.apply(null, arguments)
                },
                Fb = g._emscripten_bind_ClosestConvexResultCallback_set_m_hitPointWorld_1 = function() {
                    return g.asm.Ua.apply(null, arguments)
                },
                Gb = g._emscripten_bind_ClosestRayResultCallback_ClosestRayResultCallback_2 = function() {
                    return g.asm.Va.apply(null,
                        arguments)
                },
                Hb = g._emscripten_bind_ClosestRayResultCallback___destroy___0 = function() {
                    return g.asm.Wa.apply(null, arguments)
                },
                Ib = g._emscripten_bind_ClosestRayResultCallback_get_m_closestHitFraction_0 = function() {
                    return g.asm.Xa.apply(null, arguments)
                },
                Jb = g._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterGroup_0 = function() {
                    return g.asm.Ya.apply(null, arguments)
                },
                Lb = g._emscripten_bind_ClosestRayResultCallback_get_m_collisionFilterMask_0 = function() {
                    return g.asm.Za.apply(null, arguments)
                },
                Mb =
                g._emscripten_bind_ClosestRayResultCallback_get_m_collisionObject_0 = function() {
                    return g.asm._a.apply(null, arguments)
                },
                Ob = g._emscripten_bind_ClosestRayResultCallback_get_m_hitNormalWorld_0 = function() {
                    return g.asm.$a.apply(null, arguments)
                },
                Pb = g._emscripten_bind_ClosestRayResultCallback_get_m_hitPointWorld_0 = function() {
                    return g.asm.ab.apply(null, arguments)
                },
                Qb = g._emscripten_bind_ClosestRayResultCallback_get_m_rayFromWorld_0 = function() {
                    return g.asm.bb.apply(null, arguments)
                },
                Rb = g._emscripten_bind_ClosestRayResultCallback_get_m_rayToWorld_0 =
                function() {
                    return g.asm.cb.apply(null, arguments)
                },
                Sb = g._emscripten_bind_ClosestRayResultCallback_hasHit_0 = function() {
                    return g.asm.db.apply(null, arguments)
                },
                Tb = g._emscripten_bind_ClosestRayResultCallback_set_m_closestHitFraction_1 = function() {
                    return g.asm.eb.apply(null, arguments)
                },
                Ub = g._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterGroup_1 = function() {
                    return g.asm.fb.apply(null, arguments)
                },
                Vb = g._emscripten_bind_ClosestRayResultCallback_set_m_collisionFilterMask_1 = function() {
                    return g.asm.gb.apply(null,
                        arguments)
                },
                Wb = g._emscripten_bind_ClosestRayResultCallback_set_m_collisionObject_1 = function() {
                    return g.asm.hb.apply(null, arguments)
                },
                Xb = g._emscripten_bind_ClosestRayResultCallback_set_m_hitNormalWorld_1 = function() {
                    return g.asm.ib.apply(null, arguments)
                },
                Yb = g._emscripten_bind_ClosestRayResultCallback_set_m_hitPointWorld_1 = function() {
                    return g.asm.jb.apply(null, arguments)
                },
                Zb = g._emscripten_bind_ClosestRayResultCallback_set_m_rayFromWorld_1 = function() {
                    return g.asm.kb.apply(null, arguments)
                },
                $b = g._emscripten_bind_ClosestRayResultCallback_set_m_rayToWorld_1 =
                function() {
                    return g.asm.lb.apply(null, arguments)
                },
                ac = g._emscripten_bind_ConcreteContactResultCallback_ConcreteContactResultCallback_0 = function() {
                    return g.asm.mb.apply(null, arguments)
                },
                bc = g._emscripten_bind_ConcreteContactResultCallback___destroy___0 = function() {
                    return g.asm.nb.apply(null, arguments)
                },
                cc = g._emscripten_bind_ConcreteContactResultCallback_addSingleResult_7 = function() {
                    return g.asm.ob.apply(null, arguments)
                },
                dc = g._emscripten_bind_Config___destroy___0 = function() {
                    return g.asm.pb.apply(null,
                        arguments)
                },
                ec = g._emscripten_bind_Config_get_citerations_0 = function() {
                    return g.asm.qb.apply(null, arguments)
                },
                fc = g._emscripten_bind_Config_get_collisions_0 = function() {
                    return g.asm.rb.apply(null, arguments)
                },
                hc = g._emscripten_bind_Config_get_diterations_0 = function() {
                    return g.asm.sb.apply(null, arguments)
                },
                jc = g._emscripten_bind_Config_get_kAHR_0 = function() {
                    return g.asm.tb.apply(null, arguments)
                },
                kc = g._emscripten_bind_Config_get_kCHR_0 = function() {
                    return g.asm.ub.apply(null, arguments)
                },
                lc = g._emscripten_bind_Config_get_kDF_0 =
                function() {
                    return g.asm.vb.apply(null, arguments)
                },
                mc = g._emscripten_bind_Config_get_kDG_0 = function() {
                    return g.asm.wb.apply(null, arguments)
                },
                nc = g._emscripten_bind_Config_get_kDP_0 = function() {
                    return g.asm.xb.apply(null, arguments)
                },
                oc = g._emscripten_bind_Config_get_kKHR_0 = function() {
                    return g.asm.yb.apply(null, arguments)
                },
                pc = g._emscripten_bind_Config_get_kLF_0 = function() {
                    return g.asm.zb.apply(null, arguments)
                },
                qc = g._emscripten_bind_Config_get_kMT_0 = function() {
                    return g.asm.Ab.apply(null, arguments)
                },
                rc = g._emscripten_bind_Config_get_kPR_0 =
                function() {
                    return g.asm.Bb.apply(null, arguments)
                },
                sc = g._emscripten_bind_Config_get_kSHR_0 = function() {
                    return g.asm.Cb.apply(null, arguments)
                },
                tc = g._emscripten_bind_Config_get_kSKHR_CL_0 = function() {
                    return g.asm.Db.apply(null, arguments)
                },
                uc = g._emscripten_bind_Config_get_kSK_SPLT_CL_0 = function() {
                    return g.asm.Eb.apply(null, arguments)
                },
                zc = g._emscripten_bind_Config_get_kSRHR_CL_0 = function() {
                    return g.asm.Fb.apply(null, arguments)
                },
                Ac = g._emscripten_bind_Config_get_kSR_SPLT_CL_0 = function() {
                    return g.asm.Gb.apply(null,
                        arguments)
                },
                Bc = g._emscripten_bind_Config_get_kSSHR_CL_0 = function() {
                    return g.asm.Hb.apply(null, arguments)
                },
                Cc = g._emscripten_bind_Config_get_kSS_SPLT_CL_0 = function() {
                    return g.asm.Ib.apply(null, arguments)
                },
                Dc = g._emscripten_bind_Config_get_kVCF_0 = function() {
                    return g.asm.Jb.apply(null, arguments)
                },
                Ec = g._emscripten_bind_Config_get_kVC_0 = function() {
                    return g.asm.Kb.apply(null, arguments)
                },
                Fc = g._emscripten_bind_Config_get_maxvolume_0 = function() {
                    return g.asm.Lb.apply(null, arguments)
                },
                Gc = g._emscripten_bind_Config_get_piterations_0 =
                function() {
                    return g.asm.Mb.apply(null, arguments)
                },
                Hc = g._emscripten_bind_Config_get_timescale_0 = function() {
                    return g.asm.Nb.apply(null, arguments)
                },
                Ic = g._emscripten_bind_Config_get_viterations_0 = function() {
                    return g.asm.Ob.apply(null, arguments)
                },
                Jc = g._emscripten_bind_Config_set_citerations_1 = function() {
                    return g.asm.Pb.apply(null, arguments)
                },
                Kc = g._emscripten_bind_Config_set_collisions_1 = function() {
                    return g.asm.Qb.apply(null, arguments)
                },
                Lc = g._emscripten_bind_Config_set_diterations_1 = function() {
                    return g.asm.Rb.apply(null,
                        arguments)
                },
                Mc = g._emscripten_bind_Config_set_kAHR_1 = function() {
                    return g.asm.Sb.apply(null, arguments)
                },
                Nc = g._emscripten_bind_Config_set_kCHR_1 = function() {
                    return g.asm.Tb.apply(null, arguments)
                },
                Oc = g._emscripten_bind_Config_set_kDF_1 = function() {
                    return g.asm.Ub.apply(null, arguments)
                },
                Pc = g._emscripten_bind_Config_set_kDG_1 = function() {
                    return g.asm.Vb.apply(null, arguments)
                },
                Qc = g._emscripten_bind_Config_set_kDP_1 = function() {
                    return g.asm.Wb.apply(null, arguments)
                },
                Rc = g._emscripten_bind_Config_set_kKHR_1 = function() {
                    return g.asm.Xb.apply(null,
                        arguments)
                },
                Sc = g._emscripten_bind_Config_set_kLF_1 = function() {
                    return g.asm.Yb.apply(null, arguments)
                },
                Tc = g._emscripten_bind_Config_set_kMT_1 = function() {
                    return g.asm.Zb.apply(null, arguments)
                },
                Uc = g._emscripten_bind_Config_set_kPR_1 = function() {
                    return g.asm._b.apply(null, arguments)
                },
                Vc = g._emscripten_bind_Config_set_kSHR_1 = function() {
                    return g.asm.$b.apply(null, arguments)
                },
                Wc = g._emscripten_bind_Config_set_kSKHR_CL_1 = function() {
                    return g.asm.ac.apply(null, arguments)
                },
                Xc = g._emscripten_bind_Config_set_kSK_SPLT_CL_1 =
                function() {
                    return g.asm.bc.apply(null, arguments)
                },
                Yc = g._emscripten_bind_Config_set_kSRHR_CL_1 = function() {
                    return g.asm.cc.apply(null, arguments)
                },
                Zc = g._emscripten_bind_Config_set_kSR_SPLT_CL_1 = function() {
                    return g.asm.dc.apply(null, arguments)
                },
                $c = g._emscripten_bind_Config_set_kSSHR_CL_1 = function() {
                    return g.asm.ec.apply(null, arguments)
                },
                ad = g._emscripten_bind_Config_set_kSS_SPLT_CL_1 = function() {
                    return g.asm.fc.apply(null, arguments)
                },
                bd = g._emscripten_bind_Config_set_kVCF_1 = function() {
                    return g.asm.gc.apply(null,
                        arguments)
                },
                cd = g._emscripten_bind_Config_set_kVC_1 = function() {
                    return g.asm.hc.apply(null, arguments)
                },
                dd = g._emscripten_bind_Config_set_maxvolume_1 = function() {
                    return g.asm.ic.apply(null, arguments)
                },
                ed = g._emscripten_bind_Config_set_piterations_1 = function() {
                    return g.asm.jc.apply(null, arguments)
                },
                fd = g._emscripten_bind_Config_set_timescale_1 = function() {
                    return g.asm.kc.apply(null, arguments)
                },
                gd = g._emscripten_bind_Config_set_viterations_1 = function() {
                    return g.asm.lc.apply(null, arguments)
                },
                hd = g._emscripten_bind_ContactResultCallback___destroy___0 =
                function() {
                    return g.asm.mc.apply(null, arguments)
                },
                id = g._emscripten_bind_ContactResultCallback_addSingleResult_7 = function() {
                    return g.asm.nc.apply(null, arguments)
                },
                jd = g._emscripten_bind_ConvexResultCallback___destroy___0 = function() {
                    return g.asm.oc.apply(null, arguments)
                },
                kd = g._emscripten_bind_ConvexResultCallback_get_m_closestHitFraction_0 = function() {
                    return g.asm.pc.apply(null, arguments)
                },
                ld = g._emscripten_bind_ConvexResultCallback_get_m_collisionFilterGroup_0 = function() {
                    return g.asm.qc.apply(null, arguments)
                },
                md = g._emscripten_bind_ConvexResultCallback_get_m_collisionFilterMask_0 = function() {
                    return g.asm.rc.apply(null, arguments)
                },
                nd = g._emscripten_bind_ConvexResultCallback_hasHit_0 = function() {
                    return g.asm.sc.apply(null, arguments)
                },
                od = g._emscripten_bind_ConvexResultCallback_set_m_closestHitFraction_1 = function() {
                    return g.asm.tc.apply(null, arguments)
                },
                pd = g._emscripten_bind_ConvexResultCallback_set_m_collisionFilterGroup_1 = function() {
                    return g.asm.uc.apply(null, arguments)
                },
                qd = g._emscripten_bind_ConvexResultCallback_set_m_collisionFilterMask_1 =
                function() {
                    return g.asm.vc.apply(null, arguments)
                },
                rd = g._emscripten_bind_DebugDrawer_DebugDrawer_0 = function() {
                    return g.asm.wc.apply(null, arguments)
                },
                sd = g._emscripten_bind_DebugDrawer___destroy___0 = function() {
                    return g.asm.xc.apply(null, arguments)
                },
                td = g._emscripten_bind_DebugDrawer_draw3dText_2 = function() {
                    return g.asm.yc.apply(null, arguments)
                },
                ud = g._emscripten_bind_DebugDrawer_drawContactPoint_5 = function() {
                    return g.asm.zc.apply(null, arguments)
                },
                vd = g._emscripten_bind_DebugDrawer_drawLine_3 = function() {
                    return g.asm.Ac.apply(null,
                        arguments)
                },
                wd = g._emscripten_bind_DebugDrawer_getDebugMode_0 = function() {
                    return g.asm.Bc.apply(null, arguments)
                },
                xd = g._emscripten_bind_DebugDrawer_reportErrorWarning_1 = function() {
                    return g.asm.Cc.apply(null, arguments)
                },
                yd = g._emscripten_bind_DebugDrawer_setDebugMode_1 = function() {
                    return g.asm.Dc.apply(null, arguments)
                },
                zd = g._emscripten_bind_LocalConvexResult_LocalConvexResult_5 = function() {
                    return g.asm.Ec.apply(null, arguments)
                },
                Ad = g._emscripten_bind_LocalConvexResult___destroy___0 = function() {
                    return g.asm.Fc.apply(null,
                        arguments)
                },
                Bd = g._emscripten_bind_LocalConvexResult_get_m_hitCollisionObject_0 = function() {
                    return g.asm.Gc.apply(null, arguments)
                },
                Cd = g._emscripten_bind_LocalConvexResult_get_m_hitFraction_0 = function() {
                    return g.asm.Hc.apply(null, arguments)
                },
                Dd = g._emscripten_bind_LocalConvexResult_get_m_hitNormalLocal_0 = function() {
                    return g.asm.Ic.apply(null, arguments)
                },
                Ed = g._emscripten_bind_LocalConvexResult_get_m_hitPointLocal_0 = function() {
                    return g.asm.Jc.apply(null, arguments)
                },
                Fd = g._emscripten_bind_LocalConvexResult_get_m_localShapeInfo_0 =
                function() {
                    return g.asm.Kc.apply(null, arguments)
                },
                Gd = g._emscripten_bind_LocalConvexResult_set_m_hitCollisionObject_1 = function() {
                    return g.asm.Lc.apply(null, arguments)
                },
                Hd = g._emscripten_bind_LocalConvexResult_set_m_hitFraction_1 = function() {
                    return g.asm.Mc.apply(null, arguments)
                },
                Id = g._emscripten_bind_LocalConvexResult_set_m_hitNormalLocal_1 = function() {
                    return g.asm.Nc.apply(null, arguments)
                },
                Jd = g._emscripten_bind_LocalConvexResult_set_m_hitPointLocal_1 = function() {
                    return g.asm.Oc.apply(null, arguments)
                },
                Kd = g._emscripten_bind_LocalConvexResult_set_m_localShapeInfo_1 = function() {
                    return g.asm.Pc.apply(null, arguments)
                },
                Ld = g._emscripten_bind_LocalShapeInfo___destroy___0 = function() {
                    return g.asm.Qc.apply(null, arguments)
                },
                Md = g._emscripten_bind_LocalShapeInfo_get_m_shapePart_0 = function() {
                    return g.asm.Rc.apply(null, arguments)
                },
                Nd = g._emscripten_bind_LocalShapeInfo_get_m_triangleIndex_0 = function() {
                    return g.asm.Sc.apply(null, arguments)
                },
                Od = g._emscripten_bind_LocalShapeInfo_set_m_shapePart_1 = function() {
                    return g.asm.Tc.apply(null,
                        arguments)
                },
                Pd = g._emscripten_bind_LocalShapeInfo_set_m_triangleIndex_1 = function() {
                    return g.asm.Uc.apply(null, arguments)
                },
                Qd = g._emscripten_bind_Material___destroy___0 = function() {
                    return g.asm.Vc.apply(null, arguments)
                },
                Rd = g._emscripten_bind_Material_get_m_flags_0 = function() {
                    return g.asm.Wc.apply(null, arguments)
                },
                Sd = g._emscripten_bind_Material_get_m_kAST_0 = function() {
                    return g.asm.Xc.apply(null, arguments)
                },
                Td = g._emscripten_bind_Material_get_m_kLST_0 = function() {
                    return g.asm.Yc.apply(null, arguments)
                },
                Ud =
                g._emscripten_bind_Material_get_m_kVST_0 = function() {
                    return g.asm.Zc.apply(null, arguments)
                },
                Vd = g._emscripten_bind_Material_set_m_flags_1 = function() {
                    return g.asm._c.apply(null, arguments)
                },
                Wd = g._emscripten_bind_Material_set_m_kAST_1 = function() {
                    return g.asm.$c.apply(null, arguments)
                },
                Xd = g._emscripten_bind_Material_set_m_kLST_1 = function() {
                    return g.asm.ad.apply(null, arguments)
                },
                Yd = g._emscripten_bind_Material_set_m_kVST_1 = function() {
                    return g.asm.bd.apply(null, arguments)
                },
                Zd = g._emscripten_bind_Node___destroy___0 =
                function() {
                    return g.asm.cd.apply(null, arguments)
                },
                $d = g._emscripten_bind_Node_get_m_area_0 = function() {
                    return g.asm.dd.apply(null, arguments)
                },
                ae = g._emscripten_bind_Node_get_m_f_0 = function() {
                    return g.asm.ed.apply(null, arguments)
                },
                be = g._emscripten_bind_Node_get_m_im_0 = function() {
                    return g.asm.fd.apply(null, arguments)
                },
                ce = g._emscripten_bind_Node_get_m_n_0 = function() {
                    return g.asm.gd.apply(null, arguments)
                },
                de = g._emscripten_bind_Node_get_m_q_0 = function() {
                    return g.asm.hd.apply(null, arguments)
                },
                ee = g._emscripten_bind_Node_get_m_v_0 =
                function() {
                    return g.asm.id.apply(null, arguments)
                },
                fe = g._emscripten_bind_Node_get_m_x_0 = function() {
                    return g.asm.jd.apply(null, arguments)
                },
                ge = g._emscripten_bind_Node_set_m_area_1 = function() {
                    return g.asm.kd.apply(null, arguments)
                },
                he = g._emscripten_bind_Node_set_m_f_1 = function() {
                    return g.asm.ld.apply(null, arguments)
                },
                ie = g._emscripten_bind_Node_set_m_im_1 = function() {
                    return g.asm.md.apply(null, arguments)
                },
                je = g._emscripten_bind_Node_set_m_n_1 = function() {
                    return g.asm.nd.apply(null, arguments)
                },
                ke = g._emscripten_bind_Node_set_m_q_1 =
                function() {
                    return g.asm.od.apply(null, arguments)
                },
                le = g._emscripten_bind_Node_set_m_v_1 = function() {
                    return g.asm.pd.apply(null, arguments)
                },
                me = g._emscripten_bind_Node_set_m_x_1 = function() {
                    return g.asm.qd.apply(null, arguments)
                },
                ne = g._emscripten_bind_RayResultCallback___destroy___0 = function() {
                    return g.asm.rd.apply(null, arguments)
                },
                oe = g._emscripten_bind_RayResultCallback_get_m_closestHitFraction_0 = function() {
                    return g.asm.sd.apply(null, arguments)
                },
                pe = g._emscripten_bind_RayResultCallback_get_m_collisionFilterGroup_0 =
                function() {
                    return g.asm.td.apply(null, arguments)
                },
                qe = g._emscripten_bind_RayResultCallback_get_m_collisionFilterMask_0 = function() {
                    return g.asm.ud.apply(null, arguments)
                },
                re = g._emscripten_bind_RayResultCallback_get_m_collisionObject_0 = function() {
                    return g.asm.vd.apply(null, arguments)
                },
                se = g._emscripten_bind_RayResultCallback_hasHit_0 = function() {
                    return g.asm.wd.apply(null, arguments)
                },
                te = g._emscripten_bind_RayResultCallback_set_m_closestHitFraction_1 = function() {
                    return g.asm.xd.apply(null, arguments)
                },
                ue =
                g._emscripten_bind_RayResultCallback_set_m_collisionFilterGroup_1 = function() {
                    return g.asm.yd.apply(null, arguments)
                },
                ve = g._emscripten_bind_RayResultCallback_set_m_collisionFilterMask_1 = function() {
                    return g.asm.zd.apply(null, arguments)
                },
                we = g._emscripten_bind_RayResultCallback_set_m_collisionObject_1 = function() {
                    return g.asm.Ad.apply(null, arguments)
                },
                xe = g._emscripten_bind_RaycastInfo___destroy___0 = function() {
                    return g.asm.Bd.apply(null, arguments)
                },
                ye = g._emscripten_bind_RaycastInfo_get_m_contactNormalWS_0 =
                function() {
                    return g.asm.Cd.apply(null, arguments)
                },
                ze = g._emscripten_bind_RaycastInfo_get_m_contactPointWS_0 = function() {
                    return g.asm.Dd.apply(null, arguments)
                },
                Ae = g._emscripten_bind_RaycastInfo_get_m_groundObject_0 = function() {
                    return g.asm.Ed.apply(null, arguments)
                },
                Be = g._emscripten_bind_RaycastInfo_get_m_hardPointWS_0 = function() {
                    return g.asm.Fd.apply(null, arguments)
                },
                Ce = g._emscripten_bind_RaycastInfo_get_m_isInContact_0 = function() {
                    return g.asm.Gd.apply(null, arguments)
                },
                De = g._emscripten_bind_RaycastInfo_get_m_suspensionLength_0 =
                function() {
                    return g.asm.Hd.apply(null, arguments)
                },
                Ee = g._emscripten_bind_RaycastInfo_get_m_wheelAxleWS_0 = function() {
                    return g.asm.Id.apply(null, arguments)
                },
                Fe = g._emscripten_bind_RaycastInfo_get_m_wheelDirectionWS_0 = function() {
                    return g.asm.Jd.apply(null, arguments)
                },
                Ge = g._emscripten_bind_RaycastInfo_set_m_contactNormalWS_1 = function() {
                    return g.asm.Kd.apply(null, arguments)
                },
                He = g._emscripten_bind_RaycastInfo_set_m_contactPointWS_1 = function() {
                    return g.asm.Ld.apply(null, arguments)
                },
                Ie = g._emscripten_bind_RaycastInfo_set_m_groundObject_1 =
                function() {
                    return g.asm.Md.apply(null, arguments)
                },
                Je = g._emscripten_bind_RaycastInfo_set_m_hardPointWS_1 = function() {
                    return g.asm.Nd.apply(null, arguments)
                },
                Ke = g._emscripten_bind_RaycastInfo_set_m_isInContact_1 = function() {
                    return g.asm.Od.apply(null, arguments)
                },
                Le = g._emscripten_bind_RaycastInfo_set_m_suspensionLength_1 = function() {
                    return g.asm.Pd.apply(null, arguments)
                },
                Me = g._emscripten_bind_RaycastInfo_set_m_wheelAxleWS_1 = function() {
                    return g.asm.Qd.apply(null, arguments)
                },
                Ne = g._emscripten_bind_RaycastInfo_set_m_wheelDirectionWS_1 =
                function() {
                    return g.asm.Rd.apply(null, arguments)
                },
                Oe = g._emscripten_bind_VoidPtr___destroy___0 = function() {
                    return g.asm.Sd.apply(null, arguments)
                },
                Pe = g._emscripten_bind_btActionInterface___destroy___0 = function() {
                    return g.asm.Td.apply(null, arguments)
                },
                Qe = g._emscripten_bind_btActionInterface_updateAction_2 = function() {
                    return g.asm.Ud.apply(null, arguments)
                },
                Re = g._emscripten_bind_btAxisSweep3___destroy___0 = function() {
                    return g.asm.Vd.apply(null, arguments)
                },
                Se = g._emscripten_bind_btAxisSweep3_btAxisSweep3_2 =
                function() {
                    return g.asm.Wd.apply(null, arguments)
                },
                Te = g._emscripten_bind_btAxisSweep3_btAxisSweep3_3 = function() {
                    return g.asm.Xd.apply(null, arguments)
                },
                Ue = g._emscripten_bind_btAxisSweep3_btAxisSweep3_4 = function() {
                    return g.asm.Yd.apply(null, arguments)
                },
                Ve = g._emscripten_bind_btAxisSweep3_btAxisSweep3_5 = function() {
                    return g.asm.Zd.apply(null, arguments)
                },
                We = g._emscripten_bind_btBoxShape___destroy___0 = function() {
                    return g.asm._d.apply(null, arguments)
                },
                Xe = g._emscripten_bind_btBoxShape_btBoxShape_1 = function() {
                    return g.asm.$d.apply(null,
                        arguments)
                },
                Ye = g._emscripten_bind_btBoxShape_calculateLocalInertia_2 = function() {
                    return g.asm.ae.apply(null, arguments)
                },
                Ze = g._emscripten_bind_btBoxShape_getLocalScaling_0 = function() {
                    return g.asm.be.apply(null, arguments)
                },
                $e = g._emscripten_bind_btBoxShape_getMargin_0 = function() {
                    return g.asm.ce.apply(null, arguments)
                },
                af = g._emscripten_bind_btBoxShape_setLocalScaling_1 = function() {
                    return g.asm.de.apply(null, arguments)
                },
                bf = g._emscripten_bind_btBoxShape_setMargin_1 = function() {
                    return g.asm.ee.apply(null, arguments)
                },
                cf = g._emscripten_bind_btBroadphaseInterface___destroy___0 = function() {
                    return g.asm.fe.apply(null, arguments)
                },
                df = g._emscripten_bind_btBroadphaseProxy___destroy___0 = function() {
                    return g.asm.ge.apply(null, arguments)
                },
                ef = g._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterGroup_0 = function() {
                    return g.asm.he.apply(null, arguments)
                },
                ff = g._emscripten_bind_btBroadphaseProxy_get_m_collisionFilterMask_0 = function() {
                    return g.asm.ie.apply(null, arguments)
                },
                gf = g._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterGroup_1 =
                function() {
                    return g.asm.je.apply(null, arguments)
                },
                hf = g._emscripten_bind_btBroadphaseProxy_set_m_collisionFilterMask_1 = function() {
                    return g.asm.ke.apply(null, arguments)
                },
                jf = g._emscripten_bind_btBvhTriangleMeshShape___destroy___0 = function() {
                    return g.asm.le.apply(null, arguments)
                },
                kf = g._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_2 = function() {
                    return g.asm.me.apply(null, arguments)
                },
                lf = g._emscripten_bind_btBvhTriangleMeshShape_btBvhTriangleMeshShape_3 = function() {
                    return g.asm.ne.apply(null,
                        arguments)
                },
                mf = g._emscripten_bind_btBvhTriangleMeshShape_calculateLocalInertia_2 = function() {
                    return g.asm.oe.apply(null, arguments)
                },
                nf = g._emscripten_bind_btBvhTriangleMeshShape_getLocalScaling_0 = function() {
                    return g.asm.pe.apply(null, arguments)
                },
                of = g._emscripten_bind_btBvhTriangleMeshShape_setLocalScaling_1 = function() {
                    return g.asm.qe.apply(null, arguments)
                },
                pf = g._emscripten_bind_btCapsuleShapeX___destroy___0 = function() {
                    return g.asm.re.apply(null, arguments)
                },
                qf = g._emscripten_bind_btCapsuleShapeX_btCapsuleShapeX_2 =
                function() {
                    return g.asm.se.apply(null, arguments)
                },
                rf = g._emscripten_bind_btCapsuleShapeX_calculateLocalInertia_2 = function() {
                    return g.asm.te.apply(null, arguments)
                },
                sf = g._emscripten_bind_btCapsuleShapeX_getHalfHeight_0 = function() {
                    return g.asm.ue.apply(null, arguments)
                },
                tf = g._emscripten_bind_btCapsuleShapeX_getLocalScaling_0 = function() {
                    return g.asm.ve.apply(null, arguments)
                },
                uf = g._emscripten_bind_btCapsuleShapeX_getMargin_0 = function() {
                    return g.asm.we.apply(null, arguments)
                },
                vf = g._emscripten_bind_btCapsuleShapeX_getRadius_0 =
                function() {
                    return g.asm.xe.apply(null, arguments)
                },
                wf = g._emscripten_bind_btCapsuleShapeX_getUpAxis_0 = function() {
                    return g.asm.ye.apply(null, arguments)
                },
                xf = g._emscripten_bind_btCapsuleShapeX_setLocalScaling_1 = function() {
                    return g.asm.ze.apply(null, arguments)
                },
                yf = g._emscripten_bind_btCapsuleShapeX_setMargin_1 = function() {
                    return g.asm.Ae.apply(null, arguments)
                },
                zf = g._emscripten_bind_btCapsuleShapeZ___destroy___0 = function() {
                    return g.asm.Be.apply(null, arguments)
                },
                Af = g._emscripten_bind_btCapsuleShapeZ_btCapsuleShapeZ_2 =
                function() {
                    return g.asm.Ce.apply(null, arguments)
                },
                Bf = g._emscripten_bind_btCapsuleShapeZ_calculateLocalInertia_2 = function() {
                    return g.asm.De.apply(null, arguments)
                },
                Cf = g._emscripten_bind_btCapsuleShapeZ_getHalfHeight_0 = function() {
                    return g.asm.Ee.apply(null, arguments)
                },
                Df = g._emscripten_bind_btCapsuleShapeZ_getLocalScaling_0 = function() {
                    return g.asm.Fe.apply(null, arguments)
                },
                Ef = g._emscripten_bind_btCapsuleShapeZ_getMargin_0 = function() {
                    return g.asm.Ge.apply(null, arguments)
                },
                Ff = g._emscripten_bind_btCapsuleShapeZ_getRadius_0 =
                function() {
                    return g.asm.He.apply(null, arguments)
                },
                Gf = g._emscripten_bind_btCapsuleShapeZ_getUpAxis_0 = function() {
                    return g.asm.Ie.apply(null, arguments)
                },
                Hf = g._emscripten_bind_btCapsuleShapeZ_setLocalScaling_1 = function() {
                    return g.asm.Je.apply(null, arguments)
                },
                If = g._emscripten_bind_btCapsuleShapeZ_setMargin_1 = function() {
                    return g.asm.Ke.apply(null, arguments)
                },
                Jf = g._emscripten_bind_btCapsuleShape___destroy___0 = function() {
                    return g.asm.Le.apply(null, arguments)
                },
                Kf = g._emscripten_bind_btCapsuleShape_btCapsuleShape_2 =
                function() {
                    return g.asm.Me.apply(null, arguments)
                },
                Lf = g._emscripten_bind_btCapsuleShape_calculateLocalInertia_2 = function() {
                    return g.asm.Ne.apply(null, arguments)
                },
                Mf = g._emscripten_bind_btCapsuleShape_getHalfHeight_0 = function() {
                    return g.asm.Oe.apply(null, arguments)
                },
                Nf = g._emscripten_bind_btCapsuleShape_getLocalScaling_0 = function() {
                    return g.asm.Pe.apply(null, arguments)
                },
                Of = g._emscripten_bind_btCapsuleShape_getMargin_0 = function() {
                    return g.asm.Qe.apply(null, arguments)
                },
                Pf = g._emscripten_bind_btCapsuleShape_getRadius_0 =
                function() {
                    return g.asm.Re.apply(null, arguments)
                },
                Qf = g._emscripten_bind_btCapsuleShape_getUpAxis_0 = function() {
                    return g.asm.Se.apply(null, arguments)
                },
                Rf = g._emscripten_bind_btCapsuleShape_setLocalScaling_1 = function() {
                    return g.asm.Te.apply(null, arguments)
                },
                Sf = g._emscripten_bind_btCapsuleShape_setMargin_1 = function() {
                    return g.asm.Ue.apply(null, arguments)
                },
                Tf = g._emscripten_bind_btCollisionConfiguration___destroy___0 = function() {
                    return g.asm.Ve.apply(null, arguments)
                },
                Uf = g._emscripten_bind_btCollisionDispatcher___destroy___0 =
                function() {
                    return g.asm.We.apply(null, arguments)
                },
                Vf = g._emscripten_bind_btCollisionDispatcher_btCollisionDispatcher_1 = function() {
                    return g.asm.Xe.apply(null, arguments)
                },
                Wf = g._emscripten_bind_btCollisionDispatcher_getManifoldByIndexInternal_1 = function() {
                    return g.asm.Ye.apply(null, arguments)
                },
                Xf = g._emscripten_bind_btCollisionDispatcher_getNumManifolds_0 = function() {
                    return g.asm.Ze.apply(null, arguments)
                },
                Yf = g._emscripten_bind_btCollisionObject___destroy___0 = function() {
                    return g.asm._e.apply(null, arguments)
                },
                Zf = g._emscripten_bind_btCollisionObject_activate_0 = function() {
                    return g.asm.$e.apply(null, arguments)
                },
                $f = g._emscripten_bind_btCollisionObject_activate_1 = function() {
                    return g.asm.af.apply(null, arguments)
                },
                ag = g._emscripten_bind_btCollisionObject_forceActivationState_1 = function() {
                    return g.asm.bf.apply(null, arguments)
                },
                bg = g._emscripten_bind_btCollisionObject_getCollisionFlags_0 = function() {
                    return g.asm.cf.apply(null, arguments)
                },
                cg = g._emscripten_bind_btCollisionObject_getCollisionShape_0 = function() {
                    return g.asm.df.apply(null,
                        arguments)
                },
                dg = g._emscripten_bind_btCollisionObject_getUserIndex_0 = function() {
                    return g.asm.ef.apply(null, arguments)
                },
                eg = g._emscripten_bind_btCollisionObject_getUserPointer_0 = function() {
                    return g.asm.ff.apply(null, arguments)
                },
                fg = g._emscripten_bind_btCollisionObject_getWorldTransform_0 = function() {
                    return g.asm.gf.apply(null, arguments)
                },
                gg = g._emscripten_bind_btCollisionObject_isActive_0 = function() {
                    return g.asm.hf.apply(null, arguments)
                },
                hg = g._emscripten_bind_btCollisionObject_isKinematicObject_0 = function() {
                    return g.asm.jf.apply(null,
                        arguments)
                },
                ig = g._emscripten_bind_btCollisionObject_isStaticObject_0 = function() {
                    return g.asm.kf.apply(null, arguments)
                },
                jg = g._emscripten_bind_btCollisionObject_isStaticOrKinematicObject_0 = function() {
                    return g.asm.lf.apply(null, arguments)
                },
                kg = g._emscripten_bind_btCollisionObject_setActivationState_1 = function() {
                    return g.asm.mf.apply(null, arguments)
                },
                lg = g._emscripten_bind_btCollisionObject_setAnisotropicFriction_2 = function() {
                    return g.asm.nf.apply(null, arguments)
                },
                mg = g._emscripten_bind_btCollisionObject_setCcdMotionThreshold_1 =
                function() {
                    return g.asm.of.apply(null, arguments)
                },
                ng = g._emscripten_bind_btCollisionObject_setCcdSweptSphereRadius_1 = function() {
                    return g.asm.pf.apply(null, arguments)
                },
                og = g._emscripten_bind_btCollisionObject_setCollisionFlags_1 = function() {
                    return g.asm.qf.apply(null, arguments)
                },
                pg = g._emscripten_bind_btCollisionObject_setCollisionShape_1 = function() {
                    return g.asm.rf.apply(null, arguments)
                },
                qg = g._emscripten_bind_btCollisionObject_setContactProcessingThreshold_1 = function() {
                    return g.asm.sf.apply(null, arguments)
                },
                rg = g._emscripten_bind_btCollisionObject_setFriction_1 = function() {
                    return g.asm.tf.apply(null, arguments)
                },
                sg = g._emscripten_bind_btCollisionObject_setRestitution_1 = function() {
                    return g.asm.uf.apply(null, arguments)
                },
                tg = g._emscripten_bind_btCollisionObject_setRollingFriction_1 = function() {
                    return g.asm.vf.apply(null, arguments)
                },
                ug = g._emscripten_bind_btCollisionObject_setUserIndex_1 = function() {
                    return g.asm.wf.apply(null, arguments)
                },
                vg = g._emscripten_bind_btCollisionObject_setUserPointer_1 = function() {
                    return g.asm.xf.apply(null,
                        arguments)
                },
                wg = g._emscripten_bind_btCollisionObject_setWorldTransform_1 = function() {
                    return g.asm.yf.apply(null, arguments)
                },
                xg = g._emscripten_bind_btCollisionShape___destroy___0 = function() {
                    return g.asm.zf.apply(null, arguments)
                },
                yg = g._emscripten_bind_btCollisionShape_calculateLocalInertia_2 = function() {
                    return g.asm.Af.apply(null, arguments)
                },
                zg = g._emscripten_bind_btCollisionShape_getLocalScaling_0 = function() {
                    return g.asm.Bf.apply(null, arguments)
                },
                Ag = g._emscripten_bind_btCollisionShape_getMargin_0 = function() {
                    return g.asm.Cf.apply(null,
                        arguments)
                },
                Bg = g._emscripten_bind_btCollisionShape_setLocalScaling_1 = function() {
                    return g.asm.Df.apply(null, arguments)
                },
                Cg = g._emscripten_bind_btCollisionShape_setMargin_1 = function() {
                    return g.asm.Ef.apply(null, arguments)
                },
                Dg = g._emscripten_bind_btCollisionWorld___destroy___0 = function() {
                    return g.asm.Ff.apply(null, arguments)
                },
                Eg = g._emscripten_bind_btCollisionWorld_addCollisionObject_1 = function() {
                    return g.asm.Gf.apply(null, arguments)
                },
                Fg = g._emscripten_bind_btCollisionWorld_addCollisionObject_2 = function() {
                    return g.asm.Hf.apply(null,
                        arguments)
                },
                Gg = g._emscripten_bind_btCollisionWorld_addCollisionObject_3 = function() {
                    return g.asm.If.apply(null, arguments)
                },
                Hg = g._emscripten_bind_btCollisionWorld_contactPairTest_3 = function() {
                    return g.asm.Jf.apply(null, arguments)
                },
                Ig = g._emscripten_bind_btCollisionWorld_contactTest_2 = function() {
                    return g.asm.Kf.apply(null, arguments)
                },
                Jg = g._emscripten_bind_btCollisionWorld_convexSweepTest_5 = function() {
                    return g.asm.Lf.apply(null, arguments)
                },
                Kg = g._emscripten_bind_btCollisionWorld_debugDrawObject_3 = function() {
                    return g.asm.Mf.apply(null,
                        arguments)
                },
                Lg = g._emscripten_bind_btCollisionWorld_debugDrawWorld_0 = function() {
                    return g.asm.Nf.apply(null, arguments)
                },
                Mg = g._emscripten_bind_btCollisionWorld_getBroadphase_0 = function() {
                    return g.asm.Of.apply(null, arguments)
                },
                Ng = g._emscripten_bind_btCollisionWorld_getDebugDrawer_0 = function() {
                    return g.asm.Pf.apply(null, arguments)
                },
                Og = g._emscripten_bind_btCollisionWorld_getDispatchInfo_0 = function() {
                    return g.asm.Qf.apply(null, arguments)
                },
                Pg = g._emscripten_bind_btCollisionWorld_getDispatcher_0 = function() {
                    return g.asm.Rf.apply(null,
                        arguments)
                },
                Qg = g._emscripten_bind_btCollisionWorld_getPairCache_0 = function() {
                    return g.asm.Sf.apply(null, arguments)
                },
                Rg = g._emscripten_bind_btCollisionWorld_rayTest_3 = function() {
                    return g.asm.Tf.apply(null, arguments)
                },
                Sg = g._emscripten_bind_btCollisionWorld_removeCollisionObject_1 = function() {
                    return g.asm.Uf.apply(null, arguments)
                },
                Tg = g._emscripten_bind_btCollisionWorld_setDebugDrawer_1 = function() {
                    return g.asm.Vf.apply(null, arguments)
                },
                Ug = g._emscripten_bind_btCollisionWorld_updateSingleAabb_1 = function() {
                    return g.asm.Wf.apply(null,
                        arguments)
                },
                Vg = g._emscripten_bind_btCompoundShape___destroy___0 = function() {
                    return g.asm.Xf.apply(null, arguments)
                },
                Wg = g._emscripten_bind_btCompoundShape_addChildShape_2 = function() {
                    return g.asm.Yf.apply(null, arguments)
                },
                Xg = g._emscripten_bind_btCompoundShape_btCompoundShape_0 = function() {
                    return g.asm.Zf.apply(null, arguments)
                },
                Yg = g._emscripten_bind_btCompoundShape_btCompoundShape_1 = function() {
                    return g.asm._f.apply(null, arguments)
                },
                Zg = g._emscripten_bind_btCompoundShape_calculateLocalInertia_2 = function() {
                    return g.asm.$f.apply(null,
                        arguments)
                },
                $g = g._emscripten_bind_btCompoundShape_getChildShape_1 = function() {
                    return g.asm.ag.apply(null, arguments)
                },
                ah = g._emscripten_bind_btCompoundShape_getLocalScaling_0 = function() {
                    return g.asm.bg.apply(null, arguments)
                },
                bh = g._emscripten_bind_btCompoundShape_getMargin_0 = function() {
                    return g.asm.cg.apply(null, arguments)
                },
                ch = g._emscripten_bind_btCompoundShape_getNumChildShapes_0 = function() {
                    return g.asm.dg.apply(null, arguments)
                },
                dh = g._emscripten_bind_btCompoundShape_removeChildShapeByIndex_1 = function() {
                    return g.asm.eg.apply(null,
                        arguments)
                },
                eh = g._emscripten_bind_btCompoundShape_removeChildShape_1 = function() {
                    return g.asm.fg.apply(null, arguments)
                },
                fh = g._emscripten_bind_btCompoundShape_setLocalScaling_1 = function() {
                    return g.asm.gg.apply(null, arguments)
                },
                gh = g._emscripten_bind_btCompoundShape_setMargin_1 = function() {
                    return g.asm.hg.apply(null, arguments)
                },
                hh = g._emscripten_bind_btConcaveShape___destroy___0 = function() {
                    return g.asm.ig.apply(null, arguments)
                },
                ih = g._emscripten_bind_btConcaveShape_calculateLocalInertia_2 = function() {
                    return g.asm.jg.apply(null,
                        arguments)
                },
                jh = g._emscripten_bind_btConcaveShape_getLocalScaling_0 = function() {
                    return g.asm.kg.apply(null, arguments)
                },
                kh = g._emscripten_bind_btConcaveShape_setLocalScaling_1 = function() {
                    return g.asm.lg.apply(null, arguments)
                },
                lh = g._emscripten_bind_btConeShapeX___destroy___0 = function() {
                    return g.asm.mg.apply(null, arguments)
                },
                mh = g._emscripten_bind_btConeShapeX_btConeShapeX_2 = function() {
                    return g.asm.ng.apply(null, arguments)
                },
                nh = g._emscripten_bind_btConeShapeX_calculateLocalInertia_2 = function() {
                    return g.asm.og.apply(null,
                        arguments)
                },
                oh = g._emscripten_bind_btConeShapeX_getLocalScaling_0 = function() {
                    return g.asm.pg.apply(null, arguments)
                },
                ph = g._emscripten_bind_btConeShapeX_setLocalScaling_1 = function() {
                    return g.asm.qg.apply(null, arguments)
                },
                qh = g._emscripten_bind_btConeShapeZ___destroy___0 = function() {
                    return g.asm.rg.apply(null, arguments)
                },
                rh = g._emscripten_bind_btConeShapeZ_btConeShapeZ_2 = function() {
                    return g.asm.sg.apply(null, arguments)
                },
                sh = g._emscripten_bind_btConeShapeZ_calculateLocalInertia_2 = function() {
                    return g.asm.tg.apply(null,
                        arguments)
                },
                th = g._emscripten_bind_btConeShapeZ_getLocalScaling_0 = function() {
                    return g.asm.ug.apply(null, arguments)
                },
                uh = g._emscripten_bind_btConeShapeZ_setLocalScaling_1 = function() {
                    return g.asm.vg.apply(null, arguments)
                },
                vh = g._emscripten_bind_btConeShape___destroy___0 = function() {
                    return g.asm.wg.apply(null, arguments)
                },
                wh = g._emscripten_bind_btConeShape_btConeShape_2 = function() {
                    return g.asm.xg.apply(null, arguments)
                },
                xh = g._emscripten_bind_btConeShape_calculateLocalInertia_2 = function() {
                    return g.asm.yg.apply(null,
                        arguments)
                },
                yh = g._emscripten_bind_btConeShape_getLocalScaling_0 = function() {
                    return g.asm.zg.apply(null, arguments)
                },
                zh = g._emscripten_bind_btConeShape_setLocalScaling_1 = function() {
                    return g.asm.Ag.apply(null, arguments)
                },
                Ah = g._emscripten_bind_btConeTwistConstraint___destroy___0 = function() {
                    return g.asm.Bg.apply(null, arguments)
                },
                Bh = g._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_2 = function() {
                    return g.asm.Cg.apply(null, arguments)
                },
                Ch = g._emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_4 =
                function() {
                    return g.asm.Dg.apply(null, arguments)
                },
                Dh = g._emscripten_bind_btConeTwistConstraint_enableFeedback_1 = function() {
                    return g.asm.Eg.apply(null, arguments)
                },
                Eh = g._emscripten_bind_btConeTwistConstraint_enableMotor_1 = function() {
                    return g.asm.Fg.apply(null, arguments)
                },
                Fh = g._emscripten_bind_btConeTwistConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.Gg.apply(null, arguments)
                },
                Gh = g._emscripten_bind_btConeTwistConstraint_getParam_2 = function() {
                    return g.asm.Hg.apply(null, arguments)
                },
                Hh =
                g._emscripten_bind_btConeTwistConstraint_setAngularOnly_1 = function() {
                    return g.asm.Ig.apply(null, arguments)
                },
                Ih = g._emscripten_bind_btConeTwistConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.Jg.apply(null, arguments)
                },
                Jh = g._emscripten_bind_btConeTwistConstraint_setDamping_1 = function() {
                    return g.asm.Kg.apply(null, arguments)
                },
                Kh = g._emscripten_bind_btConeTwistConstraint_setLimit_2 = function() {
                    return g.asm.Lg.apply(null, arguments)
                },
                Lh = g._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulseNormalized_1 =
                function() {
                    return g.asm.Mg.apply(null, arguments)
                },
                Mh = g._emscripten_bind_btConeTwistConstraint_setMaxMotorImpulse_1 = function() {
                    return g.asm.Ng.apply(null, arguments)
                },
                Nh = g._emscripten_bind_btConeTwistConstraint_setMotorTargetInConstraintSpace_1 = function() {
                    return g.asm.Og.apply(null, arguments)
                },
                Oh = g._emscripten_bind_btConeTwistConstraint_setMotorTarget_1 = function() {
                    return g.asm.Pg.apply(null, arguments)
                },
                Ph = g._emscripten_bind_btConeTwistConstraint_setParam_3 = function() {
                    return g.asm.Qg.apply(null, arguments)
                },
                Qh = g._emscripten_bind_btConstraintSetting___destroy___0 = function() {
                    return g.asm.Rg.apply(null, arguments)
                },
                Rh = g._emscripten_bind_btConstraintSetting_btConstraintSetting_0 = function() {
                    return g.asm.Sg.apply(null, arguments)
                },
                Sh = g._emscripten_bind_btConstraintSetting_get_m_damping_0 = function() {
                    return g.asm.Tg.apply(null, arguments)
                },
                Th = g._emscripten_bind_btConstraintSetting_get_m_impulseClamp_0 = function() {
                    return g.asm.Ug.apply(null, arguments)
                },
                Uh = g._emscripten_bind_btConstraintSetting_get_m_tau_0 = function() {
                    return g.asm.Vg.apply(null,
                        arguments)
                },
                Vh = g._emscripten_bind_btConstraintSetting_set_m_damping_1 = function() {
                    return g.asm.Wg.apply(null, arguments)
                },
                Wh = g._emscripten_bind_btConstraintSetting_set_m_impulseClamp_1 = function() {
                    return g.asm.Xg.apply(null, arguments)
                },
                Xh = g._emscripten_bind_btConstraintSetting_set_m_tau_1 = function() {
                    return g.asm.Yg.apply(null, arguments)
                },
                Yh = g._emscripten_bind_btConstraintSolver___destroy___0 = function() {
                    return g.asm.Zg.apply(null, arguments)
                },
                Zh = g._emscripten_bind_btContactSolverInfo___destroy___0 = function() {
                    return g.asm._g.apply(null,
                        arguments)
                },
                $h = g._emscripten_bind_btContactSolverInfo_get_m_numIterations_0 = function() {
                    return g.asm.$g.apply(null, arguments)
                },
                ai = g._emscripten_bind_btContactSolverInfo_get_m_splitImpulsePenetrationThreshold_0 = function() {
                    return g.asm.ah.apply(null, arguments)
                },
                bi = g._emscripten_bind_btContactSolverInfo_get_m_splitImpulse_0 = function() {
                    return g.asm.bh.apply(null, arguments)
                },
                ci = g._emscripten_bind_btContactSolverInfo_set_m_numIterations_1 = function() {
                    return g.asm.ch.apply(null, arguments)
                },
                di = g._emscripten_bind_btContactSolverInfo_set_m_splitImpulsePenetrationThreshold_1 =
                function() {
                    return g.asm.dh.apply(null, arguments)
                },
                ei = g._emscripten_bind_btContactSolverInfo_set_m_splitImpulse_1 = function() {
                    return g.asm.eh.apply(null, arguments)
                },
                fi = g._emscripten_bind_btConvexHullShape___destroy___0 = function() {
                    return g.asm.fh.apply(null, arguments)
                },
                gi = g._emscripten_bind_btConvexHullShape_addPoint_1 = function() {
                    return g.asm.gh.apply(null, arguments)
                },
                hi = g._emscripten_bind_btConvexHullShape_addPoint_2 = function() {
                    return g.asm.hh.apply(null, arguments)
                },
                ii = g._emscripten_bind_btConvexHullShape_btConvexHullShape_0 =
                function() {
                    return g.asm.ih.apply(null, arguments)
                },
                ji = g._emscripten_bind_btConvexHullShape_btConvexHullShape_1 = function() {
                    return g.asm.jh.apply(null, arguments)
                },
                ki = g._emscripten_bind_btConvexHullShape_btConvexHullShape_2 = function() {
                    return g.asm.kh.apply(null, arguments)
                },
                li = g._emscripten_bind_btConvexHullShape_calculateLocalInertia_2 = function() {
                    return g.asm.lh.apply(null, arguments)
                },
                mi = g._emscripten_bind_btConvexHullShape_getConvexPolyhedron_0 = function() {
                    return g.asm.mh.apply(null, arguments)
                },
                ni = g._emscripten_bind_btConvexHullShape_getLocalScaling_0 =
                function() {
                    return g.asm.nh.apply(null, arguments)
                },
                oi = g._emscripten_bind_btConvexHullShape_getMargin_0 = function() {
                    return g.asm.oh.apply(null, arguments)
                },
                pi = g._emscripten_bind_btConvexHullShape_getNumVertices_0 = function() {
                    return g.asm.ph.apply(null, arguments)
                },
                qi = g._emscripten_bind_btConvexHullShape_initializePolyhedralFeatures_1 = function() {
                    return g.asm.qh.apply(null, arguments)
                },
                ri = g._emscripten_bind_btConvexHullShape_recalcLocalAabb_0 = function() {
                    return g.asm.rh.apply(null, arguments)
                },
                si = g._emscripten_bind_btConvexHullShape_setLocalScaling_1 =
                function() {
                    return g.asm.sh.apply(null, arguments)
                },
                ti = g._emscripten_bind_btConvexHullShape_setMargin_1 = function() {
                    return g.asm.th.apply(null, arguments)
                },
                ui = g._emscripten_bind_btConvexPolyhedron___destroy___0 = function() {
                    return g.asm.uh.apply(null, arguments)
                },
                vi = g._emscripten_bind_btConvexPolyhedron_get_m_faces_0 = function() {
                    return g.asm.vh.apply(null, arguments)
                },
                wi = g._emscripten_bind_btConvexPolyhedron_get_m_vertices_0 = function() {
                    return g.asm.wh.apply(null, arguments)
                },
                xi = g._emscripten_bind_btConvexPolyhedron_set_m_faces_1 =
                function() {
                    return g.asm.xh.apply(null, arguments)
                },
                yi = g._emscripten_bind_btConvexPolyhedron_set_m_vertices_1 = function() {
                    return g.asm.yh.apply(null, arguments)
                },
                zi = g._emscripten_bind_btConvexShape___destroy___0 = function() {
                    return g.asm.zh.apply(null, arguments)
                },
                Ai = g._emscripten_bind_btConvexShape_calculateLocalInertia_2 = function() {
                    return g.asm.Ah.apply(null, arguments)
                },
                Bi = g._emscripten_bind_btConvexShape_getLocalScaling_0 = function() {
                    return g.asm.Bh.apply(null, arguments)
                },
                Ci = g._emscripten_bind_btConvexShape_getMargin_0 =
                function() {
                    return g.asm.Ch.apply(null, arguments)
                },
                Di = g._emscripten_bind_btConvexShape_setLocalScaling_1 = function() {
                    return g.asm.Dh.apply(null, arguments)
                },
                Ei = g._emscripten_bind_btConvexShape_setMargin_1 = function() {
                    return g.asm.Eh.apply(null, arguments)
                },
                Fi = g._emscripten_bind_btConvexTriangleMeshShape___destroy___0 = function() {
                    return g.asm.Fh.apply(null, arguments)
                },
                Gi = g._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_1 = function() {
                    return g.asm.Gh.apply(null, arguments)
                },
                Hi = g._emscripten_bind_btConvexTriangleMeshShape_btConvexTriangleMeshShape_2 =
                function() {
                    return g.asm.Hh.apply(null, arguments)
                },
                Ii = g._emscripten_bind_btConvexTriangleMeshShape_calculateLocalInertia_2 = function() {
                    return g.asm.Ih.apply(null, arguments)
                },
                Ji = g._emscripten_bind_btConvexTriangleMeshShape_getLocalScaling_0 = function() {
                    return g.asm.Jh.apply(null, arguments)
                },
                Ki = g._emscripten_bind_btConvexTriangleMeshShape_getMargin_0 = function() {
                    return g.asm.Kh.apply(null, arguments)
                },
                Li = g._emscripten_bind_btConvexTriangleMeshShape_setLocalScaling_1 = function() {
                    return g.asm.Lh.apply(null,
                        arguments)
                },
                Mi = g._emscripten_bind_btConvexTriangleMeshShape_setMargin_1 = function() {
                    return g.asm.Mh.apply(null, arguments)
                },
                Ni = g._emscripten_bind_btCylinderShapeX___destroy___0 = function() {
                    return g.asm.Nh.apply(null, arguments)
                },
                Oi = g._emscripten_bind_btCylinderShapeX_btCylinderShapeX_1 = function() {
                    return g.asm.Oh.apply(null, arguments)
                },
                Pi = g._emscripten_bind_btCylinderShapeX_calculateLocalInertia_2 = function() {
                    return g.asm.Ph.apply(null, arguments)
                },
                Qi = g._emscripten_bind_btCylinderShapeX_getLocalScaling_0 =
                function() {
                    return g.asm.Qh.apply(null, arguments)
                },
                Ri = g._emscripten_bind_btCylinderShapeX_getMargin_0 = function() {
                    return g.asm.Rh.apply(null, arguments)
                },
                Si = g._emscripten_bind_btCylinderShapeX_setLocalScaling_1 = function() {
                    return g.asm.Sh.apply(null, arguments)
                },
                Ti = g._emscripten_bind_btCylinderShapeX_setMargin_1 = function() {
                    return g.asm.Th.apply(null, arguments)
                },
                Ui = g._emscripten_bind_btCylinderShapeZ___destroy___0 = function() {
                    return g.asm.Uh.apply(null, arguments)
                },
                Vi = g._emscripten_bind_btCylinderShapeZ_btCylinderShapeZ_1 =
                function() {
                    return g.asm.Vh.apply(null, arguments)
                },
                Wi = g._emscripten_bind_btCylinderShapeZ_calculateLocalInertia_2 = function() {
                    return g.asm.Wh.apply(null, arguments)
                },
                Xi = g._emscripten_bind_btCylinderShapeZ_getLocalScaling_0 = function() {
                    return g.asm.Xh.apply(null, arguments)
                },
                Yi = g._emscripten_bind_btCylinderShapeZ_getMargin_0 = function() {
                    return g.asm.Yh.apply(null, arguments)
                },
                Zi = g._emscripten_bind_btCylinderShapeZ_setLocalScaling_1 = function() {
                    return g.asm.Zh.apply(null, arguments)
                },
                $i = g._emscripten_bind_btCylinderShapeZ_setMargin_1 =
                function() {
                    return g.asm._h.apply(null, arguments)
                },
                aj = g._emscripten_bind_btCylinderShape___destroy___0 = function() {
                    return g.asm.$h.apply(null, arguments)
                },
                bj = g._emscripten_bind_btCylinderShape_btCylinderShape_1 = function() {
                    return g.asm.ai.apply(null, arguments)
                },
                cj = g._emscripten_bind_btCylinderShape_calculateLocalInertia_2 = function() {
                    return g.asm.bi.apply(null, arguments)
                },
                dj = g._emscripten_bind_btCylinderShape_getLocalScaling_0 = function() {
                    return g.asm.ci.apply(null, arguments)
                },
                ej = g._emscripten_bind_btCylinderShape_getMargin_0 =
                function() {
                    return g.asm.di.apply(null, arguments)
                },
                fj = g._emscripten_bind_btCylinderShape_setLocalScaling_1 = function() {
                    return g.asm.ei.apply(null, arguments)
                },
                gj = g._emscripten_bind_btCylinderShape_setMargin_1 = function() {
                    return g.asm.fi.apply(null, arguments)
                },
                hj = g._emscripten_bind_btDbvtBroadphase___destroy___0 = function() {
                    return g.asm.gi.apply(null, arguments)
                },
                ij = g._emscripten_bind_btDbvtBroadphase_btDbvtBroadphase_0 = function() {
                    return g.asm.hi.apply(null, arguments)
                },
                jj = g._emscripten_bind_btDefaultCollisionConfiguration___destroy___0 =
                function() {
                    return g.asm.ii.apply(null, arguments)
                },
                kj = g._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_0 = function() {
                    return g.asm.ji.apply(null, arguments)
                },
                lj = g._emscripten_bind_btDefaultCollisionConfiguration_btDefaultCollisionConfiguration_1 = function() {
                    return g.asm.ki.apply(null, arguments)
                },
                mj = g._emscripten_bind_btDefaultCollisionConstructionInfo___destroy___0 = function() {
                    return g.asm.li.apply(null, arguments)
                },
                nj = g._emscripten_bind_btDefaultCollisionConstructionInfo_btDefaultCollisionConstructionInfo_0 =
                function() {
                    return g.asm.mi.apply(null, arguments)
                },
                oj = g._emscripten_bind_btDefaultMotionState___destroy___0 = function() {
                    return g.asm.ni.apply(null, arguments)
                },
                pj = g._emscripten_bind_btDefaultMotionState_btDefaultMotionState_0 = function() {
                    return g.asm.oi.apply(null, arguments)
                },
                qj = g._emscripten_bind_btDefaultMotionState_btDefaultMotionState_1 = function() {
                    return g.asm.pi.apply(null, arguments)
                },
                rj = g._emscripten_bind_btDefaultMotionState_btDefaultMotionState_2 = function() {
                    return g.asm.qi.apply(null, arguments)
                },
                sj = g._emscripten_bind_btDefaultMotionState_getWorldTransform_1 = function() {
                    return g.asm.ri.apply(null, arguments)
                },
                tj = g._emscripten_bind_btDefaultMotionState_get_m_graphicsWorldTrans_0 = function() {
                    return g.asm.si.apply(null, arguments)
                },
                uj = g._emscripten_bind_btDefaultMotionState_setWorldTransform_1 = function() {
                    return g.asm.ti.apply(null, arguments)
                },
                vj = g._emscripten_bind_btDefaultMotionState_set_m_graphicsWorldTrans_1 = function() {
                    return g.asm.ui.apply(null, arguments)
                },
                wj = g._emscripten_bind_btDefaultSoftBodySolver___destroy___0 =
                function() {
                    return g.asm.vi.apply(null, arguments)
                },
                xj = g._emscripten_bind_btDefaultSoftBodySolver_btDefaultSoftBodySolver_0 = function() {
                    return g.asm.wi.apply(null, arguments)
                },
                yj = g._emscripten_bind_btDefaultVehicleRaycaster___destroy___0 = function() {
                    return g.asm.xi.apply(null, arguments)
                },
                zj = g._emscripten_bind_btDefaultVehicleRaycaster_btDefaultVehicleRaycaster_1 = function() {
                    return g.asm.yi.apply(null, arguments)
                },
                Aj = g._emscripten_bind_btDefaultVehicleRaycaster_castRay_3 = function() {
                    return g.asm.zi.apply(null,
                        arguments)
                },
                Bj = g._emscripten_bind_btDiscreteDynamicsWorld___destroy___0 = function() {
                    return g.asm.Ai.apply(null, arguments)
                },
                Cj = g._emscripten_bind_btDiscreteDynamicsWorld_addAction_1 = function() {
                    return g.asm.Bi.apply(null, arguments)
                },
                Dj = g._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_1 = function() {
                    return g.asm.Ci.apply(null, arguments)
                },
                Ej = g._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_2 = function() {
                    return g.asm.Di.apply(null, arguments)
                },
                Fj = g._emscripten_bind_btDiscreteDynamicsWorld_addCollisionObject_3 =
                function() {
                    return g.asm.Ei.apply(null, arguments)
                },
                Gj = g._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_1 = function() {
                    return g.asm.Fi.apply(null, arguments)
                },
                Hj = g._emscripten_bind_btDiscreteDynamicsWorld_addConstraint_2 = function() {
                    return g.asm.Gi.apply(null, arguments)
                },
                Ij = g._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_1 = function() {
                    return g.asm.Hi.apply(null, arguments)
                },
                Jj = g._emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_3 = function() {
                    return g.asm.Ii.apply(null, arguments)
                },
                Kj = g._emscripten_bind_btDiscreteDynamicsWorld_btDiscreteDynamicsWorld_4 =
                function() {
                    return g.asm.Ji.apply(null, arguments)
                },
                Lj = g._emscripten_bind_btDiscreteDynamicsWorld_contactPairTest_3 = function() {
                    return g.asm.Ki.apply(null, arguments)
                },
                Mj = g._emscripten_bind_btDiscreteDynamicsWorld_contactTest_2 = function() {
                    return g.asm.Li.apply(null, arguments)
                },
                Nj = g._emscripten_bind_btDiscreteDynamicsWorld_convexSweepTest_5 = function() {
                    return g.asm.Mi.apply(null, arguments)
                },
                Oj = g._emscripten_bind_btDiscreteDynamicsWorld_debugDrawObject_3 = function() {
                    return g.asm.Ni.apply(null, arguments)
                },
                Pj = g._emscripten_bind_btDiscreteDynamicsWorld_debugDrawWorld_0 = function() {
                    return g.asm.Oi.apply(null, arguments)
                },
                Qj = g._emscripten_bind_btDiscreteDynamicsWorld_getBroadphase_0 = function() {
                    return g.asm.Pi.apply(null, arguments)
                },
                Rj = g._emscripten_bind_btDiscreteDynamicsWorld_getDebugDrawer_0 = function() {
                    return g.asm.Qi.apply(null, arguments)
                },
                Sj = g._emscripten_bind_btDiscreteDynamicsWorld_getDispatchInfo_0 = function() {
                    return g.asm.Ri.apply(null, arguments)
                },
                Tj = g._emscripten_bind_btDiscreteDynamicsWorld_getDispatcher_0 =
                function() {
                    return g.asm.Si.apply(null, arguments)
                },
                Uj = g._emscripten_bind_btDiscreteDynamicsWorld_getGravity_0 = function() {
                    return g.asm.Ti.apply(null, arguments)
                },
                Vj = g._emscripten_bind_btDiscreteDynamicsWorld_getPairCache_0 = function() {
                    return g.asm.Ui.apply(null, arguments)
                },
                Wj = g._emscripten_bind_btDiscreteDynamicsWorld_getSolverInfo_0 = function() {
                    return g.asm.Vi.apply(null, arguments)
                },
                Xj = g._emscripten_bind_btDiscreteDynamicsWorld_rayTest_3 = function() {
                    return g.asm.Wi.apply(null, arguments)
                },
                Yj = g._emscripten_bind_btDiscreteDynamicsWorld_removeAction_1 =
                function() {
                    return g.asm.Xi.apply(null, arguments)
                },
                Zj = g._emscripten_bind_btDiscreteDynamicsWorld_removeCollisionObject_1 = function() {
                    return g.asm.Yi.apply(null, arguments)
                },
                ak = g._emscripten_bind_btDiscreteDynamicsWorld_removeConstraint_1 = function() {
                    return g.asm.Zi.apply(null, arguments)
                },
                bk = g._emscripten_bind_btDiscreteDynamicsWorld_removeRigidBody_1 = function() {
                    return g.asm._i.apply(null, arguments)
                },
                ck = g._emscripten_bind_btDiscreteDynamicsWorld_setContactAddedCallback_1 = function() {
                    return g.asm.$i.apply(null,
                        arguments)
                },
                dk = g._emscripten_bind_btDiscreteDynamicsWorld_setContactDestroyedCallback_1 = function() {
                    return g.asm.aj.apply(null, arguments)
                },
                ek = g._emscripten_bind_btDiscreteDynamicsWorld_setContactProcessedCallback_1 = function() {
                    return g.asm.bj.apply(null, arguments)
                },
                fk = g._emscripten_bind_btDiscreteDynamicsWorld_setDebugDrawer_1 = function() {
                    return g.asm.cj.apply(null, arguments)
                },
                gk = g._emscripten_bind_btDiscreteDynamicsWorld_setGravity_1 = function() {
                    return g.asm.dj.apply(null, arguments)
                },
                hk = g._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_1 =
                function() {
                    return g.asm.ej.apply(null, arguments)
                },
                ik = g._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_2 = function() {
                    return g.asm.fj.apply(null, arguments)
                },
                jk = g._emscripten_bind_btDiscreteDynamicsWorld_stepSimulation_3 = function() {
                    return g.asm.gj.apply(null, arguments)
                },
                kk = g._emscripten_bind_btDiscreteDynamicsWorld_updateSingleAabb_1 = function() {
                    return g.asm.hj.apply(null, arguments)
                },
                lk = g._emscripten_bind_btDispatcherInfo___destroy___0 = function() {
                    return g.asm.ij.apply(null, arguments)
                },
                mk = g._emscripten_bind_btDispatcherInfo_get_m_allowedCcdPenetration_0 =
                function() {
                    return g.asm.jj.apply(null, arguments)
                },
                nk = g._emscripten_bind_btDispatcherInfo_get_m_convexConservativeDistanceThreshold_0 = function() {
                    return g.asm.kj.apply(null, arguments)
                },
                ok = g._emscripten_bind_btDispatcherInfo_get_m_dispatchFunc_0 = function() {
                    return g.asm.lj.apply(null, arguments)
                },
                pk = g._emscripten_bind_btDispatcherInfo_get_m_enableSPU_0 = function() {
                    return g.asm.mj.apply(null, arguments)
                },
                qk = g._emscripten_bind_btDispatcherInfo_get_m_enableSatConvex_0 = function() {
                    return g.asm.nj.apply(null,
                        arguments)
                },
                rk = g._emscripten_bind_btDispatcherInfo_get_m_stepCount_0 = function() {
                    return g.asm.oj.apply(null, arguments)
                },
                sk = g._emscripten_bind_btDispatcherInfo_get_m_timeOfImpact_0 = function() {
                    return g.asm.pj.apply(null, arguments)
                },
                tk = g._emscripten_bind_btDispatcherInfo_get_m_timeStep_0 = function() {
                    return g.asm.qj.apply(null, arguments)
                },
                uk = g._emscripten_bind_btDispatcherInfo_get_m_useContinuous_0 = function() {
                    return g.asm.rj.apply(null, arguments)
                },
                vk = g._emscripten_bind_btDispatcherInfo_get_m_useConvexConservativeDistanceUtil_0 =
                function() {
                    return g.asm.sj.apply(null, arguments)
                },
                wk = g._emscripten_bind_btDispatcherInfo_get_m_useEpa_0 = function() {
                    return g.asm.tj.apply(null, arguments)
                },
                xk = g._emscripten_bind_btDispatcherInfo_set_m_allowedCcdPenetration_1 = function() {
                    return g.asm.uj.apply(null, arguments)
                },
                yk = g._emscripten_bind_btDispatcherInfo_set_m_convexConservativeDistanceThreshold_1 = function() {
                    return g.asm.vj.apply(null, arguments)
                },
                zk = g._emscripten_bind_btDispatcherInfo_set_m_dispatchFunc_1 = function() {
                    return g.asm.wj.apply(null,
                        arguments)
                },
                Ak = g._emscripten_bind_btDispatcherInfo_set_m_enableSPU_1 = function() {
                    return g.asm.xj.apply(null, arguments)
                },
                Bk = g._emscripten_bind_btDispatcherInfo_set_m_enableSatConvex_1 = function() {
                    return g.asm.yj.apply(null, arguments)
                },
                Ck = g._emscripten_bind_btDispatcherInfo_set_m_stepCount_1 = function() {
                    return g.asm.zj.apply(null, arguments)
                },
                Dk = g._emscripten_bind_btDispatcherInfo_set_m_timeOfImpact_1 = function() {
                    return g.asm.Aj.apply(null, arguments)
                },
                Ek = g._emscripten_bind_btDispatcherInfo_set_m_timeStep_1 =
                function() {
                    return g.asm.Bj.apply(null, arguments)
                },
                Fk = g._emscripten_bind_btDispatcherInfo_set_m_useContinuous_1 = function() {
                    return g.asm.Cj.apply(null, arguments)
                },
                Gk = g._emscripten_bind_btDispatcherInfo_set_m_useConvexConservativeDistanceUtil_1 = function() {
                    return g.asm.Dj.apply(null, arguments)
                },
                Hk = g._emscripten_bind_btDispatcherInfo_set_m_useEpa_1 = function() {
                    return g.asm.Ej.apply(null, arguments)
                },
                Ik = g._emscripten_bind_btDispatcher___destroy___0 = function() {
                    return g.asm.Fj.apply(null, arguments)
                },
                Jk = g._emscripten_bind_btDispatcher_getManifoldByIndexInternal_1 =
                function() {
                    return g.asm.Gj.apply(null, arguments)
                },
                Kk = g._emscripten_bind_btDispatcher_getNumManifolds_0 = function() {
                    return g.asm.Hj.apply(null, arguments)
                },
                Lk = g._emscripten_bind_btDynamicsWorld___destroy___0 = function() {
                    return g.asm.Ij.apply(null, arguments)
                },
                Mk = g._emscripten_bind_btDynamicsWorld_addAction_1 = function() {
                    return g.asm.Jj.apply(null, arguments)
                },
                Nk = g._emscripten_bind_btDynamicsWorld_addCollisionObject_1 = function() {
                    return g.asm.Kj.apply(null, arguments)
                },
                Ok = g._emscripten_bind_btDynamicsWorld_addCollisionObject_2 =
                function() {
                    return g.asm.Lj.apply(null, arguments)
                },
                Pk = g._emscripten_bind_btDynamicsWorld_addCollisionObject_3 = function() {
                    return g.asm.Mj.apply(null, arguments)
                },
                Qk = g._emscripten_bind_btDynamicsWorld_contactPairTest_3 = function() {
                    return g.asm.Nj.apply(null, arguments)
                },
                Rk = g._emscripten_bind_btDynamicsWorld_contactTest_2 = function() {
                    return g.asm.Oj.apply(null, arguments)
                },
                Sk = g._emscripten_bind_btDynamicsWorld_convexSweepTest_5 = function() {
                    return g.asm.Pj.apply(null, arguments)
                },
                Tk = g._emscripten_bind_btDynamicsWorld_debugDrawObject_3 =
                function() {
                    return g.asm.Qj.apply(null, arguments)
                },
                Uk = g._emscripten_bind_btDynamicsWorld_debugDrawWorld_0 = function() {
                    return g.asm.Rj.apply(null, arguments)
                },
                Vk = g._emscripten_bind_btDynamicsWorld_getBroadphase_0 = function() {
                    return g.asm.Sj.apply(null, arguments)
                },
                Wk = g._emscripten_bind_btDynamicsWorld_getDebugDrawer_0 = function() {
                    return g.asm.Tj.apply(null, arguments)
                },
                Xk = g._emscripten_bind_btDynamicsWorld_getDispatchInfo_0 = function() {
                    return g.asm.Uj.apply(null, arguments)
                },
                Yk = g._emscripten_bind_btDynamicsWorld_getDispatcher_0 =
                function() {
                    return g.asm.Vj.apply(null, arguments)
                },
                Zk = g._emscripten_bind_btDynamicsWorld_getPairCache_0 = function() {
                    return g.asm.Wj.apply(null, arguments)
                },
                $k = g._emscripten_bind_btDynamicsWorld_getSolverInfo_0 = function() {
                    return g.asm.Xj.apply(null, arguments)
                },
                al = g._emscripten_bind_btDynamicsWorld_rayTest_3 = function() {
                    return g.asm.Yj.apply(null, arguments)
                },
                bl = g._emscripten_bind_btDynamicsWorld_removeAction_1 = function() {
                    return g.asm.Zj.apply(null, arguments)
                },
                cl = g._emscripten_bind_btDynamicsWorld_removeCollisionObject_1 =
                function() {
                    return g.asm._j.apply(null, arguments)
                },
                dl = g._emscripten_bind_btDynamicsWorld_setDebugDrawer_1 = function() {
                    return g.asm.$j.apply(null, arguments)
                },
                el = g._emscripten_bind_btDynamicsWorld_updateSingleAabb_1 = function() {
                    return g.asm.ak.apply(null, arguments)
                },
                fl = g._emscripten_bind_btFaceArray___destroy___0 = function() {
                    return g.asm.bk.apply(null, arguments)
                },
                gl = g._emscripten_bind_btFaceArray_at_1 = function() {
                    return g.asm.ck.apply(null, arguments)
                },
                hl = g._emscripten_bind_btFaceArray_size_0 = function() {
                    return g.asm.dk.apply(null,
                        arguments)
                },
                il = g._emscripten_bind_btFace___destroy___0 = function() {
                    return g.asm.ek.apply(null, arguments)
                },
                jl = g._emscripten_bind_btFace_get_m_indices_0 = function() {
                    return g.asm.fk.apply(null, arguments)
                },
                kl = g._emscripten_bind_btFace_get_m_plane_1 = function() {
                    return g.asm.gk.apply(null, arguments)
                },
                ll = g._emscripten_bind_btFace_set_m_indices_1 = function() {
                    return g.asm.hk.apply(null, arguments)
                },
                ml = g._emscripten_bind_btFace_set_m_plane_2 = function() {
                    return g.asm.ik.apply(null, arguments)
                },
                nl = g._emscripten_bind_btFixedConstraint___destroy___0 =
                function() {
                    return g.asm.jk.apply(null, arguments)
                },
                ol = g._emscripten_bind_btFixedConstraint_btFixedConstraint_4 = function() {
                    return g.asm.kk.apply(null, arguments)
                },
                pl = g._emscripten_bind_btFixedConstraint_enableFeedback_1 = function() {
                    return g.asm.lk.apply(null, arguments)
                },
                ql = g._emscripten_bind_btFixedConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.mk.apply(null, arguments)
                },
                rl = g._emscripten_bind_btFixedConstraint_getParam_2 = function() {
                    return g.asm.nk.apply(null, arguments)
                },
                sl = g._emscripten_bind_btFixedConstraint_setBreakingImpulseThreshold_1 =
                function() {
                    return g.asm.ok.apply(null, arguments)
                },
                tl = g._emscripten_bind_btFixedConstraint_setParam_3 = function() {
                    return g.asm.pk.apply(null, arguments)
                },
                ul = g._emscripten_bind_btGeneric6DofConstraint___destroy___0 = function() {
                    return g.asm.qk.apply(null, arguments)
                },
                vl = g._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_3 = function() {
                    return g.asm.rk.apply(null, arguments)
                },
                wl = g._emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_5 = function() {
                    return g.asm.sk.apply(null, arguments)
                },
                xl = g._emscripten_bind_btGeneric6DofConstraint_enableFeedback_1 = function() {
                    return g.asm.tk.apply(null, arguments)
                },
                yl = g._emscripten_bind_btGeneric6DofConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.uk.apply(null, arguments)
                },
                zl = g._emscripten_bind_btGeneric6DofConstraint_getFrameOffsetA_0 = function() {
                    return g.asm.vk.apply(null, arguments)
                },
                Al = g._emscripten_bind_btGeneric6DofConstraint_getParam_2 = function() {
                    return g.asm.wk.apply(null, arguments)
                },
                Bl = g._emscripten_bind_btGeneric6DofConstraint_setAngularLowerLimit_1 =
                function() {
                    return g.asm.xk.apply(null, arguments)
                },
                Cl = g._emscripten_bind_btGeneric6DofConstraint_setAngularUpperLimit_1 = function() {
                    return g.asm.yk.apply(null, arguments)
                },
                Dl = g._emscripten_bind_btGeneric6DofConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.zk.apply(null, arguments)
                },
                El = g._emscripten_bind_btGeneric6DofConstraint_setLinearLowerLimit_1 = function() {
                    return g.asm.Ak.apply(null, arguments)
                },
                Fl = g._emscripten_bind_btGeneric6DofConstraint_setLinearUpperLimit_1 = function() {
                    return g.asm.Bk.apply(null,
                        arguments)
                },
                Gl = g._emscripten_bind_btGeneric6DofConstraint_setParam_3 = function() {
                    return g.asm.Ck.apply(null, arguments)
                },
                Hl = g._emscripten_bind_btGeneric6DofSpringConstraint___destroy___0 = function() {
                    return g.asm.Dk.apply(null, arguments)
                },
                Il = g._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_3 = function() {
                    return g.asm.Ek.apply(null, arguments)
                },
                Jl = g._emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_5 = function() {
                    return g.asm.Fk.apply(null, arguments)
                },
                Kl = g._emscripten_bind_btGeneric6DofSpringConstraint_enableFeedback_1 = function() {
                    return g.asm.Gk.apply(null, arguments)
                },
                Ll = g._emscripten_bind_btGeneric6DofSpringConstraint_enableSpring_2 = function() {
                    return g.asm.Hk.apply(null, arguments)
                },
                Ml = g._emscripten_bind_btGeneric6DofSpringConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.Ik.apply(null, arguments)
                },
                Nl = g._emscripten_bind_btGeneric6DofSpringConstraint_getFrameOffsetA_0 = function() {
                    return g.asm.Jk.apply(null, arguments)
                },
                Ol = g._emscripten_bind_btGeneric6DofSpringConstraint_getParam_2 =
                function() {
                    return g.asm.Kk.apply(null, arguments)
                },
                Pl = g._emscripten_bind_btGeneric6DofSpringConstraint_setAngularLowerLimit_1 = function() {
                    return g.asm.Lk.apply(null, arguments)
                },
                Ql = g._emscripten_bind_btGeneric6DofSpringConstraint_setAngularUpperLimit_1 = function() {
                    return g.asm.Mk.apply(null, arguments)
                },
                Rl = g._emscripten_bind_btGeneric6DofSpringConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.Nk.apply(null, arguments)
                },
                Sl = g._emscripten_bind_btGeneric6DofSpringConstraint_setDamping_2 = function() {
                    return g.asm.Ok.apply(null,
                        arguments)
                },
                Tl = g._emscripten_bind_btGeneric6DofSpringConstraint_setLinearLowerLimit_1 = function() {
                    return g.asm.Pk.apply(null, arguments)
                },
                Ul = g._emscripten_bind_btGeneric6DofSpringConstraint_setLinearUpperLimit_1 = function() {
                    return g.asm.Qk.apply(null, arguments)
                },
                Vl = g._emscripten_bind_btGeneric6DofSpringConstraint_setParam_3 = function() {
                    return g.asm.Rk.apply(null, arguments)
                },
                Wl = g._emscripten_bind_btGeneric6DofSpringConstraint_setStiffness_2 = function() {
                    return g.asm.Sk.apply(null, arguments)
                },
                Xl = g._emscripten_bind_btGhostObject___destroy___0 =
                function() {
                    return g.asm.Tk.apply(null, arguments)
                },
                Yl = g._emscripten_bind_btGhostObject_activate_0 = function() {
                    return g.asm.Uk.apply(null, arguments)
                },
                Zl = g._emscripten_bind_btGhostObject_activate_1 = function() {
                    return g.asm.Vk.apply(null, arguments)
                },
                $l = g._emscripten_bind_btGhostObject_btGhostObject_0 = function() {
                    return g.asm.Wk.apply(null, arguments)
                },
                am = g._emscripten_bind_btGhostObject_forceActivationState_1 = function() {
                    return g.asm.Xk.apply(null, arguments)
                },
                bm = g._emscripten_bind_btGhostObject_getCollisionFlags_0 =
                function() {
                    return g.asm.Yk.apply(null, arguments)
                },
                cm = g._emscripten_bind_btGhostObject_getCollisionShape_0 = function() {
                    return g.asm.Zk.apply(null, arguments)
                },
                dm = g._emscripten_bind_btGhostObject_getNumOverlappingObjects_0 = function() {
                    return g.asm._k.apply(null, arguments)
                },
                em = g._emscripten_bind_btGhostObject_getOverlappingObject_1 = function() {
                    return g.asm.$k.apply(null, arguments)
                },
                fm = g._emscripten_bind_btGhostObject_getUserIndex_0 = function() {
                    return g.asm.al.apply(null, arguments)
                },
                gm = g._emscripten_bind_btGhostObject_getUserPointer_0 =
                function() {
                    return g.asm.bl.apply(null, arguments)
                },
                hm = g._emscripten_bind_btGhostObject_getWorldTransform_0 = function() {
                    return g.asm.cl.apply(null, arguments)
                },
                im = g._emscripten_bind_btGhostObject_isActive_0 = function() {
                    return g.asm.dl.apply(null, arguments)
                },
                jm = g._emscripten_bind_btGhostObject_isKinematicObject_0 = function() {
                    return g.asm.el.apply(null, arguments)
                },
                km = g._emscripten_bind_btGhostObject_isStaticObject_0 = function() {
                    return g.asm.fl.apply(null, arguments)
                },
                lm = g._emscripten_bind_btGhostObject_isStaticOrKinematicObject_0 =
                function() {
                    return g.asm.gl.apply(null, arguments)
                },
                mm = g._emscripten_bind_btGhostObject_setActivationState_1 = function() {
                    return g.asm.hl.apply(null, arguments)
                },
                nm = g._emscripten_bind_btGhostObject_setAnisotropicFriction_2 = function() {
                    return g.asm.il.apply(null, arguments)
                },
                om = g._emscripten_bind_btGhostObject_setCcdMotionThreshold_1 = function() {
                    return g.asm.jl.apply(null, arguments)
                },
                pm = g._emscripten_bind_btGhostObject_setCcdSweptSphereRadius_1 = function() {
                    return g.asm.kl.apply(null, arguments)
                },
                qm = g._emscripten_bind_btGhostObject_setCollisionFlags_1 =
                function() {
                    return g.asm.ll.apply(null, arguments)
                },
                rm = g._emscripten_bind_btGhostObject_setCollisionShape_1 = function() {
                    return g.asm.ml.apply(null, arguments)
                },
                sm = g._emscripten_bind_btGhostObject_setContactProcessingThreshold_1 = function() {
                    return g.asm.nl.apply(null, arguments)
                },
                tm = g._emscripten_bind_btGhostObject_setFriction_1 = function() {
                    return g.asm.ol.apply(null, arguments)
                },
                um = g._emscripten_bind_btGhostObject_setRestitution_1 = function() {
                    return g.asm.pl.apply(null, arguments)
                },
                wm = g._emscripten_bind_btGhostObject_setRollingFriction_1 =
                function() {
                    return g.asm.ql.apply(null, arguments)
                },
                xm = g._emscripten_bind_btGhostObject_setUserIndex_1 = function() {
                    return g.asm.rl.apply(null, arguments)
                },
                ym = g._emscripten_bind_btGhostObject_setUserPointer_1 = function() {
                    return g.asm.sl.apply(null, arguments)
                },
                zm = g._emscripten_bind_btGhostObject_setWorldTransform_1 = function() {
                    return g.asm.tl.apply(null, arguments)
                },
                Am = g._emscripten_bind_btGhostPairCallback___destroy___0 = function() {
                    return g.asm.ul.apply(null, arguments)
                },
                Bm = g._emscripten_bind_btGhostPairCallback_btGhostPairCallback_0 =
                function() {
                    return g.asm.vl.apply(null, arguments)
                },
                Cm = g._emscripten_bind_btHeightfieldTerrainShape___destroy___0 = function() {
                    return g.asm.wl.apply(null, arguments)
                },
                Dm = g._emscripten_bind_btHeightfieldTerrainShape_btHeightfieldTerrainShape_9 = function() {
                    return g.asm.xl.apply(null, arguments)
                },
                Em = g._emscripten_bind_btHeightfieldTerrainShape_calculateLocalInertia_2 = function() {
                    return g.asm.yl.apply(null, arguments)
                },
                Fm = g._emscripten_bind_btHeightfieldTerrainShape_getLocalScaling_0 = function() {
                    return g.asm.zl.apply(null,
                        arguments)
                },
                Gm = g._emscripten_bind_btHeightfieldTerrainShape_getMargin_0 = function() {
                    return g.asm.Al.apply(null, arguments)
                },
                Hm = g._emscripten_bind_btHeightfieldTerrainShape_setLocalScaling_1 = function() {
                    return g.asm.Bl.apply(null, arguments)
                },
                Im = g._emscripten_bind_btHeightfieldTerrainShape_setMargin_1 = function() {
                    return g.asm.Cl.apply(null, arguments)
                },
                Jm = g._emscripten_bind_btHingeConstraint___destroy___0 = function() {
                    return g.asm.Dl.apply(null, arguments)
                },
                Km = g._emscripten_bind_btHingeConstraint_btHingeConstraint_2 =
                function() {
                    return g.asm.El.apply(null, arguments)
                },
                Lm = g._emscripten_bind_btHingeConstraint_btHingeConstraint_3 = function() {
                    return g.asm.Fl.apply(null, arguments)
                },
                Mm = g._emscripten_bind_btHingeConstraint_btHingeConstraint_4 = function() {
                    return g.asm.Gl.apply(null, arguments)
                },
                Nm = g._emscripten_bind_btHingeConstraint_btHingeConstraint_5 = function() {
                    return g.asm.Hl.apply(null, arguments)
                },
                Om = g._emscripten_bind_btHingeConstraint_btHingeConstraint_6 = function() {
                    return g.asm.Il.apply(null, arguments)
                },
                Pm = g._emscripten_bind_btHingeConstraint_btHingeConstraint_7 =
                function() {
                    return g.asm.Jl.apply(null, arguments)
                },
                Qm = g._emscripten_bind_btHingeConstraint_enableAngularMotor_3 = function() {
                    return g.asm.Kl.apply(null, arguments)
                },
                Rm = g._emscripten_bind_btHingeConstraint_enableFeedback_1 = function() {
                    return g.asm.Ll.apply(null, arguments)
                },
                Sm = g._emscripten_bind_btHingeConstraint_enableMotor_1 = function() {
                    return g.asm.Ml.apply(null, arguments)
                },
                Tm = g._emscripten_bind_btHingeConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.Nl.apply(null, arguments)
                },
                Um = g._emscripten_bind_btHingeConstraint_getParam_2 =
                function() {
                    return g.asm.Ol.apply(null, arguments)
                },
                Vm = g._emscripten_bind_btHingeConstraint_setAngularOnly_1 = function() {
                    return g.asm.Pl.apply(null, arguments)
                },
                Wm = g._emscripten_bind_btHingeConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.Ql.apply(null, arguments)
                },
                Xm = g._emscripten_bind_btHingeConstraint_setLimit_4 = function() {
                    return g.asm.Rl.apply(null, arguments)
                },
                Ym = g._emscripten_bind_btHingeConstraint_setLimit_5 = function() {
                    return g.asm.Sl.apply(null, arguments)
                },
                Zm = g._emscripten_bind_btHingeConstraint_setMaxMotorImpulse_1 =
                function() {
                    return g.asm.Tl.apply(null, arguments)
                },
                $m = g._emscripten_bind_btHingeConstraint_setMotorTarget_2 = function() {
                    return g.asm.Ul.apply(null, arguments)
                },
                an = g._emscripten_bind_btHingeConstraint_setParam_3 = function() {
                    return g.asm.Vl.apply(null, arguments)
                },
                bn = g._emscripten_bind_btIDebugDraw___destroy___0 = function() {
                    return g.asm.Wl.apply(null, arguments)
                },
                cn = g._emscripten_bind_btIDebugDraw_draw3dText_2 = function() {
                    return g.asm.Xl.apply(null, arguments)
                },
                dn = g._emscripten_bind_btIDebugDraw_drawContactPoint_5 =
                function() {
                    return g.asm.Yl.apply(null, arguments)
                },
                en = g._emscripten_bind_btIDebugDraw_drawLine_3 = function() {
                    return g.asm.Zl.apply(null, arguments)
                },
                fn = g._emscripten_bind_btIDebugDraw_getDebugMode_0 = function() {
                    return g.asm._l.apply(null, arguments)
                },
                gn = g._emscripten_bind_btIDebugDraw_reportErrorWarning_1 = function() {
                    return g.asm.$l.apply(null, arguments)
                },
                hn = g._emscripten_bind_btIDebugDraw_setDebugMode_1 = function() {
                    return g.asm.am.apply(null, arguments)
                },
                jn = g._emscripten_bind_btIntArray___destroy___0 = function() {
                    return g.asm.bm.apply(null,
                        arguments)
                },
                kn = g._emscripten_bind_btIntArray_at_1 = function() {
                    return g.asm.cm.apply(null, arguments)
                },
                ln = g._emscripten_bind_btIntArray_size_0 = function() {
                    return g.asm.dm.apply(null, arguments)
                },
                mn = g._emscripten_bind_btKinematicCharacterController___destroy___0 = function() {
                    return g.asm.em.apply(null, arguments)
                },
                nn = g._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_3 = function() {
                    return g.asm.fm.apply(null, arguments)
                },
                on = g._emscripten_bind_btKinematicCharacterController_btKinematicCharacterController_4 =
                function() {
                    return g.asm.gm.apply(null, arguments)
                },
                pn = g._emscripten_bind_btKinematicCharacterController_canJump_0 = function() {
                    return g.asm.hm.apply(null, arguments)
                },
                qn = g._emscripten_bind_btKinematicCharacterController_getGhostObject_0 = function() {
                    return g.asm.im.apply(null, arguments)
                },
                rn = g._emscripten_bind_btKinematicCharacterController_getGravity_0 = function() {
                    return g.asm.jm.apply(null, arguments)
                },
                sn = g._emscripten_bind_btKinematicCharacterController_getMaxSlope_0 = function() {
                    return g.asm.km.apply(null,
                        arguments)
                },
                tn = g._emscripten_bind_btKinematicCharacterController_jump_0 = function() {
                    return g.asm.lm.apply(null, arguments)
                },
                un = g._emscripten_bind_btKinematicCharacterController_onGround_0 = function() {
                    return g.asm.mm.apply(null, arguments)
                },
                vn = g._emscripten_bind_btKinematicCharacterController_playerStep_2 = function() {
                    return g.asm.nm.apply(null, arguments)
                },
                wn = g._emscripten_bind_btKinematicCharacterController_preStep_1 = function() {
                    return g.asm.om.apply(null, arguments)
                },
                xn = g._emscripten_bind_btKinematicCharacterController_setFallSpeed_1 =
                function() {
                    return g.asm.pm.apply(null, arguments)
                },
                yn = g._emscripten_bind_btKinematicCharacterController_setGravity_1 = function() {
                    return g.asm.qm.apply(null, arguments)
                },
                zn = g._emscripten_bind_btKinematicCharacterController_setJumpSpeed_1 = function() {
                    return g.asm.rm.apply(null, arguments)
                },
                An = g._emscripten_bind_btKinematicCharacterController_setMaxJumpHeight_1 = function() {
                    return g.asm.sm.apply(null, arguments)
                },
                Bn = g._emscripten_bind_btKinematicCharacterController_setMaxSlope_1 = function() {
                    return g.asm.tm.apply(null,
                        arguments)
                },
                Cn = g._emscripten_bind_btKinematicCharacterController_setUpAxis_1 = function() {
                    return g.asm.um.apply(null, arguments)
                },
                Dn = g._emscripten_bind_btKinematicCharacterController_setUpInterpolate_1 = function() {
                    return g.asm.vm.apply(null, arguments)
                },
                En = g._emscripten_bind_btKinematicCharacterController_setUseGhostSweepTest_1 = function() {
                    return g.asm.wm.apply(null, arguments)
                },
                Fn = g._emscripten_bind_btKinematicCharacterController_setVelocityForTimeInterval_2 = function() {
                    return g.asm.xm.apply(null, arguments)
                },
                Gn = g._emscripten_bind_btKinematicCharacterController_setWalkDirection_1 = function() {
                    return g.asm.ym.apply(null, arguments)
                },
                Hn = g._emscripten_bind_btKinematicCharacterController_updateAction_2 = function() {
                    return g.asm.zm.apply(null, arguments)
                },
                In = g._emscripten_bind_btKinematicCharacterController_warp_1 = function() {
                    return g.asm.Am.apply(null, arguments)
                },
                Jn = g._emscripten_bind_btManifoldPoint___destroy___0 = function() {
                    return g.asm.Bm.apply(null, arguments)
                },
                Kn = g._emscripten_bind_btManifoldPoint_getAppliedImpulse_0 =
                function() {
                    return g.asm.Cm.apply(null, arguments)
                },
                Ln = g._emscripten_bind_btManifoldPoint_getDistance_0 = function() {
                    return g.asm.Dm.apply(null, arguments)
                },
                Mn = g._emscripten_bind_btManifoldPoint_getPositionWorldOnA_0 = function() {
                    return g.asm.Em.apply(null, arguments)
                },
                Nn = g._emscripten_bind_btManifoldPoint_getPositionWorldOnB_0 = function() {
                    return g.asm.Fm.apply(null, arguments)
                },
                On = g._emscripten_bind_btManifoldPoint_get_m_localPointA_0 = function() {
                    return g.asm.Gm.apply(null, arguments)
                },
                Pn = g._emscripten_bind_btManifoldPoint_get_m_localPointB_0 =
                function() {
                    return g.asm.Hm.apply(null, arguments)
                },
                Qn = g._emscripten_bind_btManifoldPoint_get_m_normalWorldOnB_0 = function() {
                    return g.asm.Im.apply(null, arguments)
                },
                Rn = g._emscripten_bind_btManifoldPoint_get_m_positionWorldOnA_0 = function() {
                    return g.asm.Jm.apply(null, arguments)
                },
                Sn = g._emscripten_bind_btManifoldPoint_get_m_positionWorldOnB_0 = function() {
                    return g.asm.Km.apply(null, arguments)
                },
                Tn = g._emscripten_bind_btManifoldPoint_get_m_userPersistentData_0 = function() {
                    return g.asm.Lm.apply(null, arguments)
                },
                Un = g._emscripten_bind_btManifoldPoint_set_m_localPointA_1 = function() {
                    return g.asm.Mm.apply(null, arguments)
                },
                Vn = g._emscripten_bind_btManifoldPoint_set_m_localPointB_1 = function() {
                    return g.asm.Nm.apply(null, arguments)
                },
                Wn = g._emscripten_bind_btManifoldPoint_set_m_normalWorldOnB_1 = function() {
                    return g.asm.Om.apply(null, arguments)
                },
                Xn = g._emscripten_bind_btManifoldPoint_set_m_positionWorldOnA_1 = function() {
                    return g.asm.Pm.apply(null, arguments)
                },
                Yn = g._emscripten_bind_btManifoldPoint_set_m_positionWorldOnB_1 =
                function() {
                    return g.asm.Qm.apply(null, arguments)
                },
                Zn = g._emscripten_bind_btManifoldPoint_set_m_userPersistentData_1 = function() {
                    return g.asm.Rm.apply(null, arguments)
                },
                $n = g._emscripten_bind_btMatrix3x3___destroy___0 = function() {
                    return g.asm.Sm.apply(null, arguments)
                },
                ao = g._emscripten_bind_btMatrix3x3_getRotation_1 = function() {
                    return g.asm.Tm.apply(null, arguments)
                },
                bo = g._emscripten_bind_btMatrix3x3_getRow_1 = function() {
                    return g.asm.Um.apply(null, arguments)
                },
                co = g._emscripten_bind_btMatrix3x3_setEulerZYX_3 =
                function() {
                    return g.asm.Vm.apply(null, arguments)
                },
                eo = g._emscripten_bind_btMotionState___destroy___0 = function() {
                    return g.asm.Wm.apply(null, arguments)
                },
                fo = g._emscripten_bind_btMotionState_getWorldTransform_1 = function() {
                    return g.asm.Xm.apply(null, arguments)
                },
                go = g._emscripten_bind_btMotionState_setWorldTransform_1 = function() {
                    return g.asm.Ym.apply(null, arguments)
                },
                ho = g._emscripten_bind_btOverlappingPairCache___destroy___0 = function() {
                    return g.asm.Zm.apply(null, arguments)
                },
                io = g._emscripten_bind_btOverlappingPairCache_setInternalGhostPairCallback_1 =
                function() {
                    return g.asm._m.apply(null, arguments)
                },
                jo = g._emscripten_bind_btOverlappingPairCallback___destroy___0 = function() {
                    return g.asm.$m.apply(null, arguments)
                },
                ko = g._emscripten_bind_btPairCachingGhostObject___destroy___0 = function() {
                    return g.asm.an.apply(null, arguments)
                },
                lo = g._emscripten_bind_btPairCachingGhostObject_activate_0 = function() {
                    return g.asm.bn.apply(null, arguments)
                },
                mo = g._emscripten_bind_btPairCachingGhostObject_activate_1 = function() {
                    return g.asm.cn.apply(null, arguments)
                },
                no = g._emscripten_bind_btPairCachingGhostObject_btPairCachingGhostObject_0 =
                function() {
                    return g.asm.dn.apply(null, arguments)
                },
                oo = g._emscripten_bind_btPairCachingGhostObject_forceActivationState_1 = function() {
                    return g.asm.en.apply(null, arguments)
                },
                po = g._emscripten_bind_btPairCachingGhostObject_getCollisionFlags_0 = function() {
                    return g.asm.fn.apply(null, arguments)
                },
                qo = g._emscripten_bind_btPairCachingGhostObject_getCollisionShape_0 = function() {
                    return g.asm.gn.apply(null, arguments)
                },
                ro = g._emscripten_bind_btPairCachingGhostObject_getNumOverlappingObjects_0 = function() {
                    return g.asm.hn.apply(null,
                        arguments)
                },
                so = g._emscripten_bind_btPairCachingGhostObject_getOverlappingObject_1 = function() {
                    return g.asm.jn.apply(null, arguments)
                },
                to = g._emscripten_bind_btPairCachingGhostObject_getUserIndex_0 = function() {
                    return g.asm.kn.apply(null, arguments)
                },
                uo = g._emscripten_bind_btPairCachingGhostObject_getUserPointer_0 = function() {
                    return g.asm.ln.apply(null, arguments)
                },
                vo = g._emscripten_bind_btPairCachingGhostObject_getWorldTransform_0 = function() {
                    return g.asm.mn.apply(null, arguments)
                },
                wo = g._emscripten_bind_btPairCachingGhostObject_isActive_0 =
                function() {
                    return g.asm.nn.apply(null, arguments)
                },
                xo = g._emscripten_bind_btPairCachingGhostObject_isKinematicObject_0 = function() {
                    return g.asm.on.apply(null, arguments)
                },
                yo = g._emscripten_bind_btPairCachingGhostObject_isStaticObject_0 = function() {
                    return g.asm.pn.apply(null, arguments)
                },
                zo = g._emscripten_bind_btPairCachingGhostObject_isStaticOrKinematicObject_0 = function() {
                    return g.asm.qn.apply(null, arguments)
                },
                Ao = g._emscripten_bind_btPairCachingGhostObject_setActivationState_1 = function() {
                    return g.asm.rn.apply(null,
                        arguments)
                },
                Bo = g._emscripten_bind_btPairCachingGhostObject_setAnisotropicFriction_2 = function() {
                    return g.asm.sn.apply(null, arguments)
                },
                Co = g._emscripten_bind_btPairCachingGhostObject_setCcdMotionThreshold_1 = function() {
                    return g.asm.tn.apply(null, arguments)
                },
                Do = g._emscripten_bind_btPairCachingGhostObject_setCcdSweptSphereRadius_1 = function() {
                    return g.asm.un.apply(null, arguments)
                },
                Eo = g._emscripten_bind_btPairCachingGhostObject_setCollisionFlags_1 = function() {
                    return g.asm.vn.apply(null, arguments)
                },
                Fo = g._emscripten_bind_btPairCachingGhostObject_setCollisionShape_1 =
                function() {
                    return g.asm.wn.apply(null, arguments)
                },
                Go = g._emscripten_bind_btPairCachingGhostObject_setContactProcessingThreshold_1 = function() {
                    return g.asm.xn.apply(null, arguments)
                },
                Ho = g._emscripten_bind_btPairCachingGhostObject_setFriction_1 = function() {
                    return g.asm.yn.apply(null, arguments)
                },
                Io = g._emscripten_bind_btPairCachingGhostObject_setRestitution_1 = function() {
                    return g.asm.zn.apply(null, arguments)
                },
                Jo = g._emscripten_bind_btPairCachingGhostObject_setRollingFriction_1 = function() {
                    return g.asm.An.apply(null,
                        arguments)
                },
                Ko = g._emscripten_bind_btPairCachingGhostObject_setUserIndex_1 = function() {
                    return g.asm.Bn.apply(null, arguments)
                },
                Lo = g._emscripten_bind_btPairCachingGhostObject_setUserPointer_1 = function() {
                    return g.asm.Cn.apply(null, arguments)
                },
                Mo = g._emscripten_bind_btPairCachingGhostObject_setWorldTransform_1 = function() {
                    return g.asm.Dn.apply(null, arguments)
                },
                No = g._emscripten_bind_btPersistentManifold___destroy___0 = function() {
                    return g.asm.En.apply(null, arguments)
                },
                Oo = g._emscripten_bind_btPersistentManifold_btPersistentManifold_0 =
                function() {
                    return g.asm.Fn.apply(null, arguments)
                },
                Po = g._emscripten_bind_btPersistentManifold_getBody0_0 = function() {
                    return g.asm.Gn.apply(null, arguments)
                },
                Qo = g._emscripten_bind_btPersistentManifold_getBody1_0 = function() {
                    return g.asm.Hn.apply(null, arguments)
                },
                Ro = g._emscripten_bind_btPersistentManifold_getContactPoint_1 = function() {
                    return g.asm.In.apply(null, arguments)
                },
                So = g._emscripten_bind_btPersistentManifold_getNumContacts_0 = function() {
                    return g.asm.Jn.apply(null, arguments)
                },
                To = g._emscripten_bind_btPoint2PointConstraint___destroy___0 =
                function() {
                    return g.asm.Kn.apply(null, arguments)
                },
                Uo = g._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_2 = function() {
                    return g.asm.Ln.apply(null, arguments)
                },
                Vo = g._emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_4 = function() {
                    return g.asm.Mn.apply(null, arguments)
                },
                Wo = g._emscripten_bind_btPoint2PointConstraint_enableFeedback_1 = function() {
                    return g.asm.Nn.apply(null, arguments)
                },
                Xo = g._emscripten_bind_btPoint2PointConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.On.apply(null,
                        arguments)
                },
                Yo = g._emscripten_bind_btPoint2PointConstraint_getParam_2 = function() {
                    return g.asm.Pn.apply(null, arguments)
                },
                Zo = g._emscripten_bind_btPoint2PointConstraint_getPivotInA_0 = function() {
                    return g.asm.Qn.apply(null, arguments)
                },
                $o = g._emscripten_bind_btPoint2PointConstraint_getPivotInB_0 = function() {
                    return g.asm.Rn.apply(null, arguments)
                },
                ap = g._emscripten_bind_btPoint2PointConstraint_get_m_setting_0 = function() {
                    return g.asm.Sn.apply(null, arguments)
                },
                bp = g._emscripten_bind_btPoint2PointConstraint_setBreakingImpulseThreshold_1 =
                function() {
                    return g.asm.Tn.apply(null, arguments)
                },
                cp = g._emscripten_bind_btPoint2PointConstraint_setParam_3 = function() {
                    return g.asm.Un.apply(null, arguments)
                },
                dp = g._emscripten_bind_btPoint2PointConstraint_setPivotA_1 = function() {
                    return g.asm.Vn.apply(null, arguments)
                },
                ep = g._emscripten_bind_btPoint2PointConstraint_setPivotB_1 = function() {
                    return g.asm.Wn.apply(null, arguments)
                },
                fp = g._emscripten_bind_btPoint2PointConstraint_set_m_setting_1 = function() {
                    return g.asm.Xn.apply(null, arguments)
                },
                gp = g._emscripten_bind_btQuadWord___destroy___0 =
                function() {
                    return g.asm.Yn.apply(null, arguments)
                },
                hp = g._emscripten_bind_btQuadWord_setW_1 = function() {
                    return g.asm.Zn.apply(null, arguments)
                },
                ip = g._emscripten_bind_btQuadWord_setX_1 = function() {
                    return g.asm._n.apply(null, arguments)
                },
                jp = g._emscripten_bind_btQuadWord_setY_1 = function() {
                    return g.asm.$n.apply(null, arguments)
                },
                kp = g._emscripten_bind_btQuadWord_setZ_1 = function() {
                    return g.asm.ao.apply(null, arguments)
                },
                lp = g._emscripten_bind_btQuadWord_w_0 = function() {
                    return g.asm.bo.apply(null, arguments)
                },
                mp = g._emscripten_bind_btQuadWord_x_0 =
                function() {
                    return g.asm.co.apply(null, arguments)
                },
                np = g._emscripten_bind_btQuadWord_y_0 = function() {
                    return g.asm.eo.apply(null, arguments)
                },
                op = g._emscripten_bind_btQuadWord_z_0 = function() {
                    return g.asm.fo.apply(null, arguments)
                },
                pp = g._emscripten_bind_btQuaternion___destroy___0 = function() {
                    return g.asm.go.apply(null, arguments)
                },
                qp = g._emscripten_bind_btQuaternion_angleShortestPath_1 = function() {
                    return g.asm.ho.apply(null, arguments)
                },
                rp = g._emscripten_bind_btQuaternion_angle_1 = function() {
                    return g.asm.io.apply(null,
                        arguments)
                },
                sp = g._emscripten_bind_btQuaternion_btQuaternion_4 = function() {
                    return g.asm.jo.apply(null, arguments)
                },
                tp = g._emscripten_bind_btQuaternion_dot_1 = function() {
                    return g.asm.ko.apply(null, arguments)
                },
                up = g._emscripten_bind_btQuaternion_getAngleShortestPath_0 = function() {
                    return g.asm.lo.apply(null, arguments)
                },
                vp = g._emscripten_bind_btQuaternion_getAngle_0 = function() {
                    return g.asm.mo.apply(null, arguments)
                },
                wp = g._emscripten_bind_btQuaternion_getAxis_0 = function() {
                    return g.asm.no.apply(null, arguments)
                },
                xp = g._emscripten_bind_btQuaternion_inverse_0 = function() {
                    return g.asm.oo.apply(null, arguments)
                },
                yp = g._emscripten_bind_btQuaternion_length2_0 = function() {
                    return g.asm.po.apply(null, arguments)
                },
                zp = g._emscripten_bind_btQuaternion_length_0 = function() {
                    return g.asm.qo.apply(null, arguments)
                },
                Ap = g._emscripten_bind_btQuaternion_normalize_0 = function() {
                    return g.asm.ro.apply(null, arguments)
                },
                Bp = g._emscripten_bind_btQuaternion_normalized_0 = function() {
                    return g.asm.so.apply(null, arguments)
                },
                Cp = g._emscripten_bind_btQuaternion_op_add_1 =
                function() {
                    return g.asm.to.apply(null, arguments)
                },
                Dp = g._emscripten_bind_btQuaternion_op_div_1 = function() {
                    return g.asm.uo.apply(null, arguments)
                },
                Ep = g._emscripten_bind_btQuaternion_op_mul_1 = function() {
                    return g.asm.vo.apply(null, arguments)
                },
                Fp = g._emscripten_bind_btQuaternion_op_mulq_1 = function() {
                    return g.asm.wo.apply(null, arguments)
                },
                Gp = g._emscripten_bind_btQuaternion_op_sub_1 = function() {
                    return g.asm.xo.apply(null, arguments)
                },
                Hp = g._emscripten_bind_btQuaternion_setEulerZYX_3 = function() {
                    return g.asm.yo.apply(null,
                        arguments)
                },
                Ip = g._emscripten_bind_btQuaternion_setRotation_2 = function() {
                    return g.asm.zo.apply(null, arguments)
                },
                Jp = g._emscripten_bind_btQuaternion_setValue_4 = function() {
                    return g.asm.Ao.apply(null, arguments)
                },
                Kp = g._emscripten_bind_btQuaternion_setW_1 = function() {
                    return g.asm.Bo.apply(null, arguments)
                },
                Lp = g._emscripten_bind_btQuaternion_setX_1 = function() {
                    return g.asm.Co.apply(null, arguments)
                },
                Mp = g._emscripten_bind_btQuaternion_setY_1 = function() {
                    return g.asm.Do.apply(null, arguments)
                },
                Np = g._emscripten_bind_btQuaternion_setZ_1 =
                function() {
                    return g.asm.Eo.apply(null, arguments)
                },
                Op = g._emscripten_bind_btQuaternion_w_0 = function() {
                    return g.asm.Fo.apply(null, arguments)
                },
                Pp = g._emscripten_bind_btQuaternion_x_0 = function() {
                    return g.asm.Go.apply(null, arguments)
                },
                Qp = g._emscripten_bind_btQuaternion_y_0 = function() {
                    return g.asm.Ho.apply(null, arguments)
                },
                Rp = g._emscripten_bind_btQuaternion_z_0 = function() {
                    return g.asm.Io.apply(null, arguments)
                },
                Sp = g._emscripten_bind_btRaycastVehicle___destroy___0 = function() {
                    return g.asm.Jo.apply(null, arguments)
                },
                Tp = g._emscripten_bind_btRaycastVehicle_addWheel_7 = function() {
                    return g.asm.Ko.apply(null, arguments)
                },
                Up = g._emscripten_bind_btRaycastVehicle_applyEngineForce_2 = function() {
                    return g.asm.Lo.apply(null, arguments)
                },
                Vp = g._emscripten_bind_btRaycastVehicle_btRaycastVehicle_3 = function() {
                    return g.asm.Mo.apply(null, arguments)
                },
                Wp = g._emscripten_bind_btRaycastVehicle_getChassisWorldTransform_0 = function() {
                    return g.asm.No.apply(null, arguments)
                },
                Xp = g._emscripten_bind_btRaycastVehicle_getCurrentSpeedKmHour_0 = function() {
                    return g.asm.Oo.apply(null,
                        arguments)
                },
                Yp = g._emscripten_bind_btRaycastVehicle_getForwardAxis_0 = function() {
                    return g.asm.Po.apply(null, arguments)
                },
                Zp = g._emscripten_bind_btRaycastVehicle_getForwardVector_0 = function() {
                    return g.asm.Qo.apply(null, arguments)
                },
                $p = g._emscripten_bind_btRaycastVehicle_getNumWheels_0 = function() {
                    return g.asm.Ro.apply(null, arguments)
                },
                aq = g._emscripten_bind_btRaycastVehicle_getRightAxis_0 = function() {
                    return g.asm.So.apply(null, arguments)
                },
                bq = g._emscripten_bind_btRaycastVehicle_getRigidBody_0 = function() {
                    return g.asm.To.apply(null,
                        arguments)
                },
                cq = g._emscripten_bind_btRaycastVehicle_getSteeringValue_1 = function() {
                    return g.asm.Uo.apply(null, arguments)
                },
                dq = g._emscripten_bind_btRaycastVehicle_getUpAxis_0 = function() {
                    return g.asm.Vo.apply(null, arguments)
                },
                eq = g._emscripten_bind_btRaycastVehicle_getUserConstraintId_0 = function() {
                    return g.asm.Wo.apply(null, arguments)
                },
                fq = g._emscripten_bind_btRaycastVehicle_getUserConstraintType_0 = function() {
                    return g.asm.Xo.apply(null, arguments)
                },
                gq = g._emscripten_bind_btRaycastVehicle_getWheelInfo_1 = function() {
                    return g.asm.Yo.apply(null,
                        arguments)
                },
                hq = g._emscripten_bind_btRaycastVehicle_getWheelTransformWS_1 = function() {
                    return g.asm.Zo.apply(null, arguments)
                },
                iq = g._emscripten_bind_btRaycastVehicle_rayCast_1 = function() {
                    return g.asm._o.apply(null, arguments)
                },
                jq = g._emscripten_bind_btRaycastVehicle_resetSuspension_0 = function() {
                    return g.asm.$o.apply(null, arguments)
                },
                kq = g._emscripten_bind_btRaycastVehicle_setBrake_2 = function() {
                    return g.asm.ap.apply(null, arguments)
                },
                lq = g._emscripten_bind_btRaycastVehicle_setCoordinateSystem_3 = function() {
                    return g.asm.bp.apply(null,
                        arguments)
                },
                mq = g._emscripten_bind_btRaycastVehicle_setPitchControl_1 = function() {
                    return g.asm.cp.apply(null, arguments)
                },
                nq = g._emscripten_bind_btRaycastVehicle_setSteeringValue_2 = function() {
                    return g.asm.dp.apply(null, arguments)
                },
                oq = g._emscripten_bind_btRaycastVehicle_setUserConstraintId_1 = function() {
                    return g.asm.ep.apply(null, arguments)
                },
                pq = g._emscripten_bind_btRaycastVehicle_setUserConstraintType_1 = function() {
                    return g.asm.fp.apply(null, arguments)
                },
                qq = g._emscripten_bind_btRaycastVehicle_updateAction_2 =
                function() {
                    return g.asm.gp.apply(null, arguments)
                },
                rq = g._emscripten_bind_btRaycastVehicle_updateFriction_1 = function() {
                    return g.asm.hp.apply(null, arguments)
                },
                sq = g._emscripten_bind_btRaycastVehicle_updateSuspension_1 = function() {
                    return g.asm.ip.apply(null, arguments)
                },
                tq = g._emscripten_bind_btRaycastVehicle_updateVehicle_1 = function() {
                    return g.asm.jp.apply(null, arguments)
                },
                uq = g._emscripten_bind_btRaycastVehicle_updateWheelTransform_2 = function() {
                    return g.asm.kp.apply(null, arguments)
                },
                vq = g._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_1 =
                function() {
                    return g.asm.lp.apply(null, arguments)
                },
                wq = g._emscripten_bind_btRaycastVehicle_updateWheelTransformsWS_2 = function() {
                    return g.asm.mp.apply(null, arguments)
                },
                xq = g._emscripten_bind_btRigidBodyConstructionInfo___destroy___0 = function() {
                    return g.asm.np.apply(null, arguments)
                },
                yq = g._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_3 = function() {
                    return g.asm.op.apply(null, arguments)
                },
                zq = g._emscripten_bind_btRigidBodyConstructionInfo_btRigidBodyConstructionInfo_4 = function() {
                    return g.asm.pp.apply(null,
                        arguments)
                },
                Aq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingFactor_0 = function() {
                    return g.asm.qp.apply(null, arguments)
                },
                Bq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalAngularDampingThresholdSqr_0 = function() {
                    return g.asm.rp.apply(null, arguments)
                },
                Cq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDampingFactor_0 = function() {
                    return g.asm.sp.apply(null, arguments)
                },
                Dq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalDamping_0 =
                function() {
                    return g.asm.tp.apply(null, arguments)
                },
                Eq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_additionalLinearDampingThresholdSqr_0 = function() {
                    return g.asm.up.apply(null, arguments)
                },
                Fq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularDamping_0 = function() {
                    return g.asm.vp.apply(null, arguments)
                },
                Gq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_angularSleepingThreshold_0 = function() {
                    return g.asm.wp.apply(null, arguments)
                },
                Hq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_friction_0 =
                function() {
                    return g.asm.xp.apply(null, arguments)
                },
                Iq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearDamping_0 = function() {
                    return g.asm.yp.apply(null, arguments)
                },
                Jq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_linearSleepingThreshold_0 = function() {
                    return g.asm.zp.apply(null, arguments)
                },
                Kq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_restitution_0 = function() {
                    return g.asm.Ap.apply(null, arguments)
                },
                Lq = g._emscripten_bind_btRigidBodyConstructionInfo_get_m_rollingFriction_0 = function() {
                    return g.asm.Bp.apply(null,
                        arguments)
                },
                Mq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingFactor_1 = function() {
                    return g.asm.Cp.apply(null, arguments)
                },
                Nq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalAngularDampingThresholdSqr_1 = function() {
                    return g.asm.Dp.apply(null, arguments)
                },
                Oq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDampingFactor_1 = function() {
                    return g.asm.Ep.apply(null, arguments)
                },
                Pq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalDamping_1 =
                function() {
                    return g.asm.Fp.apply(null, arguments)
                },
                Qq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_additionalLinearDampingThresholdSqr_1 = function() {
                    return g.asm.Gp.apply(null, arguments)
                },
                Rq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularDamping_1 = function() {
                    return g.asm.Hp.apply(null, arguments)
                },
                Sq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_angularSleepingThreshold_1 = function() {
                    return g.asm.Ip.apply(null, arguments)
                },
                Tq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_friction_1 =
                function() {
                    return g.asm.Jp.apply(null, arguments)
                },
                Uq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearDamping_1 = function() {
                    return g.asm.Kp.apply(null, arguments)
                },
                Vq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_linearSleepingThreshold_1 = function() {
                    return g.asm.Lp.apply(null, arguments)
                },
                Wq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_restitution_1 = function() {
                    return g.asm.Mp.apply(null, arguments)
                },
                Xq = g._emscripten_bind_btRigidBodyConstructionInfo_set_m_rollingFriction_1 = function() {
                    return g.asm.Np.apply(null,
                        arguments)
                },
                Yq = g._emscripten_bind_btRigidBody___destroy___0 = function() {
                    return g.asm.Op.apply(null, arguments)
                },
                Zq = g._emscripten_bind_btRigidBody_activate_0 = function() {
                    return g.asm.Pp.apply(null, arguments)
                },
                $q = g._emscripten_bind_btRigidBody_activate_1 = function() {
                    return g.asm.Qp.apply(null, arguments)
                },
                ar = g._emscripten_bind_btRigidBody_applyCentralForce_1 = function() {
                    return g.asm.Rp.apply(null, arguments)
                },
                br = g._emscripten_bind_btRigidBody_applyCentralImpulse_1 = function() {
                    return g.asm.Sp.apply(null, arguments)
                },
                cr = g._emscripten_bind_btRigidBody_applyCentralLocalForce_1 = function() {
                    return g.asm.Tp.apply(null, arguments)
                },
                dr = g._emscripten_bind_btRigidBody_applyForce_2 = function() {
                    return g.asm.Up.apply(null, arguments)
                },
                er = g._emscripten_bind_btRigidBody_applyGravity_0 = function() {
                    return g.asm.Vp.apply(null, arguments)
                },
                fr = g._emscripten_bind_btRigidBody_applyImpulse_2 = function() {
                    return g.asm.Wp.apply(null, arguments)
                },
                gr = g._emscripten_bind_btRigidBody_applyLocalTorque_1 = function() {
                    return g.asm.Xp.apply(null, arguments)
                },
                hr = g._emscripten_bind_btRigidBody_applyTorqueImpulse_1 = function() {
                    return g.asm.Yp.apply(null, arguments)
                },
                ir = g._emscripten_bind_btRigidBody_applyTorque_1 = function() {
                    return g.asm.Zp.apply(null, arguments)
                },
                jr = g._emscripten_bind_btRigidBody_btRigidBody_1 = function() {
                    return g.asm._p.apply(null, arguments)
                },
                kr = g._emscripten_bind_btRigidBody_forceActivationState_1 = function() {
                    return g.asm.$p.apply(null, arguments)
                },
                lr = g._emscripten_bind_btRigidBody_getAabb_2 = function() {
                    return g.asm.aq.apply(null, arguments)
                },
                mr = g._emscripten_bind_btRigidBody_getAngularVelocity_0 = function() {
                    return g.asm.bq.apply(null, arguments)
                },
                nr = g._emscripten_bind_btRigidBody_getBroadphaseProxy_0 = function() {
                    return g.asm.cq.apply(null, arguments)
                },
                or = g._emscripten_bind_btRigidBody_getCenterOfMassTransform_0 = function() {
                    return g.asm.dq.apply(null, arguments)
                },
                pr = g._emscripten_bind_btRigidBody_getCollisionFlags_0 = function() {
                    return g.asm.eq.apply(null, arguments)
                },
                qr = g._emscripten_bind_btRigidBody_getCollisionShape_0 = function() {
                    return g.asm.fq.apply(null,
                        arguments)
                },
                rr = g._emscripten_bind_btRigidBody_getGravity_0 = function() {
                    return g.asm.gq.apply(null, arguments)
                },
                sr = g._emscripten_bind_btRigidBody_getLinearVelocity_0 = function() {
                    return g.asm.hq.apply(null, arguments)
                },
                tr = g._emscripten_bind_btRigidBody_getMotionState_0 = function() {
                    return g.asm.iq.apply(null, arguments)
                },
                ur = g._emscripten_bind_btRigidBody_getUserIndex_0 = function() {
                    return g.asm.jq.apply(null, arguments)
                },
                vr = g._emscripten_bind_btRigidBody_getUserPointer_0 = function() {
                    return g.asm.kq.apply(null,
                        arguments)
                },
                wr = g._emscripten_bind_btRigidBody_getWorldTransform_0 = function() {
                    return g.asm.lq.apply(null, arguments)
                },
                xr = g._emscripten_bind_btRigidBody_isActive_0 = function() {
                    return g.asm.mq.apply(null, arguments)
                },
                yr = g._emscripten_bind_btRigidBody_isKinematicObject_0 = function() {
                    return g.asm.nq.apply(null, arguments)
                },
                zr = g._emscripten_bind_btRigidBody_isStaticObject_0 = function() {
                    return g.asm.oq.apply(null, arguments)
                },
                Ar = g._emscripten_bind_btRigidBody_isStaticOrKinematicObject_0 = function() {
                    return g.asm.pq.apply(null,
                        arguments)
                },
                Br = g._emscripten_bind_btRigidBody_setActivationState_1 = function() {
                    return g.asm.qq.apply(null, arguments)
                },
                Cr = g._emscripten_bind_btRigidBody_setAngularFactor_1 = function() {
                    return g.asm.rq.apply(null, arguments)
                },
                Dr = g._emscripten_bind_btRigidBody_setAngularVelocity_1 = function() {
                    return g.asm.sq.apply(null, arguments)
                },
                Er = g._emscripten_bind_btRigidBody_setAnisotropicFriction_2 = function() {
                    return g.asm.tq.apply(null, arguments)
                },
                Fr = g._emscripten_bind_btRigidBody_setCcdMotionThreshold_1 = function() {
                    return g.asm.uq.apply(null,
                        arguments)
                },
                Gr = g._emscripten_bind_btRigidBody_setCcdSweptSphereRadius_1 = function() {
                    return g.asm.vq.apply(null, arguments)
                },
                Hr = g._emscripten_bind_btRigidBody_setCenterOfMassTransform_1 = function() {
                    return g.asm.wq.apply(null, arguments)
                },
                Ir = g._emscripten_bind_btRigidBody_setCollisionFlags_1 = function() {
                    return g.asm.xq.apply(null, arguments)
                },
                Jr = g._emscripten_bind_btRigidBody_setCollisionShape_1 = function() {
                    return g.asm.yq.apply(null, arguments)
                },
                Kr = g._emscripten_bind_btRigidBody_setContactProcessingThreshold_1 =
                function() {
                    return g.asm.zq.apply(null, arguments)
                },
                Lr = g._emscripten_bind_btRigidBody_setDamping_2 = function() {
                    return g.asm.Aq.apply(null, arguments)
                },
                Mr = g._emscripten_bind_btRigidBody_setFriction_1 = function() {
                    return g.asm.Bq.apply(null, arguments)
                },
                Nr = g._emscripten_bind_btRigidBody_setGravity_1 = function() {
                    return g.asm.Cq.apply(null, arguments)
                },
                Or = g._emscripten_bind_btRigidBody_setLinearFactor_1 = function() {
                    return g.asm.Dq.apply(null, arguments)
                },
                Pr = g._emscripten_bind_btRigidBody_setLinearVelocity_1 = function() {
                    return g.asm.Eq.apply(null,
                        arguments)
                },
                Qr = g._emscripten_bind_btRigidBody_setMassProps_2 = function() {
                    return g.asm.Fq.apply(null, arguments)
                },
                Rr = g._emscripten_bind_btRigidBody_setMotionState_1 = function() {
                    return g.asm.Gq.apply(null, arguments)
                },
                Sr = g._emscripten_bind_btRigidBody_setRestitution_1 = function() {
                    return g.asm.Hq.apply(null, arguments)
                },
                Tr = g._emscripten_bind_btRigidBody_setRollingFriction_1 = function() {
                    return g.asm.Iq.apply(null, arguments)
                },
                Ur = g._emscripten_bind_btRigidBody_setSleepingThresholds_2 = function() {
                    return g.asm.Jq.apply(null,
                        arguments)
                },
                Vr = g._emscripten_bind_btRigidBody_setUserIndex_1 = function() {
                    return g.asm.Kq.apply(null, arguments)
                },
                Wr = g._emscripten_bind_btRigidBody_setUserPointer_1 = function() {
                    return g.asm.Lq.apply(null, arguments)
                },
                Xr = g._emscripten_bind_btRigidBody_setWorldTransform_1 = function() {
                    return g.asm.Mq.apply(null, arguments)
                },
                Yr = g._emscripten_bind_btRigidBody_upcast_1 = function() {
                    return g.asm.Nq.apply(null, arguments)
                },
                Zr = g._emscripten_bind_btRigidBody_updateInertiaTensor_0 = function() {
                    return g.asm.Oq.apply(null,
                        arguments)
                },
                $r = g._emscripten_bind_btSequentialImpulseConstraintSolver___destroy___0 = function() {
                    return g.asm.Pq.apply(null, arguments)
                },
                as = g._emscripten_bind_btSequentialImpulseConstraintSolver_btSequentialImpulseConstraintSolver_0 = function() {
                    return g.asm.Qq.apply(null, arguments)
                },
                bs = g._emscripten_bind_btShapeHull___destroy___0 = function() {
                    return g.asm.Rq.apply(null, arguments)
                },
                cs = g._emscripten_bind_btShapeHull_btShapeHull_1 = function() {
                    return g.asm.Sq.apply(null, arguments)
                },
                ds = g._emscripten_bind_btShapeHull_buildHull_1 =
                function() {
                    return g.asm.Tq.apply(null, arguments)
                },
                es = g._emscripten_bind_btShapeHull_getVertexPointer_0 = function() {
                    return g.asm.Uq.apply(null, arguments)
                },
                gs = g._emscripten_bind_btShapeHull_numVertices_0 = function() {
                    return g.asm.Vq.apply(null, arguments)
                },
                hs = g._emscripten_bind_btSliderConstraint___destroy___0 = function() {
                    return g.asm.Wq.apply(null, arguments)
                },
                is = g._emscripten_bind_btSliderConstraint_btSliderConstraint_3 = function() {
                    return g.asm.Xq.apply(null, arguments)
                },
                js = g._emscripten_bind_btSliderConstraint_btSliderConstraint_5 =
                function() {
                    return g.asm.Yq.apply(null, arguments)
                },
                ks = g._emscripten_bind_btSliderConstraint_enableFeedback_1 = function() {
                    return g.asm.Zq.apply(null, arguments)
                },
                ls = g._emscripten_bind_btSliderConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm._q.apply(null, arguments)
                },
                ms = g._emscripten_bind_btSliderConstraint_getParam_2 = function() {
                    return g.asm.$q.apply(null, arguments)
                },
                ns = g._emscripten_bind_btSliderConstraint_setBreakingImpulseThreshold_1 = function() {
                    return g.asm.ar.apply(null, arguments)
                },
                ps = g._emscripten_bind_btSliderConstraint_setLowerAngLimit_1 = function() {
                    return g.asm.br.apply(null, arguments)
                },
                qs = g._emscripten_bind_btSliderConstraint_setLowerLinLimit_1 = function() {
                    return g.asm.cr.apply(null, arguments)
                },
                rs = g._emscripten_bind_btSliderConstraint_setParam_3 = function() {
                    return g.asm.dr.apply(null, arguments)
                },
                ss = g._emscripten_bind_btSliderConstraint_setUpperAngLimit_1 = function() {
                    return g.asm.er.apply(null, arguments)
                },
                ts = g._emscripten_bind_btSliderConstraint_setUpperLinLimit_1 = function() {
                    return g.asm.fr.apply(null,
                        arguments)
                },
                us = g._emscripten_bind_btSoftBodyArray___destroy___0 = function() {
                    return g.asm.gr.apply(null, arguments)
                },
                vs = g._emscripten_bind_btSoftBodyArray_at_1 = function() {
                    return g.asm.hr.apply(null, arguments)
                },
                xs = g._emscripten_bind_btSoftBodyArray_size_0 = function() {
                    return g.asm.ir.apply(null, arguments)
                },
                ys = g._emscripten_bind_btSoftBodyHelpers_CreateEllipsoid_4 = function() {
                    return g.asm.jr.apply(null, arguments)
                },
                zs = g._emscripten_bind_btSoftBodyHelpers_CreateFromConvexHull_4 = function() {
                    return g.asm.kr.apply(null,
                        arguments)
                },
                As = g._emscripten_bind_btSoftBodyHelpers_CreateFromTriMesh_5 = function() {
                    return g.asm.lr.apply(null, arguments)
                },
                Bs = g._emscripten_bind_btSoftBodyHelpers_CreatePatchUV_10 = function() {
                    return g.asm.mr.apply(null, arguments)
                },
                Cs = g._emscripten_bind_btSoftBodyHelpers_CreatePatch_9 = function() {
                    return g.asm.nr.apply(null, arguments)
                },
                Ds = g._emscripten_bind_btSoftBodyHelpers_CreateRope_5 = function() {
                    return g.asm.or.apply(null, arguments)
                },
                Es = g._emscripten_bind_btSoftBodyHelpers___destroy___0 = function() {
                    return g.asm.pr.apply(null,
                        arguments)
                },
                Fs = g._emscripten_bind_btSoftBodyHelpers_btSoftBodyHelpers_0 = function() {
                    return g.asm.qr.apply(null, arguments)
                },
                Gs = g._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration___destroy___0 = function() {
                    return g.asm.rr.apply(null, arguments)
                },
                Hs = g._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_0 = function() {
                    return g.asm.sr.apply(null, arguments)
                },
                Is = g._emscripten_bind_btSoftBodyRigidBodyCollisionConfiguration_btSoftBodyRigidBodyCollisionConfiguration_1 =
                function() {
                    return g.asm.tr.apply(null, arguments)
                },
                Js = g._emscripten_bind_btSoftBodySolver___destroy___0 = function() {
                    return g.asm.ur.apply(null, arguments)
                },
                Ks = g._emscripten_bind_btSoftBodyWorldInfo___destroy___0 = function() {
                    return g.asm.vr.apply(null, arguments)
                },
                Ls = g._emscripten_bind_btSoftBodyWorldInfo_btSoftBodyWorldInfo_0 = function() {
                    return g.asm.wr.apply(null, arguments)
                },
                Ms = g._emscripten_bind_btSoftBodyWorldInfo_get_air_density_0 = function() {
                    return g.asm.xr.apply(null, arguments)
                },
                Ns = g._emscripten_bind_btSoftBodyWorldInfo_get_m_broadphase_0 =
                function() {
                    return g.asm.yr.apply(null, arguments)
                },
                Os = g._emscripten_bind_btSoftBodyWorldInfo_get_m_dispatcher_0 = function() {
                    return g.asm.zr.apply(null, arguments)
                },
                Ps = g._emscripten_bind_btSoftBodyWorldInfo_get_m_gravity_0 = function() {
                    return g.asm.Ar.apply(null, arguments)
                },
                Qs = g._emscripten_bind_btSoftBodyWorldInfo_get_m_maxDisplacement_0 = function() {
                    return g.asm.Br.apply(null, arguments)
                },
                Rs = g._emscripten_bind_btSoftBodyWorldInfo_get_water_density_0 = function() {
                    return g.asm.Cr.apply(null, arguments)
                },
                Ss = g._emscripten_bind_btSoftBodyWorldInfo_get_water_normal_0 =
                function() {
                    return g.asm.Dr.apply(null, arguments)
                },
                Ts = g._emscripten_bind_btSoftBodyWorldInfo_get_water_offset_0 = function() {
                    return g.asm.Er.apply(null, arguments)
                },
                Us = g._emscripten_bind_btSoftBodyWorldInfo_set_air_density_1 = function() {
                    return g.asm.Fr.apply(null, arguments)
                },
                Vs = g._emscripten_bind_btSoftBodyWorldInfo_set_m_broadphase_1 = function() {
                    return g.asm.Gr.apply(null, arguments)
                },
                Ws = g._emscripten_bind_btSoftBodyWorldInfo_set_m_dispatcher_1 = function() {
                    return g.asm.Hr.apply(null, arguments)
                },
                Xs = g._emscripten_bind_btSoftBodyWorldInfo_set_m_gravity_1 =
                function() {
                    return g.asm.Ir.apply(null, arguments)
                },
                Ys = g._emscripten_bind_btSoftBodyWorldInfo_set_m_maxDisplacement_1 = function() {
                    return g.asm.Jr.apply(null, arguments)
                },
                Zs = g._emscripten_bind_btSoftBodyWorldInfo_set_water_density_1 = function() {
                    return g.asm.Kr.apply(null, arguments)
                },
                $s = g._emscripten_bind_btSoftBodyWorldInfo_set_water_normal_1 = function() {
                    return g.asm.Lr.apply(null, arguments)
                },
                at = g._emscripten_bind_btSoftBodyWorldInfo_set_water_offset_1 = function() {
                    return g.asm.Mr.apply(null, arguments)
                },
                bt =
                g._emscripten_bind_btSoftBody___destroy___0 = function() {
                    return g.asm.Nr.apply(null, arguments)
                },
                ct = g._emscripten_bind_btSoftBody_activate_0 = function() {
                    return g.asm.Or.apply(null, arguments)
                },
                dt = g._emscripten_bind_btSoftBody_activate_1 = function() {
                    return g.asm.Pr.apply(null, arguments)
                },
                et = g._emscripten_bind_btSoftBody_addAeroForceToNode_2 = function() {
                    return g.asm.Qr.apply(null, arguments)
                },
                ft = g._emscripten_bind_btSoftBody_addForce_1 = function() {
                    return g.asm.Rr.apply(null, arguments)
                },
                gt = g._emscripten_bind_btSoftBody_addForce_2 =
                function() {
                    return g.asm.Sr.apply(null, arguments)
                },
                ht = g._emscripten_bind_btSoftBody_appendAnchor_4 = function() {
                    return g.asm.Tr.apply(null, arguments)
                },
                it = g._emscripten_bind_btSoftBody_appendFace_4 = function() {
                    return g.asm.Ur.apply(null, arguments)
                },
                jt = g._emscripten_bind_btSoftBody_appendLink_4 = function() {
                    return g.asm.Vr.apply(null, arguments)
                },
                kt = g._emscripten_bind_btSoftBody_appendMaterial_0 = function() {
                    return g.asm.Wr.apply(null, arguments)
                },
                lt = g._emscripten_bind_btSoftBody_appendNode_2 = function() {
                    return g.asm.Xr.apply(null,
                        arguments)
                },
                mt = g._emscripten_bind_btSoftBody_appendTetra_5 = function() {
                    return g.asm.Yr.apply(null, arguments)
                },
                nt = g._emscripten_bind_btSoftBody_btSoftBody_4 = function() {
                    return g.asm.Zr.apply(null, arguments)
                },
                ot = g._emscripten_bind_btSoftBody_checkFace_3 = function() {
                    return g.asm._r.apply(null, arguments)
                },
                pt = g._emscripten_bind_btSoftBody_checkLink_2 = function() {
                    return g.asm.$r.apply(null, arguments)
                },
                qt = g._emscripten_bind_btSoftBody_forceActivationState_1 = function() {
                    return g.asm.as.apply(null, arguments)
                },
                rt = g._emscripten_bind_btSoftBody_generateBendingConstraints_2 = function() {
                    return g.asm.bs.apply(null, arguments)
                },
                st = g._emscripten_bind_btSoftBody_generateClusters_1 = function() {
                    return g.asm.cs.apply(null, arguments)
                },
                tt = g._emscripten_bind_btSoftBody_generateClusters_2 = function() {
                    return g.asm.ds.apply(null, arguments)
                },
                ut = g._emscripten_bind_btSoftBody_getCollisionFlags_0 = function() {
                    return g.asm.es.apply(null, arguments)
                },
                vt = g._emscripten_bind_btSoftBody_getCollisionShape_0 = function() {
                    return g.asm.fs.apply(null,
                        arguments)
                },
                wt = g._emscripten_bind_btSoftBody_getTotalMass_0 = function() {
                    return g.asm.gs.apply(null, arguments)
                },
                xt = g._emscripten_bind_btSoftBody_getUserIndex_0 = function() {
                    return g.asm.hs.apply(null, arguments)
                },
                yt = g._emscripten_bind_btSoftBody_getUserPointer_0 = function() {
                    return g.asm.is.apply(null, arguments)
                },
                zt = g._emscripten_bind_btSoftBody_getWorldTransform_0 = function() {
                    return g.asm.js.apply(null, arguments)
                },
                At = g._emscripten_bind_btSoftBody_get_m_anchors_0 = function() {
                    return g.asm.ks.apply(null, arguments)
                },
                Bt = g._emscripten_bind_btSoftBody_get_m_cfg_0 = function() {
                    return g.asm.ls.apply(null, arguments)
                },
                Ct = g._emscripten_bind_btSoftBody_get_m_materials_0 = function() {
                    return g.asm.ms.apply(null, arguments)
                },
                Dt = g._emscripten_bind_btSoftBody_get_m_nodes_0 = function() {
                    return g.asm.ns.apply(null, arguments)
                },
                Et = g._emscripten_bind_btSoftBody_isActive_0 = function() {
                    return g.asm.os.apply(null, arguments)
                },
                Ft = g._emscripten_bind_btSoftBody_isKinematicObject_0 = function() {
                    return g.asm.ps.apply(null, arguments)
                },
                Gt = g._emscripten_bind_btSoftBody_isStaticObject_0 =
                function() {
                    return g.asm.qs.apply(null, arguments)
                },
                Ht = g._emscripten_bind_btSoftBody_isStaticOrKinematicObject_0 = function() {
                    return g.asm.rs.apply(null, arguments)
                },
                It = g._emscripten_bind_btSoftBody_rotate_1 = function() {
                    return g.asm.ss.apply(null, arguments)
                },
                Jt = g._emscripten_bind_btSoftBody_scale_1 = function() {
                    return g.asm.ts.apply(null, arguments)
                },
                Kt = g._emscripten_bind_btSoftBody_setActivationState_1 = function() {
                    return g.asm.us.apply(null, arguments)
                },
                Lt = g._emscripten_bind_btSoftBody_setAnisotropicFriction_2 =
                function() {
                    return g.asm.vs.apply(null, arguments)
                },
                Mt = g._emscripten_bind_btSoftBody_setCcdMotionThreshold_1 = function() {
                    return g.asm.ws.apply(null, arguments)
                },
                Nt = g._emscripten_bind_btSoftBody_setCcdSweptSphereRadius_1 = function() {
                    return g.asm.xs.apply(null, arguments)
                },
                Ot = g._emscripten_bind_btSoftBody_setCollisionFlags_1 = function() {
                    return g.asm.ys.apply(null, arguments)
                },
                Pt = g._emscripten_bind_btSoftBody_setCollisionShape_1 = function() {
                    return g.asm.zs.apply(null, arguments)
                },
                Qt = g._emscripten_bind_btSoftBody_setContactProcessingThreshold_1 =
                function() {
                    return g.asm.As.apply(null, arguments)
                },
                Rt = g._emscripten_bind_btSoftBody_setFriction_1 = function() {
                    return g.asm.Bs.apply(null, arguments)
                },
                St = g._emscripten_bind_btSoftBody_setMass_2 = function() {
                    return g.asm.Cs.apply(null, arguments)
                },
                Tt = g._emscripten_bind_btSoftBody_setRestitution_1 = function() {
                    return g.asm.Ds.apply(null, arguments)
                },
                Ut = g._emscripten_bind_btSoftBody_setRollingFriction_1 = function() {
                    return g.asm.Es.apply(null, arguments)
                },
                Vt = g._emscripten_bind_btSoftBody_setTotalMass_2 = function() {
                    return g.asm.Fs.apply(null,
                        arguments)
                },
                Wt = g._emscripten_bind_btSoftBody_setUserIndex_1 = function() {
                    return g.asm.Gs.apply(null, arguments)
                },
                Xt = g._emscripten_bind_btSoftBody_setUserPointer_1 = function() {
                    return g.asm.Hs.apply(null, arguments)
                },
                Yt = g._emscripten_bind_btSoftBody_setWorldTransform_1 = function() {
                    return g.asm.Is.apply(null, arguments)
                },
                Zt = g._emscripten_bind_btSoftBody_set_m_anchors_1 = function() {
                    return g.asm.Js.apply(null, arguments)
                },
                $t = g._emscripten_bind_btSoftBody_set_m_cfg_1 = function() {
                    return g.asm.Ks.apply(null, arguments)
                },
                au = g._emscripten_bind_btSoftBody_set_m_materials_1 = function() {
                    return g.asm.Ls.apply(null, arguments)
                },
                bu = g._emscripten_bind_btSoftBody_set_m_nodes_1 = function() {
                    return g.asm.Ms.apply(null, arguments)
                },
                cu = g._emscripten_bind_btSoftBody_transform_1 = function() {
                    return g.asm.Ns.apply(null, arguments)
                },
                du = g._emscripten_bind_btSoftBody_translate_1 = function() {
                    return g.asm.Os.apply(null, arguments)
                },
                eu = g._emscripten_bind_btSoftBody_upcast_1 = function() {
                    return g.asm.Ps.apply(null, arguments)
                },
                fu = g._emscripten_bind_btSoftRigidDynamicsWorld___destroy___0 =
                function() {
                    return g.asm.Qs.apply(null, arguments)
                },
                gu = g._emscripten_bind_btSoftRigidDynamicsWorld_addAction_1 = function() {
                    return g.asm.Rs.apply(null, arguments)
                },
                hu = g._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_1 = function() {
                    return g.asm.Ss.apply(null, arguments)
                },
                iu = g._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_2 = function() {
                    return g.asm.Ts.apply(null, arguments)
                },
                ju = g._emscripten_bind_btSoftRigidDynamicsWorld_addCollisionObject_3 = function() {
                    return g.asm.Us.apply(null,
                        arguments)
                },
                ku = g._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_1 = function() {
                    return g.asm.Vs.apply(null, arguments)
                },
                lu = g._emscripten_bind_btSoftRigidDynamicsWorld_addConstraint_2 = function() {
                    return g.asm.Ws.apply(null, arguments)
                },
                mu = g._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_1 = function() {
                    return g.asm.Xs.apply(null, arguments)
                },
                nu = g._emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_3 = function() {
                    return g.asm.Ys.apply(null, arguments)
                },
                ou = g._emscripten_bind_btSoftRigidDynamicsWorld_addSoftBody_3 =
                function() {
                    return g.asm.Zs.apply(null, arguments)
                },
                pu = g._emscripten_bind_btSoftRigidDynamicsWorld_btSoftRigidDynamicsWorld_5 = function() {
                    return g.asm._s.apply(null, arguments)
                },
                qu = g._emscripten_bind_btSoftRigidDynamicsWorld_contactPairTest_3 = function() {
                    return g.asm.$s.apply(null, arguments)
                },
                ru = g._emscripten_bind_btSoftRigidDynamicsWorld_contactTest_2 = function() {
                    return g.asm.at.apply(null, arguments)
                },
                su = g._emscripten_bind_btSoftRigidDynamicsWorld_convexSweepTest_5 = function() {
                    return g.asm.bt.apply(null,
                        arguments)
                },
                tu = g._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawObject_3 = function() {
                    return g.asm.ct.apply(null, arguments)
                },
                uu = g._emscripten_bind_btSoftRigidDynamicsWorld_debugDrawWorld_0 = function() {
                    return g.asm.dt.apply(null, arguments)
                },
                vu = g._emscripten_bind_btSoftRigidDynamicsWorld_getBroadphase_0 = function() {
                    return g.asm.et.apply(null, arguments)
                },
                wu = g._emscripten_bind_btSoftRigidDynamicsWorld_getDebugDrawer_0 = function() {
                    return g.asm.ft.apply(null, arguments)
                },
                xu = g._emscripten_bind_btSoftRigidDynamicsWorld_getDispatchInfo_0 =
                function() {
                    return g.asm.gt.apply(null, arguments)
                },
                yu = g._emscripten_bind_btSoftRigidDynamicsWorld_getDispatcher_0 = function() {
                    return g.asm.ht.apply(null, arguments)
                },
                zu = g._emscripten_bind_btSoftRigidDynamicsWorld_getGravity_0 = function() {
                    return g.asm.it.apply(null, arguments)
                },
                Au = g._emscripten_bind_btSoftRigidDynamicsWorld_getPairCache_0 = function() {
                    return g.asm.jt.apply(null, arguments)
                },
                Bu = g._emscripten_bind_btSoftRigidDynamicsWorld_getSoftBodyArray_0 = function() {
                    return g.asm.kt.apply(null, arguments)
                },
                Cu = g._emscripten_bind_btSoftRigidDynamicsWorld_getSolverInfo_0 = function() {
                    return g.asm.lt.apply(null, arguments)
                },
                Du = g._emscripten_bind_btSoftRigidDynamicsWorld_getWorldInfo_0 = function() {
                    return g.asm.mt.apply(null, arguments)
                },
                Eu = g._emscripten_bind_btSoftRigidDynamicsWorld_rayTest_3 = function() {
                    return g.asm.nt.apply(null, arguments)
                },
                Fu = g._emscripten_bind_btSoftRigidDynamicsWorld_removeAction_1 = function() {
                    return g.asm.ot.apply(null, arguments)
                },
                Gu = g._emscripten_bind_btSoftRigidDynamicsWorld_removeCollisionObject_1 =
                function() {
                    return g.asm.pt.apply(null, arguments)
                },
                Hu = g._emscripten_bind_btSoftRigidDynamicsWorld_removeConstraint_1 = function() {
                    return g.asm.qt.apply(null, arguments)
                },
                Iu = g._emscripten_bind_btSoftRigidDynamicsWorld_removeRigidBody_1 = function() {
                    return g.asm.rt.apply(null, arguments)
                },
                Ju = g._emscripten_bind_btSoftRigidDynamicsWorld_removeSoftBody_1 = function() {
                    return g.asm.st.apply(null, arguments)
                },
                Ku = g._emscripten_bind_btSoftRigidDynamicsWorld_setContactAddedCallback_1 = function() {
                    return g.asm.tt.apply(null,
                        arguments)
                },
                Lu = g._emscripten_bind_btSoftRigidDynamicsWorld_setContactDestroyedCallback_1 = function() {
                    return g.asm.ut.apply(null, arguments)
                },
                Mu = g._emscripten_bind_btSoftRigidDynamicsWorld_setContactProcessedCallback_1 = function() {
                    return g.asm.vt.apply(null, arguments)
                },
                Nu = g._emscripten_bind_btSoftRigidDynamicsWorld_setDebugDrawer_1 = function() {
                    return g.asm.wt.apply(null, arguments)
                },
                Ou = g._emscripten_bind_btSoftRigidDynamicsWorld_setGravity_1 = function() {
                    return g.asm.xt.apply(null, arguments)
                },
                Pu = g._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_1 =
                function() {
                    return g.asm.yt.apply(null, arguments)
                },
                Qu = g._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_2 = function() {
                    return g.asm.zt.apply(null, arguments)
                },
                Ru = g._emscripten_bind_btSoftRigidDynamicsWorld_stepSimulation_3 = function() {
                    return g.asm.At.apply(null, arguments)
                },
                Su = g._emscripten_bind_btSoftRigidDynamicsWorld_updateSingleAabb_1 = function() {
                    return g.asm.Bt.apply(null, arguments)
                },
                Tu = g._emscripten_bind_btSphereShape___destroy___0 = function() {
                    return g.asm.Ct.apply(null, arguments)
                },
                Uu = g._emscripten_bind_btSphereShape_btSphereShape_1 =
                function() {
                    return g.asm.Dt.apply(null, arguments)
                },
                Vu = g._emscripten_bind_btSphereShape_calculateLocalInertia_2 = function() {
                    return g.asm.Et.apply(null, arguments)
                },
                Wu = g._emscripten_bind_btSphereShape_getLocalScaling_0 = function() {
                    return g.asm.Ft.apply(null, arguments)
                },
                Xu = g._emscripten_bind_btSphereShape_getMargin_0 = function() {
                    return g.asm.Gt.apply(null, arguments)
                },
                Yu = g._emscripten_bind_btSphereShape_setLocalScaling_1 = function() {
                    return g.asm.Ht.apply(null, arguments)
                },
                Zu = g._emscripten_bind_btSphereShape_setMargin_1 =
                function() {
                    return g.asm.It.apply(null, arguments)
                },
                $u = g._emscripten_bind_btStaticPlaneShape___destroy___0 = function() {
                    return g.asm.Jt.apply(null, arguments)
                },
                av = g._emscripten_bind_btStaticPlaneShape_btStaticPlaneShape_2 = function() {
                    return g.asm.Kt.apply(null, arguments)
                },
                bv = g._emscripten_bind_btStaticPlaneShape_calculateLocalInertia_2 = function() {
                    return g.asm.Lt.apply(null, arguments)
                },
                cv = g._emscripten_bind_btStaticPlaneShape_getLocalScaling_0 = function() {
                    return g.asm.Mt.apply(null, arguments)
                },
                dv = g._emscripten_bind_btStaticPlaneShape_setLocalScaling_1 =
                function() {
                    return g.asm.Nt.apply(null, arguments)
                },
                ev = g._emscripten_bind_btStridingMeshInterface___destroy___0 = function() {
                    return g.asm.Ot.apply(null, arguments)
                },
                fv = g._emscripten_bind_btStridingMeshInterface_setScaling_1 = function() {
                    return g.asm.Pt.apply(null, arguments)
                },
                gv = g._emscripten_bind_btTransform___destroy___0 = function() {
                    return g.asm.Qt.apply(null, arguments)
                },
                hv = g._emscripten_bind_btTransform_btTransform_0 = function() {
                    return g.asm.Rt.apply(null, arguments)
                },
                iv = g._emscripten_bind_btTransform_btTransform_2 =
                function() {
                    return g.asm.St.apply(null, arguments)
                },
                jv = g._emscripten_bind_btTransform_getBasis_0 = function() {
                    return g.asm.Tt.apply(null, arguments)
                },
                kv = g._emscripten_bind_btTransform_getOrigin_0 = function() {
                    return g.asm.Ut.apply(null, arguments)
                },
                lv = g._emscripten_bind_btTransform_getRotation_0 = function() {
                    return g.asm.Vt.apply(null, arguments)
                },
                mv = g._emscripten_bind_btTransform_inverse_0 = function() {
                    return g.asm.Wt.apply(null, arguments)
                },
                nv = g._emscripten_bind_btTransform_op_mul_1 = function() {
                    return g.asm.Xt.apply(null,
                        arguments)
                },
                ov = g._emscripten_bind_btTransform_setFromOpenGLMatrix_1 = function() {
                    return g.asm.Yt.apply(null, arguments)
                },
                pv = g._emscripten_bind_btTransform_setIdentity_0 = function() {
                    return g.asm.Zt.apply(null, arguments)
                },
                qv = g._emscripten_bind_btTransform_setOrigin_1 = function() {
                    return g.asm._t.apply(null, arguments)
                },
                rv = g._emscripten_bind_btTransform_setRotation_1 = function() {
                    return g.asm.$t.apply(null, arguments)
                },
                sv = g._emscripten_bind_btTriangleMeshShape___destroy___0 = function() {
                    return g.asm.au.apply(null,
                        arguments)
                },
                tv = g._emscripten_bind_btTriangleMeshShape_calculateLocalInertia_2 = function() {
                    return g.asm.bu.apply(null, arguments)
                },
                uv = g._emscripten_bind_btTriangleMeshShape_getLocalScaling_0 = function() {
                    return g.asm.cu.apply(null, arguments)
                },
                vv = g._emscripten_bind_btTriangleMeshShape_setLocalScaling_1 = function() {
                    return g.asm.du.apply(null, arguments)
                },
                wv = g._emscripten_bind_btTriangleMesh___destroy___0 = function() {
                    return g.asm.eu.apply(null, arguments)
                },
                xv = g._emscripten_bind_btTriangleMesh_addTriangle_3 = function() {
                    return g.asm.fu.apply(null,
                        arguments)
                },
                yv = g._emscripten_bind_btTriangleMesh_addTriangle_4 = function() {
                    return g.asm.gu.apply(null, arguments)
                },
                zv = g._emscripten_bind_btTriangleMesh_btTriangleMesh_0 = function() {
                    return g.asm.hu.apply(null, arguments)
                },
                Av = g._emscripten_bind_btTriangleMesh_btTriangleMesh_1 = function() {
                    return g.asm.iu.apply(null, arguments)
                },
                Bv = g._emscripten_bind_btTriangleMesh_btTriangleMesh_2 = function() {
                    return g.asm.ju.apply(null, arguments)
                },
                Cv = g._emscripten_bind_btTriangleMesh_setScaling_1 = function() {
                    return g.asm.ku.apply(null,
                        arguments)
                },
                Dv = g._emscripten_bind_btTypedConstraint___destroy___0 = function() {
                    return g.asm.lu.apply(null, arguments)
                },
                Ev = g._emscripten_bind_btTypedConstraint_enableFeedback_1 = function() {
                    return g.asm.mu.apply(null, arguments)
                },
                Fv = g._emscripten_bind_btTypedConstraint_getBreakingImpulseThreshold_0 = function() {
                    return g.asm.nu.apply(null, arguments)
                },
                Gv = g._emscripten_bind_btTypedConstraint_getParam_2 = function() {
                    return g.asm.ou.apply(null, arguments)
                },
                Hv = g._emscripten_bind_btTypedConstraint_setBreakingImpulseThreshold_1 =
                function() {
                    return g.asm.pu.apply(null, arguments)
                },
                Iv = g._emscripten_bind_btTypedConstraint_setParam_3 = function() {
                    return g.asm.qu.apply(null, arguments)
                },
                Jv = g._emscripten_bind_btVector3Array___destroy___0 = function() {
                    return g.asm.ru.apply(null, arguments)
                },
                Kv = g._emscripten_bind_btVector3Array_at_1 = function() {
                    return g.asm.su.apply(null, arguments)
                },
                Lv = g._emscripten_bind_btVector3Array_size_0 = function() {
                    return g.asm.tu.apply(null, arguments)
                },
                Mv = g._emscripten_bind_btVector3___destroy___0 = function() {
                    return g.asm.uu.apply(null,
                        arguments)
                },
                Nv = g._emscripten_bind_btVector3_btVector3_0 = function() {
                    return g.asm.vu.apply(null, arguments)
                },
                Ov = g._emscripten_bind_btVector3_btVector3_3 = function() {
                    return g.asm.wu.apply(null, arguments)
                },
                Pv = g._emscripten_bind_btVector3_dot_1 = function() {
                    return g.asm.xu.apply(null, arguments)
                },
                Qv = g._emscripten_bind_btVector3_length_0 = function() {
                    return g.asm.yu.apply(null, arguments)
                },
                Rv = g._emscripten_bind_btVector3_normalize_0 = function() {
                    return g.asm.zu.apply(null, arguments)
                },
                Sv = g._emscripten_bind_btVector3_op_add_1 =
                function() {
                    return g.asm.Au.apply(null, arguments)
                },
                Tv = g._emscripten_bind_btVector3_op_mul_1 = function() {
                    return g.asm.Bu.apply(null, arguments)
                },
                Uv = g._emscripten_bind_btVector3_op_sub_1 = function() {
                    return g.asm.Cu.apply(null, arguments)
                },
                Vv = g._emscripten_bind_btVector3_rotate_2 = function() {
                    return g.asm.Du.apply(null, arguments)
                },
                Wv = g._emscripten_bind_btVector3_setValue_3 = function() {
                    return g.asm.Eu.apply(null, arguments)
                },
                Xv = g._emscripten_bind_btVector3_setX_1 = function() {
                    return g.asm.Fu.apply(null, arguments)
                },
                Yv = g._emscripten_bind_btVector3_setY_1 = function() {
                    return g.asm.Gu.apply(null, arguments)
                },
                Zv = g._emscripten_bind_btVector3_setZ_1 = function() {
                    return g.asm.Hu.apply(null, arguments)
                },
                $v = g._emscripten_bind_btVector3_x_0 = function() {
                    return g.asm.Iu.apply(null, arguments)
                },
                aw = g._emscripten_bind_btVector3_y_0 = function() {
                    return g.asm.Ju.apply(null, arguments)
                },
                bw = g._emscripten_bind_btVector3_z_0 = function() {
                    return g.asm.Ku.apply(null, arguments)
                },
                cw = g._emscripten_bind_btVector4___destroy___0 = function() {
                    return g.asm.Lu.apply(null,
                        arguments)
                },
                dw = g._emscripten_bind_btVector4_btVector4_0 = function() {
                    return g.asm.Mu.apply(null, arguments)
                },
                ew = g._emscripten_bind_btVector4_btVector4_4 = function() {
                    return g.asm.Nu.apply(null, arguments)
                },
                fw = g._emscripten_bind_btVector4_dot_1 = function() {
                    return g.asm.Ou.apply(null, arguments)
                },
                gw = g._emscripten_bind_btVector4_length_0 = function() {
                    return g.asm.Pu.apply(null, arguments)
                },
                hw = g._emscripten_bind_btVector4_normalize_0 = function() {
                    return g.asm.Qu.apply(null, arguments)
                },
                iw = g._emscripten_bind_btVector4_op_add_1 =
                function() {
                    return g.asm.Ru.apply(null, arguments)
                },
                jw = g._emscripten_bind_btVector4_op_mul_1 = function() {
                    return g.asm.Su.apply(null, arguments)
                },
                kw = g._emscripten_bind_btVector4_op_sub_1 = function() {
                    return g.asm.Tu.apply(null, arguments)
                },
                lw = g._emscripten_bind_btVector4_rotate_2 = function() {
                    return g.asm.Uu.apply(null, arguments)
                },
                mw = g._emscripten_bind_btVector4_setValue_4 = function() {
                    return g.asm.Vu.apply(null, arguments)
                },
                nw = g._emscripten_bind_btVector4_setX_1 = function() {
                    return g.asm.Wu.apply(null, arguments)
                },
                ow = g._emscripten_bind_btVector4_setY_1 = function() {
                    return g.asm.Xu.apply(null, arguments)
                },
                pw = g._emscripten_bind_btVector4_setZ_1 = function() {
                    return g.asm.Yu.apply(null, arguments)
                },
                qw = g._emscripten_bind_btVector4_w_0 = function() {
                    return g.asm.Zu.apply(null, arguments)
                },
                rw = g._emscripten_bind_btVector4_x_0 = function() {
                    return g.asm._u.apply(null, arguments)
                },
                sw = g._emscripten_bind_btVector4_y_0 = function() {
                    return g.asm.$u.apply(null, arguments)
                },
                tw = g._emscripten_bind_btVector4_z_0 = function() {
                    return g.asm.av.apply(null,
                        arguments)
                },
                uw = g._emscripten_bind_btVehicleRaycasterResult___destroy___0 = function() {
                    return g.asm.bv.apply(null, arguments)
                },
                vw = g._emscripten_bind_btVehicleRaycasterResult_get_m_distFraction_0 = function() {
                    return g.asm.cv.apply(null, arguments)
                },
                ww = g._emscripten_bind_btVehicleRaycasterResult_get_m_hitNormalInWorld_0 = function() {
                    return g.asm.dv.apply(null, arguments)
                },
                xw = g._emscripten_bind_btVehicleRaycasterResult_get_m_hitPointInWorld_0 = function() {
                    return g.asm.ev.apply(null, arguments)
                },
                yw = g._emscripten_bind_btVehicleRaycasterResult_set_m_distFraction_1 =
                function() {
                    return g.asm.fv.apply(null, arguments)
                },
                zw = g._emscripten_bind_btVehicleRaycasterResult_set_m_hitNormalInWorld_1 = function() {
                    return g.asm.gv.apply(null, arguments)
                },
                Aw = g._emscripten_bind_btVehicleRaycasterResult_set_m_hitPointInWorld_1 = function() {
                    return g.asm.hv.apply(null, arguments)
                },
                Bw = g._emscripten_bind_btVehicleRaycaster___destroy___0 = function() {
                    return g.asm.iv.apply(null, arguments)
                },
                Cw = g._emscripten_bind_btVehicleRaycaster_castRay_3 = function() {
                    return g.asm.jv.apply(null, arguments)
                },
                Dw =
                g._emscripten_bind_btVehicleTuning_btVehicleTuning_0 = function() {
                    return g.asm.kv.apply(null, arguments)
                },
                Ew = g._emscripten_bind_btVehicleTuning_get_m_frictionSlip_0 = function() {
                    return g.asm.lv.apply(null, arguments)
                },
                Fw = g._emscripten_bind_btVehicleTuning_get_m_maxSuspensionForce_0 = function() {
                    return g.asm.mv.apply(null, arguments)
                },
                Gw = g._emscripten_bind_btVehicleTuning_get_m_maxSuspensionTravelCm_0 = function() {
                    return g.asm.nv.apply(null, arguments)
                },
                Hw = g._emscripten_bind_btVehicleTuning_get_m_suspensionCompression_0 =
                function() {
                    return g.asm.ov.apply(null, arguments)
                },
                Iw = g._emscripten_bind_btVehicleTuning_get_m_suspensionDamping_0 = function() {
                    return g.asm.pv.apply(null, arguments)
                },
                Jw = g._emscripten_bind_btVehicleTuning_get_m_suspensionStiffness_0 = function() {
                    return g.asm.qv.apply(null, arguments)
                },
                Kw = g._emscripten_bind_btVehicleTuning_set_m_frictionSlip_1 = function() {
                    return g.asm.rv.apply(null, arguments)
                },
                Lw = g._emscripten_bind_btVehicleTuning_set_m_maxSuspensionForce_1 = function() {
                    return g.asm.sv.apply(null, arguments)
                },
                Mw = g._emscripten_bind_btVehicleTuning_set_m_maxSuspensionTravelCm_1 = function() {
                    return g.asm.tv.apply(null, arguments)
                },
                Nw = g._emscripten_bind_btVehicleTuning_set_m_suspensionCompression_1 = function() {
                    return g.asm.uv.apply(null, arguments)
                },
                Ow = g._emscripten_bind_btVehicleTuning_set_m_suspensionDamping_1 = function() {
                    return g.asm.vv.apply(null, arguments)
                },
                Pw = g._emscripten_bind_btVehicleTuning_set_m_suspensionStiffness_1 = function() {
                    return g.asm.wv.apply(null, arguments)
                },
                Qw = g._emscripten_bind_btWheelInfoConstructionInfo___destroy___0 =
                function() {
                    return g.asm.xv.apply(null, arguments)
                },
                Rw = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_bIsFrontWheel_0 = function() {
                    return g.asm.yv.apply(null, arguments)
                },
                Sw = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_chassisConnectionCS_0 = function() {
                    return g.asm.zv.apply(null, arguments)
                },
                Tw = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_frictionSlip_0 = function() {
                    return g.asm.Av.apply(null, arguments)
                },
                Uw = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionForce_0 = function() {
                    return g.asm.Bv.apply(null,
                        arguments)
                },
                Vw = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_maxSuspensionTravelCm_0 = function() {
                    return g.asm.Cv.apply(null, arguments)
                },
                Ww = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionRestLength_0 = function() {
                    return g.asm.Dv.apply(null, arguments)
                },
                Xw = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_suspensionStiffness_0 = function() {
                    return g.asm.Ev.apply(null, arguments)
                },
                Yw = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelAxleCS_0 = function() {
                    return g.asm.Fv.apply(null,
                        arguments)
                },
                Zw = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelDirectionCS_0 = function() {
                    return g.asm.Gv.apply(null, arguments)
                },
                $w = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelRadius_0 = function() {
                    return g.asm.Hv.apply(null, arguments)
                },
                ax = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingCompression_0 = function() {
                    return g.asm.Iv.apply(null, arguments)
                },
                bx = g._emscripten_bind_btWheelInfoConstructionInfo_get_m_wheelsDampingRelaxation_0 = function() {
                    return g.asm.Jv.apply(null,
                        arguments)
                },
                cx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_bIsFrontWheel_1 = function() {
                    return g.asm.Kv.apply(null, arguments)
                },
                dx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_chassisConnectionCS_1 = function() {
                    return g.asm.Lv.apply(null, arguments)
                },
                ex = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_frictionSlip_1 = function() {
                    return g.asm.Mv.apply(null, arguments)
                },
                fx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionForce_1 = function() {
                    return g.asm.Nv.apply(null, arguments)
                },
                gx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_maxSuspensionTravelCm_1 = function() {
                    return g.asm.Ov.apply(null, arguments)
                },
                hx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionRestLength_1 = function() {
                    return g.asm.Pv.apply(null, arguments)
                },
                ix = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_suspensionStiffness_1 = function() {
                    return g.asm.Qv.apply(null, arguments)
                },
                jx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelAxleCS_1 = function() {
                    return g.asm.Rv.apply(null, arguments)
                },
                kx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelDirectionCS_1 = function() {
                    return g.asm.Sv.apply(null, arguments)
                },
                lx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelRadius_1 = function() {
                    return g.asm.Tv.apply(null, arguments)
                },
                mx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingCompression_1 = function() {
                    return g.asm.Uv.apply(null, arguments)
                },
                nx = g._emscripten_bind_btWheelInfoConstructionInfo_set_m_wheelsDampingRelaxation_1 = function() {
                    return g.asm.Vv.apply(null, arguments)
                },
                ox = g._emscripten_bind_btWheelInfo___destroy___0 = function() {
                    return g.asm.Wv.apply(null, arguments)
                },
                px = g._emscripten_bind_btWheelInfo_btWheelInfo_1 = function() {
                    return g.asm.Xv.apply(null, arguments)
                },
                qx = g._emscripten_bind_btWheelInfo_getSuspensionRestLength_0 = function() {
                    return g.asm.Yv.apply(null, arguments)
                },
                rx = g._emscripten_bind_btWheelInfo_get_m_bIsFrontWheel_0 = function() {
                    return g.asm.Zv.apply(null, arguments)
                },
                sx = g._emscripten_bind_btWheelInfo_get_m_brake_0 = function() {
                    return g.asm._v.apply(null, arguments)
                },
                tx = g._emscripten_bind_btWheelInfo_get_m_chassisConnectionPointCS_0 = function() {
                    return g.asm.$v.apply(null, arguments)
                },
                ux = g._emscripten_bind_btWheelInfo_get_m_clippedInvContactDotSuspension_0 = function() {
                    return g.asm.aw.apply(null, arguments)
                },
                vx = g._emscripten_bind_btWheelInfo_get_m_deltaRotation_0 = function() {
                    return g.asm.bw.apply(null, arguments)
                },
                wx = g._emscripten_bind_btWheelInfo_get_m_engineForce_0 = function() {
                    return g.asm.cw.apply(null, arguments)
                },
                xx = g._emscripten_bind_btWheelInfo_get_m_frictionSlip_0 =
                function() {
                    return g.asm.dw.apply(null, arguments)
                },
                yx = g._emscripten_bind_btWheelInfo_get_m_maxSuspensionForce_0 = function() {
                    return g.asm.ew.apply(null, arguments)
                },
                zx = g._emscripten_bind_btWheelInfo_get_m_maxSuspensionTravelCm_0 = function() {
                    return g.asm.fw.apply(null, arguments)
                },
                Ax = g._emscripten_bind_btWheelInfo_get_m_raycastInfo_0 = function() {
                    return g.asm.gw.apply(null, arguments)
                },
                Bx = g._emscripten_bind_btWheelInfo_get_m_rollInfluence_0 = function() {
                    return g.asm.hw.apply(null, arguments)
                },
                Cx = g._emscripten_bind_btWheelInfo_get_m_rotation_0 =
                function() {
                    return g.asm.iw.apply(null, arguments)
                },
                Dx = g._emscripten_bind_btWheelInfo_get_m_skidInfo_0 = function() {
                    return g.asm.jw.apply(null, arguments)
                },
                Ex = g._emscripten_bind_btWheelInfo_get_m_steering_0 = function() {
                    return g.asm.kw.apply(null, arguments)
                },
                Fx = g._emscripten_bind_btWheelInfo_get_m_suspensionRelativeVelocity_0 = function() {
                    return g.asm.lw.apply(null, arguments)
                },
                Gx = g._emscripten_bind_btWheelInfo_get_m_suspensionRestLength1_0 = function() {
                    return g.asm.mw.apply(null, arguments)
                },
                Hx = g._emscripten_bind_btWheelInfo_get_m_suspensionStiffness_0 =
                function() {
                    return g.asm.nw.apply(null, arguments)
                },
                Ix = g._emscripten_bind_btWheelInfo_get_m_wheelAxleCS_0 = function() {
                    return g.asm.ow.apply(null, arguments)
                },
                Jx = g._emscripten_bind_btWheelInfo_get_m_wheelDirectionCS_0 = function() {
                    return g.asm.pw.apply(null, arguments)
                },
                Kx = g._emscripten_bind_btWheelInfo_get_m_wheelsDampingCompression_0 = function() {
                    return g.asm.qw.apply(null, arguments)
                },
                Lx = g._emscripten_bind_btWheelInfo_get_m_wheelsDampingRelaxation_0 = function() {
                    return g.asm.rw.apply(null, arguments)
                },
                Mx = g._emscripten_bind_btWheelInfo_get_m_wheelsRadius_0 =
                function() {
                    return g.asm.sw.apply(null, arguments)
                },
                Nx = g._emscripten_bind_btWheelInfo_get_m_wheelsSuspensionForce_0 = function() {
                    return g.asm.tw.apply(null, arguments)
                },
                Ox = g._emscripten_bind_btWheelInfo_get_m_worldTransform_0 = function() {
                    return g.asm.uw.apply(null, arguments)
                },
                Px = g._emscripten_bind_btWheelInfo_set_m_bIsFrontWheel_1 = function() {
                    return g.asm.vw.apply(null, arguments)
                },
                Qx = g._emscripten_bind_btWheelInfo_set_m_brake_1 = function() {
                    return g.asm.ww.apply(null, arguments)
                },
                Rx = g._emscripten_bind_btWheelInfo_set_m_chassisConnectionPointCS_1 =
                function() {
                    return g.asm.xw.apply(null, arguments)
                },
                Sx = g._emscripten_bind_btWheelInfo_set_m_clippedInvContactDotSuspension_1 = function() {
                    return g.asm.yw.apply(null, arguments)
                },
                Tx = g._emscripten_bind_btWheelInfo_set_m_deltaRotation_1 = function() {
                    return g.asm.zw.apply(null, arguments)
                },
                Ux = g._emscripten_bind_btWheelInfo_set_m_engineForce_1 = function() {
                    return g.asm.Aw.apply(null, arguments)
                },
                Vx = g._emscripten_bind_btWheelInfo_set_m_frictionSlip_1 = function() {
                    return g.asm.Bw.apply(null, arguments)
                },
                Wx = g._emscripten_bind_btWheelInfo_set_m_maxSuspensionForce_1 =
                function() {
                    return g.asm.Cw.apply(null, arguments)
                },
                Xx = g._emscripten_bind_btWheelInfo_set_m_maxSuspensionTravelCm_1 = function() {
                    return g.asm.Dw.apply(null, arguments)
                },
                Yx = g._emscripten_bind_btWheelInfo_set_m_raycastInfo_1 = function() {
                    return g.asm.Ew.apply(null, arguments)
                },
                Zx = g._emscripten_bind_btWheelInfo_set_m_rollInfluence_1 = function() {
                    return g.asm.Fw.apply(null, arguments)
                },
                $x = g._emscripten_bind_btWheelInfo_set_m_rotation_1 = function() {
                    return g.asm.Gw.apply(null, arguments)
                },
                ay = g._emscripten_bind_btWheelInfo_set_m_skidInfo_1 =
                function() {
                    return g.asm.Hw.apply(null, arguments)
                },
                by = g._emscripten_bind_btWheelInfo_set_m_steering_1 = function() {
                    return g.asm.Iw.apply(null, arguments)
                },
                cy = g._emscripten_bind_btWheelInfo_set_m_suspensionRelativeVelocity_1 = function() {
                    return g.asm.Jw.apply(null, arguments)
                },
                dy = g._emscripten_bind_btWheelInfo_set_m_suspensionRestLength1_1 = function() {
                    return g.asm.Kw.apply(null, arguments)
                },
                ey = g._emscripten_bind_btWheelInfo_set_m_suspensionStiffness_1 = function() {
                    return g.asm.Lw.apply(null, arguments)
                },
                fy = g._emscripten_bind_btWheelInfo_set_m_wheelAxleCS_1 =
                function() {
                    return g.asm.Mw.apply(null, arguments)
                },
                gy = g._emscripten_bind_btWheelInfo_set_m_wheelDirectionCS_1 = function() {
                    return g.asm.Nw.apply(null, arguments)
                },
                hy = g._emscripten_bind_btWheelInfo_set_m_wheelsDampingCompression_1 = function() {
                    return g.asm.Ow.apply(null, arguments)
                },
                iy = g._emscripten_bind_btWheelInfo_set_m_wheelsDampingRelaxation_1 = function() {
                    return g.asm.Pw.apply(null, arguments)
                },
                jy = g._emscripten_bind_btWheelInfo_set_m_wheelsRadius_1 = function() {
                    return g.asm.Qw.apply(null, arguments)
                },
                ky = g._emscripten_bind_btWheelInfo_set_m_wheelsSuspensionForce_1 =
                function() {
                    return g.asm.Rw.apply(null, arguments)
                },
                ly = g._emscripten_bind_btWheelInfo_set_m_worldTransform_1 = function() {
                    return g.asm.Sw.apply(null, arguments)
                },
                my = g._emscripten_bind_btWheelInfo_updateWheel_2 = function() {
                    return g.asm.Tw.apply(null, arguments)
                },
                ny = g._emscripten_bind_tAnchorArray___destroy___0 = function() {
                    return g.asm.Uw.apply(null, arguments)
                },
                oy = g._emscripten_bind_tAnchorArray_at_1 = function() {
                    return g.asm.Vw.apply(null, arguments)
                },
                py = g._emscripten_bind_tAnchorArray_clear_0 = function() {
                    return g.asm.Ww.apply(null,
                        arguments)
                },
                qy = g._emscripten_bind_tAnchorArray_pop_back_0 = function() {
                    return g.asm.Xw.apply(null, arguments)
                },
                ry = g._emscripten_bind_tAnchorArray_push_back_1 = function() {
                    return g.asm.Yw.apply(null, arguments)
                },
                sy = g._emscripten_bind_tAnchorArray_size_0 = function() {
                    return g.asm.Zw.apply(null, arguments)
                },
                ty = g._emscripten_bind_tMaterialArray___destroy___0 = function() {
                    return g.asm._w.apply(null, arguments)
                },
                uy = g._emscripten_bind_tMaterialArray_at_1 = function() {
                    return g.asm.$w.apply(null, arguments)
                },
                vy = g._emscripten_bind_tMaterialArray_size_0 =
                function() {
                    return g.asm.ax.apply(null, arguments)
                },
                wy = g._emscripten_bind_tNodeArray___destroy___0 = function() {
                    return g.asm.bx.apply(null, arguments)
                },
                xy = g._emscripten_bind_tNodeArray_at_1 = function() {
                    return g.asm.cx.apply(null, arguments)
                },
                yy = g._emscripten_bind_tNodeArray_size_0 = function() {
                    return g.asm.dx.apply(null, arguments)
                },
                zy = g._emscripten_enum_PHY_ScalarType_PHY_DOUBLE = function() {
                    return g.asm.ex.apply(null, arguments)
                },
                Ay = g._emscripten_enum_PHY_ScalarType_PHY_FIXEDPOINT88 = function() {
                    return g.asm.fx.apply(null,
                        arguments)
                },
                By = g._emscripten_enum_PHY_ScalarType_PHY_FLOAT = function() {
                    return g.asm.gx.apply(null, arguments)
                },
                Cy = g._emscripten_enum_PHY_ScalarType_PHY_INTEGER = function() {
                    return g.asm.hx.apply(null, arguments)
                },
                Dy = g._emscripten_enum_PHY_ScalarType_PHY_SHORT = function() {
                    return g.asm.ix.apply(null, arguments)
                },
                Ey = g._emscripten_enum_PHY_ScalarType_PHY_UCHAR = function() {
                    return g.asm.jx.apply(null, arguments)
                },
                Fy = g._emscripten_enum_btConstraintParams_BT_CONSTRAINT_CFM = function() {
                    return g.asm.kx.apply(null, arguments)
                },
                Gy = g._emscripten_enum_btConstraintParams_BT_CONSTRAINT_ERP = function() {
                    return g.asm.lx.apply(null, arguments)
                },
                Hy = g._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_CFM = function() {
                    return g.asm.mx.apply(null, arguments)
                },
                Iy = g._emscripten_enum_btConstraintParams_BT_CONSTRAINT_STOP_ERP = function() {
                    return g.asm.nx.apply(null, arguments)
                };
            g._free = function() {
                return g.asm.ox.apply(null, arguments)
            };
            g._malloc = function() {
                return g.asm.px.apply(null, arguments)
            };
            g.dynCall_v = function() {
                return g.asm.qx.apply(null, arguments)
            };
            g.dynCall_vi = function() {
                return g.asm.rx.apply(null, arguments)
            };
            g.asm = Xa;
            g.addFunction = function(a) {
                for (var c = 0; 20 > c; c++)
                    if (!h[c]) return h[c] = a, 1 + c;
                throw "Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.";
            };
            g.Pointer_stringify = function() {
                la("this function has been removed - you should use UTF8ToString(ptr, maxBytesToRead) instead!")
            };
            g.then = function(a) {
                if (g.calledRun) a(g);
                else {
                    var c = g.onRuntimeInitialized;
                    g.onRuntimeInitialized = function() {
                        c && c();
                        a(g)
                    }
                }
                return g
            };

            function ka(a) {
                this.name = "ExitStatus";
                this.message = "Program terminated with exit(" + a + ")";
                this.status = a
            }
            ka.prototype = Error();
            ka.prototype.constructor = ka;
            Ia = function Jy() {
                g.calledRun || Ky();
                g.calledRun || (Ia = Jy)
            };

            function Ky() {
                function a() {
                    if (!g.calledRun && (g.calledRun = !0, !qa)) {
                        Ca || (Ca = !0, xa(za));
                        xa(Aa);
                        if (g.onRuntimeInitialized) g.onRuntimeInitialized();
                        if (g.postRun)
                            for ("function" == typeof g.postRun && (g.postRun = [g.postRun]); g.postRun.length;) {
                                var a = g.postRun.shift();
                                Ba.unshift(a)
                            }
                        xa(Ba)
                    }
                }
                if (!(0 < Ga)) {
                    if (g.preRun)
                        for ("function" == typeof g.preRun && (g.preRun = [g.preRun]); g.preRun.length;) Da();
                    xa(ya);
                    0 < Ga || g.calledRun || (g.setStatus ? (g.setStatus("Running..."), setTimeout(function() {
                        setTimeout(function() {
                                g.setStatus("")
                            },
                            1);
                        a()
                    }, 1)) : a())
                }
            }
            g.run = Ky;

            function la(a) {
                if (g.onAbort) g.onAbort(a);
                void 0 !== a ? (ma(a), na(a), a = JSON.stringify(a)) : a = "";
                qa = !0;
                throw "abort(" + a + "). Build with -s ASSERTIONS=1 for more info.";
            }
            g.abort = la;
            if (g.preInit)
                for ("function" == typeof g.preInit && (g.preInit = [g.preInit]); 0 < g.preInit.length;) g.preInit.pop()();
            g.noExitRuntime = !0;
            Ky();

            function k() {}
            k.prototype = Object.create(k.prototype);
            k.prototype.constructor = k;
            k.prototype.tx = k;
            k.ux = {};
            g.WrapperObject = k;

            function m(a) {
                return (a || k).ux
            }
            g.getCache = m;

            function n(a, c) {
                var d = m(c),
                    e = d[a];
                if (e) return e;
                e = Object.create((c || k).prototype);
                e.sx = a;
                return d[a] = e
            }
            g.wrapPointer = n;
            g.castObject = function(a, c) {
                return n(a.sx, c)
            };
            g.NULL = n(0);
            g.destroy = function(a) {
                if (!a.__destroy__) throw "Error: Cannot destroy object. (Did you create it yourself?)";
                a.__destroy__();
                delete m(a.tx)[a.sx]
            };
            g.compare = function(a, c) {
                return a.sx === c.sx
            };
            g.getPointer = function(a) {
                return a.sx
            };
            g.getClass = function(a) {
                return a.tx
            };
            b = {
                buffer: 0,
                size: 0,
                Hx: 0,
                Mx: [],
                Gx: 0,
                vx: function() {
                    if (b.Gx) {
                        for (var a = 0; a < b.Mx.length; a++) g._free(b.Mx[a]);
                        b.Mx.length = 0;
                        g._free(b.buffer);
                        b.buffer = 0;
                        b.size += b.Gx;
                        b.Gx = 0
                    }
                    b.buffer || (b.size += 128, b.buffer = g._malloc(b.size), assert(b.buffer));
                    b.Hx = 0
                },
                Nx: function(a, c) {
                    assert(b.buffer);
                    a = a.length * c.BYTES_PER_ELEMENT;
                    a = a + 7 & -8;
                    b.Hx + a >= b.size ? (assert(0 < a), b.Gx += a, c = g._malloc(a), b.Mx.push(c)) : (c = b.buffer + b.Hx, b.Hx += a);
                    return c
                },
                copy: function(a, c, d) {
                    switch (c.BYTES_PER_ELEMENT) {
                        case 2:
                            d >>= 1;
                            break;
                        case 4:
                            d >>= 2;
                            break;
                        case 8:
                            d >>= 3
                    }
                    for (var e = 0; e < a.length; e++) c[d + e] = a[e]
                }
            };

            function Ly(a) {
                if ("string" === typeof a) {
                    for (var c = 0, d = 0; d < a.length; ++d) {
                        var e = a.charCodeAt(d);
                        55296 <= e && 57343 >= e && (e = 65536 + ((e & 1023) << 10) | a.charCodeAt(++d) & 1023);
                        127 >= e ? ++c : c = 2047 >= e ? c + 2 : 65535 >= e ? c + 3 : c + 4
                    }
                    c = Array(c + 1);
                    e = c.length;
                    d = 0;
                    if (0 < e) {
                        e = d + e - 1;
                        for (var f = 0; f < a.length; ++f) {
                            var l = a.charCodeAt(f);
                            if (55296 <= l && 57343 >= l) {
                                var q = a.charCodeAt(++f);
                                l = 65536 + ((l & 1023) << 10) | q & 1023
                            }
                            if (127 >= l) {
                                if (d >= e) break;
                                c[d++] = l
                            } else {
                                if (2047 >= l) {
                                    if (d + 1 >= e) break;
                                    c[d++] = 192 | l >> 6
                                } else {
                                    if (65535 >= l) {
                                        if (d + 2 >= e) break;
                                        c[d++] = 224 |
                                            l >> 12
                                    } else {
                                        if (d + 3 >= e) break;
                                        c[d++] = 240 | l >> 18;
                                        c[d++] = 128 | l >> 12 & 63
                                    }
                                    c[d++] = 128 | l >> 6 & 63
                                }
                                c[d++] = 128 | l & 63
                            }
                        }
                        c[d] = 0
                    }
                    a = b.Nx(c, sa);
                    b.copy(c, sa, a)
                }
                return a
            }

            function My(a) {
                if ("object" === typeof a) {
                    var c = b.Nx(a, va);
                    b.copy(a, va, c);
                    return c
                }
                return a
            }

            function Ny() {
                throw "cannot construct a btCollisionWorld, no constructor in IDL";
            }
            Ny.prototype = Object.create(k.prototype);
            Ny.prototype.constructor = Ny;
            Ny.prototype.tx = Ny;
            Ny.ux = {};
            g.btCollisionWorld = Ny;
            Ny.prototype.getDispatcher = function() {
                return n(Pg(this.sx), Oy)
            };
            Ny.prototype.rayTest = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Rg(e, a, c, d)
            };
            Ny.prototype.getPairCache = function() {
                return n(Qg(this.sx), Py)
            };
            Ny.prototype.getDispatchInfo = function() {
                return n(Og(this.sx), p)
            };
            Ny.prototype.addCollisionObject = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                void 0 === c ? Eg(e, a) : void 0 === d ? Fg(e, a, c) : Gg(e, a, c, d)
            };
            Ny.prototype.removeCollisionObject = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Sg(c, a)
            };
            Ny.prototype.getBroadphase = function() {
                return n(Mg(this.sx), Qy)
            };
            Ny.prototype.convexSweepTest = function(a, c, d, e, f) {
                var l = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                Jg(l, a, c, d, e, f)
            };
            Ny.prototype.contactPairTest = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Hg(e, a, c, d)
            };
            Ny.prototype.contactTest = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Ig(d, a, c)
            };
            Ny.prototype.updateSingleAabb = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ug(c, a)
            };
            Ny.prototype.setDebugDrawer = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Tg(c, a)
            };
            Ny.prototype.getDebugDrawer = function() {
                return n(Ng(this.sx), Ry)
            };
            Ny.prototype.debugDrawWorld = function() {
                Lg(this.sx)
            };
            Ny.prototype.debugDrawObject = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Kg(e, a, c, d)
            };
            Ny.prototype.__destroy__ = function() {
                Dg(this.sx)
            };

            function Sy() {
                throw "cannot construct a btCollisionShape, no constructor in IDL";
            }
            Sy.prototype = Object.create(k.prototype);
            Sy.prototype.constructor = Sy;
            Sy.prototype.tx = Sy;
            Sy.ux = {};
            g.btCollisionShape = Sy;
            Sy.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Bg(c, a)
            };
            Sy.prototype.getLocalScaling = function() {
                return n(zg(this.sx), r)
            };
            Sy.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                yg(d, a, c)
            };
            Sy.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Cg(c, a)
            };
            Sy.prototype.getMargin = function() {
                return Ag(this.sx)
            };
            Sy.prototype.__destroy__ = function() {
                xg(this.sx)
            };

            function t() {
                throw "cannot construct a btCollisionObject, no constructor in IDL";
            }
            t.prototype = Object.create(k.prototype);
            t.prototype.constructor = t;
            t.prototype.tx = t;
            t.ux = {};
            g.btCollisionObject = t;
            t.prototype.setAnisotropicFriction = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                lg(d, a, c)
            };
            t.prototype.getCollisionShape = function() {
                return n(cg(this.sx), Sy)
            };
            t.prototype.setContactProcessingThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                qg(c, a)
            };
            t.prototype.setActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                kg(c, a)
            };
            t.prototype.forceActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ag(c, a)
            };
            t.prototype.activate = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                void 0 === a ? Zf(c) : $f(c, a)
            };
            t.prototype.isActive = function() {
                return !!gg(this.sx)
            };
            t.prototype.isKinematicObject = function() {
                return !!hg(this.sx)
            };
            t.prototype.isStaticObject = function() {
                return !!ig(this.sx)
            };
            t.prototype.isStaticOrKinematicObject = function() {
                return !!jg(this.sx)
            };
            t.prototype.setRestitution = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                sg(c, a)
            };
            t.prototype.setFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                rg(c, a)
            };
            t.prototype.setRollingFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                tg(c, a)
            };
            t.prototype.getWorldTransform = function() {
                return n(fg(this.sx), u)
            };
            t.prototype.getCollisionFlags = function() {
                return bg(this.sx)
            };
            t.prototype.setCollisionFlags = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                og(c, a)
            };
            t.prototype.setWorldTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                wg(c, a)
            };
            t.prototype.setCollisionShape = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                pg(c, a)
            };
            t.prototype.setCcdMotionThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                mg(c, a)
            };
            t.prototype.setCcdSweptSphereRadius = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ng(c, a)
            };
            t.prototype.getUserIndex = function() {
                return dg(this.sx)
            };
            t.prototype.setUserIndex = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ug(c, a)
            };
            t.prototype.getUserPointer = function() {
                return n(eg(this.sx), Ty)
            };
            t.prototype.setUserPointer = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                vg(c, a)
            };
            t.prototype.__destroy__ = function() {
                Yf(this.sx)
            };

            function Uy() {
                throw "cannot construct a btDynamicsWorld, no constructor in IDL";
            }
            Uy.prototype = Object.create(Ny.prototype);
            Uy.prototype.constructor = Uy;
            Uy.prototype.tx = Uy;
            Uy.ux = {};
            g.btDynamicsWorld = Uy;
            Uy.prototype.addAction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mk(c, a)
            };
            Uy.prototype.removeAction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                bl(c, a)
            };
            Uy.prototype.getSolverInfo = function() {
                return n($k(this.sx), v)
            };
            Uy.prototype.getDispatcher = function() {
                return n(Yk(this.sx), Oy)
            };
            Uy.prototype.rayTest = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                al(e, a, c, d)
            };
            Uy.prototype.getPairCache = function() {
                return n(Zk(this.sx), Py)
            };
            Uy.prototype.getDispatchInfo = function() {
                return n(Xk(this.sx), p)
            };
            Uy.prototype.addCollisionObject = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                void 0 === c ? Nk(e, a) : void 0 === d ? Ok(e, a, c) : Pk(e, a, c, d)
            };
            Uy.prototype.removeCollisionObject = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                cl(c, a)
            };
            Uy.prototype.getBroadphase = function() {
                return n(Vk(this.sx), Qy)
            };
            Uy.prototype.convexSweepTest = function(a, c, d, e, f) {
                var l = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                Sk(l, a, c, d, e, f)
            };
            Uy.prototype.contactPairTest = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Qk(e, a, c, d)
            };
            Uy.prototype.contactTest = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Rk(d, a, c)
            };
            Uy.prototype.updateSingleAabb = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                el(c, a)
            };
            Uy.prototype.setDebugDrawer = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                dl(c, a)
            };
            Uy.prototype.getDebugDrawer = function() {
                return n(Wk(this.sx), Ry)
            };
            Uy.prototype.debugDrawWorld = function() {
                Uk(this.sx)
            };
            Uy.prototype.debugDrawObject = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Tk(e, a, c, d)
            };
            Uy.prototype.__destroy__ = function() {
                Lk(this.sx)
            };

            function Vy() {
                throw "cannot construct a btTypedConstraint, no constructor in IDL";
            }
            Vy.prototype = Object.create(k.prototype);
            Vy.prototype.constructor = Vy;
            Vy.prototype.tx = Vy;
            Vy.ux = {};
            g.btTypedConstraint = Vy;
            Vy.prototype.enableFeedback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ev(c, a)
            };
            Vy.prototype.getBreakingImpulseThreshold = function() {
                return Fv(this.sx)
            };
            Vy.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Hv(c, a)
            };
            Vy.prototype.getParam = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return Gv(d, a, c)
            };
            Vy.prototype.setParam = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Iv(e, a, c, d)
            };
            Vy.prototype.__destroy__ = function() {
                Dv(this.sx)
            };

            function Wy() {
                throw "cannot construct a btConcaveShape, no constructor in IDL";
            }
            Wy.prototype = Object.create(Sy.prototype);
            Wy.prototype.constructor = Wy;
            Wy.prototype.tx = Wy;
            Wy.ux = {};
            g.btConcaveShape = Wy;
            Wy.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                kh(c, a)
            };
            Wy.prototype.getLocalScaling = function() {
                return n(jh(this.sx), r)
            };
            Wy.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                ih(d, a, c)
            };
            Wy.prototype.__destroy__ = function() {
                hh(this.sx)
            };

            function Xy(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = Kf(a, c);
                m(Xy)[this.sx] = this
            }
            Xy.prototype = Object.create(Sy.prototype);
            Xy.prototype.constructor = Xy;
            Xy.prototype.tx = Xy;
            Xy.ux = {};
            g.btCapsuleShape = Xy;
            Xy.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Sf(c, a)
            };
            Xy.prototype.getMargin = function() {
                return Of(this.sx)
            };
            Xy.prototype.getUpAxis = function() {
                return Qf(this.sx)
            };
            Xy.prototype.getRadius = function() {
                return Pf(this.sx)
            };
            Xy.prototype.getHalfHeight = function() {
                return Mf(this.sx)
            };
            Xy.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Rf(c, a)
            };
            Xy.prototype.getLocalScaling = function() {
                return n(Nf(this.sx), r)
            };
            Xy.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Lf(d, a, c)
            };
            Xy.prototype.__destroy__ = function() {
                Jf(this.sx)
            };

            function Ry() {
                throw "cannot construct a btIDebugDraw, no constructor in IDL";
            }
            Ry.prototype = Object.create(k.prototype);
            Ry.prototype.constructor = Ry;
            Ry.prototype.tx = Ry;
            Ry.ux = {};
            g.btIDebugDraw = Ry;
            Ry.prototype.drawLine = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                en(e, a, c, d)
            };
            Ry.prototype.drawContactPoint = function(a, c, d, e, f) {
                var l = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                dn(l, a, c, d, e, f)
            };
            Ry.prototype.reportErrorWarning = function(a) {
                var c = this.sx;
                b.vx();
                a = a && "object" === typeof a ? a.sx : Ly(a);
                gn(c, a)
            };
            Ry.prototype.draw3dText = function(a, c) {
                var d = this.sx;
                b.vx();
                a && "object" === typeof a && (a = a.sx);
                c = c && "object" === typeof c ? c.sx : Ly(c);
                cn(d, a, c)
            };
            Ry.prototype.setDebugMode = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                hn(c, a)
            };
            Ry.prototype.getDebugMode = function() {
                return fn(this.sx)
            };
            Ry.prototype.__destroy__ = function() {
                bn(this.sx)
            };

            function Yy(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = void 0 === a ? kj() : lj(a);
                m(Yy)[this.sx] = this
            }
            Yy.prototype = Object.create(k.prototype);
            Yy.prototype.constructor = Yy;
            Yy.prototype.tx = Yy;
            Yy.ux = {};
            g.btDefaultCollisionConfiguration = Yy;
            Yy.prototype.__destroy__ = function() {
                jj(this.sx)
            };

            function w() {
                throw "cannot construct a ConvexResultCallback, no constructor in IDL";
            }
            w.prototype = Object.create(k.prototype);
            w.prototype.constructor = w;
            w.prototype.tx = w;
            w.ux = {};
            g.ConvexResultCallback = w;
            w.prototype.hasHit = function() {
                return !!nd(this.sx)
            };
            w.prototype.get_m_collisionFilterGroup = w.prototype.wx = function() {
                return ld(this.sx)
            };
            w.prototype.set_m_collisionFilterGroup = w.prototype.yx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                pd(c, a)
            };
            Object.defineProperty(w.prototype, "m_collisionFilterGroup", {
                get: w.prototype.wx,
                set: w.prototype.yx
            });
            w.prototype.get_m_collisionFilterMask = w.prototype.xx = function() {
                return md(this.sx)
            };
            w.prototype.set_m_collisionFilterMask = w.prototype.zx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                qd(c, a)
            };
            Object.defineProperty(w.prototype, "m_collisionFilterMask", {
                get: w.prototype.xx,
                set: w.prototype.zx
            });
            w.prototype.get_m_closestHitFraction = w.prototype.Ax = function() {
                return kd(this.sx)
            };
            w.prototype.set_m_closestHitFraction = w.prototype.Bx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                od(c, a)
            };
            Object.defineProperty(w.prototype, "m_closestHitFraction", {
                get: w.prototype.Ax,
                set: w.prototype.Bx
            });
            w.prototype.__destroy__ = function() {
                jd(this.sx)
            };

            function Zy() {
                throw "cannot construct a btTriangleMeshShape, no constructor in IDL";
            }
            Zy.prototype = Object.create(Wy.prototype);
            Zy.prototype.constructor = Zy;
            Zy.prototype.tx = Zy;
            Zy.ux = {};
            g.btTriangleMeshShape = Zy;
            Zy.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                vv(c, a)
            };
            Zy.prototype.getLocalScaling = function() {
                return n(uv(this.sx), r)
            };
            Zy.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                tv(d, a, c)
            };
            Zy.prototype.__destroy__ = function() {
                sv(this.sx)
            };

            function x() {
                this.sx = $l();
                m(x)[this.sx] = this
            }
            x.prototype = Object.create(t.prototype);
            x.prototype.constructor = x;
            x.prototype.tx = x;
            x.ux = {};
            g.btGhostObject = x;
            x.prototype.getNumOverlappingObjects = function() {
                return dm(this.sx)
            };
            x.prototype.getOverlappingObject = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(em(c, a), t)
            };
            x.prototype.setAnisotropicFriction = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                nm(d, a, c)
            };
            x.prototype.getCollisionShape = function() {
                return n(cm(this.sx), Sy)
            };
            x.prototype.setContactProcessingThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                sm(c, a)
            };
            x.prototype.setActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                mm(c, a)
            };
            x.prototype.forceActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                am(c, a)
            };
            x.prototype.activate = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                void 0 === a ? Yl(c) : Zl(c, a)
            };
            x.prototype.isActive = function() {
                return !!im(this.sx)
            };
            x.prototype.isKinematicObject = function() {
                return !!jm(this.sx)
            };
            x.prototype.isStaticObject = function() {
                return !!km(this.sx)
            };
            x.prototype.isStaticOrKinematicObject = function() {
                return !!lm(this.sx)
            };
            x.prototype.setRestitution = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                um(c, a)
            };
            x.prototype.setFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                tm(c, a)
            };
            x.prototype.setRollingFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                wm(c, a)
            };
            x.prototype.getWorldTransform = function() {
                return n(hm(this.sx), u)
            };
            x.prototype.getCollisionFlags = function() {
                return bm(this.sx)
            };
            x.prototype.setCollisionFlags = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                qm(c, a)
            };
            x.prototype.setWorldTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                zm(c, a)
            };
            x.prototype.setCollisionShape = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                rm(c, a)
            };
            x.prototype.setCcdMotionThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                om(c, a)
            };
            x.prototype.setCcdSweptSphereRadius = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                pm(c, a)
            };
            x.prototype.getUserIndex = function() {
                return fm(this.sx)
            };
            x.prototype.setUserIndex = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                xm(c, a)
            };
            x.prototype.getUserPointer = function() {
                return n(gm(this.sx), Ty)
            };
            x.prototype.setUserPointer = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ym(c, a)
            };
            x.prototype.__destroy__ = function() {
                Xl(this.sx)
            };

            function $y(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = wh(a, c);
                m($y)[this.sx] = this
            }
            $y.prototype = Object.create(Sy.prototype);
            $y.prototype.constructor = $y;
            $y.prototype.tx = $y;
            $y.ux = {};
            g.btConeShape = $y;
            $y.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                zh(c, a)
            };
            $y.prototype.getLocalScaling = function() {
                return n(yh(this.sx), r)
            };
            $y.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                xh(d, a, c)
            };
            $y.prototype.__destroy__ = function() {
                vh(this.sx)
            };

            function az() {
                throw "cannot construct a btActionInterface, no constructor in IDL";
            }
            az.prototype = Object.create(k.prototype);
            az.prototype.constructor = az;
            az.prototype.tx = az;
            az.ux = {};
            g.btActionInterface = az;
            az.prototype.updateAction = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Qe(d, a, c)
            };
            az.prototype.__destroy__ = function() {
                Pe(this.sx)
            };

            function r(a, c, d) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                this.sx = void 0 === a ? Nv() : void 0 === c ? _emscripten_bind_btVector3_btVector3_1(a) : void 0 === d ? _emscripten_bind_btVector3_btVector3_2(a, c) : Ov(a, c, d);
                m(r)[this.sx] = this
            }
            r.prototype = Object.create(k.prototype);
            r.prototype.constructor = r;
            r.prototype.tx = r;
            r.ux = {};
            g.btVector3 = r;
            r.prototype.length = r.prototype.length = function() {
                return Qv(this.sx)
            };
            r.prototype.x = r.prototype.x = function() {
                return $v(this.sx)
            };
            r.prototype.y = r.prototype.y = function() {
                return aw(this.sx)
            };
            r.prototype.z = r.prototype.z = function() {
                return bw(this.sx)
            };
            r.prototype.setX = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xv(c, a)
            };
            r.prototype.setY = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Yv(c, a)
            };
            r.prototype.setZ = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zv(c, a)
            };
            r.prototype.setValue = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Wv(e, a, c, d)
            };
            r.prototype.normalize = r.prototype.normalize = function() {
                Rv(this.sx)
            };
            r.prototype.rotate = r.prototype.rotate = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return n(Vv(d, a, c), r)
            };
            r.prototype.dot = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return Pv(c, a)
            };
            r.prototype.op_mul = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Tv(c, a), r)
            };
            r.prototype.op_add = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Sv(c, a), r)
            };
            r.prototype.op_sub = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Uv(c, a), r)
            };
            r.prototype.__destroy__ = function() {
                Mv(this.sx)
            };

            function bz() {
                throw "cannot construct a btVehicleRaycaster, no constructor in IDL";
            }
            bz.prototype = Object.create(k.prototype);
            bz.prototype.constructor = bz;
            bz.prototype.tx = bz;
            bz.ux = {};
            g.btVehicleRaycaster = bz;
            bz.prototype.castRay = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Cw(e, a, c, d)
            };
            bz.prototype.__destroy__ = function() {
                Bw(this.sx)
            };

            function cz() {
                throw "cannot construct a btQuadWord, no constructor in IDL";
            }
            cz.prototype = Object.create(k.prototype);
            cz.prototype.constructor = cz;
            cz.prototype.tx = cz;
            cz.ux = {};
            g.btQuadWord = cz;
            cz.prototype.x = cz.prototype.x = function() {
                return mp(this.sx)
            };
            cz.prototype.y = cz.prototype.y = function() {
                return np(this.sx)
            };
            cz.prototype.z = cz.prototype.z = function() {
                return op(this.sx)
            };
            cz.prototype.w = cz.prototype.fy = function() {
                return lp(this.sx)
            };
            cz.prototype.setX = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ip(c, a)
            };
            cz.prototype.setY = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                jp(c, a)
            };
            cz.prototype.setZ = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                kp(c, a)
            };
            cz.prototype.setW = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                hp(c, a)
            };
            cz.prototype.__destroy__ = function() {
                gp(this.sx)
            };

            function dz(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = bj(a);
                m(dz)[this.sx] = this
            }
            dz.prototype = Object.create(Sy.prototype);
            dz.prototype.constructor = dz;
            dz.prototype.tx = dz;
            dz.ux = {};
            g.btCylinderShape = dz;
            dz.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                gj(c, a)
            };
            dz.prototype.getMargin = function() {
                return ej(this.sx)
            };
            dz.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                fj(c, a)
            };
            dz.prototype.getLocalScaling = function() {
                return n(dj(this.sx), r)
            };
            dz.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                cj(d, a, c)
            };
            dz.prototype.__destroy__ = function() {
                aj(this.sx)
            };

            function y(a, c, d, e) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                this.sx = Kj(a, c, d, e);
                m(y)[this.sx] = this
            }
            y.prototype = Object.create(Uy.prototype);
            y.prototype.constructor = y;
            y.prototype.tx = y;
            y.ux = {};
            g.btDiscreteDynamicsWorld = y;
            y.prototype.setGravity = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                gk(c, a)
            };
            y.prototype.getGravity = function() {
                return n(Uj(this.sx), r)
            };
            y.prototype.addRigidBody = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                void 0 === c ? Ij(e, a) : void 0 === d ? _emscripten_bind_btDiscreteDynamicsWorld_addRigidBody_2(e, a, c) : Jj(e, a, c, d)
            };
            y.prototype.removeRigidBody = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                bk(c, a)
            };
            y.prototype.addConstraint = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                void 0 === c ? Gj(d, a) : Hj(d, a, c)
            };
            y.prototype.removeConstraint = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ak(c, a)
            };
            y.prototype.stepSimulation = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                return void 0 === c ? hk(e, a) : void 0 === d ? ik(e, a, c) : jk(e, a, c, d)
            };
            y.prototype.setContactAddedCallback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ck(c, a)
            };
            y.prototype.setContactProcessedCallback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ek(c, a)
            };
            y.prototype.setContactDestroyedCallback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                dk(c, a)
            };
            y.prototype.getDispatcher = function() {
                return n(Tj(this.sx), Oy)
            };
            y.prototype.rayTest = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Xj(e, a, c, d)
            };
            y.prototype.getPairCache = function() {
                return n(Vj(this.sx), Py)
            };
            y.prototype.getDispatchInfo = function() {
                return n(Sj(this.sx), p)
            };
            y.prototype.addCollisionObject = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                void 0 === c ? Dj(e, a) : void 0 === d ? Ej(e, a, c) : Fj(e, a, c, d)
            };
            y.prototype.removeCollisionObject = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zj(c, a)
            };
            y.prototype.getBroadphase = function() {
                return n(Qj(this.sx), Qy)
            };
            y.prototype.convexSweepTest = function(a, c, d, e, f) {
                var l = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                Nj(l, a, c, d, e, f)
            };
            y.prototype.contactPairTest = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Lj(e, a, c, d)
            };
            y.prototype.contactTest = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Mj(d, a, c)
            };
            y.prototype.updateSingleAabb = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                kk(c, a)
            };
            y.prototype.setDebugDrawer = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                fk(c, a)
            };
            y.prototype.getDebugDrawer = function() {
                return n(Rj(this.sx), Ry)
            };
            y.prototype.debugDrawWorld = function() {
                Pj(this.sx)
            };
            y.prototype.debugDrawObject = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Oj(e, a, c, d)
            };
            y.prototype.addAction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Cj(c, a)
            };
            y.prototype.removeAction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Yj(c, a)
            };
            y.prototype.getSolverInfo = function() {
                return n(Wj(this.sx), v)
            };
            y.prototype.__destroy__ = function() {
                Bj(this.sx)
            };

            function ez() {
                throw "cannot construct a btConvexShape, no constructor in IDL";
            }
            ez.prototype = Object.create(Sy.prototype);
            ez.prototype.constructor = ez;
            ez.prototype.tx = ez;
            ez.ux = {};
            g.btConvexShape = ez;
            ez.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Di(c, a)
            };
            ez.prototype.getLocalScaling = function() {
                return n(Bi(this.sx), r)
            };
            ez.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Ai(d, a, c)
            };
            ez.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ei(c, a)
            };
            ez.prototype.getMargin = function() {
                return Ci(this.sx)
            };
            ez.prototype.__destroy__ = function() {
                zi(this.sx)
            };

            function Oy() {
                throw "cannot construct a btDispatcher, no constructor in IDL";
            }
            Oy.prototype = Object.create(k.prototype);
            Oy.prototype.constructor = Oy;
            Oy.prototype.tx = Oy;
            Oy.ux = {};
            g.btDispatcher = Oy;
            Oy.prototype.getNumManifolds = function() {
                return Kk(this.sx)
            };
            Oy.prototype.getManifoldByIndexInternal = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Jk(c, a), fz)
            };
            Oy.prototype.__destroy__ = function() {
                Ik(this.sx)
            };

            function gz(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                this.sx = void 0 === e ? vl(a, c, d) : void 0 === f ? _emscripten_bind_btGeneric6DofConstraint_btGeneric6DofConstraint_4(a, c, d, e) : wl(a, c, d, e, f);
                m(gz)[this.sx] = this
            }
            gz.prototype = Object.create(Vy.prototype);
            gz.prototype.constructor = gz;
            gz.prototype.tx = gz;
            gz.ux = {};
            g.btGeneric6DofConstraint = gz;
            gz.prototype.setLinearLowerLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                El(c, a)
            };
            gz.prototype.setLinearUpperLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Fl(c, a)
            };
            gz.prototype.setAngularLowerLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Bl(c, a)
            };
            gz.prototype.setAngularUpperLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Cl(c, a)
            };
            gz.prototype.getFrameOffsetA = function() {
                return n(zl(this.sx), u)
            };
            gz.prototype.enableFeedback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                xl(c, a)
            };
            gz.prototype.getBreakingImpulseThreshold = function() {
                return yl(this.sx)
            };
            gz.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Dl(c, a)
            };
            gz.prototype.getParam = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return Al(d, a, c)
            };
            gz.prototype.setParam = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Gl(e, a, c, d)
            };
            gz.prototype.__destroy__ = function() {
                ul(this.sx)
            };

            function hz() {
                throw "cannot construct a btStridingMeshInterface, no constructor in IDL";
            }
            hz.prototype = Object.create(k.prototype);
            hz.prototype.constructor = hz;
            hz.prototype.tx = hz;
            hz.ux = {};
            g.btStridingMeshInterface = hz;
            hz.prototype.setScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                fv(c, a)
            };
            hz.prototype.__destroy__ = function() {
                ev(this.sx)
            };

            function iz() {
                throw "cannot construct a btMotionState, no constructor in IDL";
            }
            iz.prototype = Object.create(k.prototype);
            iz.prototype.constructor = iz;
            iz.prototype.tx = iz;
            iz.ux = {};
            g.btMotionState = iz;
            iz.prototype.getWorldTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                fo(c, a)
            };
            iz.prototype.setWorldTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                go(c, a)
            };
            iz.prototype.__destroy__ = function() {
                eo(this.sx)
            };

            function jz() {
                throw "cannot construct a ContactResultCallback, no constructor in IDL";
            }
            jz.prototype = Object.create(k.prototype);
            jz.prototype.constructor = jz;
            jz.prototype.tx = jz;
            jz.ux = {};
            g.ContactResultCallback = jz;
            jz.prototype.addSingleResult = function(a, c, d, e, f, l, q) {
                var C = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                l && "object" === typeof l && (l = l.sx);
                q && "object" === typeof q && (q = q.sx);
                return id(C, a, c, d, e, f, l, q)
            };
            jz.prototype.__destroy__ = function() {
                hd(this.sx)
            };

            function kz() {
                throw "cannot construct a btSoftBodySolver, no constructor in IDL";
            }
            kz.prototype = Object.create(k.prototype);
            kz.prototype.constructor = kz;
            kz.prototype.tx = kz;
            kz.ux = {};
            g.btSoftBodySolver = kz;
            kz.prototype.__destroy__ = function() {
                Js(this.sx)
            };

            function z() {
                throw "cannot construct a RayResultCallback, no constructor in IDL";
            }
            z.prototype = Object.create(k.prototype);
            z.prototype.constructor = z;
            z.prototype.tx = z;
            z.ux = {};
            g.RayResultCallback = z;
            z.prototype.hasHit = function() {
                return !!se(this.sx)
            };
            z.prototype.get_m_collisionFilterGroup = z.prototype.wx = function() {
                return pe(this.sx)
            };
            z.prototype.set_m_collisionFilterGroup = z.prototype.yx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ue(c, a)
            };
            Object.defineProperty(z.prototype, "m_collisionFilterGroup", {
                get: z.prototype.wx,
                set: z.prototype.yx
            });
            z.prototype.get_m_collisionFilterMask = z.prototype.xx = function() {
                return qe(this.sx)
            };
            z.prototype.set_m_collisionFilterMask = z.prototype.zx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ve(c, a)
            };
            Object.defineProperty(z.prototype, "m_collisionFilterMask", {
                get: z.prototype.xx,
                set: z.prototype.zx
            });
            z.prototype.get_m_closestHitFraction = z.prototype.Ax = function() {
                return oe(this.sx)
            };
            z.prototype.set_m_closestHitFraction = z.prototype.Bx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                te(c, a)
            };
            Object.defineProperty(z.prototype, "m_closestHitFraction", {
                get: z.prototype.Ax,
                set: z.prototype.Bx
            });
            z.prototype.get_m_collisionObject = z.prototype.Qx = function() {
                return n(re(this.sx), t)
            };
            z.prototype.set_m_collisionObject = z.prototype.Yx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                we(c, a)
            };
            Object.defineProperty(z.prototype, "m_collisionObject", {
                get: z.prototype.Qx,
                set: z.prototype.Yx
            });
            z.prototype.__destroy__ = function() {
                ne(this.sx)
            };

            function lz() {
                throw "cannot construct a btMatrix3x3, no constructor in IDL";
            }
            lz.prototype = Object.create(k.prototype);
            lz.prototype.constructor = lz;
            lz.prototype.tx = lz;
            lz.ux = {};
            g.btMatrix3x3 = lz;
            lz.prototype.setEulerZYX = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                co(e, a, c, d)
            };
            lz.prototype.getRotation = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ao(c, a)
            };
            lz.prototype.getRow = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(bo(c, a), r)
            };
            lz.prototype.__destroy__ = function() {
                $n(this.sx)
            };

            function p() {
                throw "cannot construct a btDispatcherInfo, no constructor in IDL";
            }
            p.prototype = Object.create(k.prototype);
            p.prototype.constructor = p;
            p.prototype.tx = p;
            p.ux = {};
            g.btDispatcherInfo = p;
            p.prototype.get_m_timeStep = p.prototype.tA = function() {
                return tk(this.sx)
            };
            p.prototype.set_m_timeStep = p.prototype.ZC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ek(c, a)
            };
            Object.defineProperty(p.prototype, "m_timeStep", {
                get: p.prototype.tA,
                set: p.prototype.ZC
            });
            p.prototype.get_m_stepCount = p.prototype.kA = function() {
                return rk(this.sx)
            };
            p.prototype.set_m_stepCount = p.prototype.QC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ck(c, a)
            };
            Object.defineProperty(p.prototype, "m_stepCount", {
                get: p.prototype.kA,
                set: p.prototype.QC
            });
            p.prototype.get_m_dispatchFunc = p.prototype.ez = function() {
                return ok(this.sx)
            };
            p.prototype.set_m_dispatchFunc = p.prototype.LB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                zk(c, a)
            };
            Object.defineProperty(p.prototype, "m_dispatchFunc", {
                get: p.prototype.ez,
                set: p.prototype.LB
            });
            p.prototype.get_m_timeOfImpact = p.prototype.sA = function() {
                return sk(this.sx)
            };
            p.prototype.set_m_timeOfImpact = p.prototype.YC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Dk(c, a)
            };
            Object.defineProperty(p.prototype, "m_timeOfImpact", {
                get: p.prototype.sA,
                set: p.prototype.YC
            });
            p.prototype.get_m_useContinuous = p.prototype.vA = function() {
                return !!uk(this.sx)
            };
            p.prototype.set_m_useContinuous = p.prototype.aD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Fk(c, a)
            };
            Object.defineProperty(p.prototype, "m_useContinuous", {
                get: p.prototype.vA,
                set: p.prototype.aD
            });
            p.prototype.get_m_enableSatConvex = p.prototype.iz = function() {
                return !!qk(this.sx)
            };
            p.prototype.set_m_enableSatConvex = p.prototype.PB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Bk(c, a)
            };
            Object.defineProperty(p.prototype, "m_enableSatConvex", {
                get: p.prototype.iz,
                set: p.prototype.PB
            });
            p.prototype.get_m_enableSPU = p.prototype.hz = function() {
                return !!pk(this.sx)
            };
            p.prototype.set_m_enableSPU = p.prototype.OB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ak(c, a)
            };
            Object.defineProperty(p.prototype, "m_enableSPU", {
                get: p.prototype.hz,
                set: p.prototype.OB
            });
            p.prototype.get_m_useEpa = p.prototype.xA = function() {
                return !!wk(this.sx)
            };
            p.prototype.set_m_useEpa = p.prototype.cD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Hk(c, a)
            };
            Object.defineProperty(p.prototype, "m_useEpa", {
                get: p.prototype.xA,
                set: p.prototype.cD
            });
            p.prototype.get_m_allowedCcdPenetration = p.prototype.Jy = function() {
                return mk(this.sx)
            };
            p.prototype.set_m_allowedCcdPenetration = p.prototype.pB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                xk(c, a)
            };
            Object.defineProperty(p.prototype, "m_allowedCcdPenetration", {
                get: p.prototype.Jy,
                set: p.prototype.pB
            });
            p.prototype.get_m_useConvexConservativeDistanceUtil = p.prototype.wA = function() {
                return !!vk(this.sx)
            };
            p.prototype.set_m_useConvexConservativeDistanceUtil = p.prototype.bD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Gk(c, a)
            };
            Object.defineProperty(p.prototype, "m_useConvexConservativeDistanceUtil", {
                get: p.prototype.wA,
                set: p.prototype.bD
            });
            p.prototype.get_m_convexConservativeDistanceThreshold = p.prototype.$y = function() {
                return nk(this.sx)
            };
            p.prototype.set_m_convexConservativeDistanceThreshold = p.prototype.GB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                yk(c, a)
            };
            Object.defineProperty(p.prototype, "m_convexConservativeDistanceThreshold", {
                get: p.prototype.$y,
                set: p.prototype.GB
            });
            p.prototype.__destroy__ = function() {
                lk(this.sx)
            };

            function A() {
                throw "cannot construct a Material, no constructor in IDL";
            }
            A.prototype = Object.create(k.prototype);
            A.prototype.constructor = A;
            A.prototype.tx = A;
            A.ux = {};
            g.Material = A;
            A.prototype.get_m_kLST = A.prototype.Fz = function() {
                return Td(this.sx)
            };
            A.prototype.set_m_kLST = A.prototype.kC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xd(c, a)
            };
            Object.defineProperty(A.prototype, "m_kLST", {
                get: A.prototype.Fz,
                set: A.prototype.kC
            });
            A.prototype.get_m_kAST = A.prototype.Ez = function() {
                return Sd(this.sx)
            };
            A.prototype.set_m_kAST = A.prototype.jC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wd(c, a)
            };
            Object.defineProperty(A.prototype, "m_kAST", {
                get: A.prototype.Ez,
                set: A.prototype.jC
            });
            A.prototype.get_m_kVST = A.prototype.Gz = function() {
                return Ud(this.sx)
            };
            A.prototype.set_m_kVST = A.prototype.lC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Yd(c, a)
            };
            Object.defineProperty(A.prototype, "m_kVST", {
                get: A.prototype.Gz,
                set: A.prototype.lC
            });
            A.prototype.get_m_flags = A.prototype.mz = function() {
                return Rd(this.sx)
            };
            A.prototype.set_m_flags = A.prototype.TB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vd(c, a)
            };
            Object.defineProperty(A.prototype, "m_flags", {
                get: A.prototype.mz,
                set: A.prototype.TB
            });
            A.prototype.__destroy__ = function() {
                Qd(this.sx)
            };

            function B() {
                throw "cannot construct a btWheelInfoConstructionInfo, no constructor in IDL";
            }
            B.prototype = Object.create(k.prototype);
            B.prototype.constructor = B;
            B.prototype.tx = B;
            B.ux = {};
            g.btWheelInfoConstructionInfo = B;
            B.prototype.get_m_chassisConnectionCS = B.prototype.Vy = function() {
                return n(Sw(this.sx), r)
            };
            B.prototype.set_m_chassisConnectionCS = B.prototype.BB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                dx(c, a)
            };
            Object.defineProperty(B.prototype, "m_chassisConnectionCS", {
                get: B.prototype.Vy,
                set: B.prototype.BB
            });
            B.prototype.get_m_wheelDirectionCS = B.prototype.Ux = function() {
                return n(Zw(this.sx), r)
            };
            B.prototype.set_m_wheelDirectionCS = B.prototype.by = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                kx(c, a)
            };
            Object.defineProperty(B.prototype, "m_wheelDirectionCS", {
                get: B.prototype.Ux,
                set: B.prototype.by
            });
            B.prototype.get_m_wheelAxleCS = B.prototype.Tx = function() {
                return n(Yw(this.sx), r)
            };
            B.prototype.set_m_wheelAxleCS = B.prototype.ay = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                jx(c, a)
            };
            Object.defineProperty(B.prototype, "m_wheelAxleCS", {
                get: B.prototype.Tx,
                set: B.prototype.ay
            });
            B.prototype.get_m_suspensionRestLength = B.prototype.pA = function() {
                return Ww(this.sx)
            };
            B.prototype.set_m_suspensionRestLength = B.prototype.VC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                hx(c, a)
            };
            Object.defineProperty(B.prototype, "m_suspensionRestLength", {
                get: B.prototype.pA,
                set: B.prototype.VC
            });
            B.prototype.get_m_maxSuspensionTravelCm = B.prototype.Ex = function() {
                return Vw(this.sx)
            };
            B.prototype.set_m_maxSuspensionTravelCm = B.prototype.Kx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                gx(c, a)
            };
            Object.defineProperty(B.prototype, "m_maxSuspensionTravelCm", {
                get: B.prototype.Ex,
                set: B.prototype.Kx
            });
            B.prototype.get_m_wheelRadius = B.prototype.DA = function() {
                return $w(this.sx)
            };
            B.prototype.set_m_wheelRadius = B.prototype.iD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                lx(c, a)
            };
            Object.defineProperty(B.prototype, "m_wheelRadius", {
                get: B.prototype.DA,
                set: B.prototype.iD
            });
            B.prototype.get_m_suspensionStiffness = B.prototype.Fx = function() {
                return Xw(this.sx)
            };
            B.prototype.set_m_suspensionStiffness = B.prototype.Lx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ix(c, a)
            };
            Object.defineProperty(B.prototype, "m_suspensionStiffness", {
                get: B.prototype.Fx,
                set: B.prototype.Lx
            });
            B.prototype.get_m_wheelsDampingCompression = B.prototype.Vx = function() {
                return ax(this.sx)
            };
            B.prototype.set_m_wheelsDampingCompression = B.prototype.cy = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                mx(c, a)
            };
            Object.defineProperty(B.prototype, "m_wheelsDampingCompression", {
                get: B.prototype.Vx,
                set: B.prototype.cy
            });
            B.prototype.get_m_wheelsDampingRelaxation = B.prototype.Wx = function() {
                return bx(this.sx)
            };
            B.prototype.set_m_wheelsDampingRelaxation = B.prototype.dy = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                nx(c, a)
            };
            Object.defineProperty(B.prototype, "m_wheelsDampingRelaxation", {
                get: B.prototype.Wx,
                set: B.prototype.dy
            });
            B.prototype.get_m_frictionSlip = B.prototype.Cx = function() {
                return Tw(this.sx)
            };
            B.prototype.set_m_frictionSlip = B.prototype.Ix = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ex(c, a)
            };
            Object.defineProperty(B.prototype, "m_frictionSlip", {
                get: B.prototype.Cx,
                set: B.prototype.Ix
            });
            B.prototype.get_m_maxSuspensionForce = B.prototype.Dx = function() {
                return Uw(this.sx)
            };
            B.prototype.set_m_maxSuspensionForce = B.prototype.Jx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                fx(c, a)
            };
            Object.defineProperty(B.prototype, "m_maxSuspensionForce", {
                get: B.prototype.Dx,
                set: B.prototype.Jx
            });
            B.prototype.get_m_bIsFrontWheel = B.prototype.Px = function() {
                return !!Rw(this.sx)
            };
            B.prototype.set_m_bIsFrontWheel = B.prototype.Xx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                cx(c, a)
            };
            Object.defineProperty(B.prototype, "m_bIsFrontWheel", {
                get: B.prototype.Px,
                set: B.prototype.Xx
            });
            B.prototype.__destroy__ = function() {
                Qw(this.sx)
            };

            function mz(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = void 0 === c ? Gi(a) : Hi(a, c);
                m(mz)[this.sx] = this
            }
            mz.prototype = Object.create(ez.prototype);
            mz.prototype.constructor = mz;
            mz.prototype.tx = mz;
            mz.ux = {};
            g.btConvexTriangleMeshShape = mz;
            mz.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Li(c, a)
            };
            mz.prototype.getLocalScaling = function() {
                return n(Ji(this.sx), r)
            };
            mz.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Ii(d, a, c)
            };
            mz.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mi(c, a)
            };
            mz.prototype.getMargin = function() {
                return Ki(this.sx)
            };
            mz.prototype.__destroy__ = function() {
                Fi(this.sx)
            };

            function Qy() {
                throw "cannot construct a btBroadphaseInterface, no constructor in IDL";
            }
            Qy.prototype = Object.create(k.prototype);
            Qy.prototype.constructor = Qy;
            Qy.prototype.tx = Qy;
            Qy.ux = {};
            g.btBroadphaseInterface = Qy;
            Qy.prototype.__destroy__ = function() {
                cf(this.sx)
            };

            function D(a, c, d, e) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                this.sx = void 0 === e ? yq(a, c, d) : zq(a, c, d, e);
                m(D)[this.sx] = this
            }
            D.prototype = Object.create(k.prototype);
            D.prototype.constructor = D;
            D.prototype.tx = D;
            D.ux = {};
            g.btRigidBodyConstructionInfo = D;
            D.prototype.get_m_linearDamping = D.prototype.Hz = function() {
                return Iq(this.sx)
            };
            D.prototype.set_m_linearDamping = D.prototype.mC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Uq(c, a)
            };
            Object.defineProperty(D.prototype, "m_linearDamping", {
                get: D.prototype.Hz,
                set: D.prototype.mC
            });
            D.prototype.get_m_angularDamping = D.prototype.Ly = function() {
                return Fq(this.sx)
            };
            D.prototype.set_m_angularDamping = D.prototype.rB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Rq(c, a)
            };
            Object.defineProperty(D.prototype, "m_angularDamping", {
                get: D.prototype.Ly,
                set: D.prototype.rB
            });
            D.prototype.get_m_friction = D.prototype.nz = function() {
                return Hq(this.sx)
            };
            D.prototype.set_m_friction = D.prototype.UB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Tq(c, a)
            };
            Object.defineProperty(D.prototype, "m_friction", {
                get: D.prototype.nz,
                set: D.prototype.UB
            });
            D.prototype.get_m_rollingFriction = D.prototype.cA = function() {
                return Lq(this.sx)
            };
            D.prototype.set_m_rollingFriction = D.prototype.IC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xq(c, a)
            };
            Object.defineProperty(D.prototype, "m_rollingFriction", {
                get: D.prototype.cA,
                set: D.prototype.IC
            });
            D.prototype.get_m_restitution = D.prototype.aA = function() {
                return Kq(this.sx)
            };
            D.prototype.set_m_restitution = D.prototype.GC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wq(c, a)
            };
            Object.defineProperty(D.prototype, "m_restitution", {
                get: D.prototype.aA,
                set: D.prototype.GC
            });
            D.prototype.get_m_linearSleepingThreshold = D.prototype.Iz = function() {
                return Jq(this.sx)
            };
            D.prototype.set_m_linearSleepingThreshold = D.prototype.nC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vq(c, a)
            };
            Object.defineProperty(D.prototype, "m_linearSleepingThreshold", {
                get: D.prototype.Iz,
                set: D.prototype.nC
            });
            D.prototype.get_m_angularSleepingThreshold = D.prototype.My = function() {
                return Gq(this.sx)
            };
            D.prototype.set_m_angularSleepingThreshold = D.prototype.sB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Sq(c, a)
            };
            Object.defineProperty(D.prototype, "m_angularSleepingThreshold", {
                get: D.prototype.My,
                set: D.prototype.sB
            });
            D.prototype.get_m_additionalDamping = D.prototype.Gy = function() {
                return !!Dq(this.sx)
            };
            D.prototype.set_m_additionalDamping = D.prototype.mB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Pq(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalDamping", {
                get: D.prototype.Gy,
                set: D.prototype.mB
            });
            D.prototype.get_m_additionalDampingFactor = D.prototype.Hy = function() {
                return Cq(this.sx)
            };
            D.prototype.set_m_additionalDampingFactor = D.prototype.nB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Oq(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalDampingFactor", {
                get: D.prototype.Hy,
                set: D.prototype.nB
            });
            D.prototype.get_m_additionalLinearDampingThresholdSqr = D.prototype.Iy = function() {
                return Eq(this.sx)
            };
            D.prototype.set_m_additionalLinearDampingThresholdSqr = D.prototype.oB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Qq(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalLinearDampingThresholdSqr", {
                get: D.prototype.Iy,
                set: D.prototype.oB
            });
            D.prototype.get_m_additionalAngularDampingThresholdSqr = D.prototype.Fy = function() {
                return Bq(this.sx)
            };
            D.prototype.set_m_additionalAngularDampingThresholdSqr = D.prototype.lB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Nq(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalAngularDampingThresholdSqr", {
                get: D.prototype.Fy,
                set: D.prototype.lB
            });
            D.prototype.get_m_additionalAngularDampingFactor = D.prototype.Ey = function() {
                return Aq(this.sx)
            };
            D.prototype.set_m_additionalAngularDampingFactor = D.prototype.kB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mq(c, a)
            };
            Object.defineProperty(D.prototype, "m_additionalAngularDampingFactor", {
                get: D.prototype.Ey,
                set: D.prototype.kB
            });
            D.prototype.__destroy__ = function() {
                xq(this.sx)
            };

            function nz() {
                throw "cannot construct a btCollisionConfiguration, no constructor in IDL";
            }
            nz.prototype = Object.create(k.prototype);
            nz.prototype.constructor = nz;
            nz.prototype.tx = nz;
            nz.ux = {};
            g.btCollisionConfiguration = nz;
            nz.prototype.__destroy__ = function() {
                Tf(this.sx)
            };

            function fz() {
                this.sx = Oo();
                m(fz)[this.sx] = this
            }
            fz.prototype = Object.create(k.prototype);
            fz.prototype.constructor = fz;
            fz.prototype.tx = fz;
            fz.ux = {};
            g.btPersistentManifold = fz;
            fz.prototype.getBody0 = function() {
                return n(Po(this.sx), t)
            };
            fz.prototype.getBody1 = function() {
                return n(Qo(this.sx), t)
            };
            fz.prototype.getNumContacts = function() {
                return So(this.sx)
            };
            fz.prototype.getContactPoint = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Ro(c, a), E)
            };
            fz.prototype.__destroy__ = function() {
                No(this.sx)
            };

            function oz(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = void 0 === a ? Xg() : Yg(a);
                m(oz)[this.sx] = this
            }
            oz.prototype = Object.create(Sy.prototype);
            oz.prototype.constructor = oz;
            oz.prototype.tx = oz;
            oz.ux = {};
            g.btCompoundShape = oz;
            oz.prototype.addChildShape = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Wg(d, a, c)
            };
            oz.prototype.removeChildShape = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                eh(c, a)
            };
            oz.prototype.removeChildShapeByIndex = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                dh(c, a)
            };
            oz.prototype.getNumChildShapes = function() {
                return ch(this.sx)
            };
            oz.prototype.getChildShape = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n($g(c, a), Sy)
            };
            oz.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                gh(c, a)
            };
            oz.prototype.getMargin = function() {
                return bh(this.sx)
            };
            oz.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                fh(c, a)
            };
            oz.prototype.getLocalScaling = function() {
                return n(ah(this.sx), r)
            };
            oz.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Zg(d, a, c)
            };
            oz.prototype.__destroy__ = function() {
                Vg(this.sx)
            };

            function F(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = pb(a, c);
                m(F)[this.sx] = this
            }
            F.prototype = Object.create(w.prototype);
            F.prototype.constructor = F;
            F.prototype.tx = F;
            F.ux = {};
            g.ClosestConvexResultCallback = F;
            F.prototype.hasHit = function() {
                return !!yb(this.sx)
            };
            F.prototype.get_m_convexFromWorld = F.prototype.az = function() {
                return n(ub(this.sx), r)
            };
            F.prototype.set_m_convexFromWorld = F.prototype.HB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Cb(c, a)
            };
            Object.defineProperty(F.prototype, "m_convexFromWorld", {
                get: F.prototype.az,
                set: F.prototype.HB
            });
            F.prototype.get_m_convexToWorld = F.prototype.bz = function() {
                return n(vb(this.sx), r)
            };
            F.prototype.set_m_convexToWorld = F.prototype.IB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Db(c, a)
            };
            Object.defineProperty(F.prototype, "m_convexToWorld", {
                get: F.prototype.bz,
                set: F.prototype.IB
            });
            F.prototype.get_m_hitNormalWorld = F.prototype.Rx = function() {
                return n(wb(this.sx), r)
            };
            F.prototype.set_m_hitNormalWorld = F.prototype.Zx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Eb(c, a)
            };
            Object.defineProperty(F.prototype, "m_hitNormalWorld", {
                get: F.prototype.Rx,
                set: F.prototype.Zx
            });
            F.prototype.get_m_hitPointWorld = F.prototype.Sx = function() {
                return n(xb(this.sx), r)
            };
            F.prototype.set_m_hitPointWorld = F.prototype.$x = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Fb(c, a)
            };
            Object.defineProperty(F.prototype, "m_hitPointWorld", {
                get: F.prototype.Sx,
                set: F.prototype.$x
            });
            F.prototype.get_m_collisionFilterGroup = F.prototype.wx = function() {
                return sb(this.sx)
            };
            F.prototype.set_m_collisionFilterGroup = F.prototype.yx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ab(c, a)
            };
            Object.defineProperty(F.prototype, "m_collisionFilterGroup", {
                get: F.prototype.wx,
                set: F.prototype.yx
            });
            F.prototype.get_m_collisionFilterMask = F.prototype.xx = function() {
                return tb(this.sx)
            };
            F.prototype.set_m_collisionFilterMask = F.prototype.zx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Bb(c, a)
            };
            Object.defineProperty(F.prototype, "m_collisionFilterMask", {
                get: F.prototype.xx,
                set: F.prototype.zx
            });
            F.prototype.get_m_closestHitFraction = F.prototype.Ax = function() {
                return rb(this.sx)
            };
            F.prototype.set_m_closestHitFraction = F.prototype.Bx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                zb(c, a)
            };
            Object.defineProperty(F.prototype, "m_closestHitFraction", {
                get: F.prototype.Ax,
                set: F.prototype.Bx
            });
            F.prototype.__destroy__ = function() {
                qb(this.sx)
            };

            function pz() {
                throw "cannot construct a tMaterialArray, no constructor in IDL";
            }
            pz.prototype = Object.create(k.prototype);
            pz.prototype.constructor = pz;
            pz.prototype.tx = pz;
            pz.ux = {};
            g.tMaterialArray = pz;
            pz.prototype.size = pz.prototype.size = function() {
                return vy(this.sx)
            };
            pz.prototype.at = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(uy(c, a), A)
            };
            pz.prototype.__destroy__ = function() {
                ty(this.sx)
            };

            function qz(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = zj(a);
                m(qz)[this.sx] = this
            }
            qz.prototype = Object.create(bz.prototype);
            qz.prototype.constructor = qz;
            qz.prototype.tx = qz;
            qz.ux = {};
            g.btDefaultVehicleRaycaster = qz;
            qz.prototype.castRay = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Aj(e, a, c, d)
            };
            qz.prototype.__destroy__ = function() {
                yj(this.sx)
            };

            function G() {
                this.sx = Rh();
                m(G)[this.sx] = this
            }
            G.prototype = Object.create(k.prototype);
            G.prototype.constructor = G;
            G.prototype.tx = G;
            G.ux = {};
            g.btConstraintSetting = G;
            G.prototype.get_m_tau = G.prototype.rA = function() {
                return Uh(this.sx)
            };
            G.prototype.set_m_tau = G.prototype.XC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xh(c, a)
            };
            Object.defineProperty(G.prototype, "m_tau", {
                get: G.prototype.rA,
                set: G.prototype.XC
            });
            G.prototype.get_m_damping = G.prototype.cz = function() {
                return Sh(this.sx)
            };
            G.prototype.set_m_damping = G.prototype.JB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vh(c, a)
            };
            Object.defineProperty(G.prototype, "m_damping", {
                get: G.prototype.cz,
                set: G.prototype.JB
            });
            G.prototype.get_m_impulseClamp = G.prototype.Az = function() {
                return Th(this.sx)
            };
            G.prototype.set_m_impulseClamp = G.prototype.fC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wh(c, a)
            };
            Object.defineProperty(G.prototype, "m_impulseClamp", {
                get: G.prototype.Az,
                set: G.prototype.fC
            });
            G.prototype.__destroy__ = function() {
                Qh(this.sx)
            };

            function rz() {
                throw "cannot construct a LocalShapeInfo, no constructor in IDL";
            }
            rz.prototype = Object.create(k.prototype);
            rz.prototype.constructor = rz;
            rz.prototype.tx = rz;
            rz.ux = {};
            g.LocalShapeInfo = rz;
            rz.prototype.get_m_shapePart = rz.prototype.fA = function() {
                return Md(this.sx)
            };
            rz.prototype.set_m_shapePart = rz.prototype.LC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Od(c, a)
            };
            Object.defineProperty(rz.prototype, "m_shapePart", {
                get: rz.prototype.fA,
                set: rz.prototype.LC
            });
            rz.prototype.get_m_triangleIndex = rz.prototype.uA = function() {
                return Nd(this.sx)
            };
            rz.prototype.set_m_triangleIndex = rz.prototype.$C = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Pd(c, a)
            };
            Object.defineProperty(rz.prototype, "m_triangleIndex", {
                get: rz.prototype.uA,
                set: rz.prototype.$C
            });
            rz.prototype.__destroy__ = function() {
                Ld(this.sx)
            };

            function H(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = jr(a);
                m(H)[this.sx] = this
            }
            H.prototype = Object.create(t.prototype);
            H.prototype.constructor = H;
            H.prototype.tx = H;
            H.ux = {};
            g.btRigidBody = H;
            H.prototype.getCenterOfMassTransform = function() {
                return n(or(this.sx), u)
            };
            H.prototype.setCenterOfMassTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Hr(c, a)
            };
            H.prototype.setSleepingThresholds = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Ur(d, a, c)
            };
            H.prototype.setDamping = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Lr(d, a, c)
            };
            H.prototype.setMassProps = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Qr(d, a, c)
            };
            H.prototype.setLinearFactor = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Or(c, a)
            };
            H.prototype.applyTorque = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ir(c, a)
            };
            H.prototype.applyLocalTorque = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                gr(c, a)
            };
            H.prototype.applyForce = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                dr(d, a, c)
            };
            H.prototype.applyCentralForce = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ar(c, a)
            };
            H.prototype.applyCentralLocalForce = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                cr(c, a)
            };
            H.prototype.applyTorqueImpulse = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                hr(c, a)
            };
            H.prototype.applyImpulse = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                fr(d, a, c)
            };
            H.prototype.applyCentralImpulse = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                br(c, a)
            };
            H.prototype.updateInertiaTensor = function() {
                Zr(this.sx)
            };
            H.prototype.getLinearVelocity = function() {
                return n(sr(this.sx), r)
            };
            H.prototype.getAngularVelocity = function() {
                return n(mr(this.sx), r)
            };
            H.prototype.setLinearVelocity = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Pr(c, a)
            };
            H.prototype.setAngularVelocity = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Dr(c, a)
            };
            H.prototype.getMotionState = function() {
                return n(tr(this.sx), iz)
            };
            H.prototype.setMotionState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Rr(c, a)
            };
            H.prototype.setAngularFactor = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Cr(c, a)
            };
            H.prototype.upcast = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Yr(c, a), H)
            };
            H.prototype.getAabb = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                lr(d, a, c)
            };
            H.prototype.applyGravity = function() {
                er(this.sx)
            };
            H.prototype.getGravity = function() {
                return n(rr(this.sx), r)
            };
            H.prototype.setGravity = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Nr(c, a)
            };
            H.prototype.getBroadphaseProxy = function() {
                return n(nr(this.sx), sz)
            };
            H.prototype.setAnisotropicFriction = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Er(d, a, c)
            };
            H.prototype.getCollisionShape = function() {
                return n(qr(this.sx), Sy)
            };
            H.prototype.setContactProcessingThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Kr(c, a)
            };
            H.prototype.setActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Br(c, a)
            };
            H.prototype.forceActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                kr(c, a)
            };
            H.prototype.activate = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                void 0 === a ? Zq(c) : $q(c, a)
            };
            H.prototype.isActive = function() {
                return !!xr(this.sx)
            };
            H.prototype.isKinematicObject = function() {
                return !!yr(this.sx)
            };
            H.prototype.isStaticObject = function() {
                return !!zr(this.sx)
            };
            H.prototype.isStaticOrKinematicObject = function() {
                return !!Ar(this.sx)
            };
            H.prototype.setRestitution = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Sr(c, a)
            };
            H.prototype.setFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mr(c, a)
            };
            H.prototype.setRollingFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Tr(c, a)
            };
            H.prototype.getWorldTransform = function() {
                return n(wr(this.sx), u)
            };
            H.prototype.getCollisionFlags = function() {
                return pr(this.sx)
            };
            H.prototype.setCollisionFlags = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ir(c, a)
            };
            H.prototype.setWorldTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xr(c, a)
            };
            H.prototype.setCollisionShape = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Jr(c, a)
            };
            H.prototype.setCcdMotionThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Fr(c, a)
            };
            H.prototype.setCcdSweptSphereRadius = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Gr(c, a)
            };
            H.prototype.getUserIndex = function() {
                return ur(this.sx)
            };
            H.prototype.setUserIndex = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vr(c, a)
            };
            H.prototype.getUserPointer = function() {
                return n(vr(this.sx), Ty)
            };
            H.prototype.setUserPointer = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wr(c, a)
            };
            H.prototype.__destroy__ = function() {
                Yq(this.sx)
            };

            function tz() {
                throw "cannot construct a btConvexPolyhedron, no constructor in IDL";
            }
            tz.prototype = Object.create(k.prototype);
            tz.prototype.constructor = tz;
            tz.prototype.tx = tz;
            tz.ux = {};
            g.btConvexPolyhedron = tz;
            tz.prototype.get_m_vertices = tz.prototype.AA = function() {
                return n(wi(this.sx), uz)
            };
            tz.prototype.set_m_vertices = tz.prototype.fD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                yi(c, a)
            };
            Object.defineProperty(tz.prototype, "m_vertices", {
                get: tz.prototype.AA,
                set: tz.prototype.fD
            });
            tz.prototype.get_m_faces = tz.prototype.lz = function() {
                return n(vi(this.sx), vz)
            };
            tz.prototype.set_m_faces = tz.prototype.SB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                xi(c, a)
            };
            Object.defineProperty(tz.prototype, "m_faces", {
                get: tz.prototype.lz,
                set: tz.prototype.SB
            });
            tz.prototype.__destroy__ = function() {
                ui(this.sx)
            };

            function wz() {
                this.sx = ij();
                m(wz)[this.sx] = this
            }
            wz.prototype = Object.create(k.prototype);
            wz.prototype.constructor = wz;
            wz.prototype.tx = wz;
            wz.ux = {};
            g.btDbvtBroadphase = wz;
            wz.prototype.__destroy__ = function() {
                hj(this.sx)
            };

            function xz(a, c, d, e, f, l, q, C, J) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                l && "object" === typeof l && (l = l.sx);
                q && "object" === typeof q && (q = q.sx);
                C && "object" === typeof C && (C = C.sx);
                J && "object" === typeof J && (J = J.sx);
                this.sx = Dm(a, c, d, e, f, l, q, C, J);
                m(xz)[this.sx] = this
            }
            xz.prototype = Object.create(Wy.prototype);
            xz.prototype.constructor = xz;
            xz.prototype.tx = xz;
            xz.ux = {};
            g.btHeightfieldTerrainShape = xz;
            xz.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Im(c, a)
            };
            xz.prototype.getMargin = function() {
                return Gm(this.sx)
            };
            xz.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Hm(c, a)
            };
            xz.prototype.getLocalScaling = function() {
                return n(Fm(this.sx), r)
            };
            xz.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Em(d, a, c)
            };
            xz.prototype.__destroy__ = function() {
                Cm(this.sx)
            };

            function yz() {
                this.sx = xj();
                m(yz)[this.sx] = this
            }
            yz.prototype = Object.create(kz.prototype);
            yz.prototype.constructor = yz;
            yz.prototype.tx = yz;
            yz.ux = {};
            g.btDefaultSoftBodySolver = yz;
            yz.prototype.__destroy__ = function() {
                wj(this.sx)
            };

            function zz(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = Vf(a);
                m(zz)[this.sx] = this
            }
            zz.prototype = Object.create(Oy.prototype);
            zz.prototype.constructor = zz;
            zz.prototype.tx = zz;
            zz.ux = {};
            g.btCollisionDispatcher = zz;
            zz.prototype.getNumManifolds = function() {
                return Xf(this.sx)
            };
            zz.prototype.getManifoldByIndexInternal = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Wf(c, a), fz)
            };
            zz.prototype.__destroy__ = function() {
                Uf(this.sx)
            };

            function Az(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                this.sx = void 0 === d ? Se(a, c) : void 0 === e ? Te(a, c, d) : void 0 === f ? Ue(a, c, d, e) : Ve(a, c, d, e, f);
                m(Az)[this.sx] = this
            }
            Az.prototype = Object.create(k.prototype);
            Az.prototype.constructor = Az;
            Az.prototype.tx = Az;
            Az.ux = {};
            g.btAxisSweep3 = Az;
            Az.prototype.__destroy__ = function() {
                Re(this.sx)
            };

            function I() {
                this.sx = Ls();
                m(I)[this.sx] = this
            }
            I.prototype = Object.create(k.prototype);
            I.prototype.constructor = I;
            I.prototype.tx = I;
            I.ux = {};
            g.btSoftBodyWorldInfo = I;
            I.prototype.get_air_density = I.prototype.iy = function() {
                return Ms(this.sx)
            };
            I.prototype.set_air_density = I.prototype.PA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Us(c, a)
            };
            Object.defineProperty(I.prototype, "air_density", {
                get: I.prototype.iy,
                set: I.prototype.PA
            });
            I.prototype.get_water_density = I.prototype.MA = function() {
                return Rs(this.sx)
            };
            I.prototype.set_water_density = I.prototype.rD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zs(c, a)
            };
            Object.defineProperty(I.prototype, "water_density", {
                get: I.prototype.MA,
                set: I.prototype.rD
            });
            I.prototype.get_water_offset = I.prototype.OA = function() {
                return Ts(this.sx)
            };
            I.prototype.set_water_offset = I.prototype.tD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                at(c, a)
            };
            Object.defineProperty(I.prototype, "water_offset", {
                get: I.prototype.OA,
                set: I.prototype.tD
            });
            I.prototype.get_m_maxDisplacement = I.prototype.Oz = function() {
                return Qs(this.sx)
            };
            I.prototype.set_m_maxDisplacement = I.prototype.tC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ys(c, a)
            };
            Object.defineProperty(I.prototype, "m_maxDisplacement", {
                get: I.prototype.Oz,
                set: I.prototype.tC
            });
            I.prototype.get_water_normal = I.prototype.NA = function() {
                return n(Ss(this.sx), r)
            };
            I.prototype.set_water_normal = I.prototype.sD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                $s(c, a)
            };
            Object.defineProperty(I.prototype, "water_normal", {
                get: I.prototype.NA,
                set: I.prototype.sD
            });
            I.prototype.get_m_broadphase = I.prototype.Qy = function() {
                return n(Ns(this.sx), Qy)
            };
            I.prototype.set_m_broadphase = I.prototype.wB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vs(c, a)
            };
            Object.defineProperty(I.prototype, "m_broadphase", {
                get: I.prototype.Qy,
                set: I.prototype.wB
            });
            I.prototype.get_m_dispatcher = I.prototype.fz = function() {
                return n(Os(this.sx), Oy)
            };
            I.prototype.set_m_dispatcher = I.prototype.MB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ws(c, a)
            };
            Object.defineProperty(I.prototype, "m_dispatcher", {
                get: I.prototype.fz,
                set: I.prototype.MB
            });
            I.prototype.get_m_gravity = I.prototype.pz = function() {
                return n(Ps(this.sx), r)
            };
            I.prototype.set_m_gravity = I.prototype.WB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xs(c, a)
            };
            Object.defineProperty(I.prototype, "m_gravity", {
                get: I.prototype.pz,
                set: I.prototype.WB
            });
            I.prototype.__destroy__ = function() {
                Ks(this.sx)
            };

            function Bz(a, c, d, e) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                this.sx = void 0 === d ? Bh(a, c) : void 0 === e ? _emscripten_bind_btConeTwistConstraint_btConeTwistConstraint_3(a, c, d) : Ch(a, c, d, e);
                m(Bz)[this.sx] = this
            }
            Bz.prototype = Object.create(Vy.prototype);
            Bz.prototype.constructor = Bz;
            Bz.prototype.tx = Bz;
            Bz.ux = {};
            g.btConeTwistConstraint = Bz;
            Bz.prototype.setLimit = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Kh(d, a, c)
            };
            Bz.prototype.setAngularOnly = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Hh(c, a)
            };
            Bz.prototype.setDamping = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Jh(c, a)
            };
            Bz.prototype.enableMotor = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Eh(c, a)
            };
            Bz.prototype.setMaxMotorImpulse = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mh(c, a)
            };
            Bz.prototype.setMaxMotorImpulseNormalized = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Lh(c, a)
            };
            Bz.prototype.setMotorTarget = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Oh(c, a)
            };
            Bz.prototype.setMotorTargetInConstraintSpace = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Nh(c, a)
            };
            Bz.prototype.enableFeedback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Dh(c, a)
            };
            Bz.prototype.getBreakingImpulseThreshold = function() {
                return Fh(this.sx)
            };
            Bz.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ih(c, a)
            };
            Bz.prototype.getParam = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return Gh(d, a, c)
            };
            Bz.prototype.setParam = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Ph(e, a, c, d)
            };
            Bz.prototype.__destroy__ = function() {
                Ah(this.sx)
            };

            function Cz(a, c, d, e, f, l, q) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                l && "object" === typeof l && (l = l.sx);
                q && "object" === typeof q && (q = q.sx);
                this.sx = void 0 === d ? Km(a, c) : void 0 === e ? Lm(a, c, d) : void 0 === f ? Mm(a, c, d, e) : void 0 === l ? Nm(a, c, d, e, f) : void 0 === q ? Om(a, c, d, e, f, l) : Pm(a, c, d, e, f, l, q);
                m(Cz)[this.sx] = this
            }
            Cz.prototype = Object.create(Vy.prototype);
            Cz.prototype.constructor = Cz;
            Cz.prototype.tx = Cz;
            Cz.ux = {};
            g.btHingeConstraint = Cz;
            Cz.prototype.setLimit = function(a, c, d, e, f) {
                var l = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                void 0 === f ? Xm(l, a, c, d, e) : Ym(l, a, c, d, e, f)
            };
            Cz.prototype.enableAngularMotor = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Qm(e, a, c, d)
            };
            Cz.prototype.setAngularOnly = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vm(c, a)
            };
            Cz.prototype.enableMotor = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Sm(c, a)
            };
            Cz.prototype.setMaxMotorImpulse = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zm(c, a)
            };
            Cz.prototype.setMotorTarget = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                $m(d, a, c)
            };
            Cz.prototype.enableFeedback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Rm(c, a)
            };
            Cz.prototype.getBreakingImpulseThreshold = function() {
                return Tm(this.sx)
            };
            Cz.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wm(c, a)
            };
            Cz.prototype.getParam = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return Um(d, a, c)
            };
            Cz.prototype.setParam = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                an(e, a, c, d)
            };
            Cz.prototype.__destroy__ = function() {
                Jm(this.sx)
            };

            function Dz(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = rh(a, c);
                m(Dz)[this.sx] = this
            }
            Dz.prototype = Object.create($y.prototype);
            Dz.prototype.constructor = Dz;
            Dz.prototype.tx = Dz;
            Dz.ux = {};
            g.btConeShapeZ = Dz;
            Dz.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                uh(c, a)
            };
            Dz.prototype.getLocalScaling = function() {
                return n(th(this.sx), r)
            };
            Dz.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                sh(d, a, c)
            };
            Dz.prototype.__destroy__ = function() {
                qh(this.sx)
            };

            function Ez(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = mh(a, c);
                m(Ez)[this.sx] = this
            }
            Ez.prototype = Object.create($y.prototype);
            Ez.prototype.constructor = Ez;
            Ez.prototype.tx = Ez;
            Ez.ux = {};
            g.btConeShapeX = Ez;
            Ez.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ph(c, a)
            };
            Ez.prototype.getLocalScaling = function() {
                return n(oh(this.sx), r)
            };
            Ez.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                nh(d, a, c)
            };
            Ez.prototype.__destroy__ = function() {
                lh(this.sx)
            };

            function Fz(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = void 0 === a ? zv() : void 0 === c ? Av(a) : Bv(a, c);
                m(Fz)[this.sx] = this
            }
            Fz.prototype = Object.create(hz.prototype);
            Fz.prototype.constructor = Fz;
            Fz.prototype.tx = Fz;
            Fz.ux = {};
            g.btTriangleMesh = Fz;
            Fz.prototype.addTriangle = function(a, c, d, e) {
                var f = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                void 0 === e ? xv(f, a, c, d) : yv(f, a, c, d, e)
            };
            Fz.prototype.setScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Cv(c, a)
            };
            Fz.prototype.__destroy__ = function() {
                wv(this.sx)
            };

            function Gz(a, c) {
                b.vx();
                "object" == typeof a && (a = My(a));
                c && "object" === typeof c && (c = c.sx);
                this.sx = void 0 === a ? ii() : void 0 === c ? ji(a) : ki(a, c);
                m(Gz)[this.sx] = this
            }
            Gz.prototype = Object.create(Sy.prototype);
            Gz.prototype.constructor = Gz;
            Gz.prototype.tx = Gz;
            Gz.ux = {};
            g.btConvexHullShape = Gz;
            Gz.prototype.addPoint = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                void 0 === c ? gi(d, a) : hi(d, a, c)
            };
            Gz.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ti(c, a)
            };
            Gz.prototype.getMargin = function() {
                return oi(this.sx)
            };
            Gz.prototype.getNumVertices = function() {
                return pi(this.sx)
            };
            Gz.prototype.initializePolyhedralFeatures = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return !!qi(c, a)
            };
            Gz.prototype.recalcLocalAabb = function() {
                ri(this.sx)
            };
            Gz.prototype.getConvexPolyhedron = function() {
                return n(mi(this.sx), tz)
            };
            Gz.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                si(c, a)
            };
            Gz.prototype.getLocalScaling = function() {
                return n(ni(this.sx), r)
            };
            Gz.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                li(d, a, c)
            };
            Gz.prototype.__destroy__ = function() {
                fi(this.sx)
            };

            function K() {
                this.sx = Dw();
                m(K)[this.sx] = this
            }
            K.prototype = Object.create(k.prototype);
            K.prototype.constructor = K;
            K.prototype.tx = K;
            K.ux = {};
            g.btVehicleTuning = K;
            K.prototype.get_m_suspensionStiffness = K.prototype.Fx = function() {
                return Jw(this.sx)
            };
            K.prototype.set_m_suspensionStiffness = K.prototype.Lx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Pw(c, a)
            };
            Object.defineProperty(K.prototype, "m_suspensionStiffness", {
                get: K.prototype.Fx,
                set: K.prototype.Lx
            });
            K.prototype.get_m_suspensionCompression = K.prototype.lA = function() {
                return Hw(this.sx)
            };
            K.prototype.set_m_suspensionCompression = K.prototype.RC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Nw(c, a)
            };
            Object.defineProperty(K.prototype, "m_suspensionCompression", {
                get: K.prototype.lA,
                set: K.prototype.RC
            });
            K.prototype.get_m_suspensionDamping = K.prototype.mA = function() {
                return Iw(this.sx)
            };
            K.prototype.set_m_suspensionDamping = K.prototype.SC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ow(c, a)
            };
            Object.defineProperty(K.prototype, "m_suspensionDamping", {
                get: K.prototype.mA,
                set: K.prototype.SC
            });
            K.prototype.get_m_maxSuspensionTravelCm = K.prototype.Ex = function() {
                return Gw(this.sx)
            };
            K.prototype.set_m_maxSuspensionTravelCm = K.prototype.Kx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mw(c, a)
            };
            Object.defineProperty(K.prototype, "m_maxSuspensionTravelCm", {
                get: K.prototype.Ex,
                set: K.prototype.Kx
            });
            K.prototype.get_m_frictionSlip = K.prototype.Cx = function() {
                return Ew(this.sx)
            };
            K.prototype.set_m_frictionSlip = K.prototype.Ix = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Kw(c, a)
            };
            Object.defineProperty(K.prototype, "m_frictionSlip", {
                get: K.prototype.Cx,
                set: K.prototype.Ix
            });
            K.prototype.get_m_maxSuspensionForce = K.prototype.Dx = function() {
                return Fw(this.sx)
            };
            K.prototype.set_m_maxSuspensionForce = K.prototype.Jx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Lw(c, a)
            };
            Object.defineProperty(K.prototype, "m_maxSuspensionForce", {
                get: K.prototype.Dx,
                set: K.prototype.Jx
            });

            function Hz() {
                throw "cannot construct a btCollisionObjectWrapper, no constructor in IDL";
            }
            Hz.prototype = Object.create(k.prototype);
            Hz.prototype.constructor = Hz;
            Hz.prototype.tx = Hz;
            Hz.ux = {};
            g.btCollisionObjectWrapper = Hz;

            function Iz(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = cs(a);
                m(Iz)[this.sx] = this
            }
            Iz.prototype = Object.create(k.prototype);
            Iz.prototype.constructor = Iz;
            Iz.prototype.tx = Iz;
            Iz.ux = {};
            g.btShapeHull = Iz;
            Iz.prototype.buildHull = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return !!ds(c, a)
            };
            Iz.prototype.numVertices = function() {
                return gs(this.sx)
            };
            Iz.prototype.getVertexPointer = function() {
                return n(es(this.sx), r)
            };
            Iz.prototype.__destroy__ = function() {
                bs(this.sx)
            };

            function Jz(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = void 0 === a ? pj() : void 0 === c ? qj(a) : rj(a, c);
                m(Jz)[this.sx] = this
            }
            Jz.prototype = Object.create(iz.prototype);
            Jz.prototype.constructor = Jz;
            Jz.prototype.tx = Jz;
            Jz.ux = {};
            g.btDefaultMotionState = Jz;
            Jz.prototype.getWorldTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                sj(c, a)
            };
            Jz.prototype.setWorldTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                uj(c, a)
            };
            Jz.prototype.get_m_graphicsWorldTrans = Jz.prototype.oz = function() {
                return n(tj(this.sx), u)
            };
            Jz.prototype.set_m_graphicsWorldTrans = Jz.prototype.VB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                vj(c, a)
            };
            Object.defineProperty(Jz.prototype, "m_graphicsWorldTrans", {
                get: Jz.prototype.oz,
                set: Jz.prototype.VB
            });
            Jz.prototype.__destroy__ = function() {
                oj(this.sx)
            };

            function L(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = px(a);
                m(L)[this.sx] = this
            }
            L.prototype = Object.create(k.prototype);
            L.prototype.constructor = L;
            L.prototype.tx = L;
            L.ux = {};
            g.btWheelInfo = L;
            L.prototype.getSuspensionRestLength = function() {
                return qx(this.sx)
            };
            L.prototype.updateWheel = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                my(d, a, c)
            };
            L.prototype.get_m_suspensionStiffness = L.prototype.Fx = function() {
                return Hx(this.sx)
            };
            L.prototype.set_m_suspensionStiffness = L.prototype.Lx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ey(c, a)
            };
            Object.defineProperty(L.prototype, "m_suspensionStiffness", {
                get: L.prototype.Fx,
                set: L.prototype.Lx
            });
            L.prototype.get_m_frictionSlip = L.prototype.Cx = function() {
                return xx(this.sx)
            };
            L.prototype.set_m_frictionSlip = L.prototype.Ix = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vx(c, a)
            };
            Object.defineProperty(L.prototype, "m_frictionSlip", {
                get: L.prototype.Cx,
                set: L.prototype.Ix
            });
            L.prototype.get_m_engineForce = L.prototype.jz = function() {
                return wx(this.sx)
            };
            L.prototype.set_m_engineForce = L.prototype.QB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ux(c, a)
            };
            Object.defineProperty(L.prototype, "m_engineForce", {
                get: L.prototype.jz,
                set: L.prototype.QB
            });
            L.prototype.get_m_rollInfluence = L.prototype.bA = function() {
                return Bx(this.sx)
            };
            L.prototype.set_m_rollInfluence = L.prototype.HC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zx(c, a)
            };
            Object.defineProperty(L.prototype, "m_rollInfluence", {
                get: L.prototype.bA,
                set: L.prototype.HC
            });
            L.prototype.get_m_suspensionRestLength1 = L.prototype.qA = function() {
                return Gx(this.sx)
            };
            L.prototype.set_m_suspensionRestLength1 = L.prototype.WC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                dy(c, a)
            };
            Object.defineProperty(L.prototype, "m_suspensionRestLength1", {
                get: L.prototype.qA,
                set: L.prototype.WC
            });
            L.prototype.get_m_wheelsRadius = L.prototype.EA = function() {
                return Mx(this.sx)
            };
            L.prototype.set_m_wheelsRadius = L.prototype.jD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                jy(c, a)
            };
            Object.defineProperty(L.prototype, "m_wheelsRadius", {
                get: L.prototype.EA,
                set: L.prototype.jD
            });
            L.prototype.get_m_wheelsDampingCompression = L.prototype.Vx = function() {
                return Kx(this.sx)
            };
            L.prototype.set_m_wheelsDampingCompression = L.prototype.cy = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                hy(c, a)
            };
            Object.defineProperty(L.prototype, "m_wheelsDampingCompression", {
                get: L.prototype.Vx,
                set: L.prototype.cy
            });
            L.prototype.get_m_wheelsDampingRelaxation = L.prototype.Wx = function() {
                return Lx(this.sx)
            };
            L.prototype.set_m_wheelsDampingRelaxation = L.prototype.dy = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                iy(c, a)
            };
            Object.defineProperty(L.prototype, "m_wheelsDampingRelaxation", {
                get: L.prototype.Wx,
                set: L.prototype.dy
            });
            L.prototype.get_m_steering = L.prototype.jA = function() {
                return Ex(this.sx)
            };
            L.prototype.set_m_steering = L.prototype.PC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                by(c, a)
            };
            Object.defineProperty(L.prototype, "m_steering", {
                get: L.prototype.jA,
                set: L.prototype.PC
            });
            L.prototype.get_m_maxSuspensionForce = L.prototype.Dx = function() {
                return yx(this.sx)
            };
            L.prototype.set_m_maxSuspensionForce = L.prototype.Jx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wx(c, a)
            };
            Object.defineProperty(L.prototype, "m_maxSuspensionForce", {
                get: L.prototype.Dx,
                set: L.prototype.Jx
            });
            L.prototype.get_m_maxSuspensionTravelCm = L.prototype.Ex = function() {
                return zx(this.sx)
            };
            L.prototype.set_m_maxSuspensionTravelCm = L.prototype.Kx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xx(c, a)
            };
            Object.defineProperty(L.prototype, "m_maxSuspensionTravelCm", {
                get: L.prototype.Ex,
                set: L.prototype.Kx
            });
            L.prototype.get_m_wheelsSuspensionForce = L.prototype.FA = function() {
                return Nx(this.sx)
            };
            L.prototype.set_m_wheelsSuspensionForce = L.prototype.kD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ky(c, a)
            };
            Object.defineProperty(L.prototype, "m_wheelsSuspensionForce", {
                get: L.prototype.FA,
                set: L.prototype.kD
            });
            L.prototype.get_m_bIsFrontWheel = L.prototype.Px = function() {
                return !!rx(this.sx)
            };
            L.prototype.set_m_bIsFrontWheel = L.prototype.Xx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Px(c, a)
            };
            Object.defineProperty(L.prototype, "m_bIsFrontWheel", {
                get: L.prototype.Px,
                set: L.prototype.Xx
            });
            L.prototype.get_m_raycastInfo = L.prototype.$z = function() {
                return n(Ax(this.sx), M)
            };
            L.prototype.set_m_raycastInfo = L.prototype.FC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Yx(c, a)
            };
            Object.defineProperty(L.prototype, "m_raycastInfo", {
                get: L.prototype.$z,
                set: L.prototype.FC
            });
            L.prototype.get_m_chassisConnectionPointCS = L.prototype.Wy = function() {
                return n(tx(this.sx), r)
            };
            L.prototype.set_m_chassisConnectionPointCS = L.prototype.CB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Rx(c, a)
            };
            Object.defineProperty(L.prototype, "m_chassisConnectionPointCS", {
                get: L.prototype.Wy,
                set: L.prototype.CB
            });
            L.prototype.get_m_worldTransform = L.prototype.GA = function() {
                return n(Ox(this.sx), u)
            };
            L.prototype.set_m_worldTransform = L.prototype.lD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ly(c, a)
            };
            Object.defineProperty(L.prototype, "m_worldTransform", {
                get: L.prototype.GA,
                set: L.prototype.lD
            });
            L.prototype.get_m_wheelDirectionCS = L.prototype.Ux = function() {
                return n(Jx(this.sx), r)
            };
            L.prototype.set_m_wheelDirectionCS = L.prototype.by = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                gy(c, a)
            };
            Object.defineProperty(L.prototype, "m_wheelDirectionCS", {
                get: L.prototype.Ux,
                set: L.prototype.by
            });
            L.prototype.get_m_wheelAxleCS = L.prototype.Tx = function() {
                return n(Ix(this.sx), r)
            };
            L.prototype.set_m_wheelAxleCS = L.prototype.ay = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                fy(c, a)
            };
            Object.defineProperty(L.prototype, "m_wheelAxleCS", {
                get: L.prototype.Tx,
                set: L.prototype.ay
            });
            L.prototype.get_m_rotation = L.prototype.dA = function() {
                return Cx(this.sx)
            };
            L.prototype.set_m_rotation = L.prototype.JC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                $x(c, a)
            };
            Object.defineProperty(L.prototype, "m_rotation", {
                get: L.prototype.dA,
                set: L.prototype.JC
            });
            L.prototype.get_m_deltaRotation = L.prototype.dz = function() {
                return vx(this.sx)
            };
            L.prototype.set_m_deltaRotation = L.prototype.KB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Tx(c, a)
            };
            Object.defineProperty(L.prototype, "m_deltaRotation", {
                get: L.prototype.dz,
                set: L.prototype.KB
            });
            L.prototype.get_m_brake = L.prototype.Py = function() {
                return sx(this.sx)
            };
            L.prototype.set_m_brake = L.prototype.vB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Qx(c, a)
            };
            Object.defineProperty(L.prototype, "m_brake", {
                get: L.prototype.Py,
                set: L.prototype.vB
            });
            L.prototype.get_m_clippedInvContactDotSuspension = L.prototype.Xy = function() {
                return ux(this.sx)
            };
            L.prototype.set_m_clippedInvContactDotSuspension = L.prototype.DB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Sx(c, a)
            };
            Object.defineProperty(L.prototype, "m_clippedInvContactDotSuspension", {
                get: L.prototype.Xy,
                set: L.prototype.DB
            });
            L.prototype.get_m_suspensionRelativeVelocity = L.prototype.oA = function() {
                return Fx(this.sx)
            };
            L.prototype.set_m_suspensionRelativeVelocity = L.prototype.UC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                cy(c, a)
            };
            Object.defineProperty(L.prototype, "m_suspensionRelativeVelocity", {
                get: L.prototype.oA,
                set: L.prototype.UC
            });
            L.prototype.get_m_skidInfo = L.prototype.gA = function() {
                return Dx(this.sx)
            };
            L.prototype.set_m_skidInfo = L.prototype.MC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ay(c, a)
            };
            Object.defineProperty(L.prototype, "m_skidInfo", {
                get: L.prototype.gA,
                set: L.prototype.MC
            });
            L.prototype.__destroy__ = function() {
                ox(this.sx)
            };

            function N(a, c, d, e) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                this.sx = void 0 === a ? dw() : void 0 === c ? _emscripten_bind_btVector4_btVector4_1(a) : void 0 === d ? _emscripten_bind_btVector4_btVector4_2(a, c) : void 0 === e ? _emscripten_bind_btVector4_btVector4_3(a, c, d) : ew(a, c, d, e);
                m(N)[this.sx] = this
            }
            N.prototype = Object.create(r.prototype);
            N.prototype.constructor = N;
            N.prototype.tx = N;
            N.ux = {};
            g.btVector4 = N;
            N.prototype.w = N.prototype.fy = function() {
                return qw(this.sx)
            };
            N.prototype.setValue = function(a, c, d, e) {
                var f = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                mw(f, a, c, d, e)
            };
            N.prototype.length = N.prototype.length = function() {
                return gw(this.sx)
            };
            N.prototype.x = N.prototype.x = function() {
                return rw(this.sx)
            };
            N.prototype.y = N.prototype.y = function() {
                return sw(this.sx)
            };
            N.prototype.z = N.prototype.z = function() {
                return tw(this.sx)
            };
            N.prototype.setX = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                nw(c, a)
            };
            N.prototype.setY = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ow(c, a)
            };
            N.prototype.setZ = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                pw(c, a)
            };
            N.prototype.normalize = N.prototype.normalize = function() {
                hw(this.sx)
            };
            N.prototype.rotate = N.prototype.rotate = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return n(lw(d, a, c), r)
            };
            N.prototype.dot = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return fw(c, a)
            };
            N.prototype.op_mul = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(jw(c, a), r)
            };
            N.prototype.op_add = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(iw(c, a), r)
            };
            N.prototype.op_sub = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(kw(c, a), r)
            };
            N.prototype.__destroy__ = function() {
                cw(this.sx)
            };

            function Kz() {
                this.sx = nj();
                m(Kz)[this.sx] = this
            }
            Kz.prototype = Object.create(k.prototype);
            Kz.prototype.constructor = Kz;
            Kz.prototype.tx = Kz;
            Kz.ux = {};
            g.btDefaultCollisionConstructionInfo = Kz;
            Kz.prototype.__destroy__ = function() {
                mj(this.sx)
            };

            function O() {
                throw "cannot construct a Anchor, no constructor in IDL";
            }
            O.prototype = Object.create(k.prototype);
            O.prototype.constructor = O;
            O.prototype.tx = O;
            O.ux = {};
            g.Anchor = O;
            O.prototype.get_m_node = O.prototype.Qz = function() {
                return n(eb(this.sx), Node)
            };
            O.prototype.set_m_node = O.prototype.vC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ob(c, a)
            };
            Object.defineProperty(O.prototype, "m_node", {
                get: O.prototype.Qz,
                set: O.prototype.vC
            });
            O.prototype.get_m_local = O.prototype.Jz = function() {
                return n(db(this.sx), r)
            };
            O.prototype.set_m_local = O.prototype.oC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                nb(c, a)
            };
            Object.defineProperty(O.prototype, "m_local", {
                get: O.prototype.Jz,
                set: O.prototype.oC
            });
            O.prototype.get_m_body = O.prototype.Oy = function() {
                return n(Za(this.sx), H)
            };
            O.prototype.set_m_body = O.prototype.uB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ib(c, a)
            };
            Object.defineProperty(O.prototype, "m_body", {
                get: O.prototype.Oy,
                set: O.prototype.uB
            });
            O.prototype.get_m_influence = O.prototype.Cz = function() {
                return cb(this.sx)
            };
            O.prototype.set_m_influence = O.prototype.hC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                mb(c, a)
            };
            Object.defineProperty(O.prototype, "m_influence", {
                get: O.prototype.Cz,
                set: O.prototype.hC
            });
            O.prototype.get_m_c0 = O.prototype.Ry = function() {
                return n($a(this.sx), lz)
            };
            O.prototype.set_m_c0 = O.prototype.xB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                jb(c, a)
            };
            Object.defineProperty(O.prototype, "m_c0", {
                get: O.prototype.Ry,
                set: O.prototype.xB
            });
            O.prototype.get_m_c1 = O.prototype.Sy = function() {
                return n(ab(this.sx), r)
            };
            O.prototype.set_m_c1 = O.prototype.yB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                kb(c, a)
            };
            Object.defineProperty(O.prototype, "m_c1", {
                get: O.prototype.Sy,
                set: O.prototype.yB
            });
            O.prototype.get_m_c2 = O.prototype.Ty = function() {
                return bb(this.sx)
            };
            O.prototype.set_m_c2 = O.prototype.zB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                lb(c, a)
            };
            Object.defineProperty(O.prototype, "m_c2", {
                get: O.prototype.Ty,
                set: O.prototype.zB
            });
            O.prototype.__destroy__ = function() {
                Ya(this.sx)
            };

            function P() {
                throw "cannot construct a btVehicleRaycasterResult, no constructor in IDL";
            }
            P.prototype = Object.create(k.prototype);
            P.prototype.constructor = P;
            P.prototype.tx = P;
            P.ux = {};
            g.btVehicleRaycasterResult = P;
            P.prototype.get_m_hitPointInWorld = P.prototype.xz = function() {
                return n(xw(this.sx), r)
            };
            P.prototype.set_m_hitPointInWorld = P.prototype.cC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Aw(c, a)
            };
            Object.defineProperty(P.prototype, "m_hitPointInWorld", {
                get: P.prototype.xz,
                set: P.prototype.cC
            });
            P.prototype.get_m_hitNormalInWorld = P.prototype.vz = function() {
                return n(ww(this.sx), r)
            };
            P.prototype.set_m_hitNormalInWorld = P.prototype.aC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                zw(c, a)
            };
            Object.defineProperty(P.prototype, "m_hitNormalInWorld", {
                get: P.prototype.vz,
                set: P.prototype.aC
            });
            P.prototype.get_m_distFraction = P.prototype.gz = function() {
                return vw(this.sx)
            };
            P.prototype.set_m_distFraction = P.prototype.NB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                yw(c, a)
            };
            Object.defineProperty(P.prototype, "m_distFraction", {
                get: P.prototype.gz,
                set: P.prototype.NB
            });
            P.prototype.__destroy__ = function() {
                uw(this.sx)
            };

            function uz() {
                throw "cannot construct a btVector3Array, no constructor in IDL";
            }
            uz.prototype = Object.create(k.prototype);
            uz.prototype.constructor = uz;
            uz.prototype.tx = uz;
            uz.ux = {};
            g.btVector3Array = uz;
            uz.prototype.size = uz.prototype.size = function() {
                return Lv(this.sx)
            };
            uz.prototype.at = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Kv(c, a), r)
            };
            uz.prototype.__destroy__ = function() {
                Jv(this.sx)
            };

            function Lz() {
                throw "cannot construct a btConstraintSolver, no constructor in IDL";
            }
            Lz.prototype = Object.create(k.prototype);
            Lz.prototype.constructor = Lz;
            Lz.prototype.tx = Lz;
            Lz.ux = {};
            g.btConstraintSolver = Lz;
            Lz.prototype.__destroy__ = function() {
                Yh(this.sx)
            };

            function Q(a, c, d) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                this.sx = Vp(a, c, d);
                m(Q)[this.sx] = this
            }
            Q.prototype = Object.create(az.prototype);
            Q.prototype.constructor = Q;
            Q.prototype.tx = Q;
            Q.ux = {};
            g.btRaycastVehicle = Q;
            Q.prototype.applyEngineForce = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Up(d, a, c)
            };
            Q.prototype.setSteeringValue = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                nq(d, a, c)
            };
            Q.prototype.getWheelTransformWS = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(hq(c, a), u)
            };
            Q.prototype.updateWheelTransform = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                uq(d, a, c)
            };
            Q.prototype.addWheel = function(a, c, d, e, f, l, q) {
                var C = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                l && "object" === typeof l && (l = l.sx);
                q && "object" === typeof q && (q = q.sx);
                return n(Tp(C, a, c, d, e, f, l, q), L)
            };
            Q.prototype.getNumWheels = function() {
                return $p(this.sx)
            };
            Q.prototype.getRigidBody = function() {
                return n(bq(this.sx), H)
            };
            Q.prototype.getWheelInfo = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(gq(c, a), L)
            };
            Q.prototype.setBrake = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                kq(d, a, c)
            };
            Q.prototype.setCoordinateSystem = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                lq(e, a, c, d)
            };
            Q.prototype.getCurrentSpeedKmHour = function() {
                return Xp(this.sx)
            };
            Q.prototype.getChassisWorldTransform = function() {
                return n(Wp(this.sx), u)
            };
            Q.prototype.rayCast = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return iq(c, a)
            };
            Q.prototype.updateVehicle = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                tq(c, a)
            };
            Q.prototype.resetSuspension = function() {
                jq(this.sx)
            };
            Q.prototype.getSteeringValue = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return cq(c, a)
            };
            Q.prototype.updateWheelTransformsWS = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                void 0 === c ? vq(d, a) : wq(d, a, c)
            };
            Q.prototype.setPitchControl = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                mq(c, a)
            };
            Q.prototype.updateSuspension = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                sq(c, a)
            };
            Q.prototype.updateFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                rq(c, a)
            };
            Q.prototype.getRightAxis = function() {
                return aq(this.sx)
            };
            Q.prototype.getUpAxis = function() {
                return dq(this.sx)
            };
            Q.prototype.getForwardAxis = function() {
                return Yp(this.sx)
            };
            Q.prototype.getForwardVector = function() {
                return n(Zp(this.sx), r)
            };
            Q.prototype.getUserConstraintType = function() {
                return fq(this.sx)
            };
            Q.prototype.setUserConstraintType = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                pq(c, a)
            };
            Q.prototype.setUserConstraintId = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                oq(c, a)
            };
            Q.prototype.getUserConstraintId = function() {
                return eq(this.sx)
            };
            Q.prototype.updateAction = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                qq(d, a, c)
            };
            Q.prototype.__destroy__ = function() {
                Sp(this.sx)
            };

            function Mz(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = Oi(a);
                m(Mz)[this.sx] = this
            }
            Mz.prototype = Object.create(dz.prototype);
            Mz.prototype.constructor = Mz;
            Mz.prototype.tx = Mz;
            Mz.ux = {};
            g.btCylinderShapeX = Mz;
            Mz.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ti(c, a)
            };
            Mz.prototype.getMargin = function() {
                return Ri(this.sx)
            };
            Mz.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Si(c, a)
            };
            Mz.prototype.getLocalScaling = function() {
                return n(Qi(this.sx), r)
            };
            Mz.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Pi(d, a, c)
            };
            Mz.prototype.__destroy__ = function() {
                Ni(this.sx)
            };

            function Nz(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = Vi(a);
                m(Nz)[this.sx] = this
            }
            Nz.prototype = Object.create(dz.prototype);
            Nz.prototype.constructor = Nz;
            Nz.prototype.tx = Nz;
            Nz.ux = {};
            g.btCylinderShapeZ = Nz;
            Nz.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                $i(c, a)
            };
            Nz.prototype.getMargin = function() {
                return Yi(this.sx)
            };
            Nz.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zi(c, a)
            };
            Nz.prototype.getLocalScaling = function() {
                return n(Xi(this.sx), r)
            };
            Nz.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Wi(d, a, c)
            };
            Nz.prototype.__destroy__ = function() {
                Ui(this.sx)
            };

            function Oz() {
                this.sx = as();
                m(Oz)[this.sx] = this
            }
            Oz.prototype = Object.create(k.prototype);
            Oz.prototype.constructor = Oz;
            Oz.prototype.tx = Oz;
            Oz.ux = {};
            g.btSequentialImpulseConstraintSolver = Oz;
            Oz.prototype.__destroy__ = function() {
                $r(this.sx)
            };

            function Pz() {
                throw "cannot construct a tAnchorArray, no constructor in IDL";
            }
            Pz.prototype = Object.create(k.prototype);
            Pz.prototype.constructor = Pz;
            Pz.prototype.tx = Pz;
            Pz.ux = {};
            g.tAnchorArray = Pz;
            Pz.prototype.size = Pz.prototype.size = function() {
                return sy(this.sx)
            };
            Pz.prototype.at = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(oy(c, a), O)
            };
            Pz.prototype.clear = Pz.prototype.clear = function() {
                py(this.sx)
            };
            Pz.prototype.push_back = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ry(c, a)
            };
            Pz.prototype.pop_back = function() {
                qy(this.sx)
            };
            Pz.prototype.__destroy__ = function() {
                ny(this.sx)
            };

            function M() {
                throw "cannot construct a RaycastInfo, no constructor in IDL";
            }
            M.prototype = Object.create(k.prototype);
            M.prototype.constructor = M;
            M.prototype.tx = M;
            M.ux = {};
            g.RaycastInfo = M;
            M.prototype.get_m_contactNormalWS = M.prototype.Yy = function() {
                return n(ye(this.sx), r)
            };
            M.prototype.set_m_contactNormalWS = M.prototype.EB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ge(c, a)
            };
            Object.defineProperty(M.prototype, "m_contactNormalWS", {
                get: M.prototype.Yy,
                set: M.prototype.EB
            });
            M.prototype.get_m_contactPointWS = M.prototype.Zy = function() {
                return n(ze(this.sx), r)
            };
            M.prototype.set_m_contactPointWS = M.prototype.FB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                He(c, a)
            };
            Object.defineProperty(M.prototype, "m_contactPointWS", {
                get: M.prototype.Zy,
                set: M.prototype.FB
            });
            M.prototype.get_m_suspensionLength = M.prototype.nA = function() {
                return De(this.sx)
            };
            M.prototype.set_m_suspensionLength = M.prototype.TC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Le(c, a)
            };
            Object.defineProperty(M.prototype, "m_suspensionLength", {
                get: M.prototype.nA,
                set: M.prototype.TC
            });
            M.prototype.get_m_hardPointWS = M.prototype.rz = function() {
                return n(Be(this.sx), r)
            };
            M.prototype.set_m_hardPointWS = M.prototype.YB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Je(c, a)
            };
            Object.defineProperty(M.prototype, "m_hardPointWS", {
                get: M.prototype.rz,
                set: M.prototype.YB
            });
            M.prototype.get_m_wheelDirectionWS = M.prototype.CA = function() {
                return n(Fe(this.sx), r)
            };
            M.prototype.set_m_wheelDirectionWS = M.prototype.hD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ne(c, a)
            };
            Object.defineProperty(M.prototype, "m_wheelDirectionWS", {
                get: M.prototype.CA,
                set: M.prototype.hD
            });
            M.prototype.get_m_wheelAxleWS = M.prototype.BA = function() {
                return n(Ee(this.sx), r)
            };
            M.prototype.set_m_wheelAxleWS = M.prototype.gD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Me(c, a)
            };
            Object.defineProperty(M.prototype, "m_wheelAxleWS", {
                get: M.prototype.BA,
                set: M.prototype.gD
            });
            M.prototype.get_m_isInContact = M.prototype.Dz = function() {
                return !!Ce(this.sx)
            };
            M.prototype.set_m_isInContact = M.prototype.iC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ke(c, a)
            };
            Object.defineProperty(M.prototype, "m_isInContact", {
                get: M.prototype.Dz,
                set: M.prototype.iC
            });
            M.prototype.get_m_groundObject = M.prototype.qz = function() {
                return Ae(this.sx)
            };
            M.prototype.set_m_groundObject = M.prototype.XB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ie(c, a)
            };
            Object.defineProperty(M.prototype, "m_groundObject", {
                get: M.prototype.qz,
                set: M.prototype.XB
            });
            M.prototype.__destroy__ = function() {
                xe(this.sx)
            };

            function Qz() {
                throw "cannot construct a tNodeArray, no constructor in IDL";
            }
            Qz.prototype = Object.create(k.prototype);
            Qz.prototype.constructor = Qz;
            Qz.prototype.tx = Qz;
            Qz.ux = {};
            g.tNodeArray = Qz;
            Qz.prototype.size = Qz.prototype.size = function() {
                return yy(this.sx)
            };
            Qz.prototype.at = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(xy(c, a), Node)
            };
            Qz.prototype.__destroy__ = function() {
                wy(this.sx)
            };

            function R(a, c, d, e) {
                b.vx();
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                "object" == typeof e && (e = My(e));
                this.sx = nt(a, c, d, e);
                m(R)[this.sx] = this
            }
            R.prototype = Object.create(t.prototype);
            R.prototype.constructor = R;
            R.prototype.tx = R;
            R.ux = {};
            g.btSoftBody = R;
            R.prototype.checkLink = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return !!pt(d, a, c)
            };
            R.prototype.checkFace = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                return !!ot(e, a, c, d)
            };
            R.prototype.appendMaterial = function() {
                return n(kt(this.sx), A)
            };
            R.prototype.appendNode = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                lt(d, a, c)
            };
            R.prototype.appendLink = function(a, c, d, e) {
                var f = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                jt(f, a, c, d, e)
            };
            R.prototype.appendFace = function(a, c, d, e) {
                var f = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                it(f, a, c, d, e)
            };
            R.prototype.appendTetra = function(a, c, d, e, f) {
                var l = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                mt(l, a, c, d, e, f)
            };
            R.prototype.appendAnchor = function(a, c, d, e) {
                var f = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                ht(f, a, c, d, e)
            };
            R.prototype.addForce = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                void 0 === c ? ft(d, a) : gt(d, a, c)
            };
            R.prototype.addAeroForceToNode = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                et(d, a, c)
            };
            R.prototype.getTotalMass = function() {
                return wt(this.sx)
            };
            R.prototype.setTotalMass = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Vt(d, a, c)
            };
            R.prototype.setMass = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                St(d, a, c)
            };
            R.prototype.transform = R.prototype.transform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                cu(c, a)
            };
            R.prototype.translate = R.prototype.translate = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                du(c, a)
            };
            R.prototype.rotate = R.prototype.rotate = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                It(c, a)
            };
            R.prototype.scale = R.prototype.scale = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Jt(c, a)
            };
            R.prototype.generateClusters = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return void 0 === c ? st(d, a) : tt(d, a, c)
            };
            R.prototype.generateBendingConstraints = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return rt(d, a, c)
            };
            R.prototype.upcast = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(eu(c, a), R)
            };
            R.prototype.setAnisotropicFriction = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Lt(d, a, c)
            };
            R.prototype.getCollisionShape = function() {
                return n(vt(this.sx), Sy)
            };
            R.prototype.setContactProcessingThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Qt(c, a)
            };
            R.prototype.setActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Kt(c, a)
            };
            R.prototype.forceActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                qt(c, a)
            };
            R.prototype.activate = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                void 0 === a ? ct(c) : dt(c, a)
            };
            R.prototype.isActive = function() {
                return !!Et(this.sx)
            };
            R.prototype.isKinematicObject = function() {
                return !!Ft(this.sx)
            };
            R.prototype.isStaticObject = function() {
                return !!Gt(this.sx)
            };
            R.prototype.isStaticOrKinematicObject = function() {
                return !!Ht(this.sx)
            };
            R.prototype.setRestitution = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Tt(c, a)
            };
            R.prototype.setFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Rt(c, a)
            };
            R.prototype.setRollingFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ut(c, a)
            };
            R.prototype.getWorldTransform = function() {
                return n(zt(this.sx), u)
            };
            R.prototype.getCollisionFlags = function() {
                return ut(this.sx)
            };
            R.prototype.setCollisionFlags = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ot(c, a)
            };
            R.prototype.setWorldTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Yt(c, a)
            };
            R.prototype.setCollisionShape = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Pt(c, a)
            };
            R.prototype.setCcdMotionThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mt(c, a)
            };
            R.prototype.setCcdSweptSphereRadius = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Nt(c, a)
            };
            R.prototype.getUserIndex = function() {
                return xt(this.sx)
            };
            R.prototype.setUserIndex = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wt(c, a)
            };
            R.prototype.getUserPointer = function() {
                return n(yt(this.sx), Ty)
            };
            R.prototype.setUserPointer = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xt(c, a)
            };
            R.prototype.get_m_cfg = R.prototype.Uy = function() {
                return n(Bt(this.sx), S)
            };
            R.prototype.set_m_cfg = R.prototype.AB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                $t(c, a)
            };
            Object.defineProperty(R.prototype, "m_cfg", {
                get: R.prototype.Uy,
                set: R.prototype.AB
            });
            R.prototype.get_m_nodes = R.prototype.Rz = function() {
                return n(Dt(this.sx), Qz)
            };
            R.prototype.set_m_nodes = R.prototype.wC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                bu(c, a)
            };
            Object.defineProperty(R.prototype, "m_nodes", {
                get: R.prototype.Rz,
                set: R.prototype.wC
            });
            R.prototype.get_m_materials = R.prototype.Nz = function() {
                return n(Ct(this.sx), pz)
            };
            R.prototype.set_m_materials = R.prototype.sC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                au(c, a)
            };
            Object.defineProperty(R.prototype, "m_materials", {
                get: R.prototype.Nz,
                set: R.prototype.sC
            });
            R.prototype.get_m_anchors = R.prototype.Ky = function() {
                return n(At(this.sx), Pz)
            };
            R.prototype.set_m_anchors = R.prototype.qB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zt(c, a)
            };
            Object.defineProperty(R.prototype, "m_anchors", {
                get: R.prototype.Ky,
                set: R.prototype.qB
            });
            R.prototype.__destroy__ = function() {
                bt(this.sx)
            };

            function Rz() {
                throw "cannot construct a btIntArray, no constructor in IDL";
            }
            Rz.prototype = Object.create(k.prototype);
            Rz.prototype.constructor = Rz;
            Rz.prototype.tx = Rz;
            Rz.ux = {};
            g.btIntArray = Rz;
            Rz.prototype.size = Rz.prototype.size = function() {
                return ln(this.sx)
            };
            Rz.prototype.at = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return kn(c, a)
            };
            Rz.prototype.__destroy__ = function() {
                jn(this.sx)
            };

            function S() {
                throw "cannot construct a Config, no constructor in IDL";
            }
            S.prototype = Object.create(k.prototype);
            S.prototype.constructor = S;
            S.prototype.tx = S;
            S.ux = {};
            g.Config = S;
            S.prototype.get_kVCF = S.prototype.Dy = function() {
                return Dc(this.sx)
            };
            S.prototype.set_kVCF = S.prototype.jB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                bd(c, a)
            };
            Object.defineProperty(S.prototype, "kVCF", {
                get: S.prototype.Dy,
                set: S.prototype.jB
            });
            S.prototype.get_kDP = S.prototype.qy = function() {
                return nc(this.sx)
            };
            S.prototype.set_kDP = S.prototype.XA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Qc(c, a)
            };
            Object.defineProperty(S.prototype, "kDP", {
                get: S.prototype.qy,
                set: S.prototype.XA
            });
            S.prototype.get_kDG = S.prototype.py = function() {
                return mc(this.sx)
            };
            S.prototype.set_kDG = S.prototype.WA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Pc(c, a)
            };
            Object.defineProperty(S.prototype, "kDG", {
                get: S.prototype.py,
                set: S.prototype.WA
            });
            S.prototype.get_kLF = S.prototype.sy = function() {
                return pc(this.sx)
            };
            S.prototype.set_kLF = S.prototype.ZA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Sc(c, a)
            };
            Object.defineProperty(S.prototype, "kLF", {
                get: S.prototype.sy,
                set: S.prototype.ZA
            });
            S.prototype.get_kPR = S.prototype.uy = function() {
                return rc(this.sx)
            };
            S.prototype.set_kPR = S.prototype.aB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Uc(c, a)
            };
            Object.defineProperty(S.prototype, "kPR", {
                get: S.prototype.uy,
                set: S.prototype.aB
            });
            S.prototype.get_kVC = S.prototype.Cy = function() {
                return Ec(this.sx)
            };
            S.prototype.set_kVC = S.prototype.iB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                cd(c, a)
            };
            Object.defineProperty(S.prototype, "kVC", {
                get: S.prototype.Cy,
                set: S.prototype.iB
            });
            S.prototype.get_kDF = S.prototype.oy = function() {
                return lc(this.sx)
            };
            S.prototype.set_kDF = S.prototype.VA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Oc(c, a)
            };
            Object.defineProperty(S.prototype, "kDF", {
                get: S.prototype.oy,
                set: S.prototype.VA
            });
            S.prototype.get_kMT = S.prototype.ty = function() {
                return qc(this.sx)
            };
            S.prototype.set_kMT = S.prototype.$A = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Tc(c, a)
            };
            Object.defineProperty(S.prototype, "kMT", {
                get: S.prototype.ty,
                set: S.prototype.$A
            });
            S.prototype.get_kCHR = S.prototype.ny = function() {
                return kc(this.sx)
            };
            S.prototype.set_kCHR = S.prototype.UA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Nc(c, a)
            };
            Object.defineProperty(S.prototype, "kCHR", {
                get: S.prototype.ny,
                set: S.prototype.UA
            });
            S.prototype.get_kKHR = S.prototype.ry = function() {
                return oc(this.sx)
            };
            S.prototype.set_kKHR = S.prototype.YA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Rc(c, a)
            };
            Object.defineProperty(S.prototype, "kKHR", {
                get: S.prototype.ry,
                set: S.prototype.YA
            });
            S.prototype.get_kSHR = S.prototype.vy = function() {
                return sc(this.sx)
            };
            S.prototype.set_kSHR = S.prototype.bB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vc(c, a)
            };
            Object.defineProperty(S.prototype, "kSHR", {
                get: S.prototype.vy,
                set: S.prototype.bB
            });
            S.prototype.get_kAHR = S.prototype.my = function() {
                return jc(this.sx)
            };
            S.prototype.set_kAHR = S.prototype.TA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mc(c, a)
            };
            Object.defineProperty(S.prototype, "kAHR", {
                get: S.prototype.my,
                set: S.prototype.TA
            });
            S.prototype.get_kSRHR_CL = S.prototype.yy = function() {
                return zc(this.sx)
            };
            S.prototype.set_kSRHR_CL = S.prototype.eB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Yc(c, a)
            };
            Object.defineProperty(S.prototype, "kSRHR_CL", {
                get: S.prototype.yy,
                set: S.prototype.eB
            });
            S.prototype.get_kSKHR_CL = S.prototype.wy = function() {
                return tc(this.sx)
            };
            S.prototype.set_kSKHR_CL = S.prototype.cB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wc(c, a)
            };
            Object.defineProperty(S.prototype, "kSKHR_CL", {
                get: S.prototype.wy,
                set: S.prototype.cB
            });
            S.prototype.get_kSSHR_CL = S.prototype.Ay = function() {
                return Bc(this.sx)
            };
            S.prototype.set_kSSHR_CL = S.prototype.gB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                $c(c, a)
            };
            Object.defineProperty(S.prototype, "kSSHR_CL", {
                get: S.prototype.Ay,
                set: S.prototype.gB
            });
            S.prototype.get_kSR_SPLT_CL = S.prototype.zy = function() {
                return Ac(this.sx)
            };
            S.prototype.set_kSR_SPLT_CL = S.prototype.fB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zc(c, a)
            };
            Object.defineProperty(S.prototype, "kSR_SPLT_CL", {
                get: S.prototype.zy,
                set: S.prototype.fB
            });
            S.prototype.get_kSK_SPLT_CL = S.prototype.xy = function() {
                return uc(this.sx)
            };
            S.prototype.set_kSK_SPLT_CL = S.prototype.dB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xc(c, a)
            };
            Object.defineProperty(S.prototype, "kSK_SPLT_CL", {
                get: S.prototype.xy,
                set: S.prototype.dB
            });
            S.prototype.get_kSS_SPLT_CL = S.prototype.By = function() {
                return Cc(this.sx)
            };
            S.prototype.set_kSS_SPLT_CL = S.prototype.hB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ad(c, a)
            };
            Object.defineProperty(S.prototype, "kSS_SPLT_CL", {
                get: S.prototype.By,
                set: S.prototype.hB
            });
            S.prototype.get_maxvolume = S.prototype.IA = function() {
                return Fc(this.sx)
            };
            S.prototype.set_maxvolume = S.prototype.nD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                dd(c, a)
            };
            Object.defineProperty(S.prototype, "maxvolume", {
                get: S.prototype.IA,
                set: S.prototype.nD
            });
            S.prototype.get_timescale = S.prototype.KA = function() {
                return Hc(this.sx)
            };
            S.prototype.set_timescale = S.prototype.pD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                fd(c, a)
            };
            Object.defineProperty(S.prototype, "timescale", {
                get: S.prototype.KA,
                set: S.prototype.pD
            });
            S.prototype.get_viterations = S.prototype.LA = function() {
                return Ic(this.sx)
            };
            S.prototype.set_viterations = S.prototype.qD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                gd(c, a)
            };
            Object.defineProperty(S.prototype, "viterations", {
                get: S.prototype.LA,
                set: S.prototype.qD
            });
            S.prototype.get_piterations = S.prototype.JA = function() {
                return Gc(this.sx)
            };
            S.prototype.set_piterations = S.prototype.oD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ed(c, a)
            };
            Object.defineProperty(S.prototype, "piterations", {
                get: S.prototype.JA,
                set: S.prototype.oD
            });
            S.prototype.get_diterations = S.prototype.ly = function() {
                return hc(this.sx)
            };
            S.prototype.set_diterations = S.prototype.SA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Lc(c, a)
            };
            Object.defineProperty(S.prototype, "diterations", {
                get: S.prototype.ly,
                set: S.prototype.SA
            });
            S.prototype.get_citerations = S.prototype.jy = function() {
                return ec(this.sx)
            };
            S.prototype.set_citerations = S.prototype.QA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Jc(c, a)
            };
            Object.defineProperty(S.prototype, "citerations", {
                get: S.prototype.jy,
                set: S.prototype.QA
            });
            S.prototype.get_collisions = S.prototype.ky = function() {
                return fc(this.sx)
            };
            S.prototype.set_collisions = S.prototype.RA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Kc(c, a)
            };
            Object.defineProperty(S.prototype, "collisions", {
                get: S.prototype.ky,
                set: S.prototype.RA
            });
            S.prototype.__destroy__ = function() {
                dc(this.sx)
            };

            function Node() {
                throw "cannot construct a Node, no constructor in IDL";
            }
            Node.prototype = Object.create(k.prototype);
            Node.prototype.constructor = Node;
            Node.prototype.tx = Node;
            Node.ux = {};
            g.Node = Node;
            Node.prototype.get_m_x = Node.prototype.HA = function() {
                return n(fe(this.sx), r)
            };
            Node.prototype.set_m_x = Node.prototype.mD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                me(c, a)
            };
            Object.defineProperty(Node.prototype, "m_x", {
                get: Node.prototype.HA,
                set: Node.prototype.mD
            });
            Node.prototype.get_m_q = Node.prototype.Xz = function() {
                return n(de(this.sx), r)
            };
            Node.prototype.set_m_q = Node.prototype.CC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ke(c, a)
            };
            Object.defineProperty(Node.prototype, "m_q", {
                get: Node.prototype.Xz,
                set: Node.prototype.CC
            });
            Node.prototype.get_m_v = Node.prototype.zA = function() {
                return n(ee(this.sx), r)
            };
            Node.prototype.set_m_v = Node.prototype.eD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                le(c, a)
            };
            Object.defineProperty(Node.prototype, "m_v", {
                get: Node.prototype.zA,
                set: Node.prototype.eD
            });
            Node.prototype.get_m_f = Node.prototype.kz = function() {
                return n(ae(this.sx), r)
            };
            Node.prototype.set_m_f = Node.prototype.RB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                he(c, a)
            };
            Object.defineProperty(Node.prototype, "m_f", {
                get: Node.prototype.kz,
                set: Node.prototype.RB
            });
            Node.prototype.get_m_n = Node.prototype.Pz = function() {
                return n(ce(this.sx), r)
            };
            Node.prototype.set_m_n = Node.prototype.uC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                je(c, a)
            };
            Object.defineProperty(Node.prototype, "m_n", {
                get: Node.prototype.Pz,
                set: Node.prototype.uC
            });
            Node.prototype.get_m_im = Node.prototype.zz = function() {
                return be(this.sx)
            };
            Node.prototype.set_m_im = Node.prototype.eC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ie(c, a)
            };
            Object.defineProperty(Node.prototype, "m_im", {
                get: Node.prototype.zz,
                set: Node.prototype.eC
            });
            Node.prototype.get_m_area = Node.prototype.Ny = function() {
                return $d(this.sx)
            };
            Node.prototype.set_m_area = Node.prototype.tB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ge(c, a)
            };
            Object.defineProperty(Node.prototype, "m_area", {
                get: Node.prototype.Ny,
                set: Node.prototype.tB
            });
            Node.prototype.__destroy__ = function() {
                Zd(this.sx)
            };

            function Sz() {
                this.sx = Bm();
                m(Sz)[this.sx] = this
            }
            Sz.prototype = Object.create(k.prototype);
            Sz.prototype.constructor = Sz;
            Sz.prototype.tx = Sz;
            Sz.ux = {};
            g.btGhostPairCallback = Sz;
            Sz.prototype.__destroy__ = function() {
                Am(this.sx)
            };

            function Tz() {
                throw "cannot construct a btOverlappingPairCallback, no constructor in IDL";
            }
            Tz.prototype = Object.create(k.prototype);
            Tz.prototype.constructor = Tz;
            Tz.prototype.tx = Tz;
            Tz.ux = {};
            g.btOverlappingPairCallback = Tz;
            Tz.prototype.__destroy__ = function() {
                jo(this.sx)
            };

            function T(a, c, d, e) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                this.sx = void 0 === e ? nn(a, c, d) : on(a, c, d, e);
                m(T)[this.sx] = this
            }
            T.prototype = Object.create(az.prototype);
            T.prototype.constructor = T;
            T.prototype.tx = T;
            T.ux = {};
            g.btKinematicCharacterController = T;
            T.prototype.setUpAxis = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Cn(c, a)
            };
            T.prototype.setWalkDirection = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Gn(c, a)
            };
            T.prototype.setVelocityForTimeInterval = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Fn(d, a, c)
            };
            T.prototype.warp = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                In(c, a)
            };
            T.prototype.preStep = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                wn(c, a)
            };
            T.prototype.playerStep = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                vn(d, a, c)
            };
            T.prototype.setFallSpeed = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                xn(c, a)
            };
            T.prototype.setJumpSpeed = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                zn(c, a)
            };
            T.prototype.setMaxJumpHeight = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                An(c, a)
            };
            T.prototype.canJump = function() {
                return !!pn(this.sx)
            };
            T.prototype.jump = function() {
                tn(this.sx)
            };
            T.prototype.setGravity = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                yn(c, a)
            };
            T.prototype.getGravity = function() {
                return rn(this.sx)
            };
            T.prototype.setMaxSlope = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Bn(c, a)
            };
            T.prototype.getMaxSlope = function() {
                return sn(this.sx)
            };
            T.prototype.getGhostObject = function() {
                return n(qn(this.sx), U)
            };
            T.prototype.setUseGhostSweepTest = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                En(c, a)
            };
            T.prototype.onGround = function() {
                return !!un(this.sx)
            };
            T.prototype.setUpInterpolate = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Dn(c, a)
            };
            T.prototype.updateAction = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Hn(d, a, c)
            };
            T.prototype.__destroy__ = function() {
                mn(this.sx)
            };

            function Uz() {
                throw "cannot construct a btSoftBodyArray, no constructor in IDL";
            }
            Uz.prototype = Object.create(k.prototype);
            Uz.prototype.constructor = Uz;
            Uz.prototype.tx = Uz;
            Uz.ux = {};
            g.btSoftBodyArray = Uz;
            Uz.prototype.size = Uz.prototype.size = function() {
                return xs(this.sx)
            };
            Uz.prototype.at = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(vs(c, a), R)
            };
            Uz.prototype.__destroy__ = function() {
                us(this.sx)
            };

            function vz() {
                throw "cannot construct a btFaceArray, no constructor in IDL";
            }
            vz.prototype = Object.create(k.prototype);
            vz.prototype.constructor = vz;
            vz.prototype.tx = vz;
            vz.ux = {};
            g.btFaceArray = vz;
            vz.prototype.size = vz.prototype.size = function() {
                return hl(this.sx)
            };
            vz.prototype.at = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(gl(c, a), Vz)
            };
            vz.prototype.__destroy__ = function() {
                fl(this.sx)
            };

            function Wz(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = av(a, c);
                m(Wz)[this.sx] = this
            }
            Wz.prototype = Object.create(Wy.prototype);
            Wz.prototype.constructor = Wz;
            Wz.prototype.tx = Wz;
            Wz.ux = {};
            g.btStaticPlaneShape = Wz;
            Wz.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                dv(c, a)
            };
            Wz.prototype.getLocalScaling = function() {
                return n(cv(this.sx), r)
            };
            Wz.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                bv(d, a, c)
            };
            Wz.prototype.__destroy__ = function() {
                $u(this.sx)
            };

            function Py() {
                throw "cannot construct a btOverlappingPairCache, no constructor in IDL";
            }
            Py.prototype = Object.create(k.prototype);
            Py.prototype.constructor = Py;
            Py.prototype.tx = Py;
            Py.ux = {};
            g.btOverlappingPairCache = Py;
            Py.prototype.setInternalGhostPairCallback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                io(c, a)
            };
            Py.prototype.__destroy__ = function() {
                ho(this.sx)
            };

            function V(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                this.sx = pu(a, c, d, e, f);
                m(V)[this.sx] = this
            }
            V.prototype = Object.create(y.prototype);
            V.prototype.constructor = V;
            V.prototype.tx = V;
            V.ux = {};
            g.btSoftRigidDynamicsWorld = V;
            V.prototype.addSoftBody = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                ou(e, a, c, d)
            };
            V.prototype.removeSoftBody = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ju(c, a)
            };
            V.prototype.removeCollisionObject = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Gu(c, a)
            };
            V.prototype.getWorldInfo = function() {
                return n(Du(this.sx), I)
            };
            V.prototype.getSoftBodyArray = function() {
                return n(Bu(this.sx), Uz)
            };
            V.prototype.getDispatcher = function() {
                return n(yu(this.sx), Oy)
            };
            V.prototype.rayTest = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Eu(e, a, c, d)
            };
            V.prototype.getPairCache = function() {
                return n(Au(this.sx), Py)
            };
            V.prototype.getDispatchInfo = function() {
                return n(xu(this.sx), p)
            };
            V.prototype.addCollisionObject = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                void 0 === c ? hu(e, a) : void 0 === d ? iu(e, a, c) : ju(e, a, c, d)
            };
            V.prototype.getBroadphase = function() {
                return n(vu(this.sx), Qy)
            };
            V.prototype.convexSweepTest = function(a, c, d, e, f) {
                var l = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                su(l, a, c, d, e, f)
            };
            V.prototype.contactPairTest = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                qu(e, a, c, d)
            };
            V.prototype.contactTest = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                ru(d, a, c)
            };
            V.prototype.updateSingleAabb = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Su(c, a)
            };
            V.prototype.setDebugDrawer = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Nu(c, a)
            };
            V.prototype.getDebugDrawer = function() {
                return n(wu(this.sx), Ry)
            };
            V.prototype.debugDrawWorld = function() {
                uu(this.sx)
            };
            V.prototype.debugDrawObject = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                tu(e, a, c, d)
            };
            V.prototype.setGravity = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ou(c, a)
            };
            V.prototype.getGravity = function() {
                return n(zu(this.sx), r)
            };
            V.prototype.addRigidBody = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                void 0 === c ? mu(e, a) : void 0 === d ? _emscripten_bind_btSoftRigidDynamicsWorld_addRigidBody_2(e, a, c) : nu(e, a, c, d)
            };
            V.prototype.removeRigidBody = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Iu(c, a)
            };
            V.prototype.addConstraint = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                void 0 === c ? ku(d, a) : lu(d, a, c)
            };
            V.prototype.removeConstraint = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Hu(c, a)
            };
            V.prototype.stepSimulation = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                return void 0 === c ? Pu(e, a) : void 0 === d ? Qu(e, a, c) : Ru(e, a, c, d)
            };
            V.prototype.setContactAddedCallback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ku(c, a)
            };
            V.prototype.setContactProcessedCallback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mu(c, a)
            };
            V.prototype.setContactDestroyedCallback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Lu(c, a)
            };
            V.prototype.addAction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                gu(c, a)
            };
            V.prototype.removeAction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Fu(c, a)
            };
            V.prototype.getSolverInfo = function() {
                return n(Cu(this.sx), v)
            };
            V.prototype.__destroy__ = function() {
                fu(this.sx)
            };

            function Xz(a, c, d, e) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                this.sx = ol(a, c, d, e);
                m(Xz)[this.sx] = this
            }
            Xz.prototype = Object.create(Vy.prototype);
            Xz.prototype.constructor = Xz;
            Xz.prototype.tx = Xz;
            Xz.ux = {};
            g.btFixedConstraint = Xz;
            Xz.prototype.enableFeedback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                pl(c, a)
            };
            Xz.prototype.getBreakingImpulseThreshold = function() {
                return ql(this.sx)
            };
            Xz.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                sl(c, a)
            };
            Xz.prototype.getParam = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return rl(d, a, c)
            };
            Xz.prototype.setParam = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                tl(e, a, c, d)
            };
            Xz.prototype.__destroy__ = function() {
                nl(this.sx)
            };

            function u(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = void 0 === a ? hv() : void 0 === c ? _emscripten_bind_btTransform_btTransform_1(a) : iv(a, c);
                m(u)[this.sx] = this
            }
            u.prototype = Object.create(k.prototype);
            u.prototype.constructor = u;
            u.prototype.tx = u;
            u.ux = {};
            g.btTransform = u;
            u.prototype.setIdentity = function() {
                pv(this.sx)
            };
            u.prototype.setOrigin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                qv(c, a)
            };
            u.prototype.setRotation = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                rv(c, a)
            };
            u.prototype.getOrigin = function() {
                return n(kv(this.sx), r)
            };
            u.prototype.getRotation = function() {
                return n(lv(this.sx), W)
            };
            u.prototype.getBasis = function() {
                return n(jv(this.sx), lz)
            };
            u.prototype.setFromOpenGLMatrix = function(a) {
                var c = this.sx;
                b.vx();
                "object" == typeof a && (a = My(a));
                ov(c, a)
            };
            u.prototype.inverse = u.prototype.inverse = function() {
                return n(mv(this.sx), u)
            };
            u.prototype.op_mul = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(nv(c, a), u)
            };
            u.prototype.__destroy__ = function() {
                gv(this.sx)
            };

            function X(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = Gb(a, c);
                m(X)[this.sx] = this
            }
            X.prototype = Object.create(z.prototype);
            X.prototype.constructor = X;
            X.prototype.tx = X;
            X.ux = {};
            g.ClosestRayResultCallback = X;
            X.prototype.hasHit = function() {
                return !!Sb(this.sx)
            };
            X.prototype.get_m_rayFromWorld = X.prototype.Yz = function() {
                return n(Qb(this.sx), r)
            };
            X.prototype.set_m_rayFromWorld = X.prototype.DC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zb(c, a)
            };
            Object.defineProperty(X.prototype, "m_rayFromWorld", {
                get: X.prototype.Yz,
                set: X.prototype.DC
            });
            X.prototype.get_m_rayToWorld = X.prototype.Zz = function() {
                return n(Rb(this.sx), r)
            };
            X.prototype.set_m_rayToWorld = X.prototype.EC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                $b(c, a)
            };
            Object.defineProperty(X.prototype, "m_rayToWorld", {
                get: X.prototype.Zz,
                set: X.prototype.EC
            });
            X.prototype.get_m_hitNormalWorld = X.prototype.Rx = function() {
                return n(Ob(this.sx), r)
            };
            X.prototype.set_m_hitNormalWorld = X.prototype.Zx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xb(c, a)
            };
            Object.defineProperty(X.prototype, "m_hitNormalWorld", {
                get: X.prototype.Rx,
                set: X.prototype.Zx
            });
            X.prototype.get_m_hitPointWorld = X.prototype.Sx = function() {
                return n(Pb(this.sx), r)
            };
            X.prototype.set_m_hitPointWorld = X.prototype.$x = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Yb(c, a)
            };
            Object.defineProperty(X.prototype, "m_hitPointWorld", {
                get: X.prototype.Sx,
                set: X.prototype.$x
            });
            X.prototype.get_m_collisionFilterGroup = X.prototype.wx = function() {
                return Jb(this.sx)
            };
            X.prototype.set_m_collisionFilterGroup = X.prototype.yx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ub(c, a)
            };
            Object.defineProperty(X.prototype, "m_collisionFilterGroup", {
                get: X.prototype.wx,
                set: X.prototype.yx
            });
            X.prototype.get_m_collisionFilterMask = X.prototype.xx = function() {
                return Lb(this.sx)
            };
            X.prototype.set_m_collisionFilterMask = X.prototype.zx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vb(c, a)
            };
            Object.defineProperty(X.prototype, "m_collisionFilterMask", {
                get: X.prototype.xx,
                set: X.prototype.zx
            });
            X.prototype.get_m_closestHitFraction = X.prototype.Ax = function() {
                return Ib(this.sx)
            };
            X.prototype.set_m_closestHitFraction = X.prototype.Bx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Tb(c, a)
            };
            Object.defineProperty(X.prototype, "m_closestHitFraction", {
                get: X.prototype.Ax,
                set: X.prototype.Bx
            });
            X.prototype.get_m_collisionObject = X.prototype.Qx = function() {
                return n(Mb(this.sx), t)
            };
            X.prototype.set_m_collisionObject = X.prototype.Yx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wb(c, a)
            };
            Object.defineProperty(X.prototype, "m_collisionObject", {
                get: X.prototype.Qx,
                set: X.prototype.Yx
            });
            X.prototype.__destroy__ = function() {
                Hb(this.sx)
            };

            function Yz(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = void 0 === a ? Hs() : Is(a);
                m(Yz)[this.sx] = this
            }
            Yz.prototype = Object.create(Yy.prototype);
            Yz.prototype.constructor = Yz;
            Yz.prototype.tx = Yz;
            Yz.ux = {};
            g.btSoftBodyRigidBodyCollisionConfiguration = Yz;
            Yz.prototype.__destroy__ = function() {
                Gs(this.sx)
            };

            function Zz() {
                this.sx = ac();
                m(Zz)[this.sx] = this
            }
            Zz.prototype = Object.create(jz.prototype);
            Zz.prototype.constructor = Zz;
            Zz.prototype.tx = Zz;
            Zz.ux = {};
            g.ConcreteContactResultCallback = Zz;
            Zz.prototype.addSingleResult = function(a, c, d, e, f, l, q) {
                var C = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                l && "object" === typeof l && (l = l.sx);
                q && "object" === typeof q && (q = q.sx);
                return cc(C, a, c, d, e, f, l, q)
            };
            Zz.prototype.__destroy__ = function() {
                bc(this.sx)
            };

            function $z(a, c, d) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                this.sx = void 0 === d ? kf(a, c) : lf(a, c, d);
                m($z)[this.sx] = this
            }
            $z.prototype = Object.create(Zy.prototype);
            $z.prototype.constructor = $z;
            $z.prototype.tx = $z;
            $z.ux = {};
            g.btBvhTriangleMeshShape = $z;
            $z.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx); of (c, a)
            };
            $z.prototype.getLocalScaling = function() {
                return n(nf(this.sx), r)
            };
            $z.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                mf(d, a, c)
            };
            $z.prototype.__destroy__ = function() {
                jf(this.sx)
            };

            function aA(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                this.sx = void 0 === e ? is(a, c, d) : void 0 === f ? _emscripten_bind_btSliderConstraint_btSliderConstraint_4(a, c, d, e) : js(a, c, d, e, f);
                m(aA)[this.sx] = this
            }
            aA.prototype = Object.create(Vy.prototype);
            aA.prototype.constructor = aA;
            aA.prototype.tx = aA;
            aA.ux = {};
            g.btSliderConstraint = aA;
            aA.prototype.setLowerLinLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                qs(c, a)
            };
            aA.prototype.setUpperLinLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ts(c, a)
            };
            aA.prototype.setLowerAngLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ps(c, a)
            };
            aA.prototype.setUpperAngLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ss(c, a)
            };
            aA.prototype.enableFeedback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ks(c, a)
            };
            aA.prototype.getBreakingImpulseThreshold = function() {
                return ls(this.sx)
            };
            aA.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ns(c, a)
            };
            aA.prototype.getParam = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return ms(d, a, c)
            };
            aA.prototype.setParam = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                rs(e, a, c, d)
            };
            aA.prototype.__destroy__ = function() {
                hs(this.sx)
            };

            function U() {
                this.sx = no();
                m(U)[this.sx] = this
            }
            U.prototype = Object.create(x.prototype);
            U.prototype.constructor = U;
            U.prototype.tx = U;
            U.ux = {};
            g.btPairCachingGhostObject = U;
            U.prototype.setAnisotropicFriction = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Bo(d, a, c)
            };
            U.prototype.getCollisionShape = function() {
                return n(qo(this.sx), Sy)
            };
            U.prototype.setContactProcessingThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Go(c, a)
            };
            U.prototype.setActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ao(c, a)
            };
            U.prototype.forceActivationState = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                oo(c, a)
            };
            U.prototype.activate = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                void 0 === a ? lo(c) : mo(c, a)
            };
            U.prototype.isActive = function() {
                return !!wo(this.sx)
            };
            U.prototype.isKinematicObject = function() {
                return !!xo(this.sx)
            };
            U.prototype.isStaticObject = function() {
                return !!yo(this.sx)
            };
            U.prototype.isStaticOrKinematicObject = function() {
                return !!zo(this.sx)
            };
            U.prototype.setRestitution = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Io(c, a)
            };
            U.prototype.setFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ho(c, a)
            };
            U.prototype.setRollingFriction = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Jo(c, a)
            };
            U.prototype.getWorldTransform = function() {
                return n(vo(this.sx), u)
            };
            U.prototype.getCollisionFlags = function() {
                return po(this.sx)
            };
            U.prototype.setCollisionFlags = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Eo(c, a)
            };
            U.prototype.setWorldTransform = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mo(c, a)
            };
            U.prototype.setCollisionShape = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Fo(c, a)
            };
            U.prototype.setCcdMotionThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Co(c, a)
            };
            U.prototype.setCcdSweptSphereRadius = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Do(c, a)
            };
            U.prototype.getUserIndex = function() {
                return to(this.sx)
            };
            U.prototype.setUserIndex = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ko(c, a)
            };
            U.prototype.getUserPointer = function() {
                return n(uo(this.sx), Ty)
            };
            U.prototype.setUserPointer = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Lo(c, a)
            };
            U.prototype.getNumOverlappingObjects = function() {
                return ro(this.sx)
            };
            U.prototype.getOverlappingObject = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(so(c, a), t)
            };
            U.prototype.__destroy__ = function() {
                ko(this.sx)
            };

            function E() {
                throw "cannot construct a btManifoldPoint, no constructor in IDL";
            }
            E.prototype = Object.create(k.prototype);
            E.prototype.constructor = E;
            E.prototype.tx = E;
            E.ux = {};
            g.btManifoldPoint = E;
            E.prototype.getPositionWorldOnA = function() {
                return n(Mn(this.sx), r)
            };
            E.prototype.getPositionWorldOnB = function() {
                return n(Nn(this.sx), r)
            };
            E.prototype.getAppliedImpulse = function() {
                return Kn(this.sx)
            };
            E.prototype.getDistance = function() {
                return Ln(this.sx)
            };
            E.prototype.get_m_localPointA = E.prototype.Kz = function() {
                return n(On(this.sx), r)
            };
            E.prototype.set_m_localPointA = E.prototype.pC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Un(c, a)
            };
            Object.defineProperty(E.prototype, "m_localPointA", {
                get: E.prototype.Kz,
                set: E.prototype.pC
            });
            E.prototype.get_m_localPointB = E.prototype.Lz = function() {
                return n(Pn(this.sx), r)
            };
            E.prototype.set_m_localPointB = E.prototype.qC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Vn(c, a)
            };
            Object.defineProperty(E.prototype, "m_localPointB", {
                get: E.prototype.Lz,
                set: E.prototype.qC
            });
            E.prototype.get_m_positionWorldOnB = E.prototype.Wz = function() {
                return n(Sn(this.sx), r)
            };
            E.prototype.set_m_positionWorldOnB = E.prototype.BC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Yn(c, a)
            };
            Object.defineProperty(E.prototype, "m_positionWorldOnB", {
                get: E.prototype.Wz,
                set: E.prototype.BC
            });
            E.prototype.get_m_positionWorldOnA = E.prototype.Vz = function() {
                return n(Rn(this.sx), r)
            };
            E.prototype.set_m_positionWorldOnA = E.prototype.AC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Xn(c, a)
            };
            Object.defineProperty(E.prototype, "m_positionWorldOnA", {
                get: E.prototype.Vz,
                set: E.prototype.AC
            });
            E.prototype.get_m_normalWorldOnB = E.prototype.Sz = function() {
                return n(Qn(this.sx), r)
            };
            E.prototype.set_m_normalWorldOnB = E.prototype.xC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wn(c, a)
            };
            Object.defineProperty(E.prototype, "m_normalWorldOnB", {
                get: E.prototype.Sz,
                set: E.prototype.xC
            });
            E.prototype.get_m_userPersistentData = E.prototype.yA = function() {
                return Tn(this.sx)
            };
            E.prototype.set_m_userPersistentData = E.prototype.dD = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zn(c, a)
            };
            Object.defineProperty(E.prototype, "m_userPersistentData", {
                get: E.prototype.yA,
                set: E.prototype.dD
            });
            E.prototype.__destroy__ = function() {
                Jn(this.sx)
            };

            function bA(a, c, d, e) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                this.sx = void 0 === d ? Uo(a, c) : void 0 === e ? _emscripten_bind_btPoint2PointConstraint_btPoint2PointConstraint_3(a, c, d) : Vo(a, c, d, e);
                m(bA)[this.sx] = this
            }
            bA.prototype = Object.create(Vy.prototype);
            bA.prototype.constructor = bA;
            bA.prototype.tx = bA;
            bA.ux = {};
            g.btPoint2PointConstraint = bA;
            bA.prototype.setPivotA = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                dp(c, a)
            };
            bA.prototype.setPivotB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ep(c, a)
            };
            bA.prototype.getPivotInA = function() {
                return n(Zo(this.sx), r)
            };
            bA.prototype.getPivotInB = function() {
                return n($o(this.sx), r)
            };
            bA.prototype.enableFeedback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Wo(c, a)
            };
            bA.prototype.getBreakingImpulseThreshold = function() {
                return Xo(this.sx)
            };
            bA.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                bp(c, a)
            };
            bA.prototype.getParam = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return Yo(d, a, c)
            };
            bA.prototype.setParam = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                cp(e, a, c, d)
            };
            bA.prototype.get_m_setting = bA.prototype.eA = function() {
                return n(ap(this.sx), G)
            };
            bA.prototype.set_m_setting = bA.prototype.KC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                fp(c, a)
            };
            Object.defineProperty(bA.prototype, "m_setting", {
                get: bA.prototype.eA,
                set: bA.prototype.KC
            });
            bA.prototype.__destroy__ = function() {
                To(this.sx)
            };

            function cA() {
                this.sx = Fs();
                m(cA)[this.sx] = this
            }
            cA.prototype = Object.create(k.prototype);
            cA.prototype.constructor = cA;
            cA.prototype.tx = cA;
            cA.ux = {};
            g.btSoftBodyHelpers = cA;
            cA.prototype.CreateRope = function(a, c, d, e, f) {
                var l = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                return n(Ds(l, a, c, d, e, f), R)
            };
            cA.prototype.CreatePatch = function(a, c, d, e, f, l, q, C, J) {
                var Z = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                l && "object" === typeof l && (l = l.sx);
                q && "object" === typeof q && (q = q.sx);
                C && "object" === typeof C && (C = C.sx);
                J && "object" === typeof J && (J = J.sx);
                return n(Cs(Z, a, c, d, e, f, l, q, C, J), R)
            };
            cA.prototype.CreatePatchUV = function(a, c, d, e, f, l, q, C, J, Z) {
                var Na = this.sx;
                b.vx();
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                l && "object" === typeof l && (l = l.sx);
                q && "object" === typeof q && (q = q.sx);
                C && "object" === typeof C && (C = C.sx);
                J && "object" === typeof J && (J = J.sx);
                "object" == typeof Z && (Z = My(Z));
                return n(Bs(Na, a, c, d, e, f, l, q, C, J, Z), R)
            };
            cA.prototype.CreateEllipsoid = function(a, c, d, e) {
                var f = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                return n(ys(f, a, c, d, e), R)
            };
            cA.prototype.CreateFromTriMesh = function(a, c, d, e, f) {
                var l = this.sx;
                b.vx();
                a && "object" === typeof a && (a = a.sx);
                "object" == typeof c && (c = My(c));
                if ("object" == typeof d && "object" === typeof d) {
                    var q = b.Nx(d, ua);
                    b.copy(d, ua, q);
                    d = q
                }
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                return n(As(l, a, c, d, e, f), R)
            };
            cA.prototype.CreateFromConvexHull = function(a, c, d, e) {
                var f = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                return n(zs(f, a, c, d, e), R)
            };
            cA.prototype.__destroy__ = function() {
                Es(this.sx)
            };

            function Ty() {
                throw "cannot construct a VoidPtr, no constructor in IDL";
            }
            Ty.prototype = Object.create(k.prototype);
            Ty.prototype.constructor = Ty;
            Ty.prototype.tx = Ty;
            Ty.ux = {};
            g.VoidPtr = Ty;
            Ty.prototype.__destroy__ = function() {
                Oe(this.sx)
            };

            function sz() {
                throw "cannot construct a btBroadphaseProxy, no constructor in IDL";
            }
            sz.prototype = Object.create(k.prototype);
            sz.prototype.constructor = sz;
            sz.prototype.tx = sz;
            sz.ux = {};
            g.btBroadphaseProxy = sz;
            sz.prototype.get_m_collisionFilterGroup = sz.prototype.wx = function() {
                return ef(this.sx)
            };
            sz.prototype.set_m_collisionFilterGroup = sz.prototype.yx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                gf(c, a)
            };
            Object.defineProperty(sz.prototype, "m_collisionFilterGroup", {
                get: sz.prototype.wx,
                set: sz.prototype.yx
            });
            sz.prototype.get_m_collisionFilterMask = sz.prototype.xx = function() {
                return ff(this.sx)
            };
            sz.prototype.set_m_collisionFilterMask = sz.prototype.zx = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                hf(c, a)
            };
            Object.defineProperty(sz.prototype, "m_collisionFilterMask", {
                get: sz.prototype.xx,
                set: sz.prototype.zx
            });
            sz.prototype.__destroy__ = function() {
                df(this.sx)
            };

            function dA(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = Xe(a);
                m(dA)[this.sx] = this
            }
            dA.prototype = Object.create(Sy.prototype);
            dA.prototype.constructor = dA;
            dA.prototype.tx = dA;
            dA.ux = {};
            g.btBoxShape = dA;
            dA.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                bf(c, a)
            };
            dA.prototype.getMargin = function() {
                return $e(this.sx)
            };
            dA.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                af(c, a)
            };
            dA.prototype.getLocalScaling = function() {
                return n(Ze(this.sx), r)
            };
            dA.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Ye(d, a, c)
            };
            dA.prototype.__destroy__ = function() {
                We(this.sx)
            };

            function Vz() {
                throw "cannot construct a btFace, no constructor in IDL";
            }
            Vz.prototype = Object.create(k.prototype);
            Vz.prototype.constructor = Vz;
            Vz.prototype.tx = Vz;
            Vz.ux = {};
            g.btFace = Vz;
            Vz.prototype.get_m_indices = Vz.prototype.Bz = function() {
                return n(jl(this.sx), Rz)
            };
            Vz.prototype.set_m_indices = Vz.prototype.gC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ll(c, a)
            };
            Object.defineProperty(Vz.prototype, "m_indices", {
                get: Vz.prototype.Bz,
                set: Vz.prototype.gC
            });
            Vz.prototype.get_m_plane = Vz.prototype.Uz = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return kl(c, a)
            };
            Vz.prototype.set_m_plane = Vz.prototype.zC = function(a, c) {
                var d = this.sx;
                b.vx();
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                ml(d, a, c)
            };
            Object.defineProperty(Vz.prototype, "m_plane", {
                get: Vz.prototype.Uz,
                set: Vz.prototype.zC
            });
            Vz.prototype.__destroy__ = function() {
                il(this.sx)
            };

            function eA() {
                this.sx = rd();
                m(eA)[this.sx] = this
            }
            eA.prototype = Object.create(Ry.prototype);
            eA.prototype.constructor = eA;
            eA.prototype.tx = eA;
            eA.ux = {};
            g.DebugDrawer = eA;
            eA.prototype.drawLine = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                vd(e, a, c, d)
            };
            eA.prototype.drawContactPoint = function(a, c, d, e, f) {
                var l = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                ud(l, a, c, d, e, f)
            };
            eA.prototype.reportErrorWarning = function(a) {
                var c = this.sx;
                b.vx();
                a = a && "object" === typeof a ? a.sx : Ly(a);
                xd(c, a)
            };
            eA.prototype.draw3dText = function(a, c) {
                var d = this.sx;
                b.vx();
                a && "object" === typeof a && (a = a.sx);
                c = c && "object" === typeof c ? c.sx : Ly(c);
                td(d, a, c)
            };
            eA.prototype.setDebugMode = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                yd(c, a)
            };
            eA.prototype.getDebugMode = function() {
                return wd(this.sx)
            };
            eA.prototype.__destroy__ = function() {
                sd(this.sx)
            };

            function fA(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = qf(a, c);
                m(fA)[this.sx] = this
            }
            fA.prototype = Object.create(Xy.prototype);
            fA.prototype.constructor = fA;
            fA.prototype.tx = fA;
            fA.ux = {};
            g.btCapsuleShapeX = fA;
            fA.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                yf(c, a)
            };
            fA.prototype.getMargin = function() {
                return uf(this.sx)
            };
            fA.prototype.getUpAxis = function() {
                return wf(this.sx)
            };
            fA.prototype.getRadius = function() {
                return vf(this.sx)
            };
            fA.prototype.getHalfHeight = function() {
                return sf(this.sx)
            };
            fA.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                xf(c, a)
            };
            fA.prototype.getLocalScaling = function() {
                return n(tf(this.sx), r)
            };
            fA.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                rf(d, a, c)
            };
            fA.prototype.__destroy__ = function() {
                pf(this.sx)
            };

            function W(a, c, d, e) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                this.sx = sp(a, c, d, e);
                m(W)[this.sx] = this
            }
            W.prototype = Object.create(cz.prototype);
            W.prototype.constructor = W;
            W.prototype.tx = W;
            W.ux = {};
            g.btQuaternion = W;
            W.prototype.setValue = function(a, c, d, e) {
                var f = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                Jp(f, a, c, d, e)
            };
            W.prototype.setEulerZYX = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Hp(e, a, c, d)
            };
            W.prototype.setRotation = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Ip(d, a, c)
            };
            W.prototype.normalize = W.prototype.normalize = function() {
                Ap(this.sx)
            };
            W.prototype.length2 = function() {
                return yp(this.sx)
            };
            W.prototype.length = W.prototype.length = function() {
                return zp(this.sx)
            };
            W.prototype.dot = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return tp(c, a)
            };
            W.prototype.normalized = function() {
                return n(Bp(this.sx), W)
            };
            W.prototype.getAxis = function() {
                return n(wp(this.sx), r)
            };
            W.prototype.inverse = W.prototype.inverse = function() {
                return n(xp(this.sx), W)
            };
            W.prototype.getAngle = function() {
                return vp(this.sx)
            };
            W.prototype.getAngleShortestPath = function() {
                return up(this.sx)
            };
            W.prototype.angle = W.prototype.angle = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return rp(c, a)
            };
            W.prototype.angleShortestPath = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return qp(c, a)
            };
            W.prototype.op_add = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Cp(c, a), W)
            };
            W.prototype.op_sub = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Gp(c, a), W)
            };
            W.prototype.op_mul = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Ep(c, a), W)
            };
            W.prototype.op_mulq = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Fp(c, a), W)
            };
            W.prototype.op_div = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                return n(Dp(c, a), W)
            };
            W.prototype.x = W.prototype.x = function() {
                return Pp(this.sx)
            };
            W.prototype.y = W.prototype.y = function() {
                return Qp(this.sx)
            };
            W.prototype.z = W.prototype.z = function() {
                return Rp(this.sx)
            };
            W.prototype.w = W.prototype.fy = function() {
                return Op(this.sx)
            };
            W.prototype.setX = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Lp(c, a)
            };
            W.prototype.setY = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Mp(c, a)
            };
            W.prototype.setZ = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Np(c, a)
            };
            W.prototype.setW = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Kp(c, a)
            };
            W.prototype.__destroy__ = function() {
                pp(this.sx)
            };

            function gA(a, c) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                this.sx = Af(a, c);
                m(gA)[this.sx] = this
            }
            gA.prototype = Object.create(Xy.prototype);
            gA.prototype.constructor = gA;
            gA.prototype.tx = gA;
            gA.ux = {};
            g.btCapsuleShapeZ = gA;
            gA.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                If(c, a)
            };
            gA.prototype.getMargin = function() {
                return Ef(this.sx)
            };
            gA.prototype.getUpAxis = function() {
                return Gf(this.sx)
            };
            gA.prototype.getRadius = function() {
                return Ff(this.sx)
            };
            gA.prototype.getHalfHeight = function() {
                return Cf(this.sx)
            };
            gA.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Hf(c, a)
            };
            gA.prototype.getLocalScaling = function() {
                return n(Df(this.sx), r)
            };
            gA.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Bf(d, a, c)
            };
            gA.prototype.__destroy__ = function() {
                zf(this.sx)
            };

            function v() {
                throw "cannot construct a btContactSolverInfo, no constructor in IDL";
            }
            v.prototype = Object.create(k.prototype);
            v.prototype.constructor = v;
            v.prototype.tx = v;
            v.ux = {};
            g.btContactSolverInfo = v;
            v.prototype.get_m_splitImpulse = v.prototype.hA = function() {
                return !!bi(this.sx)
            };
            v.prototype.set_m_splitImpulse = v.prototype.NC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ei(c, a)
            };
            Object.defineProperty(v.prototype, "m_splitImpulse", {
                get: v.prototype.hA,
                set: v.prototype.NC
            });
            v.prototype.get_m_splitImpulsePenetrationThreshold = v.prototype.iA = function() {
                return ai(this.sx)
            };
            v.prototype.set_m_splitImpulsePenetrationThreshold = v.prototype.OC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                di(c, a)
            };
            Object.defineProperty(v.prototype, "m_splitImpulsePenetrationThreshold", {
                get: v.prototype.iA,
                set: v.prototype.OC
            });
            v.prototype.get_m_numIterations = v.prototype.Tz = function() {
                return $h(this.sx)
            };
            v.prototype.set_m_numIterations = v.prototype.yC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                ci(c, a)
            };
            Object.defineProperty(v.prototype, "m_numIterations", {
                get: v.prototype.Tz,
                set: v.prototype.yC
            });
            v.prototype.__destroy__ = function() {
                Zh(this.sx)
            };

            function hA(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                this.sx = void 0 === e ? Il(a, c, d) : void 0 === f ? _emscripten_bind_btGeneric6DofSpringConstraint_btGeneric6DofSpringConstraint_4(a, c, d, e) : Jl(a, c, d, e, f);
                m(hA)[this.sx] = this
            }
            hA.prototype = Object.create(gz.prototype);
            hA.prototype.constructor = hA;
            hA.prototype.tx = hA;
            hA.ux = {};
            g.btGeneric6DofSpringConstraint = hA;
            hA.prototype.enableSpring = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Ll(d, a, c)
            };
            hA.prototype.setStiffness = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Wl(d, a, c)
            };
            hA.prototype.setDamping = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Sl(d, a, c)
            };
            hA.prototype.setLinearLowerLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Tl(c, a)
            };
            hA.prototype.setLinearUpperLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ul(c, a)
            };
            hA.prototype.setAngularLowerLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Pl(c, a)
            };
            hA.prototype.setAngularUpperLimit = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Ql(c, a)
            };
            hA.prototype.getFrameOffsetA = function() {
                return n(Nl(this.sx), u)
            };
            hA.prototype.enableFeedback = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Kl(c, a)
            };
            hA.prototype.getBreakingImpulseThreshold = function() {
                return Ml(this.sx)
            };
            hA.prototype.setBreakingImpulseThreshold = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Rl(c, a)
            };
            hA.prototype.getParam = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                return Ol(d, a, c)
            };
            hA.prototype.setParam = function(a, c, d) {
                var e = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                Vl(e, a, c, d)
            };
            hA.prototype.__destroy__ = function() {
                Hl(this.sx)
            };

            function iA(a) {
                a && "object" === typeof a && (a = a.sx);
                this.sx = Uu(a);
                m(iA)[this.sx] = this
            }
            iA.prototype = Object.create(Sy.prototype);
            iA.prototype.constructor = iA;
            iA.prototype.tx = iA;
            iA.ux = {};
            g.btSphereShape = iA;
            iA.prototype.setMargin = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Zu(c, a)
            };
            iA.prototype.getMargin = function() {
                return Xu(this.sx)
            };
            iA.prototype.setLocalScaling = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Yu(c, a)
            };
            iA.prototype.getLocalScaling = function() {
                return n(Wu(this.sx), r)
            };
            iA.prototype.calculateLocalInertia = function(a, c) {
                var d = this.sx;
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                Vu(d, a, c)
            };
            iA.prototype.__destroy__ = function() {
                Tu(this.sx)
            };

            function Y(a, c, d, e, f) {
                a && "object" === typeof a && (a = a.sx);
                c && "object" === typeof c && (c = c.sx);
                d && "object" === typeof d && (d = d.sx);
                e && "object" === typeof e && (e = e.sx);
                f && "object" === typeof f && (f = f.sx);
                this.sx = zd(a, c, d, e, f);
                m(Y)[this.sx] = this
            }
            Y.prototype = Object.create(k.prototype);
            Y.prototype.constructor = Y;
            Y.prototype.tx = Y;
            Y.ux = {};
            g.LocalConvexResult = Y;
            Y.prototype.get_m_hitCollisionObject = Y.prototype.sz = function() {
                return n(Bd(this.sx), t)
            };
            Y.prototype.set_m_hitCollisionObject = Y.prototype.ZB = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Gd(c, a)
            };
            Object.defineProperty(Y.prototype, "m_hitCollisionObject", {
                get: Y.prototype.sz,
                set: Y.prototype.ZB
            });
            Y.prototype.get_m_localShapeInfo = Y.prototype.Mz = function() {
                return n(Fd(this.sx), rz)
            };
            Y.prototype.set_m_localShapeInfo = Y.prototype.rC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Kd(c, a)
            };
            Object.defineProperty(Y.prototype, "m_localShapeInfo", {
                get: Y.prototype.Mz,
                set: Y.prototype.rC
            });
            Y.prototype.get_m_hitNormalLocal = Y.prototype.wz = function() {
                return n(Dd(this.sx), r)
            };
            Y.prototype.set_m_hitNormalLocal = Y.prototype.bC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Id(c, a)
            };
            Object.defineProperty(Y.prototype, "m_hitNormalLocal", {
                get: Y.prototype.wz,
                set: Y.prototype.bC
            });
            Y.prototype.get_m_hitPointLocal = Y.prototype.yz = function() {
                return n(Ed(this.sx), r)
            };
            Y.prototype.set_m_hitPointLocal = Y.prototype.dC = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Jd(c, a)
            };
            Object.defineProperty(Y.prototype, "m_hitPointLocal", {
                get: Y.prototype.yz,
                set: Y.prototype.dC
            });
            Y.prototype.get_m_hitFraction = Y.prototype.uz = function() {
                return Cd(this.sx)
            };
            Y.prototype.set_m_hitFraction = Y.prototype.$B = function(a) {
                var c = this.sx;
                a && "object" === typeof a && (a = a.sx);
                Hd(c, a)
            };
            Object.defineProperty(Y.prototype, "m_hitFraction", {
                get: Y.prototype.uz,
                set: Y.prototype.$B
            });
            Y.prototype.__destroy__ = function() {
                Ad(this.sx)
            };
            (function() {
                function a() {
                    g.BT_CONSTRAINT_ERP = Gy();
                    g.BT_CONSTRAINT_STOP_ERP = Iy();
                    g.BT_CONSTRAINT_CFM = Fy();
                    g.BT_CONSTRAINT_STOP_CFM = Hy();
                    g.PHY_FLOAT = By();
                    g.PHY_DOUBLE = zy();
                    g.PHY_INTEGER = Cy();
                    g.PHY_SHORT = Dy();
                    g.PHY_FIXEDPOINT88 = Ay();
                    g.PHY_UCHAR = Ey()
                }
                Ca ? a() : Aa.unshift(a)
            })();
            this.Ammo = g;


            return Ammo
        }
    );
})();
if (typeof exports === 'object' && typeof module === 'object')
    module.exports = Ammo;
else if (typeof define === 'function' && define['amd'])
    define([], function() {
        return Ammo;
    });
else if (typeof exports === 'object')
    exports["Ammo"] = Ammo;