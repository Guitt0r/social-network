const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const AuthService = require('../services/AuthService')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1h'})
}

class AuthController {
    //@public
    //POST
    async register(req, res) {
        try {
            const {email, username, password} = req.body
            const candidate = await User.findOne({email})
            if (candidate) return res.status(400).json({resultCode: 1, message: 'User already exists'})
            const user = await AuthService.createUser(email, username, password)
            res.cookie('token', generateToken(user._id), {maxAge: 60 * 60 * 1000, httpOnly: true})
            return res.status(201).json({resultCode: 0, message: 'Successful registration'})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@public
    //POST
    async login(req, res) {
        try {
            const {email, password} = req.body
            const candidate = await User.findOne({email})
            if (!candidate)
                return res.status(400).json({resultCode: 1, message: 'Invalid email or password'})
            const isPasswordCorrect = bcrypt.compareSync(password, candidate.password)
            if (!isPasswordCorrect)
                return res.status(400).json({resultCode: 1, message: 'Invalid email or password'})
            res.cookie('token', generateToken(candidate._id), {maxAge: 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json({resultCode: 0, message: 'Successful login'})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //DELETE
    async logout(req, res) {
        try {
            if (req.cookies.token) {
                res.clearCookie('token')
                return res.status(200).json({resultCode: 0, message: 'Successful logout'})
            } else
                return res.status(400).json({message: 'Something gone wrong'})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@public
    //GET
    async me(req, res) {
        try {
            const token = req.cookies.token
            if (!token)
                return res.status(200).json({resultCode: 1, message: 'Unauthorized'})
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findById(decoded.id)
            if (!user)
                return res.status(200).json({resultCode: 1, message: 'Unauthorized'})
            return res.status(200).json({
                resultCode: 0,
                data: {id: user._id, email: user.email, username: user.username}
            })
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

module.exports = new AuthController()