const profileSettings = require('./profileSettings');

const errorMessages = {
  emailRegExpErr: 'Email must be letters, digits, dot and @',
  emailRequiredErr: 'Missing required email field',
  passwordRequiredErr: 'Missing required password field',
  passwordMinLengthErr: 'Password length must be at least 8 characters long',
  passwordMaxLengthErr:
    'Password length must be no more than 48 characters long',
  passwordRepeatRequiredErr: 'Missing required password repeat field',
  passwordRepeatErr: 'The entered passwords must be the same',
  genderEnumErr: `Gender must be one of ${profileSettings.genders.join(
    ' or '
  )}`,
};

module.exports = errorMessages;
