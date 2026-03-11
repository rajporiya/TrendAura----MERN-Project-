import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Admin fetch akll products
export const fetchAllProducts = createAsyncThunk("admin/fetchAllProducts", async (_, {rejectWithValue}) => {
    try {
        const {data}= await axios.get('/api/v1/admin/products')
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed TO  fetch Products");
    }
});

// create productrs
export const createProducts = createAsyncThunk("admin/createProducts", async (productData, {rejectWithValue}) => {
    try {
        const config={
            headers:   {
                'Content-Type' : 'multipart/form-data'
            } 
        }
        const {data}= await axios.post('/api/v1/admin/dashboard/create', productData, config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed TO  Craete Products");
    }
});

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        products: [],
        loading : false,
        success : false,
        error: null
    },
    reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers : (builder)=>{
    builder
    .addCase(fetchAllProducts.pending,(state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchAllProducts.fulfilled,(state, action)=>{
        state.loading = false;
        state.products = action.payload.products;
    })
    .addCase(fetchAllProducts.rejected,(state, action)=>{
        state.loading  = false,
        state.error = action.payload?.message || "Failed TO fetch Products"
    })

    // create product
    builder
    .addCase(createProducts.pending,(state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(createProducts.fulfilled,(state, action)=>{
        state.loading = false;
        state.success = action.payload?.success ?? action.payload?.succes ?? false;
        if (action.payload?.product) {
            state.products.unshift(action.payload.product)
        }
    })
    .addCase(createProducts.rejected,(state, action)=>{
        state.loading  = false,
        state.error = action.payload?.message || "Failed TO  Craete Products"
    })
  }
})

export const { removeError, removeSuccess} =adminSlice.actions
export default adminSlice.reducer