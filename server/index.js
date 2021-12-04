const path = require('path');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const controller = require ('./controller.js')

//add cookies to login 1 day - saturday

//add make it so voice recorder records to mp3 file which gets converted to wav 2 days

//finish up presentation
//finish resume - do this tonight
//finish cover letter - 1 day - do this on wednesday


const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});
  
  app.use(cors());
  
  app.listen(4000);

  app.post('/signup', controller.signUp)

  app.post('/login', controller.login)

  app.post('/newMessage', controller.newMessage)

  app.post('/newChat', controller.newChat)