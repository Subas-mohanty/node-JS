// const http = require("http"); // express internally uses http so we don't need it directly

// https://expressjs.com/en/starter/hello-world.html

const express = require("express");

// this is internally a handler function
const app = express();

// this is for get method on root
// DEFAULT: app.METHOD(PATH, HANDLER)
app.get("/", (req, res) => {
  return res.end("hello i am created using express and from HOMEPAGE")
});
// express internally handles query parameter as well
app.get("/about", (req, res) => {
  return res.end(`Hello ${req.query.username} you are ${req.query.age} years old`);
});

// function myHandler(req, res){
//   switch (req.url) {
//     case "/":
//       res.end("HomePage");
//       break;
//     case "/about":
//       res.end(`Hi I am subas mohanty`);
//       break;
//     case "/contact":
//       res.end("You can't contact me , i am anonymous");
//       break;
//     case "/search":
//       res.end("Here are your results for search");
//       break;
//     case "/signup":
//       if(req.method === "GET"){
//         res.end("This is the data we get from our server")
//       }
//       else if(req.method === "POST"){
//         // we will perform the DB query
//         res.end("Data submitted successfully");
//       }
//       break;
//     default:
//       res.end("404 Not found");
//   }
// }


// we can avoid this by using express
// const myServer = http.createServer(app);
// myServer.listen(8000, () => console.log("server started"));

app.listen(8000, ()=>{
  console.log("Server started");
})