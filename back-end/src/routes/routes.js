
import { Router } from "express";
const routes = Router();
import categoriaRoutes from "./categoriaRoutes.js"

routes.use('/categoria', categoriaRoutes)

export default routes
