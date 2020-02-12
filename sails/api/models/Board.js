module.exports = {
  tableName: 'board',
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'board_id' },
    createdAt: { type: 'ref', columnType: 'bigint', isNumber: true,  autoCreatedAt: true, columnName: 'created_at' },
    updatedAt: { type: 'ref', columnType: 'bigint', isNumber: true,  autoUpdatedAt: true, columnName: 'updated_at' },
    creatorId: { type: 'number', allowNull: true, columnName: 'creator_id'},
    boardName: { type: 'string', required: true, unique: true, columnName: 'board_name' }
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
