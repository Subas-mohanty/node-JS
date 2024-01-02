const { users } = require("../models/user");

// retrieving all users from the database
async function handleGetUsers(req, res) {
  const dbUsers = await users.find({});
  return res.status(200).json(dbUsers);
}

// retrieving a specified user from the database
async function getUsersByID(req, res) {
  const id = Number(req.params.id);
  const user = await users.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Hum pe to hai hi naw" });
  }
  return res.json(user);
}

// modifying a user data in the database
async function patchUsersByID(req, res) {
  const user = await users.findByIdAndUpdate(req.params.id, {
    lastName: "changed", // only last name is changing
  });
  return res.json({ msg: "modified successfully" });
}
// deleting a user from the database
async function deleteUsersByID(req, res) {
  const user = await users.findByIdAndDelete(req.params.id);
  return res.json(`${req.params.id} deleted`);
}

// creating a new user in the database
async function handleCreateUser(req, res){
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

    const result = await users.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });

    return res.status(201).json({ msg: "successfully created a user" , id: result._id});
}

module.exports = {
  handleGetUsers,
  getUsersByID,
  patchUsersByID,
  deleteUsersByID,
  handleCreateUser
};
