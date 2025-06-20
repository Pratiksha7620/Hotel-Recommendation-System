let express = require("express");
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let router = require("../src/routes/regroutes.js");
let app = express();
app.use('/uploads', express.static('uploads'));

// ✅ Ensure 'uploads' folder exists
const fs = require("fs");
const path = require("path");
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up middleware and view engine
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: "11111111fdf",
  resave: false,
  saveUninitialized: false
}));


app.use("/", router);

module.exports = app;
