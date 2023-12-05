import db from '../dbConnect.js'
import { encrypt } from '../helper/passwordEncryptor.js';

export const userGetAllUsers = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users', (error, results) => {
        if (error) {
          reject(error);
        }else{
          resolve(results);
        }
      });
    })
    const users = result && result.length > 0 ? result : null
    return users;
  } catch (error) {
    throw error
  }
}

export const userGetUserById = async (userId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE id = ?`, [userId], (error, results) => {
        if (error) {
          reject(error)
        }else{
          resolve(results)
        }
      });
    })
    const user = result && result.length > 0 ? result[0] : null
    return user
  } catch (error) {
    throw error
  }
}

export const userAddUser = async (user) => {
  try {
    const encryptedPassword = encrypt(user.password)
    const result = await new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (name, username, password, type) VALUES (?, ?, ?, ?)`, [user.name, user.username, encryptedPassword, user.type], (error, results) => {
        if (error) {
          reject(error)
        }else{
          resolve(results);
        }
      });
    })

    const userId = await result.insertId;
    return userId
  } catch (error) {
    throw error
  }
}

export const userUpdateUser = async (userData) => {
  try {
    const encryptedPassword = encrypt(userData.password)
    const result = await new Promise((resolve, reject) => {
      db.query( 'UPDATE users SET name=?, username=?, password=?, type=? WHERE id=?', [userData.name, userData.username, encryptedPassword, userData.type, userData.id], (error, results) => {
        if (error) {
          reject(error)
        }else{
          resolve(results);
        }
      });
    })

    if(result.affectedRows > 0 ){
      const updatedUser = await userGetUserById(userData.id);
      return updatedUser;
    }else{
      return null
    }
  } catch (error) {
    throw error
  }
}