import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/userReducer';
import { otherReducer } from './reducers/otherReducer';
import { productReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    other: otherReducer,
    product: productReducer,
    Cart: cartReducer,
  },
});
// export const server = 'https://mdshop-reactnative.onrender.com/v2/api';

export const server = 'http://192.168.22.108:5000/v2/api';
