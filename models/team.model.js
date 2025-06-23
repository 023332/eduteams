import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";

export default (sequelize, DataTypes) => {
  class Team extends Model {}
  Team.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Do NOT put `references` here when you use associations below
      },
    },
    {
      sequelize,
      modelName: "Team",
      tableName: "teams",
    }
  );
  return Team;
};