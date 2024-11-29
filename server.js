// console.log(express)
const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
app.get("/", (req, res) => {
  res.send("ok");
});

app.get("/books", (req, res) => {
  console.log(req.query);
  res.json(JSON.parse(fs.readFileSync("./model/books.json")));
});
app.get("/books/:id", (req, res) => {
  const { id } = req.params;
  res.json(
    JSON.parse(fs.readFileSync("./model/books.json")).find(
      (value) => value.id === +id
    )
  );
});

app.post("/books", (req, res) => {
  // console.log(req.body);
  const { name } = req.body;
  let data = JSON.parse(fs.readFileSync("./model/books.json"));
  data = [...data, { id: data[data.length - 1]?.id + 1 || 0, name }];
  fs.writeFileSync("./model/books.json", JSON.stringify(data, null, 4));
  res.send("ok");
});

app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let data = JSON.parse(fs.readFileSync("./model/books.json"));
  const findBook = data.find((value) => value.id === +id);
  findBook.name = name ? name : findBook.name;
  fs.writeFileSync("./model/books.json", JSON.stringify(data, null, 4));

  res.send("PUT");
});
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;
  let data = JSON.parse(fs.readFileSync("./model/books.json"));
  data = data.filter((value) => value.id !== +id);
  fs.writeFileSync("./model/books.json", JSON.stringify(data, null, 4));
  res.send("DELETE");
});
app.listen(6060, console.log("6060"));
