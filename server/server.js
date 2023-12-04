import cookieParser from "cookie-parser"
import express from 'express'
import cors from 'cors'

import './config.js'
import dbConnection from './dbConnect.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

// app.get("/users", (req, res) => {
//     const getUsers = "SELECT * FROM users";
//     dbConnection.query(getUsers, (err, result) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             res.status(500).send("Internal Server Error");
//             return;
//         }

//         res.send(result);
//     });
// });

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));