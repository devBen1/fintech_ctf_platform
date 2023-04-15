import { QueryInterface, CreationAttributes } from "sequelize";

import { userdata } from "../types/models/userdata";
import FinanceType = userdata.Finances;

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.transaction(async (transaction) => {
			try {
				const financeData: Array<CreationAttributes<FinanceType>> = [
					{
						customer: "787487",
						accountNo: "2485024796",
						accountType: "NAIRA_ACCOUNT",
						balance: "1,480,540.00",
						createdAt: new Date(),
						updatedAt: new Date()
					},
					{
						customer: "787487",
						accountNo: "7024867810",
						accountType: "DOLLAR_ACCOUNT",
						balance: "210,660.00",
						createdAt: new Date(),
						updatedAt: new Date()
					}
				];

				await queryInterface.bulkInsert("Finances", financeData, {
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
				await queryInterface.bulkDelete("Finances", {}, { transaction });
			} catch (error) {
				console.log(error);
			}
		});
	},
};