var util = require('util')
var bleno = require('bleno')

var GetConnectionStringCharacteristic = require('./getConnectionStringCharacteristic.js')
var SetWifiCredentialsCharacteristic = require('./setWifiCredentialsCharacteristic.js')

var serviceUUID = '13333333333333333333333333333337'

var BleWifiService = function() {
  bleno.PrimaryService.call(this, {
    uuid: serviceUUID,
    characteristics: [
      new SetWifiCredentialsCharacteristic(),
      new GetConnectionStringCharacteristic()
    ]
  })
}

util.inherits(BleWifiService, bleno.PrimaryService)

module.exports = BleWifiService
