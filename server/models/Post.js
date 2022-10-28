const mongoose = require('mongoose')
const {Schema, model} = mongoose

const postSchema = new Schema({
        text: {type: String, required: true},
        likesCount: {type: Number, default: 0},
        isUpdated: {type: Boolean, default: false},
        usersWhoLikes: [{type: String}],
        owner: {type: Schema.Types.ObjectId, ref: 'User'}
    }
)
module.exports = model('Post', postSchema)