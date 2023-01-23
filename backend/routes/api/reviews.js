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

// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const findReview = await Review.findOne({ where: { id: req.params.reviewId } })
    if (!findReview) {
        const e = new Error("Couldn't find a Review with the specified id")
        const errorObj = {
            message: `Review couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    if(findReview.userId === req.user.id) {
        const { review, stars } = req.body
        findReview.set({ review, stars })
        await findReview.update()
        return res.json(findReview)
    }
})

// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {

})

// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const findReview = await Review.findOne({ where: { id: req.params.reviewId } })
    if (!findReview) {
        const e = new Error("Couldn't find a Review with the specified id")
        const errorObj = {
            message: `Review couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
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
