const router = require('express').Router()
const ctrl = require('../controllers')

// routes
router.get('/pending/:userId', ctrl.relationships.pending)
router.get('/search/:query', ctrl.relationships.index)
router.get('/status/:userOneId/:userTwoId', ctrl.relationships.status)
router.get('/friends/limit/:UserId', ctrl.relationships.friendsListLimit)
router.get('/friends/:UserId', ctrl.relationships.allFriends)
router.get('/:id', ctrl.relationships.show)
router.post('/', ctrl.relationships.create)
router.put('/:id', ctrl.relationships.update)
router.delete('/:id', ctrl.relationships.destroy)

// exports
module.exports = router