EIO = Object.freeze({
    REPLACE: 0
    , APPEND: 1
    , MAX_LOG_LINES: 1024
})

EIOErrors = Object.freeze({
    PATH_MISSING: -1
    , OBJ_MISSING: -2
    , PATH_BROKEN: -3
})

EArrayOperations = Object.freeze({
    SUM: 0
    , AVERAGE: 1
    , HARMONIC: 2
    , TREND: 3
    , PROGRESS: 4
    , INTERPOLATE: 5
    , MAX: 6
    , MIN: 7
    , RELATIFY: 8
})

EArrayCasts = Object.freeze({
    STRING: 0
    , FLOAT: 1
    , INT: 2
})


class FObject extends Object {

    spy(p, fn) {
        let
            o = this[p]
            , set = function (v) { return fn(v, p, this) }
            ;;
        if (delete this[p]) {
            Object.defineProperty(this, p, { set: set })
        }
    }

    unspy(p) {
        let
            val = this[p];
        delete this[p];
        this[p] = val;
    }

    json() { return JSON.stringify(this, null, 4) }

    each(fn = null) {
        let
            me = this
            , arr = Object.keys(me)
            , final = [];
        if (fn && arr.length) {
            arr.forEach(x => final.push({ key: x, value: me[x] }));
            final.forEach(fn)
        }
        return this
    }

    array() {
        return new FArray(...Object.values(this))
    }

    extract(fn = null) {
        let
            final = new FArray();
        if (fn) {
            this.each((x, i) => {
                let
                    y = fn(x, i);
                if (y != null && y !== undefined && y !== false) final.push(y)
            })
        }
        return final
    }

    keys() {
        return FArray.cast(Object.keys(this))
    }

    attributes() {
        let me = this;;
        return this.keys().map(attr => typeof me[attr] != 'function' ? attr : null).filter(i => i)
    }

    isNull() {
        return this.keys().length ? false : true
    }

    static from_str(s) {
        return FObject.instance(JSON.parse(s))
    }

    /**
     * @deprecated
     * @param {*} o
     * @returns
     */
    static instance(o) {
        return FObject.cast(o)
    }

    static cast(o) {
        const f = new FObject();
        Object.keys(o || {}).forEach(k => f[k] = o[k]);
        return f
    }

    static isEmpty(o = null) {
        return o ? !Object.keys(o).length && true : null
    }

    static foreach(obj, callback) {
        Object.keys(obj || {}).forEach(k => callback({ key: k, value: obj[k] }));
        return obj
    }

    constructor(o) {
        super()
        const me = this;;
        Object.keys(o || {}).forEach(k => me[k] = o[k]);
        const attrs = me.attributes();;
        attrs.map(attr => {
            if (attr == 'id_') return;
            const l = attr.length;;
            if (attr[l - 1] == '_') me[attr.slice(0, l - 1)] = function (x) {
                if (undefined !== x && null !== x) me[attr] = x;
                return me[attr] !== "" && !isNaN(me[attr]) ? me[attr] * 1 : me[attr]
            }
        })
    }

}

class FArray extends Array {
    /**
     * @deprecated, use FArray.cast(arr) instead
     * @param {*} arr as []
     * @returns new FArray
     */
    static instance(arr) {
        return FArray.cast(arr || [])
    }

    static cast(arr) {
        return new FArray(...(arr || arguments))
    }

    tiny(n = 10) {
        if (this.length <= n) return this;
        let
            narr = [this.first()]
            , x = Math.floor(this.length / (n - 1))
            , i = x
            ;
        while (i < this.length - 1) {
            narr.push(this[i] || null);
            i += x;
        }
        narr.push(this.last())
        return narr.clear()
    }

    json() { return JSON.stringify(this); }

    clone() { return this.slice(0) }

    each(fn) { if (fn) { for (let i = 0; i++ < this.length;) fn.bind(this[i - 1])(this[i - 1], i - 1); } return this }

    static foreach(arr, callback) {
        arr.map(callback)
        return arr
    }

