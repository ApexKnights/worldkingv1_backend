import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import authRouter from './routes/auth.js'
import ticketRouter from './routes/tickets.js'
import userRouter from './routes/user.js'
import panelRouter from "./routes/panel.js"
import noticeRouter from "./routes/notice.js"
import { startAutoPanelCron } from "./cron/autoPanel.js"




const app = express()



app.use(cors({
    origin: "https://worldkingofficial.in",
    // origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/tickets', ticketRouter)
app.use('/api/v1/panel', panelRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/notice', noticeRouter)

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "JDMDatabase" });
        console.log("World King Database accessed 🎇❤")
    } catch (error) {
        console.log(error)
    }
}



app.get("/", async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running successfully on 8080"
    })
})



startAutoPanelCron()




app.listen(8080, () => {
    ConnectDb()
    console.log("WorldKing Server Initiated")
})