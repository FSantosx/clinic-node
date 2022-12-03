const IO = require('./etc/io')

module.exports = class Entities {

    static init(table, action, id = null, payload=null) {
        let res;
        switch (action) {
            case "create":
                res = Entities.create(table, payload)
                return res
                break;
            case "list":
                res = Entities.list(table)
                return res
                break;
            case "edit":
                res = Entities.edit(table, id)
                return res
                break;
            case "delete":
                res = Entities.delete(table, id)
                return res
                break;
            default:
                break;
        }
    }

    static create(table, payload) {
        let newid = parseInt((Math.random() * 1000000))
        const file = `./db/${table}/${newid}.json`
        var obj = {}
        for (const [field, value] of Object.entries( payload )) {
            obj[ field ] = value
        }      
        if (IO.jin(file, obj)) {
            return newid ;;
        } else {
            return false;
        }
    }

    static list(table) {
        const files = IO.scan(`./db/${table}`)
        const arr = []
        files.map(file => {
           arr.push(IO.jout(`./db/${table}/${file}`))
        })
        return arr;;
    }
    
    static edit(table, id) {
        const file = `./db/${table}/${id}.json`
        let arr = []
        arr.push(IO.jout(file))
        return arr;;
    }

    static delete(table, id) {
        const file = `./db/${table}/${id}.json`        
        IO.rm(file)
        return 'true';;                 
    }
}