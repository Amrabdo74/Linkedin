import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../fierbase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
export const getArticles = createAsyncThunk(
  "articles/getArticles",
  async () => {
    return new Promise((resolve, reject) => {
      const collRef = collection(db, "articles");
      const orderedRef = query(collRef, orderBy("actor.date", "desc"));

      const unsubscribe = onSnapshot(
        orderedRef,
        (snapshot) => {
          const data = snapshot.docs.map((doc) =>  doc.data());
          unsubscribe(); // Unsubscribe when data is retrieved
          resolve(data);
        },
        (error) => {
          console.error("Error getting articles: ", error);
          unsubscribe(); // Unsubscribe on error
          reject(error);
        }
      );
    });
  }
  );

  export const articleSlice = createSlice({  
  name: "article",
  initialState: {
    articles:[],
    isLoading: false, // Initialize isLoading as false
  },
  reducers: {
    // You can add other reducers if needed
    // eslint-disable-next-line no-unused-vars

    postArticles: (state, action) => {

      if (action.payload.image) {
        const storageRef = ref(storage, `images/${action.payload.name}`);
         const  uploadRef = uploadBytesResumable(
          storageRef,
          action.payload.image
        );
        uploadRef.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log("Upload progress: " + progress + "% bytes transferred");
          },
          (error) => {
            alert(error.message);
          },
          () => {
            
            getDownloadURL(uploadRef.snapshot.ref).then((downloadURL) => {

              const collRef = collection(db, "articles");
              addDoc(collRef, {
                actor: {
                  description: action.payload.email,
                  title: action.payload.displayName,
                  image: action.payload.photoURL,
                  date: action.payload.timestamp,
                },
                comments: 0,
                video: action.payload.video,
                description: action.payload.description,
                shareImg: downloadURL,
              });

            });
          }
          );
          

      } else if (action.payload.video) {
        const collRef = collection(db, "articles");
        addDoc(collRef, {
          actor: {
            description: action.payload.email,
            title: action.payload.displayName,
            image: action.payload.photoURL,
            date: action.payload.timestamp,
          },
          comments: 0,
          video: action.payload.video,
          description: action.payload.description,
          shareImg: action.payload.image,
        });
        state.isLoading = !state.isLoading;

      } else {
        const collRef = collection(db, "articles");
        addDoc(collRef, {
          actor: {
            description: action.payload.email,
            title: action.payload.displayName,
            image: action.payload.photoURL,
            date: action.payload.timestamp,
          },
          comments: 0,
          video: action.payload.video,
          description: action.payload.description,
          shareImg: action.payload.image,
        });
        
        state.isLoading = !state.isLoading;
      }
    },
    isLoadingDis:(state , action) =>{
      state.isLoading = true
    },
    isLoadingfalse:(state , action) =>{
      state.isLoading = false
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload; // Update the articles state with the retrieved data
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false;
        // Handle the error here if needed
      });
    }
});

export const { postArticles,isLoadingDis,isLoadingfalse } = articleSlice.actions;
export default articleSlice.reducer;
