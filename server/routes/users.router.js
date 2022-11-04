const UserController = require("../controllers/UserController");
const Router = require("express");
const protect = require("../middleware/authMiddleware");
const usersRouter = new Router()

usersRouter.get('/', UserController.getAll)
usersRouter.get('/user/:id', UserController.getOne)
usersRouter.put('/update', protect, UserController.update)
usersRouter.put('/photo', protect, UserController.uploadPhoto)
usersRouter.put('/follow', protect, UserController.follow)

module.exports = usersRouter
