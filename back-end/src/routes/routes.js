import { Router } from "express";
const routes = Router();

import produtoRoutes from "./produtoRoutes.js";
import pedidoRoutes from "./pedidosRoutes.js";


routes.use('/produtos', produtoRoutes)
routes.use('/pedidos', pedidoRoutes)

export default routes