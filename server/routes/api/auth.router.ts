import {Router} from "express";
import {tryCatch} from "../../middlewares/tryCatch.middleware";
import authController from "../../controllers/auth.controller";
import {genericValidation} from "../../middlewares/genericValidation.middleware";
import {userSchema} from "../../schemas/user.schema";
import {protect} from "../../middlewares/auth-protect.middleware";
import {isExist} from "../../middlewares/isExist.middleware";
import User from "../../models/User";

const authRouter = Router()

authRouter.post('/login',
    genericValidation(userSchema),
    tryCatch(authController.login.bind(authController)))
authRouter.post('/sign-up',
    genericValidation(userSchema),
    tryCatch(authController.sighUp.bind(authController)))
authRouter.delete('/delete',
    protect,
    isExist(User),
    genericValidation(userSchema),
    tryCatch(authController.deleteAccount.bind(authController)))

export default authRouter