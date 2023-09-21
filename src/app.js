import express from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"
import { Server } from "socket.io"
import productsRouter from "./routes/productsRouter.js"
import cartsRouter from "./routes/cartsRouter.js"
import viewsRouter from "./routes/viewsRouter.js"
import productManager from './dao/db/productManager.js'
import initEvents from './socket/index.js';

mongoose.connect("mongodb+srv://nidinhernandez:0sYocp1J1IM0s8VF@cluster0.6htebon.mongodb.net/?retryWrites=true&w=majority")

const app = express()
const httpServer = app.listen(8080, () => console.log("Listening on port 8080"))
const socketServer = new Server(httpServer)

//const pm = new productManager()

app.engine("handlebars", handlebars.engine())
app.set("views", "./src/views")
app.set("view engine", "handlebars")
app.use("/static", express.static("./src/public"))

// socketServer.on("connection", async (socket) =>{
// 	// Corroboramos conexión servidor-cliente
// 	console.log(`Cliente conectado: ${socket.id}`)
// 	// Enviamos lista de productos al cliente para  
//     // que la muestre desde websocket
// 	socket.emit("displayProducts", await pm.getProducts())
// })

// middleware
app.use((req, res, next) =>{
	req.context = {socketServer}
	next()
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// endpoints
// app.use("/", viewsRouter)
// app.use("/chat", viewsRouter)
// app.use("/realtimeproducts", viewsRouter)
app.use(viewsRouter)
app.use("/api/products/", productsRouter)
app.use("/api/carts/", cartsRouter)

initEvents(socketServer);