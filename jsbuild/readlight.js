

async function  gg(){

    try{
        const light = await require('./dht.js')
        console.log(light)
    }
    catch(error){
        console.log(error)
    }
} 
gg()

