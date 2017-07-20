var util = require('util')
var bleno = require('bleno')
var setWifiCredentials = require('./setWifiCredentials.js')
var bitpack = require('./bitpack')
var credentials = {
  ssid: null,
  password: null
}
var credentialsPackets = {
  ssid: new Uint8Array(),
  password: new Uint8Array()
}

var hex2a = function(hexx) {
    var hex = hexx.toString()//force conversion
    var str = ''
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    return str
}

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
  console.log('Got data', data, arguments);
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG)
  } else {
    if (data[0] == 0) {
      var packetBit = bitpack(credentialsPackets.ssid, data);
      credentialsPackets.ssid = packetBit.packet

      if (packetBit.complete) {
        credentials.ssid = Buffer(credentialsPackets.ssid).toString('utf8')
        console.log('ssid complete', credentials.ssid)
      }
    }

    if (data[0] == 1) {
      var packetBit = bitpack(credentialsPackets.password, data);
      credentialsPackets.password = packetBit.packet

      if (packetBit.complete) {
        credentials.password = Buffer(credentialsPackets.password).toString('utf8')
        console.log('password complete', credentials.password)
        console.log('attempt to connect to wifi with', credentials)

        // atempt to connect to wifi
        setWifiCredentials(credentials.ssid, credentials.password)
      }
    }

    // todo parse this stuff and if it makes sense to to connect to wifi setWifiCredentials
    callback(this.RESULT_SUCCESS)
  }
}

module.exports = SetWifiCredentialsCharacteristic
