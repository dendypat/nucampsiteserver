const express = require('express');
const promotionRouter = express.Router();
const bodyParser = require('body-parser');

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end('Will send all promotions to you');
})
.post((req, res) => {
  res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`)
})
.put((req, res) =>{
  res.statusCode = 403;
  res.end('PUT operation not supported on /promotions');
})
.delete((reg, res) => {
  res.end('Deleting all the campsites');
});

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end(`Will send the ${req.params.promotionId} details to you`);
})
.post((req, res) => {
  res.end(`Will add promotion: ${req.params.promotionId} with description: ${req.params.promotionId}`)
})
.put((req, res) =>{
  res.statusCode = 403;
  res.end('PUT operation not supported on /promotions');
})
.delete((reg, res) => {
  res.end('Deleting all the campsites');
});

module.exports = promotionRouter;
