module.exports = {
  tableName: 'team_membership',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'id' },
    teamId: { type: 'number', columnName: 'team_id' },
    memberId: { type: 'number', columnName: 'member_id' }
  },
};
