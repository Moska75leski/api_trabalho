const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const consign = require('consign');
const bodyParser = require('body-parser');
require('dotenv').config();
const jwt = require('jsonwebtoken');

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(express.json())

db.sync()
    .then(() => {
        console.log('Modelos sincronizados com o banco de dados.');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar modelos:', error);
    });

consign()

    .then("./routes/clientes.js")
    .then("./routes/funcionarios.js")
    .then("./routes/pedidos.js")
    .then("./routes/produtos.js")
    .then("./routes/relatorios.js")
    .then("./config/middlewares.js")
    .then("./routes/usuarios.js")
    .then("./routes/login.js")
    .into(app)


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
