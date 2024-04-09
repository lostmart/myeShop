const mongoose = require("mongoose")
import dotenv from "dotenv"
dotenv.config()

const connectToMongoDB = async (): Promise<void> => {
	try {
		const connectionString: string | undefined = process.env.DB_LOCAL
		if (!connectionString) {
			throw new Error("Database connection string cant, you know ...")
		}

		await mongoose.connect(connectionString)

		console.log("Connected to MongoDB")
	} catch (error) {
		console.error("Error connecting to MongoDB:", (error as Error).message)
		throw error
	}
}

export default connectToMongoDB
