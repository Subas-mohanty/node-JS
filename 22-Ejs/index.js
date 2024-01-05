// all required modules
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const router = require("./routes/url");
const { connectMongoDb } = require("./connection");
const staticRoute = require("./routes/staticRoute");
const URL = require("./models/url");
const PORT = 8000;

// initializing the express app
const app = express();
// connecting with mongodb
connectMongoDb("mongodb://127.0.0.1:27017/short-URL").then(() => {
  console.log("Mongodb connected...");
});
// tell express js which type of view engine(file) we are using
app.set("view engine", "ejs");
// telling express where the ejs files are present
app.set("views", path.resolve("./views"));


// middleware to parse json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// for handling routes
app.use("/", router);
app.use("/", staticRoute);

// this is how we can send ui or html pages dynamically from the server. It is called server side rendering
// but this is not the efficient way to do it for that we will need something called EJs
// app.get("/api/test", (req, res)=>{
//   res.send(
//     `
//       <html>
//         <head>
//         </head>
//         <body>
//           <h1>Hello from server</h1>
//         </body>
//       </html>
//     `
//   )
// })

app.get("/api/test", async (req, res)=>{
  const allUrls = await URL.find({});
  res.render("home", {
    urls: allUrls,
  });
})
app.listen(PORT, () => {
  console.log(`Server started at http://127.0.0.1:${PORT}`);
});
