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
    let light = sensor[0] < 100 ? true : false
    let humidity = Math.floor(Number(sensor[1]))
    let temperature = Math.floor(Number(sensor[2]))
    // console.log(sensor[0])
    
    console.log("gg")
    console.log(light)
    console.log(humidity)
    console.log(temperature)
    coy()
})
function coy(){
    console.log("coy")
}
