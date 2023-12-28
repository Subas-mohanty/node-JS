// https://expressjs.com/en/guide/using-middleware.html


const express = require("express");
const fs = require("fs")
const users = require("./MOCK_DATA.json"); // sample user data from a json file
const app = express();
const PORT = 8000;

// to accept form data, it's a middleware, will learn about it in next video
app.use(express.urlencoded({extended: "false"})
// internally it does something like this:-
// req.body = <data after parsing>;
// and the body passed to next middleware and in the end we can use it in the route
);

// custom middleware

app.use((req, res, next)=>{
    console.log("hello from middleware 1")
    // if we make any changes to the req object that will be passed to next middleware or route
    req.myName = "subas";
    // return res.json({msg:"hello buddy, you are blocked to see the users "}) // this will not allow the client to see the result. because this middleware returns from here

    // if we leave it like this it will still not give the results because it will not pass the request to next middleware or route, if any middleware is not present then it calls the route. To do so we use a next function

    next();
});

app.use((req, res, next)=>{
    console.log("hello from middleware 2 and my name is", req.myName)
    
    // we will create a log file as we created while using http 

    fs.appendFile("./log.txt", `\n${Date.now()} : ${req.method} : ${req.path}`, (err, data)=>{
        next();
    })
})

// routes
app.get("/users", (req, res) => {
    console.log("hello man i am", req.myName)
    // creating an html document to show user first name
  const html = `
          <ul>
          ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
          </ul>    
      `;
  res.send(html);
});


// REST API
app.route("/api/users")
.get((req, res)=>{
    return res.json(users);
})
.post((req, res)=>{
    const body = req.body;
    // console.log(body);

    // pushing the new user in the users
    users.push({id: users.length +1, ...body})

    // writting the data into the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json(`${users.length} : created successfully`)
    })
})

app.route('/api/users/:id')
.get((req,res)=>{
    // get the id
    const id = Number(req.params.id)
    // find the user with the id, the find() function returns the value of the first element in the array where predicate is true, and undefined otherwise.
    const user = users.find((user) => user.id === id)
    return res.json(user)
})
.patch((req, res)=>{
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    
    // get the body from the request
    const body = req.body;

    // this gives the index of the user
    users[users.indexOf(user)] = {id, ...body};
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json(`${users.length} : modified successfully`)
    })
})
.delete((req, res)=>{
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id) 
    const userIndex = users.indexOf(user);

    // deletes the user from the index and delete it one time
    users.splice(userIndex, 1);
    
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{
        return res.json(`User with id ${users.length+1} Deleted successfully`)
    })
})

app.listen(PORT, () => {
  console.log(`Server started at port 127.0.0.1:${PORT}`);
});
