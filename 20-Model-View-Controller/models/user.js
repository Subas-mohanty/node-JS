const mongoose = require("mongoose");

// defining the schema for a user in mongodb
const userSchema = new mongoose.Schema({
    firstName:{
      type:String,
      required: true
    },
    lastName:{
      type: String
    },
    email:{
      type: String,
      required: true,
      unique: true
    },
    gender:{
      type: String
    },
    jobTitle: {
      type:String
    }
  });
  
  // this is the actual model
  const users = mongoose.model("users", userSchema);

module.exports = {
    users,
};
  