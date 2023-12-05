import { Router } from "express"
import { addUser, getAllUserById, getAllUsers, updateUser } from "../controllers/UserController.js"

const route = Router()

route.get("/users", getAllUsers)
route.get("/user/:id", getAllUserById)
route.post("/user", addUser)
route.put("/user/:id", updateUser)

export default route

