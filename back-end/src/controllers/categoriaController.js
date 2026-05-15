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
    }
};

export default categoriaController;
