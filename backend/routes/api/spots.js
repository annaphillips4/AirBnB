const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking, sequelize } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Street address is required"),
    check('city')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("City is required"),
    check('state')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("State is required"),
    check('country')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Country is required"),
    check('lat')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Latitude is not valid"),
    check('lng')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Longitude is not valid"),
    check('name')
      .exists({ checkFalsy: true })
      .notEmpty()
      .isLength( { max: 50 } )
      .withMessage("Name must be less than 50 characters"),
    check('description')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Description is required"),
    check('price')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage("Price per day is required"),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Review text is required"),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({ min: 1, max: 5})
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]

const validateBooking = [
    check('endDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("endDate cannot be on or before startDate"),
    handleValidationErrors
]


// Get all Spots
router.get('/', async (req, res) => {
    const Spots = await Spot.findAll({
        attributes: {
            include: [
                'createdAt',
                'updatedAt',
                [sequelize.fn("AVG", sequelize.col("Reviews.stars", {
                    where: { spotId: Spot.id }
                    })), "avgRating"],
            ]
        },
        include: [{
            model: Review,
            attributes: []
        }, {
            model: Image,
            attributes: ['url']
        }]
    })
    return res.json({Spots})
})

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    if (user) {
      // const userId = user.id;
      const spots = await Spot.findAll( {
        attributes: {
          include: ['createdAt', 'updatedAt',
          [sequelize.fn("AVG", sequelize.col("Reviews.stars", {
                      where: { spotId: req.params.spotId }
                  })), "avgRating"],
          ]
        },
        include: [{
          model: Review,
          attributes: [],
        }],
        where: { ownerId: req.user.id }
      } )
      res.json({ spots })
    } else return res.json({ user: null })
  })

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: {
            include: [
                [sequelize.fn("AVG", sequelize.col("Reviews.stars", {
                    where: { spotId: req.params.spotId }
                })), "avgStarRating"],
                [sequelize.fn("COUNT", sequelize.col("Reviews.id", {
                    where: { spotId: req.params.spotId }
                })),"numReviews"],
            ]
        },
        include: [{
                model: Review,
                attributes: []
            }, {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName'],
            }]
    })

    const spotImages = await Image.findAll({
        attributes: ['id', 'url', 'preview'],
        where: { spotId: req.params.spotId }
    })
    spot.dataValues.SpotImages = spotImages

    if (spot.id === null) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }

    return res.json(spot)
})

// Create a spot
router.post('/',
    requireAuth,
    validateSpot,
    async (req, res) => {
        const { address, city, state, country, lat, lng, name, description, price } = req.body
        const newSpot = await Spot.create({
            address, city, state, country, lat, lng, name, description, price, ownerId: req.user.id
        })
        const checkInDB = await Spot.findOne({ where: { id: newSpot.id } })
        return res.json(checkInDB)
})

// Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    const { user } = req;
    if (!spot) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    if (spot.ownerId === req.user.id) {
        const { url, preview } = req.body
        const newImage = await Image.create({
            url, preview, spotId: spot.id
        })
        const checkImage = await Image.findOne({
            attributes: [ 'id' , 'url' , 'preview' ],
            where: { url: url}
        })
        return res.json(checkImage)
    }
})

// Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    })
    if (!spot) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    const Reviews = await Review.findAll({
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [{
            model:User,
            attributes: ['id', 'firstName', 'lastName']
        }, {
            model: Image,
            // as: 'ReviewImages',
            attributes: ['id', 'url']
        }],
        where: {
            spotId: req.params.spotId
        }
    })
    return res.json({Reviews})
})

// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews',
requireAuth,
validateReview,
async (req, res) => {
    const spot = await Spot.findOne({ where: { id: req.params.spotId } } )
    // Error if spot doesn't exist
    if (!spot) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    // Error if review already exists from current user
    const findReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: spot.id
        }
    })
    if(findReview) {
        const e = new Error("Review from the current user already exists for the Spot")
        const errorObj = {
            message: `User already has a review for this spot`,
            statusCode: 403
        }
        return res.json(errorObj)
    }
    const { review, stars } = req.body
    const newReview = await Review.create({
        review, stars, spotId: spot.id, userId: req.user.id
    })
    return res.json(newReview)
})

// Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findOne({ where: { id: req.params.spotId } } )
    // Error if spot doesn't exist
    if (!spot) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    if (spot.ownerId !== req.user.id) {
        const Bookings = await Booking.findAll({
            attributes: ['spotId', 'startDate', 'endDate'],
            where: { spotId: req.params.spotId }
        })
        return res.json({Bookings})
    } else {
        const Bookings = await Booking.findAll({
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            where: { spotId: req.params.spotId }
        })
        return res.json({Bookings})
    }
})

// Create a Booking from a Spot based on the Spot's id
router.post('/:spotId/bookings',
requireAuth,
validateBooking,
async (req, res) => {
    console.log('router hit')
    const spot = await Spot.findOne({ where: { id: req.params.spotId } } )
    console.log(`got spot ${spot}`)
    const { startDate, endDate } = req.body
    console.log(`got req.body ${startDate} and ${endDate}`)
    // Error if spot doesn't exist
    if (!spot || spot.ownerId === req.user.id) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    console.log(`passed error "!spot || spot.ownerId === req.user.id"`)
    // If the user is not the spot owner, create booking in the database
    if (spot.ownerId !== req.user.id) {
        console.log(`entered "spot.ownerId !== req.user.id"`)
        const newBooking = await Booking.create({
            startDate, endDate, spotId: spot.id, userId: req.user.id
        })
        console.log(newBooking)
        return res.json(newBooking)
    }
})

// Edit a Spot
router.put('/:spotId',
requireAuth,
validateSpot,
async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    if (spot.ownerId === req.user.id) {
        spot.set({ address, city, state, country, lat, lng, name, description, price })
        await spot.update()
        return res.json(spot)
    }

})

// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot || spot.ownerId !== req.user.id) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    if (spot.ownerId === req.user.id) {
        await spot.destroy();
        const successObj = {
            message: 'Successfully deleted',
            statusCode: 200
        }
        return res.json(successObj)
    }
})

module.exports = router;
