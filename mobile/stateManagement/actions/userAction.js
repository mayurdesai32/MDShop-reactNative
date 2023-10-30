import axios from 'axios';
import { server } from '../store';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        // withCredentials: true,
        // credentials: 'include',
      }
    );

    dispatch({ type: 'loginSuccess', payload: data.message });
    Toast.show({
      type: 'success',
      text1: data.message,
    });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.errmessage });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/user/register`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // withCredentials: true,
      // credentials: 'include',
    });

    dispatch({ type: 'registerSuccess', payload: data.message });
    Toast.show({
      type: 'success',
      text1: data.message,
    });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.errmessage });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'loadUserRequest' });
    const { data } = await axios.get(`${server}/user/profile`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    dispatch({ type: 'loadUserSuccess', payload: data?.user });
  } catch (error) {
    dispatch({
      type: 'loadUserFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response?.data?.errmessage,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'logoutRequest' });
    const { data } = await axios.post(`${server}/user/logout`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    dispatch({ type: 'logoutSuccess', payload: data.message });
    Toast.show({
      type: 'success',
      text1: data.message,
    });
  } catch (error) {
    dispatch({
      type: 'loadUserFail',
      payload: error.response.data.errmessage,
    });
    Toast.show({
      type: 'error',
      text1: error.response.data.errmessage,
    });
  }
};
