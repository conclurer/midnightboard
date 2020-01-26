module.exports = {
  tableName: 'board_subscription',
  attributes: {
    boardId: { type: 'number', columnName: 'board_id' },
    memberId: { type: 'number', columnName: 'member_id' }
  },
};
