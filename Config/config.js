const mongoose = require("mongoose");
require('dotenv').config();
function connect() {
    var MONGO = process.env.MONGO
   
    try{
        return mongoose.connect(MONGO);

    }catch(err){
        console.log(err.message,"error")
    }
}



module.exports = connect;