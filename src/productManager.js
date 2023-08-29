import * as fs from 'fs'

export class productManager {
	path
	static id = 0

	constructor() {
		this.path = "./Products.json"
	}
	
	async addProduct(title, description, code, price, status, stock, category, thumbnails) {
		const newProduct = {
			title,
			description,
			code,
			price,
			status,
			stock,
			category,
			thumbnails
		}
		if (title && description && code && price && status && stock && category && thumbnails) {
			try {
				if (!fs.existsSync(this.path)) {
					let products = []
					newProduct['id'] = ProductManager.id
					products.push(newProduct)
					await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
					return {code: 200, message: "Product added"}
				} else {
					let products = await this.getProducts()
					let match = products.find((product) => product.code === code)
					if (!match) {
						productManager.id = products.length
						newProduct['id'] = productManager.id
						products.push(newProduct)
						await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))						
						return {code: 200, message: "Product added"}
					} else {
						return {code: 400, message: "Product already exists"}
					}
				}
			} catch(error) {
				return {code: 500, message: error}
			}
		} else {
			return {code: 400, message: "Missing information"}
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
		return match
	}

	async updateProduct(productId, title, description, code, price, status, stock, category, thumbnails) {
		if (productId && title && description && code && price && status && stock && category && thumbnails) {
			let productToUpdate = await this.getProductById(productId)
			if (productToUpdate) {
				let products = await this.getProducts()
				let product = products.find(({ id }) => id === productId)
				product.title = title
				product.description = description
				product.code = code
				product.price = price
				product.status = status
				product.stock = stock
				product.category = category
				product.thumbnails = thumbnails
				await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
				return {code: 200, message: "Product updated"}
			} else {
				return {code: 404, message: "Incorrect id"}
			}
		} else {
			return {code: 400, message: "Missing information"}
		}
	}

	async deleteProduct(productId) {
		let products = await this.getProducts()
		let updatedProducts = products.filter((product) => product.id != productId)
		if (products.length !== updatedProducts.length) {
			await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, "\t"))
			return {code: 200, message: "Product deleted"}
		} else {
			return {code: 404, message: "Incorrect id"}	
		}
	}
}