const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 80;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/takeaway-app";
const ENV = process.env.NODE_ENV;

const path = require('path');

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) throw new Error(err);
    else console.log("Connected to DB");
});

console.log(ENV);

const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(require("./routes"))

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => console.log("Listening on PORT: 80"));