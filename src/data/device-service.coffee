models = require './models'
Device = models.device

class DeviceService
  constructor: (@Device) ->

module.exports = new DeviceService(Device)
