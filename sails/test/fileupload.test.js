// Testing the PostController with Jest
const http = require('./fetch.js');

// Post new PDF
const createData = {
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
    body: JSON.stringify(createData)
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
