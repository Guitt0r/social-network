import {IUser, IUserQuery} from "../types/IUser";
import User from "../models/User";

class UserService {
    async update(body: IUser, userId: string, file?: Express.Multer.File) {
        let photo: string | null = null
        if (file) photo = 'http://localhost:5000/static/' + file.filename
        const updatedUser = await User.findByIdAndUpdate(userId, {...body, photo: photo}, {new: true})
        return {statusCode: 0, user: updatedUser}
    }

    async getAll(query?: IUserQuery, userId?: string) {
        if (!query || Object.keys(query).length === 0 || !query.followings) {
            const users = await User.find()
            return {statusCode: 0, users: users}
        } else {
            const users = await User.find({following: {$in: userId}})
            return {statusCode: 0, users: users}
        }

    }

    async getById(userId: string) {
        const user = await User.findById(userId)
        return {statusCode: 0, user: user}
    }

    async follow(currentUserId: string, followerId: string) {
        if (currentUserId === followerId)
            return {statusCode: 1, message: 'U can`t follow yourself'}
        await User.findByIdAndUpdate(currentUserId, {$addToSet: {following: followerId}}, {new: true})
        const user = await User.findByIdAndUpdate(followerId, {$addToSet: {followers: currentUserId}}, {new: true})
        return {statusCode: 0, user: user}
    }

    async unfollow(currentUserId: string, followerId: string) {
        if (currentUserId === followerId)
            return {statusCode: 1, message: 'U can`t unfollow yourself'}
        await User.findByIdAndUpdate(currentUserId, {$pull: {following: followerId}}, {new: true})
        const user = await User.findByIdAndUpdate(followerId, {$pull: {followers: currentUserId}}, {new: true})
        return {statusCode: 0, user: user}
    }
}

export default UserService