import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

import userModel from "./user.model.js";
import teamModel from "./team.model.js";
import courseModel from "./course.model.js";
import lessonModel from "./lesson.model.js";
import teamMembershipModel from "./teamMembership.model.js";

// Initialize models
const User = userModel(sequelize, Sequelize.DataTypes);
const Team = teamModel(sequelize, Sequelize.DataTypes);
const Course = courseModel(sequelize, Sequelize.DataTypes);
const Lesson = lessonModel(sequelize, Sequelize.DataTypes);
const TeamMembership = teamMembershipModel(sequelize, Sequelize.DataTypes);

// Define associations
User.hasMany(Team, { foreignKey: 'ownerId' });
Team.belongsTo(User, { foreignKey: 'ownerId' });

Team.hasMany(Course, { foreignKey: 'teamId' });
Course.belongsTo(Team, { foreignKey: 'teamId' });

Course.hasMany(Lesson, { foreignKey: 'courseId' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

User.belongsToMany(Team, { through: TeamMembership, foreignKey: 'userId' });
Team.belongsToMany(User, { through: TeamMembership, foreignKey: 'teamId' });

export { sequelize, User, Team, Course, Lesson, TeamMembership };