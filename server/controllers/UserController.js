import { userAddUser, userGetAllUsers, userGetUserById, userUpdateUser } from '../models/UserModel.js'
import { getUserByUsername } from '../models/AuthModel.js'
import { HTTP_STATUS } from '../helper/httpStatus.js'

export const getAllUsers = async (req, res) => {
  try {
    const users = await userGetAllUsers();
    return res.status(HTTP_STATUS.OK).json(users);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
}

export const getAllUserById = async (req, res) => {
  try {
    const userId = await req.params.id
    const user = await userGetUserById(userId)
    if (!user) return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'User not found' });
    return res.status(HTTP_STATUS.OK).json(user);
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
}

export const addUser = async (req, res) => {
  try {
    const user = await req.body;
    const existingUser = await getUserByUsername(user.username);

    if(existingUser){
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Username already exist' });
    }

    const newUser = await userAddUser(user)
    return res.status(HTTP_STATUS.OK).json({  userId: newUser, message: 'User added successfully' });

  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
}

export const updateUser = async (req, res) => {
  try {
    const userId = await req.params.id;
    const user = await req.body;
    const updatedUser = await userUpdateUser({ id: userId, ...user })
    return res.status(HTTP_STATUS.OK).json({ user: updatedUser, message: 'User updated successfully' });
  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
}
