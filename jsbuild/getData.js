const { Board, Relay } = require("johnny-five")
const board = new Board({ port: "/dev/ttyUSB0" })
const db = require('./config/db')


board.on("ready", function () {
    const lampRelay = new Relay(10);
    const doorRelay = new Relay(4)

    db.collection("lamps")
    .doc("zxkQKGrgpnOIPIfIhRg8")
        .onSnapshot((lamps) => {

            console.log(lamps.data())

            let {status} = lamps.data()

            if (status) {
                lampRelay.off() // lampu menyala ketika status true
            }
            else {
                lampRelay.on() // lampu mati ketika status false
            }
        })

    db.collection("doors")
        .doc("ogwpJEM8Ekn9JiKtYogA")
        .onSnapshot((data) => {
            console.log(data.data())
            let {status} = data.data()
            if (status) {
                doorRelay.on() // door relay ngebuka
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
                doorRelay.off() //door ngebuka
            }
        })
    this.repl.inject({
        lampRelay,
        doorRelay
    });
})

