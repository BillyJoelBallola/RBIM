import db from '../dbConnect.js'

const getUserByUsername = async (username, callback) => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM users WHERE username = ?', [username], ((error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }))
    })
    const user = result && result.length > 0 ? result[0] : null;
    return user;
  } catch (error) {
    throw error;
  }
}

export const authModel = {
  getUserByUsername
}