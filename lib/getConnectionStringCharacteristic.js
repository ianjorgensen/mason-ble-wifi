var util = require('util')
var bleno = require('bleno')
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
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null)
  }
  else {
    getConnectionString(function(err, connectionString) {
      if (err) {
        console.log('error reading connection string')
        return callback(this.RESULT_ATTR_NOT_LONG, null)
      }

      var data = Buffer.from("connectionString", 'utf8')
      console.log('connectionString', connectionString, data);
      return callback(this.RESULT_SUCCESS, data)
    })
  }
}

module.exports = GetConnectionStringCharacteristic
