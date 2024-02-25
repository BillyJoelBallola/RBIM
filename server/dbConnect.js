import mysql from 'mysql'

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_USER,
  database: process.env.DB_NAME
}

const connection = mysql.createConnection(config)

export default connection
