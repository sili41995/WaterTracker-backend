const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { preUpdate, handleMongooseError } = require('./hooks');
const { errorMessages, regExp } = require('../constants');

const { emailRegExp } = regExp;

const {
  emailRegExpErr,
  emailRequiredErr,
  passwordRequiredErr,
  passwordMinLengthErr,
  passwordMaxLengthErr,
} = errorMessages;

const userSchemaPasswordSettings = {
  type: String,
  minLength: [8, passwordMinLengthErr],
  maxLength: [48, passwordMaxLengthErr],
  required: [true, passwordRequiredErr],
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: [emailRegExp, emailRegExpErr],
      required: [true, emailRequiredErr],
      unique: true,
    },
    password: userSchemaPasswordSettings,
    passwordRepeat: userSchemaPasswordSettings,
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
  passwordRepeat: passwordSettings,
});

const signInSchema = Joi.object({
  email: emailSettings,
  password: passwordSettings,
});

const User = model('user', userSchema);

module.exports = { User, signUpSchema, signInSchema };
