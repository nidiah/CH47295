const fs = require('fs');

class ProductManager {
	path
	static id = 0

	constructor() {
		this.path = "./Products.json"
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
			return "ID not found"
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


module.exports = ProductManager