const Pedido = require('../models/pedido.js');

module.exports = app => {

    app.get('/pedido', (req, res) => {
        Pedido.findAll()
            .then((pedidos) => {
                res.status(200).json(pedidos);
            })
            .catch((error) => {
                console.error('Erro ao buscar Pedido:', error);
                res.status(500).json({ error: 'Erro ao buscar Pedido.' });
            });
    });

    app.post('/cadastrarPedido', async (req, res) => {
        console.log({ ...req.body })
        const { id_funcionario, id_cliente, id_produto, qtde_pedido } = req.body;

        const verificarPedido = await Pedido.findOne({ where: {id_funcionario: id_funcionario } })
        if (verificarPedido === null) {
            try {
                const novoPedido = await Pedido.create({
                    id_funcionario, id_cliente, id_produto, qtde_pedido
                });

                res.status(201).send("Pedido cadastrado com sucesso!")
            } catch (error) {
                console.error('Erro ao criar Pedido:', error);
                res.status(500).json({ error: 'Erro ao criar Pedido.' })
            }
        } else {
            res.status(201).send("Pedido já cadastrado!")
        }

    });

    app.put('/atualizarPedido', async (req, res) => {
        console.log({ ...req.body })
        try {
            const { id, id_funcionario, descricao_produto, valor_produto, qtde_pedido } = req.body;

            const atualizarPedido = await Pedido.update({
                id, id_funcionario, descricao_produto, valor_produto, qtde_pedido
            }, {
                where: {
                    id: id
                }
            });

            res.status(201).send("Atualizado com sucesso!")
        } catch (error) {
            console.error('Erro ao atualizar pedido:', error);
            res.status(500).json({ error: 'Erro ao atualizar pedido.' })
        }
    });

    app.delete('/deletarPedido', async (req, res) => {
        console.log({ ...req.body })
        try {
            const { id } = req.body;
            const deletarPedido = await Pedido.destroy({
                where: {
                    id: id
                }
            });

            res.status(201).send("Excluído com sucesso!")
        } catch (error) {
            console.error('Excluir pedido:', error);
            res.status(500).json({ error: 'Excluir pedido.' })
        }
    });
}