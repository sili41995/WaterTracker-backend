const preUpdate = function (next) {
  this.options.new = true;
  this.options.runValidators = true;
  next();
};

const handleMongooseError = (error, data, next) => {
  error.status = 400;
  next();
};

module.exports = { preUpdate, handleMongooseError };
