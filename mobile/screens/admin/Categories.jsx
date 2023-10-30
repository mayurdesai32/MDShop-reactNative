import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/Header';
import {
  formStyles,
  defaultStyle,
  colors,
  inputOptions,
} from '../../styles/style';
import CategoriesCard from '../../components/CategoriesCard';
import { Button } from 'react-native-paper';
import {
  useOtherMessageAndError,
  useSetCategory,
} from '../../utils/customhook';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  addCategory,
  deleteCategory,
} from '../../stateManagement/actions/otherAction';

const Categories = ({ navigation }) => {
  const [category, setCategory] = useState('');
  const [categories, setcategories] = useState([]);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useSetCategory(setcategories, isFocused);

  const loading = useOtherMessageAndError(navigation, dispatch, 'adminpanel');

  const deleteHandler = (id) => {
    console.log(`delete Categories with id ${id}`);
    dispatch(deleteCategory(id));
  };
  const submitHandler = () => {
    dispatch(addCategory(category));
  };
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />
      <View style={{ marginTop: 80, marginBottom: 20 }}>
        <Text style={formStyles.heading}>Categories</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        <View
          style={{
            backgroundColor: colors.color2,
            padding: 20,
            minHeight: 400,
          }}
        >
          {categories.map((item, index) => (
            <CategoriesCard
              name={item.category}
              id={item._id}
              key={item._id}
              index={index}
              deleteHandler={deleteHandler}
            />
          ))}
        </View>
      </ScrollView>
      <View style={styles.container}>
        <TextInput
          {...inputOptions}
          placeholder='category'
          value={category}
          onChangeText={setCategory}
        />
        <Button
          textColor={colors.color2}
          style={{
            backgroundColor: colors.color1,
            margin: 20,
            padding: 6,
          }}
          disabled={!category}
          loading={loading}
          onPress={submitHandler}
        >
          Add Button
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 20,
    elevation: 10,
    borderRadius: 10,
    backgroundColor: colors.color3,
  },
});

export default Categories;
