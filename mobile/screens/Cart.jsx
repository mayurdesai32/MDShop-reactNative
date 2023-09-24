import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { colors, defaultStyle } from '../styles/style';
import Header from '../components/Header';
import Heading from '../components/Heading';
import { Button } from 'react-native-paper';
import CartItem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';

export const cartItems = [
  {
    name: 'Macbook',
    image:
      'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
    product: 'adfsfsdfsdf',
    stock: 30,
    price: 49999,
    quantity: 4,
  },
  {
    name: 'Macbook',
    image:
      'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
    product: 'adfsjghjghghfsdfsdf',
    stock: 30,
    price: 49999,
    quantity: 4,
  },
  {
    name: 'Macbook',
    image:
      'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
    product: 'adfsjghjhhhghghfsdfsdf',
    stock: 30,
    price: 49999,
    quantity: 4,
  },
  {
    name: 'Macbook',
    image:
      'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
    product: 'adfsfsghfgdfsdf',
    stock: 3,
    price: 49999,
    quantity: 4,
  },
  {
    name: 'Shoes',
    image:
      'https://p.kindpng.com/picc/s/451-4517876_default-profile-hd-png-download.png',
    product: 'a222dfsfsghfgdfsdf',
    stock: 323,
    price: 499,
    quantity: 2,
  },
];

const Cart = () => {
  const navigate = useNavigation();
  const incrementHandler = () => {};
  const decrementHandler = () => {};
  return (
    <View style={{ ...defaultStyle, padding: 0 }}>
      <Header back={true} emptyCart={true} />
      <Heading
        text1='Shopping'
        text2='Cart'
        containerStyle={{ paddingTop: 70, marginLeft: 35 }}
      />
      <View style={{ paddingVertical: 20, flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.map((item, index) => (
            <CartItem
              key={item.product}
              id={item.product}
              name={item.name}
              stock={item.stock}
              amount={item.price}
              imgSrc={item.image}
              qty={item.quantity}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              index={index}
              navigate={navigate}
            />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 35,
        }}
      >
        <Text>5 Items</Text>
        <Text>RS 5</Text>
      </View>
      <TouchableOpacity
        onPress={
          cartItems.length > 0 ? () => navigate.navigate('confirmorder') : null
        }
      >
        <Button
          style={{
            backgroundColor: colors.color3,
            borderRadius: 100,
            padding: 5,
            margin: 30,
          }}
          icon={'cart'}
          textColor={colors.color2}
        >
          Checkout
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
