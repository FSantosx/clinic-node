export const DIR_ROOT = __dirname + '/';
export const EIO = Object.freeze({
    REPLACE: 0
    , APPEND: 1
    , MAX_LOG_LINES: 1024
})
export const EIOErrors = Object.freeze({
    PATH_MISSING: -1
    , OBJ_MISSING: -2
    , PATH_BROKEN: -3
})

export const VERBOSE = process.env.VERBOSE * 1 || 0

export const UTF8 = "utf8"

export const EArrayOperations = Object.freeze({
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

export const EArrayCasts = Object.freeze({
    STRING: 0
    , FLOAT: 1
    , INT: 2
})

export const DEBUG = false
export const SUM = 0
export const AVERAGE = 1
export const HARMONIC = 2
export const TREND = 3
export const PROGRESS = 4
export const INTERPOLATE = 5
export const MAX = 6
export const MIN = 7
export const RELATIFY = 8
export const PASSWD_AUTO_HASH = 0
export const NUMBER = 0
export const STRING = 1
export const GAUGE_LEN = process.stdout.columns || 64;
export const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro", "jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez", "january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december", "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];