const Cliente = require('../models/cliente.js');
const jwt = require('jsonwebtoken');

module.exports = app => {

    /*function verifyJWT(req, res, next){
        const token = req.headers['x-access-token'];
        if(!token) return res.status(401).json({ auth: false, message: 'No token provided'});

        jwt.verify(token, process.env.SECRET, function(err, decoded){
            if(err) return res.status(500).json({ auth: false, message: 'Failed to auth token'});
    
            req.id = decoded.id;
            next();
        })
    }*/


    app.get('/clientes', /*verifyJWT*/ (req, res, next) => {
        console.log (req.id  + ' Fez a chamada! ')
        Cliente.findAll()
            .then((clientes) => {
                res.status(200).json(clientes)
            })
            .catch((error) => {
                console.error('Erro ao buscar clientes:', error)
                res.status(500).json({ error: 'Erro ao buscar clientes.' })
            });
    });

    app.post('/cadastrarclientes', async (req, res) => {
        console.log({ ...req.body })
        const { nome, telefone } = req.body;

        const verificarcliente = await Cliente.findOne({ where: { nome: nome } })
        if (verificarcliente === null) {
            try {
                const novoCliente = await Cliente.create({
                    nome, telefone
                });

                res.status(201).send("Cliente cadastrado com sucesso!")
            } catch (error) {
                console.error('Erro ao criar cliente:', error);
                res.status(500).json({ error: 'Erro ao criar cliente.' })
            }
        } else {
            res.status(201).send("Cliente já cadastrado!")
        }

    });

    app.put('/atualizarclientes', async (req, res) => {
        console.log({ ...req.body })
        try {
            const { id, nome, telefone } = req.body;

            const atualizarclientes = await Cliente.update({
                nome, telefone
            }, {
                where: {
                    id: id
                }
            });

            res.status(201).send("Atualizado com sucesso!")
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            res.status(500).json({ error: 'Erro ao atualizar cliente.' })
        }
    });

    app.delete('/deletarclientes', async (req, res) => {
        console.log({ ...req.body })
        try {
            const { id } = req.body;
            const deletarcliente = await Cliente.destroy({
                where: {
                    id: id
                }
            });

            res.status(201).send("Excluído com sucesso!")
        } catch (error) {
            console.error('Excluir cliente:', error);
            res.status(500).json({ error: 'Excluir cliente.' })
        }
    });
}
