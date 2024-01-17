import { Router } from "express"
import { loginMobile, loginWeb, logout, resetPassword } from "../controllers/AuthController.js"

const route = Router()

route.post("/login", loginWeb)
route.post("/mobile/login", loginMobile)
route.post("/logout", logout)
route.post("/reset_password", resetPassword)

export default route