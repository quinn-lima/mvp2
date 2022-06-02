const path = require('path');
//const express = require('express') 
import * as express from 'express';
const cors = require('cors');
const bodyParser = require('body-parser')
const controller = require ('./controller.ts')



const app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get('/*', function(req: express.Request, res: express.Response) {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'), function(err: any) : void{
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