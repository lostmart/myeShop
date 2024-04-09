import express from "express"
const router = express.Router()

import { getAllProducts } from "../controllers/productController"

/* get all products  */
router.get("/", getAllProducts)

export default router
