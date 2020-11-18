// imports
const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.posts.index)
router.get('/:id', ctrl.posts.show)
router.post('/', ctrl.posts.create)
router.put('/:id', ctrl.posts.update)
router.delete('/:id', ctrl.posts.destroy)

// exports
module.exports = router