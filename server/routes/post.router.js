const Router = require('express')
const PostController = require('../controllers/PostController')
const postRouter = new Router()
const protect = require('../middleware/authMiddleware')

postRouter.get('/', PostController.getAll)
postRouter.post('/create', protect, PostController.create)
postRouter.put('/update', protect, PostController.update)
postRouter.put('/like', protect, PostController.like)
postRouter.delete('/:id', protect, PostController.delete)

module.exports = postRouter