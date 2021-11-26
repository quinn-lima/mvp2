const database = require('../database/database.js');
const User = require('./hash/user.js')
//const models = require('./hash/models.js');

module.exports = {
    signUp: (req, res) => {

    let userObj = User.create(req.body.username, req.body.password)
    console.log(userObj)
    
     database.signUp(userObj).then((results) => {

            res.send(200)
  
          }).catch((err) => {
              console.log(err)
          })
  
    },
    
    login: (req, res) => {
        //get salt from database
        database.getSalt(req.body).then((data) => {
            console.log(data.rows[0].salt)
            let salt = data.rows[0].salt

        //create new password with salt from database, then put it into database.login
        let attemptedUser = User.create(req.body.username, req.body.password, salt);
        let attemptedPassword = attemptedUser.password;
        

        database.login(req.body.username, attemptedPassword).then((results) => {

            if (results.rows.length > 0) {
                database.getMessages(results.rows[0].id).then((messages) => {
                    let promises = [];
                    for (let i = 0; i < messages.rows.length; i++) {
                        if (req.body.username === messages.rows[i].username) {
                            promises.push(database.getUsers(messages.rows[i].fromuser))
                        } else {
                            promises.push(new Promise((resolve, reject) => {
                            messages.rows[i].tousername = messages.rows[i].username
                            messages.rows[i].fromusername = req.body.username
                            messages.rows[i].username = messages.rows[i].username
                            messages.rows[i].id = messages.rows[i].touser
                            resolve(false)
                        }))
                        }

                }   
                Promise.all(promises).then((response) => {
                    
                    for (let i = 0; i < messages.rows.length; i++) {
                        if (response[i]) {
                            messages.rows[i].tousername = req.body.username
                            messages.rows[i].fromusername = response[i].rows[0].username
                            messages.rows[i].username = response[i].rows[0].username
                            messages.rows[i].id = messages.rows[i].fromuser
                        }
                    }
                    
                    console.log(messages.rows)
                    res.send({pass: true, id: results.rows[0].id, messages: messages.rows})
                
                })
                })
            } else {
                res.send({pass:false})
            }
             }).catch((err) => {
                 console.log(err)
             })
    })
     
       },

       newMessage: (req, res) => {
        database.checkUser(req.body.toName).then((results) => {
            if (results.rows.length > 0) {
                console.log('yunngg', results)
                req.body.to = results.rows[0].id
                database.postMessage(req.body).then((messages) => {
                    database.getMessages(req.body.from).then((messages) => {
                        console.log('mess', messages)
                        let promises = [];
                        for (let i = 0; i < messages.rows.length; i++) {
                            if (req.body.username === messages.rows[i].username) {
                                promises.push(database.getUsers(messages.rows[i].fromuser))
                            } else {
                                promises.push(new Promise((resolve, reject) => {
                                messages.rows[i].tousername = messages.rows[i].username
                                messages.rows[i].fromusername = req.body.username
                                messages.rows[i].username = messages.rows[i].username
                                messages.rows[i].id = messages.rows[i].touser
                                resolve(false)
                            }))
                            }
    
                    }   
                    Promise.all(promises).then((response) => {
                        
                        for (let i = 0; i < messages.rows.length; i++) {
                            if (response[i]) {
                                messages.rows[i].tousername = req.body.username
                                messages.rows[i].fromusername = response[i].rows[0].username
                                messages.rows[i].username = response[i].rows[0].username
                                messages.rows[i].id = messages.rows[i].fromuser
                            }
                        }
                        
                        res.send({pass: true, id: req.body.from, messages: messages.rows})
                    
                    })
                    })
                })
            } else {
                res.send({pass:false})
            }
             }).catch((err) => {
                 console.log(err)
             })
     
       },
       newChat: (req, res) => {
                database.postMessage(req.body).then((results) => {
                    database.getMessages(req.body.from).then((messages) => {
                        console.log('mess', messages)
                        let promises = [];
                        for (let i = 0; i < messages.rows.length; i++) {
                            if (req.body.username === messages.rows[i].username) {
                                promises.push(database.getUsers(messages.rows[i].fromuser))
                            } else {
                                promises.push(new Promise((resolve, reject) => {
                                messages.rows[i].tousername = messages.rows[i].username
                                messages.rows[i].fromusername = req.body.username
                                messages.rows[i].username = messages.rows[i].username
                                messages.rows[i].id = messages.rows[i].touser
                                resolve(false)
                            }))
                            }
    
                    }   
                    Promise.all(promises).then((response) => {
                        
                        for (let i = 0; i < messages.rows.length; i++) {
                            if (response[i]) {
                                messages.rows[i].tousername = req.body.username
                                messages.rows[i].fromusername = response[i].rows[0].username
                                messages.rows[i].username = response[i].rows[0].username
                                messages.rows[i].id = messages.rows[i].fromuser
                            }
                        }
                        
                        console.log(messages.rows)
                        res.send({pass: true, id: req.body.from, messages: messages.rows})
                    
                    })
                    })
                   


                })
            }
        
     
    

       
}
  