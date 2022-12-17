import {Request} from "express";
import {JwtPayload} from "jsonwebtoken";

export interface IAuthResponse extends Request {
    user: string | JwtPayload
}