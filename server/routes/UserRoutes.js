import { Router } from "express"
import { addUser, getAllUserById, getAllUsers } from "../controllers/UserController.js"

const route = Router()

route.get("/users", getAllUsers)
route.get("/user/:id", getAllUserById)
route.post("/user", addUser)

export default route

