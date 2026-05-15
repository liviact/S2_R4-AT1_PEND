import { connection } from "../configs/Database.js";

const categoriaRepository = {

    criar: async (categoria) => {

        const sql = `
            INSERT INTO categorias (Nome)
            VALUES (?)
        `;

        const values = [
            categoria.nome
        ];

        const [result] = await connection.execute(sql, values);

        return result;
    }
};

export default categoriaRepository;