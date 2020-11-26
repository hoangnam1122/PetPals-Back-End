const db = require("../models");
const { Op } = require("sequelize");

//Get search results from a user looking up someone by name
const index = (req, res) => {
  let query = `%${req.params.query}%`;
  console.log(query);
  //   Querry needs to look like this (% part of name %) they need to be wrapped in  % %
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
  console.log(req.params.id);
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
  console.log(req.body);
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
  console.log(req.body, req.params.id);
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
        console.log("in here");
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
  console.log(req.params);
  db.relationship
    .findAll({
      where: {
       
        [Op.or]: [
          { userOneId: req.params.userId },
          { userTwoId: req.params.userId },
        ],
        status: 0,
        actionUserId: { [Op.ne]: req.params.userId },
      }, include: [{ model: db.user, as: "userOne" }, {model: db.user, as: "userTwo"}],
    })
    .then((foundRelationship) => {
      console.log(foundRelationship[0].dataValues);
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
