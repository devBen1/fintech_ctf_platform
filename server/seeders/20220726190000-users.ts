import { QueryInterface, CreationAttributes } from "sequelize";
import faker from "faker";

import { users } from "../types/models/users";
import UserType = users.Users;

import { uuid4, randomString } from "../src/custom/functions/randomGenerator";

export default {
	up: async (queryInterface: QueryInterface): Promise<void> => {
		await queryInterface.sequelize.transaction(async (transaction) => {
			try {
				const usersData: Array<CreationAttributes<UserType>> = [
					{
						customerUID: uuid4(),
						customerName: faker.name.findName(),
						dob: "25/02/87",
						customerEmail: faker.internet.email(),
						transactionPin: randomString(5),
						refreshToken: "",
						createdAt: new Date(),
						updatedAt: new Date()
					},
					{
						customerUID: uuid4(),
						customerName: faker.name.findName(),
						dob: "25/02/87",
						customerEmail: faker.internet.email(),
						transactionPin: randomString(5),
						refreshToken: "",
						createdAt: new Date(),
						updatedAt: new Date()
					},
					{
						customerUID: uuid4(),
						customerName: faker.name.findName(),
						dob: "25/02/87",
						customerEmail: faker.internet.email(),
						transactionPin: randomString(5),
						refreshToken: "",
						createdAt: new Date(),
						updatedAt: new Date()
					},
					{
						customerUID: "787487",
						customerName: "John Doe",
						dob: "03/11/92",
						customerEmail: "test@example.com",
						transactionPin: "145872",
						refreshToken: "",
						createdAt: new Date(),
						updatedAt: new Date()
					},
				];

				await queryInterface.bulkInsert("Users", usersData, {
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
				await queryInterface.bulkDelete("Users", {}, { transaction });
			} catch (error) {
				console.log(error);
			}
		});
	},
};