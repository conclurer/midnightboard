module.exports = {
  tableName: 'token',
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'id' },
    createdAt: { type: 'number', autoCreatedAt: true, columnName: 'created_at' },
    uid: { type: 'number', required: true, columnName: 'uid' },
    refreshToken: { type: 'string', required: true, unique: true, columnName: 'refresh_token' }
  },
  createdAt: 'createdAt'
};
