import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class User extends Model {

public id!: number;
public fullName!: string;
public email!: string;
public password!: string;
public readonly createdAt!: Date;
public readonly updatedAt!: Date;

}


User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,      
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,        
      validate: {
        isEmail: true,    
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,     
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",    
    timestamps: true,      
  }
);

export default User;