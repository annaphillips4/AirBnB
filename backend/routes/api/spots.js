const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot } = require('../../db/models');

const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// Get all Spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    return res.json({spots})
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    // !!!!!!!!! Append images w/ details and owner w/ details !!!!!!!!!!
    if (spot === null) {
        const e = new Error("Couldn't find a Spot with the specified id")
        e.statusCode = 404;
        e.message = "Spot couldn't be found";
        return res.json(e)
    }
    return res.json({spot})
})

// Create a spot
router.post('/', )

// Delete a spot
router.delete('/:spotId', restoreUser, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (spot === null) {
        const e = new Error("Couldn't find a Spot with the specified id")
        e.statusCode = 404;
        e.message = "Spot couldn't be found";
        return res.json(e)
    }
})

module.exports = router;
