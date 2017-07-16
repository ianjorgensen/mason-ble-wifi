var ip = require('ip')
var wifi = require('node-wifi')

module.exports = function(callback) {
  var _interface = 'en0'
  var port = 3842
  var defaultIp
  var interfaceIp
  wifi.init({ iface: _interface })

  var resolveConnectionString = function(ssid) {
    var ip = defaultIp || interfaceIp

    if (ip) {
      return JSON.stringify({
        ssid: ssid,
        ip: ip,
        port: port
      })
    }

    return null
  }

  try {
    defaultIp = ip.address()
    interfaceIp = ip.address(_interface)

    wifi.getCurrentConnections(function(err, connections) {
      if (err || !interfaceIp || !connections.length || !connections[0].ssid) {
        throw Error(err || 'Error getting ip')
      }

      return callback(null, resolveConnectionString(connections[0].ssid))
    })
  } catch (e) {
    var connectionString = resolveConnectionString();

    if (connectionString) {
      return callback(null, connectionString)
    } else {
      return callback('Error getting ip')
    }
  }
}
