const Usuario = require('../models/usuario.js');

module.exports = app => {

    app.get('/usuarios', (req, res, next) => {
        console.log(req.user + 'fez esta chamada!');
        //res.json([{ nome, senha}]);

        Usuario.findAll()
            .then((usuarios) => {
                res.status(200).json(usuarios)
            })
            .catch((error) => {
                console.error('Erro ao buscar usuários:', error)
                res.status(500).json({ error: 'Erro ao buscar usuários.' })
            });
    });

    app.post('/cadastrarUsuario', async (req, res) => {
        console.log({ ...req.body })
        const { nome, senha } = req.body;

        const verificarUsuario = await Usuario.findOne({ where: { nome: nome } })
        if (verificarUsuario === null) {
            try {
                const novoUsuario = await Usuario.create({
                    nome, senha
                });

                res.status(201).send("Usuário cadastrado com sucesso!")
            } catch (error) {
                console.error('Erro ao criar usuário:', error);
                res.status(500).json({ error: 'Erro ao criar usuário.' })
            }
        } else {
            res.status(201).send("Usuário já cadastrado!")
        }

    });

}
