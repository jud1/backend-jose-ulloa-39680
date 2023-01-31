import express, { urlencoded } from 'express'
import ProductManage from './ProductManager.js'

const app = express()
const PORT = 8080

const productos = new ProductManage('./src/data/data.json')

app.use(urlencoded({ extended: true })) // Permite busquedas de url complejas

app.get('/', (req, res) => {
   res.send("Pagina de inicio de la api de productos | Desafio N°3")
})

// http://localhost:8080/productos
app.get('/productos/', async (req, res) => {
   
   const limit = req.query.limit
   let errorLimit = null

   // Almacenamos lo que traemos de la clase (Async)
   let aux = await productos.getProducts()

   /* Aplicamos el limite al array */
   
   // Si el limite no esta definido, pasamos sin limite
   if (limit === undefined) {}
   
   // Si el limite es un string vacio o NaN, error
   else if(limit==='' || isNaN(limit)) {
      errorLimit = 'Invalid limit'
   }

   // Si el limite es menor a 1
   else if (limit < 1) {
      errorLimit = 'Limit cannot be less than 1'
   }

   // Si el limite excede el tamaño del array
   else if(limit > aux.length) {
      errorLimit = 'Limit exceded'
   }

   // Limite correcto, se aplica
   else {
      aux = aux.slice(0, limit)
   }
   
   // Si Tiene productos los mostramos, si no los mostramos un mensaje de error
   aux.length > 0 ? console.log(aux) : console.log('Products are empty')

   // Mostramos error de limit si lo hay
   errorLimit && console.log(errorLimit)

   // Res para el render
   res.send(`Get all products`)
})

// http://localhost:8080/productos/1
app.get('/productos/:id', async (req, res) => {

   // Almacenamos lo que traemos de la clase (Async)
   const aux = await productos.getProducts()

   // Buscamos el producto en el array
   const product = aux.find(item=> item.id === Number(req.params.id))

   // si existe el producto lo mostramos, si no mostramos un mensaje de error
   product ? console.log(product) : console.log('Product not Found')

   // Res para el render
   res.send(`Get product`)
})

app.listen(PORT, () =>{
   console.log(`Server on port ${PORT}`)
})