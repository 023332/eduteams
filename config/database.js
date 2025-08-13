import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
} = process.env;

const CONFIGS = {
    host: DB_HOST,
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true,
    },
    logging: false,
};

const MYSQL = new Sequelize(
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    CONFIGS
);

(async () => {
    try {
        await MYSQL.authenticate();
        console.log(' MYSQL authenticated successfully.');
    } catch (err) {
        console.error(' MYSQL authentication failed');
        console.error(err.stack);
        process.exit(1);
    }
})();

export default MYSQL;