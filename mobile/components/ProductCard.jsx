import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { colors } from '../styles/style';
import { Button } from 'react-native-paper';

const ProductCard = ({
  stock,
  name,
  image,
  id,
  price,
  addToCardHandler,
  i,
  Navigation,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        Navigation.navigate('productdetails', { id });
      }}
    >
      <View
        style={{
          elevation: 15,
          width: 250,
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 20,
          borderRadius: 20,
          height: 400,
          backgroundColor: i % 2 === 0 ? colors.color1 : colors.color2,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            width: '100%',
            height: 200,
            position: 'absolute',
            left: 50,
            top: 105,
          }}
        />
        <View
          style={{
            width: '100%',
            padding: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? colors.color2 : colors.color3,
              fontSize: 25,
              fontWeight: '300',
              width: '60%',
            }}
          >
            {name}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: i % 2 === 0 ? colors.color2 : colors.color3,
              fontSize: 25,
              fontWeight: '700',
            }}
          >
            {price}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: i % 2 == 0 ? colors.color2 : colors.color3,
            paddingVertical: 5,
            borderRadius: 0,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            width: '100%',
          }}
        >
          <Button
            onPress={() => addToCardHandler(id, name, price, image, stock)}
            textColor={i % 2 === 0 ? colors.color1 : colors.color2}
          >
            Add to Cart
          </Button>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
