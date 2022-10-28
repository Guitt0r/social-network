const User = require('../models/User')
const Profile = require('../models/Profile')
const bcrypt = require("bcryptjs");

class AuthService {
    //create new User with empty profile
    async createUser(email, username, password) {
        //encrypt password
        const hashedPassword = bcrypt.hashSync(password, 7)
        //create a new user
        const user = new User({email, username, password: hashedPassword})
        //create empty profile
        const emptyProfile = new Profile()
        //add user ref to profile
        emptyProfile.owner = user._id
        //saves user and profile
        await user.save()
        await emptyProfile.save()
        return user
    }

    //check if user can log in
    async checkUser(email, password) {
        //find user by email
        const user = await User.findOne({email});
        //if there is no user with this email, then login isn`t possible
        if (!user) return null
        //compare passwords
        const isPasswordCorrect = bcrypt.compareSync(password, user.password)
        //if passwords isn't the same, then login isn`t possible
        if (!isPasswordCorrect) return null
        //SUCCESS
        return user
    }
}

module.exports = new AuthService()