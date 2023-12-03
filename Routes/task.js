const express = require("express");
const router = express.Router();
const Task = require("../Models/task");
const auth = require("../Middleware/auth");

//create a task
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all tasks using .find() method
router.get("/tasks/me", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get specfic task by using ID
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById({ _id });

    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

//update task
router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).send();
    }
    res.status(200).send(updatedTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

//delete task
router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedTask = await Task.findByIdAndDelete({
      _id,
      owner: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).send();
    }
    res.status(200).send(deletedTask);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
