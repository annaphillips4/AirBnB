'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      }),
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      }),
      Spot.hasMany(models.Image, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      }),
      Spot.belongsTo(models.User, { foreignKey: 'ownerId'} )
    }
  }
  Spot.init({
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },
    county: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true,
      }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        max: 180,
        min: -180
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        max: 180,
        min: -180
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        len: [0, 1000]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    avgRating: {
      type: DataTypes.DECIMAL,
      validate: {
        max: 5,
        min: 1
      }
    },
    previewImage: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
