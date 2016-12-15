const express = require('express');
const router = express.Router();
const db = require('../models/itinerary');

// setup routers to call on functions from specific files
router.get('/itinerary', db.getAllItineraries, (req, res) => {
  res.json(res.itinerary || []);
})

// call addItinerary function within the ../models/itinerary file
router.post('/itinerary', db.addItinerary, (req, res) => {
  res.json(res.itinerary || []);
})


router.put('/itinerary/:id', db.updateItineraryTitle, (req, res) => {
  res.json(res.itinerary || []);
})

// call deleteItinerary function within the ../models/itinerary file
router.delete('/itinerary', db.deleteItinerary, (req, res) => {
  res.json(res.itinerary || []);
})

module.exports = router;
