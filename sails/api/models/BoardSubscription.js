module.exports = {
  tableName: 'board_subscription',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'id' },
    boardId: { type: 'number', columnName: 'board_id' },
    memberId: { type: 'number', columnName: 'member_id' }
  },
};
