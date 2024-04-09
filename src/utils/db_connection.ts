const mongoose = require("mongoose")
import dotenv from "dotenv"
dotenv.config()

const connectToMongoDB = async (): Promise<void> => {
	try {
		const connectionString: string | undefined = "mongodb://localhost:27017"
		if (!connectionString) {
			throw new Error(
				"Database connection string is not defined in the environment variables."
			)
		}

		await mongoose.connect(connectionString, {
			useUnifiedTopology: true,
		})

		console.log("Connected to MongoDB")
	} catch (error) {
		console.error("Error connecting to MongoDB:", (error as Error).message)
		throw error
	}
}

export default connectToMongoDB
