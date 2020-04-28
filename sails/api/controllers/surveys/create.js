module.exports = {

  friendlyName: 'Create survey with questions',

  description: 'Create a new survey with questions and answer(s), postId must exist.'
    + 'A copy of the created survey entries is returned.',

  inputs: {
    postId: {
      description: 'ID of the post',
      type: 'number'
    },
    questionIds: {
      description: 'IDs of the survey questions',
      type: 'json',
      columnType: 'array'
    },
    questions: {
      description: 'Names of the survey questions',
      type: 'json',
      columnType: 'array'
    },
    answers: {
      description: 'Predefined answers of the survey questions (required for a multiple choice question)',
      type: 'json',
      columnType: 'array'
    },
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
    nonExistent: {
      description: 'Survey and post does not exist',
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
    if(!inputs.postId || !inputs.questionIds || !inputs.questions || !inputs.answers) {
      return exits.missingParams('Missing parameters');
    }
    if(inputs.questionIds.length <= 0 || inputs.questions <= 0) {
      return exits.invalidParams('A survey need at minimum one question!');
    }
    const postId = inputs.postId;
    const postExists = await Post.findOne({id: postId});
    if(!postExists) {
      return exits.nonExistent();
    }

    sails.log.verbose('SURVEY_CREATE::: Creating new survey with postId ' + postId + '...');
    var createdSurvey = [];
    var createData = null;
    // Create all entries in 'survey' table
    inputs.questionIds.forEach(async questionIndex => {
      const question = inputs.questions[questionIndex];
      var isMCQ = false;
      // Check for MCQ
      if(inputs.answers.length >= 2) {
        inputs.answers.forEach(async answerWithIndex => {
          if(questionIndex === answerWithIndex[0]) {
            isMCQ = true;
            createData = {
              postId: postId,
              questionId: questionIndex,
              question: question,
              answer: answerWithIndex[1],
              votes: 0
            };
            await Survey.create(createData).fetch()
              .then(surveyEntry => {
                createdSurvey.push(surveyEntry);
              })
              .catch(() => {
                return exits.serverError('SURVEY_CREATE::: Failed to create a survey with postId ' + postId + '!');
              });
          }
        });
      }
      // No MCQ
      if(!isMCQ) {
        createData = {
          postId: postId,
          questionId: questionIndex,
          question: question,
          answers: null,
          votes: null
        };
        await Survey.create(createData).fetch()
          .then(surveyEntry => {
            createdSurvey.push(surveyEntry);
          })
          .catch(() => {
            return exits.serverError('SURVEY_CREATE::: Failed to create a survey with postId ' + postId + '!');
          });
      }
    });
    sails.log.verbose('SURVEY_CREATE::: Created new survey with postId ' + postId + ' successfully!');
    return exits.success(createdSurvey);
  }
};
