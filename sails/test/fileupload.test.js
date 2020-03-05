// Testing the PostController with Jest
const http = require('./fetch.js');

// Post new PDF
const createPDFData = {
  typeOfPost: 'application/pdf',
  title: 'New PDF',
  content: '4keLtPEMlV8LoTwN/AGwzQ=='
};
test('Check newPost with type application/pdf', () => {
  return http.fetch('http://localhost:1337/api/boards/1/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createPDFData)
  })
    .then((response) => {
      expect(response.status).toBe(200);
      return response.json();
    })
    .then((jsonString) => {
    // Check for valid data
      const jsonData = JSON.parse(jsonString);
      expect(jsonData.typeOfPost).toBe('application/pdf');
      expect(jsonData.title).toBe('New PDF');
      expect(jsonData.content).toBe('4keLtPEMlV8LoTwN/AGwzQ==');
    })
    .catch(() => {
      expect(null).not.toBeNull();
    });
});

// Post new Word document
const createWordData = {
  typeOfPost: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  title: 'New Word document',
  content: 'PQwd5Q0hHN8YCUpJ2tcnlg=='
};
test('Check newPost with type application/vnd.openxmlformats-officedocument.wordprocessingml.document', () => {
  return http.fetch('http://localhost:1337/api/boards/1/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createWordData)
  })
  .then((response) => {
    expect(response.status).toBe(200);
    return response.json();
  })
  .then((jsonString) => {
    // Check for valid data
    const jsonData = JSON.parse(jsonString);
    expect(jsonData.typeOfPost).toBe('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    expect(jsonData.title).toBe('New Word document');
    expect(jsonData.content).toBe('PQwd5Q0hHN8YCUpJ2tcnlg==');
  })
  .catch(() => {
    expect(null).not.toBeNull();
  });
});

// Post new Excel spreadsheet
const createExcelData = {
  typeOfPost: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  title: 'New Excel spreadsheet',
  content: 'Ht0IqLH4jSA0Fo4Wqgp20Q=='
};
test('Check newPost with type application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', () => {
  return http.fetch('http://localhost:1337/api/boards/1/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createExcelData)
  })
  .then((response) => {
    expect(response.status).toBe(200);
    return response.json();
  })
  .then((jsonString) => {
    // Check for valid data
    const jsonData = JSON.parse(jsonString);
    expect(jsonData.typeOfPost).toBe('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    expect(jsonData.title).toBe('New Excel spreadsheet');
    expect(jsonData.content).toBe('Ht0IqLH4jSA0Fo4Wqgp20Q==');
  })
  .catch(() => {
    expect(null).not.toBeNull();
  });
});

// Post new PowerPoint presentation
const createPowerPointData = {
  typeOfPost: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  title: 'New PowerPoint presentation',
  content: 'n6WSUANntSR1B5z3vjT1bQ=='
};
test('Check newPost with type application/vnd.openxmlformats-officedocument.presentationml.presentation', () => {
  return http.fetch('http://localhost:1337/api/boards/1/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createPowerPointData)
  })
  .then((response) => {
    expect(response.status).toBe(200);
    return response.json();
  })
  .then((jsonString) => {
    // Check for valid data
    const jsonData = JSON.parse(jsonString);
    expect(jsonData.typeOfPost).toBe('application/vnd.openxmlformats-officedocument.presentationml.presentation');
    expect(jsonData.title).toBe('New PowerPoint presentation');
    expect(jsonData.content).toBe('n6WSUANntSR1B5z3vjT1bQ==');
  })
  .catch(() => {
    expect(null).not.toBeNull();
  });
});
