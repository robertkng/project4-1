const pgp = require('pg-promise')();
const db = require('../lib/dbconnect');

// Render all itineraries saved to the database
function getAllItineraries(req, res, next) {
  db.any(`SELECT * FROM itinerary;`)
  .then((results) => {
    res.itinerary = results
    next();
  })
  .catch(err => next(err));
}

// Render specific itinerary that is saved on the database
function getItineraryById(req, res, next) {
  db.one(`SELECT * FROM itinerary WHERE id = $1;`, req.params.id)
  .then((results) => {
    res.itinerary = results
    next();
  })
  .catch(err => next(err));
}

// Function call that adds the input data into the database
function addItinerary(req, res, next) {
 db.none(`INSERT INTO itinerary (title, itinerary)
          VALUES ($1, $2);`, [req.body.title, req.body.itinerary])
 .then(next())
 .catch(err => next(err));
}

// Function to update title and itinerary in the database
function updateItineraryTitle(req, res, next) {
  db.result(`UPDATE itinerary
            SET title = $2,
                itinerary = $3
            WHERE id = $1;`, [req.params.id, req.body.title, req.body.itinerary])
  .then(next())
  .catch(err => next(err));
}

// Function that deletes selected row from the database
function deleteItinerary(req, res, next) {
  db.result(`DELETE FROM itinerary
            WHERE id = $1;`, [req.params.id])
  .then(next())
  .catch(err => next(err));
}

module.exports = {
  addItinerary,
  getAllItineraries,
  updateItineraryTitle,
  deleteItinerary,
  getItineraryById
};
