// Testing the BoardController with Jest
const http = require('./fetch.js');

// getBoard
test('Check getBoard with boardId = 1', () => {
  return http.fetch('http://localhost:1337/api/boards/1', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then((response) => {
    expect(response.status).toBe(200);
    response.json();
  })
  .then((jsonData) => {
    // Check for valid data
    expect(jsonData).not.toBeNull();
  })
  .catch(() => {
    expect(null).not.toBeNull();
  });
});

// createBoard
const createData = {
  createdAt: 1577833200000,
  updateAt: 1577833200000,
  creatorId: 1,
  boardName: 'Create Name'
};
test('Check createBoard with boardName = Create Name', () => {
  return http.fetch('http://localhost:1337/api/boards/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createData)
  })
  .then((response) => expect(response.status).toBe(200))
  .catch(() => {
    expect(null).not.toBeNull();
  });
});

// deleteBoard
test('Check deleteBoard with boardId = 1', () => {
  return http.fetch('http://localhost:1337/api/boards/1', {
    method: 'DELETE'
  })
  .then((response) => expect(response.status).toBe(200))
  .catch(() => {
    expect(null).not.toBeNull();
  });
});

// updateBoard
const updateData = {
  createdAt: 1577833300000,
  updateAt: 1577833300000,
  creatorId: 1,
  boardName: 'Update Name'
};
test('Check deleteBoard with boardId = 2', () => {
  return http.fetch('http://localhost:1337/api/boards/2', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData)
  })
  .then((response) => expect(response.status).toBe(200))
  .catch(() => {
    expect(null).not.toBeNull();
  });
});
