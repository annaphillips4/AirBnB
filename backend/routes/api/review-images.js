const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking, sequelize } = require('../../db/models');

const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await Image.findByPk(req.params.imageId)
    // Error if image doesn't exist
    if (!image || image.userId !== req.user.id) {
        const e = new Error("Couldn't find a Reveiw Image with the specified id")
        const errorObj = {
            message: `Review Image couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    // If the image is the req.user's- delete
    if (image.userId === req.user.id) {
        await image.destroy();
        const successObj = {
            message: 'Successfully deleted',
            statusCode: 200
        }
        return res.json(successObj)
    }
})

module.exports = router;