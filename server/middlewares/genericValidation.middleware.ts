import {Schema} from "joi";
import {NextFunction, Request, Response} from "express";

export const genericValidation = (schema: Schema) => async (_req: Request, res: Response, next: NextFunction) => {
    const {error} = schema.validate(_req.body)
    if (error)
        return res.status(400).json({message: error.message})
    next()
}