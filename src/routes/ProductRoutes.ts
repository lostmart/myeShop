import express from "express"
import { uploadArray } from "../middleware/uploadArray"
const router = express.Router()

import {
	getAllProducts,
	getOneProductById,
	newProduct,
} from "../controllers/productController"

/* get all products  */
router.get("/", getAllProducts)

/*  get one product by param: id  */
router.get("/:productId", getOneProductById)
export default router

/*  create a product  authMiddleware, */
router.post("/", uploadArray, newProduct)
