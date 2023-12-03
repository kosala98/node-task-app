const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const { request, response } = require("express");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "mysectrt12345");

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.send = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "Please Auth" });
  }
};

module.exports = auth;
