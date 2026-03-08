import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../feature/product/productSllice.js'
import  useReducer  from "../feature/user/userSlice.js";
import cartReducer from '../feature/cart/cartSlice.js'
import orderReducer from '../feature/order/orderSlice.js'
export const store =  configureStore({
    reducer:{
        product : productReducer,
        user : useReducer,
        cart:cartReducer,
        order:orderReducer
    }
})