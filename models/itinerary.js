const pgp = require('pg-promise')();
const db = require('../lib/dbconnect');

// render all itineraries saved to the database
function getAllItineraries(req, res, next) {
  db.any(`SELECT * FROM itinerary;`)
  .then((results) => {
    res.itinerary = results
    next();
  })
  .catch(err => next(err));
}

// Function call that adds the input data into the itinerary database
function addItinerary(req, res, next) {
 db.none(`INSERT INTO itinerary (title, itinerary)
          VALUES ($1, $2);`, [req.body.title, req.body.itinerary])
 .then(next())
 .catch(err => next(err));
}

function updateItineraryTitle(req, res, next) {
  db.result(`UPDATE itinerary
            SET title = $2
            WHERE id = $1;`, [req.params.id, req.body.title, req.body.itinerary])
  .then(next())
  .catch(err => next(err));
}

// function that deletes selected row from the database
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
  deleteItinerary
};


