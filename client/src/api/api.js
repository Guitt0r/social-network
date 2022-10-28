import axios from "axios";

const instance = axios.create({
    baseURL: `http://localhost:5000/api/`,
    withCredentials: true,

})

export const authAPI = {
    async register(email, username, password) {
        const res = await instance.post(`/auth/register`, {email, username, password})
        return res.data
    },
    async login(email, password) {
        const res = await instance.post(`/auth/login`, {email, password})
        return res.data

    },
    async logout() {
        const res = await instance.delete(`/auth/logout`)
        return res.data
    },
    async me() {
        const res = await instance.get(`/auth/me`)
        return res.data
    },
}
export const profileAPI = {
    async saveProfile(profile) {
        const res = await instance.put(`/profile/update`, {profile})
        return res.data
    },
    async savePhoto(photo) {
        const res = await instance.put(`profile/photo`, {photo}, {
            headers: {"Content-Type": "multipart/form-data"}
        })
        return res.data
    },
    async getProfile(profileId) {
        const res = await instance.get(`/profile/${profileId}`)
        return res.data
    }
}
export const usersAPI = {
    async getUsers() {
        const res = await instance.get(`/users`)
        return res.data
    }
}
export const postAPI = {
    async create(text) {
        const res = await instance.post(`/post/create`, {text})
        return res.data
    },
    async update(postId, text) {
        const res = await instance.put(`/post/update`, {postId, text})
        return res.data
    },
    async delete(postId) {
        const res = await instance.delete(`/post/${postId}`)
        return res.data
    },
    async getUsersPosts(userId) {
        const res = await instance.get(`/post/${userId}/all`)
        return res.data
    },
    async like(postId) {
        const res = await instance.put(`/post/like`, {postId})
        return res.data
    },
    async getAllPosts() {
        const res = await instance.get(`/post/posts`)
        return res.data
    }

}
