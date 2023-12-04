import mysql from 'mysql'

const serverCredentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}

const connection = mysql.createConnection(serverCredentials)

connection.connect((err) => {
  if(err) console.log("Database Disconnected");
  console.log("Database Connected");
})

export default connection
