const express = require("express");
require("./DB/mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./Routes/user");
const taskRouter = require("./Routes/task");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
app.use(taskRouter);

const port = 3000;

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});
