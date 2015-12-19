var device, mongoose;

mongoose = require('mongoose');

device = mongoose.Schema({
  name: String,
  description: String
});

module.exports = {
  device: device
};
