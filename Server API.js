const fs = require('fs');
const http = require('http');
const usernameURL = /\/api\/northcoders\/\w+$/gm;
const petsURL = /\/api\/pets\/\w+$/gm;

const server = http.createServer((request, response) => {

  if (request.url === '/api') {
    if (request.method === 'GET') {
      response.setHeader('Content-Type', 'application/JSON');
      response.statusCode = 200;
      response.write(JSON.stringify('Hi'));
      response.end();
    } else {

    }
  } else if (request.url === '/api/northcoders') {
    if (request.method === 'GET') {
      getNorthcoders(response);
    } else {

    }
  } else if (usernameURL.test(request.url)) {
    if (request.method === 'GET') {
      const usernameArr = request.url.match(/\w+$/gm);
      const userName = usernameArr[0];
      getSpecificNorthcoder(response, userName)
    } else {

    }
  } else if (petsURL.test(request.url)) {
    if (request.method === 'GET') {
      const usernameArr = request.url.match(/\w+$/gm);
      const userName = usernameArr[0];
      getCoderPets(response, userName);
    } else {

    }
  }

})

function getNorthcoders(response) {
  fs.readFile(`${__dirname}/northcoders.json`, 'utf-8', (error, data) => {
    if (error) {
      throw error
    } else {
      response.setHeader('Content-Type', 'application/JSON');
      response.statusCode = 200;
      response.write(data);
      response.end();
    }
  })
}

function getSpecificNorthcoder(response, userName) {
  fs.readFile(`${__dirname}/northcoders.json`, 'utf-8', (error, data) => {
    if (error) {
      throw error
    } else {
      const northcoders = JSON.parse(data);
      const person = northcoders.filter(employee => {
        return employee.username === userName;
      })
      response.setHeader('Content-Type', 'application/JSON');
      response.statusCode = 200;
      response.write(JSON.stringify(person));
      response.end();
    }
  })
}

function getCoderPets(response, userName) {
  fs.readFile(`${__dirname}/northcodersPets.json`, 'utf-8', (error, data) => {
    if (error) {
      throw error
    } else {
      const northcoders = JSON.parse(data);
      const coder = northcoders.filter(employee => {
        return employee.person.username === userName;
      })
      const petInfo = JSON.stringify(coder[0].person.pets);
      response.setHeader('Content-Type', 'application/JSON');
      response.statusCode = 200;
      response.write(petInfo);
      response.end();
    }
  })

}

server.listen(9090);