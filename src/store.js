import {configureStore, createSlice} from '@reduxjs/toolkit';

const initialState = {cart: []};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const productID = action.payload;

            if (!state.cart.includes(productID)) {
                state.cart = [productID, ...state.cart];
            }
        },
        removeFromCart: (state, action) => {
            const productID = action.payload;

            if (state.cart.includes(productID)) {
                state.cart.splice(state.cart.indexOf(productID), 1);
            }
        },
    }
});

export const {addToCart, removeFromCart} = cartSlice.actions;

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer
    }
})