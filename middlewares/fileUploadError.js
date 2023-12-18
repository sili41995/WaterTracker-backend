const { httpError } = require('../utils');

const fileUploadError = (req, res, next) => {
  if (!req.file) {
    return next(httpError({ status: 404, message: 'File is absent' }));
  }

  next();
};

module.exports = fileUploadError;
