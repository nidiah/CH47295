import mongoose from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    "products": {
        type: Array,
        required: true
    }
})

const cartModel = mongoose.model(cartCollection, cartSchema)

export { cartModel }

// {
//     "id": 0,
//     "products": [
//         {
//             "product": 5,
//             "quantity": 3
//         },
//         {
//             "product": 7,
//             "quantity": 1
//         }
//     ]
// }