import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils/utils";
import {IAuthResponse} from "../types/IAuthResponse";

interface JwtPayload {
    id: string
}

export const protect = async (_req: Request, res: Response, next: NextFunction) => {
    const token = _req.headers.authorization?.split(' ')[1]
    if (!token)
        return res.status(403).json('Forbidden action')
    const decoded = verifyToken(token)
    if (!decoded)
        return res.status(403).json('Forbidden action');
    (_req as IAuthResponse).user = (<JwtPayload>decoded).id
    next()
}