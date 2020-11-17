'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petSpecies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  petSpecies.init({
    petId: DataTypes.INTEGER,
    speciesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'petSpecies',
  });
  return petSpecies;
};