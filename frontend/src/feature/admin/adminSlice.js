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
        return rejectWithValue(error.response?.data || "Failed To Craete Products");
    }
});

// update Product
export const updateProduct = createAsyncThunk("admin/updateProduct", async ({id, formData}, {rejectWithValue}) => {
    try {
        const config={
            headers:   {
                'Content-Type' : 'multipart/form-data'
            } 
        }
        const {data}= await axios.put(`/api/v1/admin/product/${id}`, formData, config)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed To  Update Products");
    }
});
// delete Product
export const deleteProduct = createAsyncThunk("admin/deleteProduct", async (productId, {rejectWithValue}) => {
    try {
        const {data}= await axios.delete(`/api/v1/admin/product/${productId}`)
        return productId;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed To delete Products");
    }
});
// Fetch All User
export const fetchUser = createAsyncThunk("admin/fetchUser", async (_, {rejectWithValue}) => {
    try {
        const {data}= await axios.get(`/api/v1/admin/users`)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed To fetch users ");
    }
});
// getSingleUser for edit user
export const getSingleUser = createAsyncThunk("admin/getSingleUser", async (id, {rejectWithValue}) => {
    try {
        const {data}= await axios.get(`/api/v1/admin/user/:id`)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed To fetch single users ");
    }
});

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        products: [],
        loading : false,
        success : false,
        error: null,
        product: {},
        deleting:{},
        users : [],
        user: {}
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
        state.error = action.payload?.message || "Failed To fetch Products"
    })

    // create product
    builder
    .addCase(createProducts.pending,(state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(createProducts.fulfilled,(state, action)=>{
        state.loading = false;
        state.success = action.payload?.success;
        state.products.push(action.payload.product)
      
    })
    .addCase(createProducts.rejected,(state, action)=>{
        state.loading  = false,
        state.error = action.payload?.message || "Failed TO  Craete Products"
    })
    // update product
    builder
    .addCase(updateProduct.pending,(state)=>{
        state.loading = true;
        state.error = null;
    })
    .addCase(updateProduct.fulfilled,(state, action)=>{
      state.loading = false;
        state.success = action.payload.success;
        state.product = action.payload.product;
      
    })
    .addCase(updateProduct.rejected,(state, action)=>{
        state.loading  = false,
        state.error = action.payload?.message || "Failed To update Products"
    })
    // delete product
    builder
        .addCase(deleteProduct.pending,(state, action)=>{
                const productId = action.meta?.arg;
                if (productId) {
                    state.deleting[productId] = true;
                }
        state.error = null;
    })
    .addCase(deleteProduct.fulfilled,(state, action)=>{
                const productId = action.payload;
                if (productId) {
                    state.deleting[productId] = false;
                }
            state.products = state.products.filter((product)=> product._id !== productId)
      
    })
    .addCase(deleteProduct.rejected,(state, action)=>{
                const productId = action.meta?.arg;
                if (productId) {
                    state.deleting[productId] = false;
                }
        state.error = action.payload?.message || "Failed To delete Products"
    })
    // fetch User
    builder
        .addCase(fetchUser.pending,(state, action)=>{
            state.loading = true;
        state.error = null;
    })
    .addCase(fetchUser.fulfilled,(state, action)=>{
        state.loading = false;
        state.users = action.payload.users
      
    })
    .addCase(fetchUser.rejected,(state, action)=>{
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch users"
    })
    // single user fetch User
    builder
        .addCase(getSingleUser.pending,(state, action)=>{
            state.loading = true;
        state.error = null;
    })
    .addCase(getSingleUser.fulfilled,(state, action)=>{
        state.loading = false;
        state.user = action.payload.user;
      
    })
    .addCase(getSingleUser.rejected,(state, action)=>{
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch single users"
    })
  }
})

export const { removeError, removeSuccess} =adminSlice.actions
export default adminSlice.reducer