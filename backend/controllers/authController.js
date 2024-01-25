const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _  = require('lodash');
const SECRET = 'asbadbbdbbh7788888887hb113h3hbb';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authController = {
  register: async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (user) {
        res.status(401).json({ error: 'Unauthorized' });
      }

      req.body.password = await bcrypt.hash(req.body.password, 12);

      try {
        const user = await prisma.user.create({
          data: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          }
        });
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
          'Access-Control-Allow-Headers',
          'Origin, X-Requested-With, Content-Type, Accept'
        );
        res.status(201).json({ user });
      } catch (error) {
        res.status(500).json({ error: `In create user ${error} response` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
      
      const validPassword = await bcrypt.compare(password, user.password);
        

      if (!user || !(validPassword)) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const id = user.id;
      const token = jwt.sign({
        user: _.pick(user[0], ['id', 'email']),
      }, 
      SECRET,{
        expiresIn: '1h',
      });
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      res.status(200).json({ token, id });
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = authController;
