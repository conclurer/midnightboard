module.exports = {

  friendlyName: 'Register new user',

  description: 'Register new user. A login is required afterwards to receive JWTs',

  inputs: {
    userName: {
      description: 'Username used to log in.',
      type: 'string'
    },
    email: {
      description: 'Email used to verify account and receive notifications. May also used to log in',
      type: 'string'
    },
    password: {
      description: 'Password used to log in.',
      type: 'string'
    },
    firstName: {
      description: 'First name. Visible to all users.',
      type: 'string'
    },
    lastName: {
      description: 'Last name. Visible to most users.',
      type: 'string'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 201
    },
    invalidParams: {
      description: 'One or more parameters are invalid',
      statusCode: 400
    },
    nameTaken: {
      description: 'Username or email are already in use',
      statusCode: 400
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    },
    serverError: {
      description: 'An unexpected server error occured',
      statusCode: 500
    }
  },

  fn: async function(inputs, exits) {
    const bcrypt = require('bcrypt');
    let passwordRegex = new RegExp(sails.config.custom.PASSWORD_REGEX);
    let emailRegex = new RegExp(sails.config.custom.EMAIL_REGEX);
    let realnameRegex = new RegExp(sails.config.custom.REALNAME_REGEX);
    let usernameRegex = new RegExp(sails.config.custom.USERNAME_REGEX);

    if(!inputs.email || !inputs.userName || !inputs.password || !inputs.firstName || !inputs.lastName) {
      return exits.missingParams('Missing parameters. email, userName, password, firstName and lastName are required');
    }
    if(!emailRegex.test(inputs.email)) {
      return exits.invalidParams('Invalid E-Mail address');
    }
    if(!passwordRegex.test(inputs.password)) {
      return exits.invalidParams('Password must be atleast 8 characters long,'
        + ' and must contain one uppercase letter, one lowercase letter, and 1 number or special character');
    }
    if(!usernameRegex.test(inputs.userName)) {
      return exits.invalidParams('Username is too short/long or contains illegal characters');
    }
    if(!realnameRegex.test(inputs.firstName) || !realnameRegex.test(inputs.lastName)) {
      return exits.invalidParams('First or last name is too short/long or contains illegal characters');
    }

    sails.log.verbose('AUTH_REGISTER::: Trying to create user ' + inputs.userName);
    var hashedPassword = '';
    try {
      hashedPassword = await bcrypt.hash(inputs.password, 10);
    } catch(err) {
      sails.log.debug('AUTH_REGISTER_ERR::: ' + err);
      return exits.serverError();
    }
    try {
      var createdUser = await Member.create({
        userName: inputs.userName,
        email: inputs.email.toLowerCase(),
        password: hashedPassword,
        firstName: inputs.firstName,
        lastName: inputs.lastName
      }).fetch();

      ['updatedAt',
        'password',
        'languagePreference',
        'hideLastName'
      ].forEach(attribute => delete createdUser[attribute]);
    } catch(err) {
      if(err.code === 'E_UNIQUE') {
        return exits.nameTaken('Username or email already taken');
      }
      sails.log.debug('AUTH_REGISTER_ERR::: ' + err);
      return exits.serverError();
    }
    return exits.success(createdUser);
  }
};
