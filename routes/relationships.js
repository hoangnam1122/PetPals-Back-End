const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/', ctrl.relationships.index)
router.get('/:id', ctrl.relationships.show)
router.post('/', ctrl.relationships.create)
router.put('/:id', ctrl.relationships.update)
router.get('/status/:userOneId/:userTwoId', ctrl.relationships.status)
router.get('/friends/:UserId', ctrl.relationships.allFriends)
// router.delete('/:id', ctrl.posts.destroy)

// exports
module.exports = router