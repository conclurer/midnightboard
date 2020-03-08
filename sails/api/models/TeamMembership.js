module.exports = {
  tableName: 'team_membership',
  attributes: {
    teamId: { type: 'number', columnName: 'team_id' },
    memberId: { type: 'number', columnName: 'member_id' }
  }
};
