const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Lesson extends Model {}

Lesson.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'courses', // refers to the Course model
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Lesson',
    tableName: 'lessons',
    timestamps: true,
});

module.exports = Lesson;