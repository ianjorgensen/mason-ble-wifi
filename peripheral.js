var bleno = require('bleno')
var settings = require('./settings.json')

var BleWifiService = require('./lib/bleWifiService.js')

var name = 'Carysta#' + settings.serialnumber

var bleWifiService = new BleWifiService()

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising(name, [bleWifiService.uuid], function(err) {
      if (err) {
        console.log(err)
      }
    })
  }
  else {
    bleno.stopAdvertising()
  }
})

bleno.on('advertisingStart', function(err) {
  if (!err) {
    console.log('advertising...')
    bleno.setServices([bleWifiService])
  }
})
