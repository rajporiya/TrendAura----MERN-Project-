import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// create Order
export const createOder = createAsyncThunk("order/createOrder", async (order, {rejectWithValue}) => {
    try {
        const config = {
            headers :{
                'Content-Type' : 'application/json'
            }
        } 
        const {data}   = await axios.post('/api/v1//new/order', order, config)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to create Order");
    }
});

const orderSlice = createSlice({
    name : "order",
    initialState: {
        loading: false,
        error : null,
        success : false,
        order :{},
        orders: []
    },
    reducers: {
        removeError: (state)=> {
            state.error = null;
        },
        removeSuccess: (state)=> {
            state.success = false;
        },
    },
    extraReducers:(builder)=>{
        // create order
        builder
        .addCase(createOder.pending,(state)=>{
            state.loading = true,
            state.error = null;
        })
        .addCase(createOder.fulfilled,(state, action)=>{
            state.loading = false;
            state.success = action.payload.success;
            state.order = action.payload.order;
        })
        .addCase(createOder.rejected,(state, action)=>{
            state.loading = false,
            state.error = action.payload?.message || "Failer to create order"
        })
    } 
})
export const { removeError, removeSuccess}=orderSlice.actions;
export default orderSlice.reducer