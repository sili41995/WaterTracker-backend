const { Schema, model } = require('mongoose');
const Joi = require('joi');
const hooks = require('./hooks');
const { errorMessages, regExp, profileSettings } = require('../constants');

const { emailRegExp } = regExp;
const { handleMongooseError, preUpdate } = hooks;
const { passMinLength, passMaxLength, genders } = profileSettings;

const {
  emailRegExpErr,
  emailRequiredErr,
  passwordRequiredErr,
  passwordMinLengthErr,
  passwordMaxLengthErr,
  passwordRepeatErr,
  passwordRepeatRequiredErr,
  genderEnumErr,
} = errorMessages;

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: [emailRegExp, emailRegExpErr],
      required: [true, emailRequiredErr],
      unique: true,
    },
    password: {
      type: String,
      minLength: [passMinLength, passwordMinLengthErr],
      required: [true, passwordRequiredErr],
    },
    token: {
      type: String,
      default: null,
    },
    avatar: String,
    gender: {
      type: String,
      enum: { values: genders, message: genderEnumErr },
    },
    name: String,
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', preUpdate);
userSchema.post('save', handleMongooseError);
userSchema.post('findOneAndUpdate', handleMongooseError);

const emailSettings = Joi.string().pattern(emailRegExp).messages({
  'any.required': emailRequiredErr,
  'string.pattern.base': emailRegExpErr,
});

const passwordSettings = Joi.string()
  .min(passMinLength)
  .max(passMaxLength)
  .messages({
    'any.required': passwordRequiredErr,
    'string.min': passwordMinLengthErr,
    'string.max': passwordMaxLengthErr,
  });

const passwordRepeatSettings = Joi.string()
  .valid(Joi.ref('password'))
  .messages({
    'any.required': passwordRepeatRequiredErr,
    'any.only': passwordRepeatErr,
  });

const signUpSchema = Joi.object({
  email: emailSettings.required(),
  password: passwordSettings.required(),
  passwordRepeat: passwordRepeatSettings.required(),
});

const signInSchema = Joi.object({
  email: emailSettings.required(),
  password: passwordSettings.required(),
});

const updateProfileSchema = Joi.object().messages({
  'object.min': 'Missing fields',
});

const User = model('user', userSchema);

module.exports = { User, signUpSchema, signInSchema, updateProfileSchema };
