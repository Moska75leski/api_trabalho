const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Produto = sequelize.define('Produto',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_produto:{
        type: DataTypes.STRING,
        allowNull: false
    },
    valor_produto:{
        type: DataTypes.STRING,
        allowNull: false
    }
    ,
    descricao_produto:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Produto;