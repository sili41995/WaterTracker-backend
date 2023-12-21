const bcrypt = require('bcryptjs');
const httpError = require('./httpError');

const getHashPassword = async ({ currentPassword, updateInfo }) => {
  const { passwordOutdated, password, passwordRepeat } = updateInfo;
  const isValidOutdatedPassword = await bcrypt.compare(
    passwordOutdated,
    currentPassword
  );
  const isValidNewPassword = password === passwordRepeat;

  if (!isValidOutdatedPassword || !isValidNewPassword) {
    throw httpError({ status: 400, message: 'Password is wrong' });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  return hashPassword;
};

module.exports = getHashPassword;
