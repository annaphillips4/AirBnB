const router = require('express').Router();

router.post('/test', function(req, res) {
    console.log("testing")
    res.json({ requestBody: req.body });
})


module.exports = router;
