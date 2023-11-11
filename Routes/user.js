const express = require("express");
const router = express.Router();
const User = require("../Models/user");

router.post("/users", async (req, res) => {
  const user = new User({
    name: "test",
    email: "test@example.com",
    age: 25,
  });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
