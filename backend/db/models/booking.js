'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Spot, { foreignKey: 'spotId'} ),
      Booking.belongsTo(models.User, { foreignKey: 'userId'} )
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        afterToday(value) {
          const today = new Date()
          if (value < today) {
            throw new Error("Bookings cannot be made for past dates.")
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
      }
    },
  }, {
    sequelize,
    validate: {
      endAfterStart(value) {
        if (value < this.startDate) {
          throw new Error("End date must be after start date.")
        }
      }
    },
    modelName: 'Booking',
  });
  return Booking;
};
