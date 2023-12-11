import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authModel } from "../models/AuthModel.js";
import { HTTP_STATUS } from '../helper/httpStatus.js';

export const loginWeb = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authModel.getUserByUsername(username);

    if(!user || user?.role === 'health_worker') {
      return res.json('User not found');
    }

    const isPasswordCorrect = bcrypt.compareSync(password.trim(), user.password);

    if (!isPasswordCorrect) {
      return res.json('Incorrect Password');
    }

    const tokenPayload = { password: password, id: user.id, username: user.username, address_id: user.address_id, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {});

    res.cookie('rbim_token', token);
    
    return res.status(HTTP_STATUS.OK).json('success');
  } catch (error) {
    return res.json('Internal Server Error');
  }
};

export const logout = (req, res) => {
	res.cookie("rbim_token", "").json(true);
};

