import { auth, provider } from "../../fierbase";
import { signInWithPopup } from "firebase/auth";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for signing in and updating user data
export const signInAndFetchUserData = createAsyncThunk(
  "userDataSlice/signInAndFetchUserData",
  async () => {
    // Sign in with Firebase
    const userCredential = await signInWithPopup(auth, provider);
    // Extract user data from userCredential or perform other necessary actions
    const user = {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
      photoURL: userCredential.user.photoURL,
      // Add other relevant user data here
    };

    return user;
  }
);

export const getUserAuth = createAsyncThunk(
  "userDataSlice/getUserAuth",
  async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        return user;
      }
    });
  }
);

export const userDataSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    // You can add other reducers if needed
    // eslint-disable-next-line no-unused-vars
    logOut: (state, action) => {
      localStorage.setItem("user", JSON.stringify(null));
      return null;
    },
    getuserData: (state, action) => {
      const userData = JSON.parse(localStorage.getItem("user"));
      return userData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInAndFetchUserData.fulfilled, (state, action) => {
      // Store an item in local storage
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    });
    builder.addCase(getUserAuth.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { logOut, getuserData } = userDataSlice.actions;
export default userDataSlice.reducer;
