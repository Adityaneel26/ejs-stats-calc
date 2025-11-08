const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { results: null });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});