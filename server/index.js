require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const authRouter = require('./routes/auth.router')
const userRouter = require('./routes/users.router')
const postRouter = require('./routes/post.router')

const app = express()
app.use(fileUpload({}))
app.use('/static', express.static('static'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)


mongoose.connect(process.env.DB_URI, (error) => {
    if (error) return console.log(error)

    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`))
    console.log(`Db connected successfully`)
})

