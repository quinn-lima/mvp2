const utils = require('../lib/hashUtils');
const Model = require('./model');

class Users extends Model {
  constructor() {
    super('users');
  }


  compare(attempted, password, salt) {
    return utils.compareHash(attempted, password, salt);
  }


  create( username, password, giveSalt) {
    console.log('givesalt', giveSalt)
    if (giveSalt == undefined) {
      let salt = utils.createRandom32String();
      let newUser = {
        username: username,
        salt: salt,
        password: utils.createHash(password, salt)
       };
       return newUser;
      
    } else {
      let salt = giveSalt
      let newUser = {
      username: username,
      salt: salt,
      password: utils.createHash(password, salt)
     };
     return newUser;
    }
  }
}

module.exports = new Users();
