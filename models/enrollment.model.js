import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default (sequelize, DataTypes) => {
  const Enrollment = sequelize.define("Enrollment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enrollmentDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    progress: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },
  });

  return Enrollment;
};