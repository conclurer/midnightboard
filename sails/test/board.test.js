// Testing the BoardController with Jest
const fetch = require('node-fetch');

// Setup
var boardId = 1;

// getBoard
test('Check getBoard with id = 1', () => {
  return fetch('http://localhost:1337/api/boards/' + boardId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
    // Check for valid data
      expect(jsonString).not.toBeNull();
    })
    .catch(() => {
      expect(null).not.toBeNull();
    });
});

// createBoard
const createData = {
  boardName: 'Create Name',
  creatorId: 1
};
test('Check createBoard with name = Create Name', () => {
  return fetch('http://localhost:1337/api/boards/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createData)
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
      // Check for valid data
      const jsonData = JSON.parse(jsonString);
      expect(jsonData.boardName).toBe('Create Name');
      boardId = jsonData.id;
    })
    .catch(() => {
      expect(null).not.toBeNull();
    });
});

// deleteBoard
test('Check deleteBoard with volatile board', () => {
  return fetch('http://localhost:1337/api/boards/' + boardId, {
    method: 'DELETE'
  })
    .then((response) => expect(response.status).toBe(200))
    .catch(() => {
      expect(null).not.toBeNull();
    });
});

// updateBoard
const updateData = {
  boardName: 'Update Name',
  creatorId: 1
};
test('Check updateBoard with id = 2', () => {
  return fetch('http://localhost:1337/api/boards/2', {
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
