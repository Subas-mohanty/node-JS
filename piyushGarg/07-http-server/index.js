const http = require("http"); // built in module http to create http server
const fs = require("fs"); // fs to work with file system

// creating our own server using createServer function
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()}: New request received\n`;
  fs.appendFile("./log.txt", log, (err, data) => {
    switch (req.url) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("Hii i am subas mohanty");
        break;
      default:
        res.end("404 not found");
    }
  });
});

// The port we are going to run the server
myServer.listen(8000, () => console.log("server started"));
