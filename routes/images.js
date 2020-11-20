// imports
const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.images.index)
router.put('/profilepic/:id', ctrl.images.updateProfilePic)
router.put('/petpic', ctrl.images.updatePetPic)
router.post('/', ctrl.images.create)
router.delete('/:id', ctrl.images.destroy)

// exports
module.exports = router