    extract(fn = null) {
        if (!fn || !this.length) return this;
        let
            narr = [];
        this.each((o, i) => {
            let
                x = fn.bind(o)(o, i);
            if (x != null && x !== undefined && x !== false) narr.push(x)
        })
        return new FArray(...narr)
    }
    mutate(fn) {
        if (!fn) return this;
        return this.extract((x, i) => { return fn(x, i) })
    }
    cast(filter = EArrayCasts.STRING) {
        return this.extract(x => { return filter = EArrayCasts.STRING ? x + "" : (filter === EArrayCasts.FLOAT ? x * 1.0 : x * 1) })
    }
    fit(n = 10) {
        let
            narr = [this.first()]
            , x = this.length / (n - 1)
            , i = x
            ;
        while (i < this.length) {
            narr.push(this.calc(EArrayOperations.TREND, i));
            i += x;
        }
        narr.push(this.last())
        return narr
    }
    calc(type = SUM, helper = null) {
        let
            res = 0;
        switch (type) {
            case (SUM): this.each(x => res += x); break
            case (AVERAGE): this.each(x => res += x); res = res / this.length; break
            case (HARMONIC): this.each(x => res += 1 / x); res = this.length / res; break
            case (TREND): {
                let
                    m, b, x, y, x2, xy, z, np = this.length;
                m = b = x = y = x2 = xy = z = 0;
                if (!helper) helper = np;
                this.each((n, i) => {
                    x = x + i;
                    y = y + n;
                    xy = xy + i * n;
                    x2 = x2 + i * i;
                });
                z = np * x2 - x * x
                if (z) {
                    m = (np * xy - x * y) / z;
                    b = (y * x2 - x * xy) / z;
                }
                res = m * helper + b
            } break;
            case (PROGRESS): {
                let
                    me = this;
                res = this.extract((x, i) => { return i ? me[i] / me[i - 1] : 1 }).calc(AVERAGE)
            } break;
            case (MAX):
                res = Number.MIN_SAFE_INTEGER;
                this.each(x => res = Math.max(res, x))
                break;
            case (MIN):
                res = Number.MAX_SAFE_INTEGER;
                this.each(x => res = Math.min(res, x))
                break;
            case (RELATIFY):
                res = this.calc(MAX);
                res = this.extract(x => x / res)
                break;
            default:
                break;
        }
        return res;
    }
    fillNulls() {
        let
            final
            , nulls = []
            , narr = this.extract((el, i) => {
                let
                    y = Array.isArray(el) || el instanceof FArray ? el[1] : el
                    , x = Array.isArray(el) || el instanceof FArray ? el[0] : i
                    ;;
                if (y == null || y == undefined) nulls.push(x);
                else return [x, y];
            })
        nulls.each(n => narr.push([n, narr.calc(INTERPOLATE, n)]));
        narr.sort(function (a, b) { return a[0] - b[0] })
        return narr;
    }
    last(n = null) {
        if (!this.length) return null;
        if (n === null) return this[this.length - 1];
        return this.slice(Math.max(this.length - n, 0));
    }
    first(n = null) {
        if (!this.length) return null;
        if (n === null) return this[0];
        return this.slice(0, n);
    }
    at(n = 0) {
        if (n >= 0) return this.length >= n ? this[n] : null;
        return this.length > n * -1 ? this[this.length + n] : null
    }
    rand() {
        return this[Math.floor(Math.random() * this.length)]
    }
    not(el) {
        let
            arr = this;
        while (arr.indexOf(el) + 1) arr.splice(arr.indexOf(el), 1);
        return arr;
    }
    empty() {
        for (var i = this.length; i--;) this[i] = null;
        return this
    }
    clear() {
        return this.extract(n => {
            return n != null && n !== undefined && n !== isNaN ? (n instanceof String ? n + "" : (n instanceof Number ? n * 1 : n)) : null
        })
    }
    array() {
        return [...this]
    }

}


module.exports = { FObject, FArray }