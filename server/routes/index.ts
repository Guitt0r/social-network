import {Application} from "express";
import authRouter from "./api/auth.router";
import postRouter from "./api/post.router";
import userRouter from "./api/user.router";

class AppRouter {
    constructor(private app: Application) {
    }

    init() {
        this.app.get('/', (_req, res) => {
            res.send('Api running...')
        })
        this.app.use('/api/auth', authRouter)
        this.app.use('/api/post', postRouter)
        this.app.use('/api/user', userRouter)
    }
}

export default AppRouter