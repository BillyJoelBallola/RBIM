import { userAddUser, userGetAllUsers, userGetUserById } from '../models/UserModel.js'
import { getUserByUsername } from '../models/AuthModel.js'

export const getAllUsers = (req, res) => {
  userGetAllUsers((error, users) => {
    if (error) return res.status(500).json({ error: 'Internal Server Error' });
    res.json(users);
  })
}

export const getAllUserById = async (req, res) => {
  const userId = await req.params.id;
  userGetUserById(userId, (error, user) => {
    if (error) return res.status(500).json({ error: 'Internal Server Error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  })
}

export const addUser = async (req, res) => {
  const user = await req.body;
  getUserByUsername(user.username, (error, user) => {
    if (error) return res.status(500).json({ error: 'Internal Server Error' });
    if(user){
      res.status(400).json({ message: 'Username already exist' });
    }else{  
      userAddUser(user, (error, user) => {
        if (error) return res.status(500).json({ error: 'Internal Server Error' });
        res.status(201).json({  userId: user, message: 'User added successfully' });
      })
    }
  })
}
