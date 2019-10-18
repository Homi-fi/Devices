const db = require('./config/db')
const five = require("johnny-five")
const arduino = new five.Board
// const SerialPort = require('serialport').SerialPort
// const port = new SerialPort("/dev/ttyUSB0")

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort("/dev/ttyUSB0", { baudRate: 9600 })
const parser = new Readline()
port.pipe(parser)

parser.on('data', line => console.log(`> ${line}`))

port.write("f",(err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("berhasil")
    }
})
// var SerialPort = require("serialport").SerialPort;
// var serialport = new SerialPort("/dev/tty.usbmodem1421");
// serialport.on('open', function(){
    //   console.log('Serial Port Opend');
    //   serialport.on('data', function(data){
//       console.log(data[0]);
//   });
// });

// db.collection("sensor")
// .onSnapshot((data) => {
//     let sensor = []
//         data.forEach((doc) => {
//             let obj = {
//                 id: doc.id,
//                 temperature: doc.data().temperature,
//                 humidity: doc.data().humidity
//             }
//             console.log('jalank query snapshot')
//             port.write("1")
//             // port.on('data', ()=>{
//             //     console.log("serial port open")
//             //     port.on('data',(ob)=>{
//             //         console.log(data)
//             //     })
//             // })
//             // sensor.push(obj)
//         })
//         console.log(sensor)
//     })
