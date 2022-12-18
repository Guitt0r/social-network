import PostService from "../services/post.service";
import {Request, Response} from "express";
import {IPostQuery} from "../types/IPost";

class PostController {
    constructor(private postService: PostService) {
    }

    async create(_req: Request, res: Response) {
        return this.postService.create(_req.body, _req.user)
    }

    async update(_req: Request, res: Response) {
        return this.postService.update(_req.body, _req.params.id)
    }

    async delete(_req: Request, res: Response) {
        return this.postService.delete(_req.params.id)
    }

    async getAll(_req: Request<{}, {}, {}, IPostQuery>, res: Response) {
        return this.postService.getAll(_req.query)
    }
    async getOne(_req: Request, res: Response) {
        return this.postService.getById(_req.params.id)
    }
    async like(_req: Request, res: Response) {
        return this.postService.like(_req.user,_req.params.id)
    }
    async unlike(_req: Request, res: Response) {
        return this.postService.unlike(_req.user,_req.params.id)
    }
}

const postController = new PostController(new PostService())

export default postController