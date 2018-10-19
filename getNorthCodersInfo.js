const initialiseFindNorthcodersAsync = require('./findNorthcoders');
const getPetsAsync = require('./getPets');

initialiseFindNorthcodersAsync(getPetsAsync);
