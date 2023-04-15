import { DataTypes } from 'sequelize';
import { userdata } from "../../types/models/userdata";
import db from './index';

import Finances = userdata.Finances;

const Finances = db.define<Finances>(
    "Finances",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        customer: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        accountNo: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        accountType: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        balance: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: false,
    },
);

export default Finances;