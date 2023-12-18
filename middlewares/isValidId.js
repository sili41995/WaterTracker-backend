const { isValidObjectId } = require('mongoose');
const { httpError } = require('../utils');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    return next(
      httpError({ status: 404, message: `${contactId} is not valid id` })
    );
  }
  next();
};

module.exports = isValidId;
