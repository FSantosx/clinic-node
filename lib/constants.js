// CONSTANTS
global.NOT_SET      = 0;

global.UTF8         = global.utf8 = 'utf8';
global.PORT         = process.env.PORT       || 3000;
global.IO_MODE      = process.env.IO_MODE*1  || 0;
global.IS_DEV       = process.env.IS_DEV*1   || 0;
global.PROFILE      = process.env.PROFILE;
global.ROOT         = __dirname + '/';

// ENUMS
global.EPaths = Object.freeze({
    LIB                     : ROOT + 'lib/'
    , MODELS                : ROOT + `${this.LIB}models/`
})

global.EUser = Object.freeze ({
    NOT_SET : NOT_SET
})

global.EStatus = Object.freeze({
    NOT_SET                 : NOT_SET
    , ACTIVE                : 1
    , INACTIVE              : 2
    /** 3-8 */
    , UNDEFINED             : 9
})

global.EErrors = Object.freeze({
    NOT_SET                 : NOT_SET
})

module.exports = null