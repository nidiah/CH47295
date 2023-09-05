import fs from "fs"

export class cartManager {
	path

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
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
                return {code: 200, message: "Cart created"}
            } else { 
                let carts = await this.getCarts()
                newCart.id = carts.length
                carts.push(newCart)
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
                return {code: 200, message: "New cart created"}
            }
        } catch(error) {
            return {code: 500, message: error}
        }
    }

    async getCarts() {
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
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
                return {code: 200, message: "New product added to cart"}
            } else {
                product.quantity++
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"))
                return {code: 200, message: "Product added to cart"}
            }
            
        }

    }

}

export default cartManager