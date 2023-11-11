const express = require("express");
const router = express.Router();
const Task = require("../Models/task");

router.post("/tasks", async (req, res) => {
  const task = new Task({
    description: "Test Description",
    completed: false,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
