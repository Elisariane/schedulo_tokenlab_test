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

  getEventById: async (req, res) => {
    const { id } = req.params;
    try {
      const event = await Event.findByPk(id);
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createEvent: async (req, res) => {
    const { title, description, startTime, endTime, userId } = req.body;
    try {
      const event = await Event.create({
        title,
        description,
        startTime,
        endTime,
        userId,
      });
      res.status(201).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};

module.exports = eventsController;