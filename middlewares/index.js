const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const authenticate = require('./authenticate');
const upload = require('./upload');
const fileUploadError = require('./fileUploadError');

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  fileUploadError,
};
