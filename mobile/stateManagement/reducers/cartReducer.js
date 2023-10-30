import { createReducer } from '@reduxjs/toolkit';
export const cartReducer = createReducer(
  {
    cartItems: [],
  },
  (builder) => {
    builder
      .addCase('addToCart', (state, action) => {
        const item = action.payload;
        const isExist = state.cartItems.find((e) => e.product === item.product);
        if (isExist) {
          state.cartItems = state.cartItems.filter((ele) =>
            ele.product === isExist.product ? item : ele
          );
          for (let i = 0; i < state.cartItems.length; i++) {
            if (state.cartItems[i].product === isExist.product)
              state.cartItems[i] = item;
          }
        } else {
          state.cartItems.push(item);
        }
      })
      .addCase('removeFromCart', (state, action) => {
        const id = action.payload;
        state.cartItems = state.cartItems.filter((ele) => ele.product != id);
      })
      .addCase('clearCart', (state, action) => {
        state.cartItems = [];
      });
  }
);
