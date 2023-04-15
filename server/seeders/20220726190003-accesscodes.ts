import { QueryInterface, CreationAttributes } from "sequelize";
import bcryptjs from 'bcryptjs';

import { userdata } from "../types/models/userdata";
import AccesscodeType = userdata.Accesscodes;

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.transaction(async (transaction) => {
			try {
				const accesscodeData: Array<CreationAttributes<AccesscodeType>> = [
					{
						customer: "787487",
						passcode: bcryptjs.hashSync("NAIRA_ACCOUNT", 10),
						createdAt: new Date(),
						updatedAt: new Date()
					},
					{
						customer: "787487",
						passcode: bcryptjs.hashSync("DOLLAR_ACCOUNT", 10),
						createdAt: new Date(),
						updatedAt: new Date()
					}
				];

				await queryInterface.bulkInsert("Accesscodes", accesscodeData, {
					transaction
				});

			} catch (error) {
				console.log(error);
			}
		});
	},
	down: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.transaction(async (transaction) => {
			try {
				await queryInterface.bulkDelete("Accesscodes", {}, { transaction });
			} catch (error) {
				console.log(error);
			}
		});
	},
};