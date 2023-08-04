// Programación Backend - Comisión 47295 
// Desafío 1 - Clases con ECMAScript y ECMAScript avanzado

// Nidia Hernández


class ProductManager {
	products
	static id = 0

	constructor() {
		this.products = []
	}
	

	addProduct(title, description, price, thumbnail, code, stock) {

		let match = this.products.find((product) => product.code === code)

		if (title && description && price && thumbnail && code && stock) {

			if (!match) {
			
				const newProduct = {
					id: ProductManager.id,
					title: title,
					price: price,
					thumbnail: thumbnail,
					code: code,
					stock: stock
				}

				this.products.push(newProduct)
				ProductManager.id++

			} else {
				console.log("Product exists")
			}

		} else {
			console.log("Missing information")
		}

	}


	getProducts() {
		return this.products
	}


	getProductById(searchedId) {

		let match = this.products.find((product) => product.id === searchedId) 

		if (! match) {
			return "Not found"
		} else {
			return match
		}
	}

}


console.log("Creamos una instancia de ProductManager y llamamos getProducts")
const pm = new ProductManager()
console.log(pm.getProducts())

console.log("Agregamos un producto y volvemos a llamar getProducts")
pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25)
console.log(pm.getProducts())

console.log("Intentamos agregar un producto con los mismos valores")
pm.addProduct("producto prueba","Este es un producto prueba", 200, "Sin imagen", "abc123", 27)
console.log(pm.getProducts())

console.log("Buscamos un producto con un id inexistente")
console.log(pm.getProductById(500))

console.log("Buscamos un producto con un id que existe")
console.log(pm.getProductById(0))

