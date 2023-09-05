const socket = io()

let productGrid = document.getElementById("product-grid")
let deleteBtn = document.getElementById("deleteBtn")
let addBtn = document.getElementById("addBtn")

// Corroboramos conexión servidor-cliente
socket.on("checking", (data) => console.log(data))

function buildProductList(productList) {
    let cards = ""
    for (const product of productList) {
        cards+=`<div class="g-col-6 g-col-md-4 mb-4">
                    <div class="card " style="width: 18rem;">
                        <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}-img"/>
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Precio: ${product.price}</li>
                                <li class="list-group-item">Categoría: ${product.category}</li>
                                <li class="list-group-item">Código: ${product.code}</li>
                            </ul>
                        </div>
                    </div>
                </div>`
    }
    return cards
}

// Enviamos lista de productos al cliente para que la muestre desde websocket
socket.on("displayProducts", async (data) => {
    productGrid.innerHTML = buildProductList(data)
    console.log("Mostrando productos desde websocket")
})

// Modificamos lista de productos en tiempo real
socket.on("modifyProductList", (data) => {
    deleteBtn.addEventListener("click", ()=> {
        productGrid.innerHTML = buildProductList(data)
    })
    addBtn.addEventListener("click", ()=> {
        productGrid.innerHTML = buildProductList(data)
    })
})