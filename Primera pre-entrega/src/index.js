import express, { urlencoded } from "express"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import productsRouter from "./routes/products.routes.js"
import cartsRouter from "./routes/cart.routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const app = express()
const PORT = 8080

//Middlewares
app.use(express.json())
app.use(urlencoded({extended: true}))

//Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

//
app.listen(PORT, () => {
   console.log(`Server on port ${PORT} Joselito`)
})