const mongoose = require('mongoose')
const {Schema,model} = mongoose

const profileSchema = new Schema({
        fullName: {type: String, default: null},
        photo: {type: String, default: null},
        status: {type: String, default: null},
        aboutMe: {type: String, default: null},
        contacts: {
            skype: {type:String,default:null},
            telegram: {type:String,default:null},
            linkedIn: {type:String,default:null},
            github: {type:String,default:null},
            website: {type:String,default:null},
        },
        owner:{type:Schema.Types.ObjectId,ref:'User'}
    }
)
module.exports = model('Profile',profileSchema)