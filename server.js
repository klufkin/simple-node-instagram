// GRAB THE PACKAGES/DEPENDENCIES
// ==================================================
// create an express app
const express = require('express');
const app = express();
const instagram = require('instagram-node').instagram(); // the instagram-node package will handle all the calls to the API for us
// Instagram-node saves us from having to append tokens to a URL as well as
// wrap a lot of the API calls needed to make them easier to use. DOCS // https://github.com/totemstech/instagram-node#using-the-api

const creds = require('./insta-creds'); // grab our instagram credentials

// CONFIGURE THE APP
// ==================================================
// tell node where to look for site resources
app.use(express.static(__dirname + '/public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// // configure instagram app with access_token
instagram.use({
    access_token: creds.access_token,
});

// alternatively we can use the client_id and client_secret (note this runs an error on render), may not actually work??
// instagram.use({
//     client_id: creds.client_id,
//     client_secret: creds.client_secret
// });

// create an express route for the home page // http://localhost:8080/
app.get('/', function(request, response) {
    // use the instagram package to make an api call to get popular media
    instagram.user_self_media_recent(function(err, media, pagination, remaining, limit) {
        // console.log(media); // if you want to take a peak at the data
        // render the home page and pass in instagram media
        response.render('pages/index', {
            media: media
        });
    });
});

// start the server on port 8080
app.listen(8080);
// send a message
console.log('Server has started! Go to http://localhost:8080');
