import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig.js";

// registration api

export const register = createAsyncThunk("user/register", async (userData, {rejectWithValue}) => {
    try {
        const config = {
            headers :{
                'Content-Type' : 'application/json'
            }
        } 
        const {data}   = await axios.post('/api/v1/register', userData, config)
        console.log('registration data', data);
        
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Registration Failled");
    }
});
// Login Api
export const login = createAsyncThunk("user/login", async ({email, password}, {rejectWithValue}) => {
    try {
        const config = {
            headers :{
                'content-type' : 'application/json'
            }
        } 
        const {data}   = await axios.post('/api/v1/login', {email,password}, config)
        console.log('Login data', data);
        
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login  Failled");
    }
});

// LaodUser Api
export const loadUser = createAsyncThunk("user/loadUser", async (_, {rejectWithValue}) => {
    try {
        const {data} = await axios.get('/api/v1/profile')
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to load user");
    }
});
// update profile
export const updateProfile = createAsyncThunk("user/updateProfile", async (userData, {rejectWithValue}) => {
    try {
        const config = {
            headers :{
                'Content-Type' : 'multipart/form-data'
            }
        } 
        const {data}   = await axios.put('/api/v1/profile/update', userData, config)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Profile updat fail");
    }
});
// update Password
export const updatePassword = createAsyncThunk("user/updatePassword", async (formData, {rejectWithValue}) => {
    try {
        const config = {
            headers :{
                'Content-Type' : 'aplication/json'
            }
        } 
        const {data}   = await axios.put('/api/v1/password/update', formData, config)
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Profile updat fail");
    }
});
// Logout Api
export const logout = createAsyncThunk("user/logout", async (_, {rejectWithValue}) => {
    try {
        const {data}   = await axios.post('/api/v1/logout', {withCredentials: true})
        return data
    } catch (error) {
        return rejectWithValue(error.response?.data || "Logout Failed");
    }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false,
    success: false,
    message : null
  },
  reducers: {
    removeError: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers:(builder)=>{
    // Registration Process
    builder
    .addCase(register.pending,(state)=>{
        state.loading=true,
        state.error=null
    })
    .addCase(register.fulfilled,(state,action)=>{
        state.loading=false,
        state.error= null;
        state.user=action.payload?.user || null;
        state.success= true,
        state.isAuthenticated=Boolean(action.payload?.user)
    })
    .addCase(register.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message || 'Registration failed Plz Try again later'
        state.user = null,
        state.isAuthenticated=false
        
    })
    // Login process
    builder
    .addCase(login.pending,(state)=>{
        state.loading=true,
        state.error=null
    })
    .addCase(login.fulfilled,(state,action)=>{
        state.loading=false,
        state.error= null;
        state.user=action.payload?.user || null;
        state.success= true,
        state.isAuthenticated=Boolean(action.payload?.user)
        console.log(state.user);
        
    })
    .addCase(login.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message || 'Login failed. Plz Try again later'
        state.user = null,
        state.isAuthenticated=false;
    })
    // Loed User
    builder
    .addCase(loadUser.pending,(state)=>{
        state.loading=true,
        state.error=null
    })
    .addCase(loadUser.fulfilled,(state,action)=>{
        state.loading=false,
        state.error= null;
        state.user=action.payload?.user || null;
        state.isAuthenticated=Boolean(action.payload?.user)
        
    })
    .addCase(loadUser.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message || 'Failed to load User'
        state.user = null,
        state.isAuthenticated=false;
    })
    // Logout
    builder
    .addCase(logout.pending,(state)=>{
        state.loading=true,
        state.error=null
    })
    .addCase(logout.fulfilled,(state,action)=>{
        state.loading=false,
        state.error= null;
        state.user=null;
        state.isAuthenticated=false
        
    })
    .addCase(logout.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message || 'Logout Failed'
    });
    // update profile
    builder
    .addCase(updateProfile.pending,(state)=>{
        state.loading=true,
        state.error=null
    })
    .addCase(updateProfile.fulfilled,(state,action)=>{
        state.loading=false,
        state.error= null;
        state.user=action.payload.user || null;
        state.success = action.payload.success
        state.message = action.payload.message
    })
    .addCase(updateProfile.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message || 'Profile update Failed'
    });
    // update password
    builder
    .addCase(updatePassword.pending,(state)=>{
        state.loading=true,
        state.error=null
    })
    .addCase(updatePassword.fulfilled,(state,action)=>{
        state.loading=false,
        state.error= null;
        state.success = action.payload.success
    })
    .addCase(updatePassword.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload?.message || 'Profile update Failed'
    });
  }
});

export const { removeError, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
