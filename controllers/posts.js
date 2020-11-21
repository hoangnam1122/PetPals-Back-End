const db = require('../models')

//all community posts
const index = (req, res) => {
    db.post.findAll().then((foundPosts) => {
        if (!foundPosts) return res.json({
            message: 'No Posts found in database.'
        })

        res.status(200).json({ posts: foundPosts });
    })
}

//all posts for one user
const oneUser = (req, res) => {
    db.post.findAll({
        where: {userId: req.params.id}
    }).then((postData) => {
        if (!postData) return res.json({message: 'No Posts found in database.'})
        res.status(200).json({ posts: postData });
    })
}

//showing single post
const show = (req, res) => {
    db.post.findByPk(req.params.id).then((foundPost) => {
        if (!foundPost) return res.json({
            message: 'Post with provided ID not found.'
        })

        res.status(200).json({ post: foundPost })
    })
}

//create post
const create = (req, res) => {
    db.post.create(req.body).then((savedPost) => {
        res.status(200).json({ post: savedPost })
    })
}

//updating a post
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
        res.status(200).json({ post: updatedPost })
    })
}

//Deleting a post
const destroy = (req, res) => {
    db.post.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).json({ message: "post was deleted" })
    })
}


module.exports = {
    index,
    oneUser,
    show,
    create,
    update,
    destroy
}
