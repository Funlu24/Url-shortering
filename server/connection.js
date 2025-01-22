const moongose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

moongose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });
module.exports = moongose;
