var express = require("express"),
    bodyParser = require("body-parser"),
    hbs = require("hbs"),
    path = require("path"),
    session = require("express-session"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    auth = require("./app/auth/passport-local"),
    routes = require("./app/routes/routes"),
    app = express();


app.use("/static", express.static(path.join(__dirname, "app/client")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "itsAMeMario",
    resave: true,
    saveUninitialized: true
}));

app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "hbs");

auth(passport);
routes(app, passport);

mongoose.connect("mongodb://localhost/blog");
app.listen(8080);
console.log("Blog is Running");
