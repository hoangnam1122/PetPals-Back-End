const db = require("../models");
const { Op } = require("sequelize");

//Get search results from a user looking up someone by name
const index = (req, res) => {
  console.log(req.body.firstName);
  db.user
    .findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: req.body.firstName } },
          { lastName: { [Op.iLike]: req.body.lastName } },
        ],
      },
    })
    .then((foundUsers) => {
      console.log(foundUsers);
      if (!foundUsers)
        return res.json({
          message: "No users found in database.",
        });

      res.status(200).json({ user: foundUsers });
    });
};

// Finds one user
const show = (req, res) => {
  db.user.findByPk(req.params.id).then((founduser) => {
    if (!founduser)
      return res.json({
        message: "user with provided ID not found.",
      });

    res.status(200).json({ user: founduser });
  });
};

// Friend Request
const create = (req, res) => {
  db.relationship.create(req.body).then((saveduser) => {
    res.status(200).json({ relationship: saveduser });
  });
};

//Accept Friend Request
const update = (req, res) => {
  db.relationship
    .update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
    .then((updateduser) => {
      if (!updateduser)
        return res.json({
          message: "No user with that ID found.",
        });
      res.status(200).json({ user: updateduser });
    });
};

// Checking Friendship
const status = (req, res) => {
  db.relationship
    .findAll({
      where: {
        userOneId: req.params.userOneId,
        userTwoId: req.params.userTwoId,
      },
    })
    .then((relationship) => {
      res.status(200).json({ relationship: relationship });
    });
};

// Friends List and to check pending request
const allFriends = (req, res) => {
  db.relationship.findAll({
    where: {
      [Op.or]: [
        { userOneId: req.params.UserId },
        { userTwoId: req.params.UserId },
      ],
      status: 1,
    },
  }).then(friendsList =>{
    res.status(200).json({ friendsList: friendsList });
  })
};

//Deleting a users relationship
const destroy = (req, res) => {
  db.relationship
    .destroy({
      where: { id: req.params.id },
    })
    .then(() => {
      res.status(200).json({ message: "user was deleted" });
    });
};

module.exports = {
  index,
  show,
  create,
  update,
  status,
  allFriends,
  destroy,
};
