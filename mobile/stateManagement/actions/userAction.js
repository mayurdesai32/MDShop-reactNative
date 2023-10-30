import axios from 'axios';
import { server } from '../store';

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    dispatch({ type: 'loginRequest' });
    console.log(`${server}/user/login`);
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
  } catch (error) {
    // console.log(error.response.data);
    dispatch({ type: 'loginFail', payload: error.response.data.errmessage });
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
  } catch (error) {
    // console.log(error.response.data);
    dispatch({ type: 'registerFail', payload: error.response.data.errmessage });
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

    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({
      type: 'loadUserFail',
      payload: error.response.data.errmessage,
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
  } catch (error) {
    dispatch({
      type: 'loadUserFail',
      payload: error.response.data.errmessage,
    });
  }
};
