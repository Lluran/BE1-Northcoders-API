const fs = require('fs');
const northcoders = require('./northcoders');
const http = require('http');

let pets = [];
let count = 0;
northcoders.forEach((person) => {

  const options = {
    hostname: 'nc-leaks.herokuapp.com',
    path: `/api/people/${person.username}/pets`,
    method: 'GET',
    headers: {}
  }

  const req = http.request(options, (response) => {
    let info = '';

    response.on('data', (data) => {
      info += data.toString();
    });

    response.on('end', () => {
      pets.push(info);
      count++;
      if (count === northcoders.length) {
        fs.writeFile('northcodersPets.js', `const northcodersPets = [${pets}]`, 'utf-8', (error) => {
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