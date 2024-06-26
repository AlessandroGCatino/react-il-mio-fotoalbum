const express = require('express')
const router = express.Router()
const { index, create, show, update, destroy} = require('../controllers/CategoryController')
const validator = require('../middlewares/validator.js');
const {verifyID} = require('../validators/verifyID.js');
const {verifyRequest} = require('../validators/verifyCategory.js');

router.get('/', index);

router.post('/', validator(verifyRequest), create);

router.use('/:id', validator(verifyID))

router.get('/:id', show);

router.put('/:id', validator(verifyRequest), update);

router.delete('/:id', destroy);

module.exports = router