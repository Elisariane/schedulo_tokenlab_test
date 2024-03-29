const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const eventsController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await prisma.event.findMany();

      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getEventById: async (req, res) => {
    const { id } = req.params;
    try {
      const event = await prisma.event.findUnique({ where: { id: id } });
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }

      res.json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getEventByUserId: async (req, res) => {
    const { userId } = req.params;
    try {
      const events = await prisma.event.findMany({ where: { userId:  {
        equals: userId,
      },} });

      if (!events.length) {
        return res.status(404).json({ error: 'Event not found' });
      }
      
      res.json(events);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createEvent: async (req, res) => {
    const { title, description, startTime, endTime, userId } = req.body;
    try {
      const event = await prisma.event.create({
        data: {
          title,
          description,
          startTime,
          endTime,
          userId,
        },
      });
    
      res.status(201).json(event);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateEvent: async (req, res) => {
    const { id } = req.params;
    const { title, description, startTime, endTime, userId } = req.body;

    try {
      const updatedEvent = await prisma.event.update({
        where: {
          id: id,
        },
        data: {
          title,
          description,
          startTime,
          endTime,
          userId,
        },
      });
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  deleteEvent: async (req, res) => {
    const { id } = req.params;

    try {
      await prisma.event.delete({
        where: {
          id: id,
        },
      });

      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = eventsController;
