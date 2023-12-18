const { Schema, model } = require('mongoose');
const Joi = require('joi');
const hooks = require('./hooks');
const { errorMessages, regExp } = require('../constants');
const { passwordRepeatValidator } = require('../utils');

const { emailRegExp } = regExp;
const { handleMongooseError, preUpdate } = hooks;

const {
  emailRegExpErr,
  emailRequiredErr,
  passwordRequiredErr,
  passwordMinLengthErr,
  passwordMaxLengthErr,
  passwordRepeatErr,
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
      minLength: [8, passwordMinLengthErr],
      required: [true, passwordRequiredErr],
    },
    token: {
      type: String,
      default: null,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.pre('findOneAndUpdate', preUpdate);
userSchema.post('save', handleMongooseError);
userSchema.post('findOneAndUpdate', handleMongooseError);

const emailSettings = Joi.string().pattern(emailRegExp).required().messages({
  'any.required': emailRequiredErr,
  'string.pattern.base': emailRegExpErr,
});

const passwordSettings = Joi.string().min(8).max(48).required().messages({
  'any.required': passwordRequiredErr,
  'string.min': passwordMinLengthErr,
  'string.max': passwordMaxLengthErr,
});

const signUpSchema = Joi.object({
  email: emailSettings,
  password: passwordSettings,
  passwordRepeat: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.required': passwordRequiredErr,
    'any.only': passwordRepeatErr,
  }),
});

const signInSchema = Joi.object({
  email: emailSettings,
  password: passwordSettings,
});

const User = model('user', userSchema);

module.exports = { User, signUpSchema, signInSchema };
