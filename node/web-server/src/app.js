const path = require("path");

const express = require("express");
const hbs = require("hbs");
const app = express();

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        creator: "Matthias FERRAINA"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        creator: "Matthias FERRAINA"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help for you",
        info: "Try to get a city weather !"
    });
});

app.get("/weather", (req, res) => {
    res.send("weather page");
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});