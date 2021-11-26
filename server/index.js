const path = require('path');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const controller = require ('./controller.js')

//convert to typescript 1 day - do this on friday
//add hash + salt using crypto 1 day - do this on thursday
//add cookies to login 1 day - saturday
//add make it so voice recorder records to mp3 file which gets converted to wav 2 days
//finish up presentation
//finish resume - do this tonight
//finish cover letter - 1 day - do this on wednesday
//Users.get(username).then(user exists, if not return Users.create({username, password}))
//.then redirect
// add salt to database
// query for salt and run through 
const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
  
  app.use(cors());
  
  app.listen(4000);

  app.post('/signup', controller.signUp)

  app.post('/login', controller.login)

  app.post('/newMessage', controller.newMessage)

  app.post('/newChat', controller.newChat)