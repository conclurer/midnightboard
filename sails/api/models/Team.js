module.exports = {
  tableName: 'team',
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'id' },
    createdAt: { type: 'number', autoCreatedAt: true, columnName: 'created_at' },
    updatedAt: { type: 'number', autoUpdatedAt: true, columnName: 'updated_at' },
    teamLeaderId: { type: 'number', allowNull: true,  columnName: 'team_leader_id'},
    teamName: { type: 'string', required: true, unique: true, columnName: 'team_name' }
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
