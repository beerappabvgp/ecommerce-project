import { products } from "../schema/productSchema.js";

// Get all products
export let getAllProducts = async (req, res) => {
    try {
        const productList = await products.find()

        return res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            data: productList,
            count: productList.length
        })
    } catch (error) {
        console.log("Error fetching products:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        })
    }
}

// Get single product by ID
export let getProductById = async (req, res) => {
    try {
        const { id } = req.params

        const product = await products.findOne({ _id: id })

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product retrieved successfully",
            data: product
        })
    } catch (error) {
        console.log("Error fetching product:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message
        })
    }
}

// Create new product
export let createProduct = async (req, res) => {
    try {
        const { name, description, price, category, brand, stock } = req.body

        if (!name || !description || !price || !category || !brand) {
            return res.status(400).json({
                success: false,
                message: "Name, description, price, category, and brand are required"
            })
        }

        const newProduct = await products.create({
            name,
            description,
            price,
            category,
            brand,
            stock: stock || 0
        })

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        })
    } catch (error) {
        console.log("Error creating product:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        })
    }
}

// Update product
export let updateProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, price, category, brand, stock } = req.body

        const updatedProduct = await products.findByIdAndUpdate(
            id,
            { name, description, price, category, brand, stock },
            { new: true, runValidators: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        })
    } catch (error) {
        console.log("Error updating product:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message
        })
    }
}

// Delete product - Hard delete
export let deleteProduct = async (req, res) => {
    try {
        const { id } = req.params

        const deletedProduct = await products.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        console.log("Error deleting product:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message
        })
    }
}

// Get products by category
export let getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params

        const productList = await products.find({
            category: category
        })

        return res.status(200).json({
            success: true,
            message: `Products in ${category} category retrieved successfully`,
            data: productList,
            count: productList.length
        })
    } catch (error) {
        console.log("Error fetching products by category:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to fetch products by category",
            error: error.message
        })
    }
}
