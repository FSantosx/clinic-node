
const
    fs = require('fs')
    , os = require('os')
    , { FArray, FObject } = require('./il')
    ;;

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

const ROOT = __dirname + "/../../../"


module.exports = class IO {
    static root(path = null) {
        if (path && (path[0] === "/" || path.match(/\b[a-zA-Z]{1}:.*/gi))) return path;
        return ROOT + (path || '')
    }

    static exists(f) {
        return fs.existsSync(IO.root(f))
    }

    static read(f) {
        var tmp = "";
        f = IO.root(f);
        if (f && fs.existsSync(f)) tmp = fs.readFileSync(f, "utf8").trim();
        return tmp;
    }

    static write(f, content, mode = EIO.REPLACE) {
        f = IO.root(f)
        var tmp = f.split(/\//g);
        tmp = tmp.slice(0, tmp.length - 1)
        if (!fs.existsSync(tmp)) IO.mkd(tmp.join("/"))
        tmp = (mode === EIO.APPEND && fs.existsSync(f) ? IO.read(f) + "\n" : "") + content
        fs.writeFileSync(f, tmp)
        return fs.existsSync(f)
    }

    static jin(path = null, obj = null, mode = EIO.REPLACE) {
        try {
            if (path === null) return EIOErrors.PATH_MISSING
            if (obj === null) return EIOErrors.OBJ_MISSING
            return IO.write(path, JSON.stringify(obj, null, 4), mode);
        } catch (e) {
            return false
        }
    }

    static jout(path) {
        try {
            const tmp = JSON.parse(IO.read(path));;
            return Array.isArray(tmp) ? FArray.cast(tmp) : FObject.cast(tmp)
        } catch (e) {
            return false
        }
    }

    static log(content, f = "debug", mode = EIO.APPEND) {
        var tmp = [], offset;
        f = "var/logs/" + f + (f.indexOf('.log') + 1 ? '' : '.log');
        if (fs.existsSync(IO.root(f))) {
            tmp = mode === EIO.APPEND ? IO.read(f) : null
            if (tmp) tmp = tmp.split(/\n/g)
            else tmp = []
        }
        tmp.push(content);
        offset = tmp.length - EIO.MAX_LOG_LINES;
        tmp = tmp.slice(offset > 0 ? offset : 0, EIO.MAX_LOG_LINES).join('\n');
        IO.write(f, tmp, EIO.REPLACE);
        return content
    }

    static scan(folder = null, extension = null, withfolders = true) {
        if (folder === null || !fs.existsSync(IO.root(folder))) return new FArray();
        var
            tmp = fs.readdirSync(folder)
            , result = new FArray()
            ;;
        if (tmp) {
            tmp.forEach(t => {
                if (!(t === "." || t === "..")) {
                    if (extension) {
                        if (t.substr(extension.length * -1) === extension) result.push(t);
                    }
                    else if (withfolders || !fs.lstatSync(folder + "/" + t).isDirectory()) result.push(t);
                }
            })
        }
        return result;
    }

    static files(path, ext = null) {
        return IO.scan(path, ext, false);
    }

    static folders(path) {
        var
            arr = new FArray()
            , tmp = IO.scan(path, null, true)
            ;;
        if (tmp.length) tmp.forEach(f => { if (fs.lstatSync(path + "/" + f).isDirectory()) arr.push(f) });
        return arr;
    }

    static rmf(dir = null) {
        dir = IO.root(dir)
        fs.rmdirSync(dir, { recursive: true })
        return !fs.existsSync(dir)
    }

    static mkd(dir) {
        fs.mkdirSync(IO.root(dir), { recursive: true })
        return fs.existsSync(dir)
    }

    static tmp() {
        return fs.mkdtempSync(os.tmpdir(), "fa-")
    }

    static rm(p = null) {
        if (p === null) return EIOErrors.PATH_MISSING;
        p = IO.root(p);
        return fs.existsSync(p) ? fs.unlinkSync(p) : true;
    }

    static cpr(f, t) {
        if (!f || !t) return EIOErrors.PATH_MISSING;

        f = IO.root(f)
        t = IO.root(t)

        if (!fs.existsSync(f)) return EIOErrors.PATH_BROKEN;
        if (!fs.existsSync(f)) fs.mkdirSync(t)

        if (fs.lstatSync(f).isDirectory()) {
            fs.readdirSync(f).forEach(file => {
                if (fs.lstatSync(f + "/" + file).isDirectory()) IO.cpr(f + "/" + file, t);
                else fs.copyFileSync(f + "/" + file, t);
            })
        }
    }

    static mv(f, t) {
        if (!f || !t) return EIOErrors.PATH_MISSING;
        f = IO.root(f)
        t = IO.root(t)
        return fs.renameSync(f, t)
    }

}