module.exports = {
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', required: true, unique: true, columnName: 'post_id' },
    title: { type: 'string', allowNull: true},
    typeOfPost: {
      type: 'string',
      isIn: ['note','pdf','poll','survey','calendar','image'],
      required: true,
      columnName: 'type_of_post'
    },
    board: { type: 'number', required: true },
    content: {type: 'string'},
    createdAt: { type: 'number', columnName: 'created_at' },
    updatedAt: { type: 'number', columnName: 'updated_at' }
  },
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};