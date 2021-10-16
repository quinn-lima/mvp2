const database = require('../database/database.js');

module.exports = {
    signUp: (req, res) => {
     database.signUp(req.body).then((results) => {

            res.send(200)
  
          }).catch((err) => {
              console.log(err)
          })
  
    },
    
    login: (req, res) => {
        database.login(req.body).then((results) => {

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
  