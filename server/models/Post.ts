import {Schema, model} from 'mongoose'
import {IPost} from "../types/IPost";

const postSchema = new Schema<IPost>({
        text: {type: String, required: true},
        isUpdated: {type: Boolean, default: false},
        likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
        owner: {type: Schema.Types.ObjectId, ref: 'User'}
    },
    {timestamps: true}
)
const Post = model<IPost>('Post', postSchema)
export default Post