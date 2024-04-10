import { Request, Response } from "express"
import Product from "../models/ProductModel"
import IMessage from "../interfaces/MessageInterface"

import fs from "fs"

/* get a list of all the products */
export const getAllProducts = async (req: Request, res: Response) => {
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

/*  get one product based on param: productId  */
export const getOneProductById = async (req: Request, res: Response) => {
	const productId = req.params.productId

	try {
		const foundProduct = await Product.findOne({ _id: productId })
		/* nothing found */
		if (!foundProduct) {
			return res.status(404).json({
				product: foundProduct,
			})
		}
		res.status(200).json({
			product: foundProduct,
		})
	} catch (err) {
		res.status(500).json({
			product: err,
			msg: "something didn't go as expected... not good id ?",
		})
	}
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

/* create new product  */
export const newProduct = async (req: any, res: Response, next: Function) => {
	let productImages: string[] = []
	if (req.files) {
		productImages = req.files.map((img: any) => {
			return `${req.protocol}://${req.get("host")}/images/${img.filename}`
		})
		// console.log(typeof req.files[0])
		// for (let index = 0; index < req.files.length; index++) {
		// 	const element = req.files[index]
		// }
	}

	// prepare data
	// const productImages = req.files.map((img) => {
	// return `${req.protocol}://${req.get("host")}/images/${img.filename}`
	// })
	// console.log(req.get("host"))
	// start msg and status variables
	// const productImages = ["1", "2", "3"]
	const msg: IMessage = { data: "", name: "" }
	//let msg: any
	let statusCode = 200
	try {
		const newProduct = new Product({
			...req.body,
		})

		newProduct.productImages = productImages
		const savedProduct = await newProduct.save()

		msg.name = savedProduct
		msg.data = "Product successfully created !"
		statusCode = 201
	} catch (err: any) {
		msg.data = err.message
		msg.name = err.name
		msg.error = err.errors
		statusCode = 400
	}

	res.status(statusCode).json({
		msg,
	})

	next()
}

/* delete one product by Id */
export const deleteById = async (req: Request, res: Response): Promise<any> => {
	const productId = req.params.productId

	try {
		const tryProduct = await Product.findOne({ _id: productId })

		if (!tryProduct) {
			return res.status(404).json({ msg: "nothing found with this id" })
		}

		tryProduct.productImages.forEach((img: string) => {
			// delete images
			const filename = img.split("/images/")[1]
			fs.unlink(`images/${filename}`, () => {
				console.log(`image ${filename} deleted`)
			})
		})

		const foundProduct = await Product.deleteOne({ _id: productId })

		if (foundProduct.acknowledged) {
			res.status(200).json({
				msg: "Product deleted",
				id: `Product id: ${productId}`,
			})
		} else {
			res.status(500).json({
				msg: "Something went terribly wrong !",
			})
		}
	} catch (err: any) {
		res.status(500).json({
			msg: err.message,
		})
	}
}
