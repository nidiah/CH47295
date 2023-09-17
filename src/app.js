import express from "express"
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"
import { productManager } from './productManager.js'

const app = express()
const httpServer = app.listen(8080, () => console.log("Listening on port 8080"))
const socketServer = new Server(httpServer)
const pm = new productManager()

app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")
app.use(express.static("./src/public"))

socketServer.on("connection", async (socket) =>{
	// Corroboramos conexión servidor-cliente
	console.log(`Cliente conectado: ${socket.id}`)
	// Enviamos lista de productos al cliente para  
    // que la muestre desde websocket
	socket.emit("displayProducts", await pm.getProducts())
})

// middleware
app.use((req, res, next) =>{
	req.context = {socketServer}
	next()
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// endpoints
app.use("/", viewsRouter)
app.use("/realtimeproducts", viewsRouter)
app.use("/api/products/", productsRouter)
app.use("/api/carts/", cartsRouter)