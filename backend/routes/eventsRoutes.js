const express = require('express');
const router = express.Router();
const eventsController =  require('../controllers/eventsController');

router.get('/events', eventsController.getAllEvents);

module.exports = router;