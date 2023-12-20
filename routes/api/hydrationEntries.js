const express = require('express');
const { authenticate, validateBody, isValidId } = require('../../middlewares');
const { add, getById } = require('../../controllers/hydrationEntries');
const {
  addHydrationEntrySchema,
  updateHydrationEntrySchema,
} = require('../../models/hydrationEntry');

const router = express.Router();

router.use(authenticate);

router.post('/', validateBody(addHydrationEntrySchema), add);
router.put(
  '/:entryId',
  isValidId,
  validateBody(updateHydrationEntrySchema),
  getById
);

module.exports = router;
