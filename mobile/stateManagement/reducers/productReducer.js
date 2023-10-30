import { createReducer } from '@reduxjs/toolkit';
export const productReducer = createReducer(
  {
    products: [],
    product: {},
    loading: false,
  },
  (builder) => {
    builder
      .addCase('getAllProductRequest', (state) => {
        state.loading = true;
      })
      .addCase('getAdminProductRequest', (state) => {
        state.loading = true;
      })
      .addCase('getProductDetailRequest', (state) => {
        state.loading = true;
      });

    builder
      .addCase('getAllProductSuccess', (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase('getAdminProductSuccess', (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.inStock = action.payload.inStock;
        state.outOfStock = action.payload.outOfStock;
      })
      .addCase('getProductDetailSuccess', (state, action) => {
        state.loading = false;
        state.product = action.payload;
      });

    builder
      .addCase('getAllProductFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('getAdminProductFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('getProductDetailFail', (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase('clearError', (state, action) => {
      state.error = null;
    });
    builder.addCase('clearMessage', (state, action) => {
      state.message = null;
    });
  }
);
