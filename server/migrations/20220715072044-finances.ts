import { QueryInterface, DataTypes } from "sequelize";
import { userdata } from "../types/models/userdata";
import FinanceType = userdata.Finances;

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable<FinanceType>(
				"Finances",
				{
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: DataTypes.INTEGER,
					},
					customer: {
						type: DataTypes.STRING,
						allowNull: false,
						onDelete: 'CASCADE',
						references: {
							model: 'Users',
							key: 'customerUID',
						},
					},
					accountNo: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					accountType: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					balance: {
						type: DataTypes.STRING,
						allowNull: false,
					},
					createdAt: {
						allowNull: false,
						type: DataTypes.DATE,
					},
					updatedAt: {
						allowNull: false,
						type: DataTypes.DATE,
					},
				},
				{
					charset: "utf8mb4",
					collate: "utf8mb4_unicode_ci",
					transaction,
				}
			);
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	down: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.dropTable("Finances", { transaction });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
