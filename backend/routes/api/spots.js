const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking, sequelize } = require('../../db/models');
const { Op } = require("sequelize")

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

const validateSearchParams = [
    check('page')
        .exists({ checkFalsy: true})
        .notEmpty()
        .isInt({ min: 0, max: 10})
        .withMessage("Page must be greater than or equal to 0"),
    check('size')
        .exists({ checkFalsy: true})
        .notEmpty()
        .isInt({ min: 0, max: 20})
        .withMessage("Size   must be greater than or equal to 0"),
    check('minLat')
        .isDecimal()
        .withMessage("Minimum latitude is invalid"),
    check('maxLat')
        .isDecimal()
        .withMessage("Maximum latitude is invalid"),
    check('minLng')
        .isDecimal()
        .withMessage("Minimum longitude is invalid"),
    check('maxLng')
        .isDecimal()
        .withMessage("Maximum longitude is invalid"),
    check('minPrice')
        .isDecimal({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    check('maxPrice')
        .isDecimal({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0")
]

// Get all Spots
router.get('/', validateSearchParams, async (req, res) => {
    let { page = 1, size = 20, minLat = -180, maxLat = 180, minLng = -180, maxLng = 180, minPrice = 0, maxPrice = 99999 } = req.query
    const Spots = await Spot.findAll({
        attributes: {
            include: [[sequelize.fn('COALESCE', sequelize.fn('AVG',
             sequelize.col('Reviews.stars')), 0), 'avgRating'],
            [sequelize.fn('COALESCE', sequelize.col('Images.url'), null), 'previewImage']]
        },
        include: [{
            model: Review,
            attributes: [],
            required: false
        },
        {
            model: Image,
            attributes: [],
            where: { preview: true }
        }],
        group: ['Spot.id', 'Images.url'],
        limit: size,
        offset: (page - 1) * size,
        subQuery: false,
        where: {
            lat: { [Op.between]: [minLat, maxLat] },
            lng: { [Op.between]: [minLng, maxLng] },
            price: { [Op.between]: [minPrice, maxPrice] },
        }
    })
    return res.json({Spots})
})

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    if (user) {
      const Spots = await Spot.findAll({
        attributes: {
            include: [[sequelize.fn('COALESCE', sequelize.fn('AVG',
             sequelize.col('Reviews.stars')), null), 'avgRating'],
            [sequelize.fn('COALESCE', sequelize.col('Images.url'), null), 'previewImage']]
        },
        include: [{
            model: Review,
            attributes: [],
        },
        {
            model: Image,
            attributes: [],
            where: { preview: true }
        }],
        group: ['Spot.id', 'Images.url'],
        where: { ownerId: req.user.id }
    })
      res.json({ Spots })
    // return null is no user is logged in
    } else return res.json({ user: null })
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        attributes: {
            include: [[sequelize.fn('COALESCE', sequelize.fn('AVG',
             sequelize.col('Reviews.stars')), null), 'avgRating'],
            [sequelize.fn('COALESCE', sequelize.col('Images.url'), null), 'previewImage']]
        },
        include: [{
            model: Review,
            attributes: [],
        },
        {
            model: Image,
            attributes: [],
            where: { preview: true }
        }, {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName'],
            }],
        group: ['Spot.id', 'Images.url', 'Images.id', 'Owner.id']
    })
    // Error is spot doesn't exist
    if (!spot) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }

    // Add SpotImages to Spot
    const images = await Image.findAll({
        where: { spotId: req.params.spotId, reviewId: null },
        attributes: ['id', 'url', 'preview']
    })
    spot.dataValues.SpotImages = images

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
            url, preview, spotId: spot.id, userId: req.user.id
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
    const ReviewsNoImages = await Review.findAll({
        attributes: ['id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [{
            model:User,
            attributes: ['id', 'firstName', 'lastName']
        }],
        where: {
            spotId: req.params.spotId
        }
    })
    // Get Images for reviews
    let Reviews = []
    for (let i = 0; i <= ReviewsNoImages.length; i++) {
        let rev = ReviewsNoImages.pop();
        const images = await Image.findAll({
            where: { reviewId: rev.id},
            attributes: ['id', 'url']
        })
        rev.dataValues.ReviewImages = images
        Reviews.push(rev)
    }

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
    const spot = await Spot.findOne({ where: { id: req.params.spotId } } )

    // Error if spot doesn't exist
    if (!spot || spot.ownerId === req.user.id) {
        const e = new Error("Couldn't find a Spot with the specified id")
        const errorObj = {
            message: `Spot couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    let { startDate, endDate } = req.body
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    // Error if endDate is before startDate
    if (endDate <= startDate) {
        let errorObj = {
            message: `endDate cannot be on or before startDate`,
            statusCode: 400,
            errors: [
                "endDate cannot be on or before startDate"
            ]
        }
        return res.json(errorObj)
    }

    // Error if booking already exists
    const checkStartDate = await Booking.findAll({
        where: { startDate: { [Op.between]: [startDate, endDate] } }
    })
    const checkEndDate = await Booking.findAll({
        where: { endDate: { [Op.between]: [startDate, endDate] } }
    })
    const checkBoth = await Booking.findAll({
        where: {
            startDate: { [Op.lt]: startDate },
            endDate: { [Op.gt]: endDate }
        }
    })
    let errorObj = {
        message: `Sorry, this spot is already booked for the specified dates`,
        statusCode: 403,
        errors: []
    }
    let flag = false
    if(checkEndDate[0] || checkBoth[0]) {
        new Error("Booking conflict")
        errorObj.errors.push("Start date conflicts with an existing booking")
        flag = true
    }
    if (checkStartDate[0] || checkBoth[0]) {
        new Error("Booking conflict")
        errorObj.errors.push("End date conflicts with an existing booking")
        flag = true
    }
    if (flag) {
        return res.json(errorObj)
    }

    // Create booking after passing checks
    if (spot.ownerId !== req.user.id) {
        const newBooking = await Booking.create({
            startDate, endDate, spotId: spot.id, userId: req.user.id
        })
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
    const updatedSpot = req.body
    if (spot.ownerId === req.user.id) {
        await spot.update(updatedSpot)
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
