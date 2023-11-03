const Produto = require('../models/produto.js');

module.exports = app => {

    app.get('/produto', (req, res) => {
        Produto.findAll()
            .then((produtos) => {
                res.status(200).json(produtos);
            })
            .catch((error) => {
                console.error('Erro ao buscar Produto:', error);
                res.status(500).json({ error: 'Erro ao buscar Produto.' });
            });
    });

    app.post('/cadastrarProduto', async (req, res) => {
        console.log({ ...req.body })
        const { nome_produto, valor_produto, descricao_produto } = req.body;

        const verificarProduto = await Produto.findOne({ where: { nome_produto: nome_produto } })
        if (verificarProduto === null) {
            try {
                const novoProduto = await Produto.create({
                    nome_produto, valor_produto, descricao_produto
                });

                res.status(201).send("Produto cadastrado com sucesso!")
            } catch (error) {
                console.error('Erro ao criar Produto:', error);
                res.status(500).json({ error: 'Erro ao criar Produto.' })
            }
        } else {
            res.status(201).send("Produto já cadastrado!")
        }

    });

    app.put('/atualizarProduto', async (req, res) => {
        console.log({ ...req.body })
        try {
            const { id, nome_produto, valor_produto, descricao_produto } = req.body;

            const atualizarProduto = await Produto.update({
                id, nome_produto, valor_produto, descricao_produto
            }, {
                where: {
                    id: id
                }
            });

            res.status(201).send("Atualizado com sucesso!")
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            res.status(500).json({ error: 'Erro ao atualizar produto.' })
        }
    });

    app.delete('/deletarProduto', async (req, res) => {
        console.log({ ...req.body })
        try {
            const { id } = req.body;
            const deletarProduto = await Produto.destroy({
                where: {
                    id: id
                }
            });

            res.status(201).send("Excluído com sucesso!")
        } catch (error) {
            console.error('Excluir produto:', error);
            res.status(500).json({ error: 'Excluir produto.' })
        }
    });
}