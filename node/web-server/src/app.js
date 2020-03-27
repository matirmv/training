const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

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
        creator: "Matthias FERRAINA",
        info: "Try to get a city weather !"
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404 not found",
        errorMessage: "Help article not found",
        creator: "Matthias FERRAINA"
    });
});
app.get("/weather", (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "please provide an address"
        });
    }

    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastRes) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({ location, ...forecastRes });
        });
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404 not found",
        errorMessage: "Page not found",
        creator: "Matthias FERRAINA"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000.");
});