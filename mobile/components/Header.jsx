import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Avatar } from 'react-native-paper';
import { colors } from '../styles/style';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const Header = ({ back, emptyCart = false }) => {
  const navigate = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const emplyCartHander = () => {
    dispatch({
      type: 'clearCart',
    });
  };
  return (
    <>
      {back && (
        <TouchableOpacity
          style={{ position: 'absolute', top: 40, left: 20, zIndex: 10 }}
          onPress={() => navigate.goBack()}
        >
          <Avatar.Icon
            icon={'arrow-left'}
            style={{ backgroundColor: colors.color4 }}
            color={
              route.name === 'productdetails' ? colors.color2 : colors.color3
            }
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}
        onPress={emptyCart ? emplyCartHander : () => navigate.navigate('cart')}
      >
        <Avatar.Icon
          icon={emptyCart ? 'delete-outline' : 'cart-outline'}
          style={{ backgroundColor: colors.color4 }}
          color={
            route.name === 'productdetails' ? colors.color2 : colors.color3
          }
        />
      </TouchableOpacity>
    </>
  );
};

export default Header;
