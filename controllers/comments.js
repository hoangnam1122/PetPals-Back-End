const db = require('../models')

//FIND ALL 
const index = (req, res) => {
    db.comment.findAll({
        where: {postId: req.params.id}
    }).then((foundComments) => {
        if (!foundComments) return res.json({
            message: 'No Comments found in database.'
        })

        res.status(200).json({ comments: foundComments });
    })
}

//show data for one comment
const show = (req, res) => {
    db.comment.findByPk(req.params.id).then((foundComment) => {
        if (!foundComment) return res.json({
            message: 'Comment with provided ID not found.'
        })

        res.status(200).json({ comment: foundComment })
    })
}

//CREATE A COMMENT
const create = (req, res) => {
    db.comment.create(req.body).then((savedComment) => {
        res.status(200).json({ comment: savedComment })
    })
}


//UPDATE A COMMENT
const update = (req, res) => {
    db.comment.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        }
    }).then((updatedComment) => {
        if (!updatedComment) return res.json({
            message: "No comment with that ID found."
        })
        res.status(200).json({ comment: updatedComment })
    })
}
//DELETE
const destroy = (req, res) => {
    db.comment.destroy({
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
