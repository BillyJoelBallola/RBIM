import db from '../dbConnect.js'

const getAllAddress = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      db.query('SELECT * FROM address', ((error, results) => {
        if(error){
          reject(error)
        }else{
          resolve(results)
        }
      }))
    })

    return result && result.length > 0 ? result : null
  } catch (error) {
    throw error
  }
}

export const addressModel = {
  getAllAddress
}