const mongoose = require('mongoose')
const {Schema, model} = mongoose

const postSchema = new Schema({
        text: {type: String, required: true},
        isUpdated: {type: Boolean, default: false},
        likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
        owner: {type: Schema.Types.ObjectId, ref: 'User'}
    }
)
module.exports = model('Post', postSchema)