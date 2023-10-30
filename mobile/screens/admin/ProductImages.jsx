import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, defaultStyle, formStyles } from '../../styles/style';
import Header from '../../components/Header';
import ImageCard from '../../components/ImageCard';
import { Avatar, Button } from 'react-native-paper';
import {
  useOtherMessageAndError,
  // useSetCategory,
} from '../../utils/customhook';
import { useDispatch } from 'react-redux';
import {
  deleteProductImage,
  updateProductImage,
} from '../../stateManagement/actions/otherAction';
import mime from 'mime';
const ProductImages = ({ navigation, route }) => {
  // const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [images] = useState(route.params.images);
  const [productId] = useState(route.params.id);
  const [image, setImage] = useState(null);
  const [imageChanged, SetImageChanged] = useState(false);

  const loading = useOtherMessageAndError(navigation, dispatch, 'adminpanel');

  const deleteHandler = (imageId) => {
    dispatch(deleteProductImage(productId, imageId));
  };
  const submitHandler = (id) => {
    console.log('Image id', id);
    console.log('productId', productId);

    const myForm = new FormData();
    myForm.append('file', {
      uri: image,
      type: mime.getType(image),
      name: image.split('/').pop(),
    });

    dispatch(updateProductImage(productId, myForm));
  };

  useEffect(() => {
    if (route.params?.image) {
      setImage(route.params.image);
      SetImageChanged(true);
    }
  }, [route.params]);

  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <View style={{ marginBottom: 20, marginTop: 80 }}>
        <Text style={formStyles.heading}>Images </Text>
      </View>
      <Header back={true} />
      <ScrollView style={{ marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 40,
            minHeight: 400,
          }}
        >
          {images.map((item, index) => (
            <ImageCard
              key={item._id}
              src={item.url}
              id={item._id}
              deleteHandler={() => deleteHandler(item._id)}
            />
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,
          borderRadius: 10,
          backgroundColor: colors.color3,
        }}
      >
        <Image
          style={{
            backgroundColor: colors.color2,
            width: 100,
            height: 100,
            alignSelf: 'center',
            resizeMode: 'contain',
          }}
          source={{ uri: image }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('camera', { updateProduct: true })
            }
          >
            <Avatar.Icon
              icon={'camera'}
              style={{ backgroundColor: colors.color2, margin: 10 }}
              size={30}
              color={colors.color3}
            />
          </TouchableOpacity>
        </View>

        <Button
          style={{ backgroundColor: colors.color1, padding: 6 }}
          textColor={colors.color2}
          loading={loading}
          onPress={submitHandler}
          disabled={!imageChanged}
        >
          Add
        </Button>
      </View>
    </View>
  );
};

export default ProductImages;
