const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Enrollment extends Model {}

Enrollment.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id',
        },
    },
}, {
    sequelize,
    modelName: 'Enrollment',
    tableName: 'enrollments',
    timestamps: true,
});

module.exports = Enrollment;