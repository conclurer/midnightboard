module.exports = {
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'id' },
    boardId: { type: 'number', columnName: 'board_id' },
    postId: { type: 'number', columnName: 'post_id' }
  },
};
