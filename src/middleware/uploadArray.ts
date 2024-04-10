import { Request } from "express"
import multer, { FileFilterCallback } from "multer"
import path from "path"

// Set up the storage for multer
const storage = multer.diskStorage({
	destination: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, destination: string) => void
	) => {
		cb(null, "images")
	},
	filename: (
		req: Request,
		file: Express.Multer.File,
		cb: (error: Error | null, filename: string) => void
	) => {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		const extension = path.extname(file.originalname)
		const imagePath = file.fieldname + "-" + uniqueSuffix + extension
		cb(null, imagePath)
	},
})

function checkFileType(file: Express.Multer.File, cb: FileFilterCallback) {
	const filetypes = /webp|jpg|jpeg|png/ // Choose Types you want...
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	const mimetype = filetypes.test(file.mimetype)

	if (extname && mimetype) {
		return cb(null, true)
	} else {
		cb(new Error("Jpg, Jpeg, Png, webp images only!")) // custom this message to fit your needs
	}
}

const upload = multer({
	storage,
	limits: {
		fileSize: 1024 * 1024, // 1 MB limit per file
	},
	fileFilter: (
		req: Request,
		file: Express.Multer.File,
		cb: FileFilterCallback
	) => {
		checkFileType(file, cb)
	},
})

export const uploadArray = upload.array("product_img", 3)
