module.exports = {

  friendlyName: 'Update board',

  description: 'Update data of existing post.',

  inputs: {
    postId: {
      description: 'ID of post to update',
      type: 'number'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    invalidParams: {
      description: 'One or more parameters do not match pre-defined regex',
      statusCode: 400
    },
    nonExistent: {
      description: 'Non existent post',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    return exits.success();
  }
};


