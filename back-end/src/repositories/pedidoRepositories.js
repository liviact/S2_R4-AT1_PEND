import { connection } from "../configs/Database.js";
import { ItensPedido } from "../models/ItensPedido.js";

const pedidoRepository = {

    criar: async (pedido, itens) => {

        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction();

            // validar estoque
            for (const item of itens) {

                const [produto] = await conn.execute(
                    `
                    SELECT Estoque, Preco
                    FROM produtos
                    WHERE Id = ?
                    `,
                    [item.produtoId]
                );

                if (!produto.length) {
                    throw new Error("Produto não encontrado");
                }

                if (produto[0].Estoque < item.quantidade) {
                    throw new Error(
                        `Estoque insuficiente para produto ${item.produtoId}`
                    );
                }

                item.valorItem = produto[0].Preco;
                item.subTotal =
                    item.quantidade * item.valorItem;
            }

            const valorTotal =
                ItensPedido.calcularSubTotalItens(itens);

            // inserir pedido
            const [resultPedido] = await conn.execute(
                `
                INSERT INTO pedidos
                (ValorTotal, StatusPedido)
                VALUES (?, ?)
                `,
                [
                    valorTotal,
                    pedido.statusPedido
                ]
            );

            const pedidoId = resultPedido.insertId;

            // inserir itens
            for (const item of itens) {

                await conn.execute(
                    `
                    INSERT INTO itens_pedidos
                    (
                        PedidoId,
                        ProdutoId,
                        Quantidade,
                        ValorItem,
                        SubTotal
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        pedidoId,
                        item.produtoId,
                        item.quantidade,
                        item.valorItem,
                        item.subTotal
                    ]
                );

                // atualizar estoque
                await conn.execute(
                    `
                    UPDATE produtos
                    SET Estoque = Estoque - ?
                    WHERE Id = ?
                    `,
                    [
                        item.quantidade,
                        item.produtoId
                    ]
                );
            }

            await conn.commit();

            return {
                message: "Pedido criado com sucesso",
                pedidoId
            };

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();
        }
    },

    selecionar: async () => {

        const [rows] = await connection.execute(
            `
            SELECT
                p.Id,
                p.DataPedido,
                p.ValorTotal,
                p.StatusPedido,

                i.Id AS ItemId,
                i.ProdutoId,
                pr.Nome AS Produto,
                i.Quantidade,
                i.ValorItem,
                i.SubTotal

            FROM pedidos p

            LEFT JOIN itens_pedidos i
                ON i.PedidoId = p.Id

            LEFT JOIN produtos pr
                ON pr.Id = i.ProdutoId
            `
        );

        return rows;
    },
    
    selecionarPorId: async (id) => {

        const [rows] = await connection.execute(
            `
            SELECT
                p.Id,
                p.DataPedido,
                p.ValorTotal,
                p.StatusPedido,

                i.Id AS ItemId,
                i.ProdutoId,
                pr.Nome AS Produto,
                i.Quantidade,
                i.ValorItem,
                i.SubTotal

            FROM pedidos p

            LEFT JOIN itens_pedidos i
                ON i.PedidoId = p.Id

            LEFT JOIN produtos pr
                ON pr.Id = i.ProdutoId

            WHERE p.Id = ?
            `,
            [id]
        );

        return rows;
    },

    editarStatus: async (pedido) => {

        const [result] = await connection.execute(
            `
            UPDATE pedidos
            SET StatusPedido = ?
            WHERE Id = ?
            `,
            [
                pedido.statusPedido,
                pedido.id
            ]
        );

        return result;
    },

     deletar: async (id) => {

        const conn = await connection.getConnection();

        try {

            await conn.beginTransaction();

            // devolver estoque
            const [itens] = await conn.execute(
                `
                SELECT ProdutoId, Quantidade
                FROM itens_pedidos
                WHERE PedidoId = ?
                `,
                [id]
            );

            for (const item of itens) {

                await conn.execute(
                    `
                    UPDATE produtos
                    SET Estoque = Estoque + ?
                    WHERE Id = ?
                    `,
                    [
                        item.Quantidade,
                        item.ProdutoId
                    ]
                );
            }

            await conn.execute(
                `
                DELETE FROM itens_pedidos
                WHERE PedidoId = ?
                `,
                [id]
            );

            await conn.execute(
                `
                DELETE FROM pedidos
                WHERE Id = ?
                `,
                [id]
            );

            await conn.commit();

            return {
                message: "Pedido removido com sucesso"
            };

        } catch (error) {

            await conn.rollback();
            throw error;

        } finally {

            conn.release();
        }
    }

}

export default pedidoRepository