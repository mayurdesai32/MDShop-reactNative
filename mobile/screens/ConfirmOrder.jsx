import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors, defaultStyle } from '../styles/style';
import Heading from '../components/Heading';
import Header from '../components/Header';
import { cartItems } from './Cart';
import ConfirmOrderItem from '../components/ConfirmOrderItem';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';

const ConfirmOrder = () => {
  const navigate = useNavigation();
  const ShippingCharges = 200;
  const itemsPrice = 4000;
  const tax = 0.18 * itemsPrice;
  const totalAmount = ShippingCharges + itemsPrice + tax;
  return (
    <View style={defaultStyle}>
      <Header back={true} />
      <Heading
        text1='Confirm'
        text2='Order'
        containerStyle={{ paddingTop: 70 }}
      />
      <View style={{ paddingVertical: 20, flex: 1 }}>
        <ScrollView>
          {cartItems.map((item) => (
            <ConfirmOrderItem
              key={item.product}
              id={item.product}
              name={item.name}
              stock={item.stock}
              amount={item.price}
              imgSrc={item.image}
              qty={item.quantity}
            />
          ))}
        </ScrollView>
      </View>
      <PriceTag heading={'SubTotal'} value={itemsPrice} />
      <PriceTag heading={'Shipping'} value={ShippingCharges} />
      <PriceTag heading={'Tax'} value={tax} />
      <PriceTag heading={'Total'} value={totalAmount} />
      <TouchableOpacity
        onPress={() =>
          navigate.navigate('payment', {
            itemsPrice,
            ShippingCharges,
            tax,
            totalAmount,
          })
        }
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 10,
          }}
          textColor={colors.color2}
          icon={'chevron-right'}
        >
          Payment
        </Button>
      </TouchableOpacity>
    </View>
  );
};

const PriceTag = ({ heading, value }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    }}
  >
    <Text style={{ fontWeight: '800' }}>{heading}</Text>
    <Text style={{ fontWeight: '800' }}>RS {value}</Text>
  </View>
);

export default ConfirmOrder;
