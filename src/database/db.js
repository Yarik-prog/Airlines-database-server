const {Pool} = require("pg")
const pool = new Pool({
    user:'postgres',
    paswword:'1290',
    host:'localhost',
    port:5432,
    database:'airlines'
})

module.exports = pool