import  { Sequelize }  from 'sequelize';
import User from './user.js';
import Event from './event.js';
import EventRegistration from './eventRegistration.js';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new sequelize(process.env.DB_CONNECTION_STRING, {
  dialect: 'mysql',
  logging: false,
});


const db = {
  sequelize,
  Sequelize,
  User: User(sequelize, Sequelize),
  Event: Event(sequelize, Sequelize),
  EventRegistration: EventRegistration(sequelize, Sequelize),
};

db.User.belongsToMany(db.Event, { through: db.EventRegistration });
db.Event.belongsToMany(db.User, { through: db.EventRegistration });

export default db;
export { sequelize };