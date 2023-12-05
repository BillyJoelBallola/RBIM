import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByUsername } from "../models/AuthModel.js";

export const login = async (req, res) => {
  const { username, password } = await req.body
  getUserByUsername(username, (error, user) => {
    if(error) return res.status(500).json({ error: 'Internal Server Error' })
    if(user){
      const isPasswordCorrect = bcrypt.compareSync(password.trim(), user.password);
      if(isPasswordCorrect){
        jwt.sign({ id: user.id, username: user.username, password: user.password, type: user.type}, process.env.JWT_SECRET, {}, (error, token) => {
          if(error) return res.status(401).json({ error: 'Failed to set token' })
          res.cookie("rbim_token", token)
          res.json("login success")
        })
      }else{
        res.status(401).json({ error: 'Incorrect password for username: ' + username })
      }
    }else{
      res.status(401).json({ error: 'User not found' })
    }
  })
}

export const logout = (req, res) => {
	res.cookie("rbim_token", "").json(true);
};