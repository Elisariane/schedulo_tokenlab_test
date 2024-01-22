const { Event } = require('../models');

const eventsController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = eventsController;