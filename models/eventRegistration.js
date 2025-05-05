import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../models/index.js';


class EventRegistration extends Model {}

EventRegistration.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'EventRegistration',
  tableName: 'event_registrations',
  timestamps: true
});

export default EventRegistration;