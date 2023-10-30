import { View, Text, ScrollView } from 'react-native';
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
import { Button, TextInput } from 'react-native-paper';
import SelectComponent from '../../components/SelectComponent';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useOtherMessageAndError,
  useSetCategory,
} from '../../utils/customhook';
import { getProductDetail } from '../../stateManagement/actions/productAction';
import { updateProduct } from '../../stateManagement/actions/otherAction';

const UpdateProduct = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const { product, loading } = useSelector((state) => state.product);

  const [visible, setVisible] = useState(false);
  const [id] = useState(route.params.id);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [categories, setCategories] = useState([]);
  useSetCategory(setCategories, isFocused);
  const submitHandler = () => {
    dispatch(updateProduct(id, name, description, categoryID, stock, price));
  };
  const loadingOther = useOtherMessageAndError(
    navigation,
    dispatch,
    'adminpanel'
  );

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id, isFocused]);

  useEffect(() => {
    if (product) {
      setName(product?.name),
        setDescription(product?.description),
        setPrice(product?.price?.toString()),
        setStock(product?.stock?.toString()),
        setCategory(product?.category?.category),
        setCategoryID(product?.category?._id);
    }
  }, [product]);
  return (
    <>
      <View style={{ ...defaultStyle, backgroundColor: colors.color2 }}>
        <Header back={true} />
        <View style={{ marginTop: 80, marginBottom: 20 }}>
          <Text style={formStyles.heading}>Update Product</Text>
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
              <Button
                onPress={() =>
                  navigation.navigate('productimages', {
                    id,
                    images: product?.images,
                  })
                }
                textColor={colors.color1}
              >
                <Text style={{ fontSize: 22 }}>Manage Images</Text>
              </Button>
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
                loading={loadingOther}
                disabled={loadingOther}
              >
                Update
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

export default UpdateProduct;
