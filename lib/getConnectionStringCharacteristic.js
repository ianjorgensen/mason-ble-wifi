var util = require('util')
var bleno = require('bleno')
var ip = require('ip')
var settings = require('./../settings.json')

var Characteristic = bleno.Characteristic
var _interface = settings.wlanInterface
var port = settings.port

var GetConnectionStringCharacteristic = function() {
  bleno.Characteristic.call(this, {
    uuid: '13333333333333333333333333330001',
    properties: ['read'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Get connection string'
      })
    ]
  })
}

util.inherits(GetConnectionStringCharacteristic, bleno.Characteristic)

GetConnectionStringCharacteristic.prototype.onReadRequest = function(offset, callback) {
  var connectionString = ip.address(_interface);
  //todo make it all bytes

  var data = Buffer.from(connectionString, 'ascii')
  console.log('Read request. About to send', connectionString, data);
  return callback(Characteristic.RESULT_SUCCESS, data)
}

module.exports = GetConnectionStringCharacteristic
