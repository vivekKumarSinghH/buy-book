import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createBook = createAsyncThunk(
  "book/createBook",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
   formValue.category= formValue.category.replace("-","").replace(" ","").toLowerCase()
  

      const response = await api.createBook(formValue);
      toast.success("Book Added Successfully");
      // console.log(response.data)
      navigate("/");

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async ({sort,category,page}, { rejectWithValue }) => {
    try {
      let p=`page=${page}`,c,s
if(sort ){
s=`sort=${sort}`

}
if(category&& category!="store"){
  c=`category=${category}`
}
      const response = await api.getBooks({p,c,s});
     
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getBook = createAsyncThunk(
  "book/getBook",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getBook(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);




export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async ({ id, toast }, { rejectWithValue }) => {
    try {
      const response = await api.deleteBook(id);
      toast.success("Book Deleted Successfully");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBook = createAsyncThunk(
  "book/updateBook",
  async ({ id, formValue, toast, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.updateBook(formValue, id);
      toast.success("Book Updated Successfully");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const searchBooks = createAsyncThunk(
  "tour/searchBooks",
  async (searchQuery, { rejectWithValue }) => {
    try {
      const response = await api.getBooksBySearch(searchQuery);
      
      console.log(response.data)
      
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);



const bookSlice = createSlice({
  name: "book",
  initialState: {
    book: {},
    books: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;

    },
  },
  extraReducers: {
    [createBook.pending]: (state, action) => {
      state.loading = true;
    },
    [createBook.fulfilled]: (state, action) => {
      state.loading = false;
      // state.tours = [action.payload];
    },
    [createBook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [getBooks.pending]: (state, action) => {
      state.loading = true;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.loading = false;
    
      state.books = action.payload.data;
      
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    
    
    },
    [getBooks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },


    
      // state.numberOfPages = action.payload.numberOfPages;
      // state.currentPage = action.payload.currentPage;
    
    
      [getBook.pending]: (state, action) => {
        state.loading = true;
      },
      [getBook.fulfilled]: (state, action) => {
        state.loading = false;
      
        state.book = action.payload;
      },
      [getBook.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
   
    [deleteBook.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.loading = false;
      // console.log(action)
      const {
        arg: { id },
      } = action.meta;
      if (id) {
      state.books = state.books.filter((item) => item._id !== id);
      }
    },
    [deleteBook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateBook.pending]: (state, action) => {
      state.loading = true;
    },
    [updateBook.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        
        state.books = state.books.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateBook.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  
    [searchBooks.pending]: (state, action) => {
      state.loading = true;
    },
    [searchBooks.fulfilled]: (state, action) => {
      state.loading = false;
      state.books = action.payload;
      state.numberOfPages = 1;
      state.currentPage = 1;
    },
    [searchBooks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    
    
  },
});

export const { setCurrentPage } = bookSlice.actions;

export default bookSlice.reducer;