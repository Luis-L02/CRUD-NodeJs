import Sequelize from 'sequelize';
import tedious from 'tedious';
import dotenv from 'dotenv';
dotenv.config();

const bd = new Sequelize({
    dialect: 'mssql',
    dialectModule: tedious,
    host: process.env.BD_Host,
    port: process.env.BD_Port,
    database: process.env.BD_Nombre,
    username: process.env.BD_User,
    password: process.env.BD_Pass,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000 
    },
    operatorAliases: false
  });


export default bd;