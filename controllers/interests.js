const fs = require('fs');

exports.getCoderInterests = (response, userName, queries) => {
  fs.readFile(`./models/northcodersInterests.json`, 'utf-8', (error, data) => {
    if (error) {
      throw error
    } else {
      const northcoders = JSON.parse(data);
      const coder = northcoders.filter(employee => {
        return employee.person.username === userName;
      })
      if (coder[0] === undefined) {
        response.setHeader('Content-Type', 'application/JSON')
        response.statusCode = 404;
        response.write(JSON.stringify('Unable to find the information requested'));
        response.end();
      } else {
        const interestsInfo = JSON.stringify(coder[0].person.interests);
        response.setHeader('Content-Type', 'application/JSON');
        response.statusCode = 200;
        response.write(interestsInfo);
        response.end();
      }
    }
  })
}