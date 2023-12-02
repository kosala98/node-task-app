const express = require("express");
const router = express.Router();
const User = require("../Models/user");

// create user login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.send(user);
  } catch (error) {
    res.status(401).send();
  }
});

//create users
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all users using .find() method
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get specfic user by using ID
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update user
router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).send();
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

//delete user
router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      return res.status(404).send();
    }
    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
