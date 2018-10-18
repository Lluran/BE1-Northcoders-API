function initialiseFindNorthcodersAsync(callback){

const http = require('http');
const fs = require('fs');

const options = {
  hostname: 'nc-leaks.herokuapp.com',
  path: '/api/people',
  method: 'GET',
  headers: {}
}

const req = http.request(options, (response) => {
  let info = ''

  response.on('data', (data) => {
    info += data.toString();
  })

  response.on('end', () => {
    const object = JSON.parse(info).people;
    const northcoders = [];
    object.forEach(personInfo => {
      if (personInfo.job.workplace === "northcoders") {
        northcoders.push(personInfo);
      }
    })

    fs.writeFile('northcoders.js', `const northcoders = ${JSON.stringify(northcoders, null, 2)} \n module.exports = northcoders;`, 'utf-8', (error) => {
      if (error) {
        throw error
      };
      callback();
    })
  })

})

req.on('error', (error) => {
  if (error) {
    throw error;
  }
})

req.end();}

module.exports = initialiseFindNorthcodersAsync;