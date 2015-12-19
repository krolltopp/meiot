mongoose = require 'mongoose'
schemaes = require './schemas'

Device = mongoose.model('Device', schemaes.device)

module.exports = {
  device: Device
}
