const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importe a instância do Sequelize configurada

const Pedido = sequelize.define('Pedido',{
    id_pedido:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    id_funcionario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_cliente:{
        type: DataTypes.STRING,
        allowNull: false
    },
    id_produto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    qtde_pedido:{
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Pedido;