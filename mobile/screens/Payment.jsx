import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle } from '../styles/style';
import Heading from '../components/Heading';
import Header from '../components/Header';
import { Button, RadioButton, Text } from 'react-native-paper';

import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../stateManagement/actions/otherAction';
import { useOtherMessageAndError } from '../utils/customhook';
import { presentPaymentSheet, useStripe } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import { server } from '../stateManagement/store';
import axios from 'axios';
import Loader from '../components/Loader';
const Payment = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');
  const [loaderLoading, setLoaderLoading] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.Cart);

  const handlePaymentMethodChange = (newPaymentMethod) => {
    setSelectedPaymentMethod(newPaymentMethod);
  };

  // const isAuthenticated = true;
  const redirectToLogin = () => {
    navigation.navigate('login');
  };
  const CODHandler = (paymentInfo) => {
    const shippingInfo = {
      address: user.address,
      city: user.city,
      country: user.country,
      pinCode: user.pinCode,
    };
    shippingCharges = route.params.ShippingCharges;
    itemsPrice = route.params.itemsPrice;
    taxPrice = route.params.tax;
    totalAmount = route.params.totalAmount;
    dispatch(
      placeOrder(
        shippingInfo,
        cartItems,
        selectedPaymentMethod,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount
      )
    );
  };

  const onlineHandler = async () => {
    try {
      const {
        data: { client_secret },
      } = await axios.post(
        `${server}/order/payment`,
        { totalAmount: route.params.totalAmount },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const init = await stripe.initPaymentSheet({
        paymentIntentClientSecret: client_secret,
        merchantDisplayName: 'MD-Shop',
      });

      if (init.error) {
        return Toast.show({ type: 'error', text1: init.error.message });
      }

      setLoaderLoading(true);
      const presentSheet = await stripe.presentPaymentSheet();

      if (presentSheet.error) {
        setLoaderLoading(false);
        // console.log(presentSheet);
        return Toast.show({
          type: 'error',
          text1: presentSheet.error.message,
        });
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        client_secret
      );

      if (paymentIntent.status === 'Succeeded') {
        CODHandler({ id: paymentIntent.id, status: paymentIntent.status });
      }
    } catch (error) {
      return Toast.show({
        type: 'error',
        text1: 'Some Error',
        text2: error,
      });
    }
  };

  const loading = useOtherMessageAndError(
    navigation,
    dispatch,
    'profile',
    () => ({ type: 'clearCart' })
  );
  return loaderLoading ? (
    <Loader />
  ) : (
    <View style={defaultStyle}>
      <Header back={true} />
      <Heading
        containerStyle={{ paddingTop: 70 }}
        text1='Payment'
        text2='Method'
      />
      <View style={styles.container}>
        <View style={styles.radioStyle}>
          <Text style={styles.radioStyleText}> Cash On Delivery</Text>
          <RadioButton
            color={colors.color1}
            value='COD'
            status={selectedPaymentMethod === 'COD' ? 'checked' : 'unchecked'}
            onPress={() => handlePaymentMethodChange('COD')}
            uncheckedColor={colors.color5}
          />
        </View>
        <View style={styles.radioStyle}>
          <Text style={styles.radioStyleText}> ONLINE</Text>
          <RadioButton
            color={colors.color1}
            uncheckedColor={colors.color5}
            value='Online'
            status={
              selectedPaymentMethod === 'Online' ? 'checked' : 'unchecked'
            }
            onPress={() => handlePaymentMethodChange('Online')}
          />
        </View>
      </View>

      <TouchableOpacity
        disabled={loading}
        onPress={
          !isAuthenticated
            ? redirectToLogin
            : selectedPaymentMethod === 'COD'
            ? () => CODHandler()
            : onlineHandler
        }
      >
        <Button
          disabled={loading}
          loading={loading}
          style={styles.btn}
          textColor={colors.color2}
          icon={
            selectedPaymentMethod === 'COD'
              ? 'check-circle'
              : 'circle-multiple-outline'
          }
        >
          {selectedPaymentMethod === 'COD' ? 'Place Order' : 'Pay'}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color3,
    padding: 30,
    borderRadius: 10,
    marginVertical: 20,
    flex: 1,
    justifyContent: 'center',
  },
  radioStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  radioStyleText: {
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
    color: colors.color2,
  },
  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    margin: 10,
    padding: 5,
  },
});
export default Payment;
