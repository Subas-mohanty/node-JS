const os=require("os");
const fs=require("fs");

console.log(os.cpus().length); // No. of core the cpu has

// sync... blocking. Blocking means it will block the exeucution of below codes. It is not good, we have to avoid it

// console.log(1);
// const result=fs.readFileSync("./random2.txt","utf-8");
// console.log(result);
// fs.writeFileSync('./this.txt', "i am blocking");
// fs.unlinkSync('./this.txt');
// console.log(2);

// Async... non-blocking. It is better than sync
console.log(1);
fs.readFile("./random2.txt","utf-8",(err,result)=>{
    console.log(result);
})
console.log(2);

// Default thread pool size = 4
// Maximum can be the number of core of the cpu