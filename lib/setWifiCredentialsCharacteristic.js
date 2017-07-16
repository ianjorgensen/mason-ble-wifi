var util = require('util')
var bleno = require('bleno')
var setWifiCredentials = require('./setWifiCredentials.js')

var SetWifiCredentialsCharacteristic = function() {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330003',
    properties: ['write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Sets wifi credentails on wlan0'
      })
    ]
  })
}

util.inherits(SetWifiCredentialsCharacteristic, bleno.Characteristic)

SetWifiCredentialsCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log('%%%%%%%% onWriteRequest from ble', data);
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG)
  }
  else if (data.length !== 2) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH)
  }
  else {
    console.log('%%%%%%%% Got this data from ble', data)
    // todo parse this stuff and if it makes sense to to connect to wifi setWifiCredentials
    callback(this.RESULT_SUCCESS)
  }
}

module.exports = SetWifiCredentialsCharacteristic
