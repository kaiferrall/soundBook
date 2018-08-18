const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request-promise");
const keys = require("./config/keys");
const db = keys.database.dbURI;
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });
//App
const app = express();
const port = 5000;
//Load in user, profile, post routes
const users = require("./routes/users");
const profiles = require("./routes/profiles");
const posts = require("./routes/posts");
const searches = require("./routes/searches");
const threads = require("./routes/threads");
const albums = require("./routes/albums");
const artists = require("./routes/artists");
//Tools for getting and storing the auth token
const client_id = keys.spotify.client_id;
const client_secret = keys.spotify.client_secret;
const Auth = require("./models/AuthToken");
const getAuthToken = require("./authorization");
//Connect to MLab database
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected."))
  .catch(err => console.log(err));

//Static files
app.use("/avatars", express.static("uploads"));
//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization"
  );
  next();
});

//Passport Middleware
app.use(passport.initialize());
//Configure the Jwt Strategy
require("./config/passport")(passport);

app.get("/", (req, res) => {
  res.json("home");
});
//User routes
app.use("/api/users", users);
app.use("/api/profiles", profiles);
app.use("/api/posts", posts);
app.use("/api/searches", searches);
app.use("/api/threads", threads);
app.use("/api/albums", albums);
app.use("/api/artists", artists);

//This runs the function to store the access token in the database
//And then runs every hour after this
getAuthToken();
setInterval(getAuthToken, 3500 * 1000);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
