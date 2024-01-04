const mongoose = require("mongoose");

// this function only connects node js with mongoDB
async function connectMongoDb(url){
    return mongoose.connect(url);
}
module.exports ={
    connectMongoDb,
}