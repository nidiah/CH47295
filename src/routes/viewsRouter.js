import { Router } from "express"
import { productManager } from '../productManager.js'

const router =  Router()
const pm = new productManager()


router.get("/", async (req, res) => {
	const products = await pm.getProducts()
    res.render("home", {products})
})


router.get("/realtimeproducts", async (req, res) => {    
    res.render("realTimeProducts")
    //req.context.socketServer.emit("displayProducts", (products))
    
})

router.post("/realtimeproducts", async (req, res) => {
    res.render("realTimeProducts")
    // Borrar un producto
    const productId = req.body.id

    if (productId != undefined) {
        await pm.deleteProduct(productId)
    }

    // Agregar productos
    const newProduct = {
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status,
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails,
    }
    await pm.addProduct(newProduct)

    // Mostrar lista de productos modificada
    req.context.socketServer.emit("modifyProductList", (await pm.getProducts()))

})

export default router