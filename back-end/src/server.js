import express from "express";
import routes from "./routes/routes.js";
import 'dotenv/config';
import cors from 'cors';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// Corrige caminho do __dirname no ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(cors());

// JSON
app.use(express.json());

// Pasta uploads
app.use(
    '/uploads',
    express.static(path.join(__dirname, '../uploads'))
);

// Rotas
app.use('/', routes);

// Servidor
app.listen(process.env.SERVER_PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${process.env.SERVER_PORT}`
    );

});