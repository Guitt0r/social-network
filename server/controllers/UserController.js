const User = require('../models/User')
const Post = require('../models/Post')
const FileService = require('../services/fileService')

class UserController {
    //@private
    //PUT
    async update(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.user, {$set: req.body}, {new: true})
                .select(['-password', '-email'])
            return res.status(200).json({user})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //PUT
    async uploadPhoto(req, res) {
        try {
            const {photo} = req.files
            const photoPath = await FileService.saveFile(photo)
            const user = await User.findByIdAndUpdate(req.user, {$set: {photo: photoPath}}, {new: true})
                .select(['-password', '-email'])
            return res.status(200).json({user})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@public
    //GET
    async getAll(req, res) {
        try {
            const users = await User.find()
                .select(['-password', '-email'])
            return res.status(200).json({users})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@public
    //GET
    async getOne(req, res) {
        try {
            const {id} = req.params
            const user = await User.findById(id)
                .select(['-password', '-email'])
            const posts = await Post.find({owner: user._id})
            return res.status(200).json({user, posts})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //PUT
    async follow(req, res) {
        try {
            const {userId} = req.body
            if (userId === req.user.toString())
                return res.status(400).json({message: 'U can`t follow yourself'})
            let user = await User.findById(userId)
            if (user.followers.includes(req.user)) {
                await User.findByIdAndUpdate(req.user, {$pull: {following: userId}}, {new: true})
                user = await User.findByIdAndUpdate(userId, {$pull: {followers: req.user}}, {new: true})
            } else {
                await User.findByIdAndUpdate(req.user, {$push: {following: userId}}, {new: true})
                user = await User.findByIdAndUpdate(userId, {$push: {followers: req.user}}, {new: true})
            }
            return res.status(200).json({user})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

module.exports = new UserController()