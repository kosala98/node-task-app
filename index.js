const express = require("express");
require("./DB/mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./Routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);

const port = 3000;

app.listen(3000, () => {
  console.log("Server is listening on port " + port);
});
