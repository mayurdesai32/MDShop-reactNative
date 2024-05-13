import axios from 'axios';
import { server } from '../store';
import Toast from 'react-native-toast-message';

export const getAllProduct = (keyword, category) => async (dispatch) => {
  try {
    let theUrl = `${server}/product/all?keyword=${keyword}&category=${category}`;

    if (!category) {
      theUrl = `${server}/product/all?keyword=${keyword}`;
    }
    dispatch({ type: 'getAllProductRequest' });
    const { data } = await axios.get(theUrl, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    dispatch({ type: 'getAllProductSuccess', payload: data.products });
  } catch (error) {
    dispatch({
      type: 'getAllProductFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const getAdminProduct = () => async (dispatch) => {
  try {
    dispatch({ type: 'getAdminProductRequest' });
    const { data } = await axios.get(`${server}/product/admin`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    dispatch({ type: 'getAdminProductSuccess', payload: data });
  } catch (error) {
    dispatch({
      type: 'getAdminProductSuccess',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'getProductDetailRequest' });
    const { data } = await axios.get(`${server}/product/productbyid/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    dispatch({ type: 'getProductDetailSuccess', payload: data.product });
  } catch (error) {
    dispatch({
      type: 'getProductDetailFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};
