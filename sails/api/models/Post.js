module.exports = {
  tableName: 'post',
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, unique: true, columnName: 'post_id' },
    createdAt: { type: 'number', autoCreatedAt: true, columnName: 'created_at' },
    updatedAt: { type: 'number', autoUpdatedAt: true, columnName: 'updated_at' },
    creatorId: { type: 'number', allowNull: true, columnName: 'creator_id'},
    typeOfPost: {
      type: 'string',
      isIn: ['note','pdf','poll','survey','calendar','image'],
      required: true,
      columnName: 'type_of_post'
    },
    title: { type: 'string' },
    dueDate: { type: 'number', columnName: 'due_date' },
    interactiveDueDate:{ type: 'number', columnName: 'interactive_due_date' },
    content: {type: 'string', columnName: 'content'}
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
