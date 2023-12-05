import db from '../dbConnect.js'
import bcrypt from 'bcrypt'

const brcyptSalt = bcrypt.genSaltSync(10);

export const userGetAllUsers = (callback) => {
  db.query('SELECT * FROM users', (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results);
  });
}

export const userGetUserById = (userId, callback) => {
  db.query(`SELECT * FROM users WHERE id = ${userId}`, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results[0]);
  });
}

export const userAddUser = (user, callback) => {
  const encryptedPassword = bcrypt.hashSync(user.password, brcyptSalt)
  db.query(`INSERT INTO users (name, username, password, type) values ('${user.name}', '${user.username}', '${encryptedPassword}' ,'${user.type}')`, (error, results) => {
    if (error) {
      return callback(error, null);
    }
    return callback(null, results.insertId);
  });
}

export const userUpdateUser = (user, callback) => {
  
}