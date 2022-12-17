import User from "../models/User";
import {IUser} from "../types/IUser";
import bcrypt from 'bcryptjs'
import {generateToken} from "../utils/utils";

class AuthService {
    async signUp(candidate: IUser) {
        const isExists = await User.exists({email: candidate.email})
        if (isExists) return {statusCode: 1, message: 'Email already exists', accessToken: null}
        const hashedPassword = await bcrypt.hash(candidate.password, 7)
        const user = await User.create({
            email: candidate.email,
            username: candidate.username,
            password: hashedPassword
        })
        const {password, ...info} = user._doc
        const token = generateToken({id: user._id})
        return {statusCode: 0, user: info, accessToken: token}
    }

    async login(candidate: IUser) {
        const user = await User.findOne({email: candidate.email})
        if (!user) return {statusCode: 1, message: 'Wrong email or password', accessToken: null}
        const isMatch = await bcrypt.compare(candidate.password, user.password)
        if (!isMatch) return {statusCode: 1, message: 'Wrong email or password', accessToken: null}
        const token = generateToken({id: user._id})
        const {password, ...info} = user._doc
        return {statusCode: 0, user: info, accessToken: token}
    }
}

export default AuthService