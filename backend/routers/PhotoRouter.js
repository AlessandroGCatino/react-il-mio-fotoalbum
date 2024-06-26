const express = require('express')
const router = express.Router()
const { index, create, show, update, destroy} = require('../controllers/PhotoController')

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

router.post('/', [upload.single("image")], create);

router.get('/:id', show);

router.put('/:id', [upload.single("image")], update);

router.delete('/:id', destroy);




module.exports = router