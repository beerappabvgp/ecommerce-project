import mongoose from "mongoose"

let connectToDatabase = async () => {
    try {
        const connectionString = "mongodb+srv://beerappabharathb_db_user:5intfXsJPTbBPYkc@cluster0.opyrd4s.mongodb.net/backend-ecommerce-belgavi?retryWrites=true&w=majority&appName=Cluster0"

        await mongoose.connect(connectionString)
        console.log(" Database connection is successful")

        mongoose.connection.on('error', (err) => {
            console.error(' Database connection error:', err)
        })

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ Database disconnected')
        })

    } catch (error) {
        console.log("Database connection failed", error.message)
        throw error
    }
}

export { connectToDatabase }
