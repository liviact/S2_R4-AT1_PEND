import { Router } from "express";
const routes = Router();

import produtoRoutes from "./produtoRoutes.js";


routes.use('/produtos', produtoRoutes)


export default routes