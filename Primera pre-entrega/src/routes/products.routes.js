import { Router } from "express"
import ProductManage from '../controllers/ProductManager.js'

const productos = new ProductManage('src/models/products.json')
const productsRouter = Router()

await productos.verifyStaticId()

// (GET ALL) http://localhost:8080/api/productos
productsRouter.get('/', async (req, res) => {
   console.log(await productos.getProducts(req.query.limit))
   res.send(`Todos los productos`)
})

// (GET ONE) http://localhost:8080/api/productos/1
productsRouter.get('/:pid', async (req, res) => {
   console.log(await productos.getProductById(req.params.pid))
   res.send(`Obtener producto`)
})

// (ADD ONE) http://localhost:8080/api/productos/ (body required)
productsRouter.post('/', async (req, res) => {
   await productos.addProduct(req.body)
   res.send(`Agregar producto`)
})

// (UPDATE ONE) http://localhost:8080/api/productos/1 (body required)
productsRouter.put('/:pid', async (req, res) => {
   await productos.updateProduct(req.params.pid, req.body)
   // Res para el render
   res.send(`Modificar producto`)
})

// (DELETE ONE) http://localhost:8080/api/productos/1
productsRouter.delete('/:pid', async (req, res) => {
   await productos.deleteProduct(Number(req.params.pid))
   res.send(`Eliminar producto`)
})


export default productsRouter