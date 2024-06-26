const express = require('express')
const router = express.Router()


router.get('/', index);

router.post('/', validator(verifyRequest), create);

router.use('/:id', validator(verifyID))

// il check sull'id viene effettuato su tutte le route successive
router.get('/:id', show);

router.put('/:id', validator(verifyRequest), update);

router.delete('/:id', destroy);




export default router