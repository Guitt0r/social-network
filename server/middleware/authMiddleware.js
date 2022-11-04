const jwt = require('jsonwebtoken')
const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token)
            return res.status(403).json({message: 'Unauthorized user'})
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.id
        next()
    } catch (e) {
        return res.status(403).json({message: 'Unauthorized user'})
    }
}

module.exports = protect