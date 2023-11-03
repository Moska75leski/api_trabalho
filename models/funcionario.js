const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importe a instância do Sequelize configurada

const Funcionario = sequelize.define('Funcionario',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_funcionario:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cargo_funcionario:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Funcionario;