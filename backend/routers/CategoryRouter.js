const express = require('express')
const router = express.Router()
const { index, create, show, update, destroy} = require('../controllers/CategoryController')

router.get('/', index);

router.post('/', create);

router.get('/:id', show);

router.put('/:id', update);

router.delete('/:id', destroy);




module.exports = router