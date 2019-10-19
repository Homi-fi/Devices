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
    console.log(sensor[0])
    let light = sensor[0] < 100 ? true : false
    let humidity = Math.floor(Number(sensor[1]))
    let temperature = Math.floor(Number(sensor[2]))

    // db.collection("rooms").doc("SubCaSYY2gVJSpQtesQG")
    //     .update({ light })
    //     .then(() => {
    //         console.log(`${light}`)
    //     })
    //     .catch(err => {
    //         console.log(err.Message)
    //     })
    // console.log(light)
    // console.log(humidity)
    // console.log(temperature)
    setTimeout(() => {

        // db.collection("rooms")
        //     .doc("SubCaSYY2gVJSpQtesQG")
        //     .onSnapshot((data) => {
        //         if (data.data().light !== light) {
        //             db.collection("rooms")
        //                 .doc("SubCaSYY2gVJSpQtesQG")
        //                 .update({ light })
        //                 .then(() => {
        //                     console.log(`${light}`)
        //                 })
        //                 .catch(err => {
        //                     console.log(err.Message)
        //                 })
        //         }
        //     })

        db.collection("rooms")
            .doc("SubCaSYY2gVJSpQtesQG")
            .update({ light })
            .then(() => {
                console.log(`${light}`)
            })
            .catch(err => {
                console.log(err.Message)
            })

        db.collection("sensors").doc("CzVPfgmXxewojSG5j0WY")
            .update({ humidity, temperature })
            .then(() => {
                // console.log('update berhasil')
            })
            .catch(err => {
                console.log(err.Message)
            })
    }, 1500)
})
