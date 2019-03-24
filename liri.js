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
var spotify = new Spotify(keys.spotify);

// user command choice
// * `concert-this`

//     * `spotify-this-song`

//     * `movie-this`

//     * `do-what-it-says`

// check for user command (if-else or switch) - 4 options, run your own function to pull data
