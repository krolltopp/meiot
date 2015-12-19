var deviceService, express, router;

express = require('express');

deviceService = require('./../data/device-service');

router = express.Router();

router.get('/', function(req, res) {
  var list;
  list = [
    {
      name: 'a',
      description: 'a description'
    }, {
      name: 'b',
      description: 'b description'
    }, {
      name: 'c',
      description: 'c description'
    }
  ];
  return res.json(list);
});

router.post('/', function(req, res) {
  var device;
  device = req.body;
  console.log(device);
  return res.json(device);
});

module.exports = router;
