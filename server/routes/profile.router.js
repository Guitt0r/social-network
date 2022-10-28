const Router = require('express')
const ProfileController = require('../controllers/ProfileController')
const profileRouter = new Router()
const protect = require('../middleware/authMiddleware')

profileRouter.post('/create', protect, ProfileController.create)
profileRouter.put('/update', protect, ProfileController.update)
profileRouter.put('/photo', protect, ProfileController.uploadPhoto)
profileRouter.get('/:id', ProfileController.getOne)
//profileRouter.get('/all/profiles', ProfileController.getAll)

module.exports = profileRouter
