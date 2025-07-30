//npm i nongoose - download mongoose

const mongoose = require("mongoose")

const MongoDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.PORT_URL_LOCAL)
        console.log(`connected to MongoDb at ${process.env.PORT_URL_LOCAL}`.bgGreen.white)
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports = MongoDB