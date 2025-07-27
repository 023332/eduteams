const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Course extends Model {}

Course.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Course',
  tableName: 'courses',
  timestamps: true,
});

module.exports = Course;