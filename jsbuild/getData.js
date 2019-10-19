const { Board, Led, Relay, Servo } = require("johnny-five")
const board = new Board({ port: "/dev/ttyUSB0" })
const db = require('./config/db')


board.on("ready", function () {
    const lampRelay = new Relay(10);
    const doorRelay = new Relay(4)
    // const servo = new Servo({
    //     pin: 8,
    //     startAt: 90,
    //     fps: 1000,
    //     center: true
    // });
    

    db.collection("rooms")
        .doc("SubCaSYY2gVJSpQtesQG")
        .onSnapshot((rooms) => {
            let light = rooms.data().light

            db.collection("lamps")
                .doc("zxkQKGrgpnOIPIfIhRg8")
                .onSnapshot((lamps) => {

                    let id = lamps.id
                    let obj = lamps.data()
                    console.log(obj)

                    if ((obj.day && light) || obj.status) {
                        lampRelay.off()
                        if (!obj.status) {
                            db.collection("lamps")
                                .doc("zxkQKGrgpnOIPIfIhRg8")
                                .update({ status: true })
                                .then(() => console.log("ubah status ke true"))
                                .catch(err => console.log(err.Message))
                        }
                    }
                    else if ((obj.night && !light) || obj.status) {
                        lampRelay.off()
                        if (!obj.status) {
                            db.collection("lamps")
                                .doc("zxkQKGrgpnOIPIfIhRg8")
                                .update({ status: true })
                                .then(() => console.log("ubah status ke true"))
                                .catch(err => console.log(err.Message))
                        }
                    }
                    else {
                        lampRelay.on()
                        
                    }
                })

                    // console.log("==========")
                    // console.log(obj.status)
                    // if (obj.status) {
                    //     lampRelay.off()
                    // }
                    // else {
                    //     lampRelay.on()
                    // }
                    // // console.log(status)

                    // console.log(sensor)
                })


    
    db.collection("doors")
        .doc("ogwpJEM8Ekn9JiKtYogA")
        .onSnapshot((data) => {
            let obj = data.data()
            // let id = data.id
            // data.forEach((doc) => {
            //     obj = {
            //         id: doc.id,
            //         door: doc.data(),
            //         status: doc.data().status
            //     }
            // })
            console.log(obj)
            if (obj.status) {
                // servo.to(180)
                doorRelay.on()
                // setTimeout(() => {
                //     db.collection("doors").doc("ogwpJEM8Ekn9JiKtYogA")
                //         .update({ status: false })
                //         .then((success) => {
                //             console.log("success")
                //         })
                //         .catch(err => {
                //             console.log(err.Message)
                //         })

                // }, 2000)
            }
            else {
                // servo.to(90)
                doorRelay.off()

            }
        })
        this.repl.inject({
            lampRelay,
            doorRelay
        });
})

