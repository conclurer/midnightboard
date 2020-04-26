const fetch = require('node-fetch');

const registrationData = {
  userName: 'JESTAdmin',
  email: 'JEST.Admin@test.mail',
  password: 'JESTAdminLogin_',
  firstName: 'JESTAdmin',
  lastName: 'JESTAdmin'
};

test('TEST:INIT::: Registering first user (Admin User)', () => {
  return fetch('http://localhost:1337/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registrationData)
  })
    .then((response) => {
      expect(response.status).toBe(201);
      return response.json();
    })
    .then((json) => {
      expect(json.role).toBe(0);
      expect(json.id).not.toBeUndefined();
    })
    .catch((err) => {
      throw err;
    });
});



test('TEST:INIT::: Checking if default board has been created', () => {
  return fetch('http://localhost:1337/api/boards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((json) => {
      expect(json.default).not.toBeUndefined();
    })
    .catch((err) => {
      throw err;
    });
});