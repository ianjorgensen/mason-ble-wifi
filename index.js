var setWifiCredentials = function(ssid, password) {
  var sys = require('sys')
  var exec = require('child_process').exec
  var child = exec("sudo sh ~/bin./connect_wireless.sh " + ssid + ' ' + password, function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout)
    sys.print('stderr: ' + stderr)
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })
}

module.exports = {
  getConnectionString: require('./getConnectionString.js'),
  setWifiCredentials: setWifiCredentials('carysta', 'zodcarysta')
}
