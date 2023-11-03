const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('restaurante_api', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

module.exports = sequelize;