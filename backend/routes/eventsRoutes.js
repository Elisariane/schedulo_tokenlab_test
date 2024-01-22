const express = require('express');
const router = express.Router();
const eventsController =  require('../controllers/eventsController');

router.get('/events', eventsController.getAllEvents);
router.get('/events/:id', eventsController.getEventById);

module.exports = router;