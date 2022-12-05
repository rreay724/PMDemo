const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const personsRoute = require("./routes/persons");
const billetsRoute = require("./routes/billets");

dotenv.config();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to mongoose"))
  .catch((err) => console.log(err));

app.use("/api/person", personsRoute);
app.use("/api/billet", billetsRoute);

app.listen("4000", () => {
  console.log("Server is running on port 4000");
});
