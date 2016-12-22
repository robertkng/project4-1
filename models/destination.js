const pgp = require('pg-promise')();
const db = require('../lib/dbconnect');

// render all destinations from the database
function getAllDestinations(req, res, next) {
  db.any(`SELECT * FROM destinations;`)
  .then((results) => {
    res.status(200)
        .json({
          data: results,
        });
  })
  .catch(err => next(err));
}

module.exports = {
  getAllDestinations: getAllDestinations,
};

