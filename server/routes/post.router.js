const Router = require('express')
const PostController = require('../controllers/PostController')
const postRouter = new Router()
const protect = require('../middleware/authMiddleware')

postRouter.post('/create',protect, PostController.create)
postRouter.put('/update',protect, PostController.update)
postRouter.delete('/:id',protect, PostController.delete)
postRouter.get('/:id/all', PostController.getAllUsers)
postRouter.get('/posts', PostController.getAll)
postRouter.put('/like',protect, PostController.like)

module.exports = postRouter