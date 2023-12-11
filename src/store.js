
// for creating store
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

// Product Reducer
import { productsReducer } from "./redux/reducers/productReducer";
// import middleware function here
import { loggerMiddleware } from "./redux/middlewares/loggerMiddleware";

// creating store from reducers
export const store = configureStore({
    reducer:{
        productsReducer
    },
    // middleware: [...getDefaultMiddleware(), loggerMiddleware]
})