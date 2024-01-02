// https://expressjs.com/en/guide/using-middleware.html
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const express = require("express");

const { connectMongoDb } = require("./connection");
// const { logReqRes } = require("./middlewares/index");
const { logReqRes } = require("./middlewares"); // by default takes index
const userRouter = require("./routes/user");

// initializing express app
const app = express();
const PORT = 8000;

// connection with mongodb
connectMongoDb("mongodb://127.0.0.1:27017/first-mongo-app").then(() => {
  console.log("Mongoose connected...")
})

// middlewares
app.use(express.urlencoded({ extended: "false" }));
app.use(logReqRes("log.txt"));

// routes
app.use("/api/users/", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at port 127.0.0.1:${PORT}`);
});
