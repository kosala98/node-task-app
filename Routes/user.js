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
    res.statusCode(201).send(user);
  } catch (error) {
    res.statusCode(400).send(error);
  }
});

module.exports = router;
