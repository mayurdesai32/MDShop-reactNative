import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import { loadUser } from '../stateManagement/actions/userAction';
import axios from 'axios';
import { server } from '../stateManagement/store';
import { getAdminProduct } from '../stateManagement/actions/productAction';
// import { useNavigation } from '@react-navigation/native';
export const useUserMessageAndError = (
  navigation,
  dispatch,
  navigateTo = 'login'
) => {
  // const navigation = useNavigation();
  const { error, loading, message } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
      dispatch({ type: 'clearError' });
    }
    if (message) {
      navigation.reset({ index: 0, routes: [{ name: navigateTo }] });
      Toast.show({
        type: 'success',
        text1: message,
      });
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }
  }, [message, error, dispatch]);
  return loading;
};

export const useOtherMessageAndError = (
  navigation,
  dispatch,
  navigateTo,
  func
) => {
  // const navigation = useNavigation();
  const { error, loading, message } = useSelector((state) => state.other);
  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
      dispatch({ type: 'clearError' });
    }
    if (message) {
      Toast.show({
        type: 'success',
        text1: message,
      });
      dispatch({ type: 'clearMessage' });
      navigateTo && navigation.navigate(navigateTo);
      func && dispatch(func());
    }
  }, [message, error, dispatch]);
  return loading;
};

export const useSetCategory = (setCategories, isFocused) => {
  useEffect(() => {
    axios
      .get(`${server}/product/categories`)
      .then((res) => {
        console.log(res.data);
        setCategories(res.data.categories);
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: error.response.data.errmessage,
        });
      });
  }, [isFocused]);
};

export const useGetOrders = (isFocused, isAdmin = false) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${server}/order/${isAdmin ? 'admin' : 'loginUserorder'}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })
      .then((res) => {
        setOrders(res.data.orders);
        setLoading(false);
      })
      .catch((error) => {
        Toast.show({
          type: 'error',
          text1: error.response.data.errmessage,
        });
        setLoading(false);
      });
  }, [isFocused]);
  return {
    loading,
    orders,
  };
};

export const useAdminProducts = (dispatch, isFocused) => {
  const { loading, products, inStock, outOfStock, error } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
      dispatch({ type: 'clearError' });
    }
    dispatch(getAdminProduct());
  }, [dispatch, isFocused, error]);
  return {
    products,
    inStock,
    outOfStock,
    loading,
  };
};
