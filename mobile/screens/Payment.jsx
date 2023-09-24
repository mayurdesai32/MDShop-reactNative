import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { colors, defaultStyle } from '../styles/style';
import Heading from '../components/Heading';
import Header from '../components/Header';
import { Button, RadioButton, Text } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
const Payment = ({ navigation, route }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');

  // const navigate = navigation();
  const handlePaymentMethodChange = (newPaymentMethod) => {
    setSelectedPaymentMethod(newPaymentMethod);
  };

  const isAuthenticated = true;
  const redirectToLogin = () => {
    navigation.navigate('login');
  };
  const CODHandler = () => {};
  const onlineHandler = () => {};
  return (
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
        onPress={
          !isAuthenticated
            ? redirectToLogin
            : selectedPaymentMethod === 'COD'
            ? CODHandler
            : onlineHandler
        }
      >
        <Button
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
