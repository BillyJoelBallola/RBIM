import { Router } from "express"; 
import { getAllAddress } from "../controllers/AddressController.js";

const route = Router()

route.get("/address", getAllAddress)

export default route