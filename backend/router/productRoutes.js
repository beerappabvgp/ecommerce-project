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

// Get all products with optional filtering
router.get("/", getAllProducts)

// Get products by category
router.get("/category/:category", getProductsByCategory)

// Get single product by ID
router.get("/:id", getProductById)

// Create new product (Admin only)
router.post("/", createProduct)

// Update product (Admin only)
router.put("/:id", updateProduct)

// Delete product (Admin only) - Soft delete
router.delete("/:id", deleteProduct)

export default router
