//#region Initial test data
const fetch = require('node-fetch');
var postId = 0;
var boardId = 0;

const adminLogin = {
  userName: 'JESTAdmin',
  email: 'JEST.Admin@test.mail',
  password: 'JESTAdminLogin_',
  token: null
};

const boardData = {
  boardName: 'JEST Poll Board'
};

const createPollData = {
  title: 'JEST Poll Question?',
  typeOfPost: 'application/poll',
  dueDate: 1609498900000,
  content: '<form class="d-flex flex-column">'
  + '<div class="form-check"><div class="d-flex align-self-start">'
  + '<input class="form-check-input" type="radio" name="rb-20203202130401234" id="rb-20203202130401234-aidx0">'
  + '<label class="form-check-label for="rb-20203202130401234-aidx0>Answer A</label>'
  + '</div></div>'
  + '<div class="form-check"><div class="d-flex align-self-start">'
  + '<input class="form-check-input" type="radio" name="rb-20203202130401234" id="rb-20203202130401234-aidx1">'
  + '<label class="form-check-label for="rb-20203202130401234-aidx1>Answer B</label>'
  + '</div></div>'
  + '</form>'
};
// No " in JSON string allowed
createPollData.content = createPollData.content.replace(/"/g, /'/).replace(/\//g, '');
//#endregion

//#region Test setup
beforeAll(() => {
  // Init. Retrieve acces token via adminLogin
  return fetch('http://localhost:1337/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(adminLogin)
  })
    .then(res => res.json())
    .then((json) => {
      adminLogin.token = json.accessToken;
    })
    .then(() => {
      return fetch('http://localhost:1337/api/boards', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + adminLogin.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(boardData)
      })
        .then((response) => {
          expect(response.status).toBe(201);
          return response.json();
        })
        .then((jsonString) => {
          expect(jsonString.boardName).toBe(boardData.boardName);
          expect(jsonString.id).not.toBeUndefined();
          boardId = jsonString.id;
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
});

//#region Create poll post
test('POST::: Create poll post', () => {
  return fetch('http://localhost:1337/api/boards/' + boardId, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createPollData)
  })
    .then((response) => {
      expect(response.status).toBe(201);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString.title).toBe(createPollData.title);
      expect(jsonString.typeOfPost).toBe(createPollData.typeOfPost);
      expect(jsonString.content).toBe(createPollData.content);
      expect(jsonString.id).not.toBeUndefined();
      postId = jsonString.id;
    })
    .catch((err) => {
      throw err;
    });
});

const createPollAnswersData = {
  postId: postId,
  answerIds: ['1', '2'],
  answers: ['Yes', 'No']
};

// Create poll answers
test('POLL::: Create poll answers', () => {
  setTimeout(() => {
    return fetch('http://localhost:1337/api/polls', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + adminLogin.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createPollAnswersData)
    })
      .then((response) => {
        expect(response.status).toBe(201);
        return response.json();
      })
      .then((jsonString) => {
        console.log('Create');
        console.log(jsonString);
        // postId = jsonString.id;
        expect(null).toBeNull();
      })
      .catch((err) => {
        throw err;
      });
  }, 1000);
});

const updatePollData = {
  postId: postId,
  answerIds: [1]
};

// Vote for a poll answer
test('POLL::: Vote for poll answer', () => {
  setTimeout(() => {
    return fetch('http://localhost:1337/api/polls', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + adminLogin.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatePollData)
    })
      .then((response) => {
        expect(response.status).toBe(200);
        return response.json();
      })
      .then((jsonString) => {
        console.log('Update');
        console.log(jsonString);
        expect(null).toBeNull();
      })
      .catch((err) => {
        throw err;
      });
  }, 1000);
});

const getPollData = {
  postId: postId
};

// Get the poll answers with votes
test('POLL::: Get poll answers with votes', () => {
  setTimeout(() => {
    return fetch('http://localhost:1337/api/polls', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + adminLogin.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getPollData)
    })
      .then((response) => {
        expect(response.status).toBe(200);
      })
      .catch((err) => {
        throw err;
      });
  }, 1000);
});
//#endregion

//#region Cleanup
afterAll(() => {
  return fetch('http://localhost:1337/api/posts/' + postId, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
    }
  })
    .then((response) => {
      expect(response.status).toBe(200);
    })
  //+
    .then(() => {
      return fetch('http://localhost:1337/api/boards/' + boardId, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + adminLogin.token,
        }
      })
        .then((response) => {
          expect(response.status).toBe(200);
        })
        .catch((err) => {
          throw err;
        });
    })
  //+
    .catch((err) => {
      throw err;
    });
});
//#endregion
