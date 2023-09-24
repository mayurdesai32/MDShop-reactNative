import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Avatar, Headline } from 'react-native-paper';
import { colors } from '../styles/style';

const SelectComponent = ({
  visible,
  setVisible,
  setCategory,
  setCategoryID,
  categories,
}) => {
  const selectCategoryHandler = (item) => {
    setCategory(item.category);
    setCategoryID(item._id);
    setVisible(false);
  };

  return (
    visible && (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Avatar.Icon
            size={30}
            style={{ alignSelf: 'flex-end', backgroundColor: colors.color1 }}
            icon={'close'}
          />
        </TouchableOpacity>
        <Text>SelectComponent</Text>
        <Headline style={styles.heading}>Select a Category</Headline>
        <ScrollView>
          {categories.map((item, idex) => (
            <Text
              key={item._id}
              style={styles.text}
              onPress={() => selectCategoryHandler(item)}
            >
              {item.category}
            </Text>
          ))}
        </ScrollView>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.color2,
    position: 'absolute',
    padding: 35,
    borderRadius: 20,
    width: '90%',
    height: '90%',
    alignSelf: 'center',
    elevation: 5,
    top: 50,
  },
  heading: {
    textAlign: 'center',
    marginVertical: 10,
    backgroundColor: colors.color3,
    borderRadius: 5,
    padding: 3,
    color: colors.color2,
  },
  text: {
    fontSize: 17,
    fontWeight: '100',
    textTransform: 'uppercase',
    marginVertical: 10,
  },
});

export default SelectComponent;
