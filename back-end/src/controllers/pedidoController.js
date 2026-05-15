import pedidoRepository from "../repositories/pedidoRepositories.js";

import { ItensPedido } from "../models/ItensPedido.js";

import { Pedido } from "../models/Pedidos.js";

import { statusPed } from "../enums/statusPedido.js";

const pedidoController = {

    criar: async (req, res) => {

        try {

            const { itens } = req.body;

            if (!itens || itens.length === 0) {

                return res.status(400).json({
                    error: "Itens obrigatórios"
                });
            }

            const itensPedido = itens.map(item =>
                ItensPedido.criar({
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    valorItem: 1
                })
            );

            const pedido = Pedido.criar({
                valorTotal: 0,
                statusPedido: statusPed.ABERTO
            });

            const result =
                await pedidoRepository.criar(
                    pedido,
                    itensPedido
                );

            res.status(201).json(result);

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: error.message
            });
        }
    },
}

export default pedidoController;