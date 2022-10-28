const Profile = require('../models/Profile')
const FileService = require('../services/fileService')

class ProfileController {
    //@private
    //POST
    async create(req, res) {
        try {
            const {_id} = req.user
            const {fullName, photo, status, aboutMe, contacts} = req.body
            const profile = new Profile({fullName, photo, status, aboutMe, contacts: {...contacts}, owner: _id})
            await profile.save()
            return res.status(201).json({resultCode: 0, data: profile})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //PUT
    async update(req, res) {
        try {
            const {_id} = req.user
            const {fullName, status, aboutMe, contacts: {skype, telegram, linkedIn, github, website}} = req.body.profile
            let profile = await Profile.findOneAndUpdate({owner: _id}, {
                fullName,
                status,
                aboutMe,
                contacts: {skype, telegram, linkedIn, github, website}
            }, {new: true})
            return res.status(200).json({resultCode: 0, data: profile})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@private
    //PUT
    async uploadPhoto(req, res) {
        try {
            const {_id} = req.user
            const {photo} = req.files
            const photoPath = await FileService.saveFile(photo)
            const profile = await Profile.findOneAndUpdate({owner: _id}, {photo: photoPath}, {new: true})
            return res.status(200).json({resultCode: 0, data: profile})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@public
    //GET
    async getAll(req, res) {
        try {
            const profiles = await Profile.find()
            return res.status(200).json({resultCode: 0, data: profiles})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

    //@public
    //GET
    async getOne(req, res) {
        try {
            const {id} = req.params
            const profile = await Profile.findOne({owner: id})
            if (profile)
                return res.status(200).json({resultCode: 0, data: profile})
            return res.status(404).json({resultCode: 1, message: 'User not found'})
        } catch (e) {
            return res.status(500).json(e.message)
        }
    }

}

module.exports = new ProfileController()