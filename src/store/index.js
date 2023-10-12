
import { configureStore } from "@reduxjs/toolkit";
import userData from "./Slices/userSlice";
import articleSlice from "./Slices/articleSlice";

export const store = configureStore({
  reducer:{
    user:userData,
    articles:articleSlice,
  }

});
