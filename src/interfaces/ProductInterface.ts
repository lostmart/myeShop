import { Document } from "mongoose"

interface IProduct extends Document {
	productName: string
	productDescription: string
	productPrice: number
	productTags: string[]
	productImages: string[]
	productStatus?: boolean
}


export default IProduct