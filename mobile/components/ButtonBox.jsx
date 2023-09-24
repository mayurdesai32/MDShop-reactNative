import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { colors } from '../styles/style';
import { Avatar } from 'react-native-paper';

const ButtonBox = ({
  reverse = false,
  loading = false,
  handler,
  text,
  icon,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        backgroundColor: reverse ? colors.color1 : colors.color3,
        height: 80,
        width: 80,
        borderRadius: 20,
        alignItems: 'center',
      }}
      onPress={() => {
        console.log('hello world');
        handler(text);
      }}
      disabled={loading}
    >
      <Avatar.Icon
        size={50}
        color={colors.color2}
        style={{ backgroundColor: reverse ? colors.color1 : colors.color3 }}
        icon={icon}
      />
      <Text style={{ color: colors.color2, textAlign: 'center' }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ButtonBox;
