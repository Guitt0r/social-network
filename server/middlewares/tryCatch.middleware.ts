import {Request, Response} from "express";

export const tryCatch = (func: any) => {
    return async (_req: Request, res: Response) => {
        try {
            const result = await func(_req, res)
            return res.status(200).json(result)
        } catch (e: any) {
            res.status(500).json(e.message)
        }
    }
}