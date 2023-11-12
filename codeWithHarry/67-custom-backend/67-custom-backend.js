const http = require("http"); // require/import the modules
const fs = require("fs");

// read/get the html files which we will show in the web page
const home = fs.readFileSync("./index.html", "utf-8");
const about = fs.readFileSync("./about.html", "utf-8");
const course = fs.readFileSync("./course.html", "utf-8");
const contact = fs.readFileSync("./contact.html", "utf-8");

// port and host
const portName = 3000;
const hostName = "127.0.0.1";

const server = http.createServer((req, res) => {

  const url = req.url;
  console.log(url);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html"); // to parse text and html

  // which url we got we will respond according to that
  if (url === "/") {
    res.end(home);
  } else if (url === "/about") {
    res.end(about);
  } else if (url === "/course") {
    res.end(course);
  } else if (url === "/contact") {
    res.end(contact);
  } else {
    res.statusCode = 404;
    res.end("<h1>404 not found</h1>");
  }
});

server.listen(portName, hostName, () => {
  console.log(`server started at http://${hostName}:${portName}`);
});
