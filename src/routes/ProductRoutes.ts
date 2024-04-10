import express from "express"
import { uploadArray } from "../middleware/uploadArray"
const router = express.Router()

import {
	getAllProducts,
	getOneProductById,
	newProduct,
	deleteById,
} from "../controllers/productController"

/* get all products  */
router.get("/", getAllProducts)

/*  get one product by param: id  */
router.get("/:productId", getOneProductById)

/*  create a product  authMiddleware, */
router.post("/", uploadArray, newProduct)

/* delete one product by Id */
router.delete("/:productId", deleteById)

export default router
