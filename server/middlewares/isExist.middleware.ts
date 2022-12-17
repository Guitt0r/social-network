import {NextFunction, Request, Response} from "express";
import {Model} from "mongoose";

export const isExist = (model: Model<any>) => async (_req: Request, res: Response, next: NextFunction) => {
    const isExist = model.exists({_id: _req.params.id})
    if (!isExist)
        return res.status(404).json({message: 'Not found'})
    next()
}