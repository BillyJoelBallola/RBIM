import mysql from 'mysql'

// const config = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// }

// const connection = mysql.createPool(config)
const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rbim_system'
}

const connection = mysql.createConnection(config)

export default connection
