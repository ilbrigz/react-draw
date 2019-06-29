const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const http = require("http");

dotenv.config();

const routes = require("./routes");

const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => console.log("db connected"));

mongoose.connection.on("error", err =>
  console.log("db connection error " + err.message)
);

const server = app.listen(port, function() {
  console.log("Express server listening on port " + port);
});

app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes);

app.get("/", (req, res, next) => res.send("my backend api"));

app.use("/*", (req, res, next) =>
  res.status(500).json({ error: "endpoint does not exist" })
);
