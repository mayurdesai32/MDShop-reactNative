import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../styles/style';
import { Avatar } from 'react-native-paper';

const CategoriesCard = ({ name, id, index, deleteHandler }) => {
  return (
    <View style={Styles.cardContainer}>
      <Text style={Styles.cardText}>CategoriesCard</Text>
      <TouchableOpacity activeOpacity={0.2} onPress={() => deleteHandler(id)}>
        <Avatar.Icon
          icon={'delete'}
          size={30}
          style={{ backgroundColor: colors.color1 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.color2,
    elevation: 5,
    margin: 10,
    padding: 15,
    // paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardText: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
export default CategoriesCard;
