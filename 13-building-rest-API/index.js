const express = require("express");
const users = require("./MOCK_DATA.json"); // sample user data from a json file
const app = express();
const PORT = 8000;

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
app.get("/api/users", (req, res) => {
  res.json(users);
});

// this :id is used as a variable
/*
// GET /api/users/1 - Get the user with ID 1
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})


// PATCH /api/users/1 - Edit the user with ID 1
app.patch('/api/users:id', (req,res) => {
    // TODO: edit the user with id 
    return res.json({status:'pending'})
})


// DELETE /api/users/1 - Delete the user with ID 1
app.delete('/api/users:id', (req,res) => {
    // TODO: delete the user with id 
    return res.json({status:'pending'})
})
*/

app.route('/api/users:id')
.get((req,res)=>{
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})
.patch((req, res)=>{
     // TODO: edit the user with id 
     return res.json({status:'pending'})
})
.delete((req, res)=>{
    // TODO: delete the user with id 
    return res.json({status:'pending'})
})

app.listen(PORT, () => {
  console.log(`Server started at port 127.0.0.1:${PORT}`);
});
