var concatTypedArrays = function(a, b) { // a, b TypedArray of same type
  var c = new (a.constructor)(a.length + b.length)
  c.set(a, 0)
  c.set(b, a.length)
  return c
}

// todo: make it build the packet independent of the sequence in which the packets arrive
var bitpack = function(packet, frame) {
  console.log('bitpack', packet, frame)
  var index = frame[1]
  var count = frame[2]
  var size = frame[3]

  if (index == 0) {
    packet = new Uint8Array()
  }

  var ab = new Uint8Array(frame).buffer
  var chunk = new Buffer(ab, 4, size)

  return {
    type: frame[0],
    packet: concatTypedArrays(packet, chunk),
    complete: index == count - 1
  }
}

var test = function() {
  var packet = new Uint8Array();

  var frame1 = new Buffer([0, 0, 2, 18, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 ,12 ,13 ,14 ,15 ,16 ,17, 18])
  var frame2 = new Buffer([0, 1, 2, 14, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32])

  var packetBit = bitpack(packet, frame1)
  console.log(packetBit)
  console.log(bitpack(packetBit.packet, frame2))
}

module.exports = bitpack
