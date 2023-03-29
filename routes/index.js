var express = require('express');
var EELayers = require('../services/EELayers')
var router = express.Router();

/* GET home page. */
router.get('/visualize', EELayers.getRockOutcrop);

module.exports = router;
