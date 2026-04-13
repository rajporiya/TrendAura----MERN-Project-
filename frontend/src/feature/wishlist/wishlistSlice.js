import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";

const mapWishlistProduct = (product) => ({
  _id: product?._id,
  name: product?.name,
  price: product?.price,
  stock: Number(product?.stock || 0),
  ratting: product?.ratting ?? product?.rating ?? 0,
  numOfReview: product?.numOfReview ?? product?.numOfReviews ?? 0,
  image: product?.image || [],
});

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/wishlist");
      return (data?.wishlist || []).map(mapWishlistProduct);
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to load wishlist");
    }
  },
);

export const addProductToWishlist = createAsyncThunk(
  "wishlist/addProductToWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/api/v1/wishlist/${productId}`);
      return {
        wishlist: (data?.wishlist || []).map(mapWishlistProduct),
        message: data?.message || "Product added to wishlist",
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add wishlist item");
    }
  },
);

export const removeProductFromWishlist = createAsyncThunk(
  "wishlist/removeProductFromWishlist",
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`/api/v1/wishlist/${productId}`);
      return {
        wishlist: (data?.wishlist || []).map(mapWishlistProduct),
        message: data?.message || "Product removed from wishlist",
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to remove wishlist item");
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: JSON.parse(localStorage.getItem("wishlistItems")) || [],
    loading: false,
    error: null,
    message: null,
    success: false,
  },
  reducers: {
    clearWishlistError: (state) => {
      state.error = null;
    },
    clearWishlistMessage: (state) => {
      state.message = null;
      state.success = false;
    },
    clearWishlistState: (state) => {
      state.wishlistItems = [];
      state.loading = false;
      state.error = null;
      state.message = null;
      state.success = false;
      localStorage.removeItem("wishlistItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.wishlistItems = action.payload;
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load wishlist";
        if (action.payload?.statusCode === 401) {
          state.wishlistItems = [];
          localStorage.removeItem("wishlistItems");
        }
      })
      .addCase(addProductToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProductToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.wishlistItems = action.payload.wishlist;
        state.message = action.payload.message;
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
      })
      .addCase(addProductToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Failed to add wishlist item";
      })
      .addCase(removeProductFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(removeProductFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.wishlistItems = action.payload.wishlist;
        state.message = action.payload.message;
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
      })
      .addCase(removeProductFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload?.message || "Failed to remove wishlist item";
      })
      .addCase("user/logout/fulfilled", (state) => {
        state.wishlistItems = [];
        state.loading = false;
        state.error = null;
        state.message = null;
        state.success = false;
        localStorage.removeItem("wishlistItems");
      });
  },
});

export const { clearWishlistError, clearWishlistMessage, clearWishlistState } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
