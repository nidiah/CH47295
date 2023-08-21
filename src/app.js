// Desarrollar un servidor express que importe ProductMa

const express = require('express')
const app = express()

const ProductManager = require('./ProductManager.js')
const pm = new ProductManager()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

// // USAR ASYNC AWAIT EN LOS ENDPOINTS

app.get("/products", async (req, res) => {
	let queryLimit = req.query.limit
	const products = await pm.getProducts()

	if (! queryLimit) {
		res.send({Products: products})
	} else {
		res.send({Products: products.slice(0, parseInt(queryLimit))})
	}
})

app.get("/products/:pid", async (req, res) => {
	let requestedId = parseInt(req.params.pid)
	const requestedProduct = await pm.getProductById(requestedId) 
	res.send({requestedProduct})
})

app.listen(8080, () => 
	console.log("Recibiendo peticiones en puerto 8080"))