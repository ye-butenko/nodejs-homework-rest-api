const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.all("*", (req, res) => {
  res.status(404).json({
    msg: "Oops! Resource not found.",
  });
});

app.use((err, req, res, next) => {
  res.status(err.status ?? 500).json({
    msg: err.message,
  });
});

module.exports = app;
