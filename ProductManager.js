// Programación Backend - Comisión 47295 
// Desafío 2 - Manejo de archivos

// Nidia Hernández

const fs = require('fs');

class ProductManager {
	path
	static id = 0

	constructor() {
		this.path = "Products.json"
		fs.writeFileSync(this.path, "[]")
	}
	
	async addProduct(title, description, price, thumbnail, code, stock) {
		const newProduct = {
			id: ProductManager.id,
			title,
			description,
			price,
			thumbnail,
			code,
			stock
		}
		if (title && description && price && thumbnail && code && stock) {
			try {
				if (!fs.existsSync(this.path)) {
					let products = []
					products.push(newProduct)
					await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
				} else {
					let products = await this.getProducts()
					let match = products.find((product) => product.code === code)
					if (!match) {
						products.push(newProduct)
						await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
						ProductManager.id++
					} else {
						console.log("Product already exists")
					}
				}
			} catch(error) {
				console.log(error)
			}
		} else {
			console.log("Missing information")
		}
	}

	async getProducts() {
		let fileCont = await fs.promises.readFile(this.path, "utf-8")
		let products = JSON.parse(fileCont)
		return products
	}

	async getProductById(searchedId) {
		let products = await this.getProducts()
		let match = products.find((product) => product.id === searchedId) 
		if ( ! match ) {
			console.log("Product not found")
		} else {
			return match
		}
	}

	async updateProduct(productId, title, description, price, thumbnail, code, stock) {
		let productToUpdate = await this.getProductById(productId)
		if (productToUpdate) {
		 	let products = await this.getProducts()
		 	for (let product of products) {
		 		if (product.id === productId) {
		 			product.title = title
		 			product.description = description			 			
		 		}
		 	}
		 	await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
		}
	}


	async deleteProduct(productId) {
		let products = await this.getProducts()
		let updatedProducts = products.filter((product) => product.id != productId)
		await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, "\t"))
	}

}



const funcionAsync = async () => {
  const pm = new ProductManager()
  console.log("Llamamos getProducts recién creada la instacia:")
  console.log(await pm.getProducts())
  
  console.log("\nAgregamos un producto nuevo y lo mostramos:")
  await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  console.log(await pm.getProducts())
  console.log("\nIntentamos agregar el mismo producto:")
  await pm.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
  
  console.log("\nAgregamos más productos y los mostramos:")
  await pm.addProduct("Otro producto ", "Este es un producto prueba", 500, "Sin imagen", "def456", 34);
  await pm.addProduct("Otro producto ", "Este es un producto prueba", 500, "Sin imagen", "def457", 22);
  await pm.addProduct("Otro producto ", "Este es un producto prueba", 500, "Sin imagen", "def458", 33);
  console.log(await pm.getProducts())

  console.log("\nProbamos getProductById con ID existente:")
  console.log(await pm.getProductById(1))
  console.log("\nProbamos getProductById con ID inexistente:")
  console.log(await pm.getProductById(11))

  console.log("\nModificamos un producto y mostramos la lista de productos:")
  await pm.updateProduct(3, "Modificado", "Producto modificado", 500, "Sin imagen", "xxxx", 33);
  console.log(await pm.getProducts())
  console.log("\nProbamos modificar un producto con ID inexistente:")
  await pm.updateProduct(35, "Modificado", "Producto modificado", 500, "Sin imagen", "xxxx", 33)

  console.log("\nBorramos un producto y mostramos la lista de productos:")
  await pm.deleteProduct(3);
  console.log(await pm.getProducts());
}

funcionAsync();
