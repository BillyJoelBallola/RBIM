import { Router } from "express"
import { addUser, getAllUserByBarangay, getAllUserById, getAllUserByRole, getAllUsers, getLoggedUser, getLoggedUserMobile, removeUser, updateAccount, updateInformationMobile, updateSecurity, updateSecurityMobile, updateUser } from "../controllers/UserController.js"

const route = Router()

route.get("/users", getAllUsers)
route.get("/user/:id", getAllUserById)
route.get("/user/address/:address_id", getAllUserByBarangay)
route.get("/user/role/:role", getAllUserByRole)
route.get("/user_logged/:rbim_token", getLoggedUser)
route.post("/mobile/user_logged", getLoggedUserMobile)
route.post("/user", addUser)
route.put("/user", updateUser)
route.put("/user/account", updateAccount)
route.put("/user/security", updateSecurity)
route.put("/user/mobile/security", updateSecurityMobile)
route.put("/user/mobile/information", updateInformationMobile)
route.delete("/user/:user_id", removeUser)

export default route

