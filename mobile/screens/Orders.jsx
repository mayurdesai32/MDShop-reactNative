import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { colors, defaultStyle, formStyles } from '../styles/style';
import Header from '../components/Header';
import Loader from '../components/Loader';
import { Headline } from 'react-native-paper';
import OrderItem from '../components/OrderItem';
import { useIsFocused } from '@react-navigation/native';
import { useGetOrders } from '../utils/customhook';
const loading = false;

// export const orders = [

const Orders = () => {
  const isFocused = useIsFocused();
  const { loading, orders } = useGetOrders(isFocused);
  return (
    <View style={{ ...defaultStyle, backgroundColor: colors.color5 }}>
      <Header back={true} />
      <Text>Orders</Text>
      <View style={{ marginTop: 80, marginBottom: 20 }}>
        <Text style={formStyles.heading}>My Orders</Text>
      </View>

      {loading ? (
        <Loader />
      ) : (
        <View style={{ padding: 10, flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {orders.length > 0 ? (
              orders.map((item, index) => (
                <OrderItem
                  key={item._id}
                  _id={item._id}
                  shippingInfo={item.shippingInfo}
                  createdAt={item.createdAt.split('T')[0]}
                  orderStatus={item.orderStatus}
                  paymentMethod={item.paymentMethod}
                  totalAmount={item.totalAmount}
                  index={index}
                  address={`${item.shippingInfo.address},${item.shippingInfo.city} ,${item.shippingInfo.country} ${item.shippingInfo.pincode}`}
                  admin={false}
                  loading={true}
                  updateHandler={() => {}}
                />
              ))
            ) : (
              <Headline style={{ textAlign: 'center' }}>No Order Yet</Headline>
            )}
          </ScrollView>
          <Text>Orders</Text>
        </View>
      )}
    </View>
  );
};

export default Orders;
