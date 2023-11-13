const http=require("http");

const portName=8000;
const hostName="127.0.0.1";
const server = http.createServer((req,res)=>{
    // res.writeHead(200,{"contect-type":"text/html"});
    res.end("Hello buddy, Have a great day !!");
})
server.listen(portName,hostName,()=>{
    console.log(`server started on http://${hostName}:${portName}`);
})