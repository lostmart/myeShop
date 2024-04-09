import express from "express"

const app = express()
const PORT = process.env.PORT || 3000

const mongoose = require("mongoose")

async function connectToMongoDB() {
	try {
		const connectionString = process.env.DB_LOCAL

		await mongoose.connect(connectionString, {
			useNewUrlParser: true,
		})

		console.log("Connected to MongoDB")
	} catch (error) {
		console.error("Error connecting to MongoDB:", error.message)
		throw error
	}
}

/*  CORS  */
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*")
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	)
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	)
	next()
})

app.use(express.json())
app.disable("x-powered-by")

app.get("/", (req, res) =>
	res.json({ msg: "Hello World with Express and TypeScript" })
)
/* DB connection */
async function startApp() {
	try {
		await connectToMongoDB()
	} catch (error) {
		console.error("Failed to start the application:", error.message)
		process.exit(1)
	}
}

startApp()

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
