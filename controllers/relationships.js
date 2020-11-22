const db = require('../models')
const { Op } = require("sequelize");

//Get search results from a user looking up someone by name
const index = (req, res) => {
    console.log(req.body.firstName)
    db.user.findAll({
        where:{
            [Op.or]: [ {firstName : {[Op.iLike] : req.body.firstName}},
                       {lastName: {[Op.iLike]: req.body.lastName}}]
        }
    }).then((foundUsers) => {
        console.log(foundUsers)
        if (!foundUsers) return res.json({
            message: 'No users found in database.'
        })

        res.status(200).json({ user: foundUsers });
    })
}

//all posts for one user
const oneUser = (req, res) => {
    db.user.findAll({
        where: {userId: req.params.id}
    }).then((userData) => {
        if (!userData) return res.json({message: 'No users found in database.'})
        res.status(200).json({ users: userData });
    })
}

//showing single user
const show = (req, res) => {
    db.user.findByPk(req.params.id).then((founduser) => {
        if (!founduser) return res.json({
            message: 'user with provided ID not found.'
        })

        res.status(200).json({ user: founduser })
    })
}

//This is when a friend request is sent
const create = (req, res) => {
    db.relationship.create(req.body).then((saveduser) => {
        res.status(200).json({ relationship: saveduser })
    })
}

//updating a user
const update = (req, res) => {
    db.relationship.update({
        ...req.body
    }, {
        where: {
            id: req.params.id
        }
    }).then((updateduser) => {
        if (!updateduser) return res.json({
            message: "No user with that ID found."
        })
        res.status(200).json({ user: updateduser })
    })
}

//Deleting a user
const destroy = (req, res) => {
    db.relationship.destroy({
        where: { id: req.params.id }
    }).then(() => {
        res.status(200).json({ message: "user was deleted" })
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
