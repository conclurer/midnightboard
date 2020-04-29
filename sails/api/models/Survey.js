module.exports = {
  tableName: 'survey',
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'id' },
    postId: { type: 'number', columnName: 'post_id' },
    questionId: { type: 'number', columnName: 'question_id' },
    question: { type: 'string', columnName: 'question' },
    answer: { type: 'string', columnName: 'answer' },
    votes: { type: 'number', allowNull: true, columnName: 'vote' }
  }
};
