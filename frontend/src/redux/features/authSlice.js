import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success(`Login Successfully as ${response.data.result.role}`);
      // console.log(response)
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formValue,navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register Successfully");
      navigate("/login");
      // console.log(response)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success("Google Sign In Successfully");;
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addCart = createAsyncThunk(
  "auth/addCart",
  async ({ bookId,userId, navigate, toast,to }, { rejectWithValue }) => {
    try {
      const response = await api.AddCart(bookId,userId);
      toast.success(`Book is Added to the Cart Successfully`);
     
      navigate(to);
    
      return response.data.cart
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCart = createAsyncThunk(
  "auth/getCart",
  async ( userId  , { rejectWithValue }) => {
    try {
      const response = await api.getCart(userId);
     
      return response.data[0]
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteCart = createAsyncThunk(
  "auth/deleteCart",
  async ( userId  , { rejectWithValue }) => {
    try {
      const response = await api.deleteCart(userId);
     
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    cart:[],
    totalBill:0,
    error: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
    setBill:(state,action)=>{
state.totalBill=action.payload
    }
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      // localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      // state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    } ,  
    
    [googleSignIn.pending]: (state, action) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [addCart.pending]: (state, action) => {
      state.loading = true;
    },
  [addCart.fulfilled]: (state, action) => {
      state.loading = false;
     state.cart = action.payload?.bookIds;
    },
    [addCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },


    [getCart.pending]: (state, action) => {
      state.loading = true;
    },
  [getCart.fulfilled]: (state, action) => {
      state.loading = false;
     state.cart = action.payload?.bookIds;
    },
    [getCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    
    [deleteCart.pending]: (state, action) => {
      state.loading = true;
    },
  [deleteCart.fulfilled]: (state, action) => {
      state.loading = false;
     state.cart = [];
    },
    [deleteCart.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout ,setBill} = authSlice.actions;

export default authSlice.reducer;
