import {instance} from "./api";

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