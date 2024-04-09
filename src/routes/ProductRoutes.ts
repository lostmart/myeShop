import express from "express"
const router = express.Router()

import {
	getAllProducts,
	getOneProductById,
} from "../controllers/productController"

/* get all products  */
router.get("/", getAllProducts)

/*  get one product by param: id  */
router.get("/:productId", getOneProductById)
export default router
