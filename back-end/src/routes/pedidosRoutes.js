import { Router } from "express";

import pedidoController from "../controllers/pedidoController.js";

const pedidoRoutes = Router();

pedidoRoutes.post('/', pedidoController.criar);
pedidoRoutes.post('/', pedidoController.selecionar)

export default pedidoRoutes;