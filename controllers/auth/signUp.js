const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { ctrlWrapper, httpError } = require('../../utils');
const uploadImage = require('../../utils/uploadImage');

const signUp = async (req, res, next) => {
  console.log(req.body);
  // const { url: avatar } = await uploadImage(req.file);
  // const { password, email } = req.body;
  // const user = await User.findOne({ email });
  // if (user) {
  //   throw httpError({ status: 409, message: 'Email already use' });
  // }
  // const hashPassword = await bcrypt.hash(password, 10);
  // const result = await User.create({
  //   ...req.body,
  //   avatar,
  //   password: hashPassword,
  // });
  // res.status(201).json({
  //   user: { name: result.name, email: result.email, avatar: result.avatar },
  // });
};

module.exports = ctrlWrapper(signUp);
