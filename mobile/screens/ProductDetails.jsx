import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { colors, defaultStyle, formStyles } from '../styles/style';
import Header from '../components/Header';
import { Avatar, Button } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { getProductDetail } from '../stateManagement/actions/productAction';
const SLIDER_WIDTH = Dimensions.get('window').width;
// const SLIDER_WIDTH = Dimensions.get('screen').width;

const ITEM_WIDTH = SLIDER_WIDTH;

export const iconOptions = {
  size: 20,
  style: {
    borderColor: 5,
    backgroundColor: colors.color5,
    height: 25,
    width: 25,
  },
};

const ProductDetails = ({ route: { params } }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [quantity, setQuantity] = useState(1);

  const {
    product: { name, price, stock, description, images },
  } = useSelector((state) => state.product);

  const isCarousel = useRef(null);

  const decrementQty = () => {
    if (quantity <= 1) return;
    setQuantity((prev) => prev - 1);
  };
  const incrementQty = () => {
    if (stock <= quantity)
      return Toast.show({ type: 'error', text1: 'Maximum value Added' });

    setQuantity((prev) => prev + 1);
  };

  const addToCartHandler = () => {
    if (stock === 0)
      return Toast.show({
        type: 'error',
        text1: 'Out of Stock',
      });
    dispatch({
      type: 'addToCart',
      payload: {
        product: params.id,
        name,
        price,
        image: images[0]?.url,
        stock,
        quantity,
      },
    });
    Toast.show({
      type: 'success',
      text1: 'Added To Cart',
    });
  };

  useEffect(() => {
    dispatch(getProductDetail(params.id));
  }, [dispatch, isFocused, params.id]);
  return (
    <View
      style={{
        ...defaultStyle,
        padding: 0,
        paddingBottom: 0,
        backgroundColor: colors.color1,
        paddingTop: 125,
      }}
    >
      <Header back={true} />

      <Carousel
        layout='stack'
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        ref={isCarousel}
        data={images}
        renderItem={CarouselCardItem}
      />
      <View
        style={{
          backgroundColor: colors.color2,
          padding: 35,
          flex: 1,
          marginTop: -360,
          borderTopLeftRadius: 55,
          borderTopRightRadius: 55,
        }}
      >
        <Text numberOfLines={2} style={{ fontSize: 25 }}>
          {name}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 900 }}>{price}</Text>
        <Text
          numberOfLines={8}
          style={{ letterSpacing: 2, lineHeight: 20, marginVertical: 15 }}
        >
          {description}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}
        >
          <Text style={{ color: colors.color3, fontWeight: '100' }}>
            Quantity
          </Text>
          <View
            style={{
              width: 80,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity onPress={decrementQty}>
              <Avatar.Icon icon={'minus'} {...iconOptions} />
            </TouchableOpacity>
            <Text style={style.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={incrementQty}>
              <Avatar.Icon icon={'plus'} size={20} {...iconOptions} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.9} onPress={addToCartHandler}>
          <Button icon={'cart'} style={style.btn} textColor={colors.color2}>
            Add To Cart
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CarouselCardItem = ({ item, index }) => (
  <View style={style.container} key={index}>
    <Image source={{ uri: item.url }} style={style.image} />
  </View>
);
const style = StyleSheet.create({
  container: { backgroundColor: colors.color1, width: ITEM_WIDTH, height: 270 },
  image: {
    width: ITEM_WIDTH,
    resizeMode: 'contain',
    height: 210,
  },
  quantity: {
    backgroundColor: colors.color4,
    height: 25,
    width: 25,
    textAlignVertical: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.color5,
  },

  btn: {
    backgroundColor: colors.color3,
    borderRadius: 100,
    padding: 5,
    marginVertical: 35,
  },
});
export default ProductDetails;
