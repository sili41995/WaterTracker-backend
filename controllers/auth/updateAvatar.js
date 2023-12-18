const { User } = require('../../models/user');
const { ctrlWrapper, updateImage, getImageFilename } = require('../../utils');

const updateAvatar = async (req, res, next) => {
  const { avatar, _id: id } = req.user;
  const { path } = req.file;
  const imageFilename = getImageFilename(avatar);
  const { url: avatarURL } = await updateImage({
    path,
    imageFilename,
  });
  const result = await User.findByIdAndUpdate(id, { avatar: avatarURL });

  res.status(200).json({ avatar: result.avatar });
};

module.exports = ctrlWrapper(updateAvatar);
