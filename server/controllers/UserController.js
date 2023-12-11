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

export const getAllUserByBarangay = async (req, res) => {
  try {
    const addressId = await req.params.address_id
    const user = await userModel.getUserByBarangay(addressId)
    if (!user) return res.json('User not found');
    return res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    return res.json('Internal Server Error');
  }
}

export const getAllUserByRole = async (req, res) => {
  try {
    const role = await req.params.role
    const user = await userModel.getAllUserNotEqualToRole(role)
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
    const user = await req.body;
    const updatedUser = await userModel.updateUser(user)
    return res.status(HTTP_STATUS.OK).json({ user: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    return res.json('Internal Server Error');
  }
}

export const updateAccount = async (req, res) => {
  try {
    const accountData = await req.body
    const updatedAccount = await userModel.updateAccount(accountData)
    return res.status(HTTP_STATUS.OK).json({ user: updatedAccount, message: 'Account updated successfully' });
  } catch (error) {
    return res.json('Internal Server Error');
  }
}

export const updateSecurity = async (req, res) => {
  try {
    const { rbim_token } = await req.cookies;
    const accountData = await req.body
    if(rbim_token){
      jwt.verify(rbim_token, process.env.JWT_SECRET, {}, async (err, user) => {
        if(err) throw err;
        if(user.password !== accountData.currentPassword) {
          return res.json("Current password is incorrect")
        }
        const updatedUser = await userModel.updateSecurity(accountData)
        return res.status(HTTP_STATUS.OK).json({ user: updatedUser, message: 'Secury updated successfully' });
      })
    }else{
      return res.json('Unathorized access');
    }
  } catch (error) {
    return res.json('Internal Server Error');
  }
}

export const getLoggedUser = async (req, res) => {
  try {
    const { rbim_token } = await req.cookies;
    if(rbim_token){
      jwt.verify(rbim_token, process.env.JWT_SECRET, {}, async (err, user) => {
        if(err) throw err;
        const userLogged = await userModel.getUserById(user.id);
        const { id, name, username, address_id, role } = userLogged;
        res.status(HTTP_STATUS.OK).json({ id, name, username, address_id, role });
      })
    }else{   
      res.json(null);
    }
  } catch (error) {
    return res.json('Internal Server Error');
  }
}

export const removeUser = async (req, res) => {
  try {
    const userId = req.params.user_id
    const response = await userModel.removeUser(userId)
    res.status(HTTP_STATUS.OK).json(response);
  } catch (error) {
    return res.json('Internal Server Error');
  }
}