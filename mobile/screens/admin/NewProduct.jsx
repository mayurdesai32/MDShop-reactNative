import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
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
const loading = false;

const NewProduct = ({ navigation, route }) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Laptop');
  const [categoryID, setCategoryID] = useState('');
  const [categories, setCategories] = useState([
    { _id: '1fgdfgdf', category: '1laptop' },
    { _id: '2fghgdfgdf', category: '2laptop' },
    { _id: '3fghhdfgdf', category: '3laptop' },
    { _id: '41fgdhhfgdf', category: '4laptop' },
  ]);
  const [visible, setVisible] = useState(false);

  const submitHandler = () => {
    console.log(name, price, stock, description, categoryID);
  };

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
                disabled={loading}
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
