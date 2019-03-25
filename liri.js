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
// cool title package...
var figlet = require('figlet');

// access spotify keys info
var spotify = new Spotify(keys.spotify)
// console.log(keys.spotify)

// cool title
// figlet('LiRi Node App', function (err, data) {
//     if (err) {
//         console.log('Something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.log(data)
// });

// user command choice
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
        // console.log("User input: ", inquirerResponse.command, inquirerResponse.desiredData)
        // check for user command & run that function based on user input
        switch (inquirerResponse.command) {
            case "concert-this":
                console.log("user chose concert");
                getMyBand(inquirerResponse.desiredData);
                break;
            case "spotify-this-song":
                console.log("user chose song");
                break;
            case "movie-this":
                console.log("user chose movie");
                break;
            case "do-what-it-says":
                console.log("do it!");
                break;
            default:
                console.log("this is the default")
        }
    });

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
            type: 'track', query: 'song'
        })
        .then(function (response) {
            console.log("My song: ", song, "and data: ", response);
            // not fetching data in a useful way...
            // artist(s)
            // song name
            // preview link of song
            // album
        })
        .catch(function (err) {
            console.log(err);
        });
}

// getSpotify("Happy");

// OMDB
function getMyMovie(movie) {
    var queryURL1 = 'https://www.omdbapi.com/?t=' + movie + '&apikey=trilogy';
    axios.get(queryURL1)
        .then(function (response) {
            // console.log(response.data);
            for (let j = 0; j < response.data.length; j++) {
                // for some reason, not reading my for loop...
                var movieD = response.data[j];
                console.log("Name: ", movieD["Title"]);
                console.log("Year: ", movieD.Year);
                console.log("IMDB Rating: ", movieD.Ratings[0].Value);
                console.log("IMDB Rating: ", movieD.Ratings[1].Value);
                console.log("Country: ", movieD.Country);
                console.log("Language: ", movieD.Language);
                console.log("Plot: ", movieD.Plot);
                console.log("Actors: ", movieD.Actors);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// getMyMovie("Jaws");