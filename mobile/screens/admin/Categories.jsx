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
const categories = [
  {
    name: 'cothes',
    _id: 'sdfgsfsd',
  },
  {
    name: 'electronic',
    _id: 'sfdgddfgsfsd',
  },
  {
    name: 'electronic',
    _id: 'sfdggfhfgddfgsfsd',
  },
];
const loading = false;
const Categories = () => {
  const [category, setCategory] = useState('');
  const deleteHandler = (id) => {
    console.log(`delete Categories with id ${id}`);
  };
  const submitHandler = () => {};
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
              name={item.name}
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
