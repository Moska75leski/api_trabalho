const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Pedido = require('./pedido');

const Cliente = sequelize.define('Cliente', {
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

//Cliente.belongsTo(Pedido, { foreignKey: 'pedido_id', allowNull: false });

module.exports = Cliente;
