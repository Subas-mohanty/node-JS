const mongoose = require("mongoose");

// created a new schema
const urlSchema = new mongoose.Schema({
    shortId:{
        type: String,
        required: true, 
        unique: true
    },
    redirectURL:{
        type: String, 
        require: true
    },
    visitHistory:[{timestamp: {type: Number}}]
}, {timestamps: true});
 

// created the actual model
const URL = mongoose.model("url", urlSchema);

module.exports = URL;