import express from "express"
import path from "path"
import { Request, Response } from "express"

const app = express()
const PORT = process.env.PORT || 3000

import dotenv from "dotenv"
dotenv.config()

/*  routes import */
import productsRoutes from "./routes/ProductRoutes"

import connectToMongoDB from "./utils/db_connection"

/*  CORS  */
app.use((req: Request, res: Response, next: Function) => {
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

interface IError {
	message: string
}

app.get("/", (req: Request, res: Response) =>
	res.json({ msg: "Hello World with Express and TypeScript" })
)
/* DB connection */
async function startApp() {
	try {
		await connectToMongoDB()
	} catch (error: any) {
		console.error("Failed to start the application:", error.message)
		process.exit(1)
	}
}

startApp()

app.use("/api/products", productsRoutes)

/* static folder */
app.use("/images", express.static(path.join(__dirname, "images")))

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`)
})
