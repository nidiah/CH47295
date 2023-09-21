import fs from "fs"
import { productModel } from "../models/productModel.js"

class productManager {
	constructor() {
		this.path = "./Products.json"
	}
	
	async addProduct(newProduct) {
		// if (newProduct.title && newProduct.description && newProduct.code && newProduct.price && newProduct.status && newProduct.stock && newProduct.category && newProduct.thumbnails) {
		// 	try {
		// 		if (!fs.existsSync(this.path)) {
		// 			let products = []
		// 			newProduct['id'] = 0
		// 			products.push(newProduct)
		// 			await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
		// 			return {code: 200, message: "Product added"}
		// 		} else {
		// 			let products = await this.getProducts()
		// 			let match = products.find((product) => product.code === newProduct.code)
		// 			if (!match) {
		// 				newProduct['id'] = products.length +1 
		// 				products.push(newProduct)
		// 				await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))						
		// 				return {code: 200, message: "Product added"}
		// 			} else {
		// 				return {code: 400, message: "Product already exists"}
		// 			}
		// 		}
		// 	} catch(error) {
		// 		return {code: 500, message: error}
		// 	}
		// } else {
		// 	return {code: 400, message: "Missing information"}
		// }

		let {title, description, code, price, status, stock, category, thumbnails} = newProduct
		if (title && description && code &&price && status && stock && category && thumbnails) {
			let products = await this.getProducts()
			let match = products.find((product) => product.code === code)
			if (!match) {
				await productModel.create(
					{
						title, 
						description,
						code,
						price,
						status,
						stock,
						category,
						thumbnails
					}
				)
				return {code: 200, message: "Product added"}
			} else {
				return {code: 400, message: "Product already exists"}
			}
		} else {
			return {code: 400, message: "Missing information"}
		}
}

	async getProducts() {
		// let fileCont = await fs.promises.readFile(this.path, "utf-8")
		// let products = JSON.parse(fileCont)
		let products = await productModel.find().lean()
		return products
	}

	async getProductById(searchedId) {
		let products = await this.getProducts()
		let match = products.find((product) => product.id === searchedId) 
		return match
	}

	async updateProduct(productId, newProduct) {
		// if (productId && newProduct.title && newProduct.description && newProduct.code && newProduct.price && newProduct.status && newProduct.stock && newProduct.category && newProduct.thumbnails) {
		// 	let productToUpdate = await this.getProductById(productId)
		// 	if (productToUpdate) {
		// 		newProduct['id'] = productId
		// 		let products = await this.getProducts()
		// 		products[productId] = newProduct
		// 		// reajustar para Mongoose		
		// 		await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"))
		// 		return {code: 200, message: "Product updated"}
		// 	} else {
		// 		return {code: 404, message: "Incorrect id"}
		// 	}
		// } else {
		// 	return {code: 400, message: "Missing information"}

		let {title, description, code, price, status, stock, category, thumbnails} = newProduct
		if (productId && title && description && code &&price && status && stock && category && thumbnails) {
			let productToUpdate = await this.getProductById(productId)
			if (productToUpdate) {
				await productModel.updateOne(
					{ _id: productId },
					{
						title, 
						description,
						code,
						price,
						status,
						stock,
						category,
						thumbnails
					}
				)
				return {code: 200, message: "Product updated"}
			} else {
				return {code: 404, message: "Incorrect id"}
			}
		} else {
			return {code: 400, message: "Missing information"}
		}

	}

	async deleteProduct(productId) {
		// let products = await this.getProducts()
		// let updatedProducts = products.filter((product) => product.id != productId)
		// if (products.length !== updatedProducts.length) {
			
		// 	await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts, null, "\t"))
		// 	return {code: 200, message: "Product deleted"}
		// } else {
		// 	return {code: 404, message: "Incorrect id"}	
		// }
		await productModel.deleteOne({_id:productId})
		return {code: 200, message: "Product deleted"}
	}


}

export default productManager
