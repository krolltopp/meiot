deviceService = require './device-service'

describe 'Device Service', () ->

  beforeEach(() ->
    deviceService.clear()
  )

  it 'can create a new device', () ->
    device = deviceService.createAndSave({})
