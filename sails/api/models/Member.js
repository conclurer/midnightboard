module.exports = {
  tableName: 'member',
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'id' },
    createdAt: { type: 'number', autoCreatedAt: true, columnName: 'created_at' },
    updatedAt: { type: 'number', autoUpdatedAt: true, columnName: 'updated_at' },
    lastSeen: { type: 'ref', columnType: 'bigint', isNumber: true, columnName: 'last_seen' },
    userName: { type: 'string', required: true, unique: true, columnName: 'user_name'},
    firstName: { type: 'string', allowNull: true, columnName: 'first_name' },
    lastName: { type: 'string', allowNull: true, columnName: 'last_name' },
    email: { type: 'string', required: true, unique: true, columnName: 'email'},
    password: { type: 'string', required: true },
    avatar: {type: 'ref', columnName: 'avatar'},
    languagePreference: {
      type: 'string',
      isIn: ['en', 'de'],
      defaultsTo: 'en',
      columnName: 'language_preference'
    },
    hideLastName: { type: 'boolean', defaultsTo: true, columnName: 'hide_last_name' },
    role: { type: 'string', isIn: ['user', 'admin'], defaultsTo: 'user', columnName: 'user_role'}
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
