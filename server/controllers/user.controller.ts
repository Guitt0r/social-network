import UserService from "../services/user.service";
import {Request, Response} from "express";
import {IUserQuery} from "../types/IUser";
import {IAuthRequest} from "../types/IAuthRequest";

class UserController {
    constructor(private userService: UserService) {
    }

    async update(_req: IAuthRequest, res: Response) {
        return this.userService.update(_req.body, _req.user, _req.file)
    }

    async getAll(_req: Request<{}, {}, {}, IUserQuery>, res: Response) {
        return this.userService.getAll(_req.query)
    }

    async getOne(_req: Request, res: Response) {
        return this.userService.getById(_req.params.id)
    }

    async follow(_req: IAuthRequest, res: Response) {
        return this.userService.follow(_req.user, _req.params.id)
    }

    async unfollow(_req: IAuthRequest, res: Response) {
        return this.userService.unfollow(_req.user, _req.params.id)
    }
}

const userController = new UserController(new UserService())

export default userController