// https://expressjs.com/en/guide/using-middleware.html
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

// connecting database with node js
mongoose.connect("mongodb://127.0.0.1:27017/first-mongo-app").then(()=> console.log("Mongoose connected")).catch(err=>console.log("Mongoose Error", err));

// building schema in mongodb
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

// this is the model
const users = mongoose.model("users", userSchema);

// to accept form data, it's a middleware, will learn about it in next video
// if request header is 'application/x-www-form-urlencoded' then it parse it and store it in req.body otherwise it simply calls the next function
/**
 * Returns middleware that only parses urlencoded bodies and only looks at requests
 * where the Content-Type header matches the type option
 */
app.use(
  express.urlencoded({ extended: "false" })
);

app.use((req, res, next) => {
  req.myName = "subas";
  next();
});

app.use((req, res, next) => {

  fs.appendFile(
    "./log.txt",
    `\n${Date.now()} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// routes
app.get("/users", async (req, res) => {
  const dbUsers= await users.find({})
  res.status(200).json(dbUsers);
});

// REST API
app
  .route("/api/users")
  .get(async (req, res) => {
    res.setHeader("X-myName", "subas"); 
    const dbUsers= await users.find({})
    return res.status(200).json(dbUsers);
  })
  .post(async (req, res) => {
    const body = req.body;
    // console.log(body);

    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.gender ||
      !body.email ||
      !body.job_title
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result= await users.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title
    });

    return res.status(201).json({msg: "successfully created a user"});
  });

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    // get the id
    const id = Number(req.params.id);
    const user = await users.findById(req.params.id);
    if(!user){
      return res.status(404).json({"message":"Hum pe to hai hi naw"});
    }
    return res.json(user);
  })
  .patch( async (req, res) => {
    const user = await users.findByIdAndUpdate(req.params.id, {lastName: "changed"});
    return res.json({msg: "modified successfully"});

  })
  .delete( async (req, res) => {
    const user = await users.findByIdAndDelete(req.params.id);
    return res.json(`${req.params.id} deleted`);
  });

app.listen(PORT, () => {
  console.log(`Server started at port 127.0.0.1:${PORT}`);
});
