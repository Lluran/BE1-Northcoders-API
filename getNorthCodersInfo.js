const initialiseFindNorthcodersAsync = require('./findNorthcoders');
const getPetsAsync = require('./getPets');
//const getInterestsAsync = require('./getInterests');

initialiseFindNorthcodersAsync(getPetsAsync);
