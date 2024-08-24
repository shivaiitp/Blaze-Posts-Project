import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import tinyMceReducer from './tinyMceSlice';
import postReducer from './postSlice';

const store = configureStore({
    reducer: {
        auth : authSlice,
        posts : postReducer,
        tinyMce : tinyMceReducer,
        //TODO: add more slices here for posts
    }
});


export default store;