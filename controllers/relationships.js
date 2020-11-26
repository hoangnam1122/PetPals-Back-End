const db = require("../models");
const { Op } = require("sequelize");

//Get search results from a user looking up someone by name
const index = (req, res) => {
  let query = `%${req.params.query}%`;
  db.user
    .findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: query } },
          { lastName: { [Op.iLike]: query } },
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
    })
    .catch((err) => {
      console.log(err);
    });
};

// Finds one user
const show = (req, res) => {
  db.user
    .findOne({
      where: { id: req.params.id },
      include: [db.pet, db.post, db.image],
    })
    .then((founduser) => {
      if (!founduser)
        return res.json({
          message: "user with provided ID not found.",
        });

      res.status(200).json({ user: founduser });
    });
};

// Friend Request
const create = (req, res) => {
  db.relationship
    .findOrCreate({
      where: {
        userOneId: req.body.userOneId,
        userTwoId: req.body.userTwoId,
      },
      defaults: {
        status: 0,
        actionUserId: req.body.actionUserId,
      },
    })
    .then((saveduser) => {
      res.status(200).json({ relationship: saveduser });
    })
    .catch((err) => {
      console.log(err);
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
      console.log(updateduser);
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
      console.log(relationship[0].dataValues.status);
      if (relationship[0].dataValues.status === 1) {
        res.status(200).json({ friends: true, data: relationship });
      } else {
        res.status(200).json({ friends: false, data: relationship });
      }
    });
};

// Friends List
const allFriends = (req, res) => {
  db.relationship
    .findAll({
      where: {
        [Op.or]: [
          { userOneId: req.params.UserId },
          { userTwoId: req.params.UserId },
        ],
        status: 1,
      },
    })
    .then((friendsList) => {
      res.status(200).json({ friendsList: friendsList });
    });
};

// Pending request
const pending = (req, res) => {
  const currentUser = parseInt(req.params.userId)
  console.log(typeof currentUser)
  db.relationship
    .findAll({
      where: {
       
        [Op.or]: [
          { userOneId: currentUser },
          { userTwoId: currentUser },
        ],
        status: 0,
        actionUserId: { [Op.ne]: currentUser },
      }, include: [{ model: db.user, as: "userOne",  }, {model: db.user, as: "userTwo",} ],
    })
    .then((foundRelationship) => {
      console.log(foundRelationship)
      res.status(200).json({ relationships: foundRelationship });
    });
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
  pending,
};
