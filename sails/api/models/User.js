module.exports = {
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', required: true, unique: true, columnName: 'user_id' },
    username: { type: 'string', required: true, unique: true},
    email: { type: 'string', required: true, unique: true},
    password: { type: 'string', required: true},
    avatar: { type: 'string', allowNull: true},
    department: { type: 'number', allowNull: true},
    createdAt: { type: 'number', columnName: 'created_at' },
    updatedAt: { type: 'number', columnName: 'updated_at' }
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};