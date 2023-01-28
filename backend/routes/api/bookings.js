const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking, sequelize } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Get all of the Current User's Bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    if (user) {
      const Bookings = await Booking.findAll({
        attributes: {
            include: ['createdAt', 'updatedAt']
        },
        include: [{
            model: Spot,
            attributes: {
            //   include: [[sequelize.fn('COALESCE', sequelize.col('Images.url'), null), 'previewImage']],
              exclude: ['description', 'createdAt', 'updatedAt']
            },
            include: {
              model: Image,
              attributes: [],
              where: { preview: true }
            }
        }],
        where: { userId: user.id },
      })
      return res.json({Bookings})
    }
  })

// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findOne({ where: { id: req.params.bookingId } })

    // Error if booking doesn't exist
    if (!booking || booking.userId !== req.user.id) {
        const e = new Error("Couldn't find a Booking with the specified id")
        const errorObj = {
            message: "Booking couldn't be found",
            statusCode: 404
        }
        return res.json(errorObj)
    }
    if (booking.userId === req.user.id) {
        const updates = req.body
        await booking.update(updates)
        return res.json(booking)
    }
})

// Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findOne({ where: { id: req.params.bookingId } })
    // Error if booking doesn't exist
    if (!booking || booking.userId !== req.user.id) {
        const e = new Error("Couldn't find a Booking with the specified id")
        const errorObj = {
            message: "Booking couldn't be found",
            statusCode: 404
        }
        return res.json(errorObj)
    }
    // // Error if today is past booking's startDate
    // const today = new Date()
    // if (startDate >= today) {
    //     const e = new Error("Bookings that have been started can't be deleted")
    //     const errorObj = {
    //         message: "Bookings that have been started can't be deleted",
    //         statusCode: 403
    //     }
    //     return res.json(errorObj)
    // }
    // If the booking is the req.user's- delete
    if(booking.userId === req.user.id) {
        await booking.destroy();
        const successObj = {
            message: "Successfully deleted",
            statusCode: 200
        }
        return res.json(successObj)
    }
})

module.exports = router;
