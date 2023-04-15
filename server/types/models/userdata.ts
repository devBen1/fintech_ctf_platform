import {
	Model,
	CreationOptional,
	InferAttributes,
	InferCreationAttributes,
	ForeignKey,
} from "sequelize";
import { users } from "./users";
export namespace userdata {
    export interface Accesscodes
        extends Model<
            InferAttributes<Accesscodes>,
            InferCreationAttributes<Accesscodes>
        > {
        id: CreationOptional<number>;
		customer: ForeignKey<users.Users["customerUID"]>;
		passcode: string;
        createdAt?: CreationOptional<Date>;
        updatedAt?: CreationOptional<Date>;
        deletedAt?: Date;
    }
	export interface Finances
		extends Model<
			InferAttributes<Finances>,
			InferCreationAttributes<Finances>
		> {
		id: CreationOptional<number>;
		customer: ForeignKey<users.Users["customerUID"]>;
		accountNo: string;
		accountType: string;
		balance: string;
        createdAt?: CreationOptional<Date>;
        updatedAt?: CreationOptional<Date>;
		
	}
}