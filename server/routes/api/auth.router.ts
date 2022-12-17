import {Router} from "express";
import {tryCatch} from "../../middlewares/tryCatch.middleware";
import authController from "../../controllers/auth.controller";
import {genericValidation} from "../../middlewares/genericValidation.middleware";
import {userSchema} from "../../schemas/user.schema";

const authRouter = Router()

authRouter.post('/login',
    genericValidation(userSchema),
    tryCatch(authController.login.bind(authController)))
authRouter.post('/sign-up',
    genericValidation(userSchema),
    tryCatch(authController.sighUp.bind(authController)))

export default authRouter