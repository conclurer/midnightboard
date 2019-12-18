module.exports = {
  primaryKey: 'id',
  attributes: {
<<<<<<< HEAD
    id: { type: 'number', autoIncrement: true },
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true },
    boardname: {type: 'string', required: true, unique: true},
=======
    id: { type: 'number', required: true, unique: true, columnName: 'board_id' },
    boardName: { type: 'string', required: true, unique: true, columnName: 'board_name' },
    department: { type: 'number', allowNull: true },
    createdAt: { type: 'number', columnName: 'created_at' },
    updatedAt: { type: 'number', columnName: 'updated_at' }
>>>>>>> f591cb5028aa71366ba52f6d5340a93c1c6d0f97
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
