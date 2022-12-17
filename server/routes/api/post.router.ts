import {genericValidation} from "../../middlewares/genericValidation.middleware";
import {postSchema} from "../../schemas/post.schema";
import {tryCatch} from "../../middlewares/tryCatch.middleware";
import {isExist} from "../../middlewares/isExist.middleware";
import Post from "../../models/Post";
import {Router} from "express";
import PostController from "../../controllers/post.controller";
import {protect} from "../../middlewares/auth-protect.middleware";

const postRouter = Router()

postRouter.get('/',
    genericValidation(postSchema),
    tryCatch(PostController.getAll.bind(PostController))
)
postRouter.get('/post/:id',
    isExist(Post),
    genericValidation(postSchema),
    tryCatch(PostController.getOne.bind(PostController))
)
postRouter.post('/',
    protect,
    genericValidation(postSchema),
    tryCatch(PostController.create.bind(PostController))
)
postRouter.put('/:id',
    protect,
    isExist(Post),
    genericValidation(postSchema),
    tryCatch(PostController.update.bind(PostController))
)
postRouter.delete('/:id',
    protect,
    isExist(Post),
    genericValidation(postSchema),
    tryCatch(PostController.delete.bind(PostController))
)

export default postRouter