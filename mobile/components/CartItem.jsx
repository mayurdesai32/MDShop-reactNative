import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../styles/style';
import { Avatar } from 'react-native-paper';
import { iconOptions } from '../screens/ProductDetails';

const CartItem = ({
  id,
  name,
  stock,
  amount,
  imgSrc,
  qty,
  // incrementHandler,
  // decrementHandler,
  index,
}) => {
  const incrementHandler = (id, qty, stock) => {
    console.log('incresing ', id, qty, stock);
  };
  const decrementHandler = (id, qty) => {};
  return (
    <View style={{ flexDirection: 'row', height: 100, marginVertical: 20 }}>
      <View
        style={{
          width: '40%',
          backgroundColor: index % 2 === 0 ? colors.color1 : colors.color3,
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
        }}
      >
        <Image source={{ uri: imgSrc }} style={style.img} />
      </View>
      <View
        style={{
          width: '40%',
          paddingHorizontal: 25,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
          }}
        >
          {name}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 17,
            fontWeight: '900',
          }}
        >
          RS {amount}
        </Text>
      </View>
      <View style={style.qtyContainer}>
        <TouchableOpacity onPress={() => decrementHandler(id, qty)}>
          <Avatar.Icon icon={'minus'} {...iconOptions} />
        </TouchableOpacity>
        <Text style={style.qty}>{qty}</Text>
        <TouchableOpacity onPress={() => incrementHandler(id, qty, stock)}>
          <Avatar.Icon icon={'plus'} {...iconOptions} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  qty: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },
  qtyContainer: {
    alignItems: 'center',
    width: '20%',
    height: 80,
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  img: {
    width: 200,
    resizeMode: 'contain',
    height: '100%',
    top: '-20%',
    left: '10%',
  },
});
export default CartItem;
