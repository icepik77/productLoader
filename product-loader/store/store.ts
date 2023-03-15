import { configureStore } from "@reduxjs/toolkit"
import { productReducer } from "./product/product.slice"
import { productApi } from "./product/product.api"

export const store = configureStore({
    reducer: { [productApi.reducerPath]: productApi.reducer, products: productReducer },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(productApi.middleware)
})

export type TypeRootState = ReturnType<typeof store.getState>

