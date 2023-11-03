const Funcionario = require('../models/funcionario.js'); 

module.exports = app => {

    app.get('/funcionario', (req, res) => {
        Funcionario.findAll() 
            .then((funcionarios) => {
                res.status(200).json(funcionarios); 
            })
            .catch((error) => {
                console.error('Erro ao buscar funcionarios:', error);
                res.status(500).json({ error: 'Erro ao buscar funcionarios.' });
            });
    });

    app.post('/cadastrarfuncionario', async (req, res) => {
        console.log({ ...req.body })
        const { nome_funcionario, cargo_funcionario } = req.body;

        const verificarfuncionario = await Funcionario.findOne({ where: { nome_funcionario: nome_funcionario } })
        if (verificarfuncionario === null) {
            try {
                const novoFuncionario = await Funcionario.create({
                    nome_funcionario, cargo_funcionario
                });

                res.status(201).send("Funcionário cadastrado com sucesso!")
            } catch (error) {
                console.error('Erro ao criar funcionario:', error);
                res.status(500).json({ error: 'Erro ao criar funcionario.' })
            }
        } else {
            res.status(201).send("Funcionário já cadastrado!")
        }

    });

    app.put('/atualizarfuncionario', async (req, res) => {
        console.log({ ...req.body })
        try {
            const { id, nome_funcionario, cargo_funcionario } = req.body;

            const atualizarfuncionario = await Funcionario.update({
                nome_funcionario, cargo_funcionario
            }, {
                where: {
                    id: id
                }
            });

            res.status(201).send("Atualizado com sucesso!")
        } catch (error) {
            console.error('Erro ao atualizar funcionário:', error);
            res.status(500).json({ error: 'Erro ao atualizar funcionário.' })
        }
    });

    app.delete('/deletarfuncionario', async (req, res) => {
        console.log({ ...req.body })
        try {
            const { id } = req.body;
            const deletarfuncionario = await Funcionario.destroy({
                where: {
                    id: id
                }
            });

            res.status(201).send("Excluído com sucesso!")
        } catch (error) {
            console.error('Excluir funcionário:', error);
            res.status(500).json({ error: 'Excluir funcionário.' })
        }
    });
}