import db from '../../models/index';
import { Op, CreationAttributes, IncludeOptions, InferAttributes } from "sequelize";
import { QueryHelper } from "../../custom/helpers/query.helper";
import Finances from '../../models/finance';
import Users from '../../models/user';
import Accesscodes from '../../models/accesscode';


export default class AppointmentService {
    private static queryHelper = new QueryHelper();

    constructor() { }

    public static async GetUserInfo(userData: any) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.credQuery(Users, "findOne", {
                    where: userData,
                    include: [
                        {
                            model: Finances,
                            as: "finances",
                            attributes: [
                                "accountType",
                                "balance",
                                "accountNo"
                            ],
                            transaction,
                        },
                        {
                            model: Accesscodes,
                            as: "accesscodes",
                            attributes: [
                                "passcode"
                            ],
                            transaction,
                        } as IncludeOptions,
                    ],
                    attributes: [
                        "customerUID", "customerName",
                        "dob", "customerEmail",
                        "transactionPin"
                    ],
                    paranoid: false,
                    transaction,
                });
            });
        } catch (error) {
            console.error(error);
        }
    }

    public static async UpdateUser(data: any, customerUID: string) {
        try {
            return db.transaction(async (transaction) => {
                return await Users.update(data, {
                    where: { customerUID },
                    transaction,
                }
                );
            });
        } catch (error) {
            console.error(error);
        }
    }

    public static async AddAccessCode(data: any) {
        try {
            return db.transaction(async (transaction) => {
                return await this.queryHelper.credQuery(Accesscodes, "create", data);
            });
        } catch (error) {
            console.error(error);
        }
    }

}
