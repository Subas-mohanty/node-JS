// all required modules
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/url");
const { connectMongoDb } = require("./connection");
const URL = require("./models/url");
const PORT = 8000;

// initializing the express app
const app = express();
// connecting with mongodb
connectMongoDb("mongodb://127.0.0.1:27017/short-URL").then(()=>{
  console.log("Mongodb connected...")
})
// middleware to parse json
app.use(express.json());

// for handling routes
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server started at http://127.0.0.1:${PORT}`);
});
