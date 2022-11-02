const Post = require('../models/Post')
const jwt = require('jsonwebtoken')

class PostController {
    //@private
    //POST
    async create(req, res) {
        try {
            const {_id} = req.user
            const {text} = req.body
            const post = new Post({text, owner: _id})
            await post.save()
            return res.status(201).json({
                resultCode: 0,
                data: {
                    _id: post._id,
                    text: post.text,
                    likesCount: post.likes.length,
                    isUpdated: post.isUpdated,
                    owner: post.owner,
                    isLiked: false
                }
            })
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
                return res.status(200).json({
                    resultCode: 0,
                    data: {
                        _id: post._id,
                        text: post.text,
                        isUpdated: post.isUpdated,
                        owner: post.owner,
                    }
                })
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
                return res.status(200).json({
                    resultCode: 0,
                    data: {
                        _id: post._id,
                        owner: post.owner,
                    }
                })
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
            let userId = null
            const token = req.cookies.token
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                userId = decoded.id
            }
            let posts = await Post.find({owner: id})
            posts = Object.values(posts).map(post => {
                const postForClient = {
                    _id: post._id,
                    text: post.text,
                    likesCount: post.likes.length,
                    isUpdated: post.isUpdated,
                    owner: post.owner,
                    isLiked: false
                }
                if (post.likes.includes(userId))
                    return {...postForClient, isLiked: true}
                return postForClient
            })
            return res.status(200).json({resultCode: 0, data: posts})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    async getAll(req, res) {
        try {
            let posts = await Post.find()
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
            let isLiked
            let post = await Post.findById(postId)
            if (post.likes.includes(_id)) {
                post = await Post.findByIdAndUpdate(postId, {$pull: {likes: _id}}, {new: true})
                isLiked = false
            } else {
                post = await Post.findByIdAndUpdate(postId, {$push: {likes: _id}}, {new: true})
                isLiked = true
            }
            return res.status(200).json({
                resultCode: 0,
                data: {
                    _id: post._id,
                    text: post.text,
                    likesCount: post.likes.length,
                    isUpdated: post.isUpdated,
                    isLiked: isLiked
                }
            })
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }
}

module.exports = new PostController()