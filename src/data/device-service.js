var Device, DeviceService, models;

models = require('./models');

Device = models.device;

DeviceService = (function() {
  function DeviceService(Device1) {
    this.Device = Device1;
  }

  return DeviceService;

})();

module.exports = new DeviceService(Device);
