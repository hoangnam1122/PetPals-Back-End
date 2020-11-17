// imports
const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.images.index)
router.get('/:id', ctrl.images.show)
router.post('/', ctrl.images.create)
router.put('/:id', ctrl.images.update)
router.delete('/:id', ctrl.images.destroy)

// exports
module.exports = router