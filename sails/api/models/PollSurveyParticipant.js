module.exports = {
  tableName: 'poll_survey_participant',
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'id' },
    postId: { type: 'number', columnName: 'post_id' },
    memberId: { type: 'number', columnName: 'member_id' }
  }
};
