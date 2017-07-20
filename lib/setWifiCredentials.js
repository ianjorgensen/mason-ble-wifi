module.exports = function(ssid, password) {
  var spawn = require('child_process').spawn
  var child = spawn("./bin/connect_wireless.sh", [ssid,password], {cwd: '/home/smb', stdio: 'inherit'})

  child.on('exit', function(code) {

        if(code) {
                console.log('Error code:',code)
        } else {
                console.log('Script succeded')
        }
  })
}
