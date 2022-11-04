import {instance} from "./api";

export const usersAPI = {
    async getUsers() {
        const res = await instance.get(`/users/`)
        return res.data
    },
    async getOneUser(userId) {
        const res = await instance.get(`/users/user/${userId}`)
        return res.data
    },
    async saveProfile(profile) {
        const res = await instance.put(`/users/update`, profile)
        return res.data
    },
    async savePhoto(photo) {
        const res = await instance.put(`users/photo`, {photo}, {
            headers: {"Content-Type": "multipart/form-data"}
        })
        return res.data
    },
    async follow(userId) {
        const res = await instance.put(`users/follow`, {userId})
        return res.data
    }
}
