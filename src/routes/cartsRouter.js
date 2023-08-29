import { Router } from "express"
import { cartManager } from '../cartManager.js'

const router =  Router()
const cm = new cartManager()

router.post("/", async (req, res) => {
    let result = await cm.createCart()
    res.status(result.code).send(result.message)
})

router.get("/:cid", async (req, res) => {
    let cartId = parseInt(req.params.cid, 10)
    let result = await cm.getProducts(cartId)
	res.status(result.code).send(result.message)
})

router.post("/:cid/product/:pid", async (req, res) => {
    let cartId = parseInt(req.params.cid, 10)
    let productId = parseInt(req.params.pid, 10)
    let result = await cm.addProduct(cartId, productId)
    res.status(result.code).send(result.message)
})

export default router