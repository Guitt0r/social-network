import {Document, Types} from 'mongoose'

export interface IUser extends Document {
    email: string,
    username: string,
    password: string,
    followers: Types.ObjectId[],
    following: Types.ObjectId[],
    fullName: string,
    photo: string,
    status: string,
    aboutMe: string,
    contacts: {
        skype: string,
        telegram: string,
        linkedIn: string,
        github: string,
        website: string,
    },
    _doc: Readonly<any>
}

export interface IUserQuery {
    followings:boolean
}
