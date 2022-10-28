const uuid = require("uuid");
const path = require("path");

class FileService {
    async saveFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('static', fileName)
            await file.mv(filePath)
            return 'http://localhost:5000/static/'+fileName
        } catch (e) {
            throw Error(e.message)
        }
    }
}

module.exports = new FileService()