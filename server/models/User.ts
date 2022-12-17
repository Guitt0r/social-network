import {Schema, model} from 'mongoose'
import {IUser} from "../types/IUser";

const userSchema = new Schema<IUser>({
        email: {type: String, required: true},
        username: {type: String, required: true},
        password: {type: String, required: true},
        followers: [{type: Schema.Types.ObjectId, ref: 'User'}],
        following: [{type: Schema.Types.ObjectId, ref: 'User'}],
        fullName: {type: String, default: null},
        photo: {type: String, default: null},
        status: {type: String, default: null},
        aboutMe: {type: String, default: null},
        contacts: {
            skype: {type: String, default: null},
            telegram: {type: String, default: null},
            linkedIn: {type: String, default: null},
            github: {type: String, default: null},
            website: {type: String, default: null},
        },
    },
    {timestamps: true}
)
const User = model<IUser>('User', userSchema)
export default User