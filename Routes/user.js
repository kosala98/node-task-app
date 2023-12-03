const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const auth = require("../Middleware/auth");

// create user login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    res.status(401).send();
  }
});

// create user log out
router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

//create users
router.post("/users", auth, async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all users using .find() method
router.get("/users", auth, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get specfic user by using ID
router.get("/users/me", auth, async (req, res) => {
  //const _id = req.params.id;
  const _id = req.user._id;

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
router.patch("/users/me", auth, async (req, res) => {
  const _id = req.user._id;

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
router.delete("/users/me", auth, async (req, res) => {
  const _id = req.user._id;
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
