module.exports = {
  attributes: {
    id: { type: 'number', autoIncrement: true },
    createdAt: { type: 'number', autoCreatedAt: true },
    updatedAt: { type: 'number', autoUpdatedAt: true },
    boardname: {type: 'string', required: true, unique: true},
  },
};
