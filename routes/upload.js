const express = require('express')

const router = express.Router();
const uploadController = require('../controller/upload')

router.post('/',uploadController.upload);

module.exports = router;