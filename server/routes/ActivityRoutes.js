import upload from "../multer.js"
import { Router } from "express"
import { addActivity, deleteActivityById, getActivityById, getAllActivity, getAllAnnouncements, getAllEventsAnsPrograms, removeUploadedImage, sendSMS, updateActivity, uploadImage } from "../controllers/ActivityController.js"

const route = Router()

route.post("/upload", upload.single('image'), uploadImage)
route.post("/remove_image", removeUploadedImage)
route.post("/activity", addActivity)
route.post("/send_SMS", sendSMS)
route.put("/activity", updateActivity)
route.get("/activity/:id", getActivityById)
route.get("/activities", getAllActivity)
route.get("/activities/announcements", getAllAnnouncements)
route.get("/activities/events_and_programs", getAllEventsAnsPrograms)
route.delete("/activity/:id", deleteActivityById)

export default route