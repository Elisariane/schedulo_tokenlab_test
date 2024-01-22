const jwt = require('jsonwebtoken');
const { User } = require('../models');

const authController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const user = await User.create({ name, email, password });
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = jwt.sign({ userId: user.id }, 'secretpassphrase', {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = authController;
