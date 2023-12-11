import { Router } from "express"
import { loginWeb, logout } from "../controllers/AuthController.js"

const route = Router()

route.post("/login", loginWeb)
route.post("/logout", logout)

export default route