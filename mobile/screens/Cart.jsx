import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { colors, defaultStyle } from '../styles/style';
import Header from '../components/Header';
import Heading from '../components/Heading';
import { Button } from 'react-native-paper';
import CartItem from '../components/CartItem';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const incrementHandler = (id, name, price, image, stock, qty) => {
    const newQty = qty + 1;
    if (stock <= qty)
      return Toast.show({
        type: 'error',
        text1: 'Maximum value added',
      });
    dispatch({
      type: 'addToCart',
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };
  const decrementHandler = (id, name, price, image, stock, qty) => {
    const newQty = qty - 1;

    if (1 >= qty) return dispatch({ type: 'removeFromCart', payload: id });

    dispatch({
      type: 'addToCart',
      payload: {
        product: id,
        name,
        price,
        image,
        stock,
        quantity: newQty,
      },
    });
  };

  const { cartItems } = useSelector((state) => state.Cart);

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
          {cartItems.length !== 0 ? (
            cartItems.map((item, index) => (
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
            ))
          ) : (
            <Text style={{ textAlign: 'center', fontSize: 25, marginTop: 50 }}>
              No Item Found
            </Text>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 35,
        }}
      >
        <Text>{cartItems.length} Items</Text>
        <Text>
          RS
          {cartItems.reduce(
            (prev, curr) => prev + curr.quantity * curr.price,
            0
          )}
        </Text>
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
