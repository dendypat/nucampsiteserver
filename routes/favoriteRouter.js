const express = require('express');
const cors = require('./cors');
const authenticate = require('../authenticate');
const Favorite = require('../models/favorite');
const { application } = require('express');
const favoriteRouter = express.Router();

favoriteRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    Favorite.find({ user: req.user._id })
      .populate('user.favorite')
      .populate('campsites.favorite')
      .then(favorite => {
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
      })
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id })
      .then(favorite => {
        console.log(`Favorite ${reg.params.campsite.ObjectId} created`)
        if (favorite) {
          // forEach
          // includes
          // push
        } else {
          Favorite.create()
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(favorite);
        }
      })
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOneAndDelete(req.params.user.favorite)
    if (favorite) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(favorite);
    }
    else {
      res.setHeader('Content-Type', 'text/plain');
      res.end('You do not have any favorites to delete.')
    }
  })

favoriteRouter.route('/:campsiteId')
  .options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
  .get(cors.cors, (req, res, next) => {
    res.statusCode = 403;
    res.end(`GET operation not supported on /favorites/${req.params.campsiteId}`);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne()
      .then(favorite => {
        if (!favorite) {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          favorite.save();
        } else {
          err = new Error(`That ${req.params.campsiteId} is already in the list of favorites`);
          err.status = 404;
          return next(err);
        })
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /favorites/${req.params.campsiteId}`);
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne(req.params.campsiteId)
    if (favorite) {
      favorite.filter(req.params.campsiteId);
      favorite.save();
    } else {
      res.setHeader('Content-Type', 'text/plain');
      res.end('You do not have any favorites to delete.')
    }
  })

module.exports = favoriteRouter;
