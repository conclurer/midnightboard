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
      isIn: [
        'application/calendar',
        'application/msword',
        'application/note',
        'application/pdf',
        'application/poll',
        'application/survey',
        'application/vnd.ms-excel',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'image/jpeg',
        'image/png'
      ],
      required: true,
      columnName: 'type_of_post'
    },
    title: { type: 'string' },
    content: {type: 'string', columnName: 'content'},
    dueDate: { type: 'ref', columnType: 'bigint', isNumber: true, columnName: 'due_date' },
    interactiveDueDate: { type: 'ref', columnType: 'bigint', isNumber: true, columnName: 'interactive_due_date' }
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};
