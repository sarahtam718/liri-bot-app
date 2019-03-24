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
console.log(keys.spotify)

// cool title
figlet('LiRi Node App', function (err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
});

// user command choice
// * `concert-this`

//     * `spotify-this-song`

//     * `movie-this`

//     * `do-what-it-says`

// check for user command (if-else or switch) - 4 options, run your own function to pull data

// BANDS in TOWN function
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

// function getSpotify(song) {
//     spotify
//         .search({ type: 'track', query: song })
//         .then(function (response) {
//             console.log("My song: ", response.data);
//         })
//         .catch(function (err) {
//             console.log(err);
//         });
// }


spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, response) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(response);
});

// getSpotify("Happy");