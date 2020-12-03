const express = require('express');
const Partner = require('../models/partner');

const partnerRouter = express.Router();

partnerRouter.route('/')
.get((req, res, next) => {
  Partner.find()
    .then(promotions => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application');
      res.json(promotions);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
  Partner.create(req.body)
    .then(promotion => {
      console.log('Promotion Created', promotion);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application');
      res.json(promotion);
    })
    .catch(err => next(err));
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /partner');
})
.delete((reg, res) => {
  Partner.deleteMany()
    .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application');
      res.json(response);
    })
    .catch(err => next(err));
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
