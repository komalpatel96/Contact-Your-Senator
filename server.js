var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var methodOverride = require("method-override");

var app = express(); 

var PORT = process.env.PORT || 3000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// Serve static content for the app from the 'public' directory
app.use("/public", express.static(__dirname + '/public'));
app.use("/scripts", express.static(__dirname + '/scripts'));


// Override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

// require('./App/routing/apiRoutes.js')(app); 
require('./routes/htmlRoutes.js')(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});