import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { colors } from '../styles/style';
import { Button } from 'react-native-paper';

const OrderItem = ({
  _id,
  totalAmount,
  address,
  createdAt,
  orderStatus,
  paymentMethod,
  updateHandler,
  loading,
  admin = false,
  index = 0,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: index % 2 === 0 ? colors.color2 : colors.color3,
      }}
    >
      <Text
        style={{
          ...styles.text,
          backgroundColor: index % 2 === 0 ? colors.color3 : colors.color1,
        }}
      >
        ID -#{_id} OrderItem
      </Text>
      <TextBox title={'Address'} value={address} index={index} />
      <TextBox title={'Order On'} value={createdAt} index={index} />
      <TextBox title={'Price'} value={totalAmount} index={index} />
      <TextBox title={'Status'} value={orderStatus} index={index} />
      <TextBox title={'Payment Method'} value={paymentMethod} index={index} />
      {admin && (
        <Button
          icon={'update'}
          mode={'contained'}
          style={{
            width: 120,
            alignSelf: 'center',
            marginTop: 10,
            backgroundColor: index % 2 === 0 ? colors.color3 : colors.color2,
          }}
          textColor={index % 2 === 0 ? colors.color2 : colors.color3}
          onPress={() => updateHandler(_id)}
          loading={loading}
          disabled={loading}
        >
          Update
        </Button>
      )}
    </View>
  );
};

const TextBox = ({ title, value, index }) => (
  <Text
    style={{
      marginVertical: 6,
      color: index % 2 === 0 ? colors.color3 : colors.color2,
    }}
  >
    <Text style={{ fontWeight: 900 }}>{title} - </Text>
    {title === 'Price' ? 'RS ' : ''}
    {value}
  </Text>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  text: {
    color: colors.color2,
    fontSize: 16,
    fontWeight: 900,
    marginHorizontal: -20,
    marginTop: -20,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
});

export default OrderItem;
