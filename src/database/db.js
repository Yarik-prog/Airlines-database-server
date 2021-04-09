const Pool = require("pg").Pool
const pool = new Pool({
    user:'postgres',
    password:'1290',
    host:'localhost',
    port:5432,
    database:'airlines'
})

module.exports = pool