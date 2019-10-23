const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort("/dev/ttyUSB1", { baudRate: 9600 })
const db = require('./config/db')
const parser = new Readline()

port.pipe(parser)

parser.on('data', line => {
    // console.log(line.split(',')
    let sensor = line.split(',')

    // let light = sensor[0] < 100 ? true : false
    let light = sensor[0] < 300 ? true : false
    let humidity = Math.floor(Number(sensor[1]))
    let temperature = Math.floor(Number(sensor[2]))
    let bell = sensor[3] == 1 ? true : false

    console.log(`${light} >><< ${sensor[0]}`)
    console.log(humidity)
    console.log(temperature)
    console.log(bell)

    db.collection("lamps")
        .get()
        .then(data => {

            data.forEach(doc => {
                const id = doc.id
                // console.log(id)
                // console.log(doc.data())
                // console.log("================")

                const { day, dayAuto, night, status, nightAuto } = doc.data()

                if (day && light) {
                    if (dayAuto && status) {
                        console.log("do nothing") 
                        // db.collection("lamps").doc("zxkQKGrgpnOIPIfIhRg8")
                        // .update({status})
                    }
                    else if (dayAuto && !status) {
                        db.collection("lamps")
                            .doc(id)
                            .update({ status: true })
                            .then(() => console.log("update status jadi true dan nyala"))
                            .catch(err => console.log(err.Message))
                    }
                    else if (!dayAuto && status) {
                        db.collection("lamps")
                            .doc(id)
                            .update({ status: false })
                            .then(() => console.log("update status jadi false dan dayAuto false"))
                            .catch(err => console.log(err.Message))
                    }

                }
                if (night && !light) {
                    if (nightAuto && status) {
                        console.log("do nothing ketika night auto true dan status true")
                    }
                    else if (nightAuto && !status) {
                        db.collection("lamps")
                            .doc(id)
                            .update({ status: true })
                            .then(() => console.log("update status jadi true dan nyala ketika nightauto true"))
                            .catch(err => console.log(err.Message))
                    }
                    else if (!nightAuto && status) {
                        db.collection("lamps")
                            .doc(id)
                            .update({ status: false })
                            .then(() => console.log("update status jadi false dan ketika nightAuto false"))
                            .catch(err => console.log(err.Message))
                    }
                }
            })
        })

    db.collection("sensors").doc("CzVPfgmXxewojSG5j0WY")
        .update({ light, humidity, temperature, bell })
        .then(() => {
            console.log('update berhasil')
        })
        .catch(err => {
            console.log(err.Message)
        })
})
