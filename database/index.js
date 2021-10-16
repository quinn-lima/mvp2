const pg = require('pg')

const cn= {
    "host": "localhost",
    "port": 5432,
    "database": "mvp2",
    "password": `password`,
    "user": "quinnlima"
  };
const db = new pg.Client(cn)

db.connect()// .then((result) => {console.log(result)}).catch((err) => {console.log(err)})

module.exports = db 