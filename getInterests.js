//function getInterestsAsync() {

  const fs = require('fs');
  const http = require('http');

  let interests = [];
  let count = 0;
  fs.readFile(`${__dirname}/northcoders.json`, 'utf-8', (error, data)=>{
    if (error) {
      throw error
    }
    else {
    const northcoders = JSON.parse(data);
    const northcodersWithUsernames = northcoders.filter(coder => {
      return coder.username !== "";
    })
    northcodersWithUsernames.forEach((person, index) => {

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
          if (!info.includes('404')) {
            let infoDone = JSON.parse(info);
            interests.push(infoDone);
          }
          count++;
          if (count === northcodersWithUsernames.length) {
            fs.writeFile('northcodersInterests.json',JSON.stringify(interests, null, 2), 'utf-8', (error) => {
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
    }
  })
 


//}

//module.exports = getInterestsAsync;