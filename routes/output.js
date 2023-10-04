const express = require('express')
const router = express.Router();
const multer = require('multer');
const outputController = require('../Controllers/outputController')


// Using local storage for the data.
const localStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./Uploads")
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: localStorage });



router.get('/', outputController.home)


router.post('/upload', upload.single('uploadFile'), outputController.output)


module.exports = router;