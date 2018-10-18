const fs = require('fs');
const northcoders = require('./northcoders');
const http = require('http');

let interests = [];
let count = 0;
northcoders.forEach((person, index) => {

  const options = {
    hostname: 'nc-leaks.herokuapp.com',
    path: `/api/people/${person.username}/interests`,
    method: 'GET',
    headers: {}
  }

  const req = http.request(options, (response) => {
    let info = '';

    response.on('data', (data) => {
      info += data.toString();
    });

    response.on('end', () => {
      interests.push(info);
      count++;
      if (count === northcoders.length) {
        fs.writeFile('northcodersInterests.js', `const northcodersInterests = [${interests}]`, 'utf-8', (error) => {
          if (error) {
            throw error;
          }
        })
      }
    })
  })
  req.on('error', (error) => {
    if (error) {
      throw error;
    }
  })

  req.end();


})