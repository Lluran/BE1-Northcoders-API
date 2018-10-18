function getPetsAsync() {

  
  const northcoders = require('./northcoders');
  const http = require('http');

  let pets = [];
  let count = 0;
  const northcodersWithUsernames = northcoders.filter(coder => {
    return coder.username !== "";
  })
  northcodersWithUsernames.forEach((person) => {
    
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
        if (!info.includes('404')) {
          pets.push(info);
        }

        count++;
        if (count === northcodersWithUsernames.length) {
          const fs = require('fs');
          fs.writeFile('northcodersPets.js', `const northcodersPets = [${pets}]`, 'utf-8', (error) => {
            if (error) {
              throw error;
            }
          })
          const northcoders = require('./northcoders');
          const http = require('http');

          let interests = [];
          let count2 = 0;
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
                  interests.push(info);
                }
                count2++;
                if (count2 === northcodersWithUsernames.length) {
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

module.exports = getPetsAsync;