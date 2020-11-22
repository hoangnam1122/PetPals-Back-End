const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.relationships.index)
router.get('/:id', ctrl.relationships.show)
router.post('/', ctrl.relationships.create)
router.get('/status/:userOneId/:userTwoId', ctrl.relationships.status)
// router.put('/:id', ctrl.posts.update)
// router.delete('/:id', ctrl.posts.destroy)

// exports
module.exports = router