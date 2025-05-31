const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

main()
  .then(() => console.log("Connection successfull!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//  index route

app.get("/chat", async (req, res) => {
  let chats = await Chat.find();
  console.log(chats);
  res.send("success!");
});

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
