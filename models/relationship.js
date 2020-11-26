'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.relationship.belongsTo(models.user, {as:"userOne",foreignKey:"userOneId"})
      models.relationship.belongsTo(models.user, {as:"userTwo",foreignKey:"userTwoId"})
    }
  };
  relationship.init({
    userOneId: DataTypes.INTEGER,
    userTwoId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    actionUserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'relationship',
  });
  return relationship;
};