import axios from 'axios';
import { server } from '../store';
import Toast from 'react-native-toast-message';

export const updatePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({
        type: 'updatePasswordRequest',
      });
      // {{network}}/v2/api/user/updatepassword
      const { data } = await axios.put(
        `${server}/user/updatepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'updatePasswordSuccess',
        payload: data.message,
      });
      Toast.show({
        type: 'success',
        text1: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'updatePasswordFail',
        payload: error.response.data.errmessage,
      });
      Toast.show({
        type: 'error',
        text1: error.response.data.errmessage,
      });
    }
  };

export const updateProfile =
  (name, email, address, city, country, pinCode) => async (dispatch) => {
    try {
      dispatch({
        type: 'updateProfileRequest',
      });

      const { data } = await axios.put(
        `${server}/user/updateprofile`,
        { name, email, address, city, country, pinCode },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'updateProfileSuccess',
        payload: data.message,
      });
      Toast.show({
        type: 'success',
        text1: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'updateProfileFail',
        payload: error.response.data.errmessage,
      });
      Toast.show({
        type: 'error',
        text1: error.response.data.errmessage,
      });
    }
  };

export const updatePic = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'updatePicRequest' });
    // console.log(formData._parts[0]);
    const { data } = await axios.put(`${server}/user/updatepic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'updatePicSuccess', payload: data.message });
    Toast.show({
      type: 'success',
      text1: 'updated picture successfull ',
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: 'updatePicFail',
      payload: error.response?.data?.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const placeOrder =
  (
    shippingInfo,
    orderItems,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingCharges,
    totalAmount
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: 'placeOrderRequest',
      });
      //  /v2/api/order/create

      const { data } = await axios.post(
        `${server}/order/create`,
        {
          shippingInfo,
          orderItems,
          paymentMethod,
          paymentInfo,
          itemsPrice,
          taxPrice,
          shippingCharges,
          totalAmount,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'placeOrderSuccess',
        payload: data.message,
      });

      Toast.show({
        type: 'success',
        text1: 'order successfull register',
      });
    } catch (error) {
      dispatch({
        type: 'placeOrderFail',
        payload: error.response.data.errmessage,
      });
      Toast.show({
        type: 'error',
        text1: error.response.data.errmessage,
      });
    }
  };

export const processOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'processOrderRequest',
    });
    //  /v2/api/order/create

    const { data } = await axios.put(
      `${server}/order/admin/update/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'processOrderSuccess',
      payload: data.message,
    });

    Toast.show({
      type: 'success',
      text1: 'order successfull updated',
    });
  } catch (error) {
    dispatch({
      type: 'processOrderFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const addCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: 'addCategoryRequest',
    });
    //  /v2/api/order/create

    const { data } = await axios.post(
      `${server}/product/category`,
      { category },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'addCategorySuccess',
      payload: data.message,
    });

    Toast.show({
      type: 'success',
      text1: 'category successfull ',
    });
  } catch (error) {
    dispatch({
      type: 'addCategoryFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: 'deleteCategoryRequest',
    });
    //  /v2/api/order/create

    const { data } = await axios.delete(
      `${server}/product/categories/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'deleteCategorySuccess',
      payload: data.message,
    });

    Toast.show({
      type: 'success',
      text1: 'category successfull ',
    });
  } catch (error) {
    dispatch({
      type: 'deleteCategoryFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const productCreate = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'addProductRequest' });
    // console.log(formData._parts[0]);
    const { data } = await axios.post(`${server}/product/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    dispatch({ type: 'addProductSuccess', payload: data.message });
    Toast.show({
      type: 'success',
      text1: 'Product added successfull ',
    });
  } catch (error) {
    dispatch({
      type: 'addProductFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const updateProduct =
  (id, name, description, category, stock, price) => async (dispatch) => {
    try {
      dispatch({
        type: 'updateProductRequest',
      });

      const { data } = await axios.put(
        `${server}/product/admin/${id}`,
        {
          name,
          description,
          category,
          stock,
          price,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      dispatch({
        type: 'updateProductSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'updateProductFail',
        payload: error.response.data.errmessage,
      });
    }
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  };

export const updateProductImage = (id, formData) => async (dispatch) => {
  try {
    dispatch({ type: 'updateProductImageRequest' });
    // console.log(formData._parts[0]);
    const { data } = await axios.post(
      `${server}/product/images/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'updateProductImageSuccess', payload: data.message });
    Toast.show({
      type: 'success',
      text1: 'Product image added successfull ',
    });
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: 'updateProductImageFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const deleteProductImage = (productId, imageId) => async (dispatch) => {
  try {
    dispatch({ type: 'deleteProductImageRequest' });
    // console.log(formData._parts[0]);
    const { data } = await axios.delete(
      `${server}/product/images/${productId}?imageId=${imageId}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    );

    dispatch({ type: 'deleteProductImageSuccess', payload: data.message });
    Toast.show({
      type: 'success',
      text1: 'Product image deleted successfull ',
    });
  } catch (error) {
    // console.log(error.response.data);
    dispatch({
      type: 'deleteProductImageFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: 'deleteProductRequest' });
    // console.log(formData._parts[0]);
    const { data } = await axios.delete(
      `${server}/product/admin/${productId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({ type: 'deleteProductSuccess', payload: data.message });
    Toast.show({
      type: 'success',
      text1: 'Product deleted successfull ',
    });
  } catch (error) {
    dispatch({
      type: 'deleteProductFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};
// forgotPassword;

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: 'forgotPasswordRequest',
    });

    const { data } = await axios.post(
      `${server}/user/forgotpassword`,
      {
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'forgotPasswordSuccess',
      payload: data.message,
    });

    Toast.show({
      type: 'success',
      text1: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'forgotPasswordFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

// resetPassword
export const resetPassword = (otp, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'resetPasswordRequest',
    });

    const { data } = await axios.put(
      `${server}/user/resetpassword`,
      { otp, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    dispatch({
      type: 'resetPasswordSuccess',
      payload: data.message,
    });

    Toast.show({
      type: 'success',
      text1: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'resetPasswordFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};
