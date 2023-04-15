import { DataTypes } from 'sequelize';
import { userdata } from "../../types/models/userdata";
import db from './index';

import Accesscodes = userdata.Accesscodes;

const Accesscodes = db.define<Accesscodes>(
    "Accesscodes",
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
        passcode: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        createdAt: true,
        updatedAt: true,
        paranoid: true, // deletedAt
    },
);

export default Accesscodes;