//#region Test data
const fetch = require('node-fetch');
const returnedData = {};

const adminLogin = {
  userName: 'admin',
  password: 'admin',
  token: null
};

const boardData = {
  boardName: 'JEST Board'
};
const boardDataUpdated = {
  boardName: 'JEST Board Updated'
};

const postDataNote = {
  title: 'JEST Post Note',
  typeOfPost: 'application/note',
  dueDate: 1609498800000,
  content: '<h2>JEST Note</h2>'
};
const postDataNoteSkip = {
  title: 'JEST Post Note Skip',
  typeOfPost: 'application/note',
  dueDate: 1609498800000,
  content: '<h2>JEST Note Skip</h2>',
  skipReturn: true
};
const postDataPDF = {
  title: 'JEST Post PDF',
  typeOfPost: 'application/pdf',
  content: '4keLtPEMlV8LoTwN/AGwzQ=='
};
//#endregion

beforeAll(() => {
  // Init. Retrieve acces token via adminLogin
  return fetch('http://localhost:1337/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(adminLogin)
  })
    .then(res => res.json())
    .then((json) => {
      adminLogin.token = json.accessToken;
    })
    .catch((err) => {
      throw err;
    });
});

//#region Create and Update board
test('BOARD::: Create board', () => {
  return fetch('http://localhost:1337/api/boards', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
      'Content-Type': 'application/json',
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
      returnedData.id = jsonString.id;
    })
    .catch((err) => {
      throw err;
    });
});

test('BOARD::: Update created board', () => {
  return fetch('http://localhost:1337/api/boards/' + returnedData.id, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(boardDataUpdated)
  })
    .then((response) => expect(response.status).toBe(200))
    .catch((err) => {
      throw err;
    });
});

test('BOARD::: Get updated board', () => {
  return fetch('http://localhost:1337/api/boards/' + returnedData.id, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
      'Content-Type': 'application/json',
    }
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString.boardName).toBe(boardDataUpdated.boardName);
      returnedData.id = jsonString.id;
    })
    .catch((err) => {
      throw err;
    });
});
//#endregion

//#region Post tests
test('POST::: Create new post : Note', () => {
  return fetch('http://localhost:1337/api/boards/' + returnedData.id, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postDataNote)
  })
    .then((response) => {
      expect(response.status).toBe(201);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString.title).toBe(postDataNote.title);
      expect(jsonString.typeOfPost).toBe(postDataNote.typeOfPost);
      expect(jsonString.content).toBe(postDataNote.content);
      expect(jsonString.id).not.toBeUndefined();
      returnedData.postIdNote = jsonString.id;
    })
    .catch((err) => {
      throw err;
    });
});

test('POST::: Create new post : PDF', () => {
  return fetch('http://localhost:1337/api/boards/' + returnedData.id, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postDataPDF)
  })
    .then((response) => {
      expect(response.status).toBe(201);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString.title).toBe(postDataPDF.title);
      expect(jsonString.typeOfPost).toBe(postDataPDF.typeOfPost);
      expect(jsonString.content).toBe(postDataPDF.content);
      expect(jsonString.dueDate).not.toBeFalsy();
      expect(jsonString.id).not.toBeFalsy();
      returnedData.postIdPDF = jsonString.id;
    })
    .catch((err) => {
      throw err;
    });
});

test('POST::: Create new post : Note, skip return', () => {
  return fetch('http://localhost:1337/api/boards/' + returnedData.id, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postDataNoteSkip)
  })
    .then((response) => {
      expect(response.status).toBe(201);
    })
    .catch((err) => {
      throw err;
    });
});

test('POST::: Get all', () => {
  return fetch('http://localhost:1337/api/posts/all/' + returnedData.id, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token
    }
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString.posts.length).toBe(3);
      expect(jsonString.posts[0].id).not.toBeFalsy();
      expect(jsonString.posts[1].id).not.toBeFalsy();
      expect(jsonString.posts[2].id).not.toBeFalsy();
      jsonString.posts.forEach((item) => {
        if(item.id !== returnedData.postIdNote && item.id !== returnedData.postIdPDF) {
          returnedData.postIdSkip = item.id;
        }
      });
    })
    .catch((err) => {
      throw err;
    });
});
//#endregion

//#region Cleanup
test('POST::: Delete post A', () => {
  return fetch('http://localhost:1337/api/posts/' + returnedData.postIdNote, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
    }
  })
    .then((response) => expect(response.status).toBe(200))
    .catch((err) => {
      throw err;
    });
});

test('POST::: Delete post B', () => {
  return fetch('http://localhost:1337/api/posts/' + returnedData.postIdPDF, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
    }
  })
    .then((response) => expect(response.status).toBe(200))
    .catch((err) => {
      throw err;
    });
});

test('POST::: Delete post C', () => {
  return fetch('http://localhost:1337/api/posts/' + returnedData.postIdSkip, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
    }
  })
    .then((response) => expect(response.status).toBe(200))
    .catch((err) => {
      throw err;
    });
});

test('BOARD::: Delete board', () => {
  return fetch('http://localhost:1337/api/boards/' + returnedData.id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + adminLogin.token,
    }
  })
    .then((response) => expect(response.status).toBe(200))
    .catch((err) => {
      throw err;
    });
});
//#endregion
