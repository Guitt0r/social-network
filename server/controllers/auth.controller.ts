import {Request, Response} from "express";
import AuthService from "../services/auth.service";

class AuthController {
    constructor(private authService: AuthService) {
    }

    async sighUp(_req: Request, res: Response) {
        return this.authService.signUp(_req.body)
    }

    async login(_req: Request, res: Response) {
        return this.authService.login(_req.body)
    }

    async deleteAccount(_req: Request, res: Response) {
        return this.authService.deleteAccount(_req.user)
    }
}

const authController = new AuthController(new AuthService())

export default authController