'use strict';
const bcrypt = require('bcrypt');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Event, { foreignKey: 'userId' });
    }

    async comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        },
      },
    
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
