import { Router } from "express"
import { loginMobile, loginWeb, logout } from "../controllers/AuthController.js"

const route = Router()

route.post("/login", loginWeb)
route.post("/mobile/login", loginMobile)
route.post("/logout", logout)

export default route