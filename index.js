// Modules
var express = require('express');
var app = express();

var port =  process.env.PORT || 80;//443;

// ////////////
// Environments
// ////////////

// ///////////////////
// Serve Request Files
// ///////////////////
app.use(express.static('public'));

app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(__dirname + '/public/index.html')
});

app.post('/', function (req, res) {
  //res.send('Hello World!');
  res.sendFile(__dirname + '/public/index.html')
});


// routes ==================================================

var server = app.listen(port, function(){
    console.log('listening on *:' + port);
})

// start app
exports = module.exports = app;
