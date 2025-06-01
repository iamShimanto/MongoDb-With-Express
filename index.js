const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

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
  res.render("index.ejs", { chats });
});

//  new route

app.get("/chat/new", (req, res) => {
  res.render("new.ejs");
});

// create route

app.post("/chat", (req, res) => {
  let { from, msg, to } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });

  newChat
    .save()
    .then(() => console.log("create successfull"))
    .catch((err) => console.log(err));

  res.redirect("/chat");
});

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
