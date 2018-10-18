const https = require('https');
const fs = require('fs');

const options = {
  hostname: 'nc-leaks.herokuapp.com',
  path: '/api/confidential',
  method: 'GET',
  headers: {}
}

const req = https.request(options, (response) => {
  let body = '';
  response.on('data', (data) => {
    body += data.toString();
  })
  response.on('end', () => {
    fs.writeFile('instructions.md', JSON.parse(body).crypticString, 'utf-8', (error) => {
      if (error) {
        throw error;
      }
    })
  })
})

req.on('error', (error) => {
  console.log(error);
})

req.end();














module.exports = { /* Your variables here */ }