'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo( models.Spot, { foreignKey: 'spotId'} ),
      Image.belongsTo( models.Review, { foreignKey: 'reviewId'} )
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    preview: DataTypes.BOOLEAN,
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reviewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    },
  });
  return Image;
};
