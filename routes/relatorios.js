const sequelize = require('../config/db.js');
const Cliente = require('../models/cliente.js')
const Pedido = require('../models/pedido.js')

module.exports = app => {


    app.get('/relatorio-produtos', async (req, res) => {

        const query = `
        SELECT
                id_cliente,
                Nome_Cliente,
                GROUP_CONCAT(Descricao_Pedido ORDER BY id_pedido SEPARATOR '\n---\n') AS Descricao_Pedidos,
                SUM(Valor_Total_Pedido) AS Valor_Total_Pedido
            FROM (
                SELECT
                    c.id AS id_cliente,
                    c.nome AS Nome_Cliente,
                    CONCAT(pr.descricao_produto, ' (', p.qtde_pedido, ')') AS Descricao_Pedido,
                    (pr.valor_produto * p.qtde_pedido) AS Valor_Total_Pedido,
                    p.id_pedido
                FROM pedidos p
                JOIN clientes c ON p.id_cliente = c.id
                JOIN produtos pr ON p.id_produto = pr.id
            ) AS subquery
            GROUP BY Nome_Cliente, id_cliente;

            `;

        await sequelize.query(query)
            .then(([results]) => {
                const flattenedResults = results.flat();
                return res.json({
                    erro: false,
                    result: flattenedResults
                });
            }).catch(() => {
                return res.status(400).json({
                    erro: true,
                    mensagem: "Erro, nenhum pedido encontrado!"
                });
            });
    });

}
