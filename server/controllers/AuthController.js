import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByUsername } from "../models/AuthModel.js";
import { HTTP_STATUS } from '../helper/httpStatus.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'User not found' });
    }

    const isPasswordCorrect = bcrypt.compareSync(password.trim(), user.password);

    if (!isPasswordCorrect) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Incorrect Password' });
    }

    const tokenPayload = { id: user.id, username: user.username, type: user.type };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {});

    res.cookie('rbim_token', token);

    const userWithoutPassword = { id: user.id, username: user.username, type: user.type };
    return res.status(HTTP_STATUS.OK).json(userWithoutPassword);

  } catch (error) {
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

export const logout = (req, res) => {
	res.cookie("rbim_token", "").json(true);
};

