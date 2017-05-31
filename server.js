var express = require("express"),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    path = require("path"),
    session = require("express-session"),
    mongoose = require("mongooose"),
    passport = require("passport"),
    auth = require("./blog/auth/auth"),
    routes = require("./blog/routes/routes"),
    app = express();


app.use("/static", express.static(path.join(__dirname, "blog/client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "itsAMeMario",
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "blog/views"));
app.set("view engine", "hbs");

auth(passport);
routes(app, passport);

mongoose.connect("mongodb://localhost/blog");
app.listen(8080);
console.log("Blog is Running");

