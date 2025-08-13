import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default (sequelize, DataTypes) => {
  class Lesson extends Model {}
  Lesson.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Duration in minutes",
      },
      videoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Lesson",
      tableName: "lessons",
    }
  );
  return Lesson;
};
