import cookieParser from "cookie-parser"
import express from 'express'
import cors from 'cors'

import './config.js'
import db from './dbConnect.js'

import userRoutes from './routes/UserRoutes.js'
import authRoutes from './routes/AuthRoutes.js'
import questionRoutes from './routes/QuestionRoutes.js'
import responseRoutes from './routes/ResponseRoutes.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

const prefix = "/api"

app.use(prefix, userRoutes)
app.use(prefix, authRoutes)
app.use(prefix, questionRoutes)
app.use(prefix, responseRoutes)

const PORT = process.env.SERVER_PORT || 4000;

db.connect((err) => {
    if(err) return console.log("Database Disconnected");
    console.log("Database Connected");
})
  
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));