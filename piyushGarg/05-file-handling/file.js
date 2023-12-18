const fs=require("fs"); // built in module

// create and write to a file

// synchronous... will learn on next lecture

// fs.writeFileSync("./random.txt","hello, i'm created using fs");

// asynchronous... 
// fs.writeFile("./random2.txt","hello, i'm created using fs and am asynchronous",(err)=>{});

// reading a file
// const result=fs.readFileSync("./this.txt","utf-8"); // return the result
// console.log(result);

fs.readFile("./this.txt","utf-8",(err,result)=>{ // take a callback to get error and result
    if(err){
        console.log(err);
    }
    else{
        console.log(result);
    }
});

// add data, copy and deleting a file
fs.appendFileSync("./this.txt", `${Date.now()} Hey There\n`);

// fs.cpSync("./test.txt", "./copy.txt");

// fs.unlinkSync("./copy.txt"); // delete the file
console.log(fs.statSync("./text.txt"));
fs.mkdirSync("my-docss/a/b", { recursive: true });