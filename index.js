const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

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

// ======= update
app.get("/chat/:id/edit", async (req, res) => {
  let { id } = req.params;
  let editChat = await Chat.findById(id);
  res.render("update.ejs", { editChat });
});

app.put("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: editedmsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(id, { msg: editedmsg });
  res.redirect("/chat");
});

// ======== delete
app.delete("/chat/:id", async (req, res) => {
  let { id } = req.params;
  let deleteChat = await Chat.findByIdAndDelete(id);
  res.redirect("/chat");
});

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
