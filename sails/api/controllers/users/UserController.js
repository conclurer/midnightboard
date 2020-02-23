/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
let PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]|.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,}$');
let EMAIL_REGEX = new RegExp('^(?=[a-zA-Z0-9][a-zA-Z0-9@._%+-]{5,253}$)[a-zA-Z0-9._%+-]{1,64}@(?:(?=[a-zA-Z0-9-]{1,63}\.)[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*\.){1,8}[a-zA-Z]{2,63}$');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  getUser: async function(req, res) {
    sails.log('Searching user ' + req.param('userId'));
    var usr = await Member.findOne({userId: req.param('userId')});
    return res.json(JSON.stringify(usr));
  },

  registerUser: async function(req, res) {
    sails.log('Trying to create user ' + req.param('userName'));

    if(!EMAIL_REGEX.test(req.param('email'))){
      return res.badRequest(new Error('Invalid e-mail address'));
    }
    if(!PASSWORD_REGEX.test(req.param('password'))){
      return res.badRequest(new Error('Password must be atleast 8 characters long and contain atleast 1 lowercase character, 1 uppercase character, and 1 number or special character'));
    }

    var hashedPassword = '';
    try{
      hashedPassword = await bcrypt.hash(req.param('password'), 10)
    }
    catch{
      return res.serverError();
    }

    await Member.create({
      userName: req.param('userName'),
      email: req.param('email'),
      password: hashedPassword,
      firstName: req.param('firstName'),
      lastName: req.param('lastName')
    });
    //TODO send Register Response
    return res.ok();
  },

  loginUser: async function(req, res){
    sails.log.debug('Trying to log in user ' + req.param('username'));
    var usr = await Member.findOne({userName: req.param('username')});
    if(!usr){ var usr = await Member.findOne({email: req.param('username')}); }
    if(!usr){ res.status(403).send('Incorrect username or password'); }
    try{
      if(await bcrypt.compare(req.param('password'), usr.password)){
        const tokenData = {name: usr.userName};
        const acessToken = jwt.sign(tokenData, sails.config.jwts.ACCESS_TOKEN_SECRET);
        return res.json({accessToken: acessToken});
      } else {
        return res.status(403).send('Incorrect username or password');
      }
    }
    catch{
      return res.serverError(err);
    }
  },

  logoutUser: async function(req, res){
    
    return res.ok();
  },

  deleteUser: async function(req, res) {
    sails.log('Trying to delete user ' + req.param('userId'));
    await Member.destroy({userName: req.param('userId')});
    return res.ok();
  },

  updateUser: async function(req, res){
    var token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    return res.ok(await sails.helpers.authenticateJwt(token));
  },
};
