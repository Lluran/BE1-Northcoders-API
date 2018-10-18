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
  const northcoders = [];object.forEach(personInfo => {
    if(personInfo.job.workplace === "northcoders") {
      northcoders.push(personInfo);
    }
  })
  
  fs.writeFile('northcoders.js', JSON.stringify(northcoders), 'utf-8', (error) => {
    if (error) {
      throw error
    }
  })
})

})

req.on('error', (error) => {
  if (error) {
    throw error;
  }
})

req.end();