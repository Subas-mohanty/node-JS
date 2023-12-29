// https://expressjs.com/en/guide/using-middleware.html
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json"); // sample user data from a json file
const app = express();
const PORT = 8000;

// to accept form data, it's a middleware, will learn about it in next video
// if request header is 'application/x-www-form-urlencoded' then it parse it and store it in req.body otherwise it simply calls the next function
/**
 * Returns middleware that only parses urlencoded bodies and only looks at requests
 * where the Content-Type header matches the type option
 */
app.use(
  express.urlencoded({ extended: "false" })
  // internally it does something like this:-
  // req.body = <data after parsing>;
  // and the body passed to next middleware and in the end we can use it in the route
);
// app.use(express.json({extended:"false"})); // for json file

// custom middleware

app.use((req, res, next) => {
  // console.log("hello from middleware 1")
  // if we make any changes to the req object that will be passed to next middleware or route
  req.myName = "subas";
  // return res.json({msg:"hello buddy, you are blocked to see the users "}) // this will not allow the client to see the result. because this middleware returns from here

  // if we leave it like this it will still not give the results because it will not pass the request to next middleware or route, if any middleware is not present then it calls the route. To do so we use a next function

  next();
});

app.use((req, res, next) => {
  // console.log("hello from middleware 2 and my name is", req.myName)

  // we will create a log file as we created while using http

  fs.appendFile(
    "./log.txt",
    `\n${Date.now()} : ${req.method} : ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// routes
app.get("/users", (req, res) => {
  // console.log("hello man i am", req.myName)
  // creating an html document to show user first name
  const html = `
          <ul>
          ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
          </ul>    
      `;
  res.send(html);
});

// REST API
app
  .route("/api/users")
  .get((req, res) => {
    res.setHeader("X-myName", "subas"); // this is a custom header
    // always add X to custom header for good practice
    return res.json(users);
  })
  .post((req, res) => {
    const body = req.body;
    // console.log(body);

    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.gender ||
      !body.email ||
      !body.job_title
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // pushing the new user in the users
    users.push({ id: users.length + 1, ...body });

    // writting the data into the file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.status(201).json(`${users.length} : created successfully`);
      // res.status() sets the status code. 201 is for new user created
    });
  });

app
  .route("/api/users/:id")
  .get((req, res) => {
    // get the id
    const id = Number(req.params.id);
    // find the user with the id, the find() function returns the value of the first element in the array where predicate is true, and undefined otherwise.
    const user = users.find((user) => user.id === id);
    if(!user){
      return res.status(404).json({"message":"Hum pe to hai hi naw"});
    }
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    // get the body from the request
    const body = req.body;

    // this gives the index of the user
    users[users.indexOf(user)] = { id, ...body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json(`${users.length} : modified successfully`);
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    const userIndex = users.indexOf(user);

    // deletes the user from the index and delete it one time
    users.splice(userIndex, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json(`User with id ${users.length + 1} Deleted successfully`);
    });
  });

app.listen(PORT, () => {
  console.log(`Server started at port 127.0.0.1:${PORT}`);
});
