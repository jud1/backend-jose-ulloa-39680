const fs = require('fs')
const consoleSeparate = "\n-------------------------"

class ProductManage {
   constructor(path){
      this.path = path
      this.products = []
   }
   
   static id = 0

   // Ejecutaremos en todos los metodos que lo requieren en caso de ser llamados primeros
   createFileIf = async () => {
      try{
         // No hace nada, porque existe el archivo
         let exist = await fs.promises.readFile(this.path, 'utf-8')
      }
      catch {
         // Crea el archivo ya que no existe, genera un arr vacio 
         const emptyData = []
         await fs.promises.writeFile(this.path, JSON.stringify(emptyData))
      }
   }

   verifyStaticId = async () => {
      await this.createFileIf()
      let fileArr = await this.getProducts()
      if(fileArr.length>0) {
         let acumulativo = 0
         fileArr.forEach(item=>{
            item.id>acumulativo ? acumulativo = item.id : false
         })
         ProductManage.id = acumulativo
      }
   }

   // Metodo de ayuda
   deleteFile = async () => {
      await fs.promises.unlink(this.path)
   }

   // Devolvemos el array
   getProducts = async () => {

      await this.createFileIf()
      
      const arrProducts = await fs.promises.readFile(this.path, 'utf-8')
      const parsedArrProducts = JSON.parse(arrProducts)

      return parsedArrProducts

   }

   // Find para arojar el match del id en el array (al ser unico no hay posiblidad de que hayan 2 en el array)
   getProductById = async id => {
      let fileArr = await this.getProducts()
      const busqueda = fileArr.find(item=> item.id === id)
      return busqueda ? busqueda : 'Producto no encontrado'
   }

   // Agregar producto
   addProduct = async (title, description, price, thumbnail, code, stock) => {
      
      await this.createFileIf()

      let fileArr = await this.getProducts()
      
      // Variables
      const params = { title, description, price, thumbnail, code, stock }

      // Errores
      const errorOnParams = Object.values(params).some(item => item === undefined)
      
      // Si se ingresaron todos los campos (some undefined da true: error)
      if(errorOnParams){
         console.error('Debes ingresar todos los parámetros', consoleSeparate)
      }

      // [IMPORTANTE] 
      // AGREGANDO ESTE IF PREVENIMOS LA CREACION DE "CODE"s REPETIDOS, POR ENDE TAMBIEN FRENAMOS LA CREACION DE NUEVOS ELEMENTOS AL EJECUTAR EL ARCHIVO MULTIPLES VECES 
      /* else if(fileArr.some(item => item.code === code)){
         console.error('El "code" ya está siendo utilizado por otro producto', consoleSeparate)
      } */

      // No hay errores, agregar producto
      else {
         ProductManage.id+=1
         fileArr.push({...params, id: ProductManage.id})
         fs.promises.writeFile(this.path, JSON.stringify(fileArr))
      }
   }

   // Modificar producto
   updateProduct = async (id, prop, value) => {
      let fileArr = await this.getProducts()
      let modifyProduct = await this.getProductById(id)
      fileArr = fileArr.filter(producto=> producto.id !== id)

      if (modifyProduct === 'Producto no encontrado'){
         console.log('Producto no encontrado para modificar', consoleSeparate)
      }
      else if (prop==='id') {
         console.log('No puedes modificar la propiedad "id"', consoleSeparate)
      }
      /* // La misma regla del importante de code
      else if (prop==='code' && fileArr.some(item => item.code === value)){
         console.log('La propiedad "code" ya se repite en otro producto', consoleSeparate)
      } */
      else {
         modifyProduct[prop] = value
         fileArr = [...fileArr, modifyProduct]
         fs.promises.writeFile(this.path, JSON.stringify(fileArr))
      }
   }

   // Eliminar producto
   deleteProduct = async (id) => {
      let fileArr = await this.getProducts()
      const valido = await this.getProductById(id)
      if (valido === 'Producto no encontrado'){
         console.log('No se puede eliminar el producto ya que no existe')
      }
      else {
         fileArr = fileArr.filter(producto => producto.id !== id)
         fs.promises.writeFile(this.path, JSON.stringify(fileArr))
      }
   }
}

const testing = async() => {
   // Inicializamos
   const products = new ProductManage('./data.json')
   // Verificamos el id statico, si ya hay items empezamos desde el mas alto
   await products.verifyStaticId()
   // Mostramos los productos en consola, tambien se modularizo para utilizar en los demas metodos
   console.log(await products.getProducts(), consoleSeparate)
   // Agregamos dos productos (valido)
   await products.addProduct('1er Prod test', 'Lorem ipsum dolor sit amet', 111, 'Sin imagen', 'asdf', 99)
   await products.addProduct('2do Test prod', 'consectetur adipisicing elit', 999, 'Sin imagen', 'qwerty', 66)
   // Mostramos productos nuevamente
   console.log(await products.getProducts(), consoleSeparate)
   // Buscamos el elemento por id
   console.log(await products.getProductById(1), consoleSeparate)
   // Buscamos uno que no exista
   console.log(await products.getProductById(29), consoleSeparate) // Producto no encontrado
   // Hacemos update a un producto
   await products.updateProduct(2, 'title', 'Modificado')
   // Mostramos productos nuevamente
   console.log(await products.getProducts(), consoleSeparate)
   // Eliminar producto
   await products.deleteProduct(1)
   // Mostramos productos nuevamente
   console.log(await products.getProducts(), consoleSeparate)
   
   /* // Eliminar todo
   products.deleteFile() */
}

testing()