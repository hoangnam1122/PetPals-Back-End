const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.relationships.index)
// router.get('/profile/:id', ctrl.posts.oneUser)
router.get('/:id', ctrl.relationships.show)
router.post('/', ctrl.relationships.create)
// router.put('/:id', ctrl.posts.update)
// router.delete('/:id', ctrl.posts.destroy)

// exports
module.exports = router