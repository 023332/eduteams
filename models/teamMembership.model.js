import { DataTypes } from "sequelize";
import  sequelize  from "../config/database.js";

export default (sequelize, DataTypes) => {
  const TeamMembership = sequelize.define("TeamMembership", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return TeamMembership;
};