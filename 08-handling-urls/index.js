const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return res.end();
  }
  const log = `${Date.now()}: ${req.url} New request received\n`;

  const myPath = url.parse(req.url, true);
  console.log(myPath);

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
      default:
        res.end("404 Not found");
    }
  });
});

myServer.listen(8000, () => console.log("server started"));
