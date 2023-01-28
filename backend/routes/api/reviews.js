const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, sequelize } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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

// Get all Reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    if (user) {
      const Reviews = await Review.findAll( {
        attributes: [ 'id', 'userId', 'spotId', 'review', 'stars', 'createdAt', 'updatedAt'],
        include: [{
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }, {
          model: Spot,
        }, {
          model: Image,
          attributes: ['id','url']
        }],
        where: { userId: req.user.id } } )
      return res.json({ Reviews })
    }
  })

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const findReview = await Review.findByPk(req.params.reviewId)
    if (!findReview) {
        const e = new Error("Couldn't find a Review with the specified id")
        const errorObj = {
            message: `Review couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    const { review, stars } = req.body
    if(findReview.userId === req.user.id) {
        findReview.set({ review, stars })
        await findReview.update()
        return res.json(findReview)
    }
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const findReview = await Review.findByPk(req.params.reviewId//, {
    //     attributes: {
    //         include: [
    //             [sequelize.fn("COUNT", sequelize.col("Images.id", {
    //                 where: { reviewId: req.params.reviewId }
    //             })), "numImages"]
    //         ]
    //     }
    // }
    )
    if (!findReview) {
        const e = new Error("Couldn't find a Review with the specified id")
        const errorObj = {
            message: `Review couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    // const maxImages = 10
    // if (findReview.numImages >= maxImages) {
    //     const e = new Error("Cannot add any more images because there is a maximum of 10 images per resource")
    //     const errorObj = {
    //         message: `Maximum number of images for this resource was reached`,
    //         statusCode: 403
    //     }
    //     return res.json(errorObj)
    // }
    if(findReview.userId === req.user.id) {
        const { url } = req.body
        const newImage = await Image.create({
            url, preview: false, reviewId: findReview.id, spotId: findReview.spotId
        })
        const checkImage = await Image.findOne({
            attributes: ['id', 'url'],
            where: { id: newImage.id }
        })
        return res.json(checkImage)
    }
})

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const findReview = await Review.findByPk(req.params.reviewId)
    // Error if review doesn't exist
    if (!findReview) {
        const e = new Error("Couldn't find a Review with the specified id")
        const errorObj = {
            message: `Review couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    // If the review is the req.user's- delete
    if(findReview.userId === req.user.id) {
        await findReview.destroy();
        const successObj = {
            message: "Successfully deleted",
            statusCode: 200
        }
        return res.json(successObj)
    }
})

module.exports = router;
