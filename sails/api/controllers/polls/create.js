module.exports = {

  friendlyName: 'Create poll with answers',

  description: 'Create a new poll with answers, postId must exist.'
    + 'A copy of the created poll answers is returned.',

  inputs: {
    postId: {
      description: 'ID of the post',
      type: 'number'
    },
    answerIds: {
      description: 'Displayed title of created post',
      type: 'json',
      columnType: 'array'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 201
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    },
    invalidParams: {
      description: 'Invalid parameters',
      statusCode: 400
    },
    authRequired: {
      description: 'Valid Authorization header required',
      statusCode: 401
    },
    nonExistent: {
      description: 'Post does not exist',
      statusCode: 404
    },
    serverError: {
      description: 'Unexpected server error',
      statusCode: 500
    }
  },

  fn: async function(inputs, exits) {
    /*if(!this.req.me) {
      return exits.authRequired();
    }*/
    if(!inputs.postId || !inputs.answerIds) {
      return exits.missingParams('Missing parameters');
    }
    if(inputs.answerIds.length <= 1) {
      return exits.invalidParams('Missing IDs of some answers');
    }

    var postExists = await Post.findOne({id: inputs.postId});
    if(!postExists) {
      return exits.nonExistent();
    }

    sails.log.debug('POLL_CREATE::: Creating new Poll . . .');
    var createdPolls = {};
    var createData = {};
    // Create all entries in 'poll' table
    inputs.answerIds.forEach(async answerId => {
      createData = {
        postId: inputs.postId,
        answerId: answerId,
        votes: 0
      };
      createdPolls.push(await Poll.create(createData).fetch());
    });

    if(createdPolls.length >= 2) {
      sails.log.debug('POLL_CREATE::: Created new Poll successfully!');
      return exits.success(createdPolls);
    } else {
      return exits.serverError('POLL_CREATE::: Failed to create a Poll!');
    }
  }
};
