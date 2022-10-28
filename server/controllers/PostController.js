const Post = require('../models/Post')

class PostController {
    //@private
    //POST
    async create(req, res) {
        try {
            const {_id} = req.user
            const {text} = req.body
            const post = new Post({text, owner: _id})
            await post.save()
            return res.status(201).json({resultCode: 0, data: post})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //PUT
    async update(req, res) {
        try {
            const {_id} = req.user
            const {postId, text} = req.body
            let post = await Post.findById(postId)
            if (post.owner.toString() === _id.toString()) {
                post.text = text
                post.isUpdated = true
                await post.save()
                return res.status(200).json({resultCode: 0, data: post})
            } else return res.status(400).json({message: 'You can`t update this post'})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //DELETE
    async delete(req, res) {
        try {
            const {_id} = req.user//authUserId
            const {id} = req.params//postId
            let post = await Post.findById(id)
            if (post.owner.toString() === _id.toString()) {
                await post.delete()
                return res.status(200).json({resultCode: 0, data: post})
            } else return res.status(400).json({message: 'You can`t delete this post'})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@public
    //GET
    async getAllUsers(req, res) {
        try {
            const {id} = req.params
            const posts = await Post.find({owner: id})
            return res.status(200).json({resultCode: 0, data: posts})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            const posts = await Post.find()
            return res.status(200).json({resultCode: 0, data: posts})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //PUT
    async like(req, res) {
        try {
            const {_id} = req.user
            const {postId} = req.body
            let post = await Post.findById(postId)
            if (post.usersWhoLikes.some(userId => userId === _id.toString())) {
                post.likesCount -= 1
                post.usersWhoLikes = post.usersWhoLikes.filter(userId => userId !== _id.toString())
            } else {
                post.likesCount += 1
                post.usersWhoLikes.push(_id)
            }
            post.save()
            return res.status(200).json({resultCode: 0, data: post})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

module.exports = new PostController()