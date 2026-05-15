import { Categoria } from "../models/Categoria.js";

import categoriaRepository from "../repositories/categoriaRepositories.js";

const categoriaController = {

    criar: async (req, res) => {

        try {

            const { nome } = req.body;

            const categoria = Categoria.criar({
                nome
            });

            const result = await categoriaRepository.criar(categoria);

            res.status(201).json({
                message: "Categoria cadastrada com sucesso",
                result
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: error.message
            });
        }
    },

    editar: async (req, res) => {

        try {

            const id = req.params.id;

            const { nome } = req.body;

            const categoria = Categoria.alterar(
                { nome },
                id
            );

            const result = await categoriaRepository.editar(categoria);

            res.status(200).json({
                message: "Categoria atualizada com sucesso",
                result
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: error.message
            });
        }
    },
    
    deletar: async (req, res) => {

        try {

            const id = req.params.id;

            const result = await categoriaRepository.deletar(id);

            res.status(200).json({
                message: "Categoria removida com sucesso",
                result
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                error: error.message
            });
        }
    }
};

export default categoriaController;
