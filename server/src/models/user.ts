import { DataTypes } from 'sequelize';
import { users } from "../../types/models/users";
import db from './index';
import Accesscodes from './accesscode';
import Finance from './finance';

import Users = users.Users;

const Users = db.define<Users>(
    "Users",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        customerUID: {
            allowNull: false,
            unique: true,
            type: DataTypes.STRING,
        },
        customerName: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        customerEmail: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        dob: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        transactionPin: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        refreshToken: {
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

Users.hasMany(Accesscodes, {
    as: 'accesscodes',
    foreignKey: 'customer',
    sourceKey: 'customerUID'
});
Accesscodes.belongsTo(Users, {
    foreignKey: 'customer',
    targetKey: 'customerUID',
    onDelete: 'CASCADE'
});

Users.hasMany(Finance, {
    as: 'finances',
    foreignKey: 'customer',
    sourceKey: 'customerUID'
});
Finance.belongsTo(Users, {
    foreignKey: 'customer',
    targetKey: 'customerUID',
    onDelete: 'CASCADE'
});

export default Users;