import UserController from "../../controllers/user.controller";
import {Router} from 'express'
import {protect} from "../../middlewares/auth-protect.middleware";
import {tryCatch} from "../../middlewares/tryCatch.middleware";
import {isExist} from "../../middlewares/isExist.middleware";
import User from "../../models/User";
import {genericValidation} from "../../middlewares/genericValidation.middleware";
import {userSchema} from "../../schemas/user.schema";
import {upload} from "../../middlewares/multer.middleware";

const userRouter = Router()

userRouter.get('/',
    tryCatch(UserController.getAll.bind(UserController))
)
userRouter.get('/user/:id',
    isExist(User),
    tryCatch(UserController.getOne.bind(UserController))
)
userRouter.put('/update',
    protect,
    genericValidation(userSchema),
    upload.single('photo'),
    tryCatch(UserController.update.bind(UserController))
)
userRouter.put('/follow/:id',
    protect,
    isExist(User),
    genericValidation(userSchema),
    tryCatch(UserController.follow.bind(UserController))
)
userRouter.put('/unfollow/:id',
    protect,
    isExist(User),
    genericValidation(userSchema),
    tryCatch(UserController.unfollow.bind(UserController))
)

export default userRouter