const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  const log = `${Date.now()}: ${req.method} ${req.url} New request received\n`;

  const myPath = url.parse(req.url, true);

  fs.appendFile("./log.txt", log, (err, result) => {
    switch (myPath.pathname) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        const usrName = myPath.query.username;
        res.end(`Hi ${usrName}`);
        break;
      case "/contact":
        res.end("You can't contact me , i am anonymous");
        break;
      case "/search":
        const search = myPath.query.search_query;
        res.end("Here are your results for " + search);
        break;
      case "/signup":
        if(req.method === "GET"){
          res.end("This is the data we get from our server")
        }
        else if(req.method === "POST"){
          // we will perform the DB query
          res.end("Data submitted successfully");
        }
        break;
      default:
        res.end("404 Not found");
    }
  });
});

myServer.listen(8000, () => console.log("server started"));