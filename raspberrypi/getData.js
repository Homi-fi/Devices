const { Board, Relay } = require("johnny-five")
const board = new Board({ port: "/dev/ttyUSB0" })
const db = require('./config/db')


board.on("ready", function () {
    const lampRelay1 = new Relay(10);
    const lampRelay2 = new Relay(7)
    const doorRelay = new Relay(4)


    // db.collection("lamps")
    // .doc("zxkQKGrgpnOIPIfIhRg8")
    //     .onSnapshot((lamps) => {

    //         console.log(lamps.data())

    //         let {status} = lamps.data()

    //         if (status) {
    //             lampRelay1.off() // lampu menyala ketika status true
    //         }
    //         else {
    //             lampRelay1.on() // lampu mati ketika status false
    //         }
    //     })

    db.collection("lamps")
        .onSnapshot((data) => {    
            data.forEach((doc)=>{
                
                // console.log(doc.data())
                const {status,name} = doc.data()
                if(name==="Lamp 1"){
                    if (status){
                        lampRelay1.off()
                        console.log("lampu 1 nyala")
                    }
                    else{
                        lampRelay1.on()
                        console.log("lampu 1 mati")
                    }
                    // console.log("lampu 1 ny")
                }
                else{
                    if (status){
                        lampRelay2.off()
                        console.log("lampu 2 nyala")
                    }
                    else{
                        lampRelay2.on()
                        console.log("lampu 2 mati")
                    }
                    // status ? lampRelay2.off() : lampRelay2.on()
                }
            })
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
        lampRelay1,
        lampRelay2,
        doorRelay
    });
})

