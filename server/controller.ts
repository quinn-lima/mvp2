const database = require('../database/database.js');
const User = require('./hash/user.js')
import {Request, Response} from 'express';
//const models = require('./hash/models.js');

module.exports = {
    signUp: (req: Request, res: Response) => {

    let userObj = User.create(req.body.username, req.body.password)
    
     database.signUp(userObj).then(() => {

            res.send(200)
  
          }).catch((err: any) => {
              console.log(err)
          })
  
    },
    
    login: (req: Request, res: Response) => {
        //get salt from database
       
        database.getSalt(req.body).then(({rows}: {rows: {salt: string}[]}) => {
            const salt = rows[0].salt

        //create new password with salt from database, then put it into database.login
        const attemptedUser = User.create(req.body.username, req.body.password, salt);
        const attemptedPassword = attemptedUser.password;
        

        database.login(req.body.username, attemptedPassword).then(({rows}: {rows:{id: number}[]}) => {
            const row = rows

            if (row.length > 0) {
                database.getMessages(row[0].id).then(({rows}: {rows:{username: string, messageid: number, touser: number, fromuser: number, message: string, tousername?: string, fromusername?: string, id?: number}[]}) => {
                    let promises = [];
                    for (let i = 0; i < rows.length; i++) {
                        if (req.body.username === rows[i].username) {
                            promises.push(database.getUsers(rows[i].fromuser))
                        } else {
                            promises.push(new Promise((resolve, reject) => {
                            rows[i].tousername = rows[i].username
                            rows[i].fromusername = req.body.username
                            rows[i].username = rows[i].username
                            rows[i].id = rows[i].touser
                            resolve(false)
                        }))
                        }

                }   
                Promise.all(promises).then((response) => {
                    
                    for (let i = 0; i < rows.length; i++) {
                        if (response[i]) {
                            rows[i].tousername = req.body.username
                            rows[i].fromusername = response[i].rows[0].username
                            rows[i].username = response[i].rows[0].username
                            rows[i].id = rows[i].fromuser
                        }
                    }
                    
                    
                    res.send({pass: true, id: row[0].id, messages: rows})
                
                })
                })
            } else {
                res.send({pass:false})
            }
             }).catch((err:any) => {
                 console.log(err)
             })
    })
     
       },

       newMessage: (req: Request, res: Response) => {
        database.checkUser(req.body.toName).then((results: any) => {
            console.log('yesults2', results)
            if (results.rows.length > 0) {
            
                req.body.to = results.rows[0].id
                database.postMessage(req.body).then(() => {
                    database.getMessages(req.body.from).then((messages:any) => {
                        console.log('messy', messages)
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
             }).catch((err: any) => {
                 console.log(err)
             })
     
       },
       newChat: (req: Request, res: Response) => {
                database.postMessage(req.body).then(() => {
                    database.getMessages(req.body.from).then((messages:any) => {
                        console.log('messi', messages)
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
            }
        
     
    

       
}
  