//#region Initial test data
const fetch = require('node-fetch');
var postId = 0;
var boardId = 0;

const adminLogin = {
  userName: 'admin',
  password: 'admin',
  token: null
};

const boardData = {
  boardName: 'JEST Poll Board'
};

const createPollData = {
  title: 'JEST Poll Question?',
  typeOfPost: 'application/poll',
  dueDate: 1609498900000,
  content: '<div class="container">'
  + '<div class="row justify-content-center"><div class="align-self-center">'
  + '<input type="radio" name="rb-2020-3-20-2130401234" id="1"></div>'
  + '<div class="col-sm-auto"><b>Answer A</b></div></div>'
  + '<div class="row justify-content-center"><div class="align-self-center">'
  + '<input type="radio" name="rb-2020-3-20-2130401234" id="2"></div>'
  + '<div class="col-sm-auto"><b>Answer B</b></div></div>'
  + '</div>'
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
        .catch(() => {
          expect(null).not.toBeNull();
        });
    })
    .catch((err) => {
      console.log('JEST:Board::: Error on setup: ' + err);
      expect(null).not.toBeNull();
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
    .catch(() => {
      expect(null).not.toBeNull();
    });
});

const createPollAnswersData = {
  postId: postId,
  answerIds: ['1', '2']
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
      .catch(() => {
        expect(null).not.toBeNull();
      });
  }, 1000);
});

const updatePollData = {
  postId: postId,
  answerId: 1
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
        expect(response.status).toBe(201);
        return response.json();
      })
      .then((jsonString) => {
        console.log('Update');
        console.log(jsonString);
        // postId = jsonString.id;
        expect(null).toBeNull();
      })
      .catch(() => {
        expect(null).not.toBeNull();
      });
  }, 1000);
});

const getPollData = {
  postId: postId
};

// Get the poll votes
test('POLL::: Get poll votes', () => {
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
      .catch(() => {
        expect(null).not.toBeNull();
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
    .then((response) => expect(response.status).toBe(200))
    .catch(() => {
      expect(null).not.toBeNull();
    });
});
//#endregion
