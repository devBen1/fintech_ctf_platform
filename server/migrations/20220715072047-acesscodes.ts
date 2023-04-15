import { QueryInterface, DataTypes } from "sequelize";
import { userdata } from "../types/models/userdata";
import AccesscodeType = userdata.Accesscodes;

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.createTable<AccesscodeType>(
				"Accesscodes",
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
					passcode: {
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
					deletedAt: {
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
			await queryInterface.dropTable("Accesscodes", { transaction });
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},
};
