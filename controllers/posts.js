const db = require('../models')

//working
const index = (req, res) => {
    db.post.findAll().then((foundPosts) => {
        if (!foundPosts) return res.json({
            message: 'No Posts found in database.'
        })

        res.status(200).json({ posts: foundPosts });
    })
}

//showing single post
const show = (req, res) => {
    console.log('in the show route')
    console.log(req.params)
    //not sure React side?
    db.post.findByPk(req.params.id).then((foundPost) => {
        if (!foundPost) return res.json({
            message: 'Post with provided ID not found.'
        })

        res.status(200).json({ post: foundPost })
    })
}

//working
const create = (req, res) => {
    db.post.create(req.body).then((savedPost) => {
        // Validations and error handling here
        res.status(200).json({ post: savedPost })
    })
}

//not sure need to get show page working first
const update = (req, res) => {
    db.post.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        }
    }).then((updatedPost) => {
        if (!updatedPost) return res.json({
            message: "No post with that ID found."
        })
        // Validations and error handling here
        res.status(200).json({ post: updatedPost })
    })
}
//not sure
const destroy = (req, res) => {
    db.post.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200)
    })
}


module.exports = {
    index,
    show,
    create,
    update,
    destroy
}
