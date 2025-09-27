import express from "express"
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
} from "../controller/productController.js"

let router = express.Router()

router.get("/", getAllProducts)

router.get("/category/:category", getProductsByCategory)

router.get("/:id", getProductById)

router.post("/", createProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)

export default router
