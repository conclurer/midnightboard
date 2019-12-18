module.exports = {
  attributes: {
    id: { type: 'number', unique: true, autoIncrement: true },
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true },
    title: { type: 'string' },
    typeOfPost: {
      type: 'string',
      isIn: ['note','pdf','poll','survey','calendar','image'],
      required: true
    },
    board: { type: 'number', required: true },
    content: {type: 'string'},
  },
};
