import db from '../dbConnect.js'
import { encrypt } from '../helper/passwordEncryptor.js';

const getAllUsers = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users INNER JOIN address ON users.address_id = address.id', (error, results) => {
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

const getUserById = async (userId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users INNER JOIN address ON users.address_id = address.id WHERE users.id=?`, [userId], (error, results) => {
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

const addUser = async (user) => {
  try {
    const encryptedPassword = encrypt(user.password)
    const result = await new Promise((resolve, reject) => {
      db.query(`INSERT INTO users (name, address_id, username, password, role) VALUES (?, ?, ?, ?, ?)`, [user.name, user.address_id, user.username, encryptedPassword, user.role], (error, results) => {
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

const updateUser = async (userData) => {
  try {
    const encryptedPassword = encrypt(userData.password)
    const result = await new Promise((resolve, reject) => {
      db.query('UPDATE users SET name=?, address_id=?, username=?, password=?, role=? WHERE id=?', [userData.name, userData.address_id, userData.username, encryptedPassword, userData.role, userData.id], (error, results) => {
        if (error) {
          reject(error)
        }else{
          resolve(results);
        }
      });
    })

    if(result.affectedRows > 0 ){
      const updatedUser = await getUserById(userData.id);
      return updatedUser;
    }else{
      return null
    }
  } catch (error) {
    throw error
  }
}

export const userModel = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser
}