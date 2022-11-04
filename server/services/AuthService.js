const User = require('../models/User')
const bcrypt = require("bcryptjs");

class AuthService {
    async createUser(email, username, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 7)
            const user = new User({email, username, password: hashedPassword})
            await user.save()
            return user
        } catch (e) {
            return null
        }

    }

    async checkUser(email, password) {
        try {
            const user = await User.findOne({email});
            if (!user) return null
            const isPasswordCorrect = await bcrypt.compare(password, user.password)
            if (!isPasswordCorrect) return null
            return user
        } catch (e) {
            return null
        }
    }
}

module.exports = new AuthService()