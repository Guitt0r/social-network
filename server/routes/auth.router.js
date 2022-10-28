const Router = require('express')
const AuthController = require('../controllers/AuthController')
const authRouter = new Router()
const protect = require('../middleware/authMiddleware')

authRouter.post('/register', AuthController.register)
authRouter.post('/login', AuthController.login)
authRouter.delete('/logout', protect, AuthController.logout)
authRouter.get('/me', AuthController.me)

module.exports = authRouter