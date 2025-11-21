import { Router } from "express";
import { getAllInventario, inventarioFilter } from "../src/controllers/inventarioController.js"

export const router=Router()

router.get('', getAllInventario)
router.get('/filtros', inventarioFilter)

export default router