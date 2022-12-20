const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host: 'lucky.db.elephantsql.com',
        port: 5432,
        user: 'ppovbonv',
        password: 'wHc268wqcKkRXLwX_V_mSR3YbIomY1t_',
        database: 'ppovbonv',
    }
})

module.exports = {
    db
}