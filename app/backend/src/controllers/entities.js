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
            case "get":
                res = Entities.get(table, id)
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
        let id = parseInt((Math.random() * 1000000))
        console.log(payload)
        if(payload?.id) {
            id = payload.id
        }

        const file = `./db/${table}/${id}.json`
        var obj = {'id' : id}        
        for (const [field, value] of Object.entries( payload.formData )) {
            obj[ value.name ] = value.value
        }      
        if (IO.jin(file, obj)) {
            return id ;;
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
    
    static get(table, id) {
        const file = `./db/${table}/${id}.json`
        let arr = []
        arr.push(IO.jout(file))
        console.log(arr)
        return arr;;
    }

    static delete(table, id) {
        const file = `./db/${table}/${id}.json`        
        IO.rm(file)
        return 'true';;                 
    }
}