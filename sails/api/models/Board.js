module.exports = {
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'board_id' },
    createdAt: { type: 'number', autoCreatedAt: true, columnName: 'created_at' },
    updatedAt: { type: 'number', autoUpdatedAt: true, columnName: 'updated_at' },
    creatorID: { type: 'number', allowNull: true, columnName: 'creator_id'},
    boardName: { type: 'string', required: true, unique: true, columnName: 'board_name' }
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
