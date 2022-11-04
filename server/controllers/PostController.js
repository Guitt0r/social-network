const Post = require('../models/Post')

class PostController {
    //@private
    //POST
    async create(req, res) {
        try {
            const {text} = req.body
            const post = new Post({text, owner: req.user})
            await post.save()
            return res.status(201).json({post})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //PUT
    async update(req, res) {
        try {
            const {postId, text} = req.body
            const post = await Post.findById(postId)
            if (post.owner.toString() !== req.user.toString())
                return res.status(400).json({message: 'You can`t update this post'})
            post.text = text
            post.isUpdated = true
            await post.save()
            return res.status(200).json({post})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //DELETE
    async delete(req, res) {
        try {
            const {id} = req.params//postId
            let post = await Post.findById(id)
            if (post.owner.toString() !== req.user.toString())
                return res.status(400).json({message: 'You can`t delete this post'})
            await post.deleteOne()
            return res.status(200).json({post})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            let posts = await Post.find()
            return res.status(200).json({posts})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //PUT
    async like(req, res) {
        try {
            const {postId} = req.body
            let post = await Post.findById(postId)
            if (post.likes.includes(req.user))
                post = await Post.findByIdAndUpdate(postId, {$pull: {likes: req.user}}, {new: true})
            else
                post = await Post.findByIdAndUpdate(postId, {$push: {likes: req.user}}, {new: true})
            return res.status(200).json({post})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

module.exports = new PostController()