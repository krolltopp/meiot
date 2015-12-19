models = require './models'
Q = require 'q'
Device = models.device

class DeviceService
  constructor: (@Device) ->

  createAndSave: (deviceData) ->
    device = new @Device(deviceData)
    device.save((err, device) ->

    )

  get: (id) ->

  clear: () ->
    @Device.collection.remove()

  list: () ->

module.exports = new DeviceService(Device)
