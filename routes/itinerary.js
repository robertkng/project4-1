const express = require('express');
const router = express.Router();
const db = require('../models/itinerary');

// Setup routers to call on functions from specific files
router.get('/itinerary', db.getAllItineraries, (req, res) => {
  res.json(res.itinerary || []);
});

router.get('/itinerary/:id', db.getItineraryById, (req, res) => {
  res.json(res.itinerary || []);
});

// Call addItinerary function within the ../models/itinerary file
router.post('/itinerary', db.addItinerary, (req, res) => {
  res.json(res.itinerary || []);
});

// Update title and itinerary of a specific itinerary
router.put('/itinerary/:id', db.updateItineraryTitle, (req, res) => {
  res.json(res.itinerary || []);
});

// Call deleteItinerary function within the ../models/itinerary file
router.delete('/itinerary/:id', db.deleteItinerary, (req, res) => {
  res.json(res.itinerary || []);
});

module.exports = router;
