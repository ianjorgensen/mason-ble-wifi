module.exports = function(ssid, password) {
  var exec = require('child_process').exec
  var child = exec("sudo sh ~/bin/connect_wireless.sh " + ssid + ' ' + password, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout)
    console.log('stderr: ' + stderr)
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  })
}
