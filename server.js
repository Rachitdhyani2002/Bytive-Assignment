//Import Statements
import express from 'express'
import cors from "cors"
import dotenv from 'dotenv'
import taskRoutes from './routes/taskRoute.js'
import 'colors'

//Dotenv Configuration
dotenv.config()

//Rest Object
const app = express()

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/v1/tasks',taskRoutes)

//Port
const PORT = process.env.PORT || 8080

//Listening Server
app.listen(PORT,()=>{
    console.log(`Server Running At Port ${PORT}`.bgCyan.white)
})