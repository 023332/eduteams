import { DataTypes } from "sequelize";
import  sequelize  from "../config/database.js";
import Team from "./team.model.js";

export default (sequelize, DataTypes) => {
  const Course = sequelize.define("Course", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Course;
};