const express = require('express');
const router = express.Router()
const { referralController }  = require('../../../controllers')

router.post('/referral',referralController.create)

module.exports = router;