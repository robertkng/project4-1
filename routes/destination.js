const express = require('express');
const router = express.Router();
const db = require('../models/destination');

// call getAllDestinations function within the ../models/destiination file
router.get('/destinations', db.getAllDestinations);

module.exports = router;
