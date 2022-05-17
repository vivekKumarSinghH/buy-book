import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import bookReducer from "./features/bookSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
   book:bookReducer,
  },
});
