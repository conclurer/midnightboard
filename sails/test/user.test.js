//#region Test data
const fetch = require('node-fetch');
const returnedData = {};

const adminLoginToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJp'
  + 'ZCI6MSwicm9sZSI6MCwiaWF0IjoxNTg1NDAwMDM2LCJleHAiOjE2MTY5MzYwMzZ9.ZeNk9pB6a4lEYyD2ihlAGocy5Q2RLzhc117_ZVDMgB0';
const validRegistrationData = {
  userName: 'JESTUser1',
  email: 'JEST@test.mail',
  password: 'P@ssw0rd',
  firstName: 'JESTMax',
  lastName: 'JESTMustermann'
};
const updatedUserData = {
  userName: 'JESTUserUp',
  firstName: 'JESTMaxUp',
  lastName: 'JESTMustermannUp',
  hideLastName: false
};
const updatedLoginData = {
  email: 'JESTUp@test.mail',
  password: 'P@ssw0rdUp'
};
//#endregion

//#region Register and Login
test('TEST:USER::: Register user:  Valid user', () => {
  return fetch('http://localhost:1337/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validRegistrationData)
  })
    .then((response) => {
      expect(response.status).toBe(201);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString.userName).toBe(validRegistrationData.userName);
      expect(jsonString.email).toBe(validRegistrationData.email.toLocaleLowerCase());
      expect(jsonString.firstName).toBe(validRegistrationData.firstName);
      expect(jsonString.lastName).toBe(validRegistrationData.lastName);
      expect(jsonString.id).not.toBeUndefined();
      returnedData.id = jsonString.id;
    })
    .catch((err) => {
      throw err;
    });
});

test('TEST:USER::: Register duplicate user', () => {
  return fetch('http://localhost:1337/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(validRegistrationData)
  })
    .then((response) => {
      expect(response.status).toBe(409);
    })
    .catch((err) => {
      throw err;
    });
});

test('TEST:USER::: Login using email', () => {
  var loginData = {
    email: validRegistrationData.email,
    password: validRegistrationData.password
  };

  return fetch('http://localhost:1337/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData)
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString).not.toBeNull();
      expect(jsonString.accessToken).not.toBeUndefined();
      expect(jsonString.refreshToken).not.toBeUndefined();
    })
    .catch((err) => {
      throw err;
    });
});

test('TEST:USER::: Login using username', () => {
  var loginData = {
    userName: validRegistrationData.userName,
    password: validRegistrationData.password
  };

  return fetch('http://localhost:1337/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData)
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString).not.toBeNull();
      expect(jsonString.accessToken).not.toBeUndefined();
      expect(jsonString.refreshToken).not.toBeUndefined();
      returnedData.accessToken = jsonString.accessToken;
      returnedData.refreshToken = jsonString.refreshToken;
    })
    .catch((err) => {
      throw err;
    });
});

test('TEST:USER::: Refresh access token', () => {
  var tokenBody = {token: returnedData.refreshToken};
  return fetch('http://localhost:1337/api/users/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tokenBody)
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString).not.toBeNull();
      expect(jsonString.accessToken).not.toBeUndefined();
      returnedData.accessToken = jsonString.accessToken;
    })
    .catch((err) => {
      throw err;
    });
});
//#endregion

//#region Update and Get
test('TEST:USER::: Check update with updated data', () => {
  return fetch('http://localhost:1337/api/users/' + returnedData.id, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + returnedData.accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData)
  })
    .then((response) => expect(response.status).toBe(200))
    .catch((err) => {
      throw err;
    });
});
test('TEST:USER::: Update email', () => {
  return fetch('http://localhost:1337/api/users/' + returnedData.id + '/updateemail', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + returnedData.accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email: updatedLoginData.email})
  })
    .then((response) => expect(response.status).toBe(200))
    .catch((err) => {
      throw err;
    });
});
test('TEST:USER::: Update password', () => {
  return fetch('http://localhost:1337/api/users/' + returnedData.id + '/updatepassword', {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + returnedData.accessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      oldPassword: validRegistrationData.password,
      newPassword: updatedLoginData.password
    })
  })
    .then((response) => expect(response.status).toBe(200))
    .catch((err) => {
      throw err;
    });
});
test('TEST:USER::: Update user role using admin token', () => {
  return fetch('http://localhost:1337/api/users/' + returnedData.id, {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + adminLoginToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      role: 0
    })
  })
    .then((response) => {
      expect(response.status).toBe(200);
    })
    .catch((err) => {
      throw err;
    });
});
test('TEST:USER::: Check get with created user', () => {
  return fetch('http://localhost:1337/api/users/' + returnedData.id, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + returnedData.accessToken,
    }
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString).not.toBeNull();
      expect(jsonString.userName).toBe(updatedUserData.userName);
      expect(jsonString.firstName).toBe(updatedUserData.firstName);
      expect(jsonString.lastName).toBe(updatedUserData.lastName);
      expect(jsonString.email).toBe(updatedLoginData.email.toLowerCase());
      expect(jsonString.role).toBe(0);
    })
    .catch((err) => {
      throw err;
    });
});
test('TEST:USER::: Login using updated data', () => {
  var loginData = {
    email: updatedLoginData.email,
    password: updatedLoginData.password
  };

  return fetch('http://localhost:1337/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData)
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString).not.toBeNull();
      expect(jsonString.accessToken).not.toBeUndefined();
      expect(jsonString.refreshToken).not.toBeUndefined();
    })
    .catch((err) => {
      throw err;
    });
});
//#endregion

//#region Logout and Delete
test('TEST:USER::: Logout user, using accessToken', () => {
  return fetch('http://localhost:1337/api/users/logout', {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + returnedData.accessToken,
    }
  })
    .then((response) => {
      expect(response.status).toBe(200);
    })
    .catch((err) => {
      throw err;
    });
});

test('TEST:USER::: Check if refresh token has been invalidated', () => {
  return fetch('http://localhost:1337/api/users/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token: returnedData.refreshToken})
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
      expect(jsonString).not.toBeNull();
      expect(jsonString.accessToken).not.toBeUndefined();
      returnedData.accessToken = jsonString.accessToken;
    })
    .catch((err) => {
      throw err;
    });
});

test('TEST:USER::: Delete User', () => {
  return fetch('http://localhost:1337/api/users/' + returnedData.id, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + returnedData.accessToken,
    }
  })
    .then((response) => {
      expect(response.status).toBe(200);
    })
    .catch((err) => {
      throw err;
    });
});
//#endregion
