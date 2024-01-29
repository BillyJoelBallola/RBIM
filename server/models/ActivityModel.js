import db from '../dbConnect.js'

const addActivity = async (activity) => {
    try {
        const { title, content, type, address_barangay, image, date } = activity
        const result = await new Promise((resolve, reject) => {
            db.query('INSERT INTO activities (title, content, type, address_barangay, date, image) VALUES (?, ?, ?, ?, ?, ?)',
                [title, content, type, address_barangay, date, image], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    }else{
                        resolve(results);
                    }
                });
        })

        return result ? result.insertId : null;
    } catch (error) {
        throw error
    }
}

const updateActivity = async (activity) => {
    try {
        const { title, content, type, address_barangay, image, date, id } = activity
        const result = await new Promise((resolve, reject) => {
            db.query('UPDATE activities SET title = ?, content = ?, type = ?, address_barangay = ?, image = ?, date = ? WHERE id = ?',
                [title, content, type, address_barangay, image, date, id], 
                (error, results) => {
                    if (error) {
                        reject(error);
                    }else{
                        resolve(results);
                    }
                });
        })

        return result ? result.insertId : null;
    } catch (error) {
        throw error
    }
}

const getActivityById = async (id) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM activities WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })

        return result && result.length > 0 ? result[0] : null;
    } catch (error) {
        throw error
    }
}

const getAllActivity = async (id) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM activities', (error, results) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })

        return result && result.length > 0 ? result : null;
    } catch (error) {
        throw error
    }
}

const getAllEventsAndPrograms = async () => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM activities WHERE type = 1 OR type = 2', (error, results) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })

        return result && result.length > 0 ? result : null;
    } catch (error) {
        throw error
    }
}

const getAllAnnouncements = async () => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM activities WHERE type = 3', (error, results) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })

        return result && result.length > 0 ? result : null;
    } catch (error) {
        throw error
    }
}

const deleteActivityById = async (id) => {
    try {
        const result = await new Promise((resolve, reject) => {
            db.query('DELETE FROM activities WHERE id = ?', [id], (error, results) => {
                if (error) {
                    reject(error);
                }else{
                    resolve(results);
                }
            });
        })

        return result && result.length > 0 ? result : null;
    } catch (error) {
        throw error
    }
}

export const activityModel = {
    addActivity,
    getActivityById,
    getAllActivity,
    updateActivity,
    getAllEventsAndPrograms,
    getAllAnnouncements,
    deleteActivityById
}