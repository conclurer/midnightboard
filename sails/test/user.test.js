// Testing the UserController with Jest
const http = require('./fetch.js');

// getUser
test('Check getUser with userId = 1', () => {
  return http.fetch('http://localhost:1337/api/users/1', {
    method: 'GET'
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

// registerUser
const createData = {
  userName: 'UserName',
  firstName: 'FirstName',
  lastName: 'LastName',
  email: 'username@provider.com',
  password: 'P@ssw0rd',
  languagePreference: 'en'
};
test('Check registerUser with createData', () => {
  return http.fetch('http://localhost:1337/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createData)
  })
    .then((response) => expect(response.status).toBe(201))
    .catch(() => {
      expect(null).not.toBeNull();
    });
});

// deleteUser
test('Check deleteUser with userId = 2', () => {
  return http.fetch('http://localhost:1337/api/users/2', {
    method: 'DELETE'
  })
    .then((response) => expect(response.status).toBe(200))
    .catch(() => {
      expect(null).not.toBeNull();
    });
});

// updateUser
const updateData = {
  userName: 'UserName',
  firstName: 'FirstName',
  lastName: 'LastName',
  email: 'username@provider.com',
  password: 'P@ssw0rd',
  languagePreference: 'de'
};
test('Check updatePost with updateData', () => {
  return http.fetch('http://localhost:1337/api/users/1', {
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
