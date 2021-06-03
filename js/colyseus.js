var Colyseus = function(t) {
    function e(n) {
        if (r[n]) return r[n].exports;
        var i = r[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return t[n].call(i.exports, i, i.exports, e), i.l = !0, i.exports
    }
    var r = {};
    return e.m = t, e.c = r, e.d = function(t, r, n) {
        e.o(t, r) || Object.defineProperty(t, r, {
            configurable: !1,
            enumerable: !0,
            get: n
        })
    }, e.n = function(t) {
        var r = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return e.d(r, "a", r), r
    }, e.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, e.p = "", e(e.s = 9)
}([function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.encode = r(13), e.decode = r(14)
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    ! function(t) {
        t[t.USER_ID = 1] = "USER_ID", t[t.JOIN_ROOM = 10] = "JOIN_ROOM", t[t.JOIN_ERROR = 11] = "JOIN_ERROR", t[t.LEAVE_ROOM = 12] = "LEAVE_ROOM", t[t.ROOM_DATA = 13] = "ROOM_DATA", t[t.ROOM_STATE = 14] = "ROOM_STATE", t[t.ROOM_STATE_PATCH = 15] = "ROOM_STATE_PATCH", t[t.ROOM_LIST = 20] = "ROOM_LIST", t[t.BAD_REQUEST = 50] = "BAD_REQUEST"
    }(e.Protocol || (e.Protocol = {}))
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = r(3);
    e.OnceSignal = n.OnceSignal;
    var i = r(12);
    e.Signal = i.Signal;
    var o = r(5);
    e.Slot = o.Slot;
    var s = r(4);
    e.SlotList = s.SlotList
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = r(4),
        i = r(5),
        o = function() {
            function t() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                this.slots = n.SlotList.NIL, this.valueClasses = 1 === t.length && t[0] instanceof Array ? t[0] : t
            }
            return Object.defineProperty(t.prototype, "valueClasses", {
                get: function() {
                    return this._valueClasses
                },
                set: function(t) {
                    this._valueClasses = t ? t.slice() : [];
                    for (var e = this._valueClasses.length; e--;)
                        if (!(this._valueClasses[e] instanceof Object)) throw new Error("Invalid valueClasses argument: item at index " + e + " should be a Class but was:<" + this._valueClasses[e] + ">." + this._valueClasses[e])
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "numListeners", {
                get: function() {
                    return this.slots.length
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.addOnce = function(t) {
                return this.registerListener(t, !0)
            }, t.prototype.once = function(t) {
                return this.addOnce(t)
            }, t.prototype.remove = function(t) {
                var e = this.slots.find(t);
                return e ? (this.slots = this.slots.filterNot(t), e) : null
            }, t.prototype.removeAll = function() {
                this.slots = n.SlotList.NIL
            }, t.prototype.dispatch = function() {
                for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                var r = this._valueClasses.length,
                    n = t.length;
                if (n < r) throw new Error("Incorrect number of arguments. Expected at least " + r + " but received " + n + ".");
                for (var i = 0; i < r; i++)
                    if (!(null === t[i] || t[i] instanceof this._valueClasses[i] || t[i].constructor === this._valueClasses[i])) throw new Error("Value object <" + t[i] + "> is not an instance of <" + this._valueClasses[i] + ">.");
                var o = this.slots;
                if (o.nonEmpty)
                    for (; o.nonEmpty;) o.head.execute(t), o = o.tail
            }, t.prototype.registerListener = function(t, e) {
                if (void 0 === e && (e = !1), this.registrationPossible(t, e)) {
                    var r = new i.Slot(t, this, e);
                    return this.slots = this.slots.prepend(r), r
                }
                return this.slots.find(t)
            }, t.prototype.registrationPossible = function(t, e) {
                if (!this.slots.nonEmpty) return !0;
                var r = this.slots.find(t);
                if (!r) return !0;
                if (r.once !== e) throw new Error("You cannot addOnce() then add() the same listener without removing the relationship first.");
                return !1
            }, t
        }();
    e.OnceSignal = o
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = function() {
        function t(e, r) {
            if (void 0 === r && (r = null), this.nonEmpty = !1, e || r) {
                if (!e) throw new Error("Parameter head cannot be null.");
                this.head = e, this.tail = r || t.NIL, this.nonEmpty = !0
            } else {
                if (t.NIL) throw new Error("Parameters head and tail are null. Use the NIL element instead.");
                this.nonEmpty = !1
            }
        }
        return Object.defineProperty(t.prototype, "length", {
            get: function() {
                if (!this.nonEmpty) return 0;
                if (this.tail === t.NIL) return 1;
                for (var e = 0, r = this; r.nonEmpty;) ++e, r = r.tail;
                return e
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.prepend = function(e) {
            return new t(e, this)
        }, t.prototype.append = function(e) {
            if (!e) return this;
            if (!this.nonEmpty) return new t(e);
            if (this.tail === t.NIL) return new t(e).prepend(this.head);
            for (var r = new t(this.head), n = r, i = this.tail; i.nonEmpty;) n = n.tail = new t(i.head), i = i.tail;
            return n.tail = new t(e), r
        }, t.prototype.insertWithPriority = function(e) {
            if (!this.nonEmpty) return new t(e);
            var r = e.priority;
            if (r > this.head.priority) return this.prepend(e);
            for (var n = new t(this.head), i = n, o = this.tail; o.nonEmpty;) {
                if (r > o.head.priority) return i.tail = o.prepend(e), n;
                i = i.tail = new t(o.head), o = o.tail
            }
            return i.tail = new t(e), n
        }, t.prototype.filterNot = function(e) {
            if (!this.nonEmpty || null == e) return this;
            if (e === this.head.listener) return this.tail;
            for (var r = new t(this.head), n = r, i = this.tail; i.nonEmpty;) {
                if (i.head.listener === e) return n.tail = i.tail, r;
                n = n.tail = new t(i.head), i = i.tail
            }
            return this
        }, t.prototype.contains = function(t) {
            if (!this.nonEmpty) return !1;
            for (var e = this; e.nonEmpty;) {
                if (e.head.listener === t) return !0;
                e = e.tail
            }
            return !1
        }, t.prototype.find = function(t) {
            if (!this.nonEmpty) return null;
            for (var e = this; e.nonEmpty;) {
                if (e.head.listener === t) return e.head;
                e = e.tail
            }
            return null
        }, t.prototype.toString = function() {
            for (var t = "", e = this; e.nonEmpty;) t += e.head + " -> ", e = e.tail;
            return "[List " + (t += "NIL") + "]"
        }, t.NIL = new t(null, null), t
    }();
    e.SlotList = n
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = function() {
        function t(t, e, r, n) {
            void 0 === r && (r = !1), void 0 === n && (n = 0), this._enabled = !0, this._once = !1, this._priority = 0, this._listener = t, this._once = r, this._signal = e, this._priority = n, this.verifyListener(t)
        }
        return t.prototype.execute0 = function() {
            if (this._enabled) {
                if (this._once && this.remove(), this._params && this._params.length) return void this._listener.apply(null, this._params);
                this._listener()
            }
        }, t.prototype.execute1 = function(t) {
            if (this._enabled) {
                if (this._once && this.remove(), this._params && this._params.length) return void this._listener.apply(null, [t].concat(this._params));
                this._listener(t)
            }
        }, t.prototype.execute = function(t) {
            if (this._enabled) {
                this._once && this.remove(), this._params && this._params.length && (t = t.concat(this._params));
                var e = t.length;
                0 === e ? this._listener() : 1 === e ? this._listener(t[0]) : 2 === e ? this._listener(t[0], t[1]) : 3 === e ? this._listener(t[0], t[1], t[2]) : this._listener.apply(null, t)
            }
        }, Object.defineProperty(t.prototype, "listener", {
            get: function() {
                return this._listener
            },
            set: function(t) {
                if (null == t) throw new Error("Given listener is null.\nDid you want to set enabled to false instead?");
                this.verifyListener(t), this._listener = t
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "once", {
            get: function() {
                return this._once
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "priority", {
            get: function() {
                return this._priority
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.toString = function() {
            return "[Slot listener: " + this._listener + ", once: " + this._once + ", priority: " + this._priority + ", enabled: " + this._enabled + "]"
        }, Object.defineProperty(t.prototype, "enabled", {
            get: function() {
                return this._enabled
            },
            set: function(t) {
                this._enabled = t
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t.prototype, "params", {
            get: function() {
                return this._params
            },
            set: function(t) {
                this._params = t
            },
            enumerable: !0,
            configurable: !0
        }), t.prototype.remove = function() {
            this._signal.remove(this._listener)
        }, t.prototype.verifyListener = function(t) {
            if (null == t) throw new Error("Given listener is null.");
            if (null == this._signal) throw new Error("Internal signal reference has not been set yet.")
        }, t
    }();
    e.Slot = n
}, function(t, e, r) {
    "use strict";
    (function(t) {
        var n = this && this.__extends || function() {
            var t = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(t, e) {
                t.__proto__ = e
            } || function(t, e) {
                for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
            };
            return function(e, r) {
                function n() {
                    this.constructor = e
                }
                t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
            }
        }();
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = r(23),
            o = r(2),
            s = r(24),
            a = r(27),
            u = r(0),
            f = r(1),
            h = r(7);
        e.RECONNECTION_KEY = "reconnection";
        var c = function(r) {
            function s(t, e) {
                var n = r.call(this, {}) || this;
                return n.clock = new i, n.remoteClock = new i, n.onJoin = new o.Signal, n.onStateChange = new o.Signal, n.onMessage = new o.Signal, n.onError = new o.Signal, n.onLeave = new o.Signal, n.id = null, n.name = t, n.options = e, n.onLeave.add(function() {
                    n.refreshAutoReconnection(), n.removeAllListeners()
                }), n
            }
            return n(s, r), s.prototype.connect = function(t) {
                var e = this;
                this.connection = t, this.connection.reconnectEnabled = !1, this.connection.onmessage = this.onMessageCallback.bind(this), this.connection.onclose = function(t) {
                    return e.onLeave.dispatch(t)
                }, this.connection.onerror = function(t) {
                    console.warn("Possible causes: room's onAuth() failed or maxClients has been reached."), e.onError.dispatch(t)
                }
            }, s.prototype.leave = function() {
                this.connection ? this.connection.close() : this.onLeave.dispatch()
            }, s.prototype.send = function(t) {
                this.connection.send([f.Protocol.ROOM_DATA, this.id, t])
            }, s.prototype.removeAllListeners = function() {
                r.prototype.removeAllListeners.call(this), this.onJoin.removeAll(), this.onStateChange.removeAll(), this.onMessage.removeAll(), this.onError.removeAll(), this.onLeave.removeAll()
            }, s.prototype.onMessageCallback = function(t) {
                var e = u.decode(new Uint8Array(t.data)),
                    r = e[0];
                if (r === f.Protocol.JOIN_ROOM) this.sessionId = e[1], this.refreshAutoReconnection(), this.onJoin.dispatch();
                else if (r === f.Protocol.JOIN_ERROR) console.error("Error: " + e[1]), this.onError.dispatch(e[1]);
                else if (r === f.Protocol.ROOM_STATE) {
                    var n = e[1],
                        i = e[2],
                        o = e[3];
                    this.setState(n, i, o)
                } else r === f.Protocol.ROOM_STATE_PATCH ? this.patch(e[1]) : r === f.Protocol.ROOM_DATA ? this.onMessage.dispatch(e[1]) : r === f.Protocol.LEAVE_ROOM && this.leave()
            }, s.prototype.refreshAutoReconnection = function() {
                h.setItem(e.RECONNECTION_KEY, this.sessionId)
            }, s.prototype.setState = function(t, e, r) {
                var n = u.decode(t);
                this.set(n), this._previousState = new Uint8Array(t), e && r && (this.remoteClock.currentTime = e, this.remoteClock.elapsedTime = r), this.clock.start(), this.onStateChange.dispatch(n)
            }, s.prototype.patch = function(e) {
                this._previousState = t.from(a.apply(this._previousState, e)), this.set(u.decode(this._previousState)), this.onStateChange.dispatch(this.state)
            }, s
        }(s.StateContainer);
        e.Room = c
    }).call(e, r(18).Buffer)
}, function(t, e, r) {
    "use strict";

    function n(t, e) {
        o.setItem(t, e)
    }

    function i(t, e) {
        var r = o.getItem("colyseusid");
        "undefined" != typeof Promise && r instanceof Promise ? r.then(function(t) {
            return e(t)
        }) : e(r)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = "undefined" != typeof cc && cc.sys && cc.sys.localStorage ? cc.sys.localStorage : window.localStorage;
    e.setItem = n, e.getItem = i
}, function(t, e, r) {
    "use strict";

    function n(t, e) {
        l(t, e, e)
    }

    function i(t, e, r) {
        return h(t, "map", e, r)
    }

    function o(t, e, r) {
        return h(t, "object", e, r)
    }

    function s(t, e, r) {
        return h(t, "var")
    }

    function a(t, e, r) {
        return h(t, "list", e, r)
    }

    function u() {
        return h(void 0, "key")
    }

    function f() {
        return function(t, e) {
            Object.defineProperty(t, e, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return t.constructor.$room
                }
            })
        }
    }

    function h(t, e, r, n) {
        return void 0 === e && (e = "var"),
            function(i, o) {
                i.constructor.properties || (i.constructor.properties = {});
                var s = o;
                "string" == typeof t && (s = o, o = t, t = void 0), i.constructor.properties[o] = {
                    addCallback: r,
                    holderType: e,
                    removeCallback: n,
                    type: t,
                    variable: s
                }
            }
    }

    function c(t, e) {
        return function(r, n, i) {
            r.constructor.listeners || (r.constructor.listeners = {}), r.constructor.listeners[t] = {
                methodName: n,
                op: e
            }
        }
    }

    function l(t, e, r, n) {
        p(e.constructor.properties || e.properties, t, e, r, n), y(e.constructor.listeners, t, e)
    }

    function p(t, e, r, n, i) {
        if (t) {
            Object.defineProperty(r, "$room", {
                configurable: !0,
                enumerable: !1,
                value: e,
                writable: !0
            }), r.$room = e;
            for (var o in t)
                if (t.hasOwnProperty(o)) {
                    var s = t[o],
                        a = i ? i + "/" + o : o;
                    if ("map" === s.holderType && (a += "/:id"), v[a]) return;
                    v[a] = !0;
                    var u = d[s.holderType + "Listener"];
                    u && (e.listen(a, u(e, s, r, n, a)), s.type && l(e, s.type, r, a))
                }
        }
    }

    function y(t, e, r) {
        if (t) {
            for (var n in t) ! function(n) {
                if (!t.hasOwnProperty(n)) return "continue";
                var i = t[n],
                    o = i.op ? function(t) {
                        t.operation === i.op && r[i.methodName](t)
                    } : r[i.methodName].bind(r);
                e.listen(n, o)
            }(n)
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var d = r(28);
    e.initializeSync = n, e.syncMap = i, e.syncObject = o, e.syncVar = s, e.syncList = a, e.key = u, e.room = f, e.sync = h, e.listen = c;
    var v = {};
    e.createBindings = l, e.bindListeners = y
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), r(10);
    var n = r(11);
    e.Client = n.Client;
    var i = r(1);
    e.Protocol = i.Protocol;
    var o = r(6);
    e.Room = o.Room;
    var s = r(8);
    e.initializeSync = s.initializeSync, e.sync = s.sync, e.syncMap = s.syncMap, e.syncObject = s.syncObject, e.syncVar = s.syncVar, e.syncList = s.syncList, e.key = s.key, e.room = s.room, e.listen = s.listen
}, function(t, e) {
    ArrayBuffer.isView || (ArrayBuffer.isView = function(t) {
        return null !== t && "object" == typeof t && t.buffer instanceof ArrayBuffer
    })
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = r(2),
        i = r(0),
        o = r(15),
        s = r(1),
        a = r(6),
        u = r(7),
        f = function() {
            function t(t) {
                var e = this;
                this.onOpen = new n.Signal, this.onMessage = new n.Signal, this.onClose = new n.Signal, this.onError = new n.Signal, this.rooms = {}, this.connectingRooms = {}, this.requestId = 0, this.roomsAvailableRequests = {}, this.hostname = t, u.getItem("colyseusid", function(t) {
                    return e.connect(t)
                })
            }
            return t.prototype.join = function(t, e) {
                var r = this;
                void 0 === e && (e = {}), e.requestId = ++this.requestId;
                var n = new a.Room(t, e);
                return n.onLeave.addOnce(function() {
                    delete r.rooms[n.id], delete r.connectingRooms[e.requestId]
                }), this.connectingRooms[e.requestId] = n, u.getItem(a.RECONNECTION_KEY, function(n) {
                    n && (e.sessionId = n), r.connection.send([s.Protocol.JOIN_ROOM, t, e])
                }), n
            }, t.prototype.getAvailableRooms = function(t, e) {
                var r = this,
                    n = ++this.requestId,
                    i = function() {
                        return delete r.roomsAvailableRequests[n]
                    },
                    o = setTimeout(function() {
                        i(), e([], "timeout")
                    }, 1e4);
                this.connection.send([s.Protocol.ROOM_LIST, n, t]), this.roomsAvailableRequests[n] = function(t) {
                    i(), clearTimeout(o), e(t)
                }
            }, t.prototype.close = function() {
                this.connection.close()
            }, t.prototype.connect = function(t) {
                var e = this;
                this.id = t || "", this.connection = this.createConnection(), this.connection.onmessage = this.onMessageCallback.bind(this), this.connection.onclose = function(t) {
                    return e.onClose.dispatch(t)
                }, this.connection.onerror = function(t) {
                    return e.onError.dispatch(t)
                }, this.connection.onopen = function() {
                    e.id && e.onOpen.dispatch()
                }
            }, t.prototype.createConnection = function(t, e) {
                void 0 === t && (t = ""), void 0 === e && (e = {});
                var r = ["colyseusid=" + this.id];
                for (var n in e) e.hasOwnProperty(n) && r.push(n + "=" + e[n]);
                return new o.Connection(this.hostname + "/" + t + "?" + r.join("&"))
            }, t.prototype.onMessageCallback = function(t) {
                var e = i.decode(new Uint8Array(t.data)),
                    r = e[0];
                if (r === s.Protocol.USER_ID) u.setItem("colyseusid", e[1]), this.id = e[1], this.onOpen.dispatch();
                else if (r === s.Protocol.JOIN_ROOM) {
                    var n = e[2],
                        o = this.connectingRooms[n];
                    if (!o) return void console.warn("colyseus.js: client left room before receiving session id.");
                    o.id = e[1], this.rooms[o.id] = o, o.connect(this.createConnection(o.id, o.options)), delete this.connectingRooms[n]
                } else r === s.Protocol.JOIN_ERROR ? (console.error("colyseus.js: server error:", e[2]), this.onError.dispatch(e[2])) : r === s.Protocol.ROOM_LIST ? this.roomsAvailableRequests[e[1]] ? this.roomsAvailableRequests[e[1]](e[2]) : console.warn("receiving ROOM_LIST after timeout:", e[2]) : this.onMessage.dispatch(e)
            }, t
        }();
    e.Client = f
}, function(t, e, r) {
    "use strict";
    var n = this && this.__extends || function() {
        var t = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(t, e) {
            t.__proto__ = e
        } || function(t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        };
        return function(e, r) {
            function n() {
                this.constructor = e
            }
            t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
        }
    }();
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = r(3),
        o = function(t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }
            return n(e, t), e.prototype.add = function(t) {
                return this.registerListener(t)
            }, e
        }(i.OnceSignal);
    e.Signal = o
}, function(t, e, r) {
    "use strict";

    function n(t, e, r) {
        for (var n = 0, i = 0, o = r.length; i < o; i++) n = r.charCodeAt(i), n < 128 ? t.setUint8(e++, n) : n < 2048 ? (t.setUint8(e++, 192 | n >> 6), t.setUint8(e++, 128 | 63 & n)) : n < 55296 || n >= 57344 ? (t.setUint8(e++, 224 | n >> 12), t.setUint8(e++, 128 | n >> 6 & 63), t.setUint8(e++, 128 | 63 & n)) : (i++, n = 65536 + ((1023 & n) << 10 | 1023 & r.charCodeAt(i)), t.setUint8(e++, 240 | n >> 18), t.setUint8(e++, 128 | n >> 12 & 63), t.setUint8(e++, 128 | n >> 6 & 63), t.setUint8(e++, 128 | 63 & n))
    }

    function i(t) {
        for (var e = 0, r = 0, n = 0, i = t.length; n < i; n++) e = t.charCodeAt(n), e < 128 ? r += 1 : e < 2048 ? r += 2 : e < 55296 || e >= 57344 ? r += 3 : (n++, r += 4);
        return r
    }

    function o(t, e, r) {
        var n = typeof r,
            s = 0,
            a = 0,
            u = 0,
            f = 0,
            h = 0,
            c = 0;
        if ("string" === n) {
            if ((h = i(r)) < 32) t.push(160 | h), c = 1;
            else if (h < 256) t.push(217, h), c = 2;
            else if (h < 65536) t.push(218, h >> 8, h), c = 3;
            else {
                if (!(h < 4294967296)) throw new Error("String too long");
                t.push(219, h >> 24, h >> 16, h >> 8, h), c = 5
            }
            return e.push({
                str: r,
                length: h,
                offset: t.length
            }), c + h
        }
        if ("number" === n) return Math.floor(r) === r && isFinite(r) ? r >= 0 ? r < 128 ? (t.push(r), 1) : r < 256 ? (t.push(204, r), 2) : r < 65536 ? (t.push(205, r >> 8, r), 3) : r < 4294967296 ? (t.push(206, r >> 24, r >> 16, r >> 8, r), 5) : (u = r / Math.pow(2, 32) >> 0, f = r >>> 0, t.push(207, u >> 24, u >> 16, u >> 8, u, f >> 24, f >> 16, f >> 8, f), 9) : r >= -32 ? (t.push(r), 1) : r >= -128 ? (t.push(208, r), 2) : r >= -32768 ? (t.push(209, r >> 8, r), 3) : r >= -2147483648 ? (t.push(210, r >> 24, r >> 16, r >> 8, r), 5) : (u = Math.floor(r / Math.pow(2, 32)), f = r >>> 0, t.push(211, u >> 24, u >> 16, u >> 8, u, f >> 24, f >> 16, f >> 8, f), 9) : (t.push(203), e.push({
            float: r,
            length: 8,
            offset: t.length
        }), 9);
        if ("object" === n) {
            if (null === r) return t.push(192), 1;
            if (Array.isArray(r)) {
                if ((h = r.length) < 16) t.push(144 | h), c = 1;
                else if (h < 65536) t.push(220, h >> 8, h), c = 3;
                else {
                    if (!(h < 4294967296)) throw new Error("Array too large");
                    t.push(221, h >> 24, h >> 16, h >> 8, h), c = 5
                }
                for (s = 0; s < h; s++) c += o(t, e, r[s]);
                return c
            }
            if (r instanceof Date) {
                var l = r.getTime();
                return u = Math.floor(l / Math.pow(2, 32)), f = l >>> 0, t.push(215, 0, u >> 24, u >> 16, u >> 8, u, f >> 24, f >> 16, f >> 8, f), 10
            }
            if (r instanceof ArrayBuffer) {
                if ((h = r.byteLength) < 256) t.push(196, h), c = 2;
                else if (h < 65536) t.push(197, h >> 8, h), c = 3;
                else {
                    if (!(h < 4294967296)) throw new Error("Buffer too large");
                    t.push(198, h >> 24, h >> 16, h >> 8, h), c = 5
                }
                return e.push({
                    bin: r,
                    length: h,
                    offset: t.length
                }), c + h
            }
            if ("function" == typeof r.toJSON) return o(t, e, r.toJSON());
            var p = [],
                y = "",
                d = Object.keys(r);
            for (s = 0, a = d.length; s < a; s++) y = d[s], "function" != typeof r[y] && p.push(y);
            if ((h = p.length) < 16) t.push(128 | h), c = 1;
            else if (h < 65536) t.push(222, h >> 8, h), c = 3;
            else {
                if (!(h < 4294967296)) throw new Error("Object too large");
                t.push(223, h >> 24, h >> 16, h >> 8, h), c = 5
            }
            for (s = 0; s < h; s++) y = p[s], c += o(t, e, y), c += o(t, e, r[y]);
            return c
        }
        if ("boolean" === n) return t.push(r ? 195 : 194), 1;
        if ("undefined" === n) return t.push(212, 0, 0), 3;
        throw new Error("Could not encode")
    }

    function s(t) {
        var e = [],
            r = [],
            i = o(e, r, t),
            s = new ArrayBuffer(i),
            a = new DataView(s),
            u = 0,
            f = 0,
            h = -1;
        r.length > 0 && (h = r[0].offset);
        for (var c, l = 0, p = 0, y = 0, d = e.length; y < d; y++)
            if (a.setUint8(f + y, e[y]), y + 1 === h) {
                if (c = r[u], l = c.length, p = f + h, c.bin)
                    for (var v = new Uint8Array(c.bin), g = 0; g < l; g++) a.setUint8(p + g, v[g]);
                else c.str ? n(a, p, c.str) : void 0 !== c.float && a.setFloat64(p, c.float);
                u++, f += l, r[u] && (h = r[u].offset)
            }
        return s
    }
    t.exports = s
}, function(t, e, r) {
    "use strict";

    function n(t) {
        if (this.offset = 0, t instanceof ArrayBuffer) this.buffer = t, this.view = new DataView(this.buffer);
        else {
            if (!ArrayBuffer.isView(t)) throw new Error("Invalid argument");
            this.buffer = t.buffer, this.view = new DataView(this.buffer, t.byteOffset, t.byteLength)
        }
    }

    function i(t, e, r) {
        for (var n = "", i = 0, o = e, s = e + r; o < s; o++) {
            var a = t.getUint8(o);
            if (0 != (128 & a))
                if (192 != (224 & a))
                    if (224 != (240 & a)) {
                        if (240 != (248 & a)) throw new Error("Invalid byte " + a.toString(16));
                        i = (7 & a) << 18 | (63 & t.getUint8(++o)) << 12 | (63 & t.getUint8(++o)) << 6 | (63 & t.getUint8(++o)) << 0, i >= 65536 ? (i -= 65536, n += String.fromCharCode(55296 + (i >>> 10), 56320 + (1023 & i))) : n += String.fromCharCode(i)
                    } else n += String.fromCharCode((15 & a) << 12 | (63 & t.getUint8(++o)) << 6 | (63 & t.getUint8(++o)) << 0);
            else n += String.fromCharCode((31 & a) << 6 | 63 & t.getUint8(++o));
            else n += String.fromCharCode(a)
        }
        return n
    }

    function o(t) {
        var e = new n(t),
            r = e.parse();
        if (e.offset !== t.byteLength) throw new Error(t.byteLength - e.offset + " trailing bytes");
        return r
    }
    n.prototype.array = function(t) {
        for (var e = new Array(t), r = 0; r < t; r++) e[r] = this.parse();
        return e
    }, n.prototype.map = function(t) {
        for (var e = "", r = {}, n = 0; n < t; n++) e = this.parse(), r[e] = this.parse();
        return r
    }, n.prototype.str = function(t) {
        var e = i(this.view, this.offset, t);
        return this.offset += t, e
    }, n.prototype.bin = function(t) {
        var e = this.buffer.slice(this.offset, this.offset + t);
        return this.offset += t, e
    }, n.prototype.parse = function() {
        var t, e = this.view.getUint8(this.offset++),
            r = 0,
            n = 0,
            i = 0,
            o = 0;
        if (e < 192) return e < 128 ? e : e < 144 ? this.map(15 & e) : e < 160 ? this.array(15 & e) : this.str(31 & e);
        if (e > 223) return -1 * (255 - e + 1);
        switch (e) {
            case 192:
                return null;
            case 194:
                return !1;
            case 195:
                return !0;
            case 196:
                return r = this.view.getUint8(this.offset), this.offset += 1, this.bin(r);
            case 197:
                return r = this.view.getUint16(this.offset), this.offset += 2, this.bin(r);
            case 198:
                return r = this.view.getUint32(this.offset), this.offset += 4, this.bin(r);
            case 199:
                return r = this.view.getUint8(this.offset), n = this.view.getInt8(this.offset + 1), this.offset += 2, [n, this.bin(r)];
            case 200:
                return r = this.view.getUint16(this.offset), n = this.view.getInt8(this.offset + 2), this.offset += 3, [n, this.bin(r)];
            case 201:
                return r = this.view.getUint32(this.offset), n = this.view.getInt8(this.offset + 4), this.offset += 5, [n, this.bin(r)];
            case 202:
                return t = this.view.getFloat32(this.offset), this.offset += 4, t;
            case 203:
                return t = this.view.getFloat64(this.offset), this.offset += 8, t;
            case 204:
                return t = this.view.getUint8(this.offset), this.offset += 1, t;
            case 205:
                return t = this.view.getUint16(this.offset), this.offset += 2, t;
            case 206:
                return t = this.view.getUint32(this.offset), this.offset += 4, t;
            case 207:
                return i = this.view.getUint32(this.offset) * Math.pow(2, 32), o = this.view.getUint32(this.offset + 4), this.offset += 8, i + o;
            case 208:
                return t = this.view.getInt8(this.offset), this.offset += 1, t;
            case 209:
                return t = this.view.getInt16(this.offset), this.offset += 2, t;
            case 210:
                return t = this.view.getInt32(this.offset), this.offset += 4, t;
            case 211:
                return i = this.view.getInt32(this.offset) * Math.pow(2, 32), o = this.view.getUint32(this.offset + 4), this.offset += 8, i + o;
            case 212:
                return n = this.view.getInt8(this.offset), this.offset += 1, 0 === n ? void(this.offset += 1) : [n, this.bin(1)];
            case 213:
                return n = this.view.getInt8(this.offset), this.offset += 1, [n, this.bin(2)];
            case 214:
                return n = this.view.getInt8(this.offset), this.offset += 1, [n, this.bin(4)];
            case 215:
                return n = this.view.getInt8(this.offset), this.offset += 1, 0 === n ? (i = this.view.getInt32(this.offset) * Math.pow(2, 32), o = this.view.getUint32(this.offset + 4), this.offset += 8, new Date(i + o)) : [n, this.bin(8)];
            case 216:
                return n = this.view.getInt8(this.offset), this.offset += 1, [n, this.bin(16)];
            case 217:
                return r = this.view.getUint8(this.offset), this.offset += 1, this.str(r);
            case 218:
                return r = this.view.getUint16(this.offset), this.offset += 2, this.str(r);
            case 219:
                return r = this.view.getUint32(this.offset), this.offset += 4, this.str(r);
            case 220:
                return r = this.view.getUint16(this.offset), this.offset += 2, this.array(r);
            case 221:
                return r = this.view.getUint32(this.offset), this.offset += 4, this.array(r);
            case 222:
                return r = this.view.getUint16(this.offset), this.offset += 2, this.map(r);
            case 223:
                return r = this.view.getUint32(this.offset), this.offset += 4, this.map(r)
        }
        throw new Error("Could not parse")
    }, t.exports = o
}, function(t, e, r) {
    "use strict";
    var n = this && this.__extends || function() {
        var t = Object.setPrototypeOf || {
            __proto__: []
        }
        instanceof Array && function(t, e) {
            t.__proto__ = e
        } || function(t, e) {
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
        };
        return function(e, r) {
            function n() {
                this.constructor = e
            }
            t(e, r), e.prototype = null === r ? Object.create(r) : (n.prototype = r.prototype, new n)
        }
    }();
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = r(16),
        o = r(0),
        s = function(t) {
            function e(e, r) {
                void 0 === r && (r = {});
                var n = t.call(this, e) || this;
                return n._enqueuedCalls = [], n.binaryType = "arraybuffer", n
            }
            return n(e, t), e.prototype.onOpenCallback = function(e) {
                if (t.prototype.onOpenCallback.call(this), this._enqueuedCalls.length > 0)
                    for (var r = 0, n = this._enqueuedCalls; r < n.length; r++) {
                        var i = n[r],
                            o = i[0],
                            s = i[1];
                        this[o].apply(this, s)
                    }
            }, e.prototype.send = function(e) {
                if (this.ws.readyState === WebSocket.OPEN) return t.prototype.send.call(this, o.encode(e));
                console.warn("colyseus.js: trying to send data while in " + this.ws.readyState + " state"), this._enqueuedCalls.push(["send", [e]])
            }, e
        }(i.default);
    e.Connection = s
}, function(t, e, r) {
    "use strict";

    function n(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var i = function() {
            function t(t, e) {
                for (var r = 0; r < e.length; r++) {
                    var n = e[r];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, r, n) {
                return r && t(e.prototype, r), n && t(e, n), e
            }
        }(),
        o = r(17).createBackoff,
        s = function() {
            function t(e, r) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                n(this, t), this.url = e, this.protocols = r, this.reconnectEnabled = !0, this.listeners = {}, this.backoff = o(i.backoff || "exponential", i), this.backoff.onReady = this.onBackoffReady.bind(this), this.open()
            }
            return i(t, [{
                key: "open",
                value: function() {
                    var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
                    this.isReconnect = t;
                    var e = this.ws && this.ws.binaryType;
                    this.ws = new WebSocket(this.url, this.protocols), this.ws.onclose = this.onCloseCallback.bind(this), this.ws.onerror = this.onErrorCallback.bind(this), this.ws.onmessage = this.onMessageCallback.bind(this), this.ws.onopen = this.onOpenCallback.bind(this), e && (this.ws.binaryType = e)
                }
            }, {
                key: "onBackoffReady",
                value: function(t, e) {
                    this.open(!0)
                }
            }, {
                key: "onCloseCallback",
                value: function(t) {
                    !this.isReconnect && this.listeners.onclose && this.listeners.onclose.apply(null, arguments), this.reconnectEnabled && t.code < 3e3 && this.backoff.backoff()
                }
            }, {
                key: "onErrorCallback",
                value: function() {
                    this.listeners.onerror && this.listeners.onerror.apply(null, arguments)
                }
            }, {
                key: "onMessageCallback",
                value: function() {
                    this.listeners.onmessage && this.listeners.onmessage.apply(null, arguments)
                }
            }, {
                key: "onOpenCallback",
                value: function() {
                    this.listeners.onopen && this.listeners.onopen.apply(null, arguments), this.isReconnect && this.listeners.onreconnect && this.listeners.onreconnect.apply(null, arguments), this.isReconnect = !1
                }
            }, {
                key: "close",
                value: function(t, e) {
                    void 0 === t && (t = 1e3), this.reconnectEnabled = !1, this.ws.close(t, e)
                }
            }, {
                key: "send",
                value: function(t) {
                    this.ws.send(t)
                }
            }, {
                key: "bufferedAmount",
                get: function() {
                    return this.ws.bufferedAmount
                }
            }, {
                key: "readyState",
                get: function() {
                    return this.ws.readyState
                }
            }, {
                key: "binaryType",
                get: function() {
                    return this.ws.binaryType
                },
                set: function(t) {
                    this.ws.binaryType = t
                }
            }, {
                key: "extensions",
                get: function() {
                    return this.ws.extensions
                },
                set: function(t) {
                    this.ws.extensions = t
                }
            }, {
                key: "protocol",
                get: function() {
                    return this.ws.protocol
                },
                set: function(t) {
                    this.ws.protocol = t
                }
            }, {
                key: "onclose",
                set: function(t) {
                    this.listeners.onclose = t
                },
                get: function() {
                    return this.listeners.onclose
                }
            }, {
                key: "onerror",
                set: function(t) {
                    this.listeners.onerror = t
                },
                get: function() {
                    return this.listeners.onerror
                }
            }, {
                key: "onmessage",
                set: function(t) {
                    this.listeners.onmessage = t
                },
                get: function() {
                    return this.listeners.onmessage
                }
            }, {
                key: "onopen",
                set: function(t) {
                    this.listeners.onopen = t
                },
                get: function() {
                    return this.listeners.onopen
                }
            }, {
                key: "onreconnect",
                set: function(t) {
                    this.listeners.onreconnect = t
                },
                get: function() {
                    return this.listeners.onreconnect
                }
            }]), t
        }();
    s.CONNECTING = WebSocket.CONNECTING, s.OPEN = WebSocket.OPEN, s.CLOSING = WebSocket.CLOSING, s.CLOSED = WebSocket.CLOSED, e.default = s
}, function(t, e, r) {
    "use strict";

    function n(t, e) {
        return new i(o[t], e)
    }

    function i(t, e) {
        this.func = t, this.attempts = 0, this.delay = void 0 !== e.initialDelay ? e.initialDelay : 100
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.createBackoff = n;
    var o = {
        exponential: function(t, e) {
            return Math.floor(Math.random() * Math.pow(2, t) * e)
        },
        fibonacci: function(t, e) {
            var r = 1;
            if (t > r)
                for (var n = 1, r = 2, i = 2; i < t; i++) {
                    var o = n + r;
                    n = r, r = o
                }
            return Math.floor(Math.random() * r * e)
        }
    };
    i.prototype.backoff = function() {
        setTimeout(this.onReady, this.func(++this.attempts, this.delay))
    }
}, function(t, e, r) {
    "use strict";
    (function(t) {
        function n() {
            return o.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
        }

        function i(t, e) {
            if (n() < e) throw new RangeError("Invalid typed array length");
            return o.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e), t.__proto__ = o.prototype) : (null === t && (t = new o(e)), t.length = e), t
        }

        function o(t, e, r) {
            if (!(o.TYPED_ARRAY_SUPPORT || this instanceof o)) return new o(t, e, r);
            if ("number" == typeof t) {
                if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                return f(this, t)
            }
            return s(this, t, e, r)
        }

        function s(t, e, r, n) {
            if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? l(t, e, r, n) : "string" == typeof e ? h(t, e, r) : p(t, e)
        }

        function a(t) {
            if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
            if (t < 0) throw new RangeError('"size" argument must not be negative')
        }

        function u(t, e, r, n) {
            return a(e), e <= 0 ? i(t, e) : void 0 !== r ? "string" == typeof n ? i(t, e).fill(r, n) : i(t, e).fill(r) : i(t, e)
        }

        function f(t, e) {
            if (a(e), t = i(t, e < 0 ? 0 : 0 | y(e)), !o.TYPED_ARRAY_SUPPORT)
                for (var r = 0; r < e; ++r) t[r] = 0;
            return t
        }

        function h(t, e, r) {
            if ("string" == typeof r && "" !== r || (r = "utf8"), !o.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
            var n = 0 | v(e, r);
            t = i(t, n);
            var s = t.write(e, r);
            return s !== n && (t = t.slice(0, s)), t
        }

        function c(t, e) {
            var r = e.length < 0 ? 0 : 0 | y(e.length);
            t = i(t, r);
            for (var n = 0; n < r; n += 1) t[n] = 255 & e[n];
            return t
        }

        function l(t, e, r, n) {
            if (e.byteLength, r < 0 || e.byteLength < r) throw new RangeError("'offset' is out of bounds");
            if (e.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
            return e = void 0 === r && void 0 === n ? new Uint8Array(e) : void 0 === n ? new Uint8Array(e, r) : new Uint8Array(e, r, n), o.TYPED_ARRAY_SUPPORT ? (t = e, t.__proto__ = o.prototype) : t = c(t, e), t
        }

        function p(t, e) {
            if (o.isBuffer(e)) {
                var r = 0 | y(e.length);
                return t = i(t, r), 0 === t.length ? t : (e.copy(t, 0, 0, r), t)
            }
            if (e) {
                if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || H(e.length) ? i(t, 0) : c(t, e);
                if ("Buffer" === e.type && X(e.data)) return c(t, e.data)
            }
            throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
        }

        function y(t) {
            if (t >= n()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + n().toString(16) + " bytes");
            return 0 | t
        }

        function d(t) {
            return +t != t && (t = 0), o.alloc(+t)
        }

        function v(t, e) {
            if (o.isBuffer(t)) return t.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
            "string" != typeof t && (t = "" + t);
            var r = t.length;
            if (0 === r) return 0;
            for (var n = !1;;) switch (e) {
                case "ascii":
                case "latin1":
                case "binary":
                    return r;
                case "utf8":
                case "utf-8":
                case void 0:
                    return J(t).length;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return 2 * r;
                case "hex":
                    return r >>> 1;
                case "base64":
                    return $(t).length;
                default:
                    if (n) return J(t).length;
                    e = ("" + e).toLowerCase(), n = !0
            }
        }

        function g(t, e, r) {
            var n = !1;
            if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
            if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
            if (r >>>= 0, e >>>= 0, r <= e) return "";
            for (t || (t = "utf8");;) switch (t) {
                case "hex":
                    return M(this, e, r);
                case "utf8":
                case "utf-8":
                    return S(this, e, r);
                case "ascii":
                    return T(this, e, r);
                case "latin1":
                case "binary":
                    return U(this, e, r);
                case "base64":
                    return C(this, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return k(this, e, r);
                default:
                    if (n) throw new TypeError("Unknown encoding: " + t);
                    t = (t + "").toLowerCase(), n = !0
            }
        }

        function w(t, e, r) {
            var n = t[e];
            t[e] = t[r], t[r] = n
        }

        function b(t, e, r, n, i) {
            if (0 === t.length) return -1;
            if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, isNaN(r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                if (i) return -1;
                r = t.length - 1
            } else if (r < 0) {
                if (!i) return -1;
                r = 0
            }
            if ("string" == typeof e && (e = o.from(e, n)), o.isBuffer(e)) return 0 === e.length ? -1 : m(t, e, r, n, i);
            if ("number" == typeof e) return e &= 255, o.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : m(t, [e], r, n, i);
            throw new TypeError("val must be string, number or Buffer")
        }

        function m(t, e, r, n, i) {
            function o(t, e) {
                return 1 === s ? t[e] : t.readUInt16BE(e * s)
            }
            var s = 1,
                a = t.length,
                u = e.length;
            if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (t.length < 2 || e.length < 2) return -1;
                s = 2, a /= 2, u /= 2, r /= 2
            }
            var f;
            if (i) {
                var h = -1;
                for (f = r; f < a; f++)
                    if (o(t, f) === o(e, -1 === h ? 0 : f - h)) {
                        if (-1 === h && (h = f), f - h + 1 === u) return h * s
                    } else -1 !== h && (f -= f - h), h = -1
            } else
                for (r + u > a && (r = a - u), f = r; f >= 0; f--) {
                    for (var c = !0, l = 0; l < u; l++)
                        if (o(t, f + l) !== o(e, l)) {
                            c = !1;
                            break
                        }
                    if (c) return f
                }
            return -1
        }

        function _(t, e, r, n) {
            r = Number(r) || 0;
            var i = t.length - r;
            n ? (n = Number(n)) > i && (n = i) : n = i;
            var o = e.length;
            if (o % 2 != 0) throw new TypeError("Invalid hex string");
            n > o / 2 && (n = o / 2);
            for (var s = 0; s < n; ++s) {
                var a = parseInt(e.substr(2 * s, 2), 16);
                if (isNaN(a)) return s;
                t[r + s] = a
            }
            return s
        }

        function E(t, e, r, n) {
            return G(J(e, t.length - r), t, r, n)
        }

        function A(t, e, r, n) {
            return G(F(e), t, r, n)
        }

        function O(t, e, r, n) {
            return A(t, e, r, n)
        }

        function P(t, e, r, n) {
            return G($(e), t, r, n)
        }

        function R(t, e, r, n) {
            return G(W(e, t.length - r), t, r, n)
        }

        function C(t, e, r) {
            return 0 === e && r === t.length ? K.fromByteArray(t) : K.fromByteArray(t.slice(e, r))
        }

        function S(t, e, r) {
            r = Math.min(t.length, r);
            for (var n = [], i = e; i < r;) {
                var o = t[i],
                    s = null,
                    a = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
                if (i + a <= r) {
                    var u, f, h, c;
                    switch (a) {
                        case 1:
                            o < 128 && (s = o);
                            break;
                        case 2:
                            u = t[i + 1], 128 == (192 & u) && (c = (31 & o) << 6 | 63 & u) > 127 && (s = c);
                            break;
                        case 3:
                            u = t[i + 1], f = t[i + 2], 128 == (192 & u) && 128 == (192 & f) && (c = (15 & o) << 12 | (63 & u) << 6 | 63 & f) > 2047 && (c < 55296 || c > 57343) && (s = c);
                            break;
                        case 4:
                            u = t[i + 1], f = t[i + 2], h = t[i + 3], 128 == (192 & u) && 128 == (192 & f) && 128 == (192 & h) && (c = (15 & o) << 18 | (63 & u) << 12 | (63 & f) << 6 | 63 & h) > 65535 && c < 1114112 && (s = c)
                    }
                }
                null === s ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), n.push(s), i += a
            }
            return I(n)
        }

        function I(t) {
            var e = t.length;
            if (e <= Z) return String.fromCharCode.apply(String, t);
            for (var r = "", n = 0; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += Z));
            return r
        }

        function T(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(127 & t[i]);
            return n
        }

        function U(t, e, r) {
            var n = "";
            r = Math.min(t.length, r);
            for (var i = e; i < r; ++i) n += String.fromCharCode(t[i]);
            return n
        }

        function M(t, e, r) {
            var n = t.length;
            (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
            for (var i = "", o = e; o < r; ++o) i += q(t[o]);
            return i
        }

        function k(t, e, r) {
            for (var n = t.slice(e, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
            return i
        }

        function L(t, e, r) {
            if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
            if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
        }

        function B(t, e, r, n, i, s) {
            if (!o.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (e > i || e < s) throw new RangeError('"value" argument is out of bounds');
            if (r + n > t.length) throw new RangeError("Index out of range")
        }

        function j(t, e, r, n) {
            e < 0 && (e = 65535 + e + 1);
            for (var i = 0, o = Math.min(t.length - r, 2); i < o; ++i) t[r + i] = (e & 255 << 8 * (n ? i : 1 - i)) >>> 8 * (n ? i : 1 - i)
        }

        function N(t, e, r, n) {
            e < 0 && (e = 4294967295 + e + 1);
            for (var i = 0, o = Math.min(t.length - r, 4); i < o; ++i) t[r + i] = e >>> 8 * (n ? i : 3 - i) & 255
        }

        function x(t, e, r, n, i, o) {
            if (r + n > t.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range")
        }

        function Y(t, e, r, n, i) {
            return i || x(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), Q.write(t, e, r, n, 23, 4), r + 4
        }

        function D(t, e, r, n, i) {
            return i || x(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), Q.write(t, e, r, n, 52, 8), r + 8
        }

        function z(t) {
            if (t = V(t).replace(tt, ""), t.length < 2) return "";
            for (; t.length % 4 != 0;) t += "=";
            return t
        }

        function V(t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
        }

        function q(t) {
            return t < 16 ? "0" + t.toString(16) : t.toString(16)
        }

        function J(t, e) {
            e = e || 1 / 0;
            for (var r, n = t.length, i = null, o = [], s = 0; s < n; ++s) {
                if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
                    if (!i) {
                        if (r > 56319) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        if (s + 1 === n) {
                            (e -= 3) > -1 && o.push(239, 191, 189);
                            continue
                        }
                        i = r;
                        continue
                    }
                    if (r < 56320) {
                        (e -= 3) > -1 && o.push(239, 191, 189), i = r;
                        continue
                    }
                    r = 65536 + (i - 55296 << 10 | r - 56320)
                } else i && (e -= 3) > -1 && o.push(239, 191, 189);
                if (i = null, r < 128) {
                    if ((e -= 1) < 0) break;
                    o.push(r)
                } else if (r < 2048) {
                    if ((e -= 2) < 0) break;
                    o.push(r >> 6 | 192, 63 & r | 128)
                } else if (r < 65536) {
                    if ((e -= 3) < 0) break;
                    o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                } else {
                    if (!(r < 1114112)) throw new Error("Invalid code point");
                    if ((e -= 4) < 0) break;
                    o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                }
            }
            return o
        }

        function F(t) {
            for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
            return e
        }

        function W(t, e) {
            for (var r, n, i, o = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) r = t.charCodeAt(s), n = r >> 8, i = r % 256, o.push(i), o.push(n);
            return o
        }

        function $(t) {
            return K.toByteArray(z(t))
        }

        function G(t, e, r, n) {
            for (var i = 0; i < n && !(i + r >= e.length || i >= t.length); ++i) e[i + r] = t[i];
            return i
        }

        function H(t) {
            return t !== t
        }
        var K = r(20),
            Q = r(21),
            X = r(22);
        e.Buffer = o, e.SlowBuffer = d, e.INSPECT_MAX_BYTES = 50, o.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function() {
            try {
                var t = new Uint8Array(1);
                return t.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42
                    }
                }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
            } catch (t) {
                return !1
            }
        }(), e.kMaxLength = n(), o.poolSize = 8192, o._augment = function(t) {
            return t.__proto__ = o.prototype, t
        }, o.from = function(t, e, r) {
            return s(null, t, e, r)
        }, o.TYPED_ARRAY_SUPPORT && (o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
            value: null,
            configurable: !0
        })), o.alloc = function(t, e, r) {
            return u(null, t, e, r)
        }, o.allocUnsafe = function(t) {
            return f(null, t)
        }, o.allocUnsafeSlow = function(t) {
            return f(null, t)
        }, o.isBuffer = function(t) {
            return !(null == t || !t._isBuffer)
        }, o.compare = function(t, e) {
            if (!o.isBuffer(t) || !o.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
            if (t === e) return 0;
            for (var r = t.length, n = e.length, i = 0, s = Math.min(r, n); i < s; ++i)
                if (t[i] !== e[i]) {
                    r = t[i], n = e[i];
                    break
                }
            return r < n ? -1 : n < r ? 1 : 0
        }, o.isEncoding = function(t) {
            switch (String(t).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "latin1":
                case "binary":
                case "base64":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
            }
        }, o.concat = function(t, e) {
            if (!X(t)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === t.length) return o.alloc(0);
            var r;
            if (void 0 === e)
                for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
            var n = o.allocUnsafe(e),
                i = 0;
            for (r = 0; r < t.length; ++r) {
                var s = t[r];
                if (!o.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                s.copy(n, i), i += s.length
            }
            return n
        }, o.byteLength = v, o.prototype._isBuffer = !0, o.prototype.swap16 = function() {
            var t = this.length;
            if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2) w(this, e, e + 1);
            return this
        }, o.prototype.swap32 = function() {
            var t = this.length;
            if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4) w(this, e, e + 3), w(this, e + 1, e + 2);
            return this
        }, o.prototype.swap64 = function() {
            var t = this.length;
            if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8) w(this, e, e + 7), w(this, e + 1, e + 6), w(this, e + 2, e + 5), w(this, e + 3, e + 4);
            return this
        }, o.prototype.toString = function() {
            var t = 0 | this.length;
            return 0 === t ? "" : 0 === arguments.length ? S(this, 0, t) : g.apply(this, arguments)
        }, o.prototype.equals = function(t) {
            if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === o.compare(this, t)
        }, o.prototype.inspect = function() {
            var t = "",
                r = e.INSPECT_MAX_BYTES;
            return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">"
        }, o.prototype.compare = function(t, e, r, n, i) {
            if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), e < 0 || r > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
            if (n >= i && e >= r) return 0;
            if (n >= i) return -1;
            if (e >= r) return 1;
            if (e >>>= 0, r >>>= 0, n >>>= 0, i >>>= 0, this === t) return 0;
            for (var s = i - n, a = r - e, u = Math.min(s, a), f = this.slice(n, i), h = t.slice(e, r), c = 0; c < u; ++c)
                if (f[c] !== h[c]) {
                    s = f[c], a = h[c];
                    break
                }
            return s < a ? -1 : a < s ? 1 : 0
        }, o.prototype.includes = function(t, e, r) {
            return -1 !== this.indexOf(t, e, r)
        }, o.prototype.indexOf = function(t, e, r) {
            return b(this, t, e, r, !0)
        }, o.prototype.lastIndexOf = function(t, e, r) {
            return b(this, t, e, r, !1)
        }, o.prototype.write = function(t, e, r, n) {
            if (void 0 === e) n = "utf8", r = this.length, e = 0;
            else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;
            else {
                if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
            }
            var i = this.length - e;
            if ((void 0 === r || r > i) && (r = i), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var o = !1;;) switch (n) {
                case "hex":
                    return _(this, t, e, r);
                case "utf8":
                case "utf-8":
                    return E(this, t, e, r);
                case "ascii":
                    return A(this, t, e, r);
                case "latin1":
                case "binary":
                    return O(this, t, e, r);
                case "base64":
                    return P(this, t, e, r);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return R(this, t, e, r);
                default:
                    if (o) throw new TypeError("Unknown encoding: " + n);
                    n = ("" + n).toLowerCase(), o = !0
            }
        }, o.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            }
        };
        var Z = 4096;
        o.prototype.slice = function(t, e) {
            var r = this.length;
            t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
            var n;
            if (o.TYPED_ARRAY_SUPPORT) n = this.subarray(t, e), n.__proto__ = o.prototype;
            else {
                var i = e - t;
                n = new o(i, void 0);
                for (var s = 0; s < i; ++s) n[s] = this[s + t]
            }
            return n
        }, o.prototype.readUIntLE = function(t, e, r) {
            t |= 0, e |= 0, r || L(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;
            return n
        }, o.prototype.readUIntBE = function(t, e, r) {
            t |= 0, e |= 0, r || L(t, e, this.length);
            for (var n = this[t + --e], i = 1; e > 0 && (i *= 256);) n += this[t + --e] * i;
            return n
        }, o.prototype.readUInt8 = function(t, e) {
            return e || L(t, 1, this.length), this[t]
        }, o.prototype.readUInt16LE = function(t, e) {
            return e || L(t, 2, this.length), this[t] | this[t + 1] << 8
        }, o.prototype.readUInt16BE = function(t, e) {
            return e || L(t, 2, this.length), this[t] << 8 | this[t + 1]
        }, o.prototype.readUInt32LE = function(t, e) {
            return e || L(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
        }, o.prototype.readUInt32BE = function(t, e) {
            return e || L(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
        }, o.prototype.readIntLE = function(t, e, r) {
            t |= 0, e |= 0, r || L(t, e, this.length);
            for (var n = this[t], i = 1, o = 0; ++o < e && (i *= 256);) n += this[t + o] * i;
            return i *= 128, n >= i && (n -= Math.pow(2, 8 * e)), n
        }, o.prototype.readIntBE = function(t, e, r) {
            t |= 0, e |= 0, r || L(t, e, this.length);
            for (var n = e, i = 1, o = this[t + --n]; n > 0 && (i *= 256);) o += this[t + --n] * i;
            return i *= 128, o >= i && (o -= Math.pow(2, 8 * e)), o
        }, o.prototype.readInt8 = function(t, e) {
            return e || L(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
        }, o.prototype.readInt16LE = function(t, e) {
            e || L(t, 2, this.length);
            var r = this[t] | this[t + 1] << 8;
            return 32768 & r ? 4294901760 | r : r
        }, o.prototype.readInt16BE = function(t, e) {
            e || L(t, 2, this.length);
            var r = this[t + 1] | this[t] << 8;
            return 32768 & r ? 4294901760 | r : r
        }, o.prototype.readInt32LE = function(t, e) {
            return e || L(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
        }, o.prototype.readInt32BE = function(t, e) {
            return e || L(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
        }, o.prototype.readFloatLE = function(t, e) {
            return e || L(t, 4, this.length), Q.read(this, t, !0, 23, 4)
        }, o.prototype.readFloatBE = function(t, e) {
            return e || L(t, 4, this.length), Q.read(this, t, !1, 23, 4)
        }, o.prototype.readDoubleLE = function(t, e) {
            return e || L(t, 8, this.length), Q.read(this, t, !0, 52, 8)
        }, o.prototype.readDoubleBE = function(t, e) {
            return e || L(t, 8, this.length), Q.read(this, t, !1, 52, 8)
        }, o.prototype.writeUIntLE = function(t, e, r, n) {
            if (t = +t, e |= 0, r |= 0, !n) {
                B(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
            }
            var i = 1,
                o = 0;
            for (this[e] = 255 & t; ++o < r && (i *= 256);) this[e + o] = t / i & 255;
            return e + r
        }, o.prototype.writeUIntBE = function(t, e, r, n) {
            if (t = +t, e |= 0, r |= 0, !n) {
                B(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
            }
            var i = r - 1,
                o = 1;
            for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
            return e + r
        }, o.prototype.writeUInt8 = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 1, 255, 0), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1
        }, o.prototype.writeUInt16LE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : j(this, t, e, !0), e + 2
        }, o.prototype.writeUInt16BE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 2, 65535, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : j(this, t, e, !1), e + 2
        }, o.prototype.writeUInt32LE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : N(this, t, e, !0), e + 4
        }, o.prototype.writeUInt32BE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 4, 4294967295, 0), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : N(this, t, e, !1), e + 4
        }, o.prototype.writeIntLE = function(t, e, r, n) {
            if (t = +t, e |= 0, !n) {
                var i = Math.pow(2, 8 * r - 1);
                B(this, t, e, r, i - 1, -i)
            }
            var o = 0,
                s = 1,
                a = 0;
            for (this[e] = 255 & t; ++o < r && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o - 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
            return e + r
        }, o.prototype.writeIntBE = function(t, e, r, n) {
            if (t = +t, e |= 0, !n) {
                var i = Math.pow(2, 8 * r - 1);
                B(this, t, e, r, i - 1, -i)
            }
            var o = r - 1,
                s = 1,
                a = 0;
            for (this[e + o] = 255 & t; --o >= 0 && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + o + 1] && (a = 1), this[e + o] = (t / s >> 0) - a & 255;
            return e + r
        }, o.prototype.writeInt8 = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 1, 127, -128), o.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
        }, o.prototype.writeInt16LE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : j(this, t, e, !0), e + 2
        }, o.prototype.writeInt16BE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 2, 32767, -32768), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : j(this, t, e, !1), e + 2
        }, o.prototype.writeInt32LE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 4, 2147483647, -2147483648), o.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : N(this, t, e, !0), e + 4
        }, o.prototype.writeInt32BE = function(t, e, r) {
            return t = +t, e |= 0, r || B(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), o.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : N(this, t, e, !1), e + 4
        }, o.prototype.writeFloatLE = function(t, e, r) {
            return Y(this, t, e, !0, r)
        }, o.prototype.writeFloatBE = function(t, e, r) {
            return Y(this, t, e, !1, r)
        }, o.prototype.writeDoubleLE = function(t, e, r) {
            return D(this, t, e, !0, r)
        }, o.prototype.writeDoubleBE = function(t, e, r) {
            return D(this, t, e, !1, r)
        }, o.prototype.copy = function(t, e, r, n) {
            if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
            var i, s = n - r;
            if (this === t && r < e && e < n)
                for (i = s - 1; i >= 0; --i) t[i + e] = this[i + r];
            else if (s < 1e3 || !o.TYPED_ARRAY_SUPPORT)
                for (i = 0; i < s; ++i) t[i + e] = this[i + r];
            else Uint8Array.prototype.set.call(t, this.subarray(r, r + s), e);
            return s
        }, o.prototype.fill = function(t, e, r, n) {
            if ("string" == typeof t) {
                if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === t.length) {
                    var i = t.charCodeAt(0);
                    i < 256 && (t = i)
                }
                if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !o.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
            } else "number" == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
            if (r <= e) return this;
            e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0);
            var s;
            if ("number" == typeof t)
                for (s = e; s < r; ++s) this[s] = t;
            else {
                var a = o.isBuffer(t) ? t : J(new o(t, n).toString()),
                    u = a.length;
                for (s = 0; s < r - e; ++s) this[s + e] = a[s % u]
            }
            return this
        };
        var tt = /[^+\/0-9A-Za-z-_]/g
    }).call(e, r(19))
}, function(t, e) {
    var r;
    r = function() {
        return this
    }();
    try {
        r = r || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" == typeof window && (r = window)
    }
    t.exports = r
}, function(t, e, r) {
    "use strict";

    function n(t) {
        var e = t.length;
        if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
    }

    function i(t) {
        return 3 * t.length / 4 - n(t)
    }

    function o(t) {
        var e, r, i, o, s, a = t.length;
        o = n(t), s = new c(3 * a / 4 - o), r = o > 0 ? a - 4 : a;
        var u = 0;
        for (e = 0; e < r; e += 4) i = h[t.charCodeAt(e)] << 18 | h[t.charCodeAt(e + 1)] << 12 | h[t.charCodeAt(e + 2)] << 6 | h[t.charCodeAt(e + 3)], s[u++] = i >> 16 & 255, s[u++] = i >> 8 & 255, s[u++] = 255 & i;
        return 2 === o ? (i = h[t.charCodeAt(e)] << 2 | h[t.charCodeAt(e + 1)] >> 4, s[u++] = 255 & i) : 1 === o && (i = h[t.charCodeAt(e)] << 10 | h[t.charCodeAt(e + 1)] << 4 | h[t.charCodeAt(e + 2)] >> 2, s[u++] = i >> 8 & 255, s[u++] = 255 & i), s
    }

    function s(t) {
        return f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t]
    }

    function a(t, e, r) {
        for (var n, i = [], o = e; o < r; o += 3) n = (t[o] << 16 & 16711680) + (t[o + 1] << 8 & 65280) + (255 & t[o + 2]), i.push(s(n));
        return i.join("")
    }

    function u(t) {
        for (var e, r = t.length, n = r % 3, i = "", o = [], s = 0, u = r - n; s < u; s += 16383) o.push(a(t, s, s + 16383 > u ? u : s + 16383));
        return 1 === n ? (e = t[r - 1], i += f[e >> 2], i += f[e << 4 & 63], i += "==") : 2 === n && (e = (t[r - 2] << 8) + t[r - 1], i += f[e >> 10], i += f[e >> 4 & 63], i += f[e << 2 & 63], i += "="), o.push(i), o.join("")
    }
    e.byteLength = i, e.toByteArray = o, e.fromByteArray = u;
    for (var f = [], h = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", p = 0, y = l.length; p < y; ++p) f[p] = l[p], h[l.charCodeAt(p)] = p;
    h["-".charCodeAt(0)] = 62, h["_".charCodeAt(0)] = 63
}, function(t, e) {
    e.read = function(t, e, r, n, i) {
        var o, s, a = 8 * i - n - 1,
            u = (1 << a) - 1,
            f = u >> 1,
            h = -7,
            c = r ? i - 1 : 0,
            l = r ? -1 : 1,
            p = t[e + c];
        for (c += l, o = p & (1 << -h) - 1, p >>= -h, h += a; h > 0; o = 256 * o + t[e + c], c += l, h -= 8);
        for (s = o & (1 << -h) - 1, o >>= -h, h += n; h > 0; s = 256 * s + t[e + c], c += l, h -= 8);
        if (0 === o) o = 1 - f;
        else {
            if (o === u) return s ? NaN : 1 / 0 * (p ? -1 : 1);
            s += Math.pow(2, n), o -= f
        }
        return (p ? -1 : 1) * s * Math.pow(2, o - n)
    }, e.write = function(t, e, r, n, i, o) {
        var s, a, u, f = 8 * o - i - 1,
            h = (1 << f) - 1,
            c = h >> 1,
            l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            p = n ? 0 : o - 1,
            y = n ? 1 : -1,
            d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (u = Math.pow(2, -s)) < 1 && (s--, u *= 2), e += s + c >= 1 ? l / u : l * Math.pow(2, 1 - c), e * u >= 2 && (s++, u /= 2), s + c >= h ? (a = 0, s = h) : s + c >= 1 ? (a = (e * u - 1) * Math.pow(2, i), s += c) : (a = e * Math.pow(2, c - 1) * Math.pow(2, i), s = 0)); i >= 8; t[r + p] = 255 & a, p += y, a /= 256, i -= 8);
        for (s = s << i | a, f += i; f > 0; t[r + p] = 255 & s, p += y, s /= 256, f -= 8);
        t[r + p - y] |= 128 * d
    }
}, function(t, e) {
    var r = {}.toString;
    t.exports = Array.isArray || function(t) {
        return "[object Array]" == r.call(t)
    }
}, function(t, e, r) {
    "use strict";
    var n = function() {
        function t(t) {
            void 0 === t && (t = !1), this.running = !1, this.now = "undefined" != typeof window && window.performance && window.performance.now && window.performance.now.bind(window.performance) || Date.now, this.start(t)
        }
        return t.prototype.start = function(t) {
            void 0 === t && (t = !1), this.deltaTime = 0, this.currentTime = this.now(), this.elapsedTime = 0, this.running = !0, t && (this._interval = setInterval(this.tick.bind(this), 1e3 / 60))
        }, t.prototype.stop = function() {
            this.running = !1, this._interval && clearInterval(this._interval)
        }, t.prototype.tick = function(t) {
            void 0 === t && (t = this.now()), this.deltaTime = t - this.currentTime, this.currentTime = t, this.elapsedTime += this.deltaTime
        }, t
    }();
    t.exports = n
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = r(25);
    e.StateContainer = n.StateContainer
}, function(t, e, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var n = r(26),
        i = function() {
            function t(t) {
                this.listeners = [], this.matcherPlaceholders = {
                    ":id": /^([a-zA-Z0-9\-_]+)$/,
                    ":number": /^([0-9]+)$/,
                    ":string": /^(\w+)$/,
                    ":axis": /^([xyz])$/,
                    ":*": /(.*)/
                }, this.state = t, this.reset()
            }
            return t.prototype.set = function(t) {
                var e = n.compare(this.state, t);
                return this.checkPatches(e), this.state = t, e
            }, t.prototype.registerPlaceholder = function(t, e) {
                this.matcherPlaceholders[t] = e
            }, t.prototype.listen = function(t, e) {
                var r, n = this;
                "function" == typeof t ? (r = [], e = t) : r = t.split("/"), e.length > 1 && console.warn(".listen() accepts only one parameter.");
                var i = {
                    callback: e,
                    rawRules: r,
                    rules: r.map(function(t) {
                        return "string" == typeof t ? 0 === t.indexOf(":") ? n.matcherPlaceholders[t] || n.matcherPlaceholders[":*"] : new RegExp("^" + t + "$") : t
                    })
                };
                return 0 === r.length ? this.defaultListener = i : this.listeners.push(i), i
            }, t.prototype.removeListener = function(t) {
                for (var e = this.listeners.length - 1; e >= 0; e--) this.listeners[e] === t && this.listeners.splice(e, 1)
            }, t.prototype.removeAllListeners = function() {
                this.reset()
            }, t.prototype.checkPatches = function(t) {
                for (var e = t.length - 1; e >= 0; e--) {
                    for (var r = !1, n = 0, i = this.listeners.length; n < i; n++) {
                        var o = this.listeners[n],
                            s = o && this.getPathVariables(t[e], o);
                        s && (o.callback({
                            path: s,
                            rawPath: t[e].path,
                            operation: t[e].operation,
                            value: t[e].value
                        }), r = !0)
                    }!r && this.defaultListener && this.defaultListener.callback(t[e])
                }
            }, t.prototype.getPathVariables = function(t, e) {
                if (t.path.length !== e.rules.length) return !1;
                for (var r = {}, n = 0, i = e.rules.length; n < i; n++) {
                    var o = t.path[n].match(e.rules[n]);
                    if (!o || 0 === o.length || o.length > 2) return !1;
                    ":" === e.rawRules[n].substr(0, 1) && (r[e.rawRules[n].substr(1)] = o[1])
                }
                return r
            }, t.prototype.reset = function() {
                this.listeners = []
            }, t
        }();
    e.StateContainer = i
}, function(t, e, r) {
    "use strict";

    function n(t, e) {
        var r = [];
        return s(t, e, r, []), r
    }

    function i(t, e) {
        var r = t.slice();
        return r.push(e), r
    }

    function o(t) {
        if (Array.isArray(t)) {
            for (var e = new Array(t.length), r = 0; r < e.length; r++) e[r] = "" + r;
            return e
        }
        if (Object.keys) return Object.keys(t);
        var n = [];
        for (var i in t) t.hasOwnProperty(i) && n.push(i);
        return n
    }

    function s(t, e, r, n) {
        for (var a = o(e), u = o(t), f = !1, h = u.length - 1; h >= 0; h--) {
            var c = u[h],
                l = t[c];
            if (!e.hasOwnProperty(c) || void 0 === e[c] && void 0 !== l && !1 === Array.isArray(e)) r.push({
                operation: "remove",
                path: i(n, c)
            }), f = !0;
            else {
                var p = e[c];
                "object" == typeof l && null != l && "object" == typeof p && null != p ? s(l, p, r, i(n, c)) : l !== p && (!0, r.push({
                    operation: "replace",
                    path: i(n, c),
                    value: p
                }))
            }
        }
        if (f || a.length != u.length)
            for (var h = a.length - 1; h >= 0; h--) {
                var c = a[h];
                if (!t.hasOwnProperty(c) && void 0 !== e[c]) {
                    var p = e[c],
                        y = i(n, c);
                    "object" == typeof p && null != p && s({}, p, r, y), r.push({
                        operation: "add",
                        path: y,
                        value: p
                    })
                }
            }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.compare = n
}, function(t, e) {
    ! function(e, r) {
        void 0 !== t && t.exports ? t.exports = r() : e.fossilDelta = r()
    }(this, function() {
        "use strict";

        function t() {
            this.a = 0, this.b = 0, this.i = 0, this.z = new Array(s)
        }

        function e(t) {
            this.a = t, this.pos = 0
        }

        function r() {
            this.a = []
        }

        function n(t) {
            var e, r;
            for (e = 1, r = 64; t >= r; e++, r <<= 6);
            return e
        }

        function i(t) {
            for (var e = 0, r = 0, n = 0, i = 0, o = 0, s = t.length; s >= 16;) e = e + t[o + 0] | 0, r = r + t[o + 1] | 0, n = n + t[o + 2] | 0, i = i + t[o + 3] | 0, e = e + t[o + 4] | 0, r = r + t[o + 5] | 0, n = n + t[o + 6] | 0, i = i + t[o + 7] | 0, e = e + t[o + 8] | 0, r = r + t[o + 9] | 0, n = n + t[o + 10] | 0, i = i + t[o + 11] | 0, e = e + t[o + 12] | 0, r = r + t[o + 13] | 0, n = n + t[o + 14] | 0, i = i + t[o + 15] | 0, o += 16, s -= 16;
            for (; s >= 4;) e = e + t[o + 0] | 0, r = r + t[o + 1] | 0, n = n + t[o + 2] | 0, i = i + t[o + 3] | 0, o += 4, s -= 4;
            switch (i = ((i + (n << 8) | 0) + (r << 16) | 0) + (e << 24) | 0, s) {
                case 3:
                    i = i + (t[o + 2] << 8) | 0;
                case 2:
                    i = i + (t[o + 1] << 16) | 0;
                case 1:
                    i = i + (t[o + 0] << 24) | 0
            }
            return i >>> 0
        }
        var o = {},
            s = 16;
        t.prototype.init = function(t, e) {
            var r, n, i = 0,
                o = 0;
            for (r = 0; r < s; r++) n = t[e + r], i = i + n & 65535, o = o + (s - r) * n & 65535, this.z[r] = n;
            this.a = 65535 & i, this.b = 65535 & o, this.i = 0
        }, t.prototype.next = function(t) {
            var e = this.z[this.i];
            this.z[this.i] = t, this.i = this.i + 1 & s - 1, this.a = this.a - e + t & 65535, this.b = this.b - s * e + this.a & 65535
        }, t.prototype.value = function() {
            return (65535 & this.a | (65535 & this.b) << 16) >>> 0
        };
        var a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz~".split("").map(function(t) {
                return t.charCodeAt(0)
            }),
            u = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, -1, -1, -1, -1, 36, -1, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, -1, -1, -1, 63, -1];
        return e.prototype.haveBytes = function() {
            return this.pos < this.a.length
        }, e.prototype.getByte = function() {
            var t = this.a[this.pos];
            if (++this.pos > this.a.length) throw new RangeError("out of bounds");
            return t
        }, e.prototype.getChar = function() {
            return String.fromCharCode(this.getByte())
        }, e.prototype.getInt = function() {
            for (var t, e = 0; this.haveBytes() && (t = u[127 & this.getByte()]) >= 0;) e = (e << 6) + t;
            return this.pos--, e >>> 0
        }, r.prototype.toArray = function() {
            return this.a
        }, r.prototype.putByte = function(t) {
            this.a.push(255 & t)
        }, r.prototype.putChar = function(t) {
            this.putByte(t.charCodeAt(0))
        }, r.prototype.putInt = function(t) {
            var e, r, n = [];
            if (0 === t) return void this.putChar("0");
            for (e = 0; t > 0; e++, t >>>= 6) n.push(a[63 & t]);
            for (r = e - 1; r >= 0; r--) this.putByte(n[r])
        }, r.prototype.putArray = function(t, e, r) {
            for (var n = e; n < r; n++) this.a.push(t[n])
        }, o.create = function(e, o) {
            var a, u = new r,
                f = o.length,
                h = e.length,
                c = -1;
            if (u.putInt(f), u.putChar("\n"), h <= s) return u.putInt(f), u.putChar(":"), u.putArray(o, 0, f), u.putInt(i(o)), u.putChar(";"), u.toArray();
            var l = Math.ceil(h / s),
                p = new Array(l),
                y = new Array(l);
            for (a = 0; a < p.length; a++) p[a] = -1;
            for (a = 0; a < y.length; a++) y[a] = -1;
            var d, v = new t;
            for (a = 0; a < h - s; a += s) v.init(e, a), d = v.value() % l, p[a / s] = y[d], y[d] = a / s;
            for (var g, w, b, m, _, E = 0; E + s < f;)
                for (m = 0, _ = 0, v.init(o, E), a = 0, b = 0;;) {
                    var A = 250;
                    for (d = v.value() % l, w = y[d]; w >= 0 && A-- > 0;) {
                        var O, P, R, C, S, I, T, U;
                        for (g = w * s, C = 0, I = g, T = E + a; I < h && T < f && e[I] === o[T]; C++, I++, T++);
                        for (C--, S = 1; S < g && S <= a && e[g - S] === o[E + a - S]; S++);
                        S--, P = g - S, O = C + S + 1, R = a - S, U = n(a - S) + n(O) + n(P) + 3, O >= U && O > b && (b = O, m = g - S, _ = R), w = p[w]
                    }
                    if (b > 0) {
                        _ > 0 && (u.putInt(_), u.putChar(":"), u.putArray(o, E, E + _), E += _), E += b, u.putInt(b), u.putChar("@"), u.putInt(m), u.putChar(","), m + b - 1 > c && (c = m + b - 1), b = 0;
                        break
                    }
                    if (E + a + s >= f) {
                        u.putInt(f - E), u.putChar(":"), u.putArray(o, E, E + f - E), E = f;
                        break
                    }
                    v.next(o[E + a + s]), a++
                }
            return E < f && (u.putInt(f - E), u.putChar(":"), u.putArray(o, E, E + f - E)), u.putInt(i(o)), u.putChar(";"), u.toArray()
        }, o.outputSize = function(t) {
            var r = new e(t),
                n = r.getInt();
            if ("\n" !== r.getChar()) throw new Error("size integer not terminated by '\\n'");
            return n
        }, o.apply = function(t, n, o) {
            var s, a = 0,
                u = new e(n),
                f = t.length,
                h = n.length;
            if (s = u.getInt(), "\n" !== u.getChar()) throw new Error("size integer not terminated by '\\n'");
            for (var c = new r; u.haveBytes();) {
                var l, p;
                switch (l = u.getInt(), u.getChar()) {
                    case "@":
                        if (p = u.getInt(), u.haveBytes() && "," !== u.getChar()) throw new Error("copy command not terminated by ','");
                        if ((a += l) > s) throw new Error("copy exceeds output file size");
                        if (p + l > f) throw new Error("copy extends past end of input");
                        c.putArray(t, p, p + l);
                        break;
                    case ":":
                        if ((a += l) > s) throw new Error("insert command gives an output larger than predicted");
                        if (l > h) throw new Error("insert count exceeds size of delta");
                        c.putArray(u.a, u.pos, u.pos + l), u.pos += l;
                        break;
                    case ";":
                        var y = c.toArray();
                        if ((!o || !1 !== o.verifyChecksum) && l !== i(y)) throw new Error("bad checksum");
                        if (a !== s) throw new Error("generated size does not match predicted size");
                        return y;
                    default:
                        throw new Error("unknown delta operator")
                }
            }
            throw new Error("unterminated delta")
        }, o
    })
}, function(t, e, r) {
    "use strict";

    function n(t, e, r, n, i) {
        "var" === e.holderType ? t[r] = n : "key" === e.holderType && (t[r] = i)
    }

    function i(t, e, r, i) {
        for (var o in e) e.hasOwnProperty(o) && n(t, e[o], o, r[o], i)
    }

    function o(t, e, r) {
        void 0 === r && (r = 0);
        for (var n = t, i = 0, o = e.length; i < o + r && "object" == typeof n[e[i]]; i++) n = n[e[i]];
        return n
    }

    function s(t, e, r, n, i) {
        return function(i) {
            if ("add" === i.operation) {
                var o = new e.type;
                for (var s in i.value) i.value.hasOwnProperty(s) && (o[s] = i.value[s]);
                f.bindListeners(e.type.listeners, t, o), r[e.variable] = o, e.addCallback && e.addCallback.call(n, n, o, i)
            } else "replace" === i.operation ? n[this.rawRules[0]][e.variable] = i.value : "remove" === i.operation && (e.removeCallback && e.removeCallback.call(n, n, r[e.variable][i.path.id], i), delete r[e.variable])
        }
    }

    function a(t, e, r, s, a) {
        return function(a) {
            var u = o(s, a.rawPath);
            if ("add" === a.operation) {
                var h = new e.type;
                Object.defineProperty(h, "__mapParent", {
                    configurable: !0,
                    enumerable: !1,
                    value: o(s, a.rawPath, -2),
                    writable: !0
                }), f.bindListeners(e.type.listeners, t, h), u[a.path.id] = h, i(h, e.type.properties, a.value, a.path.id), e.addCallback && e.addCallback.call(h.__mapParent, h.__mapParent, h, a)
            } else "replace" === a.operation ? n(u, e, e.variable, a.value) : "remove" === a.operation && (e.removeCallback && e.removeCallback.call(u.__mapParent, u.__mapParent, u, a), delete r[e.variable][a.path.id])
        }
    }

    function u(t, e, r, i, s) {
        return function(t) {
            var r = o(i, t.rawPath);
            "remove" !== t.operation ? n(r, e, e.variable, t.value) : "remove" === t.operation && delete r[e.variable]
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var f = r(8);
    e.objectListener = s, e.mapListener = a, e.varListener = u
}]);