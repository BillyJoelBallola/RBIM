import { userModel } from '../models/UserModel.js'
import { authModel } from '../models/AuthModel.js'
import { HTTP_STATUS } from '../helper/httpStatus.js'
import jwt from 'jsonwebtoken'

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    return res.status(HTTP_STATUS.OK).json(users);
  } catch (error) {
    return res.json('Internal Server Error');
  }
}

export const getAllUserById = async (req, res) => {
  try {
    const userId = await req.params.id
    const user = await userModel.getUserById(userId)
    if (!user) return res.json('User not found');
    return res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    return res.json('Internal Server Error');
  }
}

export const addUser = async (req, res) => {
  try {
    const user = await req.body;
    const existingUser = await authModel.getUserByUsername(user.username);

    if(existingUser){
      return res.json('Username already exist');
    }

    const newUser = await userModel.addUser(user)
    return res.status(HTTP_STATUS.OK).json({  userId: newUser, message: 'User added successfully' });

  } catch (error) {
    return res.json('Internal Server Error');
  }
}

export const updateUser = async (req, res) => {
  try {
    const userId = await req.params.id;
    const user = await req.body;
    const updatedUser = await userModel.updateUser({ id: userId, ...user })
    return res.status(HTTP_STATUS.OK).json({ user: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    return res.json('Internal Server Error');
  }
}

export const getLoggedUser = async (req, res) => {
  const { rbim_token } = await req.cookies;
  if(rbim_token){
      jwt.verify(rbim_token, process.env.JWT_SECRET, {}, async (err, user) => {
        if(err) throw err;
        const userLogged = await userModel.getUserById(user.id);
        const { name, username, address_id, role } = userLogged;
        res.status(HTTP_STATUS.OK).json({ name, username, address_id, role });
      })
  }else{   
      res.json(null);
  }
}