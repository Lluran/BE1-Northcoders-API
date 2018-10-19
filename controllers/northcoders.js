const fs = require('fs');

exports.getNorthcoders = (response, queries) => {
  fs.readFile(`./models/northcoders.json`, 'utf-8', (error, data) => {
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

exports.getSpecificNorthcoder = (response, userName) => {
  fs.readFile(`./models/northcoders.json`, 'utf-8', (error, data) => {
    if (error) {
      throw error
    } else {
      const northcoders = JSON.parse(data);
      const person = northcoders.filter(employee => {
        return employee.username === userName;
      });
      if (person[0] === undefined) {
        response.setHeader('Content-Type', 'application/JSON')
        response.statusCode = 404;
        response.write(JSON.stringify('Unable to find the information requested'));
        response.end();
      } else {
        response.setHeader('Content-Type', 'application/JSON');
        response.statusCode = 200;
        response.write(JSON.stringify(person));
        response.end();
      }
    }
  })
}