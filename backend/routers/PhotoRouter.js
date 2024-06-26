const express = require('express')
const router = express.Router()
const { index, create, show, update, destroy} = require('../controllers/PhotoController')
const validator = require('../middlewares/validator.js')
const {verifyID} = require('../validators/verifyID')
const {verifyRequest} = require('../validators/verifyPhoto')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: "public/post_pics",
    filename: (req, file, cf) => {
        const fileType = path.extname(file.originalname);
        cf(null, String(Date.now()) + fileType)
    }
});
const upload = multer({storage});

router.get('/', index);

router.post('/', [upload.single("image"),validator(verifyRequest)], create);

router.use("/:id", validator(verifyID))

router.get('/:id', show);

router.put('/:id', [upload.single("image")], update);

router.delete('/:id', destroy);




module.exports = router