import IProduct from "./ProductInterface"

interface IMessage {
	data: string
	error?: any
	name: string | IProduct
}

export default IMessage
