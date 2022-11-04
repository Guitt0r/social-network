import {instance} from "./api";

export const postAPI = {
    async create(text) {
        const res = await instance.post(`/posts/create`, {text})
        return res.data
    },
    async update(postId, text) {
        const res = await instance.put(`/posts/update`, {postId, text})
        return res.data
    },
    async like(postId) {
        const res = await instance.put(`/posts/like`, {postId})
        return res.data
    },
    async delete(postId) {
        const res = await instance.delete(`/posts/${postId}`)
        return res.data
    },
    async getAllPosts() {
        const res = await instance.get(`/posts/`)
        return res.data
    }

}