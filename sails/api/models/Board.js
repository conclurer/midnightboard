module.exports = {
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', unique: true, autoIncrement: true, columnName: 'board_id' },
    boardName: { type: 'string', required: true, unique: true, columnName: 'board_name' },
    department: { type: 'number', allowNull: true },
    createdAt: { type: 'number', autoCreatedAt: true, columnName: 'created_at' },
    updatedAt: { type: 'number', autoUpdatedAt: true, columnName: 'updated_at' }
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};