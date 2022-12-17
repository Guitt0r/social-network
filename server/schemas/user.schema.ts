import Joi from "joi";

export const userSchema = Joi.object({
    email: Joi.string().email(),
    username: Joi.string().max(20),
    password: Joi.string().min(8),
    followers: Joi.array(),
    following: Joi.array(),
    fullName: [Joi.string().optional(), Joi.allow(null)],
    photo: [Joi.string().uri().optional(), Joi.allow(null)],
    status: [Joi.string().optional(), Joi.allow(null)],
    aboutMe: [Joi.string().optional(), Joi.allow(null)],
    contacts: Joi.object({
        skype: [Joi.string().optional(), Joi.allow(null)],
        telegram: [Joi.string().optional(), Joi.allow(null)],
        linkedIn: [Joi.string().optional(), Joi.allow(null)],
        github: [Joi.string().optional(), Joi.allow(null)],
        website: [Joi.string().optional(), Joi.allow(null)],
    })
})
