const { Board, Led, Relay, Servo } = require("johnny-five")
const board = new Board({ port: "/dev/ttyUSB0" })

board.on("ready", function() {
  const relay = new Relay(4);

  // Control the relay in real time
  // from the REPL by typing commands, eg.
  //
//   relay.on();
  //
  relay.on();
  //
//   this.repl.inject({
//     relay: relay
//   });
});
