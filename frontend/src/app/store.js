import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../feature/product/productSllice.js'
import  useReducer  from "../feature/user/userSlice.js";
export const store =  configureStore({
    reducer:{
        product : productReducer,
        user : useReducer
    }
})