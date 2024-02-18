import cookieParser from "cookie-parser"
import express from 'express'
import cors from 'cors'

import './config.js'
import db from './dbConnect.js'

import userRoutes from './routes/UserRoutes.js'
import authRoutes from './routes/AuthRoutes.js'
import questionRoutes from './routes/QuestionRoutes.js'
import responseRoutes from './routes/ResponseRoutes.js'
import addressRoutes from './routes/AddressRoutes.js'
import surveyFormRoutes from './routes/SurveyFormRoutes.js'
import ReportRoutes from './routes/ReportRoutes.js'
import ActivityRoutes from './routes/ActivityRoutes.js'

const app = express()
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', '*']
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('uploads'))
app.use("/api", userRoutes)
app.use("/api", authRoutes)
app.use("/api", questionRoutes)
app.use("/api", responseRoutes)
app.use("/api", addressRoutes)
app.use("/api", surveyFormRoutes)
app.use("/api", ReportRoutes)
app.use("/api", ActivityRoutes)

const PORT = process.env.SERVER_PORT || 4000;

db.connect((err) => {
    if(err) return console.log("Database Disconnected");
    console.log("Database Connected");
})
  
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));