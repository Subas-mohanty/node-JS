const express = require("express");
const fs = require("fs")
const users = require("./MOCK_DATA.json"); // sample user data from a json file
const app = express();
const PORT = 8000;

// to accept form data
app.use(express.urlencoded({extended: "false"}));

// routes
app.get("/users", (req, res) => {
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
