import { Sequelize, DataTypes } from 'sequelize';


const Event = Sequelize.define('Event', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


Event.associate = (models) => {
  Event.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'creator',
  });
  Event.belongsToMany(models.User, {
    through: 'EventRegistration',
    foreignKey: 'eventId',
    as: 'registrants',
  });
};

export default Event;