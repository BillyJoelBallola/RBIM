import bcrypt from 'bcrypt'

const brcyptSalt = bcrypt.genSaltSync(10);

export const encrypt = (password) => {
  const encrypted = bcrypt.hashSync(password, brcyptSalt)
  return encrypted;
}