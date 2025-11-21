import pg from'pg'
import 'dotenv/config'

const { DB_HOST , DB_USER, DB_PASS, DB_DATABASE} = process.env

const pool = new pg.Pool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database:DB_DATABASE,
    allowExitOnIdle:true
})

export default pool