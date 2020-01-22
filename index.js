const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const teamMembers = require("./members");

const logger = require("./middleware/logger");

const app = express();

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// init middleware
//app.use(logger);

// handlebar middle ware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// home page route
app.get("/", (req, res, next) =>
  res.render("index", {
    title: "Member App",
    teamMembers
  })
);

//Set static folder -> helps you to dinamically recognize the files in your res object
app.use(express.static(path.join(__dirname, "public")));

// member api route
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
