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

const getUserByBarangay = async (addressId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query('SELECT users.*, address.barangay, address.municipal, address.province FROM users INNER JOIN address ON users.address_id = address.id WHERE users.address_id = ?', [addressId], ((error, results) => {
        if (error) {
          reject(error);
        }else{
          resolve(results);
        }
      }))
    })

    return result && result.length > 0 ? result : null
  } catch (error) {
    throw error
  }
}

const getAllUserNotEqualToRole = async (role) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("SELECT users.*, address.barangay, address.municipal, address.province FROM users INNER JOIN address ON users.address_id = address.id WHERE users.role != ?", [role],((error, results) => {
        if (error) {
          reject(error);
        }else{
          resolve(results);
        }
      }))
    })

    return result && result.length > 0 ? result : null
  } catch (error) {
    throw error
  }
}

const getUserById = async (userId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query(
        `SELECT users.*, address.barangay, address.municipal, address.province FROM users INNER JOIN address ON users.address_id = address.id WHERE users.id = ?`,
        [userId], 
        (error, results) => {
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
      db.query(`INSERT INTO users (name, address_id, username, password, role, status) VALUES (?, ?, ?, ?, ?, ?)`, 
      [user.name, user.address_id, user.username, encryptedPassword, user.role, user.status], (error, results) => {
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
      db.query('UPDATE users SET name=?, address_id=?, username=?, password=?, role=?, status=? WHERE id=?', 
      [userData.name, userData.address_id, userData.username, encryptedPassword, userData.role, userData.status, userData.id], 
      (error, results) => {
        if (error) {
          reject(error)
        }else{
          resolve(results);
        }
      });
    })

    return result && result.affectedRows > 0 ? result : null
  } catch (error) {
    throw error
  }
}

const updateAccount = async (accountData) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query("UPDATE users SET name = ?, username = ?, address_id = ? WHERE id = ?", [accountData.name, accountData.username, accountData.address_id, accountData.id], ((error, results) => {
        if (error) {
          reject(error)
        }else{
          resolve(results);
        }
      }))
    })

    return result && result.affectedRows > 0 ? result : null
  } catch (error) {
    throw error
  }
}

const updateSecurity = async (accountData) => {
  try {
    const encryptedPassword = encrypt(accountData.confirmPassword)
    const result = await new Promise((resolve, reject) => {
      db.query("UPDATE users SET password = ? WHERE id = ?", [encryptedPassword, accountData.id], ((error, results) => {
        if (error) {
          reject(error)
        }else{
          resolve(results);
        }
      }))
    })

    return result && result.affectedRows > 0 ? result : null
  } catch (error) {
    throw error
  }
}

const removeUser = async (userId) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
          reject(error)
        }else{
          resolve(results);
        }
      });
    })
    return result && result.affectedRows  > 0 ? userId : null 
  } catch (error) {
    throw error
  }
}

export const userModel = {
  getAllUsers,
  getUserByBarangay,
  getAllUserNotEqualToRole,
  getUserById,
  addUser,
  updateUser,
  updateAccount,
  updateSecurity,
  removeUser
}