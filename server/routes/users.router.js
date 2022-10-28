const ProfileController = require("../controllers/ProfileController");
const Router = require("express");
const usersRouter = new Router()

usersRouter.get('/', ProfileController.getAll)

module.exports = usersRouter
