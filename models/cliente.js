import bd from '../config/bd.js';
import Sequelize from 'sequelize';

const Cliente = bd.define('clientes',{
    nombre:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    apellido:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false 
    },
    telefono:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

export default Cliente;