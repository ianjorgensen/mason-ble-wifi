var util = require('util')
var bleWifi = require('./index.js')
var bleno = require('bleno')

var serviceUUID = '13333333333333333333333333333337'
var setWifiCredentialsCharacteristicUUID = '13333333333333333333333333330003'
var getConnectionStringCharacteristicUUID = '13333333333333333333333333330001'

var GetConnectionStringCharacteristic = function() {
  bleno.Characteristic.call(this, {
    uuid: getConnectionStringCharacteristicUUID,
    properties: ['read'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Get connection string'
      })
    ]
  });
}
util.inherits(GetConnectionStringCharacteristic, bleno.Characteristic);
GetConnectionStringCharacteristic.prototype.onReadRequest = function(offset, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG, null);
  }
  else {
    var data = Buffer.from('hello', 'utf8');
    callback(this.RESULT_SUCCESS, data);
  }
};


var SetWifiCredentialsCharacteristic = function() {
  bleno.Characteristic.call(this, {
    uuid: setWifiCredentialsCharacteristicUUID,
    properties: ['write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'Sets wifi credentails on wlan0'
      })
    ]
  })
}
util.inherits(SetWifiCredentialsCharacteristic, bleno.Characteristic);
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
    callback(this.RESULT_SUCCESS)
  }
}

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



var name = 'CarystaBleWifiPairing'
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
