'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.image.belongsTo(models.user)
      models.image.belongsToMany(models.pet, { through: "petImage" })
      models.image.belongsToMany(models.post, { through: "postImage" })
      models.image.belongsToMany(models.user, { through: "userImage" })
    }
  };
  image.init({
    imageUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'image',
  });
  return image;
};