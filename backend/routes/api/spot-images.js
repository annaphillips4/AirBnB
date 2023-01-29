const express = require('express');

const { requireAuth } = require('../../utils/auth');
const { User, Spot, Review, Image, Booking, sequelize } = require('../../db/models');

const router = express.Router();

// Delete a Spot Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    console.log("router hit")
    const image = await Image.findByPk(req.params.imageId)
    console.log(image.id, image)
    if (!image) {
        console.log(image.userId, req.user.id)
        const e = new Error("Couldn't find a Spot Image with the specified id")
        const errorObj = {
            message: `Spot Image couldn't be found`,
            statusCode: 404
        }
        return res.json(errorObj)
    }
    if (image.userId === req.user.id) {
        console.log("entered 'image.userId === req.user.id'")
        await image.destroy();
        const successObj = {
            message: 'Successfully deleted',
            statusCode: 200
        }
        return res.json(successObj)
    }
})

module.exports = router;
