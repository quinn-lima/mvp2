const path = require('path');
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser')
const controller = require ('./controller.js')



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