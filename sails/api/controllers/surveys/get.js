module.exports = {

  friendlyName: 'Get complete survey',

  description: 'Get all entries for a survey',

  inputs: {
    postId: {
      description: 'ID of matching post',
      type: 'number'
    }
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    missingParams: {
      description: 'Missing parameter postId',
      statusCode: 400
    },
    nonExistent: {
      description: 'Survey and post does not exist',
      statusCode: 404
    }
  },

  fn: async function(inputs, exits) {
    if(!inputs.postId) {
      return exits.missingParams();
    }
    const postId = inputs.postId;
    const postExists = await Post.findOne({id: postId});
    if(!postExists) {
      return exits.nonExistent();
    }

    sails.log.verbose('SURVEY_GET::: Searching survey with postId ' + postId);
    var surveyEntries = await Survey.find({
      postId: postId
    }).sort('questionId ASC');
    if(!surveyEntries) {
      return exits.nonExistent();
    } else {
      sails.log.verbose('SURVEY_GET::: Found survey entries for postId ' + postId);
      return exits.success(surveyEntries);
    }
  }
};
