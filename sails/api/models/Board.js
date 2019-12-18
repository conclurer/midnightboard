module.exports = {
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', required: true, unique: true, columnName: 'board_id' },
    boardName: { type: 'string', required: true, unique: true, columnName: 'board_name' },
    department: { type: 'number', allowNull: true },
    createdAt: { type: 'number', columnName: 'created_at' },
    updatedAt: { type: 'number', columnName: 'updated_at' }
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
