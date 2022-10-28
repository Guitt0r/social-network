const jwt = require('jsonwebtoken')
const User = require('../models/User')
const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token)
            return res.status(403).json({message: 'Unauthorized user'})
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (e) {
        return res.status(403).json({message: 'Unauthorized user'})
    }
}

module.exports = protect