import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authModel } from "../models/AuthModel.js";
import { userModel } from "../models/UserModel.js";

export const loginWeb = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await authModel.getUserByUsername(username);

    if (user?.status === 2){
      return res.json({ success: false, message: 'Your account is deactivated, please contact the administrator.' })
    }

    if(!user || user?.role === 'health_worker') {
      return res.json({ success: false, message: 'User not found'});
    }

    const isPasswordCorrect = bcrypt.compareSync(password.trim(), user.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: 'Incorrect Password'});
    }    

    const tokenPayload = { password: password, id: user.id, username: user.username, address_id: user.address_id, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {});

    res.cookie('rbim_token', token, { sameSite: 'None' });
    res.json({ success: true, message: 'Login successfull'});
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
};

// login for mobile
export const loginMobile = async (req, res) => {
  try {
    const { username, password } = await req.body;
    const user = await authModel.getUserByUsername(username);
    
    if (user?.status === 2){
      return res.json({ success: false, message: 'Your account is deactivated, please contact the administrator.' })
    }

    if(!user || user?.role !== 'health_worker') {
      return res.json({ success: false, message: 'User not found'});
    }
    
    const isPasswordCorrect = bcrypt.compareSync(password.trim(), user.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: 'Incorrect Password'});
    }

    const payload = { username: user.username, name: user.name, id: user.id, address: user.address_id, role: user.role}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {});

    return res.json({ success: true, token: token, message: 'Login successfull'});
  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { password, userId, rbim_token } = await req.body;
    const userData = await userModel.getUserById(userId);

    if(rbim_token){
      jwt.verify(rbim_token, process.env.JWT_SECRET, {}, async (err, user) => {
        if(err) throw err;
        const userLogged = await userModel.getUserById(user.id);
        const isPasswordCorrect = bcrypt.compareSync(password.trim(), userLogged.password);
        if(isPasswordCorrect){
          await userModel.updateUser({...userData, password: `rbim_${userData.username}`})
          return res.json({ success: true, message: `${userData?.name}'s account successfully reseted the password` });
        }else{
          return res.json({ success: false, message: 'Incorrect password, please try again'});
        }
      })
    }else{
      return res.json({ success: false, message: 'Unathorized access' });
    }

  } catch (error) {
    return res.json({ success: false, message: 'Internal server error'});
  }
}

export const logout = (req, res) => {
	res.cookie("rbim_token", "").json(true);
};

