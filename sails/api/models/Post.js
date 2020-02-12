module.exports = {
  tableName: 'post',
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'post_id' },
    createdAt: { type: 'ref', columnType: 'bigint', isNumber: true, autoCreatedAt: true, columnName: 'created_at' },
    updatedAt: { type: 'ref', columnType: 'bigint', isNumber: true,  autoUpdatedAt: true, columnName: 'updated_at' },
    creatorId: { type: 'number', allowNull: true, columnName: 'creator_id'},
    typeOfPost: {
      type: 'string',
      isIn: ['note','pdf','poll','survey','calendar','imagepng','imagejpg','officefile'],
      required: true,
      columnName: 'type_of_post'
    },
    title: { type: 'string' },
    content: {type: 'string', columnName: 'content'},
    dueDate: { type: 'ref', columnType: 'bigint', isNumber: true, columnName: 'due_date' },
    interactiveDueDate:{ type: 'ref', columnType: 'bigint', isNumber: true, columnName: 'interactive_due_date' }
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
