import { Router } from "express"
import CartManager from '../controllers/CartManager.js'

const carts = new CartManager('src/models/carts.json')
const cartsRouter = Router()

await carts.verifyStaticId()

// (ADD CART) http://localhost:8080/api/carts
cartsRouter.post('/', async (req, res) => {
   await carts.addCart()
   res.send('Agregar Carro')
})

// (GET ALL CART) http://localhost:8080/api/carts/
cartsRouter.get('/', async (req, res) => {
   console.log(await carts.getCarts())
   res.send('Todos los carritos')
})

// (GET CART) http://localhost:8080/api/carts/1
cartsRouter.get('/:cid', async (req, res) => {
   console.log(await carts.getCartById(Number(req.params.cid)))
   res.send('Carro especifico')
})

// (ADD on CART) http://localhost:8080/api/carts/1/product/1
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
   carts.addProductOnCart(Number(req.params.cid), Number(req.params.pid))
   res.send('Añadir producto al carro')
})

export default cartsRouter