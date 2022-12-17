import {Document, Types} from "mongoose";

export interface IPost extends Document {
    text: string,
    isUpdated: boolean,
    likes: Types.ObjectId[],
    owner: Types.ObjectId
}

export interface IPostQuery {
    userId: string
}