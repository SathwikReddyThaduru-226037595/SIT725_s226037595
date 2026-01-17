const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const userRoutes = require("./routes/userRoutes");

const app = express();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Static files */
app.use(express.static("public"));

/* View */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

/* Routes */
app.use("/users", userRoutes);

/* MongoDB */
mongoose
  .connect("mongodb://localhost:27017/sit725_mvc")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

/* Server */
app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
