import { View, Text, Image } from 'react-native';
import React from 'react';

const ConfirmOrderItem = ({ id, name, stock, amount, imgSrc, qty }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
      }}
    >
      <Image
        source={{ uri: imgSrc }}
        style={{ width: 50, height: 50, resizeMode: 'contain' }}
      />
      <Text>{name}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>{qty}</Text>
        <Text style={{ marginHorizontal: 10 }}>x</Text>
        <Text>{amount}</Text>
      </View>
    </View>
  );
};

export default ConfirmOrderItem;
