import ProductManage from './ProductManager.js'

const initProductManager = async() => {
   // Inicializamos
   const products = new ProductManage('src/data/data.json')
   // Verificamos el id statico, si ya hay items empezamos desde el mas alto
   await products.verifyStaticId()
   // Agregamos dos productos (valido)
   await products.addProduct('1er Prod test', 'Lorem ipsum dolor sit amet', 111, 'Sin imagen', '9eb91142-53b7', 99)
   await products.addProduct('2do Test prod', 'consectetur adipisicing elit', 999, 'Sin imagen', 'ba0184cb-dd22', 66)
   await products.addProduct('3do Test prod', 'consectetur adipisicing elit', 999, 'Sin imagen', '55818e13-afbd', 66)
   await products.addProduct('4do Test prod', 'consectetur adipisicing elit', 999, 'Sin imagen', '3a0bde96-b1c6', 66)
   await products.addProduct('5do Test prod', 'consectetur adipisicing elit', 999, 'Sin imagen', '8efcdd67-6797', 66)
   await products.addProduct('6do Test prod', 'consectetur adipisicing elit', 999, 'Sin imagen', '260b73fb-dc53', 66)
   await products.addProduct('7do Test prod', 'consectetur adipisicing elit', 999, 'Sin imagen', '738c79ce-ba25', 66)
   await products.addProduct('8do Test prod', 'consectetur adipisicing elit', 999, 'Sin imagen', '52de763b-4595', 66)
   await products.addProduct('9do Test prod', 'consectetur adipisicing elit', 999, 'Sin imagen', '36421d91-e79e', 66)
}

initProductManager()