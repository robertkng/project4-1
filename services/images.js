const fetch = require('node-fetch');

function searchImages(req, res, next) {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  fetch(`https://${CLIENT_ID}:${CLIENT_SECRET}@api.shutterstock.com/v2/images/search?query=${req.query.images}`)
  .then(results => results.json())
  .then((data) => {
    res.images = data;
    next();
  })
  .catch((err) => {
    res.err = err;
    next();
  });
}

module.exports = { searchImages };

