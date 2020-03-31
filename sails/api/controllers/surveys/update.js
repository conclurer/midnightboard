module.exports = {

  friendlyName: 'Update survey',

  description: 'Update existing data and push new answers of a survey.',

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
    answers: {
      description: 'Answers/votes for the survey questions',
      type: 'json',
      columnType: 'array'
    },
  },

  exits: {
    success: {
      responseType: '',
      statusCode: 200
    },
    missingParams: {
      description: 'Missing parameters',
      statusCode: 400
    },
    forbidden: {
      description: 'This user have already voted!',
      statusCode: 403
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
    if(!inputs.postId || !inputs.questionIds || !inputs.answers) {
      return exits.missingParams();
    }
    const postId = inputs.postId;
    const postExists = await Post.findOne({id: postId});
    if(!postExists) {
      return exits.nonExistent();
    } else {
      // Check if participant has already voted
      const existingParticipant = await PollSurveyParticipant.findOne({
        postId: postId,
        memberId: this.req.me['id']
      });
      if(existingParticipant) {
        return exits.forbidden();
      } else {
        const savedAsParticipant = await PollSurveyParticipant.create({
          postId: postId,
          memberId: this.req.me['id']
        }).fetch();
        if(savedAsParticipant) {
          sails.log.verbose('SURVEY_UPDATE::: Updating survey with postId ' + postId + '...');
          var surveyEntries = [];
          inputs.questionIds.forEach(async questionIndex => {
            const answer = inputs.answers[questionIndex];
            const surveyEntrySameAnswer = await Survey.findOne({
              postId: postId,
              questionId: questionIndex,
              answer: answer
            });
            if(surveyEntrySameAnswer) {
              // Vote for this answer
              const updatedSurvey = await Survey.updateOne({
                id: surveyEntrySameAnswer.id,
              }).set({
                votes: surveyEntrySameAnswer.votes + 1
              });
              if(updatedSurvey) {
                surveyEntries.push(updatedSurvey);
              } else {
                return exits.serverError('SURVEY_UPDATE::: Failed to update survey with postId ' + postId + '! #1');
              }
            } else {
              // Get question name
              const surveyEntryDifferentAnswer = await Survey.findOne({
                postId: postId,
                questionId: questionIndex
              });
              if(surveyEntryDifferentAnswer) {
                // Create new entry
                const newSurveyEntry = await Survey.create({
                  postId: postId,
                  questionId: questionIndex,
                  question: surveyEntryDifferentAnswer.question,
                  answer: answer,
                  votes: 0
                });
                if(newSurveyEntry) {
                  surveyEntries.push(newSurveyEntry);
                } else {
                  return exits.serverError('SURVEY_UPDATE::: Failed to update survey with postId ' + postId + '! #2');
                }
              } else {
                return exits.serverError('SURVEY_UPDATE::: Failed to update survey with postId ' + postId + '! #3');
              }
            }
          });
          return exits.success(surveyEntries);
        }
      }
    }
  }
};
