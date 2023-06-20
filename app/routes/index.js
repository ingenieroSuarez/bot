const express = require('express');
const router = express.Router();

router.use('/canal/whatsApp', require('./WhatsApp'));
router.use('/canal/Telegram', require('./Telegram'));
router.use('/canal/Slack', require('./Slack'));

module.exports= router;