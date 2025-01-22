const express = require("express");
const config = require("const");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); //get ve put degerlerini okumasını saglar json

const PORT = process.env.PORT || 8000;

require("./connection");
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/url", require("./routes/UrlRoute"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
