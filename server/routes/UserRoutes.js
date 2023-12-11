import { Router } from "express"
import { addUser, getAllUserByBarangay, getAllUserById, getAllUserByRole, getAllUsers, getLoggedUser, removeUser, updateAccount, updateSecurity, updateUser } from "../controllers/UserController.js"

const route = Router()

route.get("/users", getAllUsers)
route.get("/user/:id", getAllUserById)
route.get("/user/address/:address_id", getAllUserByBarangay)
route.get("/user/role/:role", getAllUserByRole)
route.get("/user_logged", getLoggedUser)
route.post("/user", addUser)
route.put("/user", updateUser)
route.put("/user/account", updateAccount)
route.put("/user/security", updateSecurity)
route.delete("/user/:user_id", removeUser)

export default route

