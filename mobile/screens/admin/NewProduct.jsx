import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  formStyles,
  defaultStyle,
  colors,
  inputOptions,
  inputStyle,
} from '../../styles/style';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import { Avatar, Button, TextInput } from 'react-native-paper';
import SelectComponent from '../../components/SelectComponent';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  useOtherMessageAndError,
  useSetCategory,
} from '../../utils/customhook';
import mime from 'mime';
import { productCreate } from '../../stateManagement/actions/otherAction';

const NewProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('select the category');
  const [categoryID, setCategoryID] = useState(undefined);
  const [categories, setCategories] = useState([]);

  useSetCategory(setCategories, isFocused);
  const disableCondition = !name || !description || !price || !stock || !image;

  const submitHandler = () => {
    const myForm = new FormData();
    myForm.append('name', name);
    myForm.append('description', description);
    myForm.append('price', price);
    myForm.append('stock', stock);
    myForm.append('file', {
      uri: image,
      type: mime.getType(image),
      name: image.split('/').pop(),
    });

    if (categoryID) myForm.append('category', categoryID);

    dispatch(productCreate(myForm));
  };

  const loading = useOtherMessageAndError(navigation, dispatch, 'adminpanel');

  useEffect(() => {
    if (route.params?.image) {
      return setImage(route.params.image);
    }
  }, [route.params]);
  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        <Header back={true} />
        <View style={{ marginTop: 80, marginBottom: 20 }}>
          <Text style={formStyles.heading}>New Product</Text>
        </View>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              padding: 20,
              elevation: 10,
              borderRadius: 10,
              backgroundColor: colors.color3,
            }}
          >
            <View style={{ justifyContent: 'center' }}>
              <View
                style={{
                  width: 80,
                  height: 80,
                  alignSelf: 'center',
                  marginBottom: 20,
                }}
              >
                <Avatar.Image
                  size={80}
                  style={{ backgroundColor: colors.color1 }}
                  source={{
                    uri: image ? image : null,
                  }}
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('camera', { NewProduct: true })
                  }
                >
                  <Avatar.Icon
                    icon={'camera'}
                    size={30}
                    color={colors.color3}
                    style={{
                      backgroundColor: colors.color2,
                      position: 'absolute',
                      bottom: 0,
                      right: -5,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                {...inputOptions}
                placeholder='Name'
                value={name}
                onChangeText={setName}
              />
              <TextInput
                {...inputOptions}
                placeholder='Description'
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                {...inputOptions}
                placeholder='price'
                keyboardType='number-pad'
                value={price}
                onChangeText={setPrice}
              />
              <TextInput
                {...inputOptions}
                placeholder='stock'
                value={stock}
                keyboardType='number-pad'
                onChangeText={setStock}
              />

              <Text
                style={{
                  ...inputStyle,
                  textAlign: 'center',
                  borderRadius: 3,
                  textAlignVertical: 'center',
                }}
                onPress={() => setVisible(true)}
              >
                {category}
              </Text>

              <Button
                textColor={colors.color2}
                style={{
                  backgroundColor: colors.color1,
                  margin: 20,
                  padding: 6,
                }}
                onPress={submitHandler}
                loading={loading}
                disabled={disableCondition || loading}
              >
                Create
              </Button>
            </View>
          </ScrollView>
        )}
      </View>
      <SelectComponent
        visible={visible}
        setVisible={setVisible}
        setCategory={setCategory}
        setCategoryID={setCategoryID}
        categories={categories}
        key={categories._id}
      />
    </>
  );
};

export default NewProduct;
