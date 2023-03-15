import { uniqueId } from '@/components/formAddProduct'
import IProduct from '@/types/product.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const initialState: IProduct[] = []

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<IProduct>) => {
            state.push(action.payload)
            return state
        },
        removeItem: (state, action: PayloadAction<{ id: string }>) => {
            return state.filter(product => product.id != action.payload.id)
        },
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state = action.payload
            return state
        }
    }
})

export const productReducer = productSlice.reducer
export const productAction = productSlice.actions


