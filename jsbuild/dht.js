const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort("/dev/ttyUSB1", { baudRate: 9600 })
const db = require('./config/db')


db.collection("sensor").doc("USNkf0ERQiYM5AUPp3WF")
    .update({ humidity: " ", temperature: "" })
    .then((success) => {
        console.log(success)
    })
    .catch(err => {
        console.log(err.Message)
    })

const parser = new Readline()
port.pipe(parser)

parser.on('data', line => {
    // console.log(line.split(',')
    let sensor = line.split(',')
    let light = sensor[0] < 100 ? true : false

    console.log(sensor[0])
    console.log(sensor[1])
    console.log(sensor[2])
    setTimeout(()=>{
        db.collection("sensor").doc("USNkf0ERQiYM5AUPp3WF")
            .update({ light ,humidity: Number(sensor[0]), temperature: Number(sensor[1]) })
            .then((success) => {
                // console.log(success)
                
            })
            .catch(err => {
                console.log(err.Message)
            })

        if(!light){
            db.collection("lamp").doc("krTjlLxFeeXiqPNRioL8")
            .update({status : true})
            .then((success)=>{
                console.log(">>>>>>>>>>>>>>")
                console.log(light)
            })
            .catch(err=>{
                console.log(err.Message)
            })
        }
        else{
            db.collection("lamp").doc("krTjlLxFeeXiqPNRioL8")
            .update({status : false})
            .then(()=>{
                console.log("===========")
                console.log(light)
            })
            .catch(err=>{
                console.log(err.Message)
            })
        }
    },1000)
})
