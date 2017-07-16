var util = require('util')
var bleno = require('bleno')
var Characteristic = bleno.Characteristic;

var getConnectionString = require('./getConnectionString.js')

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
  getConnectionString(function(err, connectionString) {
    var data = Buffer.from(connectionString.ip, 'ascii')

    console.log('connectionString ip', connectionString.ip, data);

    return callback(Characteristic.RESULT_SUCCESS, data)
  })
}

module.exports = GetConnectionStringCharacteristic
