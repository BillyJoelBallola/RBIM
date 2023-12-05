import db from '../dbConnect.js'

export const getUserByUsername = (username, callback) => {
  db.query(`SELECT * FROM users WHERE username = '${username}'`, ((error, result) => {
    if(error) return callback(error, null);
    return callback(null, result[0])
  }))
}