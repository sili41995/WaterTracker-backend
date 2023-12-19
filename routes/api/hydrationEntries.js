const express = require('express');
const { authenticate, validateBody } = require('../../middlewares');
const { add } = require('../../controllers/hydrationEntries');
const { addHydrationEntrySchema } = require('../../models/hydrationEntry');

const router = express.Router();

router.post('/', authenticate, validateBody(addHydrationEntrySchema), add);

module.exports = router;
