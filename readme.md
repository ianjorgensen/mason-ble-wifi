# Setup image

Set image to read write
`
sudo ./bin/rw_root.sh
`

Modify /etc/apt/sources.list set to:
`
deb http://ftp.dk.debian.org/debian/ jessie main contrib non-free
`

Install nodejs 6.x
`
sudo curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
`

Install bleno. Flow instructions. https://github.com/sandeepmistry/bleno

Install lil-pids.
Starts and watches the ble service

`
npm install -g lil-pids
`
