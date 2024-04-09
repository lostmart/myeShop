import mongoose, { Schema } from "mongoose"
import IProduct from "../interfaces/ProductInterface"

const productSchema: Schema = new Schema({
	productName: { type: String, required: true },
	productDescription: { type: String, required: true },
	productPrice: { type: Number, required: true },
	productTags: { type: [String], required: true },
	productImages: { type: [String] },
	productStatus: { type: Boolean },
})

const Product = mongoose.model<IProduct>("Product", productSchema)

export default Product
