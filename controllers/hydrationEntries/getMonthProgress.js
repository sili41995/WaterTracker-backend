const { ctrlWrapper } = require('../../utils');
const { HydrationEntry } = require('../../models/hydrationEntry');

const getMonthProgress = async (req, res, next) => {
  console.log(req.user);
  const result = await HydrationEntry.aggregate();
  console.log(result);
};

module.exports = ctrlWrapper(getMonthProgress);
