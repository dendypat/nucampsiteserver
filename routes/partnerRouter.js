const express = require('express');
const partnerRouter = express.Router();
const bodyParser = require('body-parser');

partnerRouter.use(bodyParser.json());

partnerRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
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
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end(`Will send ${req.params.partnerId}'s details to you`);
})
.post((req, res) => {
  res.end(`Will add the partner: ${req.params.partnerId}`);
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /partners');
})
.delete((req, res) => {
  res.end('Deleting all the partners');
});
