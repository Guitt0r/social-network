import {IPost, IPostQuery} from "../types/IPost";
import Post from "../models/Post";

class PostService {
    async create(post: IPost, ownerId: string) {
        const newPost = await Post.create({...post, owner: ownerId})
        return {statusCode: 0, post: newPost}
    }

    async update(body: IPost, postId: string) {
        const updatedPost = await Post.findByIdAndUpdate(postId, {...body,isUpdated:true}, {new: true})
        return {statusCode: 0, post: updatedPost}
    }

    async delete(postId: string) {
        const deletedPost = await Post.findByIdAndDelete(postId)
        return {statusCode: 0, post: deletedPost}
    }

    async getAll(query?: IPostQuery) {
        if (!query || Object.keys(query).length === 0) {
            const posts = await Post.find()
            return {statusCode: 0, posts: posts}
        } else {
            const posts = await Post.find({owner: {$in: query.userId}})
            return {statusCode: 0, posts: posts}
        }
    }

    async getById(postId: string) {
        const post = await Post.findById(postId)
        return {statusCode: 0, post: post}
    }
}

export default PostService