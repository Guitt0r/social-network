import Joi from "joi";

export const postSchema = Joi.object({
    text: Joi.string(),
    isUpdated: Joi.boolean(),
    likes: Joi.array(),
    owner: Joi.string(),
})
