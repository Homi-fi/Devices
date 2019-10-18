const { Board, Led, Relay , Servo} = require("johnny-five")
const board = new Board({ port: "/dev/ttyUSB0" })
const db = require('./config/db')

board.on("ready", function () {
    let relay = new Relay(10);
    const servo = new Servo({
        pin: 8,
        startAt: 90,
        fps : 1000,
        center : true
    });
    // relay.on()

    db.collection("lamp")
        .where("lampu", "==", 1)
        .onSnapshot((data) => {
            // let sensor = []
            // let status = data[0].data().status
            let obj = {}
            data.forEach((doc) => {
                obj = {
                    id: doc.id,
                    status: doc.data().status
                }
            })
            console.log("==========")
            console.log(obj.status)
            if (obj.status) {
                relay.off()
            }
            else {
                relay.on()
            }
            // console.log(status)

            // console.log(sensor)
        })
    this.repl.inject({
        relay: relay
    });
    db.collection("door")
        .where("door", "==", 1)
        .onSnapshot((data) => {
            let obj = {}
            data.forEach((doc) => {
                obj = {
                    id: doc.id,
                    status: doc.data().status
                }
            })
            console.log(obj)
            if(obj.status){
                servo.to(180)
            }
            else { 
                servo.to(90)
            }
        })
})

