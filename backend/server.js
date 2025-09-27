import express from "express"
import cors from "cors"
import { connectToDatabase } from "./database/database_connection.js";
import userRoutes from "./router/userRoutes.js";
import productRoutes from "./router/productRoutes.js";
let app = express();
let PORT = 3000  

let requestCount = 0

// app.use((req, res, next) => {
//     console.log("Global middleware ..... ")
//     next()
// })

// Middleware
app.use(cors())
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)
let logRequestCount = (req, res, next) => {
    requestCount += 1
    console.log("Total request count: ", requestCount)
    next()
}

let middleware1 = (req, res, next) => {
    console.log("middleware 1 .....")
    next()
}

let middleware2 = (req, res, next) => {
    console.log("middleware 2 .... ")
    next()
}

let log = () => {
    console.log(`server is running on port : ${PORT}`)
}

app.get("/hello", logRequestCount, middleware1, middleware2, (req, res) => {
    res.json("Coding Backend ...... ..... ...... ...... .....")
})

app.get("/health", logRequestCount, (req, res) => {
    res.json("Server is healthy and is up and running .....")
})

let startServer = async () => {
    await connectToDatabase()
    app.listen(PORT, log)
}

startServer()
