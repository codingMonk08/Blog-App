import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import postsSlice from './postSlice'; // Import the posts slice

const store = configureStore({
    reducer: {
        auth: authSlice,
        posts: postsSlice, // Add the posts slice
    },
});

export default store;
