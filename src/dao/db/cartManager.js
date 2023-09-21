import fs from "fs"
//import cartModel from "../models/cartModel.js"

export class cartManager {
	path

    // Reajustar los servicios con el fin de que puedan funcionar
	// con Mongoose en lugar de FileSystem
	constructor() {
		this.path = "./Carts.json"
	}

    async createCart() {
        let newCart = {
            id: 0,
            products: []
        }
        try {
            if (!fs.existsSync(this.path)) { 
                let carts = []
                carts.push(newCart)
                // reajustar para Mongoose
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
                return {code: 200, message: "Cart created"}
            } else { 
                let carts = await this.getCarts()
                newCart.id = carts.length
                carts.push(newCart)
                // reajustar para Mongoose
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
                return {code: 200, message: "New cart created"}
            }
        } catch(error) {
            return {code: 500, message: error}
        }
    }

    async getCarts() {
        // reajustar para Mongoose
        let fileCont = await fs.promises.readFile(this.path, "utf-8")
        let carts = JSON.parse(fileCont)
        return carts
    }

    async getCartById(cartId) {
		let carts = await this.getCarts()
        let searchedCart = carts.find((cart) => cart.id === cartId)
        return searchedCart
    }

	async getProducts(cartId) {
        let searchedCart = await this.getCartById(cartId)
        if ( searchedCart === undefined ){
            return {code: 404, message: "Incorrect cart id"}
        } else {
            return {code: 200, message: searchedCart.products} 
        }

	}

    async addProduct(cartId, productId) {
        let carts = await this.getCarts()
        let searchedCart = carts.find((cart) => cart.id === cartId)

        if ( searchedCart === undefined ) {
            return {code: 404, message: "Incorrect cart id"}
        } else {
            let product = searchedCart.products.find((product) => product.product === productId)
            if ( product === undefined ) {
                searchedCart.products.push({
                    product: productId,
                    quantity: 1
                })
                // reajustar para Mongoose
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
                return {code: 200, message: "New product added to cart"}
            } else {
                product.quantity++
                // reajustar para Mongoose
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
                return {code: 200, message: "Product added to cart"}
            }
            
        }

    }

}

export default cartManager