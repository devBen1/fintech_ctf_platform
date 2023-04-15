import dotenv from "dotenv";
import { Options } from "sequelize";

dotenv.config();

interface ConfigTs {
	development: Options;
	test: Options;
	production: Options;
}

const configDB: ConfigTs = {
	development: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "mysql",
		dialectOptions: {
			bigNumberStrings: true,
			charset: "utf8",
		},
		define: {
			timestamps: true,
		},
	},
	test: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "mysql",
		dialectOptions: {
			bigNumberStrings: true,
			charset: "utf8",
		},
		define: {
			timestamps: true,
		},
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: "mysql",
		dialectOptions: {
			charset: "utf8",
			multipleStatements: true,
			bigNumberStrings: true,
		},
		logging: false,
		define: {
			timestamps: true,
		},
	},
};
export default configDB;
