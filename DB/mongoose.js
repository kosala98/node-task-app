const mongoose = require("mongoose");

const mongoDBURL =
  "mongodb+srv://kosala:12345@cluster0.wph7ess.mongodb.net/mydatabase";

mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});
