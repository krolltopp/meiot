express = require 'express'
deviceService = require './../data/device-service'

router = express.Router()

# GET all IoT devices
router.get '/', (req, res) ->
  list = [
    {
      name: 'a'
      description: 'a description'
    },
    {
      name: 'b'
      description: 'b description'
    },
    {
      name: 'c'
      description: 'c description'
    }
    ]
  res.json(list)

router.post '/', (req, res) ->
  device = req.body
  console.log(device)
  res.json(device)

module.exports = router
