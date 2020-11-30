const express = require('express');
const Partner = require('../models/partner');

const partnerRouter = express.Router();

partnerRouter.route('/')
  .get((req, res) => {
    res.end('Will send all the partners to you');
  })
  .post((req, res) => {
    res.end(`Will add the partner: ${req.body.name} with description: ${req.body.description}`);
  })
  .put((req, rest) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
  })
  .delete((req, res) => {
    res.end('Deleting all the partners');
  });

partnerRouter.route('/:partnerId')
.get((req, res, next) => {
  Campsite.findById(req.params.campsiteId)
      .then(campsite => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(campsite);
      })
      .catch(err => next(err));
})
.post((req, res) => {
  res.statusCode = 403;
  res.end(`POST operation not supported on /campsites/${req.params.campsiteId}`);
})
.put((req, res, next) => {
  Partner.findByIdAndUpdate(req.params.partnerId, {
      $set: req.body
  }, { new: true })
      .then(partner => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(partner);
      })
      .catch(err => next(err));
})
.delete((req, res, next) => {
  Partner.findByIdAndDelete(req.params.partnerId)
      .then(response => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(response);
      })
      .catch(err => next(err));
});

module.exports = partnerRouter;
