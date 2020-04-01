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
  boardName: 'JEST Survey Board'
};

const createSurveyData = {
  title: 'JEST Survey Title',
  typeOfPost: 'application/survey',
  dueDate: 1609498900000,
  content: '<form class="d-flex flex-column">'
  + '<div class="form-group"><div class="d-flex align-self-start">'
  + '<label for="inputText0">Question A?</label>'
  + '<input type="text" class="form-control" id="inputText0" placeholder="Placeholder A" required>'
  + '</div>'
  + '<div class="form-group"><div class="d-flex align-self-start">'
  + '<label for="inputTextArea1">Question B?</label>'
  + '<textarea class="form-control" id="inputTextArea1" placeholder="Placeholder B" rows="3" '
  + 'required></textarea>'
  + '</div>'
  + '<div class="form-group"><div class="d-flex align-self-start">'
  + '<div class="d-flex align-self-start"><p>Question C</p></div>'
  + '<div class="form-check">'
  + '<div class="d-flex align-self-start">'
  + '<input class="form-check-input" type="checkbox" id="cbSvy2Idx0">'
  + '<label class="form-check-label" for="cbSvy2Idx0">Answer A</label>'
  + '</div>'
  + '</div>'
  + '<div class="form-check">'
  + '<div class="d-flex align-self-start">'
  + '<input class="form-check-input" type="checkbox" id="cbSvy2Idx1">'
  + '<label class="form-check-label" for="cbSvy2Idx1">Answer B</label>'
  + '</div>'
  + '</div>'
  + '</div>'
  + '</form>'
};
// No " in JSON string allowed
createSurveyData.content = createSurveyData.content.replace(/"/g, /'/).replace(/\//g, '');
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

//#region Create survey post
test('POST::: Create survey post', () => {
  return fetch('http://localhost:1337/api/boards/' + boardId, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(createSurveyData)
  })
    .then((response) => {
      expect(response.status).toBe(201);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString.title).toBe(createSurveyData.title);
      expect(jsonString.typeOfPost).toBe(createSurveyData.typeOfPost);
      expect(jsonString.content).toBe(createSurveyData.content);
      expect(jsonString.id).not.toBeUndefined();
      postId = jsonString.id;
    })
    .catch((err) => {
      throw err;
    });
});

const createSurveyEntriesData = {
  postId: postId,
  questionIds: [0, 1, 2],
  questions: ['Question A?', 'Question B?', 'Question C?'],
  answers: [[2, 'Answer A'], [2, 'Answer B']]
};

// Create survey entries
test('SURVEY::: Create survey entries', () => {
  setTimeout(() => {
    return fetch('http://localhost:1337/api/surveys', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + adminLogin.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createSurveyEntriesData)
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

const updateSurveyData = {
  postId: postId,
  questionIds: [0, 1, 2],
  answers: ['Answer 0', 'Answer 1', 'Answer B']
};

// Submit a survey
test('SURVEY::: Submit a survey', () => {
  setTimeout(() => {
    return fetch('http://localhost:1337/api/surveys', {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + adminLogin.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateSurveyData)
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
      .catch((err) => {
        throw err;
      });
  }, 1000);
});

const getSurveyData = {
  postId: postId
};

// Get the survey entries
test('SURVEY::: Get survey entries', () => {
  setTimeout(() => {
    return fetch('http://localhost:1337/api/surveys', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + adminLogin.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getSurveyData)
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
