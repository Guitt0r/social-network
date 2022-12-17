import 'dotenv/config'
import express from 'express'
import {connectDB} from "./db/connectDb";
import AppRouter from "./routes";
import bodyParser from "body-parser";
import cors from 'cors'

const app = express()
const router = new AppRouter(app)

connectDB()

app.set('port', process.env.PORT || 5000)
app.use('/static', express.static('static'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors({
    origin: process.env.CLIENT_URL,
}))

router.init()

const port = app.get('port')

app.listen(port, () => console.log(`Server started on port ${port}`))

//Todo.1:Test all backend

