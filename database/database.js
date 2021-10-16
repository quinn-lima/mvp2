var db = require('./index.js');



module.exports = {
      signUp: function(info) {
        return new Promise((resolve, reject) => {
          db.query(`INSERT INTO messenger_schema.users (username, password) VALUES ('${info.username}', '${info.password}')`, [], (err, res) => {
             if (err) {
               reject(err);
             } else {
               resolve(res);
             }
           });
         });

      },

      login: function(info) {
        return new Promise((resolve, reject) => {
          db.query(`SELECT users.id FROM messenger_schema.users WHERE users.username = '${info.username}' AND users.password = '${info.password}'`, [], (err, res) => {
             if (err) {
               reject(err);
             } else {
               resolve(res);
             }
           });
         });

      },

      getMessages: function (userid) {
        return new Promise((resolve, reject) => {
         db.query(`SELECT users.username, messages.id AS messageid, messages.touser, messages.fromuser, messages.message 
         FROM messenger_schema.messages 
         INNER JOIN messenger_schema.users 
         ON messages.touser = users.id  
         WHERE messages.touser = ${userid} 
         OR messages.fromuser = ${userid}`, [], (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        });
      },
      postMessage: function (info) {
        return new Promise((resolve, reject) => {
         db.query(`INSERT INTO messenger_schema.messages (fromuser, touser, message) VALUES (${info.from}, ${info.to}, '${info.message}');`, [], (err, res) => {
            if (err) {
              reject(err);
            } else {
              resolve(res);
            }
          });
        });
    },

    checkUser: function (username) {
      return new Promise((resolve, reject) => {
       db.query(`SELECT users.id FROM messenger_schema.users WHERE users.username = '${username}'`, [], (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
  },

  getUsers: function (user) {
    return new Promise((resolve, reject) => {
     db.query(`SELECT users.username FROM messenger_schema.users WHERE users.id = '${user}'`, [], (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}