class ProductManage {
   constructor(){
      this.products = []
   }
   
   // Static para aumentar consecutivamente (increm)
   static id = 0

   addProduct = (title, description, price, thumbnail, code, stock) => {
      
      // Variables
      const params = { title, description, price, thumbnail, code, stock }

      // Errores
      const errorOnParams = Object.values(params).some(item => item === undefined)
      const errorOnCode = this.products.some(item => item.code === code)
      
      // Si se ingresaron todos los campos (some undefined da true: error)
      if(errorOnParams){
         console.error('Debes ingresar todos los parámetros')
      }
      
      // El codigo de repite en otro producto ()
      else if(errorOnCode){
         console.error('El código ya está siendo utilizado por otro producto')
      }

      // No hay errores, agregar producto
      else {
         ProductManage.id+=1
         this.products.push({...params, id: ProductManage.id})
      }
   }
   
   // Devolvemos el array
   getProducts = () => {
      return this.products
   }
   
   // Find para arojar el match del id en el array (al ser unico no ah posiblidad de que hayan 2 en el array)
   getProductById = id => {
      const busqueda = this.products.find(item=> item.id === id)
      return busqueda ? busqueda : 'Not found'
   }

}

// Creamos (vacio)
const products = new ProductManage()

// Cosultamos (vacio nuevamente)
console.log(products.getProducts())

// Agregar producto prueba
products.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

// Cosultamos (aparece nuevo producto)
console.log(products.getProducts())

// Agregar mismo producto prueba (genera error)
products.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)

// Buscar producto por id: 1 (lo encuentra)
console.log(products.getProductById(1))

// Buscar producto por id: 10 (no lo encuentra ya que no existe)
console.log(products.getProductById(10))