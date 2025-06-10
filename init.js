const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => console.log("Connection successfull!"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "hamim",
    to: "laam",
    msg: "Nice b...b.",
    created_at: new Date(),
  },
  {
    from: "laam",
    to: "hamim",
    msg: "thanks for comments",
    created_at: new Date(),
  },
];


Chat.insertMany(allChats);
