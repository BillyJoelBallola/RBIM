import { userModel } from '../models/UserModel.js'
import { authModel } from '../models/AuthModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    return res.json({ success: true, data: users});
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

export const getAllUserById = async (req, res) => {
  try {
    const userId = await req.params.id
    const user = await userModel.getUserById(userId)
    if (!user) return res.json('User not found');
    return res.json({ success: true, data: user});
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

export const getAllUserByBarangay = async (req, res) => {
  try {
    const addressId = await req.params.address_id
    const user = await userModel.getUserByBarangay(addressId)
    if (!user) return res.json({ success: false, message: 'User not found' });
    return res.json({ success: true, data: user});
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

export const getAllUserByRole = async (req, res) => {
  try {
    const role = await req.params.role
    const user = await userModel.getAllUserNotEqualToRole(role)
    if (!user) return res.json({ success: false, message: 'User not found' });
    return res.json({ success: true, data: user});
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

export const addUser = async (req, res) => {
  try {
    const user = await req.body;
    const allUsers = await userModel.getAllUsers();
    const existingUser = await authModel.getUserByUsername(user.username);
    const thereIsSecretary = allUsers?.some(item => (Number(user?.address_id) === item.address_id && item.role === 'secretary' && item.status === 1))
    const numberOfAdministrator = allUsers?.filter(item => (item.role === 'administrator' && item.status === 1))?.length

    if(existingUser){
      return res.json({ success: false, message: 'User already exist' });
    }

    if(user?.role?.includes('administrator')){
      if(thereIsSecretary){
        return res.json({ success: false, message: 'Number of secretary is succeeded. Only one[1] secretary account per barangay' });
      }
    }

    if(numberOfAdministrator === 2){
      return res.json({ success: false, message: 'Number of administrator is succeeded. Only two[2] administrator account is allowed' });
    }

    const newUser = await userModel.addUser(user)
    return res.json({  success: true, data: newUser, message: 'User added successfully' });
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await req.body;
    const updatedUser = await userModel.updateUser(user)
    return res.json({ success: true, user: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

export const updateAccount = async (req, res) => {
  try {
    const accountData = await req.body
    const updatedAccount = await userModel.updateAccount(accountData)
    return res.json({ success: true, user: updatedAccount, message: 'Account updated successfully' });
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

// web
export const updateSecurity = async (req, res) => {
  try {
    const { accountData, rbim_token} = await req.body
    if(rbim_token){
      jwt.verify(rbim_token, process.env.JWT_SECRET, {}, async (err, user) => {
        if(err) throw err;
        if(user.password !== accountData.currentPassword) {
          return res.json({ success: false, message: 'Current password is incorrect'});
        }
        const updatedUser = await userModel.updateSecurity(accountData)
        return res.json({ success: true, data: updatedUser, message: 'Security updated successfully'});
      })
    }else{
      return res.json('Unathorized access');
    }
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

// mobile
export const updateSecurityMobile = async (req, res) => {
  try {
    const accountData = await req.body
    const user = await userModel.getUserById(accountData?.id)

    const isCurrentPasswordCorrect = bcrypt.compareSync(accountData?.currentPassword.trim(), user.password);
    
    if(!isCurrentPasswordCorrect) {
      return res.json({ success: false, message: 'Current password is incorrect'});
    }

    const updatedUser = await userModel.updateSecurity(accountData)

    return res.json({ success: true, data: updatedUser, message: 'Security updated successfully'});
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

// mobile
export const updateInformationMobile = async (req, res) => {
  try {
    const accountData = await req.body
    const updatedUser = await userModel.updateInformation(accountData)
    return res.json({ success: true, data: updatedUser, message: 'Information updated successfully'});
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

// web
export const getLoggedUser = async (req, res) => {
  try {
    const { rbim_token } = await req.params;
    if(rbim_token){
      jwt.verify(rbim_token, process.env.JWT_SECRET, {}, async (err, user) => {
        if(err) throw err;
        const userLogged = await userModel.getUserById(user.id);
        const { id, name, username, address_id, role } = userLogged;
        return res.json({ success: true, data: { id, name, username, address_id, role }});
      })
    }else{   
      return res.json({ success: false, message: 'Unathorized access' });
    }
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

// mobile
export const getLoggedUserMobile = async (req, res) => {
  try {
    const { token } = await req.body;
    if(token){
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
        if(err) throw err;
        const userLogged = await userModel.getUserById(user.id);
        const { id, name, username, address_id, role } = userLogged;
        return res.json({ success: true, data: { id, name, username, address_id, role }});
      })
    }else{
      return res.json({ success: false, message: 'Unathorized access' });
    }
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

export const removeUser = async (req, res) => {
  try {
    const userId = req.params.user_id
    const response = await userModel.removeUser(userId)
    return res.json({ success: true, data: response, message: 'Deleted successfully'});
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}