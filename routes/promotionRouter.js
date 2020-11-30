const { response } = require('express');
const express = require('express');
const Promotion = require('../models/promotion')

const promotionRouter = express.Router();

promotionRouter.route('/')
  .get((req, res, next) => {
    Promotion.find()
      .then(promotions => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application');
        res.json(promotions);
      })
      .catch(err => next(err));
  })
  .post((req, res, next) => {
    Promotion.create(req.body)
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
    res.end('PUT operation not supported on /promotions');
  })
  .delete((reg, res) => {
    Promotion.deleteMany()
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application');
        res.json(response);
      })
      .catch(err => next(err));
  });

promotionRouter.route('/:promotionId')
  .get((req, res, next) => {
    Promotion.findById(req.params.promtionId)
      .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      })
      .catch(err => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotion/${req.params.promotionId}`);
  })
  .put((req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionId, {
      $set: req.body
    }, { new: true })
      .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
      })
      .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Promption.findByIdAndDelete(req.params.promptionId)
      .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
      })
      .catch(err => next(err));
  });

module.exports = promotionRouter;
