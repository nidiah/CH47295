import { Router } from "express"
import { productManager } from '../productManager.js'

const router =  Router()
const pm = new productManager()

router.get("/", async (req, res) => {
	let queryLimit = req.query.limit
	const products = await pm.getProducts()

	if (! queryLimit) {
		res.send({Products: products})
	} else {
		res.send({Products: products.slice(0, parseInt(queryLimit, 10))})
	}
})

router.get("/:pid", async (req, res) => {
	let requestedId = parseInt(req.params.pid, 10)
	const requestedProduct = await pm.getProductById(requestedId)
	if (requestedProduct === undefined) { 
		res.status(404).send()
	}
	res.send(requestedProduct)
})

router.post("/", async (req, res) => {
	let product = req.body

	if (product.status == undefined) {
		product.status = true
	}
	
	let result = await pm.addProduct(product)
	res.status(result.code).send(result.message)
})

router.put("/:pid", async (req, res) => {
	let productId = parseInt(req.params.pid, 10)
	let product = req.body
	let result =  await pm.updateProduct(productId, product)
	res.status(result.code).send(result.message)
})

router.delete("/:pid", async (req, res) => {
	let productId = parseInt(req.params.pid, 10)
	let result =  await pm.deleteProduct(productId)
	res.status(result.code).send(result.message)
})

export default router