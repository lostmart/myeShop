import { Request, Response } from "express"
import Product from "../models/ProductModel"

/* get a list of all the products */
export const getAllProducts = async (req: Request, res: Response) => {
	console.log(req)

	const products = await Product.find()
	if (products.length < 1) {
		return res.status(404).json({
			products,
			msg: "No products found",
		})
	}
	res.status(200).json({
		products,
	})
}

/* get a list of all the products based on the tags passed as a param  */
export const getProductsByTag = async (req: Request, res: Response) => {
	const selectedTag = req.params.tagName
	try {
		const products = await Product.find({ productTags: selectedTag })
		if (products.length === 0) {
			throw new Error("no products found with that tag")
		}
		res.status(200).json({
			products,
		})
	} catch (err) {
		console.log(err)
		res.status(404).json({
			products: "nothing",
		})
	}
}
