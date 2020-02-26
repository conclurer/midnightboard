// Testing the PostController with Jest
const http = require('./fetch.js');

// newPost
const createData = {
  title: 'Note title',
  typeOfPost: 'application/note',
  content: '<h2>Content</h2>'
};
test('Check newPost with type application/note', () => {
  return http.fetch('http://localhost:1337/api/boards/1/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createData)
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

// getPost
test('Check getPost with postId = 1', () => {
  return http.fetch('http://localhost:1337/api/posts/1', {
    method: 'GET'
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

// searchPost
test('Check searchPost with boardId = 1', () => {
  return http.fetch('http://localhost:1337/api/posts/all/1', {
    method: 'GET'
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

// deletePost
test('Check deletePost with postId = 2', () => {
  return http.fetch('http://localhost:1337/api/posts/2', {
    method: 'DELETE'
  })
  .then((response) => expect(response.status).toBe(200))
  .catch(() => {
    expect(null).not.toBeNull();
  });
});

// updatePost
const updateData = {
  title: 'Note Title',
  typeOfPost: 'application/note',
  content: '<h3>Content</h3>'
};
test('Check updatePost with postId = 1', () => {
  return http.fetch('http://localhost:1337/api/posts/1', {
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
