import { Router } from "express"
import { productManager } from '../productManager.js'

const router =  Router()
const pm = new productManager()


router.get("/", async (req, res) => {
	const products = await pm.getProducts()
    res.render("home", {products})
})


router.get("/realtimeproducts", (req, res) => {    
    res.render("realTimeProducts")

    req.context.socketServer.on("connection", async (socket) => {
        // Corroboramos conexión servidor-cliente
        console.log(`Cliente conectado: ${socket.id}`)
        socket.emit("checking", {mensaje: `Verificando conexión con socket ${socket.id}`})
        // Enviamos lista de productos al cliente para  
        // que la muestre desde websocket
        let products = await pm.getProducts()
        socket.emit("displayProducts", products)
    })
    
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
    req.context.socketServer.on("Nconnection", async (socket) => {
        let products = await pm.getProducts()
        socket.emit("modifyProductList", products)
    })
})

export default router