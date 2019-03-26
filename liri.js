// require .env *AT THE TOP*
require("dotenv").config();

// require keys.js
var keys = require("./keys.js");

// require spotify, axios, moment, inquirer, fs (to access random.txt text)
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");
var moment = require("moment");
var fs = require("fs");
var axios = require("axios");
// cool title packages...
var figlet = require('figlet');
const chalkAnimation = require('chalk-animation');

// access spotify keys info
var spotify = new Spotify(keys.spotify)
// console.log(keys.spotify)

var command;
var params;

// cool title
function title() {
    figlet('LIRI', function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        // console.log(chalkAnimation.pulse(data));

        const rainbow = chalkAnimation.rainbow(data); // Animation starts

        setTimeout(() => {
            rainbow.stop(); // Animation stops
        }, 1000);

        setTimeout(() => {
            rainbow.start(); // Animation resumes
        }, 2000);
    });
}
// user command choice
function inquiry() {
    // var result = await title();
    // console.log(result);
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is your command?",
                name: "command"
            },
            {
                type: "input",
                message: "Please provide the artist, song, or movie you wish to see:",
                name: "desiredData"
            }
        ])
        .then(function (inquirerResponse) {
            App(inquirerResponse.command, inquirerResponse.desiredData);
        });
}
// BANDS IN TOWN 
function getMyBand(artists) {
    var queryURL = 'https://rest.bandsintown.com/artists/' + artists + '/events?app_id=codingbootcamp';
    axios.get(queryURL)
        .then(function (response) {
            // console.log("Upcoming concerts for: ", artists);
            // console.log("Drake data: ", response);
            for (let i = 0; i < response.data.length; i++) {
                var show = response.data[i];
                console.log("Name: ", show.venue.name);
                console.log("Location: ", show.venue.city || show.venue.region || show.venue.country);
                console.log("Date: ", moment(show.datetime, "YYYY-MM-DD").format("MM/DD/YYYY"));
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// getMyBand("Drake");

//  SPOTIFY
function getSpotify(song) {
    spotify
        .search({
            type: 'track', query: song
        })
        .then(function (response) {
            // console.log("My song: ", song, "and data: ", response);
            console.log("Name: ", response.tracks.items[0].name);
            console.log("Artist(s): ", response.tracks.items[0].album.artists[0].name);
            // the preview URL was null for some songs, so I made another option just in case
            console.log("Preview Link: ", response.tracks.items[0].preview_url || response.tracks.items[0].external_urls.spotify);
            console.log("Album: ", response.tracks.items[0].album.name);
        })
        .catch(function (err) {
            console.log(err);
        });
}

// getSpotify("In My Feelings");

// OMDB
function getMyMovie(movie) {
    var queryURL = 'https://www.omdbapi.com/?t=' + movie + '&apikey=trilogy';
    // console.log("this is the url: ", queryURL1);
    axios.get(queryURL)
        .then(function (response) {
            // console.log(response.data);
            var movieD = response.data;
            console.log("Name: ", response.data.Title);
            console.log("Year: ", movieD.Year);
            console.log("IMDB Rating: ", movieD.Ratings[0].Value);
            console.log("IMDB Rating: ", movieD.Ratings[1].Value);
            console.log("Country: ", movieD.Country);
            console.log("Language: ", movieD.Language);
            console.log("Plot: ", movieD.Plot);
            console.log("Actors: ", movieD.Actors);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// getMyMovie("Moonlight");

function App(command, desiredData) {
    // console.log("User input: ", command, desiredData)
    // check for user command & run that function based on user input
    switch (command) {
        case "concert-this":
            if (desiredData === "") {
                console.log("This is the default: ")
                getMyBand("Passion Pit");
            } else {
                // console.log("user chose concert");
                getMyBand(desiredData);
            }
            break;
        case "spotify-this-song":
            if (desiredData === "") {
                // this option got me the wrong song, but at least it's something!
                getSpotify("The Sign");
            } else {
                // console.log("user chose song");
                getSpotify(desiredData);
            }
            break;
        case "movie-this":
            if (desiredData === "") {
                getMyMovie("Mr.Nobody");
            } else {
                // console.log("user chose movie");
                getMyMovie(desiredData);
            }
            break;
        case "do-what-it-says":
            // console.log("do it!");
            fs.readFile("random.txt", "utf8", function (err, data) {
                if (err) throw err;
                const dataArray = data.split(",");
                for (let i = 0; i < dataArray.length; i++) {
                    command = dataArray[i]; i++;
                    params = dataArray[i];
                };
                App(command, params);
            });
            console.log()
            break;
        default:
            console.log("This is the default");
    }
}

title();

setTimeout(inquiry, 1000);