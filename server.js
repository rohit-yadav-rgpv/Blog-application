const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();

//rest objecct
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.use(express.static(path.resolve(__dirname, "client", "build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(1000, () => {
  console.log("Server Started");
});
