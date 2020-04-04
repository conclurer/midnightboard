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
    invalidParams: {
      description: 'Invalid parameters',
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
    const errorMessagePart = 'SURVEY_UPDATE::: Failed to update survey with postId ' + postId + '! ';
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
            if(Array.isArray(answer)) {
              answer.forEach(async answerMCQ => {
                const surveyMCQAnswer = await Survey.findOne({
                  postId: postId,
                  questionId: questionIndex,
                  answer: answerMCQ
                });
                  // Must be an existing MCQ answer
                if(surveyMCQAnswer) {
                  // Vote for this answer
                  const updatedSurvey = await Survey.updateOne({
                    id: surveyMCQAnswer.id,
                  }).set({
                    votes: surveyMCQAnswer.votes + 1
                  });
                  if(updatedSurvey) {
                    surveyEntries.push(updatedSurvey);
                  } else {
                    return exits.serverError(errorMessagePart + 'Reason: Failed to update survey, '
                      + 'check DB connection.');
                  }
                } else {
                  return exits.invalidParams(errorMessagePart + 'Reason: Invalid answers for MCQ questions.');
                }
              });
            } else {
              const surveyEntrySameAnswer = await Survey.findOne({
                where: {
                  postId: postId,
                  questionId: questionIndex,
                  answer: answer
                }
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
                  return exits.serverError(errorMessagePart + 'Reason: Failed to update survey, '
                    + 'check DB connection.');
                }
              } else {
                // Get question name
                const surveyEntryDifferentAnswer = await Survey.find({
                  where: {
                    postId: postId,
                    questionId: questionIndex
                  },
                  limit: 1
                });
                if(surveyEntryDifferentAnswer) {
                  // Create new entry
                  const newSurveyEntry = await Survey.create({
                    postId: postId,
                    questionId: questionIndex,
                    question: surveyEntryDifferentAnswer.question,
                    answer: answer,
                    votes: 0
                  }).fetch();
                  if(newSurveyEntry) {
                    surveyEntries.push(newSurveyEntry);
                  } else {
                    return exits.serverError(errorMessagePart + 'Reason: Failed to create survey entry, '
                      + 'check DB connection.');
                  }
                } else {
                  return exits.invalidParams(errorMessagePart + 'Reason: Could not find a survey entry '
                    + 'for a question with ID ' + questionIndex + '.');
                }
              }
            }
          });
          return exits.success(surveyEntries);
        }
      }
    }
  }
};
